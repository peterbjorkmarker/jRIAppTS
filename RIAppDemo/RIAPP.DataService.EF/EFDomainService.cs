﻿using System;
using System.Linq;
using System.Security.Principal;
using System.Reflection;
using System.Transactions;
using System.Data.Objects;
using System.Data.Objects.DataClasses;
using System.Data.Metadata.Edm;
using System.Text.RegularExpressions;
using RIAPP.DataService.Types;

namespace RIAPP.DataService.EF
{
    public abstract class EFDomainService<TDB> : BaseDomainService
        where TDB : System.Data.Objects.ObjectContext
    {
        private TDB _db;
        private bool _ownsDb = false;

        public EFDomainService(TDB db, IServiceArgs args)
            :base(args)
        {
            this._db = db;
        }

        public EFDomainService(IServiceArgs args)
            : this(null,args)
        {
            
        }


        #region Overridable Methods
        protected virtual TDB CreateDataContext() {
            return Activator.CreateInstance<TDB>();
        }

        protected override void ExecuteChangeSet()
        {
            using (TransactionScope transScope = new TransactionScope(TransactionScopeOption.RequiresNew, 
                new TransactionOptions { IsolationLevel = IsolationLevel.ReadCommitted, Timeout = TimeSpan.FromMinutes(1.0) }))
            {
                this.DB.SaveChanges();
                
                transScope.Complete();
            }
        }

        protected virtual DataType DataTypeFromType(string fullName, out bool isArray)
        {
            isArray = false;
            string name = fullName;
            if (fullName.EndsWith("[]"))
            {
                isArray = true;
                name = fullName.Substring(0, fullName.Length - 2);
            }

            switch (name)
            {
                case "Binary":
                    return DataType.Binary;
                case "Byte":
                    if (isArray)
                    {
                        isArray = false; //Binary is data type separate from array (although it is array by its nature)
                        return DataType.Binary;
                    }
                    else
                        return DataType.Integer;
                case "String":
                    return DataType.String;
                case "Int16":
                case "Int32":
                case "Int64":
                case "UInt16":
                case "UInt32":
                case "UInt64":
                    return DataType.Integer;
                case "Decimal":
                    return DataType.Decimal;
                case "Double":
                case "Single":
                    return DataType.Float;
                case "DateTime":
                case "DateTimeOffset":
                    return DataType.DateTime;
                case "Boolean":
                    return DataType.Bool;
                case "Guid":
                    return DataType.Guid;
                default:
                    throw new Exception(string.Format("Unsupported method type {0}", fullName));
            }
        }

        protected override Metadata GetMetadata()
        {
            Metadata metadata = new Metadata();
           
            var container = this.DB.MetadataWorkspace.GetEntityContainer(this.DB.DefaultContainerName, DataSpace.CSpace);
            var entitySetsDic = (from meta in container.BaseEntitySets
                        where meta.BuiltInTypeKind == BuiltInTypeKind.EntitySet
                        select new { EntitySetName = meta.Name, EntityTypeName = meta.ElementType.Name }).ToDictionary(es=>es.EntityTypeName);
            

            var CSpace = this.DB.MetadataWorkspace.GetItemCollection(System.Data.Metadata.Edm.DataSpace.CSpace);
            var SSpace = this.DB.MetadataWorkspace.GetItemCollection(System.Data.Metadata.Edm.DataSpace.SSpace);
            var entityEdmTypes = CSpace.GetItems<EntityType>().OrderBy(e => e.Name).ToArray();
            //var dbEntityEdmTypes = SSpace.GetItems<EntityType>().ToDictionary(r => r.Name);

            Array.ForEach(entityEdmTypes, (entityEdmType) =>
            {
                if (entityEdmType.Abstract)
                    return;
                string entityTypeName = entityEdmType.Name;
                string name = entityTypeName;
                if (entityEdmType.BaseType != null)
                {
                    name = entityEdmType.BaseType.Name;
                }
                string entitySetName = entitySetsDic[name].EntitySetName;
                var keys = entityEdmType.KeyMembers.Select(k => k.Name).ToArray();
                //string dbTableName = this.GetMappedEntitySetName(entitySetName);
                //var dbEntityEdm =  dbEntityEdmTypes[dbTableName];
                //Type entityType = this.GetEntityType(entitySetName);
                Type entityType = this.GetEntityType2(entityTypeName);
                DbSetInfo dbSetInfo = new DbSetInfo() { dbSetName = entityTypeName, EntityType = entityType, insertDataMethod = "Insert{0}", updateDataMethod = "Update{0}", deleteDataMethod = "Delete{0}", refreshDataMethod = "", validateDataMethod = "" };
                metadata.DbSets.Add(dbSetInfo);
                var edmProps = entityEdmType.Properties.ToArray();

                short pkNum = 0;
                Array.ForEach(edmProps, (edmProp) =>
                {
                    Field fieldInfo = new Field() { fieldName = edmProp.Name };
                    if (keys.Contains(fieldInfo.fieldName))
                    {
                        ++pkNum;
                        fieldInfo.isPrimaryKey = pkNum;
                        fieldInfo.isReadOnly = true;
                    }
                    bool isComputed = this.isComputed(edmProp);
                    fieldInfo.isAutoGenerated = this.isAutoGenerated(edmProp);
                    fieldInfo.isNullable = edmProp.Nullable;
                    fieldInfo.isReadOnly = fieldInfo.isAutoGenerated;
                    bool isArray = false;
                    string propType = edmProp.TypeUsage.EdmType.Name;
                    fieldInfo.dataType = this.DataTypeFromType(propType, out isArray);
                    var facets = edmProp.TypeUsage.Facets;
                    var maxLenFacet = facets.Where(f => f.Name == "MaxLength").FirstOrDefault();
                    if (maxLenFacet != null)
                    {
                        try
                        {
                            fieldInfo.maxLength = (short)Convert.ChangeType(maxLenFacet.Value, typeof(short));
                        }
                        catch
                        {
                        }
                    }
                    //gess that the property is rowversion
                    fieldInfo.fieldType = (isComputed && fieldInfo.dataType == DataType.Binary) ? FieldType.RowTimeStamp : FieldType.None;
                    dbSetInfo.fieldInfos.Add(fieldInfo);
                });
            });

            var associations = CSpace.GetItems<AssociationType>().Where(a=>a.IsForeignKey).OrderBy(e => e.Name);

            Func<EdmType, string> fn_name = (EdmType n) =>
            {
                if (n.FullName.Contains('['))
                {
                    Regex regex = new Regex(".*?\\[(.*?)\\].*?");
                    Match match = regex.Match(n.FullName);
                    string table = match.Groups[1].Value;
                    return table;
                }
                else
                    return n.FullName;
            };

            foreach (AssociationType asstype in associations)
            {
                var endMembers= asstype.RelationshipEndMembers;

                foreach (ReferentialConstraint constraint in asstype.ReferentialConstraints)
                {
                    try
                    {
                        Association ass = metadata.Associations.Where(a => a.name == constraint.ToString()).FirstOrDefault();
                 
                        if (ass == null)
                        {
                            var parentEnd = (constraint.FromRole.RelationshipMultiplicity == RelationshipMultiplicity.One || constraint.FromRole.RelationshipMultiplicity == RelationshipMultiplicity.ZeroOrOne) ? constraint.FromRole : constraint.ToRole;
                            var childEnd = constraint.FromRole == parentEnd ? constraint.ToRole : constraint.FromRole;
                            var parent = parentEnd.TypeUsage.EdmType;
                            var child = childEnd.TypeUsage.EdmType;
                            string parentName = fn_name(parent);
                            string childName = fn_name(child);
                            var parentEntity = entityEdmTypes.Where(en => parentName==en.FullName).First();
                            var childEntity = entityEdmTypes.Where(en => childName==en.FullName).First();
                            var parentToChildren = parentEntity.NavigationProperties.Where(np => np.FromEndMember.Name == parentEnd.Name && np.ToEndMember.Name == childEnd.Name).FirstOrDefault();
                            var childToParent = childEntity.NavigationProperties.Where(np => np.FromEndMember.Name == childEnd.Name && np.ToEndMember.Name == parentEnd.Name).FirstOrDefault();

                            ass = new Association();
                            ass.name = constraint.ToString();
                            metadata.Associations.Add(ass);
                            ass.parentDbSetName = parentEntity.Name;
                            ass.childDbSetName = childEntity.Name;
                            ass.parentToChildrenName = parentToChildren == null ? "" : parentToChildren.Name;
                            ass.childToParentName = childToParent == null ? "" : childToParent.Name;

                            var parentArr = constraint.FromRole == parentEnd ? constraint.FromProperties.ToArray() : constraint.ToProperties.ToArray();
                            var childArr = constraint.FromRole == parentEnd ? constraint.ToProperties.ToArray() : constraint.FromProperties.ToArray();

                            for (int i = 0; i < parentArr.Length; ++i)
                            {
                                FieldRel frel = null;
                                frel = ass.fieldRels.Where(fr => fr.parentField == parentArr[i].Name && fr.childField == childArr[i].Name).FirstOrDefault();
                                if (frel == null)
                                {
                                    frel = new FieldRel();
                                    ass.fieldRels.Add(frel);
                                    frel.parentField = parentArr[i].Name;
                                    frel.childField = childArr[i].Name;
                                }
                            }
                        }
                    }
                    catch (Exception)
                    {
                        throw;
                    }
                }
            }
            return metadata;
        }

        protected override string GetCSharp()
        {
            var metadata = this.ServiceGetMetadata();
            return RIAPP.DataService.EF.Utils.DataServiceMethodsHelper.CreateMethods(metadata, this.DB);
        }
        #endregion

        #region helper methods
        private string GetMappedEntitySetName(string entitySetName)
        {
            var entitySet = this.DB.GetType().GetProperty(entitySetName).GetValue(this.DB, null);
            string sql = entitySet.GetType().GetMethod("ToTraceString").Invoke(entitySet, null).ToString();
            Regex regex = new Regex("FROM (?<table>.*) AS");
            Match match = regex.Match(sql);
            string table = match.Groups["table"].Value;
            if (table.Contains(" AS "))
            {
                table = table.Split(new string[] { " AS " }, StringSplitOptions.RemoveEmptyEntries).First().Trim();
            }
            string res = table.Split('.').Last().TrimStart('[').TrimEnd(']');
            return res;
        }

        private Type GetEntityType(string entitySetName)
        {
            Type entityType = this.DB.GetType().GetProperty(entitySetName).PropertyType.GetGenericArguments().First();
            return entityType;
        }

        private Type GetEntityType2(string entityTypeName)
        {
            var assembly = this.DB.GetType().Assembly;
            Type entityType = assembly.GetTypes().Where(t => t.Name == entityTypeName).First();
            return entityType;
        }

        private bool isAutoGenerated(EdmProperty prop)
        {
            var propMetadata = prop.MetadataProperties.Where(p => p.Name.EndsWith("StoreGeneratedPattern")).FirstOrDefault();
            if (propMetadata != null && (propMetadata.Value.ToString() == "Identity" || propMetadata.Value.ToString() == "Computed"))
                return true;
            else
                return false;
        }

        private bool isComputed(EdmProperty prop)
        {
            var propMetadata = prop.MetadataProperties.Where(p => p.Name.EndsWith("StoreGeneratedPattern")).FirstOrDefault();
            if (propMetadata != null && (propMetadata.Value.ToString() == "Computed"))
                return true;
            else
                return false;
        }
        #endregion

        protected TDB DB
        {
            get
            {
                if (this._db == null)
                {
                    this._db = this.CreateDataContext();
                    if (this._db != null)
                    {
                        this._ownsDb = true;
                    }
                }
                return this._db;
            }
        }

        protected override void Dispose(bool isDisposing)
        {
            if (this._db != null && this._ownsDb)
            {
                this._db.Dispose();
                this._db = null;
                this._ownsDb = false;
            }
        }
    }

}

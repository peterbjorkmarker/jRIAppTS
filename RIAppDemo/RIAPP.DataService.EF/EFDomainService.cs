using System;
using System.Linq;
using System.Security.Principal;
using System.Reflection;
using System.Transactions;
using System.Data.Objects;
using System.Data.Objects.DataClasses;


namespace RIAPP.DataService.EF
{
    public abstract class EFDomainService<TDB> : BaseDomainService
        where TDB : System.Data.Objects.ObjectContext
    {
        private TDB _db;
        private bool _ownsDb = false;
        
        public EFDomainService(TDB db, IPrincipal principal)
            :base(principal)
        {
            this._db = db;
        }

        public EFDomainService(IPrincipal principal)
            : this(null,principal)
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

        protected override Metadata GetMetadata()
        {
            Metadata metadata = new Metadata();
            PropertyInfo[] dbsetPropList = this.DB.GetType().GetProperties().Where(p => p.PropertyType.IsGenericType && p.PropertyType.GetGenericTypeDefinition() == typeof(ObjectSet<>)).ToArray();
            Array.ForEach(dbsetPropList, (propInfo) =>
            {
                Type entityType = propInfo.PropertyType.GetGenericArguments().First();
                DbSetInfo dbSetInfo = new DbSetInfo() { dbSetName = entityType.Name, EntityType= entityType, insertDataMethod= "Insert{0}", updateDataMethod="Update{0}", deleteDataMethod="Delete{0}", refreshDataMethod="", validateDataMethod=""  };
                metadata.DbSets.Add(dbSetInfo);
                PropertyInfo[] fieldPropList =  entityType.GetProperties().Where(p=>p.IsDefined(typeof(EdmScalarPropertyAttribute), false)).ToArray();
                short pkNum = 0;
                Array.ForEach(fieldPropList, (propInfo2) =>
                {
                    FieldInfo fieldInfo = new FieldInfo();
                    fieldInfo.fieldName = propInfo2.Name;
                    var attr = (EdmScalarPropertyAttribute)propInfo2.GetCustomAttributes(typeof(EdmScalarPropertyAttribute), false).First();
                    if (attr.IsNullable)
                        fieldInfo.isNullable = true;
                    if (attr.EntityKeyProperty)
                    {
                        ++pkNum;
                        fieldInfo.isPrimaryKey = pkNum;
                        fieldInfo.isReadOnly = true;
                    }
                    bool isArray =  false;
                    fieldInfo.dataType = this.DataHelper.DataTypeFromType(propInfo2.PropertyType, out isArray);
                    dbSetInfo.fieldInfos.Add(fieldInfo);
                });
               

                PropertyInfo[] navPropList = entityType.GetProperties().Where(p => p.IsDefined(typeof(EdmRelationshipNavigationPropertyAttribute), false)).ToArray();
                Array.ForEach(navPropList, (propInfo3) =>
                {
                    var attr = (EdmRelationshipNavigationPropertyAttribute)propInfo3.GetCustomAttributes(typeof(EdmRelationshipNavigationPropertyAttribute), false).First();

                    Association ass =metadata.Associations.Where(a => a.name == attr.RelationshipName).FirstOrDefault();
                    if (ass == null)
                    {
                        ass = new Association();
                        ass.name = attr.RelationshipName;
                        metadata.Associations.Add(ass);
                    }
                    if (propInfo3.PropertyType.IsGenericType && propInfo3.PropertyType.GetGenericTypeDefinition() == typeof(EntityCollection<>))
                    {
                        ass.childDbSetName = attr.TargetRoleName;
                        ass.parentToChildrenName = propInfo3.Name;
                    }
                    else
                    {
                        ass.parentDbSetName = attr.TargetRoleName;
                        ass.childToParentName = propInfo3.Name;
                    }
                });
            });
         
          
            return metadata;
            
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

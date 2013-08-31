using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml;


namespace RIAPP.DataService.Utils
{
    public class TypeScriptHelper
    {
        MetadataInfo _metadata;
        IEnumerable<Type> _clientTypes;
        StringBuilder _sb = new StringBuilder(4096);

        public TypeScriptHelper(MetadataInfo metadata, IEnumerable<Type> clientTypes)
        {
            if (metadata == null)
                throw new ArgumentException("metadata parameter must not be null", "metadata");
            this._metadata = metadata;
            this._clientTypes = clientTypes==null?Enumerable.Empty<Type>():clientTypes;
        }

        private void WriteString(string str)
        {
            this._sb.Append(str);
        }

        private void WriteStringLine(string str)
        {
            this._sb.AppendLine(str);
        }

        private void WriteLine()
        {
            this._sb.AppendLine();
        }

        public string CreateTypeScript()
        {
            _sb.Length = 0;
            this.WriteStringLine(this.createISvcMethods());
            //this.WriteStringLine(this.createQueryNames());
            this._metadata.dbSets.ForEach((dbSetInfo) =>
            {
                this.WriteStringLine(this.createEntityType(dbSetInfo));
                this.WriteLine();
                this.WriteStringLine(this.createDbSetType(dbSetInfo));
                this.WriteLine();
            });
            this.WriteStringLine(this.createIAssocs());
            this.WriteLine();
            this.WriteStringLine(this.createDbContextType());
            this.WriteLine();
            return _sb.ToString();
        }

        private string createDbSetProps()
        {
            var sb = new StringBuilder(512);
            this._metadata.dbSets.ForEach((dbSetInfo) =>
            {
                var dbSetType = GetDbSetTypeName(dbSetInfo.dbSetName);
                sb.AppendFormat("\tget {0}() {{ return <{1}>this.getDbSet(\"{0}\"); }}", dbSetInfo.dbSetName,dbSetType);
                sb.AppendLine();
            });
            return sb.ToString();
        }

        private string createIAssocs()
        {
            var sb = new StringBuilder(512);
            sb.AppendLine("export interface IAssocs");
            sb.AppendLine("{");
            this._metadata.associations.ForEach((assoc) =>
            {
                sb.AppendFormat("\tget{0}: {1};", assoc.name, "()=>MOD.db.Association");
                sb.AppendLine();
            });
            sb.AppendLine("}");
            return sb.ToString();
        }

        private string createISvcMethods()
        {
            CSharp2TS csharp2TS = new CSharp2TS();
            var sb = new StringBuilder(512);
            sb.AppendLine("export interface ISvcMethods");
            sb.AppendLine("{");
            StringBuilder sbArgs = new StringBuilder(255);
            this._metadata.methods.ForEach((methodInfo) =>
            {
                if (!methodInfo.isQuery)
                {
                    sbArgs.Length = 0;
                    if (methodInfo.parameters.Count() > 0)
                    {
                        sbArgs.AppendLine("(args: {");
                        methodInfo.parameters.ForEach((paramInfo) =>
                        {
                            sbArgs.AppendFormat("\t\t{0}{1}: {2}{3};", paramInfo.name, paramInfo.isNullable ? "?" : "", CSharp2TS.GetTSType(paramInfo.dataType), paramInfo.isArray ? "[]" : "");
                            sbArgs.AppendLine();
                        });
                        if (methodInfo.methodResult){
                            sbArgs.Append("\t}) => IPromise<");
                            sbArgs.Append(csharp2TS.GetTSTypeName(methodInfo.methodInfo.ReturnType));
                            sbArgs.Append(">");
                        }
                        else{
                            sbArgs.Append("\t}) => IPromise<any>");
                        }
                    }
                    else
                    {
                        if (methodInfo.methodResult){
                          sbArgs.Append("() => IPromise<");
                          sbArgs.Append(csharp2TS.GetTSTypeName(methodInfo.methodInfo.ReturnType));
                          sbArgs.Append(">");
                        }
                        else{
                            sbArgs.Append("() => IPromise<any>");
                        }
                    }

                    sb.AppendFormat("\t{0}: {1};", methodInfo.methodName, sbArgs.ToString() );
                    sb.AppendLine();
                }
            });
            sb.AppendLine("}");
            
            sb.AppendLine("");
            
            //create typed Lists and Dictionaries
            sb.Append(this.createClientTypes(csharp2TS));

            StringBuilder sbResult = csharp2TS.GetInterfaceDeclarations();
            sbResult.Append(sb.ToString());
            return sbResult.ToString();
        }

        private string createClientTypes(CSharp2TS csharp2TS)
        {
            var sb = new StringBuilder(1024);
            foreach (Type type in this._clientTypes)
            {
                sb.Append(this.createClientType(csharp2TS, type));
            }

            return sb.ToString();
        }

        private string createClientType(CSharp2TS csharp2TS, Type type)
        {
            var dictAttr = type.GetCustomAttributes(typeof(DictionaryAttribute), false).OfType<DictionaryAttribute>().FirstOrDefault();
            var listAttr = type.GetCustomAttributes(typeof(ListAttribute), false).OfType<ListAttribute>().FirstOrDefault();

            if (dictAttr != null && dictAttr.KeyName == null)
                throw new ArgumentException("DictionaryAttribute KeyName property must not be null");
            var sb = new StringBuilder(512);
            string dictName = null; string listName = null;
            if (dictAttr != null)
                dictName = dictAttr.DictionaryName == null ? string.Format("{0}Dict", type.Name) : dictAttr.DictionaryName;
            if (listAttr != null)
                listName = listAttr.ListName == null ? string.Format("{0}List", type.Name) : listAttr.ListName;

            string interfItemName = csharp2TS.GetTSTypeName(type);
            string listItemName = string.Format("{0}ListItem", type.Name);
            var propList = type.GetProperties().ToList();

            sb.AppendLine(string.Format("export class {0} extends RIAPP.MOD.collection.ListItem implements {1}", listItemName, interfItemName));
            sb.AppendLine("{");
            sb.AppendLine(string.Format("\tconstructor(coll: RIAPP.MOD.collection.BaseList<{0}, {1}>, obj?: {1})", listItemName, interfItemName));
            sb.AppendLine("\t{");
            sb.AppendLine("\t\tsuper(coll,obj);");
            sb.AppendLine("\t}");
            propList.ForEach((propInfo) =>
            {
                sb.AppendLine(string.Format("\tget {0}() {{ return <{1}>this._getProp('{0}'); }}", propInfo.Name, csharp2TS.GetTSTypeName(propInfo.PropertyType)));
                sb.AppendLine(string.Format("\tset {0}(v:{1}) {{ this._setProp('{0}', v); }}", propInfo.Name, csharp2TS.GetTSTypeName(propInfo.PropertyType)));
            });
            sb.AppendLine("}");
            sb.AppendLine();

            var sbDict = new StringBuilder(512);
            var sbList = new StringBuilder(512);
            var sbProps = new StringBuilder(256);

            sbProps.Append("[");
            bool isFirst = true;
            propList.ForEach((propInfo) =>
            {
                if (!isFirst)
                    sbProps.Append(",");
                sbProps.Append(string.Format("'{0}'", propInfo.Name));
                isFirst = false;
            });
            sbProps.Append("]");

            if (dictAttr != null)
            {
                var parts = (new TemplateParser("Dictionary.txt")).DocParts.ToList();
                parts.ForEach((part) =>
                {
                    if (!part.isPlaceHolder)
                    {
                        sbDict.Append(part.value);
                    }
                    else
                    {
                        switch (part.value)
                        {
                            case "DICT_NAME":
                                sbDict.Append(dictName);
                                break;
                            case "ITEM_TYPE_NAME":
                                sbDict.Append(listItemName);
                                break;
                            case "INTERF_TYPE_NAME":
                                sbDict.Append(interfItemName);
                                break;
                            case "KEY_NAME":
                                sbDict.Append(dictAttr.KeyName);
                                break;
                            case "PROPS":
                                {
                                    sbDict.Append(sbProps.ToString());
                                }
                                break;
                        }
                    }

                });
                sb.AppendLine(sbDict.ToString());
                sb.AppendLine();
            }

            if (listAttr != null)
            {
                var parts = (new TemplateParser("List.txt")).DocParts.ToList();
                parts.ForEach((part) =>
                {
                    if (!part.isPlaceHolder)
                    {
                        sbList.Append(part.value);
                    }
                    else
                    {
                        switch (part.value)
                        {
                            case "LIST_NAME":
                                sbList.Append(listName);
                                break;
                            case "ITEM_TYPE_NAME":
                                sbList.Append(listItemName);
                                break;
                            case "INTERF_TYPE_NAME":
                                sbList.Append(interfItemName);
                                break;
                            case "PROPS":
                                {
                                    sbList.Append(sbProps.ToString());
                                }
                                break;
                        }
                    }

                });

                sb.AppendLine(sbList.ToString());
                sb.AppendLine();
            }

            return sb.ToString();
        }

        /*
        private string createQueryNames()
        {
            var sb = new StringBuilder(256);
            sb.AppendLine("export var QUERY_NAME =");
            sb.Append("{");
            bool isFirst = true;
            this._metadata.methods.ForEach((methodInfo) =>
            {
                if (methodInfo.isQuery)
                {
                    if (!isFirst)
                    {
                        sb.Append(",");
                        sb.AppendLine();
                    }
                    sb.AppendFormat("\t{0}: '{0}'", methodInfo.methodName);
                  
                    isFirst = false;
                }
            });
            sb.AppendLine();
            sb.AppendLine("};");
            return sb.ToString();
        }
        */

        private string createDbSetQueries(DbSetInfo dbSetInfo)
        {
            var sb = new StringBuilder(256);
            var sbArgs = new StringBuilder(256);
            var selected = this._metadata.methods.Where((m) =>m.isQuery && m.methodInfo.ReturnType.GetGenericArguments().First() == dbSetInfo.EntityType).ToList();
            selected.ForEach((methodInfo) =>
            {
                sbArgs.Length = 0;
                sbArgs.AppendLine("args?: {");
                methodInfo.parameters.ForEach((paramInfo) =>
                {
                    sbArgs.AppendFormat("\t\t{0}{1}: {2}{3};", paramInfo.name, paramInfo.isNullable ? "?" : "", CSharp2TS.GetTSType(paramInfo.dataType), paramInfo.isArray ? "[]" : "");
                    sbArgs.AppendLine();
                });
                sbArgs.Append("\t}");
                if (methodInfo.parameters.Count() == 0)
                {
                    sbArgs.Length = 0;
                }
                sb.AppendFormat("\tcreate{0}Query({1})", methodInfo.methodName, sbArgs.ToString());
                sb.AppendLine();
                sb.Append("\t{");
                sb.AppendLine();
                if (sbArgs.Length > 0)
                {
                    sb.AppendFormat("\t\tvar query = this.createQuery('{0}');", methodInfo.methodName);
                    sb.AppendLine();
                    sb.AppendLine("\t\tquery.params = args;");
                    sb.AppendLine("\t\treturn query;");
                }
                else
                {
                    sb.AppendFormat("\t\treturn this.createQuery('{0}');", methodInfo.methodName);
                    sb.AppendLine();
                }
                sb.AppendLine("\t}");
            });
            return sb.ToString();
        }

        private string createCalcFields(DbSetInfo dbSetInfo)
        {
            var sb = new StringBuilder(256);
            var selected = dbSetInfo.fieldInfos.Where((f) => f.isCalculated==true).ToList();
            selected.ForEach((fieldInfo) =>
            {
                sb.AppendFormat("\tdefine{0}Field(getFunc: () => {1})", fieldInfo.fieldName, this.GetFieldDataType(fieldInfo));
                sb.Append(" { ");
                sb.AppendFormat("this.defineCalculatedField('{0}', getFunc);", fieldInfo.fieldName);
                sb.Append(" }");
                sb.AppendLine();
            });
            return sb.ToString();
        }

        private string createDbContextType()
        {
            var sb = new StringBuilder(512);
            string[] dbSetNames = this._metadata.dbSets.Select(d => d.dbSetName).ToArray();
            var parts = (new TemplateParser("DbContext.txt")).DocParts.ToList();
            var sbCreateDbSets = new StringBuilder(512);
            this._metadata.dbSets.ForEach((dbSetInfo) =>
            {
                var dbSetType = GetDbSetTypeName(dbSetInfo.dbSetName);
                sbCreateDbSets.AppendFormat("\t\tthis._createDbSet(\"{0}\",{1});", dbSetInfo.dbSetName, dbSetType);
                sbCreateDbSets.AppendLine();
            });

         
            parts.ForEach((part) =>
            {
                if (!part.isPlaceHolder)
                {
                    sb.Append(part.value);
                }
                else
                {
                    switch (part.value)
                    {
                        case "DBSETS_NAMES":
                            sb.Append(SerializationHelper.Serialize<string[]>(dbSetNames));
                            break;
                        case "DBSETS_PROPS":
                            sb.Append(this.createDbSetProps());
                            break;
                        case "DBSETS":
                            sb.Append(sbCreateDbSets);
                            break;
                        case "TIMEZONE":
                            sb.Append(this._metadata.serverTimezone.ToString());
                            break;
                        case "ASSOCIATIONS":
                            sb.Append(SerializationHelper.Serialize(this._metadata.associations, this._metadata.associations.GetType()));
                            break;
                        case "METHODS":
                            sb.Append(SerializationHelper.Serialize(this._metadata.methods, this._metadata.methods.GetType()));
                            break;
                    }
                }
            });
            return sb.ToString();
        }

        private string createDbSetType(DbSetInfo dbSetInfo)
        {
            var sb = new StringBuilder(512);
            var dbSetType = GetDbSetTypeName(dbSetInfo.dbSetName);
            var entityName = GetEntityName(dbSetInfo.dbSetName);
            var entityType = GetEntityTypeName(dbSetInfo.dbSetName);
            var childAssoc = this._metadata.associations.Where(assoc => assoc.childDbSetName == dbSetInfo.dbSetName).ToList();
            var parentAssoc = this._metadata.associations.Where(assoc => assoc.parentDbSetName == dbSetInfo.dbSetName).ToList();
            var fieldInfos = dbSetInfo.fieldInfos;

            var parts = (new TemplateParser("DbSet.txt")).DocParts.ToList();
            parts.ForEach((part) =>
            {
                if (!part.isPlaceHolder)
                {
                    sb.Append(part.value);
                }
                else
                {
                    switch (part.value)
                    {
                        case "DBSET_NAME":
                            sb.Append(dbSetInfo.dbSetName);
                            break;
                        case "DBSET_TYPE":
                            sb.Append(dbSetType);
                            break;
                        case "ENTITY_NAME":
                            sb.Append(entityName);
                            break;
                        case "ENTITY_TYPE":
                            sb.Append(entityType);
                            break;
                        case "DBSET_INFO":
                            sb.Append(SerializationHelper.Serialize<DbSetInfo>(dbSetInfo));
                            break;
                        case "CHILD_ASSOC":
                            sb.Append(SerializationHelper.Serialize(childAssoc, childAssoc.GetType()));
                            break;
                        case "PARENT_ASSOC":
                            sb.Append(SerializationHelper.Serialize(parentAssoc, parentAssoc.GetType()));
                            break;
                        case "QUERIES":
                            sb.Append(this.createDbSetQueries(dbSetInfo));
                            break;
                        case "CALC_FIELDS":
                            sb.Append(this.createCalcFields(dbSetInfo));
                            break;
                    }
                }

            });
            return sb.ToString();
        }

        private string createEntityType(DbSetInfo dbSetInfo)
        {
            var sb = new StringBuilder(512);
            var dbSetType = GetDbSetTypeName(dbSetInfo.dbSetName);
            var entityName = GetEntityName(dbSetInfo.dbSetName);
            var entityType = GetEntityTypeName(dbSetInfo.dbSetName);
            var fieldInfos = dbSetInfo.fieldInfos;
            var sbFields = new StringBuilder(512);
            var sbFields2 = new StringBuilder(512);

            Action<FieldInfo> AddCalculatedField = (FieldInfo f) =>
            {
                string dataType = this.GetFieldDataType(f);
                sbFields.AppendFormat("\tget {0}() {{ return <{1}>this._dbSet._calcfldMap['{0}'].getFunc.call(this); }}", f.fieldName, dataType);
                sbFields.AppendLine();

                sbFields2.AppendFormat("\t{0}: {1};", f.fieldName, dataType);
                sbFields2.AppendLine();
            };

            Action<FieldInfo> AddNavigationField = (FieldInfo f) =>
            {
                string dataType = this.GetFieldDataType(f);
                sbFields.AppendFormat("\tget {0}() {{ return <{1}>this._dbSet._navfldMap['{0}'].getFunc.call(this); }}", f.fieldName, dataType);
                sbFields.AppendLine();
                //no writable properties to ParentToChildren navigation fields
                if (!dataType.EndsWith("[]"))
                {
                    sbFields.AppendFormat("\tset {0}(v:{1}) {{ this._dbSet._navfldMap['{0}'].setFunc.call(this,v); }}", f.fieldName, dataType);
                    sbFields.AppendLine();
                }

                sbFields2.AppendFormat("\t{0}: {1};", f.fieldName, dataType);
                sbFields2.AppendLine();
            };

            Action<FieldInfo> AddSimpleField = (FieldInfo f) =>
            {
                string dataType = this.GetFieldDataType(f);
                sbFields.AppendFormat("\tget {0}() {{ return <{1}>this._getFieldVal('{0}'); }}", f.fieldName, dataType);
                sbFields.AppendLine();
                if (!f.isReadOnly)
                {
                    sbFields.AppendFormat("\tset {0}(v:{1}) {{ this._setFieldVal('{0}',v); }}", f.fieldName, dataType);
                    sbFields.AppendLine();
                }

                sbFields2.AppendFormat("\t{0}: {1};", f.fieldName, dataType);
                sbFields2.AppendLine();
            };

            fieldInfos.ForEach((fieldInfo) =>
            {
                if (fieldInfo.isCalculated)
                {
                    AddCalculatedField(fieldInfo);
                }
                else if (fieldInfo.isNavigation)
                {
                    AddNavigationField(fieldInfo);
                }
                else
                {
                    AddSimpleField(fieldInfo);
                }
            });

            var parts = (new TemplateParser("Entity.txt")).DocParts.ToList();
            parts.ForEach((part) =>
            {
                if (!part.isPlaceHolder)
                {
                    sb.Append(part.value);
                }
                else
                {
                    switch (part.value)
                    {
                        case "DBSET_NAME":
                            sb.Append(dbSetInfo.dbSetName);
                            break;
                        case "DBSET_TYPE":
                            sb.Append(dbSetType);
                            break;
                        case "ENTITY_NAME":
                            sb.Append(entityName);
                            break;
                        case "ENTITY_TYPE":
                            sb.Append(entityType);
                            break;
                        case "ENTITY_FIELDS":
                            sb.Append(sbFields.ToString());
                            break;
                        case "INTERFACE_FIELDS":
                            sb.Append(sbFields2.ToString());
                            break;
          
                    }
                }
            });

            return sb.ToString();
        }
           
        private string GetFieldDataType(FieldInfo fieldInfo)
        {
            string fieldName = fieldInfo.fieldName;
            string fieldType = "any";
            DataType dataType = fieldInfo.dataType;

            if (fieldInfo.isNavigation)
            {
                fieldType = fieldInfo._TypeScriptDataType;
            }
            else
            {
                fieldType = CSharp2TS.GetTSType(dataType);
            }
            return fieldType;
        }

        public static string GetDbSetTypeName(string dbSetName)
        {
            return string.Format("{0}Db", dbSetName);
        }

        public static string GetEntityTypeName(string dbSetName)
        {
            return string.Format("{0}", dbSetName);
        }

        public static string GetEntityName(string dbSetName)
        {
            return dbSetName;
        }
    }
}

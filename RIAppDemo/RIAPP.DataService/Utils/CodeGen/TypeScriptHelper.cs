using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml;
using RIAPP.DataService.Utils.Interfaces;


namespace RIAPP.DataService.Utils
{
    public class TypeScriptHelper
    {
        MetadataInfo _metadata;
        List<Type> _clientTypes;
        StringBuilder _sb = new StringBuilder(4096);
        CSharp2TS _csharp2TS;
        private IServiceContainer _serviceContainer;

        public TypeScriptHelper(IServiceContainer serviceContainer, MetadataInfo metadata, IEnumerable<Type> clientTypes)
        {
            if (serviceContainer == null)
                throw new ArgumentException("converter parameter must not be null", "serviceContainer");
            this._serviceContainer = serviceContainer;
            if (metadata == null)
                throw new ArgumentException("metadata parameter must not be null", "metadata");
            this._metadata = metadata;
            this._clientTypes = new List<Type>(clientTypes==null?Enumerable.Empty<Type>():clientTypes);
        }

        void _csharp2TS_newComplexTypeAdded(object sender, NewTypeArgs e)
        {
            if (!this._clientTypes.Contains(e.t))
            {
                this._clientTypes.Add(e.t);
            }
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

        private static void addComment(StringBuilder sb, string comment)
        {
            sb.AppendLine(@"/*");
            sb.AppendLine(comment);
            sb.AppendLine("*/");
            sb.AppendLine();
        }

        public string CreateTypeScript(string comment=null)
        {
            if (this._csharp2TS != null)
            {
                this._csharp2TS.newComplexTypeAdded -= _csharp2TS_newComplexTypeAdded;
            }
            this._csharp2TS = new CSharp2TS(this._serviceContainer);
            this._csharp2TS.newComplexTypeAdded += _csharp2TS_newComplexTypeAdded;
            _sb.Length = 0;
            if (!string.IsNullOrWhiteSpace(comment))
            {
                TypeScriptHelper.addComment(_sb, comment);
            }
            this.processMethodArgs();
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

        private string _CreateParamSignature(ParamMetadataInfo paramInfo)
        {
            return string.Format("{0}{1}: {2}{3};", paramInfo.name, paramInfo.isNullable ? "?" : "", (paramInfo.dataType == DataType.None ? this._csharp2TS.GetTSTypeName(paramInfo.ParameterType) : CSharp2TS.GetTSType(paramInfo.dataType)), (paramInfo.dataType != DataType.None && paramInfo.isArray) ? "[]" : "");
        }

        private void processMethodArgs()
        {
            this._metadata.methods.ForEach((methodInfo) =>
            {
                if (methodInfo.parameters.Count() > 0)
                {
                    methodInfo.parameters.ForEach((paramInfo) =>
                    {
                        //if this is complex type parse parameter to create its typescript interface
                        if (paramInfo.dataType == DataType.None) 
                            this._csharp2TS.GetTSTypeName(paramInfo.ParameterType);
                    });
                }
            });
        }

        private string createISvcMethods()
        {
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
                            sbArgs.Append("\t\t");
                            sbArgs.AppendFormat(this._CreateParamSignature(paramInfo));
                            sbArgs.AppendLine();
                        });
                        if (methodInfo.methodResult)
                        {
                            sbArgs.Append("\t}) => IPromise<");
                            sbArgs.Append(this._csharp2TS.GetTSTypeName(methodInfo.methodInfo.ReturnType));
                            sbArgs.Append(">");
                        }
                        else
                        {
                            sbArgs.Append("\t}) => IVoidPromise");
                        }
                    }
                    else
                    {
                        if (methodInfo.methodResult)
                        {
                            sbArgs.Append("() => IPromise<");
                            sbArgs.Append(this._csharp2TS.GetTSTypeName(methodInfo.methodInfo.ReturnType));
                            sbArgs.Append(">");
                        }
                        else
                        {
                            sbArgs.Append("() => IVoidPromise");
                        }
                    }

                    sb.AppendFormat("\t{0}: {1};", methodInfo.methodName, sbArgs.ToString());
                    sb.AppendLine();
                }
            });
            sb.AppendLine("}");
            
            sb.AppendLine("");
            
            //create typed Lists and Dictionaries
            sb.Append(this.createClientTypes());

            StringBuilder sbResult = this._csharp2TS.GetInterfaceDeclarations();
            sbResult.Append(sb.ToString());
            return sbResult.ToString();
        }

        private string createClientTypes()
        {
            var sb = new StringBuilder(1024);
            for (int i = 0; i< this._clientTypes.Count();++i)
            {
                Type type = this._clientTypes[i];
                sb.Append(this.createClientType(type));
            }

            return sb.ToString();
        }

        private string createClientType(Type type)
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
            bool isListItem = dictAttr != null || listAttr != null;
            string interfaceName = this._csharp2TS.GetTSTypeName(type);
            if (!type.IsClass || !isListItem)
                return  sb.ToString();

            
                string listItemName = string.Format("{0}ListItem", type.Name);
                var propList = type.GetProperties().ToList();

                sb.AppendLine(string.Format("export class {0} extends RIAPP.MOD.collection.ListItem implements {1}", listItemName, interfaceName));
                sb.AppendLine("{");
                sb.AppendLine(string.Format("\tconstructor(coll: RIAPP.MOD.collection.BaseList<{0}, {1}>, obj?: {1})", listItemName, interfaceName));
                sb.AppendLine("\t{");
                sb.AppendLine("\t\tsuper(coll,obj);");
                sb.AppendLine("\t}");
                propList.ForEach((propInfo) =>
                {
                    sb.AppendLine(string.Format("\tget {0}():{1} {{ return <{1}>this._getProp('{0}'); }}", propInfo.Name, this._csharp2TS.GetTSTypeName(propInfo.PropertyType)));
                    sb.AppendLine(string.Format("\tset {0}(v:{1}) {{ this._setProp('{0}', v); }}", propInfo.Name, this._csharp2TS.GetTSTypeName(propInfo.PropertyType)));
                });
                sb.AppendFormat("\tasInterface() {{ return <{0}>this; }}", interfaceName);
                sb.AppendLine();
                sb.AppendLine("}");
                sb.AppendLine();


                var sbDict = new StringBuilder(512);
                var sbList = new StringBuilder(512);
                var sbProps = new StringBuilder(256);

                sbProps.Append("[");
                bool isFirst = true;
                bool isArray = false;

                propList.ForEach((propInfo) =>
                {
                    if (!isFirst)
                        sbProps.Append(",");
                    RIAPP.DataService.DataType dataType = DataType.None;
                    try
                    {
                        dataType = this._csharp2TS.DataTypeFromType(propInfo.PropertyType, out isArray);
                        if (isArray)
                            dataType = DataType.None;
                    }
                    catch (UnsupportedTypeException)
                    {
                        dataType = DataType.None;
                    }
                    sbProps.Append("{");
                    sbProps.Append(string.Format("name:'{0}',dtype:{1}", propInfo.Name, (int)dataType));
                    sbProps.Append("}");
                    isFirst = false;
                });
                sbProps.Append("]");

                if (dictAttr != null)
                {
                    var pkProp = propList.Where((propInfo) => dictAttr.KeyName == propInfo.Name).SingleOrDefault();
                    if (pkProp == null)
                        throw new Exception(string.Format("Dictionary item does not have a property with name {0}",dictAttr.KeyName));

                    Func<string, string> fn_CamelCase = (str) =>
                    {
                        return str.Length > 1 ? str.Substring(0, 1).ToLower() + str.Substring(1, str.Length - 1) : str.ToLower();
                    };
                    string pkVals = fn_CamelCase(pkProp.Name) + ": " + this._csharp2TS.GetTSTypeName(pkProp.PropertyType);


                    (new TemplateParser("Dictionary.txt")).ProcessParts((part) =>
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
                                    sbDict.Append(interfaceName);
                                    break;
                                case "KEY_NAME":
                                    sbDict.Append(dictAttr.KeyName);
                                    break;
                                case "PROPS":
                                    {
                                        sbDict.Append(sbProps.ToString());
                                    }
                                    break;
                                case "PK_VALS":
                                    sbDict.Append(pkVals);
                                    break;
                            }
                        }
                    });
                    sb.AppendLine(sbDict.ToString());
                    sb.AppendLine();
                }

                if (listAttr != null)
                {
                    (new TemplateParser("List.txt")).ProcessParts((part) =>
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
                                    sbList.Append(interfaceName);
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
                int cnt = 0;
                methodInfo.parameters.ForEach((paramInfo) =>
                {
                    sbArgs.Append("\t\t");
                    sbArgs.AppendFormat(this._CreateParamSignature(paramInfo));
                    sbArgs.AppendLine();
                    ++cnt;
                });
                sbArgs.Append("\t}");
                if (cnt == 0)
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
            var sbCreateDbSets = new StringBuilder(512);
            this._metadata.dbSets.ForEach((dbSetInfo) =>
            {
                var dbSetType = GetDbSetTypeName(dbSetInfo.dbSetName);
                sbCreateDbSets.AppendFormat("\t\tthis._createDbSet(\"{0}\",{1});", dbSetInfo.dbSetName, dbSetType);
                sbCreateDbSets.AppendLine();
            });

            (new TemplateParser("DbContext.txt")).ProcessParts((part) =>
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
                            sb.Append(this._serviceContainer.Serializer.Serialize(dbSetNames));
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
                            sb.Append(this._serviceContainer.Serializer.Serialize(this._metadata.associations));
                            break;
                        case "METHODS":
                            sb.Append(this._serviceContainer.Serializer.Serialize(this._metadata.methods));
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
            var entityInterfaceName = GetEntityInterfaceName(dbSetInfo.dbSetName);
            var childAssoc = this._metadata.associations.Where(assoc => assoc.childDbSetName == dbSetInfo.dbSetName).ToList();
            var parentAssoc = this._metadata.associations.Where(assoc => assoc.parentDbSetName == dbSetInfo.dbSetName).ToList();
            var fieldInfos = dbSetInfo.fieldInfos;
            
            var pkFields = dbSetInfo.GetPKFieldInfos();
            string pkVals = "";
            Func<string, string> fn_CamelCase = (str) =>
            {
                return str.Length > 1 ? str.Substring(0, 1).ToLower() + str.Substring(1, str.Length - 1) : str.ToLower();
            };

            foreach (var pkField in pkFields)
            {
                if (!string.IsNullOrEmpty(pkVals))
                    pkVals += ", ";
                pkVals += fn_CamelCase(pkField.fieldName) + ": " + this.GetFieldDataType(pkField);
            }

            (new TemplateParser("DbSet.txt")).ProcessParts((part) =>
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
                        case "ENTITY_INTERFACE":
                            sb.Append(entityInterfaceName);
                            break;
                        case "DBSET_INFO":
                            sb.Append(this._serviceContainer.Serializer.Serialize(dbSetInfo));
                            break;
                        case "CHILD_ASSOC":
                            sb.Append(this._serviceContainer.Serializer.Serialize(childAssoc));
                            break;
                        case "PARENT_ASSOC":
                            sb.Append(this._serviceContainer.Serializer.Serialize(parentAssoc));
                            break;
                        case "QUERIES":
                            sb.Append(this.createDbSetQueries(dbSetInfo));
                            break;
                        case "CALC_FIELDS":
                            sb.Append(this.createCalcFields(dbSetInfo));
                            break;
                        case "PK_VALS":
                            sb.Append(pkVals);
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
            var entityInterfaceName = GetEntityInterfaceName(dbSetInfo.dbSetName);
            var entityType = GetEntityTypeName(dbSetInfo.dbSetName);
            var fieldInfos = dbSetInfo.fieldInfos;
            var sbFields = new StringBuilder(512);
            var sbFields2 = new StringBuilder(512);
            if (this._csharp2TS.IsTypeNameRegistered(entityInterfaceName))
                throw new ApplicationException(string.Format("Names collision. Name '{0}' can not be used for an entity type's name because this name is used for a client's type.", entityInterfaceName));

            Action<FieldInfo> AddCalculatedField = (FieldInfo f) =>
            {
                string dataType = this.GetFieldDataType(f);
                sbFields.AppendFormat("\tget {0}(): {1} {{ return this._dbSet._calcfldMap['{0}'].getFunc.call(this); }}", f.fieldName, dataType);
                sbFields.AppendLine();

                sbFields2.AppendFormat("\t{0}: {1};", f.fieldName, dataType);
                sbFields2.AppendLine();
            };

            Action<FieldInfo> AddNavigationField = (FieldInfo f) =>
            {
                string dataType = this.GetFieldDataType(f);
                sbFields.AppendFormat("\tget {0}(): {1} {{ return this._dbSet._navfldMap['{0}'].getFunc.call(this); }}", f.fieldName, dataType);
                sbFields.AppendLine();
                //no writable properties to ParentToChildren navigation fields
                if (!dataType.EndsWith("[]"))
                {
                    sbFields.AppendFormat("\tset {0}(v: {1}) {{ this._dbSet._navfldMap['{0}'].setFunc.call(this,v); }}", f.fieldName, dataType);
                    sbFields.AppendLine();
                }

                sbFields2.AppendFormat("\t{0}: {1};", f.fieldName, dataType);
                sbFields2.AppendLine();
            };

            Action<FieldInfo> AddSimpleField = (FieldInfo f) =>
            {
                string dataType = this.GetFieldDataType(f);
                sbFields.AppendFormat("\tget {0}(): {1} {{ return this._getFieldVal('{0}'); }}", f.fieldName, dataType);
                sbFields.AppendLine();
                if (!f.isReadOnly)
                {
                    sbFields.AppendFormat("\tset {0}(v: {1}) {{ this._setFieldVal('{0}',v); }}", f.fieldName, dataType);
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

            (new TemplateParser("Entity.txt")).ProcessParts((part) =>
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
                        case "ENTITY_INTERFACE":
                            sb.Append(entityInterfaceName);
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
            return string.Format("{0}Entity",dbSetName);
        }

        public static string GetEntityInterfaceName(string dbSetName)
        {
            return string.Format("I{0}Entity", dbSetName);
        }
    }
}

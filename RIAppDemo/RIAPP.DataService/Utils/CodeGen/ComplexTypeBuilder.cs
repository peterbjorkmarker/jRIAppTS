﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RIAPP.DataService.Utils
{
    public class ComplexTypeBuilder
    {
        private DotNet2TS _dotNet2TS;
        private Dictionary<string, string> _complexTypes;

        public ComplexTypeBuilder(DotNet2TS dotNet2TS)
        {
            this._dotNet2TS = dotNet2TS;
            this._complexTypes = new Dictionary<string, string>(); 
        }

        protected internal IServiceContainer ServiceContainer
        {
            get
            {
                return this._dotNet2TS.ServiceContainer;
            }
        }

        public string CreateComplexType(DbSetInfo dbSetInfo, FieldInfo fieldInfo, int level)
        {
            string typeName;
            if (level == 0)
            {
                typeName = string.Format("{0}_{1}", dbSetInfo.dbSetName, fieldInfo.fieldName);
            }
            else
            {
                //to prevent names collision the type name is a three part name
                typeName = string.Format("{0}_{1}{2}", dbSetInfo.dbSetName, fieldInfo.fieldName, level);
            }

            fieldInfo._TypeScriptDataType = typeName;

            var sb = new StringBuilder(512);
            var sbProperties = new StringBuilder();
            var sbFieldsDef = new StringBuilder();
            var sbFieldsInit = new StringBuilder();

            Action<FieldInfo> AddProperty = (FieldInfo f) =>
            {
                string dataType = this.GetFieldDataType(f);
                sbProperties.AppendFormat("\tget {0}(): {1} {{ return this.getValue('{0}'); }}", f.fieldName, dataType);
                sbProperties.AppendLine();
                if (!f.isReadOnly)
                {
                    sbProperties.AppendFormat("\tset {0}(v: {1}) {{ this.setValue('{0}', v); }}", f.fieldName, dataType);
                    sbProperties.AppendLine();
                }
            };

            Action<FieldInfo, string> AddComplexProperty = (FieldInfo f, string dataType) =>
            {
                sbProperties.AppendFormat("\tget {0}(): {1} {{ if (!this._{0}) {{this._{0} = new {1}('{0}', this);}} return this._{0}; }}", f.fieldName, dataType);
                sbProperties.AppendLine();
                sbFieldsDef.AppendFormat("\tprivate _{0}: {1};", f.fieldName, dataType);
                sbFieldsDef.AppendLine();
                sbFieldsInit.AppendFormat("\t\tthis._{0} = null;", f.fieldName);
                sbFieldsInit.AppendLine();
            };

            fieldInfo.nested.ForEach((f) =>
            {
                if (f._isObjectField)
                {
                    string dataType = this.CreateComplexType(dbSetInfo, f, level+1);
                    AddComplexProperty(f, dataType);
                }
                else
                    AddProperty(f);
            });

            string templateName = "RootComplexProperty.txt";
            if (level > 0)
                templateName = "ChildComplexProperty.txt";

            (new TemplateParser(templateName)).ProcessParts((part) =>
            {
                if (!part.isPlaceHolder)
                {
                    sb.Append(part.value);
                }
                else
                {
                    switch (part.value)
                    {
                        case "PROPERTIES":
                            sb.Append(sbProperties.ToString());
                            break;
                        case "TYPE_NAME":
                            sb.Append(typeName);
                            break;
                        case "FIELDS_DEF":
                            sb.Append(sbFieldsDef.ToString());
                            break;
                        case "FIELDS_INIT":
                            sb.Append(sbFieldsInit.ToString());
                            break;
                    }
                }
            });

            this._complexTypes.Add(typeName, sb.ToString());
            return typeName;
        }

        public string GetComplexTypes() 
        {
            var sb = new StringBuilder(1024);
            this._complexTypes.Values.ToList().ForEach((typeDef) =>
            {
                sb.AppendLine(typeDef);
                sb.AppendLine();
            });
            return sb.ToString().TrimEnd('\r','\n');
        }

        private string GetFieldDataType(FieldInfo fieldInfo)
        {
            string fieldName = fieldInfo.fieldName;
            string fieldType = "any";
            DataType dataType = fieldInfo.dataType;

            fieldType = DotNet2TS.GetTSTypeNameFromDataType(dataType);
            return fieldType;
        }
    }
}

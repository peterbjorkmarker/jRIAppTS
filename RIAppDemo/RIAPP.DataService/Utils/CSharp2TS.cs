using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RIAPP.DataService.Utils
{
    public class CSharp2TS
    {
        ValueConverter _valConverter;
        Dictionary<string, string> _tsTypes = new Dictionary<string, string>();

        private ValueConverter valConverter
        {
            get
            {
                if (this._valConverter == null)
                    this._valConverter = new ValueConverter();
                return this._valConverter;
            }
        }

        public string GetTSTypeName(Type t)
        {
            bool isArray = false;
            bool isEnumerable= false;
            string res = "any";
            try
            {
                if (t.IsGenericType && t.GetGenericTypeDefinition() == typeof(IEnumerable<>))
                {
                    t = t.GetGenericArguments().First();
                    isEnumerable= true;
                }
                else if (t.IsArray)
                {
                    isEnumerable = true;
                    t = t.GetElementType();
                }
                else if (t is System.Collections.IEnumerable)
                {
                    isEnumerable = true;
                    return "any[]";
                }

                DataType dtype = this.valConverter.DataTypeFromType(t, out isArray);
                res = CSharp2TS.GetTSType(dtype);
                if (isArray || isEnumerable)
                    res = string.Format("{0}[]", res);
                return res;
            }
            catch
            {
                //complex type
                try
                {
                    string typeName = string.Format("I{0}", t.Name);
                    res = this.GetTSInterface(t, typeName);
                    if (isArray || isEnumerable)
                        return string.Format("{0}[]", typeName);
                    else
                        return typeName;
                }
                catch
                {
                    return "any";
                }
            }
        }

        /// <summary>
        /// converts object to TS interface declaration
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        private string GetTSInterface(Type t, string typeName)
        {
            string name = typeName;
            if (string.IsNullOrEmpty(typeName))
                name = this.GetTSTypeName(t);
            if (this._tsTypes.ContainsKey(name))
                return this._tsTypes[name];
            StringBuilder sb = new StringBuilder();
            sb.AppendFormat("export interface {0}", name);
            sb.AppendLine();
            sb.AppendLine("{");
            var objProps = t.GetProperties();
            Array.ForEach(objProps, (propInfo) =>
            {
                sb.AppendFormat("\t{0}:{1};", propInfo.Name, this.GetTSTypeName(propInfo.PropertyType));
                sb.AppendLine();
            }
            );
            sb.AppendLine("}");
            this._tsTypes.Add(name, sb.ToString());
            return this._tsTypes[name];
        }

        public StringBuilder GetInterfaceDeclarations()
        {
            var vals = this._tsTypes.Values;
            StringBuilder sb = new StringBuilder(4096);
            foreach (string str in vals)
            {
                sb.Append(str);
                sb.AppendLine();
            }
            return sb;
        }

        public static string GetTSType(DataType dataType)
        {
            string fieldType = "any";
            switch (dataType)
            {
                case DataType.Binary:
                    fieldType = "number[]";
                    break;
                case DataType.Bool:
                    fieldType = "bool";
                    break;
                case DataType.DateTime:
                case DataType.Date:
                case DataType.Time:
                    fieldType = "Date";
                    break;
                case DataType.Integer:
                case DataType.Decimal:
                case DataType.Float:
                    fieldType = "number";
                    break;
                case DataType.Guid:
                case DataType.String:
                    fieldType = "string";
                    break;
            }
            return fieldType;
        }
    }
}

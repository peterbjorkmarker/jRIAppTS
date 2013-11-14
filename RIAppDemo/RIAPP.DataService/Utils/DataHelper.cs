using System;
using System.Collections;
using System.Collections.Generic;
using System.Reflection;
using RIAPP.DataService.Resources;
using RIAPP.DataService.Utils.Interfaces;

namespace RIAPP.DataService.Utils
{
    public class DataHelper : IDataHelper
    {
        protected readonly IValueConverter _converter;

        public DataHelper(IValueConverter converter)
        {
            this._converter = converter;
        }

        private static IList CreateList<T>()
        {
            return new List<T>();
        }

        private static IEnumerable CreateArray<T>(List<T> list)
        {
            return list.ToArray();
        }

        public bool IsNullableType(Type propType)
        {
            return this._converter.IsNullableType(propType);
        }
      
        public static int GetLocalDateTimezoneOffset(DateTime dt)
        {
            DateTime uval = dt.ToUniversalTime();
            TimeSpan tspn = uval - dt;
            return (int)tspn.TotalMinutes;
        }

        public bool SetProperty(object entity, string propertyName, object value)
        {
            Type enityType = entity.GetType();
            PropertyInfo pinfo = enityType.GetProperty(propertyName);
            if (pinfo == null)
                return false;
            if (!pinfo.CanWrite)
            {
                return false;
            }

            pinfo.SetValue(entity, value, null);
            return true;
        }

        public object GetProperty(object entity, string propertyName)
        {
            Type enityType = entity.GetType();
            PropertyInfo pinfo = enityType.GetProperty(propertyName);
            if (pinfo == null)
                return null;
            return pinfo.GetValue(entity, null);
        }

        public object SetValue(object entity, FieldInfo finfo, string value)
        {
            Type enityType = entity.GetType();
            PropertyInfo pinfo = enityType.GetProperty(finfo.fieldName);
            if (pinfo == null)
                throw new Exception(string.Format(ErrorStrings.ERR_PROPERTY_IS_MISSING, enityType.Name, finfo.fieldName));
            if (!pinfo.CanWrite) {
                throw new Exception(string.Format(ErrorStrings.ERR_PROPERTY_IS_READONLY, finfo.fieldName));
            }

            Type propType = pinfo.PropertyType;
            bool IsNullableType = this._converter.IsNullableType(propType);
            object val = this._converter.ConvertToTyped(propType, finfo.dataType, finfo.dateConversion, value);

            if (val != null)
                pinfo.SetValue(entity, val, null);
            else if (IsNullableType && val == null)
                pinfo.SetValue(entity, val, null);
            else if (!propType.IsValueType && val == null)
                pinfo.SetValue(entity, val, null);
            else
                throw new Exception(string.Format(ErrorStrings.ERR_FIELD_IS_NOT_NULLABLE, finfo.fieldName));
            return val;
        }

        public DataType DataTypeFromType(Type type, out bool isArray)
        {
            return this._converter.DataTypeFromType(type, out isArray);
        }

        public string GetFieldValueAsString(object entity, string fieldName)
        {
            string val;
            bool isOK = this.GetFieldValueAsString(entity, fieldName, false, out val);
            return val;
        }

        /// <summary>
        /// extracts field value from entity, and converts value to string form
        /// </summary>
        public bool GetFieldValueAsString(object entity, string fieldName, bool optional, out string val)
        {
            val = null;
            Type enityType = entity.GetType();
            PropertyInfo pinfo = enityType.GetProperty(fieldName);
            if (pinfo == null && !optional)
                throw new Exception(string.Format(ErrorStrings.ERR_PROPERTY_IS_MISSING, enityType.Name, fieldName));

            if (pinfo == null)
            {
                return false;
            }
            Type propType = pinfo.PropertyType;
            object fieldValue = pinfo.GetValue(entity, null);
            val = this._converter.ConvertToWireFormat(fieldValue, propType);
            return true;
        }

        public static object GetValue(object entity, string fieldName)
        {
            Type enityType = entity.GetType();
            PropertyInfo pinfo = enityType.GetProperty(fieldName);
            if (pinfo == null)
                throw new Exception(string.Format(ErrorStrings.ERR_PROPERTY_IS_MISSING, enityType.Name, fieldName));

            Type propType = pinfo.PropertyType;
            object fieldValue = pinfo.GetValue(entity, null);
            return fieldValue;
        }

        public object ConvertToTyped(Type propType, DataType dataType, DateConversion dateConversion, string value) 
        {
            return this._converter.ConvertToTyped(propType, dataType, dateConversion, value);
        }

        public object ConvertToTyped(Type entityType, FieldInfo finfo, string value)
        {
            PropertyInfo propInfo = entityType.GetProperty(finfo.fieldName);

            if (propInfo == null)
                throw new Exception(ErrorStrings.ERR_PROPERTY_IS_MISSING);

            Type propType = propInfo.PropertyType;

            return this._converter.ConvertToTyped(propType, finfo.dataType, finfo.dateConversion, value);
        }

        public string ConvertToString(object value, Type propType) 
        {
            return this._converter.ConvertToWireFormat(value, propType);
        }

        public object ParseParameter(Type paramType, ParamMetadataInfo pinfo, bool isArray, string val)
        {
            DataType dataType = pinfo.dataType;

            if (isArray && val != null)
            {
                string[] arr = (string[])this._converter.Serializer.DeSerialize(val, typeof(string[]));
                if (arr == null)
                    return null;
                IList list = (IList)typeof(DataHelper).GetMethod("CreateList", BindingFlags.NonPublic | BindingFlags.Static)
                    .MakeGenericMethod(paramType.GetElementType())
                    .Invoke(null, new object[] { });
                foreach (var v in arr)
                {
                    list.Add(ParseParameter(paramType.GetElementType(), pinfo, false, v));
                }

                return typeof(DataHelper).GetMethod("CreateArray", BindingFlags.NonPublic | BindingFlags.Static)
                    .MakeGenericMethod(paramType.GetElementType())
                    .Invoke(null, new object[] { list });
            }
            else
                return this.ConvertToTyped(paramType, dataType, pinfo.dateConversion, val);
        }
    }
}

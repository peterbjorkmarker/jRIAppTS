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
        private IServiceContainer _serviceContainer;

        public DataHelper(IServiceContainer serviceContainer)
        {
            this._serviceContainer = serviceContainer;
        }

        private static IList CreateList<T>()
        {
            return new List<T>();
        }

        private static IEnumerable CreateArray<T>(List<T> list)
        {
            return list.ToArray();
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

        public object SetValue(object entity, FieldInfo fieldInfo, string value)
        {
            Type enityType = entity.GetType();
            PropertyInfo pinfo = enityType.GetProperty(fieldInfo.fieldName);
            if (pinfo == null)
                throw new Exception(string.Format(ErrorStrings.ERR_PROPERTY_IS_MISSING, enityType.Name, fieldInfo.fieldName));
            if (!pinfo.CanWrite) {
                throw new Exception(string.Format(ErrorStrings.ERR_PROPERTY_IS_READONLY, fieldInfo.fieldName));
            }

            Type propType = pinfo.PropertyType;
            bool IsNullableType = this._serviceContainer.ValueConverter.IsNullableType(propType);
            object val = this._serviceContainer.ValueConverter.DeserializeField(propType, fieldInfo, value);

            if (val != null)
                pinfo.SetValue(entity, val, null);
            else if (IsNullableType && val == null)
                pinfo.SetValue(entity, val, null);
            else if (!propType.IsValueType && val == null)
                pinfo.SetValue(entity, val, null);
            else
                throw new Exception(string.Format(ErrorStrings.ERR_FIELD_IS_NOT_NULLABLE, fieldInfo.fieldName));
            return val;
        }

        public string SerializeField(object entity, FieldInfo fieldInfo)
        {
            string val;
            bool isOK = this.SerializeField(entity, fieldInfo, false, out val);
            return val;
        }

        /// <summary>
        /// extracts field value from entity, and converts value to string form
        /// </summary>
        public bool SerializeField(object entity, FieldInfo fieldInfo, bool optional, out string val)
        {
            val = null;
            Type enityType = entity.GetType();
            PropertyInfo pinfo = enityType.GetProperty(fieldInfo.fieldName);
            if (pinfo == null && !optional)
                throw new Exception(string.Format(ErrorStrings.ERR_PROPERTY_IS_MISSING, enityType.Name, fieldInfo.fieldName));

            if (pinfo == null)
            {
                return false;
            }
            Type propType = pinfo.PropertyType;
            object fieldValue = pinfo.GetValue(entity, null);
            val = this._serviceContainer.ValueConverter.SerializeField(propType, fieldInfo, fieldValue);
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

        public object DeserializeField(Type entityType, FieldInfo finfo, string value)
        {
            PropertyInfo propInfo = entityType.GetProperty(finfo.fieldName);

            if (propInfo == null)
                throw new Exception(string.Format(ErrorStrings.ERR_PROPERTY_IS_MISSING,entityType.Name, finfo.fieldName));

            Type propType = propInfo.PropertyType;

            return this._serviceContainer.ValueConverter.DeserializeField(propType, finfo, value);
        }
    
        public object ParseParameter(Type paramType, ParamMetadataInfo pinfo, bool isArray, string val)
        {
            DataType dataType = pinfo.dataType;

            if (isArray && val != null)
            {
                string[] arr = (string[])this._serviceContainer.Serializer.DeSerialize(val, typeof(string[]));
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
                return this._serviceContainer.ValueConverter.DeserializeValue(paramType, dataType, pinfo.dateConversion, val);
        }
    }
}

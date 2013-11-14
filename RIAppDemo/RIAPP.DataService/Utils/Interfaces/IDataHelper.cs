using System;
namespace RIAPP.DataService.Utils.Interfaces
{
    public interface IDataHelper
    {
        bool IsNullableType(Type propType);
        string ConvertToString(object value, Type propType);
        object ConvertToTyped(Type entityType, RIAPP.DataService.FieldInfo finfo, string value);
        object ConvertToTyped(Type propType, RIAPP.DataService.DataType dataType, RIAPP.DataService.DateConversion dateConversion, string value);
        RIAPP.DataService.DataType DataTypeFromType(Type type, out bool isArray);
        string GetFieldValueAsString(object entity, string fieldName);
        bool GetFieldValueAsString(object entity, string fieldName, bool optional, out string val);
        object GetProperty(object entity, string propertyName);
        object ParseParameter(Type paramType, RIAPP.DataService.ParamMetadataInfo pinfo, bool isArray, string val);
        bool SetProperty(object entity, string propertyName, object value);
        object SetValue(object entity, RIAPP.DataService.FieldInfo finfo, string value);
    }
}

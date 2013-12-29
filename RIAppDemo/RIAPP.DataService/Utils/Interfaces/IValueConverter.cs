using System;
using RIAPP.DataService;

namespace RIAPP.DataService.Utils.Interfaces
{
    public interface IValueConverter
    {
        string SerializeField(Type propType, FieldInfo fieldInfo, object value);
        object DeserializeField(Type propType, FieldInfo fieldInfo, string value);
        object DeserializeValue(Type propType, DataType dataType, DateConversion dateConversion, string value);
        bool IsNullableType(Type propType);
        DataType DataTypeFromType(Type type, out bool isArray);
    }
}

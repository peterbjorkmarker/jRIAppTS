using System;
namespace RIAPP.DataService.Utils.Interfaces
{
    public interface IValueConverter
    {
        bool IsNullableType(Type propType);
        object ConvertToTyped(Type propType, RIAPP.DataService.DataType dataType, RIAPP.DataService.DateConversion dateConversion, string value);
        string ConvertToWireFormat(object value, Type propType);
        RIAPP.DataService.DataType DataTypeFromType(Type type, out bool isArray);
        ISerializer Serializer
        {
            get;
        }
    }
}

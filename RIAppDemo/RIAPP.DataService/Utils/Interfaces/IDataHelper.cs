using System;
using RIAPP.DataService;

namespace RIAPP.DataService.Utils.Interfaces
{
    public interface IDataHelper
    {
        string SerializeField(object entity, FieldInfo fieldInfo);
        bool SerializeField(object entity, FieldInfo fieldInfo, bool optional, out string val);
        object DeserializeField(Type entityType, FieldInfo fieldInfo, string value);
        object GetProperty(object entity, string propertyName);
        object ParseParameter(Type paramType, ParamMetadataInfo pinfo, bool isArray, string val);
        bool SetProperty(object entity, string propertyName, object value);
        object SetValue(object entity, FieldInfo fieldInfo, string value);
    }
}

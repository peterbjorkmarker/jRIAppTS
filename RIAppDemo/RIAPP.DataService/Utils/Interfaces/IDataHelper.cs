using System;
using RIAPP.DataService;

namespace RIAPP.DataService.Utils.Interfaces
{
    public interface IDataHelper
    {
        object SerializeField(object entity, FieldInfo fieldInfo);
        string SerializeField(object fieldOwner, string fullName, FieldInfo fieldInfo);
        object DeserializeField(Type entityType, FieldInfo fieldInfo, object value);
        object GetValue(object obj, string propertyName, bool throwErrors);
        bool SetValue(object obj, string propertyName, object value, bool throwErrors);
        object SetFieldValue(object entity, string fullName, FieldInfo fieldInfo, string value);
        object ParseParameter(Type paramType, ParamMetadataInfo pinfo, bool isArray, string val);
        FieldInfo getFieldInfo(DbSetInfo dbSetInfo, string fullName);
        void ForEachFieldInfo(string path, FieldInfo rootField, Action<string, FieldInfo> callBack);
    }
}

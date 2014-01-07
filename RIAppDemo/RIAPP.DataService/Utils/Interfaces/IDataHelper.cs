﻿using System;
using RIAPP.DataService;
using RIAPP.DataService.Types;

namespace RIAPP.DataService.Utils.Interfaces
{
    public interface IDataHelper
    {
        object SerializeField(object entity, Field fieldInfo);
        string SerializeField(object fieldOwner, string fullName, Field fieldInfo);
        object DeserializeField(Type entityType, Field fieldInfo, object value);
        object GetValue(object obj, string propertyName, bool throwErrors);
        bool SetValue(object obj, string propertyName, object value, bool throwErrors);
        object SetFieldValue(object entity, string fullName, Field fieldInfo, string value);
        object ParseParameter(Type paramType, ParamMetadata pinfo, bool isArray, string val);
        Field getFieldInfo(DbSetInfo dbSetInfo, string fullName);
        void ForEachFieldInfo(string path, Field rootField, Action<string, Field> callBack);
    }
}

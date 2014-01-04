using System;
using System.Runtime.Serialization;
using System.Reflection;
using RIAPP.DataService.Resources;
using RIAPP.DataService.Utils;
using RIAPP.DataService.Utils.Interfaces;

namespace RIAPP.DataService
{
    [DataContract]
    public partial class ValueChange
    {
        public ValueChange()
        {
             this.val = null;
             this.orig = null;
             this.flags = ValueFlags.None;
             this.fieldName = string.Empty;
        }

        [DataMember]
        public string val
        {
            get;
            set;
        }

        [DataMember]
        public string orig
        {
            get;
            set;
        }


        [DataMember]
        public string fieldName
        {
            get;
            set;
        }

        [DataMember]
        public ValueFlags flags
        {
            get;
            set;
        }

        /// <summary>
        /// Nested values used for object field
        /// </summary>
        [DataMember]
        public ValuesList nested
        {
            get;
            set;
        }

        public object GetTypedValue(Type entityType, DbSetInfo dbSetInfo, IDataHelper dataHelper)
        {
            FieldInfo fieldInfo = dbSetInfo.GetFieldByNames()[this.fieldName];
            return dataHelper.DeserializeField(entityType, fieldInfo, this.val);
        }
    }
}

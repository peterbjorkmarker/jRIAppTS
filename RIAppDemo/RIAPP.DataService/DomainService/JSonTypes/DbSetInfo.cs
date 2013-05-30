using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Security.Principal;
using System.Web.Script.Serialization;
using System.Reflection;
using RIAPP.DataService.Utils;
using System.ComponentModel;


namespace RIAPP.DataService
{
    [DataContract]
    public class DbSetInfo
    {
       
        #region EqualityComparers
        private class FieldPKEqualityComparer : IEqualityComparer<FieldInfo>
        {
            #region IEqualityComparer<FieldInfo> Members

            public bool Equals(FieldInfo x, FieldInfo y)
            {
                return x.isPrimaryKey == y.isPrimaryKey;
            }

            public int GetHashCode(FieldInfo obj)
            {
                return obj.fieldName.GetHashCode();
            }

            #endregion
        }

        private class FieldNameEqualityComparer : IEqualityComparer<FieldInfo>
        {
            #region IEqualityComparer<FieldInfo> Members

            public bool Equals(FieldInfo x, FieldInfo y)
            {
                return string.Compare(x.fieldName, y.fieldName, StringComparison.CurrentCultureIgnoreCase) == 0;
            }

            public int GetHashCode(FieldInfo obj)
            {
                return obj.fieldName.GetHashCode();
            }

            #endregion
        }
        #endregion

        private FieldInfoList _fieldInfos = new FieldInfoList();
        internal Dictionary<string, FieldInfo> _fieldsByNames;
        internal Dictionary<int, FieldInfo> _fieldsByOrdinal;
        internal MethodInfo _validateDataMethod;
        internal MethodInfo _deleteDataMethod;
        internal MethodInfo _insertDataMethod;
        internal MethodInfo _updateDataMethod;
        internal MethodInfo _refreshDataMethod;

        public DbSetInfo()
        {
            this.enablePaging = true;
            this.pageSize = 25;
            this.isTrackChanges = false;
            this.FetchSize = 0;
        }
        
        [DesignerSerializationVisibility(DesignerSerializationVisibility.Content)]
        [DataMember]
        public FieldInfoList fieldInfos
        {
            get
            {
                return _fieldInfos;
            }
        }

        [DataMember]
        public bool enablePaging
        {
            get;
            set;
        }

        [DataMember]
        public int pageSize
        {
            get;
            set;
        }

        /// <summary>
        /// DbSet name- any unique name to reference this DbSet from code
        /// </summary>
        [DataMember]
        public string dbSetName
        {
            get;
            set;
        }

     
        #region NonSerializable properties
        [DefaultValue(0)]
        [ScriptIgnore]
        [IgnoreDataMember]
        public int FetchSize
        {
            get;
            set;
        }

        [ScriptIgnore]
        [IgnoreDataMember]
        public Type EntityType
        {
            get;
            set;
        }

        [ScriptIgnore]
        [IgnoreDataMember]
        public string deleteDataMethod
        {
            get;
            set;
        }

        [ScriptIgnore]
        [IgnoreDataMember]
        public string insertDataMethod
        {
            get;
            set;
        }

        [ScriptIgnore]
        [IgnoreDataMember]
        public string updateDataMethod
        {
            get;
            set;
        }

        [ScriptIgnore]
        [IgnoreDataMember]
        public string refreshDataMethod
        {
            get;
            set;
        }


        [ScriptIgnore]
        [IgnoreDataMember]
        public string validateDataMethod
        {
            get;
            set;
        }

        [DefaultValue(false)]
        [ScriptIgnore]
        [IgnoreDataMember]
        public bool isTrackChanges
        {
            get;
            set;
        }
        #endregion

    }
}

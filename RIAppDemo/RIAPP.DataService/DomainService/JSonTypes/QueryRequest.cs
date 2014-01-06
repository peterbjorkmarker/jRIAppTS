﻿using System.Runtime.Serialization;
using System.Web.Script.Serialization;

namespace RIAPP.DataService
{
    [DataContract]
    public class QueryRequest
    {
        private FilterInfo _filterInfo = new FilterInfo();
        private SortInfo _sortInfo = new SortInfo();
        private MethodParamInfo _paramInfo = new MethodParamInfo();
     
        [DataMember]
        public string dbSetName
        {
            get;
            set;
        }

        [DataMember]
        public string queryName
        {
            get;
            set;
        }

        [DataMember]
        public FilterInfo filterInfo
        {
            get { return _filterInfo; }
            set { _filterInfo = value; }
        }

        [DataMember]
        public SortInfo sortInfo
        {
            get { return _sortInfo; }
            set { _sortInfo = value; }
        }

        [DataMember]
        public MethodParamInfo paramInfo
        {
            get { return _paramInfo; }
            set { _paramInfo = value; }
        }

        [DataMember]
        public int pageIndex
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

        [DataMember]
        public int pageCount
        {
            get;
            set;
        }


        [DataMember]
        public bool isIncludeTotalCount
        {
            get;
            set;
        }
       
        [ScriptIgnore]
        [IgnoreDataMember]
        public DbSetInfo dbSetInfo
        {
            get;
            set;
        }
    }
}

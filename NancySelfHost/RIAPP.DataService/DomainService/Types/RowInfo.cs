﻿using System;
using System.Runtime.Serialization;
using System.Collections.Generic;
using System.Linq;
using System.Web.Script.Serialization;
using RIAPP.DataService.Utils;

namespace RIAPP.DataService.Types
{
    [DataContract]
    public class RowInfo
    {
        public RowInfo()
        {
            this.changeType = ChangeType.None;
            this.values = new ValuesList();
            serverKey = string.Empty;
        }

        [DataMember]
        public ValuesList values
        {
            get;
            set;
        }

        [DataMember]
        public ChangeType changeType
        {
            get;
            set;
        }

        /// <summary>
        /// Unique server row id in DbSet - primary key values concantenated by ;
        /// </summary>
        [DataMember]
        public string serverKey
        {
            get;
            set;
        }

        /// <summary>
        /// When row change type is added row has empty serverKey
        /// client assigns unique row id to the added row, so after executing insert operation on server
        /// the client could find the row in its rows store.
        /// </summary>
        [DataMember]
        public string clientKey
        {
            get;
            set;
        }

        [DataMember]
        public string error
        {
            get;
            set;
        }


        [DataMember]
        public ValidationErrorInfo[] invalid
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


        [ScriptIgnore]
        [IgnoreDataMember]
        public EntityChangeState changeState
        {
            get;
            set;
        }
       
    }
}

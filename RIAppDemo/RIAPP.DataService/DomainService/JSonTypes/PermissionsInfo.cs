using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;
using System.ComponentModel;
using RIAPP.DataService.Resources;
using RIAPP.DataService;
using System.Security.Principal;
using System.Web.Script.Serialization;
using RIAPP.DataService.Utils;

namespace RIAPP.DataService
{
    [DataContract]
    public partial class PermissionsInfo
    {
        private PermissionList _permissions = new PermissionList();
       
        public PermissionsInfo()
        {
            this.serverTimezone = DataHelper.GetLocalDateTimezoneOffset(DateTime.Now);
        }

        [DataMember]
        public PermissionList permissions
        {
            get
            {
                return _permissions;
            }
            set
            {
                this._permissions = value;
            }
        }


        [DataMember]
        public int serverTimezone
        {
            get;
            set;
        }
    }
}

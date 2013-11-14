using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Security.Principal;
using RIAPP.DataService.Utils.Interfaces;

namespace RIAPP.DataService
{
    public class ServiceArgs: IServiceArgs
    {
        public ServiceArgs() { 
        }
        public IPrincipal principal
        {
            get;
            set;
        }
        public ISerializer serializer
        {
            get;
            set;
        }
    }
}

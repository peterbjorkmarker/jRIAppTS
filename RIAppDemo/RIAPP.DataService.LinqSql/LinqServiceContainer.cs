using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using RIAPP.DataService.Utils.Interfaces;
using RIAPP.DataService.Security;
using System.Security.Principal;
using RIAPP.DataService.Utils;

namespace RIAPP.DataService.LinqSql
{
    public class LinqServiceContainer : ServiceContainer
    {
        public LinqServiceContainer(ISerializer serializer, Type dataServiceType, IPrincipal principal)
            : base(serializer, dataServiceType, principal)
        {
        }

        protected override IValueConverter CreateValueConverter()
        {
            return new LinqValueConverter(this);
        }
    }
}

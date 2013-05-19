using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using RIAPP.DataService;
using RIAPP.DataService.Mvc;
using RIAppDemo.BLL;
using RIAppDemo.BLL.DataServices;
using System.Web.SessionState;
using System.Security.Principal;

namespace RIAppDemo.Controllers
{
    [SessionState(SessionStateBehavior.Disabled)]
    public class RIAppDemoServiceController : DataServiceController<RIAppDemoService>
    {
        protected override IDomainService CreateDomainService()
        {
            IDomainService svc = new RIAppDemoService(this.User);
            return svc;
        }

        [ChildActionOnly]
        public string ProductModelData()
        {
            var info = this.GetDomainService().GetQueryData("ProductModel", "ReadProductModel");
            System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            return serializer.Serialize(info);
        }

        [ChildActionOnly]
        public string ProductCategoryData()
        {
            var info = this.GetDomainService().GetQueryData("ProductCategory", "ReadProductCategory");
            System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            return serializer.Serialize(info);
        }

      
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.SessionState;
using RIAPP.DataService;
using RIAPP.DataService.Utils;

namespace RIAPP.DataService.Mvc
{
    public abstract class DataServiceController<T> : Controller
         where T : BaseDomainService
    {
        protected abstract IDomainService CreateDomainService();
        private IDomainService _DomainService;

        [ChildActionOnly]
        public string Metadata()
        {
            var info = this.DomainService.ServiceGetMetadata();
            return info.ToJSON();
        }

        [ChildActionOnly]
        public string PermissionsInfo()
        {
            var info = this.DomainService.ServiceGetPermissions();
            return info.ToJSON();
        }

        [HttpGet]
        public ActionResult GetTypeScript()
        {
            var info = this.DomainService.ServiceGetTypeScript();
            var res = new ContentResult();
            res.ContentEncoding = System.Text.Encoding.UTF8;
            res.ContentType = System.Net.Mime.MediaTypeNames.Text.Plain;
            res.Content = info;
            return res;
        }

        [HttpPost]
        public ActionResult GetPermissions()
        {
            var info = this.DomainService.ServiceGetPermissions();
            return Json(info);
        }

        [HttpPost]
        public ActionResult GetMetadata()
        {
            var info = this.DomainService.ServiceGetMetadata();
            return Json(info);
        }

        [HttpPost]
        public ActionResult GetItems(GetDataInfo getInfo)
        {
            return new IncrementalResult(this.DomainService.ServiceGetData(getInfo));
        }

        [HttpPost]
        public ActionResult SaveChanges(ChangeSet changeSet)
        {
            var res = this.DomainService.ServiceApplyChangeSet(changeSet);
            return Json(res);
        }

        [HttpPost]
        public ActionResult RefreshItem(RefreshRowInfo getInfo)
        {
            var res = this.DomainService.ServiceRefreshRow(getInfo);
            return Json(res);
        }

        [HttpPost]
        public ActionResult InvokeMethod(InvokeInfo invokeInfo)
        {
            var res = this.DomainService.ServiceInvokeMethod(invokeInfo);
            return Json(res);
        }

        protected IDomainService DomainService
        {
            get
            {
                if (this._DomainService == null)
                {
                    this._DomainService = this.CreateDomainService();
                }
                return this._DomainService;
            }
        }

        protected T GetDomainService()
        {
            return (T)this.DomainService;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing && this._DomainService != null)
            {
                this._DomainService.Dispose();
                this._DomainService = null;
            }
            base.Dispose(disposing);
        }
    }
}

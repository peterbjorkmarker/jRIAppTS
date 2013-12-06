using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.SessionState;
using RIAPP.DataService;
using RIAPP.DataService.Utils;
using RIAPP.DataService.Utils.Interfaces;

namespace RIAPP.DataService.Mvc
{
    public abstract class DataServiceController<T> : Controller
         where T : BaseDomainService
    {
        private readonly ISerializer _serializer;

        public DataServiceController()
        {
            this._serializer = new Serializer();
        }

        protected virtual IDomainService CreateDomainService()
        {
            ServiceArgs args = new ServiceArgs() { principal= this.User, serializer = this.Serializer };
            var service = (IDomainService)Activator.CreateInstance(typeof(T), args);
            return service;
        }

        private IDomainService _DomainService;

        [ChildActionOnly]
        public string Metadata()
        {
            var info = this.DomainService.ServiceGetMetadata();
            return this._serializer.Serialize(info);
        }

        [ChildActionOnly]
        public string PermissionsInfo()
        {
            var info = this.DomainService.ServiceGetPermissions();
            return this._serializer.Serialize(info);
        }

        [HttpGet]
        public ActionResult GetTypeScript()
        {
            string comment = string.Format("\tGenerated from: {0} on {1:yyyy-MM-dd HH:mm} at {1:HH:mm}\r\n\tDon't make manual changes here, because they will be lost when this db interface will be regenerated!", this.ControllerContext.HttpContext.Request.RawUrl, DateTime.Now);
            var info = this.DomainService.ServiceGetTypeScript(comment);
            var res = new ContentResult();
            res.ContentEncoding = System.Text.Encoding.UTF8;
            res.ContentType = System.Net.Mime.MediaTypeNames.Text.Plain;
            res.Content = info;
            return res;
        }

        [HttpGet]
        public ActionResult GetXAML()
        {
            var info = this.DomainService.ServiceGetXAML();
            var res = new ContentResult();
            res.ContentEncoding = System.Text.Encoding.UTF8;
            res.ContentType = System.Net.Mime.MediaTypeNames.Text.Plain;
            res.Content = info;
            return res;
        }

        [HttpGet]
        public ActionResult GetCSharp()
        {
            var info = this.DomainService.ServiceGetCSharp();
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

        public ActionResult GetMetadata()
        {
            var info = this.DomainService.ServiceGetMetadata();
            return Json(info, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult GetItems(GetDataInfo getInfo)
        {
            return new IncrementalResult(this.DomainService.ServiceGetData(getInfo), this._serializer);
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

        public ISerializer Serializer
        {
            get { return this._serializer; }
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

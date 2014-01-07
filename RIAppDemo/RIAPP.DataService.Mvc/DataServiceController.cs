using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.SessionState;
using RIAPP.DataService;
using RIAPP.DataService.Utils;
using RIAPP.DataService.Utils.Interfaces;
using RIAPP.DataService.Types;

namespace RIAPP.DataService.Mvc
{
    public abstract class DataServiceController<T> : Controller
         where T : BaseDomainService
    {
        private ISerializer _serializer;
        private const string JSonContentType = @"application/json";

        #region PRIVATE METHODS
        private ActionResult _GetTypeScript()
        {
            string comment = string.Format("\tGenerated from: {0} on {1:yyyy-MM-dd HH:mm} at {1:HH:mm}\r\n\tDon't make manual changes here, because they will be lost when this db interface will be regenerated!", this.ControllerContext.HttpContext.Request.RawUrl, DateTime.Now);
            var info = this.DomainService.ServiceGetTypeScript(comment);
            var res = new ContentResult();
            res.ContentEncoding = System.Text.Encoding.UTF8;
            res.ContentType = System.Net.Mime.MediaTypeNames.Text.Plain;
            res.Content = info;
            return res;
        }

        private ActionResult _GetXAML()
        {
            var info = this.DomainService.ServiceGetXAML();
            var res = new ContentResult();
            res.ContentEncoding = System.Text.Encoding.UTF8;
            res.ContentType = System.Net.Mime.MediaTypeNames.Text.Plain;
            res.Content = info;
            return res;
        }

        private ActionResult _GetCSharp()
        {
            var info = this.DomainService.ServiceGetCSharp();
            var res = new ContentResult();
            res.ContentEncoding = System.Text.Encoding.UTF8;
            res.ContentType = System.Net.Mime.MediaTypeNames.Text.Plain;
            res.Content = info;
            return res;
        }
        #endregion

        public DataServiceController()
        {
            this._serializer = new Serializer();
            this._DomainService = new Lazy<IDomainService>(() => this.CreateDomainService(),true);
        }

        protected virtual IDomainService CreateDomainService()
        {
            ServiceArgs args = new ServiceArgs(this._serializer, this.User);
            var service = (IDomainService)Activator.CreateInstance(typeof(T), args);
            return service;
        }

        private Lazy<IDomainService> _DomainService;

        [ChildActionOnly]
        public string Metadata()
        {
            var info = this.DomainService.ServiceGetMetadata();
            return this.Serializer.Serialize(info);
        }

        [ChildActionOnly]
        public string PermissionsInfo()
        {
            var info = this.DomainService.ServiceGetPermissions();
            return this.Serializer.Serialize(info);
        }

        [HttpGet]
        public ActionResult CodeGen(string type)
        {
            if (type != null)
            {
                switch (type.ToLowerInvariant())
                {
                    case "ts":
                    case "typescript":
                        return this._GetTypeScript();
                    case "xaml":
                        return this._GetXAML();
                    case "c#":
                    case "csharp":
                        return this._GetCSharp();
                    default:
                        throw new Exception(string.Format("Unknown type argument: {0}", type));
                }
            }
            else
                return this._GetTypeScript();
        }

        [HttpPost]
        public ActionResult GetPermissions()
        {
            var res = this.DomainService.ServiceGetPermissions();
            return Content(this.Serializer.Serialize(res), JSonContentType);
        }

        public ActionResult GetMetadata()
        {
            var res = this.DomainService.ServiceGetMetadata();
            return Content(this.Serializer.Serialize(res), JSonContentType);
        }

        [HttpPost]
        public ActionResult GetItems(QueryRequest request)
        {
            return new IncrementalResult(this.DomainService.ServiceGetData(request), this.Serializer);
        }

        [HttpPost]
        public ActionResult SaveChanges(ChangeSet changeSet)
        {
            var res = this.DomainService.ServiceApplyChangeSet(changeSet);
            return Content(this.Serializer.Serialize(res), JSonContentType);
        }

        [HttpPost]
        public ActionResult RefreshItem(RefreshInfo refreshInfo)
        {
            var res = this.DomainService.ServiceRefreshRow(refreshInfo);
            return Content(this.Serializer.Serialize(res), JSonContentType);
        }

        [HttpPost]
        public ActionResult InvokeMethod(InvokeRequest invokeInfo)
        {
            var res = this.DomainService.ServiceInvokeMethod(invokeInfo);
            return Content(this.Serializer.Serialize(res), JSonContentType);
        }

        protected IDomainService DomainService
        {
            get
            {
                return this._DomainService.Value;
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
            if (disposing && this._DomainService.IsValueCreated)
            {
                this._DomainService.Value.Dispose();
            }
            this._DomainService = null;
            this._serializer = null;
            base.Dispose(disposing);
        }
    }
}

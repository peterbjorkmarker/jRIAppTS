﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Security.Principal;
using Nancy;
using Nancy.Responses;
using Nancy.ModelBinding;
using RIAPP.DataService;
using RIAPP.DataService.Utils;
using RIAPP.DataService.Utils.Interfaces;
using RIAPPInterface = RIAPP.DataService.Utils.Interfaces;
using RIAPP.DataService.Types;
using System.Threading.Tasks;



namespace RIAPP.DataService.Nancy
{
	public abstract class RIAPPSvcModule<T> : NancyModule, IDisposable
        where T : BaseDomainService
	{
        private RIAPPInterface.ISerializer _serializer;
        private Lazy<IDomainService> _DomainService;
        private static BindingConfig bconfig = new BindingConfig() { BodyOnly = true, IgnoreErrors = false, Overwrite = true };
        private IPrincipal _user;
        private object _sync_user = new object();

        public RIAPPSvcModule()
            : this("/")
        {
           
        }

        public RIAPPSvcModule(string modulePath)
            : base(modulePath)
		{
            this._serializer = new Serializer();
            this._DomainService = new Lazy<IDomainService>(() => this.CreateDomainService(), true);

            Get["/code"] = x => {
                return new TextResponse(this.GetCode(this.Context.Request.Query.lang));
            };

            Get["/permissions"] = x =>
            {
                return this.GetPermissionsInfo();
            };

            Post["/query", runAsync: true] = async (parameters, ct) =>
            {
                var request = this.Bind<QueryRequest>(bconfig);
                return await this.PerformQuery(request);
            };

            Post["/save", runAsync: true] = async (parameters, ct) =>
            {
                var request = this.Bind<ChangeSet>(bconfig);
                return await this.Save(request);
            };

            Post["/refresh", runAsync: true] = async (parameters, ct) =>
            {
                var request = this.Bind<RefreshInfo>(bconfig);
                return await this.Refresh(request);
            };

            Post["/invoke", runAsync: true] = async (parameters, ct) =>
            {
                var request = this.Bind<InvokeRequest>(bconfig);
                return await this.Invoke(request);
            };
		}

        #region PRIVATE METHODS
        private string _GetTypeScript()
        {
            string comment = string.Format("\tGenerated from: {0} on {1:yyyy-MM-dd HH:mm} at {1:HH:mm}\r\n\tDon't make manual changes here, because they will be lost when this db interface will be regenerated!", this.Context.Request.Url.ToString(), DateTime.Now);
            return this.DomainService.ServiceGetTypeScript(comment);
        }

        private string _GetXAML()
        {
            return this.DomainService.ServiceGetXAML();
        }

        private string _GetCSharp()
        {
            return this.DomainService.ServiceGetCSharp();
        }
        #endregion

        public virtual IPrincipal User
        {
            get
            {
                lock (this._sync_user)
                {
                    if (this._user != null)
                        return this._user;
                    var ident = this.Context.CurrentUser;
                    if (ident != null)
                    {
                        IIdentity identity = new GenericIdentity(ident.UserName, "form");
                        this._user = new GenericPrincipal(identity, ident.Claims.ToArray());
                    }
                    else
                    {
                        this._user = new GenericPrincipal(new GenericIdentity(""), new string[0]);
                    }
                    return this._user;
                }
            }
        }

        protected virtual IDomainService CreateDomainService()
        {
            ServiceArgs args = new ServiceArgs(this._serializer, this.User);
            var service = (IDomainService)Activator.CreateInstance(typeof(T), args);
            return service;
        }

        public Response GetPermissionsInfo()
        {
            var res = this.DomainService.ServiceGetPermissions();
            return Response.AsJson(res);
        }

        protected string GetCode(string lang)
        {
            if (lang != null)
            {
                switch (lang.ToLowerInvariant())
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
                        throw new Exception(string.Format("Unknown type argument: {0}", lang));
                }
            }
            else
                return this._GetTypeScript();
        }

        protected async Task<Response> PerformQuery(QueryRequest request)
        {
            var queryResponse = await this.DomainService.ServiceGetData(request);
            return new IncrementalResult(queryResponse, this.Serializer);
        }

        protected async Task<Response> Save(ChangeSet changeSet)
        {
            var res = await this.DomainService.ServiceApplyChangeSet(changeSet);
            return Response.AsJson(res);
        }

        protected async Task<Response> Refresh(RefreshInfo refreshInfo)
        {
            var res = await this.DomainService.ServiceRefreshRow(refreshInfo);
            return Response.AsJson(res);
        }

        protected async Task<Response> Invoke(InvokeRequest invokeInfo)
        {
            var res = await this.DomainService.ServiceInvokeMethod(invokeInfo);
            return Response.AsJson(res);
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

        public RIAPPInterface.ISerializer Serializer
        {
            get { return this._serializer; }
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing && this._DomainService.IsValueCreated)
            {
                this._DomainService.Value.Dispose();
            }
            this._DomainService = null;
            this._serializer = null;
        }

        void IDisposable.Dispose()
        {
            this.Dispose(true);
        }
    }
}

using System.Net;
using System.Net.Http;
using System.Web.Http;
using RIAPP.DataService.Types;
using RIAppDemo.BLL.DataServices;
using RIAPP.DataService.WebApi;

namespace RIAppDemo.Controllers
{
    public class RIAppDemoWebApiController : BaseWebApiController<RIAppDemoService>
    {
        public RIAppDemoWebApiController()
        {
        }
                     
        #region Inherited Public API
        [ActionName("xaml")]
        [HttpGet]
        public override IHttpActionResult GetXAML(HttpRequestMessage request)
        {
            return base.GetXAML(request);
        }

        [ActionName("csharp")]
        [HttpGet]
        public override IHttpActionResult GetCSHARP(HttpRequestMessage request)
        {
            return base.GetCSHARP(request);
        }

        [ActionName("ts")]
        [HttpGet]
        public override IHttpActionResult GetTypeScript(HttpRequestMessage request)
        {
            return base.GetTypeScript(request);
        }

        [ActionName("permissions")]
        [HttpGet]
        public override HttpResponseMessage Permissions()
        {
            return base.Permissions();
        }

        [ActionName("query")]
        [HttpPost]
        public override IHttpActionResult Query(HttpRequestMessage request, [FromBody] QueryRequest query)
        {
            return base.Query(request, query);
        }

        [ActionName("refresh")]
        [HttpPost]
        public override HttpResponseMessage Refresh([FromBody] RefreshInfo refreshInfo)
        {
            return base.Refresh(refreshInfo);
        }

        [ActionName("invoke")]
        [HttpPost]
        public override HttpResponseMessage Invoke([FromBody] InvokeRequest invokeInfo)
        {
            return base.Invoke(invokeInfo);
        }

        [ActionName("save")]
        [HttpPost]
        public override HttpResponseMessage Save([FromBody] ChangeSet changeSet)
        {
            return base.Save(changeSet);
        }
       #endregion
    }
}

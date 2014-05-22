using System.Net;
using System.Net.Http;
using System.Web.Http;
using RIAPP.DataService.Types;
using RIAppDemo.BLL.DataServices;
using RIAPP.DataService.WebApi;

namespace RIAppDemo.Controllers
{
    public class RIAppDemoController : BaseWebApiController<RIAppDemoService>
    {
        public RIAppDemoController()
        {
        }
                     
        #region Inherited Public API
        [ActionName("xaml")]
        [HttpGet]
        public new IHttpActionResult GetXAML(HttpRequestMessage request)
        {
            return base.GetXAML(request);
        }

        [ActionName("csharp")]
        [HttpGet]
        public new IHttpActionResult GetCSHARP(HttpRequestMessage request)
        {
            return base.GetCSHARP(request);
        }

        [ActionName("ts")]
        [HttpGet]
        public new IHttpActionResult GetTypeScript(HttpRequestMessage request)
        {
            return base.GetTypeScript(request);
        }

        [ActionName("permissions")]
        [HttpGet]
        public new HttpResponseMessage Permissions()
        {
            return base.Permissions();
        }

        [ActionName("query")]
        [HttpPost]
        public new IHttpActionResult Query(HttpRequestMessage request, [FromBody] QueryRequest query)
        {
            return base.Query(request, query);
        }

        [ActionName("refresh")]
        [HttpPost]
        public new HttpResponseMessage Refresh([FromBody] RefreshInfo refreshInfo)
        {
            return base.Refresh(refreshInfo);
        }

        [ActionName("invoke")]
        [HttpPost]
        public new HttpResponseMessage Invoke([FromBody] InvokeRequest invokeInfo)
        {
            return base.Invoke(invokeInfo);
        }

        [ActionName("save")]
        [HttpPost]
        public new HttpResponseMessage Save([FromBody] ChangeSet changeSet)
        {
            return base.Save(changeSet);
        }
       #endregion
    }
}

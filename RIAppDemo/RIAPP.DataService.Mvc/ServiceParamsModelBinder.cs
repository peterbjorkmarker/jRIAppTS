using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using RIAPP.DataService.Types;

namespace RIAPP.DataService.Mvc
{
    public class SericeParamsBinderAttribute : CustomModelBinderAttribute
    {
        public override IModelBinder GetBinder()
        {
            return new JsonModelBinder();
        }

        public class JsonModelBinder : IModelBinder
        {
            public object BindModel(ControllerContext controllerContext,ModelBindingContext bindingContext)
            {
                try
                {
                    var bytes = new byte[controllerContext.HttpContext.Request.ContentLength];
                    controllerContext.HttpContext.Request.InputStream.Position = 0;
                    controllerContext.HttpContext.Request.InputStream.Read(bytes, 0, bytes.Length);
                    var json = System.Text.Encoding.UTF8.GetString(bytes);
                    var serializer = new Serializer();
                    return serializer.DeSerialize(json, bindingContext.ModelType);
                        
                }
                catch (Exception ex)
                {
                    if (bindingContext.ModelType == typeof(QueryRequest))
                    {
                        return new QueryResponse()
                        {
                            pageIndex = 0,
                            pageCount = 0,
                            rows = new Row[0],
                            dbSetName = null,
                            totalCount = null,
                            error = new ErrorInfo(ex.Message, ex.GetType().Name)
                        };
                    }
                    else if (bindingContext.ModelType == typeof(ChangeSet))
                    {
                        return new ChangeSet()
                        {
                            error = new ErrorInfo(ex.Message, ex.GetType().Name)
                        };
                    }
                    else if (bindingContext.ModelType == typeof(RefreshInfo))
                    {
                        return new RefreshInfo()
                        {
                            error = new ErrorInfo(ex.Message, ex.GetType().Name)
                        };
                    }
                    else if (bindingContext.ModelType == typeof(InvokeRequest))
                    {
                        return new InvokeResponse()
                        {
                            error = new ErrorInfo(ex.Message, ex.GetType().Name)
                        };
                    }
                    else
                        return null;
                }
            }
        }
    }
}

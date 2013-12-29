using System;
using System.Runtime.Serialization;
using System.ComponentModel;
using System.Collections.Generic;
using System.Reflection;
using System.Web.Script.Serialization;
using System.Linq;
using RIAPP.DataService.Utils;
using RIAPP.DataService.Utils.Interfaces;

namespace RIAPP.DataService
{
    [DataContract]
    public class MethodDescription
    {

        public MethodDescription()
        {
            this.parameters = new List<ParamMetadataInfo>();
            this.methodResult = false;
        }

        [DataMember]
        public string methodName
        {
            get;
            set;
        }

        [DataMember]
        public List<ParamMetadataInfo> parameters
        {
            get;
            set;
        }

        [DataMember]
        [Description("Returns or not result from method invocation")]
        public bool methodResult
        {
            get;
            set;
        }

        [DataMember]
        [Description("is it Query method")]
        public bool isQuery
        {
            get;
            set;
        }

        [IgnoreDataMember]
        [ScriptIgnore]
        public MethodInfo methodInfo
        {
            get;
            set;
        }

      
        /// <summary>
        /// Generates Data Services' method description which is convertable to JSON
        /// and can be consumed by clients
        /// </summary>
        /// <param name="methodInfo"></param>
        /// <param name="isQuery"></param>
        /// <param name="dataHelper"></param>
        /// <returns></returns>
        public static MethodDescription FromMethodInfo(MethodInfo methodInfo, bool isQuery, IServiceContainer container)
        {
            Type returnType = methodInfo.ReturnType;
            bool isVoid = returnType == typeof(void);
            MethodDescription methDescription = new MethodDescription();
            methDescription.methodInfo = methodInfo;
            methDescription.methodName = methodInfo.Name;
            methDescription.isQuery = isQuery;

            if (!isVoid)
                methDescription.methodResult = true;
            //else Result is Converted to JSON
            ParameterInfo[] paramsInfo = methodInfo.GetParameters();
            for (var i = 0; i < paramsInfo.Length; ++i) {
                ParamMetadataInfo param = ParamMetadataInfo.FromParamInfo(paramsInfo[i], container);
                param.ordinal = i;
                methDescription.parameters.Add(param);
            }
            return methDescription;
        }
    }
}

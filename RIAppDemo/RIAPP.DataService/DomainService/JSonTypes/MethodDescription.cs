using System;
using System.Runtime.Serialization;
using System.ComponentModel;
using System.Collections.Generic;
using System.Reflection;
using System.Web.Script.Serialization;
using System.Linq;
using RIAPP.DataService.Utils;

namespace RIAPP.DataService
{
    /// <summary>
    /// Stores information about parameter
    /// used to check values recieved from client
    /// before service method invocations
    /// </summary>
    [DataContract]
    public class ParamMetadataInfo
    {
        public ParamMetadataInfo()
        {
            this.name = "";
            this.dataType = DataType.None;
            this.ordinal = -1;
            this.isNullable = false;
            this.isArray = false;
            this.dateConversion = DateConversion.None;
        }

        [DataMember]
        [Description("Parameter name")]
        public string name
        {
            get;
            set;
        }

        [DataMember]
        [Description("Parameter type")]
        public DataType dataType
        {
            get;
            set;
        }

        [DataMember]
        [Description("True if parameter is array")]
        public bool isArray
        {
            get;
            set;
        }

        [DataMember]
        [Description("Parameter position")]
        public bool isNullable
        {
            get;
            set;
        }

        [DataMember]
        [Description("How adjust date timezone between server and client")]
        public DateConversion dateConversion
        {
            get;
            set;
        }

        [DataMember]
        [Description("Parameter position")]
        public int ordinal
        {
            get;
            set;
        }

        [IgnoreDataMember]
        [ScriptIgnore]
        public Type ParameterType
        {
            get;
            set;
        }

        /// <summary>
        /// Extracts from ParameterInfo all information about method parameter
        /// </summary>
        /// <returns>ParamMetadataInfo</returns>
        public static ParamMetadataInfo FromParamInfo(ParameterInfo pinfo, IDataHelper dataHelper) {
            Type ptype = pinfo.ParameterType;
            if (pinfo.IsOut)
                throw new DomainServiceException("Out parameters are not supported in service methods");
            ParamMetadataInfo paramInfo = new ParamMetadataInfo();
            paramInfo.isNullable = dataHelper.IsNullableType(ptype);
            paramInfo.name = pinfo.Name;
            paramInfo.ParameterType = ptype;
            Type realType = null;
            if (!paramInfo.isNullable)
                realType = ptype;
            else
                realType = Nullable.GetUnderlyingType(ptype);
            object[] dtops = pinfo.GetCustomAttributes(typeof(DateOptionAttribute), false);
            if (dtops.Length > 0) {
               paramInfo.dateConversion = (dtops[0] as DateOptionAttribute).dateConversion;
            }
            bool isArray = false;
            paramInfo.dataType = dataHelper.DataTypeFromType(realType, out isArray);
            paramInfo.isArray = isArray;
            return paramInfo;
        }
    }

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
        public static MethodDescription FromMethodInfo(MethodInfo methodInfo, bool isQuery, IDataHelper dataHelper)
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
                if (isQuery && paramsInfo[i].ParameterType == typeof(GetDataInfo))
                    continue;
                ParamMetadataInfo param = ParamMetadataInfo.FromParamInfo(paramsInfo[i], dataHelper);
                param.ordinal = i;
                methDescription.parameters.Add(param);
            }
            return methDescription;
        }
    }

}

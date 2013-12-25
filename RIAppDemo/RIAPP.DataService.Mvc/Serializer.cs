using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using RIAPP.DataService.Utils.Interfaces;

namespace RIAPP.DataService.Mvc
{
    /// <summary>
    /// serialize an object to JSON
    /// </summary>
    public class Serializer : ISerializer
    {
        private Lazy<System.Web.Script.Serialization.JavaScriptSerializer> _serializer;

        public Serializer()
        {
            this._serializer = new Lazy<System.Web.Script.Serialization.JavaScriptSerializer>(() => new System.Web.Script.Serialization.JavaScriptSerializer(), true);
        }

        string ISerializer.Serialize(object obj)
        {
            return this.serializer.Serialize(obj);
        }

        object ISerializer.DeSerialize(string input, Type targetType)
        {
            return this.serializer.Deserialize(input, targetType);
        }

        object ISerializer.DeserializeObject(string input)
        {
            return this.serializer.DeserializeObject(input);
        }

        internal System.Web.Script.Serialization.JavaScriptSerializer serializer
        {
            get
            {
                return this._serializer.Value;
            }
        }
    }

}

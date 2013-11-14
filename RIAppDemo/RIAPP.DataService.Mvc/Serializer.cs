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
        private System.Web.Script.Serialization.JavaScriptSerializer _serializer;
        public Serializer()
        {
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
                if (this._serializer == null)
                    this._serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
                return this._serializer;

            }
        }
    }

}

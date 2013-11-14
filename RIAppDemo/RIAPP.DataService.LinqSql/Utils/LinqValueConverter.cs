﻿using System;
using RIAPP.DataService.Utils.Interfaces;


namespace RIAPP.DataService.Utils
{
    public class LinqValueConverter: ValueConverter
    {
        public LinqValueConverter(ISerializer serializer):base(serializer)
        {
        }

        protected override object ConvertToBinary(string value, Type propType)
        {
            if (value == null)
                return null;
            if (propType != typeof(System.Data.Linq.Binary))
                  return base.ConvertToBinary(value, propType);
            else
            {
                return new System.Data.Linq.Binary((byte[])base.ConvertToBinary(value, typeof(byte[])));
            }
        }

        protected override object ConvertToString(string value, Type propType)
        {
            if (value == null)
                return null;
            if (propType != typeof(System.Xml.Linq.XElement))
                return base.ConvertToString(value, propType);
            else
                return System.Xml.Linq.XElement.Parse(value);
        }

      
        protected string LinqBinaryToString(object value)
        {
            if (value == null)
                return null;
            byte[] res = ((System.Data.Linq.Binary)value).ToArray();
            return this.BytesToString(res);
        }

        public override string ConvertToWireFormat(object value, Type propType)
        {
            if (propType == typeof(System.Data.Linq.Binary))
                return LinqBinaryToString(value);
            else
                return base.ConvertToWireFormat(value, propType);
        }
   
        public override DataType DataTypeFromType(Type type, out bool isArray)
        {
            isArray = false;
            string name = type.FullName;

            switch (name)
            {
                case "System.Data.Linq.Binary":
                    return DataType.Binary;
                case "System.Xml.Linq.XElement":
                    return DataType.String;
                default:
                    return base.DataTypeFromType(type, out isArray);
            }
        }
    }
}

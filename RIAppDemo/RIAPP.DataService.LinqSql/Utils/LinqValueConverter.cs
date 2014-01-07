﻿using System;
using RIAPP.DataService.Utils.Interfaces;
using RIAPP.DataService.Types;


namespace RIAPP.DataService.Utils
{
    public class LinqValueConverter: ValueConverter
    {
        public LinqValueConverter(IServiceContainer serviceContainer)
            : base(serviceContainer)
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

        public override string SerializeField(Type propType, Field fieldInfo, object value)
        {
            if (propType == typeof(System.Data.Linq.Binary))
                return LinqBinaryToString(value);
            else
                return base.SerializeField(propType, fieldInfo, value);
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

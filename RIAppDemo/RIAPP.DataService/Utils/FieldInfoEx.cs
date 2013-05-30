using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RIAPP.DataService.Utils
{
    public static class FieldInfoEx
    {
        public static bool isIncludeInResult(this FieldInfo fieldInfo)
        {
            return !fieldInfo.isClientOnly && !fieldInfo.isCalculated;
        }
    }
}

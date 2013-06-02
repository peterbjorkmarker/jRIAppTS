using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using RIAPP.DataService.Security;
using System.Reflection;


namespace RIAPP.DataService.Utils
{
    public static class RowInfoEx
    {

        public static string[] GetChangedFieldNames(this RowInfo rowInfo)
        {
            return rowInfo.values.Where(fv => (fv.flags & ValueFlags.Changed) == ValueFlags.Changed).Select(fv => fv.fieldName).ToArray();
        }

        public static object[] GetPKValues(this RowInfo rowInfo, DataHelper dataHelper)
        {
            Type entityType = rowInfo.dbSetInfo.EntityType;
            FieldInfo[] finfos = rowInfo.dbSetInfo.GetPKFieldInfos();
            object[] result = new object[finfos.Length];
            for (int i = 0; i < finfos.Length; ++i)
            {
                ValueChange fv = rowInfo.GetValue(finfos[i].fieldName);
                result[i] = fv.GetTypedValue(entityType, rowInfo.dbSetInfo, dataHelper);
            }
            return result;
        }

        public static string GetRowKeyAsString(this RowInfo rowInfo)
        {
            FieldInfo[] finfos = rowInfo.dbSetInfo.GetPKFieldInfos();
            string[] vals = new string[finfos.Length];
            for (int i = 0; i < finfos.Length; ++i)
            {
                ValueChange fv = rowInfo.GetValue(finfos[i].fieldName);
                vals[i] = fv.val;
            }
            return string.Join(";", vals);
        }

        /// <summary>
        /// FieldNames which values has been changed by client
        /// </summary>
        /// <returns></returns>
        public static string[] GetNamesOfChanged(this RowInfo rowInfo)
        {
            return rowInfo.values.Where(fv => (fv.flags | ValueFlags.Changed) == ValueFlags.Changed).Select(fv => fv.fieldName).ToArray();
        }


        public static ValueChange GetValue(this RowInfo rowInfo, string fieldName)
        {
            ValueChange fv = rowInfo.values.Single(v => v.fieldName == fieldName);
            return fv;
        }
    }
}

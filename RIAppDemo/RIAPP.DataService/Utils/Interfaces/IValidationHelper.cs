using System;
namespace RIAPP.DataService.Utils
{
    public interface IValidationHelper
    {
        void CheckRange(RIAPP.DataService.FieldInfo fieldInfo, string val);
        void CheckString(RIAPP.DataService.FieldInfo fieldInfo, string val);
        void CheckValue(RIAPP.DataService.FieldInfo fieldInfo, string val);
    }
}

using RIAPP.DataService.Security;
using RIAPP.DataService.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using RIAPP.DataService.Resources;


namespace RIAPP.DataService.Utils
{
    public static class DbSetInfoEx
    {
        #region Utility Methods
        public static DbSetPermit CalculatePermissions(this DbSetInfo dbSetInfo, IAuthorizer authorizer)
        {
            return SecurityHelper.GetDbSetPermissions(dbSetInfo, authorizer);
        }

        public static MethodInfo getOperationMethodInfo(this DbSetInfo dbSetInfo, string oper)
        {
            switch (oper.ToLowerInvariant())
            {
                case OperationNames.REFRESH:
                    return dbSetInfo._refreshDataMethod;
                case OperationNames.CREATE:
                    return dbSetInfo._insertDataMethod;
                case OperationNames.UPDATE:
                    return dbSetInfo._updateDataMethod;
                case OperationNames.DELETE:
                    return dbSetInfo._deleteDataMethod;
                case OperationNames.VALIDATE:
                    return dbSetInfo._validateDataMethod;
                default:
                    throw new DomainServiceException(string.Format("Invalid Operation name {0}", oper));
            }
        }

        /// <summary>
        /// typically methods names use templated scheme like: insert{0} or delete{0}
        /// where {0} later is replaced by dbSet's name, that will turn into something like: insertCustomer or deleteCustomer 
        /// </summary>
        /// <param name="methodNameTemplate"></param>
        /// <param name="dbSetName"></param>
        /// <returns></returns>
        private static string GenerateMethodName(string methodNameTemplate, string dbSetName)
        {
            try
            {
                return string.Format(methodNameTemplate, dbSetName);
            }
            catch
            {
                //return as is
                return methodNameTemplate;
            }
        }

        public static string getOperationMethodName(this DbSetInfo dbSetInfo, string oper)
        {
            switch (oper.ToLowerInvariant())
            {
                case OperationNames.REFRESH:
                    if (string.IsNullOrWhiteSpace(dbSetInfo.refreshDataMethod))
                        return null;
                    return GenerateMethodName(dbSetInfo.refreshDataMethod, dbSetInfo.dbSetName);
                case OperationNames.CREATE:
                    if (string.IsNullOrWhiteSpace(dbSetInfo.insertDataMethod))
                        return null;
                    return GenerateMethodName(dbSetInfo.insertDataMethod, dbSetInfo.dbSetName);
                case OperationNames.UPDATE:
                    if (string.IsNullOrWhiteSpace(dbSetInfo.updateDataMethod))
                        return null;
                    return GenerateMethodName(dbSetInfo.updateDataMethod, dbSetInfo.dbSetName);
                case OperationNames.DELETE:
                    if (string.IsNullOrWhiteSpace(dbSetInfo.deleteDataMethod))
                        return null;
                    return GenerateMethodName(dbSetInfo.deleteDataMethod, dbSetInfo.dbSetName);
                case OperationNames.VALIDATE:
                    if (string.IsNullOrWhiteSpace(dbSetInfo.validateDataMethod))
                        return null;
                    return GenerateMethodName(dbSetInfo.validateDataMethod, dbSetInfo.dbSetName);
                default:
                    throw new DomainServiceException(string.Format("Invalid Operation name {0}", oper));
            }
        }

        public static Dictionary<string, Field> GetFieldByNames(this DbSetInfo dbSetInfo)
        {
            return dbSetInfo._fieldsByNames;
        }


        private static void SetOrdinal(Field[] fieldInfos)
        {
            int i = 0, cnt = fieldInfos.Length;
            for (i = 0; i < cnt; ++i)
            {
                fieldInfos[i]._ordinal = i;
                if (fieldInfos[i].fieldType == FieldType.Object)
                {
                    SetOrdinal(fieldInfos[i].nested.ToArray());
                }
            }
        }

        public static void InitMethods(this DbSetInfo dbSetInfo, Type serviceType)
        {
            System.Reflection.FieldInfo[] fields = typeof(OperationNames).GetFields(BindingFlags.Public | BindingFlags.Static);
            Array.ForEach(fields, (fl) =>
            {
                if (!fl.IsSpecialName && fl.IsLiteral && !fl.IsInitOnly)
                {
                    string operName = fl.GetValue(null).ToString();
                    string methodName = dbSetInfo.getOperationMethodName(operName);
                    MethodInfo minfo = DataHelper.GetMethodInfo(serviceType, methodName);
                    if (minfo != null)
                    {
                        switch (operName)
                        {
                            case OperationNames.REFRESH:
                                dbSetInfo._refreshDataMethod = minfo;
                                break;
                            case OperationNames.CREATE:
                                dbSetInfo._insertDataMethod = minfo;
                                break;
                            case OperationNames.UPDATE:
                                dbSetInfo._updateDataMethod = minfo;
                                break;
                            case OperationNames.DELETE:
                                dbSetInfo._deleteDataMethod = minfo;
                                break;
                            case OperationNames.VALIDATE:
                                dbSetInfo._validateDataMethod = minfo;
                                break;
                            default:
                                throw new DomainServiceException(string.Format("Invalid Operation name {0}", operName));
                        }
                    }
                }
            });
        }

        public static void Initialize(this DbSetInfo dbSetInfo, Type serviceType, IServiceContainer services)
        {
            dbSetInfo._fieldsByNames = new Dictionary<string, Field>();
            int i = 0; 
            var fieldInfos = dbSetInfo.fieldInfos.ToArray();
            int cnt = fieldInfos.Length;

            for (i = 0; i < cnt; ++i)
            {
                services.DataHelper.ForEachFieldInfo("", fieldInfos[i], (fullName, fieldInfo) =>
                {
                    fieldInfo._FullName = fullName;
                    dbSetInfo._fieldsByNames.Add(fullName, fieldInfo);
                });
            }
            SetOrdinal(fieldInfos);
            var pkFields = dbSetInfo.GetPKFields();
            if (pkFields.Length < 1)
            {
                throw new DomainServiceException(string.Format(ErrorStrings.ERR_DBSET_HAS_NO_PK, dbSetInfo.dbSetName));
            }
            var fbn = dbSetInfo.GetFieldByNames();
            dbSetInfo.InitMethods(serviceType);
        }
        #endregion
    }
}

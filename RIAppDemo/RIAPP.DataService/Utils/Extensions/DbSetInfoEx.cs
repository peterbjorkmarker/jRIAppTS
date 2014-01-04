using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using RIAPP.DataService.Security;
using System.Reflection;


namespace RIAPP.DataService.Utils
{
    public static class DbSetInfoEx
    {
        public static MethodInfo GetMethodInfo(Type t, string name)
        {
            MethodInfo meth = null;
            if (!string.IsNullOrEmpty(name))
                meth = t.GetMethod(name, BindingFlags.Instance | BindingFlags.Public | BindingFlags.DeclaredOnly);
            return meth;
        }

        public static FieldInfo[] GetPKFieldInfos(this DbSetInfo dbSetInfo)
        {
            return dbSetInfo.fieldInfos.Where(fi => fi.isPrimaryKey > 0).OrderBy(fi => fi.isPrimaryKey).ToArray();
        }

        public static FieldInfo GetRowTimeStampFieldInfo(this DbSetInfo dbSetInfo)
        {
            return dbSetInfo.fieldInfos.Where(fi => fi.fieldType == FieldType.RowTimeStamp).FirstOrDefault();
        }

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

        public static Dictionary<string, FieldInfo> GetFieldByNames(this DbSetInfo dbSetInfo)
        {
            System.Threading.LazyInitializer.EnsureInitialized<Dictionary<string, FieldInfo>>(ref dbSetInfo._fieldsByNames, () => dbSetInfo.fieldInfos.ToDictionary(f => f.fieldName));
            return dbSetInfo._fieldsByNames;
        }

        private static void SetOrdinal(FieldInfo[] fieldInfos)
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

        public static Dictionary<int, FieldInfo> GetFieldByOrdinal(this DbSetInfo dbSetInfo)
        {
            System.Threading.LazyInitializer.EnsureInitialized<Dictionary<int, FieldInfo>>(ref dbSetInfo._fieldsByOrdinal, () =>
            {
                SetOrdinal(dbSetInfo.fieldInfos.ToArray());   
                return dbSetInfo.fieldInfos.ToDictionary(f => f._ordinal);
            });
            return dbSetInfo._fieldsByOrdinal;
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
                    MethodInfo minfo = DbSetInfoEx.GetMethodInfo(serviceType, methodName);
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

        public static void Initialize(this DbSetInfo dbSetInfo, Type serviceType)
        {
            var fbo = dbSetInfo.GetFieldByOrdinal();
            var fbn = dbSetInfo.GetFieldByNames();
            dbSetInfo.InitMethods(serviceType);
        }
        #endregion
    }
}

using RIAPP.DataService.Resources;
using RIAPP.DataService.Security;
using RIAPP.DataService.Types;
using RIAPP.DataService.Utils;
using RIAPP.DataService.Utils.Interfaces;
using StaThreadSyncronizer;
using System;
using System.Collections;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Reflection;

namespace RIAPP.DataService
{
    public abstract class BaseDomainService: IDomainService
    {
        public class PerRequestState
        {
            private ChangeSet _currentChangeSet;

            private DbSet _currentDbSet;

            private RowInfo _currentRowInfo;

            private QueryRequest _currentQueryInfo;

            private ServiceOperationType _currentOperation;

            public DbSet CurrentDbSet
            {
                get { return _currentDbSet; }
                set { _currentDbSet = value; }
            }

            public ChangeSet CurrentChangeSet
            {
                get { return _currentChangeSet; }
                set { _currentChangeSet = value; }
            }

            public RowInfo CurrentRowInfo
            {
                get { return _currentRowInfo; }
                set { _currentRowInfo = value; }
            }

            public QueryRequest CurrentQueryInfo
            {
                get { return _currentQueryInfo; }
                set { _currentQueryInfo = value; }
            }

            public ServiceOperationType CurrentOperation
            {
                get { return _currentOperation; }
                set { _currentOperation = value; }
            }
        }

        #region private members
        private static StaSynchronizationContext _synchronizer = new StaSynchronizationContext();
        private static MetadataCache _metadataCache = new MetadataCache();
        private static ConcurrentDictionary<Type, MethodsList> _methodsInfo = new ConcurrentDictionary<Type, MethodsList>();
        private PerRequestState _requestState = new PerRequestState();
        private CachedMetadata _cachedMetadata;
        private IPrincipal _principal;
        private ISerializer _serializer;
        private bool _IsCodeGenEnabled = false;
        private IServiceContainer _serviceContainer;
        #endregion

        protected IAuthorizer Authorizer
        {
            get
            {
                return this._serviceContainer.Authorizer;
            }
        }

        protected ISerializer Serializer
        {
            get
            {
                return this._serializer;
            }
        }

        protected IQueryHelper QueryHelper
        {
            get
            {
                return this._serviceContainer.QueryHelper;
            }
        }

        protected IValidationHelper ValidationHelper
        {
            get
            {
                return this._serviceContainer.ValidationHelper;
            }
        }

        protected IServiceContainer ServiceContainer
        {
            get
            {
                return this._serviceContainer;
            }
        }

        protected PerRequestState RequestState
        {
            get
            {
                return this._requestState;
            }
        }

        public BaseDomainService(IServiceArgs args)
        {
            if (args.serializer == null)
                throw new ArgumentException(ErrorStrings.ERR_NO_SERIALIZER);
            this._principal = args.principal;
            this._serializer = args.serializer;
            this._serviceContainer = this.CreateServiceContainer();
        }

        protected virtual IServiceContainer CreateServiceContainer()
        {
            return new ServiceContainer(this._serializer, this.GetType(), this._principal); 
        }

        /// <summary>
        /// Utility method to obtain data from service query method
        /// mainly used to embed data on page load, and fill classifiers for lookup data
        /// </summary>
        /// <param name="dbSetName"></param>
        /// <param name="queryName"></param>
        /// <returns></returns>
        public QueryResponse GetQueryData(string dbSetName, string queryName)
        {
            QueryRequest getInfo = new QueryRequest { dbSetName = dbSetName, queryName = queryName };
            return this.ServiceGetData(getInfo);
        }

        protected IPrincipal CurrentPrincipal
        {
            get { return this._principal; }
        }

        protected ServiceOperationType CurrentOperation
        {
            get { return this.RequestState.CurrentOperation; }
        }

        protected ChangeSet CurrentChangeSet
        {
            get { return this.RequestState.CurrentChangeSet; }
        }

        protected EntityChangeState CurrentChangeState
        {
            get { return this.RequestState.CurrentRowInfo.changeState; }
        }

        protected QueryRequest CurrentQueryInfo
        {
            get { return this.RequestState.CurrentQueryInfo; }
        }

        protected bool IsCodeGenEnabled
        {
            get
            {
                return this._IsCodeGenEnabled;
            }
            set
            {
                this._IsCodeGenEnabled = value;
            }
        }

        #region Helper Methods

        protected IEnumerable<Row> CreateRows(DbSetInfo dbSetInfo, IEnumerable<object> dataSource, int rowCount)
        {
            var fields = dbSetInfo.GetInResultFields();
            int fieldsCnt = fields.Length;
            Field[] pkInfos = dbSetInfo.GetPKFields();
            Row[] rows = new Row[rowCount];

            int counter = 0;
            foreach (object entity in dataSource)
            {
                Row row = new Row();
                string[] pk = new string[pkInfos.Length];
                row.v = new object[fieldsCnt];
                for (int i = 0; i < fieldsCnt; ++i)
                {
                    Field fieldInfo = fields[i];
                    object fv = this.ServiceContainer.DataHelper.SerializeField(entity, fieldInfo);
                    int keyIndex = Array.IndexOf(pkInfos, fieldInfo);
                    if (keyIndex > -1)
                    {
                        if (fv == null)
                            throw new Exception(string.Format("Primary Key Field \"{0}\" Has a NULL Value", fieldInfo._FullName));
                        pk[keyIndex] = fv.ToString();
                    }
                    row.v[i] = fv;
                }
                row.k = string.Join(";", pk);
                rows[counter] = row;
                ++counter;
            }
            return rows;
        }

        protected IEnumerable<Row> CreateDistinctRows(DbSetInfo dbSetInfo, IEnumerable<object> dataSource, ref int rowCount)
        {
            //map rows by PK
            Dictionary<string, Row> rows = new Dictionary<string, Row>(rowCount);
            var fieldInfos = dbSetInfo.GetInResultFields();
            int fieldCnt = fieldInfos.Length;
            Field[] pkInfos = dbSetInfo.GetPKFields();
            int counter = 0;
            foreach (object entity in dataSource)
            {
                Row row = new Row();
                string[] pk = new string[pkInfos.Length];
                row.v = new object[fieldCnt];
                for (int i = 0; i < fieldCnt; ++i)
                {
                    Field fieldInfo = fieldInfos[i];
                    object fv = this.ServiceContainer.DataHelper.SerializeField(entity, fieldInfo);

                    int keyIndex = Array.IndexOf(pkInfos, fieldInfo);
                    if (keyIndex > -1)
                    {
                        if (fv == null)
                            throw new Exception(string.Format("Primary Key Field \"{0}\" Has a NULL Value", fieldInfo._FullName));
                        pk[keyIndex] = fv.ToString();
                    }
                    row.v[i] = fv;
                }
                row.k = string.Join(";", pk);
                //here we filter out repeated rows
                if (!rows.ContainsKey(row.k))
                {
                    rows.Add(row.k, row);
                    ++counter;
                }
            }
            rowCount = counter;
            return rows.Values;
        }

        protected IEnumerable<IncludedResult> CreateIncludedResults(DbSetInfo dbSetInfo, IEnumerable<object> entities, string[] includePaths)
        {
            if (includePaths.Length == 0)
                return Enumerable.Empty<IncludedResult>();
            Dictionary<string, IncludedResult> visited = new Dictionary<string, IncludedResult>();
            var metadata = this.EnsureMetadataInitialized();
            foreach (string includePath in includePaths)
            {
                string[] pathParts = includePath.Split('.');
                string[] nextParts = pathParts.Skip(1).ToArray();
                this.CreateIncludedResult(dbSetInfo, entities, pathParts[0], nextParts, visited);
            }
            return visited.Values;
        }

        protected IncludedResultList CreateIncludedResults(IEnumerable<SubResult> subResults)
        {
            IncludedResultList result = new IncludedResultList();
            if (subResults == null)
                return result;
            var metadata = this.EnsureMetadataInitialized();
            int rowCount = 0;
            foreach (SubResult subResult in subResults)
            {
                var dbSetInfo = metadata.dbSets[subResult.dbSetName];
                if (result.Any(r => r.dbSetName == subResult.dbSetName))
                    throw new DomainServiceException(string.Format("The included results already have {0} entities", dbSetInfo.dbSetName));
                LinkedList<object> entityList = new LinkedList<object>();
                foreach (object entity in subResult.Result)
                {
                    entityList.AddLast(entity);
                    ++rowCount;
                }
                IncludedResult current = new IncludedResult { dbSetName = dbSetInfo.dbSetName, rows = this.CreateDistinctRows(dbSetInfo, entityList, ref rowCount), names = this.GetNames(dbSetInfo) };
                current.rowCount = rowCount;
                result.Add(current);
            }
            return result;
        }

        private void CreateIncludedResult(DbSetInfo dbSetInfo, IEnumerable<object> inputEntities, string propertyName, string[] nextParts, Dictionary<string, IncludedResult> visited)
        {
            var metadata = this.EnsureMetadataInitialized();
            bool isChildProperty = false;
            DbSetInfo nextDbSetInfo = null;
            var assoc = metadata.associations.Values.Where(a=>a.parentDbSetName == dbSetInfo.dbSetName && a.parentToChildrenName == propertyName).FirstOrDefault();
            if (assoc != null)
            {
                isChildProperty = true;
                nextDbSetInfo = metadata.dbSets[assoc.childDbSetName];
            }
            else
            {
                assoc = metadata.associations.Values.Where(a => a.childDbSetName == dbSetInfo.dbSetName && a.childToParentName == propertyName).FirstOrDefault();
                if (assoc == null)
                {
                    throw new DomainServiceException(string.Format(ErrorStrings.ERR_INCL_NAVIG_INVALID,propertyName+(nextParts.Length>0?("."+string.Join(".",nextParts)):"")));
                } 
                
                nextDbSetInfo = metadata.dbSets[assoc.parentDbSetName];
            }
            if (visited.ContainsKey(nextDbSetInfo.dbSetName + "." + propertyName))
                return;

            int rowCount = 0;
            object propValue;
            LinkedList<object> resultEntities = new LinkedList<object>();
            foreach(object entity in inputEntities)
            {
                propValue = this.ServiceContainer.DataHelper.GetValue(entity, propertyName, true);
                if (isChildProperty && propValue is IEnumerable)
                {
                    foreach (object childEntity in (IEnumerable)propValue)
                    {
                        resultEntities.AddLast(childEntity);
                        ++rowCount;
                    }
                }
                else if (!isChildProperty && propValue != null)
                {
                    resultEntities.AddLast(propValue);
                    ++rowCount;
                }
            }

            //create temporary result without rows
            //fills rows at the end of the method
            IncludedResult current = new IncludedResult { dbSetName = nextDbSetInfo.dbSetName, rows = new Row[0], names = this.GetNames(nextDbSetInfo) };
            visited.Add(nextDbSetInfo.dbSetName + "." + propertyName, current);

            if (nextParts.Length>0)
                this.CreateIncludedResult(nextDbSetInfo, resultEntities, nextParts[0], nextParts.Skip(1).ToArray(), visited);

            current.rows = this.CreateDistinctRows(nextDbSetInfo, resultEntities, ref rowCount);
            current.rowCount = rowCount;
        }
        
        protected CachedMetadata EnsureMetadataInitialized()
        {
            Func<CachedMetadata> factory = () => { this.ExecuteOnSTA(this.InitMetadata, this); return this._cachedMetadata; };
            System.Threading.LazyInitializer.EnsureInitialized<CachedMetadata>(ref this._cachedMetadata, factory);
            return this._cachedMetadata;
        }

        protected void ExecuteOnSTA(System.Threading.SendOrPostCallback action, object state)
        {
            _synchronizer.Send(action, state);
        }

        private void InitMetadata(object state)
        {
            BaseDomainService self = (BaseDomainService)state;
            CachedMetadata cachedMetadata = null;
            if (BaseDomainService._metadataCache.TryGetValue(self.GetType(), out cachedMetadata))
            {
                self._cachedMetadata = cachedMetadata;
                return;
            }
            var metadata = self.GetMetadata();
            cachedMetadata = new CachedMetadata();
            foreach (var dbSetInfo in metadata.DbSets)
            {
                dbSetInfo.Initialize(self.GetType(), this.ServiceContainer);
                //indexed by dbSetName
                cachedMetadata.dbSets.Add(dbSetInfo.dbSetName, dbSetInfo);
            }

            foreach (var assoc in metadata.Associations)
            {
                if (string.IsNullOrWhiteSpace(assoc.name))
                {
                    throw new DomainServiceException(ErrorStrings.ERR_ASSOC_EMPTY_NAME);
                }
                if (!cachedMetadata.dbSets.ContainsKey(assoc.parentDbSetName)) 
                {
                    throw new DomainServiceException(string.Format(ErrorStrings.ERR_ASSOC_INVALID_PARENT,assoc.name, assoc.parentDbSetName));
                }
                if (!cachedMetadata.dbSets.ContainsKey(assoc.childDbSetName))
                {
                    throw new DomainServiceException(string.Format(ErrorStrings.ERR_ASSOC_INVALID_CHILD, assoc.name, assoc.childDbSetName));
                }
                var childDb = cachedMetadata.dbSets[assoc.childDbSetName];
                var parentDb = cachedMetadata.dbSets[assoc.parentDbSetName];
                var parentDbFields = parentDb.GetFieldByNames();
                var childDbFields = childDb.GetFieldByNames();

                //check navigation field
                //dont allow to define  it explicitly, the association adds the field by itself (implicitly)
                if (!string.IsNullOrEmpty(assoc.childToParentName) && childDbFields.ContainsKey(assoc.childToParentName))
                {
                    throw new DomainServiceException(string.Format(ErrorStrings.ERR_ASSOC_INVALID_NAV_FIELD, assoc.name, assoc.childToParentName));
                }

                //check navigation field
                //dont allow to define  it explicitly, the association adds the field by itself (implicitly)
                if (!string.IsNullOrEmpty(assoc.parentToChildrenName) && parentDbFields.ContainsKey(assoc.parentToChildrenName))
                {
                    throw new DomainServiceException(string.Format(ErrorStrings.ERR_ASSOC_INVALID_NAV_FIELD, assoc.name, assoc.parentToChildrenName));
                }

                if (!string.IsNullOrEmpty(assoc.parentToChildrenName) && !string.IsNullOrEmpty(assoc.childToParentName) && assoc.childToParentName == assoc.parentToChildrenName)
                {
                    throw new DomainServiceException(string.Format(ErrorStrings.ERR_ASSOC_INVALID_NAV_FIELD, assoc.name, assoc.parentToChildrenName));
                }

                foreach (var frel in assoc.fieldRels)
                {
                    if (!parentDbFields.ContainsKey(frel.parentField))
                    {
                        throw new DomainServiceException(string.Format(ErrorStrings.ERR_ASSOC_INVALID_PARENT_FIELD, assoc.name, frel.parentField));
                    }
                    if (!childDbFields.ContainsKey(frel.childField))
                    {
                        throw new DomainServiceException(string.Format(ErrorStrings.ERR_ASSOC_INVALID_CHILD_FIELD, assoc.name, frel.childField));
                    }
                }
                //indexed by Name
                cachedMetadata.associations.Add(assoc.name, assoc);

                if (!string.IsNullOrEmpty(assoc.childToParentName))
                {
                    var sb = new System.Text.StringBuilder(120);
                    var dependentOn = assoc.fieldRels.Aggregate(sb, (a, b) => a.Append((a.Length == 0 ? "" : ",") + b.childField), a => a).ToString();
                    //add navigation field to dbSet's field collection
                    childDb.fieldInfos.Add(new Field()
                    {
                        fieldName = assoc.childToParentName,
                        fieldType = FieldType.Navigation,
                        dataType = DataType.None,
                        dependentOn = dependentOn,
                        _TypeScriptDataType = TypeScriptHelper.GetEntityTypeName(parentDb.dbSetName)
                    });
                }

                if (!string.IsNullOrEmpty(assoc.parentToChildrenName))
                {
                    var sb = new System.Text.StringBuilder(120);
                    //add navigation field to dbSet's field collection
                    parentDb.fieldInfos.Add(new Field()
                    {
                        fieldName = assoc.parentToChildrenName,
                        fieldType = FieldType.Navigation,
                        dataType = DataType.None,
                        _TypeScriptDataType = string.Format("{0}[]", TypeScriptHelper.GetEntityTypeName(childDb.dbSetName))
                    });
                }
            }
            cachedMetadata.methodDescriptions = this.GetMethodDescriptions(self.GetType());
            self._cachedMetadata = cachedMetadata;
            BaseDomainService._metadataCache.TryAdd(self.GetType(), cachedMetadata);
        }

        protected MethodInfo GetOperMethodInfo(DbSetInfo dbSetInfo, string oper)
        {
            return dbSetInfo.getOperationMethodInfo(oper);
        }

        /// <summary>
        /// Test if public methods on the service has Invoke or Query Attribute
        /// and generates from this methods their invocation method descriptions 
        /// </summary>
        /// <returns></returns>
        private MethodsList GetMethodDescriptions(Type thisType)
        {
             MethodsList res = null;
             if (BaseDomainService._methodsInfo.TryGetValue(thisType, out res))
                return res;
             res = new MethodsList();
             var methList = thisType.GetMethods(BindingFlags.Instance | BindingFlags.DeclaredOnly | BindingFlags.Public).Select(m => new { method = m, isQuery = m.IsDefined(typeof(QueryAttribute), false), isInvoke = m.IsDefined(typeof(InvokeAttribute), false) }).Where(m=>(m.isInvoke || m.isQuery)).ToArray();
             Array.ForEach(methList,(info) => {
                 res.Add(MethodDescription.FromMethodInfo(info.method, info.isQuery, this.ServiceContainer));
            });
            BaseDomainService._methodsInfo.TryAdd(thisType, res);
            return res;
        }

        private void ApplyValues(object entity, RowInfo rowInfo, string path, ValueChange[] values, bool isOriginal)
        {
            DbSetInfo dbSetInfo = rowInfo.dbSetInfo;
            Array.ForEach(values, (val) =>
            {
                string fullName = path + val.fieldName;
                Field fieldInfo = this.ServiceContainer.DataHelper.getFieldInfo(dbSetInfo, fullName);
                if (!fieldInfo.GetIsIncludeInResult())
                    return;
                //Server Side calculated fields are never set on entities from updates
                if (fieldInfo.fieldType == FieldType.ServerCalculated)
                    return;

                if (fieldInfo.fieldType == FieldType.Object && val.nested != null)
                {
                    this.ApplyValues(entity, rowInfo, fullName + '.', val.nested.ToArray(), isOriginal);
                }
                else
                {
                    this.ApplyValue(entity, rowInfo, fullName, fieldInfo, val, isOriginal);
                }
            });
        }

        private void ApplyValue(object entity, RowInfo rowInfo, string fullName, Field fieldInfo, ValueChange val, bool isOriginal)
        {
            if (isOriginal)
            {
                if ((val.flags & ValueFlags.Setted) == ValueFlags.Setted)
                    this.ServiceContainer.DataHelper.SetFieldValue(entity, fullName, fieldInfo, val.orig);
            }
            else
            {
                switch (rowInfo.changeType)
                {
                    case ChangeType.Deleted:
                        {
                            //For delete fill only original values
                            if ((val.flags & ValueFlags.Setted) == ValueFlags.Setted)
                                this.ServiceContainer.DataHelper.SetFieldValue(entity, fullName, fieldInfo, val.orig);
                        }
                        break;
                    case ChangeType.Added:
                        {
                            if (fieldInfo.isAutoGenerated)
                                return;
                            if ((val.flags & ValueFlags.Changed) == ValueFlags.Changed)
                            {
                                if (fieldInfo.isReadOnly && val.val != null && !fieldInfo.allowClientDefault)
                                {
                                    throw new DomainServiceException(string.Format(ErrorStrings.ERR_PROPERTY_IS_READONLY, entity.GetType().Name, fieldInfo.fieldName));
                                }
                                if (fieldInfo.isAutoGenerated && val.val != null)
                                {
                                    throw new DomainServiceException(string.Format(ErrorStrings.ERR_PROPERTY_IS_READONLY, entity.GetType().Name, fieldInfo.fieldName));
                                }
                                this.ServiceContainer.DataHelper.SetFieldValue(entity, fullName, fieldInfo, val.val);
                            }
                        }
                        break;
                    case ChangeType.Updated:
                        {
                            if ((val.flags & ValueFlags.Changed) == ValueFlags.Changed)
                            {
                                if (fieldInfo.isReadOnly || (fieldInfo.isPrimaryKey > 0 || fieldInfo.fieldType == FieldType.RowTimeStamp || fieldInfo.isAutoGenerated))
                                    throw new DomainServiceException(string.Format(ErrorStrings.ERR_PROPERTY_IS_READONLY, entity.GetType().Name, fieldInfo.fieldName));
                                if (!fieldInfo.isNullable && val.val == null)
                                {
                                    throw new DomainServiceException(string.Format(ErrorStrings.ERR_FIELD_IS_NOT_NULLABLE, fieldInfo.fieldName));
                                }
                                this.ServiceContainer.DataHelper.SetFieldValue(entity, fullName, fieldInfo, val.val);
                            }
                            else if ((val.flags & ValueFlags.Setted) == ValueFlags.Setted)
                            {
                                if ((fieldInfo.isPrimaryKey > 0 || fieldInfo.fieldType == FieldType.RowTimeStamp || fieldInfo.isNeedOriginal) && val.val != val.orig)
                                {
                                    throw new DomainServiceException(string.Format(ErrorStrings.ERR_VAL_ORIGINAL_INVALID, fieldInfo.fieldName));
                                }
                                this.ServiceContainer.DataHelper.SetFieldValue(entity, fullName, fieldInfo, val.val);
                            }
                        }
                        break;
                }
            }
        }

        protected void UpdateEntityFromRowInfo(object entity, RowInfo rowInfo, bool isOriginal)
        {
            DbSetInfo dbSetInfo = rowInfo.dbSetInfo;
            var values = rowInfo.values;
            this.ApplyValues(entity,rowInfo, "", rowInfo.values.ToArray(), isOriginal);

            if (!isOriginal && rowInfo.changeType == ChangeType.Added)
            {
                foreach (var pn in rowInfo.changeState.ParentRows)
                {
                    if (!this.ServiceContainer.DataHelper.SetValue(entity, pn.association.childToParentName, pn.ParentRow.changeState.Entity, false))
                    {
                        throw new DomainServiceException(string.Format(ErrorStrings.ERR_CAN_NOT_SET_PARENT_FIELD, pn.association.childToParentName, rowInfo.dbSetInfo.EntityType.Name));
                    }
                }
            }
        }

        protected void UpdateValuesFromEntity(object entity, string path, DbSetInfo dbSetInfo, ValueChange[] values)
        {
            Array.ForEach(values, (val) =>
            {
                string fullName = path + val.fieldName;
                Field fieldInfo = this.ServiceContainer.DataHelper.getFieldInfo(dbSetInfo, fullName);
                if (!fieldInfo.GetIsIncludeInResult())
                    return;
                if (fieldInfo.fieldType == FieldType.Object && val.nested != null)
                {
                    this.UpdateValuesFromEntity(entity, fullName + '.', dbSetInfo, val.nested.ToArray());
                }
                else
                {
                    val.val = this.ServiceContainer.DataHelper.SerializeField(entity, fullName, fieldInfo);
                    val.flags = val.flags | ValueFlags.Refreshed;
                }
            });
        }

        protected void CheckValuesChanges(RowInfo rowInfo, string path, ValueChange[] values)
        {
            DbSetInfo dbSetInfo = rowInfo.dbSetInfo;
            Array.ForEach(values, (val) =>
            {
                string fullName = path + val.fieldName;
                Field fieldInfo = this.ServiceContainer.DataHelper.getFieldInfo(dbSetInfo, fullName);
                if (!fieldInfo.GetIsIncludeInResult())
                    return;
                if (fieldInfo.fieldType == FieldType.Object && val.nested != null)
                {
                    this.CheckValuesChanges(rowInfo, fullName + '.', val.nested.ToArray());
                }
                else
                {
                    string newVal;
                    if (this.isEntityValueChanged(rowInfo, fullName, fieldInfo, out newVal))
                    {
                        val.val = newVal;
                        val.flags = val.flags | ValueFlags.Refreshed;
                    }
                }
            });
        }

        protected void UpdateRowInfoFromEntity(object entity, RowInfo rowInfo)
        {
            DbSetInfo dbSetInfo = rowInfo.dbSetInfo;
            this.UpdateValuesFromEntity(entity, "", dbSetInfo, rowInfo.values.ToArray());
            if (rowInfo.changeType == ChangeType.Added)
            {
                rowInfo.serverKey = rowInfo.GetRowKeyAsString();
            }
        }

        protected bool isEntityValueChanged(RowInfo rowInfo, string fullName, Field fieldInfo, out string newVal) 
        {
            EntityChangeState changeState = rowInfo.changeState;
            string oldVal = null;
            newVal = this.ServiceContainer.DataHelper.SerializeField(changeState.Entity, fullName, fieldInfo);
            if (changeState.OriginalEntity != null)
                oldVal = this.ServiceContainer.DataHelper.SerializeField(changeState.OriginalEntity, fullName, fieldInfo);
            return (newVal != oldVal);
        }

        protected void UpdateRowInfoAfterUpdates(RowInfo rowInfo)
        {
            this.CheckValuesChanges(rowInfo, "", rowInfo.values.ToArray());

            if (rowInfo.changeType == ChangeType.Added)
            {
                rowInfo.serverKey = rowInfo.GetRowKeyAsString();
            }
        }
    
        protected T GetOriginal<T>()
            where T : class
        {
            if (this.RequestState.CurrentRowInfo == null) {
                throw new DomainServiceException(ErrorStrings.ERR_METH_APPLY_INVALID);
            }
            return (T)this.RequestState.CurrentRowInfo.changeState.OriginalEntity;
        }

        private object GetOriginal(object entity)
        {
            object dbEntity = Activator.CreateInstance(entity.GetType());
            UpdateEntityFromRowInfo(dbEntity, this.RequestState.CurrentRowInfo, true);
            return dbEntity;
        }

        protected T GetParent<T>()
            where T : class
        {
            if (this.RequestState.CurrentRowInfo == null)
            {
                throw new DomainServiceException(ErrorStrings.ERR_METH_APPLY_INVALID);
            }
            var parents = this.RequestState.CurrentRowInfo.changeState.ParentRows;
            if (parents.Length == 0)
                return (T)null;

            return (T)parents.Where(p => p.ParentRow.dbSetInfo.EntityType == typeof(T)).Select(p => p.ParentRow.changeState.Entity).FirstOrDefault();
        }

        protected void InsertEntity(RowInfo rowInfo)
        {
            DbSetInfo dbSetInfo = rowInfo.dbSetInfo;
            if (rowInfo.changeType != ChangeType.Added)
                throw new DomainServiceException(string.Format(ErrorStrings.ERR_REC_CHANGETYPE_INVALID, dbSetInfo.EntityType.Name, rowInfo.changeType));
            MethodInfo methInfo = this.GetOperMethodInfo(dbSetInfo, OperationNames.CREATE);
            if (methInfo == null)
                throw new DomainServiceException(string.Format(ErrorStrings.ERR_DB_INSERT_NOT_IMPLEMENTED, dbSetInfo.EntityType.Name, this.GetType().Name));
            object dbEntity = Activator.CreateInstance(dbSetInfo.EntityType);
            UpdateEntityFromRowInfo(dbEntity, rowInfo, false);
            rowInfo.changeState.Entity = dbEntity;
            methInfo.Invoke(this, new object[] { dbEntity });
        }

        protected void UpdateEntity(RowInfo rowInfo)
        {
            DbSetInfo dbSetInfo = rowInfo.dbSetInfo;
            if (rowInfo.changeType != ChangeType.Updated)
                throw new DomainServiceException(string.Format(ErrorStrings.ERR_REC_CHANGETYPE_INVALID, dbSetInfo.EntityType.Name, rowInfo.changeType));
            MethodInfo methInfo = this.GetOperMethodInfo(dbSetInfo, OperationNames.UPDATE);
            if (methInfo == null)
                throw new DomainServiceException(string.Format(ErrorStrings.ERR_DB_UPDATE_NOT_IMPLEMENTED, dbSetInfo.EntityType.Name, this.GetType().Name));
            object dbEntity = Activator.CreateInstance(dbSetInfo.EntityType);
            UpdateEntityFromRowInfo(dbEntity, rowInfo, false);
            var original = this.GetOriginal(dbEntity);
            rowInfo.changeState.Entity = dbEntity;
            rowInfo.changeState.OriginalEntity = original;
            //apply this changes to entity that is in the database (this is done in user domain service method)
            methInfo.Invoke(this, new object[] { dbEntity });
        }

        protected void DeleteEntity(RowInfo rowInfo)
        {
            DbSetInfo dbSetInfo = rowInfo.dbSetInfo;
            if (rowInfo.changeType != ChangeType.Deleted)
                throw new DomainServiceException(string.Format(ErrorStrings.ERR_REC_CHANGETYPE_INVALID, dbSetInfo.EntityType.Name, rowInfo.changeType));
          
            MethodInfo methInfo = this.GetOperMethodInfo(dbSetInfo, OperationNames.DELETE);
            if (methInfo == null)
                throw new DomainServiceException(string.Format(ErrorStrings.ERR_DB_DELETE_NOT_IMPLEMENTED, dbSetInfo.EntityType.Name, this.GetType().Name));

            object dbEntity = Activator.CreateInstance(dbSetInfo.EntityType);
            UpdateEntityFromRowInfo(dbEntity, rowInfo, true);
            rowInfo.changeState.Entity = dbEntity;
            rowInfo.changeState.OriginalEntity = dbEntity;
            methInfo.Invoke(this, new object[] { dbEntity });
        }
        
        protected bool ValidateEntity(RowInfo rowInfo)
        {
            DbSetInfo dbSetInfo = rowInfo.dbSetInfo;
            IEnumerable<ValidationErrorInfo> errs = null;
            LinkedList<string> mustBeChecked = new LinkedList<string>();
            LinkedList<string> skipCheckList = null;
            if (rowInfo.changeType == ChangeType.Added)
            {
                skipCheckList = new LinkedList<string>();
                foreach (var pn in rowInfo.changeState.ParentRows)
                {
                    foreach (var frel in pn.association.fieldRels)
                    {
                        skipCheckList.AddLast(frel.childField);
                    }
                }
            }

            foreach (var fieldInfo in dbSetInfo.fieldInfos)
            {
                this.ServiceContainer.DataHelper.ForEachFieldInfo("", fieldInfo, (string fullName, Field f) =>
                {
                    if (!f.GetIsIncludeInResult())
                        return;
                    if (f.fieldType == FieldType.Object || f.fieldType == FieldType.ServerCalculated)
                        return;

                    string value = this.ServiceContainer.DataHelper.SerializeField(rowInfo.changeState.Entity, fullName, f);
                    if (rowInfo.changeType == ChangeType.Added)
                    {
                        bool isSkip = f.isAutoGenerated || (skipCheckList != null && skipCheckList.Any(n => n == fullName));
                        if (!isSkip)
                        {
                            this.ValidationHelper.CheckValue(f, value);
                            mustBeChecked.AddLast(fullName);
                        }
                    }
                    else if (rowInfo.changeType == ChangeType.Updated)
                    {
                        string newVal;
                        bool isChanged = isEntityValueChanged(rowInfo, fullName, f, out newVal);
                        if (isChanged)
                        {
                            this.ValidationHelper.CheckValue(f, newVal);
                        }
                        if (isChanged)
                            mustBeChecked.AddLast(fullName);
                    }
                });
            }

            rowInfo.changeState.NamesOfChangedFields = mustBeChecked.ToArray();
            MethodInfo methInfo = this.GetOperMethodInfo(dbSetInfo, OperationNames.VALIDATE);
            if (methInfo != null)
            {
                errs = (IEnumerable<ValidationErrorInfo>)methInfo.Invoke(this, new object[] { rowInfo.changeState.Entity, rowInfo.changeState.NamesOfChangedFields });
            }
            
            if (errs != null && errs.Count() > 0)
            {
                rowInfo.changeState.ValidationErrors = errs.ToArray();
                return false;
            }

            return true;
        }
        #endregion

        #region Overridable Methods
        protected abstract Metadata GetMetadata();

        /// <summary>
        /// Can be used for tracking what is changed by CRUD methods
        /// </summary>
        /// <param name="dbSetName">name of the entity which is currently tracked</param>
        /// <param name="changeType">enum meaning which CRUD method was invoked</param>
        /// <param name="diffgram">xml representing values as was before and after CRUD operation</param>
        protected virtual void OnTrackChange(string dbSetName, ChangeType changeType, string diffgram) 
        { 
        }

        protected virtual void OnError(Exception ex)
        {

        }
     
        protected abstract void ExecuteChangeSet();

        protected virtual void ApplyChangesToEntity(RowInfo rowInfo)
        {
            DbSetInfo dbSetInfo = rowInfo.dbSetInfo;
            if (dbSetInfo.EntityType == null)
                throw new DomainServiceException(string.Format(ErrorStrings.ERR_DB_ENTITYTYPE_INVALID, dbSetInfo.dbSetName));
            try
            {
                switch (rowInfo.changeType)
                {
                    case ChangeType.Added:
                        this.InsertEntity(rowInfo);
                        break;
                    case ChangeType.Deleted:
                        this.DeleteEntity(rowInfo);
                        break;
                    case ChangeType.Updated:
                        this.UpdateEntity(rowInfo);
                        break;
                    default:
                        throw new DomainServiceException(string.Format(ErrorStrings.ERR_REC_CHANGETYPE_INVALID, dbSetInfo.EntityType.Name, rowInfo.changeType));
                }
            }
            catch (Exception ex)
            {
                object dbEntity = rowInfo.changeState == null ? null : rowInfo.changeState.Entity;
                rowInfo.changeState = new EntityChangeState { Entity = dbEntity, Error = ex };
                this.OnError(ex);
                throw;
            }
        }

        protected virtual void TrackChangesToEntity(RowInfo rowInfo)
        {
            if (!rowInfo.dbSetInfo.isTrackChanges)
                return;
            try
            {
                string diffgram = DiffGram.GetDiffGram(rowInfo.changeState.OriginalEntity, rowInfo.changeState.Entity, rowInfo.dbSetInfo.EntityType, rowInfo.changeState.NamesOfChangedFields);
                this.OnTrackChange(rowInfo.dbSetInfo.dbSetName, rowInfo.changeType, diffgram);
            }
            catch (Exception ex)
            {
                this.OnError(ex);
            }
        }

        protected virtual T GetRefreshedEntity<T>(IQueryable<T> entities, RefreshInfo info)
            where T : class
        {
            return this.QueryHelper.GetRefreshedEntity<T>(entities, info);
        }

        protected virtual string GetTypeScript(string comment = null)
        {
            MetadataResult metadata = this.ServiceGetMetadata();
            TypeScriptHelper helper = new TypeScriptHelper(this._serviceContainer, metadata, this.GetClientTypes());
            return helper.CreateTypeScript(comment);
        }

        protected virtual string GetXAML()
        {
            throw new NotImplementedException();
        }

        protected virtual string GetCSharp()
        {
            throw new NotImplementedException();
        }

        protected virtual IEnumerable<Type> GetClientTypes()
        {
            return Enumerable.Empty<Type>();
        }
        #endregion

        protected FieldName[] GetNames(Field fieldInfo)
        {
            return fieldInfo.GetNestedInResultFields().Select(fi => new FieldName { n = fi.fieldName, p = (fi.fieldType == FieldType.Object) ? this.GetNames(fi) : null }).ToArray();
        }

        protected FieldName[] GetNames(DbSetInfo dbSetInfo)
        {
            return dbSetInfo.GetInResultFields().Select(fi => new FieldName { n = fi.fieldName, p = (fi.fieldType == FieldType.Object) ? this.GetNames(fi) : null }).ToArray();
        }

        protected QueryResponse PerformQuery(QueryRequest queryInfo)
        {
            var metadata = this.EnsureMetadataInitialized();
            List<MethodDescription> methodList = metadata.methodDescriptions;
            MethodDescription method = methodList.Where((m) => m.methodName == queryInfo.queryName && m.isQuery == true).FirstOrDefault();
            if (method == null)
            {
                throw new DomainServiceException(string.Format(ErrorStrings.ERR_QUERY_NAME_INVALID, queryInfo.queryName));
            }

            this.Authorizer.CheckUserRightsToExecute(method.methodInfo);
            queryInfo.dbSetInfo = metadata.dbSets[queryInfo.dbSetName];
            bool isMultyPageRequest = queryInfo.dbSetInfo.enablePaging && queryInfo.pageCount > 1;
      
            QueryResult queryResult = null;
            int? totalCount = null;
            LinkedList<object> methParams = new LinkedList<object>();
          
            for (var i = 0; i < method.parameters.Count; ++i)
            {
                 methParams.AddLast(queryInfo.paramInfo.GetValue(method.parameters[i].name, method, this.ServiceContainer));
            }
            this.RequestState.CurrentQueryInfo = queryInfo;
            try
            {
                queryResult = (QueryResult)method.methodInfo.Invoke(this, methParams.ToArray());
            }
            finally
            {
                this.RequestState.CurrentQueryInfo = null;
            }
    
            IEnumerable entities = (IEnumerable)queryResult.Result;
            totalCount = queryResult.TotalCount;
            int rowCnt = 0;
            LinkedList<object> entityList = new LinkedList<object>();
            foreach (object entity in entities)
            {
                entityList.AddLast(entity);
                ++rowCnt;
            }
            var rows = this.CreateRows(queryInfo.dbSetInfo, entityList, rowCnt);
            IEnumerable<IncludedResult> subResults1 = this.CreateIncludedResults(queryInfo.dbSetInfo, entityList, queryResult.includeNavigations);
            IncludedResultList subResults2 = this.CreateIncludedResults(queryResult.subResults);

            var subResults = subResults1.Aggregate(subResults2, (lst, subRes) =>
            {
                if (lst.Any(r => r.dbSetName == subRes.dbSetName))
                    throw new DomainServiceException(string.Format("The included results already have {0} entities", subRes.dbSetName));
                lst.Add(subRes);
                return lst;
            });

            QueryResponse res = new QueryResponse()
            {
                pageIndex = queryInfo.pageIndex,
                pageCount = queryInfo.pageCount,
                dbSetName = queryInfo.dbSetName,
                names = this.GetNames(queryInfo.dbSetInfo),
                totalCount = totalCount,
                extraInfo = queryResult.extraInfo,
                rows = rows,
                rowCount = rowCnt,
                fetchSize = queryInfo.dbSetInfo.FetchSize,
                included = subResults,
                error = null
            };
            return (QueryResponse)res;
        }

        protected virtual void AuthorizeChangeSet(ChangeSet changeSet)
        {
            try
            {
                var metadata = this.EnsureMetadataInitialized();
                foreach (var dbSet in changeSet.dbSets)
                {
                    //methods on domain service which are attempted to be executed by client (SaveChanges triggers their execution)
                    Dictionary<string, MethodInfo> domainServiceMethods = new Dictionary<string, MethodInfo>();
                    DbSetInfo dbInfo = metadata.dbSets[dbSet.dbSetName];
                    this.RequestState.CurrentDbSet = dbSet;

                    foreach (RowInfo rowInfo in dbSet.rows)
                    {
                        this.RequestState.CurrentRowInfo = rowInfo;
                        MethodInfo methInfo = null;
                        try
                        {
                            methInfo = SecurityHelper.GetCRUDMethodInfo(dbInfo, rowInfo);
                        }
                        finally
                        {
                            this.RequestState.CurrentRowInfo = null;
                        }
                        
                        if (methInfo == null)
                            throw new DomainServiceException(string.Format(ErrorStrings.ERR_REC_CHANGETYPE_INVALID, dbInfo.EntityType.Name, rowInfo.changeType));

                        if (!domainServiceMethods.ContainsKey(methInfo.Name))
                        {
                            domainServiceMethods.Add(methInfo.Name, methInfo);
                        }
                    } // foreach (RowInfo rowInfo in dbSet.rows)

                    this.Authorizer.CheckUserRightsToExecute(domainServiceMethods.Values.ToArray());
                } //foreach (var dbSet in changeSet.dbSets)
            }
            finally
            {
                this.RequestState.CurrentDbSet = null;
            }
        }

        protected bool ApplyChangeSet(ChangeSet changeSet)
        {
            CachedMetadata metadata = this.EnsureMetadataInitialized();
            ChangeSetGraph graph = new ChangeSetGraph(changeSet, metadata);
            graph.Prepare();
           
            foreach (var rowInfo in graph.insertList)
            {
                this.RequestState.CurrentDbSet = changeSet.dbSets.Where(d => d.dbSetName == rowInfo.dbSetInfo.dbSetName).Single();
                this.RequestState.CurrentRowInfo = rowInfo;
                try
                {
                    rowInfo.changeState = new EntityChangeState { ParentRows= graph.GetParents(rowInfo) };
                    this.ApplyChangesToEntity(rowInfo);
                }
                finally
                {
                    this.RequestState.CurrentRowInfo = null;
                    this.RequestState.CurrentDbSet = null;
                }
            }

            foreach (var rowInfo in graph.updateList)
            {
                this.RequestState.CurrentDbSet = changeSet.dbSets.Where(d => d.dbSetName == rowInfo.dbSetInfo.dbSetName).Single();
                this.RequestState.CurrentRowInfo = rowInfo;
                try
                {
                    rowInfo.changeState = new EntityChangeState();
                    this.ApplyChangesToEntity(rowInfo);
                }
                finally
                {
                    this.RequestState.CurrentRowInfo = null;
                    this.RequestState.CurrentDbSet = null;
                }
            }

            foreach (var rowInfo in graph.deleteList)
            {
                this.RequestState.CurrentDbSet = changeSet.dbSets.Where(d => d.dbSetName == rowInfo.dbSetInfo.dbSetName).Single();
                this.RequestState.CurrentRowInfo = rowInfo;
                try
                {
                    rowInfo.changeState = new EntityChangeState();
                    this.ApplyChangesToEntity(rowInfo);
                }
                finally
                {
                    this.RequestState.CurrentRowInfo = null;
                    this.RequestState.CurrentDbSet = null;
                }
            }
            
            bool hasErrors = false;
         
            //Validation step
            foreach (var rowInfo in graph.insertList)
            {
                this.RequestState.CurrentDbSet = changeSet.dbSets.Where(d => d.dbSetName == rowInfo.dbSetInfo.dbSetName).Single();
                this.RequestState.CurrentRowInfo = rowInfo; 
                try
                {
                    if (!this.ValidateEntity(rowInfo))
                    {
                        rowInfo.invalid = rowInfo.changeState.ValidationErrors;
                        hasErrors = true;
                    }
                }
                finally
                {
                    this.RequestState.CurrentRowInfo = null;
                    this.RequestState.CurrentDbSet = null;
                }
            }

            //Validation step
            foreach (var rowInfo in graph.updateList)
            {
                this.RequestState.CurrentDbSet = changeSet.dbSets.Where(d => d.dbSetName == rowInfo.dbSetInfo.dbSetName).Single();
                this.RequestState.CurrentRowInfo = rowInfo; 
                try
                {
                    if (!this.ValidateEntity(rowInfo))
                    {
                        rowInfo.invalid = rowInfo.changeState.ValidationErrors;
                        hasErrors = true;
                    }
                }
                finally
                {
                    this.RequestState.CurrentRowInfo = null;
                    this.RequestState.CurrentDbSet = null;
                }
            }

            if (hasErrors)
                return false;

            this.ExecuteChangeSet();

            foreach (var rowInfo in graph.allList)
            {
                if (rowInfo.changeType != ChangeType.Deleted)
                    UpdateRowInfoAfterUpdates(rowInfo);
                else
                    rowInfo.values = null;
            }

     
            //Track changes step
            foreach (var rowInfo in graph.allList)
            {
                this.TrackChangesToEntity(rowInfo);
            }

            //OK, All updates are commited
            return true;
        }

        protected InvokeResponse InvokeMethod(InvokeRequest invokeInfo) {
            List<MethodDescription> methodList = this.EnsureMetadataInitialized().methodDescriptions;
            MethodDescription method = methodList.Where((m)=>m.methodName == invokeInfo.methodName && m.isQuery == false).FirstOrDefault();
            if (method == null) {
                throw new DomainServiceException(string.Format(ErrorStrings.ERR_METH_NAME_INVALID, invokeInfo.methodName));
            }
            this.Authorizer.CheckUserRightsToExecute(method.methodInfo);
            List<object> methParams = new List<object>();
            for (var i = 0; i < method.parameters.Count; ++i) {
               methParams.Add(invokeInfo.paramInfo.GetValue(method.parameters[i].name, method, this.ServiceContainer));
            }
            object meth_result = method.methodInfo.Invoke(this, methParams.ToArray());
            InvokeResponse res = new InvokeResponse();
            if (method.methodResult)
                res.result = meth_result;
            return res;
        }

        protected RefreshInfo RefreshRowInfo(RefreshInfo info)
        {
            var metadata = this.EnsureMetadataInitialized();
            info.dbSetInfo = metadata.dbSets[info.dbSetName];
            MethodInfo methInfo = this.GetOperMethodInfo(info.dbSetInfo, OperationNames.REFRESH);
            if (methInfo == null)
                throw new InvalidOperationException(string.Format(ErrorStrings.ERR_REC_REFRESH_INVALID, info.dbSetInfo.EntityType.Name, this.GetType().Name));
            info.rowInfo.dbSetInfo = info.dbSetInfo;
            this.Authorizer.CheckUserRightsToExecute(methInfo);
            object dbEntity = methInfo.Invoke(this, new object[] { info });
            var rri = new RefreshInfo { rowInfo = info.rowInfo, dbSetName = info.dbSetName };
            if (dbEntity != null)
            {
                UpdateRowInfoFromEntity(dbEntity, info.rowInfo);
            }
            else
                rri.rowInfo = null;

            return rri; 
        }
        

        #region IDomainService Public Methods
        public string ServiceGetTypeScript(string comment = null)
        {
            if (!this.IsCodeGenEnabled)
                throw new InvalidOperationException(string.Format(ErrorStrings.ERR_CODEGEN_DISABLED,MethodInfo.GetCurrentMethod().Name, this.GetType().Name));
            return this.GetTypeScript(comment);
        }

        public string ServiceGetXAML()
        {
            if (!this.IsCodeGenEnabled)
                throw new InvalidOperationException(string.Format(ErrorStrings.ERR_CODEGEN_DISABLED, MethodInfo.GetCurrentMethod().Name, this.GetType().Name));
            string xaml = null;
            this.ExecuteOnSTA((object state) => {
                xaml = (state as BaseDomainService).GetXAML();
            }, this);
            return xaml;
        }

        public string ServiceGetCSharp()
        {
            if (!this.IsCodeGenEnabled)
                throw new InvalidOperationException(string.Format(ErrorStrings.ERR_CODEGEN_DISABLED, MethodInfo.GetCurrentMethod().Name, this.GetType().Name));
            return this.GetCSharp();
        }

        public Permissions ServiceGetPermissions()
        {
            try
            {
                CachedMetadata metadata = this.EnsureMetadataInitialized();
                Permissions result = new Permissions();
                result.serverTimezone = RIAPP.DataService.Utils.DataHelper.GetLocalDateTimezoneOffset(DateTime.Now);
                foreach (var dbInfo in metadata.dbSets.Values)
                {
                    var permissions = dbInfo.CalculatePermissions(this.Authorizer);
                    result.permissions.Add(permissions);
                }
             
                return result;
            }
            catch (Exception ex)
            {
                this.OnError(ex);
                throw;
            }
        }

        public MetadataResult ServiceGetMetadata()
        {
            try
            {
                CachedMetadata metadata = this.EnsureMetadataInitialized();
                var result = new MetadataResult();
                result.methods = metadata.methodDescriptions;
                result.associations.AddRange(metadata.associations.Values);
                result.dbSets.AddRange(metadata.dbSets.Values);
                return result;
            }
            catch (Exception ex)
            {
                this.OnError(ex);
                throw;
            }
        }

        public QueryResponse ServiceGetData(QueryRequest queryRequest)
        {
            QueryResponse res = null;
            this.RequestState.CurrentOperation = ServiceOperationType.Query;
            try
            {
                res = this.PerformQuery(queryRequest);
            }
            catch (Exception ex)
            {
                while (ex.InnerException != null)
                    ex = ex.InnerException;
                res = new QueryResponse() { pageIndex = queryRequest.pageIndex, pageCount = queryRequest.pageCount,
                    rows = new Row[0], 
                    dbSetName = queryRequest.dbSetName, totalCount = null, error = new ErrorInfo(ex.Message, ex.GetType().Name) };
                this.OnError(ex);
            }
            finally
            {
                this.RequestState.CurrentOperation = ServiceOperationType.None;
            }
            return res;
        }

        public ChangeSet ServiceApplyChangeSet(ChangeSet changeSet)
        {
            bool res = true;
            this.RequestState.CurrentOperation = ServiceOperationType.SaveChanges;
            this.RequestState.CurrentChangeSet = changeSet;
            try
            {
                this.AuthorizeChangeSet(changeSet);
                res = this.ApplyChangeSet(changeSet);
                if (!res) {
                    throw new ValidationException(ErrorStrings.ERR_SVC_CHANGES_ARENOT_VALID);
                }
            }
            catch (Exception ex)
            {
                while (ex.InnerException != null)
                    ex = ex.InnerException;
                changeSet.error = new ErrorInfo(ex.Message, ex.GetType().Name);
                this.OnError(ex);
            }
            finally
            {
                this.RequestState.CurrentOperation = ServiceOperationType.None;
                this.RequestState.CurrentChangeSet = null;
            }
            return changeSet;
        }

        public RefreshInfo ServiceRefreshRow(RefreshInfo refreshInfo)
        {
            RefreshInfo res = null;
            this.RequestState.CurrentOperation = ServiceOperationType.RowRefresh;
            try
            {
                res = this.RefreshRowInfo(refreshInfo);
            }
            catch (Exception ex)
            {
                while (ex.InnerException != null)
                    ex = ex.InnerException;
                res = new RefreshInfo { dbSetName = refreshInfo.dbSetName, error = new ErrorInfo(ex.Message, ex.GetType().Name), rowInfo = null };
                this.OnError(ex);
            }
            finally
            {
                this.RequestState.CurrentOperation = ServiceOperationType.None;
            }
            return res;
        }

        public InvokeResponse ServiceInvokeMethod(InvokeRequest parameters) {
            InvokeResponse res = null;
            this.RequestState.CurrentOperation = ServiceOperationType.InvokeMethod;
            try
            {
                res = this.InvokeMethod(parameters);
            }
            catch (Exception ex)
            {
                while (ex.InnerException != null)
                    ex = ex.InnerException;
                res = new InvokeResponse() { result= null , error = new ErrorInfo(ex.Message, ex.GetType().Name) };
                this.OnError(ex);
            }
            finally
            {
                this.RequestState.CurrentOperation = ServiceOperationType.None;
            }
            return res;
        }
        #endregion

        #region IDisposable Members

        protected virtual void Dispose(bool isDisposing)
        {
           this._cachedMetadata=null;
           this._requestState = null;
           this._principal = null;
           this._serviceContainer = null;
           this._serializer = null;
        }

        #region IDisposable Members

        void IDisposable.Dispose()
        {
            this.Dispose(true);
        }

        #endregion
        #endregion
    }
}

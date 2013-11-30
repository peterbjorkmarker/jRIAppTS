module RIAPP {
    export module MOD {
        export module db {
            //local variables for optimization
            var utils = global.utils, consts = global.consts, ValidationError = binding.ValidationError,
                valueUtils = MOD.utils.valueUtils;
            export enum FLAGS { None = 0, Changed= 1, Setted= 2, Refreshed= 4 }
            export enum FILTER_TYPE { Equals= 0, Between= 1, StartsWith= 2, EndsWith= 3, Contains= 4, Gt= 5, Lt= 6, GtEq= 7, LtEq= 8, NotEq= 9 }
            export enum REFRESH_MODE { NONE= 0, RefreshCurrent = 1, MergeIntoCurrent= 2, CommitChanges= 3 }
            export enum DELETE_ACTION { NoAction = 0, Cascade = 1, SetNulls= 2 }
            export enum DATA_OPER { SUBMIT, LOAD, INVOKE, REFRESH, INIT }

            var DATA_SVC_METH = {
                Invoke: 'InvokeMethod', LoadData: 'GetItems', GetMetadata: 'GetMetadata', GetPermissions: 'GetPermissions',
                Submit: 'SaveChanges', Refresh: 'RefreshItem'
            };

            export class DataOperationError extends MOD.errors.BaseError {
                _operationName: DATA_OPER;
                constructor(ex, operationName: DATA_OPER) {
                    var message;
                    if (!!ex)
                        message = ex.message;
                    if (!message)
                        message = '' + ex;
                    super(message);
                    this._origError = ex;
                    this._operationName = operationName;
                }
                get operationName() { return this._operationName; }
            }
            export class AccessDeniedError extends DataOperationError { }
            export class ConcurrencyError extends DataOperationError { }
            export class SvcValidationError extends DataOperationError { }
            export class SubmitError extends DataOperationError {
                _allSubmitted: Entity[];
                _notValidated: Entity[];

                constructor(origError, allSubmitted: Entity[], notValidated: Entity[]) {
                    var message = origError.message || ('' + origError);
                    super(message, DATA_OPER.SUBMIT);
                    this._origError = origError;
                    this._allSubmitted = allSubmitted || [];
                    this._notValidated = notValidated || [];
                    if (this._notValidated.length > 0) {
                        var res = [message + ':'];
                        this._notValidated.forEach(function (item) {
                            res.push(utils.format('item key:{0} errors:{1}', item._key, item.getErrorString()));
                        });
                        this._message = res.join('\r\n');
                    }
                }
                get allSubmitted() { return this._allSubmitted; }
                get notValidated() { return this._notValidated; }
            }

            function __checkError(svcError: { name: string; message?: string; }, oper: DATA_OPER) {
                if (!svcError)
                    return;
                switch (svcError.name) {
                    case "AccessDeniedException":
                        throw new AccessDeniedError(RIAPP.ERRS.ERR_ACCESS_DENIED, oper);
                        break;
                    case "ConcurrencyException":
                        throw new ConcurrencyError(RIAPP.ERRS.ERR_CONCURRENCY, oper);
                        break;
                    case "ValidationException":
                        throw new SvcValidationError(utils.format(RIAPP.ERRS.ERR_VALIDATION,
                            svcError.message), oper);
                        break;
                    case "DomainServiceException":
                        throw new DataOperationError(utils.format(RIAPP.ERRS.ERR_SVC_ERROR,
                            svcError.message), oper);
                        break;
                    default:
                        throw new DataOperationError(utils.format(RIAPP.ERRS.ERR_UNEXPECTED_SVC_ERROR,
                            svcError.message), oper);
                }
            };
            export interface ICachedPage { items: Entity[]; pageIndex: number; }
            export interface IQueryParamInfo {
                dataType: consts.DATA_TYPE;
                dateConversion: consts.DATE_CONVERSION;
                isArray: boolean;
                isNullable: boolean;
                name: string;
                ordinal: number;
            }
            export interface IQueryInfo {
                isQuery: boolean;
                methodName: string;
                methodResult: boolean;
                parameters: IQueryParamInfo[];
            }
            export interface IFilterInfo { filterItems: { fieldName: string; kind: FILTER_TYPE; values: any[]; }[]; }
            export interface ISortInfo { sortItems: { fieldName: string; sortOrder: collection.SORT_ORDER; }[]; }
            export interface IEntityConstructor {
                new (dbSet: DbSet<Entity>, row: IRowData, names: string[]): Entity;
            }
            export interface IValueChange {
                val: any;
                orig: any;
                fieldName: string;
                flags: number;
            }
            export interface IValidationErrorInfo {
                fieldName: string;
                message: string;
            }
            export interface IRowInfo {
                values: IValueChange[];
                changeType: number;
                serverKey: string;
                clientKey: string;
                error: string;
                invalid?: IValidationErrorInfo[];
            }
            export interface IPermissions extends collection.IPermissions { dbSetName: string; }
            export interface IPermissionsInfo {
                serverTimezone: number;
                permissions: IPermissions[];
            }

            export interface IParamInfo { parameters: { name: string; value: any; }[]; }
            export interface IMethodInvokeInfo { methodName: string; paramInfo: IParamInfo; }
            export interface IDbSetInfo {
                dbSetName: string;
                enablePaging: boolean;
                pageSize: number;
                fieldInfos: MOD.collection.IFieldInfo[];
            }
            export interface IRefreshRowInfo {
                dbSetName: string;
                rowInfo: IRowInfo;
                error: { name: string; message: string; };
            }
            export interface IDbSetConstuctorOptions {
                dbContext: DbContext;
                dbSetInfo: IDbSetInfo;
                childAssoc: IAssociationInfo[];
                parentAssoc: IAssociationInfo[];
            }
            export interface IAssocConstructorOptions {
                dbContext: DbContext;
                parentName: string;
                childName: string;
                onDeleteAction: DELETE_ACTION;
                parentKeyFields: string[];
                childKeyFields: string[];
                parentToChildrenName: string;
                childToParentName: string;
                name: string;
            }
            export interface IAssociationInfo {
                childDbSetName: string;
                childToParentName: string;
                name: string;
                onDeleteAction: number;
                parentDbSetName: string;
                parentToChildrenName: string;
                fieldRels: { childField: string; parentField: string; }[];
            }
            export interface IDbSetOptions extends collection.ICollectionOptions {
                dbSetName: string;
            }
          
            export interface IMetadata {
                associations: IAssociationInfo[];
                dbSets: IDbSetInfo[];
                methods: IQueryInfo[];
                serverTimezone: number;
            }
            export interface ITrackAssoc {
                assocName: string;
                parentKey: string;
                childKey: string;
            }
            export interface IChangeSet {
                dbSets: { dbSetName: string; rows: IRowInfo[]; }[];
                error: { name: string; message: string; };
                trackAssocs: ITrackAssoc[];
            }
            export interface IGetDataInfo {
                dbSetName: string;
                pageIndex: number;
                pageSize: number;
                pageCount: number;
                isIncludeTotalCount: boolean;
                filterInfo: IFilterInfo;
                sortInfo: ISortInfo;
                paramInfo: IParamInfo;
                queryName: string;
            }

            export interface ILoadResult<TEntity extends Entity> { fetchedItems: TEntity[]; newItems: TEntity[]; isPageChanged: boolean; outOfBandData: any; }
            export interface IIncludedResult {
                names: string[];
                rows: { key: string; values: string[]; }[];
                rowCount: number;
                dbSetName: string;
            }
            export interface IRowData {
                key: string; values: string[];
            }
            export interface IGetDataResult {
                names: string[];
                rows: IRowData[];
                rowCount: number;
                dbSetName: string;
                pageIndex: number;
                pageCount: number;
                totalCount: number;
                extraInfo: any;
                error: { name: string; message: string; };
                included: IIncludedResult[];
            }
            export interface IDbSetConstructor {
                new (dbContext: DbContext): DbSet<Entity>;
            }

            export class DataCache extends RIAPP.BaseObject {
                _query: TDataQuery<Entity>;
                _cache: ICachedPage[];
                _totalCount: number;
                _itemsByKey: { [key: string]: Entity; };

                constructor(query: TDataQuery<Entity>) {
                    super();
                    this._query = query;
                    this._cache = [];
                    this._totalCount = 0;
                    this._itemsByKey = {};
                }
                getCachedPage(pageIndex: number) {
                    var res: ICachedPage[] = this._cache.filter(function (page: ICachedPage) {
                        return page.pageIndex === pageIndex;
                    });
                    if (res.length == 0)
                        return null;
                    if (res.length != 1)
                        throw new Error(utils.format(RIAPP.ERRS.ERR_ASSERTION_FAILED, "res.length == 1"));
                    return res[0];
                }
                //reset items key index
                reindexCache() {
                    var self = this, page: ICachedPage;
                    this._itemsByKey = {};
                    for (var i = 0; i < this._cache.length; i += 1) {
                        page = this._cache[i];
                        page.items.forEach(function (item) {
                            self._itemsByKey[item._key] = item;
                        });
                    }
                }
                getPrevCachedPageIndex(currentPageIndex: number) {
                    var pageIndex = -1, cachePageIndex: number;
                    for (var i = 0; i < this._cache.length; i += 1) {
                        cachePageIndex = this._cache[i].pageIndex;
                        if (cachePageIndex > pageIndex && cachePageIndex < currentPageIndex)
                            pageIndex = cachePageIndex;
                    }
                    return pageIndex;
                }
                getNextRange(pageIndex: number) {
                    var half = Math.floor(((this.loadPageCount - 1) / 2));
                    var above = (pageIndex + half) + ((this.loadPageCount - 1) % 2);
                    var below = (pageIndex - half), prev = this.getPrevCachedPageIndex(pageIndex);
                    if (below < 0) {
                        above += (0 - below);
                        below = 0;
                    }
                    if (below <= prev) {
                        above += (prev - below + 1);
                        below += (prev - below + 1);
                    }
                    if (this._pageCount > this.loadPageCount && above > (this._pageCount - 1)) {
                        below -= (above - (this._pageCount - 1));

                        if (below < 0) {
                            below = 0;
                        }

                        above = this._pageCount - 1;
                    }
                    //once again check for previous cached range
                    if (below <= prev) {
                        above += (prev - below + 1);
                        below += (prev - below + 1);
                    }

                    var cnt = above - below + 1;
                    if (cnt < this.loadPageCount) {
                        above += this.loadPageCount - cnt;
                        cnt = above - below + 1;
                    }
                    var start = below;
                    var end = above;
                    return { start: start, end: end, cnt: cnt };
                }
                fillCache(start: number, items: Entity[]) {
                    var item: Entity, keyMap = this._itemsByKey;
                    var i: number, j: number, k: number, len = items.length, pageIndex, page: ICachedPage, pageSize = this.pageSize;
                    for (i = 0; i < this.loadPageCount; i += 1) {
                        pageIndex = start + i;
                        page = this.getCachedPage(pageIndex);
                        if (!page) {
                            page = { items: [], pageIndex: pageIndex };
                            this._cache.push(page);
                        }
                        for (j = 0; j < pageSize; j += 1) {
                            k = (i * pageSize) + j;
                            if (k < len) {
                                item = items[k];
                                if (!!keyMap[item._key]) {
                                    continue;
                                }
                                page.items.push(item);
                                keyMap[item._key] = item;
                                item._isCached = true;
                            }
                            else {
                                return;
                            }
                        }
                    }
                }
                clear() {
                    var i: number, j: number, items: Entity[], item: Entity, dbSet = this._query.dbSet;
                    for (i = 0; i < this._cache.length; i += 1) {
                        items = this._cache[i].items;
                        for (j = 0; j < items.length; j += 1) {
                            item = items[j];
                            if (!!item && item._key !== null) {
                                item._isCached = false;
                                if (!dbSet.getItemByKey(item._key))
                                    item.destroy();
                            }
                        }
                    }
                    this._cache = [];
                    this._itemsByKey = {};
                }
                clearCacheForPage(pageIndex: number) {
                    var page: ICachedPage = this.getCachedPage(pageIndex), dbSet = this._query.dbSet;
                    if (!page)
                        return;
                    var j: number, items: Entity[], item: Entity, index = this._cache.indexOf(page);
                    items = page.items;
                    for (j = 0; j < items.length; j += 1) {
                        item = items[j];
                        if (!!item && item._key !== null) {
                            delete this._itemsByKey[item._key];
                            item._isCached = false;
                            if (!dbSet.getItemByKey(item._key))
                                item.destroy();
                        }
                    }
                    this._cache.splice(index, 1);
                }
                hasPage(pageIndex: number) {
                    for (var i = 0; i < this._cache.length; i += 1) {
                        if (this._cache[i].pageIndex === pageIndex)
                            return true;
                    }
                    return false;
                }
                getItemByKey(key: string) {
                    return this._itemsByKey[key];
                }
                getPageByItem(item: Entity) {
                    item = this._itemsByKey[item._key];
                    if (!item)
                        return -1;
                    for (var i = 0; i < this._cache.length; i += 1) {
                        if (this._cache[i].items.indexOf(item) > -1) {
                            return this._cache[i].pageIndex;
                        }
                    }
                    return -1;
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this.clear();
                    super.destroy();
                }
                toString() {
                    return 'DataCache';
                }
                get _pageCount() {
                    var rowCount = this.totalCount, rowPerPage = this.pageSize, result: number;

                    if ((rowCount === 0) || (rowPerPage === 0)) {
                        return 0;
                    }

                    if ((rowCount % rowPerPage) === 0) {
                        result = (rowCount / rowPerPage);
                    }
                    else {
                        result = (rowCount / rowPerPage);
                        result = Math.floor(result) + 1;
                    }
                    return result;
                }
                get pageSize() { return this._query.pageSize; }
                get loadPageCount() { return this._query.loadPageCount; }
                get totalCount() { return this._totalCount; }
                set totalCount(v: number) {
                    if (utils.check.isNt(v))
                        v = 0;
                    if (v !== this._totalCount) {
                        this._totalCount = v;
                        this.raisePropertyChanged('totalCount');
                    }
                }
                get cacheSize() { return this._cache.length; }
            }

            export class TDataQuery<TEntity extends Entity> extends RIAPP.BaseObject {
                _dbSet: DbSet<TEntity>;
                __queryInfo: IQueryInfo;
                _filterInfo: IFilterInfo;
                _sortInfo: ISortInfo;
                _isIncludeTotalCount: boolean;
                _isClearPrevData: boolean;
                _pageSize: number;
                _pageIndex: number;
                _params: any; //{ [name: string]: any; };
                _loadPageCount: number;
                _isClearCacheOnEveryLoad: boolean;
                _dataCache: DataCache;
                _cacheInvalidated: boolean;

                constructor(dbSet: DbSet<TEntity>, queryInfo: IQueryInfo) {
                    super();
                    this._dbSet = dbSet;
                    this.__queryInfo = queryInfo;
                    this._filterInfo = { filterItems: [] };
                    this._sortInfo = { sortItems: [] };
                    this._isIncludeTotalCount = true;
                    this._isClearPrevData = true;
                    this._pageSize = dbSet.pageSize;
                    this._pageIndex = dbSet.pageIndex;
                    this._params = {};
                    this._loadPageCount = 1;
                    this._isClearCacheOnEveryLoad = true;
                    this._dataCache = null;
                    this._cacheInvalidated = false;
                }
                getFieldInfo(fieldName: string) {
                    return this._dbSet.getFieldInfo(fieldName);
                }
                getFieldNames() {
                    var fldMap = this._dbSet._fieldMap;
                    return utils.getProps(fldMap);
                }
                _addSort(fieldName: string, sortOrder: string) {
                    var sort = collection.SORT_ORDER.ASC;
                    if (!!sortOrder && sortOrder.toLowerCase().substr(0, 1) === 'd')
                        sort = collection.SORT_ORDER.DESC;
                    var sortItem = { fieldName: fieldName, sortOrder: sort };
                    this._sortInfo.sortItems.push(sortItem);
                    this._cacheInvalidated = true;
                }
                _addFilterItem(fieldName: string, operand: string, value: any) {
                    var fkind = FILTER_TYPE.Equals;
                    var fld = this.getFieldInfo(fieldName);
                    if (!fld)
                        throw new Error(utils.format(RIAPP.ERRS.ERR_DBSET_INVALID_FIELDNAME, this.dbSetName, fieldName));

                    var stz = this._serverTimezone, dcnv = fld.dateConversion, val = value;
                    if (!utils.check.isArray(val))
                        val = [value];
                    var tmp = RIAPP.ArrayHelper.clone(val);
                    val = tmp.map(function (el) {
                        return valueUtils.stringifyValue(el, dcnv, stz);
                    });

                    switch (operand.toLowerCase()) {
                        case "equals":
                        case "=":
                            fkind = FILTER_TYPE.Equals;
                            break;
                        case "noteq":
                        case "!=":
                        case "<>":
                            fkind = FILTER_TYPE.NotEq;
                            break;
                        case "between":
                            fkind = FILTER_TYPE.Between;
                            if (value.length != 2)
                                throw new Error(RIAPP.ERRS.ERR_QUERY_BETWEEN);
                            break;
                        case "startswith":
                            fkind = FILTER_TYPE.StartsWith;
                            break;
                        case "endswith":
                            fkind = FILTER_TYPE.EndsWith;
                            break;
                        case "contains":
                            fkind = FILTER_TYPE.Contains;
                            break;
                        case "gt":
                        case ">":
                            fkind = FILTER_TYPE.Gt;
                            break;
                        case "gteq":
                        case ">=":
                            fkind = FILTER_TYPE.GtEq;
                            break;
                        case "lt":
                        case "<":
                            fkind = FILTER_TYPE.Lt;
                            break;
                        case "lteq":
                        case "<=":
                            fkind = FILTER_TYPE.LtEq;
                            break;
                        default:
                            throw new Error(utils.format(RIAPP.ERRS.ERR_QUERY_OPERATOR_INVALID, operand));
                    }
                    var filterItem = { fieldName: fieldName, kind: fkind, values: val };
                    this._filterInfo.filterItems.push(filterItem);
                    this._cacheInvalidated = true;
                }
                where(fieldName: string, operand: string, value) {
                    this._addFilterItem(fieldName, operand, value);
                    return this;
                }
                and(fieldName: string, operand: string, value) {
                    this._addFilterItem(fieldName, operand, value);
                    return this;
                }
                orderBy(fieldName: string, sortOrder: string) {
                    this._addSort(fieldName, sortOrder);
                    return this;
                }
                thenBy(fieldName: string, sortOrder: string) {
                    this._addSort(fieldName, sortOrder);
                    return this;
                }
                clearSort() {
                    this._sortInfo.sortItems = [];
                    this._cacheInvalidated = true;
                    return this;
                }
                clearFilter() {
                    this._filterInfo.filterItems = [];
                    this._cacheInvalidated = true;
                    return this;
                }
                clearParams() {
                    this._params = {};
                    this._cacheInvalidated = true;
                    return this;
                }
                _clearCache() {
                    if (!!this._dataCache) {
                        this._dataCache.destroy();
                        this._dataCache = null;
                    }
                    this._resetCacheInvalidated();
                }
                _getCache() {
                    if (!this._dataCache) {
                        this._dataCache = new DataCache(this);
                    }
                    return this._dataCache;
                }
                _reindexCache() {
                    if (!this._dataCache) {
                        return;
                    }
                    this._dataCache.reindexCache();
                }
                _isPageCached(pageIndex: number) {
                    if (!this._dataCache) {
                        return false;
                    }
                    return this._dataCache.hasPage(pageIndex);
                }
                _resetCacheInvalidated() {
                    this._cacheInvalidated = false;
                }
                load(): IPromise<ILoadResult<TEntity>> {
                    return <IPromise<ILoadResult<TEntity>>>this.dbSet.dbContext.load(this);
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._clearCache();
                    super.destroy();
                }
                toString() {
                    return 'DataQuery';
                }
                get _queryInfo() { return this.__queryInfo; }
                get _serverTimezone() { return this._dbSet.dbContext.serverTimezone; }
                get entityType() { return this._dbSet.entityType; }
                get dbSet() { return this._dbSet; }
                get dbSetName() { return this._dbSet.dbSetName; }
                get queryName() { return this.__queryInfo.methodName; }
                get filterInfo() { return this._filterInfo; }
                get sortInfo() { return this._sortInfo; }
                get isIncludeTotalCount() { return this._isIncludeTotalCount; }
                set isIncludeTotalCount(v: boolean) { this._isIncludeTotalCount = v; }
                get isClearPrevData() { return this._isClearPrevData; }
                set isClearPrevData(v: boolean) { this._isClearPrevData = v; }
                get pageSize() { return this._pageSize; }
                set pageSize(v: number) {
                    if (this._pageSize != v) {
                        this._pageSize = v;
                    }
                }
                get pageIndex() { return this._pageIndex; }
                set pageIndex(v: number) {
                    if (this._pageIndex != v) {
                        this._pageIndex = v;
                    }
                }
                get params() { return this._params; }
                set params(v:any) {
                    if (this._params !== v) {
                        this._params = v;
                        this._cacheInvalidated = true;
                    }
                }
                get isPagingEnabled() { return this._dbSet.isPagingEnabled; }
                get loadPageCount() { return this._loadPageCount; }
                set loadPageCount(v: number) {
                    if (v < 1) {
                        v = 1;
                    }
                    if (this._loadPageCount != v) {
                        this._loadPageCount = v;
                        if (v === 1) {
                            this._clearCache();
                        }
                        this.raisePropertyChanged('loadPageCount');
                    }
                }
                get isClearCacheOnEveryLoad() { return this._isClearCacheOnEveryLoad; }
                set isClearCacheOnEveryLoad(v) {
                    if (this._isClearCacheOnEveryLoad != v) {
                        this._isClearCacheOnEveryLoad = v;
                        this.raisePropertyChanged('isClearCacheOnEveryLoad');
                    }
                }
                get isCacheValid() { return !!this._dataCache && !this._cacheInvalidated; }
            }

            export class DataQuery extends TDataQuery<Entity>{
            }

            export class Entity extends collection.CollectionItem {
                private __changeType: collection.STATUS;
                private __isRefreshing: boolean;
                private __isCached: boolean;
                private __dbSet: DbSet<Entity>;
                private _srvRowKey: string;
                private _origVals: { [name: string]: any; };
                private _saveChangeType: collection.STATUS;

                constructor(dbSet: DbSet<Entity>, row: IRowData, names: string[]) {
                    this.__dbSet = dbSet;
                    super();
                    this.__changeType = collection.STATUS.NONE;
                    this.__isRefreshing = false;
                    this.__isCached = false;

                    this._srvRowKey = null;
                    this._origVals = null;
                    this._saveChangeType = null;
                    var fields = this.getFieldNames();
                    fields.forEach(function (fieldName) {
                        this._vals[fieldName] = null;
                    }, this);
                    this._initRowInfo(row, names);
                }
                _updateKeys(srvKey: string) {
                    this._srvRowKey = srvKey;
                    this._key = srvKey;
                }
                _initRowInfo(row: IRowData, names: string[]) {
                    if (!row)
                        return;
                    var self = this, stz = self._serverTimezone;
                    this._srvRowKey = row.key;
                    this._key = row.key;
                    row.values.forEach(function (val, index) {
                        var fieldName = names[index], fld = self.getFieldInfo(fieldName);
                        if (!fld)
                            throw new Error(utils.format(RIAPP.ERRS.ERR_DBSET_INVALID_FIELDNAME, self._dbSetName, fieldName));

                        var newVal = val, dataType = fld.dataType, dcnv = fld.dateConversion,
                            res = valueUtils.parseValue(newVal, dataType, dcnv, stz);
                        self._vals[fld.fieldName] = res;
                    });
                }
                _checkCanRefresh() {
                    if (this._key === null || this._changeType === collection.STATUS.ADDED) {
                        throw new Error(RIAPP.ERRS.ERR_OPER_REFRESH_INVALID);
                    }
                }
                _refreshValue(val:any, fieldName: string, refreshMode: REFRESH_MODE) {
                    var self = this, fld = self.getFieldInfo(fieldName);
                    if (!fld)
                        throw new Error(utils.format(RIAPP.ERRS.ERR_DBSET_INVALID_FIELDNAME, this._dbSetName, fieldName));
                    var stz = self._serverTimezone, newVal, oldVal, oldValOrig,
                        dataType = fld.dataType, dcnv = fld.dateConversion;
                    newVal = valueUtils.parseValue(val, dataType, dcnv, stz);
                    oldVal = self._vals[fieldName];
                    switch (refreshMode) {
                        case REFRESH_MODE.CommitChanges:
                            {
                                if (!valueUtils.compareVals(newVal, oldVal, dataType)) {
                                    self._vals[fieldName] = newVal;
                                    self._onFieldChanged(fld);
                                }
                            }
                            break;
                        case REFRESH_MODE.RefreshCurrent:
                            {
                                if (!!self._origVals) {
                                    self._origVals[fieldName] = newVal;
                                }
                                if (!!self._saveVals) {
                                    self._saveVals[fieldName] = newVal;
                                }
                                if (!valueUtils.compareVals(newVal, oldVal, dataType)) {
                                    self._vals[fieldName] = newVal;
                                    self._onFieldChanged(fld);
                                }
                            }
                            break;
                        case REFRESH_MODE.MergeIntoCurrent:
                            {
                                if (!!self._origVals) {
                                    oldValOrig = self._origVals[fieldName];
                                    self._origVals[fieldName] = newVal;
                                }
                                if (oldValOrig === undefined || valueUtils.compareVals(oldValOrig, oldVal, dataType)) {
                                    //unmodified
                                    if (!valueUtils.compareVals(newVal, oldVal, dataType)) {
                                        self._vals[fieldName] = newVal;
                                        self._onFieldChanged(fld);
                                    }
                                }
                            }
                            break;
                        default:
                            throw new Error(utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'refreshMode', refreshMode));
                    }
                }
                _refreshValues(rowInfo: IRowInfo, refreshMode: REFRESH_MODE) {
                    var self = this, oldCT = this._changeType;
                    if (!this._isDestroyed) {
                        if (!refreshMode) {
                            refreshMode = REFRESH_MODE.RefreshCurrent;
                        }
                        rowInfo.values.forEach(function (val) {
                            if (!((val.flags & FLAGS.Refreshed) === FLAGS.Refreshed))
                                return;
                            self._refreshValue(val.val, val.fieldName, refreshMode);
                        });

                        if (oldCT === collection.STATUS.UPDATED) {
                            var changes = this._getStrValues(true);
                            if (changes.length === 0) {
                                this._origVals = null;
                                this._changeType = collection.STATUS.NONE;
                            }
                        }
                    }
                }
                _onFieldChanged(fieldInfo: collection.IFieldInfo) {
                    var self = this;
                    this.raisePropertyChanged(fieldInfo.fieldName);
                    if (!!fieldInfo.dependents && fieldInfo.dependents.length > 0)
                        fieldInfo.dependents.forEach(function (d) {
                            self.raisePropertyChanged(d);
                        });
                }
                _getStrValues(changedOnly: boolean) {
                    var self = this, names = this.getFieldNames(), dbSet = this._dbSet,
                        res: IValueChange[], res2: IValueChange[];
                    res = names.map(function (name) {
                        var fld = self.getFieldInfo(name);
                        if (fld.isClientOnly)
                            return <IValueChange>null;

                        var newVal = dbSet._getStrValue(self._vals[name], fld),
                            oldV = self._origVals === null ? newVal : dbSet._getStrValue(self._origVals[name], fld),
                            isChanged = (oldV !== newVal);
                        if (isChanged)
                            return { val: newVal, orig: oldV, fieldName: name, flags: (FLAGS.Changed | FLAGS.Setted) };
                        else if (fld.isPrimaryKey > 0 || fld.isRowTimeStamp || fld.isNeedOriginal)
                            return { val: newVal, orig: oldV, fieldName: name, flags: FLAGS.Setted };
                        else
                            return { val: null, orig: null, fieldName: name, flags: FLAGS.None };
                    });

                    res2 = res.filter(function (v) {
                        if (!v)
                            return false;
                        return changedOnly ? ((v.flags & FLAGS.Changed) === FLAGS.Changed) : true;
                    });
                    return res2;
                }
                _getRowInfo() {
                    var res: IRowInfo = {
                        values: this._getStrValues(false),
                        changeType: this._changeType,
                        serverKey: this._srvKey,
                        clientKey: this._key,
                        error: null
                    };
                    return res;
                }
                _fldChanging(fieldInfo: collection.IFieldInfo, oldV, newV) {
                    if (!this._origVals) {
                        this._origVals = utils.shallowCopy(this._vals);
                    }
                    return true;
                }
                _fldChanged(fieldInfo: collection.IFieldInfo, oldV, newV) {
                    if (!fieldInfo.isClientOnly) {
                        switch (this._changeType) {
                            case collection.STATUS.NONE:
                                this._changeType = collection.STATUS.UPDATED;
                                break;
                        }
                    }
                    this._onFieldChanged(fieldInfo);
                    return true;
                }
                _clearFieldVal(fieldName: string) {
                    this._vals[fieldName] = null;
                }
                _skipValidate(fieldInfo: collection.IFieldInfo, val) {
                    var childToParentNames = this._dbSet._getChildToParentNames(fieldInfo.fieldName), res = false;
                    if (!!childToParentNames && val === null) {
                        for (var i = 0, len = childToParentNames.length; i < len; i += 1) {
                            res = !!this._getFieldVal(childToParentNames[i]);
                            if (res)
                                break;
                        }
                    }
                    return res;
                }
                _getFieldVal(fieldName: string) {
                    return this._vals[fieldName];
                }
                _setFieldVal(fieldName: string, val) {
                    var validation_error, error, dbSetName = this._dbSetName, coll = this._collection,
                        ERRS = RIAPP.ERRS, oldV = this._vals[fieldName], newV = val, fld = this.getFieldInfo(fieldName);
                    if (!fld)
                        throw new Error(utils.format(ERRS.ERR_DBSET_INVALID_FIELDNAME, dbSetName, fieldName));
                    if (!this._isEditing && !this._isUpdating)
                        this.beginEdit();
                    try {
                        newV = this._checkVal(fld, newV);
                        if (oldV != newV) {
                            if (this._fldChanging(fld, oldV, newV)) {
                                this._vals[fieldName] = newV;
                                this._fldChanged(fld, oldV, newV);
                            }
                        }
                        coll._removeError(this, fieldName);
                        validation_error = this._validateField(fieldName);
                        if (!!validation_error) {
                            throw new ValidationError([validation_error], this);
                        }
                    } catch (ex) {
                        if (ex instanceof ValidationError) {
                            error = ex;
                        }
                        else {
                            error = new ValidationError([
                                { fieldName: fieldName, errors: [ex.message] }
                            ], this);
                        }
                        coll._addError(this, fieldName, error.errors[0].errors);
                        throw error;
                    }
                    return true;
                }
                _onAttaching() {
                    super._onAttaching();
                    this.__changeType = collection.STATUS.ADDED;
                }
                _onAttach() {
                    super._onAttach();
                    if (this._key === null)
                        throw new Error(RIAPP.ERRS.ERR_ITEM_IS_DETACHED);
                    this._dbSet._addToChanged(this);
                }
                _beginEdit() {
                    if (!super._beginEdit())
                        return false;
                    this._saveChangeType = this._changeType;
                    return true;
                }
                _endEdit() {
                    if (!super._endEdit())
                        return false;
                    this._saveChangeType = null;
                    return true;
                }
                deleteItem() {
                    return this.deleteOnSubmit();
                }
                deleteOnSubmit() {
                    var oldCT = this._changeType, eset = this._dbSet;
                    if (!eset._onItemDeleting(this)) {
                        return false;
                    }
                    if (this._key === null)
                        return false;
                    if (oldCT === collection.STATUS.ADDED) {
                        eset.removeItem(this);
                        return true;
                    }
                    this._changeType = collection.STATUS.DELETED;
                    return true;
                }
                acceptChanges(rowInfo?: IRowInfo) {
                    var oldCT = this._changeType, eset = this._dbSet;
                    if (this._key === null)
                        return;
                    if (oldCT !== collection.STATUS.NONE) {
                        eset._onCommitChanges(this, true, false, oldCT);
                        if (oldCT === collection.STATUS.DELETED) {
                            eset.removeItem(this);
                            return;
                        }
                        this._origVals = null;
                        if (!!this._saveVals)
                            this._saveVals = utils.shallowCopy(this._vals);
                        this._changeType = collection.STATUS.NONE;
                        eset._removeAllErrors(this);
                        if (!!rowInfo)
                            this._refreshValues(rowInfo, REFRESH_MODE.CommitChanges);
                        eset._onCommitChanges(this, false, false, oldCT);
                    }
                }
                rejectChanges() {
                    var self = this, oldCT = this._changeType, eset = this._dbSet;
                    if (this._key === null)
                        return;

                    if (oldCT !== collection.STATUS.NONE) {
                        eset._onCommitChanges(this, true, true, oldCT);
                        if (oldCT === collection.STATUS.ADDED) {
                            eset.removeItem(this);
                            return;
                        }

                        var changes = this._getStrValues(true);
                        if (!!this._origVals) {
                            this._vals = utils.shallowCopy(this._origVals);
                            this._origVals = null;
                            if (!!this._saveVals) {
                                this._saveVals = utils.shallowCopy(this._vals);
                            }
                        }
                        this._changeType = collection.STATUS.NONE;
                        eset._removeAllErrors(this);
                        changes.forEach(function (v) {
                            self._onFieldChanged(eset.getFieldInfo(v.fieldName));
                        });
                        eset._onCommitChanges(this, false, true, oldCT);
                    }
                }
                submitChanges(): IVoidPromise {
                    var dbContext = this.getDbContext(), uniqueID = utils.uuid();
                    dbContext.addOnSubmitError(function (sender, args) {
                        if (args.error instanceof db.SubmitError) {
                            var submitErr: db.SubmitError = args.error;
                            if (submitErr.notValidated.length > 0) {
                                //don't reject changes,so the user can see errors in the edit dialog
                                args.isHandled = true;
                            }
                        }
                    }, uniqueID);

                    var promise = dbContext.submitChanges();
                    promise.always(function () {
                        dbContext.removeOnSubmitError(uniqueID);
                    });
                    return promise;
                }
                refresh(): IPromise<Entity> {
                    var db = this.getDbContext();
                    return db._refreshItem(this);
                }
                cancelEdit() {
                    if (!this._isEditing)
                        return false;
                    var self = this, changes = this._getStrValues(true), isNew = this._isNew, coll = this._dbSet;
                    this._isEditing = false;
                    this._vals = this._saveVals;
                    this._saveVals = null;
                    this._changeType = this._saveChangeType;
                    this._saveChangeType = null;
                    coll._removeAllErrors(this);
                    changes.forEach(function (v) {
                        self.raisePropertyChanged(v.fieldName);
                    });
                    if (isNew && this._notEdited) {
                        coll.removeItem(this);
                    }
                    coll._onEditing(this, false, true);
                    this.raisePropertyChanged('isEditing');
                    return true;
                }
                getDbContext(): DbContext {
                    return this.__dbSet.dbContext;
                }
                getDbSet() {
                    return this.__dbSet;
                }
                toString() {
                    return 'Entity';
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this.__dbSet = null;
                    this._srvRowKey = null;
                    this._origVals = null;
                    this._saveChangeType = null;
                    this.__isRefreshing = false;
                    this.__isCached = false;
                    super.destroy();
                }
                get _isCanSubmit() { return true; }
                get _changeType() { return this.__changeType; }
                set _changeType(v) {
                    if (this.__changeType !== v) {
                        var oldChangeType = this.__changeType;
                        this.__changeType = v;
                        if (v !== collection.STATUS.NONE)
                            this._dbSet._addToChanged(this);
                        else
                            this._dbSet._removeFromChanged(this._key);
                        this._dbSet._onItemStatusChanged(this, oldChangeType);
                    }
                }
                get _isNew() { return this.__changeType === collection.STATUS.ADDED; }
                get _isDeleted() { return this.__changeType === collection.STATUS.DELETED; }
                get _entityType() { return this.__dbSet.entityType; }
                get _srvKey() { return this._srvRowKey; }
                get _dbSetName() { return this.__dbSet.dbSetName; }
                get _serverTimezone() { return this.getDbContext().serverTimezone; }
                get _collection() { return <collection.BaseCollection<Entity>>this.__dbSet; }
                get _dbSet() { return this.__dbSet; }
                get _isRefreshing() { return this.__isRefreshing; }
                set _isRefreshing(v) {
                    if (this.__isRefreshing !== v) {
                        this.__isRefreshing = v;
                        this.raisePropertyChanged('_isRefreshing');
                    }
                }
                get _isCached() { return this.__isCached; }
                set _isCached(v) { this.__isCached = v; }
                get isHasChanges() { return this.__changeType !== collection.STATUS.NONE; }
            }

            export class DbSet<TEntity extends Entity> extends collection.BaseCollection<TEntity> {
                private _dbContext: DbContext;
                private _isSubmitOnDelete: boolean;
                private _trackAssoc: { [name: string]: IAssociationInfo; };
                private _trackAssocMap: { [childFieldName: string]: string[]; };
                private _childAssocMap: { [fieldName: string]: IAssociationInfo; };
                private _parentAssocMap: { [fieldName: string]: IAssociationInfo; };
                private _changeCount: number;
                private _changeCache: { [key: string]: TEntity; };
                _options: IDbSetOptions;
                _navfldMap: { [fieldName: string]: { getFunc: () => any; setFunc: (v: any) => void; }; };
                _calcfldMap: { [fieldName: string]: { getFunc: () => any; }; };
                _itemsByKey: { [key: string]: TEntity; };
                _entityType: IEntityConstructor;
                _ignorePageChanged: boolean;
                _query: TDataQuery<TEntity>;

                constructor(opts: IDbSetConstuctorOptions) {
                    super();
                    var dbContext = opts.dbContext, dbSetInfo = opts.dbSetInfo;
                    this._dbContext = dbContext;
                    this._options.dbSetName = dbSetInfo.dbSetName;
                    this._options.enablePaging = dbSetInfo.enablePaging;
                    this._options.pageSize = dbSetInfo.pageSize;
                    this._query = null;
                    this._entityType = null;
                    this._isSubmitOnDelete = false;
                    this._navfldMap = {};
                    this._calcfldMap = {};

                    //association infos maped by name
                    //we should track changes in navigation properties for this associations
                    this._trackAssoc = {};
                    //map childToParentName by childField as a key
                    this._trackAssocMap = {};
                    //map association infos by childToParent fieldname
                    this._childAssocMap = {};
                    //map association infos by parentToChildren fieldname
                    this._parentAssocMap = {};

                    this._changeCount = 0;
                    this._changeCache = {};
                    this._ignorePageChanged = false;
                    Object.freeze(this._perms);
                }
                getFieldInfo(fieldName: string): collection.IFieldInfo {
                    //for example Customer.Name
                    var assoc: IAssociationInfo, parentDB: DbSet<Entity>, names = fieldName.split('.');
                    if (names.length == 1)
                        return this._fieldMap[fieldName];
                    else if (names.length > 1) {
                        assoc = this._childAssocMap[names[0]];
                        if (!!assoc) {
                            parentDB = this.dbContext.getDbSet(assoc.parentDbSetName);
                            fieldName = names.slice(1).join('.');
                            return parentDB.getFieldInfo(fieldName);
                        }
                    }
                    throw new Error(utils.format(RIAPP.ERRS.ERR_DBSET_INVALID_FIELDNAME, this.dbSetName, fieldName));
                }
                _onError(error, source): boolean {
                    return this.dbContext._onError(error, source);
                }
                _mapAssocFields() {
                    var tas = this._trackAssoc, assoc: IAssociationInfo, tasKeys = Object.keys(tas),
                        frel: { childField: string; parentField: string; },
                        map = this._trackAssocMap;
                    for (var i = 0, len = tasKeys.length; i < len; i += 1) {
                        assoc = tas[tasKeys[i]];
                        for (var j = 0, len2 = assoc.fieldRels.length; j < len2; j += 1) {
                            frel = assoc.fieldRels[j];
                            if (!utils.check.isArray(map[frel.childField])) {
                                map[frel.childField] = [assoc.childToParentName];
                            }
                            else {
                                map[frel.childField].push(assoc.childToParentName);
                            }
                        }
                    }
                }
                _updatePermissions(perms: IPermissions) {
                    this._perms = perms;
                }
                _getChildToParentNames(childFieldName: string) { return this._trackAssocMap[childFieldName]; }
                _getStrValue(val: any, fieldInfo: collection.IFieldInfo) {
                    var dcnv = fieldInfo.dateConversion, stz = this.dbContext.serverTimezone;
                    return valueUtils.stringifyValue(val, dcnv, stz);
                }
                _doNavigationField(opts: IDbSetConstuctorOptions, fInfo: MOD.collection.IFieldInfo) {
                    var self = this, isChild = true, result: { getFunc: () => any; setFunc: (v: any) => void; } = { getFunc: () => { throw new Error('Function is not implemented'); }, setFunc: function (v: any) { throw new Error('Function is not implemented'); } };
                    var assocs = opts.childAssoc.filter(function (a) {
                        return a.childToParentName == fInfo.fieldName;
                    });

                    if (assocs.length === 0) {
                        assocs = opts.parentAssoc.filter(function (a) {
                            return a.parentToChildrenName == fInfo.fieldName;
                        });
                        isChild = false;
                    }

                    if (assocs.length != 1)
                        throw new Error(utils.format(RIAPP.ERRS.ERR_PARAM_INVALID_TYPE, 'assocs', 'Array'));
                    var assocName = assocs[0].name;
                    fInfo.isClientOnly = true;
                    fInfo.isReadOnly = true;
                    if (isChild) {
                        fInfo.isReadOnly = false;
                        self._childAssocMap[assocs[0].childToParentName] = assocs[0];
                        assocs[0].fieldRels.forEach(function (frel) {
                            var chf = self._fieldMap[frel.childField];
                            if (!fInfo.isReadOnly && chf.isReadOnly) {
                                fInfo.isReadOnly = true;
                            }
                        });
                        //this property should return parent
                        result.getFunc = function () {
                            var assoc = self.dbContext.getAssociation(assocName);
                            return assoc.getParentItem(<any>this);
                        };

                        if (!fInfo.isReadOnly) {
                            //should track this association for new items parent - child relationship changes
                            self._trackAssoc[assocName] = assocs[0];

                            result.setFunc = function (v) {
                                var entity: any = this, i, len, assoc = self.dbContext.getAssociation(assocName);
                                if (!!v && !(v instanceof assoc.parentDS.entityType)) {
                                    throw new Error(utils.format(RIAPP.ERRS.ERR_PARAM_INVALID_TYPE, 'value', assoc.parentDS.dbSetName));
                                }

                                if (!!v && v._isNew) {
                                    entity._setFieldVal(fInfo.fieldName, v._key);
                                }
                                else if (!!v) {
                                    for (i = 0, len = assoc.childFldInfos.length; i < len; i += 1) {
                                        entity[assoc.childFldInfos[i].fieldName] = v[assoc.parentFldInfos[i].fieldName];
                                    }
                                }
                                else {
                                    var oldKey = entity._getFieldVal(fInfo.fieldName);
                                    if (!!oldKey) {
                                        entity._setFieldVal(fInfo.fieldName, null);
                                    }
                                    for (i = 0, len = assoc.childFldInfos.length; i < len; i += 1) {
                                        entity[assoc.childFldInfos[i].fieldName] = null;
                                    }
                                }
                            }
                        }
                    } //if (isChild)
                    else {
                        self._parentAssocMap[assocs[0].parentToChildrenName] = assocs[0];
                        //return children
                        result.getFunc = function () {
                            return self.dbContext.getAssociation(assocName).getChildItems(this);
                        };
                    }
                    return result;
                }
                _doCalculatedField(opts: IDbSetConstuctorOptions, fInfo: MOD.collection.IFieldInfo) {
                    var self = this, result: { getFunc: () => any; } = { getFunc: () => { throw new Error(utils.format("Calculated field:'{0}' is not initialized", fInfo.fieldName)); } };
                    function doDependants(f: collection.IFieldInfo) {
                        var deps: string[] = f.dependentOn.split(',');
                        deps.forEach(function (depOn) {
                            var depOnFld = self._fieldMap[depOn];
                            if (!depOnFld)
                                throw new Error(utils.format(RIAPP.ERRS.ERR_CALC_FIELD_DEFINE, depOn));
                            if (f.fieldName === depOn)
                                throw new Error(utils.format(RIAPP.ERRS.ERR_CALC_FIELD_SELF_DEPEND, depOn));
                            if (depOnFld.dependents.indexOf(f.fieldName) < 0) {
                                depOnFld.dependents.push(f.fieldName);
                            }
                        });
                    };
                    fInfo.isClientOnly = true;
                    fInfo.isReadOnly = true;
                    if (!!fInfo.dependentOn) {
                        doDependants(fInfo);
                    }
                    return result;
                }
                _fillFromService(data: { res: IGetDataResult; isPageChanged: boolean; fn_beforeFillEnd: () => void; }): ILoadResult<TEntity> {
                    data = utils.extend(false, {
                        res: { names: [], rows: [], pageIndex: null, pageCount: null, dbSetName: this.dbSetName, totalCount: null },
                        isPageChanged: false,
                        fn_beforeFillEnd: null
                    }, data);

                    var self = this, res = data.res, fieldNames = res.names, rows = res.rows || [], rowCount = rows.length,
                        entityType = this._entityType, newItems: TEntity[] = [], positions: number[] = [], created_items: TEntity[] = [], fetchedItems: TEntity[] = [],
                        isPagingEnabled = this.isPagingEnabled, RM = REFRESH_MODE.RefreshCurrent, query = this.query, clearAll = true, dataCache: DataCache;

                    this._onFillStart({ isBegin: true, rowCount: rowCount, time: new Date(), isPageChanged: data.isPageChanged });
                    try {
                        if (!!query) {
                            clearAll = query.isClearPrevData;
                            if (query.isClearCacheOnEveryLoad)
                                query._clearCache();
                            if (clearAll) this.clear();
                            query._reindexCache();
                            if (query.loadPageCount > 1 && isPagingEnabled) {
                                dataCache = query._getCache();
                                if (query.isIncludeTotalCount && !utils.check.isNt(res.totalCount))
                                    dataCache.totalCount = res.totalCount;
                            }
                        }
                        created_items = rows.map(function (row) {
                            //row.key already a string value generated on server (no need to convert to string)
                            var key = row.key;
                            if (!key)
                                throw new Error(RIAPP.ERRS.ERR_KEY_IS_EMPTY);

                            var item = self._itemsByKey[key];
                            if (!item) {
                                if (!!dataCache) {
                                    item = <TEntity>dataCache.getItemByKey(key);
                                }
                                if (!item)
                                    item = <TEntity>new entityType(self, row, fieldNames);
                                else {
                                    row.values.forEach(function (val, index) {
                                        item._refreshValue(val, fieldNames[index], RM);
                                    });
                                }
                            }
                            else {
                                row.values.forEach(function (val, index) {
                                    item._refreshValue(val, fieldNames[index], RM);
                                });
                            }
                            return item;
                        });

                        if (!!query) {
                            if (query.isIncludeTotalCount && !utils.check.isNt(res.totalCount)) {
                                this.totalCount = res.totalCount;
                            }

                            if (query.loadPageCount > 1 && isPagingEnabled) {
                                dataCache.fillCache(res.pageIndex, created_items);
                                var pg = dataCache.getCachedPage(query.pageIndex);
                                if (!!pg)
                                    created_items = <TEntity[]>pg.items;
                                else
                                    created_items = [];
                            }
                        }

                        created_items.forEach(function (item) {
                            var oldItem = self._itemsByKey[item._key];
                            if (!oldItem) {
                                self._items.push(item);
                                positions.push(self._items.length - 1);
                                self._itemsByKey[item._key] = item;
                                newItems.push(item);
                                fetchedItems.push(item);
                            }
                            else
                                fetchedItems.push(oldItem);
                        });

                        if (newItems.length > 0) {
                            this._onItemsChanged({ change_type: collection.COLL_CHANGE_TYPE.ADDED, items: newItems, pos: positions });
                            this.raisePropertyChanged('count');
                        }

                        if (!!data.fn_beforeFillEnd) {
                            data.fn_beforeFillEnd();
                        }
                    }
                    finally {
                        this._onFillEnd({
                            isBegin: false, rowCount: fetchedItems.length, time: new Date(), resetUI: clearAll,
                            fetchedItems: fetchedItems, newItems: newItems, isPageChanged: data.isPageChanged
                        });
                    }
                    this.moveFirst();
                    return <ILoadResult<TEntity>>{ fetchedItems: fetchedItems, newItems: newItems, isPageChanged: data.isPageChanged, outOfBandData: data.res.extraInfo };
                }
                _fillFromCache(data: { isPageChanged: boolean; fn_beforeFillEnd: () => void; }): ILoadResult<TEntity> {
                    data = utils.extend(false, {
                        isPageChanged: false,
                        fn_beforeFillEnd: null
                    }, data);
                    var self = this, positions:number[] = [], fetchedItems:TEntity[] = [], query = this.query;
                    if (!query)
                        throw new Error(utils.format(RIAPP.ERRS.ERR_ASSERTION_FAILED, 'query is not null'));
                    var dataCache = query._getCache(), cachedPage = dataCache.getCachedPage(query.pageIndex),
                        items = !cachedPage ? <TEntity[]>[] : <TEntity[]>cachedPage.items;

                    this._onFillStart({ isBegin: true, rowCount: items.length, time: new Date(), isPageChanged: data.isPageChanged });
                    try {
                        this.clear();
                        this._items = items;

                        items.forEach(function (item, index) {
                            self._itemsByKey[item._key] = item;
                            positions.push(index);
                            fetchedItems.push(item);
                        });

                        if (!!data.fn_beforeFillEnd) {
                            data.fn_beforeFillEnd();
                        }

                        if (fetchedItems.length > 0) {
                            this._onItemsChanged({ change_type: collection.COLL_CHANGE_TYPE.ADDED, items: fetchedItems, pos: positions });
                            this.raisePropertyChanged('count');
                        }
                    }
                    finally {
                        this._onFillEnd({
                            isBegin: false, rowCount: fetchedItems.length, time: new Date(), resetUI: true,
                            fetchedItems: fetchedItems, newItems: fetchedItems, isPageChanged: data.isPageChanged
                        });
                    }
                    this.moveFirst();
                    return { fetchedItems: fetchedItems, newItems: fetchedItems, isPageChanged: data.isPageChanged, outOfBandData: null };
                }
                _commitChanges(rows: IRowInfo[]) {
                    var self = this;

                    rows.forEach(function (rowInfo) {
                        var key = rowInfo.clientKey, item: TEntity = self._itemsByKey[key];
                        if (!item) {
                            throw new Error(utils.format(RIAPP.ERRS.ERR_KEY_IS_NOTFOUND, key));
                        }
                        var itemCT = item._changeType;
                        item.acceptChanges(rowInfo);
                        if (itemCT === collection.STATUS.ADDED) {
                            //on insert
                            delete self._itemsByKey[key];
                            item._updateKeys(rowInfo.serverKey);
                            self._itemsByKey[item._key] = item;
                            self._onItemsChanged({
                                change_type: collection.COLL_CHANGE_TYPE.REMAP_KEY,
                                items: [item],
                                old_key: key,
                                new_key: item._key
                            })
                        }
                    });
                }
                _setItemInvalid(row: IRowInfo) {
                    var keyMap = this._itemsByKey, item: TEntity = keyMap[row.clientKey];
                    var errors = {};
                    row.invalid.forEach(function (err) {
                        if (!err.fieldName)
                            err.fieldName = '*';
                        if (!!errors[err.fieldName]) {
                            errors[err.fieldName].push(err.message);
                        }
                        else
                            errors[err.fieldName] = [err.message];
                    });
                    var res: binding.IValidationInfo[] = [];
                    utils.forEachProp(errors, function (fieldName) {
                        res.push({ fieldName: fieldName, errors: errors[fieldName] });
                    });
                    this._addErrors(item, res);
                    return item;
                }
                _setCurrentItem(v: TEntity) {
                    if (!!v && !(v instanceof this._entityType)) {
                        throw new Error(RIAPP.global.utils.format(RIAPP.ERRS.ERR_PARAM_INVALID_TYPE, 'currentItem', this._options.dbSetName));
                    }
                    super._setCurrentItem(v);
                }
                _getChanges() {
                    var changes: IRowInfo[] = [];
                    var csh = this._changeCache;
                    utils.forEachProp(csh, function (key) {
                        var item = csh[key];
                        changes.push(item._getRowInfo());
                    });
                    return changes;
                }
                _getTrackAssocInfo() {
                    var self = this, res: ITrackAssoc[] = [];
                    var csh: { [key: string]: Entity; } = this._changeCache, assocNames = Object.keys(self._trackAssoc);
                    utils.forEachProp(csh, function (key) {
                        var item = csh[key];
                        assocNames.forEach(function (assocName) {
                            var assocInfo = self._trackAssoc[assocName],
                                parentKey = item._getFieldVal(assocInfo.childToParentName),
                                childKey = item._key;
                            if (!!parentKey && !!childKey) {
                                res.push({ assocName: assocName, parentKey: parentKey, childKey: childKey });
                            }
                        });
                    });
                    return res;
                }
                _getNewKey(item: TEntity) {
                    //client's item ID
                    var key = 'clkey_' + this._newKey;
                    this._newKey += 1;
                    return key;
                }
                _createNew() {
                    var item = <TEntity><any>new this._entityType(this, null, null);
                    item._key = this._getNewKey(item);
                    return item;
                }
                _addToChanged(item: TEntity) {
                    if (item._key === null)
                        return;
                    if (!this._changeCache[item._key]) {
                        this._changeCache[item._key] = item;
                        this._changeCount += 1;
                        if (this._changeCount === 1)
                            this.raisePropertyChanged('hasChanges');
                    }
                }
                _removeFromChanged(key: string) {
                    if (key === null)
                        return;
                    if (!!this._changeCache[key]) {
                        delete this._changeCache[key];
                        this._changeCount -= 1;
                        if (this._changeCount === 0)
                            this.raisePropertyChanged('hasChanges');
                    }
                }
                _clearChangeCache() {
                    var old = this._changeCount;
                    this._changeCache = {};
                    this._changeCount = 0;
                    if (old !== this._changeCount)
                        this.raisePropertyChanged('hasChanges');
                }
                //occurs when item changeType Changed (not used in simple collections)
                _onItemStatusChanged(item: TEntity, oldChangeType: number) {
                    super._onItemStatusChanged(item, oldChangeType);
                    if (item._isDeleted && this.isSubmitOnDelete) {
                        this.dbContext.submitChanges();
                    }
                }
                _onRemoved(item: TEntity, pos: number) {
                    this._removeFromChanged(item._key);
                    super._onRemoved(item, pos);
                }
                _onPageChanging() {
                    var res = super._onPageChanging();
                    if (!res) {
                        return res;
                    }
                    if (this.hasChanges) {
                        this.rejectChanges();
                    }
                    return res;
                }
                _onPageChanged() {
                    this.cancelEdit();
                    super._onPageChanged();
                    if (this._ignorePageChanged)
                        return;
                    this.query.pageIndex = this.pageIndex;
                    this.dbContext._load(this.query, true);
                }
                _onPageSizeChanged() {
                    super._onPageSizeChanged();
                    if (!!this._query)
                        this._query.pageSize = this.pageSize;
                }
                _destroyItems() {
                    this._items.forEach(function (item) {
                        if (item._isCached)
                            item.removeHandler(null, null);
                        else
                            item.destroy();
                    });
                }
                sort(fieldNames: string[], sortOrder: string) {
                    var ds = this, query = ds.query;
                    if (!!query) {
                        query.clearSort();
                        for (var i = 0; i < fieldNames.length; i += 1) {
                            if (i == 0)
                                query.orderBy(fieldNames[i], sortOrder);
                            else
                                query.thenBy(fieldNames[i], sortOrder);
                        }

                        query.isClearPrevData = true;
                        query.pageIndex = 0;
                        return ds.dbContext.load(query);
                    }
                    else {
                        return super.sort(fieldNames, sortOrder);
                    }
                }
                //manually fill data from result when page is first loaded
                //from data stored inside page (without ajax request)
                //convenient for loading classifiers (for lookup data)
                fillItems(data: {
                    names: string[];
                    rows: { key: string; values: string[]; }[];
                }) {
                    var res: IGetDataResult = utils.extend(false, {
                        names: [],
                        rows: [],
                        pageIndex: (!!this.query) ? this.query.pageIndex : null,
                        pageCount: null,
                        dbSetName: this.dbSetName,
                        totalCount: null,
                        rowCount: data.rows.length,
                        extraInfo: null,
                        error: null,
                        included: []
                    }, data);

                    var filldata = {
                        res: res,
                        isPageChanged: false,
                        fn_beforeFillEnd: null
                    };
                    this._fillFromService(filldata);
                }
                defineCalculatedField(fieldName: string, getFunc: () => any) {
                    var calcDef = this._calcfldMap[fieldName];
                    if (!calcDef) {
                        throw new Error(utils.format(ERRS.ERR_PARAM_INVALID, 'fieldName', fieldName));
                    }
                    calcDef.getFunc = getFunc;
                }
                acceptChanges() {
                    var csh = this._changeCache;
                    utils.forEachProp(csh, function (key) {
                        var item = csh[key];
                        item.acceptChanges(null);
                    });
                    this._changeCount = 0;
                }
                rejectChanges() {
                    var csh = this._changeCache;
                    utils.forEachProp(csh, function (key) {
                        var item = csh[key];
                        item.rejectChanges();
                    });
                }
                deleteOnSubmit(item: TEntity) {
                    item.deleteOnSubmit();
                }
                clear() {
                    this._clearChangeCache();
                    super.clear();
                }
                createQuery(name: string): TDataQuery<TEntity> {
                    var queryInfo = this.dbContext._getQueryInfo(name);
                    if (!queryInfo) {
                        throw new Error(utils.format(RIAPP.ERRS.ERR_QUERY_NAME_NOTFOUND, name));
                    }
                    return new TDataQuery<TEntity>(this, queryInfo);
                }
                clearCache() {
                    var query = this._query;
                    if (!!query) {
                        query._clearCache();
                    }
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    var query = this._query;
                    this._query = null;
                    if (!!query) {
                        query.destroy();
                    }
                    this._navfldMap = {};
                    this._calcfldMap = {};
                    super.destroy();
                }
                toString() {
                    return this._options.dbSetName;
                }
                get items() { return this._items; }
                get dbContext(): DbContext {
                    return this._dbContext;
                }
                get dbSetName() { return this._options.dbSetName; }
                get entityType() { return this._entityType; }
                get query() { return this._query; }
                get hasChanges():boolean { return this._changeCount > 0; }
                get cacheSize():number {
                    var query = this._query, dataCache: DataCache;
                    if (!!query && query.isCacheValid) {
                        dataCache = query._getCache();
                        return dataCache.cacheSize;
                    }
                    return 0;
                }
                get isSubmitOnDelete():boolean { return this._isSubmitOnDelete; }
                set isSubmitOnDelete(v:boolean) {
                    if (this._isSubmitOnDelete !== v) {
                        this._isSubmitOnDelete = !!v;
                        this.raisePropertyChanged('isSubmitOnDelete');
                    }
                }
            }

            //implements lazy initialization pattern for creating DbSet's instances
            export class DbSets extends RIAPP.BaseObject {
                _dbSetNames: string[];
                private _dbContext: DbContext;
                private _dbSets: { [name: string]: () => DbSet<Entity>; };
                private _arrDbSets: DbSet<Entity>[];

                constructor(dbContext: DbContext) {
                    super();
                    this._dbContext = dbContext;
                    this._arrDbSets = [];
                    this._dbSets = {};
                    this._dbSetNames = [];
                }
                _dbSetCreated(dbSet: DbSet<Entity>) {
                    var self = this;
                    this._arrDbSets.push(dbSet);
                    dbSet.addOnPropertyChange('hasChanges', function (sender, args) {
                        self._dbContext._onDbSetHasChangesChanged(sender);
                    }, null);
                }
                _createDbSet(name: string, dbSetType: IDbSetConstructor) {
                    var self = this, dbContext = this._dbContext;
                    self._dbSets[name] = function () {
                        var t = new dbSetType(dbContext);
                        var f = function () {
                            return t;
                        };
                        self._dbSets[name] = f;
                        self._dbSetCreated(t);
                        return f();
                    };
                }
                get dbSetNames() {
                    return this._dbSetNames;
                }
                get arrDbSets() {
                    return this._arrDbSets;
                }
                getDbSet(name: string) {
                    var f = this._dbSets[name];
                    if (!f)
                        throw new Error(utils.format(RIAPP.ERRS.ERR_DBSET_NAME_INVALID, name));
                    return f();
                }
                destroy() {
                    this._arrDbSets.forEach(function (dbSet) {
                        dbSet.destroy();
                    });
                    this._arrDbSets = [];
                    this._dbSets = null;
                    this._dbContext = null;
                    super.destroy();
                }
            }

            export class DbContext extends RIAPP.BaseObject {
                _isInitialized: boolean;
                _dbSets: DbSets;
                //_svcMethods: {[methodName: string]: (args: { [paramName: string]: any; }) => IPromise<any>; };
                _svcMethods: any;
                //_assoc: { [getname: string]: () => Association; };
                _assoc: any;
                _arrAssoc: Association[];
                _queryInf: { [queryName: string]: IQueryInfo; };
                _serviceUrl: string;
                _isBusy: number;
                _isSubmiting: boolean;
                _hasChanges: boolean;
                _pendingSubmit: { deferred: IDeferred<any>; };
                _serverTimezone: number;
                _waitQueue: MOD.utils.WaitQueue;

                constructor() {
                    super();
                    this._isInitialized = false;
                    this._dbSets = null;
                    this._svcMethods = {};
                    this._assoc = {};
                    this._arrAssoc = [];
                    this._queryInf = {};
                    this._serviceUrl = null;
                    this._isBusy = 0;
                    this._isSubmiting = false;
                    this._hasChanges = false;
                    this._pendingSubmit = null;
                    this._serverTimezone = utils.get_timeZoneOffset();
                    this._waitQueue = new MOD.utils.WaitQueue(this);
                }
                _getEventNames() {
                    var base_events = super._getEventNames();
                    return ['submit_error'].concat(base_events);
                }
                addOnSubmitError(fn: (sender: DbContext, args: { error: any; isHandled: boolean; }) => void, namespace?: string) {
                    this.addHandler('submit_error', fn, namespace);
                }
                removeOnSubmitError(namespace?: string) {
                    this.removeHandler('submit_error', namespace);
                }
                _onGetCalcField(args: { dbSetName: string; fieldName: string; getFunc: () => any; }) {
                    this.raiseEvent('define_calc', args);
                }
                _getQueryInfo(name: string): IQueryInfo {
                    return this._queryInf[name];
                }
                _initDbSets() {
                    if (this._isInitialized)
                        throw new Error(RIAPP.ERRS.ERR_DOMAIN_CONTEXT_INITIALIZED);
                }
                _initAssociations(associations: IAssociationInfo[]) {
                    var self = this;
                    associations.forEach(function (assoc) {
                        self._initAssociation(assoc);
                    });
                }
                _initMethods(methods: IQueryInfo[]) {
                    var self = this;
                    methods.forEach(function (info) {
                        if (info.isQuery)
                            self._queryInf[info.methodName] = info;
                        else {
                            //service method info
                            self._initMethod(info);
                        }
                    });
                }
                _updatePermissions(info: IPermissionsInfo) {
                    var self = this;
                    this._serverTimezone = info.serverTimezone;
                    info.permissions.forEach(function (perms) {
                        self.getDbSet(perms.dbSetName)._updatePermissions(perms);
                    });
                }
                _onDbSetHasChangesChanged(eSet: DbSet<Entity>) {
                    var old = this._hasChanges, test: DbSet<Entity>;
                    this._hasChanges = false;
                    if (eSet.hasChanges) {
                        this._hasChanges = true;
                    }
                    else {
                        for (var i = 0, len = this._dbSets.arrDbSets.length; i < len; i += 1) {
                            test = this._dbSets.arrDbSets[i];
                            if (test.hasChanges) {
                                this._hasChanges = true;
                                break;
                            }
                        }
                    }
                    if (this._hasChanges !== old) {
                        this.raisePropertyChanged('hasChanges');
                    }
                }
                _initAssociation(assoc: IAssociationInfo) {
                    var self = this, options: IAssocConstructorOptions = {
                        dbContext: self,
                        parentName: assoc.parentDbSetName,
                        childName: assoc.childDbSetName,
                        onDeleteAction: assoc.onDeleteAction,
                        parentKeyFields: assoc.fieldRels.map(function (f) {
                            return f.parentField;
                        }),
                        childKeyFields: assoc.fieldRels.map(function (f) {
                            return f.childField;
                        }),
                        parentToChildrenName: assoc.parentToChildrenName,
                        childToParentName: assoc.childToParentName,
                        name: assoc.name
                    };
                    var name = "get" + assoc.name;

                    //lazy initialization pattern
                    this._assoc[name] = function () {
                        var t = new Association(options);
                        self._arrAssoc.push(t);
                        var f = function () {
                            return t;
                        };
                        self._assoc[name] = f;
                        return f();
                    };

                }
                _initMethod(methodInfo: IQueryInfo) {
                    var self = this;
                    //function expects method parameters
                    this._svcMethods[methodInfo.methodName] = function (args: { [paramName: string]: any; }) {
                        var deferred = utils.createDeferred();
                        var callback = function (res: { result: any; error: any; }) {
                            if (!res.error) {
                                deferred.resolve(res.result);
                            }
                            else {
                                deferred.reject();
                            }
                        };

                        try {
                            var data = self._getMethodParams(methodInfo, args);
                            self._invokeMethod(methodInfo, data, callback);
                        } catch (ex) {
                            if (!global._checkIsDummy(ex)) {
                                self._onError(ex, self);
                                callback({ result: null, error: ex });
                            }
                        }

                        return deferred.promise();
                    };
                }
                _getMethodParams(methodInfo: IQueryInfo, args: { [paramName: string]: any; }): IMethodInvokeInfo {
                    var self = this, methodName: string = methodInfo.methodName,
                        data: IMethodInvokeInfo = { methodName: methodName, paramInfo: { parameters: [] } };
                    var i, parameterInfos = methodInfo.parameters, len = parameterInfos.length, pinfo: IQueryParamInfo, val, value;
                    if (!args)
                        args = {};
                    for (i = 0; i < len; i += 1) {
                        pinfo = parameterInfos[i];
                        val = args[pinfo.name];
                        if (!pinfo.isNullable && !pinfo.isArray && !(pinfo.dataType == consts.DATA_TYPE.String || pinfo.dataType == consts.DATA_TYPE.Binary) && utils.check.isNt(val)) {
                            throw new Error(utils.format(RIAPP.ERRS.ERR_SVC_METH_PARAM_INVALID, pinfo.name, val, methodInfo.methodName));
                        }
                        if (utils.check.isFunction(val)) {
                            throw new Error(utils.format(RIAPP.ERRS.ERR_SVC_METH_PARAM_INVALID, pinfo.name, val, methodInfo.methodName));
                        }
                        if (pinfo.isArray && !utils.check.isNt(val) && !utils.check.isArray(val)) {
                            val = [val];
                        }
                        value = null;
                        //byte arrays are optimized for serialization
                        if (pinfo.dataType == consts.DATA_TYPE.Binary && utils.check.isArray(val)) {
                            value = JSON.stringify(val);
                        }
                        else if (utils.check.isArray(val)) {
                            var arr = new Array(val.length);
                            for (var k = 0; k < val.length; k += 1) {
                                //first convert all values to string
                                arr[k] = valueUtils.stringifyValue(val[k], pinfo.dateConversion, self._serverTimezone);
                            }
                            value = JSON.stringify(arr);
                        }
                        else
                            value = valueUtils.stringifyValue(val, pinfo.dateConversion, self._serverTimezone);

                        data.paramInfo.parameters.push({ name: pinfo.name, value: value });
                    }

                    return data;
                }
                _invokeMethod(methodInfo: IQueryInfo, data: IMethodInvokeInfo, callback: (res: { result: any; error: any; }) => void) {
                    var self = this, operType = DATA_OPER.INVOKE, postData: string, invokeUrl: string;
                    this.isBusy = true;
                    var fn_onComplete = function (res: { result: any; error: { name: string; message: string; }; }) {
                        try {
                            if (!res)
                                throw new Error(utils.format(RIAPP.ERRS.ERR_UNEXPECTED_SVC_ERROR, 'operation result is undefined'));
                            __checkError(res.error, operType);
                            callback({ result: res.result, error: null });
                        } catch (ex) {
                            if (global._checkIsDummy(ex)) {
                                return;
                            }
                            self._onDataOperError(ex, operType);
                            callback({ result: null, error: ex });
                        }
                    };

                    try {
                        postData = JSON.stringify(data);
                        invokeUrl = this._getUrl(DATA_SVC_METH.Invoke);
                        utils.performAjaxCall(
                            invokeUrl,
                            postData,
                            true,
                            function (res) { //success
                                fn_onComplete(JSON.parse(res));
                                self.isBusy = false;
                            },
                            function (er) { //error
                                fn_onComplete({ result: null, error: er });
                                self.isBusy = false;
                            }, null);
                    }
                    catch (ex) {
                        if (global._checkIsDummy(ex)) {
                            global._throwDummy(ex);
                        }
                        this.isBusy = false;
                        this._onDataOperError(ex, operType);
                        callback({ result: null, error: ex });
                        global._throwDummy(ex);
                    }
                }
                _loadFromCache(query: TDataQuery<Entity>, isPageChanged: boolean): ILoadResult<Entity> {
                    var operType = DATA_OPER.LOAD, dbSet = query._dbSet, methRes: ILoadResult<Entity>;
                    try {
                        methRes = dbSet._fillFromCache({ isPageChanged: isPageChanged, fn_beforeFillEnd: null });
                    } catch (ex) {
                        if (global._checkIsDummy(ex)) {
                            global._throwDummy(ex);
                        }
                        this._onDataOperError(ex, operType);
                        global._throwDummy(ex);
                    }
                    return methRes;
                }
                _loadIncluded(res: IGetDataResult) {
                    var self = this, hasIncluded = !!res.included && res.included.length > 0;
                    if (!hasIncluded)
                        return;
                    res.included.forEach(function (subset) {
                        var dbSet = self.getDbSet(subset.dbSetName);
                        dbSet.fillItems(subset);
                    });
                }
                _onLoaded(res: IGetDataResult, isPageChanged: boolean): ILoadResult<Entity> {
                    var self = this, operType = DATA_OPER.LOAD, dbSetName, dbSet: DbSet<Entity>, loadRes: ILoadResult<Entity>;
                    try {
                        if (!res)
                            throw new Error(utils.format(RIAPP.ERRS.ERR_UNEXPECTED_SVC_ERROR, 'null result'));
                        dbSetName = res.dbSetName;
                        dbSet = self.getDbSet(dbSetName);
                        if (!dbSet)
                            throw new Error(utils.format(RIAPP.ERRS.ERR_DBSET_NAME_INVALID, dbSetName));
                        __checkError(res.error, operType);
                        loadRes = dbSet._fillFromService(
                            {
                                res: res,
                                isPageChanged: isPageChanged,
                                fn_beforeFillEnd: function () {
                                    self._loadIncluded(res);
                                }
                            });
                    } catch (ex) {
                        if (global._checkIsDummy(ex)) {
                            global._throwDummy(ex);
                        }
                        this._onDataOperError(ex, operType);
                        global._throwDummy(ex);
                    }
                    return loadRes;
                }
                _dataSaved(res: IChangeSet) {
                    var self = this, submitted: Entity[] = [], notvalid: Entity[] = [];
                    try {
                        try {
                            __checkError(res.error, DATA_OPER.SUBMIT);
                        }
                        catch (ex) {
                            res.dbSets.forEach(function (jsDB) {
                                var eSet = self._dbSets.getDbSet(jsDB.dbSetName);
                                jsDB.rows.forEach(function (row) {
                                    var item = eSet.getItemByKey(row.clientKey);
                                    if (!item) {
                                        throw new Error(utils.format(RIAPP.ERRS.ERR_KEY_IS_NOTFOUND, row.clientKey));
                                    }
                                    submitted.push(item);
                                    if (!!row.invalid) {
                                        eSet._setItemInvalid(row);
                                        notvalid.push(item);
                                    }
                                });
                            });
                            throw new SubmitError(ex, submitted, notvalid);
                        }

                        res.dbSets.forEach(function (jsDB) {
                            self._dbSets.getDbSet(jsDB.dbSetName)._commitChanges(jsDB.rows);
                        });
                    }
                    catch (ex) {
                        if (global._checkIsDummy(ex)) {
                            global._throwDummy(ex);
                        }
                        this._onSubmitError(ex);
                        global._throwDummy(ex);
                    }
                }
                _getChanges(): IChangeSet {
                    var changeSet: IChangeSet = { dbSets: [], error: null, trackAssocs: [] };
                    this._dbSets.arrDbSets.forEach(function (eSet) {
                        eSet.endEdit();
                        var changes: IRowInfo[] = eSet._getChanges();
                        if (changes.length === 0)
                            return;
                        //it needs to apply updates in parent-child relationship order on the server
                        //and provides child to parent map of the keys for the new entities
                        var trackAssoc: ITrackAssoc[] = eSet._getTrackAssocInfo();
                        var jsDB = { dbSetName: eSet.dbSetName, rows: changes };
                        changeSet.dbSets.push(jsDB);
                        changeSet.trackAssocs = changeSet.trackAssocs.concat(trackAssoc);
                    });
                    return changeSet;
                }
                _getUrl(action):string {
                    var loadUrl = this.service_url;
                    if (!utils.str.endsWith(loadUrl, '/'))
                        loadUrl = loadUrl + '/';
                    loadUrl = loadUrl + [action, ''].join('/');
                    return loadUrl;
                }
                _onItemRefreshed(res: IRefreshRowInfo, item: Entity) {
                    var operType = DATA_OPER.REFRESH;
                    try {
                        __checkError(res.error, operType);
                        if (!res.rowInfo) {
                            item._dbSet.removeItem(item);
                            item.destroy();
                            throw new Error(RIAPP.ERRS.ERR_ITEM_DELETED_BY_ANOTHER_USER);
                        }
                        else
                            item._refreshValues(res.rowInfo, REFRESH_MODE.MergeIntoCurrent);
                    }
                    catch (ex) {
                        if (global._checkIsDummy(ex)) {
                            global._throwDummy(ex);
                        }
                        this._onDataOperError(ex, operType);
                        global._throwDummy(ex);
                    }
                }
                _refreshItem(item: Entity): IPromise<Entity> {
                    var deferred: IDeferred<any> = utils.createDeferred(), callback = function (isOk) {
                        if (isOk) {
                            deferred.resolve(item);
                        }
                        else {
                            deferred.reject();
                        }
                    };
                    var url = this._getUrl(DATA_SVC_METH.Refresh), dbSet = item._dbSet;
                    var self = this;
                    this.waitForNotSubmiting(function () {
                        dbSet.waitForNotLoading(function () {
                            var args, postData, operType = DATA_OPER.REFRESH;
                            var fn_onEnd = function () {
                                self.isBusy = false;
                                dbSet.isLoading = false;
                                item._isRefreshing = false;
                            },
                                fn_onErr = function (ex) {
                                    fn_onEnd();
                                    self._onDataOperError(ex, operType);
                                },
                                fn_onOK = function (res: IRefreshRowInfo) {
                                    self._onItemRefreshed(res, item);
                                    fn_onEnd();
                                };

                            item._isRefreshing = true;
                            self.isBusy = true;
                            dbSet.isLoading = true;
                            try {
                                var request: IRefreshRowInfo = { dbSetName: item._dbSetName, rowInfo: item._getRowInfo(), error: null };
                                item._checkCanRefresh();
                                postData = JSON.stringify(request);
                                utils.performAjaxCall(
                                    url,
                                    postData,
                                    true,
                                    function (res) { //success
                                        try {
                                            fn_onOK(JSON.parse(res));
                                            callback(true);
                                        }
                                        catch (ex) {
                                            fn_onErr(ex);
                                            callback(false);
                                        }
                                    },
                                    function (er) { //error
                                        fn_onEnd();
                                        self._onDataOperError(er, operType);
                                        callback(false);
                                    }, null);
                            }
                            catch (ex) {
                                fn_onErr(ex);
                                callback(false);
                            }
                        }, [], true, null);
                    }, [], null);
                    return deferred.promise();
                }
                _onError(error, source): boolean {
                    var isHandled = super._onError(error, source);
                    if (!isHandled) {
                        return global._onError(error, source);
                    }
                    return isHandled;
                }
                _onDataOperError(ex, oper): boolean {
                    if (global._checkIsDummy(ex))
                        return true;
                    var er;
                    if (ex instanceof DataOperationError)
                        er = ex;
                    else
                        er = new DataOperationError(ex, oper);
                    return this._onError(er, this);
                }
                _onSubmitError(error) {
                    var args = { error: error, isHandled: false };
                    this.raiseEvent('submit_error', args);
                    if (!args.isHandled) {
                        this.rejectChanges();
                        this._onDataOperError(error, DATA_OPER.SUBMIT);
                    }
                }
                _beforeLoad(query: TDataQuery<Entity>, oldQuery: TDataQuery<Entity>, dbSet: DbSet<Entity>) {
                    if (query && oldQuery !== query) {
                        dbSet._query = query;
                        dbSet.pageIndex = 0;
                    }
                    if (!!oldQuery && oldQuery !== query) {
                        oldQuery.destroy();
                    }

                    if (query.pageSize !== dbSet.pageSize) {
                        dbSet._ignorePageChanged = true;
                        try {
                            dbSet.pageIndex = 0;
                            dbSet.pageSize = query.pageSize;
                        } finally {
                            dbSet._ignorePageChanged = false;
                        }
                    }

                    if (query.pageIndex !== dbSet.pageIndex) {
                        dbSet._ignorePageChanged = true;
                        try {
                            dbSet.pageIndex = query.pageIndex;
                        }
                        finally {
                            dbSet._ignorePageChanged = false;
                        }
                    }

                    if (!query.isCacheValid) {
                        query._clearCache();
                    }
                }
                _load(query: TDataQuery<Entity>, isPageChanged: boolean): IPromise<ILoadResult<Entity>> {
                    if (!query) {
                        throw new Error(RIAPP.ERRS.ERR_DB_LOAD_NO_QUERY);
                    }
                    var self = this, deferred: IDeferred<any> = utils.createDeferred();
                    var fn_onComplete = function (isOk: boolean, res: ILoadResult<Entity>) {
                        if (isOk) {
                            deferred.resolve(res);
                        }
                        else {
                            deferred.reject();
                        }
                    };

                    var loadPageCount = query.loadPageCount, pageIndex = query.pageIndex, isPagingEnabled = query.isPagingEnabled,
                        dbSetName = query.dbSetName, dbSet = this.getDbSet(dbSetName);

                    //this wait is asynchronous
                    this.waitForNotSubmiting(function () {
                        dbSet.waitForNotLoading(function () {
                            var oldQuery = dbSet.query;
                            var loadUrl = self._getUrl(DATA_SVC_METH.LoadData), requestInfo: IGetDataInfo, postData: string,
                                operType = DATA_OPER.LOAD,
                                fn_onEnd = function () {
                                    dbSet.isLoading = false;
                                    self.isBusy = false;
                                },
                                fn_onOK = function (res) {
                                    fn_onEnd();
                                    fn_onComplete(true, res);
                                },
                                fn_onErr = function (ex) {
                                    fn_onEnd();
                                    self._onDataOperError(ex, operType);
                                    fn_onComplete(false, null);
                                },
                                fn_onErr2 = function (ex) {
                                    fn_onEnd();
                                    self._onDataOperError(ex, operType);
                                    fn_onComplete(false, null);
                                }, loadRes: ILoadResult<Entity>, range: { start: number; end: number; cnt: number; }, pageCount = 1;

                            dbSet.isLoading = true;
                            self.isBusy = true;
                            try {
                                //restore pageIndex
                                query.pageIndex = pageIndex;
                                self._beforeLoad(query, oldQuery, dbSet);

                                if (loadPageCount > 1 && isPagingEnabled) {
                                    if (query._isPageCached(pageIndex)) {
                                        loadRes = self._loadFromCache(query, isPageChanged);
                                        fn_onOK(loadRes);
                                        return;
                                    }
                                    else {
                                        range = query._getCache().getNextRange(pageIndex);
                                        pageIndex = range.start;
                                        pageCount = range.cnt;
                                    }
                                }


                                requestInfo = {
                                    dbSetName: dbSetName,
                                    pageIndex: pageIndex,
                                    pageSize: query.pageSize,
                                    pageCount: pageCount,
                                    isIncludeTotalCount: query.isIncludeTotalCount,
                                    filterInfo: query.filterInfo,
                                    sortInfo: query.sortInfo,
                                    paramInfo: self._getMethodParams(query._queryInfo, query.params).paramInfo,
                                    queryName: query.queryName
                                };

                                postData = JSON.stringify(requestInfo);
                                utils.performAjaxCall(
                                    loadUrl,
                                    postData,
                                    true,
                                    function (res: string) { //success
                                        var data = [], idx;
                                        try {
                                            idx = res.indexOf(MOD.consts.CHUNK_SEP);
                                            if (idx > -1) { //rows were serialized separately
                                                //the first item is getDataResult
                                                data.push(res.substr(0, idx));
                                                //the rest is rows
                                                data.push(res.substr(idx + MOD.consts.CHUNK_SEP.length));
                                            }
                                            else {
                                                //all response is serialized as getDataResult
                                                data.push(res);
                                            }
                                            data = data.map(function (txt) {
                                                return JSON.parse(txt);
                                            });

                                            //let the UI some time, then do the rest of the work
                                            setTimeout(function () {
                                                //first item is GetDataResult
                                                var allRows: { key: string; values: string[]; }[], getDataResult: IGetDataResult = data[0];
                                                var hasIncluded = !!getDataResult.included && getDataResult.included.length > 0;
                                                try {
                                                    //rows was loaded separately from GetDataResult
                                                    if (data.length > 1) {
                                                        allRows = data[1];
                                                        if (allRows && allRows.length > 0) {
                                                            if (hasIncluded) {
                                                                getDataResult.included.forEach(function (subset) {
                                                                    subset.rows = allRows.splice(0, subset.rowCount);
                                                                    if (subset.rowCount != subset.rows.length) {
                                                                        throw new Error(utils.format(RIAPP.ERRS.ERR_ASSERTION_FAILED, 'subset.rowCount == subset.rows.length'));
                                                                    }
                                                                });
                                                            }
                                                            getDataResult.rows = allRows;
                                                            if (getDataResult.rowCount != getDataResult.rows.length) {
                                                                throw new Error(utils.format(RIAPP.ERRS.ERR_ASSERTION_FAILED, 'getDataResult.rowCount == getDataResult.rows.length'));
                                                            }
                                                        }
                                                    }
                                                    loadRes = self._onLoaded(getDataResult, isPageChanged);
                                                    fn_onOK(loadRes);
                                                }
                                                catch (ex) {
                                                    fn_onErr(ex);
                                                }
                                            }, 0);
                                        }
                                        catch (ex) {
                                            fn_onErr(ex);
                                        }
                                    },
                                    function (er) { //error
                                        fn_onErr2(er);
                                    }, null);
                            }
                            catch (ex) {
                                fn_onErr(ex);
                            }
                        }, [], true, isPageChanged ? 'paging' : null);

                    }, [], isPageChanged ? 'paging' : null);

                    return <any>deferred.promise();
                }
                getDbSet(name: string) {
                    return this._dbSets.getDbSet(name);
                }
                getAssociation(name: string) {
                    var name2 = "get" + name;
                    var f = this._assoc[name2];
                    if (!f)
                        throw new Error(utils.format(RIAPP.ERRS.ERR_ASSOC_NAME_INVALID, name));
                    return f();
                }
                //returns promise
                submitChanges(): IVoidPromise {
                    //dont submit when the submit already in the queue
                    if (!!this._pendingSubmit) {
                        //return promise for the already enqueued submit
                        return this._pendingSubmit.deferred.promise();
                    }

                    var self = this, submitState: { deferred: IDeferred<any>; } = { deferred: utils.createDeferred() };
                    var callback = function (isOk) {
                        if (isOk) {
                            submitState.deferred.resolve();
                        }
                        else {
                            submitState.deferred.reject();
                        }
                    };

                    this._pendingSubmit = submitState;

                    //this wait is asynchronous
                    this.waitForNotBusy(function () {
                        var url, postData, operType = DATA_OPER.SUBMIT, changeSet: IChangeSet;
                        var fn_onEnd = function () {
                            self.isBusy = false;
                            self.isSubmiting = false;
                        },
                            fn_onErr = function (ex) {
                                fn_onEnd();
                                self._onDataOperError(ex, operType);
                                callback(false);
                            };

                        try {
                            self.isBusy = true;
                            self.isSubmiting = true;
                            self._pendingSubmit = null; //allow to post new submit
                            url = self._getUrl(DATA_SVC_METH.Submit);
                            changeSet = self._getChanges();

                            if (changeSet.dbSets.length === 0) {
                                fn_onEnd();
                                callback(true);
                                return;
                            }
                        }
                        catch (ex) {
                            fn_onErr(ex);
                            return;
                        }

                        try {
                            postData = JSON.stringify(changeSet);
                            utils.performAjaxCall(
                                url,
                                postData,
                                true,
                                function (res: string) { //success
                                    try {
                                        self._dataSaved(JSON.parse(res));
                                        fn_onEnd();
                                        callback(true);
                                    }
                                    catch (ex) {
                                        fn_onErr(ex);
                                    }
                                },
                                function (er) { //submit error
                                    fn_onEnd();
                                    self._onSubmitError(er);
                                    callback(false);
                                }, null);
                        }
                        catch (ex) {
                            fn_onErr(ex);
                        }
                    }, []);
                    return submitState.deferred.promise();
                }
                //returns promise
                load(query: TDataQuery<Entity>): IPromise<ILoadResult<Entity>> {
                    return this._load(query, false);
                }
                acceptChanges() {
                    this._dbSets.arrDbSets.forEach(function (eSet) {
                        eSet.acceptChanges();
                    });
                }
                rejectChanges() {
                    this._dbSets.arrDbSets.forEach(function (eSet) {
                        eSet.rejectChanges();
                    });
                }
                initialize(options: { serviceUrl: string; permissions?: IPermissionsInfo; }) {
                    if (this._isInitialized)
                        return;
                    var self = this, opts: {
                        serviceUrl: string;
                        permissions: IPermissionsInfo;
                    } = utils.extend(false, {
                            serviceUrl: null,
                            permissions: null
                        }, options), loadUrl, operType;

                    try {
                        if (!utils.check.isString(opts.serviceUrl)) {
                            throw new Error(utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, "serviceUrl", opts.serviceUrl));
                        }
                        this._serviceUrl = opts.serviceUrl;
                        this._initDbSets();

                        if (!!opts.permissions) {
                            self._updatePermissions(opts.permissions);
                            self._isInitialized = true;
                            self.raisePropertyChanged('isInitialized');
                            return;
                        }

                        //initialize by obtaining metadata from the data service by ajax call
                        loadUrl = this._getUrl(DATA_SVC_METH.GetPermissions), operType = DATA_OPER.INIT;
                    }
                    catch (ex) {
                        this._onError(ex, this);
                        global._throwDummy(ex);
                    }

                    try {
                        this.isBusy = true;
                        utils.performAjaxCall(
                            loadUrl,
                            undefined,
                            true,
                            function (permissions: string) { //success
                                try {
                                    self._updatePermissions(JSON.parse(permissions));
                                    self.isBusy = false;
                                    self._isInitialized = true;
                                    self.raisePropertyChanged('isInitialized');
                                }
                                catch (ex) {
                                    self.isBusy = false;
                                    self._onDataOperError(ex, operType);
                                    global._throwDummy(ex);
                                }
                            },
                            function (er) { //error
                                self.isBusy = false;
                                self._onDataOperError(er, operType);
                            }, null);
                    }
                    catch (ex) {
                        this.isBusy = false;
                        this._onDataOperError(ex, operType);
                        global._throwDummy(ex);
                    }
                }
                waitForNotBusy(callback, callbackArgs) {
                    this._waitQueue.enQueue({
                        prop: 'isBusy',
                        groupName: null,
                        predicate: function (val) {
                            return !val;
                        },
                        action: callback,
                        actionArgs: callbackArgs
                    });
                }
                waitForNotSubmiting(callback, callbackArgs, groupName) {
                    this._waitQueue.enQueue({
                        prop: 'isSubmiting',
                        predicate: function (val) {
                            return !val;
                        },
                        action: callback,
                        actionArgs: callbackArgs,
                        groupName: groupName,
                        lastWins: !!groupName
                    });
                }
                waitForInitialized(callback, callbackArgs) {
                    this._waitQueue.enQueue({
                        prop: 'isInitialized',
                        groupName: 'dbContext',
                        predicate: function (val) {
                            return !!val;
                        },
                        action: callback,
                        actionArgs: callbackArgs
                    });
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._waitQueue.destroy();
                    this._waitQueue = null;
                    this._arrAssoc.forEach(function (assoc) {
                        assoc.destroy();
                    });
                    this._arrAssoc = [];
                    this._assoc = {};
                    this._dbSets.destroy();
                    this._dbSets = null;
                    this._svcMethods = {};
                    this._queryInf = {};
                    this._serviceUrl = null;
                    this._isInitialized = false;
                    this._isBusy = 0;
                    this._isSubmiting = false;
                    this._hasChanges = false;
                    super.destroy();
                }
                get service_url() { return this._serviceUrl; }
                get isInitialized() { return this._isInitialized; }
                get isBusy() { return this._isBusy > 0; }
                set isBusy(v: boolean) {
                    var old = this._isBusy > 0, cur;
                    if (!v) {
                        this._isBusy -= 1;
                        if (this._isBusy < 0)
                            this._isBusy = 0;
                    }
                    else {
                        this._isBusy += 1;
                    }
                    cur = this._isBusy > 0;
                    if (cur != old) {
                        this.raisePropertyChanged('isBusy');
                    }
                }
                get isSubmiting() { return this._isSubmiting; }
                set isSubmiting(v) {
                    if (this._isSubmiting !== v) {
                        this._isSubmiting = v;
                        this.raisePropertyChanged('isSubmiting');
                    }
                }
                get serverTimezone() { return this._serverTimezone; }
                get dbSets() { return this._dbSets; }
                get serviceMethods() { return this._svcMethods; }
                get hasChanges() { return this._hasChanges; }
            }

            export class Association extends RIAPP.BaseObject {
                _objId: string;
                _name: string;
                _dbContext: DbContext;
                _onDeleteAction: DELETE_ACTION;
                _parentDS: DbSet<Entity>;
                _childDS: DbSet<Entity>;
                _parentFldInfos: collection.IFieldInfo[];
                _childFldInfos: collection.IFieldInfo[];
                _parentToChildrenName: string;
                _childToParentName: string;
                _parentMap: { [key: string]: Entity; };
                _childMap: { [key: string]: Entity[]; };
                _isParentFilling: boolean;
                _isChildFilling: boolean;
                _saveParentFKey: string;
                _saveChildFKey: string;
                _changedTimeout: number;
                _changed: { [key: string]: number; };

                constructor(options: IAssocConstructorOptions) {
                    super();
                    var self = this;
                    this._objId = 'ass' + utils.getNewID();
                    var opts: IAssocConstructorOptions = utils.extend(false, {
                        dbContext: null,
                        parentName: '',
                        childName: '',
                        parentKeyFields: [],
                        childKeyFields: [],
                        parentToChildrenName: null,
                        childToParentName: null,
                        name: this._objId,
                        onDeleteAction: DELETE_ACTION.NoAction
                    }, options);

                    this._name = opts.name;
                    this._dbContext = opts.dbContext;
                    this._onDeleteAction = opts.onDeleteAction;
                    this._parentDS = opts.dbContext.getDbSet(opts.parentName);
                    this._childDS = opts.dbContext.getDbSet(opts.childName);
                    this._parentFldInfos = opts.parentKeyFields.map(function (name) {
                        return self._parentDS.getFieldInfo(name);
                    });
                    this._childFldInfos = opts.childKeyFields.map(function (name) {
                        return self._childDS.getFieldInfo(name);
                    });
                    this._parentToChildrenName = opts.parentToChildrenName;
                    this._childToParentName = opts.childToParentName;
                    this._parentMap = {};
                    this._childMap = {};
                    this._isParentFilling = false;
                    this._isChildFilling = false;
                    this._bindParentDS();
                    var changed1 = this._mapParentItems(this._parentDS.items);
                    this._bindChildDS();
                    var changed2 = this._mapChildren(this._childDS.items);
                    this._saveParentFKey = null;
                    this._saveChildFKey = null;
                    this._changedTimeout = null;
                    this._changed = {};
                    self._notifyParentChanged(changed1);
                    self._notifyChildrenChanged(changed2);
                }
                _onError(error, source): boolean {
                    var isHandled = super._onError(error, source);
                    if (!isHandled) {
                        return global._onError(error, source);
                    }
                    return isHandled;
                }
                _bindParentDS() {
                    var self = this, ds = this._parentDS;
                    if (!ds) return;
                    ds._addHandler('coll_changed', function (sender, args) {
                        if (ds !== sender) return;
                        self._onParentCollChanged(args);
                    }, self._objId, true);
                    ds._addHandler('fill', function (sender, args) {
                        if (ds !== sender) return;
                        self._onParentFill(args);
                    }, self._objId, true);
                    ds._addHandler('begin_edit', function (sender, args) {
                        if (ds !== sender) return;
                        self._onParentEdit(args.item, true, undefined);
                    }, self._objId, true);
                    ds._addHandler('end_edit', function (sender, args) {
                        if (ds !== sender) return;
                        self._onParentEdit(args.item, false, args.isCanceled);
                    }, self._objId, true);
                    ds._addHandler('item_deleting', function (sender, args) {
                    }, self._objId, true);
                    ds._addHandler('status_changed', function (sender, args) {
                        if (ds !== sender) return;
                        self._onParentStatusChanged(args.item, args.oldChangeType);
                    }, self._objId, true);
                    ds._addHandler('commit_changes', function (sender, args) {
                        if (ds !== sender) return;
                        self._onParentCommitChanges(args.item, args.isBegin, args.isRejected, args.changeType);
                    }, self._objId, true);
                }
                _bindChildDS() {
                    var self = this, ds = this._childDS;
                    if (!ds) return;
                    ds._addHandler('coll_changed', function (sender, args) {
                        if (ds !== sender) return;
                        self._onChildCollChanged(args);
                    }, self._objId, true);
                    ds._addHandler('fill', function (sender, args) {
                        if (ds !== sender) return;
                        self._onChildFill(args);
                    }, self._objId, true);
                    ds._addHandler('begin_edit', function (sender, args) {
                        if (ds !== sender) return;
                        self._onChildEdit(args.item, true, undefined);
                    }, self._objId, true);
                    ds._addHandler('end_edit', function (sender, args) {
                        if (ds !== sender) return;
                        self._onChildEdit(args.item, false, args.isCanceled);
                    }, self._objId, true);
                    ds._addHandler('status_changed', function (sender, args) {
                        if (ds !== sender) return;
                        self._onChildStatusChanged(args.item, args.oldChangeType);
                    }, self._objId, true);
                    ds._addHandler('commit_changes', function (sender, args) {
                        if (ds !== sender) return;
                        self._onChildCommitChanges(args.item, args.isBegin, args.isRejected, args.changeType);
                    }, self._objId, true);
                }
                _onParentCollChanged(args: collection.ICollChangedArgs<Entity>) {
                    var self = this, CH_T = collection.COLL_CHANGE_TYPE, item: Entity, items = <Entity[]>args.items, changed: string[] = [], changedKeys = {};
                    switch (args.change_type) {
                        case CH_T.RESET:
                            if (!self._isParentFilling)
                                changed = self.refreshParentMap();
                            break;
                        case CH_T.ADDED:
                            if (!this._isParentFilling) //if items are filling then it will be appended when fill ends
                                changed = self._mapParentItems(items);
                            break;
                        case CH_T.REMOVE:
                            items.forEach(function (item) {
                                var key = self._unMapParentItem(item);
                                if (!!key) {
                                    changedKeys[key] = null;
                                }
                            });
                            changed = Object.keys(changedKeys);
                            break;
                        case CH_T.REMAP_KEY:
                            {
                                if (!!args.old_key) {
                                    item = this._parentMap[args.old_key];
                                    if (!!item) {
                                        delete this._parentMap[args.old_key];
                                        changed = this._mapParentItems([item]);
                                    }
                                }
                            }
                            break;
                        default:
                            throw new Error(utils.format(RIAPP.ERRS.ERR_COLLECTION_CHANGETYPE_INVALID, args.change_type));
                    }
                    self._notifyParentChanged(changed);
                }
                _onParentFill(args: collection.ICollFillArgs<Entity>) {
                    var isEnd = !args.isBegin, self = this, changed;
                    if (isEnd) {
                        self._isParentFilling = false;
                        if (args.resetUI) {
                            changed = self.refreshParentMap();
                        }
                        else
                            changed = self._mapParentItems(<Entity[]>args.newItems);
                        self._notifyParentChanged(changed);
                    }
                    else {
                        self._isParentFilling = true;
                    }
                }
                _onParentEdit(item: Entity, isBegin: boolean, isCanceled: boolean) {
                    var self = this;
                    if (isBegin) {
                        self._storeParentFKey(item);
                    }
                    else {
                        if (!isCanceled)
                            self._checkParentFKey(item);
                        else
                            self._saveParentFKey = null;
                    }
                }
                _onParentCommitChanges(item: Entity, isBegin: boolean, isRejected: boolean, changeType: collection.STATUS) {
                    var self = this, fkey;
                    if (isBegin) {
                        if (isRejected && changeType === collection.STATUS.ADDED) {
                            fkey = this._unMapParentItem(item);
                            if (!!fkey)
                                self._notifyParentChanged([fkey]);
                            return;
                        }
                        else if (!isRejected && changeType === collection.STATUS.DELETED) {
                            fkey = this._unMapParentItem(item);
                            if (!!fkey)
                                self._notifyParentChanged([fkey]);
                            return;
                        }

                        self._storeParentFKey(item);
                    }
                    else {
                        self._checkParentFKey(item);
                    }
                }
                _storeParentFKey(item: Entity) {
                    var self = this, fkey = self.getParentFKey(item);
                    if (fkey !== null && !!self._parentMap[fkey]) {
                        self._saveParentFKey = fkey;
                    }
                }
                _checkParentFKey(item: Entity) {
                    var self = this, fkey: string, savedKey = self._saveParentFKey;
                    self._saveParentFKey = null;
                    fkey = self.getParentFKey(item);
                    if (fkey !== savedKey) {
                        if (!!savedKey) {
                            delete self._parentMap[savedKey];
                            self._notifyChildrenChanged([savedKey]);
                            self._notifyParentChanged([savedKey]);
                        }

                        if (!!fkey) {
                            self._mapParentItems([item]);
                            self._notifyChildrenChanged([fkey]);
                            self._notifyParentChanged([fkey]);
                        }
                    }
                }
                _onParentStatusChanged(item: Entity, oldChangeType: collection.STATUS) {
                    var self = this, DEL_STATUS = collection.STATUS.DELETED, newChangeType = item._changeType, fkey:string;
                    var children, DELETE_ACTION;
                    if (newChangeType === DEL_STATUS) {
                        children = self.getChildItems(item);
                        fkey = this._unMapParentItem(item);
                        switch (self.onDeleteAction) {
                            case DELETE_ACTION.NoAction:
                                //nothing
                                break;
                            case DELETE_ACTION.Cascade:
                                children.forEach(function (child) {
                                    child.deleteItem();
                                });
                                break;
                            case DELETE_ACTION.SetNulls:
                                children.forEach(function (child) {
                                    var isEdit = child.isEditing;
                                    if (!isEdit)
                                        child.beginEdit();
                                    try {
                                        self._childFldInfos.forEach(function (f) {
                                            child[f.fieldName] = null;
                                        });
                                        if (!isEdit)
                                            child.endEdit();
                                    }
                                    finally {
                                        if (!isEdit)
                                            child.cancelEdit();
                                    }
                                });
                                break;
                        }
                        if (!!fkey) {
                            self._notifyParentChanged([fkey]);
                        }
                    }
                }
                _onChildCollChanged(args: MOD.collection.ICollChangedArgs<Entity>) {
                    var self = this, CH_T = collection.COLL_CHANGE_TYPE, item: Entity, items = args.items, changed: string[] = [], changedKeys = {};
                    switch (args.change_type) {
                        case CH_T.RESET:
                            if (!self._isChildFilling)
                                changed = self.refreshChildMap();
                            break;
                        case CH_T.ADDED:
                            if (!this._isChildFilling) //if items are filling then it will be appended when fill ends
                                changed = self._mapChildren(items);
                            break;
                        case CH_T.REMOVE:
                            items.forEach(function (item) {
                                var key = self._unMapChildItem(item);
                                if (!!key) {
                                    changedKeys[key] = null;
                                }
                            });
                            changed = Object.keys(changedKeys);
                            break;
                        case CH_T.REMAP_KEY:
                            {
                                if (!!args.old_key) {
                                    item = items[0];
                                    if (!!item) {
                                        var parentKey = item._getFieldVal(this._childToParentName);
                                        if (!!parentKey) {
                                            delete this._childMap[parentKey];
                                            item._clearFieldVal(this._childToParentName);
                                        }
                                        changed = this._mapChildren([item]);
                                    }
                                }
                            }
                            break;
                        default:
                            throw new Error(utils.format(RIAPP.ERRS.ERR_COLLECTION_CHANGETYPE_INVALID, args.change_type));
                    }
                    self._notifyChildrenChanged(changed);
                }
                _notifyChildrenChanged(changed: string[]) {
                    this._notifyChanged([], changed);
                }
                _notifyParentChanged(changed: string[]) {
                    this._notifyChanged(changed, []);
                }
                _notifyChanged(changed_pkeys: string[], changed_ckeys: string[]) {
                    var self = this;
                    if (changed_pkeys.length > 0 || changed_ckeys.length > 0) {
                        changed_pkeys.forEach(function (key) {
                            var res = self._changed[key];
                            if (!res)
                                res = 1;
                            else
                                res = res | 1;
                            self._changed[key] = res;
                        });
                        changed_ckeys.forEach(function (key) {
                            var res = self._changed[key];
                            if (!res)
                                res = 2;
                            else
                                res = res | 2;
                            self._changed[key] = res;
                        });

                        if (!this._changedTimeout) {
                            this._changedTimeout = setTimeout(function () {
                                if (self._isDestroyCalled)
                                    return;
                                self._changedTimeout = null;
                                var changed = self._changed;
                                self._changed = {};
                                var keys = Object.keys(changed);
                                keys.forEach(function (fkey) {
                                    var res = changed[fkey];
                                    if ((res & 1) == 1) {
                                        self._onParentChanged(fkey);
                                    }
                                    if ((res & 2) == 2) {
                                        self._onChildrenChanged(fkey);
                                    }
                                });
                            }, 50);
                        }
                    }
                }
                _onChildFill(args: MOD.collection.ICollFillArgs<Entity>) {
                    var isEnd = !args.isBegin, self = this, changed;
                    if (isEnd) {
                        self._isChildFilling = false;
                        if (args.resetUI) {
                            changed = self.refreshChildMap();
                        }
                        else
                            changed = self._mapChildren(<Entity[]>args.newItems);
                        self._notifyChildrenChanged(changed);
                    }
                    else {
                        self._isChildFilling = true;
                    }
                }
                _onChildEdit(item: Entity, isBegin: boolean, isCanceled: boolean) {
                    var self = this;
                    if (isBegin) {
                        self._storeChildFKey(item);
                    }
                    else {
                        if (!isCanceled)
                            self._checkChildFKey(item);
                        else {
                            self._saveChildFKey = null;
                        }
                    }
                }
                _onChildCommitChanges(item: Entity, isBegin: boolean, isRejected: boolean, changeType: collection.STATUS) {
                    var self = this, fkey: string;
                    if (isBegin) {
                        if (isRejected && changeType === collection.STATUS.ADDED) {
                            fkey = this._unMapChildItem(item);
                            if (!!fkey)
                                self._notifyChildrenChanged([fkey]);
                            return;
                        }
                        else if (!isRejected && changeType === collection.STATUS.DELETED) {
                            fkey = self._unMapChildItem(item);
                            if (!!fkey)
                                self._notifyChildrenChanged([fkey]);
                            return;
                        }

                        self._storeChildFKey(item);
                    }
                    else {
                        self._checkChildFKey(item);
                    }
                }
                _storeChildFKey(item: Entity) {
                    var self = this, fkey = self.getChildFKey(item), arr: Entity[];
                    if (!!fkey) {
                        arr = self._childMap[fkey];
                        if (!!arr && arr.indexOf(item) > -1) {
                            self._saveChildFKey = fkey;
                        }
                    }
                }
                _checkChildFKey(item: Entity) {
                    var self = this, savedKey = self._saveChildFKey, fkey: string, arr: Entity[];
                    self._saveChildFKey = null;
                    fkey = self.getChildFKey(item);
                    if (fkey !== savedKey) {
                        if (!!savedKey) {
                            arr = self._childMap[savedKey];
                            utils.removeFromArray(arr, item);
                            if (arr.length == 0) {
                                delete self._childMap[savedKey];
                            }
                            self._notifyParentChanged([savedKey]);
                            self._notifyChildrenChanged([savedKey]);
                        }
                        if (!!fkey) {
                            self._mapChildren([item]);
                            self._notifyParentChanged([fkey]);
                            self._notifyChildrenChanged([fkey]);
                        }
                    }
                }
                _onChildStatusChanged(item: Entity, oldChangeType: collection.STATUS) {
                    var self = this, DEL_STATUS = collection.STATUS.DELETED, newChangeType = item._changeType;
                    var fkey = self.getChildFKey(item);
                    if (!fkey)
                        return;
                    if (newChangeType === DEL_STATUS) {
                        fkey = self._unMapChildItem(item);
                        if (!!fkey)
                            self._notifyChildrenChanged([fkey]);
                    }
                }
                _getItemKey(finf: collection.IFieldInfo[], ds: DbSet<Entity>, item: Entity) {
                    var arr = [], val, strval: string;
                    for (var i = 0, len = finf.length; i < len; i += 1) {
                        val = item[finf[i].fieldName];
                        strval = ds._getStrValue(val, finf[i]);
                        if (strval === null)
                            return null;
                        arr.push(strval);
                    }
                    return arr.join(';');
                }
                _resetChildMap() {
                    var self = this, fkeys = Object.keys(this._childMap);
                    this._childMap = {};
                    self._notifyChildrenChanged(fkeys);
                }
                _resetParentMap() {
                    var self = this, fkeys = Object.keys(this._parentMap);
                    this._parentMap = {};
                    self._notifyParentChanged(fkeys);
                }
                _unMapChildItem(item: Entity) {
                    var fkey, arr: Entity[], idx: number, changedKey = null;
                    fkey = this.getChildFKey(item);
                    if (!!fkey) {
                        arr = this._childMap[fkey];
                        if (!!arr) {
                            idx = utils.removeFromArray(arr, item);
                            if (idx > -1) {
                                if (arr.length == 0)
                                    delete this._childMap[fkey];
                                changedKey = fkey;
                            }
                        }
                    }
                    return changedKey;
                }
                _unMapParentItem(item: Entity) {
                    var fkey: string, changedKey = null;
                    fkey = this.getParentFKey(item);
                    if (!!fkey && !!this._parentMap[fkey]) {
                        delete this._parentMap[fkey];
                        changedKey = fkey;
                    }
                    return changedKey;
                }
                _mapParentItems(items: Entity[]) {
                    var item: Entity, fkey: string, DEL_STATUS = collection.STATUS.DELETED, chngType: number, old: Entity, chngedKeys = {};
                    for (var i = 0, len = items.length; i < len; i += 1) {
                        item = items[i];
                        chngType = item._changeType;
                        if (chngType === DEL_STATUS)
                            continue;
                        fkey = this.getParentFKey(item);
                        if (!!fkey) {
                            old = this._parentMap[fkey];
                            if (old !== item) {
                                //map items by foreign keys
                                this._parentMap[fkey] = item;
                                chngedKeys[fkey] = null;
                            }
                        }
                    }
                    return Object.keys(chngedKeys);
                }
                _onChildrenChanged(fkey: string) {
                    if (!!fkey && !!this._parentToChildrenName) {
                        var obj = this._parentMap[fkey];
                        if (!!obj) {
                            obj.raisePropertyChanged(this._parentToChildrenName);
                        }
                    }
                }
                _onParentChanged(fkey: string) {
                    var self = this, arr: Entity[];
                    if (!!fkey && !!this._childToParentName) {
                        arr = this._childMap[fkey];
                        if (!!arr) {
                            arr.forEach(function (item) {
                                item.raisePropertyChanged(self._childToParentName);
                            });
                        }
                    }
                }
                _mapChildren(items: Entity[]) {
                    var item: Entity, fkey: string, arr: Entity[], DEL_STATUS = collection.STATUS.DELETED, chngType, chngedKeys = {};
                    for (var i = 0, len = items.length; i < len; i += 1) {
                        item = items[i];
                        chngType = item._changeType;
                        if (chngType === DEL_STATUS)
                            continue;
                        fkey = this.getChildFKey(item);
                        if (!!fkey) {
                            arr = this._childMap[fkey];
                            if (!arr) {
                                arr = [];
                                this._childMap[fkey] = arr;
                            }
                            if (arr.indexOf(item) < 0) {
                                arr.push(item);
                                if (!chngedKeys[fkey])
                                    chngedKeys[fkey] = null;
                            }
                        }
                    }
                    return Object.keys(chngedKeys);
                }
                _unbindParentDS() {
                    var self = this, ds = this.parentDS;
                    if (!ds) return;
                    ds.removeNSHandlers(self._objId);
                }
                _unbindChildDS() {
                    var self = this, ds = this.childDS;
                    if (!ds) return;
                    ds.removeNSHandlers(self._objId);
                }
                getParentFKey(item: Entity) {
                    if (!!item && item._isNew)
                        return item._key;
                    return this._getItemKey(this._parentFldInfos, this._parentDS, item);
                }
                getChildFKey(item: Entity) {
                    if (!!item && !!this._childToParentName) {
                        //_getFieldVal for childToParentName can store temporary parent's key (which is generated on the client)
                        // we first check if it returns it
                        var parentKey = item._getFieldVal(this._childToParentName);
                        if (!!parentKey) {
                            return parentKey;
                        }
                    }
                    //if keys are permanent (stored to the server), then return normal foreign keys
                    return this._getItemKey(this._childFldInfos, this._childDS, item);
                }
                //get all childrens for parent item
                getChildItems(item: Entity):Entity[] {
                    if (!item)
                        return [];
                    var fkey = this.getParentFKey(item), arr = this._childMap[fkey];
                    if (!arr)
                        return [];
                    return arr;
                }
                //get the parent for child item
                getParentItem(item: Entity):Entity {
                    if (!item)
                        return null;
                    var fkey = this.getChildFKey(item);
                    var obj = this._parentMap[fkey];
                    if (!!obj)
                        return obj;
                    else
                        return null;
                }
                refreshParentMap() {
                    this._resetParentMap();
                    return this._mapParentItems(this._parentDS.items);
                }
                refreshChildMap() {
                    this._resetChildMap();
                    return this._mapChildren(this._childDS.items);
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    clearTimeout(this._changedTimeout);
                    this._changedTimeout = null;
                    this._changed = {};
                    this._unbindParentDS();
                    this._unbindChildDS();
                    this._parentMap = null;
                    this._childMap = null;
                    this._parentFldInfos = null;
                    this._childFldInfos = null;
                    super.destroy();
                }
                toString() {
                    return this._name;
                }
                get name() { return this._name; }
                get parentToChildrenName() { return this._parentToChildrenName; }
                get childToParentName() { return this._childToParentName; }
                get parentDS() { return this._parentDS; }
                get childDS() { return this._childDS; }
                get parentFldInfos() { return this._parentFldInfos; }
                get childFldInfos() { return this._childFldInfos; }
                get onDeleteAction() { return this._onDeleteAction; }
            }

            export class DataView<TItem extends collection.CollectionItem> extends collection.BaseCollection<TItem> {
                _dataSource: collection.BaseCollection<TItem>;
                _fn_filter: (item: TItem) => boolean;
                _fn_sort: (item1: TItem, item2: TItem) => number;
                _fn_itemsProvider: (ds: collection.BaseCollection<TItem>) => TItem[];
                _isDSFilling: boolean;
                _isAddingNew: boolean;
                _objId: string;

                constructor(options: {
                    dataSource: collection.BaseCollection<TItem>;
                    fn_filter?: (item: TItem) => boolean;
                    fn_sort?: (item1: TItem, item2: TItem) => number;
                    fn_itemsProvider?: (ds: collection.BaseCollection<TItem>) => TItem[];
                }) {
                    super();
                    var opts: typeof options = utils.extend(false, {
                            dataSource: null,
                            fn_filter: null,
                            fn_sort: null,
                            fn_itemsProvider: null
                        }, options);

                    if (!opts.dataSource || !(opts.dataSource instanceof collection.BaseCollection))
                        throw new Error(RIAPP.ERRS.ERR_DATAVIEW_DATASRC_INVALID);
                    if (!opts.fn_filter || !utils.check.isFunction(opts.fn_filter))
                        throw new Error(RIAPP.ERRS.ERR_DATAVIEW_FILTER_INVALID);
                    this._objId = 'dvw' + utils.getNewID();
                    this._dataSource = opts.dataSource;
                    this._fn_filter = opts.fn_filter;
                    this._fn_sort = opts.fn_sort;
                    this._fn_itemsProvider = opts.fn_itemsProvider;
                    this._isDSFilling = false;
                    this._isAddingNew = false;
                    var self = this, ds = this._dataSource;
                    ds.getFieldNames().forEach(function (prop) {
                        self._fieldMap[prop] = utils.extend(false, {}, ds.getFieldInfo(prop));
                    });
                    this._bindDS();
                }
                _getEventNames() {
                    var base_events = super._getEventNames();
                    return ['view_refreshed'].concat(base_events);
                }
                addOnViewRefreshed(fn: (sender: DataView<TItem>, args: {}) => void, namespace?: string) {
                    this.addHandler('view_refreshed', fn, namespace);
                }
                removeOnViewRefreshed(namespace?: string) {
                    this.removeHandler('view_refreshed', namespace);
                }
                _filterForPaging(items: TItem[]) {
                    var skip = 0, take = 0, pos = -1, cnt = -1, result: TItem[] = [];
                    skip = this.pageSize * this.pageIndex;
                    take = this.pageSize;
                    items.forEach(function (item) {
                        cnt += 1;
                        if (cnt < skip) {
                            return;
                        }
                        pos += 1;
                        if (pos < take) {
                            result.push(item);
                        }
                    });
                    return result;
                }
                _onViewRefreshed(args: {}) {
                    this.raiseEvent('view_refreshed', args);
                }
                _refresh(isPageChanged: boolean) {
                    var items;
                    var ds = this._dataSource;
                    if (!ds)
                        return;
                    if (!!this._fn_itemsProvider) {
                        items = this._fn_itemsProvider(ds);
                    }
                    else
                        items = ds.items;
                    if (!!this._fn_filter) {
                        items = items.filter(this._fn_filter);
                    }
                    if (!!this._fn_sort) {
                        items = items.sort(this._fn_sort);
                    }
                    this._fillItems({ items: items, isPageChanged: !!isPageChanged, clear: true, isAppend: false });
                    this._onViewRefreshed({});
                }
                _fillItems(data: {
                    items: TItem[];
                    isPageChanged: boolean;
                    clear: boolean;
                    isAppend: boolean;
                }) {
                    data = utils.extend(false, {
                        items: [],
                        isPageChanged: false,
                        clear: true,
                        isAppend: false
                    }, data);
                    var self = this, items: TItem[], newItems: TItem[] = [], positions: number[] = [], fetchedItems: TItem[] = [];
                    this._onFillStart({ isBegin: true, rowCount: data.items.length, time: new Date(), isPageChanged: data.isPageChanged });
                    try {
                        if (!!data.clear)
                            this.clear();
                        if (this.isPagingEnabled && !data.isAppend) {
                            items = this._filterForPaging(data.items);
                        }
                        else
                            items = data.items;

                        items.forEach(function (item) {
                            var oldItem = self._itemsByKey[item._key];
                            if (!oldItem) {
                                self._itemsByKey[item._key] = <any>item;
                                newItems.push(item);
                                positions.push(self._items.length - 1);
                                self._items.push(item);
                                fetchedItems.push(item);
                            }
                            else {
                                fetchedItems.push(oldItem);
                            }
                        });

                        if (newItems.length > 0) {
                            this._onItemsChanged({ change_type: collection.COLL_CHANGE_TYPE.ADDED, items: newItems, pos: positions });
                            this.raisePropertyChanged('count');
                        }
                    } finally {
                        this._onFillEnd({
                            isBegin: false, rowCount: fetchedItems.length, time: new Date(), resetUI: !!data.clear,
                            fetchedItems: fetchedItems, newItems: newItems, isPageChanged: data.isPageChanged
                        });
                    }
                    if (!!data.clear)
                        this.totalCount = data.items.length;
                    else
                        this.totalCount = this.totalCount + newItems.length;
                    this.moveFirst();
                    return newItems;
                }
                _onDSCollectionChanged(args: collection.ICollChangedArgs<TItem>) {
                    var self = this, item: collection.CollectionItem, CH_T = collection.COLL_CHANGE_TYPE, items = args.items;
                    switch (args.change_type) {
                        case CH_T.RESET:
                            if (!this._isDSFilling)
                                this._refresh(false);
                            break;
                        case CH_T.ADDED:
                            if (!this._isAddingNew && !this._isDSFilling) {
                                if (!!self._fn_filter) {
                                    items = items.filter(self._fn_filter);
                                }
                                self.appendItems(items);
                            }
                            break;
                        case CH_T.REMOVE:
                            items.forEach(function (item) {
                                var key = item._key;
                                item = <any>self._itemsByKey[key];
                                if (!!item) {
                                    self.removeItem(item);
                                }
                            });
                            break;
                        case CH_T.REMAP_KEY:
                            {
                                item = self._itemsByKey[args.old_key];
                                if (!!item) {
                                    delete self._itemsByKey[args.old_key];
                                    self._itemsByKey[args.new_key] = <any>item;
                                    this._onItemsChanged(args);
                                }
                            }
                            break;
                        default:
                            throw new Error(utils.format(RIAPP.ERRS.ERR_COLLECTION_CHANGETYPE_INVALID, args.change_type));
                    }
                }
                _onDSFill(args: collection.ICollFillArgs<TItem>) {
                    var self = this, items = args.fetchedItems, isEnd = !args.isBegin;
                    if (isEnd) {
                        this._isDSFilling = false;
                        if (args.resetUI)
                            this._refresh(false);
                        else {
                            if (!!self._fn_filter) {
                                items = items.filter(self._fn_filter);
                            }
                            self.appendItems(items);
                        }
                    }
                    else {
                        this._isDSFilling = true;
                    }
                }
                _onDSStatusChanged(args: collection.ICollItemStatusArgs<TItem>) {
                    var self = this, item = args.item, key = args.key, oldChangeType = args.oldChangeType, isOk, canFilter = !!self._fn_filter;
                    if (!!self._itemsByKey[key]) {
                        self._onItemStatusChanged(item, oldChangeType);

                        if (canFilter) {
                            isOk = self._fn_filter(item);
                            if (!isOk) {
                                self.removeItem(item);
                            }
                        }
                    }
                    else {
                        if (canFilter) {
                            isOk = self._fn_filter(item);
                            if (isOk) {
                                self.appendItems([item]);
                            }
                        }
                    }
                }
                _bindDS() {
                    var self = this, ds = this._dataSource;
                    if (!ds) return;
                    ds.addHandler('coll_changed', function (sender, args) {
                        if (ds !== sender) return;
                        self._onDSCollectionChanged(args);
                    }, self._objId);
                    ds.addHandler('fill', function (sender, args) {
                        if (ds !== sender) return;
                        self._onDSFill(args);
                    }, self._objId);
                    ds.addHandler('begin_edit', function (sender, args) {
                        if (ds !== sender) return;
                        if (!!self._itemsByKey[args.item._key]) {
                            self._onEditing(args.item, true, false);
                        }
                    }, self._objId);
                    ds.addHandler('end_edit', function (sender, args) {
                        if (ds !== sender) return;
                        var isOk, item = args.item, canFilter = !!self._fn_filter;
                        if (!!self._itemsByKey[item._key]) {
                            self._onEditing(item, false, args.isCanceled);
                            if (!args.isCanceled && canFilter) {
                                isOk = self._fn_filter(item);
                                if (!isOk)
                                    self.removeItem(item);
                            }
                        }
                        else {
                            if (!args.isCanceled && canFilter) {
                                isOk = self._fn_filter(item);
                                if (isOk) {
                                    self.appendItems([item]);
                                }
                            }
                        }
                    }, self._objId);
                    ds.addHandler('errors_changed', function (sender, args) {
                        if (ds !== sender) return;
                        if (!!self._itemsByKey[args.item._key]) {
                            self._onErrorsChanged(args.item);
                        }
                    }, self._objId);
                    ds.addHandler('status_changed', function (sender, args) {
                        if (ds !== sender) return;
                        self._onDSStatusChanged(args);
                    }, self._objId);

                    ds.addHandler('item_deleting', function (sender, args) {
                        if (ds !== sender) return;
                        if (!!self._itemsByKey[args.item._key]) {
                            self._onItemDeleting(args);
                        }
                    }, self._objId);
                    ds.addHandler('item_added', function (sender, args) {
                        if (ds !== sender) return;
                        if (self._isAddingNew) {
                            if (!self._itemsByKey[args.item._key]) {
                                self._attach(args.item);
                            }
                            self.currentItem = args.item;
                            self._onEditing(args.item, true, false);
                            self._onItemAdded(args.item);
                        }
                    }, self._objId);
                    ds.addHandler('item_adding', function (sender, args) {
                        if (ds !== sender) return;
                        if (self._isAddingNew) {
                            self._onItemAdding(args.item);
                        }
                    }, self._objId);
                }
                _unbindDS() {
                    var self = this, ds = this._dataSource;
                    if (!ds) return;
                    ds.removeNSHandlers(self._objId);
                }
                appendItems(items: TItem[]) {
                    if (this._isDestroyCalled)
                        return [];
                    return this._fillItems({ items: items, isPageChanged: false, clear: false, isAppend: true });
                }
                _getStrValue(val, fieldInfo) {
                    return this._dataSource._getStrValue(val, fieldInfo);
                }
                _onCurrentChanging(newCurrent: TItem) {
                    var ds = this._dataSource;
                    try {
                        if (!!ds._EditingItem && newCurrent !== ds._EditingItem)
                            ds.endEdit();
                    }
                    catch (ex) {
                        ds.cancelEdit();
                        global.reThrow(ex, this._onError(ex, this));
                    }
                }
                _getErrors(item: TItem) {
                    var ds = this._dataSource;
                    return ds._getErrors(item);
                }
                _onPageChanged() {
                    this._refresh(true);
                }
                getItemsWithErrors() {
                    var ds = this._dataSource;
                    return ds.getItemsWithErrors();
                }
                addNew() {
                    var ds = this._dataSource, item: TItem;
                    this._isAddingNew = true;
                    try {
                        item = ds.addNew();
                    } finally {
                        this._isAddingNew = false;
                    }
                    return item;
                }
                removeItem(item: TItem) {
                    if (item._key === null) {
                        throw new Error(RIAPP.ERRS.ERR_ITEM_IS_DETACHED);
                    }
                    if (!this._itemsByKey[item._key])
                        return;
                    var oldPos = utils.removeFromArray(this._items, item);
                    if (oldPos < 0) {
                        throw new Error(RIAPP.ERRS.ERR_ITEM_IS_NOTFOUND);
                    }
                    delete this._itemsByKey[item._key];
                    delete this._errors[item._key];
                    this.totalCount = this.totalCount - 1;
                    this._onRemoved(item, oldPos);
                    var test = this.getItemByPos(oldPos), curPos = this._currentPos;
                    //if detached item was current item
                    if (curPos === oldPos) {
                        if (!test) { //it was the last item
                            this._currentPos = curPos - 1;
                        }
                        this._onCurrentChanged();
                    }

                    if (curPos > oldPos) {
                        this._currentPos = curPos - 1;
                        this._onCurrentChanged();
                    }
                }
                sortLocal(fieldNames: string[], sortOrder: string) {
                    var mult = 1, parser = global.parser;
                    if (!!sortOrder && sortOrder.toUpperCase() === 'DESC')
                        mult = -1;
                    var fn_sort = function (a, b) {
                        var res = 0, i, len, af, bf, fieldName;
                        for (i = 0, len = fieldNames.length; i < len; i += 1) {
                            fieldName = fieldNames[i];
                            af = parser.resolvePath(a, fieldName);
                            bf = parser.resolvePath(b, fieldName);
                            if (af < bf)
                                res = -1 * mult;
                            else if (af > bf)
                                res = mult;
                            else
                                res = 0;

                            if (res !== 0)
                                return res;
                        }
                        return res;
                    };
                    this.fn_sort = fn_sort;
                }
                getIsHasErrors() {
                    return this._dataSource.getIsHasErrors();
                }
                clear() {
                    this.cancelEdit();
                    this._EditingItem = null;
                    this._newKey = 0;
                    this.currentItem = null;
                    this._items = [];
                    this._itemsByKey = {};
                    this._errors = {};
                    this._onItemsChanged({ change_type: collection.COLL_CHANGE_TYPE.RESET, items: [] });
                    this.pageIndex = 0;
                    this.raisePropertyChanged('count');
                }
                refresh() {
                    this._refresh(false);
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._unbindDS();
                    this._dataSource = null;
                    this._fn_filter = null;
                    this._fn_sort = null;
                    super.destroy();
                }
                get isPagingEnabled() { return this._options.enablePaging; }
                set isPagingEnabled(v) {
                    if (this._options.enablePaging !== v) {
                        this._options.enablePaging = v;
                        this.raisePropertyChanged('isPagingEnabled');
                        this._refresh(false);
                    }
                }
                get permissions() { return this._dataSource.permissions; }
                get fn_filter() { return this._fn_filter; }
                set fn_filter(v: (item: TItem) => boolean) {
                    if (this._fn_filter !== v) {
                        this._fn_filter = v;
                        this._refresh(false);
                    }
                }
                get fn_sort() { return this._fn_sort; }
                set fn_sort(v: (item1: TItem, item2: TItem) => number) {
                    if (this._fn_sort !== v) {
                        this._fn_sort = v;
                        this._refresh(false);
                    }
                }
                get fn_itemsProvider() { return this._fn_itemsProvider; }
                set fn_itemsProvider(v: (ds: collection.BaseCollection<TItem>) => TItem[]) {
                    if (this._fn_itemsProvider !== v) {
                        this._fn_itemsProvider = v;
                        this._refresh(false);
                    }
                }
            }

            export class ChildDataView<TEntity extends Entity> extends DataView<TEntity> {
                _parentItem: Entity;
                _refreshTimeout: number;
                _association: Association;

                constructor(options: {
                    association: Association;
                    fn_filter?: (item: TEntity) => boolean;
                    fn_sort?: (item1: TEntity, item2: TEntity) => number;
                }) {
                    this._parentItem = null;
                    this._refreshTimeout = null;
                    this._association = options.association;
                    var opts: {
                        dataSource: collection.BaseCollection<TEntity>;
                        fn_filter?: (item: TEntity) => boolean;
                        fn_sort?: (item1: TEntity, item2: TEntity) => number;
                        fn_itemsProvider?: (ds: collection.BaseCollection<TEntity>) => TEntity[];
                    } = utils.extend(false, {
                            dataSource: this._association.childDS,
                            fn_filter: null,
                            fn_sort: null,
                            fn_itemsProvider: null
                        }, options);

                    var self = this, assoc = this._association, save_fn_filter = options.fn_filter;
                    opts.fn_filter = function (item) {
                        if (!self._parentItem)
                            return false;
                        var fkey1 = assoc.getParentFKey(self._parentItem);
                        if (!fkey1)
                            return false;
                        var fkey2 = assoc.getChildFKey(item);
                        if (!fkey2)
                            return false;
                        if (fkey1 !== fkey2)
                            return false;
                        if (!save_fn_filter)
                            return true;
                        else
                            return save_fn_filter(item);
                    };
                    super(<any>opts);
                }
                _refresh() {
                    var self = this, ds = this._dataSource;
                    if (!ds)
                        return;
                    clearTimeout(self._refreshTimeout);
                    self._refreshTimeout = setTimeout(function () {
                        if (self._isDestroyCalled)
                            return;
                        var items = <TEntity[]>self._association.getChildItems(self._parentItem);
                        if (!!self._fn_filter) {
                            items = items.filter(self._fn_filter);
                        }
                        if (!!self._fn_sort) {
                            items = items.sort(self._fn_sort);
                        }
                        self._fillItems({ items: items, isPageChanged: false, clear: true, isAppend: false });
                        self._onViewRefreshed({});
                    }, 250);
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    clearTimeout(this._refreshTimeout);
                    this._association = null;
                    super.destroy();
                }
                toString() {
                    if (!!this._association)
                        return 'ChildDataView for ' + this._association.toString();
                    return 'ChildDataView';
                }
                get parentItem() { return this._parentItem; }
                set parentItem(v: Entity) {
                    if (this._parentItem !== v) {
                        this._parentItem = v;
                        this.raisePropertyChanged('parentItem');
                        if (this.items.length > 0) {
                            this.clear();
                            this._onViewRefreshed({});
                        }
                        this._refresh();
                    }
                }
                get association() { return this._association; }
            }

            export class TDbSet extends DbSet<Entity>{
            }
            export class TDataView extends DataView<Entity>{
            }
            export class TChildDataView extends ChildDataView<Entity>{
            }

            global.onModuleLoaded('db', db);
        }
    }
}
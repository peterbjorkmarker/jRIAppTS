var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RIAPP;
(function (RIAPP) {
    (function (MOD) {
        (function (db) {
            //local variables for optimization
                        var utils = RIAPP.global.utils, consts = RIAPP.global.consts, ValidationError = MOD.binding.ValidationError;
            var valueUtils = RIAPP.MOD.utils.valueUtils, COLL_CHANGE_TYPE = RIAPP.MOD.collection.consts.COLL_CHANGE_TYPE, CHANGE_TYPE = RIAPP.MOD.consts.CHANGE_TYPE, FLAGS = {
                None: 0,
                Changed: 1,
                Setted: 2,
                Refreshed: 4
            }, FILTER_TYPE = {
                Equals: 0,
                Between: 1,
                StartsWith: 2,
                EndsWith: 3,
                Contains: 4,
                Gt: 5,
                Lt: 6,
                GtEq: 7,
                LtEq: 8,
                NotEq: 9
            }, SORT_ORDER = MOD.collection.consts.SORT_ORDER;
            var DATA_OPER = {
                SUBMIT: 'submit',
                LOAD: 'load',
                INVOKE: 'invoke',
                REFRESH: 'refresh',
                INIT: 'initDbContext'
            };
            var DATA_SVC_METH = {
                Invoke: 'InvokeMethod',
                LoadData: 'GetItems',
                GetMetadata: 'GetMetadata',
                GetPermissions: 'GetPermissions',
                Submit: 'SaveChanges',
                Refresh: 'RefreshItem'
            };
            var REFRESH_MODE = {
                NONE: 0,
                RefreshCurrent: 1,
                MergeIntoCurrent: 2,
                CommitChanges: 3
            };
            var DELETE_ACTION = {
                NoAction: 0,
                Cascade: 1,
                SetNulls: 2
            };
            var DataOperationError = (function (_super) {
                __extends(DataOperationError, _super);
                function DataOperationError(ex, operationName) {
                    var message;
                    if(!!ex) {
                        message = ex.message;
                    }
                    if(!message) {
                        message = '' + ex;
                    }
                                _super.call(this, message);
                    this._origError = ex;
                    this._operationName = operationName;
                }
                Object.defineProperty(DataOperationError.prototype, "operationName", {
                    get: function () {
                        return this._operationName;
                    },
                    enumerable: true,
                    configurable: true
                });
                return DataOperationError;
            })(RIAPP.MOD.errors.BaseError);
            db.DataOperationError = DataOperationError;            
            var AccessDeniedError = (function (_super) {
                __extends(AccessDeniedError, _super);
                function AccessDeniedError() {
                    _super.apply(this, arguments);

                }
                return AccessDeniedError;
            })(DataOperationError);
            db.AccessDeniedError = AccessDeniedError;            
            var ConcurrencyError = (function (_super) {
                __extends(ConcurrencyError, _super);
                function ConcurrencyError() {
                    _super.apply(this, arguments);

                }
                return ConcurrencyError;
            })(DataOperationError);
            db.ConcurrencyError = ConcurrencyError;            
            var SvcValidationError = (function (_super) {
                __extends(SvcValidationError, _super);
                function SvcValidationError() {
                    _super.apply(this, arguments);

                }
                return SvcValidationError;
            })(DataOperationError);
            db.SvcValidationError = SvcValidationError;            
            var SubmitError = (function (_super) {
                __extends(SubmitError, _super);
                function SubmitError(origError, allSubmitted, notValidated) {
                    var message = origError.message || ('' + origError);
                                _super.call(this, message, DATA_OPER.SUBMIT);
                    this._origError = origError;
                    this._allSubmitted = allSubmitted || [];
                    this._notValidated = notValidated || [];
                    if(this._notValidated.length > 0) {
                        var res = [
                            message + ':'
                        ];
                        this._notValidated.forEach(function (item) {
                            res.push(utils.format('item key:{0} errors:{1}', item._key, item.getErrorString()));
                        });
                        this._message = res.join('\r\n');
                    }
                }
                Object.defineProperty(SubmitError.prototype, "allSubmitted", {
                    get: function () {
                        return this._allSubmitted;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SubmitError.prototype, "notValidated", {
                    get: function () {
                        return this._notValidated;
                    },
                    enumerable: true,
                    configurable: true
                });
                return SubmitError;
            })(DataOperationError);
            db.SubmitError = SubmitError;            
            function __checkError(svcError, oper) {
                if(!svcError) {
                    return;
                }
                switch(svcError.name) {
                    case "AccessDeniedException":
                        throw new AccessDeniedError(RIAPP.ERRS.ERR_ACCESS_DENIED, oper);
                        break;
                    case "ConcurrencyException":
                        throw new ConcurrencyError(RIAPP.ERRS.ERR_CONCURRENCY, oper);
                        break;
                    case "ValidationException":
                        throw new SvcValidationError(utils.format(RIAPP.ERRS.ERR_VALIDATION, svcError.message), oper);
                        break;
                    case "DomainServiceException":
                        throw new DataOperationError(utils.format(RIAPP.ERRS.ERR_SVC_ERROR, svcError.message), oper);
                        break;
                    default:
                        throw new DataOperationError(utils.format(RIAPP.ERRS.ERR_UNEXPECTED_SVC_ERROR, svcError.message), oper);
                }
            }
            ;
            ;
            ;
            var DataCache = (function (_super) {
                __extends(DataCache, _super);
                function DataCache(query) {
                                _super.call(this);
                    this._query = query;
                    this._cache = [];
                    this._totalCount = 0;
                    this._itemsByKey = {
                    };
                }
                DataCache.prototype.getCachedPage = function (pageIndex) {
                    var res = this._cache.filter(function (page) {
                        return page.pageIndex === pageIndex;
                    });
                    if(res.length == 0) {
                        return null;
                    }
                    if(res.length != 1) {
                        throw new Error(utils.format(RIAPP.ERRS.ERR_ASSERTION_FAILED, "res.length == 1"));
                    }
                    return res[0];
                };
                DataCache.prototype.reindexCache = //reset items key index
                function () {
                    var self = this, page;
                    this._itemsByKey = {
                    };
                    for(var i = 0; i < this._cache.length; i += 1) {
                        page = this._cache[i];
                        page.items.forEach(function (item) {
                            self._itemsByKey[item._key] = item;
                        });
                    }
                };
                DataCache.prototype.getPrevCachedPageIndex = function (currentPageIndex) {
                    var pageIndex = -1, cachePageIndex;
                    for(var i = 0; i < this._cache.length; i += 1) {
                        cachePageIndex = this._cache[i].pageIndex;
                        if(cachePageIndex > pageIndex && cachePageIndex < currentPageIndex) {
                            pageIndex = cachePageIndex;
                        }
                    }
                    return pageIndex;
                };
                DataCache.prototype.getNextRange = function (pageIndex) {
                    var half = Math.floor(((this.loadPageCount - 1) / 2));
                    var above = (pageIndex + half) + ((this.loadPageCount - 1) % 2);
                    var below = (pageIndex - half), prev = this.getPrevCachedPageIndex(pageIndex);
                    if(below < 0) {
                        above += (0 - below);
                        below = 0;
                    }
                    if(below <= prev) {
                        above += (prev - below + 1);
                        below += (prev - below + 1);
                    }
                    if(this._pageCount > this.loadPageCount && above > (this._pageCount - 1)) {
                        below -= (above - (this._pageCount - 1));
                        if(below < 0) {
                            below = 0;
                        }
                        above = this._pageCount - 1;
                    }
                    //once again check for previous cached range
                    if(below <= prev) {
                        above += (prev - below + 1);
                        below += (prev - below + 1);
                    }
                    var cnt = above - below + 1;
                    if(cnt < this.loadPageCount) {
                        above += this.loadPageCount - cnt;
                        cnt = above - below + 1;
                    }
                    var start = below;
                    var end = above;
                    return {
                        start: start,
                        end: end,
                        cnt: cnt
                    };
                };
                DataCache.prototype.fillCache = function (start, items) {
                    var item, keyMap = this._itemsByKey;
                    var i, j, k, len = items.length, pageIndex, page, pageSize = this.pageSize;
                    for(i = 0; i < this.loadPageCount; i += 1) {
                        pageIndex = start + i;
                        page = this.getCachedPage(pageIndex);
                        if(!page) {
                            page = {
                                items: [],
                                pageIndex: pageIndex
                            };
                            this._cache.push(page);
                        }
                        for(j = 0; j < pageSize; j += 1) {
                            k = (i * pageSize) + j;
                            if(k < len) {
                                item = items[k];
                                if(!!keyMap[item._key]) {
                                    continue;
                                }
                                page.items.push(item);
                                keyMap[item._key] = item;
                                item._isCached = true;
                            } else {
                                return;
                            }
                        }
                    }
                };
                DataCache.prototype.clear = function () {
                    var i, j, items, item, dbSet = this._query.dbSet;
                    for(i = 0; i < this._cache.length; i += 1) {
                        items = this._cache[i].items;
                        for(j = 0; j < items.length; j += 1) {
                            item = items[j];
                            if(!!item && item._key !== null) {
                                item._isCached = false;
                                if(!dbSet.getItemByKey(item._key)) {
                                    item.destroy();
                                }
                            }
                        }
                    }
                    this._cache = [];
                    this._itemsByKey = {
                    };
                };
                DataCache.prototype.clearCacheForPage = function (pageIndex) {
                    var page = this.getCachedPage(pageIndex), dbSet = this._query.dbSet;
                    if(!page) {
                        return;
                    }
                    var j, items, item, index = this._cache.indexOf(page);
                    items = page.items;
                    for(j = 0; j < items.length; j += 1) {
                        item = items[j];
                        if(!!item && item._key !== null) {
                            delete this._itemsByKey[item._key];
                            item._isCached = false;
                            if(!dbSet.getItemByKey(item._key)) {
                                item.destroy();
                            }
                        }
                    }
                    this._cache.splice(index, 1);
                };
                DataCache.prototype.hasPage = function (pageIndex) {
                    for(var i = 0; i < this._cache.length; i += 1) {
                        if(this._cache[i].pageIndex === pageIndex) {
                            return true;
                        }
                    }
                    return false;
                };
                DataCache.prototype.getItemByKey = function (key) {
                    return this._itemsByKey[key];
                };
                DataCache.prototype.getPageByItem = function (item) {
                    item = this._itemsByKey[item._key];
                    if(!item) {
                        return -1;
                    }
                    for(var i = 0; i < this._cache.length; i += 1) {
                        if(this._cache[i].items.indexOf(item) > -1) {
                            return this._cache[i].pageIndex;
                        }
                    }
                    return -1;
                };
                DataCache.prototype.destroy = function () {
                    if(this._isDestroyed) {
                        return;
                    }
                    this._isDestroyCalled = true;
                    this.clear();
                    _super.prototype.destroy.call(this);
                };
                DataCache.prototype.toString = function () {
                    return 'DataCache';
                };
                Object.defineProperty(DataCache.prototype, "_pageCount", {
                    get: function () {
                        var rowCount = this.totalCount, rowPerPage = this.pageSize, result;
                        if((rowCount === 0) || (rowPerPage === 0)) {
                            return 0;
                        }
                        if((rowCount % rowPerPage) === 0) {
                            result = (rowCount / rowPerPage);
                        } else {
                            result = (rowCount / rowPerPage);
                            result = Math.floor(result) + 1;
                        }
                        return result;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataCache.prototype, "pageSize", {
                    get: function () {
                        return this._query.pageSize;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataCache.prototype, "loadPageCount", {
                    get: function () {
                        return this._query.loadPageCount;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataCache.prototype, "totalCount", {
                    get: function () {
                        return this._totalCount;
                    },
                    set: function (v) {
                        if(utils.check.isNt(v)) {
                            v = 0;
                        }
                        if(v !== this._totalCount) {
                            this._totalCount = v;
                            this.raisePropertyChanged('totalCount');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataCache.prototype, "cacheSize", {
                    get: function () {
                        return this._cache.length;
                    },
                    enumerable: true,
                    configurable: true
                });
                return DataCache;
            })(RIAPP.BaseObject);
            db.DataCache = DataCache;            
            var DataQuery = (function (_super) {
                __extends(DataQuery, _super);
                function DataQuery(dbSet, queryInfo) {
                                _super.call(this);
                    this._dbSet = dbSet;
                    this.__queryInfo = queryInfo;
                    this._filterInfo = {
                        filterItems: []
                    };
                    this._sortInfo = {
                        sortItems: []
                    };
                    this._isIncludeTotalCount = true;
                    this._isClearPrevData = true;
                    this._pageSize = dbSet.pageSize;
                    this._pageIndex = dbSet.pageIndex;
                    this._params = {
                    };
                    this._loadPageCount = 1;
                    this._isClearCacheOnEveryLoad = true;
                    this._dataCache = null;
                    this._cacheInvalidated = false;
                }
                DataQuery.prototype.getFieldInfo = function (fieldName) {
                    return this._dbSet.getFieldInfo(fieldName);
                };
                DataQuery.prototype.getFieldNames = function () {
                    var fldMap = this._dbSet._fieldMap;
                    return utils.getProps(fldMap);
                };
                DataQuery.prototype._addSort = function (fieldName, sortOrder) {
                    var sort = SORT_ORDER.ASC, sortInfo = this._sortInfo;
                    if(!!sortOrder && sortOrder.toLowerCase().substr(0, 1) === 'd') {
                        sort = SORT_ORDER.DESC;
                    }
                    var sortItem = {
                        fieldName: fieldName,
                        sortOrder: sort
                    };
                    sortInfo.sortItems.push(sortItem);
                    this._cacheInvalidated = true;
                };
                DataQuery.prototype._addFilterItem = function (fieldName, operand, value) {
                    var F_TYPE = FILTER_TYPE, fkind = F_TYPE.Equals;
                    var fld = this.getFieldInfo(fieldName);
                    if(!fld) {
                        throw new Error(utils.format(RIAPP.ERRS.ERR_DBSET_INVALID_FIELDNAME, this.dbSetName, fieldName));
                    }
                    var stz = this._serverTimezone, dcnv = fld.dateConversion, val = value;
                    if(!utils.check.isArray(val)) {
                        val = [
                            value
                        ];
                    }
                    var tmp = RIAPP.ArrayHelper.clone(val);
                    val = tmp.map(function (el) {
                        return valueUtils.stringifyValue(el, dcnv, stz);
                    });
                    switch(operand.toLowerCase()) {
                        case "equals":
                        case "=":
                            fkind = F_TYPE.Equals;
                            break;
                        case "noteq":
                        case "!=":
                        case "<>":
                            fkind = F_TYPE.NotEq;
                            break;
                        case "between":
                            fkind = F_TYPE.Between;
                            if(value.length != 2) {
                                throw new Error(RIAPP.ERRS.ERR_QUERY_BETWEEN);
                            }
                            break;
                        case "startswith":
                            fkind = F_TYPE.StartsWith;
                            break;
                        case "endswith":
                            fkind = F_TYPE.EndsWith;
                            break;
                        case "contains":
                            fkind = F_TYPE.Contains;
                            break;
                        case "gt":
                        case ">":
                            fkind = F_TYPE.Gt;
                            break;
                        case "gteq":
                        case ">=":
                            fkind = F_TYPE.GtEq;
                            break;
                        case "lt":
                        case "<":
                            fkind = F_TYPE.Lt;
                            break;
                        case "lteq":
                        case "<=":
                            fkind = F_TYPE.LtEq;
                            break;
                        default:
                            throw new Error(utils.format(RIAPP.ERRS.ERR_QUERY_OPERATOR_INVALID, operand));
                    }
                    var filterItem = {
                        fieldName: fieldName,
                        kind: fkind,
                        values: val
                    };
                    this._filterInfo.filterItems.push(filterItem);
                    this._cacheInvalidated = true;
                };
                DataQuery.prototype.where = function (fieldName, operand, value) {
                    this._addFilterItem(fieldName, operand, value);
                    return this;
                };
                DataQuery.prototype.and = function (fieldName, operand, value) {
                    this._addFilterItem(fieldName, operand, value);
                    return this;
                };
                DataQuery.prototype.orderBy = function (fieldName, sortOrder) {
                    this._addSort(fieldName, sortOrder);
                    return this;
                };
                DataQuery.prototype.thenBy = function (fieldName, sortOrder) {
                    this._addSort(fieldName, sortOrder);
                    return this;
                };
                DataQuery.prototype.clearSort = function () {
                    this._sortInfo.sortItems = [];
                    this._cacheInvalidated = true;
                    return this;
                };
                DataQuery.prototype.clearFilter = function () {
                    this._filterInfo.filterItems = [];
                    this._cacheInvalidated = true;
                    return this;
                };
                DataQuery.prototype.clearParams = function () {
                    this._params = {
                    };
                    this._cacheInvalidated = true;
                    return this;
                };
                DataQuery.prototype._clearCache = function () {
                    if(!!this._dataCache) {
                        this._dataCache.destroy();
                        this._dataCache = null;
                    }
                    this._resetCacheInvalidated();
                };
                DataQuery.prototype._getCache = function () {
                    if(!this._dataCache) {
                        this._dataCache = new DataCache(this);
                    }
                    return this._dataCache;
                };
                DataQuery.prototype._reindexCache = function () {
                    if(!this._dataCache) {
                        return;
                    }
                    this._dataCache.reindexCache();
                };
                DataQuery.prototype._isPageCached = function (pageIndex) {
                    if(!this._dataCache) {
                        return false;
                    }
                    return this._dataCache.hasPage(pageIndex);
                };
                DataQuery.prototype._resetCacheInvalidated = function () {
                    this._cacheInvalidated = false;
                };
                DataQuery.prototype.destroy = function () {
                    if(this._isDestroyed) {
                        return;
                    }
                    this._isDestroyCalled = true;
                    this._clearCache();
                    _super.prototype.destroy.call(this);
                };
                DataQuery.prototype.toString = function () {
                    return 'DataQuery';
                };
                Object.defineProperty(DataQuery.prototype, "_queryInfo", {
                    get: function () {
                        return this.__queryInfo;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "_serverTimezone", {
                    get: function () {
                        return this._dbSet.dbContext.serverTimezone;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "entityType", {
                    get: function () {
                        return this._dbSet.entityType;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "dbSet", {
                    get: function () {
                        return this._dbSet;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "dbSetName", {
                    get: function () {
                        return this._dbSet.dbSetName;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "queryName", {
                    get: function () {
                        return this.__queryInfo.methodName;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "filterInfo", {
                    get: function () {
                        return this._filterInfo;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "sortInfo", {
                    get: function () {
                        return this._sortInfo;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "isIncludeTotalCount", {
                    get: function () {
                        return this._isIncludeTotalCount;
                    },
                    set: function (v) {
                        this._isIncludeTotalCount = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "isClearPrevData", {
                    get: function () {
                        return this._isClearPrevData;
                    },
                    set: function (v) {
                        this._isClearPrevData = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "pageSize", {
                    get: function () {
                        return this._pageSize;
                    },
                    set: function (v) {
                        if(this._pageSize != v) {
                            this._pageSize = v;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "pageIndex", {
                    get: function () {
                        return this._pageIndex;
                    },
                    set: function (v) {
                        if(this._pageIndex != v) {
                            this._pageIndex = v;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "params", {
                    get: function () {
                        return this._params;
                    },
                    set: function (v) {
                        if(this._params !== v) {
                            this._params = v;
                            this._cacheInvalidated = true;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "isPagingEnabled", {
                    get: function () {
                        return this._dbSet.isPagingEnabled;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "loadPageCount", {
                    get: function () {
                        return this._loadPageCount;
                    },
                    set: function (v) {
                        if(v < 1) {
                            v = 1;
                        }
                        if(this._loadPageCount != v) {
                            this._loadPageCount = v;
                            if(v === 1) {
                                this._clearCache();
                            }
                            this.raisePropertyChanged('loadPageCount');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "isClearCacheOnEveryLoad", {
                    get: function () {
                        return this._isClearCacheOnEveryLoad;
                    },
                    set: function (v) {
                        if(this._isClearCacheOnEveryLoad != v) {
                            this._isClearCacheOnEveryLoad = v;
                            this.raisePropertyChanged('isClearCacheOnEveryLoad');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "isCacheValid", {
                    get: function () {
                        return !!this._dataCache && !this._cacheInvalidated;
                    },
                    enumerable: true,
                    configurable: true
                });
                return DataQuery;
            })(RIAPP.BaseObject);
            db.DataQuery = DataQuery;            
            var Entity = (function (_super) {
                __extends(Entity, _super);
                function Entity(dbSet, row, names) {
                    this.__dbSet = dbSet;
                                _super.call(this);
                    this.__changeType = CHANGE_TYPE.NONE;
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
                Entity.prototype._updateKeys = function (srvKey) {
                    this._srvRowKey = srvKey;
                    this._key = srvKey;
                };
                Entity.prototype._initRowInfo = function (row, names) {
                    if(!row) {
                        return;
                    }
                    var self = this, stz = self._serverTimezone;
                    this._srvRowKey = row.key;
                    this._key = row.key;
                    row.values.forEach(function (val, index) {
                        var fieldName = names[index], fld = self.getFieldInfo(fieldName);
                        if(!fld) {
                            throw new Error(utils.format(RIAPP.ERRS.ERR_DBSET_INVALID_FIELDNAME, self._dbSetName, fieldName));
                        }
                        var newVal = val, dataType = fld.dataType, dcnv = fld.dateConversion, res = valueUtils.parseValue(newVal, dataType, dcnv, stz);
                        self._vals[fld.fieldName] = res;
                    });
                };
                Entity.prototype._checkCanRefresh = function () {
                    if(this._key === null || this._changeType === CHANGE_TYPE.ADDED) {
                        throw new Error(RIAPP.ERRS.ERR_OPER_REFRESH_INVALID);
                    }
                };
                Entity.prototype._refreshValue = function (val, fieldName, refreshMode) {
                    var self = this, fld = self.getFieldInfo(fieldName);
                    if(!fld) {
                        throw new Error(utils.format(RIAPP.ERRS.ERR_DBSET_INVALID_FIELDNAME, this._dbSetName, fieldName));
                    }
                    var stz = self._serverTimezone, newVal, oldVal, oldValOrig, dataType = fld.dataType, dcnv = fld.dateConversion;
                    newVal = valueUtils.parseValue(val, dataType, dcnv, stz);
                    oldVal = self._vals[fieldName];
                    switch(refreshMode) {
                        case REFRESH_MODE.CommitChanges:
 {
                                if(!valueUtils.compareVals(newVal, oldVal, dataType)) {
                                    self._vals[fieldName] = newVal;
                                    self._onFieldChanged(fld);
                                }
                            }
                            break;
                        case REFRESH_MODE.RefreshCurrent:
 {
                                if(!!self._origVals) {
                                    self._origVals[fieldName] = newVal;
                                }
                                if(!!self._saveVals) {
                                    self._saveVals[fieldName] = newVal;
                                }
                                if(!valueUtils.compareVals(newVal, oldVal, dataType)) {
                                    self._vals[fieldName] = newVal;
                                    self._onFieldChanged(fld);
                                }
                            }
                            break;
                        case REFRESH_MODE.MergeIntoCurrent:
 {
                                if(!!self._origVals) {
                                    oldValOrig = self._origVals[fieldName];
                                    self._origVals[fieldName] = newVal;
                                }
                                if(oldValOrig === undefined || valueUtils.compareVals(oldValOrig, oldVal, dataType)) {
                                    //unmodified
                                    if(!valueUtils.compareVals(newVal, oldVal, dataType)) {
                                        self._vals[fieldName] = newVal;
                                        self._onFieldChanged(fld);
                                    }
                                }
                            }
                            break;
                        default:
                            throw new Error(utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'refreshMode', refreshMode));
                    }
                };
                Entity.prototype._refreshValues = function (rowInfo, refreshMode) {
                    var self = this, oldCT = this._changeType;
                    if(!this._isDestroyed) {
                        if(!refreshMode) {
                            refreshMode = REFRESH_MODE.RefreshCurrent;
                        }
                        rowInfo.values.forEach(function (val) {
                            if(!((val.flags & FLAGS.Refreshed) === FLAGS.Refreshed)) {
                                return;
                            }
                            self._refreshValue(val.val, val.fieldName, refreshMode);
                        });
                        if(oldCT === CHANGE_TYPE.UPDATED) {
                            var changes = this._getStrValues(true);
                            if(changes.length === 0) {
                                this._origVals = null;
                                this._changeType = CHANGE_TYPE.NONE;
                            }
                        }
                    }
                };
                Entity.prototype._onFieldChanged = function (fieldInfo) {
                    var self = this;
                    this.raisePropertyChanged(fieldInfo.fieldName);
                    if(!!fieldInfo.dependents && fieldInfo.dependents.length > 0) {
                        fieldInfo.dependents.forEach(function (d) {
                            self.raisePropertyChanged(d);
                        });
                    }
                };
                Entity.prototype._getStrValues = function (changedOnly) {
                    var self = this, names = this.getFieldNames(), dbSet = this._dbSet, res, res2;
                    res = names.map(function (name) {
                        var fld = self.getFieldInfo(name);
                        if(fld.isClientOnly) {
                            return null;
                        }
                        var newVal = dbSet._getStrValue(self._vals[name], fld), oldV = self._origVals === null ? newVal : dbSet._getStrValue(self._origVals[name], fld), isChanged = (oldV !== newVal);
                        if(isChanged) {
                            return {
                                val: newVal,
                                orig: oldV,
                                fieldName: name,
                                flags: (FLAGS.Changed | FLAGS.Setted)
                            };
                        } else if(fld.isPrimaryKey > 0 || fld.isRowTimeStamp || fld.isNeedOriginal) {
                            return {
                                val: newVal,
                                orig: oldV,
                                fieldName: name,
                                flags: FLAGS.Setted
                            };
                        } else {
                            return {
                                val: null,
                                orig: null,
                                fieldName: name,
                                flags: FLAGS.None
                            };
                        }
                    });
                    res2 = res.filter(function (v) {
                        if(!v) {
                            return false;
                        }
                        return changedOnly ? ((v.flags & FLAGS.Changed) === FLAGS.Changed) : true;
                    });
                    return res2;
                };
                Entity.prototype._getRowInfo = function () {
                    var res = {
                        values: this._getStrValues(false),
                        changeType: this._changeType,
                        serverKey: this._srvKey,
                        clientKey: this._key,
                        error: null
                    };
                    return res;
                };
                Entity.prototype._fldChanging = function (fieldInfo, oldV, newV) {
                    if(!this._origVals) {
                        this._origVals = utils.shallowCopy(this._vals);
                    }
                    return true;
                };
                Entity.prototype._fldChanged = function (fieldInfo, oldV, newV) {
                    if(!fieldInfo.isClientOnly) {
                        switch(this._changeType) {
                            case CHANGE_TYPE.NONE:
                                this._changeType = CHANGE_TYPE.UPDATED;
                                break;
                        }
                    }
                    this._onFieldChanged(fieldInfo);
                    return true;
                };
                Entity.prototype._clearFieldVal = function (fieldName) {
                    this._vals[fieldName] = null;
                };
                Entity.prototype._skipValidate = function (fieldInfo, val) {
                    var childToParentNames = this._dbSet._getChildToParentNames(fieldInfo.fieldName), res = false;
                    if(!!childToParentNames && val === null) {
                        for(var i = 0, len = childToParentNames.length; i < len; i += 1) {
                            res = !!this._getFieldVal(childToParentNames[i]);
                            if(res) {
                                break;
                            }
                        }
                    }
                    return res;
                };
                Entity.prototype._getFieldVal = function (fieldName) {
                    return this._vals[fieldName];
                };
                Entity.prototype._setFieldVal = function (fieldName, val) {
                    var validation_error, error, dbSetName = this._dbSetName, coll = this._collection, ERRS = RIAPP.ERRS, oldV = this._vals[fieldName], newV = val, fld = this.getFieldInfo(fieldName);
                    if(!fld) {
                        throw new Error(utils.format(ERRS.ERR_DBSET_INVALID_FIELDNAME, dbSetName, fieldName));
                    }
                    if(!this._isEditing && !this._isUpdating) {
                        this.beginEdit();
                    }
                    try  {
                        newV = this._checkVal(fld, newV);
                        if(oldV != newV) {
                            if(this._fldChanging(fld, oldV, newV)) {
                                this._vals[fieldName] = newV;
                                this._fldChanged(fld, oldV, newV);
                            }
                        }
                        coll._removeError(this, fieldName);
                        validation_error = this._validateField(fieldName);
                        if(!!validation_error) {
                            throw new ValidationError([
                                validation_error
                            ], this);
                        }
                    } catch (ex) {
                        if(ex instanceof ValidationError) {
                            error = ex;
                        } else {
                            error = new ValidationError([
                                {
                                    fieldName: fieldName,
                                    errors: [
                                        ex.message
                                    ]
                                }
                            ], this);
                        }
                        coll._addError(this, fieldName, error.errors[0].errors);
                        throw error;
                    }
                    return true;
                };
                Entity.prototype._onAttaching = function () {
                    _super.prototype._onAttaching.call(this);
                    this.__changeType = CHANGE_TYPE.ADDED;
                };
                Entity.prototype._onAttach = function () {
                    _super.prototype._onAttach.call(this);
                    if(this._key === null) {
                        throw new Error(RIAPP.ERRS.ERR_ITEM_IS_DETACHED);
                    }
                    this._dbSet._addToChanged(this);
                };
                Entity.prototype._beginEdit = function () {
                    if(!_super.prototype._beginEdit.call(this)) {
                        return false;
                    }
                    this._saveChangeType = this._changeType;
                    return true;
                };
                Entity.prototype._endEdit = function () {
                    if(!_super.prototype._endEdit.call(this)) {
                        return false;
                    }
                    this._saveChangeType = null;
                    return true;
                };
                Entity.prototype.deleteItem = function () {
                    return this.deleteOnSubmit();
                };
                Entity.prototype.deleteOnSubmit = function () {
                    var oldCT = this._changeType, eset = this._dbSet;
                    if(!eset._onItemDeleting(this)) {
                        return false;
                    }
                    if(this._key === null) {
                        return false;
                    }
                    if(oldCT === CHANGE_TYPE.ADDED) {
                        eset.removeItem(this);
                        return true;
                    }
                    this._changeType = CHANGE_TYPE.DELETED;
                    return true;
                };
                Entity.prototype.acceptChanges = function (rowInfo) {
                    var oldCT = this._changeType, eset = this._dbSet;
                    if(this._key === null) {
                        return;
                    }
                    if(oldCT !== CHANGE_TYPE.NONE) {
                        eset._onCommitChanges(this, true, false, oldCT);
                        if(oldCT === CHANGE_TYPE.DELETED) {
                            eset.removeItem(this);
                            return;
                        }
                        this._origVals = null;
                        if(!!this._saveVals) {
                            this._saveVals = utils.shallowCopy(this._vals);
                        }
                        this._changeType = CHANGE_TYPE.NONE;
                        eset._removeAllErrors(this);
                        if(!!rowInfo) {
                            this._refreshValues(rowInfo, REFRESH_MODE.CommitChanges);
                        }
                        eset._onCommitChanges(this, false, false, oldCT);
                    }
                };
                Entity.prototype.rejectChanges = function () {
                    var self = this, oldCT = this._changeType, eset = this._dbSet;
                    if(this._key === null) {
                        return;
                    }
                    if(oldCT !== CHANGE_TYPE.NONE) {
                        eset._onCommitChanges(this, true, true, oldCT);
                        if(oldCT === CHANGE_TYPE.ADDED) {
                            eset.removeItem(this);
                            return;
                        }
                        var changes = this._getStrValues(true);
                        if(!!this._origVals) {
                            this._vals = utils.shallowCopy(this._origVals);
                            this._origVals = null;
                            if(!!this._saveVals) {
                                this._saveVals = utils.shallowCopy(this._vals);
                            }
                        }
                        this._changeType = CHANGE_TYPE.NONE;
                        eset._removeAllErrors(this);
                        changes.forEach(function (v) {
                            self._onFieldChanged(eset.getFieldInfo(v.fieldName));
                        });
                        eset._onCommitChanges(this, false, true, oldCT);
                    }
                };
                Entity.prototype.submitChanges = function () {
                    var dbContext = this.getDbContext(), uniqueID = utils.uuid();
                    dbContext.addOnSubmitError(function (sender, args) {
                        if(args.error instanceof db.SubmitError) {
                            var submitErr = args.error;
                            if(submitErr.notValidated.length > 0) {
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
                };
                Entity.prototype.refresh = function () {
                    var eset = this._dbSet, db = eset.dbContext;
                    return db._refreshItem(this);
                };
                Entity.prototype.cancelEdit = function () {
                    if(!this._isEditing) {
                        return false;
                    }
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
                    if(isNew && this._notEdited) {
                        coll.removeItem(this);
                    }
                    coll._onEditing(this, false, true);
                    this.raisePropertyChanged('isEditing');
                    return true;
                };
                Entity.prototype.getDbContext = function () {
                    return this.__dbSet.dbContext;
                };
                Entity.prototype.getDbSet = function () {
                    return this.__dbSet;
                };
                Entity.prototype.toString = function () {
                    return 'Entity';
                };
                Entity.prototype.destroy = function () {
                    if(this._isDestroyed) {
                        return;
                    }
                    this._isDestroyCalled = true;
                    this.__dbSet = null;
                    this._srvRowKey = null;
                    this._origVals = null;
                    this._saveChangeType = null;
                    this.__isRefreshing = false;
                    this.__isCached = false;
                    _super.prototype.destroy.call(this);
                };
                Object.defineProperty(Entity.prototype, "_isCanSubmit", {
                    get: function () {
                        return true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Entity.prototype, "_changeType", {
                    get: function () {
                        return this.__changeType;
                    },
                    set: function (v) {
                        if(this.__changeType !== v) {
                            var oldChangeType = this.__changeType;
                            this.__changeType = v;
                            if(v !== CHANGE_TYPE.NONE) {
                                this._dbSet._addToChanged(this);
                            } else {
                                this._dbSet._removeFromChanged(this._key);
                            }
                            this._dbSet._onItemStatusChanged(this, oldChangeType);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Entity.prototype, "_isNew", {
                    get: function () {
                        return this.__changeType === CHANGE_TYPE.ADDED;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Entity.prototype, "_isDeleted", {
                    get: function () {
                        return this.__changeType === CHANGE_TYPE.DELETED;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Entity.prototype, "_entityType", {
                    get: function () {
                        return this.__dbSet.entityType;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Entity.prototype, "_srvKey", {
                    get: function () {
                        return this._srvRowKey;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Entity.prototype, "_dbSetName", {
                    get: function () {
                        return this.__dbSet.dbSetName;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Entity.prototype, "_serverTimezone", {
                    get: function () {
                        return this.getDbContext().serverTimezone;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Entity.prototype, "_collection", {
                    get: function () {
                        return this.__dbSet;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Entity.prototype, "_dbSet", {
                    get: function () {
                        return this.__dbSet;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Entity.prototype, "_isRefreshing", {
                    get: function () {
                        return this.__isRefreshing;
                    },
                    set: function (v) {
                        if(this.__isRefreshing !== v) {
                            this.__isRefreshing = v;
                            this.raisePropertyChanged('_isRefreshing');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Entity.prototype, "_isCached", {
                    get: function () {
                        return this.__isCached;
                    },
                    set: function (v) {
                        this.__isCached = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Entity.prototype, "isHasChanges", {
                    get: function () {
                        return this.__changeType !== CHANGE_TYPE.NONE;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Entity;
            })(MOD.collection.CollectionItem);
            db.Entity = Entity;            
            var DbSet = (function (_super) {
                __extends(DbSet, _super);
                function DbSet(opts) {
                                _super.call(this);
                    var dbContext = opts.dbContext, dbSetInfo = opts.dbSetInfo;
                    this._dbContext = dbContext;
                    this._options.dbSetName = dbSetInfo.dbSetName;
                    this._options.enablePaging = dbSetInfo.enablePaging;
                    this._options.pageSize = dbSetInfo.pageSize;
                    this._query = null;
                    this._entityType = null;
                    this._isSubmitOnDelete = false;
                    this._navfldMap = {
                    };
                    this._calcfldMap = {
                    };
                    //association infos maped by name
                    //we should track changes in navigation properties for this associations
                    this._trackAssoc = {
                    };
                    //map childToParentName by childField as a key
                    this._trackAssocMap = {
                    };
                    //map association infos by childToParent fieldname
                    this._childAssocMap = {
                    };
                    //map association infos by parentToChildren fieldname
                    this._parentAssocMap = {
                    };
                    this._changeCount = 0;
                    this._changeCache = {
                    };
                    this._ignorePageChanged = false;
                    Object.freeze(this._perms);
                }
                DbSet.prototype.getFieldInfo = function (fieldName) {
                    //for example Customer.Name
                                        var assoc, parentDB, names = fieldName.split('.');
                    if(names.length == 1) {
                        return this._fieldMap[fieldName];
                    } else if(names.length > 1) {
                        assoc = this._childAssocMap[names[0]];
                        if(!!assoc) {
                            parentDB = this.dbContext.getDbSet(assoc.parentDbSetName);
                            fieldName = names.slice(1).join('.');
                            return parentDB.getFieldInfo(fieldName);
                        }
                    }
                    throw new Error(utils.format(RIAPP.ERRS.ERR_DBSET_INVALID_FIELDNAME, this.dbSetName, fieldName));
                };
                DbSet.prototype._onError = function (error, source) {
                    return this.dbContext._onError(error, source);
                };
                DbSet.prototype._mapAssocFields = function () {
                    var tas = this._trackAssoc, assoc, tasKeys = Object.keys(tas), frel, map = this._trackAssocMap;
                    for(var i = 0, len = tasKeys.length; i < len; i += 1) {
                        assoc = tas[tasKeys[i]];
                        for(var j = 0, len2 = assoc.fieldRels.length; j < len2; j += 1) {
                            frel = assoc.fieldRels[j];
                            if(!utils.check.isArray(map[frel.childField])) {
                                map[frel.childField] = [
                                    assoc.childToParentName
                                ];
                            } else {
                                map[frel.childField].push(assoc.childToParentName);
                            }
                        }
                    }
                };
                DbSet.prototype._updatePermissions = function (perms) {
                    this._perms = perms;
                };
                DbSet.prototype._getChildToParentNames = function (childFieldName) {
                    return this._trackAssocMap[childFieldName];
                };
                DbSet.prototype._getStrValue = function (val, fieldInfo) {
                    var dcnv = fieldInfo.dateConversion, stz = this.dbContext.serverTimezone;
                    return valueUtils.stringifyValue(val, dcnv, stz);
                };
                DbSet.prototype._doNavigationField = function (opts, fInfo) {
                    var self = this, isChild = true, result = {
                        getFunc: function () {
                            throw new Error('Function is not implemented');
                        },
                        setFunc: function (v) {
                            throw new Error('Function is not implemented');
                        }
                    };
                    var assocs = opts.childAssoc.filter(function (a) {
                        return a.childToParentName == fInfo.fieldName;
                    });
                    if(assocs.length === 0) {
                        assocs = opts.parentAssoc.filter(function (a) {
                            return a.parentToChildrenName == fInfo.fieldName;
                        });
                        isChild = false;
                    }
                    if(assocs.length != 1) {
                        throw new Error(utils.format(RIAPP.ERRS.ERR_PARAM_INVALID_TYPE, 'assocs', 'Array'));
                    }
                    var assocName = assocs[0].name;
                    fInfo.isClientOnly = true;
                    fInfo.isReadOnly = true;
                    if(isChild) {
                        fInfo.isReadOnly = false;
                        self._childAssocMap[assocs[0].childToParentName] = assocs[0];
                        assocs[0].fieldRels.forEach(function (frel) {
                            var chf = self._fieldMap[frel.childField];
                            if(!fInfo.isReadOnly && chf.isReadOnly) {
                                fInfo.isReadOnly = true;
                            }
                        });
                        //this property should return parent
                        result.getFunc = function () {
                            var assoc = self.dbContext.getAssociation(assocName);
                            return assoc.getParentItem(this);
                        };
                        if(!fInfo.isReadOnly) {
                            //should track this association for new items parent - child relationship changes
                            self._trackAssoc[assocName] = assocs[0];
                            result.setFunc = function (v) {
                                var entity = this, i, len, assoc = self.dbContext.getAssociation(assocName);
                                if(!!v && !(v instanceof assoc.parentDS.entityType)) {
                                    throw new Error(utils.format(RIAPP.ERRS.ERR_PARAM_INVALID_TYPE, 'value', assoc.parentDS.dbSetName));
                                }
                                if(!!v && v._isNew) {
                                    entity._setFieldVal(fInfo.fieldName, v._key);
                                } else if(!!v) {
                                    for(i = 0 , len = assoc.childFldInfos.length; i < len; i += 1) {
                                        entity[assoc.childFldInfos[i].fieldName] = v[assoc.parentFldInfos[i].fieldName];
                                    }
                                } else {
                                    var oldKey = entity._getFieldVal(fInfo.fieldName);
                                    if(!!oldKey) {
                                        entity._setFieldVal(fInfo.fieldName, null);
                                    }
                                    for(i = 0 , len = assoc.childFldInfos.length; i < len; i += 1) {
                                        entity[assoc.childFldInfos[i].fieldName] = null;
                                    }
                                }
                            };
                        }
                    } else//if (isChild)
                     {
                        self._parentAssocMap[assocs[0].parentToChildrenName] = assocs[0];
                        //return children
                        result.getFunc = function () {
                            return self.dbContext.getAssociation(assocName).getChildItems(this);
                        };
                    }
                    return result;
                };
                DbSet.prototype._doCalculatedField = function (opts, fInfo) {
                    var self = this, result = {
                        getFunc: function () {
                            throw new Error(utils.format("Calculated field:'{0}' is not initialized", fInfo.fieldName));
                        }
                    };
                    function doDependants(f) {
                        var deps = f.dependentOn.split(',');
                        deps.forEach(function (depOn) {
                            var depOnFld = self._fieldMap[depOn];
                            if(!depOnFld) {
                                throw new Error(utils.format(RIAPP.ERRS.ERR_CALC_FIELD_DEFINE, depOn));
                            }
                            if(f.fieldName === depOn) {
                                throw new Error(utils.format(RIAPP.ERRS.ERR_CALC_FIELD_SELF_DEPEND, depOn));
                            }
                            if(depOnFld.dependents.indexOf(f.fieldName) < 0) {
                                depOnFld.dependents.push(f.fieldName);
                            }
                        });
                    }
                    ;
                    fInfo.isClientOnly = true;
                    fInfo.isReadOnly = true;
                    if(!!fInfo.dependentOn) {
                        doDependants(fInfo);
                    }
                    return result;
                };
                DbSet.prototype._fillFromService = function (data) {
                    data = utils.extend(false, {
                        res: {
                            names: [],
                            rows: [],
                            pageIndex: null,
                            pageCount: null,
                            dbSetName: this.dbSetName,
                            totalCount: null
                        },
                        isPageChanged: false,
                        fn_beforeFillEnd: null
                    }, data);
                    var self = this, res = data.res, fieldNames = res.names, rows = res.rows || [], rowCount = rows.length, entityType = this._entityType, newItems = [], positions = [], created_items = [], fetchedItems = [], isPagingEnabled = this.isPagingEnabled, RM = REFRESH_MODE.RefreshCurrent, query = this.query, clearAll = true, dataCache;
                    this._onFillStart({
                        isBegin: true,
                        rowCount: rowCount,
                        time: new Date(),
                        isPageChanged: data.isPageChanged
                    });
                    try  {
                        if(!!query) {
                            clearAll = query.isClearPrevData;
                            if(query.isClearCacheOnEveryLoad) {
                                query._clearCache();
                            }
                            if(clearAll) {
                                this.clear();
                            }
                            query._reindexCache();
                            if(query.loadPageCount > 1 && isPagingEnabled) {
                                dataCache = query._getCache();
                                if(query.isIncludeTotalCount && !utils.check.isNt(res.totalCount)) {
                                    dataCache.totalCount = res.totalCount;
                                }
                            }
                        }
                        var created_items = rows.map(function (row) {
                            //row.key already string value generated on server (no need to convert to string)
                            var key = row.key;
                            if(!key) {
                                throw new Error(RIAPP.ERRS.ERR_KEY_IS_EMPTY);
                            }
                            var item = self._itemsByKey[key];
                            if(!item) {
                                if(!!dataCache) {
                                    item = dataCache.getItemByKey(key);
                                }
                                if(!item) {
                                    item = new entityType(self, row, fieldNames);
                                } else {
                                    row.values.forEach(function (val, index) {
                                        item._refreshValue(val, fieldNames[index], RM);
                                    });
                                }
                            } else {
                                row.values.forEach(function (val, index) {
                                    item._refreshValue(val, fieldNames[index], RM);
                                });
                            }
                            return item;
                        });
                        if(!!query) {
                            if(query.isIncludeTotalCount && !utils.check.isNt(res.totalCount)) {
                                this.totalCount = res.totalCount;
                            }
                            if(query.loadPageCount > 1 && isPagingEnabled) {
                                dataCache.fillCache(res.pageIndex, created_items);
                                var pg = dataCache.getCachedPage(query.pageIndex);
                                if(!!pg) {
                                    created_items = pg.items;
                                } else {
                                    created_items = [];
                                }
                            }
                        }
                        created_items.forEach(function (item) {
                            var oldItem = this._itemsByKey[item._key];
                            if(!oldItem) {
                                this._items.push(item);
                                this._itemsByKey[item._key] = item;
                                newItems.push(item);
                                positions.push(this._items.length - 1);
                                fetchedItems.push(item);
                            } else {
                                fetchedItems.push(oldItem);
                            }
                        }, this);
                        if(newItems.length > 0) {
                            this._onItemsChanged({
                                change_type: COLL_CHANGE_TYPE.ADDED,
                                items: newItems,
                                pos: positions
                            });
                            this.raisePropertyChanged('count');
                        }
                        if(!!data.fn_beforeFillEnd) {
                            data.fn_beforeFillEnd();
                        }
                    }finally {
                        this._onFillEnd({
                            isBegin: false,
                            rowCount: fetchedItems.length,
                            time: new Date(),
                            resetUI: clearAll,
                            fetchedItems: fetchedItems,
                            newItems: newItems,
                            isPageChanged: data.isPageChanged
                        });
                    }
                    this.moveFirst();
                    return {
                        fetchedItems: fetchedItems,
                        newItems: newItems,
                        isPageChanged: data.isPageChanged,
                        outOfBandData: data.res.extraInfo
                    };
                };
                DbSet.prototype._fillFromCache = function (data) {
                    data = utils.extend(false, {
                        isPageChanged: false,
                        fn_beforeFillEnd: null
                    }, data);
                    var self = this, positions = [], fetchedItems = [], query = this.query;
                    if(!query) {
                        throw new Error(utils.format(RIAPP.ERRS.ERR_ASSERTION_FAILED, 'query is not null'));
                    }
                    var dataCache = query._getCache();
                    var cachedPage = dataCache.getCachedPage(query.pageIndex), items = !cachedPage ? [] : cachedPage.items;
                    this._onFillStart({
                        isBegin: true,
                        rowCount: items.length,
                        time: new Date(),
                        isPageChanged: data.isPageChanged
                    });
                    try  {
                        this.clear();
                        this._items = items;
                        items.forEach(function (item, index) {
                            self._itemsByKey[item._key] = item;
                            positions.push(index);
                            fetchedItems.push(item);
                        });
                        if(!!data.fn_beforeFillEnd) {
                            data.fn_beforeFillEnd();
                        }
                        if(fetchedItems.length > 0) {
                            this._onItemsChanged({
                                change_type: COLL_CHANGE_TYPE.ADDED,
                                items: fetchedItems,
                                pos: positions
                            });
                            this.raisePropertyChanged('count');
                        }
                    }finally {
                        this._onFillEnd({
                            isBegin: false,
                            rowCount: fetchedItems.length,
                            time: new Date(),
                            resetUI: true,
                            fetchedItems: fetchedItems,
                            newItems: fetchedItems,
                            isPageChanged: data.isPageChanged
                        });
                    }
                    this.moveFirst();
                    return {
                        fetchedItems: fetchedItems,
                        newItems: fetchedItems,
                        isPageChanged: data.isPageChanged,
                        outOfBandData: null
                    };
                };
                DbSet.prototype._commitChanges = function (rows) {
                    var self = this;
                    rows.forEach(function (rowInfo) {
                        var key = rowInfo.clientKey, item = self._itemsByKey[key];
                        if(!item) {
                            throw new Error(utils.format(RIAPP.ERRS.ERR_KEY_IS_NOTFOUND, key));
                        }
                        var itemCT = item._changeType;
                        item.acceptChanges(rowInfo);
                        if(itemCT === CHANGE_TYPE.ADDED) {
                            //on insert
                            delete self._itemsByKey[key];
                            item._updateKeys(rowInfo.serverKey);
                            self._itemsByKey[item._key] = item;
                            self._onItemsChanged({
                                change_type: COLL_CHANGE_TYPE.REMAP_KEY,
                                items: [
                                    item
                                ],
                                old_key: key,
                                new_key: item._key
                            });
                        }
                    });
                };
                DbSet.prototype._setItemInvalid = function (row) {
                    var keyMap = this._itemsByKey, item = keyMap[row.clientKey];
                    var errors = {
                    };
                    row.invalid.forEach(function (err) {
                        if(!err.fieldName) {
                            err.fieldName = '*';
                        }
                        if(!!errors[err.fieldName]) {
                            errors[err.fieldName].push(err.message);
                        } else {
                            errors[err.fieldName] = [
                                err.message
                            ];
                        }
                    });
                    var res = [];
                    utils.forEachProp(errors, function (fieldName) {
                        res.push({
                            fieldName: fieldName,
                            errors: errors[fieldName]
                        });
                    });
                    this._addErrors(item, res);
                    return item;
                };
                DbSet.prototype._getChanges = function () {
                    var changes = [];
                    var csh = this._changeCache;
                    utils.forEachProp(csh, function (key) {
                        var item = csh[key];
                        changes.push(item._getRowInfo());
                    });
                    return changes;
                };
                DbSet.prototype._getTrackAssocInfo = function () {
                    var self = this, res = [];
                    var csh = this._changeCache, assocNames = Object.keys(self._trackAssoc);
                    utils.forEachProp(csh, function (key) {
                        var item = csh[key];
                        assocNames.forEach(function (assocName) {
                            var assocInfo = self._trackAssoc[assocName], parentKey = item._getFieldVal(assocInfo.childToParentName), childKey = item._key;
                            if(!!parentKey && !!childKey) {
                                res.push({
                                    assocName: assocName,
                                    parentKey: parentKey,
                                    childKey: childKey
                                });
                            }
                        });
                    });
                    return res;
                };
                DbSet.prototype._getNewKey = function (item) {
                    //client's item ID
                    var key = 'clkey_' + this._newKey;
                    this._newKey += 1;
                    return key;
                };
                DbSet.prototype._createNew = function () {
                    var item = new this._entityType(this, null, null);
                    item._key = this._getNewKey(item);
                    return item;
                };
                DbSet.prototype._addToChanged = function (item) {
                    if(item._key === null) {
                        return;
                    }
                    if(!this._changeCache[item._key]) {
                        this._changeCache[item._key] = item;
                        this._changeCount += 1;
                        if(this._changeCount === 1) {
                            this.raisePropertyChanged('hasChanges');
                        }
                    }
                };
                DbSet.prototype._removeFromChanged = function (key) {
                    if(key === null) {
                        return;
                    }
                    if(!!this._changeCache[key]) {
                        delete this._changeCache[key];
                        this._changeCount -= 1;
                        if(this._changeCount === 0) {
                            this.raisePropertyChanged('hasChanges');
                        }
                    }
                };
                DbSet.prototype._clearChangeCache = function () {
                    var old = this._changeCount;
                    this._changeCache = {
                    };
                    this._changeCount = 0;
                    if(old !== this._changeCount) {
                        this.raisePropertyChanged('hasChanges');
                    }
                };
                DbSet.prototype._onItemStatusChanged = //occurs when item changeType Changed (not used in simple collections)
                function (item, oldChangeType) {
                    _super.prototype._onItemStatusChanged.call(this, item, oldChangeType);
                    if(item._isDeleted && this.isSubmitOnDelete) {
                        this.dbContext.submitChanges();
                    }
                };
                DbSet.prototype._onRemoved = function (item, pos) {
                    this._removeFromChanged(item._key);
                    _super.prototype._onRemoved.call(this, item, pos);
                };
                DbSet.prototype._onPageChanging = function () {
                    var res = _super.prototype._onPageChanging.call(this);
                    if(!res) {
                        return res;
                    }
                    if(this.hasChanges) {
                        this.rejectChanges();
                    }
                    return res;
                };
                DbSet.prototype._onPageChanged = function () {
                    this.cancelEdit();
                    _super.prototype._onPageChanged.call(this);
                    if(this._ignorePageChanged) {
                        return;
                    }
                    this.query.pageIndex = this.pageIndex;
                    this.dbContext._load(this.query, true);
                };
                DbSet.prototype._onPageSizeChanged = function () {
                    _super.prototype._onPageSizeChanged.call(this);
                    if(!!this._query) {
                        this._query.pageSize = this.pageSize;
                    }
                };
                DbSet.prototype._destroyItems = function () {
                    this._items.forEach(function (item) {
                        if(item._isCached) {
                            item.removeHandler(null, null);
                        } else {
                            item.destroy();
                        }
                    });
                };
                DbSet.prototype.sort = function (fieldNames, sortOrder) {
                    var ds = this, query = ds.query;
                    if(!!query) {
                        query.clearSort();
                        for(var i = 0; i < fieldNames.length; i += 1) {
                            if(i == 0) {
                                query.orderBy(fieldNames[i], sortOrder);
                            } else {
                                query.thenBy(fieldNames[i], sortOrder);
                            }
                        }
                        query.isClearPrevData = true;
                        query.pageIndex = 0;
                        return ds.dbContext.load(query);
                    } else {
                        return _super.prototype.sort.call(this, fieldNames, sortOrder);
                    }
                };
                DbSet.prototype.fillItems = //manually fill data from result when page is first loaded
                //from data stored inside page (without ajax request)
                //convenient for loading classifiers (for lookup data)
                function (data) {
                    var res = utils.extend(false, {
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
                };
                DbSet.prototype.defineCalculatedField = function (fieldName, getFunc) {
                    var calcDef = this._calcfldMap[fieldName];
                    if(!calcDef) {
                        throw new Error(utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'fieldName', fieldName));
                    }
                    calcDef.getFunc = getFunc;
                };
                DbSet.prototype.acceptChanges = function () {
                    var csh = this._changeCache;
                    utils.forEachProp(csh, function (key) {
                        var item = csh[key];
                        item.acceptChanges(null);
                    });
                    this._changeCount = 0;
                };
                DbSet.prototype.rejectChanges = function () {
                    var csh = this._changeCache;
                    utils.forEachProp(csh, function (key) {
                        var item = csh[key];
                        item.rejectChanges();
                    });
                };
                DbSet.prototype.deleteOnSubmit = function (item) {
                    item.deleteOnSubmit();
                };
                DbSet.prototype.clear = function () {
                    this._clearChangeCache();
                    _super.prototype.clear.call(this);
                };
                DbSet.prototype.createQuery = function (name) {
                    var queryInfo = this.dbContext._getQueryInfo(name);
                    if(!queryInfo) {
                        throw new Error(utils.format(RIAPP.ERRS.ERR_QUERY_NAME_NOTFOUND, name));
                    }
                    return new DataQuery(this, queryInfo);
                };
                DbSet.prototype.clearCache = function () {
                    var query = this._query;
                    if(!!query) {
                        query._clearCache();
                    }
                };
                DbSet.prototype.destroy = function () {
                    if(this._isDestroyed) {
                        return;
                    }
                    this._isDestroyCalled = true;
                    var query = this._query;
                    this._query = null;
                    if(!!query) {
                        query.destroy();
                    }
                    this._navfldMap = {
                    };
                    this._calcfldMap = {
                    };
                    _super.prototype.destroy.call(this);
                };
                DbSet.prototype.toString = function () {
                    return this._options.dbSetName;
                };
                Object.defineProperty(DbSet.prototype, "items", {
                    get: function () {
                        return this._items;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbSet.prototype, "dbContext", {
                    get: function () {
                        return this._dbContext;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbSet.prototype, "dbSetName", {
                    get: function () {
                        return this._options.dbSetName;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbSet.prototype, "entityType", {
                    get: function () {
                        return this._entityType;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbSet.prototype, "query", {
                    get: function () {
                        return this._query;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbSet.prototype, "hasChanges", {
                    get: function () {
                        return this._changeCount > 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbSet.prototype, "cacheSize", {
                    get: function () {
                        var query = this._query, dataCache;
                        if(!!query && query.isCacheValid) {
                            dataCache = query._getCache();
                            return dataCache.cacheSize;
                        }
                        return 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbSet.prototype, "isSubmitOnDelete", {
                    get: function () {
                        return this._isSubmitOnDelete;
                    },
                    set: function (v) {
                        if(this._isSubmitOnDelete !== v) {
                            this._isSubmitOnDelete = !!v;
                            this.raisePropertyChanged('isSubmitOnDelete');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return DbSet;
            })(MOD.collection.Collection);
            db.DbSet = DbSet;            
            var DbContext = (function (_super) {
                __extends(DbContext, _super);
                function DbContext() {
                                _super.call(this);
                    this._isInitialized = false;
                    this._dbSets = {
                    };
                    this._dbSetNames = [];
                    this._arrDbSets = [];
                    this._svcMethods = {
                    };
                    this._assoc = {
                    };
                    this._arrAssoc = [];
                    this._queryInf = {
                    };
                    this._serviceUrl = null;
                    this._isBusy = 0;
                    this._isSubmiting = false;
                    this._hasChanges = false;
                    this._pendingSubmit = null;
                    this._serverTimezone = utils.get_timeZoneOffset();
                    this._waitQueue = new RIAPP.MOD.utils.WaitQueue(this);
                }
                DbContext.prototype._getEventNames = function () {
                    var base_events = _super.prototype._getEventNames.call(this);
                    return [
                        'submit_error'
                    ].concat(base_events);
                };
                DbContext.prototype.addOnSubmitError = function (fn, namespace) {
                    this.addHandler('submit_error', fn, namespace);
                };
                DbContext.prototype.removeOnSubmitError = function (namespace) {
                    this.removeHandler('submit_error', namespace);
                };
                DbContext.prototype._onGetCalcField = function (args) {
                    this.raiseEvent('define_calc', args);
                };
                DbContext.prototype._getQueryInfo = function (name) {
                    return this._queryInf[name];
                };
                DbContext.prototype._createDbSets = function () {
                    var self = this;
                    //IS OVERRIDEN IN DESCENDANT TYPE
                    this._dbSetNames.forEach(function (dbSetName) {
                        var eSet = self._dbSets[dbSetName];
                        self._arrDbSets.push(eSet);
                        eSet.addOnPropertyChange('hasChanges', function (sender, args) {
                            self._onDbSetHasChangesChanged(sender);
                        }, null);
                    });
                    Object.freeze(this._dbSets);
                };
                DbContext.prototype._initDbSets = function () {
                    if(this._isInitialized) {
                        throw new Error(RIAPP.ERRS.ERR_DOMAIN_CONTEXT_INITIALIZED);
                    }
                    this._createDbSets();
                };
                DbContext.prototype._initAssociations = function (associations) {
                    var self = this;
                    associations.forEach(function (assoc) {
                        self._initAssociation(assoc);
                    });
                };
                DbContext.prototype._initMethods = function (methods) {
                    var self = this;
                    methods.forEach(function (info) {
                        if(info.isQuery) {
                            self._queryInf[info.methodName] = info;
                        } else {
                            //service method info
                            self._initMethod(info);
                        }
                    });
                };
                DbContext.prototype._updatePermissions = function (info) {
                    var self = this;
                    this._serverTimezone = info.serverTimezone;
                    info.permissions.forEach(function (perms) {
                        self.getDbSet(perms.dbSetName)._updatePermissions(perms);
                    });
                };
                DbContext.prototype._onDbSetHasChangesChanged = function (eSet) {
                    var old = this._hasChanges, test;
                    this._hasChanges = false;
                    if(eSet.hasChanges) {
                        this._hasChanges = true;
                    } else {
                        for(var i = 0, len = this._arrDbSets.length; i < len; i += 1) {
                            test = this._arrDbSets[i];
                            if(test.hasChanges) {
                                this._hasChanges = true;
                                break;
                            }
                        }
                    }
                    if(this._hasChanges !== old) {
                        this.raisePropertyChanged('hasChanges');
                    }
                };
                DbContext.prototype._initAssociation = function (assoc) {
                    var self = this, options = {
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
                };
                DbContext.prototype._initMethod = function (methodInfo) {
                    var self = this;
                    //function expects method parameters
                    this._svcMethods[methodInfo.methodName] = function (args) {
                        var deferred = utils.createDeferred();
                        var callback = function (res) {
                            if(!res.error) {
                                deferred.resolve(res.result);
                            } else {
                                deferred.reject();
                            }
                        };
                        try  {
                            var data = self._getMethodParams(methodInfo, args);
                            self._invokeMethod(methodInfo, data, callback);
                        } catch (ex) {
                            if(!RIAPP.global._checkIsDummy(ex)) {
                                self._onError(ex, self);
                                callback({
                                    result: null,
                                    error: ex
                                });
                            }
                        }
                        return deferred.promise();
                    };
                };
                DbContext.prototype._getMethodParams = function (methodInfo, args) {
                    var self = this, methodName = methodInfo.methodName, data = {
                        methodName: methodName,
                        paramInfo: {
                            parameters: []
                        }
                    };
                    var i, pinfos = methodInfo.parameters, len = pinfos.length, pinfo, val, value;
                    if(!args) {
                        args = {
                        };
                    }
                    for(i = 0; i < len; i += 1) {
                        pinfo = pinfos[i];
                        val = args[pinfo.name];
                        if(!pinfo.isNullable && !pinfo.isArray && pinfo.dataType !== consts.DATA_TYPE.String && utils.check.isNt(val)) {
                            throw new Error(utils.format(RIAPP.ERRS.ERR_SVC_METH_PARAM_INVALID, pinfo.name, val, methodInfo.methodName));
                        }
                        if(utils.check.isFunction(val)) {
                            throw new Error(utils.format(RIAPP.ERRS.ERR_SVC_METH_PARAM_INVALID, pinfo.name, val, methodInfo.methodName));
                        }
                        if(pinfo.isArray && !utils.check.isNt(val) && !utils.check.isArray(val)) {
                            val = [
                                val
                            ];
                        }
                        value = null;
                        if(utils.check.isArray(val)) {
                            value = [];
                            val.forEach(function (v) {
                                value.push(valueUtils.stringifyValue(v, pinfo.dateConversion, self._serverTimezone));
                            });
                            value = JSON.stringify(value);
                        } else {
                            value = valueUtils.stringifyValue(val, pinfo.dateConversion, self._serverTimezone);
                        }
                        data.paramInfo.parameters.push({
                            name: pinfo.name,
                            value: value
                        });
                    }
                    return data;
                };
                DbContext.prototype._invokeMethod = function (methodInfo, data, callback) {
                    var self = this, operType = DATA_OPER.INVOKE, postData, invokeUrl;
                    this.isBusy = true;
                    var fn_onComplete = function (res) {
                        try  {
                            if(!res) {
                                throw new Error(utils.format(RIAPP.ERRS.ERR_UNEXPECTED_SVC_ERROR, 'operation result is undefined'));
                            }
                            __checkError(res.error, operType);
                            callback({
                                result: res.result,
                                error: null
                            });
                        } catch (ex) {
                            if(RIAPP.global._checkIsDummy(ex)) {
                                return;
                            }
                            self._onDataOperError(ex, operType);
                            callback({
                                result: null,
                                error: ex
                            });
                        }
                    };
                    try  {
                        postData = JSON.stringify(data);
                        invokeUrl = this._getUrl(DATA_SVC_METH.Invoke);
                        utils.performAjaxCall(invokeUrl, postData, true, function (res) {
                            //success
                            fn_onComplete(JSON.parse(res));
                            self.isBusy = false;
                        }, function (er) {
                            //error
                            fn_onComplete({
                                result: null,
                                error: er
                            });
                            self.isBusy = false;
                        }, null);
                    } catch (ex) {
                        if(RIAPP.global._checkIsDummy(ex)) {
                            RIAPP.global._throwDummy(ex);
                        }
                        this.isBusy = false;
                        this._onDataOperError(ex, operType);
                        callback({
                            result: null,
                            error: ex
                        });
                        RIAPP.global._throwDummy(ex);
                    }
                };
                DbContext.prototype._loadFromCache = function (query, isPageChanged) {
                    var operType = DATA_OPER.LOAD, dbSet = query._dbSet, methRes;
                    try  {
                        methRes = dbSet._fillFromCache({
                            isPageChanged: isPageChanged,
                            fn_beforeFillEnd: null
                        });
                    } catch (ex) {
                        if(RIAPP.global._checkIsDummy(ex)) {
                            RIAPP.global._throwDummy(ex);
                        }
                        this._onDataOperError(ex, operType);
                        RIAPP.global._throwDummy(ex);
                    }
                    return methRes;
                };
                DbContext.prototype._loadIncluded = function (res) {
                    var self = this, hasIncluded = !!res.included && res.included.length > 0;
                    if(!hasIncluded) {
                        return;
                    }
                    res.included.forEach(function (subset) {
                        var dbSet = self.getDbSet(subset.dbSetName);
                        dbSet.fillItems(subset);
                    });
                };
                DbContext.prototype._onLoaded = function (res, isPageChanged) {
                    var self = this, operType = DATA_OPER.LOAD, dbSetName, dbSet, loadRes;
                    try  {
                        if(!res) {
                            throw new Error(utils.format(RIAPP.ERRS.ERR_UNEXPECTED_SVC_ERROR, 'null result'));
                        }
                        dbSetName = res.dbSetName;
                        dbSet = self.getDbSet(dbSetName);
                        if(!dbSet) {
                            throw new Error(utils.format(RIAPP.ERRS.ERR_DBSET_NAME_INVALID, dbSetName));
                        }
                        __checkError(res.error, operType);
                        loadRes = dbSet._fillFromService({
                            res: res,
                            isPageChanged: isPageChanged,
                            fn_beforeFillEnd: function () {
                                self._loadIncluded(res);
                            }
                        });
                    } catch (ex) {
                        if(RIAPP.global._checkIsDummy(ex)) {
                            RIAPP.global._throwDummy(ex);
                        }
                        this._onDataOperError(ex, operType);
                        RIAPP.global._throwDummy(ex);
                    }
                    return loadRes;
                };
                DbContext.prototype._dataSaved = function (res) {
                    var self = this, submitted = [], notvalid = [];
                    try  {
                        try  {
                            __checkError(res.error, DATA_OPER.SUBMIT);
                        } catch (ex) {
                            res.dbSets.forEach(function (jsDB) {
                                var eSet = self._dbSets[jsDB.dbSetName];
                                jsDB.rows.forEach(function (row) {
                                    var item = eSet.getItemByKey(row.clientKey);
                                    if(!item) {
                                        throw new Error(utils.format(RIAPP.ERRS.ERR_KEY_IS_NOTFOUND, row.clientKey));
                                    }
                                    submitted.push(item);
                                    if(!!row.invalid) {
                                        eSet._setItemInvalid(row);
                                        notvalid.push(item);
                                    }
                                });
                            });
                            throw new SubmitError(ex, submitted, notvalid);
                        }
                        res.dbSets.forEach(function (jsDB) {
                            self._dbSets[jsDB.dbSetName]._commitChanges(jsDB.rows);
                        });
                    } catch (ex) {
                        if(RIAPP.global._checkIsDummy(ex)) {
                            RIAPP.global._throwDummy(ex);
                        }
                        this._onSubmitError(ex);
                        RIAPP.global._throwDummy(ex);
                    }
                };
                DbContext.prototype._getChanges = function () {
                    var changeSet = {
                        dbSets: [],
                        error: null,
                        trackAssocs: []
                    };
                    this._arrDbSets.forEach(function (eSet) {
                        eSet.endEdit();
                        var changes = eSet._getChanges();
                        if(changes.length === 0) {
                            return;
                        }
                        //it needs to apply updates in parent-child relationship order on the server
                        //and provides child to parent map of the keys for the new entities
                        var trackAssoc = eSet._getTrackAssocInfo();
                        var jsDB = {
                            dbSetName: eSet.dbSetName,
                            rows: changes
                        };
                        changeSet.dbSets.push(jsDB);
                        changeSet.trackAssocs = changeSet.trackAssocs.concat(trackAssoc);
                    });
                    return changeSet;
                };
                DbContext.prototype._getUrl = function (action) {
                    var loadUrl = this.service_url;
                    if(!utils.str.endsWith(loadUrl, '/')) {
                        loadUrl = loadUrl + '/';
                    }
                    loadUrl = loadUrl + [
                        action, 
                        ''
                    ].join('/');
                    return loadUrl;
                };
                DbContext.prototype._onItemRefreshed = function (res, item) {
                    var operType = DATA_OPER.REFRESH;
                    try  {
                        __checkError(res.error, operType);
                        if(!res.rowInfo) {
                            item._dbSet.removeItem(item);
                            item.destroy();
                            throw new Error(RIAPP.ERRS.ERR_ITEM_DELETED_BY_ANOTHER_USER);
                        } else {
                            item._refreshValues(res.rowInfo, REFRESH_MODE.MergeIntoCurrent);
                        }
                    } catch (ex) {
                        if(RIAPP.global._checkIsDummy(ex)) {
                            RIAPP.global._throwDummy(ex);
                        }
                        this._onDataOperError(ex, operType);
                        RIAPP.global._throwDummy(ex);
                    }
                };
                DbContext.prototype._refreshItem = function (item) {
                    var deferred = utils.createDeferred(), callback = function (isOk) {
                        if(isOk) {
                            deferred.resolve(item);
                        } else {
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
                            }, fn_onErr = function (ex) {
                                fn_onEnd();
                                self._onDataOperError(ex, operType);
                            }, fn_onOK = function (res) {
                                self._onItemRefreshed(res, item);
                                fn_onEnd();
                            };
                            item._isRefreshing = true;
                            self.isBusy = true;
                            dbSet.isLoading = true;
                            try  {
                                var request = {
                                    dbSetName: item._dbSetName,
                                    rowInfo: item._getRowInfo(),
                                    error: null
                                };
                                item._checkCanRefresh();
                                postData = JSON.stringify(request);
                                utils.performAjaxCall(url, postData, true, function (res) {
                                    //success
                                    try  {
                                        fn_onOK(JSON.parse(res));
                                        callback(true);
                                    } catch (ex) {
                                        fn_onErr(ex);
                                        callback(false);
                                    }
                                }, function (er) {
                                    //error
                                    fn_onEnd();
                                    self._onDataOperError(er, operType);
                                    callback(false);
                                }, null);
                            } catch (ex) {
                                fn_onErr(ex);
                                callback(false);
                            }
                        }, [], true, null);
                    }, [], null);
                    return deferred.promise();
                };
                DbContext.prototype._onError = function (error, source) {
                    var isHandled = _super.prototype._onError.call(this, error, source);
                    if(!isHandled) {
                        return RIAPP.global._onError(error, source);
                    }
                    return isHandled;
                };
                DbContext.prototype._onDataOperError = function (ex, oper) {
                    if(RIAPP.global._checkIsDummy(ex)) {
                        return true;
                    }
                    var er;
                    if(ex instanceof DataOperationError) {
                        er = ex;
                    } else {
                        er = new DataOperationError(ex, oper);
                    }
                    return this._onError(er, this);
                };
                DbContext.prototype._onSubmitError = function (error) {
                    var args = {
                        error: error,
                        isHandled: false
                    };
                    this.raiseEvent('submit_error', args);
                    if(!args.isHandled) {
                        this.rejectChanges();
                        this._onDataOperError(error, DATA_OPER.SUBMIT);
                    }
                };
                DbContext.prototype._beforeLoad = function (query, oldQuery, dbSet) {
                    if(query && oldQuery !== query) {
                        dbSet._query = query;
                        dbSet.pageIndex = 0;
                    }
                    if(!!oldQuery && oldQuery !== query) {
                        oldQuery.destroy();
                    }
                    if(query.pageSize !== dbSet.pageSize) {
                        dbSet._ignorePageChanged = true;
                        try  {
                            dbSet.pageIndex = 0;
                            dbSet.pageSize = query.pageSize;
                        }finally {
                            dbSet._ignorePageChanged = false;
                        }
                    }
                    if(query.pageIndex !== dbSet.pageIndex) {
                        dbSet._ignorePageChanged = true;
                        try  {
                            dbSet.pageIndex = query.pageIndex;
                        }finally {
                            dbSet._ignorePageChanged = false;
                        }
                    }
                    if(!query.isCacheValid) {
                        query._clearCache();
                    }
                };
                DbContext.prototype._load = function (query, isPageChanged) {
                    if(!query) {
                        throw new Error(RIAPP.ERRS.ERR_DB_LOAD_NO_QUERY);
                    }
                    var self = this, deferred = utils.createDeferred();
                    var fn_onComplete = function (isOk, res) {
                        if(isOk) {
                            deferred.resolve(res);
                        } else {
                            deferred.reject();
                        }
                    };
                    var loadPageCount = query.loadPageCount, pageIndex = query.pageIndex, isPagingEnabled = query.isPagingEnabled, dbSetName = query.dbSetName, dbSet = this.getDbSet(dbSetName);
                    //this wait is asynchronous
                    this.waitForNotSubmiting(function () {
                        dbSet.waitForNotLoading(function () {
                            var oldQuery = dbSet.query;
                            var loadUrl = self._getUrl(DATA_SVC_METH.LoadData), requestInfo, postData, operType = DATA_OPER.LOAD, fn_onEnd = function () {
                                dbSet.isLoading = false;
                                self.isBusy = false;
                            }, fn_onOK = function (res) {
                                fn_onEnd();
                                fn_onComplete(true, res);
                            }, fn_onErr = function (ex) {
                                fn_onEnd();
                                self._onDataOperError(ex, operType);
                                fn_onComplete(false, null);
                            }, fn_onErr2 = function (ex) {
                                fn_onEnd();
                                self._onDataOperError(ex, operType);
                                fn_onComplete(false, null);
                            }, loadRes, range, pageCount = 1;
                            dbSet.isLoading = true;
                            self.isBusy = true;
                            try  {
                                //restore pageIndex
                                query.pageIndex = pageIndex;
                                self._beforeLoad(query, oldQuery, dbSet);
                                if(loadPageCount > 1 && isPagingEnabled) {
                                    if(query._isPageCached(pageIndex)) {
                                        loadRes = self._loadFromCache(query, isPageChanged);
                                        fn_onOK(loadRes);
                                        return;
                                    } else {
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
                                utils.performAjaxCall(loadUrl, postData, true, function (res) {
                                    //success
                                                                        var data = [], idx;
                                    try  {
                                        idx = res.indexOf(RIAPP.MOD.consts.CHUNK_SEP);
                                        if(idx > -1) {
                                            //rows were serialized separately
                                            //the first item is getDataResult
                                            data.push(res.substr(0, idx));
                                            //the rest is rows
                                            data.push(res.substr(idx + RIAPP.MOD.consts.CHUNK_SEP.length));
                                        } else {
                                            //all response is serialized as getDataResult
                                            data.push(res);
                                        }
                                        data = data.map(function (txt) {
                                            return JSON.parse(txt);
                                        });
                                        //let the UI some time, then do the rest of the work
                                        setTimeout(function () {
                                            //first item is GetDataResult
                                                                                        var allRows, getDataResult = data[0];
                                            var hasIncluded = !!getDataResult.included && getDataResult.included.length > 0;
                                            try  {
                                                //rows was loaded separately from GetDataResult
                                                if(data.length > 1) {
                                                    allRows = data[1];
                                                    if(allRows && allRows.length > 0) {
                                                        if(hasIncluded) {
                                                            getDataResult.included.forEach(function (subset) {
                                                                subset.rows = allRows.splice(0, subset.rowCount);
                                                                if(subset.rowCount != subset.rows.length) {
                                                                    throw new Error(utils.format(RIAPP.ERRS.ERR_ASSERTION_FAILED, 'subset.rowCount == subset.rows.length'));
                                                                }
                                                            });
                                                        }
                                                        getDataResult.rows = allRows;
                                                        if(getDataResult.rowCount != getDataResult.rows.length) {
                                                            throw new Error(utils.format(RIAPP.ERRS.ERR_ASSERTION_FAILED, 'getDataResult.rowCount == getDataResult.rows.length'));
                                                        }
                                                    }
                                                }
                                                loadRes = self._onLoaded(getDataResult, isPageChanged);
                                                fn_onOK(loadRes);
                                            } catch (ex) {
                                                fn_onErr(ex);
                                            }
                                        }, 0);
                                    } catch (ex) {
                                        fn_onErr(ex);
                                    }
                                }, function (er) {
                                    //error
                                    fn_onErr2(er);
                                }, null);
                            } catch (ex) {
                                fn_onErr(ex);
                            }
                        }, [], true, isPageChanged ? 'paging' : null);
                    }, [], isPageChanged ? 'paging' : null);
                    return deferred.promise();
                };
                DbContext.prototype.getDbSet = function (name) {
                    var eSet = this._dbSets[name];
                    if(!eSet) {
                        throw new Error(utils.format(RIAPP.ERRS.ERR_DBSET_NAME_INVALID, name));
                    }
                    return eSet;
                };
                DbContext.prototype.getAssociation = function (name) {
                    var name2 = "get" + name;
                    var f = this._assoc[name2];
                    if(!f) {
                        throw new Error(utils.format(RIAPP.ERRS.ERR_ASSOC_NAME_INVALID, name));
                    }
                    return f();
                };
                DbContext.prototype.submitChanges = //returns promise
                function () {
                    //dont submit when the submit already in the queue
                    if(!!this._pendingSubmit) {
                        //return promise for the already enqueued submit
                        return this._pendingSubmit.deferred.promise();
                    }
                    var self = this, submitState = {
                        deferred: utils.createDeferred()
                    };
                    var callback = function (isOk) {
                        if(isOk) {
                            submitState.deferred.resolve();
                        } else {
                            submitState.deferred.reject();
                        }
                    };
                    this._pendingSubmit = submitState;
                    //this wait is asynchronous
                    this.waitForNotBusy(function () {
                        var url, postData, operType = DATA_OPER.SUBMIT, changeSet;
                        var fn_onEnd = function () {
                            self.isBusy = false;
                            self.isSubmiting = false;
                        }, fn_onErr = function (ex) {
                            fn_onEnd();
                            self._onDataOperError(ex, operType);
                            callback(false);
                        };
                        try  {
                            self.isBusy = true;
                            self.isSubmiting = true;
                            self._pendingSubmit = null//allow to post new submit
                            ;
                            url = self._getUrl(DATA_SVC_METH.Submit);
                            changeSet = self._getChanges();
                            if(changeSet.dbSets.length === 0) {
                                fn_onEnd();
                                callback(true);
                                return;
                            }
                        } catch (ex) {
                            fn_onErr(ex);
                            return;
                        }
                        try  {
                            postData = JSON.stringify(changeSet);
                            utils.performAjaxCall(url, postData, true, function (res) {
                                //success
                                try  {
                                    self._dataSaved(JSON.parse(res));
                                    fn_onEnd();
                                    callback(true);
                                } catch (ex) {
                                    fn_onErr(ex);
                                }
                            }, function (er) {
                                //submit error
                                fn_onEnd();
                                self._onSubmitError(er);
                                callback(false);
                            }, null);
                        } catch (ex) {
                            fn_onErr(ex);
                        }
                    }, []);
                    return submitState.deferred.promise();
                };
                DbContext.prototype.load = //returns promise
                function (query) {
                    return this._load(query, false);
                };
                DbContext.prototype.acceptChanges = function () {
                    this._arrDbSets.forEach(function (eSet) {
                        eSet.acceptChanges();
                    });
                };
                DbContext.prototype.rejectChanges = function () {
                    this._arrDbSets.forEach(function (eSet) {
                        eSet.rejectChanges();
                    });
                };
                DbContext.prototype.initialize = function (options) {
                    if(this._isInitialized) {
                        return;
                    }
                    var self = this, opts = utils.extend(false, {
                        serviceUrl: null,
                        permissions: null
                    }, options);
                    this._serviceUrl = opts.serviceUrl;
                    this._initDbSets();
                    if(!!opts.permissions) {
                        self._updatePermissions(opts.permissions);
                        self._isInitialized = true;
                        self.raisePropertyChanged('isInitialized');
                        return;
                    }
                    //initialize by obtaining metadata from the data service by ajax call
                                        var loadUrl = this._getUrl(DATA_SVC_METH.GetPermissions), operType = DATA_OPER.INIT;
                    try  {
                        this.isBusy = true;
                        utils.performAjaxCall(loadUrl, undefined, true, function (permissions) {
                            //success
                            try  {
                                self._updatePermissions(JSON.parse(permissions));
                                self.isBusy = false;
                                self._isInitialized = true;
                                self.raisePropertyChanged('isInitialized');
                            } catch (ex) {
                                self.isBusy = false;
                                self._onDataOperError(ex, operType);
                                RIAPP.global._throwDummy(ex);
                            }
                        }, function (er) {
                            //error
                            self.isBusy = false;
                            self._onDataOperError(er, operType);
                        }, null);
                    } catch (ex) {
                        this.isBusy = false;
                        this._onDataOperError(ex, operType);
                        RIAPP.global._throwDummy(ex);
                    }
                };
                DbContext.prototype.waitForNotBusy = function (callback, callbackArgs) {
                    this._waitQueue.enQueue({
                        prop: 'isBusy',
                        groupName: null,
                        predicate: function (val) {
                            return !val;
                        },
                        action: callback,
                        actionArgs: callbackArgs
                    });
                };
                DbContext.prototype.waitForNotSubmiting = function (callback, callbackArgs, groupName) {
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
                };
                DbContext.prototype.waitForInitialized = function (callback, callbackArgs) {
                    this._waitQueue.enQueue({
                        prop: 'isInitialized',
                        groupName: 'dbContext',
                        predicate: function (val) {
                            return !!val;
                        },
                        action: callback,
                        actionArgs: callbackArgs
                    });
                };
                DbContext.prototype.destroy = function () {
                    if(this._isDestroyed) {
                        return;
                    }
                    this._isDestroyCalled = true;
                    this._waitQueue.destroy();
                    this._waitQueue = null;
                    this._arrAssoc.forEach(function (assoc) {
                        assoc.destroy();
                    });
                    this._arrAssoc = [];
                    this._assoc = {
                    };
                    this._arrDbSets.forEach(function (dbSet) {
                        dbSet.destroy();
                    });
                    this._arrDbSets = [];
                    this._dbSets = {
                    };
                    this._svcMethods = {
                    };
                    this._queryInf = {
                    };
                    this._serviceUrl = null;
                    this._isInitialized = false;
                    this._isBusy = 0;
                    this._isSubmiting = false;
                    this._hasChanges = false;
                    _super.prototype.destroy.call(this);
                };
                Object.defineProperty(DbContext.prototype, "service_url", {
                    get: function () {
                        return this._serviceUrl;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbContext.prototype, "isInitialized", {
                    get: function () {
                        return this._isInitialized;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbContext.prototype, "isBusy", {
                    get: function () {
                        return this._isBusy > 0;
                    },
                    set: function (v) {
                        var old = this._isBusy > 0, cur;
                        if(!v) {
                            this._isBusy -= 1;
                            if(this._isBusy < 0) {
                                this._isBusy = 0;
                            }
                        } else {
                            this._isBusy += 1;
                        }
                        cur = this._isBusy > 0;
                        if(cur != old) {
                            this.raisePropertyChanged('isBusy');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbContext.prototype, "isSubmiting", {
                    get: function () {
                        return this._isSubmiting;
                    },
                    set: function (v) {
                        if(this._isSubmiting !== v) {
                            this._isSubmiting = v;
                            this.raisePropertyChanged('isSubmiting');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbContext.prototype, "serverTimezone", {
                    get: function () {
                        return this._serverTimezone;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbContext.prototype, "dbSets", {
                    get: function () {
                        return this._dbSets;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbContext.prototype, "arrDbSets", {
                    get: function () {
                        return this._arrDbSets;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbContext.prototype, "serviceMethods", {
                    get: function () {
                        return this._svcMethods;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbContext.prototype, "hasChanges", {
                    get: function () {
                        return this._hasChanges;
                    },
                    enumerable: true,
                    configurable: true
                });
                return DbContext;
            })(RIAPP.BaseObject);
            db.DbContext = DbContext;            
            var Association = (function (_super) {
                __extends(Association, _super);
                function Association(options) {
                                _super.call(this);
                    var self = this;
                    this._objId = 'ass' + utils.getNewID();
                    var opts = utils.extend(false, {
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
                    this._parentDS = opts.dbContext.dbSets[opts.parentName];
                    this._childDS = opts.dbContext.dbSets[opts.childName];
                    this._parentFldInfos = opts.parentKeyFields.map(function (name) {
                        return self._parentDS.getFieldInfo(name);
                    });
                    this._childFldInfos = opts.childKeyFields.map(function (name) {
                        return self._childDS.getFieldInfo(name);
                    });
                    this._parentToChildrenName = opts.parentToChildrenName;
                    this._childToParentName = opts.childToParentName;
                    this._parentMap = {
                    };
                    this._childMap = {
                    };
                    this._isParentFilling = false;
                    this._isChildFilling = false;
                    this._bindParentDS();
                    var changed1 = this._mapParentItems(this._parentDS.items);
                    this._bindChildDS();
                    var changed2 = this._mapChildren(this._childDS.items);
                    this._saveParentFKey = null;
                    this._saveChildFKey = null;
                    this._changedTimeout = null;
                    this._changed = {
                    };
                    self._notifyParentChanged(changed1);
                    self._notifyChildrenChanged(changed2);
                }
                Association.prototype._onError = function (error, source) {
                    var isHandled = _super.prototype._onError.call(this, error, source);
                    if(!isHandled) {
                        return RIAPP.global._onError(error, source);
                    }
                    return isHandled;
                };
                Association.prototype._bindParentDS = function () {
                    var self = this, ds = this._parentDS;
                    if(!ds) {
                        return;
                    }
                    ds._addHandler('coll_changed', function (sender, args) {
                        if(ds !== sender) {
                            return;
                        }
                        self._onParentCollChanged(args);
                    }, self._objId, true);
                    ds._addHandler('fill', function (sender, args) {
                        if(ds !== sender) {
                            return;
                        }
                        self._onParentFill(args);
                    }, self._objId, true);
                    ds._addHandler('begin_edit', function (sender, args) {
                        if(ds !== sender) {
                            return;
                        }
                        self._onParentEdit(args.item, true, undefined);
                    }, self._objId, true);
                    ds._addHandler('end_edit', function (sender, args) {
                        if(ds !== sender) {
                            return;
                        }
                        self._onParentEdit(args.item, false, args.isCanceled);
                    }, self._objId, true);
                    ds._addHandler('item_deleting', function (sender, args) {
                    }, self._objId, true);
                    ds._addHandler('status_changed', function (sender, args) {
                        if(ds !== sender) {
                            return;
                        }
                        self._onParentStatusChanged(args.item, args.oldChangeType);
                    }, self._objId, true);
                    ds._addHandler('commit_changes', function (sender, args) {
                        if(ds !== sender) {
                            return;
                        }
                        self._onParentCommitChanges(args.item, args.isBegin, args.isRejected, args.changeType);
                    }, self._objId, true);
                };
                Association.prototype._bindChildDS = function () {
                    var self = this, ds = this._childDS;
                    if(!ds) {
                        return;
                    }
                    ds._addHandler('coll_changed', function (sender, args) {
                        if(ds !== sender) {
                            return;
                        }
                        self._onChildCollChanged(args);
                    }, self._objId, true);
                    ds._addHandler('fill', function (sender, args) {
                        if(ds !== sender) {
                            return;
                        }
                        self._onChildFill(args);
                    }, self._objId, true);
                    ds._addHandler('begin_edit', function (sender, args) {
                        if(ds !== sender) {
                            return;
                        }
                        self._onChildEdit(args.item, true, undefined);
                    }, self._objId, true);
                    ds._addHandler('end_edit', function (sender, args) {
                        if(ds !== sender) {
                            return;
                        }
                        self._onChildEdit(args.item, false, args.isCanceled);
                    }, self._objId, true);
                    ds._addHandler('status_changed', function (sender, args) {
                        if(ds !== sender) {
                            return;
                        }
                        self._onChildStatusChanged(args.item, args.oldChangeType);
                    }, self._objId, true);
                    ds._addHandler('commit_changes', function (sender, args) {
                        if(ds !== sender) {
                            return;
                        }
                        self._onChildCommitChanges(args.item, args.isBegin, args.isRejected, args.changeType);
                    }, self._objId, true);
                };
                Association.prototype._onParentCollChanged = function (args) {
                    var self = this, CH_T = COLL_CHANGE_TYPE, item, items = args.items, changed = [], changedKeys = {
                    };
                    switch(args.change_type) {
                        case CH_T.RESET:
                            if(!self._isParentFilling) {
                                changed = self.refreshParentMap();
                            }
                            break;
                        case CH_T.ADDED:
                            if(!this._isParentFilling) {
                                //if items are filling then it will be appended when fill ends
                                changed = self._mapParentItems(items);
                            }
                            break;
                        case CH_T.REMOVE:
                            items.forEach(function (item) {
                                var key = self._unMapParentItem(item);
                                if(!!key) {
                                    changedKeys[key] = null;
                                }
                            });
                            changed = Object.keys(changedKeys);
                            break;
                        case CH_T.REMAP_KEY:
 {
                                if(!!args.old_key) {
                                    item = this._parentMap[args.old_key];
                                    if(!!item) {
                                        delete this._parentMap[args.old_key];
                                        changed = this._mapParentItems([
                                            item
                                        ]);
                                    }
                                }
                            }
                            break;
                        default:
                            throw new Error(utils.format(RIAPP.ERRS.ERR_COLLECTION_CHANGETYPE_INVALID, args.change_type));
                    }
                    self._notifyParentChanged(changed);
                };
                Association.prototype._onParentFill = function (args) {
                    var isEnd = !args.isBegin, self = this, changed;
                    if(isEnd) {
                        self._isParentFilling = false;
                        if(args.resetUI) {
                            changed = self.refreshParentMap();
                        } else {
                            changed = self._mapParentItems(args.newItems);
                        }
                        self._notifyParentChanged(changed);
                    } else {
                        self._isParentFilling = true;
                    }
                };
                Association.prototype._onParentEdit = function (item, isBegin, isCanceled) {
                    var self = this;
                    if(isBegin) {
                        self._storeParentFKey(item);
                    } else {
                        if(!isCanceled) {
                            self._checkParentFKey(item);
                        } else {
                            self._saveParentFKey = null;
                        }
                    }
                };
                Association.prototype._onParentCommitChanges = function (item, isBegin, isRejected, changeType) {
                    var self = this, fkey;
                    if(isBegin) {
                        if(isRejected && changeType === CHANGE_TYPE.ADDED) {
                            fkey = this._unMapParentItem(item);
                            if(!!fkey) {
                                self._notifyParentChanged([
                                    fkey
                                ]);
                            }
                            return;
                        } else if(!isRejected && changeType === CHANGE_TYPE.DELETED) {
                            fkey = this._unMapParentItem(item);
                            if(!!fkey) {
                                self._notifyParentChanged([
                                    fkey
                                ]);
                            }
                            return;
                        }
                        self._storeParentFKey(item);
                    } else {
                        self._checkParentFKey(item);
                    }
                };
                Association.prototype._storeParentFKey = function (item) {
                    var self = this, fkey = self.getParentFKey(item);
                    if(fkey !== null && !!self._parentMap[fkey]) {
                        self._saveParentFKey = fkey;
                    }
                };
                Association.prototype._checkParentFKey = function (item) {
                    var self = this, fkey, savedKey = self._saveParentFKey;
                    self._saveParentFKey = null;
                    fkey = self.getParentFKey(item);
                    if(fkey !== savedKey) {
                        if(!!savedKey) {
                            delete self._parentMap[savedKey];
                            self._notifyChildrenChanged([
                                savedKey
                            ]);
                            self._notifyParentChanged([
                                savedKey
                            ]);
                        }
                        if(!!fkey) {
                            self._mapParentItems([
                                item
                            ]);
                            self._notifyChildrenChanged([
                                fkey
                            ]);
                            self._notifyParentChanged([
                                fkey
                            ]);
                        }
                    }
                };
                Association.prototype._onParentStatusChanged = function (item, oldChangeType) {
                    var self = this, DEL_STATUS = CHANGE_TYPE.DELETED, newChangeType = item._changeType, fkey;
                    var children, DA = DELETE_ACTION;
                    if(newChangeType === DEL_STATUS) {
                        children = self.getChildItems(item);
                        fkey = this._unMapParentItem(item);
                        switch(self.onDeleteAction) {
                            case DA.NoAction:
                                //nothing
                                break;
                            case DA.Cascade:
                                children.forEach(function (child) {
                                    child.deleteItem();
                                });
                                break;
                            case DA.SetNulls:
                                children.forEach(function (child) {
                                    var isEdit = child.isEditing;
                                    if(!isEdit) {
                                        child.beginEdit();
                                    }
                                    try  {
                                        self._childFldInfos.forEach(function (f) {
                                            child[f.fieldName] = null;
                                        });
                                        if(!isEdit) {
                                            child.endEdit();
                                        }
                                    }finally {
                                        if(!isEdit) {
                                            child.cancelEdit();
                                        }
                                    }
                                });
                                break;
                        }
                        if(!!fkey) {
                            self._notifyParentChanged([
                                fkey
                            ]);
                        }
                    }
                };
                Association.prototype._onChildCollChanged = function (args) {
                    var self = this, CH_T = COLL_CHANGE_TYPE, item, items = args.items, changed = [], changedKeys = {
                    };
                    switch(args.change_type) {
                        case CH_T.RESET:
                            if(!self._isChildFilling) {
                                changed = self.refreshChildMap();
                            }
                            break;
                        case CH_T.ADDED:
                            if(!this._isChildFilling) {
                                //if items are filling then it will be appended when fill ends
                                changed = self._mapChildren(items);
                            }
                            break;
                        case CH_T.REMOVE:
                            items.forEach(function (item) {
                                var key = self._unMapChildItem(item);
                                if(!!key) {
                                    changedKeys[key] = null;
                                }
                            });
                            changed = Object.keys(changedKeys);
                            break;
                        case CH_T.REMAP_KEY:
 {
                                if(!!args.old_key) {
                                    item = items[0];
                                    if(!!item) {
                                        var parentKey = item._getFieldVal(this._childToParentName);
                                        if(!!parentKey) {
                                            delete this._childMap[parentKey];
                                            item._clearFieldVal(this._childToParentName);
                                        }
                                        changed = this._mapChildren([
                                            item
                                        ]);
                                    }
                                }
                            }
                            break;
                        default:
                            throw new Error(utils.format(RIAPP.ERRS.ERR_COLLECTION_CHANGETYPE_INVALID, args.change_type));
                    }
                    self._notifyChildrenChanged(changed);
                };
                Association.prototype._notifyChildrenChanged = function (changed) {
                    this._notifyChanged([], changed);
                };
                Association.prototype._notifyParentChanged = function (changed) {
                    this._notifyChanged(changed, []);
                };
                Association.prototype._notifyChanged = function (changed_pkeys, changed_ckeys) {
                    var self = this;
                    if(changed_pkeys.length > 0 || changed_ckeys.length > 0) {
                        changed_pkeys.forEach(function (key) {
                            var res = self._changed[key];
                            if(!res) {
                                res = 1;
                            } else {
                                res = res | 1;
                            }
                            self._changed[key] = res;
                        });
                        changed_ckeys.forEach(function (key) {
                            var res = self._changed[key];
                            if(!res) {
                                res = 2;
                            } else {
                                res = res | 2;
                            }
                            self._changed[key] = res;
                        });
                        if(!this._changedTimeout) {
                            this._changedTimeout = setTimeout(function () {
                                if(self._isDestroyCalled) {
                                    return;
                                }
                                self._changedTimeout = null;
                                var changed = self._changed;
                                self._changed = {
                                };
                                var keys = Object.keys(changed);
                                keys.forEach(function (fkey) {
                                    var res = changed[fkey];
                                    if((res & 1) == 1) {
                                        self._onParentChanged(fkey);
                                    }
                                    if((res & 2) == 2) {
                                        self._onChildrenChanged(fkey);
                                    }
                                });
                            }, 50);
                        }
                    }
                };
                Association.prototype._onChildFill = function (args) {
                    var isEnd = !args.isBegin, self = this, changed;
                    if(isEnd) {
                        self._isChildFilling = false;
                        if(args.resetUI) {
                            changed = self.refreshChildMap();
                        } else {
                            changed = self._mapChildren(args.newItems);
                        }
                        self._notifyChildrenChanged(changed);
                    } else {
                        self._isChildFilling = true;
                    }
                };
                Association.prototype._onChildEdit = function (item, isBegin, isCanceled) {
                    var self = this;
                    if(isBegin) {
                        self._storeChildFKey(item);
                    } else {
                        if(!isCanceled) {
                            self._checkChildFKey(item);
                        } else {
                            self._saveChildFKey = null;
                        }
                    }
                };
                Association.prototype._onChildCommitChanges = function (item, isBegin, isRejected, changeType) {
                    var self = this, fkey;
                    if(isBegin) {
                        if(isRejected && changeType === CHANGE_TYPE.ADDED) {
                            fkey = this._unMapChildItem(item);
                            if(!!fkey) {
                                self._notifyChildrenChanged([
                                    fkey
                                ]);
                            }
                            return;
                        } else if(!isRejected && changeType === CHANGE_TYPE.DELETED) {
                            fkey = self._unMapChildItem(item);
                            if(!!fkey) {
                                self._notifyChildrenChanged([
                                    fkey
                                ]);
                            }
                            return;
                        }
                        self._storeChildFKey(item);
                    } else {
                        self._checkChildFKey(item);
                    }
                };
                Association.prototype._storeChildFKey = function (item) {
                    var self = this, fkey = self.getChildFKey(item), arr;
                    if(!!fkey) {
                        arr = self._childMap[fkey];
                        if(!!arr && arr.indexOf(item) > -1) {
                            self._saveChildFKey = fkey;
                        }
                    }
                };
                Association.prototype._checkChildFKey = function (item) {
                    var self = this, savedKey = self._saveChildFKey, fkey, arr;
                    self._saveChildFKey = null;
                    fkey = self.getChildFKey(item);
                    if(fkey !== savedKey) {
                        if(!!savedKey) {
                            arr = self._childMap[savedKey];
                            utils.removeFromArray(arr, item);
                            if(arr.length == 0) {
                                delete self._childMap[savedKey];
                            }
                            self._notifyParentChanged([
                                savedKey
                            ]);
                            self._notifyChildrenChanged([
                                savedKey
                            ]);
                        }
                        if(!!fkey) {
                            self._mapChildren([
                                item
                            ]);
                            self._notifyParentChanged([
                                fkey
                            ]);
                            self._notifyChildrenChanged([
                                fkey
                            ]);
                        }
                    }
                };
                Association.prototype._onChildStatusChanged = function (item, oldChangeType) {
                    var self = this, DEL_STATUS = CHANGE_TYPE.DELETED, newChangeType = item._changeType;
                    var fkey = self.getChildFKey(item);
                    if(!fkey) {
                        return;
                    }
                    if(newChangeType === DEL_STATUS) {
                        fkey = self._unMapChildItem(item);
                        if(!!fkey) {
                            self._notifyChildrenChanged([
                                fkey
                            ]);
                        }
                    }
                };
                Association.prototype._getItemKey = function (finf, ds, item) {
                    var arr = [], val, strval;
                    for(var i = 0, len = finf.length; i < len; i += 1) {
                        val = item[finf[i].fieldName];
                        strval = ds._getStrValue(val, finf[i]);
                        if(strval === null) {
                            return null;
                        }
                        arr.push(strval);
                    }
                    return arr.join(';');
                };
                Association.prototype._resetChildMap = function () {
                    var self = this, fkeys = Object.keys(this._childMap);
                    this._childMap = {
                    };
                    self._notifyChildrenChanged(fkeys);
                };
                Association.prototype._resetParentMap = function () {
                    var self = this, fkeys = Object.keys(this._parentMap);
                    this._parentMap = {
                    };
                    self._notifyParentChanged(fkeys);
                };
                Association.prototype._unMapChildItem = function (item) {
                    var fkey, arr, idx, changedKey = null;
                    fkey = this.getChildFKey(item);
                    if(!!fkey) {
                        arr = this._childMap[fkey];
                        if(!!arr) {
                            idx = utils.removeFromArray(arr, item);
                            if(idx > -1) {
                                if(arr.length == 0) {
                                    delete this._childMap[fkey];
                                }
                                changedKey = fkey;
                            }
                        }
                    }
                    return changedKey;
                };
                Association.prototype._unMapParentItem = function (item) {
                    var fkey, changedKey = null;
                    fkey = this.getParentFKey(item);
                    if(!!fkey && !!this._parentMap[fkey]) {
                        delete this._parentMap[fkey];
                        changedKey = fkey;
                    }
                    return changedKey;
                };
                Association.prototype._mapParentItems = function (items) {
                    var item, fkey, DEL_STATUS = CHANGE_TYPE.DELETED, chngType, old, chngedKeys = {
                    };
                    for(var i = 0, len = items.length; i < len; i += 1) {
                        item = items[i];
                        chngType = item._changeType;
                        if(chngType === DEL_STATUS) {
                            continue;
                        }
                        fkey = this.getParentFKey(item);
                        if(!!fkey) {
                            old = this._parentMap[fkey];
                            if(old !== item) {
                                //map items by foreign keys
                                this._parentMap[fkey] = item;
                                chngedKeys[fkey] = null;
                            }
                        }
                    }
                    return Object.keys(chngedKeys);
                };
                Association.prototype._onChildrenChanged = function (fkey) {
                    if(!!fkey && !!this._parentToChildrenName) {
                        var obj = this._parentMap[fkey];
                        if(!!obj) {
                            obj.raisePropertyChanged(this._parentToChildrenName);
                        }
                    }
                };
                Association.prototype._onParentChanged = function (fkey) {
                    var self = this, arr;
                    if(!!fkey && !!this._childToParentName) {
                        arr = this._childMap[fkey];
                        if(!!arr) {
                            arr.forEach(function (item) {
                                item.raisePropertyChanged(self._childToParentName);
                            });
                        }
                    }
                };
                Association.prototype._mapChildren = function (items) {
                    var item, fkey, arr, DEL_STATUS = CHANGE_TYPE.DELETED, chngType, chngedKeys = {
                    };
                    for(var i = 0, len = items.length; i < len; i += 1) {
                        item = items[i];
                        chngType = item._changeType;
                        if(chngType === DEL_STATUS) {
                            continue;
                        }
                        fkey = this.getChildFKey(item);
                        if(!!fkey) {
                            arr = this._childMap[fkey];
                            if(!arr) {
                                arr = [];
                                this._childMap[fkey] = arr;
                            }
                            if(arr.indexOf(item) < 0) {
                                arr.push(item);
                                if(!chngedKeys[fkey]) {
                                    chngedKeys[fkey] = null;
                                }
                            }
                        }
                    }
                    return Object.keys(chngedKeys);
                };
                Association.prototype._unbindParentDS = function () {
                    var self = this, ds = this.parentDS;
                    if(!ds) {
                        return;
                    }
                    ds.removeNSHandlers(self._objId);
                };
                Association.prototype._unbindChildDS = function () {
                    var self = this, ds = this.childDS;
                    if(!ds) {
                        return;
                    }
                    ds.removeNSHandlers(self._objId);
                };
                Association.prototype.getParentFKey = function (item) {
                    if(!!item && item._isNew) {
                        return item._key;
                    }
                    return this._getItemKey(this._parentFldInfos, this._parentDS, item);
                };
                Association.prototype.getChildFKey = function (item) {
                    if(!!item && !!this._childToParentName) {
                        //_getFieldVal for childToParentName can store temporary parent's key (which is generated on client)
                        //we first check if it has it
                        var parentKey = item._getFieldVal(this._childToParentName);
                        if(!!parentKey) {
                            return parentKey;
                        }
                    }
                    //if keys are permanent (stored to the server), then return normal foreign keys
                    return this._getItemKey(this._childFldInfos, this._childDS, item);
                };
                Association.prototype.getChildItems = //get all childrens for parent item
                function (item) {
                    if(!item) {
                        return [];
                    }
                    var fkey = this.getParentFKey(item), arr = this._childMap[fkey];
                    if(!arr) {
                        return [];
                    }
                    return arr;
                };
                Association.prototype.getParentItem = //get the parent for child item
                function (item) {
                    if(!item) {
                        return null;
                    }
                    var fkey = this.getChildFKey(item);
                    var obj = this._parentMap[fkey];
                    if(!!obj) {
                        return obj;
                    } else {
                        return null;
                    }
                };
                Association.prototype.refreshParentMap = function () {
                    this._resetParentMap();
                    return this._mapParentItems(this._parentDS.items);
                };
                Association.prototype.refreshChildMap = function () {
                    this._resetChildMap();
                    return this._mapChildren(this._childDS.items);
                };
                Association.prototype.destroy = function () {
                    if(this._isDestroyed) {
                        return;
                    }
                    this._isDestroyCalled = true;
                    clearTimeout(this._changedTimeout);
                    this._changedTimeout = null;
                    this._changed = {
                    };
                    this._unbindParentDS();
                    this._unbindChildDS();
                    this._parentMap = null;
                    this._childMap = null;
                    this._parentFldInfos = null;
                    this._childFldInfos = null;
                    _super.prototype.destroy.call(this);
                };
                Association.prototype.toString = function () {
                    return this._name;
                };
                Object.defineProperty(Association.prototype, "name", {
                    get: function () {
                        return this._name;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Association.prototype, "parentToChildrenName", {
                    get: function () {
                        return this._parentToChildrenName;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Association.prototype, "childToParentName", {
                    get: function () {
                        return this._childToParentName;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Association.prototype, "parentDS", {
                    get: function () {
                        return this._parentDS;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Association.prototype, "childDS", {
                    get: function () {
                        return this._childDS;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Association.prototype, "parentFldInfos", {
                    get: function () {
                        return this._parentFldInfos;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Association.prototype, "childFldInfos", {
                    get: function () {
                        return this._childFldInfos;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Association.prototype, "onDeleteAction", {
                    get: function () {
                        return this._onDeleteAction;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Association;
            })(RIAPP.BaseObject);
            db.Association = Association;            
            var DataView = (function (_super) {
                __extends(DataView, _super);
                function DataView(options) {
                                _super.call(this);
                    var opts = utils.extend(false, {
                        dataSource: null,
                        fn_filter: null,
                        fn_sort: null,
                        fn_itemsProvider: null
                    }, options);
                    if(!opts.dataSource || !utils.check.isProtoOf(MOD.collection.Collection, opts.dataSource)) {
                        throw new Error(RIAPP.ERRS.ERR_DATAVIEW_DATASRC_INVALID);
                    }
                    if(!opts.fn_filter || !utils.check.isFunction(opts.fn_filter)) {
                        throw new Error(RIAPP.ERRS.ERR_DATAVIEW_FILTER_INVALID);
                    }
                    this._objId = 'dvw' + utils.getNewID();
                    this._dataSource = opts.dataSource;
                    this._fn_filter = opts.fn_filter;
                    this._fn_sort = opts.fn_sort;
                    this._fn_itemsProvider = opts.fn_itemsProvider;
                    this._isDSFilling = false;
                    this._isAddingNew = false;
                    var self = this, ds = this._dataSource;
                    ds.getFieldNames().forEach(function (prop) {
                        self._fieldMap[prop] = utils.extend(false, {
                        }, ds.getFieldInfo(prop));
                    });
                    this._bindDS();
                }
                DataView.prototype._getEventNames = function () {
                    var base_events = _super.prototype._getEventNames.call(this);
                    return [
                        'view_refreshed'
                    ].concat(base_events);
                };
                DataView.prototype.addOnViewRefreshed = function (fn, namespace) {
                    this.addHandler('view_refreshed', fn, namespace);
                };
                DataView.prototype.removeOnViewRefreshed = function (namespace) {
                    this.removeHandler('view_refreshed', namespace);
                };
                DataView.prototype._filterForPaging = function (items) {
                    var skip = 0, take = 0, pos = -1, cnt = -1, result = [];
                    skip = this.pageSize * this.pageIndex;
                    take = this.pageSize;
                    items.forEach(function (item) {
                        cnt += 1;
                        if(cnt < skip) {
                            return;
                        }
                        pos += 1;
                        if(pos < take) {
                            result.push(item);
                        }
                    });
                    return result;
                };
                DataView.prototype._onViewRefreshed = function (args) {
                    this.raiseEvent('view_refreshed', args);
                };
                DataView.prototype._refresh = function (isPageChanged) {
                    var items;
                    var ds = this._dataSource;
                    if(!ds) {
                        return;
                    }
                    if(!!this._fn_itemsProvider) {
                        items = this._fn_itemsProvider(ds);
                    } else {
                        items = ds.items;
                    }
                    if(!!this._fn_filter) {
                        items = items.filter(this._fn_filter);
                    }
                    if(!!this._fn_sort) {
                        items = items.sort(this._fn_sort);
                    }
                    this._fillItems({
                        items: items,
                        isPageChanged: !!isPageChanged,
                        clear: true,
                        isAppend: false
                    });
                    this._onViewRefreshed({
                    });
                };
                DataView.prototype._fillItems = function (data) {
                    data = utils.extend(false, {
                        items: [],
                        isPageChanged: false,
                        clear: true,
                        isAppend: false
                    }, data);
                    var self = this, items, newItems = [], positions = [], fetchedItems = [];
                    this._onFillStart({
                        isBegin: true,
                        rowCount: data.items.length,
                        time: new Date(),
                        isPageChanged: data.isPageChanged
                    });
                    try  {
                        if(!!data.clear) {
                            this.clear();
                        }
                        if(this.isPagingEnabled && !data.isAppend) {
                            items = this._filterForPaging(data.items);
                        } else {
                            items = data.items;
                        }
                        items.forEach(function (item) {
                            var oldItem = self._itemsByKey[item._key];
                            if(!oldItem) {
                                self._itemsByKey[item._key] = item;
                                newItems.push(item);
                                positions.push(self._items.length - 1);
                                self._items.push(item);
                                fetchedItems.push(item);
                            } else {
                                fetchedItems.push(oldItem);
                            }
                        });
                        if(newItems.length > 0) {
                            this._onItemsChanged({
                                change_type: COLL_CHANGE_TYPE.ADDED,
                                items: newItems,
                                pos: positions
                            });
                            this.raisePropertyChanged('count');
                        }
                    }finally {
                        this._onFillEnd({
                            isBegin: false,
                            rowCount: fetchedItems.length,
                            time: new Date(),
                            resetUI: !!data.clear,
                            fetchedItems: fetchedItems,
                            newItems: newItems,
                            isPageChanged: data.isPageChanged
                        });
                    }
                    if(!!data.clear) {
                        this.totalCount = data.items.length;
                    } else {
                        this.totalCount = this.totalCount + newItems.length;
                    }
                    this.moveFirst();
                    return newItems;
                };
                DataView.prototype._onDSCollectionChanged = function (args) {
                    var self = this, item, CH_T = COLL_CHANGE_TYPE, items = args.items;
                    switch(args.change_type) {
                        case CH_T.RESET:
                            if(!this._isDSFilling) {
                                this._refresh(false);
                            }
                            break;
                        case CH_T.ADDED:
                            if(!this._isAddingNew && !this._isDSFilling) {
                                if(!!self._fn_filter) {
                                    items = items.filter(self._fn_filter);
                                }
                                self.appendItems(items);
                            }
                            break;
                        case CH_T.REMOVE:
                            items.forEach(function (item) {
                                var key = item._key;
                                item = self._itemsByKey[key];
                                if(!!item) {
                                    self.removeItem(item);
                                }
                            });
                            break;
                        case CH_T.REMAP_KEY:
 {
                                item = self._itemsByKey[args.old_key];
                                if(!!item) {
                                    delete self._itemsByKey[args.old_key];
                                    self._itemsByKey[args.new_key] = item;
                                    this._onItemsChanged(args);
                                }
                            }
                            break;
                        default:
                            throw new Error(utils.format(RIAPP.ERRS.ERR_COLLECTION_CHANGETYPE_INVALID, args.change_type));
                    }
                };
                DataView.prototype._onDSFill = function (args) {
                    var self = this, items = args.fetchedItems, isEnd = !args.isBegin;
                    if(isEnd) {
                        this._isDSFilling = false;
                        if(args.resetUI) {
                            this._refresh(false);
                        } else {
                            if(!!self._fn_filter) {
                                items = items.filter(self._fn_filter);
                            }
                            self.appendItems(items);
                        }
                    } else {
                        this._isDSFilling = true;
                    }
                };
                DataView.prototype._onDSStatusChanged = function (args) {
                    var self = this, item = args.item, key = args.key, oldChangeType = args.oldChangeType, isOk, canFilter = !!self._fn_filter;
                    if(!!self._itemsByKey[key]) {
                        self._onItemStatusChanged(item, oldChangeType);
                        if(canFilter) {
                            isOk = self._fn_filter(item);
                            if(!isOk) {
                                self.removeItem(item);
                            }
                        }
                    } else {
                        if(canFilter) {
                            isOk = self._fn_filter(item);
                            if(isOk) {
                                self.appendItems([
                                    item
                                ]);
                            }
                        }
                    }
                };
                DataView.prototype._bindDS = function () {
                    var self = this, ds = this._dataSource;
                    if(!ds) {
                        return;
                    }
                    ds.addHandler('coll_changed', function (sender, args) {
                        if(ds !== sender) {
                            return;
                        }
                        self._onDSCollectionChanged(args);
                    }, self._objId);
                    ds.addHandler('fill', function (sender, args) {
                        if(ds !== sender) {
                            return;
                        }
                        self._onDSFill(args);
                    }, self._objId);
                    ds.addHandler('begin_edit', function (sender, args) {
                        if(ds !== sender) {
                            return;
                        }
                        if(!!self._itemsByKey[args.item._key]) {
                            self._onEditing(args.item, true, false);
                        }
                    }, self._objId);
                    ds.addHandler('end_edit', function (sender, args) {
                        if(ds !== sender) {
                            return;
                        }
                        var isOk, item = args.item, canFilter = !!self._fn_filter;
                        if(!!self._itemsByKey[item._key]) {
                            self._onEditing(item, false, args.isCanceled);
                            if(!args.isCanceled && canFilter) {
                                isOk = self._fn_filter(item);
                                if(!isOk) {
                                    self.removeItem(item);
                                }
                            }
                        } else {
                            if(!args.isCanceled && canFilter) {
                                isOk = self._fn_filter(item);
                                if(isOk) {
                                    self.appendItems([
                                        item
                                    ]);
                                }
                            }
                        }
                    }, self._objId);
                    ds.addHandler('errors_changed', function (sender, args) {
                        if(ds !== sender) {
                            return;
                        }
                        if(!!self._itemsByKey[args.item._key]) {
                            self._onErrorsChanged(args.item);
                        }
                    }, self._objId);
                    ds.addHandler('status_changed', function (sender, args) {
                        if(ds !== sender) {
                            return;
                        }
                        self._onDSStatusChanged(args);
                    }, self._objId);
                    ds.addHandler('item_deleting', function (sender, args) {
                        if(ds !== sender) {
                            return;
                        }
                        if(!!self._itemsByKey[args.item._key]) {
                            self._onItemDeleting(args);
                        }
                    }, self._objId);
                    ds.addHandler('item_added', function (sender, args) {
                        if(ds !== sender) {
                            return;
                        }
                        if(self._isAddingNew) {
                            if(!self._itemsByKey[args.item._key]) {
                                self._attach(args.item);
                            }
                            self.currentItem = args.item;
                            self._onEditing(args.item, true, false);
                            self._onItemAdded(args.item);
                        }
                    }, self._objId);
                    ds.addHandler('item_adding', function (sender, args) {
                        if(ds !== sender) {
                            return;
                        }
                        if(self._isAddingNew) {
                            self._onItemAdding(args.item);
                        }
                    }, self._objId);
                };
                DataView.prototype._unbindDS = function () {
                    var self = this, ds = this._dataSource;
                    if(!ds) {
                        return;
                    }
                    ds.removeNSHandlers(self._objId);
                };
                DataView.prototype.appendItems = function (items) {
                    if(this._isDestroyCalled) {
                        return [];
                    }
                    return this._fillItems({
                        items: items,
                        isPageChanged: false,
                        clear: false,
                        isAppend: true
                    });
                };
                DataView.prototype._getStrValue = function (val, fieldInfo) {
                    return this._dataSource._getStrValue(val, fieldInfo);
                };
                DataView.prototype._onCurrentChanging = function (newCurrent) {
                    var ds = this._dataSource;
                    try  {
                        if(!!ds._EditingItem && newCurrent !== ds._EditingItem) {
                            ds.endEdit();
                        }
                    } catch (ex) {
                        ds.cancelEdit();
                        RIAPP.global.reThrow(ex, this._onError(ex, this));
                    }
                };
                DataView.prototype._getErrors = function (item) {
                    var ds = this._dataSource;
                    return ds._getErrors(item);
                };
                DataView.prototype._onPageChanged = function () {
                    this._refresh(true);
                };
                DataView.prototype.getItemsWithErrors = function () {
                    var ds = this._dataSource;
                    return ds.getItemsWithErrors();
                };
                DataView.prototype.addNew = function () {
                    var ds = this._dataSource, item;
                    this._isAddingNew = true;
                    try  {
                        item = ds.addNew();
                    }finally {
                        this._isAddingNew = false;
                    }
                    return item;
                };
                DataView.prototype.removeItem = function (item) {
                    if(item._key === null) {
                        throw new Error(RIAPP.ERRS.ERR_ITEM_IS_DETACHED);
                    }
                    if(!this._itemsByKey[item._key]) {
                        return;
                    }
                    var oldPos = utils.removeFromArray(this._items, item);
                    if(oldPos < 0) {
                        throw new Error(RIAPP.ERRS.ERR_ITEM_IS_NOTFOUND);
                    }
                    delete this._itemsByKey[item._key];
                    delete this._errors[item._key];
                    this.totalCount = this.totalCount - 1;
                    this._onRemoved(item, oldPos);
                    var test = this.getItemByPos(oldPos), curPos = this._currentPos;
                    //if detached item was current item
                    if(curPos === oldPos) {
                        if(!test) {
                            //it was the last item
                            this._currentPos = curPos - 1;
                        }
                        this._onCurrentChanged();
                    }
                    if(curPos > oldPos) {
                        this._currentPos = curPos - 1;
                        this._onCurrentChanged();
                    }
                };
                DataView.prototype.sortLocal = function (fieldNames, sortOrder) {
                    var mult = 1, parser = RIAPP.global.parser;
                    if(!!sortOrder && sortOrder.toUpperCase() === 'DESC') {
                        mult = -1;
                    }
                    var fn_sort = function (a, b) {
                        var res = 0, i, len, af, bf, fieldName;
                        for(i = 0 , len = fieldNames.length; i < len; i += 1) {
                            fieldName = fieldNames[i];
                            af = parser.resolvePath(a, fieldName);
                            bf = parser.resolvePath(b, fieldName);
                            if(af < bf) {
                                res = -1 * mult;
                            } else if(af > bf) {
                                res = mult;
                            } else {
                                res = 0;
                            }
                            if(res !== 0) {
                                return res;
                            }
                        }
                        return res;
                    };
                    this.fn_sort = fn_sort;
                };
                DataView.prototype.getIsHasErrors = function () {
                    return this._dataSource.getIsHasErrors();
                };
                DataView.prototype.clear = function () {
                    this.cancelEdit();
                    this._EditingItem = null;
                    this._newKey = 0;
                    this.currentItem = null;
                    this._items = [];
                    this._itemsByKey = {
                    };
                    this._errors = {
                    };
                    this._onItemsChanged({
                        change_type: COLL_CHANGE_TYPE.RESET,
                        items: []
                    });
                    this.pageIndex = 0;
                    this.raisePropertyChanged('count');
                };
                DataView.prototype.refresh = function () {
                    this._refresh(false);
                };
                DataView.prototype.destroy = function () {
                    if(this._isDestroyed) {
                        return;
                    }
                    this._isDestroyCalled = true;
                    this._unbindDS();
                    this._dataSource = null;
                    this._fn_filter = null;
                    this._fn_sort = null;
                    _super.prototype.destroy.call(this);
                };
                Object.defineProperty(DataView.prototype, "isPagingEnabled", {
                    get: function () {
                        return this._options.enablePaging;
                    },
                    set: function (v) {
                        if(this._options.enablePaging !== v) {
                            this._options.enablePaging = v;
                            this.raisePropertyChanged('isPagingEnabled');
                            this._refresh(false);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataView.prototype, "permissions", {
                    get: function () {
                        return this._dataSource.permissions;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataView.prototype, "fn_filter", {
                    get: function () {
                        return this._fn_filter;
                    },
                    set: function (v) {
                        if(this._fn_filter !== v) {
                            this._fn_filter = v;
                            this._refresh(false);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataView.prototype, "fn_sort", {
                    get: function () {
                        return this._fn_sort;
                    },
                    set: function (v) {
                        if(this._fn_sort !== v) {
                            this._fn_sort = v;
                            this._refresh(false);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataView.prototype, "fn_itemsProvider", {
                    get: function () {
                        return this._fn_itemsProvider;
                    },
                    set: function (v) {
                        if(this._fn_itemsProvider !== v) {
                            this._fn_itemsProvider = v;
                            this._refresh(false);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return DataView;
            })(MOD.collection.Collection);
            db.DataView = DataView;            
            var ChildDataView = (function (_super) {
                __extends(ChildDataView, _super);
                function ChildDataView(options) {
                    this._parentItem = null;
                    this._refreshTimeout = null;
                    this._association = options.association;
                    var opts = utils.extend(false, {
                        dataSource: this._association.childDS,
                        fn_filter: null,
                        fn_sort: null,
                        fn_itemsProvider: null
                    }, options);
                    var self = this, assoc = this._association, save_fn_filter = options.fn_filter;
                    opts.fn_filter = function (item) {
                        if(!self._parentItem) {
                            return false;
                        }
                        var fkey1 = assoc.getParentFKey(self._parentItem);
                        if(!fkey1) {
                            return false;
                        }
                        var fkey2 = assoc.getChildFKey(item);
                        if(!fkey2) {
                            return false;
                        }
                        if(fkey1 !== fkey2) {
                            return false;
                        }
                        if(!save_fn_filter) {
                            return true;
                        } else {
                            return save_fn_filter(item);
                        }
                    };
                                _super.call(this, opts);
                }
                ChildDataView.prototype._refresh = function () {
                    var self = this, ds = this._dataSource;
                    if(!ds) {
                        return;
                    }
                    clearTimeout(self._refreshTimeout);
                    self._refreshTimeout = setTimeout(function () {
                        if(self._isDestroyCalled) {
                            return;
                        }
                        var items = self._association.getChildItems(self._parentItem);
                        if(!!self._fn_filter) {
                            items = items.filter(self._fn_filter);
                        }
                        if(!!self._fn_sort) {
                            items = items.sort(self._fn_sort);
                        }
                        self._fillItems({
                            items: items,
                            isPageChanged: false,
                            clear: true,
                            isAppend: false
                        });
                        self._onViewRefreshed({
                        });
                    }, 250);
                };
                ChildDataView.prototype.destroy = function () {
                    if(this._isDestroyed) {
                        return;
                    }
                    this._isDestroyCalled = true;
                    clearTimeout(this._refreshTimeout);
                    this._association = null;
                    _super.prototype.destroy.call(this);
                };
                ChildDataView.prototype.toString = function () {
                    if(!!this._association) {
                        return 'ChildDataView for ' + this._association.toString();
                    }
                    return 'ChildDataView';
                };
                Object.defineProperty(ChildDataView.prototype, "parentItem", {
                    get: function () {
                        return this._parentItem;
                    },
                    set: function (v) {
                        if(this._parentItem !== v) {
                            this._parentItem = v;
                            this.raisePropertyChanged('parentItem');
                            if(this.items.length > 0) {
                                this.clear();
                                this._onViewRefreshed({
                                });
                            }
                            this._refresh();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ChildDataView.prototype, "association", {
                    get: function () {
                        return this._association;
                    },
                    enumerable: true,
                    configurable: true
                });
                return ChildDataView;
            })(DataView);
            db.ChildDataView = ChildDataView;            
            RIAPP.global.onModuleLoaded('db', db);
        })(MOD.db || (MOD.db = {}));
        var db = MOD.db;
    })(RIAPP.MOD || (RIAPP.MOD = {}));
    var MOD = RIAPP.MOD;
})(RIAPP || (RIAPP = {}));
//@ sourceMappingURL=db.js.map

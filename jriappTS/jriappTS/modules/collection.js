var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RIAPP;
(function (RIAPP) {
    (function (MOD) {
        (function (collection) {
            //local variables for optimization
                        var utils = RIAPP.global.utils, consts = RIAPP.global.consts, ValidationError = MOD.binding.ValidationError;
            collection.consts = {
                DATA_TYPE: RIAPP.MOD.consts.DATA_TYPE,
                DATE_CONVERSION: RIAPP.MOD.consts.DATE_CONVERSION,
                SORT_ORDER: {
                    ASC: 0,
                    DESC: 1
                },
                COLL_CHANGE_TYPE: {
                    REMOVE: '0',
                    ADDED: '1',
                    RESET: '2',
                    REMAP_KEY: '3'
                }
            };
            var DATA_TYPE = collection.consts.DATA_TYPE, COLL_CHANGE_TYPE = collection.consts.COLL_CHANGE_TYPE, valueUtils = RIAPP.MOD.utils.valueUtils;
            ;
            ;
            var CollectionItem = (function (_super) {
                __extends(CollectionItem, _super);
                function CollectionItem() {
                                _super.call(this);
                    this._fkey = null;
                    this._isEditing = false;
                    this._saveVals = null;
                    this._vals = {
                    };
                    this._notEdited = true;
                }
                CollectionItem.prototype._getEventNames = function () {
                    var base_events = _super.prototype._getEventNames.call(this);
                    return [
                        'errors_changed'
                    ].concat(base_events);
                };
                CollectionItem.prototype.addOnErrorsChanged = function (fn, namespace) {
                    this.addHandler('errors_changed', fn, namespace);
                };
                CollectionItem.prototype.removeOnErrorsChanged = function (namespace) {
                    this.removeHandler('errors_changed', namespace);
                };
                CollectionItem.prototype._onErrorsChanged = function (args) {
                    this.raiseEvent('errors_changed', args);
                };
                CollectionItem.prototype._onError = function (error, source) {
                    var isHandled = _super.prototype._onError.call(this, error, source);
                    if(!isHandled) {
                        return this._collection._onError(error, source);
                    }
                    return isHandled;
                };
                CollectionItem.prototype._beginEdit = function () {
                    var coll = this._collection, isHandled;
                    if(coll.isEditing) {
                        var eitem = coll._EditingItem;
                        if(eitem === this) {
                            return false;
                        }
                        try  {
                            eitem.endEdit();
                            if(eitem.getIsHasErrors()) {
                                this._onError(new ValidationError(eitem.getAllErrors(), eitem), eitem);
                                eitem.cancelEdit();
                            }
                        } catch (ex) {
                            isHandled = this._onError(ex, eitem);
                            eitem.cancelEdit();
                            RIAPP.global.reThrow(ex, isHandled);
                        }
                    }
                    this._isEditing = true;
                    this._saveVals = utils.shallowCopy(this._vals);
                    this._collection.currentItem = this;
                    return true;
                };
                CollectionItem.prototype._endEdit = function () {
                    if(!this._isEditing) {
                        return false;
                    }
                    var validation_errors, coll = this._collection, self = this;
                    if(this.getIsHasErrors()) {
                        return false;
                    }
                    coll._removeAllErrors(this)//revalidate all
                    ;
                    validation_errors = this._validateAll();
                    if(validation_errors.length > 0) {
                        coll._addErrors(self, validation_errors);
                    }
                    if(this.getIsHasErrors()) {
                        return false;
                    }
                    this._isEditing = false;
                    this._saveVals = null;
                    return true;
                };
                CollectionItem.prototype._validate = function () {
                    return this._collection._validateItem(this);
                };
                CollectionItem.prototype._skipValidate = function (fieldInfo, val) {
                    return false;
                };
                CollectionItem.prototype._validateField = function (fieldName) {
                    var val, fieldInfo = this.getFieldInfo(fieldName), res = null;
                    try  {
                        val = this._vals[fieldName];
                        if(this._skipValidate(fieldInfo, val)) {
                            return res;
                        }
                        if(this._isNew) {
                            if(val === null && !fieldInfo.isNullable && !fieldInfo.isReadOnly && !fieldInfo.isAutoGenerated) {
                                throw new Error(RIAPP.ERRS.ERR_FIELD_ISNOT_NULLABLE);
                            }
                        } else {
                            if(val === null && !fieldInfo.isNullable && !fieldInfo.isReadOnly) {
                                throw new Error(RIAPP.ERRS.ERR_FIELD_ISNOT_NULLABLE);
                            }
                        }
                    } catch (ex) {
                        res = {
                            fieldName: fieldName,
                            errors: [
                                ex.message
                            ]
                        };
                    }
                    var tmp = this._collection._validateItemField(this, fieldName);
                    if(!!res && !!tmp) {
                        res.errors = res.errors.concat(tmp.errors);
                    } else if(!!tmp) {
                        res = tmp;
                    }
                    return res;
                };
                CollectionItem.prototype._validateAll = function () {
                    var self = this, fields = this.getFieldNames(), errs = [];
                    fields.forEach(function (fieldName) {
                        var res = self._validateField(fieldName);
                        if(!!res) {
                            errs.push(res);
                        }
                    });
                    var res = self._validate();
                    if(!!res) {
                        errs.push(res);
                    }
                    return errs;
                };
                CollectionItem.prototype._checkVal = function (fieldInfo, val) {
                    var res = val, ERRS = RIAPP.ERRS;
                    if(this._skipValidate(fieldInfo, val)) {
                        return res;
                    }
                    if(fieldInfo.isReadOnly && !(fieldInfo.allowClientDefault && this._isNew)) {
                        throw new Error(ERRS.ERR_FIELD_READONLY);
                    }
                    if((val === null || (utils.check.isString(val) && !val)) && !fieldInfo.isNullable) {
                        throw new Error(ERRS.ERR_FIELD_ISNOT_NULLABLE);
                    }
                    if(val === null) {
                        return val;
                    }
                    switch(fieldInfo.dataType) {
                        case DATA_TYPE.None:
                            break;
                        case DATA_TYPE.Guid:
                        case DATA_TYPE.Binary:
                        case DATA_TYPE.String:
                            if(!utils.check.isString(val)) {
                                throw new Error(utils.format(ERRS.ERR_FIELD_WRONG_TYPE, val, 'String'));
                            }
                            if(fieldInfo.maxLength > 0 && val.length > fieldInfo.maxLength) {
                                throw new Error(utils.format(ERRS.ERR_FIELD_MAXLEN, fieldInfo.maxLength));
                            }
                            if(fieldInfo.isNullable && val === '') {
                                res = null;
                            }
                            if(!!fieldInfo.regex) {
                                var reg = new RegExp(fieldInfo.regex, "i");
                                if(!reg.test(val)) {
                                    throw new Error(utils.format(ERRS.ERR_FIELD_REGEX, val));
                                }
                            }
                            break;
                        case DATA_TYPE.Bool:
                            if(!utils.check.isBoolean(val)) {
                                throw new Error(utils.format(ERRS.ERR_FIELD_WRONG_TYPE, val, 'Boolean'));
                            }
                            break;
                        case DATA_TYPE.Integer:
                        case DATA_TYPE.Decimal:
                        case DATA_TYPE.Float:
                            if(!utils.check.isNumber(val)) {
                                throw new Error(utils.format(ERRS.ERR_FIELD_WRONG_TYPE, val, 'Number'));
                            }
                            if(!!fieldInfo.range) {
                                utils.validation.checkNumRange(Number(val), fieldInfo.range);
                            }
                            break;
                        case DATA_TYPE.DateTime:
                        case DATA_TYPE.Date:
                            if(!utils.check.isDate(val)) {
                                throw new Error(utils.format(ERRS.ERR_FIELD_WRONG_TYPE, val, 'Date'));
                            }
                            if(!!fieldInfo.range) {
                                utils.validation.checkDateRange(val, fieldInfo.range);
                            }
                            break;
                        case DATA_TYPE.Time:
                            if(!utils.check.isDate(val)) {
                                throw new Error(utils.format(ERRS.ERR_FIELD_WRONG_TYPE, val, 'Time'));
                            }
                            break;
                        default:
                            throw new Error(utils.format(ERRS.ERR_PARAM_INVALID, 'dataType', fieldInfo.dataType));
                    }
                    return res;
                };
                CollectionItem.prototype._resetIsNew = function () {
                };
                CollectionItem.prototype._onAttaching = function () {
                };
                CollectionItem.prototype._onAttach = function () {
                };
                CollectionItem.prototype.getFieldInfo = function (fieldName) {
                    return this._collection.getFieldInfo(fieldName);
                };
                CollectionItem.prototype.getFieldNames = function () {
                    return this._collection.getFieldNames();
                };
                CollectionItem.prototype.getFieldErrors = function (fieldName) {
                    var itemErrors = this._collection._getErrors(this);
                    if(!itemErrors) {
                        return [];
                    }
                    var name = fieldName;
                    if(!fieldName) {
                        fieldName = '*';
                    }
                    if(!itemErrors[fieldName]) {
                        return [];
                    }
                    if(fieldName == '*') {
                        name = null;
                    }
                    return [
                        {
                            fieldName: name,
                            errors: itemErrors[fieldName]
                        }
                    ];
                };
                CollectionItem.prototype.getAllErrors = function () {
                    var itemErrors = this._collection._getErrors(this);
                    if(!itemErrors) {
                        return [];
                    }
                    var res = [];
                    utils.forEachProp(itemErrors, function (name) {
                        var fieldName = null;
                        if(name !== '*') {
                            fieldName = name;
                        }
                        res.push({
                            fieldName: fieldName,
                            errors: itemErrors[name]
                        });
                    });
                    return res;
                };
                CollectionItem.prototype.getErrorString = function () {
                    var itemErrors = this._collection._getErrors(this);
                    if(!itemErrors) {
                        return '';
                    }
                    var res = [];
                    utils.forEachProp(itemErrors, function (name) {
                        res.push(utils.format('{0}: {1}', name, itemErrors[name]));
                    });
                    return res.join('|');
                };
                CollectionItem.prototype.submitChanges = function () {
                    var deffered = utils.createDeferred();
                    deffered.reject();
                    return deffered.promise();
                };
                CollectionItem.prototype.beginEdit = function () {
                    var coll = this._collection;
                    if(!this._beginEdit()) {
                        return false;
                    }
                    coll._onEditing(this, true, false);
                    this.raisePropertyChanged('isEditing');
                    return true;
                };
                CollectionItem.prototype.endEdit = function () {
                    var coll = this._collection;
                    if(!this._endEdit()) {
                        return false;
                    }
                    coll._onEditing(this, false, false);
                    this._notEdited = false;
                    this.raisePropertyChanged('isEditing');
                    return true;
                };
                CollectionItem.prototype.cancelEdit = function () {
                    if(!this._isEditing) {
                        return false;
                    }
                    var coll = this._collection, isNew = this._isNew;
                    var changes = this._saveVals;
                    this._vals = this._saveVals;
                    this._saveVals = null;
                    coll._removeAllErrors(this);
                    //refresh User interface when values restored
                    coll.getFieldNames().forEach(function (name) {
                        if(changes[name] !== this._vals[name]) {
                            this.raisePropertyChanged(name);
                        }
                    }, this);
                    if(isNew && this._notEdited) {
                        coll.removeItem(this);
                    }
                    this._isEditing = false;
                    coll._onEditing(this, false, true);
                    this.raisePropertyChanged('isEditing');
                    return true;
                };
                CollectionItem.prototype.deleteItem = function () {
                    var coll = this._collection;
                    if(this._key === null) {
                        return false;
                    }
                    if(!coll._onItemDeleting(this)) {
                        return false;
                    }
                    coll.removeItem(this);
                    return true;
                };
                CollectionItem.prototype.getIsNew = function () {
                    return this._isNew;
                };
                CollectionItem.prototype.getIsDeleted = function () {
                    return this._isDeleted;
                };
                CollectionItem.prototype.getKey = function () {
                    return this._key;
                };
                CollectionItem.prototype.getCollection = function () {
                    return this._collection;
                };
                CollectionItem.prototype.getIsEditing = function () {
                    return this._isEditing;
                };
                CollectionItem.prototype.getIsHasErrors = function () {
                    var itemErrors = this._collection._getErrors(this);
                    return !!itemErrors;
                };
                CollectionItem.prototype.getIErrorNotification = function () {
                    return this;
                };
                CollectionItem.prototype.destroy = function () {
                    if(this._isDestroyed) {
                        return;
                    }
                    this._isDestroyCalled = true;
                    this._fkey = null;
                    this._saveVals = null;
                    this._vals = {
                    };
                    this._isEditing = false;
                    _super.prototype.destroy.call(this);
                };
                CollectionItem.prototype.toString = function () {
                    return 'CollectionItem';
                };
                Object.defineProperty(CollectionItem.prototype, "_isCanSubmit", {
                    get: function () {
                        return false;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CollectionItem.prototype, "_changeType", {
                    get: function () {
                        return 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CollectionItem.prototype, "_isNew", {
                    get: function () {
                        return false;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CollectionItem.prototype, "_isDeleted", {
                    get: function () {
                        return false;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CollectionItem.prototype, "_key", {
                    get: function () {
                        return this._fkey;
                    },
                    set: function (v) {
                        if(v !== null) {
                            v = '' + v;
                        }
                        this._fkey = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CollectionItem.prototype, "_collection", {
                    get: function () {
                        return null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CollectionItem.prototype, "_isUpdating", {
                    get: function () {
                        var coll = this._collection;
                        if(!coll) {
                            return false;
                        }
                        return coll.isUpdating;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CollectionItem.prototype, "isEditing", {
                    get: function () {
                        return this._isEditing;
                    },
                    enumerable: true,
                    configurable: true
                });
                return CollectionItem;
            })(RIAPP.BaseObject);
            collection.CollectionItem = CollectionItem;            
            ;
            ;
            var Collection = (function (_super) {
                __extends(Collection, _super);
                function Collection() {
                                _super.call(this);
                    this._options = {
                        enablePaging: false,
                        pageSize: 50
                    };
                    this._isLoading = false;
                    this._EditingItem = null;
                    this._perms = {
                        canAddRow: true,
                        canEditRow: true,
                        canDeleteRow: true,
                        canRefreshRow: false
                    };
                    this._totalCount = 0//includes stored on server
                    ;
                    this._pageIndex = 0;
                    this._items = [];
                    this._itemsByKey = {
                    };
                    this._currentPos = -1;
                    this._newKey = 0;
                    this._fieldMap = {
                    };
                    this._errors = {
                    };
                    this._ignoreChangeErrors = false;
                    this._pkInfo = null;
                    this._isUpdating = false;
                    this._waitQueue = new RIAPP.MOD.utils.WaitQueue(this);
                }
                Collection.getEmptyFieldInfo = function getEmptyFieldInfo(fieldName) {
                    var fieldInfo = {
                        isPrimaryKey: 0,
                        isRowTimeStamp: false,
                        dataType: DATA_TYPE.None,
                        isNullable: true,
                        maxLength: -1,
                        isReadOnly: false,
                        isAutoGenerated: false,
                        allowClientDefault: false,
                        dateConversion: collection.consts.DATE_CONVERSION.None,
                        isClientOnly: true,
                        isCalculated: false,
                        isNeedOriginal: false,
                        dependentOn: null,
                        range: null,
                        regex: null,
                        isNavigation: false,
                        fieldName: fieldName
                    };
                    return fieldInfo;
                };
                Collection.prototype._getEventNames = function () {
                    var base_events = _super.prototype._getEventNames.call(this);
                    return [
                        'begin_edit', 
                        'end_edit', 
                        'fill', 
                        'coll_changed', 
                        'item_deleting', 
                        'item_adding', 
                        'item_added', 
                        'validate', 
                        'current_changing', 
                        'page_changing', 
                        'errors_changed', 
                        'status_changed', 
                        'clearing', 
                        'cleared', 
                        'commit_changes'
                    ].concat(base_events);
                };
                Collection.prototype.addOnClearing = function (fn, namespace) {
                    this.addHandler('clearing', fn, namespace);
                };
                Collection.prototype.removeOnClearing = function (namespace) {
                    this.removeHandler('clearing', namespace);
                };
                Collection.prototype.addOnCleared = function (fn, namespace) {
                    this.addHandler('cleared', fn, namespace);
                };
                Collection.prototype.removeOnCleared = function (namespace) {
                    this.removeHandler('cleared', namespace);
                };
                Collection.prototype.addOnFill = function (fn, namespace) {
                    this.addHandler('fill', fn, namespace);
                };
                Collection.prototype.removeOnFill = function (namespace) {
                    this.removeHandler('fill', namespace);
                };
                Collection.prototype.addOnCollChanged = function (fn, namespace) {
                    this.addHandler('coll_changed', fn, namespace);
                };
                Collection.prototype.removeOnCollChanged = function (namespace) {
                    this.removeHandler('coll_changed', namespace);
                };
                Collection.prototype.addOnValidate = function (fn, namespace) {
                    this.addHandler('validate', fn, namespace);
                };
                Collection.prototype.removeOnValidate = function (namespace) {
                    this.removeHandler('validate', namespace);
                };
                Collection.prototype.addOnItemDeleting = function (fn, namespace) {
                    this.addHandler('item_deleting', fn, namespace);
                };
                Collection.prototype.removeOnItemDeleting = function (namespace) {
                    this.removeHandler('item_deleting', namespace);
                };
                Collection.prototype.addOnItemAdding = function (fn, namespace) {
                    this.addHandler('item_adding', fn, namespace);
                };
                Collection.prototype.removeOnItemAdding = function (namespace) {
                    this.removeHandler('item_adding', namespace);
                };
                Collection.prototype.addOnItemAdded = function (fn, namespace) {
                    this.addHandler('item_added', fn, namespace);
                };
                Collection.prototype.removeOnItemAdded = function (namespace) {
                    this.removeHandler('item_added', namespace);
                };
                Collection.prototype.addOnCurrentChanging = function (fn, namespace) {
                    this.addHandler('current_changing', fn, namespace);
                };
                Collection.prototype.removeOnCurrentChanging = function (namespace) {
                    this.removeHandler('current_changing', namespace);
                };
                Collection.prototype.addOnPageChanging = function (fn, namespace) {
                    this.addHandler('page_changing', fn, namespace);
                };
                Collection.prototype.removeOnPageChanging = function (namespace) {
                    this.removeHandler('page_changing', namespace);
                };
                Collection.prototype.addOnErrorsChanged = function (fn, namespace) {
                    this.addHandler('errors_changed', fn, namespace);
                };
                Collection.prototype.removeOnErrorsChanged = function (namespace) {
                    this.removeHandler('errors_changed', namespace);
                };
                Collection.prototype.addOnBeginEdit = function (fn, namespace) {
                    this.addHandler('begin_edit', fn, namespace);
                };
                Collection.prototype.removeOnBeginEdit = function (namespace) {
                    this.removeHandler('begin_edit', namespace);
                };
                Collection.prototype.addOnEndEdit = function (fn, namespace) {
                    this.addHandler('end_edit', fn, namespace);
                };
                Collection.prototype.removeOnEndEdit = function (namespace) {
                    this.removeHandler('end_edit', namespace);
                };
                Collection.prototype.addOnCommitChanges = function (fn, namespace) {
                    this.addHandler('commit_changes', fn, namespace);
                };
                Collection.prototype.removeOnCommitChanges = function (namespace) {
                    this.removeHandler('commit_changes', namespace);
                };
                Collection.prototype.addOnStatusChanged = function (fn, namespace) {
                    this.addHandler('status_changed', fn, namespace);
                };
                Collection.prototype.removeOnStatusChanged = function (namespace) {
                    this.removeHandler('status_changed', namespace);
                };
                Collection.prototype._getStrValue = function (val, fieldInfo) {
                    var dcnv = fieldInfo.dateConversion, stz = utils.get_timeZoneOffset();
                    return valueUtils.stringifyValue(val, dcnv, stz);
                };
                Collection.prototype._getPKFieldInfos = function () {
                    if(!!this._pkInfo) {
                        return this._pkInfo;
                    }
                    var fldMap = this._fieldMap, pk = [];
                    utils.forEachProp(fldMap, function (fldName) {
                        if(fldMap[fldName].isPrimaryKey > 0) {
                            pk.push(fldMap[fldName]);
                        }
                    });
                    pk.sort(function (a, b) {
                        return a.isPrimaryKey - b.isPrimaryKey;
                    });
                    this._pkInfo = pk;
                    return this._pkInfo;
                };
                Collection.prototype._onError = function (error, source) {
                    var isHandled = _super.prototype._onError.call(this, error, source);
                    if(!isHandled) {
                        return RIAPP.global._onError(error, source);
                    }
                    return isHandled;
                };
                Collection.prototype._onCurrentChanging = function (newCurrent) {
                    try  {
                        this.endEdit();
                    } catch (ex) {
                        RIAPP.global.reThrow(ex, this._onError(ex, this));
                    }
                    this.raiseEvent('current_changing', {
                        newCurrent: newCurrent
                    });
                };
                Collection.prototype._onCurrentChanged = function () {
                    this.raisePropertyChanged('currentItem');
                };
                Collection.prototype._onEditing = function (item, isBegin, isCanceled) {
                    if(this._isUpdating) {
                        return;
                    }
                    if(isBegin) {
                        this._EditingItem = item;
                        this.raiseEvent('begin_edit', {
                            item: item
                        });
                    } else {
                        this._EditingItem = null;
                        this.raiseEvent('end_edit', {
                            item: item,
                            isCanceled: isCanceled
                        });
                    }
                };
                Collection.prototype._onCommitChanges = //used by descendants when commiting submits for items
                function (item, isBegin, isRejected, changeType) {
                    this.raiseEvent('commit_changes', {
                        item: item,
                        isBegin: isBegin,
                        isRejected: isRejected,
                        changeType: changeType
                    });
                };
                Collection.prototype._onItemStatusChanged = //occurs when item changeType Changed (not used in simple collections)
                function (item, oldChangeType) {
                    this.raiseEvent('status_changed', {
                        item: item,
                        oldChangeType: oldChangeType,
                        key: item._key
                    });
                };
                Collection.prototype._validateItem = function (item) {
                    var args = {
                        item: item,
                        fieldName: null,
                        errors: []
                    };
                    this.raiseEvent('validate', args);
                    if(!!args.errors && args.errors.length > 0) {
                        return {
                            fieldName: null,
                            errors: args.errors
                        };
                    } else {
                        return null;
                    }
                };
                Collection.prototype._validateItemField = function (item, fieldName) {
                    var args = {
                        item: item,
                        fieldName: fieldName,
                        errors: []
                    };
                    this.raiseEvent('validate', args);
                    if(!!args.errors && args.errors.length > 0) {
                        return {
                            fieldName: fieldName,
                            errors: args.errors
                        };
                    } else {
                        return null;
                    }
                };
                Collection.prototype._addErrors = function (item, errors) {
                    var self = this;
                    this._ignoreChangeErrors = true;
                    try  {
                        errors.forEach(function (err) {
                            self._addError(item, err.fieldName, err.errors);
                        });
                    }finally {
                        this._ignoreChangeErrors = false;
                    }
                    this._onErrorsChanged(item);
                };
                Collection.prototype._addError = function (item, fieldName, errors) {
                    if(!fieldName) {
                        fieldName = '*';
                    }
                    if(!(utils.check.isArray(errors) && errors.length > 0)) {
                        this._removeError(item, fieldName);
                        return;
                    }
                    if(!this._errors[item._key]) {
                        this._errors[item._key] = {
                        };
                    }
                    var itemErrors = this._errors[item._key];
                    itemErrors[fieldName] = errors;
                    if(!this._ignoreChangeErrors) {
                        this._onErrorsChanged(item);
                    }
                };
                Collection.prototype._removeError = function (item, fieldName) {
                    var itemErrors = this._errors[item._key];
                    if(!itemErrors) {
                        return;
                    }
                    if(!fieldName) {
                        fieldName = '*';
                    }
                    if(!itemErrors[fieldName]) {
                        return;
                    }
                    delete itemErrors[fieldName];
                    if(utils.getProps(itemErrors).length === 0) {
                        delete this._errors[item._key];
                    }
                    this._onErrorsChanged(item);
                };
                Collection.prototype._removeAllErrors = function (item) {
                    var self = this, itemErrors = this._errors[item._key];
                    if(!itemErrors) {
                        return;
                    }
                    delete this._errors[item._key];
                    self._onErrorsChanged(item);
                };
                Collection.prototype._getErrors = function (item) {
                    return this._errors[item._key];
                };
                Collection.prototype._onErrorsChanged = function (item) {
                    var args = {
                        item: item
                    };
                    this.raiseEvent('errors_changed', args);
                    item._onErrorsChanged(args);
                };
                Collection.prototype._onItemDeleting = function (item) {
                    var args = {
                        item: item,
                        isCancel: false
                    };
                    this.raiseEvent('item_deleting', args);
                    return !args.isCancel;
                };
                Collection.prototype._onFillStart = function (args) {
                    this.raiseEvent('fill', args);
                };
                Collection.prototype._onFillEnd = function (args) {
                    this.raiseEvent('fill', args);
                };
                Collection.prototype._onItemsChanged = function (args) {
                    this.raiseEvent('coll_changed', args);
                };
                Collection.prototype._onItemAdding = //new item is being added, but is not in the collection now
                function (item) {
                    var args = {
                        item: item,
                        isCancel: false
                    };
                    this.raiseEvent('item_adding', args);
                    if(args.isCancel) {
                        RIAPP.global._throwDummy(new Error('operation canceled'));
                    }
                };
                Collection.prototype._onItemAdded = //new item has been added and now is in editing state and is currentItem
                function (item) {
                    var args = {
                        item: item,
                        isAddNewHandled: false
                    };
                    this.raiseEvent('item_added', args);
                };
                Collection.prototype._createNew = function () {
                    return new CollectionItem();
                };
                Collection.prototype._attach = function (item, itemPos) {
                    if(!!this._itemsByKey[item._key]) {
                        throw new Error(RIAPP.ERRS.ERR_ITEM_IS_ATTACHED);
                    }
                    try  {
                        this.endEdit();
                    } catch (ex) {
                        RIAPP.global.reThrow(ex, this._onError(ex, this));
                    }
                    var pos;
                    item._onAttaching();
                    if(utils.check.isNt(itemPos)) {
                        pos = this._items.length;
                        this._items.push(item);
                    } else {
                        pos = itemPos;
                        utils.insertIntoArray(this._items, item, pos);
                    }
                    this._itemsByKey[item._key] = item;
                    this._onItemsChanged({
                        change_type: COLL_CHANGE_TYPE.ADDED,
                        items: [
                            item
                        ],
                        pos: [
                            pos
                        ]
                    });
                    item._onAttach();
                    this.raisePropertyChanged('count');
                    this._onCurrentChanging(item);
                    this._currentPos = pos;
                    this._onCurrentChanged();
                    return pos;
                };
                Collection.prototype._onRemoved = function (item, pos) {
                    try  {
                        this._onItemsChanged({
                            change_type: COLL_CHANGE_TYPE.REMOVE,
                            items: [
                                item
                            ],
                            pos: [
                                pos
                            ]
                        });
                    }finally {
                        this.raisePropertyChanged('count');
                    }
                };
                Collection.prototype._onPageSizeChanged = function () {
                };
                Collection.prototype._onPageChanging = function () {
                    var args = {
                        page: this.pageIndex,
                        isCancel: false
                    };
                    this._raiseEvent('page_changing', args);
                    if(!args.isCancel) {
                        try  {
                            this.endEdit();
                        } catch (ex) {
                            RIAPP.global.reThrow(ex, this._onError(ex, this));
                        }
                    }
                    return !args.isCancel;
                };
                Collection.prototype._onPageChanged = function () {
                };
                Collection.prototype._setCurrentItem = function (v) {
                    var self = this, oldPos = self._currentPos;
                    if(!v) {
                        if(oldPos !== -1) {
                            self._onCurrentChanging(null);
                            self._currentPos = -1;
                            self._onCurrentChanged();
                        }
                        return;
                    }
                    if(v._key === null) {
                        throw new Error(RIAPP.ERRS.ERR_ITEM_IS_DETACHED);
                    }
                    var oldItem, pos, item = self.getItemByKey(v._key);
                    if(!item) {
                        throw new Error(RIAPP.ERRS.ERR_ITEM_IS_NOTFOUND);
                    }
                    oldItem = self.getItemByPos(oldPos);
                    pos = self._items.indexOf(v);
                    if(pos < 0) {
                        throw new Error(RIAPP.ERRS.ERR_ITEM_IS_NOTFOUND);
                    }
                    if(oldPos !== pos || oldItem !== v) {
                        self._onCurrentChanging(v);
                        self._currentPos = pos;
                        self._onCurrentChanged();
                    }
                };
                Collection.prototype._destroyItems = function () {
                    this._items.forEach(function (item) {
                        item.destroy();
                    });
                };
                Collection.prototype.getFieldInfo = function (fieldName) {
                    return this._fieldMap[fieldName];
                };
                Collection.prototype.getFieldNames = function () {
                    var fldMap = this._fieldMap;
                    return utils.getProps(fldMap);
                };
                Collection.prototype.cancelEdit = function () {
                    if(this.isEditing) {
                        this._EditingItem.cancelEdit();
                    }
                };
                Collection.prototype.endEdit = function () {
                    var EditingItem;
                    if(this.isEditing) {
                        EditingItem = this._EditingItem;
                        if(!EditingItem.endEdit() && EditingItem.getIsHasErrors()) {
                            this._onError(new ValidationError(EditingItem.getAllErrors(), EditingItem), EditingItem);
                            this.cancelEdit();
                        }
                    }
                };
                Collection.prototype.getItemsWithErrors = function () {
                    var self = this, res = [];
                    utils.forEachProp(this._errors, function (key) {
                        var item = self.getItemByKey(key);
                        res.push(item);
                    });
                    return res;
                };
                Collection.prototype.addNew = function () {
                    var item, isHandled;
                    item = this._createNew();
                    this._onItemAdding(item);
                    this._attach(item, null);
                    try  {
                        this.currentItem = item;
                        item.beginEdit();
                        this._onItemAdded(item);
                    } catch (ex) {
                        isHandled = this._onError(ex, this);
                        item.cancelEdit();
                        RIAPP.global.reThrow(ex, isHandled);
                    }
                    return item;
                };
                Collection.prototype.getItemByPos = function (pos) {
                    if(pos < 0 || pos >= this._items.length) {
                        return null;
                    }
                    return this._items[pos];
                };
                Collection.prototype.getItemByKey = function (key) {
                    if(!key) {
                        throw new Error(RIAPP.ERRS.ERR_KEY_IS_EMPTY);
                    }
                    var map = this._itemsByKey;
                    return map['' + key];
                };
                Collection.prototype.findByPK = function () {
                    var vals = [];
                    for (var _i = 0; _i < (arguments.length - 0); _i++) {
                        vals[_i] = arguments[_i + 0];
                    }
                    if(arguments.length === 0) {
                        return null;
                    }
                    var self = this, pkInfo = self._getPKFieldInfos(), arr = [], key, values = [];
                    if(vals.length === 1 && utils.check.isArray(vals[0])) {
                        values = vals[0];
                    } else {
                        values = vals;
                    }
                    if(values.length !== pkInfo.length) {
                        return null;
                    }
                    for(var i = 0, len = pkInfo.length; i < len; i += 1) {
                        arr.push(self._getStrValue(values[i], pkInfo[i]));
                    }
                    key = arr.join(';');
                    return self.getItemByKey(key);
                };
                Collection.prototype.moveFirst = function (skipDeleted) {
                    var pos = 0, old = this._currentPos;
                    if(old === pos) {
                        return false;
                    }
                    var item = this.getItemByPos(pos);
                    if(!item) {
                        return false;
                    }
                    if(!!skipDeleted) {
                        if(item._isDeleted) {
                            return this.moveNext(true);
                        }
                    }
                    this._onCurrentChanging(item);
                    this._currentPos = pos;
                    this._onCurrentChanged();
                    return true;
                };
                Collection.prototype.movePrev = function (skipDeleted) {
                    var pos = -1, old = this._currentPos;
                    var item = this.getItemByPos(old);
                    if(!!item) {
                        pos = old;
                        pos -= 1;
                    }
                    item = this.getItemByPos(pos);
                    if(!item) {
                        return false;
                    }
                    if(!!skipDeleted) {
                        if(item._isDeleted) {
                            this._currentPos = pos;
                            return this.movePrev(true);
                        }
                    }
                    this._onCurrentChanging(item);
                    this._currentPos = pos;
                    this._onCurrentChanged();
                    return true;
                };
                Collection.prototype.moveNext = function (skipDeleted) {
                    var pos = -1, old = this._currentPos;
                    var item = this.getItemByPos(old);
                    if(!!item) {
                        pos = old;
                        pos += 1;
                    }
                    item = this.getItemByPos(pos);
                    if(!item) {
                        return false;
                    }
                    if(!!skipDeleted) {
                        if(item._isDeleted) {
                            this._currentPos = pos;
                            return this.moveNext(true);
                        }
                    }
                    this._onCurrentChanging(item);
                    this._currentPos = pos;
                    this._onCurrentChanged();
                    return true;
                };
                Collection.prototype.moveLast = function (skipDeleted) {
                    var pos = this._items.length - 1, old = this._currentPos;
                    if(old === pos) {
                        return false;
                    }
                    var item = this.getItemByPos(pos);
                    if(!item) {
                        return false;
                    }
                    if(!!skipDeleted) {
                        if(item._isDeleted) {
                            return this.movePrev(true);
                        }
                    }
                    this._onCurrentChanging(item);
                    this._currentPos = pos;
                    this._onCurrentChanged();
                    return true;
                };
                Collection.prototype.goTo = function (pos) {
                    var old = this._currentPos;
                    if(old === pos) {
                        return false;
                    }
                    var item = this.getItemByPos(pos);
                    if(!item) {
                        return false;
                    }
                    this._onCurrentChanging(item);
                    this._currentPos = pos;
                    this._onCurrentChanged();
                    return true;
                };
                Collection.prototype.forEach = function (callback, thisObj) {
                    this._items.forEach(callback, thisObj);
                };
                Collection.prototype.removeItem = function (item) {
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
                    this._onRemoved(item, oldPos);
                    item._key = null;
                    item.removeHandler(null, null);
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
                Collection.prototype.getIsHasErrors = function () {
                    if(!this._errors) {
                        return false;
                    }
                    return (utils.getProps(this._errors).length > 0);
                };
                Collection.prototype.sort = function (fieldNames, sortOrder) {
                    var self = this, deffered = utils.createDeferred();
                    setTimeout(function () {
                        try  {
                            self.sortLocal(fieldNames, sortOrder);
                        }finally {
                            deffered.resolve();
                        }
                    }, 0);
                    return deffered.promise();
                };
                Collection.prototype.sortLocal = function (fieldNames, sortOrder) {
                    var mult = 1;
                    if(!!sortOrder && sortOrder.toUpperCase() === 'DESC') {
                        mult = -1;
                    }
                    var fn_sort = function (a, b) {
                        var res = 0, i, len, af, bf, fieldName;
                        for(i = 0 , len = fieldNames.length; i < len; i += 1) {
                            fieldName = fieldNames[i];
                            af = a[fieldName];
                            bf = b[fieldName];
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
                    this.sortLocalByFunc(fn_sort);
                };
                Collection.prototype.sortLocalByFunc = function (fn) {
                    var self = this;
                    this.waitForNotLoading(function () {
                        var cur = self.currentItem;
                        self.isLoading = true;
                        try  {
                            self._items.sort(fn);
                            self._onItemsChanged({
                                change_type: COLL_CHANGE_TYPE.RESET,
                                items: [],
                                pos: []
                            });
                        }finally {
                            self.isLoading = false;
                        }
                        self.currentItem = null;
                        self.currentItem = cur;
                    }, [], false, null);
                };
                Collection.prototype.clear = function () {
                    this.raiseEvent('clearing', {
                    });
                    this.cancelEdit();
                    this._EditingItem = null;
                    this._newKey = 0;
                    this.currentItem = null;
                    this._destroyItems();
                    this._items = [];
                    this._itemsByKey = {
                    };
                    this._errors = {
                    };
                    this._onItemsChanged({
                        change_type: COLL_CHANGE_TYPE.RESET,
                        items: [],
                        pos: []
                    });
                    this.raiseEvent('cleared', {
                    });
                    this.raisePropertyChanged('count');
                };
                Collection.prototype.destroy = function () {
                    if(this._isDestroyed) {
                        return;
                    }
                    this._isDestroyCalled = true;
                    this._waitQueue.destroy();
                    this._waitQueue = null;
                    this.clear();
                    this._fieldMap = {
                    };
                    _super.prototype.destroy.call(this);
                };
                Collection.prototype.waitForNotLoading = function (callback, callbackArgs, syncCheck, groupName) {
                    this._waitQueue.enQueue({
                        prop: 'isLoading',
                        groupName: null,
                        predicate: function (val) {
                            return !val;
                        },
                        action: callback,
                        actionArgs: callbackArgs,
                        lastWins: !!groupName,
                        syncCheck: !!syncCheck
                    });
                };
                Collection.prototype.toString = function () {
                    return 'Collection';
                };
                Object.defineProperty(Collection.prototype, "options", {
                    get: function () {
                        return this._options;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Collection.prototype, "currentItem", {
                    get: function () {
                        return this.getItemByPos(this._currentPos);
                    },
                    set: function (v) {
                        this._setCurrentItem(v);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Collection.prototype, "count", {
                    get: function () {
                        return this._items.length;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Collection.prototype, "totalCount", {
                    get: function () {
                        return this._totalCount;
                    },
                    set: function (v) {
                        if(v != this._totalCount) {
                            this._totalCount = v;
                            this.raisePropertyChanged('totalCount');
                            this.raisePropertyChanged('pageCount');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Collection.prototype, "pageSize", {
                    get: function () {
                        return this._options.pageSize;
                    },
                    set: function (v) {
                        if(this._options.pageSize !== v) {
                            this._options.pageSize = v;
                            this.raisePropertyChanged('pageSize');
                            this._onPageSizeChanged();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Collection.prototype, "pageIndex", {
                    get: function () {
                        return this._pageIndex;
                    },
                    set: function (v) {
                        if(v !== this._pageIndex && this.isPagingEnabled) {
                            if(v < 0) {
                                return;
                            }
                            if(!this._onPageChanging()) {
                                return;
                            }
                            this._pageIndex = v;
                            this._onPageChanged();
                            this.raisePropertyChanged('pageIndex');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Collection.prototype, "items", {
                    get: function () {
                        return this._items;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Collection.prototype, "isPagingEnabled", {
                    get: function () {
                        return this._options.enablePaging;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Collection.prototype, "permissions", {
                    get: function () {
                        return this._perms;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Collection.prototype, "isEditing", {
                    get: function () {
                        return !!this._EditingItem;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Collection.prototype, "isLoading", {
                    get: function () {
                        return this._isLoading;
                    },
                    set: function (v) {
                        if(this._isLoading !== v) {
                            this._isLoading = v;
                            this.raisePropertyChanged('isLoading');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Collection.prototype, "isUpdating", {
                    get: function () {
                        return this._isUpdating;
                    },
                    set: function (v) {
                        if(this._isUpdating !== v) {
                            this._isUpdating = v;
                            this.raisePropertyChanged('isUpdating');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Collection.prototype, "pageCount", {
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
                return Collection;
            })(RIAPP.BaseObject);
            collection.Collection = Collection;            
            var ListItem = (function (_super) {
                __extends(ListItem, _super);
                function ListItem(obj) {
                                _super.call(this);
                    var self = this;
                    this.__isNew = !obj;
                    //if object provided then all properties are exposed from the object
                    if(!!obj) {
                        this._vals = obj;
                    }
                    if(!obj) {
                        //if no object then fill values with nulls
                        this._collection.getFieldNames().forEach(function (name) {
                            self._vals[name] = null;
                        });
                    }
                }
                ListItem.prototype._setProp = function (name, val) {
                    var validation_error, error, coll = this._collection;
                    if(this._vals[name] !== val) {
                        try  {
                            this._vals[name] = val;
                            this.raisePropertyChanged(name);
                            coll._removeError(this, name);
                            validation_error = this._validateField(name);
                            if(!!validation_error) {
                                throw new ValidationError([
                                    validation_error
                                ], this);
                            }
                        } catch (ex) {
                            if(utils.check.isProtoOf(ValidationError, ex)) {
                                error = ex;
                            } else {
                                error = new ValidationError([
                                    {
                                        fieldName: name,
                                        errors: [
                                            ex.message
                                        ]
                                    }
                                ], this);
                            }
                            coll._addError(this, name, error.errors[0].errors);
                            throw error;
                        }
                    }
                };
                ListItem.prototype._getProp = function (name) {
                    return this._vals[name];
                };
                ListItem.prototype._resetIsNew = function () {
                    this.__isNew = false;
                };
                ListItem.prototype.toString = function () {
                    return 'ListItem';
                };
                Object.defineProperty(ListItem.prototype, "_isNew", {
                    get: function () {
                        return this.__isNew;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListItem.prototype, "_collection", {
                    get: function () {
                        return this.__coll;
                    },
                    enumerable: true,
                    configurable: true
                });
                return ListItem;
            })(CollectionItem);
            collection.ListItem = ListItem;            
            var List = (function (_super) {
                __extends(List, _super);
                function List(type_name, properties) {
                                _super.call(this);
                    this._type_name = type_name;
                    if(utils.check.isArray(properties)) {
                        this._props = properties;
                        if(this._props.length === 0) {
                            throw new Error(utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'properties', properties));
                        }
                        this._initFieldMap(false, properties);
                    } else if(properties instanceof CollectionItem) {
                        //for properties which is collection item, we can obtain names by using getFieldNames();
                        this._props = properties.getFieldNames();
                        this._initFieldMap(true, properties);
                    } else if(!!properties) {
                        //properties parameter is just simple object
                        //all its keys will be property names
                        this._props = Object.keys(properties);
                        this._initFieldMap(false, properties);
                    } else {
                        throw new Error(utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'properties', properties));
                    }
                    this._itemType = null;
                    this._createItemType();
                }
                List.create = function create(type_name, properties) {
                    return new List(type_name, properties);
                };
                List.prototype._initFieldMap = function (isCollectionItem, obj) {
                    var self = this;
                    if(!isCollectionItem) {
                        this._props.forEach(function (prop) {
                            self._fieldMap[prop] = Collection.getEmptyFieldInfo(prop);
                        });
                    } else {
                        this._props.forEach(function (prop) {
                            self._fieldMap[prop] = utils.extend(false, {
                            }, obj.getFieldInfo(prop));
                        });
                    }
                };
                List.prototype._attach = function (item) {
                    try  {
                        this.endEdit();
                    } catch (ex) {
                        RIAPP.global.reThrow(ex, this._onError(ex, this));
                    }
                    return _super.prototype._attach.call(this, item);
                };
                List.prototype._createNew = function () {
                    var item = new this._itemType(null);
                    item._key = this._getNewKey(null)//client item ID
                    ;
                    return item;
                };
                List.prototype._createItemType = function () {
                    var propDescriptors = {
                    }, self = this;
                    //create field accessor descriptor for each field
                    this.getFieldNames().forEach(function (name) {
                        propDescriptors[name] = {
                            set: function (x) {
                                this._setProp(name, x);
                            },
                            get: function () {
                                return this._getProp(name);
                            }
                        };
                    }, this);
                    this._itemType = RIAPP.MOD.utils.__extendType(ListItem, {
                        __coll: this,
                        toString: function () {
                            return self._type_name + 'Item';
                        }
                    }, propDescriptors);
                };
                List.prototype._getNewKey = //here item parameter is not used, but can be used in descendants
                function (item) {
                    var key = 'clkey_' + this._newKey;//client's item ID
                    
                    this._newKey += 1;
                    return key;
                };
                List.prototype.fillItems = function (objArray, clearAll) {
                    var self = this, newItems = [], positions = [], fetchedItems = [];
                    this._onFillStart({
                        isBegin: true,
                        rowCount: objArray.length,
                        time: new Date(),
                        isPageChanged: false
                    });
                    try  {
                        if(!!clearAll) {
                            this.clear();
                        }
                        objArray.forEach(function (obj) {
                            var item = new self._itemType(obj);
                            item._key = self._getNewKey(item);
                            var oldItem = self._itemsByKey[item._key];
                            if(!oldItem) {
                                self._items.push(item);
                                self._itemsByKey[item._key] = item;
                                newItems.push(item);
                                positions.push(self._items.length - 1);
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
                            resetUI: !!clearAll,
                            fetchedItems: fetchedItems,
                            newItems: newItems,
                            isPageChanged: false
                        });
                    }
                    this.moveFirst();
                };
                List.prototype.getNewObjects = function () {
                    return this._items.filter(function (item) {
                        return item._isNew;
                    });
                };
                List.prototype.resetNewObjects = function () {
                    this._items.forEach(function (item) {
                        item._resetIsNew();
                    });
                };
                List.prototype.toString = function () {
                    return this._type_name;
                };
                return List;
            })(Collection);
            collection.List = List;            
            var Dictionary = (function (_super) {
                __extends(Dictionary, _super);
                function Dictionary(type_name, properties, keyName) {
                    if(!keyName) {
                        throw new Error(utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'keyName', keyName));
                    }
                    this._keyName = keyName;
                                _super.call(this, type_name, properties);
                    var keyFld = this.getFieldInfo(keyName);
                    if(!keyFld) {
                        throw new Error(utils.format(RIAPP.ERRS.ERR_DICTKEY_IS_NOTFOUND, keyName));
                    }
                    keyFld.isPrimaryKey = 1;
                }
                Dictionary.create = function create(type_name, properties, keyName) {
                    return new Dictionary(type_name, properties, keyName);
                };
                Dictionary.prototype._getNewKey = function (item) {
                    if(!item) {
                        return _super.prototype._getNewKey.call(this, null);
                    }
                    var key = item[this._keyName];
                    if(utils.check.isNt(key)) {
                        throw new Error(utils.format(RIAPP.ERRS.ERR_DICTKEY_IS_EMPTY, this._keyName));
                    }
                    return '' + key;
                };
                return Dictionary;
            })(List);
            collection.Dictionary = Dictionary;            
            RIAPP.global.registerType('List', List);
            RIAPP.global.registerType('Dictionary', Dictionary);
            RIAPP.global.onModuleLoaded('collection', collection);
        })(MOD.collection || (MOD.collection = {}));
        var collection = MOD.collection;
    })(RIAPP.MOD || (RIAPP.MOD = {}));
    var MOD = RIAPP.MOD;
})(RIAPP || (RIAPP = {}));
//@ sourceMappingURL=collection.js.map

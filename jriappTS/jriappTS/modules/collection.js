var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RIAPP;
(function (RIAPP) {
    (function (MOD) {
        (function (collection) {
            //local variables for optimization
            var ValidationError = RIAPP.MOD.binding.ValidationError, DATA_TYPE = RIAPP.MOD.consts.DATA_TYPE, valueUtils = RIAPP.MOD.utils.valueUtils, baseUtils = RIAPP.baseUtils, utils;
            RIAPP.global.addOnInitialize(function (s, args) {
                utils = s.utils;
            });

            (function (FIELD_TYPE) {
                FIELD_TYPE[FIELD_TYPE["None"] = 0] = "None";
                FIELD_TYPE[FIELD_TYPE["ClientOnly"] = 1] = "ClientOnly";
                FIELD_TYPE[FIELD_TYPE["Calculated"] = 2] = "Calculated";
                FIELD_TYPE[FIELD_TYPE["Navigation"] = 3] = "Navigation";
                FIELD_TYPE[FIELD_TYPE["RowTimeStamp"] = 4] = "RowTimeStamp";
                FIELD_TYPE[FIELD_TYPE["Object"] = 5] = "Object";
                FIELD_TYPE[FIELD_TYPE["ServerCalculated"] = 6] = "ServerCalculated";
            })(collection.FIELD_TYPE || (collection.FIELD_TYPE = {}));
            var FIELD_TYPE = collection.FIELD_TYPE;
            (function (STATUS) {
                STATUS[STATUS["NONE"] = 0] = "NONE";
                STATUS[STATUS["ADDED"] = 1] = "ADDED";
                STATUS[STATUS["UPDATED"] = 2] = "UPDATED";
                STATUS[STATUS["DELETED"] = 3] = "DELETED";
            })(collection.STATUS || (collection.STATUS = {}));
            var STATUS = collection.STATUS;
            (function (COLL_CHANGE_TYPE) {
                COLL_CHANGE_TYPE[COLL_CHANGE_TYPE["REMOVE"] = 0] = "REMOVE";
                COLL_CHANGE_TYPE[COLL_CHANGE_TYPE["ADDED"] = 1] = "ADDED";
                COLL_CHANGE_TYPE[COLL_CHANGE_TYPE["RESET"] = 2] = "RESET";
                COLL_CHANGE_TYPE[COLL_CHANGE_TYPE["REMAP_KEY"] = 3] = "REMAP_KEY";
            })(collection.COLL_CHANGE_TYPE || (collection.COLL_CHANGE_TYPE = {}));
            var COLL_CHANGE_TYPE = collection.COLL_CHANGE_TYPE;
            (function (SORT_ORDER) {
                SORT_ORDER[SORT_ORDER["ASC"] = 0] = "ASC";
                SORT_ORDER[SORT_ORDER["DESC"] = 1] = "DESC";
            })(collection.SORT_ORDER || (collection.SORT_ORDER = {}));
            var SORT_ORDER = collection.SORT_ORDER;
            (function (FILTER_TYPE) {
                FILTER_TYPE[FILTER_TYPE["Equals"] = 0] = "Equals";
                FILTER_TYPE[FILTER_TYPE["Between"] = 1] = "Between";
                FILTER_TYPE[FILTER_TYPE["StartsWith"] = 2] = "StartsWith";
                FILTER_TYPE[FILTER_TYPE["EndsWith"] = 3] = "EndsWith";
                FILTER_TYPE[FILTER_TYPE["Contains"] = 4] = "Contains";
                FILTER_TYPE[FILTER_TYPE["Gt"] = 5] = "Gt";
                FILTER_TYPE[FILTER_TYPE["Lt"] = 6] = "Lt";
                FILTER_TYPE[FILTER_TYPE["GtEq"] = 7] = "GtEq";
                FILTER_TYPE[FILTER_TYPE["LtEq"] = 8] = "LtEq";
                FILTER_TYPE[FILTER_TYPE["NotEq"] = 9] = "NotEq";
            })(collection.FILTER_TYPE || (collection.FILTER_TYPE = {}));
            var FILTER_TYPE = collection.FILTER_TYPE;

            function fn_getPropertyByName(name, props) {
                var arrProps = props.filter(function (f) {
                    return f.fieldName == name;
                });
                if (!arrProps || arrProps.length != 1)
                    throw new Error(utils.format(RIAPP.ERRS.ERR_ASSERTION_FAILED, "arrProps.length == 1"));
                return arrProps[0];
            }
            collection.fn_getPropertyByName = fn_getPropertyByName;

            function fn_traverseField(fld, fn) {
                function _fn_traverseField(name, fld, fn) {
                    if (fld.fieldType == 5 /* Object */) {
                        fn(name, fld);

                        //for object fields traverse their nested properties
                        if (!!fld.nested && fld.nested.length > 0) {
                            var prop, i, len = fld.nested.length;
                            for (i = 0; i < len; i += 1) {
                                prop = fld.nested[i];
                                if (prop.fieldType == 5 /* Object */) {
                                    _fn_traverseField(name + '.' + prop.fieldName, prop, fn);
                                } else {
                                    fn(name + '.' + prop.fieldName, prop);
                                }
                            }
                        }
                    } else {
                        fn(name, fld);
                    }
                }
                _fn_traverseField(fld.fieldName, fld, fn);
            }
            collection.fn_traverseField = fn_traverseField;

            var CollectionItem = (function (_super) {
                __extends(CollectionItem, _super);
                function CollectionItem() {
                    _super.call(this);
                    this._fkey = null;
                    this._isEditing = false;
                    this._saveVals = null;
                    this._vals = {};
                    this._notEdited = true;
                }
                CollectionItem.prototype._getEventNames = function () {
                    var base_events = _super.prototype._getEventNames.call(this);
                    return ['errors_changed'].concat(base_events);
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
                    if (!isHandled) {
                        return this._collection._onError(error, source);
                    }
                    return isHandled;
                };
                CollectionItem.prototype._beginEdit = function () {
                    var coll = this._collection, isHandled;
                    if (coll.isEditing) {
                        var eitem = coll._EditingItem;
                        if (eitem === this)
                            return false;
                        try  {
                            eitem.endEdit();
                            if (eitem.getIsHasErrors()) {
                                this._onError(new ValidationError(eitem.getAllErrors(), eitem), eitem);
                                eitem.cancelEdit();
                            }
                        } catch (ex) {
                            isHandled = this._onError(ex, eitem);
                            eitem.cancelEdit();
                            RIAPP.global.reThrow(ex, isHandled);
                        }
                    }
                    if (!this._key)
                        return false;
                    this._isEditing = true;
                    this._saveVals = utils.cloneObj(this._vals);
                    this._collection.currentItem = this;
                    return true;
                };
                CollectionItem.prototype._endEdit = function () {
                    if (!this._isEditing)
                        return false;
                    var validation_errors, coll = this._collection, self = this;
                    if (this.getIsHasErrors()) {
                        return false;
                    }
                    coll._removeAllErrors(this); //revalidate all
                    validation_errors = this._validateAll();
                    if (validation_errors.length > 0) {
                        coll._addErrors(self, validation_errors);
                    }
                    if (this.getIsHasErrors()) {
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
                        val = baseUtils.getValue(this._vals, fieldName);
                        if (this._skipValidate(fieldInfo, val))
                            return res;
                        if (this._isNew) {
                            if (val === null && !fieldInfo.isNullable && !fieldInfo.isReadOnly && !fieldInfo.isAutoGenerated)
                                throw new Error(RIAPP.ERRS.ERR_FIELD_ISNOT_NULLABLE);
                        } else {
                            if (val === null && !fieldInfo.isNullable && !fieldInfo.isReadOnly)
                                throw new Error(RIAPP.ERRS.ERR_FIELD_ISNOT_NULLABLE);
                        }
                    } catch (ex) {
                        res = { fieldName: fieldName, errors: [ex.message] };
                    }
                    var tmp = this._collection._validateItemField(this, fieldName);
                    if (!!res && !!tmp) {
                        res.errors = res.errors.concat(tmp.errors);
                    } else if (!!tmp)
                        res = tmp;
                    return res;
                };
                CollectionItem.prototype._validateAll = function () {
                    var self = this, fieldInfos = this._collection.getFieldInfos(), errs = [];
                    fieldInfos.forEach(function (fld) {
                        fn_traverseField(fld, function (name, fld) {
                            if (fld.fieldType != 5 /* Object */) {
                                var res = self._validateField(name);
                                if (!!res) {
                                    errs.push(res);
                                }
                            }
                        });
                    });

                    var res = self._validate();
                    if (!!res) {
                        errs.push(res);
                    }
                    return errs;
                };
                CollectionItem.prototype._checkVal = function (fieldInfo, val) {
                    var res = val, ERRS = RIAPP.ERRS;
                    if (this._skipValidate(fieldInfo, val))
                        return res;
                    if (fieldInfo.isReadOnly && !(fieldInfo.allowClientDefault && this._isNew))
                        throw new Error(ERRS.ERR_FIELD_READONLY);
                    if ((val === null || (utils.check.isString(val) && !val)) && !fieldInfo.isNullable)
                        throw new Error(ERRS.ERR_FIELD_ISNOT_NULLABLE);

                    if (val === null)
                        return val;

                    switch (fieldInfo.dataType) {
                        case 0 /* None */:
                            break;
                        case 9 /* Guid */:
                        case 1 /* String */:
                            if (!utils.check.isString(val)) {
                                throw new Error(utils.format(ERRS.ERR_FIELD_WRONG_TYPE, val, 'String'));
                            }
                            if (fieldInfo.maxLength > 0 && val.length > fieldInfo.maxLength)
                                throw new Error(utils.format(ERRS.ERR_FIELD_MAXLEN, fieldInfo.maxLength));
                            if (fieldInfo.isNullable && val === '')
                                res = null;
                            if (!!fieldInfo.regex) {
                                var reg = new RegExp(fieldInfo.regex, "i");
                                if (!reg.test(val)) {
                                    throw new Error(utils.format(ERRS.ERR_FIELD_REGEX, val));
                                }
                            }
                            break;
                        case 10 /* Binary */:
                            if (!utils.check.isArray(val)) {
                                throw new Error(utils.format(ERRS.ERR_FIELD_WRONG_TYPE, val, 'Array'));
                            }
                            if (fieldInfo.maxLength > 0 && val.length > fieldInfo.maxLength)
                                throw new Error(utils.format(ERRS.ERR_FIELD_MAXLEN, fieldInfo.maxLength));
                            break;
                        case 2 /* Bool */:
                            if (!utils.check.isBoolean(val))
                                throw new Error(utils.format(ERRS.ERR_FIELD_WRONG_TYPE, val, 'Boolean'));
                            break;
                        case 3 /* Integer */:
                        case 4 /* Decimal */:
                        case 5 /* Float */:
                            if (!utils.check.isNumber(val))
                                throw new Error(utils.format(ERRS.ERR_FIELD_WRONG_TYPE, val, 'Number'));
                            if (!!fieldInfo.range) {
                                utils.validation.checkNumRange(Number(val), fieldInfo.range);
                            }
                            break;
                        case 6 /* DateTime */:
                        case 7 /* Date */:
                            if (!utils.check.isDate(val))
                                throw new Error(utils.format(ERRS.ERR_FIELD_WRONG_TYPE, val, 'Date'));
                            if (!!fieldInfo.range) {
                                utils.validation.checkDateRange(val, fieldInfo.range);
                            }
                            break;
                        case 8 /* Time */:
                            if (!utils.check.isDate(val))
                                throw new Error(utils.format(ERRS.ERR_FIELD_WRONG_TYPE, val, 'Time'));
                            break;
                        default:
                            throw new Error(utils.format(ERRS.ERR_PARAM_INVALID, 'dataType', fieldInfo.dataType));
                    }
                    return res;
                };
                CollectionItem.prototype._resetIsNew = function () {
                    //can reset _isNew on all items in the collection
                    //the list descendant does it
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
                    if (!itemErrors)
                        return [];
                    var name = fieldName;
                    if (!fieldName)
                        fieldName = '*';
                    if (!itemErrors[fieldName])
                        return [];
                    if (fieldName == '*')
                        name = null;
                    return [
                        { fieldName: name, errors: itemErrors[fieldName] }
                    ];
                };
                CollectionItem.prototype.getAllErrors = function () {
                    var itemErrors = this._collection._getErrors(this);
                    if (!itemErrors)
                        return [];
                    var res = [];
                    utils.forEachProp(itemErrors, function (name) {
                        var fieldName = null;
                        if (name !== '*') {
                            fieldName = name;
                        }
                        res.push({ fieldName: fieldName, errors: itemErrors[name] });
                    });
                    return res;
                };
                CollectionItem.prototype.getErrorString = function () {
                    var itemErrors = this._collection._getErrors(this);
                    if (!itemErrors)
                        return '';
                    var res = [];
                    utils.forEachProp(itemErrors, function (name) {
                        res.push(baseUtils.format('{0}: {1}', name, itemErrors[name]));
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
                    if (!this._beginEdit())
                        return false;
                    coll._onEditing(this, true, false);
                    this.raisePropertyChanged('isEditing');
                    return true;
                };
                CollectionItem.prototype.endEdit = function () {
                    var coll = this._collection;
                    if (!this._endEdit())
                        return false;
                    coll._onEditing(this, false, false);
                    this._notEdited = false;
                    this.raisePropertyChanged('isEditing');
                    return true;
                };
                CollectionItem.prototype.cancelEdit = function () {
                    if (!this._isEditing)
                        return false;
                    var coll = this._collection, isNew = this._isNew;
                    var changes = this._saveVals;
                    this._vals = this._saveVals;
                    this._saveVals = null;
                    coll._removeAllErrors(this);

                    //refresh User interface when values restored
                    coll.getFieldNames().forEach(function (name) {
                        if (changes[name] !== this._vals[name])
                            this.raisePropertyChanged(name);
                    }, this);

                    if (isNew && this._notEdited)
                        coll.removeItem(this);

                    this._isEditing = false;
                    coll._onEditing(this, false, true);
                    this.raisePropertyChanged('isEditing');
                    return true;
                };
                CollectionItem.prototype.deleteItem = function () {
                    var coll = this._collection;
                    if (this._key === null)
                        return false;
                    if (!coll._onItemDeleting(this)) {
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
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._fkey && !!this._collection && !this._collection._isClearing) {
                        this._collection.removeItem(this);
                    }
                    this._fkey = null;
                    this._saveVals = null;
                    this._vals = {};
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
                        return 0 /* NONE */;
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
                        if (v !== null)
                            v = '' + v;
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
                        if (!coll)
                            return false;
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

            var BaseCollection = (function (_super) {
                __extends(BaseCollection, _super);
                function BaseCollection() {
                    _super.call(this);
                    this._options = { enablePaging: false, pageSize: 50 };
                    this._isLoading = false;
                    this._isClearing = false;
                    this._isUpdating = false;

                    this._EditingItem = null;
                    this._perms = { canAddRow: true, canEditRow: true, canDeleteRow: true, canRefreshRow: false };

                    //includes stored on server
                    this._totalCount = 0;
                    this._pageIndex = 0;
                    this._items = [];
                    this._itemsByKey = {};
                    this._currentPos = -1;
                    this._newKey = 0;
                    this._fieldMap = {};
                    this._fieldInfos = [];
                    this._errors = {};
                    this._ignoreChangeErrors = false;
                    this._pkInfo = null;
                    this._waitQueue = new RIAPP.MOD.utils.WaitQueue(this);
                }
                BaseCollection.getEmptyFieldInfo = function (fieldName) {
                    var fieldInfo = {
                        fieldName: fieldName,
                        isPrimaryKey: 0,
                        dataType: 0 /* None */,
                        isNullable: true,
                        maxLength: -1,
                        isReadOnly: false,
                        isAutoGenerated: false,
                        allowClientDefault: false,
                        dateConversion: 0 /* None */,
                        fieldType: 1 /* ClientOnly */,
                        isNeedOriginal: false,
                        range: null,
                        regex: null,
                        nested: null,
                        dependentOn: null,
                        fullName: null
                    };
                    return fieldInfo;
                };
                BaseCollection.prototype._getEventNames = function () {
                    var base_events = _super.prototype._getEventNames.call(this);
                    return [
                        'begin_edit', 'end_edit', 'fill', 'coll_changed', 'item_deleting', 'item_adding', 'item_added',
                        'validate', 'current_changing', 'page_changing', 'errors_changed', 'status_changed', 'clearing',
                        'cleared', 'commit_changes'].concat(base_events);
                };
                BaseCollection.prototype.addOnClearing = function (fn, namespace) {
                    this.addHandler('clearing', fn, namespace);
                };
                BaseCollection.prototype.removeOnClearing = function (namespace) {
                    this.removeHandler('clearing', namespace);
                };
                BaseCollection.prototype.addOnCleared = function (fn, namespace) {
                    this.addHandler('cleared', fn, namespace);
                };
                BaseCollection.prototype.removeOnCleared = function (namespace) {
                    this.removeHandler('cleared', namespace);
                };
                BaseCollection.prototype.addOnFill = function (fn, namespace) {
                    this.addHandler('fill', fn, namespace);
                };
                BaseCollection.prototype.removeOnFill = function (namespace) {
                    this.removeHandler('fill', namespace);
                };
                BaseCollection.prototype.addOnCollChanged = function (fn, namespace) {
                    this.addHandler('coll_changed', fn, namespace);
                };
                BaseCollection.prototype.removeOnCollChanged = function (namespace) {
                    this.removeHandler('coll_changed', namespace);
                };
                BaseCollection.prototype.addOnValidate = function (fn, namespace) {
                    this.addHandler('validate', fn, namespace);
                };
                BaseCollection.prototype.removeOnValidate = function (namespace) {
                    this.removeHandler('validate', namespace);
                };
                BaseCollection.prototype.addOnItemDeleting = function (fn, namespace) {
                    this.addHandler('item_deleting', fn, namespace);
                };
                BaseCollection.prototype.removeOnItemDeleting = function (namespace) {
                    this.removeHandler('item_deleting', namespace);
                };
                BaseCollection.prototype.addOnItemAdding = function (fn, namespace) {
                    this.addHandler('item_adding', fn, namespace);
                };
                BaseCollection.prototype.removeOnItemAdding = function (namespace) {
                    this.removeHandler('item_adding', namespace);
                };
                BaseCollection.prototype.addOnItemAdded = function (fn, namespace) {
                    this.addHandler('item_added', fn, namespace);
                };
                BaseCollection.prototype.removeOnItemAdded = function (namespace) {
                    this.removeHandler('item_added', namespace);
                };
                BaseCollection.prototype.addOnCurrentChanging = function (fn, namespace) {
                    this.addHandler('current_changing', fn, namespace);
                };
                BaseCollection.prototype.removeOnCurrentChanging = function (namespace) {
                    this.removeHandler('current_changing', namespace);
                };
                BaseCollection.prototype.addOnPageChanging = function (fn, namespace) {
                    this.addHandler('page_changing', fn, namespace);
                };
                BaseCollection.prototype.removeOnPageChanging = function (namespace) {
                    this.removeHandler('page_changing', namespace);
                };
                BaseCollection.prototype.addOnErrorsChanged = function (fn, namespace) {
                    this.addHandler('errors_changed', fn, namespace);
                };
                BaseCollection.prototype.removeOnErrorsChanged = function (namespace) {
                    this.removeHandler('errors_changed', namespace);
                };
                BaseCollection.prototype.addOnBeginEdit = function (fn, namespace) {
                    this.addHandler('begin_edit', fn, namespace);
                };
                BaseCollection.prototype.removeOnBeginEdit = function (namespace) {
                    this.removeHandler('begin_edit', namespace);
                };
                BaseCollection.prototype.addOnEndEdit = function (fn, namespace) {
                    this.addHandler('end_edit', fn, namespace);
                };
                BaseCollection.prototype.removeOnEndEdit = function (namespace) {
                    this.removeHandler('end_edit', namespace);
                };
                BaseCollection.prototype.addOnCommitChanges = function (fn, namespace) {
                    this.addHandler('commit_changes', fn, namespace);
                };
                BaseCollection.prototype.removeOnCommitChanges = function (namespace) {
                    this.removeHandler('commit_changes', namespace);
                };
                BaseCollection.prototype.addOnStatusChanged = function (fn, namespace) {
                    this.addHandler('status_changed', fn, namespace);
                };
                BaseCollection.prototype.removeOnStatusChanged = function (namespace) {
                    this.removeHandler('status_changed', namespace);
                };
                BaseCollection.prototype._getStrValue = function (val, fieldInfo) {
                    var dcnv = fieldInfo.dateConversion, stz = utils.get_timeZoneOffset();
                    return valueUtils.stringifyValue(val, dcnv, fieldInfo.dataType, stz);
                };
                BaseCollection.prototype._getPKFieldInfos = function () {
                    if (!!this._pkInfo)
                        return this._pkInfo;
                    var fldMap = this._fieldMap, pk = [];
                    utils.forEachProp(fldMap, function (fldName) {
                        if (fldMap[fldName].isPrimaryKey > 0) {
                            pk.push(fldMap[fldName]);
                        }
                    });
                    pk.sort(function (a, b) {
                        return a.isPrimaryKey - b.isPrimaryKey;
                    });
                    this._pkInfo = pk;
                    return this._pkInfo;
                };
                BaseCollection.prototype._onError = function (error, source) {
                    var isHandled = _super.prototype._onError.call(this, error, source);
                    if (!isHandled) {
                        return RIAPP.global._onError(error, source);
                    }
                    return isHandled;
                };
                BaseCollection.prototype._onCurrentChanging = function (newCurrent) {
                    try  {
                        this.endEdit();
                    } catch (ex) {
                        RIAPP.global.reThrow(ex, this._onError(ex, this));
                    }
                    this.raiseEvent('current_changing', { newCurrent: newCurrent });
                };
                BaseCollection.prototype._onCurrentChanged = function () {
                    this.raisePropertyChanged('currentItem');
                };
                BaseCollection.prototype._onEditing = function (item, isBegin, isCanceled) {
                    if (this._isUpdating)
                        return;
                    if (isBegin) {
                        this._EditingItem = item;
                        this.raiseEvent('begin_edit', { item: item });
                    } else {
                        this._EditingItem = null;
                        this.raiseEvent('end_edit', { item: item, isCanceled: isCanceled });
                    }
                };

                //used by descendants when commiting submits for items
                BaseCollection.prototype._onCommitChanges = function (item, isBegin, isRejected, changeType) {
                    this.raiseEvent('commit_changes', { item: item, isBegin: isBegin, isRejected: isRejected, changeType: changeType });
                };

                //occurs when item changeType Changed (not used in simple collections)
                BaseCollection.prototype._onItemStatusChanged = function (item, oldChangeType) {
                    this.raiseEvent('status_changed', { item: item, oldChangeType: oldChangeType, key: item._key });
                };
                BaseCollection.prototype._validateItem = function (item) {
                    var args = { item: item, fieldName: null, errors: [] };
                    this.raiseEvent('validate', args);
                    if (!!args.errors && args.errors.length > 0)
                        return { fieldName: null, errors: args.errors };
                    else
                        return null;
                };
                BaseCollection.prototype._validateItemField = function (item, fieldName) {
                    var args = { item: item, fieldName: fieldName, errors: [] };
                    this.raiseEvent('validate', args);
                    if (!!args.errors && args.errors.length > 0)
                        return { fieldName: fieldName, errors: args.errors };
                    else
                        return null;
                };
                BaseCollection.prototype._addErrors = function (item, errors) {
                    var self = this;
                    this._ignoreChangeErrors = true;
                    try  {
                        errors.forEach(function (err) {
                            self._addError(item, err.fieldName, err.errors);
                        });
                    } finally {
                        this._ignoreChangeErrors = false;
                    }
                    this._onErrorsChanged(item);
                };
                BaseCollection.prototype._addError = function (item, fieldName, errors) {
                    if (!fieldName)
                        fieldName = '*';
                    if (!(utils.check.isArray(errors) && errors.length > 0)) {
                        this._removeError(item, fieldName);
                        return;
                    }
                    if (!this._errors[item._key])
                        this._errors[item._key] = {};
                    var itemErrors = this._errors[item._key];
                    itemErrors[fieldName] = errors;
                    if (!this._ignoreChangeErrors)
                        this._onErrorsChanged(item);
                };
                BaseCollection.prototype._removeError = function (item, fieldName) {
                    var itemErrors = this._errors[item._key];
                    if (!itemErrors)
                        return;
                    if (!fieldName)
                        fieldName = '*';
                    if (!itemErrors[fieldName])
                        return;
                    delete itemErrors[fieldName];
                    if (utils.getProps(itemErrors).length === 0) {
                        delete this._errors[item._key];
                    }
                    this._onErrorsChanged(item);
                };
                BaseCollection.prototype._removeAllErrors = function (item) {
                    var self = this, itemErrors = this._errors[item._key];
                    if (!itemErrors)
                        return;
                    delete this._errors[item._key];
                    self._onErrorsChanged(item);
                };
                BaseCollection.prototype._getErrors = function (item) {
                    return this._errors[item._key];
                };
                BaseCollection.prototype._onErrorsChanged = function (item) {
                    var args = { item: item };
                    this.raiseEvent('errors_changed', args);
                    item._onErrorsChanged(args);
                };
                BaseCollection.prototype._onItemDeleting = function (item) {
                    var args = { item: item, isCancel: false };
                    this.raiseEvent('item_deleting', args);
                    return !args.isCancel;
                };
                BaseCollection.prototype._onFillStart = function (args) {
                    this.raiseEvent('fill', args);
                };
                BaseCollection.prototype._onFillEnd = function (args) {
                    this.raiseEvent('fill', args);
                };
                BaseCollection.prototype._onItemsChanged = function (args) {
                    this.raiseEvent('coll_changed', args);
                };

                //new item is being added, but is not in the collection now
                BaseCollection.prototype._onItemAdding = function (item) {
                    var args = { item: item, isCancel: false };
                    this.raiseEvent('item_adding', args);
                    if (args.isCancel)
                        RIAPP.global._throwDummy(new Error('operation canceled'));
                };

                //new item has been added and now is in editing state and is currentItem
                BaseCollection.prototype._onItemAdded = function (item) {
                    var args = { item: item, isAddNewHandled: false };
                    this.raiseEvent('item_added', args);
                };
                BaseCollection.prototype._createNew = function () {
                    throw new Error('_createNew Not implemented');
                };
                BaseCollection.prototype._attach = function (item, itemPos) {
                    if (!!this._itemsByKey[item._key]) {
                        throw new Error(RIAPP.ERRS.ERR_ITEM_IS_ATTACHED);
                    }
                    try  {
                        this.endEdit();
                    } catch (ex) {
                        RIAPP.global.reThrow(ex, this._onError(ex, this));
                    }
                    var pos;
                    item._onAttaching();
                    if (utils.check.isNt(itemPos)) {
                        pos = this._items.length;
                        this._items.push(item);
                    } else {
                        pos = itemPos;
                        utils.insertIntoArray(this._items, item, pos);
                    }
                    this._itemsByKey[item._key] = item;
                    this._onItemsChanged({ change_type: 1 /* ADDED */, items: [item], pos: [pos] });
                    item._onAttach();
                    this.raisePropertyChanged('count');
                    this._onCurrentChanging(item);
                    this._currentPos = pos;
                    this._onCurrentChanged();
                    return pos;
                };
                BaseCollection.prototype._onRemoved = function (item, pos) {
                    try  {
                        this._onItemsChanged({ change_type: 0 /* REMOVE */, items: [item], pos: [pos] });
                    } finally {
                        this.raisePropertyChanged('count');
                    }
                };
                BaseCollection.prototype._onPageSizeChanged = function () {
                };
                BaseCollection.prototype._onPageChanging = function () {
                    var args = { page: this.pageIndex, isCancel: false };
                    this._raiseEvent('page_changing', args);
                    if (!args.isCancel) {
                        try  {
                            this.endEdit();
                        } catch (ex) {
                            RIAPP.global.reThrow(ex, this._onError(ex, this));
                        }
                    }
                    return !args.isCancel;
                };
                BaseCollection.prototype._onPageChanged = function () {
                };
                BaseCollection.prototype._setCurrentItem = function (v) {
                    var self = this, oldPos = self._currentPos;
                    if (!v) {
                        if (oldPos !== -1) {
                            self._onCurrentChanging(null);
                            self._currentPos = -1;
                            self._onCurrentChanged();
                        }
                        return;
                    }
                    if (!v._key)
                        throw new Error(RIAPP.ERRS.ERR_ITEM_IS_DETACHED);
                    var oldItem, pos, item = self.getItemByKey(v._key);
                    if (!item) {
                        throw new Error(RIAPP.ERRS.ERR_ITEM_IS_NOTFOUND);
                    }
                    oldItem = self.getItemByPos(oldPos);
                    pos = self._items.indexOf(v);
                    if (pos < 0)
                        throw new Error(RIAPP.ERRS.ERR_ITEM_IS_NOTFOUND);
                    if (oldPos !== pos || oldItem !== v) {
                        self._onCurrentChanging(v);
                        self._currentPos = pos;
                        self._onCurrentChanged();
                    }
                };
                BaseCollection.prototype._destroyItems = function () {
                    this._items.forEach(function (item) {
                        item.destroy();
                    });
                };
                BaseCollection.prototype._isHasProp = function (prop) {
                    //first check for indexed property name
                    if (baseUtils.startsWith(prop, '[')) {
                        var res = RIAPP.global.parser._resolveProp(this, prop);
                        return !baseUtils.isUndefined(res);
                    }
                    return _super.prototype._isHasProp.call(this, prop);
                };
                BaseCollection.prototype.getFieldInfo = function (fieldName) {
                    var parts = fieldName.split('.'), fld = this._fieldMap[parts[0]];
                    if (parts.length == 1) {
                        return fld;
                    }
                    if (fld.fieldType == 5 /* Object */) {
                        for (var i = 1; i < parts.length; i += 1) {
                            fld = fn_getPropertyByName(parts[i], fld.nested);
                        }
                        return fld;
                    }
                    throw new Error(baseUtils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'fieldName', fieldName));
                };
                BaseCollection.prototype.getFieldNames = function () {
                    return this.getFieldInfos().map(function (f) {
                        return f.fieldName;
                    });
                };
                BaseCollection.prototype.getFieldInfos = function () {
                    return this._fieldInfos;
                };
                BaseCollection.prototype.cancelEdit = function () {
                    if (this.isEditing)
                        this._EditingItem.cancelEdit();
                };
                BaseCollection.prototype.endEdit = function () {
                    var EditingItem;
                    if (this.isEditing) {
                        EditingItem = this._EditingItem;
                        if (!EditingItem.endEdit() && EditingItem.getIsHasErrors()) {
                            this._onError(new ValidationError(EditingItem.getAllErrors(), EditingItem), EditingItem);
                            this.cancelEdit();
                        }
                    }
                };
                BaseCollection.prototype.getItemsWithErrors = function () {
                    var self = this, res = [];
                    utils.forEachProp(this._errors, function (key) {
                        var item = self.getItemByKey(key);
                        res.push(item);
                    });
                    return res;
                };
                BaseCollection.prototype.addNew = function () {
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
                BaseCollection.prototype.getItemByPos = function (pos) {
                    if (pos < 0 || pos >= this._items.length)
                        return null;
                    return this._items[pos];
                };
                BaseCollection.prototype.getItemByKey = function (key) {
                    if (!key)
                        throw new Error(RIAPP.ERRS.ERR_KEY_IS_EMPTY);
                    var map = this._itemsByKey;
                    return map['' + key];
                };
                BaseCollection.prototype.findByPK = function () {
                    var vals = [];
                    for (var _i = 0; _i < (arguments.length - 0); _i++) {
                        vals[_i] = arguments[_i + 0];
                    }
                    if (arguments.length === 0)
                        return null;
                    var self = this, pkInfo = self._getPKFieldInfos(), arr = [], key, values = [];
                    if (vals.length === 1 && utils.check.isArray(vals[0])) {
                        values = vals[0];
                    } else
                        values = vals;
                    if (values.length !== pkInfo.length) {
                        return null;
                    }
                    for (var i = 0, len = pkInfo.length; i < len; i += 1) {
                        arr.push(self._getStrValue(values[i], pkInfo[i]));
                    }

                    key = arr.join(';');
                    return self.getItemByKey(key);
                };
                BaseCollection.prototype.moveFirst = function (skipDeleted) {
                    var pos = 0, old = this._currentPos;
                    if (old === pos)
                        return false;
                    var item = this.getItemByPos(pos);
                    if (!item)
                        return false;
                    if (!!skipDeleted) {
                        if (item._isDeleted) {
                            return this.moveNext(true);
                        }
                    }
                    this._onCurrentChanging(item);
                    this._currentPos = pos;
                    this._onCurrentChanged();
                    return true;
                };
                BaseCollection.prototype.movePrev = function (skipDeleted) {
                    var pos = -1, old = this._currentPos;
                    var item = this.getItemByPos(old);
                    if (!!item) {
                        pos = old;
                        pos -= 1;
                    }
                    item = this.getItemByPos(pos);
                    if (!item)
                        return false;
                    if (!!skipDeleted) {
                        if (item._isDeleted) {
                            this._currentPos = pos;
                            return this.movePrev(true);
                        }
                    }
                    this._onCurrentChanging(item);
                    this._currentPos = pos;
                    this._onCurrentChanged();
                    return true;
                };
                BaseCollection.prototype.moveNext = function (skipDeleted) {
                    var pos = -1, old = this._currentPos;
                    var item = this.getItemByPos(old);
                    if (!!item) {
                        pos = old;
                        pos += 1;
                    }
                    item = this.getItemByPos(pos);
                    if (!item)
                        return false;
                    if (!!skipDeleted) {
                        if (item._isDeleted) {
                            this._currentPos = pos;
                            return this.moveNext(true);
                        }
                    }
                    this._onCurrentChanging(item);
                    this._currentPos = pos;
                    this._onCurrentChanged();
                    return true;
                };
                BaseCollection.prototype.moveLast = function (skipDeleted) {
                    var pos = this._items.length - 1, old = this._currentPos;
                    if (old === pos)
                        return false;
                    var item = this.getItemByPos(pos);
                    if (!item)
                        return false;
                    if (!!skipDeleted) {
                        if (item._isDeleted) {
                            return this.movePrev(true);
                        }
                    }
                    this._onCurrentChanging(item);
                    this._currentPos = pos;
                    this._onCurrentChanged();
                    return true;
                };
                BaseCollection.prototype.goTo = function (pos) {
                    var old = this._currentPos;
                    if (old === pos)
                        return false;
                    var item = this.getItemByPos(pos);
                    if (!item)
                        return false;
                    this._onCurrentChanging(item);
                    this._currentPos = pos;
                    this._onCurrentChanged();
                    return true;
                };
                BaseCollection.prototype.forEach = function (callback, thisObj) {
                    this._items.forEach(callback, thisObj);
                };
                BaseCollection.prototype.removeItem = function (item) {
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
                    this._onRemoved(item, oldPos);
                    item._key = null;
                    item.removeHandler(null, null);
                    var test = this.getItemByPos(oldPos), curPos = this._currentPos;

                    //if detached item was current item
                    if (curPos === oldPos) {
                        if (!test) {
                            this._currentPos = curPos - 1;
                        }
                        this._onCurrentChanged();
                    }

                    if (curPos > oldPos) {
                        this._currentPos = curPos - 1;
                        this._onCurrentChanged();
                    }
                };
                BaseCollection.prototype.getIsHasErrors = function () {
                    if (!this._errors)
                        return false;
                    return (utils.getProps(this._errors).length > 0);
                };
                BaseCollection.prototype.sort = function (fieldNames, sortOrder) {
                    return this.sortLocal(fieldNames, sortOrder);
                };
                BaseCollection.prototype.sortLocal = function (fieldNames, sortOrder) {
                    var self = this;
                    var mult = 1;
                    if (sortOrder === 1 /* DESC */)
                        mult = -1;
                    var fn_sort = function (a, b) {
                        var res = 0, i, len, af, bf, fieldName;
                        for (i = 0, len = fieldNames.length; i < len; i += 1) {
                            fieldName = fieldNames[i];
                            af = a[fieldName];
                            bf = b[fieldName];
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
                    return self.sortLocalByFunc(fn_sort);
                };
                BaseCollection.prototype.sortLocalByFunc = function (fn) {
                    var self = this, deffered = utils.createDeferred();
                    this.waitForNotLoading(function () {
                        var cur = self.currentItem;
                        self.isLoading = true;
                        try  {
                            self._items.sort(fn);
                            self._onItemsChanged({ change_type: 2 /* RESET */, items: [], pos: [] });
                        } finally {
                            self.isLoading = false;
                            deffered.resolve();
                        }
                        self.currentItem = null;
                        self.currentItem = cur;
                    }, [], false, null);

                    return deffered.promise();
                };
                BaseCollection.prototype.clear = function () {
                    this._isClearing = true;
                    try  {
                        this.raiseEvent('clearing', {});
                        this.cancelEdit();
                        this._EditingItem = null;
                        this._newKey = 0;
                        this.currentItem = null;
                        this._destroyItems();
                        this._items = [];
                        this._itemsByKey = {};
                        this._errors = {};
                        this._onItemsChanged({ change_type: 2 /* RESET */, items: [], pos: [] });
                    } finally {
                        this._isClearing = false;
                    }
                    this.raiseEvent('cleared', {});
                    this.raisePropertyChanged('count');
                };
                BaseCollection.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._waitQueue.destroy();
                    this._waitQueue = null;
                    this.clear();
                    this._fieldMap = {};
                    this._fieldInfos = [];
                    _super.prototype.destroy.call(this);
                };
                BaseCollection.prototype.waitForNotLoading = function (callback, callbackArgs, syncCheck, groupName) {
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
                BaseCollection.prototype.toString = function () {
                    return 'Collection';
                };
                Object.defineProperty(BaseCollection.prototype, "options", {
                    get: function () {
                        return this._options;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseCollection.prototype, "currentItem", {
                    get: function () {
                        return this.getItemByPos(this._currentPos);
                    },
                    set: function (v) {
                        this._setCurrentItem(v);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseCollection.prototype, "count", {
                    get: function () {
                        return this._items.length;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseCollection.prototype, "totalCount", {
                    get: function () {
                        return this._totalCount;
                    },
                    set: function (v) {
                        if (v != this._totalCount) {
                            this._totalCount = v;
                            this.raisePropertyChanged('totalCount');
                            this.raisePropertyChanged('pageCount');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseCollection.prototype, "pageSize", {
                    get: function () {
                        return this._options.pageSize;
                    },
                    set: function (v) {
                        if (this._options.pageSize !== v) {
                            this._options.pageSize = v;
                            this.raisePropertyChanged('pageSize');
                            this._onPageSizeChanged();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseCollection.prototype, "pageIndex", {
                    get: function () {
                        return this._pageIndex;
                    },
                    set: function (v) {
                        if (v !== this._pageIndex && this.isPagingEnabled) {
                            if (v < 0)
                                return;
                            if (!this._onPageChanging()) {
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
                Object.defineProperty(BaseCollection.prototype, "items", {
                    get: function () {
                        return this._items;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseCollection.prototype, "isPagingEnabled", {
                    get: function () {
                        return this._options.enablePaging;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseCollection.prototype, "permissions", {
                    get: function () {
                        return this._perms;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseCollection.prototype, "isEditing", {
                    get: function () {
                        return !!this._EditingItem;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseCollection.prototype, "isLoading", {
                    get: function () {
                        return this._isLoading;
                    },
                    set: function (v) {
                        if (this._isLoading !== v) {
                            this._isLoading = v;
                            this.raisePropertyChanged('isLoading');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseCollection.prototype, "isUpdating", {
                    get: function () {
                        return this._isUpdating;
                    },
                    set: function (v) {
                        if (this._isUpdating !== v) {
                            this._isUpdating = v;
                            this.raisePropertyChanged('isUpdating');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseCollection.prototype, "pageCount", {
                    get: function () {
                        var rowCount = this.totalCount, rowPerPage = this.pageSize, result;

                        if ((rowCount === 0) || (rowPerPage === 0)) {
                            return 0;
                        }

                        if ((rowCount % rowPerPage) === 0) {
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
                return BaseCollection;
            })(RIAPP.BaseObject);
            collection.BaseCollection = BaseCollection;

            var Collection = (function (_super) {
                __extends(Collection, _super);
                function Collection() {
                    _super.apply(this, arguments);
                }
                return Collection;
            })(BaseCollection);
            collection.Collection = Collection;

            var ListItem = (function (_super) {
                __extends(ListItem, _super);
                function ListItem(coll, obj) {
                    _super.call(this);
                    var self = this;
                    this.__coll = coll;
                    this.__isNew = !obj;

                    //if an object provided then all properties are exposed from the object
                    if (!!obj)
                        this._vals = obj;

                    if (!obj) {
                        //if no object then set all values to nulls
                        var fieldInfos = this.__coll.getFieldInfos();
                        fieldInfos.forEach(function (fld) {
                            if (fld.fieldType != 5 /* Object */) {
                                self._vals[fld.fieldName] = null;
                            } else {
                                //object field
                                fn_traverseField(fld, function (name, fld) {
                                    if (fld.fieldType == 5 /* Object */)
                                        baseUtils.setValue(self._vals, name, {}, false);
                                    else
                                        baseUtils.setValue(self._vals, name, null, false);
                                });
                            }
                        });
                    }
                }
                ListItem.prototype._setProp = function (name, val) {
                    var validation_error, error, coll = this._collection;
                    if (this._getProp(name) !== val) {
                        try  {
                            baseUtils.setValue(this._vals, name, val, false);
                            this.raisePropertyChanged(name);
                            coll._removeError(this, name);
                            validation_error = this._validateField(name);
                            if (!!validation_error) {
                                throw new ValidationError([validation_error], this);
                            }
                        } catch (ex) {
                            if (ex instanceof ValidationError) {
                                error = ex;
                            } else {
                                error = new ValidationError([
                                    { fieldName: name, errors: [ex.message] }
                                ], this);
                            }
                            coll._addError(this, name, error.errors[0].errors);
                            throw error;
                        }
                    }
                };
                ListItem.prototype._getProp = function (name) {
                    return baseUtils.getValue(this._vals, name);
                };
                ListItem.prototype._resetIsNew = function () {
                    this.__isNew = false;
                };
                ListItem.prototype.toString = function () {
                    return this._collection.toString() + 'Item';
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

            var BaseList = (function (_super) {
                __extends(BaseList, _super);
                function BaseList(itemType, props) {
                    _super.call(this);
                    this._type_name = 'BaseList';
                    this._itemType = itemType;
                    if (!!props)
                        this._updateFieldMap(props);
                }
                BaseList.prototype._updateFieldMap = function (props) {
                    var self = this;
                    if (!utils.check.isArray(props) || props.length == 0)
                        throw new Error(baseUtils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'props', props));

                    self._fieldMap = {};
                    self._fieldInfos = [];
                    props.forEach(function (prop) {
                        var fldInfo = BaseCollection.getEmptyFieldInfo(prop.name);
                        fldInfo.dataType = prop.dtype;
                        self._fieldMap[prop.name] = fldInfo;
                        self._fieldInfos.push(fldInfo);
                        fn_traverseField(fldInfo, function (fullName, fld) {
                            fld.dependents = null;
                            fld.fullName = fullName;
                        });
                    });
                };
                BaseList.prototype._attach = function (item) {
                    try  {
                        this.endEdit();
                    } catch (ex) {
                        RIAPP.global.reThrow(ex, this._onError(ex, this));
                    }
                    return _super.prototype._attach.call(this, item);
                };
                BaseList.prototype._createNew = function () {
                    var item = new this._itemType(this, null);
                    item._key = this._getNewKey(null); //client item ID
                    return item;
                };

                //here item parameter is not used, but can be used in descendants
                BaseList.prototype._getNewKey = function (item) {
                    var key = 'clkey_' + this._newKey;
                    this._newKey += 1;
                    return key;
                };
                BaseList.prototype.fillItems = function (objArray, clearAll) {
                    var self = this, newItems = [], positions = [], fetchedItems = [];
                    if (!objArray)
                        objArray = [];
                    this._onFillStart({ isBegin: true, rowCount: objArray.length, time: new Date(), isPageChanged: false });
                    try  {
                        if (!!clearAll)
                            this.clear();
                        objArray.forEach(function (obj) {
                            var item = new self._itemType(self, obj);
                            item._key = self._getNewKey(item);
                            var oldItem = self._itemsByKey[item._key];
                            if (!oldItem) {
                                self._items.push(item);
                                self._itemsByKey[item._key] = item;
                                newItems.push(item);
                                positions.push(self._items.length - 1);
                                fetchedItems.push(item);
                            } else {
                                fetchedItems.push(oldItem);
                            }
                        });

                        if (newItems.length > 0) {
                            this._onItemsChanged({ change_type: 1 /* ADDED */, items: newItems, pos: positions });
                            this.raisePropertyChanged('count');
                        }
                    } finally {
                        this._onFillEnd({
                            isBegin: false, rowCount: fetchedItems.length, time: new Date(), resetUI: !!clearAll,
                            fetchedItems: fetchedItems, newItems: newItems, isPageChanged: false
                        });
                    }
                    this.moveFirst();
                };
                BaseList.prototype.getNewObjects = function () {
                    return this._items.filter(function (item) {
                        return item._isNew;
                    });
                };
                BaseList.prototype.resetNewObjects = function () {
                    this._items.forEach(function (item) {
                        item._resetIsNew();
                    });
                };
                BaseList.prototype.toString = function () {
                    return this._type_name;
                };
                return BaseList;
            })(BaseCollection);
            collection.BaseList = BaseList;

            var BaseDictionary = (function (_super) {
                __extends(BaseDictionary, _super);
                function BaseDictionary(itemType, keyName, props) {
                    if (!keyName)
                        throw new Error(baseUtils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'keyName', keyName));
                    this._keyName = keyName;
                    _super.call(this, itemType, props);
                    var keyFld = this.getFieldInfo(keyName);
                    if (!keyFld)
                        throw new Error(baseUtils.format(RIAPP.ERRS.ERR_DICTKEY_IS_NOTFOUND, keyName));
                    keyFld.isPrimaryKey = 1;
                }
                BaseDictionary.prototype._getNewKey = function (item) {
                    if (!item) {
                        return _super.prototype._getNewKey.call(this, null);
                    }
                    var key = item[this._keyName];
                    if (utils.check.isNt(key))
                        throw new Error(baseUtils.format(RIAPP.ERRS.ERR_DICTKEY_IS_EMPTY, this.keyName));
                    return '' + key;
                };
                BaseDictionary.prototype._onItemAdded = function (item) {
                    _super.prototype._onItemAdded.call(this, item);
                    var key = item[this._keyName];
                    this.raisePropertyChanged('[' + key + ']');
                };
                BaseDictionary.prototype._onRemoved = function (item, pos) {
                    var key = item[this._keyName];
                    _super.prototype._onRemoved.call(this, item, pos);
                    this.raisePropertyChanged('[' + key + ']');
                };
                Object.defineProperty(BaseDictionary.prototype, "keyName", {
                    get: function () {
                        return this._keyName;
                    },
                    enumerable: true,
                    configurable: true
                });
                return BaseDictionary;
            })(BaseList);
            collection.BaseDictionary = BaseDictionary;

            //private helper functions
            function getItemType(fieldNames) {
                var propDescriptors = {};

                //create field accessor descriptor for each field
                fieldNames.forEach(function (name) {
                    propDescriptors[name] = {
                        set: function (x) {
                            this._setProp(name, x);
                        },
                        get: function () {
                            return this._getProp(name);
                        }
                    };
                });

                return RIAPP.MOD.utils.__extendType(ListItem, {}, propDescriptors);
            }
            ;
            function getPropInfos(properties) {
                var props = null;
                if (utils.check.isArray(properties)) {
                    props = properties.map(function (p) {
                        return { name: p, dtype: 0 };
                    });
                } else if (properties instanceof CollectionItem) {
                    props = properties.getFieldNames().map(function (p) {
                        var fldInfo = properties.getFieldInfo(p);
                        return { name: p, dtype: fldInfo.dataType };
                    });
                } else if (!!properties) {
                    props = Object.keys(properties).map(function (p) {
                        return { name: p, dtype: 0 };
                    });
                } else
                    throw new Error(baseUtils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'properties', properties));
                return props;
            }
            ;

            var List = (function (_super) {
                __extends(List, _super);
                function List(type_name, properties) {
                    var props = getPropInfos(properties);
                    var fieldNames = props.map(function (p) {
                        return p.name;
                    });
                    var itemType = getItemType(fieldNames);
                    _super.call(this, itemType, props);
                    this._type_name = type_name;
                }
                return List;
            })(BaseList);
            collection.List = List;

            var Dictionary = (function (_super) {
                __extends(Dictionary, _super);
                function Dictionary(type_name, properties, keyName) {
                    var props = getPropInfos(properties);
                    var fieldNames = props.map(function (p) {
                        return p.name;
                    });
                    var itemType = getItemType(fieldNames);
                    _super.call(this, itemType, keyName, props);
                    this._type_name = type_name;
                }
                Dictionary.prototype._getNewKey = function (item) {
                    if (!item) {
                        return _super.prototype._getNewKey.call(this, null);
                    }
                    var key = item[this.keyName];
                    if (utils.check.isNt(key))
                        throw new Error(baseUtils.format(RIAPP.ERRS.ERR_DICTKEY_IS_EMPTY, this.keyName));
                    return '' + key;
                };
                return Dictionary;
            })(BaseDictionary);
            collection.Dictionary = Dictionary;

            RIAPP.global.onModuleLoaded('collection', collection);
        })(MOD.collection || (MOD.collection = {}));
        var collection = MOD.collection;
    })(RIAPP.MOD || (RIAPP.MOD = {}));
    var MOD = RIAPP.MOD;
})(RIAPP || (RIAPP = {}));
//# sourceMappingURL=collection.js.map

var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RIAPP;
(function (RIAPP) {
    (function (MOD) {
        (function (utils) {
            var base_utils = RIAPP.baseUtils, _newID = 0;
            //adds new properties to some prototype
            function defineProps(proto, props, propertyDescriptors) {
                var pds = propertyDescriptors || {
                }, propertyName;
                var pdsProperties = Object.getOwnPropertyNames(pds);
                pdsProperties.forEach(function (name) {
                    var pd = pds[name];
                    if(pd['enumerable'] === undefined) {
                        pd['enumerable'] = true;
                    }
                    if(pd['configurable'] === undefined) {
                        pd['configurable'] = false;
                    }
                });
                if(!!props) {
                    var simpleProperties = Object.getOwnPropertyNames(props);
                    for(var i = 0, len = simpleProperties.length; i < len; i += 1) {
                        propertyName = simpleProperties[i];
                        if(pds.hasOwnProperty(propertyName)) {
                            continue;
                        }
                        pds[propertyName] = Object.getOwnPropertyDescriptor(props, propertyName);
                    }
                }
                return Object.defineProperties(proto, pds);
            }
            utils.defineProps = defineProps;
            ;
            function extend(typeConstructor, superType) {
                function __() {
                    this.constructor = typeConstructor;
                }
                __.prototype = superType.prototype;
                typeConstructor.prototype = new __();
            }
            ;
            //we can add new properties to existing type, it generates new type - constructor function
            function __extendType(_super, pds, props) {
                var fn = function () {
                    _super.apply(this, arguments);
                };
                extend(fn, _super);
                defineProps(fn.prototype, pds, props);
                return fn;
            }
            utils.__extendType = __extendType;
            ;
            var Checks = (function () {
                function Checks() { }
                Checks.isNull = function isNull(a) {
                    return a === null;
                };
                Checks.isUndefined = function isUndefined(a) {
                    return a === undefined;
                };
                Checks.isNt = //checking for null type
                function isNt(a) {
                    return (a === null || a === undefined);
                };
                Checks.isFunction = base_utils.isFunc;
                Checks.isString = function isString(a) {
                    if(Checks.isNt(a)) {
                        return false;
                    }
                    var rx = /string/i;
                    return (typeof (a) === 'string') ? true : (typeof (a) === 'object') ? rx.test(a.constructor.toString()) : false;
                };
                Checks.isArray = base_utils.isArray;
                Checks.isBoolean = function isBoolean(a) {
                    if(Checks.isNt(a)) {
                        return false;
                    }
                    var rx = /boolean/i;
                    return (typeof (a) === 'boolean') ? true : (typeof (a) === 'object') ? rx.test(a.constructor.toString()) : false;
                };
                Checks.isDate = function isDate(a) {
                    if(Checks.isNt(a)) {
                        return false;
                    }
                    var rx = /date/i;
                    return (typeof (a) === 'date') ? true : (typeof (a) === 'object') ? rx.test(a.constructor.toString()) : false;
                };
                Checks.isHTML = function isHTML(a) {
                    if(Checks.isNt(a)) {
                        return false;
                    }
                    var rx = /html/i;
                    return (typeof (a) === 'object') ? rx.test(a.constructor.toString()) : false;
                };
                Checks.isNumber = function isNumber(a) {
                    if(Checks.isNt(a)) {
                        return false;
                    }
                    var rx = /Number/;
                    return (typeof (a) === 'number') ? true : (typeof (a) === 'object') ? rx.test(a.constructor.toString()) : false;
                };
                Checks.isObject = function isObject(a) {
                    if(Checks.isNt(a)) {
                        return false;
                    }
                    var rx = /object/i;
                    return (typeof (a) === 'object') ? rx.test(a.constructor.toString()) : false;
                };
                Checks.isSimpleObject = function isSimpleObject(a) {
                    if(Checks.isNt(a)) {
                        return false;
                    }
                    var res = Checks.isObject(a);
                    return res && (Object.prototype === Object.getPrototypeOf(a));
                };
                Checks.isRegExp = function isRegExp(a) {
                    if(Checks.isNt(a)) {
                        return false;
                    }
                    var rx = /regexp/i;
                    return (typeof (a) === 'function') ? rx.test(a.constructor.toString()) : false;
                };
                Checks.isNumeric = function isNumeric(obj) {
                    return Checks.isNumber(obj) || (Checks.isString(obj) && !isNaN(Number(obj)));
                };
                Checks.isBoolString = function isBoolString(a) {
                    if(Checks.isNt(a)) {
                        return false;
                    }
                    return (a == 'true' || a == 'false');
                };
                Checks.isProtoOf = function isProtoOf(objConstructor, obj) {
                    return !!obj && obj instanceof objConstructor;
                };
                Checks.isBaseObj = function isBaseObj(obj) {
                    return !!obj && obj instanceof RIAPP.BaseObject;
                };
                Checks.isBinding = function isBinding(obj) {
                    return !!obj && obj instanceof RIAPP.MOD.binding.Binding;
                };
                Checks.isElView = function isElView(obj) {
                    return !!obj && obj instanceof RIAPP.MOD.baseElView.BaseElView;
                };
                Checks.isTemplateElView = function isTemplateElView(obj) {
                    return !!obj && obj instanceof RIAPP.MOD.baseElView.TemplateElView;
                };
                Checks.isEditable = function isEditable(obj) {
                    return !!obj && !!obj.beginEdit && !!obj.endEdit && !!obj.cancelEdit && RIAPP.global.utils.hasProp(obj, 'isEditing');
                };
                Checks.isDataForm = function isDataForm(el) {
                    if(!el) {
                        return false;
                    }
                    var attr = el.getAttribute(RIAPP.global.consts.DATA_ATTR.DATA_VIEW);
                    if(!attr) {
                        return false;
                    }
                    var opts = RIAPP.global.parser.parseOptions(attr);
                    return (opts.length > 0 && opts[0].name === RIAPP.global.consts.ELVIEW_NM.DATAFORM);
                };
                Checks.isInsideDataForm = //check if element is placed inside DataForm
                function isInsideDataForm(el) {
                    if(!el) {
                        return false;
                    }
                    var parent = el.parentElement;
                    if(!!parent) {
                        if(!Checks.isDataForm(parent)) {
                            return Checks.isInsideDataForm(parent);
                        } else {
                            return true;
                        }
                    }
                    return false;
                };
                return Checks;
            })();
            utils.Checks = Checks;            
            var StringUtils = (function () {
                function StringUtils() { }
                StringUtils.endsWith = base_utils.endsWith;
                StringUtils.startsWith = base_utils.startsWith;
                StringUtils.trim = base_utils.trim;
                StringUtils.formatNumber = /**
                *    Usage:     formatNumber(123456.789, 2, '.', ',');
                *    result:    123,456.79
                **/
                function formatNumber(num, decimals, dec_point, thousands_sep) {
                    num = (num + '').replace(/[^0-9+-Ee.]/g, '');
                    var n = !isFinite(+num) ? 0 : +num, prec = !isFinite(+decimals) ? 0 : Math.abs(decimals), sep = (thousands_sep === undefined) ? ',' : thousands_sep, dec = (dec_point === undefined) ? '.' : dec_point, s = [
                        ''
                    ], toFixedFix = // Fix for IE parseFloat(0.55).toFixed(0) = 0;
                    function (n, prec) {
                        var k = Math.pow(10, prec);
                        return '' + Math.round(n * k) / k;
                    };
                    if(Checks.isNt(decimals)) {
                        s = ('' + n).split('.');
                        prec = 2;
                    } else {
                        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
                    }
                    var i, s0 = '', len = s[0].length;
                    if(len > 3) {
                        for(i = 0; i < len; i += 1) {
                            s0 = s0 + s[0].charAt(i);
                            if(i < (len - 1) && (len - i - 1) % 3 === 0) {
                                s0 = s0 + sep;
                            }
                        }
                        s[0] = s0;
                    }
                    if((s[1] || '').length < prec) {
                        s[1] = s[1] || '';
                        s[1] += new Array(prec - s[1].length + 1).join('0');
                    }
                    return s.join(dec);
                };
                StringUtils.stripNonNumeric = function stripNonNumeric(str) {
                    str += '';
                    var rgx = /^\d|\.|-$/;
                    var out = '';
                    for(var i = 0; i < str.length; i++) {
                        if(rgx.test(str.charAt(i))) {
                            if(!((str.charAt(i) == '.' && out.indexOf('.') != -1) || (str.charAt(i) == '-' && out.length != 0))) {
                                out += str.charAt(i);
                            }
                        }
                    }
                    return out;
                };
                return StringUtils;
            })();
            utils.StringUtils = StringUtils;            
            ;
            var Validations = (function () {
                function Validations() { }
                Validations.checkNumRange = function checkNumRange(num, range) {
                    var rangeParts = range.split(',');
                    if(!!rangeParts[0]) {
                        if(num < parseFloat(rangeParts[0])) {
                            throw new Error(base_utils.format(RIAPP.ERRS.ERR_FIELD_RANGE, num, range));
                        }
                    }
                    if(!!rangeParts[1]) {
                        if(num > parseFloat(rangeParts[1])) {
                            throw new Error(base_utils.format(RIAPP.ERRS.ERR_FIELD_RANGE, num, range));
                        }
                    }
                };
                Validations._dtRangeToDate = function _dtRangeToDate(str) {
                    var dtParts = str.split('-');
                    var dt = new Date(parseInt(dtParts[0], 10), parseInt(dtParts[1], 10) - 1, parseInt(dtParts[2], 10));
                    return dt;
                };
                Validations.checkDateRange = function checkDateRange(dt, range) {
                    var rangeParts = range.split(',');
                    if(!!rangeParts[0]) {
                        if(dt < Validations._dtRangeToDate(rangeParts[0])) {
                            throw new Error(base_utils.format(RIAPP.ERRS.ERR_FIELD_RANGE, dt, range));
                        }
                    }
                    if(!!rangeParts[1]) {
                        if(dt > Validations._dtRangeToDate(rangeParts[1])) {
                            throw new Error(base_utils.format(RIAPP.ERRS.ERR_FIELD_RANGE, dt, range));
                        }
                    }
                };
                return Validations;
            })();
            utils.Validations = Validations;            
            ;
            utils.valueUtils = {
                valueToDate: function (val, dtcnv, stz) {
                    if(!val) {
                        return null;
                    }
                    val = '' + val;
                    var parts = val.split("&");
                    if(parts.length != 7) {
                        throw new Error(base_utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'val', val));
                    }
                    var dt = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10), parseInt(parts[3], 10), parseInt(parts[4], 10), parseInt(parts[5], 10), parseInt(parts[6], 10));
                    var DATE_CONVERSION = MOD.consts.DATE_CONVERSION;
                    var ctz = RIAPP.global.utils.get_timeZoneOffset();
                    switch(dtcnv) {
                        case DATE_CONVERSION.None:
                            break;
                        case DATE_CONVERSION.ServerLocalToClientLocal:
                            dt.setMinutes(dt.getMinutes() + stz)//ServerToUTC
                            ;
                            dt.setMinutes(dt.getMinutes() - ctz)//UtcToLocal
                            ;
                            break;
                        case DATE_CONVERSION.UtcToClientLocal:
                            dt.setMinutes(dt.getMinutes() - ctz)//UtcToLocal
                            ;
                            break;
                        default:
                            throw new Error(base_utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'dtcnv', dtcnv));
                    }
                    return dt;
                },
                dateToValue: function (dt, dtcnv, stz) {
                    if(dt === null) {
                        return null;
                    }
                    if(!Checks.isDate(dt)) {
                        throw new Error(base_utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'dt', dt));
                    }
                    var DATE_CONVERSION = MOD.consts.DATE_CONVERSION;
                    var ctz = RIAPP.global.utils.get_timeZoneOffset();
                    switch(dtcnv) {
                        case DATE_CONVERSION.None:
                            break;
                        case DATE_CONVERSION.ServerLocalToClientLocal:
                            dt.setMinutes(dt.getMinutes() + ctz)//LocalToUTC
                            ;
                            dt.setMinutes(dt.getMinutes() - stz)//UtcToServer
                            ;
                            break;
                        case DATE_CONVERSION.UtcToClientLocal:
                            dt.setMinutes(dt.getMinutes() + ctz)//LocalToUTC
                            ;
                            break;
                        default:
                            throw new Error(base_utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'dtcnv', dtcnv));
                    }
                    return ("" + dt.getFullYear() + "&" + (dt.getMonth() + 1) + "&" + dt.getDate() + "&" + dt.getHours() + "&" + dt.getMinutes() + "&" + dt.getSeconds() + "&" + dt.getMilliseconds());
                },
                compareVals: function (v1, v2, dataType) {
                    if((v1 === null && v2 !== null) || (v1 !== null && v2 === null)) {
                        return false;
                    }
                    var DATA_TYPE = MOD.consts.DATA_TYPE;
                    switch(dataType) {
                        case DATA_TYPE.DateTime:
                        case DATA_TYPE.Date:
                        case DATA_TYPE.Time:
                            if(Checks.isDate(v1) && Checks.isDate(v2)) {
                                return v1.getTime() === v2.getTime();
                            } else {
                                return false;
                            }
                        default:
                            return v1 === v2;
                    }
                },
                stringifyValue: function (v, dcnv, stz) {
                    if(Checks.isNt(v)) {
                        return null;
                    }
                    if(Checks.isDate(v)) {
                        return utils.valueUtils.dateToValue(v, dcnv, stz);
                    } else {
                        return '' + v;
                    }
                },
                parseValue: function (v, dataType, dcnv, stz) {
                    var res = null;
                    if(v === undefined || v === null) {
                        return res;
                    }
                    var DATA_TYPE = MOD.consts.DATA_TYPE;
                    switch(dataType) {
                        case DATA_TYPE.None:
                            res = v;
                            break;
                        case DATA_TYPE.String:
                            res = v;
                            break;
                        case DATA_TYPE.Bool:
                            res = RIAPP.global.utils.parseBool(v);
                            break;
                        case DATA_TYPE.Integer:
                            res = parseInt(v, 10);
                            break;
                        case DATA_TYPE.Decimal:
                        case DATA_TYPE.Float:
                            res = parseFloat(v);
                            break;
                        case DATA_TYPE.DateTime:
                        case DATA_TYPE.Date:
                        case DATA_TYPE.Time:
                            res = utils.valueUtils.valueToDate(v, dcnv, stz);
                            break;
                        case DATA_TYPE.Guid:
                        case DATA_TYPE.Binary:
                            res = v;
                            break;
                        default:
                            throw new Error(base_utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'dataType', dataType));
                    }
                    return res;
                }
            };
            /*
            LifeTimeScope used to hold references to objects and destroys
            them all when LifeTimeScope is destroyed itself
            */
            var LifeTimeScope = (function (_super) {
                __extends(LifeTimeScope, _super);
                function LifeTimeScope() {
                                _super.call(this);
                    this._objs = [];
                }
                LifeTimeScope.create = function create() {
                    return new LifeTimeScope();
                };
                LifeTimeScope.prototype.addObj = function (b) {
                    if(this._objs.indexOf(b) < 0) {
                        this._objs.push(b);
                    }
                };
                LifeTimeScope.prototype.removeObj = function (b) {
                    RIAPP.global.utils.removeFromArray(this._objs, b);
                };
                LifeTimeScope.prototype.getObjs = function () {
                    return this._objs;
                };
                LifeTimeScope.prototype.destroy = function () {
                    if(this._isDestroyed) {
                        return;
                    }
                    this._isDestroyCalled = true;
                    this._objs.forEach(function (obj) {
                        if(!obj._isDestroyCalled) {
                            obj.destroy();
                        }
                    });
                    this._objs = [];
                    _super.prototype.destroy.call(this);
                };
                LifeTimeScope.prototype.toString = function () {
                    return 'LifeTimeScope';
                };
                return LifeTimeScope;
            })(RIAPP.BaseObject);
            utils.LifeTimeScope = LifeTimeScope;            
            ;
            var PropWatcher = (function (_super) {
                __extends(PropWatcher, _super);
                function PropWatcher() {
                                _super.call(this);
                    this._objId = 'prw' + RIAPP.global.utils.getNewID();
                    this._objs = [];
                }
                PropWatcher.create = function create() {
                    return new PropWatcher();
                };
                PropWatcher.prototype.addPropWatch = function (obj, prop, fn_onChange) {
                    var self = this;
                    obj.addOnPropertyChange(prop, function (s, a) {
                        fn_onChange(a.property);
                    }, self.uniqueID);
                    if(self._objs.indexOf(obj) < 0) {
                        self._objs.push(obj);
                    }
                };
                PropWatcher.prototype.addWatch = function (obj, props, fn_onChange) {
                    var self = this;
                    obj.addOnPropertyChange('*', function (s, a) {
                        if(props.indexOf(a.property) > -1) {
                            fn_onChange(a.property);
                        }
                    }, self.uniqueID);
                    if(self._objs.indexOf(obj) < 0) {
                        self._objs.push(obj);
                    }
                };
                PropWatcher.prototype.removeWatch = function (obj) {
                    obj.removeNSHandlers(this.uniqueID);
                };
                PropWatcher.prototype.destroy = function () {
                    if(this._isDestroyed) {
                        return;
                    }
                    this._isDestroyCalled = true;
                    var self = this;
                    this._objs.forEach(function (obj) {
                        self.removeWatch(obj);
                    });
                    this._objs = [];
                    _super.prototype.destroy.call(this);
                };
                PropWatcher.prototype.toString = function () {
                    return 'PropWatcher ' + this._objId;
                };
                Object.defineProperty(PropWatcher.prototype, "uniqueID", {
                    get: function () {
                        return this._objId;
                    },
                    enumerable: true,
                    configurable: true
                });
                return PropWatcher;
            })(RIAPP.BaseObject);
            utils.PropWatcher = PropWatcher;            
            ;
            /*
            waits for property change on the object (the owner)
            then checks queue of actions for the property change
            based on property value checking predicate
            if the predicate returns true, invokes the task's action
            */
            var WaitQueue = (function (_super) {
                __extends(WaitQueue, _super);
                function WaitQueue(owner) {
                                _super.call(this);
                    this._objId = 'wq' + RIAPP.global.utils.getNewID();
                    this._owner = owner;
                    this._queue = {
                    };
                }
                WaitQueue.create = function create(owner) {
                    return new WaitQueue(owner);
                };
                WaitQueue.prototype._checkQueue = function (prop, value) {
                    if(!this._owner || this._owner._isDestroyCalled) {
                        return;
                    }
                    var self = this, propQueue = this._queue[prop], task;
                    if(!propQueue || propQueue.length == 0) {
                        return;
                    }
                    var i, firstWins, groups = {
                        group: null,
                        arr: []
                    }, found = [], forRemoval = [];
                    for(i = 0; i < propQueue.length; i += 1) {
                        task = propQueue[i];
                        if(task.predicate(value)) {
                            if(!task.group && groups.arr.length == 0) {
                                firstWins = task;
                                break;
                            } else if(!!task.group) {
                                //the task in the group of tasks
                                if(!groups.group) {
                                    groups.group = task.group;
                                }
                                if(groups.group === task.group) {
                                    groups.arr.push(task)//if the task in the same group, add it to the array
                                    ;
                                }
                            }
                        }
                    }
                    if(!!firstWins) {
                        //the first task will be executed, in normal queued order, the rest tasks are waiting
                        found.push(firstWins);
                        forRemoval.push(firstWins);
                    } else {
                        while(groups.arr.length > 0) {
                            task = groups.arr.pop();
                            if(!firstWins) {
                                firstWins = task;
                            }
                            if(firstWins.lastWins) {
                                //the last task wins, the rest is ignored
                                if(found.length == 0) {
                                    found.push(task);
                                }//add only the last task, the rest just remove from queue
                                
                            } else {
                                found.push(task);
                            }//add all tasks in the group, they will be executed all
                            
                            forRemoval.push(task);
                        }
                    }
                    try  {
                        if(found.length > 0) {
                            i = propQueue.length;
                            while(i > 0) {
                                i -= 1;
                                if(forRemoval.indexOf(propQueue[i]) > -1) {
                                    propQueue.splice(i, 1);
                                }
                            }
                            found.forEach(function (task) {
                                try  {
                                    task.action.apply(self._owner, task.args);
                                } catch (ex) {
                                    self._owner._onError(ex, self);
                                }
                            });
                        }
                    }finally {
                        if(propQueue.length == 0) {
                            delete this._queue[prop];
                            this._owner.removeOnPropertyChange(prop, this.uniqueID);
                        }
                    }
                };
                WaitQueue.prototype.enQueue = function (options) {
                    var opts = RIAPP.global.utils.extend(false, {
                        prop: "",
                        groupName: null,
                        predicate: null,
                        action: null,
                        actionArgs: [],
                        lastWins: false,
                        syncCheck: false
                    }, options);
                    var self = this;
                    if(!this._owner) {
                        return;
                    }
                    var property = opts.prop, propQueue = this._queue[property];
                    if(!propQueue) {
                        propQueue = [];
                        this._queue[property] = propQueue;
                        this._owner.addOnPropertyChange(property, function (s, a) {
                            setTimeout(function () {
                                if(self._isDestroyCalled) {
                                    return;
                                }
                                self._checkQueue(property, self._owner[property]);
                            }, 0);
                        }, self.uniqueID);
                    }
                    var task = {
                        predicate: opts.predicate,
                        action: opts.action,
                        group: opts.groupName,
                        lastWins: opts.lastWins,
                        args: (!opts.actionArgs ? [] : opts.actionArgs)
                    };
                    propQueue.push(task);
                    if(!!opts.syncCheck) {
                        self._checkQueue(property, self._owner[property]);
                    } else {
                        setTimeout(function () {
                            if(self._isDestroyCalled) {
                                return;
                            }
                            self._checkQueue(property, self._owner[property]);
                        }, 0);
                    }
                };
                WaitQueue.prototype.destroy = function () {
                    if(this._isDestroyed) {
                        return;
                    }
                    this._isDestroyCalled = true;
                    this._owner.removeOnPropertyChange(null, this.uniqueID);
                    this._queue = {
                    };
                    this._owner = null;
                    _super.prototype.destroy.call(this);
                };
                WaitQueue.prototype.toString = function () {
                    return 'WaitQueue ' + this._objId;
                };
                Object.defineProperty(WaitQueue.prototype, "uniqueID", {
                    get: function () {
                        return this._objId;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WaitQueue.prototype, "owner", {
                    get: function () {
                        return this._owner;
                    },
                    enumerable: true,
                    configurable: true
                });
                return WaitQueue;
            })(RIAPP.BaseObject);
            utils.WaitQueue = WaitQueue;            
            ;
            var Utils = (function () {
                function Utils() {
                    this.slice = Array.prototype.slice;
                    this.get_timeZoneOffset = (function () {
                        var dt = new Date();
                        var tz = dt.getTimezoneOffset();
                        return function () {
                            return tz;
                        };
                    })();
                    this.format = base_utils.format;
                    /*
                    * Generate a random uuid.
                    *
                    * USAGE: utils.uuid(length, radix)
                    *   length - the desired number of characters
                    *   radix  - the number of allowable values for each character.
                    *
                    * EXAMPLES:
                    *   // No arguments  - returns RFC4122, version 4 ID
                    *   >>> utils.uuid()
                    *   "92329D39-6F5C-4520-ABFC-AAB64544E172"
                    *
                    *   // One argument - returns ID of the specified length
                    *   >>> utils.uuid(15)     // 15 character ID (default base=62)
                    *   "VcydxgltxrVZSTV"
                    *
                    *   // Two arguments - returns ID of the specified length, and radix. (Radix must be <= 62)
                    *   >>> utils.uuid(8, 2)  // 8 character ID (base=2)
                    *   "01001010"
                    *   >>> utils.uuid(8, 10) // 8 character ID (base=10)
                    *   "47473046"
                    *   >>> utils.uuid(8, 16) // 8 character ID (base=16)
                    *   "098F4D35"
                    */
                    this.uuid = (function () {
                        // Private array of chars to use
                        var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
                        return function (len, radix) {
                            var i, chars = CHARS, uuid = [], rnd = Math.random;
                            radix = radix || chars.length;
                            if(!!len) {
                                // Compact form
                                for(i = 0; i < len; i += 1) {
                                    uuid[i] = chars[0 | rnd() * radix];
                                }
                            } else {
                                // rfc4122, version 4 form
                                var r;
                                // rfc4122 requires these characters
                                uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
                                uuid[14] = '4';
                                // Fill in random data.  At i==19 set the high bits of clock sequence as
                                // per rfc4122, sec. 4.1.5
                                for(i = 0; i < 36; i += 1) {
                                    if(!uuid[i]) {
                                        r = 0 | rnd() * 16;
                                        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r & 0xf];
                                    }
                                }
                            }
                            return uuid.join('');
                        };
                    })();
                }
                Utils.create = function create() {
                    return new Utils();
                };
                Object.defineProperty(Utils.prototype, "check", {
                    get: function () {
                        return Checks;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Utils.prototype, "str", {
                    get: function () {
                        return StringUtils;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Utils.prototype, "validation", {
                    get: function () {
                        return Validations;
                    },
                    enumerable: true,
                    configurable: true
                });
                Utils.prototype.getNewID = function () {
                    var id = _newID;
                    _newID += 1;
                    return id;
                };
                Utils.prototype.isContained = function (oNode, oCont) {
                    if(!oNode) {
                        return false;
                    }
                    while(!!(oNode = oNode.parentNode)) {
                        if(oNode === oCont) {
                            return true;
                        }
                    }
                    return false;
                };
                Utils.prototype.parseBool = function (bool_value) {
                    if(Checks.isBoolean(bool_value)) {
                        return bool_value;
                    }
                    var v = base_utils.trim(bool_value).toLowerCase();
                    if(v === 'false') {
                        return false;
                    }
                    if(v === 'true') {
                        return true;
                    }
                    throw new Error(this.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'bool_value', bool_value));
                };
                Utils.prototype.round = function (num, decimals) {
                    return parseFloat(num.toFixed(decimals));
                };
                Utils.prototype.performAjaxCall = function (url, postData, async, fn_success, fn_error, context) {
                    var req = new XMLHttpRequest(), mimeType = 'application/json; charset=utf-8';
                    req.open('POST', url, async);
                    var deferred = this.createDeferred();
                    req.responseType = 'text';
                    req.onload = function (e) {
                        if(this.status == 200) {
                            var res = this.response;
                            deferred.resolve(res);
                        }
                    };
                    req.onerror = function (e) {
                        deferred.reject(new Error(e.target.status));
                    };
                    req.ontimeout = function () {
                        deferred.reject(new Error("The request for " + url + " timed out."));
                    };
                    req.timeout = RIAPP.global.defaults.ajaxTimeOut * 1000;
                    req.setRequestHeader('Content-Type', mimeType);
                    req.send(postData);
                    var promise = deferred.promise();
                    if(!!fn_success) {
                        promise.done(function (data) {
                            fn_success.call(context, data);
                        });
                    }
                    if(!!fn_error) {
                        promise.fail(function (err) {
                            fn_error.call(context, err);
                        });
                    }
                    return promise;
                };
                Utils.prototype.performAjaxGet = function (url) {
                    var req = new XMLHttpRequest();
                    req.open('GET', url, true)/* always async mode */
                    ;
                    var deferred = this.createDeferred();
                    req.responseType = 'text';
                    req.onload = function (e) {
                        if(this.status == 200) {
                            var res = this.response;
                            deferred.resolve(res);
                        }
                    };
                    req.onerror = function (e) {
                        deferred.reject(new Error(e.target.status));
                    };
                    req.ontimeout = function () {
                        deferred.reject(new Error("The request for " + url + " timed out."));
                    };
                    req.timeout = RIAPP.global.defaults.ajaxTimeOut * 1000;
                    req.send(null);
                    var promise = deferred.promise();
                    return promise;
                };
                Utils.prototype.extend = function (deep, defaults, options) {
                    if(deep) {
                        return this.cloneObj(options, defaults);
                    } else {
                        return this.mergeObj(options, defaults);
                    }
                };
                Utils.prototype.removeNode = function (node) {
                    if(!node) {
                        return;
                    }
                    var pnd = node.parentNode;
                    if(!!pnd) {
                        pnd.removeChild(node);
                    }
                };
                Utils.prototype.insertAfter = function (referenceNode, newNode) {
                    var parent = referenceNode.parentNode;
                    if(parent.lastChild === referenceNode) {
                        parent.appendChild(newNode);
                    } else {
                        parent.insertBefore(newNode, referenceNode.nextSibling);
                    }
                };
                Utils.prototype.getProps = function (obj) {
                    return Object.getOwnPropertyNames(obj);
                };
                Utils.prototype.forEachProp = function (obj, fn) {
                    var names = Object.getOwnPropertyNames(obj);
                    names.forEach(fn);
                };
                Utils.prototype.addToolTip = function ($el, tip, className) {
                    var options = {
                        content: {
                            text: tip
                        },
                        style: {
                            classes: !!className ? className : null
                        },
                        position: {
                            my: 'top left',
                            at: 'bottom right',
                            target: $el,
                            viewport: RIAPP.global.$(RIAPP.global.window),
                            adjust: {
                                method: 'flip none',
                                x: 0,
                                y: 0
                            }
                        },
                        hide: {
                            fixed: true,
                            delay: 250
                        }
                    };
                    if(!!$el.data('qtip')) {
                        if(!tip) {
                            $el['qtip']('destroy');
                        } else {
                            $el['qtip']('option', 'content.text', tip);
                        }
                    } else if(!!tip) {
                        $el['qtip'](options);
                    }
                };
                Utils.prototype.hasProp = function (obj, prop) {
                    if(!obj) {
                        return false;
                    }
                    var res = obj.hasOwnProperty(prop);
                    if(res) {
                        return true;
                    } else {
                        if(Object === obj) {
                            return false;
                        } else {
                            var pr = Object.getPrototypeOf(obj);
                            return this.hasProp(pr, prop);
                        }
                    }
                };
                Utils.prototype.createDeferred = function () {
                    return RIAPP.global.$.Deferred();
                };
                Utils.prototype.cloneObj = function (o, mergeIntoObj) {
                    var c, i, len, self = this;
                    if(!o) {
                        return o;
                    }
                    if(self.check.isArray(o)) {
                        len = o.length;
                        c = new Array(len);
                        for(i = 0; i < len; i += 1) {
                            c[i] = self.cloneObj(o[i], null);
                        }
                    } else if(self.check.isSimpleObject(o)) {
                        //clone only simple objects
                        c = mergeIntoObj || {
                        };
                        var p, keys = Object.getOwnPropertyNames(o);
                        len = keys.length;
                        for(i = 0; i < len; i += 1) {
                            p = keys[i];
                            c[p] = self.cloneObj(o[p], null);
                        }
                    } else {
                        return o;
                    }
                    return c;
                };
                Utils.prototype.shallowCopy = function (o) {
                    return this.mergeObj(o, {
                    });
                };
                Utils.prototype.mergeObj = function (obj, mergeIntoObj) {
                    if(!mergeIntoObj) {
                        mergeIntoObj = {
                        };
                    }
                    if(!obj) {
                        return mergeIntoObj;
                    }
                    var names = Object.getOwnPropertyNames(obj), n;
                    for(var i = 0, len = names.length; i < len; i += 1) {
                        n = names[i];
                        mergeIntoObj[n] = obj[n];
                    }
                    return mergeIntoObj;
                };
                Utils.prototype.removeFromArray = function (array, obj) {
                    var i = array.indexOf(obj);
                    if(i > -1) {
                        array.splice(i, 1);
                    }
                    return i;
                };
                Utils.prototype.insertIntoArray = function (array, obj, pos) {
                    array.splice(pos, 0, obj);
                };
                Utils.prototype.destroyJQueryPlugin = function ($el, name) {
                    var plugin = $el.data(name);
                    if(!!plugin) {
                        $el[name]('destroy');
                    }
                };
                return Utils;
            })();
            utils.Utils = Utils;            
            ;
            RIAPP.global.registerType('PropWatcher', PropWatcher);
            RIAPP.global.registerType('LifeTimeScope', LifeTimeScope);
            RIAPP.global.registerType('WaitQueue', WaitQueue);
            RIAPP.global.onModuleLoaded('utils', utils);
        })(MOD.utils || (MOD.utils = {}));
        var utils = MOD.utils;
    })(RIAPP.MOD || (RIAPP.MOD = {}));
    var MOD = RIAPP.MOD;
})(RIAPP || (RIAPP = {}));
//@ sourceMappingURL=utils.js.map

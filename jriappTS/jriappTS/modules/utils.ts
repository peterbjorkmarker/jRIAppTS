module RIAPP {
    export module MOD {
        export module utils {
            var base_utils = RIAPP.baseUtils, _newID = 0;
            //adds new properties to some prototype
            export function defineProps(proto, props?: any, propertyDescriptors?:any) {
                var pds = propertyDescriptors || {}, propertyName;
                var pdsProperties = Object.getOwnPropertyNames(pds);
                pdsProperties.forEach(function (name) {
                    var pd = pds[name];
                    if (pd['enumerable'] === undefined) {
                        pd['enumerable'] = true;
                    }
                    if (pd['configurable'] === undefined) {
                        pd['configurable'] = false;
                    }
                });
              
                if (!!props) {
                    var simpleProperties = Object.getOwnPropertyNames(props);
                    for (var i = 0, len = simpleProperties.length; i < len; i += 1) {
                        propertyName = simpleProperties[i];
                        if (pds.hasOwnProperty(propertyName)) {
                            continue;
                        }

                        pds[propertyName] = Object.getOwnPropertyDescriptor(props, propertyName);
                    }
                }

                return Object.defineProperties(proto, pds);
            };

            function extend(typeConstructor, superType) {
                for (var p in superType) if (superType.hasOwnProperty(p)) typeConstructor[p] = superType[p];
                function __() { this.constructor = typeConstructor; }
                __.prototype = superType.prototype;
                typeConstructor.prototype = new __();
            };
           
            //we can add new properties to existing type, it generates new type - constructor function
            export function __extendType(_super, pds, props) {
                var fn = function () {
                    _super.apply(this, arguments);
                }
                extend(fn, _super);
                defineProps(fn.prototype, pds, props);
                return fn;
            }

            export interface IEditable {
                beginEdit(): boolean;
                endEdit(): boolean;
                cancelEdit(): boolean;
                isEditing: boolean;
            };

            export interface ISubmittable {
                submitChanges(): IVoidPromise;
                _isCanSubmit: boolean;
            }

            export interface IDatepicker {
                datepickerRegion: string;
                dateFormat: string;
                attachTo($el:any, options?:any);
                detachFrom($el: any);
                parseDate(str: string): Date;
                formatDate(date: Date): string;
            } 

            export class Checks {
                static isNull(a) {
                    return a === null;
                }
                static isUndefined(a) {
                    return a === undefined;
                }
                //checking for null type
                static isNt(a) {
                    return (a === null || a === undefined);
                }
                static isFunction = base_utils.isFunc;
                static isString(a) {
                    if (Checks.isNt(a)) return false;
                    var rx = /string/i;
                    return (typeof (a) === 'string') ? true : (typeof (a) === 'object') ? rx.test(a.constructor.toString()) : false;
                }
                static isArray = base_utils.isArray;
                static isBoolean(a) {
                    if (Checks.isNt(a)) return false;
                    var rx = /boolean/i;
                    return (typeof (a) === 'boolean') ? true : (typeof (a) === 'object') ? rx.test(a.constructor.toString()) : false;
                }
                static isDate(a) {
                    if (Checks.isNt(a)) return false;
                    var rx = /date/i;
                    return (typeof (a) === 'date') ? true : (typeof (a) === 'object') ? rx.test(a.constructor.toString()) : false;
                }
                static isHTML(a) {
                    if (Checks.isNt(a)) return false;
                    var rx = /html/i;
                    return (typeof (a) === 'object') ? rx.test(a.constructor.toString()) : false;
                }
                static isNumber(a) {
                    if (Checks.isNt(a)) return false;
                    var rx = /Number/;
                    return (typeof (a) === 'number') ? true : (typeof (a) === 'object') ? rx.test(a.constructor.toString()) : false;
                }
                static isObject(a) {
                    if (Checks.isNt(a)) return false;
                    var rx = /object/i;
                    return (typeof (a) === 'object') ? rx.test(a.constructor.toString()) : false;
                }
                static isSimpleObject(a) {
                    if (Checks.isNt(a)) return false;
                    var res = Checks.isObject(a);
                    return res && (Object.prototype === Object.getPrototypeOf(a));
                }
                static isRegExp(a) {
                    if (Checks.isNt(a)) return false;
                    var rx = /regexp/i;
                    return (typeof (a) === 'function') ? rx.test(a.constructor.toString()) : false;
                }
                static isNumeric(obj) {
                    return Checks.isNumber(obj) || (Checks.isString(obj) && !isNaN(Number(obj)));
                }
                static isBoolString(a) {
                    if (Checks.isNt(a)) return false;
                    return (a == 'true' || a == 'false');
                }
                static isBaseObj(obj) {
                    return !!obj && obj instanceof BaseObject;
                }
                static isBinding(obj) {
                    return !!obj && obj instanceof MOD.binding.Binding;
                }
                static isElView(obj) {
                    return !!obj && obj instanceof MOD.baseElView.BaseElView;
                }
                static isTemplateElView(obj) {
                    return !!obj && obj instanceof MOD.baseElView.TemplateElView;
                }
                static isEditable(obj) {
                    return !!obj && !!obj.beginEdit && !!obj.endEdit && !!obj.cancelEdit && global.utils.hasProp(obj,'isEditing');
                }
                static isDataForm(el: HTMLElement) {
                    if (!el)
                        return false;
                    if (el.hasAttribute(global.consts.DATA_ATTR.DATA_FORM))
                        return true;
                    var attr = el.getAttribute(global.consts.DATA_ATTR.DATA_VIEW);
                    if (!attr) {
                        return false;
                    }
                    var opts = global.parser.parseOptions(attr);
                    return (opts.length > 0 && opts[0].name === global.consts.ELVIEW_NM.DATAFORM);
                }
                //check if element is placed inside DataForm
                static isInsideDataForm(el:HTMLElement) {
                    if (!el)
                        return false;
                    var parent = el.parentElement;
                    if (!!parent) {
                        if (!Checks.isDataForm(parent)) {
                            return Checks.isInsideDataForm(parent);
                        }
                        else
                            return true;
                    }
                    return false;
                }
            }

            export class StringUtils {
                static endsWith = base_utils.endsWith;
                static startsWith = base_utils.startsWith;
                static trim = base_utils.trim;
                /**
                 *    Usage:     formatNumber(123456.789, 2, '.', ',');
                 *    result:    123,456.79
                 **/
                static formatNumber(num:any, decimals?:number, dec_point?:string, thousands_sep?:string) {
                    num = (num + '').replace(/[^0-9+-Ee.]/g, '');
                    var n = !isFinite(+num) ? 0 : +num,
                        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
                        sep = (thousands_sep === undefined) ? ',' : thousands_sep,
                        dec = (dec_point === undefined) ? '.' : dec_point,
                        s = [''],
                    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
                        toFixedFix = function (n, prec) {
                            var k = Math.pow(10, prec);
                            return '' + Math.round(n * k) / k;
                        };

                    if (Checks.isNt(decimals)) {
                        s = ('' + n).split('.');
                        prec = 2;
                    }
                    else
                        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');

                    var i, s0 = '', len = s[0].length;
                    if (len > 3) {
                        for (i = 0; i < len; i += 1) {
                            s0 = s0 + s[0].charAt(i);
                            if (i < (len - 1) && (len - i - 1) % 3 === 0)
                                s0 = s0 + sep;
                        }
                        s[0] = s0;
                    }
                    if ((s[1] || '').length < prec) {
                        s[1] = s[1] || '';
                        s[1] += new Array(prec - s[1].length + 1).join('0');
                    }
                    return s.join(dec);
                }
                static stripNonNumeric(str:string) {
                    str += '';
                    var rgx = /^\d|\.|-$/;
                    var out = '';
                    for (var i = 0; i < str.length; i++) {
                        if (rgx.test(str.charAt(i))) {
                            if (!((str.charAt(i) == '.' && out.indexOf('.') != -1) ||
                                (str.charAt(i) == '-' && out.length != 0))) {
                                out += str.charAt(i);
                            }
                        }
                    }
                    return out;
                }
            };

            export class Validations{
                static checkNumRange(num:number, range:string) {
                    var rangeParts = range.split(',');
                    if (!!rangeParts[0]) {
                        if (num < parseFloat(rangeParts[0])) {
                            throw new Error(base_utils.format(RIAPP.ERRS.ERR_FIELD_RANGE, num, range));
                        }
                    }
                    if (!!rangeParts[1]) {
                        if (num > parseFloat(rangeParts[1])) {
                            throw new Error(base_utils.format(RIAPP.ERRS.ERR_FIELD_RANGE, num, range));
                        }
                    }
                }
                static _dtRangeToDate(str:string) {
                    var dtParts = str.split('-');
                    var dt = new Date(parseInt(dtParts[0], 10), parseInt(dtParts[1], 10) - 1, parseInt(dtParts[2],10));
                    return dt;
                }
                static checkDateRange(dt:Date, range: string) {
                    var rangeParts = range.split(',');
                    if (!!rangeParts[0]) {
                        if (dt < Validations._dtRangeToDate(rangeParts[0])) {
                            throw new Error(base_utils.format(RIAPP.ERRS.ERR_FIELD_RANGE, dt, range));
                        }
                    }
                    if (!!rangeParts[1]) {
                        if (dt > Validations._dtRangeToDate(rangeParts[1])) {
                            throw new Error(base_utils.format(RIAPP.ERRS.ERR_FIELD_RANGE, dt, range));
                        }
                    }
                }
            };

            export interface IValueUtils {
                valueToDate(val:string, dtcnv:number, stz:number): Date;
                dateToValue(dt: Date, dtcnv:number, stz:number): string;
                compareVals(v1, v2, dataType:number): boolean;
                stringifyValue(v, dcnv:number, stz:number): string;
                parseValue(v: string, dataType, dcnv, stz): any;
            }
            
            export var valueUtils: IValueUtils = {
                valueToDate: function (val: string, dtcnv: number, stz: number): Date {
                    if (!val)
                        return null;
                    val = '' + val;
                    var parts = val.split("&");
                    if (parts.length != 7) {
                        throw new Error(base_utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'val', val));
                    }
                    var dt = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10), parseInt(parts[3], 10),
                        parseInt(parts[4], 10), parseInt(parts[5], 10), (!!parts[6]) ? parseInt(parts[6],10):0);
                    var DATE_CONVERSION = consts.DATE_CONVERSION;
                    var ctz = global.utils.get_timeZoneOffset();

                    switch (dtcnv) {
                        case DATE_CONVERSION.None:
                            break;
                        case DATE_CONVERSION.ServerLocalToClientLocal:
                            dt.setMinutes(dt.getMinutes() + stz); //ServerToUTC
                            dt.setMinutes(dt.getMinutes() - ctz); //UtcToLocal
                            break;
                        case DATE_CONVERSION.UtcToClientLocal:
                            dt.setMinutes(dt.getMinutes() - ctz); //UtcToLocal
                            break;
                        default:
                            throw new Error(base_utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'dtcnv', dtcnv));
                    }
                    return dt;
                },
                dateToValue: function (dt: Date, dtcnv: number, serverTZ: number): string {
                    if (dt === null)
                        return null;
                    if (!Checks.isDate(dt))
                        throw new Error(base_utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'dt', dt));
                    var DATE_CONVERSION = consts.DATE_CONVERSION;
                    var ctz = global.utils.get_timeZoneOffset();
                    switch (dtcnv) {
                        case DATE_CONVERSION.None:
                            break;
                        case DATE_CONVERSION.ServerLocalToClientLocal:
                            dt.setMinutes(dt.getMinutes() + ctz); //LocalToUTC
                            dt.setMinutes(dt.getMinutes() - serverTZ); //UtcToServer
                            break;
                        case DATE_CONVERSION.UtcToClientLocal:
                            dt.setMinutes(dt.getMinutes() + ctz); //LocalToUTC
                            break;
                        default:
                            throw new Error(base_utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'dtcnv', dtcnv));
                    }
                    return ("" + dt.getFullYear() + "&" + (dt.getMonth() + 1) + "&" + dt.getDate() + "&" + dt.getHours() + "&" + dt.getMinutes() + "&" + dt.getSeconds() + "&" + dt.getMilliseconds());
                },
                compareVals: function (v1, v2, dataType: number): boolean {
                    if ((v1 === null && v2 !== null) || (v1 !== null && v2 === null))
                        return false;
                    var DATA_TYPE = consts.DATA_TYPE;
                    switch (dataType) {
                        case DATA_TYPE.DateTime:
                        case DATA_TYPE.Date:
                        case DATA_TYPE.Time:
                            if (Checks.isDate(v1) && Checks.isDate(v2))
                                return v1.getTime() === v2.getTime();
                            else
                                return false;
                        default:
                            return v1 === v2;
                    }
                },
                stringifyValue: function (v, dcnv: number, stz: number): string {
                    if (Checks.isNt(v))
                        return null;
                    if (Checks.isDate(v))
                        return valueUtils.dateToValue(v, dcnv, stz);
                    else if (Checks.isArray(v))
                        return JSON.stringify(v);
                    else if (Checks.isString(v))
                        return v;
                    else
                        return JSON.stringify(v);
                },
                parseValue: function (v, dataType, dcnv, stz) {
                    var res = null;

                    if (v === undefined || v === null)
                        return res;
                    var DATA_TYPE = consts.DATA_TYPE;
                    switch (dataType) {
                        case DATA_TYPE.None:
                            res = v;
                            break;
                        case DATA_TYPE.String:
                        case DATA_TYPE.Guid:
                            res = v;
                            break;
                        case DATA_TYPE.Bool:
                            res = global.utils.parseBool(v);
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
                            res = valueUtils.valueToDate(v, dcnv, stz);
                            break;
                        case DATA_TYPE.Binary:
                            res = JSON.parse(v);
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
            export class LifeTimeScope extends RIAPP.BaseObject
            {
                private _objs: BaseObject[];

                constructor() {
                    super();
                    this._objs = [];
                }
                static create() {
                    return new LifeTimeScope();
                }
                addObj(b: BaseObject) {
                    if (this._objs.indexOf(b) < 0)
                        this._objs.push(b);
                }
                removeObj(b: BaseObject) {
                    global.utils.removeFromArray(this._objs, b);
                }
                getObjs() {
                    return this._objs;
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._objs.forEach(function (obj) {
                        if (!obj._isDestroyCalled)
                            obj.destroy();
                    });
                    this._objs = [];
                    super.destroy();
                }
                toString(){
                    return 'LifeTimeScope';
                }
            };

            export class PropWatcher extends RIAPP.BaseObject{
                _objId: string;
                _objs: BaseObject[];
                constructor () {
                    super();
                    this._objId = 'prw' + global.utils.getNewID();
                    this._objs = [];
                }
                static create() {
                    return new PropWatcher();
                }
                addPropWatch(obj: BaseObject, prop: string, fn_onChange:(prop:string)=>void) {
                    var self = this;
                    obj.addOnPropertyChange(prop, function (s, a) {
                        fn_onChange(a.property);
                    }, self.uniqueID);

                    if (self._objs.indexOf(obj) < 0)
                        self._objs.push(obj);
                }
                addWatch(obj: BaseObject, props: string[], fn_onChange: (prop: string) => void ) {
                    var self = this;
                    obj.addOnPropertyChange('*', function (s, a) {
                        if (props.indexOf(a.property) > -1) {
                            fn_onChange(a.property);
                        }
                    }, self.uniqueID);

                    if (self._objs.indexOf(obj) < 0)
                        self._objs.push(obj);
                }
                removeWatch(obj:BaseObject) {
                    obj.removeNSHandlers(this.uniqueID);
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    var self = this;
                    this._objs.forEach(function (obj) {
                        self.removeWatch(obj);
                    });
                    this._objs = [];
                    super.destroy();
                }
                toString() {
                    return 'PropWatcher ' + this._objId;
                }
                get uniqueID() {
                    return this._objId;
                }
            };
             
           /* 
              waits for property change on the object (the owner)
              then checks queue of actions for the property change
              based on property value checking predicate
              if the predicate returns true, invokes the task's action
           */
            export class WaitQueue extends RIAPP.BaseObject{
                _objId: string;
                _owner: BaseObject;
                _queue: any;
                constructor (owner:BaseObject) {
                    super();
                    this._objId = 'wq' + global.utils.getNewID();
                    this._owner = owner;
                    this._queue = {}
                }
                static create(owner: BaseObject) {
                    return new WaitQueue(owner);
                }
                _checkQueue(prop:string, value:any) {
                    if (!this._owner || this._owner._isDestroyCalled) {
                        return;
                    }
                    var self = this, propQueue = this._queue[prop], task;
                    if (!propQueue || propQueue.length == 0) {
                        return;
                    }

                    var i, firstWins, groups = { group: null, arr: [] }, found = [], forRemoval = [];

                    for (i = 0; i < propQueue.length; i += 1) {
                        task = propQueue[i];
                        if (task.predicate(value)) {
                            if (!task.group && groups.arr.length == 0) {
                                firstWins = task;
                                break;
                            }
                            else if (!!task.group) { //the task in the group of tasks
                                if (!groups.group) {
                                    groups.group = task.group;
                                }
                                if (groups.group === task.group) {
                                    groups.arr.push(task); //if the task in the same group, add it to the array
                                }
                            }
                        }
                    }

                    if (!!firstWins) { //the first task will be executed, in normal queued order, the rest tasks are waiting
                        found.push(firstWins);
                        forRemoval.push(firstWins);
                    }
                    else {
                        while (groups.arr.length > 0) {
                            task = groups.arr.pop();
                            if (!firstWins) {
                                firstWins = task;
                            }

                            if (firstWins.lastWins) { //the last task wins, the rest is ignored
                                if (found.length == 0)
                                    found.push(task); //add only the last task, the rest just remove from queue
                            }
                            else
                                found.push(task); //add all tasks in the group, they will be executed all
                            forRemoval.push(task);
                        }
                    }

                    try {
                        if (found.length > 0) {
                            i = propQueue.length;
                            while (i > 0) {
                                i -= 1;
                                if (forRemoval.indexOf(propQueue[i]) > -1) {
                                    propQueue.splice(i, 1);
                                }
                            }

                            found.forEach(function (task) {
                                try {
                                    task.action.apply(self._owner, task.args);
                                }
                                catch (ex) {
                                    self._owner._onError(ex, self);
                                }
                            });
                        }
                    }
                    finally {
                        if (propQueue.length == 0) {
                            delete this._queue[prop];
                            this._owner.removeOnPropertyChange(prop, this.uniqueID);
                        }
                    }
                }
                enQueue(options) {
                    var opts = global.utils.extend(false, {
                        prop: "",
                        groupName: null,
                        predicate: null,
                        action: null,
                        actionArgs: [],
                        lastWins: false,
                        syncCheck: false
                    }, options);
                    var self = this;
                    if (!this._owner)
                        return;
                    var property = opts.prop, propQueue = this._queue[property];

                    if (!propQueue) {
                        propQueue = [];
                        this._queue[property] = propQueue;
                        this._owner.addOnPropertyChange(property, function (s, a) {
                            setTimeout(function () {
                                if (self._isDestroyCalled)
                                    return;
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
                    if (!!opts.syncCheck) {
                        self._checkQueue(property, self._owner[property]);
                    }
                    else {
                        setTimeout(function () {
                            if (self._isDestroyCalled)
                                return;
                            self._checkQueue(property, self._owner[property]);
                        }, 0);
                    }
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._owner.removeOnPropertyChange(null, this.uniqueID);
                    this._queue = {};
                    this._owner = null;
                    super.destroy();
                }
                toString() {
                    return 'WaitQueue ' + this._objId;
                }
                get uniqueID() {
                    return this._objId;
                }
                get owner() {
                    return this._owner;
                }
            };

            export class Utils {
                constructor() {
                }
                static create() {
                    return new Utils();
                }
                get check() {
                    return Checks;
                }
                get str() {
                    return StringUtils;
                }
                get validation() {
                    return Validations;
                }
                getNewID() {
                    var id = _newID;
                    _newID += 1;
                    return id;
                }
                isContained(oNode, oCont) {
                    if (!oNode) return false;
                    while (!!(oNode = oNode.parentNode)) if (oNode === oCont) return true;
                    return false;
                }
                slice = Array.prototype.slice;
                get_timeZoneOffset = (function () {
                    var dt = new Date();
                    var tz = dt.getTimezoneOffset();

                    return function () {
                        return tz;
                    }
                }) ();
                parseBool(bool_value: any) {
                    if (Checks.isBoolean(bool_value))
                        return bool_value;
                    var v = base_utils.trim(bool_value).toLowerCase();
                    if (v === 'false') return false;
                    if (v === 'true') return true;
                    throw new Error(this.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'bool_value', bool_value));
                }
                round(num:number, decimals:number) {
                    return parseFloat(num.toFixed(decimals));
                }
                performAjaxCall(url: string, postData: string, async: boolean, fn_success: (res: string) => void , fn_error:(res: any) => void , context:any):IPromise<string> {
                    var req = new XMLHttpRequest(), mimeType = 'application/json; charset=utf-8';
                    req.open('POST', url, async);
                    var deferred = this.createDeferred();
                    req.responseType = 'text';
                    req.onload = function (e) {
                        if (this.status == 200) {
                            var res:string = this.response;
                            deferred.resolve(res);
                        }
                    };
                    req.onerror = function (e:any) {
                        deferred.reject(new Error(e.target.status));
                    };
                    req.ontimeout = function () {
                        deferred.reject(new Error("The request for " + url + " timed out."));
                    };
                    req.timeout = global.defaults.ajaxTimeOut * 1000;
                    req.setRequestHeader('Content-Type', mimeType);
                    req.send(postData);
                    var promise:any = deferred.promise();

                    if (!!fn_success) {
                        promise.done(function (data) {
                            fn_success.call(context, data);
                        });
                    }

                    if (!!fn_error) {
                        promise.fail(function (err) {
                            fn_error.call(context, err);
                        });
                    }
                    return promise;
                }
                performAjaxGet(url:string):IPromise<string> {
                    var req = new XMLHttpRequest();
                    req.open('GET', url, true); /* always async mode */
                    var deferred = this.createDeferred();
                    req.responseType = 'text';
                    req.onload = function (e) {
                        if (this.status == 200) {
                            var res = this.response;
                            deferred.resolve(res);
                        }
                    };
                    req.onerror = function (e:any) {
                        deferred.reject(new Error(e.target.status));
                    };
                    req.ontimeout = function () {
                        deferred.reject(new Error("The request for " + url + " timed out."));
                    };
                    req.timeout = global.defaults.ajaxTimeOut * 1000;
                    req.send(null);
                    var promise:any = deferred.promise();
                    return promise;
                }
                format = base_utils.format;
                extend(deep:boolean, defaults:any, options:any) {
                    if (deep)
                        return this.cloneObj(options, defaults);
                    else
                        return this.mergeObj(options, defaults);
                }
                removeNode(node:Node) {
                    if (!node)
                        return;
                    var pnd = node.parentNode;
                    if (!!pnd)
                        pnd.removeChild(node);
                }
                insertAfter(referenceNode:Node, newNode:Node) {
                    var parent = referenceNode.parentNode;
                    if (parent.lastChild === referenceNode)
                        parent.appendChild(newNode);
                    else
                        parent.insertBefore(newNode, referenceNode.nextSibling);
                }
                getProps(obj) {
                    return Object.getOwnPropertyNames(obj);
                }
                /*
                    in case of dataforms nesting, element's parent dataform can be nested dataform
                    this function returns element dataform
                */
                getParentDataForm(rootForm: HTMLElement, el: HTMLElement): HTMLElement {
                    if (!el)
                        return null;
                    var parent = el.parentElement, document = global.document, attr: string, opts: any[];
                    if (!!parent) {
                        if (parent === rootForm)
                            return rootForm;
                        if (Checks.isDataForm(parent))
                        {
                            return parent;
                        }
                        else
                            return this.getParentDataForm(rootForm, parent);
                    }

                    return null;
                }
                forEachProp(obj:any, fn:(name:string)=>void) {
                    var names = Object.getOwnPropertyNames(obj);
                    names.forEach(fn);
                }
                addToolTip($el:JQuery, tip:string, className?:string) {
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
                            viewport: global.$(global.window),
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
                    if (!!$el.data('qtip')) {
                        if (!tip) {
                            $el['qtip']('destroy');
                        }
                        else
                            $el['qtip']('option', 'content.text', tip);
                    }
                    else if (!!tip) {
                        $el['qtip'](options);
                    }
                }
                hasProp(obj, prop:string):boolean {
                    if (!obj)
                        return false;
                    var res = obj.hasOwnProperty(prop);
                    if (res)
                        return true;
                    else {
                        if (Object === obj)
                            return false;
                        else {
                            var pr = Object.getPrototypeOf(obj);
                            return this.hasProp(pr, prop);
                        }
                    }
                }
                createDeferred(): IDeferred<any> {
                    return <any>global.$.Deferred();
                }
                cloneObj(o, mergeIntoObj) {
                    var c, i, len, self = this;
                    if (!o) {
                        return o;
                    }

                    if (self.check.isArray(o)) {
                        len = o.length;
                        c = new Array(len);
                        for (i = 0; i < len; i += 1) {
                            c[i] = self.cloneObj(o[i], null);
                        }
                    }
                    else if (self.check.isSimpleObject(o)) {
                        //clone only simple objects
                        c = mergeIntoObj || {};
                        var p, keys = Object.getOwnPropertyNames(o);
                        len = keys.length;
                        for (i = 0; i < len; i += 1) {
                            p = keys[i];
                            c[p] = self.cloneObj(o[p], null);
                        }
                    }
                    else
                        return o;
                    return c;
                }
                shallowCopy(o) {
                    return this.mergeObj(o, {});
                }
                mergeObj(obj, mergeIntoObj) {
                    if (!mergeIntoObj) {
                        mergeIntoObj = {};
                    }
                    if (!obj)
                        return mergeIntoObj;
                    var names = Object.getOwnPropertyNames(obj), n;
                    for (var i = 0, len = names.length; i < len; i += 1) {
                        n = names[i];
                        mergeIntoObj[n] = obj[n];
                    }
                    return mergeIntoObj;
                }
                removeFromArray(array:any[], obj:any) {
                    var i = array.indexOf(obj);
                    if (i > -1) {
                        array.splice(i, 1);
                    }
                    return i;
                }
                insertIntoArray(array:any[], obj:any, pos:number) {
                    array.splice(pos, 0, obj);
                }
                destroyJQueryPlugin($el:JQuery, name:string) {
                    var plugin = $el.data(name);
                    if (!!plugin) {
                        $el[name]('destroy');
                    }
                }
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
                uuid = (function () {
                    // Private array of chars to use
                    var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

                    return function (len?:number, radix?:number) {
                        var i, chars = CHARS, uuid = [], rnd = Math.random;
                        radix = radix || chars.length;

                        if (!!len) {
                            // Compact form
                            for (i = 0; i < len; i += 1) uuid[i] = chars[0 | rnd() * radix];
                        } else {
                            // rfc4122, version 4 form
                            var r;

                            // rfc4122 requires these characters
                            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
                            uuid[14] = '4';

                            // Fill in random data.  At i==19 set the high bits of clock sequence as
                            // per rfc4122, sec. 4.1.5
                            for (i = 0; i < 36; i += 1) {
                                if (!uuid[i]) {
                                    r = 0 | rnd() * 16;
                                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r & 0xf];
                                }
                            }
                        }

                        return uuid.join('');
                    };
                }) ();
            };

            global.registerType('PropWatcher', PropWatcher);
            global.registerType('LifeTimeScope', LifeTimeScope);
            global.registerType('WaitQueue', WaitQueue);
            global.onModuleLoaded('utils', utils);
        }
    }
}

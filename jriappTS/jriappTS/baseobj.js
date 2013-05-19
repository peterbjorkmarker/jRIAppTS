'use strict';
var RIAPP;
(function (RIAPP) {
    var ArrayHelper = (function () {
        function ArrayHelper() { }
        ArrayHelper.clone = function clone(arr) {
            if(arr.length === 1) {
                return [
                    arr[0]
                ];
            } else {
                return Array.apply(null, arr);
            }
        };
        ArrayHelper.fromList = function fromList(list) {
            var array = new Array(list.length);
            for(var i = 0, n = list.length; i < n; i++) {
                array[i] = list[i];
            }
            return array;
        };
        ArrayHelper.fromCollection = function fromCollection(list) {
            return ArrayHelper.fromList(list);
        };
        ArrayHelper.distinct = function distinct(arr) {
            var o = {
            }, i, l = arr.length, r = [];
            for(i = 0; i < l; i += 1) {
                o[arr[i]] = arr[i];
            }
            var k = Object.keys(o);
            for(i = 0 , l = k.length; i < l; i += 1) {
                r.push(o[k[i]]);
            }
            return r;
        };
        return ArrayHelper;
    })();
    RIAPP.ArrayHelper = ArrayHelper;    
    //essential basic utils
    var baseUtils = (function () {
        function baseUtils() { }
        baseUtils.isFunc = function isFunc(a) {
            if(!a) {
                return false;
            }
            var rx = /Function/;
            return (typeof (a) === 'function') ? rx.test(a.constructor.toString()) : false;
        };
        baseUtils.endsWith = function endsWith(str, suffix) {
            return (str.substr(str.length - suffix.length) === suffix);
        };
        baseUtils.startsWith = function startsWith(str, prefix) {
            return (str.substr(0, prefix.length) === prefix);
        };
        baseUtils.fastTrim = function fastTrim(str) {
            return str.replace(/^\s+|\s+$/g, '');
        };
        baseUtils.trim = function trim(str, chars) {
            if(!chars) {
                return baseUtils.fastTrim(str);
            }
            return baseUtils.ltrim(baseUtils.rtrim(str, chars), chars);
        };
        baseUtils.ltrim = function ltrim(str, chars) {
            chars = chars || "\\s";
            return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
        };
        baseUtils.rtrim = function rtrim(str, chars) {
            chars = chars || "\\s";
            return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
        };
        baseUtils.isArray = function isArray(o) {
            if(!o) {
                return false;
            }
            return Array.isArray(o);
        };
        baseUtils.format = /**
        *    Usage:     format('test {0}={1}', 'x', 100);
        *    result:    test x=100
        **/
        function format(format) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            var result = '';
            for(var i = 0; ; ) {
                var open = format.indexOf('{', i);
                var close = format.indexOf('}', i);
                if((open < 0) && (close < 0)) {
                    result += format.slice(i);
                    break;
                }
                if((close > 0) && ((close < open) || (open < 0))) {
                    if(format.charAt(close + 1) !== '}') {
                        throw new Error(baseUtils.format(RIAPP.ERRS.ERR_STRING_FORMAT_INVALID, format));
                    }
                    result += format.slice(i, close + 1);
                    i = close + 2;
                    continue;
                }
                result += format.slice(i, open);
                i = open + 1;
                if(format.charAt(i) === '{') {
                    result += '{';
                    i++;
                    continue;
                }
                if(close < 0) {
                    throw new Error(baseUtils.format(RIAPP.ERRS.ERR_STRING_FORMAT_INVALID, format));
                }
                var brace = format.substring(i, close);
                var colonIndex = brace.indexOf(':');
                var argNumber = parseInt((colonIndex < 0) ? brace : brace.substring(0, colonIndex), 10);
                if(isNaN(argNumber)) {
                    throw new Error(baseUtils.format(RIAPP.ERRS.ERR_STRING_FORMAT_INVALID, format));
                }
                var argFormat = (colonIndex < 0) ? '' : brace.substring(colonIndex + 1);
                var arg = args[argNumber];
                if(arg === undefined || arg === null) {
                    arg = '';
                }
                if(arg.format) {
                    result += arg.format(argFormat);
                } else {
                    result += arg.toString();
                }
                i = close + 1;
            }
            return result;
        };
        return baseUtils;
    })();
    RIAPP.baseUtils = baseUtils;    
    ;
    var BaseObject = (function () {
        function BaseObject() {
            this._isDestroyed = false;
            this._isDestroyCalled = false;
            this.__events = null;
        }
        BaseObject.prototype._getEventNames = function () {
            return [
                'error', 
                'destroyed'
            ];
        };
        BaseObject.prototype._addHandler = function (name, fn, namespace, prepend) {
            if(this._isDestroyed) {
                return;
            }
            if(!RIAPP.baseUtils.isFunc(fn)) {
                throw new Error(RIAPP.ERRS.ERR_EVENT_INVALID_FUNC);
            }
            if(!name) {
                throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_EVENT_INVALID, name));
            }
            if(this.__events === null) {
                this.__events = {
                };
            }
            var self = this, ev = self.__events, n = name, ns = '*';
            if(!!namespace) {
                ns = '' + namespace;
            }
            if(!ev[n]) {
                ev[n] = [];
            }
            var arr = ev[n];
            if(!arr.some(function (obj) {
                return obj.fn === fn && obj.ns == ns;
            })) {
                if(!prepend) {
                    arr.push({
                        fn: fn,
                        ns: ns
                    });
                } else {
                    arr.unshift({
                        fn: fn,
                        ns: ns
                    });
                }
            }
        };
        BaseObject.prototype._removeHandler = function (name, namespace) {
            var self = this, ev = self.__events, n = name, ns = '*';
            if(!ev) {
                return;
            }
            if(!!namespace) {
                ns = '' + namespace;
            }
            var arr, toRemove, i;
            //arguments supplyed name (and optionally namespace)
            if(!!n) {
                if(!ev[n]) {
                    return;
                }
                if(ns == '*') {
                    delete ev[n];
                } else {
                    arr = ev[n];
                    toRemove = arr.filter(function (obj) {
                        return obj.ns == ns;
                    });
                    i = arr.length;
                    while(i > 0) {
                        i -= 1;
                        if(toRemove.indexOf(arr[i]) > -1) {
                            arr.splice(i, 1);
                        }
                    }
                    if(arr.length == 0) {
                        delete ev[n];
                    }
                }
                return;
            }
            //arguments supplyed only namespace
            if(ns != '*') {
                var keys = Object.keys(ev);
                keys.forEach(function (n) {
                    var arr = ev[n];
                    var toRemove = arr.filter(function (obj) {
                        return obj.ns == ns;
                    });
                    i = arr.length;
                    while(i > 0) {
                        i -= 1;
                        if(toRemove.indexOf(arr[i]) > -1) {
                            arr.splice(i, 1);
                        }
                    }
                    if(arr.length == 0) {
                        delete ev[n];
                    }
                });
                return;
            }
            //no arguments supplyed
            self.__events = null;
        };
        BaseObject.prototype._raiseEvent = function (name, data) {
            var self = this, ev = self.__events;
            if(ev === null) {
                return;
            }
            if(ev === undefined) {
                throw new Error("Object's constructor was not called");
            }
            if(!!name) {
                //property changed
                if(name != '0*' && RIAPP.baseUtils.startsWith(name, '0')) {
                    this._raiseEvent('0*', data)//who subscribed for all property changes
                    ;
                }
                if(!ev[name]) {
                    return;
                }
                var arr = ArrayHelper.clone(ev[name]);
                arr.forEach(function (obj) {
                    obj.fn.apply(self, [
                        self, 
                        data
                    ]);
                });
            }
        };
        BaseObject.prototype._onError = function (error, source) {
            if(!!RIAPP.global && RIAPP.global._checkIsDummy(error)) {
                return true;
            }
            if(!error.message) {
                error = new Error('' + error);
            }
            var args = {
                error: error,
                source: source,
                isHandled: false
            };
            this._raiseEvent('error', args);
            return args.isHandled;
        };
        BaseObject.prototype._checkEventName = function (name) {
            if(this._getEventNames().indexOf(name) === -1) {
                throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_EVENT_INVALID, name));
            }
        };
        BaseObject.prototype.raisePropertyChanged = function (name) {
            var data = {
                property: name
            };
            this._raiseEvent('0' + name, data);
        };
        BaseObject.prototype.addHandler = function (name, fn, namespace) {
            this._checkEventName(name);
            this._addHandler(name, fn, namespace, false);
        };
        BaseObject.prototype.removeHandler = function (name, namespace) {
            if(!!name) {
                this._checkEventName(name);
            }
            this._removeHandler(name, namespace);
        };
        BaseObject.prototype.addOnDestroyed = function (fn, namespace) {
            this._addHandler('destroyed', fn, namespace, false);
        };
        BaseObject.prototype.removeOnDestroyed = function (namespace) {
            this._removeHandler('destroyed', namespace);
        };
        BaseObject.prototype.addOnError = function (fn, namespace) {
            this._addHandler('error', fn, namespace, false);
        };
        BaseObject.prototype.removeOnError = function (namespace) {
            this.removeHandler('error', namespace);
        };
        BaseObject.prototype.removeNSHandlers = //remove event handlers by namespace
        function (namespace) {
            this._removeHandler(null, namespace);
        };
        BaseObject.prototype.raiseEvent = function (name, args) {
            this._checkEventName(name);
            this._raiseEvent(name, args);
        };
        BaseObject.prototype.addOnPropertyChange = //to subscribe for the changes on all properties, pass in prop parameter asterisk: '*'
        function (prop, fn, namespace) {
            if(!prop) {
                throw new Error(RIAPP.ERRS.ERR_PROP_NAME_EMPTY);
            }
            prop = '0' + prop;
            this._addHandler(prop, fn, namespace, false);
        };
        BaseObject.prototype.removeOnPropertyChange = function (prop, namespace) {
            if(!!prop) {
                prop = '0' + prop;
            }
            this._removeHandler(prop, namespace);
        };
        BaseObject.prototype.destroy = function () {
            if(this._isDestroyed) {
                return;
            }
            this._isDestroyed = true;
            this._isDestroyCalled = true;
            try  {
                this._raiseEvent('destroyed', {
                });
            }finally {
                this.__events = null;
            }
        };
        return BaseObject;
    })();
    RIAPP.BaseObject = BaseObject;    
    ;
})(RIAPP || (RIAPP = {}));
//@ sourceMappingURL=baseobj.js.map

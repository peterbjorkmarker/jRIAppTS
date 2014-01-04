'use strict';
module RIAPP {
    export class ArrayHelper {
        public static clone(arr: any[]): any[] {
            if (arr.length === 1) {
                return [arr[0]];
            }
            else {
                return Array.apply(null, arr);
            }
        }
        public static fromList(list: { length: number; [index: number]: any; }) {
            var array = new Array(list.length);
            for (var i = 0, n = list.length; i < n; i++)
                array[i] = list[i];
            return array;
        }
        public static fromCollection(list:HTMLCollection) {
            return ArrayHelper.fromList(<any>list);
        }
        public static distinct(arr:any[]) {
            var o = {}, i:number, l = arr.length, r = [];
            for (i = 0; i < l; i += 1) o[arr[i]] = arr[i];
            var k = Object.keys(o);
            for (i = 0, l = k.length; i < l; i += 1)
                r.push(o[k[i]]);
            return r;
        }
    }
 
    //essential basic utils
    export class baseUtils {
        static isFunc(a): boolean {
            if (!a)
                return false;
            var rx = /Function/;
            return (typeof (a) === 'function') ? rx.test(a.constructor.toString()) : false;
        }
        static endsWith(str, suffix): boolean {
            return (str.substr(str.length - suffix.length) === suffix);
        }
        static startsWith(str, prefix): boolean {
            return (str.substr(0, prefix.length) === prefix);
        }
        static fastTrim(str): string {
            return str.replace(/^\s+|\s+$/g, '');
        }
        static trim(str: string, chars?: string): string {
            if (!chars) {
                return baseUtils.fastTrim(str);
            }
            return baseUtils.ltrim(baseUtils.rtrim(str, chars), chars);
        }
        static ltrim(str: string, chars?: string): string {
            chars = chars || "\\s";
            return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
        }
        static rtrim(str: string, chars?: string): string {
            chars = chars || "\\s";
            return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
        }
        static isArray(o: any): boolean {
            if (!o)
                return false;
            return Array.isArray(o);
        }
        /**
         *    Usage:     format('test {0}={1}', 'x', 100);
         *    result:    test x=100
         **/
        static format(format_str: string, ...args: any[]): string {
            var result = '';
            for (var i = 0; ;) {
                var open = format_str.indexOf('{', i);
                var close = format_str.indexOf('}', i);
                if ((open < 0) && (close < 0)) {
                    result += format_str.slice(i);
                    break;
                }
                if ((close > 0) && ((close < open) || (open < 0))) {
                    if (format_str.charAt(close + 1) !== '}') {
                        throw new Error(baseUtils.format(RIAPP.ERRS.ERR_STRING_FORMAT_INVALID, format_str));
                    }
                    result += format_str.slice(i, close + 1);
                    i = close + 2;
                    continue;
                }
                result += format_str.slice(i, open);
                i = open + 1;
                if (format_str.charAt(i) === '{') {
                    result += '{';
                    i++;
                    continue;
                }
                if (close < 0) throw new Error(baseUtils.format(RIAPP.ERRS.ERR_STRING_FORMAT_INVALID, format_str));
                var brace = format_str.substring(i, close);
                var colonIndex = brace.indexOf(':');
                var argNumber = parseInt((colonIndex < 0) ? brace : brace.substring(0, colonIndex), 10);
                if (isNaN(argNumber)) throw new Error(baseUtils.format(RIAPP.ERRS.ERR_STRING_FORMAT_INVALID, format_str));
                var argFormat = (colonIndex < 0) ? '' : brace.substring(colonIndex + 1);
                var arg = args[argNumber];
                if (arg === undefined || arg === null) {
                    arg = '';
                }

                if (arg.format) {
                    result += arg.format(argFormat);
                }
                else
                    result += arg.toString();
                i = close + 1;
            }
            return result;
        }

        static setValue(root: any, namePath: string, val: any, checkOverwrite: boolean): void {
            var parts = namePath.split('.'),
                parent = root,
                i: number;

            for (i = 0; i < parts.length - 1; i += 1) {
                // create a property if it doesn't exist
                if (!parent[parts[i]]) {
                    parent[parts[i]] = {};
                }
                parent = parent[parts[i]];
            }
            //the last part is the name itself
            var n = parts[parts.length - 1];
            if (!!checkOverwrite && (parent[n] !== undefined)) {
                throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_OBJ_ALREADY_REGISTERED, namePath));
            }
            parent[n] = val;
        }
        static getValue(root: any, namePath: string): any {
            var parts = namePath.split('.'),
                parent = root,
                i: number, res;

            for (i = 0; i < parts.length; i += 1) {
                res = parent[parts[i]];
                if (res === undefined) {
                    return null;
                }
                parent = res;
            }
            return res;
        }
        static removeValue(root: any, namePath: string): any {
            var parts = namePath.split('.'),
                parent = root,
                i: number, val = null;

            for (i = 0; i < parts.length - 1; i += 1) {
                if (!parent[parts[i]]) {
                    return null;
                }
                parent = parent[parts[i]];
            }
            //the last part is the object name itself
            var n = parts[parts.length - 1];
            val = parent[n];
            if (val !== undefined) {
                delete parent[n];
            }

            //returns deleted value
            return val;
        }
        //the object that directly has this property (last object in chain)
        static resolveOwner(obj: any, path: string): any {
            var parts = path.split('.');
            if (parts.length == 1)
                return obj;
            var res: any = obj;
            for (var i = 0; i < parts.length - 1; i += 1) {
                if (!res[parts[i]])
                    return null;
                res = res[parts[i]];
            }
            return res;
        }
    }

    export class BaseObject {
        _isDestroyed: boolean;
        _isDestroyCalled: boolean;
        private __events: any;

        constructor() {
            this._isDestroyed = false;
            this._isDestroyCalled = false;
            this.__events = null;
        }
        _getEventNames(): string[] {
            return ['error', 'destroyed'];
        }
        _addHandler(name: string, fn: (sender,args)=>void, namespace?: string, prepend?: boolean) {
            if (this._isDestroyed)
                return;

            if (!RIAPP.baseUtils.isFunc(fn))
                throw new Error(RIAPP.ERRS.ERR_EVENT_INVALID_FUNC);
            if (!name)
                throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_EVENT_INVALID, name));

            if (this.__events === null)
                this.__events = {};
            var self = this, ev = self.__events, n = name, ns = '*';

            if (!!namespace)
                ns = '' + namespace;

            if (!ev[n])
                ev[n] = [];

            var arr: any[] = ev[n];

            if (!arr.some(function (obj: any) {
                return obj.fn === fn && obj.ns == ns;
            })) {
                if (!prepend)
                    arr.push({ fn: fn, ns: ns });
                else
                    arr.unshift({ fn: fn, ns: ns });
            }
        }
        _removeHandler(name?: string, namespace?: string) {
            var self = this, ev = self.__events, n = name, ns = '*';
            if (!ev)
                return;

            if (!!namespace)
                ns = '' + namespace;
            var arr: any[], toRemove: any[], i: number;

            //arguments supplyed name (and optionally namespace)
            if (!!n) {
                if (!ev[n])
                    return;
                if (ns == '*') {
                    delete ev[n];
                }
                else {
                    arr = ev[n];
                    toRemove = arr.filter(function (obj: any) {
                        return obj.ns == ns;
                    });
                    i = arr.length;

                    while (i > 0) {
                        i -= 1;
                        if (toRemove.indexOf(arr[i]) > -1) {
                            arr.splice(i, 1);
                        }
                    }
                    if (arr.length == 0)
                        delete ev[n];
                }
                return;
            }

            //arguments supplyed only namespace
            if (ns != '*') {
                var keys = Object.keys(ev);
                keys.forEach(function (n) {
                    var arr: any[] = ev[n];
                    var toRemove: any[] = arr.filter(function (obj: any) {
                        return obj.ns == ns;
                    });
                    i = arr.length;
                    while (i > 0) {
                        i -= 1;
                        if (toRemove.indexOf(arr[i]) > -1) {
                            arr.splice(i, 1);
                        }
                    }
                    if (arr.length == 0)
                        delete ev[n];
                });
                return;
            }

            //no arguments supplyed
            self.__events = null;
        }
        _raiseEvent(name: string, data: any) {
            var self = this, ev = self.__events;
            if (ev === null)
                return;
            if (ev === undefined) {
                throw new Error("Object's constructor was not called");
            }

            if (!!name) {
                //property changed
                if (name != '0*' && RIAPP.baseUtils.startsWith(name, '0'))  
                {
                    this._raiseEvent('0*', data); //who subscribed for all property changes
                }
                if (!ev[name])
                    return;
                var arr = ArrayHelper.clone(ev[name]);
                arr.forEach(function (obj) {
                    obj.fn.apply(self, [self, data]);
                });
            }
        }
        _onError(error: any, source: any): boolean {
            if (!!RIAPP.global && RIAPP.global._checkIsDummy(error)) {
                return true;
            }
            if (!error.message) {
                error = new Error('' + error);
            }
            var args = { error: error, source: source, isHandled: false };
            this._raiseEvent('error', args);
            return args.isHandled;
        }
        _checkEventName(name: string) {
            if (this._getEventNames().indexOf(name) === -1)
                throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_EVENT_INVALID, name));
        }
        raisePropertyChanged(name: string) {
            var data = { property: name };
            var parts = name.split('.'), propName = parts[parts.length - 1];
            if (parts.length > 1) {
                var obj = baseUtils.resolveOwner(this, name);
                if (obj instanceof BaseObject) {
                    obj._raiseEvent('0' + propName, data);
                }
            }
            else
                this._raiseEvent('0' + propName, data);
        }
        addHandler(name: string, fn: (sender,args)=>void, namespace?: string) {
            this._checkEventName(name);
            this._addHandler(name, fn, namespace, false);
        }
        removeHandler(name?: string, namespace?: string) {
            if (!!name) {
                this._checkEventName(name);
            }
            this._removeHandler(name, namespace);
        }
        addOnDestroyed(fn: (sender, args: {})=>void, namespace?: string) {
            this._addHandler('destroyed', fn, namespace, false);
        }
        removeOnDestroyed(namespace?: string) {
            this._removeHandler('destroyed', namespace);
        }
        addOnError(fn: (sender, args: { error: any; source: any; isHandled: boolean; }) => void , namespace?: string) {
            this._addHandler('error', fn, namespace, false);
        }
        removeOnError(namespace?: string) {
            this.removeHandler('error', namespace);
        }
        //remove event handlers by namespace
        removeNSHandlers(namespace?: string) {
            this._removeHandler(null, namespace);
        }
        raiseEvent(name: string, args: any) {
            this._checkEventName(name);
            this._raiseEvent(name, args);
        }
        //to subscribe for the changes on all properties, pass in prop parameter asterisk: '*'
        addOnPropertyChange(prop: string, fn: (sender, args: { property: string; })=>void, namespace?: string) {
            if (!prop)
                throw new Error(RIAPP.ERRS.ERR_PROP_NAME_EMPTY);
            prop = '0' + prop;
            this._addHandler(prop, fn, namespace, false);
        }
        removeOnPropertyChange(prop?: string, namespace?: string) {
            if (!!prop) prop = '0' + prop;
            this._removeHandler(prop, namespace);
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyed = true;
            this._isDestroyCalled = true;
            try {
                this._raiseEvent('destroyed', {});
            }
            finally {
                this.__events = null;
            }
        }
    }
}

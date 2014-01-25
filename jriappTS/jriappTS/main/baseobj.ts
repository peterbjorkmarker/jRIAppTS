'use strict';
module RIAPP {
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
                throw new Error("Object instance is invalid. The constructor was not called.");
            }

            if (!!name) {
                //if property changed
                if (name != '0*' && RIAPP.baseUtils.startsWith(name, '0'))  
                {
                    //notify those who subscribed for all property changes
                    this._raiseEvent('0*', data); 
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
            if (this._getEventNames().indexOf(name) === -1) {
                if (DebugLevel == DEBUG_LEVEL.HIGH) {
                    debugger;
                }
                throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_EVENT_INVALID, name));
            }
        }
        _isHasProp(prop: string) {
            return baseUtils.hasProp(this, prop);
        }
        raisePropertyChanged(name: string) {
            var data = { property: name };
            var parts = name.split('.'), lastPropName = parts[parts.length - 1];
            if (parts.length > 1) {
                var obj = baseUtils.resolveOwner(this, name);
                if (DebugLevel > DEBUG_LEVEL.NONE && baseUtils.isUndefined(obj)) {
                    if (DebugLevel == DEBUG_LEVEL.HIGH) {
                        debugger;
                    }
                    throw new Error(baseUtils.format(RIAPP.ERRS.ERR_PROP_NAME_INVALID, name));
                }
                if (obj instanceof BaseObject) {
                    obj._raiseEvent('0' + lastPropName, data);
                }
            }
            else {
                if (DebugLevel > DEBUG_LEVEL.NONE && !baseUtils.hasProp(this, lastPropName)) {
                    if (DebugLevel == DEBUG_LEVEL.HIGH) {
                        debugger;
                    }
                    throw new Error(baseUtils.format(RIAPP.ERRS.ERR_PROP_NAME_INVALID, lastPropName));
                }
                this._raiseEvent('0' + lastPropName, data);
            }
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
        //to subscribe for the changes on all properties, pass in the prop parameter: '*'
        addOnPropertyChange(prop: string, fn: (sender, args: { property: string; })=>void, namespace?: string) {
            if (!prop)
                throw new Error(RIAPP.ERRS.ERR_PROP_NAME_EMPTY);
            if (DebugLevel > DEBUG_LEVEL.NONE && prop != '*' && !this._isHasProp(prop)) {
                if (DebugLevel == DEBUG_LEVEL.HIGH) {
                    debugger;
                }
                throw new Error(baseUtils.format(RIAPP.ERRS.ERR_PROP_NAME_INVALID, prop));
            }
            prop = '0' + prop;
            this._addHandler(prop, fn, namespace, false);
        }
        removeOnPropertyChange(prop?: string, namespace?: string) {
            if (!!prop) {
                if (DebugLevel > DEBUG_LEVEL.NONE && prop != '*' && !this._isHasProp(prop)) {
                    if (DebugLevel == DEBUG_LEVEL.HIGH) {
                        debugger;
                    }
                    throw new Error(baseUtils.format(RIAPP.ERRS.ERR_PROP_NAME_INVALID, prop));
                }
                prop = '0' + prop;
            }
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

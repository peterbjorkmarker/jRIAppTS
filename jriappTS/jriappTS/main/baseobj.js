'use strict';
var RIAPP;
(function (RIAPP) {
    var BaseObject = (function () {
        function BaseObject() {
            this._isDestroyed = false;
            this._isDestroyCalled = false;
            this.__events = null;
        }
        BaseObject.prototype._getEventNames = function () {
            return ['error', 'destroyed'];
        };
        BaseObject.prototype._addHandler = function (name, fn, namespace, prepend) {
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

            var arr = ev[n];

            if (!arr.some(function (obj) {
                return obj.fn === fn && obj.ns == ns;
            })) {
                if (!prepend)
                    arr.push({ fn: fn, ns: ns });
                else
                    arr.unshift({ fn: fn, ns: ns });
            }
        };
        BaseObject.prototype._removeHandler = function (name, namespace) {
            var self = this, ev = self.__events, n = name, ns = '*';
            if (!ev)
                return;

            if (!!namespace)
                ns = '' + namespace;
            var arr, toRemove, i;

            //arguments supplyed name (and optionally namespace)
            if (!!n) {
                if (!ev[n])
                    return;
                if (ns == '*') {
                    delete ev[n];
                } else {
                    arr = ev[n];
                    toRemove = arr.filter(function (obj) {
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
                    var arr = ev[n];
                    var toRemove = arr.filter(function (obj) {
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
        };
        BaseObject.prototype._raiseEvent = function (name, data) {
            var self = this, ev = self.__events;
            if (ev === null)
                return;
            if (ev === undefined) {
                throw new Error("Object instance is invalid. The constructor was not called.");
            }

            if (!!name) {
                //if property changed
                if (name != '0*' && RIAPP.baseUtils.startsWith(name, '0')) {
                    //notify those who subscribed for all property changes
                    this._raiseEvent('0*', data);
                }
                if (!ev[name])
                    return;
                var arr = RIAPP.ArrayHelper.clone(ev[name]);
                arr.forEach(function (obj) {
                    obj.fn.apply(self, [self, data]);
                });
            }
        };
        BaseObject.prototype._onError = function (error, source) {
            if (!!RIAPP.global && RIAPP.global._checkIsDummy(error)) {
                return true;
            }
            if (!error.message) {
                error = new Error('' + error);
            }
            var args = { error: error, source: source, isHandled: false };
            this._raiseEvent('error', args);
            return args.isHandled;
        };
        BaseObject.prototype._checkEventName = function (name) {
            if (this._getEventNames().indexOf(name) === -1) {
                if (RIAPP.DebugLevel == 2 /* HIGH */) {
                    debugger;
                }
                throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_EVENT_INVALID, name));
            }
        };
        BaseObject.prototype._isHasProp = function (prop) {
            return RIAPP.baseUtils.hasProp(this, prop);
        };
        BaseObject.prototype.raisePropertyChanged = function (name) {
            var data = { property: name };
            var parts = name.split('.'), lastPropName = parts[parts.length - 1];
            if (parts.length > 1) {
                var obj = RIAPP.baseUtils.resolveOwner(this, name);
                if (RIAPP.DebugLevel > 0 /* NONE */ && RIAPP.baseUtils.isUndefined(obj)) {
                    if (RIAPP.DebugLevel == 2 /* HIGH */) {
                        debugger;
                    }
                    throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_PROP_NAME_INVALID, name));
                }
                if (obj instanceof BaseObject) {
                    obj._raiseEvent('0' + lastPropName, data);
                }
            } else {
                if (RIAPP.DebugLevel > 0 /* NONE */ && !RIAPP.baseUtils.hasProp(this, lastPropName)) {
                    if (RIAPP.DebugLevel == 2 /* HIGH */) {
                        debugger;
                    }
                    throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_PROP_NAME_INVALID, lastPropName));
                }
                this._raiseEvent('0' + lastPropName, data);
            }
        };
        BaseObject.prototype.addHandler = function (name, fn, namespace) {
            this._checkEventName(name);
            this._addHandler(name, fn, namespace, false);
        };
        BaseObject.prototype.removeHandler = function (name, namespace) {
            if (!!name) {
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

        //remove event handlers by namespace
        BaseObject.prototype.removeNSHandlers = function (namespace) {
            this._removeHandler(null, namespace);
        };
        BaseObject.prototype.raiseEvent = function (name, args) {
            this._checkEventName(name);
            this._raiseEvent(name, args);
        };

        //to subscribe for the changes on all properties, pass in the prop parameter: '*'
        BaseObject.prototype.addOnPropertyChange = function (prop, fn, namespace) {
            if (!prop)
                throw new Error(RIAPP.ERRS.ERR_PROP_NAME_EMPTY);
            if (RIAPP.DebugLevel > 0 /* NONE */ && prop != '*' && !this._isHasProp(prop)) {
                if (RIAPP.DebugLevel == 2 /* HIGH */) {
                    debugger;
                }
                throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_PROP_NAME_INVALID, prop));
            }
            prop = '0' + prop;
            this._addHandler(prop, fn, namespace, false);
        };
        BaseObject.prototype.removeOnPropertyChange = function (prop, namespace) {
            if (!!prop) {
                if (RIAPP.DebugLevel > 0 /* NONE */ && prop != '*' && !this._isHasProp(prop)) {
                    if (RIAPP.DebugLevel == 2 /* HIGH */) {
                        debugger;
                    }
                    throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_PROP_NAME_INVALID, prop));
                }
                prop = '0' + prop;
            }
            this._removeHandler(prop, namespace);
        };
        BaseObject.prototype.destroy = function () {
            if (this._isDestroyed)
                return;
            this._isDestroyed = true;
            this._isDestroyCalled = true;
            try  {
                this._raiseEvent('destroyed', {});
            } finally {
                this.__events = null;
            }
        };
        return BaseObject;
    })();
    RIAPP.BaseObject = BaseObject;
})(RIAPP || (RIAPP = {}));
//# sourceMappingURL=baseobj.js.map

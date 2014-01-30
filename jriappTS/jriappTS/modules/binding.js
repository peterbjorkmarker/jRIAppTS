var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RIAPP;
(function (RIAPP) {
    (function (MOD) {
        (function (binding) {
            (function (BINDING_MODE) {
                BINDING_MODE[BINDING_MODE["OneTime"] = 0] = "OneTime";
                BINDING_MODE[BINDING_MODE["OneWay"] = 1] = "OneWay";
                BINDING_MODE[BINDING_MODE["TwoWay"] = 2] = "TwoWay";
            })(binding.BINDING_MODE || (binding.BINDING_MODE = {}));
            var BINDING_MODE = binding.BINDING_MODE;
            var global = RIAPP.global, base_utils = RIAPP.baseUtils, utils, parser;
            global.addOnInitialize(function (s, args) {
                utils = s.utils;
                parser = s.parser;
            });

            

            function _checkIsErrorNotification(obj) {
                if (!obj)
                    return false;
                if (!utils.check.isFunction(obj.getIErrorNotification))
                    return false;
                var tmp = obj.getIErrorNotification();
                return !!tmp && utils.check.isFunction(tmp.getIErrorNotification);
            }
            binding._checkIsErrorNotification = _checkIsErrorNotification;

            var ValidationError = (function (_super) {
                __extends(ValidationError, _super);
                function ValidationError(errorInfo, item) {
                    var message = RIAPP.ERRS.ERR_VALIDATION + '\r\n', i = 0;
                    errorInfo.forEach(function (err) {
                        if (i > 0)
                            message = message + '\r\n';
                        if (!!err.fieldName)
                            message = message + ' ' + RIAPP.localizable.TEXT.txtField + ': ' + err.fieldName + ' -> ' + err.errors.join(', ');
                        else
                            message = message + err.errors.join(', ');
                        i += 1;
                    });
                    _super.call(this, message);
                    this._errors = errorInfo;
                    this._item = item;
                }
                Object.defineProperty(ValidationError.prototype, "item", {
                    get: function () {
                        return this._item;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ValidationError.prototype, "errors", {
                    get: function () {
                        return this._errors;
                    },
                    enumerable: true,
                    configurable: true
                });
                return ValidationError;
            })(RIAPP.MOD.errors.BaseError);
            binding.ValidationError = ValidationError;

            var Binding = (function (_super) {
                __extends(Binding, _super);
                function Binding(options, appName) {
                    _super.call(this);
                    var opts = utils.extend(false, {
                        target: null, source: null,
                        targetPath: null, sourcePath: null, mode: 1 /* OneWay */,
                        converter: null, converterParam: null, isSourceFixed: false
                    }, options);

                    if (utils.check.isString(opts.mode)) {
                        opts.mode = BINDING_MODE[opts.mode];
                    }

                    if (!utils.check.isString(opts.targetPath)) {
                        if (RIAPP.DebugLevel == 2 /* HIGH */) {
                            debugger;
                        }
                        throw new Error(base_utils.format(RIAPP.ERRS.ERR_BIND_TGTPATH_INVALID, opts.targetPath));
                    }

                    if (utils.check.isUndefined(BINDING_MODE[opts.mode])) {
                        if (RIAPP.DebugLevel == 2 /* HIGH */) {
                            debugger;
                        }
                        throw new Error(base_utils.format(RIAPP.ERRS.ERR_BIND_MODE_INVALID, opts.mode));
                    }

                    if (!opts.target) {
                        throw new Error(RIAPP.ERRS.ERR_BIND_TARGET_EMPTY);
                    }

                    if (!utils.check.isBaseObj(opts.target)) {
                        throw new Error(RIAPP.ERRS.ERR_BIND_TARGET_INVALID);
                    }

                    this._appName = appName;
                    this._state = null; //save state - source and target when binding is disabled
                    this._mode = opts.mode;
                    this._converter = opts.converter || global._getConverter('BaseConverter');
                    this._converterParam = opts.converterParam;
                    this._srcPath = parser._getPathParts(opts.sourcePath);
                    this._tgtPath = parser._getPathParts(opts.targetPath);
                    if (this._tgtPath.length < 1)
                        throw new Error(utils.format(RIAPP.ERRS.ERR_BIND_TGTPATH_INVALID, opts.targetPath));
                    this._isSourceFixed = (!!opts.isSourceFixed);
                    this._pathItems = {};
                    this._objId = 'bnd' + utils.getNewID();
                    this._ignoreSrcChange = false;
                    this._ignoreTgtChange = false;
                    this._sourceObj = null;
                    this._targetObj = null;
                    this._source = null;
                    this._target = null;
                    this.target = opts.target;
                    this.source = opts.source;
                    if (!!this._sourceObj && utils.check.isFunction(this._sourceObj.getIErrorNotification)) {
                        if (this._sourceObj.getIsHasErrors())
                            this._onSrcErrorsChanged();
                    }
                }
                Binding.prototype._getOnTgtDestroyedProxy = function () {
                    var self = this;
                    return function (s, a) {
                        self._onTgtDestroyed(s, a);
                    };
                };
                Binding.prototype._getOnSrcDestroyedProxy = function () {
                    var self = this;
                    return function (s, a) {
                        self._onSrcDestroyed(s, a);
                    };
                };
                Binding.prototype._getUpdTgtProxy = function () {
                    var self = this;
                    return function (sender, args) {
                        self._updateTarget();
                    };
                };
                Binding.prototype._getUpdSrcProxy = function () {
                    var self = this;
                    return function (sender, args) {
                        self._updateSource();
                    };
                };
                Binding.prototype._getSrcErrChangedProxy = function () {
                    var self = this;
                    return function (s, a) {
                        self._onSrcErrorsChanged();
                    };
                };
                Binding.prototype._onSrcErrorsChanged = function () {
                    var errors = [], tgt = this._targetObj, src = this._sourceObj, srcPath = this._srcPath;
                    if (!!tgt && utils.check.isElView(tgt)) {
                        if (!!src && srcPath.length > 0) {
                            var prop = srcPath[srcPath.length - 1];
                            errors = src.getFieldErrors(prop);
                        }
                        tgt.validationErrors = errors;
                    }
                };
                Binding.prototype._getTgtChangedFn = function (self, obj, prop, restPath, lvl) {
                    var fn = function (sender, data) {
                        var val = parser._resolveProp(obj, prop);
                        if (restPath.length > 0) {
                            self._setPathItem(null, 1 /* Target */, lvl, restPath);
                        }
                        self._parseTgtPath(val, restPath, lvl); //bind and trigger target update
                    };
                    return fn;
                };
                Binding.prototype._getSrcChangedFn = function (self, obj, prop, restPath, lvl) {
                    var fn = function (sender, data) {
                        var val = parser._resolveProp(obj, prop);
                        if (restPath.length > 0) {
                            self._setPathItem(null, 0 /* Source */, lvl, restPath);
                        }
                        self._parseSrcPath(val, restPath, lvl);
                    };
                    return fn;
                };
                Binding.prototype._parseSrcPath = function (obj, path, lvl) {
                    var self = this;
                    self._sourceObj = null;
                    if (path.length === 0) {
                        self._sourceObj = obj;
                    } else
                        self._parseSrcPath2(obj, path, lvl);
                    if (!!self._targetObj)
                        self._updateTarget();
                };
                Binding.prototype._parseSrcPath2 = function (obj, path, lvl) {
                    var self = this, nextObj, isBaseObj = (!!obj && utils.check.isBaseObj(obj)), isValidProp;

                    if (isBaseObj) {
                        obj.addOnDestroyed(self._getOnSrcDestroyedProxy(), self._objId);
                        self._setPathItem(obj, 0 /* Source */, lvl, path);
                    }

                    if (path.length > 1) {
                        if (isBaseObj) {
                            obj.addOnPropertyChange(path[0], self._getSrcChangedFn(self, obj, path[0], path.slice(1), lvl + 1), self._objId);
                        }

                        if (!!obj) {
                            nextObj = global.parser._resolveProp(obj, path[0]);
                            if (!!nextObj) {
                                self._parseSrcPath2(nextObj, path.slice(1), lvl + 1);
                            } else if (base_utils.isUndefined(nextObj)) {
                                if (RIAPP.DebugLevel == 2 /* HIGH */) {
                                    debugger;
                                }
                                if (RIAPP.DebugLevel > 0 /* NONE */) {
                                    global._onUnResolvedBinding(0 /* Source */, self.source, self._srcPath.join('.'), path[0]);
                                }
                            }
                        }
                        return;
                    }

                    if (!!obj && path.length == 1) {
                        isValidProp = true;
                        if (RIAPP.DebugLevel != 0 /* NONE */)
                            isValidProp = isBaseObj ? obj._isHasProp(path[0]) : base_utils.hasProp(obj, path[0]);

                        if (isValidProp) {
                            var updateOnChange = isBaseObj && (self._mode === 1 /* OneWay */ || self._mode === 2 /* TwoWay */);
                            if (updateOnChange) {
                                obj.addOnPropertyChange(path[0], self._getUpdTgtProxy(), self._objId);
                            }
                            if (!!obj && utils.check.isFunction(obj.getIErrorNotification)) {
                                obj.addOnErrorsChanged(self._getSrcErrChangedProxy(), self._objId);
                            }
                            self._sourceObj = obj;
                        } else {
                            if (RIAPP.DebugLevel == 2 /* HIGH */) {
                                debugger;
                            }
                            global._onUnResolvedBinding(0 /* Source */, self.source, self._srcPath.join('.'), path[0]);
                        }
                    }
                };
                Binding.prototype._parseTgtPath = function (obj, path, lvl) {
                    var self = this;
                    self._targetObj = null;
                    if (path.length === 0) {
                        self._targetObj = obj;
                    } else
                        self._parseTgtPath2(obj, path, lvl);
                    if (!!self._targetObj)
                        self._updateTarget(); //update target (not source!)
                };
                Binding.prototype._parseTgtPath2 = function (obj, path, lvl) {
                    var self = this, nextObj, isBaseObj = (!!obj && utils.check.isBaseObj(obj)), isValidProp;

                    if (isBaseObj) {
                        obj.addOnDestroyed(self._getOnTgtDestroyedProxy(), self._objId);
                        self._setPathItem(obj, 1 /* Target */, lvl, path);
                    }

                    if (path.length > 1) {
                        if (isBaseObj) {
                            obj.addOnPropertyChange(path[0], self._getTgtChangedFn(self, obj, path[0], path.slice(1), lvl + 1), self._objId);
                        }
                        if (!!obj) {
                            nextObj = global.parser._resolveProp(obj, path[0]);
                            if (!!nextObj) {
                                self._parseTgtPath2(nextObj, path.slice(1), lvl + 1);
                            } else if (base_utils.isUndefined(nextObj)) {
                                if (RIAPP.DebugLevel == 2 /* HIGH */) {
                                    debugger;
                                }
                                if (RIAPP.DebugLevel > 0 /* NONE */) {
                                    global._onUnResolvedBinding(1 /* Target */, self.target, self._tgtPath.join('.'), path[0]);
                                }
                            }
                        }
                        return;
                    }

                    if (!!obj && path.length === 1) {
                        isValidProp = true;
                        if (RIAPP.DebugLevel != 0 /* NONE */)
                            isValidProp = isBaseObj ? obj._isHasProp(path[0]) : base_utils.hasProp(obj, path[0]);

                        if (isValidProp) {
                            var updateOnChange = isBaseObj && (self._mode === 2 /* TwoWay */);
                            if (updateOnChange) {
                                obj.addOnPropertyChange(path[0], self._getUpdSrcProxy(), self._objId);
                            }
                            self._targetObj = obj;
                        } else {
                            if (RIAPP.DebugLevel == 2 /* HIGH */) {
                                debugger;
                            }
                            global._onUnResolvedBinding(1 /* Target */, self.target, self._tgtPath.join('.'), path[0]);
                        }
                    }
                };
                Binding.prototype._setPathItem = function (newObj, bindingTo, lvl, path) {
                    var oldObj, key, len = lvl + path.length;
                    for (var i = lvl; i < len; i += 1) {
                        switch (bindingTo) {
                            case 0 /* Source */:
                                key = 's' + i;
                                break;
                            case 1 /* Target */:
                                key = 't' + i;
                                break;
                            default:
                                throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'bindingTo', bindingTo));
                        }

                        oldObj = this._pathItems[key];
                        if (!!oldObj) {
                            oldObj.removeNSHandlers(this._objId);
                            delete this._pathItems[key];
                        }

                        if (!!newObj && i == lvl) {
                            this._pathItems[key] = newObj;
                        }
                    }
                };
                Binding.prototype._onTgtDestroyed = function (sender, args) {
                    if (this._isDestroyCalled)
                        return;
                    this.target = null;
                };
                Binding.prototype._onSrcDestroyed = function (sender, args) {
                    var self = this;
                    if (self._isDestroyCalled)
                        return;
                    if (sender === self.source)
                        self.source = null;
                    else {
                        self._setPathItem(null, 0 /* Source */, 0, self._srcPath);
                        setTimeout(function () {
                            if (self._isDestroyCalled)
                                return;

                            //rebind after source destroy fully completed
                            self._bindToSource();
                        }, 0);
                    }
                };
                Binding.prototype._bindToSource = function () {
                    this._parseSrcPath(this.source, this._srcPath, 0);
                };
                Binding.prototype._bindToTarget = function () {
                    this._parseTgtPath(this.target, this._tgtPath, 0);
                };
                Binding.prototype._updateTarget = function () {
                    if (this._ignoreSrcChange)
                        return;
                    this._ignoreTgtChange = true;
                    try  {
                        var res = this._converter.convertToTarget(this.sourceValue, this._converterParam, this._sourceObj);
                        if (res !== undefined)
                            this.targetValue = res;
                    } catch (ex) {
                        global.reThrow(ex, this._onError(ex, this));
                    } finally {
                        this._ignoreTgtChange = false;
                    }
                };
                Binding.prototype._updateSource = function () {
                    if (this._ignoreTgtChange)
                        return;
                    this._ignoreSrcChange = true;
                    try  {
                        var res = this._converter.convertToSource(this.targetValue, this._converterParam, this._sourceObj);
                        if (res !== undefined)
                            this.sourceValue = res;
                    } catch (ex) {
                        if (!(ex instanceof ValidationError) || !utils.check.isElView(this._targetObj)) {
                            //BaseElView is notified about errors in _onSrcErrorsChanged event handler
                            //we only need to invoke _onError in other cases
                            //1) when target is not BaseElView
                            //2) when error is not ValidationError
                            this._ignoreSrcChange = false;
                            this._updateTarget(); //resync target with source
                            if (!this._onError(ex, this))
                                throw ex;
                        }
                    } finally {
                        this._ignoreSrcChange = false;
                    }
                };
                Binding.prototype._onError = function (error, source) {
                    var isHandled = _super.prototype._onError.call(this, error, source);
                    if (!isHandled) {
                        if (!!this._appName) {
                            return global.findApp(this._appName)._onError(error, source);
                        } else
                            return global._onError(error, source);
                    }
                    return isHandled;
                };
                Binding.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    var self = this;
                    utils.forEachProp(this._pathItems, function (key) {
                        var old = self._pathItems[key];
                        old.removeNSHandlers(self._objId);
                    });
                    this._pathItems = {};
                    this.source = null;
                    this.target = null;
                    this._state = null;
                    this._converter = null;
                    this._converterParam = null;
                    this._srcPath = null;
                    this._tgtPath = null;
                    this._sourceObj = null;
                    this._targetObj = null;
                    this._source = null;
                    this._target = null;
                    _super.prototype.destroy.call(this);
                };
                Binding.prototype.toString = function () {
                    return 'Binding';
                };

                Object.defineProperty(Binding.prototype, "bindingID", {
                    get: function () {
                        return this._objId;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Binding.prototype, "target", {
                    get: function () {
                        return this._target;
                    },
                    set: function (v) {
                        if (!!this._state) {
                            this._state.target = v;
                            return;
                        }
                        if (this._target !== v) {
                            if (!!this._targetObj && !this._targetObj._isDestroyCalled) {
                                this._ignoreTgtChange = true;
                                try  {
                                    this.targetValue = null;
                                } finally {
                                    this._ignoreTgtChange = false;
                                }
                            }
                            this._setPathItem(null, 1 /* Target */, 0, this._tgtPath);
                            if (!!v && !utils.check.isBaseObj(v))
                                throw new Error(RIAPP.ERRS.ERR_BIND_TARGET_INVALID);
                            this._target = v;
                            this._bindToTarget();
                            if (!!this._target && !this._targetObj)
                                throw new Error(utils.format(RIAPP.ERRS.ERR_BIND_TGTPATH_INVALID, this._tgtPath.join('.')));
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Binding.prototype, "source", {
                    get: function () {
                        return this._source;
                    },
                    set: function (v) {
                        if (!!this._state) {
                            this._state.source = v;
                            return;
                        }
                        if (this._source !== v) {
                            this._setPathItem(null, 0 /* Source */, 0, this._srcPath);
                            this._source = v;
                            this._bindToSource();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Binding.prototype, "targetPath", {
                    get: function () {
                        return this._tgtPath;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Binding.prototype, "sourcePath", {
                    get: function () {
                        return this._srcPath;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Binding.prototype, "sourceValue", {
                    get: function () {
                        if (this._srcPath.length === 0)
                            return this._sourceObj;
                        if (this._sourceObj === null)
                            return null;
                        var prop = this._srcPath[this._srcPath.length - 1];
                        var res = global.parser._resolveProp(this._sourceObj, prop);
                        return res;
                    },
                    set: function (v) {
                        if (this._srcPath.length === 0 || this._sourceObj === null)
                            return;
                        var prop = this._srcPath[this._srcPath.length - 1];
                        global.parser._setPropertyValue(this._sourceObj, prop, v);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Binding.prototype, "targetValue", {
                    get: function () {
                        if (this._targetObj === null)
                            return null;
                        var prop = this._tgtPath[this._tgtPath.length - 1];
                        return global.parser._resolveProp(this._targetObj, prop);
                    },
                    set: function (v) {
                        if (this._targetObj === null)
                            return;
                        var prop = this._tgtPath[this._tgtPath.length - 1];
                        global.parser._setPropertyValue(this._targetObj, prop, v);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Binding.prototype, "mode", {
                    get: function () {
                        return this._mode;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Binding.prototype, "converter", {
                    get: function () {
                        return this._converter;
                    },
                    set: function (v) {
                        this._converter = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Binding.prototype, "converterParam", {
                    get: function () {
                        return this._converterParam;
                    },
                    set: function (v) {
                        this._converterParam = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Binding.prototype, "isSourceFixed", {
                    get: function () {
                        return this._isSourceFixed;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Binding.prototype, "isDisabled", {
                    get: function () {
                        return !!this._state;
                    },
                    set: function (v) {
                        var s;
                        v = !!v;
                        if (this.isDisabled != v) {
                            if (v) {
                                //going to disabled state
                                s = { source: this._source, target: this._target };
                                try  {
                                    this.target = null;
                                    this.source = null;
                                } finally {
                                    this._state = s;
                                }
                            } else {
                                s = this._state;
                                this._state = null;
                                this.target = s.target;
                                this.source = s.source;
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Binding.prototype, "appName", {
                    get: function () {
                        return this._appName;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Binding;
            })(RIAPP.BaseObject);
            binding.Binding = Binding;

            global.onModuleLoaded('binding', binding);
        })(MOD.binding || (MOD.binding = {}));
        var binding = MOD.binding;
    })(RIAPP.MOD || (RIAPP.MOD = {}));
    var MOD = RIAPP.MOD;
})(RIAPP || (RIAPP = {}));
//# sourceMappingURL=binding.js.map

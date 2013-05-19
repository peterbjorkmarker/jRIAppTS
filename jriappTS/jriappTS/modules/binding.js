var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RIAPP;
(function (RIAPP) {
    (function (MOD) {
        (function (binding) {
            'use strict';
            //local variables for optimization
                        var utils = RIAPP.global.utils, consts = RIAPP.global.consts;
            binding.BINDING_MODE = [
                'OneTime', 
                'OneWay', 
                'TwoWay'
            ];
            function _checkIsErrorNotification(obj) {
                if(!obj) {
                    return false;
                }
                if(!utils.check.isFunction(obj.getIErrorNotification)) {
                    return false;
                }
                var tmp = obj.getIErrorNotification();
                return !!tmp && utils.check.isFunction(tmp.getIErrorNotification);
            }
            binding._checkIsErrorNotification = _checkIsErrorNotification;
            var ValidationError = (function (_super) {
                __extends(ValidationError, _super);
                function ValidationError(errorInfo, item) {
                    var message = RIAPP.ERRS.ERR_VALIDATION + '\r\n', i = 0;
                    errorInfo.forEach(function (err) {
                        if(i > 0) {
                            message = message + '\r\n';
                        }
                        if(!!err.fieldName) {
                            message = message + ' ' + RIAPP.localizable.TEXT.txtField + ': ' + err.fieldName + ' -> ' + err.errors.join(', ');
                        } else {
                            message = message + err.errors.join(', ');
                        }
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
            ;
            var Binding = (function (_super) {
                __extends(Binding, _super);
                function Binding(options) {
                                _super.call(this);
                    var opts = utils.extend(false, {
                        target: null,
                        source: null,
                        targetPath: null,
                        sourcePath: null,
                        mode: binding.BINDING_MODE[1],
                        converter: null,
                        converterParam: null,
                        isSourceFixed: false
                    }, options);
                    if(!opts.target) {
                        throw new Error(RIAPP.ERRS.ERR_BIND_TARGET_EMPTY);
                    }
                    if(!utils.check.isString(opts.targetPath)) {
                        throw new Error(utils.format(RIAPP.ERRS.ERR_BIND_TGTPATH_INVALID, opts.targetPath));
                    }
                    if(binding.BINDING_MODE.indexOf(opts.mode) < 0) {
                        throw new Error(utils.format(RIAPP.ERRS.ERR_BIND_MODE_INVALID, opts.mode));
                    }
                    if(!utils.check.isBaseObj(opts.target)) {
                        throw new Error(RIAPP.ERRS.ERR_BIND_TARGET_INVALID);
                    }
                    this._state = null//save state - source and target when binding is disabled
                    ;
                    this._mode = opts.mode;
                    this._converter = opts.converter || RIAPP.global._getConverter('BaseConverter');
                    this._converterParam = opts.converterParam;
                    this._srcPath = RIAPP.global.parser._getPathParts(opts.sourcePath);
                    this._tgtPath = RIAPP.global.parser._getPathParts(opts.targetPath);
                    if(this._tgtPath.length < 1) {
                        throw new Error(utils.format(RIAPP.ERRS.ERR_BIND_TGTPATH_INVALID, opts.targetPath));
                    }
                    this._isSourceFixed = (!!opts.isSourceFixed);
                    this._bounds = {
                    };
                    this._objId = 'bnd' + utils.getNewID();
                    this._ignoreSrcChange = false;
                    this._ignoreTgtChange = false;
                    this._sourceObj = null;
                    this._targetObj = null;
                    this._source = null;
                    this._target = null;
                    this.target = opts.target;
                    this.source = opts.source;
                    if(!!this._sourceObj && utils.check.isFunction(this._sourceObj.getIErrorNotification)) {
                        if((this._sourceObj).getIsHasErrors()) {
                            this._onSrcErrorsChanged();
                        }
                    }
                }
                Binding.create = function create(options) {
                    return new Binding(options);
                };
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
                    return function () {
                        self._updateTarget();
                    };
                };
                Binding.prototype._getUpdSrcProxy = function () {
                    var self = this;
                    return function () {
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
                    if(!!tgt && utils.check.isElView(tgt)) {
                        if(!!src && srcPath.length > 0) {
                            var prop = srcPath[srcPath.length - 1];
                            errors = (src).getFieldErrors(prop);
                        }
                        (tgt).validationErrors = errors;
                    }
                };
                Binding.prototype._onError = function (error, source) {
                    var isHandled = _super.prototype._onError.call(this, error, source);
                    if(!isHandled) {
                        return RIAPP.global._onError(error, source);
                    }
                    return isHandled;
                };
                Binding.prototype._getTgtChangedFn = function (self, obj, prop, restPath, lvl) {
                    var fn = function (sender, data) {
                        var val = RIAPP.global.parser._resolveProp(obj, prop);
                        if(restPath.length > 0) {
                            self._checkBounded(null, 'target', lvl, restPath);
                        }
                        self._parseTgtPath(val, restPath, lvl)//bind and trigger target update
                        ;
                    };
                    return fn;
                };
                Binding.prototype._getSrcChangedFn = function (self, obj, prop, restPath, lvl) {
                    var fn = function (sender, data) {
                        var val = RIAPP.global.parser._resolveProp(obj, prop);
                        if(restPath.length > 0) {
                            self._checkBounded(null, 'source', lvl, restPath);
                        }
                        self._parseSrcPath(val, restPath, lvl);
                    };
                    return fn;
                };
                Binding.prototype._parseSrcPath = function (obj, path, lvl) {
                    var self = this;
                    self._sourceObj = null;
                    if(path.length === 0) {
                        self._sourceObj = obj;
                    } else {
                        self._parseSrcPath2(obj, path, lvl);
                    }
                    if(!!self._targetObj) {
                        self._updateTarget();
                    }
                };
                Binding.prototype._parseSrcPath2 = function (obj, path, lvl) {
                    var self = this, nextObj;
                    var isBaseObj = (!!obj && utils.check.isBaseObj(obj));
                    if(isBaseObj) {
                        obj.addOnDestroyed(self._getOnSrcDestroyedProxy(), self._objId);
                        self._checkBounded(obj, 'source', lvl, path);
                    }
                    if(path.length > 1) {
                        if(isBaseObj) {
                            obj.addOnPropertyChange(path[0], self._getSrcChangedFn(self, obj, path[0], path.slice(1), lvl + 1), self._objId);
                        }
                        if(!!obj) {
                            nextObj = RIAPP.global.parser._resolveProp(obj, path[0]);
                            if(!!nextObj) {
                                self._parseSrcPath2(nextObj, path.slice(1), lvl + 1);
                            }
                        }
                        return;
                    }
                    if(!!obj && path.length === 1) {
                        var updateOnChange = (self._mode === binding.BINDING_MODE[1] || self._mode === binding.BINDING_MODE[2]);
                        if(updateOnChange && isBaseObj) {
                            obj.addOnPropertyChange(path[0], self._getUpdTgtProxy(), this._objId);
                        }
                        if(!!obj && utils.check.isFunction(obj.getIErrorNotification)) {
                            (obj).addOnErrorsChanged(self._getSrcErrChangedProxy(), self._objId);
                        }
                        this._sourceObj = obj;
                    }
                };
                Binding.prototype._parseTgtPath = function (obj, path, lvl) {
                    var self = this;
                    self._targetObj = null;
                    if(path.length === 0) {
                        self._targetObj = obj;
                    } else {
                        self._parseTgtPath2(obj, path, lvl);
                    }
                    if(!!self._targetObj) {
                        //new target
                        self._updateTarget();
                    }//update target (not source!)
                    
                };
                Binding.prototype._parseTgtPath2 = function (obj, path, lvl) {
                    var self = this, nextObj;
                    var isBaseObj = (!!obj && utils.check.isBaseObj(obj));
                    if(isBaseObj) {
                        obj.addOnDestroyed(self._getOnTgtDestroyedProxy(), self._objId);
                        self._checkBounded(obj, 'target', lvl, path);
                    }
                    if(path.length > 1) {
                        if(isBaseObj) {
                            obj.addOnPropertyChange(path[0], self._getTgtChangedFn(self, obj, path[0], path.slice(1), lvl + 1), self._objId);
                        }
                        if(!!obj) {
                            nextObj = RIAPP.global.parser._resolveProp(obj, path[0]);
                            if(!!nextObj) {
                                self._parseTgtPath2(nextObj, path.slice(1), lvl + 1);
                            }
                        }
                        return;
                    }
                    if(!!obj && path.length === 1) {
                        var updateOnChange = (self._mode === binding.BINDING_MODE[2]);
                        if(updateOnChange && isBaseObj) {
                            obj.addOnPropertyChange(path[0], self._getUpdSrcProxy(), this._objId);
                        }
                        self._targetObj = obj;
                    }
                };
                Binding.prototype._checkBounded = function (obj, to, lvl, restPath) {
                    var old, key;
                    if(to === 'source') {
                        key = 's' + lvl;
                    } else if(to === 'target') {
                        key = 't' + lvl;
                    } else {
                        throw new Error(utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'to', to));
                    }
                    old = this._bounds[key];
                    if(!!old) {
                        old.removeNSHandlers(this._objId);
                        delete this._bounds[key];
                    }
                    if(restPath.length > 0) {
                        this._checkBounded(null, to, lvl + 1, restPath.slice(1));
                    }
                    if(!!obj) {
                        this._bounds[key] = obj;
                    }
                };
                Binding.prototype._onTgtDestroyed = function (sender, args) {
                    if(this._isDestroyCalled) {
                        return;
                    }
                    this.target = null;
                };
                Binding.prototype._onSrcDestroyed = function (sender, args) {
                    var self = this;
                    if(self._isDestroyCalled) {
                        return;
                    }
                    if(sender === self.source) {
                        self.source = null;
                    } else {
                        self._checkBounded(null, 'source', 0, self._srcPath);
                        setTimeout(function () {
                            if(self._isDestroyCalled) {
                                return;
                            }
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
                    if(this._ignoreSrcChange) {
                        return;
                    }
                    this._ignoreTgtChange = true;
                    try  {
                        var res = this._converter.convertToTarget(this.sourceValue, this._converterParam, this._sourceObj);
                        if(res !== undefined) {
                            this.targetValue = res;
                        }
                    } catch (ex) {
                        RIAPP.global.reThrow(ex, this._onError(ex, this));
                    }finally {
                        this._ignoreTgtChange = false;
                    }
                };
                Binding.prototype._updateSource = function () {
                    if(this._ignoreTgtChange) {
                        return;
                    }
                    this._ignoreSrcChange = true;
                    try  {
                        var res = this._converter.convertToSource(this.targetValue, this._converterParam, this._sourceObj);
                        if(res !== undefined) {
                            this.sourceValue = res;
                        }
                    } catch (ex) {
                        if(!(ex instanceof ValidationError) || !utils.check.isElView(this._targetObj)) {
                            //BaseElView is notified about errors in _onSrcErrorsChanged event handler
                            //we only need to invoke _onError in other cases
                            //1) when target is not BaseElView
                            //2) when error is not ValidationError
                            this._updateTarget()//resync target with source
                            ;
                            if(!this._onError(ex, this)) {
                                throw ex;
                            }
                        }
                    }finally {
                        this._ignoreSrcChange = false;
                    }
                };
                Binding.prototype.destroy = function () {
                    if(this._isDestroyed) {
                        return;
                    }
                    this._isDestroyCalled = true;
                    var self = this;
                    utils.forEachProp(this._bounds, function (key) {
                        var old = self._bounds[key];
                        old.removeNSHandlers(self._objId);
                    });
                    this._bounds = {
                    };
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
                        if(!!this._state) {
                            this._state.target = v;
                            return;
                        }
                        if(this._target !== v) {
                            var tgtObj = this._targetObj;
                            if(!!tgtObj && !tgtObj._isDestroyCalled) {
                                this._ignoreTgtChange = true;
                                try  {
                                    this.targetValue = null;
                                }finally {
                                    this._ignoreTgtChange = false;
                                }
                            }
                            this._checkBounded(null, 'target', 0, this._tgtPath);
                            if(!!v && !utils.check.isBaseObj(v)) {
                                throw new Error(RIAPP.ERRS.ERR_BIND_TARGET_INVALID);
                            }
                            this._target = v;
                            this._bindToTarget();
                            if(!!this._target && !this._targetObj) {
                                throw new Error(utils.format(RIAPP.ERRS.ERR_BIND_TGTPATH_INVALID, this._tgtPath.join('.')));
                            }
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
                        if(!!this._state) {
                            this._state.source = v;
                            return;
                        }
                        if(this._source !== v) {
                            this._checkBounded(null, 'source', 0, this._srcPath);
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
                        if(this._srcPath.length === 0) {
                            return this._sourceObj;
                        }
                        if(this._sourceObj === null) {
                            return null;
                        }
                        var prop = this._srcPath[this._srcPath.length - 1];
                        var res = RIAPP.global.parser._resolveProp(this._sourceObj, prop);
                        return res;
                    },
                    set: function (v) {
                        if(this._srcPath.length === 0 || this._sourceObj === null) {
                            return;
                        }
                        var prop = this._srcPath[this._srcPath.length - 1];
                        RIAPP.global.parser._setPropertyValue(this._sourceObj, prop, v);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Binding.prototype, "targetValue", {
                    get: function () {
                        if(this._targetObj === null) {
                            return null;
                        }
                        var prop = this._tgtPath[this._tgtPath.length - 1];
                        return RIAPP.global.parser._resolveProp(this._targetObj, prop);
                    },
                    set: function (v) {
                        if(this._targetObj === null) {
                            return;
                        }
                        var prop = this._tgtPath[this._tgtPath.length - 1];
                        RIAPP.global.parser._setPropertyValue(this._targetObj, prop, v);
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
                        if(this.isDisabled != v) {
                            if(v) {
                                //going to disabled state
                                s = {
                                    source: this._source,
                                    target: this._target
                                };
                                try  {
                                    this.target = null;
                                    this.source = null;
                                }finally {
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
                return Binding;
            })(RIAPP.BaseObject);
            binding.Binding = Binding;            
            ;
            RIAPP.global.registerType('ValidationError', ValidationError);
            RIAPP.global.registerType('Binding', Binding);
            RIAPP.global.onModuleLoaded('binding', binding);
        })(MOD.binding || (MOD.binding = {}));
        var binding = MOD.binding;
    })(RIAPP.MOD || (RIAPP.MOD = {}));
    var MOD = RIAPP.MOD;
})(RIAPP || (RIAPP = {}));
//@ sourceMappingURL=binding.js.map

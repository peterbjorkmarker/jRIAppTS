module RIAPP {
    export module MOD {
        export module binding {
            export var BINDING_MODE = ['OneTime', 'OneWay', 'TwoWay'];
      
            export interface IBindingOptions {
                mode?: string;
                converterParam?: any;
                converter?: MOD.converter.IConverter;
                targetPath: string;
                sourcePath?: string;
                target?: BaseObject;
                source?: any;
                isSourceFixed?: boolean;
            }

            export interface IValidationInfo {
                fieldName: string;
                errors: string[];
            }

            export interface IErrorNotification {
                getIsHasErrors(): boolean;
                addOnErrorsChanged(fn: (sender: any, args: {}) => void , namespace?: string): void;
                removeOnErrorsChanged(namespace?: string): void;
                getFieldErrors(fieldName): IValidationInfo[];
                getAllErrors(): IValidationInfo[];
                getIErrorNotification(): IErrorNotification;
            }

            export function _checkIsErrorNotification(obj) {
                if (!obj)
                    return false;
                if (!RIAPP.global.utils.check.isFunction(obj.getIErrorNotification))
                    return false;
                var tmp = obj.getIErrorNotification();
                return !!tmp && RIAPP.global.utils.check.isFunction(tmp.getIErrorNotification);
            }

            export class ValidationError extends MOD.errors.BaseError{
                _errors: IValidationInfo[];
                _item: any;
                constructor(errorInfo: IValidationInfo[], item) {
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
                    super(message);
                    this._errors = errorInfo;
                    this._item = item;
                }
                get item() {
                    return this._item;
                }
                get errors() {
                    return this._errors;
                }
            };

            export class Binding extends RIAPP.BaseObject{
                private _state:any;
                private _mode:string;
                private _converter: MOD.converter.IConverter;
                private _converterParam: any;
                private _srcPath:string[];
                private _tgtPath:string[];
                private _isSourceFixed: boolean;
                private _bounds: { [key: string]: BaseObject; };
                private _objId: string;
                private _ignoreSrcChange: boolean;
                private _ignoreTgtChange: boolean;
                private _sourceObj: any;
                private _targetObj: any;
                private _source: any;
                private _target: BaseObject;
                private _appName: string;

                 constructor (options: IBindingOptions, appName?: string) {
                    super();
                     var opts = RIAPP.global.utils.extend(false, {
                        target: null, source: null,
                        targetPath: null, sourcePath: null, mode: BINDING_MODE[1],
                        converter: null, converterParam: null, isSourceFixed: false
                    }, options);

                    if (!opts.target) {
                        throw new Error(RIAPP.ERRS.ERR_BIND_TARGET_EMPTY);
                    }

                     if (!RIAPP.global.utils.check.isString(opts.targetPath)) {
                         throw new Error(RIAPP.global.utils.format(RIAPP.ERRS.ERR_BIND_TGTPATH_INVALID, opts.targetPath));
                    }

                    if (BINDING_MODE.indexOf(opts.mode) < 0) {
                        throw new Error(RIAPP.global.utils.format(RIAPP.ERRS.ERR_BIND_MODE_INVALID, opts.mode));
                    }

                     if (!RIAPP.global.utils.check.isBaseObj(opts.target)) {
                        throw new Error(RIAPP.ERRS.ERR_BIND_TARGET_INVALID);
                    }
                    this._appName = appName;
                    this._state = null; //save state - source and target when binding is disabled
                    this._mode = opts.mode;
                    this._converter = opts.converter || global._getConverter('BaseConverter');
                    this._converterParam = opts.converterParam;
                    this._srcPath = global.parser._getPathParts(opts.sourcePath);
                    this._tgtPath = global.parser._getPathParts(opts.targetPath);
                    if (this._tgtPath.length < 1)
                        throw new Error(RIAPP.global.utils.format(RIAPP.ERRS.ERR_BIND_TGTPATH_INVALID, opts.targetPath));
                    this._isSourceFixed = (!!opts.isSourceFixed);
                    this._bounds = {};
                    this._objId = 'bnd' + RIAPP.global.utils.getNewID();
                    this._ignoreSrcChange = false;
                    this._ignoreTgtChange = false;
                    this._sourceObj = null;
                    this._targetObj = null;
                    this._source = null;
                    this._target = null;
                    this.target = opts.target;
                    this.source = opts.source;
                     if (!!this._sourceObj && RIAPP.global.utils.check.isFunction(this._sourceObj.getIErrorNotification)) {
                        if ((<IErrorNotification>this._sourceObj).getIsHasErrors())
                            this._onSrcErrorsChanged();
                    }
                 }
                _getOnTgtDestroyedProxy() {
                    var self = this;
                    return function (s, a) {
                        self._onTgtDestroyed(s,a);
                    };
                }
                _getOnSrcDestroyedProxy() {
                    var self = this;
                    return function (s, a) {
                        self._onSrcDestroyed(s,a);
                    };
                }
                _getUpdTgtProxy() {
                    var self = this;
                    return function () {
                        self._updateTarget();
                    };
                }
                _getUpdSrcProxy() {
                    var self = this;
                    return function () {
                        self._updateSource();
                    };
                }
                _getSrcErrChangedProxy() {
                    var self = this;
                    return function (s, a) {
                        self._onSrcErrorsChanged();
                    };
                }
                _onSrcErrorsChanged() {
                    var errors:IValidationInfo[] = [], tgt = this._targetObj, src = this._sourceObj, srcPath = this._srcPath;
                    if (!!tgt && RIAPP.global.utils.check.isElView(tgt)) {
                        if (!!src && srcPath.length > 0) {
                            var prop = srcPath[srcPath.length - 1];
                            errors = (<IErrorNotification>src).getFieldErrors(prop);
                        }
                        (<baseElView.BaseElView>tgt).validationErrors = errors;
                    }
                }
                _onError(error: any, source: any):boolean {
                    var isHandled = super._onError(error, source);
                    if (!isHandled) {
                        if (!!this._appName) {
                            return global.findApp(this._appName)._onError(error, source);
                        }
                        else
                            return global._onError(error, source);
                    }
                    return isHandled;
                }
                _getTgtChangedFn(self, obj, prop:string, restPath:string[], lvl:number) {
                    var fn = function (sender, data) {
                        var val = global.parser._resolveProp(obj, prop);
                        if (restPath.length > 0) {
                            self._checkBounded(null, 'target', lvl, restPath);
                        }
                        self._parseTgtPath(val, restPath, lvl); //bind and trigger target update
                    };
                    return fn;
                }
                _getSrcChangedFn(self, obj, prop:string, restPath:string[], lvl:number) {
                    var fn = function (sender, data) {
                        var val = global.parser._resolveProp(obj, prop);
                        if (restPath.length > 0) {
                            self._checkBounded(null, 'source', lvl, restPath);
                        }
                        self._parseSrcPath(val, restPath, lvl);
                    };
                    return fn;
                }
                _parseSrcPath(obj, path: string[], lvl: number) {
                    var self = this;
                    self._sourceObj = null;
                    if (path.length === 0) {
                        self._sourceObj = obj;
                    }
                    else
                        self._parseSrcPath2(obj, path, lvl);
                    if (!!self._targetObj)
                        self._updateTarget();
                }
                _parseSrcPath2(obj, path:string[], lvl:number) {
                    var self = this, nextObj;
                    var isBaseObj = (!!obj && RIAPP.global.utils.check.isBaseObj(obj));


                    if (isBaseObj) {
                        obj.addOnDestroyed(self._getOnSrcDestroyedProxy(), self._objId);
                        self._checkBounded(obj, 'source', lvl, path);
                    }

                    if (path.length > 1) {
                        if (isBaseObj) {
                            obj.addOnPropertyChange(path[0], self._getSrcChangedFn(self, obj, path[0], path.slice(1), lvl + 1), self._objId);
                        }

                        if (!!obj) {
                            nextObj = global.parser._resolveProp(obj, path[0]);
                            if (!!nextObj)
                                self._parseSrcPath2(nextObj, path.slice(1), lvl + 1);
                        }
                        return;
                    }

                    if (!!obj && path.length === 1) {
                        var updateOnChange = (self._mode === BINDING_MODE[1] || self._mode === BINDING_MODE[2]);
                        if (updateOnChange && isBaseObj) {
                            obj.addOnPropertyChange(path[0], self._getUpdTgtProxy(), this._objId);
                        }
                        if (!!obj && RIAPP.global.utils.check.isFunction(obj.getIErrorNotification)) {
                           (<IErrorNotification>obj).addOnErrorsChanged(self._getSrcErrChangedProxy(), self._objId);
                        }
                        this._sourceObj = obj;
                    }
                }
                _parseTgtPath(obj, path: string[], lvl: number) {
                    var self = this;
                    self._targetObj = null;
                    if (path.length === 0) {
                        self._targetObj = obj;
                    }
                    else
                        self._parseTgtPath2(obj, path, lvl);
                    if (!!self._targetObj) //new target
                        self._updateTarget();  //update target (not source!)
                }
                _parseTgtPath2(obj, path:string[], lvl:number) {
                    var self = this, nextObj;
                    var isBaseObj = (!!obj && RIAPP.global.utils.check.isBaseObj(obj));

                    if (isBaseObj) {
                        obj.addOnDestroyed(self._getOnTgtDestroyedProxy(), self._objId);
                        self._checkBounded(obj, 'target', lvl, path);
                    }

                    if (path.length > 1) {
                        if (isBaseObj) {
                            obj.addOnPropertyChange(path[0], self._getTgtChangedFn(self, obj, path[0], path.slice(1), lvl + 1), self._objId);
                        }
                        if (!!obj) {
                            nextObj = global.parser._resolveProp(obj, path[0]);
                            if (!!nextObj)
                                self._parseTgtPath2(nextObj, path.slice(1), lvl + 1);
                        }
                        return;
                    }

                    if (!!obj && path.length === 1) {
                        var updateOnChange = (self._mode === BINDING_MODE[2]);
                        if (updateOnChange && isBaseObj) {
                            obj.addOnPropertyChange(path[0], self._getUpdSrcProxy(), this._objId);
                        }
                        self._targetObj = obj;
                    }
                }
                _checkBounded(obj:BaseObject, to:string, lvl:number, restPath:string[]) {
                    var old: BaseObject, key:string;
                    if (to === 'source') {
                        key = 's' + lvl;
                    }
                    else if (to === 'target') {
                        key = 't' + lvl;
                    }
                    else
                        throw new Error(RIAPP.global.utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'to', to));

                    old = this._bounds[key];
                    if (!!old) {
                        old.removeNSHandlers(this._objId);
                        delete this._bounds[key];
                    }

                    if (restPath.length > 0) {
                        this._checkBounded(null, to, lvl + 1, restPath.slice(1));
                    }

                    if (!!obj) {
                        this._bounds[key] = obj;
                    }
                }
                _onTgtDestroyed(sender,args) {
                    if (this._isDestroyCalled)
                        return;
                    this.target = null;
                }
                _onSrcDestroyed(sender, args) {
                    var self = this;
                    if (self._isDestroyCalled)
                        return;
                    if (sender === self.source)
                        self.source = null;
                    else {
                        self._checkBounded(null, 'source', 0, self._srcPath);
                        setTimeout(function () {
                            if (self._isDestroyCalled)
                                return;
                            //rebind after source destroy fully completed
                            self._bindToSource();
                        }, 0);
                    }
                }
                _bindToSource() {
                    this._parseSrcPath(this.source, this._srcPath, 0);
                }
                _bindToTarget() {
                    this._parseTgtPath(this.target, this._tgtPath, 0);
                }
                _updateTarget() {
                    if (this._ignoreSrcChange)
                        return;
                    this._ignoreTgtChange = true;
                    try {
                        var res = this._converter.convertToTarget(this.sourceValue, this._converterParam, this._sourceObj);
                        if (res !== undefined)
                            this.targetValue = res;
                    }
                    catch (ex) {
                        global.reThrow(ex, this._onError(ex, this));
                    }
                    finally {
                        this._ignoreTgtChange = false;
                    }
                }
                _updateSource() {
                    if (this._ignoreTgtChange)
                        return;
                    this._ignoreSrcChange = true;
                    try {
                        var res = this._converter.convertToSource(this.targetValue, this._converterParam, this._sourceObj);
                        if (res !== undefined)
                            this.sourceValue = res;
                    }
                    catch (ex) {
                        if (!(ex instanceof ValidationError) || !RIAPP.global.utils.check.isElView(this._targetObj)) {
                            //BaseElView is notified about errors in _onSrcErrorsChanged event handler
                            //we only need to invoke _onError in other cases
                            //1) when target is not BaseElView
                            //2) when error is not ValidationError
                            this._ignoreSrcChange = false;
                            this._updateTarget(); //resync target with source
                            if (!this._onError(ex, this))
                                throw ex;
                        }
                    }
                    finally {
                        this._ignoreSrcChange = false;
                    }
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    var self = this;
                    RIAPP.global.utils.forEachProp(this._bounds, function (key) {
                        var old = self._bounds[key];
                        old.removeNSHandlers(self._objId);
                    });
                    this._bounds = {};
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
                    super.destroy();
                }
                toString() {
                    return 'Binding';
                }
     
                get bindingID(){
                    return this._objId;
                }
                get target() { return this._target; }
                set target(v: BaseObject) {
                    if (!!this._state) {
                        this._state.target = v;
                        return;
                    }
                    if (this._target !== v) {
                        if (!!this._targetObj && !this._targetObj._isDestroyCalled) {
                            this._ignoreTgtChange = true;
                            try {
                                this.targetValue = null;
                            }
                            finally {
                                this._ignoreTgtChange = false;
                            }
                        }
                        this._checkBounded(null, 'target', 0, this._tgtPath);
                        if (!!v && !RIAPP.global.utils.check.isBaseObj(v))
                            throw new Error(RIAPP.ERRS.ERR_BIND_TARGET_INVALID);
                        this._target = v;
                        this._bindToTarget();
                        if (!!this._target && !this._targetObj)
                            throw new Error(RIAPP.global.utils.format(RIAPP.ERRS.ERR_BIND_TGTPATH_INVALID, this._tgtPath.join('.')));
                    }
                }
                get source() { return this._source; }
                set source(v) {
                    if (!!this._state) {
                        this._state.source = v;
                        return;
                    }
                    if (this._source !== v) {
                        this._checkBounded(null, 'source', 0, this._srcPath);
                        this._source = v;
                        this._bindToSource();
                    }
                }
                get targetPath() { return this._tgtPath; }
                get sourcePath() { return this._srcPath; }
                get sourceValue() {
                    if (this._srcPath.length === 0)
                        return this._sourceObj;
                    if (this._sourceObj === null)
                        return null;
                    var prop = this._srcPath[this._srcPath.length - 1];
                    var res = global.parser._resolveProp(this._sourceObj, prop);
                    return res;
                }
                set sourceValue(v) {
                    if (this._srcPath.length === 0 || this._sourceObj === null)
                        return;
                    var prop = this._srcPath[this._srcPath.length - 1];
                    global.parser._setPropertyValue(this._sourceObj, prop, v);
                }
                get targetValue() {
                    if (this._targetObj === null)
                        return null;
                    var prop = this._tgtPath[this._tgtPath.length - 1];
                    return global.parser._resolveProp(this._targetObj, prop);
                }
                set targetValue(v) {
                    if (this._targetObj === null)
                        return;
                    var prop = this._tgtPath[this._tgtPath.length - 1];
                    global.parser._setPropertyValue(this._targetObj, prop, v);
                }
                get mode() { return this._mode; }
                get converter() { return this._converter; }
                set converter(v: MOD.converter.IConverter) { this._converter = v; }
                get converterParam() { return this._converterParam; }
                set converterParam(v) { this._converterParam = v; }
                get isSourceFixed() { return this._isSourceFixed; }
                get isDisabled() { return !!this._state; }
                set isDisabled(v) {
                    var s;
                    v = !!v;
                    if (this.isDisabled != v) {
                        if (v) {
                            //going to disabled state
                            s = { source: this._source, target: this._target };
                            try {
                                this.target = null;
                                this.source = null;
                            }
                            finally {
                                this._state = s;
                            }
                        }
                        else {
                            s = this._state;
                            this._state = null;
                            this.target = s.target;
                            this.source = s.source;
                        }
                    }
                }
                get appName() { return this._appName; }
           };


           global.registerType('ValidationError', ValidationError);
           global.registerType('Binding', Binding);
           global.onModuleLoaded('binding', binding);
        }
    }
}

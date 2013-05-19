var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RIAPP;
(function (RIAPP) {
    (function (MOD) {
        (function (baseContent) {
            //local variables for optimization
                        var utils = RIAPP.global.utils, consts = RIAPP.global.consts;
            baseContent.css = {
                content: 'ria-content-field',
                required: 'ria-required-field'
            };
            ;
            ;
            ;
            ;
            function parseContentAttr(content_attr) {
                var res = {
                    name: null,
                    templateInfo: null,
                    bindingInfo: null,
                    displayInfo: null,
                    fieldName: null,
                    options: null
                };
                var temp_opts = RIAPP.global.parser.parseOptions(content_attr);
                if(temp_opts.length === 0) {
                    return res;
                }
                var attr = temp_opts[0];
                if(!attr.template && !!attr.fieldName) {
                    var bindOpt = {
                        target: null,
                        source: null,
                        targetPath: null,
                        sourcePath: attr.fieldName,
                        mode: "OneWay",
                        converter: null,
                        converterParam: null
                    };
                    res.bindingInfo = bindOpt;
                    res.displayInfo = attr.css;
                    res.fieldName = attr.fieldName;
                    if(!!attr.name) {
                        res.name = attr.name;
                    }
                    if(!!attr.options) {
                        res.options = attr.options;
                    }
                    if(!(attr.readOnly === undefined)) {
                        res.readOnly = utils.parseBool(attr.readOnly);
                    }
                } else if(!!attr.template) {
                    res.templateInfo = attr.template;
                    delete attr.template;
                }
                return res;
            }
            baseContent.parseContentAttr = parseContentAttr;
            ;
            function getBindingOptions(app, options, defaultTarget, defaultSource) {
                var BINDING_MODE = MOD.binding.BINDING_MODE, opts = {
                    mode: BINDING_MODE[1],
                    converterParam: null,
                    converter: null,
                    targetPath: null,
                    sourcePath: null,
                    target: null,
                    source: null,
                    isSourceFixed: false
                };
                var fixedSource = options.source, fixedTarget = options.target;
                if(!options.sourcePath && !!options.to) {
                    opts.sourcePath = options.to;
                } else if(!!options.sourcePath) {
                    opts.sourcePath = options.sourcePath;
                }
                if(!!options.targetPath) {
                    opts.targetPath = options.targetPath;
                }
                if(!!options.converterParam) {
                    opts.converterParam = options.converterParam;
                }
                if(!!options.mode) {
                    opts.mode = options.mode;
                }
                if(!!options.converter) {
                    if(utils.check.isString(options.converter)) {
                        opts.converter = app.getConverter(options.converter);
                    } else {
                        opts.converter = options.converter;
                    }
                }
                if(!fixedTarget) {
                    opts.target = defaultTarget;
                } else {
                    if(utils.check.isString(fixedTarget)) {
                        if(fixedTarget == 'this') {
                            opts.target = defaultTarget;
                        } else {
                            //if no fixed target, then target evaluation starts from this app
                            opts.target = RIAPP.global.parser.resolveBindingSource(app, RIAPP.global.parser._getPathParts(fixedTarget));
                        }
                    } else {
                        opts.target = fixedTarget;
                    }
                }
                if(!fixedSource) {
                    //if source is not supplied use defaultSource parameter as source
                    opts.source = defaultSource;
                } else {
                    opts.isSourceFixed = true;
                    if(utils.check.isString(fixedSource)) {
                        if(fixedSource == 'this') {
                            opts.source = defaultTarget;
                        } else {
                            //source evaluation starts from this app
                            opts.source = RIAPP.global.parser.resolveBindingSource(app, RIAPP.global.parser._getPathParts(fixedSource));
                        }
                    } else {
                        opts.source = fixedSource;
                    }
                }
                return opts;
            }
            baseContent.getBindingOptions = getBindingOptions;
            ;
            ;
            var BindingContent = (function (_super) {
                __extends(BindingContent, _super);
                function BindingContent(app, parentEl, options, dctx, isEditing) {
                                _super.call(this);
                    this._app = app;
                    this._parentEl = parentEl;
                    this._el = null;
                    this._options = options;
                    this._isReadOnly = !!this._options.readOnly;
                    this._isEditing = !!isEditing;
                    this._dctx = dctx;
                    this._lfScope = null;
                    this._tgt = null;
                    var $p = RIAPP.global.$(this._parentEl);
                    $p.addClass(baseContent.css.content);
                    this._init();
                    this.update();
                }
                BindingContent.prototype._init = function () {
                };
                BindingContent.prototype._updateCss = function () {
                    var displayInfo = this._getDisplayInfo(), $p = RIAPP.global.$(this._parentEl), fieldInfo = this.getFieldInfo();
                    if(this._isEditing && this._canBeEdited()) {
                        if(!!displayInfo) {
                            if(!!displayInfo.editCss) {
                                $p.addClass(displayInfo.editCss);
                            }
                            if(!!displayInfo.displayCss) {
                                $p.removeClass(displayInfo.displayCss);
                            }
                        }
                        if(!!fieldInfo && !fieldInfo.isNullable) {
                            $p.addClass(baseContent.css.required);
                        }
                    } else {
                        if(!!displayInfo) {
                            if(!!displayInfo.displayCss) {
                                $p.addClass(displayInfo.displayCss);
                            }
                            if(!!displayInfo.editCss) {
                                $p.removeClass(displayInfo.editCss);
                            }
                            if(!!fieldInfo && !fieldInfo.isNullable) {
                                $p.removeClass(baseContent.css.required);
                            }
                        }
                    }
                };
                BindingContent.prototype._canBeEdited = function () {
                    if(this._isReadOnly) {
                        return false;
                    }
                    var finf = this.getFieldInfo();
                    if(!finf) {
                        return false;
                    }
                    var editable = !!this._dctx && !!this._dctx.beginEdit;
                    return editable && !finf.isReadOnly && !finf.isCalculated;
                };
                BindingContent.prototype._createTargetElement = function () {
                    var el, doc = RIAPP.global.document;
                    if(this._isEditing && this._canBeEdited()) {
                        el = doc.createElement('input');
                        el.setAttribute('type', 'text');
                    } else {
                        el = doc.createElement('span');
                    }
                    this._updateCss();
                    return el;
                };
                BindingContent.prototype._getBindingOption = function (bindingInfo, tgt, dctx, targetPath) {
                    var options = getBindingOptions(this.app, bindingInfo, tgt, dctx);
                    if(this.isEditing && this._canBeEdited()) {
                        options.mode = 'TwoWay';
                    } else {
                        options.mode = 'OneWay';
                    }
                    if(!!targetPath) {
                        options.targetPath = targetPath;
                    }
                    return options;
                };
                BindingContent.prototype._getBindings = function () {
                    if(!this._lfScope) {
                        return [];
                    }
                    var arr = this._lfScope.getObjs(), res = [];
                    for(var i = 0, len = arr.length; i < len; i += 1) {
                        if(utils.check.isBinding(arr[i])) {
                            res.push(arr[i]);
                        }
                    }
                    return res;
                };
                BindingContent.prototype._updateBindingSource = function () {
                    var i, len, obj, bindings = this._getBindings();
                    for(i = 0 , len = bindings.length; i < len; i += 1) {
                        obj = bindings[i];
                        if(!obj.isSourceFixed) {
                            obj.source = this._dctx;
                        }
                    }
                };
                BindingContent.prototype._cleanUp = function () {
                    if(!!this._lfScope) {
                        this._lfScope.destroy();
                        this._lfScope = null;
                    }
                    if(!!this._el) {
                        RIAPP.global.$(this._el).remove();
                        this._el = null;
                    }
                    this._tgt = null;
                };
                BindingContent.prototype.getFieldInfo = function () {
                    return this._options.fieldInfo;
                };
                BindingContent.prototype._getBindingInfo = function () {
                    return this._options.bindingInfo;
                };
                BindingContent.prototype._getDisplayInfo = function () {
                    return this._options.displayInfo;
                };
                BindingContent.prototype._getElementView = function (el) {
                    return this.app.getElementView(el);
                };
                BindingContent.prototype.update = function () {
                    this._cleanUp();
                    var bindingInfo = this._getBindingInfo();
                    if(!!bindingInfo) {
                        this._el = this._createTargetElement();
                        this._tgt = this._getElementView(this._el);
                        this._lfScope = new RIAPP.MOD.utils.LifeTimeScope();
                        this._lfScope.addObj(this._tgt);
                        var options = this._getBindingOption(bindingInfo, this._tgt, this._dctx, 'value');
                        this._parentEl.appendChild(this._el);
                        this._lfScope.addObj(this.app.bind(options));
                    }
                };
                BindingContent.prototype.destroy = function () {
                    if(this._isDestroyed) {
                        return;
                    }
                    this._isDestroyCalled = true;
                    var displayInfo = this._getDisplayInfo(), $p = RIAPP.global.$(this._parentEl);
                    $p.removeClass(baseContent.css.content);
                    $p.removeClass(baseContent.css.required);
                    if(!!displayInfo && !!displayInfo.displayCss) {
                        $p.removeClass(displayInfo.displayCss);
                    }
                    if(!!displayInfo && !!displayInfo.editCss) {
                        $p.removeClass(displayInfo.editCss);
                    }
                    this._cleanUp();
                    this._parentEl = null;
                    this._dctx = null;
                    this._options = null;
                    this._app = null;
                    _super.prototype.destroy.call(this);
                };
                BindingContent.prototype.toString = function () {
                    return 'BindingContent';
                };
                Object.defineProperty(BindingContent.prototype, "parentEl", {
                    get: function () {
                        return this._parentEl;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BindingContent.prototype, "target", {
                    get: function () {
                        return this._tgt;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BindingContent.prototype, "isEditing", {
                    get: function () {
                        return this._isEditing;
                    },
                    set: function (v) {
                        if(this._isEditing !== v) {
                            this._isEditing = v;
                            this.update();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BindingContent.prototype, "dataContext", {
                    get: function () {
                        return this._dctx;
                    },
                    set: function (v) {
                        if(this._dctx !== v) {
                            this._dctx = v;
                            this._updateBindingSource();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BindingContent.prototype, "app", {
                    get: function () {
                        return this._app;
                    },
                    enumerable: true,
                    configurable: true
                });
                return BindingContent;
            })(RIAPP.BaseObject);
            baseContent.BindingContent = BindingContent;            
            var TemplateContent = (function (_super) {
                __extends(TemplateContent, _super);
                function TemplateContent(app, parentEl, options, dctx, isEditing) {
                                _super.call(this);
                    var templateInfo = options.templateInfo;
                    this._app = app;
                    this._parentEl = parentEl;
                    this._isEditing = !!isEditing;
                    this._dctx = dctx;
                    this._templateInfo = templateInfo;
                    this._template = null;
                    var $p = RIAPP.global.$(this._parentEl);
                    $p.addClass(baseContent.css.content);
                    this.update();
                }
                TemplateContent.prototype._createTemplate = function () {
                    var inf = this._templateInfo, id = inf.displayID;
                    if(this._isEditing) {
                        if(!!inf.editID) {
                            id = inf.editID;
                        }
                    } else {
                        if(!id) {
                            id = inf.editID;
                        }
                    }
                    if(!id) {
                        throw new Error(RIAPP.ERRS.ERR_TEMPLATE_ID_INVALID);
                    }
                    return new RIAPP.MOD.template.Template(this.app, id);
                };
                TemplateContent.prototype.update = function () {
                    this._cleanUp();
                    var template;
                    if(!!this._templateInfo) {
                        template = this._createTemplate();
                        this._template = template;
                        this._parentEl.appendChild(template.el);
                        template.dataContext = this._dctx;
                    }
                };
                TemplateContent.prototype._cleanUp = function () {
                    if(!!this._template) {
                        this._template.destroy();
                        this._template = null;
                    }
                };
                TemplateContent.prototype.destroy = function () {
                    if(this._isDestroyed) {
                        return;
                    }
                    this._isDestroyCalled = true;
                    var $p = RIAPP.global.$(this._parentEl);
                    $p.removeClass(baseContent.css.content);
                    this._cleanUp();
                    this._parentEl = null;
                    this._dctx = null;
                    this._templateInfo = null;
                    this._app = null;
                    _super.prototype.destroy.call(this);
                };
                TemplateContent.prototype.toString = function () {
                    return 'TemplateContent';
                };
                Object.defineProperty(TemplateContent.prototype, "app", {
                    get: function () {
                        return this._app;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TemplateContent.prototype, "parentEl", {
                    get: function () {
                        return this._parentEl;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TemplateContent.prototype, "template", {
                    get: function () {
                        return this._template;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TemplateContent.prototype, "isEditing", {
                    get: function () {
                        return this._isEditing;
                    },
                    set: function (v) {
                        if(this._isEditing !== v) {
                            this._isEditing = v;
                            this.update();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TemplateContent.prototype, "dataContext", {
                    get: function () {
                        return this._dctx;
                    },
                    set: function (v) {
                        if(this._dctx !== v) {
                            this._dctx = v;
                            if(!!this._template) {
                                this._template.dataContext = this._dctx;
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return TemplateContent;
            })(RIAPP.BaseObject);
            baseContent.TemplateContent = TemplateContent;            
            var BoolContent = (function (_super) {
                __extends(BoolContent, _super);
                function BoolContent() {
                    _super.apply(this, arguments);

                }
                BoolContent.prototype._init = function () {
                    this._createTargetElement();
                    var bindingInfo = this._getBindingInfo();
                    if(!!bindingInfo) {
                        this._updateCss();
                        this._lfScope = new RIAPP.MOD.utils.LifeTimeScope();
                        var options = this._getBindingOption(bindingInfo, this._tgt, this._dctx, 'checked');
                        options.mode = 'TwoWay';
                        this._lfScope.addObj(this.app.bind(options));
                    }
                };
                BoolContent.prototype._createCheckBoxView = function () {
                    var el = RIAPP.global.document.createElement('input');
                    el.setAttribute('type', 'checkbox');
                    var chbxView = new MOD.baseElView.CheckBoxElView(this.app, el, {
                    });
                    return chbxView;
                };
                BoolContent.prototype._createTargetElement = function () {
                    if(!this._tgt) {
                        this._tgt = this._createCheckBoxView();
                        this._el = this._tgt.el;
                    }
                    this._parentEl.appendChild(this._el);
                    return this._el;
                };
                BoolContent.prototype._updateCss = function () {
                    _super.prototype._updateCss.call(this);
                    var el = this._el;
                    if(this._isEditing && this._canBeEdited()) {
                        if(el.disabled) {
                            el.disabled = false;
                        }
                    } else {
                        if(!el.disabled) {
                            el.disabled = true;
                        }
                    }
                };
                BoolContent.prototype.destroy = function () {
                    if(this._isDestroyed) {
                        return;
                    }
                    this._isDestroyCalled = true;
                    if(!!this._lfScope) {
                        this._lfScope.destroy();
                        this._lfScope = null;
                    }
                    if(!!this._tgt) {
                        this._tgt.destroy();
                        this._tgt = null;
                    }
                    _super.prototype.destroy.call(this);
                };
                BoolContent.prototype._cleanUp = function () {
                };
                BoolContent.prototype.update = function () {
                    this._cleanUp();
                    this._updateCss();
                };
                BoolContent.prototype.toString = function () {
                    return 'BoolContent';
                };
                return BoolContent;
            })(BindingContent);
            baseContent.BoolContent = BoolContent;            
            var DateContent = (function (_super) {
                __extends(DateContent, _super);
                function DateContent(app, parentEl, options, dctx, isEditing) {
                                _super.call(this, app, parentEl, options, dctx, isEditing);
                    this._fn_cleanup = null;
                }
                DateContent.prototype._getBindingOption = function (bindingInfo, tgt, dctx, targetPath) {
                    var options = _super.prototype._getBindingOption.call(this, bindingInfo, tgt, dctx, targetPath);
                    options.converter = this.app.getConverter('dateConverter');
                    options.converterParam = RIAPP.global.defaults.dateFormat;
                    return options;
                };
                DateContent.prototype._createTargetElement = function () {
                    var el = _super.prototype._createTargetElement.call(this);
                    if(this.isEditing) {
                        var $el = RIAPP.global.$(el);
                        $el.datepicker();
                        this._fn_cleanup = function () {
                            utils.destroyJQueryPlugin($el, 'datepicker');
                        };
                    }
                    return el;
                };
                DateContent.prototype._cleanUp = function () {
                    if(!!this._fn_cleanup) {
                        this._fn_cleanup();
                        this._fn_cleanup = null;
                    }
                    _super.prototype._cleanUp.call(this);
                };
                DateContent.prototype.toString = function () {
                    return 'DateContent';
                };
                return DateContent;
            })(BindingContent);
            baseContent.DateContent = DateContent;            
            var DateTimeContent = (function (_super) {
                __extends(DateTimeContent, _super);
                function DateTimeContent() {
                    _super.apply(this, arguments);

                }
                DateTimeContent.prototype._getBindingOption = function (bindingInfo, tgt, dctx, targetPath) {
                    var options = _super.prototype._getBindingOption.call(this, bindingInfo, tgt, dctx, targetPath);
                    options.converter = this.app.getConverter('dateTimeConverter');
                    var finf = this.getFieldInfo(), defaults = RIAPP.global.defaults;
                    switch(finf.dataType) {
                        case consts.DATA_TYPE.DateTime:
                            options.converterParam = defaults.dateTimeFormat;
                            break;
                        case consts.DATA_TYPE.Time:
                            options.converterParam = defaults.timeFormat;
                            break;
                        default:
                            options.converterParam = defaults.dateTimeFormat;
                            break;
                    }
                    return options;
                };
                DateTimeContent.prototype.toString = function () {
                    return 'DateTimeContent';
                };
                return DateTimeContent;
            })(BindingContent);
            baseContent.DateTimeContent = DateTimeContent;            
            var NumberContent = (function (_super) {
                __extends(NumberContent, _super);
                function NumberContent() {
                    _super.apply(this, arguments);

                }
                NumberContent.__allowedKeys = null;
                Object.defineProperty(NumberContent.prototype, "_allowedKeys", {
                    get: function () {
                        if(!NumberContent.__allowedKeys) {
                            var KEYS = RIAPP.global.consts.KEYS;
                            NumberContent.__allowedKeys = [
                                0, 
                                KEYS.backspace, 
                                KEYS.del, 
                                KEYS.left, 
                                KEYS.right, 
                                KEYS.end, 
                                KEYS.home, 
                                KEYS.tab, 
                                KEYS.esc, 
                                KEYS.enter
                            ];
                        }
                        return NumberContent.__allowedKeys;
                    },
                    enumerable: true,
                    configurable: true
                });
                NumberContent.prototype._getBindingOption = function (bindingInfo, tgt, dctx, targetPath) {
                    var options = _super.prototype._getBindingOption.call(this, bindingInfo, tgt, dctx, targetPath);
                    var finf = this.getFieldInfo();
                    switch(finf.dataType) {
                        case consts.DATA_TYPE.Integer:
                            options.converter = this.app.getConverter('integerConverter');
                            break;
                        case consts.DATA_TYPE.Decimal:
                            options.converter = this.app.getConverter('decimalConverter');
                            break;
                        default:
                            options.converter = this.app.getConverter('floatConverter');
                            break;
                    }
                    return options;
                };
                NumberContent.prototype.update = function () {
                    _super.prototype.update.call(this);
                    var self = this;
                    if(self._tgt instanceof MOD.baseElView.TextBoxElView) {
                        (self._tgt).addOnKeyPress(function (sender, args) {
                            args.isCancel = !self._previewKeyPress(args.keyCode, args.value);
                        });
                    }
                };
                NumberContent.prototype._previewKeyPress = function (keyCode, value) {
                    if(this._allowedKeys.indexOf(keyCode) > -1) {
                        return true;
                    }
                    if(keyCode === 47)// backslash
                     {
                        return false;
                    }
                    var keys = {
                        32: ' ',
                        44: ',',
                        46: '.'
                    };
                    var ch = keys[keyCode];
                    var defaults = RIAPP.global.defaults;
                    if(ch === defaults.decimalPoint) {
                        if(value.length === 0) {
                            return false;
                        } else {
                            return value.indexOf(ch) < 0;
                        }
                    }
                    if(!!ch && ch !== defaults.thousandSep) {
                        return false;
                    }
                    return !(!ch && (keyCode < 45 || keyCode > 57));
                };
                NumberContent.prototype.toString = function () {
                    return 'NumberContent';
                };
                return NumberContent;
            })(BindingContent);
            baseContent.NumberContent = NumberContent;            
            var StringContent = (function (_super) {
                __extends(StringContent, _super);
                function StringContent() {
                    _super.apply(this, arguments);

                }
                StringContent.__allowedKeys = null;
                Object.defineProperty(StringContent.prototype, "_allowedKeys", {
                    get: function () {
                        if(!StringContent.__allowedKeys) {
                            var KEYS = RIAPP.global.consts.KEYS;
                            StringContent.__allowedKeys = [
                                0, 
                                KEYS.backspace, 
                                KEYS.del, 
                                KEYS.left, 
                                KEYS.right, 
                                KEYS.end, 
                                KEYS.home, 
                                KEYS.tab, 
                                KEYS.esc, 
                                KEYS.enter
                            ];
                        }
                        return StringContent.__allowedKeys;
                    },
                    enumerable: true,
                    configurable: true
                });
                StringContent.prototype.update = function () {
                    _super.prototype.update.call(this);
                    var self = this, fieldInfo = self.getFieldInfo();
                    if(self._tgt instanceof MOD.baseElView.TextBoxElView) {
                        (self._tgt).addOnKeyPress(function (sender, args) {
                            args.isCancel = !self._previewKeyPress(fieldInfo, args.keyCode, args.value);
                        });
                    }
                };
                StringContent.prototype._previewKeyPress = function (fieldInfo, keyCode, value) {
                    return !(fieldInfo.maxLength > 0 && value.length >= fieldInfo.maxLength && this._allowedKeys.indexOf(keyCode) === -1);
                };
                StringContent.prototype.toString = function () {
                    return 'StringContent';
                };
                return StringContent;
            })(BindingContent);
            baseContent.StringContent = StringContent;            
            var MultyLineContent = (function (_super) {
                __extends(MultyLineContent, _super);
                function MultyLineContent(app, parentEl, options, dctx, isEditing) {
                    if(options.name != 'multyline') {
                        throw new Error(utils.format(RIAPP.ERRS.ERR_ASSERTION_FAILED, "options.name == 'multyline'"));
                    }
                                _super.call(this, app, parentEl, options, dctx, isEditing);
                }
                MultyLineContent.__allowedKeys = null;
                Object.defineProperty(MultyLineContent.prototype, "_allowedKeys", {
                    get: function () {
                        if(!MultyLineContent.__allowedKeys) {
                            var KEYS = RIAPP.global.consts.KEYS;
                            MultyLineContent.__allowedKeys = [
                                0, 
                                KEYS.backspace, 
                                KEYS.del, 
                                KEYS.left, 
                                KEYS.right, 
                                KEYS.end, 
                                KEYS.home, 
                                KEYS.tab, 
                                KEYS.esc, 
                                KEYS.enter
                            ];
                        }
                        return MultyLineContent.__allowedKeys;
                    },
                    enumerable: true,
                    configurable: true
                });
                MultyLineContent.prototype._createTargetElement = function () {
                    var tgt;
                    if(this._isEditing && this._canBeEdited()) {
                        tgt = RIAPP.global.document.createElement('textarea');
                    } else {
                        tgt = RIAPP.global.document.createElement('div');
                    }
                    this._updateCss();
                    return tgt;
                };
                MultyLineContent.prototype.update = function () {
                    _super.prototype.update.call(this);
                    var self = this, fieldInfo = self.getFieldInfo();
                    if(self._tgt instanceof MOD.baseElView.TextAreaElView) {
                        (self._tgt).addOnKeyPress(function (sender, args) {
                            args.isCancel = !self._previewKeyPress(fieldInfo, args.keyCode, args.value);
                        });
                        var multylnOpt = this._options.options;
                        var tgt = self._tgt;
                        if(!!multylnOpt) {
                            if(!!multylnOpt.rows) {
                                tgt.rows = multylnOpt.rows;
                            }
                            if(!!multylnOpt.cols) {
                                tgt.cols = multylnOpt.cols;
                            }
                            if(!!multylnOpt.wrap) {
                                tgt.wrap = multylnOpt.wrap;
                            }
                        }
                    }
                };
                MultyLineContent.prototype._previewKeyPress = function (fieldInfo, keyCode, value) {
                    return !(fieldInfo.maxLength > 0 && value.length >= fieldInfo.maxLength && this._allowedKeys.indexOf(keyCode) === -1);
                };
                MultyLineContent.prototype.toString = function () {
                    return 'MultyLineContent';
                };
                return MultyLineContent;
            })(BindingContent);
            baseContent.MultyLineContent = MultyLineContent;            
            //base content factory
            var ContentFactory = (function () {
                function ContentFactory(app, nextFactory) {
                    this._app = app;
                    this._nextFactory = nextFactory;
                }
                ContentFactory.prototype.getContentType = function (options) {
                    if(!!options.templateInfo) {
                        return TemplateContent;
                    }
                    if(!options.bindingInfo) {
                        throw new Error(utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'options', 'bindingInfo'));
                    }
                    var DATA_TYPE = consts.DATA_TYPE, fieldInfo = options.fieldInfo, res;
                    switch(fieldInfo.dataType) {
                        case DATA_TYPE.None:
                            res = BindingContent;
                            break;
                        case DATA_TYPE.String:
                            if(options.name == 'multyline') {
                                res = MultyLineContent;
                            } else {
                                res = StringContent;
                            }
                            break;
                        case DATA_TYPE.Bool:
                            res = BoolContent;
                            break;
                        case DATA_TYPE.Integer:
                            res = NumberContent;
                            break;
                        case DATA_TYPE.Decimal:
                        case DATA_TYPE.Float:
                            res = NumberContent;
                            break;
                        case DATA_TYPE.DateTime:
                        case DATA_TYPE.Time:
                            res = DateTimeContent;
                            break;
                        case DATA_TYPE.Date:
                            res = DateContent;
                            break;
                        case DATA_TYPE.Guid:
                        case DATA_TYPE.Binary:
                            res = BindingContent;
                            break;
                        default:
                            throw new Error(utils.format(RIAPP.ERRS.ERR_FIELD_DATATYPE, fieldInfo.dataType));
                    }
                    if(!res && this._nextFactory) {
                        res = this._nextFactory.getContentType(options);
                    }
                    if(!res) {
                        throw new Error(RIAPP.ERRS.ERR_BINDING_CONTENT_NOT_FOUND);
                    }
                    return res;
                };
                ContentFactory.prototype.createContent = function (parentEl, options, dctx, isEditing) {
                    var contentType = this.getContentType(options);
                    return new contentType(this._app, parentEl, options, dctx, isEditing);
                };
                ContentFactory.prototype.isExternallyCachable = function (contentType) {
                    return !!contentType && !!contentType.addOnObjectCreated && !!contentType.addOnObjectNeeded;
                };
                Object.defineProperty(ContentFactory.prototype, "app", {
                    get: function () {
                        return this._app;
                    },
                    enumerable: true,
                    configurable: true
                });
                return ContentFactory;
            })();
            baseContent.ContentFactory = ContentFactory;            
            //this function (if present) is executed by the application
            //it allows to init resources specific to an application
            function initModule(app) {
                app.registerContentFactory(function (nextFactory) {
                    return new ContentFactory(app, nextFactory);
                });
                return baseContent;
            }
            baseContent.initModule = initModule;
            ;
            RIAPP.global.onModuleLoaded('baseContent', baseContent);
        })(MOD.baseContent || (MOD.baseContent = {}));
        var baseContent = MOD.baseContent;
    })(RIAPP.MOD || (RIAPP.MOD = {}));
    var MOD = RIAPP.MOD;
})(RIAPP || (RIAPP = {}));
//@ sourceMappingURL=baseContent.js.map

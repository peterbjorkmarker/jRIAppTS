var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RIAPP;
(function (RIAPP) {
    (function (MOD) {
        (function (baseElView) {
            //local variables for optimization
                        var utils = RIAPP.global.utils, consts = RIAPP.global.consts;
            var ERRTEXT = RIAPP.localizable.VALIDATE;
            var PropChangedCommand = (function (_super) {
                __extends(PropChangedCommand, _super);
                function PropChangedCommand(fn_action, thisObj, fn_canExecute) {
                                _super.call(this, fn_action, thisObj, fn_canExecute);
                }
                return PropChangedCommand;
            })(RIAPP.MOD.mvvm.Command);
            baseElView.PropChangedCommand = PropChangedCommand;            
            baseElView.css = {
                fieldError: 'ria-field-error',
                errorTip: 'ui-tooltip-red',
                commandLink: 'ria-command-link'
            };
            var BaseElView = (function (_super) {
                __extends(BaseElView, _super);
                function BaseElView(app, el, options) {
                                _super.call(this);
                    this._app = app;
                    this._el = el;
                    this._$el = null;
                    //save previous css display style
                    this._oldDisplay = null;
                    this._objId = 'elv' + utils.getNewID();
                    this._propChangedCommand = null;
                    app._setElView(this._el, this);
                    this._errors = null;
                    this._toolTip = options.tip;
                    this._css = options.css;
                    this._init(options);
                    this._applyToolTip();
                }
                BaseElView.prototype._applyToolTip = function () {
                    if(!!this._toolTip) {
                        this._setToolTip(this.$el, this._toolTip);
                    }
                };
                BaseElView.prototype._init = function (options) {
                    if(!!this._css) {
                        this.$el.addClass(this._css);
                    }
                };
                BaseElView.prototype.destroy = function () {
                    if(this._isDestroyed) {
                        return;
                    }
                    this._isDestroyCalled = true;
                    var $el = this._$el, el = this._el;
                    if(!!$el) {
                        $el.off('.' + this._objId);
                    }
                    try  {
                        this._propChangedCommand = null;
                        this.validationErrors = null;
                        this.toolTip = null;
                        this._el = null;
                        this._$el = null;
                    }finally {
                        this._app._setElView(el, null);
                        this._app = null;
                    }
                    _super.prototype.destroy.call(this);
                };
                BaseElView.prototype.invokePropChanged = function (property) {
                    var self = this, data = {
                        property: property
                    };
                    if(!!self._propChangedCommand) {
                        self._propChangedCommand.execute(self, data);
                    }
                };
                BaseElView.prototype._getErrorTipInfo = function (errors) {
                    var tip = [
                        '<b>', 
                        ERRTEXT.errorInfo, 
                        '</b>', 
                        '<br/>'
                    ];
                    errors.forEach(function (info) {
                        var res = '';
                        info.errors.forEach(function (str) {
                            res = res + ' ' + str;
                        });
                        tip.push(res);
                        res = '';
                    });
                    return tip.join('');
                };
                BaseElView.prototype._setFieldError = function (isError) {
                    var $el = this.$el;
                    if(isError) {
                        $el.addClass(baseElView.css.fieldError);
                    } else {
                        $el.removeClass(baseElView.css.fieldError);
                    }
                };
                BaseElView.prototype._updateErrorUI = function (el, errors) {
                    if(!el) {
                        return;
                    }
                    var $el = this.$el;
                    if(!!errors && errors.length > 0) {
                        utils.addToolTip($el, this._getErrorTipInfo(errors), baseElView.css.errorTip);
                        this._setFieldError(true);
                    } else {
                        this._setToolTip($el, this.toolTip);
                        this._setFieldError(false);
                    }
                };
                BaseElView.prototype._onError = function (error, source) {
                    var isHandled = _super.prototype._onError.call(this, error, source);
                    if(!isHandled) {
                        return RIAPP.global._onError(error, source);
                    }
                    return isHandled;
                };
                BaseElView.prototype._setToolTip = function ($el, tip, className) {
                    utils.addToolTip($el, tip, className);
                };
                BaseElView.prototype.toString = function () {
                    return 'BaseElView';
                };
                Object.defineProperty(BaseElView.prototype, "$el", {
                    get: function () {
                        if(!!this._el && !this._$el) {
                            this._$el = RIAPP.global.$(this._el);
                        }
                        return this._$el;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseElView.prototype, "el", {
                    get: function () {
                        return this._el;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseElView.prototype, "uniqueID", {
                    get: function () {
                        return this._objId;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseElView.prototype, "isVisible", {
                    get: function () {
                        var v = this.el.style.display;
                        return !(v === 'none');
                    },
                    set: function (v) {
                        v = !!v;
                        if(v !== this.isVisible) {
                            if(!v) {
                                this._oldDisplay = this.el.style.display;
                                this.el.style.display = 'none';
                            } else {
                                if(!!this._oldDisplay) {
                                    this.el.style.display = this._oldDisplay;
                                } else {
                                    this.el.style.display = '';
                                }
                            }
                            this.raisePropertyChanged('isVisible');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseElView.prototype, "propChangedCommand", {
                    get: function () {
                        return this._propChangedCommand;
                    },
                    set: function (v) {
                        var old = this._propChangedCommand;
                        if(v !== old) {
                            this._propChangedCommand = v;
                            this.invokePropChanged('*');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseElView.prototype, "validationErrors", {
                    get: function () {
                        return this._errors;
                    },
                    set: function (v) {
                        if(v !== this._errors) {
                            this._errors = v;
                            this.raisePropertyChanged('validationErrors');
                            this._updateErrorUI(this._el, this._errors);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseElView.prototype, "dataNameAttr", {
                    get: function () {
                        return this._el.getAttribute(consts.DATA_ATTR.DATA_NAME);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseElView.prototype, "toolTip", {
                    get: function () {
                        return this._toolTip;
                    },
                    set: function (v) {
                        if(this._toolTip != v) {
                            this._toolTip = v;
                            this._setToolTip(this.$el, v);
                            this.raisePropertyChanged('toolTip');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseElView.prototype, "css", {
                    get: function () {
                        return this._css;
                    },
                    set: function (v) {
                        var $el = this.$el;
                        if(this._css != v) {
                            if(!!this._css) {
                                $el.removeClass(this._css);
                            }
                            this._css = v;
                            if(!!this._css) {
                                $el.addClass(this._css);
                            }
                            this.raisePropertyChanged('css');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseElView.prototype, "app", {
                    get: function () {
                        return this._app;
                    },
                    enumerable: true,
                    configurable: true
                });
                return BaseElView;
            })(RIAPP.BaseObject);
            baseElView.BaseElView = BaseElView;            
            ;
            var InputElView = (function (_super) {
                __extends(InputElView, _super);
                function InputElView(app, el, options) {
                                _super.call(this, app, el, options);
                }
                Object.defineProperty(InputElView.prototype, "isEnabled", {
                    get: function () {
                        return !this.el.disabled;
                    },
                    set: function (v) {
                        v = !!v;
                        if(v !== this.isEnabled) {
                            this.el.disabled = !v;
                            this.raisePropertyChanged('isEnabled');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(InputElView.prototype, "el", {
                    get: function () {
                        return this._el;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(InputElView.prototype, "value", {
                    get: function () {
                        var el = this.el;
                        if(!el) {
                            return '';
                        }
                        return el.value;
                    },
                    set: function (v) {
                        if(!this._el) {
                            return;
                        }
                        var el = this.el;
                        var x = el.value;
                        var str = '' + v;
                        v = (v === null) ? '' : str;
                        if(x !== v) {
                            el.value = v;
                            this.raisePropertyChanged('value');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return InputElView;
            })(BaseElView);
            baseElView.InputElView = InputElView;            
            ;
            var CommandElView = (function (_super) {
                __extends(CommandElView, _super);
                function CommandElView(app, el, options) {
                                _super.call(this, app, el, options);
                    this._command = null;
                    this._commandParam = null;
                    if(!this.isEnabled) {
                        this.$el.addClass('disabled');
                    }
                }
                CommandElView.prototype.destroy = function () {
                    if(this._isDestroyed) {
                        return;
                    }
                    this._isDestroyCalled = true;
                    if(!!this._command) {
                        this._command.removeNSHandlers(this._objId);
                    }
                    this.command = null;
                    this.commandParam = null;
                    _super.prototype.destroy.call(this);
                };
                CommandElView.prototype.invokeCommand = function () {
                    var self = this, command = self.command, param = self.commandParam;
                    if(!!command && command.canExecute(self, param)) {
                        setTimeout(function () {
                            if(command.canExecute(self, param)) {
                                command.execute(self, param);
                            }
                        }, 0);
                    }
                };
                CommandElView.prototype._onCommandChanged = function () {
                    this.raisePropertyChanged('command');
                };
                CommandElView.prototype._setCommand = function (v) {
                    var self = this;
                    if(v !== this._command) {
                        if(!!this._command) {
                            this._command.removeNSHandlers(this._objId);
                        }
                        this._command = v;
                        if(!!this._command) {
                            this._command.addOnCanExecuteChanged(function (cmd, args) {
                                self.isEnabled = cmd.canExecute(self, self.commandParam);
                            }, this._objId);
                            self.isEnabled = this._command.canExecute(self, self.commandParam);
                        } else {
                            self.isEnabled = false;
                        }
                        this._onCommandChanged();
                    }
                };
                CommandElView.prototype.toString = function () {
                    return 'CommandElView';
                };
                Object.defineProperty(CommandElView.prototype, "isEnabled", {
                    get: function () {
                        return !(this.$el.prop('disabled'));
                    },
                    set: function (v) {
                        if(v !== this.isEnabled) {
                            this.$el.prop('disabled', !v);
                            if(!v) {
                                this.$el.addClass('disabled');
                            } else {
                                this.$el.removeClass('disabled');
                            }
                            this.raisePropertyChanged('isEnabled');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CommandElView.prototype, "command", {
                    get: function () {
                        return this._command;
                    },
                    set: function (v) {
                        this._setCommand(v);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CommandElView.prototype, "commandParam", {
                    get: function () {
                        return this._commandParam;
                    },
                    set: function (v) {
                        if(v !== this._commandParam) {
                            this._commandParam = v;
                            this.raisePropertyChanged('commandParam');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return CommandElView;
            })(BaseElView);
            baseElView.CommandElView = CommandElView;            
            ;
            //typed parameters
            var TemplateCommand = (function (_super) {
                __extends(TemplateCommand, _super);
                function TemplateCommand(fn_action, thisObj, fn_canExecute) {
                                _super.call(this, fn_action, thisObj, fn_canExecute);
                }
                return TemplateCommand;
            })(RIAPP.MOD.mvvm.Command);
            baseElView.TemplateCommand = TemplateCommand;            
            var TemplateElView = (function (_super) {
                __extends(TemplateElView, _super);
                function TemplateElView(app, el, options) {
                                _super.call(this, app, el, options);
                    this._template = null;
                    this._isEnabled = true;
                }
                TemplateElView.prototype.templateLoaded = function (template) {
                    var self = this, p = self._commandParam;
                    self._template = template;
                    self._template.isDisabled = !self._isEnabled;
                    self._commandParam = {
                        template: template,
                        isLoaded: true
                    };
                    self.invokeCommand();
                    self._commandParam = p;
                    this.raisePropertyChanged('template');
                };
                TemplateElView.prototype.templateUnloading = function (template) {
                    var self = this, p = self._commandParam;
                    try  {
                        self._commandParam = {
                            template: template,
                            isLoaded: false
                        };
                        self.invokeCommand();
                    }finally {
                        self._commandParam = p;
                        self._template = null;
                    }
                    this.raisePropertyChanged('template');
                };
                TemplateElView.prototype.toString = function () {
                    return 'TemplateElView';
                };
                Object.defineProperty(TemplateElView.prototype, "isEnabled", {
                    get: function () {
                        return this._isEnabled;
                    },
                    set: function (v) {
                        if(this._isEnabled !== v) {
                            this._isEnabled = v;
                            if(!!this._template) {
                                this._template.isDisabled = !this._isEnabled;
                            }
                            this.raisePropertyChanged('isEnabled');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return TemplateElView;
            })(CommandElView);
            baseElView.TemplateElView = TemplateElView;            
            ;
            var BusyElView = (function (_super) {
                __extends(BusyElView, _super);
                function BusyElView(app, el, options) {
                                _super.call(this, app, el, options);
                }
                BusyElView.prototype._init = function (options) {
                    _super.prototype._init.call(this, options);
                    var img;
                    if(!!options.img) {
                        img = options.img;
                    } else {
                        img = consts.LOADER_GIF.NORMAL;
                    }
                    this._delay = 400;
                    this._timeOut = null;
                    if(!utils.check.isNt(options.delay)) {
                        this._delay = parseInt(options.delay);
                    }
                    this._loaderPath = RIAPP.global.getImagePath(img);
                    this._$loader = RIAPP.global.$(new Image());
                    this._$loader.css({
                        position: "absolute",
                        display: "none",
                        zIndex: "10000"
                    });
                    this._$loader.prop('src', this._loaderPath);
                    this._$loader.appendTo(this.el);
                    this._isBusy = false;
                };
                BusyElView.prototype.destroy = function () {
                    if(this._isDestroyed) {
                        return;
                    }
                    this._isDestroyCalled = true;
                    if(!!this._timeOut) {
                        clearTimeout(this._timeOut);
                        this._timeOut = null;
                    }
                    this._$loader.remove();
                    this._$loader = null;
                    _super.prototype.destroy.call(this);
                };
                BusyElView.prototype.toString = function () {
                    return 'BusyElView';
                };
                Object.defineProperty(BusyElView.prototype, "isBusy", {
                    get: function () {
                        return this._isBusy;
                    },
                    set: function (v) {
                        var self = this, fn = function () {
                            self._timeOut = null;
                            self._$loader.show();
                            self._$loader.position({
                                "of": //"my": "right top",
                                //"at": "left bottom",
                                RIAPP.global.$(self.el)
                            });
                        };
                        if(v !== self._isBusy) {
                            self._isBusy = v;
                            if(self._isBusy) {
                                if(!!self._timeOut) {
                                    clearTimeout(self._timeOut);
                                    self._timeOut = null;
                                }
                                if(self._delay > 0) {
                                    self._timeOut = setTimeout(fn, self._delay);
                                } else {
                                    fn();
                                }
                            } else {
                                if(!!self._timeOut) {
                                    clearTimeout(self._timeOut);
                                    self._timeOut = null;
                                } else {
                                    self._$loader.hide();
                                }
                            }
                            self.raisePropertyChanged('isBusy');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BusyElView.prototype, "delay", {
                    get: function () {
                        return this._delay;
                    },
                    set: function (v) {
                        if(v !== this._delay) {
                            this._delay = v;
                            this.raisePropertyChanged('delay');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return BusyElView;
            })(BaseElView);
            baseElView.BusyElView = BusyElView;            
            var DynaContentElView = (function (_super) {
                __extends(DynaContentElView, _super);
                function DynaContentElView(app, el, options) {
                                _super.call(this, app, el, options);
                    this._dataContext = null;
                    this._template = null;
                }
                DynaContentElView.prototype._templateChanged = function () {
                    this.raisePropertyChanged('templateID');
                    if(!this._template) {
                        return;
                    }
                    this.$el.empty().append(this._template.el);
                };
                DynaContentElView.prototype.updateTemplate = function (name) {
                    var self = this;
                    try  {
                        if(!name && !!this._template) {
                            this._template.destroy();
                            this._template = null;
                            self._templateChanged();
                            return;
                        }
                    } catch (ex) {
                        this._onError(ex, this);
                        RIAPP.global._throwDummy(ex);
                    }
                    try  {
                        if(!this._template) {
                            this._template = new RIAPP.MOD.template.Template(this.app, name);
                            this._template.dataContext = this._dataContext;
                            this._template.addOnPropertyChange('templateID', function (s, a) {
                                self._templateChanged();
                            }, this._objId);
                            self._templateChanged();
                            return;
                        }
                        this._template.templateID = name;
                    } catch (ex) {
                        this._onError(ex, this);
                        RIAPP.global._throwDummy(ex);
                    }
                };
                DynaContentElView.prototype.destroy = function () {
                    if(this._isDestroyed) {
                        return;
                    }
                    this._isDestroyCalled = true;
                    if(!!this._template) {
                        this._template.destroy();
                        this._template = null;
                    }
                    this._dataContext = null;
                    _super.prototype.destroy.call(this);
                };
                Object.defineProperty(DynaContentElView.prototype, "templateID", {
                    get: function () {
                        if(!this._template) {
                            return null;
                        }
                        return this._template.templateID;
                    },
                    set: function (v) {
                        this.updateTemplate(v);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DynaContentElView.prototype, "template", {
                    get: function () {
                        return this._template;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DynaContentElView.prototype, "dataContext", {
                    get: function () {
                        return this._dataContext;
                    },
                    set: function (v) {
                        if(this._dataContext !== v) {
                            this._dataContext = v;
                            if(!!this._template) {
                                this._template.dataContext = this._dataContext;
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return DynaContentElView;
            })(BaseElView);
            baseElView.DynaContentElView = DynaContentElView;            
            var CheckBoxElView = (function (_super) {
                __extends(CheckBoxElView, _super);
                function CheckBoxElView() {
                    _super.apply(this, arguments);

                }
                CheckBoxElView.prototype._init = function (options) {
                    var self = this;
                    _super.prototype._init.call(this, options);
                    this._val = this.el.checked;
                    this.$el.on('change.' + this._objId, function (e) {
                        e.stopPropagation();
                        self.checked = this.checked;
                    });
                };
                CheckBoxElView.prototype._setFieldError = function (isError) {
                    var $el = this.$el;
                    if(isError) {
                        var span = RIAPP.global.$('<div></div>').addClass(baseElView.css.fieldError);
                        $el.wrap(span);
                    } else {
                        if($el.parent('.' + baseElView.css.fieldError).length > 0) {
                            $el.unwrap();
                        }
                    }
                };
                CheckBoxElView.prototype.destroy = function () {
                    if(this._isDestroyed) {
                        return;
                    }
                    this._isDestroyCalled = true;
                    this.$el.off('.' + this._objId);
                    _super.prototype.destroy.call(this);
                };
                CheckBoxElView.prototype.toString = function () {
                    return 'CheckBoxElView';
                };
                Object.defineProperty(CheckBoxElView.prototype, "checked", {
                    get: function () {
                        return this._val;
                    },
                    set: function (v) {
                        var el = this.el;
                        if(v !== null) {
                            v = !!v;
                        }
                        if(v !== this._val) {
                            this._val = v;
                            if(el) {
                                el.checked = !!this._val;
                            }
                            if(this._val === null) {
                                this.$el.css("opacity", 0.33);
                            } else {
                                this.$el.css("opacity", 1.0);
                            }
                            this.raisePropertyChanged('checked');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return CheckBoxElView;
            })(InputElView);
            baseElView.CheckBoxElView = CheckBoxElView;            
            var TextBoxElView = (function (_super) {
                __extends(TextBoxElView, _super);
                function TextBoxElView() {
                    _super.apply(this, arguments);

                }
                TextBoxElView.prototype._init = function (options) {
                    var self = this;
                    _super.prototype._init.call(this, options);
                    var $el = this.$el;
                    $el.on('change.' + this._objId, function (e) {
                        e.stopPropagation();
                        self.raisePropertyChanged('value');
                    });
                    $el.on('keypress.' + this._objId, function (e) {
                        e.stopPropagation();
                        var args = {
                            keyCode: e.which,
                            value: e.target.value,
                            isCancel: false
                        };
                        self.raiseEvent('keypress', args);
                        if(args.isCancel) {
                            e.preventDefault();
                        }
                    });
                    if(!!options.updateOnKeyUp) {
                        $el.on('keyup.' + this._objId, function (e) {
                            e.stopPropagation();
                            self.raisePropertyChanged('value');
                        });
                    }
                };
                TextBoxElView.prototype._getEventNames = function () {
                    var base_events = _super.prototype._getEventNames.call(this);
                    return [
                        'keypress'
                    ].concat(base_events);
                };
                TextBoxElView.prototype.addOnKeyPress = function (fn, namespace) {
                    this.addHandler('keypress', fn, namespace);
                };
                TextBoxElView.prototype.removeOnKeyPress = function (namespace) {
                    this.removeHandler('keypress', namespace);
                };
                TextBoxElView.prototype.toString = function () {
                    return 'TextBoxElView';
                };
                Object.defineProperty(TextBoxElView.prototype, "color", {
                    get: function () {
                        var $el = this.$el;
                        return $el.css('color');
                    },
                    set: function (v) {
                        var $el = this.$el;
                        var x = $el.css('color');
                        if(v !== x) {
                            $el.css('color', v);
                            this.raisePropertyChanged('color');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return TextBoxElView;
            })(InputElView);
            baseElView.TextBoxElView = TextBoxElView;            
            var HiddenElView = (function (_super) {
                __extends(HiddenElView, _super);
                function HiddenElView() {
                    _super.apply(this, arguments);

                }
                HiddenElView.prototype.toString = function () {
                    return 'EditableElView';
                };
                return HiddenElView;
            })(InputElView);
            baseElView.HiddenElView = HiddenElView;            
            var TextAreaElView = (function (_super) {
                __extends(TextAreaElView, _super);
                function TextAreaElView(app, el, options) {
                                _super.call(this, app, el, options);
                }
                TextAreaElView.prototype._init = function (options) {
                    _super.prototype._init.call(this, options);
                    var self = this;
                    if(!!options.rows) {
                        this.rows = options.rows;
                    }
                    if(!!options.cols) {
                        this.cols = options.cols;
                    }
                    if(!!options.wrap) {
                        this.wrap = options.wrap;
                    }
                    var $el = this.$el;
                    $el.on('change.' + this._objId, function (e) {
                        e.stopPropagation();
                        self.raisePropertyChanged('value');
                    });
                    $el.on('keypress.' + this._objId, function (e) {
                        e.stopPropagation();
                        var args = {
                            keyCode: e.which,
                            value: e.target.value,
                            isCancel: false
                        };
                        self.raiseEvent('keypress', args);
                        if(args.isCancel) {
                            e.preventDefault();
                        }
                    });
                    if(!!options.updateOnKeyUp) {
                        $el.on('keyup.' + this._objId, function (e) {
                            e.stopPropagation();
                            self.raisePropertyChanged('value');
                        });
                    }
                };
                TextAreaElView.prototype._getEventNames = function () {
                    var base_events = _super.prototype._getEventNames.call(this);
                    return [
                        'keypress'
                    ].concat(base_events);
                };
                TextAreaElView.prototype.addOnKeyPress = function (fn, namespace) {
                    this.addHandler('keypress', fn, namespace);
                };
                TextAreaElView.prototype.removeOnKeyPress = function (namespace) {
                    this.removeHandler('keypress', namespace);
                };
                TextAreaElView.prototype.toString = function () {
                    return 'TextAreaElView';
                };
                Object.defineProperty(TextAreaElView.prototype, "el", {
                    get: function () {
                        return this._el;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TextAreaElView.prototype, "value", {
                    get: function () {
                        var el = this.el;
                        if(!el) {
                            return '';
                        }
                        return el.value;
                    },
                    set: function (v) {
                        if(!this._el) {
                            return;
                        }
                        var el = this.el;
                        var x = el.value;
                        var str = '' + v;
                        v = (v === null) ? '' : str;
                        if(x !== v) {
                            el.value = v;
                            this.raisePropertyChanged('value');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TextAreaElView.prototype, "isEnabled", {
                    get: function () {
                        return !this.el.disabled;
                    },
                    set: function (v) {
                        v = !!v;
                        if(v !== this.isEnabled) {
                            this.el.disabled = !v;
                            this.raisePropertyChanged('isEnabled');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TextAreaElView.prototype, "rows", {
                    get: function () {
                        var el = this.el;
                        if(!el) {
                            return 1;
                        }
                        return el.rows;
                    },
                    set: function (v) {
                        var el = this.el;
                        if(!el) {
                            return;
                        }
                        var x = el.rows;
                        v = (!v) ? 1 : v;
                        if(x !== v) {
                            el.rows = v;
                            this.raisePropertyChanged('rows');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TextAreaElView.prototype, "cols", {
                    get: function () {
                        var el = this.el;
                        if(!el) {
                            return 1;
                        }
                        return el.cols;
                    },
                    set: function (v) {
                        var el = this.el;
                        if(!el) {
                            return;
                        }
                        var x = el.cols;
                        v = (!v) ? 1 : v;
                        if(x !== v) {
                            el.cols = v;
                            this.raisePropertyChanged('cols');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TextAreaElView.prototype, "wrap", {
                    get: function () {
                        var el = this.el;
                        if(!el) {
                            return 'off';
                        }
                        return el.wrap;
                    },
                    set: function (v) {
                        var el = this.el;
                        if(!el) {
                            return;
                        }
                        var x = el.wrap, wraps = [
                            'hard', 
                            'off', 
                            'soft'
                        ];
                        v = (!v) ? 'off' : v;
                        if(wraps.indexOf(v) < 0) {
                            v = 'off';
                        }
                        if(x !== v) {
                            el.wrap = v;
                            this.raisePropertyChanged('wrap');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return TextAreaElView;
            })(BaseElView);
            baseElView.TextAreaElView = TextAreaElView;            
            var RadioElView = (function (_super) {
                __extends(RadioElView, _super);
                function RadioElView() {
                    _super.apply(this, arguments);

                }
                RadioElView.prototype._init = function (options) {
                    var self = this;
                    _super.prototype._init.call(this, options);
                    this._val = this.el.checked;
                    this.$el.on('change.' + this._objId, function (e) {
                        e.stopPropagation();
                        self.checked = this.checked;
                        self._updateGroup();
                    });
                };
                RadioElView.prototype._updateGroup = function () {
                    var groupName = this.el.getAttribute('name'), self = this;
                    if(!groupName) {
                        return;
                    }
                    var parent = this.el.parentElement;
                    if(!parent) {
                        return;
                    }
                    var self = this, cur = self.el;
                    RIAPP.global.$('input[type="radio"][name="' + groupName + '"]', parent).each(function (index, el) {
                        if(cur !== this) {
                            var vw = self.app._getElView(this);
                            if(!!vw) {
                                vw.checked = this.checked;
                            }
                        }
                    });
                };
                RadioElView.prototype._setFieldError = function (isError) {
                    var $el = this.$el;
                    if(isError) {
                        var span = RIAPP.global.$('<div></div>').addClass(baseElView.css.fieldError);
                        $el.wrap(span);
                    } else {
                        if($el.parent('.' + baseElView.css.fieldError).length > 0) {
                            $el.unwrap();
                        }
                    }
                };
                RadioElView.prototype.toString = function () {
                    return 'RadioElView';
                };
                Object.defineProperty(RadioElView.prototype, "checked", {
                    get: function () {
                        return this._val;
                    },
                    set: function (v) {
                        var el = this.el;
                        if(v !== null) {
                            v = !!v;
                        }
                        if(v !== this._val) {
                            this._val = v;
                            if(el) {
                                el.checked = !!this._val;
                            }
                            if(this._val === null) {
                                this.$el.css("opacity", 0.33);
                            } else {
                                this.$el.css("opacity", 1.0);
                            }
                            this.raisePropertyChanged('checked');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RadioElView.prototype, "value", {
                    get: function () {
                        return this.el.value;
                    },
                    set: function (v) {
                        var el = this.el;
                        if(!el) {
                            return;
                        }
                        var strv = '' + v;
                        if(v === null) {
                            strv = '';
                        }
                        if(strv !== el.value) {
                            el.value = strv;
                            this.raisePropertyChanged('value');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RadioElView.prototype, "name", {
                    get: function () {
                        return this.el.name;
                    },
                    enumerable: true,
                    configurable: true
                });
                return RadioElView;
            })(InputElView);
            baseElView.RadioElView = RadioElView;            
            var ButtonElView = (function (_super) {
                __extends(ButtonElView, _super);
                function ButtonElView(app, el, options) {
                    this._preventDefault = false;
                                _super.call(this, app, el, options);
                }
                ButtonElView.prototype._init = function (options) {
                    _super.prototype._init.call(this, options);
                    var self = this, $el = this.$el;
                    if(!!options.preventDefault) {
                        this._preventDefault = true;
                    }
                    $el.on('click.' + this._objId, function (e) {
                        self._onClick(e);
                    });
                };
                ButtonElView.prototype._onClick = function (e) {
                    if(this._preventDefault) {
                        e.preventDefault();
                    }
                    this.invokeCommand();
                };
                ButtonElView.prototype.toString = function () {
                    return 'ButtonElView';
                };
                Object.defineProperty(ButtonElView.prototype, "value", {
                    get: function () {
                        if(!this._el) {
                            return '';
                        }
                        return this.$el.val();
                    },
                    set: function (v) {
                        if(!this._el) {
                            return;
                        }
                        var x = this.$el.val();
                        if(v === null) {
                            v = '';
                        } else {
                            v = '' + v;
                        }
                        if(x !== v) {
                            this.$el.val(v);
                            this.raisePropertyChanged('value');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ButtonElView.prototype, "text", {
                    get: function () {
                        if(!this._el) {
                            return '';
                        }
                        return this.$el.text();
                    },
                    set: function (v) {
                        if(!this._el) {
                            return;
                        }
                        var x = this.$el.text();
                        if(v === null) {
                            v = '';
                        } else {
                            v = '' + v;
                        }
                        if(x !== v) {
                            this.$el.text(v);
                            this.raisePropertyChanged('text');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ButtonElView.prototype, "html", {
                    get: function () {
                        if(!this._el) {
                            return '';
                        }
                        return this.$el.html();
                    },
                    set: function (v) {
                        if(!this._el) {
                            return;
                        }
                        var x = this.$el.html();
                        if(v === null) {
                            v = '';
                        } else {
                            v = '' + v;
                        }
                        if(x !== v) {
                            this.$el.html(v);
                            this.raisePropertyChanged('html');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ButtonElView.prototype, "preventDefault", {
                    get: function () {
                        return this._preventDefault;
                    },
                    set: function (v) {
                        if(this._preventDefault !== v) {
                            this._preventDefault = v;
                            this.raisePropertyChanged('preventDefault');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return ButtonElView;
            })(CommandElView);
            baseElView.ButtonElView = ButtonElView;            
            var AnchorElView = (function (_super) {
                __extends(AnchorElView, _super);
                function AnchorElView(app, el, options) {
                    this._imageSrc = null;
                    this._image = null;
                    this._preventDefault = false;
                                _super.call(this, app, el, options);
                }
                AnchorElView.prototype._init = function (options) {
                    _super.prototype._init.call(this, options);
                    var self = this, $el = this.$el;
                    if(!!options.imageSrc) {
                        this.imageSrc = options.imageSrc;
                    }
                    if(!!options.preventDefault) {
                        this._preventDefault = true;
                    }
                    $el.addClass(baseElView.css.commandLink);
                    $el.on('click.' + this._objId, function (e) {
                        self._onClick(e);
                    });
                };
                AnchorElView.prototype._onClick = function (e) {
                    if(this._preventDefault) {
                        e.preventDefault();
                    }
                    this.invokeCommand();
                };
                AnchorElView.prototype._updateImage = function (src) {
                    var $a = this.$el, $img, self = this;
                    if(this._imageSrc === src) {
                        return;
                    }
                    this._imageSrc = src;
                    if(!!this._image && !src) {
                        RIAPP.global.$(this._image).remove();
                        this._image = null;
                    }
                    if(!!src) {
                        if(!this._image) {
                            self.html = null;
                            $img = RIAPP.global.$(new Image()).attr('src', src).mouseenter(function (e) {
                                if(self.isEnabled) {
                                    RIAPP.global.$(this).css("opacity", 0.5);
                                }
                            }).mouseout(function (e) {
                                if(self.isEnabled) {
                                    RIAPP.global.$(this).css("opacity", 1.0);
                                }
                            }).appendTo($a);
                            this._image = $img.get(0);
                        } else {
                            this._image.src = src;
                        }
                    }
                };
                AnchorElView.prototype.destroy = function () {
                    if(this._isDestroyed) {
                        return;
                    }
                    this._isDestroyCalled = true;
                    this.$el.removeClass(baseElView.css.commandLink);
                    this.imageSrc = null;
                    _super.prototype.destroy.call(this);
                };
                AnchorElView.prototype.toString = function () {
                    return 'AncorButtonElView';
                };
                Object.defineProperty(AnchorElView.prototype, "el", {
                    get: function () {
                        return this._el;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnchorElView.prototype, "imageSrc", {
                    get: function () {
                        return this._imageSrc;
                    },
                    set: function (v) {
                        if(!this._$el) {
                            return;
                        }
                        var x = this._imageSrc;
                        if(x !== v) {
                            this._updateImage(v);
                            this.raisePropertyChanged('imageSrc');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnchorElView.prototype, "html", {
                    get: function () {
                        if(!this._el) {
                            return '';
                        }
                        return this.$el.html();
                    },
                    set: function (v) {
                        if(!this._el) {
                            return;
                        }
                        var x = this.$el.html();
                        if(v === null) {
                            v = '';
                        } else {
                            v = '' + v;
                        }
                        if(x !== v) {
                            this.$el.html(v);
                            this.raisePropertyChanged('html');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnchorElView.prototype, "text", {
                    get: function () {
                        if(!this._el) {
                            return '';
                        }
                        return this.$el.text();
                    },
                    set: function (v) {
                        if(!this._el) {
                            return;
                        }
                        var x = this.$el.text();
                        if(v === null) {
                            v = '';
                        } else {
                            v = '' + v;
                        }
                        if(x !== v) {
                            this.$el.text(v);
                            this.raisePropertyChanged('text');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnchorElView.prototype, "href", {
                    get: function () {
                        if(!this._el) {
                            return '';
                        }
                        return this.el.href;
                    },
                    set: function (v) {
                        if(!this._el) {
                            return;
                        }
                        var x = this.href;
                        if(v === null) {
                            v = '';
                        } else {
                            v = '' + v;
                        }
                        if(x !== v) {
                            this.el.href = v;
                            this.raisePropertyChanged('href');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnchorElView.prototype, "preventDefault", {
                    get: function () {
                        return this._preventDefault;
                    },
                    set: function (v) {
                        if(this._preventDefault !== v) {
                            this._preventDefault = v;
                            this.raisePropertyChanged('preventDefault');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return AnchorElView;
            })(CommandElView);
            baseElView.AnchorElView = AnchorElView;            
            var ExpanderElView = (function (_super) {
                __extends(ExpanderElView, _super);
                function ExpanderElView() {
                    _super.apply(this, arguments);

                }
                ExpanderElView.prototype._init = function (options) {
                    this._expandedsrc = options.expandedsrc || RIAPP.global.getImagePath('collapse.jpg');
                    this._collapsedsrc = options.collapsedsrc || RIAPP.global.getImagePath('expand.jpg');
                    this._isExpanded = !!options.isExpanded;
                    var opts = {
                        imageSrc: this._isExpanded ? this._expandedsrc : this._collapsedsrc
                    };
                    _super.prototype._init.call(this, opts);
                };
                ExpanderElView.prototype.destroy = function () {
                    if(this._isDestroyed) {
                        return;
                    }
                    this._isDestroyCalled = true;
                    this._expandedsrc = null;
                    this._collapsedsrc = null;
                    this._isExpanded = false;
                    _super.prototype.destroy.call(this);
                };
                ExpanderElView.prototype._onCommandChanged = function () {
                    _super.prototype._onCommandChanged.call(this);
                    this.invokeCommand();
                };
                ExpanderElView.prototype._onClick = function (e) {
                    var self = this;
                    self._isExpanded = !self._isExpanded;
                    _super.prototype._onClick.call(this, e);
                };
                ExpanderElView.prototype.invokeCommand = function () {
                    var self = this;
                    self.imageSrc = self._isExpanded ? self._expandedsrc : self._collapsedsrc;
                    _super.prototype.invokeCommand.call(this);
                };
                ExpanderElView.prototype.toString = function () {
                    return 'ExpanderElView';
                };
                Object.defineProperty(ExpanderElView.prototype, "isExpanded", {
                    get: function () {
                        return this._isExpanded;
                    },
                    set: function (v) {
                        if(this._isExpanded !== v) {
                            this._isExpanded = v;
                            this.invokeCommand();
                            this.raisePropertyChanged('isExpanded');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return ExpanderElView;
            })(AnchorElView);
            baseElView.ExpanderElView = ExpanderElView;            
            var SpanElView = (function (_super) {
                __extends(SpanElView, _super);
                function SpanElView() {
                    _super.apply(this, arguments);

                }
                SpanElView.prototype.toString = function () {
                    return 'SpanElView';
                };
                Object.defineProperty(SpanElView.prototype, "text", {
                    get: function () {
                        return this.$el.text();
                    },
                    set: function (v) {
                        var $el = this.$el, x = $el.text();
                        var str = '' + v;
                        v = v === null ? '' : str;
                        if(x !== v) {
                            $el.text(v);
                            this.raisePropertyChanged('text');
                            this.raisePropertyChanged('value');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SpanElView.prototype, "value", {
                    get: function () {
                        return this.text;
                    },
                    set: function (v) {
                        this.text = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SpanElView.prototype, "html", {
                    get: function () {
                        return this.el.innerHTML;
                    },
                    set: function (v) {
                        var x = this.el.innerHTML;
                        var str = '' + v;
                        v = v === null ? '' : str;
                        if(x !== v) {
                            this.el.innerHTML = v;
                            this.raisePropertyChanged('html');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SpanElView.prototype, "color", {
                    get: function () {
                        var $el = this.$el;
                        return $el.css('color');
                    },
                    set: function (v) {
                        var $el = this.$el;
                        var x = $el.css('color');
                        if(v !== x) {
                            $el.css('color', v);
                            this.raisePropertyChanged('color');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SpanElView.prototype, "fontSize", {
                    get: function () {
                        var $el = this.$el;
                        return $el.css('font-size');
                    },
                    set: function (v) {
                        var $el = this.$el;
                        var x = $el.css('font-size');
                        if(v !== x) {
                            $el.css('font-size', v);
                            this.raisePropertyChanged('fontSize');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return SpanElView;
            })(BaseElView);
            baseElView.SpanElView = SpanElView;            
            var BlockElView = (function (_super) {
                __extends(BlockElView, _super);
                function BlockElView() {
                    _super.apply(this, arguments);

                }
                BlockElView.prototype.toString = function () {
                    return 'DivElView';
                };
                Object.defineProperty(BlockElView.prototype, "borderColor", {
                    get: function () {
                        var $el = this.$el;
                        return $el.css('border-top-color');
                    },
                    set: function (v) {
                        var $el = this.$el;
                        var x = $el.css('border-top-color');
                        if(v !== x) {
                            this.el.style.borderColor = v;
                            this.raisePropertyChanged('borderColor');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BlockElView.prototype, "borderStyle", {
                    get: function () {
                        var $el = this.$el;
                        return $el.css('border-top-style');
                    },
                    set: function (v) {
                        var $el = this.$el;
                        var x = $el.css('border-top-style');
                        if(v !== x) {
                            $el.css('border-style', v);
                            this.raisePropertyChanged('borderStyle');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BlockElView.prototype, "width", {
                    get: function () {
                        var $el = this.$el;
                        return $el.width();
                    },
                    set: function (v) {
                        var $el = this.$el;
                        var x = $el.width();
                        if(v !== x) {
                            $el.width(v);
                            this.raisePropertyChanged('width');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BlockElView.prototype, "height", {
                    get: function () {
                        var $el = this.$el;
                        return $el.height();
                    },
                    set: function (v) {
                        var $el = this.$el;
                        var x = $el.height();
                        if(v !== x) {
                            $el.height(v);
                            this.raisePropertyChanged('height');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return BlockElView;
            })(SpanElView);
            baseElView.BlockElView = BlockElView;            
            var ImgElView = (function (_super) {
                __extends(ImgElView, _super);
                function ImgElView(app, el, options) {
                                _super.call(this, app, el, options);
                }
                ImgElView.prototype.toString = function () {
                    return 'ImgElView';
                };
                Object.defineProperty(ImgElView.prototype, "el", {
                    get: function () {
                        return this._el;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ImgElView.prototype, "src", {
                    get: function () {
                        return this.el.src;
                    },
                    set: function (v) {
                        var x = this.el.src;
                        if(x !== v) {
                            this.el.src = v;
                            this.raisePropertyChanged('src');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return ImgElView;
            })(BaseElView);
            baseElView.ImgElView = ImgElView;            
            var TabsElView = (function (_super) {
                __extends(TabsElView, _super);
                function TabsElView() {
                    _super.apply(this, arguments);

                }
                TabsElView.prototype._init = function (options) {
                    _super.prototype._init.call(this, options);
                    this._tabsEventCommand = null;
                    this._tabOpts = options;
                    this._createTabs();
                };
                TabsElView.prototype._createTabs = function () {
                    var $el = this.$el, self = this, tabOpts = {
                        select: function (e, tab) {
                            self.invokeTabsEvent("select", tab);
                        },
                        show: function (e, tab) {
                            self.invokeTabsEvent("show", tab);
                        },
                        disable: function (e, tab) {
                            self.invokeTabsEvent("disable", tab);
                        },
                        enable: function (e, tab) {
                            self.invokeTabsEvent("enable", tab);
                        },
                        add: function (e, tab) {
                            self.invokeTabsEvent("add", tab);
                        },
                        remove: function (e, tab) {
                            self.invokeTabsEvent("remove", tab);
                        },
                        load: function (e, tab) {
                            self.invokeTabsEvent("load", tab);
                        }
                    };
                    tabOpts = utils.extend(false, tabOpts, self._tabOpts);
                    ($el).tabs(tabOpts);
                };
                TabsElView.prototype._destroyTabs = function () {
                    var $el = this.$el;
                    utils.destroyJQueryPlugin($el, 'tabs');
                };
                TabsElView.prototype.invokeTabsEvent = function (eventName, args) {
                    var self = this, data = {
                        eventName: eventName,
                        args: args
                    };
                    if(!!self._tabsEventCommand) {
                        self._tabsEventCommand.execute(self, data);
                    }
                };
                TabsElView.prototype.destroy = function () {
                    if(this._isDestroyed) {
                        return;
                    }
                    this._isDestroyCalled = true;
                    this._tabsEventCommand = null;
                    this._destroyTabs();
                    _super.prototype.destroy.call(this);
                };
                TabsElView.prototype.toString = function () {
                    return 'TabsElView';
                };
                Object.defineProperty(TabsElView.prototype, "tabsEventCommand", {
                    get: function () {
                        return this._tabsEventCommand;
                    },
                    set: function (v) {
                        var old = this._tabsEventCommand;
                        if(v !== old) {
                            if(!!old) {
                                this._destroyTabs();
                            }
                            this._tabsEventCommand = v;
                            if(!!this._tabsEventCommand) {
                                this._createTabs();
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return TabsElView;
            })(BaseElView);
            baseElView.TabsElView = TabsElView;            
            RIAPP.global.registerType('BaseElView', BaseElView);
            RIAPP.global.registerType('InputElView', InputElView);
            RIAPP.global.registerType('CommandElView', CommandElView);
            RIAPP.global.registerType('TemplateElView', TemplateElView);
            RIAPP.global.registerElView('template', TemplateElView);
            RIAPP.global.registerType('BusyElView', BusyElView);
            RIAPP.global.registerElView('busy_indicator', BusyElView);
            RIAPP.global.registerType('DynaContentElView', DynaContentElView);
            RIAPP.global.registerElView(RIAPP.global.consts.ELVIEW_NM.DYNACONT, DynaContentElView);
            RIAPP.global.registerType('CheckBoxElView', CheckBoxElView);
            RIAPP.global.registerElView('input:checkbox', CheckBoxElView);
            RIAPP.global.registerType('TextBoxElView', TextBoxElView);
            RIAPP.global.registerElView('input:text', TextBoxElView);
            RIAPP.global.registerType('HiddenElView', HiddenElView);
            RIAPP.global.registerElView('input:hidden', HiddenElView);
            RIAPP.global.registerType('TextAreaElView', TextAreaElView);
            RIAPP.global.registerElView('textarea', TextAreaElView);
            RIAPP.global.registerType('RadioElView', RadioElView);
            RIAPP.global.registerElView('input:radio', RadioElView);
            RIAPP.global.registerType('ButtonElView', ButtonElView);
            RIAPP.global.registerElView('input:button', ButtonElView);
            RIAPP.global.registerElView('input:submit', ButtonElView);
            RIAPP.global.registerElView('button', ButtonElView);
            RIAPP.global.registerType('AnchorElView', AnchorElView);
            RIAPP.global.registerElView('a', AnchorElView);
            RIAPP.global.registerElView('abutton', AnchorElView);
            RIAPP.global.registerType('ExpanderElView', ExpanderElView);
            RIAPP.global.registerElView('expander', ExpanderElView);
            RIAPP.global.registerType('SpanElView', SpanElView);
            RIAPP.global.registerElView('span', SpanElView);
            RIAPP.global.registerType('BlockElView', BlockElView);
            RIAPP.global.registerElView('div', BlockElView);
            RIAPP.global.registerElView('section', BlockElView);
            RIAPP.global.registerElView('block', BlockElView);
            RIAPP.global.registerType('ImgElView', ImgElView);
            RIAPP.global.registerElView('img', ImgElView);
            RIAPP.global.registerType('TabsElView', TabsElView);
            RIAPP.global.registerElView('tabs', TabsElView);
            //signals to the global object that the module is loaded
            RIAPP.global.onModuleLoaded('baseElView', baseElView);
        })(MOD.baseElView || (MOD.baseElView = {}));
        var baseElView = MOD.baseElView;
    })(RIAPP.MOD || (RIAPP.MOD = {}));
    var MOD = RIAPP.MOD;
})(RIAPP || (RIAPP = {}));
//@ sourceMappingURL=baseElView.js.map

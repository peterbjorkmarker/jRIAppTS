module RIAPP {
    export module MOD {
        export module baseElView {
           //local variables for optimization
            var utils = global.utils, consts = global.consts;
            var ERRTEXT = RIAPP.localizable.VALIDATE;

            export class PropChangedCommand extends MOD.mvvm.Command {
                constructor(fn_action: (sender:any, param: { property: string; }) => void , thisObj, fn_canExecute: (sender: any, param: { property: string; }) => boolean) {
                    super(fn_action, thisObj, fn_canExecute);
                }
            }

            export var css = {
                fieldError: 'ria-field-error',
                errorTip: 'ui-tooltip-red',
                commandLink: 'ria-command-link'
            };

            export interface IViewOptions {
                css?: string;
                tip?: string;
            }

            export interface IViewType {
                new (app: Application, el: HTMLElement, options: IViewOptions): BaseElView;
            }

            export class BaseElView extends BaseObject{
                _el: HTMLElement;
                _$el: JQuery;
                _oldDisplay: string;
                _objId: string;
                _propChangedCommand: MOD.mvvm.ICommand;
                _errors: MOD.binding.IValidationInfo[];
                _toolTip: string;
                _css: string;
                _app: Application;

                constructor(app:Application, el: HTMLElement, options: IViewOptions) {
                    super();
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
                _applyToolTip() {
                    if (!!this._toolTip) {
                        this._setToolTip(this.$el, this._toolTip);
                    }
                }
                _init(options: IViewOptions) {
                    if (!!this._css) {
                        this.$el.addClass(this._css);
                    }
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    var $el = this._$el, el = this._el;
                    if (!!$el)
                        $el.off('.' + this._objId);
                    try {
                        this._propChangedCommand = null;
                        this.validationErrors = null;
                        this.toolTip = null;
                        this._el = null;
                        this._$el = null;
                    }
                    finally {
                        this._app._setElView(el, null);
                        this._app = null;
                    }
                    super.destroy();
                }
                invokePropChanged(property:string) {
                    var self = this, data = { property: property };
                    if (!!self._propChangedCommand) {
                        self._propChangedCommand.execute(self, data);
                    }
                }
                _getErrorTipInfo(errors: MOD.binding.IValidationInfo[]) {
                    var tip = ['<b>', ERRTEXT.errorInfo, '</b>', '<br/>'];
                    errors.forEach(function (info) {
                        var res = '';
                        info.errors.forEach(function (str) {
                            res = res + ' ' + str;
                        });
                        tip.push(res);
                        res = '';
                    });
                    return tip.join('');
                }
                _setFieldError(isError:boolean) {
                    var $el = this.$el;
                    if (isError) {
                        $el.addClass(css.fieldError);
                    }
                    else {
                        $el.removeClass(css.fieldError);
                    }
                }
                _updateErrorUI(el: HTMLElement, errors: MOD.binding.IValidationInfo[]) {
                    if (!el) {
                        return;
                    }
                    var $el = this.$el;
                    if (!!errors && errors.length > 0) {
                        utils.addToolTip($el, this._getErrorTipInfo(errors), css.errorTip);
                        this._setFieldError(true);
                    }
                    else {
                        this._setToolTip($el, this.toolTip);
                        this._setFieldError(false);
                    }
                }
                _onError(error, source):boolean {
                    var isHandled = super._onError(error, source);
                    if (!isHandled) {
                        return global._onError(error, source);
                    }
                    return isHandled;
                }
                _setToolTip($el:JQuery, tip:string, className?:string) {
                    utils.addToolTip($el, tip, className);
                }
                toString() {
                    return 'BaseElView';
                }
                get $el() {
                    if (!!this._el && !this._$el)
                        this._$el = global.$(this._el);
                    return this._$el;
                }
                get el() { return this._el; }
                get uniqueID() { return this._objId; }
                get isVisible() {
                    var v = this.el.style.display;
                    return !(v === 'none');
                }
                set isVisible(v) {
                    v = !!v;
                    if (v !== this.isVisible) {
                        if (!v) {
                            this._oldDisplay = this.el.style.display;
                            this.el.style.display = 'none';
                        }
                        else {
                            if (!!this._oldDisplay)
                                this.el.style.display = this._oldDisplay;
                            else
                                this.el.style.display = '';
                        }
                        this.raisePropertyChanged('isVisible');
                    }
                }
                get propChangedCommand() { return this._propChangedCommand; }
                set propChangedCommand(v: MOD.mvvm.ICommand) {
                    var old = this._propChangedCommand;
                    if (v !== old) {
                        this._propChangedCommand = v;
                        this.invokePropChanged('*');
                    }
                }
                get validationErrors() { return this._errors; }
                set validationErrors(v: MOD.binding.IValidationInfo[]) {
                    if (v !== this._errors) {
                        this._errors = v;
                        this.raisePropertyChanged('validationErrors');
                        this._updateErrorUI(this._el, this._errors);
                    }
                }
                get dataNameAttr() { return this._el.getAttribute(consts.DATA_ATTR.DATA_NAME); }
                get toolTip() { return this._toolTip; }
                set toolTip(v:string) {
                    if (this._toolTip != v) {
                        this._toolTip = v;
                        this._setToolTip(this.$el, v);
                        this.raisePropertyChanged('toolTip');
                    }
                }
                get css() { return this._css; }
                set css(v:string) {
                    var $el = this.$el;
                    if (this._css != v) {
                        if (!!this._css)
                            $el.removeClass(this._css);
                        this._css = v;
                        if (!!this._css)
                            $el.addClass(this._css);
                        this.raisePropertyChanged('css');
                    }
                }
                get app() { return this._app; }
            };

            export class InputElView extends BaseElView {
                constructor(app: Application, el: HTMLInputElement, options: IViewOptions) {
                    super(app, el, options);
                }
                get isEnabled() { return !this.el.disabled; }
                set isEnabled(v:boolean) {
                    v = !!v;
                    if (v !== this.isEnabled) {
                        this.el.disabled = !v;
                        this.raisePropertyChanged('isEnabled');
                    }
                }
                get el() { return <HTMLInputElement>this._el; }
                get value() {
                    var el = this.el;
                    if (!el)
                        return '';
                    return el.value;
                }
                set value(v) {
                    if (!this._el)
                        return;
                    var el = this.el;
                    var x = el.value;
                    var str = '' + v;
                    v = (v === null) ? '' : str;
                    if (x !== v) {
                        el.value = v;
                        this.raisePropertyChanged('value');
                    }
                }
            };

            export class CommandElView extends BaseElView {
                _command: MOD.mvvm.Command;
                _commandParam: any;
                constructor(app: Application, el: HTMLElement, options: IViewOptions) {
                    super(app, el, options);
                    this._command = null;
                    this._commandParam = null;
                    if (!this.isEnabled) {
                        this.$el.addClass('disabled');
                    }
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._command) {
                        this._command.removeNSHandlers(this._objId);
                    }
                    this.command = null;
                    this.commandParam = null;
                    super.destroy();
                }
                invokeCommand() {
                    var self = this, command = self.command, param = self.commandParam;
                    if (!!command && command.canExecute(self, param)) {
                        setTimeout(function () {
                            if (command.canExecute(self, param))
                                command.execute(self, param);
                        }, 0);
                    }
                }
                _onCommandChanged() {
                    this.raisePropertyChanged('command');
                }
                _setCommand(v: MOD.mvvm.Command) {
                    var self = this;
                    if (v !== this._command) {
                        if (!!this._command) {
                            this._command.removeNSHandlers(this._objId);
                        }
                        this._command = v;
                        if (!!this._command) {
                            this._command.addOnCanExecuteChanged(function (cmd, args) {
                                self.isEnabled = cmd.canExecute(self, self.commandParam);
                            }, this._objId);
                            self.isEnabled = this._command.canExecute(self, self.commandParam);
                        }
                        else
                            self.isEnabled = false;
                        this._onCommandChanged();
                    }
                }
                toString() {
                    return 'CommandElView';
                }
                get isEnabled() { return !(this.$el.prop('disabled')); }
                set isEnabled(v:boolean) {
                    if (v !== this.isEnabled) {
                        this.$el.prop('disabled', !v);
                        if (!v)
                            this.$el.addClass('disabled');
                        else
                            this.$el.removeClass('disabled');
                        this.raisePropertyChanged('isEnabled');
                    }
                }
                get command() { return this._command; }
                set command(v: MOD.mvvm.Command) { this._setCommand(v); }
                get commandParam() { return this._commandParam; }
                set commandParam(v) {
                    if (v !== this._commandParam) {
                        this._commandParam = v;
                        this.raisePropertyChanged('commandParam');
                    }
                }
            };

            //typed parameters
            export class TemplateCommand extends MOD.mvvm.Command {
                constructor(fn_action: (sender: TemplateElView, param: { template: template.Template; isLoaded: boolean; }) => void , thisObj, fn_canExecute: (sender: TemplateElView, param: { template: template.Template; isLoaded: boolean; }) => boolean) {
                    super(fn_action, thisObj, fn_canExecute);
                }
            }

            export class TemplateElView extends CommandElView {
                _template: MOD.template.Template;
                _isEnabled: boolean;
                constructor(app: Application, el: HTMLElement, options: IViewOptions) {
                    this._template = null;
                    this._isEnabled = true;
                    super(app, el, options);
                }
                templateLoaded(template: MOD.template.Template) {
                    var self = this, p = self._commandParam;
                    self._template = template;
                    self._template.isDisabled = !self._isEnabled;
                    self._commandParam = { template: template, isLoaded: true };
                    self.invokeCommand();
                    self._commandParam = p;
                    this.raisePropertyChanged('template');
                }
                templateUnloading(template:MOD.template.Template) {
                    var self = this, p = self._commandParam;
                    try {
                        self._commandParam = { template: template, isLoaded: false };
                        self.invokeCommand();
                    }
                    finally {
                        self._commandParam = p;
                        self._template = null;
                    }
                    this.raisePropertyChanged('template');
                }
                toString() {
                    return 'TemplateElView';
                }
                get isEnabled() { return this._isEnabled; }
                set isEnabled(v:boolean) {
                    if (this._isEnabled !== v) {
                        this._isEnabled = v;
                        if (!!this._template) {
                            this._template.isDisabled = !this._isEnabled;
                        }
                        this.raisePropertyChanged('isEnabled');
                    }
                }
            };

            export class BusyElView extends BaseElView {
                _delay: number;
                _timeOut: number;
                _loaderPath: string;
                _$loader: any;
                _isBusy: boolean;
                constructor(app: Application, el: HTMLElement, options: IViewOptions) {
                    super(app, el, options);
                }
                _init(options) {
                    super._init(options);
                    var img;
                    if (!!options.img)
                        img = options.img;
                    else
                        img = consts.LOADER_GIF.NORMAL;
                    this._delay = 400;
                    this._timeOut = null;
                    if (!utils.check.isNt(options.delay))
                        this._delay = parseInt(options.delay);
                    this._loaderPath = global.getImagePath(img);
                    this._$loader = global.$(new Image());
                    this._$loader.css({ position: "absolute", display: "none", zIndex: "10000" });
                    this._$loader.prop('src', this._loaderPath);
                    this._$loader.appendTo(this.el);
                    this._isBusy = false;
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._timeOut) {
                        clearTimeout(this._timeOut);
                        this._timeOut = null;
                    }
                    this._$loader.remove();
                    this._$loader = null;
                    super.destroy();
                }
                toString() {
                    return 'BusyElView';
                }
                get isBusy() { return this._isBusy; }
                set isBusy(v) {
                    var self = this, fn = function () {
                        self._timeOut = null;
                        self._$loader.show();
                        self._$loader.position({
                            //"my": "right top",
                            //"at": "left bottom",
                            "of": global.$(self.el)
                        });
                    };

                    if (v !== self._isBusy) {
                        self._isBusy = v;
                        if (self._isBusy) {
                            if (!!self._timeOut) {
                                clearTimeout(self._timeOut);
                                self._timeOut = null;
                            }
                            if (self._delay > 0) {
                                self._timeOut = setTimeout(fn, self._delay);
                            }
                            else
                                fn();
                        }
                        else {
                            if (!!self._timeOut) {
                                clearTimeout(self._timeOut);
                                self._timeOut = null;
                            }
                            else
                                self._$loader.hide();
                        }
                        self.raisePropertyChanged('isBusy');
                    }
                }
                get delay() { return this._delay; }
                set delay(v) {
                    if (v !== this._delay) {
                        this._delay = v;
                        this.raisePropertyChanged('delay');
                    }
                }
            }

            export class DynaContentElView extends BaseElView {
                _dataContext: any;
                _template: MOD.template.Template;
                constructor(app: Application, el: HTMLElement, options: IViewOptions) {
                    super(app, el, options);
                    this._dataContext = null;
                    this._template = null;
                }
                _templateChanged() {
                    this.raisePropertyChanged('templateID');
                    if (!this._template)
                        return;
                    this.$el.empty().append(this._template.el);
                }
                updateTemplate(name:string) {
                    var self = this;
                    try {
                        if (!name && !!this._template) {
                            this._template.destroy();
                            this._template = null;
                            self._templateChanged();
                            return;
                        }
                    } catch (ex) {
                        this._onError(ex, this);
                        global._throwDummy(ex);
                    }

                    try {
                        if (!this._template) {
                            this._template = new MOD.template.Template(this.app, name);
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
                        global._throwDummy(ex);
                    }
                }
                destroy() {
                    if (this._isDestroyed)
                        return
                    this._isDestroyCalled = true;
                    if (!!this._template) {
                        this._template.destroy();
                        this._template = null;
                    }
                    this._dataContext = null;
                    super.destroy();
                }
                get templateID() {
                    if (!this._template)
                        return null;
                    return this._template.templateID;
                }
                set templateID(v:string) { this.updateTemplate(v); }
                get template() { return this._template; }
                get dataContext() { return this._dataContext; }
                set dataContext(v) {
                    if (this._dataContext !== v) {
                        this._dataContext = v;
                        if (!!this._template)
                            this._template.dataContext = this._dataContext;
                    }
                }
            }

            export class CheckBoxElView extends InputElView {
                _val: boolean;
                _init(options: IViewOptions) {
                    var self = this;
                    super._init(options);
                    this._val = this.el.checked;
                    this.$el.on('change.' + this._objId, function (e) {
                        e.stopPropagation();
                        self.checked = this.checked;
                    });
                }
                _setFieldError(isError:boolean) {
                    var $el = this.$el;
                    if (isError) {
                        var span = global.$('<div></div>').addClass(css.fieldError);
                        $el.wrap(span);
                    }
                    else {
                        if ($el.parent('.' + css.fieldError).length > 0)
                            $el.unwrap();
                    }
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this.$el.off('.' + this._objId);
                    super.destroy();
                }
                toString() {
                    return 'CheckBoxElView';
                }
                get checked() { return this._val; }
                set checked(v) {
                    var el = this.el;
                    if (v !== null)
                        v = !!v;
                    if (v !== this._val) {
                        this._val = v;
                        if (el)
                            el.checked = !!this._val;

                        if (this._val === null) {
                            this.$el.css("opacity", 0.33);
                        }
                        else
                            this.$el.css("opacity", 1.0);
                        this.raisePropertyChanged('checked');
                    }
                }
            }

            export class CheckBoxThreeStateElView extends InputElView {
                _val: boolean;
                _cbxVal: number;
                _init(options: IViewOptions) {
                    var self = this;
                    super._init(options);
                    this._val = this.el.checked;
                    this._cbxVal = this._val == null ? 1 : (!!this._val ? 2 : 0);
                    var $el = this.$el;
                    $el.on('change.' + this._objId, function (e) {
                        e.stopPropagation();
                        switch (self._cbxVal) {
                            // unchecked, going indeterminate
                            case 0:
                                self._cbxVal = 1;
                                break;
                            // indeterminate, going checked
                            case 1:
                                self._cbxVal = 2;
                                break;
                            // checked, going unchecked
                            default:
                                self._cbxVal = 0;
                        
                        }
                        self.checked = (self._cbxVal == 1) ? null : ((self._cbxVal == 2) ? true : false);
                    });
                }
                _setFieldError(isError: boolean) {
                    var $el = this.$el;
                    if (isError) {
                        var span = global.$('<div></div>').addClass(css.fieldError);
                        $el.wrap(span);
                    }
                    else {
                        if ($el.parent('.' + css.fieldError).length > 0)
                            $el.unwrap();
                    }
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this.$el.off('.' + this._objId);
                    super.destroy();
                }
                toString() {
                    return 'CheckBoxThreeStateElView';
                }
                get checked() { return this._val; }
                set checked(v) {
                    var $el= this.$el;
                    if (v !== this._val) {
                        this._val = v;
                        switch (this._val) {
                            case null:
                                $el.prop('indeterminate', true);
                                this._cbxVal = 1;
                                break;
                            case true:
                                $el.prop('indeterminate', false);
                                $el.prop('checked', true);
                                this._cbxVal = 2;
                                break;
                           default:
                                $el.prop('indeterminate', false);
                                $el.prop('checked', false);
                                this._cbxVal = 0;
                        }
                        this.raisePropertyChanged('checked');
                    }
                }
            }

            export interface ITextBoxOptions extends IViewOptions {
                updateOnKeyUp?: boolean;
            }

            export class TextBoxElView extends InputElView {
                _init(options:ITextBoxOptions) {
                    var self = this;
                    super._init(options);
                    var $el =  this.$el;
                    $el.on('change.' + this._objId, function (e) {
                        e.stopPropagation();
                        self.raisePropertyChanged('value');
                    });
                    $el.on('keypress.' + this._objId, function (e) {
                        e.stopPropagation();
                        var args = { keyCode: e.which, value: (<any>e.target).value, isCancel: false };
                        self.raiseEvent('keypress', args);
                        if (args.isCancel)
                            e.preventDefault();
                    });
                    if (!!options.updateOnKeyUp) {
                        $el.on('keyup.' + this._objId, function (e) {
                            e.stopPropagation();
                            self.raisePropertyChanged('value');
                        });
                    }
                }
                _getEventNames() {
                    var base_events = super._getEventNames();
                    return ['keypress'].concat(base_events);
                }
                addOnKeyPress(fn: (sender: TextBoxElView, args: { keyCode: number; value: string; isCancel: boolean; }) => void , namespace?: string) {
                    this.addHandler('keypress', fn, namespace);
                }
                removeOnKeyPress(namespace?: string) {
                    this.removeHandler('keypress', namespace);
                }
                toString() {
                    return 'TextBoxElView';
                }
                get color() {
                    var $el = this.$el;
                    return $el.css('color');
                }
                set color(v) {
                    var $el = this.$el;
                    var x = $el.css('color');
                    if (v !== x) {
                        $el.css('color', v);
                        this.raisePropertyChanged('color');
                    }
                }
            }

            export class HiddenElView extends InputElView {
                toString() {
                    return 'EditableElView';
                }
            }

            export interface ITextAreaOptions extends ITextBoxOptions {
                rows?: number;
                cols?: number;
                wrap?: string;
            }

            export class TextAreaElView extends BaseElView {
                constructor(app: Application, el: HTMLTextAreaElement, options: ITextAreaOptions) {
                    super(app, el, options);
                }
                _init(options: ITextAreaOptions) {
                    super._init(options);
                    var self = this;
                    if (!!options.rows) {
                        this.rows = options.rows;
                    }
                    if (!!options.cols) {
                        this.cols = options.cols;
                    }
                    if (!!options.wrap) {
                        this.wrap = options.wrap;
                    }
                    var $el = this.$el;
                    $el.on('change.' + this._objId, function (e) {
                        e.stopPropagation();
                        self.raisePropertyChanged('value');
                    });
                    $el.on('keypress.' + this._objId, function (e) {
                        e.stopPropagation();
                        var args = { keyCode: e.which, value: (<any>e.target).value, isCancel: false };
                        self.raiseEvent('keypress', args);
                        if (args.isCancel)
                            e.preventDefault();
                    });
                    if (!!options.updateOnKeyUp) {
                        $el.on('keyup.' + this._objId, function (e) {
                            e.stopPropagation();
                            self.raisePropertyChanged('value');
                        });
                    }
                }
                _getEventNames() {
                    var base_events = super._getEventNames();
                    return ['keypress'].concat(base_events);
                }
                addOnKeyPress(fn: (sender: TextAreaElView, args: { keyCode: number; value: string; isCancel: boolean; }) => void , namespace?: string) {
                    this.addHandler('keypress', fn, namespace);
                }
                removeOnKeyPress(namespace?: string) {
                    this.removeHandler('keypress', namespace);
                }
                toString() {
                    return 'TextAreaElView';
                }
                get el() { return <HTMLTextAreaElement>this._el; }
                get value() {
                    var el = this.el;
                    if (!el)
                        return '';
                    return el.value;
                }
                set value(v) {
                    if (!this._el)
                        return;
                    var el = this.el;
                    var x = el.value;
                    var str = '' + v;
                    v = (v === null) ? '' : str;
                    if (x !== v) {
                        el.value = v;
                        this.raisePropertyChanged('value');
                    }
                }
                get isEnabled() { return !this.el.disabled; }
                set isEnabled(v: boolean) {
                    v = !!v;
                    if (v !== this.isEnabled) {
                        this.el.disabled = !v;
                        this.raisePropertyChanged('isEnabled');
                    }
                }
                get rows() {
                    var el = this.el;
                    if (!el)
                        return 1;
                    return el.rows;
                }
                set rows(v) {
                    var el = this.el;
                    if (!el)
                        return;
                    var x = el.rows;
                    v = (!v) ? 1 : v;
                    if (x !== v) {
                        el.rows = v;
                        this.raisePropertyChanged('rows');
                    }
                }
                get cols() {
                    var el = this.el;
                    if (!el)
                        return 1;
                    return el.cols;
                }
                set cols(v) {
                    var el = this.el;
                    if (!el)
                        return;
                    var x = el.cols;
                    v = (!v) ? 1 : v;
                    if (x !== v) {
                        el.cols = v;
                        this.raisePropertyChanged('cols');
                    }
                }
                get wrap() {
                    var el = this.el;
                    if (!el)
                        return 'off';
                    return el.wrap;
                }
                set wrap(v) {
                    var el = this.el;
                    if (!el)
                        return;
                    var x = el.wrap, wraps = ['hard', 'off', 'soft'];
                    v = (!v) ? 'off' : v;
                    if (wraps.indexOf(v) < 0)
                        v = 'off';
                    if (x !== v) {
                        el.wrap = v;
                        this.raisePropertyChanged('wrap');
                    }
                }
            }

            export class RadioElView extends InputElView {
                _val: boolean;
                _init(options: IViewOptions) {
                    var self = this;
                    super._init(options);
                    this._val = this.el.checked;
                    this.$el.on('change.' + this._objId, function (e) {
                        e.stopPropagation();
                        self.checked = this.checked;
                        self._updateGroup();
                    });
                }
                _updateGroup() {
                    var groupName = this.el.getAttribute('name'), self = this;
                    if (!groupName)
                        return;
                    var parent = this.el.parentElement;
                    if (!parent)
                        return;
                    var self = this, cur = self.el;
                    global.$('input[type="radio"][name="' + groupName + '"]', parent).each(function (index, el) {
                        if (cur !== this) {
                            var vw = <RadioElView>self.app._getElView(this);
                            if (!!vw) {
                                vw.checked = this.checked;
                            }
                        }
                    });
                }
                _setFieldError(isError:boolean) {
                    var $el = this.$el;
                    if (isError) {
                        var span = global.$('<div></div>').addClass(css.fieldError);
                        $el.wrap(span);
                    }
                    else {
                        if ($el.parent('.' + css.fieldError).length > 0)
                            $el.unwrap();
                    }
                }
                toString() {
                    return 'RadioElView';
                }
                get checked() { return this._val; }
                set checked(v) {
                    var el = this.el;
                    if (v !== null)
                        v = !!v;
                    if (v !== this._val) {
                        this._val = v;
                        if (el)
                            el.checked = !!this._val;

                        if (this._val === null) {
                            this.$el.css("opacity", 0.33);
                        }
                        else
                            this.$el.css("opacity", 1.0);
                        this.raisePropertyChanged('checked');
                    }
                }
                get value() { return this.el.value; }
                set value(v) {
                    var el = this.el;
                    if (!el)
                        return;
                    var strv = '' + v;
                    if (v === null)
                        strv = '';
                    if (strv !== el.value) {
                        el.value = strv;
                        this.raisePropertyChanged('value');
                    }
                }
                get name() { return this.el.name; }
            }

            export interface IButtonOptions extends IViewOptions {
                preventDefault?: boolean;
            }

            export class ButtonElView extends CommandElView {
                _preventDefault: boolean;
                constructor(app: Application, el: HTMLElement, options: IAncorOptions) {
                    this._preventDefault = false;
                    super(app, el, options);
                }
                _init(options: IButtonOptions) {
                    super._init(options);
                    var self = this, $el = this.$el;
                    if (!!options.preventDefault)
                        this._preventDefault = true;

                    $el.on('click.' + this._objId, function (e) {
                        self._onClick(e);
                    });
                }
                _onClick(e: Event) {
                    if (this._preventDefault)
                        e.preventDefault();
                    this.invokeCommand();
                }
                toString() {
                    return 'ButtonElView';
                }
                get value() {
                    if (!this._el)
                        return '';
                    return this.$el.val();
                }
                set value(v) {
                    if (!this._el)
                        return;

                    var x = this.$el.val();
                    if (v === null)
                        v = '';
                    else
                        v = '' + v;
                    if (x !== v) {
                        this.$el.val(v);
                        this.raisePropertyChanged('value');
                    }
                }
                get text() {
                    if (!this._el)
                        return '';
                    return this.$el.text();
                }
                set text(v) {
                    if (!this._el)
                        return;

                    var x = this.$el.text();
                    if (v === null)
                        v = '';
                    else
                        v = '' + v;
                    if (x !== v) {
                        this.$el.text(v);
                        this.raisePropertyChanged('text');
                    }
                }
                get html() {
                    if (!this._el)
                        return '';
                    return this.$el.html();
                }
                set html(v) {
                    if (!this._el)
                        return;

                    var x = this.$el.html();
                    if (v === null)
                        v = '';
                    else
                        v = '' + v;
                    if (x !== v) {
                        this.$el.html(v);
                        this.raisePropertyChanged('html');
                    }
                }
                get preventDefault() {
                    return this._preventDefault;
                }
                set preventDefault(v: boolean) {
                    if (this._preventDefault !== v) {
                        this._preventDefault = v;
                        this.raisePropertyChanged('preventDefault');
                    }
                }
            }

            export interface IAncorOptions extends IButtonOptions {
                imageSrc?: string;
            }

            export class AnchorElView extends CommandElView{
                _imageSrc: string;
                _image: HTMLImageElement;
                _preventDefault: boolean;
                constructor(app: Application, el: HTMLAnchorElement, options: IAncorOptions) {
                    this._imageSrc = null;
                    this._image = null;
                    this._preventDefault = false;
                    super(app, el, options);
                }
                _init(options: IAncorOptions) {
                    super._init(options);
                    var self = this, $el = this.$el;
                    if (!!options.imageSrc)
                        this.imageSrc = options.imageSrc;
                    if (!!options.preventDefault)
                        this._preventDefault = true;
                    $el.addClass(css.commandLink);
                    $el.on('click.' + this._objId, function (e) {
                        self._onClick(e);
                    });
                }
                _onClick(e: Event) {
                    if (this._preventDefault)
                        e.preventDefault();
                    this.invokeCommand();
                }
                _updateImage(src:string) {
                    var $a = this.$el, $img, self = this;
                    if (this._imageSrc === src)
                        return;
                    this._imageSrc = src;
                    if (!!this._image && !src) {
                        global.$(this._image).remove();
                        this._image = null;
                    }

                    if (!!src) {
                        if (!this._image) {
                            self.html = null;
                            $img = global.$(new Image()).attr('src', src).mouseenter(
                                function (e) {
                                    if (self.isEnabled)
                                        global.$(this).css("opacity", 0.5);
                                }).mouseout(
                                function (e) {
                                    if (self.isEnabled)
                                        global.$(this).css("opacity", 1.0);
                                }).appendTo($a);
                            this._image = $img.get(0);
                        }
                        else
                            this._image.src = src;
                    }
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this.$el.removeClass(css.commandLink);
                    this.imageSrc = null;
                    super.destroy();
                }
                toString() {
                    return 'AncorButtonElView';
                }
                get el() { return <HTMLAnchorElement>this._el; }
                get imageSrc() { return this._imageSrc; }
                set imageSrc(v) {
                    if (!this._$el)
                        return;
                    var x = this._imageSrc;
                    if (x !== v) {
                        this._updateImage(v);
                        this.raisePropertyChanged('imageSrc');
                    }
                }
                get html() {
                    if (!this._el)
                        return '';
                    return this.$el.html();
                }
                set html(v) {
                    if (!this._el)
                        return;

                    var x = this.$el.html();
                    if (v === null)
                        v = '';
                    else
                        v = '' + v;
                    if (x !== v) {
                        this.$el.html(v);
                        this.raisePropertyChanged('html');
                    }
                }
                get text() {
                    if (!this._el)
                        return '';
                    return this.$el.text();
                }
                set text(v) {
                    if (!this._el)
                        return;

                    var x = this.$el.text();
                    if (v === null)
                        v = '';
                    else
                        v = '' + v;
                    if (x !== v) {
                        this.$el.text(v);
                        this.raisePropertyChanged('text');
                    }
                }
                get href() {
                    if (!this._el)
                        return '';
                    return this.el.href;
                }
                set href(v) {
                    if (!this._el)
                        return;

                    var x = this.href;
                    if (v === null)
                        v = '';
                    else
                        v = '' + v;
                    if (x !== v) {
                        this.el.href = v;
                        this.raisePropertyChanged('href');
                    }
                }
                get preventDefault() {
                    return this._preventDefault;
                }
                set preventDefault(v:boolean) {
                    if (this._preventDefault !== v) {
                        this._preventDefault = v;
                        this.raisePropertyChanged('preventDefault');
                    }
                }
            }

            export interface IExpanderOptions {
                expandedsrc?: string;
                collapsedsrc?: string;
                isExpanded?: boolean;
            }

            export class ExpanderElView extends AnchorElView {
                _expandedsrc: string;
                _collapsedsrc: string;
                _isExpanded: boolean;
                _init(options: IExpanderOptions) {
                    this._expandedsrc = options.expandedsrc || global.getImagePath('collapse.jpg');
                    this._collapsedsrc = options.collapsedsrc || global.getImagePath('expand.jpg');
                    this._isExpanded = !!options.isExpanded;
                    var opts: IAncorOptions = {imageSrc:this._isExpanded? this._expandedsrc: this._collapsedsrc};
                    super._init(opts);
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._expandedsrc = null;
                    this._collapsedsrc = null;
                    this._isExpanded = false;
                    super.destroy();
                }
                _onCommandChanged() {
                    super._onCommandChanged();
                    this.invokeCommand();
                }
                _onClick(e) {
                    var self = this;
                    self._isExpanded = !self._isExpanded;
                    super._onClick(e);
                }
                invokeCommand() {
                    var self = this;
                    self.imageSrc = self._isExpanded ? self._expandedsrc : self._collapsedsrc;
                    super.invokeCommand();
                }
                toString() {
                    return 'ExpanderElView';
                }
                get isExpanded() { return this._isExpanded; }
                set isExpanded(v) {
                    if (this._isExpanded !== v) {
                        this._isExpanded = v;
                        this.invokeCommand();
                        this.raisePropertyChanged('isExpanded');
                    }
                }
            }
                

            export class SpanElView extends BaseElView {
                toString() {
                    return 'SpanElView';
                }
                get text() { return this.$el.text(); }
                set text(v) {
                    var $el = this.$el, x = $el.text();
                    var str = '' + v;
                    v = v === null ? '' : str;
                    if (x !== v) {
                        $el.text(v);
                        this.raisePropertyChanged('text');
                        this.raisePropertyChanged('value');
                    }
                }
                get value() { return this.text; }
                set value(v) { this.text = v; }
                get html() { return this.el.innerHTML; }
                set html(v) {
                    var x = this.el.innerHTML;
                    var str = '' + v;
                    v = v === null ? '' : str;
                    if (x !== v) {
                        this.el.innerHTML = v;
                        this.raisePropertyChanged('html');
                    }
                }
                get color() {
                    var $el = this.$el;
                    return $el.css('color');
                }
                set color(v) {
                    var $el = this.$el;
                    var x = $el.css('color');
                    if (v !== x) {
                        $el.css('color', v);
                        this.raisePropertyChanged('color');
                    }
                }
                get fontSize() {
                    var $el = this.$el;
                    return $el.css('font-size');
                }
                set fontSize(v) {
                    var $el = this.$el;
                    var x = $el.css('font-size');
                    if (v !== x) {
                        $el.css('font-size', v);
                        this.raisePropertyChanged('fontSize');
                    }
                }
            }

            export class BlockElView extends SpanElView {
                toString() {
                    return 'DivElView';
                }
                get borderColor() {
                    var $el = this.$el;
                    return $el.css('border-top-color');
                }
                set borderColor(v) {
                    var $el = this.$el;
                    var x = $el.css('border-top-color');
                    if (v !== x) {
                        this.el.style.borderColor = v;
                        this.raisePropertyChanged('borderColor');
                    }
                }
                get borderStyle() {
                    var $el = this.$el;
                    return $el.css('border-top-style');
                }
                set borderStyle(v) {
                    var $el = this.$el;
                    var x = $el.css('border-top-style');
                    if (v !== x) {
                        $el.css('border-style', v);
                        this.raisePropertyChanged('borderStyle');
                    }
                }
                get width() {
                    var $el = this.$el;
                    return $el.width();
                }
                set width(v) {
                    var $el = this.$el;
                    var x = $el.width();
                    if (v !== x) {
                        $el.width(v);
                        this.raisePropertyChanged('width');
                    }
                }
                get height() {
                    var $el = this.$el;
                    return $el.height();
                }
                set height(v) {
                    var $el = this.$el;
                    var x = $el.height();
                    if (v !== x) {
                        $el.height(v);
                        this.raisePropertyChanged('height');
                    }
                }
            }

            export class ImgElView extends BaseElView {
                constructor(app: Application, el: HTMLImageElement, options: IViewOptions) {
                    super(app, el, options);
                }
                toString() {
                    return 'ImgElView';
                }
                get el() { return <HTMLImageElement>this._el; }
                get src() { return this.el.src; }
                set src(v: string) {
                    var x = this.el.src;
                    if (x !== v) {
                        this.el.src = v;
                        this.raisePropertyChanged('src');
                    }
                }
            }

            export class TabsElView extends BaseElView {
                _tabsEventCommand: mvvm.ICommand;
                _tabOpts: any;

                _init(options) {
                    super._init(options);
                    this._tabsEventCommand = null;
                    this._tabOpts = options;
                    this._createTabs();
                }
                _createTabs() {
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
                    (<any>$el).tabs(tabOpts);
                }
                _destroyTabs() {
                    var $el = this.$el;
                    utils.destroyJQueryPlugin($el, 'tabs');
                }
                invokeTabsEvent(eventName:string, args) {
                    var self = this, data = { eventName: eventName, args: args };
                    if (!!self._tabsEventCommand) {
                        self._tabsEventCommand.execute(self, data);
                    }
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._tabsEventCommand = null;
                    this._destroyTabs();
                    super.destroy();
                }
                toString() {
                    return 'TabsElView';
                }
                get tabsEventCommand() { return this._tabsEventCommand; }
                set tabsEventCommand(v) {
                    var old = this._tabsEventCommand;
                    if (v !== old) {
                        if (!!old) {
                            this._destroyTabs();
                        }
                        this._tabsEventCommand = v;
                        if (!!this._tabsEventCommand)
                            this._createTabs();
                    }
                }
            }

            global.registerType('BaseElView', BaseElView);
            global.registerType('InputElView', InputElView);
            global.registerType('CommandElView', CommandElView);
            global.registerType('TemplateElView', TemplateElView);
            global.registerElView('template', TemplateElView);
            global.registerType('BusyElView', BusyElView);
            global.registerElView('busy_indicator', BusyElView);
            global.registerType('DynaContentElView', DynaContentElView);
            global.registerElView(global.consts.ELVIEW_NM.DYNACONT, DynaContentElView);
            global.registerType('CheckBoxElView', CheckBoxElView);
            global.registerElView('input:checkbox', CheckBoxElView);
            global.registerElView('threeState', CheckBoxThreeStateElView);
            global.registerType('TextBoxElView', TextBoxElView);
            global.registerElView('input:text', TextBoxElView);
            global.registerType('HiddenElView', HiddenElView);
            global.registerElView('input:hidden', HiddenElView);
            global.registerType('TextAreaElView', TextAreaElView);
            global.registerElView('textarea', TextAreaElView);
            global.registerType('RadioElView', RadioElView);
            global.registerElView('input:radio', RadioElView);
            global.registerType('ButtonElView', ButtonElView);
            global.registerElView('input:button', ButtonElView);
            global.registerElView('input:submit', ButtonElView);
            global.registerElView('button', ButtonElView);
            global.registerType('AnchorElView', AnchorElView);
            global.registerElView('a', AnchorElView);
            global.registerElView('abutton', AnchorElView);
            global.registerType('ExpanderElView', ExpanderElView);
            global.registerElView('expander', ExpanderElView);
            global.registerType('SpanElView', SpanElView);
            global.registerElView('span', SpanElView);
            global.registerType('BlockElView', BlockElView);
            global.registerElView('div', BlockElView);
            global.registerElView('section', BlockElView);
            global.registerElView('block', BlockElView);
            global.registerType('ImgElView', ImgElView);
            global.registerElView('img', ImgElView);
            global.registerType('TabsElView', TabsElView);
            global.registerElView('tabs', TabsElView);
            //signals to the global object that the module is loaded
            global.onModuleLoaded('baseElView', baseElView);
        }
    }
}

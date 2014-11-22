module RIAPP {
    export module MOD {
        export module baseContent {
            import constsMOD = RIAPP.MOD.consts;
            import utilsMOD = RIAPP.MOD.utils;
            import parserMOD = RIAPP.MOD.parser;
            import elviewMOD = RIAPP.MOD.baseElView;
            import bindMOD = RIAPP.MOD.binding;
            import templMOD = RIAPP.MOD.template;
            import collMOD = RIAPP.MOD.collection;

            var utils: utilsMOD.Utils, parser: parserMOD.Parser;
            RIAPP.global.addOnInitialize((s, args) => {
                utils = s.utils;
                parser = s.parser;
            });
            export var css = {
                content: 'ria-content-field',
                required: 'ria-required-field'
            };
            
            export interface IContent {
                isEditing: boolean;
                dataContext: any;
                destroy(): void;
            }
         
            //can contain two template ids - for display and editing
            export interface ITemplateInfo {
                displayID?: string;
                editID?: string;
            }

            //the result of parsing od data-content attribute
            export interface IDataContentAttr {
                fieldName?: string;
                readOnly?: boolean;
                css?: { displayCss: string; editCss: string; };
                template?: ITemplateInfo;
                name?: string;
                options?: any;
            }

            export interface IExternallyCachable {
                addOnObjectCreated(fn: (sender: any, args: { objectKey: string; object: RIAPP.BaseObject; isCachedExternally: boolean; }) => void , namespace?: string): void;
                addOnObjectNeeded(fn: (sender: any, args: { objectKey: string; object: RIAPP.BaseObject; }) => void , namespace?: string): void;
            }

            export interface IContentOptions {
                name?: string;
                readOnly?: boolean;
                initContentFn?: (content: IExternallyCachable) => void;
                fieldInfo?: collMOD.IFieldInfo;
                bindingInfo?: bindMOD.IBindingInfo;
                displayInfo?: { displayCss?: string; editCss?: string; };
                templateInfo?: ITemplateInfo;
                fieldName?: string;
                options?: any;
            }

            export interface IConstructorContentOptions {
                parentEl: HTMLElement;
                contentOptions: IContentOptions;
                dataContext: any;
                isEditing: boolean;
            }

            export interface IContentType {
                new (app: RIAPP.Application, options: IConstructorContentOptions): IContent;
            }

            export interface IContentFactory {
                getContentType(options: IContentOptions): IContentType;
                createContent(options: IConstructorContentOptions): IContent;
                isExternallyCachable(contentType: IContentType): boolean;
            }

            export function parseContentAttr(content_attr: string): IContentOptions {
                var contentOptions: IContentOptions = {
                    name:null,
                    templateInfo: null,
                    bindingInfo: null,
                    displayInfo: null,
                    fieldName: null,
                    options: null
                };

                var attr: IDataContentAttr, temp_opts = parser.parseOptions(content_attr);
                if (temp_opts.length === 0)
                    return contentOptions;
                attr = temp_opts[0];
                if (!attr.template && !!attr.fieldName) {
                    var bindInfo: bindMOD.IBindingInfo = {
                        target: null, source: null,
                        targetPath: null, sourcePath: attr.fieldName,
                        mode: bindMOD.BINDING_MODE[bindMOD.BINDING_MODE.OneWay],
                        converter: null, converterParam: null
                    };

                    contentOptions.bindingInfo = bindInfo;
                    contentOptions.displayInfo = attr.css;
                    contentOptions.fieldName = attr.fieldName;
                    if (!!attr.name)
                        contentOptions.name = attr.name;
                    if (!!attr.options)
                        contentOptions.options = attr.options;
                    if (attr.readOnly !== undefined)
                        contentOptions.readOnly = utils.parseBool(attr.readOnly);
                }
                else if (!!attr.template) {
                    contentOptions.templateInfo = attr.template;
                    delete attr.template;
                }
                return contentOptions;
            };

            export function getBindingOptions(app: RIAPP.Application, bindInfo: bindMOD.IBindingInfo, defaultTarget: RIAPP.BaseObject, defaultSource:any) {
                var bindingOpts: bindMOD.IBindingOptions = {
                    mode: bindMOD.BINDING_MODE.OneWay,
                    converterParam: null,
                    converter: null,
                    targetPath: null,
                    sourcePath: null,
                    target: null,
                    source: null,
                    isSourceFixed: false
                };

                var fixedSource = bindInfo.source, fixedTarget = bindInfo.target;

                if (!bindInfo.sourcePath && !!bindInfo.to)
                    bindingOpts.sourcePath = bindInfo.to;
                else if (!!bindInfo.sourcePath)
                    bindingOpts.sourcePath = bindInfo.sourcePath;
                if (!!bindInfo.targetPath)
                    bindingOpts.targetPath = bindInfo.targetPath;
                if (!!bindInfo.converterParam)
                    bindingOpts.converterParam = bindInfo.converterParam;
                if (!!bindInfo.mode)
                    bindingOpts.mode = bindMOD.BINDING_MODE[bindInfo.mode];

                if (!!bindInfo.converter) {
                    if (utils.check.isString(bindInfo.converter))
                        bindingOpts.converter = app.getConverter(bindInfo.converter);
                    else
                        bindingOpts.converter = bindInfo.converter;
                }


                if (!fixedTarget)
                    bindingOpts.target = defaultTarget;
                else {
                    if (utils.check.isString(fixedTarget)) {
                        if (fixedTarget == 'this')
                            bindingOpts.target = defaultTarget;
                        else {
                            //if no fixed target, then target evaluation starts from this app
                            bindingOpts.target = parser.resolveBindingSource(app, parser.getPathParts(fixedTarget));
                        }
                    }
                    else
                        bindingOpts.target = fixedTarget;
                }

                if (!fixedSource) {
                    //if source is not supplied use defaultSource parameter as source
                    bindingOpts.source = defaultSource; 
                }
                else {
                    bindingOpts.isSourceFixed = true;
                    if (utils.check.isString(fixedSource)) {
                        if (fixedSource == 'this') {
                            bindingOpts.source = defaultTarget;
                        }
                        else {
                            //source evaluation starts from this app
                            bindingOpts.source = parser.resolveBindingSource(app, parser.getPathParts(fixedSource));
                        }
                    }
                    else
                        bindingOpts.source = fixedSource;
                }

                return bindingOpts;
            };

            export class BindingContent extends RIAPP.BaseObject implements IContent {
                protected _parentEl: HTMLElement;
                protected _el: HTMLElement;
                protected _options: IContentOptions;
                protected _isReadOnly: boolean;
                protected _isEditing: boolean;
                protected _dataContext: any;
                protected _lfScope: utilsMOD.LifeTimeScope;
                //the target of dataBinding
                protected _target: elviewMOD.BaseElView;
                protected _app: RIAPP.Application;

                constructor(app: RIAPP.Application, options: IConstructorContentOptions) {
                    super();
                    options = utils.extend(false,
                        {
                            app: null,
                            parentEl: null,
                            options: null,
                            dataContext: null,
                            isEditing: false
                        }, options);
                    this._el = null;
                    this._app = app;
                    this._parentEl = options.parentEl;
                    this._isEditing = !!options.isEditing;
                    this._dataContext = options.dataContext;
                    this._options = options.contentOptions;
                    this._isReadOnly = !!this._options.readOnly;
                    this._lfScope = null;
                    this._target = null;
                    var $p = global.$(this._parentEl);
                    $p.addClass(css.content);
                    this._init();
                    this.update();
                }
                protected _init() { }
                handleError(error, source): boolean {
                    var isHandled = super.handleError(error, source);
                    if (!isHandled) {
                        return this._app.handleError(error, source);
                    }
                    return isHandled;
                }
                protected _updateCss() {
                    var displayInfo = this._getDisplayInfo(), $p = global.$(this._parentEl), fieldInfo = this.getFieldInfo();
                    if (this._isEditing && this._canBeEdited()) {
                        if (!!displayInfo) {
                            if (!!displayInfo.editCss) {
                                $p.addClass(displayInfo.editCss);
                            }
                            if (!!displayInfo.displayCss) {
                                $p.removeClass(displayInfo.displayCss);
                            }
                        }
                        if (!!fieldInfo && !fieldInfo.isNullable) {
                            $p.addClass(css.required);
                        }
                    }
                    else {
                        if (!!displayInfo) {
                            if (!!displayInfo.displayCss) {
                                $p.addClass(displayInfo.displayCss);
                            }
                            if (!!displayInfo.editCss) {
                                $p.removeClass(displayInfo.editCss);
                            }
                            if (!!fieldInfo && !fieldInfo.isNullable) {
                                $p.removeClass(css.required);
                            }
                        }
                    }
                }
                protected _canBeEdited() {
                    if (this._isReadOnly)
                        return false;
                    var finf = this.getFieldInfo();
                    if (!finf)
                        return false;
                    var editable = !!this._dataContext && !!this._dataContext.beginEdit;
                    return editable && !finf.isReadOnly && finf.fieldType != collMOD.FIELD_TYPE.Calculated;
                }
                protected _createTargetElement(): elviewMOD.BaseElView {
                    var el: HTMLElement, doc = global.document, info: { name: string; options: any; } = { name: null, options: null };
                    if (this._isEditing && this._canBeEdited()) {
                        el = doc.createElement('input');
                        el.setAttribute('type', 'text');
                        info.options = this._options.options;
                    }
                    else {
                        el = doc.createElement('span');
                    }
                    this._updateCss();
                    this._el = el;
                    return this._getElementView(this._el, info);
                }
                protected _getBindingOption(bindingInfo: bindMOD.IBindingInfo, target: RIAPP.BaseObject, dataContext:any, targetPath:string) {
                    var options = getBindingOptions(this.app,bindingInfo, target, dataContext);
                    if (this.isEditing && this._canBeEdited())
                        options.mode = bindMOD.BINDING_MODE.TwoWay;
                    else
                        options.mode = bindMOD.BINDING_MODE.OneWay;
                    if (!!targetPath)
                        options.targetPath = targetPath;
                    return options;
                }
                protected _getBindings(): bindMOD.Binding[] {
                    if (!this._lfScope)
                        return [];
                    var arr = this._lfScope.getObjs(), res = [];
                    for (var i = 0, len = arr.length; i < len; i += 1) {
                        if (utils.check.isBinding(arr[i]))
                            res.push(arr[i]);
                    }
                    return res;
                }
                protected _updateBindingSource() {
                    var i: number, len: number, binding: bindMOD.Binding, bindings = this._getBindings();
                    for (i = 0, len = bindings.length; i < len; i += 1) {
                        binding = bindings[i];
                        if (!binding.isSourceFixed)
                            binding.source = this._dataContext;
                    }
                }
                protected _cleanUp() {
                    if (!!this._lfScope) {
                        this._lfScope.destroy();
                        this._lfScope = null;
                    }
                    if (!!this._el) {
                        utils.removeNode(this._el);
                        this._el = null;
                    }
                    this._target = null;
                }
                getFieldInfo() {
                    return this._options.fieldInfo;
                }
                protected _getBindingInfo() {
                    return this._options.bindingInfo;
                }
                protected _getDisplayInfo() {
                    return this._options.displayInfo;
                }
                protected _getElementView(el: HTMLElement, view_info: { name: string; options: any; }): elviewMOD.BaseElView {
                    var elView = this.app._getElView(el);
                    if (!!elView)
                        return elView;
                    return this.app._createElementView(el, view_info);
                }
                update() {
                    try {
                        this._cleanUp();
                        var bindingInfo = this._getBindingInfo();
                        if (!!bindingInfo) {
                            this._target = this._createTargetElement();
                            this._lfScope = new utilsMOD.LifeTimeScope();
                            if (!!this._target)
                                this._lfScope.addObj(this._target);
                            var options = this._getBindingOption(bindingInfo, this._target, this._dataContext, 'value');
                            this._parentEl.appendChild(this._el);
                            this._lfScope.addObj(this.app.bind(options));
                        }
                    }
                    catch (ex)
                    {
                        global.reThrow(ex, this.handleError(ex, this));
                    }
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    var displayInfo = this._getDisplayInfo(), $p = global.$(this._parentEl);
                    $p.removeClass(css.content);
                    $p.removeClass(css.required);
                    if (!!displayInfo && !!displayInfo.displayCss) {
                        $p.removeClass(displayInfo.displayCss);
                    }
                    if (!!displayInfo && !!displayInfo.editCss) {
                        $p.removeClass(displayInfo.editCss);
                    }
                    this._cleanUp();
                    this._parentEl = null;
                    this._dataContext = null;
                    this._options = null;
                    this._app = null;
                    super.destroy();
                }
                toString() {
                    return 'BindingContent';
                }
                get parentEl() { return this._parentEl; }
                get target() { return this._target; }
                get isEditing() { return this._isEditing; }
                set isEditing(v) {
                    if (this._isEditing !== v) {
                        this._isEditing = v;
                        this.update();
                    }
                }
                get dataContext() { return this._dataContext; }
                set dataContext(v) {
                    if (this._dataContext !== v) {
                        this._dataContext = v;
                        this._updateBindingSource();
                    }
                }
                get app() { return this._app; }
            }

            export class TemplateContent extends RIAPP.BaseObject implements IContent, templMOD.ITemplateEvents {
                private _parentEl: HTMLElement;
                private _template: templMOD.Template;
                private _templateInfo: ITemplateInfo;
                private _isEditing: boolean;
                private _dataContext: any;
                private _app: RIAPP.Application;
                private _isDisabled: boolean;
                
                constructor(app: RIAPP.Application, options: IConstructorContentOptions) {
                    super();
                    options = utils.extend(false,
                        {
                            app: null,
                            parentEl: null,
                            options: null,
                            dataContext: null,
                            isEditing: false
                        }, options);
                    this._app = app;
                    this._parentEl = options.parentEl;
                    this._isEditing = options.isEditing;
                    this._dataContext = options.dataContext;
                    this._templateInfo = options.contentOptions.templateInfo;
                    this._template = null;
                    var $p = global.$(this._parentEl);
                    $p.addClass(css.content);
                    this.update();
                }
                handleError(error, source): boolean {
                    var isHandled = super.handleError(error, source);
                    if (!isHandled) {
                        return this._app.handleError(error, source);
                    }
                    return isHandled;
                }
                templateLoading(template: templMOD.Template): void {
                    //noop
                }
                templateLoaded(template: templMOD.Template): void {
                    //noop
                }
                templateUnLoading(template: templMOD.Template): void {
                    this._parentEl.removeChild(template.el);
                }
                private _createTemplate(): templMOD.Template {
                    var info = this._templateInfo, id = info.displayID;
                    if (this._isEditing) {
                        if (!!info.editID) {
                            id = info.editID;
                        }
                    }
                    else {
                        if (!id) {
                            id = info.editID;
                        }
                    }
                    if (!id)
                        throw new Error(RIAPP.ERRS.ERR_TEMPLATE_ID_INVALID);

                    return new templMOD.Template({
                        app: this.app,
                        templateID: id,
                        dataContext: this._dataContext,
                        templEvents: this
                    });

                }
                update() {
                    try {
                        this._cleanUp();
                        if (!!this._templateInfo) {
                            this._template = this._createTemplate();
                            this._parentEl.appendChild(this._template.el);
                        }
                    } catch (ex) {
                        global.reThrow(ex, this.handleError(ex, this));
                    }
                }
                protected _cleanUp() {
                    if (!!this._template) {
                        this._template.destroy();
                        this._template = null;
                    }
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    var $p = global.$(this._parentEl);
                    $p.removeClass(css.content);
                    this._cleanUp();
                    this._parentEl = null;
                    this._dataContext = null;
                    this._templateInfo = null;
                    this._app = null;
                    super.destroy();
                }
                toString() {
                    return 'TemplateContent';
                }
                get app() { return this._app; }
                get parentEl() { return this._parentEl; }
                get template() { return this._template; }
                get isEditing() { return this._isEditing; }
                set isEditing(v) {
                    if (this._isEditing !== v) {
                        this._isEditing = v;
                        this.update();
                    }
                }
                get dataContext() { return this._dataContext; }
                set dataContext(v) {
                    if (this._dataContext !== v) {
                        this._dataContext = v;
                        if (!!this._template) {
                            this._template.dataContext = this._dataContext;
                        }
                    }
                }
            }

            export class BoolContent extends BindingContent{
                protected _init() {
                    this._target = this._createTargetElement();
                    var bindingInfo = this._getBindingInfo();
                    if (!!bindingInfo) {
                        this._updateCss();
                        this._lfScope = new utilsMOD.LifeTimeScope();
                        var options = this._getBindingOption(bindingInfo, this._target, this._dataContext, 'checked');
                        options.mode = bindMOD.BINDING_MODE.TwoWay;
                        this._lfScope.addObj(this.app.bind(options));
                    }
                }
                protected _cleanUp() {
                }
                protected _createCheckBoxView() {
                    var el = global.document.createElement('input');
                    el.setAttribute('type', 'checkbox');
                    var chbxView = new elviewMOD.CheckBoxElView(this.app, el, {});
                    return chbxView;
                }
                protected _createTargetElement(): elviewMOD.BaseElView {
                    var tgt = this._target;
                    if (!tgt) {
                        tgt = this._createCheckBoxView();
                        this._el = tgt.el;
                    }
                    this._parentEl.appendChild(this._el);
                    return tgt;
                }
                protected _updateCss() {
                    super._updateCss();
                    var el = <HTMLInputElement>this._el;
                    if (this._isEditing && this._canBeEdited()) {
                        if (el.disabled)
                            el.disabled = false;
                    }
                    else {
                        if (!el.disabled)
                            el.disabled = true;
                    }
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._lfScope) {
                        this._lfScope.destroy();
                        this._lfScope = null;
                    }
                    if (!!this._target) {
                        this._target.destroy();
                        this._target = null;
                    }
                    super.destroy();
                }
                update() {
                    this._cleanUp();
                    this._updateCss();
                }
                toString() {
                    return 'BoolContent';
                }
            }

            export class DateContent extends BindingContent {
                _fn_cleanup: () => void;
                constructor(app: RIAPP.Application, options: IConstructorContentOptions) {
                    if (options.contentOptions.name != 'datepicker') {
                        throw new Error(utils.format(RIAPP.ERRS.ERR_ASSERTION_FAILED, "contentOptions.name == 'datepicker'"));
                    }
                    super(app, options);
                    this._fn_cleanup = null;
                }
                protected _getBindingOption(bindingInfo: bindMOD.IBindingInfo, tgt: RIAPP.BaseObject, dctx:any, targetPath:string) {
                    var options =super._getBindingOption(bindingInfo, tgt, dctx, targetPath);
                    options.converter = this.app.getConverter('dateConverter');
                    return options;
                }
                protected _createTargetElement(): elviewMOD.BaseElView {
                    var el: HTMLElement, doc = global.document, info: { name: string; options: any; } = { name: null, options: null };
                    if (this._isEditing && this._canBeEdited()) {
                        el = doc.createElement('input');
                        el.setAttribute('type', 'text');
                        info.options = this._options.options;
                        info.name = 'datepicker';
                    }
                    else {
                        el = doc.createElement('span');
                    }
                    this._updateCss();
                    this._el = el;
                    return this._getElementView(this._el, info);
                }
                toString() {
                    return 'DateContent';
                }
            }

            export class DateTimeContent extends BindingContent {
                protected _getBindingOption(bindingInfo: bindMOD.IBindingInfo, tgt: RIAPP.BaseObject, dctx, targetPath: string) {
                    var options = super._getBindingOption(bindingInfo, tgt, dctx, targetPath);
                    options.converter = this.app.getConverter('dateTimeConverter');
                    var finf = this.getFieldInfo(), defaults = global.defaults;
                    switch (finf.dataType) {
                        case consts.DATA_TYPE.DateTime:
                            options.converterParam = defaults.dateTimeFormat;
                            break;
                        case consts.DATA_TYPE.Date:
                            options.converterParam = defaults.dateFormat;
                            break;
                        case consts.DATA_TYPE.Time:
                            options.converterParam = defaults.timeFormat;
                            break;
                        default:
                            options.converterParam = null;
                            break;
                    }
                    return options;
                }
                toString() {
                    return 'DateTimeContent';
                }
            }

            export class NumberContent extends BindingContent{
                static __allowedKeys:number[] = null;
                private get _allowedKeys() {
                    if (!NumberContent.__allowedKeys) {
                        var KEYS = constsMOD.KEYS;
                        NumberContent.__allowedKeys = [0, KEYS.backspace, KEYS.del, KEYS.left, KEYS.right, KEYS.end, KEYS.home, KEYS.tab, KEYS.esc, KEYS.enter];
                    }
                    return NumberContent.__allowedKeys;
                }
                protected _getBindingOption(bindingInfo: bindMOD.IBindingInfo, tgt: RIAPP.BaseObject, dctx, targetPath: string) {
                    var options = super._getBindingOption(bindingInfo, tgt, dctx, targetPath);
                    var finf = this.getFieldInfo();
                    switch (finf.dataType) {
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
                }
                update() {
                    super.update();
                    var self = this;
                    if (self._target instanceof elviewMOD.TextBoxElView) {
                        (<elviewMOD.TextBoxElView>self._target).addOnKeyPress(function (sender, args) {
                            args.isCancel = !self._previewKeyPress(args.keyCode, args.value);
                        });
                    }
                }
                protected _previewKeyPress(keyCode:number, value:string) {
                    var ch = String.fromCharCode(keyCode), digits = "1234567890", defaults = global.defaults, notAllowedChars = "~@#$%^&*()+=_";
                    if (notAllowedChars.indexOf(ch) > -1)
                        return false;
                    if (this._allowedKeys.indexOf(keyCode) > -1)
                        return true;
                    if (ch === "-" && value.length === 0)
                        return true;
                    if (ch === defaults.decimalPoint) {
                        if (value.length === 0)
                            return false;
                        else
                            return value.indexOf(ch) < 0;
                    }
                    if (ch === defaults.thousandSep)
                        return true
                    else
                        return digits.indexOf(ch) > -1;
                }
                toString() {
                    return 'NumberContent';
                }
            }

            export class StringContent extends BindingContent {
                static __allowedKeys: number[] = null;
                private get _allowedKeys() {
                    if (!StringContent.__allowedKeys) {
                        var KEYS = constsMOD.KEYS;
                        StringContent.__allowedKeys = [0, KEYS.backspace, KEYS.del, KEYS.left, KEYS.right, KEYS.end, KEYS.home, KEYS.tab, KEYS.esc, KEYS.enter];
                    }
                    return StringContent.__allowedKeys;
                }
                update() {
                    super.update();
                    var self = this, fieldInfo = self.getFieldInfo();
                    if (self._target instanceof elviewMOD.TextBoxElView) {
                        (<elviewMOD.TextBoxElView>self._target).addOnKeyPress(function (sender, args) {
                            args.isCancel = !self._previewKeyPress(fieldInfo, args.keyCode, args.value);
                        });
                    }
                }
                protected _previewKeyPress(fieldInfo: collMOD.IFieldInfo, keyCode: number, value: string) {
                    if (this._allowedKeys.indexOf(keyCode) > -1)
                        return true;
                    return !(fieldInfo.maxLength > 0 && value.length >= fieldInfo.maxLength);
                }
                toString() {
                    return 'StringContent';
                }

            }

            export class MultyLineContent extends BindingContent {
                static __allowedKeys: number[] = null;
                private get _allowedKeys() {
                    if (!MultyLineContent.__allowedKeys) {
                        var KEYS = constsMOD.KEYS;
                        MultyLineContent.__allowedKeys = [0, KEYS.backspace, KEYS.del, KEYS.left, KEYS.right, KEYS.end, KEYS.home, KEYS.tab, KEYS.esc, KEYS.enter];
                    }
                    return MultyLineContent.__allowedKeys;
                }
                constructor(app: RIAPP.Application, options: IConstructorContentOptions) {
                    if (options.contentOptions.name != 'multyline') {
                        throw new Error(utils.format(RIAPP.ERRS.ERR_ASSERTION_FAILED, "contentOptions.name == 'multyline'"));
                    }
                    super(app, options);
                }
                protected _createTargetElement(): elviewMOD.BaseElView {
                    var el: HTMLElement, info: { name: string; options: any; } = { name: null, options: null };
                    if (this._isEditing && this._canBeEdited()) {
                        el = global.document.createElement('textarea');
                        info.options = this._options.options;
                        info.name = null;
                    }
                    else {
                        el = global.document.createElement('div');
                    }
                    this._updateCss();
                    this._el = el;
                    return this._getElementView(this._el, info);
                }
                update() {
                    super.update();
                    var self = this, fieldInfo = self.getFieldInfo();

                    if (self._target instanceof elviewMOD.TextAreaElView) {
                        (<elviewMOD.TextAreaElView>self._target).addOnKeyPress(function (sender, args) {
                            args.isCancel = !self._previewKeyPress(fieldInfo, args.keyCode, args.value);
                        });
                    }
                }
                protected _previewKeyPress(fieldInfo: collMOD.IFieldInfo, keyCode: number, value: string) {
                    if (this._allowedKeys.indexOf(keyCode) > -1)
                        return true;
                    return !(fieldInfo.maxLength > 0 && value.length >= fieldInfo.maxLength);
                }
                toString() {
                    return 'MultyLineContent';
                }
            }

            //base content factory
            export class ContentFactory implements IContentFactory {
                private _app: RIAPP.Application;
                private _nextFactory: IContentFactory;

                constructor(app: RIAPP.Application, nextFactory?: IContentFactory) {
                    this._app = app;
                    this._nextFactory = nextFactory;
                }

                getContentType(options: IContentOptions): IContentType {
                    if (!!options.templateInfo) {
                       return TemplateContent;
                    }
                    if (!options.bindingInfo) {
                        throw new Error(utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'options', 'bindingInfo'));
                    }

                    var fieldInfo = options.fieldInfo, res;
                    switch (fieldInfo.dataType) {
                        case consts.DATA_TYPE.None:
                            res = BindingContent;
                            break;
                        case consts.DATA_TYPE.String:
                            if (options.name == 'multyline')
                                res = MultyLineContent;
                            else
                                res = StringContent;
                            break;
                        case consts.DATA_TYPE.Bool:
                            res = BoolContent;
                            break;
                        case consts.DATA_TYPE.Integer:
                            res = NumberContent;
                            break;
                        case consts.DATA_TYPE.Decimal:
                        case consts.DATA_TYPE.Float:
                            res = NumberContent;
                            break;
                        case consts.DATA_TYPE.DateTime:
                        case consts.DATA_TYPE.Time:
                            res = DateTimeContent;
                            break;
                        case consts.DATA_TYPE.Date:
                            if (options.name == 'datepicker')
                                res = DateContent;
                            else
                                res = DateTimeContent;
                            break;
                        case consts.DATA_TYPE.Guid:
                        case consts.DATA_TYPE.Binary:
                            res = BindingContent;
                            break;
                        default:
                            throw new Error(utils.format(RIAPP.ERRS.ERR_FIELD_DATATYPE, fieldInfo.dataType));
                    }
                    if (!res && this._nextFactory) {
                        res = this._nextFactory.getContentType(options);
                    }
                    if (!res)
                        throw new Error(RIAPP.ERRS.ERR_BINDING_CONTENT_NOT_FOUND);
                    return res;
                }

                createContent(options: IConstructorContentOptions): IContent {
                    var contentType = this.getContentType(options.contentOptions);
                    return new contentType(this.app, options);
                }
                isExternallyCachable(contentType: IContentType): boolean {
                    return false;
                }
                get app() { return this._app; }
            }

            //this function (if present) is executed by the application
            //it allows to init resources specific to an application
            export function initModule(app: RIAPP.Application) {
                app.registerContentFactory((nextFactory?: IContentFactory) => {
                    return new ContentFactory(app, nextFactory);
                });
                return baseContent;
            };

            global.onModuleLoaded('baseContent', baseContent);
        }
    }
}

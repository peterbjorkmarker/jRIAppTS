module RIAPP {
    export module MOD {
        export module baseContent {
            //local variables for optimization
            var utils = global.utils, consts = global.consts;
            export var css = {
                content: 'ria-content-field',
                required: 'ria-required-field'
            };
            
             //result of parsing binding expression -all props typically are strings
            export interface IBindingInfo {
                mode?: string;
                converterParam?: any;
                converter?: any;
                targetPath: string;
                sourcePath?: string;
                to?: string;
                target?: any;
                source?: any;
            };

       
            //can contain two template ids - for display and editing
            export interface ITemplateInfo {
                displayID?: string;
                editID?: string;
            };

            //the result of parsing od data-content attribute
            export interface IDataContentAttr {
                fieldName?: string;
                readOnly?: boolean;
                css?: { displayCss: string; editCss: string; };
                template?: ITemplateInfo;
                name?: string;
                options?: any;
            };


            export interface IExternallyCachable {
                addOnObjectCreated(fn: (sender: any, args: { objectKey: string; object: BaseObject; isCachedExternally: boolean; }) => void , namespace?: string): void;
                addOnObjectNeeded(fn: (sender: any, args: { objectKey: string; object: BaseObject; }) => void , namespace?: string): void;
            }

            export interface IContentOptions {
                name?: string;
                readOnly?: boolean;
                initContentFn?: (content: IExternallyCachable) => void;
                fieldInfo?: collection.IFieldInfo;
                bindingInfo?: IBindingInfo;
                displayInfo?: { displayCss?: string; editCss?: string; };
                templateInfo?: ITemplateInfo;
                fieldName?: string;
                options?: any;
            };

            export interface IContentType {
                new (app: Application, parentEl: HTMLElement, options: IContentOptions, dctx:any, isEditing: boolean): IContent;
            }

            export interface IContentFactory {
                getContentType(options: IContentOptions): IContentType;
                createContent(parentEl: HTMLElement, options: IContentOptions, dctx, isEditing: boolean): IContent;
                isExternallyCachable(contentType): boolean;
            }

            export function parseContentAttr(content_attr: string): IContentOptions {
                var res: IContentOptions = {
                    name:null,
                    templateInfo: null,
                    bindingInfo: null,
                    displayInfo: null,
                    fieldName: null,
                    options: null
                };

                var temp_opts = global.parser.parseOptions(content_attr);
                if (temp_opts.length === 0)
                    return res;
                var attr: IDataContentAttr = temp_opts[0];
                if (!attr.template && !!attr.fieldName) {
                    var bindOpt: binding.IBindingOptions = {
                        target: null, source: null,
                        targetPath: null, sourcePath: attr.fieldName, mode: "OneWay",
                        converter: null, converterParam: null
                    };
                    res.bindingInfo = bindOpt;
                    res.displayInfo = attr.css;
                    res.fieldName = attr.fieldName;
                    if (!!attr.name)
                        res.name = attr.name;
                    if (!!attr.options)
                        res.options = attr.options;
                    if (!(attr.readOnly === undefined))
                        res.readOnly = utils.parseBool(attr.readOnly);
                }
                else if (!!attr.template) {
                    res.templateInfo = attr.template;
                    delete attr.template;
                }
                return res;
            };

            export function getBindingOptions(app: Application, options: MOD.baseContent.IBindingInfo, defaultTarget: BaseObject, defaultSource:any) {
                var BINDING_MODE = binding.BINDING_MODE,
                    opts: binding.IBindingOptions = {
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

                if (!options.sourcePath && !!options.to)
                    opts.sourcePath = options.to;
                else if (!!options.sourcePath)
                    opts.sourcePath = options.sourcePath;
                if (!!options.targetPath)
                    opts.targetPath = options.targetPath;
                if (!!options.converterParam)
                    opts.converterParam = options.converterParam;
                if (!!options.mode)
                    opts.mode = options.mode;

                if (!!options.converter) {
                    if (utils.check.isString(options.converter))
                        opts.converter = app.getConverter(options.converter);
                    else
                        opts.converter = options.converter;
                }


                if (!fixedTarget)
                    opts.target = defaultTarget;
                else {
                    if (utils.check.isString(fixedTarget)) {
                        if (fixedTarget == 'this')
                            opts.target = defaultTarget;
                        else {
                            //if no fixed target, then target evaluation starts from this app
                            opts.target = global.parser.resolveBindingSource(app, global.parser._getPathParts(fixedTarget));
                        }
                    }
                    else
                        opts.target = fixedTarget;
                }

                if (!fixedSource) {
                    //if source is not supplied use defaultSource parameter as source
                    opts.source = defaultSource; 
                }
                else {
                    opts.isSourceFixed = true;
                    if (utils.check.isString(fixedSource)) {
                        if (fixedSource == 'this') {
                            opts.source = defaultTarget;
                        }
                        else {
                            //source evaluation starts from this app
                            opts.source = global.parser.resolveBindingSource(app, global.parser._getPathParts(fixedSource));
                        }
                    }
                    else
                        opts.source = fixedSource;
                }

                return opts;
            };

            export interface IContent {
                isEditing: boolean;
                dataContext: any;
                destroy(): void;
            };

            export class BindingContent extends RIAPP.BaseObject implements IContent {
                _parentEl: HTMLElement;
                _el: HTMLElement;
                _options: IContentOptions;
                _isReadOnly: boolean;
                _isEditing: boolean;
                _dctx: any;
                _lfScope: MOD.utils.LifeTimeScope;
                //the target of dataBinding
                _tgt: baseElView.BaseElView;
                _app: Application;

                constructor(app: Application, parentEl: HTMLElement, options: IContentOptions, dctx:any, isEditing: boolean) {
                    super();
                    this._app = app;
                    this._parentEl = parentEl;
                    this._el = null;
                    this._options = options;
                    this._isReadOnly = !!this._options.readOnly;
                    this._isEditing = !!isEditing;
                    this._dctx = dctx;
                    this._lfScope = null;
                    this._tgt = null;
                    var $p = global.$(this._parentEl);
                    $p.addClass(css.content);
                    this._init();
                    this.update();
                }
                _init() { }
                _updateCss() {
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
                _canBeEdited() {
                    if (this._isReadOnly)
                        return false;
                    var finf = this.getFieldInfo();
                    if (!finf)
                        return false;
                    var editable = !!this._dctx && !!this._dctx.beginEdit;
                    return editable && !finf.isReadOnly && !finf.isCalculated;
                }
                _createTargetElement() {
                    var el: HTMLElement, doc = global.document;
                    if (this._isEditing && this._canBeEdited()) {
                        el = doc.createElement('input');
                        el.setAttribute('type', 'text');
                    }
                    else {
                        el = doc.createElement('span');
                    }
                    this._updateCss();
                    return el;
                }
                _getBindingOption(bindingInfo:IBindingInfo, tgt:BaseObject, dctx, targetPath:string) {
                    var options = getBindingOptions(this.app,bindingInfo, tgt, dctx);
                    if (this.isEditing && this._canBeEdited())
                        options.mode = 'TwoWay';
                    else
                        options.mode = 'OneWay';
                    if (!!targetPath)
                        options.targetPath = targetPath;
                    return options;
                }
                _getBindings(): binding.Binding[] {
                    if (!this._lfScope)
                        return [];
                    var arr = this._lfScope.getObjs(), res = [];
                    for (var i = 0, len = arr.length; i < len; i += 1) {
                        if (utils.check.isBinding(arr[i]))
                            res.push(arr[i]);
                    }
                    return res;
                }
                _updateBindingSource() {
                    var i, len, obj: binding.Binding, bindings = this._getBindings();
                    for (i = 0, len = bindings.length; i < len; i += 1) {
                        obj = bindings[i];
                        if (!obj.isSourceFixed)
                            obj.source = this._dctx;
                    }
                }
                _cleanUp() {
                    if (!!this._lfScope) {
                        this._lfScope.destroy();
                        this._lfScope = null;
                    }
                    if (!!this._el) {
                        utils.removeNode(this._el);
                        this._el = null;
                    }
                    this._tgt = null;
                }
                getFieldInfo() {
                    return this._options.fieldInfo;
                }
                _getBindingInfo() {
                    return this._options.bindingInfo;
                }
                _getDisplayInfo() {
                    return this._options.displayInfo;
                }
                _getElementView(el): baseElView.BaseElView {
                    return this.app.getElementView(el);
                }
                update() {
                    this._cleanUp();
                    var bindingInfo = this._getBindingInfo();
                    if (!!bindingInfo) {
                        this._el = this._createTargetElement();
                        this._tgt = this._getElementView(this._el);
                        this._lfScope = new MOD.utils.LifeTimeScope();
                        this._lfScope.addObj(this._tgt);
                        var options = this._getBindingOption(bindingInfo, this._tgt, this._dctx, 'value');
                        this._parentEl.appendChild(this._el);
                        this._lfScope.addObj(this.app.bind(options));
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
                    this._dctx = null;
                    this._options = null;
                    this._app = null;
                    super.destroy();
                }
                toString() {
                    return 'BindingContent';
                }
                get parentEl() { return this._parentEl; }
                get target() { return this._tgt; }
                get isEditing() { return this._isEditing; }
                set isEditing(v) {
                    if (this._isEditing !== v) {
                        this._isEditing = v;
                        this.update();
                    }
                }
                get dataContext() { return this._dctx; }
                set dataContext(v) {
                    if (this._dctx !== v) {
                        this._dctx = v;
                        this._updateBindingSource();
                    }
                }
                get app() { return this._app; }
            }

            export class TemplateContent extends RIAPP.BaseObject implements IContent {
                _parentEl: HTMLElement;
                _template: template.Template;
                _templateInfo: ITemplateInfo;
                _isEditing: boolean;
                _dctx: any;
                _app: Application;
                
                constructor(app: Application, parentEl: HTMLElement, options: IContentOptions, dctx:any, isEditing: boolean) {
                    super();
                    var templateInfo: ITemplateInfo = options.templateInfo;
                    this._app = app;
                    this._parentEl = parentEl;
                    this._isEditing = !!isEditing;
                    this._dctx = dctx;
                    this._templateInfo = templateInfo;
                    this._template = null;
                    var $p = global.$(this._parentEl);
                    $p.addClass(css.content);
                    this.update();
                }
                _createTemplate() {
                    var inf = this._templateInfo, id = inf.displayID;
                    if (this._isEditing) {
                        if (!!inf.editID) {
                            id = inf.editID;
                        }
                    }
                    else {
                        if (!id) {
                            id = inf.editID;
                        }
                    }
                    if (!id)
                        throw new Error(RIAPP.ERRS.ERR_TEMPLATE_ID_INVALID);

                    return new MOD.template.Template(this.app, id);
                }
                update() {
                    this._cleanUp();
                    var template;
                    if (!!this._templateInfo) {
                        template = this._createTemplate();
                        this._template = template;
                        this._parentEl.appendChild(template.el);
                        template.dataContext = this._dctx;
                    }
                }
                _cleanUp() {
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
                    this._dctx = null;
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
                get dataContext() { return this._dctx; }
                set dataContext(v) {
                    if (this._dctx !== v) {
                        this._dctx = v;
                        if (!!this._template) {
                            this._template.dataContext = this._dctx;
                        }
                    }
                }
            }

            export class BoolContent extends BindingContent{
                _init() {
                    this._createTargetElement();
                    var bindingInfo = this._getBindingInfo();
                    if (!!bindingInfo) {
                        this._updateCss();
                        this._lfScope = new MOD.utils.LifeTimeScope();
                        var options = this._getBindingOption(bindingInfo, this._tgt, this._dctx, 'checked');
                        options.mode = 'TwoWay';
                        this._lfScope.addObj(this.app.bind(options));
                    }
                }
                _createCheckBoxView() {
                    var el = <HTMLInputElement>global.document.createElement('input');
                    el.setAttribute('type', 'checkbox');
                    var chbxView = new baseElView.CheckBoxElView(this.app, el, {});
                    return chbxView;
                }
                _createTargetElement() {
                    if (!this._tgt) {
                        this._tgt = this._createCheckBoxView();
                        this._el = this._tgt.el;
                    }
                    this._parentEl.appendChild(this._el);
                    return this._el;
                }
                _updateCss() {
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
                    if (!!this._tgt) {
                        this._tgt.destroy();
                        this._tgt = null;
                    }
                    super.destroy();
                }
                _cleanUp() {
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
                constructor(app: Application, parentEl: HTMLElement, options: IContentOptions, dctx, isEditing: boolean) {
                    super(app, parentEl, options, dctx, isEditing);
                    this._fn_cleanup = null;
                }
                _getBindingOption(bindingInfo: IBindingInfo, tgt: BaseObject, dctx, targetPath:string) {
                    var options =super._getBindingOption(bindingInfo, tgt, dctx, targetPath);
                    options.converter = this.app.getConverter('dateConverter');
                    options.converterParam = global.defaults.dateFormat;
                    return options;
                }
                _createTargetElement() {
                    var el = super._createTargetElement();
                    if (this.isEditing) {
                        var $el:any = global.$(el);
                        $el.datepicker();
                        this._fn_cleanup = function () {
                            utils.destroyJQueryPlugin($el, 'datepicker');
                        };
                    }
                    return el;
                }
                _cleanUp() {
                    if (!!this._fn_cleanup) {
                        this._fn_cleanup();
                        this._fn_cleanup = null;
                    }
                    super._cleanUp();
                }
                toString() {
                    return 'DateContent';
                }
            }

            export class DateTimeContent extends BindingContent {
                _getBindingOption(bindingInfo: IBindingInfo, tgt: BaseObject, dctx, targetPath: string) {
                    var options = super._getBindingOption(bindingInfo, tgt, dctx, targetPath);
                    options.converter = this.app.getConverter('dateTimeConverter');
                    var finf = this.getFieldInfo(), defaults = global.defaults;
                    switch (finf.dataType) {
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
                }
                toString() {
                    return 'DateTimeContent';
                }
            }

            export class NumberContent extends BindingContent{
                static __allowedKeys:number[] = null;
                private get _allowedKeys() {
                    if (!NumberContent.__allowedKeys) {
                        var KEYS = global.consts.KEYS;
                        NumberContent.__allowedKeys = [0, KEYS.backspace, KEYS.del, KEYS.left, KEYS.right, KEYS.end, KEYS.home, KEYS.tab, KEYS.esc, KEYS.enter];
                    }
                    return NumberContent.__allowedKeys;
                }
                _getBindingOption(bindingInfo: IBindingInfo, tgt: BaseObject, dctx, targetPath: string) {
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
                    if (self._tgt instanceof baseElView.TextBoxElView) {
                        (<baseElView.TextBoxElView>self._tgt).addOnKeyPress(function (sender, args) {
                            args.isCancel = !self._previewKeyPress(args.keyCode, args.value);
                        });
                    }
                }
                _previewKeyPress(keyCode:number, value:string) {
                    if (this._allowedKeys.indexOf(keyCode) > -1)
                        return true;
                    if (keyCode === 47) // backslash
                    {
                        return false;
                    }
                    var keys = { 32: ' ', 44: ',', 46: '.' };
                    var ch = keys[keyCode];
                    var defaults = global.defaults;
                    if (ch === defaults.decimalPoint) {
                        if (value.length === 0)
                            return false;
                        else return value.indexOf(ch) < 0;
                    }
                    if (!!ch && ch !== defaults.thousandSep)
                        return false;
                    return !(!ch && (keyCode < 45 || keyCode > 57));
                }
                toString() {
                    return 'NumberContent';
                }
            }

            export class StringContent extends BindingContent {
                static __allowedKeys: number[] = null;
                private get _allowedKeys() {
                    if (!StringContent.__allowedKeys) {
                        var KEYS = global.consts.KEYS;
                        StringContent.__allowedKeys = [0, KEYS.backspace, KEYS.del, KEYS.left, KEYS.right, KEYS.end, KEYS.home, KEYS.tab, KEYS.esc, KEYS.enter];
                    }
                    return StringContent.__allowedKeys;
                }
                update() {
                    super.update();
                    var self = this, fieldInfo = self.getFieldInfo();
                    if (self._tgt instanceof baseElView.TextBoxElView) {
                        (<baseElView.TextBoxElView>self._tgt).addOnKeyPress(function (sender, args) {
                            args.isCancel = !self._previewKeyPress(fieldInfo, args.keyCode, args.value);
                        });
                    }
                }
                _previewKeyPress(fieldInfo:collection.IFieldInfo, keyCode:number, value:string) {
                    return !(fieldInfo.maxLength > 0 && value.length >= fieldInfo.maxLength && this._allowedKeys.indexOf(keyCode) === -1);
                }
                toString() {
                    return 'StringContent';
                }

            }

            export class MultyLineContent extends BindingContent {
                static __allowedKeys: number[] = null;
                private get _allowedKeys() {
                    if (!MultyLineContent.__allowedKeys) {
                        var KEYS = global.consts.KEYS;
                        MultyLineContent.__allowedKeys = [0, KEYS.backspace, KEYS.del, KEYS.left, KEYS.right, KEYS.end, KEYS.home, KEYS.tab, KEYS.esc, KEYS.enter];
                    }
                    return MultyLineContent.__allowedKeys;
                }
                constructor(app: Application, parentEl: HTMLElement, options: baseContent.IContentOptions, dctx, isEditing: boolean) {
                    if (options.name != 'multyline') {
                        throw new Error(utils.format(RIAPP.ERRS.ERR_ASSERTION_FAILED, "options.name == 'multyline'"));
                    }
                    super(app, parentEl, options, dctx, isEditing);
                }
                _createTargetElement() {
                    var tgt: HTMLElement;
                    if (this._isEditing && this._canBeEdited()) {
                        tgt = global.document.createElement('textarea');
                    }
                    else {
                        tgt = global.document.createElement('div');
                    }
                    this._updateCss();
                    return tgt;
                }
                update() {
                    super.update();
                    var self = this, fieldInfo = self.getFieldInfo();

                    if (self._tgt instanceof baseElView.TextAreaElView) {
                        (<baseElView.TextAreaElView>self._tgt).addOnKeyPress(function (sender, args) {
                            args.isCancel = !self._previewKeyPress(fieldInfo, args.keyCode, args.value);
                        });
                        var multylnOpt: baseElView.ITextAreaOptions = this._options.options;
                        var tgt = <baseElView.TextAreaElView>self._tgt;
                        if (!!multylnOpt) {
                            if (!!multylnOpt.rows) {
                                tgt.rows = multylnOpt.rows;
                            }
                            if (!!multylnOpt.cols) {
                                tgt.cols = multylnOpt.cols;
                            }
                            if (!!multylnOpt.wrap) {
                                tgt.wrap = multylnOpt.wrap;
                            }
                        }
                    }
                }
                _previewKeyPress(fieldInfo: collection.IFieldInfo, keyCode: number, value: string) {
                    return !(fieldInfo.maxLength > 0 && value.length >= fieldInfo.maxLength && this._allowedKeys.indexOf(keyCode) === -1);
                }
                toString() {
                    return 'MultyLineContent';
                }
            }

            //base content factory
            export class ContentFactory implements IContentFactory {
                _app: Application;
                _nextFactory: baseContent.IContentFactory;

                constructor(app: Application, nextFactory?: IContentFactory) {
                    this._app = app;
                    this._nextFactory = nextFactory;
                }

                getContentType(options: IContentOptions): IContentType {
                    if (!!options.templateInfo) {
                       return TemplateContent;
                    }
                    if (!options.bindingInfo)
                        throw new Error(utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'options', 'bindingInfo'));

                    var DATA_TYPE = consts.DATA_TYPE, fieldInfo = options.fieldInfo, res;
                    switch (fieldInfo.dataType) {
                        case DATA_TYPE.None:
                            res = BindingContent;
                            break;
                        case DATA_TYPE.String:
                            if (options.name == 'multyline')
                                res = MultyLineContent;
                            else
                                res = StringContent;
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
                    if (!res && this._nextFactory) {
                        res = this._nextFactory.getContentType(options);
                    }
                    if (!res)
                        throw new Error(RIAPP.ERRS.ERR_BINDING_CONTENT_NOT_FOUND);
                    return res;
                }

                createContent(parentEl: HTMLElement, options: IContentOptions, dctx, isEditing: boolean): IContent {
                    var contentType = this.getContentType(options);
                    return new contentType(this._app, parentEl, options, dctx, isEditing);
                }
                isExternallyCachable(contentType): boolean {
                    return false;
                }
                get app() { return this._app; }
            }

            //this function (if present) is executed by the application
            //it allows to init resources specific to an application
            export function initModule(app: Application) {
                app.registerContentFactory((nextFactory?: IContentFactory) => {
                    return new ContentFactory(app, nextFactory);
                });
                return baseContent;
            };

            global.onModuleLoaded('baseContent', baseContent);
        }
    }
}

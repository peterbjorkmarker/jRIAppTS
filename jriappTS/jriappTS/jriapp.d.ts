/// <reference path="thirdparty/jquery.d.ts" />
/// <reference path="thirdparty/moment.d.ts" />
/// <reference path="jriapp_strings.d.ts" />
declare module RIAPP {
    enum DEBUG_LEVEL {
        NONE = 0,
        NORMAL = 1,
        HIGH = 2,
    }
    var DebugLevel: DEBUG_LEVEL;
    interface IPromise<T> {
        always(...alwaysCallbacks: {
            (res: any): void;
        }[]): IPromise<any>;
        done(...doneCallbacks: {
            (res: T): void;
        }[]): IPromise<any>;
        fail(...failCallbacks: {
            (res: any): void;
        }[]): IPromise<any>;
        progress(...progressCallbacks: {
            (res: any): void;
        }[]): IPromise<any>;
        then(doneCallbacks: (res: T) => any, failCallbacks?: (res: any) => any, progressCallbacks?: (res: any) => any): IPromise<any>;
    }
    interface IVoidPromise {
        always(...alwaysCallbacks: {
            (res: any): void;
        }[]): IPromise<any>;
        done(...doneCallbacks: {
            (): void;
        }[]): IPromise<any>;
        fail(...failCallbacks: {
            (res: any): void;
        }[]): IPromise<any>;
        progress(...progressCallbacks: {
            (res: any): void;
        }[]): IPromise<any>;
        then(doneCallbacks: () => any, failCallbacks?: (res: any) => any, progressCallbacks?: (res: any) => any): IPromise<any>;
    }
    interface IDeferred<T> extends IPromise<T> {
        notify(arg: any): IDeferred<any>;
        notifyWith(context: any, arg: any): IDeferred<any>;
        reject(arg?: any): IDeferred<any>;
        rejectWith(context: any, arg?: any): IDeferred<any>;
        resolve(arg?: T): IDeferred<any>;
        resolveWith(context: any, arg?: T): IDeferred<any>;
        promise(): IPromise<T>;
        state(): string;
    }
    interface IAnimation {
        beforeShow(el: HTMLElement): void;
        show(onEnd: () => void): void;
        beforeHide(el: HTMLElement): void;
        hide(onEnd: () => void): void;
        stop(): void;
    }
    interface IEditable {
        beginEdit(): boolean;
        endEdit(): boolean;
        cancelEdit(): boolean;
        isEditing: boolean;
    }
    interface ISubmittable {
        submitChanges(): IVoidPromise;
        _isCanSubmit: boolean;
    }
    interface IValidationInfo {
        fieldName: string;
        errors: string[];
    }
    interface IErrorNotification {
        getIsHasErrors(): boolean;
        addOnErrorsChanged(fn: (sender: any, args: {}) => void, namespace?: string): void;
        removeOnErrorsChanged(namespace?: string): void;
        getFieldErrors(fieldName: any): IValidationInfo[];
        getAllErrors(): IValidationInfo[];
        getIErrorNotification(): IErrorNotification;
    }
    interface IDatepicker {
        datepickerRegion: string;
        dateFormat: string;
        attachTo($el: any, options?: any): any;
        detachFrom($el: any): any;
        parseDate(str: string): Date;
        formatDate(date: Date): string;
    }
    class ArrayHelper {
        static clone(arr: any[]): any[];
        static fromList(list: {
            [x: number]: any;
            length: number;
        }): any[];
        static fromCollection(list: HTMLCollection): any[];
        static distinct(arr: any[]): any[];
    }
    class baseUtils {
        static isNull(a: any): boolean;
        static isUndefined(a: any): boolean;
        static isNt(a: any): boolean;
        static isString(a: any): boolean;
        static isFunc(a: any): boolean;
        static isBoolean(a: any): boolean;
        static isDate(a: any): boolean;
        static isNumber(a: any): boolean;
        static isNumeric(obj: any): boolean;
        static endsWith(str: any, suffix: any): boolean;
        static startsWith(str: any, prefix: any): boolean;
        static fastTrim(str: any): string;
        static trim(str: string, chars?: string): string;
        static ltrim(str: string, chars?: string): string;
        static rtrim(str: string, chars?: string): string;
        static isArray(o: any): boolean;
        static hasProp(obj: any, prop: string): boolean;
        static format(format_str: string, ...args: any[]): string;
        static setValue(root: any, namePath: string, val: any, checkOverwrite: boolean): void;
        static getValue(root: any, namePath: string): any;
        static removeValue(root: any, namePath: string): any;
        static resolveOwner(obj: any, path: string): any;
    }
}
declare module RIAPP {
    class BaseObject {
        protected _isDestroyed: boolean;
        protected _isDestroyCalled: boolean;
        private _events;
        private static hasNode(list, node);
        private static countNodes(list);
        private static prependNode(list, node);
        private static appendNode(list, node);
        private static removeNodes(list, ns);
        constructor();
        protected _getEventNames(): string[];
        protected _addHandler(name: string, fn: (sender: any, args: any) => void, namespace?: string, prepend?: boolean): void;
        protected _removeHandler(name?: string, namespace?: string): void;
        protected _raiseEvent(name: string, args: any): void;
        protected _checkEventName(name: string): void;
        protected _isHasProp(prop: string): boolean;
        handleError(error: any, source: any): boolean;
        raisePropertyChanged(name: string): void;
        addHandler(name: string, fn: (sender: any, args: any) => void, namespace?: string, prepend?: boolean): void;
        removeHandler(name?: string, namespace?: string): void;
        addOnDestroyed(fn: (sender: any, args: {}) => void, namespace?: string): void;
        removeOnDestroyed(namespace?: string): void;
        addOnError(fn: (sender: any, args: {
            error: any;
            source: any;
            isHandled: boolean;
        }) => void, namespace?: string): void;
        removeOnError(namespace?: string): void;
        removeNSHandlers(namespace?: string): void;
        raiseEvent(name: string, args: any): void;
        addOnPropertyChange(prop: string, fn: (sender: any, args: {
            property: string;
        }) => void, namespace?: string): void;
        removeOnPropertyChange(prop?: string, namespace?: string): void;
        getIsDestroyed(): boolean;
        getIsDestroyCalled(): boolean;
        destroy(): void;
    }
}
declare module RIAPP {
    var global: Global;
    var css_riaTemplate: string;
    enum BindTo {
        Source = 0,
        Target = 1,
    }
    interface IConverter {
        convertToSource(val: any, param: any, dataContext: any): any;
        convertToTarget(val: any, param: any, dataContext: any): any;
    }
    interface ISelectable {
        containerEl: HTMLElement;
        uniqueID: string;
        _onKeyDown(key: number, event: Event): any;
        _onKeyUp(key: number, event: Event): any;
    }
    interface IExports {
        getExports(): any;
    }
    interface IGroupInfo {
        fn_loader?: () => IPromise<string>;
        url?: string;
        names: string[];
        app?: Application;
        promise?: IPromise<string>;
    }
    interface ITemplateLoaderInfo {
        fn_loader: () => IPromise<string>;
        groupName?: string;
    }
    interface IUnResolvedBindingArgs {
        bindTo: BindTo;
        root: any;
        path: string;
        propName: string;
    }
    class Global extends BaseObject implements IExports {
        static vesion: string;
        static _TEMPLATES_SELECTOR: string;
        static _TEMPLATE_SELECTOR: string;
        private _window;
        private _appInst;
        private _$;
        private _currentSelectable;
        private _defaults;
        private _userCode;
        private _utils;
        private _templateLoaders;
        private _templateGroups;
        private _promises;
        private _isReady;
        private _isInitialized;
        private _waitQueue;
        private _parser;
        private _moduleNames;
        private _exports;
        constructor(window: Window, jQuery: JQueryStatic);
        private _onCreate();
        private _processTemplateSection(templateSection, app);
        private _registerTemplateLoaderCore(name, loader);
        private _getTemplateLoaderCore(name);
        protected _getEventNames(): string[];
        _initialize(): void;
        protected _addHandler(name: string, fn: (sender: any, args: any) => void, namespace?: string, prepend?: boolean): void;
        _trackSelectable(selectable: ISelectable): void;
        _untrackSelectable(selectable: ISelectable): void;
        _registerApp(app: Application): void;
        _unregisterApp(app: Application): void;
        _destroyApps(): void;
        _throwDummy(origErr: any): void;
        _checkIsDummy(error: any): boolean;
        _registerObject(root: IExports, name: string, obj: any): void;
        _getObject(root: IExports, name: string): any;
        _removeObject(root: IExports, name: string): any;
        _processTemplateSections(root: {
            querySelectorAll: (selectors: string) => NodeList;
        }): void;
        _loadTemplatesAsync(fn_loader: () => IPromise<string>, app: Application): IPromise<any>;
        _registerTemplateLoader(name: any, loader: ITemplateLoaderInfo): void;
        _getTemplateLoader(name: string): () => IPromise<string>;
        _registerTemplateGroup(groupName: string, group: IGroupInfo): void;
        _getTemplateGroup(name: string): IGroupInfo;
        _waitForNotLoading(callback: any, callbackArgs: any): void;
        _getConverter(name: string): IConverter;
        _onUnResolvedBinding(bindTo: BindTo, root: any, path: string, propName: string): void;
        addOnLoad(fn: (sender: Global, args: any) => void, namespace?: string): void;
        addOnUnLoad(fn: (sender: Global, args: any) => void, namespace?: string): void;
        addOnInitialize(fn: (sender: Global, args: any) => void, namespace?: string): void;
        addOnUnResolvedBinding(fn: (sender: Global, args: IUnResolvedBindingArgs) => void, namespace?: string): void;
        removeOnUnResolvedBinding(namespace?: string): void;
        getExports(): {
            [x: string]: any;
        };
        reThrow(ex: any, isHandled: any): void;
        onModuleLoaded(name: string, module_obj: any): void;
        isModuleLoaded(name: string): boolean;
        findApp(name: string): Application;
        destroy(): void;
        registerType(name: string, obj: any): void;
        getType(name: string): any;
        registerConverter(name: string, obj: IConverter): void;
        registerElView(name: string, elViewType: any): void;
        getImagePath(imageName: string): string;
        loadTemplates(url: string): void;
        toString(): string;
        moduleNames: any[];
        parser: MOD.parser.Parser;
        isLoading: boolean;
        $: JQueryStatic;
        window: Window;
        document: Document;
        currentSelectable: ISelectable;
        defaults: MOD.defaults.Defaults;
        utils: MOD.utils.Utils;
        UC: any;
    }
}
declare module RIAPP {
    module MOD {
        module consts {
            var DATA_ATTR: {
                EL_VIEW_KEY: string;
                DATA_BIND: string;
                DATA_VIEW: string;
                DATA_EVENT_SCOPE: string;
                DATA_ITEM_KEY: string;
                DATA_CONTENT: string;
                DATA_COLUMN: string;
                DATA_NAME: string;
                DATA_FORM: string;
            };
            enum DATE_CONVERSION {
                None = 0,
                ServerLocalToClientLocal = 1,
                UtcToClientLocal = 2,
            }
            enum DATA_TYPE {
                None = 0,
                String = 1,
                Bool = 2,
                Integer = 3,
                Decimal = 4,
                Float = 5,
                DateTime = 6,
                Date = 7,
                Time = 8,
                Guid = 9,
                Binary = 10,
            }
            enum KEYS {
                backspace = 8,
                tab = 9,
                enter = 13,
                esc = 27,
                space = 32,
                pageUp = 33,
                pageDown = 34,
                end = 35,
                home = 36,
                left = 37,
                up = 38,
                right = 39,
                down = 40,
                del = 127,
            }
            var ELVIEW_NM: {
                DATAFORM: string;
            };
            var LOADER_GIF: {
                SMALL: string;
                NORMAL: string;
            };
        }
    }
}
declare module RIAPP {
    module MOD {
        module utils {
            import constsMOD = MOD.consts;
            var css: {
                toolTip: string;
                toolTipError: string;
            };
            function defineProps(proto: any, props?: any, propertyDescriptors?: any): any;
            function __extendType(_super: any, pds: any, props: any): () => void;
            class Checks {
                static isNull: typeof baseUtils.isNull;
                static isUndefined: typeof baseUtils.isUndefined;
                static isNt: typeof baseUtils.isNt;
                static isFunction: typeof baseUtils.isFunc;
                static isString: typeof baseUtils.isString;
                static isArray: typeof baseUtils.isArray;
                static isBoolean: typeof baseUtils.isBoolean;
                static isDate: typeof baseUtils.isDate;
                static isNumber: typeof baseUtils.isNumber;
                static isNumeric: typeof baseUtils.isNumeric;
                static isHTML(a: any): boolean;
                static isObject(a: any): boolean;
                static isSimpleObject(a: any): boolean;
                static isRegExp(a: any): boolean;
                static isBoolString(a: any): boolean;
                static isBaseObj(obj: any): boolean;
                static isBinding(obj: any): boolean;
                static isElView(obj: any): boolean;
                static isTemplateElView(obj: any): boolean;
                static isEditable(obj: any): boolean;
                static isDataForm(el: HTMLElement): boolean;
                static isInsideDataForm(el: HTMLElement): any;
                static isInNestedForm(root: any, forms: HTMLElement[], el: HTMLElement): boolean;
            }
            class StringUtils {
                static endsWith: typeof baseUtils.endsWith;
                static startsWith: typeof baseUtils.startsWith;
                static trim: typeof baseUtils.trim;
                /**
                 *    Usage:     formatNumber(123456.789, 2, '.', ',');
                 *    result:    123,456.79
                **/
                static formatNumber(num: any, decimals?: number, dec_point?: string, thousands_sep?: string): string;
                static stripNonNumeric(str: string): string;
            }
            class Validations {
                static checkNumRange(num: number, range: string): void;
                static _dtRangeToDate(str: string): Date;
                static checkDateRange(dt: Date, range: string): void;
            }
            interface IValueUtils {
                valueToDate(val: string, dtcnv: number, stz: number): Date;
                dateToValue(dt: Date, dtcnv: constsMOD.DATE_CONVERSION, stz: number): string;
                compareVals(v1: any, v2: any, dataType: constsMOD.DATA_TYPE): boolean;
                stringifyValue(v: any, dcnv: constsMOD.DATE_CONVERSION, dataType: constsMOD.DATA_TYPE, stz: number): string;
                parseValue(v: string, dataType: constsMOD.DATA_TYPE, dcnv: constsMOD.DATE_CONVERSION, stz: number): any;
            }
            var valueUtils: IValueUtils;
            class LifeTimeScope extends BaseObject {
                private _objs;
                constructor();
                static create(): LifeTimeScope;
                addObj(b: BaseObject): void;
                removeObj(b: BaseObject): void;
                getObjs(): BaseObject[];
                destroy(): void;
                toString(): string;
            }
            class PropWatcher extends BaseObject {
                _objId: string;
                _objs: BaseObject[];
                constructor();
                static create(): PropWatcher;
                addPropWatch(obj: BaseObject, prop: string, fn_onChange: (prop: string) => void): void;
                addWatch(obj: BaseObject, props: string[], fn_onChange: (prop: string) => void): void;
                removeWatch(obj: BaseObject): void;
                destroy(): void;
                toString(): string;
                uniqueID: string;
            }
            class WaitQueue extends BaseObject {
                _objId: string;
                _owner: BaseObject;
                _queue: any;
                constructor(owner: BaseObject);
                static create(owner: BaseObject): WaitQueue;
                _checkQueue(prop: string, value: any): void;
                enQueue(options: any): void;
                destroy(): void;
                toString(): string;
                uniqueID: string;
                owner: BaseObject;
            }
            class Utils {
                constructor();
                static create(): Utils;
                check: typeof Checks;
                str: typeof StringUtils;
                validation: typeof Validations;
                getNewID(): number;
                isContained(oNode: any, oCont: any): boolean;
                slice: (start?: number, end?: number) => any[];
                get_timeZoneOffset: () => number;
                parseBool(bool_value: any): any;
                round(num: number, decimals: number): number;
                performAjaxCall(url: string, postData: string, async: boolean, fn_success: (res: string) => void, fn_error: (res: any) => void, context: any): IPromise<string>;
                performAjaxGet(url: string): IPromise<string>;
                format: typeof baseUtils.format;
                extend(deep: boolean, defaults: any, options: any): any;
                removeNode(node: Node): void;
                insertAfter(referenceNode: Node, newNode: Node): void;
                getProps(obj: any): string[];
                getParentDataForm(rootForm: HTMLElement, el: HTMLElement): HTMLElement;
                forEachProp(obj: any, fn: (name: string) => void): void;
                addToolTip($el: JQuery, tip: string, isError?: boolean): void;
                hasProp(obj: any, prop: string): boolean;
                createDeferred(): IDeferred<any>;
                cloneObj(o: any, mergeIntoObj?: any): any;
                shallowCopy(o: any): any;
                mergeObj(obj: any, mergeIntoObj: any): any;
                removeFromArray(array: any[], obj: any): number;
                insertIntoArray(array: any[], obj: any, pos: number): void;
                destroyJQueryPlugin($el: JQuery, name: string): void;
                uuid: (len?: number, radix?: number) => string;
            }
        }
    }
}
declare module RIAPP {
    module MOD {
        module errors {
            class BaseError extends BaseObject {
                private _message;
                private _isDummy;
                private _origError;
                constructor(message: string);
                static create(message: string): BaseError;
                toString(): string;
                message: string;
                isDummy: boolean;
                origError: any;
            }
            class DummyError extends BaseError {
                constructor(ex: any);
                static create(ex: any): DummyError;
            }
            class ValidationError extends BaseError {
                _errors: IValidationInfo[];
                _item: any;
                constructor(errorInfo: IValidationInfo[], item: any);
                item: any;
                errors: IValidationInfo[];
            }
        }
    }
}
declare module RIAPP {
    module MOD {
        module converter {
            var NUM_CONV: {
                None: number;
                Integer: number;
                Decimal: number;
                Float: number;
                SmallInt: number;
            };
            class BaseConverter implements IConverter {
                convertToSource(val: any, param: any, dataContext: any): any;
                convertToTarget(val: any, param: any, dataContext: any): any;
            }
            class DateConverter implements IConverter {
                convertToSource(val: any, param: any, dataContext: any): Date;
                convertToTarget(val: any, param: any, dataContext: any): string;
                toString(): string;
            }
            class DateTimeConverter implements IConverter {
                convertToSource(val: any, param: any, dataContext: any): Date;
                convertToTarget(val: any, param: any, dataContext: any): string;
                toString(): string;
            }
            class NumberConverter implements IConverter {
                convertToSource(val: any, param: any, dataContext: any): any;
                convertToTarget(val: any, param: any, dataContext: any): string;
                toString(): string;
            }
            class IntegerConverter implements IConverter {
                convertToSource(val: any, param: any, dataContext: any): any;
                convertToTarget(val: any, param: any, dataContext: any): string;
                toString(): string;
            }
            class SmallIntConverter implements IConverter {
                convertToSource(val: any, param: any, dataContext: any): any;
                convertToTarget(val: any, param: any, dataContext: any): string;
                toString(): string;
            }
            class DecimalConverter implements IConverter {
                convertToSource(val: any, param: any, dataContext: any): any;
                convertToTarget(val: any, param: any, dataContext: any): string;
                toString(): string;
            }
            class FloatConverter implements IConverter {
                convertToSource(val: any, param: any, dataContext: any): any;
                convertToTarget(val: any, param: any, dataContext: any): string;
                toString(): string;
            }
        }
    }
}
declare module RIAPP {
    module MOD {
        module defaults {
            class Defaults extends BaseObject {
                private _imagesPath;
                private _datepicker;
                private _dateFormat;
                private _dateTimeFormat;
                private _timeFormat;
                private _decimalPoint;
                private _thousandSep;
                private _decPrecision;
                private _ajaxTimeOut;
                constructor();
                toString(): string;
                ajaxTimeOut: number;
                dateFormat: string;
                timeFormat: string;
                dateTimeFormat: string;
                datepicker: IDatepicker;
                imagesPath: string;
                decimalPoint: string;
                thousandSep: string;
                decPrecision: number;
            }
        }
    }
}
declare module RIAPP {
    module MOD {
        module parser {
            class Parser {
                static __trimOuterBracesRX: RegExp;
                static __trimQuotsRX: RegExp;
                static __trimBracketsRX: RegExp;
                static __indexedPropRX: RegExp;
                static __valueDelimeter1: string;
                static __valueDelimeter2: string;
                static __keyValDelimeter: string;
                constructor();
                protected _getKeyVals(val: string): {
                    key: string;
                    val: any;
                }[];
                getPathParts(path: string): string[];
                resolveProp(obj: any, prop: string): any;
                setPropertyValue(obj: any, prop: string, val: any): void;
                resolveBindingSource(root: any, srcParts: string[]): any;
                resolvePath(obj: any, path: string): any;
                getBraceParts(val: string, firstOnly: boolean): string[];
                trimOuterBraces(val: string): string;
                trimQuotes(val: string): string;
                trimBrackets(val: string): string;
                isWithOuterBraces(str: string): boolean;
                parseOption(part: string): any;
                parseOptions(str: string): any[];
                toString(): string;
            }
        }
    }
}
declare module RIAPP {
    module MOD {
        module mvvm {
            interface ICommand {
                canExecute: (sender: any, param: any) => boolean;
                execute: (sender: any, param: any) => void;
                raiseCanExecuteChanged: () => void;
            }
            class Command extends BaseObject implements ICommand {
                private _action;
                private _thisObj;
                private _canExecute;
                private _objId;
                constructor(fn_action: (sender: any, param: any) => void, thisObj: any, fn_canExecute: (sender: any, param: any) => boolean);
                protected _getEventNames(): string[];
                addOnCanExecuteChanged(fn: (sender: Command, args: {}) => void, namespace?: string): void;
                removeOnCanExecuteChanged(namespace?: string): void;
                canExecute(sender: any, param: any): boolean;
                execute(sender: any, param: any): void;
                destroy(): void;
                raiseCanExecuteChanged(): void;
                toString(): string;
            }
            class BaseViewModel extends BaseObject {
                private _objId;
                protected _app: Application;
                constructor(app: Application);
                handleError(error: any, source: any): boolean;
                toString(): string;
                destroy(): void;
                uniqueID: string;
                $: JQueryStatic;
                app: Application;
            }
        }
    }
}
declare module RIAPP {
    module MOD {
        module baseElView {
            import mvvmMOD = RIAPP.MOD.mvvm;
            class PropChangedCommand extends mvvmMOD.Command {
                constructor(fn_action: (sender: any, param: {
                    property: string;
                }) => void, thisObj: any, fn_canExecute: (sender: any, param: {
                    property: string;
                }) => boolean);
            }
            var css: {
                fieldError: string;
                commandLink: string;
            };
            interface IViewOptions {
                css?: string;
                tip?: string;
            }
            interface IViewType {
                new (app: Application, el: HTMLElement, options: IViewOptions): BaseElView;
            }
            class BaseElView extends BaseObject {
                protected _el: HTMLElement;
                protected _$el: JQuery;
                protected _oldDisplay: string;
                protected _objId: string;
                protected _propChangedCommand: mvvmMOD.ICommand;
                protected _errors: IValidationInfo[];
                protected _toolTip: string;
                protected _css: string;
                protected _app: Application;
                constructor(app: Application, el: HTMLElement, options: IViewOptions);
                protected _applyToolTip(): void;
                protected _init(options: IViewOptions): void;
                destroy(): void;
                invokePropChanged(property: string): void;
                protected _getErrorTipInfo(errors: IValidationInfo[]): string;
                protected _setFieldError(isError: boolean): void;
                protected _updateErrorUI(el: HTMLElement, errors: IValidationInfo[]): void;
                handleError(error: any, source: any): boolean;
                protected _setToolTip($el: JQuery, tip: string, isError?: boolean): void;
                toString(): string;
                $el: JQuery;
                el: HTMLElement;
                uniqueID: string;
                isVisible: boolean;
                propChangedCommand: mvvmMOD.ICommand;
                validationErrors: IValidationInfo[];
                dataNameAttr: string;
                toolTip: string;
                css: string;
                app: Application;
            }
            class InputElView extends BaseElView {
                constructor(app: Application, el: HTMLInputElement, options: IViewOptions);
                toString(): string;
                isEnabled: boolean;
                el: HTMLInputElement;
                value: string;
            }
            class CommandElView extends BaseElView {
                private _command;
                protected _commandParam: any;
                constructor(app: Application, el: HTMLElement, options: IViewOptions);
                destroy(): void;
                invokeCommand(): void;
                protected _onCommandChanged(): void;
                protected _setCommand(v: mvvmMOD.Command): void;
                toString(): string;
                isEnabled: boolean;
                command: mvvmMOD.Command;
                commandParam: any;
            }
            class BusyElView extends BaseElView {
                private _delay;
                private _timeOut;
                private _loaderPath;
                private _$loader;
                private _isBusy;
                constructor(app: Application, el: HTMLElement, options: IViewOptions);
                protected _init(options: any): void;
                destroy(): void;
                toString(): string;
                isBusy: boolean;
                delay: number;
            }
            class CheckBoxElView extends InputElView {
                private _val;
                protected _init(options: IViewOptions): void;
                protected _setFieldError(isError: boolean): void;
                destroy(): void;
                toString(): string;
                checked: boolean;
            }
            class CheckBoxThreeStateElView extends InputElView {
                private _val;
                private _cbxVal;
                protected _init(options: IViewOptions): void;
                protected _setFieldError(isError: boolean): void;
                destroy(): void;
                toString(): string;
                checked: boolean;
            }
            interface ITextBoxOptions extends IViewOptions {
                updateOnKeyUp?: boolean;
            }
            class TextBoxElView extends InputElView {
                protected _init(options: ITextBoxOptions): void;
                protected _getEventNames(): string[];
                addOnKeyPress(fn: (sender: TextBoxElView, args: {
                    keyCode: number;
                    value: string;
                    isCancel: boolean;
                }) => void, namespace?: string): void;
                removeOnKeyPress(namespace?: string): void;
                toString(): string;
                color: string;
            }
            class HiddenElView extends InputElView {
                toString(): string;
            }
            interface ITextAreaOptions extends ITextBoxOptions {
                rows?: number;
                cols?: number;
                wrap?: string;
            }
            class TextAreaElView extends BaseElView {
                constructor(app: Application, el: HTMLTextAreaElement, options: ITextAreaOptions);
                protected _init(options: ITextAreaOptions): void;
                protected _getEventNames(): string[];
                addOnKeyPress(fn: (sender: TextAreaElView, args: {
                    keyCode: number;
                    value: string;
                    isCancel: boolean;
                }) => void, namespace?: string): void;
                removeOnKeyPress(namespace?: string): void;
                toString(): string;
                el: HTMLTextAreaElement;
                value: string;
                isEnabled: boolean;
                rows: number;
                cols: number;
                wrap: string;
            }
            class RadioElView extends InputElView {
                private _val;
                protected _init(options: IViewOptions): void;
                protected _updateGroup(): void;
                protected _setFieldError(isError: boolean): void;
                toString(): string;
                checked: boolean;
                value: string;
                name: string;
            }
            interface IButtonOptions extends IViewOptions {
                preventDefault?: boolean;
            }
            class ButtonElView extends CommandElView {
                private _preventDefault;
                constructor(app: Application, el: HTMLElement, options: IAncorOptions);
                protected _init(options: IButtonOptions): void;
                protected _onClick(e: Event): void;
                toString(): string;
                value: any;
                text: string;
                html: string;
                preventDefault: boolean;
            }
            interface IAncorOptions extends IButtonOptions {
                imageSrc?: string;
            }
            class AnchorElView extends CommandElView {
                private _imageSrc;
                private _image;
                private _preventDefault;
                constructor(app: Application, el: HTMLAnchorElement, options: IAncorOptions);
                protected _init(options: IAncorOptions): void;
                protected _onClick(e: Event): void;
                protected _updateImage(src: string): void;
                destroy(): void;
                toString(): string;
                el: HTMLAnchorElement;
                imageSrc: string;
                html: string;
                text: string;
                href: string;
                preventDefault: boolean;
            }
            interface IExpanderOptions {
                expandedsrc?: string;
                collapsedsrc?: string;
                isExpanded?: boolean;
            }
            class ExpanderElView extends AnchorElView {
                private _expandedsrc;
                private _collapsedsrc;
                private _isExpanded;
                protected _init(options: IExpanderOptions): void;
                destroy(): void;
                protected _onCommandChanged(): void;
                protected _onClick(e: any): void;
                invokeCommand(): void;
                toString(): string;
                isExpanded: boolean;
            }
            class SpanElView extends BaseElView {
                toString(): string;
                text: string;
                value: string;
                html: string;
                color: string;
                fontSize: string;
            }
            class BlockElView extends SpanElView {
                toString(): string;
                borderColor: string;
                borderStyle: string;
                width: number;
                height: number;
            }
            class ImgElView extends BaseElView {
                constructor(app: Application, el: HTMLImageElement, options: IViewOptions);
                toString(): string;
                el: HTMLImageElement;
                src: string;
            }
        }
    }
}
declare module RIAPP {
    module MOD {
        module binding {
            enum BINDING_MODE {
                OneTime = 0,
                OneWay = 1,
                TwoWay = 2,
            }
            interface IBindingInfo {
                mode?: string;
                converterParam?: any;
                converter?: any;
                targetPath: string;
                sourcePath?: string;
                to?: string;
                target?: any;
                source?: any;
            }
            interface IBindingOptions {
                mode?: BINDING_MODE;
                converterParam?: any;
                converter?: IConverter;
                targetPath: string;
                sourcePath?: string;
                target?: BaseObject;
                source?: any;
                isSourceFixed?: boolean;
            }
            function _checkIsErrorNotification(obj: any): boolean;
            class Binding extends BaseObject {
                private _state;
                private _mode;
                private _converter;
                private _converterParam;
                private _srcPath;
                private _tgtPath;
                private _isSourceFixed;
                private _pathItems;
                private _objId;
                private _ignoreSrcChange;
                private _ignoreTgtChange;
                private _sourceObj;
                private _targetObj;
                private _source;
                private _target;
                private _appName;
                constructor(options: IBindingOptions, appName?: string);
                private _getOnTgtDestroyedProxy();
                private _getOnSrcDestroyedProxy();
                private _getUpdTgtProxy();
                private _getUpdSrcProxy();
                private _getSrcErrChangedProxy();
                private _onSrcErrorsChanged();
                private _getTgtChangedFn(self, obj, prop, restPath, lvl);
                private _getSrcChangedFn(self, obj, prop, restPath, lvl);
                private _parseSrcPath(obj, path, lvl);
                private _parseSrcPath2(obj, path, lvl);
                private _parseTgtPath(obj, path, lvl);
                private _parseTgtPath2(obj, path, lvl);
                private _setPathItem(newObj, bindingTo, lvl, path);
                private _onTgtDestroyed(sender, args);
                private _onSrcDestroyed(sender, args);
                private _bindToSource();
                private _bindToTarget();
                private _updateTarget();
                private _updateSource();
                protected _setTarget(value: any): void;
                protected _setSource(value: any): void;
                handleError(error: any, source: any): boolean;
                destroy(): void;
                toString(): string;
                bindingID: string;
                target: BaseObject;
                source: any;
                targetPath: string[];
                sourcePath: string[];
                sourceValue: any;
                targetValue: any;
                mode: BINDING_MODE;
                converter: IConverter;
                converterParam: any;
                isSourceFixed: boolean;
                isDisabled: boolean;
                appName: string;
            }
        }
    }
}
declare module RIAPP {
    module MOD {
        module collection {
            import constsMOD = RIAPP.MOD.consts;
            import utilsMOD = RIAPP.MOD.utils;
            enum FIELD_TYPE {
                None = 0,
                ClientOnly = 1,
                Calculated = 2,
                Navigation = 3,
                RowTimeStamp = 4,
                Object = 5,
                ServerCalculated = 6,
            }
            enum STATUS {
                NONE = 0,
                ADDED = 1,
                UPDATED = 2,
                DELETED = 3,
            }
            enum COLL_CHANGE_TYPE {
                REMOVE = 0,
                ADDED = 1,
                RESET = 2,
                REMAP_KEY = 3,
            }
            enum SORT_ORDER {
                ASC = 0,
                DESC = 1,
            }
            enum FILTER_TYPE {
                Equals = 0,
                Between = 1,
                StartsWith = 2,
                EndsWith = 3,
                Contains = 4,
                Gt = 5,
                Lt = 6,
                GtEq = 7,
                LtEq = 8,
                NotEq = 9,
            }
            interface IPermissions {
                canAddRow: boolean;
                canEditRow: boolean;
                canDeleteRow: boolean;
                canRefreshRow: boolean;
            }
            interface IFieldInfo {
                fieldName: string;
                isPrimaryKey: number;
                dataType: constsMOD.DATA_TYPE;
                isNullable: boolean;
                isReadOnly: boolean;
                isAutoGenerated: boolean;
                isNeedOriginal: boolean;
                maxLength: number;
                dateConversion: constsMOD.DATE_CONVERSION;
                allowClientDefault: boolean;
                range: string;
                regex: string;
                fieldType: FIELD_TYPE;
                dependentOn: string;
                nested: IFieldInfo[];
                dependents?: string[];
                fullName?: string;
            }
            function fn_getPropertyByName(name: string, props: IFieldInfo[]): IFieldInfo;
            function fn_traverseField(fld: IFieldInfo, fn: (name: string, fld: IFieldInfo) => void): void;
            class CollectionItem extends BaseObject implements IErrorNotification, IEditable, ISubmittable {
                protected _fkey: string;
                protected _isEditing: boolean;
                protected _saveVals: {
                    [x: string]: any;
                };
                protected _vals: {
                    [x: string]: any;
                };
                protected _notEdited: boolean;
                constructor();
                protected _getEventNames(): string[];
                protected _onErrorsChanged(args: any): void;
                handleError(error: any, source: any): boolean;
                protected _beginEdit(): boolean;
                protected _endEdit(): boolean;
                protected _validate(): IValidationInfo;
                protected _skipValidate(fieldInfo: IFieldInfo, val: any): boolean;
                protected _validateField(fieldName: any): IValidationInfo;
                protected _validateAll(): IValidationInfo[];
                protected _checkVal(fieldInfo: IFieldInfo, val: any): any;
                protected _resetIsNew(): void;
                addOnErrorsChanged(fn: (sender: any, args: {}) => void, namespace?: string): void;
                removeOnErrorsChanged(namespace?: string): void;
                _onAttaching(): void;
                _onAttach(): void;
                raiseErrorsChanged(args: any): void;
                getFieldInfo(fieldName: string): IFieldInfo;
                getFieldNames(): string[];
                getFieldErrors(fieldName: any): IValidationInfo[];
                getAllErrors(): IValidationInfo[];
                getErrorString(): string;
                submitChanges(): IVoidPromise;
                beginEdit(): boolean;
                endEdit(): boolean;
                cancelEdit(): boolean;
                deleteItem(): boolean;
                getIsNew(): boolean;
                getIsDeleted(): boolean;
                getKey(): string;
                getCollection(): Collection;
                getIsEditing(): boolean;
                getIsHasErrors(): boolean;
                getIErrorNotification(): IErrorNotification;
                destroy(): void;
                toString(): string;
                _isCanSubmit: boolean;
                _changeType: STATUS;
                _isNew: boolean;
                _isDeleted: boolean;
                _key: string;
                _collection: Collection;
                _isUpdating: boolean;
                isEditing: boolean;
            }
            interface ICollectionOptions {
                enablePaging: boolean;
                pageSize: number;
            }
            interface ICollChangedArgs<TItem extends CollectionItem> {
                change_type: COLL_CHANGE_TYPE;
                items: TItem[];
                pos?: number[];
                old_key?: string;
                new_key?: string;
            }
            interface ICollFillArgs<TItem extends CollectionItem> {
                isBegin: boolean;
                rowCount: number;
                time: Date;
                isPageChanged: boolean;
                resetUI?: boolean;
                fetchedItems?: TItem[];
                newItems?: TItem[];
            }
            interface ICollValidateArgs<TItem extends CollectionItem> {
                item: TItem;
                fieldName: string;
                errors: string[];
            }
            interface ICollItemStatusArgs<TItem extends CollectionItem> {
                item: TItem;
                oldChangeType: STATUS;
                key: string;
            }
            interface ICollItemAddedArgs<TItem extends CollectionItem> {
                item: TItem;
                isAddNewHandled: boolean;
            }
            class BaseCollection<TItem extends CollectionItem> extends BaseObject {
                protected _options: ICollectionOptions;
                protected _isLoading: boolean;
                protected _EditingItem: TItem;
                protected _perms: IPermissions;
                protected _totalCount: number;
                protected _pageIndex: number;
                protected _items: TItem[];
                protected _itemsByKey: {
                    [x: string]: TItem;
                };
                protected _currentPos: number;
                protected _newKey: number;
                protected _fieldMap: {
                    [x: string]: IFieldInfo;
                };
                protected _fieldInfos: IFieldInfo[];
                protected _errors: {
                    [x: string]: {
                        [x: string]: string[];
                    };
                };
                protected _ignoreChangeErrors: boolean;
                protected _pkInfo: IFieldInfo[];
                protected _isUpdating: boolean;
                protected _isClearing: boolean;
                protected _waitQueue: utilsMOD.WaitQueue;
                constructor();
                static getEmptyFieldInfo(fieldName: string): IFieldInfo;
                protected _getEventNames(): string[];
                handleError(error: any, source: any): boolean;
                addOnClearing(fn: (sender: BaseCollection<TItem>, args: {}) => void, namespace?: string): void;
                removeOnClearing(namespace?: string): void;
                addOnCleared(fn: (sender: BaseCollection<TItem>, args: {}) => void, namespace?: string): void;
                removeOnCleared(namespace?: string): void;
                addOnFill(fn: (sender: BaseCollection<TItem>, args: ICollFillArgs<TItem>) => void, namespace?: string): void;
                removeOnFill(namespace?: string): void;
                addOnCollChanged(fn: (sender: BaseCollection<TItem>, args: ICollChangedArgs<TItem>) => void, namespace?: string): void;
                removeOnCollChanged(namespace?: string): void;
                addOnValidate(fn: (sender: BaseCollection<TItem>, args: ICollValidateArgs<TItem>) => void, namespace?: string): void;
                removeOnValidate(namespace?: string): void;
                addOnItemDeleting(fn: (sender: BaseCollection<TItem>, args: {
                    item: TItem;
                    isCancel: boolean;
                }) => void, namespace?: string): void;
                removeOnItemDeleting(namespace?: string): void;
                addOnItemAdding(fn: (sender: BaseCollection<TItem>, args: {
                    item: TItem;
                    isCancel: boolean;
                }) => void, namespace?: string): void;
                removeOnItemAdding(namespace?: string): void;
                addOnItemAdded(fn: (sender: BaseCollection<TItem>, args: {
                    item: TItem;
                    isAddNewHandled: boolean;
                }) => void, namespace?: string): void;
                removeOnItemAdded(namespace?: string): void;
                addOnCurrentChanging(fn: (sender: BaseCollection<TItem>, args: {
                    newCurrent: TItem;
                }) => void, namespace?: string): void;
                removeOnCurrentChanging(namespace?: string): void;
                addOnPageChanging(fn: (sender: BaseCollection<TItem>, args: {
                    page: number;
                    isCancel: boolean;
                }) => void, namespace?: string): void;
                removeOnPageChanging(namespace?: string): void;
                addOnErrorsChanged(fn: (sender: BaseCollection<TItem>, args: {
                    item: TItem;
                }) => void, namespace?: string): void;
                removeOnErrorsChanged(namespace?: string): void;
                addOnBeginEdit(fn: (sender: BaseCollection<TItem>, args: {
                    item: TItem;
                }) => void, namespace?: string): void;
                removeOnBeginEdit(namespace?: string): void;
                addOnEndEdit(fn: (sender: BaseCollection<TItem>, args: {
                    item: TItem;
                    isCanceled: boolean;
                }) => void, namespace?: string): void;
                removeOnEndEdit(namespace?: string): void;
                addOnCommitChanges(fn: (sender: BaseCollection<TItem>, args: {
                    item: TItem;
                    isBegin: boolean;
                    isRejected: boolean;
                    changeType: number;
                }) => void, namespace?: string): void;
                removeOnCommitChanges(namespace?: string): void;
                addOnStatusChanged(fn: (sender: BaseCollection<TItem>, args: ICollItemStatusArgs<TItem>) => void, namespace?: string): void;
                removeOnStatusChanged(namespace?: string): void;
                protected _getPKFieldInfos(): IFieldInfo[];
                protected _onCurrentChanging(newCurrent: TItem): void;
                protected _onCurrentChanged(): void;
                protected _onItemStatusChanged(item: TItem, oldChangeType: number): void;
                protected _onFillStart(args: {
                    isBegin: boolean;
                    rowCount: number;
                    time: Date;
                    isPageChanged: boolean;
                }): void;
                protected _onFillEnd(args: {
                    isBegin: boolean;
                    rowCount: number;
                    time: Date;
                    isPageChanged: boolean;
                    resetUI: boolean;
                    fetchedItems: TItem[];
                    newItems: TItem[];
                }): void;
                protected _onItemsChanged(args: {
                    change_type: COLL_CHANGE_TYPE;
                    items: TItem[];
                    pos?: number[];
                    old_key?: string;
                    new_key?: string;
                }): void;
                protected _onItemAdding(item: TItem): void;
                protected _onItemAdded(item: TItem): void;
                protected _createNew(): TItem;
                protected _attach(item: TItem, itemPos?: number): any;
                protected _onRemoved(item: TItem, pos: number): void;
                protected _onPageSizeChanged(): void;
                protected _onPageChanging(): boolean;
                protected _onPageChanged(): void;
                protected _setCurrentItem(v: TItem): void;
                protected _destroyItems(): void;
                protected _isHasProp(prop: string): boolean;
                _getEditingItem(): TItem;
                _getStrValue(val: any, fieldInfo: IFieldInfo): string;
                _onEditing(item: TItem, isBegin: boolean, isCanceled: boolean): void;
                _onCommitChanges(item: TItem, isBegin: boolean, isRejected: boolean, changeType: number): void;
                _validateItem(item: TItem): IValidationInfo;
                _validateItemField(item: TItem, fieldName: string): IValidationInfo;
                _addErrors(item: TItem, errors: IValidationInfo[]): void;
                _addError(item: TItem, fieldName: string, errors: string[]): void;
                _removeError(item: TItem, fieldName: string): void;
                _removeAllErrors(item: TItem): void;
                _getErrors(item: TItem): {
                    [x: string]: string[];
                };
                _onErrorsChanged(item: TItem): void;
                _onItemDeleting(item: TItem): boolean;
                getFieldInfo(fieldName: string): IFieldInfo;
                getFieldNames(): string[];
                getIsClearing(): boolean;
                getFieldInfos(): IFieldInfo[];
                cancelEdit(): void;
                endEdit(): void;
                getItemsWithErrors(): TItem[];
                addNew(): TItem;
                getItemByPos(pos: number): TItem;
                getItemByKey(key: string): TItem;
                findByPK(...vals: any[]): TItem;
                moveFirst(skipDeleted?: boolean): boolean;
                movePrev(skipDeleted?: boolean): boolean;
                moveNext(skipDeleted?: boolean): boolean;
                moveLast(skipDeleted?: boolean): boolean;
                goTo(pos: number): boolean;
                forEach(callback: (item: TItem) => void, thisObj?: any): void;
                removeItem(item: TItem): void;
                getIsHasErrors(): boolean;
                sort(fieldNames: string[], sortOrder: SORT_ORDER): IPromise<any>;
                sortLocal(fieldNames: string[], sortOrder: SORT_ORDER): IPromise<any>;
                sortLocalByFunc(fn: (a: any, b: any) => number): IPromise<any>;
                clear(): void;
                destroy(): void;
                waitForNotLoading(callback: any, callbackArgs: any[], syncCheck: boolean, groupName: string): void;
                toString(): string;
                options: ICollectionOptions;
                currentItem: TItem;
                count: number;
                totalCount: number;
                pageSize: number;
                pageIndex: number;
                items: TItem[];
                isPagingEnabled: boolean;
                permissions: IPermissions;
                isEditing: boolean;
                isLoading: boolean;
                isUpdating: boolean;
                pageCount: number;
            }
            class Collection extends BaseCollection<CollectionItem> {
            }
            interface IPropInfo {
                name: string;
                dtype: number;
            }
            class ListItem extends CollectionItem {
                protected __isNew: boolean;
                protected __coll: Collection;
                constructor(coll: BaseList<ListItem, any>, obj?: any);
                protected _setProp(name: string, val: any): void;
                protected _getProp(name: string): any;
                _resetIsNew(): void;
                toString(): string;
                _isNew: boolean;
                _collection: Collection;
            }
            interface IListItemConstructor<TItem extends ListItem, TObj> {
                new (coll: BaseList<TItem, TObj>, obj?: TObj): TItem;
            }
            class BaseList<TItem extends ListItem, TObj> extends BaseCollection<TItem> {
                protected _type_name: string;
                protected _itemType: IListItemConstructor<TItem, TObj>;
                constructor(itemType: IListItemConstructor<TItem, TObj>, props: IPropInfo[]);
                private _updateFieldMap(props);
                protected _attach(item: TItem): any;
                protected _createNew(): TItem;
                protected _getNewKey(item: any): string;
                fillItems(objArray: TObj[], clearAll?: boolean): void;
                getNewObjects(): TItem[];
                resetNewObjects(): void;
                toString(): string;
            }
            class BaseDictionary<TItem extends ListItem, TObj> extends BaseList<TItem, TObj> {
                private _keyName;
                constructor(itemType: IListItemConstructor<TItem, TObj>, keyName: string, props: IPropInfo[]);
                protected _getNewKey(item: TItem): string;
                protected _onItemAdded(item: TItem): void;
                protected _onRemoved(item: TItem, pos: number): void;
                keyName: string;
            }
            class List extends BaseList<ListItem, any> {
                constructor(type_name: string, properties: any);
            }
            class Dictionary extends BaseDictionary<ListItem, any> {
                constructor(type_name: string, properties: any, keyName: string);
                protected _getNewKey(item: ListItem): string;
            }
        }
    }
}
declare module RIAPP {
    module MOD {
        module template {
            import elviewMOD = RIAPP.MOD.baseElView;
            import mvvmMOD = RIAPP.MOD.mvvm;
            var css: {
                templateContainer: string;
            };
            interface ITemplateEvents {
                templateLoading(template: Template): void;
                templateLoaded(template: Template): void;
                templateUnLoading(template: Template): void;
            }
            interface ITemplateOptions {
                app: Application;
                templateID: string;
                dataContext?: any;
                templEvents?: ITemplateEvents;
            }
            class Template extends BaseObject {
                private _el;
                private _lfTime;
                private _templElView;
                private _promise;
                private _busyTimeOut;
                private _loadedElem;
                private _options;
                constructor(options: ITemplateOptions);
                private _getBindings();
                private _getElViews();
                private _getTemplateElView();
                private _getTemplateEvents();
                private _loadTemplateElAsync(name);
                private _appendIsBusy(el);
                private _removeIsBusy(el);
                private _loadTemplate();
                private _processTemplate(promise, asyncLoad);
                private _updateBindingSource();
                private _unloadTemplate();
                private _cleanUp();
                handleError(error: any, source: any): boolean;
                destroy(): void;
                findElByDataName(name: string): HTMLElement[];
                findElViewsByDataName(name: string): elviewMOD.BaseElView[];
                toString(): string;
                loadedElem: HTMLElement;
                dataContext: any;
                templateID: string;
                el: HTMLElement;
                app: Application;
            }
            class TemplateCommand extends mvvmMOD.Command {
                constructor(fn_action: (sender: TemplateElView, param: {
                    template: Template;
                    isLoaded: boolean;
                }) => void, thisObj: any, fn_canExecute: (sender: TemplateElView, param: {
                    template: Template;
                    isLoaded: boolean;
                }) => boolean);
            }
            class TemplateElView extends elviewMOD.CommandElView implements ITemplateEvents {
                private _template;
                private _isEnabled;
                constructor(app: Application, el: HTMLElement, options: elviewMOD.IViewOptions);
                templateLoading(template: Template): void;
                templateLoaded(template: Template): void;
                templateUnLoading(template: Template): void;
                toString(): string;
                isEnabled: boolean;
                template: Template;
            }
        }
    }
}
declare module RIAPP {
    module MOD {
        module baseContent {
            import utilsMOD = RIAPP.MOD.utils;
            import elviewMOD = RIAPP.MOD.baseElView;
            import bindMOD = RIAPP.MOD.binding;
            import templMOD = RIAPP.MOD.template;
            import collMOD = RIAPP.MOD.collection;
            var css: {
                content: string;
                required: string;
            };
            interface IContent {
                isEditing: boolean;
                dataContext: any;
                destroy(): void;
            }
            interface ITemplateInfo {
                displayID?: string;
                editID?: string;
            }
            interface IDataContentAttr {
                fieldName?: string;
                readOnly?: boolean;
                css?: {
                    displayCss: string;
                    editCss: string;
                };
                template?: ITemplateInfo;
                name?: string;
                options?: any;
            }
            interface IExternallyCachable {
                addOnObjectCreated(fn: (sender: any, args: {
                    objectKey: string;
                    object: BaseObject;
                    isCachedExternally: boolean;
                }) => void, namespace?: string): void;
                addOnObjectNeeded(fn: (sender: any, args: {
                    objectKey: string;
                    object: BaseObject;
                }) => void, namespace?: string): void;
            }
            interface IContentOptions {
                name?: string;
                readOnly?: boolean;
                initContentFn?: (content: IExternallyCachable) => void;
                fieldInfo?: collMOD.IFieldInfo;
                bindingInfo?: bindMOD.IBindingInfo;
                displayInfo?: {
                    displayCss?: string;
                    editCss?: string;
                };
                templateInfo?: ITemplateInfo;
                fieldName?: string;
                options?: any;
            }
            interface IConstructorContentOptions {
                parentEl: HTMLElement;
                contentOptions: IContentOptions;
                dataContext: any;
                isEditing: boolean;
            }
            interface IContentType {
                new (app: Application, options: IConstructorContentOptions): IContent;
            }
            interface IContentFactory {
                getContentType(options: IContentOptions): IContentType;
                createContent(options: IConstructorContentOptions): IContent;
                isExternallyCachable(contentType: IContentType): boolean;
            }
            function parseContentAttr(content_attr: string): IContentOptions;
            function getBindingOptions(app: Application, bindInfo: bindMOD.IBindingInfo, defaultTarget: BaseObject, defaultSource: any): bindMOD.IBindingOptions;
            class BindingContent extends BaseObject implements IContent {
                protected _parentEl: HTMLElement;
                protected _el: HTMLElement;
                protected _options: IContentOptions;
                protected _isReadOnly: boolean;
                protected _isEditing: boolean;
                protected _dataContext: any;
                protected _lfScope: utilsMOD.LifeTimeScope;
                protected _target: elviewMOD.BaseElView;
                protected _app: Application;
                constructor(app: Application, options: IConstructorContentOptions);
                protected _init(): void;
                handleError(error: any, source: any): boolean;
                protected _updateCss(): void;
                protected _canBeEdited(): boolean;
                protected _createTargetElement(): elviewMOD.BaseElView;
                protected _getBindingOption(bindingInfo: bindMOD.IBindingInfo, target: BaseObject, dataContext: any, targetPath: string): bindMOD.IBindingOptions;
                protected _getBindings(): bindMOD.Binding[];
                protected _updateBindingSource(): void;
                protected _cleanUp(): void;
                getFieldInfo(): collMOD.IFieldInfo;
                protected _getBindingInfo(): bindMOD.IBindingInfo;
                protected _getDisplayInfo(): {
                    displayCss?: string;
                    editCss?: string;
                };
                protected _getElementView(el: HTMLElement, view_info: {
                    name: string;
                    options: any;
                }): elviewMOD.BaseElView;
                update(): void;
                destroy(): void;
                toString(): string;
                parentEl: HTMLElement;
                target: elviewMOD.BaseElView;
                isEditing: boolean;
                dataContext: any;
                app: Application;
            }
            class TemplateContent extends BaseObject implements IContent, templMOD.ITemplateEvents {
                private _parentEl;
                private _template;
                private _templateInfo;
                private _isEditing;
                private _dataContext;
                private _app;
                private _isDisabled;
                constructor(app: Application, options: IConstructorContentOptions);
                handleError(error: any, source: any): boolean;
                templateLoading(template: templMOD.Template): void;
                templateLoaded(template: templMOD.Template): void;
                templateUnLoading(template: templMOD.Template): void;
                private _createTemplate();
                update(): void;
                protected _cleanUp(): void;
                destroy(): void;
                toString(): string;
                app: Application;
                parentEl: HTMLElement;
                template: templMOD.Template;
                isEditing: boolean;
                dataContext: any;
            }
            class BoolContent extends BindingContent {
                protected _init(): void;
                protected _cleanUp(): void;
                protected _createCheckBoxView(): elviewMOD.CheckBoxElView;
                protected _createTargetElement(): elviewMOD.BaseElView;
                protected _updateCss(): void;
                destroy(): void;
                update(): void;
                toString(): string;
            }
            class DateContent extends BindingContent {
                _fn_cleanup: () => void;
                constructor(app: Application, options: IConstructorContentOptions);
                protected _getBindingOption(bindingInfo: bindMOD.IBindingInfo, tgt: BaseObject, dctx: any, targetPath: string): bindMOD.IBindingOptions;
                protected _createTargetElement(): elviewMOD.BaseElView;
                toString(): string;
            }
            class DateTimeContent extends BindingContent {
                protected _getBindingOption(bindingInfo: bindMOD.IBindingInfo, tgt: BaseObject, dctx: any, targetPath: string): bindMOD.IBindingOptions;
                toString(): string;
            }
            class NumberContent extends BindingContent {
                static __allowedKeys: number[];
                private _allowedKeys;
                protected _getBindingOption(bindingInfo: bindMOD.IBindingInfo, tgt: BaseObject, dctx: any, targetPath: string): bindMOD.IBindingOptions;
                update(): void;
                protected _previewKeyPress(keyCode: number, value: string): boolean;
                toString(): string;
            }
            class StringContent extends BindingContent {
                static __allowedKeys: number[];
                private _allowedKeys;
                update(): void;
                protected _previewKeyPress(fieldInfo: collMOD.IFieldInfo, keyCode: number, value: string): boolean;
                toString(): string;
            }
            class MultyLineContent extends BindingContent {
                static __allowedKeys: number[];
                private _allowedKeys;
                constructor(app: Application, options: IConstructorContentOptions);
                protected _createTargetElement(): elviewMOD.BaseElView;
                update(): void;
                protected _previewKeyPress(fieldInfo: collMOD.IFieldInfo, keyCode: number, value: string): boolean;
                toString(): string;
            }
            class ContentFactory implements IContentFactory {
                private _app;
                private _nextFactory;
                constructor(app: Application, nextFactory?: IContentFactory);
                getContentType(options: IContentOptions): IContentType;
                createContent(options: IConstructorContentOptions): IContent;
                isExternallyCachable(contentType: IContentType): boolean;
                app: Application;
            }
            function initModule(app: Application): typeof baseContent;
        }
    }
}
declare module RIAPP {
    module MOD {
        module dataform {
            import elviewMOD = RIAPP.MOD.baseElView;
            var css: {
                dataform: string;
            };
            interface IDataFormOptions {
                app: Application;
                el: HTMLElement;
            }
            class DataForm extends BaseObject {
                private _DATA_CONTENT_SELECTOR;
                private _el;
                private _$el;
                private _objId;
                private _dataContext;
                private _isEditing;
                private _content;
                private _lfTime;
                private _contentCreated;
                private _supportEdit;
                private _supportErrNotify;
                private _parentDataForm;
                private _errors;
                private _app;
                private _isInsideTemplate;
                constructor(options: IDataFormOptions);
                handleError(error: any, source: any): boolean;
                private _getBindings();
                private _getElViews();
                private _createContent();
                private _updateContent();
                private _onDSErrorsChanged();
                private _bindDS();
                private _unbindDS();
                private _clearContent();
                destroy(): void;
                toString(): string;
                app: Application;
                el: HTMLElement;
                dataContext: BaseObject;
                isEditing: boolean;
                validationErrors: IValidationInfo[];
                isInsideTemplate: boolean;
            }
            class DataFormElView extends elviewMOD.BaseElView {
                private _form;
                private _options;
                constructor(app: Application, el: HTMLSelectElement, options: elviewMOD.IViewOptions);
                protected _getErrorTipInfo(errors: IValidationInfo[]): string;
                protected _updateErrorUI(el: HTMLElement, errors: IValidationInfo[]): void;
                destroy(): void;
                toString(): string;
                dataContext: BaseObject;
                form: DataForm;
            }
        }
    }
}
declare module RIAPP {
    module MOD {
        module dynacontent {
            import elviewMOD = RIAPP.MOD.baseElView;
            import templMOD = RIAPP.MOD.template;
            interface IAnimation {
                beforeShow(template: templMOD.Template, isFirstShow: boolean): void;
                show(template: templMOD.Template, isFirstShow: boolean): IVoidPromise;
                beforeHide(template: templMOD.Template): void;
                hide(template: templMOD.Template): IVoidPromise;
                stop(): void;
                isAnimateFirstShow: boolean;
            }
            interface IDynaContentOptions extends elviewMOD.IViewOptions {
                animate?: string;
            }
            class DynaContentElView extends elviewMOD.BaseElView implements templMOD.ITemplateEvents {
                private _dataContext;
                private _prevTemplateID;
                private _templateID;
                private _template;
                private _animation;
                constructor(app: Application, el: HTMLElement, options: IDynaContentOptions);
                templateLoading(template: templMOD.Template): void;
                templateLoaded(template: templMOD.Template): void;
                templateUnLoading(template: templMOD.Template): void;
                private _templateChanging(oldName, newName);
                destroy(): void;
                template: templMOD.Template;
                templateID: string;
                dataContext: any;
                animation: IAnimation;
            }
        }
    }
}
declare module RIAPP {
    module MOD {
        module datepicker {
            import elviewMOD = RIAPP.MOD.baseElView;
            class Datepicker extends BaseObject implements IDatepicker {
                private _datepickerRegion;
                private _dateFormat;
                constructor();
                toString(): string;
                attachTo($el: any, options?: {
                    dateFormat?: string;
                }): void;
                detachFrom($el: any): void;
                parseDate(str: string): Date;
                formatDate(date: Date): string;
                dateFormat: string;
                datepickerRegion: string;
                datePickerFn: any;
            }
            interface IDatePickerOptions extends elviewMOD.ITextBoxOptions {
                datepicker?: any;
            }
            class DatePickerElView extends elviewMOD.TextBoxElView {
                protected _init(options: IDatePickerOptions): void;
                destroy(): void;
                toString(): string;
            }
        }
    }
}
declare module RIAPP {
    module MOD {
        module tabs {
            import mvvmMOD = RIAPP.MOD.mvvm;
            import elviewMOD = MOD.baseElView;
            class TabsElView extends elviewMOD.BaseElView {
                private _tabsEventCommand;
                private _tabOpts;
                protected _init(options: any): void;
                protected _createTabs(): void;
                protected _destroyTabs(): void;
                invokeTabsEvent(eventName: string, args: any): void;
                destroy(): void;
                toString(): string;
                tabsEventCommand: mvvmMOD.ICommand;
                tabIndex: number;
            }
        }
    }
}
declare module RIAPP {
    module MOD {
        module listbox {
            import bindMOD = RIAPP.MOD.binding;
            import collMOD = MOD.collection;
            import elviewMOD = MOD.baseElView;
            import contentMOD = RIAPP.MOD.baseContent;
            interface IListBoxOptions {
                valuePath: string;
                textPath: string;
            }
            interface IListBoxConstructorOptions extends IListBoxOptions {
                app: Application;
                el: HTMLSelectElement;
                dataSource: collMOD.BaseCollection<collMOD.CollectionItem>;
            }
            interface IMappedItem {
                item: collMOD.CollectionItem;
                op: {
                    text: string;
                    value: any;
                    index: number;
                };
            }
            class ListBox extends BaseObject {
                private _$el;
                private _objId;
                private _isRefreshing;
                private _isDSFilling;
                private _selectedItem;
                private _prevSelected;
                private _keyMap;
                private _valMap;
                private _savedValue;
                private _tempValue;
                private _options;
                constructor(options: IListBoxConstructorOptions);
                destroy(): void;
                protected _onChanged(): void;
                protected _getStringValue(item: collMOD.CollectionItem): string;
                protected _getValue(item: collMOD.CollectionItem): any;
                protected _getText(item: collMOD.CollectionItem): string;
                protected _onDSCollectionChanged(args: collMOD.ICollChangedArgs<collMOD.CollectionItem>): void;
                protected _onDSFill(args: collMOD.ICollFillArgs<collMOD.CollectionItem>): void;
                protected _onEdit(item: collMOD.CollectionItem, isBegin: boolean, isCanceled: boolean): void;
                protected _onStatusChanged(item: collMOD.CollectionItem, oldChangeType: number): void;
                protected _onCommitChanges(item: collMOD.CollectionItem, isBegin: boolean, isRejected: boolean, changeType: collMOD.STATUS): void;
                private _bindDS();
                private _unbindDS();
                private _addOption(item, first);
                private _mapByValue();
                private _resetText();
                private _removeOption(item);
                private _clear(isDestroy);
                private _refresh();
                private _findItemIndex(item);
                protected _setIsEnabled(el: HTMLSelectElement, v: boolean): void;
                protected _getIsEnabled(el: HTMLSelectElement): boolean;
                clear(): void;
                findItemByValue(val: any): collMOD.CollectionItem;
                getTextByValue(val: any): string;
                toString(): string;
                dataSource: collMOD.BaseCollection<collMOD.CollectionItem>;
                selectedValue: any;
                selectedItem: collMOD.CollectionItem;
                valuePath: string;
                textPath: string;
                isEnabled: boolean;
                el: HTMLSelectElement;
            }
            interface ISelectViewOptions extends IListBoxOptions, elviewMOD.IViewOptions {
            }
            class SelectElView extends elviewMOD.BaseElView {
                private _listBox;
                private _options;
                constructor(app: Application, el: HTMLSelectElement, options: ISelectViewOptions);
                destroy(): void;
                toString(): string;
                isEnabled: boolean;
                el: HTMLSelectElement;
                dataSource: collMOD.BaseCollection<collMOD.CollectionItem>;
                selectedValue: any;
                selectedItem: collMOD.CollectionItem;
                listBox: ListBox;
            }
            interface ILookupOptions {
                dataSource: string;
                valuePath: string;
                textPath: string;
            }
            class LookupContent extends contentMOD.BindingContent implements contentMOD.IExternallyCachable {
                private _spanView;
                private _valBinding;
                private _listBinding;
                private _selectView;
                private _isListBoxCachedExternally;
                private _value;
                constructor(app: Application, options: contentMOD.IConstructorContentOptions);
                protected _init(): void;
                protected _getEventNames(): string[];
                addOnObjectCreated(fn: (sender: any, args: {
                    objectKey: string;
                    object: BaseObject;
                    isCachedExternally: boolean;
                }) => void, namespace?: string): void;
                removeOnObjectCreated(namespace?: string): void;
                addOnObjectNeeded(fn: (sender: any, args: {
                    objectKey: string;
                    object: BaseObject;
                }) => void, namespace?: string): void;
                removeOnObjectNeeded(namespace?: string): void;
                protected _getSelectView(): SelectElView;
                protected _createSelectElView(el: HTMLSelectElement, options: ISelectViewOptions): SelectElView;
                protected _updateTextValue(): void;
                protected _getLookupText(): string;
                protected _getSpanView(): elviewMOD.SpanElView;
                update(): void;
                protected _createTargetElement(): elviewMOD.BaseElView;
                protected _cleanUp(): void;
                protected _updateBindingSource(): void;
                protected _bindToValue(): bindMOD.Binding;
                protected _bindToList(selectView: SelectElView): bindMOD.Binding;
                destroy(): void;
                toString(): string;
                value: any;
            }
            class ContentFactory implements contentMOD.IContentFactory {
                private _app;
                private _nextFactory;
                constructor(app: Application, nextFactory?: contentMOD.IContentFactory);
                getContentType(options: contentMOD.IContentOptions): contentMOD.IContentType;
                createContent(options: contentMOD.IConstructorContentOptions): contentMOD.IContent;
                isExternallyCachable(contentType: contentMOD.IContentType): boolean;
                app: Application;
            }
            function initModule(app: Application): typeof listbox;
        }
    }
}
declare module RIAPP {
    module MOD {
        module datadialog {
            import templMOD = RIAPP.MOD.template;
            enum DIALOG_ACTION {
                Default = 0,
                StayOpen = 1,
            }
            interface IDialogConstructorOptions {
                dataContext?: any;
                templateID: string;
                width?: any;
                height?: any;
                title?: string;
                submitOnOK?: boolean;
                canRefresh?: boolean;
                canCancel?: boolean;
                fn_OnClose?: (dialog: DataEditDialog) => void;
                fn_OnOK?: (dialog: DataEditDialog) => number;
                fn_OnShow?: (dialog: DataEditDialog) => void;
                fn_OnCancel?: (dialog: DataEditDialog) => number;
                fn_OnTemplateCreated?: (template: templMOD.Template) => void;
                fn_OnTemplateDestroy?: (template: templMOD.Template) => void;
            }
            interface IButton {
                id: string;
                text: string;
                class: string;
                click: () => void;
            }
            class DataEditDialog extends BaseObject implements templMOD.ITemplateEvents {
                private _objId;
                private _dataContext;
                private _templateID;
                private _submitOnOK;
                private _canRefresh;
                private _canCancel;
                private _fn_OnClose;
                private _fn_OnOK;
                private _fn_OnShow;
                private _fn_OnCancel;
                private _fn_OnTemplateCreated;
                private _fn_OnTemplateDestroy;
                private _isEditable;
                private _template;
                private _$template;
                private _result;
                private _options;
                private _dialogCreated;
                private _fn_submitOnOK;
                private _app;
                private _currentSelectable;
                constructor(app: Application, options: IDialogConstructorOptions);
                handleError(error: any, source: any): boolean;
                addOnClose(fn: (sender: any, args: {}) => void, namespace?: string): void;
                removeOnClose(namespace?: string): void;
                addOnRefresh(fn: (sender: any, args: {
                    isHandled: boolean;
                }) => void, namespace?: string): void;
                removeOnRefresh(namespace?: string): void;
                protected _updateIsEditable(): void;
                protected _createDialog(): void;
                protected _getEventNames(): string[];
                templateLoading(template: templMOD.Template): void;
                templateLoaded(template: templMOD.Template): void;
                templateUnLoading(template: templMOD.Template): void;
                protected _createTemplate(): templMOD.Template;
                protected _destroyTemplate(): void;
                protected _getButtons(): IButton[];
                protected _getOkButton(): JQuery;
                protected _getCancelButton(): JQuery;
                protected _getRefreshButton(): JQuery;
                protected _getAllButtons(): JQuery[];
                protected _disableButtons(isDisable: boolean): void;
                protected _onOk(): void;
                protected _onCancel(): void;
                protected _onRefresh(): void;
                protected _onClose(): void;
                protected _onShow(): void;
                show(): void;
                hide(): void;
                getOption(name: string): any;
                setOption(name: string, value: any): void;
                destroy(): void;
                app: Application;
                dataContext: any;
                result: string;
                template: templMOD.Template;
                isSubmitOnOK: boolean;
                width: any;
                height: any;
                title: any;
                canRefresh: boolean;
                canCancel: boolean;
            }
        }
    }
}
declare module RIAPP {
    module MOD {
        module datagrid {
            import contentMOD = RIAPP.MOD.baseContent;
            import collMOD = RIAPP.MOD.collection;
            import templMOD = RIAPP.MOD.template;
            var css: {
                container: string;
                dataTable: string;
                columnInfo: string;
                column: string;
                cellDiv: string;
                headerDiv: string;
                wrapDiv: string;
                dataColumn: string;
                rowCollapsed: string;
                rowExpanded: string;
                rowExpander: string;
                columnSelected: string;
                rowSelected: string;
                rowActions: string;
                rowDetails: string;
                rowSelector: string;
                rowHighlight: string;
                rowDeleted: string;
                rowError: string;
                nobr: string;
                colSortable: string;
                colSortAsc: string;
                colSortDesc: string;
            };
            enum ROW_ACTION {
                OK = 0,
                EDIT = 1,
                CANCEL = 2,
                DELETE = 3,
            }
            class RowSelectContent extends contentMOD.BoolContent {
                _canBeEdited(): boolean;
                toString(): string;
            }
            interface ICellOptions {
                row: Row;
                td: HTMLTableCellElement;
                column: BaseColumn;
                num: number;
            }
            class BaseCell extends BaseObject {
                protected _row: Row;
                protected _el: HTMLTableCellElement;
                protected _column: BaseColumn;
                protected _div: HTMLElement;
                protected _clickTimeOut: number;
                private _num;
                constructor(options: ICellOptions);
                protected _init(): void;
                protected _onCellClicked(row?: Row): void;
                protected _onDblClicked(row?: Row): void;
                handleError(error: any, source: any): boolean;
                click(): void;
                scrollIntoView(isUp: boolean): void;
                destroy(): void;
                toString(): string;
                el: HTMLTableCellElement;
                row: Row;
                column: BaseColumn;
                grid: DataGrid;
                item: collMOD.CollectionItem;
                uniqueID: string;
                num: number;
            }
            class DataCell extends BaseCell {
                private _content;
                private _stateCss;
                constructor(options: ICellOptions);
                protected _init(): void;
                click(): void;
                _beginEdit(): void;
                _endEdit(isCanceled: any): void;
                _setState(css: string): void;
                destroy(): void;
                toString(): string;
                column: DataColumn;
            }
            class ExpanderCell extends BaseCell {
                protected _init(): void;
                protected _onCellClicked(row?: Row): void;
                toggleImage(): void;
                toString(): string;
            }
            class ActionsCell extends BaseCell {
                private _isEditing;
                constructor(options: ICellOptions);
                protected _init(): void;
                destroy(): void;
                protected _createButtons(editing: boolean): void;
                update(): void;
                toString(): string;
                isCanEdit: boolean;
                isCanDelete: boolean;
            }
            class RowSelectorCell extends BaseCell {
                private _content;
                protected _init(): void;
                destroy(): void;
                toString(): string;
            }
            class DetailsCell extends BaseObject implements templMOD.ITemplateEvents {
                private _row;
                private _el;
                private _template;
                constructor(options: {
                    row: DetailsRow;
                    td: HTMLTableCellElement;
                    details_id: string;
                });
                protected _init(options: {
                    td: HTMLElement;
                    details_id: string;
                }): void;
                templateLoading(template: templMOD.Template): void;
                templateLoaded(template: templMOD.Template): void;
                templateUnLoading(template: templMOD.Template): void;
                destroy(): void;
                toString(): string;
                el: HTMLTableCellElement;
                row: DetailsRow;
                grid: DataGrid;
                item: any;
                template: templMOD.Template;
            }
            class Row extends BaseObject {
                private _grid;
                private _el;
                private _item;
                private _cells;
                private _objId;
                private _expanderCell;
                private _actionsCell;
                private _rowSelectorCell;
                private _isCurrent;
                private _isDeleted;
                private _isSelected;
                constructor(grid: DataGrid, options: {
                    tr: HTMLElement;
                    item: collMOD.CollectionItem;
                });
                handleError(error: any, source: any): boolean;
                private _createCells();
                private _createCell(col, num);
                protected _setState(css: string): void;
                _onBeginEdit(): void;
                _onEndEdit(isCanceled: boolean): void;
                beginEdit(): boolean;
                endEdit(): boolean;
                cancelEdit(): boolean;
                destroy(): void;
                deleteRow(): void;
                updateErrorState(): void;
                scrollIntoView(isUp: boolean): void;
                toString(): string;
                el: HTMLElement;
                grid: DataGrid;
                item: collMOD.CollectionItem;
                cells: BaseCell[];
                columns: BaseColumn[];
                uniqueID: string;
                itemKey: string;
                isCurrent: boolean;
                isSelected: boolean;
                isExpanded: boolean;
                expanderCell: ExpanderCell;
                actionsCell: ActionsCell;
                isDeleted: boolean;
                isEditing: boolean;
                isHasStateField: boolean;
            }
            class DetailsRow extends BaseObject {
                private _grid;
                private _el;
                private _item;
                private _cell;
                private _parentRow;
                private _objId;
                private _$el;
                private _isFirstShow;
                constructor(options: {
                    grid: DataGrid;
                    tr: HTMLTableRowElement;
                    details_id: string;
                });
                private _createCell(details_id);
                protected _setParentRow(row: Row): void;
                private _initShow();
                private _show(onEnd);
                private _hide(onEnd);
                destroy(): void;
                toString(): string;
                el: HTMLTableRowElement;
                $el: JQuery;
                grid: DataGrid;
                item: any;
                cell: DetailsCell;
                uniqueID: string;
                itemKey: any;
                parentRow: Row;
            }
            interface IColumnInfo {
                type?: string;
                title?: string;
                sortable?: boolean;
                sortMemberName?: string;
                colCellCss?: string;
                rowCellCss?: string;
                width?: any;
                content?: contentMOD.IContentOptions;
            }
            class BaseColumn extends BaseObject {
                private _grid;
                private _el;
                private _options;
                private _isSelected;
                private _objId;
                private _$extcol;
                private _$div;
                constructor(grid: DataGrid, options: {
                    th: HTMLTableHeaderCellElement;
                    colinfo: IColumnInfo;
                });
                protected _init(): void;
                destroy(): void;
                scrollIntoView(isUp: boolean): void;
                protected _onColumnClicked(): void;
                toString(): string;
                uniqueID: string;
                el: HTMLTableHeaderCellElement;
                $div: JQuery;
                $extcol: JQuery;
                grid: DataGrid;
                options: IColumnInfo;
                title: string;
                isSelected: boolean;
            }
            class DataColumn extends BaseColumn {
                private _sortOrder;
                private _objCache;
                constructor(grid: DataGrid, options: {
                    th: HTMLTableHeaderCellElement;
                    colinfo: IColumnInfo;
                });
                protected _init(): void;
                protected _onColumnClicked(): void;
                protected _cacheObject(key: string, obj: BaseObject): void;
                protected _getCachedObject(key: string): BaseObject;
                _getInitContentFn(): (content: contentMOD.IExternallyCachable) => void;
                destroy(): void;
                toString(): string;
                isSortable: boolean;
                sortMemberName: string;
                sortOrder: collMOD.SORT_ORDER;
            }
            class ExpanderColumn extends BaseColumn {
                protected _init(): void;
                toString(): string;
            }
            class RowSelectorColumn extends BaseColumn {
                private _val;
                private _$chk;
                protected _init(): void;
                protected _onCheckBoxClicked(isChecked: boolean): void;
                toString(): string;
                checked: boolean;
                destroy(): void;
            }
            interface IActionsColumnInfo extends IColumnInfo {
                img_ok?: string;
                img_cancel?: string;
                img_edit?: string;
                img_delete?: string;
            }
            class ActionsColumn extends BaseColumn {
                protected _init(): void;
                protected _onOk(cell: ActionsCell): void;
                protected _onCancel(cell: ActionsCell): void;
                protected _onDelete(cell: ActionsCell): void;
                protected _onEdit(cell: ActionsCell): void;
                toString(): string;
                destroy(): void;
            }
            interface IGridOptions {
                isUseScrollInto: boolean;
                isUseScrollIntoDetails: boolean;
                containerCss: string;
                wrapCss: string;
                headerCss: string;
                rowStateField: string;
                isCanEdit: boolean;
                isCanDelete: boolean;
                isHandleAddNew: boolean;
                details?: {
                    templateID: string;
                };
                editor?: datadialog.IDialogConstructorOptions;
            }
            interface IGridConstructorOptions extends IGridOptions {
                app: Application;
                el: HTMLTableElement;
                dataSource: collMOD.BaseCollection<collMOD.CollectionItem>;
                animation: IAnimation;
            }
            class DataGrid extends BaseObject implements ISelectable {
                private _options;
                _$tableEl: JQuery;
                _isClearing: boolean;
                private _tableEl;
                private _name;
                private _objId;
                private _rowMap;
                private _rows;
                private _columns;
                private _isDSFilling;
                private _currentRow;
                private _expandedRow;
                private _details;
                private _expanderCol;
                private _actionsCol;
                private _rowSelectorCol;
                private _currentColumn;
                private _editingRow;
                private _isSorting;
                private _dialog;
                private _$headerDiv;
                private _$wrapDiv;
                private _$contaner;
                _columnWidthChecker: () => void;
                constructor(options: IGridConstructorOptions);
                protected _getEventNames(): string[];
                addOnRowExpanded(fn: (sender: DataGrid, args: {
                    old_expandedRow: Row;
                    expandedRow: Row;
                    isExpanded: boolean;
                }) => void, namespace?: string): void;
                removeOnRowExpanded(namespace?: string): void;
                addOnRowSelected(fn: (sender: DataGrid, args: {
                    row: Row;
                }) => void, namespace?: string): void;
                removeOnRowSelected(namespace?: string): void;
                addOnPageChanged(fn: (sender: DataGrid, args: {}) => void, namespace?: string): void;
                removeOnPageChanged(namespace?: string): void;
                addOnRowStateChanged(fn: (sender: DataGrid, args: {
                    row: Row;
                    val: any;
                    css: string;
                }) => void, namespace?: string): void;
                removeOnRowStateChanged(namespace?: string): void;
                addOnCellDblClicked(fn: (sender: DataGrid, args: {
                    cell: BaseCell;
                }) => void, namespace?: string): void;
                removeOnCellDblClicked(namespace?: string): void;
                addOnRowAction(fn: (sender: DataGrid, args: {
                    row: Row;
                    action: ROW_ACTION;
                }) => void, namespace?: string): void;
                removeOnRowAction(namespace?: string): void;
                _isRowExpanded(row: Row): boolean;
                _appendToHeader(el: HTMLElement): void;
                _setCurrentColumn(column: BaseColumn): void;
                _onRowStateChanged(row: Row, val: any): any;
                _onCellDblClicked(cell: BaseCell): void;
                _onRowSelectionChanged(row: Row): void;
                _resetColumnsSort(): void;
                _getLastRow(): Row;
                _removeRow(row: Row): void;
                _onKeyDown(key: number, event: Event): void;
                _onKeyUp(key: number, event: Event): void;
                _expandDetails(parentRow: Row, expanded: boolean): void;
                protected _parseColumnAttr(column_attr: string, content_attr: string): IColumnInfo;
                protected _findUndeleted(row: Row, isUp: boolean): Row;
                protected _updateCurrent(row: Row, withScroll: boolean): void;
                protected _scrollToCurrent(isUp: boolean): void;
                handleError(error: any, source: any): boolean;
                protected _onDSCurrentChanged(): void;
                protected _onDSCollectionChanged(args: collMOD.ICollChangedArgs<collMOD.CollectionItem>): void;
                protected _onDSFill(args: collMOD.ICollFillArgs<collMOD.CollectionItem>): void;
                protected _onPageChanged(): void;
                protected _onItemEdit(item: any, isBegin: any, isCanceled: any): void;
                protected _onItemAdded(args: collMOD.ICollItemAddedArgs<collMOD.CollectionItem>): void;
                protected _onItemStatusChanged(item: collMOD.CollectionItem, oldChangeType: collMOD.STATUS): void;
                protected _onDSErrorsChanged(item: collMOD.CollectionItem): void;
                protected _bindDS(): void;
                protected _unbindDS(): void;
                protected _clearGrid(): void;
                protected _updateColsDim(): void;
                protected _wrapTable(): void;
                protected _unWrapTable(): void;
                protected _createColumns(): void;
                protected _createColumn(options: {
                    th: HTMLTableHeaderCellElement;
                    colinfo: IColumnInfo;
                }): BaseColumn;
                protected _appendItems(newItems: collMOD.CollectionItem[]): void;
                protected _refreshGrid(): void;
                protected _createRowForItem(parent: any, item: any, pos?: number): Row;
                protected _createDetails(): DetailsRow;
                sortByColumn(column: DataColumn): void;
                selectRows(isSelect: boolean): void;
                findRowByItem(item: collMOD.CollectionItem): Row;
                collapseDetails(): void;
                getSelectedRows(): any[];
                showEditDialog(): boolean;
                scrollToCurrent(isUp: boolean): void;
                addNew(): void;
                destroy(): void;
                app: Application;
                $container: JQuery;
                options: IGridConstructorOptions;
                _tBodyEl: Element;
                _tHeadEl: HTMLTableSectionElement;
                _tFootEl: HTMLTableSectionElement;
                _tHeadRow: HTMLTableRowElement;
                _tHeadCells: any[];
                containerEl: HTMLElement;
                uniqueID: string;
                name: string;
                dataSource: collMOD.BaseCollection<collMOD.CollectionItem>;
                rows: Row[];
                columns: BaseColumn[];
                currentRow: Row;
                editingRow: Row;
                isCanEdit: boolean;
                isCanDelete: boolean;
                isCanAddNew: boolean;
                isUseScrollInto: boolean;
                animation: IAnimation;
            }
            interface IGridViewOptions extends IGridOptions, baseElView.IViewOptions {
            }
            class GridElView extends baseElView.BaseElView {
                private _grid;
                private _gridEventCommand;
                private _options;
                toString(): string;
                protected _init(options: IGridViewOptions): void;
                destroy(): void;
                private _createGrid();
                private _bindGridEvents();
                invokeGridEvent(eventName: any, args: any): void;
                dataSource: collMOD.BaseCollection<collMOD.CollectionItem>;
                grid: DataGrid;
                gridEventCommand: mvvm.ICommand;
                animation: IAnimation;
            }
        }
    }
}
declare module RIAPP {
    module MOD {
        module pager {
            import collMOD = RIAPP.MOD.collection;
            var css: {
                pager: string;
                info: string;
                currentPage: string;
                otherPage: string;
            };
            interface IPagerOptions {
                showTip?: boolean;
                showInfo?: boolean;
                showNumbers?: boolean;
                showFirstAndLast?: boolean;
                showPreviousAndNext?: boolean;
                useSlider?: boolean;
                hideOnSinglePage?: boolean;
                sliderSize?: number;
            }
            interface IPagerConstructorOptions extends IPagerOptions {
                app: Application;
                el: HTMLElement;
                dataSource: collMOD.BaseCollection<collMOD.CollectionItem>;
            }
            class Pager extends BaseObject {
                private _$el;
                private _objId;
                private _options;
                private _rowsPerPage;
                private _rowCount;
                private _currentPage;
                constructor(options: IPagerConstructorOptions);
                protected _createElement(tag: string): JQuery;
                protected _render(): void;
                protected _setDSPageIndex(page: number): void;
                protected _onPageSizeChanged(ds: collMOD.BaseCollection<collMOD.CollectionItem>): void;
                protected _onPageIndexChanged(ds: collMOD.BaseCollection<collMOD.CollectionItem>): void;
                protected _onTotalCountChanged(ds: collMOD.BaseCollection<collMOD.CollectionItem>): void;
                destroy(): void;
                protected _bindDS(): void;
                protected _unbindDS(): void;
                protected _clearContent(): void;
                protected _createLink(page: number, text: string, tip?: string): JQuery;
                protected _createFirst(): JQuery;
                protected _createPrevious(): JQuery;
                protected _createCurrent(): JQuery;
                protected _createOther(page: number): JQuery;
                protected _createNext(): JQuery;
                protected _createLast(): JQuery;
                protected _buildTip(page: number): string;
                toString(): string;
                app: Application;
                el: HTMLElement;
                dataSource: collMOD.BaseCollection<collMOD.CollectionItem>;
                pageCount: any;
                rowCount: number;
                rowsPerPage: number;
                currentPage: number;
                useSlider: boolean;
                sliderSize: number;
                hideOnSinglePage: boolean;
                showTip: boolean;
                showInfo: boolean;
                showFirstAndLast: boolean;
                showPreviousAndNext: boolean;
                showNumbers: boolean;
            }
            interface IPagerViewOptions extends IPagerOptions, baseElView.IViewOptions {
            }
            class PagerElView extends baseElView.BaseElView {
                private _options;
                private _pager;
                constructor(app: Application, el: HTMLElement, options: IPagerViewOptions);
                destroy(): void;
                toString(): string;
                dataSource: collMOD.BaseCollection<collMOD.CollectionItem>;
                pager: Pager;
            }
        }
    }
}
declare module RIAPP {
    module MOD {
        module stackpanel {
            import templMOD = RIAPP.MOD.template;
            import collMOD = RIAPP.MOD.collection;
            var css: {
                stackpanel: string;
                item: string;
                currentItem: string;
            };
            interface IStackPanelOptions {
                orientation?: string;
                templateID: string;
            }
            interface IStackPanelConstructorOptions extends IStackPanelOptions {
                app: Application;
                el: HTMLElement;
                dataSource: collMOD.BaseCollection<collMOD.CollectionItem>;
            }
            class StackPanel extends BaseObject implements ISelectable, templMOD.ITemplateEvents {
                private _$el;
                private _objId;
                private _isDSFilling;
                private _currentItem;
                private _itemMap;
                private _options;
                constructor(options: IStackPanelConstructorOptions);
                protected _getEventNames(): string[];
                templateLoading(template: templMOD.Template): void;
                templateLoaded(template: templMOD.Template): void;
                templateUnLoading(template: templMOD.Template): void;
                addOnItemClicked(fn: (sender: StackPanel, args: {
                    item: collMOD.CollectionItem;
                }) => void, namespace?: string): void;
                removeOnItemClicked(namespace?: string): void;
                _onKeyDown(key: number, event: Event): void;
                _onKeyUp(key: number, event: Event): void;
                protected _updateCurrent(item: collMOD.CollectionItem, withScroll: boolean): void;
                protected _onDSCurrentChanged(): void;
                protected _onDSCollectionChanged(args: collMOD.ICollChangedArgs<collMOD.CollectionItem>): void;
                protected _onDSFill(args: collMOD.ICollFillArgs<collMOD.CollectionItem>): void;
                protected _onItemStatusChanged(item: collMOD.CollectionItem, oldChangeType: number): void;
                protected _createTemplate(item: collMOD.CollectionItem): templMOD.Template;
                protected _appendItems(newItems: collMOD.CollectionItem[]): void;
                protected _appendItem(item: collMOD.CollectionItem): void;
                protected _bindDS(): void;
                protected _unbindDS(): void;
                protected _createElement(tag: string): JQuery;
                protected _onItemClicked(div: HTMLElement, item: collMOD.CollectionItem): void;
                destroy(): void;
                protected _clearContent(): void;
                protected _removeItemByKey(key: string): void;
                protected _removeItem(item: collMOD.CollectionItem): void;
                protected _refresh(): void;
                scrollIntoView(item: collMOD.CollectionItem): void;
                getDivElementByItem(item: collMOD.CollectionItem): HTMLDivElement;
                toString(): string;
                app: Application;
                el: HTMLElement;
                containerEl: HTMLElement;
                uniqueID: string;
                orientation: string;
                templateID: string;
                dataSource: collMOD.BaseCollection<collMOD.CollectionItem>;
                currentItem: collMOD.CollectionItem;
            }
            interface IStackPanelViewOptions extends IStackPanelOptions, baseElView.IViewOptions {
            }
            class StackPanelElView extends baseElView.BaseElView {
                private _panel;
                private _options;
                constructor(app: Application, el: HTMLElement, options: IStackPanelViewOptions);
                destroy(): void;
                toString(): string;
                dataSource: collMOD.BaseCollection<collMOD.CollectionItem>;
                panel: StackPanel;
            }
        }
    }
}
declare module RIAPP {
    module MOD {
        module db {
            import constsMOD = RIAPP.MOD.consts;
            import collMod = RIAPP.MOD.collection;
            enum FLAGS {
                None = 0,
                Changed = 1,
                Setted = 2,
                Refreshed = 4,
            }
            enum REFRESH_MODE {
                NONE = 0,
                RefreshCurrent = 1,
                MergeIntoCurrent = 2,
                CommitChanges = 3,
            }
            enum DELETE_ACTION {
                NoAction = 0,
                Cascade = 1,
                SetNulls = 2,
            }
            enum DATA_OPER {
                SUBMIT = 0,
                LOAD = 1,
                INVOKE = 2,
                REFRESH = 3,
                INIT = 4,
            }
            class DataOperationError extends errors.BaseError {
                private _operationName;
                constructor(ex: any, operationName: DATA_OPER);
                operationName: DATA_OPER;
            }
            class AccessDeniedError extends DataOperationError {
            }
            class ConcurrencyError extends DataOperationError {
            }
            class SvcValidationError extends DataOperationError {
            }
            class SubmitError extends DataOperationError {
                private _allSubmitted;
                private _notValidated;
                constructor(origError: any, allSubmitted: Entity[], notValidated: Entity[]);
                allSubmitted: Entity[];
                notValidated: Entity[];
            }
            interface IFieldName {
                n: string;
                p: IFieldName[];
            }
            interface ICachedPage {
                items: Entity[];
                pageIndex: number;
            }
            interface IQueryParamInfo {
                dataType: constsMOD.DATA_TYPE;
                dateConversion: constsMOD.DATE_CONVERSION;
                isArray: boolean;
                isNullable: boolean;
                name: string;
                ordinal: number;
            }
            interface IQueryInfo {
                isQuery: boolean;
                methodName: string;
                methodResult: boolean;
                parameters: IQueryParamInfo[];
            }
            interface IFilterInfo {
                filterItems: {
                    fieldName: string;
                    kind: collMod.FILTER_TYPE;
                    values: any[];
                }[];
            }
            interface ISortInfo {
                sortItems: {
                    fieldName: string;
                    sortOrder: collMod.SORT_ORDER;
                }[];
            }
            interface IEntityConstructor {
                new (dbSet: DbSet<Entity>, row: IRowData, names: IFieldName[]): Entity;
            }
            interface IValueChange {
                val: any;
                orig: any;
                fieldName: string;
                flags: number;
                nested: IValueChange[];
            }
            interface IValidationErrorInfo {
                fieldName: string;
                message: string;
            }
            interface IRowInfo {
                values: IValueChange[];
                changeType: number;
                serverKey: string;
                clientKey: string;
                error: string;
                invalid?: IValidationErrorInfo[];
            }
            interface IPermissions extends collMod.IPermissions {
                dbSetName: string;
            }
            interface IPermissionsInfo {
                serverTimezone: number;
                permissions: IPermissions[];
            }
            interface IParamInfo {
                parameters: {
                    name: string;
                    value: any;
                }[];
            }
            interface IErrorInfo {
                name: string;
                message: string;
            }
            interface IInvokeRequest {
                methodName: string;
                paramInfo: IParamInfo;
            }
            interface IInvokeResponse {
                result: any;
                error: IErrorInfo;
            }
            interface IDbSetInfo {
                dbSetName: string;
                enablePaging: boolean;
                pageSize: number;
                fieldInfos: collMod.IFieldInfo[];
            }
            interface IRefreshRowInfo {
                dbSetName: string;
                rowInfo: IRowInfo;
                error: {
                    name: string;
                    message: string;
                };
            }
            interface IDbSetConstuctorOptions {
                dbContext: DbContext;
                dbSetInfo: IDbSetInfo;
                childAssoc: IAssociationInfo[];
                parentAssoc: IAssociationInfo[];
            }
            interface IAssocConstructorOptions {
                dbContext: DbContext;
                parentName: string;
                childName: string;
                onDeleteAction: DELETE_ACTION;
                parentKeyFields: string[];
                childKeyFields: string[];
                parentToChildrenName: string;
                childToParentName: string;
                name: string;
            }
            interface IAssociationInfo {
                childDbSetName: string;
                childToParentName: string;
                name: string;
                onDeleteAction: number;
                parentDbSetName: string;
                parentToChildrenName: string;
                fieldRels: {
                    childField: string;
                    parentField: string;
                }[];
            }
            interface IDbSetOptions extends collMod.ICollectionOptions {
                dbSetName: string;
            }
            interface IMetadata {
                associations: IAssociationInfo[];
                dbSets: IDbSetInfo[];
                methods: IQueryInfo[];
                serverTimezone: number;
            }
            interface ITrackAssoc {
                assocName: string;
                parentKey: string;
                childKey: string;
            }
            interface IChangeSet {
                dbSets: {
                    dbSetName: string;
                    rows: IRowInfo[];
                }[];
                error: {
                    name: string;
                    message: string;
                };
                trackAssocs: ITrackAssoc[];
            }
            interface IQueryRequest {
                dbSetName: string;
                pageIndex: number;
                pageSize: number;
                pageCount: number;
                isIncludeTotalCount: boolean;
                filterInfo: IFilterInfo;
                sortInfo: ISortInfo;
                paramInfo: IParamInfo;
                queryName: string;
            }
            interface IRowData {
                k: string;
                v: any[];
            }
            interface IQueryResult<TEntity extends Entity> {
                fetchedItems: TEntity[];
                newItems: TEntity[];
                isPageChanged: boolean;
                outOfBandData: any;
            }
            interface IIncludedResult {
                names: IFieldName[];
                rows: IRowData[];
                rowCount: number;
                dbSetName: string;
            }
            interface IQueryResponse {
                names: IFieldName[];
                rows: IRowData[];
                rowCount: number;
                dbSetName: string;
                pageIndex: number;
                pageCount: number;
                totalCount: number;
                extraInfo: any;
                error: IErrorInfo;
                included: IIncludedResult[];
            }
            interface IDbSetConstructor {
                new (dbContext: DbContext): DbSet<Entity>;
            }
            class DataCache extends BaseObject {
                private _query;
                private _cache;
                private _totalCount;
                private _itemsByKey;
                constructor(query: TDataQuery<Entity>);
                getCachedPage(pageIndex: number): ICachedPage;
                reindexCache(): void;
                getPrevCachedPageIndex(currentPageIndex: number): number;
                getNextRange(pageIndex: number): {
                    start: number;
                    end: number;
                    cnt: number;
                };
                fillCache(start: number, items: Entity[]): void;
                clear(): void;
                clearCacheForPage(pageIndex: number): void;
                hasPage(pageIndex: number): boolean;
                getItemByKey(key: string): Entity;
                getPageByItem(item: Entity): number;
                destroy(): void;
                toString(): string;
                _pageCount: number;
                pageSize: number;
                loadPageCount: number;
                totalCount: number;
                cacheSize: number;
            }
            class TDataQuery<TEntity extends Entity> extends BaseObject {
                private _dbSet;
                private __queryInfo;
                private _filterInfo;
                private _sortInfo;
                private _isIncludeTotalCount;
                private _isClearPrevData;
                private _pageSize;
                private _pageIndex;
                private _params;
                private _loadPageCount;
                private _isClearCacheOnEveryLoad;
                private _dataCache;
                private _cacheInvalidated;
                constructor(dbSet: DbSet<TEntity>, queryInfo: IQueryInfo);
                getFieldInfo(fieldName: string): collMod.IFieldInfo;
                getFieldNames(): string[];
                private _addSort(fieldName, sortOrder);
                private _addFilterItem(fieldName, operand, value);
                where(fieldName: string, operand: collMod.FILTER_TYPE, value: any): TDataQuery<TEntity>;
                and(fieldName: string, operand: collMod.FILTER_TYPE, value: any): TDataQuery<TEntity>;
                orderBy(fieldName: string, sortOrder?: collMod.SORT_ORDER): TDataQuery<TEntity>;
                thenBy(fieldName: string, sortOrder?: collMod.SORT_ORDER): TDataQuery<TEntity>;
                clearSort(): TDataQuery<TEntity>;
                clearFilter(): TDataQuery<TEntity>;
                clearParams(): TDataQuery<TEntity>;
                _clearCache(): void;
                _getCache(): DataCache;
                _reindexCache(): void;
                _isPageCached(pageIndex: number): boolean;
                protected _resetCacheInvalidated(): void;
                load(): IPromise<IQueryResult<TEntity>>;
                destroy(): void;
                toString(): string;
                _queryInfo: IQueryInfo;
                _serverTimezone: number;
                entityType: IEntityConstructor;
                dbSet: DbSet<TEntity>;
                dbSetName: string;
                queryName: string;
                filterInfo: IFilterInfo;
                sortInfo: ISortInfo;
                isIncludeTotalCount: boolean;
                isClearPrevData: boolean;
                pageSize: number;
                pageIndex: number;
                params: any;
                isPagingEnabled: boolean;
                loadPageCount: number;
                isClearCacheOnEveryLoad: boolean;
                isCacheValid: boolean;
            }
            class DataQuery extends TDataQuery<Entity> {
            }
            class Entity extends collMod.CollectionItem {
                private __changeType;
                private __isRefreshing;
                private __isCached;
                private __dbSet;
                private _srvRowKey;
                private _origVals;
                private _saveChangeType;
                constructor(dbSet: DbSet<Entity>, row: IRowData, names: IFieldName[]);
                protected _initRowInfo(row: IRowData, names: IFieldName[]): void;
                protected _processValues(path: string, values: any[], names: IFieldName[]): void;
                protected _onFieldChanged(fieldName: string, fieldInfo: collMod.IFieldInfo): void;
                protected _getValueChange(fullName: string, fld: collMod.IFieldInfo, changedOnly: boolean): IValueChange;
                protected _getValueChanges(changedOnly: boolean): IValueChange[];
                protected _fldChanging(fieldName: string, fieldInfo: collMod.IFieldInfo, oldV: any, newV: any): boolean;
                protected _fldChanged(fieldName: string, fieldInfo: collMod.IFieldInfo, oldV: any, newV: any): boolean;
                protected _skipValidate(fieldInfo: collMod.IFieldInfo, val: any): boolean;
                protected _beginEdit(): boolean;
                protected _endEdit(): boolean;
                _getCalcFieldVal(fieldName: string): any;
                _getNavFieldVal(fieldName: string): any;
                _setNavFieldVal(fieldName: string, value: any): void;
                _updateKeys(srvKey: string): void;
                _checkCanRefresh(): void;
                _refreshValue(val: any, fullName: string, refreshMode: REFRESH_MODE): void;
                _refreshValues(rowInfo: IRowInfo, refreshMode: REFRESH_MODE): void;
                _getRowInfo(): IRowInfo;
                _clearFieldVal(fieldName: string): void;
                _getFieldVal(fieldName: string): any;
                _setFieldVal(fieldName: string, val: any): boolean;
                _onAttaching(): void;
                _onAttach(): void;
                deleteItem(): boolean;
                deleteOnSubmit(): boolean;
                acceptChanges(rowInfo?: IRowInfo): void;
                rejectChanges(): void;
                submitChanges(): IVoidPromise;
                refresh(): IPromise<Entity>;
                cancelEdit(): boolean;
                getDbContext(): DbContext;
                getDbSet(): DbSet<Entity>;
                toString(): string;
                destroy(): void;
                _isCanSubmit: boolean;
                _changeType: collMod.STATUS;
                _isNew: boolean;
                _isDeleted: boolean;
                _entityType: IEntityConstructor;
                _srvKey: string;
                _dbSetName: string;
                _serverTimezone: number;
                _collection: collMod.BaseCollection<Entity>;
                _dbSet: DbSet<Entity>;
                _isRefreshing: boolean;
                _isCached: boolean;
                isHasChanges: boolean;
            }
            class DbSet<TEntity extends Entity> extends collMod.BaseCollection<TEntity> {
                private _dbContext;
                private _isSubmitOnDelete;
                private _trackAssoc;
                private _trackAssocMap;
                private _childAssocMap;
                private _parentAssocMap;
                private _changeCount;
                private _changeCache;
                protected _options: IDbSetOptions;
                protected _navfldMap: {
                    [x: string]: {
                        getFunc: () => any;
                        setFunc: (v: any) => void;
                    };
                };
                protected _calcfldMap: {
                    [x: string]: {
                        getFunc: () => any;
                    };
                };
                protected _itemsByKey: {
                    [x: string]: TEntity;
                };
                protected _entityType: IEntityConstructor;
                protected _ignorePageChanged: boolean;
                protected _query: TDataQuery<TEntity>;
                constructor(opts: IDbSetConstuctorOptions, entityType: IEntityConstructor);
                handleError(error: any, source: any): boolean;
                protected _mapAssocFields(): void;
                protected _doNavigationField(opts: IDbSetConstuctorOptions, fInfo: collMod.IFieldInfo): {
                    getFunc: () => any;
                    setFunc: (v: any) => void;
                };
                protected _doCalculatedField(opts: IDbSetConstuctorOptions, fInfo: collMod.IFieldInfo): {
                    getFunc: () => any;
                };
                protected _refreshValues(path: string, item: Entity, values: any[], names: IFieldName[], rm: REFRESH_MODE): void;
                protected _setCurrentItem(v: TEntity): void;
                protected _getNewKey(item: TEntity): string;
                protected _createNew(): TEntity;
                protected _clearChangeCache(): void;
                protected _onPageChanging(): boolean;
                protected _onPageChanged(): void;
                protected _onPageSizeChanged(): void;
                protected _destroyItems(): void;
                protected _defineCalculatedField(fullName: string, getFunc: () => any): void;
                _getCalcFieldVal(fieldName: string, item: Entity): any;
                _getNavFieldVal(fieldName: string, item: Entity): any;
                _setNavFieldVal(fieldName: string, item: Entity, value: any): any;
                _beforeLoad(query: TDataQuery<TEntity>, oldQuery: TDataQuery<TEntity>): void;
                _updatePermissions(perms: IPermissions): void;
                _getChildToParentNames(childFieldName: string): string[];
                _getStrValue(val: any, fieldInfo: collMod.IFieldInfo): string;
                _fillFromService(data: {
                    res: IQueryResponse;
                    isPageChanged: boolean;
                    fn_beforeFillEnd: () => void;
                }): IQueryResult<TEntity>;
                _fillFromCache(data: {
                    isPageChanged: boolean;
                    fn_beforeFillEnd: () => void;
                }): IQueryResult<TEntity>;
                _commitChanges(rows: IRowInfo[]): void;
                _setItemInvalid(row: IRowInfo): TEntity;
                _getChanges(): IRowInfo[];
                _getTrackAssocInfo(): ITrackAssoc[];
                _addToChanged(item: TEntity): void;
                _removeFromChanged(key: string): void;
                _onItemStatusChanged(item: TEntity, oldChangeType: number): void;
                _onRemoved(item: TEntity, pos: number): void;
                getFieldInfo(fieldName: string): collMod.IFieldInfo;
                sort(fieldNames: string[], sortOrder: collMod.SORT_ORDER): IPromise<IQueryResult<Entity>>;
                fillItems(data: {
                    names: IFieldName[];
                    rows: IRowData[];
                }): void;
                acceptChanges(): void;
                rejectChanges(): void;
                deleteOnSubmit(item: TEntity): void;
                clear(): void;
                createQuery(name: string): TDataQuery<TEntity>;
                clearCache(): void;
                destroy(): void;
                toString(): string;
                items: TEntity[];
                dbContext: DbContext;
                dbSetName: string;
                entityType: IEntityConstructor;
                query: TDataQuery<TEntity>;
                hasChanges: boolean;
                cacheSize: number;
                isSubmitOnDelete: boolean;
            }
            class DbSets extends BaseObject {
                protected _dbSetNames: string[];
                private _dbContext;
                private _dbSets;
                private _arrDbSets;
                constructor(dbContext: DbContext);
                protected _dbSetCreated(dbSet: DbSet<Entity>): void;
                protected _createDbSet(name: string, dbSetType: IDbSetConstructor): void;
                dbSetNames: string[];
                arrDbSets: DbSet<Entity>[];
                getDbSet(name: string): DbSet<Entity>;
                destroy(): void;
            }
            class DbContext extends BaseObject {
                protected _isInitialized: boolean;
                protected _dbSets: DbSets;
                protected _svcMethods: any;
                protected _assoc: any;
                private _arrAssoc;
                private _queryInf;
                private _serviceUrl;
                private _isBusy;
                private _isSubmiting;
                private _hasChanges;
                private _pendingSubmit;
                private _serverTimezone;
                private _waitQueue;
                constructor();
                protected _getEventNames(): string[];
                protected _onGetCalcField(args: {
                    dbSetName: string;
                    fieldName: string;
                    getFunc: () => any;
                }): void;
                protected _initDbSets(): void;
                protected _initAssociations(associations: IAssociationInfo[]): void;
                protected _initMethods(methods: IQueryInfo[]): void;
                protected _updatePermissions(info: IPermissionsInfo): void;
                protected _initAssociation(assoc: IAssociationInfo): void;
                protected _initMethod(methodInfo: IQueryInfo): void;
                protected _getMethodParams(methodInfo: IQueryInfo, args: {
                    [x: string]: any;
                }): IInvokeRequest;
                protected _invokeMethod(methodInfo: IQueryInfo, data: IInvokeRequest, callback: (res: {
                    result: any;
                    error: any;
                }) => void): void;
                protected _loadFromCache(query: TDataQuery<Entity>, isPageChanged: boolean): IQueryResult<Entity>;
                protected _loadIncluded(res: IQueryResponse): void;
                protected _onLoaded(res: IQueryResponse, isPageChanged: boolean): IQueryResult<Entity>;
                protected _dataSaved(res: IChangeSet): void;
                protected _getChanges(): IChangeSet;
                protected _getUrl(action: any): string;
                handleError(error: any, source: any): boolean;
                protected _onDataOperError(ex: any, oper: any): boolean;
                protected _onSubmitError(error: any): void;
                protected waitForNotBusy(callback: any, callbackArgs: any): void;
                protected waitForNotSubmiting(callback: any, callbackArgs: any, groupName: any): void;
                protected waitForInitialized(callback: any, callbackArgs: any): void;
                initialize(options: {
                    serviceUrl: string;
                    permissions?: IPermissionsInfo;
                }): void;
                addOnSubmitError(fn: (sender: DbContext, args: {
                    error: any;
                    isHandled: boolean;
                }) => void, namespace?: string): void;
                removeOnSubmitError(namespace?: string): void;
                _onItemRefreshed(res: IRefreshRowInfo, item: Entity): void;
                _refreshItem(item: Entity): IPromise<Entity>;
                _getQueryInfo(name: string): IQueryInfo;
                _onDbSetHasChangesChanged(eSet: DbSet<Entity>): void;
                _load(query: TDataQuery<Entity>, isPageChanged: boolean): IPromise<IQueryResult<Entity>>;
                getDbSet(name: string): DbSet<Entity>;
                getAssociation(name: string): Association;
                submitChanges(): IVoidPromise;
                load(query: TDataQuery<Entity>): IPromise<IQueryResult<Entity>>;
                acceptChanges(): void;
                rejectChanges(): void;
                destroy(): void;
                service_url: string;
                isInitialized: boolean;
                isBusy: boolean;
                isSubmiting: boolean;
                serverTimezone: number;
                dbSets: DbSets;
                serviceMethods: any;
                hasChanges: boolean;
            }
            class Association extends BaseObject {
                private _objId;
                private _name;
                private _dbContext;
                private _onDeleteAction;
                private _parentDS;
                private _childDS;
                private _parentFldInfos;
                private _childFldInfos;
                private _parentToChildrenName;
                private _childToParentName;
                private _parentMap;
                private _childMap;
                private _isParentFilling;
                private _isChildFilling;
                private _saveParentFKey;
                private _saveChildFKey;
                private _changedTimeout;
                private _changed;
                constructor(options: IAssocConstructorOptions);
                handleError(error: any, source: any): boolean;
                protected _bindParentDS(): void;
                protected _bindChildDS(): void;
                protected _onParentCollChanged(args: collMod.ICollChangedArgs<Entity>): void;
                protected _onParentFill(args: collMod.ICollFillArgs<Entity>): void;
                protected _onParentEdit(item: Entity, isBegin: boolean, isCanceled: boolean): void;
                protected _onParentCommitChanges(item: Entity, isBegin: boolean, isRejected: boolean, changeType: collMod.STATUS): void;
                protected _storeParentFKey(item: Entity): void;
                protected _checkParentFKey(item: Entity): void;
                protected _onParentStatusChanged(item: Entity, oldChangeType: collMod.STATUS): void;
                protected _onChildCollChanged(args: collMod.ICollChangedArgs<Entity>): void;
                protected _notifyChildrenChanged(changed: string[]): void;
                protected _notifyParentChanged(changed: string[]): void;
                protected _notifyChanged(changed_pkeys: string[], changed_ckeys: string[]): void;
                protected _onChildFill(args: collMod.ICollFillArgs<Entity>): void;
                protected _onChildEdit(item: Entity, isBegin: boolean, isCanceled: boolean): void;
                protected _onChildCommitChanges(item: Entity, isBegin: boolean, isRejected: boolean, changeType: collMod.STATUS): void;
                protected _storeChildFKey(item: Entity): void;
                protected _checkChildFKey(item: Entity): void;
                protected _onChildStatusChanged(item: Entity, oldChangeType: collMod.STATUS): void;
                protected _getItemKey(finf: collMod.IFieldInfo[], ds: DbSet<Entity>, item: Entity): string;
                protected _resetChildMap(): void;
                protected _resetParentMap(): void;
                protected _unMapChildItem(item: Entity): any;
                protected _unMapParentItem(item: Entity): any;
                protected _mapParentItems(items: Entity[]): string[];
                protected _onChildrenChanged(fkey: string): void;
                protected _onParentChanged(fkey: string): void;
                protected _mapChildren(items: Entity[]): string[];
                protected _unbindParentDS(): void;
                protected _unbindChildDS(): void;
                getParentFKey(item: Entity): string;
                getChildFKey(item: Entity): any;
                getChildItems(item: Entity): Entity[];
                getParentItem(item: Entity): Entity;
                refreshParentMap(): string[];
                refreshChildMap(): string[];
                destroy(): void;
                toString(): string;
                name: string;
                parentToChildrenName: string;
                childToParentName: string;
                parentDS: DbSet<Entity>;
                childDS: DbSet<Entity>;
                parentFldInfos: collMod.IFieldInfo[];
                childFldInfos: collMod.IFieldInfo[];
                onDeleteAction: DELETE_ACTION;
            }
            class DataView<TItem extends collMod.CollectionItem> extends collMod.BaseCollection<TItem> {
                private _dataSource;
                private _fn_filter;
                private _fn_sort;
                private _fn_itemsProvider;
                private _isDSFilling;
                private _isAddingNew;
                private _objId;
                constructor(options: {
                    dataSource: collMod.BaseCollection<TItem>;
                    fn_filter?: (item: TItem) => boolean;
                    fn_sort?: (item1: TItem, item2: TItem) => number;
                    fn_itemsProvider?: (ds: collMod.BaseCollection<TItem>) => TItem[];
                });
                protected _getEventNames(): string[];
                addOnViewRefreshed(fn: (sender: DataView<TItem>, args: {}) => void, namespace?: string): void;
                removeOnViewRefreshed(namespace?: string): void;
                protected _filterForPaging(items: TItem[]): TItem[];
                protected _onViewRefreshed(args: {}): void;
                protected _clear(isPageChanged: boolean): void;
                protected _refresh(isPageChanged: boolean): void;
                protected _fillItems(data: {
                    items: TItem[];
                    isPageChanged: boolean;
                    clear: boolean;
                    isAppend: boolean;
                }): TItem[];
                protected _onDSCollectionChanged(args: collMod.ICollChangedArgs<TItem>): void;
                protected _onDSFill(args: collMod.ICollFillArgs<TItem>): void;
                protected _onDSStatusChanged(args: collMod.ICollItemStatusArgs<TItem>): void;
                protected _bindDS(): void;
                protected _unbindDS(): void;
                protected _onCurrentChanging(newCurrent: TItem): void;
                protected _onPageChanged(): void;
                _getStrValue(val: any, fieldInfo: any): string;
                _getErrors(item: TItem): {
                    [x: string]: string[];
                };
                getItemsWithErrors(): TItem[];
                appendItems(items: TItem[]): TItem[];
                addNew(): TItem;
                removeItem(item: TItem): void;
                sortLocal(fieldNames: string[], sortOrder: collMod.SORT_ORDER): IPromise<any>;
                getIsHasErrors(): boolean;
                clear(): void;
                refresh(): void;
                destroy(): void;
                dataSource: collMod.BaseCollection<TItem>;
                isPagingEnabled: boolean;
                permissions: collMod.IPermissions;
                fn_filter: (item: TItem) => boolean;
                fn_sort: (item1: TItem, item2: TItem) => number;
                fn_itemsProvider: (ds: collMod.BaseCollection<TItem>) => TItem[];
            }
            class ChildDataView<TEntity extends Entity> extends DataView<TEntity> {
                private _parentItem;
                private _refreshTimeout;
                private _association;
                constructor(options: {
                    association: Association;
                    fn_filter?: (item: TEntity) => boolean;
                    fn_sort?: (item1: TEntity, item2: TEntity) => number;
                });
                protected _refresh(isPageChanged: boolean): void;
                destroy(): void;
                toString(): string;
                parentItem: Entity;
                association: Association;
            }
            class TDbSet extends DbSet<Entity> {
            }
            class TDataView extends DataView<Entity> {
            }
            class TChildDataView extends ChildDataView<Entity> {
            }
            class BaseComplexProperty extends BaseObject implements IErrorNotification {
                private _name;
                constructor(name: string);
                _getFullPath(path: any): string;
                getName(): string;
                setValue(fullName: string, value: any): void;
                getValue(fullName: string): any;
                getFieldInfo(): collMod.IFieldInfo;
                getProperties(): collMod.IFieldInfo[];
                getFullPath(name: string): string;
                getEntity(): Entity;
                getPropertyByName(name: string): collMod.IFieldInfo;
                getIsHasErrors(): boolean;
                addOnErrorsChanged(fn: (sender: any, args: {}) => void, namespace?: string): void;
                removeOnErrorsChanged(namespace?: string): void;
                getFieldErrors(fieldName: any): IValidationInfo[];
                getAllErrors(): IValidationInfo[];
                getIErrorNotification(): IErrorNotification;
            }
            class RootComplexProperty extends BaseComplexProperty {
                private _entity;
                constructor(name: string, owner: Entity);
                _getFullPath(path: any): string;
                setValue(fullName: string, value: any): void;
                getValue(fullName: string): any;
                getFieldInfo(): collMod.IFieldInfo;
                getProperties(): collMod.IFieldInfo[];
                getEntity(): Entity;
                getFullPath(name: string): string;
            }
            class ChildComplexProperty extends BaseComplexProperty {
                private _parent;
                constructor(name: string, parent: BaseComplexProperty);
                _getFullPath(path: string): string;
                setValue(fullName: string, value: any): void;
                getValue(fullName: string): any;
                getFieldInfo(): collMod.IFieldInfo;
                getProperties(): collMod.IFieldInfo[];
                getParent(): BaseComplexProperty;
                getRootProperty(): RootComplexProperty;
                getFullPath(name: string): string;
                getEntity(): Entity;
            }
        }
    }
}
declare module RIAPP {
    import utilsMOD = RIAPP.MOD.utils;
    import bindMOD = RIAPP.MOD.binding;
    import elviewMOD = MOD.baseElView;
    import contentMOD = RIAPP.MOD.baseContent;
    interface IBindableElement {
        el: HTMLElement;
        dataView: string;
        dataForm: string;
        expressions: string[];
    }
    interface IAppOptions {
        application_name?: string;
        user_modules?: {
            name: string;
            initFn: (app: Application) => any;
        }[];
        application_root?: {
            querySelectorAll: (selectors: string) => NodeList;
        };
    }
    class Application extends BaseObject implements IExports {
        private static _newInstanceNum;
        private _DATA_BIND_SELECTOR;
        private _DATA_VIEW_SELECTOR;
        private _contentFactories;
        private _objLifeTime;
        private _ELV_STORE_KEY;
        private _contentFactory;
        private _elViewStore;
        private _nextElViewStoreKey;
        private _userCode;
        private _viewModels;
        private _app_name;
        private _modules;
        private _objId;
        private _objMaps;
        private _exports;
        protected _options: IAppOptions;
        constructor(options?: IAppOptions);
        protected _getEventNames(): string[];
        private _cleanUpObjMaps();
        private _initModules();
        private _initUserModules(user_modules);
        private _destroyBindings();
        private _setUpBindings();
        private _getElementViewInfo(el);
        handleError(error: any, source: any): boolean;
        protected _getElViewType(name: string): elviewMOD.IViewType;
        protected _checkBindableElement(el: HTMLElement): IBindableElement;
        protected _getAllBindableHtmlElements(scope: {
            querySelectorAll: (selectors: string) => NodeList;
        }): IBindableElement[];
        _getElView(el: HTMLElement): elviewMOD.BaseElView;
        _createElementView(el: HTMLElement, view_info: {
            name: string;
            options: any;
        }): elviewMOD.BaseElView;
        _setElView(el: HTMLElement, view?: elviewMOD.BaseElView): void;
        _bindTemplateElements(templateEl: HTMLElement): utilsMOD.LifeTimeScope;
        _bindElements(scope: {
            querySelectorAll: (selectors: string) => NodeList;
        }, dctx: any, isDataFormBind: boolean, isInsideTemplate: boolean): utilsMOD.LifeTimeScope;
        _getContentType(options: contentMOD.IContentOptions): contentMOD.IContentType;
        addOnStartUp(fn: (sender: Global, args: IUnResolvedBindingArgs) => void, namespace?: string): void;
        removeOnStartUp(namespace?: string): void;
        getExports(): {
            [x: string]: any;
        };
        registerElView(name: string, type: elviewMOD.IViewType): void;
        getElementView(el: HTMLElement): elviewMOD.BaseElView;
        bind(opts: bindMOD.IBindingOptions): bindMOD.Binding;
        registerContentFactory(fn: (nextFactory?: contentMOD.IContentFactory) => contentMOD.IContentFactory): void;
        registerConverter(name: string, obj: IConverter): void;
        getConverter(name: string): IConverter;
        registerType(name: string, obj: any): void;
        getType(name: string): any;
        registerObject(name: string, obj: any): void;
        getObject(name: string): any;
        onStartUp(): void;
        startUp(fn_sandbox?: (app: Application) => void): void;
        loadTemplates(url: any): void;
        loadTemplatesAsync(fn_loader: () => IPromise<string>): void;
        registerTemplateLoader(name: string, fn_loader: () => IPromise<string>): void;
        getTemplateLoader(name: any): () => IPromise<string>;
        registerTemplateGroup(name: string, group: {
            fn_loader?: () => IPromise<string>;
            url?: string;
            names: string[];
        }): void;
        destroy(): void;
        toString(): string;
        uniqueID: string;
        options: IAppOptions;
        contentFactory: contentMOD.IContentFactory;
        appName: string;
        appRoot: {
            querySelectorAll: (selectors: string) => NodeList;
        };
        modules: {
            [x: string]: any;
        };
        global: Global;
        UC: any;
        VM: any;
        app: Application;
    }
}

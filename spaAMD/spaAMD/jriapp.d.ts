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
            length: number;
            [index: number]: any;
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
        public _isDestroyed: boolean;
        public _isDestroyCalled: boolean;
        private __events;
        constructor();
        public _getEventNames(): string[];
        public _addHandler(name: string, fn: (sender: any, args: any) => void, namespace?: string, prepend?: boolean): void;
        public _removeHandler(name?: string, namespace?: string): void;
        public _raiseEvent(name: string, data: any): void;
        public _onError(error: any, source: any): boolean;
        public _checkEventName(name: string): void;
        public _isHasProp(prop: string): boolean;
        public raisePropertyChanged(name: string): void;
        public addHandler(name: string, fn: (sender: any, args: any) => void, namespace?: string): void;
        public removeHandler(name?: string, namespace?: string): void;
        public addOnDestroyed(fn: (sender: any, args: {}) => void, namespace?: string): void;
        public removeOnDestroyed(namespace?: string): void;
        public addOnError(fn: (sender: any, args: {
            error: any;
            source: any;
            isHandled: boolean;
        }) => void, namespace?: string): void;
        public removeOnError(namespace?: string): void;
        public removeNSHandlers(namespace?: string): void;
        public raiseEvent(name: string, args: any): void;
        public addOnPropertyChange(prop: string, fn: (sender: any, args: {
            property: string;
        }) => void, namespace?: string): void;
        public removeOnPropertyChange(prop?: string, namespace?: string): void;
        public destroy(): void;
    }
}
declare module RIAPP {
    var global: Global;
    var css_riaTemplate: string;
    enum BindTo {
        Source = 0,
        Target = 1,
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
        public _getEventNames(): string[];
        public _initialize(): void;
        public _addHandler(name: string, fn: (sender: any, args: any) => void, namespace?: string, prepend?: boolean): void;
        public _trackSelectable(selectable: ISelectable): void;
        public _untrackSelectable(selectable: ISelectable): void;
        public _registerApp(app: Application): void;
        public _unregisterApp(app: Application): void;
        public _destroyApps(): void;
        public _throwDummy(origErr: any): void;
        public _checkIsDummy(error: any): boolean;
        public _registerObject(root: IExports, name: string, obj: any): void;
        public _getObject(root: IExports, name: string): any;
        public _removeObject(root: IExports, name: string): any;
        public _processTemplateSections(root: {
            querySelectorAll: (selectors: string) => NodeList;
        }): void;
        public _loadTemplatesAsync(fn_loader: () => IPromise<string>, app: Application): IPromise<any>;
        public _registerTemplateLoader(name: any, loader: ITemplateLoaderInfo): void;
        public _getTemplateLoader(name: string): () => IPromise<string>;
        public _registerTemplateGroup(groupName: string, group: IGroupInfo): void;
        public _getTemplateGroup(name: string): IGroupInfo;
        public _waitForNotLoading(callback: any, callbackArgs: any): void;
        public _getConverter(name: string): MOD.converter.IConverter;
        public _onUnResolvedBinding(bindTo: BindTo, root: any, path: string, propName: string): void;
        public addOnLoad(fn: (sender: Global, args: any) => void, namespace?: string): void;
        public addOnUnLoad(fn: (sender: Global, args: any) => void, namespace?: string): void;
        public addOnInitialize(fn: (sender: Global, args: any) => void, namespace?: string): void;
        public addOnUnResolvedBinding(fn: (sender: Global, args: IUnResolvedBindingArgs) => void, namespace?: string): void;
        public removeOnUnResolvedBinding(namespace?: string): void;
        public getExports(): {
            [name: string]: any;
        };
        public reThrow(ex: any, isHandled: any): void;
        public onModuleLoaded(name: string, module_obj: any): void;
        public isModuleLoaded(name: string): boolean;
        public findApp(name: string): Application;
        public destroy(): void;
        public registerType(name: string, obj: any): void;
        public getType(name: string): any;
        public registerConverter(name: string, obj: MOD.converter.IConverter): void;
        public registerElView(name: string, elViewType: any): void;
        public getImagePath(imageName: string): string;
        public loadTemplates(url: string): void;
        public toString(): string;
        public moduleNames : any[];
        public parser : MOD.parser.Parser;
        public isLoading : boolean;
        public $ : JQueryStatic;
        public window : Window;
        public document : Document;
        public currentSelectable : ISelectable;
        public defaults : MOD.defaults.Defaults;
        public utils : MOD.utils.Utils;
        public UC : any;
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
            var css: {
                toolTip: string;
                toolTipError: string;
            };
            function defineProps(proto: any, props?: any, propertyDescriptors?: any): any;
            function __extendType(_super: any, pds: any, props: any): () => void;
            class Checks {
                static isNull: (a: any) => boolean;
                static isUndefined: (a: any) => boolean;
                static isNt: (a: any) => boolean;
                static isFunction: (a: any) => boolean;
                static isString: (a: any) => boolean;
                static isArray: (o: any) => boolean;
                static isBoolean: (a: any) => boolean;
                static isDate: (a: any) => boolean;
                static isNumber: (a: any) => boolean;
                static isNumeric: (obj: any) => boolean;
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
                static endsWith: (str: any, suffix: any) => boolean;
                static startsWith: (str: any, prefix: any) => boolean;
                static trim: (str: string, chars?: string) => string;
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
                dateToValue(dt: Date, dtcnv: consts.DATE_CONVERSION, stz: number): string;
                compareVals(v1: any, v2: any, dataType: consts.DATA_TYPE): boolean;
                stringifyValue(v: any, dcnv: consts.DATE_CONVERSION, dataType: consts.DATA_TYPE, stz: number): string;
                parseValue(v: string, dataType: consts.DATA_TYPE, dcnv: consts.DATE_CONVERSION, stz: number): any;
            }
            var valueUtils: IValueUtils;
            class LifeTimeScope extends BaseObject {
                private _objs;
                constructor();
                static create(): LifeTimeScope;
                public addObj(b: BaseObject): void;
                public removeObj(b: BaseObject): void;
                public getObjs(): BaseObject[];
                public destroy(): void;
                public toString(): string;
            }
            class PropWatcher extends BaseObject {
                public _objId: string;
                public _objs: BaseObject[];
                constructor();
                static create(): PropWatcher;
                public addPropWatch(obj: BaseObject, prop: string, fn_onChange: (prop: string) => void): void;
                public addWatch(obj: BaseObject, props: string[], fn_onChange: (prop: string) => void): void;
                public removeWatch(obj: BaseObject): void;
                public destroy(): void;
                public toString(): string;
                public uniqueID : string;
            }
            class WaitQueue extends BaseObject {
                public _objId: string;
                public _owner: BaseObject;
                public _queue: any;
                constructor(owner: BaseObject);
                static create(owner: BaseObject): WaitQueue;
                public _checkQueue(prop: string, value: any): void;
                public enQueue(options: any): void;
                public destroy(): void;
                public toString(): string;
                public uniqueID : string;
                public owner : BaseObject;
            }
            class Utils {
                constructor();
                static create(): Utils;
                public check : typeof Checks;
                public str : typeof StringUtils;
                public validation : typeof Validations;
                public getNewID(): number;
                public isContained(oNode: any, oCont: any): boolean;
                public slice: (start?: number, end?: number) => any[];
                public get_timeZoneOffset: () => number;
                public parseBool(bool_value: any): any;
                public round(num: number, decimals: number): number;
                public performAjaxCall(url: string, postData: string, async: boolean, fn_success: (res: string) => void, fn_error: (res: any) => void, context: any): IPromise<string>;
                public performAjaxGet(url: string): IPromise<string>;
                public format: (format_str: string, ...args: any[]) => string;
                public extend(deep: boolean, defaults: any, options: any): any;
                public removeNode(node: Node): void;
                public insertAfter(referenceNode: Node, newNode: Node): void;
                public getProps(obj: any): string[];
                public getParentDataForm(rootForm: HTMLElement, el: HTMLElement): HTMLElement;
                public forEachProp(obj: any, fn: (name: string) => void): void;
                public addToolTip($el: JQuery, tip: string, isError?: boolean): void;
                public hasProp(obj: any, prop: string): boolean;
                public createDeferred(): IDeferred<any>;
                public cloneObj(o: any, mergeIntoObj?: any): any;
                public shallowCopy(o: any): any;
                public mergeObj(obj: any, mergeIntoObj: any): any;
                public removeFromArray(array: any[], obj: any): number;
                public insertIntoArray(array: any[], obj: any, pos: number): void;
                public destroyJQueryPlugin($el: JQuery, name: string): void;
                public uuid: (len?: number, radix?: number) => string;
            }
        }
    }
}
declare module RIAPP {
    module MOD {
        module errors {
            class BaseError extends BaseObject {
                public _message: string;
                public _isDummy: boolean;
                public _origError: any;
                constructor(message: string);
                static create(message: string): BaseError;
                public toString(): string;
                public message : string;
                public isDummy : boolean;
                public origError : any;
            }
            class DummyError extends BaseError {
                constructor(ex: any);
                static create(ex: any): DummyError;
            }
            class ValidationError extends BaseError {
                public _errors: IValidationInfo[];
                public _item: any;
                constructor(errorInfo: IValidationInfo[], item: any);
                public item : any;
                public errors : IValidationInfo[];
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
            interface IConverter {
                convertToSource(val: any, param: any, dataContext: any): any;
                convertToTarget(val: any, param: any, dataContext: any): any;
            }
            class BaseConverter implements IConverter {
                public convertToSource(val: any, param: any, dataContext: any): any;
                public convertToTarget(val: any, param: any, dataContext: any): any;
            }
            class DateConverter implements IConverter {
                public convertToSource(val: any, param: any, dataContext: any): Date;
                public convertToTarget(val: any, param: any, dataContext: any): string;
                public toString(): string;
            }
            class DateTimeConverter implements IConverter {
                public convertToSource(val: any, param: any, dataContext: any): Date;
                public convertToTarget(val: any, param: any, dataContext: any): string;
                public toString(): string;
            }
            class NumberConverter implements IConverter {
                public convertToSource(val: any, param: any, dataContext: any): any;
                public convertToTarget(val: any, param: any, dataContext: any): string;
                public toString(): string;
            }
            class IntegerConverter implements IConverter {
                public convertToSource(val: any, param: any, dataContext: any): any;
                public convertToTarget(val: any, param: any, dataContext: any): string;
                public toString(): string;
            }
            class SmallIntConverter implements IConverter {
                public convertToSource(val: any, param: any, dataContext: any): any;
                public convertToTarget(val: any, param: any, dataContext: any): string;
                public toString(): string;
            }
            class DecimalConverter implements IConverter {
                public convertToSource(val: any, param: any, dataContext: any): any;
                public convertToTarget(val: any, param: any, dataContext: any): string;
                public toString(): string;
            }
            class FloatConverter implements IConverter {
                public convertToSource(val: any, param: any, dataContext: any): any;
                public convertToTarget(val: any, param: any, dataContext: any): string;
                public toString(): string;
            }
        }
    }
}
declare module RIAPP {
    module MOD {
        module defaults {
            class Defaults extends BaseObject {
                public _imagesPath: string;
                public _datepicker: IDatepicker;
                public _dateFormat: string;
                public _dateTimeFormat: string;
                public _timeFormat: string;
                public _decimalPoint: string;
                public _thousandSep: string;
                public _decPrecision: number;
                public _ajaxTimeOut: number;
                constructor();
                public toString(): string;
                public ajaxTimeOut : number;
                public dateFormat : string;
                public timeFormat : string;
                public dateTimeFormat : string;
                public datepicker : IDatepicker;
                public imagesPath : string;
                public decimalPoint : string;
                public thousandSep : string;
                public decPrecision : number;
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
                public _getPathParts(path: string): string[];
                public _resolveProp(obj: any, prop: string): any;
                public _setPropertyValue(obj: any, prop: string, val: any): void;
                public _getKeyVals(val: string): {
                    key: string;
                    val: any;
                }[];
                public resolveBindingSource(root: any, srcParts: string[]): any;
                public resolvePath(obj: any, path: string): any;
                public getBraceParts(val: string, firstOnly: boolean): string[];
                public trimOuterBraces(val: string): string;
                public trimQuotes(val: string): string;
                public trimBrackets(val: string): string;
                public isWithOuterBraces(str: string): boolean;
                public parseOption(part: string): any;
                public parseOptions(str: string): any[];
                public toString(): string;
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
                public _action: (sender: any, param: any) => void;
                public _thisObj: any;
                public _canExecute: (sender: any, param: any) => boolean;
                public _objId: string;
                constructor(fn_action: (sender: any, param: any) => void, thisObj: any, fn_canExecute: (sender: any, param: any) => boolean);
                public _getEventNames(): string[];
                public addOnCanExecuteChanged(fn: (sender: Command, args: {}) => void, namespace?: string): void;
                public removeOnCanExecuteChanged(namespace?: string): void;
                public canExecute(sender: any, param: any): boolean;
                public execute(sender: any, param: any): void;
                public destroy(): void;
                public raiseCanExecuteChanged(): void;
                public toString(): string;
            }
            class BaseViewModel extends BaseObject {
                public _objId: string;
                public _app: Application;
                constructor(app: Application);
                public _onError(error: any, source: any): boolean;
                public toString(): string;
                public destroy(): void;
                public uniqueID : string;
                public $ : JQueryStatic;
                public app : Application;
            }
        }
    }
}
declare module RIAPP {
    module MOD {
        module baseElView {
            class PropChangedCommand extends mvvm.Command {
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
                new(app: Application, el: HTMLElement, options: IViewOptions): BaseElView;
            }
            class BaseElView extends BaseObject {
                public _el: HTMLElement;
                public _$el: JQuery;
                public _oldDisplay: string;
                public _objId: string;
                public _propChangedCommand: mvvm.ICommand;
                public _errors: IValidationInfo[];
                public _toolTip: string;
                public _css: string;
                public _app: Application;
                constructor(app: Application, el: HTMLElement, options: IViewOptions);
                public _applyToolTip(): void;
                public _init(options: IViewOptions): void;
                public destroy(): void;
                public invokePropChanged(property: string): void;
                public _getErrorTipInfo(errors: IValidationInfo[]): string;
                public _setFieldError(isError: boolean): void;
                public _updateErrorUI(el: HTMLElement, errors: IValidationInfo[]): void;
                public _onError(error: any, source: any): boolean;
                public _setToolTip($el: JQuery, tip: string, isError?: boolean): void;
                public toString(): string;
                public $el : JQuery;
                public el : HTMLElement;
                public uniqueID : string;
                public isVisible : boolean;
                public propChangedCommand : mvvm.ICommand;
                public validationErrors : IValidationInfo[];
                public dataNameAttr : string;
                public toolTip : string;
                public css : string;
                public app : Application;
            }
            class InputElView extends BaseElView {
                constructor(app: Application, el: HTMLInputElement, options: IViewOptions);
                public toString(): string;
                public isEnabled : boolean;
                public el : HTMLInputElement;
                public value : string;
            }
            class CommandElView extends BaseElView {
                private _command;
                public _commandParam: any;
                constructor(app: Application, el: HTMLElement, options: IViewOptions);
                public destroy(): void;
                public invokeCommand(): void;
                public _onCommandChanged(): void;
                public _setCommand(v: mvvm.Command): void;
                public toString(): string;
                public isEnabled : boolean;
                public command : mvvm.Command;
                public commandParam : any;
            }
            class BusyElView extends BaseElView {
                private _delay;
                private _timeOut;
                private _loaderPath;
                private _$loader;
                private _isBusy;
                constructor(app: Application, el: HTMLElement, options: IViewOptions);
                public _init(options: any): void;
                public destroy(): void;
                public toString(): string;
                public isBusy : boolean;
                public delay : number;
            }
            class CheckBoxElView extends InputElView {
                private _val;
                public _init(options: IViewOptions): void;
                public _setFieldError(isError: boolean): void;
                public destroy(): void;
                public toString(): string;
                public checked : boolean;
            }
            class CheckBoxThreeStateElView extends InputElView {
                private _val;
                private _cbxVal;
                public _init(options: IViewOptions): void;
                public _setFieldError(isError: boolean): void;
                public destroy(): void;
                public toString(): string;
                public checked : boolean;
            }
            interface ITextBoxOptions extends IViewOptions {
                updateOnKeyUp?: boolean;
            }
            class TextBoxElView extends InputElView {
                public _init(options: ITextBoxOptions): void;
                public _getEventNames(): string[];
                public addOnKeyPress(fn: (sender: TextBoxElView, args: {
                    keyCode: number;
                    value: string;
                    isCancel: boolean;
                }) => void, namespace?: string): void;
                public removeOnKeyPress(namespace?: string): void;
                public toString(): string;
                public color : string;
            }
            class HiddenElView extends InputElView {
                public toString(): string;
            }
            interface ITextAreaOptions extends ITextBoxOptions {
                rows?: number;
                cols?: number;
                wrap?: string;
            }
            class TextAreaElView extends BaseElView {
                constructor(app: Application, el: HTMLTextAreaElement, options: ITextAreaOptions);
                public _init(options: ITextAreaOptions): void;
                public _getEventNames(): string[];
                public addOnKeyPress(fn: (sender: TextAreaElView, args: {
                    keyCode: number;
                    value: string;
                    isCancel: boolean;
                }) => void, namespace?: string): void;
                public removeOnKeyPress(namespace?: string): void;
                public toString(): string;
                public el : HTMLTextAreaElement;
                public value : string;
                public isEnabled : boolean;
                public rows : number;
                public cols : number;
                public wrap : string;
            }
            class RadioElView extends InputElView {
                private _val;
                public _init(options: IViewOptions): void;
                public _updateGroup(): void;
                public _setFieldError(isError: boolean): void;
                public toString(): string;
                public checked : boolean;
                public value : string;
                public name : string;
            }
            interface IButtonOptions extends IViewOptions {
                preventDefault?: boolean;
            }
            class ButtonElView extends CommandElView {
                private _preventDefault;
                constructor(app: Application, el: HTMLElement, options: IAncorOptions);
                public _init(options: IButtonOptions): void;
                public _onClick(e: Event): void;
                public toString(): string;
                public value : any;
                public text : string;
                public html : string;
                public preventDefault : boolean;
            }
            interface IAncorOptions extends IButtonOptions {
                imageSrc?: string;
            }
            class AnchorElView extends CommandElView {
                private _imageSrc;
                private _image;
                private _preventDefault;
                constructor(app: Application, el: HTMLAnchorElement, options: IAncorOptions);
                public _init(options: IAncorOptions): void;
                public _onClick(e: Event): void;
                public _updateImage(src: string): void;
                public destroy(): void;
                public toString(): string;
                public el : HTMLAnchorElement;
                public imageSrc : string;
                public html : string;
                public text : string;
                public href : string;
                public preventDefault : boolean;
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
                public _init(options: IExpanderOptions): void;
                public destroy(): void;
                public _onCommandChanged(): void;
                public _onClick(e: any): void;
                public invokeCommand(): void;
                public toString(): string;
                public isExpanded : boolean;
            }
            class SpanElView extends BaseElView {
                public toString(): string;
                public text : string;
                public value : string;
                public html : string;
                public color : string;
                public fontSize : string;
            }
            class BlockElView extends SpanElView {
                public toString(): string;
                public borderColor : string;
                public borderStyle : string;
                public width : number;
                public height : number;
            }
            class ImgElView extends BaseElView {
                constructor(app: Application, el: HTMLImageElement, options: IViewOptions);
                public toString(): string;
                public el : HTMLImageElement;
                public src : string;
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
                converter?: converter.IConverter;
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
                public _onError(error: any, source: any): boolean;
                public destroy(): void;
                public toString(): string;
                public bindingID : string;
                public target : BaseObject;
                public source : any;
                public targetPath : string[];
                public sourcePath : string[];
                public sourceValue : any;
                public targetValue : any;
                public mode : BINDING_MODE;
                public converter : converter.IConverter;
                public converterParam : any;
                public isSourceFixed : boolean;
                public isDisabled : boolean;
                public appName : string;
            }
        }
    }
}
declare module RIAPP {
    module MOD {
        module collection {
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
                dataType: consts.DATA_TYPE;
                isNullable: boolean;
                isReadOnly: boolean;
                isAutoGenerated: boolean;
                isNeedOriginal: boolean;
                maxLength: number;
                dateConversion: consts.DATE_CONVERSION;
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
                public _fkey: string;
                public _isEditing: boolean;
                public _saveVals: {
                    [fieldName: string]: any;
                };
                public _vals: {
                    [fieldName: string]: any;
                };
                public _notEdited: boolean;
                constructor();
                public _getEventNames(): string[];
                public addOnErrorsChanged(fn: (sender: any, args: {}) => void, namespace?: string): void;
                public removeOnErrorsChanged(namespace?: string): void;
                public _onErrorsChanged(args: any): void;
                public _onError(error: any, source: any): boolean;
                public _beginEdit(): boolean;
                public _endEdit(): boolean;
                public _validate(): IValidationInfo;
                public _skipValidate(fieldInfo: IFieldInfo, val: any): boolean;
                public _validateField(fieldName: any): IValidationInfo;
                public _validateAll(): IValidationInfo[];
                public _checkVal(fieldInfo: IFieldInfo, val: any): any;
                public _resetIsNew(): void;
                public _onAttaching(): void;
                public _onAttach(): void;
                public getFieldInfo(fieldName: string): IFieldInfo;
                public getFieldNames(): string[];
                public getFieldErrors(fieldName: any): IValidationInfo[];
                public getAllErrors(): IValidationInfo[];
                public getErrorString(): string;
                public submitChanges(): IVoidPromise;
                public beginEdit(): boolean;
                public endEdit(): boolean;
                public cancelEdit(): boolean;
                public deleteItem(): boolean;
                public getIsNew(): boolean;
                public getIsDeleted(): boolean;
                public getKey(): string;
                public getCollection(): Collection;
                public getIsEditing(): boolean;
                public getIsHasErrors(): boolean;
                public getIErrorNotification(): IErrorNotification;
                public destroy(): void;
                public toString(): string;
                public _isCanSubmit : boolean;
                public _changeType : STATUS;
                public _isNew : boolean;
                public _isDeleted : boolean;
                public _key : string;
                public _collection : Collection;
                public _isUpdating : boolean;
                public isEditing : boolean;
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
                public _options: ICollectionOptions;
                public _isLoading: boolean;
                public _EditingItem: TItem;
                public _perms: IPermissions;
                public _totalCount: number;
                public _pageIndex: number;
                public _items: TItem[];
                public _itemsByKey: {
                    [key: string]: TItem;
                };
                public _currentPos: number;
                public _newKey: number;
                public _fieldMap: {
                    [fieldName: string]: IFieldInfo;
                };
                public _fieldInfos: IFieldInfo[];
                public _errors: {
                    [item_key: string]: {
                        [fieldName: string]: string[];
                    };
                };
                public _ignoreChangeErrors: boolean;
                public _pkInfo: IFieldInfo[];
                public _isUpdating: boolean;
                public _isClearing: boolean;
                public _waitQueue: utils.WaitQueue;
                constructor();
                static getEmptyFieldInfo(fieldName: string): IFieldInfo;
                public _getEventNames(): string[];
                public addOnClearing(fn: (sender: BaseCollection<TItem>, args: {}) => void, namespace?: string): void;
                public removeOnClearing(namespace?: string): void;
                public addOnCleared(fn: (sender: BaseCollection<TItem>, args: {}) => void, namespace?: string): void;
                public removeOnCleared(namespace?: string): void;
                public addOnFill(fn: (sender: BaseCollection<TItem>, args: ICollFillArgs<TItem>) => void, namespace?: string): void;
                public removeOnFill(namespace?: string): void;
                public addOnCollChanged(fn: (sender: BaseCollection<TItem>, args: ICollChangedArgs<TItem>) => void, namespace?: string): void;
                public removeOnCollChanged(namespace?: string): void;
                public addOnValidate(fn: (sender: BaseCollection<TItem>, args: ICollValidateArgs<TItem>) => void, namespace?: string): void;
                public removeOnValidate(namespace?: string): void;
                public addOnItemDeleting(fn: (sender: BaseCollection<TItem>, args: {
                    item: TItem;
                    isCancel: boolean;
                }) => void, namespace?: string): void;
                public removeOnItemDeleting(namespace?: string): void;
                public addOnItemAdding(fn: (sender: BaseCollection<TItem>, args: {
                    item: TItem;
                    isCancel: boolean;
                }) => void, namespace?: string): void;
                public removeOnItemAdding(namespace?: string): void;
                public addOnItemAdded(fn: (sender: BaseCollection<TItem>, args: {
                    item: TItem;
                    isAddNewHandled: boolean;
                }) => void, namespace?: string): void;
                public removeOnItemAdded(namespace?: string): void;
                public addOnCurrentChanging(fn: (sender: BaseCollection<TItem>, args: {
                    newCurrent: TItem;
                }) => void, namespace?: string): void;
                public removeOnCurrentChanging(namespace?: string): void;
                public addOnPageChanging(fn: (sender: BaseCollection<TItem>, args: {
                    page: number;
                    isCancel: boolean;
                }) => void, namespace?: string): void;
                public removeOnPageChanging(namespace?: string): void;
                public addOnErrorsChanged(fn: (sender: BaseCollection<TItem>, args: {
                    item: TItem;
                }) => void, namespace?: string): void;
                public removeOnErrorsChanged(namespace?: string): void;
                public addOnBeginEdit(fn: (sender: BaseCollection<TItem>, args: {
                    item: TItem;
                }) => void, namespace?: string): void;
                public removeOnBeginEdit(namespace?: string): void;
                public addOnEndEdit(fn: (sender: BaseCollection<TItem>, args: {
                    item: TItem;
                    isCanceled: boolean;
                }) => void, namespace?: string): void;
                public removeOnEndEdit(namespace?: string): void;
                public addOnCommitChanges(fn: (sender: BaseCollection<TItem>, args: {
                    item: TItem;
                    isBegin: boolean;
                    isRejected: boolean;
                    changeType: number;
                }) => void, namespace?: string): void;
                public removeOnCommitChanges(namespace?: string): void;
                public addOnStatusChanged(fn: (sender: BaseCollection<TItem>, args: ICollItemStatusArgs<TItem>) => void, namespace?: string): void;
                public removeOnStatusChanged(namespace?: string): void;
                public _getStrValue(val: any, fieldInfo: IFieldInfo): string;
                public _getPKFieldInfos(): IFieldInfo[];
                public _onError(error: any, source: any): boolean;
                public _onCurrentChanging(newCurrent: TItem): void;
                public _onCurrentChanged(): void;
                public _onEditing(item: TItem, isBegin: boolean, isCanceled: boolean): void;
                public _onCommitChanges(item: TItem, isBegin: boolean, isRejected: boolean, changeType: number): void;
                public _onItemStatusChanged(item: TItem, oldChangeType: number): void;
                public _validateItem(item: TItem): IValidationInfo;
                public _validateItemField(item: TItem, fieldName: string): IValidationInfo;
                public _addErrors(item: TItem, errors: IValidationInfo[]): void;
                public _addError(item: TItem, fieldName: string, errors: string[]): void;
                public _removeError(item: TItem, fieldName: string): void;
                public _removeAllErrors(item: TItem): void;
                public _getErrors(item: TItem): {
                    [fieldName: string]: string[];
                };
                public _onErrorsChanged(item: TItem): void;
                public _onItemDeleting(item: TItem): boolean;
                public _onFillStart(args: {
                    isBegin: boolean;
                    rowCount: number;
                    time: Date;
                    isPageChanged: boolean;
                }): void;
                public _onFillEnd(args: {
                    isBegin: boolean;
                    rowCount: number;
                    time: Date;
                    isPageChanged: boolean;
                    resetUI: boolean;
                    fetchedItems: TItem[];
                    newItems: TItem[];
                }): void;
                public _onItemsChanged(args: {
                    change_type: COLL_CHANGE_TYPE;
                    items: TItem[];
                    pos?: number[];
                    old_key?: string;
                    new_key?: string;
                }): void;
                public _onItemAdding(item: TItem): void;
                public _onItemAdded(item: TItem): void;
                public _createNew(): TItem;
                public _attach(item: TItem, itemPos?: number): any;
                public _onRemoved(item: TItem, pos: number): void;
                public _onPageSizeChanged(): void;
                public _onPageChanging(): boolean;
                public _onPageChanged(): void;
                public _setCurrentItem(v: TItem): void;
                public _destroyItems(): void;
                public _isHasProp(prop: string): boolean;
                public getFieldInfo(fieldName: string): IFieldInfo;
                public getFieldNames(): string[];
                public getFieldInfos(): IFieldInfo[];
                public cancelEdit(): void;
                public endEdit(): void;
                public getItemsWithErrors(): TItem[];
                public addNew(): TItem;
                public getItemByPos(pos: number): TItem;
                public getItemByKey(key: string): TItem;
                public findByPK(...vals: any[]): TItem;
                public moveFirst(skipDeleted?: boolean): boolean;
                public movePrev(skipDeleted?: boolean): boolean;
                public moveNext(skipDeleted?: boolean): boolean;
                public moveLast(skipDeleted?: boolean): boolean;
                public goTo(pos: number): boolean;
                public forEach(callback: (item: TItem) => void, thisObj?: any): void;
                public removeItem(item: TItem): void;
                public getIsHasErrors(): boolean;
                public sort(fieldNames: string[], sortOrder: SORT_ORDER): IPromise<any>;
                public sortLocal(fieldNames: string[], sortOrder: SORT_ORDER): IPromise<any>;
                public sortLocalByFunc(fn: (a: any, b: any) => number): IPromise<any>;
                public clear(): void;
                public destroy(): void;
                public waitForNotLoading(callback: any, callbackArgs: any[], syncCheck: boolean, groupName: string): void;
                public toString(): string;
                public options : ICollectionOptions;
                public currentItem : TItem;
                public count : number;
                public totalCount : number;
                public pageSize : number;
                public pageIndex : number;
                public items : TItem[];
                public isPagingEnabled : boolean;
                public permissions : IPermissions;
                public isEditing : boolean;
                public isLoading : boolean;
                public isUpdating : boolean;
                public pageCount : number;
            }
            class Collection extends BaseCollection<CollectionItem> {
            }
            interface IPropInfo {
                name: string;
                dtype: number;
            }
            class ListItem extends CollectionItem {
                public __isNew: boolean;
                public __coll: Collection;
                constructor(coll: BaseList<ListItem, any>, obj?: any);
                public _setProp(name: string, val: any): void;
                public _getProp(name: string): any;
                public _resetIsNew(): void;
                public toString(): string;
                public _isNew : boolean;
                public _collection : Collection;
            }
            interface IListItemConstructor<TItem extends ListItem, TObj> {
                new(coll: BaseList<TItem, TObj>, obj?: TObj): TItem;
            }
            class BaseList<TItem extends ListItem, TObj> extends BaseCollection<TItem> {
                public _type_name: string;
                public _itemType: IListItemConstructor<TItem, TObj>;
                constructor(itemType: IListItemConstructor<TItem, TObj>, props: IPropInfo[]);
                private _updateFieldMap(props);
                public _attach(item: TItem): any;
                public _createNew(): TItem;
                public _getNewKey(item: any): string;
                public fillItems(objArray: TObj[], clearAll?: boolean): void;
                public getNewObjects(): TItem[];
                public resetNewObjects(): void;
                public toString(): string;
            }
            class BaseDictionary<TItem extends ListItem, TObj> extends BaseList<TItem, TObj> {
                private _keyName;
                constructor(itemType: IListItemConstructor<TItem, TObj>, keyName: string, props: IPropInfo[]);
                public _getNewKey(item: TItem): string;
                public _onItemAdded(item: TItem): void;
                public _onRemoved(item: TItem, pos: number): void;
                public keyName : string;
            }
            class List extends BaseList<ListItem, any> {
                constructor(type_name: string, properties: any);
            }
            class Dictionary extends BaseDictionary<ListItem, any> {
                constructor(type_name: string, properties: any, keyName: string);
                public _getNewKey(item: ListItem): string;
            }
        }
    }
}
declare module RIAPP {
    module MOD {
        module template {
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
                public _onError(error: any, source: any): boolean;
                public destroy(): void;
                public findElByDataName(name: string): HTMLElement[];
                public findElViewsByDataName(name: string): baseElView.BaseElView[];
                public toString(): string;
                public loadedElem : HTMLElement;
                public dataContext : any;
                public templateID : string;
                public el : HTMLElement;
                public app : Application;
            }
            class TemplateCommand extends mvvm.Command {
                constructor(fn_action: (sender: TemplateElView, param: {
                    template: Template;
                    isLoaded: boolean;
                }) => void, thisObj: any, fn_canExecute: (sender: TemplateElView, param: {
                    template: Template;
                    isLoaded: boolean;
                }) => boolean);
            }
            class TemplateElView extends baseElView.CommandElView implements ITemplateEvents {
                private _template;
                private _isEnabled;
                constructor(app: Application, el: HTMLElement, options: baseElView.IViewOptions);
                public templateLoading(template: Template): void;
                public templateLoaded(template: Template): void;
                public templateUnLoading(template: Template): void;
                public toString(): string;
                public isEnabled : boolean;
                public template : Template;
            }
        }
    }
}
declare module RIAPP {
    module MOD {
        module baseContent {
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
                fieldInfo?: collection.IFieldInfo;
                bindingInfo?: binding.IBindingInfo;
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
                new(app: Application, options: IConstructorContentOptions): IContent;
            }
            interface IContentFactory {
                getContentType(options: IContentOptions): IContentType;
                createContent(options: IConstructorContentOptions): IContent;
                isExternallyCachable(contentType: IContentType): boolean;
            }
            function parseContentAttr(content_attr: string): IContentOptions;
            function getBindingOptions(app: Application, bindInfo: binding.IBindingInfo, defaultTarget: BaseObject, defaultSource: any): binding.IBindingOptions;
            class BindingContent extends BaseObject implements IContent {
                public _parentEl: HTMLElement;
                public _el: HTMLElement;
                public _options: IContentOptions;
                public _isReadOnly: boolean;
                public _isEditing: boolean;
                public _dataContext: any;
                public _lfScope: utils.LifeTimeScope;
                public _target: baseElView.BaseElView;
                public _app: Application;
                constructor(app: Application, options: IConstructorContentOptions);
                public _init(): void;
                public _onError(error: any, source: any): boolean;
                public _updateCss(): void;
                public _canBeEdited(): boolean;
                public _createTargetElement(): baseElView.BaseElView;
                public _getBindingOption(bindingInfo: binding.IBindingInfo, target: BaseObject, dataContext: any, targetPath: string): binding.IBindingOptions;
                public _getBindings(): binding.Binding[];
                public _updateBindingSource(): void;
                public _cleanUp(): void;
                public getFieldInfo(): collection.IFieldInfo;
                public _getBindingInfo(): binding.IBindingInfo;
                public _getDisplayInfo(): {
                    displayCss?: string;
                    editCss?: string;
                };
                public _getElementView(el: HTMLElement, view_info: {
                    name: string;
                    options: any;
                }): baseElView.BaseElView;
                public update(): void;
                public destroy(): void;
                public toString(): string;
                public parentEl : HTMLElement;
                public target : baseElView.BaseElView;
                public isEditing : boolean;
                public dataContext : any;
                public app : Application;
            }
            class TemplateContent extends BaseObject implements IContent, template.ITemplateEvents {
                private _parentEl;
                private _template;
                private _templateInfo;
                private _isEditing;
                private _dataContext;
                private _app;
                private _isDisabled;
                constructor(app: Application, options: IConstructorContentOptions);
                public _onError(error: any, source: any): boolean;
                public templateLoading(template: template.Template): void;
                public templateLoaded(template: template.Template): void;
                public templateUnLoading(template: template.Template): void;
                private _createTemplate();
                public update(): void;
                public _cleanUp(): void;
                public destroy(): void;
                public toString(): string;
                public app : Application;
                public parentEl : HTMLElement;
                public template : template.Template;
                public isEditing : boolean;
                public dataContext : any;
            }
            class BoolContent extends BindingContent {
                public _init(): void;
                public _cleanUp(): void;
                public _createCheckBoxView(): baseElView.CheckBoxElView;
                public _createTargetElement(): baseElView.BaseElView;
                public _updateCss(): void;
                public destroy(): void;
                public update(): void;
                public toString(): string;
            }
            class DateContent extends BindingContent {
                public _fn_cleanup: () => void;
                constructor(app: Application, options: IConstructorContentOptions);
                public _getBindingOption(bindingInfo: binding.IBindingInfo, tgt: BaseObject, dctx: any, targetPath: string): binding.IBindingOptions;
                public _createTargetElement(): baseElView.BaseElView;
                public toString(): string;
            }
            class DateTimeContent extends BindingContent {
                public _getBindingOption(bindingInfo: binding.IBindingInfo, tgt: BaseObject, dctx: any, targetPath: string): binding.IBindingOptions;
                public toString(): string;
            }
            class NumberContent extends BindingContent {
                static __allowedKeys: number[];
                private _allowedKeys;
                public _getBindingOption(bindingInfo: binding.IBindingInfo, tgt: BaseObject, dctx: any, targetPath: string): binding.IBindingOptions;
                public update(): void;
                public _previewKeyPress(keyCode: number, value: string): boolean;
                public toString(): string;
            }
            class StringContent extends BindingContent {
                static __allowedKeys: number[];
                private _allowedKeys;
                public update(): void;
                public _previewKeyPress(fieldInfo: collection.IFieldInfo, keyCode: number, value: string): boolean;
                public toString(): string;
            }
            class MultyLineContent extends BindingContent {
                static __allowedKeys: number[];
                private _allowedKeys;
                constructor(app: Application, options: IConstructorContentOptions);
                public _createTargetElement(): baseElView.BaseElView;
                public update(): void;
                public _previewKeyPress(fieldInfo: collection.IFieldInfo, keyCode: number, value: string): boolean;
                public toString(): string;
            }
            class ContentFactory implements IContentFactory {
                public _app: Application;
                public _nextFactory: IContentFactory;
                constructor(app: Application, nextFactory?: IContentFactory);
                public getContentType(options: IContentOptions): IContentType;
                public createContent(options: IConstructorContentOptions): IContent;
                public isExternallyCachable(contentType: IContentType): boolean;
                public app : Application;
            }
            function initModule(app: Application): typeof baseContent;
        }
    }
}
declare module RIAPP {
    module MOD {
        module dataform {
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
                public _onError(error: any, source: any): boolean;
                private _getBindings();
                private _getElViews();
                private _createContent();
                private _updateContent();
                private _onDSErrorsChanged();
                private _bindDS();
                private _unbindDS();
                private _clearContent();
                public destroy(): void;
                public toString(): string;
                public app : Application;
                public el : HTMLElement;
                public dataContext : BaseObject;
                public isEditing : boolean;
                public validationErrors : IValidationInfo[];
                public isInsideTemplate : boolean;
            }
            class DataFormElView extends baseElView.BaseElView {
                private _form;
                private _options;
                constructor(app: Application, el: HTMLSelectElement, options: baseElView.IViewOptions);
                public _getErrorTipInfo(errors: IValidationInfo[]): string;
                public _updateErrorUI(el: HTMLElement, errors: IValidationInfo[]): void;
                public destroy(): void;
                public toString(): string;
                public dataContext : BaseObject;
                public form : DataForm;
            }
        }
    }
}
declare module RIAPP {
    module MOD {
        module dynacontent {
            interface IAnimation {
                beforeShow(template: template.Template, isFirstShow: boolean): void;
                show(template: template.Template, isFirstShow: boolean): IVoidPromise;
                beforeHide(template: template.Template): void;
                hide(template: template.Template): IVoidPromise;
                stop(): void;
                isAnimateFirstShow: boolean;
            }
            interface IDynaContentOptions extends baseElView.IViewOptions {
                animate?: string;
            }
            class DynaContentElView extends baseElView.BaseElView implements template.ITemplateEvents {
                private _dataContext;
                private _prevTemplateID;
                private _templateID;
                private _template;
                private _animation;
                constructor(app: Application, el: HTMLElement, options: IDynaContentOptions);
                public templateLoading(template: template.Template): void;
                public templateLoaded(template: template.Template): void;
                public templateUnLoading(template: template.Template): void;
                private _templateChanging(oldName, newName);
                public destroy(): void;
                public template : template.Template;
                public templateID : string;
                public dataContext : any;
                public animation : IAnimation;
            }
        }
    }
}
declare module RIAPP {
    module MOD {
        module datepicker {
            class Datepicker extends BaseObject implements IDatepicker {
                private _datepickerRegion;
                private _dateFormat;
                constructor();
                public toString(): string;
                public attachTo($el: any, options?: {
                    dateFormat?: string;
                }): void;
                public detachFrom($el: any): void;
                public parseDate(str: string): Date;
                public formatDate(date: Date): string;
                public dateFormat : string;
                public datepickerRegion : string;
                public datePickerFn : any;
            }
            interface IDatePickerOptions extends baseElView.ITextBoxOptions {
                datepicker?: any;
            }
            class DatePickerElView extends baseElView.TextBoxElView {
                public _init(options: IDatePickerOptions): void;
                public destroy(): void;
                public toString(): string;
            }
        }
    }
}
declare module RIAPP {
    module MOD {
        module tabs {
            class TabsElView extends baseElView.BaseElView {
                private _tabsEventCommand;
                private _tabOpts;
                public _init(options: any): void;
                public _createTabs(): void;
                public _destroyTabs(): void;
                public invokeTabsEvent(eventName: string, args: any): void;
                public destroy(): void;
                public toString(): string;
                public tabsEventCommand : mvvm.ICommand;
                public tabIndex : number;
            }
        }
    }
}
declare module RIAPP {
    module MOD {
        module listbox {
            interface IListBoxOptions {
                valuePath: string;
                textPath: string;
            }
            interface IListBoxConstructorOptions extends IListBoxOptions {
                app: Application;
                el: HTMLSelectElement;
                dataSource: collection.BaseCollection<collection.CollectionItem>;
            }
            interface IMappedItem {
                item: collection.CollectionItem;
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
                public destroy(): void;
                public _onChanged(): void;
                public _getStringValue(item: collection.CollectionItem): string;
                public _getValue(item: collection.CollectionItem): any;
                public _getText(item: collection.CollectionItem): string;
                public _onDSCollectionChanged(args: collection.ICollChangedArgs<collection.CollectionItem>): void;
                public _onDSFill(args: collection.ICollFillArgs<collection.CollectionItem>): void;
                public _onEdit(item: collection.CollectionItem, isBegin: boolean, isCanceled: boolean): void;
                public _onStatusChanged(item: collection.CollectionItem, oldChangeType: number): void;
                public _onCommitChanges(item: collection.CollectionItem, isBegin: boolean, isRejected: boolean, changeType: collection.STATUS): void;
                private _bindDS();
                private _unbindDS();
                private _addOption(item, first);
                private _mapByValue();
                private _resetText();
                private _removeOption(item);
                private _clear(isDestroy);
                private _refresh();
                private _findItemIndex(item);
                public _setIsEnabled(el: HTMLSelectElement, v: boolean): void;
                public _getIsEnabled(el: HTMLSelectElement): boolean;
                public clear(): void;
                public findItemByValue(val: any): collection.CollectionItem;
                public getTextByValue(val: any): string;
                public toString(): string;
                public dataSource : collection.BaseCollection<collection.CollectionItem>;
                public selectedValue : any;
                public selectedItem : collection.CollectionItem;
                public valuePath : string;
                public textPath : string;
                public isEnabled : boolean;
                public el : HTMLSelectElement;
            }
            interface ISelectViewOptions extends IListBoxOptions, baseElView.IViewOptions {
            }
            class SelectElView extends baseElView.BaseElView {
                private _listBox;
                private _options;
                constructor(app: Application, el: HTMLSelectElement, options: ISelectViewOptions);
                public destroy(): void;
                public toString(): string;
                public isEnabled : boolean;
                public el : HTMLSelectElement;
                public dataSource : collection.BaseCollection<collection.CollectionItem>;
                public selectedValue : any;
                public selectedItem : collection.CollectionItem;
                public listBox : ListBox;
            }
            interface ILookupOptions {
                dataSource: string;
                valuePath: string;
                textPath: string;
            }
            class LookupContent extends baseContent.BindingContent implements baseContent.IExternallyCachable {
                private _spanView;
                private _valBinding;
                private _listBinding;
                private _selectView;
                private _isListBoxCachedExternally;
                private _value;
                constructor(app: Application, options: baseContent.IConstructorContentOptions);
                public _init(): void;
                public _getEventNames(): string[];
                public addOnObjectCreated(fn: (sender: any, args: {
                    objectKey: string;
                    object: BaseObject;
                    isCachedExternally: boolean;
                }) => void, namespace?: string): void;
                public removeOnObjectCreated(namespace?: string): void;
                public addOnObjectNeeded(fn: (sender: any, args: {
                    objectKey: string;
                    object: BaseObject;
                }) => void, namespace?: string): void;
                public removeOnObjectNeeded(namespace?: string): void;
                public _getSelectView(): SelectElView;
                public _createSelectElView(el: HTMLSelectElement, options: ISelectViewOptions): SelectElView;
                public _updateTextValue(): void;
                public _getLookupText(): string;
                public _getSpanView(): baseElView.SpanElView;
                public update(): void;
                public _createTargetElement(): baseElView.BaseElView;
                public _cleanUp(): void;
                public _updateBindingSource(): void;
                public _bindToValue(): binding.Binding;
                public _bindToList(selectView: SelectElView): binding.Binding;
                public destroy(): void;
                public toString(): string;
                public value : any;
            }
            class ContentFactory implements baseContent.IContentFactory {
                private _app;
                private _nextFactory;
                constructor(app: Application, nextFactory?: baseContent.IContentFactory);
                public getContentType(options: baseContent.IContentOptions): baseContent.IContentType;
                public createContent(options: baseContent.IConstructorContentOptions): baseContent.IContent;
                public isExternallyCachable(contentType: baseContent.IContentType): boolean;
                public app : Application;
            }
            function initModule(app: Application): typeof listbox;
        }
    }
}
declare module RIAPP {
    module MOD {
        module datadialog {
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
                fn_OnTemplateCreated?: (template: template.Template) => void;
                fn_OnTemplateDestroy?: (template: template.Template) => void;
            }
            interface IButton {
                id: string;
                text: string;
                class: string;
                click: () => void;
            }
            class DataEditDialog extends BaseObject implements template.ITemplateEvents {
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
                public _onError(error: any, source: any): boolean;
                public addOnClose(fn: (sender: any, args: {}) => void, namespace?: string): void;
                public removeOnClose(namespace?: string): void;
                public addOnRefresh(fn: (sender: any, args: {
                    isHandled: boolean;
                }) => void, namespace?: string): void;
                public removeOnRefresh(namespace?: string): void;
                public _updateIsEditable(): void;
                public _createDialog(): void;
                public _getEventNames(): string[];
                public templateLoading(template: template.Template): void;
                public templateLoaded(template: template.Template): void;
                public templateUnLoading(template: template.Template): void;
                public _createTemplate(): template.Template;
                public _destroyTemplate(): void;
                public _getButtons(): IButton[];
                public _getOkButton(): JQuery;
                public _getCancelButton(): JQuery;
                public _getRefreshButton(): JQuery;
                public _getAllButtons(): JQuery[];
                public _disableButtons(isDisable: boolean): void;
                public _onOk(): void;
                public _onCancel(): void;
                public _onRefresh(): void;
                public _onClose(): void;
                public _onShow(): void;
                public show(): void;
                public hide(): void;
                public getOption(name: string): any;
                public setOption(name: string, value: any): void;
                public destroy(): void;
                public app : Application;
                public dataContext : any;
                public result : string;
                public template : template.Template;
                public isSubmitOnOK : boolean;
                public width : any;
                public height : any;
                public title : any;
                public canRefresh : boolean;
                public canCancel : boolean;
            }
        }
    }
}
declare module RIAPP {
    module MOD {
        module datagrid {
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
            class RowSelectContent extends baseContent.BoolContent {
                public _canBeEdited(): boolean;
                public toString(): string;
            }
            interface ICellOptions {
                row: Row;
                td: HTMLTableCellElement;
                column: BaseColumn;
            }
            class BaseCell extends BaseObject {
                public _row: Row;
                public _el: HTMLTableCellElement;
                public _column: BaseColumn;
                public _div: HTMLElement;
                public _clickTimeOut: number;
                constructor(options: ICellOptions);
                public _init(): void;
                public _onCellClicked(): void;
                public _onDblClicked(): void;
                public _onError(error: any, source: any): boolean;
                public scrollIntoView(isUp: boolean): void;
                public destroy(): void;
                public toString(): string;
                public el : HTMLTableCellElement;
                public row : Row;
                public column : BaseColumn;
                public grid : DataGrid;
                public item : collection.CollectionItem;
            }
            class DataCell extends BaseCell {
                private _content;
                private _stateCss;
                constructor(options: ICellOptions);
                public _init(): void;
                public _getInitContentFn(): (content: baseContent.IExternallyCachable) => void;
                public _beginEdit(): void;
                public _endEdit(isCanceled: any): void;
                public _setState(css: string): void;
                public destroy(): void;
                public toString(): string;
                public column : DataColumn;
            }
            class ExpanderCell extends BaseCell {
                public _init(): void;
                public _onCellClicked(): void;
                public _toggleImage(): void;
                public toString(): string;
            }
            class ActionsCell extends BaseCell {
                private _isEditing;
                constructor(options: ICellOptions);
                public _init(): void;
                public destroy(): void;
                public _createButtons(editing: boolean): void;
                public update(): void;
                public toString(): string;
                public isCanEdit : boolean;
                public isCanDelete : boolean;
            }
            class RowSelectorCell extends BaseCell {
                private _content;
                public _init(): void;
                public destroy(): void;
                public toString(): string;
            }
            class DetailsCell extends BaseObject implements template.ITemplateEvents {
                private _row;
                private _el;
                private _template;
                constructor(options: {
                    row: DetailsRow;
                    td: HTMLTableCellElement;
                    details_id: string;
                });
                public _init(options: {
                    td: HTMLElement;
                    details_id: string;
                }): void;
                public templateLoading(template: template.Template): void;
                public templateLoaded(template: template.Template): void;
                public templateUnLoading(template: template.Template): void;
                public destroy(): void;
                public toString(): string;
                public el : HTMLTableCellElement;
                public row : DetailsRow;
                public grid : DataGrid;
                public item : any;
                public template : template.Template;
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
                    item: collection.CollectionItem;
                });
                public _onError(error: any, source: any): boolean;
                private _createCells();
                private _createCell(col);
                public _onBeginEdit(): void;
                public _onEndEdit(isCanceled: boolean): void;
                public beginEdit(): boolean;
                public endEdit(): boolean;
                public cancelEdit(): boolean;
                public destroy(): void;
                public deleteRow(): void;
                public updateErrorState(): void;
                public scrollIntoView(isUp: boolean): void;
                public _setState(css: string): void;
                public toString(): string;
                public el : HTMLElement;
                public grid : DataGrid;
                public item : collection.CollectionItem;
                public cells : BaseCell[];
                public columns : BaseColumn[];
                public uniqueID : string;
                public itemKey : string;
                public isCurrent : boolean;
                public isSelected : boolean;
                public isExpanded : boolean;
                public expanderCell : ExpanderCell;
                public actionsCell : ActionsCell;
                public isDeleted : boolean;
                public isEditing : boolean;
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
                public _setParentRow(row: Row): void;
                private _initShow();
                private _show(onEnd);
                private _hide(onEnd);
                public destroy(): void;
                public toString(): string;
                public el : HTMLTableRowElement;
                public $el : JQuery;
                public grid : DataGrid;
                public item : any;
                public cell : DetailsCell;
                public uniqueID : string;
                public itemKey : any;
                public parentRow : Row;
            }
            interface IColumnInfo {
                type?: string;
                title?: string;
                sortable?: boolean;
                sortMemberName?: string;
                colCellCss?: string;
                rowCellCss?: string;
                width?: any;
                content?: baseContent.IContentOptions;
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
                public _init(): void;
                public destroy(): void;
                public scrollIntoView(isUp: boolean): void;
                public _onColumnClicked(): void;
                public toString(): string;
                public uniqueID : string;
                public el : HTMLTableHeaderCellElement;
                public $div : JQuery;
                public $extcol : JQuery;
                public grid : DataGrid;
                public options : IColumnInfo;
                public title : string;
                public isSelected : boolean;
            }
            class DataColumn extends BaseColumn {
                private _sortOrder;
                private _objCache;
                constructor(grid: DataGrid, options: {
                    th: HTMLTableHeaderCellElement;
                    colinfo: IColumnInfo;
                });
                public _init(): void;
                public _onColumnClicked(): void;
                public _cacheObject(key: string, obj: BaseObject): void;
                public _getCachedObject(key: string): BaseObject;
                public destroy(): void;
                public toString(): string;
                public isSortable : boolean;
                public sortMemberName : string;
                public sortOrder : collection.SORT_ORDER;
            }
            class ExpanderColumn extends BaseColumn {
                public _init(): void;
                public toString(): string;
            }
            class RowSelectorColumn extends BaseColumn {
                private _val;
                private _$chk;
                public _init(): void;
                public _onCheckBoxClicked(isChecked: boolean): void;
                public toString(): string;
                public checked : boolean;
            }
            interface IActionsColumnInfo extends IColumnInfo {
                img_ok?: string;
                img_cancel?: string;
                img_edit?: string;
                img_delete?: string;
            }
            class ActionsColumn extends BaseColumn {
                public _init(): void;
                public _onOk(cell: ActionsCell): void;
                public _onCancel(cell: ActionsCell): void;
                public _onDelete(cell: ActionsCell): void;
                public _onEdit(cell: ActionsCell): void;
                public toString(): string;
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
                dataSource: collection.BaseCollection<collection.CollectionItem>;
                animation: IAnimation;
            }
            class DataGrid extends BaseObject implements ISelectable {
                private _options;
                public _$tableEl: JQuery;
                public _isClearing: boolean;
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
                public _columnWidthChecker: () => void;
                constructor(options: IGridConstructorOptions);
                public _getEventNames(): string[];
                public addOnRowExpanded(fn: (sender: DataGrid, args: {
                    old_expandedRow: Row;
                    expandedRow: Row;
                    isExpanded: boolean;
                }) => void, namespace?: string): void;
                public removeOnRowExpanded(namespace?: string): void;
                public addOnRowSelected(fn: (sender: DataGrid, args: {
                    row: Row;
                }) => void, namespace?: string): void;
                public removeOnRowSelected(namespace?: string): void;
                public addOnPageChanged(fn: (sender: DataGrid, args: {}) => void, namespace?: string): void;
                public removeOnPageChanged(namespace?: string): void;
                public addOnRowStateChanged(fn: (sender: DataGrid, args: {
                    row: Row;
                    val: any;
                    css: string;
                }) => void, namespace?: string): void;
                public removeOnRowStateChanged(namespace?: string): void;
                public addOnCellDblClicked(fn: (sender: DataGrid, args: {
                    cell: BaseCell;
                }) => void, namespace?: string): void;
                public removeOnCellDblClicked(namespace?: string): void;
                public _isRowExpanded(row: Row): boolean;
                public _appendToHeader(el: HTMLElement): void;
                public _setCurrentColumn(column: BaseColumn): void;
                public _parseColumnAttr(column_attr: string, content_attr: string): IColumnInfo;
                public _findUndeleted(row: Row, isUp: boolean): Row;
                public _updateCurrent(row: Row, withScroll: boolean): void;
                public _scrollToCurrent(isUp: boolean): void;
                public _onRowStateChanged(row: Row, val: any): any;
                public _onCellDblClicked(cell: BaseCell): void;
                public _onError(error: any, source: any): boolean;
                public _onDSCurrentChanged(): void;
                public _onDSCollectionChanged(args: collection.ICollChangedArgs<collection.CollectionItem>): void;
                public _onDSFill(args: collection.ICollFillArgs<collection.CollectionItem>): void;
                public _onPageChanged(): void;
                public _onItemEdit(item: any, isBegin: any, isCanceled: any): void;
                public _onItemAdded(args: collection.ICollItemAddedArgs<collection.CollectionItem>): void;
                public _onItemStatusChanged(item: collection.CollectionItem, oldChangeType: collection.STATUS): void;
                public _onRowSelectionChanged(row: Row): void;
                public _onDSErrorsChanged(item: collection.CollectionItem): void;
                public _resetColumnsSort(): void;
                public _bindDS(): void;
                public _unbindDS(): void;
                public _getLastRow(): Row;
                public _removeRow(row: Row): void;
                public _clearGrid(): void;
                public _updateColsDim(): void;
                public _wrapTable(): void;
                public _unWrapTable(): void;
                public _createColumns(): void;
                public _createColumn(options: {
                    th: HTMLTableHeaderCellElement;
                    colinfo: IColumnInfo;
                }): BaseColumn;
                public _appendItems(newItems: collection.CollectionItem[]): void;
                public _onKeyDown(key: number, event: Event): void;
                public _onKeyUp(key: number, event: Event): void;
                public _refreshGrid(): void;
                public _createRowForItem(parent: any, item: any, pos?: number): Row;
                public _createDetails(): DetailsRow;
                public _expandDetails(parentRow: Row, expanded: boolean): void;
                public sortByColumn(column: DataColumn): void;
                public selectRows(isSelect: boolean): void;
                public findRowByItem(item: collection.CollectionItem): Row;
                public collapseDetails(): void;
                public getSelectedRows(): any[];
                public showEditDialog(): boolean;
                public scrollToCurrent(isUp: boolean): void;
                public addNew(): void;
                public destroy(): void;
                public app : Application;
                public $container : JQuery;
                public options : IGridConstructorOptions;
                public _tBodyEl : Element;
                public _tHeadEl : HTMLTableSectionElement;
                public _tFootEl : HTMLTableSectionElement;
                public _tHeadRow : HTMLTableRowElement;
                public _tHeadCells : any[];
                public containerEl : HTMLElement;
                public uniqueID : string;
                public name : string;
                public dataSource : collection.BaseCollection<collection.CollectionItem>;
                public rows : Row[];
                public columns : BaseColumn[];
                public currentRow : Row;
                public editingRow : Row;
                public isCanEdit : boolean;
                public isCanDelete : boolean;
                public isCanAddNew : boolean;
                public isUseScrollInto : boolean;
                public animation : IAnimation;
            }
            interface IGridViewOptions extends IGridOptions, baseElView.IViewOptions {
            }
            class GridElView extends baseElView.BaseElView {
                private _grid;
                private _gridEventCommand;
                private _options;
                public toString(): string;
                public _init(options: IGridViewOptions): void;
                public destroy(): void;
                private _createGrid();
                private _bindGridEvents();
                public invokeGridEvent(eventName: any, args: any): void;
                public dataSource : collection.BaseCollection<collection.CollectionItem>;
                public grid : DataGrid;
                public gridEventCommand : mvvm.ICommand;
                public animation : IAnimation;
            }
        }
    }
}
declare module RIAPP {
    module MOD {
        module pager {
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
                dataSource: collection.BaseCollection<collection.CollectionItem>;
            }
            class Pager extends BaseObject {
                private _$el;
                private _objId;
                private _options;
                private _rowsPerPage;
                private _rowCount;
                private _currentPage;
                constructor(options: IPagerConstructorOptions);
                public _createElement(tag: string): JQuery;
                public _render(): void;
                public _setDSPageIndex(page: number): void;
                public _onPageSizeChanged(ds: collection.BaseCollection<collection.CollectionItem>): void;
                public _onPageIndexChanged(ds: collection.BaseCollection<collection.CollectionItem>): void;
                public _onTotalCountChanged(ds: collection.BaseCollection<collection.CollectionItem>): void;
                public destroy(): void;
                public _bindDS(): void;
                public _unbindDS(): void;
                public _clearContent(): void;
                public _createLink(page: number, text: string, tip?: string): JQuery;
                public _createFirst(): JQuery;
                public _createPrevious(): JQuery;
                public _createCurrent(): JQuery;
                public _createOther(page: number): JQuery;
                public _createNext(): JQuery;
                public _createLast(): JQuery;
                public _buildTip(page: number): string;
                public toString(): string;
                public app : Application;
                public el : HTMLElement;
                public dataSource : collection.BaseCollection<collection.CollectionItem>;
                public pageCount : any;
                public rowCount : number;
                public rowsPerPage : number;
                public currentPage : number;
                public useSlider : boolean;
                public sliderSize : number;
                public hideOnSinglePage : boolean;
                public showTip : boolean;
                public showInfo : boolean;
                public showFirstAndLast : boolean;
                public showPreviousAndNext : boolean;
                public showNumbers : boolean;
            }
            interface IPagerViewOptions extends IPagerOptions, baseElView.IViewOptions {
            }
            class PagerElView extends baseElView.BaseElView {
                private _options;
                private _pager;
                constructor(app: Application, el: HTMLElement, options: IPagerViewOptions);
                public destroy(): void;
                public toString(): string;
                public dataSource : collection.BaseCollection<collection.CollectionItem>;
                public pager : Pager;
            }
        }
    }
}
declare module RIAPP {
    module MOD {
        module stackpanel {
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
                dataSource: collection.BaseCollection<collection.CollectionItem>;
            }
            class StackPanel extends BaseObject implements ISelectable, template.ITemplateEvents {
                private _$el;
                private _objId;
                private _isDSFilling;
                private _currentItem;
                private _itemMap;
                private _options;
                constructor(options: IStackPanelConstructorOptions);
                public _getEventNames(): string[];
                public templateLoading(template: template.Template): void;
                public templateLoaded(template: template.Template): void;
                public templateUnLoading(template: template.Template): void;
                public addOnItemClicked(fn: (sender: StackPanel, args: {
                    item: collection.CollectionItem;
                }) => void, namespace?: string): void;
                public removeOnItemClicked(namespace?: string): void;
                public _onKeyDown(key: number, event: Event): void;
                public _onKeyUp(key: number, event: Event): void;
                public _updateCurrent(item: collection.CollectionItem, withScroll: boolean): void;
                public _onDSCurrentChanged(): void;
                public _onDSCollectionChanged(args: collection.ICollChangedArgs<collection.CollectionItem>): void;
                public _onDSFill(args: collection.ICollFillArgs<collection.CollectionItem>): void;
                public _onItemStatusChanged(item: collection.CollectionItem, oldChangeType: number): void;
                public _createTemplate(item: collection.CollectionItem): template.Template;
                public _appendItems(newItems: collection.CollectionItem[]): void;
                public _appendItem(item: collection.CollectionItem): void;
                public _bindDS(): void;
                public _unbindDS(): void;
                public _createElement(tag: string): JQuery;
                public _onItemClicked(div: HTMLElement, item: collection.CollectionItem): void;
                public destroy(): void;
                public _clearContent(): void;
                public _removeItemByKey(key: string): void;
                public _removeItem(item: collection.CollectionItem): void;
                public _refresh(): void;
                public scrollIntoView(item: collection.CollectionItem): void;
                public getDivElementByItem(item: collection.CollectionItem): HTMLDivElement;
                public toString(): string;
                public app : Application;
                public el : HTMLElement;
                public containerEl : HTMLElement;
                public uniqueID : string;
                public orientation : string;
                public templateID : string;
                public dataSource : collection.BaseCollection<collection.CollectionItem>;
                public currentItem : collection.CollectionItem;
            }
            interface IStackPanelViewOptions extends IStackPanelOptions, baseElView.IViewOptions {
            }
            class StackPanelElView extends baseElView.BaseElView {
                private _panel;
                private _options;
                constructor(app: Application, el: HTMLElement, options: IStackPanelViewOptions);
                public destroy(): void;
                public toString(): string;
                public dataSource : collection.BaseCollection<collection.CollectionItem>;
                public panel : StackPanel;
            }
        }
    }
}
declare module RIAPP {
    module MOD {
        module db {
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
                public _operationName: DATA_OPER;
                constructor(ex: any, operationName: DATA_OPER);
                public operationName : DATA_OPER;
            }
            class AccessDeniedError extends DataOperationError {
            }
            class ConcurrencyError extends DataOperationError {
            }
            class SvcValidationError extends DataOperationError {
            }
            class SubmitError extends DataOperationError {
                public _allSubmitted: Entity[];
                public _notValidated: Entity[];
                constructor(origError: any, allSubmitted: Entity[], notValidated: Entity[]);
                public allSubmitted : Entity[];
                public notValidated : Entity[];
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
                dataType: consts.DATA_TYPE;
                dateConversion: consts.DATE_CONVERSION;
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
                    kind: collection.FILTER_TYPE;
                    values: any[];
                }[];
            }
            interface ISortInfo {
                sortItems: {
                    fieldName: string;
                    sortOrder: collection.SORT_ORDER;
                }[];
            }
            interface IEntityConstructor {
                new(dbSet: DbSet<Entity>, row: IRowData, names: IFieldName[]): Entity;
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
            interface IPermissions extends collection.IPermissions {
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
                fieldInfos: collection.IFieldInfo[];
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
            interface IDbSetOptions extends collection.ICollectionOptions {
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
                new(dbContext: DbContext): DbSet<Entity>;
            }
            class DataCache extends BaseObject {
                public _query: TDataQuery<Entity>;
                public _cache: ICachedPage[];
                public _totalCount: number;
                public _itemsByKey: {
                    [key: string]: Entity;
                };
                constructor(query: TDataQuery<Entity>);
                public getCachedPage(pageIndex: number): ICachedPage;
                public reindexCache(): void;
                public getPrevCachedPageIndex(currentPageIndex: number): number;
                public getNextRange(pageIndex: number): {
                    start: number;
                    end: number;
                    cnt: number;
                };
                public fillCache(start: number, items: Entity[]): void;
                public clear(): void;
                public clearCacheForPage(pageIndex: number): void;
                public hasPage(pageIndex: number): boolean;
                public getItemByKey(key: string): Entity;
                public getPageByItem(item: Entity): number;
                public destroy(): void;
                public toString(): string;
                public _pageCount : number;
                public pageSize : number;
                public loadPageCount : number;
                public totalCount : number;
                public cacheSize : number;
            }
            class TDataQuery<TEntity extends Entity> extends BaseObject {
                public _dbSet: DbSet<TEntity>;
                public __queryInfo: IQueryInfo;
                public _filterInfo: IFilterInfo;
                public _sortInfo: ISortInfo;
                public _isIncludeTotalCount: boolean;
                public _isClearPrevData: boolean;
                public _pageSize: number;
                public _pageIndex: number;
                public _params: any;
                public _loadPageCount: number;
                public _isClearCacheOnEveryLoad: boolean;
                public _dataCache: DataCache;
                public _cacheInvalidated: boolean;
                constructor(dbSet: DbSet<TEntity>, queryInfo: IQueryInfo);
                public getFieldInfo(fieldName: string): collection.IFieldInfo;
                public getFieldNames(): string[];
                private _addSort(fieldName, sortOrder);
                private _addFilterItem(fieldName, operand, value);
                public where(fieldName: string, operand: collection.FILTER_TYPE, value: any): TDataQuery<TEntity>;
                public and(fieldName: string, operand: collection.FILTER_TYPE, value: any): TDataQuery<TEntity>;
                public orderBy(fieldName: string, sortOrder?: collection.SORT_ORDER): TDataQuery<TEntity>;
                public thenBy(fieldName: string, sortOrder?: collection.SORT_ORDER): TDataQuery<TEntity>;
                public clearSort(): TDataQuery<TEntity>;
                public clearFilter(): TDataQuery<TEntity>;
                public clearParams(): TDataQuery<TEntity>;
                public _clearCache(): void;
                public _getCache(): DataCache;
                public _reindexCache(): void;
                public _isPageCached(pageIndex: number): boolean;
                public _resetCacheInvalidated(): void;
                public load(): IPromise<IQueryResult<TEntity>>;
                public destroy(): void;
                public toString(): string;
                public _queryInfo : IQueryInfo;
                public _serverTimezone : number;
                public entityType : IEntityConstructor;
                public dbSet : DbSet<TEntity>;
                public dbSetName : string;
                public queryName : string;
                public filterInfo : IFilterInfo;
                public sortInfo : ISortInfo;
                public isIncludeTotalCount : boolean;
                public isClearPrevData : boolean;
                public pageSize : number;
                public pageIndex : number;
                public params : any;
                public isPagingEnabled : boolean;
                public loadPageCount : number;
                public isClearCacheOnEveryLoad : boolean;
                public isCacheValid : boolean;
            }
            class DataQuery extends TDataQuery<Entity> {
            }
            class Entity extends collection.CollectionItem {
                private __changeType;
                private __isRefreshing;
                private __isCached;
                private __dbSet;
                private _srvRowKey;
                private _origVals;
                private _saveChangeType;
                constructor(dbSet: DbSet<Entity>, row: IRowData, names: IFieldName[]);
                public _updateKeys(srvKey: string): void;
                public _initRowInfo(row: IRowData, names: IFieldName[]): void;
                public _processValues(path: string, values: any[], names: IFieldName[]): void;
                public _checkCanRefresh(): void;
                public _refreshValue(val: any, fullName: string, refreshMode: REFRESH_MODE): void;
                public _refreshValues(rowInfo: IRowInfo, refreshMode: REFRESH_MODE): void;
                public _onFieldChanged(fieldName: string, fieldInfo: collection.IFieldInfo): void;
                public _getValueChange(fullName: string, fld: collection.IFieldInfo, changedOnly: boolean): IValueChange;
                public _getValueChanges(changedOnly: boolean): IValueChange[];
                public _getRowInfo(): IRowInfo;
                public _fldChanging(fieldName: string, fieldInfo: collection.IFieldInfo, oldV: any, newV: any): boolean;
                public _fldChanged(fieldName: string, fieldInfo: collection.IFieldInfo, oldV: any, newV: any): boolean;
                public _clearFieldVal(fieldName: string): void;
                public _skipValidate(fieldInfo: collection.IFieldInfo, val: any): boolean;
                public _getFieldVal(fieldName: string): any;
                public _setFieldVal(fieldName: string, val: any): boolean;
                public _getCalcFieldVal(fieldName: string): any;
                public _getNavFieldVal(fieldName: string): any;
                public _setNavFieldVal(fieldName: string, value: any): void;
                public _onAttaching(): void;
                public _onAttach(): void;
                public _beginEdit(): boolean;
                public _endEdit(): boolean;
                public deleteItem(): boolean;
                public deleteOnSubmit(): boolean;
                public acceptChanges(rowInfo?: IRowInfo): void;
                public rejectChanges(): void;
                public submitChanges(): IVoidPromise;
                public refresh(): IPromise<Entity>;
                public cancelEdit(): boolean;
                public getDbContext(): DbContext;
                public getDbSet(): DbSet<Entity>;
                public toString(): string;
                public destroy(): void;
                public _isCanSubmit : boolean;
                public _changeType : collection.STATUS;
                public _isNew : boolean;
                public _isDeleted : boolean;
                public _entityType : IEntityConstructor;
                public _srvKey : string;
                public _dbSetName : string;
                public _serverTimezone : number;
                public _collection : collection.BaseCollection<Entity>;
                public _dbSet : DbSet<Entity>;
                public _isRefreshing : boolean;
                public _isCached : boolean;
                public isHasChanges : boolean;
            }
            class DbSet<TEntity extends Entity> extends collection.BaseCollection<TEntity> {
                private _dbContext;
                private _isSubmitOnDelete;
                private _trackAssoc;
                private _trackAssocMap;
                private _childAssocMap;
                private _parentAssocMap;
                private _changeCount;
                private _changeCache;
                public _options: IDbSetOptions;
                public _navfldMap: {
                    [fieldName: string]: {
                        getFunc: () => any;
                        setFunc: (v: any) => void;
                    };
                };
                public _calcfldMap: {
                    [fieldName: string]: {
                        getFunc: () => any;
                    };
                };
                public _itemsByKey: {
                    [key: string]: TEntity;
                };
                public _entityType: IEntityConstructor;
                public _ignorePageChanged: boolean;
                public _query: TDataQuery<TEntity>;
                constructor(opts: IDbSetConstuctorOptions, entityType: IEntityConstructor);
                public getFieldInfo(fieldName: string): collection.IFieldInfo;
                public _onError(error: any, source: any): boolean;
                public _mapAssocFields(): void;
                public _updatePermissions(perms: IPermissions): void;
                public _getChildToParentNames(childFieldName: string): string[];
                public _getStrValue(val: any, fieldInfo: collection.IFieldInfo): string;
                public _doNavigationField(opts: IDbSetConstuctorOptions, fInfo: collection.IFieldInfo): {
                    getFunc: () => any;
                    setFunc: (v: any) => void;
                };
                public _doCalculatedField(opts: IDbSetConstuctorOptions, fInfo: collection.IFieldInfo): {
                    getFunc: () => any;
                };
                public _refreshValues(path: string, item: Entity, values: any[], names: IFieldName[], rm: REFRESH_MODE): void;
                public _fillFromService(data: {
                    res: IQueryResponse;
                    isPageChanged: boolean;
                    fn_beforeFillEnd: () => void;
                }): IQueryResult<TEntity>;
                public _fillFromCache(data: {
                    isPageChanged: boolean;
                    fn_beforeFillEnd: () => void;
                }): IQueryResult<TEntity>;
                public _commitChanges(rows: IRowInfo[]): void;
                public _setItemInvalid(row: IRowInfo): TEntity;
                public _setCurrentItem(v: TEntity): void;
                public _getChanges(): IRowInfo[];
                public _getTrackAssocInfo(): ITrackAssoc[];
                public _getNewKey(item: TEntity): string;
                public _createNew(): TEntity;
                public _addToChanged(item: TEntity): void;
                public _removeFromChanged(key: string): void;
                public _clearChangeCache(): void;
                public _onItemStatusChanged(item: TEntity, oldChangeType: number): void;
                public _onRemoved(item: TEntity, pos: number): void;
                public _onPageChanging(): boolean;
                public _onPageChanged(): void;
                public _onPageSizeChanged(): void;
                public _destroyItems(): void;
                public _defineCalculatedField(fullName: string, getFunc: () => any): void;
                public sort(fieldNames: string[], sortOrder: collection.SORT_ORDER): IPromise<IQueryResult<Entity>>;
                public fillItems(data: {
                    names: IFieldName[];
                    rows: IRowData[];
                }): void;
                public acceptChanges(): void;
                public rejectChanges(): void;
                public deleteOnSubmit(item: TEntity): void;
                public clear(): void;
                public createQuery(name: string): TDataQuery<TEntity>;
                public clearCache(): void;
                public destroy(): void;
                public toString(): string;
                public items : TEntity[];
                public dbContext : DbContext;
                public dbSetName : string;
                public entityType : IEntityConstructor;
                public query : TDataQuery<TEntity>;
                public hasChanges : boolean;
                public cacheSize : number;
                public isSubmitOnDelete : boolean;
            }
            class DbSets extends BaseObject {
                public _dbSetNames: string[];
                private _dbContext;
                private _dbSets;
                private _arrDbSets;
                constructor(dbContext: DbContext);
                public _dbSetCreated(dbSet: DbSet<Entity>): void;
                public _createDbSet(name: string, dbSetType: IDbSetConstructor): void;
                public dbSetNames : string[];
                public arrDbSets : DbSet<Entity>[];
                public getDbSet(name: string): DbSet<Entity>;
                public destroy(): void;
            }
            class DbContext extends BaseObject {
                public _isInitialized: boolean;
                public _dbSets: DbSets;
                public _svcMethods: any;
                public _assoc: any;
                public _arrAssoc: Association[];
                public _queryInf: {
                    [queryName: string]: IQueryInfo;
                };
                public _serviceUrl: string;
                public _isBusy: number;
                public _isSubmiting: boolean;
                public _hasChanges: boolean;
                public _pendingSubmit: {
                    deferred: IDeferred<any>;
                };
                public _serverTimezone: number;
                public _waitQueue: utils.WaitQueue;
                constructor();
                public _getEventNames(): string[];
                public addOnSubmitError(fn: (sender: DbContext, args: {
                    error: any;
                    isHandled: boolean;
                }) => void, namespace?: string): void;
                public removeOnSubmitError(namespace?: string): void;
                public _onGetCalcField(args: {
                    dbSetName: string;
                    fieldName: string;
                    getFunc: () => any;
                }): void;
                public _getQueryInfo(name: string): IQueryInfo;
                public _initDbSets(): void;
                public _initAssociations(associations: IAssociationInfo[]): void;
                public _initMethods(methods: IQueryInfo[]): void;
                public _updatePermissions(info: IPermissionsInfo): void;
                public _onDbSetHasChangesChanged(eSet: DbSet<Entity>): void;
                public _initAssociation(assoc: IAssociationInfo): void;
                public _initMethod(methodInfo: IQueryInfo): void;
                public _getMethodParams(methodInfo: IQueryInfo, args: {
                    [paramName: string]: any;
                }): IInvokeRequest;
                public _invokeMethod(methodInfo: IQueryInfo, data: IInvokeRequest, callback: (res: {
                    result: any;
                    error: any;
                }) => void): void;
                public _loadFromCache(query: TDataQuery<Entity>, isPageChanged: boolean): IQueryResult<Entity>;
                public _loadIncluded(res: IQueryResponse): void;
                public _onLoaded(res: IQueryResponse, isPageChanged: boolean): IQueryResult<Entity>;
                public _dataSaved(res: IChangeSet): void;
                public _getChanges(): IChangeSet;
                public _getUrl(action: any): string;
                public _onItemRefreshed(res: IRefreshRowInfo, item: Entity): void;
                public _refreshItem(item: Entity): IPromise<Entity>;
                public _onError(error: any, source: any): boolean;
                public _onDataOperError(ex: any, oper: any): boolean;
                public _onSubmitError(error: any): void;
                public _beforeLoad(query: TDataQuery<Entity>, oldQuery: TDataQuery<Entity>, dbSet: DbSet<Entity>): void;
                public _load(query: TDataQuery<Entity>, isPageChanged: boolean): IPromise<IQueryResult<Entity>>;
                public getDbSet(name: string): DbSet<Entity>;
                public getAssociation(name: string): Association;
                public submitChanges(): IVoidPromise;
                public load(query: TDataQuery<Entity>): IPromise<IQueryResult<Entity>>;
                public acceptChanges(): void;
                public rejectChanges(): void;
                public initialize(options: {
                    serviceUrl: string;
                    permissions?: IPermissionsInfo;
                }): void;
                public waitForNotBusy(callback: any, callbackArgs: any): void;
                public waitForNotSubmiting(callback: any, callbackArgs: any, groupName: any): void;
                public waitForInitialized(callback: any, callbackArgs: any): void;
                public destroy(): void;
                public service_url : string;
                public isInitialized : boolean;
                public isBusy : boolean;
                public isSubmiting : boolean;
                public serverTimezone : number;
                public dbSets : DbSets;
                public serviceMethods : any;
                public hasChanges : boolean;
            }
            class Association extends BaseObject {
                public _objId: string;
                public _name: string;
                public _dbContext: DbContext;
                public _onDeleteAction: DELETE_ACTION;
                public _parentDS: DbSet<Entity>;
                public _childDS: DbSet<Entity>;
                public _parentFldInfos: collection.IFieldInfo[];
                public _childFldInfos: collection.IFieldInfo[];
                public _parentToChildrenName: string;
                public _childToParentName: string;
                public _parentMap: {
                    [key: string]: Entity;
                };
                public _childMap: {
                    [key: string]: Entity[];
                };
                public _isParentFilling: boolean;
                public _isChildFilling: boolean;
                public _saveParentFKey: string;
                public _saveChildFKey: string;
                public _changedTimeout: number;
                public _changed: {
                    [key: string]: number;
                };
                constructor(options: IAssocConstructorOptions);
                public _onError(error: any, source: any): boolean;
                public _bindParentDS(): void;
                public _bindChildDS(): void;
                public _onParentCollChanged(args: collection.ICollChangedArgs<Entity>): void;
                public _onParentFill(args: collection.ICollFillArgs<Entity>): void;
                public _onParentEdit(item: Entity, isBegin: boolean, isCanceled: boolean): void;
                public _onParentCommitChanges(item: Entity, isBegin: boolean, isRejected: boolean, changeType: collection.STATUS): void;
                public _storeParentFKey(item: Entity): void;
                public _checkParentFKey(item: Entity): void;
                public _onParentStatusChanged(item: Entity, oldChangeType: collection.STATUS): void;
                public _onChildCollChanged(args: collection.ICollChangedArgs<Entity>): void;
                public _notifyChildrenChanged(changed: string[]): void;
                public _notifyParentChanged(changed: string[]): void;
                public _notifyChanged(changed_pkeys: string[], changed_ckeys: string[]): void;
                public _onChildFill(args: collection.ICollFillArgs<Entity>): void;
                public _onChildEdit(item: Entity, isBegin: boolean, isCanceled: boolean): void;
                public _onChildCommitChanges(item: Entity, isBegin: boolean, isRejected: boolean, changeType: collection.STATUS): void;
                public _storeChildFKey(item: Entity): void;
                public _checkChildFKey(item: Entity): void;
                public _onChildStatusChanged(item: Entity, oldChangeType: collection.STATUS): void;
                public _getItemKey(finf: collection.IFieldInfo[], ds: DbSet<Entity>, item: Entity): string;
                public _resetChildMap(): void;
                public _resetParentMap(): void;
                public _unMapChildItem(item: Entity): any;
                public _unMapParentItem(item: Entity): any;
                public _mapParentItems(items: Entity[]): string[];
                public _onChildrenChanged(fkey: string): void;
                public _onParentChanged(fkey: string): void;
                public _mapChildren(items: Entity[]): string[];
                public _unbindParentDS(): void;
                public _unbindChildDS(): void;
                public getParentFKey(item: Entity): string;
                public getChildFKey(item: Entity): any;
                public getChildItems(item: Entity): Entity[];
                public getParentItem(item: Entity): Entity;
                public refreshParentMap(): string[];
                public refreshChildMap(): string[];
                public destroy(): void;
                public toString(): string;
                public name : string;
                public parentToChildrenName : string;
                public childToParentName : string;
                public parentDS : DbSet<Entity>;
                public childDS : DbSet<Entity>;
                public parentFldInfos : collection.IFieldInfo[];
                public childFldInfos : collection.IFieldInfo[];
                public onDeleteAction : DELETE_ACTION;
            }
            class DataView<TItem extends collection.CollectionItem> extends collection.BaseCollection<TItem> {
                public _dataSource: collection.BaseCollection<TItem>;
                public _fn_filter: (item: TItem) => boolean;
                public _fn_sort: (item1: TItem, item2: TItem) => number;
                public _fn_itemsProvider: (ds: collection.BaseCollection<TItem>) => TItem[];
                public _isDSFilling: boolean;
                public _isAddingNew: boolean;
                public _objId: string;
                constructor(options: {
                    dataSource: collection.BaseCollection<TItem>;
                    fn_filter?: (item: TItem) => boolean;
                    fn_sort?: (item1: TItem, item2: TItem) => number;
                    fn_itemsProvider?: (ds: collection.BaseCollection<TItem>) => TItem[];
                });
                public _getEventNames(): string[];
                public addOnViewRefreshed(fn: (sender: DataView<TItem>, args: {}) => void, namespace?: string): void;
                public removeOnViewRefreshed(namespace?: string): void;
                public _filterForPaging(items: TItem[]): TItem[];
                public _onViewRefreshed(args: {}): void;
                public _clear(isPageChanged: boolean): void;
                public _refresh(isPageChanged: boolean): void;
                public _fillItems(data: {
                    items: TItem[];
                    isPageChanged: boolean;
                    clear: boolean;
                    isAppend: boolean;
                }): TItem[];
                public _onDSCollectionChanged(args: collection.ICollChangedArgs<TItem>): void;
                public _onDSFill(args: collection.ICollFillArgs<TItem>): void;
                public _onDSStatusChanged(args: collection.ICollItemStatusArgs<TItem>): void;
                public _bindDS(): void;
                public _unbindDS(): void;
                public _getStrValue(val: any, fieldInfo: any): string;
                public _onCurrentChanging(newCurrent: TItem): void;
                public _getErrors(item: TItem): {
                    [fieldName: string]: string[];
                };
                public _onPageChanged(): void;
                public getItemsWithErrors(): TItem[];
                public appendItems(items: TItem[]): TItem[];
                public addNew(): TItem;
                public removeItem(item: TItem): void;
                public sortLocal(fieldNames: string[], sortOrder: collection.SORT_ORDER): IPromise<any>;
                public getIsHasErrors(): boolean;
                public clear(): void;
                public refresh(): void;
                public destroy(): void;
                public dataSource : collection.BaseCollection<TItem>;
                public isPagingEnabled : boolean;
                public permissions : collection.IPermissions;
                public fn_filter : (item: TItem) => boolean;
                public fn_sort : (item1: TItem, item2: TItem) => number;
                public fn_itemsProvider : (ds: collection.BaseCollection<TItem>) => TItem[];
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
                public _refresh(isPageChanged: boolean): void;
                public destroy(): void;
                public toString(): string;
                public parentItem : Entity;
                public association : Association;
            }
            class TDbSet extends DbSet<Entity> {
            }
            class TDataView extends DataView<Entity> {
            }
            class TChildDataView extends ChildDataView<Entity> {
            }
            class BaseComplexProperty extends BaseObject implements IErrorNotification {
                public _name: string;
                constructor(name: string);
                public _getFullPath(path: any): string;
                public getName(): string;
                public setValue(fullName: string, value: any): void;
                public getValue(fullName: string): any;
                public getFieldInfo(): collection.IFieldInfo;
                public getProperties(): collection.IFieldInfo[];
                public getFullPath(name: string): string;
                public getEntity(): Entity;
                public getPropertyByName(name: string): collection.IFieldInfo;
                public getIsHasErrors(): boolean;
                public addOnErrorsChanged(fn: (sender: any, args: {}) => void, namespace?: string): void;
                public removeOnErrorsChanged(namespace?: string): void;
                public getFieldErrors(fieldName: any): IValidationInfo[];
                public getAllErrors(): IValidationInfo[];
                public getIErrorNotification(): IErrorNotification;
            }
            class RootComplexProperty extends BaseComplexProperty {
                private _entity;
                constructor(name: string, owner: Entity);
                public _getFullPath(path: any): string;
                public setValue(fullName: string, value: any): void;
                public getValue(fullName: string): any;
                public getFieldInfo(): collection.IFieldInfo;
                public getProperties(): collection.IFieldInfo[];
                public getEntity(): Entity;
                public getFullPath(name: string): string;
            }
            class ChildComplexProperty extends BaseComplexProperty {
                private _parent;
                constructor(name: string, parent: BaseComplexProperty);
                public _getFullPath(path: string): string;
                public setValue(fullName: string, value: any): void;
                public getValue(fullName: string): any;
                public getFieldInfo(): collection.IFieldInfo;
                public getProperties(): collection.IFieldInfo[];
                public getParent(): BaseComplexProperty;
                public getRootProperty(): RootComplexProperty;
                public getFullPath(name: string): string;
                public getEntity(): Entity;
            }
        }
    }
}
declare module RIAPP {
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
        public _options: IAppOptions;
        constructor(options?: IAppOptions);
        public _getEventNames(): string[];
        private _cleanUpObjMaps();
        private _initModules();
        private _initUserModules(user_modules);
        private _destroyBindings();
        private _setUpBindings();
        private _getElementViewInfo(el);
        public _onError(error: any, source: any): boolean;
        public _getElView(el: HTMLElement): MOD.baseElView.BaseElView;
        public _createElementView(el: HTMLElement, view_info: {
            name: string;
            options: any;
        }): MOD.baseElView.BaseElView;
        public _setElView(el: HTMLElement, view?: MOD.baseElView.BaseElView): void;
        public _bindTemplateElements(templateEl: HTMLElement): MOD.utils.LifeTimeScope;
        public _bindElements(scope: {
            querySelectorAll: (selectors: string) => NodeList;
        }, dctx: any, isDataFormBind: boolean, isInsideTemplate: boolean): MOD.utils.LifeTimeScope;
        public _getContentType(options: MOD.baseContent.IContentOptions): MOD.baseContent.IContentType;
        public _getElViewType(name: string): MOD.baseElView.IViewType;
        public addOnStartUp(fn: (sender: Global, args: IUnResolvedBindingArgs) => void, namespace?: string): void;
        public removeOnStartUp(namespace?: string): void;
        public getExports(): {
            [name: string]: any;
        };
        public registerElView(name: string, type: MOD.baseElView.IViewType): void;
        public getElementView(el: HTMLElement): MOD.baseElView.BaseElView;
        public bind(opts: MOD.binding.IBindingOptions): MOD.binding.Binding;
        public registerContentFactory(fn: (nextFactory?: MOD.baseContent.IContentFactory) => MOD.baseContent.IContentFactory): void;
        public registerConverter(name: string, obj: MOD.converter.IConverter): void;
        public getConverter(name: string): MOD.converter.IConverter;
        public registerType(name: string, obj: any): void;
        public getType(name: string): any;
        public registerObject(name: string, obj: any): void;
        public getObject(name: string): any;
        public onStartUp(): void;
        public startUp(fn_sandbox?: (app: Application) => void): void;
        public loadTemplates(url: any): void;
        public loadTemplatesAsync(fn_loader: () => IPromise<string>): void;
        public registerTemplateLoader(name: string, fn_loader: () => IPromise<string>): void;
        public getTemplateLoader(name: any): () => IPromise<string>;
        public registerTemplateGroup(name: string, group: {
            fn_loader?: () => IPromise<string>;
            url?: string;
            names: string[];
        }): void;
        public destroy(): void;
        public toString(): string;
        public uniqueID : string;
        public options : IAppOptions;
        public contentFactory : MOD.baseContent.IContentFactory;
        public appName : string;
        public appRoot : {
            querySelectorAll: (selectors: string) => NodeList;
        };
        public modules : {
            [name: string]: any;
        };
        public global : Global;
        public UC : any;
        public VM : any;
        public app : Application;
    }
}

/// <reference path="thirdparty/jquery.d.ts" />
/// <reference path="thirdparty/moment.d.ts" />
declare module RIAPP {
    var ERRS: {
        ERR_APP_NEED_JQUERY: string;
        ERR_ASSERTION_FAILED: string;
        ERR_BINDING_CONTENT_NOT_FOUND: string;
        ERR_DBSET_READONLY: string;
        ERR_DBSET_INVALID_FIELDNAME: string;
        ERR_FIELD_READONLY: string;
        ERR_FIELD_ISNOT_NULLABLE: string;
        ERR_FIELD_WRONG_TYPE: string;
        ERR_FIELD_MAXLEN: string;
        ERR_FIELD_DATATYPE: string;
        ERR_FIELD_REGEX: string;
        ERR_FIELD_RANGE: string;
        ERR_EVENT_INVALID: string;
        ERR_EVENT_INVALID_FUNC: string;
        ERR_MODULE_NOT_REGISTERED: string;
        ERR_MODULE_ALREDY_REGISTERED: string;
        ERR_PROP_NAME_EMPTY: string;
        ERR_GLOBAL_SINGLTON: string;
        ERR_OBJ_ALREADY_REGISTERED: string;
        ERR_TEMPLATE_ALREADY_REGISTERED: string;
        ERR_TEMPLATE_NOTREGISTERED: string;
        ERR_TEMPLATE_GROUP_NOTREGISTERED: string;
        ERR_CONVERTER_NOTREGISTERED: string;
        ERR_JQUERY_DATEPICKER_NOTFOUND: string;
        ERR_PARAM_INVALID: string;
        ERR_PARAM_INVALID_TYPE: string;
        ERR_KEY_IS_EMPTY: string;
        ERR_KEY_IS_NOTFOUND: string;
        ERR_ITEM_IS_ATTACHED: string;
        ERR_ITEM_IS_DETACHED: string;
        ERR_ITEM_IS_NOTFOUND: string;
        ERR_ITEM_NAME_COLLISION: string;
        ERR_DICTKEY_IS_NOTFOUND: string;
        ERR_DICTKEY_IS_EMPTY: string;
        ERR_CONV_INVALID_DATE: string;
        ERR_CONV_INVALID_NUM: string;
        ERR_QUERY_NAME_NOTFOUND: string;
        ERR_QUERY_BETWEEN: string;
        ERR_QUERY_OPERATOR_INVALID: string;
        ERR_OPER_REFRESH_INVALID: string;
        ERR_CALC_FIELD_DEFINE: string;
        ERR_CALC_FIELD_SELF_DEPEND: string;
        ERR_DOMAIN_CONTEXT_INITIALIZED: string;
        ERR_DOMAIN_CONTEXT_NOT_INITIALIZED: string;
        ERR_SVC_METH_PARAM_INVALID: string;
        ERR_DB_LOAD_NO_QUERY: string;
        ERR_DBSET_NAME_INVALID: string;
        ERR_APP_NAME_NOT_UNIQUE: string;
        ERR_ELVIEW_NOT_REGISTERED: string;
        ERR_ELVIEW_NOT_CREATED: string;
        ERR_BIND_TARGET_EMPTY: string;
        ERR_BIND_TGTPATH_INVALID: string;
        ERR_BIND_MODE_INVALID: string;
        ERR_BIND_TARGET_INVALID: string;
        ERR_APP_SETUP_INVALID: string;
        ERR_GRID_DATASRC_INVALID: string;
        ERR_COLLECTION_CHANGETYPE_INVALID: string;
        ERR_GRID_COLTYPE_INVALID: string;
        ERR_PAGER_DATASRC_INVALID: string;
        ERR_STACKPNL_DATASRC_INVALID: string;
        ERR_STACKPNL_TEMPLATE_INVALID: string;
        ERR_LISTBOX_DATASRC_INVALID: string;
        ERR_DATAFRM_DCTX_INVALID: string;
        ERR_DCTX_HAS_NO_FIELDINFO: string;
        ERR_TEMPLATE_ID_INVALID: string;
        ERR_STRING_FORMAT_INVALID: string;
        ERR_ITEM_DELETED_BY_ANOTHER_USER: string;
        ERR_ACCESS_DENIED: string;
        ERR_CONCURRENCY: string;
        ERR_VALIDATION: string;
        ERR_SVC_VALIDATION: string;
        ERR_SVC_ERROR: string;
        ERR_UNEXPECTED_SVC_ERROR: string;
        ERR_ASSOC_NAME_INVALID: string;
        ERR_DATAVIEW_DATASRC_INVALID: string;
        ERR_DATAVIEW_FILTER_INVALID: string;
    };
    interface ILocaleText {
        PAGER: {
            firstText: string;
            lastText: string;
            previousText: string;
            nextText: string;
            pageInfo: string;
            firstPageTip: string;
            prevPageTip: string;
            nextPageTip: string;
            lastPageTip: string;
            showingTip: string;
            showTip: string;
        };
        VALIDATE: {
            errorInfo: string;
            errorField: string;
        };
        TEXT: {
            txtEdit: string;
            txtAddNew: string;
            txtDelete: string;
            txtCancel: string;
            txtOk: string;
            txtRefresh: string;
            txtAskDelete: string;
            txtSubmitting: string;
            txtSave: string;
            txtClose: string;
            txtField: string;
        };
    }
    var localizable: ILocaleText;
}
declare module RIAPP {
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
        static isFunc(a: any): boolean;
        static endsWith(str: any, suffix: any): boolean;
        static startsWith(str: any, prefix: any): boolean;
        static fastTrim(str: any): string;
        static trim(str: string, chars?: string): string;
        static ltrim(str: string, chars?: string): string;
        static rtrim(str: string, chars?: string): string;
        static isArray(o: any): boolean;
        /**
        *    Usage:     format('test {0}={1}', 'x', 100);
        *    result:    test x=100
        **/
        static format(format_str: string, ...args: any[]): string;
    }
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
    interface ISelectable {
        containerEl: HTMLElement;
        uniqueID: string;
        _onKeyDown(key: number, event: Event): any;
        _onKeyUp(key: number, event: Event): any;
    }
    interface IExports {
        getExports(): any;
    }
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
    class Global extends RIAPP.BaseObject implements IExports {
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
        private _waitQueue;
        private _parser;
        private _moduleNames;
        private _exports;
        constructor(window: Window, jQuery: JQueryStatic);
        private _init();
        private _registerObjectCore(root, name, obj, checkOverwrite);
        private _getObjectCore(root, name);
        private _removeObjectCore(root, name);
        public _getEventNames(): string[];
        public addOnLoad(fn: (sender: Global, args: any) => void, namespace?: string): void;
        public addOnUnLoad(fn: (sender: Global, args: any) => void, namespace?: string): void;
        public _addHandler(name: string, fn: (sender: any, args: any) => void, namespace?: string, prepend?: boolean): void;
        public _trackSelectable(selectable: ISelectable): void;
        public _untrackSelectable(selectable: ISelectable): void;
        public _registerApp(app: RIAPP.Application): void;
        public _unregisterApp(app: RIAPP.Application): void;
        public _destroyApps(): void;
        public _throwDummy(origErr: any): void;
        public getExports(): {
            [name: string]: any;
        };
        public _checkIsDummy(error: any): boolean;
        public _registerObject(root: IExports, name: string, obj: any): any;
        public _getObject(root: IExports, name: string): any;
        public _removeObject(root: IExports, name: string): any;
        public _processTemplateSections(root: {
            querySelectorAll: (selectors: string) => NodeList;
        }): void;
        private _processTemplateSection(templateSection, app);
        private _registerTemplateLoaderCore(name, loader);
        private _getTemplateLoaderCore(name);
        public _loadTemplatesAsync(fn_loader: () => IPromise<string>, app: RIAPP.Application): IPromise<any>;
        public _registerTemplateLoader(name: any, loader: {
            fn_loader: () => IPromise<string>;
            groupName?: string;
        }): any;
        public _getTemplateLoader(name: string): () => IPromise<any>;
        public _registerTemplateGroup(groupName: string, group: {
            fn_loader?: () => IPromise<string>;
            url?: string;
            names: string[];
            app?: RIAPP.Application;
        }): void;
        public _getTemplateGroup(name: string): {
            fn_loader?: () => IPromise<string>;
            url?: string;
            names: string[];
            app?: RIAPP.Application;
            promise?: IPromise<string>;
        };
        public _waitForNotLoading(callback: any, callbackArgs: any): void;
        public reThrow(ex: any, isHandled: any): void;
        public onModuleLoaded(name: string, module_obj: any): void;
        public _initialize(): void;
        public isModuleLoaded(name: string): boolean;
        public findApp(name: string): RIAPP.Application;
        public destroy(): void;
        public registerType(name: string, obj: any): any;
        public getType(name: string): any;
        public registerConverter(name: string, obj: RIAPP.MOD.converter.IConverter): void;
        public _getConverter(name: string): RIAPP.MOD.converter.IConverter;
        public registerElView(name: string, elViewType: any): void;
        public getImagePath(imageName: string): string;
        public loadTemplates(url: string): void;
        public toString(): string;
        public parser : RIAPP.MOD.parser.Parser;
        public isLoading : boolean;
        public $ : JQueryStatic;
        public window : Window;
        public document : Document;
        public currentSelectable : ISelectable;
        public defaults : RIAPP.MOD.defaults.Defaults;
        public consts : typeof RIAPP.MOD.consts;
        public utils : RIAPP.MOD.utils.Utils;
        public UC : any;
        public moduleNames : any[];
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
                DYNACONT: string;
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
            function defineProps(proto: any, props?: any, propertyDescriptors?: any): any;
            function __extendType(_super: any, pds: any, props: any): () => void;
            interface IEditable {
                beginEdit(): boolean;
                endEdit(): boolean;
                cancelEdit(): boolean;
                isEditing: boolean;
            }
            interface ISubmittable {
                submitChanges(): RIAPP.IVoidPromise;
                _isCanSubmit: boolean;
            }
            interface IDatepicker {
                datepickerRegion: string;
                dateFormat: string;
                attachTo($el: any, options?: any): any;
                detachFrom($el: any): any;
                parseDate(str: string): Date;
                formatDate(date: Date): string;
            }
            class Checks {
                static isNull(a: any): boolean;
                static isUndefined(a: any): boolean;
                static isNt(a: any): boolean;
                static isFunction: (a: any) => boolean;
                static isString(a: any): boolean;
                static isArray: (o: any) => boolean;
                static isBoolean(a: any): boolean;
                static isDate(a: any): boolean;
                static isHTML(a: any): boolean;
                static isNumber(a: any): boolean;
                static isObject(a: any): boolean;
                static isSimpleObject(a: any): boolean;
                static isRegExp(a: any): boolean;
                static isNumeric(obj: any): boolean;
                static isBoolString(a: any): boolean;
                static isBaseObj(obj: any): boolean;
                static isBinding(obj: any): boolean;
                static isElView(obj: any): boolean;
                static isTemplateElView(obj: any): boolean;
                static isEditable(obj: any): boolean;
                static isDataForm(el: HTMLElement): boolean;
                static isInsideDataForm(el: HTMLElement): any;
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
                dateToValue(dt: Date, dtcnv: MOD.consts.DATE_CONVERSION, stz: number): string;
                compareVals(v1: any, v2: any, dataType: MOD.consts.DATA_TYPE): boolean;
                stringifyValue(v: any, dcnv: MOD.consts.DATE_CONVERSION, dataType: MOD.consts.DATA_TYPE, stz: number): string;
                parseValue(v: string, dataType: MOD.consts.DATA_TYPE, dcnv: MOD.consts.DATE_CONVERSION, stz: number): any;
            }
            var valueUtils: IValueUtils;
            class LifeTimeScope extends RIAPP.BaseObject {
                private _objs;
                constructor();
                static create(): LifeTimeScope;
                public addObj(b: RIAPP.BaseObject): void;
                public removeObj(b: RIAPP.BaseObject): void;
                public getObjs(): RIAPP.BaseObject[];
                public destroy(): void;
                public toString(): string;
            }
            class PropWatcher extends RIAPP.BaseObject {
                public _objId: string;
                public _objs: RIAPP.BaseObject[];
                constructor();
                static create(): PropWatcher;
                public addPropWatch(obj: RIAPP.BaseObject, prop: string, fn_onChange: (prop: string) => void): void;
                public addWatch(obj: RIAPP.BaseObject, props: string[], fn_onChange: (prop: string) => void): void;
                public removeWatch(obj: RIAPP.BaseObject): void;
                public destroy(): void;
                public toString(): string;
                public uniqueID : string;
            }
            class WaitQueue extends RIAPP.BaseObject {
                public _objId: string;
                public _owner: RIAPP.BaseObject;
                public _queue: any;
                constructor(owner: RIAPP.BaseObject);
                static create(owner: RIAPP.BaseObject): WaitQueue;
                public _checkQueue(prop: string, value: any): void;
                public enQueue(options: any): void;
                public destroy(): void;
                public toString(): string;
                public uniqueID : string;
                public owner : RIAPP.BaseObject;
            }
            class Utils {
                constructor();
                static create(): Utils;
                public check : typeof Checks;
                public str : typeof StringUtils;
                public validation : typeof Validations;
                public getNewID(): number;
                public isContained(oNode: any, oCont: any): boolean;
                public slice: (start: number, end?: number) => any[];
                public get_timeZoneOffset: () => number;
                public parseBool(bool_value: any): any;
                public round(num: number, decimals: number): number;
                public performAjaxCall(url: string, postData: string, async: boolean, fn_success: (res: string) => void, fn_error: (res: any) => void, context: any): RIAPP.IPromise<string>;
                public performAjaxGet(url: string): RIAPP.IPromise<string>;
                public format: (format_str: string, ...args: any[]) => string;
                public extend(deep: boolean, defaults: any, options: any): any;
                public removeNode(node: Node): void;
                public insertAfter(referenceNode: Node, newNode: Node): void;
                public getProps(obj: any): string[];
                public getParentDataForm(rootForm: HTMLElement, el: HTMLElement): HTMLElement;
                public forEachProp(obj: any, fn: (name: string) => void): void;
                public addToolTip($el: JQuery, tip: string, className?: string): void;
                public hasProp(obj: any, prop: string): boolean;
                public createDeferred(): RIAPP.IDeferred<any>;
                public cloneObj(o: any, mergeIntoObj: any): any;
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
            class BaseError extends RIAPP.BaseObject {
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
            class Defaults extends RIAPP.BaseObject {
                public _imagesPath: string;
                public _datepicker: MOD.utils.IDatepicker;
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
                public datepicker : MOD.utils.IDatepicker;
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
                public _resolvePath(root: any, parts: string[]): any;
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
        module datepicker {
            class Datepicker extends RIAPP.BaseObject implements MOD.utils.IDatepicker {
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
            class Command extends RIAPP.BaseObject implements ICommand {
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
            class BaseViewModel extends RIAPP.BaseObject {
                public _objId: string;
                public _app: RIAPP.Application;
                constructor(app: RIAPP.Application);
                public _onError(error: any, source: any): boolean;
                public toString(): string;
                public destroy(): void;
                public uniqueID : string;
                public $ : JQueryStatic;
                public app : RIAPP.Application;
            }
        }
    }
}
declare module RIAPP {
    module MOD {
        module baseElView {
            class PropChangedCommand extends MOD.mvvm.Command {
                constructor(fn_action: (sender: any, param: {
                    property: string;
                }) => void, thisObj: any, fn_canExecute: (sender: any, param: {
                    property: string;
                }) => boolean);
            }
            var css: {
                fieldError: string;
                errorTip: string;
                commandLink: string;
            };
            interface IViewOptions {
                css?: string;
                tip?: string;
            }
            interface IViewType {
                new(app: RIAPP.Application, el: HTMLElement, options: IViewOptions): BaseElView;
            }
            class BaseElView extends RIAPP.BaseObject {
                public _el: HTMLElement;
                public _$el: JQuery;
                public _oldDisplay: string;
                public _objId: string;
                public _propChangedCommand: MOD.mvvm.ICommand;
                public _errors: MOD.binding.IValidationInfo[];
                public _toolTip: string;
                public _css: string;
                public _app: RIAPP.Application;
                constructor(app: RIAPP.Application, el: HTMLElement, options: IViewOptions);
                public _applyToolTip(): void;
                public _init(options: IViewOptions): void;
                public destroy(): void;
                public invokePropChanged(property: string): void;
                public _getErrorTipInfo(errors: MOD.binding.IValidationInfo[]): string;
                public _setFieldError(isError: boolean): void;
                public _updateErrorUI(el: HTMLElement, errors: MOD.binding.IValidationInfo[]): void;
                public _onError(error: any, source: any): boolean;
                public _setToolTip($el: JQuery, tip: string, className?: string): void;
                public toString(): string;
                public $el : JQuery;
                public el : HTMLElement;
                public uniqueID : string;
                public isVisible : boolean;
                public propChangedCommand : MOD.mvvm.ICommand;
                public validationErrors : MOD.binding.IValidationInfo[];
                public dataNameAttr : string;
                public toolTip : string;
                public css : string;
                public app : RIAPP.Application;
            }
            class InputElView extends BaseElView {
                constructor(app: RIAPP.Application, el: HTMLInputElement, options: IViewOptions);
                public isEnabled : boolean;
                public el : HTMLInputElement;
                public value : string;
            }
            class CommandElView extends BaseElView {
                public _command: MOD.mvvm.Command;
                public _commandParam: any;
                constructor(app: RIAPP.Application, el: HTMLElement, options: IViewOptions);
                public destroy(): void;
                public invokeCommand(): void;
                public _onCommandChanged(): void;
                public _setCommand(v: MOD.mvvm.Command): void;
                public toString(): string;
                public isEnabled : boolean;
                public command : MOD.mvvm.Command;
                public commandParam : any;
            }
            class TemplateCommand extends MOD.mvvm.Command {
                constructor(fn_action: (sender: TemplateElView, param: {
                    template: MOD.template.Template;
                    isLoaded: boolean;
                }) => void, thisObj: any, fn_canExecute: (sender: TemplateElView, param: {
                    template: MOD.template.Template;
                    isLoaded: boolean;
                }) => boolean);
            }
            class TemplateElView extends CommandElView {
                public _template: MOD.template.Template;
                public _isEnabled: boolean;
                constructor(app: RIAPP.Application, el: HTMLElement, options: IViewOptions);
                public templateLoaded(template: MOD.template.Template): void;
                public templateUnloading(template: MOD.template.Template): void;
                public toString(): string;
                public isEnabled : boolean;
            }
            class BusyElView extends BaseElView {
                public _delay: number;
                public _timeOut: number;
                public _loaderPath: string;
                public _$loader: any;
                public _isBusy: boolean;
                constructor(app: RIAPP.Application, el: HTMLElement, options: IViewOptions);
                public _init(options: any): void;
                public destroy(): void;
                public toString(): string;
                public isBusy : boolean;
                public delay : number;
            }
            class DynaContentElView extends BaseElView {
                public _dataContext: any;
                public _template: MOD.template.Template;
                constructor(app: RIAPP.Application, el: HTMLElement, options: IViewOptions);
                public _templateChanged(): void;
                public updateTemplate(name: string): void;
                public destroy(): void;
                public templateID : string;
                public template : MOD.template.Template;
                public dataContext : any;
            }
            class CheckBoxElView extends InputElView {
                public _val: boolean;
                public _init(options: IViewOptions): void;
                public _setFieldError(isError: boolean): void;
                public destroy(): void;
                public toString(): string;
                public checked : boolean;
            }
            class CheckBoxThreeStateElView extends InputElView {
                public _val: boolean;
                public _cbxVal: number;
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
                constructor(app: RIAPP.Application, el: HTMLTextAreaElement, options: ITextAreaOptions);
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
                public _val: boolean;
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
                public _preventDefault: boolean;
                constructor(app: RIAPP.Application, el: HTMLElement, options: IAncorOptions);
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
                public _imageSrc: string;
                public _image: HTMLImageElement;
                public _preventDefault: boolean;
                constructor(app: RIAPP.Application, el: HTMLAnchorElement, options: IAncorOptions);
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
                public _expandedsrc: string;
                public _collapsedsrc: string;
                public _isExpanded: boolean;
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
                constructor(app: RIAPP.Application, el: HTMLImageElement, options: IViewOptions);
                public toString(): string;
                public el : HTMLImageElement;
                public src : string;
            }
            class TabsElView extends BaseElView {
                public _tabsEventCommand: MOD.mvvm.ICommand;
                public _tabOpts: any;
                public _init(options: any): void;
                public _createTabs(): void;
                public _destroyTabs(): void;
                public invokeTabsEvent(eventName: string, args: any): void;
                public destroy(): void;
                public toString(): string;
                public tabsEventCommand : MOD.mvvm.ICommand;
            }
            interface IDatePickerOptions extends ITextBoxOptions {
                datepicker?: any;
            }
            class DatePickerElView extends TextBoxElView {
                public _init(options: IDatePickerOptions): void;
                public destroy(): void;
                public toString(): string;
            }
        }
    }
}
declare module RIAPP {
    module MOD {
        module binding {
            var BINDING_MODE: string[];
            interface IBindingOptions {
                mode?: string;
                converterParam?: any;
                converter?: MOD.converter.IConverter;
                targetPath: string;
                sourcePath?: string;
                target?: RIAPP.BaseObject;
                source?: any;
                isSourceFixed?: boolean;
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
            function _checkIsErrorNotification(obj: any): boolean;
            class ValidationError extends MOD.errors.BaseError {
                public _errors: IValidationInfo[];
                public _item: any;
                constructor(errorInfo: IValidationInfo[], item: any);
                public item : any;
                public errors : IValidationInfo[];
            }
            class Binding extends RIAPP.BaseObject {
                private _state;
                private _mode;
                private _converter;
                private _converterParam;
                private _srcPath;
                private _tgtPath;
                private _isSourceFixed;
                private _bounds;
                private _objId;
                private _ignoreSrcChange;
                private _ignoreTgtChange;
                private _sourceObj;
                private _targetObj;
                private _source;
                private _target;
                private _appName;
                constructor(options: IBindingOptions, appName?: string);
                public _getOnTgtDestroyedProxy(): (s: any, a: any) => void;
                public _getOnSrcDestroyedProxy(): (s: any, a: any) => void;
                public _getUpdTgtProxy(): () => void;
                public _getUpdSrcProxy(): () => void;
                public _getSrcErrChangedProxy(): (s: any, a: any) => void;
                public _onSrcErrorsChanged(): void;
                public _onError(error: any, source: any): boolean;
                public _getTgtChangedFn(self: any, obj: any, prop: string, restPath: string[], lvl: number): (sender: any, data: any) => void;
                public _getSrcChangedFn(self: any, obj: any, prop: string, restPath: string[], lvl: number): (sender: any, data: any) => void;
                public _parseSrcPath(obj: any, path: string[], lvl: number): void;
                public _parseSrcPath2(obj: any, path: string[], lvl: number): void;
                public _parseTgtPath(obj: any, path: string[], lvl: number): void;
                public _parseTgtPath2(obj: any, path: string[], lvl: number): void;
                public _checkBounded(obj: RIAPP.BaseObject, to: string, lvl: number, restPath: string[]): void;
                public _onTgtDestroyed(sender: any, args: any): void;
                public _onSrcDestroyed(sender: any, args: any): void;
                public _bindToSource(): void;
                public _bindToTarget(): void;
                public _updateTarget(): void;
                public _updateSource(): void;
                public destroy(): void;
                public toString(): string;
                public bindingID : string;
                public target : RIAPP.BaseObject;
                public source : any;
                public targetPath : string[];
                public sourcePath : string[];
                public sourceValue : any;
                public targetValue : any;
                public mode : string;
                public converter : MOD.converter.IConverter;
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
                isPrimaryKey: number;
                isRowTimeStamp: boolean;
                dataType: MOD.consts.DATA_TYPE;
                isNullable: boolean;
                maxLength: number;
                isReadOnly: boolean;
                isAutoGenerated: boolean;
                allowClientDefault: boolean;
                dateConversion: MOD.consts.DATE_CONVERSION;
                isClientOnly: boolean;
                isCalculated: boolean;
                isNeedOriginal: boolean;
                dependentOn: string;
                range: string;
                regex: string;
                isNavigation: boolean;
                fieldName: string;
                dependents?: string[];
            }
            class CollectionItem extends RIAPP.BaseObject implements MOD.binding.IErrorNotification, MOD.utils.IEditable, MOD.utils.ISubmittable {
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
                public _validate(): MOD.binding.IValidationInfo;
                public _skipValidate(fieldInfo: IFieldInfo, val: any): boolean;
                public _validateField(fieldName: any): MOD.binding.IValidationInfo;
                public _validateAll(): MOD.binding.IValidationInfo[];
                public _checkVal(fieldInfo: any, val: any): any;
                public _resetIsNew(): void;
                public _onAttaching(): void;
                public _onAttach(): void;
                public getFieldInfo(fieldName: string): IFieldInfo;
                public getFieldNames(): string[];
                public getFieldErrors(fieldName: any): MOD.binding.IValidationInfo[];
                public getAllErrors(): MOD.binding.IValidationInfo[];
                public getErrorString(): string;
                public submitChanges(): RIAPP.IVoidPromise;
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
                public getIErrorNotification(): MOD.binding.IErrorNotification;
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
            class BaseCollection<TItem extends CollectionItem> extends RIAPP.BaseObject {
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
                public _errors: {
                    [item_key: string]: {
                        [fieldName: string]: string[];
                    };
                };
                public _ignoreChangeErrors: boolean;
                public _pkInfo: IFieldInfo[];
                public _isUpdating: boolean;
                public _isClearing: boolean;
                public _waitQueue: MOD.utils.WaitQueue;
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
                public _validateItem(item: TItem): MOD.binding.IValidationInfo;
                public _validateItemField(item: TItem, fieldName: string): MOD.binding.IValidationInfo;
                public _addErrors(item: TItem, errors: MOD.binding.IValidationInfo[]): void;
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
                public getFieldInfo(fieldName: string): IFieldInfo;
                public getFieldNames(): string[];
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
                public sort(fieldNames: string[], sortOrder: SORT_ORDER): RIAPP.IPromise<any>;
                public sortLocal(fieldNames: string[], sortOrder: string): void;
                public sortLocalByFunc(fn: (a: any, b: any) => number): void;
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
                public _keyName: string;
                constructor(itemType: IListItemConstructor<TItem, TObj>, keyName: string, props: IPropInfo[]);
                public _getNewKey(item: TItem): string;
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
            class Template extends RIAPP.BaseObject {
                public _dctxt: any;
                public _el: HTMLElement;
                public _isDisabled: boolean;
                public _lfTime: MOD.utils.LifeTimeScope;
                public _templateID: string;
                public _templElView: MOD.baseElView.TemplateElView;
                public _promise: any;
                public _busyTimeOut: number;
                public _app: RIAPP.Application;
                constructor(app: RIAPP.Application, templateID: string);
                public _getBindings(): MOD.binding.Binding[];
                public _getElViews(): MOD.baseElView.BaseElView[];
                public _getTemplateElView(): MOD.baseElView.TemplateElView;
                public _loadTemplateElAsync(name: any): any;
                public _appendIsBusy(el: any): void;
                public _removeIsBusy(el: any): void;
                public _loadTemplate(): void;
                public _updateBindingSource(): void;
                public _updateIsDisabled(): void;
                public _unloadTemplate(): void;
                public destroy(): void;
                public findElByDataName(name: string): HTMLElement[];
                public findElViewsByDataName(name: string): MOD.baseElView.BaseElView[];
                public toString(): string;
                public dataContext : any;
                public templateID : string;
                public el : HTMLElement;
                public isDisabled : boolean;
                public app : RIAPP.Application;
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
                    object: RIAPP.BaseObject;
                    isCachedExternally: boolean;
                }) => void, namespace?: string): void;
                addOnObjectNeeded(fn: (sender: any, args: {
                    objectKey: string;
                    object: RIAPP.BaseObject;
                }) => void, namespace?: string): void;
            }
            interface IContentOptions {
                name?: string;
                readOnly?: boolean;
                initContentFn?: (content: IExternallyCachable) => void;
                fieldInfo?: MOD.collection.IFieldInfo;
                bindingInfo?: IBindingInfo;
                displayInfo?: {
                    displayCss?: string;
                    editCss?: string;
                };
                templateInfo?: ITemplateInfo;
                fieldName?: string;
                options?: any;
            }
            interface IContentType {
                new(app: RIAPP.Application, parentEl: HTMLElement, options: IContentOptions, dctx: any, isEditing: boolean): IContent;
            }
            interface IContentFactory {
                getContentType(options: IContentOptions): IContentType;
                createContent(parentEl: HTMLElement, options: IContentOptions, dctx: any, isEditing: boolean): IContent;
                isExternallyCachable(contentType: any): boolean;
            }
            function parseContentAttr(content_attr: string): IContentOptions;
            function getBindingOptions(app: RIAPP.Application, options: IBindingInfo, defaultTarget: RIAPP.BaseObject, defaultSource: any): MOD.binding.IBindingOptions;
            interface IContent {
                isEditing: boolean;
                dataContext: any;
                destroy(): void;
            }
            class BindingContent extends RIAPP.BaseObject implements IContent {
                public _parentEl: HTMLElement;
                public _el: HTMLElement;
                public _options: IContentOptions;
                public _isReadOnly: boolean;
                public _isEditing: boolean;
                public _dctx: any;
                public _lfScope: MOD.utils.LifeTimeScope;
                public _tgt: MOD.baseElView.BaseElView;
                public _app: RIAPP.Application;
                constructor(app: RIAPP.Application, parentEl: HTMLElement, options: IContentOptions, dctx: any, isEditing: boolean);
                public _init(): void;
                public _updateCss(): void;
                public _canBeEdited(): boolean;
                public _createTargetElement(): MOD.baseElView.BaseElView;
                public _getBindingOption(bindingInfo: IBindingInfo, tgt: RIAPP.BaseObject, dctx: any, targetPath: string): MOD.binding.IBindingOptions;
                public _getBindings(): MOD.binding.Binding[];
                public _updateBindingSource(): void;
                public _cleanUp(): void;
                public getFieldInfo(): MOD.collection.IFieldInfo;
                public _getBindingInfo(): IBindingInfo;
                public _getDisplayInfo(): {
                    displayCss?: string;
                    editCss?: string;
                };
                public _getElementView(el: HTMLElement, view_info: {
                    name: string;
                    options: any;
                }): MOD.baseElView.BaseElView;
                public update(): void;
                public destroy(): void;
                public toString(): string;
                public parentEl : HTMLElement;
                public target : MOD.baseElView.BaseElView;
                public isEditing : boolean;
                public dataContext : any;
                public app : RIAPP.Application;
            }
            class TemplateContent extends RIAPP.BaseObject implements IContent {
                public _parentEl: HTMLElement;
                public _template: MOD.template.Template;
                public _templateInfo: ITemplateInfo;
                public _isEditing: boolean;
                public _dctx: any;
                public _app: RIAPP.Application;
                constructor(app: RIAPP.Application, parentEl: HTMLElement, options: IContentOptions, dctx: any, isEditing: boolean);
                public _createTemplate(): MOD.template.Template;
                public update(): void;
                public _cleanUp(): void;
                public destroy(): void;
                public toString(): string;
                public app : RIAPP.Application;
                public parentEl : HTMLElement;
                public template : MOD.template.Template;
                public isEditing : boolean;
                public dataContext : any;
            }
            class BoolContent extends BindingContent {
                public _init(): void;
                public _createCheckBoxView(): MOD.baseElView.CheckBoxElView;
                public _createTargetElement(): MOD.baseElView.BaseElView;
                public _updateCss(): void;
                public destroy(): void;
                public _cleanUp(): void;
                public update(): void;
                public toString(): string;
            }
            class DateContent extends BindingContent {
                public _fn_cleanup: () => void;
                constructor(app: RIAPP.Application, parentEl: HTMLElement, options: IContentOptions, dctx: any, isEditing: boolean);
                public _getBindingOption(bindingInfo: IBindingInfo, tgt: RIAPP.BaseObject, dctx: any, targetPath: string): MOD.binding.IBindingOptions;
                public _createTargetElement(): MOD.baseElView.BaseElView;
                public toString(): string;
            }
            class DateTimeContent extends BindingContent {
                public _getBindingOption(bindingInfo: IBindingInfo, tgt: RIAPP.BaseObject, dctx: any, targetPath: string): MOD.binding.IBindingOptions;
                public toString(): string;
            }
            class NumberContent extends BindingContent {
                static __allowedKeys: number[];
                private _allowedKeys;
                public _getBindingOption(bindingInfo: IBindingInfo, tgt: RIAPP.BaseObject, dctx: any, targetPath: string): MOD.binding.IBindingOptions;
                public update(): void;
                public _previewKeyPress(keyCode: number, value: string): boolean;
                public toString(): string;
            }
            class StringContent extends BindingContent {
                static __allowedKeys: number[];
                private _allowedKeys;
                public update(): void;
                public _previewKeyPress(fieldInfo: MOD.collection.IFieldInfo, keyCode: number, value: string): boolean;
                public toString(): string;
            }
            class MultyLineContent extends BindingContent {
                static __allowedKeys: number[];
                private _allowedKeys;
                constructor(app: RIAPP.Application, parentEl: HTMLElement, options: IContentOptions, dctx: any, isEditing: boolean);
                public _createTargetElement(): MOD.baseElView.BaseElView;
                public update(): void;
                public _previewKeyPress(fieldInfo: MOD.collection.IFieldInfo, keyCode: number, value: string): boolean;
                public toString(): string;
            }
            class ContentFactory implements IContentFactory {
                public _app: RIAPP.Application;
                public _nextFactory: IContentFactory;
                constructor(app: RIAPP.Application, nextFactory?: IContentFactory);
                public getContentType(options: IContentOptions): IContentType;
                public createContent(parentEl: HTMLElement, options: IContentOptions, dctx: any, isEditing: boolean): IContent;
                public isExternallyCachable(contentType: any): boolean;
                public app : RIAPP.Application;
            }
            function initModule(app: RIAPP.Application): typeof baseContent;
        }
    }
}
declare module RIAPP {
    module MOD {
        module dataform {
            var css: {
                dataform: string;
            };
            class DataForm extends RIAPP.BaseObject {
                private _DATA_CONTENT_SELECTOR;
                public _el: HTMLElement;
                public _$el: JQuery;
                public _objId: string;
                public _dataContext: RIAPP.BaseObject;
                public _isEditing: boolean;
                public _isDisabled: boolean;
                public _content: MOD.baseContent.IContent[];
                public _lfTime: MOD.utils.LifeTimeScope;
                public _contentCreated: boolean;
                public _supportEdit: boolean;
                public _supportErrNotify: boolean;
                public _parentDataForm: MOD.baseElView.BaseElView;
                public _errors: MOD.binding.IValidationInfo[];
                public _app: RIAPP.Application;
                constructor(app: RIAPP.Application, el: HTMLElement);
                public _getBindings(): MOD.binding.Binding[];
                public _getElViews(): MOD.baseElView.BaseElView[];
                public _updateIsDisabled(): void;
                public _updateContent(): void;
                public _onDSErrorsChanged(): void;
                public _bindDS(): void;
                public _unbindDS(): void;
                public _clearContent(): void;
                public destroy(): void;
                public toString(): string;
                public app : RIAPP.Application;
                public el : HTMLElement;
                public dataContext : RIAPP.BaseObject;
                public isEditing : boolean;
                public validationErrors : MOD.binding.IValidationInfo[];
                public isDisabled : boolean;
            }
            class DataFormElView extends MOD.baseElView.BaseElView {
                public _dataContext: RIAPP.BaseObject;
                public _form: DataForm;
                public _options: MOD.baseElView.IViewOptions;
                constructor(app: RIAPP.Application, el: HTMLSelectElement, options: MOD.baseElView.IViewOptions);
                public _getErrorTipInfo(errors: MOD.binding.IValidationInfo[]): string;
                public _updateErrorUI(el: HTMLElement, errors: MOD.binding.IValidationInfo[]): void;
                public destroy(): void;
                public toString(): string;
                public dataContext : RIAPP.BaseObject;
                public form : DataForm;
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
            class DataOperationError extends MOD.errors.BaseError {
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
            interface ICachedPage {
                items: Entity[];
                pageIndex: number;
            }
            interface IQueryParamInfo {
                dataType: MOD.consts.DATA_TYPE;
                dateConversion: MOD.consts.DATE_CONVERSION;
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
                    kind: MOD.collection.FILTER_TYPE;
                    values: any[];
                }[];
            }
            interface ISortInfo {
                sortItems: {
                    fieldName: string;
                    sortOrder: MOD.collection.SORT_ORDER;
                }[];
            }
            interface IEntityConstructor {
                new(dbSet: DbSet<Entity>, row: IRowData, names: string[]): Entity;
            }
            interface IValueChange {
                val: any;
                orig: any;
                fieldName: string;
                flags: number;
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
            interface IPermissions extends MOD.collection.IPermissions {
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
            interface IMethodInvokeInfo {
                methodName: string;
                paramInfo: IParamInfo;
            }
            interface IDbSetInfo {
                dbSetName: string;
                enablePaging: boolean;
                pageSize: number;
                fieldInfos: MOD.collection.IFieldInfo[];
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
            interface IDbSetOptions extends MOD.collection.ICollectionOptions {
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
            interface IGetDataInfo {
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
            interface ILoadResult<TEntity extends Entity> {
                fetchedItems: TEntity[];
                newItems: TEntity[];
                isPageChanged: boolean;
                outOfBandData: any;
            }
            interface IIncludedResult {
                names: string[];
                rows: {
                    key: string;
                    values: string[];
                }[];
                rowCount: number;
                dbSetName: string;
            }
            interface IRowData {
                key: string;
                values: string[];
            }
            interface IGetDataResult {
                names: string[];
                rows: IRowData[];
                rowCount: number;
                dbSetName: string;
                pageIndex: number;
                pageCount: number;
                totalCount: number;
                extraInfo: any;
                error: {
                    name: string;
                    message: string;
                };
                included: IIncludedResult[];
            }
            interface IDbSetConstructor {
                new(dbContext: DbContext): DbSet<Entity>;
            }
            class DataCache extends RIAPP.BaseObject {
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
                public pageSize : any;
                public loadPageCount : any;
                public totalCount : number;
                public cacheSize : number;
            }
            class TDataQuery<TEntity extends Entity> extends RIAPP.BaseObject {
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
                public getFieldInfo(fieldName: string): MOD.collection.IFieldInfo;
                public getFieldNames(): string[];
                private _addSort(fieldName, sortOrder);
                private _addFilterItem(fieldName, operand, value);
                public where(fieldName: string, operand: MOD.collection.FILTER_TYPE, value: any): TDataQuery<TEntity>;
                public and(fieldName: string, operand: MOD.collection.FILTER_TYPE, value: any): TDataQuery<TEntity>;
                public orderBy(fieldName: string, sortOrder?: MOD.collection.SORT_ORDER): TDataQuery<TEntity>;
                public thenBy(fieldName: string, sortOrder?: MOD.collection.SORT_ORDER): TDataQuery<TEntity>;
                public clearSort(): TDataQuery<TEntity>;
                public clearFilter(): TDataQuery<TEntity>;
                public clearParams(): TDataQuery<TEntity>;
                public _clearCache(): void;
                public _getCache(): DataCache;
                public _reindexCache(): void;
                public _isPageCached(pageIndex: number): boolean;
                public _resetCacheInvalidated(): void;
                public load(): RIAPP.IPromise<ILoadResult<TEntity>>;
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
            class Entity extends MOD.collection.CollectionItem {
                private __changeType;
                private __isRefreshing;
                private __isCached;
                private __dbSet;
                private _srvRowKey;
                private _origVals;
                private _saveChangeType;
                constructor(dbSet: DbSet<Entity>, row: IRowData, names: string[]);
                public _updateKeys(srvKey: string): void;
                public _initRowInfo(row: IRowData, names: string[]): void;
                public _checkCanRefresh(): void;
                public _refreshValue(val: any, fieldName: string, refreshMode: REFRESH_MODE): void;
                public _refreshValues(rowInfo: IRowInfo, refreshMode: REFRESH_MODE): void;
                public _onFieldChanged(fieldInfo: MOD.collection.IFieldInfo): void;
                public _getStrValues(changedOnly: boolean): IValueChange[];
                public _getRowInfo(): IRowInfo;
                public _fldChanging(fieldInfo: MOD.collection.IFieldInfo, oldV: any, newV: any): boolean;
                public _fldChanged(fieldInfo: MOD.collection.IFieldInfo, oldV: any, newV: any): boolean;
                public _clearFieldVal(fieldName: string): void;
                public _skipValidate(fieldInfo: MOD.collection.IFieldInfo, val: any): boolean;
                public _getFieldVal(fieldName: string): any;
                public _setFieldVal(fieldName: string, val: any): boolean;
                public _onAttaching(): void;
                public _onAttach(): void;
                public _beginEdit(): boolean;
                public _endEdit(): boolean;
                public deleteItem(): boolean;
                public deleteOnSubmit(): boolean;
                public acceptChanges(rowInfo?: IRowInfo): void;
                public rejectChanges(): void;
                public submitChanges(): RIAPP.IVoidPromise;
                public refresh(): RIAPP.IPromise<Entity>;
                public cancelEdit(): boolean;
                public getDbContext(): DbContext;
                public getDbSet(): DbSet<Entity>;
                public toString(): string;
                public destroy(): void;
                public _isCanSubmit : boolean;
                public _changeType : MOD.collection.STATUS;
                public _isNew : boolean;
                public _isDeleted : boolean;
                public _entityType : IEntityConstructor;
                public _srvKey : string;
                public _dbSetName : string;
                public _serverTimezone : number;
                public _collection : MOD.collection.BaseCollection<Entity>;
                public _dbSet : DbSet<Entity>;
                public _isRefreshing : boolean;
                public _isCached : boolean;
                public isHasChanges : boolean;
            }
            class DbSet<TEntity extends Entity> extends MOD.collection.BaseCollection<TEntity> {
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
                constructor(opts: IDbSetConstuctorOptions);
                public getFieldInfo(fieldName: string): MOD.collection.IFieldInfo;
                public _onError(error: any, source: any): boolean;
                public _mapAssocFields(): void;
                public _updatePermissions(perms: IPermissions): void;
                public _getChildToParentNames(childFieldName: string): string[];
                public _getStrValue(val: any, fieldInfo: MOD.collection.IFieldInfo): string;
                public _doNavigationField(opts: IDbSetConstuctorOptions, fInfo: MOD.collection.IFieldInfo): {
                    getFunc: () => any;
                    setFunc: (v: any) => void;
                };
                public _doCalculatedField(opts: IDbSetConstuctorOptions, fInfo: MOD.collection.IFieldInfo): {
                    getFunc: () => any;
                };
                public _fillFromService(data: {
                    res: IGetDataResult;
                    isPageChanged: boolean;
                    fn_beforeFillEnd: () => void;
                }): ILoadResult<TEntity>;
                public _fillFromCache(data: {
                    isPageChanged: boolean;
                    fn_beforeFillEnd: () => void;
                }): ILoadResult<TEntity>;
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
                public sort(fieldNames: string[], sortOrder: MOD.collection.SORT_ORDER): RIAPP.IPromise<ILoadResult<Entity>>;
                public fillItems(data: {
                    names: string[];
                    rows: {
                        key: string;
                        values: string[];
                    }[];
                }): void;
                public defineCalculatedField(fieldName: string, getFunc: () => any): void;
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
            class DbSets extends RIAPP.BaseObject {
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
            class DbContext extends RIAPP.BaseObject {
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
                    deferred: RIAPP.IDeferred<any>;
                };
                public _serverTimezone: number;
                public _waitQueue: MOD.utils.WaitQueue;
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
                }): IMethodInvokeInfo;
                public _invokeMethod(methodInfo: IQueryInfo, data: IMethodInvokeInfo, callback: (res: {
                    result: any;
                    error: any;
                }) => void): void;
                public _loadFromCache(query: TDataQuery<Entity>, isPageChanged: boolean): ILoadResult<Entity>;
                public _loadIncluded(res: IGetDataResult): void;
                public _onLoaded(res: IGetDataResult, isPageChanged: boolean): ILoadResult<Entity>;
                public _dataSaved(res: IChangeSet): void;
                public _getChanges(): IChangeSet;
                public _getUrl(action: any): string;
                public _onItemRefreshed(res: IRefreshRowInfo, item: Entity): void;
                public _refreshItem(item: Entity): RIAPP.IPromise<Entity>;
                public _onError(error: any, source: any): boolean;
                public _onDataOperError(ex: any, oper: any): boolean;
                public _onSubmitError(error: any): void;
                public _beforeLoad(query: TDataQuery<Entity>, oldQuery: TDataQuery<Entity>, dbSet: DbSet<Entity>): void;
                public _load(query: TDataQuery<Entity>, isPageChanged: boolean): RIAPP.IPromise<ILoadResult<Entity>>;
                public getDbSet(name: string): DbSet<Entity>;
                public getAssociation(name: string): any;
                public submitChanges(): RIAPP.IVoidPromise;
                public load(query: TDataQuery<Entity>): RIAPP.IPromise<ILoadResult<Entity>>;
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
            class Association extends RIAPP.BaseObject {
                public _objId: string;
                public _name: string;
                public _dbContext: DbContext;
                public _onDeleteAction: DELETE_ACTION;
                public _parentDS: DbSet<Entity>;
                public _childDS: DbSet<Entity>;
                public _parentFldInfos: MOD.collection.IFieldInfo[];
                public _childFldInfos: MOD.collection.IFieldInfo[];
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
                public _onParentCollChanged(args: MOD.collection.ICollChangedArgs<Entity>): void;
                public _onParentFill(args: MOD.collection.ICollFillArgs<Entity>): void;
                public _onParentEdit(item: Entity, isBegin: boolean, isCanceled: boolean): void;
                public _onParentCommitChanges(item: Entity, isBegin: boolean, isRejected: boolean, changeType: MOD.collection.STATUS): void;
                public _storeParentFKey(item: Entity): void;
                public _checkParentFKey(item: Entity): void;
                public _onParentStatusChanged(item: Entity, oldChangeType: MOD.collection.STATUS): void;
                public _onChildCollChanged(args: MOD.collection.ICollChangedArgs<Entity>): void;
                public _notifyChildrenChanged(changed: string[]): void;
                public _notifyParentChanged(changed: string[]): void;
                public _notifyChanged(changed_pkeys: string[], changed_ckeys: string[]): void;
                public _onChildFill(args: MOD.collection.ICollFillArgs<Entity>): void;
                public _onChildEdit(item: Entity, isBegin: boolean, isCanceled: boolean): void;
                public _onChildCommitChanges(item: Entity, isBegin: boolean, isRejected: boolean, changeType: MOD.collection.STATUS): void;
                public _storeChildFKey(item: Entity): void;
                public _checkChildFKey(item: Entity): void;
                public _onChildStatusChanged(item: Entity, oldChangeType: MOD.collection.STATUS): void;
                public _getItemKey(finf: MOD.collection.IFieldInfo[], ds: DbSet<Entity>, item: Entity): string;
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
                public parentFldInfos : MOD.collection.IFieldInfo[];
                public childFldInfos : MOD.collection.IFieldInfo[];
                public onDeleteAction : DELETE_ACTION;
            }
            class DataView<TItem extends MOD.collection.CollectionItem> extends MOD.collection.BaseCollection<TItem> {
                public _dataSource: MOD.collection.BaseCollection<TItem>;
                public _fn_filter: (item: TItem) => boolean;
                public _fn_sort: (item1: TItem, item2: TItem) => number;
                public _fn_itemsProvider: (ds: MOD.collection.BaseCollection<TItem>) => TItem[];
                public _isDSFilling: boolean;
                public _isAddingNew: boolean;
                public _objId: string;
                constructor(options: {
                    dataSource: MOD.collection.BaseCollection<TItem>;
                    fn_filter?: (item: TItem) => boolean;
                    fn_sort?: (item1: TItem, item2: TItem) => number;
                    fn_itemsProvider?: (ds: MOD.collection.BaseCollection<TItem>) => TItem[];
                });
                public _getEventNames(): string[];
                public addOnViewRefreshed(fn: (sender: DataView<TItem>, args: {}) => void, namespace?: string): void;
                public removeOnViewRefreshed(namespace?: string): void;
                public _filterForPaging(items: TItem[]): TItem[];
                public _onViewRefreshed(args: {}): void;
                public _refresh(isPageChanged: boolean): void;
                public _fillItems(data: {
                    items: TItem[];
                    isPageChanged: boolean;
                    clear: boolean;
                    isAppend: boolean;
                }): TItem[];
                public _onDSCollectionChanged(args: MOD.collection.ICollChangedArgs<TItem>): void;
                public _onDSFill(args: MOD.collection.ICollFillArgs<TItem>): void;
                public _onDSStatusChanged(args: MOD.collection.ICollItemStatusArgs<TItem>): void;
                public _bindDS(): void;
                public _unbindDS(): void;
                public appendItems(items: TItem[]): TItem[];
                public _getStrValue(val: any, fieldInfo: any): string;
                public _onCurrentChanging(newCurrent: TItem): void;
                public _getErrors(item: TItem): {
                    [fieldName: string]: string[];
                };
                public _onPageChanged(): void;
                public getItemsWithErrors(): TItem[];
                public addNew(): TItem;
                public removeItem(item: TItem): void;
                public sortLocal(fieldNames: string[], sortOrder: string): void;
                public getIsHasErrors(): boolean;
                public clear(): void;
                public refresh(): void;
                public destroy(): void;
                public isPagingEnabled : boolean;
                public permissions : MOD.collection.IPermissions;
                public fn_filter : (item: TItem) => boolean;
                public fn_sort : (item1: TItem, item2: TItem) => number;
                public fn_itemsProvider : (ds: MOD.collection.BaseCollection<TItem>) => TItem[];
            }
            class ChildDataView<TEntity extends Entity> extends DataView<TEntity> {
                public _parentItem: Entity;
                public _refreshTimeout: number;
                public _association: Association;
                constructor(options: {
                    association: Association;
                    fn_filter?: (item: TEntity) => boolean;
                    fn_sort?: (item1: TEntity, item2: TEntity) => number;
                });
                public _refresh(): void;
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
            interface IMappedItem {
                item: MOD.collection.CollectionItem;
                op: {
                    text: string;
                    value: any;
                    index: number;
                };
            }
            class ListBox extends RIAPP.BaseObject {
                public _el: HTMLSelectElement;
                public _$el: JQuery;
                public _objId: string;
                public _dataSource: MOD.collection.BaseCollection<MOD.collection.CollectionItem>;
                public _isRefreshing: boolean;
                public _isDSFilling: boolean;
                public _valuePath: string;
                public _textPath: string;
                public _selectedItem: MOD.collection.CollectionItem;
                public _saveSelected: MOD.collection.CollectionItem;
                public _keyMap: {
                    [key: string]: IMappedItem;
                };
                public _valMap: {
                    [val: string]: IMappedItem;
                };
                public _saveVal: any;
                public _selectedValue: any;
                constructor(el: HTMLSelectElement, dataSource: MOD.collection.BaseCollection<MOD.collection.CollectionItem>, options: IListBoxOptions);
                public destroy(): void;
                public _onChanged(): void;
                public _getValue(item: MOD.collection.CollectionItem): any;
                public _getRealValue(item: MOD.collection.CollectionItem): any;
                public _getText(item: MOD.collection.CollectionItem): string;
                public _onDSCollectionChanged(args: MOD.collection.ICollChangedArgs<MOD.collection.CollectionItem>): void;
                public _onDSFill(args: MOD.collection.ICollFillArgs<MOD.collection.CollectionItem>): void;
                public _onEdit(item: MOD.collection.CollectionItem, isBegin: boolean, isCanceled: boolean): void;
                public _onStatusChanged(item: MOD.collection.CollectionItem, oldChangeType: number): void;
                public _onCommitChanges(item: MOD.collection.CollectionItem, isBegin: boolean, isRejected: boolean, changeType: MOD.collection.STATUS): void;
                public _bindDS(): void;
                public _unbindDS(): void;
                public _addOption(item: MOD.collection.CollectionItem, first: boolean): any;
                public _removeOption(item: MOD.collection.CollectionItem): void;
                public _clear(isDestroy: boolean): void;
                public clear(): void;
                public _refresh(): void;
                public _findItemIndex(item: MOD.collection.CollectionItem): number;
                public findItemByValue(val: any): MOD.collection.CollectionItem;
                public getTextByValue(val: any): string;
                public _setIsEnabled(el: HTMLSelectElement, v: boolean): void;
                public _getIsEnabled(el: HTMLSelectElement): boolean;
                public toString(): string;
                public dataSource : MOD.collection.BaseCollection<MOD.collection.CollectionItem>;
                public selectedValue : any;
                public selectedItem : MOD.collection.CollectionItem;
                public valuePath : string;
                public textPath : string;
                public isEnabled : boolean;
                public el : HTMLSelectElement;
            }
            interface ISelectViewOptions extends IListBoxOptions, MOD.baseElView.IViewOptions {
            }
            class SelectElView extends MOD.baseElView.BaseElView {
                public _dataSource: MOD.collection.BaseCollection<MOD.collection.CollectionItem>;
                public _listBox: ListBox;
                public _options: ISelectViewOptions;
                constructor(app: RIAPP.Application, el: HTMLSelectElement, options: ISelectViewOptions);
                public destroy(): void;
                public toString(): string;
                public isEnabled : boolean;
                public el : HTMLSelectElement;
                public dataSource : MOD.collection.BaseCollection<MOD.collection.CollectionItem>;
                public selectedValue : any;
                public selectedItem : MOD.collection.CollectionItem;
                public listBox : ListBox;
            }
            interface ILookupOptions {
                dataSource: string;
                valuePath: string;
                textPath: string;
            }
            class LookupContent extends MOD.baseContent.BindingContent implements MOD.baseContent.IExternallyCachable {
                public _spanView: MOD.baseElView.SpanElView;
                public _valBinding: MOD.binding.Binding;
                public _listBinding: MOD.binding.Binding;
                public _selectView: SelectElView;
                public _isListBoxCachedExternally: boolean;
                public _value: any;
                constructor(app: RIAPP.Application, parentEl: HTMLElement, options: MOD.baseContent.IContentOptions, dctx: any, isEditing: boolean);
                public _init(): void;
                public _getEventNames(): string[];
                public addOnObjectCreated(fn: (sender: any, args: {
                    objectKey: string;
                    object: RIAPP.BaseObject;
                    isCachedExternally: boolean;
                }) => void, namespace?: string): void;
                public removeOnObjectCreated(namespace?: string): void;
                public addOnObjectNeeded(fn: (sender: any, args: {
                    objectKey: string;
                    object: RIAPP.BaseObject;
                }) => void, namespace?: string): void;
                public removeOnObjectNeeded(namespace?: string): void;
                public _getSelectView(): SelectElView;
                public _createSelectElView(el: HTMLSelectElement, options: ISelectViewOptions): SelectElView;
                public _updateTextValue(): void;
                public _getLookupText(): string;
                public _getSpanView(): MOD.baseElView.SpanElView;
                public update(): void;
                public _createTargetElement(): MOD.baseElView.BaseElView;
                public _cleanUp(): void;
                public _updateBindingSource(): void;
                public _bindToValue(): MOD.binding.Binding;
                public _bindToList(selectView: SelectElView): MOD.binding.Binding;
                public destroy(): void;
                public toString(): string;
                public value : any;
            }
            class ContentFactory implements MOD.baseContent.IContentFactory {
                public _app: RIAPP.Application;
                public _nextFactory: MOD.baseContent.IContentFactory;
                constructor(app: RIAPP.Application, nextFactory?: MOD.baseContent.IContentFactory);
                public getContentType(options: MOD.baseContent.IContentOptions): MOD.baseContent.IContentType;
                public createContent(parentEl: HTMLElement, options: MOD.baseContent.IContentOptions, dctx: any, isEditing: boolean): MOD.baseContent.IContent;
                public isExternallyCachable(contentType: any): boolean;
                public app : RIAPP.Application;
            }
            function initModule(app: RIAPP.Application): typeof listbox;
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
                fn_OnTemplateCreated?: (template: MOD.template.Template) => void;
                fn_OnTemplateDestroy?: (template: MOD.template.Template) => void;
            }
            class DataEditDialog extends RIAPP.BaseObject {
                public _objId: string;
                public _dataContext: any;
                public _templateID: string;
                public _submitOnOK: boolean;
                public _canRefresh: boolean;
                public _canCancel: boolean;
                public _fn_OnClose: (dialog: DataEditDialog) => void;
                public _fn_OnOK: (dialog: DataEditDialog) => number;
                public _fn_OnShow: (dialog: DataEditDialog) => void;
                public _fn_OnCancel: (dialog: DataEditDialog) => number;
                public _fn_OnTemplateCreated: (template: MOD.template.Template) => void;
                public _fn_OnTemplateDestroy: (template: MOD.template.Template) => void;
                public _isEditable: boolean;
                public _template: MOD.template.Template;
                public _$template: JQuery;
                public _result: string;
                private _options;
                private _dialogCreated;
                private _fn_submitOnOK;
                private _app;
                private _currentSelectable;
                constructor(app: RIAPP.Application, options: IDialogConstructorOptions);
                public addOnClose(fn: (sender: any, args: {}) => void, namespace?: string): void;
                public removeOnClose(namespace?: string): void;
                public addOnRefresh(fn: (sender: any, args: {
                    isHandled: boolean;
                }) => void, namespace?: string): void;
                public removeOnRefresh(namespace?: string): void;
                public _updateIsEditable(): void;
                public _createDialog(): void;
                public _getEventNames(): string[];
                public _createTemplate(dcxt: any): MOD.template.Template;
                public _destroyTemplate(): void;
                public _getButtons(): {
                    'id': string;
                    'text': string;
                    'class': string;
                    'click': () => void;
                }[];
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
                public dataContext : any;
                public result : string;
                public template : MOD.template.Template;
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
            class RowSelectContent extends MOD.baseContent.BoolContent {
                public _canBeEdited(): boolean;
                public toString(): string;
            }
            class BaseCell extends RIAPP.BaseObject {
                public _row: Row;
                public _el: HTMLTableCellElement;
                public _column: BaseColumn;
                public _div: HTMLElement;
                public _clickTimeOut: number;
                constructor(row: Row, options: {
                    td: HTMLTableCellElement;
                    column: any;
                });
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
                public item : MOD.collection.CollectionItem;
            }
            class DataCell extends BaseCell {
                public _content: MOD.baseContent.IContent;
                public _stateCss: string;
                constructor(row: Row, options: {
                    td: HTMLTableCellElement;
                    column: DataColumn;
                });
                public _init(): void;
                public _getInitContentFn(): (content: MOD.baseContent.IExternallyCachable) => void;
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
                public _isEditing: boolean;
                constructor(row: Row, options: {
                    td: HTMLTableCellElement;
                    column: any;
                });
                public _init(): void;
                public destroy(): void;
                public _createButtons(editing: boolean): void;
                public update(): void;
                public toString(): string;
                public isCanEdit : boolean;
                public isCanDelete : boolean;
            }
            class RowSelectorCell extends BaseCell {
                public _content: MOD.baseContent.IContent;
                public _init(): void;
                public destroy(): void;
                public toString(): string;
            }
            class DetailsCell extends RIAPP.BaseObject {
                public _row: DetailsRow;
                public _el: HTMLTableCellElement;
                public _template: MOD.template.Template;
                constructor(row: DetailsRow, options: {
                    td: HTMLTableCellElement;
                    details_id: string;
                });
                public _init(options: {
                    td: HTMLElement;
                    details_id: string;
                }): void;
                public destroy(): void;
                public toString(): string;
                public el : HTMLTableCellElement;
                public row : DetailsRow;
                public grid : DataGrid;
                public item : any;
            }
            class Row extends RIAPP.BaseObject {
                public _grid: DataGrid;
                public _el: HTMLElement;
                public _item: MOD.collection.CollectionItem;
                public _cells: BaseCell[];
                public _objId: string;
                public _expanderCell: any;
                public _actionsCell: any;
                public _rowSelectorCell: any;
                public _isCurrent: boolean;
                public _isDeleted: boolean;
                public _isSelected: boolean;
                constructor(grid: DataGrid, options: {
                    tr: HTMLElement;
                    item: MOD.collection.CollectionItem;
                });
                public _onError(error: any, source: any): boolean;
                public _createCells(): void;
                public _createCell(col: any): any;
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
                public item : MOD.collection.CollectionItem;
                public cells : BaseCell[];
                public columns : BaseColumn[];
                public uniqueID : string;
                public itemKey : string;
                public isCurrent : boolean;
                public isSelected : boolean;
                public isExpanded : boolean;
                public expanderCell : any;
                public actionsCell : any;
                public isDeleted : boolean;
                public isEditing : boolean;
            }
            class DetailsRow extends RIAPP.BaseObject {
                public _grid: DataGrid;
                public _el: HTMLTableRowElement;
                public _item: any;
                public _cell: DetailsCell;
                public _parentRow: Row;
                public _objId: string;
                public _$el: JQuery;
                constructor(grid: DataGrid, options: {
                    tr: HTMLTableRowElement;
                    details_id: string;
                });
                public _createCell(details_id: string): void;
                public destroy(): void;
                public _setParentRow(row: Row): void;
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
                content?: MOD.baseContent.IContentOptions;
            }
            class BaseColumn extends RIAPP.BaseObject {
                public _grid: DataGrid;
                public _el: HTMLTableHeaderCellElement;
                public _options: IColumnInfo;
                public _isSelected: boolean;
                public _objId: string;
                public _$extcol: JQuery;
                public _$div: JQuery;
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
                public _sortOrder: string;
                public _objCache: {
                    [key: string]: RIAPP.BaseObject;
                };
                constructor(grid: DataGrid, options: {
                    th: HTMLTableHeaderCellElement;
                    colinfo: IColumnInfo;
                });
                public _init(): void;
                public _onColumnClicked(): void;
                public _cacheObject(key: string, obj: RIAPP.BaseObject): void;
                public _getCachedObject(key: string): RIAPP.BaseObject;
                public destroy(): void;
                public toString(): string;
                public isSortable : boolean;
                public sortMemberName : string;
                public sortOrder : string;
            }
            class ExpanderColumn extends BaseColumn {
                public _init(): void;
                public toString(): string;
            }
            class RowSelectorColumn extends BaseColumn {
                public _val: boolean;
                public _$chk: JQuery;
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
                editor?: MOD.datadialog.IDialogConstructorOptions;
            }
            class DataGrid extends RIAPP.BaseObject implements RIAPP.ISelectable {
                public _options: IGridOptions;
                public _tableEl: HTMLTableElement;
                public _$tableEl: JQuery;
                public _name: string;
                public _objId: string;
                public _dataSource: MOD.collection.BaseCollection<MOD.collection.CollectionItem>;
                public _rowMap: {
                    [key: string]: Row;
                };
                public _rows: Row[];
                public _columns: BaseColumn[];
                public _isClearing: boolean;
                public _isDSFilling: boolean;
                public _currentRow: Row;
                public _expandedRow: Row;
                public _details: DetailsRow;
                public _expanderCol: ExpanderColumn;
                public _actionsCol: ActionsColumn;
                public _rowSelectorCol: RowSelectorColumn;
                public _currentColumn: BaseColumn;
                public _editingRow: Row;
                public _isSorting: boolean;
                public _dialog: MOD.datadialog.DataEditDialog;
                public _$headerDiv: JQuery;
                public _$wrapDiv: JQuery;
                public _$contaner: JQuery;
                public _chkWidthInterval: number;
                public _app: RIAPP.Application;
                constructor(app: RIAPP.Application, el: HTMLTableElement, dataSource: MOD.collection.BaseCollection<MOD.collection.CollectionItem>, options: IGridOptions);
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
                public _setCurrentColumn(column: BaseColumn): void;
                public _parseColumnAttr(column_attr: string, content_attr: string): IColumnInfo;
                public _findUndeleted(row: Row, isUp: boolean): Row;
                public _updateCurrent(row: Row, withScroll: boolean): void;
                public _scrollToCurrent(isUp: boolean): void;
                public _onRowStateChanged(row: Row, val: any): any;
                public _onCellDblClicked(cell: BaseCell): void;
                public _onError(error: any, source: any): boolean;
                public _onDSCurrentChanged(): void;
                public _onDSCollectionChanged(args: MOD.collection.ICollChangedArgs<MOD.collection.CollectionItem>): void;
                public _onDSFill(args: MOD.collection.ICollFillArgs<MOD.collection.CollectionItem>): void;
                public _onPageChanged(): void;
                public _onItemEdit(item: any, isBegin: any, isCanceled: any): void;
                public _onItemAdded(args: MOD.collection.ICollItemAddedArgs<MOD.collection.CollectionItem>): void;
                public _onItemStatusChanged(item: MOD.collection.CollectionItem, oldChangeType: MOD.collection.STATUS): void;
                public _onRowSelectionChanged(row: Row): void;
                public _onDSErrorsChanged(item: MOD.collection.CollectionItem): void;
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
                public _appendItems(newItems: MOD.collection.CollectionItem[]): void;
                public _onKeyDown(key: number, event: Event): void;
                public _onKeyUp(key: number, event: Event): void;
                public _refreshGrid(): void;
                public _createRowForItem(parent: any, item: any, pos?: number): Row;
                public _createDetails(): DetailsRow;
                public _expandDetails(parentRow: Row, expanded: boolean): void;
                public sortByColumn(column: DataColumn): void;
                public selectRows(isSelect: boolean): void;
                public findRowByItem(item: MOD.collection.CollectionItem): Row;
                public collapseDetails(): void;
                public getSelectedRows(): any[];
                public showEditDialog(): boolean;
                public scrollToCurrent(isUp: boolean): void;
                public addNew(): void;
                public destroy(): void;
                public app : RIAPP.Application;
                public $container : JQuery;
                public _tBodyEl : Element;
                public _tHeadEl : HTMLTableSectionElement;
                public _tFootEl : HTMLTableSectionElement;
                public _tHeadRow : HTMLTableRowElement;
                public _tHeadCells : any[];
                public containerEl : HTMLElement;
                public uniqueID : string;
                public name : string;
                public dataSource : MOD.collection.BaseCollection<MOD.collection.CollectionItem>;
                public rows : Row[];
                public columns : BaseColumn[];
                public currentRow : Row;
                public editingRow : Row;
                public isCanEdit : boolean;
                public isCanDelete : boolean;
                public isCanAddNew : boolean;
                public isUseScrollInto : boolean;
            }
            interface IGridViewOptions extends IGridOptions, MOD.baseElView.IViewOptions {
            }
            class GridElView extends MOD.baseElView.BaseElView {
                public _dataSource: any;
                public _grid: DataGrid;
                public _gridEventCommand: MOD.mvvm.ICommand;
                public _options: IGridViewOptions;
                public _init(options: IGridViewOptions): void;
                public destroy(): void;
                public _createGrid(): void;
                public _bindGridEvents(): void;
                public invokeGridEvent(eventName: any, args: any): void;
                public toString(): string;
                public dataSource : any;
                public grid : DataGrid;
                public gridEventCommand : MOD.mvvm.ICommand;
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
            class Pager extends RIAPP.BaseObject {
                public _el: HTMLElement;
                public _$el: JQuery;
                public _objId: string;
                public _dataSource: MOD.collection.BaseCollection<MOD.collection.CollectionItem>;
                public _showTip: boolean;
                public _showInfo: boolean;
                public _showFirstAndLast: boolean;
                public _showPreviousAndNext: boolean;
                public _showNumbers: boolean;
                public _rowsPerPage: number;
                public _rowCount: number;
                public _currentPage: number;
                public _useSlider: boolean;
                public _sliderSize: number;
                public _hideOnSinglePage: boolean;
                constructor(el: HTMLElement, dataSource: MOD.collection.BaseCollection<MOD.collection.CollectionItem>, options: IPagerOptions);
                public _createElement(tag: string): JQuery;
                public _render(): void;
                public _setDSPageIndex(page: number): void;
                public _onPageSizeChanged(ds: MOD.collection.BaseCollection<MOD.collection.CollectionItem>): void;
                public _onPageIndexChanged(ds: MOD.collection.BaseCollection<MOD.collection.CollectionItem>): void;
                public _onTotalCountChanged(ds: MOD.collection.BaseCollection<MOD.collection.CollectionItem>): void;
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
                public el : HTMLElement;
                public dataSource : MOD.collection.BaseCollection<MOD.collection.CollectionItem>;
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
            interface IPagerViewOptions extends IPagerOptions, MOD.baseElView.IViewOptions {
            }
            class PagerElView extends MOD.baseElView.BaseElView {
                public _options: IPagerOptions;
                public _dataSource: MOD.collection.BaseCollection<MOD.collection.CollectionItem>;
                public _pager: Pager;
                constructor(app: RIAPP.Application, el: HTMLElement, options: IPagerViewOptions);
                public destroy(): void;
                public toString(): string;
                public dataSource : MOD.collection.BaseCollection<MOD.collection.CollectionItem>;
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
            class StackPanel extends RIAPP.BaseObject implements RIAPP.ISelectable {
                public _el: HTMLElement;
                public _$el: JQuery;
                public _objId: string;
                public _dataSource: MOD.collection.BaseCollection<MOD.collection.CollectionItem>;
                public _isDSFilling: boolean;
                public _orientation: string;
                public _templateID: string;
                public _currentItem: MOD.collection.CollectionItem;
                public _itemMap: {
                    [key: string]: {
                        div: HTMLElement;
                        template: MOD.template.Template;
                        item: MOD.collection.CollectionItem;
                    };
                };
                public _app: RIAPP.Application;
                constructor(app: RIAPP.Application, el: HTMLElement, dataSource: MOD.collection.BaseCollection<MOD.collection.CollectionItem>, options: IStackPanelOptions);
                public _getEventNames(): string[];
                public addOnItemClicked(fn: (sender: StackPanel, args: {
                    item: MOD.collection.CollectionItem;
                }) => void, namespace?: string): void;
                public removeOnItemClicked(namespace?: string): void;
                public _onKeyDown(key: number, event: Event): void;
                public _onKeyUp(key: number, event: Event): void;
                public _updateCurrent(item: MOD.collection.CollectionItem, withScroll: boolean): void;
                public _onDSCurrentChanged(args: any): void;
                public _onDSCollectionChanged(args: any): void;
                public _onDSFill(args: any): void;
                public _onItemStatusChanged(item: MOD.collection.CollectionItem, oldChangeType: number): void;
                public _createTemplate(dcxt: any): MOD.template.Template;
                public _appendItems(newItems: MOD.collection.CollectionItem[]): void;
                public _appendItem(item: MOD.collection.CollectionItem): void;
                public _bindDS(): void;
                public _unbindDS(): void;
                public _createElement(tag: string): JQuery;
                public _onItemClicked(div: HTMLElement, item: MOD.collection.CollectionItem): void;
                public destroy(): void;
                public _clearContent(): void;
                public _removeItemByKey(key: string): void;
                public _removeItem(item: MOD.collection.CollectionItem): void;
                public _refresh(): void;
                public scrollIntoView(item: MOD.collection.CollectionItem): void;
                public getDivElementByItem(item: MOD.collection.CollectionItem): HTMLElement;
                public toString(): string;
                public app : RIAPP.Application;
                public el : HTMLElement;
                public containerEl : HTMLElement;
                public uniqueID : string;
                public dataSource : MOD.collection.BaseCollection<MOD.collection.CollectionItem>;
                public currentItem : MOD.collection.CollectionItem;
            }
            interface IStackPanelViewOptions extends IStackPanelOptions, MOD.baseElView.IViewOptions {
            }
            class StackPanelElView extends MOD.baseElView.BaseElView {
                public _dataSource: MOD.collection.BaseCollection<MOD.collection.CollectionItem>;
                public _panel: StackPanel;
                public _options: IStackPanelOptions;
                constructor(app: RIAPP.Application, el: HTMLSelectElement, options: IStackPanelViewOptions);
                public destroy(): void;
                public toString(): string;
                public dataSource : MOD.collection.BaseCollection<MOD.collection.CollectionItem>;
                public panel : StackPanel;
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
    class Application extends RIAPP.BaseObject implements RIAPP.IExports {
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
        private _cleanUpObjMaps();
        private _initModules();
        private _initUserModules(user_modules);
        public getExports(): {
            [name: string]: any;
        };
        public _onError(error: any, source: any): boolean;
        public _getElView(el: HTMLElement): RIAPP.MOD.baseElView.BaseElView;
        public _setElView(el: HTMLElement, view?: RIAPP.MOD.baseElView.BaseElView): void;
        public _bindTemplateElements(templateEl: HTMLElement): RIAPP.MOD.utils.LifeTimeScope;
        public _bindElements(scope: {
            querySelectorAll: (selectors: string) => NodeList;
        }, dctx: any, isDataFormBind: boolean): RIAPP.MOD.utils.LifeTimeScope;
        public _getContent(contentType: RIAPP.MOD.baseContent.IContentType, options: RIAPP.MOD.baseContent.IContentOptions, parentEl: HTMLElement, dctx: any, isEditing: boolean): RIAPP.MOD.baseContent.IContent;
        public _getContentType(options: RIAPP.MOD.baseContent.IContentOptions): RIAPP.MOD.baseContent.IContentType;
        public _destroyBindings(): void;
        public _setUpBindings(): void;
        public registerElView(name: string, type: RIAPP.MOD.baseElView.IViewType): void;
        public _getElementViewInfo(el: HTMLElement): {
            name: string;
            options: any;
        };
        public _createElementView(el: HTMLElement, view_info: {
            name: string;
            options: any;
        }): RIAPP.MOD.baseElView.BaseElView;
        public getElementView(el: HTMLElement): RIAPP.MOD.baseElView.BaseElView;
        public bind(opts: RIAPP.MOD.binding.IBindingOptions): RIAPP.MOD.binding.Binding;
        public registerContentFactory(fn: (nextFactory?: RIAPP.MOD.baseContent.IContentFactory) => RIAPP.MOD.baseContent.IContentFactory): void;
        public registerConverter(name: string, obj: RIAPP.MOD.converter.IConverter): void;
        public getConverter(name: string): RIAPP.MOD.converter.IConverter;
        public registerType(name: string, obj: any): any;
        public getType(name: string): any;
        public _getElViewType(name: string): RIAPP.MOD.baseElView.IViewType;
        public registerObject(name: string, obj: any): void;
        public getObject(name: string): any;
        public onStartUp(): void;
        public startUp(fn_sandbox?: (app: Application) => void): void;
        public loadTemplates(url: any): void;
        public loadTemplatesAsync(fn_loader: () => RIAPP.IPromise<string>): void;
        public registerTemplateLoader(name: string, fn_loader: () => RIAPP.IPromise<string>): void;
        public getTemplateLoader(name: any): () => RIAPP.IPromise<any>;
        public registerTemplateGroup(name: string, group: {
            fn_loader?: () => RIAPP.IPromise<string>;
            url?: string;
            names: string[];
        }): void;
        public destroy(): void;
        public toString(): string;
        public uniqueID : string;
        public options : IAppOptions;
        public contentFactory : RIAPP.MOD.baseContent.IContentFactory;
        public appName : string;
        public appRoot : {
            querySelectorAll: (selectors: string) => NodeList;
        };
        public modules : {
            [name: string]: any;
        };
        public global : RIAPP.Global;
        public UC : any;
        public VM : any;
        public app : Application;
    }
}

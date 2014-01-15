/// <reference path="..\thirdparty\jquery.d.ts" />
/// <reference path="..\thirdparty\moment.d.ts" />
/// <reference path="app_en.ts"/>
/// <reference path="baseobj.ts"/>
/// <reference path="globalobj.ts"/>
/// <reference path="..\modules\consts.ts"/>
/// <reference path="..\modules\utils.ts"/>
/// <reference path="..\modules\errors.ts"/>
/// <reference path="..\modules\converter.ts"/>
/// <reference path="..\modules\defaults.ts"/>
/// <reference path="..\modules\parser.ts"/>
/// <reference path="..\modules\datepicker.ts"/>
/// <reference path="..\modules\mvvm.ts"/>
/// <reference path="..\modules\baseElView.ts"/>
/// <reference path="..\modules\binding.ts"/>
/// <reference path="..\modules\collection.ts"/>
/// <reference path="..\modules\template.ts"/>
/// <reference path="..\modules\baseContent.ts"/>
/// <reference path="..\modules\dataform.ts"/>
//*** the rest are optional modules, which can be removed if not needed ***
/// <reference path="..\modules\db.ts"/>
/// <reference path="..\modules\listbox.ts"/>
/// <reference path="..\modules\datadialog.ts"/>
/// <reference path="..\modules\datagrid.ts"/>
/// <reference path="..\modules\pager.ts"/>
/// <reference path="..\modules\stackpanel.ts"/>

module RIAPP {
    export interface IAppOptions {
        application_name?: string;
        user_modules?: { name: string; initFn: (app: Application) => any; }[];
        application_root?: { querySelectorAll: (selectors: string) => NodeList; };
    }

    export class Application extends RIAPP.BaseObject implements IExports {
        private static _newInstanceNum = 1;
        private get _DATA_BIND_SELECTOR() { return ['*[', global.consts.DATA_ATTR.DATA_BIND, ']'].join(''); }
        private get _DATA_VIEW_SELECTOR() { return ['*[', global.consts.DATA_ATTR.DATA_VIEW, ']'].join(''); }
        private _contentFactories: { (nextFactory?: MOD.baseContent.IContentFactory): MOD.baseContent.IContentFactory; }[];
        private _objLifeTime: MOD.utils.LifeTimeScope;
        private _ELV_STORE_KEY: string;
        private _contentFactory: MOD.baseContent.IContentFactory;
        private _elViewStore: any;
        private _nextElViewStoreKey: number;
        private _userCode: any;
        private _viewModels: any;
        private _app_name: string;
        private _modules: { [name: string]: any; };
        private _objId: string;
        private _objMaps: any[];
        private _exports: { [name: string]: any; }; 
        _options: IAppOptions;
        
        constructor(options?: IAppOptions) {
            super();
            var self = this, app_name = 'default', user_modules = [];
            this._options = null;
            if (!!options) {
                this._options = options;
                if (!!options.application_name)
                    app_name = options.application_name;
                if (!!options.user_modules)
                    user_modules = options.user_modules;
            }
            if (!!global.findApp(app_name))
                throw new Error(global.utils.format(RIAPP.ERRS.ERR_APP_NAME_NOT_UNIQUE, app_name));
            this._app_name = app_name;
            this._objId = 'app:' + global.utils.getNewID();
            //lifetime object to store references foo the bindings and element views created by this application
            this._objLifeTime = null;
            this._ELV_STORE_KEY = global.consts.DATA_ATTR.EL_VIEW_KEY + Application._newInstanceNum;
            Application._newInstanceNum += 1;
            this._contentFactory = null;
            this._contentFactories = [];
            this._objMaps = [];
            //registered exported types
            this._exports = {};
            //loaded  moodules
            this._modules = {};
            //each Element view created by application stored in this hash map
            //it keeps them alive until they are destroyed
            this._elViewStore = {};
            //used to create sequential keys to store new element views
            this._nextElViewStoreKey = 0;
            this._userCode = {};
            this._viewModels = {};
            this._initModules();
            this._initUserModules(user_modules);
            var nextFactory: MOD.baseContent.IContentFactory = null;
            self._contentFactories.forEach((fn_Factory) => {
                nextFactory = fn_Factory(nextFactory);
            });
            this._contentFactory = nextFactory;
            global._registerApp(this);
        }
        private _cleanUpObjMaps() {
            var self = this;
            this._objMaps.forEach((objMap) => {
                global.utils.forEachProp(objMap, (name) => {
                    var obj = objMap[name];
                    if (obj instanceof BaseObject) {
                        if (!(<BaseObject>obj)._isDestroyed) {
                            (<BaseObject>obj).removeNSHandlers(self.uniqueID);
                        }
                    }
                });
            });
            this._objMaps = [];
        }
        private _initModules() {
            var self = this;
            self.global.moduleNames.forEach((mod_name) => {
                //checks for initModule function and executes it if the module has it
                if (!!MOD[mod_name] && !!MOD[mod_name].initModule) {
                    MOD[mod_name].initModule(self);
                }
            });
        }
        private _initUserModules(user_modules: { name: string; initFn: (app: Application) => any; }[]) {
            var self = this;
            user_modules.forEach((mod) => {
                self._modules[mod.name] = mod.initFn(self);
            });
        }
        getExports() {
            return this._exports;
        }
        _onError(error, source):boolean {
            if (global._checkIsDummy(error)) {
                return true;
            }
            var isHandled = super._onError(error, source);
            if (!isHandled) {
                return global._onError(error, source);
            }
            return isHandled;
        }
        //get element view associated with HTML element(if any)
        _getElView(el: HTMLElement): MOD.baseElView.BaseElView {
            var storeID = el.getAttribute(this._ELV_STORE_KEY);
            if (!!storeID) {
                return this._elViewStore[storeID];
            }
            return null;
        }
        //store association of HTML element with its element View
        _setElView(el: HTMLElement, view?: MOD.baseElView.BaseElView) {
            var storeID = el.getAttribute(this._ELV_STORE_KEY);
            if (!storeID) {
                if (!view)
                    return;
                storeID = 's_' + this._nextElViewStoreKey;
                this._nextElViewStoreKey += 1;
                el.setAttribute(this._ELV_STORE_KEY, storeID);
                this._elViewStore[storeID] = view;
            }
            else {
                if (!view) {
                    el.removeAttribute(this._ELV_STORE_KEY);
                    delete this._elViewStore[storeID];
                }
                else {
                    this._elViewStore[storeID] = view;
                }
            }
        }
        _bindTemplateElements(templateEl: HTMLElement) {
            var self = this, global = self.global, selector = self._DATA_BIND_SELECTOR + ', ' + self._DATA_VIEW_SELECTOR,
                selectedElem = ArrayHelper.fromList(templateEl.querySelectorAll(selector)), lftm = new MOD.utils.LifeTimeScope(),
                checks = global.utils.check;
            if (templateEl.hasAttribute(global.consts.DATA_ATTR.DATA_BIND) || templateEl.hasAttribute(global.consts.DATA_ATTR.DATA_VIEW)) {
                selectedElem.push(templateEl);
            }

            selectedElem.forEach(function (el) {
                var op: MOD.binding.IBindingOptions, j: number, len: number, binding: MOD.binding.Binding, bind_attr: string, temp_opts: any[],
                    elView: MOD.baseElView.BaseElView;
                if (checks.isInsideDataForm(el))
                    return;
                //first create element view
                elView = self.getElementView(el);
                lftm.addObj(elView);
                if (el.hasAttribute(global.consts.DATA_ATTR.DATA_VIEW)) {
                    el.removeAttribute(global.consts.DATA_ATTR.DATA_VIEW);
                    if (elView instanceof MOD.dataform.DataFormElView)
                        el.setAttribute(global.consts.DATA_ATTR.DATA_FORM, 'yes');
                }
                
           
                //then create databinding if element has data-bind attribute
                bind_attr = el.getAttribute(global.consts.DATA_ATTR.DATA_BIND);
                if (!!bind_attr) {
                    el.removeAttribute(global.consts.DATA_ATTR.DATA_BIND);
                    temp_opts = global.parser.parseOptions(bind_attr);
                    for (j = 0, len = temp_opts.length; j < len; j += 1) {
                        op = MOD.baseContent.getBindingOptions(self, temp_opts[j], elView, null);
                        binding = self.bind(op);
                        op.target = null;
                        lftm.addObj(binding);
                    }
                }
            });

            return lftm;
        }
        _bindElements(scope: { querySelectorAll: (selectors: string) => NodeList; }, dctx, isDataFormBind: boolean) {
            var self = this, global = self.global, checks = global.utils.check, isDataForm = false;
            scope = scope || global.document;
            //select all elements with binding attributes inside templates
            var selectedElem: HTMLElement[] = ArrayHelper.fromList(scope.querySelectorAll(self._DATA_BIND_SELECTOR +', '+self._DATA_VIEW_SELECTOR));
            var lftm = new MOD.utils.LifeTimeScope();

            selectedElem.forEach(function (el) {
                var bind_attr:string, temp_opts:any[], bind_op: MOD.binding.IBindingOptions, elView: MOD.baseElView.BaseElView;
                
                if (isDataFormBind) {
                    //check, that the current element not inside a nested dataform
                    if (!(global.utils.getParentDataForm(<any>scope, el) === scope))
                        return;
                }
                else {
                    //skip elements inside dataform, they are databound when dataform is databound
                    if (checks.isInsideDataForm(el))
                        return;
                }

                //first create element view
                elView = self.getElementView(el);
                lftm.addObj(elView);
                isDataForm = (elView instanceof MOD.dataform.DataFormElView);

                if (isDataForm && !el.hasAttribute(global.consts.DATA_ATTR.DATA_FORM))
                    el.setAttribute(global.consts.DATA_ATTR.DATA_FORM, 'yes');

                bind_attr = el.getAttribute(global.consts.DATA_ATTR.DATA_BIND);
                //if it has data-bind attribute then proceed to create binding
                if (!!bind_attr) {
                    temp_opts = global.parser.parseOptions(bind_attr);
                    for (var i = 0, len = temp_opts.length; i < len; i += 1) {
                        bind_op = MOD.baseContent.getBindingOptions(self, temp_opts[i], elView, dctx);
                        lftm.addObj(self.bind(bind_op));
                    }
                }
            });
            return lftm;
        }
        //used as a factory to create Data Contents
        _getContent(contentType: MOD.baseContent.IContentType, options: MOD.baseContent.IContentOptions, parentEl: HTMLElement, dctx, isEditing: boolean) {
            var content: MOD.baseContent.IContent;
            return new contentType(this, parentEl, options, dctx, isEditing);
        }
        //used to select contentType based on content options
        _getContentType(options: MOD.baseContent.IContentOptions) {
            return this.contentFactory.getContentType(options);
        }
        _destroyBindings() {
            if (!!this._objLifeTime) {
                this._objLifeTime.destroy();
                this._objLifeTime = null;
            }
        }
        _setUpBindings() {
            var defScope = this.appRoot, defaultDataCtxt = this;
            this._destroyBindings();
            this._objLifeTime = this._bindElements(defScope, defaultDataCtxt, false);
        }
        registerElView(name: string, type: MOD.baseElView.IViewType) {
            var name2 = 'elvws.' + name;
            if (!global._getObject(this, name2)) {
                global._registerObject(this, name2, type);
            }
            else
                throw new Error(global.utils.format(RIAPP.ERRS.ERR_OBJ_ALREADY_REGISTERED, name));
        }
        _getElementViewInfo(el: HTMLElement) {
            var view_name: string = null, vw_options: any = null, attr: string, data_view_op_arr: any[], data_view_op;
            if (el.hasAttribute(global.consts.DATA_ATTR.DATA_VIEW)) {
                attr = el.getAttribute(global.consts.DATA_ATTR.DATA_VIEW);
                data_view_op_arr = global.parser.parseOptions(attr);
                if (!!data_view_op_arr && data_view_op_arr.length > 0) {
                    data_view_op = data_view_op_arr[0];
                    if (!!data_view_op.name && data_view_op.name != 'default') {
                        view_name = data_view_op.name;
                    }
                    vw_options = data_view_op.options;
                }
            }
            return {name:view_name, options: vw_options};
        }
        _createElementView(el: HTMLElement, view_info: { name: string; options: any; }) {
            var viewType: MOD.baseElView.IViewType, elView: MOD.baseElView.BaseElView;

            if (!!view_info.name) {
                viewType = this._getElViewType(view_info.name);
                if (!viewType)
                    throw new Error(global.utils.format(RIAPP.ERRS.ERR_ELVIEW_NOT_REGISTERED, view_info.name));
            }
            if (!viewType) {
                var nodeNm = el.nodeName.toLowerCase(), type;
                switch (nodeNm) {
                    case 'input':
                        {
                            type = el.getAttribute('type');
                            nodeNm = nodeNm + ':' + type;
                            viewType = this._getElViewType(nodeNm);
                        }
                        break;
                    default:
                        viewType = this._getElViewType(nodeNm);
                }

                if (!viewType)
                    throw new Error(global.utils.format(RIAPP.ERRS.ERR_ELVIEW_NOT_CREATED, nodeNm));
            }

            elView = new viewType(this, el, view_info.options || {});
            return elView;
        }
        //checks if the element already has created and attached ElView, if no then it creates and attaches ElView for the element
        getElementView(el: HTMLElement) {
            var elView = this._getElView(el);
            //check if element view is already created for this element
            if (!!elView)
                return elView;
            var info = this._getElementViewInfo(el); 
            return this._createElementView(el, info);
        }
        bind(opts: MOD.binding.IBindingOptions) {
            return new MOD.binding.Binding(opts, this.appName);
        }
        registerContentFactory(fn: (nextFactory?: MOD.baseContent.IContentFactory) => MOD.baseContent.IContentFactory) {
            this._contentFactories.push(fn);
        }
        registerConverter(name: string, obj: MOD.converter.IConverter) {
            var name2 = 'converters.' + name;
            if (!global._getObject(this, name2)) {
                global._registerObject(this, name2, obj);
            }
            else
                throw new Error(global.utils.format(RIAPP.ERRS.ERR_OBJ_ALREADY_REGISTERED, name));
        }
        getConverter(name: string): MOD.converter.IConverter {
            var name2 = 'converters.' + name;
            var res = global._getObject(this, name2);
            if (!res) {
                res = global._getObject(global, name2);
            }
            if (!res)
                throw new Error(global.utils.format(RIAPP.ERRS.ERR_CONVERTER_NOTREGISTERED, name));
            return res;
        }
        registerType(name: string, obj) {
            var name2 = 'types.' + name;
            return global._registerObject(this, name2, obj);
        }
        getType(name: string) {
            var name2 = 'types.' + name;
            var res = global._getObject(this, name2);
            if (!res) {
                res = global._getObject(global, name2);
            }
            return res;
        }
        _getElViewType(name: string): MOD.baseElView.IViewType {
            var name2 = 'elvws.' + name;
            var res = global._getObject(this, name2);
            if (!res) {
                res = global._getObject(global, name2);
            }
            return res;
        }
        //registers instances of objects, so they can be retrieved later anywhere in the application's code
        //very similar to a dependency injection container - you can later obtain it with getObject function
        registerObject(name: string, obj) {
            var self = this, name2 = 'objects.' + name;
            if (obj instanceof BaseObject) {
                (<BaseObject>obj).addOnDestroyed((s, a) => {
                    global._removeObject(self, name2);
                }, self.uniqueID);
            }
            var objMap = global._registerObject(this, name2, obj);
            if (this._objMaps.indexOf(objMap) < 0) {
                this._objMaps.push(objMap);
            }
        }
        getObject(name: string) {
            var name2 = 'objects.' + name;
            var res = global._getObject(this, name2);
            return res;
        }
        onStartUp() {
        }
        //set up application - use fn_sandbox callback to setUp handlers on objects, create viewModels and etc.
        startUp(fn_sandbox?:(app:Application)=>void) {
            var self = this, fn_init = function () {
                try {
                    self.onStartUp();
                    if (!!fn_sandbox)
                        fn_sandbox.apply(self, [self]);
                    self._setUpBindings();
                }
                catch (ex)
                {
                    self._onError(ex, self);
                    global._throwDummy(ex);
                }
            };

            try {
                if (!!fn_sandbox && !global.utils.check.isFunction(fn_sandbox))
                    throw new Error(RIAPP.ERRS.ERR_APP_SETUP_INVALID);
                global._waitForNotLoading(fn_init, null);
            }
            catch (ex) {
                global.reThrow(ex, self._onError(ex, self));
            }
        }
        //loads a group of templates from the server
        loadTemplates(url) {
            this.loadTemplatesAsync(function () {
                return global.utils.performAjaxGet(url);
            });
        }
        //loads a group of templates from the server
        loadTemplatesAsync(fn_loader: () => IPromise<string>) {
            global._loadTemplatesAsync(fn_loader, this);
        }
        /*
            fn_loader must load template and return promise which resolves with loaded HTML string
        */
        registerTemplateLoader(name:string, fn_loader: () => IPromise<string>) {
            global._registerTemplateLoader(this.appName + '.' + name, {
                fn_loader: fn_loader
            });
        }
        getTemplateLoader(name) {
            var res = global._getTemplateLoader(this.appName + '.' + name);
            if (!res) {
                res = global._getTemplateLoader(name);
            }
            return res;
        }
        registerTemplateGroup(name: string, group: {
            fn_loader?: () => IPromise<string>;
            url?: string;
            names: string[];
        }) {
            var group2: {
                fn_loader?: () => IPromise<string>;
                url?: string;
                names: string[];
                app: Application;
            } = global.utils.extend(false, {
                fn_loader: null,
                url: null,
                names: null,
                app: this
            }, group);
            global._registerTemplateGroup(this.appName + '.' + name, group2);
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            var self = this;
            try {
                self._contentFactories = [];
                global._unregisterApp(self);
                self._destroyBindings();
                self._cleanUpObjMaps();
                self._exports = {};
                self._modules = {};
                self._elViewStore = {};
                self._userCode = {};
                self._viewModels = {};
                self._contentFactory = null;
                self._options = null;
            } finally {
                super.destroy();
            }
        }
        toString() {
            return 'Application: ' + this.appName;
        }
        get uniqueID() { return this._objId; }
        get options() { return this._options; }
        get contentFactory() { return this._contentFactory; }
        get appName() { return this._app_name; }
        get appRoot(): { querySelectorAll: (selectors: string) => NodeList; } {
            if (!this._options || !this._options.application_root) return this.global.document;
            return this._options.application_root;
        }
        //loaded app modules which are mapped by their name
        get modules() { return this._modules; }
        get global() { return RIAPP.global; }
        //Namespace for attaching custom user code (functions and objects)
        get UC() { return this._userCode; }
        //Namespace for attaching application view models
        get VM() { return this._viewModels; }
        get app() { return this; }
    }

    //ALL CORE MODULES are LOADED, INITIALIZE THE Global
    RIAPP.global._initialize();
}

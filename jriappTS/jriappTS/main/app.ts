/// <reference path="..\thirdparty\jquery.d.ts" />
/// <reference path="..\thirdparty\moment.d.ts" />
/// <reference path="..\jriapp_strings.d.ts"/>
/// <reference path="baseutils.ts"/>
/// <reference path="baseobj.ts"/>
/// <reference path="globalobj.ts"/>
/// <reference path="..\modules\consts.ts"/>
/// <reference path="..\modules\utils.ts"/>
/// <reference path="..\modules\errors.ts"/>
/// <reference path="..\modules\converter.ts"/>
/// <reference path="..\modules\defaults.ts"/>
/// <reference path="..\modules\parser.ts"/>
/// <reference path="..\modules\mvvm.ts"/>
/// <reference path="..\modules\baseElView.ts"/>
/// <reference path="..\modules\binding.ts"/>
/// <reference path="..\modules\collection.ts"/>
/// <reference path="..\modules\template.ts"/>
/// <reference path="..\modules\baseContent.ts"/>
/// <reference path="..\modules\dataform.ts"/>
//*** the rest are optional modules, which can be removed if not needed ***
/// <reference path="..\modules\dynacontent.ts"/>
/// <reference path="..\modules\datepicker.ts"/>
/// <reference path="..\modules\tabs.ts"/>
/// <reference path="..\modules\listbox.ts"/>
/// <reference path="..\modules\datadialog.ts"/>
/// <reference path="..\modules\datagrid.ts"/>
/// <reference path="..\modules\pager.ts"/>
/// <reference path="..\modules\stackpanel.ts"/>
/// <reference path="..\modules\db.ts"/>

module RIAPP {
    import constsMOD = MOD.consts;
    import utilsMOD = RIAPP.MOD.utils;
    import bindMOD = RIAPP.MOD.binding;
    import elviewMOD = MOD.baseElView;
    import contentMOD = RIAPP.MOD.baseContent;
    import formMOD = RIAPP.MOD.dataform;
    import convertMOD = RIAPP.MOD.converter;
    import templMOD = RIAPP.MOD.template;

    //ALL CORE MODULES are LOADED, INITIALIZE THE Global
    global._initialize();
    //local variable for optimization
    var utils = global.utils, parser = global.parser;

    export interface IAppOptions {
        application_name?: string;
        user_modules?: { name: string; initFn: (app: Application) => any; }[];
        application_root?: { querySelectorAll: (selectors: string) => NodeList; };
    }

    export class Application extends RIAPP.BaseObject implements IExports {
        private static _newInstanceNum = 1;
        private get _DATA_BIND_SELECTOR() { return ['*[', constsMOD.DATA_ATTR.DATA_BIND, ']'].join(''); }
        private get _DATA_VIEW_SELECTOR() { return ['*[', constsMOD.DATA_ATTR.DATA_VIEW, ']'].join(''); }
        private _contentFactories: { (nextFactory?: contentMOD.IContentFactory): contentMOD.IContentFactory; }[];
        private _objLifeTime: utilsMOD.LifeTimeScope;
        private _ELV_STORE_KEY: string;
        private _contentFactory: contentMOD.IContentFactory;
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
                throw new Error(utils.format(RIAPP.ERRS.ERR_APP_NAME_NOT_UNIQUE, app_name));
            this._app_name = app_name;
            this._objId = 'app:' + utils.getNewID();
            //lifetime object to store references to the bindings and element views created by this application
            this._objLifeTime = null;
            this._ELV_STORE_KEY = constsMOD.DATA_ATTR.EL_VIEW_KEY + Application._newInstanceNum;
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
            var nextFactory: contentMOD.IContentFactory = null;
            self._contentFactories.forEach((fn_Factory) => {
                nextFactory = fn_Factory(nextFactory);
            });
            this._contentFactory = nextFactory;
            global._registerApp(this);
        }
        _getEventNames() {
            var base_events = super._getEventNames();
            return ['startup'].concat(base_events);
        }
        private _cleanUpObjMaps() {
            var self = this;
            this._objMaps.forEach((objMap) => {
                utils.forEachProp(objMap, (name) => {
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
            //initialize core modules
            var self = this, modules = RIAPP.MOD;
            self.global.moduleNames.forEach((mod_name) => {
                //checks for initModule function and executes it if the module has it
                if (!!modules[mod_name] && !!modules[mod_name].initModule) {
                    modules[mod_name].initModule(self);
                }
            });
        }
        private _initUserModules(user_modules: { name: string; initFn: (app: Application) => any; }[]) {
            var self = this;
            user_modules.forEach((mod) => {
                self._modules[mod.name] = mod.initFn(self);
            });
        }
        private _destroyBindings() {
            if (!!this._objLifeTime) {
                this._objLifeTime.destroy();
                this._objLifeTime = null;
            }
        }
        private _setUpBindings() {
            var defScope = this.appRoot, defaultDataCtxt = this;
            this._destroyBindings();
            this._objLifeTime = this._bindElements(defScope, defaultDataCtxt, false, false);
        }
        private _getElementViewInfo(el: HTMLElement) {
            var view_name: string = null, vw_options: any = null, attr: string, data_view_op_arr: any[], data_view_op;
            if (el.hasAttribute(constsMOD.DATA_ATTR.DATA_VIEW)) {
                attr = el.getAttribute(constsMOD.DATA_ATTR.DATA_VIEW);
                data_view_op_arr = parser.parseOptions(attr);
                if (!!data_view_op_arr && data_view_op_arr.length > 0) {
                    data_view_op = data_view_op_arr[0];
                    if (!!data_view_op.name && data_view_op.name != 'default') {
                        view_name = data_view_op.name;
                    }
                    vw_options = data_view_op.options;
                }
            }
            return { name: view_name, options: vw_options };
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
        _getElView(el: HTMLElement): elviewMOD.BaseElView {
            var storeID = el.getAttribute(this._ELV_STORE_KEY);
            if (!!storeID) {
                return this._elViewStore[storeID];
            }
            return null;
        }
        _createElementView(el: HTMLElement, view_info: { name: string; options: any; }) {
            var viewType: elviewMOD.IViewType, elView: elviewMOD.BaseElView;

            if (!!view_info.name) {
                viewType = this._getElViewType(view_info.name);
                if (!viewType)
                    throw new Error(utils.format(RIAPP.ERRS.ERR_ELVIEW_NOT_REGISTERED, view_info.name));
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
                    throw new Error(utils.format(RIAPP.ERRS.ERR_ELVIEW_NOT_CREATED, nodeNm));
            }

            elView = new viewType(this, el, view_info.options || {});
            return elView;
        }
        //store association of HTML element with its element View
        _setElView(el: HTMLElement, view?: elviewMOD.BaseElView) {
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
            var self = this, global = self.global,
                selector = self._DATA_BIND_SELECTOR + ', ' + self._DATA_VIEW_SELECTOR,
                selectedElem = ArrayHelper.fromList(templateEl.querySelectorAll(selector)),
                lftm = new utilsMOD.LifeTimeScope(),
                checks = utils.check,
                DATA_FORM = constsMOD.DATA_ATTR.DATA_FORM,
                DATA_BIND = constsMOD.DATA_ATTR.DATA_BIND,
                DATA_VIEW = constsMOD.DATA_ATTR.DATA_VIEW;


            if (templateEl.hasAttribute(DATA_BIND) || templateEl.hasAttribute(DATA_VIEW)) {
                selectedElem.push(templateEl);
            }

            //mark all dataforms for easier checking that the element is a dataform
            selectedElem.forEach(function (el) {
                if (checks.isDataForm(el))
                    el.setAttribute(DATA_FORM, 'yes');
            });

            //select all dataforms inside the scope
            var formSelector = ['*[', DATA_FORM, ']'].join(''),
                forms = ArrayHelper.fromList(templateEl.querySelectorAll(formSelector));

            if (checks.isDataForm(templateEl)) {
                //in this case process only this element
                selectedElem = [templateEl];
            }

            selectedElem.forEach(function (el) {
                var op: bindMOD.IBindingOptions,
                    binding: bindMOD.Binding,
                    bind_attr: string,
                    temp_opts: any[],
                    elView: elviewMOD.BaseElView,
                    j: number, len: number;
                //if element inside a dataform return
                if (checks.isInNestedForm(templateEl, forms, el)) {
                    return;
                }

                try {
                    //first create element view
                    elView = self.getElementView(el);
                }
                catch (ex) {
                    self._onError(ex, self);
                    global._throwDummy(ex);
                }
                lftm.addObj(elView);
                if (elView instanceof formMOD.DataFormElView) {
                    (<formMOD.DataFormElView>elView).form.isInsideTemplate = true;
                }

                if (el.hasAttribute(DATA_VIEW)) {
                    el.removeAttribute(DATA_VIEW);
                }


                //then create databinding if element has data-bind attribute
                bind_attr = el.getAttribute(DATA_BIND);
                if (!!bind_attr) {
                    el.removeAttribute(DATA_BIND);
                    temp_opts = parser.parseOptions(bind_attr);
                    for (j = 0, len = temp_opts.length; j < len; j += 1) {
                        op = contentMOD.getBindingOptions(self, temp_opts[j], elView, null);
                        binding = self.bind(op);
                        op.target = null;
                        lftm.addObj(binding);
                    }
                }
            });

            return lftm;
        }
        _bindElements(scope: { querySelectorAll: (selectors: string) => NodeList; }, dctx, isDataFormBind: boolean, isInsideTemplate: boolean) {
            var self = this, global = self.global,
                checks = utils.check,
                DATA_FORM = constsMOD.DATA_ATTR.DATA_FORM,
                DATA_BIND = constsMOD.DATA_ATTR.DATA_BIND,
                DATA_VIEW = constsMOD.DATA_ATTR.DATA_VIEW,
                selector = self._DATA_BIND_SELECTOR + ', ' + self._DATA_VIEW_SELECTOR;

            scope = scope || global.document;
            //select all elements with binding attributes
            var selectedElem: HTMLElement[] = ArrayHelper.fromList(scope.querySelectorAll(selector));
            var lftm = new utilsMOD.LifeTimeScope();

            if (!isDataFormBind) {
                //mark all dataforms for easier checking that the element is a dataform
                selectedElem.forEach(function (el) {
                    if (checks.isDataForm(el))
                        el.setAttribute(DATA_FORM, 'yes');
                });
            }

            //select all dataforms inside the scope
            var formSelector = ['*[', DATA_FORM, ']'].join(''),
                forms = ArrayHelper.fromList(scope.querySelectorAll(formSelector));

            selectedElem.forEach(function (el) {
                var bind_attr: string,
                    temp_opts: any[],
                    bind_op: bindMOD.IBindingOptions,
                    elView: elviewMOD.BaseElView,
                    i:number, len:number;

                //return if the current element is inside a dataform
                if (checks.isInNestedForm(scope, forms, el)) {
                    return;
                }

                try {
                    //first create element view
                    elView = self.getElementView(el);
                }
                catch (ex) {
                    self._onError(ex, self);
                    global._throwDummy(ex);
                }
                lftm.addObj(elView);
                if (elView instanceof formMOD.DataFormElView) {
                    (<formMOD.DataFormElView>elView).form.isInsideTemplate = isInsideTemplate;
                }

                if (isInsideTemplate) {
                    if (el.hasAttribute(DATA_VIEW)) {
                        el.removeAttribute(DATA_VIEW);
                    }
                }

                bind_attr = el.getAttribute(DATA_BIND);
                //if it has data-bind attribute then proceed to create binding
                if (!!bind_attr) {
                    if (isInsideTemplate) {
                        el.removeAttribute(DATA_BIND);
                    }
                    temp_opts = parser.parseOptions(bind_attr);
                    for (i = 0, len = temp_opts.length; i < len; i += 1) {
                        bind_op = contentMOD.getBindingOptions(self, temp_opts[i], elView, dctx);
                        lftm.addObj(self.bind(bind_op));
                    }
                }
            });
            return lftm;
        }
        //used as a factory to create Data Contents
        _getContent(contentType: contentMOD.IContentType, options: contentMOD.IContentOptions, parentEl: HTMLElement, dctx, isEditing: boolean) {
            return new contentType(this, parentEl, options, dctx, isEditing);
        }
        //used to select contentType based on content options
        _getContentType(options: contentMOD.IContentOptions): contentMOD.IContentType {
            return this.contentFactory.getContentType(options);
        }
        _getElViewType(name: string): elviewMOD.IViewType {
            var name2 = 'elvws.' + name, global = this.global;
            var res = global._getObject(this, name2);
            if (!res) {
                res = global._getObject(global, name2);
            }
            return res;
        }
        addOnStartUp(fn: (sender: Global, args: IUnResolvedBindingArgs) => void, namespace?: string) {
            this.addHandler('startup', fn, namespace);
        }
        removeOnStartUp(namespace?: string) {
            this.removeHandler('startup', namespace);
        }
        getExports() {
            return this._exports;
        }
        registerElView(name: string, type: elviewMOD.IViewType) {
            var name2 = 'elvws.' + name, global = this.global;
            if (!global._getObject(this, name2)) {
                global._registerObject(this, name2, type);
            }
            else
                throw new Error(utils.format(RIAPP.ERRS.ERR_OBJ_ALREADY_REGISTERED, name));
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
        bind(opts: bindMOD.IBindingOptions) {
            return new bindMOD.Binding(opts, this.appName);
        }
        registerContentFactory(fn: (nextFactory?: contentMOD.IContentFactory) => contentMOD.IContentFactory) {
            this._contentFactories.push(fn);
        }
        registerConverter(name: string, obj: convertMOD.IConverter) {
            var name2 = 'converters.' + name;
            if (!global._getObject(this, name2)) {
                global._registerObject(this, name2, obj);
            }
            else
                throw new Error(utils.format(RIAPP.ERRS.ERR_OBJ_ALREADY_REGISTERED, name));
        }
        getConverter(name: string): convertMOD.IConverter {
            var name2 = 'converters.' + name;
            var res = global._getObject(this, name2);
            if (!res) {
                res = global._getObject(global, name2);
            }
            if (!res)
                throw new Error(utils.format(RIAPP.ERRS.ERR_CONVERTER_NOTREGISTERED, name));
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
        //registers instances of objects, so they can be retrieved later anywhere in the application's code
        //very similar to a dependency injection container - you can later obtain the registerd object with the getObject function
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
        //can override this method in derived classes
        onStartUp() {
        }
        //set up application - use fn_sandbox callback to setUp handlers on objects, create viewModels and etc.
        startUp(fn_sandbox?:(app:Application)=>void) {
            var self = this, fn_init = function () {
                try {
                    self.onStartUp();
                    self.raiseEvent('startup', {});
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
                if (!!fn_sandbox && !utils.check.isFunction(fn_sandbox))
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
                return utils.performAjaxGet(url);
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
        getTemplateLoader(name): () => IPromise<string> {
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
            var group2: IGroupInfo = utils.extend(false, {
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

}

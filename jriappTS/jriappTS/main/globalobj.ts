module RIAPP {
    export var global: Global = null;
    export var css_riaTemplate = 'ria-template';

    export enum BindTo {
        Source= 0, Target= 1
    }

    export interface IConverter {
        convertToSource(val, param, dataContext): any;
        convertToTarget(val, param, dataContext): any;
    }

    export interface ISelectable {
        containerEl: HTMLElement;
        uniqueID: string;
        _onKeyDown(key: number, event: Event);
        _onKeyUp(key: number, event: Event);
    }

    export interface IExports {
        getExports();
    }

    export interface IGroupInfo {
        fn_loader?: () => IPromise<string>;
        url?: string;
        names: string[];
        app?: Application;
        promise?: IPromise<string>;
    }

    export interface ITemplateLoaderInfo {
        fn_loader: () => IPromise<string>;
        groupName?: string;
    }

    export interface IUnResolvedBindingArgs {
        bindTo: BindTo;
        root: any;
        path: string;
        propName: string;
    }

    export class Global extends BaseObject implements IExports {
        public static vesion = '2.5.2';
        public static _TEMPLATES_SELECTOR = ['section.', css_riaTemplate].join('');
        public static _TEMPLATE_SELECTOR = '*[data-role="template"]';
        private _window: Window;
        private _appInst: { [name: string]: Application; };
        private _$: JQueryStatic;
        private _currentSelectable: ISelectable;
        private _defaults: MOD.defaults.Defaults;
        private _userCode: any;
        private _utils: MOD.utils.Utils;
        private _templateLoaders: any;
        private _templateGroups: any;
        private _promises: IPromise<string>[];
        private _isReady: boolean;
        private _isInitialized: boolean;
        private _waitQueue: MOD.utils.WaitQueue;
        private _parser: MOD.parser.Parser;
        //all loaded modules
        private _moduleNames: string[];
        private _exports: { [name: string]: any; };
        
        constructor(window: Window, jQuery: JQueryStatic) {
            super();
            if (!!RIAPP.global)
                throw new Error(RIAPP.ERRS.ERR_GLOBAL_SINGLTON);
            if (!jQuery)
                throw new Error(RIAPP.ERRS.ERR_APP_NEED_JQUERY);
            this._window = window;
            this._appInst = {};
            this._$ = jQuery;
            this._currentSelectable = null;
            this._userCode = {};
            //exported types
            this._exports = {}; 
            this._templateLoaders = {};
            this._templateGroups = {};
            this._promises = [];
            this._moduleNames = [];
            this._parser = null;
            this._isReady = false;
            this._isInitialized = false;
            this._onCreate();
        }
        private _onCreate() {
            var self = this;
            self.$(self.document).ready(function ($) {
                self._waitQueue = new MOD.utils.WaitQueue(self);
                self._isReady = true;
                self._processTemplateSections(self.document);
                self.raiseEvent('load', {});
                setTimeout(function () { self.removeHandler('load', null); }, 0);
            });

            //when clicked outside any Selectable set _currentSelectable = null
            self.$(self.document).on("click.global", function (e) {
                e.stopPropagation();
                self.currentSelectable = null;
            });
            self.$(self.document).on("keydown.global", function (e) {
                e.stopPropagation();
                if (!!self._currentSelectable) {
                    self._currentSelectable._onKeyDown(e.which, e);
                }
            });
            self.$(self.document).on("keyup.global", function (e) {
                e.stopPropagation();
                if (!!self._currentSelectable) {
                    self._currentSelectable._onKeyUp(e.which, e);
                }
            });
            self.$(self.window).unload(function () {
                self.raiseEvent('unload', {});
            });
            
            //this way to attach for correct work in firefox
            self.window.onerror = function (msg, url:string, linenumber:number) {
                if (!!msg && msg.toString().indexOf("DUMMY_ERROR") > -1) {
                    return true;
                }
                alert('Error: ' + msg + '\nURL: ' + url + '\nLine Number: ' + linenumber);
                return false;
            }
        }
        private _processTemplateSection(templateSection: { querySelectorAll: (selectors: string) => NodeList; }, app: Application) {
            var self = this;
            var templates: HTMLElement[] = ArrayHelper.fromList(templateSection.querySelectorAll(Global._TEMPLATE_SELECTOR));
            templates.forEach(function (el) {
                var tmpDiv = self.document.createElement('div'), html: string,
                    name = el.getAttribute('id'), deferred = self.utils.createDeferred();
                el.removeAttribute('id');
                tmpDiv.appendChild(el);
                html = tmpDiv.innerHTML;
                deferred.resolve(html);
                var fn_loader = function () {
                    return deferred.promise();
                };
                if (!!app) {
                    name = app.appName + '.' + name;
                }
                self._registerTemplateLoader(name, {
                    fn_loader: fn_loader
                });
            });
        }
        private _registerTemplateLoaderCore(name: string, loader: ITemplateLoaderInfo) {
            return RIAPP.baseUtils.setValue(this._templateLoaders, name, loader, false);
        }
        private _getTemplateLoaderCore(name: string): ITemplateLoaderInfo {
            return RIAPP.baseUtils.getValue(this._templateLoaders, name);
        }
        protected _getEventNames() {
            var base_events = super._getEventNames();
            return ['load', 'unload','initialize', 'unresolvedBind'].concat(base_events);
        }
        _initialize() {
            if (this._isInitialized)
                return;
            var self = this, isOK: boolean, name: string;
            name = 'utils'; isOK = this.isModuleLoaded(name);
            if (isOK)
                self._utils = new MOD.utils.Utils();
            name = 'parser'; isOK = this.isModuleLoaded(name);
            if (isOK)
                self._parser = new MOD.parser.Parser();
            name = 'defaults'; isOK = this.isModuleLoaded(name);
            if (isOK) {
                self._defaults = new MOD.defaults.Defaults();
            }
            name = 'datepicker'; isOK = this.isModuleLoaded(name);
            if (isOK && !!self._defaults) {
                self._defaults.datepicker = self.getType('IDatepicker');
            }
            if (!isOK)
                throw new Error(baseUtils.format(RIAPP.ERRS.ERR_MODULE_NOT_REGISTERED, name));

            this._isInitialized = true;
            self.raiseEvent('initialize', {});
            setTimeout(function () { self.removeHandler('initialize', null); }, 0);
        }
        protected _addHandler(name: string, fn: (sender, args) => void , namespace?: string, prepend?: boolean) {
            var self = this;
            if ((name == 'load' && self._isReady) || (name == 'initialize' && self._isInitialized)) {
                 //when already is ready, immediately raise the event
                setTimeout(function () { fn.apply(self, [self, {}]); }, 0);
                return;
            }
            super._addHandler(name, fn, namespace, prepend);
        }
        _trackSelectable(selectable: ISelectable) {
            var self = this, utils = self.utils, el = selectable.containerEl;
            self.$(el).on("click." + selectable.uniqueID, function (e) {
                e.stopPropagation();
                var target = e.target;
                if (utils.isContained(target, el))
                    self.currentSelectable = selectable;
            });
        }
        _untrackSelectable(selectable: ISelectable) {
            var self = this, utils = self.utils, el = selectable.containerEl;
            self.$(el).off("click." + selectable.uniqueID);
            if (this.currentSelectable === selectable)
                this.currentSelectable = null;
        }
        _registerApp(app: Application) {
            if (!this._appInst[app.appName])
                this._appInst[app.appName] = app;
        }
        _unregisterApp(app: Application) {
            if (!this._appInst[app.appName])
                return;
            delete this._appInst[app.appName];
            delete this._templateLoaders[app.appName];
            delete this._templateGroups[app.appName];
        }
        _destroyApps() {
            var self = this;
            this.utils.forEachProp(this._appInst, function (id) {
                self._appInst[id].destroy();
            });
        }
        _throwDummy(origErr) {
            var errMod = MOD.errors;
            if (!!errMod && !!origErr && !origErr.isDummy) {
                throw errMod.DummyError.create(origErr);
            }
            throw origErr;
        }
        _checkIsDummy(error) {
            return !!error.isDummy;
        }
        _registerObject(root: IExports, name: string, obj: any) {
            return RIAPP.baseUtils.setValue(root.getExports(), name, obj, true);
        }
        _getObject(root: IExports, name: string) {
            return RIAPP.baseUtils.getValue(root.getExports(), name);
        }
        _removeObject(root: IExports, name: string) {
            return RIAPP.baseUtils.removeValue(root.getExports(), name);
        }
        _processTemplateSections(root: { querySelectorAll: (selectors: string) => NodeList; }) {
            var self = this;
            var sections: HTMLElement[] = ArrayHelper.fromList(root.querySelectorAll(Global._TEMPLATES_SELECTOR));
            sections.forEach(function (el) {
                self._processTemplateSection(el, null);
                self.utils.removeNode(el);
            });
        }
        _loadTemplatesAsync(fn_loader: () => IPromise<string>, app: Application) {
            var self = this, promise = fn_loader(), old = self.isLoading;
            self._promises.push(promise);
            if (self.isLoading !== old)
                self.raisePropertyChanged('isLoading');
            var deferred = self.utils.createDeferred();
            promise.then(function (html:string) {
                self.utils.removeFromArray(self._promises, promise);
                try {
                    var tmpDiv = self.document.createElement('div');
                    tmpDiv.innerHTML = html;
                    self._processTemplateSection(tmpDiv, app);
                    deferred.resolve();
                }
                catch (ex) {
                    self.handleError(ex, self);
                    deferred.reject();
                }
                if (!self.isLoading)
                    self.raisePropertyChanged('isLoading');
            },function (err) {
                self.utils.removeFromArray(self._promises, promise);
                if (!self.isLoading)
                    self.raisePropertyChanged('isLoading');
                deferred.reject();
                if (!!err && !!err.message) {
                    self.handleError(err, self);
                }
                else if (!!err && !!err.responseText) {
                    self.handleError(new Error(err.responseText), self);
                }
                else
                    self.handleError(new Error('Failed to load templates'), self);
            });
            return deferred.promise();
        }
        /*
         fn_loader must load template and return promise which resolves with loaded HTML string
         */
        _registerTemplateLoader(name, loader: ITemplateLoaderInfo) {
            var self = this;
            loader = self.utils.extend(false, {
                fn_loader: null,
                groupName: null
            }, loader);

            if (!loader.groupName && !self.utils.check.isFunction(loader.fn_loader)) {
                throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_ASSERTION_FAILED, 'fn_loader is Function'));
            }
            var prevLoader = self._getTemplateLoaderCore(name);
            if (!!prevLoader) {
                //can overwrite previous loader with new one, only if the old did not have loader function and the new has it
                if ((!prevLoader.fn_loader && !!prevLoader.groupName) && (!loader.groupName && !!loader.fn_loader)) {
                    return self._registerTemplateLoaderCore(name, loader);
                }
                throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_TEMPLATE_ALREADY_REGISTERED, name));
            }
            return self._registerTemplateLoaderCore(name, loader);
        }
        _getTemplateLoader(name: string): () => IPromise<string> {
            var self = this, loader = self._getTemplateLoaderCore(name);
            if (!loader)
                return null;
            if (!loader.fn_loader && !!loader.groupName) {
                var group = self._getTemplateGroup(loader.groupName);
                if (!group) {
                    throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_TEMPLATE_GROUP_NOTREGISTERED, loader.groupName));
                }
                //this function will return promise resolved with the template's html
                return function () {
                    if (!group.promise) { //prevents double loading
                        //start the loading only if no loading in progress
                        group.promise = self._loadTemplatesAsync(group.fn_loader, group.app);
                    }

                    var deferred = self.utils.createDeferred();
                    group.promise.done(function () {
                        try {
                            group.promise = null;
                            group.names.forEach(function (name) {
                                if (!!group.app) {
                                    name = group.app.appName + '.' + name;
                                }
                                var loader = self._getTemplateLoaderCore(name);
                                if (!loader || !loader.fn_loader) {
                                    throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_TEMPLATE_NOTREGISTERED, name));
                                }
                            });

                            var loader = self._getTemplateLoaderCore(name);
                            if (!loader || !loader.fn_loader) {
                                throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_TEMPLATE_NOTREGISTERED, name));
                            }
                            delete self._templateGroups[loader.groupName];

                            loader.fn_loader().done(function (html) {
                                deferred.resolve(html);
                            }).fail(function (er) {
                                deferred.reject(er);
                            });
                        }
                        catch (ex) {
                            deferred.reject(ex);
                        }
                    });

                    group.promise.fail(function (er) {
                        group.promise = null;
                        deferred.reject(er);
                    });

                    return deferred.promise();
                };
            }
            else
                return loader.fn_loader;
        }
        _registerTemplateGroup(groupName: string, group: IGroupInfo) {
            var self = this, group2: IGroupInfo = self.utils.extend(false, {
                fn_loader: null,
                url: null,
                names: null,
                app: null,
                promise: null
            }, group);

            if (!!group2.url && !group2.fn_loader) {
                //make a function to load from this url
                group2.fn_loader = function () {
                    return self.utils.performAjaxGet(group2.url);
                };
            }

            RIAPP.baseUtils.setValue(self._templateGroups, groupName, group2, true);
            group2.names.forEach(function (name) {
                if (!!group2.app) {
                    name = group2.app.appName + '.' + name;
                }
                //for each template in the group register dummy loader function which has only group name
                //when template will be requested, this dummy loader will be replaced with the real one
                self._registerTemplateLoader(name, {
                    groupName: groupName,
                    fn_loader: null //no loader function
                });
            });
        }
        _getTemplateGroup(name: string): IGroupInfo {
            return RIAPP.baseUtils.getValue(this._templateGroups, name);
        }
        _waitForNotLoading(callback, callbackArgs) {
            this._waitQueue.enQueue({
                prop: 'isLoading',
                groupName: null,
                predicate: function (val) {
                    return !val;
                },
                action: callback,
                actionArgs: callbackArgs
            });
        }
        _getConverter(name: string): IConverter {
            var name2 = 'converters.' + name;
            var res = this._getObject(this, name2);
            if (!res)
                throw new Error(this.utils.format(RIAPP.ERRS.ERR_CONVERTER_NOTREGISTERED, name));
            return res;
        }
        _onUnResolvedBinding(bindTo: BindTo, root: any, path: string, propName: string) {
            var args: IUnResolvedBindingArgs = { bindTo: bindTo, root: root, path: path, propName: propName };
            this.raiseEvent('unresolvedBind', args);
        }
        addOnLoad(fn: (sender: Global, args: any) => void, namespace?: string) {
            this._addHandler('load', fn, namespace, false);
        }
        addOnUnLoad(fn: (sender: Global, args: any) => void, namespace?: string) {
            this._addHandler('unload', fn, namespace, false);
        }
        addOnInitialize(fn: (sender: Global, args: any) => void, namespace?: string) {
            this._addHandler('initialize', fn, namespace, false);
        }
        addOnUnResolvedBinding(fn: (sender: Global, args: IUnResolvedBindingArgs) => void, namespace?: string) {
            this.addHandler('unresolvedBind', fn, namespace);
        }
        removeOnUnResolvedBinding(namespace?: string) {
            this.removeHandler('unresolvedBind', namespace);
        }
        getExports() {
            return this._exports;
        }
        reThrow(ex, isHandled) {
            if (!!isHandled)
                this._throwDummy(ex);
            else
                throw ex;
        }
        //each module on its loading invokes this  function
        onModuleLoaded(name: string, module_obj: any) {
            var self = this;
            if (this.isModuleLoaded(name))
                throw new Error(baseUtils.format(RIAPP.ERRS.ERR_MODULE_ALREDY_REGISTERED, name));

            this._moduleNames.push(name);
        }
        isModuleLoaded(name: string): boolean {
            return this._moduleNames.indexOf(name) > -1;
        }
        findApp(name:string) {
            return this._appInst[name];
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            var self = this;
            if (!!self._waitQueue) {
                self._waitQueue.destroy()
                self._waitQueue = null;
            }
            self._promises = [];
            self.removeHandler();
            self._destroyApps();
            self._exports = {};
            self._templateLoaders = {};
            self._templateGroups = {};
            self._parser = null;
            self.$(self.document).off(".global");
            RIAPP.global = null;
            self.window.onerror = null;
            super.destroy();
        }
        registerType(name:string, obj:any) {
            var name2 = 'types.' + name;
            return this._registerObject(this, name2, obj);
        }
        getType(name:string) {
            var name2 = 'types.' + name;
            return this._getObject(this, name2);
        }
        registerConverter(name:string, obj: IConverter) {
            var name2 = 'converters.' + name;
            if (!this._getObject(this, name2)) {
                this._registerObject(this, name2, obj);
            }
            else
                throw new Error(global.utils.format(RIAPP.ERRS.ERR_OBJ_ALREADY_REGISTERED, name));
        }
        registerElView(name:string, elViewType:any) {
            var name2 = 'elvws.' + name;
            if (!this._getObject(this, name2)) {
                this._registerObject(this, name2, elViewType);
            }
            else
                throw new Error(global.utils.format(RIAPP.ERRS.ERR_OBJ_ALREADY_REGISTERED, name));
        }
        getImagePath(imageName:string) {
            var images = this.defaults.imagesPath;
            return images + imageName;
        }
        loadTemplates(url:string) {
            var self = this;
            this._loadTemplatesAsync(function () {
                return self.utils.performAjaxGet(url);
            }, null);
        }
        toString() {
            return 'Global';
        }
        get moduleNames() { return ArrayHelper.clone(this._moduleNames); }
        get parser() { return this._parser; }
        get isLoading() {
            return this._promises.length > 0;
        }
        get $() {
            return this._$;
        }
        get window() {
            return this._window;
        }
        get document() {
            return this._window.document;
        }
        get currentSelectable() {
            return this._currentSelectable;
        }
        set currentSelectable(v: ISelectable) {
            if (this._currentSelectable !== v) {
                this._currentSelectable = v;
                this.raisePropertyChanged('currentSelectable');
            }
        }
        get defaults() {
            return this._defaults;
        }
        get utils() {
            return this._utils;
        }
        get UC() {
            return this._userCode;
        }
    }

    RIAPP.global = new Global(window, jQuery);
}

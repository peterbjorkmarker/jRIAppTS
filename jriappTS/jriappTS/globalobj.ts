module RIAPP {
    export var global: Global = null;
    export var css_riaTemplate = 'ria-template';
    export interface ISelectable {
        containerEl: HTMLElement;
        uniqueID: string;
        _onKeyDown(key: number, event: Event);
        _onKeyUp(key: number, event: Event);
    }

    export class Global extends BaseObject {
        public static vesion = '2.0.0.1';
        public static _TEMPLATES_SELECTOR = ['section.', css_riaTemplate].join('');
        public static _TEMPLATE_SELECTOR = '*[data-role="template"]';
        private _window: Window;
        private _appInst: { [name: string]: Application; };
        private _$: JQueryStatic;
        private _currentSelectable: ISelectable;
        private _defaults: MOD.defaults.Defaults;
        private _userCode: any;
        private _exports: { [name: string]: any; };
        private _utils: MOD.utils.Utils;
        private _templateLoaders: any;
        private _templateGroups: any;
        private _promises: JQueryPromise[];
        private _isReady: bool;
        private _waitQueue: MOD.utils.WaitQueue;
        private _parser: MOD.parser.Parser;
        //all loaded modules
        private _moduleNames: string[];

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
            this._exports = {}; //exported types
            this._templateLoaders = {};
            this._templateGroups = {};
            this._promises = [];
            this._moduleNames = [];
            this._parser = null;
            this._isReady = false;
            this._init();
        }
        static create(window: Window, jQuery: JQueryStatic) {
            return new Global(window, jQuery);
        }
        private _init() {
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
            self.window.onerror = function (msg, url, linenumber) {
                if (!!msg && msg.indexOf("DUMMY_ERROR") > -1) {
                    return true;
                }
                alert('Error message: ' + msg + '\nURL: ' + url + '\nLine Number: ' + linenumber);
                return false;
            }
        }
        private _registerObjectCore(root: any, name: string, obj: any, checkOverwrite: bool) {
            var parts = name.split('.'),
                parent = root,
                i:number;
            for (i = 0; i < parts.length - 1; i += 1) {
                // create a property if it doesn't exist
                if (!parent[parts[i]]) {
                    parent[parts[i]] = {};
                }
                parent = parent[parts[i]];
            }
            //the last part is the object's name itself
            var n = parts[parts.length - 1];
            if (!!checkOverwrite && !!parent[n]) {
                throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_OBJ_ALREADY_REGISTERED, name));
            }
            parent[n] = obj;
            return parent;
        }
        private _getObjectCore(root: any, name: string) {
            var parts = name.split('.'),
                parent = root,
                i:number, res;
            for (i = 0; i < parts.length; i += 1) {
                res = parent[parts[i]];
                if (!res) {
                    return null;
                }
                parent = res;
            }
            return res;
        }
        private _removeObjectCore(root: any, name: string) {
            var parts = name.split('.'),
               parent = root,
                i: number, obj = null;
            for (i = 0; i < parts.length - 1; i += 1) {
                if (!parent[parts[i]]) {
                    return null;
                }
                parent = parent[parts[i]];
            }
            //the last part is the object's name itself
            var n = parts[parts.length - 1];
            obj = parent[n];
            if (!!obj) {
                delete parent[n];
            }
            //returns deleted object
            return obj;
        }
        _getEventNames() {
            var base_events = super._getEventNames();
            return ['load', 'unload'].concat(base_events);
        }
        addOnLoad(fn: (sender: Global, args: any) => void , namespace?: string) {
            this._addHandler('load', fn, namespace, false);
        }
        addOnUnLoad(fn: (sender: Global, args: any) => void , namespace?: string) {
            this._addHandler('unload', fn, namespace, false);
        }
        _addHandler(name: string, fn: (sender, args) => void , namespace?: string, prepend?: bool) {
            var self = this;
            if (name == 'load' && self._isReady) {
                setTimeout(function () { fn.apply(self, [self, {}]); }, 0); //when already is ready, immediately raise the event
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
        _registerObject(root: { _exports: any; }, name: string, obj: any) {
            return this._registerObjectCore(root._exports, name, obj, true);
        }
        _getObject(root: { _exports: any; }, name: string) {
            return this._getObjectCore(root['_exports'], name);
        }
        _removeObject(root: { _exports: any; }, name: string) {
            return this._removeObjectCore(root['_exports'], name);
        }
        _processTemplateSections(root: { querySelectorAll: (selectors: string) => NodeList; }) {
            var self = this;
            var sections: HTMLElement[] = ArrayHelper.fromList(root.querySelectorAll(Global._TEMPLATES_SELECTOR));
            sections.forEach(function (el) {
                self._processTemplateSection(el, null);
                self.utils.removeNode(el);
            });
        }
        private _processTemplateSection(templateSection: { querySelectorAll: (selectors: string) => NodeList; }, app: Application) {
            var self = this;
            var templates:HTMLElement[] = ArrayHelper.fromList(templateSection.querySelectorAll(Global._TEMPLATE_SELECTOR));
            templates.forEach(function (el) {
                var tmpDiv = self.document.createElement('div'), html, name = el.getAttribute('id'), deferred = self.utils.createDeferred();
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
        private _registerTemplateLoaderCore(name: string, loader: { fn_loader: () => JQueryPromise; groupName?: string; }) {
            return this._registerObjectCore(this._templateLoaders, name, loader, false);
        }
        private _getTemplateLoaderCore(name: string): { fn_loader: () => JQueryPromise; groupName?: string; } {
            return this._getObjectCore(this._templateLoaders, name);
        }
        _loadTemplatesAsync(fn_loader: () => JQueryPromise, app: Application) {
            var self = this, promise = fn_loader(), old = self.isLoading;
            self._promises.push(promise);
            if (self.isLoading !== old)
                self.raisePropertyChanged('isLoading');
            var deferred = self.utils.createDeferred();
            promise.done(function (html) {
                self.utils.removeFromArray(self._promises, promise);
                try {
                    var tmpDiv = self.document.createElement('div');
                    tmpDiv.innerHTML = html;
                    self._processTemplateSection(tmpDiv, app);
                    deferred.resolve();
                }
                catch (ex) {
                    self._onError(ex, self);
                    deferred.reject();
                }
                if (!self.isLoading)
                    self.raisePropertyChanged('isLoading');
            });
            promise.fail(function (err) {
                self.utils.removeFromArray(self._promises, promise);
                if (!self.isLoading)
                    self.raisePropertyChanged('isLoading');
                deferred.reject();
                if (!!err && !!err.message) {
                    self._onError(err, self);
                }
                else if (!!err && !!err.responseText) {
                    self._onError(new Error(err.responseText), self);
                }
                else
                    self._onError(new Error('Failed to load templates'), self);
            });
            return deferred.promise();
        }
        /*
         fn_loader must load template and return promise which resolves with loaded HTML string
         */
        _registerTemplateLoader(name, loader: { fn_loader: () => JQueryPromise; groupName?: string; }) {
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
        _getTemplateLoader(name: string) {
            var self = this, loader: { fn_loader: () => JQueryPromise; groupName?: string; } = self._getTemplateLoaderCore(name);
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
        _registerTemplateGroup(groupName: string, group: {
            fn_loader?: () => JQueryPromise;
            url?: string;
            names: string[];
            app?: Application;
        }) {
            var self = this, group: {
                fn_loader?: () => JQueryPromise;
                url?: string;
                names: string[];
                app?: Application;
                promise?: JQueryPromise;
            } = self.utils.extend(false, {
                fn_loader: null,
                url: null,
                names: null,
                app: null,
                promise: null
            }, group);

            if (!!group.url && !group.fn_loader) {
                //make function to load from this url
                group.fn_loader = function () {
                    return self.utils.performAjaxGet(group.url);
                };
            }

            this._registerObjectCore(self._templateGroups, groupName, group, true);
            group.names.forEach(function (name) {
                if (!!group.app) {
                    name = group.app.appName + '.' + name;
                }
                //for each template in the group register dummy loader function which has only group name
                //when template will be requested, this dummy loader will be replaced with the real one
                self._registerTemplateLoader(name, {
                    groupName: groupName,
                    fn_loader: null //no loader function
                });
            });
        }
        _getTemplateGroup(name: string): {
                fn_loader?: () => JQueryPromise;
                url?: string;
                names: string[];
                app?: Application;
                promise?: JQueryPromise;
        } {
            return this._getObjectCore(this._templateGroups, name);
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
        reThrow(ex, isHandled) {
            if (!!isHandled)
                this._throwDummy(ex);
            else
                throw ex;
        }
        onModuleLoaded(name: string, module_obj: any) {
            var self = this;
            if (this.isModuleLoaded(name))
                throw new Error(baseUtils.format('Module: {0} is already loaded!', name));

            this._moduleNames.push(name);
            switch (name) {
                case 'utils':
                    self._utils = new MOD.utils.Utils();
                    break;
                case 'defaults':
                    self._defaults = new MOD.defaults.Defaults();
                    self._defaults.dateFormat = 'dd.mm.yy';
                    self._defaults.imagesPath = '/Scripts/jriapp/img/';
                    break;
                case 'parser':
                    self._parser = new MOD.parser.Parser();
                    break;
            }
        }
        isModuleLoaded(name: string): bool {
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
        registerConverter(name, obj: MOD.converter.IConverter) {
            var name2 = 'converters.' + name;
            if (!this._getObject(this, name2)) {
                this._registerObject(this, name2, obj);
            }
            else
                throw new Error(global.utils.format(RIAPP.ERRS.ERR_OBJ_ALREADY_REGISTERED, name));
        }
        _getConverter(name: string): MOD.converter.IConverter {
            var name2 = 'converters.' + name;
            var res = this._getObject(this, name2);
            if (!res)
                throw new Error(this.utils.format(RIAPP.ERRS.ERR_CONVERTER_NOTREGISTERED, name));
            return res;
        }
        registerElView(name:string, elViewType:any) {
            var name2 = 'elvws.' + name;
            if (!this._getObject(this, name2)) {
                this._registerObject(this, name2, elViewType);
            }
            else
                throw new Error(global.utils.format(RIAPP.ERRS.ERR_OBJ_ALREADY_REGISTERED, name));
        }
        getImagePath(imageName) {
            var images = this.defaults.imagesPath;
            return images + imageName;
        }
        loadTemplates(url) {
            var self = this;
            this._loadTemplatesAsync(function () {
                return self.utils.performAjaxGet(url);
            }, null);
        }
        toString() {
            return 'Global';
        }
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
        get consts() {
            return MOD.consts;
        }
        get utils() {
            return this._utils;
        }
        get UC() {
            return this._userCode;
        }
        get moduleNames() { return ArrayHelper.clone(this._moduleNames); }
    };

    RIAPP.global = Global.create(window, jQuery);
}

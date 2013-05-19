var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RIAPP;
(function (RIAPP) {
    RIAPP.global = null;
    RIAPP.css_riaTemplate = 'ria-template';
    var Global = (function (_super) {
        __extends(Global, _super);
        function Global(window, jQuery) {
                _super.call(this);
            if(!!RIAPP.global) {
                throw new Error(RIAPP.ERRS.ERR_GLOBAL_SINGLTON);
            }
            if(!jQuery) {
                throw new Error(RIAPP.ERRS.ERR_APP_NEED_JQUERY);
            }
            this._window = window;
            this._appInst = {
            };
            this._$ = jQuery;
            this._currentSelectable = null;
            this._userCode = {
            };
            this._exports = {
            }//exported types
            ;
            this._templateLoaders = {
            };
            this._templateGroups = {
            };
            this._promises = [];
            this._moduleNames = [];
            this._parser = null;
            this._isReady = false;
            this._init();
        }
        Global.vesion = '2.0.0.1';
        Global._TEMPLATES_SELECTOR = [
            'section.', 
            RIAPP.css_riaTemplate
        ].join('');
        Global._TEMPLATE_SELECTOR = '*[data-role="template"]';
        Global.create = function create(window, jQuery) {
            return new Global(window, jQuery);
        };
        Global.prototype._init = function () {
            var self = this;
            self.$(self.document).ready(function ($) {
                self._waitQueue = new RIAPP.MOD.utils.WaitQueue(self);
                self._isReady = true;
                self._processTemplateSections(self.document);
                self.raiseEvent('load', {
                });
                setTimeout(function () {
                    self.removeHandler('load', null);
                }, 0);
            });
            //when clicked outside any Selectable set _currentSelectable = null
            self.$(self.document).on("click.global", function (e) {
                e.stopPropagation();
                self.currentSelectable = null;
            });
            self.$(self.document).on("keydown.global", function (e) {
                e.stopPropagation();
                if(!!self._currentSelectable) {
                    self._currentSelectable._onKeyDown(e.which, e);
                }
            });
            self.$(self.document).on("keyup.global", function (e) {
                e.stopPropagation();
                if(!!self._currentSelectable) {
                    self._currentSelectable._onKeyUp(e.which, e);
                }
            });
            self.$(self.window).unload(function () {
                self.raiseEvent('unload', {
                });
            });
            //this way to attach for correct work in firefox
            self.window.onerror = function (msg, url, linenumber) {
                if(!!msg && msg.indexOf("DUMMY_ERROR") > -1) {
                    return true;
                }
                alert('Error message: ' + msg + '\nURL: ' + url + '\nLine Number: ' + linenumber);
                return false;
            };
        };
        Global.prototype._registerObjectCore = function (root, name, obj, checkOverwrite) {
            var parts = name.split('.'), parent = root, i;
            for(i = 0; i < parts.length - 1; i += 1) {
                // create a property if it doesn't exist
                if(!parent[parts[i]]) {
                    parent[parts[i]] = {
                    };
                }
                parent = parent[parts[i]];
            }
            //the last part is the object's name itself
            var n = parts[parts.length - 1];
            if(!!checkOverwrite && !!parent[n]) {
                throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_OBJ_ALREADY_REGISTERED, name));
            }
            parent[n] = obj;
            return parent;
        };
        Global.prototype._getObjectCore = function (root, name) {
            var parts = name.split('.'), parent = root, i, res;
            for(i = 0; i < parts.length; i += 1) {
                res = parent[parts[i]];
                if(!res) {
                    return null;
                }
                parent = res;
            }
            return res;
        };
        Global.prototype._removeObjectCore = function (root, name) {
            var parts = name.split('.'), parent = root, i, obj = null;
            for(i = 0; i < parts.length - 1; i += 1) {
                if(!parent[parts[i]]) {
                    return null;
                }
                parent = parent[parts[i]];
            }
            //the last part is the object's name itself
            var n = parts[parts.length - 1];
            obj = parent[n];
            if(!!obj) {
                delete parent[n];
            }
            //returns deleted object
            return obj;
        };
        Global.prototype._getEventNames = function () {
            var base_events = _super.prototype._getEventNames.call(this);
            return [
                'load', 
                'unload'
            ].concat(base_events);
        };
        Global.prototype.addOnLoad = function (fn, namespace) {
            this._addHandler('load', fn, namespace, false);
        };
        Global.prototype.addOnUnLoad = function (fn, namespace) {
            this._addHandler('unload', fn, namespace, false);
        };
        Global.prototype._addHandler = function (name, fn, namespace, prepend) {
            var self = this;
            if(name == 'load' && self._isReady) {
                setTimeout(function () {
                    fn.apply(self, [
                        self, 
                        {
                        }
                    ]);
                }, 0)//when already is ready, immediately raise the event
                ;
                return;
            }
            _super.prototype._addHandler.call(this, name, fn, namespace, prepend);
        };
        Global.prototype._trackSelectable = function (selectable) {
            var self = this, utils = self.utils, el = selectable.containerEl;
            self.$(el).on("click." + selectable.uniqueID, function (e) {
                e.stopPropagation();
                var target = e.target;
                if(utils.isContained(target, el)) {
                    self.currentSelectable = selectable;
                }
            });
        };
        Global.prototype._untrackSelectable = function (selectable) {
            var self = this, utils = self.utils, el = selectable.containerEl;
            self.$(el).off("click." + selectable.uniqueID);
            if(this.currentSelectable === selectable) {
                this.currentSelectable = null;
            }
        };
        Global.prototype._registerApp = function (app) {
            if(!this._appInst[app.appName]) {
                this._appInst[app.appName] = app;
            }
        };
        Global.prototype._unregisterApp = function (app) {
            if(!this._appInst[app.appName]) {
                return;
            }
            delete this._appInst[app.appName];
            delete this._templateLoaders[app.appName];
            delete this._templateGroups[app.appName];
        };
        Global.prototype._destroyApps = function () {
            var self = this;
            this.utils.forEachProp(this._appInst, function (id) {
                self._appInst[id].destroy();
            });
        };
        Global.prototype._throwDummy = function (origErr) {
            var errMod = RIAPP.MOD.errors;
            if(!!errMod && !!origErr && !origErr.isDummy) {
                throw errMod.DummyError.create(origErr);
            }
            throw origErr;
        };
        Global.prototype._checkIsDummy = function (error) {
            return !!error.isDummy;
        };
        Global.prototype._registerObject = function (root, name, obj) {
            return this._registerObjectCore(root._exports, name, obj, true);
        };
        Global.prototype._getObject = function (root, name) {
            return this._getObjectCore(root['_exports'], name);
        };
        Global.prototype._removeObject = function (root, name) {
            return this._removeObjectCore(root['_exports'], name);
        };
        Global.prototype._processTemplateSections = function (root) {
            var self = this;
            var sections = RIAPP.ArrayHelper.fromList(root.querySelectorAll(Global._TEMPLATES_SELECTOR));
            sections.forEach(function (el) {
                self._processTemplateSection(el, null);
                self.utils.removeNode(el);
            });
        };
        Global.prototype._processTemplateSection = function (templateSection, app) {
            var self = this;
            var templates = RIAPP.ArrayHelper.fromList(templateSection.querySelectorAll(Global._TEMPLATE_SELECTOR));
            templates.forEach(function (el) {
                var tmpDiv = self.document.createElement('div'), html, name = el.getAttribute('id'), deferred = self.utils.createDeferred();
                el.removeAttribute('id');
                tmpDiv.appendChild(el);
                html = tmpDiv.innerHTML;
                deferred.resolve(html);
                var fn_loader = function () {
                    return deferred.promise();
                };
                if(!!app) {
                    name = app.appName + '.' + name;
                }
                self._registerTemplateLoader(name, {
                    fn_loader: fn_loader
                });
            });
        };
        Global.prototype._registerTemplateLoaderCore = function (name, loader) {
            return this._registerObjectCore(this._templateLoaders, name, loader, false);
        };
        Global.prototype._getTemplateLoaderCore = function (name) {
            return this._getObjectCore(this._templateLoaders, name);
        };
        Global.prototype._loadTemplatesAsync = function (fn_loader, app) {
            var self = this, promise = fn_loader(), old = self.isLoading;
            self._promises.push(promise);
            if(self.isLoading !== old) {
                self.raisePropertyChanged('isLoading');
            }
            var deferred = self.utils.createDeferred();
            promise.done(function (html) {
                self.utils.removeFromArray(self._promises, promise);
                try  {
                    var tmpDiv = self.document.createElement('div');
                    tmpDiv.innerHTML = html;
                    self._processTemplateSection(tmpDiv, app);
                    deferred.resolve();
                } catch (ex) {
                    self._onError(ex, self);
                    deferred.reject();
                }
                if(!self.isLoading) {
                    self.raisePropertyChanged('isLoading');
                }
            });
            promise.fail(function (err) {
                self.utils.removeFromArray(self._promises, promise);
                if(!self.isLoading) {
                    self.raisePropertyChanged('isLoading');
                }
                deferred.reject();
                if(!!err && !!err.message) {
                    self._onError(err, self);
                } else if(!!err && !!err.responseText) {
                    self._onError(new Error(err.responseText), self);
                } else {
                    self._onError(new Error('Failed to load templates'), self);
                }
            });
            return deferred.promise();
        };
        Global.prototype._registerTemplateLoader = /*
        fn_loader must load template and return promise which resolves with loaded HTML string
        */
        function (name, loader) {
            var self = this;
            loader = self.utils.extend(false, {
                fn_loader: null,
                groupName: null
            }, loader);
            if(!loader.groupName && !self.utils.check.isFunction(loader.fn_loader)) {
                throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_ASSERTION_FAILED, 'fn_loader is Function'));
            }
            var prevLoader = self._getTemplateLoaderCore(name);
            if(!!prevLoader) {
                //can overwrite previous loader with new one, only if the old did not have loader function and the new has it
                if((!prevLoader.fn_loader && !!prevLoader.groupName) && (!loader.groupName && !!loader.fn_loader)) {
                    return self._registerTemplateLoaderCore(name, loader);
                }
                throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_TEMPLATE_ALREADY_REGISTERED, name));
            }
            return self._registerTemplateLoaderCore(name, loader);
        };
        Global.prototype._getTemplateLoader = function (name) {
            var self = this, loader = self._getTemplateLoaderCore(name);
            if(!loader) {
                return null;
            }
            if(!loader.fn_loader && !!loader.groupName) {
                var group = self._getTemplateGroup(loader.groupName);
                if(!group) {
                    throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_TEMPLATE_GROUP_NOTREGISTERED, loader.groupName));
                }
                //this function will return promise resolved with the template's html
                return function () {
                    if(!group.promise) {
                        //prevents double loading
                        //start the loading only if no loading in progress
                        group.promise = self._loadTemplatesAsync(group.fn_loader, group.app);
                    }
                    var deferred = self.utils.createDeferred();
                    group.promise.done(function () {
                        try  {
                            group.promise = null;
                            group.names.forEach(function (name) {
                                if(!!group.app) {
                                    name = group.app.appName + '.' + name;
                                }
                                var loader = self._getTemplateLoaderCore(name);
                                if(!loader || !loader.fn_loader) {
                                    throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_TEMPLATE_NOTREGISTERED, name));
                                }
                            });
                            var loader = self._getTemplateLoaderCore(name);
                            if(!loader || !loader.fn_loader) {
                                throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_TEMPLATE_NOTREGISTERED, name));
                            }
                            delete self._templateGroups[loader.groupName];
                            loader.fn_loader().done(function (html) {
                                deferred.resolve(html);
                            }).fail(function (er) {
                                deferred.reject(er);
                            });
                        } catch (ex) {
                            deferred.reject(ex);
                        }
                    });
                    group.promise.fail(function (er) {
                        group.promise = null;
                        deferred.reject(er);
                    });
                    return deferred.promise();
                };
            } else {
                return loader.fn_loader;
            }
        };
        Global.prototype._registerTemplateGroup = function (groupName, group) {
            var self = this, group = self.utils.extend(false, {
                fn_loader: null,
                url: null,
                names: null,
                app: null,
                promise: null
            }, group);
            if(!!group.url && !group.fn_loader) {
                //make function to load from this url
                group.fn_loader = function () {
                    return self.utils.performAjaxGet(group.url);
                };
            }
            this._registerObjectCore(self._templateGroups, groupName, group, true);
            group.names.forEach(function (name) {
                if(!!group.app) {
                    name = group.app.appName + '.' + name;
                }
                //for each template in the group register dummy loader function which has only group name
                //when template will be requested, this dummy loader will be replaced with the real one
                self._registerTemplateLoader(name, {
                    groupName: groupName,
                    fn_loader: null
                });
                //no loader function
                            });
        };
        Global.prototype._getTemplateGroup = function (name) {
            return this._getObjectCore(this._templateGroups, name);
        };
        Global.prototype._waitForNotLoading = function (callback, callbackArgs) {
            this._waitQueue.enQueue({
                prop: 'isLoading',
                groupName: null,
                predicate: function (val) {
                    return !val;
                },
                action: callback,
                actionArgs: callbackArgs
            });
        };
        Global.prototype.reThrow = function (ex, isHandled) {
            if(!!isHandled) {
                this._throwDummy(ex);
            } else {
                throw ex;
            }
        };
        Global.prototype.onModuleLoaded = function (name, module_obj) {
            var self = this;
            if(this.isModuleLoaded(name)) {
                throw new Error(RIAPP.baseUtils.format('Module: {0} is already loaded!', name));
            }
            this._moduleNames.push(name);
            switch(name) {
                case 'utils':
                    self._utils = new RIAPP.MOD.utils.Utils();
                    break;
                case 'defaults':
                    self._defaults = new RIAPP.MOD.defaults.Defaults();
                    self._defaults.dateFormat = 'dd.mm.yy';
                    self._defaults.imagesPath = '/Scripts/jriapp/img/';
                    break;
                case 'parser':
                    self._parser = new RIAPP.MOD.parser.Parser();
                    break;
            }
        };
        Global.prototype.isModuleLoaded = function (name) {
            return this._moduleNames.indexOf(name) > -1;
        };
        Global.prototype.findApp = function (name) {
            return this._appInst[name];
        };
        Global.prototype.destroy = function () {
            if(this._isDestroyed) {
                return;
            }
            this._isDestroyCalled = true;
            var self = this;
            if(!!self._waitQueue) {
                self._waitQueue.destroy();
                self._waitQueue = null;
            }
            self._promises = [];
            self.removeHandler();
            self._destroyApps();
            self._exports = {
            };
            self._templateLoaders = {
            };
            self._templateGroups = {
            };
            self._parser = null;
            self.$(self.document).off(".global");
            RIAPP.global = null;
            self.window.onerror = null;
            _super.prototype.destroy.call(this);
        };
        Global.prototype.registerType = function (name, obj) {
            var name2 = 'types.' + name;
            return this._registerObject(this, name2, obj);
        };
        Global.prototype.getType = function (name) {
            var name2 = 'types.' + name;
            return this._getObject(this, name2);
        };
        Global.prototype.registerConverter = function (name, obj) {
            var name2 = 'converters.' + name;
            if(!this._getObject(this, name2)) {
                this._registerObject(this, name2, obj);
            } else {
                throw new Error(RIAPP.global.utils.format(RIAPP.ERRS.ERR_OBJ_ALREADY_REGISTERED, name));
            }
        };
        Global.prototype._getConverter = function (name) {
            var name2 = 'converters.' + name;
            var res = this._getObject(this, name2);
            if(!res) {
                throw new Error(this.utils.format(RIAPP.ERRS.ERR_CONVERTER_NOTREGISTERED, name));
            }
            return res;
        };
        Global.prototype.registerElView = function (name, elViewType) {
            var name2 = 'elvws.' + name;
            if(!this._getObject(this, name2)) {
                this._registerObject(this, name2, elViewType);
            } else {
                throw new Error(RIAPP.global.utils.format(RIAPP.ERRS.ERR_OBJ_ALREADY_REGISTERED, name));
            }
        };
        Global.prototype.getImagePath = function (imageName) {
            var images = this.defaults.imagesPath;
            return images + imageName;
        };
        Global.prototype.loadTemplates = function (url) {
            var self = this;
            this._loadTemplatesAsync(function () {
                return self.utils.performAjaxGet(url);
            }, null);
        };
        Global.prototype.toString = function () {
            return 'Global';
        };
        Object.defineProperty(Global.prototype, "parser", {
            get: function () {
                return this._parser;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Global.prototype, "isLoading", {
            get: function () {
                return this._promises.length > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Global.prototype, "$", {
            get: function () {
                return this._$;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Global.prototype, "window", {
            get: function () {
                return this._window;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Global.prototype, "document", {
            get: function () {
                return this._window.document;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Global.prototype, "currentSelectable", {
            get: function () {
                return this._currentSelectable;
            },
            set: function (v) {
                if(this._currentSelectable !== v) {
                    this._currentSelectable = v;
                    this.raisePropertyChanged('currentSelectable');
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Global.prototype, "defaults", {
            get: function () {
                return this._defaults;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Global.prototype, "consts", {
            get: function () {
                return RIAPP.MOD.consts;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Global.prototype, "utils", {
            get: function () {
                return this._utils;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Global.prototype, "UC", {
            get: function () {
                return this._userCode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Global.prototype, "moduleNames", {
            get: function () {
                return RIAPP.ArrayHelper.clone(this._moduleNames);
            },
            enumerable: true,
            configurable: true
        });
        return Global;
    })(RIAPP.BaseObject);
    RIAPP.Global = Global;    
    ;
    RIAPP.global = Global.create(window, jQuery);
})(RIAPP || (RIAPP = {}));
//@ sourceMappingURL=globalobj.js.map

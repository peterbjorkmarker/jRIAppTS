var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="jquery\jquery.d.ts" />
/// <reference path="jriapp_en.ts"/>
/// <reference path="baseobj.ts"/>
/// <reference path="globalobj.ts"/>
/// <reference path="modules\consts.ts"/>
/// <reference path="modules\utils.ts"/>
/// <reference path="modules\errors.ts"/>
/// <reference path="modules\converter.ts"/>
/// <reference path="modules\defaults.ts"/>
/// <reference path="modules\parser.ts"/>
/// <reference path="modules\mvvm.ts"/>
/// <reference path="modules\baseElView.ts"/>
/// <reference path="modules\binding.ts"/>
/// <reference path="modules\collection.ts"/>
/// <reference path="modules\template.ts"/>
/// <reference path="modules\baseContent.ts"/>
/// <reference path="modules\db.ts"/>
/// <reference path="modules\listbox.ts"/>
/// <reference path="modules\datadialog.ts"/>
/// <reference path="modules\datagrid.ts"/>
/// <reference path="modules\pager.ts"/>
/// <reference path="modules\stackpanel.ts"/>
/// <reference path="modules\dataform.ts"/>
var RIAPP;
(function (RIAPP) {
    var Application = (function (_super) {
        __extends(Application, _super);
        function Application(options) {
                _super.call(this);
            var self = this, app_name = 'default', user_modules = [];
            if(!!options) {
                if(!!options.application_name) {
                    app_name = options.application_name;
                }
                if(!!options.user_modules) {
                    user_modules = options.user_modules;
                }
            }
            if(!!RIAPP.global.findApp(app_name)) {
                throw new Error(RIAPP.global.utils.format(RIAPP.ERRS.ERR_APP_NAME_NOT_UNIQUE, app_name));
            }
            this._app_name = app_name;
            this._objId = 'app:' + RIAPP.global.utils.getNewID();
            this._options = options;
            //lifetime object to store references foo the bindings and element views created by this application
            this._objLifeTime = null;
            this._ELV_STORE_KEY = RIAPP.global.consts.DATA_ATTR.EL_VIEW_KEY + Application._newInstanceNum;
            Application._newInstanceNum += 1;
            this._contentFactory = null;
            this._contentFactories = [];
            this._objMaps = [];
            //registered exported types
            this._exports = {
            };
            //loaded  moodules
            this._modules = {
            };
            //each Element view created by application stored in this hash map
            //it keeps them alive until they are destroyed
            this._elViewStore = {
            };
            //used to create sequential keys to store new element views
            this._nextElViewStoreKey = 0;
            this._userCode = {
            };
            this._viewModels = {
            };
            this._initModules();
            this._initUserModules(user_modules);
            var nextFactory = null;
            self._contentFactories.forEach(function (fn_Factory) {
                nextFactory = fn_Factory(nextFactory);
            });
            this._contentFactory = nextFactory;
            RIAPP.global._registerApp(this);
        }
        Application._newInstanceNum = 1;
        Object.defineProperty(Application.prototype, "_DATA_BIND_SELECTOR", {
            get: function () {
                return [
                    '*[', 
                    RIAPP.global.consts.DATA_ATTR.DATA_BIND, 
                    ']'
                ].join('');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "_DATA_VIEW_SELECTOR", {
            get: function () {
                return [
                    '*[', 
                    RIAPP.global.consts.DATA_ATTR.DATA_VIEW, 
                    ']'
                ].join('');
            },
            enumerable: true,
            configurable: true
        });
        Application.prototype._cleanUpObjMaps = function () {
            var self = this;
            this._objMaps.forEach(function (objMap) {
                RIAPP.global.utils.forEachProp(objMap, function (name) {
                    var obj = objMap[name];
                    if(obj instanceof RIAPP.BaseObject) {
                        if(!(obj)._isDestroyed) {
                            (obj).removeNSHandlers(self.uniqueID);
                        }
                    }
                });
            });
            this._objMaps = [];
        };
        Application.prototype._initModules = function () {
            var self = this;
            self.global.moduleNames.forEach(function (mod_name) {
                //checks for initModule function and executes it if the module has it
                if(!!RIAPP.MOD[mod_name] && !!RIAPP.MOD[mod_name].initModule) {
                    RIAPP.MOD[mod_name].initModule(self);
                }
            });
        };
        Application.prototype._initUserModules = function (user_modules) {
            var self = this;
            user_modules.forEach(function (mod) {
                self._modules[mod.name] = mod.initFn(self);
            });
        };
        Application.prototype._onError = function (error, source) {
            if(RIAPP.global._checkIsDummy(error)) {
                return true;
            }
            var isHandled = _super.prototype._onError.call(this, error, source);
            if(!isHandled) {
                return RIAPP.global._onError(error, source);
            }
            return isHandled;
        };
        Application.prototype._getElView = //get element view associated with HTML element(if any)
        function (el) {
            var storeID = el.getAttribute(this._ELV_STORE_KEY);
            if(!!storeID) {
                return this._elViewStore[storeID];
            }
            return null;
        };
        Application.prototype._setElView = //store association of HTML element with its element View
        function (el, view) {
            var storeID = el.getAttribute(this._ELV_STORE_KEY);
            if(!storeID) {
                if(!view) {
                    return;
                }
                storeID = 's_' + this._nextElViewStoreKey;
                this._nextElViewStoreKey += 1;
                el.setAttribute(this._ELV_STORE_KEY, storeID);
                this._elViewStore[storeID] = view;
            } else {
                if(!view) {
                    el.removeAttribute(this._ELV_STORE_KEY);
                    delete this._elViewStore[storeID];
                } else {
                    this._elViewStore[storeID] = view;
                }
            }
        };
        Application.prototype._bindTemplateElements = function (templateEl) {
            var self = this, global = self.global, selector = self._DATA_BIND_SELECTOR + ', ' + self._DATA_VIEW_SELECTOR, selectedElem = RIAPP.ArrayHelper.fromList(templateEl.querySelectorAll(selector)), lftm = RIAPP.MOD.utils.LifeTimeScope.create();
            if(templateEl.hasAttribute(global.consts.DATA_ATTR.DATA_BIND) || templateEl.hasAttribute(global.consts.DATA_ATTR.DATA_VIEW)) {
                selectedElem.push(templateEl);
            }
            selectedElem.forEach(function (el) {
                var op, j, len, binding, bind_attr, temp_opts, elView;
                if(self.global.utils.check.isInsideDataForm(el)) {
                    return;
                }
                //first create element view
                elView = self.getElementView(el);
                lftm.addObj(elView);
                if(el.hasAttribute(global.consts.DATA_ATTR.DATA_VIEW)) {
                    el.removeAttribute(global.consts.DATA_ATTR.DATA_VIEW);
                }
                //then create databinding if element has data-bind attribute
                bind_attr = el.getAttribute(global.consts.DATA_ATTR.DATA_BIND);
                if(!!bind_attr) {
                    el.removeAttribute(global.consts.DATA_ATTR.DATA_BIND);
                    temp_opts = global.parser.parseOptions(bind_attr);
                    for(j = 0 , len = temp_opts.length; j < len; j += 1) {
                        op = RIAPP.MOD.baseContent.getBindingOptions(self, temp_opts[j], elView, null);
                        binding = self.bind(op);
                        op.target = null;
                        lftm.addObj(binding);
                    }
                }
            });
            return lftm;
        };
        Application.prototype._bindElements = function (scope, dctx, isDataForm) {
            var self = this, global = self.global;
            scope = scope || global.document;
            //select all elements with binding attributes inside templates
            var selectedElem = RIAPP.ArrayHelper.fromList(scope.querySelectorAll(self._DATA_BIND_SELECTOR + ', ' + self._DATA_VIEW_SELECTOR));
            var lftm = RIAPP.MOD.utils.LifeTimeScope.create();
            selectedElem.forEach(function (el) {
                var app_name, bind_attr, temp_opts, bind_op, elView;
                //skip elements inside dataform, they are databound when dataform is databound
                if(!isDataForm && global.utils.check.isInsideDataForm(el)) {
                    return;
                }
                if(!isDataForm) {
                    if(el.hasAttribute(global.consts.DATA_ATTR.DATA_APP)) {
                        app_name = el.getAttribute(global.consts.DATA_ATTR.DATA_APP);
                    }
                    //check for which application this binding is for
                    if(!!app_name && self.appName !== app_name) {
                        return;
                    }
                    if(!app_name && self.appName !== 'default') {
                        return;
                    }
                }
                //first create element view
                elView = self.getElementView(el);
                lftm.addObj(elView);
                bind_attr = el.getAttribute(global.consts.DATA_ATTR.DATA_BIND);
                //if it has data-bind attribute then proceed create binding
                if(!!bind_attr) {
                    temp_opts = global.parser.parseOptions(bind_attr);
                    for(var i = 0, len = temp_opts.length; i < len; i += 1) {
                        bind_op = RIAPP.MOD.baseContent.getBindingOptions(self, temp_opts[i], elView, dctx);
                        lftm.addObj(self.bind(bind_op));
                    }
                }
            });
            return lftm;
        };
        Application.prototype._getContent = //used as a factory to create Data Contents
        function (contentType, options, parentEl, dctx, isEditing) {
            var content;
            return new contentType(this, parentEl, options, dctx, isEditing);
        };
        Application.prototype._getContentType = //used to select contentType based on content options
        function (options) {
            return this.contentFactory.getContentType(options);
        };
        Application.prototype._destroyBindings = function () {
            if(!!this._objLifeTime) {
                this._objLifeTime.destroy();
                this._objLifeTime = null;
            }
        };
        Application.prototype._setUpBindings = function () {
            var defScope = this.global.document, defaultDataCtxt = this;
            this._destroyBindings();
            this._objLifeTime = this._bindElements(defScope, defaultDataCtxt, false);
        };
        Application.prototype.registerElView = function (name, type) {
            var name2 = 'elvws.' + name;
            if(!RIAPP.global._getObject(this, name2)) {
                RIAPP.global._registerObject(this, name2, type);
            } else {
                throw new Error(RIAPP.global.utils.format(RIAPP.ERRS.ERR_OBJ_ALREADY_REGISTERED, name));
            }
        };
        Application.prototype.getElementView = //checks if the element already has created and attached ElView, if no then it creates and attaches ElView for the element
        function (el) {
            var viewType, attr, data_view_op_arr, data_view_op, options, elView;
            elView = this._getElView(el);
            //check if element view is already created for this element
            if(!!elView) {
                return elView;
            }
            //if not, then proceed to create new element view...
            if(el.hasAttribute(RIAPP.global.consts.DATA_ATTR.DATA_VIEW)) {
                attr = el.getAttribute(RIAPP.global.consts.DATA_ATTR.DATA_VIEW);
                data_view_op_arr = RIAPP.global.parser.parseOptions(attr);
                if(!!data_view_op_arr && data_view_op_arr.length > 0) {
                    data_view_op = data_view_op_arr[0];
                    if(!!data_view_op.name && data_view_op.name != 'default') {
                        //try to get a view by explicit view name
                        viewType = this._getElViewType(data_view_op.name);
                        if(!viewType) {
                            throw new Error(RIAPP.global.utils.format(RIAPP.ERRS.ERR_ELVIEW_NOT_REGISTERED, data_view_op.name));
                        }
                    }
                    if(!!data_view_op.options) {
                        options = data_view_op.options;
                    }
                }
            }
            if(!viewType) {
                var nodeNm = el.nodeName.toLowerCase(), type;
                switch(nodeNm) {
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
                if(!viewType) {
                    throw new Error(RIAPP.global.utils.format(RIAPP.ERRS.ERR_ELVIEW_NOT_CREATED, nodeNm));
                }
            }
            elView = new viewType(this, el, options || {
            });
            return elView;
        };
        Application.prototype.bind = function (opts) {
            return new RIAPP.MOD.binding.Binding(opts);
        };
        Application.prototype.registerContentFactory = function (fn) {
            this._contentFactories.push(fn);
        };
        Application.prototype.registerConverter = function (name, obj) {
            var name2 = 'converters.' + name;
            if(!RIAPP.global._getObject(this, name2)) {
                RIAPP.global._registerObject(this, name2, obj);
            } else {
                throw new Error(RIAPP.global.utils.format(RIAPP.ERRS.ERR_OBJ_ALREADY_REGISTERED, name));
            }
        };
        Application.prototype.getConverter = function (name) {
            var name2 = 'converters.' + name;
            var res = RIAPP.global._getObject(this, name2);
            if(!res) {
                res = RIAPP.global._getObject(RIAPP.global, name2);
            }
            if(!res) {
                throw new Error(RIAPP.global.utils.format(RIAPP.ERRS.ERR_CONVERTER_NOTREGISTERED, name));
            }
            return res;
        };
        Application.prototype.registerType = function (name, obj) {
            var name2 = 'types.' + name;
            return RIAPP.global._registerObject(this, name2, obj);
        };
        Application.prototype.getType = function (name) {
            var name2 = 'types.' + name;
            var res = RIAPP.global._getObject(this, name2);
            if(!res) {
                res = RIAPP.global._getObject(RIAPP.global, name2);
            }
            return res;
        };
        Application.prototype._getElViewType = function (name) {
            var name2 = 'elvws.' + name;
            var res = RIAPP.global._getObject(this, name2);
            if(!res) {
                res = RIAPP.global._getObject(RIAPP.global, name2);
            }
            return res;
        };
        Application.prototype.registerObject = //registers instances of objects, so they can be retrieved later anywhere in the application's code
        //very similar to a dependency injection container - you can later obtain it with getObject function
        function (name, obj) {
            var self = this, name2 = 'objects.' + name;
            if(obj instanceof RIAPP.BaseObject) {
                (obj).addOnDestroyed(function (s, a) {
                    RIAPP.global._removeObject(self, name2);
                }, self.uniqueID);
            }
            var objMap = RIAPP.global._registerObject(this, name2, obj);
            if(this._objMaps.indexOf(objMap) < 0) {
                this._objMaps.push(objMap);
            }
        };
        Application.prototype.getObject = function (name) {
            var name2 = 'objects.' + name;
            var res = RIAPP.global._getObject(this, name2);
            return res;
        };
        Application.prototype.onStartUp = function () {
        };
        Application.prototype.startUp = //set up application - use fn_sandbox callback to setUp handlers on objects, create viewModels and etc.
        function (fn_sandbox) {
            var self = this, fn_init = function () {
                self.onStartUp();
                if(!!fn_sandbox) {
                    fn_sandbox.apply(self, [
                        self
                    ]);
                }
                self._setUpBindings();
            };
            try  {
                if(!!fn_sandbox && !RIAPP.global.utils.check.isFunction(fn_sandbox)) {
                    throw new Error(RIAPP.ERRS.ERR_APP_SETUP_INVALID);
                }
                RIAPP.global._waitForNotLoading(fn_init, null);
            } catch (ex) {
                RIAPP.global.reThrow(ex, self._onError(ex, self));
            }
        };
        Application.prototype.loadTemplates = //loads a group of templates from the server
        function (url) {
            this.loadTemplatesAsync(function () {
                return RIAPP.global.utils.performAjaxGet(url);
            });
        };
        Application.prototype.loadTemplatesAsync = //loads a group of templates from the server
        function (fn_loader) {
            RIAPP.global._loadTemplatesAsync(fn_loader, this);
        };
        Application.prototype.registerTemplateLoader = /*
        fn_loader must load template and return promise which resolves with loaded HTML string
        */
        function (name, fn_loader) {
            RIAPP.global._registerTemplateLoader(this.appName + '.' + name, {
                fn_loader: fn_loader
            });
        };
        Application.prototype.getTemplateLoader = function (name) {
            var res = RIAPP.global._getTemplateLoader(this.appName + '.' + name);
            if(!res) {
                res = RIAPP.global._getTemplateLoader(name);
            }
            return res;
        };
        Application.prototype.registerTemplateGroup = function (name, group) {
            var group = RIAPP.global.utils.extend(false, {
                fn_loader: null,
                url: null,
                names: null,
                app: this
            }, group);
            RIAPP.global._registerTemplateGroup(this.appName + '.' + name, group);
        };
        Application.prototype.destroy = function () {
            if(this._isDestroyed) {
                return;
            }
            this._isDestroyCalled = true;
            var self = this;
            try  {
                self._contentFactories = [];
                RIAPP.global._unregisterApp(self);
                self._destroyBindings();
                self._cleanUpObjMaps();
                self._exports = {
                };
                self._modules = {
                };
                self._elViewStore = {
                };
                self._userCode = {
                };
                self._viewModels = {
                };
                self._contentFactory = null;
            }finally {
                _super.prototype.destroy.call(this);
            }
        };
        Application.prototype.toString = function () {
            return 'Application: ' + this.appName;
        };
        Object.defineProperty(Application.prototype, "uniqueID", {
            get: function () {
                return this._objId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "options", {
            get: function () {
                return this._options;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "contentFactory", {
            get: function () {
                return this._contentFactory;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "appName", {
            get: function () {
                return this._app_name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "modules", {
            get: //loaded app modules which are mapped by their name
            function () {
                return this._modules;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "global", {
            get: function () {
                return RIAPP.global;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "UC", {
            get: //Namespace for attaching custom user code (functions and objects)
            function () {
                return this._userCode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "VM", {
            get: //Namespace for attaching application view models
            function () {
                return this._viewModels;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "app", {
            get: function () {
                return this;
            },
            enumerable: true,
            configurable: true
        });
        return Application;
    })(RIAPP.BaseObject);
    RIAPP.Application = Application;    
    ;
    RIAPP.global.registerType('Application', Application);
})(RIAPP || (RIAPP = {}));
//@ sourceMappingURL=jriapp.js.map

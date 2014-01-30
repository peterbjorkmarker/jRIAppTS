/// <reference path="..\thirdparty\jquery.d.ts" />
/// <reference path="..\thirdparty\moment.d.ts" />
/// <reference path="app_en.ts"/>
/// <reference path="common.ts"/>
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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RIAPP;
(function (RIAPP) {
    var constsMOD = RIAPP.MOD.consts;
    var utilsMOD = RIAPP.MOD.utils;
    var bindMOD = RIAPP.MOD.binding;
    var elviewMOD = RIAPP.MOD.baseElView;
    var contentMOD = RIAPP.MOD.baseContent;
    var formMOD = RIAPP.MOD.dataform;
    var convertMOD = RIAPP.MOD.converter;

    //ALL CORE MODULES are LOADED, INITIALIZE THE Global
    RIAPP.global._initialize();

    //local variable for optimization
    var utils = RIAPP.global.utils, parser = RIAPP.global.parser;

    var Application = (function (_super) {
        __extends(Application, _super);
        function Application(options) {
            _super.call(this);
            var self = this, app_name = 'default', user_modules = [];
            this._options = null;
            if (!!options) {
                this._options = options;
                if (!!options.application_name)
                    app_name = options.application_name;
                if (!!options.user_modules)
                    user_modules = options.user_modules;
            }
            if (!!RIAPP.global.findApp(app_name))
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
            var nextFactory = null;
            self._contentFactories.forEach(function (fn_Factory) {
                nextFactory = fn_Factory(nextFactory);
            });
            this._contentFactory = nextFactory;
            RIAPP.global._registerApp(this);
        }
        Object.defineProperty(Application.prototype, "_DATA_BIND_SELECTOR", {
            get: function () {
                return ['*[', constsMOD.DATA_ATTR.DATA_BIND, ']'].join('');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "_DATA_VIEW_SELECTOR", {
            get: function () {
                return ['*[', constsMOD.DATA_ATTR.DATA_VIEW, ']'].join('');
            },
            enumerable: true,
            configurable: true
        });

        Application.prototype._getEventNames = function () {
            var base_events = _super.prototype._getEventNames.call(this);
            return ['startup'].concat(base_events);
        };
        Application.prototype._cleanUpObjMaps = function () {
            var self = this;
            this._objMaps.forEach(function (objMap) {
                utils.forEachProp(objMap, function (name) {
                    var obj = objMap[name];
                    if (obj instanceof RIAPP.BaseObject) {
                        if (!obj._isDestroyed) {
                            obj.removeNSHandlers(self.uniqueID);
                        }
                    }
                });
            });
            this._objMaps = [];
        };
        Application.prototype._initModules = function () {
            //initialize core modules
            var self = this, modules = RIAPP.MOD;
            self.global.moduleNames.forEach(function (mod_name) {
                //checks for initModule function and executes it if the module has it
                if (!!modules[mod_name] && !!modules[mod_name].initModule) {
                    modules[mod_name].initModule(self);
                }
            });
        };
        Application.prototype._initUserModules = function (user_modules) {
            var self = this;
            user_modules.forEach(function (mod) {
                self._modules[mod.name] = mod.initFn(self);
            });
        };
        Application.prototype._destroyBindings = function () {
            if (!!this._objLifeTime) {
                this._objLifeTime.destroy();
                this._objLifeTime = null;
            }
        };
        Application.prototype._setUpBindings = function () {
            var defScope = this.appRoot, defaultDataCtxt = this;
            this._destroyBindings();
            this._objLifeTime = this._bindElements(defScope, defaultDataCtxt, false, false);
        };
        Application.prototype._getElementViewInfo = function (el) {
            var view_name = null, vw_options = null, attr, data_view_op_arr, data_view_op;
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
        };
        Application.prototype._onError = function (error, source) {
            if (RIAPP.global._checkIsDummy(error)) {
                return true;
            }
            var isHandled = _super.prototype._onError.call(this, error, source);
            if (!isHandled) {
                return RIAPP.global._onError(error, source);
            }
            return isHandled;
        };

        //get element view associated with HTML element(if any)
        Application.prototype._getElView = function (el) {
            var storeID = el.getAttribute(this._ELV_STORE_KEY);
            if (!!storeID) {
                return this._elViewStore[storeID];
            }
            return null;
        };
        Application.prototype._createElementView = function (el, view_info) {
            var viewType, elView;

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
        };

        //store association of HTML element with its element View
        Application.prototype._setElView = function (el, view) {
            var storeID = el.getAttribute(this._ELV_STORE_KEY);
            if (!storeID) {
                if (!view)
                    return;
                storeID = 's_' + this._nextElViewStoreKey;
                this._nextElViewStoreKey += 1;
                el.setAttribute(this._ELV_STORE_KEY, storeID);
                this._elViewStore[storeID] = view;
            } else {
                if (!view) {
                    el.removeAttribute(this._ELV_STORE_KEY);
                    delete this._elViewStore[storeID];
                } else {
                    this._elViewStore[storeID] = view;
                }
            }
        };
        Application.prototype._bindTemplateElements = function (templateEl) {
            var self = this, global = self.global, selector = self._DATA_BIND_SELECTOR + ', ' + self._DATA_VIEW_SELECTOR, selectedElem = RIAPP.ArrayHelper.fromList(templateEl.querySelectorAll(selector)), lftm = new utilsMOD.LifeTimeScope(), checks = utils.check, DATA_FORM = constsMOD.DATA_ATTR.DATA_FORM, DATA_BIND = constsMOD.DATA_ATTR.DATA_BIND, DATA_VIEW = constsMOD.DATA_ATTR.DATA_VIEW;

            if (templateEl.hasAttribute(DATA_BIND) || templateEl.hasAttribute(DATA_VIEW)) {
                selectedElem.push(templateEl);
            }

            //mark all dataforms for easier checking that the element is a dataform
            selectedElem.forEach(function (el) {
                if (checks.isDataForm(el))
                    el.setAttribute(DATA_FORM, 'yes');
            });

            //select all dataforms inside the scope
            var formSelector = ['*[', DATA_FORM, ']'].join(''), forms = RIAPP.ArrayHelper.fromList(templateEl.querySelectorAll(formSelector));

            if (checks.isDataForm(templateEl)) {
                //in this case process only this element
                selectedElem = [templateEl];
            }

            selectedElem.forEach(function (el) {
                var op, binding, bind_attr, temp_opts, elView, j, len;

                //if element inside a dataform return
                if (checks.isInNestedForm(templateEl, forms, el)) {
                    return;
                }

                try  {
                    //first create element view
                    elView = self.getElementView(el);
                } catch (ex) {
                    self._onError(ex, self);
                    global._throwDummy(ex);
                }
                lftm.addObj(elView);
                if (elView instanceof formMOD.DataFormElView) {
                    elView.form.isInsideTemplate = true;
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
        };
        Application.prototype._bindElements = function (scope, dctx, isDataFormBind, isInsideTemplate) {
            var self = this, global = self.global, checks = utils.check, DATA_FORM = constsMOD.DATA_ATTR.DATA_FORM, DATA_BIND = constsMOD.DATA_ATTR.DATA_BIND, DATA_VIEW = constsMOD.DATA_ATTR.DATA_VIEW, selector = self._DATA_BIND_SELECTOR + ', ' + self._DATA_VIEW_SELECTOR;

            scope = scope || global.document;

            //select all elements with binding attributes
            var selectedElem = RIAPP.ArrayHelper.fromList(scope.querySelectorAll(selector));
            var lftm = new utilsMOD.LifeTimeScope();

            if (!isDataFormBind) {
                //mark all dataforms for easier checking that the element is a dataform
                selectedElem.forEach(function (el) {
                    if (checks.isDataForm(el))
                        el.setAttribute(DATA_FORM, 'yes');
                });
            }

            //select all dataforms inside the scope
            var formSelector = ['*[', DATA_FORM, ']'].join(''), forms = RIAPP.ArrayHelper.fromList(scope.querySelectorAll(formSelector));

            selectedElem.forEach(function (el) {
                var bind_attr, temp_opts, bind_op, elView, i, len;

                //return if the current element is inside a dataform
                if (checks.isInNestedForm(scope, forms, el)) {
                    return;
                }

                try  {
                    //first create element view
                    elView = self.getElementView(el);
                } catch (ex) {
                    self._onError(ex, self);
                    global._throwDummy(ex);
                }
                lftm.addObj(elView);
                if (elView instanceof formMOD.DataFormElView) {
                    elView.form.isInsideTemplate = isInsideTemplate;
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
        };

        //used as a factory to create Data Contents
        Application.prototype._getContent = function (contentType, options, parentEl, dctx, isEditing) {
            return new contentType(this, parentEl, options, dctx, isEditing);
        };

        //used to select contentType based on content options
        Application.prototype._getContentType = function (options) {
            return this.contentFactory.getContentType(options);
        };
        Application.prototype._getElViewType = function (name) {
            var name2 = 'elvws.' + name, global = this.global;
            var res = global._getObject(this, name2);
            if (!res) {
                res = global._getObject(global, name2);
            }
            return res;
        };
        Application.prototype.addOnStartUp = function (fn, namespace) {
            this.addHandler('startup', fn, namespace);
        };
        Application.prototype.removeOnStartUp = function (namespace) {
            this.removeHandler('startup', namespace);
        };
        Application.prototype.getExports = function () {
            return this._exports;
        };
        Application.prototype.registerElView = function (name, type) {
            var name2 = 'elvws.' + name, global = this.global;
            if (!global._getObject(this, name2)) {
                global._registerObject(this, name2, type);
            } else
                throw new Error(utils.format(RIAPP.ERRS.ERR_OBJ_ALREADY_REGISTERED, name));
        };

        //checks if the element already has created and attached ElView, if no then it creates and attaches ElView for the element
        Application.prototype.getElementView = function (el) {
            var elView = this._getElView(el);

            //check if element view is already created for this element
            if (!!elView)
                return elView;
            var info = this._getElementViewInfo(el);
            return this._createElementView(el, info);
        };
        Application.prototype.bind = function (opts) {
            return new bindMOD.Binding(opts, this.appName);
        };
        Application.prototype.registerContentFactory = function (fn) {
            this._contentFactories.push(fn);
        };
        Application.prototype.registerConverter = function (name, obj) {
            var name2 = 'converters.' + name;
            if (!RIAPP.global._getObject(this, name2)) {
                RIAPP.global._registerObject(this, name2, obj);
            } else
                throw new Error(utils.format(RIAPP.ERRS.ERR_OBJ_ALREADY_REGISTERED, name));
        };
        Application.prototype.getConverter = function (name) {
            var name2 = 'converters.' + name;
            var res = RIAPP.global._getObject(this, name2);
            if (!res) {
                res = RIAPP.global._getObject(RIAPP.global, name2);
            }
            if (!res)
                throw new Error(utils.format(RIAPP.ERRS.ERR_CONVERTER_NOTREGISTERED, name));
            return res;
        };
        Application.prototype.registerType = function (name, obj) {
            var name2 = 'types.' + name;
            return RIAPP.global._registerObject(this, name2, obj);
        };
        Application.prototype.getType = function (name) {
            var name2 = 'types.' + name;
            var res = RIAPP.global._getObject(this, name2);
            if (!res) {
                res = RIAPP.global._getObject(RIAPP.global, name2);
            }
            return res;
        };

        //registers instances of objects, so they can be retrieved later anywhere in the application's code
        //very similar to a dependency injection container - you can later obtain the registerd object with the getObject function
        Application.prototype.registerObject = function (name, obj) {
            var self = this, name2 = 'objects.' + name;
            if (obj instanceof RIAPP.BaseObject) {
                obj.addOnDestroyed(function (s, a) {
                    RIAPP.global._removeObject(self, name2);
                }, self.uniqueID);
            }
            var objMap = RIAPP.global._registerObject(this, name2, obj);
            if (this._objMaps.indexOf(objMap) < 0) {
                this._objMaps.push(objMap);
            }
        };
        Application.prototype.getObject = function (name) {
            var name2 = 'objects.' + name;
            var res = RIAPP.global._getObject(this, name2);
            return res;
        };

        //can override this method in derived classes
        Application.prototype.onStartUp = function () {
        };

        //set up application - use fn_sandbox callback to setUp handlers on objects, create viewModels and etc.
        Application.prototype.startUp = function (fn_sandbox) {
            var self = this, fn_init = function () {
                try  {
                    self.onStartUp();
                    self.raiseEvent('startup', {});
                    if (!!fn_sandbox)
                        fn_sandbox.apply(self, [self]);
                    self._setUpBindings();
                } catch (ex) {
                    self._onError(ex, self);
                    RIAPP.global._throwDummy(ex);
                }
            };

            try  {
                if (!!fn_sandbox && !utils.check.isFunction(fn_sandbox))
                    throw new Error(RIAPP.ERRS.ERR_APP_SETUP_INVALID);
                RIAPP.global._waitForNotLoading(fn_init, null);
            } catch (ex) {
                RIAPP.global.reThrow(ex, self._onError(ex, self));
            }
        };

        //loads a group of templates from the server
        Application.prototype.loadTemplates = function (url) {
            this.loadTemplatesAsync(function () {
                return utils.performAjaxGet(url);
            });
        };

        //loads a group of templates from the server
        Application.prototype.loadTemplatesAsync = function (fn_loader) {
            RIAPP.global._loadTemplatesAsync(fn_loader, this);
        };

        /*
        fn_loader must load template and return promise which resolves with loaded HTML string
        */
        Application.prototype.registerTemplateLoader = function (name, fn_loader) {
            RIAPP.global._registerTemplateLoader(this.appName + '.' + name, {
                fn_loader: fn_loader
            });
        };
        Application.prototype.getTemplateLoader = function (name) {
            var res = RIAPP.global._getTemplateLoader(this.appName + '.' + name);
            if (!res) {
                res = RIAPP.global._getTemplateLoader(name);
            }
            return res;
        };
        Application.prototype.registerTemplateGroup = function (name, group) {
            var group2 = utils.extend(false, {
                fn_loader: null,
                url: null,
                names: null,
                app: this
            }, group);
            RIAPP.global._registerTemplateGroup(this.appName + '.' + name, group2);
        };
        Application.prototype.destroy = function () {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            var self = this;
            try  {
                self._contentFactories = [];
                RIAPP.global._unregisterApp(self);
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
        Object.defineProperty(Application.prototype, "appRoot", {
            get: function () {
                if (!this._options || !this._options.application_root)
                    return this.global.document;
                return this._options.application_root;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Application.prototype, "modules", {
            //loaded app modules which are mapped by their name
            get: function () {
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
            //Namespace for attaching custom user code (functions and objects)
            get: function () {
                return this._userCode;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Application.prototype, "VM", {
            //Namespace for attaching application view models
            get: function () {
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
        Application._newInstanceNum = 1;
        return Application;
    })(RIAPP.BaseObject);
    RIAPP.Application = Application;
})(RIAPP || (RIAPP = {}));
//# sourceMappingURL=app.js.map

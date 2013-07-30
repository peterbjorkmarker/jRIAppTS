var RIAPP;
(function (RIAPP) {
    RIAPP.ERRS = {
        ERR_APP_NEED_JQUERY: 'The project is dependent on JQuery',
        ERR_ASSERTION_FAILED: 'Assertion "{0}" was not satisfied',
        ERR_BINDING_CONTENT_NOT_FOUND: 'BindingContent is not found',
        ERR_DBSET_READONLY: 'DbSet: {0} is readOnly and can not be edited',
        ERR_DBSET_INVALID_FIELDNAME: 'DbSet: {0} has no field with the name: {1}',
        ERR_FIELD_READONLY: 'Field is readOnly and can not be edited',
        ERR_FIELD_ISNOT_NULLABLE: 'Field is not nullable and can not be set to null',
        ERR_FIELD_WRONG_TYPE: 'Value: {0} can not be assigned to {1} type field',
        ERR_FIELD_MAXLEN: 'Value exceeds field maxlength: {0}',
        ERR_FIELD_DATATYPE: 'Unknown field data type: {0}',
        ERR_FIELD_REGEX: 'Value {0} can not be accepted as the right value for this field',
        ERR_FIELD_RANGE: 'Value {0} is outside the allowed range {1} for this field',
        ERR_EVENT_INVALID: 'Invalid event name: {0}',
        ERR_EVENT_INVALID_FUNC: 'Invalid event function value',
        ERR_MODULE_UNDEFINED: 'User module: {0} is undefined',
        ERR_MODULE_ALREDY_REGISTERED: 'User module: {0} is already registered',
        ERR_PROP_NAME_EMPTY: 'Empty property name parameter',
        ERR_GLOBAL_SINGLTON: 'There must be only one instance of Global object',
        ERR_OBJ_ALREADY_REGISTERED: 'Object with the name: {0} is already registered in the type system',
        ERR_TEMPLATE_ALREADY_REGISTERED: 'TEMPLATE with the name: {0} is already registered',
        ERR_TEMPLATE_NOTREGISTERED: 'TEMPLATE with the name: {0} is not registered',
        ERR_TEMPLATE_GROUP_NOTREGISTERED: 'TEMPLATE\'s group: {0} is not registered',
        ERR_CONVERTER_NOTREGISTERED: 'Converter: {0} is not registered',
        ERR_JQUERY_DATEPICKER_NOTFOUND: 'Application is dependent on JQuery.UI.datepicker',
        ERR_PARAM_INVALID: 'Parameter: {0} has invalid value: {1}',
        ERR_PARAM_INVALID_TYPE: 'Parameter: {0} has invalid type. Must be {1}',
        ERR_KEY_IS_EMPTY: 'Key value must not be empty',
        ERR_KEY_IS_NOTFOUND: 'Can not find item with the key: {0}',
        ERR_ITEM_IS_ATTACHED: 'Operation invalid, reason: Item already has been attached',
        ERR_ITEM_IS_DETACHED: 'Operation invalid, reason: Item is detached',
        ERR_ITEM_IS_NOTFOUND: 'Operation invalid, reason: Item is not found',
        ERR_ITEM_NAME_COLLISION: 'The "{0}" DbSet\'s field name: "{1}" is invalid, because a property with that name already exists on the entity type.',
        ERR_DICTKEY_IS_NOTFOUND: "Dictionary keyName: {0} does not exist in item's properties",
        ERR_DICTKEY_IS_EMPTY: 'Dictionary key property: {0} must be not empty',
        ERR_CONV_INVALID_DATE: 'Converter cannot parse datetime string value: {0}',
        ERR_CONV_INVALID_NUM: 'Converter cannot parse numeric string value: {0}',
        ERR_QUERY_NAME_NOTFOUND: 'Can not find Query with the name: {0}',
        ERR_QUERY_BETWEEN: '"BETWEEN" Query operator expects two values',
        ERR_QUERY_OPERATOR_INVALID: 'Invalid query operator {0}',
        ERR_OPER_REFRESH_INVALID: 'Refresh operation can not be done with items in Detached or Added State',
        ERR_CALC_FIELD_DEFINE: 'Field: "{0}" definition error: Calculated fields can be dependent only on items fields',
        ERR_CALC_FIELD_SELF_DEPEND: 'Field: "{0}" definition error: Calculated fields can not be dependent on themselves',
        ERR_DOMAIN_CONTEXT_INITIALIZED: 'DbContext already initialized',
        ERR_DOMAIN_CONTEXT_NOT_INITIALIZED: 'DbContext is not initialized',
        ERR_SVC_METH_PARAM_INVALID: 'Invalid parameter {0} value {1} for service method: {2} invocation',
        ERR_DB_LOAD_NO_QUERY: 'Query parameter is not supplied',
        ERR_DBSET_NAME_INVALID: 'Invalid dbSet Name: {0}',
        ERR_APP_NAME_NOT_UNIQUE: 'Application instance with the name: {0} already exists',
        ERR_ELVIEW_NOT_REGISTERED: 'Can not find registered element view with the name: {0}',
        ERR_ELVIEW_NOT_CREATED: 'Can not create element view for element with Tag Name: {0}',
        ERR_BIND_TARGET_EMPTY: 'Binding target is empty',
        ERR_BIND_TGTPATH_INVALID: 'Binding targetPath has invalid value: {0}',
        ERR_BIND_MODE_INVALID: 'Binding mode has invalid value: {0}',
        ERR_BIND_TARGET_INVALID: 'Binding target must be a descendant of BaseObject',
        ERR_APP_SETUP_INVALID: 'Application\'s setUp method parameter must be a valid function',
        ERR_GRID_DATASRC_INVALID: 'DataGrid\'s datasource must be a descendant of Collection type',
        ERR_COLLECTION_CHANGETYPE_INVALID: 'Invalid Collection change type value: {0}',
        ERR_GRID_COLTYPE_INVALID: 'Invalid Column type type value: {0}',
        ERR_PAGER_DATASRC_INVALID: 'Pager datasource must be a descendant of Collection type',
        ERR_STACKPNL_DATASRC_INVALID: 'StackPanel datasource must be a descendant of Collection type',
        ERR_STACKPNL_TEMPLATE_INVALID: 'StackPanel templateID is not provided in the options',
        ERR_LISTBOX_DATASRC_INVALID: 'ListBox datasource must be a descendant of Collection type',
        ERR_DATAFRM_DCTX_INVALID: 'DataForm\'s dataContext must be a descendant of BaseObject type',
        ERR_DCTX_HAS_NO_FIELDINFO: 'DataContext has no getFieldInfo method',
        ERR_TEMPLATE_ID_INVALID: 'Element can not be found by TemplateID: {0}',
        ERR_STRING_FORMAT_INVALID: 'String format has invalid expression value: {0}',
        ERR_ITEM_DELETED_BY_ANOTHER_USER: 'The record was deleted by another user',
        ERR_ACCESS_DENIED: 'The access is denied. Please, ask administrator to assign user rights to your account.',
        ERR_CONCURRENCY: 'The record has been modified by another user. Please, refresh record before editing.',
        ERR_VALIDATION: 'Data validation error',
        ERR_SVC_VALIDATION: 'Data validation error: {0}',
        ERR_SVC_ERROR: 'Service error: {0}',
        ERR_UNEXPECTED_SVC_ERROR: 'Unexpected service error: {0}',
        ERR_ASSOC_NAME_INVALID: 'Invalid association name: {0}',
        ERR_DATAVIEW_DATASRC_INVALID: 'DataView datasource must not be null and should be descendant of Collection type',
        ERR_DATAVIEW_FILTER_INVALID: 'DataView fn_filter option must be valid function which accepts entity and returns bool value'
    };

    RIAPP.localizable = (function () {
        var locale = {};
        locale.PAGER = {
            firstText: '<<',
            lastText: '>>',
            previousText: '<',
            nextText: '>',
            pageInfo: 'Page {0} of {1}',
            firstPageTip: 'to first page',
            prevPageTip: 'back to page {0}',
            nextPageTip: 'next to page {0}',
            lastPageTip: 'last page',
            showingTip: 'showing result {0} to {1} of {2}',
            showTip: 'show result {0} to {1} of {2}'
        };

        locale.VALIDATE = {
            errorInfo: 'Validation errors:',
            errorField: 'field:'
        };

        locale.TEXT = {
            txtEdit: 'Edit',
            txtAddNew: 'Add new',
            txtDelete: 'Delete',
            txtCancel: 'Cancel',
            txtOk: 'Ok',
            txtRefresh: 'Refresh',
            txtAskDelete: 'Are you sure, you want to delete row?',
            txtSubmitting: 'Submitting data ...',
            txtSave: 'Save',
            txtClose: 'Close',
            txtField: 'Field'
        };

        return locale;
    })();
})(RIAPP || (RIAPP = {}));
'use strict';
var RIAPP;
(function (RIAPP) {
    var ArrayHelper = (function () {
        function ArrayHelper() {
        }
        ArrayHelper.clone = function (arr) {
            if (arr.length === 1) {
                return [arr[0]];
            } else {
                return Array.apply(null, arr);
            }
        };
        ArrayHelper.fromList = function (list) {
            var array = new Array(list.length);
            for (var i = 0, n = list.length; i < n; i++)
                array[i] = list[i];
            return array;
        };
        ArrayHelper.fromCollection = function (list) {
            return ArrayHelper.fromList(list);
        };
        ArrayHelper.distinct = function (arr) {
            var o = {}, i, l = arr.length, r = [];
            for (i = 0; i < l; i += 1)
                o[arr[i]] = arr[i];
            var k = Object.keys(o);
            for (i = 0, l = k.length; i < l; i += 1)
                r.push(o[k[i]]);
            return r;
        };
        return ArrayHelper;
    })();
    RIAPP.ArrayHelper = ArrayHelper;

    var baseUtils = (function () {
        function baseUtils() {
        }
        baseUtils.isFunc = function (a) {
            if (!a)
                return false;
            var rx = /Function/;
            return (typeof (a) === 'function') ? rx.test(a.constructor.toString()) : false;
        };
        baseUtils.endsWith = function (str, suffix) {
            return (str.substr(str.length - suffix.length) === suffix);
        };
        baseUtils.startsWith = function (str, prefix) {
            return (str.substr(0, prefix.length) === prefix);
        };
        baseUtils.fastTrim = function (str) {
            return str.replace(/^\s+|\s+$/g, '');
        };
        baseUtils.trim = function (str, chars) {
            if (!chars) {
                return baseUtils.fastTrim(str);
            }
            return baseUtils.ltrim(baseUtils.rtrim(str, chars), chars);
        };
        baseUtils.ltrim = function (str, chars) {
            chars = chars || "\\s";
            return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
        };
        baseUtils.rtrim = function (str, chars) {
            chars = chars || "\\s";
            return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
        };
        baseUtils.isArray = function (o) {
            if (!o)
                return false;
            return Array.isArray(o);
        };

        baseUtils.format = function (format_str) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            var result = '';
            for (var i = 0; ; ) {
                var open = format_str.indexOf('{', i);
                var close = format_str.indexOf('}', i);
                if ((open < 0) && (close < 0)) {
                    result += format_str.slice(i);
                    break;
                }
                if ((close > 0) && ((close < open) || (open < 0))) {
                    if (format_str.charAt(close + 1) !== '}') {
                        throw new Error(baseUtils.format(RIAPP.ERRS.ERR_STRING_FORMAT_INVALID, format_str));
                    }
                    result += format_str.slice(i, close + 1);
                    i = close + 2;
                    continue;
                }
                result += format_str.slice(i, open);
                i = open + 1;
                if (format_str.charAt(i) === '{') {
                    result += '{';
                    i++;
                    continue;
                }
                if (close < 0)
                    throw new Error(baseUtils.format(RIAPP.ERRS.ERR_STRING_FORMAT_INVALID, format_str));
                var brace = format_str.substring(i, close);
                var colonIndex = brace.indexOf(':');
                var argNumber = parseInt((colonIndex < 0) ? brace : brace.substring(0, colonIndex), 10);
                if (isNaN(argNumber))
                    throw new Error(baseUtils.format(RIAPP.ERRS.ERR_STRING_FORMAT_INVALID, format_str));
                var argFormat = (colonIndex < 0) ? '' : brace.substring(colonIndex + 1);
                var arg = args[argNumber];
                if (arg === undefined || arg === null) {
                    arg = '';
                }

                if (arg.format) {
                    result += arg.format(argFormat);
                } else
                    result += arg.toString();
                i = close + 1;
            }
            return result;
        };
        return baseUtils;
    })();
    RIAPP.baseUtils = baseUtils;

    var BaseObject = (function () {
        function BaseObject() {
            this._isDestroyed = false;
            this._isDestroyCalled = false;
            this.__events = null;
        }
        BaseObject.prototype._getEventNames = function () {
            return ['error', 'destroyed'];
        };
        BaseObject.prototype._addHandler = function (name, fn, namespace, prepend) {
            if (this._isDestroyed)
                return;

            if (!RIAPP.baseUtils.isFunc(fn))
                throw new Error(RIAPP.ERRS.ERR_EVENT_INVALID_FUNC);
            if (!name)
                throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_EVENT_INVALID, name));

            if (this.__events === null)
                this.__events = {};
            var self = this, ev = self.__events, n = name, ns = '*';

            if (!!namespace)
                ns = '' + namespace;

            if (!ev[n])
                ev[n] = [];

            var arr = ev[n];

            if (!arr.some(function (obj) {
                return obj.fn === fn && obj.ns == ns;
            })) {
                if (!prepend)
                    arr.push({ fn: fn, ns: ns }); else
                    arr.unshift({ fn: fn, ns: ns });
            }
        };
        BaseObject.prototype._removeHandler = function (name, namespace) {
            var self = this, ev = self.__events, n = name, ns = '*';
            if (!ev)
                return;

            if (!!namespace)
                ns = '' + namespace;
            var arr, toRemove, i;

            if (!!n) {
                if (!ev[n])
                    return;
                if (ns == '*') {
                    delete ev[n];
                } else {
                    arr = ev[n];
                    toRemove = arr.filter(function (obj) {
                        return obj.ns == ns;
                    });
                    i = arr.length;

                    while (i > 0) {
                        i -= 1;
                        if (toRemove.indexOf(arr[i]) > -1) {
                            arr.splice(i, 1);
                        }
                    }
                    if (arr.length == 0)
                        delete ev[n];
                }
                return;
            }

            if (ns != '*') {
                var keys = Object.keys(ev);
                keys.forEach(function (n) {
                    var arr = ev[n];
                    var toRemove = arr.filter(function (obj) {
                        return obj.ns == ns;
                    });
                    i = arr.length;
                    while (i > 0) {
                        i -= 1;
                        if (toRemove.indexOf(arr[i]) > -1) {
                            arr.splice(i, 1);
                        }
                    }
                    if (arr.length == 0)
                        delete ev[n];
                });
                return;
            }

            self.__events = null;
        };
        BaseObject.prototype._raiseEvent = function (name, data) {
            var self = this, ev = self.__events;
            if (ev === null)
                return;
            if (ev === undefined) {
                throw new Error("Object's constructor was not called");
            }

            if (!!name) {
                if (name != '0*' && RIAPP.baseUtils.startsWith(name, '0')) {
                    this._raiseEvent('0*', data);
                }
                if (!ev[name])
                    return;
                var arr = ArrayHelper.clone(ev[name]);
                arr.forEach(function (obj) {
                    obj.fn.apply(self, [self, data]);
                });
            }
        };
        BaseObject.prototype._onError = function (error, source) {
            if (!!RIAPP.global && RIAPP.global._checkIsDummy(error)) {
                return true;
            }
            if (!error.message) {
                error = new Error('' + error);
            }
            var args = { error: error, source: source, isHandled: false };
            this._raiseEvent('error', args);
            return args.isHandled;
        };
        BaseObject.prototype._checkEventName = function (name) {
            if (this._getEventNames().indexOf(name) === -1)
                throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_EVENT_INVALID, name));
        };
        BaseObject.prototype.raisePropertyChanged = function (name) {
            var data = { property: name };
            this._raiseEvent('0' + name, data);
        };
        BaseObject.prototype.addHandler = function (name, fn, namespace) {
            this._checkEventName(name);
            this._addHandler(name, fn, namespace, false);
        };
        BaseObject.prototype.removeHandler = function (name, namespace) {
            if (!!name) {
                this._checkEventName(name);
            }
            this._removeHandler(name, namespace);
        };
        BaseObject.prototype.addOnDestroyed = function (fn, namespace) {
            this._addHandler('destroyed', fn, namespace, false);
        };
        BaseObject.prototype.removeOnDestroyed = function (namespace) {
            this._removeHandler('destroyed', namespace);
        };
        BaseObject.prototype.addOnError = function (fn, namespace) {
            this._addHandler('error', fn, namespace, false);
        };
        BaseObject.prototype.removeOnError = function (namespace) {
            this.removeHandler('error', namespace);
        };

        BaseObject.prototype.removeNSHandlers = function (namespace) {
            this._removeHandler(null, namespace);
        };
        BaseObject.prototype.raiseEvent = function (name, args) {
            this._checkEventName(name);
            this._raiseEvent(name, args);
        };

        BaseObject.prototype.addOnPropertyChange = function (prop, fn, namespace) {
            if (!prop)
                throw new Error(RIAPP.ERRS.ERR_PROP_NAME_EMPTY);
            prop = '0' + prop;
            this._addHandler(prop, fn, namespace, false);
        };
        BaseObject.prototype.removeOnPropertyChange = function (prop, namespace) {
            if (!!prop)
                prop = '0' + prop;
            this._removeHandler(prop, namespace);
        };
        BaseObject.prototype.destroy = function () {
            if (this._isDestroyed)
                return;
            this._isDestroyed = true;
            this._isDestroyCalled = true;
            try  {
                this._raiseEvent('destroyed', {});
            } finally {
                this.__events = null;
            }
        };
        return BaseObject;
    })();
    RIAPP.BaseObject = BaseObject;
})(RIAPP || (RIAPP = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
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
            if (!!RIAPP.global)
                throw new Error(RIAPP.ERRS.ERR_GLOBAL_SINGLTON);
            if (!jQuery)
                throw new Error(RIAPP.ERRS.ERR_APP_NEED_JQUERY);
            this._window = window;
            this._appInst = {};
            this._$ = jQuery;
            this._currentSelectable = null;
            this._userCode = {};

            this._exports = {};
            this._templateLoaders = {};
            this._templateGroups = {};
            this._promises = [];
            this._moduleNames = [];
            this._parser = null;
            this._isReady = false;
            this._init();
        }
        Global.create = function (window, jQuery) {
            return new Global(window, jQuery);
        };
        Global.prototype._init = function () {
            var self = this;
            self.$(self.document).ready(function ($) {
                self._waitQueue = new RIAPP.MOD.utils.WaitQueue(self);
                self._isReady = true;
                self._processTemplateSections(self.document);
                self.raiseEvent('load', {});
                setTimeout(function () {
                    self.removeHandler('load', null);
                }, 0);
            });

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

            self.window.onerror = function (msg, url, linenumber) {
                if (!!msg && msg.indexOf("DUMMY_ERROR") > -1) {
                    return true;
                }
                alert('Error message: ' + msg + '\nURL: ' + url + '\nLine Number: ' + linenumber);
                return false;
            };
        };
        Global.prototype._registerObjectCore = function (root, name, obj, checkOverwrite) {
            var parts = name.split('.'), parent = root, i;
            for (i = 0; i < parts.length - 1; i += 1) {
                if (!parent[parts[i]]) {
                    parent[parts[i]] = {};
                }
                parent = parent[parts[i]];
            }

            var n = parts[parts.length - 1];
            if (!!checkOverwrite && !!parent[n]) {
                throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_OBJ_ALREADY_REGISTERED, name));
            }
            parent[n] = obj;
            return parent;
        };
        Global.prototype._getObjectCore = function (root, name) {
            var parts = name.split('.'), parent = root, i, res;
            for (i = 0; i < parts.length; i += 1) {
                res = parent[parts[i]];
                if (!res) {
                    return null;
                }
                parent = res;
            }
            return res;
        };
        Global.prototype._removeObjectCore = function (root, name) {
            var parts = name.split('.'), parent = root, i, obj = null;
            for (i = 0; i < parts.length - 1; i += 1) {
                if (!parent[parts[i]]) {
                    return null;
                }
                parent = parent[parts[i]];
            }

            var n = parts[parts.length - 1];
            obj = parent[n];
            if (!!obj) {
                delete parent[n];
            }

            return obj;
        };
        Global.prototype._getEventNames = function () {
            var base_events = _super.prototype._getEventNames.call(this);
            return ['load', 'unload'].concat(base_events);
        };
        Global.prototype.addOnLoad = function (fn, namespace) {
            this._addHandler('load', fn, namespace, false);
        };
        Global.prototype.addOnUnLoad = function (fn, namespace) {
            this._addHandler('unload', fn, namespace, false);
        };
        Global.prototype._addHandler = function (name, fn, namespace, prepend) {
            var self = this;
            if (name == 'load' && self._isReady) {
                setTimeout(function () {
                    fn.apply(self, [self, {}]);
                }, 0);
                return;
            }
            _super.prototype._addHandler.call(this, name, fn, namespace, prepend);
        };
        Global.prototype._trackSelectable = function (selectable) {
            var self = this, utils = self.utils, el = selectable.containerEl;
            self.$(el).on("click." + selectable.uniqueID, function (e) {
                e.stopPropagation();
                var target = e.target;
                if (utils.isContained(target, el))
                    self.currentSelectable = selectable;
            });
        };
        Global.prototype._untrackSelectable = function (selectable) {
            var self = this, utils = self.utils, el = selectable.containerEl;
            self.$(el).off("click." + selectable.uniqueID);
            if (this.currentSelectable === selectable)
                this.currentSelectable = null;
        };
        Global.prototype._registerApp = function (app) {
            if (!this._appInst[app.appName])
                this._appInst[app.appName] = app;
        };
        Global.prototype._unregisterApp = function (app) {
            if (!this._appInst[app.appName])
                return;
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
            if (!!errMod && !!origErr && !origErr.isDummy) {
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
                if (!!app) {
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
            if (self.isLoading !== old)
                self.raisePropertyChanged('isLoading');
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
                } else if (!!err && !!err.responseText) {
                    self._onError(new Error(err.responseText), self);
                } else
                    self._onError(new Error('Failed to load templates'), self);
            });
            return deferred.promise();
        };

        Global.prototype._registerTemplateLoader = function (name, loader) {
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
                if ((!prevLoader.fn_loader && !!prevLoader.groupName) && (!loader.groupName && !!loader.fn_loader)) {
                    return self._registerTemplateLoaderCore(name, loader);
                }
                throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_TEMPLATE_ALREADY_REGISTERED, name));
            }
            return self._registerTemplateLoaderCore(name, loader);
        };
        Global.prototype._getTemplateLoader = function (name) {
            var self = this, loader = self._getTemplateLoaderCore(name);
            if (!loader)
                return null;
            if (!loader.fn_loader && !!loader.groupName) {
                var group = self._getTemplateGroup(loader.groupName);
                if (!group) {
                    throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_TEMPLATE_GROUP_NOTREGISTERED, loader.groupName));
                }

                return function () {
                    if (!group.promise) {
                        group.promise = self._loadTemplatesAsync(group.fn_loader, group.app);
                    }

                    var deferred = self.utils.createDeferred();
                    group.promise.done(function () {
                        try  {
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
            } else
                return loader.fn_loader;
        };
        Global.prototype._registerTemplateGroup = function (groupName, group) {
            var self = this;
            var group2 = self.utils.extend(false, {
                fn_loader: null,
                url: null,
                names: null,
                app: null,
                promise: null
            }, group);

            if (!!group2.url && !group2.fn_loader) {
                group2.fn_loader = function () {
                    return self.utils.performAjaxGet(group2.url);
                };
            }

            this._registerObjectCore(self._templateGroups, groupName, group2, true);
            group2.names.forEach(function (name) {
                if (!!group2.app) {
                    name = group2.app.appName + '.' + name;
                }

                self._registerTemplateLoader(name, {
                    groupName: groupName,
                    fn_loader: null
                });
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
            if (!!isHandled)
                this._throwDummy(ex); else
                throw ex;
        };
        Global.prototype.onModuleLoaded = function (name, module_obj) {
            var self = this;
            if (this.isModuleLoaded(name))
                throw new Error(RIAPP.baseUtils.format('Module: {0} is already loaded!', name));

            this._moduleNames.push(name);
            switch (name) {
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
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            var self = this;
            if (!!self._waitQueue) {
                self._waitQueue.destroy();
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
            if (!this._getObject(this, name2)) {
                this._registerObject(this, name2, obj);
            } else
                throw new Error(RIAPP.global.utils.format(RIAPP.ERRS.ERR_OBJ_ALREADY_REGISTERED, name));
        };
        Global.prototype._getConverter = function (name) {
            var name2 = 'converters.' + name;
            var res = this._getObject(this, name2);
            if (!res)
                throw new Error(this.utils.format(RIAPP.ERRS.ERR_CONVERTER_NOTREGISTERED, name));
            return res;
        };
        Global.prototype.registerElView = function (name, elViewType) {
            var name2 = 'elvws.' + name;
            if (!this._getObject(this, name2)) {
                this._registerObject(this, name2, elViewType);
            } else
                throw new Error(RIAPP.global.utils.format(RIAPP.ERRS.ERR_OBJ_ALREADY_REGISTERED, name));
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
                if (this._currentSelectable !== v) {
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
        Global.vesion = '2.0.0.1';
        Global._TEMPLATES_SELECTOR = ['section.', RIAPP.css_riaTemplate].join('');
        Global._TEMPLATE_SELECTOR = '*[data-role="template"]';
        return Global;
    })(RIAPP.BaseObject);
    RIAPP.Global = Global;
    ;

    RIAPP.global = Global.create(window, jQuery);
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    (function (MOD) {
        (function (consts) {
            consts.CHUNK_SEP = '$&@';
            consts.DATA_ATTR = {
                EL_VIEW_KEY: 'data-elvwkey',
                DATA_BIND: 'data-bind',
                DATA_VIEW: 'data-view',
                DATA_APP: 'data-app',
                DATA_EVENT_SCOPE: 'data-scope',
                DATA_ITEM_KEY: 'data-key',
                DATA_CONTENT: 'data-content',
                DATA_COLUMN: 'data-column',
                DATA_NAME: 'data-name',
                DATA_FORM: 'data-form'
            };
            consts.DATA_TYPE = {
                None: 0,
                String: 1,
                Bool: 2,
                Integer: 3,
                Decimal: 4,
                Float: 5,
                DateTime: 6,
                Date: 7,
                Time: 8,
                Guid: 9,
                Binary: 10
            };
            consts.DATE_CONVERSION = { None: 0, ServerLocalToClientLocal: 1, UtcToClientLocal: 2 };
            consts.CHANGE_TYPE = { NONE: 0, ADDED: 1, UPDATED: 2, DELETED: 3 };
            consts.KEYS = {
                backspace: 8,
                tab: 9,
                enter: 13,
                esc: 27,
                space: 32,
                pageUp: 33,
                pageDown: 34,
                end: 35,
                home: 36,
                left: 37,
                up: 38,
                right: 39,
                down: 40,
                del: 127
            };
            consts.ELVIEW_NM = { DATAFORM: 'dataform', DYNACONT: 'dynacontent' };
            consts.LOADER_GIF = { SMALL: 'loader2.gif', NORMAL: 'loader.gif' };

            RIAPP.global.onModuleLoaded('consts', consts);
        })(MOD.consts || (MOD.consts = {}));
        var consts = MOD.consts;
    })(RIAPP.MOD || (RIAPP.MOD = {}));
    var MOD = RIAPP.MOD;
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    (function (MOD) {
        (function (utils) {
            var base_utils = RIAPP.baseUtils, _newID = 0;

            function defineProps(proto, props, propertyDescriptors) {
                var pds = propertyDescriptors || {}, propertyName;
                var pdsProperties = Object.getOwnPropertyNames(pds);
                pdsProperties.forEach(function (name) {
                    var pd = pds[name];
                    if (pd['enumerable'] === undefined) {
                        pd['enumerable'] = true;
                    }
                    if (pd['configurable'] === undefined) {
                        pd['configurable'] = false;
                    }
                });

                if (!!props) {
                    var simpleProperties = Object.getOwnPropertyNames(props);
                    for (var i = 0, len = simpleProperties.length; i < len; i += 1) {
                        propertyName = simpleProperties[i];
                        if (pds.hasOwnProperty(propertyName)) {
                            continue;
                        }

                        pds[propertyName] = Object.getOwnPropertyDescriptor(props, propertyName);
                    }
                }

                return Object.defineProperties(proto, pds);
            }
            utils.defineProps = defineProps;
            ;

            function extend(typeConstructor, superType) {
                for (var p in superType)
                    if (superType.hasOwnProperty(p))
                        typeConstructor[p] = superType[p];
                function __() {
                    this.constructor = typeConstructor;
                }
                __.prototype = superType.prototype;
                typeConstructor.prototype = new __();
            }
            ;

            function __extendType(_super, pds, props) {
                var fn = function () {
                    _super.apply(this, arguments);
                };
                extend(fn, _super);
                defineProps(fn.prototype, pds, props);
                return fn;
            }
            utils.__extendType = __extendType;

            ;

            var Checks = (function () {
                function Checks() {
                }
                Checks.isNull = function (a) {
                    return a === null;
                };
                Checks.isUndefined = function (a) {
                    return a === undefined;
                };

                Checks.isNt = function (a) {
                    return (a === null || a === undefined);
                };

                Checks.isString = function (a) {
                    if (Checks.isNt(a))
                        return false;
                    var rx = /string/i;
                    return (typeof (a) === 'string') ? true : (typeof (a) === 'object') ? rx.test(a.constructor.toString()) : false;
                };

                Checks.isBoolean = function (a) {
                    if (Checks.isNt(a))
                        return false;
                    var rx = /boolean/i;
                    return (typeof (a) === 'boolean') ? true : (typeof (a) === 'object') ? rx.test(a.constructor.toString()) : false;
                };
                Checks.isDate = function (a) {
                    if (Checks.isNt(a))
                        return false;
                    var rx = /date/i;
                    return (typeof (a) === 'date') ? true : (typeof (a) === 'object') ? rx.test(a.constructor.toString()) : false;
                };
                Checks.isHTML = function (a) {
                    if (Checks.isNt(a))
                        return false;
                    var rx = /html/i;
                    return (typeof (a) === 'object') ? rx.test(a.constructor.toString()) : false;
                };
                Checks.isNumber = function (a) {
                    if (Checks.isNt(a))
                        return false;
                    var rx = /Number/;
                    return (typeof (a) === 'number') ? true : (typeof (a) === 'object') ? rx.test(a.constructor.toString()) : false;
                };
                Checks.isObject = function (a) {
                    if (Checks.isNt(a))
                        return false;
                    var rx = /object/i;
                    return (typeof (a) === 'object') ? rx.test(a.constructor.toString()) : false;
                };
                Checks.isSimpleObject = function (a) {
                    if (Checks.isNt(a))
                        return false;
                    var res = Checks.isObject(a);
                    return res && (Object.prototype === Object.getPrototypeOf(a));
                };
                Checks.isRegExp = function (a) {
                    if (Checks.isNt(a))
                        return false;
                    var rx = /regexp/i;
                    return (typeof (a) === 'function') ? rx.test(a.constructor.toString()) : false;
                };
                Checks.isNumeric = function (obj) {
                    return Checks.isNumber(obj) || (Checks.isString(obj) && !isNaN(Number(obj)));
                };
                Checks.isBoolString = function (a) {
                    if (Checks.isNt(a))
                        return false;
                    return (a == 'true' || a == 'false');
                };
                Checks.isProtoOf = function (objConstructor, obj) {
                    return !!obj && obj instanceof objConstructor;
                };
                Checks.isBaseObj = function (obj) {
                    return !!obj && obj instanceof RIAPP.BaseObject;
                };
                Checks.isBinding = function (obj) {
                    return !!obj && obj instanceof RIAPP.MOD.binding.Binding;
                };
                Checks.isElView = function (obj) {
                    return !!obj && obj instanceof RIAPP.MOD.baseElView.BaseElView;
                };
                Checks.isTemplateElView = function (obj) {
                    return !!obj && obj instanceof RIAPP.MOD.baseElView.TemplateElView;
                };
                Checks.isEditable = function (obj) {
                    return !!obj && !!obj.beginEdit && !!obj.endEdit && !!obj.cancelEdit && RIAPP.global.utils.hasProp(obj, 'isEditing');
                };
                Checks.isDataForm = function (el) {
                    if (!el)
                        return false;
                    if (el.hasAttribute(RIAPP.global.consts.DATA_ATTR.DATA_FORM))
                        return true;
                    var attr = el.getAttribute(RIAPP.global.consts.DATA_ATTR.DATA_VIEW);
                    if (!attr) {
                        return false;
                    }
                    var opts = RIAPP.global.parser.parseOptions(attr);
                    return (opts.length > 0 && opts[0].name === RIAPP.global.consts.ELVIEW_NM.DATAFORM);
                };

                Checks.isInsideDataForm = function (el) {
                    if (!el)
                        return false;
                    var parent = el.parentElement;
                    if (!!parent) {
                        if (!Checks.isDataForm(parent)) {
                            return Checks.isInsideDataForm(parent);
                        } else
                            return true;
                    }
                    return false;
                };
                Checks.isFunction = base_utils.isFunc;

                Checks.isArray = base_utils.isArray;
                return Checks;
            })();
            utils.Checks = Checks;

            var StringUtils = (function () {
                function StringUtils() {
                }
                StringUtils.formatNumber = function (num, decimals, dec_point, thousands_sep) {
                    num = (num + '').replace(/[^0-9+-Ee.]/g, '');
                    var n = !isFinite(+num) ? 0 : +num, prec = !isFinite(+decimals) ? 0 : Math.abs(decimals), sep = (thousands_sep === undefined) ? ',' : thousands_sep, dec = (dec_point === undefined) ? '.' : dec_point, s = [''], toFixedFix = function (n, prec) {
                        var k = Math.pow(10, prec);
                        return '' + Math.round(n * k) / k;
                    };

                    if (Checks.isNt(decimals)) {
                        s = ('' + n).split('.');
                        prec = 2;
                    } else
                        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');

                    var i, s0 = '', len = s[0].length;
                    if (len > 3) {
                        for (i = 0; i < len; i += 1) {
                            s0 = s0 + s[0].charAt(i);
                            if (i < (len - 1) && (len - i - 1) % 3 === 0)
                                s0 = s0 + sep;
                        }
                        s[0] = s0;
                    }
                    if ((s[1] || '').length < prec) {
                        s[1] = s[1] || '';
                        s[1] += new Array(prec - s[1].length + 1).join('0');
                    }
                    return s.join(dec);
                };
                StringUtils.stripNonNumeric = function (str) {
                    str += '';
                    var rgx = /^\d|\.|-$/;
                    var out = '';
                    for (var i = 0; i < str.length; i++) {
                        if (rgx.test(str.charAt(i))) {
                            if (!((str.charAt(i) == '.' && out.indexOf('.') != -1) || (str.charAt(i) == '-' && out.length != 0))) {
                                out += str.charAt(i);
                            }
                        }
                    }
                    return out;
                };
                StringUtils.endsWith = base_utils.endsWith;
                StringUtils.startsWith = base_utils.startsWith;
                StringUtils.trim = base_utils.trim;
                return StringUtils;
            })();
            utils.StringUtils = StringUtils;
            ;

            var Validations = (function () {
                function Validations() {
                }
                Validations.checkNumRange = function (num, range) {
                    var rangeParts = range.split(',');
                    if (!!rangeParts[0]) {
                        if (num < parseFloat(rangeParts[0])) {
                            throw new Error(base_utils.format(RIAPP.ERRS.ERR_FIELD_RANGE, num, range));
                        }
                    }
                    if (!!rangeParts[1]) {
                        if (num > parseFloat(rangeParts[1])) {
                            throw new Error(base_utils.format(RIAPP.ERRS.ERR_FIELD_RANGE, num, range));
                        }
                    }
                };
                Validations._dtRangeToDate = function (str) {
                    var dtParts = str.split('-');
                    var dt = new Date(parseInt(dtParts[0], 10), parseInt(dtParts[1], 10) - 1, parseInt(dtParts[2], 10));
                    return dt;
                };
                Validations.checkDateRange = function (dt, range) {
                    var rangeParts = range.split(',');
                    if (!!rangeParts[0]) {
                        if (dt < Validations._dtRangeToDate(rangeParts[0])) {
                            throw new Error(base_utils.format(RIAPP.ERRS.ERR_FIELD_RANGE, dt, range));
                        }
                    }
                    if (!!rangeParts[1]) {
                        if (dt > Validations._dtRangeToDate(rangeParts[1])) {
                            throw new Error(base_utils.format(RIAPP.ERRS.ERR_FIELD_RANGE, dt, range));
                        }
                    }
                };
                return Validations;
            })();
            utils.Validations = Validations;
            ;

            utils.valueUtils = {
                valueToDate: function (val, dtcnv, stz) {
                    if (!val)
                        return null;
                    val = '' + val;
                    var parts = val.split("&");
                    if (parts.length != 7) {
                        throw new Error(base_utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'val', val));
                    }
                    var dt = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10), parseInt(parts[3], 10), parseInt(parts[4], 10), parseInt(parts[5], 10), (!!parts[6]) ? parseInt(parts[6], 10) : 0);
                    var DATE_CONVERSION = MOD.consts.DATE_CONVERSION;
                    var ctz = RIAPP.global.utils.get_timeZoneOffset();

                    switch (dtcnv) {
                        case DATE_CONVERSION.None:
                            break;
                        case DATE_CONVERSION.ServerLocalToClientLocal:
                            dt.setMinutes(dt.getMinutes() + stz);
                            dt.setMinutes(dt.getMinutes() - ctz);
                            break;
                        case DATE_CONVERSION.UtcToClientLocal:
                            dt.setMinutes(dt.getMinutes() - ctz);
                            break;
                        default:
                            throw new Error(base_utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'dtcnv', dtcnv));
                    }
                    return dt;
                },
                dateToValue: function (dt, dtcnv, serverTZ) {
                    if (dt === null)
                        return null;
                    if (!Checks.isDate(dt))
                        throw new Error(base_utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'dt', dt));
                    var DATE_CONVERSION = MOD.consts.DATE_CONVERSION;
                    var ctz = RIAPP.global.utils.get_timeZoneOffset();
                    switch (dtcnv) {
                        case DATE_CONVERSION.None:
                            break;
                        case DATE_CONVERSION.ServerLocalToClientLocal:
                            dt.setMinutes(dt.getMinutes() + ctz);
                            dt.setMinutes(dt.getMinutes() - serverTZ);
                            break;
                        case DATE_CONVERSION.UtcToClientLocal:
                            dt.setMinutes(dt.getMinutes() + ctz);
                            break;
                        default:
                            throw new Error(base_utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'dtcnv', dtcnv));
                    }
                    return ("" + dt.getFullYear() + "&" + (dt.getMonth() + 1) + "&" + dt.getDate() + "&" + dt.getHours() + "&" + dt.getMinutes() + "&" + dt.getSeconds() + "&" + dt.getMilliseconds());
                },
                compareVals: function (v1, v2, dataType) {
                    if ((v1 === null && v2 !== null) || (v1 !== null && v2 === null))
                        return false;
                    var DATA_TYPE = MOD.consts.DATA_TYPE;
                    switch (dataType) {
                        case DATA_TYPE.DateTime:
                        case DATA_TYPE.Date:
                        case DATA_TYPE.Time:
                            if (Checks.isDate(v1) && Checks.isDate(v2))
                                return v1.getTime() === v2.getTime(); else
                                return false;
                        default:
                            return v1 === v2;
                    }
                },
                stringifyValue: function (v, dcnv, stz) {
                    if (Checks.isNt(v))
                        return null;
                    if (Checks.isDate(v))
                        return utils.valueUtils.dateToValue(v, dcnv, stz); else if (Checks.isArray(v))
                        return JSON.stringify(v); else if (Checks.isString(v))
                        return v; else
                        return JSON.stringify(v);
                },
                parseValue: function (v, dataType, dcnv, stz) {
                    var res = null;

                    if (v === undefined || v === null)
                        return res;
                    var DATA_TYPE = MOD.consts.DATA_TYPE;
                    switch (dataType) {
                        case DATA_TYPE.None:
                            res = v;
                            break;
                        case DATA_TYPE.String:
                        case DATA_TYPE.Guid:
                            res = v;
                            break;
                        case DATA_TYPE.Bool:
                            res = RIAPP.global.utils.parseBool(v);
                            break;
                        case DATA_TYPE.Integer:
                            res = parseInt(v, 10);
                            break;
                        case DATA_TYPE.Decimal:
                        case DATA_TYPE.Float:
                            res = parseFloat(v);
                            break;
                        case DATA_TYPE.DateTime:
                        case DATA_TYPE.Date:
                        case DATA_TYPE.Time:
                            res = utils.valueUtils.valueToDate(v, dcnv, stz);
                            break;
                        case DATA_TYPE.Binary:
                            res = JSON.parse(v);
                            break;
                        default:
                            throw new Error(base_utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'dataType', dataType));
                    }
                    return res;
                }
            };

            var LifeTimeScope = (function (_super) {
                __extends(LifeTimeScope, _super);
                function LifeTimeScope() {
                    _super.call(this);
                    this._objs = [];
                }
                LifeTimeScope.create = function () {
                    return new LifeTimeScope();
                };
                LifeTimeScope.prototype.addObj = function (b) {
                    if (this._objs.indexOf(b) < 0)
                        this._objs.push(b);
                };
                LifeTimeScope.prototype.removeObj = function (b) {
                    RIAPP.global.utils.removeFromArray(this._objs, b);
                };
                LifeTimeScope.prototype.getObjs = function () {
                    return this._objs;
                };
                LifeTimeScope.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._objs.forEach(function (obj) {
                        if (!obj._isDestroyCalled)
                            obj.destroy();
                    });
                    this._objs = [];
                    _super.prototype.destroy.call(this);
                };
                LifeTimeScope.prototype.toString = function () {
                    return 'LifeTimeScope';
                };
                return LifeTimeScope;
            })(RIAPP.BaseObject);
            utils.LifeTimeScope = LifeTimeScope;
            ;

            var PropWatcher = (function (_super) {
                __extends(PropWatcher, _super);
                function PropWatcher() {
                    _super.call(this);
                    this._objId = 'prw' + RIAPP.global.utils.getNewID();
                    this._objs = [];
                }
                PropWatcher.create = function () {
                    return new PropWatcher();
                };
                PropWatcher.prototype.addPropWatch = function (obj, prop, fn_onChange) {
                    var self = this;
                    obj.addOnPropertyChange(prop, function (s, a) {
                        fn_onChange(a.property);
                    }, self.uniqueID);

                    if (self._objs.indexOf(obj) < 0)
                        self._objs.push(obj);
                };
                PropWatcher.prototype.addWatch = function (obj, props, fn_onChange) {
                    var self = this;
                    obj.addOnPropertyChange('*', function (s, a) {
                        if (props.indexOf(a.property) > -1) {
                            fn_onChange(a.property);
                        }
                    }, self.uniqueID);

                    if (self._objs.indexOf(obj) < 0)
                        self._objs.push(obj);
                };
                PropWatcher.prototype.removeWatch = function (obj) {
                    obj.removeNSHandlers(this.uniqueID);
                };
                PropWatcher.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    var self = this;
                    this._objs.forEach(function (obj) {
                        self.removeWatch(obj);
                    });
                    this._objs = [];
                    _super.prototype.destroy.call(this);
                };
                PropWatcher.prototype.toString = function () {
                    return 'PropWatcher ' + this._objId;
                };
                Object.defineProperty(PropWatcher.prototype, "uniqueID", {
                    get: function () {
                        return this._objId;
                    },
                    enumerable: true,
                    configurable: true
                });
                return PropWatcher;
            })(RIAPP.BaseObject);
            utils.PropWatcher = PropWatcher;
            ;

            var WaitQueue = (function (_super) {
                __extends(WaitQueue, _super);
                function WaitQueue(owner) {
                    _super.call(this);
                    this._objId = 'wq' + RIAPP.global.utils.getNewID();
                    this._owner = owner;
                    this._queue = {};
                }
                WaitQueue.create = function (owner) {
                    return new WaitQueue(owner);
                };
                WaitQueue.prototype._checkQueue = function (prop, value) {
                    if (!this._owner || this._owner._isDestroyCalled) {
                        return;
                    }
                    var self = this, propQueue = this._queue[prop], task;
                    if (!propQueue || propQueue.length == 0) {
                        return;
                    }

                    var i, firstWins, groups = { group: null, arr: [] }, found = [], forRemoval = [];

                    for (i = 0; i < propQueue.length; i += 1) {
                        task = propQueue[i];
                        if (task.predicate(value)) {
                            if (!task.group && groups.arr.length == 0) {
                                firstWins = task;
                                break;
                            } else if (!!task.group) {
                                if (!groups.group) {
                                    groups.group = task.group;
                                }
                                if (groups.group === task.group) {
                                    groups.arr.push(task);
                                }
                            }
                        }
                    }

                    if (!!firstWins) {
                        found.push(firstWins);
                        forRemoval.push(firstWins);
                    } else {
                        while (groups.arr.length > 0) {
                            task = groups.arr.pop();
                            if (!firstWins) {
                                firstWins = task;
                            }

                            if (firstWins.lastWins) {
                                if (found.length == 0)
                                    found.push(task);
                            } else
                                found.push(task);
                            forRemoval.push(task);
                        }
                    }

                    try  {
                        if (found.length > 0) {
                            i = propQueue.length;
                            while (i > 0) {
                                i -= 1;
                                if (forRemoval.indexOf(propQueue[i]) > -1) {
                                    propQueue.splice(i, 1);
                                }
                            }

                            found.forEach(function (task) {
                                try  {
                                    task.action.apply(self._owner, task.args);
                                } catch (ex) {
                                    self._owner._onError(ex, self);
                                }
                            });
                        }
                    } finally {
                        if (propQueue.length == 0) {
                            delete this._queue[prop];
                            this._owner.removeOnPropertyChange(prop, this.uniqueID);
                        }
                    }
                };
                WaitQueue.prototype.enQueue = function (options) {
                    var opts = RIAPP.global.utils.extend(false, {
                        prop: "",
                        groupName: null,
                        predicate: null,
                        action: null,
                        actionArgs: [],
                        lastWins: false,
                        syncCheck: false
                    }, options);
                    var self = this;
                    if (!this._owner)
                        return;
                    var property = opts.prop, propQueue = this._queue[property];

                    if (!propQueue) {
                        propQueue = [];
                        this._queue[property] = propQueue;
                        this._owner.addOnPropertyChange(property, function (s, a) {
                            setTimeout(function () {
                                if (self._isDestroyCalled)
                                    return;
                                self._checkQueue(property, self._owner[property]);
                            }, 0);
                        }, self.uniqueID);
                    }
                    var task = {
                        predicate: opts.predicate,
                        action: opts.action,
                        group: opts.groupName,
                        lastWins: opts.lastWins,
                        args: (!opts.actionArgs ? [] : opts.actionArgs)
                    };
                    propQueue.push(task);
                    if (!!opts.syncCheck) {
                        self._checkQueue(property, self._owner[property]);
                    } else {
                        setTimeout(function () {
                            if (self._isDestroyCalled)
                                return;
                            self._checkQueue(property, self._owner[property]);
                        }, 0);
                    }
                };
                WaitQueue.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._owner.removeOnPropertyChange(null, this.uniqueID);
                    this._queue = {};
                    this._owner = null;
                    _super.prototype.destroy.call(this);
                };
                WaitQueue.prototype.toString = function () {
                    return 'WaitQueue ' + this._objId;
                };
                Object.defineProperty(WaitQueue.prototype, "uniqueID", {
                    get: function () {
                        return this._objId;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WaitQueue.prototype, "owner", {
                    get: function () {
                        return this._owner;
                    },
                    enumerable: true,
                    configurable: true
                });
                return WaitQueue;
            })(RIAPP.BaseObject);
            utils.WaitQueue = WaitQueue;
            ;

            var Utils = (function () {
                function Utils() {
                    this.slice = Array.prototype.slice;
                    this.get_timeZoneOffset = (function () {
                        var dt = new Date();
                        var tz = dt.getTimezoneOffset();

                        return function () {
                            return tz;
                        };
                    })();
                    this.format = base_utils.format;
                    this.uuid = (function () {
                        var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

                        return function (len, radix) {
                            var i, chars = CHARS, uuid = [], rnd = Math.random;
                            radix = radix || chars.length;

                            if (!!len) {
                                for (i = 0; i < len; i += 1)
                                    uuid[i] = chars[0 | rnd() * radix];
                            } else {
                                var r;

                                uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
                                uuid[14] = '4';

                                for (i = 0; i < 36; i += 1) {
                                    if (!uuid[i]) {
                                        r = 0 | rnd() * 16;
                                        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r & 0xf];
                                    }
                                }
                            }

                            return uuid.join('');
                        };
                    })();
                }
                Utils.create = function () {
                    return new Utils();
                };
                Object.defineProperty(Utils.prototype, "check", {
                    get: function () {
                        return Checks;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Utils.prototype, "str", {
                    get: function () {
                        return StringUtils;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Utils.prototype, "validation", {
                    get: function () {
                        return Validations;
                    },
                    enumerable: true,
                    configurable: true
                });
                Utils.prototype.getNewID = function () {
                    var id = _newID;
                    _newID += 1;
                    return id;
                };
                Utils.prototype.isContained = function (oNode, oCont) {
                    if (!oNode)
                        return false;
                    while (!!(oNode = oNode.parentNode))
                        if (oNode === oCont)
                            return true;
                    return false;
                };

                Utils.prototype.parseBool = function (bool_value) {
                    if (Checks.isBoolean(bool_value))
                        return bool_value;
                    var v = base_utils.trim(bool_value).toLowerCase();
                    if (v === 'false')
                        return false;
                    if (v === 'true')
                        return true;
                    throw new Error(this.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'bool_value', bool_value));
                };
                Utils.prototype.round = function (num, decimals) {
                    return parseFloat(num.toFixed(decimals));
                };
                Utils.prototype.performAjaxCall = function (url, postData, async, fn_success, fn_error, context) {
                    var req = new XMLHttpRequest(), mimeType = 'application/json; charset=utf-8';
                    req.open('POST', url, async);
                    var deferred = this.createDeferred();
                    req.responseType = 'text';
                    req.onload = function (e) {
                        if (this.status == 200) {
                            var res = this.response;
                            deferred.resolve(res);
                        }
                    };
                    req.onerror = function (e) {
                        deferred.reject(new Error(e.target.status));
                    };
                    req.ontimeout = function () {
                        deferred.reject(new Error("The request for " + url + " timed out."));
                    };
                    req.timeout = RIAPP.global.defaults.ajaxTimeOut * 1000;
                    req.setRequestHeader('Content-Type', mimeType);
                    req.send(postData);
                    var promise = deferred.promise();

                    if (!!fn_success) {
                        promise.done(function (data) {
                            fn_success.call(context, data);
                        });
                    }

                    if (!!fn_error) {
                        promise.fail(function (err) {
                            fn_error.call(context, err);
                        });
                    }
                    return promise;
                };
                Utils.prototype.performAjaxGet = function (url) {
                    var req = new XMLHttpRequest();
                    req.open('GET', url, true);
                    var deferred = this.createDeferred();
                    req.responseType = 'text';
                    req.onload = function (e) {
                        if (this.status == 200) {
                            var res = this.response;
                            deferred.resolve(res);
                        }
                    };
                    req.onerror = function (e) {
                        deferred.reject(new Error(e.target.status));
                    };
                    req.ontimeout = function () {
                        deferred.reject(new Error("The request for " + url + " timed out."));
                    };
                    req.timeout = RIAPP.global.defaults.ajaxTimeOut * 1000;
                    req.send(null);
                    var promise = deferred.promise();
                    return promise;
                };

                Utils.prototype.extend = function (deep, defaults, options) {
                    if (deep)
                        return this.cloneObj(options, defaults); else
                        return this.mergeObj(options, defaults);
                };
                Utils.prototype.removeNode = function (node) {
                    if (!node)
                        return;
                    var pnd = node.parentNode;
                    if (!!pnd)
                        pnd.removeChild(node);
                };
                Utils.prototype.insertAfter = function (referenceNode, newNode) {
                    var parent = referenceNode.parentNode;
                    if (parent.lastChild === referenceNode)
                        parent.appendChild(newNode); else
                        parent.insertBefore(newNode, referenceNode.nextSibling);
                };
                Utils.prototype.getProps = function (obj) {
                    return Object.getOwnPropertyNames(obj);
                };
                Utils.prototype.forEachProp = function (obj, fn) {
                    var names = Object.getOwnPropertyNames(obj);
                    names.forEach(fn);
                };
                Utils.prototype.addToolTip = function ($el, tip, className) {
                    var options = {
                        content: {
                            text: tip
                        },
                        style: {
                            classes: !!className ? className : null
                        },
                        position: {
                            my: 'top left',
                            at: 'bottom right',
                            target: $el,
                            viewport: RIAPP.global.$(RIAPP.global.window),
                            adjust: {
                                method: 'flip none',
                                x: 0,
                                y: 0
                            }
                        },
                        hide: {
                            fixed: true,
                            delay: 250
                        }
                    };
                    if (!!$el.data('qtip')) {
                        if (!tip) {
                            $el['qtip']('destroy');
                        } else
                            $el['qtip']('option', 'content.text', tip);
                    } else if (!!tip) {
                        $el['qtip'](options);
                    }
                };
                Utils.prototype.hasProp = function (obj, prop) {
                    if (!obj)
                        return false;
                    var res = obj.hasOwnProperty(prop);
                    if (res)
                        return true; else {
                        if (Object === obj)
                            return false; else {
                            var pr = Object.getPrototypeOf(obj);
                            return this.hasProp(pr, prop);
                        }
                    }
                };
                Utils.prototype.createDeferred = function () {
                    return RIAPP.global.$.Deferred();
                };
                Utils.prototype.cloneObj = function (o, mergeIntoObj) {
                    var c, i, len, self = this;
                    if (!o) {
                        return o;
                    }

                    if (self.check.isArray(o)) {
                        len = o.length;
                        c = new Array(len);
                        for (i = 0; i < len; i += 1) {
                            c[i] = self.cloneObj(o[i], null);
                        }
                    } else if (self.check.isSimpleObject(o)) {
                        c = mergeIntoObj || {};
                        var p, keys = Object.getOwnPropertyNames(o);
                        len = keys.length;
                        for (i = 0; i < len; i += 1) {
                            p = keys[i];
                            c[p] = self.cloneObj(o[p], null);
                        }
                    } else
                        return o;
                    return c;
                };
                Utils.prototype.shallowCopy = function (o) {
                    return this.mergeObj(o, {});
                };
                Utils.prototype.mergeObj = function (obj, mergeIntoObj) {
                    if (!mergeIntoObj) {
                        mergeIntoObj = {};
                    }
                    if (!obj)
                        return mergeIntoObj;
                    var names = Object.getOwnPropertyNames(obj), n;
                    for (var i = 0, len = names.length; i < len; i += 1) {
                        n = names[i];
                        mergeIntoObj[n] = obj[n];
                    }
                    return mergeIntoObj;
                };
                Utils.prototype.removeFromArray = function (array, obj) {
                    var i = array.indexOf(obj);
                    if (i > -1) {
                        array.splice(i, 1);
                    }
                    return i;
                };
                Utils.prototype.insertIntoArray = function (array, obj, pos) {
                    array.splice(pos, 0, obj);
                };
                Utils.prototype.destroyJQueryPlugin = function ($el, name) {
                    var plugin = $el.data(name);
                    if (!!plugin) {
                        $el[name]('destroy');
                    }
                };
                return Utils;
            })();
            utils.Utils = Utils;
            ;

            RIAPP.global.registerType('PropWatcher', PropWatcher);
            RIAPP.global.registerType('LifeTimeScope', LifeTimeScope);
            RIAPP.global.registerType('WaitQueue', WaitQueue);
            RIAPP.global.onModuleLoaded('utils', utils);
        })(MOD.utils || (MOD.utils = {}));
        var utils = MOD.utils;
    })(RIAPP.MOD || (RIAPP.MOD = {}));
    var MOD = RIAPP.MOD;
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    (function (MOD) {
        (function (errors) {
            var BaseError = (function (_super) {
                __extends(BaseError, _super);
                function BaseError(message) {
                    _super.call(this);
                    this._message = message;
                    this._isDummy = false;
                    this._origError = null;
                }
                BaseError.create = function (message) {
                    return new BaseError(message);
                };
                BaseError.prototype.toString = function () {
                    return this._message;
                };
                Object.defineProperty(BaseError.prototype, "message", {
                    get: function () {
                        return this._message;
                    },
                    set: function (v) {
                        this._message = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseError.prototype, "isDummy", {
                    get: function () {
                        return this._isDummy;
                    },
                    set: function (v) {
                        this._isDummy = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseError.prototype, "origError", {
                    get: function () {
                        return this._origError;
                    },
                    set: function (v) {
                        this._origError = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                return BaseError;
            })(RIAPP.BaseObject);
            errors.BaseError = BaseError;
            ;

            var DummyError = (function (_super) {
                __extends(DummyError, _super);
                function DummyError(ex) {
                    _super.call(this, "DUMMY_ERROR");
                    this._origError = ex;
                    this._isDummy = true;
                }
                DummyError.create = function (ex) {
                    return new DummyError(ex);
                };
                return DummyError;
            })(BaseError);
            errors.DummyError = DummyError;
            ;

            RIAPP.global.onModuleLoaded('errors', errors);
        })(MOD.errors || (MOD.errors = {}));
        var errors = MOD.errors;
    })(RIAPP.MOD || (RIAPP.MOD = {}));
    var MOD = RIAPP.MOD;
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    (function (MOD) {
        (function (converter) {
            var utils = RIAPP.global.utils, consts = RIAPP.global.consts;
            converter.NUM_CONV = { None: 0, Integer: 1, Decimal: 2, Float: 3, SmallInt: 4 };

            var BaseConverter = (function () {
                function BaseConverter() {
                }
                BaseConverter.prototype.convertToSource = function (val, param, dataContext) {
                    return val;
                };
                BaseConverter.prototype.convertToTarget = function (val, param, dataContext) {
                    if (utils.check.isNt(val))
                        return null;
                    return val;
                };
                return BaseConverter;
            })();
            converter.BaseConverter = BaseConverter;
            ;
            var baseConverter = new BaseConverter();

            var DateConverter = (function () {
                function DateConverter() {
                }
                DateConverter.prototype.convertToSource = function (val, param, dataContext) {
                    if (!val)
                        return null;
                    var $ = RIAPP.global.$;
                    return $.datepicker.parseDate(param, val);
                };
                DateConverter.prototype.convertToTarget = function (val, param, dataContext) {
                    if (utils.check.isNt(val))
                        return '';
                    var $ = RIAPP.global.$;
                    return $.datepicker.formatDate(param, val);
                };
                DateConverter.prototype.toString = function () {
                    return 'DateConverter';
                };
                return DateConverter;
            })();
            converter.DateConverter = DateConverter;
            ;
            var dateConverter = new DateConverter();

            var DateTimeConverter = (function () {
                function DateTimeConverter() {
                }
                DateTimeConverter.prototype.convertToSource = function (val, param, dataContext) {
                    if (!val)
                        return null;
                    var DT = Date, res = DT.parseExact(val, param);
                    if (!res) {
                        throw new Error(utils.format(RIAPP.ERRS.ERR_CONV_INVALID_DATE, val));
                    }
                    return res;
                };
                DateTimeConverter.prototype.convertToTarget = function (val, param, dataContext) {
                    if (utils.check.isNt(val)) {
                        return '';
                    }
                    return val.toString(param);
                };
                DateTimeConverter.prototype.toString = function () {
                    return 'DateTimeConverter';
                };
                return DateTimeConverter;
            })();
            converter.DateTimeConverter = DateTimeConverter;
            ;
            var dateTimeConverter = new DateTimeConverter();

            var NumberConverter = (function () {
                function NumberConverter() {
                }
                NumberConverter.prototype.convertToSource = function (val, param, dataContext) {
                    if (utils.check.isNt(val))
                        return null;
                    var defaults = RIAPP.global.defaults, dp = defaults.decimalPoint, thousand_sep = defaults.thousandSep, prec = 4;
                    var value = val.replace(thousand_sep, '');
                    value = value.replace(dp, '.');
                    value = utils.str.stripNonNumeric(value);
                    if (value === '') {
                        return null;
                    }
                    var num = null;
                    switch (param) {
                        case converter.NUM_CONV.SmallInt:
                            num = parseInt(value, 10);
                            break;
                        case converter.NUM_CONV.Integer:
                            num = parseInt(value, 10);
                            break;
                        case converter.NUM_CONV.Decimal:
                            prec = defaults.decPrecision;
                            num = utils.round(parseFloat(value), prec);
                            break;
                        case converter.NUM_CONV.Float:
                            num = parseFloat(value);
                            break;
                        default:
                            num = Number(value);
                    }

                    if (!utils.check.isNumber(num)) {
                        throw new Error(utils.format(RIAPP.ERRS.ERR_CONV_INVALID_NUM, val));
                    }
                    return num;
                };
                NumberConverter.prototype.convertToTarget = function (val, param, dataContext) {
                    if (utils.check.isNt(val)) {
                        return '';
                    }
                    var defaults = RIAPP.global.defaults, dp = defaults.decimalPoint, thousand_sep = defaults.thousandSep, prec;
                    switch (param) {
                        case converter.NUM_CONV.Integer:
                            prec = 0;
                            return utils.str.formatNumber(val, prec, dp, thousand_sep);
                        case converter.NUM_CONV.Decimal:
                            prec = defaults.decPrecision;
                            return utils.str.formatNumber(val, prec, dp, thousand_sep);
                        case converter.NUM_CONV.SmallInt:
                            prec = 0;
                            return utils.str.formatNumber(val, prec, dp, '');
                        case converter.NUM_CONV.Float:
                            return utils.str.formatNumber(val, null, dp, thousand_sep);
                            break;
                        default:
                            return utils.str.formatNumber(val, null, dp, thousand_sep);
                    }
                };
                NumberConverter.prototype.toString = function () {
                    return 'NumberConverter';
                };
                return NumberConverter;
            })();
            converter.NumberConverter = NumberConverter;
            ;
            var numberConverter = new NumberConverter();

            var IntegerConverter = (function () {
                function IntegerConverter() {
                }
                IntegerConverter.prototype.convertToSource = function (val, param, dataContext) {
                    return numberConverter.convertToSource(val, converter.NUM_CONV.Integer, dataContext);
                };
                IntegerConverter.prototype.convertToTarget = function (val, param, dataContext) {
                    return numberConverter.convertToTarget(val, converter.NUM_CONV.Integer, dataContext);
                };
                IntegerConverter.prototype.toString = function () {
                    return 'IntegerConverter';
                };
                return IntegerConverter;
            })();
            converter.IntegerConverter = IntegerConverter;
            ;
            var integerConverter = new IntegerConverter();

            var SmallIntConverter = (function () {
                function SmallIntConverter() {
                }
                SmallIntConverter.prototype.convertToSource = function (val, param, dataContext) {
                    return numberConverter.convertToSource(val, converter.NUM_CONV.SmallInt, dataContext);
                };
                SmallIntConverter.prototype.convertToTarget = function (val, param, dataContext) {
                    return numberConverter.convertToTarget(val, converter.NUM_CONV.SmallInt, dataContext);
                };
                SmallIntConverter.prototype.toString = function () {
                    return 'SmallIntConverter';
                };
                return SmallIntConverter;
            })();
            converter.SmallIntConverter = SmallIntConverter;
            ;
            var smallIntConverter = new SmallIntConverter();

            var DecimalConverter = (function () {
                function DecimalConverter() {
                }
                DecimalConverter.prototype.convertToSource = function (val, param, dataContext) {
                    return numberConverter.convertToSource(val, converter.NUM_CONV.Decimal, dataContext);
                };
                DecimalConverter.prototype.convertToTarget = function (val, param, dataContext) {
                    return numberConverter.convertToTarget(val, converter.NUM_CONV.Decimal, dataContext);
                };
                DecimalConverter.prototype.toString = function () {
                    return 'DecimalConverter';
                };
                return DecimalConverter;
            })();
            converter.DecimalConverter = DecimalConverter;
            ;
            var decimalConverter = new DecimalConverter();

            var FloatConverter = (function () {
                function FloatConverter() {
                }
                FloatConverter.prototype.convertToSource = function (val, param, dataContext) {
                    return numberConverter.convertToSource(val, converter.NUM_CONV.Float, dataContext);
                };
                FloatConverter.prototype.convertToTarget = function (val, param, dataContext) {
                    return numberConverter.convertToTarget(val, converter.NUM_CONV.Float, dataContext);
                };
                FloatConverter.prototype.toString = function () {
                    return 'FloatConverter';
                };
                return FloatConverter;
            })();
            converter.FloatConverter = FloatConverter;
            ;
            var floatConverter = new FloatConverter();

            RIAPP.global.registerConverter('BaseConverter', baseConverter);
            RIAPP.global.registerConverter('dateConverter', dateConverter);
            RIAPP.global.registerConverter('dateTimeConverter', dateTimeConverter);
            RIAPP.global.registerConverter('numberConverter', numberConverter);
            RIAPP.global.registerConverter('integerConverter', integerConverter);
            RIAPP.global.registerConverter('smallIntConverter', smallIntConverter);
            RIAPP.global.registerConverter('decimalConverter', decimalConverter);
            RIAPP.global.registerConverter('floatConverter', floatConverter);
            RIAPP.global.onModuleLoaded('converter', converter);
        })(MOD.converter || (MOD.converter = {}));
        var converter = MOD.converter;
    })(RIAPP.MOD || (RIAPP.MOD = {}));
    var MOD = RIAPP.MOD;
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    (function (MOD) {
        (function (defaults) {
            var Defaults = (function (_super) {
                __extends(Defaults, _super);
                function Defaults() {
                    _super.call(this);
                    this._imagesPath = '';
                    this._datepickerRegional = '';
                    var $ = RIAPP.global.$;
                    if (!$.datepicker) {
                        throw new Error(RIAPP.ERRS.ERR_JQUERY_DATEPICKER_NOTFOUND);
                    }
                    this._datepickerDefaults = $.datepicker.regional[this._datepickerRegional];
                    this._dateTimeFormat = 'dd.MM.yyyy HH:mm:ss';
                    this._timeFormat = 'HH:mm:ss';
                    this._decimalPoint = ',';
                    this._thousandSep = ' ';
                    this._decPrecision = 2;
                    this._ajaxTimeOut = 600;
                }
                Defaults.create = function () {
                    return new Defaults();
                };
                Defaults.prototype._setDatePickerRegion = function (v) {
                    var regional, $ = RIAPP.global.$;
                    if (!!v) {
                        regional = $.datepicker.regional[v];
                    } else {
                        regional = $.datepicker.regional[""];
                    }
                    this.datepickerDefaults = regional;
                };
                Defaults.prototype.toString = function () {
                    return 'Defaults';
                };

                Object.defineProperty(Defaults.prototype, "ajaxTimeOut", {
                    get: function () {
                        return this._ajaxTimeOut;
                    },
                    set: function (v) {
                        if (this._ajaxTimeOut !== v) {
                            this._ajaxTimeOut = v;
                            this.raisePropertyChanged('ajaxTimeOut');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Defaults.prototype, "dateFormat", {
                    get: function () {
                        return this._datepickerDefaults.dateFormat;
                    },
                    set: function (v) {
                        var $ = RIAPP.global.$;
                        if (this._datepickerDefaults.dateFormat !== v) {
                            this._datepickerDefaults.dateFormat = v;
                            $.datepicker.setDefaults(this._datepickerDefaults);
                            this.raisePropertyChanged('dateFormat');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Defaults.prototype, "timeFormat", {
                    get: function () {
                        return this._timeFormat;
                    },
                    set: function (v) {
                        if (this._timeFormat !== v) {
                            this._timeFormat = v;
                            this.raisePropertyChanged('timeFormat');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Defaults.prototype, "dateTimeFormat", {
                    get: function () {
                        return this._dateTimeFormat;
                    },
                    set: function (v) {
                        if (this._dateTimeFormat !== v) {
                            this._dateTimeFormat = v;
                            this.raisePropertyChanged('timeFormat');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Defaults.prototype, "datepickerDefaults", {
                    get: function () {
                        return this._datepickerDefaults;
                    },
                    set: function (v) {
                        var $ = RIAPP.global.$;
                        if (!v)
                            v = $.datepicker.regional[this._datepickerRegional];
                        var old = this._datepickerDefaults;
                        this._datepickerDefaults = v;
                        $.datepicker.setDefaults(v);
                        if (old.dateFormat !== v.dateFormat) {
                            this.raisePropertyChanged('dateFormat');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Defaults.prototype, "datepickerRegional", {
                    get: function () {
                        return this._datepickerRegional;
                    },
                    set: function (v) {
                        if (!v)
                            v = "";
                        if (this._datepickerRegional !== v) {
                            this._datepickerRegional = v;
                            this._setDatePickerRegion(v);
                            this.raisePropertyChanged("datepickerRegional");
                        }
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Defaults.prototype, "imagesPath", {
                    get: function () {
                        return this._imagesPath;
                    },
                    set: function (v) {
                        if (!v)
                            v = "";
                        if (this._imagesPath !== v) {
                            if (!RIAPP.baseUtils.endsWith(v, '/')) {
                                this._imagesPath = v + '/';
                            } else
                                this._imagesPath = v;
                            this.raisePropertyChanged("imagesPath");
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Defaults.prototype, "decimalPoint", {
                    get: function () {
                        return this._decimalPoint;
                    },
                    set: function (v) {
                        if (this._decimalPoint !== v) {
                            this._decimalPoint = v;
                            this.raisePropertyChanged("decimalPoint");
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Defaults.prototype, "thousandSep", {
                    get: function () {
                        return this._thousandSep;
                    },
                    set: function (v) {
                        if (this._thousandSep !== v) {
                            this._thousandSep = v;
                            this.raisePropertyChanged("thousandSep");
                        }
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Defaults.prototype, "decPrecision", {
                    get: function () {
                        return this._decPrecision;
                    },
                    set: function (v) {
                        if (this._decPrecision !== v) {
                            this._decPrecision = v;
                            this.raisePropertyChanged("decPrecision");
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return Defaults;
            })(RIAPP.BaseObject);
            defaults.Defaults = Defaults;
            ;

            RIAPP.global.onModuleLoaded('defaults', defaults);
        })(MOD.defaults || (MOD.defaults = {}));
        var defaults = MOD.defaults;
    })(RIAPP.MOD || (RIAPP.MOD = {}));
    var MOD = RIAPP.MOD;
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    (function (MOD) {
        (function (parser) {
            var utils = RIAPP.global.utils, consts = RIAPP.global.consts;

            var Parser = (function () {
                function Parser() {
                }
                Parser.prototype._getPathParts = function (path) {
                    var self = this, parts = (!path) ? [] : path.split('.'), parts2 = [];
                    parts.forEach(function (part) {
                        var matches, obj, index;
                        matches = part.match(Parser.__indexedPropRX);
                        if (!!matches) {
                            obj = matches[1];
                            index = matches[2];
                            parts2.push(obj);
                            parts2.push('[' + index + ']');
                        } else
                            parts2.push(part);
                    });

                    return parts2;
                };
                Parser.prototype._resolveProp = function (obj, prop) {
                    var collMod;
                    if (!prop)
                        return obj;
                    if (utils.str.startsWith(prop, '[')) {
                        prop = this.trimQuotes(this.trimBrackets(prop));
                        if (obj instanceof RIAPP.MOD.collection.Dictionary) {
                            return obj.getItemByKey(prop);
                        } else if (obj instanceof RIAPP.MOD.collection.Collection) {
                            return obj.getItemByPos(parseInt(prop, 10));
                        } else if (utils.check.isArray(obj)) {
                            return obj[parseInt(prop, 10)];
                        } else
                            return obj[prop];
                    } else
                        return obj[prop];
                };
                Parser.prototype._resolvePath = function (root, parts) {
                    if (!root)
                        return undefined;

                    if (parts.length === 0) {
                        return root;
                    }

                    if (parts.length === 1) {
                        return this._resolveProp(root, parts[0]);
                    } else {
                        return this._resolvePath(this._resolveProp(root, parts[0]), parts.slice(1));
                    }
                };
                Parser.prototype._setPropertyValue = function (obj, prop, val) {
                    if (utils.str.startsWith(prop, '[')) {
                        prop = this.trimQuotes(this.trimBrackets(prop));
                        if (utils.check.isArray(obj)) {
                            obj[parseInt(prop, 10)] = val;
                        } else
                            obj[prop] = val;
                    } else
                        obj[prop] = val;
                };

                Parser.prototype._getKeyVals = function (val) {
                    var i, ch, literal, parts = [], kv = { key: '', val: '' }, isKey = true, bracePart, vd1 = Parser.__valueDelimeter1, vd2 = Parser.__valueDelimeter2, kvd = Parser.__keyValDelimeter;

                    var addNewKeyValPair = function (kv) {
                        if (kv.val) {
                            if (utils.check.isNumeric(kv.val)) {
                                kv.val = Number(kv.val);
                            } else if (utils.check.isBoolString(kv.val)) {
                                kv.val = utils.parseBool(kv.val);
                            }
                        }
                        parts.push(kv);
                    };

                    var checkTokens = function (kv) {
                        if (kv.val === '' && utils.str.startsWith(kv.key, 'this.')) {
                            kv.val = kv.key.substr(5);
                            kv.key = 'targetPath';
                        }
                    };

                    for (i = 0; i < val.length; i += 1) {
                        ch = val.charAt(i);

                        if (ch === "'" || ch === '"') {
                            if (!literal)
                                literal = ch; else if (literal === ch)
                                literal = null;
                        }

                        if (!literal && ch === "{" && !isKey) {
                            bracePart = val.substr(i);
                            bracePart = this.getBraceParts(bracePart, true)[0];
                            kv.val += bracePart;
                            i += bracePart.length - 1;
                            continue;
                        }

                        if (!literal && ch === kvd) {
                            if (!!kv.key) {
                                addNewKeyValPair(kv);
                                kv = { key: '', val: '' };
                                isKey = true;
                            }
                        } else if (!literal && (ch === vd1 || ch === vd2)) {
                            isKey = false;
                        } else {
                            if (isKey)
                                kv.key += ch; else
                                kv.val += ch;
                        }
                    }

                    if (!!kv.key) {
                        addNewKeyValPair(kv);
                    }

                    parts.forEach(function (kv) {
                        kv.key = utils.str.trim(kv.key);
                        if (utils.check.isString(kv.val))
                            kv.val = utils.str.trim(kv.val);
                        checkTokens(kv);
                    });

                    parts = parts.filter(function (kv) {
                        return kv.val !== '';
                    });
                    return parts;
                };
                Parser.prototype.resolveBindingSource = function (root, srcParts) {
                    if (!root)
                        return undefined;

                    if (srcParts.length === 0) {
                        return root;
                    }

                    if (srcParts.length > 0) {
                        return this.resolveBindingSource(this._resolveProp(root, srcParts[0]), srcParts.slice(1));
                    }

                    throw new Error('Invalid operation');
                };
                Parser.prototype.resolvePath = function (obj, path) {
                    if (!path)
                        return obj;
                    var parts = this._getPathParts(path);
                    return this._resolvePath(obj, parts);
                };

                Parser.prototype.getBraceParts = function (val, firstOnly) {
                    var i, s = '', ch, literal, cnt = 0, parts = [];
                    for (i = 0; i < val.length; i += 1) {
                        ch = val.charAt(i);

                        if (ch === "'" || ch === '"') {
                            if (!literal)
                                literal = ch; else if (literal === ch)
                                literal = null;
                        }

                        if (!literal && ch === '{') {
                            cnt += 1;
                            s += ch;
                        } else if (!literal && ch === '}') {
                            cnt -= 1;
                            s += ch;
                            if (cnt === 0) {
                                parts.push(s);
                                s = '';
                                if (firstOnly)
                                    return parts;
                            }
                        } else {
                            if (cnt > 0) {
                                s += ch;
                            }
                        }
                    }

                    return parts;
                };
                Parser.prototype.trimOuterBraces = function (val) {
                    return utils.str.trim(val.replace(Parser.__trimOuterBracesRX, ''));
                };
                Parser.prototype.trimQuotes = function (val) {
                    return utils.str.trim(val.replace(Parser.__trimQuotsRX, ''));
                };
                Parser.prototype.trimBrackets = function (val) {
                    return utils.str.trim(val.replace(Parser.__trimBracketsRX, ''));
                };
                Parser.prototype.isWithOuterBraces = function (str) {
                    return (utils.str.startsWith(str, '{') && utils.str.endsWith(str, '}'));
                };
                Parser.prototype.parseOption = function (part) {
                    var res = {}, self = this;
                    part = utils.str.trim(part);
                    if (self.isWithOuterBraces(part))
                        part = self.trimOuterBraces(part);
                    var kvals = self._getKeyVals(part);
                    kvals.forEach(function (kv) {
                        var isString = utils.check.isString(kv.val);
                        if (isString && self.isWithOuterBraces(kv.val))
                            res[kv.key] = self.parseOption(kv.val); else {
                            if (isString)
                                res[kv.key] = self.trimQuotes(kv.val); else
                                res[kv.key] = kv.val;
                        }
                    });
                    return res;
                };
                Parser.prototype.parseOptions = function (str) {
                    var res = [], self = this;
                    str = utils.str.trim(str);
                    var parts = [str];
                    if (self.isWithOuterBraces(str)) {
                        parts = self.getBraceParts(str, false);
                    }
                    parts.forEach(function (part) {
                        res.push(self.parseOption(part));
                    });

                    return res;
                };
                Parser.prototype.toString = function () {
                    return 'Parser';
                };
                Parser.__trimOuterBracesRX = /^([{]){0,1}|([}]){0,1}$/g;
                Parser.__trimQuotsRX = /^(['"])+|(['"])+$/g;
                Parser.__trimBracketsRX = /^(\[)+|(\])+$/g;
                Parser.__indexedPropRX = /(^\w+)\s*\[\s*['"]?\s*([^'"]+)\s*['",]?\s*\]/i;
                Parser.__valueDelimeter1 = ':';
                Parser.__valueDelimeter2 = '=';
                Parser.__keyValDelimeter = ',';
                return Parser;
            })();
            parser.Parser = Parser;
            ;

            RIAPP.global.onModuleLoaded('parser', parser);
        })(MOD.parser || (MOD.parser = {}));
        var parser = MOD.parser;
    })(RIAPP.MOD || (RIAPP.MOD = {}));
    var MOD = RIAPP.MOD;
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    (function (MOD) {
        (function (mvvm) {
            var utils = RIAPP.global.utils, consts = RIAPP.global.consts;

            var Command = (function (_super) {
                __extends(Command, _super);
                function Command(fn_action, thisObj, fn_canExecute) {
                    _super.call(this);
                    this._action = fn_action;
                    this._thisObj = thisObj;
                    this._canExecute = fn_canExecute;
                    this._objId = 'cmd' + utils.getNewID();
                }
                Command.prototype._getEventNames = function () {
                    var base_events = _super.prototype._getEventNames.call(this);
                    return ['canExecute_changed'].concat(base_events);
                };
                Command.prototype.addOnCanExecuteChanged = function (fn, namespace) {
                    this.addHandler('canExecute_changed', fn, namespace);
                };
                Command.prototype.removeOnCanExecuteChanged = function (namespace) {
                    this.removeHandler('canExecute_changed', namespace);
                };
                Command.prototype.canExecute = function (sender, param) {
                    if (!this._canExecute)
                        return true;
                    return this._canExecute.apply(this._thisObj, [sender, param]);
                };
                Command.prototype.execute = function (sender, param) {
                    if (!!this._action) {
                        this._action.apply(this._thisObj, [sender, param]);
                    }
                };
                Command.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._action = null;
                    this._thisObj = null;
                    this._canExecute = null;
                    _super.prototype.destroy.call(this);
                };
                Command.prototype.raiseCanExecuteChanged = function () {
                    this.raiseEvent('canExecute_changed', {});
                };
                Command.prototype.toString = function () {
                    return 'Command';
                };
                return Command;
            })(RIAPP.BaseObject);
            mvvm.Command = Command;

            var BaseViewModel = (function (_super) {
                __extends(BaseViewModel, _super);
                function BaseViewModel(app) {
                    _super.call(this);
                    this._app = app;
                    this._objId = 'vm' + utils.getNewID();
                }
                BaseViewModel.prototype._onError = function (error, source) {
                    var isHandled = _super.prototype._onError.call(this, error, source);
                    if (!isHandled) {
                        return this._app._onError(error, source);
                    }
                    return isHandled;
                };
                BaseViewModel.prototype.toString = function () {
                    return 'BaseViewModel';
                };
                BaseViewModel.prototype.destroy = function () {
                    this._app = null;
                    _super.prototype.destroy.call(this);
                };
                Object.defineProperty(BaseViewModel.prototype, "uniqueID", {
                    get: function () {
                        return this._objId;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseViewModel.prototype, "$", {
                    get: function () {
                        return RIAPP.global.$;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseViewModel.prototype, "app", {
                    get: function () {
                        return this._app;
                    },
                    enumerable: true,
                    configurable: true
                });
                return BaseViewModel;
            })(RIAPP.BaseObject);
            mvvm.BaseViewModel = BaseViewModel;

            RIAPP.global.registerType('Command', Command);
            RIAPP.global.registerType('BaseViewModel', BaseViewModel);
            RIAPP.global.onModuleLoaded('mvvm', mvvm);
        })(MOD.mvvm || (MOD.mvvm = {}));
        var mvvm = MOD.mvvm;
    })(RIAPP.MOD || (RIAPP.MOD = {}));
    var MOD = RIAPP.MOD;
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    (function (MOD) {
        (function (baseElView) {
            var utils = RIAPP.global.utils, consts = RIAPP.global.consts;
            var ERRTEXT = RIAPP.localizable.VALIDATE;

            var PropChangedCommand = (function (_super) {
                __extends(PropChangedCommand, _super);
                function PropChangedCommand(fn_action, thisObj, fn_canExecute) {
                    _super.call(this, fn_action, thisObj, fn_canExecute);
                }
                return PropChangedCommand;
            })(RIAPP.MOD.mvvm.Command);
            baseElView.PropChangedCommand = PropChangedCommand;

            baseElView.css = {
                fieldError: 'ria-field-error',
                errorTip: 'ui-tooltip-red',
                commandLink: 'ria-command-link'
            };

            var BaseElView = (function (_super) {
                __extends(BaseElView, _super);
                function BaseElView(app, el, options) {
                    _super.call(this);
                    this._app = app;
                    this._el = el;
                    this._$el = null;

                    this._oldDisplay = null;
                    this._objId = 'elv' + utils.getNewID();
                    this._propChangedCommand = null;
                    app._setElView(this._el, this);
                    this._errors = null;
                    this._toolTip = options.tip;
                    this._css = options.css;
                    this._init(options);
                    this._applyToolTip();
                }
                BaseElView.prototype._applyToolTip = function () {
                    if (!!this._toolTip) {
                        this._setToolTip(this.$el, this._toolTip);
                    }
                };
                BaseElView.prototype._init = function (options) {
                    if (!!this._css) {
                        this.$el.addClass(this._css);
                    }
                };
                BaseElView.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    var $el = this._$el, el = this._el;
                    if (!!$el)
                        $el.off('.' + this._objId);
                    try  {
                        this._propChangedCommand = null;
                        this.validationErrors = null;
                        this.toolTip = null;
                        this._el = null;
                        this._$el = null;
                    } finally {
                        this._app._setElView(el, null);
                        this._app = null;
                    }
                    _super.prototype.destroy.call(this);
                };
                BaseElView.prototype.invokePropChanged = function (property) {
                    var self = this, data = { property: property };
                    if (!!self._propChangedCommand) {
                        self._propChangedCommand.execute(self, data);
                    }
                };
                BaseElView.prototype._getErrorTipInfo = function (errors) {
                    var tip = ['<b>', ERRTEXT.errorInfo, '</b>', '<br/>'];
                    errors.forEach(function (info) {
                        var res = '';
                        info.errors.forEach(function (str) {
                            res = res + ' ' + str;
                        });
                        tip.push(res);
                        res = '';
                    });
                    return tip.join('');
                };
                BaseElView.prototype._setFieldError = function (isError) {
                    var $el = this.$el;
                    if (isError) {
                        $el.addClass(baseElView.css.fieldError);
                    } else {
                        $el.removeClass(baseElView.css.fieldError);
                    }
                };
                BaseElView.prototype._updateErrorUI = function (el, errors) {
                    if (!el) {
                        return;
                    }
                    var $el = this.$el;
                    if (!!errors && errors.length > 0) {
                        utils.addToolTip($el, this._getErrorTipInfo(errors), baseElView.css.errorTip);
                        this._setFieldError(true);
                    } else {
                        this._setToolTip($el, this.toolTip);
                        this._setFieldError(false);
                    }
                };
                BaseElView.prototype._onError = function (error, source) {
                    var isHandled = _super.prototype._onError.call(this, error, source);
                    if (!isHandled) {
                        return RIAPP.global._onError(error, source);
                    }
                    return isHandled;
                };
                BaseElView.prototype._setToolTip = function ($el, tip, className) {
                    utils.addToolTip($el, tip, className);
                };
                BaseElView.prototype.toString = function () {
                    return 'BaseElView';
                };
                Object.defineProperty(BaseElView.prototype, "$el", {
                    get: function () {
                        if (!!this._el && !this._$el)
                            this._$el = RIAPP.global.$(this._el);
                        return this._$el;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseElView.prototype, "el", {
                    get: function () {
                        return this._el;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseElView.prototype, "uniqueID", {
                    get: function () {
                        return this._objId;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseElView.prototype, "isVisible", {
                    get: function () {
                        var v = this.el.style.display;
                        return !(v === 'none');
                    },
                    set: function (v) {
                        v = !!v;
                        if (v !== this.isVisible) {
                            if (!v) {
                                this._oldDisplay = this.el.style.display;
                                this.el.style.display = 'none';
                            } else {
                                if (!!this._oldDisplay)
                                    this.el.style.display = this._oldDisplay; else
                                    this.el.style.display = '';
                            }
                            this.raisePropertyChanged('isVisible');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseElView.prototype, "propChangedCommand", {
                    get: function () {
                        return this._propChangedCommand;
                    },
                    set: function (v) {
                        var old = this._propChangedCommand;
                        if (v !== old) {
                            this._propChangedCommand = v;
                            this.invokePropChanged('*');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseElView.prototype, "validationErrors", {
                    get: function () {
                        return this._errors;
                    },
                    set: function (v) {
                        if (v !== this._errors) {
                            this._errors = v;
                            this.raisePropertyChanged('validationErrors');
                            this._updateErrorUI(this._el, this._errors);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseElView.prototype, "dataNameAttr", {
                    get: function () {
                        return this._el.getAttribute(consts.DATA_ATTR.DATA_NAME);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseElView.prototype, "toolTip", {
                    get: function () {
                        return this._toolTip;
                    },
                    set: function (v) {
                        if (this._toolTip != v) {
                            this._toolTip = v;
                            this._setToolTip(this.$el, v);
                            this.raisePropertyChanged('toolTip');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseElView.prototype, "css", {
                    get: function () {
                        return this._css;
                    },
                    set: function (v) {
                        var $el = this.$el;
                        if (this._css != v) {
                            if (!!this._css)
                                $el.removeClass(this._css);
                            this._css = v;
                            if (!!this._css)
                                $el.addClass(this._css);
                            this.raisePropertyChanged('css');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseElView.prototype, "app", {
                    get: function () {
                        return this._app;
                    },
                    enumerable: true,
                    configurable: true
                });
                return BaseElView;
            })(RIAPP.BaseObject);
            baseElView.BaseElView = BaseElView;
            ;

            var InputElView = (function (_super) {
                __extends(InputElView, _super);
                function InputElView(app, el, options) {
                    _super.call(this, app, el, options);
                }
                Object.defineProperty(InputElView.prototype, "isEnabled", {
                    get: function () {
                        return !this.el.disabled;
                    },
                    set: function (v) {
                        v = !!v;
                        if (v !== this.isEnabled) {
                            this.el.disabled = !v;
                            this.raisePropertyChanged('isEnabled');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(InputElView.prototype, "el", {
                    get: function () {
                        return this._el;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(InputElView.prototype, "value", {
                    get: function () {
                        var el = this.el;
                        if (!el)
                            return '';
                        return el.value;
                    },
                    set: function (v) {
                        if (!this._el)
                            return;
                        var el = this.el;
                        var x = el.value;
                        var str = '' + v;
                        v = (v === null) ? '' : str;
                        if (x !== v) {
                            el.value = v;
                            this.raisePropertyChanged('value');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return InputElView;
            })(BaseElView);
            baseElView.InputElView = InputElView;
            ;

            var CommandElView = (function (_super) {
                __extends(CommandElView, _super);
                function CommandElView(app, el, options) {
                    _super.call(this, app, el, options);
                    this._command = null;
                    this._commandParam = null;
                    if (!this.isEnabled) {
                        this.$el.addClass('disabled');
                    }
                }
                CommandElView.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._command) {
                        this._command.removeNSHandlers(this._objId);
                    }
                    this.command = null;
                    this.commandParam = null;
                    _super.prototype.destroy.call(this);
                };
                CommandElView.prototype.invokeCommand = function () {
                    var self = this, command = self.command, param = self.commandParam;
                    if (!!command && command.canExecute(self, param)) {
                        setTimeout(function () {
                            if (command.canExecute(self, param))
                                command.execute(self, param);
                        }, 0);
                    }
                };
                CommandElView.prototype._onCommandChanged = function () {
                    this.raisePropertyChanged('command');
                };
                CommandElView.prototype._setCommand = function (v) {
                    var self = this;
                    if (v !== this._command) {
                        if (!!this._command) {
                            this._command.removeNSHandlers(this._objId);
                        }
                        this._command = v;
                        if (!!this._command) {
                            this._command.addOnCanExecuteChanged(function (cmd, args) {
                                self.isEnabled = cmd.canExecute(self, self.commandParam);
                            }, this._objId);
                            self.isEnabled = this._command.canExecute(self, self.commandParam);
                        } else
                            self.isEnabled = false;
                        this._onCommandChanged();
                    }
                };
                CommandElView.prototype.toString = function () {
                    return 'CommandElView';
                };
                Object.defineProperty(CommandElView.prototype, "isEnabled", {
                    get: function () {
                        return !(this.$el.prop('disabled'));
                    },
                    set: function (v) {
                        if (v !== this.isEnabled) {
                            this.$el.prop('disabled', !v);
                            if (!v)
                                this.$el.addClass('disabled'); else
                                this.$el.removeClass('disabled');
                            this.raisePropertyChanged('isEnabled');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CommandElView.prototype, "command", {
                    get: function () {
                        return this._command;
                    },
                    set: function (v) {
                        this._setCommand(v);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CommandElView.prototype, "commandParam", {
                    get: function () {
                        return this._commandParam;
                    },
                    set: function (v) {
                        if (v !== this._commandParam) {
                            this._commandParam = v;
                            this.raisePropertyChanged('commandParam');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return CommandElView;
            })(BaseElView);
            baseElView.CommandElView = CommandElView;
            ;

            var TemplateCommand = (function (_super) {
                __extends(TemplateCommand, _super);
                function TemplateCommand(fn_action, thisObj, fn_canExecute) {
                    _super.call(this, fn_action, thisObj, fn_canExecute);
                }
                return TemplateCommand;
            })(RIAPP.MOD.mvvm.Command);
            baseElView.TemplateCommand = TemplateCommand;

            var TemplateElView = (function (_super) {
                __extends(TemplateElView, _super);
                function TemplateElView(app, el, options) {
                    _super.call(this, app, el, options);
                    this._template = null;
                    this._isEnabled = true;
                }
                TemplateElView.prototype.templateLoaded = function (template) {
                    var self = this, p = self._commandParam;
                    self._template = template;
                    self._template.isDisabled = !self._isEnabled;
                    self._commandParam = { template: template, isLoaded: true };
                    self.invokeCommand();
                    self._commandParam = p;
                    this.raisePropertyChanged('template');
                };
                TemplateElView.prototype.templateUnloading = function (template) {
                    var self = this, p = self._commandParam;
                    try  {
                        self._commandParam = { template: template, isLoaded: false };
                        self.invokeCommand();
                    } finally {
                        self._commandParam = p;
                        self._template = null;
                    }
                    this.raisePropertyChanged('template');
                };
                TemplateElView.prototype.toString = function () {
                    return 'TemplateElView';
                };
                Object.defineProperty(TemplateElView.prototype, "isEnabled", {
                    get: function () {
                        return this._isEnabled;
                    },
                    set: function (v) {
                        if (this._isEnabled !== v) {
                            this._isEnabled = v;
                            if (!!this._template) {
                                this._template.isDisabled = !this._isEnabled;
                            }
                            this.raisePropertyChanged('isEnabled');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return TemplateElView;
            })(CommandElView);
            baseElView.TemplateElView = TemplateElView;
            ;

            var BusyElView = (function (_super) {
                __extends(BusyElView, _super);
                function BusyElView(app, el, options) {
                    _super.call(this, app, el, options);
                }
                BusyElView.prototype._init = function (options) {
                    _super.prototype._init.call(this, options);
                    var img;
                    if (!!options.img)
                        img = options.img; else
                        img = consts.LOADER_GIF.NORMAL;
                    this._delay = 400;
                    this._timeOut = null;
                    if (!utils.check.isNt(options.delay))
                        this._delay = parseInt(options.delay);
                    this._loaderPath = RIAPP.global.getImagePath(img);
                    this._$loader = RIAPP.global.$(new Image());
                    this._$loader.css({ position: "absolute", display: "none", zIndex: "10000" });
                    this._$loader.prop('src', this._loaderPath);
                    this._$loader.appendTo(this.el);
                    this._isBusy = false;
                };
                BusyElView.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._timeOut) {
                        clearTimeout(this._timeOut);
                        this._timeOut = null;
                    }
                    this._$loader.remove();
                    this._$loader = null;
                    _super.prototype.destroy.call(this);
                };
                BusyElView.prototype.toString = function () {
                    return 'BusyElView';
                };
                Object.defineProperty(BusyElView.prototype, "isBusy", {
                    get: function () {
                        return this._isBusy;
                    },
                    set: function (v) {
                        var self = this, fn = function () {
                            self._timeOut = null;
                            self._$loader.show();
                            self._$loader.position({
                                "of": RIAPP.global.$(self.el)
                            });
                        };

                        if (v !== self._isBusy) {
                            self._isBusy = v;
                            if (self._isBusy) {
                                if (!!self._timeOut) {
                                    clearTimeout(self._timeOut);
                                    self._timeOut = null;
                                }
                                if (self._delay > 0) {
                                    self._timeOut = setTimeout(fn, self._delay);
                                } else
                                    fn();
                            } else {
                                if (!!self._timeOut) {
                                    clearTimeout(self._timeOut);
                                    self._timeOut = null;
                                } else
                                    self._$loader.hide();
                            }
                            self.raisePropertyChanged('isBusy');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BusyElView.prototype, "delay", {
                    get: function () {
                        return this._delay;
                    },
                    set: function (v) {
                        if (v !== this._delay) {
                            this._delay = v;
                            this.raisePropertyChanged('delay');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return BusyElView;
            })(BaseElView);
            baseElView.BusyElView = BusyElView;

            var DynaContentElView = (function (_super) {
                __extends(DynaContentElView, _super);
                function DynaContentElView(app, el, options) {
                    _super.call(this, app, el, options);
                    this._dataContext = null;
                    this._template = null;
                }
                DynaContentElView.prototype._templateChanged = function () {
                    this.raisePropertyChanged('templateID');
                    if (!this._template)
                        return;
                    this.$el.empty().append(this._template.el);
                };
                DynaContentElView.prototype.updateTemplate = function (name) {
                    var self = this;
                    try  {
                        if (!name && !!this._template) {
                            this._template.destroy();
                            this._template = null;
                            self._templateChanged();
                            return;
                        }
                    } catch (ex) {
                        this._onError(ex, this);
                        RIAPP.global._throwDummy(ex);
                    }

                    try  {
                        if (!this._template) {
                            this._template = new RIAPP.MOD.template.Template(this.app, name);
                            this._template.dataContext = this._dataContext;
                            this._template.addOnPropertyChange('templateID', function (s, a) {
                                self._templateChanged();
                            }, this._objId);
                            self._templateChanged();
                            return;
                        }

                        this._template.templateID = name;
                    } catch (ex) {
                        this._onError(ex, this);
                        RIAPP.global._throwDummy(ex);
                    }
                };
                DynaContentElView.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._template) {
                        this._template.destroy();
                        this._template = null;
                    }
                    this._dataContext = null;
                    _super.prototype.destroy.call(this);
                };
                Object.defineProperty(DynaContentElView.prototype, "templateID", {
                    get: function () {
                        if (!this._template)
                            return null;
                        return this._template.templateID;
                    },
                    set: function (v) {
                        this.updateTemplate(v);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DynaContentElView.prototype, "template", {
                    get: function () {
                        return this._template;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DynaContentElView.prototype, "dataContext", {
                    get: function () {
                        return this._dataContext;
                    },
                    set: function (v) {
                        if (this._dataContext !== v) {
                            this._dataContext = v;
                            if (!!this._template)
                                this._template.dataContext = this._dataContext;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return DynaContentElView;
            })(BaseElView);
            baseElView.DynaContentElView = DynaContentElView;

            var CheckBoxElView = (function (_super) {
                __extends(CheckBoxElView, _super);
                function CheckBoxElView() {
                    _super.apply(this, arguments);
                }
                CheckBoxElView.prototype._init = function (options) {
                    var self = this;
                    _super.prototype._init.call(this, options);
                    this._val = this.el.checked;
                    this.$el.on('change.' + this._objId, function (e) {
                        e.stopPropagation();
                        self.checked = this.checked;
                    });
                };
                CheckBoxElView.prototype._setFieldError = function (isError) {
                    var $el = this.$el;
                    if (isError) {
                        var span = RIAPP.global.$('<div></div>').addClass(baseElView.css.fieldError);
                        $el.wrap(span);
                    } else {
                        if ($el.parent('.' + baseElView.css.fieldError).length > 0)
                            $el.unwrap();
                    }
                };
                CheckBoxElView.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this.$el.off('.' + this._objId);
                    _super.prototype.destroy.call(this);
                };
                CheckBoxElView.prototype.toString = function () {
                    return 'CheckBoxElView';
                };
                Object.defineProperty(CheckBoxElView.prototype, "checked", {
                    get: function () {
                        return this._val;
                    },
                    set: function (v) {
                        var el = this.el;
                        if (v !== null)
                            v = !!v;
                        if (v !== this._val) {
                            this._val = v;
                            if (el)
                                el.checked = !!this._val;

                            if (this._val === null) {
                                this.$el.css("opacity", 0.33);
                            } else
                                this.$el.css("opacity", 1.0);
                            this.raisePropertyChanged('checked');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return CheckBoxElView;
            })(InputElView);
            baseElView.CheckBoxElView = CheckBoxElView;

            var CheckBoxThreeStateElView = (function (_super) {
                __extends(CheckBoxThreeStateElView, _super);
                function CheckBoxThreeStateElView() {
                    _super.apply(this, arguments);
                }
                CheckBoxThreeStateElView.prototype._init = function (options) {
                    var self = this;
                    _super.prototype._init.call(this, options);
                    this._val = this.el.checked;
                    this._cbxVal = this._val == null ? 1 : (!!this._val ? 2 : 0);
                    var $el = this.$el;
                    $el.on('change.' + this._objId, function (e) {
                        e.stopPropagation();
                        switch (self._cbxVal) {
                            case 0:
                                self._cbxVal = 1;
                                break;

                            case 1:
                                self._cbxVal = 2;
                                break;

                            default:
                                self._cbxVal = 0;
                        }
                        self.checked = (self._cbxVal == 1) ? null : ((self._cbxVal == 2) ? true : false);
                    });
                };
                CheckBoxThreeStateElView.prototype._setFieldError = function (isError) {
                    var $el = this.$el;
                    if (isError) {
                        var span = RIAPP.global.$('<div></div>').addClass(baseElView.css.fieldError);
                        $el.wrap(span);
                    } else {
                        if ($el.parent('.' + baseElView.css.fieldError).length > 0)
                            $el.unwrap();
                    }
                };
                CheckBoxThreeStateElView.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this.$el.off('.' + this._objId);
                    _super.prototype.destroy.call(this);
                };
                CheckBoxThreeStateElView.prototype.toString = function () {
                    return 'CheckBoxThreeStateElView';
                };
                Object.defineProperty(CheckBoxThreeStateElView.prototype, "checked", {
                    get: function () {
                        return this._val;
                    },
                    set: function (v) {
                        var $el = this.$el;
                        if (v !== this._val) {
                            this._val = v;
                            switch (this._val) {
                                case null:
                                    $el.prop('indeterminate', true);
                                    this._cbxVal = 1;
                                    break;
                                case true:
                                    $el.prop('indeterminate', false);
                                    $el.prop('checked', true);
                                    this._cbxVal = 2;
                                    break;
                                default:
                                    $el.prop('indeterminate', false);
                                    $el.prop('checked', false);
                                    this._cbxVal = 0;
                            }
                            this.raisePropertyChanged('checked');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return CheckBoxThreeStateElView;
            })(InputElView);
            baseElView.CheckBoxThreeStateElView = CheckBoxThreeStateElView;

            var TextBoxElView = (function (_super) {
                __extends(TextBoxElView, _super);
                function TextBoxElView() {
                    _super.apply(this, arguments);
                }
                TextBoxElView.prototype._init = function (options) {
                    var self = this;
                    _super.prototype._init.call(this, options);
                    var $el = this.$el;
                    $el.on('change.' + this._objId, function (e) {
                        e.stopPropagation();
                        self.raisePropertyChanged('value');
                    });
                    $el.on('keypress.' + this._objId, function (e) {
                        e.stopPropagation();
                        var args = { keyCode: e.which, value: (e.target).value, isCancel: false };
                        self.raiseEvent('keypress', args);
                        if (args.isCancel)
                            e.preventDefault();
                    });
                    if (!!options.updateOnKeyUp) {
                        $el.on('keyup.' + this._objId, function (e) {
                            e.stopPropagation();
                            self.raisePropertyChanged('value');
                        });
                    }
                };
                TextBoxElView.prototype._getEventNames = function () {
                    var base_events = _super.prototype._getEventNames.call(this);
                    return ['keypress'].concat(base_events);
                };
                TextBoxElView.prototype.addOnKeyPress = function (fn, namespace) {
                    this.addHandler('keypress', fn, namespace);
                };
                TextBoxElView.prototype.removeOnKeyPress = function (namespace) {
                    this.removeHandler('keypress', namespace);
                };
                TextBoxElView.prototype.toString = function () {
                    return 'TextBoxElView';
                };
                Object.defineProperty(TextBoxElView.prototype, "color", {
                    get: function () {
                        var $el = this.$el;
                        return $el.css('color');
                    },
                    set: function (v) {
                        var $el = this.$el;
                        var x = $el.css('color');
                        if (v !== x) {
                            $el.css('color', v);
                            this.raisePropertyChanged('color');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return TextBoxElView;
            })(InputElView);
            baseElView.TextBoxElView = TextBoxElView;

            var HiddenElView = (function (_super) {
                __extends(HiddenElView, _super);
                function HiddenElView() {
                    _super.apply(this, arguments);
                }
                HiddenElView.prototype.toString = function () {
                    return 'EditableElView';
                };
                return HiddenElView;
            })(InputElView);
            baseElView.HiddenElView = HiddenElView;

            var TextAreaElView = (function (_super) {
                __extends(TextAreaElView, _super);
                function TextAreaElView(app, el, options) {
                    _super.call(this, app, el, options);
                }
                TextAreaElView.prototype._init = function (options) {
                    _super.prototype._init.call(this, options);
                    var self = this;
                    if (!!options.rows) {
                        this.rows = options.rows;
                    }
                    if (!!options.cols) {
                        this.cols = options.cols;
                    }
                    if (!!options.wrap) {
                        this.wrap = options.wrap;
                    }
                    var $el = this.$el;
                    $el.on('change.' + this._objId, function (e) {
                        e.stopPropagation();
                        self.raisePropertyChanged('value');
                    });
                    $el.on('keypress.' + this._objId, function (e) {
                        e.stopPropagation();
                        var args = { keyCode: e.which, value: (e.target).value, isCancel: false };
                        self.raiseEvent('keypress', args);
                        if (args.isCancel)
                            e.preventDefault();
                    });
                    if (!!options.updateOnKeyUp) {
                        $el.on('keyup.' + this._objId, function (e) {
                            e.stopPropagation();
                            self.raisePropertyChanged('value');
                        });
                    }
                };
                TextAreaElView.prototype._getEventNames = function () {
                    var base_events = _super.prototype._getEventNames.call(this);
                    return ['keypress'].concat(base_events);
                };
                TextAreaElView.prototype.addOnKeyPress = function (fn, namespace) {
                    this.addHandler('keypress', fn, namespace);
                };
                TextAreaElView.prototype.removeOnKeyPress = function (namespace) {
                    this.removeHandler('keypress', namespace);
                };
                TextAreaElView.prototype.toString = function () {
                    return 'TextAreaElView';
                };
                Object.defineProperty(TextAreaElView.prototype, "el", {
                    get: function () {
                        return this._el;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TextAreaElView.prototype, "value", {
                    get: function () {
                        var el = this.el;
                        if (!el)
                            return '';
                        return el.value;
                    },
                    set: function (v) {
                        if (!this._el)
                            return;
                        var el = this.el;
                        var x = el.value;
                        var str = '' + v;
                        v = (v === null) ? '' : str;
                        if (x !== v) {
                            el.value = v;
                            this.raisePropertyChanged('value');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TextAreaElView.prototype, "isEnabled", {
                    get: function () {
                        return !this.el.disabled;
                    },
                    set: function (v) {
                        v = !!v;
                        if (v !== this.isEnabled) {
                            this.el.disabled = !v;
                            this.raisePropertyChanged('isEnabled');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TextAreaElView.prototype, "rows", {
                    get: function () {
                        var el = this.el;
                        if (!el)
                            return 1;
                        return el.rows;
                    },
                    set: function (v) {
                        var el = this.el;
                        if (!el)
                            return;
                        var x = el.rows;
                        v = (!v) ? 1 : v;
                        if (x !== v) {
                            el.rows = v;
                            this.raisePropertyChanged('rows');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TextAreaElView.prototype, "cols", {
                    get: function () {
                        var el = this.el;
                        if (!el)
                            return 1;
                        return el.cols;
                    },
                    set: function (v) {
                        var el = this.el;
                        if (!el)
                            return;
                        var x = el.cols;
                        v = (!v) ? 1 : v;
                        if (x !== v) {
                            el.cols = v;
                            this.raisePropertyChanged('cols');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TextAreaElView.prototype, "wrap", {
                    get: function () {
                        var el = this.el;
                        if (!el)
                            return 'off';
                        return el.wrap;
                    },
                    set: function (v) {
                        var el = this.el;
                        if (!el)
                            return;
                        var x = el.wrap, wraps = ['hard', 'off', 'soft'];
                        v = (!v) ? 'off' : v;
                        if (wraps.indexOf(v) < 0)
                            v = 'off';
                        if (x !== v) {
                            el.wrap = v;
                            this.raisePropertyChanged('wrap');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return TextAreaElView;
            })(BaseElView);
            baseElView.TextAreaElView = TextAreaElView;

            var RadioElView = (function (_super) {
                __extends(RadioElView, _super);
                function RadioElView() {
                    _super.apply(this, arguments);
                }
                RadioElView.prototype._init = function (options) {
                    var self = this;
                    _super.prototype._init.call(this, options);
                    this._val = this.el.checked;
                    this.$el.on('change.' + this._objId, function (e) {
                        e.stopPropagation();
                        self.checked = this.checked;
                        self._updateGroup();
                    });
                };
                RadioElView.prototype._updateGroup = function () {
                    var groupName = this.el.getAttribute('name'), self = this;
                    if (!groupName)
                        return;
                    var parent = this.el.parentElement;
                    if (!parent)
                        return;
                    var self = this, cur = self.el;
                    RIAPP.global.$('input[type="radio"][name="' + groupName + '"]', parent).each(function (index, el) {
                        if (cur !== this) {
                            var vw = self.app._getElView(this);
                            if (!!vw) {
                                vw.checked = this.checked;
                            }
                        }
                    });
                };
                RadioElView.prototype._setFieldError = function (isError) {
                    var $el = this.$el;
                    if (isError) {
                        var span = RIAPP.global.$('<div></div>').addClass(baseElView.css.fieldError);
                        $el.wrap(span);
                    } else {
                        if ($el.parent('.' + baseElView.css.fieldError).length > 0)
                            $el.unwrap();
                    }
                };
                RadioElView.prototype.toString = function () {
                    return 'RadioElView';
                };
                Object.defineProperty(RadioElView.prototype, "checked", {
                    get: function () {
                        return this._val;
                    },
                    set: function (v) {
                        var el = this.el;
                        if (v !== null)
                            v = !!v;
                        if (v !== this._val) {
                            this._val = v;
                            if (el)
                                el.checked = !!this._val;

                            if (this._val === null) {
                                this.$el.css("opacity", 0.33);
                            } else
                                this.$el.css("opacity", 1.0);
                            this.raisePropertyChanged('checked');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RadioElView.prototype, "value", {
                    get: function () {
                        return this.el.value;
                    },
                    set: function (v) {
                        var el = this.el;
                        if (!el)
                            return;
                        var strv = '' + v;
                        if (v === null)
                            strv = '';
                        if (strv !== el.value) {
                            el.value = strv;
                            this.raisePropertyChanged('value');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RadioElView.prototype, "name", {
                    get: function () {
                        return this.el.name;
                    },
                    enumerable: true,
                    configurable: true
                });
                return RadioElView;
            })(InputElView);
            baseElView.RadioElView = RadioElView;

            var ButtonElView = (function (_super) {
                __extends(ButtonElView, _super);
                function ButtonElView(app, el, options) {
                    this._preventDefault = false;
                    _super.call(this, app, el, options);
                }
                ButtonElView.prototype._init = function (options) {
                    _super.prototype._init.call(this, options);
                    var self = this, $el = this.$el;
                    if (!!options.preventDefault)
                        this._preventDefault = true;

                    $el.on('click.' + this._objId, function (e) {
                        self._onClick(e);
                    });
                };
                ButtonElView.prototype._onClick = function (e) {
                    if (this._preventDefault)
                        e.preventDefault();
                    this.invokeCommand();
                };
                ButtonElView.prototype.toString = function () {
                    return 'ButtonElView';
                };
                Object.defineProperty(ButtonElView.prototype, "value", {
                    get: function () {
                        if (!this._el)
                            return '';
                        return this.$el.val();
                    },
                    set: function (v) {
                        if (!this._el)
                            return;

                        var x = this.$el.val();
                        if (v === null)
                            v = ''; else
                            v = '' + v;
                        if (x !== v) {
                            this.$el.val(v);
                            this.raisePropertyChanged('value');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ButtonElView.prototype, "text", {
                    get: function () {
                        if (!this._el)
                            return '';
                        return this.$el.text();
                    },
                    set: function (v) {
                        if (!this._el)
                            return;

                        var x = this.$el.text();
                        if (v === null)
                            v = ''; else
                            v = '' + v;
                        if (x !== v) {
                            this.$el.text(v);
                            this.raisePropertyChanged('text');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ButtonElView.prototype, "html", {
                    get: function () {
                        if (!this._el)
                            return '';
                        return this.$el.html();
                    },
                    set: function (v) {
                        if (!this._el)
                            return;

                        var x = this.$el.html();
                        if (v === null)
                            v = ''; else
                            v = '' + v;
                        if (x !== v) {
                            this.$el.html(v);
                            this.raisePropertyChanged('html');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ButtonElView.prototype, "preventDefault", {
                    get: function () {
                        return this._preventDefault;
                    },
                    set: function (v) {
                        if (this._preventDefault !== v) {
                            this._preventDefault = v;
                            this.raisePropertyChanged('preventDefault');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return ButtonElView;
            })(CommandElView);
            baseElView.ButtonElView = ButtonElView;

            var AnchorElView = (function (_super) {
                __extends(AnchorElView, _super);
                function AnchorElView(app, el, options) {
                    this._imageSrc = null;
                    this._image = null;
                    this._preventDefault = false;
                    _super.call(this, app, el, options);
                }
                AnchorElView.prototype._init = function (options) {
                    _super.prototype._init.call(this, options);
                    var self = this, $el = this.$el;
                    if (!!options.imageSrc)
                        this.imageSrc = options.imageSrc;
                    if (!!options.preventDefault)
                        this._preventDefault = true;
                    $el.addClass(baseElView.css.commandLink);
                    $el.on('click.' + this._objId, function (e) {
                        self._onClick(e);
                    });
                };
                AnchorElView.prototype._onClick = function (e) {
                    if (this._preventDefault)
                        e.preventDefault();
                    this.invokeCommand();
                };
                AnchorElView.prototype._updateImage = function (src) {
                    var $a = this.$el, $img, self = this;
                    if (this._imageSrc === src)
                        return;
                    this._imageSrc = src;
                    if (!!this._image && !src) {
                        RIAPP.global.$(this._image).remove();
                        this._image = null;
                    }

                    if (!!src) {
                        if (!this._image) {
                            self.html = null;
                            $img = RIAPP.global.$(new Image()).attr('src', src).mouseenter(function (e) {
                                if (self.isEnabled)
                                    RIAPP.global.$(this).css("opacity", 0.5);
                            }).mouseout(function (e) {
                                if (self.isEnabled)
                                    RIAPP.global.$(this).css("opacity", 1.0);
                            }).appendTo($a);
                            this._image = $img.get(0);
                        } else
                            this._image.src = src;
                    }
                };
                AnchorElView.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this.$el.removeClass(baseElView.css.commandLink);
                    this.imageSrc = null;
                    _super.prototype.destroy.call(this);
                };
                AnchorElView.prototype.toString = function () {
                    return 'AncorButtonElView';
                };
                Object.defineProperty(AnchorElView.prototype, "el", {
                    get: function () {
                        return this._el;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnchorElView.prototype, "imageSrc", {
                    get: function () {
                        return this._imageSrc;
                    },
                    set: function (v) {
                        if (!this._$el)
                            return;
                        var x = this._imageSrc;
                        if (x !== v) {
                            this._updateImage(v);
                            this.raisePropertyChanged('imageSrc');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnchorElView.prototype, "html", {
                    get: function () {
                        if (!this._el)
                            return '';
                        return this.$el.html();
                    },
                    set: function (v) {
                        if (!this._el)
                            return;

                        var x = this.$el.html();
                        if (v === null)
                            v = ''; else
                            v = '' + v;
                        if (x !== v) {
                            this.$el.html(v);
                            this.raisePropertyChanged('html');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnchorElView.prototype, "text", {
                    get: function () {
                        if (!this._el)
                            return '';
                        return this.$el.text();
                    },
                    set: function (v) {
                        if (!this._el)
                            return;

                        var x = this.$el.text();
                        if (v === null)
                            v = ''; else
                            v = '' + v;
                        if (x !== v) {
                            this.$el.text(v);
                            this.raisePropertyChanged('text');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnchorElView.prototype, "href", {
                    get: function () {
                        if (!this._el)
                            return '';
                        return this.el.href;
                    },
                    set: function (v) {
                        if (!this._el)
                            return;

                        var x = this.href;
                        if (v === null)
                            v = ''; else
                            v = '' + v;
                        if (x !== v) {
                            this.el.href = v;
                            this.raisePropertyChanged('href');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnchorElView.prototype, "preventDefault", {
                    get: function () {
                        return this._preventDefault;
                    },
                    set: function (v) {
                        if (this._preventDefault !== v) {
                            this._preventDefault = v;
                            this.raisePropertyChanged('preventDefault');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return AnchorElView;
            })(CommandElView);
            baseElView.AnchorElView = AnchorElView;

            var ExpanderElView = (function (_super) {
                __extends(ExpanderElView, _super);
                function ExpanderElView() {
                    _super.apply(this, arguments);
                }
                ExpanderElView.prototype._init = function (options) {
                    this._expandedsrc = options.expandedsrc || RIAPP.global.getImagePath('collapse.jpg');
                    this._collapsedsrc = options.collapsedsrc || RIAPP.global.getImagePath('expand.jpg');
                    this._isExpanded = !!options.isExpanded;
                    var opts = { imageSrc: this._isExpanded ? this._expandedsrc : this._collapsedsrc };
                    _super.prototype._init.call(this, opts);
                };
                ExpanderElView.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._expandedsrc = null;
                    this._collapsedsrc = null;
                    this._isExpanded = false;
                    _super.prototype.destroy.call(this);
                };
                ExpanderElView.prototype._onCommandChanged = function () {
                    _super.prototype._onCommandChanged.call(this);
                    this.invokeCommand();
                };
                ExpanderElView.prototype._onClick = function (e) {
                    var self = this;
                    self._isExpanded = !self._isExpanded;
                    _super.prototype._onClick.call(this, e);
                };
                ExpanderElView.prototype.invokeCommand = function () {
                    var self = this;
                    self.imageSrc = self._isExpanded ? self._expandedsrc : self._collapsedsrc;
                    _super.prototype.invokeCommand.call(this);
                };
                ExpanderElView.prototype.toString = function () {
                    return 'ExpanderElView';
                };
                Object.defineProperty(ExpanderElView.prototype, "isExpanded", {
                    get: function () {
                        return this._isExpanded;
                    },
                    set: function (v) {
                        if (this._isExpanded !== v) {
                            this._isExpanded = v;
                            this.invokeCommand();
                            this.raisePropertyChanged('isExpanded');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return ExpanderElView;
            })(AnchorElView);
            baseElView.ExpanderElView = ExpanderElView;

            var SpanElView = (function (_super) {
                __extends(SpanElView, _super);
                function SpanElView() {
                    _super.apply(this, arguments);
                }
                SpanElView.prototype.toString = function () {
                    return 'SpanElView';
                };
                Object.defineProperty(SpanElView.prototype, "text", {
                    get: function () {
                        return this.$el.text();
                    },
                    set: function (v) {
                        var $el = this.$el, x = $el.text();
                        var str = '' + v;
                        v = v === null ? '' : str;
                        if (x !== v) {
                            $el.text(v);
                            this.raisePropertyChanged('text');
                            this.raisePropertyChanged('value');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SpanElView.prototype, "value", {
                    get: function () {
                        return this.text;
                    },
                    set: function (v) {
                        this.text = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SpanElView.prototype, "html", {
                    get: function () {
                        return this.el.innerHTML;
                    },
                    set: function (v) {
                        var x = this.el.innerHTML;
                        var str = '' + v;
                        v = v === null ? '' : str;
                        if (x !== v) {
                            this.el.innerHTML = v;
                            this.raisePropertyChanged('html');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SpanElView.prototype, "color", {
                    get: function () {
                        var $el = this.$el;
                        return $el.css('color');
                    },
                    set: function (v) {
                        var $el = this.$el;
                        var x = $el.css('color');
                        if (v !== x) {
                            $el.css('color', v);
                            this.raisePropertyChanged('color');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SpanElView.prototype, "fontSize", {
                    get: function () {
                        var $el = this.$el;
                        return $el.css('font-size');
                    },
                    set: function (v) {
                        var $el = this.$el;
                        var x = $el.css('font-size');
                        if (v !== x) {
                            $el.css('font-size', v);
                            this.raisePropertyChanged('fontSize');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return SpanElView;
            })(BaseElView);
            baseElView.SpanElView = SpanElView;

            var BlockElView = (function (_super) {
                __extends(BlockElView, _super);
                function BlockElView() {
                    _super.apply(this, arguments);
                }
                BlockElView.prototype.toString = function () {
                    return 'DivElView';
                };
                Object.defineProperty(BlockElView.prototype, "borderColor", {
                    get: function () {
                        var $el = this.$el;
                        return $el.css('border-top-color');
                    },
                    set: function (v) {
                        var $el = this.$el;
                        var x = $el.css('border-top-color');
                        if (v !== x) {
                            this.el.style.borderColor = v;
                            this.raisePropertyChanged('borderColor');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BlockElView.prototype, "borderStyle", {
                    get: function () {
                        var $el = this.$el;
                        return $el.css('border-top-style');
                    },
                    set: function (v) {
                        var $el = this.$el;
                        var x = $el.css('border-top-style');
                        if (v !== x) {
                            $el.css('border-style', v);
                            this.raisePropertyChanged('borderStyle');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BlockElView.prototype, "width", {
                    get: function () {
                        var $el = this.$el;
                        return $el.width();
                    },
                    set: function (v) {
                        var $el = this.$el;
                        var x = $el.width();
                        if (v !== x) {
                            $el.width(v);
                            this.raisePropertyChanged('width');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BlockElView.prototype, "height", {
                    get: function () {
                        var $el = this.$el;
                        return $el.height();
                    },
                    set: function (v) {
                        var $el = this.$el;
                        var x = $el.height();
                        if (v !== x) {
                            $el.height(v);
                            this.raisePropertyChanged('height');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return BlockElView;
            })(SpanElView);
            baseElView.BlockElView = BlockElView;

            var ImgElView = (function (_super) {
                __extends(ImgElView, _super);
                function ImgElView(app, el, options) {
                    _super.call(this, app, el, options);
                }
                ImgElView.prototype.toString = function () {
                    return 'ImgElView';
                };
                Object.defineProperty(ImgElView.prototype, "el", {
                    get: function () {
                        return this._el;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ImgElView.prototype, "src", {
                    get: function () {
                        return this.el.src;
                    },
                    set: function (v) {
                        var x = this.el.src;
                        if (x !== v) {
                            this.el.src = v;
                            this.raisePropertyChanged('src');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return ImgElView;
            })(BaseElView);
            baseElView.ImgElView = ImgElView;

            var TabsElView = (function (_super) {
                __extends(TabsElView, _super);
                function TabsElView() {
                    _super.apply(this, arguments);
                }
                TabsElView.prototype._init = function (options) {
                    _super.prototype._init.call(this, options);
                    this._tabsEventCommand = null;
                    this._tabOpts = options;
                    this._createTabs();
                };
                TabsElView.prototype._createTabs = function () {
                    var $el = this.$el, self = this, tabOpts = {
                        select: function (e, tab) {
                            self.invokeTabsEvent("select", tab);
                        },
                        show: function (e, tab) {
                            self.invokeTabsEvent("show", tab);
                        },
                        disable: function (e, tab) {
                            self.invokeTabsEvent("disable", tab);
                        },
                        enable: function (e, tab) {
                            self.invokeTabsEvent("enable", tab);
                        },
                        add: function (e, tab) {
                            self.invokeTabsEvent("add", tab);
                        },
                        remove: function (e, tab) {
                            self.invokeTabsEvent("remove", tab);
                        },
                        load: function (e, tab) {
                            self.invokeTabsEvent("load", tab);
                        }
                    };
                    tabOpts = utils.extend(false, tabOpts, self._tabOpts);
                    ($el).tabs(tabOpts);
                };
                TabsElView.prototype._destroyTabs = function () {
                    var $el = this.$el;
                    utils.destroyJQueryPlugin($el, 'tabs');
                };
                TabsElView.prototype.invokeTabsEvent = function (eventName, args) {
                    var self = this, data = { eventName: eventName, args: args };
                    if (!!self._tabsEventCommand) {
                        self._tabsEventCommand.execute(self, data);
                    }
                };
                TabsElView.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._tabsEventCommand = null;
                    this._destroyTabs();
                    _super.prototype.destroy.call(this);
                };
                TabsElView.prototype.toString = function () {
                    return 'TabsElView';
                };
                Object.defineProperty(TabsElView.prototype, "tabsEventCommand", {
                    get: function () {
                        return this._tabsEventCommand;
                    },
                    set: function (v) {
                        var old = this._tabsEventCommand;
                        if (v !== old) {
                            if (!!old) {
                                this._destroyTabs();
                            }
                            this._tabsEventCommand = v;
                            if (!!this._tabsEventCommand)
                                this._createTabs();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return TabsElView;
            })(BaseElView);
            baseElView.TabsElView = TabsElView;

            RIAPP.global.registerType('BaseElView', BaseElView);
            RIAPP.global.registerType('InputElView', InputElView);
            RIAPP.global.registerType('CommandElView', CommandElView);
            RIAPP.global.registerType('TemplateElView', TemplateElView);
            RIAPP.global.registerElView('template', TemplateElView);
            RIAPP.global.registerType('BusyElView', BusyElView);
            RIAPP.global.registerElView('busy_indicator', BusyElView);
            RIAPP.global.registerType('DynaContentElView', DynaContentElView);
            RIAPP.global.registerElView(RIAPP.global.consts.ELVIEW_NM.DYNACONT, DynaContentElView);
            RIAPP.global.registerType('CheckBoxElView', CheckBoxElView);
            RIAPP.global.registerElView('input:checkbox', CheckBoxElView);
            RIAPP.global.registerElView('threeState', CheckBoxThreeStateElView);
            RIAPP.global.registerType('TextBoxElView', TextBoxElView);
            RIAPP.global.registerElView('input:text', TextBoxElView);
            RIAPP.global.registerType('HiddenElView', HiddenElView);
            RIAPP.global.registerElView('input:hidden', HiddenElView);
            RIAPP.global.registerType('TextAreaElView', TextAreaElView);
            RIAPP.global.registerElView('textarea', TextAreaElView);
            RIAPP.global.registerType('RadioElView', RadioElView);
            RIAPP.global.registerElView('input:radio', RadioElView);
            RIAPP.global.registerType('ButtonElView', ButtonElView);
            RIAPP.global.registerElView('input:button', ButtonElView);
            RIAPP.global.registerElView('input:submit', ButtonElView);
            RIAPP.global.registerElView('button', ButtonElView);
            RIAPP.global.registerType('AnchorElView', AnchorElView);
            RIAPP.global.registerElView('a', AnchorElView);
            RIAPP.global.registerElView('abutton', AnchorElView);
            RIAPP.global.registerType('ExpanderElView', ExpanderElView);
            RIAPP.global.registerElView('expander', ExpanderElView);
            RIAPP.global.registerType('SpanElView', SpanElView);
            RIAPP.global.registerElView('span', SpanElView);
            RIAPP.global.registerType('BlockElView', BlockElView);
            RIAPP.global.registerElView('div', BlockElView);
            RIAPP.global.registerElView('section', BlockElView);
            RIAPP.global.registerElView('block', BlockElView);
            RIAPP.global.registerType('ImgElView', ImgElView);
            RIAPP.global.registerElView('img', ImgElView);
            RIAPP.global.registerType('TabsElView', TabsElView);
            RIAPP.global.registerElView('tabs', TabsElView);

            RIAPP.global.onModuleLoaded('baseElView', baseElView);
        })(MOD.baseElView || (MOD.baseElView = {}));
        var baseElView = MOD.baseElView;
    })(RIAPP.MOD || (RIAPP.MOD = {}));
    var MOD = RIAPP.MOD;
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    (function (MOD) {
        (function (binding) {
            'use strict';

            var utils = RIAPP.global.utils, consts = RIAPP.global.consts;

            binding.BINDING_MODE = ['OneTime', 'OneWay', 'TwoWay'];

            function _checkIsErrorNotification(obj) {
                if (!obj)
                    return false;
                if (!utils.check.isFunction(obj.getIErrorNotification))
                    return false;
                var tmp = obj.getIErrorNotification();
                return !!tmp && utils.check.isFunction(tmp.getIErrorNotification);
            }
            binding._checkIsErrorNotification = _checkIsErrorNotification;

            var ValidationError = (function (_super) {
                __extends(ValidationError, _super);
                function ValidationError(errorInfo, item) {
                    var message = RIAPP.ERRS.ERR_VALIDATION + '\r\n', i = 0;
                    errorInfo.forEach(function (err) {
                        if (i > 0)
                            message = message + '\r\n';
                        if (!!err.fieldName)
                            message = message + ' ' + RIAPP.localizable.TEXT.txtField + ': ' + err.fieldName + ' -> ' + err.errors.join(', '); else
                            message = message + err.errors.join(', ');
                        i += 1;
                    });
                    _super.call(this, message);
                    this._errors = errorInfo;
                    this._item = item;
                }
                Object.defineProperty(ValidationError.prototype, "item", {
                    get: function () {
                        return this._item;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ValidationError.prototype, "errors", {
                    get: function () {
                        return this._errors;
                    },
                    enumerable: true,
                    configurable: true
                });
                return ValidationError;
            })(RIAPP.MOD.errors.BaseError);
            binding.ValidationError = ValidationError;
            ;

            var Binding = (function (_super) {
                __extends(Binding, _super);
                function Binding(options) {
                    _super.call(this);
                    var opts = utils.extend(false, {
                        target: null,
                        source: null,
                        targetPath: null,
                        sourcePath: null,
                        mode: binding.BINDING_MODE[1],
                        converter: null,
                        converterParam: null,
                        isSourceFixed: false
                    }, options);

                    if (!opts.target) {
                        throw new Error(RIAPP.ERRS.ERR_BIND_TARGET_EMPTY);
                    }

                    if (!utils.check.isString(opts.targetPath)) {
                        throw new Error(utils.format(RIAPP.ERRS.ERR_BIND_TGTPATH_INVALID, opts.targetPath));
                    }

                    if (binding.BINDING_MODE.indexOf(opts.mode) < 0) {
                        throw new Error(utils.format(RIAPP.ERRS.ERR_BIND_MODE_INVALID, opts.mode));
                    }

                    if (!utils.check.isBaseObj(opts.target)) {
                        throw new Error(RIAPP.ERRS.ERR_BIND_TARGET_INVALID);
                    }

                    this._state = null;
                    this._mode = opts.mode;
                    this._converter = opts.converter || RIAPP.global._getConverter('BaseConverter');
                    this._converterParam = opts.converterParam;
                    this._srcPath = RIAPP.global.parser._getPathParts(opts.sourcePath);
                    this._tgtPath = RIAPP.global.parser._getPathParts(opts.targetPath);
                    if (this._tgtPath.length < 1)
                        throw new Error(utils.format(RIAPP.ERRS.ERR_BIND_TGTPATH_INVALID, opts.targetPath));
                    this._isSourceFixed = (!!opts.isSourceFixed);
                    this._bounds = {};
                    this._objId = 'bnd' + utils.getNewID();
                    this._ignoreSrcChange = false;
                    this._ignoreTgtChange = false;
                    this._sourceObj = null;
                    this._targetObj = null;
                    this._source = null;
                    this._target = null;
                    this.target = opts.target;
                    this.source = opts.source;
                    if (!!this._sourceObj && utils.check.isFunction(this._sourceObj.getIErrorNotification)) {
                        if ((this._sourceObj).getIsHasErrors())
                            this._onSrcErrorsChanged();
                    }
                }
                Binding.create = function (options) {
                    return new Binding(options);
                };
                Binding.prototype._getOnTgtDestroyedProxy = function () {
                    var self = this;
                    return function (s, a) {
                        self._onTgtDestroyed(s, a);
                    };
                };
                Binding.prototype._getOnSrcDestroyedProxy = function () {
                    var self = this;
                    return function (s, a) {
                        self._onSrcDestroyed(s, a);
                    };
                };
                Binding.prototype._getUpdTgtProxy = function () {
                    var self = this;
                    return function () {
                        self._updateTarget();
                    };
                };
                Binding.prototype._getUpdSrcProxy = function () {
                    var self = this;
                    return function () {
                        self._updateSource();
                    };
                };
                Binding.prototype._getSrcErrChangedProxy = function () {
                    var self = this;
                    return function (s, a) {
                        self._onSrcErrorsChanged();
                    };
                };
                Binding.prototype._onSrcErrorsChanged = function () {
                    var errors = [], tgt = this._targetObj, src = this._sourceObj, srcPath = this._srcPath;
                    if (!!tgt && utils.check.isElView(tgt)) {
                        if (!!src && srcPath.length > 0) {
                            var prop = srcPath[srcPath.length - 1];
                            errors = (src).getFieldErrors(prop);
                        }
                        (tgt).validationErrors = errors;
                    }
                };
                Binding.prototype._onError = function (error, source) {
                    var isHandled = _super.prototype._onError.call(this, error, source);
                    if (!isHandled) {
                        return RIAPP.global._onError(error, source);
                    }
                    return isHandled;
                };
                Binding.prototype._getTgtChangedFn = function (self, obj, prop, restPath, lvl) {
                    var fn = function (sender, data) {
                        var val = RIAPP.global.parser._resolveProp(obj, prop);
                        if (restPath.length > 0) {
                            self._checkBounded(null, 'target', lvl, restPath);
                        }
                        self._parseTgtPath(val, restPath, lvl);
                    };
                    return fn;
                };
                Binding.prototype._getSrcChangedFn = function (self, obj, prop, restPath, lvl) {
                    var fn = function (sender, data) {
                        var val = RIAPP.global.parser._resolveProp(obj, prop);
                        if (restPath.length > 0) {
                            self._checkBounded(null, 'source', lvl, restPath);
                        }
                        self._parseSrcPath(val, restPath, lvl);
                    };
                    return fn;
                };
                Binding.prototype._parseSrcPath = function (obj, path, lvl) {
                    var self = this;
                    self._sourceObj = null;
                    if (path.length === 0) {
                        self._sourceObj = obj;
                    } else
                        self._parseSrcPath2(obj, path, lvl);
                    if (!!self._targetObj)
                        self._updateTarget();
                };
                Binding.prototype._parseSrcPath2 = function (obj, path, lvl) {
                    var self = this, nextObj;
                    var isBaseObj = (!!obj && utils.check.isBaseObj(obj));

                    if (isBaseObj) {
                        obj.addOnDestroyed(self._getOnSrcDestroyedProxy(), self._objId);
                        self._checkBounded(obj, 'source', lvl, path);
                    }

                    if (path.length > 1) {
                        if (isBaseObj) {
                            obj.addOnPropertyChange(path[0], self._getSrcChangedFn(self, obj, path[0], path.slice(1), lvl + 1), self._objId);
                        }

                        if (!!obj) {
                            nextObj = RIAPP.global.parser._resolveProp(obj, path[0]);
                            if (!!nextObj)
                                self._parseSrcPath2(nextObj, path.slice(1), lvl + 1);
                        }
                        return;
                    }

                    if (!!obj && path.length === 1) {
                        var updateOnChange = (self._mode === binding.BINDING_MODE[1] || self._mode === binding.BINDING_MODE[2]);
                        if (updateOnChange && isBaseObj) {
                            obj.addOnPropertyChange(path[0], self._getUpdTgtProxy(), this._objId);
                        }
                        if (!!obj && utils.check.isFunction(obj.getIErrorNotification)) {
                            (obj).addOnErrorsChanged(self._getSrcErrChangedProxy(), self._objId);
                        }
                        this._sourceObj = obj;
                    }
                };
                Binding.prototype._parseTgtPath = function (obj, path, lvl) {
                    var self = this;
                    self._targetObj = null;
                    if (path.length === 0) {
                        self._targetObj = obj;
                    } else
                        self._parseTgtPath2(obj, path, lvl);
                    if (!!self._targetObj)
                        self._updateTarget();
                };
                Binding.prototype._parseTgtPath2 = function (obj, path, lvl) {
                    var self = this, nextObj;
                    var isBaseObj = (!!obj && utils.check.isBaseObj(obj));

                    if (isBaseObj) {
                        obj.addOnDestroyed(self._getOnTgtDestroyedProxy(), self._objId);
                        self._checkBounded(obj, 'target', lvl, path);
                    }

                    if (path.length > 1) {
                        if (isBaseObj) {
                            obj.addOnPropertyChange(path[0], self._getTgtChangedFn(self, obj, path[0], path.slice(1), lvl + 1), self._objId);
                        }
                        if (!!obj) {
                            nextObj = RIAPP.global.parser._resolveProp(obj, path[0]);
                            if (!!nextObj)
                                self._parseTgtPath2(nextObj, path.slice(1), lvl + 1);
                        }
                        return;
                    }

                    if (!!obj && path.length === 1) {
                        var updateOnChange = (self._mode === binding.BINDING_MODE[2]);
                        if (updateOnChange && isBaseObj) {
                            obj.addOnPropertyChange(path[0], self._getUpdSrcProxy(), this._objId);
                        }
                        self._targetObj = obj;
                    }
                };
                Binding.prototype._checkBounded = function (obj, to, lvl, restPath) {
                    var old, key;
                    if (to === 'source') {
                        key = 's' + lvl;
                    } else if (to === 'target') {
                        key = 't' + lvl;
                    } else
                        throw new Error(utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'to', to));

                    old = this._bounds[key];
                    if (!!old) {
                        old.removeNSHandlers(this._objId);
                        delete this._bounds[key];
                    }

                    if (restPath.length > 0) {
                        this._checkBounded(null, to, lvl + 1, restPath.slice(1));
                    }

                    if (!!obj) {
                        this._bounds[key] = obj;
                    }
                };
                Binding.prototype._onTgtDestroyed = function (sender, args) {
                    if (this._isDestroyCalled)
                        return;
                    this.target = null;
                };
                Binding.prototype._onSrcDestroyed = function (sender, args) {
                    var self = this;
                    if (self._isDestroyCalled)
                        return;
                    if (sender === self.source)
                        self.source = null; else {
                        self._checkBounded(null, 'source', 0, self._srcPath);
                        setTimeout(function () {
                            if (self._isDestroyCalled)
                                return;

                            self._bindToSource();
                        }, 0);
                    }
                };
                Binding.prototype._bindToSource = function () {
                    this._parseSrcPath(this.source, this._srcPath, 0);
                };
                Binding.prototype._bindToTarget = function () {
                    this._parseTgtPath(this.target, this._tgtPath, 0);
                };
                Binding.prototype._updateTarget = function () {
                    if (this._ignoreSrcChange)
                        return;
                    this._ignoreTgtChange = true;
                    try  {
                        var res = this._converter.convertToTarget(this.sourceValue, this._converterParam, this._sourceObj);
                        if (res !== undefined)
                            this.targetValue = res;
                    } catch (ex) {
                        RIAPP.global.reThrow(ex, this._onError(ex, this));
                    } finally {
                        this._ignoreTgtChange = false;
                    }
                };
                Binding.prototype._updateSource = function () {
                    if (this._ignoreTgtChange)
                        return;
                    this._ignoreSrcChange = true;
                    try  {
                        var res = this._converter.convertToSource(this.targetValue, this._converterParam, this._sourceObj);
                        if (res !== undefined)
                            this.sourceValue = res;
                    } catch (ex) {
                        if (!(ex instanceof ValidationError) || !utils.check.isElView(this._targetObj)) {
                            this._updateTarget();
                            if (!this._onError(ex, this))
                                throw ex;
                        }
                    } finally {
                        this._ignoreSrcChange = false;
                    }
                };
                Binding.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    var self = this;
                    utils.forEachProp(this._bounds, function (key) {
                        var old = self._bounds[key];
                        old.removeNSHandlers(self._objId);
                    });
                    this._bounds = {};
                    this.source = null;
                    this.target = null;
                    this._state = null;
                    this._converter = null;
                    this._converterParam = null;
                    this._srcPath = null;
                    this._tgtPath = null;
                    this._sourceObj = null;
                    this._targetObj = null;
                    this._source = null;
                    this._target = null;
                    _super.prototype.destroy.call(this);
                };
                Binding.prototype.toString = function () {
                    return 'Binding';
                };

                Object.defineProperty(Binding.prototype, "bindingID", {
                    get: function () {
                        return this._objId;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Binding.prototype, "target", {
                    get: function () {
                        return this._target;
                    },
                    set: function (v) {
                        if (!!this._state) {
                            this._state.target = v;
                            return;
                        }
                        if (this._target !== v) {
                            if (!!this._targetObj && !this._targetObj._isDestroyCalled) {
                                this._ignoreTgtChange = true;
                                try  {
                                    this.targetValue = null;
                                } finally {
                                    this._ignoreTgtChange = false;
                                }
                            }
                            this._checkBounded(null, 'target', 0, this._tgtPath);
                            if (!!v && !utils.check.isBaseObj(v))
                                throw new Error(RIAPP.ERRS.ERR_BIND_TARGET_INVALID);
                            this._target = v;
                            this._bindToTarget();
                            if (!!this._target && !this._targetObj)
                                throw new Error(utils.format(RIAPP.ERRS.ERR_BIND_TGTPATH_INVALID, this._tgtPath.join('.')));
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Binding.prototype, "source", {
                    get: function () {
                        return this._source;
                    },
                    set: function (v) {
                        if (!!this._state) {
                            this._state.source = v;
                            return;
                        }
                        if (this._source !== v) {
                            this._checkBounded(null, 'source', 0, this._srcPath);
                            this._source = v;
                            this._bindToSource();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Binding.prototype, "targetPath", {
                    get: function () {
                        return this._tgtPath;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Binding.prototype, "sourcePath", {
                    get: function () {
                        return this._srcPath;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Binding.prototype, "sourceValue", {
                    get: function () {
                        if (this._srcPath.length === 0)
                            return this._sourceObj;
                        if (this._sourceObj === null)
                            return null;
                        var prop = this._srcPath[this._srcPath.length - 1];
                        var res = RIAPP.global.parser._resolveProp(this._sourceObj, prop);
                        return res;
                    },
                    set: function (v) {
                        if (this._srcPath.length === 0 || this._sourceObj === null)
                            return;
                        var prop = this._srcPath[this._srcPath.length - 1];
                        RIAPP.global.parser._setPropertyValue(this._sourceObj, prop, v);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Binding.prototype, "targetValue", {
                    get: function () {
                        if (this._targetObj === null)
                            return null;
                        var prop = this._tgtPath[this._tgtPath.length - 1];
                        return RIAPP.global.parser._resolveProp(this._targetObj, prop);
                    },
                    set: function (v) {
                        if (this._targetObj === null)
                            return;
                        var prop = this._tgtPath[this._tgtPath.length - 1];
                        RIAPP.global.parser._setPropertyValue(this._targetObj, prop, v);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Binding.prototype, "mode", {
                    get: function () {
                        return this._mode;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Binding.prototype, "converter", {
                    get: function () {
                        return this._converter;
                    },
                    set: function (v) {
                        this._converter = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Binding.prototype, "converterParam", {
                    get: function () {
                        return this._converterParam;
                    },
                    set: function (v) {
                        this._converterParam = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Binding.prototype, "isSourceFixed", {
                    get: function () {
                        return this._isSourceFixed;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Binding.prototype, "isDisabled", {
                    get: function () {
                        return !!this._state;
                    },
                    set: function (v) {
                        var s;
                        v = !!v;
                        if (this.isDisabled != v) {
                            if (v) {
                                s = { source: this._source, target: this._target };
                                try  {
                                    this.target = null;
                                    this.source = null;
                                } finally {
                                    this._state = s;
                                }
                            } else {
                                s = this._state;
                                this._state = null;
                                this.target = s.target;
                                this.source = s.source;
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return Binding;
            })(RIAPP.BaseObject);
            binding.Binding = Binding;
            ;

            RIAPP.global.registerType('ValidationError', ValidationError);
            RIAPP.global.registerType('Binding', Binding);
            RIAPP.global.onModuleLoaded('binding', binding);
        })(MOD.binding || (MOD.binding = {}));
        var binding = MOD.binding;
    })(RIAPP.MOD || (RIAPP.MOD = {}));
    var MOD = RIAPP.MOD;
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    (function (MOD) {
        (function (collection) {
            var utils = RIAPP.global.utils, ValidationError = MOD.binding.ValidationError;

            collection.consts = {
                DATA_TYPE: RIAPP.MOD.consts.DATA_TYPE,
                DATE_CONVERSION: RIAPP.MOD.consts.DATE_CONVERSION,
                SORT_ORDER: { ASC: 0, DESC: 1 },
                COLL_CHANGE_TYPE: { REMOVE: '0', ADDED: '1', RESET: '2', REMAP_KEY: '3' }
            };
            var DATA_TYPE = collection.consts.DATA_TYPE, COLL_CHANGE_TYPE = collection.consts.COLL_CHANGE_TYPE, valueUtils = RIAPP.MOD.utils.valueUtils;
            ;

            ;

            var CollectionItem = (function (_super) {
                __extends(CollectionItem, _super);
                function CollectionItem() {
                    _super.call(this);
                    this._fkey = null;
                    this._isEditing = false;
                    this._saveVals = null;
                    this._vals = {};
                    this._notEdited = true;
                }
                CollectionItem.prototype._getEventNames = function () {
                    var base_events = _super.prototype._getEventNames.call(this);
                    return ['errors_changed'].concat(base_events);
                };
                CollectionItem.prototype.addOnErrorsChanged = function (fn, namespace) {
                    this.addHandler('errors_changed', fn, namespace);
                };
                CollectionItem.prototype.removeOnErrorsChanged = function (namespace) {
                    this.removeHandler('errors_changed', namespace);
                };
                CollectionItem.prototype._onErrorsChanged = function (args) {
                    this.raiseEvent('errors_changed', args);
                };
                CollectionItem.prototype._onError = function (error, source) {
                    var isHandled = _super.prototype._onError.call(this, error, source);
                    if (!isHandled) {
                        return this._collection._onError(error, source);
                    }
                    return isHandled;
                };
                CollectionItem.prototype._beginEdit = function () {
                    var coll = this._collection, isHandled;
                    if (coll.isEditing) {
                        var eitem = coll._EditingItem;
                        if (eitem === this)
                            return false;
                        try  {
                            eitem.endEdit();
                            if (eitem.getIsHasErrors()) {
                                this._onError(new ValidationError(eitem.getAllErrors(), eitem), eitem);
                                eitem.cancelEdit();
                            }
                        } catch (ex) {
                            isHandled = this._onError(ex, eitem);
                            eitem.cancelEdit();
                            RIAPP.global.reThrow(ex, isHandled);
                        }
                    }
                    this._isEditing = true;
                    this._saveVals = utils.shallowCopy(this._vals);
                    this._collection.currentItem = this;
                    return true;
                };
                CollectionItem.prototype._endEdit = function () {
                    if (!this._isEditing)
                        return false;
                    var validation_errors, coll = this._collection, self = this;
                    if (this.getIsHasErrors()) {
                        return false;
                    }
                    coll._removeAllErrors(this);
                    validation_errors = this._validateAll();
                    if (validation_errors.length > 0) {
                        coll._addErrors(self, validation_errors);
                    }
                    if (this.getIsHasErrors()) {
                        return false;
                    }
                    this._isEditing = false;
                    this._saveVals = null;
                    return true;
                };
                CollectionItem.prototype._validate = function () {
                    return this._collection._validateItem(this);
                };
                CollectionItem.prototype._skipValidate = function (fieldInfo, val) {
                    return false;
                };
                CollectionItem.prototype._validateField = function (fieldName) {
                    var val, fieldInfo = this.getFieldInfo(fieldName), res = null;
                    try  {
                        val = this._vals[fieldName];
                        if (this._skipValidate(fieldInfo, val))
                            return res;
                        if (this._isNew) {
                            if (val === null && !fieldInfo.isNullable && !fieldInfo.isReadOnly && !fieldInfo.isAutoGenerated)
                                throw new Error(RIAPP.ERRS.ERR_FIELD_ISNOT_NULLABLE);
                        } else {
                            if (val === null && !fieldInfo.isNullable && !fieldInfo.isReadOnly)
                                throw new Error(RIAPP.ERRS.ERR_FIELD_ISNOT_NULLABLE);
                        }
                    } catch (ex) {
                        res = { fieldName: fieldName, errors: [ex.message] };
                    }
                    var tmp = this._collection._validateItemField(this, fieldName);
                    if (!!res && !!tmp) {
                        res.errors = res.errors.concat(tmp.errors);
                    } else if (!!tmp)
                        res = tmp;
                    return res;
                };
                CollectionItem.prototype._validateAll = function () {
                    var self = this, fields = this.getFieldNames(), errs = [];
                    fields.forEach(function (fieldName) {
                        var res = self._validateField(fieldName);
                        if (!!res) {
                            errs.push(res);
                        }
                    });
                    var res = self._validate();
                    if (!!res) {
                        errs.push(res);
                    }
                    return errs;
                };
                CollectionItem.prototype._checkVal = function (fieldInfo, val) {
                    var res = val, ERRS = RIAPP.ERRS;
                    if (this._skipValidate(fieldInfo, val))
                        return res;
                    if (fieldInfo.isReadOnly && !(fieldInfo.allowClientDefault && this._isNew))
                        throw new Error(ERRS.ERR_FIELD_READONLY);
                    if ((val === null || (utils.check.isString(val) && !val)) && !fieldInfo.isNullable)
                        throw new Error(ERRS.ERR_FIELD_ISNOT_NULLABLE);

                    if (val === null)
                        return val;

                    switch (fieldInfo.dataType) {
                        case DATA_TYPE.None:
                            break;
                        case DATA_TYPE.Guid:
                        case DATA_TYPE.String:
                            if (!utils.check.isString(val)) {
                                throw new Error(utils.format(ERRS.ERR_FIELD_WRONG_TYPE, val, 'String'));
                            }
                            if (fieldInfo.maxLength > 0 && val.length > fieldInfo.maxLength)
                                throw new Error(utils.format(ERRS.ERR_FIELD_MAXLEN, fieldInfo.maxLength));
                            if (fieldInfo.isNullable && val === '')
                                res = null;
                            if (!!fieldInfo.regex) {
                                var reg = new RegExp(fieldInfo.regex, "i");
                                if (!reg.test(val)) {
                                    throw new Error(utils.format(ERRS.ERR_FIELD_REGEX, val));
                                }
                            }
                            break;
                        case DATA_TYPE.Binary:
                            if (!utils.check.isArray(val)) {
                                throw new Error(utils.format(ERRS.ERR_FIELD_WRONG_TYPE, val, 'Array'));
                            }
                            if (fieldInfo.maxLength > 0 && val.length > fieldInfo.maxLength)
                                throw new Error(utils.format(ERRS.ERR_FIELD_MAXLEN, fieldInfo.maxLength));
                            break;
                        case DATA_TYPE.Bool:
                            if (!utils.check.isBoolean(val))
                                throw new Error(utils.format(ERRS.ERR_FIELD_WRONG_TYPE, val, 'Boolean'));
                            break;
                        case DATA_TYPE.Integer:
                        case DATA_TYPE.Decimal:
                        case DATA_TYPE.Float:
                            if (!utils.check.isNumber(val))
                                throw new Error(utils.format(ERRS.ERR_FIELD_WRONG_TYPE, val, 'Number'));
                            if (!!fieldInfo.range) {
                                utils.validation.checkNumRange(Number(val), fieldInfo.range);
                            }
                            break;
                        case DATA_TYPE.DateTime:
                        case DATA_TYPE.Date:
                            if (!utils.check.isDate(val))
                                throw new Error(utils.format(ERRS.ERR_FIELD_WRONG_TYPE, val, 'Date'));
                            if (!!fieldInfo.range) {
                                utils.validation.checkDateRange(val, fieldInfo.range);
                            }
                            break;
                        case DATA_TYPE.Time:
                            if (!utils.check.isDate(val))
                                throw new Error(utils.format(ERRS.ERR_FIELD_WRONG_TYPE, val, 'Time'));
                            break;
                        default:
                            throw new Error(utils.format(ERRS.ERR_PARAM_INVALID, 'dataType', fieldInfo.dataType));
                    }
                    return res;
                };
                CollectionItem.prototype._resetIsNew = function () {
                };
                CollectionItem.prototype._onAttaching = function () {
                };
                CollectionItem.prototype._onAttach = function () {
                };
                CollectionItem.prototype.getFieldInfo = function (fieldName) {
                    return this._collection.getFieldInfo(fieldName);
                };
                CollectionItem.prototype.getFieldNames = function () {
                    return this._collection.getFieldNames();
                };
                CollectionItem.prototype.getFieldErrors = function (fieldName) {
                    var itemErrors = this._collection._getErrors(this);
                    if (!itemErrors)
                        return [];
                    var name = fieldName;
                    if (!fieldName)
                        fieldName = '*';
                    if (!itemErrors[fieldName])
                        return [];
                    if (fieldName == '*')
                        name = null;
                    return [
                        { fieldName: name, errors: itemErrors[fieldName] }
                    ];
                };
                CollectionItem.prototype.getAllErrors = function () {
                    var itemErrors = this._collection._getErrors(this);
                    if (!itemErrors)
                        return [];
                    var res = [];
                    utils.forEachProp(itemErrors, function (name) {
                        var fieldName = null;
                        if (name !== '*') {
                            fieldName = name;
                        }
                        res.push({ fieldName: fieldName, errors: itemErrors[name] });
                    });
                    return res;
                };
                CollectionItem.prototype.getErrorString = function () {
                    var itemErrors = this._collection._getErrors(this);
                    if (!itemErrors)
                        return '';
                    var res = [];
                    utils.forEachProp(itemErrors, function (name) {
                        res.push(utils.format('{0}: {1}', name, itemErrors[name]));
                    });
                    return res.join('|');
                };
                CollectionItem.prototype.submitChanges = function () {
                    var deffered = utils.createDeferred();
                    deffered.reject();
                    return deffered.promise();
                };
                CollectionItem.prototype.beginEdit = function () {
                    var coll = this._collection;
                    if (!this._beginEdit())
                        return false;
                    coll._onEditing(this, true, false);
                    this.raisePropertyChanged('isEditing');
                    return true;
                };
                CollectionItem.prototype.endEdit = function () {
                    var coll = this._collection;
                    if (!this._endEdit())
                        return false;
                    coll._onEditing(this, false, false);
                    this._notEdited = false;
                    this.raisePropertyChanged('isEditing');
                    return true;
                };
                CollectionItem.prototype.cancelEdit = function () {
                    if (!this._isEditing)
                        return false;
                    var coll = this._collection, isNew = this._isNew;
                    var changes = this._saveVals;
                    this._vals = this._saveVals;
                    this._saveVals = null;
                    coll._removeAllErrors(this);

                    coll.getFieldNames().forEach(function (name) {
                        if (changes[name] !== this._vals[name])
                            this.raisePropertyChanged(name);
                    }, this);

                    if (isNew && this._notEdited)
                        coll.removeItem(this);

                    this._isEditing = false;
                    coll._onEditing(this, false, true);
                    this.raisePropertyChanged('isEditing');
                    return true;
                };
                CollectionItem.prototype.deleteItem = function () {
                    var coll = this._collection;
                    if (this._key === null)
                        return false;
                    if (!coll._onItemDeleting(this)) {
                        return false;
                    }
                    coll.removeItem(this);
                    return true;
                };
                CollectionItem.prototype.getIsNew = function () {
                    return this._isNew;
                };
                CollectionItem.prototype.getIsDeleted = function () {
                    return this._isDeleted;
                };
                CollectionItem.prototype.getKey = function () {
                    return this._key;
                };
                CollectionItem.prototype.getCollection = function () {
                    return this._collection;
                };
                CollectionItem.prototype.getIsEditing = function () {
                    return this._isEditing;
                };
                CollectionItem.prototype.getIsHasErrors = function () {
                    var itemErrors = this._collection._getErrors(this);
                    return !!itemErrors;
                };
                CollectionItem.prototype.getIErrorNotification = function () {
                    return this;
                };
                CollectionItem.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._fkey = null;
                    this._saveVals = null;
                    this._vals = {};
                    this._isEditing = false;
                    _super.prototype.destroy.call(this);
                };
                CollectionItem.prototype.toString = function () {
                    return 'CollectionItem';
                };
                Object.defineProperty(CollectionItem.prototype, "_isCanSubmit", {
                    get: function () {
                        return false;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CollectionItem.prototype, "_changeType", {
                    get: function () {
                        return 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CollectionItem.prototype, "_isNew", {
                    get: function () {
                        return false;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CollectionItem.prototype, "_isDeleted", {
                    get: function () {
                        return false;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CollectionItem.prototype, "_key", {
                    get: function () {
                        return this._fkey;
                    },
                    set: function (v) {
                        if (v !== null)
                            v = '' + v;
                        this._fkey = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CollectionItem.prototype, "_collection", {
                    get: function () {
                        return null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CollectionItem.prototype, "_isUpdating", {
                    get: function () {
                        var coll = this._collection;
                        if (!coll)
                            return false;
                        return coll.isUpdating;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CollectionItem.prototype, "isEditing", {
                    get: function () {
                        return this._isEditing;
                    },
                    enumerable: true,
                    configurable: true
                });
                return CollectionItem;
            })(RIAPP.BaseObject);
            collection.CollectionItem = CollectionItem;
            ;

            ;

            var Collection = (function (_super) {
                __extends(Collection, _super);
                function Collection() {
                    _super.call(this);
                    this._options = { enablePaging: false, pageSize: 50 };
                    this._isLoading = false;
                    this._EditingItem = null;
                    this._perms = { canAddRow: true, canEditRow: true, canDeleteRow: true, canRefreshRow: false };

                    this._totalCount = 0;
                    this._pageIndex = 0;
                    this._items = [];
                    this._itemsByKey = {};
                    this._currentPos = -1;
                    this._newKey = 0;
                    this._fieldMap = {};
                    this._errors = {};
                    this._ignoreChangeErrors = false;
                    this._pkInfo = null;
                    this._isUpdating = false;
                    this._waitQueue = new RIAPP.MOD.utils.WaitQueue(this);
                }
                Collection.getEmptyFieldInfo = function (fieldName) {
                    var fieldInfo = {
                        isPrimaryKey: 0,
                        isRowTimeStamp: false,
                        dataType: DATA_TYPE.None,
                        isNullable: true,
                        maxLength: -1,
                        isReadOnly: false,
                        isAutoGenerated: false,
                        allowClientDefault: false,
                        dateConversion: collection.consts.DATE_CONVERSION.None,
                        isClientOnly: true,
                        isCalculated: false,
                        isNeedOriginal: false,
                        dependentOn: null,
                        range: null,
                        regex: null,
                        isNavigation: false,
                        fieldName: fieldName
                    };
                    return fieldInfo;
                };
                Collection.prototype._getEventNames = function () {
                    var base_events = _super.prototype._getEventNames.call(this);
                    return [
                        'begin_edit',
                        'end_edit',
                        'fill',
                        'coll_changed',
                        'item_deleting',
                        'item_adding',
                        'item_added',
                        'validate',
                        'current_changing',
                        'page_changing',
                        'errors_changed',
                        'status_changed',
                        'clearing',
                        'cleared',
                        'commit_changes'
                    ].concat(base_events);
                };
                Collection.prototype.addOnClearing = function (fn, namespace) {
                    this.addHandler('clearing', fn, namespace);
                };
                Collection.prototype.removeOnClearing = function (namespace) {
                    this.removeHandler('clearing', namespace);
                };
                Collection.prototype.addOnCleared = function (fn, namespace) {
                    this.addHandler('cleared', fn, namespace);
                };
                Collection.prototype.removeOnCleared = function (namespace) {
                    this.removeHandler('cleared', namespace);
                };
                Collection.prototype.addOnFill = function (fn, namespace) {
                    this.addHandler('fill', fn, namespace);
                };
                Collection.prototype.removeOnFill = function (namespace) {
                    this.removeHandler('fill', namespace);
                };
                Collection.prototype.addOnCollChanged = function (fn, namespace) {
                    this.addHandler('coll_changed', fn, namespace);
                };
                Collection.prototype.removeOnCollChanged = function (namespace) {
                    this.removeHandler('coll_changed', namespace);
                };
                Collection.prototype.addOnValidate = function (fn, namespace) {
                    this.addHandler('validate', fn, namespace);
                };
                Collection.prototype.removeOnValidate = function (namespace) {
                    this.removeHandler('validate', namespace);
                };
                Collection.prototype.addOnItemDeleting = function (fn, namespace) {
                    this.addHandler('item_deleting', fn, namespace);
                };
                Collection.prototype.removeOnItemDeleting = function (namespace) {
                    this.removeHandler('item_deleting', namespace);
                };
                Collection.prototype.addOnItemAdding = function (fn, namespace) {
                    this.addHandler('item_adding', fn, namespace);
                };
                Collection.prototype.removeOnItemAdding = function (namespace) {
                    this.removeHandler('item_adding', namespace);
                };
                Collection.prototype.addOnItemAdded = function (fn, namespace) {
                    this.addHandler('item_added', fn, namespace);
                };
                Collection.prototype.removeOnItemAdded = function (namespace) {
                    this.removeHandler('item_added', namespace);
                };
                Collection.prototype.addOnCurrentChanging = function (fn, namespace) {
                    this.addHandler('current_changing', fn, namespace);
                };
                Collection.prototype.removeOnCurrentChanging = function (namespace) {
                    this.removeHandler('current_changing', namespace);
                };
                Collection.prototype.addOnPageChanging = function (fn, namespace) {
                    this.addHandler('page_changing', fn, namespace);
                };
                Collection.prototype.removeOnPageChanging = function (namespace) {
                    this.removeHandler('page_changing', namespace);
                };
                Collection.prototype.addOnErrorsChanged = function (fn, namespace) {
                    this.addHandler('errors_changed', fn, namespace);
                };
                Collection.prototype.removeOnErrorsChanged = function (namespace) {
                    this.removeHandler('errors_changed', namespace);
                };
                Collection.prototype.addOnBeginEdit = function (fn, namespace) {
                    this.addHandler('begin_edit', fn, namespace);
                };
                Collection.prototype.removeOnBeginEdit = function (namespace) {
                    this.removeHandler('begin_edit', namespace);
                };
                Collection.prototype.addOnEndEdit = function (fn, namespace) {
                    this.addHandler('end_edit', fn, namespace);
                };
                Collection.prototype.removeOnEndEdit = function (namespace) {
                    this.removeHandler('end_edit', namespace);
                };
                Collection.prototype.addOnCommitChanges = function (fn, namespace) {
                    this.addHandler('commit_changes', fn, namespace);
                };
                Collection.prototype.removeOnCommitChanges = function (namespace) {
                    this.removeHandler('commit_changes', namespace);
                };
                Collection.prototype.addOnStatusChanged = function (fn, namespace) {
                    this.addHandler('status_changed', fn, namespace);
                };
                Collection.prototype.removeOnStatusChanged = function (namespace) {
                    this.removeHandler('status_changed', namespace);
                };
                Collection.prototype._getStrValue = function (val, fieldInfo) {
                    var dcnv = fieldInfo.dateConversion, stz = utils.get_timeZoneOffset();
                    return valueUtils.stringifyValue(val, dcnv, stz);
                };
                Collection.prototype._getPKFieldInfos = function () {
                    if (!!this._pkInfo)
                        return this._pkInfo;
                    var fldMap = this._fieldMap, pk = [];
                    utils.forEachProp(fldMap, function (fldName) {
                        if (fldMap[fldName].isPrimaryKey > 0) {
                            pk.push(fldMap[fldName]);
                        }
                    });
                    pk.sort(function (a, b) {
                        return a.isPrimaryKey - b.isPrimaryKey;
                    });
                    this._pkInfo = pk;
                    return this._pkInfo;
                };
                Collection.prototype._onError = function (error, source) {
                    var isHandled = _super.prototype._onError.call(this, error, source);
                    if (!isHandled) {
                        return RIAPP.global._onError(error, source);
                    }
                    return isHandled;
                };
                Collection.prototype._onCurrentChanging = function (newCurrent) {
                    try  {
                        this.endEdit();
                    } catch (ex) {
                        RIAPP.global.reThrow(ex, this._onError(ex, this));
                    }
                    this.raiseEvent('current_changing', { newCurrent: newCurrent });
                };
                Collection.prototype._onCurrentChanged = function () {
                    this.raisePropertyChanged('currentItem');
                };
                Collection.prototype._onEditing = function (item, isBegin, isCanceled) {
                    if (this._isUpdating)
                        return;
                    if (isBegin) {
                        this._EditingItem = item;
                        this.raiseEvent('begin_edit', { item: item });
                    } else {
                        this._EditingItem = null;
                        this.raiseEvent('end_edit', { item: item, isCanceled: isCanceled });
                    }
                };

                Collection.prototype._onCommitChanges = function (item, isBegin, isRejected, changeType) {
                    this.raiseEvent('commit_changes', { item: item, isBegin: isBegin, isRejected: isRejected, changeType: changeType });
                };

                Collection.prototype._onItemStatusChanged = function (item, oldChangeType) {
                    this.raiseEvent('status_changed', { item: item, oldChangeType: oldChangeType, key: item._key });
                };
                Collection.prototype._validateItem = function (item) {
                    var args = { item: item, fieldName: null, errors: [] };
                    this.raiseEvent('validate', args);
                    if (!!args.errors && args.errors.length > 0)
                        return { fieldName: null, errors: args.errors }; else
                        return null;
                };
                Collection.prototype._validateItemField = function (item, fieldName) {
                    var args = { item: item, fieldName: fieldName, errors: [] };
                    this.raiseEvent('validate', args);
                    if (!!args.errors && args.errors.length > 0)
                        return { fieldName: fieldName, errors: args.errors }; else
                        return null;
                };
                Collection.prototype._addErrors = function (item, errors) {
                    var self = this;
                    this._ignoreChangeErrors = true;
                    try  {
                        errors.forEach(function (err) {
                            self._addError(item, err.fieldName, err.errors);
                        });
                    } finally {
                        this._ignoreChangeErrors = false;
                    }
                    this._onErrorsChanged(item);
                };
                Collection.prototype._addError = function (item, fieldName, errors) {
                    if (!fieldName)
                        fieldName = '*';
                    if (!(utils.check.isArray(errors) && errors.length > 0)) {
                        this._removeError(item, fieldName);
                        return;
                    }
                    if (!this._errors[item._key])
                        this._errors[item._key] = {};
                    var itemErrors = this._errors[item._key];
                    itemErrors[fieldName] = errors;
                    if (!this._ignoreChangeErrors)
                        this._onErrorsChanged(item);
                };
                Collection.prototype._removeError = function (item, fieldName) {
                    var itemErrors = this._errors[item._key];
                    if (!itemErrors)
                        return;
                    if (!fieldName)
                        fieldName = '*';
                    if (!itemErrors[fieldName])
                        return;
                    delete itemErrors[fieldName];
                    if (utils.getProps(itemErrors).length === 0) {
                        delete this._errors[item._key];
                    }
                    this._onErrorsChanged(item);
                };
                Collection.prototype._removeAllErrors = function (item) {
                    var self = this, itemErrors = this._errors[item._key];
                    if (!itemErrors)
                        return;
                    delete this._errors[item._key];
                    self._onErrorsChanged(item);
                };
                Collection.prototype._getErrors = function (item) {
                    return this._errors[item._key];
                };
                Collection.prototype._onErrorsChanged = function (item) {
                    var args = { item: item };
                    this.raiseEvent('errors_changed', args);
                    item._onErrorsChanged(args);
                };
                Collection.prototype._onItemDeleting = function (item) {
                    var args = { item: item, isCancel: false };
                    this.raiseEvent('item_deleting', args);
                    return !args.isCancel;
                };
                Collection.prototype._onFillStart = function (args) {
                    this.raiseEvent('fill', args);
                };
                Collection.prototype._onFillEnd = function (args) {
                    this.raiseEvent('fill', args);
                };
                Collection.prototype._onItemsChanged = function (args) {
                    this.raiseEvent('coll_changed', args);
                };

                Collection.prototype._onItemAdding = function (item) {
                    var args = { item: item, isCancel: false };
                    this.raiseEvent('item_adding', args);
                    if (args.isCancel)
                        RIAPP.global._throwDummy(new Error('operation canceled'));
                };

                Collection.prototype._onItemAdded = function (item) {
                    var args = { item: item, isAddNewHandled: false };
                    this.raiseEvent('item_added', args);
                };
                Collection.prototype._createNew = function () {
                    return new CollectionItem();
                };
                Collection.prototype._attach = function (item, itemPos) {
                    if (!!this._itemsByKey[item._key]) {
                        throw new Error(RIAPP.ERRS.ERR_ITEM_IS_ATTACHED);
                    }
                    try  {
                        this.endEdit();
                    } catch (ex) {
                        RIAPP.global.reThrow(ex, this._onError(ex, this));
                    }
                    var pos;
                    item._onAttaching();
                    if (utils.check.isNt(itemPos)) {
                        pos = this._items.length;
                        this._items.push(item);
                    } else {
                        pos = itemPos;
                        utils.insertIntoArray(this._items, item, pos);
                    }
                    this._itemsByKey[item._key] = item;
                    this._onItemsChanged({ change_type: COLL_CHANGE_TYPE.ADDED, items: [item], pos: [pos] });
                    item._onAttach();
                    this.raisePropertyChanged('count');
                    this._onCurrentChanging(item);
                    this._currentPos = pos;
                    this._onCurrentChanged();
                    return pos;
                };
                Collection.prototype._onRemoved = function (item, pos) {
                    try  {
                        this._onItemsChanged({ change_type: COLL_CHANGE_TYPE.REMOVE, items: [item], pos: [pos] });
                    } finally {
                        this.raisePropertyChanged('count');
                    }
                };
                Collection.prototype._onPageSizeChanged = function () {
                };
                Collection.prototype._onPageChanging = function () {
                    var args = { page: this.pageIndex, isCancel: false };
                    this._raiseEvent('page_changing', args);
                    if (!args.isCancel) {
                        try  {
                            this.endEdit();
                        } catch (ex) {
                            RIAPP.global.reThrow(ex, this._onError(ex, this));
                        }
                    }
                    return !args.isCancel;
                };
                Collection.prototype._onPageChanged = function () {
                };
                Collection.prototype._setCurrentItem = function (v) {
                    var self = this, oldPos = self._currentPos;
                    if (!v) {
                        if (oldPos !== -1) {
                            self._onCurrentChanging(null);
                            self._currentPos = -1;
                            self._onCurrentChanged();
                        }
                        return;
                    }
                    if (v._key === null)
                        throw new Error(RIAPP.ERRS.ERR_ITEM_IS_DETACHED);
                    var oldItem, pos, item = self.getItemByKey(v._key);
                    if (!item) {
                        throw new Error(RIAPP.ERRS.ERR_ITEM_IS_NOTFOUND);
                    }
                    oldItem = self.getItemByPos(oldPos);
                    pos = self._items.indexOf(v);
                    if (pos < 0)
                        throw new Error(RIAPP.ERRS.ERR_ITEM_IS_NOTFOUND);
                    if (oldPos !== pos || oldItem !== v) {
                        self._onCurrentChanging(v);
                        self._currentPos = pos;
                        self._onCurrentChanged();
                    }
                };
                Collection.prototype._destroyItems = function () {
                    this._items.forEach(function (item) {
                        item.destroy();
                    });
                };
                Collection.prototype.getFieldInfo = function (fieldName) {
                    return this._fieldMap[fieldName];
                };
                Collection.prototype.getFieldNames = function () {
                    var fldMap = this._fieldMap;
                    return utils.getProps(fldMap);
                };
                Collection.prototype.cancelEdit = function () {
                    if (this.isEditing)
                        this._EditingItem.cancelEdit();
                };
                Collection.prototype.endEdit = function () {
                    var EditingItem;
                    if (this.isEditing) {
                        EditingItem = this._EditingItem;
                        if (!EditingItem.endEdit() && EditingItem.getIsHasErrors()) {
                            this._onError(new ValidationError(EditingItem.getAllErrors(), EditingItem), EditingItem);
                            this.cancelEdit();
                        }
                    }
                };
                Collection.prototype.getItemsWithErrors = function () {
                    var self = this, res = [];
                    utils.forEachProp(this._errors, function (key) {
                        var item = self.getItemByKey(key);
                        res.push(item);
                    });
                    return res;
                };
                Collection.prototype.addNew = function () {
                    var item, isHandled;
                    item = this._createNew();
                    this._onItemAdding(item);
                    this._attach(item, null);
                    try  {
                        this.currentItem = item;
                        item.beginEdit();
                        this._onItemAdded(item);
                    } catch (ex) {
                        isHandled = this._onError(ex, this);
                        item.cancelEdit();
                        RIAPP.global.reThrow(ex, isHandled);
                    }
                    return item;
                };
                Collection.prototype.getItemByPos = function (pos) {
                    if (pos < 0 || pos >= this._items.length)
                        return null;
                    return this._items[pos];
                };
                Collection.prototype.getItemByKey = function (key) {
                    if (!key)
                        throw new Error(RIAPP.ERRS.ERR_KEY_IS_EMPTY);
                    var map = this._itemsByKey;
                    return map['' + key];
                };
                Collection.prototype.findByPK = function () {
                    var vals = [];
                    for (var _i = 0; _i < (arguments.length - 0); _i++) {
                        vals[_i] = arguments[_i + 0];
                    }
                    if (arguments.length === 0)
                        return null;
                    var self = this, pkInfo = self._getPKFieldInfos(), arr = [], key, values = [];
                    if (vals.length === 1 && utils.check.isArray(vals[0])) {
                        values = vals[0];
                    } else
                        values = vals;
                    if (values.length !== pkInfo.length) {
                        return null;
                    }
                    for (var i = 0, len = pkInfo.length; i < len; i += 1) {
                        arr.push(self._getStrValue(values[i], pkInfo[i]));
                    }

                    key = arr.join(';');
                    return self.getItemByKey(key);
                };
                Collection.prototype.moveFirst = function (skipDeleted) {
                    var pos = 0, old = this._currentPos;
                    if (old === pos)
                        return false;
                    var item = this.getItemByPos(pos);
                    if (!item)
                        return false;
                    if (!!skipDeleted) {
                        if (item._isDeleted) {
                            return this.moveNext(true);
                        }
                    }
                    this._onCurrentChanging(item);
                    this._currentPos = pos;
                    this._onCurrentChanged();
                    return true;
                };
                Collection.prototype.movePrev = function (skipDeleted) {
                    var pos = -1, old = this._currentPos;
                    var item = this.getItemByPos(old);
                    if (!!item) {
                        pos = old;
                        pos -= 1;
                    }
                    item = this.getItemByPos(pos);
                    if (!item)
                        return false;
                    if (!!skipDeleted) {
                        if (item._isDeleted) {
                            this._currentPos = pos;
                            return this.movePrev(true);
                        }
                    }
                    this._onCurrentChanging(item);
                    this._currentPos = pos;
                    this._onCurrentChanged();
                    return true;
                };
                Collection.prototype.moveNext = function (skipDeleted) {
                    var pos = -1, old = this._currentPos;
                    var item = this.getItemByPos(old);
                    if (!!item) {
                        pos = old;
                        pos += 1;
                    }
                    item = this.getItemByPos(pos);
                    if (!item)
                        return false;
                    if (!!skipDeleted) {
                        if (item._isDeleted) {
                            this._currentPos = pos;
                            return this.moveNext(true);
                        }
                    }
                    this._onCurrentChanging(item);
                    this._currentPos = pos;
                    this._onCurrentChanged();
                    return true;
                };
                Collection.prototype.moveLast = function (skipDeleted) {
                    var pos = this._items.length - 1, old = this._currentPos;
                    if (old === pos)
                        return false;
                    var item = this.getItemByPos(pos);
                    if (!item)
                        return false;
                    if (!!skipDeleted) {
                        if (item._isDeleted) {
                            return this.movePrev(true);
                        }
                    }
                    this._onCurrentChanging(item);
                    this._currentPos = pos;
                    this._onCurrentChanged();
                    return true;
                };
                Collection.prototype.goTo = function (pos) {
                    var old = this._currentPos;
                    if (old === pos)
                        return false;
                    var item = this.getItemByPos(pos);
                    if (!item)
                        return false;
                    this._onCurrentChanging(item);
                    this._currentPos = pos;
                    this._onCurrentChanged();
                    return true;
                };
                Collection.prototype.forEach = function (callback, thisObj) {
                    this._items.forEach(callback, thisObj);
                };
                Collection.prototype.removeItem = function (item) {
                    if (item._key === null) {
                        throw new Error(RIAPP.ERRS.ERR_ITEM_IS_DETACHED);
                    }
                    if (!this._itemsByKey[item._key])
                        return;
                    var oldPos = utils.removeFromArray(this._items, item);
                    if (oldPos < 0) {
                        throw new Error(RIAPP.ERRS.ERR_ITEM_IS_NOTFOUND);
                    }
                    delete this._itemsByKey[item._key];
                    delete this._errors[item._key];
                    this._onRemoved(item, oldPos);
                    item._key = null;
                    item.removeHandler(null, null);
                    var test = this.getItemByPos(oldPos), curPos = this._currentPos;

                    if (curPos === oldPos) {
                        if (!test) {
                            this._currentPos = curPos - 1;
                        }
                        this._onCurrentChanged();
                    }

                    if (curPos > oldPos) {
                        this._currentPos = curPos - 1;
                        this._onCurrentChanged();
                    }
                };
                Collection.prototype.getIsHasErrors = function () {
                    if (!this._errors)
                        return false;
                    return (utils.getProps(this._errors).length > 0);
                };
                Collection.prototype.sort = function (fieldNames, sortOrder) {
                    var self = this, deffered = utils.createDeferred();
                    setTimeout(function () {
                        try  {
                            self.sortLocal(fieldNames, sortOrder);
                        } finally {
                            deffered.resolve();
                        }
                    }, 0);
                    return deffered.promise();
                };
                Collection.prototype.sortLocal = function (fieldNames, sortOrder) {
                    var mult = 1;
                    if (!!sortOrder && sortOrder.toUpperCase() === 'DESC')
                        mult = -1;
                    var fn_sort = function (a, b) {
                        var res = 0, i, len, af, bf, fieldName;
                        for (i = 0, len = fieldNames.length; i < len; i += 1) {
                            fieldName = fieldNames[i];
                            af = a[fieldName];
                            bf = b[fieldName];
                            if (af < bf)
                                res = -1 * mult; else if (af > bf)
                                res = mult; else
                                res = 0;

                            if (res !== 0)
                                return res;
                        }
                        return res;
                    };
                    this.sortLocalByFunc(fn_sort);
                };
                Collection.prototype.sortLocalByFunc = function (fn) {
                    var self = this;
                    this.waitForNotLoading(function () {
                        var cur = self.currentItem;
                        self.isLoading = true;
                        try  {
                            self._items.sort(fn);
                            self._onItemsChanged({ change_type: COLL_CHANGE_TYPE.RESET, items: [], pos: [] });
                        } finally {
                            self.isLoading = false;
                        }
                        self.currentItem = null;
                        self.currentItem = cur;
                    }, [], false, null);
                };
                Collection.prototype.clear = function () {
                    this.raiseEvent('clearing', {});
                    this.cancelEdit();
                    this._EditingItem = null;
                    this._newKey = 0;
                    this.currentItem = null;
                    this._destroyItems();
                    this._items = [];
                    this._itemsByKey = {};
                    this._errors = {};
                    this._onItemsChanged({ change_type: COLL_CHANGE_TYPE.RESET, items: [], pos: [] });
                    this.raiseEvent('cleared', {});
                    this.raisePropertyChanged('count');
                };
                Collection.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._waitQueue.destroy();
                    this._waitQueue = null;
                    this.clear();
                    this._fieldMap = {};
                    _super.prototype.destroy.call(this);
                };
                Collection.prototype.waitForNotLoading = function (callback, callbackArgs, syncCheck, groupName) {
                    this._waitQueue.enQueue({
                        prop: 'isLoading',
                        groupName: null,
                        predicate: function (val) {
                            return !val;
                        },
                        action: callback,
                        actionArgs: callbackArgs,
                        lastWins: !!groupName,
                        syncCheck: !!syncCheck
                    });
                };
                Collection.prototype.toString = function () {
                    return 'Collection';
                };
                Object.defineProperty(Collection.prototype, "options", {
                    get: function () {
                        return this._options;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Collection.prototype, "currentItem", {
                    get: function () {
                        return this.getItemByPos(this._currentPos);
                    },
                    set: function (v) {
                        this._setCurrentItem(v);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Collection.prototype, "count", {
                    get: function () {
                        return this._items.length;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Collection.prototype, "totalCount", {
                    get: function () {
                        return this._totalCount;
                    },
                    set: function (v) {
                        if (v != this._totalCount) {
                            this._totalCount = v;
                            this.raisePropertyChanged('totalCount');
                            this.raisePropertyChanged('pageCount');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Collection.prototype, "pageSize", {
                    get: function () {
                        return this._options.pageSize;
                    },
                    set: function (v) {
                        if (this._options.pageSize !== v) {
                            this._options.pageSize = v;
                            this.raisePropertyChanged('pageSize');
                            this._onPageSizeChanged();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Collection.prototype, "pageIndex", {
                    get: function () {
                        return this._pageIndex;
                    },
                    set: function (v) {
                        if (v !== this._pageIndex && this.isPagingEnabled) {
                            if (v < 0)
                                return;
                            if (!this._onPageChanging()) {
                                return;
                            }
                            this._pageIndex = v;
                            this._onPageChanged();
                            this.raisePropertyChanged('pageIndex');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Collection.prototype, "items", {
                    get: function () {
                        return this._items;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Collection.prototype, "isPagingEnabled", {
                    get: function () {
                        return this._options.enablePaging;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Collection.prototype, "permissions", {
                    get: function () {
                        return this._perms;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Collection.prototype, "isEditing", {
                    get: function () {
                        return !!this._EditingItem;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Collection.prototype, "isLoading", {
                    get: function () {
                        return this._isLoading;
                    },
                    set: function (v) {
                        if (this._isLoading !== v) {
                            this._isLoading = v;
                            this.raisePropertyChanged('isLoading');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Collection.prototype, "isUpdating", {
                    get: function () {
                        return this._isUpdating;
                    },
                    set: function (v) {
                        if (this._isUpdating !== v) {
                            this._isUpdating = v;
                            this.raisePropertyChanged('isUpdating');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Collection.prototype, "pageCount", {
                    get: function () {
                        var rowCount = this.totalCount, rowPerPage = this.pageSize, result;

                        if ((rowCount === 0) || (rowPerPage === 0)) {
                            return 0;
                        }

                        if ((rowCount % rowPerPage) === 0) {
                            result = (rowCount / rowPerPage);
                        } else {
                            result = (rowCount / rowPerPage);
                            result = Math.floor(result) + 1;
                        }
                        return result;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Collection;
            })(RIAPP.BaseObject);
            collection.Collection = Collection;

            var ListItem = (function (_super) {
                __extends(ListItem, _super);
                function ListItem(obj) {
                    _super.call(this);
                    var self = this;
                    this.__isNew = !obj;

                    if (!!obj)
                        this._vals = obj;

                    if (!obj) {
                        this._collection.getFieldNames().forEach(function (name) {
                            self._vals[name] = null;
                        });
                    }
                }
                ListItem.prototype._setProp = function (name, val) {
                    var validation_error, error, coll = this._collection;
                    if (this._vals[name] !== val) {
                        try  {
                            this._vals[name] = val;
                            this.raisePropertyChanged(name);
                            coll._removeError(this, name);
                            validation_error = this._validateField(name);
                            if (!!validation_error) {
                                throw new ValidationError([validation_error], this);
                            }
                        } catch (ex) {
                            if (utils.check.isProtoOf(ValidationError, ex)) {
                                error = ex;
                            } else {
                                error = new ValidationError([
                                    { fieldName: name, errors: [ex.message] }
                                ], this);
                            }
                            coll._addError(this, name, error.errors[0].errors);
                            throw error;
                        }
                    }
                };
                ListItem.prototype._getProp = function (name) {
                    return this._vals[name];
                };
                ListItem.prototype._resetIsNew = function () {
                    this.__isNew = false;
                };
                ListItem.prototype.toString = function () {
                    return 'ListItem';
                };
                Object.defineProperty(ListItem.prototype, "_isNew", {
                    get: function () {
                        return this.__isNew;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListItem.prototype, "_collection", {
                    get: function () {
                        return this.__coll;
                    },
                    enumerable: true,
                    configurable: true
                });
                return ListItem;
            })(CollectionItem);
            collection.ListItem = ListItem;

            var List = (function (_super) {
                __extends(List, _super);
                function List(type_name, properties) {
                    _super.call(this);
                    this._type_name = type_name;
                    if (utils.check.isArray(properties)) {
                        this._props = properties;
                        if (this._props.length === 0)
                            throw new Error(utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'properties', properties));
                        this._initFieldMap(false, properties);
                    } else if (properties instanceof CollectionItem) {
                        this._props = properties.getFieldNames();
                        this._initFieldMap(true, properties);
                    } else if (!!properties) {
                        this._props = Object.keys(properties);
                        this._initFieldMap(false, properties);
                    } else
                        throw new Error(utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'properties', properties));
                    this._itemType = null;
                    this._createItemType();
                }
                List.prototype._initFieldMap = function (isCollectionItem, obj) {
                    var self = this;
                    if (!isCollectionItem) {
                        this._props.forEach(function (prop) {
                            self._fieldMap[prop] = Collection.getEmptyFieldInfo(prop);
                        });
                    } else {
                        this._props.forEach(function (prop) {
                            self._fieldMap[prop] = utils.extend(false, {}, obj.getFieldInfo(prop));
                        });
                    }
                };
                List.prototype._attach = function (item) {
                    try  {
                        this.endEdit();
                    } catch (ex) {
                        RIAPP.global.reThrow(ex, this._onError(ex, this));
                    }
                    return _super.prototype._attach.call(this, item);
                };
                List.prototype._createNew = function () {
                    var item = new this._itemType(null);
                    item._key = this._getNewKey(null);
                    return item;
                };
                List.prototype._createItemType = function () {
                    var propDescriptors = {}, self = this;

                    this.getFieldNames().forEach(function (name) {
                        propDescriptors[name] = {
                            set: function (x) {
                                this._setProp(name, x);
                            },
                            get: function () {
                                return this._getProp(name);
                            }
                        };
                    }, this);

                    this._itemType = RIAPP.MOD.utils.__extendType(ListItem, {
                        __coll: this,
                        toString: function () {
                            return self._type_name + 'Item';
                        }
                    }, propDescriptors);
                };

                List.prototype._getNewKey = function (item) {
                    var key = 'clkey_' + this._newKey;
                    this._newKey += 1;
                    return key;
                };
                List.prototype.fillItems = function (objArray, clearAll) {
                    var self = this, newItems = [], positions = [], fetchedItems = [];
                    this._onFillStart({ isBegin: true, rowCount: objArray.length, time: new Date(), isPageChanged: false });
                    try  {
                        if (!!clearAll)
                            this.clear();
                        objArray.forEach(function (obj) {
                            var item = new self._itemType(obj);
                            item._key = self._getNewKey(item);
                            var oldItem = self._itemsByKey[item._key];
                            if (!oldItem) {
                                self._items.push(item);
                                self._itemsByKey[item._key] = item;
                                newItems.push(item);
                                positions.push(self._items.length - 1);
                                fetchedItems.push(item);
                            } else {
                                fetchedItems.push(oldItem);
                            }
                        });

                        if (newItems.length > 0) {
                            this._onItemsChanged({ change_type: COLL_CHANGE_TYPE.ADDED, items: newItems, pos: positions });
                            this.raisePropertyChanged('count');
                        }
                    } finally {
                        this._onFillEnd({
                            isBegin: false,
                            rowCount: fetchedItems.length,
                            time: new Date(),
                            resetUI: !!clearAll,
                            fetchedItems: fetchedItems,
                            newItems: newItems,
                            isPageChanged: false
                        });
                    }
                    this.moveFirst();
                };
                List.prototype.getNewObjects = function () {
                    return this._items.filter(function (item) {
                        return item._isNew;
                    });
                };
                List.prototype.resetNewObjects = function () {
                    this._items.forEach(function (item) {
                        item._resetIsNew();
                    });
                };
                List.prototype.toString = function () {
                    return this._type_name;
                };
                return List;
            })(Collection);
            collection.List = List;

            var Dictionary = (function (_super) {
                __extends(Dictionary, _super);
                function Dictionary(type_name, properties, keyName) {
                    if (!keyName)
                        throw new Error(utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'keyName', keyName));
                    this._keyName = keyName;
                    _super.call(this, type_name, properties);
                    var keyFld = this.getFieldInfo(keyName);
                    if (!keyFld)
                        throw new Error(utils.format(RIAPP.ERRS.ERR_DICTKEY_IS_NOTFOUND, keyName));
                    keyFld.isPrimaryKey = 1;
                }
                Dictionary.prototype._getNewKey = function (item) {
                    if (!item) {
                        return _super.prototype._getNewKey.call(this, null);
                    }
                    var key = item[this._keyName];
                    if (utils.check.isNt(key))
                        throw new Error(utils.format(RIAPP.ERRS.ERR_DICTKEY_IS_EMPTY, this._keyName));
                    return '' + key;
                };
                return Dictionary;
            })(List);
            collection.Dictionary = Dictionary;

            RIAPP.global.registerType('List', List);
            RIAPP.global.registerType('Dictionary', Dictionary);
            RIAPP.global.onModuleLoaded('collection', collection);
        })(MOD.collection || (MOD.collection = {}));
        var collection = MOD.collection;
    })(RIAPP.MOD || (RIAPP.MOD = {}));
    var MOD = RIAPP.MOD;
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    (function (MOD) {
        (function (template) {
            var utils = RIAPP.global.utils, consts = RIAPP.global.consts;

            template.css = {
                templateContainer: 'ria-template-container'
            };

            var Template = (function (_super) {
                __extends(Template, _super);
                function Template(app, templateID) {
                    _super.call(this);
                    this._app = app;
                    this._dctxt = null;
                    this._el = null;
                    this._isDisabled = false;
                    this._lfTime = null;
                    this._templateID = templateID;
                    this._templElView = undefined;
                    this._promise = null;
                    this._busyTimeOut = null;
                    if (!!this._templateID)
                        this._loadTemplate();
                }
                Template.prototype._getBindings = function () {
                    if (!this._lfTime)
                        return [];
                    var arr = this._lfTime.getObjs(), res = [];
                    for (var i = 0, len = arr.length; i < len; i += 1) {
                        if (utils.check.isBinding(arr[i]))
                            res.push(arr[i]);
                    }
                    return res;
                };
                Template.prototype._getElViews = function () {
                    if (!this._lfTime)
                        return [];
                    var arr = this._lfTime.getObjs(), res = [];
                    for (var i = 0, len = arr.length; i < len; i += 1) {
                        if (utils.check.isElView(arr[i]))
                            res.push(arr[i]);
                    }
                    return res;
                };
                Template.prototype._getTemplateElView = function () {
                    if (!this._lfTime || this._templElView === null)
                        return null;
                    if (!!this._templElView)
                        return this._templElView;
                    var res = null, arr = this._getElViews();
                    for (var i = 0, j = arr.length; i < j; i += 1) {
                        if (utils.check.isTemplateElView(arr[i])) {
                            res = arr[i];
                            break;
                        }
                    }
                    this._templElView = res;
                    return res;
                };

                Template.prototype._loadTemplateElAsync = function (name) {
                    var self = this, fn_loader = this.app.getTemplateLoader(name), deferred;
                    if (!!fn_loader) {
                        return fn_loader().then(function (html) {
                            var tmpDiv = RIAPP.global.document.createElement('div');
                            tmpDiv.innerHTML = html;
                            return tmpDiv.firstElementChild;
                        });
                    } else {
                        deferred = utils.createDeferred();
                        deferred.reject(new Error(utils.format(RIAPP.ERRS.ERR_TEMPLATE_ID_INVALID, self._templateID)));
                        return deferred.promise();
                    }
                };
                Template.prototype._appendIsBusy = function (el) {
                    var self = this;
                    this._busyTimeOut = setTimeout(function () {
                        if (!self._busyTimeOut || self._isDestroyCalled)
                            return;
                        self._busyTimeOut = null;
                        var vw_inst = new RIAPP.MOD.baseElView.BusyElView(self.app, el, { img: consts.LOADER_GIF.SMALL, delay: 0 });
                        vw_inst.isBusy = true;
                    }, 400);
                };
                Template.prototype._removeIsBusy = function (el) {
                    var self = this;
                    if (!!self._busyTimeOut) {
                        clearTimeout(self._busyTimeOut);
                        self._busyTimeOut = null;
                    }
                    var vw = this.app._getElView(el);
                    if (!!vw && (vw instanceof RIAPP.MOD.baseElView.BusyElView)) {
                        vw.destroy();
                    }
                };
                Template.prototype._loadTemplate = function () {
                    var self = this, tid = self._templateID, promise, deffered, tmpDiv, asyncLoad = false;
                    if (!!self._promise) {
                        self._promise.reject('cancel');
                        self._promise = null;
                    }
                    self._unloadTemplate();
                    if (!!tid) {
                        promise = self._loadTemplateElAsync(tid);
                        asyncLoad = promise.state() == "pending";
                        self._promise = deffered = utils.createDeferred();
                        promise.done(function (data) {
                            if (deffered.state() == "pending")
                                deffered.resolve(data);
                        });
                        promise.fail(function (err) {
                            if (deffered.state() == "pending")
                                deffered.reject(err);
                        });

                        self._el = tmpDiv = RIAPP.global.document.createElement("div");
                        tmpDiv.className = template.css.templateContainer;
                        if (asyncLoad) {
                            self._appendIsBusy(tmpDiv);
                            deffered.done(function () {
                                self._removeIsBusy(tmpDiv);
                            });
                            deffered.fail(function (arg) {
                                if (arg == 'cancel') {
                                    self._removeIsBusy(tmpDiv);
                                }
                            });
                        }

                        deffered.then(function (tel) {
                            if (self._isDestroyCalled)
                                return;
                            self._promise = null;
                            if (!tel) {
                                self._unloadTemplate();
                                return;
                            }
                            self._el.appendChild(tel);
                            self._lfTime = self.app._bindTemplateElements(tel);
                            var telv = self._getTemplateElView();
                            if (!!telv) {
                                telv.templateLoaded(self);
                            }
                            self._updateBindingSource();
                        }, function (arg) {
                            if (self._isDestroyCalled)
                                return;
                            self._promise = null;
                            if (arg == 'cancel') {
                                return;
                            }
                            var ex;
                            if (!!arg) {
                                if (!!arg.message)
                                    ex = arg; else if (!!arg.statusText) {
                                    ex = new Error(arg.statusText);
                                } else if (utils.check.isString(arg)) {
                                    ex = new Error(arg);
                                }
                            }
                            if (!ex)
                                ex = new Error(utils.format(RIAPP.ERRS.ERR_TEMPLATE_ID_INVALID, self._templateID));
                            RIAPP.global._onError(ex, self);
                        });
                    }
                };
                Template.prototype._updateBindingSource = function () {
                    var i, len, obj, bindings = this._getBindings();
                    for (i = 0, len = bindings.length; i < len; i += 1) {
                        obj = bindings[i];
                        obj.isDisabled = this._isDisabled;
                        if (!obj.isSourceFixed)
                            obj.source = this._dctxt;
                    }
                };
                Template.prototype._updateIsDisabled = function () {
                    var i, len, obj, bindings = this._getBindings(), elViews = this._getElViews(), DataFormElView = this.app._getElViewType(consts.ELVIEW_NM.DATAFORM);
                    for (i = 0, len = bindings.length; i < len; i += 1) {
                        obj = bindings[i];
                        obj.isDisabled = this._isDisabled;
                    }
                    for (i = 0, len = elViews.length; i < len; i += 1) {
                        obj = elViews[i];
                        if ((obj instanceof DataFormElView) && !!obj.form) {
                            obj.form.isDisabled = this._isDisabled;
                        }
                    }
                };
                Template.prototype._unloadTemplate = function () {
                    try  {
                        if (!!this._el) {
                            var telv = this._templElView;
                            this._templElView = undefined;
                            if (!!telv) {
                                telv.templateUnloading(this);
                            }
                        }
                    } finally {
                        if (!!this._lfTime) {
                            this._lfTime.destroy();
                            this._lfTime = null;
                        }

                        if (!!this._el) {
                            RIAPP.global.$(this._el).remove();
                        }
                        this._el = null;
                    }
                };
                Template.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._busyTimeOut) {
                        clearTimeout(this._busyTimeOut);
                        this._busyTimeOut = null;
                    }
                    if (!!this._promise) {
                        this._promise.reject('cancel');
                        this._promise = null;
                    }
                    this._dctxt = null;
                    this._unloadTemplate();
                    this._templateID = null;
                    this._templElView = undefined;
                    this._app = null;
                    _super.prototype.destroy.call(this);
                };

                Template.prototype.findElByDataName = function (name) {
                    var $foundEl = RIAPP.global.$(this._el).find(['*[', consts.DATA_ATTR.DATA_NAME, '="', name, '"]'].join(''));
                    return $foundEl.toArray();
                };
                Template.prototype.findElViewsByDataName = function (name) {
                    var self = this, els = this.findElByDataName(name), res = [];
                    els.forEach(function (el) {
                        var elView = self.app._getElView(el);
                        if (!!elView)
                            res.push(elView);
                    });
                    return res;
                };
                Template.prototype.toString = function () {
                    return 'Template';
                };
                Object.defineProperty(Template.prototype, "dataContext", {
                    get: function () {
                        return this._dctxt;
                    },
                    set: function (v) {
                        if (this._dctxt !== v) {
                            this._dctxt = v;
                            this.raisePropertyChanged('dataContext');
                            this._updateBindingSource();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Template.prototype, "templateID", {
                    get: function () {
                        return this._templateID;
                    },
                    set: function (v) {
                        if (this._templateID !== v) {
                            this._templateID = v;
                            this._loadTemplate();
                            this.raisePropertyChanged('templateID');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Template.prototype, "el", {
                    get: function () {
                        return this._el;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Template.prototype, "isDisabled", {
                    get: function () {
                        return this._isDisabled;
                    },
                    set: function (v) {
                        if (this._isDisabled !== v) {
                            this._isDisabled = !!v;
                            this._updateIsDisabled();
                            this.raisePropertyChanged('isDisabled');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Template.prototype, "app", {
                    get: function () {
                        return this._app;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Template;
            })(RIAPP.BaseObject);
            template.Template = Template;

            RIAPP.global.registerType('Template', Template);
            RIAPP.global.onModuleLoaded('template', template);
        })(MOD.template || (MOD.template = {}));
        var template = MOD.template;
    })(RIAPP.MOD || (RIAPP.MOD = {}));
    var MOD = RIAPP.MOD;
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    (function (MOD) {
        (function (baseContent) {
            var utils = RIAPP.global.utils, consts = RIAPP.global.consts;
            baseContent.css = {
                content: 'ria-content-field',
                required: 'ria-required-field'
            };

            ;

            ;

            ;

            ;

            function parseContentAttr(content_attr) {
                var res = {
                    name: null,
                    templateInfo: null,
                    bindingInfo: null,
                    displayInfo: null,
                    fieldName: null,
                    options: null
                };

                var temp_opts = RIAPP.global.parser.parseOptions(content_attr);
                if (temp_opts.length === 0)
                    return res;
                var attr = temp_opts[0];
                if (!attr.template && !!attr.fieldName) {
                    var bindOpt = {
                        target: null,
                        source: null,
                        targetPath: null,
                        sourcePath: attr.fieldName,
                        mode: "OneWay",
                        converter: null,
                        converterParam: null
                    };
                    res.bindingInfo = bindOpt;
                    res.displayInfo = attr.css;
                    res.fieldName = attr.fieldName;
                    if (!!attr.name)
                        res.name = attr.name;
                    if (!!attr.options)
                        res.options = attr.options;
                    if (!(attr.readOnly === undefined))
                        res.readOnly = utils.parseBool(attr.readOnly);
                } else if (!!attr.template) {
                    res.templateInfo = attr.template;
                    delete attr.template;
                }
                return res;
            }
            baseContent.parseContentAttr = parseContentAttr;
            ;

            function getBindingOptions(app, options, defaultTarget, defaultSource) {
                var BINDING_MODE = MOD.binding.BINDING_MODE, opts = {
                    mode: BINDING_MODE[1],
                    converterParam: null,
                    converter: null,
                    targetPath: null,
                    sourcePath: null,
                    target: null,
                    source: null,
                    isSourceFixed: false
                };

                var fixedSource = options.source, fixedTarget = options.target;

                if (!options.sourcePath && !!options.to)
                    opts.sourcePath = options.to; else if (!!options.sourcePath)
                    opts.sourcePath = options.sourcePath;
                if (!!options.targetPath)
                    opts.targetPath = options.targetPath;
                if (!!options.converterParam)
                    opts.converterParam = options.converterParam;
                if (!!options.mode)
                    opts.mode = options.mode;

                if (!!options.converter) {
                    if (utils.check.isString(options.converter))
                        opts.converter = app.getConverter(options.converter); else
                        opts.converter = options.converter;
                }

                if (!fixedTarget)
                    opts.target = defaultTarget; else {
                    if (utils.check.isString(fixedTarget)) {
                        if (fixedTarget == 'this')
                            opts.target = defaultTarget; else {
                            opts.target = RIAPP.global.parser.resolveBindingSource(app, RIAPP.global.parser._getPathParts(fixedTarget));
                        }
                    } else
                        opts.target = fixedTarget;
                }

                if (!fixedSource) {
                    opts.source = defaultSource;
                } else {
                    opts.isSourceFixed = true;
                    if (utils.check.isString(fixedSource)) {
                        if (fixedSource == 'this') {
                            opts.source = defaultTarget;
                        } else {
                            opts.source = RIAPP.global.parser.resolveBindingSource(app, RIAPP.global.parser._getPathParts(fixedSource));
                        }
                    } else
                        opts.source = fixedSource;
                }

                return opts;
            }
            baseContent.getBindingOptions = getBindingOptions;
            ;

            ;

            var BindingContent = (function (_super) {
                __extends(BindingContent, _super);
                function BindingContent(app, parentEl, options, dctx, isEditing) {
                    _super.call(this);
                    this._app = app;
                    this._parentEl = parentEl;
                    this._el = null;
                    this._options = options;
                    this._isReadOnly = !!this._options.readOnly;
                    this._isEditing = !!isEditing;
                    this._dctx = dctx;
                    this._lfScope = null;
                    this._tgt = null;
                    var $p = RIAPP.global.$(this._parentEl);
                    $p.addClass(baseContent.css.content);
                    this._init();
                    this.update();
                }
                BindingContent.prototype._init = function () {
                };
                BindingContent.prototype._updateCss = function () {
                    var displayInfo = this._getDisplayInfo(), $p = RIAPP.global.$(this._parentEl), fieldInfo = this.getFieldInfo();
                    if (this._isEditing && this._canBeEdited()) {
                        if (!!displayInfo) {
                            if (!!displayInfo.editCss) {
                                $p.addClass(displayInfo.editCss);
                            }
                            if (!!displayInfo.displayCss) {
                                $p.removeClass(displayInfo.displayCss);
                            }
                        }
                        if (!!fieldInfo && !fieldInfo.isNullable) {
                            $p.addClass(baseContent.css.required);
                        }
                    } else {
                        if (!!displayInfo) {
                            if (!!displayInfo.displayCss) {
                                $p.addClass(displayInfo.displayCss);
                            }
                            if (!!displayInfo.editCss) {
                                $p.removeClass(displayInfo.editCss);
                            }
                            if (!!fieldInfo && !fieldInfo.isNullable) {
                                $p.removeClass(baseContent.css.required);
                            }
                        }
                    }
                };
                BindingContent.prototype._canBeEdited = function () {
                    if (this._isReadOnly)
                        return false;
                    var finf = this.getFieldInfo();
                    if (!finf)
                        return false;
                    var editable = !!this._dctx && !!this._dctx.beginEdit;
                    return editable && !finf.isReadOnly && !finf.isCalculated;
                };
                BindingContent.prototype._createTargetElement = function () {
                    var el, doc = RIAPP.global.document;
                    if (this._isEditing && this._canBeEdited()) {
                        el = doc.createElement('input');
                        el.setAttribute('type', 'text');
                    } else {
                        el = doc.createElement('span');
                    }
                    this._updateCss();
                    return el;
                };
                BindingContent.prototype._getBindingOption = function (bindingInfo, tgt, dctx, targetPath) {
                    var options = getBindingOptions(this.app, bindingInfo, tgt, dctx);
                    if (this.isEditing && this._canBeEdited())
                        options.mode = 'TwoWay'; else
                        options.mode = 'OneWay';
                    if (!!targetPath)
                        options.targetPath = targetPath;
                    return options;
                };
                BindingContent.prototype._getBindings = function () {
                    if (!this._lfScope)
                        return [];
                    var arr = this._lfScope.getObjs(), res = [];
                    for (var i = 0, len = arr.length; i < len; i += 1) {
                        if (utils.check.isBinding(arr[i]))
                            res.push(arr[i]);
                    }
                    return res;
                };
                BindingContent.prototype._updateBindingSource = function () {
                    var i, len, obj, bindings = this._getBindings();
                    for (i = 0, len = bindings.length; i < len; i += 1) {
                        obj = bindings[i];
                        if (!obj.isSourceFixed)
                            obj.source = this._dctx;
                    }
                };
                BindingContent.prototype._cleanUp = function () {
                    if (!!this._lfScope) {
                        this._lfScope.destroy();
                        this._lfScope = null;
                    }
                    if (!!this._el) {
                        utils.removeNode(this._el);
                        this._el = null;
                    }
                    this._tgt = null;
                };
                BindingContent.prototype.getFieldInfo = function () {
                    return this._options.fieldInfo;
                };
                BindingContent.prototype._getBindingInfo = function () {
                    return this._options.bindingInfo;
                };
                BindingContent.prototype._getDisplayInfo = function () {
                    return this._options.displayInfo;
                };
                BindingContent.prototype._getElementView = function (el) {
                    return this.app.getElementView(el);
                };
                BindingContent.prototype.update = function () {
                    this._cleanUp();
                    var bindingInfo = this._getBindingInfo();
                    if (!!bindingInfo) {
                        this._el = this._createTargetElement();
                        this._tgt = this._getElementView(this._el);
                        this._lfScope = new RIAPP.MOD.utils.LifeTimeScope();
                        this._lfScope.addObj(this._tgt);
                        var options = this._getBindingOption(bindingInfo, this._tgt, this._dctx, 'value');
                        this._parentEl.appendChild(this._el);
                        this._lfScope.addObj(this.app.bind(options));
                    }
                };
                BindingContent.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    var displayInfo = this._getDisplayInfo(), $p = RIAPP.global.$(this._parentEl);
                    $p.removeClass(baseContent.css.content);
                    $p.removeClass(baseContent.css.required);
                    if (!!displayInfo && !!displayInfo.displayCss) {
                        $p.removeClass(displayInfo.displayCss);
                    }
                    if (!!displayInfo && !!displayInfo.editCss) {
                        $p.removeClass(displayInfo.editCss);
                    }

                    this._cleanUp();
                    this._parentEl = null;
                    this._dctx = null;
                    this._options = null;
                    this._app = null;
                    _super.prototype.destroy.call(this);
                };
                BindingContent.prototype.toString = function () {
                    return 'BindingContent';
                };
                Object.defineProperty(BindingContent.prototype, "parentEl", {
                    get: function () {
                        return this._parentEl;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BindingContent.prototype, "target", {
                    get: function () {
                        return this._tgt;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BindingContent.prototype, "isEditing", {
                    get: function () {
                        return this._isEditing;
                    },
                    set: function (v) {
                        if (this._isEditing !== v) {
                            this._isEditing = v;
                            this.update();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BindingContent.prototype, "dataContext", {
                    get: function () {
                        return this._dctx;
                    },
                    set: function (v) {
                        if (this._dctx !== v) {
                            this._dctx = v;
                            this._updateBindingSource();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BindingContent.prototype, "app", {
                    get: function () {
                        return this._app;
                    },
                    enumerable: true,
                    configurable: true
                });
                return BindingContent;
            })(RIAPP.BaseObject);
            baseContent.BindingContent = BindingContent;

            var TemplateContent = (function (_super) {
                __extends(TemplateContent, _super);
                function TemplateContent(app, parentEl, options, dctx, isEditing) {
                    _super.call(this);
                    var templateInfo = options.templateInfo;
                    this._app = app;
                    this._parentEl = parentEl;
                    this._isEditing = !!isEditing;
                    this._dctx = dctx;
                    this._templateInfo = templateInfo;
                    this._template = null;
                    var $p = RIAPP.global.$(this._parentEl);
                    $p.addClass(baseContent.css.content);
                    this.update();
                }
                TemplateContent.prototype._createTemplate = function () {
                    var inf = this._templateInfo, id = inf.displayID;
                    if (this._isEditing) {
                        if (!!inf.editID) {
                            id = inf.editID;
                        }
                    } else {
                        if (!id) {
                            id = inf.editID;
                        }
                    }
                    if (!id)
                        throw new Error(RIAPP.ERRS.ERR_TEMPLATE_ID_INVALID);

                    return new RIAPP.MOD.template.Template(this.app, id);
                };
                TemplateContent.prototype.update = function () {
                    this._cleanUp();
                    var template;
                    if (!!this._templateInfo) {
                        template = this._createTemplate();
                        this._template = template;
                        this._parentEl.appendChild(template.el);
                        template.dataContext = this._dctx;
                    }
                };
                TemplateContent.prototype._cleanUp = function () {
                    if (!!this._template) {
                        this._template.destroy();
                        this._template = null;
                    }
                };
                TemplateContent.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    var $p = RIAPP.global.$(this._parentEl);
                    $p.removeClass(baseContent.css.content);
                    this._cleanUp();
                    this._parentEl = null;
                    this._dctx = null;
                    this._templateInfo = null;
                    this._app = null;
                    _super.prototype.destroy.call(this);
                };
                TemplateContent.prototype.toString = function () {
                    return 'TemplateContent';
                };
                Object.defineProperty(TemplateContent.prototype, "app", {
                    get: function () {
                        return this._app;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TemplateContent.prototype, "parentEl", {
                    get: function () {
                        return this._parentEl;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TemplateContent.prototype, "template", {
                    get: function () {
                        return this._template;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TemplateContent.prototype, "isEditing", {
                    get: function () {
                        return this._isEditing;
                    },
                    set: function (v) {
                        if (this._isEditing !== v) {
                            this._isEditing = v;
                            this.update();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TemplateContent.prototype, "dataContext", {
                    get: function () {
                        return this._dctx;
                    },
                    set: function (v) {
                        if (this._dctx !== v) {
                            this._dctx = v;
                            if (!!this._template) {
                                this._template.dataContext = this._dctx;
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return TemplateContent;
            })(RIAPP.BaseObject);
            baseContent.TemplateContent = TemplateContent;

            var BoolContent = (function (_super) {
                __extends(BoolContent, _super);
                function BoolContent() {
                    _super.apply(this, arguments);
                }
                BoolContent.prototype._init = function () {
                    this._createTargetElement();
                    var bindingInfo = this._getBindingInfo();
                    if (!!bindingInfo) {
                        this._updateCss();
                        this._lfScope = new RIAPP.MOD.utils.LifeTimeScope();
                        var options = this._getBindingOption(bindingInfo, this._tgt, this._dctx, 'checked');
                        options.mode = 'TwoWay';
                        this._lfScope.addObj(this.app.bind(options));
                    }
                };
                BoolContent.prototype._createCheckBoxView = function () {
                    var el = RIAPP.global.document.createElement('input');
                    el.setAttribute('type', 'checkbox');
                    var chbxView = new MOD.baseElView.CheckBoxElView(this.app, el, {});
                    return chbxView;
                };
                BoolContent.prototype._createTargetElement = function () {
                    if (!this._tgt) {
                        this._tgt = this._createCheckBoxView();
                        this._el = this._tgt.el;
                    }
                    this._parentEl.appendChild(this._el);
                    return this._el;
                };
                BoolContent.prototype._updateCss = function () {
                    _super.prototype._updateCss.call(this);
                    var el = this._el;
                    if (this._isEditing && this._canBeEdited()) {
                        if (el.disabled)
                            el.disabled = false;
                    } else {
                        if (!el.disabled)
                            el.disabled = true;
                    }
                };
                BoolContent.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._lfScope) {
                        this._lfScope.destroy();
                        this._lfScope = null;
                    }
                    if (!!this._tgt) {
                        this._tgt.destroy();
                        this._tgt = null;
                    }
                    _super.prototype.destroy.call(this);
                };
                BoolContent.prototype._cleanUp = function () {
                };
                BoolContent.prototype.update = function () {
                    this._cleanUp();
                    this._updateCss();
                };
                BoolContent.prototype.toString = function () {
                    return 'BoolContent';
                };
                return BoolContent;
            })(BindingContent);
            baseContent.BoolContent = BoolContent;

            var DateContent = (function (_super) {
                __extends(DateContent, _super);
                function DateContent(app, parentEl, options, dctx, isEditing) {
                    _super.call(this, app, parentEl, options, dctx, isEditing);
                    this._fn_cleanup = null;
                }
                DateContent.prototype._getBindingOption = function (bindingInfo, tgt, dctx, targetPath) {
                    var options = _super.prototype._getBindingOption.call(this, bindingInfo, tgt, dctx, targetPath);
                    options.converter = this.app.getConverter('dateConverter');
                    options.converterParam = RIAPP.global.defaults.dateFormat;
                    return options;
                };
                DateContent.prototype._createTargetElement = function () {
                    var el = _super.prototype._createTargetElement.call(this);
                    if (this.isEditing) {
                        var $el = RIAPP.global.$(el);
                        $el.datepicker();
                        this._fn_cleanup = function () {
                            utils.destroyJQueryPlugin($el, 'datepicker');
                        };
                    }
                    return el;
                };
                DateContent.prototype._cleanUp = function () {
                    if (!!this._fn_cleanup) {
                        this._fn_cleanup();
                        this._fn_cleanup = null;
                    }
                    _super.prototype._cleanUp.call(this);
                };
                DateContent.prototype.toString = function () {
                    return 'DateContent';
                };
                return DateContent;
            })(BindingContent);
            baseContent.DateContent = DateContent;

            var DateTimeContent = (function (_super) {
                __extends(DateTimeContent, _super);
                function DateTimeContent() {
                    _super.apply(this, arguments);
                }
                DateTimeContent.prototype._getBindingOption = function (bindingInfo, tgt, dctx, targetPath) {
                    var options = _super.prototype._getBindingOption.call(this, bindingInfo, tgt, dctx, targetPath);
                    options.converter = this.app.getConverter('dateTimeConverter');
                    var finf = this.getFieldInfo(), defaults = RIAPP.global.defaults;
                    switch (finf.dataType) {
                        case consts.DATA_TYPE.DateTime:
                            options.converterParam = defaults.dateTimeFormat;
                            break;
                        case consts.DATA_TYPE.Time:
                            options.converterParam = defaults.timeFormat;
                            break;
                        default:
                            options.converterParam = defaults.dateTimeFormat;
                            break;
                    }
                    return options;
                };
                DateTimeContent.prototype.toString = function () {
                    return 'DateTimeContent';
                };
                return DateTimeContent;
            })(BindingContent);
            baseContent.DateTimeContent = DateTimeContent;

            var NumberContent = (function (_super) {
                __extends(NumberContent, _super);
                function NumberContent() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(NumberContent.prototype, "_allowedKeys", {
                    get: function () {
                        if (!NumberContent.__allowedKeys) {
                            var KEYS = RIAPP.global.consts.KEYS;
                            NumberContent.__allowedKeys = [0, KEYS.backspace, KEYS.del, KEYS.left, KEYS.right, KEYS.end, KEYS.home, KEYS.tab, KEYS.esc, KEYS.enter];
                        }
                        return NumberContent.__allowedKeys;
                    },
                    enumerable: true,
                    configurable: true
                });
                NumberContent.prototype._getBindingOption = function (bindingInfo, tgt, dctx, targetPath) {
                    var options = _super.prototype._getBindingOption.call(this, bindingInfo, tgt, dctx, targetPath);
                    var finf = this.getFieldInfo();
                    switch (finf.dataType) {
                        case consts.DATA_TYPE.Integer:
                            options.converter = this.app.getConverter('integerConverter');
                            break;
                        case consts.DATA_TYPE.Decimal:
                            options.converter = this.app.getConverter('decimalConverter');
                            break;
                        default:
                            options.converter = this.app.getConverter('floatConverter');
                            break;
                    }
                    return options;
                };
                NumberContent.prototype.update = function () {
                    _super.prototype.update.call(this);
                    var self = this;
                    if (self._tgt instanceof MOD.baseElView.TextBoxElView) {
                        (self._tgt).addOnKeyPress(function (sender, args) {
                            args.isCancel = !self._previewKeyPress(args.keyCode, args.value);
                        });
                    }
                };
                NumberContent.prototype._previewKeyPress = function (keyCode, value) {
                    if (this._allowedKeys.indexOf(keyCode) > -1)
                        return true;
                    if (keyCode === 47) {
                        return false;
                    }
                    var keys = { 32: ' ', 44: ',', 46: '.' };
                    var ch = keys[keyCode];
                    var defaults = RIAPP.global.defaults;
                    if (ch === defaults.decimalPoint) {
                        if (value.length === 0)
                            return false; else
                            return value.indexOf(ch) < 0;
                    }
                    if (!!ch && ch !== defaults.thousandSep)
                        return false;
                    return !(!ch && (keyCode < 45 || keyCode > 57));
                };
                NumberContent.prototype.toString = function () {
                    return 'NumberContent';
                };
                NumberContent.__allowedKeys = null;
                return NumberContent;
            })(BindingContent);
            baseContent.NumberContent = NumberContent;

            var StringContent = (function (_super) {
                __extends(StringContent, _super);
                function StringContent() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(StringContent.prototype, "_allowedKeys", {
                    get: function () {
                        if (!StringContent.__allowedKeys) {
                            var KEYS = RIAPP.global.consts.KEYS;
                            StringContent.__allowedKeys = [0, KEYS.backspace, KEYS.del, KEYS.left, KEYS.right, KEYS.end, KEYS.home, KEYS.tab, KEYS.esc, KEYS.enter];
                        }
                        return StringContent.__allowedKeys;
                    },
                    enumerable: true,
                    configurable: true
                });
                StringContent.prototype.update = function () {
                    _super.prototype.update.call(this);
                    var self = this, fieldInfo = self.getFieldInfo();
                    if (self._tgt instanceof MOD.baseElView.TextBoxElView) {
                        (self._tgt).addOnKeyPress(function (sender, args) {
                            args.isCancel = !self._previewKeyPress(fieldInfo, args.keyCode, args.value);
                        });
                    }
                };
                StringContent.prototype._previewKeyPress = function (fieldInfo, keyCode, value) {
                    return !(fieldInfo.maxLength > 0 && value.length >= fieldInfo.maxLength && this._allowedKeys.indexOf(keyCode) === -1);
                };
                StringContent.prototype.toString = function () {
                    return 'StringContent';
                };
                StringContent.__allowedKeys = null;
                return StringContent;
            })(BindingContent);
            baseContent.StringContent = StringContent;

            var MultyLineContent = (function (_super) {
                __extends(MultyLineContent, _super);
                function MultyLineContent(app, parentEl, options, dctx, isEditing) {
                    if (options.name != 'multyline') {
                        throw new Error(utils.format(RIAPP.ERRS.ERR_ASSERTION_FAILED, "options.name == 'multyline'"));
                    }
                    _super.call(this, app, parentEl, options, dctx, isEditing);
                }
                Object.defineProperty(MultyLineContent.prototype, "_allowedKeys", {
                    get: function () {
                        if (!MultyLineContent.__allowedKeys) {
                            var KEYS = RIAPP.global.consts.KEYS;
                            MultyLineContent.__allowedKeys = [0, KEYS.backspace, KEYS.del, KEYS.left, KEYS.right, KEYS.end, KEYS.home, KEYS.tab, KEYS.esc, KEYS.enter];
                        }
                        return MultyLineContent.__allowedKeys;
                    },
                    enumerable: true,
                    configurable: true
                });

                MultyLineContent.prototype._createTargetElement = function () {
                    var tgt;
                    if (this._isEditing && this._canBeEdited()) {
                        tgt = RIAPP.global.document.createElement('textarea');
                    } else {
                        tgt = RIAPP.global.document.createElement('div');
                    }
                    this._updateCss();
                    return tgt;
                };
                MultyLineContent.prototype.update = function () {
                    _super.prototype.update.call(this);
                    var self = this, fieldInfo = self.getFieldInfo();

                    if (self._tgt instanceof MOD.baseElView.TextAreaElView) {
                        (self._tgt).addOnKeyPress(function (sender, args) {
                            args.isCancel = !self._previewKeyPress(fieldInfo, args.keyCode, args.value);
                        });
                        var multylnOpt = this._options.options;
                        var tgt = self._tgt;
                        if (!!multylnOpt) {
                            if (!!multylnOpt.rows) {
                                tgt.rows = multylnOpt.rows;
                            }
                            if (!!multylnOpt.cols) {
                                tgt.cols = multylnOpt.cols;
                            }
                            if (!!multylnOpt.wrap) {
                                tgt.wrap = multylnOpt.wrap;
                            }
                        }
                    }
                };
                MultyLineContent.prototype._previewKeyPress = function (fieldInfo, keyCode, value) {
                    return !(fieldInfo.maxLength > 0 && value.length >= fieldInfo.maxLength && this._allowedKeys.indexOf(keyCode) === -1);
                };
                MultyLineContent.prototype.toString = function () {
                    return 'MultyLineContent';
                };
                MultyLineContent.__allowedKeys = null;
                return MultyLineContent;
            })(BindingContent);
            baseContent.MultyLineContent = MultyLineContent;

            var ContentFactory = (function () {
                function ContentFactory(app, nextFactory) {
                    this._app = app;
                    this._nextFactory = nextFactory;
                }
                ContentFactory.prototype.getContentType = function (options) {
                    if (!!options.templateInfo) {
                        return TemplateContent;
                    }
                    if (!options.bindingInfo)
                        throw new Error(utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'options', 'bindingInfo'));

                    var DATA_TYPE = consts.DATA_TYPE, fieldInfo = options.fieldInfo, res;
                    switch (fieldInfo.dataType) {
                        case DATA_TYPE.None:
                            res = BindingContent;
                            break;
                        case DATA_TYPE.String:
                            if (options.name == 'multyline')
                                res = MultyLineContent; else
                                res = StringContent;
                            break;
                        case DATA_TYPE.Bool:
                            res = BoolContent;
                            break;
                        case DATA_TYPE.Integer:
                            res = NumberContent;
                            break;
                        case DATA_TYPE.Decimal:
                        case DATA_TYPE.Float:
                            res = NumberContent;
                            break;
                        case DATA_TYPE.DateTime:
                        case DATA_TYPE.Time:
                            res = DateTimeContent;
                            break;
                        case DATA_TYPE.Date:
                            res = DateContent;
                            break;
                        case DATA_TYPE.Guid:
                        case DATA_TYPE.Binary:
                            res = BindingContent;
                            break;
                        default:
                            throw new Error(utils.format(RIAPP.ERRS.ERR_FIELD_DATATYPE, fieldInfo.dataType));
                    }
                    if (!res && this._nextFactory) {
                        res = this._nextFactory.getContentType(options);
                    }
                    if (!res)
                        throw new Error(RIAPP.ERRS.ERR_BINDING_CONTENT_NOT_FOUND);
                    return res;
                };

                ContentFactory.prototype.createContent = function (parentEl, options, dctx, isEditing) {
                    var contentType = this.getContentType(options);
                    return new contentType(this._app, parentEl, options, dctx, isEditing);
                };
                ContentFactory.prototype.isExternallyCachable = function (contentType) {
                    return false;
                };
                Object.defineProperty(ContentFactory.prototype, "app", {
                    get: function () {
                        return this._app;
                    },
                    enumerable: true,
                    configurable: true
                });
                return ContentFactory;
            })();
            baseContent.ContentFactory = ContentFactory;

            function initModule(app) {
                app.registerContentFactory(function (nextFactory) {
                    return new ContentFactory(app, nextFactory);
                });
                return baseContent;
            }
            baseContent.initModule = initModule;
            ;

            RIAPP.global.onModuleLoaded('baseContent', baseContent);
        })(MOD.baseContent || (MOD.baseContent = {}));
        var baseContent = MOD.baseContent;
    })(RIAPP.MOD || (RIAPP.MOD = {}));
    var MOD = RIAPP.MOD;
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    (function (MOD) {
        (function (db) {
            var utils = RIAPP.global.utils, consts = RIAPP.global.consts, ValidationError = MOD.binding.ValidationError;
            var valueUtils = RIAPP.MOD.utils.valueUtils, COLL_CHANGE_TYPE = RIAPP.MOD.collection.consts.COLL_CHANGE_TYPE, CHANGE_TYPE = RIAPP.MOD.consts.CHANGE_TYPE, FLAGS = { None: 0, Changed: 1, Setted: 2, Refreshed: 4 }, FILTER_TYPE = { Equals: 0, Between: 1, StartsWith: 2, EndsWith: 3, Contains: 4, Gt: 5, Lt: 6, GtEq: 7, LtEq: 8, NotEq: 9 }, SORT_ORDER = MOD.collection.consts.SORT_ORDER;
            var DATA_OPER = { SUBMIT: 'submit', LOAD: 'load', INVOKE: 'invoke', REFRESH: 'refresh', INIT: 'initDbContext' };
            var DATA_SVC_METH = {
                Invoke: 'InvokeMethod',
                LoadData: 'GetItems',
                GetMetadata: 'GetMetadata',
                GetPermissions: 'GetPermissions',
                Submit: 'SaveChanges',
                Refresh: 'RefreshItem'
            };
            var REFRESH_MODE = { NONE: 0, RefreshCurrent: 1, MergeIntoCurrent: 2, CommitChanges: 3 };
            var DELETE_ACTION = { NoAction: 0, Cascade: 1, SetNulls: 2 };
            var DataOperationError = (function (_super) {
                __extends(DataOperationError, _super);
                function DataOperationError(ex, operationName) {
                    var message;
                    if (!!ex)
                        message = ex.message;
                    if (!message)
                        message = '' + ex;
                    _super.call(this, message);
                    this._origError = ex;
                    this._operationName = operationName;
                }
                Object.defineProperty(DataOperationError.prototype, "operationName", {
                    get: function () {
                        return this._operationName;
                    },
                    enumerable: true,
                    configurable: true
                });
                return DataOperationError;
            })(RIAPP.MOD.errors.BaseError);
            db.DataOperationError = DataOperationError;
            var AccessDeniedError = (function (_super) {
                __extends(AccessDeniedError, _super);
                function AccessDeniedError() {
                    _super.apply(this, arguments);
                }
                return AccessDeniedError;
            })(DataOperationError);
            db.AccessDeniedError = AccessDeniedError;
            var ConcurrencyError = (function (_super) {
                __extends(ConcurrencyError, _super);
                function ConcurrencyError() {
                    _super.apply(this, arguments);
                }
                return ConcurrencyError;
            })(DataOperationError);
            db.ConcurrencyError = ConcurrencyError;
            var SvcValidationError = (function (_super) {
                __extends(SvcValidationError, _super);
                function SvcValidationError() {
                    _super.apply(this, arguments);
                }
                return SvcValidationError;
            })(DataOperationError);
            db.SvcValidationError = SvcValidationError;
            var SubmitError = (function (_super) {
                __extends(SubmitError, _super);
                function SubmitError(origError, allSubmitted, notValidated) {
                    var message = origError.message || ('' + origError);
                    _super.call(this, message, DATA_OPER.SUBMIT);
                    this._origError = origError;
                    this._allSubmitted = allSubmitted || [];
                    this._notValidated = notValidated || [];
                    if (this._notValidated.length > 0) {
                        var res = [message + ':'];
                        this._notValidated.forEach(function (item) {
                            res.push(utils.format('item key:{0} errors:{1}', item._key, item.getErrorString()));
                        });
                        this._message = res.join('\r\n');
                    }
                }
                Object.defineProperty(SubmitError.prototype, "allSubmitted", {
                    get: function () {
                        return this._allSubmitted;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SubmitError.prototype, "notValidated", {
                    get: function () {
                        return this._notValidated;
                    },
                    enumerable: true,
                    configurable: true
                });
                return SubmitError;
            })(DataOperationError);
            db.SubmitError = SubmitError;

            function __checkError(svcError, oper) {
                if (!svcError)
                    return;
                switch (svcError.name) {
                    case "AccessDeniedException":
                        throw new AccessDeniedError(RIAPP.ERRS.ERR_ACCESS_DENIED, oper);
                        break;
                    case "ConcurrencyException":
                        throw new ConcurrencyError(RIAPP.ERRS.ERR_CONCURRENCY, oper);
                        break;
                    case "ValidationException":
                        throw new SvcValidationError(utils.format(RIAPP.ERRS.ERR_VALIDATION, svcError.message), oper);
                        break;
                    case "DomainServiceException":
                        throw new DataOperationError(utils.format(RIAPP.ERRS.ERR_SVC_ERROR, svcError.message), oper);
                        break;
                    default:
                        throw new DataOperationError(utils.format(RIAPP.ERRS.ERR_UNEXPECTED_SVC_ERROR, svcError.message), oper);
                }
            }
            ;

            var DataCache = (function (_super) {
                __extends(DataCache, _super);
                function DataCache(query) {
                    _super.call(this);
                    this._query = query;
                    this._cache = [];
                    this._totalCount = 0;
                    this._itemsByKey = {};
                }
                DataCache.prototype.getCachedPage = function (pageIndex) {
                    var res = this._cache.filter(function (page) {
                        return page.pageIndex === pageIndex;
                    });
                    if (res.length == 0)
                        return null;
                    if (res.length != 1)
                        throw new Error(utils.format(RIAPP.ERRS.ERR_ASSERTION_FAILED, "res.length == 1"));
                    return res[0];
                };

                DataCache.prototype.reindexCache = function () {
                    var self = this, page;
                    this._itemsByKey = {};
                    for (var i = 0; i < this._cache.length; i += 1) {
                        page = this._cache[i];
                        page.items.forEach(function (item) {
                            self._itemsByKey[item._key] = item;
                        });
                    }
                };
                DataCache.prototype.getPrevCachedPageIndex = function (currentPageIndex) {
                    var pageIndex = -1, cachePageIndex;
                    for (var i = 0; i < this._cache.length; i += 1) {
                        cachePageIndex = this._cache[i].pageIndex;
                        if (cachePageIndex > pageIndex && cachePageIndex < currentPageIndex)
                            pageIndex = cachePageIndex;
                    }
                    return pageIndex;
                };
                DataCache.prototype.getNextRange = function (pageIndex) {
                    var half = Math.floor(((this.loadPageCount - 1) / 2));
                    var above = (pageIndex + half) + ((this.loadPageCount - 1) % 2);
                    var below = (pageIndex - half), prev = this.getPrevCachedPageIndex(pageIndex);
                    if (below < 0) {
                        above += (0 - below);
                        below = 0;
                    }
                    if (below <= prev) {
                        above += (prev - below + 1);
                        below += (prev - below + 1);
                    }
                    if (this._pageCount > this.loadPageCount && above > (this._pageCount - 1)) {
                        below -= (above - (this._pageCount - 1));

                        if (below < 0) {
                            below = 0;
                        }

                        above = this._pageCount - 1;
                    }

                    if (below <= prev) {
                        above += (prev - below + 1);
                        below += (prev - below + 1);
                    }

                    var cnt = above - below + 1;
                    if (cnt < this.loadPageCount) {
                        above += this.loadPageCount - cnt;
                        cnt = above - below + 1;
                    }
                    var start = below;
                    var end = above;
                    return { start: start, end: end, cnt: cnt };
                };
                DataCache.prototype.fillCache = function (start, items) {
                    var item, keyMap = this._itemsByKey;
                    var i, j, k, len = items.length, pageIndex, page, pageSize = this.pageSize;
                    for (i = 0; i < this.loadPageCount; i += 1) {
                        pageIndex = start + i;
                        page = this.getCachedPage(pageIndex);
                        if (!page) {
                            page = { items: [], pageIndex: pageIndex };
                            this._cache.push(page);
                        }
                        for (j = 0; j < pageSize; j += 1) {
                            k = (i * pageSize) + j;
                            if (k < len) {
                                item = items[k];
                                if (!!keyMap[item._key]) {
                                    continue;
                                }
                                page.items.push(item);
                                keyMap[item._key] = item;
                                item._isCached = true;
                            } else {
                                return;
                            }
                        }
                    }
                };
                DataCache.prototype.clear = function () {
                    var i, j, items, item, dbSet = this._query.dbSet;
                    for (i = 0; i < this._cache.length; i += 1) {
                        items = this._cache[i].items;
                        for (j = 0; j < items.length; j += 1) {
                            item = items[j];
                            if (!!item && item._key !== null) {
                                item._isCached = false;
                                if (!dbSet.getItemByKey(item._key))
                                    item.destroy();
                            }
                        }
                    }
                    this._cache = [];
                    this._itemsByKey = {};
                };
                DataCache.prototype.clearCacheForPage = function (pageIndex) {
                    var page = this.getCachedPage(pageIndex), dbSet = this._query.dbSet;
                    if (!page)
                        return;
                    var j, items, item, index = this._cache.indexOf(page);
                    items = page.items;
                    for (j = 0; j < items.length; j += 1) {
                        item = items[j];
                        if (!!item && item._key !== null) {
                            delete this._itemsByKey[item._key];
                            item._isCached = false;
                            if (!dbSet.getItemByKey(item._key))
                                item.destroy();
                        }
                    }
                    this._cache.splice(index, 1);
                };
                DataCache.prototype.hasPage = function (pageIndex) {
                    for (var i = 0; i < this._cache.length; i += 1) {
                        if (this._cache[i].pageIndex === pageIndex)
                            return true;
                    }
                    return false;
                };
                DataCache.prototype.getItemByKey = function (key) {
                    return this._itemsByKey[key];
                };
                DataCache.prototype.getPageByItem = function (item) {
                    item = this._itemsByKey[item._key];
                    if (!item)
                        return -1;
                    for (var i = 0; i < this._cache.length; i += 1) {
                        if (this._cache[i].items.indexOf(item) > -1) {
                            return this._cache[i].pageIndex;
                        }
                    }
                    return -1;
                };
                DataCache.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this.clear();
                    _super.prototype.destroy.call(this);
                };
                DataCache.prototype.toString = function () {
                    return 'DataCache';
                };
                Object.defineProperty(DataCache.prototype, "_pageCount", {
                    get: function () {
                        var rowCount = this.totalCount, rowPerPage = this.pageSize, result;

                        if ((rowCount === 0) || (rowPerPage === 0)) {
                            return 0;
                        }

                        if ((rowCount % rowPerPage) === 0) {
                            result = (rowCount / rowPerPage);
                        } else {
                            result = (rowCount / rowPerPage);
                            result = Math.floor(result) + 1;
                        }
                        return result;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataCache.prototype, "pageSize", {
                    get: function () {
                        return this._query.pageSize;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataCache.prototype, "loadPageCount", {
                    get: function () {
                        return this._query.loadPageCount;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataCache.prototype, "totalCount", {
                    get: function () {
                        return this._totalCount;
                    },
                    set: function (v) {
                        if (utils.check.isNt(v))
                            v = 0;
                        if (v !== this._totalCount) {
                            this._totalCount = v;
                            this.raisePropertyChanged('totalCount');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataCache.prototype, "cacheSize", {
                    get: function () {
                        return this._cache.length;
                    },
                    enumerable: true,
                    configurable: true
                });
                return DataCache;
            })(RIAPP.BaseObject);
            db.DataCache = DataCache;

            var DataQuery = (function (_super) {
                __extends(DataQuery, _super);
                function DataQuery(dbSet, queryInfo) {
                    _super.call(this);
                    this._dbSet = dbSet;
                    this.__queryInfo = queryInfo;
                    this._filterInfo = { filterItems: [] };
                    this._sortInfo = { sortItems: [] };
                    this._isIncludeTotalCount = true;
                    this._isClearPrevData = true;
                    this._pageSize = dbSet.pageSize;
                    this._pageIndex = dbSet.pageIndex;
                    this._params = {};
                    this._loadPageCount = 1;
                    this._isClearCacheOnEveryLoad = true;
                    this._dataCache = null;
                    this._cacheInvalidated = false;
                }
                DataQuery.prototype.getFieldInfo = function (fieldName) {
                    return this._dbSet.getFieldInfo(fieldName);
                };
                DataQuery.prototype.getFieldNames = function () {
                    var fldMap = this._dbSet._fieldMap;
                    return utils.getProps(fldMap);
                };
                DataQuery.prototype._addSort = function (fieldName, sortOrder) {
                    var sort = SORT_ORDER.ASC, sortInfo = this._sortInfo;
                    if (!!sortOrder && sortOrder.toLowerCase().substr(0, 1) === 'd')
                        sort = SORT_ORDER.DESC;
                    var sortItem = { fieldName: fieldName, sortOrder: sort };
                    sortInfo.sortItems.push(sortItem);
                    this._cacheInvalidated = true;
                };
                DataQuery.prototype._addFilterItem = function (fieldName, operand, value) {
                    var F_TYPE = FILTER_TYPE, fkind = F_TYPE.Equals;
                    var fld = this.getFieldInfo(fieldName);
                    if (!fld)
                        throw new Error(utils.format(RIAPP.ERRS.ERR_DBSET_INVALID_FIELDNAME, this.dbSetName, fieldName));

                    var stz = this._serverTimezone, dcnv = fld.dateConversion, val = value;
                    if (!utils.check.isArray(val))
                        val = [value];
                    var tmp = RIAPP.ArrayHelper.clone(val);
                    val = tmp.map(function (el) {
                        return valueUtils.stringifyValue(el, dcnv, stz);
                    });

                    switch (operand.toLowerCase()) {
                        case "equals":
                        case "=":
                            fkind = F_TYPE.Equals;
                            break;
                        case "noteq":
                        case "!=":
                        case "<>":
                            fkind = F_TYPE.NotEq;
                            break;
                        case "between":
                            fkind = F_TYPE.Between;
                            if (value.length != 2)
                                throw new Error(RIAPP.ERRS.ERR_QUERY_BETWEEN);
                            break;
                        case "startswith":
                            fkind = F_TYPE.StartsWith;
                            break;
                        case "endswith":
                            fkind = F_TYPE.EndsWith;
                            break;
                        case "contains":
                            fkind = F_TYPE.Contains;
                            break;
                        case "gt":
                        case ">":
                            fkind = F_TYPE.Gt;
                            break;
                        case "gteq":
                        case ">=":
                            fkind = F_TYPE.GtEq;
                            break;
                        case "lt":
                        case "<":
                            fkind = F_TYPE.Lt;
                            break;
                        case "lteq":
                        case "<=":
                            fkind = F_TYPE.LtEq;
                            break;
                        default:
                            throw new Error(utils.format(RIAPP.ERRS.ERR_QUERY_OPERATOR_INVALID, operand));
                    }
                    var filterItem = { fieldName: fieldName, kind: fkind, values: val };
                    this._filterInfo.filterItems.push(filterItem);
                    this._cacheInvalidated = true;
                };
                DataQuery.prototype.where = function (fieldName, operand, value) {
                    this._addFilterItem(fieldName, operand, value);
                    return this;
                };
                DataQuery.prototype.and = function (fieldName, operand, value) {
                    this._addFilterItem(fieldName, operand, value);
                    return this;
                };
                DataQuery.prototype.orderBy = function (fieldName, sortOrder) {
                    this._addSort(fieldName, sortOrder);
                    return this;
                };
                DataQuery.prototype.thenBy = function (fieldName, sortOrder) {
                    this._addSort(fieldName, sortOrder);
                    return this;
                };
                DataQuery.prototype.clearSort = function () {
                    this._sortInfo.sortItems = [];
                    this._cacheInvalidated = true;
                    return this;
                };
                DataQuery.prototype.clearFilter = function () {
                    this._filterInfo.filterItems = [];
                    this._cacheInvalidated = true;
                    return this;
                };
                DataQuery.prototype.clearParams = function () {
                    this._params = {};
                    this._cacheInvalidated = true;
                    return this;
                };
                DataQuery.prototype._clearCache = function () {
                    if (!!this._dataCache) {
                        this._dataCache.destroy();
                        this._dataCache = null;
                    }
                    this._resetCacheInvalidated();
                };
                DataQuery.prototype._getCache = function () {
                    if (!this._dataCache) {
                        this._dataCache = new DataCache(this);
                    }
                    return this._dataCache;
                };
                DataQuery.prototype._reindexCache = function () {
                    if (!this._dataCache) {
                        return;
                    }
                    this._dataCache.reindexCache();
                };
                DataQuery.prototype._isPageCached = function (pageIndex) {
                    if (!this._dataCache) {
                        return false;
                    }
                    return this._dataCache.hasPage(pageIndex);
                };
                DataQuery.prototype._resetCacheInvalidated = function () {
                    this._cacheInvalidated = false;
                };
                DataQuery.prototype.load = function () {
                    return this.dbSet.dbContext.load(this);
                };
                DataQuery.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._clearCache();
                    _super.prototype.destroy.call(this);
                };
                DataQuery.prototype.toString = function () {
                    return 'DataQuery';
                };
                Object.defineProperty(DataQuery.prototype, "_queryInfo", {
                    get: function () {
                        return this.__queryInfo;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "_serverTimezone", {
                    get: function () {
                        return this._dbSet.dbContext.serverTimezone;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "entityType", {
                    get: function () {
                        return this._dbSet.entityType;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "dbSet", {
                    get: function () {
                        return this._dbSet;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "dbSetName", {
                    get: function () {
                        return this._dbSet.dbSetName;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "queryName", {
                    get: function () {
                        return this.__queryInfo.methodName;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "filterInfo", {
                    get: function () {
                        return this._filterInfo;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "sortInfo", {
                    get: function () {
                        return this._sortInfo;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "isIncludeTotalCount", {
                    get: function () {
                        return this._isIncludeTotalCount;
                    },
                    set: function (v) {
                        this._isIncludeTotalCount = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "isClearPrevData", {
                    get: function () {
                        return this._isClearPrevData;
                    },
                    set: function (v) {
                        this._isClearPrevData = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "pageSize", {
                    get: function () {
                        return this._pageSize;
                    },
                    set: function (v) {
                        if (this._pageSize != v) {
                            this._pageSize = v;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "pageIndex", {
                    get: function () {
                        return this._pageIndex;
                    },
                    set: function (v) {
                        if (this._pageIndex != v) {
                            this._pageIndex = v;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "params", {
                    get: function () {
                        return this._params;
                    },
                    set: function (v) {
                        if (this._params !== v) {
                            this._params = v;
                            this._cacheInvalidated = true;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "isPagingEnabled", {
                    get: function () {
                        return this._dbSet.isPagingEnabled;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "loadPageCount", {
                    get: function () {
                        return this._loadPageCount;
                    },
                    set: function (v) {
                        if (v < 1) {
                            v = 1;
                        }
                        if (this._loadPageCount != v) {
                            this._loadPageCount = v;
                            if (v === 1) {
                                this._clearCache();
                            }
                            this.raisePropertyChanged('loadPageCount');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "isClearCacheOnEveryLoad", {
                    get: function () {
                        return this._isClearCacheOnEveryLoad;
                    },
                    set: function (v) {
                        if (this._isClearCacheOnEveryLoad != v) {
                            this._isClearCacheOnEveryLoad = v;
                            this.raisePropertyChanged('isClearCacheOnEveryLoad');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "isCacheValid", {
                    get: function () {
                        return !!this._dataCache && !this._cacheInvalidated;
                    },
                    enumerable: true,
                    configurable: true
                });
                return DataQuery;
            })(RIAPP.BaseObject);
            db.DataQuery = DataQuery;

            var Entity = (function (_super) {
                __extends(Entity, _super);
                function Entity(dbSet, row, names) {
                    this.__dbSet = dbSet;
                    _super.call(this);
                    this.__changeType = CHANGE_TYPE.NONE;
                    this.__isRefreshing = false;
                    this.__isCached = false;

                    this._srvRowKey = null;
                    this._origVals = null;
                    this._saveChangeType = null;
                    var fields = this.getFieldNames();
                    fields.forEach(function (fieldName) {
                        this._vals[fieldName] = null;
                    }, this);
                    this._initRowInfo(row, names);
                }
                Entity.prototype._updateKeys = function (srvKey) {
                    this._srvRowKey = srvKey;
                    this._key = srvKey;
                };
                Entity.prototype._initRowInfo = function (row, names) {
                    if (!row)
                        return;
                    var self = this, stz = self._serverTimezone;
                    this._srvRowKey = row.key;
                    this._key = row.key;
                    row.values.forEach(function (val, index) {
                        var fieldName = names[index], fld = self.getFieldInfo(fieldName);
                        if (!fld)
                            throw new Error(utils.format(RIAPP.ERRS.ERR_DBSET_INVALID_FIELDNAME, self._dbSetName, fieldName));

                        var newVal = val, dataType = fld.dataType, dcnv = fld.dateConversion, res = valueUtils.parseValue(newVal, dataType, dcnv, stz);
                        self._vals[fld.fieldName] = res;
                    });
                };
                Entity.prototype._checkCanRefresh = function () {
                    if (this._key === null || this._changeType === CHANGE_TYPE.ADDED) {
                        throw new Error(RIAPP.ERRS.ERR_OPER_REFRESH_INVALID);
                    }
                };
                Entity.prototype._refreshValue = function (val, fieldName, refreshMode) {
                    var self = this, fld = self.getFieldInfo(fieldName);
                    if (!fld)
                        throw new Error(utils.format(RIAPP.ERRS.ERR_DBSET_INVALID_FIELDNAME, this._dbSetName, fieldName));
                    var stz = self._serverTimezone, newVal, oldVal, oldValOrig, dataType = fld.dataType, dcnv = fld.dateConversion;
                    newVal = valueUtils.parseValue(val, dataType, dcnv, stz);
                    oldVal = self._vals[fieldName];
                    switch (refreshMode) {
                        case REFRESH_MODE.CommitChanges:
                             {
                                if (!valueUtils.compareVals(newVal, oldVal, dataType)) {
                                    self._vals[fieldName] = newVal;
                                    self._onFieldChanged(fld);
                                }
                            }
                            break;
                        case REFRESH_MODE.RefreshCurrent:
                             {
                                if (!!self._origVals) {
                                    self._origVals[fieldName] = newVal;
                                }
                                if (!!self._saveVals) {
                                    self._saveVals[fieldName] = newVal;
                                }
                                if (!valueUtils.compareVals(newVal, oldVal, dataType)) {
                                    self._vals[fieldName] = newVal;
                                    self._onFieldChanged(fld);
                                }
                            }
                            break;
                        case REFRESH_MODE.MergeIntoCurrent:
                             {
                                if (!!self._origVals) {
                                    oldValOrig = self._origVals[fieldName];
                                    self._origVals[fieldName] = newVal;
                                }
                                if (oldValOrig === undefined || valueUtils.compareVals(oldValOrig, oldVal, dataType)) {
                                    if (!valueUtils.compareVals(newVal, oldVal, dataType)) {
                                        self._vals[fieldName] = newVal;
                                        self._onFieldChanged(fld);
                                    }
                                }
                            }
                            break;
                        default:
                            throw new Error(utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'refreshMode', refreshMode));
                    }
                };
                Entity.prototype._refreshValues = function (rowInfo, refreshMode) {
                    var self = this, oldCT = this._changeType;
                    if (!this._isDestroyed) {
                        if (!refreshMode) {
                            refreshMode = REFRESH_MODE.RefreshCurrent;
                        }
                        rowInfo.values.forEach(function (val) {
                            if (!((val.flags & FLAGS.Refreshed) === FLAGS.Refreshed))
                                return;
                            self._refreshValue(val.val, val.fieldName, refreshMode);
                        });

                        if (oldCT === CHANGE_TYPE.UPDATED) {
                            var changes = this._getStrValues(true);
                            if (changes.length === 0) {
                                this._origVals = null;
                                this._changeType = CHANGE_TYPE.NONE;
                            }
                        }
                    }
                };
                Entity.prototype._onFieldChanged = function (fieldInfo) {
                    var self = this;
                    this.raisePropertyChanged(fieldInfo.fieldName);
                    if (!!fieldInfo.dependents && fieldInfo.dependents.length > 0)
                        fieldInfo.dependents.forEach(function (d) {
                            self.raisePropertyChanged(d);
                        });
                };
                Entity.prototype._getStrValues = function (changedOnly) {
                    var self = this, names = this.getFieldNames(), dbSet = this._dbSet, res, res2;
                    res = names.map(function (name) {
                        var fld = self.getFieldInfo(name);
                        if (fld.isClientOnly)
                            return null;

                        var newVal = dbSet._getStrValue(self._vals[name], fld), oldV = self._origVals === null ? newVal : dbSet._getStrValue(self._origVals[name], fld), isChanged = (oldV !== newVal);
                        if (isChanged)
                            return { val: newVal, orig: oldV, fieldName: name, flags: (FLAGS.Changed | FLAGS.Setted) }; else if (fld.isPrimaryKey > 0 || fld.isRowTimeStamp || fld.isNeedOriginal)
                            return { val: newVal, orig: oldV, fieldName: name, flags: FLAGS.Setted }; else
                            return { val: null, orig: null, fieldName: name, flags: FLAGS.None };
                    });

                    res2 = res.filter(function (v) {
                        if (!v)
                            return false;
                        return changedOnly ? ((v.flags & FLAGS.Changed) === FLAGS.Changed) : true;
                    });
                    return res2;
                };
                Entity.prototype._getRowInfo = function () {
                    var res = {
                        values: this._getStrValues(false),
                        changeType: this._changeType,
                        serverKey: this._srvKey,
                        clientKey: this._key,
                        error: null
                    };
                    return res;
                };
                Entity.prototype._fldChanging = function (fieldInfo, oldV, newV) {
                    if (!this._origVals) {
                        this._origVals = utils.shallowCopy(this._vals);
                    }
                    return true;
                };
                Entity.prototype._fldChanged = function (fieldInfo, oldV, newV) {
                    if (!fieldInfo.isClientOnly) {
                        switch (this._changeType) {
                            case CHANGE_TYPE.NONE:
                                this._changeType = CHANGE_TYPE.UPDATED;
                                break;
                        }
                    }
                    this._onFieldChanged(fieldInfo);
                    return true;
                };
                Entity.prototype._clearFieldVal = function (fieldName) {
                    this._vals[fieldName] = null;
                };
                Entity.prototype._skipValidate = function (fieldInfo, val) {
                    var childToParentNames = this._dbSet._getChildToParentNames(fieldInfo.fieldName), res = false;
                    if (!!childToParentNames && val === null) {
                        for (var i = 0, len = childToParentNames.length; i < len; i += 1) {
                            res = !!this._getFieldVal(childToParentNames[i]);
                            if (res)
                                break;
                        }
                    }
                    return res;
                };
                Entity.prototype._getFieldVal = function (fieldName) {
                    return this._vals[fieldName];
                };
                Entity.prototype._setFieldVal = function (fieldName, val) {
                    var validation_error, error, dbSetName = this._dbSetName, coll = this._collection, ERRS = RIAPP.ERRS, oldV = this._vals[fieldName], newV = val, fld = this.getFieldInfo(fieldName);
                    if (!fld)
                        throw new Error(utils.format(ERRS.ERR_DBSET_INVALID_FIELDNAME, dbSetName, fieldName));
                    if (!this._isEditing && !this._isUpdating)
                        this.beginEdit();
                    try  {
                        newV = this._checkVal(fld, newV);
                        if (oldV != newV) {
                            if (this._fldChanging(fld, oldV, newV)) {
                                this._vals[fieldName] = newV;
                                this._fldChanged(fld, oldV, newV);
                            }
                        }
                        coll._removeError(this, fieldName);
                        validation_error = this._validateField(fieldName);
                        if (!!validation_error) {
                            throw new ValidationError([validation_error], this);
                        }
                    } catch (ex) {
                        if (ex instanceof ValidationError) {
                            error = ex;
                        } else {
                            error = new ValidationError([
                                { fieldName: fieldName, errors: [ex.message] }
                            ], this);
                        }
                        coll._addError(this, fieldName, error.errors[0].errors);
                        throw error;
                    }
                    return true;
                };
                Entity.prototype._onAttaching = function () {
                    _super.prototype._onAttaching.call(this);
                    this.__changeType = CHANGE_TYPE.ADDED;
                };
                Entity.prototype._onAttach = function () {
                    _super.prototype._onAttach.call(this);
                    if (this._key === null)
                        throw new Error(RIAPP.ERRS.ERR_ITEM_IS_DETACHED);
                    this._dbSet._addToChanged(this);
                };
                Entity.prototype._beginEdit = function () {
                    if (!_super.prototype._beginEdit.call(this))
                        return false;
                    this._saveChangeType = this._changeType;
                    return true;
                };
                Entity.prototype._endEdit = function () {
                    if (!_super.prototype._endEdit.call(this))
                        return false;
                    this._saveChangeType = null;
                    return true;
                };
                Entity.prototype.deleteItem = function () {
                    return this.deleteOnSubmit();
                };
                Entity.prototype.deleteOnSubmit = function () {
                    var oldCT = this._changeType, eset = this._dbSet;
                    if (!eset._onItemDeleting(this)) {
                        return false;
                    }
                    if (this._key === null)
                        return false;
                    if (oldCT === CHANGE_TYPE.ADDED) {
                        eset.removeItem(this);
                        return true;
                    }
                    this._changeType = CHANGE_TYPE.DELETED;
                    return true;
                };
                Entity.prototype.acceptChanges = function (rowInfo) {
                    var oldCT = this._changeType, eset = this._dbSet;
                    if (this._key === null)
                        return;
                    if (oldCT !== CHANGE_TYPE.NONE) {
                        eset._onCommitChanges(this, true, false, oldCT);
                        if (oldCT === CHANGE_TYPE.DELETED) {
                            eset.removeItem(this);
                            return;
                        }
                        this._origVals = null;
                        if (!!this._saveVals)
                            this._saveVals = utils.shallowCopy(this._vals);
                        this._changeType = CHANGE_TYPE.NONE;
                        eset._removeAllErrors(this);
                        if (!!rowInfo)
                            this._refreshValues(rowInfo, REFRESH_MODE.CommitChanges);
                        eset._onCommitChanges(this, false, false, oldCT);
                    }
                };
                Entity.prototype.rejectChanges = function () {
                    var self = this, oldCT = this._changeType, eset = this._dbSet;
                    if (this._key === null)
                        return;

                    if (oldCT !== CHANGE_TYPE.NONE) {
                        eset._onCommitChanges(this, true, true, oldCT);
                        if (oldCT === CHANGE_TYPE.ADDED) {
                            eset.removeItem(this);
                            return;
                        }

                        var changes = this._getStrValues(true);
                        if (!!this._origVals) {
                            this._vals = utils.shallowCopy(this._origVals);
                            this._origVals = null;
                            if (!!this._saveVals) {
                                this._saveVals = utils.shallowCopy(this._vals);
                            }
                        }
                        this._changeType = CHANGE_TYPE.NONE;
                        eset._removeAllErrors(this);
                        changes.forEach(function (v) {
                            self._onFieldChanged(eset.getFieldInfo(v.fieldName));
                        });
                        eset._onCommitChanges(this, false, true, oldCT);
                    }
                };
                Entity.prototype.submitChanges = function () {
                    var dbContext = this.getDbContext(), uniqueID = utils.uuid();
                    dbContext.addOnSubmitError(function (sender, args) {
                        if (args.error instanceof db.SubmitError) {
                            var submitErr = args.error;
                            if (submitErr.notValidated.length > 0) {
                                args.isHandled = true;
                            }
                        }
                    }, uniqueID);

                    var promise = dbContext.submitChanges();
                    promise.always(function () {
                        dbContext.removeOnSubmitError(uniqueID);
                    });
                    return promise;
                };
                Entity.prototype.refresh = function () {
                    var eset = this._dbSet, db = eset.dbContext;
                    return db._refreshItem(this);
                };
                Entity.prototype.cancelEdit = function () {
                    if (!this._isEditing)
                        return false;
                    var self = this, changes = this._getStrValues(true), isNew = this._isNew, coll = this._dbSet;
                    this._isEditing = false;
                    this._vals = this._saveVals;
                    this._saveVals = null;
                    this._changeType = this._saveChangeType;
                    this._saveChangeType = null;
                    coll._removeAllErrors(this);
                    changes.forEach(function (v) {
                        self.raisePropertyChanged(v.fieldName);
                    });
                    if (isNew && this._notEdited) {
                        coll.removeItem(this);
                    }
                    coll._onEditing(this, false, true);
                    this.raisePropertyChanged('isEditing');
                    return true;
                };
                Entity.prototype.getDbContext = function () {
                    return this.__dbSet.dbContext;
                };
                Entity.prototype.getDbSet = function () {
                    return this.__dbSet;
                };
                Entity.prototype.toString = function () {
                    return 'Entity';
                };
                Entity.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this.__dbSet = null;
                    this._srvRowKey = null;
                    this._origVals = null;
                    this._saveChangeType = null;
                    this.__isRefreshing = false;
                    this.__isCached = false;
                    _super.prototype.destroy.call(this);
                };
                Object.defineProperty(Entity.prototype, "_isCanSubmit", {
                    get: function () {
                        return true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Entity.prototype, "_changeType", {
                    get: function () {
                        return this.__changeType;
                    },
                    set: function (v) {
                        if (this.__changeType !== v) {
                            var oldChangeType = this.__changeType;
                            this.__changeType = v;
                            if (v !== CHANGE_TYPE.NONE)
                                this._dbSet._addToChanged(this); else
                                this._dbSet._removeFromChanged(this._key);
                            this._dbSet._onItemStatusChanged(this, oldChangeType);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Entity.prototype, "_isNew", {
                    get: function () {
                        return this.__changeType === CHANGE_TYPE.ADDED;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Entity.prototype, "_isDeleted", {
                    get: function () {
                        return this.__changeType === CHANGE_TYPE.DELETED;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Entity.prototype, "_entityType", {
                    get: function () {
                        return this.__dbSet.entityType;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Entity.prototype, "_srvKey", {
                    get: function () {
                        return this._srvRowKey;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Entity.prototype, "_dbSetName", {
                    get: function () {
                        return this.__dbSet.dbSetName;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Entity.prototype, "_serverTimezone", {
                    get: function () {
                        return this.getDbContext().serverTimezone;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Entity.prototype, "_collection", {
                    get: function () {
                        return this.__dbSet;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Entity.prototype, "_dbSet", {
                    get: function () {
                        return this.__dbSet;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Entity.prototype, "_isRefreshing", {
                    get: function () {
                        return this.__isRefreshing;
                    },
                    set: function (v) {
                        if (this.__isRefreshing !== v) {
                            this.__isRefreshing = v;
                            this.raisePropertyChanged('_isRefreshing');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Entity.prototype, "_isCached", {
                    get: function () {
                        return this.__isCached;
                    },
                    set: function (v) {
                        this.__isCached = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Entity.prototype, "isHasChanges", {
                    get: function () {
                        return this.__changeType !== CHANGE_TYPE.NONE;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Entity;
            })(MOD.collection.CollectionItem);
            db.Entity = Entity;

            var DbSet = (function (_super) {
                __extends(DbSet, _super);
                function DbSet(opts) {
                    _super.call(this);
                    var dbContext = opts.dbContext, dbSetInfo = opts.dbSetInfo;
                    this._dbContext = dbContext;
                    this._options.dbSetName = dbSetInfo.dbSetName;
                    this._options.enablePaging = dbSetInfo.enablePaging;
                    this._options.pageSize = dbSetInfo.pageSize;
                    this._query = null;
                    this._entityType = null;
                    this._isSubmitOnDelete = false;
                    this._navfldMap = {};
                    this._calcfldMap = {};

                    this._trackAssoc = {};

                    this._trackAssocMap = {};

                    this._childAssocMap = {};

                    this._parentAssocMap = {};

                    this._changeCount = 0;
                    this._changeCache = {};
                    this._ignorePageChanged = false;
                    Object.freeze(this._perms);
                }
                DbSet.prototype.getFieldInfo = function (fieldName) {
                    var assoc, parentDB, names = fieldName.split('.');
                    if (names.length == 1)
                        return this._fieldMap[fieldName]; else if (names.length > 1) {
                        assoc = this._childAssocMap[names[0]];
                        if (!!assoc) {
                            parentDB = this.dbContext.getDbSet(assoc.parentDbSetName);
                            fieldName = names.slice(1).join('.');
                            return parentDB.getFieldInfo(fieldName);
                        }
                    }
                    throw new Error(utils.format(RIAPP.ERRS.ERR_DBSET_INVALID_FIELDNAME, this.dbSetName, fieldName));
                };
                DbSet.prototype._onError = function (error, source) {
                    return this.dbContext._onError(error, source);
                };
                DbSet.prototype._mapAssocFields = function () {
                    var tas = this._trackAssoc, assoc, tasKeys = Object.keys(tas), frel, map = this._trackAssocMap;
                    for (var i = 0, len = tasKeys.length; i < len; i += 1) {
                        assoc = tas[tasKeys[i]];
                        for (var j = 0, len2 = assoc.fieldRels.length; j < len2; j += 1) {
                            frel = assoc.fieldRels[j];
                            if (!utils.check.isArray(map[frel.childField])) {
                                map[frel.childField] = [assoc.childToParentName];
                            } else {
                                map[frel.childField].push(assoc.childToParentName);
                            }
                        }
                    }
                };
                DbSet.prototype._updatePermissions = function (perms) {
                    this._perms = perms;
                };
                DbSet.prototype._getChildToParentNames = function (childFieldName) {
                    return this._trackAssocMap[childFieldName];
                };
                DbSet.prototype._getStrValue = function (val, fieldInfo) {
                    var dcnv = fieldInfo.dateConversion, stz = this.dbContext.serverTimezone;
                    return valueUtils.stringifyValue(val, dcnv, stz);
                };
                DbSet.prototype._doNavigationField = function (opts, fInfo) {
                    var self = this, isChild = true, result = { getFunc: function () {
                            throw new Error('Function is not implemented');
                        }, setFunc: function (v) {
                            throw new Error('Function is not implemented');
                        } };
                    var assocs = opts.childAssoc.filter(function (a) {
                        return a.childToParentName == fInfo.fieldName;
                    });

                    if (assocs.length === 0) {
                        assocs = opts.parentAssoc.filter(function (a) {
                            return a.parentToChildrenName == fInfo.fieldName;
                        });
                        isChild = false;
                    }

                    if (assocs.length != 1)
                        throw new Error(utils.format(RIAPP.ERRS.ERR_PARAM_INVALID_TYPE, 'assocs', 'Array'));
                    var assocName = assocs[0].name;
                    fInfo.isClientOnly = true;
                    fInfo.isReadOnly = true;
                    if (isChild) {
                        fInfo.isReadOnly = false;
                        self._childAssocMap[assocs[0].childToParentName] = assocs[0];
                        assocs[0].fieldRels.forEach(function (frel) {
                            var chf = self._fieldMap[frel.childField];
                            if (!fInfo.isReadOnly && chf.isReadOnly) {
                                fInfo.isReadOnly = true;
                            }
                        });

                        result.getFunc = function () {
                            var assoc = self.dbContext.getAssociation(assocName);
                            return assoc.getParentItem(this);
                        };

                        if (!fInfo.isReadOnly) {
                            self._trackAssoc[assocName] = assocs[0];

                            result.setFunc = function (v) {
                                var entity = this, i, len, assoc = self.dbContext.getAssociation(assocName);
                                if (!!v && !(v instanceof assoc.parentDS.entityType)) {
                                    throw new Error(utils.format(RIAPP.ERRS.ERR_PARAM_INVALID_TYPE, 'value', assoc.parentDS.dbSetName));
                                }

                                if (!!v && v._isNew) {
                                    entity._setFieldVal(fInfo.fieldName, v._key);
                                } else if (!!v) {
                                    for (i = 0, len = assoc.childFldInfos.length; i < len; i += 1) {
                                        entity[assoc.childFldInfos[i].fieldName] = v[assoc.parentFldInfos[i].fieldName];
                                    }
                                } else {
                                    var oldKey = entity._getFieldVal(fInfo.fieldName);
                                    if (!!oldKey) {
                                        entity._setFieldVal(fInfo.fieldName, null);
                                    }
                                    for (i = 0, len = assoc.childFldInfos.length; i < len; i += 1) {
                                        entity[assoc.childFldInfos[i].fieldName] = null;
                                    }
                                }
                            };
                        }
                    } else {
                        self._parentAssocMap[assocs[0].parentToChildrenName] = assocs[0];

                        result.getFunc = function () {
                            return self.dbContext.getAssociation(assocName).getChildItems(this);
                        };
                    }
                    return result;
                };
                DbSet.prototype._doCalculatedField = function (opts, fInfo) {
                    var self = this, result = { getFunc: function () {
                            throw new Error(utils.format("Calculated field:'{0}' is not initialized", fInfo.fieldName));
                        } };
                    function doDependants(f) {
                        var deps = f.dependentOn.split(',');
                        deps.forEach(function (depOn) {
                            var depOnFld = self._fieldMap[depOn];
                            if (!depOnFld)
                                throw new Error(utils.format(RIAPP.ERRS.ERR_CALC_FIELD_DEFINE, depOn));
                            if (f.fieldName === depOn)
                                throw new Error(utils.format(RIAPP.ERRS.ERR_CALC_FIELD_SELF_DEPEND, depOn));
                            if (depOnFld.dependents.indexOf(f.fieldName) < 0) {
                                depOnFld.dependents.push(f.fieldName);
                            }
                        });
                    }
                    ;
                    fInfo.isClientOnly = true;
                    fInfo.isReadOnly = true;
                    if (!!fInfo.dependentOn) {
                        doDependants(fInfo);
                    }
                    return result;
                };
                DbSet.prototype._fillFromService = function (data) {
                    data = utils.extend(false, {
                        res: { names: [], rows: [], pageIndex: null, pageCount: null, dbSetName: this.dbSetName, totalCount: null },
                        isPageChanged: false,
                        fn_beforeFillEnd: null
                    }, data);

                    var self = this, res = data.res, fieldNames = res.names, rows = res.rows || [], rowCount = rows.length, entityType = this._entityType, newItems = [], positions = [], created_items = [], fetchedItems = [], isPagingEnabled = this.isPagingEnabled, RM = REFRESH_MODE.RefreshCurrent, query = this.query, clearAll = true, dataCache;

                    this._onFillStart({ isBegin: true, rowCount: rowCount, time: new Date(), isPageChanged: data.isPageChanged });
                    try  {
                        if (!!query) {
                            clearAll = query.isClearPrevData;
                            if (query.isClearCacheOnEveryLoad)
                                query._clearCache();
                            if (clearAll)
                                this.clear();
                            query._reindexCache();
                            if (query.loadPageCount > 1 && isPagingEnabled) {
                                dataCache = query._getCache();
                                if (query.isIncludeTotalCount && !utils.check.isNt(res.totalCount))
                                    dataCache.totalCount = res.totalCount;
                            }
                        }
                        created_items = rows.map(function (row) {
                            var key = row.key;
                            if (!key)
                                throw new Error(RIAPP.ERRS.ERR_KEY_IS_EMPTY);

                            var item = self._itemsByKey[key];
                            if (!item) {
                                if (!!dataCache) {
                                    item = dataCache.getItemByKey(key);
                                }
                                if (!item)
                                    item = new entityType(self, row, fieldNames); else {
                                    row.values.forEach(function (val, index) {
                                        item._refreshValue(val, fieldNames[index], RM);
                                    });
                                }
                            } else {
                                row.values.forEach(function (val, index) {
                                    item._refreshValue(val, fieldNames[index], RM);
                                });
                            }
                            return item;
                        });

                        if (!!query) {
                            if (query.isIncludeTotalCount && !utils.check.isNt(res.totalCount)) {
                                this.totalCount = res.totalCount;
                            }

                            if (query.loadPageCount > 1 && isPagingEnabled) {
                                dataCache.fillCache(res.pageIndex, created_items);
                                var pg = dataCache.getCachedPage(query.pageIndex);
                                if (!!pg)
                                    created_items = pg.items; else
                                    created_items = [];
                            }
                        }

                        created_items.forEach(function (item) {
                            var oldItem = this._itemsByKey[item._key];
                            if (!oldItem) {
                                this._items.push(item);
                                this._itemsByKey[item._key] = item;
                                newItems.push(item);
                                positions.push(this._items.length - 1);
                                fetchedItems.push(item);
                            } else
                                fetchedItems.push(oldItem);
                        }, this);

                        if (newItems.length > 0) {
                            this._onItemsChanged({ change_type: COLL_CHANGE_TYPE.ADDED, items: newItems, pos: positions });
                            this.raisePropertyChanged('count');
                        }

                        if (!!data.fn_beforeFillEnd) {
                            data.fn_beforeFillEnd();
                        }
                    } finally {
                        this._onFillEnd({
                            isBegin: false,
                            rowCount: fetchedItems.length,
                            time: new Date(),
                            resetUI: clearAll,
                            fetchedItems: fetchedItems,
                            newItems: newItems,
                            isPageChanged: data.isPageChanged
                        });
                    }
                    this.moveFirst();
                    return { fetchedItems: fetchedItems, newItems: newItems, isPageChanged: data.isPageChanged, outOfBandData: data.res.extraInfo };
                };
                DbSet.prototype._fillFromCache = function (data) {
                    data = utils.extend(false, {
                        isPageChanged: false,
                        fn_beforeFillEnd: null
                    }, data);
                    var self = this, positions = [], fetchedItems = [], query = this.query;
                    if (!query)
                        throw new Error(utils.format(RIAPP.ERRS.ERR_ASSERTION_FAILED, 'query is not null'));
                    var dataCache = query._getCache();
                    var cachedPage = dataCache.getCachedPage(query.pageIndex), items = !cachedPage ? [] : cachedPage.items;

                    this._onFillStart({ isBegin: true, rowCount: items.length, time: new Date(), isPageChanged: data.isPageChanged });
                    try  {
                        this.clear();
                        this._items = items;

                        items.forEach(function (item, index) {
                            self._itemsByKey[item._key] = item;
                            positions.push(index);
                            fetchedItems.push(item);
                        });

                        if (!!data.fn_beforeFillEnd) {
                            data.fn_beforeFillEnd();
                        }

                        if (fetchedItems.length > 0) {
                            this._onItemsChanged({ change_type: COLL_CHANGE_TYPE.ADDED, items: fetchedItems, pos: positions });
                            this.raisePropertyChanged('count');
                        }
                    } finally {
                        this._onFillEnd({
                            isBegin: false,
                            rowCount: fetchedItems.length,
                            time: new Date(),
                            resetUI: true,
                            fetchedItems: fetchedItems,
                            newItems: fetchedItems,
                            isPageChanged: data.isPageChanged
                        });
                    }
                    this.moveFirst();
                    return { fetchedItems: fetchedItems, newItems: fetchedItems, isPageChanged: data.isPageChanged, outOfBandData: null };
                };
                DbSet.prototype._commitChanges = function (rows) {
                    var self = this;

                    rows.forEach(function (rowInfo) {
                        var key = rowInfo.clientKey, item = self._itemsByKey[key];
                        if (!item) {
                            throw new Error(utils.format(RIAPP.ERRS.ERR_KEY_IS_NOTFOUND, key));
                        }
                        var itemCT = item._changeType;
                        item.acceptChanges(rowInfo);
                        if (itemCT === CHANGE_TYPE.ADDED) {
                            delete self._itemsByKey[key];
                            item._updateKeys(rowInfo.serverKey);
                            self._itemsByKey[item._key] = item;
                            self._onItemsChanged({
                                change_type: COLL_CHANGE_TYPE.REMAP_KEY,
                                items: [item],
                                old_key: key,
                                new_key: item._key
                            });
                        }
                    });
                };
                DbSet.prototype._setItemInvalid = function (row) {
                    var keyMap = this._itemsByKey, item = keyMap[row.clientKey];
                    var errors = {};
                    row.invalid.forEach(function (err) {
                        if (!err.fieldName)
                            err.fieldName = '*';
                        if (!!errors[err.fieldName]) {
                            errors[err.fieldName].push(err.message);
                        } else
                            errors[err.fieldName] = [err.message];
                    });
                    var res = [];
                    utils.forEachProp(errors, function (fieldName) {
                        res.push({ fieldName: fieldName, errors: errors[fieldName] });
                    });
                    this._addErrors(item, res);
                    return item;
                };
                DbSet.prototype._setCurrentItem = function (v) {
                    if (!!v && !(v instanceof this._entityType)) {
                        throw new Error(RIAPP.global.utils.format(RIAPP.ERRS.ERR_PARAM_INVALID_TYPE, 'currentItem', this._options.dbSetName));
                    }
                    _super.prototype._setCurrentItem.call(this, v);
                };
                DbSet.prototype._getChanges = function () {
                    var changes = [];
                    var csh = this._changeCache;
                    utils.forEachProp(csh, function (key) {
                        var item = csh[key];
                        changes.push(item._getRowInfo());
                    });
                    return changes;
                };
                DbSet.prototype._getTrackAssocInfo = function () {
                    var self = this, res = [];
                    var csh = this._changeCache, assocNames = Object.keys(self._trackAssoc);
                    utils.forEachProp(csh, function (key) {
                        var item = csh[key];
                        assocNames.forEach(function (assocName) {
                            var assocInfo = self._trackAssoc[assocName], parentKey = item._getFieldVal(assocInfo.childToParentName), childKey = item._key;
                            if (!!parentKey && !!childKey) {
                                res.push({ assocName: assocName, parentKey: parentKey, childKey: childKey });
                            }
                        });
                    });
                    return res;
                };
                DbSet.prototype._getNewKey = function (item) {
                    var key = 'clkey_' + this._newKey;
                    this._newKey += 1;
                    return key;
                };
                DbSet.prototype._createNew = function () {
                    var item = new this._entityType(this, null, null);
                    item._key = this._getNewKey(item);
                    return item;
                };
                DbSet.prototype._addToChanged = function (item) {
                    if (item._key === null)
                        return;
                    if (!this._changeCache[item._key]) {
                        this._changeCache[item._key] = item;
                        this._changeCount += 1;
                        if (this._changeCount === 1)
                            this.raisePropertyChanged('hasChanges');
                    }
                };
                DbSet.prototype._removeFromChanged = function (key) {
                    if (key === null)
                        return;
                    if (!!this._changeCache[key]) {
                        delete this._changeCache[key];
                        this._changeCount -= 1;
                        if (this._changeCount === 0)
                            this.raisePropertyChanged('hasChanges');
                    }
                };
                DbSet.prototype._clearChangeCache = function () {
                    var old = this._changeCount;
                    this._changeCache = {};
                    this._changeCount = 0;
                    if (old !== this._changeCount)
                        this.raisePropertyChanged('hasChanges');
                };

                DbSet.prototype._onItemStatusChanged = function (item, oldChangeType) {
                    _super.prototype._onItemStatusChanged.call(this, item, oldChangeType);
                    if (item._isDeleted && this.isSubmitOnDelete) {
                        this.dbContext.submitChanges();
                    }
                };
                DbSet.prototype._onRemoved = function (item, pos) {
                    this._removeFromChanged(item._key);
                    _super.prototype._onRemoved.call(this, item, pos);
                };
                DbSet.prototype._onPageChanging = function () {
                    var res = _super.prototype._onPageChanging.call(this);
                    if (!res) {
                        return res;
                    }
                    if (this.hasChanges) {
                        this.rejectChanges();
                    }
                    return res;
                };
                DbSet.prototype._onPageChanged = function () {
                    this.cancelEdit();
                    _super.prototype._onPageChanged.call(this);
                    if (this._ignorePageChanged)
                        return;
                    this.query.pageIndex = this.pageIndex;
                    this.dbContext._load(this.query, true);
                };
                DbSet.prototype._onPageSizeChanged = function () {
                    _super.prototype._onPageSizeChanged.call(this);
                    if (!!this._query)
                        this._query.pageSize = this.pageSize;
                };
                DbSet.prototype._destroyItems = function () {
                    this._items.forEach(function (item) {
                        if (item._isCached)
                            item.removeHandler(null, null); else
                            item.destroy();
                    });
                };
                DbSet.prototype.sort = function (fieldNames, sortOrder) {
                    var ds = this, query = ds.query;
                    if (!!query) {
                        query.clearSort();
                        for (var i = 0; i < fieldNames.length; i += 1) {
                            if (i == 0)
                                query.orderBy(fieldNames[i], sortOrder); else
                                query.thenBy(fieldNames[i], sortOrder);
                        }

                        query.isClearPrevData = true;
                        query.pageIndex = 0;
                        return ds.dbContext.load(query);
                    } else {
                        return _super.prototype.sort.call(this, fieldNames, sortOrder);
                    }
                };

                DbSet.prototype.fillItems = function (data) {
                    var res = utils.extend(false, {
                        names: [],
                        rows: [],
                        pageIndex: (!!this.query) ? this.query.pageIndex : null,
                        pageCount: null,
                        dbSetName: this.dbSetName,
                        totalCount: null,
                        rowCount: data.rows.length,
                        extraInfo: null,
                        error: null,
                        included: []
                    }, data);

                    var filldata = {
                        res: res,
                        isPageChanged: false,
                        fn_beforeFillEnd: null
                    };
                    this._fillFromService(filldata);
                };
                DbSet.prototype.defineCalculatedField = function (fieldName, getFunc) {
                    var calcDef = this._calcfldMap[fieldName];
                    if (!calcDef) {
                        throw new Error(utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'fieldName', fieldName));
                    }
                    calcDef.getFunc = getFunc;
                };
                DbSet.prototype.acceptChanges = function () {
                    var csh = this._changeCache;
                    utils.forEachProp(csh, function (key) {
                        var item = csh[key];
                        item.acceptChanges(null);
                    });
                    this._changeCount = 0;
                };
                DbSet.prototype.rejectChanges = function () {
                    var csh = this._changeCache;
                    utils.forEachProp(csh, function (key) {
                        var item = csh[key];
                        item.rejectChanges();
                    });
                };
                DbSet.prototype.deleteOnSubmit = function (item) {
                    item.deleteOnSubmit();
                };
                DbSet.prototype.clear = function () {
                    this._clearChangeCache();
                    _super.prototype.clear.call(this);
                };
                DbSet.prototype.createQuery = function (name) {
                    var queryInfo = this.dbContext._getQueryInfo(name);
                    if (!queryInfo) {
                        throw new Error(utils.format(RIAPP.ERRS.ERR_QUERY_NAME_NOTFOUND, name));
                    }
                    return new DataQuery(this, queryInfo);
                };
                DbSet.prototype.clearCache = function () {
                    var query = this._query;
                    if (!!query) {
                        query._clearCache();
                    }
                };
                DbSet.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    var query = this._query;
                    this._query = null;
                    if (!!query) {
                        query.destroy();
                    }
                    this._navfldMap = {};
                    this._calcfldMap = {};
                    _super.prototype.destroy.call(this);
                };
                DbSet.prototype.toString = function () {
                    return this._options.dbSetName;
                };
                Object.defineProperty(DbSet.prototype, "items", {
                    get: function () {
                        return this._items;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbSet.prototype, "dbContext", {
                    get: function () {
                        return this._dbContext;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbSet.prototype, "dbSetName", {
                    get: function () {
                        return this._options.dbSetName;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbSet.prototype, "entityType", {
                    get: function () {
                        return this._entityType;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbSet.prototype, "query", {
                    get: function () {
                        return this._query;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbSet.prototype, "hasChanges", {
                    get: function () {
                        return this._changeCount > 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbSet.prototype, "cacheSize", {
                    get: function () {
                        var query = this._query, dataCache;
                        if (!!query && query.isCacheValid) {
                            dataCache = query._getCache();
                            return dataCache.cacheSize;
                        }
                        return 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbSet.prototype, "isSubmitOnDelete", {
                    get: function () {
                        return this._isSubmitOnDelete;
                    },
                    set: function (v) {
                        if (this._isSubmitOnDelete !== v) {
                            this._isSubmitOnDelete = !!v;
                            this.raisePropertyChanged('isSubmitOnDelete');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return DbSet;
            })(MOD.collection.Collection);
            db.DbSet = DbSet;

            var DbSets = (function (_super) {
                __extends(DbSets, _super);
                function DbSets(dbContext) {
                    _super.call(this);
                    this._dbContext = dbContext;
                    this._arrDbSets = [];
                    this._dbSets = {};
                    this._dbSetNames = [];
                }
                DbSets.prototype._dbSetCreated = function (dbSet) {
                    var self = this;
                    this._arrDbSets.push(dbSet);
                    dbSet.addOnPropertyChange('hasChanges', function (sender, args) {
                        self._dbContext._onDbSetHasChangesChanged(sender);
                    }, null);
                };
                DbSets.prototype._createDbSet = function (name, dbSetType) {
                    var self = this, dbContext = this._dbContext;
                    self._dbSets[name] = function () {
                        var t = new dbSetType(dbContext);
                        var f = function () {
                            return t;
                        };
                        self._dbSets[name] = f;
                        self._dbSetCreated(t);
                        return f();
                    };
                };
                Object.defineProperty(DbSets.prototype, "dbSetNames", {
                    get: function () {
                        return this._dbSetNames;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbSets.prototype, "arrDbSets", {
                    get: function () {
                        return this._arrDbSets;
                    },
                    enumerable: true,
                    configurable: true
                });
                DbSets.prototype.getDbSet = function (name) {
                    var f = this._dbSets[name];
                    if (!f)
                        throw new Error(utils.format(RIAPP.ERRS.ERR_DBSET_NAME_INVALID, name));
                    return f();
                };
                DbSets.prototype.destroy = function () {
                    this._arrDbSets.forEach(function (dbSet) {
                        dbSet.destroy();
                    });
                    this._arrDbSets = [];
                    this._dbSets = null;
                    this._dbContext = null;
                    _super.prototype.destroy.call(this);
                };
                return DbSets;
            })(RIAPP.BaseObject);
            db.DbSets = DbSets;

            var DbContext = (function (_super) {
                __extends(DbContext, _super);
                function DbContext() {
                    _super.call(this);
                    this._isInitialized = false;
                    this._dbSets = null;
                    this._svcMethods = {};
                    this._assoc = {};
                    this._arrAssoc = [];
                    this._queryInf = {};
                    this._serviceUrl = null;
                    this._isBusy = 0;
                    this._isSubmiting = false;
                    this._hasChanges = false;
                    this._pendingSubmit = null;
                    this._serverTimezone = utils.get_timeZoneOffset();
                    this._waitQueue = new RIAPP.MOD.utils.WaitQueue(this);
                }
                DbContext.prototype._getEventNames = function () {
                    var base_events = _super.prototype._getEventNames.call(this);
                    return ['submit_error'].concat(base_events);
                };
                DbContext.prototype.addOnSubmitError = function (fn, namespace) {
                    this.addHandler('submit_error', fn, namespace);
                };
                DbContext.prototype.removeOnSubmitError = function (namespace) {
                    this.removeHandler('submit_error', namespace);
                };
                DbContext.prototype._onGetCalcField = function (args) {
                    this.raiseEvent('define_calc', args);
                };
                DbContext.prototype._getQueryInfo = function (name) {
                    return this._queryInf[name];
                };
                DbContext.prototype._initDbSets = function () {
                    if (this._isInitialized)
                        throw new Error(RIAPP.ERRS.ERR_DOMAIN_CONTEXT_INITIALIZED);
                };
                DbContext.prototype._initAssociations = function (associations) {
                    var self = this;
                    associations.forEach(function (assoc) {
                        self._initAssociation(assoc);
                    });
                };
                DbContext.prototype._initMethods = function (methods) {
                    var self = this;
                    methods.forEach(function (info) {
                        if (info.isQuery)
                            self._queryInf[info.methodName] = info; else {
                            self._initMethod(info);
                        }
                    });
                };
                DbContext.prototype._updatePermissions = function (info) {
                    var self = this;
                    this._serverTimezone = info.serverTimezone;
                    info.permissions.forEach(function (perms) {
                        self.getDbSet(perms.dbSetName)._updatePermissions(perms);
                    });
                };
                DbContext.prototype._onDbSetHasChangesChanged = function (eSet) {
                    var old = this._hasChanges, test;
                    this._hasChanges = false;
                    if (eSet.hasChanges) {
                        this._hasChanges = true;
                    } else {
                        for (var i = 0, len = this._dbSets.arrDbSets.length; i < len; i += 1) {
                            test = this._dbSets.arrDbSets[i];
                            if (test.hasChanges) {
                                this._hasChanges = true;
                                break;
                            }
                        }
                    }
                    if (this._hasChanges !== old) {
                        this.raisePropertyChanged('hasChanges');
                    }
                };
                DbContext.prototype._initAssociation = function (assoc) {
                    var self = this, options = {
                        dbContext: self,
                        parentName: assoc.parentDbSetName,
                        childName: assoc.childDbSetName,
                        onDeleteAction: assoc.onDeleteAction,
                        parentKeyFields: assoc.fieldRels.map(function (f) {
                            return f.parentField;
                        }),
                        childKeyFields: assoc.fieldRels.map(function (f) {
                            return f.childField;
                        }),
                        parentToChildrenName: assoc.parentToChildrenName,
                        childToParentName: assoc.childToParentName,
                        name: assoc.name
                    };
                    var name = "get" + assoc.name;

                    this._assoc[name] = function () {
                        var t = new Association(options);
                        self._arrAssoc.push(t);
                        var f = function () {
                            return t;
                        };
                        self._assoc[name] = f;
                        return f();
                    };
                };
                DbContext.prototype._initMethod = function (methodInfo) {
                    var self = this;

                    this._svcMethods[methodInfo.methodName] = function (args) {
                        var deferred = utils.createDeferred();
                        var callback = function (res) {
                            if (!res.error) {
                                deferred.resolve(res.result);
                            } else {
                                deferred.reject();
                            }
                        };

                        try  {
                            var data = self._getMethodParams(methodInfo, args);
                            self._invokeMethod(methodInfo, data, callback);
                        } catch (ex) {
                            if (!RIAPP.global._checkIsDummy(ex)) {
                                self._onError(ex, self);
                                callback({ result: null, error: ex });
                            }
                        }

                        return deferred.promise();
                    };
                };
                DbContext.prototype._getMethodParams = function (methodInfo, args) {
                    var self = this, methodName = methodInfo.methodName, data = { methodName: methodName, paramInfo: { parameters: [] } };
                    var i, parameterInfos = methodInfo.parameters, len = parameterInfos.length, pinfo, val, value;
                    if (!args)
                        args = {};
                    for (i = 0; i < len; i += 1) {
                        pinfo = parameterInfos[i];
                        val = args[pinfo.name];
                        if (!pinfo.isNullable && !pinfo.isArray && !(pinfo.dataType == consts.DATA_TYPE.String || pinfo.dataType == consts.DATA_TYPE.Binary) && utils.check.isNt(val)) {
                            throw new Error(utils.format(RIAPP.ERRS.ERR_SVC_METH_PARAM_INVALID, pinfo.name, val, methodInfo.methodName));
                        }
                        if (utils.check.isFunction(val)) {
                            throw new Error(utils.format(RIAPP.ERRS.ERR_SVC_METH_PARAM_INVALID, pinfo.name, val, methodInfo.methodName));
                        }
                        if (pinfo.isArray && !utils.check.isNt(val) && !utils.check.isArray(val)) {
                            val = [val];
                        }
                        value = null;

                        if (pinfo.dataType == consts.DATA_TYPE.Binary && utils.check.isArray(val)) {
                            value = JSON.stringify(val);
                        } else if (utils.check.isArray(val)) {
                            var arr = new Array(val.length);
                            for (var k = 0; k < val.length; k += 1) {
                                arr[k] = valueUtils.stringifyValue(val[k], pinfo.dateConversion, self._serverTimezone);
                            }
                            value = JSON.stringify(arr);
                        } else
                            value = valueUtils.stringifyValue(val, pinfo.dateConversion, self._serverTimezone);

                        data.paramInfo.parameters.push({ name: pinfo.name, value: value });
                    }

                    return data;
                };
                DbContext.prototype._invokeMethod = function (methodInfo, data, callback) {
                    var self = this, operType = DATA_OPER.INVOKE, postData, invokeUrl;
                    this.isBusy = true;
                    var fn_onComplete = function (res) {
                        try  {
                            if (!res)
                                throw new Error(utils.format(RIAPP.ERRS.ERR_UNEXPECTED_SVC_ERROR, 'operation result is undefined'));
                            __checkError(res.error, operType);
                            callback({ result: res.result, error: null });
                        } catch (ex) {
                            if (RIAPP.global._checkIsDummy(ex)) {
                                return;
                            }
                            self._onDataOperError(ex, operType);
                            callback({ result: null, error: ex });
                        }
                    };

                    try  {
                        postData = JSON.stringify(data);
                        invokeUrl = this._getUrl(DATA_SVC_METH.Invoke);
                        utils.performAjaxCall(invokeUrl, postData, true, function (res) {
                            fn_onComplete(JSON.parse(res));
                            self.isBusy = false;
                        }, function (er) {
                            fn_onComplete({ result: null, error: er });
                            self.isBusy = false;
                        }, null);
                    } catch (ex) {
                        if (RIAPP.global._checkIsDummy(ex)) {
                            RIAPP.global._throwDummy(ex);
                        }
                        this.isBusy = false;
                        this._onDataOperError(ex, operType);
                        callback({ result: null, error: ex });
                        RIAPP.global._throwDummy(ex);
                    }
                };
                DbContext.prototype._loadFromCache = function (query, isPageChanged) {
                    var operType = DATA_OPER.LOAD, dbSet = query._dbSet, methRes;
                    try  {
                        methRes = dbSet._fillFromCache({ isPageChanged: isPageChanged, fn_beforeFillEnd: null });
                    } catch (ex) {
                        if (RIAPP.global._checkIsDummy(ex)) {
                            RIAPP.global._throwDummy(ex);
                        }
                        this._onDataOperError(ex, operType);
                        RIAPP.global._throwDummy(ex);
                    }
                    return methRes;
                };
                DbContext.prototype._loadIncluded = function (res) {
                    var self = this, hasIncluded = !!res.included && res.included.length > 0;
                    if (!hasIncluded)
                        return;
                    res.included.forEach(function (subset) {
                        var dbSet = self.getDbSet(subset.dbSetName);
                        dbSet.fillItems(subset);
                    });
                };
                DbContext.prototype._onLoaded = function (res, isPageChanged) {
                    var self = this, operType = DATA_OPER.LOAD, dbSetName, dbSet, loadRes;
                    try  {
                        if (!res)
                            throw new Error(utils.format(RIAPP.ERRS.ERR_UNEXPECTED_SVC_ERROR, 'null result'));
                        dbSetName = res.dbSetName;
                        dbSet = self.getDbSet(dbSetName);
                        if (!dbSet)
                            throw new Error(utils.format(RIAPP.ERRS.ERR_DBSET_NAME_INVALID, dbSetName));
                        __checkError(res.error, operType);
                        loadRes = dbSet._fillFromService({
                            res: res,
                            isPageChanged: isPageChanged,
                            fn_beforeFillEnd: function () {
                                self._loadIncluded(res);
                            }
                        });
                    } catch (ex) {
                        if (RIAPP.global._checkIsDummy(ex)) {
                            RIAPP.global._throwDummy(ex);
                        }
                        this._onDataOperError(ex, operType);
                        RIAPP.global._throwDummy(ex);
                    }
                    return loadRes;
                };
                DbContext.prototype._dataSaved = function (res) {
                    var self = this, submitted = [], notvalid = [];
                    try  {
                        try  {
                            __checkError(res.error, DATA_OPER.SUBMIT);
                        } catch (ex) {
                            res.dbSets.forEach(function (jsDB) {
                                var eSet = self._dbSets[jsDB.dbSetName];
                                jsDB.rows.forEach(function (row) {
                                    var item = eSet.getItemByKey(row.clientKey);
                                    if (!item) {
                                        throw new Error(utils.format(RIAPP.ERRS.ERR_KEY_IS_NOTFOUND, row.clientKey));
                                    }
                                    submitted.push(item);
                                    if (!!row.invalid) {
                                        eSet._setItemInvalid(row);
                                        notvalid.push(item);
                                    }
                                });
                            });
                            throw new SubmitError(ex, submitted, notvalid);
                        }

                        res.dbSets.forEach(function (jsDB) {
                            self._dbSets[jsDB.dbSetName]._commitChanges(jsDB.rows);
                        });
                    } catch (ex) {
                        if (RIAPP.global._checkIsDummy(ex)) {
                            RIAPP.global._throwDummy(ex);
                        }
                        this._onSubmitError(ex);
                        RIAPP.global._throwDummy(ex);
                    }
                };
                DbContext.prototype._getChanges = function () {
                    var changeSet = { dbSets: [], error: null, trackAssocs: [] };
                    this._dbSets.arrDbSets.forEach(function (eSet) {
                        eSet.endEdit();
                        var changes = eSet._getChanges();
                        if (changes.length === 0)
                            return;

                        var trackAssoc = eSet._getTrackAssocInfo();
                        var jsDB = { dbSetName: eSet.dbSetName, rows: changes };
                        changeSet.dbSets.push(jsDB);
                        changeSet.trackAssocs = changeSet.trackAssocs.concat(trackAssoc);
                    });
                    return changeSet;
                };
                DbContext.prototype._getUrl = function (action) {
                    var loadUrl = this.service_url;
                    if (!utils.str.endsWith(loadUrl, '/'))
                        loadUrl = loadUrl + '/';
                    loadUrl = loadUrl + [action, ''].join('/');
                    return loadUrl;
                };
                DbContext.prototype._onItemRefreshed = function (res, item) {
                    var operType = DATA_OPER.REFRESH;
                    try  {
                        __checkError(res.error, operType);
                        if (!res.rowInfo) {
                            item._dbSet.removeItem(item);
                            item.destroy();
                            throw new Error(RIAPP.ERRS.ERR_ITEM_DELETED_BY_ANOTHER_USER);
                        } else
                            item._refreshValues(res.rowInfo, REFRESH_MODE.MergeIntoCurrent);
                    } catch (ex) {
                        if (RIAPP.global._checkIsDummy(ex)) {
                            RIAPP.global._throwDummy(ex);
                        }
                        this._onDataOperError(ex, operType);
                        RIAPP.global._throwDummy(ex);
                    }
                };
                DbContext.prototype._refreshItem = function (item) {
                    var deferred = utils.createDeferred(), callback = function (isOk) {
                        if (isOk) {
                            deferred.resolve(item);
                        } else {
                            deferred.reject();
                        }
                    };
                    var url = this._getUrl(DATA_SVC_METH.Refresh), dbSet = item._dbSet;
                    var self = this;
                    this.waitForNotSubmiting(function () {
                        dbSet.waitForNotLoading(function () {
                            var args, postData, operType = DATA_OPER.REFRESH;
                            var fn_onEnd = function () {
                                self.isBusy = false;
                                dbSet.isLoading = false;
                                item._isRefreshing = false;
                            }, fn_onErr = function (ex) {
                                fn_onEnd();
                                self._onDataOperError(ex, operType);
                            }, fn_onOK = function (res) {
                                self._onItemRefreshed(res, item);
                                fn_onEnd();
                            };

                            item._isRefreshing = true;
                            self.isBusy = true;
                            dbSet.isLoading = true;
                            try  {
                                var request = { dbSetName: item._dbSetName, rowInfo: item._getRowInfo(), error: null };
                                item._checkCanRefresh();
                                postData = JSON.stringify(request);
                                utils.performAjaxCall(url, postData, true, function (res) {
                                    try  {
                                        fn_onOK(JSON.parse(res));
                                        callback(true);
                                    } catch (ex) {
                                        fn_onErr(ex);
                                        callback(false);
                                    }
                                }, function (er) {
                                    fn_onEnd();
                                    self._onDataOperError(er, operType);
                                    callback(false);
                                }, null);
                            } catch (ex) {
                                fn_onErr(ex);
                                callback(false);
                            }
                        }, [], true, null);
                    }, [], null);
                    return deferred.promise();
                };
                DbContext.prototype._onError = function (error, source) {
                    var isHandled = _super.prototype._onError.call(this, error, source);
                    if (!isHandled) {
                        return RIAPP.global._onError(error, source);
                    }
                    return isHandled;
                };
                DbContext.prototype._onDataOperError = function (ex, oper) {
                    if (RIAPP.global._checkIsDummy(ex))
                        return true;
                    var er;
                    if (ex instanceof DataOperationError)
                        er = ex; else
                        er = new DataOperationError(ex, oper);
                    return this._onError(er, this);
                };
                DbContext.prototype._onSubmitError = function (error) {
                    var args = { error: error, isHandled: false };
                    this.raiseEvent('submit_error', args);
                    if (!args.isHandled) {
                        this.rejectChanges();
                        this._onDataOperError(error, DATA_OPER.SUBMIT);
                    }
                };
                DbContext.prototype._beforeLoad = function (query, oldQuery, dbSet) {
                    if (query && oldQuery !== query) {
                        dbSet._query = query;
                        dbSet.pageIndex = 0;
                    }
                    if (!!oldQuery && oldQuery !== query) {
                        oldQuery.destroy();
                    }

                    if (query.pageSize !== dbSet.pageSize) {
                        dbSet._ignorePageChanged = true;
                        try  {
                            dbSet.pageIndex = 0;
                            dbSet.pageSize = query.pageSize;
                        } finally {
                            dbSet._ignorePageChanged = false;
                        }
                    }

                    if (query.pageIndex !== dbSet.pageIndex) {
                        dbSet._ignorePageChanged = true;
                        try  {
                            dbSet.pageIndex = query.pageIndex;
                        } finally {
                            dbSet._ignorePageChanged = false;
                        }
                    }

                    if (!query.isCacheValid) {
                        query._clearCache();
                    }
                };
                DbContext.prototype._load = function (query, isPageChanged) {
                    if (!query) {
                        throw new Error(RIAPP.ERRS.ERR_DB_LOAD_NO_QUERY);
                    }
                    var self = this, deferred = utils.createDeferred();
                    var fn_onComplete = function (isOk, res) {
                        if (isOk) {
                            deferred.resolve(res);
                        } else {
                            deferred.reject();
                        }
                    };

                    var loadPageCount = query.loadPageCount, pageIndex = query.pageIndex, isPagingEnabled = query.isPagingEnabled, dbSetName = query.dbSetName, dbSet = this.getDbSet(dbSetName);

                    this.waitForNotSubmiting(function () {
                        dbSet.waitForNotLoading(function () {
                            var oldQuery = dbSet.query;
                            var loadUrl = self._getUrl(DATA_SVC_METH.LoadData), requestInfo, postData, operType = DATA_OPER.LOAD, fn_onEnd = function () {
                                dbSet.isLoading = false;
                                self.isBusy = false;
                            }, fn_onOK = function (res) {
                                fn_onEnd();
                                fn_onComplete(true, res);
                            }, fn_onErr = function (ex) {
                                fn_onEnd();
                                self._onDataOperError(ex, operType);
                                fn_onComplete(false, null);
                            }, fn_onErr2 = function (ex) {
                                fn_onEnd();
                                self._onDataOperError(ex, operType);
                                fn_onComplete(false, null);
                            }, loadRes, range, pageCount = 1;

                            dbSet.isLoading = true;
                            self.isBusy = true;
                            try  {
                                query.pageIndex = pageIndex;
                                self._beforeLoad(query, oldQuery, dbSet);

                                if (loadPageCount > 1 && isPagingEnabled) {
                                    if (query._isPageCached(pageIndex)) {
                                        loadRes = self._loadFromCache(query, isPageChanged);
                                        fn_onOK(loadRes);
                                        return;
                                    } else {
                                        range = query._getCache().getNextRange(pageIndex);
                                        pageIndex = range.start;
                                        pageCount = range.cnt;
                                    }
                                }

                                requestInfo = {
                                    dbSetName: dbSetName,
                                    pageIndex: pageIndex,
                                    pageSize: query.pageSize,
                                    pageCount: pageCount,
                                    isIncludeTotalCount: query.isIncludeTotalCount,
                                    filterInfo: query.filterInfo,
                                    sortInfo: query.sortInfo,
                                    paramInfo: self._getMethodParams(query._queryInfo, query.params).paramInfo,
                                    queryName: query.queryName
                                };

                                postData = JSON.stringify(requestInfo);
                                utils.performAjaxCall(loadUrl, postData, true, function (res) {
                                    var data = [], idx;
                                    try  {
                                        idx = res.indexOf(RIAPP.MOD.consts.CHUNK_SEP);
                                        if (idx > -1) {
                                            data.push(res.substr(0, idx));

                                            data.push(res.substr(idx + RIAPP.MOD.consts.CHUNK_SEP.length));
                                        } else {
                                            data.push(res);
                                        }
                                        data = data.map(function (txt) {
                                            return JSON.parse(txt);
                                        });

                                        setTimeout(function () {
                                            var allRows, getDataResult = data[0];
                                            var hasIncluded = !!getDataResult.included && getDataResult.included.length > 0;
                                            try  {
                                                if (data.length > 1) {
                                                    allRows = data[1];
                                                    if (allRows && allRows.length > 0) {
                                                        if (hasIncluded) {
                                                            getDataResult.included.forEach(function (subset) {
                                                                subset.rows = allRows.splice(0, subset.rowCount);
                                                                if (subset.rowCount != subset.rows.length) {
                                                                    throw new Error(utils.format(RIAPP.ERRS.ERR_ASSERTION_FAILED, 'subset.rowCount == subset.rows.length'));
                                                                }
                                                            });
                                                        }
                                                        getDataResult.rows = allRows;
                                                        if (getDataResult.rowCount != getDataResult.rows.length) {
                                                            throw new Error(utils.format(RIAPP.ERRS.ERR_ASSERTION_FAILED, 'getDataResult.rowCount == getDataResult.rows.length'));
                                                        }
                                                    }
                                                }
                                                loadRes = self._onLoaded(getDataResult, isPageChanged);
                                                fn_onOK(loadRes);
                                            } catch (ex) {
                                                fn_onErr(ex);
                                            }
                                        }, 0);
                                    } catch (ex) {
                                        fn_onErr(ex);
                                    }
                                }, function (er) {
                                    fn_onErr2(er);
                                }, null);
                            } catch (ex) {
                                fn_onErr(ex);
                            }
                        }, [], true, isPageChanged ? 'paging' : null);
                    }, [], isPageChanged ? 'paging' : null);

                    return deferred.promise();
                };
                DbContext.prototype.getDbSet = function (name) {
                    return this._dbSets.getDbSet(name);
                };
                DbContext.prototype.getAssociation = function (name) {
                    var name2 = "get" + name;
                    var f = this._assoc[name2];
                    if (!f)
                        throw new Error(utils.format(RIAPP.ERRS.ERR_ASSOC_NAME_INVALID, name));
                    return f();
                };

                DbContext.prototype.submitChanges = function () {
                    if (!!this._pendingSubmit) {
                        return this._pendingSubmit.deferred.promise();
                    }

                    var self = this, submitState = { deferred: utils.createDeferred() };
                    var callback = function (isOk) {
                        if (isOk) {
                            submitState.deferred.resolve();
                        } else {
                            submitState.deferred.reject();
                        }
                    };

                    this._pendingSubmit = submitState;

                    this.waitForNotBusy(function () {
                        var url, postData, operType = DATA_OPER.SUBMIT, changeSet;
                        var fn_onEnd = function () {
                            self.isBusy = false;
                            self.isSubmiting = false;
                        }, fn_onErr = function (ex) {
                            fn_onEnd();
                            self._onDataOperError(ex, operType);
                            callback(false);
                        };

                        try  {
                            self.isBusy = true;
                            self.isSubmiting = true;
                            self._pendingSubmit = null;
                            url = self._getUrl(DATA_SVC_METH.Submit);
                            changeSet = self._getChanges();

                            if (changeSet.dbSets.length === 0) {
                                fn_onEnd();
                                callback(true);
                                return;
                            }
                        } catch (ex) {
                            fn_onErr(ex);
                            return;
                        }

                        try  {
                            postData = JSON.stringify(changeSet);
                            utils.performAjaxCall(url, postData, true, function (res) {
                                try  {
                                    self._dataSaved(JSON.parse(res));
                                    fn_onEnd();
                                    callback(true);
                                } catch (ex) {
                                    fn_onErr(ex);
                                }
                            }, function (er) {
                                fn_onEnd();
                                self._onSubmitError(er);
                                callback(false);
                            }, null);
                        } catch (ex) {
                            fn_onErr(ex);
                        }
                    }, []);
                    return submitState.deferred.promise();
                };

                DbContext.prototype.load = function (query) {
                    return this._load(query, false);
                };
                DbContext.prototype.acceptChanges = function () {
                    this._dbSets.arrDbSets.forEach(function (eSet) {
                        eSet.acceptChanges();
                    });
                };
                DbContext.prototype.rejectChanges = function () {
                    this._dbSets.arrDbSets.forEach(function (eSet) {
                        eSet.rejectChanges();
                    });
                };
                DbContext.prototype.initialize = function (options) {
                    if (this._isInitialized)
                        return;
                    var self = this, opts = utils.extend(false, {
                        serviceUrl: null,
                        permissions: null
                    }, options), loadUrl, operType;

                    try  {
                        if (!utils.check.isString(opts.serviceUrl)) {
                            throw new Error(utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, "serviceUrl", opts.serviceUrl));
                        }
                        this._serviceUrl = opts.serviceUrl;
                        this._initDbSets();

                        if (!!opts.permissions) {
                            self._updatePermissions(opts.permissions);
                            self._isInitialized = true;
                            self.raisePropertyChanged('isInitialized');
                            return;
                        }

                        loadUrl = this._getUrl(DATA_SVC_METH.GetPermissions), operType = DATA_OPER.INIT;
                    } catch (ex) {
                        this._onError(ex, this);
                        RIAPP.global._throwDummy(ex);
                    }

                    try  {
                        this.isBusy = true;
                        utils.performAjaxCall(loadUrl, undefined, true, function (permissions) {
                            try  {
                                self._updatePermissions(JSON.parse(permissions));
                                self.isBusy = false;
                                self._isInitialized = true;
                                self.raisePropertyChanged('isInitialized');
                            } catch (ex) {
                                self.isBusy = false;
                                self._onDataOperError(ex, operType);
                                RIAPP.global._throwDummy(ex);
                            }
                        }, function (er) {
                            self.isBusy = false;
                            self._onDataOperError(er, operType);
                        }, null);
                    } catch (ex) {
                        this.isBusy = false;
                        this._onDataOperError(ex, operType);
                        RIAPP.global._throwDummy(ex);
                    }
                };
                DbContext.prototype.waitForNotBusy = function (callback, callbackArgs) {
                    this._waitQueue.enQueue({
                        prop: 'isBusy',
                        groupName: null,
                        predicate: function (val) {
                            return !val;
                        },
                        action: callback,
                        actionArgs: callbackArgs
                    });
                };
                DbContext.prototype.waitForNotSubmiting = function (callback, callbackArgs, groupName) {
                    this._waitQueue.enQueue({
                        prop: 'isSubmiting',
                        predicate: function (val) {
                            return !val;
                        },
                        action: callback,
                        actionArgs: callbackArgs,
                        groupName: groupName,
                        lastWins: !!groupName
                    });
                };
                DbContext.prototype.waitForInitialized = function (callback, callbackArgs) {
                    this._waitQueue.enQueue({
                        prop: 'isInitialized',
                        groupName: 'dbContext',
                        predicate: function (val) {
                            return !!val;
                        },
                        action: callback,
                        actionArgs: callbackArgs
                    });
                };
                DbContext.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._waitQueue.destroy();
                    this._waitQueue = null;
                    this._arrAssoc.forEach(function (assoc) {
                        assoc.destroy();
                    });
                    this._arrAssoc = [];
                    this._assoc = {};
                    this._dbSets.destroy();
                    this._dbSets = null;
                    this._svcMethods = {};
                    this._queryInf = {};
                    this._serviceUrl = null;
                    this._isInitialized = false;
                    this._isBusy = 0;
                    this._isSubmiting = false;
                    this._hasChanges = false;
                    _super.prototype.destroy.call(this);
                };
                Object.defineProperty(DbContext.prototype, "service_url", {
                    get: function () {
                        return this._serviceUrl;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbContext.prototype, "isInitialized", {
                    get: function () {
                        return this._isInitialized;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbContext.prototype, "isBusy", {
                    get: function () {
                        return this._isBusy > 0;
                    },
                    set: function (v) {
                        var old = this._isBusy > 0, cur;
                        if (!v) {
                            this._isBusy -= 1;
                            if (this._isBusy < 0)
                                this._isBusy = 0;
                        } else {
                            this._isBusy += 1;
                        }
                        cur = this._isBusy > 0;
                        if (cur != old) {
                            this.raisePropertyChanged('isBusy');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbContext.prototype, "isSubmiting", {
                    get: function () {
                        return this._isSubmiting;
                    },
                    set: function (v) {
                        if (this._isSubmiting !== v) {
                            this._isSubmiting = v;
                            this.raisePropertyChanged('isSubmiting');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbContext.prototype, "serverTimezone", {
                    get: function () {
                        return this._serverTimezone;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbContext.prototype, "dbSets", {
                    get: function () {
                        return this._dbSets;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbContext.prototype, "serviceMethods", {
                    get: function () {
                        return this._svcMethods;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbContext.prototype, "hasChanges", {
                    get: function () {
                        return this._hasChanges;
                    },
                    enumerable: true,
                    configurable: true
                });
                return DbContext;
            })(RIAPP.BaseObject);
            db.DbContext = DbContext;

            var Association = (function (_super) {
                __extends(Association, _super);
                function Association(options) {
                    _super.call(this);
                    var self = this;
                    this._objId = 'ass' + utils.getNewID();
                    var opts = utils.extend(false, {
                        dbContext: null,
                        parentName: '',
                        childName: '',
                        parentKeyFields: [],
                        childKeyFields: [],
                        parentToChildrenName: null,
                        childToParentName: null,
                        name: this._objId,
                        onDeleteAction: DELETE_ACTION.NoAction
                    }, options);

                    this._name = opts.name;
                    this._dbContext = opts.dbContext;
                    this._onDeleteAction = opts.onDeleteAction;
                    this._parentDS = opts.dbContext.getDbSet(opts.parentName);
                    this._childDS = opts.dbContext.getDbSet(opts.childName);
                    this._parentFldInfos = opts.parentKeyFields.map(function (name) {
                        return self._parentDS.getFieldInfo(name);
                    });
                    this._childFldInfos = opts.childKeyFields.map(function (name) {
                        return self._childDS.getFieldInfo(name);
                    });
                    this._parentToChildrenName = opts.parentToChildrenName;
                    this._childToParentName = opts.childToParentName;
                    this._parentMap = {};
                    this._childMap = {};
                    this._isParentFilling = false;
                    this._isChildFilling = false;
                    this._bindParentDS();
                    var changed1 = this._mapParentItems(this._parentDS.items);
                    this._bindChildDS();
                    var changed2 = this._mapChildren(this._childDS.items);
                    this._saveParentFKey = null;
                    this._saveChildFKey = null;
                    this._changedTimeout = null;
                    this._changed = {};
                    self._notifyParentChanged(changed1);
                    self._notifyChildrenChanged(changed2);
                }
                Association.prototype._onError = function (error, source) {
                    var isHandled = _super.prototype._onError.call(this, error, source);
                    if (!isHandled) {
                        return RIAPP.global._onError(error, source);
                    }
                    return isHandled;
                };
                Association.prototype._bindParentDS = function () {
                    var self = this, ds = this._parentDS;
                    if (!ds)
                        return;
                    ds._addHandler('coll_changed', function (sender, args) {
                        if (ds !== sender)
                            return;
                        self._onParentCollChanged(args);
                    }, self._objId, true);
                    ds._addHandler('fill', function (sender, args) {
                        if (ds !== sender)
                            return;
                        self._onParentFill(args);
                    }, self._objId, true);
                    ds._addHandler('begin_edit', function (sender, args) {
                        if (ds !== sender)
                            return;
                        self._onParentEdit(args.item, true, undefined);
                    }, self._objId, true);
                    ds._addHandler('end_edit', function (sender, args) {
                        if (ds !== sender)
                            return;
                        self._onParentEdit(args.item, false, args.isCanceled);
                    }, self._objId, true);
                    ds._addHandler('item_deleting', function (sender, args) {
                    }, self._objId, true);
                    ds._addHandler('status_changed', function (sender, args) {
                        if (ds !== sender)
                            return;
                        self._onParentStatusChanged(args.item, args.oldChangeType);
                    }, self._objId, true);
                    ds._addHandler('commit_changes', function (sender, args) {
                        if (ds !== sender)
                            return;
                        self._onParentCommitChanges(args.item, args.isBegin, args.isRejected, args.changeType);
                    }, self._objId, true);
                };
                Association.prototype._bindChildDS = function () {
                    var self = this, ds = this._childDS;
                    if (!ds)
                        return;
                    ds._addHandler('coll_changed', function (sender, args) {
                        if (ds !== sender)
                            return;
                        self._onChildCollChanged(args);
                    }, self._objId, true);
                    ds._addHandler('fill', function (sender, args) {
                        if (ds !== sender)
                            return;
                        self._onChildFill(args);
                    }, self._objId, true);
                    ds._addHandler('begin_edit', function (sender, args) {
                        if (ds !== sender)
                            return;
                        self._onChildEdit(args.item, true, undefined);
                    }, self._objId, true);
                    ds._addHandler('end_edit', function (sender, args) {
                        if (ds !== sender)
                            return;
                        self._onChildEdit(args.item, false, args.isCanceled);
                    }, self._objId, true);
                    ds._addHandler('status_changed', function (sender, args) {
                        if (ds !== sender)
                            return;
                        self._onChildStatusChanged(args.item, args.oldChangeType);
                    }, self._objId, true);
                    ds._addHandler('commit_changes', function (sender, args) {
                        if (ds !== sender)
                            return;
                        self._onChildCommitChanges(args.item, args.isBegin, args.isRejected, args.changeType);
                    }, self._objId, true);
                };
                Association.prototype._onParentCollChanged = function (args) {
                    var self = this, CH_T = COLL_CHANGE_TYPE, item, items = args.items, changed = [], changedKeys = {};
                    switch (args.change_type) {
                        case CH_T.RESET:
                            if (!self._isParentFilling)
                                changed = self.refreshParentMap();
                            break;
                        case CH_T.ADDED:
                            if (!this._isParentFilling)
                                changed = self._mapParentItems(items);
                            break;
                        case CH_T.REMOVE:
                            items.forEach(function (item) {
                                var key = self._unMapParentItem(item);
                                if (!!key) {
                                    changedKeys[key] = null;
                                }
                            });
                            changed = Object.keys(changedKeys);
                            break;
                        case CH_T.REMAP_KEY:
                             {
                                if (!!args.old_key) {
                                    item = this._parentMap[args.old_key];
                                    if (!!item) {
                                        delete this._parentMap[args.old_key];
                                        changed = this._mapParentItems([item]);
                                    }
                                }
                            }
                            break;
                        default:
                            throw new Error(utils.format(RIAPP.ERRS.ERR_COLLECTION_CHANGETYPE_INVALID, args.change_type));
                    }
                    self._notifyParentChanged(changed);
                };
                Association.prototype._onParentFill = function (args) {
                    var isEnd = !args.isBegin, self = this, changed;
                    if (isEnd) {
                        self._isParentFilling = false;
                        if (args.resetUI) {
                            changed = self.refreshParentMap();
                        } else
                            changed = self._mapParentItems(args.newItems);
                        self._notifyParentChanged(changed);
                    } else {
                        self._isParentFilling = true;
                    }
                };
                Association.prototype._onParentEdit = function (item, isBegin, isCanceled) {
                    var self = this;
                    if (isBegin) {
                        self._storeParentFKey(item);
                    } else {
                        if (!isCanceled)
                            self._checkParentFKey(item); else
                            self._saveParentFKey = null;
                    }
                };
                Association.prototype._onParentCommitChanges = function (item, isBegin, isRejected, changeType) {
                    var self = this, fkey;
                    if (isBegin) {
                        if (isRejected && changeType === CHANGE_TYPE.ADDED) {
                            fkey = this._unMapParentItem(item);
                            if (!!fkey)
                                self._notifyParentChanged([fkey]);
                            return;
                        } else if (!isRejected && changeType === CHANGE_TYPE.DELETED) {
                            fkey = this._unMapParentItem(item);
                            if (!!fkey)
                                self._notifyParentChanged([fkey]);
                            return;
                        }

                        self._storeParentFKey(item);
                    } else {
                        self._checkParentFKey(item);
                    }
                };
                Association.prototype._storeParentFKey = function (item) {
                    var self = this, fkey = self.getParentFKey(item);
                    if (fkey !== null && !!self._parentMap[fkey]) {
                        self._saveParentFKey = fkey;
                    }
                };
                Association.prototype._checkParentFKey = function (item) {
                    var self = this, fkey, savedKey = self._saveParentFKey;
                    self._saveParentFKey = null;
                    fkey = self.getParentFKey(item);
                    if (fkey !== savedKey) {
                        if (!!savedKey) {
                            delete self._parentMap[savedKey];
                            self._notifyChildrenChanged([savedKey]);
                            self._notifyParentChanged([savedKey]);
                        }

                        if (!!fkey) {
                            self._mapParentItems([item]);
                            self._notifyChildrenChanged([fkey]);
                            self._notifyParentChanged([fkey]);
                        }
                    }
                };
                Association.prototype._onParentStatusChanged = function (item, oldChangeType) {
                    var self = this, DEL_STATUS = CHANGE_TYPE.DELETED, newChangeType = item._changeType, fkey;
                    var children, DA = DELETE_ACTION;
                    if (newChangeType === DEL_STATUS) {
                        children = self.getChildItems(item);
                        fkey = this._unMapParentItem(item);
                        switch (self.onDeleteAction) {
                            case DA.NoAction:
                                break;
                            case DA.Cascade:
                                children.forEach(function (child) {
                                    child.deleteItem();
                                });
                                break;
                            case DA.SetNulls:
                                children.forEach(function (child) {
                                    var isEdit = child.isEditing;
                                    if (!isEdit)
                                        child.beginEdit();
                                    try  {
                                        self._childFldInfos.forEach(function (f) {
                                            child[f.fieldName] = null;
                                        });
                                        if (!isEdit)
                                            child.endEdit();
                                    } finally {
                                        if (!isEdit)
                                            child.cancelEdit();
                                    }
                                });
                                break;
                        }
                        if (!!fkey) {
                            self._notifyParentChanged([fkey]);
                        }
                    }
                };
                Association.prototype._onChildCollChanged = function (args) {
                    var self = this, CH_T = COLL_CHANGE_TYPE, item, items = args.items, changed = [], changedKeys = {};
                    switch (args.change_type) {
                        case CH_T.RESET:
                            if (!self._isChildFilling)
                                changed = self.refreshChildMap();
                            break;
                        case CH_T.ADDED:
                            if (!this._isChildFilling)
                                changed = self._mapChildren(items);
                            break;
                        case CH_T.REMOVE:
                            items.forEach(function (item) {
                                var key = self._unMapChildItem(item);
                                if (!!key) {
                                    changedKeys[key] = null;
                                }
                            });
                            changed = Object.keys(changedKeys);
                            break;
                        case CH_T.REMAP_KEY:
                             {
                                if (!!args.old_key) {
                                    item = items[0];
                                    if (!!item) {
                                        var parentKey = item._getFieldVal(this._childToParentName);
                                        if (!!parentKey) {
                                            delete this._childMap[parentKey];
                                            item._clearFieldVal(this._childToParentName);
                                        }
                                        changed = this._mapChildren([item]);
                                    }
                                }
                            }
                            break;
                        default:
                            throw new Error(utils.format(RIAPP.ERRS.ERR_COLLECTION_CHANGETYPE_INVALID, args.change_type));
                    }
                    self._notifyChildrenChanged(changed);
                };
                Association.prototype._notifyChildrenChanged = function (changed) {
                    this._notifyChanged([], changed);
                };
                Association.prototype._notifyParentChanged = function (changed) {
                    this._notifyChanged(changed, []);
                };
                Association.prototype._notifyChanged = function (changed_pkeys, changed_ckeys) {
                    var self = this;
                    if (changed_pkeys.length > 0 || changed_ckeys.length > 0) {
                        changed_pkeys.forEach(function (key) {
                            var res = self._changed[key];
                            if (!res)
                                res = 1; else
                                res = res | 1;
                            self._changed[key] = res;
                        });
                        changed_ckeys.forEach(function (key) {
                            var res = self._changed[key];
                            if (!res)
                                res = 2; else
                                res = res | 2;
                            self._changed[key] = res;
                        });

                        if (!this._changedTimeout) {
                            this._changedTimeout = setTimeout(function () {
                                if (self._isDestroyCalled)
                                    return;
                                self._changedTimeout = null;
                                var changed = self._changed;
                                self._changed = {};
                                var keys = Object.keys(changed);
                                keys.forEach(function (fkey) {
                                    var res = changed[fkey];
                                    if ((res & 1) == 1) {
                                        self._onParentChanged(fkey);
                                    }
                                    if ((res & 2) == 2) {
                                        self._onChildrenChanged(fkey);
                                    }
                                });
                            }, 50);
                        }
                    }
                };
                Association.prototype._onChildFill = function (args) {
                    var isEnd = !args.isBegin, self = this, changed;
                    if (isEnd) {
                        self._isChildFilling = false;
                        if (args.resetUI) {
                            changed = self.refreshChildMap();
                        } else
                            changed = self._mapChildren(args.newItems);
                        self._notifyChildrenChanged(changed);
                    } else {
                        self._isChildFilling = true;
                    }
                };
                Association.prototype._onChildEdit = function (item, isBegin, isCanceled) {
                    var self = this;
                    if (isBegin) {
                        self._storeChildFKey(item);
                    } else {
                        if (!isCanceled)
                            self._checkChildFKey(item); else {
                            self._saveChildFKey = null;
                        }
                    }
                };
                Association.prototype._onChildCommitChanges = function (item, isBegin, isRejected, changeType) {
                    var self = this, fkey;
                    if (isBegin) {
                        if (isRejected && changeType === CHANGE_TYPE.ADDED) {
                            fkey = this._unMapChildItem(item);
                            if (!!fkey)
                                self._notifyChildrenChanged([fkey]);
                            return;
                        } else if (!isRejected && changeType === CHANGE_TYPE.DELETED) {
                            fkey = self._unMapChildItem(item);
                            if (!!fkey)
                                self._notifyChildrenChanged([fkey]);
                            return;
                        }

                        self._storeChildFKey(item);
                    } else {
                        self._checkChildFKey(item);
                    }
                };
                Association.prototype._storeChildFKey = function (item) {
                    var self = this, fkey = self.getChildFKey(item), arr;
                    if (!!fkey) {
                        arr = self._childMap[fkey];
                        if (!!arr && arr.indexOf(item) > -1) {
                            self._saveChildFKey = fkey;
                        }
                    }
                };
                Association.prototype._checkChildFKey = function (item) {
                    var self = this, savedKey = self._saveChildFKey, fkey, arr;
                    self._saveChildFKey = null;
                    fkey = self.getChildFKey(item);
                    if (fkey !== savedKey) {
                        if (!!savedKey) {
                            arr = self._childMap[savedKey];
                            utils.removeFromArray(arr, item);
                            if (arr.length == 0) {
                                delete self._childMap[savedKey];
                            }
                            self._notifyParentChanged([savedKey]);
                            self._notifyChildrenChanged([savedKey]);
                        }
                        if (!!fkey) {
                            self._mapChildren([item]);
                            self._notifyParentChanged([fkey]);
                            self._notifyChildrenChanged([fkey]);
                        }
                    }
                };
                Association.prototype._onChildStatusChanged = function (item, oldChangeType) {
                    var self = this, DEL_STATUS = CHANGE_TYPE.DELETED, newChangeType = item._changeType;
                    var fkey = self.getChildFKey(item);
                    if (!fkey)
                        return;
                    if (newChangeType === DEL_STATUS) {
                        fkey = self._unMapChildItem(item);
                        if (!!fkey)
                            self._notifyChildrenChanged([fkey]);
                    }
                };
                Association.prototype._getItemKey = function (finf, ds, item) {
                    var arr = [], val, strval;
                    for (var i = 0, len = finf.length; i < len; i += 1) {
                        val = item[finf[i].fieldName];
                        strval = ds._getStrValue(val, finf[i]);
                        if (strval === null)
                            return null;
                        arr.push(strval);
                    }
                    return arr.join(';');
                };
                Association.prototype._resetChildMap = function () {
                    var self = this, fkeys = Object.keys(this._childMap);
                    this._childMap = {};
                    self._notifyChildrenChanged(fkeys);
                };
                Association.prototype._resetParentMap = function () {
                    var self = this, fkeys = Object.keys(this._parentMap);
                    this._parentMap = {};
                    self._notifyParentChanged(fkeys);
                };
                Association.prototype._unMapChildItem = function (item) {
                    var fkey, arr, idx, changedKey = null;
                    fkey = this.getChildFKey(item);
                    if (!!fkey) {
                        arr = this._childMap[fkey];
                        if (!!arr) {
                            idx = utils.removeFromArray(arr, item);
                            if (idx > -1) {
                                if (arr.length == 0)
                                    delete this._childMap[fkey];
                                changedKey = fkey;
                            }
                        }
                    }
                    return changedKey;
                };
                Association.prototype._unMapParentItem = function (item) {
                    var fkey, changedKey = null;
                    fkey = this.getParentFKey(item);
                    if (!!fkey && !!this._parentMap[fkey]) {
                        delete this._parentMap[fkey];
                        changedKey = fkey;
                    }
                    return changedKey;
                };
                Association.prototype._mapParentItems = function (items) {
                    var item, fkey, DEL_STATUS = CHANGE_TYPE.DELETED, chngType, old, chngedKeys = {};
                    for (var i = 0, len = items.length; i < len; i += 1) {
                        item = items[i];
                        chngType = item._changeType;
                        if (chngType === DEL_STATUS)
                            continue;
                        fkey = this.getParentFKey(item);
                        if (!!fkey) {
                            old = this._parentMap[fkey];
                            if (old !== item) {
                                this._parentMap[fkey] = item;
                                chngedKeys[fkey] = null;
                            }
                        }
                    }
                    return Object.keys(chngedKeys);
                };
                Association.prototype._onChildrenChanged = function (fkey) {
                    if (!!fkey && !!this._parentToChildrenName) {
                        var obj = this._parentMap[fkey];
                        if (!!obj) {
                            obj.raisePropertyChanged(this._parentToChildrenName);
                        }
                    }
                };
                Association.prototype._onParentChanged = function (fkey) {
                    var self = this, arr;
                    if (!!fkey && !!this._childToParentName) {
                        arr = this._childMap[fkey];
                        if (!!arr) {
                            arr.forEach(function (item) {
                                item.raisePropertyChanged(self._childToParentName);
                            });
                        }
                    }
                };
                Association.prototype._mapChildren = function (items) {
                    var item, fkey, arr, DEL_STATUS = CHANGE_TYPE.DELETED, chngType, chngedKeys = {};
                    for (var i = 0, len = items.length; i < len; i += 1) {
                        item = items[i];
                        chngType = item._changeType;
                        if (chngType === DEL_STATUS)
                            continue;
                        fkey = this.getChildFKey(item);
                        if (!!fkey) {
                            arr = this._childMap[fkey];
                            if (!arr) {
                                arr = [];
                                this._childMap[fkey] = arr;
                            }
                            if (arr.indexOf(item) < 0) {
                                arr.push(item);
                                if (!chngedKeys[fkey])
                                    chngedKeys[fkey] = null;
                            }
                        }
                    }
                    return Object.keys(chngedKeys);
                };
                Association.prototype._unbindParentDS = function () {
                    var self = this, ds = this.parentDS;
                    if (!ds)
                        return;
                    ds.removeNSHandlers(self._objId);
                };
                Association.prototype._unbindChildDS = function () {
                    var self = this, ds = this.childDS;
                    if (!ds)
                        return;
                    ds.removeNSHandlers(self._objId);
                };
                Association.prototype.getParentFKey = function (item) {
                    if (!!item && item._isNew)
                        return item._key;
                    return this._getItemKey(this._parentFldInfos, this._parentDS, item);
                };
                Association.prototype.getChildFKey = function (item) {
                    if (!!item && !!this._childToParentName) {
                        var parentKey = item._getFieldVal(this._childToParentName);
                        if (!!parentKey) {
                            return parentKey;
                        }
                    }

                    return this._getItemKey(this._childFldInfos, this._childDS, item);
                };

                Association.prototype.getChildItems = function (item) {
                    if (!item)
                        return [];
                    var fkey = this.getParentFKey(item), arr = this._childMap[fkey];
                    if (!arr)
                        return [];
                    return arr;
                };

                Association.prototype.getParentItem = function (item) {
                    if (!item)
                        return null;
                    var fkey = this.getChildFKey(item);
                    var obj = this._parentMap[fkey];
                    if (!!obj)
                        return obj; else
                        return null;
                };
                Association.prototype.refreshParentMap = function () {
                    this._resetParentMap();
                    return this._mapParentItems(this._parentDS.items);
                };
                Association.prototype.refreshChildMap = function () {
                    this._resetChildMap();
                    return this._mapChildren(this._childDS.items);
                };
                Association.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    clearTimeout(this._changedTimeout);
                    this._changedTimeout = null;
                    this._changed = {};
                    this._unbindParentDS();
                    this._unbindChildDS();
                    this._parentMap = null;
                    this._childMap = null;
                    this._parentFldInfos = null;
                    this._childFldInfos = null;
                    _super.prototype.destroy.call(this);
                };
                Association.prototype.toString = function () {
                    return this._name;
                };
                Object.defineProperty(Association.prototype, "name", {
                    get: function () {
                        return this._name;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Association.prototype, "parentToChildrenName", {
                    get: function () {
                        return this._parentToChildrenName;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Association.prototype, "childToParentName", {
                    get: function () {
                        return this._childToParentName;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Association.prototype, "parentDS", {
                    get: function () {
                        return this._parentDS;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Association.prototype, "childDS", {
                    get: function () {
                        return this._childDS;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Association.prototype, "parentFldInfos", {
                    get: function () {
                        return this._parentFldInfos;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Association.prototype, "childFldInfos", {
                    get: function () {
                        return this._childFldInfos;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Association.prototype, "onDeleteAction", {
                    get: function () {
                        return this._onDeleteAction;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Association;
            })(RIAPP.BaseObject);
            db.Association = Association;

            var DataView = (function (_super) {
                __extends(DataView, _super);
                function DataView(options) {
                    _super.call(this);
                    var opts = utils.extend(false, {
                        dataSource: null,
                        fn_filter: null,
                        fn_sort: null,
                        fn_itemsProvider: null
                    }, options);

                    if (!opts.dataSource || !utils.check.isProtoOf(MOD.collection.Collection, opts.dataSource))
                        throw new Error(RIAPP.ERRS.ERR_DATAVIEW_DATASRC_INVALID);
                    if (!opts.fn_filter || !utils.check.isFunction(opts.fn_filter))
                        throw new Error(RIAPP.ERRS.ERR_DATAVIEW_FILTER_INVALID);
                    this._objId = 'dvw' + utils.getNewID();
                    this._dataSource = opts.dataSource;
                    this._fn_filter = opts.fn_filter;
                    this._fn_sort = opts.fn_sort;
                    this._fn_itemsProvider = opts.fn_itemsProvider;
                    this._isDSFilling = false;
                    this._isAddingNew = false;
                    var self = this, ds = this._dataSource;
                    ds.getFieldNames().forEach(function (prop) {
                        self._fieldMap[prop] = utils.extend(false, {}, ds.getFieldInfo(prop));
                    });
                    this._bindDS();
                }
                DataView.prototype._getEventNames = function () {
                    var base_events = _super.prototype._getEventNames.call(this);
                    return ['view_refreshed'].concat(base_events);
                };
                DataView.prototype.addOnViewRefreshed = function (fn, namespace) {
                    this.addHandler('view_refreshed', fn, namespace);
                };
                DataView.prototype.removeOnViewRefreshed = function (namespace) {
                    this.removeHandler('view_refreshed', namespace);
                };
                DataView.prototype._filterForPaging = function (items) {
                    var skip = 0, take = 0, pos = -1, cnt = -1, result = [];
                    skip = this.pageSize * this.pageIndex;
                    take = this.pageSize;
                    items.forEach(function (item) {
                        cnt += 1;
                        if (cnt < skip) {
                            return;
                        }
                        pos += 1;
                        if (pos < take) {
                            result.push(item);
                        }
                    });
                    return result;
                };
                DataView.prototype._onViewRefreshed = function (args) {
                    this.raiseEvent('view_refreshed', args);
                };
                DataView.prototype._refresh = function (isPageChanged) {
                    var items;
                    var ds = this._dataSource;
                    if (!ds)
                        return;
                    if (!!this._fn_itemsProvider) {
                        items = this._fn_itemsProvider(ds);
                    } else
                        items = ds.items;
                    if (!!this._fn_filter) {
                        items = items.filter(this._fn_filter);
                    }
                    if (!!this._fn_sort) {
                        items = items.sort(this._fn_sort);
                    }
                    this._fillItems({ items: items, isPageChanged: !!isPageChanged, clear: true, isAppend: false });
                    this._onViewRefreshed({});
                };
                DataView.prototype._fillItems = function (data) {
                    data = utils.extend(false, {
                        items: [],
                        isPageChanged: false,
                        clear: true,
                        isAppend: false
                    }, data);
                    var self = this, items, newItems = [], positions = [], fetchedItems = [];
                    this._onFillStart({ isBegin: true, rowCount: data.items.length, time: new Date(), isPageChanged: data.isPageChanged });
                    try  {
                        if (!!data.clear)
                            this.clear();
                        if (this.isPagingEnabled && !data.isAppend) {
                            items = this._filterForPaging(data.items);
                        } else
                            items = data.items;

                        items.forEach(function (item) {
                            var oldItem = self._itemsByKey[item._key];
                            if (!oldItem) {
                                self._itemsByKey[item._key] = item;
                                newItems.push(item);
                                positions.push(self._items.length - 1);
                                self._items.push(item);
                                fetchedItems.push(item);
                            } else {
                                fetchedItems.push(oldItem);
                            }
                        });

                        if (newItems.length > 0) {
                            this._onItemsChanged({ change_type: COLL_CHANGE_TYPE.ADDED, items: newItems, pos: positions });
                            this.raisePropertyChanged('count');
                        }
                    } finally {
                        this._onFillEnd({
                            isBegin: false,
                            rowCount: fetchedItems.length,
                            time: new Date(),
                            resetUI: !!data.clear,
                            fetchedItems: fetchedItems,
                            newItems: newItems,
                            isPageChanged: data.isPageChanged
                        });
                    }
                    if (!!data.clear)
                        this.totalCount = data.items.length; else
                        this.totalCount = this.totalCount + newItems.length;
                    this.moveFirst();
                    return newItems;
                };
                DataView.prototype._onDSCollectionChanged = function (args) {
                    var self = this, item, CH_T = COLL_CHANGE_TYPE, items = args.items;
                    switch (args.change_type) {
                        case CH_T.RESET:
                            if (!this._isDSFilling)
                                this._refresh(false);
                            break;
                        case CH_T.ADDED:
                            if (!this._isAddingNew && !this._isDSFilling) {
                                if (!!self._fn_filter) {
                                    items = items.filter(self._fn_filter);
                                }
                                self.appendItems(items);
                            }
                            break;
                        case CH_T.REMOVE:
                            items.forEach(function (item) {
                                var key = item._key;
                                item = self._itemsByKey[key];
                                if (!!item) {
                                    self.removeItem(item);
                                }
                            });
                            break;
                        case CH_T.REMAP_KEY:
                             {
                                item = self._itemsByKey[args.old_key];
                                if (!!item) {
                                    delete self._itemsByKey[args.old_key];
                                    self._itemsByKey[args.new_key] = item;
                                    this._onItemsChanged(args);
                                }
                            }
                            break;
                        default:
                            throw new Error(utils.format(RIAPP.ERRS.ERR_COLLECTION_CHANGETYPE_INVALID, args.change_type));
                    }
                };
                DataView.prototype._onDSFill = function (args) {
                    var self = this, items = args.fetchedItems, isEnd = !args.isBegin;
                    if (isEnd) {
                        this._isDSFilling = false;
                        if (args.resetUI)
                            this._refresh(false); else {
                            if (!!self._fn_filter) {
                                items = items.filter(self._fn_filter);
                            }
                            self.appendItems(items);
                        }
                    } else {
                        this._isDSFilling = true;
                    }
                };
                DataView.prototype._onDSStatusChanged = function (args) {
                    var self = this, item = args.item, key = args.key, oldChangeType = args.oldChangeType, isOk, canFilter = !!self._fn_filter;
                    if (!!self._itemsByKey[key]) {
                        self._onItemStatusChanged(item, oldChangeType);

                        if (canFilter) {
                            isOk = self._fn_filter(item);
                            if (!isOk) {
                                self.removeItem(item);
                            }
                        }
                    } else {
                        if (canFilter) {
                            isOk = self._fn_filter(item);
                            if (isOk) {
                                self.appendItems([item]);
                            }
                        }
                    }
                };
                DataView.prototype._bindDS = function () {
                    var self = this, ds = this._dataSource;
                    if (!ds)
                        return;
                    ds.addHandler('coll_changed', function (sender, args) {
                        if (ds !== sender)
                            return;
                        self._onDSCollectionChanged(args);
                    }, self._objId);
                    ds.addHandler('fill', function (sender, args) {
                        if (ds !== sender)
                            return;
                        self._onDSFill(args);
                    }, self._objId);
                    ds.addHandler('begin_edit', function (sender, args) {
                        if (ds !== sender)
                            return;
                        if (!!self._itemsByKey[args.item._key]) {
                            self._onEditing(args.item, true, false);
                        }
                    }, self._objId);
                    ds.addHandler('end_edit', function (sender, args) {
                        if (ds !== sender)
                            return;
                        var isOk, item = args.item, canFilter = !!self._fn_filter;
                        if (!!self._itemsByKey[item._key]) {
                            self._onEditing(item, false, args.isCanceled);
                            if (!args.isCanceled && canFilter) {
                                isOk = self._fn_filter(item);
                                if (!isOk)
                                    self.removeItem(item);
                            }
                        } else {
                            if (!args.isCanceled && canFilter) {
                                isOk = self._fn_filter(item);
                                if (isOk) {
                                    self.appendItems([item]);
                                }
                            }
                        }
                    }, self._objId);
                    ds.addHandler('errors_changed', function (sender, args) {
                        if (ds !== sender)
                            return;
                        if (!!self._itemsByKey[args.item._key]) {
                            self._onErrorsChanged(args.item);
                        }
                    }, self._objId);
                    ds.addHandler('status_changed', function (sender, args) {
                        if (ds !== sender)
                            return;
                        self._onDSStatusChanged(args);
                    }, self._objId);

                    ds.addHandler('item_deleting', function (sender, args) {
                        if (ds !== sender)
                            return;
                        if (!!self._itemsByKey[args.item._key]) {
                            self._onItemDeleting(args);
                        }
                    }, self._objId);
                    ds.addHandler('item_added', function (sender, args) {
                        if (ds !== sender)
                            return;
                        if (self._isAddingNew) {
                            if (!self._itemsByKey[args.item._key]) {
                                self._attach(args.item);
                            }
                            self.currentItem = args.item;
                            self._onEditing(args.item, true, false);
                            self._onItemAdded(args.item);
                        }
                    }, self._objId);
                    ds.addHandler('item_adding', function (sender, args) {
                        if (ds !== sender)
                            return;
                        if (self._isAddingNew) {
                            self._onItemAdding(args.item);
                        }
                    }, self._objId);
                };
                DataView.prototype._unbindDS = function () {
                    var self = this, ds = this._dataSource;
                    if (!ds)
                        return;
                    ds.removeNSHandlers(self._objId);
                };
                DataView.prototype.appendItems = function (items) {
                    if (this._isDestroyCalled)
                        return [];
                    return this._fillItems({ items: items, isPageChanged: false, clear: false, isAppend: true });
                };
                DataView.prototype._getStrValue = function (val, fieldInfo) {
                    return this._dataSource._getStrValue(val, fieldInfo);
                };
                DataView.prototype._onCurrentChanging = function (newCurrent) {
                    var ds = this._dataSource;
                    try  {
                        if (!!ds._EditingItem && newCurrent !== ds._EditingItem)
                            ds.endEdit();
                    } catch (ex) {
                        ds.cancelEdit();
                        RIAPP.global.reThrow(ex, this._onError(ex, this));
                    }
                };
                DataView.prototype._getErrors = function (item) {
                    var ds = this._dataSource;
                    return ds._getErrors(item);
                };
                DataView.prototype._onPageChanged = function () {
                    this._refresh(true);
                };
                DataView.prototype.getItemsWithErrors = function () {
                    var ds = this._dataSource;
                    return ds.getItemsWithErrors();
                };
                DataView.prototype.addNew = function () {
                    var ds = this._dataSource, item;
                    this._isAddingNew = true;
                    try  {
                        item = ds.addNew();
                    } finally {
                        this._isAddingNew = false;
                    }
                    return item;
                };
                DataView.prototype.removeItem = function (item) {
                    if (item._key === null) {
                        throw new Error(RIAPP.ERRS.ERR_ITEM_IS_DETACHED);
                    }
                    if (!this._itemsByKey[item._key])
                        return;
                    var oldPos = utils.removeFromArray(this._items, item);
                    if (oldPos < 0) {
                        throw new Error(RIAPP.ERRS.ERR_ITEM_IS_NOTFOUND);
                    }
                    delete this._itemsByKey[item._key];
                    delete this._errors[item._key];
                    this.totalCount = this.totalCount - 1;
                    this._onRemoved(item, oldPos);
                    var test = this.getItemByPos(oldPos), curPos = this._currentPos;

                    if (curPos === oldPos) {
                        if (!test) {
                            this._currentPos = curPos - 1;
                        }
                        this._onCurrentChanged();
                    }

                    if (curPos > oldPos) {
                        this._currentPos = curPos - 1;
                        this._onCurrentChanged();
                    }
                };
                DataView.prototype.sortLocal = function (fieldNames, sortOrder) {
                    var mult = 1, parser = RIAPP.global.parser;
                    if (!!sortOrder && sortOrder.toUpperCase() === 'DESC')
                        mult = -1;
                    var fn_sort = function (a, b) {
                        var res = 0, i, len, af, bf, fieldName;
                        for (i = 0, len = fieldNames.length; i < len; i += 1) {
                            fieldName = fieldNames[i];
                            af = parser.resolvePath(a, fieldName);
                            bf = parser.resolvePath(b, fieldName);
                            if (af < bf)
                                res = -1 * mult; else if (af > bf)
                                res = mult; else
                                res = 0;

                            if (res !== 0)
                                return res;
                        }
                        return res;
                    };
                    this.fn_sort = fn_sort;
                };
                DataView.prototype.getIsHasErrors = function () {
                    return this._dataSource.getIsHasErrors();
                };
                DataView.prototype.clear = function () {
                    this.cancelEdit();
                    this._EditingItem = null;
                    this._newKey = 0;
                    this.currentItem = null;
                    this._items = [];
                    this._itemsByKey = {};
                    this._errors = {};
                    this._onItemsChanged({ change_type: COLL_CHANGE_TYPE.RESET, items: [] });
                    this.pageIndex = 0;
                    this.raisePropertyChanged('count');
                };
                DataView.prototype.refresh = function () {
                    this._refresh(false);
                };
                DataView.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._unbindDS();
                    this._dataSource = null;
                    this._fn_filter = null;
                    this._fn_sort = null;
                    _super.prototype.destroy.call(this);
                };
                Object.defineProperty(DataView.prototype, "isPagingEnabled", {
                    get: function () {
                        return this._options.enablePaging;
                    },
                    set: function (v) {
                        if (this._options.enablePaging !== v) {
                            this._options.enablePaging = v;
                            this.raisePropertyChanged('isPagingEnabled');
                            this._refresh(false);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataView.prototype, "permissions", {
                    get: function () {
                        return this._dataSource.permissions;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataView.prototype, "fn_filter", {
                    get: function () {
                        return this._fn_filter;
                    },
                    set: function (v) {
                        if (this._fn_filter !== v) {
                            this._fn_filter = v;
                            this._refresh(false);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataView.prototype, "fn_sort", {
                    get: function () {
                        return this._fn_sort;
                    },
                    set: function (v) {
                        if (this._fn_sort !== v) {
                            this._fn_sort = v;
                            this._refresh(false);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataView.prototype, "fn_itemsProvider", {
                    get: function () {
                        return this._fn_itemsProvider;
                    },
                    set: function (v) {
                        if (this._fn_itemsProvider !== v) {
                            this._fn_itemsProvider = v;
                            this._refresh(false);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return DataView;
            })(MOD.collection.Collection);
            db.DataView = DataView;

            var ChildDataView = (function (_super) {
                __extends(ChildDataView, _super);
                function ChildDataView(options) {
                    this._parentItem = null;
                    this._refreshTimeout = null;
                    this._association = options.association;
                    var opts = utils.extend(false, {
                        dataSource: this._association.childDS,
                        fn_filter: null,
                        fn_sort: null,
                        fn_itemsProvider: null
                    }, options);

                    var self = this, assoc = this._association, save_fn_filter = options.fn_filter;
                    opts.fn_filter = function (item) {
                        if (!self._parentItem)
                            return false;
                        var fkey1 = assoc.getParentFKey(self._parentItem);
                        if (!fkey1)
                            return false;
                        var fkey2 = assoc.getChildFKey(item);
                        if (!fkey2)
                            return false;
                        if (fkey1 !== fkey2)
                            return false;
                        if (!save_fn_filter)
                            return true; else
                            return save_fn_filter(item);
                    };
                    _super.call(this, opts);
                }
                ChildDataView.prototype._refresh = function () {
                    var self = this, ds = this._dataSource;
                    if (!ds)
                        return;
                    clearTimeout(self._refreshTimeout);
                    self._refreshTimeout = setTimeout(function () {
                        if (self._isDestroyCalled)
                            return;
                        var items = self._association.getChildItems(self._parentItem);
                        if (!!self._fn_filter) {
                            items = items.filter(self._fn_filter);
                        }
                        if (!!self._fn_sort) {
                            items = items.sort(self._fn_sort);
                        }
                        self._fillItems({ items: items, isPageChanged: false, clear: true, isAppend: false });
                        self._onViewRefreshed({});
                    }, 250);
                };
                ChildDataView.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    clearTimeout(this._refreshTimeout);
                    this._association = null;
                    _super.prototype.destroy.call(this);
                };
                ChildDataView.prototype.toString = function () {
                    if (!!this._association)
                        return 'ChildDataView for ' + this._association.toString();
                    return 'ChildDataView';
                };
                Object.defineProperty(ChildDataView.prototype, "parentItem", {
                    get: function () {
                        return this._parentItem;
                    },
                    set: function (v) {
                        if (this._parentItem !== v) {
                            this._parentItem = v;
                            this.raisePropertyChanged('parentItem');
                            if (this.items.length > 0) {
                                this.clear();
                                this._onViewRefreshed({});
                            }
                            this._refresh();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ChildDataView.prototype, "association", {
                    get: function () {
                        return this._association;
                    },
                    enumerable: true,
                    configurable: true
                });
                return ChildDataView;
            })(DataView);
            db.ChildDataView = ChildDataView;

            RIAPP.global.onModuleLoaded('db', db);
        })(MOD.db || (MOD.db = {}));
        var db = MOD.db;
    })(RIAPP.MOD || (RIAPP.MOD = {}));
    var MOD = RIAPP.MOD;
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    (function (MOD) {
        (function (listbox) {
            var utils = RIAPP.global.utils, consts = RIAPP.global.consts;

            var ListBox = (function (_super) {
                __extends(ListBox, _super);
                function ListBox(el, dataSource, options) {
                    _super.call(this);
                    var self = this;
                    this._el = el;
                    this._$el = RIAPP.global.$(this._el);
                    this._objId = 'lst' + utils.getNewID();
                    if (!!dataSource && !(dataSource instanceof MOD.collection.Collection))
                        throw new Error(RIAPP.ERRS.ERR_LISTBOX_DATASRC_INVALID);
                    this._$el.on('change.' + this._objId, function (e) {
                        e.stopPropagation();
                        if (self._isRefreshing)
                            return;
                        self._onChanged();
                    });
                    this._dataSource = null;
                    this._isDSFilling = false;
                    this._isRefreshing = false;
                    this._valuePath = options.valuePath;
                    this._textPath = options.textPath;
                    this._selectedItem = null;
                    this._saveSelected = null;
                    this._keyMap = {};
                    this._valMap = {};
                    this._saveVal = undefined;
                    this._selectedValue = undefined;
                    this.dataSource = dataSource;
                }
                ListBox.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._unbindDS();
                    this._$el.off('.' + this._objId);
                    this._clear(true);
                    this._el = null;
                    this._$el = null;
                    _super.prototype.destroy.call(this);
                };
                ListBox.prototype._onChanged = function () {
                    var op = null, key, data;
                    if (this._el.selectedIndex >= 0) {
                        op = (this._el.options)[this._el.selectedIndex];
                        key = op.value;
                        data = this._keyMap[key];
                    }

                    if (!data && !!this._selectedItem) {
                        this.selectedItem = null;
                    } else if (data.item !== this._selectedItem) {
                        this.selectedItem = data.item;
                    }
                };
                ListBox.prototype._getValue = function (item) {
                    var v = this._getRealValue(item);
                    if (utils.check.isNt(v))
                        return '';
                    return v;
                };
                ListBox.prototype._getRealValue = function (item) {
                    if (!item)
                        return null;
                    if (!!this._valuePath) {
                        return RIAPP.global.parser.resolvePath(item, this._valuePath);
                    } else
                        return undefined;
                };
                ListBox.prototype._getText = function (item) {
                    if (!item)
                        return '';
                    if (!!this._textPath) {
                        var t = RIAPP.global.parser.resolvePath(item, this._textPath);
                        if (utils.check.isNt(t))
                            return '';
                        return '' + t;
                    } else
                        return '' + this._getValue(item);
                };
                ListBox.prototype._onDSCollectionChanged = function (args) {
                    var self = this, CH_T = MOD.collection.consts.COLL_CHANGE_TYPE, data;
                    switch (args.change_type) {
                        case CH_T.RESET:
                            if (!this._isDSFilling)
                                this._refresh();
                            break;
                        case CH_T.ADDED:
                            if (!this._isDSFilling) {
                                args.items.forEach(function (item) {
                                    self._addOption(item, item._isNew);
                                });
                            }
                            break;
                        case CH_T.REMOVE:
                            args.items.forEach(function (item) {
                                self._removeOption(item);
                            });
                            break;
                        case CH_T.REMAP_KEY: {
                            data = self._keyMap[args.old_key];
                            if (!!data) {
                                delete self._keyMap[args.old_key];
                                self._keyMap[args.new_key] = data;
                                data.op.value = args.new_key;
                            }
                        }
                    }
                };
                ListBox.prototype._onDSFill = function (args) {
                    var isEnd = !args.isBegin;
                    if (isEnd) {
                        this._isDSFilling = false;
                        this._refresh();
                    } else {
                        this._isDSFilling = true;
                    }
                };
                ListBox.prototype._onEdit = function (item, isBegin, isCanceled) {
                    var self = this, key, data, oldVal, val;
                    if (isBegin) {
                        this._saveVal = this._getValue(item);
                    } else {
                        oldVal = this._saveVal;
                        this._saveVal = undefined;
                        if (!isCanceled) {
                            key = item._key;
                            data = self._keyMap[key];
                            if (!!data) {
                                data.op.text = self._getText(item);
                                val = this._getValue(item);
                                if (oldVal !== val) {
                                    if (oldVal !== '') {
                                        delete self._valMap[oldVal];
                                    }
                                    if (val !== '') {
                                        self._valMap[val] = data;
                                    }
                                }
                            } else {
                                if (oldVal !== '') {
                                    delete self._valMap[oldVal];
                                }
                            }
                        }
                    }
                };
                ListBox.prototype._onStatusChanged = function (item, oldChangeType) {
                    var DEL_STATUS = consts.CHANGE_TYPE.DELETED, newChangeType = item._changeType;
                    if (newChangeType === DEL_STATUS) {
                        this._removeOption(item);
                    }
                };
                ListBox.prototype._onCommitChanges = function (item, isBegin, isRejected, changeType) {
                    var self = this, ct = consts.CHANGE_TYPE, oldVal, val, data;
                    if (isBegin) {
                        if (isRejected && changeType === ct.ADDED) {
                            return;
                        } else if (!isRejected && changeType === ct.DELETED) {
                            return;
                        }

                        this._saveVal = this._getValue(item);
                    } else {
                        oldVal = this._saveVal;
                        this._saveVal = undefined;

                        if (isRejected && changeType === ct.DELETED) {
                            this._addOption(item, true);
                            return;
                        }
                        val = this._getValue(item);
                        data = self._keyMap[item._key];
                        if (oldVal !== val) {
                            if (oldVal !== '') {
                                delete self._valMap[oldVal];
                            }
                            if (!!data && val !== '') {
                                self._valMap[val] = data;
                            }
                        }
                        if (!!data) {
                            data.op.text = self._getText(item);
                        }
                    }
                };
                ListBox.prototype._bindDS = function () {
                    var self = this, ds = this._dataSource;
                    if (!ds)
                        return;
                    ds.addOnCollChanged(function (sender, args) {
                        if (ds !== sender)
                            return;
                        self._onDSCollectionChanged(args);
                    }, self._objId);
                    ds.addOnFill(function (sender, args) {
                        if (ds !== sender)
                            return;
                        self._onDSFill(args);
                    }, self._objId);
                    ds.addOnBeginEdit(function (sender, args) {
                        if (ds !== sender)
                            return;
                        self._onEdit(args.item, true, undefined);
                    }, self._objId);
                    ds.addOnEndEdit(function (sender, args) {
                        if (ds !== sender)
                            return;
                        self._onEdit(args.item, false, args.isCanceled);
                    }, self._objId);
                    ds.addOnStatusChanged(function (sender, args) {
                        if (ds !== sender)
                            return;
                        self._onStatusChanged(args.item, args.oldChangeType);
                    }, self._objId);
                    ds.addOnCommitChanges(function (sender, args) {
                        if (ds !== sender)
                            return;
                        self._onCommitChanges(args.item, args.isBegin, args.isRejected, args.changeType);
                    }, self._objId);
                };
                ListBox.prototype._unbindDS = function () {
                    var self = this, ds = this._dataSource;
                    if (!ds)
                        return;
                    ds.removeNSHandlers(self._objId);
                };
                ListBox.prototype._addOption = function (item, first) {
                    if (this._isDestroyCalled)
                        return null;
                    var oOption, key = '', val, text;
                    if (!!item) {
                        key = item._key;
                    }
                    if (!!this._keyMap[key]) {
                        return null;
                    }
                    text = this._getText(item);
                    val = this._getValue(item);
                    oOption = RIAPP.global.document.createElement("option");
                    oOption.text = text;
                    oOption.value = key;
                    var data = { item: item, op: oOption };
                    this._keyMap[key] = data;
                    if (val !== '')
                        this._valMap[val] = data;
                    if (!!first) {
                        if (this._el.options.length < 2)
                            this._el.add(oOption, null); else
                            this._el.add(oOption, (this._el).options[1]);
                    } else
                        this._el.add(oOption, null);
                    return oOption;
                };
                ListBox.prototype._removeOption = function (item) {
                    if (this._isDestroyCalled)
                        return;
                    var key = '', data, val;
                    if (!!item) {
                        key = item._key;
                        data = this._keyMap[key];
                        if (!data) {
                            return;
                        }
                        this._el.remove(data.op.index);
                        val = this._getValue(item);
                        delete this._keyMap[key];
                        if (val !== '')
                            delete this._valMap[val];
                        if (this._saveSelected === item) {
                            this._saveSelected = null;
                        }
                        if (this.selectedItem === item) {
                            this.selectedItem = this._saveSelected;
                        }
                    }
                };
                ListBox.prototype._clear = function (isDestroy) {
                    this._el.options.length = 0;
                    this._keyMap = {};
                    this._valMap = {};
                    this._saveSelected = null;
                    if (!isDestroy) {
                        this._addOption(null, false);
                        this.selectedItem = null;
                    } else
                        this._selectedItem = null;
                };
                ListBox.prototype.clear = function () {
                    this._clear(false);
                };
                ListBox.prototype._refresh = function () {
                    var self = this, ds = this._dataSource, oldItem = this._selectedItem;
                    this._isRefreshing = true;
                    try  {
                        this.clear();
                        if (!!ds) {
                            ds.forEach(function (item) {
                                self._addOption(item, false);
                            });
                        }
                        if (this._selectedValue === undefined) {
                            this._el.selectedIndex = this._findItemIndex(oldItem);
                        } else {
                            oldItem = self.findItemByValue(this._selectedValue);
                            self.selectedItem = oldItem;
                        }
                    } finally {
                        this._isRefreshing = false;
                    }
                    this._onChanged();
                };
                ListBox.prototype._findItemIndex = function (item) {
                    if (!item)
                        return 0;
                    var data = this._keyMap[item._key];
                    if (!data)
                        return 0;
                    return data.op.index;
                };
                ListBox.prototype.findItemByValue = function (val) {
                    var data = this._valMap[val];
                    if (!data)
                        return null;
                    return data.item;
                };
                ListBox.prototype.getTextByValue = function (val) {
                    var data = this._valMap[val];
                    if (!data)
                        return ''; else
                        return data.op.text;
                };
                ListBox.prototype._setIsEnabled = function (el, v) {
                    el.disabled = !v;
                };
                ListBox.prototype._getIsEnabled = function (el) {
                    return !el.disabled;
                };
                ListBox.prototype.toString = function () {
                    return 'ListBox';
                };
                Object.defineProperty(ListBox.prototype, "dataSource", {
                    get: function () {
                        return this._dataSource;
                    },
                    set: function (v) {
                        if (this._dataSource !== v) {
                            if (!!this._dataSource)
                                this._unbindDS();
                            this.clear();
                            this._dataSource = v;
                            if (!!this._dataSource) {
                                this._bindDS();
                            }
                            this._refresh();
                            this.raisePropertyChanged('dataSource');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListBox.prototype, "selectedValue", {
                    get: function () {
                        if (this._selectedValue === undefined)
                            return this._getRealValue(this.selectedItem); else
                            return this._selectedValue;
                    },
                    set: function (v) {
                        var self = this;
                        if (this.selectedValue !== v) {
                            var item = self.findItemByValue(v);
                            self.selectedItem = item;
                            if (!item)
                                this._selectedValue = v;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListBox.prototype, "selectedItem", {
                    get: function () {
                        return this._selectedItem;
                    },
                    set: function (v) {
                        if (this._selectedItem !== v) {
                            if (!!this._selectedItem) {
                                this._saveSelected = this._selectedItem;
                                this._selectedValue = undefined;
                            }
                            this._selectedItem = v;
                            this._el.selectedIndex = this._findItemIndex(this._selectedItem);
                            this.raisePropertyChanged('selectedItem');
                            this.raisePropertyChanged('selectedValue');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListBox.prototype, "valuePath", {
                    get: function () {
                        return this._valuePath;
                    },
                    set: function (v) {
                        if (v !== this._valuePath) {
                            this._valuePath = v;
                            this.raisePropertyChanged('valuePath');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListBox.prototype, "textPath", {
                    get: function () {
                        return this._textPath;
                    },
                    set: function (v) {
                        if (v !== this._textPath) {
                            this._textPath = v;
                            this._refresh();
                            this.raisePropertyChanged('textPath');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListBox.prototype, "isEnabled", {
                    get: function () {
                        return this._getIsEnabled(this._el);
                    },
                    set: function (v) {
                        if (v !== this.isEnabled) {
                            this._setIsEnabled(this._el, v);
                            this.raisePropertyChanged('isEnabled');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListBox.prototype, "el", {
                    get: function () {
                        return this._el;
                    },
                    enumerable: true,
                    configurable: true
                });
                return ListBox;
            })(RIAPP.BaseObject);
            listbox.ListBox = ListBox;

            var SelectElView = (function (_super) {
                __extends(SelectElView, _super);
                function SelectElView(app, el, options) {
                    this._dataSource = null;
                    this._listBox = null;
                    this._options = options;
                    _super.call(this, app, el, options);
                }
                SelectElView.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._listBox && !this._listBox._isDestroyCalled) {
                        this._listBox.destroy();
                    }
                    this._listBox = null;
                    this._dataSource = null;
                    _super.prototype.destroy.call(this);
                };
                SelectElView.prototype.toString = function () {
                    return 'SelectElView';
                };
                Object.defineProperty(SelectElView.prototype, "isEnabled", {
                    get: function () {
                        return !this.el.disabled;
                    },
                    set: function (v) {
                        v = !!v;
                        if (v !== this.isEnabled) {
                            this.el.disabled = !v;
                            this.raisePropertyChanged('isEnabled');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SelectElView.prototype, "el", {
                    get: function () {
                        return this._el;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SelectElView.prototype, "dataSource", {
                    get: function () {
                        return this._dataSource;
                    },
                    set: function (v) {
                        var self = this;
                        if (this._dataSource !== v) {
                            this._dataSource = v;
                            if (!!this._listBox)
                                this._listBox.destroy();
                            this._listBox = null;
                            if (!!this._dataSource) {
                                this._listBox = new ListBox(this._el, this._dataSource, this._options);
                                this._listBox.addOnDestroyed(function () {
                                    self._listBox = null;
                                }, this.uniqueID);
                                this._listBox.addOnPropertyChange('*', function (sender, args) {
                                    self.raisePropertyChanged(args.property);
                                }, this.uniqueID);
                            }
                            self.invokePropChanged('listBox');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SelectElView.prototype, "selectedValue", {
                    get: function () {
                        if (!this._listBox)
                            return null;
                        return this._listBox.selectedValue;
                    },
                    set: function (v) {
                        if (!this._listBox)
                            return;
                        if (this._listBox.selectedValue !== v) {
                            this._listBox.selectedValue = v;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SelectElView.prototype, "selectedItem", {
                    get: function () {
                        if (!this._listBox)
                            return null;
                        return this._listBox.selectedItem;
                    },
                    set: function (v) {
                        if (!this._listBox)
                            return;
                        this._listBox.selectedItem = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SelectElView.prototype, "listBox", {
                    get: function () {
                        return this._listBox;
                    },
                    enumerable: true,
                    configurable: true
                });
                return SelectElView;
            })(MOD.baseElView.BaseElView);
            listbox.SelectElView = SelectElView;

            var LookupContent = (function (_super) {
                __extends(LookupContent, _super);
                function LookupContent(app, parentEl, options, dctx, isEditing) {
                    if (options.name != 'lookup') {
                        throw new Error(utils.format(RIAPP.ERRS.ERR_ASSERTION_FAILED, "options.name == 'lookup'"));
                    }
                    this._spanView = null;
                    this._selectView = null;
                    this._isListBoxCachedExternally = false;
                    this._valBinding = null;
                    this._listBinding = null;
                    this._value = null;
                    _super.call(this, app, parentEl, options, dctx, isEditing);
                }
                LookupContent.prototype._init = function () {
                    if (!!this._options.initContentFn) {
                        this._options.initContentFn(this);
                    }
                };
                LookupContent.prototype._getEventNames = function () {
                    var base_events = _super.prototype._getEventNames.call(this);
                    return ['object_created', 'object_needed'].concat(base_events);
                };
                LookupContent.prototype.addOnObjectCreated = function (fn, namespace) {
                    this.addHandler('object_created', fn, namespace);
                };
                LookupContent.prototype.removeOnObjectCreated = function (namespace) {
                    this.removeHandler('object_created', namespace);
                };
                LookupContent.prototype.addOnObjectNeeded = function (fn, namespace) {
                    this.addHandler('object_needed', fn, namespace);
                };
                LookupContent.prototype.removeOnObjectNeeded = function (namespace) {
                    this.removeHandler('object_needed', namespace);
                };
                LookupContent.prototype._getSelectView = function () {
                    if (!!this._selectView)
                        return this._selectView;
                    var lookUpOptions = this._options.options;
                    var args1 = { objectKey: 'selectElView', object: null };

                    this.raiseEvent('object_needed', args1);
                    if (!!args1.object) {
                        this._isListBoxCachedExternally = true;
                        this._selectView = args1.object;
                    }
                    if (!!this._selectView)
                        return this._selectView;

                    var dataSource = RIAPP.global.parser.resolvePath(this.app, lookUpOptions.dataSource), options = { valuePath: lookUpOptions.valuePath, textPath: lookUpOptions.textPath };
                    var el = RIAPP.global.document.createElement('select');
                    el.setAttribute('size', '1');
                    var selectElView = this._createSelectElView(el, options);
                    selectElView.dataSource = dataSource;
                    var args2 = { objectKey: 'selectElView', object: selectElView, isCachedExternally: false };

                    this.raiseEvent('object_created', args2);
                    this._isListBoxCachedExternally = args2.isCachedExternally;
                    this._selectView = selectElView;
                    return this._selectView;
                };
                LookupContent.prototype._createSelectElView = function (el, options) {
                    var elView;
                    elView = this.app._getElView(el);
                    if (!!elView)
                        return elView;
                    elView = new SelectElView(this.app, el, options);
                    return elView;
                };
                LookupContent.prototype._updateTextValue = function () {
                    var spanView = this._getSpanView();
                    spanView.value = this._getLookupText();
                };
                LookupContent.prototype._getLookupText = function () {
                    var listBoxView = this._getSelectView();
                    return listBoxView.listBox.getTextByValue(this.value);
                };
                LookupContent.prototype._getSpanView = function () {
                    if (!!this._spanView) {
                        return this._spanView;
                    }
                    var el = RIAPP.global.document.createElement('span'), displayInfo = this._getDisplayInfo();
                    var spanView = new MOD.baseElView.SpanElView(this.app, el, {});
                    if (!!displayInfo) {
                        if (!!displayInfo.displayCss) {
                            spanView.$el.addClass(displayInfo.displayCss);
                        }
                    }
                    this._spanView = spanView;
                    return this._spanView;
                };
                LookupContent.prototype.update = function () {
                    this._cleanUp();
                    this._el = this._createTargetElement();
                    this._parentEl.appendChild(this._el);
                };
                LookupContent.prototype._createTargetElement = function () {
                    var el, selectView, spanView;
                    if (this._isEditing && this._canBeEdited()) {
                        selectView = this._getSelectView();
                        this._listBinding = this._bindToList(selectView);
                        el = selectView.el;
                    } else {
                        spanView = this._getSpanView();
                        this._valBinding = this._bindToValue();
                        el = spanView.el;
                    }
                    this._updateCss();
                    return el;
                };
                LookupContent.prototype._cleanUp = function () {
                    if (!!this._el) {
                        utils.removeNode(this._el);
                        this._el = null;
                    }
                    if (!!this._listBinding) {
                        this._listBinding.destroy();
                        this._listBinding = null;
                    }
                    if (!!this._valBinding) {
                        this._valBinding.destroy();
                        this._valBinding = null;
                    }

                    if (!!this._selectView && this._isListBoxCachedExternally) {
                        this._selectView = null;
                    }
                };
                LookupContent.prototype._updateBindingSource = function () {
                    if (!!this._valBinding) {
                        this._valBinding.source = this._dctx;
                    }
                    if (!!this._listBinding) {
                        this._listBinding.source = this._dctx;
                    }
                };
                LookupContent.prototype._bindToValue = function () {
                    if (!this._options.fieldName)
                        return null;

                    var options = {
                        target: this,
                        source: this._dctx,
                        targetPath: 'value',
                        sourcePath: this._options.fieldName,
                        mode: "OneWay",
                        converter: null,
                        converterParam: null,
                        isSourceFixed: false
                    };
                    return new MOD.binding.Binding(options);
                };
                LookupContent.prototype._bindToList = function (selectView) {
                    if (!this._options.fieldName)
                        return null;

                    var options = {
                        target: selectView,
                        source: this._dctx,
                        targetPath: 'selectedValue',
                        sourcePath: this._options.fieldName,
                        mode: "TwoWay",
                        converter: null,
                        converterParam: null,
                        isSourceFixed: false
                    };
                    return new MOD.binding.Binding(options);
                };
                LookupContent.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._cleanUp();
                    if (!!this._selectView && !this._isListBoxCachedExternally) {
                        this._selectView.destroy();
                    }
                    this._selectView = null;
                    if (!!this._spanView) {
                        this._spanView.destroy();
                    }
                    this._spanView = null;
                    _super.prototype.destroy.call(this);
                };
                LookupContent.prototype.toString = function () {
                    return 'LookupContent';
                };
                Object.defineProperty(LookupContent.prototype, "value", {
                    get: function () {
                        return this._value;
                    },
                    set: function (v) {
                        if (this._value !== v) {
                            this._value = v;
                            this._updateTextValue();
                            this.raisePropertyChanged('value');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return LookupContent;
            })(MOD.baseContent.BindingContent);
            listbox.LookupContent = LookupContent;

            var ContentFactory = (function () {
                function ContentFactory(app, nextFactory) {
                    this._app = app;
                    this._nextFactory = nextFactory;
                }
                ContentFactory.prototype.getContentType = function (options) {
                    if (options.name == 'lookup') {
                        return LookupContent;
                    }
                    if (!!this._nextFactory)
                        return this._nextFactory.getContentType(options); else
                        throw new Error(RIAPP.ERRS.ERR_BINDING_CONTENT_NOT_FOUND);
                };

                ContentFactory.prototype.createContent = function (parentEl, options, dctx, isEditing) {
                    var contentType = this.getContentType(options);
                    return new contentType(this._app, parentEl, options, dctx, isEditing);
                };

                ContentFactory.prototype.isExternallyCachable = function (contentType) {
                    if (LookupContent === contentType)
                        return true;
                    return this._nextFactory.isExternallyCachable(contentType);
                };
                Object.defineProperty(ContentFactory.prototype, "app", {
                    get: function () {
                        return this._app;
                    },
                    enumerable: true,
                    configurable: true
                });
                return ContentFactory;
            })();
            listbox.ContentFactory = ContentFactory;

            function initModule(app) {
                app.registerContentFactory(function (nextFactory) {
                    return new ContentFactory(app, nextFactory);
                });
                return listbox;
            }
            listbox.initModule = initModule;
            ;

            RIAPP.global.registerElView('select', SelectElView);
            RIAPP.global.onModuleLoaded('listbox', listbox);
        })(MOD.listbox || (MOD.listbox = {}));
        var listbox = MOD.listbox;
    })(RIAPP.MOD || (RIAPP.MOD = {}));
    var MOD = RIAPP.MOD;
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    (function (MOD) {
        (function (datadialog) {
            var utils = RIAPP.global.utils, consts = RIAPP.global.consts;
            datadialog.DIALOG_ACTION = { Default: 0, StayOpen: 1 };

            var DataEditDialog = (function (_super) {
                __extends(DataEditDialog, _super);
                function DataEditDialog(app, options) {
                    _super.call(this);
                    var self = this;
                    this._app = app;
                    this._objId = 'dlg' + utils.getNewID();
                    var opts = utils.extend(false, {
                        dataContext: null,
                        templateID: null,
                        width: 500,
                        height: 350,
                        title: 'data edit dialog',
                        submitOnOK: false,
                        canRefresh: false,
                        canCancel: true,
                        fn_OnClose: null,
                        fn_OnOK: null,
                        fn_OnShow: null,
                        fn_OnCancel: null,
                        fn_OnTemplateCreated: null,
                        fn_OnTemplateDestroy: null
                    }, options);
                    this._dataContext = opts.dataContext;
                    this._templateID = opts.templateID;
                    this._submitOnOK = opts.submitOnOK;
                    this._canRefresh = opts.canRefresh;
                    this._canCancel = opts.canCancel;
                    this._fn_OnClose = opts.fn_OnClose;
                    this._fn_OnOK = opts.fn_OnOK;
                    this._fn_OnShow = opts.fn_OnShow;
                    this._fn_OnCancel = opts.fn_OnCancel;
                    this._fn_OnTemplateCreated = opts.fn_OnTemplateCreated;
                    this._fn_OnTemplateDestroy = opts.fn_OnTemplateDestroy;

                    this._isEditable = false;
                    this._template = null;
                    this._$template = null;
                    this._result = null;
                    this._currentSelectable = null;
                    this._fn_submitOnOK = function () {
                        if (!self._dataContext._isCanSubmit) {
                            return utils.createDeferred().resolve().promise();
                        }
                        var dctxt = self._dataContext;
                        return dctxt.submitChanges();
                    };
                    this._updateIsEditable();
                    this._options = {
                        width: opts.width,
                        height: opts.height,
                        title: opts.title,
                        autoOpen: false,
                        modal: true,
                        close: function (event, ui) {
                            self._onClose();
                        },
                        buttons: self._getButtons()
                    };
                    this._dialogCreated = false;
                    this._createDialog();
                }
                DataEditDialog.prototype.addOnClose = function (fn, namespace) {
                    this.addHandler('close', fn, namespace);
                };
                DataEditDialog.prototype.removeOnClose = function (namespace) {
                    this.removeHandler('close', namespace);
                };
                DataEditDialog.prototype.addOnRefresh = function (fn, namespace) {
                    this.addHandler('refresh', fn, namespace);
                };
                DataEditDialog.prototype.removeOnRefresh = function (namespace) {
                    this.removeHandler('refresh', namespace);
                };
                DataEditDialog.prototype._updateIsEditable = function () {
                    this._isEditable = utils.check.isEditable(this._dataContext);
                };
                DataEditDialog.prototype._createDialog = function () {
                    if (this._dialogCreated)
                        return;
                    var dctx = this._dataContext;
                    this._template = this._createTemplate(dctx);
                    this._$template = RIAPP.global.$(this._template.el);
                    RIAPP.global.document.body.appendChild(this._template.el);
                    (this._$template).dialog(this._options);
                    this._dialogCreated = true;
                    if (!!this._fn_OnTemplateCreated) {
                        this._fn_OnTemplateCreated(this._template);
                    }
                };
                DataEditDialog.prototype._getEventNames = function () {
                    var base_events = _super.prototype._getEventNames.call(this);
                    return ['close', 'refresh'].concat(base_events);
                };
                DataEditDialog.prototype._createTemplate = function (dcxt) {
                    var t = new MOD.template.Template(this._app, this._templateID);

                    t.isDisabled = true;
                    t.dataContext = dcxt;
                    return t;
                };
                DataEditDialog.prototype._destroyTemplate = function () {
                    if (!!this._fn_OnTemplateDestroy) {
                        this._fn_OnTemplateDestroy(this._template);
                    }
                    this._$template.remove();
                    this._template.destroy();
                    this._$template = null;
                    this._template = null;
                };
                DataEditDialog.prototype._getButtons = function () {
                    var self = this, buttons = [
                        {
                            'id': self._objId + 'Refresh',
                            'text': RIAPP.localizable.TEXT.txtRefresh,
                            'class': 'btn btn-info',
                            'click': function () {
                                self._onRefresh();
                            }
                        },
                        {
                            'id': self._objId + 'Ok',
                            'text': RIAPP.localizable.TEXT.txtOk,
                            'class': 'btn btn-info',
                            'click': function () {
                                self._onOk();
                            }
                        },
                        {
                            'id': self._objId + 'Cancel',
                            'text': RIAPP.localizable.TEXT.txtCancel,
                            'class': 'btn btn-info',
                            'click': function () {
                                self._onCancel();
                            }
                        }
                    ];
                    if (!this.canRefresh) {
                        buttons.shift();
                    }
                    if (!this.canCancel) {
                        buttons.pop();
                    }
                    return buttons;
                };
                DataEditDialog.prototype._getOkButton = function () {
                    return $("#" + this._objId + 'Ok');
                };
                DataEditDialog.prototype._getCancelButton = function () {
                    return $("#" + this._objId + 'Cancel');
                };
                DataEditDialog.prototype._getRefreshButton = function () {
                    return $("#" + this._objId + 'Refresh');
                };
                DataEditDialog.prototype._getAllButtons = function () {
                    return [this._getOkButton(), this._getCancelButton(), this._getRefreshButton()];
                };
                DataEditDialog.prototype._disableButtons = function (isDisable) {
                    var btns = this._getAllButtons();
                    btns.forEach(function ($btn) {
                        $btn.prop("disabled", !!isDisable);
                    });
                };
                DataEditDialog.prototype._onOk = function () {
                    var self = this, canCommit, action = datadialog.DIALOG_ACTION.Default;
                    if (!!this._fn_OnOK) {
                        action = this._fn_OnOK(this);
                    }
                    if (action == datadialog.DIALOG_ACTION.StayOpen)
                        return;

                    if (!this._dataContext) {
                        self.hide();
                        return;
                    }

                    if (this._isEditable)
                        canCommit = this._dataContext.endEdit(); else
                        canCommit = true;

                    if (canCommit) {
                        if (this._submitOnOK) {
                            this._disableButtons(true);
                            var title = this.title;
                            this.title = RIAPP.localizable.TEXT.txtSubmitting;
                            var promise = this._fn_submitOnOK();
                            promise.always(function () {
                                self._disableButtons(false);
                                self.title = title;
                            });
                            promise.done(function () {
                                self._result = 'ok';
                                self.hide();
                            });
                            promise.fail(function () {
                                if (self._isEditable)
                                    self._dataContext.beginEdit();
                            });
                        } else {
                            self._result = 'ok';
                            self.hide();
                        }
                    }
                };
                DataEditDialog.prototype._onCancel = function () {
                    var action = datadialog.DIALOG_ACTION.Default;
                    if (!!this._fn_OnCancel) {
                        action = this._fn_OnCancel(this);
                    }
                    if (action == datadialog.DIALOG_ACTION.StayOpen)
                        return;

                    this._result = 'cancel';
                    this.hide();
                };
                DataEditDialog.prototype._onRefresh = function () {
                    var args = { isHandled: false };
                    this.raiseEvent('refresh', args);
                    if (args.isHandled)
                        return;
                    if (!!this._dataContext && utils.check.isFunction(this._dataContext.refresh)) {
                        this._dataContext.refresh();
                    }
                };
                DataEditDialog.prototype._onClose = function () {
                    try  {
                        if (this._result != 'ok' && !!this._dataContext) {
                            if (this._isEditable)
                                this._dataContext.cancelEdit();
                            if (this._submitOnOK && utils.check.isFunction(this._dataContext.rejectChanges)) {
                                this._dataContext.rejectChanges();
                            }
                        }
                        if (!!this._fn_OnClose)
                            this._fn_OnClose(this);
                        this.raiseEvent('close', {});
                    } finally {
                        this._template.isDisabled = true;
                    }
                    var csel = this._currentSelectable;
                    this._currentSelectable = null;
                    setTimeout(function () {
                        RIAPP.global.currentSelectable = csel;
                        csel = null;
                    }, 50);
                };
                DataEditDialog.prototype._onShow = function () {
                    this._currentSelectable = RIAPP.global.currentSelectable;
                    if (!!this._fn_OnShow) {
                        this._fn_OnShow(this);
                    }
                };
                DataEditDialog.prototype.show = function () {
                    this._result = null;
                    (this._$template).dialog("option", "buttons", this._getButtons());
                    this._template.isDisabled = false;
                    this._onShow();
                    (this._$template).dialog("open");
                };
                DataEditDialog.prototype.hide = function () {
                    (this._$template).dialog("close");
                };
                DataEditDialog.prototype.getOption = function (name) {
                    return (this._$template).dialog('option', name);
                };
                DataEditDialog.prototype.setOption = function (name, value) {
                    (this._$template).dialog('option', name, value);
                };
                DataEditDialog.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (this._dialogCreated) {
                        this.hide();
                        this._destroyTemplate();
                        this._dialogCreated = false;
                    }
                    this._dataContext = null;
                    this._fn_submitOnOK = null;
                    this._app = null;
                    _super.prototype.destroy.call(this);
                };
                Object.defineProperty(DataEditDialog.prototype, "dataContext", {
                    get: function () {
                        return this._dataContext;
                    },
                    set: function (v) {
                        if (v !== this._dataContext) {
                            this._dataContext = v;
                            if (!!this._template)
                                this._template.dataContext = this._dataContext;
                            this._updateIsEditable();
                            this.raisePropertyChanged('dataContext');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataEditDialog.prototype, "result", {
                    get: function () {
                        return this._result;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataEditDialog.prototype, "template", {
                    get: function () {
                        return this._template;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataEditDialog.prototype, "isSubmitOnOK", {
                    get: function () {
                        return this._submitOnOK;
                    },
                    set: function (v) {
                        if (this._submitOnOK !== v) {
                            this._submitOnOK = v;
                            this.raisePropertyChanged('isSubmitOnOK');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataEditDialog.prototype, "width", {
                    get: function () {
                        return this.getOption('width');
                    },
                    set: function (v) {
                        var x = this.getOption('width');
                        if (v !== x) {
                            this.setOption('width', v);
                            this.raisePropertyChanged('width');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataEditDialog.prototype, "height", {
                    get: function () {
                        return this.getOption('height');
                    },
                    set: function (v) {
                        var x = this.getOption('height');
                        if (v !== x) {
                            this.setOption('height', v);
                            this.raisePropertyChanged('height');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataEditDialog.prototype, "title", {
                    get: function () {
                        return this.getOption('title');
                    },
                    set: function (v) {
                        var x = this.getOption('title');
                        if (v !== x) {
                            this.setOption('title', v);
                            this.raisePropertyChanged('title');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataEditDialog.prototype, "canRefresh", {
                    get: function () {
                        return this._canRefresh;
                    },
                    set: function (v) {
                        var x = this._canRefresh;
                        if (v !== x) {
                            this._canRefresh = v;
                            this.raisePropertyChanged('canRefresh');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataEditDialog.prototype, "canCancel", {
                    get: function () {
                        return this._canCancel;
                    },
                    set: function (v) {
                        var x = this._canCancel;
                        if (v !== x) {
                            this._canCancel = v;
                            this.raisePropertyChanged('canCancel');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return DataEditDialog;
            })(RIAPP.BaseObject);
            datadialog.DataEditDialog = DataEditDialog;

            RIAPP.global.onModuleLoaded('datadialog', datadialog);
        })(MOD.datadialog || (MOD.datadialog = {}));
        var datadialog = MOD.datadialog;
    })(RIAPP.MOD || (RIAPP.MOD = {}));
    var MOD = RIAPP.MOD;
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    (function (MOD) {
        (function (datagrid) {
            var utils = RIAPP.global.utils, consts = RIAPP.global.consts;
            var COLUMN_TYPE = { DATA: 'data', ROW_EXPANDER: 'row_expander', ROW_ACTIONS: 'row_actions', ROW_SELECTOR: 'row_selector' };
            datagrid.css = {
                container: 'ria-table-container',
                dataTable: 'ria-data-table',
                columnInfo: 'ria-col-info',
                column: 'ria-ex-column',
                cellDiv: 'cell-div',
                headerDiv: 'ria-table-header',
                wrapDiv: 'ria-table-wrap',
                dataColumn: 'data-column',
                rowCollapsed: 'row-collapsed',
                rowExpanded: 'row-expanded',
                rowExpander: 'row-expander',
                columnSelected: 'selected',
                rowSelected: 'selected',
                rowActions: 'row-actions',
                rowDetails: 'row-details',
                rowSelector: 'row-selector',
                rowHighlight: 'row-highlight',
                rowDeleted: 'row-deleted',
                rowError: 'row-error',
                nobr: 'ria-nobr',
                colSortable: 'sortable',
                colSortAsc: 'sort-asc',
                colSortDesc: 'sort-desc'
            };

            var RowSelectContent = (function (_super) {
                __extends(RowSelectContent, _super);
                function RowSelectContent() {
                    _super.apply(this, arguments);
                }
                RowSelectContent.prototype._canBeEdited = function () {
                    return true;
                };
                RowSelectContent.prototype.toString = function () {
                    return 'RowSelectContent';
                };
                return RowSelectContent;
            })(MOD.baseContent.BoolContent);
            datagrid.RowSelectContent = RowSelectContent;

            var BaseCell = (function (_super) {
                __extends(BaseCell, _super);
                function BaseCell(row, options) {
                    _super.call(this);
                    this._row = row;
                    this._el = options.td;
                    this._column = options.column;
                    this._div = RIAPP.global.document.createElement("div");
                    var $div = RIAPP.global.$(this._div);
                    this._clickTimeOut = null;
                    $div.addClass(datagrid.css.cellDiv).attr(consts.DATA_ATTR.DATA_EVENT_SCOPE, this._column.uniqueID);
                    $div.data('cell', this);
                    if (this._column.options.width) {
                        this._el.style.width = this._column.options.width;
                    }
                    this._init();
                    if (this.column.options.rowCellCss) {
                        $div.addClass(this.column.options.rowCellCss);
                    }
                    this._el.appendChild(this._div);
                    this._row.el.appendChild(this._el);
                }
                BaseCell.prototype._init = function () {
                };
                BaseCell.prototype._onCellClicked = function () {
                    this.grid.currentRow = this._row;
                };
                BaseCell.prototype._onDblClicked = function () {
                    this.grid.currentRow = this._row;
                    this.grid._onCellDblClicked(this);
                };
                BaseCell.prototype._onError = function (error, source) {
                    var isHandled = _super.prototype._onError.call(this, error, source);
                    if (!isHandled) {
                        return this.row._onError(error, source);
                    }
                    return isHandled;
                };
                BaseCell.prototype.scrollIntoView = function (isUp) {
                    var div = this._div;
                    div.scrollIntoView(!!isUp);
                };
                BaseCell.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._clickTimeOut) {
                        clearTimeout(this._clickTimeOut);
                        this._clickTimeOut = null;
                    }
                    var $div = RIAPP.global.$(this._div);
                    $div.removeData();
                    $div.remove();
                    this._div = null;
                    this._row = null;
                    this._el = null;
                    this._column = null;
                    _super.prototype.destroy.call(this);
                };
                BaseCell.prototype.toString = function () {
                    return 'BaseCell';
                };
                Object.defineProperty(BaseCell.prototype, "el", {
                    get: function () {
                        return this._el;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseCell.prototype, "row", {
                    get: function () {
                        return this._row;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseCell.prototype, "column", {
                    get: function () {
                        return this._column;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseCell.prototype, "grid", {
                    get: function () {
                        return this._row.grid;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseCell.prototype, "item", {
                    get: function () {
                        return this._row.item;
                    },
                    enumerable: true,
                    configurable: true
                });
                return BaseCell;
            })(RIAPP.BaseObject);
            datagrid.BaseCell = BaseCell;

            var DataCell = (function (_super) {
                __extends(DataCell, _super);
                function DataCell(row, options) {
                    this._content = null;
                    this._stateCss = null;
                    _super.call(this, row, options);
                }
                DataCell.prototype._init = function () {
                    var options = this.column.options.content;
                    if (!options.fieldInfo && !!options.fieldName) {
                        options.fieldInfo = this.item.getFieldInfo(options.fieldName);
                        if (!options.fieldInfo) {
                            throw new Error(utils.format(RIAPP.ERRS.ERR_DBSET_INVALID_FIELDNAME, '', options.fieldName));
                        }
                    }
                    var app = this.grid.app;
                    options.initContentFn = null;
                    try  {
                        var contentType = app._getContentType(options);
                        if (app.contentFactory.isExternallyCachable(contentType)) {
                            options.initContentFn = this._getInitContentFn();
                        }
                        this._content = app._getContent(contentType, options, this._div, this.item, this.item.isEditing);
                    } finally {
                        delete options.initContentFn;
                    }
                };
                DataCell.prototype._getInitContentFn = function () {
                    var self = this;
                    return function (content) {
                        content.addOnObjectCreated(function (sender, args) {
                            self.column._cacheObject(args.objectKey, args.object);
                            args.isCachedExternally = !!self.column._getCachedObject(args.objectKey);
                        });
                        content.addOnObjectNeeded(function (sender, args) {
                            args.object = self.column._getCachedObject(args.objectKey);
                        });
                    };
                };
                DataCell.prototype._beginEdit = function () {
                    if (!this._content.isEditing) {
                        this._content.isEditing = true;
                    }
                };
                DataCell.prototype._endEdit = function (isCanceled) {
                    if (this._content.isEditing) {
                        this._content.isEditing = false;
                    }
                };
                DataCell.prototype._setState = function (css) {
                    var $div;
                    if (this._stateCss !== css) {
                        $div = RIAPP.global.$(this._div);
                        if (!!this._stateCss)
                            $div.removeClass(this._stateCss);
                        this._stateCss = css;
                        if (!!this._stateCss)
                            $div.addClass(this._stateCss);
                    }
                };
                DataCell.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._content) {
                        this._content.destroy();
                        this._content = null;
                    }
                    _super.prototype.destroy.call(this);
                };
                DataCell.prototype.toString = function () {
                    return 'DataCell';
                };
                Object.defineProperty(DataCell.prototype, "column", {
                    get: function () {
                        return this._column;
                    },
                    enumerable: true,
                    configurable: true
                });
                return DataCell;
            })(BaseCell);
            datagrid.DataCell = DataCell;

            var ExpanderCell = (function (_super) {
                __extends(ExpanderCell, _super);
                function ExpanderCell() {
                    _super.apply(this, arguments);
                }
                ExpanderCell.prototype._init = function () {
                    var $el = RIAPP.global.$(this.el);
                    $el.addClass(datagrid.css.rowCollapsed);
                    $el.addClass(datagrid.css.rowExpander);
                };
                ExpanderCell.prototype._onCellClicked = function () {
                    if (!this._row)
                        return;
                    _super.prototype._onCellClicked.call(this);
                    this._row.isExpanded = !this._row.isExpanded;
                };
                ExpanderCell.prototype._toggleImage = function () {
                    var $el = RIAPP.global.$(this.el);
                    if (this._row.isExpanded) {
                        $el.removeClass(datagrid.css.rowCollapsed);
                        $el.addClass(datagrid.css.rowExpanded);
                    } else {
                        $el.removeClass(datagrid.css.rowExpanded);
                        $el.addClass(datagrid.css.rowCollapsed);
                    }
                };
                ExpanderCell.prototype.toString = function () {
                    return 'ExpanderCell';
                };
                return ExpanderCell;
            })(BaseCell);
            datagrid.ExpanderCell = ExpanderCell;

            var ActionsCell = (function (_super) {
                __extends(ActionsCell, _super);
                function ActionsCell(row, options) {
                    this._isEditing = false;
                    _super.call(this, row, options);
                }
                ActionsCell.prototype._init = function () {
                    var $el = RIAPP.global.$(this.el), $div = RIAPP.global.$(this._div);
                    $el.addClass([datagrid.css.rowActions, datagrid.css.cellDiv, datagrid.css.nobr].join(' '));
                    $div.on("mouseenter", "img", function (e) {
                        e.stopPropagation();
                        $(this).css("opacity", 0.5);
                    });
                    $div.on("mouseout", "img", function (e) {
                        e.stopPropagation();
                        $(this).css("opacity", 1.0);
                    });
                    this._createButtons(false);
                };
                ActionsCell.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    var $div = RIAPP.global.$(this._div), $imgs = $div.find('img');
                    $imgs.each(function (index, img) {
                        var $img = RIAPP.global.$(img);
                        $img.removeData();
                    });
                    _super.prototype.destroy.call(this);
                };
                ActionsCell.prototype._createButtons = function (editing) {
                    if (!this._el)
                        return;
                    var self = this, $ = RIAPP.global.$, $div = RIAPP.global.$(this._div), $newElems;
                    var txtMap = {
                        img_ok: 'txtOk',
                        img_cancel: 'txtCancel',
                        img_edit: 'txtEdit',
                        img_delete: 'txtDelete'
                    };
                    $div.empty();
                    var opts = self._column.options, fn_setUpImages = function ($images) {
                        $images.each(function (index, img) {
                            var $img = RIAPP.global.$(img);
                            img.style.cursor = 'pointer';
                            img.src = opts[img.name];
                            $img.data('cell', self);
                            utils.addToolTip($img, RIAPP.localizable.TEXT[txtMap[img.name]]);
                            $img.attr(consts.DATA_ATTR.DATA_EVENT_SCOPE, self._column.uniqueID);
                        });
                    };

                    if (editing) {
                        this._isEditing = true;
                        $newElems = RIAPP.global.$('<img name="img_ok" alt="ok"/>&nbsp;<img name="img_cancel" alt="cancel"/>');
                        fn_setUpImages($newElems.filter('img'));
                    } else {
                        this._isEditing = false;
                        $newElems = $('<img name="img_edit" alt="edit"/>&nbsp;<img name="img_delete" alt="delete"/>');
                        if (!self.isCanEdit) {
                            $newElems = $newElems.not('img[name="img_edit"]');
                        }
                        if (!self.isCanDelete) {
                            $newElems = $newElems.not('img[name="img_delete"]');
                        }
                        fn_setUpImages($newElems.filter('img'));
                    }
                    $div.append($newElems);
                };
                ActionsCell.prototype.update = function () {
                    if (!this._row)
                        return;
                    if (this._isEditing != this._row.isEditing) {
                        this._createButtons(this._row.isEditing);
                    }
                };
                ActionsCell.prototype.toString = function () {
                    return 'ActionsCell';
                };
                Object.defineProperty(ActionsCell.prototype, "isCanEdit", {
                    get: function () {
                        return this.grid.isCanEdit;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ActionsCell.prototype, "isCanDelete", {
                    get: function () {
                        return this.grid.isCanDelete;
                    },
                    enumerable: true,
                    configurable: true
                });
                return ActionsCell;
            })(BaseCell);
            datagrid.ActionsCell = ActionsCell;

            var RowSelectorCell = (function (_super) {
                __extends(RowSelectorCell, _super);
                function RowSelectorCell() {
                    _super.apply(this, arguments);
                }
                RowSelectorCell.prototype._init = function () {
                    var $el = RIAPP.global.$(this.el);
                    $el.addClass(datagrid.css.rowSelector);
                    var bindOpt = {
                        target: null,
                        source: null,
                        targetPath: null,
                        sourcePath: 'isSelected',
                        mode: 'TwoWay',
                        converter: null,
                        converterParam: null
                    }, op = { fieldName: 'isSelected', bindingInfo: bindOpt, displayInfo: null };
                    this._content = new RowSelectContent(this.grid.app, this._div, op, this.row, true);
                };
                RowSelectorCell.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;

                    if (!!this._content) {
                        this._content.destroy();
                        this._content = null;
                    }
                    _super.prototype.destroy.call(this);
                };
                RowSelectorCell.prototype.toString = function () {
                    return 'RowSelectorCell';
                };
                return RowSelectorCell;
            })(BaseCell);
            datagrid.RowSelectorCell = RowSelectorCell;

            var DetailsCell = (function (_super) {
                __extends(DetailsCell, _super);
                function DetailsCell(row, options) {
                    _super.call(this);
                    this._row = row;
                    this._el = options.td;
                    this._init(options);
                }
                DetailsCell.prototype._init = function (options) {
                    var details_id = options.details_id;
                    if (!details_id)
                        return;
                    this._template = new MOD.template.Template(this.grid.app, details_id);
                    this._el.colSpan = this.grid.columns.length;
                    this._el.appendChild(this._template.el);
                    this._row.el.appendChild(this._el);
                };
                DetailsCell.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._template) {
                        this._template.destroy();
                        this._template = null;
                    }
                    this._row = null;
                    this._el = null;
                    _super.prototype.destroy.call(this);
                };
                DetailsCell.prototype.toString = function () {
                    return 'DetailsCell';
                };
                Object.defineProperty(DetailsCell.prototype, "el", {
                    get: function () {
                        return this._el;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DetailsCell.prototype, "row", {
                    get: function () {
                        return this._row;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DetailsCell.prototype, "grid", {
                    get: function () {
                        return this._row.grid;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DetailsCell.prototype, "item", {
                    get: function () {
                        return this._template.dataContext;
                    },
                    set: function (v) {
                        this._template.dataContext = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                return DetailsCell;
            })(RIAPP.BaseObject);
            datagrid.DetailsCell = DetailsCell;

            var Row = (function (_super) {
                __extends(Row, _super);
                function Row(grid, options) {
                    var self = this;
                    _super.call(this);
                    this._grid = grid;
                    this._el = options.tr;
                    this._item = options.item;
                    this._cells = null;
                    this._objId = this._grid.uniqueID + '_' + this._item._key;
                    this._expanderCell = null;
                    this._actionsCell = null;
                    this._rowSelectorCell = null;
                    this._isCurrent = false;
                    this._isDeleted = false;
                    this._isSelected = false;
                    this._createCells();
                    this._item.addOnDestroyed(function (sender, args) {
                        self._onItemDestroyed();
                    }, self._objId);
                    this.isDeleted = this._item._isDeleted;
                    var fn_state = function () {
                        var css = self._grid._onRowStateChanged(self, self._item[self._grid._options.rowStateField]);
                        self._setState(css);
                    };
                    if (!!this._grid._options.rowStateField) {
                        this._item.addOnPropertyChange(this._grid._options.rowStateField, function (s, a) {
                            fn_state();
                        }, this._objId);
                        fn_state();
                    }
                }
                Row.prototype._onItemDestroyed = function () {
                    this.destroy();
                };
                Row.prototype._onError = function (error, source) {
                    var isHandled = _super.prototype._onError.call(this, error, source);
                    if (!isHandled) {
                        return this.grid._onError(error, source);
                    }
                    return isHandled;
                };
                Row.prototype._createCells = function () {
                    var self = this;
                    self._cells = new Array(this.columns.length);
                    var i = 0;
                    this.columns.forEach(function (col) {
                        var cell = self._createCell(col);
                        self._cells[i] = cell;
                        i += 1;
                    });
                };
                Row.prototype._createCell = function (col) {
                    var self = this, td = RIAPP.global.document.createElement('td'), cell;
                    if (col instanceof ExpanderColumn) {
                        cell = new ExpanderCell(self, { td: td, column: col });
                        this._expanderCell = cell;
                    } else if (col instanceof ActionsColumn) {
                        cell = new ActionsCell(self, { td: td, column: col });
                        this._actionsCell = cell;
                    } else if (col instanceof RowSelectorColumn) {
                        cell = new RowSelectorCell(self, { td: td, column: col });
                        this._rowSelectorCell = cell;
                    } else
                        cell = new DataCell(self, { td: td, column: col });
                    return cell;
                };
                Row.prototype._onBeginEdit = function () {
                    var self = this;
                    self._cells.forEach(function (cell) {
                        if (cell instanceof DataCell) {
                            (cell)._beginEdit();
                        }
                    });
                    if (!!this._actionsCell)
                        this._actionsCell.update();
                };
                Row.prototype._onEndEdit = function (isCanceled) {
                    var self = this;
                    self._cells.forEach(function (cell) {
                        if (cell instanceof DataCell) {
                            (cell)._endEdit(isCanceled);
                        }
                    });
                    if (!!this._actionsCell)
                        this._actionsCell.update();
                };
                Row.prototype.beginEdit = function () {
                    return this._item.beginEdit();
                };
                Row.prototype.endEdit = function () {
                    return this._item.endEdit();
                };
                Row.prototype.cancelEdit = function () {
                    return this._item.cancelEdit();
                };
                Row.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    var grid = this._grid;
                    if (!!grid) {
                        if (this.isExpanded)
                            grid.collapseDetails();
                        this._cells.forEach(function (cell) {
                            cell.destroy();
                        });
                        this._cells = null;
                        if (!grid._isClearing) {
                            grid._removeRow(this);
                            if (!!this._el) {
                                RIAPP.global.$(this._el).remove();
                            }
                        }
                    }
                    if (!!this._item)
                        this._item.removeNSHandlers(this._objId);
                    this._item = null;
                    this._expanderCell = null;
                    this._el = null;
                    this._grid = null;
                    _super.prototype.destroy.call(this);
                };
                Row.prototype.deleteRow = function () {
                    this._item.deleteItem();
                };
                Row.prototype.updateErrorState = function () {
                    var hasErrors = this._item.getIsHasErrors();
                    var $el = RIAPP.global.$(this._el);
                    if (hasErrors) {
                        $el.addClass(datagrid.css.rowError);
                    } else
                        $el.removeClass(datagrid.css.rowError);
                };
                Row.prototype.scrollIntoView = function (isUp) {
                    if (!!this._cells && this._cells.length > 0) {
                        this._cells[0].scrollIntoView(isUp);
                    }
                };
                Row.prototype._setState = function (css) {
                    this.cells.forEach(function (cell) {
                        if (cell instanceof DataCell) {
                            (cell)._setState(css);
                        }
                    });
                };
                Row.prototype.toString = function () {
                    return 'Row';
                };
                Object.defineProperty(Row.prototype, "el", {
                    get: function () {
                        return this._el;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Row.prototype, "grid", {
                    get: function () {
                        return this._grid;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Row.prototype, "item", {
                    get: function () {
                        return this._item;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Row.prototype, "cells", {
                    get: function () {
                        return this._cells;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Row.prototype, "columns", {
                    get: function () {
                        return this._grid.columns;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Row.prototype, "uniqueID", {
                    get: function () {
                        return this._objId;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Row.prototype, "itemKey", {
                    get: function () {
                        if (!this._item)
                            return null;
                        return this._item._key;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Row.prototype, "isCurrent", {
                    get: function () {
                        return this._isCurrent;
                    },
                    set: function (v) {
                        var curr = this._isCurrent;
                        if (v !== curr) {
                            var $el = RIAPP.global.$(this._el);
                            this._isCurrent = v;
                            if (v) {
                                $el.addClass(datagrid.css.rowHighlight);
                            } else {
                                $el.removeClass(datagrid.css.rowHighlight);
                            }
                            this.raisePropertyChanged('isCurrent');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Row.prototype, "isSelected", {
                    get: function () {
                        return this._isSelected;
                    },
                    set: function (v) {
                        if (this._isSelected != v) {
                            this._isSelected = v;
                            this.raisePropertyChanged('isSelected');
                            this.grid._onRowSelectionChanged(this);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Row.prototype, "isExpanded", {
                    get: function () {
                        return this.grid._expandedRow === this;
                    },
                    set: function (v) {
                        if (v !== this.isExpanded) {
                            if (!v && this.isExpanded) {
                                this.grid._expandDetails(this, false);
                            } else if (v) {
                                this.grid._expandDetails(this, true);
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Row.prototype, "expanderCell", {
                    get: function () {
                        return this._expanderCell;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Row.prototype, "actionsCell", {
                    get: function () {
                        return this._actionsCell;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Row.prototype, "isDeleted", {
                    get: function () {
                        if (!this._el)
                            return true;
                        return this._isDeleted;
                    },
                    set: function (v) {
                        if (!this._el)
                            return;
                        if (this._isDeleted !== v) {
                            this._isDeleted = v;
                            if (this._isDeleted) {
                                this.isExpanded = false;
                                RIAPP.global.$(this._el).addClass(datagrid.css.rowDeleted);
                            } else
                                RIAPP.global.$(this._el).removeClass(datagrid.css.rowDeleted);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Row.prototype, "isEditing", {
                    get: function () {
                        return !!this._item && this._item._isEditing;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Row;
            })(RIAPP.BaseObject);
            datagrid.Row = Row;

            var DetailsRow = (function (_super) {
                __extends(DetailsRow, _super);
                function DetailsRow(grid, options) {
                    _super.call(this);
                    this._grid = grid;
                    this._el = options.tr;
                    this._item = null;
                    this._cell = null;
                    this._parentRow = null;
                    this._objId = 'drow' + utils.getNewID();
                    this._createCell(options.details_id);
                    this._$el = RIAPP.global.$(this._el);
                    this._$el.addClass(datagrid.css.rowDetails);
                }
                DetailsRow.prototype._createCell = function (details_id) {
                    var td = RIAPP.global.document.createElement('td');
                    this._cell = new DetailsCell(this, { td: td, details_id: details_id });
                };
                DetailsRow.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._cell) {
                        this._cell.destroy();
                        this._cell = null;
                    }
                    this._$el.remove();
                    this._$el = null;
                    this._item = null;
                    this._el = null;
                    this._grid = null;
                    _super.prototype.destroy.call(this);
                };
                DetailsRow.prototype._setParentRow = function (row) {
                    var self = this;
                    this._item = null;
                    this._cell.item = null;

                    utils.removeNode(this._el);
                    if (!row || row._isDestroyCalled) {
                        this._parentRow = null;
                        return;
                    }
                    this._parentRow = row;
                    this._item = row.item;
                    this._cell.item = this._item;
                    utils.insertAfter(row.el, this._el);
                    var $cell = RIAPP.global.$(this._cell._template.el);

                    $cell.slideDown('fast', function () {
                        var row = self._parentRow;
                        if (!row || row._isDestroyCalled)
                            return;
                        if (self.grid._options.isUseScrollIntoDetails)
                            row.scrollIntoView(true);
                    });
                };
                DetailsRow.prototype.toString = function () {
                    return 'DetailsRow';
                };
                Object.defineProperty(DetailsRow.prototype, "el", {
                    get: function () {
                        return this._el;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DetailsRow.prototype, "$el", {
                    get: function () {
                        return this._$el;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DetailsRow.prototype, "grid", {
                    get: function () {
                        return this._grid;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DetailsRow.prototype, "item", {
                    get: function () {
                        return this._item;
                    },
                    set: function (v) {
                        if (this._item !== v) {
                            this._item = v;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DetailsRow.prototype, "cell", {
                    get: function () {
                        return this._cell;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DetailsRow.prototype, "uniqueID", {
                    get: function () {
                        return this._objId;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DetailsRow.prototype, "itemKey", {
                    get: function () {
                        if (!this._item)
                            return null;
                        return this._item._key;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DetailsRow.prototype, "parentRow", {
                    get: function () {
                        return this._parentRow;
                    },
                    set: function (v) {
                        var self = this;
                        if (v !== this._parentRow) {
                            var $cell = RIAPP.global.$(this._cell._template.el);
                            if (!!self._parentRow) {
                                $cell.slideUp('fast', function () {
                                    self._setParentRow(v);
                                });
                            } else {
                                self._setParentRow(v);
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return DetailsRow;
            })(RIAPP.BaseObject);
            datagrid.DetailsRow = DetailsRow;

            var BaseColumn = (function (_super) {
                __extends(BaseColumn, _super);
                function BaseColumn(grid, options) {
                    _super.call(this);
                    var self = this;
                    this._grid = grid;
                    this._el = options.th;
                    this._options = options.colinfo;
                    this._isSelected = false;
                    this._objId = 'col' + utils.getNewID();

                    var $extcol = RIAPP.global.$('<div></div>');
                    $extcol.addClass(datagrid.css.column);
                    this._grid._$headerDiv.append($extcol);
                    this._$extcol = $extcol;

                    var $div = RIAPP.global.$('<div></div>');
                    $div.addClass(datagrid.css.cellDiv).click(function (e) {
                        e.stopPropagation();
                        RIAPP.global.currentSelectable = grid;
                        grid._setCurrentColumn(self);
                        self._onColumnClicked();
                    });

                    $extcol.append($div);
                    $div.get(0).cell = this;
                    this._$div = $div;

                    RIAPP.global.$(this.grid._tableEl).on('click', ['div[', consts.DATA_ATTR.DATA_EVENT_SCOPE, '="', this.uniqueID, '"]'].join(''), function (e) {
                        e.stopPropagation();
                        var cell = RIAPP.global.$(this).data('cell');
                        if (!!cell) {
                            RIAPP.global.currentSelectable = grid;
                            grid._setCurrentColumn(self);
                            if (cell instanceof DataCell) {
                                if (!!cell._clickTimeOut) {
                                    clearTimeout(cell._clickTimeOut);
                                    cell._clickTimeOut = null;
                                    cell._onDblClicked();
                                } else {
                                    cell._onCellClicked();
                                    cell._clickTimeOut = setTimeout(function () {
                                        cell._clickTimeOut = null;
                                    }, 350);
                                }
                            } else {
                                cell._onCellClicked();
                            }
                        }
                    });

                    if (this._options.width) {
                        this._el.style.width = this._options.width;
                    }
                    this._init();

                    if (this._options.colCellCss) {
                        $div.addClass(this._options.colCellCss);
                    }
                }
                BaseColumn.prototype._init = function () {
                    if (!!this.title)
                        this._$div.html(this.title);
                };
                BaseColumn.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._$extcol.remove();
                    this._$extcol = null;
                    this._$div.get(0).cell = null;
                    this._$div = null;
                    this._el = null;
                    this._grid = null;
                    _super.prototype.destroy.call(this);
                };
                BaseColumn.prototype.scrollIntoView = function (isUp) {
                    if (!this._$div)
                        return;
                    var div = this._$div.get(0);
                    div.scrollIntoView(!!isUp);
                };
                BaseColumn.prototype._onColumnClicked = function () {
                };
                BaseColumn.prototype.toString = function () {
                    return 'BaseColumn';
                };
                Object.defineProperty(BaseColumn.prototype, "uniqueID", {
                    get: function () {
                        return this._objId;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseColumn.prototype, "el", {
                    get: function () {
                        return this._el;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseColumn.prototype, "$div", {
                    get: function () {
                        return this._$div;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseColumn.prototype, "$extcol", {
                    get: function () {
                        return this._$extcol;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseColumn.prototype, "grid", {
                    get: function () {
                        return this._grid;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseColumn.prototype, "options", {
                    get: function () {
                        return this._options;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseColumn.prototype, "title", {
                    get: function () {
                        return this._options.title;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseColumn.prototype, "isSelected", {
                    get: function () {
                        return this._isSelected;
                    },
                    set: function (v) {
                        if (this._isSelected !== v) {
                            this._isSelected = v;
                            if (this._isSelected) {
                                this._$div.addClass(datagrid.css.columnSelected);
                            } else
                                this._$div.removeClass(datagrid.css.columnSelected);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return BaseColumn;
            })(RIAPP.BaseObject);
            datagrid.BaseColumn = BaseColumn;

            var DataColumn = (function (_super) {
                __extends(DataColumn, _super);
                function DataColumn(grid, options) {
                    _super.call(this, grid, options);

                    this._objCache = {};
                    this.$div.addClass(datagrid.css.dataColumn);
                }
                DataColumn.prototype._init = function () {
                    _super.prototype._init.call(this);
                    this._sortOrder = null;
                    if (this.isSortable) {
                        this.$div.addClass(datagrid.css.colSortable);
                    }
                };
                DataColumn.prototype._onColumnClicked = function () {
                    if (this.isSortable && !!this.sortMemberName) {
                        var sortOrd = this._sortOrder;
                        this.grid._resetColumnsSort();

                        if (sortOrd == 'ASC') {
                            this.sortOrder = 'DESC';
                        } else if (sortOrd == 'DESC') {
                            this.sortOrder = 'ASC';
                        } else
                            this.sortOrder = 'ASC';
                        this.grid.sortByColumn(this);
                    }
                };
                DataColumn.prototype._cacheObject = function (key, obj) {
                    this._objCache[key] = obj;
                };
                DataColumn.prototype._getCachedObject = function (key) {
                    return this._objCache[key];
                };
                DataColumn.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    var self = this;
                    utils.forEachProp(self._objCache, function (key) {
                        self._objCache[key].destroy();
                    });
                    self._objCache = null;
                    _super.prototype.destroy.call(this);
                };
                DataColumn.prototype.toString = function () {
                    return 'DataColumn';
                };
                Object.defineProperty(DataColumn.prototype, "isSortable", {
                    get: function () {
                        return !!(this._options.sortable);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataColumn.prototype, "sortMemberName", {
                    get: function () {
                        return this._options.sortMemberName;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataColumn.prototype, "sortOrder", {
                    get: function () {
                        return this._sortOrder;
                    },
                    set: function (v) {
                        this.$div.removeClass([datagrid.css.colSortable, datagrid.css.colSortAsc, datagrid.css.colSortDesc].join(' '));
                        switch (v) {
                            case 'ASC':
                                this.$div.addClass(datagrid.css.colSortAsc);
                                break;
                            case 'DESC':
                                this.$div.addClass(datagrid.css.colSortDesc);
                                break;
                            default:
                                if (this.isSortable)
                                    this.$div.addClass(datagrid.css.colSortable);
                        }
                        this._sortOrder = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                return DataColumn;
            })(BaseColumn);
            datagrid.DataColumn = DataColumn;

            var ExpanderColumn = (function (_super) {
                __extends(ExpanderColumn, _super);
                function ExpanderColumn() {
                    _super.apply(this, arguments);
                }
                ExpanderColumn.prototype._init = function () {
                    _super.prototype._init.call(this);
                    this.$div.addClass(datagrid.css.rowExpander);
                };
                ExpanderColumn.prototype.toString = function () {
                    return 'ExpanderColumn';
                };
                return ExpanderColumn;
            })(BaseColumn);
            datagrid.ExpanderColumn = ExpanderColumn;

            var RowSelectorColumn = (function (_super) {
                __extends(RowSelectorColumn, _super);
                function RowSelectorColumn() {
                    _super.apply(this, arguments);
                }
                RowSelectorColumn.prototype._init = function () {
                    _super.prototype._init.call(this);
                    var self = this;
                    this._val = false;
                    this.$div.addClass(datagrid.css.rowSelector);
                    var $chk = RIAPP.global.$('<input type="checkbox"/>');
                    this.$div.append($chk);
                    this._$chk = $chk;
                    $chk.click(function (e) {
                        e.stopPropagation();
                        self._onCheckBoxClicked(this.checked);
                    });
                    $chk.on('change', function (e) {
                        e.stopPropagation();
                        self.checked = this.checked;
                    });
                };
                RowSelectorColumn.prototype._onCheckBoxClicked = function (isChecked) {
                    this.grid.selectRows(isChecked);
                };
                RowSelectorColumn.prototype.toString = function () {
                    return 'RowSelectorColumn';
                };
                Object.defineProperty(RowSelectorColumn.prototype, "checked", {
                    get: function () {
                        return this._val;
                    },
                    set: function (v) {
                        var $el = this._$chk;
                        if (v !== null)
                            v = !!v;
                        if (v !== this._val) {
                            this._val = v;
                            if (!!$el)
                                $el.prop('checked', !!this._val);
                            this.raisePropertyChanged('checked');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return RowSelectorColumn;
            })(BaseColumn);
            datagrid.RowSelectorColumn = RowSelectorColumn;

            var ActionsColumn = (function (_super) {
                __extends(ActionsColumn, _super);
                function ActionsColumn() {
                    _super.apply(this, arguments);
                }
                ActionsColumn.prototype._init = function () {
                    _super.prototype._init.call(this);
                    var self = this, opts = this.options;
                    this.$div.addClass(datagrid.css.rowActions);
                    opts.img_ok = RIAPP.global.getImagePath(opts.img_ok || 'ok.png');
                    opts.img_cancel = RIAPP.global.getImagePath(opts.img_cancel || 'cancel.png');
                    opts.img_edit = RIAPP.global.getImagePath(opts.img_edit || 'edit.png');
                    opts.img_delete = RIAPP.global.getImagePath(opts.img_delete || 'delete.png');
                    RIAPP.global.$(this.grid._tableEl).on("click", 'img[' + consts.DATA_ATTR.DATA_EVENT_SCOPE + '="' + this.uniqueID + '"]', function (e) {
                        e.stopPropagation();
                        var name = this.name, cell = RIAPP.global.$(this).data('cell');
                        switch (name) {
                            case 'img_ok':
                                self._onOk(cell);
                                break;
                            case 'img_cancel':
                                self._onCancel(cell);
                                break;
                            case 'img_edit':
                                self._onEdit(cell);
                                break;
                            case 'img_delete':
                                self._onDelete(cell);
                                break;
                        }
                    });
                };
                ActionsColumn.prototype._onOk = function (cell) {
                    if (!cell._row)
                        return;
                    cell._row.endEdit();
                    cell.update();
                };
                ActionsColumn.prototype._onCancel = function (cell) {
                    if (!cell._row)
                        return;
                    cell._row.cancelEdit();
                    cell.update();
                };
                ActionsColumn.prototype._onDelete = function (cell) {
                    if (!cell._row)
                        return;
                    cell._row.deleteRow();
                };
                ActionsColumn.prototype._onEdit = function (cell) {
                    if (!cell._row)
                        return;
                    cell._row.beginEdit();
                    cell.update();
                    this.grid.showEditDialog();
                };
                ActionsColumn.prototype.toString = function () {
                    return 'ActionsColumn';
                };
                return ActionsColumn;
            })(BaseColumn);
            datagrid.ActionsColumn = ActionsColumn;

            var DataGrid = (function (_super) {
                __extends(DataGrid, _super);
                function DataGrid(app, el, dataSource, options) {
                    _super.call(this);
                    if (!!dataSource && !(dataSource instanceof MOD.collection.Collection))
                        throw new Error(RIAPP.ERRS.ERR_GRID_DATASRC_INVALID);
                    this._options = utils.extend(false, {
                        isUseScrollInto: true,
                        isUseScrollIntoDetails: true,
                        containerCss: null,
                        wrapCss: null,
                        headerCss: null,
                        rowStateField: null,
                        isCanEdit: null,
                        isCanDelete: null,
                        isHandleAddNew: false
                    }, options);
                    this._app = app;
                    var $t = RIAPP.global.$(el);
                    this._tableEl = el;
                    this._$tableEl = $t;
                    $t.addClass(datagrid.css.dataTable);
                    this._name = $t.attr(consts.DATA_ATTR.DATA_NAME);
                    this._objId = 'grd' + utils.getNewID();
                    this._dataSource = dataSource;
                    this._rowMap = {};
                    this._rows = [];
                    this._columns = [];
                    this._isClearing = false;
                    this._isDSFilling = false;
                    this._currentRow = null;
                    this._expandedRow = null;
                    this._details = null;
                    this._expanderCol = null;
                    this._actionsCol = null;
                    this._rowSelectorCol = null;
                    this._currentColumn = null;
                    this._editingRow = null;
                    this._isSorting = false;
                    this._dialog = null;
                    this._chkWidthInterval = null;
                    this._$headerDiv = null;
                    this._$wrapDiv = null;
                    this._$contaner = null;
                    this._wrapTable();
                    this._createColumns();
                    this._bindDS();

                    this._refreshGrid();
                    this._updateColsDim();
                    this._onDSCurrentChanged();
                    RIAPP.global._trackSelectable(this);
                }
                DataGrid.prototype._getEventNames = function () {
                    var base_events = _super.prototype._getEventNames.call(this);
                    return [
                        'row_expanded',
                        'row_selected',
                        'page_changed',
                        'row_state_changed',
                        'cell_dblclicked'
                    ].concat(base_events);
                };
                DataGrid.prototype.addOnRowExpanded = function (fn, namespace) {
                    this.addHandler('row_expanded', fn, namespace);
                };
                DataGrid.prototype.removeOnRowExpanded = function (namespace) {
                    this.removeHandler('row_expanded', namespace);
                };
                DataGrid.prototype.addOnRowSelected = function (fn, namespace) {
                    this.addHandler('row_selected', fn, namespace);
                };
                DataGrid.prototype.removeOnRowSelected = function (namespace) {
                    this.removeHandler('row_selected', namespace);
                };
                DataGrid.prototype.addOnPageChanged = function (fn, namespace) {
                    this.addHandler('page_changed', fn, namespace);
                };
                DataGrid.prototype.removeOnPageChanged = function (namespace) {
                    this.removeHandler('page_changed', namespace);
                };
                DataGrid.prototype.addOnRowStateChanged = function (fn, namespace) {
                    this.addHandler('row_state_changed', fn, namespace);
                };
                DataGrid.prototype.removeOnRowStateChanged = function (namespace) {
                    this.removeHandler('row_state_changed', namespace);
                };
                DataGrid.prototype.addOnCellDblClicked = function (fn, namespace) {
                    this.addHandler('cell_dblclicked', fn, namespace);
                };
                DataGrid.prototype.removeOnCellDblClicked = function (namespace) {
                    this.removeHandler('cell_dblclicked', namespace);
                };

                DataGrid.prototype._setCurrentColumn = function (column) {
                    if (!!this._currentColumn)
                        this._currentColumn.isSelected = false;
                    this._currentColumn = column;
                    if (!!this._currentColumn)
                        this._currentColumn.isSelected = true;
                };
                DataGrid.prototype._parseColumnAttr = function (column_attr, content_attr) {
                    var defaultOp = {
                        type: COLUMN_TYPE.DATA,
                        title: null,
                        sortable: false,
                        sortMemberName: null,
                        content: null
                    }, options;

                    var temp_opts = RIAPP.global.parser.parseOptions(column_attr);
                    if (temp_opts.length > 0)
                        options = utils.extend(false, defaultOp, temp_opts[0]); else
                        options = defaultOp;

                    if (!!content_attr) {
                        options.content = MOD.baseContent.parseContentAttr(content_attr);
                        if (!options.sortMemberName && !!options.content.fieldName)
                            options.sortMemberName = options.content.fieldName;
                    }

                    return options;
                };
                DataGrid.prototype._findUndeleted = function (row, isUp) {
                    if (!row)
                        return null;
                    if (!row.isDeleted)
                        return row;

                    var delIndex = this.rows.indexOf(row), i = delIndex, len = this.rows.length;
                    if (!isUp) {
                        i -= 1;
                        if (i >= 0)
                            row = this.rows[i];
                        while (i >= 0 && row.isDeleted) {
                            i -= 1;
                            if (i >= 0)
                                row = this.rows[i];
                        }
                        if (row.isDeleted)
                            row = null;
                    } else {
                        i += 1;
                        if (i < len)
                            row = this.rows[i];
                        while (i < len && row.isDeleted) {
                            i += 1;
                            if (i < len)
                                row = this.rows[i];
                        }
                        if (row.isDeleted)
                            row = null;
                    }
                    return row;
                };
                DataGrid.prototype._updateCurrent = function (row, withScroll) {
                    this.currentRow = row;
                    if (withScroll && !!row && !row.isDeleted)
                        this._scrollToCurrent(true);
                };
                DataGrid.prototype._scrollToCurrent = function (isUp) {
                    var row = this.currentRow;
                    if (!!row) {
                        row.scrollIntoView(isUp);
                    }
                };
                DataGrid.prototype._onRowStateChanged = function (row, val) {
                    var args = { row: row, val: val, css: null };
                    this.raiseEvent('row_state_changed', args);
                    return args.css;
                };
                DataGrid.prototype._onCellDblClicked = function (cell) {
                    var args = { cell: cell };
                    this.raiseEvent('cell_dblclicked', args);
                };
                DataGrid.prototype._onError = function (error, source) {
                    var isHandled = _super.prototype._onError.call(this, error, source);
                    if (!isHandled) {
                        return RIAPP.global._onError(error, source);
                    }
                    return isHandled;
                };
                DataGrid.prototype._onDSCurrentChanged = function () {
                    var ds = this._dataSource, cur;
                    if (!!ds)
                        cur = ds.currentItem;
                    if (!cur)
                        this._updateCurrent(null, false); else {
                        this._updateCurrent(this._rowMap[cur._key], false);
                    }
                };
                DataGrid.prototype._onDSCollectionChanged = function (args) {
                    var self = this, row, CH_T = MOD.collection.consts.COLL_CHANGE_TYPE, items = args.items;
                    switch (args.change_type) {
                        case CH_T.RESET:
                            if (!this._isDSFilling)
                                this._refreshGrid();
                            break;
                        case CH_T.ADDED:
                            if (!this._isDSFilling)
                                self._appendItems(args.items);
                            break;
                        case CH_T.REMOVE:
                            items.forEach(function (item) {
                                var row = self._rowMap[item._key];
                                if (!!row) {
                                    self._removeRow(row);
                                }
                            });
                            break;
                        case CH_T.REMAP_KEY:
                             {
                                row = self._rowMap[args.old_key];
                                if (!!row) {
                                    delete self._rowMap[args.old_key];
                                    self._rowMap[args.new_key] = row;
                                }
                            }
                            break;
                        default:
                            throw new Error(utils.format(RIAPP.ERRS.ERR_COLLECTION_CHANGETYPE_INVALID, args.change_type));
                    }
                };
                DataGrid.prototype._onDSFill = function (args) {
                    var isEnd = !args.isBegin, self = this;
                    if (isEnd) {
                        self._isDSFilling = false;
                        if (args.resetUI)
                            self._refreshGrid(); else
                            self._appendItems(args.newItems);

                        if (!!args.isPageChanged) {
                            setTimeout(function () {
                                if (self._isDestroyCalled)
                                    return;
                                self._onPageChanged();
                            }, 100);
                        }
                        setTimeout(function () {
                            if (self._isDestroyCalled)
                                return;
                            self._updateColsDim();
                        }, 200);
                    } else {
                        self._isDSFilling = true;
                        if (!self._isSorting) {
                            if (!args.isPageChanged)
                                self._resetColumnsSort();
                        }
                    }
                };
                DataGrid.prototype._onPageChanged = function () {
                    if (!!this._rowSelectorCol) {
                        this._rowSelectorCol.checked = false;
                    }
                    this._scrollToCurrent(false);
                    this.raiseEvent('page_changed', {});
                };
                DataGrid.prototype._onItemEdit = function (item, isBegin, isCanceled) {
                    var row = this._rowMap[item._key];
                    if (!row)
                        return;
                    if (isBegin) {
                        row._onBeginEdit();
                        this._editingRow = row;
                    } else {
                        row._onEndEdit(isCanceled);
                        this._editingRow = null;
                    }
                    this.raisePropertyChanged('editingRow');
                };
                DataGrid.prototype._onItemAdded = function (args) {
                    var item = args.item, row = this._rowMap[item._key];
                    if (!row)
                        return;
                    this._updateCurrent(row, true);

                    if (this._options.isHandleAddNew && !args.isAddNewHandled) {
                        args.isAddNewHandled = this.showEditDialog();
                    }
                };
                DataGrid.prototype._onItemStatusChanged = function (item, oldChangeType) {
                    var DEL_STATUS = consts.CHANGE_TYPE.DELETED, newChangeType = item._changeType, ds = this._dataSource;
                    var row = this._rowMap[item._key];
                    if (!row)
                        return;
                    if (newChangeType === DEL_STATUS) {
                        row.isDeleted = true;
                        var row2 = this._findUndeleted(row, true);
                        if (!row2) {
                            row2 = this._findUndeleted(row, false);
                        }
                        if (!!row2) {
                            ds.currentItem = row2.item;
                        }
                    } else if (oldChangeType === DEL_STATUS && newChangeType !== DEL_STATUS) {
                        row.isDeleted = false;
                    }
                };
                DataGrid.prototype._onRowSelectionChanged = function (row) {
                    this.raiseEvent('row_selected', { row: row });
                };
                DataGrid.prototype._onDSErrorsChanged = function (item) {
                    var row = this._rowMap[item._key];
                    if (!row)
                        return;
                    row.updateErrorState();
                };
                DataGrid.prototype._resetColumnsSort = function () {
                    this.columns.forEach(function (col) {
                        if (col instanceof DataColumn) {
                            (col).sortOrder = null;
                        }
                    });
                };
                DataGrid.prototype._bindDS = function () {
                    var self = this, ds = this._dataSource;
                    if (!ds)
                        return;
                    ds.addHandler('coll_changed', function (sender, args) {
                        self._onDSCollectionChanged(args);
                    }, self._objId);
                    ds.addHandler('fill', function (sender, args) {
                        self._onDSFill(args);
                    }, self._objId);
                    ds.addOnPropertyChange('currentItem', function (sender, args) {
                        self._onDSCurrentChanged();
                    }, self._objId);
                    ds.addHandler('begin_edit', function (sender, args) {
                        self._onItemEdit(args.item, true, undefined);
                    }, self._objId);
                    ds.addHandler('end_edit', function (sender, args) {
                        self._onItemEdit(args.item, false, args.isCanceled);
                    }, self._objId);
                    ds.addHandler('errors_changed', function (sender, args) {
                        self._onDSErrorsChanged(args.item);
                    }, self._objId);
                    ds.addHandler('status_changed', function (sender, args) {
                        if (ds !== sender)
                            return;
                        self._onItemStatusChanged(args.item, args.oldChangeType);
                    }, self._objId);
                    ds.addHandler('item_added', function (sender, args) {
                        if (ds !== sender)
                            return;
                        self._onItemAdded(args);
                    }, self._objId);
                };
                DataGrid.prototype._unbindDS = function () {
                    var self = this, ds = this._dataSource;
                    if (!ds)
                        return;
                    ds.removeNSHandlers(self._objId);
                };
                DataGrid.prototype._getLastRow = function () {
                    if (this._rows.length === 0)
                        return null;
                    var i = this._rows.length - 1, row = this._rows[i];
                    while (row.isDeleted && i > 0) {
                        i -= 1;
                        row = this._rows[i];
                    }
                    if (row.isDeleted)
                        return null; else
                        return row;
                };
                DataGrid.prototype._removeRow = function (row) {
                    if (this._expandedRow === row) {
                        this.collapseDetails();
                    }
                    if (this._rows.length === 0)
                        return;
                    var rowkey = row.itemKey, i = utils.removeFromArray(this._rows, row), oldRow;
                    try  {
                        if (i > -1) {
                            oldRow = row;
                            if (!oldRow._isDestroyCalled)
                                oldRow.destroy();
                        }
                    } finally {
                        if (!!this._rowMap[rowkey])
                            delete this._rowMap[rowkey];
                    }
                };
                DataGrid.prototype._clearGrid = function () {
                    if (this._rows.length === 0)
                        return;
                    this._isClearing = true;
                    try  {
                        this.collapseDetails();
                        var self = this, tbody = self._tBodyEl, newTbody = RIAPP.global.document.createElement('tbody');
                        this._tableEl.replaceChild(newTbody, tbody);
                        var rows = this._rows;
                        this._rows = [];
                        this._rowMap = {};
                        rows.forEach(function (row) {
                            row.destroy();
                        });
                    } finally {
                        this._isClearing = false;
                    }
                    this._currentRow = null;
                };
                DataGrid.prototype._updateColsDim = function () {
                    var width = 0, headerDiv = this._$headerDiv;
                    this._columns.forEach(function (col) {
                        width += col.el.offsetWidth;
                    });
                    headerDiv.width(width);
                    this._columns.forEach(function (col) {
                        col.$extcol.width(col.el.offsetWidth);
                        var posArgs = {
                            my: "left top",
                            at: "left top",
                            of: headerDiv,
                            offset: "" + col.el.offsetLeft + " 0"
                        };
                        col.$extcol.position(posArgs);
                    });
                };
                DataGrid.prototype._wrapTable = function () {
                    var $t = this._$tableEl, headerDiv, wrapDiv, container, self = this;

                    $t.wrap(RIAPP.global.$('<div></div>').addClass(datagrid.css.wrapDiv));
                    wrapDiv = $t.parent();
                    wrapDiv.wrap(RIAPP.global.$('<div></div>').addClass(datagrid.css.container));
                    container = wrapDiv.parent();

                    headerDiv = RIAPP.global.$('<div></div>').addClass(datagrid.css.headerDiv).insertBefore(wrapDiv);
                    RIAPP.global.$(this._tHeadRow).addClass(datagrid.css.columnInfo);
                    this._$wrapDiv = wrapDiv;
                    this._$headerDiv = headerDiv;

                    this._$contaner = container;

                    if (this._options.containerCss) {
                        container.addClass(this._options.containerCss);
                    }

                    if (this._options.wrapCss) {
                        wrapDiv.addClass(this._options.wrapCss);
                    }
                    if (this._options.headerCss) {
                        headerDiv.addClass(this._options.headerCss);
                    }
                    var tw = { w: $t.width() };
                    this._chkWidthInterval = setInterval(function () {
                        var test = { w: $t.width() };
                        if (tw.w !== test.w) {
                            tw.w = test.w;
                            self._updateColsDim();
                        }
                    }, 1000);
                };
                DataGrid.prototype._unWrapTable = function () {
                    var $t = this._$tableEl;
                    if (!this._$headerDiv)
                        return;
                    clearInterval(this._chkWidthInterval);
                    this._chkWidthInterval = null;
                    this._$headerDiv.remove();
                    this._$headerDiv = null;

                    $t.unwrap();
                    this._$wrapDiv = null;

                    $t.unwrap();
                    this._$contaner = null;
                };
                DataGrid.prototype._createColumns = function () {
                    var self = this, headCells = this._tHeadCells, cnt = headCells.length, cellInfo = [];
                    var th, attr;
                    for (var i = 0; i < cnt; i += 1) {
                        th = headCells[i];
                        attr = this._parseColumnAttr(th.getAttribute(consts.DATA_ATTR.DATA_COLUMN), th.getAttribute(consts.DATA_ATTR.DATA_CONTENT));
                        cellInfo.push({ th: th, colinfo: attr });
                    }

                    cellInfo.forEach(function (inf) {
                        var col = self._createColumn(inf);
                        if (!!col)
                            self._columns.push(col);
                    });
                };
                DataGrid.prototype._createColumn = function (options) {
                    var col;
                    switch (options.colinfo.type) {
                        case COLUMN_TYPE.ROW_EXPANDER:
                            if (!this._expanderCol) {
                                col = new ExpanderColumn(this, options);
                                this._expanderCol = col;
                            }
                            break;
                        case COLUMN_TYPE.ROW_ACTIONS:
                            if (!this._actionsCol) {
                                col = new ActionsColumn(this, options);
                                this._actionsCol = col;
                            }
                            break;
                        case COLUMN_TYPE.ROW_SELECTOR:
                            if (!this._rowSelectorCol) {
                                col = new RowSelectorColumn(this, options);
                                this._rowSelectorCol = col;
                            }
                            break;
                        case COLUMN_TYPE.DATA:
                            col = new DataColumn(this, options);
                            break;
                        default:
                            throw new Error(utils.format(RIAPP.ERRS.ERR_GRID_COLTYPE_INVALID, options.colinfo.type));
                    }
                    return col;
                };
                DataGrid.prototype._appendItems = function (newItems) {
                    if (this._isDestroyCalled)
                        return;
                    var self = this, item, tbody = this._tBodyEl;
                    for (var i = 0, k = newItems.length; i < k; i += 1) {
                        item = newItems[i];
                        if (!self._rowMap[item._key])
                            self._createRowForItem(tbody, item);
                    }
                };
                DataGrid.prototype._onKeyDown = function (key, event) {
                    var ds = this._dataSource, Keys = consts.KEYS, self = this;
                    if (!ds)
                        return;
                    switch (key) {
                        case Keys.up:
                            event.preventDefault();
                            if (ds.movePrev(true)) {
                                if (self.isUseScrollInto) {
                                    self._scrollToCurrent(false);
                                }
                            }
                            break;
                        case Keys.down:
                            event.preventDefault();
                            if (ds.moveNext(true)) {
                                if (self.isUseScrollInto) {
                                    self._scrollToCurrent(false);
                                }
                            }
                            break;
                        case Keys.pageDown:
                            if (ds.pageIndex > 0)
                                ds.pageIndex = ds.pageIndex - 1;
                            break;
                        case Keys.pageUp:
                            ds.pageIndex = ds.pageIndex + 1;
                            break;
                        case Keys.enter:
                            if (!!this._currentRow && !!this._actionsCol) {
                                if (this._currentRow.isEditing) {
                                    event.preventDefault();
                                } else {
                                    event.preventDefault();
                                }
                            }
                            break;
                        case Keys.esc:
                            if (!!this._currentRow && !!this._actionsCol) {
                                if (this._currentRow.isEditing) {
                                    event.preventDefault();
                                }
                            }
                            break;
                        case Keys.space:
                            if (!!this._rowSelectorCol && !!this._currentRow && !this._currentRow.isEditing) {
                                event.preventDefault();
                            }
                            break;
                    }
                };
                DataGrid.prototype._onKeyUp = function (key, event) {
                    var ds = this._dataSource, Keys = consts.KEYS;
                    if (!ds)
                        return;
                    switch (key) {
                        case Keys.enter:
                            if (!!this._currentRow && !!this._actionsCol) {
                                if (this._currentRow.isEditing) {
                                    this._actionsCol._onOk(this._currentRow.actionsCell);
                                    event.preventDefault();
                                } else {
                                    this._actionsCol._onEdit(this._currentRow.actionsCell);
                                    event.preventDefault();
                                }
                            }
                            break;
                        case Keys.esc:
                            if (!!this._currentRow && !!this._actionsCol) {
                                if (this._currentRow.isEditing) {
                                    this._actionsCol._onCancel(this._currentRow.actionsCell);
                                    event.preventDefault();
                                }
                            }
                            break;
                        case Keys.space:
                            if (!!this._rowSelectorCol && !!this._currentRow && !this._currentRow.isEditing) {
                                event.preventDefault();
                                this._currentRow.isSelected = !this._currentRow.isSelected;
                            }
                            break;
                    }
                };

                DataGrid.prototype._refreshGrid = function () {
                    var self = this, ds = this._dataSource;
                    self._clearGrid();
                    if (!ds)
                        return;
                    var docFr = RIAPP.global.document.createDocumentFragment(), oldTbody = this._tBodyEl, newTbody = RIAPP.global.document.createElement('tbody');
                    ds.items.forEach(function (item, pos) {
                        self._createRowForItem(docFr, item, pos);
                    });
                    newTbody.appendChild(docFr);
                    self._tableEl.replaceChild(newTbody, oldTbody);
                };
                DataGrid.prototype._createRowForItem = function (parent, item, pos) {
                    var self = this, tr = RIAPP.global.document.createElement('tr');
                    var gridRow = new Row(self, { tr: tr, item: item });
                    self._rowMap[item._key] = gridRow;
                    self._rows.push(gridRow);
                    parent.appendChild(gridRow.el);
                    return gridRow;
                };
                DataGrid.prototype._createDetails = function () {
                    var details_id = this._options.details.templateID;
                    var tr = RIAPP.global.document.createElement('tr');
                    return new DetailsRow(this, { tr: tr, details_id: details_id });
                };
                DataGrid.prototype._expandDetails = function (parentRow, expanded) {
                    if (!this._options.details)
                        return;
                    if (!this._details) {
                        this._details = this._createDetails();
                    }
                    var old = this._expandedRow;
                    if (old === parentRow) {
                        if (!!old && expanded)
                            return;
                    }
                    this._expandedRow = null;
                    this._details.parentRow = null;

                    if (expanded) {
                        this._expandedRow = parentRow;
                        this._details.parentRow = parentRow;
                        this._expandedRow.expanderCell._toggleImage();
                    } else {
                        this._expandedRow = null;
                        this._details.parentRow = null;
                        if (!!old) {
                            old.expanderCell._toggleImage();
                        }
                    }
                    if (old !== parentRow) {
                        if (!!old)
                            old.expanderCell._toggleImage();
                    }
                    this.raiseEvent('row_expanded', { old_expandedRow: old, expandedRow: parentRow, isExpanded: expanded });
                };
                DataGrid.prototype.sortByColumn = function (column) {
                    var self = this, ds = this._dataSource;
                    var sorts = column.sortMemberName.split(';');
                    self._isSorting = true;
                    var promise = ds.sort(sorts, column.sortOrder);
                    promise.always(function () {
                        self._isSorting = false;
                    });
                };
                DataGrid.prototype.selectRows = function (isSelect) {
                    this._rows.forEach(function (row) {
                        if (row.isDeleted)
                            return;
                        row.isSelected = isSelect;
                    });
                };
                DataGrid.prototype.findRowByItem = function (item) {
                    var row = this._rowMap[item._key];
                    if (!row)
                        return null;
                    return row;
                };
                DataGrid.prototype.collapseDetails = function () {
                    if (!this._details)
                        return;
                    var old = this._expandedRow;
                    if (!!old) {
                        this._expandedRow = null;
                        this._details._setParentRow(null);
                        this.raiseEvent('row_expanded', { old_expandedRow: old, expandedRow: null, isExpanded: false });
                    }
                };
                DataGrid.prototype.getSelectedRows = function () {
                    var res = [];
                    this._rows.forEach(function (row) {
                        if (row.isDeleted)
                            return;
                        if (row.isSelected) {
                            res.push(row);
                        }
                    });
                    return res;
                };
                DataGrid.prototype.showEditDialog = function () {
                    if (!this._options.editor || !this._options.editor.templateID || !this._editingRow)
                        return false;
                    var editorOptions, item = this._editingRow.item;
                    if (!item.isEditing)
                        item.beginEdit();
                    if (!this._dialog) {
                        editorOptions = utils.extend(false, {
                            dataContext: item
                        }, this._options.editor);
                        this._dialog = new MOD.datadialog.DataEditDialog(this.app, editorOptions);
                    } else
                        this._dialog.dataContext = item;
                    this._dialog.canRefresh = !!this.dataSource.permissions.canRefreshRow && !item._isNew;
                    this._dialog.show();
                    return true;
                };
                DataGrid.prototype.scrollToCurrent = function (isUp) {
                    this._scrollToCurrent(isUp);
                };
                DataGrid.prototype.addNew = function () {
                    var ds = this._dataSource;
                    try  {
                        ds.addNew();
                        this.showEditDialog();
                    } catch (ex) {
                        RIAPP.global.reThrow(ex, this._onError(ex, this));
                    }
                };
                DataGrid.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    RIAPP.global._untrackSelectable(this);
                    if (!!this._details) {
                        this._details.destroy();
                        this._details = null;
                    }
                    if (!!this._dialog) {
                        this._dialog.destroy();
                        this._dialog = null;
                    }
                    this._clearGrid();
                    this._unbindDS();
                    this._dataSource = null;
                    this._unWrapTable();
                    this._$tableEl.removeClass(datagrid.css.dataTable);
                    RIAPP.global.$(this._tHeadRow).removeClass(datagrid.css.columnInfo);
                    this._tableEl = null;
                    this._$tableEl = null;
                    this._app = null;
                    _super.prototype.destroy.call(this);
                };
                Object.defineProperty(DataGrid.prototype, "app", {
                    get: function () {
                        return this._app;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "$container", {
                    get: function () {
                        return this._$contaner;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "_tBodyEl", {
                    get: function () {
                        return this._tableEl.tBodies[0];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "_tHeadEl", {
                    get: function () {
                        return this._tableEl.tHead;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "_tFootEl", {
                    get: function () {
                        return this._tableEl.tFoot;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "_tHeadRow", {
                    get: function () {
                        if (!this._tHeadEl)
                            return null;
                        var trs = this._tHeadEl.rows;
                        if (trs.length === 0)
                            return null;
                        return trs[0];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "_tHeadCells", {
                    get: function () {
                        var row = this._tHeadRow;
                        if (!row)
                            return [];
                        return RIAPP.ArrayHelper.fromCollection(row.cells);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "containerEl", {
                    get: function () {
                        return this._$contaner.get(0);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "uniqueID", {
                    get: function () {
                        return this._objId;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "name", {
                    get: function () {
                        return this._name;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "dataSource", {
                    get: function () {
                        return this._dataSource;
                    },
                    set: function (v) {
                        if (v === this._dataSource)
                            return;
                        if (this._dataSource !== null) {
                            this._unbindDS();
                        }
                        this._clearGrid();
                        this._dataSource = v;
                        if (this._dataSource !== null)
                            this._bindDS();
                        this.raisePropertyChanged('dataSource');
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "rows", {
                    get: function () {
                        return this._rows;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "columns", {
                    get: function () {
                        return this._columns;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "currentRow", {
                    get: function () {
                        return this._currentRow;
                    },
                    set: function (row) {
                        var ds = this._dataSource, old = this._currentRow, isChanged = false;
                        if (!ds)
                            return;
                        if (old !== row) {
                            this._currentRow = row;
                            if (!!old) {
                                old.isCurrent = false;
                            }
                            if (!!row)
                                row.isCurrent = true;
                            isChanged = true;
                        }
                        if (!!row) {
                            if (row.item !== ds.currentItem)
                                ds.currentItem = row.item;
                        } else
                            ds.currentItem = null;
                        if (isChanged)
                            this.raisePropertyChanged('currentRow');
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "editingRow", {
                    get: function () {
                        return this._editingRow;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "isCanEdit", {
                    get: function () {
                        if (this._options.isCanEdit !== null)
                            return this._options.isCanEdit;
                        var ds = this._dataSource;
                        return !!ds && ds.permissions.canEditRow;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "isCanDelete", {
                    get: function () {
                        if (this._options.isCanDelete !== null)
                            return this._options.isCanDelete;
                        var ds = this._dataSource;
                        return !!ds && ds.permissions.canDeleteRow;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "isCanAddNew", {
                    get: function () {
                        var ds = this._dataSource;
                        return !!ds && ds.permissions.canAddRow;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "isUseScrollInto", {
                    get: function () {
                        return this._options.isUseScrollInto;
                    },
                    set: function (v) {
                        this._options.isUseScrollInto = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                return DataGrid;
            })(RIAPP.BaseObject);
            datagrid.DataGrid = DataGrid;

            var GridElView = (function (_super) {
                __extends(GridElView, _super);
                function GridElView() {
                    _super.apply(this, arguments);
                }
                GridElView.prototype._init = function (options) {
                    _super.prototype._init.call(this, options);
                    this._dataSource = null;
                    this._grid = null;
                    this._gridEventCommand = null;
                    this._options = options;
                };
                GridElView.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._dataSource) {
                        this.dataSource = null;
                    }
                    this._gridEventCommand = null;
                    _super.prototype.destroy.call(this);
                };
                GridElView.prototype._createGrid = function () {
                    this._grid = new DataGrid(this.app, this._el, this._dataSource, this._options);
                    this._bindGridEvents();
                };
                GridElView.prototype._bindGridEvents = function () {
                    if (!this._grid)
                        return;
                    var self = this;
                    this._grid.addOnRowExpanded(function (s, args) {
                        self.invokeGridEvent('row_expanded', args);
                    }, this.uniqueID);
                    this._grid.addOnRowSelected(function (s, args) {
                        self.invokeGridEvent('row_selected', args);
                    }, this.uniqueID);
                    this._grid.addOnPageChanged(function (s, args) {
                        self.invokeGridEvent('page_changed', args);
                    }, this.uniqueID);
                    this._grid.addOnCellDblClicked(function (s, args) {
                        self.invokeGridEvent('cell_dblclicked', args);
                    }, this.uniqueID);
                    this._grid.addOnRowStateChanged(function (s, args) {
                        self.invokeGridEvent('row_state_changed', args);
                    }, this.uniqueID);
                    this._grid.addOnDestroyed(function (s, args) {
                        self._grid = null;
                    }, this.uniqueID);
                };
                GridElView.prototype.invokeGridEvent = function (eventName, args) {
                    var self = this, data = { eventName: eventName, args: args };
                    if (!!self._gridEventCommand) {
                        self._gridEventCommand.execute(self, data);
                    }
                };
                GridElView.prototype.toString = function () {
                    return 'GridElView';
                };
                Object.defineProperty(GridElView.prototype, "dataSource", {
                    get: function () {
                        return this._dataSource;
                    },
                    set: function (v) {
                        var self = this;
                        if (this._dataSource !== v) {
                            this._dataSource = v;
                            if (!!this._grid && !this._grid._isDestroyCalled) {
                                this._grid.destroy();
                                this._grid = null;
                            }
                            if (!!this._dataSource) {
                                this._createGrid();
                            }
                            self.invokePropChanged('grid');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GridElView.prototype, "grid", {
                    get: function () {
                        return this._grid;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GridElView.prototype, "gridEventCommand", {
                    get: function () {
                        return this._gridEventCommand;
                    },
                    set: function (v) {
                        var old = this._gridEventCommand;
                        if (v !== old) {
                            if (!!this._gridEventCommand)
                                this.invokeGridEvent('command_disconnected', {});
                            this._gridEventCommand = v;
                            if (!!this._gridEventCommand)
                                this.invokeGridEvent('command_connected', {});
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return GridElView;
            })(MOD.baseElView.BaseElView);
            datagrid.GridElView = GridElView;

            RIAPP.global.registerElView('table', GridElView);
            RIAPP.global.registerElView('datagrid', GridElView);
            RIAPP.global.onModuleLoaded('datagrid', datagrid);
        })(MOD.datagrid || (MOD.datagrid = {}));
        var datagrid = MOD.datagrid;
    })(RIAPP.MOD || (RIAPP.MOD = {}));
    var MOD = RIAPP.MOD;
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    (function (MOD) {
        (function (pager) {
            var utils = RIAPP.global.utils, consts = RIAPP.global.consts;
            pager.css = {
                pager: 'ria-data-pager',
                info: 'pager-info',
                currentPage: 'pager-current-page',
                otherPage: 'pager-other-page'
            };
            var PAGER_TXT = RIAPP.localizable.PAGER;

            var Pager = (function (_super) {
                __extends(Pager, _super);
                function Pager(el, dataSource, options) {
                    _super.call(this);
                    this._el = el;
                    this._$el = RIAPP.global.$(this._el);
                    this._objId = 'pgr' + utils.getNewID();
                    if (!!dataSource && !(dataSource instanceof MOD.collection.Collection))
                        throw new Error(RIAPP.ERRS.ERR_PAGER_DATASRC_INVALID);
                    this._dataSource = dataSource;
                    this._showTip = utils.check.isNt(options.showTip) ? true : !!options.showTip;
                    this._showInfo = utils.check.isNt(options.showInfo) ? false : !!options.showInfo;
                    this._showFirstAndLast = utils.check.isNt(options.showFirstAndLast) ? true : !!options.showFirstAndLast;
                    this._showPreviousAndNext = utils.check.isNt(options.showPreviousAndNext) ? false : !!options.showPreviousAndNext;
                    this._showNumbers = utils.check.isNt(options.showNumbers) ? true : !!options.showNumbers;
                    this._rowsPerPage = 0;
                    this._rowCount = 0;
                    this._currentPage = 1;
                    this._useSlider = utils.check.isNt(options.useSlider) ? true : !!options.useSlider;
                    this._sliderSize = utils.check.isNt(options.sliderSize) ? 25 : options.sliderSize;
                    this._hideOnSinglePage = utils.check.isNt(options.hideOnSinglePage) ? true : !!options.hideOnSinglePage;
                    this._$el.addClass(pager.css.pager);
                    if (!!this._dataSource) {
                        this._bindDS();
                    }
                }
                Pager.prototype._createElement = function (tag) {
                    return RIAPP.global.$(RIAPP.global.document.createElement(tag));
                };
                Pager.prototype._render = function () {
                    var $el = this._$el, rowCount, currentPage, pageCount;
                    this._clearContent();

                    if (this.rowsPerPage <= 0) {
                        return;
                    }

                    rowCount = this.rowCount;
                    if (rowCount == 0) {
                        return;
                    }
                    currentPage = this.currentPage;
                    if (currentPage == 0) {
                        return;
                    }

                    pageCount = this.pageCount;

                    if (this.hideOnSinglePage && (pageCount == 1)) {
                        $el.hide();
                    } else {
                        $el.show();

                        if (this.showInfo) {
                            var $span = this._createElement('span');
                            var info = utils.format(PAGER_TXT.pageInfo, currentPage, pageCount);
                            $span.addClass(pager.css.info).text(info).appendTo($el);
                        }

                        if (this.showFirstAndLast && (currentPage != 1)) {
                            $el.append(this._createFirst());
                        }

                        if (this.showPreviousAndNext && (currentPage != 1)) {
                            $el.append(this._createPrevious());
                        }

                        if (this.showNumbers) {
                            var start = 1, end = pageCount, sliderSize = this.sliderSize, half, above, below;

                            if (this.useSlider && (sliderSize > 0)) {
                                half = Math.floor(((sliderSize - 1) / 2));
                                above = (currentPage + half) + ((sliderSize - 1) % 2);
                                below = (currentPage - half);

                                if (below < 1) {
                                    above += (1 - below);
                                    below = 1;
                                }

                                if (above > pageCount) {
                                    below -= (above - pageCount);

                                    if (below < 1) {
                                        below = 1;
                                    }

                                    above = pageCount;
                                }

                                start = below;
                                end = above;
                            }

                            for (var i = start; i <= end; i++) {
                                if (i === currentPage) {
                                    $el.append(this._createCurrent());
                                } else {
                                    $el.append(this._createOther(i));
                                }
                            }
                        }

                        if (this.showPreviousAndNext && (currentPage != pageCount)) {
                            $el.append(this._createNext());
                        }

                        if (this.showFirstAndLast && (currentPage != pageCount)) {
                            $el.append(this._createLast());
                        }
                    }
                };
                Pager.prototype._setDSPageIndex = function (page) {
                    this.dataSource.pageIndex = page - 1;
                };
                Pager.prototype._onPageSizeChanged = function (ds) {
                    this.rowsPerPage = ds.pageSize;
                };
                Pager.prototype._onPageIndexChanged = function (ds) {
                    this.currentPage = ds.pageIndex + 1;
                };
                Pager.prototype._onTotalCountChanged = function (ds) {
                    this.rowCount = ds.totalCount;
                };
                Pager.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._unbindDS();
                    this._clearContent();
                    this._$el.removeClass(pager.css.pager);
                    this._el = null;
                    this._$el = null;
                    _super.prototype.destroy.call(this);
                };
                Pager.prototype._bindDS = function () {
                    var self = this, ds = this._dataSource;
                    if (!ds)
                        return;

                    ds.addOnPropertyChange('pageIndex', function (sender, args) {
                        self._onPageIndexChanged(ds);
                    }, self._objId);
                    ds.addOnPropertyChange('pageSize', function (sender, args) {
                        self._onPageSizeChanged(ds);
                    }, self._objId);
                    ds.addOnPropertyChange('totalCount', function (sender, args) {
                        self._onTotalCountChanged(ds);
                    }, self._objId);
                    this._currentPage = ds.pageIndex + 1;
                    this._rowsPerPage = ds.pageSize;
                    this._rowCount = ds.totalCount;
                    this._render();
                };
                Pager.prototype._unbindDS = function () {
                    var self = this, ds = this._dataSource;
                    if (!ds)
                        return;
                    ds.removeNSHandlers(self._objId);
                };
                Pager.prototype._clearContent = function () {
                    this._$el.empty();
                };
                Pager.prototype._createLink = function (page, text, tip) {
                    var a = this._createElement('a'), self = this;
                    a.text('' + text);
                    a.attr('href', 'javascript:void(0)');

                    if (!!tip) {
                        utils.addToolTip(a, tip);
                    }
                    a.click(function (e) {
                        e.preventDefault();
                        self._setDSPageIndex(page);
                        self.currentPage = page;
                    });

                    return a;
                };
                Pager.prototype._createFirst = function () {
                    var $span = this._createElement('span'), tip, a;

                    if (this.showTip) {
                        tip = PAGER_TXT.firstPageTip;
                    }
                    a = this._createLink(1, PAGER_TXT.firstText, tip);
                    $span.addClass(pager.css.otherPage).append(a);
                    return $span;
                };
                Pager.prototype._createPrevious = function () {
                    var span = this._createElement('span'), previousPage = this.currentPage - 1, tip, a;

                    if (this.showTip) {
                        tip = utils.format(PAGER_TXT.prevPageTip, previousPage);
                    }

                    a = this._createLink(previousPage, PAGER_TXT.previousText, tip);
                    span.addClass(pager.css.otherPage).append(a);
                    return span;
                };
                Pager.prototype._createCurrent = function () {
                    var span = this._createElement('span'), currentPage = this.currentPage;

                    span.text('' + currentPage);

                    if (this.showTip) {
                        utils.addToolTip(span, this._buildTip(currentPage));
                    }

                    span.addClass(pager.css.currentPage);
                    return span;
                };
                Pager.prototype._createOther = function (page) {
                    var span = this._createElement('span'), tip, a;

                    if (this.showTip) {
                        tip = this._buildTip(page);
                    }

                    a = this._createLink(page, '' + page, tip);
                    span.addClass(pager.css.otherPage);
                    span.append(a);
                    return span;
                };
                Pager.prototype._createNext = function () {
                    var span = this._createElement('span'), nextPage = this.currentPage + 1, tip, a;

                    if (this.showTip) {
                        tip = utils.format(PAGER_TXT.nextPageTip, nextPage);
                    }
                    a = this._createLink(nextPage, PAGER_TXT.nextText, tip);
                    span.addClass(pager.css.otherPage).append(a);
                    return span;
                };
                Pager.prototype._createLast = function () {
                    var span = this._createElement('span'), tip, a;

                    if (this.showTip) {
                        tip = PAGER_TXT.lastPageTip;
                    }
                    a = this._createLink(this.pageCount, PAGER_TXT.lastText, tip);
                    span.addClass(pager.css.otherPage).append(a);
                    return span;
                };
                Pager.prototype._buildTip = function (page) {
                    var rowsPerPage = this.rowsPerPage, rowCount = this.rowCount, start = (((page - 1) * rowsPerPage) + 1), end = (page == this.pageCount) ? rowCount : (page * rowsPerPage), tip = '';

                    if (page == this.currentPage) {
                        tip = utils.format(PAGER_TXT.showingTip, start, end, rowCount);
                    } else {
                        tip = utils.format(PAGER_TXT.showTip, start, end, rowCount);
                    }
                    return tip;
                };
                Pager.prototype.toString = function () {
                    return 'Pager';
                };
                Object.defineProperty(Pager.prototype, "el", {
                    get: function () {
                        return this._el;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pager.prototype, "dataSource", {
                    get: function () {
                        return this._dataSource;
                    },
                    set: function (v) {
                        if (v === this._dataSource)
                            return;
                        if (this._dataSource !== null) {
                            this._unbindDS();
                        }
                        this._dataSource = v;
                        if (this._dataSource !== null)
                            this._bindDS();
                        this.raisePropertyChanged('dataSource');
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pager.prototype, "pageCount", {
                    get: function () {
                        var rowCount = this.rowCount, rowsPerPage = this.rowsPerPage, result;

                        if ((rowCount === 0) || (rowsPerPage === 0)) {
                            return 0;
                        }

                        if ((rowCount % rowsPerPage) === 0) {
                            return (rowCount / rowsPerPage);
                        } else {
                            result = (rowCount / rowsPerPage);
                            result = Math.floor(result) + 1;
                            return result;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pager.prototype, "rowCount", {
                    get: function () {
                        return this._rowCount;
                    },
                    set: function (v) {
                        if (this._rowCount != v) {
                            this._rowCount = v;
                            this._render();
                            this.raisePropertyChanged('rowCount');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pager.prototype, "rowsPerPage", {
                    get: function () {
                        return this._rowsPerPage;
                    },
                    set: function (v) {
                        if (this._rowsPerPage != v) {
                            this._rowsPerPage = v;
                            this._render();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pager.prototype, "currentPage", {
                    get: function () {
                        return this._currentPage;
                    },
                    set: function (v) {
                        if (this._currentPage != v) {
                            this._currentPage = v;
                            this._render();
                            this.raisePropertyChanged('currentPage');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pager.prototype, "useSlider", {
                    get: function () {
                        return this._useSlider;
                    },
                    set: function (v) {
                        if (this._useSlider != v) {
                            this._useSlider = v;
                            this._render();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pager.prototype, "sliderSize", {
                    get: function () {
                        return this._sliderSize;
                    },
                    set: function (v) {
                        if (this._sliderSize != v) {
                            this._sliderSize = v;
                            this._render();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pager.prototype, "hideOnSinglePage", {
                    get: function () {
                        return this._hideOnSinglePage;
                    },
                    set: function (v) {
                        if (this._hideOnSinglePage != v) {
                            this._hideOnSinglePage = v;
                            this._render();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pager.prototype, "showTip", {
                    get: function () {
                        return this._showTip;
                    },
                    set: function (v) {
                        if (this._showTip !== v) {
                            this._showTip = v;
                            this._render();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pager.prototype, "showInfo", {
                    get: function () {
                        return this._showInfo;
                    },
                    set: function (v) {
                        if (this._showInfo !== v) {
                            this._showInfo = v;
                            this._render();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pager.prototype, "showFirstAndLast", {
                    get: function () {
                        return this._showFirstAndLast;
                    },
                    set: function (v) {
                        if (this._showFirstAndLast !== v) {
                            this._showFirstAndLast = v;
                            this._render();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pager.prototype, "showPreviousAndNext", {
                    get: function () {
                        return this._showPreviousAndNext;
                    },
                    set: function (v) {
                        if (this._showPreviousAndNext !== v) {
                            this._showPreviousAndNext = v;
                            this._render();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pager.prototype, "showNumbers", {
                    get: function () {
                        return this._showNumbers;
                    },
                    set: function (v) {
                        if (this._showNumbers !== v) {
                            this._showNumbers = v;
                            this._render();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return Pager;
            })(RIAPP.BaseObject);
            pager.Pager = Pager;

            var PagerElView = (function (_super) {
                __extends(PagerElView, _super);
                function PagerElView(app, el, options) {
                    this._dataSource = null;
                    this._pager = null;
                    this._options = options;
                    _super.call(this, app, el, options);
                }
                PagerElView.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._pager && !this._pager._isDestroyCalled) {
                        this._pager.destroy();
                    }
                    this._pager = null;
                    this._dataSource = null;
                    _super.prototype.destroy.call(this);
                };
                PagerElView.prototype.toString = function () {
                    return 'PagerElView';
                };
                Object.defineProperty(PagerElView.prototype, "dataSource", {
                    get: function () {
                        return this._dataSource;
                    },
                    set: function (v) {
                        var self = this;
                        if (this._dataSource !== v) {
                            this._dataSource = v;
                            if (!!this._pager)
                                this._pager.destroy();
                            this._pager = null;
                            if (!!this._dataSource && this._dataSource.isPagingEnabled) {
                                this._pager = new Pager(this._el, this._dataSource, this._options);
                                this._pager.addOnDestroyed(function () {
                                    self._pager = null;
                                });
                            }
                            self.invokePropChanged('pager');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PagerElView.prototype, "pager", {
                    get: function () {
                        return this._pager;
                    },
                    enumerable: true,
                    configurable: true
                });
                return PagerElView;
            })(MOD.baseElView.BaseElView);
            pager.PagerElView = PagerElView;

            RIAPP.global.registerElView('pager', PagerElView);
            RIAPP.global.onModuleLoaded('pager', pager);
        })(MOD.pager || (MOD.pager = {}));
        var pager = MOD.pager;
    })(RIAPP.MOD || (RIAPP.MOD = {}));
    var MOD = RIAPP.MOD;
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    (function (MOD) {
        (function (stackpanel) {
            var utils = RIAPP.global.utils, consts = RIAPP.global.consts;
            stackpanel.css = {
                stackpanel: 'ria-stackpanel',
                item: 'stackpanel-item',
                currentItem: 'current-item'
            };

            var StackPanel = (function (_super) {
                __extends(StackPanel, _super);
                function StackPanel(app, el, dataSource, options) {
                    _super.call(this);
                    this._app = app;
                    this._el = el;
                    this._$el = RIAPP.global.$(this._el);
                    this._objId = 'pnl' + utils.getNewID();
                    if (!!dataSource && !(dataSource instanceof MOD.collection.Collection))
                        throw new Error(RIAPP.ERRS.ERR_STACKPNL_DATASRC_INVALID);
                    this._dataSource = dataSource;
                    this._isDSFilling = false;
                    this._orientation = options.orientation || 'horizontal';
                    this._templateID = options.templateID;
                    this._currentItem = null;
                    this._$el.addClass(stackpanel.css.stackpanel);
                    this._itemMap = {};
                    if (!this._templateID)
                        throw new Error(RIAPP.ERRS.ERR_STACKPNL_TEMPLATE_INVALID);
                    if (!!this._dataSource) {
                        this._bindDS();
                    }
                    RIAPP.global._trackSelectable(this);
                }
                StackPanel.prototype._getEventNames = function () {
                    var base_events = _super.prototype._getEventNames.call(this);
                    return ['item_clicked'].concat(base_events);
                };
                StackPanel.prototype.addOnItemClicked = function (fn, namespace) {
                    this.addHandler('item_clicked', fn, namespace);
                };
                StackPanel.prototype.removeOnItemClicked = function (namespace) {
                    this.removeHandler('item_clicked', namespace);
                };
                StackPanel.prototype._onKeyDown = function (key, event) {
                    var ds = this._dataSource, Keys = consts.KEYS, self = this;
                    if (!ds)
                        return;
                    if (this._orientation == 'horizontal') {
                        switch (key) {
                            case Keys.left:
                                event.preventDefault();
                                if (ds.movePrev(true)) {
                                    self.scrollIntoView(ds.currentItem);
                                }
                                break;
                            case Keys.right:
                                event.preventDefault();
                                if (ds.moveNext(true)) {
                                    self.scrollIntoView(ds.currentItem);
                                }
                                break;
                        }
                    } else {
                        switch (key) {
                            case Keys.up:
                                event.preventDefault();
                                if (ds.movePrev(true)) {
                                    self.scrollIntoView(ds.currentItem);
                                }
                                break;
                            case Keys.down:
                                event.preventDefault();
                                if (ds.moveNext(true)) {
                                    self.scrollIntoView(ds.currentItem);
                                }
                                break;
                        }
                    }
                };
                StackPanel.prototype._onKeyUp = function (key, event) {
                };
                StackPanel.prototype._updateCurrent = function (item, withScroll) {
                    var self = this, old = self._currentItem, obj;
                    if (old !== item) {
                        this._currentItem = item;
                        if (!!old) {
                            obj = self._itemMap[old._key];
                            if (!!obj) {
                                RIAPP.global.$(obj.div).removeClass(stackpanel.css.currentItem);
                            }
                        }
                        if (!!item) {
                            obj = self._itemMap[item._key];
                            if (!!obj) {
                                RIAPP.global.$(obj.div).addClass(stackpanel.css.currentItem);
                                if (withScroll)
                                    obj.div.scrollIntoView(false);
                            }
                        }
                        this.raisePropertyChanged('currentItem');
                    }
                };
                StackPanel.prototype._onDSCurrentChanged = function (args) {
                    var ds = this._dataSource, cur = ds.currentItem;
                    if (!cur)
                        this._updateCurrent(null, false); else {
                        this._updateCurrent(cur, true);
                    }
                };
                StackPanel.prototype._onDSCollectionChanged = function (args) {
                    var self = this, CH_T = MOD.collection.consts.COLL_CHANGE_TYPE, items = args.items;
                    switch (args.change_type) {
                        case CH_T.RESET:
                            if (!this._isDSFilling)
                                this._refresh();
                            break;
                        case CH_T.ADDED:
                            if (!this._isDSFilling)
                                self._appendItems(items);
                            break;
                        case CH_T.REMOVE:
                            items.forEach(function (item) {
                                self._removeItem(item);
                            });
                            break;
                        case CH_T.REMAP_KEY:
                             {
                                var obj = self._itemMap[args.old_key];
                                if (!!obj) {
                                    delete self._itemMap[args.old_key];
                                    self._itemMap[args.new_key] = obj;
                                    obj.div.setAttribute(consts.DATA_ATTR.DATA_ITEM_KEY, args.new_key);
                                }
                            }
                            break;
                        default:
                            throw new Error(utils.format(RIAPP.ERRS.ERR_COLLECTION_CHANGETYPE_INVALID, args.change_type));
                    }
                };
                StackPanel.prototype._onDSFill = function (args) {
                    var isEnd = !args.isBegin;
                    if (isEnd) {
                        this._isDSFilling = false;
                        if (args.resetUI)
                            this._refresh(); else
                            this._appendItems(args.newItems);
                    } else {
                        this._isDSFilling = true;
                    }
                };
                StackPanel.prototype._onItemStatusChanged = function (item, oldChangeType) {
                    var DEL_STATUS = consts.CHANGE_TYPE.DELETED, newChangeType = item._changeType;
                    var obj = this._itemMap[item._key];
                    if (!obj)
                        return;
                    if (newChangeType === DEL_STATUS) {
                        RIAPP.global.$(obj.div).hide();
                    } else if (oldChangeType === DEL_STATUS && newChangeType !== DEL_STATUS) {
                        RIAPP.global.$(obj.div).show();
                    }
                };
                StackPanel.prototype._createTemplate = function (dcxt) {
                    var t = new MOD.template.Template(this.app, this._templateID);
                    t.dataContext = dcxt;
                    return t;
                };
                StackPanel.prototype._appendItems = function (newItems) {
                    if (this._isDestroyCalled)
                        return;
                    var self = this;
                    newItems.forEach(function (item) {
                        if (!!self._itemMap[item._key])
                            return;
                        self._appendItem(item);
                    });
                };
                StackPanel.prototype._appendItem = function (item) {
                    if (!item._key)
                        return;
                    var self = this, $div = self._createElement('div'), div = $div.get(0), template = self._createTemplate(item);
                    $div.addClass(stackpanel.css.item);
                    $div.append(template.el);
                    if (this._orientation == 'horizontal') {
                        $div.css('display', 'inline-block');
                    }
                    self._$el.append($div);
                    $div.attr(consts.DATA_ATTR.DATA_ITEM_KEY, item._key);
                    $div.click(function (e) {
                        var key = this.getAttribute(consts.DATA_ATTR.DATA_ITEM_KEY);
                        var obj = self._itemMap[key];
                        if (!!obj)
                            self._onItemClicked(obj.div, obj.item);
                    });
                    self._itemMap[item._key] = { div: div, template: template, item: item };
                };
                StackPanel.prototype._bindDS = function () {
                    var self = this, ds = this._dataSource;
                    if (!ds)
                        return;
                    ds.addOnCollChanged(function (sender, args) {
                        if (ds !== sender)
                            return;
                        self._onDSCollectionChanged(args);
                    }, self._objId);
                    ds.addOnFill(function (sender, args) {
                        if (ds !== sender)
                            return;
                        self._onDSFill(args);
                    }, self._objId);
                    ds.addOnPropertyChange('currentItem', function (sender, args) {
                        if (ds !== sender)
                            return;
                        self._onDSCurrentChanged(args);
                    }, self._objId);
                    ds.addOnStatusChanged(function (sender, args) {
                        if (ds !== sender)
                            return;
                        self._onItemStatusChanged(args.item, args.oldChangeType);
                    }, self._objId);

                    this._refresh();
                };
                StackPanel.prototype._unbindDS = function () {
                    var self = this, ds = this._dataSource;
                    if (!ds)
                        return;
                    ds.removeNSHandlers(self._objId);
                };
                StackPanel.prototype._createElement = function (tag) {
                    return RIAPP.global.$(RIAPP.global.document.createElement(tag));
                };
                StackPanel.prototype._onItemClicked = function (div, item) {
                    this._updateCurrent(item, false);
                    this._dataSource.currentItem = item;
                    this.raiseEvent('item_clicked', { item: item });
                };
                StackPanel.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    RIAPP.global._untrackSelectable(this);
                    this._unbindDS();
                    this._clearContent();
                    this._$el.removeClass(stackpanel.css.stackpanel);
                    this._el = null;
                    this._$el = null;
                    this._currentItem = null;
                    this._itemMap = {};
                    this._app = null;
                    _super.prototype.destroy.call(this);
                };
                StackPanel.prototype._clearContent = function () {
                    var self = this;
                    self._$el.empty();
                    utils.forEachProp(self._itemMap, function (key) {
                        self._removeItemByKey(key);
                    });
                };
                StackPanel.prototype._removeItemByKey = function (key) {
                    var self = this, obj = self._itemMap[key];
                    if (!obj)
                        return;
                    delete self._itemMap[key];
                    obj.template.destroy();
                };
                StackPanel.prototype._removeItem = function (item) {
                    var self = this, key = item._key, obj = self._itemMap[key];
                    if (!obj)
                        return;
                    delete self._itemMap[key];
                    obj.template.destroy();
                    RIAPP.global.$(obj.div).remove();
                };
                StackPanel.prototype._refresh = function () {
                    var ds = this._dataSource, self = this;
                    this._clearContent();
                    if (!ds)
                        return;
                    ds.forEach(function (item) {
                        self._appendItem(item);
                    });
                };
                StackPanel.prototype.scrollIntoView = function (item) {
                    if (!item)
                        return;
                    var obj = this._itemMap[item._key];
                    if (!!obj) {
                        obj.div.scrollIntoView(false);
                    }
                };
                StackPanel.prototype.getDivElementByItem = function (item) {
                    var obj = this._itemMap[item._key];
                    if (!obj)
                        return null;
                    return obj.div;
                };
                StackPanel.prototype.toString = function () {
                    return 'StackPanel';
                };
                Object.defineProperty(StackPanel.prototype, "app", {
                    get: function () {
                        return this._app;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(StackPanel.prototype, "el", {
                    get: function () {
                        return this._el;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(StackPanel.prototype, "containerEl", {
                    get: function () {
                        return this._el;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(StackPanel.prototype, "uniqueID", {
                    get: function () {
                        return this._objId;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(StackPanel.prototype, "dataSource", {
                    get: function () {
                        return this._dataSource;
                    },
                    set: function (v) {
                        if (v === this._dataSource)
                            return;
                        if (this._dataSource !== null) {
                            this._unbindDS();
                        }
                        this._dataSource = v;
                        if (this._dataSource !== null)
                            this._bindDS();
                        this.raisePropertyChanged('dataSource');
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(StackPanel.prototype, "currentItem", {
                    get: function () {
                        return this._currentItem;
                    },
                    enumerable: true,
                    configurable: true
                });
                return StackPanel;
            })(RIAPP.BaseObject);
            stackpanel.StackPanel = StackPanel;

            var StackPanelElView = (function (_super) {
                __extends(StackPanelElView, _super);
                function StackPanelElView(app, el, options) {
                    this._dataSource = null;
                    this._panel = null;
                    this._options = options;
                    _super.call(this, app, el, options);
                }
                StackPanelElView.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._panel && !this._panel._isDestroyCalled) {
                        this._panel.destroy();
                    }
                    this._panel = null;
                    this._dataSource = null;
                    _super.prototype.destroy.call(this);
                };
                StackPanelElView.prototype.toString = function () {
                    return 'StackPanelElView';
                };
                Object.defineProperty(StackPanelElView.prototype, "dataSource", {
                    get: function () {
                        return this._dataSource;
                    },
                    set: function (v) {
                        var self = this;
                        if (this._dataSource !== v) {
                            this._dataSource = v;
                            if (!!this._panel)
                                this._panel.destroy();
                            this._panel = null;
                            if (!!this._dataSource) {
                                this._panel = new StackPanel(this.app, this._el, this._dataSource, this._options);
                                this._panel.addOnDestroyed(function () {
                                    self._panel = null;
                                });
                            }
                            self.invokePropChanged('panel');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(StackPanelElView.prototype, "panel", {
                    get: function () {
                        return this._panel;
                    },
                    enumerable: true,
                    configurable: true
                });
                return StackPanelElView;
            })(MOD.baseElView.BaseElView);
            stackpanel.StackPanelElView = StackPanelElView;

            RIAPP.global.registerElView('stackpanel', StackPanelElView);
            RIAPP.global.onModuleLoaded('stackpanel', stackpanel);
        })(MOD.stackpanel || (MOD.stackpanel = {}));
        var stackpanel = MOD.stackpanel;
    })(RIAPP.MOD || (RIAPP.MOD = {}));
    var MOD = RIAPP.MOD;
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    (function (MOD) {
        (function (dataform) {
            var utils = RIAPP.global.utils, consts = RIAPP.global.consts;
            dataform.css = {
                dataform: 'ria-dataform'
            };
            var ERRTEXT = RIAPP.localizable.VALIDATE;

            var DataForm = (function (_super) {
                __extends(DataForm, _super);
                function DataForm(app, el) {
                    _super.call(this);
                    var self = this, parent;
                    this._app = app;
                    this._el = el;
                    this._$el = RIAPP.global.$(this._el);
                    this._objId = 'frm' + utils.getNewID();
                    this._dataContext = null;
                    this._$el.addClass(dataform.css.dataform);
                    this._isEditing = false;
                    this._isDisabled = false;
                    this._content = [];
                    this._lfTime = null;
                    this._contentCreated = false;
                    this._supportEdit = false;
                    this._supportErrNotify = false;
                    this._parentDataForm = null;
                    this._errors = null;
                    parent = this._getParentDataForm(this._el);

                    if (!!parent) {
                        self._parentDataForm = app.getElementView(parent);
                        self._parentDataForm.addOnDestroyed(function (sender, args) {
                            if (!self._isDestroyCalled)
                                self.destroy();
                        }, self._objId);
                    }
                }
                Object.defineProperty(DataForm.prototype, "_DATA_CONTENT_SELECTOR", {
                    get: function () {
                        return '*[' + consts.DATA_ATTR.DATA_CONTENT + ']:not([' + consts.DATA_ATTR.DATA_COLUMN + '])';
                    },
                    enumerable: true,
                    configurable: true
                });

                DataForm.prototype._getBindings = function () {
                    if (!this._lfTime)
                        return [];
                    var arr = this._lfTime.getObjs(), res = [];
                    for (var i = 0, len = arr.length; i < len; i += 1) {
                        if (utils.check.isBinding(arr[i]))
                            res.push(arr[i]);
                    }
                    return res;
                };
                DataForm.prototype._getElViews = function () {
                    if (!this._lfTime)
                        return [];
                    var arr = this._lfTime.getObjs(), res = [];
                    for (var i = 0, len = arr.length; i < len; i += 1) {
                        if (utils.check.isElView(arr[i]))
                            res.push(arr[i]);
                    }
                    return res;
                };
                DataForm.prototype._updateIsDisabled = function () {
                    var i, len, bnd, vw, bindings = this._getBindings(), elViews = this._getElViews(), DataFormElView = this.app._getElViewType(consts.ELVIEW_NM.DATAFORM);
                    for (i = 0, len = bindings.length; i < len; i += 1) {
                        bnd = bindings[i];
                        bnd.isDisabled = this._isDisabled;
                    }
                    for (i = 0, len = elViews.length; i < len; i += 1) {
                        vw = elViews[i];
                        if ((vw instanceof DataFormElView) && !!(vw).form) {
                            (vw).form.isDisabled = this._isDisabled;
                        }
                    }
                };
                DataForm.prototype._updateContent = function () {
                    var dctx = this._dataContext, self = this;

                    if (this._contentCreated) {
                        this._content.forEach(function (content) {
                            content.dataContext = dctx;
                            content.isEditing = self.isEditing;
                        });

                        var bindings = this._getBindings();
                        bindings.forEach(function (binding) {
                            if (!binding.isSourceFixed)
                                binding.source = dctx;
                        });

                        return;
                    }

                    if (!dctx) {
                        return;
                    }
                    var supportsGetFieldInfo = utils.check.isFunction(dctx.getFieldInfo);

                    var elements = RIAPP.ArrayHelper.fromList(this._el.querySelectorAll(self._DATA_CONTENT_SELECTOR)), isEditing = this.isEditing;

                    elements.forEach(function (el) {
                        if (self._getParentDataForm(el) !== self._el)
                            return;
                        var attr = el.getAttribute(consts.DATA_ATTR.DATA_CONTENT), op = MOD.baseContent.parseContentAttr(attr);
                        if (!!op.fieldName && !op.fieldInfo) {
                            if (!supportsGetFieldInfo) {
                                throw new Error(RIAPP.ERRS.ERR_DCTX_HAS_NO_FIELDINFO);
                            }
                            op.fieldInfo = dctx.getFieldInfo(op.fieldName);
                            if (!op.fieldInfo) {
                                throw new Error(utils.format(RIAPP.ERRS.ERR_DBSET_INVALID_FIELDNAME, '', op.fieldName));
                            }
                        }

                        var contentType = self.app._getContentType(op);
                        var content = self.app._getContent(contentType, op, el, dctx, isEditing);
                        if (!!content) {
                            self._content.push(content);
                        }
                    });
                    this._lfTime = self.app._bindElements(this._el, dctx, true);
                    this._contentCreated = true;
                };

                DataForm.prototype._getParentDataForm = function (el) {
                    if (!el)
                        return null;
                    var parent = el.parentElement, document = RIAPP.global.document, attr, opts;
                    if (!!parent) {
                        if (parent === this._el)
                            return this._el;
                        attr = parent.getAttribute(consts.DATA_ATTR.DATA_VIEW);
                        if (!attr) {
                            return this._getParentDataForm(parent);
                        }
                        opts = RIAPP.global.parser.parseOptions(attr);
                        if (opts.length > 0 && opts[0].name == consts.ELVIEW_NM.DATAFORM) {
                            return parent;
                        } else
                            return this._getParentDataForm(parent);
                    }

                    return null;
                };
                DataForm.prototype._onDSErrorsChanged = function () {
                    var dataContext = this._dataContext;
                    this.validationErrors = dataContext.getAllErrors();
                };
                DataForm.prototype._bindDS = function () {
                    var dataContext = this._dataContext, self = this;
                    if (!dataContext)
                        return;
                    dataContext.addOnDestroyed(function (s, a) {
                        self.dataContext = null;
                    }, self._objId);

                    if (this._supportEdit) {
                        dataContext.addOnPropertyChange('isEditing', function (sender, args) {
                            self.isEditing = sender.isEditing;
                        }, self._objId);
                    }

                    if (this._supportErrNotify) {
                        (dataContext).addOnErrorsChanged(function (sender, args) {
                            self._onDSErrorsChanged();
                        }, self._objId);
                    }
                };
                DataForm.prototype._unbindDS = function () {
                    var dataContext = this._dataContext;
                    this.validationErrors = null;
                    if (!!dataContext && !dataContext._isDestroyCalled) {
                        dataContext.removeNSHandlers(this._objId);
                    }
                };
                DataForm.prototype._clearContent = function () {
                    this._content.forEach(function (content) {
                        content.destroy();
                    });
                    this._content = [];
                    if (!!this._lfTime) {
                        this._lfTime.destroy();
                        this._lfTime = null;
                    }
                    this._contentCreated = false;
                };
                DataForm.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._clearContent();
                    this._$el.removeClass(dataform.css.dataform);
                    this._el = null;
                    this._$el = null;
                    this._unbindDS();
                    var parentDataForm = this._parentDataForm;
                    this._parentDataForm = null;
                    if (!!parentDataForm && !parentDataForm._isDestroyCalled) {
                        parentDataForm.removeNSHandlers(this._objId);
                    }
                    this._dataContext = null;
                    this._contentCreated = false;
                    this._app = null;
                    _super.prototype.destroy.call(this);
                };
                DataForm.prototype.toString = function () {
                    return 'DataForm';
                };
                Object.defineProperty(DataForm.prototype, "app", {
                    get: function () {
                        return this._app;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataForm.prototype, "el", {
                    get: function () {
                        return this._el;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataForm.prototype, "dataContext", {
                    get: function () {
                        return this._dataContext;
                    },
                    set: function (v) {
                        var dataContext;
                        try  {
                            if (v === this._dataContext)
                                return;
                            if (!!v && !utils.check.isBaseObj(v)) {
                                throw new Error(RIAPP.ERRS.ERR_DATAFRM_DCTX_INVALID);
                            }
                            this._unbindDS();
                            this._supportEdit = false;
                            this._supportErrNotify = false;
                            this._dataContext = v;
                            dataContext = this._dataContext;

                            if (!!dataContext) {
                                this._supportEdit = utils.check.isEditable(dataContext);
                                this._supportErrNotify = MOD.binding._checkIsErrorNotification(dataContext);
                            }
                            this._bindDS();
                            this._updateContent();
                            this.raisePropertyChanged('dataContext');
                            if (!!dataContext) {
                                if (this._supportEdit && this._isEditing !== (dataContext).isEditing) {
                                    this.isEditing = (dataContext).isEditing;
                                }
                                if (this._supportErrNotify) {
                                    this._onDSErrorsChanged();
                                }
                            }
                        } catch (ex) {
                            RIAPP.global.reThrow(ex, this._onError(ex, this));
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataForm.prototype, "isEditing", {
                    get: function () {
                        return this._isEditing;
                    },
                    set: function (v) {
                        var dataContext = this._dataContext;
                        if (!dataContext)
                            return;
                        var isEditing = this._isEditing, editable;

                        if (!this._supportEdit && v !== isEditing) {
                            this._isEditing = v;
                            this._updateContent();
                            this.raisePropertyChanged('isEditing');
                            return;
                        }

                        if (this._supportEdit)
                            editable = dataContext;

                        if (v !== isEditing) {
                            try  {
                                if (v) {
                                    editable.beginEdit();
                                } else {
                                    editable.endEdit();
                                }
                            } catch (ex) {
                                RIAPP.global.reThrow(ex, this._onError(ex, dataContext));
                            }
                        }

                        if (this._supportEdit && editable.isEditing !== isEditing) {
                            this._isEditing = editable.isEditing;
                            this._updateContent();
                            this.raisePropertyChanged('isEditing');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataForm.prototype, "validationErrors", {
                    get: function () {
                        return this._errors;
                    },
                    set: function (v) {
                        if (v !== this._errors) {
                            this._errors = v;
                            this.raisePropertyChanged('validationErrors');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataForm.prototype, "isDisabled", {
                    get: function () {
                        return this._isDisabled;
                    },
                    set: function (v) {
                        if (this._isDisabled !== v) {
                            this._isDisabled = !!v;
                            this._updateIsDisabled();
                            this.raisePropertyChanged('isDisabled');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return DataForm;
            })(RIAPP.BaseObject);
            dataform.DataForm = DataForm;

            var DataFormElView = (function (_super) {
                __extends(DataFormElView, _super);
                function DataFormElView(app, el, options) {
                    this._dataContext = null;
                    this._form = null;
                    this._options = options;
                    _super.call(this, app, el, options);
                }
                DataFormElView.prototype._getErrorTipInfo = function (errors) {
                    var tip = ['<b>', ERRTEXT.errorInfo, '</b>', '<ul>'];
                    errors.forEach(function (info) {
                        var fieldName = info.fieldName, res = '';
                        if (!!fieldName) {
                            res = ERRTEXT.errorField + ' ' + fieldName;
                        }
                        info.errors.forEach(function (str) {
                            if (!!res)
                                res = res + ' -> ' + str; else
                                res = str;
                        });
                        tip.push('<li>' + res + '</li>');
                        res = '';
                    });
                    tip.push('</ul>');
                    return tip.join('');
                };
                DataFormElView.prototype._updateErrorUI = function (el, errors) {
                    if (!el) {
                        return;
                    }
                    var $el = this.$el;
                    if (!!errors && errors.length > 0) {
                        var $img, image_src = RIAPP.global.getImagePath('warning.png');
                        $img = RIAPP.global.$('<img name="error_info" alt="error_info" class="error-info" />');
                        $el.prepend($img);
                        $img.get(0).src = image_src;
                        utils.addToolTip($img, this._getErrorTipInfo(errors), MOD.baseElView.css.errorTip);
                        this._setFieldError(true);
                    } else {
                        $el.children('img[name="error_info"]').remove();
                        this._setFieldError(false);
                    }
                };
                DataFormElView.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._form && !this._form._isDestroyCalled) {
                        this._form.destroy();
                    }
                    this._form = null;
                    this._dataContext = null;
                    _super.prototype.destroy.call(this);
                };
                DataFormElView.prototype.toString = function () {
                    return 'DataFormElView';
                };
                Object.defineProperty(DataFormElView.prototype, "dataContext", {
                    get: function () {
                        return this._dataContext;
                    },
                    set: function (v) {
                        var self = this;
                        if (this._dataContext !== v) {
                            this._dataContext = v;
                            if (!this._form)
                                this._form = new DataForm(this.app, this._el);
                            this._form.dataContext = this._dataContext;
                            this._form.addOnDestroyed(function () {
                                self._form = null;
                            });
                            this._form.addOnPropertyChange('validationErrors', function (form, args) {
                                self.validationErrors = form.validationErrors;
                            }, this._objId);
                            self.invokePropChanged('form');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataFormElView.prototype, "form", {
                    get: function () {
                        return this._form;
                    },
                    enumerable: true,
                    configurable: true
                });
                return DataFormElView;
            })(MOD.baseElView.BaseElView);
            dataform.DataFormElView = DataFormElView;

            RIAPP.global.registerType('DataFormElView', DataFormElView);
            RIAPP.global.registerElView(consts.ELVIEW_NM.DATAFORM, DataFormElView);
            RIAPP.global.onModuleLoaded('dataform', dataform);
        })(MOD.dataform || (MOD.dataform = {}));
        var dataform = MOD.dataform;
    })(RIAPP.MOD || (RIAPP.MOD = {}));
    var MOD = RIAPP.MOD;
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    var Application = (function (_super) {
        __extends(Application, _super);
        function Application(options) {
            _super.call(this);
            var self = this, app_name = 'default', user_modules = [];
            if (!!options) {
                if (!!options.application_name)
                    app_name = options.application_name;
                if (!!options.user_modules)
                    user_modules = options.user_modules;
            }
            if (!!RIAPP.global.findApp(app_name))
                throw new Error(RIAPP.global.utils.format(RIAPP.ERRS.ERR_APP_NAME_NOT_UNIQUE, app_name));
            this._app_name = app_name;
            this._objId = 'app:' + RIAPP.global.utils.getNewID();
            this._options = options;

            this._objLifeTime = null;
            this._ELV_STORE_KEY = RIAPP.global.consts.DATA_ATTR.EL_VIEW_KEY + Application._newInstanceNum;
            Application._newInstanceNum += 1;
            this._contentFactory = null;
            this._contentFactories = [];
            this._objMaps = [];

            this._exports = {};

            this._modules = {};

            this._elViewStore = {};

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
                return ['*[', RIAPP.global.consts.DATA_ATTR.DATA_BIND, ']'].join('');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "_DATA_VIEW_SELECTOR", {
            get: function () {
                return ['*[', RIAPP.global.consts.DATA_ATTR.DATA_VIEW, ']'].join('');
            },
            enumerable: true,
            configurable: true
        });

        Application.prototype._cleanUpObjMaps = function () {
            var self = this;
            this._objMaps.forEach(function (objMap) {
                RIAPP.global.utils.forEachProp(objMap, function (name) {
                    var obj = objMap[name];
                    if (obj instanceof RIAPP.BaseObject) {
                        if (!(obj)._isDestroyed) {
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
                if (!!RIAPP.MOD[mod_name] && !!RIAPP.MOD[mod_name].initModule) {
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
            if (RIAPP.global._checkIsDummy(error)) {
                return true;
            }
            var isHandled = _super.prototype._onError.call(this, error, source);
            if (!isHandled) {
                return RIAPP.global._onError(error, source);
            }
            return isHandled;
        };

        Application.prototype._getElView = function (el) {
            var storeID = el.getAttribute(this._ELV_STORE_KEY);
            if (!!storeID) {
                return this._elViewStore[storeID];
            }
            return null;
        };

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
            var self = this, global = self.global, selector = self._DATA_BIND_SELECTOR + ', ' + self._DATA_VIEW_SELECTOR, selectedElem = RIAPP.ArrayHelper.fromList(templateEl.querySelectorAll(selector)), lftm = RIAPP.MOD.utils.LifeTimeScope.create();
            if (templateEl.hasAttribute(global.consts.DATA_ATTR.DATA_BIND) || templateEl.hasAttribute(global.consts.DATA_ATTR.DATA_VIEW)) {
                selectedElem.push(templateEl);
            }

            selectedElem.forEach(function (el) {
                var op, j, len, binding, bind_attr, temp_opts, elView, checks = self.global.utils.check;
                if (checks.isInsideDataForm(el))
                    return;

                elView = self.getElementView(el);
                lftm.addObj(elView);
                if (el.hasAttribute(global.consts.DATA_ATTR.DATA_VIEW)) {
                    el.removeAttribute(global.consts.DATA_ATTR.DATA_VIEW);
                    if (elView instanceof RIAPP.MOD.dataform.DataFormElView)
                        el.setAttribute(global.consts.DATA_ATTR.DATA_FORM, 'yes');
                }

                bind_attr = el.getAttribute(global.consts.DATA_ATTR.DATA_BIND);
                if (!!bind_attr) {
                    el.removeAttribute(global.consts.DATA_ATTR.DATA_BIND);
                    temp_opts = global.parser.parseOptions(bind_attr);
                    for (j = 0, len = temp_opts.length; j < len; j += 1) {
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

            var selectedElem = RIAPP.ArrayHelper.fromList(scope.querySelectorAll(self._DATA_BIND_SELECTOR + ', ' + self._DATA_VIEW_SELECTOR));
            var lftm = RIAPP.MOD.utils.LifeTimeScope.create();

            selectedElem.forEach(function (el) {
                var app_name, bind_attr, temp_opts, bind_op, elView;

                if (!isDataForm && global.utils.check.isInsideDataForm(el)) {
                    return;
                }

                if (!isDataForm) {
                    if (el.hasAttribute(global.consts.DATA_ATTR.DATA_APP)) {
                        app_name = el.getAttribute(global.consts.DATA_ATTR.DATA_APP);
                    }

                    if (!!app_name && self.appName !== app_name)
                        return;
                    if (!app_name && self.appName !== 'default')
                        return;
                }

                elView = self.getElementView(el);
                lftm.addObj(elView);

                bind_attr = el.getAttribute(global.consts.DATA_ATTR.DATA_BIND);

                if (!!bind_attr) {
                    temp_opts = global.parser.parseOptions(bind_attr);
                    for (var i = 0, len = temp_opts.length; i < len; i += 1) {
                        bind_op = RIAPP.MOD.baseContent.getBindingOptions(self, temp_opts[i], elView, dctx);
                        lftm.addObj(self.bind(bind_op));
                    }
                }
            });
            return lftm;
        };

        Application.prototype._getContent = function (contentType, options, parentEl, dctx, isEditing) {
            var content;
            return new contentType(this, parentEl, options, dctx, isEditing);
        };

        Application.prototype._getContentType = function (options) {
            return this.contentFactory.getContentType(options);
        };
        Application.prototype._destroyBindings = function () {
            if (!!this._objLifeTime) {
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
            if (!RIAPP.global._getObject(this, name2)) {
                RIAPP.global._registerObject(this, name2, type);
            } else
                throw new Error(RIAPP.global.utils.format(RIAPP.ERRS.ERR_OBJ_ALREADY_REGISTERED, name));
        };

        Application.prototype.getElementView = function (el) {
            var viewType, attr, data_view_op_arr, data_view_op, options, elView;

            elView = this._getElView(el);

            if (!!elView)
                return elView;

            if (el.hasAttribute(RIAPP.global.consts.DATA_ATTR.DATA_VIEW)) {
                attr = el.getAttribute(RIAPP.global.consts.DATA_ATTR.DATA_VIEW);
                data_view_op_arr = RIAPP.global.parser.parseOptions(attr);
                if (!!data_view_op_arr && data_view_op_arr.length > 0) {
                    data_view_op = data_view_op_arr[0];
                    if (!!data_view_op.name && data_view_op.name != 'default') {
                        viewType = this._getElViewType(data_view_op.name);
                        if (!viewType)
                            throw new Error(RIAPP.global.utils.format(RIAPP.ERRS.ERR_ELVIEW_NOT_REGISTERED, data_view_op.name));
                    }
                    if (!!data_view_op.options)
                        options = data_view_op.options;
                }
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
                    throw new Error(RIAPP.global.utils.format(RIAPP.ERRS.ERR_ELVIEW_NOT_CREATED, nodeNm));
            }

            elView = new viewType(this, el, options || {});
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
            if (!RIAPP.global._getObject(this, name2)) {
                RIAPP.global._registerObject(this, name2, obj);
            } else
                throw new Error(RIAPP.global.utils.format(RIAPP.ERRS.ERR_OBJ_ALREADY_REGISTERED, name));
        };
        Application.prototype.getConverter = function (name) {
            var name2 = 'converters.' + name;
            var res = RIAPP.global._getObject(this, name2);
            if (!res) {
                res = RIAPP.global._getObject(RIAPP.global, name2);
            }
            if (!res)
                throw new Error(RIAPP.global.utils.format(RIAPP.ERRS.ERR_CONVERTER_NOTREGISTERED, name));
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
        Application.prototype._getElViewType = function (name) {
            var name2 = 'elvws.' + name;
            var res = RIAPP.global._getObject(this, name2);
            if (!res) {
                res = RIAPP.global._getObject(RIAPP.global, name2);
            }
            return res;
        };

        Application.prototype.registerObject = function (name, obj) {
            var self = this, name2 = 'objects.' + name;
            if (obj instanceof RIAPP.BaseObject) {
                (obj).addOnDestroyed(function (s, a) {
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
        Application.prototype.onStartUp = function () {
        };

        Application.prototype.startUp = function (fn_sandbox) {
            var self = this, fn_init = function () {
                try  {
                    self.onStartUp();
                    if (!!fn_sandbox)
                        fn_sandbox.apply(self, [self]);
                    self._setUpBindings();
                } catch (ex) {
                    self._onError(ex, self);
                    RIAPP.global._throwDummy(ex);
                }
            };

            try  {
                if (!!fn_sandbox && !RIAPP.global.utils.check.isFunction(fn_sandbox))
                    throw new Error(RIAPP.ERRS.ERR_APP_SETUP_INVALID);
                RIAPP.global._waitForNotLoading(fn_init, null);
            } catch (ex) {
                RIAPP.global.reThrow(ex, self._onError(ex, self));
            }
        };

        Application.prototype.loadTemplates = function (url) {
            this.loadTemplatesAsync(function () {
                return RIAPP.global.utils.performAjaxGet(url);
            });
        };

        Application.prototype.loadTemplatesAsync = function (fn_loader) {
            RIAPP.global._loadTemplatesAsync(fn_loader, this);
        };

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
            var group2 = RIAPP.global.utils.extend(false, {
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

        Object.defineProperty(Application.prototype, "modules", {
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
            get: function () {
                return this._userCode;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Application.prototype, "VM", {
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
    ;

    RIAPP.global.registerType('Application', Application);
})(RIAPP || (RIAPP = {}));

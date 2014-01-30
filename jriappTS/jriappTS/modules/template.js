var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RIAPP;
(function (RIAPP) {
    (function (MOD) {
        (function (template) {
            var constsMOD = RIAPP.MOD.consts;
            var utilsMOD = RIAPP.MOD.utils;
            var bindMOD = RIAPP.MOD.binding;
            var elviewMOD = RIAPP.MOD.baseElView;

            template.css = {
                templateContainer: 'ria-template-container'
            };
            var utils;
            RIAPP.global.addOnInitialize(function (s, args) {
                utils = s.utils;
            });

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

                //returns a deferred which resolves with loaded template DOM element
                Template.prototype._loadTemplateElAsync = function (name) {
                    var self = this, fn_loader = this.app.getTemplateLoader(name), deferred = utils.createDeferred();
                    if (!!fn_loader) {
                        fn_loader().then(function (html) {
                            var tmpDiv = RIAPP.global.document.createElement('div');
                            tmpDiv.innerHTML = html;
                            var el = tmpDiv.firstElementChild;
                            deferred.resolve(el);
                        }, function (err) {
                            deferred.reject(new Error(utils.format(RIAPP.ERRS.ERR_TEMPLATE_ID_INVALID, self._templateID)));
                        });
                    } else {
                        deferred.reject(new Error(utils.format(RIAPP.ERRS.ERR_TEMPLATE_ID_INVALID, self._templateID)));
                    }
                    return deferred;
                };
                Template.prototype._appendIsBusy = function (el) {
                    var self = this;
                    this._busyTimeOut = setTimeout(function () {
                        if (!self._busyTimeOut || self._isDestroyCalled)
                            return;
                        self._busyTimeOut = null;
                        var vw_inst = new elviewMOD.BusyElView(self.app, el, { img: constsMOD.LOADER_GIF.SMALL, delay: 0 });
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
                    if (!!vw && (vw instanceof elviewMOD.BusyElView)) {
                        vw.destroy();
                    }
                };
                Template.prototype._loadTemplate = function () {
                    var self = this, tid = self._templateID, promise, deffered, tmpDiv, asyncLoad = false;
                    if (!!self._promise) {
                        self._promise.reject('cancel'); //cancel previous load
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
                                    ex = arg;
                                else if (!!arg.statusText) {
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
                    var i, len, obj, bindings = this._getBindings(), elViews = this._getElViews(), DataFormElView = this.app._getElViewType(constsMOD.ELVIEW_NM.DATAFORM);
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
                            //remove with jQuery method to ensure proper cleanUp
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

                //find elements which has specific data-name attribute value
                //returns plain array of elements, or empty array
                Template.prototype.findElByDataName = function (name) {
                    var $foundEl = RIAPP.global.$(this._el).find(['*[', constsMOD.DATA_ATTR.DATA_NAME, '="', name, '"]'].join(''));
                    return $foundEl.toArray();
                };
                Template.prototype.findElViewsByDataName = function (name) {
                    //first return elements with the needed data attributes those are inside template
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
//# sourceMappingURL=template.js.map

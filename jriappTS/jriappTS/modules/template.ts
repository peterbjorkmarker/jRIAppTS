module RIAPP {
    export module MOD {
        export module template {
           //local variables for optimization
            var utils = global.utils, consts = global.consts;
           
            export var css = {
                templateContainer: 'ria-template-container'
            };
         
            export class Template extends RIAPP.BaseObject {
                _dctxt: any;
                _el: HTMLElement;
                _isDisabled: boolean;
                _lfTime: MOD.utils.LifeTimeScope;
                _templateID: string;
                _templElView: MOD.baseElView.TemplateElView;
                _promise: any;
                _busyTimeOut: number;
                _app: Application;

                constructor(app: Application, templateID:string) {
                    super();
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
                _getBindings(): MOD.binding.Binding[] {
                    if (!this._lfTime)
                        return [];
                    var arr = this._lfTime.getObjs(), res = [];
                    for (var i = 0, len = arr.length; i < len; i += 1) {
                        if (utils.check.isBinding(arr[i]))
                            res.push(arr[i]);
                    }
                    return res;
                }
                _getElViews():MOD.baseElView.BaseElView[] {
                    if (!this._lfTime)
                        return [];
                    var arr = this._lfTime.getObjs(), res = [];
                    for (var i = 0, len = arr.length; i < len; i += 1) {
                        if (utils.check.isElView(arr[i]))
                            res.push(arr[i]);
                    }
                    return res;
                }
                _getTemplateElView(): MOD.baseElView.TemplateElView {
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
                }
                //returns promise which resolves with loaded template DOM element
                _loadTemplateElAsync(name) {
                    var self = this, fn_loader = this.app.getTemplateLoader(name), deferred;
                    if (!!fn_loader) {
                        return fn_loader().then(function (html:string) {
                            var tmpDiv = global.document.createElement('div');
                            tmpDiv.innerHTML = html;
                            return tmpDiv.firstElementChild;
                        });
                    }
                    else {
                        deferred = utils.createDeferred();
                        deferred.reject(new Error(utils.format(RIAPP.ERRS.ERR_TEMPLATE_ID_INVALID, self._templateID)));
                        return deferred.promise();
                    }
                }
                _appendIsBusy(el) {
                    var self = this;
                    this._busyTimeOut = setTimeout(function () {
                        if (!self._busyTimeOut || self._isDestroyCalled)
                            return;
                        self._busyTimeOut = null;
                        var vw_inst = new MOD.baseElView.BusyElView(self.app, el, { img: consts.LOADER_GIF.SMALL, delay: 0 });
                        vw_inst.isBusy = true;
                    }, 400);
                }
                _removeIsBusy(el) {
                    var self = this;
                    if (!!self._busyTimeOut) {
                        clearTimeout(self._busyTimeOut);
                        self._busyTimeOut = null;
                    }
                    var vw = this.app._getElView(el);
                    if (!!vw && (vw instanceof MOD.baseElView.BusyElView)) {
                        vw.destroy();
                    }
                }
                _loadTemplate() {
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

                        self._el = tmpDiv = global.document.createElement("div");
                        tmpDiv.className = css.templateContainer;
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
                        },
                            function (arg) {
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
                                    }
                                    else if (utils.check.isString(arg)) {
                                        ex = new Error(arg);
                                    }
                                }
                                if (!ex)
                                    ex = new Error(utils.format(RIAPP.ERRS.ERR_TEMPLATE_ID_INVALID, self._templateID));
                                global._onError(ex, self);
                            });
                    }
                }
                _updateBindingSource() {
                    var i, len, obj: MOD.binding.Binding, bindings = this._getBindings();
                    for (i = 0, len = bindings.length; i < len; i += 1) {
                        obj = bindings[i];
                        obj.isDisabled = this._isDisabled;
                        if (!obj.isSourceFixed)
                            obj.source = this._dctxt;
                    }
                }
                _updateIsDisabled() {
                    var i, len, obj, bindings = this._getBindings(), elViews = this._getElViews(),
                        DataFormElView = this.app._getElViewType(consts.ELVIEW_NM.DATAFORM);
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
                }
                _unloadTemplate() {
                    try {
                        if (!!this._el) {
                            var telv = this._templElView;
                            this._templElView = undefined;
                            if (!!telv) {
                                telv.templateUnloading(this);
                            }
                        }
                    }
                    finally {
                        if (!!this._lfTime) {
                            this._lfTime.destroy();
                            this._lfTime = null;
                        }

                        if (!!this._el) {
                            //remove with jQuery method to ensure proper cleanUp
                            global.$(this._el).remove(); 
                        }
                        this._el = null;
                    }
                }
                destroy() {
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
                    super.destroy();
                }
                //find elements which has specific data-name attribute value
                //returns plain array of elements, or empty array
                findElByDataName(name:string):HTMLElement[] {
                    var $foundEl = global.$(this._el).find(['*[', consts.DATA_ATTR.DATA_NAME, '="', name, '"]'].join(''));
                    return $foundEl.toArray();
                }
                findElViewsByDataName(name:string) {
                    //first return elements with the needed data attributes those are inside template
                    var self = this, els = this.findElByDataName(name), res:baseElView.BaseElView[] = [];
                    els.forEach(function (el) {
                        var elView = self.app._getElView(el);
                        if (!!elView)
                            res.push(elView);
                    });
                    return res;
                }
                toString() {
                    return 'Template';
                }
                get dataContext() { return this._dctxt; }
                set dataContext(v) {
                    if (this._dctxt !== v) {
                        this._dctxt = v;
                        this.raisePropertyChanged('dataContext');
                        this._updateBindingSource();
                    }
                }
                get templateID() { return this._templateID; }
                set templateID(v) {
                    if (this._templateID !== v) {
                        this._templateID = v;
                        this._loadTemplate();
                        this.raisePropertyChanged('templateID');
                    }
                }
                get el() { return this._el; }
                get isDisabled() { return this._isDisabled; }
                set isDisabled(v) {
                    if (this._isDisabled !== v) {
                        this._isDisabled = !!v;
                        this._updateIsDisabled();
                        this.raisePropertyChanged('isDisabled');
                    }
                }
                get app() { return this._app; }
            }

            global.registerType('Template', Template);
            global.onModuleLoaded('template', template);
        }
    }
}

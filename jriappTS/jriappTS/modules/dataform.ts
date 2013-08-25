module RIAPP {
    export module MOD {
        export module dataform {
           //local variables for optimization
            var utils = global.utils, consts = global.consts;
            export var css = {
                dataform: 'ria-dataform'
            };
            var ERRTEXT = RIAPP.localizable.VALIDATE;

            export class DataForm extends RIAPP.BaseObject {
                private get _DATA_CONTENT_SELECTOR() { return '*[' + consts.DATA_ATTR.DATA_CONTENT + ']:not([' + consts.DATA_ATTR.DATA_COLUMN + '])'; }
                _el: HTMLElement;
                _$el: JQuery;
                _objId: string;
                _dataContext: BaseObject;
                _isEditing: boolean;
                _isDisabled: boolean;
                _content: baseContent.IContent[];
                _lfTime: MOD.utils.LifeTimeScope;
                _contentCreated: boolean;
                _supportEdit: boolean;
                _supportErrNotify: boolean;
                _parentDataForm: baseElView.BaseElView;
                _errors: binding.IValidationInfo[];
                _app: Application;

                constructor(app:Application, el:HTMLElement) {
                    super();
                    var self = this, parent: HTMLElement;
                    this._app = app;
                    this._el = el;
                    this._$el = global.$(this._el);
                    this._objId = 'frm' + utils.getNewID();
                    this._dataContext = null;
                    this._$el.addClass(css.dataform);
                    this._isEditing = false;
                    this._isDisabled = false;
                    this._content = [];
                    this._lfTime = null;
                    this._contentCreated = false;
                    this._supportEdit = false;
                    this._supportErrNotify = false;
                    this._parentDataForm = null;
                    this._errors = null;
                    parent = utils.getParentDataForm(null, this._el);
                    //if this form is nested inside another dataform
                    //subscribe for parent's destroy event
                    if (!!parent) {
                        self._parentDataForm = app.getElementView(parent);
                        self._parentDataForm.addOnDestroyed(function (sender, args) {
                            //destroy itself if parent form is destroyed
                            if (!self._isDestroyCalled)
                                self.destroy(); 
                        }, self._objId);
                    }
                }
                _getBindings(): binding.Binding[] {
                    if (!this._lfTime)
                        return [];
                    var arr:any[] = this._lfTime.getObjs(), res:binding.Binding[] = [];
                    for (var i = 0, len = arr.length; i < len; i += 1) {
                        if (utils.check.isBinding(arr[i]))
                            res.push(arr[i]);
                    }
                    return res;
                }
                _getElViews():baseElView.BaseElView[] {
                    if (!this._lfTime)
                        return [];
                    var arr: any[] = this._lfTime.getObjs(), res: baseElView.BaseElView[] = [];
                    for (var i = 0, len = arr.length; i < len; i += 1) {
                        if (utils.check.isElView(arr[i]))
                            res.push(arr[i]);
                    }
                    return res;
                }
                _updateIsDisabled() {
                    var i, len, bnd: binding.Binding, vw: baseElView.BaseElView, bindings = this._getBindings(), elViews = this._getElViews(),
                        DataFormElView = this.app._getElViewType(consts.ELVIEW_NM.DATAFORM);
                    for (i = 0, len = bindings.length; i < len; i += 1) {
                        bnd = bindings[i];
                        bnd.isDisabled = this._isDisabled;
                    }
                    for (i = 0, len = elViews.length; i < len; i += 1) {
                        vw = elViews[i];
                        if ((vw instanceof DataFormElView) && !!(<DataFormElView>vw).form) {
                            (<DataFormElView>vw).form.isDisabled = this._isDisabled;
                        }
                    }
                }
                _updateContent() {
                    var dctx:any = this._dataContext, self = this;

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

                    var elements = <HTMLElement[]>ArrayHelper.fromList(this._el.querySelectorAll(self._DATA_CONTENT_SELECTOR)),
                        isEditing = this.isEditing;

                    elements.forEach(function (el) {
                        //check if the element inside nested dataform
                        if (utils.getParentDataForm(self._el, el) !== self._el)
                            return;
                        var attr = el.getAttribute(consts.DATA_ATTR.DATA_CONTENT), op = baseContent.parseContentAttr(attr);
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
                }
                _onDSErrorsChanged() {
                    var dataContext: binding.IErrorNotification = <any>this._dataContext;
                    this.validationErrors = dataContext.getAllErrors();
                }
                _bindDS() {
                    var dataContext:any = this._dataContext, self = this;
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
                        (<binding.IErrorNotification>dataContext).addOnErrorsChanged(function (sender, args) {
                            self._onDSErrorsChanged();
                        }, self._objId);
                    }
                }
                _unbindDS() {
                    var dataContext = this._dataContext;
                    this.validationErrors = null;
                    if (!!dataContext && !dataContext._isDestroyCalled) {
                        dataContext.removeNSHandlers(this._objId);
                    }
                }
                _clearContent() {
                    this._content.forEach(function (content) {
                        content.destroy();
                    });
                    this._content = [];
                    if (!!this._lfTime) {
                        this._lfTime.destroy();
                        this._lfTime = null;
                    }
                    this._contentCreated = false;
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._clearContent();
                    this._$el.removeClass(css.dataform);
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
                    super.destroy();
                }
                toString() {
                    return 'DataForm';
                }
                get app() { return this._app; }
                get el() { return this._el; }
                get dataContext() { return this._dataContext; }
                set dataContext(v: BaseObject) {
                    var dataContext:any;
                    try {
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
                            this._supportErrNotify = binding._checkIsErrorNotification(dataContext);
                        }
                        this._bindDS();
                        this._updateContent();
                        this.raisePropertyChanged('dataContext');
                        if (!!dataContext) {
                            if (this._supportEdit && this._isEditing !== (<MOD.utils.IEditable>dataContext).isEditing) {
                                this.isEditing = (<MOD.utils.IEditable>dataContext).isEditing;
                            }
                            if (this._supportErrNotify) {
                                this._onDSErrorsChanged();
                            }
                        }
                    } catch (ex) {
                        global.reThrow(ex, this._onError(ex, this));
                    }
                }
                get isEditing() { return this._isEditing; }
                set isEditing(v) {
                    var dataContext: any = this._dataContext;
                    if (!dataContext)
                        return;
                    var isEditing = this._isEditing, editable: MOD.utils.IEditable;

                    if (!this._supportEdit && v !== isEditing) {
                        this._isEditing = v;
                        this._updateContent();
                        this.raisePropertyChanged('isEditing');
                        return;
                    }

                    if (this._supportEdit)
                        editable = <MOD.utils.IEditable>dataContext;

                    if (v !== isEditing) {
                        try {
                            if (v) {
                                editable.beginEdit();
                            }
                            else {
                                editable.endEdit();
                            }
                        }
                        catch (ex) {
                            global.reThrow(ex, this._onError(ex, dataContext));
                        }
                    }

                    if (this._supportEdit && editable.isEditing !== isEditing) {
                        this._isEditing = editable.isEditing;
                        this._updateContent();
                        this.raisePropertyChanged('isEditing');
                    }
                }
                get validationErrors() { return this._errors; }
                set validationErrors(v) {
                    if (v !== this._errors) {
                        this._errors = v;
                        this.raisePropertyChanged('validationErrors');
                    }
                }
                get isDisabled() { return this._isDisabled; }
                set isDisabled(v: boolean) {
                    if (this._isDisabled !== v) {
                        this._isDisabled = !!v;
                        this._updateIsDisabled();
                        this.raisePropertyChanged('isDisabled');
                    }
                }
            }
     
            export class DataFormElView extends baseElView.BaseElView {
                _dataContext: BaseObject;
                _form: DataForm;
                _options: baseElView.IViewOptions;

                constructor(app: Application, el: HTMLSelectElement, options: baseElView.IViewOptions) {
                    this._dataContext = null;
                    this._form = null;
                    this._options = options;
                    super(app, el, options);
                }
                _getErrorTipInfo(errors: MOD.binding.IValidationInfo[]) {
                    var tip = ['<b>', ERRTEXT.errorInfo, '</b>', '<ul>'];
                    errors.forEach(function (info) {
                        var fieldName = info.fieldName, res = '';
                        if (!!fieldName) {
                            res = ERRTEXT.errorField + ' ' + fieldName
                        }
                        info.errors.forEach(function (str) {
                            if (!!res)
                                res = res + ' -> ' + str;
                            else
                                res = str;
                        });
                        tip.push('<li>' + res + '</li>');
                        res = '';
                    });
                    tip.push('</ul>');
                    return tip.join('');
                }
                _updateErrorUI(el: HTMLElement, errors: MOD.binding.IValidationInfo[]) {
                    if (!el) {
                        return;
                    }
                    var $el = this.$el;
                    if (!!errors && errors.length > 0) {
                        var $img, image_src = global.getImagePath('warning.png');
                        $img = global.$('<img name="error_info" alt="error_info" class="error-info" />');
                        $el.prepend($img);
                        $img.get(0).src = image_src;
                        utils.addToolTip($img, this._getErrorTipInfo(errors), baseElView.css.errorTip);
                        this._setFieldError(true);
                    }
                    else {
                        $el.children('img[name="error_info"]').remove();
                        this._setFieldError(false);
                    }
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._form && !this._form._isDestroyCalled) {
                        this._form.destroy();
                    }
                    this._form = null;
                    this._dataContext = null;
                    super.destroy();
                }
                toString() {
                    return 'DataFormElView';
                }
                get dataContext() { return this._dataContext; }
                set dataContext(v) {
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
                }
                get form() { return this._form; }
            }

            global.registerType('DataFormElView', DataFormElView);
            global.registerElView(consts.ELVIEW_NM.DATAFORM, DataFormElView);
            global.onModuleLoaded('dataform', dataform);
        }
    }
}

module RIAPP {
    export module MOD {
        export module dataform {
            import constsMOD = RIAPP.MOD.consts;
            import utilsMOD = RIAPP.MOD.utils;
            import bindMOD = RIAPP.MOD.binding;
            import elviewMOD = RIAPP.MOD.baseElView;
            import contentMOD = RIAPP.MOD.baseContent;
            import collMOD = RIAPP.MOD.collection;
            export var css = {
                dataform: 'ria-dataform'
            };
            var ERRTEXT = RIAPP.localizable.VALIDATE, utils: utilsMOD.Utils;
            RIAPP.global.addOnInitialize((s, args) => {
                utils = s.utils;
            });
            
            export interface IDataFormOptions {
                app: Application;
                el: HTMLElement;
            }

            function getFieldInfo(obj, fieldName: string): collMOD.IFieldInfo {
                if (!obj)
                    return null;
                if (!!obj._aspect && utils.check.isFunction(obj._aspect.getFieldInfo)) {
                    return obj._aspect.getFieldInfo(fieldName);
                }
                else if (utils.check.isFunction(obj.getFieldInfo)) {
                    return obj.getFieldInfo(fieldName);
                }
                else
                    return null;
            }

            export class DataForm extends RIAPP.BaseObject {
                private get _DATA_CONTENT_SELECTOR() { return '*[' + constsMOD.DATA_ATTR.DATA_CONTENT + ']:not([' + constsMOD.DATA_ATTR.DATA_COLUMN + '])'; }
                private _el: HTMLElement;
                private _$el: JQuery;
                private _objId: string;
                private _dataContext: RIAPP.BaseObject;
                private _isEditing: boolean;
                private _content: contentMOD.IContent[];
                private _lfTime: utilsMOD.LifeTimeScope;
                private _contentCreated: boolean;
                private _supportEdit: RIAPP.IEditable;
                private _supportErrNotify: RIAPP.IErrorNotification;
                private _parentDataForm: elviewMOD.BaseElView;
                private _errors: RIAPP.IValidationInfo[];
                private _app: RIAPP.Application;
                private _isInsideTemplate: boolean;
                
                constructor(options: IDataFormOptions) {
                    super();
                    var self = this, parent: HTMLElement;
                    options = utils.extend(false,
                        {
                            app: null,
                            el: null
                        }, options);
                    this._app = options.app;
                    this._el = options.el;
                    this._$el = global.$(this._el);
                    this._objId = 'frm' + utils.getNewID();
                    this._dataContext = null;
                    this._$el.addClass(css.dataform);
                    this._isEditing = false;
                    this._content = [];
                    this._lfTime = null;
                    this._contentCreated = false;
                    this._supportEdit = null;
                    this._supportErrNotify = null;
                    this._parentDataForm = null;
                    this._errors = null;
                    parent = utils.getParentDataForm(null, this._el);
                    //if this form is nested inside another dataform
                    //subscribe for parent's destroy event
                    if (!!parent) {
                        self._parentDataForm = this._app.getElementView(parent);
                        self._parentDataForm.addOnDestroyed(function (sender, args) {
                            //destroy itself if parent form is destroyed
                            if (!self._isDestroyCalled)
                                self.destroy(); 
                        }, self._objId);
                    }
                }
                handleError(error, source): boolean {
                    var isHandled = super.handleError(error, source);
                    if (!isHandled) {
                        return this._app.handleError(error, source);
                    }
                    return isHandled;
                }
                private _getBindings(): bindMOD.Binding[] {
                    if (!this._lfTime)
                        return [];
                    var arr: any[] = this._lfTime.getObjs(), res: bindMOD.Binding[] = [];
                    for (var i = 0, len = arr.length; i < len; i += 1) {
                        if (utils.check.isBinding(arr[i]))
                            res.push(arr[i]);
                    }
                    return res;
                }
                private _getElViews(): elviewMOD.BaseElView[] {
                    if (!this._lfTime)
                        return [];
                    var arr: any[] = this._lfTime.getObjs(), res: elviewMOD.BaseElView[] = [];
                    for (var i = 0, len = arr.length; i < len; i += 1) {
                        if (utils.check.isElView(arr[i]))
                            res.push(arr[i]);
                    }
                    return res;
                }
                private _createContent() {
                    var dctx: any = this._dataContext, self = this;
                    if (!dctx) {
                        return;
                    }
                    var elements: HTMLElement[] = ArrayHelper.fromList(this._el.querySelectorAll(self._DATA_CONTENT_SELECTOR)),
                        isEditing = this.isEditing;

                    //select all dataforms inside the scope
                    var formSelector = ['*[', constsMOD.DATA_ATTR.DATA_FORM, ']'].join(''),
                        forms = ArrayHelper.fromList(this._el.querySelectorAll(formSelector));

                    elements.forEach(function (el) {
                        //check if the element inside a nested dataform
                        if (utils.check.isInNestedForm(self._el, forms, el))
                            return;
                        var attr = el.getAttribute(constsMOD.DATA_ATTR.DATA_CONTENT),
                            op = contentMOD.parseContentAttr(attr);
                        if (!!op.fieldName && !op.fieldInfo) {
                            op.fieldInfo = getFieldInfo(dctx,op.fieldName);
                            if (!op.fieldInfo) {
                                throw new Error(utils.format(RIAPP.ERRS.ERR_DBSET_INVALID_FIELDNAME, '', op.fieldName));
                            }
                        }

                        var contentType = self.app._getContentType(op);
                        var content = new contentType(self.app, { parentEl: el, contentOptions: op, dataContext: dctx, isEditing: isEditing });
                        self._content.push(content);
                    });
                    this._lfTime = self.app._bindElements(this._el, dctx, true, this.isInsideTemplate);

                    var bindings = this._getBindings();
                    bindings.forEach(function (binding) {
                        if (!binding.isSourceFixed)
                            binding.source = dctx;
                    });

                    this._contentCreated = true;
                }
                private _updateContent() {
                    try {
                        var dctx: any = this._dataContext, self = this;
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
                        }
                        else {
                            this._createContent();
                        }
                    }
                    catch (ex) {
                        global.reThrow(ex, this.handleError(ex, this));
                    }
                }
                private _onDSErrorsChanged() {
                    if (!!this._supportErrNotify)
                        this.validationErrors = this._supportErrNotify.getAllErrors();
                }
                private _bindDS() {
                    var dataContext = this._dataContext, self = this;
                    if (!dataContext)
                        return;
                    if (!!dataContext) {
                        this._supportEdit = utils.getEditable(dataContext);
                        this._supportErrNotify = utils.getErrorNotification(dataContext);
                    }

                    dataContext.addOnDestroyed(function (s, a) {
                        self.dataContext = null;
                    }, self._objId);

                    if (!!this._supportEdit) {
                        (<any>this._supportEdit).addOnPropertyChange('isEditing', function (sender, args) {
                            self.isEditing = self._supportEdit.isEditing;
                        }, self._objId);
                    }

                    if (!!this._supportErrNotify) {
                        this._supportErrNotify.addOnErrorsChanged(function (sender, args) {
                            self._onDSErrorsChanged();
                        }, self._objId);
                    }
                }
                private _unbindDS() {
                    var dataContext = this._dataContext;
                    this.validationErrors = null;
                    if (!!dataContext && !dataContext.getIsDestroyCalled()) {
                        dataContext.removeNSHandlers(this._objId);
                        if (!!this._supportEdit) {
                            (<any>this._supportEdit).removeNSHandlers(this._objId);
                        }
                        if (!!this._supportErrNotify) {
                            this._supportErrNotify.removeOnErrorsChanged(this._objId);
                        }
                    }
                    this._supportEdit = null;
                    this._supportErrNotify = null;
                }
                private _clearContent() {
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
                    if (!!parentDataForm && !parentDataForm.getIsDestroyCalled()) {
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
                set dataContext(v) {
                    try {
                        if (v === this._dataContext)
                            return;
                        if (!!v && !utils.check.isBaseObj(v)) {
                            throw new Error(RIAPP.ERRS.ERR_DATAFRM_DCTX_INVALID);
                        }
                        this._unbindDS();
                        this._dataContext = v;
                        this._bindDS();
                        this._updateContent();
                        this.raisePropertyChanged('dataContext');
                        if (!!this._dataContext) {
                            if (!!this._supportEdit && this._isEditing !== this._supportEdit.isEditing) {
                                this.isEditing = this._supportEdit.isEditing;
                            }
                            if (!!this._supportErrNotify) {
                                this._onDSErrorsChanged();
                            }
                        }
                    } catch (ex) {
                        global.reThrow(ex, this.handleError(ex, this));
                    }
                }
                get isEditing() { return this._isEditing; }
                set isEditing(v) {
                    var dataContext: any = this._dataContext;
                    if (!dataContext)
                        return;
                    var isEditing = this._isEditing, editable: RIAPP.IEditable;

                    if (!!this._supportEdit)
                        editable = this._supportEdit;

                    if (!editable && v !== isEditing) {
                        this._isEditing = v;
                        this._updateContent();
                        this.raisePropertyChanged('isEditing');
                        return;
                    }

                    
                    if (v !== isEditing && !!editable) {
                        try {
                            if (v) {
                                editable.beginEdit();
                            }
                            else {
                                editable.endEdit();
                            }
                        }
                        catch (ex) {
                            global.reThrow(ex, this.handleError(ex, dataContext));
                        }
                    }

                    if (!!editable && editable.isEditing !== isEditing) {
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
                get isInsideTemplate() { return this._isInsideTemplate; }
                set isInsideTemplate(v) {
                    this._isInsideTemplate = v;
                }
            }
     
            export class DataFormElView extends elviewMOD.BaseElView {
                private _form: DataForm;
                private _options: elviewMOD.IViewOptions;

                constructor(app: Application, el: HTMLSelectElement, options: elviewMOD.IViewOptions) {
                    super(app, el, options);
                    var self = this;
                    this._options = options;
                    this._form = new DataForm({ app: app, el: el });
                    this._form.addOnDestroyed(function () {
                        self._form = null;
                        self.invokePropChanged('form');
                        self.raisePropertyChanged('form');
                    });
                    this._form.addOnPropertyChange('*', function (form, args) {
                        switch (args.property) {
                            case 'validationErrors':
                                self.validationErrors = form.validationErrors;
                                break;
                            case 'dataContext':
                            case 'isDisabled':
                                self.raisePropertyChanged(args.property);
                                break;
                        }
                    }, this._objId);
                }
                protected _getErrorTipInfo(errors: RIAPP.IValidationInfo[]) {
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
                protected _updateErrorUI(el: HTMLElement, errors: RIAPP.IValidationInfo[]) {
                    if (!el) {
                        return;
                    }
                    var $el = this.$el;
                    if (!!errors && errors.length > 0) {
                        var $img, image_src = global.getImagePath('warning.png');
                        $img = global.$('<img name="error_info" alt="error_info" class="error-info" />');
                        $el.prepend($img);
                        $img.get(0).src = image_src;
                        utils.addToolTip($img, this._getErrorTipInfo(errors), true);
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
                    if (!!this._form && !this._form.getIsDestroyCalled()) {
                        this._form.destroy();
                    }
                    this._form = null;
                    super.destroy();
                }
                toString() {
                    return 'DataFormElView';
                }
                get dataContext() {
                    if (this._isDestroyCalled)
                        return null;
                    return this._form.dataContext;
                }
                set dataContext(v) {
                    if (this._isDestroyCalled)
                        return;
                    if (this.dataContext !== v) {
                        this._form.dataContext = v;
                    }
                }
                get form() { return this._form; }
            }

            global.registerType('DataFormElView', DataFormElView);
            global.registerElView(constsMOD.ELVIEW_NM.DATAFORM, DataFormElView);
            global.onModuleLoaded('dataform', dataform);
        }
    }
}

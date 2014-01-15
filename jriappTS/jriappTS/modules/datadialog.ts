module RIAPP {
    export module MOD {
        export module datadialog {
            var utils: MOD.utils.Utils;
            RIAPP.global.addOnInitialize((s, args) => {
                utils = s.utils;
            });
           export enum DIALOG_ACTION { Default = 0, StayOpen = 1 };
           
            
            export interface IDialogConstructorOptions {
                dataContext?: any;
                templateID: string;
                width?: any;
                height?: any;
                title?: string;
                submitOnOK?: boolean;
                canRefresh?: boolean;
                canCancel?: boolean;
                fn_OnClose?: (dialog: DataEditDialog) => void;
                fn_OnOK?: (dialog: DataEditDialog) => number;
                fn_OnShow?: (dialog: DataEditDialog) => void;
                fn_OnCancel?: (dialog: DataEditDialog) => number;
                fn_OnTemplateCreated?: (template: template.Template) => void;
                fn_OnTemplateDestroy?: (template: template.Template) => void;
            }

            export class DataEditDialog extends BaseObject {
                _objId: string;
                _dataContext: any;
                _templateID: string;
                _submitOnOK: boolean;
                _canRefresh: boolean;
                _canCancel: boolean;
                _fn_OnClose: (dialog: DataEditDialog) => void;
                _fn_OnOK: (dialog: DataEditDialog) => number;
                _fn_OnShow: (dialog: DataEditDialog) => void;
                _fn_OnCancel: (dialog: DataEditDialog) => number;
                _fn_OnTemplateCreated: (template: template.Template) => void;
                _fn_OnTemplateDestroy: (template: template.Template) => void;
                _isEditable: boolean;
                _template: template.Template;
                _$template: JQuery;
                _result: string;
                private _options: any;
                private _dialogCreated: boolean;
                private _fn_submitOnOK: () => IVoidPromise;
                private _app: Application;
                //save global's currentSelectable  before showing and restore it on dialog's closing
                private _currentSelectable: ISelectable;

                constructor(app:Application, options: IDialogConstructorOptions) {
                    super();
                    var self = this;
                    this._app = app;
                    this._objId = 'dlg' + utils.getNewID();
                    var opts: IDialogConstructorOptions = utils.extend(false, {
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
                        fn_OnShow:null,
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
                          //signals immediatly
                           return utils.createDeferred().resolve().promise();
                       }
                       var dctxt: MOD.utils.ISubmittable = self._dataContext;
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
                addOnClose(fn: (sender: any, args: {}) => void , namespace?: string) {
                    this.addHandler('close', fn, namespace);
                }
                removeOnClose(namespace?: string) {
                    this.removeHandler('close', namespace);
                }
                addOnRefresh(fn: (sender: any, args: { isHandled: boolean; }) => void , namespace?: string) {
                    this.addHandler('refresh', fn, namespace);
                }
                removeOnRefresh(namespace?: string) {
                    this.removeHandler('refresh', namespace);
                }
                _updateIsEditable() {
                    this._isEditable = utils.check.isEditable(this._dataContext);
                }
                _createDialog() {
                    if (this._dialogCreated)
                        return;
                    var dctx = this._dataContext;
                    this._template = this._createTemplate(dctx);
                    this._$template = global.$(this._template.el);
                    global.document.body.appendChild(this._template.el);
                    (<any>this._$template).dialog(this._options);
                    this._dialogCreated = true;
                    if (!!this._fn_OnTemplateCreated) {
                        this._fn_OnTemplateCreated(this._template);
                    }
                }
                _getEventNames() {
                    var base_events = super._getEventNames();
                    return ['close', 'refresh'].concat(base_events);
                }
                _createTemplate(dcxt) {
                    var t = new template.Template(this._app, this._templateID);
                    //create template in disabled state
                    t.isDisabled = true; 
                    t.dataContext = dcxt;
                    return t;
                }
                _destroyTemplate() {
                    if (!!this._fn_OnTemplateDestroy) {
                        this._fn_OnTemplateDestroy(this._template);
                    }
                    this._$template.remove();
                    this._template.destroy();
                    this._$template = null;
                    this._template = null;
                }
                _getButtons() {
                    var self = this, buttons = [
                        {
                            'id': self._objId + 'Refresh',
                            'text': localizable.TEXT.txtRefresh,
                            'class': 'btn btn-info',
                            'click': function () {
                                self._onRefresh();
                            }
                        },
                        {
                            'id': self._objId + 'Ok',
                            'text': localizable.TEXT.txtOk,
                            'class': 'btn btn-info',
                            'click': function () {
                                self._onOk();
                            }
                        },
                        {
                            'id': self._objId + 'Cancel',
                            'text': localizable.TEXT.txtCancel,
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
                }
                _getOkButton() {
                    return $("#" + this._objId + 'Ok');
                }
                _getCancelButton() {
                    return $("#" + this._objId + 'Cancel');
                }
                _getRefreshButton() {
                    return $("#" + this._objId + 'Refresh');
                }
                _getAllButtons() {
                    return [this._getOkButton(), this._getCancelButton(), this._getRefreshButton()];
                }
                _disableButtons(isDisable:boolean) {
                    var btns = this._getAllButtons();
                    btns.forEach(function ($btn) {
                        $btn.prop("disabled", !!isDisable);
                    });
                }
                _onOk() {
                    var self = this, canCommit:boolean, action = DIALOG_ACTION.Default;
                    if (!!this._fn_OnOK) {
                        action = this._fn_OnOK(this);
                    }
                    if (action == DIALOG_ACTION.StayOpen)
                        return;

                    if (!this._dataContext) {
                        self.hide();
                        return;
                    }

                    if (this._isEditable)
                        canCommit = this._dataContext.endEdit();
                    else
                        canCommit = true;

                    if (canCommit) {
                        if (this._submitOnOK) {
                            this._disableButtons(true);
                            var title = this.title;
                            this.title = localizable.TEXT.txtSubmitting;
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
                                //resume editing if fn_onEndEdit callback returns false in isOk argument
                                if (self._isEditable) {
                                    if (!self._dataContext.beginEdit()) {
                                        self._result = 'cancel';
                                        self.hide();
                                    }
                                }
                            });
                        }
                        else {
                            self._result = 'ok';
                            self.hide();
                        }
                    }
                }
                _onCancel() {
                    var action = DIALOG_ACTION.Default;
                    if (!!this._fn_OnCancel) {
                        action = this._fn_OnCancel(this);
                    }
                    if (action == DIALOG_ACTION.StayOpen)
                        return;

                    this._result = 'cancel';
                    this.hide();
                }
                _onRefresh() {
                    var args = { isHandled: false };
                    this.raiseEvent('refresh', args);
                    if (args.isHandled)
                        return;
                    if (!!this._dataContext && utils.check.isFunction(this._dataContext.refresh)) {
                        this._dataContext.refresh();
                    }
                }
                _onClose() {
                    try {
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
                    }
                    finally {
                        this._template.isDisabled = true;
                    }
                    var csel = this._currentSelectable;
                    this._currentSelectable = null;
                    setTimeout(function () { global.currentSelectable = csel; csel = null; }, 50);
                }
                _onShow() {
                    this._currentSelectable = global.currentSelectable;
                    if (!!this._fn_OnShow) {
                        this._fn_OnShow(this);
                    }
                }
                show() {
                    this._result = null;
                    (<any>this._$template).dialog("option", "buttons", this._getButtons());
                    this._template.isDisabled = false;
                    this._onShow();
                    (<any>this._$template).dialog("open");
                }
                hide() {
                    (<any>this._$template).dialog("close");
                }
                getOption(name:string) {
                    return (<any>this._$template).dialog('option', name);
                }
                setOption(name:string, value) {
                    (<any>this._$template).dialog('option', name, value);
                }
                destroy() {
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
                    super.destroy();
                }
                get dataContext() { return this._dataContext; }
                set dataContext(v) {
                    if (v !== this._dataContext) {
                        this._dataContext = v;
                        if (!!this._template)
                            this._template.dataContext = this._dataContext;
                        this._updateIsEditable();
                        this.raisePropertyChanged('dataContext');
                    }
                }
                get result() { return this._result; }
                get template() { return this._template; }
                get isSubmitOnOK() { return this._submitOnOK; }
                set isSubmitOnOK(v) {
                    if (this._submitOnOK !== v) {
                        this._submitOnOK = v;
                        this.raisePropertyChanged('isSubmitOnOK');
                    }
                }
                get width() { return this.getOption('width'); }
                set width(v) {
                    var x = this.getOption('width');
                    if (v !== x) {
                        this.setOption('width', v);
                        this.raisePropertyChanged('width');
                    }
                }
                get height() { return this.getOption('height'); }
                set height(v) {
                    var x = this.getOption('height');
                    if (v !== x) {
                        this.setOption('height', v);
                        this.raisePropertyChanged('height');
                    }
                }
                get title() { return this.getOption('title'); }
                set title(v) {
                    var x = this.getOption('title');
                    if (v !== x) {
                        this.setOption('title', v);
                        this.raisePropertyChanged('title');
                    }
                }
                get canRefresh() { return this._canRefresh; }
                set canRefresh(v) {
                    var x = this._canRefresh;
                    if (v !== x) {
                        this._canRefresh = v;
                        this.raisePropertyChanged('canRefresh');
                    }
                }
                get canCancel() { return this._canCancel; }
                set canCancel(v) {
                    var x = this._canCancel;
                    if (v !== x) {
                        this._canCancel = v;
                        this.raisePropertyChanged('canCancel');
                    }
                }
            }
     
            global.onModuleLoaded('datadialog', datadialog);
        }
    }
}

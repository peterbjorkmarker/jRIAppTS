﻿module RIAPP {
    export module MOD {
        export module datadialog {
            import utilsMOD = RIAPP.MOD.utils;
            import templMOD = RIAPP.MOD.template;

            var utils: utilsMOD.Utils;
            RIAPP.global.addOnInitialize((s, args) => {
                utils = s.utils;
            });

            export const enum DIALOG_ACTION { Default = 0, StayOpen = 1 };

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
                fn_OnTemplateCreated?: (template: templMOD.Template) => void;
                fn_OnTemplateDestroy?: (template: templMOD.Template) => void;
            }

            export interface IButton
            {
                id: string;
                text: string;
                class: string;
                click: () => void;
            }

            interface IDialogOptions {
                width: any;
                height: any;
                title: string;
                autoOpen: boolean;
                modal: boolean;
                close: (event, ui) => void;
                buttons: IButton[];
              }

            var DLG_EVENTS = {
                close: 'close',
                refresh: 'refresh'
            };

            export class DataEditDialog extends BaseObject implements templMOD.ITemplateEvents  {
                private _objId: string;
                private _dataContext: any;
                private _templateID: string;
                private _submitOnOK: boolean;
                private _canRefresh: boolean;
                private _canCancel: boolean;
                private _fn_OnClose: (dialog: DataEditDialog) => void;
                private _fn_OnOK: (dialog: DataEditDialog) => number;
                private _fn_OnShow: (dialog: DataEditDialog) => void;
                private _fn_OnCancel: (dialog: DataEditDialog) => number;
                private _fn_OnTemplateCreated: (template: templMOD.Template) => void;
                private _fn_OnTemplateDestroy: (template: templMOD.Template) => void;
                private _isEditable: RIAPP.IEditable;
                private _template: templMOD.Template;
                private _$template: JQuery;
                private _result: string;
                private _options: IDialogOptions;
                private _dialogCreated: boolean;
                private _fn_submitOnOK: () => RIAPP.IVoidPromise;
                private _app: Application;
                //save global's currentSelectable  before showing and restore it on dialog's closing
                private _currentSelectable: RIAPP.ISelectable;

                constructor(app: RIAPP.Application, options: IDialogConstructorOptions) {
                    super();
                    var self = this;
                    options = utils.extend(false, {
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
                    this._objId = 'dlg' + utils.getNewID();
                    this._app = app;
                    this._dataContext = options.dataContext;
                    this._templateID = options.templateID;
                    this._submitOnOK = options.submitOnOK;
                    this._canRefresh = options.canRefresh;
                    this._canCancel = options.canCancel;
                    this._fn_OnClose = options.fn_OnClose;
                    this._fn_OnOK = options.fn_OnOK;
                    this._fn_OnShow = options.fn_OnShow;
                    this._fn_OnCancel = options.fn_OnCancel;
                    this._fn_OnTemplateCreated = options.fn_OnTemplateCreated;
                    this._fn_OnTemplateDestroy = options.fn_OnTemplateDestroy;

                    this._isEditable = null;
                    this._template = null;
                    this._$template = null;
                    this._result = null;
                    this._currentSelectable = null;
                    this._fn_submitOnOK = function () {
                        var iSubmittable = utils.getSubmittable(self._dataContext);
                        if (!iSubmittable || !iSubmittable._isCanSubmit) {
                            //signals immediatly
                            return utils.createDeferred().resolve().promise();
                        }
                        return iSubmittable.submitChanges();
                    };
                    this._updateIsEditable();
                    this._options = {
                        width: options.width,
                        height: options.height,
                        title: options.title,
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
                handleError(error, source): boolean {
                    var isHandled = super.handleError(error, source);
                    if (!isHandled) {
                        return this._app.handleError(error, source);
                    }
                    return isHandled;
                }
                addOnClose(fn: (sender?, args?) => void, namespace?: string, context?: BaseObject) {
                    this._addHandler(DLG_EVENTS.close, fn, namespace, context);
                }
                removeOnClose(namespace?: string) {
                    this._removeHandler(DLG_EVENTS.close, namespace);
                }
                addOnRefresh(fn: (sender: any, args: { isHandled: boolean; }) => void, namespace?: string, context?: BaseObject) {
                    this._addHandler(DLG_EVENTS.refresh, fn, namespace, context);
                }
                removeOnRefresh(namespace?: string) {
                    this._removeHandler(DLG_EVENTS.refresh, namespace);
                }
                protected _updateIsEditable() {
                    this._isEditable = utils.getEditable(this._dataContext);
                }
                protected _createDialog() {
                    if (this._dialogCreated)
                        return;
                    try {
                        this._template = this._createTemplate();
                        this._$template = global.$(this._template.el);
                        global.document.body.appendChild(this._template.el);
                        (<any>this._$template).dialog(this._options);
                        this._dialogCreated = true;
                    }
                    catch (ex) {
                        global.reThrow(ex, this.handleError(ex, this));
                    }
                }
                protected _getEventNames() {
                    var base_events = super._getEventNames();
                    return [DLG_EVENTS.close, DLG_EVENTS.refresh].concat(base_events);
                }
                templateLoading(template: templMOD.Template): void {
                    //noop
                }
                templateLoaded(template: templMOD.Template): void {
                    if (this._isDestroyCalled)
                        return;
                    if (!!this._fn_OnTemplateCreated) {
                        this._fn_OnTemplateCreated(template);
                    }
                }
                templateUnLoading(template: templMOD.Template): void {
                    if (!!this._fn_OnTemplateDestroy) {
                        this._fn_OnTemplateDestroy(template);
                    }
                }
                protected _createTemplate() {
                    return new templMOD.Template({
                        app: this.app,
                        templateID: this._templateID,
                        dataContext: null,
                        templEvents: this
                    });
                }
                protected _destroyTemplate() {
                    if (!!this._template)
                        this._template.destroy();
                }
                protected _getButtons(): IButton[] {
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
                protected _getOkButton() {
                    return $("#" + this._objId + 'Ok');
                }
                protected _getCancelButton() {
                    return $("#" + this._objId + 'Cancel');
                }
                protected _getRefreshButton() {
                    return $("#" + this._objId + 'Refresh');
                }
                protected _getAllButtons() {
                    return [this._getOkButton(), this._getCancelButton(), this._getRefreshButton()];
                }
                protected _disableButtons(isDisable:boolean) {
                    var btns = this._getAllButtons();
                    btns.forEach(function ($btn) {
                        $btn.prop("disabled", !!isDisable);
                    });
                }
                protected _onOk() {
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

                    if (!!this._isEditable)
                        canCommit = this._isEditable.endEdit();
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
                                if (!!self._isEditable) {
                                    if (!self._isEditable.beginEdit()) {
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
                protected _onCancel() {
                    var action = DIALOG_ACTION.Default;
                    if (!!this._fn_OnCancel) {
                        action = this._fn_OnCancel(this);
                    }
                    if (action == DIALOG_ACTION.StayOpen)
                        return;
                    if (!!this._isEditable)
                        this._isEditable.cancelEdit();
                    this._result = 'cancel';
                    this.hide();
                }
                protected _onRefresh() {
                    var args = { isHandled: false };
                    this.raiseEvent(DLG_EVENTS.refresh, args);
                    if (args.isHandled)
                        return;
                    var dctx = this._dataContext;
                    if (!!dctx) {
                        if (utils.check.isFunction(dctx.refresh)) {
                            dctx.refresh();
                        }
                        else if (!!dctx._aspect && utils.check.isFunction(dctx._aspect.refresh)) {
                            dctx._aspect.refresh();
                        }
                    }
                }
                protected _onClose() {
                    try {
                        if (this._result != 'ok' && !!this._dataContext) {
                            if (!!this._isEditable)
                                this._isEditable.cancelEdit();
                            if (this._submitOnOK) {
                                var subm = utils.getSubmittable(this._dataContext);
                                if (!!subm)
                                    subm.rejectChanges();
                            }
                        }
                        if (!!this._fn_OnClose)
                            this._fn_OnClose(this);
                        this.raiseEvent(DLG_EVENTS.close, {});
                    }
                    finally {
                        this._template.dataContext = null;
                    }
                    var csel = this._currentSelectable;
                    this._currentSelectable = null;
                    setTimeout(function () { global.currentSelectable = csel; csel = null; }, 50);
                }
                protected _onShow() {
                    this._currentSelectable = global.currentSelectable;
                    if (!!this._fn_OnShow) {
                        this._fn_OnShow(this);
                    }
                }
                show() {
                    var self = this;
                    self._result = null;
                    (<any>self._$template).dialog("option", "buttons", this._getButtons());
                    this._template.dataContext = this._dataContext;
                    self._onShow();
                    (<any>self._$template).dialog("open");
                }
                hide() {
                    var self = this;
                    if (!self._$template)
                        return;
                    (<any>self._$template).dialog("close");
                }
                getOption(name: string) {
                    if (!this._$template)
                        return undefined;
                    return (<any>this._$template).dialog('option', name);
                }
                setOption(name: string, value) {
                    var self = this;
                    (<any>self._$template).dialog('option', name, value);
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this.hide();
                    this._destroyTemplate();
                    this._$template = null;
                    this._template = null;
                    this._dialogCreated = false;
                    this._dataContext = null;
                    this._fn_submitOnOK = null;
                    this._isEditable = null;
                    this._app = null;
                    super.destroy();
                }
                get app() { return this._app; }
                get dataContext() { return this._dataContext; }
                set dataContext(v) {
                    if (v !== this._dataContext) {
                        this._dataContext = v;
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

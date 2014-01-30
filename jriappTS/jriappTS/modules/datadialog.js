var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RIAPP;
(function (RIAPP) {
    (function (MOD) {
        (function (datadialog) {
            var utils;
            RIAPP.global.addOnInitialize(function (s, args) {
                utils = s.utils;
            });
            (function (DIALOG_ACTION) {
                DIALOG_ACTION[DIALOG_ACTION["Default"] = 0] = "Default";
                DIALOG_ACTION[DIALOG_ACTION["StayOpen"] = 1] = "StayOpen";
            })(datadialog.DIALOG_ACTION || (datadialog.DIALOG_ACTION = {}));
            var DIALOG_ACTION = datadialog.DIALOG_ACTION;
            ;

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
                            //signals immediatly
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
                    this._$template.dialog(this._options);
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
                    var t = new RIAPP.MOD.template.Template(this._app, this._templateID);

                    //create template in disabled state
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
                    var self = this, canCommit, action = 0 /* Default */;
                    if (!!this._fn_OnOK) {
                        action = this._fn_OnOK(this);
                    }
                    if (action == 1 /* StayOpen */)
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
                                //resume editing if fn_onEndEdit callback returns false in isOk argument
                                if (self._isEditable) {
                                    if (!self._dataContext.beginEdit()) {
                                        self._result = 'cancel';
                                        self.hide();
                                    }
                                }
                            });
                        } else {
                            self._result = 'ok';
                            self.hide();
                        }
                    }
                };
                DataEditDialog.prototype._onCancel = function () {
                    var action = 0 /* Default */;
                    if (!!this._fn_OnCancel) {
                        action = this._fn_OnCancel(this);
                    }
                    if (action == 1 /* StayOpen */)
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
                    this._$template.dialog("option", "buttons", this._getButtons());
                    this._template.isDisabled = false;
                    this._onShow();
                    this._$template.dialog("open");
                };
                DataEditDialog.prototype.hide = function () {
                    this._$template.dialog("close");
                };
                DataEditDialog.prototype.getOption = function (name) {
                    return this._$template.dialog('option', name);
                };
                DataEditDialog.prototype.setOption = function (name, value) {
                    this._$template.dialog('option', name, value);
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
//# sourceMappingURL=datadialog.js.map

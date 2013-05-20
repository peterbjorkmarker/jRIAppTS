/// <reference path="..\jriapp.ts"/>
module RIAPP
{
    export module COMMON {
        var global = RIAPP.global, utils = global.utils;

        export class NotConverter extends MOD.converter.BaseConverter {
            convertToSource(val, param, dataContext) {
                return !val;
            }
            convertToTarget(val, param, dataContext) {
                return !val;
            }
        }

        export class DialogVM extends MOD.mvvm.BaseViewModel {
            _dialogs: { [name: string]: MOD.datadialog.DataEditDialog; };

            constructor(app: Application) {
                super(app);
                this._dialogs = {};
            }
            createDialog(name: string, options: MOD.datadialog.IDialogConstructorOptions) {
                var self = this;

                var dialog = new MOD.datadialog.DataEditDialog(this._app, options);
                this._dialogs[name] = dialog;
                return dialog;
            }
            showDialog(name:string, dataContext) {
                var dialog = this.getDialog(name);
                if (!dialog)
                    return null;
                dialog.dataContext = dataContext;
                dialog.show();
                return dialog;
            }
            getDialog(name:string) {
                return this._dialogs[name];
            }
            destroy() {
                if (this._isDestroyed)
                    return;
                this._isDestroyCalled = true;
                var keys = Object.keys(this._dialogs);
                keys.forEach(function (key:string) {
                    this._dialogs[key].destroy();
                }, this);
                this._dialogs = {};
                super.destroy();
            }
        }

        export class DownloadLinkElView extends MOD.baseElView.BaseElView {
            _baseUri: string;
            _id: string;

            _init(options) {
                super._init(options);
                this._baseUri = '';
                if (!!options.baseUri)
                    this._baseUri = options.baseUri;
                this._id = '';
            }
            get text() {
                if (!this._el)
                    return;
                return this.$el.text();
            }
            set text(v) {
                if (!this._el)
                    return;
                var $el = this.$el;
                var x = $el.text();
                if (v === null)
                    v = '';
                else
                    v = '' + v;
                if (x !== v) {
                    $el.text(v);
                    this.raisePropertyChanged('text');
                }
            }
            get href() {
                if (!this._el)
                    return;
                return this.$el.prop('href');
            }
            set href(v) {
                if (!this._el)
                    return;
                var x = this.$el.prop('href');
                if (v === null)
                    v = '';
                else
                    v = '' + v;
                if (x !== v) {
                    this.$el.prop('href',v);
                    this.raisePropertyChanged('href');
                }
            }
            get id() { return this._id; }
            set id(v) {
                var x = this._id;
                if (v === null)
                    v = '';
                else
                    v = '' + v;
                if (x !== v) {
                    this._id = v;
                    this.href = this._baseUri + '/' + this._id;
                    this.raisePropertyChanged('id');
                }
            }
        }

        export class FileImgElView extends MOD.baseElView.BaseElView {
            _baseUri: string;
            _id: string;
            _fileName: string;

            _init(options) {
                super._init(options);
                this._baseUri = '';
                if (!!options.baseUri)
                    this._baseUri = options.baseUri;
                this._id = '';
                this._fileName = null;
            }
            reloadImg() {
                if (!this._el)
                    return;
                var src = this.src;
                var pos = src.indexOf('?');
                if (pos >= 0) {
                    src = src.substr(0, pos);
                }
                var date = new Date();
                this.src = src + '?v=' + date.getTime();
                return false;
            }
            get fileName() { return this._fileName; }
            set fileName(v) {
                var x = this._fileName;
                if (x !== v) {
                    this._fileName = v;
                    this.raisePropertyChanged('fileName');
                    this.reloadImg();
                }
            }
            get src() {
                if (!this._el)
                    return;
                return this.$el.prop('src')
            }
            set src(v) {
                if (!this._el)
                    return;
                var el = this.$el;
                var x = el.prop('src');
                if (v === null)
                    v = '';
                else
                    v = '' + v;
                if (x !== v) {
                    el.prop('src',v);
                    this.raisePropertyChanged('src');
                }
            }
            get id() { return this._id; }
            set id(v) {
                var x = this._id;
                if (v === null)
                    v = '';
                else
                    v = '' + v;
                if (x !== v) {
                    this._id = v;
                    if (!this._id)
                        this.src = null;
                    else
                        this.src = this._baseUri + '/' + this._id;
                    this.raisePropertyChanged('id');
                }
            }
        }

        export class ErrorViewModel extends MOD.mvvm.BaseViewModel {
            _error: any;
            _message: string;
            _title: string;
            _dialogVM: DialogVM;

            constructor(app: Application) {
                super(app);
                var self = this;
                this._error = null;
                this._message = null;
                this._title = '';
                this._dialogVM = new DialogVM(app);
                var dialogOptions: MOD.datadialog.IDialogConstructorOptions = {
                    templateID: 'errorTemplate',
                    width: 500,
                    height: 300,
                    title: '',
                    canCancel: false,
                    fn_OnShow: function (dialog) {
                        while (!!self.error && !!self.error.origError) {
                            //get real error
                            self._error = self.error.origError;
                            self.raisePropertyChanged('error');
                        }

                        if (self.error instanceof MOD.db.AccessDeniedError)
                            self.title = "ACCESS DENIED";
                        else if (self.error instanceof MOD.db.ConcurrencyError)
                            self.title = "CONCURRENCY ERROR";
                        else if (self.error instanceof MOD.binding.ValidationError)
                            self.title = "VALIDATION ERROR";
                        else if (self.error instanceof MOD.db.SvcValidationError)
                            self.title = "VALIDATION ERROR";
                        else if (self.error instanceof MOD.db.DataOperationError)
                            self.title = "DATA OPERATION ERROR";
                        else
                            self.title = "UNEXPECTED ERROR";

                        self.message = (!self.error.message) ? ('' + self.error) : self.error.message;
                        dialog.title = self.title;
                    },
                    fn_OnClose: function (dialog) {
                        self._error = null;
                        self.raisePropertyChanged('error');
                    }
                };
                //dialogs are distinguished by their given names
                this._dialogVM.createDialog('errorDialog', dialogOptions);
            }
            showDialog() {
                this._dialogVM.showDialog('errorDialog', this);
            }
            destroy() {
                if (this._isDestroyed)
                    return;
                this._isDestroyCalled = true;
                this._dialogVM.destroy();
                this._dialogVM = null;
                this._error = null;
                super.destroy();
            }
            get error() { return this._error; }
            set error(v) {
                var old = this._error;
                if (!!old) {
                    global._onError(v, null);
                    global._throwDummy(v);
                }
                this._error = v;
                this.raisePropertyChanged('error');
            }
            get title() { return this._title; }
            set title(v) {
                var old = this._title;
                if (old !== v) {
                    this._title = v;
                    this.raisePropertyChanged('title');
                }
            }
            get message() { return this._message; }
            set message(v) {
                var old = this._message;
                if (old !== v) {
                    this._message = v;
                    this.raisePropertyChanged('message');
                }
            }
        }

        export function initModule(app: Application) {
            app.registerConverter('notConverter', new NotConverter());
            app.registerElView('fileLink', DownloadLinkElView);
            app.registerElView('fileImage', FileImgElView);
            return COMMON;
        };
    }
}

var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="..\jriapp.ts"/>
var RIAPP;
(function (RIAPP) {
    (function (COMMON) {
        var global = RIAPP.global, utils = global.utils;
        var NotConverter = (function (_super) {
            __extends(NotConverter, _super);
            function NotConverter() {
                _super.apply(this, arguments);

            }
            NotConverter.prototype.convertToSource = function (val, param, dataContext) {
                return !val;
            };
            NotConverter.prototype.convertToTarget = function (val, param, dataContext) {
                return !val;
            };
            return NotConverter;
        })(RIAPP.MOD.converter.BaseConverter);
        COMMON.NotConverter = NotConverter;        
        var DialogVM = (function (_super) {
            __extends(DialogVM, _super);
            function DialogVM(app) {
                        _super.call(this, app);
                this._dialogs = {
                };
            }
            DialogVM.prototype.createDialog = function (name, options) {
                var self = this;
                var dialog = new RIAPP.MOD.datadialog.DataEditDialog(this._app, options);
                this._dialogs[name] = dialog;
                return dialog;
            };
            DialogVM.prototype.showDialog = function (name, dataContext) {
                var dialog = this.getDialog(name);
                if(!dialog) {
                    return null;
                }
                dialog.dataContext = dataContext;
                dialog.show();
                return dialog;
            };
            DialogVM.prototype.getDialog = function (name) {
                return this._dialogs[name];
            };
            DialogVM.prototype.destroy = function () {
                if(this._isDestroyed) {
                    return;
                }
                this._isDestroyCalled = true;
                var keys = Object.keys(this._dialogs);
                keys.forEach(function (key) {
                    this._dialogs[key].destroy();
                }, this);
                this._dialogs = {
                };
                _super.prototype.destroy.call(this);
            };
            return DialogVM;
        })(RIAPP.MOD.mvvm.BaseViewModel);
        COMMON.DialogVM = DialogVM;        
        var DownloadLinkElView = (function (_super) {
            __extends(DownloadLinkElView, _super);
            function DownloadLinkElView() {
                _super.apply(this, arguments);

            }
            DownloadLinkElView.prototype._init = function (options) {
                _super.prototype._init.call(this, options);
                this._baseUri = '';
                if(!!options.baseUri) {
                    this._baseUri = options.baseUri;
                }
                this._id = '';
            };
            Object.defineProperty(DownloadLinkElView.prototype, "text", {
                get: function () {
                    if(!this._el) {
                        return;
                    }
                    return this.$el.text();
                },
                set: function (v) {
                    if(!this._el) {
                        return;
                    }
                    var $el = this.$el;
                    var x = $el.text();
                    if(v === null) {
                        v = '';
                    } else {
                        v = '' + v;
                    }
                    if(x !== v) {
                        $el.text(v);
                        this.raisePropertyChanged('text');
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DownloadLinkElView.prototype, "href", {
                get: function () {
                    if(!this._el) {
                        return;
                    }
                    return this.$el.prop('href');
                },
                set: function (v) {
                    if(!this._el) {
                        return;
                    }
                    var x = this.$el.prop('href');
                    if(v === null) {
                        v = '';
                    } else {
                        v = '' + v;
                    }
                    if(x !== v) {
                        this.$el.prop('href', v);
                        this.raisePropertyChanged('href');
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DownloadLinkElView.prototype, "id", {
                get: function () {
                    return this._id;
                },
                set: function (v) {
                    var x = this._id;
                    if(v === null) {
                        v = '';
                    } else {
                        v = '' + v;
                    }
                    if(x !== v) {
                        this._id = v;
                        this.href = this._baseUri + '/' + this._id;
                        this.raisePropertyChanged('id');
                    }
                },
                enumerable: true,
                configurable: true
            });
            return DownloadLinkElView;
        })(RIAPP.MOD.baseElView.BaseElView);
        COMMON.DownloadLinkElView = DownloadLinkElView;        
        var FileImgElView = (function (_super) {
            __extends(FileImgElView, _super);
            function FileImgElView() {
                _super.apply(this, arguments);

            }
            FileImgElView.prototype._init = function (options) {
                _super.prototype._init.call(this, options);
                this._baseUri = '';
                if(!!options.baseUri) {
                    this._baseUri = options.baseUri;
                }
                this._id = '';
                this._fileName = null;
            };
            FileImgElView.prototype.reloadImg = function () {
                if(!this._el) {
                    return;
                }
                var src = this.src;
                var pos = src.indexOf('?');
                if(pos >= 0) {
                    src = src.substr(0, pos);
                }
                var date = new Date();
                this.src = src + '?v=' + date.getTime();
                return false;
            };
            Object.defineProperty(FileImgElView.prototype, "fileName", {
                get: function () {
                    return this._fileName;
                },
                set: function (v) {
                    var x = this._fileName;
                    if(x !== v) {
                        this._fileName = v;
                        this.raisePropertyChanged('fileName');
                        this.reloadImg();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FileImgElView.prototype, "src", {
                get: function () {
                    if(!this._el) {
                        return;
                    }
                    return this.$el.prop('src');
                },
                set: function (v) {
                    if(!this._el) {
                        return;
                    }
                    var el = this.$el;
                    var x = el.prop('src');
                    if(v === null) {
                        v = '';
                    } else {
                        v = '' + v;
                    }
                    if(x !== v) {
                        el.prop('src', v);
                        this.raisePropertyChanged('src');
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FileImgElView.prototype, "id", {
                get: function () {
                    return this._id;
                },
                set: function (v) {
                    var x = this._id;
                    if(v === null) {
                        v = '';
                    } else {
                        v = '' + v;
                    }
                    if(x !== v) {
                        this._id = v;
                        if(!this._id) {
                            this.src = null;
                        } else {
                            this.src = this._baseUri + '/' + this._id;
                        }
                        this.raisePropertyChanged('id');
                    }
                },
                enumerable: true,
                configurable: true
            });
            return FileImgElView;
        })(RIAPP.MOD.baseElView.BaseElView);
        COMMON.FileImgElView = FileImgElView;        
        var ErrorViewModel = (function (_super) {
            __extends(ErrorViewModel, _super);
            function ErrorViewModel(app) {
                        _super.call(this, app);
                var self = this;
                this._error = null;
                this._message = null;
                this._title = '';
                this._dialogVM = new DialogVM(app);
                var dialogOptions = {
                    templateID: 'errorTemplate',
                    width: 500,
                    height: 300,
                    title: '',
                    canCancel: false,
                    fn_OnShow: function (dialog) {
                        while(!!self.error && !!self.error.origError) {
                            //get real error
                            self._error = self.error.origError;
                            self.raisePropertyChanged('error');
                        }
                        if(self.error instanceof RIAPP.MOD.db.AccessDeniedError) {
                            self.title = "ACCESS DENIED";
                        } else if(self.error instanceof RIAPP.MOD.db.ConcurrencyError) {
                            self.title = "CONCURRENCY ERROR";
                        } else if(self.error instanceof RIAPP.MOD.binding.ValidationError) {
                            self.title = "VALIDATION ERROR";
                        } else if(self.error instanceof RIAPP.MOD.db.SvcValidationError) {
                            self.title = "VALIDATION ERROR";
                        } else if(self.error instanceof RIAPP.MOD.db.DataOperationError) {
                            self.title = "DATA OPERATION ERROR";
                        } else {
                            self.title = "UNEXPECTED ERROR";
                        }
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
            ErrorViewModel.prototype.showDialog = function () {
                this._dialogVM.showDialog('errorDialog', this);
            };
            ErrorViewModel.prototype.destroy = function () {
                if(this._isDestroyed) {
                    return;
                }
                this._isDestroyCalled = true;
                this._dialogVM.destroy();
                this._dialogVM = null;
                this._error = null;
                _super.prototype.destroy.call(this);
            };
            Object.defineProperty(ErrorViewModel.prototype, "error", {
                get: function () {
                    return this._error;
                },
                set: function (v) {
                    var old = this._error;
                    if(!!old) {
                        global._onError(v, null);
                        global._throwDummy(v);
                    }
                    this._error = v;
                    this.raisePropertyChanged('error');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ErrorViewModel.prototype, "title", {
                get: function () {
                    return this._title;
                },
                set: function (v) {
                    var old = this._title;
                    if(old !== v) {
                        this._title = v;
                        this.raisePropertyChanged('title');
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ErrorViewModel.prototype, "message", {
                get: function () {
                    return this._message;
                },
                set: function (v) {
                    var old = this._message;
                    if(old !== v) {
                        this._message = v;
                        this.raisePropertyChanged('message');
                    }
                },
                enumerable: true,
                configurable: true
            });
            return ErrorViewModel;
        })(RIAPP.MOD.mvvm.BaseViewModel);
        COMMON.ErrorViewModel = ErrorViewModel;        
        function initModule(app) {
            app.registerConverter('notConverter', new NotConverter());
            app.registerElView('fileLink', DownloadLinkElView);
            app.registerElView('fileImage', FileImgElView);
            return COMMON;
        }
        COMMON.initModule = initModule;
        ;
    })(RIAPP.COMMON || (RIAPP.COMMON = {}));
    var COMMON = RIAPP.COMMON;
})(RIAPP || (RIAPP = {}));
//@ sourceMappingURL=common.js.map

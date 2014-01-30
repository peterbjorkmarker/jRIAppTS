var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RIAPP;
(function (RIAPP) {
    (function (MOD) {
        (function (mvvm) {
            var Command = (function (_super) {
                __extends(Command, _super);
                function Command(fn_action, thisObj, fn_canExecute) {
                    _super.call(this);
                    var utils = RIAPP.global.utils;
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
                    this._objId = 'vm' + RIAPP.global.utils.getNewID();
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
//# sourceMappingURL=mvvm.js.map

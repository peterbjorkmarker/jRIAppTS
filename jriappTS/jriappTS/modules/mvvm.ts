module RIAPP {
    export module MOD {
        export module mvvm {
           //local variables for optimization
            var utils = global.utils, consts = global.consts;
            export interface ICommand {
                canExecute: (sender, param) => bool;
                execute: (sender, param) => void;
                raiseCanExecuteChanged: () => void;
            }

            export class Command extends RIAPP.BaseObject implements ICommand {
                _action: (sender, param) => void;
                _thisObj: any;
                _canExecute: (sender, param) => bool;
                _objId: string;

                constructor(fn_action: (sender, param) => void , thisObj, fn_canExecute: (sender, param) => bool) {
                    super();
                    this._action = fn_action;
                    this._thisObj = thisObj;
                    this._canExecute = fn_canExecute;
                    this._objId = 'cmd' + utils.getNewID();
                }
                _getEventNames() {
                    var base_events = super._getEventNames();
                    return ['canExecute_changed'].concat(base_events);
                }
                addOnCanExecuteChanged(fn: (sender: mvvm.Command, args: {}) => void , namespace?: string) {
                    this.addHandler('canExecute_changed', fn, namespace);
                }
                removeOnCanExecuteChanged(namespace?: string) {
                    this.removeHandler('canExecute_changed', namespace);
                }
                canExecute(sender, param):bool {
                    if (!this._canExecute)
                        return true;
                    return this._canExecute.apply(this._thisObj, [sender, param]);
                }
                execute(sender, param) {
                    if (!!this._action) {
                        this._action.apply(this._thisObj, [sender, param]);
                    }
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._action = null;
                    this._thisObj = null;
                    this._canExecute = null;
                    super.destroy();
                }
                raiseCanExecuteChanged() {
                    this.raiseEvent('canExecute_changed', {});
                }
                toString() {
                    return 'Command';
                }
            }

            export class BaseViewModel extends RIAPP.BaseObject {
                _objId: string;
                _app: Application;

                constructor(app: Application) {
                    super();
                    this._app = app;
                    this._objId = 'vm' + utils.getNewID();
                }
                _onError(error, source):bool {
                    var isHandled = super._onError(error, source);
                    if (!isHandled) {
                        return this._app._onError(error, source);
                    }
                    return isHandled;
                }
                toString() {
                    return 'BaseViewModel';
                }
                destroy() {
                    this._app = null;
                    super.destroy();
                }
                get uniqueID() {
                    return this._objId;
                }
                get $() { return global.$; }
                get app() { return this._app; }
            }

            global.registerType('Command', Command);
            global.registerType('BaseViewModel', BaseViewModel);
            global.onModuleLoaded('mvvm', mvvm);
        }
    }
}

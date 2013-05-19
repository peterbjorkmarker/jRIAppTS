module RIAPP {
    export module MOD {
        export module errors {
            export class BaseError extends RIAPP.BaseObject{
                _message: string;
                _isDummy: bool;
                _origError: any;

                constructor(message:string) {
                    super();
                    this._message = message;
                    this._isDummy = false;
                    this._origError = null;
                }
                static create(message:string) {
                    return new BaseError(message);
                }
                toString() {
                    return this._message;
                }
                get message() {
                    return this._message;
                }
                set message(v) {
                    this._message = v;
                }
                get isDummy() {
                    return this._isDummy;
                }
                set isDummy(v) {
                    this._isDummy = v;
                }
                get origError() {
                    return this._origError;
                }
                set origError(v) {
                    this._origError = v;
                }
            };

            export class DummyError extends BaseError{
                constructor(ex) {
                   super("DUMMY_ERROR");
                   this._origError = ex;
                   this._isDummy = true;
                }
                static create(ex) {
                    return new DummyError(ex);
                }
            };

            global.onModuleLoaded('errors', errors);
        }
    }
}

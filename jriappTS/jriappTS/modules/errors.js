var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RIAPP;
(function (RIAPP) {
    (function (MOD) {
        (function (errors) {
            var BaseError = (function (_super) {
                __extends(BaseError, _super);
                function BaseError(message) {
                                _super.call(this);
                    this._message = message;
                    this._isDummy = false;
                    this._origError = null;
                }
                BaseError.create = function create(message) {
                    return new BaseError(message);
                };
                BaseError.prototype.toString = function () {
                    return this._message;
                };
                Object.defineProperty(BaseError.prototype, "message", {
                    get: function () {
                        return this._message;
                    },
                    set: function (v) {
                        this._message = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseError.prototype, "isDummy", {
                    get: function () {
                        return this._isDummy;
                    },
                    set: function (v) {
                        this._isDummy = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseError.prototype, "origError", {
                    get: function () {
                        return this._origError;
                    },
                    set: function (v) {
                        this._origError = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                return BaseError;
            })(RIAPP.BaseObject);
            errors.BaseError = BaseError;            
            ;
            var DummyError = (function (_super) {
                __extends(DummyError, _super);
                function DummyError(ex) {
                                _super.call(this, "DUMMY_ERROR");
                    this._origError = ex;
                    this._isDummy = true;
                }
                DummyError.create = function create(ex) {
                    return new DummyError(ex);
                };
                return DummyError;
            })(BaseError);
            errors.DummyError = DummyError;            
            ;
            RIAPP.global.onModuleLoaded('errors', errors);
        })(MOD.errors || (MOD.errors = {}));
        var errors = MOD.errors;
    })(RIAPP.MOD || (RIAPP.MOD = {}));
    var MOD = RIAPP.MOD;
})(RIAPP || (RIAPP = {}));
//@ sourceMappingURL=errors.js.map

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RIAPP;
(function (RIAPP) {
    (function (MOD) {
        (function (datepicker) {
            var Datepicker = (function (_super) {
                __extends(Datepicker, _super);
                function Datepicker() {
                    _super.call(this);
                    this._dateFormat = null;
                    this._datepickerRegion = '';
                    var $ = RIAPP.global.$;
                    if (!$.datepicker) {
                        throw new Error(RIAPP.ERRS.ERR_JQUERY_DATEPICKER_NOTFOUND);
                    }
                    this.dateFormat = 'dd.mm.yy';
                }
                Datepicker.prototype.toString = function () {
                    return 'Datepicker';
                };
                Datepicker.prototype.attachTo = function ($el, options) {
                    if (!!options)
                        $el.datepicker(options);
                    else
                        $el.datepicker();
                };
                Datepicker.prototype.detachFrom = function ($el) {
                    RIAPP.global.utils.destroyJQueryPlugin($el, 'datepicker');
                };
                Datepicker.prototype.parseDate = function (str) {
                    return this.datePickerFn.parseDate(this.dateFormat, str);
                };
                Datepicker.prototype.formatDate = function (date) {
                    return this.datePickerFn.formatDate(this.dateFormat, date);
                };

                Object.defineProperty(Datepicker.prototype, "dateFormat", {
                    //uses jQuery datepicker format
                    get: function () {
                        if (!this._dateFormat) {
                            var regional = this.datePickerFn.regional[this._datepickerRegion];
                            return regional.dateFormat;
                        } else
                            return this._dateFormat;
                    },
                    set: function (v) {
                        if (this.dateFormat !== v) {
                            this._dateFormat = v;
                            var regional = this.datePickerFn.regional[this._datepickerRegion];
                            if (!!this._dateFormat) {
                                regional.dateFormat = this._dateFormat;
                                this.datePickerFn.setDefaults(regional);
                            }
                            this.raisePropertyChanged('dateFormat');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Datepicker.prototype, "datepickerRegion", {
                    get: function () {
                        return this._datepickerRegion;
                    },
                    set: function (v) {
                        if (!v)
                            v = "";
                        var oldDateFormat = this.dateFormat;
                        if (this._datepickerRegion !== v) {
                            var regional = this.datePickerFn.regional[v];
                            if (!!regional) {
                                this._datepickerRegion = v;
                                regional.dateFormat = oldDateFormat;
                                this.datePickerFn.setDefaults(regional);
                                this.raisePropertyChanged("datepickerRegion");
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Datepicker.prototype, "datePickerFn", {
                    get: function () {
                        var $ = RIAPP.global.$;
                        return $.datepicker;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Datepicker;
            })(RIAPP.BaseObject);
            datepicker.Datepicker = Datepicker;

            RIAPP.global.onModuleLoaded('datepicker', RIAPP.MOD.defaults);
        })(MOD.datepicker || (MOD.datepicker = {}));
        var datepicker = MOD.datepicker;
    })(RIAPP.MOD || (RIAPP.MOD = {}));
    var MOD = RIAPP.MOD;
})(RIAPP || (RIAPP = {}));
//# sourceMappingURL=datepicker.js.map

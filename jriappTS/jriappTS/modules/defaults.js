var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RIAPP;
(function (RIAPP) {
    (function (MOD) {
        (function (defaults) {
            var Defaults = (function (_super) {
                __extends(Defaults, _super);
                function Defaults() {
                                _super.call(this);
                    this._imagesPath = '';
                    this._datepickerRegional = '';
                    var $ = RIAPP.global.$;
                    if(!$.datepicker) {
                        throw new Error(RIAPP.ERRS.ERR_JQUERY_DATEPICKER_NOTFOUND);
                    }
                    this._datepickerDefaults = $.datepicker.regional[this._datepickerRegional];
                    this._dateTimeFormat = 'dd.MM.yyyy HH:mm:ss';
                    this._timeFormat = 'HH:mm:ss';
                    this._decimalPoint = ',';
                    this._thousandSep = ' ';
                    this._decPrecision = 2;
                    this._ajaxTimeOut = 600;
                }
                Defaults.create = function create() {
                    return new Defaults();
                };
                Defaults.prototype._setDatePickerRegion = function (v) {
                    var regional, $ = RIAPP.global.$;
                    if(!!v) {
                        regional = $.datepicker.regional[v];
                    } else {
                        regional = $.datepicker.regional[""];
                    }
                    this.datepickerDefaults = regional;
                };
                Defaults.prototype.toString = function () {
                    return 'Defaults';
                };
                Object.defineProperty(Defaults.prototype, "ajaxTimeOut", {
                    get: //timeout for server requests in seconds
                    function () {
                        return this._ajaxTimeOut;
                    },
                    set: function (v) {
                        if(this._ajaxTimeOut !== v) {
                            this._ajaxTimeOut = v;
                            this.raisePropertyChanged('ajaxTimeOut');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Defaults.prototype, "dateFormat", {
                    get: //uses jQuery datepicker format
                    function () {
                        return this._datepickerDefaults.dateFormat;
                    },
                    set: function (v) {
                        var $ = RIAPP.global.$;
                        if(this._datepickerDefaults.dateFormat !== v) {
                            this._datepickerDefaults.dateFormat = v;
                            $.datepicker.setDefaults(this._datepickerDefaults);
                            this.raisePropertyChanged('dateFormat');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Defaults.prototype, "timeFormat", {
                    get: //uses datejs format http://code.google.com/p/datejs/
                    function () {
                        return this._timeFormat;
                    },
                    set: function (v) {
                        if(this._timeFormat !== v) {
                            this._timeFormat = v;
                            this.raisePropertyChanged('timeFormat');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Defaults.prototype, "dateTimeFormat", {
                    get: //uses datejs format http://code.google.com/p/datejs/
                    function () {
                        return this._dateTimeFormat;
                    },
                    set: function (v) {
                        if(this._dateTimeFormat !== v) {
                            this._dateTimeFormat = v;
                            this.raisePropertyChanged('timeFormat');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Defaults.prototype, "datepickerDefaults", {
                    get: function () {
                        return this._datepickerDefaults;
                    },
                    set: function (v) {
                        var $ = RIAPP.global.$;
                        if(!v) {
                            v = $.datepicker.regional[this._datepickerRegional];
                        }
                        var old = this._datepickerDefaults;
                        this._datepickerDefaults = v;
                        $.datepicker.setDefaults(v);
                        if(old.dateFormat !== v.dateFormat) {
                            this.raisePropertyChanged('dateFormat');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Defaults.prototype, "datepickerRegional", {
                    get: function () {
                        return this._datepickerRegional;
                    },
                    set: function (v) {
                        if(!v) {
                            v = "";
                        }
                        if(this._datepickerRegional !== v) {
                            this._datepickerRegional = v;
                            this._setDatePickerRegion(v);
                            this.raisePropertyChanged("datepickerRegional");
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Defaults.prototype, "imagesPath", {
                    get: /*
                    path where application images are stored
                    */
                    function () {
                        return this._imagesPath;
                    },
                    set: function (v) {
                        if(!v) {
                            v = "";
                        }
                        if(this._imagesPath !== v) {
                            if(!RIAPP.baseUtils.endsWith(v, '/')) {
                                this._imagesPath = v + '/';
                            } else {
                                this._imagesPath = v;
                            }
                            this.raisePropertyChanged("imagesPath");
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Defaults.prototype, "decimalPoint", {
                    get: function () {
                        return this._decimalPoint;
                    },
                    set: function (v) {
                        if(this._decimalPoint !== v) {
                            this._decimalPoint = v;
                            this.raisePropertyChanged("decimalPoint");
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Defaults.prototype, "thousandSep", {
                    get: function () {
                        return this._thousandSep;
                    },
                    set: function (v) {
                        if(this._thousandSep !== v) {
                            this._thousandSep = v;
                            this.raisePropertyChanged("thousandSep");
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Defaults.prototype, "decPrecision", {
                    get: //money decimal presision defaults to 2
                    function () {
                        return this._decPrecision;
                    },
                    set: function (v) {
                        if(this._decPrecision !== v) {
                            this._decPrecision = v;
                            this.raisePropertyChanged("decPrecision");
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return Defaults;
            })(RIAPP.BaseObject);
            defaults.Defaults = Defaults;            
            ;
            RIAPP.global.onModuleLoaded('defaults', defaults);
        })(MOD.defaults || (MOD.defaults = {}));
        var defaults = MOD.defaults;
    })(RIAPP.MOD || (RIAPP.MOD = {}));
    var MOD = RIAPP.MOD;
})(RIAPP || (RIAPP = {}));
//@ sourceMappingURL=defaults.js.map

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
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
                    this._datepicker = null;
                    this._dateFormat = 'DD.MM.YYYY';
                    this._dateTimeFormat = 'DD.MM.YYYY HH:mm:ss';
                    this._timeFormat = 'HH:mm:ss';
                    this._imagesPath = '/Scripts/jriapp/img/';
                    this._decimalPoint = ',';
                    this._thousandSep = ' ';
                    this._decPrecision = 2;
                    this._ajaxTimeOut = 600;
                }
                Defaults.prototype.toString = function () {
                    return 'Defaults';
                };

                Object.defineProperty(Defaults.prototype, "ajaxTimeOut", {
                    //timeout for server requests in seconds
                    get: function () {
                        return this._ajaxTimeOut;
                    },
                    set: function (v) {
                        if (this._ajaxTimeOut !== v) {
                            this._ajaxTimeOut = v;
                            this.raisePropertyChanged('ajaxTimeOut');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Defaults.prototype, "dateFormat", {
                    //uses moment.js format
                    get: function () {
                        return this._dateFormat;
                    },
                    set: function (v) {
                        if (this._dateFormat !== v) {
                            this._dateFormat = v;
                            this.raisePropertyChanged('dateFormat');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Defaults.prototype, "timeFormat", {
                    //uses moment.js format
                    get: function () {
                        return this._timeFormat;
                    },
                    set: function (v) {
                        if (this._timeFormat !== v) {
                            this._timeFormat = v;
                            this.raisePropertyChanged('timeFormat');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Defaults.prototype, "dateTimeFormat", {
                    get: function () {
                        return this._dateTimeFormat;
                    },
                    set: function (v) {
                        if (this._dateTimeFormat !== v) {
                            this._dateTimeFormat = v;
                            this.raisePropertyChanged('dateTimeFormat');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Defaults.prototype, "datepicker", {
                    get: function () {
                        return this._datepicker;
                    },
                    set: function (v) {
                        if (this._datepicker !== v) {
                            this._datepicker = v;
                            this.raisePropertyChanged("datepicker");
                        }
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Defaults.prototype, "imagesPath", {
                    //path to where application images are stored
                    get: function () {
                        return this._imagesPath;
                    },
                    set: function (v) {
                        if (!v)
                            v = "";
                        if (this._imagesPath !== v) {
                            if (!RIAPP.baseUtils.endsWith(v, '/')) {
                                this._imagesPath = v + '/';
                            } else
                                this._imagesPath = v;
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
                        if (this._decimalPoint !== v) {
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
                        if (this._thousandSep !== v) {
                            this._thousandSep = v;
                            this.raisePropertyChanged("thousandSep");
                        }
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Defaults.prototype, "decPrecision", {
                    //money decimal presision: defaults to 2
                    get: function () {
                        return this._decPrecision;
                    },
                    set: function (v) {
                        if (this._decPrecision !== v) {
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

            RIAPP.global.onModuleLoaded('defaults', defaults);
        })(MOD.defaults || (MOD.defaults = {}));
        var defaults = MOD.defaults;
    })(RIAPP.MOD || (RIAPP.MOD = {}));
    var MOD = RIAPP.MOD;
})(RIAPP || (RIAPP = {}));
//# sourceMappingURL=defaults.js.map

module RIAPP {
    export module MOD {
        export module defaults {
            export class Defaults extends RIAPP.BaseObject{
                _imagesPath: string;
                _datepickerRegional: string;
                _datepickerDefaults: any;
                _dateTimeFormat: string;
                _timeFormat: string;
                _decimalPoint: string;
                _thousandSep: string;
                _decPrecision: number;
                _ajaxTimeOut: number;

                constructor() {
                    super();
                    this._imagesPath = '';
                    this._datepickerRegional = '';
                    var $: any = global.$;
                    if (!$.datepicker) {
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
                static create() {
                    return new Defaults();
                }
                _setDatePickerRegion(v) {
                    var regional, $: any = global.$;
                    if (!!v) {
                        regional = $.datepicker.regional[v];
                    }
                    else {
                        regional = $.datepicker.regional[""];
                    }
                    this.datepickerDefaults = regional;
                }
                toString() {
                    return 'Defaults';
                }
                //timeout for server requests in seconds
                get ajaxTimeOut() {
                    return this._ajaxTimeOut;
                }
                set ajaxTimeOut(v: number) {
                    if (this._ajaxTimeOut !== v) {
                        this._ajaxTimeOut = v;
                        this.raisePropertyChanged('ajaxTimeOut');
                    }
                }
                //uses jQuery datepicker format
                get dateFormat() { return this._datepickerDefaults.dateFormat; }
                set dateFormat(v) {
                    var $: any = global.$;
                    if (this._datepickerDefaults.dateFormat !== v) {
                        this._datepickerDefaults.dateFormat = v;
                        $.datepicker.setDefaults(this._datepickerDefaults);
                        this.raisePropertyChanged('dateFormat');
                    }
                }
                //uses datejs format http://code.google.com/p/datejs/
                get timeFormat() { return this._timeFormat; }
                set timeFormat(v) {
                    if (this._timeFormat !== v) {
                        this._timeFormat = v;
                        this.raisePropertyChanged('timeFormat');
                    }
                }
                //uses datejs format http://code.google.com/p/datejs/
                get dateTimeFormat() { return this._dateTimeFormat; }
                set dateTimeFormat(v) {
                    if (this._dateTimeFormat !== v) {
                        this._dateTimeFormat = v;
                        this.raisePropertyChanged('timeFormat');
                    }
                }
                get datepickerDefaults() { return this._datepickerDefaults; }
                set datepickerDefaults(v) {
                    var $: any = global.$;
                    if (!v)
                        v = $.datepicker.regional[this._datepickerRegional];
                    var old = this._datepickerDefaults;
                    this._datepickerDefaults = v;
                    $.datepicker.setDefaults(v);
                    if (old.dateFormat !== v.dateFormat) {
                        this.raisePropertyChanged('dateFormat');
                    }
                }
                get datepickerRegional() { return this._datepickerRegional; }
                set datepickerRegional(v) {
                    if (!v)
                        v = "";
                    if (this._datepickerRegional !== v) {
                        this._datepickerRegional = v;
                        this._setDatePickerRegion(v);
                        this.raisePropertyChanged("datepickerRegional");
                    }
                }
                /*
                 path where application images are stored
                 */
                get imagesPath() { return this._imagesPath; }
                set imagesPath(v) {
                    if (!v)
                        v = "";
                    if (this._imagesPath !== v) {
                        if (!RIAPP.baseUtils.endsWith(v, '/')) {
                            this._imagesPath = v + '/';
                        }
                        else
                            this._imagesPath = v;
                        this.raisePropertyChanged("imagesPath");
                    }
                }
                get decimalPoint() { return this._decimalPoint; }
                set decimalPoint(v) {
                    if (this._decimalPoint !== v) {
                        this._decimalPoint = v;
                        this.raisePropertyChanged("decimalPoint");
                    }
                }
                get thousandSep() { return this._thousandSep; }
                set thousandSep(v) {
                    if (this._thousandSep !== v) {
                        this._thousandSep = v;
                        this.raisePropertyChanged("thousandSep");
                    }
                }
                //money decimal presision defaults to 2
                get decPrecision() { return this._decPrecision; }
                set decPrecision(v) {
                    if (this._decPrecision !== v) {
                        this._decPrecision = v;
                        this.raisePropertyChanged("decPrecision");
                    } }
            };

            global.onModuleLoaded('defaults', defaults);
        }
    }
}

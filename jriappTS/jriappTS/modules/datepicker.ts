module RIAPP {
    export module MOD {
        export module datepicker {
            export class Datepicker extends RIAPP.BaseObject implements utils.IDatepicker{
                private _datepickerRegion: string;
                private _dateFormat: string;
                
                constructor() {
                    super();
                    this._dateFormat = null;
                    this._datepickerRegion = '';
                    var $: any = RIAPP.global.$;
                    if (!$.datepicker) {
                        throw new Error(RIAPP.ERRS.ERR_JQUERY_DATEPICKER_NOTFOUND);
                    }
                    this.dateFormat = 'dd.mm.yy';
                }
                toString() {
                    return 'Datepicker';
                }
                attachTo($el: any, options?: { dateFormat?: string; }) {
                    if (!!options)
                        $el.datepicker(options);
                    else
                        $el.datepicker();
                }
                detachFrom($el: any) {
                    RIAPP.global.utils.destroyJQueryPlugin($el, 'datepicker');
                }
                parseDate(str: string): Date {
                    return this.datePickerFn.parseDate(this.dateFormat, str);
                }
                formatDate(date: Date): string {
                    return this.datePickerFn.formatDate(this.dateFormat, date);
                }
                //uses jQuery datepicker format
                get dateFormat(): string {
                    if (!this._dateFormat) {
                        var regional = this.datePickerFn.regional[this._datepickerRegion];
                        return regional.dateFormat;
                    }
                    else
                        return this._dateFormat;
                }
                set dateFormat(v:string) {
                    if (this.dateFormat !== v) {
                        this._dateFormat = v;
                        var regional = this.datePickerFn.regional[this._datepickerRegion];
                        if (!!this._dateFormat) {
                            regional.dateFormat = this._dateFormat;
                            this.datePickerFn.setDefaults(regional);
                        }
                        this.raisePropertyChanged('dateFormat');
                    }
                }
                get datepickerRegion() { return this._datepickerRegion; }
                set datepickerRegion(v) {
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
                }
                get datePickerFn() {
                    var $: any = RIAPP.global.$;
                    return $.datepicker;
                }
            }

            global.onModuleLoaded('datepicker', defaults);
        }
    }
}

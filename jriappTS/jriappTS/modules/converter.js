var RIAPP;
(function (RIAPP) {
    (function (MOD) {
        (function (converter) {
            converter.NUM_CONV = { None: 0, Integer: 1, Decimal: 2, Float: 3, SmallInt: 4 };

            var BaseConverter = (function () {
                function BaseConverter() {
                }
                BaseConverter.prototype.convertToSource = function (val, param, dataContext) {
                    return val;
                };
                BaseConverter.prototype.convertToTarget = function (val, param, dataContext) {
                    if (RIAPP.global.utils.check.isNt(val))
                        return null;
                    return val;
                };
                return BaseConverter;
            })();
            converter.BaseConverter = BaseConverter;
            ;
            var baseConverter = new BaseConverter();

            var DateConverter = (function () {
                function DateConverter() {
                }
                DateConverter.prototype.convertToSource = function (val, param, dataContext) {
                    if (!val)
                        return null;
                    var datepicker = RIAPP.global.defaults.datepicker;
                    return datepicker.parseDate(val);
                };
                DateConverter.prototype.convertToTarget = function (val, param, dataContext) {
                    if (RIAPP.global.utils.check.isNt(val))
                        return '';
                    var datepicker = RIAPP.global.defaults.datepicker;
                    return datepicker.formatDate(val);
                };
                DateConverter.prototype.toString = function () {
                    return 'DateConverter';
                };
                return DateConverter;
            })();
            converter.DateConverter = DateConverter;
            ;
            var dateConverter = new DateConverter();

            var DateTimeConverter = (function () {
                function DateTimeConverter() {
                }
                DateTimeConverter.prototype.convertToSource = function (val, param, dataContext) {
                    if (!val)
                        return null;
                    var m = moment(val, param);
                    if (!m.isValid()) {
                        throw new Error(RIAPP.global.utils.format(RIAPP.ERRS.ERR_CONV_INVALID_DATE, val));
                    }
                    return m.toDate();
                };
                DateTimeConverter.prototype.convertToTarget = function (val, param, dataContext) {
                    if (RIAPP.global.utils.check.isNt(val)) {
                        return '';
                    }
                    var m = moment(val);
                    return m.format(param);
                };
                DateTimeConverter.prototype.toString = function () {
                    return 'DateTimeConverter';
                };
                return DateTimeConverter;
            })();
            converter.DateTimeConverter = DateTimeConverter;
            ;
            var dateTimeConverter = new DateTimeConverter();

            var NumberConverter = (function () {
                function NumberConverter() {
                }
                NumberConverter.prototype.convertToSource = function (val, param, dataContext) {
                    var utils = RIAPP.global.utils;
                    if (RIAPP.global.utils.check.isNt(val))
                        return null;
                    var defaults = RIAPP.global.defaults, dp = defaults.decimalPoint, thousand_sep = defaults.thousandSep, prec = 4;
                    var value = val.replace(thousand_sep, '');
                    value = value.replace(dp, '.');
                    value = RIAPP.global.utils.str.stripNonNumeric(value);
                    if (value === '') {
                        return null;
                    }
                    var num = null;
                    switch (param) {
                        case converter.NUM_CONV.SmallInt:
                            num = parseInt(value, 10);
                            break;
                        case converter.NUM_CONV.Integer:
                            num = parseInt(value, 10);
                            break;
                        case converter.NUM_CONV.Decimal:
                            prec = defaults.decPrecision;
                            num = utils.round(parseFloat(value), prec);
                            break;
                        case converter.NUM_CONV.Float:
                            num = parseFloat(value);
                            break;
                        default:
                            num = Number(value);
                    }

                    if (!utils.check.isNumber(num)) {
                        throw new Error(utils.format(RIAPP.ERRS.ERR_CONV_INVALID_NUM, val));
                    }
                    return num;
                };
                NumberConverter.prototype.convertToTarget = function (val, param, dataContext) {
                    var utils = RIAPP.global.utils;
                    if (utils.check.isNt(val)) {
                        return '';
                    }
                    var defaults = RIAPP.global.defaults, dp = defaults.decimalPoint, thousand_sep = defaults.thousandSep, prec;
                    switch (param) {
                        case converter.NUM_CONV.Integer:
                            prec = 0;
                            return utils.str.formatNumber(val, prec, dp, thousand_sep);
                        case converter.NUM_CONV.Decimal:
                            prec = defaults.decPrecision;
                            return utils.str.formatNumber(val, prec, dp, thousand_sep);
                        case converter.NUM_CONV.SmallInt:
                            prec = 0;
                            return utils.str.formatNumber(val, prec, dp, '');
                        case converter.NUM_CONV.Float:
                            //float number type preserves all number precision
                            return utils.str.formatNumber(val, null, dp, thousand_sep);
                            break;
                        default:
                            return utils.str.formatNumber(val, null, dp, thousand_sep);
                    }
                };
                NumberConverter.prototype.toString = function () {
                    return 'NumberConverter';
                };
                return NumberConverter;
            })();
            converter.NumberConverter = NumberConverter;
            ;
            var numberConverter = new NumberConverter();

            var IntegerConverter = (function () {
                function IntegerConverter() {
                }
                IntegerConverter.prototype.convertToSource = function (val, param, dataContext) {
                    return numberConverter.convertToSource(val, converter.NUM_CONV.Integer, dataContext);
                };
                IntegerConverter.prototype.convertToTarget = function (val, param, dataContext) {
                    return numberConverter.convertToTarget(val, converter.NUM_CONV.Integer, dataContext);
                };
                IntegerConverter.prototype.toString = function () {
                    return 'IntegerConverter';
                };
                return IntegerConverter;
            })();
            converter.IntegerConverter = IntegerConverter;
            ;
            var integerConverter = new IntegerConverter();

            var SmallIntConverter = (function () {
                function SmallIntConverter() {
                }
                SmallIntConverter.prototype.convertToSource = function (val, param, dataContext) {
                    return numberConverter.convertToSource(val, converter.NUM_CONV.SmallInt, dataContext);
                };
                SmallIntConverter.prototype.convertToTarget = function (val, param, dataContext) {
                    return numberConverter.convertToTarget(val, converter.NUM_CONV.SmallInt, dataContext);
                };
                SmallIntConverter.prototype.toString = function () {
                    return 'SmallIntConverter';
                };
                return SmallIntConverter;
            })();
            converter.SmallIntConverter = SmallIntConverter;
            ;
            var smallIntConverter = new SmallIntConverter();

            var DecimalConverter = (function () {
                function DecimalConverter() {
                }
                DecimalConverter.prototype.convertToSource = function (val, param, dataContext) {
                    return numberConverter.convertToSource(val, converter.NUM_CONV.Decimal, dataContext);
                };
                DecimalConverter.prototype.convertToTarget = function (val, param, dataContext) {
                    return numberConverter.convertToTarget(val, converter.NUM_CONV.Decimal, dataContext);
                };
                DecimalConverter.prototype.toString = function () {
                    return 'DecimalConverter';
                };
                return DecimalConverter;
            })();
            converter.DecimalConverter = DecimalConverter;
            ;
            var decimalConverter = new DecimalConverter();

            var FloatConverter = (function () {
                function FloatConverter() {
                }
                FloatConverter.prototype.convertToSource = function (val, param, dataContext) {
                    return numberConverter.convertToSource(val, converter.NUM_CONV.Float, dataContext);
                };
                FloatConverter.prototype.convertToTarget = function (val, param, dataContext) {
                    return numberConverter.convertToTarget(val, converter.NUM_CONV.Float, dataContext);
                };
                FloatConverter.prototype.toString = function () {
                    return 'FloatConverter';
                };
                return FloatConverter;
            })();
            converter.FloatConverter = FloatConverter;
            ;
            var floatConverter = new FloatConverter();

            RIAPP.global.registerConverter('BaseConverter', baseConverter);
            RIAPP.global.registerConverter('dateConverter', dateConverter);
            RIAPP.global.registerConverter('dateTimeConverter', dateTimeConverter);
            RIAPP.global.registerConverter('numberConverter', numberConverter);
            RIAPP.global.registerConverter('integerConverter', integerConverter);
            RIAPP.global.registerConverter('smallIntConverter', smallIntConverter);
            RIAPP.global.registerConverter('decimalConverter', decimalConverter);
            RIAPP.global.registerConverter('floatConverter', floatConverter);
            RIAPP.global.onModuleLoaded('converter', converter);
        })(MOD.converter || (MOD.converter = {}));
        var converter = MOD.converter;
    })(RIAPP.MOD || (RIAPP.MOD = {}));
    var MOD = RIAPP.MOD;
})(RIAPP || (RIAPP = {}));
//# sourceMappingURL=converter.js.map

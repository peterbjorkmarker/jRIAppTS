var RIAPP;
(function (RIAPP) {
    (function (MOD) {
        (function (consts) {
            consts.DATA_ATTR = {
                EL_VIEW_KEY: 'data-elvwkey',
                DATA_BIND: 'data-bind',
                DATA_VIEW: 'data-view',
                DATA_EVENT_SCOPE: 'data-scope',
                DATA_ITEM_KEY: 'data-key',
                DATA_CONTENT: 'data-content',
                DATA_COLUMN: 'data-column',
                DATA_NAME: 'data-name',
                DATA_FORM: 'data-form'
            };
            (function (DATE_CONVERSION) {
                DATE_CONVERSION[DATE_CONVERSION["None"] = 0] = "None";
                DATE_CONVERSION[DATE_CONVERSION["ServerLocalToClientLocal"] = 1] = "ServerLocalToClientLocal";
                DATE_CONVERSION[DATE_CONVERSION["UtcToClientLocal"] = 2] = "UtcToClientLocal";
            })(consts.DATE_CONVERSION || (consts.DATE_CONVERSION = {}));
            var DATE_CONVERSION = consts.DATE_CONVERSION;
            (function (DATA_TYPE) {
                DATA_TYPE[DATA_TYPE["None"] = 0] = "None";
                DATA_TYPE[DATA_TYPE["String"] = 1] = "String";
                DATA_TYPE[DATA_TYPE["Bool"] = 2] = "Bool";
                DATA_TYPE[DATA_TYPE["Integer"] = 3] = "Integer";
                DATA_TYPE[DATA_TYPE["Decimal"] = 4] = "Decimal";
                DATA_TYPE[DATA_TYPE["Float"] = 5] = "Float";
                DATA_TYPE[DATA_TYPE["DateTime"] = 6] = "DateTime";
                DATA_TYPE[DATA_TYPE["Date"] = 7] = "Date";
                DATA_TYPE[DATA_TYPE["Time"] = 8] = "Time";
                DATA_TYPE[DATA_TYPE["Guid"] = 9] = "Guid";
                DATA_TYPE[DATA_TYPE["Binary"] = 10] = "Binary";
            })(consts.DATA_TYPE || (consts.DATA_TYPE = {}));
            var DATA_TYPE = consts.DATA_TYPE;
            (function (KEYS) {
                KEYS[KEYS["backspace"] = 8] = "backspace";
                KEYS[KEYS["tab"] = 9] = "tab";
                KEYS[KEYS["enter"] = 13] = "enter";
                KEYS[KEYS["esc"] = 27] = "esc";
                KEYS[KEYS["space"] = 32] = "space";
                KEYS[KEYS["pageUp"] = 33] = "pageUp";
                KEYS[KEYS["pageDown"] = 34] = "pageDown";
                KEYS[KEYS["end"] = 35] = "end";
                KEYS[KEYS["home"] = 36] = "home";
                KEYS[KEYS["left"] = 37] = "left";
                KEYS[KEYS["up"] = 38] = "up";
                KEYS[KEYS["right"] = 39] = "right";
                KEYS[KEYS["down"] = 40] = "down";
                KEYS[KEYS["del"] = 127] = "del";
            })(consts.KEYS || (consts.KEYS = {}));
            var KEYS = consts.KEYS;
            consts.ELVIEW_NM = { DATAFORM: 'dataform', DYNACONT: 'dynacontent' };
            consts.LOADER_GIF = { SMALL: 'loader2.gif', NORMAL: 'loader.gif' };

            RIAPP.global.onModuleLoaded('consts', consts);
        })(MOD.consts || (MOD.consts = {}));
        var consts = MOD.consts;
    })(RIAPP.MOD || (RIAPP.MOD = {}));
    var MOD = RIAPP.MOD;
})(RIAPP || (RIAPP = {}));
//# sourceMappingURL=consts.js.map

var RIAPP;
(function (RIAPP) {
    (function (AMOD) {
        (function (content) {
            //local variables for optimization
                        var app, global, utils, consts;
            content.initModule = function (app_param) {
                app = app_param;
                global = RIAPP.global;
                utils = global.utils;
                consts = global.consts;
                return content;
            };
        })(AMOD.content || (AMOD.content = {}));
        var content = AMOD.content;
    })(RIAPP.AMOD || (RIAPP.AMOD = {}));
    var AMOD = RIAPP.AMOD;
})(RIAPP || (RIAPP = {}));
//@ sourceMappingURL=content.js.map

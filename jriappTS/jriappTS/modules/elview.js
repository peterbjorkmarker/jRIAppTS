var RIAPP;
(function (RIAPP) {
    (function (AMOD) {
        (function (elview) {
            //local variables for optimization
                        var app, global, utils, consts;
            elview.initModule = function (app_param) {
                app = app_param;
                global = RIAPP.global;
                utils = global.utils;
                consts = global.consts;
                return elview;
            };
        })(AMOD.elview || (AMOD.elview = {}));
        var elview = AMOD.elview;
    })(RIAPP.AMOD || (RIAPP.AMOD = {}));
    var AMOD = RIAPP.AMOD;
})(RIAPP || (RIAPP = {}));
//@ sourceMappingURL=elview.js.map

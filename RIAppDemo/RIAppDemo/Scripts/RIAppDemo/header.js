var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="..\jriapp.ts"/>
var RIAPP;
(function (RIAPP) {
    (function (HEADER) {
        var global = RIAPP.global, utils = global.utils;
        HEADER.topPanel;
        HEADER.contentPanel;
        HEADER.topPanel = "#demoHeader";
        HEADER.contentPanel = "#demoContent";

        var HeaderVM = (function (_super) {
            __extends(HeaderVM, _super);
            function HeaderVM(app) {
                _super.call(this, app);
                var self = this;
                this._$topPanel = global.$(HEADER.topPanel);
                this._$contentPanel = global.$(HEADER.contentPanel);
                this._contentPanelHeight = 0;
                if (!!this._$contentPanel)
                    this._contentPanelHeight = this._$contentPanel.height();

                this._expanderCommand = new RIAPP.MOD.mvvm.Command(function (sender, param) {
                    if (sender.isExpanded) {
                        self.expand();
                    } else
                        self.collapse();
                }, self, null);
            }
            HeaderVM.prototype.expand = function () {
                var self = this;
                this._$topPanel.slideDown('fast', function () {
                    self.updateUI(false);
                });
            };
            HeaderVM.prototype.collapse = function () {
                var self = this;
                this._$topPanel.slideUp('fast', function () {
                    self.updateUI(true);
                });
            };
            HeaderVM.prototype.updateUI = function (isUp) {
                if (!!this._$contentPanel) {
                    if (isUp)
                        this._$contentPanel.height(this._contentPanelHeight); else
                        this._$contentPanel.height(this._contentPanelHeight - this._$topPanel.height());
                }
            };
            Object.defineProperty(HeaderVM.prototype, "expanderCommand", {
                get: function () {
                    return this._expanderCommand;
                },
                enumerable: true,
                configurable: true
            });
            return HeaderVM;
        })(RIAPP.MOD.mvvm.BaseViewModel);
        HEADER.HeaderVM = HeaderVM;

        function initModule(app) {
            return HEADER;
        }
        HEADER.initModule = initModule;
        ;
    })(RIAPP.HEADER || (RIAPP.HEADER = {}));
    var HEADER = RIAPP.HEADER;
})(RIAPP || (RIAPP = {}));
//@ sourceMappingURL=header.js.map

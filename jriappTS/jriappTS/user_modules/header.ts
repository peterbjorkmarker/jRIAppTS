/// <reference path="..\jriapp.ts"/>
module RIAPP
{
    export module HEADER {
        var global = RIAPP.global, utils = global.utils;
        export var topPanel: string;
        export var contentPanel: string;
        topPanel = "#demoHeader";
        contentPanel = "#demoContent";

        export class HeaderVM extends MOD.mvvm.BaseViewModel {
            _$topPanel: JQuery;
            _$contentPanel: JQuery;
            _contentPanelHeight: number;
            _expanderCommand: MOD.mvvm.ICommand;

            constructor(app: Application) {
                super(app);
                var self = this;
                this._$topPanel = global.$(topPanel);
                this._$contentPanel = global.$(contentPanel);
                this._contentPanelHeight = 0;
                if (!!this._$contentPanel)
                    this._contentPanelHeight = this._$contentPanel.height();

                this._expanderCommand = new MOD.mvvm.Command(function (sender, param) {
                    if (sender.isExpanded) {
                        self.expand();
                    }
                    else
                        self.collapse();
                }, self, null);

            }
            expand() {
                var self = this;
                this._$topPanel.slideDown('fast', function () { self.updateUI(false); });
            }
            collapse() {
                var self = this;
                this._$topPanel.slideUp('fast', function () { self.updateUI(true); });
            }
            updateUI(isUp:bool) {
                if (!!this._$contentPanel) {
                    if (isUp)
                        this._$contentPanel.height(this._contentPanelHeight);
                    else
                        this._$contentPanel.height(this._contentPanelHeight - this._$topPanel.height());
                }
            }
            get expanderCommand() { return this._expanderCommand; }
        }

        export function initModule(app: Application) {
           
            return HEADER;
        };
    }
}

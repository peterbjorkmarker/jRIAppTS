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
            _getEventNames() {
                var base_events = super._getEventNames();
                return ['updateUI'].concat(base_events);
            }
            addOnUpdateUI(fn: (sender: HeaderVM, args: { isHandled: boolean; isUp: boolean; }) => void , namespace?: string) {
                this.addHandler('updateUI', fn, namespace);
            }
            expand() {
                var self = this;
                this._$topPanel.slideDown('fast', function () { self.updateUI(false); });
            }
            collapse() {
                var self = this;
                this._$topPanel.slideUp('fast', function () { self.updateUI(true); });
            }
            updateUI(isUp: boolean) {
                var args = { isHandled: false, isUp: isUp };
                this.raiseEvent('updateUI', args);
                if (args.isHandled)
                    return;
                if (!!this._$contentPanel) {
                    if (isUp)
                        this._$contentPanel.height(this._contentPanelHeight);
                    else
                        this._$contentPanel.height(this._contentPanelHeight - this._$topPanel.outerHeight());
                }
            }
            get expanderCommand() { return this._expanderCommand; }
            get $contentPanel() { return this._$contentPanel; }
            get $topPanel() { return this._$topPanel; }
        }

        export function initModule(app: Application) {
           
            return HEADER;
        };
    }
}

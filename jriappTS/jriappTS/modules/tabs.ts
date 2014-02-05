module RIAPP {
    export module MOD {
        export module tabs {
            import mvvmMOD = RIAPP.MOD.mvvm;
            import elviewMOD = MOD.baseElView;

            export class TabsElView extends elviewMOD.BaseElView {
                private _tabsEventCommand: mvvmMOD.ICommand;
                private _tabOpts: any;

                _init(options) {
                    super._init(options);
                    this._tabsEventCommand = null;
                    this._tabOpts = options;
                    this._createTabs();
                }
                _createTabs() {
                    var $el = this.$el, self = this, tabOpts = {
                        activate: function (e, tab) {
                            var active = (<any>$el).tabs("option", "active");
                            self.invokeTabsEvent("select", { index: active, el: $el });
                            self.raisePropertyChanged('tabIndex');
                        },
                        load: function (e, tab) {
                            var active = (<any>$el).tabs("option", "active");
                            self.invokeTabsEvent("load", { index: active, el: $el });
                            self.raisePropertyChanged('tabIndex');
                        }
                    };
                    tabOpts = RIAPP.global.utils.extend(false, tabOpts, self._tabOpts);
                    (<any>$el).tabs(tabOpts);
                    setTimeout(() => {
                        if (self._isDestroyCalled)
                            return;
                        self.invokeTabsEvent("create", { el: $el });
                        var active = (<any>$el).tabs("option", "active");
                        self.invokeTabsEvent("select", { index: active, el: $el });
                        self.raisePropertyChanged('tabIndex');
                    }, 100);
                }
                _destroyTabs() {
                    var $el = this.$el;
                    RIAPP.global.utils.destroyJQueryPlugin($el, 'tabs');
                }
                invokeTabsEvent(eventName: string, args) {
                    var self = this, data = { eventName: eventName, args: args };
                    if (!!self._tabsEventCommand) {
                        self._tabsEventCommand.execute(self, data);
                    }
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._tabsEventCommand = null;
                    this._destroyTabs();
                    super.destroy();
                }
                toString() {
                    return 'TabsElView';
                }
                get tabsEventCommand() { return this._tabsEventCommand; }
                set tabsEventCommand(v) {
                    var old = this._tabsEventCommand;
                    if (v !== old) {
                        if (!!old) {
                            this._destroyTabs();
                        }
                        this._tabsEventCommand = v;
                        if (!!this._tabsEventCommand)
                            this._createTabs();
                    }
                }
                get tabIndex(): number {
                    return (<any>this.$el).tabs("option", "active");
                }
                set tabIndex(v: number) {
                    (<any>this.$el).tabs("option", "active", v);
                }
            }


            global.registerElView('tabs', TabsElView);
            global.onModuleLoaded('tabs', tabs);
        }
    }
}

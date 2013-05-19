/// <reference path="..\jriapp.ts"/>
/// <reference path="common.ts"/>
module RIAPP
{
    'use strict';
    export module COLLDEMO {
        var global = RIAPP.global, utils = global.utils;

        export class RadioValueConverter extends MOD.converter.BaseConverter {
            convertToSource(val, param, dataContext) {
                return !!val ? param : undefined;
            }
            convertToTarget(val, param, dataContext) {
                return (val == param) ? true : false;
            }
        }

        export class RadioDemoVM extends MOD.mvvm.BaseViewModel {
            _radioValue: string;
            _radioValues: MOD.collection.Dictionary;

            constructor(app: DemoApplication) {
                super(app);
                var self = this;
                this._radioValue = 'radioValue1';
                //one property in dictionary  must be unique and used as key (its name does not matter )
                this._radioValues = new MOD.collection.Dictionary('RadioValueType', ['key', 'value', 'comment'], 'key');
                this._radioValues.fillItems([{ key: 'radioValue1', value: 'This is some text value #1', comment: 'This is some comment for value #1' },
                    { key: 'radioValue2', value: 'This is some text value #2', comment: 'This is some comment for value #2' },
                    { key: 'radioValue3', value: 'This is some text value #3', comment: 'This is some comment for value #3' },
                    { key: 'radioValue4', value: 'This is some text value #4', comment: 'This is some comment for value #4' }], false);
            }
            _getEventNames() {
                var base_events = super._getEventNames();
                return ['radio_value_changed'].concat(base_events);
            }
            //can be overriden in descendants as in his example
            _onRadioValueChanged() {
                this.raiseEvent('radio_value_changed', { value: this.radioValue })
            }
            get radioValue() { return this._radioValue; }
            set radioValue(v) {
                if (this._radioValue !== v) {
                    this._radioValue = v;
                    this.raisePropertyChanged('radioValue');
                    this._onRadioValueChanged();
                }
            }
            get radioValues() { return this._radioValues; }
        }

        export interface IHistoryItem extends MOD.utils.IEditable {
            radioValue: string;
            time: Date;
        }

        //an example of extending base class and appending extra logic
        export class RadioDemo2VM extends RadioDemoVM {
            _historyList: MOD.collection.List;
            _clearListCommand: MOD.mvvm.ICommand;

            constructor(app: DemoApplication, currentValue?:string) {
                super(app);
                var self = this;
                if (!!currentValue)
                    this.radioValue = currentValue;
                this._historyList = new MOD.collection.List('HistoryItem', ['radioValue', 'time']);
                this._historyList.addOnPropertyChange('count', function (s, a) {
                    self._clearListCommand.raiseCanExecuteChanged();
                }, this.uniqueID);
                this._clearListCommand = new MOD.mvvm.Command(function (sender, param) {
                    self.clearList();
                }, self, function (sender, param) {
                    return self._historyList.count > 0;
                });
            }
            //override the base method
            _onRadioValueChanged() {
                super._onRadioValueChanged();
                //casting will be solved with generics soon
                var item = <IHistoryItem><any>this._historyList.addNew();
                item.radioValue = this.radioValue;
                item.time = new Date();
                item.endEdit();
            }
            clearList() {
                this._historyList.clear();
            }
            get historyList() { return this._historyList; }
            get clearListCommand() { return this._clearListCommand; }
        }

        export class DemoApplication extends Application {
            _errorVM: COMMON.ErrorViewModel;
            _demoVM: RadioDemo2VM;

            constructor(options: IAppOptions) {
                super(options);
                var self = this;
                this._errorVM = null;
                this._demoVM = null;
            }
            onStartUp() {
                var self = this;
                this._errorVM = new COMMON.ErrorViewModel(this);
                this._demoVM = new RadioDemo2VM(this);

                //here we could process application's errors
                this.addOnError(function (sender, data) {
                    debugger;
                    data.isHandled = true;
                    self.errorVM.error = data.error;
                    self.errorVM.showDialog();
                });
                super.onStartUp();
            }
            destroy() {
                if (this._isDestroyed)
                    return;
                this._isDestroyCalled = true;
                var self = this;
                try {
                    self._errorVM.destroy();
                    self._demoVM.destroy();
                } finally {
                    super.destroy();
                }
            }
            get errorVM() { return this._errorVM; }
            get TEXT() { return localizable.TEXT; }
            get demoVM() { return this._demoVM; }
        }

          //global error handler - the last resort (typically display message to the user)
        RIAPP.global.addOnError(function (sender, args) {
            debugger;
            alert(args.error.message);
        });

        
        function initModule(app: Application) {
            app.registerConverter('radioValueConverter', new RadioValueConverter());
            return COLLDEMO;
        };

        export var appOptions: IAppOptions = {
            user_modules: [{ name: "COMMON", initFn: COMMON.initModule },
            { name: "COLLDEMO", initFn: initModule }]
        };
    }
}

var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="..\jriapp.ts"/>
/// <reference path="common.ts"/>
var RIAPP;
(function (RIAPP) {
    'use strict';
    (function (COLLDEMO) {
        var global = RIAPP.global, utils = global.utils;
        var RadioValueConverter = (function (_super) {
            __extends(RadioValueConverter, _super);
            function RadioValueConverter() {
                _super.apply(this, arguments);

            }
            RadioValueConverter.prototype.convertToSource = function (val, param, dataContext) {
                return !!val ? param : undefined;
            };
            RadioValueConverter.prototype.convertToTarget = function (val, param, dataContext) {
                return (val == param) ? true : false;
            };
            return RadioValueConverter;
        })(RIAPP.MOD.converter.BaseConverter);
        COLLDEMO.RadioValueConverter = RadioValueConverter;        
        var RadioDemoVM = (function (_super) {
            __extends(RadioDemoVM, _super);
            function RadioDemoVM(app) {
                        _super.call(this, app);
                var self = this;
                this._radioValue = 'radioValue1';
                //one property in dictionary  must be unique and used as key (its name does not matter )
                this._radioValues = new RIAPP.MOD.collection.Dictionary('RadioValueType', [
                    'key', 
                    'value', 
                    'comment'
                ], 'key');
                this._radioValues.fillItems([
                    {
                        key: 'radioValue1',
                        value: 'This is some text value #1',
                        comment: 'This is some comment for value #1'
                    }, 
                    {
                        key: 'radioValue2',
                        value: 'This is some text value #2',
                        comment: 'This is some comment for value #2'
                    }, 
                    {
                        key: 'radioValue3',
                        value: 'This is some text value #3',
                        comment: 'This is some comment for value #3'
                    }, 
                    {
                        key: 'radioValue4',
                        value: 'This is some text value #4',
                        comment: 'This is some comment for value #4'
                    }
                ], false);
            }
            RadioDemoVM.prototype._getEventNames = function () {
                var base_events = _super.prototype._getEventNames.call(this);
                return [
                    'radio_value_changed'
                ].concat(base_events);
            };
            RadioDemoVM.prototype._onRadioValueChanged = //can be overriden in descendants as in his example
            function () {
                this.raiseEvent('radio_value_changed', {
                    value: this.radioValue
                });
            };
            Object.defineProperty(RadioDemoVM.prototype, "radioValue", {
                get: function () {
                    return this._radioValue;
                },
                set: function (v) {
                    if(this._radioValue !== v) {
                        this._radioValue = v;
                        this.raisePropertyChanged('radioValue');
                        this._onRadioValueChanged();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RadioDemoVM.prototype, "radioValues", {
                get: function () {
                    return this._radioValues;
                },
                enumerable: true,
                configurable: true
            });
            return RadioDemoVM;
        })(RIAPP.MOD.mvvm.BaseViewModel);
        COLLDEMO.RadioDemoVM = RadioDemoVM;        
        //an example of extending base class and appending extra logic
        var RadioDemo2VM = (function (_super) {
            __extends(RadioDemo2VM, _super);
            function RadioDemo2VM(app, currentValue) {
                        _super.call(this, app);
                var self = this;
                if(!!currentValue) {
                    this.radioValue = currentValue;
                }
                this._historyList = new RIAPP.MOD.collection.List('HistoryItem', [
                    'radioValue', 
                    'time'
                ]);
                this._historyList.addOnPropertyChange('count', function (s, a) {
                    self._clearListCommand.raiseCanExecuteChanged();
                }, this.uniqueID);
                this._clearListCommand = new RIAPP.MOD.mvvm.Command(function (sender, param) {
                    self.clearList();
                }, self, function (sender, param) {
                    return self._historyList.count > 0;
                });
            }
            RadioDemo2VM.prototype._onRadioValueChanged = //override the base method
            function () {
                _super.prototype._onRadioValueChanged.call(this);
                //casting will be solved with generics soon
                var item = this._historyList.addNew();
                item.radioValue = this.radioValue;
                item.time = new Date();
                item.endEdit();
            };
            RadioDemo2VM.prototype.clearList = function () {
                this._historyList.clear();
            };
            Object.defineProperty(RadioDemo2VM.prototype, "historyList", {
                get: function () {
                    return this._historyList;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RadioDemo2VM.prototype, "clearListCommand", {
                get: function () {
                    return this._clearListCommand;
                },
                enumerable: true,
                configurable: true
            });
            return RadioDemo2VM;
        })(RadioDemoVM);
        COLLDEMO.RadioDemo2VM = RadioDemo2VM;        
        var DemoApplication = (function (_super) {
            __extends(DemoApplication, _super);
            function DemoApplication(options) {
                        _super.call(this, options);
                var self = this;
                this._errorVM = null;
                this._demoVM = null;
            }
            DemoApplication.prototype.onStartUp = function () {
                var self = this;
                this._errorVM = new RIAPP.COMMON.ErrorViewModel(this);
                this._demoVM = new RadioDemo2VM(this);
                //here we could process application's errors
                this.addOnError(function (sender, data) {
                    debugger;

                    data.isHandled = true;
                    self.errorVM.error = data.error;
                    self.errorVM.showDialog();
                });
                _super.prototype.onStartUp.call(this);
            };
            DemoApplication.prototype.destroy = function () {
                if(this._isDestroyed) {
                    return;
                }
                this._isDestroyCalled = true;
                var self = this;
                try  {
                    self._errorVM.destroy();
                    self._demoVM.destroy();
                }finally {
                    _super.prototype.destroy.call(this);
                }
            };
            Object.defineProperty(DemoApplication.prototype, "errorVM", {
                get: function () {
                    return this._errorVM;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DemoApplication.prototype, "TEXT", {
                get: function () {
                    return RIAPP.localizable.TEXT;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DemoApplication.prototype, "demoVM", {
                get: function () {
                    return this._demoVM;
                },
                enumerable: true,
                configurable: true
            });
            return DemoApplication;
        })(RIAPP.Application);
        COLLDEMO.DemoApplication = DemoApplication;        
        //global error handler - the last resort (typically display message to the user)
        RIAPP.global.addOnError(function (sender, args) {
            debugger;

            alert(args.error.message);
        });
        function initModule(app) {
            app.registerConverter('radioValueConverter', new RadioValueConverter());
            return COLLDEMO;
        }
        ;
        COLLDEMO.appOptions = {
            user_modules: [
                {
                    name: "COMMON",
                    initFn: RIAPP.COMMON.initModule
                }, 
                {
                    name: "COLLDEMO",
                    initFn: initModule
                }
            ]
        };
    })(RIAPP.COLLDEMO || (RIAPP.COLLDEMO = {}));
    var COLLDEMO = RIAPP.COLLDEMO;
})(RIAPP || (RIAPP = {}));
//@ sourceMappingURL=collectionDemo.js.map

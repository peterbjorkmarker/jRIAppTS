/// <reference path="..\jriapp.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RIAPP;
(function (RIAPP) {
    var DEMODB;
    (function (DEMODB) {
        'use strict';
        (function (TestEnum) {
            TestEnum[TestEnum["None"] = 0] = "None";
            TestEnum[TestEnum["OK"] = 1] = "OK";
            TestEnum[TestEnum["Error"] = 2] = "Error";
            TestEnum[TestEnum["Loading"] = 3] = "Loading";
        })(DEMODB.TestEnum || (DEMODB.TestEnum = {}));
        var TestEnum = DEMODB.TestEnum;
        //******BEGIN LISTS REGION******
        var TestModelItem = (function (_super) {
            __extends(TestModelItem, _super);
            function TestModelItem(aspect) {
                _super.call(this);
                this.f_aspect = aspect;
            }
            Object.defineProperty(TestModelItem.prototype, "_aspect", {
                get: function () {
                    return this.f_aspect;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TestModelItem.prototype, "_key", {
                get: function () {
                    return !!this.f_aspect ? this.f_aspect._key : null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TestModelItem.prototype, "Key", {
                get: function () {
                    return this.f_aspect._getProp('Key');
                },
                set: function (v) {
                    this.f_aspect._setProp('Key', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TestModelItem.prototype, "SomeProperty1", {
                get: function () {
                    return this.f_aspect._getProp('SomeProperty1');
                },
                set: function (v) {
                    this.f_aspect._setProp('SomeProperty1', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TestModelItem.prototype, "SomeProperty2", {
                get: function () {
                    return this.f_aspect._getProp('SomeProperty2');
                },
                set: function (v) {
                    this.f_aspect._setProp('SomeProperty2', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TestModelItem.prototype, "SomeProperty3", {
                get: function () {
                    return this.f_aspect._getProp('SomeProperty3');
                },
                set: function (v) {
                    this.f_aspect._setProp('SomeProperty3', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TestModelItem.prototype, "MoreComplexProperty", {
                get: function () {
                    return this.f_aspect._getProp('MoreComplexProperty');
                },
                set: function (v) {
                    this.f_aspect._setProp('MoreComplexProperty', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TestModelItem.prototype, "EnumProperty", {
                get: function () {
                    return this.f_aspect._getProp('EnumProperty');
                },
                set: function (v) {
                    this.f_aspect._setProp('EnumProperty', v);
                },
                enumerable: true,
                configurable: true
            });
            TestModelItem.prototype.toString = function () {
                return 'TestModelItem';
            };
            return TestModelItem;
        })(RIAPP.BaseObject);
        DEMODB.TestModelItem = TestModelItem;
        var TestModelAspect = (function (_super) {
            __extends(TestModelAspect, _super);
            function TestModelAspect(coll, vals) {
                _super.call(this, coll, vals);
                this._item = new TestModelItem(this);
            }
            TestModelAspect.prototype.toString = function () {
                return 'TestModelAspect';
            };
            return TestModelAspect;
        })(RIAPP.MOD.collection.ListItemAspect);
        var TestDictionary = (function (_super) {
            __extends(TestDictionary, _super);
            function TestDictionary() {
                _super.call(this, TestModelAspect, 'Key', [{ name: 'Key', dtype: 1 }, { name: 'SomeProperty1', dtype: 1 }, { name: 'SomeProperty2', dtype: 10 }, { name: 'SomeProperty3', dtype: 0 }, { name: 'MoreComplexProperty', dtype: 0 }, { name: 'EnumProperty', dtype: 0 }]);
            }
            TestDictionary.prototype.findItem = function (key) {
                return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
            };
            TestDictionary.prototype.toString = function () {
                return 'TestDictionary';
            };
            return TestDictionary;
        })(RIAPP.MOD.collection.BaseDictionary);
        DEMODB.TestDictionary = TestDictionary;
        var TestList = (function (_super) {
            __extends(TestList, _super);
            function TestList() {
                _super.call(this, TestModelAspect, [{ name: 'Key', dtype: 1 }, { name: 'SomeProperty1', dtype: 1 }, { name: 'SomeProperty2', dtype: 10 }, { name: 'SomeProperty3', dtype: 0 }, { name: 'MoreComplexProperty', dtype: 0 }, { name: 'EnumProperty', dtype: 0 }]);
            }
            TestList.prototype.toString = function () {
                return 'TestList';
            };
            return TestList;
        })(RIAPP.MOD.collection.BaseList);
        DEMODB.TestList = TestList;
        var KeyValItem = (function (_super) {
            __extends(KeyValItem, _super);
            function KeyValItem(aspect) {
                _super.call(this);
                this.f_aspect = aspect;
            }
            Object.defineProperty(KeyValItem.prototype, "_aspect", {
                get: function () {
                    return this.f_aspect;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(KeyValItem.prototype, "_key", {
                get: function () {
                    return !!this.f_aspect ? this.f_aspect._key : null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(KeyValItem.prototype, "key", {
                get: function () {
                    return this.f_aspect._getProp('key');
                },
                set: function (v) {
                    this.f_aspect._setProp('key', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(KeyValItem.prototype, "val", {
                get: function () {
                    return this.f_aspect._getProp('val');
                },
                set: function (v) {
                    this.f_aspect._setProp('val', v);
                },
                enumerable: true,
                configurable: true
            });
            KeyValItem.prototype.toString = function () {
                return 'KeyValItem';
            };
            return KeyValItem;
        })(RIAPP.BaseObject);
        DEMODB.KeyValItem = KeyValItem;
        var KeyValAspect = (function (_super) {
            __extends(KeyValAspect, _super);
            function KeyValAspect(coll, vals) {
                _super.call(this, coll, vals);
                this._item = new KeyValItem(this);
            }
            KeyValAspect.prototype.toString = function () {
                return 'KeyValAspect';
            };
            return KeyValAspect;
        })(RIAPP.MOD.collection.ListItemAspect);
        var KeyValDictionary = (function (_super) {
            __extends(KeyValDictionary, _super);
            function KeyValDictionary() {
                _super.call(this, KeyValAspect, 'key', [{ name: 'key', dtype: 3 }, { name: 'val', dtype: 1 }]);
            }
            KeyValDictionary.prototype.findItem = function (key) {
                return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
            };
            KeyValDictionary.prototype.toString = function () {
                return 'KeyValDictionary';
            };
            return KeyValDictionary;
        })(RIAPP.MOD.collection.BaseDictionary);
        DEMODB.KeyValDictionary = KeyValDictionary;
        var StrKeyValItem = (function (_super) {
            __extends(StrKeyValItem, _super);
            function StrKeyValItem(aspect) {
                _super.call(this);
                this.f_aspect = aspect;
            }
            Object.defineProperty(StrKeyValItem.prototype, "_aspect", {
                get: function () {
                    return this.f_aspect;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StrKeyValItem.prototype, "_key", {
                get: function () {
                    return !!this.f_aspect ? this.f_aspect._key : null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StrKeyValItem.prototype, "key", {
                get: function () {
                    return this.f_aspect._getProp('key');
                },
                set: function (v) {
                    this.f_aspect._setProp('key', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StrKeyValItem.prototype, "val", {
                get: function () {
                    return this.f_aspect._getProp('val');
                },
                set: function (v) {
                    this.f_aspect._setProp('val', v);
                },
                enumerable: true,
                configurable: true
            });
            StrKeyValItem.prototype.toString = function () {
                return 'StrKeyValItem';
            };
            return StrKeyValItem;
        })(RIAPP.BaseObject);
        DEMODB.StrKeyValItem = StrKeyValItem;
        var StrKeyValAspect = (function (_super) {
            __extends(StrKeyValAspect, _super);
            function StrKeyValAspect(coll, vals) {
                _super.call(this, coll, vals);
                this._item = new StrKeyValItem(this);
            }
            StrKeyValAspect.prototype.toString = function () {
                return 'StrKeyValAspect';
            };
            return StrKeyValAspect;
        })(RIAPP.MOD.collection.ListItemAspect);
        var StrKeyValDictionary = (function (_super) {
            __extends(StrKeyValDictionary, _super);
            function StrKeyValDictionary() {
                _super.call(this, StrKeyValAspect, 'key', [{ name: 'key', dtype: 1 }, { name: 'val', dtype: 1 }]);
            }
            StrKeyValDictionary.prototype.findItem = function (key) {
                return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
            };
            StrKeyValDictionary.prototype.toString = function () {
                return 'StrKeyValDictionary';
            };
            return StrKeyValDictionary;
        })(RIAPP.MOD.collection.BaseDictionary);
        DEMODB.StrKeyValDictionary = StrKeyValDictionary;
        var RadioValItem = (function (_super) {
            __extends(RadioValItem, _super);
            function RadioValItem(aspect) {
                _super.call(this);
                this.f_aspect = aspect;
            }
            Object.defineProperty(RadioValItem.prototype, "_aspect", {
                get: function () {
                    return this.f_aspect;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RadioValItem.prototype, "_key", {
                get: function () {
                    return !!this.f_aspect ? this.f_aspect._key : null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RadioValItem.prototype, "key", {
                get: function () {
                    return this.f_aspect._getProp('key');
                },
                set: function (v) {
                    this.f_aspect._setProp('key', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RadioValItem.prototype, "value", {
                get: function () {
                    return this.f_aspect._getProp('value');
                },
                set: function (v) {
                    this.f_aspect._setProp('value', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RadioValItem.prototype, "comment", {
                get: function () {
                    return this.f_aspect._getProp('comment');
                },
                set: function (v) {
                    this.f_aspect._setProp('comment', v);
                },
                enumerable: true,
                configurable: true
            });
            RadioValItem.prototype.toString = function () {
                return 'RadioValItem';
            };
            return RadioValItem;
        })(RIAPP.BaseObject);
        DEMODB.RadioValItem = RadioValItem;
        var RadioValAspect = (function (_super) {
            __extends(RadioValAspect, _super);
            function RadioValAspect(coll, vals) {
                _super.call(this, coll, vals);
                this._item = new RadioValItem(this);
            }
            RadioValAspect.prototype.toString = function () {
                return 'RadioValAspect';
            };
            return RadioValAspect;
        })(RIAPP.MOD.collection.ListItemAspect);
        var RadioValDictionary = (function (_super) {
            __extends(RadioValDictionary, _super);
            function RadioValDictionary() {
                _super.call(this, RadioValAspect, 'key', [{ name: 'key', dtype: 1 }, { name: 'value', dtype: 1 }, { name: 'comment', dtype: 1 }]);
            }
            RadioValDictionary.prototype.findItem = function (key) {
                return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
            };
            RadioValDictionary.prototype.toString = function () {
                return 'RadioValDictionary';
            };
            return RadioValDictionary;
        })(RIAPP.MOD.collection.BaseDictionary);
        DEMODB.RadioValDictionary = RadioValDictionary;
        var HistoryItemItem = (function (_super) {
            __extends(HistoryItemItem, _super);
            function HistoryItemItem(aspect) {
                _super.call(this);
                this.f_aspect = aspect;
            }
            Object.defineProperty(HistoryItemItem.prototype, "_aspect", {
                get: function () {
                    return this.f_aspect;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HistoryItemItem.prototype, "_key", {
                get: function () {
                    return !!this.f_aspect ? this.f_aspect._key : null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HistoryItemItem.prototype, "radioValue", {
                get: function () {
                    return this.f_aspect._getProp('radioValue');
                },
                set: function (v) {
                    this.f_aspect._setProp('radioValue', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HistoryItemItem.prototype, "time", {
                get: function () {
                    return this.f_aspect._getProp('time');
                },
                set: function (v) {
                    this.f_aspect._setProp('time', v);
                },
                enumerable: true,
                configurable: true
            });
            HistoryItemItem.prototype.toString = function () {
                return 'HistoryItemItem';
            };
            return HistoryItemItem;
        })(RIAPP.BaseObject);
        DEMODB.HistoryItemItem = HistoryItemItem;
        var HistoryItemAspect = (function (_super) {
            __extends(HistoryItemAspect, _super);
            function HistoryItemAspect(coll, vals) {
                _super.call(this, coll, vals);
                this._item = new HistoryItemItem(this);
            }
            HistoryItemAspect.prototype.toString = function () {
                return 'HistoryItemAspect';
            };
            return HistoryItemAspect;
        })(RIAPP.MOD.collection.ListItemAspect);
        var HistoryList = (function (_super) {
            __extends(HistoryList, _super);
            function HistoryList() {
                _super.call(this, HistoryItemAspect, [{ name: 'radioValue', dtype: 1 }, { name: 'time', dtype: 6 }]);
            }
            HistoryList.prototype.toString = function () {
                return 'HistoryList';
            };
            return HistoryList;
        })(RIAPP.MOD.collection.BaseList);
        DEMODB.HistoryList = HistoryList;
        //******END LISTS REGION******
        //******BEGIN COMPLEX TYPES REGION*****
        var Customer_ComplexProp1 = (function (_super) {
            __extends(Customer_ComplexProp1, _super);
            function Customer_ComplexProp1(name, parent) {
                _super.call(this, name, parent);
            }
            Object.defineProperty(Customer_ComplexProp1.prototype, "EmailAddress", {
                get: function () {
                    return this.getValue('ComplexProp.ComplexProp.EmailAddress');
                },
                set: function (v) {
                    this.setValue('ComplexProp.ComplexProp.EmailAddress', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Customer_ComplexProp1.prototype, "Phone", {
                get: function () {
                    return this.getValue('ComplexProp.ComplexProp.Phone');
                },
                set: function (v) {
                    this.setValue('ComplexProp.ComplexProp.Phone', v);
                },
                enumerable: true,
                configurable: true
            });
            Customer_ComplexProp1.prototype.toString = function () {
                return 'Customer_ComplexProp1';
            };
            return Customer_ComplexProp1;
        })(RIAPP.MOD.db.ChildComplexProperty);
        DEMODB.Customer_ComplexProp1 = Customer_ComplexProp1;
        var Customer_ComplexProp = (function (_super) {
            __extends(Customer_ComplexProp, _super);
            function Customer_ComplexProp(name, owner) {
                _super.call(this, name, owner);
                this._ComplexProp = null;
            }
            Object.defineProperty(Customer_ComplexProp.prototype, "FirstName", {
                get: function () {
                    return this.getValue('ComplexProp.FirstName');
                },
                set: function (v) {
                    this.setValue('ComplexProp.FirstName', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Customer_ComplexProp.prototype, "MiddleName", {
                get: function () {
                    return this.getValue('ComplexProp.MiddleName');
                },
                set: function (v) {
                    this.setValue('ComplexProp.MiddleName', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Customer_ComplexProp.prototype, "LastName", {
                get: function () {
                    return this.getValue('ComplexProp.LastName');
                },
                set: function (v) {
                    this.setValue('ComplexProp.LastName', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Customer_ComplexProp.prototype, "Name", {
                get: function () {
                    return this.getEntity()._getCalcFieldVal('ComplexProp.Name');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Customer_ComplexProp.prototype, "ComplexProp", {
                get: function () {
                    if (!this._ComplexProp) {
                        this._ComplexProp = new Customer_ComplexProp1('ComplexProp', this);
                    }
                    return this._ComplexProp;
                },
                enumerable: true,
                configurable: true
            });
            Customer_ComplexProp.prototype.toString = function () {
                return 'Customer_ComplexProp';
            };
            return Customer_ComplexProp;
        })(RIAPP.MOD.db.RootComplexProperty);
        DEMODB.Customer_ComplexProp = Customer_ComplexProp;
        //******END COMPLEX TYPES REGION******
        var Customer = (function (_super) {
            __extends(Customer, _super);
            function Customer(aspect) {
                _super.call(this);
                this.f_aspect = aspect;
                this._ComplexProp = null;
            }
            Customer.prototype.destroy = function () {
                if (this._isDestroyed)
                    return;
                this._isDestroyCalled = true;
                if (!!this._aspect && !this._aspect.getIsDestroyCalled()) {
                    this._aspect.destroy();
                }
                _super.prototype.destroy.call(this);
            };
            Customer.prototype.toString = function () {
                return 'Customer';
            };
            Object.defineProperty(Customer.prototype, "_aspect", {
                get: function () {
                    return this.f_aspect;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Customer.prototype, "_key", {
                get: function () {
                    return !!this.f_aspect ? this.f_aspect._key : null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Customer.prototype, "CustomerID", {
                get: function () {
                    return this.f_aspect._getFieldVal('CustomerID');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Customer.prototype, "NameStyle", {
                get: function () {
                    return this.f_aspect._getFieldVal('NameStyle');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('NameStyle', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Customer.prototype, "Title", {
                get: function () {
                    return this.f_aspect._getFieldVal('Title');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('Title', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Customer.prototype, "Suffix", {
                get: function () {
                    return this.f_aspect._getFieldVal('Suffix');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('Suffix', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Customer.prototype, "CompanyName", {
                get: function () {
                    return this.f_aspect._getFieldVal('CompanyName');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('CompanyName', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Customer.prototype, "SalesPerson", {
                get: function () {
                    return this.f_aspect._getFieldVal('SalesPerson');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('SalesPerson', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Customer.prototype, "PasswordHash", {
                get: function () {
                    return this.f_aspect._getFieldVal('PasswordHash');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Customer.prototype, "PasswordSalt", {
                get: function () {
                    return this.f_aspect._getFieldVal('PasswordSalt');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Customer.prototype, "rowguid", {
                get: function () {
                    return this.f_aspect._getFieldVal('rowguid');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Customer.prototype, "ModifiedDate", {
                get: function () {
                    return this.f_aspect._getFieldVal('ModifiedDate');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Customer.prototype, "ComplexProp", {
                get: function () {
                    if (!this._ComplexProp) {
                        this._ComplexProp = new Customer_ComplexProp('ComplexProp', this.f_aspect);
                    }
                    return this._ComplexProp;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Customer.prototype, "AddressCount", {
                get: function () {
                    return this.f_aspect._getFieldVal('AddressCount');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('AddressCount', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Customer.prototype, "CustomerAddresses", {
                get: function () {
                    return this.f_aspect._getNavFieldVal('CustomerAddresses');
                },
                enumerable: true,
                configurable: true
            });
            return Customer;
        })(RIAPP.BaseObject);
        DEMODB.Customer = Customer;
        var CustomerAspect = (function (_super) {
            __extends(CustomerAspect, _super);
            function CustomerAspect(dbSet, row, names) {
                _super.call(this, dbSet, row, names);
                this._item = new Customer(this);
            }
            CustomerAspect.prototype.toString = function () {
                return 'CustomerAspect';
            };
            return CustomerAspect;
        })(RIAPP.MOD.db.EntityAspect);
        var CustomerDb = (function (_super) {
            __extends(CustomerDb, _super);
            function CustomerDb(dbContext) {
                var self = this, opts = {
                    dbContext: dbContext,
                    dbSetInfo: { "fieldInfos": null, "enablePaging": true, "pageSize": 25, "dbSetName": "Customer" },
                    childAssoc: ([]),
                    parentAssoc: ([{ "name": "CustAddrToCustomer", "parentDbSetName": "Customer", "childDbSetName": "CustomerAddress", "childToParentName": "Customer", "parentToChildrenName": "CustomerAddresses", "onDeleteAction": 0, "fieldRels": [{ "parentField": "CustomerID", "childField": "CustomerID" }] }, { "name": "OrdersToCustomer", "parentDbSetName": "Customer", "childDbSetName": "SalesOrderHeader", "childToParentName": "Customer", "parentToChildrenName": null, "onDeleteAction": 0, "fieldRels": [{ "parentField": "CustomerID", "childField": "CustomerID" }] }])
                }, utils = RIAPP.global.utils;
                opts.dbSetInfo.fieldInfos = ([{ "fieldName": "CustomerID", "isPrimaryKey": 1, "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "NameStyle", "isPrimaryKey": 0, "dataType": 2, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Title", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Suffix", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 10, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "CompanyName", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 128, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "SalesPerson", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 256, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "PasswordHash", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 128, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "PasswordSalt", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 10, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "rowguid", "isPrimaryKey": 0, "dataType": 9, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 16, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 4, "dependentOn": "", "nested": null }, { "fieldName": "ModifiedDate", "isPrimaryKey": 0, "dataType": 6, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ComplexProp", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 5, "dependentOn": "", "nested": [{ "fieldName": "FirstName", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "MiddleName", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "LastName", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Name", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 2, "dependentOn": "ComplexProp.FirstName,ComplexProp.MiddleName,ComplexProp.LastName", "nested": null }, { "fieldName": "ComplexProp", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 5, "dependentOn": "", "nested": [{ "fieldName": "EmailAddress", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "^[_a-z0-9-]+(\\.[_a-z0-9-]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,4})$", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Phone", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 25, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }] }] }, { "fieldName": "AddressCount", "isPrimaryKey": 0, "dataType": 3, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 6, "dependentOn": "", "nested": null }, { "fieldName": "CustomerAddresses", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "", "nested": null }]);
                _super.call(this, opts, CustomerAspect, Customer);
            }
            CustomerDb.prototype.findEntity = function (customerID) {
                return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
            };
            CustomerDb.prototype.toString = function () {
                return 'CustomerDb';
            };
            CustomerDb.prototype.createReadCustomerQuery = function (args) {
                var query = this.createQuery('ReadCustomer');
                query.params = args;
                return query;
            };
            CustomerDb.prototype.defineComplexProp_NameField = function (getFunc) {
                this._defineCalculatedField('ComplexProp.Name', getFunc);
            };
            return CustomerDb;
        })(RIAPP.MOD.db.DbSet);
        DEMODB.CustomerDb = CustomerDb;
        var CustomerAddress = (function (_super) {
            __extends(CustomerAddress, _super);
            function CustomerAddress(aspect) {
                _super.call(this);
                this.f_aspect = aspect;
            }
            CustomerAddress.prototype.destroy = function () {
                if (this._isDestroyed)
                    return;
                this._isDestroyCalled = true;
                if (!!this._aspect && !this._aspect.getIsDestroyCalled()) {
                    this._aspect.destroy();
                }
                _super.prototype.destroy.call(this);
            };
            CustomerAddress.prototype.toString = function () {
                return 'CustomerAddress';
            };
            Object.defineProperty(CustomerAddress.prototype, "_aspect", {
                get: function () {
                    return this.f_aspect;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomerAddress.prototype, "_key", {
                get: function () {
                    return !!this.f_aspect ? this.f_aspect._key : null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomerAddress.prototype, "CustomerID", {
                get: function () {
                    return this.f_aspect._getFieldVal('CustomerID');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('CustomerID', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomerAddress.prototype, "AddressID", {
                get: function () {
                    return this.f_aspect._getFieldVal('AddressID');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('AddressID', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomerAddress.prototype, "AddressType", {
                get: function () {
                    return this.f_aspect._getFieldVal('AddressType');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('AddressType', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomerAddress.prototype, "rowguid", {
                get: function () {
                    return this.f_aspect._getFieldVal('rowguid');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomerAddress.prototype, "ModifiedDate", {
                get: function () {
                    return this.f_aspect._getFieldVal('ModifiedDate');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomerAddress.prototype, "Customer", {
                get: function () {
                    return this.f_aspect._getNavFieldVal('Customer');
                },
                set: function (v) {
                    this.f_aspect._setNavFieldVal('Customer', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomerAddress.prototype, "Address", {
                get: function () {
                    return this.f_aspect._getNavFieldVal('Address');
                },
                set: function (v) {
                    this.f_aspect._setNavFieldVal('Address', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomerAddress.prototype, "AddressInfo", {
                get: function () {
                    return this.f_aspect._getNavFieldVal('AddressInfo');
                },
                set: function (v) {
                    this.f_aspect._setNavFieldVal('AddressInfo', v);
                },
                enumerable: true,
                configurable: true
            });
            return CustomerAddress;
        })(RIAPP.BaseObject);
        DEMODB.CustomerAddress = CustomerAddress;
        var CustomerAddressAspect = (function (_super) {
            __extends(CustomerAddressAspect, _super);
            function CustomerAddressAspect(dbSet, row, names) {
                _super.call(this, dbSet, row, names);
                this._item = new CustomerAddress(this);
            }
            CustomerAddressAspect.prototype.toString = function () {
                return 'CustomerAddressAspect';
            };
            return CustomerAddressAspect;
        })(RIAPP.MOD.db.EntityAspect);
        var CustomerAddressDb = (function (_super) {
            __extends(CustomerAddressDb, _super);
            function CustomerAddressDb(dbContext) {
                var self = this, opts = {
                    dbContext: dbContext,
                    dbSetInfo: { "fieldInfos": null, "enablePaging": false, "pageSize": 25, "dbSetName": "CustomerAddress" },
                    childAssoc: ([{ "name": "CustAddrToCustomer", "parentDbSetName": "Customer", "childDbSetName": "CustomerAddress", "childToParentName": "Customer", "parentToChildrenName": "CustomerAddresses", "onDeleteAction": 0, "fieldRels": [{ "parentField": "CustomerID", "childField": "CustomerID" }] }, { "name": "CustAddrToAddress", "parentDbSetName": "Address", "childDbSetName": "CustomerAddress", "childToParentName": "Address", "parentToChildrenName": "CustomerAddresses", "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "AddressID" }] }, { "name": "CustAddrToAddress2", "parentDbSetName": "AddressInfo", "childDbSetName": "CustomerAddress", "childToParentName": "AddressInfo", "parentToChildrenName": "CustomerAddresses", "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "AddressID" }] }]),
                    parentAssoc: ([])
                }, utils = RIAPP.global.utils;
                opts.dbSetInfo.fieldInfos = ([{ "fieldName": "CustomerID", "isPrimaryKey": 1, "dataType": 3, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "AddressID", "isPrimaryKey": 2, "dataType": 3, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "AddressType", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": false, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "rowguid", "isPrimaryKey": 0, "dataType": 9, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 16, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 4, "dependentOn": "", "nested": null }, { "fieldName": "ModifiedDate", "isPrimaryKey": 0, "dataType": 6, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": false, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Customer", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "CustomerID", "nested": null }, { "fieldName": "Address", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "AddressID", "nested": null }, { "fieldName": "AddressInfo", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "AddressID", "nested": null }]);
                _super.call(this, opts, CustomerAddressAspect, CustomerAddress);
            }
            CustomerAddressDb.prototype.findEntity = function (customerID, addressID) {
                return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
            };
            CustomerAddressDb.prototype.toString = function () {
                return 'CustomerAddressDb';
            };
            CustomerAddressDb.prototype.createReadCustomerAddressQuery = function () {
                return this.createQuery('ReadCustomerAddress');
            };
            CustomerAddressDb.prototype.createReadAddressForCustomersQuery = function (args) {
                var query = this.createQuery('ReadAddressForCustomers');
                query.params = args;
                return query;
            };
            return CustomerAddressDb;
        })(RIAPP.MOD.db.DbSet);
        DEMODB.CustomerAddressDb = CustomerAddressDb;
        var Address = (function (_super) {
            __extends(Address, _super);
            function Address(aspect) {
                _super.call(this);
                this.f_aspect = aspect;
            }
            Address.prototype.destroy = function () {
                if (this._isDestroyed)
                    return;
                this._isDestroyCalled = true;
                if (!!this._aspect && !this._aspect.getIsDestroyCalled()) {
                    this._aspect.destroy();
                }
                _super.prototype.destroy.call(this);
            };
            Address.prototype.toString = function () {
                return 'Address';
            };
            Object.defineProperty(Address.prototype, "_aspect", {
                get: function () {
                    return this.f_aspect;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Address.prototype, "_key", {
                get: function () {
                    return !!this.f_aspect ? this.f_aspect._key : null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Address.prototype, "AddressID", {
                get: function () {
                    return this.f_aspect._getFieldVal('AddressID');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Address.prototype, "AddressLine1", {
                get: function () {
                    return this.f_aspect._getFieldVal('AddressLine1');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('AddressLine1', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Address.prototype, "AddressLine2", {
                get: function () {
                    return this.f_aspect._getFieldVal('AddressLine2');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('AddressLine2', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Address.prototype, "City", {
                get: function () {
                    return this.f_aspect._getFieldVal('City');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('City', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Address.prototype, "StateProvince", {
                get: function () {
                    return this.f_aspect._getFieldVal('StateProvince');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('StateProvince', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Address.prototype, "CountryRegion", {
                get: function () {
                    return this.f_aspect._getFieldVal('CountryRegion');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('CountryRegion', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Address.prototype, "PostalCode", {
                get: function () {
                    return this.f_aspect._getFieldVal('PostalCode');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('PostalCode', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Address.prototype, "rowguid", {
                get: function () {
                    return this.f_aspect._getFieldVal('rowguid');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Address.prototype, "ModifiedDate", {
                get: function () {
                    return this.f_aspect._getFieldVal('ModifiedDate');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Address.prototype, "CustomerAddresses", {
                get: function () {
                    return this.f_aspect._getNavFieldVal('CustomerAddresses');
                },
                enumerable: true,
                configurable: true
            });
            return Address;
        })(RIAPP.BaseObject);
        DEMODB.Address = Address;
        var AddressAspect = (function (_super) {
            __extends(AddressAspect, _super);
            function AddressAspect(dbSet, row, names) {
                _super.call(this, dbSet, row, names);
                this._item = new Address(this);
            }
            AddressAspect.prototype.toString = function () {
                return 'AddressAspect';
            };
            return AddressAspect;
        })(RIAPP.MOD.db.EntityAspect);
        var AddressDb = (function (_super) {
            __extends(AddressDb, _super);
            function AddressDb(dbContext) {
                var self = this, opts = {
                    dbContext: dbContext,
                    dbSetInfo: { "fieldInfos": null, "enablePaging": false, "pageSize": 25, "dbSetName": "Address" },
                    childAssoc: ([]),
                    parentAssoc: ([{ "name": "CustAddrToAddress", "parentDbSetName": "Address", "childDbSetName": "CustomerAddress", "childToParentName": "Address", "parentToChildrenName": "CustomerAddresses", "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "AddressID" }] }, { "name": "OrdersToShipAddr", "parentDbSetName": "Address", "childDbSetName": "SalesOrderHeader", "childToParentName": "Address", "parentToChildrenName": null, "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "ShipToAddressID" }] }, { "name": "OrdersToBillAddr", "parentDbSetName": "Address", "childDbSetName": "SalesOrderHeader", "childToParentName": "Address1", "parentToChildrenName": null, "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "BillToAddressID" }] }])
                }, utils = RIAPP.global.utils;
                opts.dbSetInfo.fieldInfos = ([{ "fieldName": "AddressID", "isPrimaryKey": 1, "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "AddressLine1", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 60, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "AddressLine2", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 60, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "City", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 30, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "StateProvince", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "CountryRegion", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "PostalCode", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 15, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "rowguid", "isPrimaryKey": 0, "dataType": 9, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 4, "dependentOn": "", "nested": null }, { "fieldName": "ModifiedDate", "isPrimaryKey": 0, "dataType": 6, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "CustomerAddresses", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "", "nested": null }]);
                _super.call(this, opts, AddressAspect, Address);
            }
            AddressDb.prototype.findEntity = function (addressID) {
                return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
            };
            AddressDb.prototype.toString = function () {
                return 'AddressDb';
            };
            AddressDb.prototype.createReadAddressQuery = function () {
                return this.createQuery('ReadAddress');
            };
            AddressDb.prototype.createReadAddressByIdsQuery = function (args) {
                var query = this.createQuery('ReadAddressByIds');
                query.params = args;
                return query;
            };
            return AddressDb;
        })(RIAPP.MOD.db.DbSet);
        DEMODB.AddressDb = AddressDb;
        var Product = (function (_super) {
            __extends(Product, _super);
            function Product(aspect) {
                _super.call(this);
                this.f_aspect = aspect;
            }
            Product.prototype.destroy = function () {
                if (this._isDestroyed)
                    return;
                this._isDestroyCalled = true;
                if (!!this._aspect && !this._aspect.getIsDestroyCalled()) {
                    this._aspect.destroy();
                }
                _super.prototype.destroy.call(this);
            };
            Product.prototype.toString = function () {
                return 'Product';
            };
            Object.defineProperty(Product.prototype, "_aspect", {
                get: function () {
                    return this.f_aspect;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Product.prototype, "_key", {
                get: function () {
                    return !!this.f_aspect ? this.f_aspect._key : null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Product.prototype, "ProductID", {
                get: function () {
                    return this.f_aspect._getFieldVal('ProductID');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Product.prototype, "Name", {
                get: function () {
                    return this.f_aspect._getFieldVal('Name');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('Name', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Product.prototype, "ProductNumber", {
                get: function () {
                    return this.f_aspect._getFieldVal('ProductNumber');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('ProductNumber', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Product.prototype, "Color", {
                get: function () {
                    return this.f_aspect._getFieldVal('Color');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('Color', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Product.prototype, "StandardCost", {
                get: function () {
                    return this.f_aspect._getFieldVal('StandardCost');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('StandardCost', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Product.prototype, "ListPrice", {
                get: function () {
                    return this.f_aspect._getFieldVal('ListPrice');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('ListPrice', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Product.prototype, "Size", {
                get: function () {
                    return this.f_aspect._getFieldVal('Size');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('Size', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Product.prototype, "Weight", {
                get: function () {
                    return this.f_aspect._getFieldVal('Weight');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('Weight', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Product.prototype, "ProductCategoryID", {
                get: function () {
                    return this.f_aspect._getFieldVal('ProductCategoryID');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('ProductCategoryID', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Product.prototype, "ProductModelID", {
                get: function () {
                    return this.f_aspect._getFieldVal('ProductModelID');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('ProductModelID', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Product.prototype, "SellStartDate", {
                get: function () {
                    return this.f_aspect._getFieldVal('SellStartDate');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('SellStartDate', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Product.prototype, "SellEndDate", {
                get: function () {
                    return this.f_aspect._getFieldVal('SellEndDate');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('SellEndDate', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Product.prototype, "DiscontinuedDate", {
                get: function () {
                    return this.f_aspect._getFieldVal('DiscontinuedDate');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('DiscontinuedDate', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Product.prototype, "rowguid", {
                get: function () {
                    return this.f_aspect._getFieldVal('rowguid');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Product.prototype, "ModifiedDate", {
                get: function () {
                    return this.f_aspect._getFieldVal('ModifiedDate');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Product.prototype, "IsActive", {
                get: function () {
                    return this.f_aspect._getCalcFieldVal('IsActive');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Product.prototype, "ThumbnailPhotoFileName", {
                get: function () {
                    return this.f_aspect._getFieldVal('ThumbnailPhotoFileName');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('ThumbnailPhotoFileName', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Product.prototype, "SalesOrderDetails", {
                get: function () {
                    return this.f_aspect._getNavFieldVal('SalesOrderDetails');
                },
                enumerable: true,
                configurable: true
            });
            return Product;
        })(RIAPP.BaseObject);
        DEMODB.Product = Product;
        var ProductAspect = (function (_super) {
            __extends(ProductAspect, _super);
            function ProductAspect(dbSet, row, names) {
                _super.call(this, dbSet, row, names);
                this._item = new Product(this);
            }
            ProductAspect.prototype.toString = function () {
                return 'ProductAspect';
            };
            return ProductAspect;
        })(RIAPP.MOD.db.EntityAspect);
        var ProductDb = (function (_super) {
            __extends(ProductDb, _super);
            function ProductDb(dbContext) {
                var self = this, opts = {
                    dbContext: dbContext,
                    dbSetInfo: { "fieldInfos": null, "enablePaging": true, "pageSize": 25, "dbSetName": "Product" },
                    childAssoc: ([]),
                    parentAssoc: ([{ "name": "OrdDetailsToProduct", "parentDbSetName": "Product", "childDbSetName": "SalesOrderDetail", "childToParentName": "Product", "parentToChildrenName": "SalesOrderDetails", "onDeleteAction": 0, "fieldRels": [{ "parentField": "ProductID", "childField": "ProductID" }] }])
                }, utils = RIAPP.global.utils;
                opts.dbSetInfo.fieldInfos = ([{ "fieldName": "ProductID", "isPrimaryKey": 1, "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Name", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": false, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ProductNumber", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": false, "maxLength": 25, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Color", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": false, "maxLength": 15, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "StandardCost", "isPrimaryKey": 0, "dataType": 4, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": false, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ListPrice", "isPrimaryKey": 0, "dataType": 4, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": false, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "100,5000", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Size", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": false, "maxLength": 5, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Weight", "isPrimaryKey": 0, "dataType": 4, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": false, "maxLength": 5, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ProductCategoryID", "isPrimaryKey": 0, "dataType": 3, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": false, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ProductModelID", "isPrimaryKey": 0, "dataType": 3, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": false, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "SellStartDate", "isPrimaryKey": 0, "dataType": 7, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "2000-01-01,2015-01-01", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "SellEndDate", "isPrimaryKey": 0, "dataType": 7, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "DiscontinuedDate", "isPrimaryKey": 0, "dataType": 7, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": false, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "rowguid", "isPrimaryKey": 0, "dataType": 9, "isNullable": false, "isReadOnly": true, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 16, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 4, "dependentOn": "", "nested": null }, { "fieldName": "ModifiedDate", "isPrimaryKey": 0, "dataType": 6, "isNullable": false, "isReadOnly": true, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "IsActive", "isPrimaryKey": 0, "dataType": 2, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 2, "dependentOn": "SellEndDate", "nested": null }, { "fieldName": "ThumbnailPhotoFileName", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": false, "maxLength": 256, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "SalesOrderDetails", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "", "nested": null }]);
                _super.call(this, opts, ProductAspect, Product);
            }
            ProductDb.prototype.findEntity = function (productID) {
                return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
            };
            ProductDb.prototype.toString = function () {
                return 'ProductDb';
            };
            ProductDb.prototype.createReadProductQuery = function (args) {
                var query = this.createQuery('ReadProduct');
                query.params = args;
                return query;
            };
            ProductDb.prototype.createReadProductByIdsQuery = function (args) {
                var query = this.createQuery('ReadProductByIds');
                query.params = args;
                return query;
            };
            ProductDb.prototype.defineIsActiveField = function (getFunc) {
                this._defineCalculatedField('IsActive', getFunc);
            };
            return ProductDb;
        })(RIAPP.MOD.db.DbSet);
        DEMODB.ProductDb = ProductDb;
        var ProductModel = (function (_super) {
            __extends(ProductModel, _super);
            function ProductModel(aspect) {
                _super.call(this);
                this.f_aspect = aspect;
            }
            ProductModel.prototype.destroy = function () {
                if (this._isDestroyed)
                    return;
                this._isDestroyCalled = true;
                if (!!this._aspect && !this._aspect.getIsDestroyCalled()) {
                    this._aspect.destroy();
                }
                _super.prototype.destroy.call(this);
            };
            ProductModel.prototype.toString = function () {
                return 'ProductModel';
            };
            Object.defineProperty(ProductModel.prototype, "_aspect", {
                get: function () {
                    return this.f_aspect;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductModel.prototype, "_key", {
                get: function () {
                    return !!this.f_aspect ? this.f_aspect._key : null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductModel.prototype, "ProductModelID", {
                get: function () {
                    return this.f_aspect._getFieldVal('ProductModelID');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductModel.prototype, "Name", {
                get: function () {
                    return this.f_aspect._getFieldVal('Name');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('Name', v);
                },
                enumerable: true,
                configurable: true
            });
            return ProductModel;
        })(RIAPP.BaseObject);
        DEMODB.ProductModel = ProductModel;
        var ProductModelAspect = (function (_super) {
            __extends(ProductModelAspect, _super);
            function ProductModelAspect(dbSet, row, names) {
                _super.call(this, dbSet, row, names);
                this._item = new ProductModel(this);
            }
            ProductModelAspect.prototype.toString = function () {
                return 'ProductModelAspect';
            };
            return ProductModelAspect;
        })(RIAPP.MOD.db.EntityAspect);
        var ProductModelDb = (function (_super) {
            __extends(ProductModelDb, _super);
            function ProductModelDb(dbContext) {
                var self = this, opts = {
                    dbContext: dbContext,
                    dbSetInfo: { "fieldInfos": null, "enablePaging": false, "pageSize": 25, "dbSetName": "ProductModel" },
                    childAssoc: ([]),
                    parentAssoc: ([])
                }, utils = RIAPP.global.utils;
                opts.dbSetInfo.fieldInfos = ([{ "fieldName": "ProductModelID", "isPrimaryKey": 1, "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Name", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }]);
                _super.call(this, opts, ProductModelAspect, ProductModel);
            }
            ProductModelDb.prototype.findEntity = function (productModelID) {
                return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
            };
            ProductModelDb.prototype.toString = function () {
                return 'ProductModelDb';
            };
            ProductModelDb.prototype.createReadProductModelQuery = function () {
                return this.createQuery('ReadProductModel');
            };
            return ProductModelDb;
        })(RIAPP.MOD.db.DbSet);
        DEMODB.ProductModelDb = ProductModelDb;
        var SalesOrderHeader = (function (_super) {
            __extends(SalesOrderHeader, _super);
            function SalesOrderHeader(aspect) {
                _super.call(this);
                this.f_aspect = aspect;
            }
            SalesOrderHeader.prototype.destroy = function () {
                if (this._isDestroyed)
                    return;
                this._isDestroyCalled = true;
                if (!!this._aspect && !this._aspect.getIsDestroyCalled()) {
                    this._aspect.destroy();
                }
                _super.prototype.destroy.call(this);
            };
            SalesOrderHeader.prototype.toString = function () {
                return 'SalesOrderHeader';
            };
            Object.defineProperty(SalesOrderHeader.prototype, "_aspect", {
                get: function () {
                    return this.f_aspect;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "_key", {
                get: function () {
                    return !!this.f_aspect ? this.f_aspect._key : null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "SalesOrderID", {
                get: function () {
                    return this.f_aspect._getFieldVal('SalesOrderID');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "RevisionNumber", {
                get: function () {
                    return this.f_aspect._getFieldVal('RevisionNumber');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "OrderDate", {
                get: function () {
                    return this.f_aspect._getFieldVal('OrderDate');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('OrderDate', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "DueDate", {
                get: function () {
                    return this.f_aspect._getFieldVal('DueDate');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('DueDate', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "ShipDate", {
                get: function () {
                    return this.f_aspect._getFieldVal('ShipDate');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('ShipDate', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "Status", {
                get: function () {
                    return this.f_aspect._getFieldVal('Status');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "OnlineOrderFlag", {
                get: function () {
                    return this.f_aspect._getFieldVal('OnlineOrderFlag');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('OnlineOrderFlag', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "SalesOrderNumber", {
                get: function () {
                    return this.f_aspect._getFieldVal('SalesOrderNumber');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "PurchaseOrderNumber", {
                get: function () {
                    return this.f_aspect._getFieldVal('PurchaseOrderNumber');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "AccountNumber", {
                get: function () {
                    return this.f_aspect._getFieldVal('AccountNumber');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('AccountNumber', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "CustomerID", {
                get: function () {
                    return this.f_aspect._getFieldVal('CustomerID');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('CustomerID', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "ShipToAddressID", {
                get: function () {
                    return this.f_aspect._getFieldVal('ShipToAddressID');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('ShipToAddressID', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "BillToAddressID", {
                get: function () {
                    return this.f_aspect._getFieldVal('BillToAddressID');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('BillToAddressID', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "ShipMethod", {
                get: function () {
                    return this.f_aspect._getFieldVal('ShipMethod');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('ShipMethod', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "CreditCardApprovalCode", {
                get: function () {
                    return this.f_aspect._getFieldVal('CreditCardApprovalCode');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('CreditCardApprovalCode', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "SubTotal", {
                get: function () {
                    return this.f_aspect._getFieldVal('SubTotal');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "TaxAmt", {
                get: function () {
                    return this.f_aspect._getFieldVal('TaxAmt');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "Freight", {
                get: function () {
                    return this.f_aspect._getFieldVal('Freight');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "TotalDue", {
                get: function () {
                    return this.f_aspect._getFieldVal('TotalDue');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "Comment", {
                get: function () {
                    return this.f_aspect._getFieldVal('Comment');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('Comment', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "rowguid", {
                get: function () {
                    return this.f_aspect._getFieldVal('rowguid');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "ModifiedDate", {
                get: function () {
                    return this.f_aspect._getFieldVal('ModifiedDate');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "SalesOrderDetails", {
                get: function () {
                    return this.f_aspect._getNavFieldVal('SalesOrderDetails');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "Customer", {
                get: function () {
                    return this.f_aspect._getNavFieldVal('Customer');
                },
                set: function (v) {
                    this.f_aspect._setNavFieldVal('Customer', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "Address", {
                get: function () {
                    return this.f_aspect._getNavFieldVal('Address');
                },
                set: function (v) {
                    this.f_aspect._setNavFieldVal('Address', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "Address1", {
                get: function () {
                    return this.f_aspect._getNavFieldVal('Address1');
                },
                set: function (v) {
                    this.f_aspect._setNavFieldVal('Address1', v);
                },
                enumerable: true,
                configurable: true
            });
            return SalesOrderHeader;
        })(RIAPP.BaseObject);
        DEMODB.SalesOrderHeader = SalesOrderHeader;
        var SalesOrderHeaderAspect = (function (_super) {
            __extends(SalesOrderHeaderAspect, _super);
            function SalesOrderHeaderAspect(dbSet, row, names) {
                _super.call(this, dbSet, row, names);
                this._item = new SalesOrderHeader(this);
            }
            SalesOrderHeaderAspect.prototype.toString = function () {
                return 'SalesOrderHeaderAspect';
            };
            return SalesOrderHeaderAspect;
        })(RIAPP.MOD.db.EntityAspect);
        var SalesOrderHeaderDb = (function (_super) {
            __extends(SalesOrderHeaderDb, _super);
            function SalesOrderHeaderDb(dbContext) {
                var self = this, opts = {
                    dbContext: dbContext,
                    dbSetInfo: { "fieldInfos": null, "enablePaging": false, "pageSize": 25, "dbSetName": "SalesOrderHeader" },
                    childAssoc: ([{ "name": "OrdersToCustomer", "parentDbSetName": "Customer", "childDbSetName": "SalesOrderHeader", "childToParentName": "Customer", "parentToChildrenName": null, "onDeleteAction": 0, "fieldRels": [{ "parentField": "CustomerID", "childField": "CustomerID" }] }, { "name": "OrdersToShipAddr", "parentDbSetName": "Address", "childDbSetName": "SalesOrderHeader", "childToParentName": "Address", "parentToChildrenName": null, "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "ShipToAddressID" }] }, { "name": "OrdersToBillAddr", "parentDbSetName": "Address", "childDbSetName": "SalesOrderHeader", "childToParentName": "Address1", "parentToChildrenName": null, "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "BillToAddressID" }] }]),
                    parentAssoc: ([{ "name": "OrdDetailsToOrder", "parentDbSetName": "SalesOrderHeader", "childDbSetName": "SalesOrderDetail", "childToParentName": "SalesOrderHeader", "parentToChildrenName": "SalesOrderDetails", "onDeleteAction": 1, "fieldRels": [{ "parentField": "SalesOrderID", "childField": "SalesOrderID" }] }])
                }, utils = RIAPP.global.utils;
                opts.dbSetInfo.fieldInfos = ([{ "fieldName": "SalesOrderID", "isPrimaryKey": 1, "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "RevisionNumber", "isPrimaryKey": 0, "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "OrderDate", "isPrimaryKey": 0, "dataType": 7, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "DueDate", "isPrimaryKey": 0, "dataType": 7, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ShipDate", "isPrimaryKey": 0, "dataType": 7, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Status", "isPrimaryKey": 0, "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "OnlineOrderFlag", "isPrimaryKey": 0, "dataType": 2, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "SalesOrderNumber", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 25, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "PurchaseOrderNumber", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 25, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "AccountNumber", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 15, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "CustomerID", "isPrimaryKey": 0, "dataType": 3, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ShipToAddressID", "isPrimaryKey": 0, "dataType": 3, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "BillToAddressID", "isPrimaryKey": 0, "dataType": 3, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ShipMethod", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "CreditCardApprovalCode", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 15, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "SubTotal", "isPrimaryKey": 0, "dataType": 4, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "TaxAmt", "isPrimaryKey": 0, "dataType": 4, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Freight", "isPrimaryKey": 0, "dataType": 4, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "TotalDue", "isPrimaryKey": 0, "dataType": 4, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Comment", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 0, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "rowguid", "isPrimaryKey": 0, "dataType": 9, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 16, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ModifiedDate", "isPrimaryKey": 0, "dataType": 6, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "SalesOrderDetails", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "", "nested": null }, { "fieldName": "Customer", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "CustomerID", "nested": null }, { "fieldName": "Address", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "ShipToAddressID", "nested": null }, { "fieldName": "Address1", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "BillToAddressID", "nested": null }]);
                _super.call(this, opts, SalesOrderHeaderAspect, SalesOrderHeader);
            }
            SalesOrderHeaderDb.prototype.findEntity = function (salesOrderID) {
                return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
            };
            SalesOrderHeaderDb.prototype.toString = function () {
                return 'SalesOrderHeaderDb';
            };
            SalesOrderHeaderDb.prototype.createReadSalesOrderHeaderQuery = function () {
                return this.createQuery('ReadSalesOrderHeader');
            };
            return SalesOrderHeaderDb;
        })(RIAPP.MOD.db.DbSet);
        DEMODB.SalesOrderHeaderDb = SalesOrderHeaderDb;
        var SalesOrderDetail = (function (_super) {
            __extends(SalesOrderDetail, _super);
            function SalesOrderDetail(aspect) {
                _super.call(this);
                this.f_aspect = aspect;
            }
            SalesOrderDetail.prototype.destroy = function () {
                if (this._isDestroyed)
                    return;
                this._isDestroyCalled = true;
                if (!!this._aspect && !this._aspect.getIsDestroyCalled()) {
                    this._aspect.destroy();
                }
                _super.prototype.destroy.call(this);
            };
            SalesOrderDetail.prototype.toString = function () {
                return 'SalesOrderDetail';
            };
            Object.defineProperty(SalesOrderDetail.prototype, "_aspect", {
                get: function () {
                    return this.f_aspect;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderDetail.prototype, "_key", {
                get: function () {
                    return !!this.f_aspect ? this.f_aspect._key : null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderDetail.prototype, "SalesOrderID", {
                get: function () {
                    return this.f_aspect._getFieldVal('SalesOrderID');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('SalesOrderID', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderDetail.prototype, "SalesOrderDetailID", {
                get: function () {
                    return this.f_aspect._getFieldVal('SalesOrderDetailID');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderDetail.prototype, "OrderQty", {
                get: function () {
                    return this.f_aspect._getFieldVal('OrderQty');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('OrderQty', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderDetail.prototype, "ProductID", {
                get: function () {
                    return this.f_aspect._getFieldVal('ProductID');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('ProductID', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderDetail.prototype, "UnitPrice", {
                get: function () {
                    return this.f_aspect._getFieldVal('UnitPrice');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderDetail.prototype, "UnitPriceDiscount", {
                get: function () {
                    return this.f_aspect._getFieldVal('UnitPriceDiscount');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderDetail.prototype, "LineTotal", {
                get: function () {
                    return this.f_aspect._getFieldVal('LineTotal');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderDetail.prototype, "rowguid", {
                get: function () {
                    return this.f_aspect._getFieldVal('rowguid');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderDetail.prototype, "ModifiedDate", {
                get: function () {
                    return this.f_aspect._getFieldVal('ModifiedDate');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderDetail.prototype, "SalesOrderHeader", {
                get: function () {
                    return this.f_aspect._getNavFieldVal('SalesOrderHeader');
                },
                set: function (v) {
                    this.f_aspect._setNavFieldVal('SalesOrderHeader', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderDetail.prototype, "Product", {
                get: function () {
                    return this.f_aspect._getNavFieldVal('Product');
                },
                set: function (v) {
                    this.f_aspect._setNavFieldVal('Product', v);
                },
                enumerable: true,
                configurable: true
            });
            return SalesOrderDetail;
        })(RIAPP.BaseObject);
        DEMODB.SalesOrderDetail = SalesOrderDetail;
        var SalesOrderDetailAspect = (function (_super) {
            __extends(SalesOrderDetailAspect, _super);
            function SalesOrderDetailAspect(dbSet, row, names) {
                _super.call(this, dbSet, row, names);
                this._item = new SalesOrderDetail(this);
            }
            SalesOrderDetailAspect.prototype.toString = function () {
                return 'SalesOrderDetailAspect';
            };
            return SalesOrderDetailAspect;
        })(RIAPP.MOD.db.EntityAspect);
        var SalesOrderDetailDb = (function (_super) {
            __extends(SalesOrderDetailDb, _super);
            function SalesOrderDetailDb(dbContext) {
                var self = this, opts = {
                    dbContext: dbContext,
                    dbSetInfo: { "fieldInfos": null, "enablePaging": false, "pageSize": 25, "dbSetName": "SalesOrderDetail" },
                    childAssoc: ([{ "name": "OrdDetailsToOrder", "parentDbSetName": "SalesOrderHeader", "childDbSetName": "SalesOrderDetail", "childToParentName": "SalesOrderHeader", "parentToChildrenName": "SalesOrderDetails", "onDeleteAction": 1, "fieldRels": [{ "parentField": "SalesOrderID", "childField": "SalesOrderID" }] }, { "name": "OrdDetailsToProduct", "parentDbSetName": "Product", "childDbSetName": "SalesOrderDetail", "childToParentName": "Product", "parentToChildrenName": "SalesOrderDetails", "onDeleteAction": 0, "fieldRels": [{ "parentField": "ProductID", "childField": "ProductID" }] }]),
                    parentAssoc: ([])
                }, utils = RIAPP.global.utils;
                opts.dbSetInfo.fieldInfos = ([{ "fieldName": "SalesOrderID", "isPrimaryKey": 1, "dataType": 3, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "SalesOrderDetailID", "isPrimaryKey": 2, "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "OrderQty", "isPrimaryKey": 0, "dataType": 3, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 2, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ProductID", "isPrimaryKey": 0, "dataType": 3, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "UnitPrice", "isPrimaryKey": 0, "dataType": 4, "isNullable": true, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "UnitPriceDiscount", "isPrimaryKey": 0, "dataType": 4, "isNullable": true, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "LineTotal", "isPrimaryKey": 0, "dataType": 4, "isNullable": false, "isReadOnly": true, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 17, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "rowguid", "isPrimaryKey": 0, "dataType": 9, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 16, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ModifiedDate", "isPrimaryKey": 0, "dataType": 6, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "SalesOrderHeader", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "SalesOrderID", "nested": null }, { "fieldName": "Product", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "ProductID", "nested": null }]);
                _super.call(this, opts, SalesOrderDetailAspect, SalesOrderDetail);
            }
            SalesOrderDetailDb.prototype.findEntity = function (salesOrderID, salesOrderDetailID) {
                return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
            };
            SalesOrderDetailDb.prototype.toString = function () {
                return 'SalesOrderDetailDb';
            };
            SalesOrderDetailDb.prototype.createReadSalesOrderDetailQuery = function () {
                return this.createQuery('ReadSalesOrderDetail');
            };
            return SalesOrderDetailDb;
        })(RIAPP.MOD.db.DbSet);
        DEMODB.SalesOrderDetailDb = SalesOrderDetailDb;
        var ProductCategory = (function (_super) {
            __extends(ProductCategory, _super);
            function ProductCategory(aspect) {
                _super.call(this);
                this.f_aspect = aspect;
            }
            ProductCategory.prototype.destroy = function () {
                if (this._isDestroyed)
                    return;
                this._isDestroyCalled = true;
                if (!!this._aspect && !this._aspect.getIsDestroyCalled()) {
                    this._aspect.destroy();
                }
                _super.prototype.destroy.call(this);
            };
            ProductCategory.prototype.toString = function () {
                return 'ProductCategory';
            };
            Object.defineProperty(ProductCategory.prototype, "_aspect", {
                get: function () {
                    return this.f_aspect;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductCategory.prototype, "_key", {
                get: function () {
                    return !!this.f_aspect ? this.f_aspect._key : null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductCategory.prototype, "ProductCategoryID", {
                get: function () {
                    return this.f_aspect._getFieldVal('ProductCategoryID');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductCategory.prototype, "ParentProductCategoryID", {
                get: function () {
                    return this.f_aspect._getFieldVal('ParentProductCategoryID');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('ParentProductCategoryID', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductCategory.prototype, "Name", {
                get: function () {
                    return this.f_aspect._getFieldVal('Name');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('Name', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductCategory.prototype, "rowguid", {
                get: function () {
                    return this.f_aspect._getFieldVal('rowguid');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('rowguid', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductCategory.prototype, "ModifiedDate", {
                get: function () {
                    return this.f_aspect._getFieldVal('ModifiedDate');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('ModifiedDate', v);
                },
                enumerable: true,
                configurable: true
            });
            return ProductCategory;
        })(RIAPP.BaseObject);
        DEMODB.ProductCategory = ProductCategory;
        var ProductCategoryAspect = (function (_super) {
            __extends(ProductCategoryAspect, _super);
            function ProductCategoryAspect(dbSet, row, names) {
                _super.call(this, dbSet, row, names);
                this._item = new ProductCategory(this);
            }
            ProductCategoryAspect.prototype.toString = function () {
                return 'ProductCategoryAspect';
            };
            return ProductCategoryAspect;
        })(RIAPP.MOD.db.EntityAspect);
        var ProductCategoryDb = (function (_super) {
            __extends(ProductCategoryDb, _super);
            function ProductCategoryDb(dbContext) {
                var self = this, opts = {
                    dbContext: dbContext,
                    dbSetInfo: { "fieldInfos": null, "enablePaging": false, "pageSize": 25, "dbSetName": "ProductCategory" },
                    childAssoc: ([]),
                    parentAssoc: ([])
                }, utils = RIAPP.global.utils;
                opts.dbSetInfo.fieldInfos = ([{ "fieldName": "ProductCategoryID", "isPrimaryKey": 1, "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ParentProductCategoryID", "isPrimaryKey": 0, "dataType": 3, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Name", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "rowguid", "isPrimaryKey": 0, "dataType": 9, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 16, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 4, "dependentOn": "", "nested": null }, { "fieldName": "ModifiedDate", "isPrimaryKey": 0, "dataType": 6, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }]);
                _super.call(this, opts, ProductCategoryAspect, ProductCategory);
            }
            ProductCategoryDb.prototype.findEntity = function (productCategoryID) {
                return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
            };
            ProductCategoryDb.prototype.toString = function () {
                return 'ProductCategoryDb';
            };
            ProductCategoryDb.prototype.createReadProductCategoryQuery = function () {
                return this.createQuery('ReadProductCategory');
            };
            return ProductCategoryDb;
        })(RIAPP.MOD.db.DbSet);
        DEMODB.ProductCategoryDb = ProductCategoryDb;
        var SalesInfo = (function (_super) {
            __extends(SalesInfo, _super);
            function SalesInfo(aspect) {
                _super.call(this);
                this.f_aspect = aspect;
            }
            SalesInfo.prototype.destroy = function () {
                if (this._isDestroyed)
                    return;
                this._isDestroyCalled = true;
                if (!!this._aspect && !this._aspect.getIsDestroyCalled()) {
                    this._aspect.destroy();
                }
                _super.prototype.destroy.call(this);
            };
            SalesInfo.prototype.toString = function () {
                return 'SalesInfo';
            };
            Object.defineProperty(SalesInfo.prototype, "_aspect", {
                get: function () {
                    return this.f_aspect;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesInfo.prototype, "_key", {
                get: function () {
                    return !!this.f_aspect ? this.f_aspect._key : null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesInfo.prototype, "SalesPerson", {
                get: function () {
                    return this.f_aspect._getFieldVal('SalesPerson');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('SalesPerson', v);
                },
                enumerable: true,
                configurable: true
            });
            return SalesInfo;
        })(RIAPP.BaseObject);
        DEMODB.SalesInfo = SalesInfo;
        var SalesInfoAspect = (function (_super) {
            __extends(SalesInfoAspect, _super);
            function SalesInfoAspect(dbSet, row, names) {
                _super.call(this, dbSet, row, names);
                this._item = new SalesInfo(this);
            }
            SalesInfoAspect.prototype.toString = function () {
                return 'SalesInfoAspect';
            };
            return SalesInfoAspect;
        })(RIAPP.MOD.db.EntityAspect);
        var SalesInfoDb = (function (_super) {
            __extends(SalesInfoDb, _super);
            function SalesInfoDb(dbContext) {
                var self = this, opts = {
                    dbContext: dbContext,
                    dbSetInfo: { "fieldInfos": null, "enablePaging": true, "pageSize": 25, "dbSetName": "SalesInfo" },
                    childAssoc: ([]),
                    parentAssoc: ([])
                }, utils = RIAPP.global.utils;
                opts.dbSetInfo.fieldInfos = ([{ "fieldName": "SalesPerson", "isPrimaryKey": 1, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }]);
                _super.call(this, opts, SalesInfoAspect, SalesInfo);
            }
            SalesInfoDb.prototype.findEntity = function (salesPerson) {
                return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
            };
            SalesInfoDb.prototype.toString = function () {
                return 'SalesInfoDb';
            };
            SalesInfoDb.prototype.createReadSalesInfoQuery = function () {
                return this.createQuery('ReadSalesInfo');
            };
            return SalesInfoDb;
        })(RIAPP.MOD.db.DbSet);
        DEMODB.SalesInfoDb = SalesInfoDb;
        var LookUpProduct = (function (_super) {
            __extends(LookUpProduct, _super);
            function LookUpProduct(aspect) {
                _super.call(this);
                this.f_aspect = aspect;
            }
            LookUpProduct.prototype.destroy = function () {
                if (this._isDestroyed)
                    return;
                this._isDestroyCalled = true;
                if (!!this._aspect && !this._aspect.getIsDestroyCalled()) {
                    this._aspect.destroy();
                }
                _super.prototype.destroy.call(this);
            };
            LookUpProduct.prototype.toString = function () {
                return 'LookUpProduct';
            };
            Object.defineProperty(LookUpProduct.prototype, "_aspect", {
                get: function () {
                    return this.f_aspect;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LookUpProduct.prototype, "_key", {
                get: function () {
                    return !!this.f_aspect ? this.f_aspect._key : null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LookUpProduct.prototype, "ProductID", {
                get: function () {
                    return this.f_aspect._getFieldVal('ProductID');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('ProductID', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LookUpProduct.prototype, "Name", {
                get: function () {
                    return this.f_aspect._getFieldVal('Name');
                },
                set: function (v) {
                    this.f_aspect._setFieldVal('Name', v);
                },
                enumerable: true,
                configurable: true
            });
            return LookUpProduct;
        })(RIAPP.BaseObject);
        DEMODB.LookUpProduct = LookUpProduct;
        var LookUpProductAspect = (function (_super) {
            __extends(LookUpProductAspect, _super);
            function LookUpProductAspect(dbSet, row, names) {
                _super.call(this, dbSet, row, names);
                this._item = new LookUpProduct(this);
            }
            LookUpProductAspect.prototype.toString = function () {
                return 'LookUpProductAspect';
            };
            return LookUpProductAspect;
        })(RIAPP.MOD.db.EntityAspect);
        var LookUpProductDb = (function (_super) {
            __extends(LookUpProductDb, _super);
            function LookUpProductDb(dbContext) {
                var self = this, opts = {
                    dbContext: dbContext,
                    dbSetInfo: { "fieldInfos": null, "enablePaging": true, "pageSize": 25, "dbSetName": "LookUpProduct" },
                    childAssoc: ([]),
                    parentAssoc: ([])
                }, utils = RIAPP.global.utils;
                opts.dbSetInfo.fieldInfos = ([{ "fieldName": "ProductID", "isPrimaryKey": 1, "dataType": 3, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Name", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }]);
                _super.call(this, opts, LookUpProductAspect, LookUpProduct);
            }
            LookUpProductDb.prototype.findEntity = function (productID) {
                return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
            };
            LookUpProductDb.prototype.toString = function () {
                return 'LookUpProductDb';
            };
            LookUpProductDb.prototype.createReadProductLookUpQuery = function () {
                return this.createQuery('ReadProductLookUp');
            };
            return LookUpProductDb;
        })(RIAPP.MOD.db.DbSet);
        DEMODB.LookUpProductDb = LookUpProductDb;
        var AddressInfo = (function (_super) {
            __extends(AddressInfo, _super);
            function AddressInfo(aspect) {
                _super.call(this);
                this.f_aspect = aspect;
            }
            AddressInfo.prototype.destroy = function () {
                if (this._isDestroyed)
                    return;
                this._isDestroyCalled = true;
                if (!!this._aspect && !this._aspect.getIsDestroyCalled()) {
                    this._aspect.destroy();
                }
                _super.prototype.destroy.call(this);
            };
            AddressInfo.prototype.toString = function () {
                return 'AddressInfo';
            };
            Object.defineProperty(AddressInfo.prototype, "_aspect", {
                get: function () {
                    return this.f_aspect;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AddressInfo.prototype, "_key", {
                get: function () {
                    return !!this.f_aspect ? this.f_aspect._key : null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AddressInfo.prototype, "AddressID", {
                get: function () {
                    return this.f_aspect._getFieldVal('AddressID');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AddressInfo.prototype, "AddressLine1", {
                get: function () {
                    return this.f_aspect._getFieldVal('AddressLine1');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AddressInfo.prototype, "City", {
                get: function () {
                    return this.f_aspect._getFieldVal('City');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AddressInfo.prototype, "StateProvince", {
                get: function () {
                    return this.f_aspect._getFieldVal('StateProvince');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AddressInfo.prototype, "CountryRegion", {
                get: function () {
                    return this.f_aspect._getFieldVal('CountryRegion');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AddressInfo.prototype, "CustomerAddresses", {
                get: function () {
                    return this.f_aspect._getNavFieldVal('CustomerAddresses');
                },
                enumerable: true,
                configurable: true
            });
            return AddressInfo;
        })(RIAPP.BaseObject);
        DEMODB.AddressInfo = AddressInfo;
        var AddressInfoAspect = (function (_super) {
            __extends(AddressInfoAspect, _super);
            function AddressInfoAspect(dbSet, row, names) {
                _super.call(this, dbSet, row, names);
                this._item = new AddressInfo(this);
            }
            AddressInfoAspect.prototype.toString = function () {
                return 'AddressInfoAspect';
            };
            return AddressInfoAspect;
        })(RIAPP.MOD.db.EntityAspect);
        var AddressInfoDb = (function (_super) {
            __extends(AddressInfoDb, _super);
            function AddressInfoDb(dbContext) {
                var self = this, opts = {
                    dbContext: dbContext,
                    dbSetInfo: { "fieldInfos": null, "enablePaging": false, "pageSize": 25, "dbSetName": "AddressInfo" },
                    childAssoc: ([]),
                    parentAssoc: ([{ "name": "CustAddrToAddress2", "parentDbSetName": "AddressInfo", "childDbSetName": "CustomerAddress", "childToParentName": "AddressInfo", "parentToChildrenName": "CustomerAddresses", "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "AddressID" }] }])
                }, utils = RIAPP.global.utils;
                opts.dbSetInfo.fieldInfos = ([{ "fieldName": "AddressID", "isPrimaryKey": 1, "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "AddressLine1", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": true, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 200, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "City", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": true, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 30, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "StateProvince", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": true, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "CountryRegion", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": true, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "CustomerAddresses", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "", "nested": null }]);
                _super.call(this, opts, AddressInfoAspect, AddressInfo);
            }
            AddressInfoDb.prototype.findEntity = function (addressID) {
                return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
            };
            AddressInfoDb.prototype.toString = function () {
                return 'AddressInfoDb';
            };
            AddressInfoDb.prototype.createReadAddressInfoQuery = function () {
                return this.createQuery('ReadAddressInfo');
            };
            return AddressInfoDb;
        })(RIAPP.MOD.db.DbSet);
        DEMODB.AddressInfoDb = AddressInfoDb;
        var DbSets = (function (_super) {
            __extends(DbSets, _super);
            function DbSets(dbContext) {
                _super.call(this, dbContext);
                this._dbSetNames = ["Customer", "CustomerAddress", "Address", "Product", "ProductModel", "SalesOrderHeader", "SalesOrderDetail", "ProductCategory", "SalesInfo", "LookUpProduct", "AddressInfo"];
                this._createDbSet("Customer", CustomerDb);
                this._createDbSet("CustomerAddress", CustomerAddressDb);
                this._createDbSet("Address", AddressDb);
                this._createDbSet("Product", ProductDb);
                this._createDbSet("ProductModel", ProductModelDb);
                this._createDbSet("SalesOrderHeader", SalesOrderHeaderDb);
                this._createDbSet("SalesOrderDetail", SalesOrderDetailDb);
                this._createDbSet("ProductCategory", ProductCategoryDb);
                this._createDbSet("SalesInfo", SalesInfoDb);
                this._createDbSet("LookUpProduct", LookUpProductDb);
                this._createDbSet("AddressInfo", AddressInfoDb);
            }
            Object.defineProperty(DbSets.prototype, "Customer", {
                get: function () {
                    return this.getDbSet("Customer");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DbSets.prototype, "CustomerAddress", {
                get: function () {
                    return this.getDbSet("CustomerAddress");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DbSets.prototype, "Address", {
                get: function () {
                    return this.getDbSet("Address");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DbSets.prototype, "Product", {
                get: function () {
                    return this.getDbSet("Product");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DbSets.prototype, "ProductModel", {
                get: function () {
                    return this.getDbSet("ProductModel");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DbSets.prototype, "SalesOrderHeader", {
                get: function () {
                    return this.getDbSet("SalesOrderHeader");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DbSets.prototype, "SalesOrderDetail", {
                get: function () {
                    return this.getDbSet("SalesOrderDetail");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DbSets.prototype, "ProductCategory", {
                get: function () {
                    return this.getDbSet("ProductCategory");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DbSets.prototype, "SalesInfo", {
                get: function () {
                    return this.getDbSet("SalesInfo");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DbSets.prototype, "LookUpProduct", {
                get: function () {
                    return this.getDbSet("LookUpProduct");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DbSets.prototype, "AddressInfo", {
                get: function () {
                    return this.getDbSet("AddressInfo");
                },
                enumerable: true,
                configurable: true
            });
            return DbSets;
        })(RIAPP.MOD.db.DbSets);
        DEMODB.DbSets = DbSets;
        var DbContext = (function (_super) {
            __extends(DbContext, _super);
            function DbContext() {
                _super.apply(this, arguments);
            }
            DbContext.prototype._initDbSets = function () {
                _super.prototype._initDbSets.call(this);
                this._dbSets = new DbSets(this);
                var associations = [{ "name": "CustAddrToCustomer", "parentDbSetName": "Customer", "childDbSetName": "CustomerAddress", "childToParentName": "Customer", "parentToChildrenName": "CustomerAddresses", "onDeleteAction": 0, "fieldRels": [{ "parentField": "CustomerID", "childField": "CustomerID" }] }, { "name": "CustAddrToAddress", "parentDbSetName": "Address", "childDbSetName": "CustomerAddress", "childToParentName": "Address", "parentToChildrenName": "CustomerAddresses", "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "AddressID" }] }, { "name": "CustAddrToAddress2", "parentDbSetName": "AddressInfo", "childDbSetName": "CustomerAddress", "childToParentName": "AddressInfo", "parentToChildrenName": "CustomerAddresses", "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "AddressID" }] }, { "name": "OrdDetailsToOrder", "parentDbSetName": "SalesOrderHeader", "childDbSetName": "SalesOrderDetail", "childToParentName": "SalesOrderHeader", "parentToChildrenName": "SalesOrderDetails", "onDeleteAction": 1, "fieldRels": [{ "parentField": "SalesOrderID", "childField": "SalesOrderID" }] }, { "name": "OrdDetailsToProduct", "parentDbSetName": "Product", "childDbSetName": "SalesOrderDetail", "childToParentName": "Product", "parentToChildrenName": "SalesOrderDetails", "onDeleteAction": 0, "fieldRels": [{ "parentField": "ProductID", "childField": "ProductID" }] }, { "name": "OrdersToCustomer", "parentDbSetName": "Customer", "childDbSetName": "SalesOrderHeader", "childToParentName": "Customer", "parentToChildrenName": null, "onDeleteAction": 0, "fieldRels": [{ "parentField": "CustomerID", "childField": "CustomerID" }] }, { "name": "OrdersToShipAddr", "parentDbSetName": "Address", "childDbSetName": "SalesOrderHeader", "childToParentName": "Address", "parentToChildrenName": null, "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "ShipToAddressID" }] }, { "name": "OrdersToBillAddr", "parentDbSetName": "Address", "childDbSetName": "SalesOrderHeader", "childToParentName": "Address1", "parentToChildrenName": null, "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "BillToAddressID" }] }];
                this._initAssociations(associations);
                var methods = [{ "methodName": "ReadProductLookUp", "parameters": [], "methodResult": true, "isQuery": true }, { "methodName": "ReadProduct", "parameters": [{ "name": "param1", "dataType": 3, "isArray": true, "isNullable": false, "dateConversion": 0, "ordinal": 0 }, { "name": "param2", "dataType": 1, "isArray": false, "isNullable": false, "dateConversion": 0, "ordinal": 1 }], "methodResult": true, "isQuery": true }, { "methodName": "ReadProductByIds", "parameters": [{ "name": "productIDs", "dataType": 3, "isArray": true, "isNullable": false, "dateConversion": 0, "ordinal": 0 }], "methodResult": true, "isQuery": true }, { "methodName": "ReadCustomer", "parameters": [{ "name": "includeNav", "dataType": 2, "isArray": false, "isNullable": true, "dateConversion": 0, "ordinal": 0 }], "methodResult": true, "isQuery": true }, { "methodName": "ReadAddress", "parameters": [], "methodResult": true, "isQuery": true }, { "methodName": "ReadAddressByIds", "parameters": [{ "name": "addressIDs", "dataType": 3, "isArray": true, "isNullable": false, "dateConversion": 0, "ordinal": 0 }], "methodResult": true, "isQuery": true }, { "methodName": "ReadCustomerAddress", "parameters": [], "methodResult": true, "isQuery": true }, { "methodName": "ReadAddressForCustomers", "parameters": [{ "name": "custIDs", "dataType": 3, "isArray": true, "isNullable": false, "dateConversion": 0, "ordinal": 0 }], "methodResult": true, "isQuery": true }, { "methodName": "ReadSalesOrderHeader", "parameters": [], "methodResult": true, "isQuery": true }, { "methodName": "ReadSalesOrderDetail", "parameters": [], "methodResult": true, "isQuery": true }, { "methodName": "ReadProductCategory", "parameters": [], "methodResult": true, "isQuery": true }, { "methodName": "ReadProductModel", "parameters": [], "methodResult": true, "isQuery": true }, { "methodName": "ReadSalesInfo", "parameters": [], "methodResult": true, "isQuery": true }, { "methodName": "ReadAddressInfo", "parameters": [], "methodResult": true, "isQuery": true }, { "methodName": "TestInvoke", "parameters": [{ "name": "param1", "dataType": 10, "isArray": false, "isNullable": false, "dateConversion": 0, "ordinal": 0 }, { "name": "param2", "dataType": 1, "isArray": false, "isNullable": false, "dateConversion": 0, "ordinal": 1 }], "methodResult": true, "isQuery": false }, { "methodName": "TestComplexInvoke", "parameters": [{ "name": "info", "dataType": 0, "isArray": false, "isNullable": false, "dateConversion": 0, "ordinal": 0 }, { "name": "keys", "dataType": 0, "isArray": true, "isNullable": false, "dateConversion": 0, "ordinal": 1 }], "methodResult": false, "isQuery": false }];
                this._initMethods(methods);
            };
            Object.defineProperty(DbContext.prototype, "associations", {
                get: function () {
                    return this._assoc;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DbContext.prototype, "dbSets", {
                get: function () {
                    return this._dbSets;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DbContext.prototype, "serviceMethods", {
                get: function () {
                    return this._svcMethods;
                },
                enumerable: true,
                configurable: true
            });
            return DbContext;
        })(RIAPP.MOD.db.DbContext);
        DEMODB.DbContext = DbContext;
    })(DEMODB = RIAPP.DEMODB || (RIAPP.DEMODB = {}));
})(RIAPP || (RIAPP = {}));
//# sourceMappingURL=demoDB.js.map
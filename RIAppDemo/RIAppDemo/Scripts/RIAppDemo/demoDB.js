var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="..\jriapp.ts"/>
var RIAPP;
(function (RIAPP) {
    'use strict';
    (function (DEMODB) {
        (function (TestEnum) {
            TestEnum[TestEnum["None"] = 0] = "None";
            TestEnum[TestEnum["OK"] = 1] = "OK";
            TestEnum[TestEnum["Error"] = 2] = "Error";
            TestEnum[TestEnum["Loading"] = 3] = "Loading";
        })(DEMODB.TestEnum || (DEMODB.TestEnum = {}));
        var TestEnum = DEMODB.TestEnum;

        /*
        An enum for testing of conversion C# types to typescript
        */
        (function (TestEnum2) {
            TestEnum2[TestEnum2["None"] = 0] = "None";
            TestEnum2[TestEnum2["One"] = 1] = "One";
            TestEnum2[TestEnum2["Two"] = 2] = "Two";
            TestEnum2[TestEnum2["Three"] = 3] = "Three";
        })(DEMODB.TestEnum2 || (DEMODB.TestEnum2 = {}));
        var TestEnum2 = DEMODB.TestEnum2;

        var TestModelListItem = (function (_super) {
            __extends(TestModelListItem, _super);
            function TestModelListItem(coll, obj) {
                _super.call(this, coll, obj);
            }
            Object.defineProperty(TestModelListItem.prototype, "Key", {
                get: function () {
                    return this._getProp('Key');
                },
                set: function (v) {
                    this._setProp('Key', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TestModelListItem.prototype, "SomeProperty1", {
                get: function () {
                    return this._getProp('SomeProperty1');
                },
                set: function (v) {
                    this._setProp('SomeProperty1', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TestModelListItem.prototype, "SomeProperty2", {
                get: function () {
                    return this._getProp('SomeProperty2');
                },
                set: function (v) {
                    this._setProp('SomeProperty2', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TestModelListItem.prototype, "SomeProperty3", {
                get: function () {
                    return this._getProp('SomeProperty3');
                },
                set: function (v) {
                    this._setProp('SomeProperty3', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TestModelListItem.prototype, "MoreComplexProperty", {
                get: function () {
                    return this._getProp('MoreComplexProperty');
                },
                set: function (v) {
                    this._setProp('MoreComplexProperty', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TestModelListItem.prototype, "EnumProperty", {
                get: function () {
                    return this._getProp('EnumProperty');
                },
                set: function (v) {
                    this._setProp('EnumProperty', v);
                },
                enumerable: true,
                configurable: true
            });
            TestModelListItem.prototype.asInterface = function () {
                return this;
            };
            return TestModelListItem;
        })(RIAPP.MOD.collection.ListItem);
        DEMODB.TestModelListItem = TestModelListItem;

        var TestDictionary = (function (_super) {
            __extends(TestDictionary, _super);
            function TestDictionary() {
                _super.call(this, TestModelListItem, 'Key', [{ name: 'Key', dtype: 1 }, { name: 'SomeProperty1', dtype: 1 }, { name: 'SomeProperty2', dtype: 10 }, { name: 'SomeProperty3', dtype: 0 }, { name: 'MoreComplexProperty', dtype: 0 }, { name: 'EnumProperty', dtype: 0 }]);
                this._type_name = 'TestDictionary';
            }
            Object.defineProperty(TestDictionary.prototype, "items2", {
                get: function () {
                    return this.items;
                },
                enumerable: true,
                configurable: true
            });
            return TestDictionary;
        })(RIAPP.MOD.collection.BaseDictionary);
        DEMODB.TestDictionary = TestDictionary;

        var TestList = (function (_super) {
            __extends(TestList, _super);
            function TestList() {
                _super.call(this, TestModelListItem, [{ name: 'Key', dtype: 1 }, { name: 'SomeProperty1', dtype: 1 }, { name: 'SomeProperty2', dtype: 10 }, { name: 'SomeProperty3', dtype: 0 }, { name: 'MoreComplexProperty', dtype: 0 }, { name: 'EnumProperty', dtype: 0 }]);
                this._type_name = 'TestList';
            }
            Object.defineProperty(TestList.prototype, "items2", {
                get: function () {
                    return this.items;
                },
                enumerable: true,
                configurable: true
            });
            return TestList;
        })(RIAPP.MOD.collection.BaseList);
        DEMODB.TestList = TestList;

        var KeyValListItem = (function (_super) {
            __extends(KeyValListItem, _super);
            function KeyValListItem(coll, obj) {
                _super.call(this, coll, obj);
            }
            Object.defineProperty(KeyValListItem.prototype, "key", {
                get: function () {
                    return this._getProp('key');
                },
                set: function (v) {
                    this._setProp('key', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(KeyValListItem.prototype, "val", {
                get: function () {
                    return this._getProp('val');
                },
                set: function (v) {
                    this._setProp('val', v);
                },
                enumerable: true,
                configurable: true
            });
            KeyValListItem.prototype.asInterface = function () {
                return this;
            };
            return KeyValListItem;
        })(RIAPP.MOD.collection.ListItem);
        DEMODB.KeyValListItem = KeyValListItem;

        var KeyValDictionary = (function (_super) {
            __extends(KeyValDictionary, _super);
            function KeyValDictionary() {
                _super.call(this, KeyValListItem, 'key', [{ name: 'key', dtype: 3 }, { name: 'val', dtype: 1 }]);
                this._type_name = 'KeyValDictionary';
            }
            Object.defineProperty(KeyValDictionary.prototype, "items2", {
                get: function () {
                    return this.items;
                },
                enumerable: true,
                configurable: true
            });
            return KeyValDictionary;
        })(RIAPP.MOD.collection.BaseDictionary);
        DEMODB.KeyValDictionary = KeyValDictionary;

        var HistoryItemListItem = (function (_super) {
            __extends(HistoryItemListItem, _super);
            function HistoryItemListItem(coll, obj) {
                _super.call(this, coll, obj);
            }
            Object.defineProperty(HistoryItemListItem.prototype, "radioValue", {
                get: function () {
                    return this._getProp('radioValue');
                },
                set: function (v) {
                    this._setProp('radioValue', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HistoryItemListItem.prototype, "time", {
                get: function () {
                    return this._getProp('time');
                },
                set: function (v) {
                    this._setProp('time', v);
                },
                enumerable: true,
                configurable: true
            });
            HistoryItemListItem.prototype.asInterface = function () {
                return this;
            };
            return HistoryItemListItem;
        })(RIAPP.MOD.collection.ListItem);
        DEMODB.HistoryItemListItem = HistoryItemListItem;

        var HistoryList = (function (_super) {
            __extends(HistoryList, _super);
            function HistoryList() {
                _super.call(this, HistoryItemListItem, [{ name: 'radioValue', dtype: 1 }, { name: 'time', dtype: 6 }]);
                this._type_name = 'HistoryList';
            }
            Object.defineProperty(HistoryList.prototype, "items2", {
                get: function () {
                    return this.items;
                },
                enumerable: true,
                configurable: true
            });
            return HistoryList;
        })(RIAPP.MOD.collection.BaseList);
        DEMODB.HistoryList = HistoryList;

        var Customer = (function (_super) {
            __extends(Customer, _super);
            function Customer() {
                _super.apply(this, arguments);
            }
            Object.defineProperty(Customer.prototype, "CustomerID", {
                get: function () {
                    return this._getFieldVal('CustomerID');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Customer.prototype, "NameStyle", {
                get: function () {
                    return this._getFieldVal('NameStyle');
                },
                set: function (v) {
                    this._setFieldVal('NameStyle', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Customer.prototype, "Title", {
                get: function () {
                    return this._getFieldVal('Title');
                },
                set: function (v) {
                    this._setFieldVal('Title', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Customer.prototype, "FirstName", {
                get: function () {
                    return this._getFieldVal('FirstName');
                },
                set: function (v) {
                    this._setFieldVal('FirstName', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Customer.prototype, "MiddleName", {
                get: function () {
                    return this._getFieldVal('MiddleName');
                },
                set: function (v) {
                    this._setFieldVal('MiddleName', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Customer.prototype, "LastName", {
                get: function () {
                    return this._getFieldVal('LastName');
                },
                set: function (v) {
                    this._setFieldVal('LastName', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Customer.prototype, "Suffix", {
                get: function () {
                    return this._getFieldVal('Suffix');
                },
                set: function (v) {
                    this._setFieldVal('Suffix', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Customer.prototype, "CompanyName", {
                get: function () {
                    return this._getFieldVal('CompanyName');
                },
                set: function (v) {
                    this._setFieldVal('CompanyName', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Customer.prototype, "SalesPerson", {
                get: function () {
                    return this._getFieldVal('SalesPerson');
                },
                set: function (v) {
                    this._setFieldVal('SalesPerson', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Customer.prototype, "EmailAddress", {
                get: function () {
                    return this._getFieldVal('EmailAddress');
                },
                set: function (v) {
                    this._setFieldVal('EmailAddress', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Customer.prototype, "Phone", {
                get: function () {
                    return this._getFieldVal('Phone');
                },
                set: function (v) {
                    this._setFieldVal('Phone', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Customer.prototype, "PasswordHash", {
                get: function () {
                    return this._getFieldVal('PasswordHash');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Customer.prototype, "PasswordSalt", {
                get: function () {
                    return this._getFieldVal('PasswordSalt');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Customer.prototype, "rowguid", {
                get: function () {
                    return this._getFieldVal('rowguid');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Customer.prototype, "ModifiedDate", {
                get: function () {
                    return this._getFieldVal('ModifiedDate');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Customer.prototype, "Name", {
                get: function () {
                    return this._dbSet._calcfldMap['Name'].getFunc.call(this);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Customer.prototype, "CustomerAddresses", {
                get: function () {
                    return this._dbSet._navfldMap['CustomerAddresses'].getFunc.call(this);
                },
                enumerable: true,
                configurable: true
            });

            Customer.prototype.getDbContext = function () {
                return _super.prototype.getDbContext.call(this);
            };
            Customer.prototype.getDbSet = function () {
                return _super.prototype.getDbSet.call(this);
            };
            Object.defineProperty(Customer.prototype, "_dbSet", {
                get: function () {
                    return this.getDbSet();
                },
                enumerable: true,
                configurable: true
            });
            Customer.prototype.toString = function () {
                return 'CustomerEntity';
            };
            Customer.prototype.asEntity = function () {
                return this;
            };
            Customer.prototype.asInterface = function () {
                return this;
            };
            return Customer;
        })(RIAPP.MOD.db.Entity);
        DEMODB.Customer = Customer;

        var CustomerDb = (function (_super) {
            __extends(CustomerDb, _super);
            function CustomerDb(dbContext) {
                var self = this, opts = {
                    dbContext: dbContext,
                    dbSetInfo: { "dbSetName": "Customer", "enablePaging": true, "fieldInfos": [{ "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "CustomerID", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 1, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 4, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 2, "dateConversion": 0, "dependentOn": "", "fieldName": "NameStyle", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 1, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "Title", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 8, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "FirstName", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 50, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "MiddleName", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 50, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "LastName", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 50, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "Suffix", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 10, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "CompanyName", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 128, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "SalesPerson", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 256, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "EmailAddress", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 50, "range": "", "regex": "^[_a-z0-9-]+(\\.[_a-z0-9-]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,4})$" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "Phone", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 25, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "PasswordHash", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 128, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "PasswordSalt", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 10, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 9, "dateConversion": 0, "dependentOn": "", "fieldName": "rowguid", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": true, "maxLength": 16, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 6, "dateConversion": 0, "dependentOn": "", "fieldName": "ModifiedDate", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 8, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "FirstName,MiddleName,LastName", "fieldName": "Name", "isAutoGenerated": false, "isCalculated": true, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": -1, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 0, "dateConversion": 0, "dependentOn": "", "fieldName": "CustomerAddresses", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": true, "isNavigation": true, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": -1, "range": "", "regex": "" }], "pageSize": 25 },
                    childAssoc: [],
                    parentAssoc: [{ "childDbSetName": "CustomerAddress", "childToParentName": "Customer", "fieldRels": [{ "childField": "CustomerID", "parentField": "CustomerID" }], "name": "CustAddrToCustomer", "onDeleteAction": 0, "parentDbSetName": "Customer", "parentToChildrenName": "CustomerAddresses" }, { "childDbSetName": "SalesOrderHeader", "childToParentName": "Customer", "fieldRels": [{ "childField": "CustomerID", "parentField": "CustomerID" }], "name": "OrdersToCustomer", "onDeleteAction": 0, "parentDbSetName": "Customer", "parentToChildrenName": null }]
                }, utils = RIAPP.global.utils;
                _super.call(this, opts);
                self._entityType = Customer;

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    f.dependents = [];
                    self._fieldMap[f.fieldName] = f;
                });

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    if (!!f.isNavigation) {
                        self._navfldMap[f.fieldName] = self._doNavigationField(opts, f);
                    } else if (!!f.isCalculated) {
                        self._calcfldMap[f.fieldName] = self._doCalculatedField(opts, f);
                    }
                });

                self._mapAssocFields();
            }
            CustomerDb.prototype.createReadCustomerQuery = function (args) {
                var query = this.createQuery('ReadCustomer');
                query.params = args;
                return query;
            };

            CustomerDb.prototype.defineNameField = function (getFunc) {
                this.defineCalculatedField('Name', getFunc);
            };

            Object.defineProperty(CustomerDb.prototype, "items2", {
                get: function () {
                    return this.items;
                },
                enumerable: true,
                configurable: true
            });
            return CustomerDb;
        })(RIAPP.MOD.db.DbSet);
        DEMODB.CustomerDb = CustomerDb;

        var CustomerAddress = (function (_super) {
            __extends(CustomerAddress, _super);
            function CustomerAddress() {
                _super.apply(this, arguments);
            }
            Object.defineProperty(CustomerAddress.prototype, "CustomerID", {
                get: function () {
                    return this._getFieldVal('CustomerID');
                },
                set: function (v) {
                    this._setFieldVal('CustomerID', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomerAddress.prototype, "AddressID", {
                get: function () {
                    return this._getFieldVal('AddressID');
                },
                set: function (v) {
                    this._setFieldVal('AddressID', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomerAddress.prototype, "AddressType", {
                get: function () {
                    return this._getFieldVal('AddressType');
                },
                set: function (v) {
                    this._setFieldVal('AddressType', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomerAddress.prototype, "rowguid", {
                get: function () {
                    return this._getFieldVal('rowguid');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomerAddress.prototype, "ModifiedDate", {
                get: function () {
                    return this._getFieldVal('ModifiedDate');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomerAddress.prototype, "Customer", {
                get: function () {
                    return this._dbSet._navfldMap['Customer'].getFunc.call(this);
                },
                set: function (v) {
                    this._dbSet._navfldMap['Customer'].setFunc.call(this, v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomerAddress.prototype, "Address", {
                get: function () {
                    return this._dbSet._navfldMap['Address'].getFunc.call(this);
                },
                set: function (v) {
                    this._dbSet._navfldMap['Address'].setFunc.call(this, v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomerAddress.prototype, "AddressInfo", {
                get: function () {
                    return this._dbSet._navfldMap['AddressInfo'].getFunc.call(this);
                },
                set: function (v) {
                    this._dbSet._navfldMap['AddressInfo'].setFunc.call(this, v);
                },
                enumerable: true,
                configurable: true
            });

            CustomerAddress.prototype.getDbContext = function () {
                return _super.prototype.getDbContext.call(this);
            };
            CustomerAddress.prototype.getDbSet = function () {
                return _super.prototype.getDbSet.call(this);
            };
            Object.defineProperty(CustomerAddress.prototype, "_dbSet", {
                get: function () {
                    return this.getDbSet();
                },
                enumerable: true,
                configurable: true
            });
            CustomerAddress.prototype.toString = function () {
                return 'CustomerAddressEntity';
            };
            CustomerAddress.prototype.asEntity = function () {
                return this;
            };
            CustomerAddress.prototype.asInterface = function () {
                return this;
            };
            return CustomerAddress;
        })(RIAPP.MOD.db.Entity);
        DEMODB.CustomerAddress = CustomerAddress;

        var CustomerAddressDb = (function (_super) {
            __extends(CustomerAddressDb, _super);
            function CustomerAddressDb(dbContext) {
                var self = this, opts = {
                    dbContext: dbContext,
                    dbSetInfo: { "dbSetName": "CustomerAddress", "enablePaging": false, "fieldInfos": [{ "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "CustomerID", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 1, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 4, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "AddressID", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 2, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 4, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "AddressType", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": false, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 50, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 9, "dateConversion": 0, "dependentOn": "", "fieldName": "rowguid", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": true, "maxLength": 16, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 6, "dateConversion": 0, "dependentOn": "", "fieldName": "ModifiedDate", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": false, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 8, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 0, "dateConversion": 0, "dependentOn": "CustomerID", "fieldName": "Customer", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": true, "isNavigation": true, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": -1, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 0, "dateConversion": 0, "dependentOn": "AddressID", "fieldName": "Address", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": true, "isNavigation": true, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": -1, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 0, "dateConversion": 0, "dependentOn": "AddressID", "fieldName": "AddressInfo", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": true, "isNavigation": true, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": -1, "range": "", "regex": "" }], "pageSize": 25 },
                    childAssoc: [{ "childDbSetName": "CustomerAddress", "childToParentName": "Customer", "fieldRels": [{ "childField": "CustomerID", "parentField": "CustomerID" }], "name": "CustAddrToCustomer", "onDeleteAction": 0, "parentDbSetName": "Customer", "parentToChildrenName": "CustomerAddresses" }, { "childDbSetName": "CustomerAddress", "childToParentName": "Address", "fieldRels": [{ "childField": "AddressID", "parentField": "AddressID" }], "name": "CustAddrToAddress", "onDeleteAction": 0, "parentDbSetName": "Address", "parentToChildrenName": "CustomerAddresses" }, { "childDbSetName": "CustomerAddress", "childToParentName": "AddressInfo", "fieldRels": [{ "childField": "AddressID", "parentField": "AddressID" }], "name": "CustAddrToAddress2", "onDeleteAction": 0, "parentDbSetName": "AddressInfo", "parentToChildrenName": "CustomerAddresses" }],
                    parentAssoc: []
                }, utils = RIAPP.global.utils;
                _super.call(this, opts);
                self._entityType = CustomerAddress;

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    f.dependents = [];
                    self._fieldMap[f.fieldName] = f;
                });

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    if (!!f.isNavigation) {
                        self._navfldMap[f.fieldName] = self._doNavigationField(opts, f);
                    } else if (!!f.isCalculated) {
                        self._calcfldMap[f.fieldName] = self._doCalculatedField(opts, f);
                    }
                });

                self._mapAssocFields();
            }
            CustomerAddressDb.prototype.createReadCustomerAddressQuery = function () {
                return this.createQuery('ReadCustomerAddress');
            };
            CustomerAddressDb.prototype.createReadAddressForCustomersQuery = function (args) {
                var query = this.createQuery('ReadAddressForCustomers');
                query.params = args;
                return query;
            };

            Object.defineProperty(CustomerAddressDb.prototype, "items2", {
                get: function () {
                    return this.items;
                },
                enumerable: true,
                configurable: true
            });
            return CustomerAddressDb;
        })(RIAPP.MOD.db.DbSet);
        DEMODB.CustomerAddressDb = CustomerAddressDb;

        var Address = (function (_super) {
            __extends(Address, _super);
            function Address() {
                _super.apply(this, arguments);
            }
            Object.defineProperty(Address.prototype, "AddressID", {
                get: function () {
                    return this._getFieldVal('AddressID');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Address.prototype, "AddressLine1", {
                get: function () {
                    return this._getFieldVal('AddressLine1');
                },
                set: function (v) {
                    this._setFieldVal('AddressLine1', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Address.prototype, "AddressLine2", {
                get: function () {
                    return this._getFieldVal('AddressLine2');
                },
                set: function (v) {
                    this._setFieldVal('AddressLine2', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Address.prototype, "City", {
                get: function () {
                    return this._getFieldVal('City');
                },
                set: function (v) {
                    this._setFieldVal('City', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Address.prototype, "StateProvince", {
                get: function () {
                    return this._getFieldVal('StateProvince');
                },
                set: function (v) {
                    this._setFieldVal('StateProvince', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Address.prototype, "CountryRegion", {
                get: function () {
                    return this._getFieldVal('CountryRegion');
                },
                set: function (v) {
                    this._setFieldVal('CountryRegion', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Address.prototype, "PostalCode", {
                get: function () {
                    return this._getFieldVal('PostalCode');
                },
                set: function (v) {
                    this._setFieldVal('PostalCode', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Address.prototype, "rowguid", {
                get: function () {
                    return this._getFieldVal('rowguid');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Address.prototype, "ModifiedDate", {
                get: function () {
                    return this._getFieldVal('ModifiedDate');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Address.prototype, "CustomerAddresses", {
                get: function () {
                    return this._dbSet._navfldMap['CustomerAddresses'].getFunc.call(this);
                },
                enumerable: true,
                configurable: true
            });

            Address.prototype.getDbContext = function () {
                return _super.prototype.getDbContext.call(this);
            };
            Address.prototype.getDbSet = function () {
                return _super.prototype.getDbSet.call(this);
            };
            Object.defineProperty(Address.prototype, "_dbSet", {
                get: function () {
                    return this.getDbSet();
                },
                enumerable: true,
                configurable: true
            });
            Address.prototype.toString = function () {
                return 'AddressEntity';
            };
            Address.prototype.asEntity = function () {
                return this;
            };
            Address.prototype.asInterface = function () {
                return this;
            };
            return Address;
        })(RIAPP.MOD.db.Entity);
        DEMODB.Address = Address;

        var AddressDb = (function (_super) {
            __extends(AddressDb, _super);
            function AddressDb(dbContext) {
                var self = this, opts = {
                    dbContext: dbContext,
                    dbSetInfo: { "dbSetName": "Address", "enablePaging": false, "fieldInfos": [{ "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "AddressID", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 1, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 4, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "AddressLine1", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 60, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "AddressLine2", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 60, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "City", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 30, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "StateProvince", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 50, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "CountryRegion", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 50, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "PostalCode", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 15, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 9, "dateConversion": 0, "dependentOn": "", "fieldName": "rowguid", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": true, "maxLength": -1, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 6, "dateConversion": 0, "dependentOn": "", "fieldName": "ModifiedDate", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": -1, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 0, "dateConversion": 0, "dependentOn": "", "fieldName": "CustomerAddresses", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": true, "isNavigation": true, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": -1, "range": "", "regex": "" }], "pageSize": 25 },
                    childAssoc: [],
                    parentAssoc: [{ "childDbSetName": "CustomerAddress", "childToParentName": "Address", "fieldRels": [{ "childField": "AddressID", "parentField": "AddressID" }], "name": "CustAddrToAddress", "onDeleteAction": 0, "parentDbSetName": "Address", "parentToChildrenName": "CustomerAddresses" }, { "childDbSetName": "SalesOrderHeader", "childToParentName": "Address", "fieldRels": [{ "childField": "ShipToAddressID", "parentField": "AddressID" }], "name": "OrdersToShipAddr", "onDeleteAction": 0, "parentDbSetName": "Address", "parentToChildrenName": null }, { "childDbSetName": "SalesOrderHeader", "childToParentName": "Address1", "fieldRels": [{ "childField": "BillToAddressID", "parentField": "AddressID" }], "name": "OrdersToBillAddr", "onDeleteAction": 0, "parentDbSetName": "Address", "parentToChildrenName": null }]
                }, utils = RIAPP.global.utils;
                _super.call(this, opts);
                self._entityType = Address;

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    f.dependents = [];
                    self._fieldMap[f.fieldName] = f;
                });

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    if (!!f.isNavigation) {
                        self._navfldMap[f.fieldName] = self._doNavigationField(opts, f);
                    } else if (!!f.isCalculated) {
                        self._calcfldMap[f.fieldName] = self._doCalculatedField(opts, f);
                    }
                });

                self._mapAssocFields();
            }
            AddressDb.prototype.createReadAddressQuery = function () {
                return this.createQuery('ReadAddress');
            };
            AddressDb.prototype.createReadAddressByIdsQuery = function (args) {
                var query = this.createQuery('ReadAddressByIds');
                query.params = args;
                return query;
            };

            Object.defineProperty(AddressDb.prototype, "items2", {
                get: function () {
                    return this.items;
                },
                enumerable: true,
                configurable: true
            });
            return AddressDb;
        })(RIAPP.MOD.db.DbSet);
        DEMODB.AddressDb = AddressDb;

        var Product = (function (_super) {
            __extends(Product, _super);
            function Product() {
                _super.apply(this, arguments);
            }
            Object.defineProperty(Product.prototype, "ProductID", {
                get: function () {
                    return this._getFieldVal('ProductID');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Product.prototype, "Name", {
                get: function () {
                    return this._getFieldVal('Name');
                },
                set: function (v) {
                    this._setFieldVal('Name', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Product.prototype, "ProductNumber", {
                get: function () {
                    return this._getFieldVal('ProductNumber');
                },
                set: function (v) {
                    this._setFieldVal('ProductNumber', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Product.prototype, "Color", {
                get: function () {
                    return this._getFieldVal('Color');
                },
                set: function (v) {
                    this._setFieldVal('Color', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Product.prototype, "StandardCost", {
                get: function () {
                    return this._getFieldVal('StandardCost');
                },
                set: function (v) {
                    this._setFieldVal('StandardCost', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Product.prototype, "ListPrice", {
                get: function () {
                    return this._getFieldVal('ListPrice');
                },
                set: function (v) {
                    this._setFieldVal('ListPrice', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Product.prototype, "Size", {
                get: function () {
                    return this._getFieldVal('Size');
                },
                set: function (v) {
                    this._setFieldVal('Size', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Product.prototype, "Weight", {
                get: function () {
                    return this._getFieldVal('Weight');
                },
                set: function (v) {
                    this._setFieldVal('Weight', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Product.prototype, "ProductCategoryID", {
                get: function () {
                    return this._getFieldVal('ProductCategoryID');
                },
                set: function (v) {
                    this._setFieldVal('ProductCategoryID', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Product.prototype, "ProductModelID", {
                get: function () {
                    return this._getFieldVal('ProductModelID');
                },
                set: function (v) {
                    this._setFieldVal('ProductModelID', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Product.prototype, "SellStartDate", {
                get: function () {
                    return this._getFieldVal('SellStartDate');
                },
                set: function (v) {
                    this._setFieldVal('SellStartDate', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Product.prototype, "SellEndDate", {
                get: function () {
                    return this._getFieldVal('SellEndDate');
                },
                set: function (v) {
                    this._setFieldVal('SellEndDate', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Product.prototype, "DiscontinuedDate", {
                get: function () {
                    return this._getFieldVal('DiscontinuedDate');
                },
                set: function (v) {
                    this._setFieldVal('DiscontinuedDate', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Product.prototype, "rowguid", {
                get: function () {
                    return this._getFieldVal('rowguid');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Product.prototype, "ModifiedDate", {
                get: function () {
                    return this._getFieldVal('ModifiedDate');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Product.prototype, "IsActive", {
                get: function () {
                    return this._dbSet._calcfldMap['IsActive'].getFunc.call(this);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Product.prototype, "ThumbnailPhotoFileName", {
                get: function () {
                    return this._getFieldVal('ThumbnailPhotoFileName');
                },
                set: function (v) {
                    this._setFieldVal('ThumbnailPhotoFileName', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Product.prototype, "SalesOrderDetails", {
                get: function () {
                    return this._dbSet._navfldMap['SalesOrderDetails'].getFunc.call(this);
                },
                enumerable: true,
                configurable: true
            });

            Product.prototype.getDbContext = function () {
                return _super.prototype.getDbContext.call(this);
            };
            Product.prototype.getDbSet = function () {
                return _super.prototype.getDbSet.call(this);
            };
            Object.defineProperty(Product.prototype, "_dbSet", {
                get: function () {
                    return this.getDbSet();
                },
                enumerable: true,
                configurable: true
            });
            Product.prototype.toString = function () {
                return 'ProductEntity';
            };
            Product.prototype.asEntity = function () {
                return this;
            };
            Product.prototype.asInterface = function () {
                return this;
            };
            return Product;
        })(RIAPP.MOD.db.Entity);
        DEMODB.Product = Product;

        var ProductDb = (function (_super) {
            __extends(ProductDb, _super);
            function ProductDb(dbContext) {
                var self = this, opts = {
                    dbContext: dbContext,
                    dbSetInfo: { "dbSetName": "Product", "enablePaging": true, "fieldInfos": [{ "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "ProductID", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 1, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 4, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "Name", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": false, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 50, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "ProductNumber", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": false, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 25, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "Color", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": false, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 15, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 4, "dateConversion": 0, "dependentOn": "", "fieldName": "StandardCost", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": false, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 8, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 4, "dateConversion": 0, "dependentOn": "", "fieldName": "ListPrice", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": false, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 8, "range": "100,5000", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "Size", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": false, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 5, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 4, "dateConversion": 0, "dependentOn": "", "fieldName": "Weight", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": false, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 5, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "ProductCategoryID", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": false, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 4, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "ProductModelID", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": false, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 4, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 7, "dateConversion": 0, "dependentOn": "", "fieldName": "SellStartDate", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 8, "range": "2000-01-01,2015-01-01", "regex": "" }, { "allowClientDefault": false, "dataType": 7, "dateConversion": 0, "dependentOn": "", "fieldName": "SellEndDate", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 8, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 7, "dateConversion": 0, "dependentOn": "", "fieldName": "DiscontinuedDate", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": false, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 8, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 9, "dateConversion": 0, "dependentOn": "", "fieldName": "rowguid", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": true, "maxLength": 16, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 6, "dateConversion": 0, "dependentOn": "", "fieldName": "ModifiedDate", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 8, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 2, "dateConversion": 0, "dependentOn": "SellEndDate", "fieldName": "IsActive", "isAutoGenerated": false, "isCalculated": true, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": -1, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "ThumbnailPhotoFileName", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": false, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 256, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 0, "dateConversion": 0, "dependentOn": "", "fieldName": "SalesOrderDetails", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": true, "isNavigation": true, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": -1, "range": "", "regex": "" }], "pageSize": 25 },
                    childAssoc: [],
                    parentAssoc: [{ "childDbSetName": "SalesOrderDetail", "childToParentName": "Product", "fieldRels": [{ "childField": "ProductID", "parentField": "ProductID" }], "name": "OrdDetailsToProduct", "onDeleteAction": 0, "parentDbSetName": "Product", "parentToChildrenName": "SalesOrderDetails" }]
                }, utils = RIAPP.global.utils;
                _super.call(this, opts);
                self._entityType = Product;

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    f.dependents = [];
                    self._fieldMap[f.fieldName] = f;
                });

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    if (!!f.isNavigation) {
                        self._navfldMap[f.fieldName] = self._doNavigationField(opts, f);
                    } else if (!!f.isCalculated) {
                        self._calcfldMap[f.fieldName] = self._doCalculatedField(opts, f);
                    }
                });

                self._mapAssocFields();
            }
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
                this.defineCalculatedField('IsActive', getFunc);
            };

            Object.defineProperty(ProductDb.prototype, "items2", {
                get: function () {
                    return this.items;
                },
                enumerable: true,
                configurable: true
            });
            return ProductDb;
        })(RIAPP.MOD.db.DbSet);
        DEMODB.ProductDb = ProductDb;

        var ProductModel = (function (_super) {
            __extends(ProductModel, _super);
            function ProductModel() {
                _super.apply(this, arguments);
            }
            Object.defineProperty(ProductModel.prototype, "ProductModelID", {
                get: function () {
                    return this._getFieldVal('ProductModelID');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductModel.prototype, "Name", {
                get: function () {
                    return this._getFieldVal('Name');
                },
                set: function (v) {
                    this._setFieldVal('Name', v);
                },
                enumerable: true,
                configurable: true
            });

            ProductModel.prototype.getDbContext = function () {
                return _super.prototype.getDbContext.call(this);
            };
            ProductModel.prototype.getDbSet = function () {
                return _super.prototype.getDbSet.call(this);
            };
            Object.defineProperty(ProductModel.prototype, "_dbSet", {
                get: function () {
                    return this.getDbSet();
                },
                enumerable: true,
                configurable: true
            });
            ProductModel.prototype.toString = function () {
                return 'ProductModelEntity';
            };
            ProductModel.prototype.asEntity = function () {
                return this;
            };
            ProductModel.prototype.asInterface = function () {
                return this;
            };
            return ProductModel;
        })(RIAPP.MOD.db.Entity);
        DEMODB.ProductModel = ProductModel;

        var ProductModelDb = (function (_super) {
            __extends(ProductModelDb, _super);
            function ProductModelDb(dbContext) {
                var self = this, opts = {
                    dbContext: dbContext,
                    dbSetInfo: { "dbSetName": "ProductModel", "enablePaging": false, "fieldInfos": [{ "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "ProductModelID", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 1, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 4, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "Name", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 50, "range": "", "regex": "" }], "pageSize": 25 },
                    childAssoc: [],
                    parentAssoc: []
                }, utils = RIAPP.global.utils;
                _super.call(this, opts);
                self._entityType = ProductModel;

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    f.dependents = [];
                    self._fieldMap[f.fieldName] = f;
                });

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    if (!!f.isNavigation) {
                        self._navfldMap[f.fieldName] = self._doNavigationField(opts, f);
                    } else if (!!f.isCalculated) {
                        self._calcfldMap[f.fieldName] = self._doCalculatedField(opts, f);
                    }
                });

                self._mapAssocFields();
            }
            ProductModelDb.prototype.createReadProductModelQuery = function () {
                return this.createQuery('ReadProductModel');
            };

            Object.defineProperty(ProductModelDb.prototype, "items2", {
                get: function () {
                    return this.items;
                },
                enumerable: true,
                configurable: true
            });
            return ProductModelDb;
        })(RIAPP.MOD.db.DbSet);
        DEMODB.ProductModelDb = ProductModelDb;

        var SalesOrderHeader = (function (_super) {
            __extends(SalesOrderHeader, _super);
            function SalesOrderHeader() {
                _super.apply(this, arguments);
            }
            Object.defineProperty(SalesOrderHeader.prototype, "SalesOrderID", {
                get: function () {
                    return this._getFieldVal('SalesOrderID');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "RevisionNumber", {
                get: function () {
                    return this._getFieldVal('RevisionNumber');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "OrderDate", {
                get: function () {
                    return this._getFieldVal('OrderDate');
                },
                set: function (v) {
                    this._setFieldVal('OrderDate', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "DueDate", {
                get: function () {
                    return this._getFieldVal('DueDate');
                },
                set: function (v) {
                    this._setFieldVal('DueDate', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "ShipDate", {
                get: function () {
                    return this._getFieldVal('ShipDate');
                },
                set: function (v) {
                    this._setFieldVal('ShipDate', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "Status", {
                get: function () {
                    return this._getFieldVal('Status');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "OnlineOrderFlag", {
                get: function () {
                    return this._getFieldVal('OnlineOrderFlag');
                },
                set: function (v) {
                    this._setFieldVal('OnlineOrderFlag', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "SalesOrderNumber", {
                get: function () {
                    return this._getFieldVal('SalesOrderNumber');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "PurchaseOrderNumber", {
                get: function () {
                    return this._getFieldVal('PurchaseOrderNumber');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "AccountNumber", {
                get: function () {
                    return this._getFieldVal('AccountNumber');
                },
                set: function (v) {
                    this._setFieldVal('AccountNumber', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "CustomerID", {
                get: function () {
                    return this._getFieldVal('CustomerID');
                },
                set: function (v) {
                    this._setFieldVal('CustomerID', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "ShipToAddressID", {
                get: function () {
                    return this._getFieldVal('ShipToAddressID');
                },
                set: function (v) {
                    this._setFieldVal('ShipToAddressID', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "BillToAddressID", {
                get: function () {
                    return this._getFieldVal('BillToAddressID');
                },
                set: function (v) {
                    this._setFieldVal('BillToAddressID', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "ShipMethod", {
                get: function () {
                    return this._getFieldVal('ShipMethod');
                },
                set: function (v) {
                    this._setFieldVal('ShipMethod', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "CreditCardApprovalCode", {
                get: function () {
                    return this._getFieldVal('CreditCardApprovalCode');
                },
                set: function (v) {
                    this._setFieldVal('CreditCardApprovalCode', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "SubTotal", {
                get: function () {
                    return this._getFieldVal('SubTotal');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "TaxAmt", {
                get: function () {
                    return this._getFieldVal('TaxAmt');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "Freight", {
                get: function () {
                    return this._getFieldVal('Freight');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "TotalDue", {
                get: function () {
                    return this._getFieldVal('TotalDue');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "Comment", {
                get: function () {
                    return this._getFieldVal('Comment');
                },
                set: function (v) {
                    this._setFieldVal('Comment', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "rowguid", {
                get: function () {
                    return this._getFieldVal('rowguid');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "ModifiedDate", {
                get: function () {
                    return this._getFieldVal('ModifiedDate');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "SalesOrderDetails", {
                get: function () {
                    return this._dbSet._navfldMap['SalesOrderDetails'].getFunc.call(this);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "Customer", {
                get: function () {
                    return this._dbSet._navfldMap['Customer'].getFunc.call(this);
                },
                set: function (v) {
                    this._dbSet._navfldMap['Customer'].setFunc.call(this, v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "Address", {
                get: function () {
                    return this._dbSet._navfldMap['Address'].getFunc.call(this);
                },
                set: function (v) {
                    this._dbSet._navfldMap['Address'].setFunc.call(this, v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "Address1", {
                get: function () {
                    return this._dbSet._navfldMap['Address1'].getFunc.call(this);
                },
                set: function (v) {
                    this._dbSet._navfldMap['Address1'].setFunc.call(this, v);
                },
                enumerable: true,
                configurable: true
            });

            SalesOrderHeader.prototype.getDbContext = function () {
                return _super.prototype.getDbContext.call(this);
            };
            SalesOrderHeader.prototype.getDbSet = function () {
                return _super.prototype.getDbSet.call(this);
            };
            Object.defineProperty(SalesOrderHeader.prototype, "_dbSet", {
                get: function () {
                    return this.getDbSet();
                },
                enumerable: true,
                configurable: true
            });
            SalesOrderHeader.prototype.toString = function () {
                return 'SalesOrderHeaderEntity';
            };
            SalesOrderHeader.prototype.asEntity = function () {
                return this;
            };
            SalesOrderHeader.prototype.asInterface = function () {
                return this;
            };
            return SalesOrderHeader;
        })(RIAPP.MOD.db.Entity);
        DEMODB.SalesOrderHeader = SalesOrderHeader;

        var SalesOrderHeaderDb = (function (_super) {
            __extends(SalesOrderHeaderDb, _super);
            function SalesOrderHeaderDb(dbContext) {
                var self = this, opts = {
                    dbContext: dbContext,
                    dbSetInfo: { "dbSetName": "SalesOrderHeader", "enablePaging": false, "fieldInfos": [{ "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "SalesOrderID", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 1, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 4, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "RevisionNumber", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 1, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 7, "dateConversion": 0, "dependentOn": "", "fieldName": "OrderDate", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 8, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 7, "dateConversion": 0, "dependentOn": "", "fieldName": "DueDate", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 8, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 7, "dateConversion": 0, "dependentOn": "", "fieldName": "ShipDate", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 8, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "Status", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 1, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 2, "dateConversion": 0, "dependentOn": "", "fieldName": "OnlineOrderFlag", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 1, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "SalesOrderNumber", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 25, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "PurchaseOrderNumber", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 25, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "AccountNumber", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 15, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "CustomerID", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 4, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "ShipToAddressID", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 4, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "BillToAddressID", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 4, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "ShipMethod", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 50, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "CreditCardApprovalCode", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 15, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 4, "dateConversion": 0, "dependentOn": "", "fieldName": "SubTotal", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 8, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 4, "dateConversion": 0, "dependentOn": "", "fieldName": "TaxAmt", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 8, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 4, "dateConversion": 0, "dependentOn": "", "fieldName": "Freight", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 8, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 4, "dateConversion": 0, "dependentOn": "", "fieldName": "TotalDue", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 8, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "Comment", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 0, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 9, "dateConversion": 0, "dependentOn": "", "fieldName": "rowguid", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 16, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 6, "dateConversion": 0, "dependentOn": "", "fieldName": "ModifiedDate", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 8, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 0, "dateConversion": 0, "dependentOn": "", "fieldName": "SalesOrderDetails", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": true, "isNavigation": true, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": -1, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 0, "dateConversion": 0, "dependentOn": "CustomerID", "fieldName": "Customer", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": true, "isNavigation": true, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": -1, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 0, "dateConversion": 0, "dependentOn": "ShipToAddressID", "fieldName": "Address", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": true, "isNavigation": true, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": -1, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 0, "dateConversion": 0, "dependentOn": "BillToAddressID", "fieldName": "Address1", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": true, "isNavigation": true, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": -1, "range": "", "regex": "" }], "pageSize": 25 },
                    childAssoc: [{ "childDbSetName": "SalesOrderHeader", "childToParentName": "Customer", "fieldRels": [{ "childField": "CustomerID", "parentField": "CustomerID" }], "name": "OrdersToCustomer", "onDeleteAction": 0, "parentDbSetName": "Customer", "parentToChildrenName": null }, { "childDbSetName": "SalesOrderHeader", "childToParentName": "Address", "fieldRels": [{ "childField": "ShipToAddressID", "parentField": "AddressID" }], "name": "OrdersToShipAddr", "onDeleteAction": 0, "parentDbSetName": "Address", "parentToChildrenName": null }, { "childDbSetName": "SalesOrderHeader", "childToParentName": "Address1", "fieldRels": [{ "childField": "BillToAddressID", "parentField": "AddressID" }], "name": "OrdersToBillAddr", "onDeleteAction": 0, "parentDbSetName": "Address", "parentToChildrenName": null }],
                    parentAssoc: [{ "childDbSetName": "SalesOrderDetail", "childToParentName": "SalesOrderHeader", "fieldRels": [{ "childField": "SalesOrderID", "parentField": "SalesOrderID" }], "name": "OrdDetailsToOrder", "onDeleteAction": 1, "parentDbSetName": "SalesOrderHeader", "parentToChildrenName": "SalesOrderDetails" }]
                }, utils = RIAPP.global.utils;
                _super.call(this, opts);
                self._entityType = SalesOrderHeader;

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    f.dependents = [];
                    self._fieldMap[f.fieldName] = f;
                });

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    if (!!f.isNavigation) {
                        self._navfldMap[f.fieldName] = self._doNavigationField(opts, f);
                    } else if (!!f.isCalculated) {
                        self._calcfldMap[f.fieldName] = self._doCalculatedField(opts, f);
                    }
                });

                self._mapAssocFields();
            }
            SalesOrderHeaderDb.prototype.createReadSalesOrderHeaderQuery = function () {
                return this.createQuery('ReadSalesOrderHeader');
            };

            Object.defineProperty(SalesOrderHeaderDb.prototype, "items2", {
                get: function () {
                    return this.items;
                },
                enumerable: true,
                configurable: true
            });
            return SalesOrderHeaderDb;
        })(RIAPP.MOD.db.DbSet);
        DEMODB.SalesOrderHeaderDb = SalesOrderHeaderDb;

        var SalesOrderDetail = (function (_super) {
            __extends(SalesOrderDetail, _super);
            function SalesOrderDetail() {
                _super.apply(this, arguments);
            }
            Object.defineProperty(SalesOrderDetail.prototype, "SalesOrderID", {
                get: function () {
                    return this._getFieldVal('SalesOrderID');
                },
                set: function (v) {
                    this._setFieldVal('SalesOrderID', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderDetail.prototype, "SalesOrderDetailID", {
                get: function () {
                    return this._getFieldVal('SalesOrderDetailID');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderDetail.prototype, "OrderQty", {
                get: function () {
                    return this._getFieldVal('OrderQty');
                },
                set: function (v) {
                    this._setFieldVal('OrderQty', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderDetail.prototype, "ProductID", {
                get: function () {
                    return this._getFieldVal('ProductID');
                },
                set: function (v) {
                    this._setFieldVal('ProductID', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderDetail.prototype, "UnitPrice", {
                get: function () {
                    return this._getFieldVal('UnitPrice');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderDetail.prototype, "UnitPriceDiscount", {
                get: function () {
                    return this._getFieldVal('UnitPriceDiscount');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderDetail.prototype, "LineTotal", {
                get: function () {
                    return this._getFieldVal('LineTotal');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderDetail.prototype, "rowguid", {
                get: function () {
                    return this._getFieldVal('rowguid');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderDetail.prototype, "ModifiedDate", {
                get: function () {
                    return this._getFieldVal('ModifiedDate');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderDetail.prototype, "SalesOrderHeader", {
                get: function () {
                    return this._dbSet._navfldMap['SalesOrderHeader'].getFunc.call(this);
                },
                set: function (v) {
                    this._dbSet._navfldMap['SalesOrderHeader'].setFunc.call(this, v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderDetail.prototype, "Product", {
                get: function () {
                    return this._dbSet._navfldMap['Product'].getFunc.call(this);
                },
                set: function (v) {
                    this._dbSet._navfldMap['Product'].setFunc.call(this, v);
                },
                enumerable: true,
                configurable: true
            });

            SalesOrderDetail.prototype.getDbContext = function () {
                return _super.prototype.getDbContext.call(this);
            };
            SalesOrderDetail.prototype.getDbSet = function () {
                return _super.prototype.getDbSet.call(this);
            };
            Object.defineProperty(SalesOrderDetail.prototype, "_dbSet", {
                get: function () {
                    return this.getDbSet();
                },
                enumerable: true,
                configurable: true
            });
            SalesOrderDetail.prototype.toString = function () {
                return 'SalesOrderDetailEntity';
            };
            SalesOrderDetail.prototype.asEntity = function () {
                return this;
            };
            SalesOrderDetail.prototype.asInterface = function () {
                return this;
            };
            return SalesOrderDetail;
        })(RIAPP.MOD.db.Entity);
        DEMODB.SalesOrderDetail = SalesOrderDetail;

        var SalesOrderDetailDb = (function (_super) {
            __extends(SalesOrderDetailDb, _super);
            function SalesOrderDetailDb(dbContext) {
                var self = this, opts = {
                    dbContext: dbContext,
                    dbSetInfo: { "dbSetName": "SalesOrderDetail", "enablePaging": false, "fieldInfos": [{ "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "SalesOrderID", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 1, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 4, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "SalesOrderDetailID", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 2, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 4, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "OrderQty", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 2, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "ProductID", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 4, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 4, "dateConversion": 0, "dependentOn": "", "fieldName": "UnitPrice", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 8, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 4, "dateConversion": 0, "dependentOn": "", "fieldName": "UnitPriceDiscount", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 8, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 4, "dateConversion": 0, "dependentOn": "", "fieldName": "LineTotal", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 17, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 9, "dateConversion": 0, "dependentOn": "", "fieldName": "rowguid", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 16, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 6, "dateConversion": 0, "dependentOn": "", "fieldName": "ModifiedDate", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 8, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 0, "dateConversion": 0, "dependentOn": "SalesOrderID", "fieldName": "SalesOrderHeader", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": true, "isNavigation": true, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": -1, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 0, "dateConversion": 0, "dependentOn": "ProductID", "fieldName": "Product", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": true, "isNavigation": true, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": -1, "range": "", "regex": "" }], "pageSize": 25 },
                    childAssoc: [{ "childDbSetName": "SalesOrderDetail", "childToParentName": "SalesOrderHeader", "fieldRels": [{ "childField": "SalesOrderID", "parentField": "SalesOrderID" }], "name": "OrdDetailsToOrder", "onDeleteAction": 1, "parentDbSetName": "SalesOrderHeader", "parentToChildrenName": "SalesOrderDetails" }, { "childDbSetName": "SalesOrderDetail", "childToParentName": "Product", "fieldRels": [{ "childField": "ProductID", "parentField": "ProductID" }], "name": "OrdDetailsToProduct", "onDeleteAction": 0, "parentDbSetName": "Product", "parentToChildrenName": "SalesOrderDetails" }],
                    parentAssoc: []
                }, utils = RIAPP.global.utils;
                _super.call(this, opts);
                self._entityType = SalesOrderDetail;

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    f.dependents = [];
                    self._fieldMap[f.fieldName] = f;
                });

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    if (!!f.isNavigation) {
                        self._navfldMap[f.fieldName] = self._doNavigationField(opts, f);
                    } else if (!!f.isCalculated) {
                        self._calcfldMap[f.fieldName] = self._doCalculatedField(opts, f);
                    }
                });

                self._mapAssocFields();
            }
            SalesOrderDetailDb.prototype.createReadSalesOrderDetailQuery = function () {
                return this.createQuery('ReadSalesOrderDetail');
            };

            Object.defineProperty(SalesOrderDetailDb.prototype, "items2", {
                get: function () {
                    return this.items;
                },
                enumerable: true,
                configurable: true
            });
            return SalesOrderDetailDb;
        })(RIAPP.MOD.db.DbSet);
        DEMODB.SalesOrderDetailDb = SalesOrderDetailDb;

        var ProductCategory = (function (_super) {
            __extends(ProductCategory, _super);
            function ProductCategory() {
                _super.apply(this, arguments);
            }
            Object.defineProperty(ProductCategory.prototype, "ProductCategoryID", {
                get: function () {
                    return this._getFieldVal('ProductCategoryID');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductCategory.prototype, "ParentProductCategoryID", {
                get: function () {
                    return this._getFieldVal('ParentProductCategoryID');
                },
                set: function (v) {
                    this._setFieldVal('ParentProductCategoryID', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductCategory.prototype, "Name", {
                get: function () {
                    return this._getFieldVal('Name');
                },
                set: function (v) {
                    this._setFieldVal('Name', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductCategory.prototype, "rowguid", {
                get: function () {
                    return this._getFieldVal('rowguid');
                },
                set: function (v) {
                    this._setFieldVal('rowguid', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductCategory.prototype, "ModifiedDate", {
                get: function () {
                    return this._getFieldVal('ModifiedDate');
                },
                set: function (v) {
                    this._setFieldVal('ModifiedDate', v);
                },
                enumerable: true,
                configurable: true
            });

            ProductCategory.prototype.getDbContext = function () {
                return _super.prototype.getDbContext.call(this);
            };
            ProductCategory.prototype.getDbSet = function () {
                return _super.prototype.getDbSet.call(this);
            };
            Object.defineProperty(ProductCategory.prototype, "_dbSet", {
                get: function () {
                    return this.getDbSet();
                },
                enumerable: true,
                configurable: true
            });
            ProductCategory.prototype.toString = function () {
                return 'ProductCategoryEntity';
            };
            ProductCategory.prototype.asEntity = function () {
                return this;
            };
            ProductCategory.prototype.asInterface = function () {
                return this;
            };
            return ProductCategory;
        })(RIAPP.MOD.db.Entity);
        DEMODB.ProductCategory = ProductCategory;

        var ProductCategoryDb = (function (_super) {
            __extends(ProductCategoryDb, _super);
            function ProductCategoryDb(dbContext) {
                var self = this, opts = {
                    dbContext: dbContext,
                    dbSetInfo: { "dbSetName": "ProductCategory", "enablePaging": false, "fieldInfos": [{ "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "ProductCategoryID", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 1, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 4, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "ParentProductCategoryID", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 4, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "Name", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 50, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 9, "dateConversion": 0, "dependentOn": "", "fieldName": "rowguid", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": true, "maxLength": 16, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 6, "dateConversion": 0, "dependentOn": "", "fieldName": "ModifiedDate", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 8, "range": "", "regex": "" }], "pageSize": 25 },
                    childAssoc: [],
                    parentAssoc: []
                }, utils = RIAPP.global.utils;
                _super.call(this, opts);
                self._entityType = ProductCategory;

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    f.dependents = [];
                    self._fieldMap[f.fieldName] = f;
                });

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    if (!!f.isNavigation) {
                        self._navfldMap[f.fieldName] = self._doNavigationField(opts, f);
                    } else if (!!f.isCalculated) {
                        self._calcfldMap[f.fieldName] = self._doCalculatedField(opts, f);
                    }
                });

                self._mapAssocFields();
            }
            ProductCategoryDb.prototype.createReadProductCategoryQuery = function () {
                return this.createQuery('ReadProductCategory');
            };

            Object.defineProperty(ProductCategoryDb.prototype, "items2", {
                get: function () {
                    return this.items;
                },
                enumerable: true,
                configurable: true
            });
            return ProductCategoryDb;
        })(RIAPP.MOD.db.DbSet);
        DEMODB.ProductCategoryDb = ProductCategoryDb;

        var SalesInfo = (function (_super) {
            __extends(SalesInfo, _super);
            function SalesInfo() {
                _super.apply(this, arguments);
            }
            Object.defineProperty(SalesInfo.prototype, "SalesPerson", {
                get: function () {
                    return this._getFieldVal('SalesPerson');
                },
                set: function (v) {
                    this._setFieldVal('SalesPerson', v);
                },
                enumerable: true,
                configurable: true
            });

            SalesInfo.prototype.getDbContext = function () {
                return _super.prototype.getDbContext.call(this);
            };
            SalesInfo.prototype.getDbSet = function () {
                return _super.prototype.getDbSet.call(this);
            };
            Object.defineProperty(SalesInfo.prototype, "_dbSet", {
                get: function () {
                    return this.getDbSet();
                },
                enumerable: true,
                configurable: true
            });
            SalesInfo.prototype.toString = function () {
                return 'SalesInfoEntity';
            };
            SalesInfo.prototype.asEntity = function () {
                return this;
            };
            SalesInfo.prototype.asInterface = function () {
                return this;
            };
            return SalesInfo;
        })(RIAPP.MOD.db.Entity);
        DEMODB.SalesInfo = SalesInfo;

        var SalesInfoDb = (function (_super) {
            __extends(SalesInfoDb, _super);
            function SalesInfoDb(dbContext) {
                var self = this, opts = {
                    dbContext: dbContext,
                    dbSetInfo: { "dbSetName": "SalesInfo", "enablePaging": true, "fieldInfos": [{ "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "SalesPerson", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 1, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": -1, "range": "", "regex": "" }], "pageSize": 25 },
                    childAssoc: [],
                    parentAssoc: []
                }, utils = RIAPP.global.utils;
                _super.call(this, opts);
                self._entityType = SalesInfo;

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    f.dependents = [];
                    self._fieldMap[f.fieldName] = f;
                });

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    if (!!f.isNavigation) {
                        self._navfldMap[f.fieldName] = self._doNavigationField(opts, f);
                    } else if (!!f.isCalculated) {
                        self._calcfldMap[f.fieldName] = self._doCalculatedField(opts, f);
                    }
                });

                self._mapAssocFields();
            }
            SalesInfoDb.prototype.createReadSalesInfoQuery = function () {
                return this.createQuery('ReadSalesInfo');
            };

            Object.defineProperty(SalesInfoDb.prototype, "items2", {
                get: function () {
                    return this.items;
                },
                enumerable: true,
                configurable: true
            });
            return SalesInfoDb;
        })(RIAPP.MOD.db.DbSet);
        DEMODB.SalesInfoDb = SalesInfoDb;

        var LookUpProduct = (function (_super) {
            __extends(LookUpProduct, _super);
            function LookUpProduct() {
                _super.apply(this, arguments);
            }
            Object.defineProperty(LookUpProduct.prototype, "ProductID", {
                get: function () {
                    return this._getFieldVal('ProductID');
                },
                set: function (v) {
                    this._setFieldVal('ProductID', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LookUpProduct.prototype, "Name", {
                get: function () {
                    return this._getFieldVal('Name');
                },
                set: function (v) {
                    this._setFieldVal('Name', v);
                },
                enumerable: true,
                configurable: true
            });

            LookUpProduct.prototype.getDbContext = function () {
                return _super.prototype.getDbContext.call(this);
            };
            LookUpProduct.prototype.getDbSet = function () {
                return _super.prototype.getDbSet.call(this);
            };
            Object.defineProperty(LookUpProduct.prototype, "_dbSet", {
                get: function () {
                    return this.getDbSet();
                },
                enumerable: true,
                configurable: true
            });
            LookUpProduct.prototype.toString = function () {
                return 'LookUpProductEntity';
            };
            LookUpProduct.prototype.asEntity = function () {
                return this;
            };
            LookUpProduct.prototype.asInterface = function () {
                return this;
            };
            return LookUpProduct;
        })(RIAPP.MOD.db.Entity);
        DEMODB.LookUpProduct = LookUpProduct;

        var LookUpProductDb = (function (_super) {
            __extends(LookUpProductDb, _super);
            function LookUpProductDb(dbContext) {
                var self = this, opts = {
                    dbContext: dbContext,
                    dbSetInfo: { "dbSetName": "LookUpProduct", "enablePaging": true, "fieldInfos": [{ "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "ProductID", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 1, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": -1, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "Name", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": -1, "range": "", "regex": "" }], "pageSize": 25 },
                    childAssoc: [],
                    parentAssoc: []
                }, utils = RIAPP.global.utils;
                _super.call(this, opts);
                self._entityType = LookUpProduct;

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    f.dependents = [];
                    self._fieldMap[f.fieldName] = f;
                });

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    if (!!f.isNavigation) {
                        self._navfldMap[f.fieldName] = self._doNavigationField(opts, f);
                    } else if (!!f.isCalculated) {
                        self._calcfldMap[f.fieldName] = self._doCalculatedField(opts, f);
                    }
                });

                self._mapAssocFields();
            }
            LookUpProductDb.prototype.createReadProductLookUpQuery = function () {
                return this.createQuery('ReadProductLookUp');
            };

            Object.defineProperty(LookUpProductDb.prototype, "items2", {
                get: function () {
                    return this.items;
                },
                enumerable: true,
                configurable: true
            });
            return LookUpProductDb;
        })(RIAPP.MOD.db.DbSet);
        DEMODB.LookUpProductDb = LookUpProductDb;

        var AddressInfo = (function (_super) {
            __extends(AddressInfo, _super);
            function AddressInfo() {
                _super.apply(this, arguments);
            }
            Object.defineProperty(AddressInfo.prototype, "AddressID", {
                get: function () {
                    return this._getFieldVal('AddressID');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AddressInfo.prototype, "AddressLine1", {
                get: function () {
                    return this._getFieldVal('AddressLine1');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AddressInfo.prototype, "City", {
                get: function () {
                    return this._getFieldVal('City');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AddressInfo.prototype, "StateProvince", {
                get: function () {
                    return this._getFieldVal('StateProvince');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AddressInfo.prototype, "CountryRegion", {
                get: function () {
                    return this._getFieldVal('CountryRegion');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AddressInfo.prototype, "CustomerAddresses", {
                get: function () {
                    return this._dbSet._navfldMap['CustomerAddresses'].getFunc.call(this);
                },
                enumerable: true,
                configurable: true
            });

            AddressInfo.prototype.getDbContext = function () {
                return _super.prototype.getDbContext.call(this);
            };
            AddressInfo.prototype.getDbSet = function () {
                return _super.prototype.getDbSet.call(this);
            };
            Object.defineProperty(AddressInfo.prototype, "_dbSet", {
                get: function () {
                    return this.getDbSet();
                },
                enumerable: true,
                configurable: true
            });
            AddressInfo.prototype.toString = function () {
                return 'AddressInfoEntity';
            };
            AddressInfo.prototype.asEntity = function () {
                return this;
            };
            AddressInfo.prototype.asInterface = function () {
                return this;
            };
            return AddressInfo;
        })(RIAPP.MOD.db.Entity);
        DEMODB.AddressInfo = AddressInfo;

        var AddressInfoDb = (function (_super) {
            __extends(AddressInfoDb, _super);
            function AddressInfoDb(dbContext) {
                var self = this, opts = {
                    dbContext: dbContext,
                    dbSetInfo: { "dbSetName": "AddressInfo", "enablePaging": false, "fieldInfos": [{ "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "AddressID", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 1, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 4, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "AddressLine1", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 200, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "City", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 30, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "StateProvince", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 50, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "CountryRegion", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 50, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 0, "dateConversion": 0, "dependentOn": "", "fieldName": "CustomerAddresses", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": true, "isNavigation": true, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": -1, "range": "", "regex": "" }], "pageSize": 25 },
                    childAssoc: [],
                    parentAssoc: [{ "childDbSetName": "CustomerAddress", "childToParentName": "AddressInfo", "fieldRels": [{ "childField": "AddressID", "parentField": "AddressID" }], "name": "CustAddrToAddress2", "onDeleteAction": 0, "parentDbSetName": "AddressInfo", "parentToChildrenName": "CustomerAddresses" }]
                }, utils = RIAPP.global.utils;
                _super.call(this, opts);
                self._entityType = AddressInfo;

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    f.dependents = [];
                    self._fieldMap[f.fieldName] = f;
                });

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    if (!!f.isNavigation) {
                        self._navfldMap[f.fieldName] = self._doNavigationField(opts, f);
                    } else if (!!f.isCalculated) {
                        self._calcfldMap[f.fieldName] = self._doCalculatedField(opts, f);
                    }
                });

                self._mapAssocFields();
            }
            AddressInfoDb.prototype.createReadAddressInfoQuery = function () {
                return this.createQuery('ReadAddressInfo');
            };

            Object.defineProperty(AddressInfoDb.prototype, "items2", {
                get: function () {
                    return this.items;
                },
                enumerable: true,
                configurable: true
            });
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
                var associations = [{ "childDbSetName": "CustomerAddress", "childToParentName": "Customer", "fieldRels": [{ "childField": "CustomerID", "parentField": "CustomerID" }], "name": "CustAddrToCustomer", "onDeleteAction": 0, "parentDbSetName": "Customer", "parentToChildrenName": "CustomerAddresses" }, { "childDbSetName": "CustomerAddress", "childToParentName": "Address", "fieldRels": [{ "childField": "AddressID", "parentField": "AddressID" }], "name": "CustAddrToAddress", "onDeleteAction": 0, "parentDbSetName": "Address", "parentToChildrenName": "CustomerAddresses" }, { "childDbSetName": "CustomerAddress", "childToParentName": "AddressInfo", "fieldRels": [{ "childField": "AddressID", "parentField": "AddressID" }], "name": "CustAddrToAddress2", "onDeleteAction": 0, "parentDbSetName": "AddressInfo", "parentToChildrenName": "CustomerAddresses" }, { "childDbSetName": "SalesOrderDetail", "childToParentName": "SalesOrderHeader", "fieldRels": [{ "childField": "SalesOrderID", "parentField": "SalesOrderID" }], "name": "OrdDetailsToOrder", "onDeleteAction": 1, "parentDbSetName": "SalesOrderHeader", "parentToChildrenName": "SalesOrderDetails" }, { "childDbSetName": "SalesOrderDetail", "childToParentName": "Product", "fieldRels": [{ "childField": "ProductID", "parentField": "ProductID" }], "name": "OrdDetailsToProduct", "onDeleteAction": 0, "parentDbSetName": "Product", "parentToChildrenName": "SalesOrderDetails" }, { "childDbSetName": "SalesOrderHeader", "childToParentName": "Customer", "fieldRels": [{ "childField": "CustomerID", "parentField": "CustomerID" }], "name": "OrdersToCustomer", "onDeleteAction": 0, "parentDbSetName": "Customer", "parentToChildrenName": null }, { "childDbSetName": "SalesOrderHeader", "childToParentName": "Address", "fieldRels": [{ "childField": "ShipToAddressID", "parentField": "AddressID" }], "name": "OrdersToShipAddr", "onDeleteAction": 0, "parentDbSetName": "Address", "parentToChildrenName": null }, { "childDbSetName": "SalesOrderHeader", "childToParentName": "Address1", "fieldRels": [{ "childField": "BillToAddressID", "parentField": "AddressID" }], "name": "OrdersToBillAddr", "onDeleteAction": 0, "parentDbSetName": "Address", "parentToChildrenName": null }];
                this._initAssociations(associations);
                var methods = [{ "isQuery": true, "methodName": "ReadProductLookUp", "methodResult": true, "parameters": [] }, { "isQuery": true, "methodName": "ReadProduct", "methodResult": true, "parameters": [{ "dataType": 3, "dateConversion": 0, "isArray": true, "isNullable": false, "name": "param1", "ordinal": 0 }, { "dataType": 1, "dateConversion": 0, "isArray": false, "isNullable": false, "name": "param2", "ordinal": 1 }] }, { "isQuery": true, "methodName": "ReadProductByIds", "methodResult": true, "parameters": [{ "dataType": 3, "dateConversion": 0, "isArray": true, "isNullable": false, "name": "productIDs", "ordinal": 0 }] }, { "isQuery": true, "methodName": "ReadCustomer", "methodResult": true, "parameters": [{ "dataType": 2, "dateConversion": 0, "isArray": false, "isNullable": true, "name": "includeNav", "ordinal": 0 }] }, { "isQuery": true, "methodName": "ReadAddress", "methodResult": true, "parameters": [] }, { "isQuery": true, "methodName": "ReadAddressByIds", "methodResult": true, "parameters": [{ "dataType": 3, "dateConversion": 0, "isArray": true, "isNullable": false, "name": "addressIDs", "ordinal": 0 }] }, { "isQuery": true, "methodName": "ReadCustomerAddress", "methodResult": true, "parameters": [] }, { "isQuery": true, "methodName": "ReadAddressForCustomers", "methodResult": true, "parameters": [{ "dataType": 3, "dateConversion": 0, "isArray": true, "isNullable": false, "name": "custIDs", "ordinal": 0 }] }, { "isQuery": true, "methodName": "ReadSalesOrderHeader", "methodResult": true, "parameters": [] }, { "isQuery": true, "methodName": "ReadSalesOrderDetail", "methodResult": true, "parameters": [] }, { "isQuery": true, "methodName": "ReadProductCategory", "methodResult": true, "parameters": [] }, { "isQuery": true, "methodName": "ReadProductModel", "methodResult": true, "parameters": [] }, { "isQuery": true, "methodName": "ReadSalesInfo", "methodResult": true, "parameters": [] }, { "isQuery": true, "methodName": "ReadAddressInfo", "methodResult": true, "parameters": [] }, { "isQuery": false, "methodName": "TestInvoke", "methodResult": true, "parameters": [{ "dataType": 10, "dateConversion": 0, "isArray": false, "isNullable": false, "name": "param1", "ordinal": 0 }, { "dataType": 1, "dateConversion": 0, "isArray": false, "isNullable": false, "name": "param2", "ordinal": 1 }] }, { "isQuery": false, "methodName": "TestComplexInvoke", "methodResult": false, "parameters": [{ "dataType": 0, "dateConversion": 0, "isArray": false, "isNullable": false, "name": "info", "ordinal": 0 }, { "dataType": 0, "dateConversion": 0, "isArray": true, "isNullable": false, "name": "keys", "ordinal": 1 }] }];
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
    })(RIAPP.DEMODB || (RIAPP.DEMODB = {}));
    var DEMODB = RIAPP.DEMODB;
})(RIAPP || (RIAPP = {}));
//# sourceMappingURL=demoDB.js.map

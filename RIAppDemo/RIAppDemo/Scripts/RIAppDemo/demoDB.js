/// <reference path="..\jriapp.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
                    dbSetInfo: { "fieldInfos": [{ "isPrimaryKey": 1, "isRowTimeStamp": false, "maxLength": 4, "range": "", "regex": "", "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "dateConversion": 0, "allowClientDefault": false, "fieldName": "CustomerID", "isNeedOriginal": true, "isClientOnly": false, "isCalculated": false, "isNavigation": false, "dependentOn": "" }, { "fieldName": "NameStyle", "dataType": 2, "maxLength": 1, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "Title", "dataType": 1, "maxLength": 8, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "FirstName", "dataType": 1, "maxLength": 50, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "MiddleName", "dataType": 1, "maxLength": 50, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "LastName", "dataType": 1, "maxLength": 50, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "Suffix", "dataType": 1, "maxLength": 10, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "CompanyName", "dataType": 1, "maxLength": 128, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "SalesPerson", "dataType": 1, "maxLength": 256, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "EmailAddress", "dataType": 1, "maxLength": 50, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "^[_a-z0-9-]+(\\.[_a-z0-9-]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,4})$", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "Phone", "dataType": 1, "maxLength": 25, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "PasswordHash", "dataType": 1, "maxLength": 128, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "PasswordSalt", "dataType": 1, "maxLength": 10, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "rowguid", "dataType": 9, "maxLength": 16, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isRowTimeStamp": true, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "ModifiedDate", "dataType": 6, "maxLength": 8, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "Name", "dataType": 1, "maxLength": -1, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": true, "dependentOn": "FirstName,MiddleName,LastName", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "CustomerAddresses", "dataType": 0, "maxLength": -1, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": true, "isNavigation": true }], "enablePaging": true, "pageSize": 25, "dbSetName": "Customer" },
                    childAssoc: [],
                    parentAssoc: [{ "name": "CustAddrToCustomer", "parentDbSetName": "Customer", "childDbSetName": "CustomerAddress", "childToParentName": "Customer", "parentToChildrenName": "CustomerAddresses", "onDeleteAction": 0, "fieldRels": [{ "parentField": "CustomerID", "childField": "CustomerID" }] }, { "name": "OrdersToCustomer", "parentDbSetName": "Customer", "childDbSetName": "SalesOrderHeader", "childToParentName": "Customer", "parentToChildrenName": null, "fieldRels": [{ "parentField": "CustomerID", "childField": "CustomerID" }], "onDeleteAction": 0 }]
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
            CustomerDb.prototype.findEntity = function (CustomerID) {
                return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
            };
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
                    dbSetInfo: { "dbSetName": "CustomerAddress", "enablePaging": false, "pageSize": 25, "fieldInfos": [{ "fieldName": "CustomerID", "dataType": 3, "maxLength": 4, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 1, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "AddressID", "dataType": 3, "maxLength": 4, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 2, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "AddressType", "dataType": 1, "maxLength": 50, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": false, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "rowguid", "dataType": 9, "maxLength": 16, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isRowTimeStamp": true, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "ModifiedDate", "dataType": 6, "maxLength": 8, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isRowTimeStamp": false, "isNeedOriginal": false, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "Customer", "dataType": 0, "maxLength": -1, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "CustomerID", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": true, "isNavigation": true }, { "fieldName": "Address", "dataType": 0, "maxLength": -1, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "AddressID", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": true, "isNavigation": true }, { "fieldName": "AddressInfo", "dataType": 0, "maxLength": -1, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "AddressID", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": true, "isNavigation": true }] },
                    childAssoc: [{ "name": "CustAddrToCustomer", "parentDbSetName": "Customer", "childDbSetName": "CustomerAddress", "childToParentName": "Customer", "parentToChildrenName": "CustomerAddresses", "fieldRels": [{ "parentField": "CustomerID", "childField": "CustomerID" }], "onDeleteAction": 0 }, { "name": "CustAddrToAddress", "parentDbSetName": "Address", "childDbSetName": "CustomerAddress", "childToParentName": "Address", "parentToChildrenName": "CustomerAddresses", "fieldRels": [{ "parentField": "AddressID", "childField": "AddressID" }], "onDeleteAction": 0 }, { "name": "CustAddrToAddress2", "parentDbSetName": "AddressInfo", "childDbSetName": "CustomerAddress", "childToParentName": "AddressInfo", "parentToChildrenName": "CustomerAddresses", "fieldRels": [{ "parentField": "AddressID", "childField": "AddressID" }], "onDeleteAction": 0 }],
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
            CustomerAddressDb.prototype.findEntity = function (CustomerID, AddressID) {
                return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
            };
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
                    dbSetInfo: { "dbSetName": "Address", "enablePaging": false, "pageSize": 25, "fieldInfos": [{ "fieldName": "AddressID", "dataType": 3, "maxLength": 4, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 1, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "AddressLine1", "dataType": 1, "maxLength": 60, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "AddressLine2", "dataType": 1, "maxLength": 60, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "City", "dataType": 1, "maxLength": 30, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "StateProvince", "dataType": 1, "maxLength": 50, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "CountryRegion", "dataType": 1, "maxLength": 50, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "PostalCode", "dataType": 1, "maxLength": 15, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "rowguid", "dataType": 9, "maxLength": -1, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isRowTimeStamp": true, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "ModifiedDate", "dataType": 6, "maxLength": -1, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "CustomerAddresses", "dataType": 0, "maxLength": -1, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": true, "isNavigation": true }] },
                    childAssoc: [],
                    parentAssoc: [{ "name": "CustAddrToAddress", "parentDbSetName": "Address", "childDbSetName": "CustomerAddress", "childToParentName": "Address", "parentToChildrenName": "CustomerAddresses", "fieldRels": [{ "parentField": "AddressID", "childField": "AddressID" }], "onDeleteAction": 0 }, { "name": "OrdersToShipAddr", "parentDbSetName": "Address", "childDbSetName": "SalesOrderHeader", "childToParentName": "Address", "parentToChildrenName": null, "fieldRels": [{ "parentField": "AddressID", "childField": "ShipToAddressID" }], "onDeleteAction": 0 }, { "name": "OrdersToBillAddr", "parentDbSetName": "Address", "childDbSetName": "SalesOrderHeader", "childToParentName": "Address1", "parentToChildrenName": null, "fieldRels": [{ "parentField": "AddressID", "childField": "BillToAddressID" }], "onDeleteAction": 0 }]
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
            AddressDb.prototype.findEntity = function (AddressID) {
                return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
            };
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
                    dbSetInfo: { "dbSetName": "Product", "enablePaging": true, "pageSize": 25, "fieldInfos": [{ "fieldName": "ProductID", "dataType": 3, "maxLength": 4, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 1, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "Name", "dataType": 1, "maxLength": 50, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": false, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "ProductNumber", "dataType": 1, "maxLength": 25, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": false, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "Color", "dataType": 1, "maxLength": 15, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": false, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "StandardCost", "dataType": 4, "maxLength": 8, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": false, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "ListPrice", "dataType": 4, "maxLength": 8, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": false, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "100,5000", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "Size", "dataType": 1, "maxLength": 5, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": false, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "Weight", "dataType": 4, "maxLength": 5, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": false, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "ProductCategoryID", "dataType": 3, "maxLength": 4, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": false, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "ProductModelID", "dataType": 3, "maxLength": 4, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": false, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "SellStartDate", "dataType": 7, "maxLength": 8, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "2000-01-01,2015-01-01", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "SellEndDate", "dataType": 7, "maxLength": 8, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "DiscontinuedDate", "dataType": 7, "maxLength": 8, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": false, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "rowguid", "dataType": 9, "maxLength": 16, "isNullable": false, "isAutoGenerated": false, "isReadOnly": true, "isRowTimeStamp": true, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "ModifiedDate", "dataType": 6, "maxLength": 8, "isNullable": false, "isAutoGenerated": false, "isReadOnly": true, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "IsActive", "dataType": 2, "maxLength": -1, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": true, "dependentOn": "SellEndDate", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "ThumbnailPhotoFileName", "dataType": 1, "maxLength": 256, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": false, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "SalesOrderDetails", "dataType": 0, "maxLength": -1, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": true, "isNavigation": true }] },
                    childAssoc: [],
                    parentAssoc: [{ "name": "OrdDetailsToProduct", "parentDbSetName": "Product", "childDbSetName": "SalesOrderDetail", "childToParentName": "Product", "parentToChildrenName": "SalesOrderDetails", "fieldRels": [{ "parentField": "ProductID", "childField": "ProductID" }], "onDeleteAction": 0 }]
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
            ProductDb.prototype.findEntity = function (ProductID) {
                return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
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
                    dbSetInfo: { "dbSetName": "ProductModel", "enablePaging": false, "pageSize": 25, "fieldInfos": [{ "fieldName": "ProductModelID", "dataType": 3, "maxLength": 4, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 1, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "Name", "dataType": 1, "maxLength": 50, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }] },
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
            ProductModelDb.prototype.findEntity = function (ProductModelID) {
                return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
            };
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
                    dbSetInfo: { "dbSetName": "SalesOrderHeader", "enablePaging": false, "pageSize": 25, "fieldInfos": [{ "fieldName": "SalesOrderID", "dataType": 3, "maxLength": 4, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 1, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "RevisionNumber", "dataType": 3, "maxLength": 1, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "OrderDate", "dataType": 7, "maxLength": 8, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "DueDate", "dataType": 7, "maxLength": 8, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "ShipDate", "dataType": 7, "maxLength": 8, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "Status", "dataType": 3, "maxLength": 1, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "OnlineOrderFlag", "dataType": 2, "maxLength": 1, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "SalesOrderNumber", "dataType": 1, "maxLength": 25, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "PurchaseOrderNumber", "dataType": 1, "maxLength": 25, "isNullable": true, "isAutoGenerated": true, "isReadOnly": true, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "AccountNumber", "dataType": 1, "maxLength": 15, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "CustomerID", "dataType": 3, "maxLength": 4, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "ShipToAddressID", "dataType": 3, "maxLength": 4, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "BillToAddressID", "dataType": 3, "maxLength": 4, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "ShipMethod", "dataType": 1, "maxLength": 50, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "CreditCardApprovalCode", "dataType": 1, "maxLength": 15, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "SubTotal", "dataType": 4, "maxLength": 8, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "TaxAmt", "dataType": 4, "maxLength": 8, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "Freight", "dataType": 4, "maxLength": 8, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "TotalDue", "dataType": 4, "maxLength": 8, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "Comment", "dataType": 1, "maxLength": 0, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "rowguid", "dataType": 9, "maxLength": 16, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "ModifiedDate", "dataType": 6, "maxLength": 8, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "SalesOrderDetails", "dataType": 0, "maxLength": -1, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": true, "isNavigation": true }, { "fieldName": "Customer", "dataType": 0, "maxLength": -1, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "CustomerID", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": true, "isNavigation": true }, { "fieldName": "Address", "dataType": 0, "maxLength": -1, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "ShipToAddressID", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": true, "isNavigation": true }, { "fieldName": "Address1", "dataType": 0, "maxLength": -1, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "BillToAddressID", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": true, "isNavigation": true }] },
                    childAssoc: [{ "name": "OrdersToCustomer", "parentDbSetName": "Customer", "childDbSetName": "SalesOrderHeader", "childToParentName": "Customer", "parentToChildrenName": null, "fieldRels": [{ "parentField": "CustomerID", "childField": "CustomerID" }], "onDeleteAction": 0 }, { "name": "OrdersToShipAddr", "parentDbSetName": "Address", "childDbSetName": "SalesOrderHeader", "childToParentName": "Address", "parentToChildrenName": null, "fieldRels": [{ "parentField": "AddressID", "childField": "ShipToAddressID" }], "onDeleteAction": 0 }, { "name": "OrdersToBillAddr", "parentDbSetName": "Address", "childDbSetName": "SalesOrderHeader", "childToParentName": "Address1", "parentToChildrenName": null, "fieldRels": [{ "parentField": "AddressID", "childField": "BillToAddressID" }], "onDeleteAction": 0 }],
                    parentAssoc: [{ "name": "OrdDetailsToOrder", "parentDbSetName": "SalesOrderHeader", "childDbSetName": "SalesOrderDetail", "childToParentName": "SalesOrderHeader", "parentToChildrenName": "SalesOrderDetails", "fieldRels": [{ "parentField": "SalesOrderID", "childField": "SalesOrderID" }], "onDeleteAction": 1 }]
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
            SalesOrderHeaderDb.prototype.findEntity = function (SalesOrderID) {
                return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
            };
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
                    dbSetInfo: { "dbSetName": "SalesOrderDetail", "enablePaging": false, "pageSize": 25, "fieldInfos": [{ "fieldName": "SalesOrderID", "dataType": 3, "maxLength": 4, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 1, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "SalesOrderDetailID", "dataType": 3, "maxLength": 4, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 2, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "OrderQty", "dataType": 3, "maxLength": 2, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "ProductID", "dataType": 3, "maxLength": 4, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "UnitPrice", "dataType": 4, "maxLength": 8, "isNullable": true, "isAutoGenerated": true, "isReadOnly": true, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "UnitPriceDiscount", "dataType": 4, "maxLength": 8, "isNullable": true, "isAutoGenerated": true, "isReadOnly": true, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "LineTotal", "dataType": 4, "maxLength": 17, "isNullable": false, "isAutoGenerated": false, "isReadOnly": true, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "rowguid", "dataType": 9, "maxLength": 16, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "ModifiedDate", "dataType": 6, "maxLength": 8, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "SalesOrderHeader", "dataType": 0, "maxLength": -1, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "SalesOrderID", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": true, "isNavigation": true }, { "fieldName": "Product", "dataType": 0, "maxLength": -1, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "ProductID", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": true, "isNavigation": true }] },
                    childAssoc: [{ "name": "OrdDetailsToOrder", "parentDbSetName": "SalesOrderHeader", "childDbSetName": "SalesOrderDetail", "childToParentName": "SalesOrderHeader", "parentToChildrenName": "SalesOrderDetails", "fieldRels": [{ "parentField": "SalesOrderID", "childField": "SalesOrderID" }], "onDeleteAction": 1 }, { "name": "OrdDetailsToProduct", "parentDbSetName": "Product", "childDbSetName": "SalesOrderDetail", "childToParentName": "Product", "parentToChildrenName": "SalesOrderDetails", "fieldRels": [{ "parentField": "ProductID", "childField": "ProductID" }], "onDeleteAction": 0 }],
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
            SalesOrderDetailDb.prototype.findEntity = function (SalesOrderID, SalesOrderDetailID) {
                return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
            };
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
                    dbSetInfo: { "dbSetName": "ProductCategory", "enablePaging": false, "pageSize": 25, "fieldInfos": [{ "fieldName": "ProductCategoryID", "dataType": 3, "maxLength": 4, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 1, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "ParentProductCategoryID", "dataType": 3, "maxLength": 4, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "Name", "dataType": 1, "maxLength": 50, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "rowguid", "dataType": 9, "maxLength": 16, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": true, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "ModifiedDate", "dataType": 6, "maxLength": 8, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }] },
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
            ProductCategoryDb.prototype.findEntity = function (ProductCategoryID) {
                return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
            };
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
                    dbSetInfo: { "dbSetName": "SalesInfo", "enablePaging": true, "pageSize": 25, "fieldInfos": [{ "fieldName": "SalesPerson", "dataType": 1, "maxLength": -1, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 1, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }] },
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
            SalesInfoDb.prototype.findEntity = function (SalesPerson) {
                return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
            };
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
                    dbSetInfo: { "dbSetName": "LookUpProduct", "enablePaging": true, "pageSize": 25, "fieldInfos": [{ "fieldName": "ProductID", "dataType": 3, "maxLength": -1, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 1, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "Name", "dataType": 1, "maxLength": -1, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }] },
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
            LookUpProductDb.prototype.findEntity = function (ProductID) {
                return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
            };
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
                    dbSetInfo: { "dbSetName": "AddressInfo", "enablePaging": false, "pageSize": 25, "fieldInfos": [{ "fieldName": "AddressID", "dataType": 3, "maxLength": 4, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 1, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "AddressLine1", "dataType": 1, "maxLength": 200, "isNullable": true, "isAutoGenerated": false, "isReadOnly": true, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "City", "dataType": 1, "maxLength": 30, "isNullable": true, "isAutoGenerated": false, "isReadOnly": true, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "StateProvince", "dataType": 1, "maxLength": 50, "isNullable": true, "isAutoGenerated": false, "isReadOnly": true, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "CountryRegion", "dataType": 1, "maxLength": 50, "isNullable": true, "isAutoGenerated": false, "isReadOnly": true, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": false, "isNavigation": false }, { "fieldName": "CustomerAddresses", "dataType": 0, "maxLength": -1, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isRowTimeStamp": false, "isNeedOriginal": true, "isPrimaryKey": 0, "regex": "", "isCalculated": false, "dependentOn": "", "range": "", "dateConversion": 0, "allowClientDefault": false, "isClientOnly": true, "isNavigation": true }] },
                    childAssoc: [],
                    parentAssoc: [{ "name": "CustAddrToAddress2", "parentDbSetName": "AddressInfo", "childDbSetName": "CustomerAddress", "childToParentName": "AddressInfo", "parentToChildrenName": "CustomerAddresses", "fieldRels": [{ "parentField": "AddressID", "childField": "AddressID" }], "onDeleteAction": 0 }]
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
            AddressInfoDb.prototype.findEntity = function (AddressID) {
                return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
            };
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
                var associations = [{ "name": "CustAddrToCustomer", "parentDbSetName": "Customer", "childDbSetName": "CustomerAddress", "childToParentName": "Customer", "parentToChildrenName": "CustomerAddresses", "fieldRels": [{ "parentField": "CustomerID", "childField": "CustomerID" }], "onDeleteAction": 0 }, { "name": "CustAddrToAddress", "parentDbSetName": "Address", "childDbSetName": "CustomerAddress", "childToParentName": "Address", "parentToChildrenName": "CustomerAddresses", "fieldRels": [{ "parentField": "AddressID", "childField": "AddressID" }], "onDeleteAction": 0 }, { "name": "CustAddrToAddress2", "parentDbSetName": "AddressInfo", "childDbSetName": "CustomerAddress", "childToParentName": "AddressInfo", "parentToChildrenName": "CustomerAddresses", "fieldRels": [{ "parentField": "AddressID", "childField": "AddressID" }], "onDeleteAction": 0 }, { "name": "OrdDetailsToOrder", "parentDbSetName": "SalesOrderHeader", "childDbSetName": "SalesOrderDetail", "childToParentName": "SalesOrderHeader", "parentToChildrenName": "SalesOrderDetails", "fieldRels": [{ "parentField": "SalesOrderID", "childField": "SalesOrderID" }], "onDeleteAction": 1 }, { "name": "OrdDetailsToProduct", "parentDbSetName": "Product", "childDbSetName": "SalesOrderDetail", "childToParentName": "Product", "parentToChildrenName": "SalesOrderDetails", "fieldRels": [{ "parentField": "ProductID", "childField": "ProductID" }], "onDeleteAction": 0 }, { "name": "OrdersToCustomer", "parentDbSetName": "Customer", "childDbSetName": "SalesOrderHeader", "childToParentName": "Customer", "parentToChildrenName": null, "fieldRels": [{ "parentField": "CustomerID", "childField": "CustomerID" }], "onDeleteAction": 0 }, { "name": "OrdersToShipAddr", "parentDbSetName": "Address", "childDbSetName": "SalesOrderHeader", "childToParentName": "Address", "parentToChildrenName": null, "fieldRels": [{ "parentField": "AddressID", "childField": "ShipToAddressID" }], "onDeleteAction": 0 }, { "name": "OrdersToBillAddr", "parentDbSetName": "Address", "childDbSetName": "SalesOrderHeader", "childToParentName": "Address1", "parentToChildrenName": null, "fieldRels": [{ "parentField": "AddressID", "childField": "BillToAddressID" }], "onDeleteAction": 0 }];
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
    })(RIAPP.DEMODB || (RIAPP.DEMODB = {}));
    var DEMODB = RIAPP.DEMODB;
})(RIAPP || (RIAPP = {}));
//# sourceMappingURL=demoDB.js.map

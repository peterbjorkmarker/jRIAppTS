/// <reference path="..\jriapp.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RIAPP;
(function (RIAPP) {
    (function (DEMODB) {
        'use strict';

        

        

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

        

        //******BEGIN LISTS REGION******
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
            TestDictionary.prototype.findItem = function (key) {
                return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
            };
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
            KeyValDictionary.prototype.findItem = function (key) {
                return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
            };
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

        

        var Customer = (function (_super) {
            __extends(Customer, _super);
            function Customer(dbSet, row, names) {
                _super.call(this, dbSet, row, names);
                this._ComplexProp = null;
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
            Object.defineProperty(Customer.prototype, "ComplexProp", {
                get: function () {
                    if (!this._ComplexProp) {
                        this._ComplexProp = new Customer_ComplexProp('ComplexProp', this);
                    }
                    return this._ComplexProp;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Customer.prototype, "AddressCount", {
                get: function () {
                    return this._getFieldVal('AddressCount');
                },
                set: function (v) {
                    this._setFieldVal('AddressCount', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Customer.prototype, "CustomerAddresses", {
                get: function () {
                    return this._getNavFieldVal('CustomerAddresses');
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
                    dbSetInfo: { "fieldInfos": null, "enablePaging": true, "pageSize": 25, "dbSetName": "Customer" },
                    childAssoc: ([]),
                    parentAssoc: ([{ "name": "CustAddrToCustomer", "parentDbSetName": "Customer", "childDbSetName": "CustomerAddress", "childToParentName": "Customer", "parentToChildrenName": "CustomerAddresses", "onDeleteAction": 0, "fieldRels": [{ "parentField": "CustomerID", "childField": "CustomerID" }] }, { "name": "OrdersToCustomer", "parentDbSetName": "Customer", "childDbSetName": "SalesOrderHeader", "childToParentName": "Customer", "parentToChildrenName": null, "onDeleteAction": 0, "fieldRels": [{ "parentField": "CustomerID", "childField": "CustomerID" }] }])
                }, utils = RIAPP.global.utils;
                opts.dbSetInfo.fieldInfos = ([{ "fieldName": "CustomerID", "isPrimaryKey": 1, "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "NameStyle", "isPrimaryKey": 0, "dataType": 2, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Title", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Suffix", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 10, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "CompanyName", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 128, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "SalesPerson", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 256, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "PasswordHash", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 128, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "PasswordSalt", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 10, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "rowguid", "isPrimaryKey": 0, "dataType": 9, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 16, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 4, "dependentOn": "", "nested": null }, { "fieldName": "ModifiedDate", "isPrimaryKey": 0, "dataType": 6, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ComplexProp", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 5, "dependentOn": "", "nested": [{ "fieldName": "FirstName", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "MiddleName", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "LastName", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Name", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 2, "dependentOn": "ComplexProp.FirstName,ComplexProp.MiddleName,ComplexProp.LastName", "nested": null }, { "fieldName": "ComplexProp", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 5, "dependentOn": "", "nested": [{ "fieldName": "EmailAddress", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "^[_a-z0-9-]+(\\.[_a-z0-9-]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,4})$", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Phone", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 25, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }] }] }, { "fieldName": "AddressCount", "isPrimaryKey": 0, "dataType": 3, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 6, "dependentOn": "", "nested": null }, { "fieldName": "CustomerAddresses", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "", "nested": null }]);
                _super.call(this, opts, Customer);
            }
            CustomerDb.prototype.findEntity = function (customerID) {
                return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
            };
            CustomerDb.prototype.createReadCustomerQuery = function (args) {
                var query = this.createQuery('ReadCustomer');
                query.params = args;
                return query;
            };

            CustomerDb.prototype.defineComplexProp_NameField = function (getFunc) {
                this._defineCalculatedField('ComplexProp.Name', getFunc);
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
            function CustomerAddress(dbSet, row, names) {
                _super.call(this, dbSet, row, names);
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
                    return this._getNavFieldVal('Customer');
                },
                set: function (v) {
                    this._setNavFieldVal('Customer', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomerAddress.prototype, "Address", {
                get: function () {
                    return this._getNavFieldVal('Address');
                },
                set: function (v) {
                    this._setNavFieldVal('Address', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomerAddress.prototype, "AddressInfo", {
                get: function () {
                    return this._getNavFieldVal('AddressInfo');
                },
                set: function (v) {
                    this._setNavFieldVal('AddressInfo', v);
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
                    dbSetInfo: { "fieldInfos": null, "enablePaging": false, "pageSize": 25, "dbSetName": "CustomerAddress" },
                    childAssoc: ([{ "name": "CustAddrToCustomer", "parentDbSetName": "Customer", "childDbSetName": "CustomerAddress", "childToParentName": "Customer", "parentToChildrenName": "CustomerAddresses", "onDeleteAction": 0, "fieldRels": [{ "parentField": "CustomerID", "childField": "CustomerID" }] }, { "name": "CustAddrToAddress", "parentDbSetName": "Address", "childDbSetName": "CustomerAddress", "childToParentName": "Address", "parentToChildrenName": "CustomerAddresses", "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "AddressID" }] }, { "name": "CustAddrToAddress2", "parentDbSetName": "AddressInfo", "childDbSetName": "CustomerAddress", "childToParentName": "AddressInfo", "parentToChildrenName": "CustomerAddresses", "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "AddressID" }] }]),
                    parentAssoc: ([])
                }, utils = RIAPP.global.utils;
                opts.dbSetInfo.fieldInfos = ([{ "fieldName": "CustomerID", "isPrimaryKey": 1, "dataType": 3, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "AddressID", "isPrimaryKey": 2, "dataType": 3, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "AddressType", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": false, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "rowguid", "isPrimaryKey": 0, "dataType": 9, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 16, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 4, "dependentOn": "", "nested": null }, { "fieldName": "ModifiedDate", "isPrimaryKey": 0, "dataType": 6, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": false, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Customer", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "CustomerID", "nested": null }, { "fieldName": "Address", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "AddressID", "nested": null }, { "fieldName": "AddressInfo", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "AddressID", "nested": null }]);
                _super.call(this, opts, CustomerAddress);
            }
            CustomerAddressDb.prototype.findEntity = function (customerID, addressID) {
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
            function Address(dbSet, row, names) {
                _super.call(this, dbSet, row, names);
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
                    return this._getNavFieldVal('CustomerAddresses');
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
                    dbSetInfo: { "fieldInfos": null, "enablePaging": false, "pageSize": 25, "dbSetName": "Address" },
                    childAssoc: ([]),
                    parentAssoc: ([{ "name": "CustAddrToAddress", "parentDbSetName": "Address", "childDbSetName": "CustomerAddress", "childToParentName": "Address", "parentToChildrenName": "CustomerAddresses", "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "AddressID" }] }, { "name": "OrdersToShipAddr", "parentDbSetName": "Address", "childDbSetName": "SalesOrderHeader", "childToParentName": "Address", "parentToChildrenName": null, "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "ShipToAddressID" }] }, { "name": "OrdersToBillAddr", "parentDbSetName": "Address", "childDbSetName": "SalesOrderHeader", "childToParentName": "Address1", "parentToChildrenName": null, "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "BillToAddressID" }] }])
                }, utils = RIAPP.global.utils;
                opts.dbSetInfo.fieldInfos = ([{ "fieldName": "AddressID", "isPrimaryKey": 1, "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "AddressLine1", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 60, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "AddressLine2", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 60, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "City", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 30, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "StateProvince", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "CountryRegion", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "PostalCode", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 15, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "rowguid", "isPrimaryKey": 0, "dataType": 9, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 4, "dependentOn": "", "nested": null }, { "fieldName": "ModifiedDate", "isPrimaryKey": 0, "dataType": 6, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "CustomerAddresses", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "", "nested": null }]);
                _super.call(this, opts, Address);
            }
            AddressDb.prototype.findEntity = function (addressID) {
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
            function Product(dbSet, row, names) {
                _super.call(this, dbSet, row, names);
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
                    return this._getCalcFieldVal('IsActive');
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
                    return this._getNavFieldVal('SalesOrderDetails');
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
                    dbSetInfo: { "fieldInfos": null, "enablePaging": true, "pageSize": 25, "dbSetName": "Product" },
                    childAssoc: ([]),
                    parentAssoc: ([{ "name": "OrdDetailsToProduct", "parentDbSetName": "Product", "childDbSetName": "SalesOrderDetail", "childToParentName": "Product", "parentToChildrenName": "SalesOrderDetails", "onDeleteAction": 0, "fieldRels": [{ "parentField": "ProductID", "childField": "ProductID" }] }])
                }, utils = RIAPP.global.utils;
                opts.dbSetInfo.fieldInfos = ([{ "fieldName": "ProductID", "isPrimaryKey": 1, "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Name", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": false, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ProductNumber", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": false, "maxLength": 25, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Color", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": false, "maxLength": 15, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "StandardCost", "isPrimaryKey": 0, "dataType": 4, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": false, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ListPrice", "isPrimaryKey": 0, "dataType": 4, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": false, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "100,5000", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Size", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": false, "maxLength": 5, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Weight", "isPrimaryKey": 0, "dataType": 4, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": false, "maxLength": 5, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ProductCategoryID", "isPrimaryKey": 0, "dataType": 3, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": false, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ProductModelID", "isPrimaryKey": 0, "dataType": 3, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": false, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "SellStartDate", "isPrimaryKey": 0, "dataType": 7, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "2000-01-01,2015-01-01", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "SellEndDate", "isPrimaryKey": 0, "dataType": 7, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "DiscontinuedDate", "isPrimaryKey": 0, "dataType": 7, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": false, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "rowguid", "isPrimaryKey": 0, "dataType": 9, "isNullable": false, "isReadOnly": true, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 16, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 4, "dependentOn": "", "nested": null }, { "fieldName": "ModifiedDate", "isPrimaryKey": 0, "dataType": 6, "isNullable": false, "isReadOnly": true, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "IsActive", "isPrimaryKey": 0, "dataType": 2, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 2, "dependentOn": "SellEndDate", "nested": null }, { "fieldName": "ThumbnailPhotoFileName", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": false, "maxLength": 256, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "SalesOrderDetails", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "", "nested": null }]);
                _super.call(this, opts, Product);
            }
            ProductDb.prototype.findEntity = function (productID) {
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
                this._defineCalculatedField('IsActive', getFunc);
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
            function ProductModel(dbSet, row, names) {
                _super.call(this, dbSet, row, names);
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
                    dbSetInfo: { "fieldInfos": null, "enablePaging": false, "pageSize": 25, "dbSetName": "ProductModel" },
                    childAssoc: ([]),
                    parentAssoc: ([])
                }, utils = RIAPP.global.utils;
                opts.dbSetInfo.fieldInfos = ([{ "fieldName": "ProductModelID", "isPrimaryKey": 1, "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Name", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }]);
                _super.call(this, opts, ProductModel);
            }
            ProductModelDb.prototype.findEntity = function (productModelID) {
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
            function SalesOrderHeader(dbSet, row, names) {
                _super.call(this, dbSet, row, names);
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
                    return this._getNavFieldVal('SalesOrderDetails');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "Customer", {
                get: function () {
                    return this._getNavFieldVal('Customer');
                },
                set: function (v) {
                    this._setNavFieldVal('Customer', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "Address", {
                get: function () {
                    return this._getNavFieldVal('Address');
                },
                set: function (v) {
                    this._setNavFieldVal('Address', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderHeader.prototype, "Address1", {
                get: function () {
                    return this._getNavFieldVal('Address1');
                },
                set: function (v) {
                    this._setNavFieldVal('Address1', v);
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
                    dbSetInfo: { "fieldInfos": null, "enablePaging": false, "pageSize": 25, "dbSetName": "SalesOrderHeader" },
                    childAssoc: ([{ "name": "OrdersToCustomer", "parentDbSetName": "Customer", "childDbSetName": "SalesOrderHeader", "childToParentName": "Customer", "parentToChildrenName": null, "onDeleteAction": 0, "fieldRels": [{ "parentField": "CustomerID", "childField": "CustomerID" }] }, { "name": "OrdersToShipAddr", "parentDbSetName": "Address", "childDbSetName": "SalesOrderHeader", "childToParentName": "Address", "parentToChildrenName": null, "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "ShipToAddressID" }] }, { "name": "OrdersToBillAddr", "parentDbSetName": "Address", "childDbSetName": "SalesOrderHeader", "childToParentName": "Address1", "parentToChildrenName": null, "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "BillToAddressID" }] }]),
                    parentAssoc: ([{ "name": "OrdDetailsToOrder", "parentDbSetName": "SalesOrderHeader", "childDbSetName": "SalesOrderDetail", "childToParentName": "SalesOrderHeader", "parentToChildrenName": "SalesOrderDetails", "onDeleteAction": 1, "fieldRels": [{ "parentField": "SalesOrderID", "childField": "SalesOrderID" }] }])
                }, utils = RIAPP.global.utils;
                opts.dbSetInfo.fieldInfos = ([{ "fieldName": "SalesOrderID", "isPrimaryKey": 1, "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "RevisionNumber", "isPrimaryKey": 0, "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "OrderDate", "isPrimaryKey": 0, "dataType": 7, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "DueDate", "isPrimaryKey": 0, "dataType": 7, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ShipDate", "isPrimaryKey": 0, "dataType": 7, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Status", "isPrimaryKey": 0, "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "OnlineOrderFlag", "isPrimaryKey": 0, "dataType": 2, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "SalesOrderNumber", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 25, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "PurchaseOrderNumber", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 25, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "AccountNumber", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 15, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "CustomerID", "isPrimaryKey": 0, "dataType": 3, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ShipToAddressID", "isPrimaryKey": 0, "dataType": 3, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "BillToAddressID", "isPrimaryKey": 0, "dataType": 3, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ShipMethod", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "CreditCardApprovalCode", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 15, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "SubTotal", "isPrimaryKey": 0, "dataType": 4, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "TaxAmt", "isPrimaryKey": 0, "dataType": 4, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Freight", "isPrimaryKey": 0, "dataType": 4, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "TotalDue", "isPrimaryKey": 0, "dataType": 4, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Comment", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 0, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "rowguid", "isPrimaryKey": 0, "dataType": 9, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 16, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ModifiedDate", "isPrimaryKey": 0, "dataType": 6, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "SalesOrderDetails", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "", "nested": null }, { "fieldName": "Customer", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "CustomerID", "nested": null }, { "fieldName": "Address", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "ShipToAddressID", "nested": null }, { "fieldName": "Address1", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "BillToAddressID", "nested": null }]);
                _super.call(this, opts, SalesOrderHeader);
            }
            SalesOrderHeaderDb.prototype.findEntity = function (salesOrderID) {
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
            function SalesOrderDetail(dbSet, row, names) {
                _super.call(this, dbSet, row, names);
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
                    return this._getNavFieldVal('SalesOrderHeader');
                },
                set: function (v) {
                    this._setNavFieldVal('SalesOrderHeader', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SalesOrderDetail.prototype, "Product", {
                get: function () {
                    return this._getNavFieldVal('Product');
                },
                set: function (v) {
                    this._setNavFieldVal('Product', v);
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
                    dbSetInfo: { "fieldInfos": null, "enablePaging": false, "pageSize": 25, "dbSetName": "SalesOrderDetail" },
                    childAssoc: ([{ "name": "OrdDetailsToOrder", "parentDbSetName": "SalesOrderHeader", "childDbSetName": "SalesOrderDetail", "childToParentName": "SalesOrderHeader", "parentToChildrenName": "SalesOrderDetails", "onDeleteAction": 1, "fieldRels": [{ "parentField": "SalesOrderID", "childField": "SalesOrderID" }] }, { "name": "OrdDetailsToProduct", "parentDbSetName": "Product", "childDbSetName": "SalesOrderDetail", "childToParentName": "Product", "parentToChildrenName": "SalesOrderDetails", "onDeleteAction": 0, "fieldRels": [{ "parentField": "ProductID", "childField": "ProductID" }] }]),
                    parentAssoc: ([])
                }, utils = RIAPP.global.utils;
                opts.dbSetInfo.fieldInfos = ([{ "fieldName": "SalesOrderID", "isPrimaryKey": 1, "dataType": 3, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "SalesOrderDetailID", "isPrimaryKey": 2, "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "OrderQty", "isPrimaryKey": 0, "dataType": 3, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 2, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ProductID", "isPrimaryKey": 0, "dataType": 3, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "UnitPrice", "isPrimaryKey": 0, "dataType": 4, "isNullable": true, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "UnitPriceDiscount", "isPrimaryKey": 0, "dataType": 4, "isNullable": true, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "LineTotal", "isPrimaryKey": 0, "dataType": 4, "isNullable": false, "isReadOnly": true, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 17, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "rowguid", "isPrimaryKey": 0, "dataType": 9, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 16, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ModifiedDate", "isPrimaryKey": 0, "dataType": 6, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "SalesOrderHeader", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "SalesOrderID", "nested": null }, { "fieldName": "Product", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "ProductID", "nested": null }]);
                _super.call(this, opts, SalesOrderDetail);
            }
            SalesOrderDetailDb.prototype.findEntity = function (salesOrderID, salesOrderDetailID) {
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
            function ProductCategory(dbSet, row, names) {
                _super.call(this, dbSet, row, names);
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
                    dbSetInfo: { "fieldInfos": null, "enablePaging": false, "pageSize": 25, "dbSetName": "ProductCategory" },
                    childAssoc: ([]),
                    parentAssoc: ([])
                }, utils = RIAPP.global.utils;
                opts.dbSetInfo.fieldInfos = ([{ "fieldName": "ProductCategoryID", "isPrimaryKey": 1, "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ParentProductCategoryID", "isPrimaryKey": 0, "dataType": 3, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Name", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "rowguid", "isPrimaryKey": 0, "dataType": 9, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 16, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 4, "dependentOn": "", "nested": null }, { "fieldName": "ModifiedDate", "isPrimaryKey": 0, "dataType": 6, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }]);
                _super.call(this, opts, ProductCategory);
            }
            ProductCategoryDb.prototype.findEntity = function (productCategoryID) {
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
            function SalesInfo(dbSet, row, names) {
                _super.call(this, dbSet, row, names);
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
                    dbSetInfo: { "fieldInfos": null, "enablePaging": true, "pageSize": 25, "dbSetName": "SalesInfo" },
                    childAssoc: ([]),
                    parentAssoc: ([])
                }, utils = RIAPP.global.utils;
                opts.dbSetInfo.fieldInfos = ([{ "fieldName": "SalesPerson", "isPrimaryKey": 1, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }]);
                _super.call(this, opts, SalesInfo);
            }
            SalesInfoDb.prototype.findEntity = function (salesPerson) {
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
            function LookUpProduct(dbSet, row, names) {
                _super.call(this, dbSet, row, names);
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
                    dbSetInfo: { "fieldInfos": null, "enablePaging": true, "pageSize": 25, "dbSetName": "LookUpProduct" },
                    childAssoc: ([]),
                    parentAssoc: ([])
                }, utils = RIAPP.global.utils;
                opts.dbSetInfo.fieldInfos = ([{ "fieldName": "ProductID", "isPrimaryKey": 1, "dataType": 3, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Name", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }]);
                _super.call(this, opts, LookUpProduct);
            }
            LookUpProductDb.prototype.findEntity = function (productID) {
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
            function AddressInfo(dbSet, row, names) {
                _super.call(this, dbSet, row, names);
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
                    return this._getNavFieldVal('CustomerAddresses');
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
                    dbSetInfo: { "fieldInfos": null, "enablePaging": false, "pageSize": 25, "dbSetName": "AddressInfo" },
                    childAssoc: ([]),
                    parentAssoc: ([{ "name": "CustAddrToAddress2", "parentDbSetName": "AddressInfo", "childDbSetName": "CustomerAddress", "childToParentName": "AddressInfo", "parentToChildrenName": "CustomerAddresses", "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "AddressID" }] }])
                }, utils = RIAPP.global.utils;
                opts.dbSetInfo.fieldInfos = ([{ "fieldName": "AddressID", "isPrimaryKey": 1, "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "AddressLine1", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": true, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 200, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "City", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": true, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 30, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "StateProvince", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": true, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "CountryRegion", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": true, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "CustomerAddresses", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "", "nested": null }]);
                _super.call(this, opts, AddressInfo);
            }
            AddressInfoDb.prototype.findEntity = function (addressID) {
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
    })(RIAPP.DEMODB || (RIAPP.DEMODB = {}));
    var DEMODB = RIAPP.DEMODB;
})(RIAPP || (RIAPP = {}));
//# sourceMappingURL=demoDB.js.map

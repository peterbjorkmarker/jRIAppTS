/// <reference path="..\jriapp.ts"/>
module RIAPP
{
    'use strict';
    export module DEMODB {
        /*
            Generated from: /RiappDemoService/GetTypeScript on 2013-10-18 11:36 at 11:36
            Don't make manual changes here, because they will be lost when this db interface will be regenerated!
        */

        export interface ITestLookUpProduct {
            ProductID: number;
            Name: string;
        }

        export enum TestEnum {
            None= 0,
            OK= 1,
            Error= 2,
            Loading= 3
        }

        /*
            A Class for testing of conversion C# types to typescript
        */
        export interface IClientTestModel {
            Key: string;
            SomeProperty1: string;
            SomeProperty2: number[];
            SomeProperty3: string[];
            MoreComplexProperty: ITestLookUpProduct[];
            EnumProperty: TestEnum;
        }

        /*
            Generated from C# KeyVal model
        */
        export interface IKeyVal {
            key: number;
            val: string;
        }

        /*
            Generated from C# HistoryItem model
        */
        export interface IHistoryItem extends RIAPP.MOD.utils.IEditable {
            radioValue: string;
            time: Date;
        }

        /*
            An enum for testing of conversion C# types to typescript
        */
        export enum TestEnum2 {
            None= 0,
            One= 1,
            Two= 2,
            Three= 3
        }

        export interface ISvcMethods {
            TestInvoke: (args: {
                param1: number[];
                param2: string;
            }) => IPromise<string>;
        }

        export class TestModelListItem extends RIAPP.MOD.collection.ListItem implements IClientTestModel {
            constructor(coll: RIAPP.MOD.collection.BaseList<TestModelListItem, IClientTestModel>, obj?: IClientTestModel) {
                super(coll, obj);
            }
            get Key() { return <string>this._getProp('Key'); }
            set Key(v: string) { this._setProp('Key', v); }
            get SomeProperty1() { return <string>this._getProp('SomeProperty1'); }
            set SomeProperty1(v: string) { this._setProp('SomeProperty1', v); }
            get SomeProperty2() { return <number[]>this._getProp('SomeProperty2'); }
            set SomeProperty2(v: number[]) { this._setProp('SomeProperty2', v); }
            get SomeProperty3() { return <string[]>this._getProp('SomeProperty3'); }
            set SomeProperty3(v: string[]) { this._setProp('SomeProperty3', v); }
            get MoreComplexProperty() { return <ITestLookUpProduct[]>this._getProp('MoreComplexProperty'); }
            set MoreComplexProperty(v: ITestLookUpProduct[]) { this._setProp('MoreComplexProperty', v); }
            get EnumProperty() { return <TestEnum>this._getProp('EnumProperty'); }
            set EnumProperty(v: TestEnum) { this._setProp('EnumProperty', v); }
            asInterface() { return <IClientTestModel>this; }
        }

        export class TestDictionary extends RIAPP.MOD.collection.BaseDictionary<TestModelListItem, IClientTestModel> {
            constructor() {
                super(TestModelListItem, 'Key', [{ name: 'Key', dtype: 1 }, { name: 'SomeProperty1', dtype: 1 }, { name: 'SomeProperty2', dtype: 10 }, { name: 'SomeProperty3', dtype: 0 }, { name: 'MoreComplexProperty', dtype: 0 }, { name: 'EnumProperty', dtype: 0 }]);
                this._type_name = 'TestDictionary';
            }
            get items2() { return <IClientTestModel[]>this.items; }
        }

        export class TestList extends RIAPP.MOD.collection.BaseList<TestModelListItem, IClientTestModel> {
            constructor() {
                super(TestModelListItem, [{ name: 'Key', dtype: 1 }, { name: 'SomeProperty1', dtype: 1 }, { name: 'SomeProperty2', dtype: 10 }, { name: 'SomeProperty3', dtype: 0 }, { name: 'MoreComplexProperty', dtype: 0 }, { name: 'EnumProperty', dtype: 0 }]);
                this._type_name = 'TestList';
            }
            get items2() { return <IClientTestModel[]>this.items; }
        }

        export class KeyValListItem extends RIAPP.MOD.collection.ListItem implements IKeyVal {
            constructor(coll: RIAPP.MOD.collection.BaseList<KeyValListItem, IKeyVal>, obj?: IKeyVal) {
                super(coll, obj);
            }
            get key() { return <number>this._getProp('key'); }
            set key(v: number) { this._setProp('key', v); }
            get val() { return <string>this._getProp('val'); }
            set val(v: string) { this._setProp('val', v); }
            asInterface() { return <IKeyVal>this; }
        }

        export class KeyValDictionary extends RIAPP.MOD.collection.BaseDictionary<KeyValListItem, IKeyVal> {
            constructor() {
                super(KeyValListItem, 'key', [{ name: 'key', dtype: 3 }, { name: 'val', dtype: 1 }]);
                this._type_name = 'KeyValDictionary';
            }
            get items2() { return <IKeyVal[]>this.items; }
        }

        export class HistoryItemListItem extends RIAPP.MOD.collection.ListItem implements IHistoryItem {
            constructor(coll: RIAPP.MOD.collection.BaseList<HistoryItemListItem, IHistoryItem>, obj?: IHistoryItem) {
                super(coll, obj);
            }
            get radioValue() { return <string>this._getProp('radioValue'); }
            set radioValue(v: string) { this._setProp('radioValue', v); }
            get time() { return <Date>this._getProp('time'); }
            set time(v: Date) { this._setProp('time', v); }
            asInterface() { return <IHistoryItem>this; }
        }

        export class HistoryList extends RIAPP.MOD.collection.BaseList<HistoryItemListItem, IHistoryItem> {
            constructor() {
                super(HistoryItemListItem, [{ name: 'radioValue', dtype: 1 }, { name: 'time', dtype: 6 }]);
                this._type_name = 'HistoryList';
            }
            get items2() { return <IHistoryItem[]>this.items; }
        }


        export interface ICustomer extends RIAPP.MOD.utils.IEditable, RIAPP.MOD.utils.ISubmittable {
            CustomerID: number;
            NameStyle: boolean;
            Title: string;
            FirstName: string;
            MiddleName: string;
            LastName: string;
            Suffix: string;
            CompanyName: string;
            SalesPerson: string;
            EmailAddress: string;
            Phone: string;
            PasswordHash: string;
            PasswordSalt: string;
            rowguid: string;
            ModifiedDate: Date;
            Name: string;
            CustomerAddresses: CustomerAddress[];

            getDbContext(): DbContext;
            getDbSet(): RIAPP.MOD.db.DbSet<Customer>;
            _dbSet: RIAPP.MOD.db.DbSet<Customer>;
            asEntity(): Customer;
        }

        export class Customer extends RIAPP.MOD.db.Entity implements ICustomer {
            get CustomerID() { return <number>this._getFieldVal('CustomerID'); }
            get NameStyle() { return <boolean>this._getFieldVal('NameStyle'); }
            set NameStyle(v: boolean) { this._setFieldVal('NameStyle', v); }
            get Title() { return <string>this._getFieldVal('Title'); }
            set Title(v: string) { this._setFieldVal('Title', v); }
            get FirstName() { return <string>this._getFieldVal('FirstName'); }
            set FirstName(v: string) { this._setFieldVal('FirstName', v); }
            get MiddleName() { return <string>this._getFieldVal('MiddleName'); }
            set MiddleName(v: string) { this._setFieldVal('MiddleName', v); }
            get LastName() { return <string>this._getFieldVal('LastName'); }
            set LastName(v: string) { this._setFieldVal('LastName', v); }
            get Suffix() { return <string>this._getFieldVal('Suffix'); }
            set Suffix(v: string) { this._setFieldVal('Suffix', v); }
            get CompanyName() { return <string>this._getFieldVal('CompanyName'); }
            set CompanyName(v: string) { this._setFieldVal('CompanyName', v); }
            get SalesPerson() { return <string>this._getFieldVal('SalesPerson'); }
            set SalesPerson(v: string) { this._setFieldVal('SalesPerson', v); }
            get EmailAddress() { return <string>this._getFieldVal('EmailAddress'); }
            set EmailAddress(v: string) { this._setFieldVal('EmailAddress', v); }
            get Phone() { return <string>this._getFieldVal('Phone'); }
            set Phone(v: string) { this._setFieldVal('Phone', v); }
            get PasswordHash() { return <string>this._getFieldVal('PasswordHash'); }
            get PasswordSalt() { return <string>this._getFieldVal('PasswordSalt'); }
            get rowguid() { return <string>this._getFieldVal('rowguid'); }
            get ModifiedDate() { return <Date>this._getFieldVal('ModifiedDate'); }
            get Name() { return <string>this._dbSet._calcfldMap['Name'].getFunc.call(this); }
            get CustomerAddresses() { return <CustomerAddress[]>this._dbSet._navfldMap['CustomerAddresses'].getFunc.call(this); }

            getDbContext() {
                return <DbContext>super.getDbContext();
            }
            getDbSet() {
                return <RIAPP.MOD.db.DbSet<Customer>>super.getDbSet();
            }
            get _dbSet() { return this.getDbSet(); }
            toString() {
                return 'Customer';
            }
            asEntity() { return this; }
            asInterface() { return <ICustomer>this; }
        }

        export class CustomerDb extends RIAPP.MOD.db.DbSet<Customer>
        {
            constructor(dbContext: DbContext) {
                var self = this, opts: RIAPP.MOD.db.IDbSetConstuctorOptions = {
                    dbContext: dbContext,
                    dbSetInfo: { "dbSetName": "Customer", "enablePaging": true, "fieldInfos": [{ "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "CustomerID", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 1, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 4, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 2, "dateConversion": 0, "dependentOn": "", "fieldName": "NameStyle", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 1, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "Title", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 8, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "FirstName", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 50, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "MiddleName", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 50, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "LastName", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 50, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "Suffix", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 10, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "CompanyName", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 128, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "SalesPerson", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 256, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "EmailAddress", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 50, "range": "", "regex": "^[_a-z0-9-]+(\\.[_a-z0-9-]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,4})$" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "Phone", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 25, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "PasswordHash", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 128, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "PasswordSalt", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 10, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 9, "dateConversion": 0, "dependentOn": "", "fieldName": "rowguid", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": true, "maxLength": 16, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 6, "dateConversion": 0, "dependentOn": "", "fieldName": "ModifiedDate", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 8, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "FirstName,MiddleName,LastName", "fieldName": "Name", "isAutoGenerated": false, "isCalculated": true, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": -1, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 0, "dateConversion": 0, "dependentOn": "", "fieldName": "CustomerAddresses", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": true, "isNavigation": true, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": -1, "range": "", "regex": "" }], "pageSize": 25 },
                    childAssoc: [],
                    parentAssoc: [{ "childDbSetName": "CustomerAddress", "childToParentName": "Customer", "fieldRels": [{ "childField": "CustomerID", "parentField": "CustomerID" }], "name": "CustAddrToCustomer", "onDeleteAction": 0, "parentDbSetName": "Customer", "parentToChildrenName": "CustomerAddresses" }, { "childDbSetName": "SalesOrderHeader", "childToParentName": "Customer", "fieldRels": [{ "childField": "CustomerID", "parentField": "CustomerID" }], "name": "OrdersToCustomer", "onDeleteAction": 0, "parentDbSetName": "Customer", "parentToChildrenName": null }]
                }, utils = RIAPP.global.utils;
                super(opts);
                self._entityType = Customer;

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    f.dependents = [];
                    self._fieldMap[f.fieldName] = f;
                });

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    if (!!f.isNavigation) {
                        self._navfldMap[f.fieldName] = self._doNavigationField(opts, f);
                    }
                    else if (!!f.isCalculated) {
                        self._calcfldMap[f.fieldName] = self._doCalculatedField(opts, f);
                    }
                });

                self._mapAssocFields();
            }
            createReadCustomerQuery(args?: {
                includeNav?: boolean;
            }) {
                var query = this.createQuery('ReadCustomer');
                query.params = args;
                return query;
            }

            defineNameField(getFunc: () => string) { this.defineCalculatedField('Name', getFunc); }

            get items2() { return <ICustomer[]><any>this.items; }
        }

        export interface ICustomerAddress extends RIAPP.MOD.utils.IEditable, RIAPP.MOD.utils.ISubmittable {
            CustomerID: number;
            AddressID: number;
            AddressType: string;
            rowguid: string;
            ModifiedDate: Date;
            Customer: Customer;
            Address: Address;
            AddressInfo: AddressInfo;

            getDbContext(): DbContext;
            getDbSet(): RIAPP.MOD.db.DbSet<CustomerAddress>;
            _dbSet: RIAPP.MOD.db.DbSet<CustomerAddress>;
            asEntity(): CustomerAddress;
        }

        export class CustomerAddress extends RIAPP.MOD.db.Entity implements ICustomerAddress {
            get CustomerID() { return <number>this._getFieldVal('CustomerID'); }
            set CustomerID(v: number) { this._setFieldVal('CustomerID', v); }
            get AddressID() { return <number>this._getFieldVal('AddressID'); }
            set AddressID(v: number) { this._setFieldVal('AddressID', v); }
            get AddressType() { return <string>this._getFieldVal('AddressType'); }
            set AddressType(v: string) { this._setFieldVal('AddressType', v); }
            get rowguid() { return <string>this._getFieldVal('rowguid'); }
            get ModifiedDate() { return <Date>this._getFieldVal('ModifiedDate'); }
            get Customer() { return <Customer>this._dbSet._navfldMap['Customer'].getFunc.call(this); }
            set Customer(v: Customer) { this._dbSet._navfldMap['Customer'].setFunc.call(this, v); }
            get Address() { return <Address>this._dbSet._navfldMap['Address'].getFunc.call(this); }
            set Address(v: Address) { this._dbSet._navfldMap['Address'].setFunc.call(this, v); }
            get AddressInfo() { return <AddressInfo>this._dbSet._navfldMap['AddressInfo'].getFunc.call(this); }
            set AddressInfo(v: AddressInfo) { this._dbSet._navfldMap['AddressInfo'].setFunc.call(this, v); }

            getDbContext() {
                return <DbContext>super.getDbContext();
            }
            getDbSet() {
                return <RIAPP.MOD.db.DbSet<CustomerAddress>>super.getDbSet();
            }
            get _dbSet() { return this.getDbSet(); }
            toString() {
                return 'CustomerAddress';
            }
            asEntity() { return this; }
            asInterface() { return <ICustomerAddress>this; }
        }

        export class CustomerAddressDb extends RIAPP.MOD.db.DbSet<CustomerAddress>
        {
            constructor(dbContext: DbContext) {
                var self = this, opts: RIAPP.MOD.db.IDbSetConstuctorOptions = {
                    dbContext: dbContext,
                    dbSetInfo: { "dbSetName": "CustomerAddress", "enablePaging": false, "fieldInfos": [{ "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "CustomerID", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 1, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 4, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "AddressID", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 2, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 4, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "AddressType", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": false, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 50, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 9, "dateConversion": 0, "dependentOn": "", "fieldName": "rowguid", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": true, "maxLength": 16, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 6, "dateConversion": 0, "dependentOn": "", "fieldName": "ModifiedDate", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": false, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 8, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 0, "dateConversion": 0, "dependentOn": "CustomerID", "fieldName": "Customer", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": true, "isNavigation": true, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": -1, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 0, "dateConversion": 0, "dependentOn": "AddressID", "fieldName": "Address", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": true, "isNavigation": true, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": -1, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 0, "dateConversion": 0, "dependentOn": "AddressID", "fieldName": "AddressInfo", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": true, "isNavigation": true, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": -1, "range": "", "regex": "" }], "pageSize": 25 },
                    childAssoc: [{ "childDbSetName": "CustomerAddress", "childToParentName": "Customer", "fieldRels": [{ "childField": "CustomerID", "parentField": "CustomerID" }], "name": "CustAddrToCustomer", "onDeleteAction": 0, "parentDbSetName": "Customer", "parentToChildrenName": "CustomerAddresses" }, { "childDbSetName": "CustomerAddress", "childToParentName": "Address", "fieldRels": [{ "childField": "AddressID", "parentField": "AddressID" }], "name": "CustAddrToAddress", "onDeleteAction": 0, "parentDbSetName": "Address", "parentToChildrenName": "CustomerAddresses" }, { "childDbSetName": "CustomerAddress", "childToParentName": "AddressInfo", "fieldRels": [{ "childField": "AddressID", "parentField": "AddressID" }], "name": "CustAddrToAddress2", "onDeleteAction": 0, "parentDbSetName": "AddressInfo", "parentToChildrenName": "CustomerAddresses" }],
                    parentAssoc: []
                }, utils = RIAPP.global.utils;
                super(opts);
                self._entityType = CustomerAddress;

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    f.dependents = [];
                    self._fieldMap[f.fieldName] = f;
                });

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    if (!!f.isNavigation) {
                        self._navfldMap[f.fieldName] = self._doNavigationField(opts, f);
                    }
                    else if (!!f.isCalculated) {
                        self._calcfldMap[f.fieldName] = self._doCalculatedField(opts, f);
                    }
                });

                self._mapAssocFields();
            }
            createReadCustomerAddressQuery() {
                return this.createQuery('ReadCustomerAddress');
            }
            createReadAddressForCustomersQuery(args?: {
                custIDs: number[];
            }) {
                var query = this.createQuery('ReadAddressForCustomers');
                query.params = args;
                return query;
            }


            get items2() { return <ICustomerAddress[]><any>this.items; }
        }

        export interface IAddress extends RIAPP.MOD.utils.IEditable, RIAPP.MOD.utils.ISubmittable {
            AddressID: number;
            AddressLine1: string;
            AddressLine2: string;
            City: string;
            StateProvince: string;
            CountryRegion: string;
            PostalCode: string;
            rowguid: string;
            ModifiedDate: Date;
            CustomerAddresses: CustomerAddress[];

            getDbContext(): DbContext;
            getDbSet(): RIAPP.MOD.db.DbSet<Address>;
            _dbSet: RIAPP.MOD.db.DbSet<Address>;
            asEntity(): Address;
        }

        export class Address extends RIAPP.MOD.db.Entity implements IAddress {
            get AddressID() { return <number>this._getFieldVal('AddressID'); }
            get AddressLine1() { return <string>this._getFieldVal('AddressLine1'); }
            set AddressLine1(v: string) { this._setFieldVal('AddressLine1', v); }
            get AddressLine2() { return <string>this._getFieldVal('AddressLine2'); }
            set AddressLine2(v: string) { this._setFieldVal('AddressLine2', v); }
            get City() { return <string>this._getFieldVal('City'); }
            set City(v: string) { this._setFieldVal('City', v); }
            get StateProvince() { return <string>this._getFieldVal('StateProvince'); }
            set StateProvince(v: string) { this._setFieldVal('StateProvince', v); }
            get CountryRegion() { return <string>this._getFieldVal('CountryRegion'); }
            set CountryRegion(v: string) { this._setFieldVal('CountryRegion', v); }
            get PostalCode() { return <string>this._getFieldVal('PostalCode'); }
            set PostalCode(v: string) { this._setFieldVal('PostalCode', v); }
            get rowguid() { return <string>this._getFieldVal('rowguid'); }
            get ModifiedDate() { return <Date>this._getFieldVal('ModifiedDate'); }
            get CustomerAddresses() { return <CustomerAddress[]>this._dbSet._navfldMap['CustomerAddresses'].getFunc.call(this); }

            getDbContext() {
                return <DbContext>super.getDbContext();
            }
            getDbSet() {
                return <RIAPP.MOD.db.DbSet<Address>>super.getDbSet();
            }
            get _dbSet() { return this.getDbSet(); }
            toString() {
                return 'Address';
            }
            asEntity() { return this; }
            asInterface() { return <IAddress>this; }
        }

        export class AddressDb extends RIAPP.MOD.db.DbSet<Address>
        {
            constructor(dbContext: DbContext) {
                var self = this, opts: RIAPP.MOD.db.IDbSetConstuctorOptions = {
                    dbContext: dbContext,
                    dbSetInfo: { "dbSetName": "Address", "enablePaging": false, "fieldInfos": [{ "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "AddressID", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 1, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 4, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "AddressLine1", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 60, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "AddressLine2", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 60, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "City", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 30, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "StateProvince", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 50, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "CountryRegion", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 50, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "PostalCode", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 15, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 9, "dateConversion": 0, "dependentOn": "", "fieldName": "rowguid", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": true, "maxLength": -1, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 6, "dateConversion": 0, "dependentOn": "", "fieldName": "ModifiedDate", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": -1, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 0, "dateConversion": 0, "dependentOn": "", "fieldName": "CustomerAddresses", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": true, "isNavigation": true, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": -1, "range": "", "regex": "" }], "pageSize": 25 },
                    childAssoc: [],
                    parentAssoc: [{ "childDbSetName": "CustomerAddress", "childToParentName": "Address", "fieldRels": [{ "childField": "AddressID", "parentField": "AddressID" }], "name": "CustAddrToAddress", "onDeleteAction": 0, "parentDbSetName": "Address", "parentToChildrenName": "CustomerAddresses" }, { "childDbSetName": "SalesOrderHeader", "childToParentName": "Address", "fieldRels": [{ "childField": "ShipToAddressID", "parentField": "AddressID" }], "name": "OrdersToShipAddr", "onDeleteAction": 0, "parentDbSetName": "Address", "parentToChildrenName": null }, { "childDbSetName": "SalesOrderHeader", "childToParentName": "Address1", "fieldRels": [{ "childField": "BillToAddressID", "parentField": "AddressID" }], "name": "OrdersToBillAddr", "onDeleteAction": 0, "parentDbSetName": "Address", "parentToChildrenName": null }]
                }, utils = RIAPP.global.utils;
                super(opts);
                self._entityType = Address;

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    f.dependents = [];
                    self._fieldMap[f.fieldName] = f;
                });

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    if (!!f.isNavigation) {
                        self._navfldMap[f.fieldName] = self._doNavigationField(opts, f);
                    }
                    else if (!!f.isCalculated) {
                        self._calcfldMap[f.fieldName] = self._doCalculatedField(opts, f);
                    }
                });

                self._mapAssocFields();
            }
            createReadAddressQuery() {
                return this.createQuery('ReadAddress');
            }
            createReadAddressByIdsQuery(args?: {
                addressIDs: number[];
            }) {
                var query = this.createQuery('ReadAddressByIds');
                query.params = args;
                return query;
            }


            get items2() { return <IAddress[]><any>this.items; }
        }

        export interface IProduct extends RIAPP.MOD.utils.IEditable, RIAPP.MOD.utils.ISubmittable {
            ProductID: number;
            Name: string;
            ProductNumber: string;
            Color: string;
            StandardCost: number;
            ListPrice: number;
            Size: string;
            Weight: number;
            ProductCategoryID: number;
            ProductModelID: number;
            SellStartDate: Date;
            SellEndDate: Date;
            DiscontinuedDate: Date;
            rowguid: string;
            ModifiedDate: Date;
            IsActive: boolean;
            ThumbnailPhotoFileName: string;
            SalesOrderDetails: SalesOrderDetail[];

            getDbContext(): DbContext;
            getDbSet(): RIAPP.MOD.db.DbSet<Product>;
            _dbSet: RIAPP.MOD.db.DbSet<Product>;
            asEntity(): Product;
        }

        export class Product extends RIAPP.MOD.db.Entity implements IProduct {
            get ProductID() { return <number>this._getFieldVal('ProductID'); }
            get Name() { return <string>this._getFieldVal('Name'); }
            set Name(v: string) { this._setFieldVal('Name', v); }
            get ProductNumber() { return <string>this._getFieldVal('ProductNumber'); }
            set ProductNumber(v: string) { this._setFieldVal('ProductNumber', v); }
            get Color() { return <string>this._getFieldVal('Color'); }
            set Color(v: string) { this._setFieldVal('Color', v); }
            get StandardCost() { return <number>this._getFieldVal('StandardCost'); }
            set StandardCost(v: number) { this._setFieldVal('StandardCost', v); }
            get ListPrice() { return <number>this._getFieldVal('ListPrice'); }
            set ListPrice(v: number) { this._setFieldVal('ListPrice', v); }
            get Size() { return <string>this._getFieldVal('Size'); }
            set Size(v: string) { this._setFieldVal('Size', v); }
            get Weight() { return <number>this._getFieldVal('Weight'); }
            set Weight(v: number) { this._setFieldVal('Weight', v); }
            get ProductCategoryID() { return <number>this._getFieldVal('ProductCategoryID'); }
            set ProductCategoryID(v: number) { this._setFieldVal('ProductCategoryID', v); }
            get ProductModelID() { return <number>this._getFieldVal('ProductModelID'); }
            set ProductModelID(v: number) { this._setFieldVal('ProductModelID', v); }
            get SellStartDate() { return <Date>this._getFieldVal('SellStartDate'); }
            set SellStartDate(v: Date) { this._setFieldVal('SellStartDate', v); }
            get SellEndDate() { return <Date>this._getFieldVal('SellEndDate'); }
            set SellEndDate(v: Date) { this._setFieldVal('SellEndDate', v); }
            get DiscontinuedDate() { return <Date>this._getFieldVal('DiscontinuedDate'); }
            set DiscontinuedDate(v: Date) { this._setFieldVal('DiscontinuedDate', v); }
            get rowguid() { return <string>this._getFieldVal('rowguid'); }
            get ModifiedDate() { return <Date>this._getFieldVal('ModifiedDate'); }
            get IsActive() { return <boolean>this._dbSet._calcfldMap['IsActive'].getFunc.call(this); }
            get ThumbnailPhotoFileName() { return <string>this._getFieldVal('ThumbnailPhotoFileName'); }
            set ThumbnailPhotoFileName(v: string) { this._setFieldVal('ThumbnailPhotoFileName', v); }
            get SalesOrderDetails() { return <SalesOrderDetail[]>this._dbSet._navfldMap['SalesOrderDetails'].getFunc.call(this); }

            getDbContext() {
                return <DbContext>super.getDbContext();
            }
            getDbSet() {
                return <RIAPP.MOD.db.DbSet<Product>>super.getDbSet();
            }
            get _dbSet() { return this.getDbSet(); }
            toString() {
                return 'Product';
            }
            asEntity() { return this; }
            asInterface() { return <IProduct>this; }
        }

        export class ProductDb extends RIAPP.MOD.db.DbSet<Product>
        {
            constructor(dbContext: DbContext) {
                var self = this, opts: RIAPP.MOD.db.IDbSetConstuctorOptions = {
                    dbContext: dbContext,
                    dbSetInfo: { "dbSetName": "Product", "enablePaging": true, "fieldInfos": [{ "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "ProductID", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 1, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 4, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "Name", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": false, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 50, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "ProductNumber", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": false, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 25, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "Color", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": false, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 15, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 4, "dateConversion": 0, "dependentOn": "", "fieldName": "StandardCost", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": false, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 8, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 4, "dateConversion": 0, "dependentOn": "", "fieldName": "ListPrice", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": false, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 8, "range": "100,5000", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "Size", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": false, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 5, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 4, "dateConversion": 0, "dependentOn": "", "fieldName": "Weight", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": false, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 5, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "ProductCategoryID", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": false, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 4, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "ProductModelID", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": false, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 4, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 7, "dateConversion": 0, "dependentOn": "", "fieldName": "SellStartDate", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 8, "range": "2000-01-01,2015-01-01", "regex": "" }, { "allowClientDefault": false, "dataType": 7, "dateConversion": 0, "dependentOn": "", "fieldName": "SellEndDate", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 8, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 7, "dateConversion": 0, "dependentOn": "", "fieldName": "DiscontinuedDate", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": false, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 8, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 9, "dateConversion": 0, "dependentOn": "", "fieldName": "rowguid", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": true, "maxLength": 16, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 6, "dateConversion": 0, "dependentOn": "", "fieldName": "ModifiedDate", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 8, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 2, "dateConversion": 0, "dependentOn": "SellEndDate", "fieldName": "IsActive", "isAutoGenerated": false, "isCalculated": true, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": -1, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "ThumbnailPhotoFileName", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": false, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 256, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 0, "dateConversion": 0, "dependentOn": "", "fieldName": "SalesOrderDetails", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": true, "isNavigation": true, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": -1, "range": "", "regex": "" }], "pageSize": 25 },
                    childAssoc: [],
                    parentAssoc: [{ "childDbSetName": "SalesOrderDetail", "childToParentName": "Product", "fieldRels": [{ "childField": "ProductID", "parentField": "ProductID" }], "name": "OrdDetailsToProduct", "onDeleteAction": 0, "parentDbSetName": "Product", "parentToChildrenName": "SalesOrderDetails" }]
                }, utils = RIAPP.global.utils;
                super(opts);
                self._entityType = Product;

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    f.dependents = [];
                    self._fieldMap[f.fieldName] = f;
                });

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    if (!!f.isNavigation) {
                        self._navfldMap[f.fieldName] = self._doNavigationField(opts, f);
                    }
                    else if (!!f.isCalculated) {
                        self._calcfldMap[f.fieldName] = self._doCalculatedField(opts, f);
                    }
                });

                self._mapAssocFields();
            }
            createReadProductQuery(args?: {
                param1: number[];
                param2: string;
            }) {
                var query = this.createQuery('ReadProduct');
                query.params = args;
                return query;
            }
            createReadProductByIdsQuery(args?: {
                productIDs: number[];
            }) {
                var query = this.createQuery('ReadProductByIds');
                query.params = args;
                return query;
            }

            defineIsActiveField(getFunc: () => boolean) { this.defineCalculatedField('IsActive', getFunc); }

            get items2() { return <IProduct[]><any>this.items; }
        }

        export interface IProductModel extends RIAPP.MOD.utils.IEditable, RIAPP.MOD.utils.ISubmittable {
            ProductModelID: number;
            Name: string;

            getDbContext(): DbContext;
            getDbSet(): RIAPP.MOD.db.DbSet<ProductModel>;
            _dbSet: RIAPP.MOD.db.DbSet<ProductModel>;
            asEntity(): ProductModel;
        }

        export class ProductModel extends RIAPP.MOD.db.Entity implements IProductModel {
            get ProductModelID() { return <number>this._getFieldVal('ProductModelID'); }
            get Name() { return <string>this._getFieldVal('Name'); }
            set Name(v: string) { this._setFieldVal('Name', v); }

            getDbContext() {
                return <DbContext>super.getDbContext();
            }
            getDbSet() {
                return <RIAPP.MOD.db.DbSet<ProductModel>>super.getDbSet();
            }
            get _dbSet() { return this.getDbSet(); }
            toString() {
                return 'ProductModel';
            }
            asEntity() { return this; }
            asInterface() { return <IProductModel>this; }
        }

        export class ProductModelDb extends RIAPP.MOD.db.DbSet<ProductModel>
        {
            constructor(dbContext: DbContext) {
                var self = this, opts: RIAPP.MOD.db.IDbSetConstuctorOptions = {
                    dbContext: dbContext,
                    dbSetInfo: { "dbSetName": "ProductModel", "enablePaging": false, "fieldInfos": [{ "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "ProductModelID", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 1, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 4, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "Name", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 50, "range": "", "regex": "" }], "pageSize": 25 },
                    childAssoc: [],
                    parentAssoc: []
                }, utils = RIAPP.global.utils;
                super(opts);
                self._entityType = ProductModel;

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    f.dependents = [];
                    self._fieldMap[f.fieldName] = f;
                });

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    if (!!f.isNavigation) {
                        self._navfldMap[f.fieldName] = self._doNavigationField(opts, f);
                    }
                    else if (!!f.isCalculated) {
                        self._calcfldMap[f.fieldName] = self._doCalculatedField(opts, f);
                    }
                });

                self._mapAssocFields();
            }
            createReadProductModelQuery() {
                return this.createQuery('ReadProductModel');
            }


            get items2() { return <IProductModel[]><any>this.items; }
        }

        export interface ISalesOrderHeader extends RIAPP.MOD.utils.IEditable, RIAPP.MOD.utils.ISubmittable {
            SalesOrderID: number;
            RevisionNumber: number;
            OrderDate: Date;
            DueDate: Date;
            ShipDate: Date;
            Status: number;
            OnlineOrderFlag: boolean;
            SalesOrderNumber: string;
            PurchaseOrderNumber: string;
            AccountNumber: string;
            CustomerID: number;
            ShipToAddressID: number;
            BillToAddressID: number;
            ShipMethod: string;
            CreditCardApprovalCode: string;
            SubTotal: number;
            TaxAmt: number;
            Freight: number;
            TotalDue: number;
            Comment: string;
            rowguid: string;
            ModifiedDate: Date;
            SalesOrderDetails: SalesOrderDetail[];
            Customer: Customer;
            Address: Address;
            Address1: Address;

            getDbContext(): DbContext;
            getDbSet(): RIAPP.MOD.db.DbSet<SalesOrderHeader>;
            _dbSet: RIAPP.MOD.db.DbSet<SalesOrderHeader>;
            asEntity(): SalesOrderHeader;
        }

        export class SalesOrderHeader extends RIAPP.MOD.db.Entity implements ISalesOrderHeader {
            get SalesOrderID() { return <number>this._getFieldVal('SalesOrderID'); }
            get RevisionNumber() { return <number>this._getFieldVal('RevisionNumber'); }
            get OrderDate() { return <Date>this._getFieldVal('OrderDate'); }
            set OrderDate(v: Date) { this._setFieldVal('OrderDate', v); }
            get DueDate() { return <Date>this._getFieldVal('DueDate'); }
            set DueDate(v: Date) { this._setFieldVal('DueDate', v); }
            get ShipDate() { return <Date>this._getFieldVal('ShipDate'); }
            set ShipDate(v: Date) { this._setFieldVal('ShipDate', v); }
            get Status() { return <number>this._getFieldVal('Status'); }
            get OnlineOrderFlag() { return <boolean>this._getFieldVal('OnlineOrderFlag'); }
            set OnlineOrderFlag(v: boolean) { this._setFieldVal('OnlineOrderFlag', v); }
            get SalesOrderNumber() { return <string>this._getFieldVal('SalesOrderNumber'); }
            get PurchaseOrderNumber() { return <string>this._getFieldVal('PurchaseOrderNumber'); }
            get AccountNumber() { return <string>this._getFieldVal('AccountNumber'); }
            set AccountNumber(v: string) { this._setFieldVal('AccountNumber', v); }
            get CustomerID() { return <number>this._getFieldVal('CustomerID'); }
            set CustomerID(v: number) { this._setFieldVal('CustomerID', v); }
            get ShipToAddressID() { return <number>this._getFieldVal('ShipToAddressID'); }
            set ShipToAddressID(v: number) { this._setFieldVal('ShipToAddressID', v); }
            get BillToAddressID() { return <number>this._getFieldVal('BillToAddressID'); }
            set BillToAddressID(v: number) { this._setFieldVal('BillToAddressID', v); }
            get ShipMethod() { return <string>this._getFieldVal('ShipMethod'); }
            set ShipMethod(v: string) { this._setFieldVal('ShipMethod', v); }
            get CreditCardApprovalCode() { return <string>this._getFieldVal('CreditCardApprovalCode'); }
            set CreditCardApprovalCode(v: string) { this._setFieldVal('CreditCardApprovalCode', v); }
            get SubTotal() { return <number>this._getFieldVal('SubTotal'); }
            get TaxAmt() { return <number>this._getFieldVal('TaxAmt'); }
            get Freight() { return <number>this._getFieldVal('Freight'); }
            get TotalDue() { return <number>this._getFieldVal('TotalDue'); }
            get Comment() { return <string>this._getFieldVal('Comment'); }
            set Comment(v: string) { this._setFieldVal('Comment', v); }
            get rowguid() { return <string>this._getFieldVal('rowguid'); }
            get ModifiedDate() { return <Date>this._getFieldVal('ModifiedDate'); }
            get SalesOrderDetails() { return <SalesOrderDetail[]>this._dbSet._navfldMap['SalesOrderDetails'].getFunc.call(this); }
            get Customer() { return <Customer>this._dbSet._navfldMap['Customer'].getFunc.call(this); }
            set Customer(v: Customer) { this._dbSet._navfldMap['Customer'].setFunc.call(this, v); }
            get Address() { return <Address>this._dbSet._navfldMap['Address'].getFunc.call(this); }
            set Address(v: Address) { this._dbSet._navfldMap['Address'].setFunc.call(this, v); }
            get Address1() { return <Address>this._dbSet._navfldMap['Address1'].getFunc.call(this); }
            set Address1(v: Address) { this._dbSet._navfldMap['Address1'].setFunc.call(this, v); }

            getDbContext() {
                return <DbContext>super.getDbContext();
            }
            getDbSet() {
                return <RIAPP.MOD.db.DbSet<SalesOrderHeader>>super.getDbSet();
            }
            get _dbSet() { return this.getDbSet(); }
            toString() {
                return 'SalesOrderHeader';
            }
            asEntity() { return this; }
            asInterface() { return <ISalesOrderHeader>this; }
        }

        export class SalesOrderHeaderDb extends RIAPP.MOD.db.DbSet<SalesOrderHeader>
        {
            constructor(dbContext: DbContext) {
                var self = this, opts: RIAPP.MOD.db.IDbSetConstuctorOptions = {
                    dbContext: dbContext,
                    dbSetInfo: { "dbSetName": "SalesOrderHeader", "enablePaging": false, "fieldInfos": [{ "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "SalesOrderID", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 1, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 4, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "RevisionNumber", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 1, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 7, "dateConversion": 0, "dependentOn": "", "fieldName": "OrderDate", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 8, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 7, "dateConversion": 0, "dependentOn": "", "fieldName": "DueDate", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 8, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 7, "dateConversion": 0, "dependentOn": "", "fieldName": "ShipDate", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 8, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "Status", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 1, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 2, "dateConversion": 0, "dependentOn": "", "fieldName": "OnlineOrderFlag", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 1, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "SalesOrderNumber", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 25, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "PurchaseOrderNumber", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 25, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "AccountNumber", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 15, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "CustomerID", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 4, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "ShipToAddressID", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 4, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "BillToAddressID", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 4, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "ShipMethod", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 50, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "CreditCardApprovalCode", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 15, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 4, "dateConversion": 0, "dependentOn": "", "fieldName": "SubTotal", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 8, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 4, "dateConversion": 0, "dependentOn": "", "fieldName": "TaxAmt", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 8, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 4, "dateConversion": 0, "dependentOn": "", "fieldName": "Freight", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 8, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 4, "dateConversion": 0, "dependentOn": "", "fieldName": "TotalDue", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 8, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "Comment", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 0, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 9, "dateConversion": 0, "dependentOn": "", "fieldName": "rowguid", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 16, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 6, "dateConversion": 0, "dependentOn": "", "fieldName": "ModifiedDate", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 8, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 0, "dateConversion": 0, "dependentOn": "", "fieldName": "SalesOrderDetails", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": true, "isNavigation": true, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": -1, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 0, "dateConversion": 0, "dependentOn": "CustomerID", "fieldName": "Customer", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": true, "isNavigation": true, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": -1, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 0, "dateConversion": 0, "dependentOn": "ShipToAddressID", "fieldName": "Address", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": true, "isNavigation": true, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": -1, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 0, "dateConversion": 0, "dependentOn": "BillToAddressID", "fieldName": "Address1", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": true, "isNavigation": true, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": -1, "range": "", "regex": "" }], "pageSize": 25 },
                    childAssoc: [{ "childDbSetName": "SalesOrderHeader", "childToParentName": "Customer", "fieldRels": [{ "childField": "CustomerID", "parentField": "CustomerID" }], "name": "OrdersToCustomer", "onDeleteAction": 0, "parentDbSetName": "Customer", "parentToChildrenName": null }, { "childDbSetName": "SalesOrderHeader", "childToParentName": "Address", "fieldRels": [{ "childField": "ShipToAddressID", "parentField": "AddressID" }], "name": "OrdersToShipAddr", "onDeleteAction": 0, "parentDbSetName": "Address", "parentToChildrenName": null }, { "childDbSetName": "SalesOrderHeader", "childToParentName": "Address1", "fieldRels": [{ "childField": "BillToAddressID", "parentField": "AddressID" }], "name": "OrdersToBillAddr", "onDeleteAction": 0, "parentDbSetName": "Address", "parentToChildrenName": null }],
                    parentAssoc: [{ "childDbSetName": "SalesOrderDetail", "childToParentName": "SalesOrderHeader", "fieldRels": [{ "childField": "SalesOrderID", "parentField": "SalesOrderID" }], "name": "OrdDetailsToOrder", "onDeleteAction": 1, "parentDbSetName": "SalesOrderHeader", "parentToChildrenName": "SalesOrderDetails" }]
                }, utils = RIAPP.global.utils;
                super(opts);
                self._entityType = SalesOrderHeader;

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    f.dependents = [];
                    self._fieldMap[f.fieldName] = f;
                });

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    if (!!f.isNavigation) {
                        self._navfldMap[f.fieldName] = self._doNavigationField(opts, f);
                    }
                    else if (!!f.isCalculated) {
                        self._calcfldMap[f.fieldName] = self._doCalculatedField(opts, f);
                    }
                });

                self._mapAssocFields();
            }
            createReadSalesOrderHeaderQuery() {
                return this.createQuery('ReadSalesOrderHeader');
            }


            get items2() { return <ISalesOrderHeader[]><any>this.items; }
        }

        export interface ISalesOrderDetail extends RIAPP.MOD.utils.IEditable, RIAPP.MOD.utils.ISubmittable {
            SalesOrderID: number;
            SalesOrderDetailID: number;
            OrderQty: number;
            ProductID: number;
            UnitPrice: number;
            UnitPriceDiscount: number;
            LineTotal: number;
            rowguid: string;
            ModifiedDate: Date;
            SalesOrderHeader: SalesOrderHeader;
            Product: Product;

            getDbContext(): DbContext;
            getDbSet(): RIAPP.MOD.db.DbSet<SalesOrderDetail>;
            _dbSet: RIAPP.MOD.db.DbSet<SalesOrderDetail>;
            asEntity(): SalesOrderDetail;
        }

        export class SalesOrderDetail extends RIAPP.MOD.db.Entity implements ISalesOrderDetail {
            get SalesOrderID() { return <number>this._getFieldVal('SalesOrderID'); }
            set SalesOrderID(v: number) { this._setFieldVal('SalesOrderID', v); }
            get SalesOrderDetailID() { return <number>this._getFieldVal('SalesOrderDetailID'); }
            get OrderQty() { return <number>this._getFieldVal('OrderQty'); }
            set OrderQty(v: number) { this._setFieldVal('OrderQty', v); }
            get ProductID() { return <number>this._getFieldVal('ProductID'); }
            set ProductID(v: number) { this._setFieldVal('ProductID', v); }
            get UnitPrice() { return <number>this._getFieldVal('UnitPrice'); }
            get UnitPriceDiscount() { return <number>this._getFieldVal('UnitPriceDiscount'); }
            get LineTotal() { return <number>this._getFieldVal('LineTotal'); }
            get rowguid() { return <string>this._getFieldVal('rowguid'); }
            get ModifiedDate() { return <Date>this._getFieldVal('ModifiedDate'); }
            get SalesOrderHeader() { return <SalesOrderHeader>this._dbSet._navfldMap['SalesOrderHeader'].getFunc.call(this); }
            set SalesOrderHeader(v: SalesOrderHeader) { this._dbSet._navfldMap['SalesOrderHeader'].setFunc.call(this, v); }
            get Product() { return <Product>this._dbSet._navfldMap['Product'].getFunc.call(this); }
            set Product(v: Product) { this._dbSet._navfldMap['Product'].setFunc.call(this, v); }

            getDbContext() {
                return <DbContext>super.getDbContext();
            }
            getDbSet() {
                return <RIAPP.MOD.db.DbSet<SalesOrderDetail>>super.getDbSet();
            }
            get _dbSet() { return this.getDbSet(); }
            toString() {
                return 'SalesOrderDetail';
            }
            asEntity() { return this; }
            asInterface() { return <ISalesOrderDetail>this; }
        }

        export class SalesOrderDetailDb extends RIAPP.MOD.db.DbSet<SalesOrderDetail>
        {
            constructor(dbContext: DbContext) {
                var self = this, opts: RIAPP.MOD.db.IDbSetConstuctorOptions = {
                    dbContext: dbContext,
                    dbSetInfo: { "dbSetName": "SalesOrderDetail", "enablePaging": false, "fieldInfos": [{ "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "SalesOrderID", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 1, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 4, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "SalesOrderDetailID", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 2, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 4, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "OrderQty", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 2, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "ProductID", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 4, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 4, "dateConversion": 0, "dependentOn": "", "fieldName": "UnitPrice", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 8, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 4, "dateConversion": 0, "dependentOn": "", "fieldName": "UnitPriceDiscount", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 8, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 4, "dateConversion": 0, "dependentOn": "", "fieldName": "LineTotal", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 17, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 9, "dateConversion": 0, "dependentOn": "", "fieldName": "rowguid", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 16, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 6, "dateConversion": 0, "dependentOn": "", "fieldName": "ModifiedDate", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 8, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 0, "dateConversion": 0, "dependentOn": "SalesOrderID", "fieldName": "SalesOrderHeader", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": true, "isNavigation": true, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": -1, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 0, "dateConversion": 0, "dependentOn": "ProductID", "fieldName": "Product", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": true, "isNavigation": true, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": -1, "range": "", "regex": "" }], "pageSize": 25 },
                    childAssoc: [{ "childDbSetName": "SalesOrderDetail", "childToParentName": "SalesOrderHeader", "fieldRels": [{ "childField": "SalesOrderID", "parentField": "SalesOrderID" }], "name": "OrdDetailsToOrder", "onDeleteAction": 1, "parentDbSetName": "SalesOrderHeader", "parentToChildrenName": "SalesOrderDetails" }, { "childDbSetName": "SalesOrderDetail", "childToParentName": "Product", "fieldRels": [{ "childField": "ProductID", "parentField": "ProductID" }], "name": "OrdDetailsToProduct", "onDeleteAction": 0, "parentDbSetName": "Product", "parentToChildrenName": "SalesOrderDetails" }],
                    parentAssoc: []
                }, utils = RIAPP.global.utils;
                super(opts);
                self._entityType = SalesOrderDetail;

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    f.dependents = [];
                    self._fieldMap[f.fieldName] = f;
                });

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    if (!!f.isNavigation) {
                        self._navfldMap[f.fieldName] = self._doNavigationField(opts, f);
                    }
                    else if (!!f.isCalculated) {
                        self._calcfldMap[f.fieldName] = self._doCalculatedField(opts, f);
                    }
                });

                self._mapAssocFields();
            }
            createReadSalesOrderDetailQuery() {
                return this.createQuery('ReadSalesOrderDetail');
            }


            get items2() { return <ISalesOrderDetail[]><any>this.items; }
        }

        export interface IProductCategory extends RIAPP.MOD.utils.IEditable, RIAPP.MOD.utils.ISubmittable {
            ProductCategoryID: number;
            ParentProductCategoryID: number;
            Name: string;
            rowguid: string;
            ModifiedDate: Date;

            getDbContext(): DbContext;
            getDbSet(): RIAPP.MOD.db.DbSet<ProductCategory>;
            _dbSet: RIAPP.MOD.db.DbSet<ProductCategory>;
            asEntity(): ProductCategory;
        }

        export class ProductCategory extends RIAPP.MOD.db.Entity implements IProductCategory {
            get ProductCategoryID() { return <number>this._getFieldVal('ProductCategoryID'); }
            get ParentProductCategoryID() { return <number>this._getFieldVal('ParentProductCategoryID'); }
            set ParentProductCategoryID(v: number) { this._setFieldVal('ParentProductCategoryID', v); }
            get Name() { return <string>this._getFieldVal('Name'); }
            set Name(v: string) { this._setFieldVal('Name', v); }
            get rowguid() { return <string>this._getFieldVal('rowguid'); }
            set rowguid(v: string) { this._setFieldVal('rowguid', v); }
            get ModifiedDate() { return <Date>this._getFieldVal('ModifiedDate'); }
            set ModifiedDate(v: Date) { this._setFieldVal('ModifiedDate', v); }

            getDbContext() {
                return <DbContext>super.getDbContext();
            }
            getDbSet() {
                return <RIAPP.MOD.db.DbSet<ProductCategory>>super.getDbSet();
            }
            get _dbSet() { return this.getDbSet(); }
            toString() {
                return 'ProductCategory';
            }
            asEntity() { return this; }
            asInterface() { return <IProductCategory>this; }
        }

        export class ProductCategoryDb extends RIAPP.MOD.db.DbSet<ProductCategory>
        {
            constructor(dbContext: DbContext) {
                var self = this, opts: RIAPP.MOD.db.IDbSetConstuctorOptions = {
                    dbContext: dbContext,
                    dbSetInfo: { "dbSetName": "ProductCategory", "enablePaging": false, "fieldInfos": [{ "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "ProductCategoryID", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 1, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 4, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "ParentProductCategoryID", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 4, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "Name", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 50, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 9, "dateConversion": 0, "dependentOn": "", "fieldName": "rowguid", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": true, "maxLength": 16, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 6, "dateConversion": 0, "dependentOn": "", "fieldName": "ModifiedDate", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": 8, "range": "", "regex": "" }], "pageSize": 25 },
                    childAssoc: [],
                    parentAssoc: []
                }, utils = RIAPP.global.utils;
                super(opts);
                self._entityType = ProductCategory;

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    f.dependents = [];
                    self._fieldMap[f.fieldName] = f;
                });

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    if (!!f.isNavigation) {
                        self._navfldMap[f.fieldName] = self._doNavigationField(opts, f);
                    }
                    else if (!!f.isCalculated) {
                        self._calcfldMap[f.fieldName] = self._doCalculatedField(opts, f);
                    }
                });

                self._mapAssocFields();
            }
            createReadProductCategoryQuery() {
                return this.createQuery('ReadProductCategory');
            }


            get items2() { return <IProductCategory[]><any>this.items; }
        }

        export interface ISalesInfo extends RIAPP.MOD.utils.IEditable, RIAPP.MOD.utils.ISubmittable {
            SalesPerson: string;

            getDbContext(): DbContext;
            getDbSet(): RIAPP.MOD.db.DbSet<SalesInfo>;
            _dbSet: RIAPP.MOD.db.DbSet<SalesInfo>;
            asEntity(): SalesInfo;
        }

        export class SalesInfo extends RIAPP.MOD.db.Entity implements ISalesInfo {
            get SalesPerson() { return <string>this._getFieldVal('SalesPerson'); }
            set SalesPerson(v: string) { this._setFieldVal('SalesPerson', v); }

            getDbContext() {
                return <DbContext>super.getDbContext();
            }
            getDbSet() {
                return <RIAPP.MOD.db.DbSet<SalesInfo>>super.getDbSet();
            }
            get _dbSet() { return this.getDbSet(); }
            toString() {
                return 'SalesInfo';
            }
            asEntity() { return this; }
            asInterface() { return <ISalesInfo>this; }
        }

        export class SalesInfoDb extends RIAPP.MOD.db.DbSet<SalesInfo>
        {
            constructor(dbContext: DbContext) {
                var self = this, opts: RIAPP.MOD.db.IDbSetConstuctorOptions = {
                    dbContext: dbContext,
                    dbSetInfo: { "dbSetName": "SalesInfo", "enablePaging": true, "fieldInfos": [{ "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "SalesPerson", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 1, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": -1, "range": "", "regex": "" }], "pageSize": 25 },
                    childAssoc: [],
                    parentAssoc: []
                }, utils = RIAPP.global.utils;
                super(opts);
                self._entityType = SalesInfo;

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    f.dependents = [];
                    self._fieldMap[f.fieldName] = f;
                });

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    if (!!f.isNavigation) {
                        self._navfldMap[f.fieldName] = self._doNavigationField(opts, f);
                    }
                    else if (!!f.isCalculated) {
                        self._calcfldMap[f.fieldName] = self._doCalculatedField(opts, f);
                    }
                });

                self._mapAssocFields();
            }
            createReadSalesInfoQuery() {
                return this.createQuery('ReadSalesInfo');
            }


            get items2() { return <ISalesInfo[]><any>this.items; }
        }

        export interface ILookUpProduct extends RIAPP.MOD.utils.IEditable, RIAPP.MOD.utils.ISubmittable {
            ProductID: number;
            Name: string;

            getDbContext(): DbContext;
            getDbSet(): RIAPP.MOD.db.DbSet<LookUpProduct>;
            _dbSet: RIAPP.MOD.db.DbSet<LookUpProduct>;
            asEntity(): LookUpProduct;
        }

        export class LookUpProduct extends RIAPP.MOD.db.Entity implements ILookUpProduct {
            get ProductID() { return <number>this._getFieldVal('ProductID'); }
            set ProductID(v: number) { this._setFieldVal('ProductID', v); }
            get Name() { return <string>this._getFieldVal('Name'); }
            set Name(v: string) { this._setFieldVal('Name', v); }

            getDbContext() {
                return <DbContext>super.getDbContext();
            }
            getDbSet() {
                return <RIAPP.MOD.db.DbSet<LookUpProduct>>super.getDbSet();
            }
            get _dbSet() { return this.getDbSet(); }
            toString() {
                return 'LookUpProduct';
            }
            asEntity() { return this; }
            asInterface() { return <ILookUpProduct>this; }
        }

        export class LookUpProductDb extends RIAPP.MOD.db.DbSet<LookUpProduct>
        {
            constructor(dbContext: DbContext) {
                var self = this, opts: RIAPP.MOD.db.IDbSetConstuctorOptions = {
                    dbContext: dbContext,
                    dbSetInfo: { "dbSetName": "LookUpProduct", "enablePaging": true, "fieldInfos": [{ "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "ProductID", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 1, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": -1, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "Name", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": -1, "range": "", "regex": "" }], "pageSize": 25 },
                    childAssoc: [],
                    parentAssoc: []
                }, utils = RIAPP.global.utils;
                super(opts);
                self._entityType = LookUpProduct;

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    f.dependents = [];
                    self._fieldMap[f.fieldName] = f;
                });

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    if (!!f.isNavigation) {
                        self._navfldMap[f.fieldName] = self._doNavigationField(opts, f);
                    }
                    else if (!!f.isCalculated) {
                        self._calcfldMap[f.fieldName] = self._doCalculatedField(opts, f);
                    }
                });

                self._mapAssocFields();
            }
            createReadProductLookUpQuery() {
                return this.createQuery('ReadProductLookUp');
            }


            get items2() { return <ILookUpProduct[]><any>this.items; }
        }

        export interface IAddressInfo extends RIAPP.MOD.utils.IEditable, RIAPP.MOD.utils.ISubmittable {
            AddressID: number;
            AddressLine1: string;
            City: string;
            StateProvince: string;
            CountryRegion: string;
            CustomerAddresses: CustomerAddress[];

            getDbContext(): DbContext;
            getDbSet(): RIAPP.MOD.db.DbSet<AddressInfo>;
            _dbSet: RIAPP.MOD.db.DbSet<AddressInfo>;
            asEntity(): AddressInfo;
        }

        export class AddressInfo extends RIAPP.MOD.db.Entity implements IAddressInfo {
            get AddressID() { return <number>this._getFieldVal('AddressID'); }
            get AddressLine1() { return <string>this._getFieldVal('AddressLine1'); }
            get City() { return <string>this._getFieldVal('City'); }
            get StateProvince() { return <string>this._getFieldVal('StateProvince'); }
            get CountryRegion() { return <string>this._getFieldVal('CountryRegion'); }
            get CustomerAddresses() { return <CustomerAddress[]>this._dbSet._navfldMap['CustomerAddresses'].getFunc.call(this); }

            getDbContext() {
                return <DbContext>super.getDbContext();
            }
            getDbSet() {
                return <RIAPP.MOD.db.DbSet<AddressInfo>>super.getDbSet();
            }
            get _dbSet() { return this.getDbSet(); }
            toString() {
                return 'AddressInfo';
            }
            asEntity() { return this; }
            asInterface() { return <IAddressInfo>this; }
        }

        export class AddressInfoDb extends RIAPP.MOD.db.DbSet<AddressInfo>
        {
            constructor(dbContext: DbContext) {
                var self = this, opts: RIAPP.MOD.db.IDbSetConstuctorOptions = {
                    dbContext: dbContext,
                    dbSetInfo: { "dbSetName": "AddressInfo", "enablePaging": false, "fieldInfos": [{ "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": "", "fieldName": "AddressID", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 1, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 4, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "AddressLine1", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 200, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "City", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 30, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "StateProvince", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 50, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": "", "fieldName": "CountryRegion", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 50, "range": "", "regex": "" }, { "allowClientDefault": false, "dataType": 0, "dateConversion": 0, "dependentOn": "", "fieldName": "CustomerAddresses", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": true, "isNavigation": true, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": -1, "range": "", "regex": "" }], "pageSize": 25 },
                    childAssoc: [],
                    parentAssoc: [{ "childDbSetName": "CustomerAddress", "childToParentName": "AddressInfo", "fieldRels": [{ "childField": "AddressID", "parentField": "AddressID" }], "name": "CustAddrToAddress2", "onDeleteAction": 0, "parentDbSetName": "AddressInfo", "parentToChildrenName": "CustomerAddresses" }]
                }, utils = RIAPP.global.utils;
                super(opts);
                self._entityType = AddressInfo;

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    f.dependents = [];
                    self._fieldMap[f.fieldName] = f;
                });

                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    if (!!f.isNavigation) {
                        self._navfldMap[f.fieldName] = self._doNavigationField(opts, f);
                    }
                    else if (!!f.isCalculated) {
                        self._calcfldMap[f.fieldName] = self._doCalculatedField(opts, f);
                    }
                });

                self._mapAssocFields();
            }
            createReadAddressInfoQuery() {
                return this.createQuery('ReadAddressInfo');
            }


            get items2() { return <IAddressInfo[]><any>this.items; }
        }

        export interface IAssocs {
            getCustAddrToCustomer: () => MOD.db.Association;
            getCustAddrToAddress: () => MOD.db.Association;
            getCustAddrToAddress2: () => MOD.db.Association;
            getOrdDetailsToOrder: () => MOD.db.Association;
            getOrdDetailsToProduct: () => MOD.db.Association;
            getOrdersToCustomer: () => MOD.db.Association;
            getOrdersToShipAddr: () => MOD.db.Association;
            getOrdersToBillAddr: () => MOD.db.Association;
        }


        export class DbSets extends RIAPP.MOD.db.DbSets {
            constructor(dbContext: DbContext) {
                super(dbContext);
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
            get Customer() { return <CustomerDb>this.getDbSet("Customer"); }
            get CustomerAddress() { return <CustomerAddressDb>this.getDbSet("CustomerAddress"); }
            get Address() { return <AddressDb>this.getDbSet("Address"); }
            get Product() { return <ProductDb>this.getDbSet("Product"); }
            get ProductModel() { return <ProductModelDb>this.getDbSet("ProductModel"); }
            get SalesOrderHeader() { return <SalesOrderHeaderDb>this.getDbSet("SalesOrderHeader"); }
            get SalesOrderDetail() { return <SalesOrderDetailDb>this.getDbSet("SalesOrderDetail"); }
            get ProductCategory() { return <ProductCategoryDb>this.getDbSet("ProductCategory"); }
            get SalesInfo() { return <SalesInfoDb>this.getDbSet("SalesInfo"); }
            get LookUpProduct() { return <LookUpProductDb>this.getDbSet("LookUpProduct"); }
            get AddressInfo() { return <AddressInfoDb>this.getDbSet("AddressInfo"); }

        }

        export class DbContext extends RIAPP.MOD.db.DbContext {
            _initDbSets() {
                super._initDbSets();
                this._dbSets = new DbSets(this);
                var associations = [{ "childDbSetName": "CustomerAddress", "childToParentName": "Customer", "fieldRels": [{ "childField": "CustomerID", "parentField": "CustomerID" }], "name": "CustAddrToCustomer", "onDeleteAction": 0, "parentDbSetName": "Customer", "parentToChildrenName": "CustomerAddresses" }, { "childDbSetName": "CustomerAddress", "childToParentName": "Address", "fieldRels": [{ "childField": "AddressID", "parentField": "AddressID" }], "name": "CustAddrToAddress", "onDeleteAction": 0, "parentDbSetName": "Address", "parentToChildrenName": "CustomerAddresses" }, { "childDbSetName": "CustomerAddress", "childToParentName": "AddressInfo", "fieldRels": [{ "childField": "AddressID", "parentField": "AddressID" }], "name": "CustAddrToAddress2", "onDeleteAction": 0, "parentDbSetName": "AddressInfo", "parentToChildrenName": "CustomerAddresses" }, { "childDbSetName": "SalesOrderDetail", "childToParentName": "SalesOrderHeader", "fieldRels": [{ "childField": "SalesOrderID", "parentField": "SalesOrderID" }], "name": "OrdDetailsToOrder", "onDeleteAction": 1, "parentDbSetName": "SalesOrderHeader", "parentToChildrenName": "SalesOrderDetails" }, { "childDbSetName": "SalesOrderDetail", "childToParentName": "Product", "fieldRels": [{ "childField": "ProductID", "parentField": "ProductID" }], "name": "OrdDetailsToProduct", "onDeleteAction": 0, "parentDbSetName": "Product", "parentToChildrenName": "SalesOrderDetails" }, { "childDbSetName": "SalesOrderHeader", "childToParentName": "Customer", "fieldRels": [{ "childField": "CustomerID", "parentField": "CustomerID" }], "name": "OrdersToCustomer", "onDeleteAction": 0, "parentDbSetName": "Customer", "parentToChildrenName": null }, { "childDbSetName": "SalesOrderHeader", "childToParentName": "Address", "fieldRels": [{ "childField": "ShipToAddressID", "parentField": "AddressID" }], "name": "OrdersToShipAddr", "onDeleteAction": 0, "parentDbSetName": "Address", "parentToChildrenName": null }, { "childDbSetName": "SalesOrderHeader", "childToParentName": "Address1", "fieldRels": [{ "childField": "BillToAddressID", "parentField": "AddressID" }], "name": "OrdersToBillAddr", "onDeleteAction": 0, "parentDbSetName": "Address", "parentToChildrenName": null }];
                this._initAssociations(associations);
                var methods = [{ "isQuery": true, "methodName": "ReadProductLookUp", "methodResult": true, "parameters": [] }, { "isQuery": true, "methodName": "ReadProduct", "methodResult": true, "parameters": [{ "dataType": 3, "dateConversion": 0, "isArray": true, "isNullable": false, "name": "param1", "ordinal": 1 }, { "dataType": 1, "dateConversion": 0, "isArray": false, "isNullable": false, "name": "param2", "ordinal": 2 }] }, { "isQuery": true, "methodName": "ReadProductByIds", "methodResult": true, "parameters": [{ "dataType": 3, "dateConversion": 0, "isArray": true, "isNullable": false, "name": "productIDs", "ordinal": 1 }] }, { "isQuery": true, "methodName": "ReadCustomer", "methodResult": true, "parameters": [{ "dataType": 2, "dateConversion": 0, "isArray": false, "isNullable": true, "name": "includeNav", "ordinal": 1 }] }, { "isQuery": true, "methodName": "ReadAddress", "methodResult": true, "parameters": [] }, { "isQuery": true, "methodName": "ReadAddressByIds", "methodResult": true, "parameters": [{ "dataType": 3, "dateConversion": 0, "isArray": true, "isNullable": false, "name": "addressIDs", "ordinal": 1 }] }, { "isQuery": true, "methodName": "ReadCustomerAddress", "methodResult": true, "parameters": [] }, { "isQuery": true, "methodName": "ReadAddressForCustomers", "methodResult": true, "parameters": [{ "dataType": 3, "dateConversion": 0, "isArray": true, "isNullable": false, "name": "custIDs", "ordinal": 1 }] }, { "isQuery": true, "methodName": "ReadSalesOrderHeader", "methodResult": true, "parameters": [] }, { "isQuery": true, "methodName": "ReadSalesOrderDetail", "methodResult": true, "parameters": [] }, { "isQuery": true, "methodName": "ReadProductCategory", "methodResult": true, "parameters": [] }, { "isQuery": true, "methodName": "ReadProductModel", "methodResult": true, "parameters": [] }, { "isQuery": true, "methodName": "ReadSalesInfo", "methodResult": true, "parameters": [] }, { "isQuery": true, "methodName": "ReadAddressInfo", "methodResult": true, "parameters": [] }, { "isQuery": false, "methodName": "TestInvoke", "methodResult": true, "parameters": [{ "dataType": 10, "dateConversion": 0, "isArray": false, "isNullable": false, "name": "param1", "ordinal": 0 }, { "dataType": 1, "dateConversion": 0, "isArray": false, "isNullable": false, "name": "param2", "ordinal": 1 }] }];
                this._initMethods(methods);
            }
            get associations() { return <IAssocs>this._assoc; }
            get dbSets() { return <DbSets>this._dbSets; }
            get serviceMethods() { return <ISvcMethods>this._svcMethods; }
        }
    }
}

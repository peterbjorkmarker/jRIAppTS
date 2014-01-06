/// <reference path="..\jriapp.d.ts"/>

module RIAPP
{
    'use strict';
    export module DEMODB {
        /*
            Generated from: /RiappDemoService/CodeGen on 2014-01-06 14:30 at 14:30
            Don't make manual changes here, because they will be lost when this db interface will be regenerated!
        */

        //******BEGIN INTERFACE REGION******
        export interface IAddressInfo2 {
            AddressID: number;
            AddressLine1: string;
            City: string;
            StateProvince: string;
            CountryRegion: string;
        }

        /*
            Generated from C# KeyVal model
        */
        export interface IKeyVal {
            key: number;
            val: string;
        }

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
        //******END INTERFACE REGION******

        export interface ISvcMethods {
            TestInvoke: (args: {
                param1: number[];
                param2: string;
            }) => IPromise<string>;
            TestComplexInvoke: (args: {
                info: IAddressInfo2;
                keys: IKeyVal[];
            }) => IVoidPromise;
        }

        //******BEGIN LISTS REGION******
        export class TestModelListItem extends RIAPP.MOD.collection.ListItem implements IClientTestModel {
            constructor(coll: RIAPP.MOD.collection.BaseList<TestModelListItem, IClientTestModel>, obj?: IClientTestModel) {
                super(coll, obj);
            }
            get Key(): string { return <string>this._getProp('Key'); }
            set Key(v: string) { this._setProp('Key', v); }
            get SomeProperty1(): string { return <string>this._getProp('SomeProperty1'); }
            set SomeProperty1(v: string) { this._setProp('SomeProperty1', v); }
            get SomeProperty2(): number[] { return <number[]>this._getProp('SomeProperty2'); }
            set SomeProperty2(v: number[]) { this._setProp('SomeProperty2', v); }
            get SomeProperty3(): string[] { return <string[]>this._getProp('SomeProperty3'); }
            set SomeProperty3(v: string[]) { this._setProp('SomeProperty3', v); }
            get MoreComplexProperty(): ITestLookUpProduct[] { return <ITestLookUpProduct[]>this._getProp('MoreComplexProperty'); }
            set MoreComplexProperty(v: ITestLookUpProduct[]) { this._setProp('MoreComplexProperty', v); }
            get EnumProperty(): TestEnum { return <TestEnum>this._getProp('EnumProperty'); }
            set EnumProperty(v: TestEnum) { this._setProp('EnumProperty', v); }
            asInterface() { return <IClientTestModel>this; }
        }

        export class TestDictionary extends RIAPP.MOD.collection.BaseDictionary<TestModelListItem, IClientTestModel> {
            constructor() {
                super(TestModelListItem, 'Key', [{ name: 'Key', dtype: 1 }, { name: 'SomeProperty1', dtype: 1 }, { name: 'SomeProperty2', dtype: 10 }, { name: 'SomeProperty3', dtype: 0 }, { name: 'MoreComplexProperty', dtype: 0 }, { name: 'EnumProperty', dtype: 0 }]);
                this._type_name = 'TestDictionary';
            }
            findItem(key: string): TestModelListItem {
                return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
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
            get key(): number { return <number>this._getProp('key'); }
            set key(v: number) { this._setProp('key', v); }
            get val(): string { return <string>this._getProp('val'); }
            set val(v: string) { this._setProp('val', v); }
            asInterface() { return <IKeyVal>this; }
        }

        export class KeyValDictionary extends RIAPP.MOD.collection.BaseDictionary<KeyValListItem, IKeyVal> {
            constructor() {
                super(KeyValListItem, 'key', [{ name: 'key', dtype: 3 }, { name: 'val', dtype: 1 }]);
                this._type_name = 'KeyValDictionary';
            }
            findItem(key: number): KeyValListItem {
                return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
            }
            get items2() { return <IKeyVal[]>this.items; }
        }

        export class HistoryItemListItem extends RIAPP.MOD.collection.ListItem implements IHistoryItem {
            constructor(coll: RIAPP.MOD.collection.BaseList<HistoryItemListItem, IHistoryItem>, obj?: IHistoryItem) {
                super(coll, obj);
            }
            get radioValue(): string { return <string>this._getProp('radioValue'); }
            set radioValue(v: string) { this._setProp('radioValue', v); }
            get time(): Date { return <Date>this._getProp('time'); }
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
        //******END LISTS REGION******

        //******BEGIN COMPLEX TYPES REGION*****
        export class Customer_ComplexProp1 extends RIAPP.MOD.db.ChildComplexProperty {

            constructor(name: string, parent: RIAPP.MOD.db.BaseComplexProperty) {
                super(name, parent);

            }
            get EmailAddress(): string { return this.getValue('ComplexProp.ComplexProp.EmailAddress'); }
            set EmailAddress(v: string) { this.setValue('ComplexProp.ComplexProp.EmailAddress', v); }
            get Phone(): string { return this.getValue('ComplexProp.ComplexProp.Phone'); }
            set Phone(v: string) { this.setValue('ComplexProp.ComplexProp.Phone', v); }

            toString() {
                return 'Customer_ComplexProp1';
            }
        }

        export class Customer_ComplexProp extends RIAPP.MOD.db.RootComplexProperty {
            private _ComplexProp: Customer_ComplexProp1;

            constructor(name: string, owner: RIAPP.MOD.db.Entity) {
                super(name, owner);
                this._ComplexProp = null;

            }
            get FirstName(): string { return this.getValue('ComplexProp.FirstName'); }
            set FirstName(v: string) { this.setValue('ComplexProp.FirstName', v); }
            get MiddleName(): string { return this.getValue('ComplexProp.MiddleName'); }
            set MiddleName(v: string) { this.setValue('ComplexProp.MiddleName', v); }
            get LastName(): string { return this.getValue('ComplexProp.LastName'); }
            set LastName(v: string) { this.setValue('ComplexProp.LastName', v); }
            get Name(): string { return this.getEntity()._getCalcFieldVal('ComplexProp.Name'); }
            get ComplexProp(): Customer_ComplexProp1 { if (!this._ComplexProp) { this._ComplexProp = new Customer_ComplexProp1('ComplexProp', this); } return this._ComplexProp; }

            toString() {
                return 'Customer_ComplexProp';
            }
        }
        //******END COMPLEX TYPES REGION******

        export interface ICustomerEntity extends RIAPP.MOD.utils.IEditable, RIAPP.MOD.utils.ISubmittable {
            CustomerID: number;
            NameStyle: boolean;
            Title: string;
            Suffix: string;
            CompanyName: string;
            SalesPerson: string;
            PasswordHash: string;
            PasswordSalt: string;
            rowguid: string;
            ModifiedDate: Date;
            ComplexProp: Customer_ComplexProp;
            CustomerAddresses: CustomerAddress[];

            getDbContext(): DbContext;
            getDbSet(): RIAPP.MOD.db.DbSet<Customer>;
            _dbSet: RIAPP.MOD.db.DbSet<Customer>;
            asEntity(): Customer;
        }

        export class Customer extends RIAPP.MOD.db.Entity implements ICustomerEntity {
            private _ComplexProp: Customer_ComplexProp;

            constructor(dbSet: CustomerDb, row: RIAPP.MOD.db.IRowData, names: RIAPP.MOD.db.IFieldName[]) {
                super(dbSet, row, names);
                this._ComplexProp = null;

            }
            get CustomerID(): number { return this._getFieldVal('CustomerID'); }
            get NameStyle(): boolean { return this._getFieldVal('NameStyle'); }
            set NameStyle(v: boolean) { this._setFieldVal('NameStyle', v); }
            get Title(): string { return this._getFieldVal('Title'); }
            set Title(v: string) { this._setFieldVal('Title', v); }
            get Suffix(): string { return this._getFieldVal('Suffix'); }
            set Suffix(v: string) { this._setFieldVal('Suffix', v); }
            get CompanyName(): string { return this._getFieldVal('CompanyName'); }
            set CompanyName(v: string) { this._setFieldVal('CompanyName', v); }
            get SalesPerson(): string { return this._getFieldVal('SalesPerson'); }
            set SalesPerson(v: string) { this._setFieldVal('SalesPerson', v); }
            get PasswordHash(): string { return this._getFieldVal('PasswordHash'); }
            get PasswordSalt(): string { return this._getFieldVal('PasswordSalt'); }
            get rowguid(): string { return this._getFieldVal('rowguid'); }
            get ModifiedDate(): Date { return this._getFieldVal('ModifiedDate'); }
            get ComplexProp(): Customer_ComplexProp { if (!this._ComplexProp) { this._ComplexProp = new Customer_ComplexProp('ComplexProp', this); } return this._ComplexProp; }
            get CustomerAddresses(): CustomerAddress[] { return this._getNavFieldVal('CustomerAddresses'); }

            getDbContext() {
                return <DbContext>super.getDbContext();
            }
            getDbSet() {
                return <RIAPP.MOD.db.DbSet<Customer>>super.getDbSet();
            }
            get _dbSet() { return this.getDbSet(); }
            toString() {
                return 'CustomerEntity';
            }
            asEntity() { return this; }
            asInterface() { return <ICustomerEntity>this; }
        }

        export class CustomerDb extends RIAPP.MOD.db.DbSet<Customer>
        {
            constructor(dbContext: DbContext) {
                var self = this, opts: RIAPP.MOD.db.IDbSetConstuctorOptions = {
                    dbContext: dbContext,
                    dbSetInfo: { "fieldInfos": [{ "fieldName": "CustomerID", "isPrimaryKey": 1, "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "NameStyle", "dataType": 2, "maxLength": 1, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "Title", "dataType": 1, "maxLength": 8, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "Suffix", "dataType": 1, "maxLength": 10, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "CompanyName", "dataType": 1, "maxLength": 128, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "SalesPerson", "dataType": 1, "maxLength": 256, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "PasswordHash", "dataType": 1, "maxLength": 128, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "PasswordSalt", "dataType": 1, "maxLength": 10, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "rowguid", "dataType": 9, "maxLength": 16, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isPrimaryKey": 0, "fieldType": 4, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "ModifiedDate", "dataType": 6, "maxLength": 8, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "ComplexProp", "dataType": 0, "maxLength": -1, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 5, "nested": [{ "fieldName": "FirstName", "dataType": 1, "maxLength": 50, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "MiddleName", "dataType": 1, "maxLength": 50, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "LastName", "dataType": 1, "maxLength": 50, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "Name", "dataType": 1, "maxLength": -1, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 2, "nested": null, "dependentOn": "ComplexProp.FirstName,ComplexProp.MiddleName,ComplexProp.LastName", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "ComplexProp", "dataType": 0, "maxLength": -1, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 5, "nested": [{ "fieldName": "EmailAddress", "dataType": 1, "maxLength": 50, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "^[_a-z0-9-]+(\\.[_a-z0-9-]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,4})$", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "Phone", "dataType": 1, "maxLength": 25, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }], "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }], "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "CustomerAddresses", "dataType": 0, "maxLength": -1, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 3, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }], "enablePaging": true, "pageSize": 25, "dbSetName": "Customer" },
                    childAssoc: [],
                    parentAssoc: [{ "name": "CustAddrToCustomer", "parentDbSetName": "Customer", "childDbSetName": "CustomerAddress", "childToParentName": "Customer", "parentToChildrenName": "CustomerAddresses", "onDeleteAction": 0, "fieldRels": [{ "parentField": "CustomerID", "childField": "CustomerID" }] }, { "name": "OrdersToCustomer", "parentDbSetName": "Customer", "childDbSetName": "SalesOrderHeader", "childToParentName": "Customer", "parentToChildrenName": null, "fieldRels": [{ "parentField": "CustomerID", "childField": "CustomerID" }], "onDeleteAction": 0 }]
                }, utils = RIAPP.global.utils;
                super(opts, Customer);
            }
            findEntity(customerID: number): Customer {
                return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
            }
            createReadCustomerQuery(args?: {
                includeNav?: boolean;
            }) {
                var query = this.createQuery('ReadCustomer');
                query.params = args;
                return query;
            }

            defineComplexProp_NameField(getFunc: () => string) { this._defineCalculatedField('ComplexProp.Name', getFunc); }

            get items2() { return <ICustomerEntity[]>this.items; }
        }

        export interface ICustomerAddressEntity extends RIAPP.MOD.utils.IEditable, RIAPP.MOD.utils.ISubmittable {
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

        export class CustomerAddress extends RIAPP.MOD.db.Entity implements ICustomerAddressEntity {

            constructor(dbSet: CustomerAddressDb, row: RIAPP.MOD.db.IRowData, names: RIAPP.MOD.db.IFieldName[]) {
                super(dbSet, row, names);

            }
            get CustomerID(): number { return this._getFieldVal('CustomerID'); }
            set CustomerID(v: number) { this._setFieldVal('CustomerID', v); }
            get AddressID(): number { return this._getFieldVal('AddressID'); }
            set AddressID(v: number) { this._setFieldVal('AddressID', v); }
            get AddressType(): string { return this._getFieldVal('AddressType'); }
            set AddressType(v: string) { this._setFieldVal('AddressType', v); }
            get rowguid(): string { return this._getFieldVal('rowguid'); }
            get ModifiedDate(): Date { return this._getFieldVal('ModifiedDate'); }
            get Customer(): Customer { return this._getNavFieldVal('Customer'); }
            set Customer(v: Customer) { this._setNavFieldVal('Customer', v); }
            get Address(): Address { return this._getNavFieldVal('Address'); }
            set Address(v: Address) { this._setNavFieldVal('Address', v); }
            get AddressInfo(): AddressInfo { return this._getNavFieldVal('AddressInfo'); }
            set AddressInfo(v: AddressInfo) { this._setNavFieldVal('AddressInfo', v); }

            getDbContext() {
                return <DbContext>super.getDbContext();
            }
            getDbSet() {
                return <RIAPP.MOD.db.DbSet<CustomerAddress>>super.getDbSet();
            }
            get _dbSet() { return this.getDbSet(); }
            toString() {
                return 'CustomerAddressEntity';
            }
            asEntity() { return this; }
            asInterface() { return <ICustomerAddressEntity>this; }
        }

        export class CustomerAddressDb extends RIAPP.MOD.db.DbSet<CustomerAddress>
        {
            constructor(dbContext: DbContext) {
                var self = this, opts: RIAPP.MOD.db.IDbSetConstuctorOptions = {
                    dbContext: dbContext,
                    dbSetInfo: { "dbSetName": "CustomerAddress", "enablePaging": false, "pageSize": 25, "fieldInfos": [{ "fieldName": "CustomerID", "dataType": 3, "maxLength": 4, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 1, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "AddressID", "dataType": 3, "maxLength": 4, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 2, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "AddressType", "dataType": 1, "maxLength": 50, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": false, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "rowguid", "dataType": 9, "maxLength": 16, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isPrimaryKey": 0, "fieldType": 4, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "ModifiedDate", "dataType": 6, "maxLength": 8, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": false, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "Customer", "dataType": 0, "maxLength": -1, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 3, "nested": null, "dependentOn": "CustomerID", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "Address", "dataType": 0, "maxLength": -1, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 3, "nested": null, "dependentOn": "AddressID", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "AddressInfo", "dataType": 0, "maxLength": -1, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 3, "nested": null, "dependentOn": "AddressID", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }] },
                    childAssoc: [{ "name": "CustAddrToCustomer", "parentDbSetName": "Customer", "childDbSetName": "CustomerAddress", "childToParentName": "Customer", "parentToChildrenName": "CustomerAddresses", "fieldRels": [{ "parentField": "CustomerID", "childField": "CustomerID" }], "onDeleteAction": 0 }, { "name": "CustAddrToAddress", "parentDbSetName": "Address", "childDbSetName": "CustomerAddress", "childToParentName": "Address", "parentToChildrenName": "CustomerAddresses", "fieldRels": [{ "parentField": "AddressID", "childField": "AddressID" }], "onDeleteAction": 0 }, { "name": "CustAddrToAddress2", "parentDbSetName": "AddressInfo", "childDbSetName": "CustomerAddress", "childToParentName": "AddressInfo", "parentToChildrenName": "CustomerAddresses", "fieldRels": [{ "parentField": "AddressID", "childField": "AddressID" }], "onDeleteAction": 0 }],
                    parentAssoc: []
                }, utils = RIAPP.global.utils;
                super(opts, CustomerAddress);
            }
            findEntity(customerID: number, addressID: number): CustomerAddress {
                return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
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


            get items2() { return <ICustomerAddressEntity[]>this.items; }
        }

        export interface IAddressEntity extends RIAPP.MOD.utils.IEditable, RIAPP.MOD.utils.ISubmittable {
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

        export class Address extends RIAPP.MOD.db.Entity implements IAddressEntity {

            constructor(dbSet: AddressDb, row: RIAPP.MOD.db.IRowData, names: RIAPP.MOD.db.IFieldName[]) {
                super(dbSet, row, names);

            }
            get AddressID(): number { return this._getFieldVal('AddressID'); }
            get AddressLine1(): string { return this._getFieldVal('AddressLine1'); }
            set AddressLine1(v: string) { this._setFieldVal('AddressLine1', v); }
            get AddressLine2(): string { return this._getFieldVal('AddressLine2'); }
            set AddressLine2(v: string) { this._setFieldVal('AddressLine2', v); }
            get City(): string { return this._getFieldVal('City'); }
            set City(v: string) { this._setFieldVal('City', v); }
            get StateProvince(): string { return this._getFieldVal('StateProvince'); }
            set StateProvince(v: string) { this._setFieldVal('StateProvince', v); }
            get CountryRegion(): string { return this._getFieldVal('CountryRegion'); }
            set CountryRegion(v: string) { this._setFieldVal('CountryRegion', v); }
            get PostalCode(): string { return this._getFieldVal('PostalCode'); }
            set PostalCode(v: string) { this._setFieldVal('PostalCode', v); }
            get rowguid(): string { return this._getFieldVal('rowguid'); }
            get ModifiedDate(): Date { return this._getFieldVal('ModifiedDate'); }
            get CustomerAddresses(): CustomerAddress[] { return this._getNavFieldVal('CustomerAddresses'); }

            getDbContext() {
                return <DbContext>super.getDbContext();
            }
            getDbSet() {
                return <RIAPP.MOD.db.DbSet<Address>>super.getDbSet();
            }
            get _dbSet() { return this.getDbSet(); }
            toString() {
                return 'AddressEntity';
            }
            asEntity() { return this; }
            asInterface() { return <IAddressEntity>this; }
        }

        export class AddressDb extends RIAPP.MOD.db.DbSet<Address>
        {
            constructor(dbContext: DbContext) {
                var self = this, opts: RIAPP.MOD.db.IDbSetConstuctorOptions = {
                    dbContext: dbContext,
                    dbSetInfo: { "dbSetName": "Address", "enablePaging": false, "pageSize": 25, "fieldInfos": [{ "fieldName": "AddressID", "dataType": 3, "maxLength": 4, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isPrimaryKey": 1, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "AddressLine1", "dataType": 1, "maxLength": 60, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "AddressLine2", "dataType": 1, "maxLength": 60, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "City", "dataType": 1, "maxLength": 30, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "StateProvince", "dataType": 1, "maxLength": 50, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "CountryRegion", "dataType": 1, "maxLength": 50, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "PostalCode", "dataType": 1, "maxLength": 15, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "rowguid", "dataType": 9, "maxLength": -1, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isPrimaryKey": 0, "fieldType": 4, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "ModifiedDate", "dataType": 6, "maxLength": -1, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "CustomerAddresses", "dataType": 0, "maxLength": -1, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 3, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }] },
                    childAssoc: [],
                    parentAssoc: [{ "name": "CustAddrToAddress", "parentDbSetName": "Address", "childDbSetName": "CustomerAddress", "childToParentName": "Address", "parentToChildrenName": "CustomerAddresses", "fieldRels": [{ "parentField": "AddressID", "childField": "AddressID" }], "onDeleteAction": 0 }, { "name": "OrdersToShipAddr", "parentDbSetName": "Address", "childDbSetName": "SalesOrderHeader", "childToParentName": "Address", "parentToChildrenName": null, "fieldRels": [{ "parentField": "AddressID", "childField": "ShipToAddressID" }], "onDeleteAction": 0 }, { "name": "OrdersToBillAddr", "parentDbSetName": "Address", "childDbSetName": "SalesOrderHeader", "childToParentName": "Address1", "parentToChildrenName": null, "fieldRels": [{ "parentField": "AddressID", "childField": "BillToAddressID" }], "onDeleteAction": 0 }]
                }, utils = RIAPP.global.utils;
                super(opts, Address);
            }
            findEntity(addressID: number): Address {
                return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
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


            get items2() { return <IAddressEntity[]>this.items; }
        }

        export interface IProductEntity extends RIAPP.MOD.utils.IEditable, RIAPP.MOD.utils.ISubmittable {
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

        export class Product extends RIAPP.MOD.db.Entity implements IProductEntity {

            constructor(dbSet: ProductDb, row: RIAPP.MOD.db.IRowData, names: RIAPP.MOD.db.IFieldName[]) {
                super(dbSet, row, names);

            }
            get ProductID(): number { return this._getFieldVal('ProductID'); }
            get Name(): string { return this._getFieldVal('Name'); }
            set Name(v: string) { this._setFieldVal('Name', v); }
            get ProductNumber(): string { return this._getFieldVal('ProductNumber'); }
            set ProductNumber(v: string) { this._setFieldVal('ProductNumber', v); }
            get Color(): string { return this._getFieldVal('Color'); }
            set Color(v: string) { this._setFieldVal('Color', v); }
            get StandardCost(): number { return this._getFieldVal('StandardCost'); }
            set StandardCost(v: number) { this._setFieldVal('StandardCost', v); }
            get ListPrice(): number { return this._getFieldVal('ListPrice'); }
            set ListPrice(v: number) { this._setFieldVal('ListPrice', v); }
            get Size(): string { return this._getFieldVal('Size'); }
            set Size(v: string) { this._setFieldVal('Size', v); }
            get Weight(): number { return this._getFieldVal('Weight'); }
            set Weight(v: number) { this._setFieldVal('Weight', v); }
            get ProductCategoryID(): number { return this._getFieldVal('ProductCategoryID'); }
            set ProductCategoryID(v: number) { this._setFieldVal('ProductCategoryID', v); }
            get ProductModelID(): number { return this._getFieldVal('ProductModelID'); }
            set ProductModelID(v: number) { this._setFieldVal('ProductModelID', v); }
            get SellStartDate(): Date { return this._getFieldVal('SellStartDate'); }
            set SellStartDate(v: Date) { this._setFieldVal('SellStartDate', v); }
            get SellEndDate(): Date { return this._getFieldVal('SellEndDate'); }
            set SellEndDate(v: Date) { this._setFieldVal('SellEndDate', v); }
            get DiscontinuedDate(): Date { return this._getFieldVal('DiscontinuedDate'); }
            set DiscontinuedDate(v: Date) { this._setFieldVal('DiscontinuedDate', v); }
            get rowguid(): string { return this._getFieldVal('rowguid'); }
            get ModifiedDate(): Date { return this._getFieldVal('ModifiedDate'); }
            get IsActive(): boolean { return this._getCalcFieldVal('IsActive'); }
            get ThumbnailPhotoFileName(): string { return this._getFieldVal('ThumbnailPhotoFileName'); }
            set ThumbnailPhotoFileName(v: string) { this._setFieldVal('ThumbnailPhotoFileName', v); }
            get SalesOrderDetails(): SalesOrderDetail[] { return this._getNavFieldVal('SalesOrderDetails'); }

            getDbContext() {
                return <DbContext>super.getDbContext();
            }
            getDbSet() {
                return <RIAPP.MOD.db.DbSet<Product>>super.getDbSet();
            }
            get _dbSet() { return this.getDbSet(); }
            toString() {
                return 'ProductEntity';
            }
            asEntity() { return this; }
            asInterface() { return <IProductEntity>this; }
        }

        export class ProductDb extends RIAPP.MOD.db.DbSet<Product>
        {
            constructor(dbContext: DbContext) {
                var self = this, opts: RIAPP.MOD.db.IDbSetConstuctorOptions = {
                    dbContext: dbContext,
                    dbSetInfo: { "dbSetName": "Product", "enablePaging": true, "pageSize": 25, "fieldInfos": [{ "fieldName": "ProductID", "dataType": 3, "maxLength": 4, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isPrimaryKey": 1, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "Name", "dataType": 1, "maxLength": 50, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": false, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "ProductNumber", "dataType": 1, "maxLength": 25, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": false, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "Color", "dataType": 1, "maxLength": 15, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": false, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "StandardCost", "dataType": 4, "maxLength": 8, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": false, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "ListPrice", "dataType": 4, "maxLength": 8, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": false, "range": "100,5000", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "Size", "dataType": 1, "maxLength": 5, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": false, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "Weight", "dataType": 4, "maxLength": 5, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": false, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "ProductCategoryID", "dataType": 3, "maxLength": 4, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": false, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "ProductModelID", "dataType": 3, "maxLength": 4, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": false, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "SellStartDate", "dataType": 7, "maxLength": 8, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "2000-01-01,2015-01-01", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "SellEndDate", "dataType": 7, "maxLength": 8, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "DiscontinuedDate", "dataType": 7, "maxLength": 8, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": false, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "rowguid", "dataType": 9, "maxLength": 16, "isNullable": false, "isAutoGenerated": false, "isReadOnly": true, "isPrimaryKey": 0, "fieldType": 4, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "ModifiedDate", "dataType": 6, "maxLength": 8, "isNullable": false, "isAutoGenerated": false, "isReadOnly": true, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "IsActive", "dataType": 2, "maxLength": -1, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 2, "nested": null, "dependentOn": "SellEndDate", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "ThumbnailPhotoFileName", "dataType": 1, "maxLength": 256, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": false, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "SalesOrderDetails", "dataType": 0, "maxLength": -1, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 3, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }] },
                    childAssoc: [],
                    parentAssoc: [{ "name": "OrdDetailsToProduct", "parentDbSetName": "Product", "childDbSetName": "SalesOrderDetail", "childToParentName": "Product", "parentToChildrenName": "SalesOrderDetails", "fieldRels": [{ "parentField": "ProductID", "childField": "ProductID" }], "onDeleteAction": 0 }]
                }, utils = RIAPP.global.utils;
                super(opts, Product);
            }
            findEntity(productID: number): Product {
                return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
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

            defineIsActiveField(getFunc: () => boolean) { this._defineCalculatedField('IsActive', getFunc); }

            get items2() { return <IProductEntity[]>this.items; }
        }

        export interface IProductModelEntity extends RIAPP.MOD.utils.IEditable, RIAPP.MOD.utils.ISubmittable {
            ProductModelID: number;
            Name: string;

            getDbContext(): DbContext;
            getDbSet(): RIAPP.MOD.db.DbSet<ProductModel>;
            _dbSet: RIAPP.MOD.db.DbSet<ProductModel>;
            asEntity(): ProductModel;
        }

        export class ProductModel extends RIAPP.MOD.db.Entity implements IProductModelEntity {

            constructor(dbSet: ProductModelDb, row: RIAPP.MOD.db.IRowData, names: RIAPP.MOD.db.IFieldName[]) {
                super(dbSet, row, names);

            }
            get ProductModelID(): number { return this._getFieldVal('ProductModelID'); }
            get Name(): string { return this._getFieldVal('Name'); }
            set Name(v: string) { this._setFieldVal('Name', v); }

            getDbContext() {
                return <DbContext>super.getDbContext();
            }
            getDbSet() {
                return <RIAPP.MOD.db.DbSet<ProductModel>>super.getDbSet();
            }
            get _dbSet() { return this.getDbSet(); }
            toString() {
                return 'ProductModelEntity';
            }
            asEntity() { return this; }
            asInterface() { return <IProductModelEntity>this; }
        }

        export class ProductModelDb extends RIAPP.MOD.db.DbSet<ProductModel>
        {
            constructor(dbContext: DbContext) {
                var self = this, opts: RIAPP.MOD.db.IDbSetConstuctorOptions = {
                    dbContext: dbContext,
                    dbSetInfo: { "dbSetName": "ProductModel", "enablePaging": false, "pageSize": 25, "fieldInfos": [{ "fieldName": "ProductModelID", "dataType": 3, "maxLength": 4, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isPrimaryKey": 1, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "Name", "dataType": 1, "maxLength": 50, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }] },
                    childAssoc: [],
                    parentAssoc: []
                }, utils = RIAPP.global.utils;
                super(opts, ProductModel);
            }
            findEntity(productModelID: number): ProductModel {
                return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
            }
            createReadProductModelQuery() {
                return this.createQuery('ReadProductModel');
            }


            get items2() { return <IProductModelEntity[]>this.items; }
        }

        export interface ISalesOrderHeaderEntity extends RIAPP.MOD.utils.IEditable, RIAPP.MOD.utils.ISubmittable {
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

        export class SalesOrderHeader extends RIAPP.MOD.db.Entity implements ISalesOrderHeaderEntity {

            constructor(dbSet: SalesOrderHeaderDb, row: RIAPP.MOD.db.IRowData, names: RIAPP.MOD.db.IFieldName[]) {
                super(dbSet, row, names);

            }
            get SalesOrderID(): number { return this._getFieldVal('SalesOrderID'); }
            get RevisionNumber(): number { return this._getFieldVal('RevisionNumber'); }
            get OrderDate(): Date { return this._getFieldVal('OrderDate'); }
            set OrderDate(v: Date) { this._setFieldVal('OrderDate', v); }
            get DueDate(): Date { return this._getFieldVal('DueDate'); }
            set DueDate(v: Date) { this._setFieldVal('DueDate', v); }
            get ShipDate(): Date { return this._getFieldVal('ShipDate'); }
            set ShipDate(v: Date) { this._setFieldVal('ShipDate', v); }
            get Status(): number { return this._getFieldVal('Status'); }
            get OnlineOrderFlag(): boolean { return this._getFieldVal('OnlineOrderFlag'); }
            set OnlineOrderFlag(v: boolean) { this._setFieldVal('OnlineOrderFlag', v); }
            get SalesOrderNumber(): string { return this._getFieldVal('SalesOrderNumber'); }
            get PurchaseOrderNumber(): string { return this._getFieldVal('PurchaseOrderNumber'); }
            get AccountNumber(): string { return this._getFieldVal('AccountNumber'); }
            set AccountNumber(v: string) { this._setFieldVal('AccountNumber', v); }
            get CustomerID(): number { return this._getFieldVal('CustomerID'); }
            set CustomerID(v: number) { this._setFieldVal('CustomerID', v); }
            get ShipToAddressID(): number { return this._getFieldVal('ShipToAddressID'); }
            set ShipToAddressID(v: number) { this._setFieldVal('ShipToAddressID', v); }
            get BillToAddressID(): number { return this._getFieldVal('BillToAddressID'); }
            set BillToAddressID(v: number) { this._setFieldVal('BillToAddressID', v); }
            get ShipMethod(): string { return this._getFieldVal('ShipMethod'); }
            set ShipMethod(v: string) { this._setFieldVal('ShipMethod', v); }
            get CreditCardApprovalCode(): string { return this._getFieldVal('CreditCardApprovalCode'); }
            set CreditCardApprovalCode(v: string) { this._setFieldVal('CreditCardApprovalCode', v); }
            get SubTotal(): number { return this._getFieldVal('SubTotal'); }
            get TaxAmt(): number { return this._getFieldVal('TaxAmt'); }
            get Freight(): number { return this._getFieldVal('Freight'); }
            get TotalDue(): number { return this._getFieldVal('TotalDue'); }
            get Comment(): string { return this._getFieldVal('Comment'); }
            set Comment(v: string) { this._setFieldVal('Comment', v); }
            get rowguid(): string { return this._getFieldVal('rowguid'); }
            get ModifiedDate(): Date { return this._getFieldVal('ModifiedDate'); }
            get SalesOrderDetails(): SalesOrderDetail[] { return this._getNavFieldVal('SalesOrderDetails'); }
            get Customer(): Customer { return this._getNavFieldVal('Customer'); }
            set Customer(v: Customer) { this._setNavFieldVal('Customer', v); }
            get Address(): Address { return this._getNavFieldVal('Address'); }
            set Address(v: Address) { this._setNavFieldVal('Address', v); }
            get Address1(): Address { return this._getNavFieldVal('Address1'); }
            set Address1(v: Address) { this._setNavFieldVal('Address1', v); }

            getDbContext() {
                return <DbContext>super.getDbContext();
            }
            getDbSet() {
                return <RIAPP.MOD.db.DbSet<SalesOrderHeader>>super.getDbSet();
            }
            get _dbSet() { return this.getDbSet(); }
            toString() {
                return 'SalesOrderHeaderEntity';
            }
            asEntity() { return this; }
            asInterface() { return <ISalesOrderHeaderEntity>this; }
        }

        export class SalesOrderHeaderDb extends RIAPP.MOD.db.DbSet<SalesOrderHeader>
        {
            constructor(dbContext: DbContext) {
                var self = this, opts: RIAPP.MOD.db.IDbSetConstuctorOptions = {
                    dbContext: dbContext,
                    dbSetInfo: { "dbSetName": "SalesOrderHeader", "enablePaging": false, "pageSize": 25, "fieldInfos": [{ "fieldName": "SalesOrderID", "dataType": 3, "maxLength": 4, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isPrimaryKey": 1, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "RevisionNumber", "dataType": 3, "maxLength": 1, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "OrderDate", "dataType": 7, "maxLength": 8, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "DueDate", "dataType": 7, "maxLength": 8, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "ShipDate", "dataType": 7, "maxLength": 8, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "Status", "dataType": 3, "maxLength": 1, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "OnlineOrderFlag", "dataType": 2, "maxLength": 1, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "SalesOrderNumber", "dataType": 1, "maxLength": 25, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "PurchaseOrderNumber", "dataType": 1, "maxLength": 25, "isNullable": true, "isAutoGenerated": true, "isReadOnly": true, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "AccountNumber", "dataType": 1, "maxLength": 15, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "CustomerID", "dataType": 3, "maxLength": 4, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "ShipToAddressID", "dataType": 3, "maxLength": 4, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "BillToAddressID", "dataType": 3, "maxLength": 4, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "ShipMethod", "dataType": 1, "maxLength": 50, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "CreditCardApprovalCode", "dataType": 1, "maxLength": 15, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "SubTotal", "dataType": 4, "maxLength": 8, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "TaxAmt", "dataType": 4, "maxLength": 8, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "Freight", "dataType": 4, "maxLength": 8, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "TotalDue", "dataType": 4, "maxLength": 8, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "Comment", "dataType": 1, "maxLength": 0, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "rowguid", "dataType": 9, "maxLength": 16, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "ModifiedDate", "dataType": 6, "maxLength": 8, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "SalesOrderDetails", "dataType": 0, "maxLength": -1, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 3, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "Customer", "dataType": 0, "maxLength": -1, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 3, "nested": null, "dependentOn": "CustomerID", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "Address", "dataType": 0, "maxLength": -1, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 3, "nested": null, "dependentOn": "ShipToAddressID", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "Address1", "dataType": 0, "maxLength": -1, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 3, "nested": null, "dependentOn": "BillToAddressID", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }] },
                    childAssoc: [{ "name": "OrdersToCustomer", "parentDbSetName": "Customer", "childDbSetName": "SalesOrderHeader", "childToParentName": "Customer", "parentToChildrenName": null, "fieldRels": [{ "parentField": "CustomerID", "childField": "CustomerID" }], "onDeleteAction": 0 }, { "name": "OrdersToShipAddr", "parentDbSetName": "Address", "childDbSetName": "SalesOrderHeader", "childToParentName": "Address", "parentToChildrenName": null, "fieldRels": [{ "parentField": "AddressID", "childField": "ShipToAddressID" }], "onDeleteAction": 0 }, { "name": "OrdersToBillAddr", "parentDbSetName": "Address", "childDbSetName": "SalesOrderHeader", "childToParentName": "Address1", "parentToChildrenName": null, "fieldRels": [{ "parentField": "AddressID", "childField": "BillToAddressID" }], "onDeleteAction": 0 }],
                    parentAssoc: [{ "name": "OrdDetailsToOrder", "parentDbSetName": "SalesOrderHeader", "childDbSetName": "SalesOrderDetail", "childToParentName": "SalesOrderHeader", "parentToChildrenName": "SalesOrderDetails", "fieldRels": [{ "parentField": "SalesOrderID", "childField": "SalesOrderID" }], "onDeleteAction": 1 }]
                }, utils = RIAPP.global.utils;
                super(opts, SalesOrderHeader);
            }
            findEntity(salesOrderID: number): SalesOrderHeader {
                return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
            }
            createReadSalesOrderHeaderQuery() {
                return this.createQuery('ReadSalesOrderHeader');
            }


            get items2() { return <ISalesOrderHeaderEntity[]>this.items; }
        }

        export interface ISalesOrderDetailEntity extends RIAPP.MOD.utils.IEditable, RIAPP.MOD.utils.ISubmittable {
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

        export class SalesOrderDetail extends RIAPP.MOD.db.Entity implements ISalesOrderDetailEntity {

            constructor(dbSet: SalesOrderDetailDb, row: RIAPP.MOD.db.IRowData, names: RIAPP.MOD.db.IFieldName[]) {
                super(dbSet, row, names);

            }
            get SalesOrderID(): number { return this._getFieldVal('SalesOrderID'); }
            set SalesOrderID(v: number) { this._setFieldVal('SalesOrderID', v); }
            get SalesOrderDetailID(): number { return this._getFieldVal('SalesOrderDetailID'); }
            get OrderQty(): number { return this._getFieldVal('OrderQty'); }
            set OrderQty(v: number) { this._setFieldVal('OrderQty', v); }
            get ProductID(): number { return this._getFieldVal('ProductID'); }
            set ProductID(v: number) { this._setFieldVal('ProductID', v); }
            get UnitPrice(): number { return this._getFieldVal('UnitPrice'); }
            get UnitPriceDiscount(): number { return this._getFieldVal('UnitPriceDiscount'); }
            get LineTotal(): number { return this._getFieldVal('LineTotal'); }
            get rowguid(): string { return this._getFieldVal('rowguid'); }
            get ModifiedDate(): Date { return this._getFieldVal('ModifiedDate'); }
            get SalesOrderHeader(): SalesOrderHeader { return this._getNavFieldVal('SalesOrderHeader'); }
            set SalesOrderHeader(v: SalesOrderHeader) { this._setNavFieldVal('SalesOrderHeader', v); }
            get Product(): Product { return this._getNavFieldVal('Product'); }
            set Product(v: Product) { this._setNavFieldVal('Product', v); }

            getDbContext() {
                return <DbContext>super.getDbContext();
            }
            getDbSet() {
                return <RIAPP.MOD.db.DbSet<SalesOrderDetail>>super.getDbSet();
            }
            get _dbSet() { return this.getDbSet(); }
            toString() {
                return 'SalesOrderDetailEntity';
            }
            asEntity() { return this; }
            asInterface() { return <ISalesOrderDetailEntity>this; }
        }

        export class SalesOrderDetailDb extends RIAPP.MOD.db.DbSet<SalesOrderDetail>
        {
            constructor(dbContext: DbContext) {
                var self = this, opts: RIAPP.MOD.db.IDbSetConstuctorOptions = {
                    dbContext: dbContext,
                    dbSetInfo: { "dbSetName": "SalesOrderDetail", "enablePaging": false, "pageSize": 25, "fieldInfos": [{ "fieldName": "SalesOrderID", "dataType": 3, "maxLength": 4, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 1, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "SalesOrderDetailID", "dataType": 3, "maxLength": 4, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isPrimaryKey": 2, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "OrderQty", "dataType": 3, "maxLength": 2, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "ProductID", "dataType": 3, "maxLength": 4, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "UnitPrice", "dataType": 4, "maxLength": 8, "isNullable": true, "isAutoGenerated": true, "isReadOnly": true, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "UnitPriceDiscount", "dataType": 4, "maxLength": 8, "isNullable": true, "isAutoGenerated": true, "isReadOnly": true, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "LineTotal", "dataType": 4, "maxLength": 17, "isNullable": false, "isAutoGenerated": false, "isReadOnly": true, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "rowguid", "dataType": 9, "maxLength": 16, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "ModifiedDate", "dataType": 6, "maxLength": 8, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "SalesOrderHeader", "dataType": 0, "maxLength": -1, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 3, "nested": null, "dependentOn": "SalesOrderID", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "Product", "dataType": 0, "maxLength": -1, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 3, "nested": null, "dependentOn": "ProductID", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }] },
                    childAssoc: [{ "name": "OrdDetailsToOrder", "parentDbSetName": "SalesOrderHeader", "childDbSetName": "SalesOrderDetail", "childToParentName": "SalesOrderHeader", "parentToChildrenName": "SalesOrderDetails", "fieldRels": [{ "parentField": "SalesOrderID", "childField": "SalesOrderID" }], "onDeleteAction": 1 }, { "name": "OrdDetailsToProduct", "parentDbSetName": "Product", "childDbSetName": "SalesOrderDetail", "childToParentName": "Product", "parentToChildrenName": "SalesOrderDetails", "fieldRels": [{ "parentField": "ProductID", "childField": "ProductID" }], "onDeleteAction": 0 }],
                    parentAssoc: []
                }, utils = RIAPP.global.utils;
                super(opts, SalesOrderDetail);
            }
            findEntity(salesOrderID: number, salesOrderDetailID: number): SalesOrderDetail {
                return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
            }
            createReadSalesOrderDetailQuery() {
                return this.createQuery('ReadSalesOrderDetail');
            }


            get items2() { return <ISalesOrderDetailEntity[]>this.items; }
        }

        export interface IProductCategoryEntity extends RIAPP.MOD.utils.IEditable, RIAPP.MOD.utils.ISubmittable {
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

        export class ProductCategory extends RIAPP.MOD.db.Entity implements IProductCategoryEntity {

            constructor(dbSet: ProductCategoryDb, row: RIAPP.MOD.db.IRowData, names: RIAPP.MOD.db.IFieldName[]) {
                super(dbSet, row, names);

            }
            get ProductCategoryID(): number { return this._getFieldVal('ProductCategoryID'); }
            get ParentProductCategoryID(): number { return this._getFieldVal('ParentProductCategoryID'); }
            set ParentProductCategoryID(v: number) { this._setFieldVal('ParentProductCategoryID', v); }
            get Name(): string { return this._getFieldVal('Name'); }
            set Name(v: string) { this._setFieldVal('Name', v); }
            get rowguid(): string { return this._getFieldVal('rowguid'); }
            set rowguid(v: string) { this._setFieldVal('rowguid', v); }
            get ModifiedDate(): Date { return this._getFieldVal('ModifiedDate'); }
            set ModifiedDate(v: Date) { this._setFieldVal('ModifiedDate', v); }

            getDbContext() {
                return <DbContext>super.getDbContext();
            }
            getDbSet() {
                return <RIAPP.MOD.db.DbSet<ProductCategory>>super.getDbSet();
            }
            get _dbSet() { return this.getDbSet(); }
            toString() {
                return 'ProductCategoryEntity';
            }
            asEntity() { return this; }
            asInterface() { return <IProductCategoryEntity>this; }
        }

        export class ProductCategoryDb extends RIAPP.MOD.db.DbSet<ProductCategory>
        {
            constructor(dbContext: DbContext) {
                var self = this, opts: RIAPP.MOD.db.IDbSetConstuctorOptions = {
                    dbContext: dbContext,
                    dbSetInfo: { "dbSetName": "ProductCategory", "enablePaging": false, "pageSize": 25, "fieldInfos": [{ "fieldName": "ProductCategoryID", "dataType": 3, "maxLength": 4, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isPrimaryKey": 1, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "ParentProductCategoryID", "dataType": 3, "maxLength": 4, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "Name", "dataType": 1, "maxLength": 50, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "rowguid", "dataType": 9, "maxLength": 16, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 4, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "ModifiedDate", "dataType": 6, "maxLength": 8, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }] },
                    childAssoc: [],
                    parentAssoc: []
                }, utils = RIAPP.global.utils;
                super(opts, ProductCategory);
            }
            findEntity(productCategoryID: number): ProductCategory {
                return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
            }
            createReadProductCategoryQuery() {
                return this.createQuery('ReadProductCategory');
            }


            get items2() { return <IProductCategoryEntity[]>this.items; }
        }

        export interface ISalesInfoEntity extends RIAPP.MOD.utils.IEditable, RIAPP.MOD.utils.ISubmittable {
            SalesPerson: string;

            getDbContext(): DbContext;
            getDbSet(): RIAPP.MOD.db.DbSet<SalesInfo>;
            _dbSet: RIAPP.MOD.db.DbSet<SalesInfo>;
            asEntity(): SalesInfo;
        }

        export class SalesInfo extends RIAPP.MOD.db.Entity implements ISalesInfoEntity {

            constructor(dbSet: SalesInfoDb, row: RIAPP.MOD.db.IRowData, names: RIAPP.MOD.db.IFieldName[]) {
                super(dbSet, row, names);

            }
            get SalesPerson(): string { return this._getFieldVal('SalesPerson'); }
            set SalesPerson(v: string) { this._setFieldVal('SalesPerson', v); }

            getDbContext() {
                return <DbContext>super.getDbContext();
            }
            getDbSet() {
                return <RIAPP.MOD.db.DbSet<SalesInfo>>super.getDbSet();
            }
            get _dbSet() { return this.getDbSet(); }
            toString() {
                return 'SalesInfoEntity';
            }
            asEntity() { return this; }
            asInterface() { return <ISalesInfoEntity>this; }
        }

        export class SalesInfoDb extends RIAPP.MOD.db.DbSet<SalesInfo>
        {
            constructor(dbContext: DbContext) {
                var self = this, opts: RIAPP.MOD.db.IDbSetConstuctorOptions = {
                    dbContext: dbContext,
                    dbSetInfo: { "dbSetName": "SalesInfo", "enablePaging": true, "pageSize": 25, "fieldInfos": [{ "fieldName": "SalesPerson", "dataType": 1, "maxLength": -1, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 1, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }] },
                    childAssoc: [],
                    parentAssoc: []
                }, utils = RIAPP.global.utils;
                super(opts, SalesInfo);
            }
            findEntity(salesPerson: string): SalesInfo {
                return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
            }
            createReadSalesInfoQuery() {
                return this.createQuery('ReadSalesInfo');
            }


            get items2() { return <ISalesInfoEntity[]>this.items; }
        }

        export interface ILookUpProductEntity extends RIAPP.MOD.utils.IEditable, RIAPP.MOD.utils.ISubmittable {
            ProductID: number;
            Name: string;

            getDbContext(): DbContext;
            getDbSet(): RIAPP.MOD.db.DbSet<LookUpProduct>;
            _dbSet: RIAPP.MOD.db.DbSet<LookUpProduct>;
            asEntity(): LookUpProduct;
        }

        export class LookUpProduct extends RIAPP.MOD.db.Entity implements ILookUpProductEntity {

            constructor(dbSet: LookUpProductDb, row: RIAPP.MOD.db.IRowData, names: RIAPP.MOD.db.IFieldName[]) {
                super(dbSet, row, names);

            }
            get ProductID(): number { return this._getFieldVal('ProductID'); }
            set ProductID(v: number) { this._setFieldVal('ProductID', v); }
            get Name(): string { return this._getFieldVal('Name'); }
            set Name(v: string) { this._setFieldVal('Name', v); }

            getDbContext() {
                return <DbContext>super.getDbContext();
            }
            getDbSet() {
                return <RIAPP.MOD.db.DbSet<LookUpProduct>>super.getDbSet();
            }
            get _dbSet() { return this.getDbSet(); }
            toString() {
                return 'LookUpProductEntity';
            }
            asEntity() { return this; }
            asInterface() { return <ILookUpProductEntity>this; }
        }

        export class LookUpProductDb extends RIAPP.MOD.db.DbSet<LookUpProduct>
        {
            constructor(dbContext: DbContext) {
                var self = this, opts: RIAPP.MOD.db.IDbSetConstuctorOptions = {
                    dbContext: dbContext,
                    dbSetInfo: { "dbSetName": "LookUpProduct", "enablePaging": true, "pageSize": 25, "fieldInfos": [{ "fieldName": "ProductID", "dataType": 3, "maxLength": -1, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 1, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "Name", "dataType": 1, "maxLength": -1, "isNullable": false, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }] },
                    childAssoc: [],
                    parentAssoc: []
                }, utils = RIAPP.global.utils;
                super(opts, LookUpProduct);
            }
            findEntity(productID: number): LookUpProduct {
                return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
            }
            createReadProductLookUpQuery() {
                return this.createQuery('ReadProductLookUp');
            }


            get items2() { return <ILookUpProductEntity[]>this.items; }
        }

        export interface IAddressInfoEntity extends RIAPP.MOD.utils.IEditable, RIAPP.MOD.utils.ISubmittable {
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

        export class AddressInfo extends RIAPP.MOD.db.Entity implements IAddressInfoEntity {

            constructor(dbSet: AddressInfoDb, row: RIAPP.MOD.db.IRowData, names: RIAPP.MOD.db.IFieldName[]) {
                super(dbSet, row, names);

            }
            get AddressID(): number { return this._getFieldVal('AddressID'); }
            get AddressLine1(): string { return this._getFieldVal('AddressLine1'); }
            get City(): string { return this._getFieldVal('City'); }
            get StateProvince(): string { return this._getFieldVal('StateProvince'); }
            get CountryRegion(): string { return this._getFieldVal('CountryRegion'); }
            get CustomerAddresses(): CustomerAddress[] { return this._getNavFieldVal('CustomerAddresses'); }

            getDbContext() {
                return <DbContext>super.getDbContext();
            }
            getDbSet() {
                return <RIAPP.MOD.db.DbSet<AddressInfo>>super.getDbSet();
            }
            get _dbSet() { return this.getDbSet(); }
            toString() {
                return 'AddressInfoEntity';
            }
            asEntity() { return this; }
            asInterface() { return <IAddressInfoEntity>this; }
        }

        export class AddressInfoDb extends RIAPP.MOD.db.DbSet<AddressInfo>
        {
            constructor(dbContext: DbContext) {
                var self = this, opts: RIAPP.MOD.db.IDbSetConstuctorOptions = {
                    dbContext: dbContext,
                    dbSetInfo: { "dbSetName": "AddressInfo", "enablePaging": false, "pageSize": 25, "fieldInfos": [{ "fieldName": "AddressID", "dataType": 3, "maxLength": 4, "isNullable": false, "isAutoGenerated": true, "isReadOnly": true, "isPrimaryKey": 1, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "AddressLine1", "dataType": 1, "maxLength": 200, "isNullable": true, "isAutoGenerated": false, "isReadOnly": true, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "City", "dataType": 1, "maxLength": 30, "isNullable": true, "isAutoGenerated": false, "isReadOnly": true, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "StateProvince", "dataType": 1, "maxLength": 50, "isNullable": true, "isAutoGenerated": false, "isReadOnly": true, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "CountryRegion", "dataType": 1, "maxLength": 50, "isNullable": true, "isAutoGenerated": false, "isReadOnly": true, "isPrimaryKey": 0, "fieldType": 0, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }, { "fieldName": "CustomerAddresses", "dataType": 0, "maxLength": -1, "isNullable": true, "isAutoGenerated": false, "isReadOnly": false, "isPrimaryKey": 0, "fieldType": 3, "nested": null, "dependentOn": "", "regex": "", "isNeedOriginal": true, "range": "", "dateConversion": 0, "allowClientDefault": false }] },
                    childAssoc: [],
                    parentAssoc: [{ "name": "CustAddrToAddress2", "parentDbSetName": "AddressInfo", "childDbSetName": "CustomerAddress", "childToParentName": "AddressInfo", "parentToChildrenName": "CustomerAddresses", "fieldRels": [{ "parentField": "AddressID", "childField": "AddressID" }], "onDeleteAction": 0 }]
                }, utils = RIAPP.global.utils;
                super(opts, AddressInfo);
            }
            findEntity(addressID: number): AddressInfo {
                return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
            }
            createReadAddressInfoQuery() {
                return this.createQuery('ReadAddressInfo');
            }


            get items2() { return <IAddressInfoEntity[]>this.items; }
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
                var associations = [{ "name": "CustAddrToCustomer", "parentDbSetName": "Customer", "childDbSetName": "CustomerAddress", "childToParentName": "Customer", "parentToChildrenName": "CustomerAddresses", "fieldRels": [{ "parentField": "CustomerID", "childField": "CustomerID" }], "onDeleteAction": 0 }, { "name": "CustAddrToAddress", "parentDbSetName": "Address", "childDbSetName": "CustomerAddress", "childToParentName": "Address", "parentToChildrenName": "CustomerAddresses", "fieldRels": [{ "parentField": "AddressID", "childField": "AddressID" }], "onDeleteAction": 0 }, { "name": "CustAddrToAddress2", "parentDbSetName": "AddressInfo", "childDbSetName": "CustomerAddress", "childToParentName": "AddressInfo", "parentToChildrenName": "CustomerAddresses", "fieldRels": [{ "parentField": "AddressID", "childField": "AddressID" }], "onDeleteAction": 0 }, { "name": "OrdDetailsToOrder", "parentDbSetName": "SalesOrderHeader", "childDbSetName": "SalesOrderDetail", "childToParentName": "SalesOrderHeader", "parentToChildrenName": "SalesOrderDetails", "fieldRels": [{ "parentField": "SalesOrderID", "childField": "SalesOrderID" }], "onDeleteAction": 1 }, { "name": "OrdDetailsToProduct", "parentDbSetName": "Product", "childDbSetName": "SalesOrderDetail", "childToParentName": "Product", "parentToChildrenName": "SalesOrderDetails", "fieldRels": [{ "parentField": "ProductID", "childField": "ProductID" }], "onDeleteAction": 0 }, { "name": "OrdersToCustomer", "parentDbSetName": "Customer", "childDbSetName": "SalesOrderHeader", "childToParentName": "Customer", "parentToChildrenName": null, "fieldRels": [{ "parentField": "CustomerID", "childField": "CustomerID" }], "onDeleteAction": 0 }, { "name": "OrdersToShipAddr", "parentDbSetName": "Address", "childDbSetName": "SalesOrderHeader", "childToParentName": "Address", "parentToChildrenName": null, "fieldRels": [{ "parentField": "AddressID", "childField": "ShipToAddressID" }], "onDeleteAction": 0 }, { "name": "OrdersToBillAddr", "parentDbSetName": "Address", "childDbSetName": "SalesOrderHeader", "childToParentName": "Address1", "parentToChildrenName": null, "fieldRels": [{ "parentField": "AddressID", "childField": "BillToAddressID" }], "onDeleteAction": 0 }];
                this._initAssociations(associations);
                var methods = [{ "methodName": "ReadProductLookUp", "parameters": [], "methodResult": true, "isQuery": true }, { "methodName": "ReadProduct", "parameters": [{ "name": "param1", "dataType": 3, "isArray": true, "isNullable": false, "dateConversion": 0, "ordinal": 0 }, { "name": "param2", "dataType": 1, "isArray": false, "isNullable": false, "dateConversion": 0, "ordinal": 1 }], "methodResult": true, "isQuery": true }, { "methodName": "ReadProductByIds", "parameters": [{ "name": "productIDs", "dataType": 3, "isArray": true, "isNullable": false, "dateConversion": 0, "ordinal": 0 }], "methodResult": true, "isQuery": true }, { "methodName": "ReadCustomer", "parameters": [{ "name": "includeNav", "dataType": 2, "isArray": false, "isNullable": true, "dateConversion": 0, "ordinal": 0 }], "methodResult": true, "isQuery": true }, { "methodName": "ReadAddress", "parameters": [], "methodResult": true, "isQuery": true }, { "methodName": "ReadAddressByIds", "parameters": [{ "name": "addressIDs", "dataType": 3, "isArray": true, "isNullable": false, "dateConversion": 0, "ordinal": 0 }], "methodResult": true, "isQuery": true }, { "methodName": "ReadCustomerAddress", "parameters": [], "methodResult": true, "isQuery": true }, { "methodName": "ReadAddressForCustomers", "parameters": [{ "name": "custIDs", "dataType": 3, "isArray": true, "isNullable": false, "dateConversion": 0, "ordinal": 0 }], "methodResult": true, "isQuery": true }, { "methodName": "ReadSalesOrderHeader", "parameters": [], "methodResult": true, "isQuery": true }, { "methodName": "ReadSalesOrderDetail", "parameters": [], "methodResult": true, "isQuery": true }, { "methodName": "ReadProductCategory", "parameters": [], "methodResult": true, "isQuery": true }, { "methodName": "ReadProductModel", "parameters": [], "methodResult": true, "isQuery": true }, { "methodName": "ReadSalesInfo", "parameters": [], "methodResult": true, "isQuery": true }, { "methodName": "ReadAddressInfo", "parameters": [], "methodResult": true, "isQuery": true }, { "methodName": "TestInvoke", "parameters": [{ "name": "param1", "dataType": 10, "isArray": false, "isNullable": false, "dateConversion": 0, "ordinal": 0 }, { "name": "param2", "dataType": 1, "isArray": false, "isNullable": false, "dateConversion": 0, "ordinal": 1 }], "methodResult": true, "isQuery": false }, { "methodName": "TestComplexInvoke", "parameters": [{ "name": "info", "dataType": 0, "isArray": false, "isNullable": false, "dateConversion": 0, "ordinal": 0 }, { "name": "keys", "dataType": 0, "isArray": true, "isNullable": false, "dateConversion": 0, "ordinal": 1 }], "methodResult": false, "isQuery": false }];
                this._initMethods(methods);
            }
            get associations() { return <IAssocs>this._assoc; }
            get dbSets() { return <DbSets>this._dbSets; }
            get serviceMethods() { return <ISvcMethods>this._svcMethods; }
        }
    }
}

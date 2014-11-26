/// <reference path="..\jriapp.d.ts"/>
'use strict';
/*
    Generated from: /RIAppDemoService/code?lang=ts on 2014-11-26 16:43 at 16:43
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
    Generated from C# StrKeyVal model
*/
export interface IStrKeyVal {
    key: string;
    val: string;
}

export interface IRadioVal {
    key: string;
    value: string;
    comment: string;
}

/*
    Generated from C# HistoryItem model
*/
export interface IHistoryItem {
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
    }) => RIAPP.IPromise<string>;
    TestComplexInvoke: (args: {
        info: IAddressInfo2;
        keys: IKeyVal[];
    }) => RIAPP.IVoidPromise;
}

//******BEGIN LISTS REGION******
export class TestModelListItem extends RIAPP.BaseObject implements RIAPP.MOD.collection.IListItem, IClientTestModel {
    private f_aspect: TestModelListItemAspect;
    constructor(aspect: TestModelListItemAspect) {
        super();
        this.f_aspect = aspect;
    }
    get _aspect() { return this.f_aspect; }
    get _key() { return !!this.f_aspect ? this.f_aspect._key : null; }
    get Key(): string { return <string>this.f_aspect._getProp('Key'); }
    set Key(v: string) { this.f_aspect._setProp('Key', v); }
    get SomeProperty1(): string { return <string>this.f_aspect._getProp('SomeProperty1'); }
    set SomeProperty1(v: string) { this.f_aspect._setProp('SomeProperty1', v); }
    get SomeProperty2(): number[] { return <number[]>this.f_aspect._getProp('SomeProperty2'); }
    set SomeProperty2(v: number[]) { this.f_aspect._setProp('SomeProperty2', v); }
    get SomeProperty3(): string[] { return <string[]>this.f_aspect._getProp('SomeProperty3'); }
    set SomeProperty3(v: string[]) { this.f_aspect._setProp('SomeProperty3', v); }
    get MoreComplexProperty(): ITestLookUpProduct[] { return <ITestLookUpProduct[]>this.f_aspect._getProp('MoreComplexProperty'); }
    set MoreComplexProperty(v: ITestLookUpProduct[]) { this.f_aspect._setProp('MoreComplexProperty', v); }
    get EnumProperty(): TestEnum { return <TestEnum>this.f_aspect._getProp('EnumProperty'); }
    set EnumProperty(v: TestEnum) { this.f_aspect._setProp('EnumProperty', v); }

    toString() {
        return 'TestModelListItem';
    }
}

class TestModelListItemAspect extends RIAPP.MOD.collection.ListItemAspect<TestModelListItem, IClientTestModel>
{
    constructor(coll: RIAPP.MOD.collection.BaseList<TestModelListItem, IClientTestModel>, vals?: IClientTestModel) {
        super(coll, vals);
        this._item = new TestModelListItem(this);
    }
    toString() {
        return 'TestModelListItemAspect';
    }
}

export class TestDictionary extends RIAPP.MOD.collection.BaseDictionary<TestModelListItem, IClientTestModel> {
    constructor() {
        super(TestModelListItemAspect, 'Key', [{ name: 'Key', dtype: 1 }, { name: 'SomeProperty1', dtype: 1 }, { name: 'SomeProperty2', dtype: 10 }, { name: 'SomeProperty3', dtype: 0 }, { name: 'MoreComplexProperty', dtype: 0 }, { name: 'EnumProperty', dtype: 0 }]);
    }
    findItem(key: string): TestModelListItem {
        return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
    }
    toString() {
        return 'TestDictionary';
    }
}

export class TestList extends RIAPP.MOD.collection.BaseList<TestModelListItem, IClientTestModel> {
    constructor() {
        super(TestModelListItemAspect, [{ name: 'Key', dtype: 1 }, { name: 'SomeProperty1', dtype: 1 }, { name: 'SomeProperty2', dtype: 10 }, { name: 'SomeProperty3', dtype: 0 }, { name: 'MoreComplexProperty', dtype: 0 }, { name: 'EnumProperty', dtype: 0 }]);
    }
    toString() {
        return 'TestList';
    }
}

export class KeyValListItem extends RIAPP.BaseObject implements RIAPP.MOD.collection.IListItem, IKeyVal {
    private f_aspect: KeyValListItemAspect;
    constructor(aspect: KeyValListItemAspect) {
        super();
        this.f_aspect = aspect;
    }
    get _aspect() { return this.f_aspect; }
    get _key() { return !!this.f_aspect ? this.f_aspect._key : null; }
    get key(): number { return <number>this.f_aspect._getProp('key'); }
    set key(v: number) { this.f_aspect._setProp('key', v); }
    get val(): string { return <string>this.f_aspect._getProp('val'); }
    set val(v: string) { this.f_aspect._setProp('val', v); }

    toString() {
        return 'KeyValListItem';
    }
}

class KeyValListItemAspect extends RIAPP.MOD.collection.ListItemAspect<KeyValListItem, IKeyVal>
{
    constructor(coll: RIAPP.MOD.collection.BaseList<KeyValListItem, IKeyVal>, vals?: IKeyVal) {
        super(coll, vals);
        this._item = new KeyValListItem(this);
    }
    toString() {
        return 'KeyValListItemAspect';
    }
}

export class KeyValDictionary extends RIAPP.MOD.collection.BaseDictionary<KeyValListItem, IKeyVal> {
    constructor() {
        super(KeyValListItemAspect, 'key', [{ name: 'key', dtype: 3 }, { name: 'val', dtype: 1 }]);
    }
    findItem(key: number): KeyValListItem {
        return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
    }
    toString() {
        return 'KeyValDictionary';
    }
}

export class StrKeyValListItem extends RIAPP.BaseObject implements RIAPP.MOD.collection.IListItem, IStrKeyVal {
    private f_aspect: StrKeyValListItemAspect;
    constructor(aspect: StrKeyValListItemAspect) {
        super();
        this.f_aspect = aspect;
    }
    get _aspect() { return this.f_aspect; }
    get _key() { return !!this.f_aspect ? this.f_aspect._key : null; }
    get key(): string { return <string>this.f_aspect._getProp('key'); }
    set key(v: string) { this.f_aspect._setProp('key', v); }
    get val(): string { return <string>this.f_aspect._getProp('val'); }
    set val(v: string) { this.f_aspect._setProp('val', v); }

    toString() {
        return 'StrKeyValListItem';
    }
}

class StrKeyValListItemAspect extends RIAPP.MOD.collection.ListItemAspect<StrKeyValListItem, IStrKeyVal>
{
    constructor(coll: RIAPP.MOD.collection.BaseList<StrKeyValListItem, IStrKeyVal>, vals?: IStrKeyVal) {
        super(coll, vals);
        this._item = new StrKeyValListItem(this);
    }
    toString() {
        return 'StrKeyValListItemAspect';
    }
}

export class StrKeyValDictionary extends RIAPP.MOD.collection.BaseDictionary<StrKeyValListItem, IStrKeyVal> {
    constructor() {
        super(StrKeyValListItemAspect, 'key', [{ name: 'key', dtype: 1 }, { name: 'val', dtype: 1 }]);
    }
    findItem(key: string): StrKeyValListItem {
        return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
    }
    toString() {
        return 'StrKeyValDictionary';
    }
}

export class RadioValListItem extends RIAPP.BaseObject implements RIAPP.MOD.collection.IListItem, IRadioVal {
    private f_aspect: RadioValListItemAspect;
    constructor(aspect: RadioValListItemAspect) {
        super();
        this.f_aspect = aspect;
    }
    get _aspect() { return this.f_aspect; }
    get _key() { return !!this.f_aspect ? this.f_aspect._key : null; }
    get key(): string { return <string>this.f_aspect._getProp('key'); }
    set key(v: string) { this.f_aspect._setProp('key', v); }
    get value(): string { return <string>this.f_aspect._getProp('value'); }
    set value(v: string) { this.f_aspect._setProp('value', v); }
    get comment(): string { return <string>this.f_aspect._getProp('comment'); }
    set comment(v: string) { this.f_aspect._setProp('comment', v); }

    toString() {
        return 'RadioValListItem';
    }
}

class RadioValListItemAspect extends RIAPP.MOD.collection.ListItemAspect<RadioValListItem, IRadioVal>
{
    constructor(coll: RIAPP.MOD.collection.BaseList<RadioValListItem, IRadioVal>, vals?: IRadioVal) {
        super(coll, vals);
        this._item = new RadioValListItem(this);
    }
    toString() {
        return 'RadioValListItemAspect';
    }
}

export class RadioValDictionary extends RIAPP.MOD.collection.BaseDictionary<RadioValListItem, IRadioVal> {
    constructor() {
        super(RadioValListItemAspect, 'key', [{ name: 'key', dtype: 1 }, { name: 'value', dtype: 1 }, { name: 'comment', dtype: 1 }]);
    }
    findItem(key: string): RadioValListItem {
        return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
    }
    toString() {
        return 'RadioValDictionary';
    }
}

export class HistoryItemListItem extends RIAPP.BaseObject implements RIAPP.MOD.collection.IListItem, IHistoryItem {
    private f_aspect: HistoryItemListItemAspect;
    constructor(aspect: HistoryItemListItemAspect) {
        super();
        this.f_aspect = aspect;
    }
    get _aspect() { return this.f_aspect; }
    get _key() { return !!this.f_aspect ? this.f_aspect._key : null; }
    get radioValue(): string { return <string>this.f_aspect._getProp('radioValue'); }
    set radioValue(v: string) { this.f_aspect._setProp('radioValue', v); }
    get time(): Date { return <Date>this.f_aspect._getProp('time'); }
    set time(v: Date) { this.f_aspect._setProp('time', v); }

    toString() {
        return 'HistoryItemListItem';
    }
}

class HistoryItemListItemAspect extends RIAPP.MOD.collection.ListItemAspect<HistoryItemListItem, IHistoryItem>
{
    constructor(coll: RIAPP.MOD.collection.BaseList<HistoryItemListItem, IHistoryItem>, vals?: IHistoryItem) {
        super(coll, vals);
        this._item = new HistoryItemListItem(this);
    }
    toString() {
        return 'HistoryItemListItemAspect';
    }
}

export class HistoryList extends RIAPP.MOD.collection.BaseList<HistoryItemListItem, IHistoryItem> {
    constructor() {
        super(HistoryItemListItemAspect, [{ name: 'radioValue', dtype: 1 }, { name: 'time', dtype: 6 }]);
    }
    toString() {
        return 'HistoryList';
    }
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

    constructor(name: string, owner: RIAPP.MOD.db.EntityAspect<RIAPP.MOD.db.IEntityItem, RIAPP.MOD.db.DbSet<RIAPP.MOD.db.IEntityItem>, DbContext>) {
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

export class Customer extends RIAPP.BaseObject implements RIAPP.MOD.db.IEntityItem {
    private f_aspect: CustomerAspect;
    private _ComplexProp: Customer_ComplexProp;

    constructor(aspect: CustomerAspect) {
        super();
        this.f_aspect = aspect;
        this._ComplexProp = null;

    }
    destroy() {
        if (this._isDestroyed)
            return;
        this._isDestroyCalled = true;
        if (!!this._aspect && !this._aspect.getIsDestroyCalled()) {
            this._aspect.destroy();
        }
        super.destroy();
    }
    toString() {
        return 'Customer';
    }
    get _aspect() { return this.f_aspect; }
    get _key() { return !!this.f_aspect ? this.f_aspect._key : null; }
    get CustomerID(): number { return this.f_aspect._getFieldVal('CustomerID'); }
    get NameStyle(): boolean { return this.f_aspect._getFieldVal('NameStyle'); }
    set NameStyle(v: boolean) { this.f_aspect._setFieldVal('NameStyle', v); }
    get Title(): string { return this.f_aspect._getFieldVal('Title'); }
    set Title(v: string) { this.f_aspect._setFieldVal('Title', v); }
    get Suffix(): string { return this.f_aspect._getFieldVal('Suffix'); }
    set Suffix(v: string) { this.f_aspect._setFieldVal('Suffix', v); }
    get CompanyName(): string { return this.f_aspect._getFieldVal('CompanyName'); }
    set CompanyName(v: string) { this.f_aspect._setFieldVal('CompanyName', v); }
    get SalesPerson(): string { return this.f_aspect._getFieldVal('SalesPerson'); }
    set SalesPerson(v: string) { this.f_aspect._setFieldVal('SalesPerson', v); }
    get PasswordHash(): string { return this.f_aspect._getFieldVal('PasswordHash'); }
    get PasswordSalt(): string { return this.f_aspect._getFieldVal('PasswordSalt'); }
    get rowguid(): string { return this.f_aspect._getFieldVal('rowguid'); }
    get ModifiedDate(): Date { return this.f_aspect._getFieldVal('ModifiedDate'); }
    get ComplexProp(): Customer_ComplexProp { if (!this._ComplexProp) { this._ComplexProp = new Customer_ComplexProp('ComplexProp', this.f_aspect); } return this._ComplexProp; }
    get AddressCount(): number { return this.f_aspect._getFieldVal('AddressCount'); }
    set AddressCount(v: number) { this.f_aspect._setFieldVal('AddressCount', v); }
    get CustomerAddresses(): CustomerAddress[] { return this.f_aspect._getNavFieldVal('CustomerAddresses'); }

}

class CustomerAspect extends RIAPP.MOD.db.EntityAspect<Customer, CustomerDb, DbContext>
{
    constructor(dbSet: RIAPP.MOD.db.DbSet<Customer>, row: RIAPP.MOD.db.IRowData, names: RIAPP.MOD.db.IFieldName[]) {
        super(dbSet, row, names);
        this._item = new Customer(this);
    }
    toString() {
        return 'CustomerAspect';
    }
}

export class CustomerDb extends RIAPP.MOD.db.DbSet<Customer>
{
    constructor(dbContext: DbContext) {
        var self = this, opts: RIAPP.MOD.db.IDbSetConstuctorOptions = {
            dbContext: dbContext,
            dbSetInfo: { "fieldInfos": null, "enablePaging": true, "pageSize": 25, "dbSetName": "Customer" },
            childAssoc: ([]),
            parentAssoc: ([{ "name": "CustAddrToCustomer", "parentDbSetName": "Customer", "childDbSetName": "CustomerAddress", "childToParentName": "Customer", "parentToChildrenName": "CustomerAddresses", "onDeleteAction": 0, "fieldRels": [{ "parentField": "CustomerID", "childField": "CustomerID" }] }, { "name": "OrdersToCustomer", "parentDbSetName": "Customer", "childDbSetName": "SalesOrderHeader", "childToParentName": "Customer", "parentToChildrenName": null, "onDeleteAction": 0, "fieldRels": [{ "parentField": "CustomerID", "childField": "CustomerID" }] }])
        }, utils = RIAPP.global.utils;
        opts.dbSetInfo.fieldInfos = ([{ "fieldName": "CustomerID", "isPrimaryKey": 1, "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "NameStyle", "isPrimaryKey": 0, "dataType": 2, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Title", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Suffix", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 10, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "CompanyName", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 128, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "SalesPerson", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 256, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "PasswordHash", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 128, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "PasswordSalt", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 10, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "rowguid", "isPrimaryKey": 0, "dataType": 9, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 16, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 4, "dependentOn": "", "nested": null }, { "fieldName": "ModifiedDate", "isPrimaryKey": 0, "dataType": 6, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ComplexProp", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 5, "dependentOn": "", "nested": [{ "fieldName": "FirstName", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "MiddleName", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "LastName", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Name", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 2, "dependentOn": "ComplexProp.FirstName,ComplexProp.MiddleName,ComplexProp.LastName", "nested": null }, { "fieldName": "ComplexProp", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 5, "dependentOn": "", "nested": [{ "fieldName": "EmailAddress", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "^[_a-z0-9-]+(\\.[_a-z0-9-]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,4})$", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Phone", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 25, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }] }] }, { "fieldName": "AddressCount", "isPrimaryKey": 0, "dataType": 3, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 6, "dependentOn": "", "nested": null }, { "fieldName": "CustomerAddresses", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "", "nested": null }]);
        super(opts, CustomerAspect, Customer);
    }
    findEntity(customerID: number): Customer {
        return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
    }
    toString() {
        return 'CustomerDb';
    }
    createReadCustomerQuery(args?: {
        includeNav?: boolean;
    }) {
        var query = this.createQuery('ReadCustomer');
        query.params = args;
        return query;
    }

    defineComplexProp_NameField(getFunc: () => string) { this._defineCalculatedField('ComplexProp.Name', getFunc); }

}

export class CustomerAddress extends RIAPP.BaseObject implements RIAPP.MOD.db.IEntityItem {
    private f_aspect: CustomerAddressAspect;

    constructor(aspect: CustomerAddressAspect) {
        super();
        this.f_aspect = aspect;

    }
    destroy() {
        if (this._isDestroyed)
            return;
        this._isDestroyCalled = true;
        if (!!this._aspect && !this._aspect.getIsDestroyCalled()) {
            this._aspect.destroy();
        }
        super.destroy();
    }
    toString() {
        return 'CustomerAddress';
    }
    get _aspect() { return this.f_aspect; }
    get _key() { return !!this.f_aspect ? this.f_aspect._key : null; }
    get CustomerID(): number { return this.f_aspect._getFieldVal('CustomerID'); }
    set CustomerID(v: number) { this.f_aspect._setFieldVal('CustomerID', v); }
    get AddressID(): number { return this.f_aspect._getFieldVal('AddressID'); }
    set AddressID(v: number) { this.f_aspect._setFieldVal('AddressID', v); }
    get AddressType(): string { return this.f_aspect._getFieldVal('AddressType'); }
    set AddressType(v: string) { this.f_aspect._setFieldVal('AddressType', v); }
    get rowguid(): string { return this.f_aspect._getFieldVal('rowguid'); }
    get ModifiedDate(): Date { return this.f_aspect._getFieldVal('ModifiedDate'); }
    get Customer(): Customer { return this.f_aspect._getNavFieldVal('Customer'); }
    set Customer(v: Customer) { this.f_aspect._setNavFieldVal('Customer', v); }
    get Address(): Address { return this.f_aspect._getNavFieldVal('Address'); }
    set Address(v: Address) { this.f_aspect._setNavFieldVal('Address', v); }
    get AddressInfo(): AddressInfo { return this.f_aspect._getNavFieldVal('AddressInfo'); }
    set AddressInfo(v: AddressInfo) { this.f_aspect._setNavFieldVal('AddressInfo', v); }

}

class CustomerAddressAspect extends RIAPP.MOD.db.EntityAspect<CustomerAddress, CustomerAddressDb, DbContext>
{
    constructor(dbSet: RIAPP.MOD.db.DbSet<CustomerAddress>, row: RIAPP.MOD.db.IRowData, names: RIAPP.MOD.db.IFieldName[]) {
        super(dbSet, row, names);
        this._item = new CustomerAddress(this);
    }
    toString() {
        return 'CustomerAddressAspect';
    }
}

export class CustomerAddressDb extends RIAPP.MOD.db.DbSet<CustomerAddress>
{
    constructor(dbContext: DbContext) {
        var self = this, opts: RIAPP.MOD.db.IDbSetConstuctorOptions = {
            dbContext: dbContext,
            dbSetInfo: { "fieldInfos": null, "enablePaging": false, "pageSize": 25, "dbSetName": "CustomerAddress" },
            childAssoc: ([{ "name": "CustAddrToCustomer", "parentDbSetName": "Customer", "childDbSetName": "CustomerAddress", "childToParentName": "Customer", "parentToChildrenName": "CustomerAddresses", "onDeleteAction": 0, "fieldRels": [{ "parentField": "CustomerID", "childField": "CustomerID" }] }, { "name": "CustAddrToAddress", "parentDbSetName": "Address", "childDbSetName": "CustomerAddress", "childToParentName": "Address", "parentToChildrenName": "CustomerAddresses", "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "AddressID" }] }, { "name": "CustAddrToAddress2", "parentDbSetName": "AddressInfo", "childDbSetName": "CustomerAddress", "childToParentName": "AddressInfo", "parentToChildrenName": "CustomerAddresses", "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "AddressID" }] }]),
            parentAssoc: ([])
        }, utils = RIAPP.global.utils;
        opts.dbSetInfo.fieldInfos = ([{ "fieldName": "CustomerID", "isPrimaryKey": 1, "dataType": 3, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "AddressID", "isPrimaryKey": 2, "dataType": 3, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "AddressType", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": false, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "rowguid", "isPrimaryKey": 0, "dataType": 9, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 16, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 4, "dependentOn": "", "nested": null }, { "fieldName": "ModifiedDate", "isPrimaryKey": 0, "dataType": 6, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": false, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Customer", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "CustomerID", "nested": null }, { "fieldName": "Address", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "AddressID", "nested": null }, { "fieldName": "AddressInfo", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "AddressID", "nested": null }]);
        super(opts, CustomerAddressAspect, CustomerAddress);
    }
    findEntity(customerID: number, addressID: number): CustomerAddress {
        return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
    }
    toString() {
        return 'CustomerAddressDb';
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


}

export class Address extends RIAPP.BaseObject implements RIAPP.MOD.db.IEntityItem {
    private f_aspect: AddressAspect;

    constructor(aspect: AddressAspect) {
        super();
        this.f_aspect = aspect;

    }
    destroy() {
        if (this._isDestroyed)
            return;
        this._isDestroyCalled = true;
        if (!!this._aspect && !this._aspect.getIsDestroyCalled()) {
            this._aspect.destroy();
        }
        super.destroy();
    }
    toString() {
        return 'Address';
    }
    get _aspect() { return this.f_aspect; }
    get _key() { return !!this.f_aspect ? this.f_aspect._key : null; }
    get AddressID(): number { return this.f_aspect._getFieldVal('AddressID'); }
    get AddressLine1(): string { return this.f_aspect._getFieldVal('AddressLine1'); }
    set AddressLine1(v: string) { this.f_aspect._setFieldVal('AddressLine1', v); }
    get AddressLine2(): string { return this.f_aspect._getFieldVal('AddressLine2'); }
    set AddressLine2(v: string) { this.f_aspect._setFieldVal('AddressLine2', v); }
    get City(): string { return this.f_aspect._getFieldVal('City'); }
    set City(v: string) { this.f_aspect._setFieldVal('City', v); }
    get StateProvince(): string { return this.f_aspect._getFieldVal('StateProvince'); }
    set StateProvince(v: string) { this.f_aspect._setFieldVal('StateProvince', v); }
    get CountryRegion(): string { return this.f_aspect._getFieldVal('CountryRegion'); }
    set CountryRegion(v: string) { this.f_aspect._setFieldVal('CountryRegion', v); }
    get PostalCode(): string { return this.f_aspect._getFieldVal('PostalCode'); }
    set PostalCode(v: string) { this.f_aspect._setFieldVal('PostalCode', v); }
    get rowguid(): string { return this.f_aspect._getFieldVal('rowguid'); }
    get ModifiedDate(): Date { return this.f_aspect._getFieldVal('ModifiedDate'); }
    get CustomerAddresses(): CustomerAddress[] { return this.f_aspect._getNavFieldVal('CustomerAddresses'); }

}

class AddressAspect extends RIAPP.MOD.db.EntityAspect<Address, AddressDb, DbContext>
{
    constructor(dbSet: RIAPP.MOD.db.DbSet<Address>, row: RIAPP.MOD.db.IRowData, names: RIAPP.MOD.db.IFieldName[]) {
        super(dbSet, row, names);
        this._item = new Address(this);
    }
    toString() {
        return 'AddressAspect';
    }
}

export class AddressDb extends RIAPP.MOD.db.DbSet<Address>
{
    constructor(dbContext: DbContext) {
        var self = this, opts: RIAPP.MOD.db.IDbSetConstuctorOptions = {
            dbContext: dbContext,
            dbSetInfo: { "fieldInfos": null, "enablePaging": false, "pageSize": 25, "dbSetName": "Address" },
            childAssoc: ([]),
            parentAssoc: ([{ "name": "CustAddrToAddress", "parentDbSetName": "Address", "childDbSetName": "CustomerAddress", "childToParentName": "Address", "parentToChildrenName": "CustomerAddresses", "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "AddressID" }] }, { "name": "OrdersToShipAddr", "parentDbSetName": "Address", "childDbSetName": "SalesOrderHeader", "childToParentName": "Address", "parentToChildrenName": null, "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "ShipToAddressID" }] }, { "name": "OrdersToBillAddr", "parentDbSetName": "Address", "childDbSetName": "SalesOrderHeader", "childToParentName": "Address1", "parentToChildrenName": null, "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "BillToAddressID" }] }])
        }, utils = RIAPP.global.utils;
        opts.dbSetInfo.fieldInfos = ([{ "fieldName": "AddressID", "isPrimaryKey": 1, "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "AddressLine1", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 60, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "AddressLine2", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 60, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "City", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 30, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "StateProvince", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "CountryRegion", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "PostalCode", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 15, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "rowguid", "isPrimaryKey": 0, "dataType": 9, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 4, "dependentOn": "", "nested": null }, { "fieldName": "ModifiedDate", "isPrimaryKey": 0, "dataType": 6, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "CustomerAddresses", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "", "nested": null }]);
        super(opts, AddressAspect, Address);
    }
    findEntity(addressID: number): Address {
        return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
    }
    toString() {
        return 'AddressDb';
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


}

export class Product extends RIAPP.BaseObject implements RIAPP.MOD.db.IEntityItem {
    private f_aspect: ProductAspect;

    constructor(aspect: ProductAspect) {
        super();
        this.f_aspect = aspect;

    }
    destroy() {
        if (this._isDestroyed)
            return;
        this._isDestroyCalled = true;
        if (!!this._aspect && !this._aspect.getIsDestroyCalled()) {
            this._aspect.destroy();
        }
        super.destroy();
    }
    toString() {
        return 'Product';
    }
    get _aspect() { return this.f_aspect; }
    get _key() { return !!this.f_aspect ? this.f_aspect._key : null; }
    get ProductID(): number { return this.f_aspect._getFieldVal('ProductID'); }
    get Name(): string { return this.f_aspect._getFieldVal('Name'); }
    set Name(v: string) { this.f_aspect._setFieldVal('Name', v); }
    get ProductNumber(): string { return this.f_aspect._getFieldVal('ProductNumber'); }
    set ProductNumber(v: string) { this.f_aspect._setFieldVal('ProductNumber', v); }
    get Color(): string { return this.f_aspect._getFieldVal('Color'); }
    set Color(v: string) { this.f_aspect._setFieldVal('Color', v); }
    get StandardCost(): number { return this.f_aspect._getFieldVal('StandardCost'); }
    set StandardCost(v: number) { this.f_aspect._setFieldVal('StandardCost', v); }
    get ListPrice(): number { return this.f_aspect._getFieldVal('ListPrice'); }
    set ListPrice(v: number) { this.f_aspect._setFieldVal('ListPrice', v); }
    get Size(): string { return this.f_aspect._getFieldVal('Size'); }
    set Size(v: string) { this.f_aspect._setFieldVal('Size', v); }
    get Weight(): number { return this.f_aspect._getFieldVal('Weight'); }
    set Weight(v: number) { this.f_aspect._setFieldVal('Weight', v); }
    get ProductCategoryID(): number { return this.f_aspect._getFieldVal('ProductCategoryID'); }
    set ProductCategoryID(v: number) { this.f_aspect._setFieldVal('ProductCategoryID', v); }
    get ProductModelID(): number { return this.f_aspect._getFieldVal('ProductModelID'); }
    set ProductModelID(v: number) { this.f_aspect._setFieldVal('ProductModelID', v); }
    get SellStartDate(): Date { return this.f_aspect._getFieldVal('SellStartDate'); }
    set SellStartDate(v: Date) { this.f_aspect._setFieldVal('SellStartDate', v); }
    get SellEndDate(): Date { return this.f_aspect._getFieldVal('SellEndDate'); }
    set SellEndDate(v: Date) { this.f_aspect._setFieldVal('SellEndDate', v); }
    get DiscontinuedDate(): Date { return this.f_aspect._getFieldVal('DiscontinuedDate'); }
    set DiscontinuedDate(v: Date) { this.f_aspect._setFieldVal('DiscontinuedDate', v); }
    get rowguid(): string { return this.f_aspect._getFieldVal('rowguid'); }
    get ModifiedDate(): Date { return this.f_aspect._getFieldVal('ModifiedDate'); }
    get IsActive(): boolean { return this.f_aspect._getCalcFieldVal('IsActive'); }
    get ThumbnailPhotoFileName(): string { return this.f_aspect._getFieldVal('ThumbnailPhotoFileName'); }
    set ThumbnailPhotoFileName(v: string) { this.f_aspect._setFieldVal('ThumbnailPhotoFileName', v); }
    get SalesOrderDetails(): SalesOrderDetail[] { return this.f_aspect._getNavFieldVal('SalesOrderDetails'); }

}

class ProductAspect extends RIAPP.MOD.db.EntityAspect<Product, ProductDb, DbContext>
{
    constructor(dbSet: RIAPP.MOD.db.DbSet<Product>, row: RIAPP.MOD.db.IRowData, names: RIAPP.MOD.db.IFieldName[]) {
        super(dbSet, row, names);
        this._item = new Product(this);
    }
    toString() {
        return 'ProductAspect';
    }
}

export class ProductDb extends RIAPP.MOD.db.DbSet<Product>
{
    constructor(dbContext: DbContext) {
        var self = this, opts: RIAPP.MOD.db.IDbSetConstuctorOptions = {
            dbContext: dbContext,
            dbSetInfo: { "fieldInfos": null, "enablePaging": true, "pageSize": 25, "dbSetName": "Product" },
            childAssoc: ([]),
            parentAssoc: ([{ "name": "OrdDetailsToProduct", "parentDbSetName": "Product", "childDbSetName": "SalesOrderDetail", "childToParentName": "Product", "parentToChildrenName": "SalesOrderDetails", "onDeleteAction": 0, "fieldRels": [{ "parentField": "ProductID", "childField": "ProductID" }] }])
        }, utils = RIAPP.global.utils;
        opts.dbSetInfo.fieldInfos = ([{ "fieldName": "ProductID", "isPrimaryKey": 1, "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Name", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": false, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ProductNumber", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": false, "maxLength": 25, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Color", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": false, "maxLength": 15, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "StandardCost", "isPrimaryKey": 0, "dataType": 4, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": false, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ListPrice", "isPrimaryKey": 0, "dataType": 4, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": false, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "100,5000", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Size", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": false, "maxLength": 5, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Weight", "isPrimaryKey": 0, "dataType": 4, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": false, "maxLength": 5, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ProductCategoryID", "isPrimaryKey": 0, "dataType": 3, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": false, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ProductModelID", "isPrimaryKey": 0, "dataType": 3, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": false, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "SellStartDate", "isPrimaryKey": 0, "dataType": 7, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "2000-01-01,2015-01-01", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "SellEndDate", "isPrimaryKey": 0, "dataType": 7, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "DiscontinuedDate", "isPrimaryKey": 0, "dataType": 7, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": false, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "rowguid", "isPrimaryKey": 0, "dataType": 9, "isNullable": false, "isReadOnly": true, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 16, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 4, "dependentOn": "", "nested": null }, { "fieldName": "ModifiedDate", "isPrimaryKey": 0, "dataType": 6, "isNullable": false, "isReadOnly": true, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "IsActive", "isPrimaryKey": 0, "dataType": 2, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 2, "dependentOn": "SellEndDate", "nested": null }, { "fieldName": "ThumbnailPhotoFileName", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": false, "maxLength": 256, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "SalesOrderDetails", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "", "nested": null }]);
        super(opts, ProductAspect, Product);
    }
    findEntity(productID: number): Product {
        return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
    }
    toString() {
        return 'ProductDb';
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

}

export class ProductModel extends RIAPP.BaseObject implements RIAPP.MOD.db.IEntityItem {
    private f_aspect: ProductModelAspect;

    constructor(aspect: ProductModelAspect) {
        super();
        this.f_aspect = aspect;

    }
    destroy() {
        if (this._isDestroyed)
            return;
        this._isDestroyCalled = true;
        if (!!this._aspect && !this._aspect.getIsDestroyCalled()) {
            this._aspect.destroy();
        }
        super.destroy();
    }
    toString() {
        return 'ProductModel';
    }
    get _aspect() { return this.f_aspect; }
    get _key() { return !!this.f_aspect ? this.f_aspect._key : null; }
    get ProductModelID(): number { return this.f_aspect._getFieldVal('ProductModelID'); }
    get Name(): string { return this.f_aspect._getFieldVal('Name'); }
    set Name(v: string) { this.f_aspect._setFieldVal('Name', v); }

}

class ProductModelAspect extends RIAPP.MOD.db.EntityAspect<ProductModel, ProductModelDb, DbContext>
{
    constructor(dbSet: RIAPP.MOD.db.DbSet<ProductModel>, row: RIAPP.MOD.db.IRowData, names: RIAPP.MOD.db.IFieldName[]) {
        super(dbSet, row, names);
        this._item = new ProductModel(this);
    }
    toString() {
        return 'ProductModelAspect';
    }
}

export class ProductModelDb extends RIAPP.MOD.db.DbSet<ProductModel>
{
    constructor(dbContext: DbContext) {
        var self = this, opts: RIAPP.MOD.db.IDbSetConstuctorOptions = {
            dbContext: dbContext,
            dbSetInfo: { "fieldInfos": null, "enablePaging": false, "pageSize": 25, "dbSetName": "ProductModel" },
            childAssoc: ([]),
            parentAssoc: ([])
        }, utils = RIAPP.global.utils;
        opts.dbSetInfo.fieldInfos = ([{ "fieldName": "ProductModelID", "isPrimaryKey": 1, "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Name", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }]);
        super(opts, ProductModelAspect, ProductModel);
    }
    findEntity(productModelID: number): ProductModel {
        return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
    }
    toString() {
        return 'ProductModelDb';
    }
    createReadProductModelQuery() {
        return this.createQuery('ReadProductModel');
    }


}

export class SalesOrderHeader extends RIAPP.BaseObject implements RIAPP.MOD.db.IEntityItem {
    private f_aspect: SalesOrderHeaderAspect;

    constructor(aspect: SalesOrderHeaderAspect) {
        super();
        this.f_aspect = aspect;

    }
    destroy() {
        if (this._isDestroyed)
            return;
        this._isDestroyCalled = true;
        if (!!this._aspect && !this._aspect.getIsDestroyCalled()) {
            this._aspect.destroy();
        }
        super.destroy();
    }
    toString() {
        return 'SalesOrderHeader';
    }
    get _aspect() { return this.f_aspect; }
    get _key() { return !!this.f_aspect ? this.f_aspect._key : null; }
    get SalesOrderID(): number { return this.f_aspect._getFieldVal('SalesOrderID'); }
    get RevisionNumber(): number { return this.f_aspect._getFieldVal('RevisionNumber'); }
    get OrderDate(): Date { return this.f_aspect._getFieldVal('OrderDate'); }
    set OrderDate(v: Date) { this.f_aspect._setFieldVal('OrderDate', v); }
    get DueDate(): Date { return this.f_aspect._getFieldVal('DueDate'); }
    set DueDate(v: Date) { this.f_aspect._setFieldVal('DueDate', v); }
    get ShipDate(): Date { return this.f_aspect._getFieldVal('ShipDate'); }
    set ShipDate(v: Date) { this.f_aspect._setFieldVal('ShipDate', v); }
    get Status(): number { return this.f_aspect._getFieldVal('Status'); }
    get OnlineOrderFlag(): boolean { return this.f_aspect._getFieldVal('OnlineOrderFlag'); }
    set OnlineOrderFlag(v: boolean) { this.f_aspect._setFieldVal('OnlineOrderFlag', v); }
    get SalesOrderNumber(): string { return this.f_aspect._getFieldVal('SalesOrderNumber'); }
    get PurchaseOrderNumber(): string { return this.f_aspect._getFieldVal('PurchaseOrderNumber'); }
    get AccountNumber(): string { return this.f_aspect._getFieldVal('AccountNumber'); }
    set AccountNumber(v: string) { this.f_aspect._setFieldVal('AccountNumber', v); }
    get CustomerID(): number { return this.f_aspect._getFieldVal('CustomerID'); }
    set CustomerID(v: number) { this.f_aspect._setFieldVal('CustomerID', v); }
    get ShipToAddressID(): number { return this.f_aspect._getFieldVal('ShipToAddressID'); }
    set ShipToAddressID(v: number) { this.f_aspect._setFieldVal('ShipToAddressID', v); }
    get BillToAddressID(): number { return this.f_aspect._getFieldVal('BillToAddressID'); }
    set BillToAddressID(v: number) { this.f_aspect._setFieldVal('BillToAddressID', v); }
    get ShipMethod(): string { return this.f_aspect._getFieldVal('ShipMethod'); }
    set ShipMethod(v: string) { this.f_aspect._setFieldVal('ShipMethod', v); }
    get CreditCardApprovalCode(): string { return this.f_aspect._getFieldVal('CreditCardApprovalCode'); }
    set CreditCardApprovalCode(v: string) { this.f_aspect._setFieldVal('CreditCardApprovalCode', v); }
    get SubTotal(): number { return this.f_aspect._getFieldVal('SubTotal'); }
    get TaxAmt(): number { return this.f_aspect._getFieldVal('TaxAmt'); }
    get Freight(): number { return this.f_aspect._getFieldVal('Freight'); }
    get TotalDue(): number { return this.f_aspect._getFieldVal('TotalDue'); }
    get Comment(): string { return this.f_aspect._getFieldVal('Comment'); }
    set Comment(v: string) { this.f_aspect._setFieldVal('Comment', v); }
    get rowguid(): string { return this.f_aspect._getFieldVal('rowguid'); }
    get ModifiedDate(): Date { return this.f_aspect._getFieldVal('ModifiedDate'); }
    get SalesOrderDetails(): SalesOrderDetail[] { return this.f_aspect._getNavFieldVal('SalesOrderDetails'); }
    get Customer(): Customer { return this.f_aspect._getNavFieldVal('Customer'); }
    set Customer(v: Customer) { this.f_aspect._setNavFieldVal('Customer', v); }
    get Address(): Address { return this.f_aspect._getNavFieldVal('Address'); }
    set Address(v: Address) { this.f_aspect._setNavFieldVal('Address', v); }
    get Address1(): Address { return this.f_aspect._getNavFieldVal('Address1'); }
    set Address1(v: Address) { this.f_aspect._setNavFieldVal('Address1', v); }

}

class SalesOrderHeaderAspect extends RIAPP.MOD.db.EntityAspect<SalesOrderHeader, SalesOrderHeaderDb, DbContext>
{
    constructor(dbSet: RIAPP.MOD.db.DbSet<SalesOrderHeader>, row: RIAPP.MOD.db.IRowData, names: RIAPP.MOD.db.IFieldName[]) {
        super(dbSet, row, names);
        this._item = new SalesOrderHeader(this);
    }
    toString() {
        return 'SalesOrderHeaderAspect';
    }
}

export class SalesOrderHeaderDb extends RIAPP.MOD.db.DbSet<SalesOrderHeader>
{
    constructor(dbContext: DbContext) {
        var self = this, opts: RIAPP.MOD.db.IDbSetConstuctorOptions = {
            dbContext: dbContext,
            dbSetInfo: { "fieldInfos": null, "enablePaging": false, "pageSize": 25, "dbSetName": "SalesOrderHeader" },
            childAssoc: ([{ "name": "OrdersToCustomer", "parentDbSetName": "Customer", "childDbSetName": "SalesOrderHeader", "childToParentName": "Customer", "parentToChildrenName": null, "onDeleteAction": 0, "fieldRels": [{ "parentField": "CustomerID", "childField": "CustomerID" }] }, { "name": "OrdersToShipAddr", "parentDbSetName": "Address", "childDbSetName": "SalesOrderHeader", "childToParentName": "Address", "parentToChildrenName": null, "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "ShipToAddressID" }] }, { "name": "OrdersToBillAddr", "parentDbSetName": "Address", "childDbSetName": "SalesOrderHeader", "childToParentName": "Address1", "parentToChildrenName": null, "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "BillToAddressID" }] }]),
            parentAssoc: ([{ "name": "OrdDetailsToOrder", "parentDbSetName": "SalesOrderHeader", "childDbSetName": "SalesOrderDetail", "childToParentName": "SalesOrderHeader", "parentToChildrenName": "SalesOrderDetails", "onDeleteAction": 1, "fieldRels": [{ "parentField": "SalesOrderID", "childField": "SalesOrderID" }] }])
        }, utils = RIAPP.global.utils;
        opts.dbSetInfo.fieldInfos = ([{ "fieldName": "SalesOrderID", "isPrimaryKey": 1, "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "RevisionNumber", "isPrimaryKey": 0, "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "OrderDate", "isPrimaryKey": 0, "dataType": 7, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "DueDate", "isPrimaryKey": 0, "dataType": 7, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ShipDate", "isPrimaryKey": 0, "dataType": 7, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Status", "isPrimaryKey": 0, "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "OnlineOrderFlag", "isPrimaryKey": 0, "dataType": 2, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "SalesOrderNumber", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 25, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "PurchaseOrderNumber", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 25, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "AccountNumber", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 15, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "CustomerID", "isPrimaryKey": 0, "dataType": 3, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ShipToAddressID", "isPrimaryKey": 0, "dataType": 3, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "BillToAddressID", "isPrimaryKey": 0, "dataType": 3, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ShipMethod", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "CreditCardApprovalCode", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 15, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "SubTotal", "isPrimaryKey": 0, "dataType": 4, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "TaxAmt", "isPrimaryKey": 0, "dataType": 4, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Freight", "isPrimaryKey": 0, "dataType": 4, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "TotalDue", "isPrimaryKey": 0, "dataType": 4, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Comment", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 0, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "rowguid", "isPrimaryKey": 0, "dataType": 9, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 16, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ModifiedDate", "isPrimaryKey": 0, "dataType": 6, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "SalesOrderDetails", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "", "nested": null }, { "fieldName": "Customer", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "CustomerID", "nested": null }, { "fieldName": "Address", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "ShipToAddressID", "nested": null }, { "fieldName": "Address1", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "BillToAddressID", "nested": null }]);
        super(opts, SalesOrderHeaderAspect, SalesOrderHeader);
    }
    findEntity(salesOrderID: number): SalesOrderHeader {
        return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
    }
    toString() {
        return 'SalesOrderHeaderDb';
    }
    createReadSalesOrderHeaderQuery() {
        return this.createQuery('ReadSalesOrderHeader');
    }


}

export class SalesOrderDetail extends RIAPP.BaseObject implements RIAPP.MOD.db.IEntityItem {
    private f_aspect: SalesOrderDetailAspect;

    constructor(aspect: SalesOrderDetailAspect) {
        super();
        this.f_aspect = aspect;

    }
    destroy() {
        if (this._isDestroyed)
            return;
        this._isDestroyCalled = true;
        if (!!this._aspect && !this._aspect.getIsDestroyCalled()) {
            this._aspect.destroy();
        }
        super.destroy();
    }
    toString() {
        return 'SalesOrderDetail';
    }
    get _aspect() { return this.f_aspect; }
    get _key() { return !!this.f_aspect ? this.f_aspect._key : null; }
    get SalesOrderID(): number { return this.f_aspect._getFieldVal('SalesOrderID'); }
    set SalesOrderID(v: number) { this.f_aspect._setFieldVal('SalesOrderID', v); }
    get SalesOrderDetailID(): number { return this.f_aspect._getFieldVal('SalesOrderDetailID'); }
    get OrderQty(): number { return this.f_aspect._getFieldVal('OrderQty'); }
    set OrderQty(v: number) { this.f_aspect._setFieldVal('OrderQty', v); }
    get ProductID(): number { return this.f_aspect._getFieldVal('ProductID'); }
    set ProductID(v: number) { this.f_aspect._setFieldVal('ProductID', v); }
    get UnitPrice(): number { return this.f_aspect._getFieldVal('UnitPrice'); }
    get UnitPriceDiscount(): number { return this.f_aspect._getFieldVal('UnitPriceDiscount'); }
    get LineTotal(): number { return this.f_aspect._getFieldVal('LineTotal'); }
    get rowguid(): string { return this.f_aspect._getFieldVal('rowguid'); }
    get ModifiedDate(): Date { return this.f_aspect._getFieldVal('ModifiedDate'); }
    get SalesOrderHeader(): SalesOrderHeader { return this.f_aspect._getNavFieldVal('SalesOrderHeader'); }
    set SalesOrderHeader(v: SalesOrderHeader) { this.f_aspect._setNavFieldVal('SalesOrderHeader', v); }
    get Product(): Product { return this.f_aspect._getNavFieldVal('Product'); }
    set Product(v: Product) { this.f_aspect._setNavFieldVal('Product', v); }

}

class SalesOrderDetailAspect extends RIAPP.MOD.db.EntityAspect<SalesOrderDetail, SalesOrderDetailDb, DbContext>
{
    constructor(dbSet: RIAPP.MOD.db.DbSet<SalesOrderDetail>, row: RIAPP.MOD.db.IRowData, names: RIAPP.MOD.db.IFieldName[]) {
        super(dbSet, row, names);
        this._item = new SalesOrderDetail(this);
    }
    toString() {
        return 'SalesOrderDetailAspect';
    }
}

export class SalesOrderDetailDb extends RIAPP.MOD.db.DbSet<SalesOrderDetail>
{
    constructor(dbContext: DbContext) {
        var self = this, opts: RIAPP.MOD.db.IDbSetConstuctorOptions = {
            dbContext: dbContext,
            dbSetInfo: { "fieldInfos": null, "enablePaging": false, "pageSize": 25, "dbSetName": "SalesOrderDetail" },
            childAssoc: ([{ "name": "OrdDetailsToOrder", "parentDbSetName": "SalesOrderHeader", "childDbSetName": "SalesOrderDetail", "childToParentName": "SalesOrderHeader", "parentToChildrenName": "SalesOrderDetails", "onDeleteAction": 1, "fieldRels": [{ "parentField": "SalesOrderID", "childField": "SalesOrderID" }] }, { "name": "OrdDetailsToProduct", "parentDbSetName": "Product", "childDbSetName": "SalesOrderDetail", "childToParentName": "Product", "parentToChildrenName": "SalesOrderDetails", "onDeleteAction": 0, "fieldRels": [{ "parentField": "ProductID", "childField": "ProductID" }] }]),
            parentAssoc: ([])
        }, utils = RIAPP.global.utils;
        opts.dbSetInfo.fieldInfos = ([{ "fieldName": "SalesOrderID", "isPrimaryKey": 1, "dataType": 3, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "SalesOrderDetailID", "isPrimaryKey": 2, "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "OrderQty", "isPrimaryKey": 0, "dataType": 3, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 2, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ProductID", "isPrimaryKey": 0, "dataType": 3, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "UnitPrice", "isPrimaryKey": 0, "dataType": 4, "isNullable": true, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "UnitPriceDiscount", "isPrimaryKey": 0, "dataType": 4, "isNullable": true, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "LineTotal", "isPrimaryKey": 0, "dataType": 4, "isNullable": false, "isReadOnly": true, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 17, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "rowguid", "isPrimaryKey": 0, "dataType": 9, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 16, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ModifiedDate", "isPrimaryKey": 0, "dataType": 6, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "SalesOrderHeader", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "SalesOrderID", "nested": null }, { "fieldName": "Product", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "ProductID", "nested": null }]);
        super(opts, SalesOrderDetailAspect, SalesOrderDetail);
    }
    findEntity(salesOrderID: number, salesOrderDetailID: number): SalesOrderDetail {
        return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
    }
    toString() {
        return 'SalesOrderDetailDb';
    }
    createReadSalesOrderDetailQuery() {
        return this.createQuery('ReadSalesOrderDetail');
    }


}

export class ProductCategory extends RIAPP.BaseObject implements RIAPP.MOD.db.IEntityItem {
    private f_aspect: ProductCategoryAspect;

    constructor(aspect: ProductCategoryAspect) {
        super();
        this.f_aspect = aspect;

    }
    destroy() {
        if (this._isDestroyed)
            return;
        this._isDestroyCalled = true;
        if (!!this._aspect && !this._aspect.getIsDestroyCalled()) {
            this._aspect.destroy();
        }
        super.destroy();
    }
    toString() {
        return 'ProductCategory';
    }
    get _aspect() { return this.f_aspect; }
    get _key() { return !!this.f_aspect ? this.f_aspect._key : null; }
    get ProductCategoryID(): number { return this.f_aspect._getFieldVal('ProductCategoryID'); }
    get ParentProductCategoryID(): number { return this.f_aspect._getFieldVal('ParentProductCategoryID'); }
    set ParentProductCategoryID(v: number) { this.f_aspect._setFieldVal('ParentProductCategoryID', v); }
    get Name(): string { return this.f_aspect._getFieldVal('Name'); }
    set Name(v: string) { this.f_aspect._setFieldVal('Name', v); }
    get rowguid(): string { return this.f_aspect._getFieldVal('rowguid'); }
    set rowguid(v: string) { this.f_aspect._setFieldVal('rowguid', v); }
    get ModifiedDate(): Date { return this.f_aspect._getFieldVal('ModifiedDate'); }
    set ModifiedDate(v: Date) { this.f_aspect._setFieldVal('ModifiedDate', v); }

}

class ProductCategoryAspect extends RIAPP.MOD.db.EntityAspect<ProductCategory, ProductCategoryDb, DbContext>
{
    constructor(dbSet: RIAPP.MOD.db.DbSet<ProductCategory>, row: RIAPP.MOD.db.IRowData, names: RIAPP.MOD.db.IFieldName[]) {
        super(dbSet, row, names);
        this._item = new ProductCategory(this);
    }
    toString() {
        return 'ProductCategoryAspect';
    }
}

export class ProductCategoryDb extends RIAPP.MOD.db.DbSet<ProductCategory>
{
    constructor(dbContext: DbContext) {
        var self = this, opts: RIAPP.MOD.db.IDbSetConstuctorOptions = {
            dbContext: dbContext,
            dbSetInfo: { "fieldInfos": null, "enablePaging": false, "pageSize": 25, "dbSetName": "ProductCategory" },
            childAssoc: ([]),
            parentAssoc: ([])
        }, utils = RIAPP.global.utils;
        opts.dbSetInfo.fieldInfos = ([{ "fieldName": "ProductCategoryID", "isPrimaryKey": 1, "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ParentProductCategoryID", "isPrimaryKey": 0, "dataType": 3, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Name", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "rowguid", "isPrimaryKey": 0, "dataType": 9, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 16, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 4, "dependentOn": "", "nested": null }, { "fieldName": "ModifiedDate", "isPrimaryKey": 0, "dataType": 6, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 8, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }]);
        super(opts, ProductCategoryAspect, ProductCategory);
    }
    findEntity(productCategoryID: number): ProductCategory {
        return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
    }
    toString() {
        return 'ProductCategoryDb';
    }
    createReadProductCategoryQuery() {
        return this.createQuery('ReadProductCategory');
    }


}

export class SalesInfo extends RIAPP.BaseObject implements RIAPP.MOD.db.IEntityItem {
    private f_aspect: SalesInfoAspect;

    constructor(aspect: SalesInfoAspect) {
        super();
        this.f_aspect = aspect;

    }
    destroy() {
        if (this._isDestroyed)
            return;
        this._isDestroyCalled = true;
        if (!!this._aspect && !this._aspect.getIsDestroyCalled()) {
            this._aspect.destroy();
        }
        super.destroy();
    }
    toString() {
        return 'SalesInfo';
    }
    get _aspect() { return this.f_aspect; }
    get _key() { return !!this.f_aspect ? this.f_aspect._key : null; }
    get SalesPerson(): string { return this.f_aspect._getFieldVal('SalesPerson'); }
    set SalesPerson(v: string) { this.f_aspect._setFieldVal('SalesPerson', v); }

}

class SalesInfoAspect extends RIAPP.MOD.db.EntityAspect<SalesInfo, SalesInfoDb, DbContext>
{
    constructor(dbSet: RIAPP.MOD.db.DbSet<SalesInfo>, row: RIAPP.MOD.db.IRowData, names: RIAPP.MOD.db.IFieldName[]) {
        super(dbSet, row, names);
        this._item = new SalesInfo(this);
    }
    toString() {
        return 'SalesInfoAspect';
    }
}

export class SalesInfoDb extends RIAPP.MOD.db.DbSet<SalesInfo>
{
    constructor(dbContext: DbContext) {
        var self = this, opts: RIAPP.MOD.db.IDbSetConstuctorOptions = {
            dbContext: dbContext,
            dbSetInfo: { "fieldInfos": null, "enablePaging": true, "pageSize": 25, "dbSetName": "SalesInfo" },
            childAssoc: ([]),
            parentAssoc: ([])
        }, utils = RIAPP.global.utils;
        opts.dbSetInfo.fieldInfos = ([{ "fieldName": "SalesPerson", "isPrimaryKey": 1, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }]);
        super(opts, SalesInfoAspect, SalesInfo);
    }
    findEntity(salesPerson: string): SalesInfo {
        return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
    }
    toString() {
        return 'SalesInfoDb';
    }
    createReadSalesInfoQuery() {
        return this.createQuery('ReadSalesInfo');
    }


}

export class LookUpProduct extends RIAPP.BaseObject implements RIAPP.MOD.db.IEntityItem {
    private f_aspect: LookUpProductAspect;

    constructor(aspect: LookUpProductAspect) {
        super();
        this.f_aspect = aspect;

    }
    destroy() {
        if (this._isDestroyed)
            return;
        this._isDestroyCalled = true;
        if (!!this._aspect && !this._aspect.getIsDestroyCalled()) {
            this._aspect.destroy();
        }
        super.destroy();
    }
    toString() {
        return 'LookUpProduct';
    }
    get _aspect() { return this.f_aspect; }
    get _key() { return !!this.f_aspect ? this.f_aspect._key : null; }
    get ProductID(): number { return this.f_aspect._getFieldVal('ProductID'); }
    set ProductID(v: number) { this.f_aspect._setFieldVal('ProductID', v); }
    get Name(): string { return this.f_aspect._getFieldVal('Name'); }
    set Name(v: string) { this.f_aspect._setFieldVal('Name', v); }

}

class LookUpProductAspect extends RIAPP.MOD.db.EntityAspect<LookUpProduct, LookUpProductDb, DbContext>
{
    constructor(dbSet: RIAPP.MOD.db.DbSet<LookUpProduct>, row: RIAPP.MOD.db.IRowData, names: RIAPP.MOD.db.IFieldName[]) {
        super(dbSet, row, names);
        this._item = new LookUpProduct(this);
    }
    toString() {
        return 'LookUpProductAspect';
    }
}

export class LookUpProductDb extends RIAPP.MOD.db.DbSet<LookUpProduct>
{
    constructor(dbContext: DbContext) {
        var self = this, opts: RIAPP.MOD.db.IDbSetConstuctorOptions = {
            dbContext: dbContext,
            dbSetInfo: { "fieldInfos": null, "enablePaging": true, "pageSize": 25, "dbSetName": "LookUpProduct" },
            childAssoc: ([]),
            parentAssoc: ([])
        }, utils = RIAPP.global.utils;
        opts.dbSetInfo.fieldInfos = ([{ "fieldName": "ProductID", "isPrimaryKey": 1, "dataType": 3, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Name", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }]);
        super(opts, LookUpProductAspect, LookUpProduct);
    }
    findEntity(productID: number): LookUpProduct {
        return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
    }
    toString() {
        return 'LookUpProductDb';
    }
    createReadProductLookUpQuery() {
        return this.createQuery('ReadProductLookUp');
    }


}

export class AddressInfo extends RIAPP.BaseObject implements RIAPP.MOD.db.IEntityItem {
    private f_aspect: AddressInfoAspect;

    constructor(aspect: AddressInfoAspect) {
        super();
        this.f_aspect = aspect;

    }
    destroy() {
        if (this._isDestroyed)
            return;
        this._isDestroyCalled = true;
        if (!!this._aspect && !this._aspect.getIsDestroyCalled()) {
            this._aspect.destroy();
        }
        super.destroy();
    }
    toString() {
        return 'AddressInfo';
    }
    get _aspect() { return this.f_aspect; }
    get _key() { return !!this.f_aspect ? this.f_aspect._key : null; }
    get AddressID(): number { return this.f_aspect._getFieldVal('AddressID'); }
    get AddressLine1(): string { return this.f_aspect._getFieldVal('AddressLine1'); }
    get City(): string { return this.f_aspect._getFieldVal('City'); }
    get StateProvince(): string { return this.f_aspect._getFieldVal('StateProvince'); }
    get CountryRegion(): string { return this.f_aspect._getFieldVal('CountryRegion'); }
    get CustomerAddresses(): CustomerAddress[] { return this.f_aspect._getNavFieldVal('CustomerAddresses'); }

}

class AddressInfoAspect extends RIAPP.MOD.db.EntityAspect<AddressInfo, AddressInfoDb, DbContext>
{
    constructor(dbSet: RIAPP.MOD.db.DbSet<AddressInfo>, row: RIAPP.MOD.db.IRowData, names: RIAPP.MOD.db.IFieldName[]) {
        super(dbSet, row, names);
        this._item = new AddressInfo(this);
    }
    toString() {
        return 'AddressInfoAspect';
    }
}

export class AddressInfoDb extends RIAPP.MOD.db.DbSet<AddressInfo>
{
    constructor(dbContext: DbContext) {
        var self = this, opts: RIAPP.MOD.db.IDbSetConstuctorOptions = {
            dbContext: dbContext,
            dbSetInfo: { "fieldInfos": null, "enablePaging": false, "pageSize": 25, "dbSetName": "AddressInfo" },
            childAssoc: ([]),
            parentAssoc: ([{ "name": "CustAddrToAddress2", "parentDbSetName": "AddressInfo", "childDbSetName": "CustomerAddress", "childToParentName": "AddressInfo", "parentToChildrenName": "CustomerAddresses", "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "AddressID" }] }])
        }, utils = RIAPP.global.utils;
        opts.dbSetInfo.fieldInfos = ([{ "fieldName": "AddressID", "isPrimaryKey": 1, "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 4, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "AddressLine1", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": true, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 200, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "City", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": true, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 30, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "StateProvince", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": true, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "CountryRegion", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": true, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 50, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "CustomerAddresses", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "", "nested": null }]);
        super(opts, AddressInfoAspect, AddressInfo);
    }
    findEntity(addressID: number): AddressInfo {
        return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
    }
    toString() {
        return 'AddressInfoDb';
    }
    createReadAddressInfoQuery() {
        return this.createQuery('ReadAddressInfo');
    }


}

export interface IAssocs {
    getCustAddrToCustomer: () => RIAPP.MOD.db.Association;
    getCustAddrToAddress: () => RIAPP.MOD.db.Association;
    getCustAddrToAddress2: () => RIAPP.MOD.db.Association;
    getOrdDetailsToOrder: () => RIAPP.MOD.db.Association;
    getOrdDetailsToProduct: () => RIAPP.MOD.db.Association;
    getOrdersToCustomer: () => RIAPP.MOD.db.Association;
    getOrdersToShipAddr: () => RIAPP.MOD.db.Association;
    getOrdersToBillAddr: () => RIAPP.MOD.db.Association;
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
    protected _initDbSets() {
        super._initDbSets();
        this._dbSets = new DbSets(this);
        var associations = [{ "name": "CustAddrToCustomer", "parentDbSetName": "Customer", "childDbSetName": "CustomerAddress", "childToParentName": "Customer", "parentToChildrenName": "CustomerAddresses", "onDeleteAction": 0, "fieldRels": [{ "parentField": "CustomerID", "childField": "CustomerID" }] }, { "name": "CustAddrToAddress", "parentDbSetName": "Address", "childDbSetName": "CustomerAddress", "childToParentName": "Address", "parentToChildrenName": "CustomerAddresses", "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "AddressID" }] }, { "name": "CustAddrToAddress2", "parentDbSetName": "AddressInfo", "childDbSetName": "CustomerAddress", "childToParentName": "AddressInfo", "parentToChildrenName": "CustomerAddresses", "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "AddressID" }] }, { "name": "OrdDetailsToOrder", "parentDbSetName": "SalesOrderHeader", "childDbSetName": "SalesOrderDetail", "childToParentName": "SalesOrderHeader", "parentToChildrenName": "SalesOrderDetails", "onDeleteAction": 1, "fieldRels": [{ "parentField": "SalesOrderID", "childField": "SalesOrderID" }] }, { "name": "OrdDetailsToProduct", "parentDbSetName": "Product", "childDbSetName": "SalesOrderDetail", "childToParentName": "Product", "parentToChildrenName": "SalesOrderDetails", "onDeleteAction": 0, "fieldRels": [{ "parentField": "ProductID", "childField": "ProductID" }] }, { "name": "OrdersToCustomer", "parentDbSetName": "Customer", "childDbSetName": "SalesOrderHeader", "childToParentName": "Customer", "parentToChildrenName": null, "onDeleteAction": 0, "fieldRels": [{ "parentField": "CustomerID", "childField": "CustomerID" }] }, { "name": "OrdersToShipAddr", "parentDbSetName": "Address", "childDbSetName": "SalesOrderHeader", "childToParentName": "Address", "parentToChildrenName": null, "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "ShipToAddressID" }] }, { "name": "OrdersToBillAddr", "parentDbSetName": "Address", "childDbSetName": "SalesOrderHeader", "childToParentName": "Address1", "parentToChildrenName": null, "onDeleteAction": 0, "fieldRels": [{ "parentField": "AddressID", "childField": "BillToAddressID" }] }];
        this._initAssociations(associations);
        var methods = [{ "methodName": "ReadProductLookUp", "parameters": [], "methodResult": true, "isQuery": true }, { "methodName": "ReadProduct", "parameters": [{ "name": "param1", "dataType": 3, "isArray": true, "isNullable": false, "dateConversion": 0, "ordinal": 0 }, { "name": "param2", "dataType": 1, "isArray": false, "isNullable": false, "dateConversion": 0, "ordinal": 1 }], "methodResult": true, "isQuery": true }, { "methodName": "ReadProductByIds", "parameters": [{ "name": "productIDs", "dataType": 3, "isArray": true, "isNullable": false, "dateConversion": 0, "ordinal": 0 }], "methodResult": true, "isQuery": true }, { "methodName": "ReadCustomer", "parameters": [{ "name": "includeNav", "dataType": 2, "isArray": false, "isNullable": true, "dateConversion": 0, "ordinal": 0 }], "methodResult": true, "isQuery": true }, { "methodName": "ReadAddress", "parameters": [], "methodResult": true, "isQuery": true }, { "methodName": "ReadAddressByIds", "parameters": [{ "name": "addressIDs", "dataType": 3, "isArray": true, "isNullable": false, "dateConversion": 0, "ordinal": 0 }], "methodResult": true, "isQuery": true }, { "methodName": "ReadCustomerAddress", "parameters": [], "methodResult": true, "isQuery": true }, { "methodName": "ReadAddressForCustomers", "parameters": [{ "name": "custIDs", "dataType": 3, "isArray": true, "isNullable": false, "dateConversion": 0, "ordinal": 0 }], "methodResult": true, "isQuery": true }, { "methodName": "ReadSalesOrderHeader", "parameters": [], "methodResult": true, "isQuery": true }, { "methodName": "ReadSalesOrderDetail", "parameters": [], "methodResult": true, "isQuery": true }, { "methodName": "ReadProductCategory", "parameters": [], "methodResult": true, "isQuery": true }, { "methodName": "ReadProductModel", "parameters": [], "methodResult": true, "isQuery": true }, { "methodName": "ReadSalesInfo", "parameters": [], "methodResult": true, "isQuery": true }, { "methodName": "ReadAddressInfo", "parameters": [], "methodResult": true, "isQuery": true }, { "methodName": "TestInvoke", "parameters": [{ "name": "param1", "dataType": 10, "isArray": false, "isNullable": false, "dateConversion": 0, "ordinal": 0 }, { "name": "param2", "dataType": 1, "isArray": false, "isNullable": false, "dateConversion": 0, "ordinal": 1 }], "methodResult": true, "isQuery": false }, { "methodName": "TestComplexInvoke", "parameters": [{ "name": "info", "dataType": 0, "isArray": false, "isNullable": false, "dateConversion": 0, "ordinal": 0 }, { "name": "keys", "dataType": 0, "isArray": true, "isNullable": false, "dateConversion": 0, "ordinal": 1 }], "methodResult": false, "isQuery": false }];
        this._initMethods(methods);
    }
    get associations() { return <IAssocs>this._assoc; }
    get dbSets() { return <DbSets>this._dbSets; }
    get serviceMethods() { return <ISvcMethods>this._svcMethods; }
}
/// <reference path="..\jriapp.ts"/>
module RIAPP
{
    'use strict';
    //the db interface (stongly typed classes for entities, DbSets and DbContext) generated by the RIAppDemoService
    //don't do changes here, because they will be lost when this db interface is regenerated!
    export module FOLDERBROWSER_SVC {
        var global = RIAPP.global, utils = global.utils;
        export interface ISvcMethods {
        }

        export interface IFileSystemObject extends MOD.utils.IEditable, MOD.utils.ISubmittable {
            Key: string;
            ParentKey: string;
            Name: string;
            Level: number;
            HasSubDirs: bool;
            IsFolder: bool;
            fullPath: string;
            Parent: FileSystemObject;
            Children: FileSystemObject[];

            getDbContext(): DbContext;
            getDbSet(): FileSystemObjectDb;
            _dbSet: FileSystemObjectDb;
        }

        export class FileSystemObject extends MOD.db.Entity implements IFileSystemObject {
            get Key() { return <string>this._getFieldVal('Key'); }
            get ParentKey() { return <string>this._getFieldVal('ParentKey'); }
            get Name() { return <string>this._getFieldVal('Name'); }
            get Level() { return <number>this._getFieldVal('Level'); }
            get HasSubDirs() { return <bool>this._getFieldVal('HasSubDirs'); }
            get IsFolder() { return <bool>this._getFieldVal('IsFolder'); }
            get fullPath() { return <string>this._dbSet._calcfldMap['fullPath'].getFunc.call(this); }
            get Parent() { return <FileSystemObject>this._dbSet._navfldMap['Parent'].getFunc.call(this); }
            set Parent(v: FileSystemObject) { this._dbSet._navfldMap['Parent'].setFunc.call(this, v); }
            get Children() { return <FileSystemObject[]>this._dbSet._navfldMap['Children'].getFunc.call(this); }

            getDbContext() {
                return <DbContext>super.getDbContext();
            }
            getDbSet() {
                return <FileSystemObjectDb>super.getDbSet();
            }
            get _dbSet() { return <FileSystemObjectDb>this.getDbSet(); }
            toString() {
                return 'FileSystemObject';
            }
        }

        export class FileSystemObjectDb extends MOD.db.DbSet {
            constructor(dbContext: DbContext) {
                var self = this, opts: MOD.db.IDbSetConstuctorOptions = {
                    dbContext: dbContext,
                    dbSetInfo: { "dbSetName": "FileSystemObject", "enablePaging": false, "fieldInfos": [{ "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": null, "fieldName": "Key", "isAutoGenerated": true, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 1, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 255, "range": null, "regex": null }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": null, "fieldName": "ParentKey", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 255, "range": null, "regex": null }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": null, "fieldName": "Name", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": 255, "range": null, "regex": null }, { "allowClientDefault": false, "dataType": 3, "dateConversion": 0, "dependentOn": null, "fieldName": "Level", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": -1, "range": null, "regex": null }, { "allowClientDefault": false, "dataType": 2, "dateConversion": 0, "dependentOn": null, "fieldName": "HasSubDirs", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": -1, "range": null, "regex": null }, { "allowClientDefault": false, "dataType": 2, "dateConversion": 0, "dependentOn": null, "fieldName": "IsFolder", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": false, "isPrimaryKey": 0, "isReadOnly": true, "isRowTimeStamp": false, "maxLength": -1, "range": null, "regex": null }, { "allowClientDefault": false, "dataType": 1, "dateConversion": 0, "dependentOn": null, "fieldName": "fullPath", "isAutoGenerated": false, "isCalculated": true, "isClientOnly": false, "isNavigation": false, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": -1, "range": null, "regex": null }, { "allowClientDefault": false, "dataType": 0, "dateConversion": 0, "dependentOn": "ParentKey", "fieldName": "Parent", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": true, "isNavigation": true, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": -1, "range": null, "regex": null }, { "allowClientDefault": false, "dataType": 0, "dateConversion": 0, "dependentOn": null, "fieldName": "Children", "isAutoGenerated": false, "isCalculated": false, "isClientOnly": true, "isNavigation": true, "isNeedOriginal": true, "isNullable": true, "isPrimaryKey": 0, "isReadOnly": false, "isRowTimeStamp": false, "maxLength": -1, "range": null, "regex": null }], "pageSize": 25 },
                    childAssoc: [{ "childDbSetName": "FileSystemObject", "childToParentName": "Parent", "fieldRels": [{ "childField": "ParentKey", "parentField": "Key" }], "name": "ChildToParent", "onDeleteAction": 1, "parentDbSetName": "FileSystemObject", "parentToChildrenName": "Children" }],
                    parentAssoc: [{ "childDbSetName": "FileSystemObject", "childToParentName": "Parent", "fieldRels": [{ "childField": "ParentKey", "parentField": "Key" }], "name": "ChildToParent", "onDeleteAction": 1, "parentDbSetName": "FileSystemObject", "parentToChildrenName": "Children" }]
                }, utils = RIAPP.global.utils;
                super(opts);
                self._entityType = FileSystemObject;

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
            createReadRootQuery(args?: {
                includeFiles: bool;
            }) {
                var query = this.createQuery('ReadRoot');
                query.params = args;
                return query;
            }
            createReadChildrenQuery(args?: {
                parentKey: string;
                level: number;
                path: string;
                includeFiles: bool;
            }) {
                var query = this.createQuery('ReadChildren');
                query.params = args;
                return query;
            }

            definefullPathField(getFunc: () => string) { this.defineCalculatedField('fullPath', getFunc); }

            addNew() {
                return <FileSystemObject>super.addNew();
            }
            getItemByPos(pos: number) {
                return <FileSystemObject>super.getItemByPos(pos);
            }
            getItemByKey(key: string) {
                return <FileSystemObject>super.getItemByKey(key);
            }
            findByPK(...vals: any[]) {
                return <FileSystemObject>super.findByPK(vals);
            }
            get items() { return <FileSystemObject[]>this._items; }
            get currentItem() { return this.getItemByPos(this._currentPos); }
            set currentItem(v: FileSystemObject) {
                this._setCurrentItem(v);
            }
        }

        export interface IDbSets {
            FileSystemObject: FileSystemObjectDb;
        }


        export interface IAssocs {
            getChildToParent: () => MOD.db.Association;
        }


        export class DbContext extends MOD.db.DbContext {
            constructor() {
                super();
                this._dbSetNames = ["FileSystemObject"];
                this._serverTimezone = -240;
            }
            _createDbSets() {
                var self = this;
                self._dbSets.FileSystemObject = new FileSystemObjectDb(this);

                super._createDbSets();
                var associations = [{ "childDbSetName": "FileSystemObject", "childToParentName": "Parent", "fieldRels": [{ "childField": "ParentKey", "parentField": "Key" }], "name": "ChildToParent", "onDeleteAction": 1, "parentDbSetName": "FileSystemObject", "parentToChildrenName": "Children" }];
                self._initAssociations(associations);
                var methods = [{ "isQuery": true, "methodName": "ReadRoot", "methodResult": true, "parameters": [{ "dataType": 2, "dateConversion": 0, "isArray": false, "isNullable": false, "name": "includeFiles", "ordinal": 1 }] }, { "isQuery": true, "methodName": "ReadChildren", "methodResult": true, "parameters": [{ "dataType": 1, "dateConversion": 0, "isArray": false, "isNullable": false, "name": "parentKey", "ordinal": 1 }, { "dataType": 3, "dateConversion": 0, "isArray": false, "isNullable": false, "name": "level", "ordinal": 2 }, { "dataType": 1, "dateConversion": 0, "isArray": false, "isNullable": false, "name": "path", "ordinal": 3 }, { "dataType": 2, "dateConversion": 0, "isArray": false, "isNullable": false, "name": "includeFiles", "ordinal": 4 }] }];
                self._initMethods(methods);
            }
            get associations() { return <IAssocs>this._assoc; }
            get dbSets() { return <IDbSets>this._dbSets; }
            get serviceMethods() { return <ISvcMethods>this._svcMethods; }
        }
    }
}

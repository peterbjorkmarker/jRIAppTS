/// <reference path="..\jriapp.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RIAPP;
(function (RIAPP) {
    var FOLDERBROWSER_SVC;
    (function (FOLDERBROWSER_SVC) {
        'use strict';
        var FileSystemObject = (function (_super) {
            __extends(FileSystemObject, _super);
            function FileSystemObject(aspect) {
                _super.call(this);
                this.f_aspect = aspect;
            }
            FileSystemObject.prototype.destroy = function () {
                if (this._isDestroyed)
                    return;
                this._isDestroyCalled = true;
                if (!!this._aspect && !this._aspect.getIsDestroyCalled()) {
                    this._aspect.destroy();
                }
                _super.prototype.destroy.call(this);
            };
            FileSystemObject.prototype.toString = function () {
                return 'FileSystemObject';
            };
            Object.defineProperty(FileSystemObject.prototype, "_aspect", {
                get: function () {
                    return this.f_aspect;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FileSystemObject.prototype, "_key", {
                get: function () {
                    return !!this.f_aspect ? this.f_aspect._key : null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FileSystemObject.prototype, "Key", {
                get: function () {
                    return this.f_aspect._getFieldVal('Key');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FileSystemObject.prototype, "ParentKey", {
                get: function () {
                    return this.f_aspect._getFieldVal('ParentKey');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FileSystemObject.prototype, "Name", {
                get: function () {
                    return this.f_aspect._getFieldVal('Name');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FileSystemObject.prototype, "Level", {
                get: function () {
                    return this.f_aspect._getFieldVal('Level');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FileSystemObject.prototype, "HasSubDirs", {
                get: function () {
                    return this.f_aspect._getFieldVal('HasSubDirs');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FileSystemObject.prototype, "IsFolder", {
                get: function () {
                    return this.f_aspect._getFieldVal('IsFolder');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FileSystemObject.prototype, "fullPath", {
                get: function () {
                    return this.f_aspect._getCalcFieldVal('fullPath');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FileSystemObject.prototype, "Parent", {
                get: function () {
                    return this.f_aspect._getNavFieldVal('Parent');
                },
                set: function (v) {
                    this.f_aspect._setNavFieldVal('Parent', v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FileSystemObject.prototype, "Children", {
                get: function () {
                    return this.f_aspect._getNavFieldVal('Children');
                },
                enumerable: true,
                configurable: true
            });
            return FileSystemObject;
        })(RIAPP.BaseObject);
        FOLDERBROWSER_SVC.FileSystemObject = FileSystemObject;
        var FileSystemObjectAspect = (function (_super) {
            __extends(FileSystemObjectAspect, _super);
            function FileSystemObjectAspect(dbSet, row, names) {
                _super.call(this, dbSet, row, names);
                this._item = new FileSystemObject(this);
            }
            FileSystemObjectAspect.prototype.toString = function () {
                return 'FileSystemObjectAspect';
            };
            return FileSystemObjectAspect;
        })(RIAPP.MOD.db.EntityAspect);
        var FileSystemObjectDb = (function (_super) {
            __extends(FileSystemObjectDb, _super);
            function FileSystemObjectDb(dbContext) {
                var self = this, opts = {
                    dbContext: dbContext,
                    dbSetInfo: { "fieldInfos": null, "enablePaging": false, "pageSize": 25, "dbSetName": "FileSystemObject" },
                    childAssoc: ([{ "name": "ChildToParent", "parentDbSetName": "FileSystemObject", "childDbSetName": "FileSystemObject", "childToParentName": "Parent", "parentToChildrenName": "Children", "onDeleteAction": 1, "fieldRels": [{ "parentField": "Key", "childField": "ParentKey" }] }]),
                    parentAssoc: ([{ "name": "ChildToParent", "parentDbSetName": "FileSystemObject", "childDbSetName": "FileSystemObject", "childToParentName": "Parent", "parentToChildrenName": "Children", "onDeleteAction": 1, "fieldRels": [{ "parentField": "Key", "childField": "ParentKey" }] }])
                }, utils = RIAPP.global.utils;
                opts.dbSetInfo.fieldInfos = ([{ "fieldName": "Key", "isPrimaryKey": 1, "dataType": 1, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 255, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ParentKey", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": true, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 255, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Name", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": true, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 255, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Level", "isPrimaryKey": 0, "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "HasSubDirs", "isPrimaryKey": 0, "dataType": 2, "isNullable": false, "isReadOnly": true, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "IsFolder", "isPrimaryKey": 0, "dataType": 2, "isNullable": false, "isReadOnly": true, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "fullPath", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 2, "dependentOn": "", "nested": null }, { "fieldName": "Parent", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "ParentKey", "nested": null }, { "fieldName": "Children", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "", "nested": null }]);
                _super.call(this, opts, FileSystemObjectAspect, FileSystemObject);
            }
            FileSystemObjectDb.prototype.findEntity = function (key) {
                return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
            };
            FileSystemObjectDb.prototype.toString = function () {
                return 'FileSystemObjectDb';
            };
            FileSystemObjectDb.prototype.createReadRootQuery = function (args) {
                var query = this.createQuery('ReadRoot');
                query.params = args;
                return query;
            };
            FileSystemObjectDb.prototype.createReadChildrenQuery = function (args) {
                var query = this.createQuery('ReadChildren');
                query.params = args;
                return query;
            };
            FileSystemObjectDb.prototype.definefullPathField = function (getFunc) {
                this._defineCalculatedField('fullPath', getFunc);
            };
            return FileSystemObjectDb;
        })(RIAPP.MOD.db.DbSet);
        FOLDERBROWSER_SVC.FileSystemObjectDb = FileSystemObjectDb;
        var DbSets = (function (_super) {
            __extends(DbSets, _super);
            function DbSets(dbContext) {
                _super.call(this, dbContext);
                this._dbSetNames = ["FileSystemObject"];
                this._createDbSet("FileSystemObject", FileSystemObjectDb);
            }
            Object.defineProperty(DbSets.prototype, "FileSystemObject", {
                get: function () {
                    return this.getDbSet("FileSystemObject");
                },
                enumerable: true,
                configurable: true
            });
            return DbSets;
        })(RIAPP.MOD.db.DbSets);
        FOLDERBROWSER_SVC.DbSets = DbSets;
        var DbContext = (function (_super) {
            __extends(DbContext, _super);
            function DbContext() {
                _super.apply(this, arguments);
            }
            DbContext.prototype._initDbSets = function () {
                _super.prototype._initDbSets.call(this);
                this._dbSets = new DbSets(this);
                var associations = [{ "name": "ChildToParent", "parentDbSetName": "FileSystemObject", "childDbSetName": "FileSystemObject", "childToParentName": "Parent", "parentToChildrenName": "Children", "onDeleteAction": 1, "fieldRels": [{ "parentField": "Key", "childField": "ParentKey" }] }];
                this._initAssociations(associations);
                var methods = [{ "methodName": "ReadRoot", "parameters": [{ "name": "includeFiles", "dataType": 2, "isArray": false, "isNullable": false, "dateConversion": 0, "ordinal": 0 }, { "name": "infoType", "dataType": 1, "isArray": false, "isNullable": false, "dateConversion": 0, "ordinal": 1 }], "methodResult": true, "isQuery": true }, { "methodName": "ReadChildren", "parameters": [{ "name": "parentKey", "dataType": 1, "isArray": false, "isNullable": false, "dateConversion": 0, "ordinal": 0 }, { "name": "level", "dataType": 3, "isArray": false, "isNullable": false, "dateConversion": 0, "ordinal": 1 }, { "name": "path", "dataType": 1, "isArray": false, "isNullable": false, "dateConversion": 0, "ordinal": 2 }, { "name": "includeFiles", "dataType": 2, "isArray": false, "isNullable": false, "dateConversion": 0, "ordinal": 3 }, { "name": "infoType", "dataType": 1, "isArray": false, "isNullable": false, "dateConversion": 0, "ordinal": 4 }], "methodResult": true, "isQuery": true }];
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
        FOLDERBROWSER_SVC.DbContext = DbContext;
    })(FOLDERBROWSER_SVC = RIAPP.FOLDERBROWSER_SVC || (RIAPP.FOLDERBROWSER_SVC = {}));
})(RIAPP || (RIAPP = {}));
//# sourceMappingURL=folderBrowserSvc.js.map
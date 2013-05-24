var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="..\jriapp.ts"/>
var RIAPP;
(function (RIAPP) {
    'use strict';
    //the db interface (stongly typed classes for entities, DbSets and DbContext) generated by the RIAppDemoService
    //don't do changes here, because they will be lost when this db interface is regenerated!
    (function (FOLDERBROWSER_SVC) {
        var global = RIAPP.global, utils = global.utils;
        var FileSystemObject = (function (_super) {
            __extends(FileSystemObject, _super);
            function FileSystemObject() {
                _super.apply(this, arguments);

            }
            Object.defineProperty(FileSystemObject.prototype, "Key", {
                get: function () {
                    return this._getFieldVal('Key');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FileSystemObject.prototype, "ParentKey", {
                get: function () {
                    return this._getFieldVal('ParentKey');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FileSystemObject.prototype, "Name", {
                get: function () {
                    return this._getFieldVal('Name');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FileSystemObject.prototype, "Level", {
                get: function () {
                    return this._getFieldVal('Level');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FileSystemObject.prototype, "HasSubDirs", {
                get: function () {
                    return this._getFieldVal('HasSubDirs');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FileSystemObject.prototype, "IsFolder", {
                get: function () {
                    return this._getFieldVal('IsFolder');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FileSystemObject.prototype, "fullPath", {
                get: function () {
                    return this._dbSet._calcfldMap['fullPath'].getFunc.call(this);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FileSystemObject.prototype, "Parent", {
                get: function () {
                    return this._dbSet._navfldMap['Parent'].getFunc.call(this);
                },
                set: function (v) {
                    this._dbSet._navfldMap['Parent'].setFunc.call(this, v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FileSystemObject.prototype, "Children", {
                get: function () {
                    return this._dbSet._navfldMap['Children'].getFunc.call(this);
                },
                enumerable: true,
                configurable: true
            });
            FileSystemObject.prototype.getDbContext = function () {
                return _super.prototype.getDbContext.call(this);
            };
            FileSystemObject.prototype.getDbSet = function () {
                return _super.prototype.getDbSet.call(this);
            };
            Object.defineProperty(FileSystemObject.prototype, "_dbSet", {
                get: function () {
                    return this.getDbSet();
                },
                enumerable: true,
                configurable: true
            });
            FileSystemObject.prototype.toString = function () {
                return 'FileSystemObject';
            };
            return FileSystemObject;
        })(RIAPP.MOD.db.Entity);
        FOLDERBROWSER_SVC.FileSystemObject = FileSystemObject;        
        var FileSystemObjectDb = (function (_super) {
            __extends(FileSystemObjectDb, _super);
            function FileSystemObjectDb(dbContext) {
                var self = this, opts = {
                    dbContext: dbContext,
                    dbSetInfo: {
                        "dbSetName": "FileSystemObject",
                        "enablePaging": false,
                        "fieldInfos": [
                            {
                                "allowClientDefault": false,
                                "dataType": 1,
                                "dateConversion": 0,
                                "dependentOn": null,
                                "fieldName": "Key",
                                "isAutoGenerated": true,
                                "isCalculated": false,
                                "isClientOnly": false,
                                "isNavigation": false,
                                "isNeedOriginal": true,
                                "isNullable": false,
                                "isPrimaryKey": 1,
                                "isReadOnly": true,
                                "isRowTimeStamp": false,
                                "maxLength": 255,
                                "range": null,
                                "regex": null
                            }, 
                            {
                                "allowClientDefault": false,
                                "dataType": 1,
                                "dateConversion": 0,
                                "dependentOn": null,
                                "fieldName": "ParentKey",
                                "isAutoGenerated": false,
                                "isCalculated": false,
                                "isClientOnly": false,
                                "isNavigation": false,
                                "isNeedOriginal": true,
                                "isNullable": true,
                                "isPrimaryKey": 0,
                                "isReadOnly": true,
                                "isRowTimeStamp": false,
                                "maxLength": 255,
                                "range": null,
                                "regex": null
                            }, 
                            {
                                "allowClientDefault": false,
                                "dataType": 1,
                                "dateConversion": 0,
                                "dependentOn": null,
                                "fieldName": "Name",
                                "isAutoGenerated": false,
                                "isCalculated": false,
                                "isClientOnly": false,
                                "isNavigation": false,
                                "isNeedOriginal": true,
                                "isNullable": false,
                                "isPrimaryKey": 0,
                                "isReadOnly": true,
                                "isRowTimeStamp": false,
                                "maxLength": 255,
                                "range": null,
                                "regex": null
                            }, 
                            {
                                "allowClientDefault": false,
                                "dataType": 3,
                                "dateConversion": 0,
                                "dependentOn": null,
                                "fieldName": "Level",
                                "isAutoGenerated": false,
                                "isCalculated": false,
                                "isClientOnly": false,
                                "isNavigation": false,
                                "isNeedOriginal": true,
                                "isNullable": false,
                                "isPrimaryKey": 0,
                                "isReadOnly": true,
                                "isRowTimeStamp": false,
                                "maxLength": -1,
                                "range": null,
                                "regex": null
                            }, 
                            {
                                "allowClientDefault": false,
                                "dataType": 2,
                                "dateConversion": 0,
                                "dependentOn": null,
                                "fieldName": "HasSubDirs",
                                "isAutoGenerated": false,
                                "isCalculated": false,
                                "isClientOnly": false,
                                "isNavigation": false,
                                "isNeedOriginal": true,
                                "isNullable": false,
                                "isPrimaryKey": 0,
                                "isReadOnly": true,
                                "isRowTimeStamp": false,
                                "maxLength": -1,
                                "range": null,
                                "regex": null
                            }, 
                            {
                                "allowClientDefault": false,
                                "dataType": 2,
                                "dateConversion": 0,
                                "dependentOn": null,
                                "fieldName": "IsFolder",
                                "isAutoGenerated": false,
                                "isCalculated": false,
                                "isClientOnly": false,
                                "isNavigation": false,
                                "isNeedOriginal": true,
                                "isNullable": false,
                                "isPrimaryKey": 0,
                                "isReadOnly": true,
                                "isRowTimeStamp": false,
                                "maxLength": -1,
                                "range": null,
                                "regex": null
                            }, 
                            {
                                "allowClientDefault": false,
                                "dataType": 1,
                                "dateConversion": 0,
                                "dependentOn": null,
                                "fieldName": "fullPath",
                                "isAutoGenerated": false,
                                "isCalculated": true,
                                "isClientOnly": false,
                                "isNavigation": false,
                                "isNeedOriginal": true,
                                "isNullable": true,
                                "isPrimaryKey": 0,
                                "isReadOnly": false,
                                "isRowTimeStamp": false,
                                "maxLength": -1,
                                "range": null,
                                "regex": null
                            }, 
                            {
                                "allowClientDefault": false,
                                "dataType": 0,
                                "dateConversion": 0,
                                "dependentOn": "ParentKey",
                                "fieldName": "Parent",
                                "isAutoGenerated": false,
                                "isCalculated": false,
                                "isClientOnly": true,
                                "isNavigation": true,
                                "isNeedOriginal": true,
                                "isNullable": true,
                                "isPrimaryKey": 0,
                                "isReadOnly": false,
                                "isRowTimeStamp": false,
                                "maxLength": -1,
                                "range": null,
                                "regex": null
                            }, 
                            {
                                "allowClientDefault": false,
                                "dataType": 0,
                                "dateConversion": 0,
                                "dependentOn": null,
                                "fieldName": "Children",
                                "isAutoGenerated": false,
                                "isCalculated": false,
                                "isClientOnly": true,
                                "isNavigation": true,
                                "isNeedOriginal": true,
                                "isNullable": true,
                                "isPrimaryKey": 0,
                                "isReadOnly": false,
                                "isRowTimeStamp": false,
                                "maxLength": -1,
                                "range": null,
                                "regex": null
                            }
                        ],
                        "pageSize": 25
                    },
                    childAssoc: [
                        {
                            "childDbSetName": "FileSystemObject",
                            "childToParentName": "Parent",
                            "fieldRels": [
                                {
                                    "childField": "ParentKey",
                                    "parentField": "Key"
                                }
                            ],
                            "name": "ChildToParent",
                            "onDeleteAction": 1,
                            "parentDbSetName": "FileSystemObject",
                            "parentToChildrenName": "Children"
                        }
                    ],
                    parentAssoc: [
                        {
                            "childDbSetName": "FileSystemObject",
                            "childToParentName": "Parent",
                            "fieldRels": [
                                {
                                    "childField": "ParentKey",
                                    "parentField": "Key"
                                }
                            ],
                            "name": "ChildToParent",
                            "onDeleteAction": 1,
                            "parentDbSetName": "FileSystemObject",
                            "parentToChildrenName": "Children"
                        }
                    ]
                }, utils = RIAPP.global.utils;
                        _super.call(this, opts);
                self._entityType = FileSystemObject;
                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    f.dependents = [];
                    self._fieldMap[f.fieldName] = f;
                });
                opts.dbSetInfo.fieldInfos.forEach(function (f) {
                    if(!!f.isNavigation) {
                        self._navfldMap[f.fieldName] = self._doNavigationField(opts, f);
                    } else if(!!f.isCalculated) {
                        self._calcfldMap[f.fieldName] = self._doCalculatedField(opts, f);
                    }
                });
                self._mapAssocFields();
            }
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
                this.defineCalculatedField('fullPath', getFunc);
            };
            FileSystemObjectDb.prototype.addNew = function () {
                return _super.prototype.addNew.call(this);
            };
            FileSystemObjectDb.prototype.getItemByPos = function (pos) {
                return _super.prototype.getItemByPos.call(this, pos);
            };
            FileSystemObjectDb.prototype.getItemByKey = function (key) {
                return _super.prototype.getItemByKey.call(this, key);
            };
            FileSystemObjectDb.prototype.findByPK = function () {
                var vals = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    vals[_i] = arguments[_i + 0];
                }
                return _super.prototype.findByPK.call(this, vals);
            };
            Object.defineProperty(FileSystemObjectDb.prototype, "items", {
                get: function () {
                    return this._items;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FileSystemObjectDb.prototype, "currentItem", {
                get: function () {
                    return this.getItemByPos(this._currentPos);
                },
                set: function (v) {
                    this._setCurrentItem(v);
                },
                enumerable: true,
                configurable: true
            });
            return FileSystemObjectDb;
        })(RIAPP.MOD.db.DbSet);
        FOLDERBROWSER_SVC.FileSystemObjectDb = FileSystemObjectDb;        
        var DbContext = (function (_super) {
            __extends(DbContext, _super);
            function DbContext() {
                        _super.call(this);
                this._dbSetNames = [
                    "FileSystemObject"
                ];
                this._serverTimezone = -240;
            }
            DbContext.prototype._createDbSets = function () {
                var self = this;
                self._dbSets.FileSystemObject = new FileSystemObjectDb(this);
                _super.prototype._createDbSets.call(this);
                var associations = [
                    {
                        "childDbSetName": "FileSystemObject",
                        "childToParentName": "Parent",
                        "fieldRels": [
                            {
                                "childField": "ParentKey",
                                "parentField": "Key"
                            }
                        ],
                        "name": "ChildToParent",
                        "onDeleteAction": 1,
                        "parentDbSetName": "FileSystemObject",
                        "parentToChildrenName": "Children"
                    }
                ];
                self._initAssociations(associations);
                var methods = [
                    {
                        "isQuery": true,
                        "methodName": "ReadRoot",
                        "methodResult": true,
                        "parameters": [
                            {
                                "dataType": 2,
                                "dateConversion": 0,
                                "isArray": false,
                                "isNullable": false,
                                "name": "includeFiles",
                                "ordinal": 1
                            }
                        ]
                    }, 
                    {
                        "isQuery": true,
                        "methodName": "ReadChildren",
                        "methodResult": true,
                        "parameters": [
                            {
                                "dataType": 1,
                                "dateConversion": 0,
                                "isArray": false,
                                "isNullable": false,
                                "name": "parentKey",
                                "ordinal": 1
                            }, 
                            {
                                "dataType": 3,
                                "dateConversion": 0,
                                "isArray": false,
                                "isNullable": false,
                                "name": "level",
                                "ordinal": 2
                            }, 
                            {
                                "dataType": 1,
                                "dateConversion": 0,
                                "isArray": false,
                                "isNullable": false,
                                "name": "path",
                                "ordinal": 3
                            }, 
                            {
                                "dataType": 2,
                                "dateConversion": 0,
                                "isArray": false,
                                "isNullable": false,
                                "name": "includeFiles",
                                "ordinal": 4
                            }
                        ]
                    }
                ];
                self._initMethods(methods);
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
    })(RIAPP.FOLDERBROWSER_SVC || (RIAPP.FOLDERBROWSER_SVC = {}));
    var FOLDERBROWSER_SVC = RIAPP.FOLDERBROWSER_SVC;
})(RIAPP || (RIAPP = {}));
//@ sourceMappingURL=folderBrowserSvc.js.map

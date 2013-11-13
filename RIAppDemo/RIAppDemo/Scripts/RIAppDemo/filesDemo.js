var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="..\jriapp.ts"/>
/// <reference path="common.ts"/>
/// <reference path="folderBrowserSvc.ts"/>
var RIAPP;
(function (RIAPP) {
    (function (FILESDEMO) {
        'use strict';
        var global = RIAPP.global, utils = global.utils;

        var FolderBrowser = (function (_super) {
            __extends(FolderBrowser, _super);
            function FolderBrowser(options) {
                _super.call(this);
                var self = this;
                self._includeFiles = options.includeFiles;
                self._$tree = options.$tree;
                self._dbContext = new RIAPP.FOLDERBROWSER_SVC.DbContext();
                self._dbContext.initialize({
                    serviceUrl: options.service_url,
                    permissions: options.permissionInfo
                });
                this._assoc = self._dbContext.associations.getChildToParent();

                self._foldersDb = self._dbContext.dbSets.FileSystemObject;

                self._foldersDb.definefullPathField(function () {
                    return self.getFullPath(this);
                });

                self._loadRootCommand = new RIAPP.MOD.mvvm.Command(function (s, a) {
                    self.loadRootFolder();
                }, self, function (s, a) {
                    return true;
                });

                this._createDynaTree();
            }
            FolderBrowser.prototype._getEventNames = function () {
                var base_events = _super.prototype._getEventNames.call(this);
                return ['node_selected'].concat(base_events);
            };
            FolderBrowser.prototype.addOnNodeSelected = function (fn, namespace) {
                this.addHandler('node_selected', fn, namespace);
            };
            FolderBrowser.prototype._createDynaTree = function () {
                var self = this;
                (this._$tree).dynatree({
                    onActivate: function (node) {
                        self.raiseEvent('node_selected', { item: node.data.item });
                    },
                    onClick: function (node, event) {
                    },
                    onDblClick: function (node, event) {
                    },
                    onExpand: function (flag, node) {
                        if (!flag) {
                            node.visit(function (child) {
                                var item = child.data.item;
                                if (!item)
                                    return;
                                item.deleteItem();
                            }, false);

                            //remove all child nodes when node collapsed
                            node.removeChildren();
                            self._dbContext.acceptChanges();
                        }
                    },
                    onLazyRead: function (node) {
                        self.loadChildren(node.data.item).done(function () {
                            self._addItemsToNode(node, node.data.item.Children);
                            node.setLazyNodeStatus(DTNodeStatus_Ok);
                        });
                    }
                });
                this._$treeRoot = (this._$tree).dynatree("getRoot");
            };
            FolderBrowser.prototype.loadRootFolder = function () {
                var self = this, query = self._foldersDb.createReadRootQuery({ includeFiles: self._includeFiles, infoType: null });
                query.isClearPrevData = true;
                var promise = self._dbContext.load(query);
                promise.done(function (res) {
                    self._onLoaded(res.fetchedItems);
                });
                return promise;
            };
            FolderBrowser.prototype.loadChildren = function (item) {
                var self = this, query = self._foldersDb.createReadChildrenQuery({ parentKey: item.Key, level: item.Level + 1, path: item.fullPath, includeFiles: self._includeFiles, infoType: null });
                query.isClearPrevData = false;
                var promise = self._dbContext.load(query);
                promise.done(function (res) {
                    self._onLoaded(res.fetchedItems);
                });
                return promise;
            };
            FolderBrowser.prototype._onLoaded = function (fetchedItems) {
                var self = this;
                try  {
                    var topLevel = fetchedItems.filter(function (item) {
                        return item.Level == 0;
                    });
                    if (topLevel.length > 0) {
                        self._addItemsToTree(topLevel);
                    }
                } catch (ex) {
                    self._onError(ex, self);
                    global._throwDummy(ex);
                }
            };
            FolderBrowser.prototype._addItemsToNode = function (node, items) {
                var arr = items.map(function (item) {
                    return { title: item.Name, isLazy: item.HasSubDirs, isFolder: item.IsFolder, item: item };
                });
                node.removeChildren();
                node.addChild(arr);
            };
            FolderBrowser.prototype._addItemsToTree = function (items) {
                this._addItemsToNode(this._$treeRoot, items);
            };
            FolderBrowser.prototype._getFullPath = function (item, path) {
                var self = this, part;
                if (utils.check.isNt(path))
                    path = '';
                if (!path)
                    part = '';
else
                    part = '\\' + path;
                var parent = this._assoc.getParentItem(item);
                if (!parent) {
                    return item.Name + part;
                } else {
                    return self._getFullPath(parent, item.Name + part);
                }
            };
            FolderBrowser.prototype.getFullPath = function (item) {
                return this._getFullPath(item, null);
            };
            FolderBrowser.prototype.destroy = function () {
                if (this._isDestroyed)
                    return;
                this._isDestroyCalled = true;
                var self = this;
                if (!!this._dbContext) {
                    this._dbContext.destroy();
                }
                if (!!this._$treeRoot)
                    this._$treeRoot.removeChildren();
                _super.prototype.destroy.call(this);
            };
            Object.defineProperty(FolderBrowser.prototype, "dbContext", {
                get: function () {
                    return this._dbContext;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FolderBrowser.prototype, "loadRootCommand", {
                get: function () {
                    return this._loadRootCommand;
                },
                enumerable: true,
                configurable: true
            });
            return FolderBrowser;
        })(RIAPP.BaseObject);
        FILESDEMO.FolderBrowser = FolderBrowser;

        function fn_getTemplateElement(template, name) {
            var t = template;
            var els = t.findElByDataName(name);
            if (els.length < 1)
                return null;
            return els[0];
        }
        ;

        var FolderBrowserVM = (function (_super) {
            __extends(FolderBrowserVM, _super);
            function FolderBrowserVM(app, includeFiles) {
                _super.call(this, app);
                var self = this;
                this._selectedItem = null;

                //we defined this custom type in common.js
                this._dialogVM = new RIAPP.COMMON.DialogVM(app);
                this._folderBrowser = null;
                this._includeFiles = includeFiles;

                var dialogOptions = {
                    templateID: 'treeTemplate',
                    width: 650,
                    height: 700,
                    title: self._includeFiles ? 'File Browser' : 'Folder Browser',
                    fn_OnTemplateCreated: function (template) {
                        var dialog = this, $ = global.$;
                        var $tree = global.$(fn_getTemplateElement(template, 'tree'));
                        var options = utils.mergeObj(app.options, { $tree: $tree, includeFiles: self._includeFiles });
                        self._folderBrowser = new FolderBrowser(options);
                        self._folderBrowser.addOnNodeSelected(function (s, a) {
                            self.selectedItem = a.item;
                        }, self.uniqueID);
                    },
                    fn_OnShow: function (dialog) {
                        self.selectedItem = null;
                        self._folderBrowser.loadRootFolder();
                    },
                    fn_OnClose: function (dialog) {
                        if (dialog.result == 'ok' && !!self._selectedItem) {
                            self._onSelected(self._selectedItem, self._selectedItem.fullPath);
                        }
                    }
                };
                this._dialogVM.createDialog('folderBrowser', dialogOptions);

                this._dialogCommand = new RIAPP.MOD.mvvm.Command(function (sender, param) {
                    try  {
                        self._dialogVM.showDialog('folderBrowser', self);
                    } catch (ex) {
                        self._onError(ex, this);
                    }
                }, self, function (sender, param) {
                    return true;
                });
            }
            FolderBrowserVM.prototype._onSelected = function (item, fullPath) {
                alert("selected: " + fullPath);
            };
            FolderBrowserVM.prototype.destroy = function () {
                if (this._isDestroyed)
                    return;
                this._isDestroyCalled = true;
                var self = this;
                if (!!self._folderBrowser) {
                    self._folderBrowser.destroy();
                    self._folderBrowser = null;
                }
                if (!!self._dialogVM) {
                    self._dialogVM.destroy();
                    self._dialogVM = null;
                }
                _super.prototype.destroy.call(this);
            };
            Object.defineProperty(FolderBrowserVM.prototype, "folderBrowser", {
                get: function () {
                    return this._folderBrowser;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FolderBrowserVM.prototype, "selectedItem", {
                get: function () {
                    return this._selectedItem;
                },
                set: function (v) {
                    if (v !== this._selectedItem) {
                        this._selectedItem = v;
                        this.raisePropertyChanged('selectedItem');
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FolderBrowserVM.prototype, "dialogCommand", {
                get: function () {
                    return this._dialogCommand;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FolderBrowserVM.prototype, "includeFiles", {
                get: function () {
                    return this._includeFiles;
                },
                enumerable: true,
                configurable: true
            });
            return FolderBrowserVM;
        })(RIAPP.MOD.mvvm.BaseViewModel);
        FILESDEMO.FolderBrowserVM = FolderBrowserVM;

        var DemoApplication = (function (_super) {
            __extends(DemoApplication, _super);
            function DemoApplication(options) {
                _super.call(this, options);
                var self = this;
                this._errorVM = null;
                this._fbrowserVM1 = null;
                this._fbrowserVM2 = null;
            }
            DemoApplication.prototype.onStartUp = function () {
                var self = this, options = self.options;
                this._errorVM = new RIAPP.COMMON.ErrorViewModel(this);
                this._fbrowserVM1 = new FolderBrowserVM(this, false);
                this._fbrowserVM2 = new FolderBrowserVM(this, true);

                //here we could process application's errors
                this.addOnError(function (sender, data) {
                    debugger;
                    data.isHandled = true;
                    self.errorVM.error = data.error;
                    self.errorVM.showDialog();
                });
                _super.prototype.onStartUp.call(this);
            };

            //really, the destroy method is redundant here because application lives till the page lives
            DemoApplication.prototype.destroy = function () {
                if (this._isDestroyed)
                    return;
                this._isDestroyCalled = true;
                var self = this;
                try  {
                    self._errorVM.destroy();
                    self._fbrowserVM1.destroy();
                    self._fbrowserVM2.destroy();
                } finally {
                    _super.prototype.destroy.call(this);
                }
            };
            Object.defineProperty(DemoApplication.prototype, "options", {
                get: function () {
                    return this._options;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DemoApplication.prototype, "errorVM", {
                get: function () {
                    return this._errorVM;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DemoApplication.prototype, "TEXT", {
                get: function () {
                    return RIAPP.localizable.TEXT;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DemoApplication.prototype, "fbrowserVM1", {
                get: function () {
                    return this._fbrowserVM1;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DemoApplication.prototype, "fbrowserVM2", {
                get: function () {
                    return this._fbrowserVM2;
                },
                enumerable: true,
                configurable: true
            });
            return DemoApplication;
        })(RIAPP.Application);
        FILESDEMO.DemoApplication = DemoApplication;

        //global error handler - the last resort (typically display message to the user)
        RIAPP.global.addOnError(function (sender, args) {
            debugger;
            alert(args.error.message);
        });

        RIAPP.global.addOnLoad(function (sender, a) {
            var global = sender;

            //initialize images folder path
            global.defaults.imagesPath = FILESDEMO.mainOptions.images_path;

            //create and then start application
            var thisApp = new DemoApplication(FILESDEMO.mainOptions);
            thisApp.startUp(function (app) {
            });
        });

        function initModule(app) {
            return FILESDEMO;
        }
        ;

        //properties must be initialized on HTML page
        FILESDEMO.mainOptions = {
            service_url: null,
            permissionInfo: null,
            images_path: null,
            user_modules: [
                { name: "COMMON", initFn: RIAPP.COMMON.initModule },
                { name: "FILESDEMO", initFn: initModule }
            ]
        };
    })(RIAPP.FILESDEMO || (RIAPP.FILESDEMO = {}));
    var FILESDEMO = RIAPP.FILESDEMO;
})(RIAPP || (RIAPP = {}));
//# sourceMappingURL=filesDemo.js.map

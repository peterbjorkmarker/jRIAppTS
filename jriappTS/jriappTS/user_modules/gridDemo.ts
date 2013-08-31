/// <reference path="..\jriapp.ts"/>
/// <reference path="common.ts"/>
/// <reference path="header.ts"/>
/// <reference path="demoDB.ts"/>
module RIAPP
{
    'use strict';
    //data grid demo module
    export module GRIDDEMO {
        var global = RIAPP.global, utils = global.utils;

        export function addTextQuery(query:MOD.db.DataQuery, fldName: string, val:string) {
            var tmp:string;
            if (!!val) {
                if (utils.str.startsWith(val, '%') && utils.str.endsWith(val, '%')) {
                    tmp = utils.str.trim(val, '% ');
                    query.where(fldName, 'contains', [tmp])
                }
                else if (utils.str.startsWith(val, '%')) {
                    tmp = utils.str.trim(val, '% ');
                    query.where(fldName, 'endswith', [tmp])
                }
                else if (utils.str.endsWith(val, '%')) {
                    tmp = utils.str.trim(val, '% ');
                    query.where(fldName, 'startswith', [tmp])
                }
                else {
                    tmp = utils.str.trim(val);
                    query.where(fldName, '=', [tmp])
                }
            }
            return query;
        };

        export class ProductsFilter extends RIAPP.BaseObject {
            _prodNumber: any;
            _name: string;
            _parentCategoryID: number;
            _childCategoryID: number;
            _selectedCategory: any;
            _selectedModel: any;
            _modelID: number;
            _parentCategories: MOD.db.DataView<DEMODB.ProductCategory>;
            _childCategories: MOD.db.DataView<DEMODB.ProductCategory>;
            _resetCommand: MOD.mvvm.Command;
            _app: DemoApplication;

            constructor(app: DemoApplication) {
                super();
                var self = this;
                this._app = app;
                this._prodNumber = null;
                this._name = null;
                this._parentCategoryID = null;
                this._childCategoryID = null;
                this._selectedCategory = null;
                this._selectedModel = null;
                this._modelID = null;
                //filters top level product categories
                this._parentCategories = new MOD.db.DataView<DEMODB.ProductCategory>(
                    {
                        dataSource: this.ProductCategories,
                        fn_sort: function (a: DEMODB.ProductCategory, b: DEMODB.ProductCategory) { return a.ProductCategoryID - b.ProductCategoryID; },
                        fn_filter: function (item: DEMODB.ProductCategory) { return item.ParentProductCategoryID == null; }
                    });
                
                
                //filters product categories which have parent category
                this._childCategories = new MOD.db.DataView<DEMODB.ProductCategory>(
                    {
                        dataSource: this.ProductCategories,
                        fn_sort: function (a: DEMODB.ProductCategory, b: DEMODB.ProductCategory) { return a.ProductCategoryID - b.ProductCategoryID; },
                        fn_filter: function (item: DEMODB.ProductCategory) { return item.ParentProductCategoryID !== null && item.ParentProductCategoryID == self.parentCategoryID; }
                    });

                this._resetCommand = new MOD.mvvm.Command(function (sender, data) {
                    self.reset();
                }, self, null);

            }
            _loadCategories() {
                var query = this.ProductCategories.createReadProductCategoryQuery();
                query.orderBy('Name', 'ASC');
                //returns promise
                return query.load();
            }
            //returns promise
            _loadProductModels() {
                var query = this.ProductModels.createReadProductModelQuery();
                query.orderBy('Name', 'ASC');
                //returns promise
                return query.load();
            }
            //returns promise
            load() {
                //load two dbsets simultanously
                var promise1 = this._loadCategories(), promise2 = this._loadProductModels();
                return global.$.when(promise1, promise2);
            }
            reset() {
                this.parentCategoryID = null;
                this.childCategoryID = null;
                this.prodNumber = null;
                this.name = null;
                this.modelID = null;
                this.selectedModel = null;
                this.selectedCategory = null;
            }
            get prodNumber() { return this._prodNumber; }
            set prodNumber(v) {
                if (this._prodNumber != v) {
                    this._prodNumber = v;
                    this.raisePropertyChanged('prodNumber');
                }
            }
            get name() { return this._name; }
            set name(v) {
                if (this._name != v) {
                    this._name = v;
                    this.raisePropertyChanged('name');
                }
            }
            get parentCategoryID() { return this._parentCategoryID; }
            set parentCategoryID(v) {
                if (this._parentCategoryID != v) {
                    this._parentCategoryID = v;
                    this.raisePropertyChanged('parentCategoryID');
                    this._childCategories.refresh();
                }
            }
            get childCategoryID() { return this._childCategoryID; }
            set childCategoryID(v) {
                if (this._childCategoryID != v) {
                    this._childCategoryID = v;
                    this.raisePropertyChanged('childCategoryID');
                }
            }
            get modelID() { return this._modelID; }
            set modelID(v) {
                if (this._modelID != v) {
                    this._modelID = v;
                    this.raisePropertyChanged('modelID');
                }
            }
            get dbSets() { return this.dbContext.dbSets; }
            get ParentCategories() { return this._parentCategories; }
            get ChildCategories() { return this._childCategories; }
            get ProductModels() { return this.dbSets.ProductModel; }
            get ProductCategories() { return this.dbSets.ProductCategory; }
            get resetCommand() { return this._resetCommand; }
            get searchTextToolTip() { return "Use placeholder <span style='font-size: larger'><b>%</b></span><br/> for searching by part of the value"; }
            get selectedCategory() { return this._selectedCategory; }
            set selectedCategory(v) {
                if (this._selectedCategory != v) {
                    this._selectedCategory = v;
                    this.raisePropertyChanged('selectedCategory');
                }
            }
            get selectedModel() { return this._selectedModel; }
            set selectedModel(v) {
                if (this._selectedModel != v) {
                    this._selectedModel = v;
                    this.raisePropertyChanged('selectedModel');
                }
            }
            set modelData(data) { this.ProductModels.fillItems(data); }
            set categoryData(data) { this.ProductCategories.fillItems(data); }
            get dbContext() { return this._app.dbContext; }
        }

        
        export class ProductViewModel extends MOD.mvvm.BaseViewModel {
            _filter: ProductsFilter;
            _dbSet: DEMODB.ProductDb;
            _dataGrid: MOD.datagrid.DataGrid;
            _propWatcher: MOD.utils.PropWatcher;
            _selected: any;
            _selectedCount: number;
            _invokeResult: any;
            //_templateID: string;
            _testInvokeCommand: MOD.mvvm.ICommand;
            _tabsEventCommand: MOD.mvvm.ICommand;
            _addNewCommand: MOD.mvvm.ICommand;
            _loadCommand: MOD.mvvm.ICommand;
            _propChangeCommand: MOD.mvvm.ICommand;
            _dialogVM: COMMON.DialogVM;

            constructor(app: DemoApplication) {
                super(app);
                var self = this;
                this._filter = new ProductsFilter(app);
                this._dbSet = this.dbSets.Product;
                this._dataGrid = null;
                this._propWatcher = new MOD.utils.PropWatcher();
                this._selected = {};
                this._selectedCount = 0;
                this._invokeResult = null;
                //this._templateID = 'productEditTemplate';

                //when currentItem property changes, invoke our viewmodel's method
                this._dbSet.addOnPropertyChange('currentItem', function (sender, data) {
                    self._onCurrentChanged();
                }, self.uniqueID);

                //if we need to confirm the deletion, this is how it is done
                this._dbSet.addOnItemDeleting(function (sender, args) {
                    if (!confirm('Are you sure that you want to delete ' + args.item.Name + ' ?'))
                        args.isCancel = true;
                }, self.uniqueID);

                //the end edit event- the entity potentially changed its data. we can recheck conditions based on
                //entities data here
                this._dbSet.addOnEndEdit(function (sender, args) {
                    if (!args.isCanceled) {
                        //at the end of the editing, let the command will check: can it be executed?
                        self._testInvokeCommand.raiseCanExecuteChanged();
                    }
                }, self.uniqueID);

                //auto submit changes when an entity is deleted
                this._dbSet.isSubmitOnDelete = true; 

                this._dbSet.addOnFill(function (s, a) {
                    //when fill is ended
                    if (!a.isBegin) {
                        if (!a.isPageChanged) //clear products selection when the dbSet is refilled (but not when page is changed)
                            self._clearSelection();
                    }
                }, self.uniqueID);

                //example of using custom validation on client (in addition to builtin validation)
                this._dbSet.addOnValidate(function (sender, args) {
                    var item = args.item;
                    if (!args.fieldName) { //full item validation
                        if (!!item.SellEndDate) { //check it must be after Start Date
                            if (item.SellEndDate < item.SellStartDate) {
                                args.errors.push('End Date must be after Start Date');
                            }
                        }
                    }
                    else //validation of field value
                    {
                        if (args.fieldName == "Weight") {
                            if (args.item[args.fieldName] > 20000) {
                                args.errors.push('Weight must be less than 20000');
                            }
                        }
                    }
                }, self.uniqueID);

                //an example of getting notifications in viewmodel on the tabs events
                this._tabsEventCommand = new MOD.mvvm.Command(function (sender, param) {
                    var index = param.args.index, tab = param.args.tab, panel = param.args.panel;
                    //alert('event: '+ param.eventName + ' was triggered on tab: '+index);
                }, self, null);

                //adds new product - uses dialog to enter the data
                this._addNewCommand = new MOD.mvvm.Command(function (sender, param) {
                    //grid will show the edit dialog, because we set grid options isHandleAddNew:true
                    //see the options for the grid on the HTML demo page
                    var item = self._dbSet.addNew();
                    //P.S. - grids editor options also has submitOnOK:true, which means
                    //on clicking OK button all changes are submitted to the service
                }, self,
                 function (sender, param) {
                     return true;
                 });

                //loads data from the server for the products
                this._loadCommand = new MOD.mvvm.Command(function (sender, data) {
                    self.load();
                }, self, null);


                //example of getting instance of databounded dataGrid by using elView's propChangedCommand
                //we can name this command just how we like it (here i named it propChangeCommand)
                //look at the datagrid's databinding on the demo page
                this._propChangeCommand = new MOD.baseElView.PropChangedCommand(function (sender, data) {
                    if (data.property == '*' || data.property == 'grid') {
                        if (self._dataGrid === sender.grid)
                            return;
                        self._dataGrid = sender.grid;
                    }
                    //example of binding to dataGrid events
                    if (!!self._dataGrid) {
                        self._dataGrid.addOnPageChanged(function (s, a) {
                            self._onGridPageChanged();
                        }, self.uniqueID);
                        self._dataGrid.addOnRowSelected(function (s, a) {
                            self._onGridRowSelected(a.row);
                        }, self.uniqueID);
                        self._dataGrid.addOnRowExpanded(function (s, a) {
                            self._onGridRowExpanded(a.old_expandedRow, a.expandedRow, a.isExpanded);
                        }, self.uniqueID);
                        self._dataGrid.addOnRowStateChanged(function (s, a) {
                            if (!a.val) {
                                a.css = 'rowInactive';
                            }
                        }, self.uniqueID);
                    }
                }, self, null);

                //example of using a method invocation on the service
                //invokes test service method with parameters and displays result with alert
                this._testInvokeCommand = new MOD.mvvm.Command(function (sender, param) {
                    self.invokeResult = null;
                    var promise = self.dbContext.serviceMethods.TestInvoke({ param1: [10, 11, 12, 13, 14], param2: param.Name });
                    promise.done(function (res) {
                        self.invokeResult = res;
                        self._dialogVM.showDialog('testDialog', self);
                    });

                    promise.fail(function () {
                        //do something on fail if you need
                        //but the error message display is automatically shown
                    });
                }, self,
                function (sender, param) {
                    //just for the test: this command can be executed only when this condition is true!
                    return self.currentItem !== null;
                });

                //the property watcher helps us handling properties changes
                //more convenient than using addOnPropertyChange
                this._propWatcher.addWatch(self, ['currentItem'], function (property:string) {
                    self._testInvokeCommand.raiseCanExecuteChanged();
                });

                this._dialogVM = new COMMON.DialogVM(app);
                var dialogOptions: MOD.datadialog.IDialogConstructorOptions = {
                    templateID: 'invokeResultTemplate',
                    width: 600,
                    height: 250,
                    canCancel: false, //no cancel button
                    title: 'Result of a service method invocation',
                    fn_OnClose: function (dialog) {
                        self.invokeResult = null;
                    }
                };
                this._dialogVM.createDialog('testDialog', dialogOptions);
            }
            _onGridPageChanged() {
                //when moving to any page, select rows which was previously selected on that page (restore selection)
                var self = this, keys = self.selectedIDs, grid = self._dataGrid;
                keys.forEach(function (key) {
                    var item = self.dbSet.getItemByKey(key), row;
                    if (!!item) {
                        row = grid.findRowByItem(item);
                        if (!!row)
                            row.isSelected = true;
                    }
                });
            }
            _onGridRowSelected(row: MOD.datagrid.Row) {
                this._productSelected(row.item, row.isSelected);
            }
            _onGridRowExpanded(oldRow: MOD.datagrid.Row, row: MOD.datagrid.Row, isExpanded:boolean) {
                //just for example
                //we could retrieve additional data from the server when grid's row is expanded
            }
            _onCurrentChanged() {
                this.raisePropertyChanged('currentItem');
            }
            _clearSelection() {
                //clear all selection
                this._selected = {};
                this.selectedCount = 0;
            }
            //when product is selected (unselected) by user in the grid (clicking checkboxes)
            //we store the entities keys in the map (it survives going to another page and return back)
            _productSelected(item: MOD.collection.CollectionItem, isSelected:boolean) {
                if (!item)
                    return;
                if (isSelected) {
                    if (!this._selected[item._key]) {
                        this._selected[item._key] = item;
                        this.selectedCount += 1;
                    }
                }
                else {
                    if (!!this._selected[item._key]) {
                        delete this._selected[item._key];
                        this.selectedCount -= 1;
                    }
                }
            }
            load() {
                //you can create several methods on the service which return the same entity type
                //but they must have different names (no overloads)
                //the query'service method can accept additional parameters which you can supply with query
                var query = this.dbSet.createReadProductQuery({ param1: [10, 11, 12, 13, 14], param2: 'Test' });
                query.pageSize = 50;
                query.loadPageCount = 20; //load 20 pages at once (only one will be visible, others will be in local cache)
                query.isClearCacheOnEveryLoad = true; //clear local cache when a new batch of data is loaded from the server
                addTextQuery(query, 'ProductNumber', this._filter.prodNumber);
                addTextQuery(query, 'Name', this._filter.name);
                if (!utils.check.isNt(this._filter.childCategoryID)) {
                    query.where('ProductCategoryID', '=', [this._filter.childCategoryID]);
                }
                if (!utils.check.isNt(this._filter.modelID)) {
                    query.where('ProductModelID', '=', [this._filter.modelID]);
                }

                query.orderBy('Name', 'ASC').thenBy('SellStartDate', 'DESC');
                return query.load();
            }
            destroy() {
                if (this._isDestroyed)
                    return;
                this._isDestroyCalled = true;
                this._propWatcher.destroy();
                this._propWatcher = null;

                if (!!this._dbSet) {
                    this._dbSet.removeNSHandlers(this.uniqueID);
                }
                if (!!this._dataGrid) {
                    this._dataGrid.removeNSHandlers(this.uniqueID);
                }
                super.destroy();
            }
            get app() { return <DemoApplication>this._app; }
            get dbSet() { return this._dbSet; }
            //get templateID() { return this._templateID; }
            get testInvokeCommand() { return this._testInvokeCommand; }
            get addNewCommand() { return this._addNewCommand; }
            get tabsEventCommand() { return this._tabsEventCommand; }
            get propChangeCommand() { return this._propChangeCommand; }
            get dbContext() { return this.app.dbContext; }
            get dbSets() { return this.dbContext.dbSets; }
            get currentItem() { return this._dbSet.currentItem; }
            get filter() { return this._filter; }
            get loadCommand() { return this._loadCommand; }
            get selectedCount() { return this._selectedCount; }
            set selectedCount(v) {
                var old = this._selectedCount;
                if (old !== v) {
                    this._selectedCount = v;
                    this.raisePropertyChanged('selectedCount');
                }
            }
            get selectedIDs() { return Object.keys(this._selected); }
            get invokeResult() { return this._invokeResult; }
            set invokeResult(v) {
                var old = this._invokeResult;
                if (old !== v) {
                    this._invokeResult = v;
                    this.raisePropertyChanged('invokeResult');
                }
            }
        }

        export class BaseUploadVM extends BaseObject {
            _uploadUrl: string;
            _formEl: HTMLFormElement;
            _fileEl: HTMLInputElement;
            _progressBar: JQuery;
            _percentageCalc: JQuery;
            _progressDiv: JQuery;
            _fileInfo: string;
            _id: string;
            _fileUploaded: boolean;
            _initOk: boolean;
            _uploadCommand: MOD.mvvm.ICommand;
            private xhr: XMLHttpRequest;

            constructor(url:string) {
                super();
                var self = this;
                this._uploadUrl = url;
                this._formEl = null;
                this._fileEl = null;
                this._progressBar = null;
                this._percentageCalc = null;
                this._progressDiv = null;
                this._fileInfo = null;
                this._id = null;
                this._fileUploaded = false;

                this._initOk = this._initXhr();
                this._uploadCommand = new MOD.mvvm.Command(function (sender, param) {
                    try {
                        self.uploadFiles(self._fileEl.files);
                    } catch (ex) {
                        self._onError(ex, this);
                    }
                }, self, function (sender, param) {
                    return self._canUpload();
                });
            }
            _initXhr() {
                this.xhr = new XMLHttpRequest();
                if (!this.xhr.upload) {
                    this.xhr = null;
                    this._onError('Browser dose not support HTML5 files upload interface', this);
                    return false;
                }
                var self = this, xhr = this.xhr, upload = xhr.upload;
                upload.onloadstart = function (e) {
                    self._progressBar.prop("max", 100);
                    self._progressBar.prop("value", 0);
                    self._percentageCalc.html("0%");
                    self._progressDiv.show();
                };

                upload.onprogress = function (e) {
                    var progressBar = $("#progressBar");
                    var percentageDiv = $("#percentageCalc");
                    if (!!e.lengthComputable) {
                        self._progressBar.prop("max", e.total);
                        self._progressBar.prop("value", e.loaded);
                        self._percentageCalc.html(Math.round(e.loaded / e.total * 100) + "%");
                    }
                };

                //File uploaded
                upload.onload = function (e) {
                    self.fileInfo = 'the File is uploaded';
                    self._progressDiv.hide();
                    self._onFileUploaded();
                };

                upload.onerror = function (e) {
                    self.fileInfo = null;
                    self._progressDiv.hide();
                    self._onError(new Error('File uploading error'), self);
                };

                xhr.onreadystatechange = function (e) {
                    if (xhr.readyState === 4) {
                        if (xhr.status >= 400) {
                            self._onError(new Error(utils.format("File upload error: {0}", xhr.statusText)), self);
                        }
                    }
                };

                return true;
            }
            _onFileUploaded() {
                this._fileUploaded = true;
            }
            uploadFiles(fileList: FileList) {
                if (!!fileList) {
                    for (var i = 0, l = fileList.length; i < l; i++) {
                        this.uploadFile(fileList[i]);
                    }
                }
            }
            uploadFile(file: File) {
                if (!this._initOk)
                    return;
                var xhr = this.xhr;
                xhr.open("post", this._uploadUrl, true);
                // Set appropriate headers
                // We're going to use these in the UploadFile method
                // To determine what is being uploaded.
                xhr.setRequestHeader("Content-Type", "multipart/form-data");
                xhr.setRequestHeader("X-File-Name", file.name);
                xhr.setRequestHeader("X-File-Size", file.size.toString());
                xhr.setRequestHeader("X-File-Type", file.type);
                xhr.setRequestHeader("X-Data-ID", this._getDataID());

                // Send the file
                xhr.send(file);
            }
            _onIDChanged() {
                this._uploadCommand.raiseCanExecuteChanged();
            }
            _canUpload() {
                return this._initOk && !!this._fileInfo && !utils.check.isNt(this.id);
            }
            _getDataID() {
                return this.id;
            }
            get fileInfo() { return this._fileInfo; }
            set fileInfo(v) {
                if (this._fileInfo !== v) {
                    this._fileInfo = v;
                    this.raisePropertyChanged('fileInfo');
                    this._uploadCommand.raiseCanExecuteChanged();
                }
            }
            get uploadCommand() { return this._uploadCommand; }
            get id() { return this._id; }
            set id(v:string) {
                var old = this._id;
                if (old !== v) {
                    this._id = v;
                    this.raisePropertyChanged('id');
                    this._onIDChanged();
                }
            }
        }

        //helper function to get html DOM element  inside template's instance
        //by custom data-name attribute value
        var fn_getTemplateElement = function (template:MOD.template.Template, name:string) {
            var t = template;
            var els = t.findElByDataName(name);
            if (els.length < 1)
                return null;
            return els[0];
        };

        export class UploadThumbnailVM extends BaseUploadVM {
            _product: any;
            _dialogVM: COMMON.DialogVM;
            _dialogCommand: MOD.mvvm.ICommand;
            _templateCommand: MOD.mvvm.ICommand;

            constructor(app:Application, url: string) {
                super(url);
                var self = this;
                this._product = null;
                //we defined this custom type in common.js
                this._dialogVM = new COMMON.DialogVM(app);
                var dialogOptions: MOD.datadialog.IDialogConstructorOptions = {
                    templateID: 'uploadTemplate',
                    width: 450,
                    height: 250,
                    title: 'Upload product thumbnail',
                    fn_OnTemplateCreated: function (template) {
                        //function executed in the context of the dialog
                        var dialog = this;
                        self._fileEl = <HTMLInputElement>fn_getTemplateElement(template, 'files-to-upload');
                        self._formEl = <HTMLFormElement>fn_getTemplateElement(template, 'uploadForm');
                        self._progressBar = global.$(fn_getTemplateElement(template, 'progressBar'));
                        self._percentageCalc = global.$(fn_getTemplateElement(template, 'percentageCalc'));
                        self._progressDiv = global.$(fn_getTemplateElement(template, 'progressDiv'));
                        self._progressDiv.hide();
                        global.$(self._fileEl).on('change', function (e: JQueryEventObject) {
                            var fileEl: HTMLInputElement = this;
                            e.stopPropagation();
                            var fileList = fileEl.files, txt = '';
                            self.fileInfo = null;
                            for (var i = 0, l = fileList.length; i < l; i++) {
                                txt += utils.format('<p>{0} ({1} KB)</p>', fileList[i].name, utils.str.formatNumber(fileList[i].size / 1024, 2, '.', ','));
                            }
                            self.fileInfo = txt;
                        });

                        var templEl = template.el, $fileEl = global.$(self._fileEl);
                        $fileEl.change(function (e) {
                            global.$('input[data-name="files-input"]', templEl).val(global.$(this).val());
                        });
                        global.$('*[data-name="btn-input"]', templEl).click(function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            $fileEl.click();
                        });
                    },
                    fn_OnShow: function (dialog) {
                        self._formEl.reset();
                        self.fileInfo = null;
                        self._fileUploaded = false;
                    },
                    fn_OnClose: function (dialog) {
                        if (dialog.result == 'ok' && self._onDialogClose()) {
                            //raise our custom event
                            self.raiseEvent('files_uploaded', { id: self.id, product: self._product });
                        }
                    }
                };
                //dialogs are distinguished by their given names
                this._dialogVM.createDialog('uploadDialog', dialogOptions);
                //shows dialog when executed
                this._dialogCommand = new MOD.mvvm.Command(function (sender, param) {
                    try {
                        //using command parameter to provide the product item
                        self._product = param;
                        self.id = self._product.ProductID;
                        self._dialogVM.showDialog('uploadDialog', self);
                    } catch (ex) {
                        self._onError(ex, this);
                    }
                }, self, function (sender, param) {
                    return true;
                });
                //executed when template is loaded or unloading
                this._templateCommand = new MOD.baseElView.TemplateCommand(function (sender, param) {
                    try {
                        var template = param.template, $ = global.$, fileEl = $('input[data-name="files-to-upload"]', template.el);
                        if (fileEl.length == 0)
                            return;

                        if (param.isLoaded) {
                            fileEl.change(function (e) {
                                $('input[data-name="files-input"]', template.el).val($(this).val());
                            });
                            $('*[data-name="btn-input"]', template.el).click(function (e) {
                                e.preventDefault();
                                e.stopPropagation();
                                fileEl.click();
                            });
                        }
                        else {
                            fileEl.off('change');
                            $('*[data-name="btn-input"]', template.el).off('click');
                        }
                    } catch (ex) {
                        self._onError(ex, this);
                    }
                }, self, function (sender, param) {
                    return true;
                });

            }
            _getEventNames() {
                var base_events = super._getEventNames();
                return ['files_uploaded'].concat(base_events);
            }
            addOnFilesUploaded(fn: (sender: UploadThumbnailVM, args: { id: string; product: MOD.db.Entity; }) => void , namespace?: string) {
                this.addHandler('files_uploaded', fn, namespace);
            }
            removeOnFilesUploaded(namespace?: string) {
                this.removeHandler('files_uploaded', namespace);
            }
            _onDialogClose() {
                return this._fileUploaded;
            }
            get dialogCommand() { return this._dialogCommand; }
            get templateCommand() { return this._templateCommand; }
            destroy() {
                if (this._isDestroyed)
                    return;
                this._isDestroyCalled = true;
                this._dialogVM.destroy();
                this._dialogVM = null;
                super.destroy();
            }
        }

        export interface IMainOptions extends IAppOptions {
            service_url: string;
            permissionInfo?: MOD.db.IPermissionsInfo;
            images_path: string;
            upload_thumb_url: string;
            templates_url: string;
            productEditTemplate_url: string;
            sizeDisplayTemplate_url: string;
            modelData: any;
            categoryData: any;
        }

        //strongly typed aplication's class
        export class DemoApplication extends Application {
            _dbContext: DEMODB.DbContext;
            _errorVM: COMMON.ErrorViewModel;
            _headerVM: HEADER.HeaderVM;
            _productVM: ProductViewModel;
            _uploadVM: UploadThumbnailVM;

            constructor(options: IMainOptions) {
                super(options);
                var self = this;
                this._dbContext =null;
                this._errorVM =null;
                this._headerVM = null;
                this._productVM = null;
                this._uploadVM = null;
            }
            onStartUp() {
                var self = this, options: IMainOptions = self.options;
                this._dbContext = new DEMODB.DbContext();
                this._dbContext.initialize({ serviceUrl: options.service_url, permissions: options.permissionInfo });
                function toText(str) {
                    if (str === null)
                        return '';
                    else
                        return str;
                };

                this._dbContext.dbSets.Product.defineIsActiveField(function () {
                    return !this.SellEndDate;
                });
                this._errorVM = new COMMON.ErrorViewModel(this);
                this._headerVM = new HEADER.HeaderVM(this);
                this._productVM = new ProductViewModel(this);
                this._uploadVM = new UploadThumbnailVM(this, options.upload_thumb_url);
                function handleError(sender, data) {
                    self._handleError(sender, data);
                };
                //here we could process application's errors
                this.addOnError(handleError);
                this._dbContext.addOnError(handleError);

                //adding event handler for our custom event
                this._uploadVM.addOnFilesUploaded(function (s, a) {
                    //need to update ThumbnailPhotoFileName
                    a.product.refresh();
                });
                this.productVM.filter.modelData = options.modelData;
                this.productVM.filter.categoryData = options.categoryData;
                this.productVM.load().done(function (loadRes) {/*alert(loadRes.outOfBandData.test);*/ return; });
                super.onStartUp();
            }
            private _handleError(sender, data) {
                debugger;
                data.isHandled = true;
                this.errorVM.error = data.error;
                this.errorVM.showDialog();
            }
            //really, the destroy method is redundant here because the application lives while the page lives
            destroy() {
                if (this._isDestroyed)
                    return;
                this._isDestroyCalled = true;
                var self = this;
                try {
                    self._errorVM.destroy();
                    self._headerVM.destroy();
                    self._productVM.destroy();
                    self._uploadVM.destroy();
                    self._dbContext.destroy();
                } finally {
                    super.destroy();
                }
            }
            get options() { return <IMainOptions>this._options; }
            get dbContext() { return this._dbContext; }
            get errorVM() { return this._errorVM; }
            get headerVM() { return this._headerVM; }
            get productVM() { return this._productVM; }
            get uploadVM() { return this._uploadVM; }
        }

        //global error handler - the last resort (typically display message to the user)
        RIAPP.global.addOnError(function (sender, args) {
            debugger;
            alert(args.error.message);
        });

         //create and start application here
        RIAPP.global.addOnLoad(function (sender, a) {
            var global = sender;
            //initialize images folder path
            global.defaults.imagesPath = mainOptions.images_path;
            //create and then start application
            var thisApp = new DemoApplication(mainOptions);

            //example of how to preload a group of templates from the server - see spaDEMO.ts for a better way
            thisApp.loadTemplates(mainOptions.templates_url);

            //***here are two examples how we can register template's loader functions for individual templates***
            //this registered function will be invoked every  time when the template with that name is needed
            //P.S. - but the best way how to load templates is to register templates' groups
            //see the Single Page Application Demo (spaDEMO.ts) how it is done there
            thisApp.registerTemplateLoader('productEditTemplate', function () {
                return thisApp.global.$.get(mainOptions.productEditTemplate_url);
            });

            //using memoize pattern so there will not be repeated loads of the same template
            thisApp.registerTemplateLoader('sizeDisplayTemplate',
              (function() {
                  var savePromise;
                  return function () {
                      if (!!savePromise)
                          return savePromise;
                      savePromise = thisApp.global.$.get(mainOptions.sizeDisplayTemplate_url);
                      return savePromise;
                  };
              } ())
            );
            
            thisApp.startUp((app) => {
                /*
                //example of how to do ajax calls to load lookups - first load lookups, then load products
                //at the end it displays in an alert out of band data returned from the server (see ReadProduct data service method)
                
                 thisApp.productVM.filter.load().pipe(function()
                 {
                    return thisApp.productVM.load();}
                 ).pipe(function(data: MOD.db.ILoadResult){alert( data.outOfBandData.test);},function(){alert('load failed');});
                */
            });
            
        });
     
        //this function is executed when the application is created
        //it can be used to initialize application's specific resources in the module
        function initModule(app: Application) {
            return GRIDDEMO;
        };


        //properties must be initialized on HTML page
        export var mainOptions: IMainOptions = {
            service_url: null,
            permissionInfo: null,
            images_path: null,
            upload_thumb_url: null,
            templates_url: null,
            productEditTemplate_url: null,
            sizeDisplayTemplate_url: null,
            modelData: null,
            categoryData: null,
            user_modules: [{ name: "COMMON", initFn: COMMON.initModule },
            { name: "HEADER", initFn: HEADER.initModule },
            { name: "GRIDDEMO", initFn: initModule }]
        };
    }
}

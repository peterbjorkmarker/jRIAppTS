/// <reference path="..\jriapp.ts"/>
/// <reference path="common.ts"/>
/// <reference path="autocomplete.ts"/>
/// <reference path="demoDB.ts"/>
module RIAPP
{
    'use strict';
    //master-details demo module
    export module MDETDEMO {
        var global = RIAPP.global, utils = global.utils;

        export class CustomerVM extends MOD.mvvm.BaseViewModel {
            _dataGrid: MOD.datagrid.DataGrid;
            _dbSet: DEMODB.CustomerDb;
            _propWatcher: MOD.utils.PropWatcher;
            _addNewCommand: MOD.mvvm.ICommand;
            _saveCommand: MOD.mvvm.ICommand;
            _undoCommand: MOD.mvvm.ICommand;
            _loadCommand: MOD.mvvm.ICommand;
            _propChangeCommand: MOD.mvvm.ICommand;
            _tabsEventCommand: MOD.mvvm.ICommand;
            _custAdressView: MOD.db.ChildDataView;
            _ordersVM: OrderVM;

            constructor(app: DemoApplication) {
                super(app);
                var self = this;
                this._dataGrid = null;
                this._dbSet = this.dbSets.Customer;
                this._dbSet.isSubmitOnDelete = true;
                this._propWatcher = new MOD.utils.PropWatcher();

                this._dbSet.addOnItemDeleting(function (sender, args) {
                    if (!confirm('Are you sure that you want to delete customer ?'))
                        args.isCancel = true;
                }, self.uniqueID);

                this._dbSet.addOnFill(function (sender, args) {
                    //when fill is ended
                    if (args.isBegin && args.isPageChanged) {
                        self.raiseEvent('page_changed', {});
                    }
                }, self.uniqueID);

                //adds new customer - uses dialog to enter the data
                this._addNewCommand = new MOD.mvvm.Command(function (sender, param) {
                    //showing of the dialog is handled by the datagrid
                    self._dbSet.addNew();  
                }, self, function (sender, param) {
                        //the command is always enabled
                        return true;
                    });

                //saves changes (submitts them to the service)
                this._saveCommand = new MOD.mvvm.Command(function (sender, param) {
                    self.dbContext.submitChanges();
                }, self, function (s, p) {
                        //the command is enabled when there are pending changes
                        return self.dbContext.hasChanges; 
                    });


                this._undoCommand = new MOD.mvvm.Command(function (sender, param) {
                    self.dbContext.rejectChanges();
                }, self, function (s, p) {
                        //the command is enabled when there are pending changes
                        return self.dbContext.hasChanges;
                    });

                //load data from the server
                this._loadCommand = new MOD.mvvm.Command(function (sender, args) {
                    self.load();
                }, self, null);

                //example of getting instance of bounded dataGrid by using elView's propChangedCommand
                this._propChangeCommand = new MOD.mvvm.Command(function (sender, args) {
                    if (args.property == '*' || args.property == 'grid') {
                        self._dataGrid = sender.grid;
                    }
                    //example of binding to dataGrid events
                    if (!!self._dataGrid) {
                        self._dataGrid.addHandler('page_changed', function (s, a) {
                            self._onGridPageChanged();
                        }, self.uniqueID);
                        self._dataGrid.addHandler('row_selected', function (s, a) {
                            self._onGridRowSelected(a.row);
                        }, self.uniqueID);
                        self._dataGrid.addHandler('row_expanded', function (s, a) {
                            self._onGridRowExpanded(a.old_expandedRow, a.expandedRow, a.isExpanded);
                        }, self.uniqueID);
                    }
                }, self, null);

                //it is not needed here, but can be used when we want to respond to the tabs events
                this._tabsEventCommand = new MOD.mvvm.Command(function (sender, param) {
                    //alert(param.eventName);
                }, self, null);

                //the property watcher helps us handling properties changes
                //more convenient than using addOnPropertyChange
                this._propWatcher.addPropWatch(self.dbContext, 'hasChanges', function (prop) {
                    self._saveCommand.raiseCanExecuteChanged();
                    self._undoCommand.raiseCanExecuteChanged();
                });

                this._propWatcher.addPropWatch(this._dbSet, 'currentItem', function (prop) {
                    self._onCurrentChanged();
                });

                this._dbSet.addOnCleared(function (s, a) {
                    self.dbSets.CustomerAddress.clear();
                    self.dbSets.Address.clear();
                }, self.uniqueID);

                var custAssoc = self.dbContext.associations.getCustAddrToCustomer();

                //the view to filter CustomerAddresses related to the current customer only
                this._custAdressView = new MOD.db.ChildDataView(
                    {
                        association: custAssoc,
                        fn_sort: function (a, b) { return a.AddressID - b.AddressID; }
                    });

                this._ordersVM = new OrderVM(this);
            }
            _getEventNames() {
                var base_events = super._getEventNames();
                return ['row_expanded', 'page_changed'].concat(base_events);
            }
            _onGridPageChanged() {
            }
            _onGridRowSelected(row) {
            }
            _onGridRowExpanded(oldRow, row, isExpanded) {
                var r = row;
                if (!isExpanded) {
                    r = oldRow;
                }
                this.raiseEvent('row_expanded', { customer: r.item, isExpanded: isExpanded });
            }
            _onCurrentChanged() {
                this._custAdressView.parentItem = this._dbSet.currentItem;
                this.raisePropertyChanged('currentItem');
            }
            //returns promise
            load() {
                var query = this._dbSet.createReadCustomerQuery({ includeNav: true });
                query.pageSize = 50;
                //load ten pages at once -- 500 rows
                query.loadPageCount = 10; 
                //load without filtering
                query.orderBy('LastName', 'ASC').thenBy('MiddleName', 'ASC').thenBy('FirstName', 'ASC');
                return this.dbContext.load(query);
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

                this._ordersVM.destroy()
                this._ordersVM = null;
                super.destroy();
            }
            get app() { return <DemoApplication>this._app; }
            get dbContext() { return this.app.dbContext; }
            get dbSets() { return this.dbContext.dbSets; }
            get dbSet() { return this._dbSet; }
            get currentItem() { return this._dbSet.currentItem; }
            get addNewCommand() { return this._addNewCommand; }
            get saveCommand() { return this._saveCommand; }
            get undoCommand() { return this._undoCommand; }
            get tabsEventCommand() { return this._tabsEventCommand; }
            get propChangeCommand() { return this._propChangeCommand; }
            get loadCommand() { return this._loadCommand; }
            get ordersVM() { return this._ordersVM; }
            get custAdressView() { return this._custAdressView; }
        }

        export class OrderVM extends MOD.mvvm.BaseViewModel {
            _customerVM: CustomerVM;
            _dbSet: DEMODB.SalesOrderHeaderDb;
            _currentCustomer: DEMODB.Customer;
            _dataGrid: MOD.datagrid.DataGrid;
            _selectedTabIndex: number;
            _orderStatuses: MOD.collection.Dictionary;
            _addNewCommand: MOD.mvvm.ICommand;
            _propChangeCommand: MOD.mvvm.ICommand;
            _tabsEventCommand: MOD.mvvm.ICommand;
            _addressVM: AddressVM;
            _orderDetailVM: OrderDetailVM;

            constructor(customerVM: CustomerVM) {
                super(customerVM.app);
                var self = this;
                this._customerVM = customerVM;
                this._dbSet = this.dbSets.SalesOrderHeader;
                this._currentCustomer = null;
                this._dataGrid = null;
                this._selectedTabIndex = null;
                this._orderStatuses = new MOD.collection.Dictionary('orderStatus', { key: 0, val: '' }, 'key');
                this._orderStatuses.fillItems([{ key: 0, val: 'New Order' }, { key: 1, val: 'Status 1' },
                    { key: 2, val: 'Status 2' }, { key: 3, val: 'Status 3' },
                    { key: 4, val: 'Status 4' }, { key: 5, val: 'Completed Order' }], true);

                //loads the data only when customer's row is expanded
                this._customerVM.addHandler('row_expanded', function (sender, args) {
                    if (args.isExpanded) {
                        self.currentCustomer = args.customer;
                    }
                    else {
                        self.currentCustomer = null;
                    }
                }, self.uniqueID);

                this._dbSet.addOnPropertyChange('currentItem', function (sender, args) {
                    self._onCurrentChanged();
                }, self.uniqueID);

                this._dbSet.addOnItemDeleting(function (sender, args) {
                    if (!confirm('Are you sure that you want to delete order ?'))
                        args.isCancel = true;
                }, self.uniqueID);


                this._dbSet.addOnItemAdded(function (sender, args) {
                    //can be solved soon with generics
                    var item: DEMODB.ISalesOrderHeader = <DEMODB.ISalesOrderHeader><any>args.item;
                    item.Customer = self.currentCustomer;
                    //datejs extension
                    item.OrderDate = (<any>Date).today();
                    item.DueDate = (<any>Date).today().add(6).days();
                    item.OnlineOrderFlag = false;
                }, self.uniqueID);

           
                //adds new order - uses dialog to fill the data
                this._addNewCommand = new MOD.mvvm.Command(function (sender, param) {
                    //the dialog shown by the datagrid
                    self._dbSet.addNew();
                }, self, function (sender, param) {
                        return true;
                    });

                //example of getting instance of bounded dataGrid by using elView's propChangedCommand
                this._propChangeCommand = new MOD.mvvm.Command(function (sender, args) {
                    if (args.property == '*' || args.property == 'grid') {
                        self._dataGrid = sender.grid;
                    }
                    //example of binding to dataGrid events
                    if (!!self._dataGrid) {
                        self._dataGrid.addHandler('page_changed', function (s, a) {
                            self._onGridPageChanged();
                        }, self.uniqueID);
                        self._dataGrid.addHandler('row_selected', function (s, a) {
                            self._onGridRowSelected(a.row);
                        }, self.uniqueID);
                        self._dataGrid.addHandler('row_expanded', function (s, a) {
                            self._onGridRowExpanded(a.old_expandedRow, a.expandedRow, a.isExpanded);
                        }, self.uniqueID);
                    }
                }, self, null);

                this._tabsEventCommand = new MOD.mvvm.Command(function (sender, param) {
                    //here we can handle tabs events
                    switch (param.eventName) {
                        case "select":
                            this._onTabSelected(param.args.index);
                            break;
                        default:
                            break;
                    }
                }, self, null);

                this._addressVM = new AddressVM(this);
                this._orderDetailVM = new OrderDetailVM(this);
            }
            _getEventNames() {
                var base_events = super._getEventNames();
                return ['row_expanded'].concat(base_events);
            }
            _onTabSelected(index) {
                this._selectedTabIndex = index;
                this.raisePropertyChanged('selectedTabIndex');

                if (index === 2) {  
                    //load details only when tab which contain details grid is selected
                    this._orderDetailVM.currentOrder = this.dbSet.currentItem;
                }
            }
            _onGridPageChanged() {
            }
            _onGridRowSelected(row) {
            }
            _onGridRowExpanded(oldRow, row, isExpanded) {
                var r = row;
                if (!isExpanded) {
                    r = oldRow;
                }
                this.raiseEvent('row_expanded', { order: r.item, isExpanded: isExpanded });
                if (isExpanded) {
                    this._onTabSelected(this.selectedTabIndex);
                }
            }
            _onCurrentChanged() {
                this.raisePropertyChanged('currentItem');
            }
            clear() {
                this.dbSet.clear();
            }
            //returns promise
            load() {
                //explicitly clear before every load
                this.clear();
                if (!this.currentCustomer || this.currentCustomer.getIsNew()) {
                    var deferred = utils.createDeferred();
                    deferred.reject();
                    return deferred.promise();
                }
                var query = this.dbSet.createReadSalesOrderHeaderQuery();
                query.where('CustomerID', '=', [this.currentCustomer.CustomerID]);
                query.orderBy('OrderDate', 'ASC').thenBy('SalesOrderID', 'ASC');
                return this.dbContext.load(query);
            }
            destroy() {
                if (this._isDestroyed)
                    return;
                this._isDestroyCalled = true;
                if (!!this._dbSet) {
                    this._dbSet.removeNSHandlers(this.uniqueID);
                }
                if (!!this._dataGrid) {
                    this._dataGrid.removeNSHandlers(this.uniqueID);
                }
                this.currentCustomer = null;
                this._addressVM.destroy();
                this._addressVM = null;
                this._orderDetailVM.destroy();
                this._orderDetailVM = null;
                this._customerVM = null;
                super.destroy();
            }
            get app() { return <DemoApplication>this._app; }
            get dbContext() { return this.app.dbContext; }
            get dbSets() { return this.dbContext.dbSets; }
            get currentItem() { return this._dbSet.currentItem; }
            get dbSet() { return this._dbSet; }
            get addNewCommand() { return this._addNewCommand; }
            get tabsEventCommand() { return this._tabsEventCommand; }
            get propChangeCommand() { return this._propChangeCommand; }
            get orderStatuses() { return this._orderStatuses; }
            get currentCustomer() { return this._currentCustomer; }
            set currentCustomer(v) {
                if (v !== this._currentCustomer) {
                    this._currentCustomer = v;
                    this.raisePropertyChanged('currentCustomer');
                    this.load();
                }
            }
            get customerVM() { return this._customerVM; }
            get orderDetailsVM() { return this._orderDetailVM; }
            get selectedTabIndex() { return this._selectedTabIndex; }
        }

        export class OrderDetailVM extends MOD.mvvm.BaseViewModel {
            _orderVM: OrderVM;
            _dbSet: DEMODB.SalesOrderDetailDb;
            _currentOrder: DEMODB.SalesOrderHeader;
            _productVM: ProductVM;

            constructor(orderVM: OrderVM) {
                super(orderVM.app);
                var self = this;
                this._dbSet = this.dbSets.SalesOrderDetail;
                this._orderVM = orderVM;
                this._currentOrder = null;

                this._orderVM.dbSet.addOnCleared(function (s, a) {
                    self.clear();
                }, self.uniqueID);

                this._dbSet.addOnPropertyChange('currentItem', function (sender, args) {
                    self._onCurrentChanged();
                }, self.uniqueID);

                this._productVM = new ProductVM(this);
            }
            _onCurrentChanged() {
                this.raisePropertyChanged('currentItem');
            }
            //returns promise
            load() {
                this.clear();

                if (!this.currentOrder || this.currentOrder.getIsNew()) {
                    var deferred = new global.$.Deferred();
                    deferred.reject();
                    return deferred.promise();
                }
                var query = this.dbSet.createQuery('ReadSalesOrderDetail');
                query.where('SalesOrderID', '=', [this.currentOrder.SalesOrderID]);
                query.orderBy('SalesOrderDetailID', 'ASC');
                return this.dbContext.load(query);
            }
            clear() {
                this.dbSet.clear();
            }
            destroy() {
                if (this._isDestroyed)
                    return;
                this._isDestroyCalled = true;
                if (!!this._dbSet) {
                    this._dbSet.removeNSHandlers(this.uniqueID);
                }
                this.currentOrder = null;
                this._productVM.destroy();
                this._orderVM.dbSet.removeNSHandlers(this.uniqueID);
                this._orderVM.removeNSHandlers(this.uniqueID);
                this._orderVM = null;
               super.destroy();
            }
            get app() { return <DemoApplication>this._app; }
            get dbContext() { return this.app.dbContext; }
            get dbSets() { return this.dbContext.dbSets; }
            get currentItem() { return this._dbSet.currentItem; }
            get dbSet() { return this._dbSet; }
            get currentOrder() { return this._currentOrder; }
            set currentOrder(v) {
                if (v !== this._currentOrder) {
                    this._currentOrder = v;
                    this.raisePropertyChanged('currentOrder');
                    this.load();
                }
            }
            get orderVM() { return this._orderVM; }
        }

        export class AddressVM extends MOD.mvvm.BaseViewModel {
            _orderVM: OrderVM;
            _dbSet: DEMODB.AddressDb;

            constructor(orderVM: OrderVM) {
                super(orderVM.app);
                var self = this;
                this._orderVM = orderVM;
                this._dbSet = this.dbSets.Address;
                this._orderVM.dbSet.addOnFill(function (sender, args) {
                    if (!args.isBegin)
                        self.loadAddressesForOrders(<DEMODB.SalesOrderHeader[]>args.fetchedItems);
                }, self.uniqueID);

                this._dbSet.addOnPropertyChange('currentItem', function (sender, args) {
                    self._onCurrentChanged();
                }, self.uniqueID);
            }
            _onCurrentChanged() {
                this.raisePropertyChanged('currentItem');
            }
            //returns promise
            loadAddressesForOrders(orders: DEMODB.SalesOrderHeader[]) {
                var ids1:number[] = orders.map(function (item) {
                    return item.ShipToAddressID;
                });
                var ids2: number[] = orders.map(function (item) {
                    return item.BillToAddressID;
                });
                var ids: number[] = ids1.concat(ids2).filter(function (id) {
                    return id !== null;
                });
                return this.load(ArrayHelper.distinct(ids), false);
            }
            //returns promise
            load(ids:number[], isClearTable:boolean) {
                var query = this.dbSet.createReadAddressByIdsQuery({ addressIDs: ids });
                //if true, previous data will be cleared when the new is loaded
                query.isClearPrevData = isClearTable;
                return this.dbContext.load(query);
            }
            clear() {
                this.dbSet.clear();
            }
            destroy() {
                if (this._isDestroyed)
                    return;
                this._isDestroyCalled = true;
                if (!!this._dbSet) {
                    this._dbSet.removeNSHandlers(this.uniqueID);
                }
                this._customerDbSet.removeNSHandlers(this.uniqueID);
                this._orderVM.removeNSHandlers(this.uniqueID);
                this._orderVM = null;
                this._customerDbSet = null;
                super.destroy();
            }
            get _customerDbSet() { return this._orderVM.customerVM.dbSet; }
            get app() { return <DemoApplication>this._app; }
            get dbContext() { return this.app.dbContext; }
            get dbSets() { return this.dbContext.dbSets; }
            get currentItem() { return this._dbSet.currentItem; }
            get dbSet() { return this._dbSet; }
            get orderVM() { return this._orderVM; }
        }

        export class ProductAutoComplete extends AUTOCOMPLETE.AutoCompleteElView {
            _lastLoadedID: number;
            _lookupSource: DEMODB.ProductDb;

            _init(options) {
                super._init(options);
                var self = this;
                this._lastLoadedID = null;
                this._lookupSource = <DEMODB.ProductDb>this._getDbContext().getDbSet('Product');
                this._lookupSource.addOnCollChanged(function (sender, args) {
                    self._updateValue();
                }, self._objId);
            }
            //overriden base method
            _updateSelection() {
                if (!!this.dataContext) {
                    var id = this.currentSelection;
                    this.dataContext.ProductID = id;
                }
            }
            _onHide() {
                super._onHide();
                this._updateValue();
            }
            //new method
            _updateValue() {
                if (!this.dataContext) {
                    this.value = '';
                    return;
                }
                var productID = this.dataContext.ProductID;
                //casting will be solved with generics soon
                var product: DEMODB.Product = <DEMODB.Product>this._lookupSource.findByPK(productID);
                if (!!product) {
                    this.value = product.Name;
                }
                else {
                    this.value = '';
                    if (this._lastLoadedID !== productID) {
                        //this prevents the cicles of loading of the same item
                        this._lastLoadedID = productID;
                        var query = this._lookupSource.createReadProductByIdsQuery({ productIDs: [productID] });
                        query.isClearPrevData = false;
                        query.load();
                    }
                }
            }
            //overriden base property
            get dataContext() { return <DEMODB.Product>this._dataContext; }
            set dataContext(v) {
                var self = this;
                if (this._dataContext !== v) {
                    if (!!this._dataContext) {
                        this._dataContext.removeNSHandlers(this.uniqueID);
                    }
                    this._dataContext = v;
                    if (!!this._dataContext) {
                        this._dataContext.addOnPropertyChange('ProductID', function (sender, a) {
                            self._updateValue();
                        }, this.uniqueID);
                    }
                    self._updateValue();
                    this.raisePropertyChanged('dataContext');
                }
            }
            //overriden base property
            get currentSelection() {
                if (!!this.gridDataSource.currentItem)
                    return <number>this.gridDataSource.currentItem['ProductID'];
                else
                    return null;
            }
        }

        export class ProductVM extends MOD.mvvm.BaseViewModel {
            _orderDetailVM: OrderDetailVM;
            _dbSet: DEMODB.ProductDb;

            constructor(orderDetailVM: OrderDetailVM) {
                super(orderDetailVM.app);
                var self = this;
                this._orderDetailVM = orderDetailVM;
                this._dbSet = this.dbSets.Product;

                this._customerDbSet.addOnCleared(function (s, a) {
                    self.clear();
                }, self.uniqueID);

                //here we load products which are referenced in order details
                this._orderDetailVM.dbSet.addOnFill(function (sender, args) {
                    if (!args.isBegin)
                        self.loadProductsForOrderDetails(<DEMODB.SalesOrderDetail[]>args.fetchedItems);
                }, self.uniqueID);

                this._dbSet.addOnPropertyChange('currentItem', function (sender, args) {
                    self._onCurrentChanged();
                }, self.uniqueID);
            }
            _onCurrentChanged() {
                this.raisePropertyChanged('currentItem');
            }
            clear() {
                this.dbSet.clear();
            }
            //returns promise
            loadProductsForOrderDetails(orderDetails: DEMODB.SalesOrderDetail[]) {
                var ids:number[] = orderDetails.map(function (item) {
                    return item.ProductID;
                }).filter(function (id) {
                    return id !== null;
                });

                return this.load(ArrayHelper.distinct(ids), false);
            }
           //returns promise
            load(ids:number[], isClearTable:boolean) {
                var query = this.dbSet.createReadProductByIdsQuery({ productIDs: ids });
                query.isClearPrevData = isClearTable;
                return this.dbContext.load(query);
            }
            destroy() {
                if (this._isDestroyed)
                    return;
                this._isDestroyCalled = true;
                if (!!this._dbSet) {
                    this._dbSet.removeNSHandlers(this.uniqueID);
                }
                this._customerDbSet.removeNSHandlers(this.uniqueID);
                this._orderDetailVM.removeNSHandlers(this.uniqueID);
                this._orderDetailVM = null;
                this._customerDbSet = null;
                super.destroy();
            }
            get _customerDbSet() { return this._orderDetailVM.orderVM.customerVM.dbSet; }
            get app() { return <DemoApplication>this._app; }
            get dbContext() { return this.app.dbContext; }
            get dbSets() { return this.dbContext.dbSets; }
            get currentItem() { return this._dbSet.currentItem; }
            get dbSet() { return this._dbSet; }
        }

        export interface IMainOptions extends IAppOptions {
            service_url: string;
            permissionInfo?: MOD.db.IPermissionsInfo;
            images_path: string;
        }

        export class DemoApplication extends Application {
            _dbContext: DEMODB.DbContext;
            _errorVM: COMMON.ErrorViewModel;
            _customerVM: CustomerVM;

            constructor(options: IMainOptions) {
                super(options);
                var self = this;
                this._dbContext = null;
                this._errorVM = null;
                this._customerVM = null;
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

                this._dbContext.dbSets.Customer.defineNameField(function () {
                    return toText(this.LastName) + '  ' + toText(this.MiddleName) + '  ' + toText(this.FirstName);
                });
                this.registerObject('dbContext', this._dbContext);
                this._errorVM = new COMMON.ErrorViewModel(this);
                this._customerVM = new CustomerVM(this);

                function handleError(sender, data) {
                    self._handleError(sender, data);
                };
                //here we could process application's errors
                this.addOnError(handleError);
                this._dbContext.addOnError(handleError);

                super.onStartUp();
                this._customerVM.load();
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
                    self._customerVM.destroy();
                    self._dbContext.destroy();
                } finally {
                    super.destroy();
                }
            }
            get options() { return <IMainOptions>this._options; }
            get dbContext() { return this._dbContext; }
            get errorVM() { return this._errorVM; }
            get customerVM() { return this._customerVM; }
            get TEXT() { return localizable.TEXT; }
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
            thisApp.startUp((app) => {});
        });
   
     
        //this function is executed when the application is created
        //it can be used to initialize application's specific resources in the module
        function initModule(app: Application) {
            app.registerElView('productAutocomplete', ProductAutoComplete);
            return MDETDEMO;
        };

        //properties must be initialized on HTML page
        export var mainOptions: IMainOptions = {
            service_url: null,
            permissionInfo: null,
            images_path: null,
            user_modules: [{ name: "COMMON", initFn: COMMON.initModule },
            { name: "AUTOCOMPLETE", initFn: AUTOCOMPLETE.initModule },
            { name: "MDETDEMO", initFn: initModule }]
        };
    }
}

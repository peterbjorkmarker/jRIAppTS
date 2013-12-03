/// <reference path="..\jriapp.d.ts"/>
/// <reference path="common.ts"/>
/// <reference path="autocomplete.ts"/>
/// <reference path="demoDB.ts"/>

module RIAPP
{
    'use strict';
    export module SPADEMO {
        var global = RIAPP.global, utils = global.utils;
        //private helper function (used inside this module only)
        function addTextQuery(query: MOD.db.DataQuery, fldName: string, val) {
            var tmp;
            if (!!val) {
                if (utils.str.startsWith(val, '%') && utils.str.endsWith(val, '%')) {
                    tmp = utils.str.trim(val, '% ');
                    query.where(fldName, MOD.collection.FILTER_TYPE.Contains, [tmp])
                }
                else if (utils.str.startsWith(val, '%')) {
                    tmp = utils.str.trim(val, '% ');
                    query.where(fldName, MOD.collection.FILTER_TYPE.EndsWith, [tmp])
                }
                else if (utils.str.endsWith(val, '%')) {
                    tmp = utils.str.trim(val, '% ');
                    query.where(fldName, MOD.collection.FILTER_TYPE.StartsWith, [tmp])
                }
                else {
                    tmp = utils.str.trim(val);
                    query.where(fldName, MOD.collection.FILTER_TYPE.Equals, [tmp])
                }
            }
            return query;
        };

        export class MainViewVM extends BaseObject {
            _custTemplName: string;
            _custDetTemplName: string;
            _viewName: string;

            constructor() {
                super();
                this._custTemplName = 'SPAcustTemplate';
                this._custDetTemplName = 'SPAcustDetailTemplate';
                this._viewName = this._custTemplName;
            }
            goToAllCust() {
                this.viewName = this.custTemplName;
            }
            goToCustDet() {
                this.viewName = this.custDetTemplName;
            }
            reset() {
                this.viewName = this._custTemplName;
            }
            get viewName() { return this._viewName; }
            set viewName(v) {
                if (v !== this._viewName) {
                    this._viewName = v;
                    this.raisePropertyChanged('viewName');
                }
            }
            get custTemplName() { return this._custTemplName; }
            get custDetTemplName() { return this._custDetTemplName; }
        }

        export class CustDetViewVM extends BaseObject {
            _infoTemplName: string;
            _adrTemplName: string;
            _viewName: string;

            constructor() {
                super();
                this._infoTemplName = 'customerInfo';
                this._adrTemplName = 'customerAddr';
                this._viewName = this._infoTemplName;
            }
            goToCustInfo() {
                this.viewName = this.infoTemplName;
            }
            goToAdrInfo() {
                this.viewName = this.adrTemplName;
            }
            reset() {
                this.viewName = this._infoTemplName;
            }
            get viewName() { return this._viewName; }
            set viewName(v) {
                if (v !== this._viewName) {
                    this._viewName = v;
                    this.raisePropertyChanged('viewName');
                }
            }
            get infoTemplName() { return this._infoTemplName; }
            get adrTemplName() { return this._adrTemplName; }
        }

        export class AddrViewVM extends BaseObject {
            _linkAdrTemplate: string;
            _newAdrTemplate: string;
            _viewName: string;
            constructor() {
                super();
                this._linkAdrTemplate = 'linkAdrTemplate';
                this._newAdrTemplate = 'newAdrTemplate';
                this._viewName = this._linkAdrTemplate;
            }
            goToLinkAdr() {
                this.viewName = this.linkAdrTemplate;
            }
            goToNewAdr() {
                this.viewName = this.newAdrTemplate;
            }
            get viewName() { return this._viewName; }
            set viewName(v) {
                if (v !== this._viewName) {
                    this._viewName = v;
                    this.raisePropertyChanged('viewName');
                }
            }
            get linkAdrTemplate() { return this._linkAdrTemplate; }
            get newAdrTemplate() { return this._newAdrTemplate; }
        }

        export class CustomerVM extends MOD.mvvm.BaseViewModel {
            _dataGrid: MOD.datagrid.DataGrid;
            _dbSet: DEMODB.CustomerDb;
            _propWatcher: MOD.utils.PropWatcher;
            _addNewCommand: MOD.mvvm.ICommand;
            _saveCommand: MOD.mvvm.ICommand;
            _undoCommand: MOD.mvvm.ICommand;
            _loadCommand: MOD.mvvm.ICommand;
            _editCommand: MOD.mvvm.ICommand;
            _endEditCommand: MOD.mvvm.ICommand;
            _cancelEditCommand: MOD.mvvm.ICommand;
            _propChangeCommand: MOD.mvvm.ICommand;
            _tabsEventCommand: MOD.mvvm.ICommand;
            _custAdressView: MOD.db.ChildDataView<DEMODB.CustomerAddress>;
            _customerAddressVM: CustomerAddressVM;
            _ordersVM: OrderVM;
            _uiMainView: MainViewVM;
            _uiDetailView: CustDetViewVM;
            _switchViewCommand: MOD.mvvm.ICommand;
            _switchDetViewCommand: MOD.mvvm.ICommand;

            constructor(app: DemoApplication) {
                super(app);
                var self = this;
                this._dataGrid = null;
                this._dbSet = this.dbSets.Customer;
                this._dbSet.isSubmitOnDelete = true;
                this._propWatcher = new MOD.utils.PropWatcher();
                this._uiMainView = new MainViewVM();
                this._uiDetailView = new CustDetViewVM();
                this._uiMainView.addOnPropertyChange('viewName', function (sender, a) {
                    self._uiDetailView.reset();
                    if (sender.viewName == sender.custTemplName) {
                        setTimeout(function () {
                            if (!!self._dataGrid) {
                                self._dataGrid.scrollToCurrent(true);
                            }
                        }, 0);
                    }
                });


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


                this._editCommand = new MOD.mvvm.Command(function (sender, param) {
                    self.currentItem.beginEdit();
                }, self,
                    function (sender, param) {
                        return !!self.currentItem;
                    });


                this._endEditCommand = new MOD.mvvm.Command(function (sender, param) {
                    if (self.currentItem.endEdit())
                        self.dbContext.submitChanges();
                }, self,
                    function (sender, param) {
                        return !!self.currentItem;
                    });

                this._cancelEditCommand = new MOD.mvvm.Command(function (sender, param) {
                    self.currentItem.cancelEdit();
                    self.dbContext.rejectChanges();
                }, self,
                    function (sender, param) {
                        return !!self.currentItem;
                    });

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

                this._switchViewCommand = new MOD.mvvm.Command(function (sender, param) {
                    self.uiMainView.viewName = param;
                }, self, null);

                this._switchDetViewCommand = new MOD.mvvm.Command(function (sender, param) {
                    self.uiDetailView.viewName = param;
                }, self, null);


                //the property watcher helps us handling properties changes
                //more convenient than using addOnPropertyChange
                this._propWatcher.addPropWatch(self.dbContext, 'hasChanges', function (prop) {
                    self._saveCommand.raiseCanExecuteChanged();
                    self._undoCommand.raiseCanExecuteChanged();
                });

                this._propWatcher.addPropWatch(this._dbSet, 'currentItem', function (prop) {
                    self._editCommand.raiseCanExecuteChanged();
                    self._endEditCommand.raiseCanExecuteChanged();
                    self._cancelEditCommand.raiseCanExecuteChanged();
                    self._onCurrentChanged();
                });

                this._dbSet.addOnCleared(function (s, a) {
                    self.dbSets.CustomerAddress.clear();
                    self.dbSets.Address.clear();
                }, self.uniqueID);

                var custAssoc = self.dbContext.associations.getCustAddrToCustomer();

                //the view to filter CustomerAddresses related to the current customer only
                this._custAdressView = new MOD.db.ChildDataView<DEMODB.CustomerAddress>(
                    {
                        association: custAssoc,
                        fn_sort: function (a: DEMODB.CustomerAddress, b: DEMODB.CustomerAddress) { return a.AddressID - b.AddressID; }
                    });

                this._ordersVM = new OrderVM(this);
                this._customerAddressVM = new CustomerAddressVM(this);
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
                query.orderBy('LastName').thenBy('MiddleName').thenBy('FirstName');
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
                this._customerAddressVM.destroy();
                this._customerAddressVM = null;
                this._custAdressView.destroy();
                this._custAdressView = null;
                super.destroy();
            }
            get app() { return <DemoApplication>this._app; }
            get dbContext() { return this.app.dbContext; }
            get dbSets() { return this.dbContext.dbSets; }
            get dbSet() { return this._dbSet; }
            get currentItem() { return this._dbSet.currentItem; }
            get editCommand() { return this._editCommand; }
            get endEditCommand() { return this._endEditCommand; }
            get cancelEditCommand() { return this._cancelEditCommand; }
            get addNewCommand() { return this._addNewCommand; }
            get saveCommand() { return this._saveCommand; }
            get undoCommand() { return this._undoCommand; }
            get tabsEventCommand() { return this._tabsEventCommand; }
            get propChangeCommand() { return this._propChangeCommand; }
            get loadCommand() { return this._loadCommand; }
            get ordersVM() { return this._ordersVM; }
            get custAdressView() { return this._custAdressView; }
            get customerAddressVM() { return this._customerAddressVM; }
            get switchViewCommand() { return this._switchViewCommand; }
            get switchDetViewCommand() { return this._switchDetViewCommand; }
            get uiMainView() { return this._uiMainView; }
            get uiDetailView() { return this._uiDetailView; }
        }

        export class OrderVM extends MOD.mvvm.BaseViewModel {
            _customerVM: CustomerVM;
            _dbSet: DEMODB.SalesOrderHeaderDb;
            _currentCustomer: DEMODB.Customer;
            _dataGrid: MOD.datagrid.DataGrid;
            _selectedTabIndex: number;
            _orderStatuses: DEMODB.KeyValDictionary;
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
                this._orderStatuses = new DEMODB.KeyValDictionary();
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
                    var item: DEMODB.ISalesOrderHeaderEntity = args.item;
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
                query.where('CustomerID', MOD.collection.FILTER_TYPE.Equals, [this.currentCustomer.CustomerID]);
                query.orderBy('OrderDate').thenBy('SalesOrderID');
                return query.load();
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
            set currentCustomer(v: DEMODB.Customer) {
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
                    var deferred = utils.createDeferred();
                    deferred.reject();
                    return deferred.promise();
                }
                var query = this.dbSet.createQuery('ReadSalesOrderDetail');
                query.where('SalesOrderID', MOD.collection.FILTER_TYPE.Equals, [this.currentOrder.SalesOrderID]);
                query.orderBy('SalesOrderDetailID');
                return query.load();
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
                        self.loadAddressesForOrders(args.fetchedItems);
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
                var ids1: number[] = orders.map(function (item) {
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
            load(ids: number[], isClearTable: boolean) {
                var query = this.dbSet.createReadAddressByIdsQuery({ addressIDs: ids });
                //if true, previous data will be cleared when the new is loaded
                query.isClearPrevData = isClearTable;
                return query.load();
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
                var product = this._lookupSource.findByPK(productID);
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
                        self.loadProductsForOrderDetails(args.fetchedItems);
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
                var ids: number[] = orderDetails.map(function (item) {
                    return item.ProductID;
                }).filter(function (id) {
                    return id !== null;
                });

                return this.load(ArrayHelper.distinct(ids), false);
            }
            //returns promise
            load(ids: number[], isClearTable: boolean) {
                var query = this.dbSet.createReadProductByIdsQuery({ productIDs: ids });
                query.isClearPrevData = isClearTable;
                return query.load();
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


        export class CustomerAddressVM extends MOD.mvvm.BaseViewModel {
            _customerVM: CustomerVM;
            _addressesDb: DEMODB.AddressDb;
            _custAdressDb: DEMODB.CustomerAddressDb;
            _currentCustomer: DEMODB.Customer;
            _addAddressVM: AddAddressVM;
            _addressesView: MOD.db.DataView<DEMODB.Address>;

            constructor(customerVM: CustomerVM) {
                super(customerVM.app);
                var self = this;
                this._customerVM = customerVM;
                this._addAddressVM = null;
                this._currentCustomer = self._customerVM.currentItem;
                this._addressesDb = this.dbSets.Address;
                this._custAdressDb = this.dbSets.CustomerAddress;

                this._custAdressDb.addOnItemDeleting(function (sender, args) {
                    if (!confirm('Are you sure that you want to unlink Address from this customer?'))
                        args.isCancel = true;
                }, self.uniqueID);

                this._custAdressDb.addOnBeginEdit(function (sender, args) {
                    var item = args.item.asInterface();
                    //start editing Address entity, when CustomerAddress begins editing
                    //p.s.- Address is navigation property
                    var address = item.Address;
                    if (!!address)
                        address.beginEdit();
                }, self.uniqueID);

                this._custAdressDb.addOnEndEdit(function (sender, args) {
                    var item = args.item;
                    var address = item.Address;
                    if (!args.isCanceled) {
                        if (!!address)
                            address.endEdit();
                    }
                    else {
                        if (address)
                            address.cancelEdit();
                    }
                }, self.uniqueID);

                this._addressesDb.addOnItemDeleting(function (sender, args) {
                    if (!confirm('Are you sure that you want to delete Customer\'s Address ?'))
                        args.isCancel = true;
                }, self.uniqueID);

                //the view to filter addresses related to the current customer
                this._addressesView = new MOD.db.DataView<DEMODB.Address>(
                    {
                        dataSource: this._addressesDb,
                        fn_sort: function (a: DEMODB.Address, b: DEMODB.Address) { return a.AddressID - b.AddressID; },
                        fn_filter: function (item: DEMODB.Address) {
                            if (!self._currentCustomer)
                                return false;
                            return item.CustomerAddresses.some(function (ca) {
                                return self._currentCustomer === ca.Customer;
                            });
                        },
                        fn_itemsProvider: function (ds) {
                            if (!self._currentCustomer)
                                return [];
                            var custAdrs = self._currentCustomer.CustomerAddresses;
                            return custAdrs.map(function (m) {
                                return m.Address;
                            }).filter(function (address) {
                                return !!address;
                            });
                        }
                    });

                this._custAdressView.addOnViewRefreshed(function (s, a) {
                    self._addressesView.refresh();
                }, self.uniqueID);

                this._customerVM.addOnPropertyChange('currentItem', function (sender, args) {
                    self._currentCustomer = self._customerVM.currentItem;
                    self.raisePropertyChanged('currentCustomer');
                }, self.uniqueID);

            }
            //async load, returns promise
            _loadAddresses(addressIDs: number[], isClearTable: boolean) {
                var query = this._addressesDb.createReadAddressByIdsQuery({ addressIDs: addressIDs });
                //if true, we clear all previous data in the TDbSet
                query.isClearPrevData = isClearTable;
                //returns promise
                return query.load();
            }
            _addNewAddress() {
                //use the TDataView, not TDbSet
                var adr = this.addressesView.addNew();
                return adr;
            }
            _addNewCustAddress(address: DEMODB.Address) {
                var cust = this.currentCustomer;
                //to add item here, use the TDataView, not TDbSet
                var ca = this.custAdressView.addNew();
                ca.CustomerID = cust.CustomerID;
                //this is default, can edit later
                ca.AddressType = "Main Office";
                //create relationship with the address
                //if the address is new, then the primary keys will be aquired when the data is submitted to the server
                ca.Address = address;
                ca.endEdit();
                return ca;
            }
            load(customers: DEMODB.Customer[]) {
                var self = this, custArr = customers || [];

                //customerIDs for all loaded customers entities (for current page only, not which in cache if query.loadPageCount>1)
                var custIDs = custArr.map(function (item) {
                    return item.CustomerID;
                });

                var query = this._custAdressDb.createReadAddressForCustomersQuery({ custIDs: custIDs });
                query.load();
            }
            destroy() {
                if (this._isDestroyed)
                    return;
                this._isDestroyCalled = true;

                if (!!this._addressesDb) {
                    this._addressesDb.removeNSHandlers(this.uniqueID);
                }
                if (!!this._custAdressDb) {
                    this._custAdressDb.removeNSHandlers(this.uniqueID);
                }
                if (!!this._customerVM) {
                    this._customerVM.removeNSHandlers(this.uniqueID);
                }
                if (!!this._custAdressView) {
                    this._custAdressView.removeNSHandlers(this.uniqueID);
                }
                if (this._addAddressVM) {
                    this._addAddressVM.destroy();
                    this._addAddressVM = null;
                }
                super.destroy();
            }

            get app() { return <DemoApplication>this._app; }
            get dbContext() { return this.app.dbContext; }
            get dbSets() { return this.dbContext.dbSets; }
            get addressesDb() { return this._addressesDb; }
            get custAdressDb() { return this._custAdressDb; }
            get addressesView() { return this._addressesView; }
            get custAdressView() { return this._custAdressView; }
            get addAddressVM() {
                if (!this._addAddressVM) {
                    this._addAddressVM = new AddAddressVM(this);
                }
                return this._addAddressVM;
            }
            get currentCustomer() { return this._currentCustomer; }
            get _custAdressView() { return this._customerVM.custAdressView; }
        }

        export class AddAddressVM extends MOD.mvvm.BaseViewModel implements MOD.utils.ISubmittable {
            _customerAddressVM: CustomerAddressVM;
            _addressInfosDb: DEMODB.AddressInfoDb;
            _currentCustomer: DEMODB.Customer;
            _searchToolTip: string;
            _newAddress: DEMODB.Address;
            _adressInfosGrid: MOD.datagrid.DataGrid;
            _searchString: string;
            _dialogVM: COMMON.DialogVM;
            _addressInfosView: MOD.db.DataView<DEMODB.AddressInfo>;
            _linkCommand: MOD.mvvm.ICommand;
            _addNewCommand: MOD.mvvm.ICommand;
            _unLinkCommand: MOD.mvvm.ICommand;
            _execSearchCommand: MOD.mvvm.ICommand;
            _addNewAddressCommand: MOD.mvvm.ICommand;
            _propChangeCommand: MOD.mvvm.ICommand;
            _uiViewVM: AddrViewVM;

            constructor(customerAddressVM: CustomerAddressVM) {
                super(customerAddressVM.app);
                var self = this;
                this._customerAddressVM = customerAddressVM;
                this._addressInfosDb = this.dbContext.dbSets.AddressInfo;
                this._currentCustomer = self._customerAddressVM.currentCustomer;
                this._searchToolTip = 'enter any address part then press search button';
                this._newAddress = null;
                this._adressInfosGrid = null;
                this._searchString = null;
                //for switching user interface current view
                this._uiViewVM = new AddrViewVM();
            
                this._dialogVM = new COMMON.DialogVM(self.app);
                var dialogOptions: MOD.datadialog.IDialogConstructorOptions = {
                    templateID: 'addAddressTemplate',
                    width: 950,
                    height: 600,
                    title: 'add new customer address',
                    submitOnOK: true,
                    fn_OnClose: function (dialog) {
                        if (dialog.result != 'ok') {
                            //if new address is not explicitly accepted then reject added address
                            if (!!self._newAddress) {
                                self._cancelAddNewAddress();
                            }
                            self.dbContext.rejectChanges();
                        }
                        self._addressInfosDb.clear();
                        self.searchString = null;
                    },
                    fn_OnOK: function (dialog) {
                        var DIALOG_ACTION = MOD.datadialog.DIALOG_ACTION;
                        if (self.uiViewVM.viewName != self.uiViewVM.newAdrTemplate) {
                            //allow to close the dialog
                            return DIALOG_ACTION.Default;
                        }
                        if (!self._newAddress.endEdit())
                            return DIALOG_ACTION.StayOpen;
                        var custAdress = self._customerAddressVM._addNewCustAddress(self._newAddress);
                        custAdress.endEdit();
                        self._newAddress = null;
                        self.uiViewVM.goToLinkAdr();
                        self.raisePropertyChanged('newAddress');
                        return DIALOG_ACTION.StayOpen;
                    },
                    fn_OnCancel: function (dialog) {
                        var DIALOG_ACTION = MOD.datadialog.DIALOG_ACTION;
                        if (self.uiViewVM.viewName != self.uiViewVM.newAdrTemplate) {
                            return DIALOG_ACTION.Default;
                        }
                        if (!!self._newAddress) {
                            self._cancelAddNewAddress();
                        }
                        return DIALOG_ACTION.StayOpen;
                    }
                };
                this._dialogVM.createDialog('addressDialog', dialogOptions);

                //this data displayed in the right panel - contains available (existing in db) addresses
                this._addressInfosView = new MOD.db.DataView<DEMODB.AddressInfo>(
                    {
                        dataSource: this._addressInfosDb,
                        fn_sort: function (a: DEMODB.AddressInfo, b: DEMODB.AddressInfo) { return a.AddressID - b.AddressID; },
                        fn_filter: function (item: DEMODB.AddressInfo) {
                            return !item.CustomerAddresses.some(function (CustAdr) {
                                return self._currentCustomer === CustAdr.Customer;
                            });
                        }
                    });

                //enable paging in the data view
                this._addressInfosView.isPagingEnabled = true;
                this._addressInfosView.pageSize = 50;

                this._addressInfosView.addOnPropertyChange('currentItem', function (sender, args) {
                    self.raisePropertyChanged('currentAddressInfo');
                    self._linkCommand.raiseCanExecuteChanged();
                }, self.uniqueID);

                this._customerAddressVM.addOnPropertyChange('currentCustomer', function (sender, args) {
                    self._currentCustomer = self._customerAddressVM.currentCustomer;
                    self.raisePropertyChanged('customer');
                    self._addNewCommand.raiseCanExecuteChanged();
                }, self.uniqueID);

                //this data is displayed on the left panel - addresses currently linked to the customer
                this.custAdressView.addOnPropertyChange('currentItem', function (sender, args) {
                    self._unLinkCommand.raiseCanExecuteChanged();
                }, self.uniqueID);

                //add new or existing address
                this._addNewCommand = new MOD.mvvm.Command(function (sender, param) {
                    try {
                        self._dialogVM.showDialog('addressDialog', self);
                    } catch (ex) {
                        self._onError(ex, this);
                    }
                }, self,
                    function (sender, param) {
                        //enable this command when customer is not null
                        return !!self.customer;
                    });

                //load searched address data from the server
                this._execSearchCommand = new MOD.mvvm.Command(function (sender, args) {
                    self.loadAddressInfos();
                }, self, null);

                //adds new address to the customer
                this._addNewAddressCommand = new MOD.mvvm.Command(function (sender, args) {
                    self._addNewAddress();
                }, self, null);

                //adds existed address to the customer
                this._linkCommand = new MOD.mvvm.Command(function (sender, args) {
                    self._linkAddress();
                }, self, function (s, a) {
                    return !!self._addressInfosView.currentItem;
                });

                this._unLinkCommand = new MOD.mvvm.Command(function (sender, args) {
                    self._unLinkAddress();
                }, self, function (s, a) {
                    return !!self.custAdressView.currentItem;
                });

                //this is bound to the grid element view on the page
                //by this command we can get hold of the datagrid control
                //this command executed when element view property changes
                //we grab grid property from the sender (which is element view, and has property - grid)
                this._propChangeCommand = new MOD.baseElView.PropChangedCommand(function (sender, args) {
                    if (args.property == '*' || args.property == 'grid') {
                        self._adressInfosGrid = sender.grid;
                    }
                }, self, null);
            }
            _cancelAddNewAddress() {
                var self = this;
                self._newAddress.cancelEdit();
                self._newAddress.rejectChanges();
                self._newAddress = null;
                self.uiViewVM.goToLinkAdr();
                self.raisePropertyChanged('newAddress');
            }
            //returns promise
            loadAddressInfos() {
                var query = this._addressInfosDb.createReadAddressInfoQuery();
                query.isClearPrevData = true;
                addTextQuery(query, 'AddressLine1', '%' + this.searchString + '%');
                query.orderBy('AddressLine1');
                return query.load();
            }
            _addNewAddress() {
                this._newAddress = this._customerAddressVM._addNewAddress();
                this.uiViewVM.goToNewAdr();
                this.raisePropertyChanged('newAddress');
            }
            _linkAddress() {
                var self = this, adrInfo = this.currentAddressInfo, adrView = self.custAdressView, adrID: number;
                if (!adrInfo) {
                    alert('_linkAddress error: adrInfoEntity is null');
                    return;
                }
                adrID = adrInfo.AddressID;
                var existedAddr: boolean = adrView.items.some(function (item) {
                    return item.AddressID === adrID;
                });

                if (existedAddr) {
                    alert('Customer already has this address!');
                    return;
                }

                //dont clear, append to the existing
                var promise = this._customerAddressVM._loadAddresses([adrID], false);
                promise.done(function (res) {
                    var address = self._customerAddressVM.addressesDb.findByPK(adrID);
                    if (!!address) {
                        self._customerAddressVM._addNewCustAddress(address);
                        //remove address from right panel
                        self._removeAddressRP(adrID);
                    }
                });
            }
            _unLinkAddress() {
                var item = this.custAdressView.currentItem;
                if (!item) {
                    return;
                }
                var id = item.AddressID;
                //delete it from the left panel
                if (item.deleteItem())
                    //and then add the address to the right panel (really adds an addressInfo, not the address entity)
                    this._addAddressRP(id);
            }
            //adds an addressInfo to the right panel
            _addAddressRP(addressID: number) {
                //if address already on client, just make it be displayed in the view
                if (this._checkAddressInRP(addressID)) {
                    var deferred = utils.createDeferred();
                    deferred.reject();
                    return deferred.promise();
                }
                //if we are here, we need to load the address from the server
                var self = this, query = this._addressInfosDb.createReadAddressInfoQuery();
                //dont clear, append to the existing
                query.isClearPrevData = false;
                query.where('AddressID', MOD.collection.FILTER_TYPE.Equals, [addressID]);
                var promise = query.load();
                promise.done(function () {
                    self._checkAddressInRP(addressID);
                });
                return promise;
            }
            //make sure if the addressInfo already on the client, adds it to the view
            _checkAddressInRP(addressID) {
                //try to find it in the TDbSet
                var item = this._addressInfosDb.findByPK(addressID);
                if (!!item) {
                    //if found, try append to the view
                    var appended = this._addressInfosView.appendItems([item]);
                    this._addressInfosView.currentItem = item;
                    if (!!this._adressInfosGrid)
                        this._adressInfosGrid.scrollToCurrent(true);
                }
                return !!item;
            }
            //remove the address from the right panel (it is done by removing the item from the view)
            _removeAddressRP(addressID) {
                var item = this._addressInfosView.findByPK(addressID);
                if (!!item) {
                    this._addressInfosView.removeItem(item);
                }
            }
            submitChanges():IPromise<any> { return this.dbContext.submitChanges(); }
            destroy() {
                if (this._isDestroyed)
                    return;
                this._isDestroyCalled = true;
                if (!!this._addressInfosDb) {
                    this._addressInfosDb.removeNSHandlers(this.uniqueID);
                    this._addressInfosDb.clear();
                    this._addressInfosDb = null;
                }
                if (!!this._addressInfosView) {
                    this._addressInfosView.destroy();
                    this._addressInfosView = null;
                }
                this.custAdressView.removeNSHandlers(this.uniqueID);
                if (!!this._customerAddressVM) {
                    this._customerAddressVM.removeNSHandlers(this.uniqueID);
                    this._customerAddressVM = null;
                }
                super.destroy();
            }
            get app() { return <DemoApplication>this._app; }
            get dbContext() { return this.app.dbContext; }
            get dbSets() { return this.dbContext.dbSets; }
            get _isCanSubmit():boolean { return true; }
            get addressInfosDb() { return this._addressInfosDb; }
            get addressInfosView() { return this._addressInfosView; }
            get addressesView() { return this._customerAddressVM._addressesView; }
            get custAdressView() { return this._customerAddressVM.custAdressView; }
            get currentAddressInfo() { return <DEMODB.AddressInfo>this._addressInfosView.currentItem; }
            get searchString() { return this._searchString; }
            set searchString(v) {
                if (this._searchString !== v) {
                    this._searchString = v;
                    this.raisePropertyChanged('searchString');
                }
            }
            get addNewCommand() { return this._addNewCommand; }
            get execSearchCommand() { return this._execSearchCommand; }
            get addNewAddressCommand() { return this._addNewAddressCommand; }
            //links an address to the customer
            get linkCommand() { return this._linkCommand; }
            get unLinkCommand() { return this._unLinkCommand; }
            get newAddress() { return this._newAddress; }
            get customer() { return this._currentCustomer; }
            get propChangeCommand() { return this._propChangeCommand; }
            get searchToolTip() { return this._searchToolTip; }
            get uiViewVM() { return this._uiViewVM; }
        }

        export interface IMainOptions extends IAppOptions {
            service_url: string;
            permissionInfo?: MOD.db.IPermissionsInfo;
            images_path: string;
            spa_template1_url: string;
            spa_template2_url: string;
            spa_template3_url: string;
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
                //register globally accesible dbContext's instance
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

            thisApp.registerTemplateGroup('custGroup',
            {
              url: mainOptions.spa_template1_url,
              names: ["SPAcustTemplate", "goToInfoColTemplate", "SPAcustDetailTemplate", "customerEditTemplate", "customerDetailsTemplate", "orderEditTemplate",
             "orderDetEditTemplate", "orderDetailsTemplate", "productTemplate1", "productTemplate2",
             "prodAutocompleteTemplate"]
            });

            thisApp.registerTemplateGroup('custInfoGroup',
            {
                url: mainOptions.spa_template2_url,
                names: ["customerInfo", "salespersonTemplate1", "salespersonTemplate2", "salePerAutocompleteTemplate"]
            });

            thisApp.registerTemplateGroup('custAdrGroup',
            {
                url: mainOptions.spa_template3_url,
                names: ["customerAddr", "addressTemplate", "addAddressTemplate", "linkAdrTemplate", "newAdrTemplate"]
            });

            thisApp.startUp((app) => { });
        });


        //this function is executed when the application is created
        //it can be used to initialize application's specific resources in the module
        function initModule(app: Application) {
            app.registerElView('productAutocomplete', ProductAutoComplete);
            return SPADEMO;
        };

        //properties must be initialized on HTML page
        export var mainOptions: IMainOptions = {
            service_url: null,
            permissionInfo: null,
            images_path: null,
            spa_template1_url: null,
            spa_template2_url: null,
            spa_template3_url: null,
            user_modules: [{ name: "COMMON", initFn: COMMON.initModule },
            { name: "AUTOCOMPLETE", initFn: AUTOCOMPLETE.initModule },
            { name: "SPADEMO", initFn: initModule }]
        };
    }
}

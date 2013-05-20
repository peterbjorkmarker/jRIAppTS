var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="..\jriapp.ts"/>
/// <reference path="common.ts"/>
/// <reference path="autocomplete.ts"/>
/// <reference path="demoDB.ts"/>
var RIAPP;
(function (RIAPP) {
    'use strict';
    //master-details demo module
    (function (MDETDEMO) {
        var global = RIAPP.global, utils = global.utils;
        var CustomerVM = (function (_super) {
            __extends(CustomerVM, _super);
            function CustomerVM(app) {
                        _super.call(this, app);
                var self = this;
                this._dataGrid = null;
                this._dbSet = this.dbSets.Customer;
                this._dbSet.isSubmitOnDelete = true;
                this._propWatcher = new RIAPP.MOD.utils.PropWatcher();
                this._dbSet.addOnItemDeleting(function (sender, args) {
                    if(!confirm('Are you sure that you want to delete customer ?')) {
                        args.isCancel = true;
                    }
                }, self.uniqueID);
                this._dbSet.addOnFill(function (sender, args) {
                    //when fill is ended
                    if(args.isBegin && args.isPageChanged) {
                        self.raiseEvent('page_changed', {
                        });
                    }
                }, self.uniqueID);
                //adds new customer - uses dialog to enter the data
                this._addNewCommand = new RIAPP.MOD.mvvm.Command(function (sender, param) {
                    //showing of the dialog is handled by the datagrid
                    self._dbSet.addNew();
                }, self, function (sender, param) {
                    //the command is always enabled
                    return true;
                });
                //saves changes (submitts them to the service)
                this._saveCommand = new RIAPP.MOD.mvvm.Command(function (sender, param) {
                    self.dbContext.submitChanges();
                }, self, function (s, p) {
                    //the command is enabled when there are pending changes
                    return self.dbContext.hasChanges;
                });
                this._undoCommand = new RIAPP.MOD.mvvm.Command(function (sender, param) {
                    self.dbContext.rejectChanges();
                }, self, function (s, p) {
                    //the command is enabled when there are pending changes
                    return self.dbContext.hasChanges;
                });
                //load data from the server
                this._loadCommand = new RIAPP.MOD.mvvm.Command(function (sender, args) {
                    self.load();
                }, self, null);
                //example of getting instance of bounded dataGrid by using elView's propChangedCommand
                this._propChangeCommand = new RIAPP.MOD.mvvm.Command(function (sender, args) {
                    if(args.property == '*' || args.property == 'grid') {
                        self._dataGrid = sender.grid;
                    }
                    //example of binding to dataGrid events
                    if(!!self._dataGrid) {
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
                this._tabsEventCommand = new RIAPP.MOD.mvvm.Command(function (sender, param) {
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
                this._custAdressView = new RIAPP.MOD.db.ChildDataView({
                    association: custAssoc,
                    fn_sort: function (a, b) {
                        return a.AddressID - b.AddressID;
                    }
                });
                this._ordersVM = new OrderVM(this);
            }
            CustomerVM.prototype._getEventNames = function () {
                var base_events = _super.prototype._getEventNames.call(this);
                return [
                    'row_expanded', 
                    'page_changed'
                ].concat(base_events);
            };
            CustomerVM.prototype._onGridPageChanged = function () {
            };
            CustomerVM.prototype._onGridRowSelected = function (row) {
            };
            CustomerVM.prototype._onGridRowExpanded = function (oldRow, row, isExpanded) {
                var r = row;
                if(!isExpanded) {
                    r = oldRow;
                }
                this.raiseEvent('row_expanded', {
                    customer: r.item,
                    isExpanded: isExpanded
                });
            };
            CustomerVM.prototype._onCurrentChanged = function () {
                this._custAdressView.parentItem = this._dbSet.currentItem;
                this.raisePropertyChanged('currentItem');
            };
            CustomerVM.prototype.load = //returns promise
            function () {
                var query = this._dbSet.createReadCustomerQuery({
                    includeNav: true
                });
                query.pageSize = 50;
                //load ten pages at once -- 500 rows
                query.loadPageCount = 10;
                //load without filtering
                query.orderBy('LastName', 'ASC').thenBy('MiddleName', 'ASC').thenBy('FirstName', 'ASC');
                return this.dbContext.load(query);
            };
            CustomerVM.prototype.destroy = function () {
                if(this._isDestroyed) {
                    return;
                }
                this._isDestroyCalled = true;
                this._propWatcher.destroy();
                this._propWatcher = null;
                if(!!this._dbSet) {
                    this._dbSet.removeNSHandlers(this.uniqueID);
                }
                if(!!this._dataGrid) {
                    this._dataGrid.removeNSHandlers(this.uniqueID);
                }
                this._ordersVM.destroy();
                this._ordersVM = null;
                _super.prototype.destroy.call(this);
            };
            Object.defineProperty(CustomerVM.prototype, "app", {
                get: function () {
                    return this._app;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomerVM.prototype, "dbContext", {
                get: function () {
                    return this.app.dbContext;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomerVM.prototype, "dbSets", {
                get: function () {
                    return this.dbContext.dbSets;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomerVM.prototype, "dbSet", {
                get: function () {
                    return this._dbSet;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomerVM.prototype, "currentItem", {
                get: function () {
                    return this._dbSet.currentItem;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomerVM.prototype, "addNewCommand", {
                get: function () {
                    return this._addNewCommand;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomerVM.prototype, "saveCommand", {
                get: function () {
                    return this._saveCommand;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomerVM.prototype, "undoCommand", {
                get: function () {
                    return this._undoCommand;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomerVM.prototype, "tabsEventCommand", {
                get: function () {
                    return this._tabsEventCommand;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomerVM.prototype, "propChangeCommand", {
                get: function () {
                    return this._propChangeCommand;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomerVM.prototype, "loadCommand", {
                get: function () {
                    return this._loadCommand;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomerVM.prototype, "ordersVM", {
                get: function () {
                    return this._ordersVM;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomerVM.prototype, "custAdressView", {
                get: function () {
                    return this._custAdressView;
                },
                enumerable: true,
                configurable: true
            });
            return CustomerVM;
        })(RIAPP.MOD.mvvm.BaseViewModel);
        MDETDEMO.CustomerVM = CustomerVM;        
        var OrderVM = (function (_super) {
            __extends(OrderVM, _super);
            function OrderVM(customerVM) {
                        _super.call(this, customerVM.app);
                var self = this;
                this._customerVM = customerVM;
                this._dbSet = this.dbSets.SalesOrderHeader;
                this._currentCustomer = null;
                this._dataGrid = null;
                this._selectedTabIndex = null;
                this._orderStatuses = new RIAPP.MOD.collection.Dictionary('orderStatus', {
                    key: 0,
                    val: ''
                }, 'key');
                this._orderStatuses.fillItems([
                    {
                        key: 0,
                        val: 'New Order'
                    }, 
                    {
                        key: 1,
                        val: 'Status 1'
                    }, 
                    {
                        key: 2,
                        val: 'Status 2'
                    }, 
                    {
                        key: 3,
                        val: 'Status 3'
                    }, 
                    {
                        key: 4,
                        val: 'Status 4'
                    }, 
                    {
                        key: 5,
                        val: 'Completed Order'
                    }
                ], true);
                //loads the data only when customer's row is expanded
                this._customerVM.addHandler('row_expanded', function (sender, args) {
                    if(args.isExpanded) {
                        self.currentCustomer = args.customer;
                    } else {
                        self.currentCustomer = null;
                    }
                }, self.uniqueID);
                this._dbSet.addOnPropertyChange('currentItem', function (sender, args) {
                    self._onCurrentChanged();
                }, self.uniqueID);
                this._dbSet.addOnItemDeleting(function (sender, args) {
                    if(!confirm('Are you sure that you want to delete order ?')) {
                        args.isCancel = true;
                    }
                }, self.uniqueID);
                this._dbSet.addOnItemAdded(function (sender, args) {
                    //can be solved soon with generics
                    var item = args.item;
                    item.Customer = self.currentCustomer;
                    //datejs extension
                    item.OrderDate = (Date).today();
                    item.DueDate = (Date).today().add(6).days();
                    item.OnlineOrderFlag = false;
                }, self.uniqueID);
                //adds new order - uses dialog to fill the data
                this._addNewCommand = new RIAPP.MOD.mvvm.Command(function (sender, param) {
                    //the dialog shown by the datagrid
                    self._dbSet.addNew();
                }, self, function (sender, param) {
                    return true;
                });
                //example of getting instance of bounded dataGrid by using elView's propChangedCommand
                this._propChangeCommand = new RIAPP.MOD.mvvm.Command(function (sender, args) {
                    if(args.property == '*' || args.property == 'grid') {
                        self._dataGrid = sender.grid;
                    }
                    //example of binding to dataGrid events
                    if(!!self._dataGrid) {
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
                this._tabsEventCommand = new RIAPP.MOD.mvvm.Command(function (sender, param) {
                    //here we can handle tabs events
                    switch(param.eventName) {
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
            OrderVM.prototype._getEventNames = function () {
                var base_events = _super.prototype._getEventNames.call(this);
                return [
                    'row_expanded'
                ].concat(base_events);
            };
            OrderVM.prototype._onTabSelected = function (index) {
                this._selectedTabIndex = index;
                this.raisePropertyChanged('selectedTabIndex');
                if(index === 2) {
                    //load details only when tab which contain details grid is selected
                    this._orderDetailVM.currentOrder = this.dbSet.currentItem;
                }
            };
            OrderVM.prototype._onGridPageChanged = function () {
            };
            OrderVM.prototype._onGridRowSelected = function (row) {
            };
            OrderVM.prototype._onGridRowExpanded = function (oldRow, row, isExpanded) {
                var r = row;
                if(!isExpanded) {
                    r = oldRow;
                }
                this.raiseEvent('row_expanded', {
                    order: r.item,
                    isExpanded: isExpanded
                });
                if(isExpanded) {
                    this._onTabSelected(this.selectedTabIndex);
                }
            };
            OrderVM.prototype._onCurrentChanged = function () {
                this.raisePropertyChanged('currentItem');
            };
            OrderVM.prototype.clear = function () {
                this.dbSet.clear();
            };
            OrderVM.prototype.load = //returns promise
            function () {
                //explicitly clear before every load
                this.clear();
                if(!this.currentCustomer || this.currentCustomer.getIsNew()) {
                    var deferred = utils.createDeferred();
                    deferred.reject();
                    return deferred.promise();
                }
                var query = this.dbSet.createReadSalesOrderHeaderQuery();
                query.where('CustomerID', '=', [
                    this.currentCustomer.CustomerID
                ]);
                query.orderBy('OrderDate', 'ASC').thenBy('SalesOrderID', 'ASC');
                return this.dbContext.load(query);
            };
            OrderVM.prototype.destroy = function () {
                if(this._isDestroyed) {
                    return;
                }
                this._isDestroyCalled = true;
                if(!!this._dbSet) {
                    this._dbSet.removeNSHandlers(this.uniqueID);
                }
                if(!!this._dataGrid) {
                    this._dataGrid.removeNSHandlers(this.uniqueID);
                }
                this.currentCustomer = null;
                this._addressVM.destroy();
                this._addressVM = null;
                this._orderDetailVM.destroy();
                this._orderDetailVM = null;
                this._customerVM = null;
                _super.prototype.destroy.call(this);
            };
            Object.defineProperty(OrderVM.prototype, "app", {
                get: function () {
                    return this._app;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OrderVM.prototype, "dbContext", {
                get: function () {
                    return this.app.dbContext;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OrderVM.prototype, "dbSets", {
                get: function () {
                    return this.dbContext.dbSets;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OrderVM.prototype, "currentItem", {
                get: function () {
                    return this._dbSet.currentItem;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OrderVM.prototype, "dbSet", {
                get: function () {
                    return this._dbSet;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OrderVM.prototype, "addNewCommand", {
                get: function () {
                    return this._addNewCommand;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OrderVM.prototype, "tabsEventCommand", {
                get: function () {
                    return this._tabsEventCommand;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OrderVM.prototype, "propChangeCommand", {
                get: function () {
                    return this._propChangeCommand;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OrderVM.prototype, "orderStatuses", {
                get: function () {
                    return this._orderStatuses;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OrderVM.prototype, "currentCustomer", {
                get: function () {
                    return this._currentCustomer;
                },
                set: function (v) {
                    if(v !== this._currentCustomer) {
                        this._currentCustomer = v;
                        this.raisePropertyChanged('currentCustomer');
                        this.load();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OrderVM.prototype, "customerVM", {
                get: function () {
                    return this._customerVM;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OrderVM.prototype, "orderDetailsVM", {
                get: function () {
                    return this._orderDetailVM;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OrderVM.prototype, "selectedTabIndex", {
                get: function () {
                    return this._selectedTabIndex;
                },
                enumerable: true,
                configurable: true
            });
            return OrderVM;
        })(RIAPP.MOD.mvvm.BaseViewModel);
        MDETDEMO.OrderVM = OrderVM;        
        var OrderDetailVM = (function (_super) {
            __extends(OrderDetailVM, _super);
            function OrderDetailVM(orderVM) {
                        _super.call(this, orderVM.app);
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
            OrderDetailVM.prototype._onCurrentChanged = function () {
                this.raisePropertyChanged('currentItem');
            };
            OrderDetailVM.prototype.load = //returns promise
            function () {
                this.clear();
                if(!this.currentOrder || this.currentOrder.getIsNew()) {
                    var deferred = new global.$.Deferred();
                    deferred.reject();
                    return deferred.promise();
                }
                var query = this.dbSet.createQuery('ReadSalesOrderDetail');
                query.where('SalesOrderID', '=', [
                    this.currentOrder.SalesOrderID
                ]);
                query.orderBy('SalesOrderDetailID', 'ASC');
                return this.dbContext.load(query);
            };
            OrderDetailVM.prototype.clear = function () {
                this.dbSet.clear();
            };
            OrderDetailVM.prototype.destroy = function () {
                if(this._isDestroyed) {
                    return;
                }
                this._isDestroyCalled = true;
                if(!!this._dbSet) {
                    this._dbSet.removeNSHandlers(this.uniqueID);
                }
                this.currentOrder = null;
                this._productVM.destroy();
                this._orderVM.dbSet.removeNSHandlers(this.uniqueID);
                this._orderVM.removeNSHandlers(this.uniqueID);
                this._orderVM = null;
                _super.prototype.destroy.call(this);
            };
            Object.defineProperty(OrderDetailVM.prototype, "app", {
                get: function () {
                    return this._app;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OrderDetailVM.prototype, "dbContext", {
                get: function () {
                    return this.app.dbContext;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OrderDetailVM.prototype, "dbSets", {
                get: function () {
                    return this.dbContext.dbSets;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OrderDetailVM.prototype, "currentItem", {
                get: function () {
                    return this._dbSet.currentItem;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OrderDetailVM.prototype, "dbSet", {
                get: function () {
                    return this._dbSet;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OrderDetailVM.prototype, "currentOrder", {
                get: function () {
                    return this._currentOrder;
                },
                set: function (v) {
                    if(v !== this._currentOrder) {
                        this._currentOrder = v;
                        this.raisePropertyChanged('currentOrder');
                        this.load();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OrderDetailVM.prototype, "orderVM", {
                get: function () {
                    return this._orderVM;
                },
                enumerable: true,
                configurable: true
            });
            return OrderDetailVM;
        })(RIAPP.MOD.mvvm.BaseViewModel);
        MDETDEMO.OrderDetailVM = OrderDetailVM;        
        var AddressVM = (function (_super) {
            __extends(AddressVM, _super);
            function AddressVM(orderVM) {
                        _super.call(this, orderVM.app);
                var self = this;
                this._orderVM = orderVM;
                this._dbSet = this.dbSets.Address;
                this._orderVM.dbSet.addOnFill(function (sender, args) {
                    if(!args.isBegin) {
                        self.loadAddressesForOrders(args.fetchedItems);
                    }
                }, self.uniqueID);
                this._dbSet.addOnPropertyChange('currentItem', function (sender, args) {
                    self._onCurrentChanged();
                }, self.uniqueID);
            }
            AddressVM.prototype._onCurrentChanged = function () {
                this.raisePropertyChanged('currentItem');
            };
            AddressVM.prototype.loadAddressesForOrders = //returns promise
            function (orders) {
                var ids1 = orders.map(function (item) {
                    return item.ShipToAddressID;
                });
                var ids2 = orders.map(function (item) {
                    return item.BillToAddressID;
                });
                var ids = ids1.concat(ids2).filter(function (id) {
                    return id !== null;
                });
                return this.load(RIAPP.ArrayHelper.distinct(ids), false);
            };
            AddressVM.prototype.load = //returns promise
            function (ids, isClearTable) {
                var query = this.dbSet.createReadAddressByIdsQuery({
                    addressIDs: ids
                });
                //if true, previous data will be cleared when the new is loaded
                query.isClearPrevData = isClearTable;
                return this.dbContext.load(query);
            };
            AddressVM.prototype.clear = function () {
                this.dbSet.clear();
            };
            AddressVM.prototype.destroy = function () {
                if(this._isDestroyed) {
                    return;
                }
                this._isDestroyCalled = true;
                if(!!this._dbSet) {
                    this._dbSet.removeNSHandlers(this.uniqueID);
                }
                this._customerDbSet.removeNSHandlers(this.uniqueID);
                this._orderVM.removeNSHandlers(this.uniqueID);
                this._orderVM = null;
                this._customerDbSet = null;
                _super.prototype.destroy.call(this);
            };
            Object.defineProperty(AddressVM.prototype, "_customerDbSet", {
                get: function () {
                    return this._orderVM.customerVM.dbSet;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AddressVM.prototype, "app", {
                get: function () {
                    return this._app;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AddressVM.prototype, "dbContext", {
                get: function () {
                    return this.app.dbContext;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AddressVM.prototype, "dbSets", {
                get: function () {
                    return this.dbContext.dbSets;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AddressVM.prototype, "currentItem", {
                get: function () {
                    return this._dbSet.currentItem;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AddressVM.prototype, "dbSet", {
                get: function () {
                    return this._dbSet;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AddressVM.prototype, "orderVM", {
                get: function () {
                    return this._orderVM;
                },
                enumerable: true,
                configurable: true
            });
            return AddressVM;
        })(RIAPP.MOD.mvvm.BaseViewModel);
        MDETDEMO.AddressVM = AddressVM;        
        var ProductAutoComplete = (function (_super) {
            __extends(ProductAutoComplete, _super);
            function ProductAutoComplete() {
                _super.apply(this, arguments);

            }
            ProductAutoComplete.prototype._init = function (options) {
                _super.prototype._init.call(this, options);
                var self = this;
                this._lastLoadedID = null;
                this._lookupSource = this.dbContext.dbSets.Product;
                this._lookupSource.addOnCollChanged(function (sender, args) {
                    self._updateValue();
                }, self._objId);
            };
            ProductAutoComplete.prototype._updateSelection = //overriden base method
            function () {
                if(!!this.dataContext) {
                    var id = this.currentSelection;
                    this.dataContext.ProductID = id;
                }
            };
            ProductAutoComplete.prototype._onHide = function () {
                _super.prototype._onHide.call(this);
                this._updateValue();
            };
            ProductAutoComplete.prototype._updateValue = //new method
            function () {
                if(!this.dataContext) {
                    this.value = '';
                    return;
                }
                var productID = this.dataContext.ProductID;
                //casting will be solved with generics soon
                var product = this._lookupSource.findByPK(productID);
                if(!!product) {
                    this.value = product.Name;
                } else {
                    this.value = '';
                    if(this._lastLoadedID !== productID) {
                        //this prevents the cicles of loading of the same item
                        this._lastLoadedID = productID;
                        var query = this._lookupSource.createReadProductByIdsQuery({
                            productIDs: [
                                productID
                            ]
                        });
                        query.isClearPrevData = false;
                        this.dbContext.load(query);
                    }
                }
            };
            Object.defineProperty(ProductAutoComplete.prototype, "dataContext", {
                get: //overriden base property
                function () {
                    return this._dataContext;
                },
                set: function (v) {
                    var self = this;
                    if(this._dataContext !== v) {
                        if(!!this._dataContext) {
                            this._dataContext.removeNSHandlers(this.uniqueID);
                        }
                        this._dataContext = v;
                        if(!!this._dataContext) {
                            this._dataContext.addOnPropertyChange('ProductID', function (sender, a) {
                                self._updateValue();
                            }, this.uniqueID);
                        }
                        self._updateValue();
                        this.raisePropertyChanged('dataContext');
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductAutoComplete.prototype, "currentSelection", {
                get: //overriden base property
                function () {
                    if(!!this._dbSet.currentItem) {
                        return this._dbSet.currentItem['ProductID'];
                    } else {
                        return null;
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductAutoComplete.prototype, "dbContext", {
                get: function () {
                    return this._dbContext;
                },
                enumerable: true,
                configurable: true
            });
            return ProductAutoComplete;
        })(RIAPP.AUTOCOMPLETE.AutoCompleteElView);
        MDETDEMO.ProductAutoComplete = ProductAutoComplete;        
        var ProductVM = (function (_super) {
            __extends(ProductVM, _super);
            function ProductVM(orderDetailVM) {
                        _super.call(this, orderDetailVM.app);
                var self = this;
                this._orderDetailVM = orderDetailVM;
                this._dbSet = this.dbSets.Product;
                this._customerDbSet.addOnCleared(function (s, a) {
                    self.clear();
                }, self.uniqueID);
                //here we load products which are referenced in order details
                this._orderDetailVM.dbSet.addOnFill(function (sender, args) {
                    if(!args.isBegin) {
                        self.loadProductsForOrderDetails(args.fetchedItems);
                    }
                }, self.uniqueID);
                this._dbSet.addOnPropertyChange('currentItem', function (sender, args) {
                    self._onCurrentChanged();
                }, self.uniqueID);
            }
            ProductVM.prototype._onCurrentChanged = function () {
                this.raisePropertyChanged('currentItem');
            };
            ProductVM.prototype.clear = function () {
                this.dbSet.clear();
            };
            ProductVM.prototype.loadProductsForOrderDetails = //returns promise
            function (orderDetails) {
                var ids = orderDetails.map(function (item) {
                    return item.ProductID;
                }).filter(function (id) {
                    return id !== null;
                });
                return this.load(RIAPP.ArrayHelper.distinct(ids), false);
            };
            ProductVM.prototype.load = //returns promise
            function (ids, isClearTable) {
                var query = this.dbSet.createReadProductByIdsQuery({
                    productIDs: ids
                });
                query.isClearPrevData = isClearTable;
                return this.dbContext.load(query);
            };
            ProductVM.prototype.destroy = function () {
                if(this._isDestroyed) {
                    return;
                }
                this._isDestroyCalled = true;
                if(!!this._dbSet) {
                    this._dbSet.removeNSHandlers(this.uniqueID);
                }
                this._customerDbSet.removeNSHandlers(this.uniqueID);
                this._orderDetailVM.removeNSHandlers(this.uniqueID);
                this._orderDetailVM = null;
                this._customerDbSet = null;
                _super.prototype.destroy.call(this);
            };
            Object.defineProperty(ProductVM.prototype, "_customerDbSet", {
                get: function () {
                    return this._orderDetailVM.orderVM.customerVM.dbSet;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductVM.prototype, "app", {
                get: function () {
                    return this._app;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductVM.prototype, "dbContext", {
                get: function () {
                    return this.app.dbContext;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductVM.prototype, "dbSets", {
                get: function () {
                    return this.dbContext.dbSets;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductVM.prototype, "currentItem", {
                get: function () {
                    return this._dbSet.currentItem;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductVM.prototype, "dbSet", {
                get: function () {
                    return this._dbSet;
                },
                enumerable: true,
                configurable: true
            });
            return ProductVM;
        })(RIAPP.MOD.mvvm.BaseViewModel);
        MDETDEMO.ProductVM = ProductVM;        
        var DemoApplication = (function (_super) {
            __extends(DemoApplication, _super);
            function DemoApplication(options) {
                        _super.call(this, options);
                var self = this;
                this._dbContext = null;
                this._errorVM = null;
                this._customerVM = null;
            }
            DemoApplication.prototype.onStartUp = function () {
                var self = this, options = self.options;
                this._dbContext = new RIAPP.DEMODB.DbContext();
                this._dbContext.initialize({
                    serviceUrl: options.service_url,
                    permissions: options.permissionInfo
                });
                function toText(str) {
                    if(str === null) {
                        return '';
                    } else {
                        return str;
                    }
                }
                ;
                this._dbContext.dbSets.Customer.defineNameField(function () {
                    return toText(this.LastName) + '  ' + toText(this.MiddleName) + '  ' + toText(this.FirstName);
                });
                this.registerObject('dbContext', this._dbContext);
                this._errorVM = new RIAPP.COMMON.ErrorViewModel(this);
                this._customerVM = new CustomerVM(this);
                function handleError(sender, data) {
                    self._handleError(sender, data);
                }
                ;
                //here we could process application's errors
                this.addOnError(handleError);
                this._dbContext.addOnError(handleError);
                _super.prototype.onStartUp.call(this);
                this._customerVM.load();
            };
            DemoApplication.prototype._handleError = function (sender, data) {
                debugger;

                data.isHandled = true;
                this.errorVM.error = data.error;
                this.errorVM.showDialog();
            };
            DemoApplication.prototype.destroy = //really, the destroy method is redundant here because the application lives while the page lives
            function () {
                if(this._isDestroyed) {
                    return;
                }
                this._isDestroyCalled = true;
                var self = this;
                try  {
                    self._errorVM.destroy();
                    self._customerVM.destroy();
                    self._dbContext.destroy();
                }finally {
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
            Object.defineProperty(DemoApplication.prototype, "dbContext", {
                get: function () {
                    return this._dbContext;
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
            Object.defineProperty(DemoApplication.prototype, "customerVM", {
                get: function () {
                    return this._customerVM;
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
            return DemoApplication;
        })(RIAPP.Application);
        MDETDEMO.DemoApplication = DemoApplication;        
        //global error handler - the last resort (typically display message to the user)
        RIAPP.global.addOnError(function (sender, args) {
            debugger;

            alert(args.error.message);
        });
        //create and start application here
        RIAPP.global.addOnLoad(function (sender, a) {
            var global = sender;
            //initialize images folder path
            global.defaults.imagesPath = MDETDEMO.mainOptions.images_path;
            //create and then start application
            var thisApp = new DemoApplication(MDETDEMO.mainOptions);
            thisApp.startUp(function (app) {
            });
        });
        //this function is executed when the application is created
        //it can be used to initialize application's specific resources in the module
        function initModule(app) {
            app.registerElView('productAutocomplete', ProductAutoComplete);
            return MDETDEMO;
        }
        ;
        //properties must be initialized on HTML page
        MDETDEMO.mainOptions = {
            service_url: null,
            permissionInfo: null,
            images_path: null,
            user_modules: [
                {
                    name: "COMMON",
                    initFn: RIAPP.COMMON.initModule
                }, 
                {
                    name: "AUTOCOMPLETE",
                    initFn: RIAPP.AUTOCOMPLETE.initModule
                }, 
                {
                    name: "MDETDEMO",
                    initFn: initModule
                }
            ]
        };
    })(RIAPP.MDETDEMO || (RIAPP.MDETDEMO = {}));
    var MDETDEMO = RIAPP.MDETDEMO;
})(RIAPP || (RIAPP = {}));
//@ sourceMappingURL=masterDetDemo.js.map

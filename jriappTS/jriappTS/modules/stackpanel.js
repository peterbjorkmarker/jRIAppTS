var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RIAPP;
(function (RIAPP) {
    (function (MOD) {
        (function (stackpanel) {
            //local variables for optimization
                        var utils = RIAPP.global.utils, consts = RIAPP.global.consts;
            stackpanel.css = {
                stackpanel: 'ria-stackpanel',
                item: 'stackpanel-item',
                currentItem: 'current-item'
            };
            var StackPanel = (function (_super) {
                __extends(StackPanel, _super);
                function StackPanel(app, el, dataSource, options) {
                                _super.call(this);
                    this._app = app;
                    this._el = el;
                    this._$el = RIAPP.global.$(this._el);
                    this._objId = 'pnl' + utils.getNewID();
                    if(!!dataSource && !(dataSource instanceof MOD.collection.Collection)) {
                        throw new Error(RIAPP.ERRS.ERR_STACKPNL_DATASRC_INVALID);
                    }
                    this._dataSource = dataSource;
                    this._isDSFilling = false;
                    this._orientation = options.orientation || 'horizontal';
                    this._templateID = options.templateID;
                    this._currentItem = null;
                    this._$el.addClass(stackpanel.css.stackpanel);
                    this._itemMap = {
                    };
                    if(!this._templateID) {
                        throw new Error(RIAPP.ERRS.ERR_STACKPNL_TEMPLATE_INVALID);
                    }
                    if(!!this._dataSource) {
                        this._bindDS();
                    }
                    RIAPP.global._trackSelectable(this);
                }
                StackPanel.prototype._getEventNames = function () {
                    var base_events = _super.prototype._getEventNames.call(this);
                    return [
                        'item_clicked'
                    ].concat(base_events);
                };
                StackPanel.prototype.addOnItemClicked = function (fn, namespace) {
                    this.addHandler('item_clicked', fn, namespace);
                };
                StackPanel.prototype.removeOnItemClicked = function (namespace) {
                    this.removeHandler('item_clicked', namespace);
                };
                StackPanel.prototype._onKeyDown = function (key, event) {
                    var ds = this._dataSource, Keys = consts.KEYS, self = this;
                    if(!ds) {
                        return;
                    }
                    if(this._orientation == 'horizontal') {
                        switch(key) {
                            case Keys.left:
                                event.preventDefault();
                                if(ds.movePrev(true)) {
                                    self.scrollIntoView(ds.currentItem);
                                }
                                break;
                            case Keys.right:
                                event.preventDefault();
                                if(ds.moveNext(true)) {
                                    self.scrollIntoView(ds.currentItem);
                                }
                                break;
                        }
                    } else {
                        switch(key) {
                            case Keys.up:
                                event.preventDefault();
                                if(ds.movePrev(true)) {
                                    self.scrollIntoView(ds.currentItem);
                                }
                                break;
                            case Keys.down:
                                event.preventDefault();
                                if(ds.moveNext(true)) {
                                    self.scrollIntoView(ds.currentItem);
                                }
                                break;
                        }
                    }
                };
                StackPanel.prototype._onKeyUp = function (key, event) {
                };
                StackPanel.prototype._updateCurrent = function (item, withScroll) {
                    var self = this, old = self._currentItem, obj;
                    if(old !== item) {
                        this._currentItem = item;
                        if(!!old) {
                            obj = self._itemMap[old._key];
                            if(!!obj) {
                                RIAPP.global.$(obj.div).removeClass(stackpanel.css.currentItem);
                            }
                        }
                        if(!!item) {
                            obj = self._itemMap[item._key];
                            if(!!obj) {
                                RIAPP.global.$(obj.div).addClass(stackpanel.css.currentItem);
                                if(withScroll) {
                                    obj.div.scrollIntoView(false);
                                }
                            }
                        }
                        this.raisePropertyChanged('currentItem');
                    }
                };
                StackPanel.prototype._onDSCurrentChanged = function (args) {
                    var ds = this._dataSource, cur = ds.currentItem;
                    if(!cur) {
                        this._updateCurrent(null, false);
                    } else {
                        this._updateCurrent(cur, true);
                    }
                };
                StackPanel.prototype._onDSCollectionChanged = function (args) {
                    var self = this, CH_T = MOD.collection.consts.COLL_CHANGE_TYPE, items = args.items;
                    switch(args.change_type) {
                        case CH_T.RESET:
                            if(!this._isDSFilling) {
                                this._refresh();
                            }
                            break;
                        case CH_T.ADDED:
                            if(!this._isDSFilling) {
                                //if items are filling then it will be appended when fill ends
                                self._appendItems(items);
                            }
                            break;
                        case CH_T.REMOVE:
                            items.forEach(function (item) {
                                self._removeItem(item);
                            });
                            break;
                        case CH_T.REMAP_KEY:
 {
                                var obj = self._itemMap[args.old_key];
                                if(!!obj) {
                                    delete self._itemMap[args.old_key];
                                    self._itemMap[args.new_key] = obj;
                                    obj.div.setAttribute(consts.DATA_ATTR.DATA_ITEM_KEY, args.new_key);
                                }
                            }
                            break;
                        default:
                            throw new Error(utils.format(RIAPP.ERRS.ERR_COLLECTION_CHANGETYPE_INVALID, args.change_type));
                    }
                };
                StackPanel.prototype._onDSFill = function (args) {
                    var isEnd = !args.isBegin;
                    if(isEnd) {
                        this._isDSFilling = false;
                        if(args.resetUI) {
                            this._refresh();
                        } else {
                            this._appendItems(args.newItems);
                        }
                    } else {
                        this._isDSFilling = true;
                    }
                };
                StackPanel.prototype._onItemStatusChanged = function (item, oldChangeType) {
                    var DEL_STATUS = consts.CHANGE_TYPE.DELETED, newChangeType = item._changeType;
                    var obj = this._itemMap[item._key];
                    if(!obj) {
                        return;
                    }
                    if(newChangeType === DEL_STATUS) {
                        RIAPP.global.$(obj.div).hide();
                    } else if(oldChangeType === DEL_STATUS && newChangeType !== DEL_STATUS) {
                        RIAPP.global.$(obj.div).show();
                    }
                };
                StackPanel.prototype._createTemplate = function (dcxt) {
                    var t = new MOD.template.Template(this.app, this._templateID);
                    t.dataContext = dcxt;
                    return t;
                };
                StackPanel.prototype._appendItems = function (newItems) {
                    if(this._isDestroyCalled) {
                        return;
                    }
                    var self = this;
                    newItems.forEach(function (item) {
                        if(!!self._itemMap[item._key]) {
                            //row for item already exists
                            return;
                        }
                        self._appendItem(item);
                    });
                };
                StackPanel.prototype._appendItem = function (item) {
                    if(!item._key) {
                        return;
                    }
                    var self = this, $div = self._createElement('div'), div = $div.get(0), template = self._createTemplate(item);
                    $div.addClass(stackpanel.css.item);
                    $div.append(template.el);
                    if(this._orientation == 'horizontal') {
                        $div.css('display', 'inline-block');
                    }
                    self._$el.append($div);
                    $div.attr(consts.DATA_ATTR.DATA_ITEM_KEY, item._key);
                    $div.click(function (e) {
                        var key = this.getAttribute(consts.DATA_ATTR.DATA_ITEM_KEY);
                        var obj = self._itemMap[key];
                        if(!!obj) {
                            self._onItemClicked(obj.div, obj.item);
                        }
                    });
                    self._itemMap[item._key] = {
                        div: div,
                        template: template,
                        item: item
                    };
                };
                StackPanel.prototype._bindDS = function () {
                    var self = this, ds = this._dataSource;
                    if(!ds) {
                        return;
                    }
                    ds.addOnCollChanged(function (sender, args) {
                        if(ds !== sender) {
                            return;
                        }
                        self._onDSCollectionChanged(args);
                    }, self._objId);
                    ds.addOnFill(function (sender, args) {
                        if(ds !== sender) {
                            return;
                        }
                        self._onDSFill(args);
                    }, self._objId);
                    ds.addOnPropertyChange('currentItem', function (sender, args) {
                        if(ds !== sender) {
                            return;
                        }
                        self._onDSCurrentChanged(args);
                    }, self._objId);
                    ds.addOnStatusChanged(function (sender, args) {
                        if(ds !== sender) {
                            return;
                        }
                        self._onItemStatusChanged(args.item, args.oldChangeType);
                    }, self._objId);
                    this._refresh();
                };
                StackPanel.prototype._unbindDS = function () {
                    var self = this, ds = this._dataSource;
                    if(!ds) {
                        return;
                    }
                    ds.removeNSHandlers(self._objId);
                };
                StackPanel.prototype._createElement = function (tag) {
                    return RIAPP.global.$(RIAPP.global.document.createElement(tag));
                };
                StackPanel.prototype._onItemClicked = function (div, item) {
                    this._updateCurrent(item, false);
                    this._dataSource.currentItem = item;
                    this.raiseEvent('item_clicked', {
                        item: item
                    });
                };
                StackPanel.prototype.destroy = function () {
                    if(this._isDestroyed) {
                        return;
                    }
                    this._isDestroyCalled = true;
                    RIAPP.global._untrackSelectable(this);
                    this._unbindDS();
                    this._clearContent();
                    this._$el.removeClass(stackpanel.css.stackpanel);
                    this._el = null;
                    this._$el = null;
                    this._currentItem = null;
                    this._itemMap = {
                    };
                    this._app = null;
                    _super.prototype.destroy.call(this);
                };
                StackPanel.prototype._clearContent = function () {
                    var self = this;
                    self._$el.empty();
                    utils.forEachProp(self._itemMap, function (key) {
                        self._removeItemByKey(key);
                    });
                };
                StackPanel.prototype._removeItemByKey = function (key) {
                    var self = this, obj = self._itemMap[key];
                    if(!obj) {
                        return;
                    }
                    delete self._itemMap[key];
                    obj.template.destroy();
                };
                StackPanel.prototype._removeItem = function (item) {
                    var self = this, key = item._key, obj = self._itemMap[key];
                    if(!obj) {
                        return;
                    }
                    delete self._itemMap[key];
                    obj.template.destroy();
                    RIAPP.global.$(obj.div).remove();
                };
                StackPanel.prototype._refresh = function () {
                    var ds = this._dataSource, self = this;
                    this._clearContent();
                    if(!ds) {
                        return;
                    }
                    ds.forEach(function (item) {
                        self._appendItem(item);
                    });
                };
                StackPanel.prototype.scrollIntoView = function (item) {
                    if(!item) {
                        return;
                    }
                    var obj = this._itemMap[item._key];
                    if(!!obj) {
                        obj.div.scrollIntoView(false);
                    }
                };
                StackPanel.prototype.getDivElementByItem = function (item) {
                    var obj = this._itemMap[item._key];
                    if(!obj) {
                        return null;
                    }
                    return obj.div;
                };
                StackPanel.prototype.toString = function () {
                    return 'StackPanel';
                };
                Object.defineProperty(StackPanel.prototype, "app", {
                    get: function () {
                        return this._app;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(StackPanel.prototype, "el", {
                    get: function () {
                        return this._el;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(StackPanel.prototype, "containerEl", {
                    get: function () {
                        return this._el;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(StackPanel.prototype, "uniqueID", {
                    get: function () {
                        return this._objId;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(StackPanel.prototype, "dataSource", {
                    get: function () {
                        return this._dataSource;
                    },
                    set: function (v) {
                        if(v === this._dataSource) {
                            return;
                        }
                        if(this._dataSource !== null) {
                            this._unbindDS();
                        }
                        this._dataSource = v;
                        if(this._dataSource !== null) {
                            this._bindDS();
                        }
                        this.raisePropertyChanged('dataSource');
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(StackPanel.prototype, "currentItem", {
                    get: function () {
                        return this._currentItem;
                    },
                    enumerable: true,
                    configurable: true
                });
                return StackPanel;
            })(RIAPP.BaseObject);
            stackpanel.StackPanel = StackPanel;            
            var StackPanelElView = (function (_super) {
                __extends(StackPanelElView, _super);
                function StackPanelElView(app, el, options) {
                    this._dataSource = null;
                    this._panel = null;
                    this._options = options;
                                _super.call(this, app, el, options);
                }
                StackPanelElView.prototype.destroy = function () {
                    if(this._isDestroyed) {
                        return;
                    }
                    this._isDestroyCalled = true;
                    if(!!this._panel && !this._panel._isDestroyCalled) {
                        this._panel.destroy();
                    }
                    this._panel = null;
                    this._dataSource = null;
                    _super.prototype.destroy.call(this);
                };
                StackPanelElView.prototype.toString = function () {
                    return 'StackPanelElView';
                };
                Object.defineProperty(StackPanelElView.prototype, "dataSource", {
                    get: function () {
                        return this._dataSource;
                    },
                    set: function (v) {
                        var self = this;
                        if(this._dataSource !== v) {
                            this._dataSource = v;
                            if(!!this._panel) {
                                this._panel.destroy();
                            }
                            this._panel = null;
                            if(!!this._dataSource) {
                                this._panel = new StackPanel(this.app, this._el, this._dataSource, this._options);
                                this._panel.addOnDestroyed(function () {
                                    self._panel = null;
                                });
                            }
                            self.invokePropChanged('panel');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(StackPanelElView.prototype, "panel", {
                    get: function () {
                        return this._panel;
                    },
                    enumerable: true,
                    configurable: true
                });
                return StackPanelElView;
            })(MOD.baseElView.BaseElView);
            stackpanel.StackPanelElView = StackPanelElView;            
            RIAPP.global.registerElView('stackpanel', StackPanelElView);
            RIAPP.global.onModuleLoaded('stackpanel', stackpanel);
        })(MOD.stackpanel || (MOD.stackpanel = {}));
        var stackpanel = MOD.stackpanel;
    })(RIAPP.MOD || (RIAPP.MOD = {}));
    var MOD = RIAPP.MOD;
})(RIAPP || (RIAPP = {}));
//@ sourceMappingURL=stackpanel.js.map

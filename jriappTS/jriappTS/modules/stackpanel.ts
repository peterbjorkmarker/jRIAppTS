module RIAPP {
    export module MOD {
        export module stackpanel {
            export var css = {
                stackpanel: 'ria-stackpanel',
                item: 'stackpanel-item',
                currentItem: 'current-item'
            };

            export interface IStackPanelOptions {
                orientation?: string;
                templateID: string;
            }

            export class StackPanel extends RIAPP.BaseObject implements RIAPP.ISelectable {
                private _el: HTMLElement;
                private _$el: JQuery;
                private _objId: string;
                private _dataSource: collection.BaseCollection<collection.CollectionItem>;
                private _isDSFilling: boolean;
                private _orientation: string;
                private _templateID: string;
                private _currentItem: collection.CollectionItem;
                private _itemMap: { [key: string]: { div: HTMLElement; template: template.Template; item: collection.CollectionItem; }; };
                private _app: Application;

                constructor(app:Application, el:HTMLElement, dataSource:collection.BaseCollection<collection.CollectionItem>, options: IStackPanelOptions) {
                    super();
                    this._app = app;
                    this._el = el;
                    this._$el = global.$(this._el);
                    this._objId = 'pnl' + global.utils.getNewID();
                    if (!!dataSource && !(dataSource instanceof collection.BaseCollection))
                        throw new Error(RIAPP.ERRS.ERR_STACKPNL_DATASRC_INVALID);
                    this._dataSource = dataSource;
                    this._isDSFilling = false;
                    this._orientation = options.orientation || 'horizontal';
                    this._templateID = options.templateID;
                    this._currentItem = null;
                    this._$el.addClass(css.stackpanel);
                    this._itemMap = {};
                    if (!this._templateID)
                        throw new Error(RIAPP.ERRS.ERR_STACKPNL_TEMPLATE_INVALID);
                    if (!!this._dataSource) {
                        this._bindDS();
                    }
                    global._trackSelectable(this);
                }
                _getEventNames() {
                    var base_events = super._getEventNames();
                    return ['item_clicked'].concat(base_events);
                }
                addOnItemClicked(fn: (sender: StackPanel, args: { item: collection.CollectionItem; }) => void , namespace?: string) {
                    this.addHandler('item_clicked', fn, namespace);
                }
                removeOnItemClicked(namespace?: string) {
                    this.removeHandler('item_clicked', namespace);
                }
                _onKeyDown(key:number, event: Event) {
                    var ds = this._dataSource, Keys = consts.KEYS, self = this;
                    if (!ds)
                        return;
                    if (this._orientation == 'horizontal') {
                        switch (key) {
                            case Keys.left:
                                event.preventDefault();
                                if (ds.movePrev(true)) {
                                    self.scrollIntoView(ds.currentItem);
                                }
                                break;
                            case Keys.right:
                                event.preventDefault();
                                if (ds.moveNext(true)) {
                                    self.scrollIntoView(ds.currentItem);
                                }
                                break;
                        }
                    }
                    else {
                        switch (key) {
                            case Keys.up:
                                event.preventDefault();
                                if (ds.movePrev(true)) {
                                    self.scrollIntoView(ds.currentItem);
                                }
                                break;
                            case Keys.down:
                                event.preventDefault();
                                if (ds.moveNext(true)) {
                                    self.scrollIntoView(ds.currentItem);
                                }
                                break;
                        }
                    }
                }
                _onKeyUp(key:number, event: Event) {
                }
                _updateCurrent(item: collection.CollectionItem, withScroll:boolean) {
                    var self = this, old = self._currentItem, obj: { div: HTMLElement; template: template.Template; item: collection.CollectionItem; };
                    if (old !== item) {
                        this._currentItem = item;
                        if (!!old) {
                            obj = self._itemMap[old._key];
                            if (!!obj) {
                                global.$(obj.div).removeClass(css.currentItem);
                            }
                        }
                        if (!!item) {
                            obj = self._itemMap[item._key];
                            if (!!obj) {
                                global.$(obj.div).addClass(css.currentItem);
                                if (withScroll)
                                    obj.div.scrollIntoView(false);
                            }
                        }
                        this.raisePropertyChanged('currentItem');
                    }
                }
                _onDSCurrentChanged(args) {
                    var ds = this._dataSource, cur = ds.currentItem;
                    if (!cur)
                        this._updateCurrent(null, false);
                    else {
                        this._updateCurrent(cur, true);
                    }
                }
                _onDSCollectionChanged(args) {
                    var self = this, items = args.items;
                    switch (args.change_type) {
                        case collection.COLL_CHANGE_TYPE.RESET:
                            if (!this._isDSFilling)
                                this._refresh();
                            break;
                        case collection.COLL_CHANGE_TYPE.ADDED:
                            if (!this._isDSFilling) //if items are filling then it will be appended when fill ends
                                self._appendItems(items);
                            break;
                        case collection.COLL_CHANGE_TYPE.REMOVE:
                            items.forEach(function (item) {
                                self._removeItem(item);
                            });
                            break;
                        case collection.COLL_CHANGE_TYPE.REMAP_KEY:
                            {
                                var obj = self._itemMap[args.old_key];
                                if (!!obj) {
                                    delete self._itemMap[args.old_key];
                                    self._itemMap[args.new_key] = obj;
                                    obj.div.setAttribute(consts.DATA_ATTR.DATA_ITEM_KEY, args.new_key);
                                }
                            }
                            break;
                        default:
                            throw new Error(global.utils.format(RIAPP.ERRS.ERR_COLLECTION_CHANGETYPE_INVALID, args.change_type));
                    }
                }
                _onDSFill(args) {
                    var isEnd = !args.isBegin;
                    if (isEnd) {
                        this._isDSFilling = false;
                        if (args.resetUI)
                            this._refresh();
                        else
                            this._appendItems(args.newItems);
                    }
                    else {
                        this._isDSFilling = true;
                    }
                }
                _onItemStatusChanged(item:collection.CollectionItem, oldChangeType:number) {
                    var newChangeType =item._changeType;
                    var obj = this._itemMap[item._key];
                    if (!obj)
                        return;
                    if (newChangeType === collection.STATUS.DELETED) {
                        global.$(obj.div).hide();
                    }
                    else if (oldChangeType === collection.STATUS.DELETED && newChangeType !== collection.STATUS.DELETED) {
                        global.$(obj.div).show();
                    }
                }
                _createTemplate(dcxt) {
                    var t = new template.Template(this.app, this._templateID);
                    t.dataContext = dcxt;
                    return t;
                }
                _appendItems(newItems: collection.CollectionItem[]) {
                    if (this._isDestroyCalled)
                        return;
                    var self = this;
                    newItems.forEach(function (item) {
                        if (!!self._itemMap[item._key])  //row for item already exists
                            return;
                        self._appendItem(item);
                    });
                }
                _appendItem(item: collection.CollectionItem) {
                    if (!item._key)
                        return;
                    var self = this, $div = self._createElement('div'), div = $div.get(0), template = self._createTemplate(item);
                    $div.addClass(css.item);
                    $div.append(template.el);
                    if (this._orientation == 'horizontal') {
                        $div.css('display', 'inline-block');
                    }
                    self._$el.append($div);
                    $div.attr(consts.DATA_ATTR.DATA_ITEM_KEY, item._key);
                    $div.click(function (e) {
                        var key = this.getAttribute(consts.DATA_ATTR.DATA_ITEM_KEY);
                        var obj = self._itemMap[key];
                        if (!!obj)
                            self._onItemClicked(obj.div, obj.item);
                    });
                    self._itemMap[item._key] = { div: div, template: template, item: item };
                }
                _bindDS() {
                    var self = this, ds = this._dataSource;
                    if (!ds) return;
                    ds.addOnCollChanged(function (sender, args) {
                        if (ds !== sender) return;
                        self._onDSCollectionChanged(args);
                    }, self._objId);
                    ds.addOnFill(function (sender, args) {
                        if (ds !== sender) return;
                        self._onDSFill(args);
                    }, self._objId);
                    ds.addOnPropertyChange('currentItem', function (sender, args) {
                        if (ds !== sender) return;
                        self._onDSCurrentChanged(args);
                    }, self._objId);
                    ds.addOnStatusChanged(function (sender, args) {
                        if (ds !== sender) return;
                        self._onItemStatusChanged(args.item, args.oldChangeType);
                    }, self._objId);

                    this._refresh();
                }
                _unbindDS() {
                    var self = this, ds = this._dataSource;
                    if (!ds) return;
                    ds.removeNSHandlers(self._objId);
                }
                _createElement(tag:string) {
                    return global.$(global.document.createElement(tag));
                }
                _onItemClicked(div:HTMLElement, item:collection.CollectionItem) {
                    this._updateCurrent(item, false);
                    this._dataSource.currentItem = item;
                    this.raiseEvent('item_clicked', { item: item });
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    global._untrackSelectable(this);
                    this._unbindDS();
                    this._clearContent();
                    this._$el.removeClass(css.stackpanel);
                    this._el = null;
                    this._$el = null;
                    this._currentItem = null;
                    this._itemMap = {};
                    this._app = null;
                    super.destroy();
                }
                _clearContent() {
                    var self = this;
                    self._$el.empty();
                    global.utils.forEachProp(self._itemMap, function (key) {
                        self._removeItemByKey(key);
                    });
                }
                _removeItemByKey(key:string) {
                    var self = this, obj = self._itemMap[key];
                    if (!obj)
                        return;
                    delete self._itemMap[key];
                    obj.template.destroy();
                }
                _removeItem(item:collection.CollectionItem) {
                    var self = this, key = item._key, obj = self._itemMap[key];
                    if (!obj)
                        return;
                    delete self._itemMap[key];
                    obj.template.destroy();
                    global.$(obj.div).remove();
                }
                _refresh() {
                    var ds = this._dataSource, self = this;
                    this._clearContent();
                    if (!ds)
                        return;
                    ds.forEach(function (item) {
                        self._appendItem(item);
                    });
                }
                scrollIntoView(item: collection.CollectionItem) {
                    if (!item)
                        return;
                    var obj = this._itemMap[item._key];
                    if (!!obj) {
                        obj.div.scrollIntoView(false);
                    }
                }
                getDivElementByItem(item: collection.CollectionItem) {
                    var obj = this._itemMap[item._key];
                    if (!obj)
                        return null;
                    return obj.div;
                }
                toString() {
                    return 'StackPanel';
                }
                get app() { return this._app; }
                get el() { return this._el; }
                get containerEl() { return this._el; }
                get uniqueID() { return this._objId; }
                get dataSource() { return this._dataSource; }
                set dataSource(v: collection.BaseCollection<collection.CollectionItem>) {
                    if (v === this._dataSource)
                        return;
                    if (this._dataSource !== null) {
                        this._unbindDS();
                    }
                    this._dataSource = v;
                    if (this._dataSource !== null)
                        this._bindDS();
                    this.raisePropertyChanged('dataSource');
                }
                get currentItem() { return this._currentItem; }
            }

            export interface IStackPanelViewOptions extends IStackPanelOptions, baseElView.IViewOptions {
            }

            export class StackPanelElView extends baseElView.BaseElView {
                private _panel: StackPanel;
                private _options: IStackPanelOptions;
                constructor(app: Application, el: HTMLSelectElement, options: IStackPanelViewOptions) {
                    var self = this;
                    this._panel = null;
                    this._options = options;
                    this._panel = new StackPanel(app, el, null, this._options);
                    this._panel.addOnDestroyed(function () {
                        self._panel = null;
                        self.invokePropChanged('panel');
                        self.raisePropertyChanged('panel');
                    });
                    super(app, el, options);
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._panel && !this._panel._isDestroyCalled) {
                        this._panel.destroy();
                    }
                    this._panel = null;
                    super.destroy();
                }
                toString() {
                    return 'StackPanelElView';
                }
                get dataSource() {
                    if (this._isDestroyCalled)
                        return undefined;
                    return this._panel.dataSource;
                }
                set dataSource(v) {
                    if (this._isDestroyCalled)
                        return;
                    if (this.dataSource !== v) {
                        this._panel.dataSource = v;
                        this.raisePropertyChanged('dataSource');
                    }
                }
                get panel() { return this._panel; }
            }
     
            global.registerElView('stackpanel', StackPanelElView);
            global.onModuleLoaded('stackpanel', stackpanel);
        }
    }
}

module RIAPP {
    export module MOD {
        export module stackpanel {
            import constsMOD = RIAPP.MOD.consts;
            import utilsMOD = RIAPP.MOD.utils;
            import templMOD = RIAPP.MOD.template;
            import collMOD = RIAPP.MOD.collection;

            var utils: utilsMOD.Utils, global = RIAPP.global;
            global.addOnInitialize((s, args) => {
                utils = s.utils;
            });
            export var css = {
                stackpanel: 'ria-stackpanel',
                item: 'stackpanel-item',
                currentItem: 'current-item'
            };

            export interface IStackPanelOptions {
                orientation?: string;
                templateID: string;
            }

            interface IMappedItem { div: HTMLDivElement; template: templMOD.Template; item: collMOD.CollectionItem }

            export interface IStackPanelConstructorOptions extends IStackPanelOptions {
                el: HTMLTableElement;
                dataSource: collMOD.BaseCollection<collMOD.CollectionItem>;
            }
            export class StackPanel extends RIAPP.BaseObject implements RIAPP.ISelectable, templMOD.ITemplateEvents {
                private _el: HTMLElement;
                private _$el: JQuery;
                private _objId: string;
                private _dataSource: collMOD.BaseCollection<collMOD.CollectionItem>;
                private _isDSFilling: boolean;
                private _orientation: string;
                private _templateID: string;
                private _currentItem: collMOD.CollectionItem;
                private _itemMap: { [key: string]: IMappedItem; };
                private _app: Application;

                constructor(app: Application, options: IStackPanelConstructorOptions) {
                    super();
                    var self = this;
                    options = utils.extend(false,
                        {
                            el: null,
                            dataSource: null,
                            orientation: null,
                            templateID: null
                        }, options);
                    this._app = app;
                    this._el = options.el;
                    this._$el = global.$(this._el);
                    this._objId = 'pnl' + global.utils.getNewID();
                    if (!!options.dataSource && !(options.dataSource instanceof collMOD.BaseCollection))
                        throw new Error(RIAPP.ERRS.ERR_STACKPNL_DATASRC_INVALID);
                    this._dataSource = options.dataSource;
                    this._isDSFilling = false;
                    this._orientation = options.orientation || 'horizontal';
                    this._templateID = options.templateID;
                    this._currentItem = null;
                    this._$el.addClass(css.stackpanel);
                    this._itemMap = {};
                    if (!this._templateID)
                        throw new Error(RIAPP.ERRS.ERR_STACKPNL_TEMPLATE_INVALID);
                    this._$el.on('click', ['div[', constsMOD.DATA_ATTR.DATA_EVENT_SCOPE, '="', this.uniqueID, '"]'].join(''),
                        function (e) {
                            e.stopPropagation();
                            var $div = global.$(this), mappedItem: IMappedItem = $div.data('data');
                            self._onItemClicked(mappedItem.div, mappedItem.item);  
                      });
                    if (!!this._dataSource) {
                        this._bindDS();
                    }
                    global._trackSelectable(this);
                }
                _getEventNames() {
                    var base_events = super._getEventNames();
                    return ['item_clicked'].concat(base_events);
                }
                templateLoading(template: templMOD.Template): void {
                    //noop
                }
                templateLoaded(template: templMOD.Template): void {
                    //noop
                }
                templateUnLoading(template: templMOD.Template): void {
                    //noop
                }
                addOnItemClicked(fn: (sender: StackPanel, args: { item: collMOD.CollectionItem; }) => void , namespace?: string) {
                    this.addHandler('item_clicked', fn, namespace);
                }
                removeOnItemClicked(namespace?: string) {
                    this.removeHandler('item_clicked', namespace);
                }
                _onKeyDown(key:number, event: Event) {
                    var ds = this._dataSource, self = this;
                    if (!ds)
                        return;
                    if (this._orientation == 'horizontal') {
                        switch (key) {
                            case constsMOD.KEYS.left:
                                event.preventDefault();
                                if (ds.movePrev(true)) {
                                    self.scrollIntoView(ds.currentItem);
                                }
                                break;
                            case constsMOD.KEYS.right:
                                event.preventDefault();
                                if (ds.moveNext(true)) {
                                    self.scrollIntoView(ds.currentItem);
                                }
                                break;
                        }
                    }
                    else {
                        switch (key) {
                            case constsMOD.KEYS.up:
                                event.preventDefault();
                                if (ds.movePrev(true)) {
                                    self.scrollIntoView(ds.currentItem);
                                }
                                break;
                            case constsMOD.KEYS.down:
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
                _updateCurrent(item: collMOD.CollectionItem, withScroll:boolean) {
                    var self = this, old = self._currentItem, mappedItem: IMappedItem;
                    if (old !== item) {
                        this._currentItem = item;
                        if (!!old) {
                            mappedItem = self._itemMap[old._key];
                            if (!!mappedItem) {
                                global.$(mappedItem.div).removeClass(css.currentItem);
                            }
                        }
                        if (!!item) {
                            mappedItem = self._itemMap[item._key];
                            if (!!mappedItem) {
                                global.$(mappedItem.div).addClass(css.currentItem);
                                if (withScroll)
                                    mappedItem.div.scrollIntoView(false);
                            }
                        }
                        this.raisePropertyChanged('currentItem');
                    }
                }
                _onDSCurrentChanged() {
                    var ds = this._dataSource, cur = ds.currentItem;
                    if (!cur)
                        this._updateCurrent(null, false);
                    else {
                        this._updateCurrent(cur, true);
                    }
                }
                _onDSCollectionChanged(args: collMOD.ICollChangedArgs<collMOD.CollectionItem>) {
                    var self = this, items = args.items;
                    switch (args.change_type) {
                        case collMOD.COLL_CHANGE_TYPE.RESET:
                            if (!this._isDSFilling)
                                this._refresh();
                            break;
                        case collMOD.COLL_CHANGE_TYPE.ADDED:
                             //if items are filling then it will be appended when the filling is ended
                            if (!this._isDSFilling)
                                self._appendItems(items);
                            break;
                        case collMOD.COLL_CHANGE_TYPE.REMOVE:
                            items.forEach(function (item) {
                                self._removeItem(item);
                            });
                            break;
                        case collMOD.COLL_CHANGE_TYPE.REMAP_KEY:
                            {
                                var mappedItem = self._itemMap[args.old_key];
                                if (!!mappedItem) {
                                    delete self._itemMap[args.old_key];
                                    self._itemMap[args.new_key] = mappedItem;
                                }
                            }
                            break;
                        default:
                            throw new Error(global.utils.format(RIAPP.ERRS.ERR_COLLECTION_CHANGETYPE_INVALID, args.change_type));
                    }
                }
                _onDSFill(args: collMOD.ICollFillArgs<collMOD.CollectionItem>) {
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
                _onItemStatusChanged(item: collMOD.CollectionItem, oldChangeType:number) {
                    var newChangeType =item._changeType;
                    var obj = this._itemMap[item._key];
                    if (!obj)
                        return;
                    if (newChangeType === collMOD.STATUS.DELETED) {
                        global.$(obj.div).hide();
                    }
                    else if (oldChangeType === collMOD.STATUS.DELETED && newChangeType !== collMOD.STATUS.DELETED) {
                        global.$(obj.div).show();
                    }
                }
                _createTemplate(item: collMOD.CollectionItem) {
                    var t = new template.Template(this.app, {
                        templateID: this._templateID,
                        dataContext: item,
                        templEvents: this
                    });
                    return t;
                }
                _appendItems(newItems: collMOD.CollectionItem[]) {
                    if (this._isDestroyCalled)
                        return;
                    var self = this;
                    newItems.forEach(function (item) {
                        //a row for item already exists
                        if (!!self._itemMap[item._key])  
                            return;
                        self._appendItem(item);
                    });
                }
                _appendItem(item: collMOD.CollectionItem) {
                    if (!item._key)
                        return;
                    var self = this,
                        $div = self._createElement('div'),
                        div = $div.get(0);

                    $div.addClass(css.item);
                    if (this._orientation == 'horizontal') {
                        $div.css('display', 'inline-block');
                    }
                    $div.attr(constsMOD.DATA_ATTR.DATA_EVENT_SCOPE, this.uniqueID);
                    self._$el.append($div);
                    var mappedItem: IMappedItem = { div: div, template: null, item: item };
                    $div.data('data', mappedItem);
                    self._itemMap[item._key] = mappedItem;
                    mappedItem.template = self._createTemplate(item);
                    mappedItem.div.appendChild(mappedItem.template.el);
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
                        self._onDSCurrentChanged();
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
                _onItemClicked(div: HTMLElement, item: collMOD.CollectionItem) {
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
                    var self = this, mappedItem = self._itemMap[key];
                    if (!mappedItem)
                        return;
                    delete self._itemMap[key];
                    mappedItem.template.destroy();
                }
                _removeItem(item: collMOD.CollectionItem) {
                    var self = this, key = item._key, mappedItem = self._itemMap[key];
                    delete self._itemMap[key];
                    mappedItem.template.destroy();
                    mappedItem.template = null;
                    global.$(mappedItem.div).remove();
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
                scrollIntoView(item: collMOD.CollectionItem) {
                    if (!item)
                        return;
                    var mappedItem = this._itemMap[item._key];
                    if (!!mappedItem) {
                        mappedItem.div.scrollIntoView(false);
                    }
                }
                getDivElementByItem(item: collMOD.CollectionItem) {
                    var mappedItem = this._itemMap[item._key];
                    if (!mappedItem)
                        return null;
                    return mappedItem.div;
                }
                toString() {
                    return 'StackPanel';
                }
                get app() { return this._app; }
                get el() { return this._el; }
                get containerEl() { return this._el; }
                get uniqueID() { return this._objId; }
                get dataSource() { return this._dataSource; }
                set dataSource(v: collMOD.BaseCollection<collMOD.CollectionItem>) {
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
                    var opts: IStackPanelConstructorOptions = utils.extend(false,
                        {
                            el: el,
                            dataSource: null
                        }, this._options);
                    this._panel = new StackPanel(app, opts);
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

﻿module RIAPP {
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

            var PROP_NAME = {
                dataSource: 'dataSource',
                currentItem: 'currentItem',
                panel: 'panel'
            };

            export interface IStackPanelOptions {
                orientation?: string;
                templateID: string;
            }

            interface IMappedItem { div: HTMLDivElement; template: templMOD.Template; item: collMOD.ICollectionItem }

            export interface IStackPanelConstructorOptions extends IStackPanelOptions {
                app: Application;
                el: HTMLElement;
                dataSource: collMOD.BaseCollection<collMOD.ICollectionItem>;
            }


            var PNL_EVENTS = {
                item_clicked: 'item_clicked'
            };

            export class StackPanel extends RIAPP.BaseObject implements RIAPP.ISelectable, templMOD.ITemplateEvents {
                private _$el: JQuery;
                private _objId: string;
                private _isDSFilling: boolean;
                private _currentItem: collMOD.ICollectionItem;
                private _itemMap: { [key: string]: IMappedItem; };
                private _options: IStackPanelConstructorOptions;

                constructor(options: IStackPanelConstructorOptions) {
                    super();
                    var self = this;
                    options = utils.extend(false,
                        {
                            app: null,
                            el: null,
                            dataSource: null,
                            orientation: 'horizontal',
                            templateID: null
                        }, options);
                    if (!!options.dataSource && !(options.dataSource instanceof collMOD.BaseCollection))
                        throw new Error(RIAPP.ERRS.ERR_STACKPNL_DATASRC_INVALID);
                    if (!options.templateID)
                        throw new Error(RIAPP.ERRS.ERR_STACKPNL_TEMPLATE_INVALID);
                    this._options = options;
                    this._$el = global.$(options.el);
                    this._objId = 'pnl' + global.utils.getNewID();
                    this._isDSFilling = false;
                    this._currentItem = null;
                    this._$el.addClass(css.stackpanel);
                    this._itemMap = {};
                 
                    this._$el.on('click', ['div[', constsMOD.DATA_ATTR.DATA_EVENT_SCOPE, '="', this.uniqueID, '"]'].join(''),
                        function (e) {
                            e.stopPropagation();
                            var $div = global.$(this), mappedItem: IMappedItem = $div.data('data');
                            self._onItemClicked(mappedItem.div, mappedItem.item);  
                      });
                    if (!!options.dataSource) {
                        this._bindDS();
                    }
                    global._trackSelectable(this);
                }
                protected _getEventNames() {
                    var base_events = super._getEventNames();
                    return [PNL_EVENTS.item_clicked].concat(base_events);
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
                addOnItemClicked(fn: (sender: StackPanel, args: { item: collMOD.ICollectionItem; }) => void, namespace?: string, context?: BaseObject) {
                    this._addHandler(PNL_EVENTS.item_clicked, fn, namespace, context);
                }
                removeOnItemClicked(namespace?: string) {
                    this._removeHandler(PNL_EVENTS.item_clicked, namespace);
                }
                _onKeyDown(key:number, event: Event) {
                    var ds = this.dataSource, self = this;
                    if (!ds)
                        return;
                    if (this.orientation == 'horizontal') {
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
                protected _updateCurrent(item: collMOD.ICollectionItem, withScroll:boolean) {
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
                        this.raisePropertyChanged(PROP_NAME.currentItem);
                    }
                }
                protected _onDSCurrentChanged(sender, args) {
                    var ds = this.dataSource, cur = ds.currentItem;
                    if (!cur)
                        this._updateCurrent(null, false);
                    else {
                        this._updateCurrent(cur, true);
                    }
                }
                protected _onDSCollectionChanged(sender, args: collMOD.ICollChangedArgs<collMOD.ICollectionItem>) {
                    var self = this, items = args.items;
                    switch (args.changeType) {
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
                            throw new Error(global.utils.format(RIAPP.ERRS.ERR_COLLECTION_CHANGETYPE_INVALID, args.changeType));
                    }
                }
                protected _onDSFill(sender, args: collMOD.ICollFillArgs<collMOD.ICollectionItem>) {
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
                protected _onItemStatusChanged(item: collMOD.ICollectionItem, oldStatus: collMOD.STATUS) {
                    var newStatus =item._aspect.status;
                    var obj = this._itemMap[item._key];
                    if (!obj)
                        return;
                    if (newStatus === collMOD.STATUS.DELETED) {
                        global.$(obj.div).hide();
                    }
                    else if (oldStatus === collMOD.STATUS.DELETED && newStatus !== collMOD.STATUS.DELETED) {
                        global.$(obj.div).show();
                    }
                }
                protected _createTemplate(item: collMOD.ICollectionItem) {
                    var t = new template.Template({
                        app: this.app,
                        templateID: this.templateID,
                        dataContext: item,
                        templEvents: this
                    });
                    return t;
                }
                protected _appendItems(newItems: collMOD.ICollectionItem[]) {
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
                protected _appendItem(item: collMOD.ICollectionItem) {
                    if (!item._key)
                        return;
                    var self = this,
                        $div = self._createElement('div'),
                        div = $div.get(0);

                    $div.addClass(css.item);
                    if (this.orientation == 'horizontal') {
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
                protected _bindDS() {
                    var self = this, ds = this.dataSource;
                    if (!ds) return;
                    ds.addOnCollChanged(self._onDSCollectionChanged, self._objId, self);
                    ds.addOnFill(self._onDSFill, self._objId, self);
                    ds.addOnCurrentChanged(self._onDSCurrentChanged, self._objId, self);
                    ds.addOnStatusChanged(function (sender, args) {
                        self._onItemStatusChanged(args.item, args.oldStatus);
                    }, self._objId);
                    this._refresh();
                }
                protected _unbindDS() {
                    var self = this, ds = this.dataSource;
                    if (!ds) return;
                    ds.removeNSHandlers(self._objId);
                }
                protected _createElement(tag:string) {
                    return global.$(global.document.createElement(tag));
                }
                protected _onItemClicked(div: HTMLElement, item: collMOD.ICollectionItem) {
                    this._updateCurrent(item, false);
                    this.dataSource.currentItem = item;
                    this.raiseEvent(PNL_EVENTS.item_clicked, { item: item });
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    global._untrackSelectable(this);
                    this._unbindDS();
                    this._clearContent();
                    this._$el.removeClass(css.stackpanel);
                    this._$el = null;
                    this._currentItem = null;
                    this._itemMap = {};
                    this._options = <any>{};
                    super.destroy();
                }
                protected _clearContent() {
                    var self = this;
                    self._$el.empty();
                    global.utils.forEachProp(self._itemMap, function (key) {
                        self._removeItemByKey(key);
                    });
                }
                protected _removeItemByKey(key:string) {
                    var self = this, mappedItem = self._itemMap[key];
                    if (!mappedItem)
                        return;
                    delete self._itemMap[key];
                    mappedItem.template.destroy();
                    mappedItem.template = null;
                    global.$(mappedItem.div).removeData('data');
                    global.$(mappedItem.div).remove();
                }
                protected _removeItem(item: collMOD.ICollectionItem) {
                    this._removeItemByKey(item._key);
                }
                protected _refresh() {
                    var ds = this.dataSource, self = this;
                    this._clearContent();
                    if (!ds)
                        return;
                    ds.forEach(function (item) {
                        self._appendItem(item);
                    });
                }
                scrollIntoView(item: collMOD.ICollectionItem) {
                    if (!item)
                        return;
                    var mappedItem = this._itemMap[item._key];
                    if (!!mappedItem) {
                        mappedItem.div.scrollIntoView(false);
                    }
                }
                getDivElementByItem(item: collMOD.ICollectionItem) {
                    var mappedItem = this._itemMap[item._key];
                    if (!mappedItem)
                        return null;
                    return mappedItem.div;
                }
                toString() {
                    return 'StackPanel';
                }
                get app() { return this._options.app; }
                get el() { return this._options.el; }
                get containerEl() { return this._options.el; }
                get uniqueID() { return this._objId; }
                get orientation() { return this._options.orientation; }
                get templateID() { return this._options.templateID; }
                get dataSource() { return this._options.dataSource; }
                set dataSource(v) {
                    if (v === this.dataSource)
                        return;
                    if (!!this.dataSource) {
                        this._unbindDS();
                    }
                    this._options.dataSource = v;
                    if (!!this.dataSource)
                        this._bindDS();
                    this.raisePropertyChanged(PROP_NAME.dataSource);
                }
                get currentItem() { return this._currentItem; }
            }

            export interface IStackPanelViewOptions extends IStackPanelOptions, baseElView.IViewOptions {
            }

            export class StackPanelElView extends baseElView.BaseElView {
                private _panel: StackPanel;
                private _options: IStackPanelOptions;
                constructor(app: Application, el: HTMLElement, options: IStackPanelViewOptions) {
                    var self = this;
                    this._panel = null;
                    this._options = options;
                    var opts: IStackPanelConstructorOptions = utils.extend(false,
                        {
                            app: app,
                            el: el,
                            dataSource: null
                        }, this._options);
                    this._panel = new StackPanel(opts);
                    this._panel.addOnDestroyed(function () {
                        self._panel = null;
                        self.invokePropChanged(PROP_NAME.panel);
                        self.raisePropertyChanged(PROP_NAME.panel);
                    });
                    super(app, el, options);
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._panel && !this._panel.getIsDestroyCalled()) {
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
                        this.raisePropertyChanged(PROP_NAME.dataSource);
                    }
                }
                get panel() { return this._panel; }
            }
     
            global.registerElView('stackpanel', StackPanelElView);
            global.onModuleLoaded('stackpanel', stackpanel);
        }
    }
}

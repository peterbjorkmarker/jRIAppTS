module RIAPP {
    export module MOD {
        export module listbox{
            import bindMOD = RIAPP.MOD.binding;
            import collMOD = MOD.collection;
            import elviewMOD = MOD.baseElView;
            import contentMOD = RIAPP.MOD.baseContent;

            var utils: MOD.utils.Utils, parser: MOD.parser.Parser;
            RIAPP.global.addOnInitialize((s, args) => {
                utils = s.utils;
                parser = s.parser;
            });

            export interface IListBoxOptions{
                valuePath: string;
                textPath: string;
            }

            export interface IListBoxConstructorOptions extends IListBoxOptions {
                app: Application;
                el: HTMLSelectElement;
                dataSource: collMOD.BaseCollection<collMOD.CollectionItem>;
            }
            export interface IMappedItem {
                item: collMOD.CollectionItem;
                op: { text: string; value: any; index: number; }; 
            }

            export class ListBox extends RIAPP.BaseObject {
                private _$el: JQuery;
                private _objId: string;
                private _isRefreshing: boolean;
                private _isDSFilling: boolean;
                private _selectedItem: collMOD.CollectionItem;
                private _prevSelected: collMOD.CollectionItem;
                private _keyMap: { [key: string]: IMappedItem; };
                private _valMap: { [val: string]: IMappedItem; };
                private _savedValue: string;
                private _tempValue: any;
                private _options: IListBoxConstructorOptions;

                constructor(options: IListBoxConstructorOptions) {
                    super();
                    var self = this;
                    options = utils.extend(false,
                        {
                            app: null,
                            el: null,
                            dataSource: null,
                            valuePath: null,
                            textPath: null
                        }, options);
                    if (!!options.dataSource && !(options.dataSource instanceof collMOD.BaseCollection))
                        throw new Error(RIAPP.ERRS.ERR_LISTBOX_DATASRC_INVALID);
                    this._$el = global.$(options.el);
                    this._options = options;
                    this._objId = 'lst' + utils.getNewID();
                    this._$el.on('change.' + this._objId, function (e) {
                        e.stopPropagation();
                        if (self._isRefreshing)
                            return;
                        self._onChanged();
                    });
                    this._isDSFilling = false;
                    this._isRefreshing = false;
                    this._selectedItem = null;
                    this._prevSelected = null;
                    this._keyMap = {};
                    this._valMap = {};
                    this._savedValue = undefined;
                    this._tempValue = undefined;
                    var ds = this._options.dataSource;
                    this._options.dataSource = null;
                    this.dataSource = ds;
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._unbindDS();
                    this._$el.off('.' + this._objId);
                    this._clear(true);
                    this._$el = null;
                    this._tempValue = undefined;
                    this._selectedItem = null;
                    this._prevSelected = null;
                    this._savedValue = null;
                    this._options = <any>{};
                    super.destroy();
                }
                protected _onChanged() {
                    var op = null, key: string, data: IMappedItem;
                    if (this.el.selectedIndex >= 0) {
                        op = this.el.options[this.el.selectedIndex];
                        key = op.value;
                        data = this._keyMap[key];
                    }
                   
                    if (!data && !!this._selectedItem) {
                        this.selectedItem = null;
                    }
                    else if (data.item !== this._selectedItem) {
                        this.selectedItem = data.item;
                    }
                }
                protected _getStringValue(item: collMOD.CollectionItem):string {
                    var v = this._getValue(item);
                    if (utils.check.isNt(v))
                        return '';
                    return '' + v;
                }
                protected _getValue(item: collMOD.CollectionItem):any {
                    if (!item)
                        return null;
                    if (!!this._options.valuePath) {
                        return parser.resolvePath(item, this._options.valuePath);
                    }
                    else
                        return undefined;
                }
                protected _getText(item: collMOD.CollectionItem):string {
                    if (!item)
                        return '';
                    if (!!this._options.textPath) {
                        var t = global.parser.resolvePath(item, this._options.textPath);
                        if (utils.check.isNt(t))
                            return '';
                        return '' + t;
                    }
                    else
                        return this._getStringValue(item);
                }
                protected _onDSCollectionChanged(args: collMOD.ICollChangedArgs<collMOD.CollectionItem>) {
                    var self = this, data;
                    switch (args.change_type) {
                        case collMOD.COLL_CHANGE_TYPE.RESET:
                            if (!this._isDSFilling)
                                this._refresh();
                            break;
                        case collMOD.COLL_CHANGE_TYPE.ADDED:
                            if (!this._isDSFilling) //if items are filling then it will be appended when fill ends
                            {
                                args.items.forEach(function (item) {
                                    self._addOption(item, item._isNew);
                                });
                            }
                            break;
                        case collMOD.COLL_CHANGE_TYPE.REMOVE:
                            args.items.forEach(function (item) {
                                self._removeOption(item);
                            });
                            break;
                        case collMOD.COLL_CHANGE_TYPE.REMAP_KEY:
                            {
                                data = self._keyMap[args.old_key];
                                if (!!data) {
                                    delete self._keyMap[args.old_key];
                                    self._keyMap[args.new_key] = data;
                                    data.op.value = args.new_key;
                                }
                            }
                    }
                }
                protected _onDSFill(args: collMOD.ICollFillArgs<collMOD.CollectionItem>) {
                    var isEnd = !args.isBegin;
                    if (isEnd) {
                        this._isDSFilling = false;
                        this._refresh();
                    }
                    else {
                        this._isDSFilling = true;
                    }
                }
                protected _onEdit(item: collMOD.CollectionItem, isBegin:boolean, isCanceled:boolean) {
                    var self = this, key:string, data: IMappedItem, oldVal:string, val:string;
                    if (isBegin) {
                        this._savedValue = this._getStringValue(item);
                    }
                    else {
                        oldVal = this._savedValue;
                        this._savedValue = undefined;
                        if (!isCanceled) {
                            key = item._key;
                            data = self._keyMap[key];
                            if (!!data) {
                                data.op.text = self._getText(item);
                                val = this._getStringValue(item);
                                if (oldVal !== val) {
                                    if (!!oldVal) {
                                        delete self._valMap[oldVal];
                                    }
                                    if (!!val) {
                                        self._valMap[val] = data;
                                    }
                                }
                            }
                            else {
                                if (!!oldVal) {
                                    delete self._valMap[oldVal];
                                }
                            }
                        }
                    }
                }
                protected _onStatusChanged(item: collMOD.CollectionItem, oldChangeType:number) {
                    var newChangeType = item._changeType;
                    if (newChangeType === collMOD.STATUS.DELETED) {
                        this._removeOption(item);
                    }
                }
                protected _onCommitChanges(item: collMOD.CollectionItem, isBegin: boolean, isRejected: boolean, changeType: collMOD.STATUS) {
                    var self = this, oldVal, val, data;
                    if (isBegin) {
                        if (isRejected && changeType === collMOD.STATUS.ADDED) {
                            return;
                        }
                        else if (!isRejected && changeType === collMOD.STATUS.DELETED) {
                            return;
                        }

                        this._savedValue = this._getStringValue(item);
                    }
                    else {
                        oldVal = this._savedValue;
                        this._savedValue = undefined;

                        if (isRejected && changeType === collMOD.STATUS.DELETED) {
                            this._addOption(item, true);
                            return;
                        }
                        val = this._getStringValue(item);
                        data = self._keyMap[item._key];
                        if (oldVal !== val) {
                            if (oldVal !== '') {
                                delete self._valMap[oldVal];
                            }
                            if (!!data && val !== '') {
                                self._valMap[val] = data;
                            }
                        }
                        if (!!data) {
                            data.op.text = self._getText(item);
                        }
                    }
                }
                private _bindDS() {
                    var self = this, ds = this.dataSource;
                    if (!ds) return;
                    ds.addOnCollChanged(function (sender, args) {
                        if (ds !== sender) return;
                        self._onDSCollectionChanged(args);
                    }, self._objId);
                    ds.addOnFill(function (sender, args) {
                        if (ds !== sender) return;
                        self._onDSFill(args);
                    }, self._objId);
                    ds.addOnBeginEdit(function (sender, args) {
                        if (ds !== sender) return;
                        self._onEdit(args.item, true, undefined);
                    }, self._objId);
                    ds.addOnEndEdit(function (sender, args) {
                        if (ds !== sender) return;
                        self._onEdit(args.item, false, args.isCanceled);
                    }, self._objId);
                    ds.addOnStatusChanged(function (sender, args) {
                        if (ds !== sender) return;
                        self._onStatusChanged(args.item, args.oldChangeType);
                    }, self._objId);
                    ds.addOnCommitChanges(function (sender, args) {
                        if (ds !== sender) return;
                        self._onCommitChanges(args.item, args.isBegin, args.isRejected, args.changeType);
                    }, self._objId);
                }
                private _unbindDS() {
                    var self = this, ds = this.dataSource;
                    if (!ds) return;
                    ds.removeNSHandlers(self._objId);
                }
                private _addOption(item: collMOD.CollectionItem, first:boolean) {
                    if (this._isDestroyCalled)
                        return null;
                    var oOption: HTMLOptionElement, key = '', val: string, text: string;
                    if (!!item) {
                        key = item._key;
                    }
                    if (!!this._keyMap[key]) {
                        return null;
                    }
                    text = this._getText(item);
                    val = this._getStringValue(item);
                    oOption = global.document.createElement("option");
                    oOption.text = text;
                    oOption.value = key;
                    var data: IMappedItem = { item: item, op: oOption };
                    this._keyMap[key] = data;
                    var selEl = this.el;
                    if (!!val)
                        this._valMap[val] = data;
                    if (!!first) {
                        if (selEl.options.length < 2)
                            selEl.add(oOption, null);
                        else
                            selEl.add(oOption, selEl.options[1]);
                    }
                    else
                        selEl.add(oOption, null);
                    return oOption;
                }
                private _mapByValue() {
                    var self = this;
                    this._valMap = {};
                    utils.forEachProp(this._keyMap, (key) => {
                        var data = self._keyMap[key], val = self._getStringValue(data.item);
                        if (!!val)
                            self._valMap[val] = data;
                    });
                }
                private _resetText() {
                    var self = this;
                    utils.forEachProp(this._keyMap, (key) => {
                        var data = self._keyMap[key];
                        data.op.text = self._getText(data.item); 
                    });
                }
                private _removeOption(item: collMOD.CollectionItem) {
                    if (this._isDestroyCalled)
                        return;
                    var key = '', data: IMappedItem, val: string;
                    if (!!item) {
                        key = item._key;
                        data = this._keyMap[key];
                        if (!data) {
                            return;
                        }
                        this.el.remove(data.op.index);
                        val = this._getStringValue(item);
                        delete this._keyMap[key];
                        if (!!val)
                            delete this._valMap[val];
                        if (this._prevSelected === item) {
                            this._prevSelected = null;
                        }
                        if (this.selectedItem === item) {
                            this.selectedItem = this._prevSelected;
                        }
                    }
                }
                private _clear(isDestroy: boolean) {
                    this.el.options.length = 0;
                    this._keyMap = {};
                    this._valMap = {};
                    this._prevSelected = null;
                    if (!isDestroy) {
                        this._addOption(null, false);
                        this.selectedItem = null;
                    }
                    else
                        this.selectedItem = null;
                }
                private _refresh() {
                    var self = this, ds = this.dataSource, oldItem = this._selectedItem, tmp = self._tempValue;
                    this._isRefreshing = true;
                    try {
                        this.clear();
                        if (!!ds) {
                            ds.forEach(function (item) {
                                self._addOption(item, false);
                            });
                            if (utils.check.isUndefined(tmp)) {
                                self.el.selectedIndex = self._findItemIndex(oldItem);
                            }
                            else {
                                oldItem = self.findItemByValue(tmp);
                                self.selectedItem = oldItem;
                                if (!oldItem)
                                    self._tempValue = tmp;
                                else
                                    self._tempValue = undefined;
                            }
                        }
                    
                    } finally {
                        self._isRefreshing = false;
                    }
                    self._onChanged();
                }
                private _findItemIndex(item: collMOD.CollectionItem) {
                    if (!item)
                        return 0;
                    var data:IMappedItem = this._keyMap[item._key];
                    if (!data)
                        return 0;
                    return data.op.index;
                }
                protected _setIsEnabled(el: HTMLSelectElement, v:boolean) {
                    el.disabled = !v;
                }
                protected _getIsEnabled(el: HTMLSelectElement) {
                    return !el.disabled;
                }
                clear() {
                    this._clear(false);
                }
                findItemByValue(val): collMOD.CollectionItem {
                    if (utils.check.isNt(val))
                        return null;
                    val = '' + val;
                    var data: IMappedItem = this._valMap[val];
                    if (!data)
                        return null;
                    return data.item;
                }
                getTextByValue(val):string {
                    if (utils.check.isNt(val))
                        return '';
                    val = '' + val;
                    var data: IMappedItem = this._valMap[val];
                    if (!data)
                        return '';
                    else
                        return data.op.text;
                }
                toString() {
                    return 'ListBox';
                }
                get dataSource() { return this._options.dataSource; }
                set dataSource(v) {
                    if (this.dataSource !== v) {
                        if (!!this.dataSource) {
                            this._tempValue = this.selectedValue;
                            this._unbindDS();
                        }
                        this._options.dataSource = v;
                        if (!!this.dataSource) {
                            this._bindDS();
                        }
                        this._refresh();
                        if (!!this.dataSource)
                            this._tempValue = undefined;
                        this.raisePropertyChanged('dataSource');
                        this.raisePropertyChanged('selectedItem');
                        this.raisePropertyChanged('selectedValue');
                    }
                }
                get selectedValue() {
                    if (!!this.dataSource)
                        return this._getValue(this.selectedItem);
                    else
                        return undefined;
                }
                set selectedValue(v) {
                    var self = this;
                    if (!!this.dataSource) {
                        if (this.selectedValue !== v) {
                            var item = self.findItemByValue(v);
                            self.selectedItem = item;
                            if (!utils.check.isUndefined(v) && !item)
                                self._tempValue = v;
                            else
                                self._tempValue = undefined;
                        }
                    }
                    else {
                        if (this._tempValue !== v) {
                            this._selectedItem = null;
                            this._tempValue = v;
                            this.raisePropertyChanged('selectedItem');
                            this.raisePropertyChanged('selectedValue');
                        }
                    }
                }
                get selectedItem() {
                    if (!!this.dataSource)
                        return this._selectedItem;
                    else
                        return undefined;
                }
                set selectedItem(v: collMOD.CollectionItem) {
                    if (this._selectedItem !== v) {
                        if (!!this._selectedItem) {
                            this._prevSelected = this._selectedItem;
                        }
                        this._selectedItem = v;
                        this.el.selectedIndex = this._findItemIndex(this._selectedItem);
                        this.raisePropertyChanged('selectedItem');
                        this.raisePropertyChanged('selectedValue');
                    }
                }
                get valuePath() { return this._options.valuePath; }
                set valuePath(v:string) {
                    if (v !== this.valuePath) {
                        this._options.valuePath = v;
                        this._mapByValue();
                        this.raisePropertyChanged('valuePath');
                    }
                }
                get textPath() { return this._options.textPath; }
                set textPath(v:string) {
                    if (v !== this.textPath) {
                        this._options.textPath = v;
                        this._resetText();
                        this.raisePropertyChanged('textPath');
                    }
                }
                get isEnabled() { return this._getIsEnabled(this.el); }
                set isEnabled(v) {
                    if (v !== this.isEnabled) {
                        this._setIsEnabled(this.el, v);
                        this.raisePropertyChanged('isEnabled');
                    }
                }
                get el() { return this._options.el; }
            }
     
            export interface ISelectViewOptions extends IListBoxOptions, elviewMOD.IViewOptions {
            }

            export class SelectElView extends elviewMOD.BaseElView {
                private _listBox: ListBox;
                private _options: ISelectViewOptions;
                constructor(app: Application, el: HTMLSelectElement, options: ISelectViewOptions) {
                    var self = this;
                    self._options = options;
                    var opts: IListBoxConstructorOptions = utils.extend(false,
                        {
                            app: app,
                            el: el,
                            dataSource: null
                        }, this._options);
                    self._listBox = new ListBox(opts);
                    self._listBox.addOnDestroyed(function () {
                        self._listBox = null;
                        self.invokePropChanged('listBox');
                        self.raisePropertyChanged('listBox');
                    }, this.uniqueID);
                    self._listBox.addOnPropertyChange('*', function (sender, args) {
                        self.raisePropertyChanged(args.property);
                    }, self.uniqueID);
                    super(app, el, options);
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._listBox && !this._listBox.getIsDestroyCalled()) {
                        this._listBox.destroy();
                    }
                    this._listBox = null;
                    super.destroy();
                }
                toString() {
                    return 'SelectElView';
                }
                get isEnabled() {
                    if (this._isDestroyCalled)
                        return false;
                    return !this.el.disabled;
                }
                set isEnabled(v: boolean) {
                    v = !!v;
                    if (v !== this.isEnabled) {
                        this.el.disabled = !v;
                        this.raisePropertyChanged('isEnabled');
                    }
                }
                get el() { return <HTMLSelectElement>this._el; }
                get dataSource() {
                    if (this._isDestroyCalled)
                        return undefined;
                    return this._listBox.dataSource;
                }
                set dataSource(v) {
                    var self = this;
                    if (self.dataSource !== v) {
                        self._listBox.dataSource = v;
                    }
                }
                get selectedValue() {
                    if (this._isDestroyCalled)
                        return undefined;
                    return this._listBox.selectedValue;
                }
                set selectedValue(v) {
                    if (this._isDestroyCalled)
                        return;
                    if (this._listBox.selectedValue !== v) {
                        this._listBox.selectedValue = v;
                    }
                }
                get selectedItem() {
                    if (this._isDestroyCalled)
                        return undefined;
                    return this._listBox.selectedItem;
                }
                set selectedItem(v: collMOD.CollectionItem) {
                    if (this._isDestroyCalled)
                        return;
                    this._listBox.selectedItem = v;
                }
                get listBox() { return this._listBox; }
            }
             

            export interface ILookupOptions {
                dataSource: string; valuePath: string; textPath: string;
            }

            export class LookupContent extends contentMOD.BindingContent implements contentMOD.IExternallyCachable {
                private _spanView: elviewMOD.SpanElView;
                private _valBinding: bindMOD.Binding;
                private _listBinding: bindMOD.Binding;
                private _selectView: SelectElView;
                private _isListBoxCachedExternally: boolean;
                private _value: any;

                constructor(app: RIAPP.Application, options: contentMOD.IConstructorContentOptions) {
                    if (options.contentOptions.name != 'lookup') {
                        throw new Error(utils.format(RIAPP.ERRS.ERR_ASSERTION_FAILED, "contentOptions.name == 'lookup'"));
                    }
                    this._spanView = null;
                    this._selectView = null;
                    this._isListBoxCachedExternally = false;
                    this._valBinding = null;
                    this._listBinding = null;
                    this._value = null;
                    super(app, options);
                }
                protected _init() {
                    if (!!this._options.initContentFn) {
                        this._options.initContentFn(this);
                    }
                }
                protected _getEventNames() {
                    var base_events = super._getEventNames();
                    return ['object_created', 'object_needed'].concat(base_events);
                }
                addOnObjectCreated(fn: (sender: any, args: { objectKey: string; object: BaseObject; isCachedExternally: boolean; }) => void , namespace?: string) {
                    this.addHandler('object_created', fn, namespace);
                }
                removeOnObjectCreated(namespace?: string) {
                    this.removeHandler('object_created', namespace);
                }
                addOnObjectNeeded(fn: (sender: any, args: { objectKey: string; object: BaseObject; }) => void , namespace?: string) {
                    this.addHandler('object_needed', fn, namespace);
                }
                removeOnObjectNeeded(namespace?: string) {
                    this.removeHandler('object_needed', namespace);
                }
                protected _getSelectView(): SelectElView {
                    if (!!this._selectView)
                        return this._selectView;
                    var lookUpOptions: ILookupOptions = this._options.options;
                    var args1 = { objectKey: 'selectElView', object: null };
                    //try get externally externally cached listBox
                    this.raiseEvent('object_needed', args1);
                    if (!!args1.object) {
                        this._isListBoxCachedExternally = true;
                        this._selectView = args1.object;
                    }
                    if (!!this._selectView)
                        return this._selectView;
                    //proceed creating new selectElView
                    var dataSource = parser.resolvePath(this.app, lookUpOptions.dataSource),
                        options = { valuePath: lookUpOptions.valuePath, textPath: lookUpOptions.textPath };
                    var el = <HTMLSelectElement>global.document.createElement('select');
                    el.setAttribute('size', '1');
                    var selectElView = this._createSelectElView(el, options);
                    selectElView.dataSource = dataSource;
                    var args2 = { objectKey: 'selectElView', object: selectElView, isCachedExternally: false };
                    //this allows to cache listBox externally
                    this.raiseEvent('object_created', args2);
                    this._isListBoxCachedExternally = args2.isCachedExternally;
                    this._selectView = selectElView;
                    return this._selectView;
                }
                protected _createSelectElView(el: HTMLSelectElement, options: ISelectViewOptions): SelectElView {
                    var elView;
                    elView = this.app._getElView(el);
                    if (!!elView)
                        return elView;
                    elView =  new SelectElView(this.app, el, options);
                    return elView;
                }
                protected _updateTextValue() {
                    var spanView = this._getSpanView();
                    spanView.value = this._getLookupText();
                }
                protected _getLookupText() {
                    var listBoxView = this._getSelectView();
                    return listBoxView.listBox.getTextByValue(this.value);
                }
                protected _getSpanView() {
                    if (!!this._spanView) {
                        return this._spanView;
                    }
                    var el = global.document.createElement('span'), displayInfo = this._getDisplayInfo();
                    var spanView = new elviewMOD.SpanElView(this.app, el, {});
                    if (!!displayInfo) {
                        if (!!displayInfo.displayCss) {
                            spanView.$el.addClass(displayInfo.displayCss);
                        }
                    }
                    this._spanView = spanView;
                    return this._spanView;
                }
                update() {
                    this._cleanUp();
                    this._createTargetElement();
                    this._parentEl.appendChild(this._el);
                }
                protected _createTargetElement(): elviewMOD.BaseElView {
                    var tgt: elviewMOD.BaseElView, el: HTMLElement, selectView: SelectElView, spanView: elviewMOD.SpanElView;
                    if (this._isEditing && this._canBeEdited()) {
                        selectView = this._getSelectView();
                        this._listBinding = this._bindToList(selectView);
                        tgt = selectView;
                    }
                    else {
                        spanView = this._getSpanView();
                        this._valBinding = this._bindToValue();
                        tgt = spanView;
                    }
                    this._el = tgt.el;
                    this._updateCss();
                    return tgt;
                }
                protected _cleanUp() {
                    if (!!this._el) {
                        utils.removeNode(this._el);
                        this._el = null;
                    }
                    if (!!this._listBinding) {
                        this._listBinding.destroy();
                        this._listBinding = null;
                    }
                    if (!!this._valBinding) {
                        this._valBinding.destroy();
                        this._valBinding = null;
                    }

                    if (!!this._selectView && this._isListBoxCachedExternally) {
                        this._selectView = null;
                    }
                }
                protected _updateBindingSource() {
                    if (!!this._valBinding) {
                        this._valBinding.source = this._dataContext;
                    }
                    if (!!this._listBinding) {
                        this._listBinding.source = this._dataContext;
                    }
                }
                protected _bindToValue() {
                    if (!this._options.fieldName)
                        return null;

                    var options: bindMOD.IBindingOptions = {
                        target: this, source: this._dataContext,
                        targetPath: 'value', sourcePath: this._options.fieldName,
                        mode: bindMOD.BINDING_MODE.OneWay,
                        converter: null, converterParam: null, isSourceFixed: false
                    };
                    return this.app.bind(options);
                }
                protected _bindToList(selectView: SelectElView) {
                    if (!this._options.fieldName)
                        return null;

                    var options: bindMOD.IBindingOptions = {
                        target: selectView, source: this._dataContext,
                        targetPath: 'selectedValue', sourcePath: this._options.fieldName,
                        mode: bindMOD.BINDING_MODE.TwoWay,
                        converter: null, converterParam: null, isSourceFixed: false
                    };
                    return this.app.bind(options);
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._cleanUp();
                    if (!!this._selectView && !this._isListBoxCachedExternally) {
                        this._selectView.destroy();
                    }
                    this._selectView = null;
                    if (!!this._spanView) {
                        this._spanView.destroy();
                    }
                    this._spanView = null;
                    super.destroy();
                }
                toString() {
                    return 'LookupContent';
                }
                get value() { return this._value; }
                set value(v) {
                    if (this._value !== v) {
                        this._value = v;
                        this._updateTextValue();
                        this.raisePropertyChanged('value');
                    }
                }
            }

            export class ContentFactory implements contentMOD.IContentFactory  {
                private _app: Application;
                private _nextFactory: contentMOD.IContentFactory;

                constructor(app: Application, nextFactory?: contentMOD.IContentFactory) {
                    this._app = app;
                    this._nextFactory = nextFactory;
                }

                getContentType(options: contentMOD.IContentOptions): contentMOD.IContentType {
                    if (options.name == 'lookup') {
                        return LookupContent;
                    }
                    if (!!this._nextFactory)
                        return this._nextFactory.getContentType(options);
                    else
                        throw new Error(RIAPP.ERRS.ERR_BINDING_CONTENT_NOT_FOUND);
                }

                createContent(options: contentMOD.IConstructorContentOptions): contentMOD.IContent {
                    var contentType = this.getContentType(options);
                    return new contentType(this.app, options);
                }

                isExternallyCachable(contentType: contentMOD.IContentType): boolean {
                    if (LookupContent === contentType)
                        return true;
                    return this._nextFactory.isExternallyCachable(contentType);
                }
                get app() { return this._app; }
            }

            export function initModule(app: Application) {
                app.registerContentFactory((nextFactory?: contentMOD.IContentFactory) => {
                    return new ContentFactory(app, nextFactory);
                });
                return listbox;
            };

            global.registerElView('select', SelectElView);
            global.onModuleLoaded('listbox', listbox);
        }
    }
}

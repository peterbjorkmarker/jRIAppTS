module RIAPP {
    export module MOD {
        export module listbox{
            import collMod = MOD.collection;
            var utils: MOD.utils.Utils, parser: MOD.parser.Parser;
            RIAPP.global.addOnInitialize((s, args) => {
                utils = s.utils;
                parser = s.parser;
            });

            export interface IListBoxOptions{
                valuePath: string;
                textPath: string;
            }

            export interface IMappedItem {
                item: collMod.CollectionItem;
                op: { text: string; value: any; index: number; }; 
            }

            export class ListBox extends RIAPP.BaseObject {
                private _el: HTMLSelectElement;
                private _$el: JQuery;
                private _objId: string;
                private _dataSource: collMod.BaseCollection<collMod.CollectionItem>;
                private _isRefreshing: boolean;
                private _isDSFilling: boolean;
                private _valuePath: string;
                private _textPath: string;
                private _selectedItem: collMod.CollectionItem;
                private _prevSelected: collMod.CollectionItem;
                private _keyMap: { [key: string]: IMappedItem; };
                private _valMap: { [val: string]: IMappedItem; };
                private _savedValue: string;
                private _tempValue: any;

                constructor(el: HTMLSelectElement, dataSource: collMod.BaseCollection<collMod.CollectionItem>, options: IListBoxOptions) {
                    super();
                    var self = this;
                    this._el = el;
                    this._$el = global.$(this._el);
                    this._objId = 'lst' + utils.getNewID();
                    if (!!dataSource && !(dataSource instanceof collMod.BaseCollection))
                        throw new Error(RIAPP.ERRS.ERR_LISTBOX_DATASRC_INVALID);
                    this._$el.on('change.' + this._objId, function (e) {
                        e.stopPropagation();
                        if (self._isRefreshing)
                            return;
                        self._onChanged();
                    });
                    this._dataSource = null;
                    this._isDSFilling = false;
                    this._isRefreshing = false;
                    this._valuePath = options.valuePath;
                    this._textPath = options.textPath;
                    this._selectedItem = null;
                    this._prevSelected = null;
                    this._keyMap = {};
                    this._valMap = {};
                    this._savedValue = undefined;
                    this._tempValue = undefined;
                    this.dataSource = dataSource;
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._unbindDS();
                    this._$el.off('.' + this._objId);
                    this._clear(true);
                    this._el = null;
                    this._$el = null;
                    this._dataSource = null;
                    this._tempValue = undefined;
                    this._selectedItem = null;
                    this._prevSelected = null;
                    this._savedValue = null;
                    super.destroy();
                }
                _onChanged() {
                    var op = null, key: string, data: IMappedItem;
                    if (this._el.selectedIndex >= 0) {
                        op = this._el.options[this._el.selectedIndex];
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
                _getValue(item: collMod.CollectionItem):string {
                    var v = this._getRealValue(item);
                    if (utils.check.isNt(v))
                        return '';
                    return '' + v;
                }
                _getRealValue(item: collMod.CollectionItem):any {
                    if (!item)
                        return null;
                    if (!!this._valuePath) {
                        return parser.resolvePath(item, this._valuePath);
                    }
                    else
                        return undefined;
                }
                _getText(item: collMod.CollectionItem):string {
                    if (!item)
                        return '';
                    if (!!this._textPath) {
                        var t = global.parser.resolvePath(item, this._textPath);
                        if (utils.check.isNt(t))
                            return '';
                        return '' + t;
                    }
                    else
                        return this._getValue(item);
                }
                _onDSCollectionChanged(args: collMod.ICollChangedArgs<collMod.CollectionItem>) {
                    var self = this, data;
                    switch (args.change_type) {
                        case collMod.COLL_CHANGE_TYPE.RESET:
                            if (!this._isDSFilling)
                                this._refresh();
                            break;
                        case collMod.COLL_CHANGE_TYPE.ADDED:
                            if (!this._isDSFilling) //if items are filling then it will be appended when fill ends
                            {
                                args.items.forEach(function (item) {
                                    self._addOption(item, item._isNew);
                                });
                            }
                            break;
                        case collMod.COLL_CHANGE_TYPE.REMOVE:
                            args.items.forEach(function (item) {
                                self._removeOption(item);
                            });
                            break;
                        case collMod.COLL_CHANGE_TYPE.REMAP_KEY:
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
                _onDSFill(args: collMod.ICollFillArgs<collMod.CollectionItem>) {
                    var isEnd = !args.isBegin;
                    if (isEnd) {
                        this._isDSFilling = false;
                        this._refresh();
                    }
                    else {
                        this._isDSFilling = true;
                    }
                }
                _onEdit(item: collMod.CollectionItem, isBegin:boolean, isCanceled:boolean) {
                    var self = this, key:string, data: IMappedItem, oldVal:string, val:string;
                    if (isBegin) {
                        this._savedValue = this._getValue(item);
                    }
                    else {
                        oldVal = this._savedValue;
                        this._savedValue = undefined;
                        if (!isCanceled) {
                            key = item._key;
                            data = self._keyMap[key];
                            if (!!data) {
                                data.op.text = self._getText(item);
                                val = this._getValue(item);
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
                _onStatusChanged(item: collMod.CollectionItem, oldChangeType:number) {
                    var newChangeType = item._changeType;
                    if (newChangeType === collMod.STATUS.DELETED) {
                        this._removeOption(item);
                    }
                }
                _onCommitChanges(item: collMod.CollectionItem, isBegin: boolean, isRejected: boolean, changeType: collMod.STATUS) {
                    var self = this, oldVal, val, data;
                    if (isBegin) {
                        if (isRejected && changeType === collMod.STATUS.ADDED) {
                            return;
                        }
                        else if (!isRejected && changeType === collMod.STATUS.DELETED) {
                            return;
                        }

                        this._savedValue = this._getValue(item);
                    }
                    else {
                        oldVal = this._savedValue;
                        this._savedValue = undefined;

                        if (isRejected && changeType === collMod.STATUS.DELETED) {
                            this._addOption(item, true);
                            return;
                        }
                        val = this._getValue(item);
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
                _unbindDS() {
                    var self = this, ds = this._dataSource;
                    if (!ds) return;
                    ds.removeNSHandlers(self._objId);
                }
                _addOption(item: collMod.CollectionItem, first:boolean) {
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
                    val = this._getValue(item);
                    oOption = global.document.createElement("option");
                    oOption.text = text;
                    oOption.value = key;
                    var data: IMappedItem = { item: item, op: oOption };
                    this._keyMap[key] = data;
                    if (!!val)
                        this._valMap[val] = data;
                    if (!!first) {
                        if (this._el.options.length < 2)
                            this._el.add(oOption, null);
                        else
                            this._el.add(oOption, this._el.options[1]);
                    }
                    else
                        this._el.add(oOption, null);
                    return oOption;
                }
                _mapByValue() {
                    var self = this;
                    this._valMap = {};
                    utils.forEachProp(this._keyMap, (key) => {
                        var data = self._keyMap[key], val = self._getValue(data.item);
                        if (!!val)
                            self._valMap[val] = data;
                    });
                }
                _resetText() {
                    var self = this;
                    utils.forEachProp(this._keyMap, (key) => {
                        var data = self._keyMap[key];
                        data.op.text = self._getText(data.item); 
                    });
                }
                _removeOption(item: collMod.CollectionItem) {
                    if (this._isDestroyCalled)
                        return;
                    var key = '', data: IMappedItem, val: string;
                    if (!!item) {
                        key = item._key;
                        data = this._keyMap[key];
                        if (!data) {
                            return;
                        }
                        this._el.remove(data.op.index);
                        val = this._getValue(item);
                        delete this._keyMap[key];
                        if (val !== '')
                            delete this._valMap[val];
                        if (this._prevSelected === item) {
                            this._prevSelected = null;
                        }
                        if (this.selectedItem === item) {
                            this.selectedItem = this._prevSelected;
                        }
                    }
                }
                _clear(isDestroy: boolean) {
                    this._el.options.length = 0;
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
                _refresh() {
                    var self = this, ds = this._dataSource, oldItem = this._selectedItem, tmp = self._tempValue;
                    this._isRefreshing = true;
                    try {
                        this.clear();
                        if (!!ds) {
                            ds.forEach(function (item) {
                                self._addOption(item, false);
                            });

                            if (tmp === undefined) {
                                self._el.selectedIndex = self._findItemIndex(oldItem);
                            }
                            else {
                                oldItem = self.findItemByValue(tmp);
                                self.selectedItem = oldItem;
                                self._tempValue = undefined;
                            }
                        }
                    
                    } finally {
                        self._isRefreshing = false;
                    }
                    self._onChanged();
                }
                _findItemIndex(item: collMod.CollectionItem) {
                    if (!item)
                        return 0;
                    var data:IMappedItem = this._keyMap[item._key];
                    if (!data)
                        return 0;
                    return data.op.index;
                }
                _setIsEnabled(el: HTMLSelectElement, v:boolean) {
                    el.disabled = !v;
                }
                _getIsEnabled(el: HTMLSelectElement) {
                    return !el.disabled;
                }
                clear() {
                    this._clear(false);
                }
                findItemByValue(val) {
                    var data: IMappedItem = this._valMap[val];
                    if (!data)
                        return null;
                    return data.item;
                }
                getTextByValue(val) {
                    var data: IMappedItem = this._valMap[val];
                    if (!data)
                        return '';
                    else
                        return data.op.text;
                }
                toString() {
                    return 'ListBox';
                }
                get dataSource() { return this._dataSource; }
                set dataSource(v: collMod.BaseCollection<collMod.CollectionItem>) {
                    if (this._dataSource !== v) {
                        if (!!this._dataSource)
                            this._tempValue = this.selectedValue;
                        if (!!this._dataSource)
                            this._unbindDS();
                        this._dataSource = v;
                        if (!!this._dataSource) {
                            this._bindDS();
                        }
                        this._refresh();
                        if (!!this._dataSource)
                            this._tempValue = undefined;
                        this.raisePropertyChanged('dataSource');
                        this.raisePropertyChanged('selectedItem');
                        this.raisePropertyChanged('selectedValue');
                    }
                }
                get selectedValue() {
                    if (!!this._dataSource)
                        return this._getRealValue(this.selectedItem);
                    else
                        return undefined;
                }
                set selectedValue(v) {
                    var self = this;
                    if (!!this._dataSource) {
                        if (this.selectedValue !== v) {
                            var item = self.findItemByValue(v);
                            self.selectedItem = item;
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
                    if (!!this._dataSource)
                        return this._selectedItem;
                    else
                        return undefined;
                }
                set selectedItem(v: collMod.CollectionItem) {
                    if (this._selectedItem !== v) {
                        if (!!this._selectedItem) {
                            this._prevSelected = this._selectedItem;
                        }
                        this._selectedItem = v;
                        this._el.selectedIndex = this._findItemIndex(this._selectedItem);
                        this.raisePropertyChanged('selectedItem');
                        this.raisePropertyChanged('selectedValue');
                    }
                }
                get valuePath() { return this._valuePath; }
                set valuePath(v:string) {
                    if (v !== this._valuePath) {
                        this._valuePath = v;
                        this._mapByValue();
                        this.raisePropertyChanged('valuePath');
                    }
                }
                get textPath() { return this._textPath; }
                set textPath(v:string) {
                    if (v !== this._textPath) {
                        this._textPath = v;
                        this._resetText();
                        this.raisePropertyChanged('textPath');
                    }
                }
                get isEnabled() { return this._getIsEnabled(this._el); }
                set isEnabled(v) {
                    if (v !== this.isEnabled) {
                        this._setIsEnabled(this._el, v);
                        this.raisePropertyChanged('isEnabled');
                    }
                }
                get el() { return this._el; }
            }
     
            export interface ISelectViewOptions extends IListBoxOptions, baseElView.IViewOptions {
            }

            export class SelectElView extends baseElView.BaseElView {
                private _listBox: ListBox;
                private _options: ISelectViewOptions;
                constructor(app: Application, el: HTMLSelectElement, options: ISelectViewOptions) {
                    var self = this;
                    self._options = options;
                    self._listBox = new ListBox(el, null, self._options);
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
                    if (!!this._listBox && !this._listBox._isDestroyCalled) {
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
                set selectedItem(v: collMod.CollectionItem) {
                    if (this._isDestroyCalled)
                        return;
                    this._listBox.selectedItem = v;
                }
                get listBox() { return this._listBox; }
            }
             

            export interface ILookupOptions {
                dataSource: string; valuePath: string; textPath: string;
            }

            export class LookupContent extends baseContent.BindingContent implements baseContent.IExternallyCachable {
                private _spanView: baseElView.SpanElView;
                private _valBinding: binding.Binding;
                private _listBinding: binding.Binding;
                private _selectView: SelectElView;
                private _isListBoxCachedExternally: boolean;
                private _value: any;

                constructor(app: Application, parentEl: HTMLElement, options: baseContent.IContentOptions, dctx, isEditing: boolean) {
                    if (options.name != 'lookup') {
                        throw new Error(utils.format(RIAPP.ERRS.ERR_ASSERTION_FAILED, "options.name == 'lookup'"));
                    }
                    this._spanView = null;
                    this._selectView = null;
                    this._isListBoxCachedExternally = false;
                    this._valBinding = null;
                    this._listBinding = null;
                    this._value = null;
                    super(app, parentEl, options, dctx, isEditing);
                }
                _init() {
                    if (!!this._options.initContentFn) {
                        this._options.initContentFn(this);
                    }
                }
                _getEventNames() {
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
                _getSelectView(): SelectElView {
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
                    var dataSource = global.parser.resolvePath(this.app, lookUpOptions.dataSource),
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
                _createSelectElView(el: HTMLSelectElement, options: ISelectViewOptions): SelectElView {
                    var elView;
                    elView = this.app._getElView(el);
                    if (!!elView)
                        return elView;
                    elView =  new SelectElView(this.app, el, options);
                    return elView;
                }
                _updateTextValue() {
                    var spanView = this._getSpanView();
                    spanView.value = this._getLookupText();
                }
                _getLookupText() {
                    var listBoxView = this._getSelectView();
                    return listBoxView.listBox.getTextByValue(this.value);
                }
                _getSpanView() {
                    if (!!this._spanView) {
                        return this._spanView;
                    }
                    var el = global.document.createElement('span'), displayInfo = this._getDisplayInfo();
                    var spanView = new baseElView.SpanElView(this.app, el, {});
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
                _createTargetElement(): MOD.baseElView.BaseElView {
                    var tgt: MOD.baseElView.BaseElView, el: HTMLElement, selectView: SelectElView, spanView: baseElView.SpanElView;
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
                _cleanUp() {
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
                _updateBindingSource() {
                    if (!!this._valBinding) {
                        this._valBinding.source = this._dctx;
                    }
                    if (!!this._listBinding) {
                        this._listBinding.source = this._dctx;
                    }
                }
                _bindToValue() {
                    if (!this._options.fieldName)
                        return null;

                    var options: RIAPP.MOD.binding.IBindingOptions = {
                        target: this, source: this._dctx,
                        targetPath: 'value', sourcePath: this._options.fieldName, mode: RIAPP.MOD.binding.BINDING_MODE.OneWay,
                        converter: null, converterParam: null, isSourceFixed: false
                    };
                    return new binding.Binding(options);
                }
                _bindToList(selectView: SelectElView) {
                    if (!this._options.fieldName)
                        return null;

                    var options: RIAPP.MOD.binding.IBindingOptions = {
                        target: selectView, source: this._dctx,
                        targetPath: 'selectedValue', sourcePath: this._options.fieldName, mode: RIAPP.MOD.binding.BINDING_MODE.TwoWay,
                        converter: null, converterParam: null, isSourceFixed: false
                    };
                    return new binding.Binding(options);
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

            export class ContentFactory implements baseContent.IContentFactory  {
                private _app: Application;
                private _nextFactory: baseContent.IContentFactory;

                constructor(app: Application, nextFactory?: baseContent.IContentFactory) {
                    this._app = app;
                    this._nextFactory = nextFactory;
                }

                getContentType(options: baseContent.IContentOptions): baseContent.IContentType {
                    if (options.name == 'lookup') {
                        return LookupContent;
                    }
                    if (!!this._nextFactory)
                        return this._nextFactory.getContentType(options);
                    else
                        throw new Error(RIAPP.ERRS.ERR_BINDING_CONTENT_NOT_FOUND);
                }

                createContent(parentEl: HTMLElement, options: baseContent.IContentOptions, dctx, isEditing: boolean): baseContent.IContent {
                    var contentType = this.getContentType(options);
                    return new contentType(this._app, parentEl, options, dctx, isEditing);
                }

                isExternallyCachable(contentType): boolean {
                    if (LookupContent === contentType)
                        return true;
                    return this._nextFactory.isExternallyCachable(contentType);
                }
                get app() { return this._app; }
            }

            export function initModule(app: Application) {
                app.registerContentFactory((nextFactory?: baseContent.IContentFactory) => {
                    return new ContentFactory(app, nextFactory);
                });
                return listbox;
            };

            global.registerElView('select', SelectElView);
            global.onModuleLoaded('listbox', listbox);
        }
    }
}

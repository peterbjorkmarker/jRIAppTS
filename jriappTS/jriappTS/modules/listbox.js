var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RIAPP;
(function (RIAPP) {
    (function (MOD) {
        (function (listbox) {
            //local variables for optimization
                        var utils = RIAPP.global.utils, consts = RIAPP.global.consts;
            var ListBox = (function (_super) {
                __extends(ListBox, _super);
                function ListBox(el, dataSource, options) {
                                _super.call(this);
                    var self = this;
                    this._el = el;
                    this._$el = RIAPP.global.$(this._el);
                    this._objId = 'lst' + utils.getNewID();
                    if(!!dataSource && !(dataSource instanceof MOD.collection.Collection)) {
                        throw new Error(RIAPP.ERRS.ERR_LISTBOX_DATASRC_INVALID);
                    }
                    this._$el.on('change.' + this._objId, function (e) {
                        e.stopPropagation();
                        if(self._isRefreshing) {
                            return;
                        }
                        self._onChanged();
                    });
                    this._dataSource = null;
                    this._isDSFilling = false;
                    this._isRefreshing = false;
                    this._valuePath = options.valuePath;
                    this._textPath = options.textPath;
                    this._selectedItem = null;
                    this._saveSelected = null;
                    this._keyMap = {
                    };
                    this._valMap = {
                    };
                    this._saveVal = undefined;
                    this.dataSource = dataSource;
                }
                ListBox.prototype.destroy = function () {
                    if(this._isDestroyed) {
                        return;
                    }
                    this._isDestroyCalled = true;
                    this._unbindDS();
                    this._$el.off('.' + this._objId);
                    this._clear(true);
                    this._el = null;
                    this._$el = null;
                    _super.prototype.destroy.call(this);
                };
                ListBox.prototype._onChanged = function () {
                    var op = null, key, data;
                    if(this._el.selectedIndex >= 0) {
                        op = (this._el.options)[this._el.selectedIndex];
                        key = op.value;
                        data = this._keyMap[key];
                    }
                    if(!data && !!this._selectedItem) {
                        this.selectedItem = null;
                    } else if(data.item !== this._selectedItem) {
                        this.selectedItem = data.item;
                    }
                };
                ListBox.prototype._getValue = function (item) {
                    var v = this._getRealValue(item);
                    if(utils.check.isNt(v)) {
                        return '';
                    }
                    return v;
                };
                ListBox.prototype._getRealValue = function (item) {
                    if(!item) {
                        return null;
                    }
                    if(!!this._valuePath) {
                        return RIAPP.global.parser.resolvePath(item, this._valuePath);
                    } else {
                        return undefined;
                    }
                };
                ListBox.prototype._getText = function (item) {
                    if(!item) {
                        return '';
                    }
                    if(!!this._textPath) {
                        var t = RIAPP.global.parser.resolvePath(item, this._textPath);
                        if(utils.check.isNt(t)) {
                            return '';
                        }
                        return '' + t;
                    } else {
                        return '' + this._getValue(item);
                    }
                };
                ListBox.prototype._onDSCollectionChanged = function (args) {
                    var self = this, CH_T = MOD.collection.consts.COLL_CHANGE_TYPE, data;
                    switch(args.change_type) {
                        case CH_T.RESET:
                            if(!this._isDSFilling) {
                                this._refresh();
                            }
                            break;
                        case CH_T.ADDED:
                            if(!this._isDSFilling)//if items are filling then it will be appended when fill ends
                             {
                                args.items.forEach(function (item) {
                                    self._addOption(item, item._isNew);
                                });
                            }
                            break;
                        case CH_T.REMOVE:
                            args.items.forEach(function (item) {
                                self._removeOption(item);
                            });
                            break;
                        case CH_T.REMAP_KEY: {
                            data = self._keyMap[args.old_key];
                            if(!!data) {
                                delete self._keyMap[args.old_key];
                                self._keyMap[args.new_key] = data;
                                data.op.value = args.new_key;
                            }
                        }
                    }
                };
                ListBox.prototype._onDSFill = function (args) {
                    var isEnd = !args.isBegin;
                    if(isEnd) {
                        this._isDSFilling = false;
                        this._refresh();
                    } else {
                        this._isDSFilling = true;
                    }
                };
                ListBox.prototype._onEdit = function (item, isBegin, isCanceled) {
                    var self = this, key, data, oldVal, val;
                    if(isBegin) {
                        this._saveVal = this._getValue(item);
                    } else {
                        oldVal = this._saveVal;
                        this._saveVal = undefined;
                        if(!isCanceled) {
                            key = item._key;
                            data = self._keyMap[key];
                            if(!!data) {
                                data.op.text = self._getText(item);
                                val = this._getValue(item);
                                if(oldVal !== val) {
                                    if(oldVal !== '') {
                                        delete self._valMap[oldVal];
                                    }
                                    if(val !== '') {
                                        self._valMap[val] = data;
                                    }
                                }
                            } else {
                                if(oldVal !== '') {
                                    delete self._valMap[oldVal];
                                }
                            }
                        }
                    }
                };
                ListBox.prototype._onStatusChanged = function (item, oldChangeType) {
                    var DEL_STATUS = consts.CHANGE_TYPE.DELETED, newChangeType = item._changeType;
                    if(newChangeType === DEL_STATUS) {
                        this._removeOption(item);
                    }
                };
                ListBox.prototype._onCommitChanges = function (item, isBegin, isRejected, changeType) {
                    var self = this, ct = consts.CHANGE_TYPE, oldVal, val, data;
                    if(isBegin) {
                        if(isRejected && changeType === ct.ADDED) {
                            return;
                        } else if(!isRejected && changeType === ct.DELETED) {
                            return;
                        }
                        this._saveVal = this._getValue(item);
                    } else {
                        oldVal = this._saveVal;
                        this._saveVal = undefined;
                        if(isRejected && changeType === ct.DELETED) {
                            this._addOption(item, true);
                            return;
                        }
                        val = this._getValue(item);
                        data = self._keyMap[item._key];
                        if(oldVal !== val) {
                            if(oldVal !== '') {
                                delete self._valMap[oldVal];
                            }
                            if(!!data && val !== '') {
                                self._valMap[val] = data;
                            }
                        }
                        if(!!data) {
                            data.op.text = self._getText(item);
                        }
                    }
                };
                ListBox.prototype._bindDS = function () {
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
                    ds.addOnBeginEdit(function (sender, args) {
                        if(ds !== sender) {
                            return;
                        }
                        self._onEdit(args.item, true, undefined);
                    }, self._objId);
                    ds.addOnEndEdit(function (sender, args) {
                        if(ds !== sender) {
                            return;
                        }
                        self._onEdit(args.item, false, args.isCanceled);
                    }, self._objId);
                    ds.addOnStatusChanged(function (sender, args) {
                        if(ds !== sender) {
                            return;
                        }
                        self._onStatusChanged(args.item, args.oldChangeType);
                    }, self._objId);
                    ds.addOnCommitChanges(function (sender, args) {
                        if(ds !== sender) {
                            return;
                        }
                        self._onCommitChanges(args.item, args.isBegin, args.isRejected, args.changeType);
                    }, self._objId);
                };
                ListBox.prototype._unbindDS = function () {
                    var self = this, ds = this._dataSource;
                    if(!ds) {
                        return;
                    }
                    ds.removeNSHandlers(self._objId);
                };
                ListBox.prototype._addOption = function (item, first) {
                    if(this._isDestroyCalled) {
                        return null;
                    }
                    var oOption, key = '', val, text;
                    if(!!item) {
                        key = item._key;
                    }
                    if(!!this._keyMap[key]) {
                        return null;
                    }
                    text = this._getText(item);
                    val = this._getValue(item);
                    oOption = RIAPP.global.document.createElement("option");
                    oOption.text = text;
                    oOption.value = key;
                    var data = {
                        item: item,
                        op: oOption
                    };
                    this._keyMap[key] = data;
                    if(val !== '') {
                        this._valMap[val] = data;
                    }
                    if(!!first) {
                        if(this._el.options.length < 2) {
                            this._el.add(oOption, null);
                        } else {
                            this._el.add(oOption, (this._el).options[1]);
                        }
                    } else {
                        this._el.add(oOption, null);
                    }
                    return oOption;
                };
                ListBox.prototype._removeOption = function (item) {
                    if(this._isDestroyCalled) {
                        return;
                    }
                    var key = '', data, val;
                    if(!!item) {
                        key = item._key;
                        data = this._keyMap[key];
                        if(!data) {
                            return;
                        }
                        this._el.remove(data.op.index);
                        val = this._getValue(item);
                        delete this._keyMap[key];
                        if(val !== '') {
                            delete this._valMap[val];
                        }
                        if(this._saveSelected === item) {
                            this._saveSelected = null;
                        }
                        if(this.selectedItem === item) {
                            this.selectedItem = this._saveSelected;
                        }
                    }
                };
                ListBox.prototype._clear = function (isDestroy) {
                    this._el.options.length = 0;
                    this._keyMap = {
                    };
                    this._valMap = {
                    };
                    this._saveSelected = null;
                    if(!isDestroy) {
                        this._addOption(null, false);
                        this.selectedItem = null;
                    } else {
                        this._selectedItem = null;
                    }
                };
                ListBox.prototype.clear = function () {
                    this._clear(false);
                };
                ListBox.prototype._refresh = function () {
                    var self = this, ds = this._dataSource, oldItem = this._selectedItem;
                    this._isRefreshing = true;
                    try  {
                        this.clear();
                        if(!!ds) {
                            ds.forEach(function (item) {
                                self._addOption(item, false);
                            });
                        }
                        this._el.selectedIndex = this._findItemIndex(oldItem);
                    }finally {
                        this._isRefreshing = false;
                    }
                    this._onChanged();
                };
                ListBox.prototype._findItemIndex = function (item) {
                    if(!item) {
                        return 0;
                    }
                    var data = this._keyMap[item._key];
                    if(!data) {
                        return 0;
                    }
                    return data.op.index;
                };
                ListBox.prototype.findItemByValue = function (val) {
                    var data = this._valMap[val];
                    if(!data) {
                        return null;
                    }
                    return data.item;
                };
                ListBox.prototype.getTextByValue = function (val) {
                    var data = this._valMap[val];
                    if(!data) {
                        return '';
                    } else {
                        return data.op.text;
                    }
                };
                ListBox.prototype._setIsEnabled = function (el, v) {
                    el.disabled = !v;
                };
                ListBox.prototype._getIsEnabled = function (el) {
                    return !el.disabled;
                };
                ListBox.prototype.toString = function () {
                    return 'ListBox';
                };
                Object.defineProperty(ListBox.prototype, "dataSource", {
                    get: function () {
                        return this._dataSource;
                    },
                    set: function (v) {
                        if(this._dataSource !== v) {
                            if(!!this._dataSource) {
                                this._unbindDS();
                            }
                            this.clear();
                            this._dataSource = v;
                            if(!!this._dataSource) {
                                this._bindDS();
                            }
                            this._refresh();
                            this.raisePropertyChanged('dataSource');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListBox.prototype, "selectedValue", {
                    get: function () {
                        var item = this.selectedItem;
                        return this._getRealValue(item);
                    },
                    set: function (v) {
                        if(this.selectedValue !== v) {
                            var item = this.findItemByValue(v);
                            this.selectedItem = item;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListBox.prototype, "selectedItem", {
                    get: function () {
                        return this._selectedItem;
                    },
                    set: function (v) {
                        if(this._selectedItem !== v) {
                            if(!!this._selectedItem) {
                                this._saveSelected = this._selectedItem;
                            }
                            this._selectedItem = v;
                            this._el.selectedIndex = this._findItemIndex(this._selectedItem);
                            this.raisePropertyChanged('selectedItem');
                            this.raisePropertyChanged('selectedValue');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListBox.prototype, "valuePath", {
                    get: function () {
                        return this._valuePath;
                    },
                    set: function (v) {
                        if(v !== this._valuePath) {
                            this._valuePath = v;
                            this.raisePropertyChanged('valuePath');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListBox.prototype, "textPath", {
                    get: function () {
                        return this._textPath;
                    },
                    set: function (v) {
                        if(v !== this._textPath) {
                            this._textPath = v;
                            this._refresh();
                            this.raisePropertyChanged('textPath');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListBox.prototype, "isEnabled", {
                    get: function () {
                        return this._getIsEnabled(this._el);
                    },
                    set: function (v) {
                        if(v !== this.isEnabled) {
                            this._setIsEnabled(this._el, v);
                            this.raisePropertyChanged('isEnabled');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListBox.prototype, "el", {
                    get: function () {
                        return this._el;
                    },
                    enumerable: true,
                    configurable: true
                });
                return ListBox;
            })(RIAPP.BaseObject);
            listbox.ListBox = ListBox;            
            var SelectElView = (function (_super) {
                __extends(SelectElView, _super);
                function SelectElView(app, el, options) {
                    this._dataSource = null;
                    this._listBox = null;
                    this._options = options;
                                _super.call(this, app, el, options);
                }
                SelectElView.prototype.destroy = function () {
                    if(this._isDestroyed) {
                        return;
                    }
                    this._isDestroyCalled = true;
                    if(!!this._listBox && !this._listBox._isDestroyCalled) {
                        this._listBox.destroy();
                    }
                    this._listBox = null;
                    this._dataSource = null;
                    _super.prototype.destroy.call(this);
                };
                SelectElView.prototype.toString = function () {
                    return 'SelectElView';
                };
                Object.defineProperty(SelectElView.prototype, "isEnabled", {
                    get: function () {
                        return !this.el.disabled;
                    },
                    set: function (v) {
                        v = !!v;
                        if(v !== this.isEnabled) {
                            this.el.disabled = !v;
                            this.raisePropertyChanged('isEnabled');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SelectElView.prototype, "el", {
                    get: function () {
                        return this._el;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SelectElView.prototype, "dataSource", {
                    get: function () {
                        return this._dataSource;
                    },
                    set: function (v) {
                        var self = this;
                        if(this._dataSource !== v) {
                            this._dataSource = v;
                            if(!!this._listBox) {
                                this._listBox.destroy();
                            }
                            this._listBox = null;
                            if(!!this._dataSource) {
                                this._listBox = new ListBox(this._el, this._dataSource, this._options);
                                this._listBox.addOnDestroyed(function () {
                                    self._listBox = null;
                                }, this.uniqueID);
                                this._listBox.addOnPropertyChange('*', function (sender, args) {
                                    self.raisePropertyChanged(args.property);
                                }, this.uniqueID);
                            }
                            self.invokePropChanged('listBox');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SelectElView.prototype, "selectedValue", {
                    get: function () {
                        if(!this._listBox) {
                            return null;
                        }
                        return this._listBox.selectedValue;
                    },
                    set: function (v) {
                        if(!this._listBox) {
                            return;
                        }
                        if(this._listBox.selectedValue !== v) {
                            this._listBox.selectedValue = v;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SelectElView.prototype, "selectedItem", {
                    get: function () {
                        if(!this._listBox) {
                            return null;
                        }
                        return this._listBox.selectedItem;
                    },
                    set: function (v) {
                        if(!this._listBox) {
                            return;
                        }
                        this._listBox.selectedItem = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SelectElView.prototype, "listBox", {
                    get: function () {
                        return this._listBox;
                    },
                    enumerable: true,
                    configurable: true
                });
                return SelectElView;
            })(MOD.baseElView.BaseElView);
            listbox.SelectElView = SelectElView;            
            var LookupContent = (function (_super) {
                __extends(LookupContent, _super);
                function LookupContent(app, parentEl, options, dctx, isEditing) {
                    if(options.name != 'lookup') {
                        throw new Error(utils.format(RIAPP.ERRS.ERR_ASSERTION_FAILED, "options.name == 'lookup'"));
                    }
                    this._spanView = null;
                    this._selectView = null;
                    this._isListBoxCachedExternally = false;
                    this._valBinding = null;
                    this._listBinding = null;
                    this._value = null;
                                _super.call(this, app, parentEl, options, dctx, isEditing);
                }
                LookupContent.prototype._init = function () {
                    if(!!this._options.initContentFn) {
                        this._options.initContentFn(this);
                    }
                };
                LookupContent.prototype._getEventNames = function () {
                    var base_events = _super.prototype._getEventNames.call(this);
                    return [
                        'object_created', 
                        'object_needed'
                    ].concat(base_events);
                };
                LookupContent.prototype.addOnObjectCreated = function (fn, namespace) {
                    this.addHandler('object_created', fn, namespace);
                };
                LookupContent.prototype.removeOnObjectCreated = function (namespace) {
                    this.removeHandler('object_created', namespace);
                };
                LookupContent.prototype.addOnObjectNeeded = function (fn, namespace) {
                    this.addHandler('object_needed', fn, namespace);
                };
                LookupContent.prototype.removeOnObjectNeeded = function (namespace) {
                    this.removeHandler('object_needed', namespace);
                };
                LookupContent.prototype._getSelectView = function () {
                    if(!!this._selectView) {
                        return this._selectView;
                    }
                    var lookUpOptions = this._options.options;
                    var args1 = {
                        objectKey: 'selectElView',
                        object: null
                    };
                    //try get externally externally cached listBox
                    this.raiseEvent('object_needed', args1);
                    if(!!args1.object) {
                        this._isListBoxCachedExternally = true;
                        return args1.object;
                    }
                    //else proceed creating new selectElView
                                        var dataSource = RIAPP.global.parser.resolvePath(this.app, lookUpOptions.dataSource), options = {
                        valuePath: lookUpOptions.valuePath,
                        textPath: lookUpOptions.textPath
                    };
                    var el = RIAPP.global.document.createElement('select');
                    el.setAttribute('size', '1');
                    var selectElView = this._getSelectElView(el, options);
                    selectElView.dataSource = dataSource;
                    var args2 = {
                        objectKey: 'selectElView',
                        object: selectElView,
                        isCachedExternally: false
                    };
                    //this allows to cache listBox externally
                    this.raiseEvent('object_created', args2);
                    this._isListBoxCachedExternally = args2.isCachedExternally;
                    return selectElView;
                };
                LookupContent.prototype._getSelectElView = function (el, options) {
                    var elView;
                    elView = this.app._getElView(el);
                    if(!!elView) {
                        //view already created for this element
                        return elView;
                    }
                    elView = new SelectElView(this.app, el, options);
                    return elView;
                };
                LookupContent.prototype._updateTextValue = function () {
                    var self = this;
                    if(!!self._spanView) {
                        self._spanView.value = self._getLookupText();
                    }
                };
                LookupContent.prototype._getLookupText = function () {
                    var listBoxView = this._getSelectView();
                    return listBoxView.listBox.getTextByValue(this.value);
                };
                LookupContent.prototype._createSpanView = function () {
                    var el = RIAPP.global.document.createElement('span'), displayInfo = this._getDisplayInfo();
                    var spanView = new MOD.baseElView.SpanElView(this.app, el, {
                    });
                    if(!!displayInfo) {
                        if(!!displayInfo.displayCss) {
                            spanView.$el.addClass(displayInfo.displayCss);
                        }
                    }
                    return spanView;
                };
                LookupContent.prototype.update = function () {
                    this._cleanUp();
                    this._el = this._createTargetElement();
                    this._parentEl.appendChild(this._el);
                };
                LookupContent.prototype._createTargetElement = function () {
                    var el;
                    if(this._isEditing && this._canBeEdited()) {
                        if(!this._selectView) {
                            this._selectView = this._getSelectView();
                        }
                        this._listBinding = this._bindToList();
                        el = this._selectView.el;
                    } else {
                        if(!this._spanView) {
                            this._spanView = this._createSpanView();
                        }
                        this._valBinding = this._bindToValue();
                        el = this._spanView.el;
                    }
                    this._updateCss();
                    return el;
                };
                LookupContent.prototype._cleanUp = function () {
                    if(!!this._el) {
                        RIAPP.global.$(this._el).remove();
                        this._el = null;
                    }
                    if(!!this._listBinding) {
                        this._listBinding.destroy();
                        this._listBinding = null;
                    }
                    if(!!this._valBinding) {
                        this._valBinding.destroy();
                        this._valBinding = null;
                    }
                    if(!!this._selectView && this._isListBoxCachedExternally) {
                        this._selectView = null;
                    }
                };
                LookupContent.prototype._updateBindingSource = function () {
                    if(!!this._valBinding) {
                        this._valBinding.source = this._dctx;
                    }
                    if(!!this._listBinding) {
                        this._listBinding.source = this._dctx;
                    }
                };
                LookupContent.prototype._bindToValue = function () {
                    if(!this._options.fieldName) {
                        return null;
                    }
                    var options = {
                        target: this,
                        source: this._dctx,
                        targetPath: 'value',
                        sourcePath: this._options.fieldName,
                        mode: "OneWay",
                        converter: null,
                        converterParam: null,
                        isSourceFixed: false
                    };
                    return new MOD.binding.Binding(options);
                };
                LookupContent.prototype._bindToList = function () {
                    if(!this._options.fieldName) {
                        return null;
                    }
                    var options = {
                        target: this._getSelectView(),
                        source: this._dctx,
                        targetPath: 'selectedValue',
                        sourcePath: this._options.fieldName,
                        mode: "TwoWay",
                        converter: null,
                        converterParam: null,
                        isSourceFixed: false
                    };
                    return new MOD.binding.Binding(options);
                };
                LookupContent.prototype.destroy = function () {
                    if(this._isDestroyed) {
                        return;
                    }
                    this._isDestroyCalled = true;
                    this._cleanUp();
                    if(!!this._selectView && !this._isListBoxCachedExternally) {
                        this._selectView.destroy();
                    }
                    this._selectView = null;
                    if(!!this._spanView) {
                        this._spanView.destroy();
                    }
                    this._spanView = null;
                    _super.prototype.destroy.call(this);
                };
                LookupContent.prototype.toString = function () {
                    return 'LookupContent';
                };
                Object.defineProperty(LookupContent.prototype, "value", {
                    get: function () {
                        return this._value;
                    },
                    set: function (v) {
                        if(this._value !== v) {
                            this._value = v;
                            this._updateTextValue();
                            this.raisePropertyChanged('value');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return LookupContent;
            })(MOD.baseContent.BindingContent);
            listbox.LookupContent = LookupContent;            
            var ContentFactory = (function () {
                function ContentFactory(app, nextFactory) {
                    this._app = app;
                    this._nextFactory = nextFactory;
                }
                ContentFactory.prototype.getContentType = function (options) {
                    if(options.name == 'lookup') {
                        return LookupContent;
                    }
                    if(!!this._nextFactory) {
                        return this._nextFactory.getContentType(options);
                    } else {
                        throw new Error(RIAPP.ERRS.ERR_BINDING_CONTENT_NOT_FOUND);
                    }
                };
                ContentFactory.prototype.createContent = function (parentEl, options, dctx, isEditing) {
                    var contentType = this.getContentType(options);
                    return new contentType(this._app, parentEl, options, dctx, isEditing);
                };
                ContentFactory.prototype.isExternallyCachable = function (contentType) {
                    return this._nextFactory.isExternallyCachable(contentType);
                };
                Object.defineProperty(ContentFactory.prototype, "app", {
                    get: function () {
                        return this._app;
                    },
                    enumerable: true,
                    configurable: true
                });
                return ContentFactory;
            })();
            listbox.ContentFactory = ContentFactory;            
            function initModule(app) {
                app.registerContentFactory(function (nextFactory) {
                    return new ContentFactory(app, nextFactory);
                });
                return listbox;
            }
            listbox.initModule = initModule;
            ;
            RIAPP.global.registerElView('select', SelectElView);
            RIAPP.global.onModuleLoaded('listbox', listbox);
        })(MOD.listbox || (MOD.listbox = {}));
        var listbox = MOD.listbox;
    })(RIAPP.MOD || (RIAPP.MOD = {}));
    var MOD = RIAPP.MOD;
})(RIAPP || (RIAPP = {}));
//@ sourceMappingURL=listbox.js.map

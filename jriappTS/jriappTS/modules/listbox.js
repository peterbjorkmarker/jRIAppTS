var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RIAPP;
(function (RIAPP) {
    (function (MOD) {
        (function (listbox) {
            var collMod = RIAPP.MOD.collection;
            var utils, parser;
            RIAPP.global.addOnInitialize(function (s, args) {
                utils = s.utils;
                parser = s.parser;
            });

            var ListBox = (function (_super) {
                __extends(ListBox, _super);
                function ListBox(el, dataSource, options) {
                    _super.call(this);
                    var self = this;
                    this._el = el;
                    this._$el = RIAPP.global.$(this._el);
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
                ListBox.prototype.destroy = function () {
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
                    _super.prototype.destroy.call(this);
                };
                ListBox.prototype._onChanged = function () {
                    var op = null, key, data;
                    if (this._el.selectedIndex >= 0) {
                        op = this._el.options[this._el.selectedIndex];
                        key = op.value;
                        data = this._keyMap[key];
                    }

                    if (!data && !!this._selectedItem) {
                        this.selectedItem = null;
                    } else if (data.item !== this._selectedItem) {
                        this.selectedItem = data.item;
                    }
                };
                ListBox.prototype._getStringValue = function (item) {
                    var v = this._getValue(item);
                    if (utils.check.isNt(v))
                        return '';
                    return '' + v;
                };
                ListBox.prototype._getValue = function (item) {
                    if (!item)
                        return null;
                    if (!!this._valuePath) {
                        return parser.resolvePath(item, this._valuePath);
                    } else
                        return undefined;
                };
                ListBox.prototype._getText = function (item) {
                    if (!item)
                        return '';
                    if (!!this._textPath) {
                        var t = RIAPP.global.parser.resolvePath(item, this._textPath);
                        if (utils.check.isNt(t))
                            return '';
                        return '' + t;
                    } else
                        return this._getStringValue(item);
                };
                ListBox.prototype._onDSCollectionChanged = function (args) {
                    var self = this, data;
                    switch (args.change_type) {
                        case 2 /* RESET */:
                            if (!this._isDSFilling)
                                this._refresh();
                            break;
                        case 1 /* ADDED */:
                            if (!this._isDSFilling) {
                                args.items.forEach(function (item) {
                                    self._addOption(item, item._isNew);
                                });
                            }
                            break;
                        case 0 /* REMOVE */:
                            args.items.forEach(function (item) {
                                self._removeOption(item);
                            });
                            break;
                        case 3 /* REMAP_KEY */: {
                            data = self._keyMap[args.old_key];
                            if (!!data) {
                                delete self._keyMap[args.old_key];
                                self._keyMap[args.new_key] = data;
                                data.op.value = args.new_key;
                            }
                        }
                    }
                };
                ListBox.prototype._onDSFill = function (args) {
                    var isEnd = !args.isBegin;
                    if (isEnd) {
                        this._isDSFilling = false;
                        this._refresh();
                    } else {
                        this._isDSFilling = true;
                    }
                };
                ListBox.prototype._onEdit = function (item, isBegin, isCanceled) {
                    var self = this, key, data, oldVal, val;
                    if (isBegin) {
                        this._savedValue = this._getStringValue(item);
                    } else {
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
                            } else {
                                if (!!oldVal) {
                                    delete self._valMap[oldVal];
                                }
                            }
                        }
                    }
                };
                ListBox.prototype._onStatusChanged = function (item, oldChangeType) {
                    var newChangeType = item._changeType;
                    if (newChangeType === 3 /* DELETED */) {
                        this._removeOption(item);
                    }
                };
                ListBox.prototype._onCommitChanges = function (item, isBegin, isRejected, changeType) {
                    var self = this, oldVal, val, data;
                    if (isBegin) {
                        if (isRejected && changeType === 1 /* ADDED */) {
                            return;
                        } else if (!isRejected && changeType === 3 /* DELETED */) {
                            return;
                        }

                        this._savedValue = this._getStringValue(item);
                    } else {
                        oldVal = this._savedValue;
                        this._savedValue = undefined;

                        if (isRejected && changeType === 3 /* DELETED */) {
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
                };
                ListBox.prototype._bindDS = function () {
                    var self = this, ds = this._dataSource;
                    if (!ds)
                        return;
                    ds.addOnCollChanged(function (sender, args) {
                        if (ds !== sender)
                            return;
                        self._onDSCollectionChanged(args);
                    }, self._objId);
                    ds.addOnFill(function (sender, args) {
                        if (ds !== sender)
                            return;
                        self._onDSFill(args);
                    }, self._objId);
                    ds.addOnBeginEdit(function (sender, args) {
                        if (ds !== sender)
                            return;
                        self._onEdit(args.item, true, undefined);
                    }, self._objId);
                    ds.addOnEndEdit(function (sender, args) {
                        if (ds !== sender)
                            return;
                        self._onEdit(args.item, false, args.isCanceled);
                    }, self._objId);
                    ds.addOnStatusChanged(function (sender, args) {
                        if (ds !== sender)
                            return;
                        self._onStatusChanged(args.item, args.oldChangeType);
                    }, self._objId);
                    ds.addOnCommitChanges(function (sender, args) {
                        if (ds !== sender)
                            return;
                        self._onCommitChanges(args.item, args.isBegin, args.isRejected, args.changeType);
                    }, self._objId);
                };
                ListBox.prototype._unbindDS = function () {
                    var self = this, ds = this._dataSource;
                    if (!ds)
                        return;
                    ds.removeNSHandlers(self._objId);
                };
                ListBox.prototype._addOption = function (item, first) {
                    if (this._isDestroyCalled)
                        return null;
                    var oOption, key = '', val, text;
                    if (!!item) {
                        key = item._key;
                    }
                    if (!!this._keyMap[key]) {
                        return null;
                    }
                    text = this._getText(item);
                    val = this._getStringValue(item);
                    oOption = RIAPP.global.document.createElement("option");
                    oOption.text = text;
                    oOption.value = key;
                    var data = { item: item, op: oOption };
                    this._keyMap[key] = data;
                    if (!!val)
                        this._valMap[val] = data;
                    if (!!first) {
                        if (this._el.options.length < 2)
                            this._el.add(oOption, null);
                        else
                            this._el.add(oOption, this._el.options[1]);
                    } else
                        this._el.add(oOption, null);
                    return oOption;
                };
                ListBox.prototype._mapByValue = function () {
                    var self = this;
                    this._valMap = {};
                    utils.forEachProp(this._keyMap, function (key) {
                        var data = self._keyMap[key], val = self._getStringValue(data.item);
                        if (!!val)
                            self._valMap[val] = data;
                    });
                };
                ListBox.prototype._resetText = function () {
                    var self = this;
                    utils.forEachProp(this._keyMap, function (key) {
                        var data = self._keyMap[key];
                        data.op.text = self._getText(data.item);
                    });
                };
                ListBox.prototype._removeOption = function (item) {
                    if (this._isDestroyCalled)
                        return;
                    var key = '', data, val;
                    if (!!item) {
                        key = item._key;
                        data = this._keyMap[key];
                        if (!data) {
                            return;
                        }
                        this._el.remove(data.op.index);
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
                };
                ListBox.prototype._clear = function (isDestroy) {
                    this._el.options.length = 0;
                    this._keyMap = {};
                    this._valMap = {};
                    this._prevSelected = null;
                    if (!isDestroy) {
                        this._addOption(null, false);
                        this.selectedItem = null;
                    } else
                        this.selectedItem = null;
                };
                ListBox.prototype._refresh = function () {
                    var self = this, ds = this._dataSource, oldItem = this._selectedItem, tmp = self._tempValue;
                    this._isRefreshing = true;
                    try  {
                        this.clear();
                        if (!!ds) {
                            ds.forEach(function (item) {
                                self._addOption(item, false);
                            });

                            if (tmp === undefined) {
                                self._el.selectedIndex = self._findItemIndex(oldItem);
                            } else {
                                oldItem = self.findItemByValue(tmp);
                                self.selectedItem = oldItem;
                                self._tempValue = undefined;
                            }
                        }
                    } finally {
                        self._isRefreshing = false;
                    }
                    self._onChanged();
                };
                ListBox.prototype._findItemIndex = function (item) {
                    if (!item)
                        return 0;
                    var data = this._keyMap[item._key];
                    if (!data)
                        return 0;
                    return data.op.index;
                };
                ListBox.prototype._setIsEnabled = function (el, v) {
                    el.disabled = !v;
                };
                ListBox.prototype._getIsEnabled = function (el) {
                    return !el.disabled;
                };
                ListBox.prototype.clear = function () {
                    this._clear(false);
                };
                ListBox.prototype.findItemByValue = function (val) {
                    if (utils.check.isNt(val))
                        return null;
                    val = '' + val;
                    var data = this._valMap[val];
                    if (!data)
                        return null;
                    return data.item;
                };
                ListBox.prototype.getTextByValue = function (val) {
                    if (utils.check.isNt(val))
                        return '';
                    val = '' + val;
                    var data = this._valMap[val];
                    if (!data)
                        return '';
                    else
                        return data.op.text;
                };
                ListBox.prototype.toString = function () {
                    return 'ListBox';
                };
                Object.defineProperty(ListBox.prototype, "dataSource", {
                    get: function () {
                        return this._dataSource;
                    },
                    set: function (v) {
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
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListBox.prototype, "selectedValue", {
                    get: function () {
                        if (!!this._dataSource)
                            return this._getValue(this.selectedItem);
                        else
                            return undefined;
                    },
                    set: function (v) {
                        var self = this;
                        if (!!this._dataSource) {
                            if (this.selectedValue !== v) {
                                var item = self.findItemByValue(v);
                                self.selectedItem = item;
                                self._tempValue = undefined;
                            }
                        } else {
                            if (this._tempValue !== v) {
                                this._selectedItem = null;
                                this._tempValue = v;
                                this.raisePropertyChanged('selectedItem');
                                this.raisePropertyChanged('selectedValue');
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListBox.prototype, "selectedItem", {
                    get: function () {
                        if (!!this._dataSource)
                            return this._selectedItem;
                        else
                            return undefined;
                    },
                    set: function (v) {
                        if (this._selectedItem !== v) {
                            if (!!this._selectedItem) {
                                this._prevSelected = this._selectedItem;
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
                        if (v !== this._valuePath) {
                            this._valuePath = v;
                            this._mapByValue();
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
                        if (v !== this._textPath) {
                            this._textPath = v;
                            this._resetText();
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
                        if (v !== this.isEnabled) {
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
                    _super.call(this, app, el, options);
                }
                SelectElView.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._listBox && !this._listBox._isDestroyCalled) {
                        this._listBox.destroy();
                    }
                    this._listBox = null;
                    _super.prototype.destroy.call(this);
                };
                SelectElView.prototype.toString = function () {
                    return 'SelectElView';
                };
                Object.defineProperty(SelectElView.prototype, "isEnabled", {
                    get: function () {
                        if (this._isDestroyCalled)
                            return false;
                        return !this.el.disabled;
                    },
                    set: function (v) {
                        v = !!v;
                        if (v !== this.isEnabled) {
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
                        if (this._isDestroyCalled)
                            return undefined;
                        return this._listBox.dataSource;
                    },
                    set: function (v) {
                        var self = this;
                        if (self.dataSource !== v) {
                            self._listBox.dataSource = v;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SelectElView.prototype, "selectedValue", {
                    get: function () {
                        if (this._isDestroyCalled)
                            return undefined;
                        return this._listBox.selectedValue;
                    },
                    set: function (v) {
                        if (this._isDestroyCalled)
                            return;
                        if (this._listBox.selectedValue !== v) {
                            this._listBox.selectedValue = v;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SelectElView.prototype, "selectedItem", {
                    get: function () {
                        if (this._isDestroyCalled)
                            return undefined;
                        return this._listBox.selectedItem;
                    },
                    set: function (v) {
                        if (this._isDestroyCalled)
                            return;
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
            })(RIAPP.MOD.baseElView.BaseElView);
            listbox.SelectElView = SelectElView;

            var LookupContent = (function (_super) {
                __extends(LookupContent, _super);
                function LookupContent(app, parentEl, options, dctx, isEditing) {
                    if (options.name != 'lookup') {
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
                    if (!!this._options.initContentFn) {
                        this._options.initContentFn(this);
                    }
                };
                LookupContent.prototype._getEventNames = function () {
                    var base_events = _super.prototype._getEventNames.call(this);
                    return ['object_created', 'object_needed'].concat(base_events);
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
                    if (!!this._selectView)
                        return this._selectView;
                    var lookUpOptions = this._options.options;
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
                    var dataSource = RIAPP.global.parser.resolvePath(this.app, lookUpOptions.dataSource), options = { valuePath: lookUpOptions.valuePath, textPath: lookUpOptions.textPath };
                    var el = RIAPP.global.document.createElement('select');
                    el.setAttribute('size', '1');
                    var selectElView = this._createSelectElView(el, options);
                    selectElView.dataSource = dataSource;
                    var args2 = { objectKey: 'selectElView', object: selectElView, isCachedExternally: false };

                    //this allows to cache listBox externally
                    this.raiseEvent('object_created', args2);
                    this._isListBoxCachedExternally = args2.isCachedExternally;
                    this._selectView = selectElView;
                    return this._selectView;
                };
                LookupContent.prototype._createSelectElView = function (el, options) {
                    var elView;
                    elView = this.app._getElView(el);
                    if (!!elView)
                        return elView;
                    elView = new SelectElView(this.app, el, options);
                    return elView;
                };
                LookupContent.prototype._updateTextValue = function () {
                    var spanView = this._getSpanView();
                    spanView.value = this._getLookupText();
                };
                LookupContent.prototype._getLookupText = function () {
                    var listBoxView = this._getSelectView();
                    return listBoxView.listBox.getTextByValue(this.value);
                };
                LookupContent.prototype._getSpanView = function () {
                    if (!!this._spanView) {
                        return this._spanView;
                    }
                    var el = RIAPP.global.document.createElement('span'), displayInfo = this._getDisplayInfo();
                    var spanView = new RIAPP.MOD.baseElView.SpanElView(this.app, el, {});
                    if (!!displayInfo) {
                        if (!!displayInfo.displayCss) {
                            spanView.$el.addClass(displayInfo.displayCss);
                        }
                    }
                    this._spanView = spanView;
                    return this._spanView;
                };
                LookupContent.prototype.update = function () {
                    this._cleanUp();
                    this._createTargetElement();
                    this._parentEl.appendChild(this._el);
                };
                LookupContent.prototype._createTargetElement = function () {
                    var tgt, el, selectView, spanView;
                    if (this._isEditing && this._canBeEdited()) {
                        selectView = this._getSelectView();
                        this._listBinding = this._bindToList(selectView);
                        tgt = selectView;
                    } else {
                        spanView = this._getSpanView();
                        this._valBinding = this._bindToValue();
                        tgt = spanView;
                    }
                    this._el = tgt.el;
                    this._updateCss();
                    return tgt;
                };
                LookupContent.prototype._cleanUp = function () {
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
                };
                LookupContent.prototype._updateBindingSource = function () {
                    if (!!this._valBinding) {
                        this._valBinding.source = this._dctx;
                    }
                    if (!!this._listBinding) {
                        this._listBinding.source = this._dctx;
                    }
                };
                LookupContent.prototype._bindToValue = function () {
                    if (!this._options.fieldName)
                        return null;

                    var options = {
                        target: this, source: this._dctx,
                        targetPath: 'value', sourcePath: this._options.fieldName, mode: 1 /* OneWay */,
                        converter: null, converterParam: null, isSourceFixed: false
                    };
                    return new RIAPP.MOD.binding.Binding(options);
                };
                LookupContent.prototype._bindToList = function (selectView) {
                    if (!this._options.fieldName)
                        return null;

                    var options = {
                        target: selectView, source: this._dctx,
                        targetPath: 'selectedValue', sourcePath: this._options.fieldName, mode: 2 /* TwoWay */,
                        converter: null, converterParam: null, isSourceFixed: false
                    };
                    return new RIAPP.MOD.binding.Binding(options);
                };
                LookupContent.prototype.destroy = function () {
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
                        if (this._value !== v) {
                            this._value = v;
                            this._updateTextValue();
                            this.raisePropertyChanged('value');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return LookupContent;
            })(RIAPP.MOD.baseContent.BindingContent);
            listbox.LookupContent = LookupContent;

            var ContentFactory = (function () {
                function ContentFactory(app, nextFactory) {
                    this._app = app;
                    this._nextFactory = nextFactory;
                }
                ContentFactory.prototype.getContentType = function (options) {
                    if (options.name == 'lookup') {
                        return LookupContent;
                    }
                    if (!!this._nextFactory)
                        return this._nextFactory.getContentType(options);
                    else
                        throw new Error(RIAPP.ERRS.ERR_BINDING_CONTENT_NOT_FOUND);
                };

                ContentFactory.prototype.createContent = function (parentEl, options, dctx, isEditing) {
                    var contentType = this.getContentType(options);
                    return new contentType(this._app, parentEl, options, dctx, isEditing);
                };

                ContentFactory.prototype.isExternallyCachable = function (contentType) {
                    if (LookupContent === contentType)
                        return true;
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
//# sourceMappingURL=listbox.js.map

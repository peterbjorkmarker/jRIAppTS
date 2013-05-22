var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="..\jriapp.ts"/>
/// <reference path="..\modules\db.ts"/>
/// <reference path="..\modules\template.ts"/>
/// <reference path="..\modules\datagrid.ts"/>
var RIAPP;
(function (RIAPP) {
    (function (AUTOCOMPLETE) {
        var global = RIAPP.global, utils = global.utils;
        function addTextQuery(query, fldName, val) {
            var tmp;
            if (!!val) {
                if (utils.str.startsWith(val, '%') && utils.str.endsWith(val, '%')) {
                    tmp = utils.str.trim(val, '% ');
                    query.where(fldName, 'contains', [
                        tmp
                    ]);
                } else if (utils.str.startsWith(val, '%')) {
                    tmp = utils.str.trim(val, '% ');
                    query.where(fldName, 'endswith', [
                        tmp
                    ]);
                } else if (utils.str.endsWith(val, '%')) {
                    tmp = utils.str.trim(val, '% ');
                    query.where(fldName, 'startswith', [
                        tmp
                    ]);
                } else {
                    tmp = utils.str.trim(val);
                    query.where(fldName, '=', [
                        tmp
                    ]);
                }
            }
            return query;
        }
        ;
        var AutoCompleteElView = (function (_super) {
            __extends(AutoCompleteElView, _super);
            function AutoCompleteElView() {
                _super.apply(this, arguments);

            }
            AutoCompleteElView.prototype._init = function (options) {
                var self = this;
                //debugger;
                _super.prototype._init.call(this, options);
                this._templateId = options.templateId;
                this._fieldName = options.fieldName;
                this._dbSetName = options.dbSetName;
                this._queryName = options.queryName;
                this._dbContext = this.app.getObject(options.dbContext);
                this._template = null;
                this._dbSet = null;
                this._prevText = null;
                this._selectedItem = null;
                this._template = null;
                this._$dropDown = null;
                this._loadTimeout = null;
                this._dataContext = null;
                this._isLoading = false;
                this._width = options.width || '200px';
                this._height = options.height || '300px';
                this._$dlg = null;
                var $el = this.$el;
                $el.on('change.' + this._objId, function (e) {
                    e.stopPropagation();
                    self.raisePropertyChanged('value');
                });
                $el.on('keyup.' + this._objId, function (e) {
                    e.stopPropagation();
                    self._onTextChange((e.target).value);
                });
                $el.on('keypress.' + this._objId, function (e) {
                    e.stopPropagation();
                    self._onKeyPress(e.which);
                });
                this._isOpen = false;
                this._createDbSet();
                this._template = this._createTemplate();
                this._$dropDown = global.$(global.document.createElement("div"));
                this._$dropDown.css({
                    "position": "absolute",
                    "z-index": "10000",
                    "visibility": "hidden",
                    "background-color": "White",
                    "border": "1px solid gray",
                    "width": this._width,
                    "height": this._height
                });
                this._$dropDown.append(this._template.el);
                this._template.el.style.height = '100%';
                this._template.el.style.width = '100%';
                this._lookupGrid = null;
                var gridElView = this._findElemViewInTemplate('lookupGrid');
                if (!!gridElView) {
                    this._lookupGrid = gridElView.grid;
                }
                this._btnOk = this._findElemInTemplate('btnOk');
                this._btnCancel = this._findElemInTemplate('btnCancel');
                global.$(this._btnOk).click(function () {
                    self._updateSelection();
                    self._hide();
                });
                global.$(this._btnCancel).click(function () {
                    self._hide();
                });
                global.document.body.appendChild(this._$dropDown.get(0));
            };
            AutoCompleteElView.prototype._findElemViewInTemplate = function (name) {
                //look by data-name attribute value
                var arr = this._template.findElViewsByDataName(name);
                if (!!arr && arr.length > 0) {
                    return arr[0];
                } else {
                    return null;
                }
            };
            AutoCompleteElView.prototype._findElemInTemplate = function (name) {
                var arr = this._template.findElByDataName(name);
                if (!!arr && arr.length > 0) {
                    return arr[0];
                } else {
                    return null;
                }
            };
            AutoCompleteElView.prototype._createDbSet = function () {
                this._dbSet = this.dbContext.dbSets[this._dbSetName];
                if (!this._dbSet) {
                    throw new Error(utils.format('dbContext does not contain dbSet with the name: {0}', this._dbSetName));
                }
            };
            AutoCompleteElView.prototype._getEventNames = function () {
                var base_events = _super.prototype._getEventNames.call(this);
                return [
                    'hide', 
                    'show'
                ].concat(base_events);
            };
            AutoCompleteElView.prototype._createTemplate = function () {
                var t = new RIAPP.MOD.template.Template(this.app, this._templateId);
                t.dataContext = this;
                return t;
            };
            AutoCompleteElView.prototype._onTextChange = function (text) {
                var self = this;
                clearTimeout(this._loadTimeout);
                if (!!text && text.length > 1) {
                    this._loadTimeout = setTimeout(function () {
                        if (self._isDestroyCalled) {
                            return;
                        }
                        if (self._prevText != text) {
                            self._prevText = text;
                            if (!self._isOpen) {
                                self._open();
                            }
                            self.load(text);
                        }
                    }, 500);
                }
            };
            AutoCompleteElView.prototype._onKeyPress = function (keyCode) {
                if (keyCode === global.consts.KEYS.esc) {
                    this._hide();
                    return;
                }
                if (keyCode === global.consts.KEYS.enter) {
                    this._updateSelection();
                    this._hide();
                    return;
                }
            };
            AutoCompleteElView.prototype._updateSelection = function () {
                this.value = this.currentSelection;
            };
            AutoCompleteElView.prototype._updatePosition = function () {
                this._$dropDown.position({
                    my: "left top",
                    at: "left bottom",
                    of: global.$(this.el),
                    offset: "0 0"
                });
            };
            AutoCompleteElView.prototype._onShow = function () {
                this.raiseEvent('show', {});
            };
            AutoCompleteElView.prototype._onHide = function () {
                this.raiseEvent('hide', {});
            };
            AutoCompleteElView.prototype._open = function () {
                if (this._isOpen) {
                    return;
                }
                var self = this;
                this._$dlg = this.$el.closest(".ui-dialog");
                this._$dlg.on("dialogdrag." + this._objId, function (event, ui) {
                    if (!self._isOpen) {
                        return;
                    }
                    self._updatePosition();
                });
                this._updatePosition();
                this._$dropDown.css({
                    visibility: "visible",
                    display: "none"
                });
                this._$dropDown.slideDown('medium');
                if (!!this._lookupGrid) {
                    this._lookupGrid.addHandler('cell_dblclicked', function (s, a) {
                        self._updateSelection();
                        self._hide();
                    }, this._objId);
                    global.$(global.document).on('keyup.' + this._objId, function (e) {
                        e.stopPropagation();
                        if (global.currentSelectable === self._lookupGrid) {
                            self._onKeyPress(e.which);
                        }
                    });
                }
                this._isOpen = true;
                this._onShow();
            };
            AutoCompleteElView.prototype._hide = function () {
                var self = this;
                if (!this._isOpen) {
                    return;
                }
                global.$(global.document).off('.' + this._objId);
                this._$dlg.off('.' + this._objId);
                if (!!this._lookupGrid) {
                    this._lookupGrid.removeNSHandlers(this._objId);
                }
                this._$dropDown.slideUp('medium', function () {
                    if (self._isDestroyCalled) {
                        return;
                    }
                    self._$dropDown.css({
                        visibility: "hidden",
                        display: ""
                    });
                });
                this._isOpen = false;
                this._onHide();
            };
            AutoCompleteElView.prototype.load = function (str) {
                var self = this, query = this.dbSet.createQuery(this._queryName);
                query.pageSize = 50;
                query.isClearPrevData = true;
                addTextQuery(query, this._fieldName, str + '%');
                query.orderBy(this._fieldName, 'ASC');
                this._isLoading = true;
                this.raisePropertyChanged('isLoading');
                this.dbContext.load(query).always(function () {
                    self._isLoading = false;
                    self.raisePropertyChanged('isLoading');
                });
            };
            AutoCompleteElView.prototype.destroy = function () {
                if (this._isDestroyed) {
                    return;
                }
                this._isDestroyCalled = true;
                this._hide();
                this.$el.off('.' + this._objId);
                if (!!this._lookupGrid) {
                    this._lookupGrid = null;
                }
                if (!!this._template) {
                    this._template.destroy();
                    this._template = null;
                    this._$dropDown = null;
                }
                this._dbSet = null;
                this._dataContext = null;
                _super.prototype.destroy.call(this);
            };
            Object.defineProperty(AutoCompleteElView.prototype, "dbContext", {
                get: function () {
                    return this._dbContext;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AutoCompleteElView.prototype, "fieldName", {
                get: //field name for lookup in dbSet
                function () {
                    return this._fieldName;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AutoCompleteElView.prototype, "templateId", {
                get: function () {
                    return this._templateId;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AutoCompleteElView.prototype, "currentSelection", {
                get: function () {
                    if (this._dbSet.currentItem) {
                        return this._dbSet.currentItem[this._fieldName];
                    } else {
                        return null;
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AutoCompleteElView.prototype, "template", {
                get: //template instance of drop down area (which contains datagrid) under textbox
                function () {
                    return this._template;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AutoCompleteElView.prototype, "dataContext", {
                get: //Entity which is databound to the textbox
                function () {
                    return this._dataContext;
                },
                set: function (v) {
                    if (this._dataContext !== v) {
                        this._dataContext = v;
                        this.raisePropertyChanged('dataContext');
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AutoCompleteElView.prototype, "dbSet", {
                get: //dbSet for a datagrid's dataSource (for lookup values)
                function () {
                    return this._dbSet;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AutoCompleteElView.prototype, "value", {
                get: function () {
                    var el = this.el;
                    if (!el) {
                        return '';
                    }
                    return el.value;
                },
                set: function (v) {
                    if (!this._el) {
                        return;
                    }
                    var el = this.el;
                    var x = el.value;
                    var str = '' + v;
                    v = (v === null) ? '' : str;
                    if (x !== v) {
                        el.value = v;
                        this._prevText = v;
                        this.raisePropertyChanged('value');
                    }
                },
                enumerable: true,
                configurable: true
            });
            return AutoCompleteElView;
        })(RIAPP.MOD.baseElView.InputElView);
        AUTOCOMPLETE.AutoCompleteElView = AutoCompleteElView;        
        //this function is executed when an application which uses this module is created
        function initModule(app) {
            app.registerElView('autocomplete', AutoCompleteElView);
            return AUTOCOMPLETE;
        }
        AUTOCOMPLETE.initModule = initModule;
        ;
    })(RIAPP.AUTOCOMPLETE || (RIAPP.AUTOCOMPLETE = {}));
    var AUTOCOMPLETE = RIAPP.AUTOCOMPLETE;
})(RIAPP || (RIAPP = {}));
//@ sourceMappingURL=autocomplete.js.map

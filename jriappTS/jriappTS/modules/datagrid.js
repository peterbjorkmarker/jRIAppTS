var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RIAPP;
(function (RIAPP) {
    (function (MOD) {
        (function (datagrid) {
            var constsMOD = RIAPP.MOD.consts;
            var utilsMOD = RIAPP.MOD.utils;
            var bindMOD = RIAPP.MOD.binding;
            var contentMOD = RIAPP.MOD.baseContent;
            var collMOD = RIAPP.MOD.collection;

            var COLUMN_TYPE = { DATA: 'data', ROW_EXPANDER: 'row_expander', ROW_ACTIONS: 'row_actions', ROW_SELECTOR: 'row_selector' };
            var utils;
            RIAPP.global.addOnInitialize(function (s, args) {
                utils = s.utils;
            });

            datagrid.css = {
                container: 'ria-table-container',
                dataTable: 'ria-data-table',
                columnInfo: 'ria-col-info',
                column: 'ria-ex-column',
                cellDiv: 'cell-div',
                headerDiv: 'ria-table-header',
                wrapDiv: 'ria-table-wrap',
                dataColumn: 'data-column',
                rowCollapsed: 'row-collapsed',
                rowExpanded: 'row-expanded',
                rowExpander: 'row-expander',
                columnSelected: 'selected',
                rowSelected: 'selected',
                rowActions: 'row-actions',
                rowDetails: 'row-details',
                rowSelector: 'row-selector',
                rowHighlight: 'row-highlight',
                rowDeleted: 'row-deleted',
                rowError: 'row-error',
                nobr: 'ria-nobr',
                colSortable: 'sortable',
                colSortAsc: 'sort-asc',
                colSortDesc: 'sort-desc'
            };

            var RowSelectContent = (function (_super) {
                __extends(RowSelectContent, _super);
                function RowSelectContent() {
                    _super.apply(this, arguments);
                }
                RowSelectContent.prototype._canBeEdited = function () {
                    return true;
                };
                RowSelectContent.prototype.toString = function () {
                    return 'RowSelectContent';
                };
                return RowSelectContent;
            })(contentMOD.BoolContent);
            datagrid.RowSelectContent = RowSelectContent;

            var BaseCell = (function (_super) {
                __extends(BaseCell, _super);
                function BaseCell(row, options) {
                    _super.call(this);
                    this._row = row;
                    this._el = options.td;
                    this._column = options.column;
                    this._div = RIAPP.global.document.createElement("div");
                    var $div = RIAPP.global.$(this._div);
                    this._clickTimeOut = null;
                    $div.addClass(datagrid.css.cellDiv).attr(constsMOD.DATA_ATTR.DATA_EVENT_SCOPE, this._column.uniqueID);
                    $div.data('cell', this);
                    if (this._column.options.width) {
                        this._el.style.width = this._column.options.width;
                    }
                    this._init();
                    if (this.column.options.rowCellCss) {
                        $div.addClass(this.column.options.rowCellCss);
                    }
                    this._el.appendChild(this._div);
                    this._row.el.appendChild(this._el);
                }
                BaseCell.prototype._init = function () {
                };
                BaseCell.prototype._onCellClicked = function () {
                    this.grid.currentRow = this._row;
                };
                BaseCell.prototype._onDblClicked = function () {
                    this.grid.currentRow = this._row;
                    this.grid._onCellDblClicked(this);
                };
                BaseCell.prototype._onError = function (error, source) {
                    var isHandled = _super.prototype._onError.call(this, error, source);
                    if (!isHandled) {
                        return this.row._onError(error, source);
                    }
                    return isHandled;
                };
                BaseCell.prototype.scrollIntoView = function (isUp) {
                    var div = this._div;
                    div.scrollIntoView(!!isUp);
                };
                BaseCell.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._clickTimeOut) {
                        clearTimeout(this._clickTimeOut);
                        this._clickTimeOut = null;
                    }
                    var $div = RIAPP.global.$(this._div);
                    $div.removeData();
                    $div.remove();
                    this._div = null;
                    this._row = null;
                    this._el = null;
                    this._column = null;
                    _super.prototype.destroy.call(this);
                };
                BaseCell.prototype.toString = function () {
                    return 'BaseCell';
                };
                Object.defineProperty(BaseCell.prototype, "el", {
                    get: function () {
                        return this._el;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseCell.prototype, "row", {
                    get: function () {
                        return this._row;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseCell.prototype, "column", {
                    get: function () {
                        return this._column;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseCell.prototype, "grid", {
                    get: function () {
                        return this._row.grid;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseCell.prototype, "item", {
                    get: function () {
                        return this._row.item;
                    },
                    enumerable: true,
                    configurable: true
                });
                return BaseCell;
            })(RIAPP.BaseObject);
            datagrid.BaseCell = BaseCell;

            var DataCell = (function (_super) {
                __extends(DataCell, _super);
                function DataCell(row, options) {
                    this._content = null;
                    this._stateCss = null;
                    _super.call(this, row, options);
                }
                DataCell.prototype._init = function () {
                    var options = this.column.options.content;
                    if (!options.fieldInfo && !!options.fieldName) {
                        options.fieldInfo = this.item.getFieldInfo(options.fieldName);
                        if (!options.fieldInfo) {
                            throw new Error(utils.format(RIAPP.ERRS.ERR_DBSET_INVALID_FIELDNAME, '', options.fieldName));
                        }
                    }
                    var app = this.grid.app;
                    options.initContentFn = null;
                    try  {
                        var contentType = app._getContentType(options);
                        if (app.contentFactory.isExternallyCachable(contentType)) {
                            options.initContentFn = this._getInitContentFn();
                        }
                        this._content = app._getContent(contentType, options, this._div, this.item, this.item.isEditing);
                    } finally {
                        delete options.initContentFn;
                    }
                };
                DataCell.prototype._getInitContentFn = function () {
                    var self = this;
                    return function (content) {
                        content.addOnObjectCreated(function (sender, args) {
                            self.column._cacheObject(args.objectKey, args.object);
                            args.isCachedExternally = !!self.column._getCachedObject(args.objectKey);
                        });
                        content.addOnObjectNeeded(function (sender, args) {
                            args.object = self.column._getCachedObject(args.objectKey);
                        });
                    };
                };
                DataCell.prototype._beginEdit = function () {
                    if (!this._content.isEditing) {
                        this._content.isEditing = true;
                    }
                };
                DataCell.prototype._endEdit = function (isCanceled) {
                    if (this._content.isEditing) {
                        this._content.isEditing = false;
                    }
                };
                DataCell.prototype._setState = function (css) {
                    var $div;
                    if (this._stateCss !== css) {
                        $div = RIAPP.global.$(this._div);
                        if (!!this._stateCss)
                            $div.removeClass(this._stateCss);
                        this._stateCss = css;
                        if (!!this._stateCss)
                            $div.addClass(this._stateCss);
                    }
                };
                DataCell.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._content) {
                        this._content.destroy();
                        this._content = null;
                    }
                    _super.prototype.destroy.call(this);
                };
                DataCell.prototype.toString = function () {
                    return 'DataCell';
                };
                Object.defineProperty(DataCell.prototype, "column", {
                    get: function () {
                        return this._column;
                    },
                    enumerable: true,
                    configurable: true
                });
                return DataCell;
            })(BaseCell);
            datagrid.DataCell = DataCell;

            var ExpanderCell = (function (_super) {
                __extends(ExpanderCell, _super);
                function ExpanderCell() {
                    _super.apply(this, arguments);
                }
                ExpanderCell.prototype._init = function () {
                    var $el = RIAPP.global.$(this.el);
                    $el.addClass(datagrid.css.rowCollapsed);
                    $el.addClass(datagrid.css.rowExpander);
                };
                ExpanderCell.prototype._onCellClicked = function () {
                    if (!this._row)
                        return;
                    _super.prototype._onCellClicked.call(this);
                    this._row.isExpanded = !this._row.isExpanded;
                };
                ExpanderCell.prototype._toggleImage = function () {
                    var $el = RIAPP.global.$(this.el);
                    if (this._row.isExpanded) {
                        $el.removeClass(datagrid.css.rowCollapsed);
                        $el.addClass(datagrid.css.rowExpanded);
                    } else {
                        $el.removeClass(datagrid.css.rowExpanded);
                        $el.addClass(datagrid.css.rowCollapsed);
                    }
                };
                ExpanderCell.prototype.toString = function () {
                    return 'ExpanderCell';
                };
                return ExpanderCell;
            })(BaseCell);
            datagrid.ExpanderCell = ExpanderCell;

            var ActionsCell = (function (_super) {
                __extends(ActionsCell, _super);
                function ActionsCell(row, options) {
                    this._isEditing = false;
                    _super.call(this, row, options);
                }
                ActionsCell.prototype._init = function () {
                    var $el = RIAPP.global.$(this.el), $div = RIAPP.global.$(this._div);
                    $el.addClass([datagrid.css.rowActions, datagrid.css.cellDiv, datagrid.css.nobr].join(' '));
                    $div.on("mouseenter", "img", function (e) {
                        e.stopPropagation();
                        $(this).css("opacity", 0.5);
                    });
                    $div.on("mouseout", "img", function (e) {
                        e.stopPropagation();
                        $(this).css("opacity", 1.0);
                    });
                    this._createButtons(false);
                };
                ActionsCell.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    var $div = RIAPP.global.$(this._div), $imgs = $div.find('img');
                    $imgs.each(function (index, img) {
                        var $img = RIAPP.global.$(img);
                        $img.removeData();
                    });
                    _super.prototype.destroy.call(this);
                };
                ActionsCell.prototype._createButtons = function (editing) {
                    if (!this._el)
                        return;
                    var self = this, $ = RIAPP.global.$, $div = RIAPP.global.$(this._div), $newElems;
                    var txtMap = {
                        img_ok: 'txtOk',
                        img_cancel: 'txtCancel',
                        img_edit: 'txtEdit',
                        img_delete: 'txtDelete'
                    };
                    $div.empty();
                    var opts = self._column.options, fn_setUpImages = function ($images) {
                        $images.each(function (index, img) {
                            var $img = RIAPP.global.$(img);
                            img.style.cursor = 'pointer';
                            img.src = opts[img.name];
                            $img.data('cell', self);
                            utils.addToolTip($img, RIAPP.localizable.TEXT[txtMap[img.name]]);
                            $img.attr(constsMOD.DATA_ATTR.DATA_EVENT_SCOPE, self._column.uniqueID);
                        });
                    };

                    if (editing) {
                        this._isEditing = true;
                        $newElems = RIAPP.global.$('<img name="img_ok" alt="ok"/>&nbsp;<img name="img_cancel" alt="cancel"/>');
                        fn_setUpImages($newElems.filter('img'));
                    } else {
                        this._isEditing = false;
                        $newElems = $('<img name="img_edit" alt="edit"/>&nbsp;<img name="img_delete" alt="delete"/>');
                        if (!self.isCanEdit) {
                            $newElems = $newElems.not('img[name="img_edit"]');
                        }
                        if (!self.isCanDelete) {
                            $newElems = $newElems.not('img[name="img_delete"]');
                        }
                        fn_setUpImages($newElems.filter('img'));
                    }
                    $div.append($newElems);
                };
                ActionsCell.prototype.update = function () {
                    if (!this._row)
                        return;
                    if (this._isEditing != this._row.isEditing) {
                        this._createButtons(this._row.isEditing);
                    }
                };
                ActionsCell.prototype.toString = function () {
                    return 'ActionsCell';
                };
                Object.defineProperty(ActionsCell.prototype, "isCanEdit", {
                    get: function () {
                        return this.grid.isCanEdit;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ActionsCell.prototype, "isCanDelete", {
                    get: function () {
                        return this.grid.isCanDelete;
                    },
                    enumerable: true,
                    configurable: true
                });
                return ActionsCell;
            })(BaseCell);
            datagrid.ActionsCell = ActionsCell;

            var RowSelectorCell = (function (_super) {
                __extends(RowSelectorCell, _super);
                function RowSelectorCell() {
                    _super.apply(this, arguments);
                }
                RowSelectorCell.prototype._init = function () {
                    var $el = RIAPP.global.$(this.el);
                    $el.addClass(datagrid.css.rowSelector);
                    var bindInfo = {
                        target: null, source: null,
                        targetPath: null, sourcePath: 'isSelected',
                        mode: bindMOD.BINDING_MODE[2 /* TwoWay */],
                        converter: null, converterParam: null
                    }, contentOpts = {
                        fieldName: 'isSelected',
                        bindingInfo: bindInfo, displayInfo: null
                    };
                    this._content = new RowSelectContent(this.grid.app, this._div, contentOpts, this.row, true);
                };
                RowSelectorCell.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._content) {
                        this._content.destroy();
                        this._content = null;
                    }
                    _super.prototype.destroy.call(this);
                };
                RowSelectorCell.prototype.toString = function () {
                    return 'RowSelectorCell';
                };
                return RowSelectorCell;
            })(BaseCell);
            datagrid.RowSelectorCell = RowSelectorCell;

            var DetailsCell = (function (_super) {
                __extends(DetailsCell, _super);
                function DetailsCell(row, options) {
                    _super.call(this);
                    this._row = row;
                    this._el = options.td;
                    this._init(options);
                }
                DetailsCell.prototype._init = function (options) {
                    var details_id = options.details_id;
                    if (!details_id)
                        return;
                    this._template = new RIAPP.MOD.template.Template(this.grid.app, details_id);
                    this._el.colSpan = this.grid.columns.length;
                    this._el.appendChild(this._template.el);
                    this._row.el.appendChild(this._el);
                };
                DetailsCell.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._template) {
                        this._template.destroy();
                        this._template = null;
                    }
                    this._row = null;
                    this._el = null;
                    _super.prototype.destroy.call(this);
                };
                DetailsCell.prototype.toString = function () {
                    return 'DetailsCell';
                };
                Object.defineProperty(DetailsCell.prototype, "el", {
                    get: function () {
                        return this._el;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DetailsCell.prototype, "row", {
                    get: function () {
                        return this._row;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DetailsCell.prototype, "grid", {
                    get: function () {
                        return this._row.grid;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DetailsCell.prototype, "item", {
                    get: function () {
                        return this._template.dataContext;
                    },
                    set: function (v) {
                        this._template.dataContext = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DetailsCell.prototype, "template", {
                    get: function () {
                        return this._template;
                    },
                    enumerable: true,
                    configurable: true
                });
                return DetailsCell;
            })(RIAPP.BaseObject);
            datagrid.DetailsCell = DetailsCell;

            var Row = (function (_super) {
                __extends(Row, _super);
                function Row(grid, options) {
                    var self = this;
                    _super.call(this);
                    this._grid = grid;
                    this._el = options.tr;
                    this._item = options.item;
                    this._cells = null;
                    this._objId = this._grid.uniqueID + '_' + this._item._key;
                    this._expanderCell = null;
                    this._actionsCell = null;
                    this._rowSelectorCell = null;
                    this._isCurrent = false;
                    this._isDeleted = false;
                    this._isSelected = false;
                    this._createCells();
                    this.isDeleted = this._item._isDeleted;
                    var fn_state = function () {
                        var css = self._grid._onRowStateChanged(self, self._item[self._grid._options.rowStateField]);
                        self._setState(css);
                    };
                    if (!!this._grid._options.rowStateField) {
                        this._item.addOnPropertyChange(this._grid._options.rowStateField, function (s, a) {
                            fn_state();
                        }, this._objId);
                        fn_state();
                    }
                }
                Row.prototype._onError = function (error, source) {
                    var isHandled = _super.prototype._onError.call(this, error, source);
                    if (!isHandled) {
                        return this.grid._onError(error, source);
                    }
                    return isHandled;
                };
                Row.prototype._createCells = function () {
                    var self = this, i = 0;
                    self._cells = new Array(this.columns.length);
                    this.columns.forEach(function (col) {
                        self._cells[i] = self._createCell(col);
                        i += 1;
                    });
                };
                Row.prototype._createCell = function (col) {
                    var self = this, td = RIAPP.global.document.createElement('td'), cell;
                    if (col instanceof ExpanderColumn) {
                        cell = new ExpanderCell(self, { td: td, column: col });
                        this._expanderCell = cell;
                    } else if (col instanceof ActionsColumn) {
                        cell = new ActionsCell(self, { td: td, column: col });
                        this._actionsCell = cell;
                    } else if (col instanceof RowSelectorColumn) {
                        cell = new RowSelectorCell(self, { td: td, column: col });
                        this._rowSelectorCell = cell;
                    } else
                        cell = new DataCell(self, { td: td, column: col });
                    return cell;
                };
                Row.prototype._onBeginEdit = function () {
                    var self = this;
                    self._cells.forEach(function (cell) {
                        if (cell instanceof DataCell) {
                            cell._beginEdit();
                        }
                    });
                    if (!!this._actionsCell)
                        this._actionsCell.update();
                };
                Row.prototype._onEndEdit = function (isCanceled) {
                    var self = this;
                    self._cells.forEach(function (cell) {
                        if (cell instanceof DataCell) {
                            cell._endEdit(isCanceled);
                        }
                    });
                    if (!!this._actionsCell)
                        this._actionsCell.update();
                };
                Row.prototype.beginEdit = function () {
                    return this._item.beginEdit();
                };
                Row.prototype.endEdit = function () {
                    return this._item.endEdit();
                };
                Row.prototype.cancelEdit = function () {
                    return this._item.cancelEdit();
                };
                Row.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    var grid = this._grid;
                    if (!!grid) {
                        if (this.isExpanded)
                            grid.collapseDetails();
                        this._cells.forEach(function (cell) {
                            cell.destroy();
                        });
                        this._cells = null;
                        if (!grid._isClearing) {
                            grid._removeRow(this);
                            if (!!this._el) {
                                RIAPP.global.$(this._el).remove();
                            }
                        }
                    }
                    if (!!this._item)
                        this._item.removeNSHandlers(this._objId);
                    this._item = null;
                    this._expanderCell = null;
                    this._el = null;
                    this._grid = null;
                    _super.prototype.destroy.call(this);
                };
                Row.prototype.deleteRow = function () {
                    this._item.deleteItem();
                };
                Row.prototype.updateErrorState = function () {
                    //TODO: add implementation to show explanation of error
                    var hasErrors = this._item.getIsHasErrors();
                    var $el = RIAPP.global.$(this._el);
                    if (hasErrors) {
                        $el.addClass(datagrid.css.rowError);
                    } else
                        $el.removeClass(datagrid.css.rowError);
                };
                Row.prototype.scrollIntoView = function (isUp) {
                    if (!!this._cells && this._cells.length > 0) {
                        this._cells[0].scrollIntoView(isUp);
                    }
                };
                Row.prototype._setState = function (css) {
                    this.cells.forEach(function (cell) {
                        if (cell instanceof DataCell) {
                            cell._setState(css);
                        }
                    });
                };
                Row.prototype.toString = function () {
                    return 'Row';
                };
                Object.defineProperty(Row.prototype, "el", {
                    get: function () {
                        return this._el;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Row.prototype, "grid", {
                    get: function () {
                        return this._grid;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Row.prototype, "item", {
                    get: function () {
                        return this._item;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Row.prototype, "cells", {
                    get: function () {
                        return this._cells;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Row.prototype, "columns", {
                    get: function () {
                        return this._grid.columns;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Row.prototype, "uniqueID", {
                    get: function () {
                        return this._objId;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Row.prototype, "itemKey", {
                    get: function () {
                        if (!this._item)
                            return null;
                        return this._item._key;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Row.prototype, "isCurrent", {
                    get: function () {
                        return this._isCurrent;
                    },
                    set: function (v) {
                        var curr = this._isCurrent;
                        if (v !== curr) {
                            var $el = RIAPP.global.$(this._el);
                            this._isCurrent = v;
                            if (v) {
                                $el.addClass(datagrid.css.rowHighlight);
                            } else {
                                $el.removeClass(datagrid.css.rowHighlight);
                            }
                            this.raisePropertyChanged('isCurrent');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Row.prototype, "isSelected", {
                    get: function () {
                        return this._isSelected;
                    },
                    set: function (v) {
                        if (this._isSelected != v) {
                            this._isSelected = v;
                            this.raisePropertyChanged('isSelected');
                            this.grid._onRowSelectionChanged(this);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Row.prototype, "isExpanded", {
                    get: function () {
                        return this.grid._isRowExpanded(this);
                    },
                    set: function (v) {
                        if (v !== this.isExpanded) {
                            if (!v && this.isExpanded) {
                                this.grid._expandDetails(this, false);
                            } else if (v) {
                                this.grid._expandDetails(this, true);
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Row.prototype, "expanderCell", {
                    get: function () {
                        return this._expanderCell;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Row.prototype, "actionsCell", {
                    get: function () {
                        return this._actionsCell;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Row.prototype, "isDeleted", {
                    get: function () {
                        if (!this._el)
                            return true;
                        return this._isDeleted;
                    },
                    set: function (v) {
                        if (!this._el)
                            return;
                        if (this._isDeleted !== v) {
                            this._isDeleted = v;
                            if (this._isDeleted) {
                                this.isExpanded = false;
                                RIAPP.global.$(this._el).addClass(datagrid.css.rowDeleted);
                            } else
                                RIAPP.global.$(this._el).removeClass(datagrid.css.rowDeleted);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Row.prototype, "isEditing", {
                    get: function () {
                        return !!this._item && this._item._isEditing;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Row;
            })(RIAPP.BaseObject);
            datagrid.Row = Row;

            var DetailsRow = (function (_super) {
                __extends(DetailsRow, _super);
                function DetailsRow(grid, options) {
                    _super.call(this);
                    this._grid = grid;
                    this._el = options.tr;
                    this._item = null;
                    this._cell = null;
                    this._parentRow = null;
                    this._objId = 'drow' + utils.getNewID();
                    this._createCell(options.details_id);
                    this._$el = RIAPP.global.$(this._el);
                    this._$el.addClass(datagrid.css.rowDetails);
                }
                DetailsRow.prototype._createCell = function (details_id) {
                    var td = RIAPP.global.document.createElement('td');
                    this._cell = new DetailsCell(this, { td: td, details_id: details_id });
                };
                DetailsRow.prototype._setParentRow = function (row) {
                    var self = this;
                    this._item = null;
                    this._cell.item = null;

                    //don't use global.$(this._el).remove() here - or it will remove all jQuery plugins!
                    utils.removeNode(this._el);
                    if (!row || row._isDestroyCalled) {
                        this._parentRow = null;
                        return;
                    }
                    this._parentRow = row;
                    this._item = row.item;
                    this._cell.item = this._item;
                    utils.insertAfter(row.el, this._el);
                    var $cell = RIAPP.global.$(this._cell.template.el);

                    //var isLast = this.grid._getLastRow() === this._parentRow;
                    $cell.slideDown('fast', function () {
                        var row = self._parentRow;
                        if (!row || row._isDestroyCalled)
                            return;
                        if (self.grid._options.isUseScrollIntoDetails)
                            row.scrollIntoView(true);
                    });
                };
                DetailsRow.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._cell) {
                        this._cell.destroy();
                        this._cell = null;
                    }
                    this._$el.remove();
                    this._$el = null;
                    this._item = null;
                    this._el = null;
                    this._grid = null;
                    _super.prototype.destroy.call(this);
                };
                DetailsRow.prototype.toString = function () {
                    return 'DetailsRow';
                };
                Object.defineProperty(DetailsRow.prototype, "el", {
                    get: function () {
                        return this._el;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DetailsRow.prototype, "$el", {
                    get: function () {
                        return this._$el;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DetailsRow.prototype, "grid", {
                    get: function () {
                        return this._grid;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DetailsRow.prototype, "item", {
                    get: function () {
                        return this._item;
                    },
                    set: function (v) {
                        if (this._item !== v) {
                            this._item = v;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DetailsRow.prototype, "cell", {
                    get: function () {
                        return this._cell;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DetailsRow.prototype, "uniqueID", {
                    get: function () {
                        return this._objId;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DetailsRow.prototype, "itemKey", {
                    get: function () {
                        if (!this._item)
                            return null;
                        return this._item._key;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DetailsRow.prototype, "parentRow", {
                    get: function () {
                        return this._parentRow;
                    },
                    set: function (v) {
                        var self = this;
                        if (v !== this._parentRow) {
                            var $cell = RIAPP.global.$(this._cell.template.el);
                            if (!!self._parentRow) {
                                $cell.slideUp('fast', function () {
                                    self._setParentRow(v);
                                });
                            } else {
                                self._setParentRow(v);
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return DetailsRow;
            })(RIAPP.BaseObject);
            datagrid.DetailsRow = DetailsRow;

            var BaseColumn = (function (_super) {
                __extends(BaseColumn, _super);
                function BaseColumn(grid, options) {
                    _super.call(this);
                    var self = this;
                    this._grid = grid;
                    this._el = options.th;
                    this._options = options.colinfo;
                    this._isSelected = false;
                    this._objId = 'col' + utils.getNewID();

                    var extcolDiv = RIAPP.global.document.createElement('div');
                    this._$extcol = RIAPP.global.$(extcolDiv);
                    this._$extcol.addClass(datagrid.css.column);
                    this._grid._appendToHeader(extcolDiv);

                    var div = RIAPP.global.document.createElement('div');
                    this._$div = RIAPP.global.$(div);
                    this._$div.addClass(datagrid.css.cellDiv).click(function (e) {
                        e.stopPropagation();
                        RIAPP.global.currentSelectable = grid;
                        grid._setCurrentColumn(self);
                        self._onColumnClicked();
                    });

                    extcolDiv.appendChild(div);

                    this.grid._$tableEl.on('click', ['div[', constsMOD.DATA_ATTR.DATA_EVENT_SCOPE, '="', this.uniqueID, '"]'].join(''), function (e) {
                        e.stopPropagation();
                        var $div = RIAPP.global.$(this), cell = $div.data('cell');
                        if (!!cell) {
                            RIAPP.global.currentSelectable = grid;
                            grid._setCurrentColumn(self);
                            if (cell instanceof DataCell) {
                                if (!!cell._clickTimeOut) {
                                    clearTimeout(cell._clickTimeOut);
                                    cell._clickTimeOut = null;
                                    cell._onDblClicked();
                                } else {
                                    cell._onCellClicked();
                                    cell._clickTimeOut = setTimeout(function () {
                                        cell._clickTimeOut = null;
                                    }, 350);
                                }
                            } else {
                                cell._onCellClicked();
                            }
                        }
                    });

                    if (this._options.width) {
                        this._el.style.width = this._options.width;
                    }
                    this._init();

                    if (this._options.colCellCss) {
                        self._$div.addClass(this._options.colCellCss);
                    }
                }
                BaseColumn.prototype._init = function () {
                    if (!!this.title)
                        this._$div.html(this.title);
                };
                BaseColumn.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._$extcol.remove();
                    this._$extcol = null;
                    this._$div = null;
                    this._el = null;
                    this._grid = null;
                    _super.prototype.destroy.call(this);
                };
                BaseColumn.prototype.scrollIntoView = function (isUp) {
                    if (!this._$div)
                        return;
                    var div = this._$div.get(0);
                    div.scrollIntoView(!!isUp);
                };
                BaseColumn.prototype._onColumnClicked = function () {
                };
                BaseColumn.prototype.toString = function () {
                    return 'BaseColumn';
                };
                Object.defineProperty(BaseColumn.prototype, "uniqueID", {
                    get: function () {
                        return this._objId;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseColumn.prototype, "el", {
                    get: function () {
                        return this._el;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseColumn.prototype, "$div", {
                    get: function () {
                        return this._$div;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseColumn.prototype, "$extcol", {
                    get: function () {
                        return this._$extcol;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseColumn.prototype, "grid", {
                    get: function () {
                        return this._grid;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseColumn.prototype, "options", {
                    get: function () {
                        return this._options;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseColumn.prototype, "title", {
                    get: function () {
                        return this._options.title;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseColumn.prototype, "isSelected", {
                    get: function () {
                        return this._isSelected;
                    },
                    set: function (v) {
                        if (this._isSelected !== v) {
                            this._isSelected = v;
                            if (this._isSelected) {
                                this._$div.addClass(datagrid.css.columnSelected);
                            } else
                                this._$div.removeClass(datagrid.css.columnSelected);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return BaseColumn;
            })(RIAPP.BaseObject);
            datagrid.BaseColumn = BaseColumn;

            var DataColumn = (function (_super) {
                __extends(DataColumn, _super);
                function DataColumn(grid, options) {
                    _super.call(this, grid, options);

                    //the DataCell caches here listbox (for the LookupContent)
                    //so not to create it for every cell
                    this._objCache = {};
                    this.$div.addClass(datagrid.css.dataColumn);
                }
                DataColumn.prototype._init = function () {
                    _super.prototype._init.call(this);
                    this._sortOrder = null;
                    if (this.isSortable) {
                        this.$div.addClass(datagrid.css.colSortable);
                    }
                };
                DataColumn.prototype._onColumnClicked = function () {
                    if (this.isSortable && !!this.sortMemberName) {
                        var sortOrd = this._sortOrder;
                        this.grid._resetColumnsSort();

                        if (sortOrd == 0 /* ASC */) {
                            this.sortOrder = 1 /* DESC */;
                        } else if (sortOrd == 1 /* DESC */) {
                            this.sortOrder = 0 /* ASC */;
                        } else
                            this.sortOrder = 0 /* ASC */;
                        this.grid.sortByColumn(this);
                    }
                };
                DataColumn.prototype._cacheObject = function (key, obj) {
                    this._objCache[key] = obj;
                };
                DataColumn.prototype._getCachedObject = function (key) {
                    return this._objCache[key];
                };
                DataColumn.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    var self = this;
                    utils.forEachProp(self._objCache, function (key) {
                        self._objCache[key].destroy();
                    });
                    self._objCache = null;
                    _super.prototype.destroy.call(this);
                };
                DataColumn.prototype.toString = function () {
                    return 'DataColumn';
                };
                Object.defineProperty(DataColumn.prototype, "isSortable", {
                    get: function () {
                        return !!(this.options.sortable);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataColumn.prototype, "sortMemberName", {
                    get: function () {
                        return this.options.sortMemberName;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataColumn.prototype, "sortOrder", {
                    get: function () {
                        return this._sortOrder;
                    },
                    set: function (v) {
                        this.$div.removeClass([datagrid.css.colSortable, datagrid.css.colSortAsc, datagrid.css.colSortDesc].join(' '));
                        switch (v) {
                            case 0 /* ASC */:
                                this.$div.addClass(datagrid.css.colSortAsc);
                                break;
                            case 1 /* DESC */:
                                this.$div.addClass(datagrid.css.colSortDesc);
                                break;
                            default:
                                if (this.isSortable)
                                    this.$div.addClass(datagrid.css.colSortable);
                        }
                        this._sortOrder = v;
                        this.raisePropertyChanged('sortOrder');
                    },
                    enumerable: true,
                    configurable: true
                });
                return DataColumn;
            })(BaseColumn);
            datagrid.DataColumn = DataColumn;

            var ExpanderColumn = (function (_super) {
                __extends(ExpanderColumn, _super);
                function ExpanderColumn() {
                    _super.apply(this, arguments);
                }
                ExpanderColumn.prototype._init = function () {
                    _super.prototype._init.call(this);
                    this.$div.addClass(datagrid.css.rowExpander);
                };
                ExpanderColumn.prototype.toString = function () {
                    return 'ExpanderColumn';
                };
                return ExpanderColumn;
            })(BaseColumn);
            datagrid.ExpanderColumn = ExpanderColumn;

            var RowSelectorColumn = (function (_super) {
                __extends(RowSelectorColumn, _super);
                function RowSelectorColumn() {
                    _super.apply(this, arguments);
                }
                RowSelectorColumn.prototype._init = function () {
                    _super.prototype._init.call(this);
                    var self = this;
                    this._val = false;
                    this.$div.addClass(datagrid.css.rowSelector);
                    var $chk = RIAPP.global.$('<input type="checkbox"/>');
                    this.$div.append($chk);
                    this._$chk = $chk;
                    $chk.click(function (e) {
                        e.stopPropagation();
                        self._onCheckBoxClicked(this.checked);
                    });
                    $chk.on('change', function (e) {
                        e.stopPropagation();
                        self.checked = this.checked;
                    });
                };
                RowSelectorColumn.prototype._onCheckBoxClicked = function (isChecked) {
                    this.grid.selectRows(isChecked);
                };
                RowSelectorColumn.prototype.toString = function () {
                    return 'RowSelectorColumn';
                };
                Object.defineProperty(RowSelectorColumn.prototype, "checked", {
                    get: function () {
                        return this._val;
                    },
                    set: function (v) {
                        var $el = this._$chk;
                        if (v !== null)
                            v = !!v;
                        if (v !== this._val) {
                            this._val = v;
                            if (!!$el)
                                $el.prop('checked', !!this._val);
                            this.raisePropertyChanged('checked');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return RowSelectorColumn;
            })(BaseColumn);
            datagrid.RowSelectorColumn = RowSelectorColumn;

            var ActionsColumn = (function (_super) {
                __extends(ActionsColumn, _super);
                function ActionsColumn() {
                    _super.apply(this, arguments);
                }
                ActionsColumn.prototype._init = function () {
                    _super.prototype._init.call(this);
                    var self = this, opts = this.options;
                    this.$div.addClass(datagrid.css.rowActions);
                    opts.img_ok = RIAPP.global.getImagePath(opts.img_ok || 'ok.png');
                    opts.img_cancel = RIAPP.global.getImagePath(opts.img_cancel || 'cancel.png');
                    opts.img_edit = RIAPP.global.getImagePath(opts.img_edit || 'edit.png');
                    opts.img_delete = RIAPP.global.getImagePath(opts.img_delete || 'delete.png');
                    this.grid._$tableEl.on("click", 'img[' + constsMOD.DATA_ATTR.DATA_EVENT_SCOPE + '="' + this.uniqueID + '"]', function (e) {
                        e.stopPropagation();
                        var $img = RIAPP.global.$(this), name = this.name, cell = $img.data('cell');
                        switch (name) {
                            case 'img_ok':
                                self._onOk(cell);
                                break;
                            case 'img_cancel':
                                self._onCancel(cell);
                                break;
                            case 'img_edit':
                                self._onEdit(cell);
                                break;
                            case 'img_delete':
                                self._onDelete(cell);
                                break;
                        }
                    });
                };
                ActionsColumn.prototype._onOk = function (cell) {
                    if (!cell._row)
                        return;
                    cell._row.endEdit();
                    cell.update();
                };
                ActionsColumn.prototype._onCancel = function (cell) {
                    if (!cell._row)
                        return;
                    cell._row.cancelEdit();
                    cell.update();
                };
                ActionsColumn.prototype._onDelete = function (cell) {
                    if (!cell._row)
                        return;
                    cell._row.deleteRow();
                };
                ActionsColumn.prototype._onEdit = function (cell) {
                    if (!cell._row)
                        return;
                    cell._row.beginEdit();
                    cell.update();
                    this.grid.showEditDialog();
                };
                ActionsColumn.prototype.toString = function () {
                    return 'ActionsColumn';
                };
                return ActionsColumn;
            })(BaseColumn);
            datagrid.ActionsColumn = ActionsColumn;

            var DataGrid = (function (_super) {
                __extends(DataGrid, _super);
                function DataGrid(app, el, dataSource, options) {
                    _super.call(this);
                    if (!!dataSource && !(dataSource instanceof RIAPP.MOD.collection.BaseCollection))
                        throw new Error(RIAPP.ERRS.ERR_GRID_DATASRC_INVALID);
                    this._options = utils.extend(false, {
                        isUseScrollInto: true,
                        isUseScrollIntoDetails: true,
                        containerCss: null,
                        wrapCss: null,
                        headerCss: null,
                        rowStateField: null,
                        isCanEdit: null,
                        isCanDelete: null,
                        isHandleAddNew: false
                    }, options);
                    this._app = app;
                    var $t = RIAPP.global.$(el);
                    this._tableEl = el;
                    this._$tableEl = $t;
                    $t.addClass(datagrid.css.dataTable);
                    this._name = $t.attr(constsMOD.DATA_ATTR.DATA_NAME);
                    this._objId = 'grd' + utils.getNewID();
                    this._dataSource = dataSource;
                    this._rowMap = {};
                    this._rows = [];
                    this._columns = [];
                    this._isClearing = false;
                    this._isDSFilling = false;
                    this._currentRow = null;
                    this._expandedRow = null;
                    this._details = null;
                    this._expanderCol = null;
                    this._actionsCol = null;
                    this._rowSelectorCol = null;
                    this._currentColumn = null;
                    this._editingRow = null;
                    this._isSorting = false;
                    this._dialog = null;
                    this._chkWidthInterval = null;
                    this._$headerDiv = null;
                    this._$wrapDiv = null;
                    this._$contaner = null;
                    this._wrapTable();
                    this._createColumns();
                    this._bindDS();

                    //fills all rows
                    this._refreshGrid();
                    this._updateColsDim();
                    this._onDSCurrentChanged();
                    RIAPP.global._trackSelectable(this);
                }
                DataGrid.prototype._getEventNames = function () {
                    var base_events = _super.prototype._getEventNames.call(this);
                    return [
                        'row_expanded', 'row_selected', 'page_changed', 'row_state_changed',
                        'cell_dblclicked'].concat(base_events);
                };
                DataGrid.prototype.addOnRowExpanded = function (fn, namespace) {
                    this.addHandler('row_expanded', fn, namespace);
                };
                DataGrid.prototype.removeOnRowExpanded = function (namespace) {
                    this.removeHandler('row_expanded', namespace);
                };
                DataGrid.prototype.addOnRowSelected = function (fn, namespace) {
                    this.addHandler('row_selected', fn, namespace);
                };
                DataGrid.prototype.removeOnRowSelected = function (namespace) {
                    this.removeHandler('row_selected', namespace);
                };
                DataGrid.prototype.addOnPageChanged = function (fn, namespace) {
                    this.addHandler('page_changed', fn, namespace);
                };
                DataGrid.prototype.removeOnPageChanged = function (namespace) {
                    this.removeHandler('page_changed', namespace);
                };
                DataGrid.prototype.addOnRowStateChanged = function (fn, namespace) {
                    this.addHandler('row_state_changed', fn, namespace);
                };
                DataGrid.prototype.removeOnRowStateChanged = function (namespace) {
                    this.removeHandler('row_state_changed', namespace);
                };
                DataGrid.prototype.addOnCellDblClicked = function (fn, namespace) {
                    this.addHandler('cell_dblclicked', fn, namespace);
                };
                DataGrid.prototype.removeOnCellDblClicked = function (namespace) {
                    this.removeHandler('cell_dblclicked', namespace);
                };
                DataGrid.prototype._isRowExpanded = function (row) {
                    return this._expandedRow === row;
                };
                DataGrid.prototype._appendToHeader = function (el) {
                    this._$headerDiv.append(el);
                };
                DataGrid.prototype._setCurrentColumn = function (column) {
                    if (!!this._currentColumn)
                        this._currentColumn.isSelected = false;
                    this._currentColumn = column;
                    if (!!this._currentColumn)
                        this._currentColumn.isSelected = true;
                };
                DataGrid.prototype._parseColumnAttr = function (column_attr, content_attr) {
                    var defaultOp = {
                        type: COLUMN_TYPE.DATA,
                        title: null,
                        sortable: false,
                        sortMemberName: null,
                        content: null
                    }, options;

                    var temp_opts = RIAPP.global.parser.parseOptions(column_attr);
                    if (temp_opts.length > 0)
                        options = utils.extend(false, defaultOp, temp_opts[0]);
                    else
                        options = defaultOp;

                    if (!!content_attr) {
                        options.content = contentMOD.parseContentAttr(content_attr);
                        if (!options.sortMemberName && !!options.content.fieldName)
                            options.sortMemberName = options.content.fieldName;
                    }

                    return options;
                };
                DataGrid.prototype._findUndeleted = function (row, isUp) {
                    if (!row)
                        return null;
                    if (!row.isDeleted)
                        return row;

                    //find nearest nondeleted row (search up and down)
                    var delIndex = this.rows.indexOf(row), i = delIndex, len = this.rows.length;
                    if (!isUp) {
                        i -= 1;
                        if (i >= 0)
                            row = this.rows[i];
                        while (i >= 0 && row.isDeleted) {
                            i -= 1;
                            if (i >= 0)
                                row = this.rows[i];
                        }
                        if (row.isDeleted)
                            row = null;
                    } else {
                        i += 1;
                        if (i < len)
                            row = this.rows[i];
                        while (i < len && row.isDeleted) {
                            i += 1;
                            if (i < len)
                                row = this.rows[i];
                        }
                        if (row.isDeleted)
                            row = null;
                    }
                    return row;
                };
                DataGrid.prototype._updateCurrent = function (row, withScroll) {
                    this.currentRow = row;
                    if (withScroll && !!row && !row.isDeleted)
                        this._scrollToCurrent(true);
                };
                DataGrid.prototype._scrollToCurrent = function (isUp) {
                    var row = this.currentRow;
                    if (!!row) {
                        row.scrollIntoView(isUp);
                    }
                };
                DataGrid.prototype._onRowStateChanged = function (row, val) {
                    var args = { row: row, val: val, css: null };
                    this.raiseEvent('row_state_changed', args);
                    return args.css;
                };
                DataGrid.prototype._onCellDblClicked = function (cell) {
                    var args = { cell: cell };
                    this.raiseEvent('cell_dblclicked', args);
                };
                DataGrid.prototype._onError = function (error, source) {
                    var isHandled = _super.prototype._onError.call(this, error, source);
                    if (!isHandled) {
                        return RIAPP.global._onError(error, source);
                    }
                    return isHandled;
                };
                DataGrid.prototype._onDSCurrentChanged = function () {
                    var ds = this._dataSource, cur;
                    if (!!ds)
                        cur = ds.currentItem;
                    if (!cur)
                        this._updateCurrent(null, false);
                    else {
                        this._updateCurrent(this._rowMap[cur._key], false);
                    }
                };
                DataGrid.prototype._onDSCollectionChanged = function (args) {
                    var self = this, row, items = args.items;
                    switch (args.change_type) {
                        case 2 /* RESET */:
                            if (!this._isDSFilling)
                                this._refreshGrid();
                            break;
                        case 1 /* ADDED */:
                            if (!this._isDSFilling)
                                self._appendItems(args.items);
                            break;
                        case 0 /* REMOVE */:
                            items.forEach(function (item) {
                                var row = self._rowMap[item._key];
                                if (!!row) {
                                    self._removeRow(row);
                                }
                            });
                            break;
                        case 3 /* REMAP_KEY */:
                             {
                                row = self._rowMap[args.old_key];
                                if (!!row) {
                                    delete self._rowMap[args.old_key];
                                    self._rowMap[args.new_key] = row;
                                }
                            }
                            break;
                        default:
                            throw new Error(utils.format(RIAPP.ERRS.ERR_COLLECTION_CHANGETYPE_INVALID, args.change_type));
                    }
                };
                DataGrid.prototype._onDSFill = function (args) {
                    var isEnd = !args.isBegin, self = this;
                    if (isEnd) {
                        self._isDSFilling = false;
                        if (args.resetUI)
                            self._refreshGrid();
                        else
                            self._appendItems(args.newItems);

                        if (!!args.isPageChanged) {
                            setTimeout(function () {
                                if (self._isDestroyCalled)
                                    return;
                                self._onPageChanged();
                            }, 100);
                        }
                        setTimeout(function () {
                            if (self._isDestroyCalled)
                                return;
                            self._updateColsDim();
                        }, 200);
                    } else {
                        self._isDSFilling = true;
                        if (!self._isSorting) {
                            if (!args.isPageChanged)
                                self._resetColumnsSort();
                        }
                    }
                };
                DataGrid.prototype._onPageChanged = function () {
                    if (!!this._rowSelectorCol) {
                        this._rowSelectorCol.checked = false;
                    }
                    this._scrollToCurrent(false);
                    this.raiseEvent('page_changed', {});
                };
                DataGrid.prototype._onItemEdit = function (item, isBegin, isCanceled) {
                    var row = this._rowMap[item._key];
                    if (!row)
                        return;
                    if (isBegin) {
                        row._onBeginEdit();
                        this._editingRow = row;
                    } else {
                        row._onEndEdit(isCanceled);
                        this._editingRow = null;
                    }
                    this.raisePropertyChanged('editingRow');
                };
                DataGrid.prototype._onItemAdded = function (args) {
                    var item = args.item, row = this._rowMap[item._key];
                    if (!row)
                        return;
                    this._updateCurrent(row, true);

                    //row.isExpanded = true;
                    if (this._options.isHandleAddNew && !args.isAddNewHandled) {
                        args.isAddNewHandled = this.showEditDialog();
                    }
                };
                DataGrid.prototype._onItemStatusChanged = function (item, oldChangeType) {
                    var DEL_STATUS = 3 /* DELETED */, newChangeType = item._changeType, ds = this._dataSource;
                    var row = this._rowMap[item._key];
                    if (!row)
                        return;
                    if (newChangeType === DEL_STATUS) {
                        row.isDeleted = true;
                        var row2 = this._findUndeleted(row, true);
                        if (!row2) {
                            row2 = this._findUndeleted(row, false);
                        }
                        if (!!row2) {
                            ds.currentItem = row2.item;
                        }
                    } else if (oldChangeType === DEL_STATUS && newChangeType !== DEL_STATUS) {
                        row.isDeleted = false;
                    }
                };
                DataGrid.prototype._onRowSelectionChanged = function (row) {
                    this.raiseEvent('row_selected', { row: row });
                };
                DataGrid.prototype._onDSErrorsChanged = function (item) {
                    var row = this._rowMap[item._key];
                    if (!row)
                        return;
                    row.updateErrorState();
                };
                DataGrid.prototype._resetColumnsSort = function () {
                    this.columns.forEach(function (col) {
                        if (col instanceof DataColumn) {
                            col.sortOrder = null;
                        }
                    });
                };
                DataGrid.prototype._bindDS = function () {
                    var self = this, ds = this._dataSource;
                    if (!ds)
                        return;
                    ds.addOnCollChanged(function (sender, args) {
                        self._onDSCollectionChanged(args);
                    }, self._objId);
                    ds.addOnFill(function (sender, args) {
                        self._onDSFill(args);
                    }, self._objId);
                    ds.addOnPropertyChange('currentItem', function (sender, args) {
                        self._onDSCurrentChanged();
                    }, self._objId);
                    ds.addOnBeginEdit(function (sender, args) {
                        self._onItemEdit(args.item, true, undefined);
                    }, self._objId);
                    ds.addOnEndEdit(function (sender, args) {
                        self._onItemEdit(args.item, false, args.isCanceled);
                    }, self._objId);
                    ds.addOnErrorsChanged(function (sender, args) {
                        self._onDSErrorsChanged(args.item);
                    }, self._objId);
                    ds.addOnStatusChanged(function (sender, args) {
                        if (ds !== sender)
                            return;
                        self._onItemStatusChanged(args.item, args.oldChangeType);
                    }, self._objId);
                    ds.addOnItemAdded(function (sender, args) {
                        if (ds !== sender)
                            return;
                        self._onItemAdded(args);
                    }, self._objId);
                };
                DataGrid.prototype._unbindDS = function () {
                    var self = this, ds = this._dataSource;
                    if (!ds)
                        return;
                    ds.removeNSHandlers(self._objId);
                };
                DataGrid.prototype._getLastRow = function () {
                    if (this._rows.length === 0)
                        return null;
                    var i = this._rows.length - 1, row = this._rows[i];
                    while (row.isDeleted && i > 0) {
                        i -= 1;
                        row = this._rows[i];
                    }
                    if (row.isDeleted)
                        return null;
                    else
                        return row;
                };
                DataGrid.prototype._removeRow = function (row) {
                    if (this._expandedRow === row) {
                        this.collapseDetails();
                    }
                    if (this._rows.length === 0)
                        return;
                    var rowkey = row.itemKey, i = utils.removeFromArray(this._rows, row), oldRow;
                    try  {
                        if (i > -1) {
                            oldRow = row;
                            if (!oldRow._isDestroyCalled)
                                oldRow.destroy();
                        }
                    } finally {
                        if (!!this._rowMap[rowkey])
                            delete this._rowMap[rowkey];
                    }
                };
                DataGrid.prototype._clearGrid = function () {
                    if (this._rows.length === 0)
                        return;
                    this._isClearing = true;
                    try  {
                        this.collapseDetails();
                        var self = this, tbody = self._tBodyEl, newTbody = RIAPP.global.document.createElement('tbody');
                        this._tableEl.replaceChild(newTbody, tbody);
                        var rows = this._rows;
                        this._rows = [];
                        this._rowMap = {};
                        rows.forEach(function (row) {
                            row.destroy();
                        });
                    } finally {
                        this._isClearing = false;
                    }
                    this._currentRow = null;
                };
                DataGrid.prototype._updateColsDim = function () {
                    var width = 0, headerDiv = this._$headerDiv;
                    this._columns.forEach(function (col) {
                        width += col.el.offsetWidth;
                    });
                    headerDiv.width(width);
                    this._columns.forEach(function (col) {
                        col.$extcol.width(col.el.offsetWidth);
                        var posArgs = {
                            my: "left top",
                            at: "left top",
                            of: headerDiv,
                            offset: "" + col.el.offsetLeft + " 0"
                        };
                        col.$extcol.position(posArgs);
                    });
                };
                DataGrid.prototype._wrapTable = function () {
                    var $t = this._$tableEl, headerDiv, wrapDiv, container, self = this;

                    $t.wrap(RIAPP.global.$('<div></div>').addClass(datagrid.css.wrapDiv));
                    wrapDiv = $t.parent();
                    wrapDiv.wrap(RIAPP.global.$('<div></div>').addClass(datagrid.css.container));
                    container = wrapDiv.parent();

                    headerDiv = RIAPP.global.$('<div></div>').addClass(datagrid.css.headerDiv).insertBefore(wrapDiv);
                    RIAPP.global.$(this._tHeadRow).addClass(datagrid.css.columnInfo);
                    this._$wrapDiv = wrapDiv;
                    this._$headerDiv = headerDiv;

                    this._$contaner = container;

                    if (this._options.containerCss) {
                        container.addClass(this._options.containerCss);
                    }

                    if (this._options.wrapCss) {
                        wrapDiv.addClass(this._options.wrapCss);
                    }
                    if (this._options.headerCss) {
                        headerDiv.addClass(this._options.headerCss);
                    }
                    var tw = { w: $t.width() };
                    this._chkWidthInterval = setInterval(function () {
                        var test = { w: $t.width() };
                        if (tw.w !== test.w) {
                            tw.w = test.w;
                            self._updateColsDim();
                        }
                    }, 1000);
                };
                DataGrid.prototype._unWrapTable = function () {
                    var $t = this._$tableEl;
                    if (!this._$headerDiv)
                        return;
                    clearInterval(this._chkWidthInterval);
                    this._chkWidthInterval = null;
                    this._$headerDiv.remove();
                    this._$headerDiv = null;

                    //remove wrapDiv
                    $t.unwrap();
                    this._$wrapDiv = null;

                    //remove container
                    $t.unwrap();
                    this._$contaner = null;
                };
                DataGrid.prototype._createColumns = function () {
                    var self = this, headCells = this._tHeadCells, cnt = headCells.length, cellInfo = [];
                    var th, attr;
                    for (var i = 0; i < cnt; i += 1) {
                        th = headCells[i];
                        attr = this._parseColumnAttr(th.getAttribute(constsMOD.DATA_ATTR.DATA_COLUMN), th.getAttribute(constsMOD.DATA_ATTR.DATA_CONTENT));
                        cellInfo.push({ th: th, colinfo: attr });
                    }

                    cellInfo.forEach(function (inf) {
                        var col = self._createColumn(inf);
                        if (!!col)
                            self._columns.push(col);
                    });
                };
                DataGrid.prototype._createColumn = function (options) {
                    var col;
                    switch (options.colinfo.type) {
                        case COLUMN_TYPE.ROW_EXPANDER:
                            if (!this._expanderCol) {
                                col = new ExpanderColumn(this, options);
                                this._expanderCol = col;
                            }
                            break;
                        case COLUMN_TYPE.ROW_ACTIONS:
                            if (!this._actionsCol) {
                                col = new ActionsColumn(this, options);
                                this._actionsCol = col;
                            }
                            break;
                        case COLUMN_TYPE.ROW_SELECTOR:
                            if (!this._rowSelectorCol) {
                                col = new RowSelectorColumn(this, options);
                                this._rowSelectorCol = col;
                            }
                            break;
                        case COLUMN_TYPE.DATA:
                            col = new DataColumn(this, options);
                            break;
                        default:
                            throw new Error(utils.format(RIAPP.ERRS.ERR_GRID_COLTYPE_INVALID, options.colinfo.type));
                    }
                    return col;
                };
                DataGrid.prototype._appendItems = function (newItems) {
                    if (this._isDestroyCalled)
                        return;
                    var self = this, item, tbody = this._tBodyEl;
                    for (var i = 0, k = newItems.length; i < k; i += 1) {
                        item = newItems[i];
                        if (!self._rowMap[item._key])
                            self._createRowForItem(tbody, item);
                    }
                };
                DataGrid.prototype._onKeyDown = function (key, event) {
                    var ds = this._dataSource, Keys = constsMOD.KEYS, self = this;
                    if (!ds)
                        return;
                    switch (key) {
                        case 38 /* up */:
                            event.preventDefault();
                            if (ds.movePrev(true)) {
                                if (self.isUseScrollInto) {
                                    self._scrollToCurrent(false);
                                }
                            }
                            break;
                        case 40 /* down */:
                            event.preventDefault();
                            if (ds.moveNext(true)) {
                                if (self.isUseScrollInto) {
                                    self._scrollToCurrent(false);
                                }
                            }
                            break;
                        case 34 /* pageDown */:
                            /*
                            if (!!this._currentRow && !!this._currentRow.expanderCell && !this._currentRow.isExpanded) {
                            this._currentRow.expanderCell._onCellClicked();
                            event.preventDefault();
                            }
                            */
                            if (ds.pageIndex > 0)
                                ds.pageIndex = ds.pageIndex - 1;
                            break;
                        case 33 /* pageUp */:
                            /*
                            if (!!this._currentRow && !!this._currentRow.expanderCell && !!this._currentRow.isExpanded) {
                            this._currentRow.expanderCell._onCellClicked();
                            event.preventDefault();
                            }
                            */
                            ds.pageIndex = ds.pageIndex + 1;
                            break;
                        case 13 /* enter */:
                            if (!!this._currentRow && !!this._actionsCol) {
                                if (this._currentRow.isEditing) {
                                    event.preventDefault();
                                } else {
                                    event.preventDefault();
                                }
                            }
                            break;
                        case 27 /* esc */:
                            if (!!this._currentRow && !!this._actionsCol) {
                                if (this._currentRow.isEditing) {
                                    event.preventDefault();
                                }
                            }
                            break;
                        case 32 /* space */:
                            if (!!this._rowSelectorCol && !!this._currentRow && !this._currentRow.isEditing) {
                                event.preventDefault();
                            }
                            break;
                    }
                };
                DataGrid.prototype._onKeyUp = function (key, event) {
                    var ds = this._dataSource, Keys = constsMOD.KEYS;
                    if (!ds)
                        return;
                    switch (key) {
                        case 13 /* enter */:
                            if (!!this._currentRow && !!this._actionsCol) {
                                if (this._currentRow.isEditing) {
                                    this._actionsCol._onOk(this._currentRow.actionsCell);
                                    event.preventDefault();
                                } else {
                                    this._actionsCol._onEdit(this._currentRow.actionsCell);
                                    event.preventDefault();
                                }
                            }
                            break;
                        case 27 /* esc */:
                            if (!!this._currentRow && !!this._actionsCol) {
                                if (this._currentRow.isEditing) {
                                    this._actionsCol._onCancel(this._currentRow.actionsCell);
                                    event.preventDefault();
                                }
                            }
                            break;
                        case 32 /* space */:
                            if (!!this._rowSelectorCol && !!this._currentRow && !this._currentRow.isEditing) {
                                event.preventDefault();
                                this._currentRow.isSelected = !this._currentRow.isSelected;
                            }
                            break;
                    }
                };

                //Full grid refresh
                DataGrid.prototype._refreshGrid = function () {
                    var self = this, ds = this._dataSource;
                    self._clearGrid();
                    if (!ds)
                        return;
                    var docFr = RIAPP.global.document.createDocumentFragment(), oldTbody = this._tBodyEl, newTbody = RIAPP.global.document.createElement('tbody');
                    ds.items.forEach(function (item, pos) {
                        self._createRowForItem(docFr, item, pos);
                    });
                    newTbody.appendChild(docFr);
                    self._tableEl.replaceChild(newTbody, oldTbody);
                };
                DataGrid.prototype._createRowForItem = function (parent, item, pos) {
                    var self = this, tr = RIAPP.global.document.createElement('tr');
                    var gridRow = new Row(self, { tr: tr, item: item });
                    self._rowMap[item._key] = gridRow;
                    self._rows.push(gridRow);
                    parent.appendChild(gridRow.el);
                    return gridRow;
                };
                DataGrid.prototype._createDetails = function () {
                    var details_id = this._options.details.templateID;
                    var tr = RIAPP.global.document.createElement('tr');
                    return new DetailsRow(this, { tr: tr, details_id: details_id });
                };
                DataGrid.prototype._expandDetails = function (parentRow, expanded) {
                    if (!this._options.details)
                        return;
                    if (!this._details) {
                        this._details = this._createDetails();
                    }
                    var old = this._expandedRow;
                    if (old === parentRow) {
                        if (!!old && expanded)
                            return;
                    }
                    this._expandedRow = null;
                    this._details.parentRow = null;

                    if (expanded) {
                        this._expandedRow = parentRow;
                        this._details.parentRow = parentRow;
                        this._expandedRow.expanderCell._toggleImage();
                    } else {
                        this._expandedRow = null;
                        this._details.parentRow = null;
                        if (!!old) {
                            old.expanderCell._toggleImage();
                        }
                    }
                    if (old !== parentRow) {
                        if (!!old)
                            old.expanderCell._toggleImage();
                    }
                    this.raiseEvent('row_expanded', { old_expandedRow: old, expandedRow: parentRow, isExpanded: expanded });
                };
                DataGrid.prototype.sortByColumn = function (column) {
                    var self = this, ds = this._dataSource;
                    var sorts = column.sortMemberName.split(';');
                    self._isSorting = true;
                    var promise = ds.sort(sorts, column.sortOrder);
                    promise.always(function () {
                        self._isSorting = false;
                    });
                };
                DataGrid.prototype.selectRows = function (isSelect) {
                    this._rows.forEach(function (row) {
                        if (row.isDeleted)
                            return;
                        row.isSelected = isSelect;
                    });
                };
                DataGrid.prototype.findRowByItem = function (item) {
                    var row = this._rowMap[item._key];
                    if (!row)
                        return null;
                    return row;
                };
                DataGrid.prototype.collapseDetails = function () {
                    if (!this._details)
                        return;
                    var old = this._expandedRow;
                    if (!!old) {
                        this._expandedRow = null;
                        this._details._setParentRow(null);
                        this.raiseEvent('row_expanded', { old_expandedRow: old, expandedRow: null, isExpanded: false });
                    }
                };
                DataGrid.prototype.getSelectedRows = function () {
                    var res = [];
                    this._rows.forEach(function (row) {
                        if (row.isDeleted)
                            return;
                        if (row.isSelected) {
                            res.push(row);
                        }
                    });
                    return res;
                };
                DataGrid.prototype.showEditDialog = function () {
                    if (!this._options.editor || !this._options.editor.templateID || !this._editingRow)
                        return false;
                    var editorOptions, item = this._editingRow.item;
                    if (!item.isEditing)
                        item.beginEdit();
                    if (!this._dialog) {
                        editorOptions = utils.extend(false, {
                            dataContext: item
                        }, this._options.editor);
                        this._dialog = new RIAPP.MOD.datadialog.DataEditDialog(this.app, editorOptions);
                    } else
                        this._dialog.dataContext = item;
                    this._dialog.canRefresh = !!this.dataSource.permissions.canRefreshRow && !item._isNew;
                    this._dialog.show();
                    return true;
                };
                DataGrid.prototype.scrollToCurrent = function (isUp) {
                    this._scrollToCurrent(isUp);
                };
                DataGrid.prototype.addNew = function () {
                    var ds = this._dataSource;
                    try  {
                        ds.addNew();
                        this.showEditDialog();
                    } catch (ex) {
                        RIAPP.global.reThrow(ex, this._onError(ex, this));
                    }
                };
                DataGrid.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    RIAPP.global._untrackSelectable(this);
                    if (!!this._details) {
                        this._details.destroy();
                        this._details = null;
                    }
                    if (!!this._dialog) {
                        this._dialog.destroy();
                        this._dialog = null;
                    }
                    this._clearGrid();
                    this._unbindDS();
                    this._dataSource = null;
                    this._unWrapTable();
                    this._$tableEl.removeClass(datagrid.css.dataTable);
                    RIAPP.global.$(this._tHeadRow).removeClass(datagrid.css.columnInfo);
                    this._tableEl = null;
                    this._$tableEl = null;
                    this._app = null;
                    _super.prototype.destroy.call(this);
                };
                Object.defineProperty(DataGrid.prototype, "app", {
                    get: function () {
                        return this._app;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "$container", {
                    get: function () {
                        return this._$contaner;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "_tBodyEl", {
                    get: function () {
                        return this._tableEl.tBodies[0];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "_tHeadEl", {
                    get: function () {
                        return this._tableEl.tHead;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "_tFootEl", {
                    get: function () {
                        return this._tableEl.tFoot;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "_tHeadRow", {
                    get: function () {
                        if (!this._tHeadEl)
                            return null;
                        var trs = this._tHeadEl.rows;
                        if (trs.length === 0)
                            return null;
                        return trs[0];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "_tHeadCells", {
                    get: function () {
                        var row = this._tHeadRow;
                        if (!row)
                            return [];
                        return RIAPP.ArrayHelper.fromCollection(row.cells);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "containerEl", {
                    get: function () {
                        return this._$contaner.get(0);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "uniqueID", {
                    get: function () {
                        return this._objId;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "name", {
                    get: function () {
                        return this._name;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "dataSource", {
                    get: function () {
                        return this._dataSource;
                    },
                    set: function (v) {
                        if (v === this._dataSource)
                            return;
                        if (this._dataSource !== null) {
                            this._unbindDS();
                        }
                        this._clearGrid();
                        this._dataSource = v;
                        if (this._dataSource !== null)
                            this._bindDS();
                        this.raisePropertyChanged('dataSource');
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "rows", {
                    get: function () {
                        return this._rows;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "columns", {
                    get: function () {
                        return this._columns;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "currentRow", {
                    get: function () {
                        return this._currentRow;
                    },
                    set: function (row) {
                        var ds = this._dataSource, old = this._currentRow, isChanged = false;
                        if (!ds)
                            return;
                        if (old !== row) {
                            this._currentRow = row;
                            if (!!old) {
                                old.isCurrent = false;
                            }
                            if (!!row)
                                row.isCurrent = true;
                            isChanged = true;
                        }
                        if (!!row) {
                            if (row.item !== ds.currentItem)
                                ds.currentItem = row.item;
                        } else
                            ds.currentItem = null;
                        if (isChanged)
                            this.raisePropertyChanged('currentRow');
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "editingRow", {
                    get: function () {
                        return this._editingRow;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "isCanEdit", {
                    get: function () {
                        if (this._options.isCanEdit !== null)
                            return this._options.isCanEdit;
                        var ds = this._dataSource;
                        return !!ds && ds.permissions.canEditRow;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "isCanDelete", {
                    get: function () {
                        if (this._options.isCanDelete !== null)
                            return this._options.isCanDelete;
                        var ds = this._dataSource;
                        return !!ds && ds.permissions.canDeleteRow;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "isCanAddNew", {
                    get: function () {
                        var ds = this._dataSource;
                        return !!ds && ds.permissions.canAddRow;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "isUseScrollInto", {
                    get: function () {
                        return this._options.isUseScrollInto;
                    },
                    set: function (v) {
                        this._options.isUseScrollInto = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                return DataGrid;
            })(RIAPP.BaseObject);
            datagrid.DataGrid = DataGrid;

            var GridElView = (function (_super) {
                __extends(GridElView, _super);
                function GridElView() {
                    _super.apply(this, arguments);
                }
                GridElView.prototype.toString = function () {
                    return 'GridElView';
                };
                GridElView.prototype._init = function (options) {
                    _super.prototype._init.call(this, options);
                    this._dataSource = null;
                    this._grid = null;
                    this._gridEventCommand = null;
                    this._options = options;
                };
                GridElView.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._dataSource) {
                        this.dataSource = null;
                    }
                    this._gridEventCommand = null;
                    _super.prototype.destroy.call(this);
                };
                GridElView.prototype._createGrid = function () {
                    this._grid = new DataGrid(this.app, this._el, this._dataSource, this._options);
                    this._bindGridEvents();
                    this._onGridCreated(this._grid);
                };
                GridElView.prototype._bindGridEvents = function () {
                    if (!this._grid)
                        return;
                    var self = this;
                    this._grid.addOnRowExpanded(function (s, args) {
                        self.invokeGridEvent('row_expanded', args);
                    }, this.uniqueID);
                    this._grid.addOnRowSelected(function (s, args) {
                        self.invokeGridEvent('row_selected', args);
                    }, this.uniqueID);
                    this._grid.addOnPageChanged(function (s, args) {
                        self.invokeGridEvent('page_changed', args);
                    }, this.uniqueID);
                    this._grid.addOnCellDblClicked(function (s, args) {
                        self.invokeGridEvent('cell_dblclicked', args);
                    }, this.uniqueID);
                    this._grid.addOnRowStateChanged(function (s, args) {
                        self.invokeGridEvent('row_state_changed', args);
                    }, this.uniqueID);
                    this._grid.addOnDestroyed(function (s, args) {
                        self._onGridDestroyed(self._grid);
                        self._grid = null;
                        self.invokePropChanged('grid');
                        self.raisePropertyChanged('grid');
                    }, this.uniqueID);
                };
                GridElView.prototype.invokeGridEvent = function (eventName, args) {
                    var self = this, data = { eventName: eventName, args: args };
                    if (!!self._gridEventCommand) {
                        self._gridEventCommand.execute(self, data);
                    }
                };
                GridElView.prototype._onGridCreated = function (grid) {
                };
                GridElView.prototype._onGridDestroyed = function (grid) {
                };
                Object.defineProperty(GridElView.prototype, "dataSource", {
                    get: function () {
                        return this._dataSource;
                    },
                    set: function (v) {
                        var self = this;
                        if (this._dataSource !== v) {
                            this._dataSource = v;
                            if (!!this._grid && !this._grid._isDestroyCalled) {
                                this._grid.destroy();
                            }
                            this._grid = null;
                            if (!!this._dataSource) {
                                this._createGrid();
                            }
                            self.invokePropChanged('grid');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GridElView.prototype, "grid", {
                    get: function () {
                        return this._grid;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GridElView.prototype, "gridEventCommand", {
                    get: function () {
                        return this._gridEventCommand;
                    },
                    set: function (v) {
                        var old = this._gridEventCommand;
                        if (v !== old) {
                            if (!!this._gridEventCommand)
                                this.invokeGridEvent('command_disconnected', {});
                            this._gridEventCommand = v;
                            if (!!this._gridEventCommand)
                                this.invokeGridEvent('command_connected', {});
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return GridElView;
            })(RIAPP.MOD.baseElView.BaseElView);
            datagrid.GridElView = GridElView;

            RIAPP.global.registerElView('table', GridElView);
            RIAPP.global.registerElView('datagrid', GridElView);
            RIAPP.global.onModuleLoaded('datagrid', datagrid);
        })(MOD.datagrid || (MOD.datagrid = {}));
        var datagrid = MOD.datagrid;
    })(RIAPP.MOD || (RIAPP.MOD = {}));
    var MOD = RIAPP.MOD;
})(RIAPP || (RIAPP = {}));
//# sourceMappingURL=datagrid.js.map

module RIAPP {
    export module MOD {
        export module datagrid {
            import constsMOD = RIAPP.MOD.consts;
            import utilsMOD = RIAPP.MOD.utils;
            import bindMOD = RIAPP.MOD.binding;
            import contentMOD = RIAPP.MOD.baseContent;
            import collMOD = RIAPP.MOD.collection;

            var COLUMN_TYPE = { DATA: 'data', ROW_EXPANDER: 'row_expander', ROW_ACTIONS: 'row_actions', ROW_SELECTOR: 'row_selector' };
            var utils: utilsMOD.Utils, global = RIAPP.global;
            global.addOnInitialize((s, args) => {
                utils = s.utils;
            });

            export var css = {
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

            var _columnWidthInterval, _gridsCount: number = 0;
            var _created_grids: { [id: string]: DataGrid; } = {};
            function _gridCreated(grid: DataGrid) {
                _created_grids[grid.uniqueID] = grid;
                _gridsCount += 1;
                if (_gridsCount == 1) {
                    _columnWidthInterval = setInterval(_checkGridWidth, 250);
                }
            }
            function _gridDestroyed(grid: DataGrid) {
                delete _created_grids[grid.uniqueID];
                _gridsCount -= 1;
                if (_gridsCount == 0) {
                    clearInterval(_columnWidthInterval);
                }
            }
            function _checkGridWidth() {
                utils.forEachProp(_created_grids, (id) => {
                    var grid = _created_grids[id];
                    if (grid._isDestroyCalled)
                        return;
                    grid._columnWidthChecker();
                });
            };

            export class RowSelectContent extends contentMOD.BoolContent {
                _canBeEdited() {
                    return true;
                }
                toString() {
                    return 'RowSelectContent';
                }
            }

            export class BaseCell extends RIAPP.BaseObject{
                _row: Row;
                _el: HTMLTableCellElement;
                _column: BaseColumn;
                _div: HTMLElement;
                _clickTimeOut: number;

                constructor(row: Row, options: { td: HTMLTableCellElement; column: any; }) {
                    super();
                    this._row = row;
                    this._el = options.td;
                    this._column = options.column;
                    this._div = global.document.createElement("div");
                    var $div = global.$(this._div);
                    this._clickTimeOut = null;
                    $div.addClass(css.cellDiv).attr(constsMOD.DATA_ATTR.DATA_EVENT_SCOPE, this._column.uniqueID);
                    $div.data('cell',this);
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
                _init() {
                }
                _onCellClicked() {
                    this.grid.currentRow = this._row;
                }
                _onDblClicked() {
                    this.grid.currentRow = this._row;
                    this.grid._onCellDblClicked(this);
                }
                _onError(error, source) {
                    var isHandled = super._onError(error, source);
                    if (!isHandled) {
                        return this.row._onError(error, source);
                    }
                    return isHandled;
                }
                scrollIntoView(isUp:boolean) {
                    var div = this._div;
                    div.scrollIntoView(!!isUp);
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._clickTimeOut) {
                        clearTimeout(this._clickTimeOut);
                        this._clickTimeOut = null;
                    }
                    var $div = global.$(this._div);
                    $div.removeData();
                    $div.remove();
                    this._div = null;
                    this._row = null;
                    this._el = null;
                    this._column = null;
                    super.destroy();
                }
                toString() {
                    return 'BaseCell';
                }
                get el() { return this._el; }
                get row() { return this._row; }
                get column() { return this._column; }
                get grid() { return this._row.grid; }
                get item() { return this._row.item; }
            }

            export class DataCell extends BaseCell {
                private _content: contentMOD.IContent;
                private _stateCss: string;

                constructor(row: Row, options: { td: HTMLTableCellElement; column: DataColumn; }) {
                    this._content = null;
                    this._stateCss = null;
                    super(row, options);
                }
                _init() {
                    var options = this.column.options.content;
                    if (!options.fieldInfo && !!options.fieldName) {
                        options.fieldInfo = this.item.getFieldInfo(options.fieldName);
                        if (!options.fieldInfo) {
                            throw new Error(utils.format(RIAPP.ERRS.ERR_DBSET_INVALID_FIELDNAME, '', options.fieldName));
                        }
                    }
                    var app = this.grid.app;
                    options.initContentFn = null;
                        try {
                            var contentType = app._getContentType(options);
                            if (app.contentFactory.isExternallyCachable(contentType)) {
                                options.initContentFn = this._getInitContentFn();
                            }
                            this._content = app._getContent(contentType, options, this._div, this.item, this.item.isEditing);
                        }
                        finally {
                            delete options.initContentFn;
                        }
                }
                _getInitContentFn() {
                    var self = this;
                    return function (content: contentMOD.IExternallyCachable) {
                        content.addOnObjectCreated(function (sender, args) {
                            self.column._cacheObject(args.objectKey,args.object);
                            args.isCachedExternally = !!self.column._getCachedObject(args.objectKey);
                        });
                        content.addOnObjectNeeded(function (sender, args) {
                            args.object = self.column._getCachedObject(args.objectKey);
                        });
                    };
                }
                _beginEdit() {
                    if (!this._content.isEditing) {
                        this._content.isEditing = true;
                    }
                }
                _endEdit(isCanceled) {
                    if (this._content.isEditing) {
                        this._content.isEditing = false;
                    }
                }
                _setState(css:string) {
                    var $div;
                    if (this._stateCss !== css) {
                        $div = global.$(this._div);
                        if (!!this._stateCss)
                            $div.removeClass(this._stateCss);
                        this._stateCss = css;
                        if (!!this._stateCss)
                            $div.addClass(this._stateCss);
                    }
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._content) {
                        this._content.destroy();
                        this._content = null;
                    }
                    super.destroy();
                }
                toString() {
                    return 'DataCell';
                }
                get column() { return <DataColumn>this._column; }
            }

            export class ExpanderCell extends BaseCell {
                _init() {
                    var $el = global.$(this.el);
                    $el.addClass(css.rowCollapsed);
                    $el.addClass(css.rowExpander);
                }
                _onCellClicked() {
                    if (!this._row)
                        return;
                    super._onCellClicked();
                    this._row.isExpanded = !this._row.isExpanded;
                }
                _toggleImage() {
                    var $el = global.$(this.el);
                    if (this._row.isExpanded) {
                        $el.removeClass(css.rowCollapsed);
                        $el.addClass(css.rowExpanded);
                    }
                    else {
                        $el.removeClass(css.rowExpanded);
                        $el.addClass(css.rowCollapsed);
                    }
                }
                toString() {
                    return 'ExpanderCell';
                }
            }

            export class ActionsCell extends BaseCell {
                private _isEditing: boolean;
                constructor(row: Row, options: { td: HTMLTableCellElement; column: any; }) {
                    this._isEditing = false;
                    super(row, options);
                }
                _init() {
                    var $el = global.$(this.el), $div = global.$(this._div);
                    $el.addClass([css.rowActions, css.cellDiv, css.nobr].join(' '));
                    $div.on("mouseenter", "img", function (e) {
                        e.stopPropagation();
                        $(this).css("opacity", 0.5);
                    });
                    $div.on("mouseout", "img", function (e) {
                        e.stopPropagation();
                        $(this).css("opacity", 1.0);
                    });
                    this._createButtons(false);
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    var $div = global.$(this._div), $imgs = $div.find('img');
                    $imgs.each(function (index, img) {
                        var $img = global.$(img);
                        $img.removeData();
                    });
                    super.destroy();
                }
                _createButtons(editing:boolean) {
                    if (!this._el)
                        return;
                    var self = this, $ = global.$, $div = global.$(this._div), $newElems:JQuery;
                    var txtMap = {
                        img_ok: 'txtOk',
                        img_cancel: 'txtCancel',
                        img_edit: 'txtEdit',
                        img_delete: 'txtDelete'
                    };
                    $div.empty();
                    var opts = self._column.options,
                        fn_setUpImages = function ($images) {
                        $images.each(function (index, img) {
                            var $img = global.$(img);
                            img.style.cursor = 'pointer';
                            img.src = opts[img.name];
                            $img.data('cell', self);
                            utils.addToolTip($img, localizable.TEXT[txtMap[img.name]]);
                            $img.attr(constsMOD.DATA_ATTR.DATA_EVENT_SCOPE, self._column.uniqueID);
                        });
                    };

                    if (editing) {
                        this._isEditing = true;
                        $newElems = global.$('<img name="img_ok" alt="ok"/>&nbsp;<img name="img_cancel" alt="cancel"/>');
                        fn_setUpImages($newElems.filter('img'));
                    }
                    else {
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
                }
                update() {
                    if (!this._row)
                        return;
                    if (this._isEditing != this._row.isEditing) {
                        this._createButtons(this._row.isEditing);
                    }
                }
                toString() {
                    return 'ActionsCell';
                }
                get isCanEdit() { return this.grid.isCanEdit; }
                get isCanDelete() { return this.grid.isCanDelete; }
            }

            export class RowSelectorCell extends BaseCell {
                private _content: contentMOD.IContent;
                _init() {
                    var $el = global.$(this.el);
                    $el.addClass(css.rowSelector);
                    var bindInfo: bindMOD.IBindingInfo = {
                        target: null, source: null,
                        targetPath: null, sourcePath: 'isSelected',
                        mode: bindMOD.BINDING_MODE[bindMOD.BINDING_MODE.TwoWay],
                        converter: null, converterParam: null
                    },
                        contentOpts: contentMOD.IContentOptions = {
                            fieldName: 'isSelected',
                            bindingInfo: bindInfo, displayInfo: null
                        };
                    this._content = new RowSelectContent(this.grid.app, this._div, contentOpts, this.row, true);
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._content) {
                        this._content.destroy();
                        this._content = null;
                    }
                    super.destroy();
                }
                toString() {
                    return 'RowSelectorCell';
                }
            }

            export class DetailsCell extends BaseObject {
                private _row: DetailsRow;
                private _el: HTMLTableCellElement;
                private _template: template.Template;
                constructor(options: { row: DetailsRow; td: HTMLTableCellElement; details_id: string; }) {
                    super();
                    this._row = options.row;
                    this._el = options.td;
                    this._init(options);
                }
                _init(options: { td: HTMLElement; details_id: string; }) {
                    var details_id = options.details_id;
                    if (!details_id)
                        return;
                    this._template = new template.Template(this.grid.app, {
                        templateID: details_id
                    });
                    this._el.colSpan = this.grid.columns.length;
                    this._el.appendChild(this._template.el);
                    this._row.el.appendChild(this._el);
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._template) {
                        this._template.destroy();
                        this._template = null;
                    }
                    this._row = null;
                    this._el = null;
                    super.destroy();
                }
                toString() {
                    return 'DetailsCell';
                }
                get el() { return this._el; }
                get row() { return this._row; }
                get grid() { return this._row.grid; }
                get item() { return this._template.dataContext; }
                set item(v) { this._template.dataContext = v; }
                get template() { return this._template; }
            }

            export class Row extends RIAPP.BaseObject {
                private _grid: DataGrid;
                private _el: HTMLElement;
                private _item: collMOD.CollectionItem;
                private _cells: BaseCell[];
                private _objId: string;
                private _expanderCell: ExpanderCell;
                private _actionsCell: ActionsCell;
                private _rowSelectorCell: RowSelectorCell;
                private _isCurrent: boolean;
                private _isDeleted: boolean;
                private _isSelected: boolean;

                constructor(grid: DataGrid, options: { tr: HTMLElement; item: collMOD.CollectionItem; }) {
                    var self = this;
                    super();
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
                        var css = self._grid._onRowStateChanged(self, self._item[self._grid.options.rowStateField]);
                        self._setState(css);
                    };
                    if (!!this._grid.options.rowStateField) {
                        this._item.addOnPropertyChange(this._grid.options.rowStateField, function (s, a) {
                            fn_state();
                        }, this._objId);
                        fn_state();
                    }
                }
                _onError(error, source):boolean {
                    var isHandled = super._onError(error, source);
                    if (!isHandled) {
                        return this.grid._onError(error, source);
                    }
                    return isHandled;
                }
                private _createCells() {
                    var self = this, i = 0;
                    self._cells = new Array(this.columns.length);
                    this.columns.forEach(function (col) {
                        self._cells[i] = self._createCell(col);
                        i += 1;
                    });
                }
                private _createCell(col) {
                    var self = this, td: HTMLTableCellElement = <HTMLTableCellElement>global.document.createElement('td'), cell: BaseCell;
                    if (col instanceof ExpanderColumn) {
                        this._expanderCell = new ExpanderCell(self, { td: td, column: col });
                        cell = this._expanderCell;
                    }
                    else if (col instanceof ActionsColumn) {
                        this._actionsCell = new ActionsCell(self, { td: td, column: col });
                        cell = this._actionsCell;
                    }
                    else if (col instanceof RowSelectorColumn) {
                        this._rowSelectorCell = new RowSelectorCell(self, { td: td, column: col });
                        cell = this._rowSelectorCell;
                    }
                    else
                        cell = new DataCell(self, { td: td, column: col });
                    return cell;
                }
                _onBeginEdit() {
                    var self = this;
                    self._cells.forEach(function (cell) {
                        if (cell instanceof DataCell) {
                            (<DataCell>cell)._beginEdit();
                        }
                    });
                    if (!!this._actionsCell)
                        this._actionsCell.update();
                }
                _onEndEdit(isCanceled:boolean) {
                    var self = this;
                    self._cells.forEach(function (cell) {
                        if (cell instanceof DataCell) {
                            (<DataCell>cell)._endEdit(isCanceled);
                        }
                    });
                    if (!!this._actionsCell)
                        this._actionsCell.update();
                }
                beginEdit() {
                    return this._item.beginEdit();
                }
                endEdit() {
                    return this._item.endEdit();
                }
                cancelEdit() {
                    return this._item.cancelEdit();
                }
                destroy() {
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
                                global.$(this._el).remove();
                            }
                        }
                    }
                    if (!!this._item)
                        this._item.removeNSHandlers(this._objId);
                    this._item = null;
                    this._expanderCell = null;
                    this._el = null;
                    this._grid = null;
                    super.destroy();
                }
                deleteRow() {
                    this._item.deleteItem();
                }
                updateErrorState() {
                    //TODO: add implementation to show explanation of error
                    var hasErrors = this._item.getIsHasErrors();
                    var $el = global.$(this._el);
                    if (hasErrors) {
                        $el.addClass(css.rowError);
                    }
                    else
                        $el.removeClass(css.rowError);
                }
                scrollIntoView(isUp:boolean) {
                    if (!!this._cells && this._cells.length > 0) {
                        this._cells[0].scrollIntoView(isUp);
                    }
                }
                _setState(css:string) {
                    this.cells.forEach(function (cell) {
                        if (cell instanceof DataCell) {
                            (<DataCell>cell)._setState(css);
                        }
                    });
                }
                toString() {
                    return 'Row';
                }
                get el() { return this._el; }
                get grid() { return this._grid; }
                get item() { return this._item; }
                get cells() { return this._cells; }
                get columns() { return this._grid.columns; }
                get uniqueID() { return this._objId; }
                get itemKey() {
                    if (!this._item)
                        return null;
                    return this._item._key;
                }
                get isCurrent() { return this._isCurrent; }
                set isCurrent(v) {
                    var curr = this._isCurrent;
                    if (v !== curr) {
                        var $el = global.$(this._el);
                        this._isCurrent = v;
                        if (v) {
                            $el.addClass(css.rowHighlight);
                        }
                        else {
                            $el.removeClass(css.rowHighlight);
                        }
                        this.raisePropertyChanged('isCurrent');
                    }
                }
                get isSelected() { return this._isSelected; }
                set isSelected(v) {
                    if (this._isSelected != v) {
                        this._isSelected = v;
                        this.raisePropertyChanged('isSelected');
                        this.grid._onRowSelectionChanged(this);
                    }
                }
                get isExpanded() { return this.grid._isRowExpanded(this); }
                set isExpanded(v) {
                    if (v !== this.isExpanded) {
                        if (!v && this.isExpanded) {
                            this.grid._expandDetails(this, false);
                        }
                        else if (v) {
                            this.grid._expandDetails(this, true);
                        }
                    }
                }
                get expanderCell() { return this._expanderCell; }
                get actionsCell() { return this._actionsCell; }
                get isDeleted() {
                    if (!this._el)
                        return true;
                    return this._isDeleted;
                }
                set isDeleted(v) {
                    if (!this._el)
                        return;
                    if (this._isDeleted !== v) {
                        this._isDeleted = v;
                        if (this._isDeleted) {
                            this.isExpanded = false;
                            global.$(this._el).addClass(css.rowDeleted);
                        }
                        else
                            global.$(this._el).removeClass(css.rowDeleted);
                    }
                }
                get isEditing() { return !!this._item && this._item._isEditing; }
            }

            class DefaultAnimation extends RIAPP.BaseObject implements RIAPP.IAnimation {
                private _$el: JQuery;
                constructor() {
                    super();
                    this._$el = null;
                }
                beforeShow(el: HTMLElement): void {
                    this.stop();
                    this._$el = global.$(el);
                    this._$el.hide();
                }
                show(onEnd: () => void): void {
                    this._$el.slideDown('fast', onEnd);
                }
                beforeHide(el: HTMLElement): void {
                    this.stop();
                    this._$el = global.$(el);
                }
                hide(onEnd: () => void): void {
                    this._$el.slideUp('fast', onEnd);
                }
                stop(): void {
                    if (!!this._$el) {
                        this._$el.finish();
                        this._$el = null;
                    }
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    try {
                        this.stop();
                    }
                    finally {
                        super.destroy();
                    }
                }
            }

            export class DetailsRow extends RIAPP.BaseObject {
                private _grid: DataGrid;
                private _el: HTMLTableRowElement;
                private _item: any;
                private _cell: DetailsCell;
                private _parentRow: Row;
                private _objId: string;
                private _$el: JQuery;
                private _isFirstShow: boolean;

                constructor(grid: DataGrid, options: { tr: HTMLTableRowElement; details_id: string; }) {
                    super();
                    this._grid = grid;
                    this._el = options.tr;
                    this._item = null;
                    this._cell = null;
                    this._parentRow = null;
                    this._isFirstShow = true;
                    this._objId = 'drow' + utils.getNewID();
                    this._createCell(options.details_id);
                    this._$el = global.$(this._el);
                    this._$el.addClass(css.rowDetails);
                }
                private _createCell(details_id: string) {
                    var td: HTMLTableCellElement = <HTMLTableCellElement>global.document.createElement('td');
                    this._cell = new DetailsCell({ row: this, td: td, details_id: details_id });
                }
                _setParentRow(row:Row) {
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
                    if (this._isFirstShow)
                        this._initShow();
                    utils.insertAfter(row.el, this._el);
                    //var isLast = this.grid._getLastRow() === this._parentRow;
                    this._show(() => {
                        var row = self._parentRow;
                        if (!row || row._isDestroyCalled)
                            return;
                        if (self.grid.options.isUseScrollIntoDetails)
                            row.scrollIntoView(true);
                    });
                }
                private _initShow() {
                    var animation = this._grid.animation;
                    animation.beforeShow(this._cell.template.el);
                }
                private _show(onEnd: () => void) {
                    var animation = this._grid.animation;
                    this._isFirstShow = false;
                    animation.beforeShow(this._cell.template.el);
                    animation.show(onEnd);
                }
                private _hide(onEnd: () => void) {
                    var animation = this._grid.animation;
                    animation.beforeHide(this._cell.template.el);
                    animation.hide(onEnd);
                }
                destroy() {
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
                    super.destroy();
                }
                toString() {
                    return 'DetailsRow';
                }
                get el() { return this._el; }
                get $el() { return this._$el; }
                get grid() { return this._grid; }
                get item() { return this._item; }
                set item(v) {
                    if (this._item !== v) {
                        this._item = v;
                    }
                }
                get cell() { return this._cell; }
                get uniqueID() { return this._objId; }
                get itemKey() {
                    if (!this._item)
                        return null;
                    return this._item._key;
                }
                get parentRow() { return this._parentRow; }
                set parentRow(v) {
                    var self = this;
                    if (v !== this._parentRow) {
                        if (!!self._parentRow) {
                            self._hide(() => {
                                self._setParentRow(v);
                            });
                        }
                        else {
                            self._setParentRow(v);
                        }
                    }
                }
            }

            export interface IColumnInfo {
                type?: string;
                title?: string;
                sortable?: boolean;
                sortMemberName?: string;
                colCellCss?: string;
                rowCellCss?: string;
                width?: any;
                content?: contentMOD.IContentOptions;
            }

            export class BaseColumn extends RIAPP.BaseObject {
                private _grid: DataGrid;
                private _el: HTMLTableHeaderCellElement;
                private _options: IColumnInfo;
                private _isSelected: boolean;
                private _objId: string;
                private _$extcol: JQuery;
                private _$div: JQuery;

                constructor(grid:DataGrid, options: { th: HTMLTableHeaderCellElement; colinfo: IColumnInfo; }) {
                    super();
                    var self = this;
                    this._grid = grid;
                    this._el = options.th;
                    this._options = options.colinfo;
                    this._isSelected = false;
                    this._objId = 'col' + utils.getNewID();

                    var extcolDiv = global.document.createElement('div');
                    this._$extcol = global.$(extcolDiv);
                    this._$extcol.addClass(css.column);
                    this._grid._appendToHeader(extcolDiv);

                    var div = global.document.createElement('div');
                    this._$div = global.$(div);
                    this._$div.addClass(css.cellDiv).click(function (e) {
                        e.stopPropagation();
                        global.currentSelectable = grid;
                        grid._setCurrentColumn(self);
                        self._onColumnClicked();
                    });

                    extcolDiv.appendChild(div);
                   

                    this.grid._$tableEl.on('click', ['div[', constsMOD.DATA_ATTR.DATA_EVENT_SCOPE,'="',this.uniqueID,'"]'].join(''),
                        function (e) {
                            e.stopPropagation();
                            var $div = global.$(this), cell: BaseCell = $div.data('cell');
                            if (!!cell) {
                                global.currentSelectable = grid;
                                grid._setCurrentColumn(self);
                                if (cell instanceof DataCell) {
                                    if (!!cell._clickTimeOut) {
                                        clearTimeout(cell._clickTimeOut);
                                        cell._clickTimeOut = null;
                                        cell._onDblClicked();
                                    }
                                    else {
                                        cell._onCellClicked();
                                        cell._clickTimeOut = setTimeout(function () {
                                            cell._clickTimeOut = null;
                                        }, 350);
                                    }
                                }
                                else {
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
                _init() {
                    if (!!this.title)
                        this._$div.html(this.title);
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._$extcol.remove();
                    this._$extcol = null;
                    this._$div = null;
                    this._el = null;
                    this._grid = null;
                    super.destroy();
                }
                scrollIntoView(isUp:boolean) {
                    if (!this._$div)
                        return;
                    var div = this._$div.get(0);
                    div.scrollIntoView(!!isUp);
                }
                _onColumnClicked() {
                }
                toString() {
                    return 'BaseColumn';
                }
                get uniqueID() { return this._objId; }
                get el() { return this._el; }
                get $div() { return this._$div; }
                get $extcol() { return this._$extcol; }
                get grid() { return this._grid; }
                get options() { return this._options; }
                get title() { return this._options.title; }
                get isSelected() { return this._isSelected; }
                set isSelected(v) {
                    if (this._isSelected !== v) {
                        this._isSelected = v;
                        if (this._isSelected) {
                            this._$div.addClass(css.columnSelected);
                        }
                        else
                            this._$div.removeClass(css.columnSelected);
                    }
                }
            }

            export class DataColumn extends BaseColumn{
                private _sortOrder: collMOD.SORT_ORDER;
                private _objCache: { [key: string]: BaseObject; };

                constructor(grid: DataGrid, options: { th: HTMLTableHeaderCellElement; colinfo: IColumnInfo; }) {
                    super(grid, options);
                    //the DataCell caches here listbox (for the LookupContent)
                    //so not to create it for every cell
                    this._objCache = {};
                    this.$div.addClass(css.dataColumn);
                }
                _init() {
                    super._init();
                    this._sortOrder = null;
                    if (this.isSortable) {
                        this.$div.addClass(css.colSortable);
                    }
                }
                _onColumnClicked() {
                    if (this.isSortable && !!this.sortMemberName) {
                        var sortOrd = this._sortOrder;
                        this.grid._resetColumnsSort();

                        if (sortOrd == collMOD.SORT_ORDER.ASC) {
                            this.sortOrder = collMOD.SORT_ORDER.DESC;
                        }
                        else if (sortOrd == collMOD.SORT_ORDER.DESC) {
                            this.sortOrder = collMOD.SORT_ORDER.ASC;
                        }
                        else
                            this.sortOrder = collMOD.SORT_ORDER.ASC;
                        this.grid.sortByColumn(this);
                    }
                }
                _cacheObject(key: string, obj: BaseObject) {
                    this._objCache[key] = obj;
                }
                _getCachedObject(key: string) {
                    return this._objCache[key];
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    var self = this;
                    utils.forEachProp(self._objCache, function (key) {
                        self._objCache[key].destroy();
                    });
                    self._objCache = null;
                    super.destroy();
                }
                toString() {
                    return 'DataColumn';
                }
                get isSortable() { return !!(this.options.sortable); }
                get sortMemberName() { return this.options.sortMemberName; }
                get sortOrder() { return this._sortOrder; }
                set sortOrder(v) {
                    this.$div.removeClass([css.colSortable, css.colSortAsc, css.colSortDesc].join(' '));
                    switch (v) {
                        case collMOD.SORT_ORDER.ASC:
                            this.$div.addClass(css.colSortAsc);
                            break;
                        case collMOD.SORT_ORDER.DESC:
                            this.$div.addClass(css.colSortDesc);
                            break;
                        default:
                            if (this.isSortable)
                                this.$div.addClass(css.colSortable);
                    }
                    this._sortOrder = v;
                    this.raisePropertyChanged('sortOrder');
                }
            }

            export class ExpanderColumn extends BaseColumn {
                _init() {
                    super._init();
                    this.$div.addClass(css.rowExpander);
                }
                toString() {
                    return 'ExpanderColumn';
                }
            }

            export class RowSelectorColumn extends BaseColumn {
                private _val: boolean;
                private _$chk: JQuery;
                _init() {
                    super._init();
                    var self = this;
                    this._val = false;
                    this.$div.addClass(css.rowSelector);
                    var $chk = global.$('<input type="checkbox"/>');
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
                }
                _onCheckBoxClicked(isChecked:boolean) {
                    this.grid.selectRows(isChecked);
                }
                toString() {
                    return 'RowSelectorColumn';
                }
                get checked() { return this._val; }
                set checked(v) {
                    var $el = this._$chk;
                    if (v !== null)
                        v = !!v;
                    if (v !== this._val) {
                        this._val = v;
                        if (!!$el)
                            $el.prop('checked',!!this._val);
                        this.raisePropertyChanged('checked');
                    }
                }
            }

            export interface IActionsColumnInfo extends IColumnInfo {
                img_ok?: string;
                img_cancel?: string;
                img_edit?: string;
                img_delete?: string;
            }


            export class ActionsColumn extends BaseColumn {
                _init() {
                    super._init();
                    var self = this, opts: IActionsColumnInfo = this.options;
                    this.$div.addClass(css.rowActions);
                    opts.img_ok = global.getImagePath(opts.img_ok || 'ok.png');
                    opts.img_cancel = global.getImagePath(opts.img_cancel || 'cancel.png');
                    opts.img_edit = global.getImagePath(opts.img_edit || 'edit.png');
                    opts.img_delete = global.getImagePath(opts.img_delete || 'delete.png');
                    this.grid._$tableEl.on("click", 'img[' + constsMOD.DATA_ATTR.DATA_EVENT_SCOPE + '="' + this.uniqueID + '"]',
                        function (e) {
                            e.stopPropagation();
                            var $img = global.$(this), name = this.name, cell: ActionsCell = $img.data('cell');
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
                }
                _onOk(cell: ActionsCell) {
                    if (!cell._row)
                        return;
                    cell._row.endEdit();
                    cell.update();
                }
                _onCancel(cell: ActionsCell) {
                    if (!cell._row)
                        return;
                    cell._row.cancelEdit();
                    cell.update();
                }
                _onDelete(cell: ActionsCell) {
                    if (!cell._row)
                        return;
                    cell._row.deleteRow();
                }
                _onEdit(cell: ActionsCell) {
                    if (!cell._row)
                        return;
                    cell._row.beginEdit();
                    cell.update();
                    this.grid.showEditDialog();
                }
                toString() {
                    return 'ActionsColumn';
                }
            }

            export interface IGridOptions {
                isUseScrollInto: boolean;
                isUseScrollIntoDetails: boolean;
                containerCss: string;
                wrapCss: string;
                headerCss: string;
                rowStateField: string;
                isCanEdit: boolean;
                isCanDelete: boolean;
                isHandleAddNew: boolean;
                details?: { templateID: string; };
                editor?: datadialog.IDialogConstructorOptions;
            }

            export interface IGridConstructorOptions extends IGridOptions {
                el: HTMLTableElement;
                dataSource: collMOD.BaseCollection<collMOD.CollectionItem>;
                animation: RIAPP.IAnimation;
            }

            export class DataGrid extends RIAPP.BaseObject implements RIAPP.ISelectable {
                private _options: IGridConstructorOptions;
                _$tableEl: JQuery;
                _isClearing: boolean;
                private _tableEl: HTMLTableElement;
                private _name: string;
                private _objId: string;
                private _rowMap: { [key: string]: Row; };
                private _rows: Row[];
                private _columns: BaseColumn[];
                private _isDSFilling: boolean;
                private _currentRow: Row;
                private _expandedRow: Row;
                private _details: DetailsRow;
                private _expanderCol: ExpanderColumn;
                private _actionsCol: ActionsColumn;
                private _rowSelectorCol: RowSelectorColumn;
                private _currentColumn: BaseColumn;
                private _editingRow: Row;
                private _isSorting: boolean;
                private _dialog: datadialog.DataEditDialog;
                private _$headerDiv: JQuery;
                private _$wrapDiv: JQuery;
                private _$contaner: JQuery;
                private _app: Application;
                _columnWidthChecker: () => void;

                constructor(app: Application, options: IGridConstructorOptions) {
                    super();
                    this._options = utils.extend(false,
                        {
                            el: null,
                            dataSource: null,
                            animation: null,
                            isUseScrollInto: true,
                            isUseScrollIntoDetails: true,
                            containerCss: null, //div that wraps all table and header
                            wrapCss: null, //div that wraps only table without header
                            headerCss: null, //div inside which are column cells
                            rowStateField: null,
                            isCanEdit: null,
                            isCanDelete: null,
                            isHandleAddNew: false
                        }, options);
                    if (!!this._options.dataSource && !(this._options.dataSource instanceof collMOD.BaseCollection))
                        throw new Error(RIAPP.ERRS.ERR_GRID_DATASRC_INVALID);
                   
                    this._app = app;
                    this._columnWidthChecker = () => { };
                    var $t = global.$(this._options.el);
                    this._tableEl = this._options.el;
                    this._$tableEl = $t;
                    $t.addClass(css.dataTable);
                    this._name = $t.attr(constsMOD.DATA_ATTR.DATA_NAME);
                    this._objId = 'grd' + utils.getNewID();
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
                    global._trackSelectable(this);
                    _gridCreated(this);
                }
                _getEventNames() {
                    var base_events = super._getEventNames();
                    return ['row_expanded', 'row_selected', 'page_changed', 'row_state_changed',
                        'cell_dblclicked'].concat(base_events);
                }
                addOnRowExpanded(fn: (sender: DataGrid, args: { old_expandedRow: Row; expandedRow: Row; isExpanded: boolean; }) => void , namespace?: string) {
                    this.addHandler('row_expanded', fn, namespace);
                }
                removeOnRowExpanded(namespace?: string) {
                    this.removeHandler('row_expanded', namespace);
                }
                addOnRowSelected(fn: (sender: DataGrid, args: { row: Row; }) => void , namespace?: string) {
                    this.addHandler('row_selected', fn, namespace);
                }
                removeOnRowSelected(namespace?: string) {
                    this.removeHandler('row_selected', namespace);
                }
                addOnPageChanged(fn: (sender: DataGrid, args: {}) => void , namespace?: string) {
                    this.addHandler('page_changed', fn, namespace);
                }
                removeOnPageChanged(namespace?: string) {
                    this.removeHandler('page_changed', namespace);
                }
                addOnRowStateChanged(fn: (sender: DataGrid, args: { row: Row; val: any; css: string; }) => void , namespace?: string) {
                    this.addHandler('row_state_changed', fn, namespace);
                }
                removeOnRowStateChanged(namespace?: string) {
                    this.removeHandler('row_state_changed', namespace);
                }
                addOnCellDblClicked(fn: (sender: DataGrid, args: { cell: BaseCell; }) => void , namespace?: string) {
                    this.addHandler('cell_dblclicked', fn, namespace);
                }
                removeOnCellDblClicked(namespace?: string) {
                    this.removeHandler('cell_dblclicked', namespace);
                }
                _isRowExpanded(row: Row): boolean {
                    return this._expandedRow === row;
                }
                _appendToHeader(el: HTMLElement) {
                    this._$headerDiv.append(el);
                }
                _setCurrentColumn(column:BaseColumn) {
                    if (!!this._currentColumn)
                        this._currentColumn.isSelected = false;
                    this._currentColumn = column;
                    if (!!this._currentColumn)
                        this._currentColumn.isSelected = true;
                }
                _parseColumnAttr(column_attr:string, content_attr:string) {
                    var defaultOp: IColumnInfo = {
                        type: COLUMN_TYPE.DATA, //default column type
                        title: null,
                        sortable: false,
                        sortMemberName: null,
                        content: null
                    }, options: IColumnInfo;

                    var temp_opts = global.parser.parseOptions(column_attr);
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
                }
                _findUndeleted(row:Row, isUp:boolean) {
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
                    }
                    else {
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
                }
                _updateCurrent(row: Row, withScroll:boolean) {
                    this.currentRow = row;
                    if (withScroll && !!row && !row.isDeleted)
                        this._scrollToCurrent(true);
                }
                _scrollToCurrent(isUp:boolean) {
                    var row = this.currentRow;
                    if (!!row) {
                        row.scrollIntoView(isUp);
                    }
                }
                _onRowStateChanged(row:Row, val) {
                    var args = { row: row, val: val, css: null };
                    this.raiseEvent('row_state_changed', args);
                    return args.css;
                }
                _onCellDblClicked(cell:BaseCell) {
                    var args = { cell: cell };
                    this.raiseEvent('cell_dblclicked', args);
                }
                _onError(error, source):boolean {
                    var isHandled = super._onError(error, source);
                    if (!isHandled) {
                        return global._onError(error, source);
                    }
                    return isHandled;
                }
                _onDSCurrentChanged() {
                    var ds = this.dataSource, cur: collMOD.CollectionItem;
                    if (!!ds)
                        cur = ds.currentItem;
                    if (!cur)
                        this._updateCurrent(null, false);
                    else {
                        this._updateCurrent(this._rowMap[cur._key], false);
                    }
                }
                _onDSCollectionChanged(args: collMOD.ICollChangedArgs<collMOD.CollectionItem>) {
                    var self = this, row: Row, items = args.items;
                    switch (args.change_type) {
                        case collMOD.COLL_CHANGE_TYPE.RESET:
                            if (!this._isDSFilling)
                                this._refreshGrid();
                            break;
                        case collMOD.COLL_CHANGE_TYPE.ADDED:
                            if (!this._isDSFilling) //if items are filling then it will be appended when it ends
                                self._appendItems(args.items);
                            break;
                        case collMOD.COLL_CHANGE_TYPE.REMOVE:
                            items.forEach(function (item) {
                                var row = self._rowMap[item._key];
                                if (!!row) {
                                    self._removeRow(row);
                                }
                            });
                            break;
                        case collMOD.COLL_CHANGE_TYPE.REMAP_KEY:
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
                }
                _onDSFill(args: collMOD.ICollFillArgs<collMOD.CollectionItem>) {
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
                            }, 0);
                        }
                        setTimeout(function () {
                            if (self._isDestroyCalled)
                                return;
                            self._updateColsDim();
                        }, 0);
                    }
                    else {
                        self._isDSFilling = true;
                        if (!self._isSorting) {
                            if (!args.isPageChanged)
                                self._resetColumnsSort();
                        }
                    }
                }
                _onPageChanged() {
                    if (!!this._rowSelectorCol) {
                        this._rowSelectorCol.checked = false;
                    }
                    this._scrollToCurrent(false);
                    this.raiseEvent('page_changed', {});
                }
                _onItemEdit(item, isBegin, isCanceled) {
                    var row = this._rowMap[item._key];
                    if (!row)
                        return;
                    if (isBegin) {
                        row._onBeginEdit();
                        this._editingRow = row;
                    }
                    else {
                        row._onEndEdit(isCanceled);
                        this._editingRow = null;
                    }
                    this.raisePropertyChanged('editingRow');
                }
                _onItemAdded(args: collMOD.ICollItemAddedArgs<collMOD.CollectionItem>) {
                    var item = args.item, row = this._rowMap[item._key];
                    if (!row)
                        return;
                    this._updateCurrent(row, true);
                    //row.isExpanded = true;
                    if (this._options.isHandleAddNew && !args.isAddNewHandled) {
                        args.isAddNewHandled = this.showEditDialog();
                    }
                }
                _onItemStatusChanged(item: collMOD.CollectionItem, oldChangeType: collMOD.STATUS) {
                    var newChangeType = item._changeType, ds = this.dataSource;
                    var row = this._rowMap[item._key];
                    if (!row)
                        return;
                    if (newChangeType === collMOD.STATUS.DELETED) {
                        row.isDeleted = true;
                        var row2 = this._findUndeleted(row, true);
                        if (!row2) {
                            row2 = this._findUndeleted(row, false);
                        }
                        if (!!row2) {
                            ds.currentItem = row2.item;
                        }
                    }
                    else if (oldChangeType === collMOD.STATUS.DELETED && newChangeType !== collMOD.STATUS.DELETED) {
                        row.isDeleted = false;
                    }
                }
                _onRowSelectionChanged(row:Row) {
                    this.raiseEvent('row_selected', { row: row });
                }
                _onDSErrorsChanged(item: collMOD.CollectionItem) {
                    var row = this._rowMap[item._key];
                    if (!row)
                        return;
                    row.updateErrorState();
                }
                _resetColumnsSort() {
                    this.columns.forEach(function (col) {
                        if (col instanceof DataColumn) {
                            (<DataColumn>col).sortOrder = null;
                        }
                    });
                }
                _bindDS() {
                    var self = this, ds = this.dataSource;
                    if (!ds) return;
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
                        if (ds !== sender) return;
                        self._onItemStatusChanged(args.item, args.oldChangeType);
                    }, self._objId);
                    ds.addOnItemAdded(function (sender, args) {
                        if (ds !== sender) return;
                        self._onItemAdded(args);
                    }, self._objId);
                }
                _unbindDS() {
                    var self = this, ds = this.dataSource;
                    if (!ds) return;
                    ds.removeNSHandlers(self._objId);
                }
                _getLastRow() {
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
                }
                _removeRow(row: Row) {
                    if (this._expandedRow === row) {
                        this.collapseDetails();
                    }
                    if (this._rows.length === 0)
                        return;
                    var rowkey = row.itemKey, i = utils.removeFromArray(this._rows, row), oldRow;
                    try {
                        if (i > -1) {
                            oldRow = row;
                            if (!oldRow._isDestroyCalled)
                                oldRow.destroy();
                        }
                    }
                    finally {
                        if (!!this._rowMap[rowkey])
                            delete this._rowMap[rowkey];
                    }
                }
                _clearGrid() {
                    if (this._rows.length === 0)
                        return;
                    this._isClearing = true;
                    try {
                        this.collapseDetails();
                        var self = this, tbody = self._tBodyEl, newTbody = global.document.createElement('tbody');
                        this._tableEl.replaceChild(newTbody, tbody);
                        var rows = this._rows;
                        this._rows = [];
                        this._rowMap = {};
                        rows.forEach(function (row) {
                            row.destroy();
                        });
                    }
                    finally {
                        this._isClearing = false;
                    }
                    this._currentRow = null;
                }
                _updateColsDim() {
                    var width = 0, headerDiv = this._$headerDiv;
                    this._columns.forEach(function (col) {
                        width += col.el.offsetWidth;
                    });
                    headerDiv.width(width);
                    this._columns.forEach(function (col) {
                        col.$extcol.width(col.el.offsetWidth);
                    });
                }
                _wrapTable() {
                    var $t = this._$tableEl, headerDiv: JQuery, wrapDiv: JQuery, container: JQuery, self = this;

                    $t.wrap(global.$('<div></div>').addClass(css.wrapDiv));
                    wrapDiv = $t.parent();
                    wrapDiv.wrap(global.$('<div></div>').addClass(css.container));
                    container = wrapDiv.parent();

                    headerDiv = global.$('<div></div>').addClass(css.headerDiv).insertBefore(wrapDiv);
                    global.$(this._tHeadRow).addClass(css.columnInfo);
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
                    var tw = $t.width();
                    self._columnWidthChecker = function () {
                        var test = $t.width();
                        if (tw !== test) {
                            tw = test;
                            self._updateColsDim();
                        }
                    };
                }
                _unWrapTable() {
                    var $t = this._$tableEl;
                    if (!this._$headerDiv)
                        return;
                    this._columnWidthChecker = () => { };
                    this._$headerDiv.remove();
                    this._$headerDiv = null;
                    //remove wrapDiv
                    $t.unwrap();
                    this._$wrapDiv = null;
                    //remove container
                    $t.unwrap();
                    this._$contaner = null;
                }
                _createColumns() {
                    var self = this, headCells = this._tHeadCells, cnt = headCells.length, cellInfo: { th: HTMLTableHeaderCellElement; colinfo: IColumnInfo; }[] = [];
                    var th, attr: IColumnInfo;
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
                }
                _createColumn(options: {th: HTMLTableHeaderCellElement; colinfo: IColumnInfo;}) {
                    var col: BaseColumn;
                    switch (options.colinfo.type) {
                        case COLUMN_TYPE.ROW_EXPANDER:
                            if (!this._expanderCol) {
                                col = new ExpanderColumn(this, options);
                                this._expanderCol = <ExpanderColumn>col;
                            }
                            break;
                        case COLUMN_TYPE.ROW_ACTIONS:
                            if (!this._actionsCol) {
                                col = new ActionsColumn(this, options);
                                this._actionsCol = <ActionsColumn>col;
                            }
                            break;
                        case COLUMN_TYPE.ROW_SELECTOR:
                            if (!this._rowSelectorCol) {
                                col = new RowSelectorColumn(this, options);
                                this._rowSelectorCol = <RowSelectorColumn>col;
                            }
                            break;
                        case COLUMN_TYPE.DATA:
                            col = new DataColumn(this, options);
                            break;
                        default:
                            throw new Error(utils.format(RIAPP.ERRS.ERR_GRID_COLTYPE_INVALID, options.colinfo.type));
                    }
                    return col;
                }
                _appendItems(newItems: collMOD.CollectionItem[]) {
                    if (this._isDestroyCalled)
                        return;
                    var self = this, item, tbody = this._tBodyEl;
                    for (var i = 0, k = newItems.length; i < k; i += 1) {
                        item = newItems[i];
                        if (!self._rowMap[item._key])  //not row for item already exists
                            self._createRowForItem(tbody, item);
                    }
                }
                _onKeyDown(key:number, event: Event) {
                    var ds = this.dataSource, Keys = constsMOD.KEYS, self = this;
                    if (!ds)
                        return;
                    switch (key) {
                        case Keys.up:
                            event.preventDefault();
                            if (ds.movePrev(true)) {
                                if (self.isUseScrollInto) {
                                    self._scrollToCurrent(false);
                                }
                            }
                            break;
                        case Keys.down:
                            event.preventDefault();
                            if (ds.moveNext(true)) {
                                if (self.isUseScrollInto) {
                                    self._scrollToCurrent(false);
                                }
                            }
                            break;
                        case Keys.pageDown:
                            /*
                             if (!!this._currentRow && !!this._currentRow.expanderCell && !this._currentRow.isExpanded) {
                             this._currentRow.expanderCell._onCellClicked();
                             event.preventDefault();
                             }
                             */
                            if (ds.pageIndex > 0)
                                ds.pageIndex = ds.pageIndex - 1;
                            break;
                        case Keys.pageUp:
                            /*
                             if (!!this._currentRow && !!this._currentRow.expanderCell && !!this._currentRow.isExpanded) {
                             this._currentRow.expanderCell._onCellClicked();
                             event.preventDefault();
                             }
                             */
                            ds.pageIndex = ds.pageIndex + 1;
                            break;
                        case Keys.enter:
                            if (!!this._currentRow && !!this._actionsCol) {
                                if (this._currentRow.isEditing) {
                                    event.preventDefault();
                                }
                                else {
                                    event.preventDefault();
                                }
                            }
                            break;
                        case Keys.esc:
                            if (!!this._currentRow && !!this._actionsCol) {
                                if (this._currentRow.isEditing) {
                                    event.preventDefault();
                                }
                            }
                            break;
                        case Keys.space:
                            if (!!this._rowSelectorCol && !!this._currentRow && !this._currentRow.isEditing) {
                                event.preventDefault();
                            }
                            break;
                    }
                }
                _onKeyUp(key:number, event:Event) {
                    var ds = this.dataSource, Keys = constsMOD.KEYS;
                    if (!ds)
                        return;
                    switch (key) {
                        case Keys.enter:
                            if (!!this._currentRow && !!this._actionsCol) {
                                if (this._currentRow.isEditing) {
                                    this._actionsCol._onOk(this._currentRow.actionsCell);
                                    event.preventDefault();
                                }
                                else {
                                    this._actionsCol._onEdit(this._currentRow.actionsCell);
                                    event.preventDefault();
                                }
                            }
                            break;
                        case Keys.esc:
                            if (!!this._currentRow && !!this._actionsCol) {
                                if (this._currentRow.isEditing) {
                                    this._actionsCol._onCancel(this._currentRow.actionsCell);
                                    event.preventDefault();
                                }
                            }
                            break;
                        case Keys.space:
                            if (!!this._rowSelectorCol && !!this._currentRow && !this._currentRow.isEditing) {
                                event.preventDefault();
                                this._currentRow.isSelected = !this._currentRow.isSelected;
                            }
                            break;
                    }
                }
                //Full grid refresh
                _refreshGrid() {
                    var self = this, ds = this.dataSource;
                    self._clearGrid();
                    if (!ds) return;
                    var docFr = global.document.createDocumentFragment(), oldTbody = this._tBodyEl, newTbody = global.document.createElement('tbody');
                    ds.items.forEach(function (item, pos) {
                        self._createRowForItem(docFr, item, pos);
                    });
                    newTbody.appendChild(docFr);
                    self._tableEl.replaceChild(newTbody, oldTbody);
                }
                _createRowForItem(parent, item, pos?:number) {
                    var self = this, tr = global.document.createElement('tr');
                    var gridRow = new Row(self, { tr: tr, item: item });
                    self._rowMap[item._key] = gridRow;
                    self._rows.push(gridRow);
                    parent.appendChild(gridRow.el);
                    return gridRow;
                }
                _createDetails() {
                    var details_id = this._options.details.templateID;
                    var tr: HTMLTableRowElement = <HTMLTableRowElement>global.document.createElement('tr');
                    return new DetailsRow(this, { tr: tr, details_id: details_id });
                }
                _expandDetails(parentRow:Row, expanded:boolean) {
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
                    }
                    else {
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
                }
                sortByColumn(column: DataColumn) {
                    var self=this, ds = this.dataSource;
                    var sorts = column.sortMemberName.split(';');
                    self._isSorting = true;
                    var promise = ds.sort(sorts, column.sortOrder);
                    promise.always(function () {
                        self._isSorting = false;
                    });
                }
                selectRows(isSelect:boolean) {
                    this._rows.forEach(function (row) {
                        if (row.isDeleted)
                            return;
                        row.isSelected = isSelect;
                    });
                }
                findRowByItem(item: collMOD.CollectionItem) {
                    var row = this._rowMap[item._key];
                    if (!row)
                        return null;
                    return row;
                }
                collapseDetails() {
                    if (!this._details)
                        return;
                    var old = this._expandedRow;
                    if (!!old) {
                        this._expandedRow = null;
                        this._details._setParentRow(null);
                        this.raiseEvent('row_expanded', { old_expandedRow: old, expandedRow: null, isExpanded: false });
                    }
                }
                getSelectedRows() {
                    var res = [];
                    this._rows.forEach(function (row) {
                        if (row.isDeleted)
                            return;
                        if (row.isSelected) {
                            res.push(row);
                        }
                    });
                    return res;
                }
                showEditDialog() {
                    if (!this._options.editor || !this._options.editor.templateID || !this._editingRow)
                        return false;
                    var editorOptions: datadialog.IDialogConstructorOptions, item = this._editingRow.item;
                    if (!item.isEditing)
                        item.beginEdit();
                    if (!this._dialog) {
                        editorOptions = utils.extend(false, {
                            dataContext: item
                        }, this._options.editor);
                        this._dialog = new datadialog.DataEditDialog(this.app, editorOptions);
                    }
                    else
                        this._dialog.dataContext = item;
                    this._dialog.canRefresh = !!this.dataSource.permissions.canRefreshRow && !item._isNew;
                    this._dialog.show();
                    return true;
                }
                scrollToCurrent(isUp:boolean) {
                    this._scrollToCurrent(isUp);
                }
                addNew() {
                    var ds = this.dataSource;
                    try {
                        ds.addNew();
                        this.showEditDialog();
                    } catch (ex) {
                        global.reThrow(ex, this._onError(ex, this));
                    }
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    _gridDestroyed(this);
                    global._untrackSelectable(this);
                    if (!!this._details) {
                        this._details.destroy();
                        this._details = null;
                    }
                    if (this._options.animation) {
                        this._options.animation.stop();
                        this._options.animation = null;
                    }
                    if (!!this._dialog) {
                        this._dialog.destroy();
                        this._dialog = null;
                    }
                    this.dataSource = null;
                    this._unWrapTable();
                    this._$tableEl.removeClass(css.dataTable);
                    global.$(this._tHeadRow).removeClass(css.columnInfo);
                    this._tableEl = null;
                    this._$tableEl = null;
                    this._app = null;
                    super.destroy();
                }
                get app() { return this._app; }
                get $container() { return this._$contaner; }
                get options() { return this._options; }
                get _tBodyEl() { return this._tableEl.tBodies[0]; }
                get _tHeadEl() { return this._tableEl.tHead; }
                get _tFootEl() { return this._tableEl.tFoot; }
                get _tHeadRow(): HTMLTableRowElement {
                    if (!this._tHeadEl)
                        return null;
                    var trs = this._tHeadEl.rows;
                    if (trs.length === 0)
                        return null;
                    return <HTMLTableRowElement>trs[0];
                }
                get _tHeadCells() {
                    var row = this._tHeadRow;
                    if (!row)
                        return [];
                    return ArrayHelper.fromCollection(row.cells);
                }
                get containerEl() { return <HTMLElement>this._$contaner.get(0); }
                get uniqueID() { return this._objId; }
                get name() { return this._name; }
                get dataSource() { return this._options.dataSource; }
                set dataSource(v: collMOD.BaseCollection<collMOD.CollectionItem>) {
                    if (v === this.dataSource)
                        return;
                    if (this.dataSource !== null) {
                        this._unbindDS();
                    }
                    this._clearGrid();
                    this._options.dataSource = v;
                    if (this.dataSource !== null)
                        this._bindDS();
                    this.raisePropertyChanged('dataSource');
                }
                get rows() { return this._rows; }
                get columns() { return this._columns; }
                get currentRow() { return this._currentRow; }
                set currentRow(row) {
                    var ds = this.dataSource, old = this._currentRow, isChanged = false;
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
                    }
                    else
                        ds.currentItem = null;
                    if (isChanged)
                        this.raisePropertyChanged('currentRow');
                }
                get editingRow() { return this._editingRow; }
                get isCanEdit() {
                    if (this._options.isCanEdit !== null)
                        return this._options.isCanEdit;
                    var ds = this.dataSource;
                    return !!ds && ds.permissions.canEditRow;
                }
                get isCanDelete() {
                    if (this._options.isCanDelete !== null)
                        return this._options.isCanDelete;
                    var ds = this.dataSource;
                    return !!ds && ds.permissions.canDeleteRow;
                }
                get isCanAddNew() {
                    var ds = this.dataSource;
                    return !!ds && ds.permissions.canAddRow;
                }
                get isUseScrollInto() { return this._options.isUseScrollInto; }
                set isUseScrollInto(v) { this._options.isUseScrollInto = v; }
                get animation() {
                    if (!this.options.animation) {
                        this.options.animation = new DefaultAnimation();
                    }
                    return this.options.animation;
                }
            }

            export interface IGridViewOptions extends IGridOptions, baseElView.IViewOptions {
            }

            export class GridElView extends baseElView.BaseElView {
                private _dataSource: collMOD.BaseCollection<collMOD.CollectionItem>;
                private _grid: DataGrid;
                private _gridEventCommand: mvvm.ICommand;
                private _options: IGridViewOptions;
                private _animation: RIAPP.IAnimation;
                toString() {
                    return 'GridElView';
                }
                _init(options: IGridViewOptions) {
                    super._init(options);
                    this._dataSource = null;
                    this._animation = null;
                    this._grid = null;
                    this._gridEventCommand = null;
                    this._options = options;
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._dataSource) {
                        this.dataSource = null;
                    }
                    this._gridEventCommand = null;
                    super.destroy();
                }
                private _createGrid() {
                    var options: IGridConstructorOptions = utils.extend(false,
                        {
                            el: <HTMLTableElement>this._el,
                            dataSource: this._dataSource,
                            animation: this._animation
                        }, this._options);
                    this._grid = new DataGrid(this.app, options);
                    this._bindGridEvents();
                    this._onGridCreated(this._grid);
                }
                private _bindGridEvents() {
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

                }
                invokeGridEvent(eventName, args) {
                    var self = this, data = { eventName: eventName, args: args };
                    if (!!self._gridEventCommand) {
                        self._gridEventCommand.execute(self, data);
                    }
                }
                _onGridCreated(grid: DataGrid) {
                }
                _onGridDestroyed(grid: DataGrid) {
                }
                get dataSource() { return this._dataSource; }
                set dataSource(v) {
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
                }
                get grid() { return this._grid; }
                get gridEventCommand() { return this._gridEventCommand; }
                set gridEventCommand(v) {
                    var old = this._gridEventCommand;
                    if (v !== old) {
                        if (!!this._gridEventCommand)
                            this.invokeGridEvent('command_disconnected', {});
                        this._gridEventCommand = v;
                        if (!!this._gridEventCommand)
                            this.invokeGridEvent('command_connected', {});
                    }
                }
                get animation() { return this._animation; }
                set animation(v) {
                    if (this._animation !== v) {
                        this._animation = v;
                        if (!!this._grid) {
                            this._grid.options.animation = v;
                        }
                        this.raisePropertyChanged('animation');
                    }
                }
            }

            global.registerElView('table', GridElView);
            global.registerElView('datagrid', GridElView);
            global.onModuleLoaded('datagrid', datagrid);
        }
    }
}

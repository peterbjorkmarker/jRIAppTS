/// <reference path="..\jriapp.d.ts"/>
//using AMD to load user module
import COMMON = require("common");
'use strict';
//using static import for CORE jriapp modules
import MOD = RIAPP.MOD;
import GRIDMOD = RIAPP.MOD.datagrid;
var global = RIAPP.global, utils = global.utils;

export class GridElView extends GRIDMOD.GridElView {
    private _gridEvents: COMMON.IGridEvents;
    _init(options: GRIDMOD.IGridViewOptions) {
        super._init(options);
        var self = this, grid = self.grid;
        //example of binding to dataGrid events using strongly typed methods
        if (!!grid) {
            grid.addOnPageChanged(function (s, a) {
                self._onGridPageChanged();
            }, self.uniqueID);
            grid.addOnRowSelected(function (s, a) {
                self._onGridRowSelected(a.row);
            }, self.uniqueID);
            grid.addOnRowExpanded(function (s, a) {
                self._onGridRowExpanded(a.old_expandedRow, a.expandedRow, a.isExpanded);
            }, self.uniqueID);
        }
    }
    _onGridPageChanged() {
        if (!!this._gridEvents) {
            this._gridEvents.onDataPageChanged();
        }
    }
    _onGridRowSelected(row: GRIDMOD.Row) {
        if (!!this._gridEvents) {
            this._gridEvents.onRowSelected(row.item);
        }
    }
    _onGridRowExpanded(oldRow: GRIDMOD.Row, row: GRIDMOD.Row, isExpanded: boolean) {
        if (!!this._gridEvents) {
            if (isExpanded) {
                this._gridEvents.onRowExpanded(row.item);
            }
            else {
                this._gridEvents.onRowCollapsed(oldRow.item);
            }
        }
    }
    destroy() {
        if (this._isDestroyed)
            return;
        this._isDestroyCalled = true;
        if (!!this._gridEvents) {
            this._gridEvents.regFocusGridFunc(null);
        }
        this._gridEvents = null;
        super.destroy();
    }
    get gridEvents() { return this._gridEvents; }
    set gridEvents(v) {
        var self = this;
        if (this._gridEvents !== v) {
            if (!!this._gridEvents) {
                this._gridEvents.regFocusGridFunc(null);
            }
            this._gridEvents = v;
            this.raisePropertyChanged('gridEvents');
            //a new gridEvents object was set
            if (!!this._gridEvents) {
                this._gridEvents.regFocusGridFunc(() => {
                    if (!!self.grid) {
                        self.grid.scrollToCurrent(true);
                        global.currentSelectable = self.grid;
                    }
                });
            }
        }
    }
}

export function initModule(app: RIAPP.Application) {
    app.registerElView('my_grid', GridElView);
    return {};
}
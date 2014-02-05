var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function(require, exports) {
    'use strict';

    //using static import for CORE jriapp modules
    var MOD = RIAPP.MOD;
    var GRIDMOD = RIAPP.MOD.datagrid;
    var global = RIAPP.global, utils = global.utils;

    var GridElView = (function (_super) {
        __extends(GridElView, _super);
        function GridElView() {
            _super.apply(this, arguments);
        }
        //override base method
        GridElView.prototype._onGridCreated = function (grid) {
            var self = this;

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
        };
        GridElView.prototype._onGridPageChanged = function () {
            if (!!this._gridEvents) {
                this._gridEvents.onDataPageChanged();
            }
        };
        GridElView.prototype._onGridRowSelected = function (row) {
            if (!!this._gridEvents) {
                this._gridEvents.onRowSelected(row.item);
            }
        };
        GridElView.prototype._onGridRowExpanded = function (oldRow, row, isExpanded) {
            if (!!this._gridEvents) {
                if (isExpanded) {
                    this._gridEvents.onRowExpanded(row.item);
                } else {
                    this._gridEvents.onRowCollapsed(oldRow.item);
                }
            }
        };
        GridElView.prototype.destroy = function () {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            if (!!this._gridEvents) {
                this._gridEvents.regFocusGridFunc(null);
            }
            this._gridEvents = null;
            _super.prototype.destroy.call(this);
        };
        Object.defineProperty(GridElView.prototype, "gridEvents", {
            get: function () {
                return this._gridEvents;
            },
            set: function (v) {
                var self = this;
                if (this._gridEvents !== v) {
                    if (!!this._gridEvents) {
                        this._gridEvents.regFocusGridFunc(null);
                    }
                    this._gridEvents = v;
                    this.raisePropertyChanged('gridEvents');

                    //a new gridEvents object was set
                    if (!!this._gridEvents) {
                        this._gridEvents.regFocusGridFunc(function () {
                            if (!!self.grid) {
                                self.grid.scrollToCurrent(true);
                                global.currentSelectable = self.grid;
                            }
                        });
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        return GridElView;
    })(GRIDMOD.GridElView);
    exports.GridElView = GridElView;

    function initModule(app) {
        app.registerElView('my_grid', GridElView);
        return {};
    }
    exports.initModule = initModule;
});
//# sourceMappingURL=gridElView.js.map

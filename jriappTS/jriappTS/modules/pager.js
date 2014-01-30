var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RIAPP;
(function (RIAPP) {
    (function (MOD) {
        (function (pager) {
            var utils;
            RIAPP.global.addOnInitialize(function (s, args) {
                utils = s.utils;
            });
            pager.css = {
                pager: 'ria-data-pager',
                info: 'pager-info',
                currentPage: 'pager-current-page',
                otherPage: 'pager-other-page'
            };
            var PAGER_TXT = RIAPP.localizable.PAGER;

            var Pager = (function (_super) {
                __extends(Pager, _super);
                function Pager(el, dataSource, options) {
                    _super.call(this);
                    this._el = el;
                    this._$el = RIAPP.global.$(this._el);
                    this._objId = 'pgr' + utils.getNewID();
                    if (!!dataSource && !(dataSource instanceof RIAPP.MOD.collection.BaseCollection))
                        throw new Error(RIAPP.ERRS.ERR_PAGER_DATASRC_INVALID);
                    this._dataSource = dataSource;
                    this._showTip = utils.check.isNt(options.showTip) ? true : !!options.showTip;
                    this._showInfo = utils.check.isNt(options.showInfo) ? false : !!options.showInfo;
                    this._showFirstAndLast = utils.check.isNt(options.showFirstAndLast) ? true : !!options.showFirstAndLast;
                    this._showPreviousAndNext = utils.check.isNt(options.showPreviousAndNext) ? false : !!options.showPreviousAndNext;
                    this._showNumbers = utils.check.isNt(options.showNumbers) ? true : !!options.showNumbers;
                    this._rowsPerPage = 0;
                    this._rowCount = 0;
                    this._currentPage = 1;
                    this._useSlider = utils.check.isNt(options.useSlider) ? true : !!options.useSlider;
                    this._sliderSize = utils.check.isNt(options.sliderSize) ? 25 : options.sliderSize;
                    this._hideOnSinglePage = utils.check.isNt(options.hideOnSinglePage) ? true : !!options.hideOnSinglePage;
                    this._$el.addClass(pager.css.pager);
                    if (!!this._dataSource) {
                        this._bindDS();
                    }
                }
                Pager.prototype._createElement = function (tag) {
                    return RIAPP.global.$(RIAPP.global.document.createElement(tag));
                };
                Pager.prototype._render = function () {
                    var $el = this._$el, rowCount, currentPage, pageCount;
                    this._clearContent();

                    if (this.rowsPerPage <= 0) {
                        return;
                    }

                    rowCount = this.rowCount;
                    if (rowCount == 0) {
                        return;
                    }
                    currentPage = this.currentPage;
                    if (currentPage == 0) {
                        return;
                    }

                    pageCount = this.pageCount;

                    if (this.hideOnSinglePage && (pageCount == 1)) {
                        $el.hide();
                    } else {
                        $el.show();

                        if (this.showInfo) {
                            var $span = this._createElement('span');
                            var info = utils.format(PAGER_TXT.pageInfo, currentPage, pageCount);
                            $span.addClass(pager.css.info).text(info).appendTo($el);
                        }

                        if (this.showFirstAndLast && (currentPage != 1)) {
                            $el.append(this._createFirst());
                        }

                        if (this.showPreviousAndNext && (currentPage != 1)) {
                            $el.append(this._createPrevious());
                        }

                        if (this.showNumbers) {
                            var start = 1, end = pageCount, sliderSize = this.sliderSize, half, above, below;

                            if (this.useSlider && (sliderSize > 0)) {
                                half = Math.floor(((sliderSize - 1) / 2));
                                above = (currentPage + half) + ((sliderSize - 1) % 2);
                                below = (currentPage - half);

                                if (below < 1) {
                                    above += (1 - below);
                                    below = 1;
                                }

                                if (above > pageCount) {
                                    below -= (above - pageCount);

                                    if (below < 1) {
                                        below = 1;
                                    }

                                    above = pageCount;
                                }

                                start = below;
                                end = above;
                            }

                            for (var i = start; i <= end; i++) {
                                if (i === currentPage) {
                                    $el.append(this._createCurrent());
                                } else {
                                    $el.append(this._createOther(i));
                                }
                            }
                        }

                        if (this.showPreviousAndNext && (currentPage != pageCount)) {
                            $el.append(this._createNext());
                        }

                        if (this.showFirstAndLast && (currentPage != pageCount)) {
                            $el.append(this._createLast());
                        }
                    }
                };
                Pager.prototype._setDSPageIndex = function (page) {
                    this.dataSource.pageIndex = page - 1;
                };
                Pager.prototype._onPageSizeChanged = function (ds) {
                    this.rowsPerPage = ds.pageSize;
                };
                Pager.prototype._onPageIndexChanged = function (ds) {
                    this.currentPage = ds.pageIndex + 1;
                };
                Pager.prototype._onTotalCountChanged = function (ds) {
                    this.rowCount = ds.totalCount;
                };
                Pager.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._unbindDS();
                    this._clearContent();
                    this._$el.removeClass(pager.css.pager);
                    this._el = null;
                    this._$el = null;
                    _super.prototype.destroy.call(this);
                };
                Pager.prototype._bindDS = function () {
                    var self = this, ds = this._dataSource;
                    if (!ds)
                        return;

                    ds.addOnPropertyChange('pageIndex', function (sender, args) {
                        self._onPageIndexChanged(ds);
                    }, self._objId);
                    ds.addOnPropertyChange('pageSize', function (sender, args) {
                        self._onPageSizeChanged(ds);
                    }, self._objId);
                    ds.addOnPropertyChange('totalCount', function (sender, args) {
                        self._onTotalCountChanged(ds);
                    }, self._objId);
                    this._currentPage = ds.pageIndex + 1;
                    this._rowsPerPage = ds.pageSize;
                    this._rowCount = ds.totalCount;
                    this._render();
                };
                Pager.prototype._unbindDS = function () {
                    var self = this, ds = this._dataSource;
                    if (!ds)
                        return;
                    ds.removeNSHandlers(self._objId);
                };
                Pager.prototype._clearContent = function () {
                    this._$el.empty();
                };
                Pager.prototype._createLink = function (page, text, tip) {
                    var a = this._createElement('a'), self = this;
                    a.text('' + text);
                    a.attr('href', 'javascript:void(0)');

                    if (!!tip) {
                        utils.addToolTip(a, tip);
                    }
                    a.click(function (e) {
                        e.preventDefault();
                        self._setDSPageIndex(page);
                        self.currentPage = page;
                    });

                    return a;
                };
                Pager.prototype._createFirst = function () {
                    var $span = this._createElement('span'), tip, a;

                    if (this.showTip) {
                        tip = PAGER_TXT.firstPageTip;
                    }
                    a = this._createLink(1, PAGER_TXT.firstText, tip);
                    $span.addClass(pager.css.otherPage).append(a);
                    return $span;
                };
                Pager.prototype._createPrevious = function () {
                    var span = this._createElement('span'), previousPage = this.currentPage - 1, tip, a;

                    if (this.showTip) {
                        tip = utils.format(PAGER_TXT.prevPageTip, previousPage);
                    }

                    a = this._createLink(previousPage, PAGER_TXT.previousText, tip);
                    span.addClass(pager.css.otherPage).append(a);
                    return span;
                };
                Pager.prototype._createCurrent = function () {
                    var span = this._createElement('span'), currentPage = this.currentPage;

                    span.text('' + currentPage);

                    if (this.showTip) {
                        utils.addToolTip(span, this._buildTip(currentPage));
                    }

                    span.addClass(pager.css.currentPage);
                    return span;
                };
                Pager.prototype._createOther = function (page) {
                    var span = this._createElement('span'), tip, a;

                    if (this.showTip) {
                        tip = this._buildTip(page);
                    }

                    a = this._createLink(page, '' + page, tip);
                    span.addClass(pager.css.otherPage);
                    span.append(a);
                    return span;
                };
                Pager.prototype._createNext = function () {
                    var span = this._createElement('span'), nextPage = this.currentPage + 1, tip, a;

                    if (this.showTip) {
                        tip = utils.format(PAGER_TXT.nextPageTip, nextPage);
                    }
                    a = this._createLink(nextPage, PAGER_TXT.nextText, tip);
                    span.addClass(pager.css.otherPage).append(a);
                    return span;
                };
                Pager.prototype._createLast = function () {
                    var span = this._createElement('span'), tip, a;

                    if (this.showTip) {
                        tip = PAGER_TXT.lastPageTip;
                    }
                    a = this._createLink(this.pageCount, PAGER_TXT.lastText, tip);
                    span.addClass(pager.css.otherPage).append(a);
                    return span;
                };
                Pager.prototype._buildTip = function (page) {
                    var rowsPerPage = this.rowsPerPage, rowCount = this.rowCount, start = (((page - 1) * rowsPerPage) + 1), end = (page == this.pageCount) ? rowCount : (page * rowsPerPage), tip = '';

                    if (page == this.currentPage) {
                        tip = utils.format(PAGER_TXT.showingTip, start, end, rowCount);
                    } else {
                        tip = utils.format(PAGER_TXT.showTip, start, end, rowCount);
                    }
                    return tip;
                };
                Pager.prototype.toString = function () {
                    return 'Pager';
                };
                Object.defineProperty(Pager.prototype, "el", {
                    get: function () {
                        return this._el;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pager.prototype, "dataSource", {
                    get: function () {
                        return this._dataSource;
                    },
                    set: function (v) {
                        if (v === this._dataSource)
                            return;
                        if (this._dataSource !== null) {
                            this._unbindDS();
                        }
                        this._dataSource = v;
                        if (this._dataSource !== null)
                            this._bindDS();
                        this.raisePropertyChanged('dataSource');
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pager.prototype, "pageCount", {
                    get: function () {
                        var rowCount = this.rowCount, rowsPerPage = this.rowsPerPage, result;

                        if ((rowCount === 0) || (rowsPerPage === 0)) {
                            return 0;
                        }

                        if ((rowCount % rowsPerPage) === 0) {
                            return (rowCount / rowsPerPage);
                        } else {
                            result = (rowCount / rowsPerPage);
                            result = Math.floor(result) + 1;
                            return result;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pager.prototype, "rowCount", {
                    get: function () {
                        return this._rowCount;
                    },
                    set: function (v) {
                        if (this._rowCount != v) {
                            this._rowCount = v;
                            this._render();
                            this.raisePropertyChanged('rowCount');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pager.prototype, "rowsPerPage", {
                    get: function () {
                        return this._rowsPerPage;
                    },
                    set: function (v) {
                        if (this._rowsPerPage != v) {
                            this._rowsPerPage = v;
                            this._render();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pager.prototype, "currentPage", {
                    get: function () {
                        return this._currentPage;
                    },
                    set: function (v) {
                        if (this._currentPage != v) {
                            this._currentPage = v;
                            this._render();
                            this.raisePropertyChanged('currentPage');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pager.prototype, "useSlider", {
                    get: function () {
                        return this._useSlider;
                    },
                    set: function (v) {
                        if (this._useSlider != v) {
                            this._useSlider = v;
                            this._render();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pager.prototype, "sliderSize", {
                    get: function () {
                        return this._sliderSize;
                    },
                    set: function (v) {
                        if (this._sliderSize != v) {
                            this._sliderSize = v;
                            this._render();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pager.prototype, "hideOnSinglePage", {
                    get: function () {
                        return this._hideOnSinglePage;
                    },
                    set: function (v) {
                        if (this._hideOnSinglePage != v) {
                            this._hideOnSinglePage = v;
                            this._render();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pager.prototype, "showTip", {
                    get: function () {
                        return this._showTip;
                    },
                    set: function (v) {
                        if (this._showTip !== v) {
                            this._showTip = v;
                            this._render();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pager.prototype, "showInfo", {
                    get: function () {
                        return this._showInfo;
                    },
                    set: function (v) {
                        if (this._showInfo !== v) {
                            this._showInfo = v;
                            this._render();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pager.prototype, "showFirstAndLast", {
                    get: function () {
                        return this._showFirstAndLast;
                    },
                    set: function (v) {
                        if (this._showFirstAndLast !== v) {
                            this._showFirstAndLast = v;
                            this._render();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pager.prototype, "showPreviousAndNext", {
                    get: function () {
                        return this._showPreviousAndNext;
                    },
                    set: function (v) {
                        if (this._showPreviousAndNext !== v) {
                            this._showPreviousAndNext = v;
                            this._render();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pager.prototype, "showNumbers", {
                    get: function () {
                        return this._showNumbers;
                    },
                    set: function (v) {
                        if (this._showNumbers !== v) {
                            this._showNumbers = v;
                            this._render();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return Pager;
            })(RIAPP.BaseObject);
            pager.Pager = Pager;

            var PagerElView = (function (_super) {
                __extends(PagerElView, _super);
                function PagerElView(app, el, options) {
                    var self = this;
                    this._pager = null;
                    this._options = options;
                    this._pager = new Pager(el, null, this._options);
                    this._pager.addOnDestroyed(function () {
                        self._pager = null;
                        self.invokePropChanged('pager');
                        self.raisePropertyChanged('pager');
                    });
                    _super.call(this, app, el, options);
                }
                PagerElView.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._pager && !this._pager._isDestroyCalled) {
                        this._pager.destroy();
                    }
                    this._pager = null;
                    _super.prototype.destroy.call(this);
                };
                PagerElView.prototype.toString = function () {
                    return 'PagerElView';
                };
                Object.defineProperty(PagerElView.prototype, "dataSource", {
                    get: function () {
                        if (this._isDestroyCalled)
                            return undefined;
                        return this._pager.dataSource;
                    },
                    set: function (v) {
                        if (this._isDestroyCalled)
                            return;
                        if (this.dataSource !== v) {
                            this._pager.dataSource = v;
                            this.raisePropertyChanged('dataSource');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PagerElView.prototype, "pager", {
                    get: function () {
                        return this._pager;
                    },
                    enumerable: true,
                    configurable: true
                });
                return PagerElView;
            })(RIAPP.MOD.baseElView.BaseElView);
            pager.PagerElView = PagerElView;

            RIAPP.global.registerElView('pager', PagerElView);
            RIAPP.global.onModuleLoaded('pager', pager);
        })(MOD.pager || (MOD.pager = {}));
        var pager = MOD.pager;
    })(RIAPP.MOD || (RIAPP.MOD = {}));
    var MOD = RIAPP.MOD;
})(RIAPP || (RIAPP = {}));
//# sourceMappingURL=pager.js.map

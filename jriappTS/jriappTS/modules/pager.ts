module RIAPP {
    export module MOD {
        export module pager {
            var utils: MOD.utils.Utils;
            RIAPP.global.addOnInitialize((s, args) => {
                utils = s.utils;
            });
          export var css = {
                pager: 'ria-data-pager',
                info: 'pager-info',
                currentPage: 'pager-current-page',
                otherPage: 'pager-other-page'
            };
            var PAGER_TXT = RIAPP.localizable.PAGER;

            export interface IPagerOptions {
                showTip?: boolean;
                showInfo?: boolean;
                showNumbers?: boolean;
                showFirstAndLast?: boolean;
                showPreviousAndNext?: boolean;
                useSlider?: boolean;
                hideOnSinglePage?: boolean;
                sliderSize?: number;
            }

            export class Pager extends RIAPP.BaseObject {
                private _el: HTMLElement;
                private _$el: JQuery;
                private _objId: string;
                private _dataSource: collection.BaseCollection<collection.CollectionItem>;
                private _showTip: boolean;
                private _showInfo: boolean;
                private _showFirstAndLast: boolean;
                private _showPreviousAndNext: boolean;
                private _showNumbers: boolean;
                private _rowsPerPage: number;
                private _rowCount: number;
                private _currentPage: number;
                private _useSlider: boolean;
                private _sliderSize: number;
                private _hideOnSinglePage: boolean;

                constructor(el:HTMLElement, dataSource: collection.BaseCollection<collection.CollectionItem>, options:IPagerOptions) {
                    super();
                    this._el = el;
                    this._$el = global.$(this._el);
                    this._objId = 'pgr' + utils.getNewID();
                    if (!!dataSource && !(dataSource instanceof collection.BaseCollection))
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
                    this._$el.addClass(css.pager);
                    if (!!this._dataSource) {
                        this._bindDS();
                    }
                }
                _createElement(tag:string) {
                    return global.$(global.document.createElement(tag));
                }
                _render() {
                    var $el = this._$el, rowCount:number, currentPage:number, pageCount:number;
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
                    }
                    else {
                        $el.show();

                        if (this.showInfo) {
                            var $span = this._createElement('span');
                            var info = utils.format(PAGER_TXT.pageInfo, currentPage, pageCount);
                            $span.addClass(css.info).text(info).appendTo($el);
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
                                }
                                else {
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
                }
                _setDSPageIndex(page:number) {
                    this.dataSource.pageIndex = page - 1;
                }
                _onPageSizeChanged(ds: collection.BaseCollection<collection.CollectionItem>) {
                    this.rowsPerPage = ds.pageSize;
                }
                _onPageIndexChanged(ds: collection.BaseCollection<collection.CollectionItem>) {
                    this.currentPage = ds.pageIndex + 1;
                }
                _onTotalCountChanged(ds: collection.BaseCollection<collection.CollectionItem>) {
                    this.rowCount = ds.totalCount;
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._unbindDS();
                    this._clearContent();
                    this._$el.removeClass(css.pager);
                    this._el = null;
                    this._$el = null;
                    super.destroy();
                }
                _bindDS() {
                    var self = this, ds = this._dataSource;
                    if (!ds) return;

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
                }
                _unbindDS() {
                    var self = this, ds = this._dataSource;
                    if (!ds) return;
                    ds.removeNSHandlers(self._objId);
                }
                _clearContent() {
                    this._$el.empty();
                }
                _createLink(page:number, text:string, tip?:string) {
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
                }
                _createFirst() {
                    var $span = this._createElement('span'), tip:string, a;

                    if (this.showTip) {
                        tip = PAGER_TXT.firstPageTip;
                    }
                    a = this._createLink(1, PAGER_TXT.firstText, tip);
                    $span.addClass(css.otherPage).append(a);
                    return $span;
                }
                _createPrevious() {
                    var span = this._createElement('span'), previousPage = this.currentPage - 1, tip:string, a;

                    if (this.showTip) {
                        tip = utils.format(PAGER_TXT.prevPageTip, previousPage);
                    }

                    a = this._createLink(previousPage, PAGER_TXT.previousText, tip);
                    span.addClass(css.otherPage).append(a);
                    return span;
                }
                _createCurrent() {
                    var span = this._createElement('span'), currentPage = this.currentPage;

                    span.text('' + currentPage);

                    if (this.showTip) {
                        utils.addToolTip(span, this._buildTip(currentPage));
                    }

                    span.addClass(css.currentPage);
                    return span;
                }
                _createOther(page:number) {
                    var span = this._createElement('span'), tip:string, a;

                    if (this.showTip) {
                        tip = this._buildTip(page);
                    }

                    a = this._createLink(page, ''+page, tip);
                    span.addClass(css.otherPage);
                    span.append(a);
                    return span;
                }
                _createNext() {
                    var span = this._createElement('span'), nextPage = this.currentPage + 1, tip, a;

                    if (this.showTip) {
                        tip = utils.format(PAGER_TXT.nextPageTip, nextPage);
                    }
                    a = this._createLink(nextPage, PAGER_TXT.nextText, tip);
                    span.addClass(css.otherPage).append(a);
                    return span;
                }
                _createLast() {
                    var span = this._createElement('span'), tip, a;

                    if (this.showTip) {
                        tip = PAGER_TXT.lastPageTip;
                    }
                    a = this._createLink(this.pageCount, PAGER_TXT.lastText, tip);
                    span.addClass(css.otherPage).append(a);
                    return span;
                }
                _buildTip(page:number) {
                    var rowsPerPage = this.rowsPerPage, rowCount = this.rowCount,
                        start = (((page - 1) * rowsPerPage) + 1),
                        end = (page == this.pageCount) ? rowCount : (page * rowsPerPage), tip = '';

                    if (page == this.currentPage) {
                        tip = utils.format(PAGER_TXT.showingTip, start, end, rowCount);
                    }
                    else {
                        tip = utils.format(PAGER_TXT.showTip, start, end, rowCount);
                    }
                    return tip;
                }
                toString() {
                    return 'Pager';
                }
                get el() { return this._el; }
                get dataSource() { return this._dataSource; }
                set dataSource(v: collection.BaseCollection<collection.CollectionItem>) {
                    if (v === this._dataSource)
                        return;
                    if (this._dataSource !== null) {
                        this._unbindDS();
                    }
                    this._dataSource = v;
                    if (this._dataSource !== null)
                        this._bindDS();
                    this.raisePropertyChanged('dataSource');
                }
                get pageCount() {
                    var rowCount = this.rowCount, rowsPerPage = this.rowsPerPage, result;

                    if ((rowCount === 0) || (rowsPerPage === 0)) {
                        return 0;
                    }

                    if ((rowCount % rowsPerPage) === 0) {
                        return (rowCount / rowsPerPage);
                    }
                    else {
                        result = (rowCount / rowsPerPage);
                        result = Math.floor(result) + 1;
                        return result;
                    }
                }
                get rowCount() { return this._rowCount; }
                set rowCount(v) {
                    if (this._rowCount != v) {
                        this._rowCount = v;
                        this._render();
                        this.raisePropertyChanged('rowCount');
                    }
                }
                get rowsPerPage() { return this._rowsPerPage; }
                set rowsPerPage(v) {
                    if (this._rowsPerPage != v) {
                        this._rowsPerPage = v;
                        this._render();
                    }
                }
                get currentPage() { return this._currentPage; }
                set currentPage(v) {
                    if (this._currentPage != v) {
                        this._currentPage = v;
                        this._render();
                        this.raisePropertyChanged('currentPage');
                    }
                }
                get useSlider() { return this._useSlider; }
                set useSlider(v) {
                    if (this._useSlider != v) {
                        this._useSlider = v;
                        this._render();
                    }
                }
                get sliderSize() { return this._sliderSize; }
                set sliderSize(v) {
                    if (this._sliderSize != v) {
                        this._sliderSize = v;
                        this._render();
                    }
                }
                get hideOnSinglePage() { return this._hideOnSinglePage; }
                set hideOnSinglePage(v) {
                    if (this._hideOnSinglePage != v) {
                        this._hideOnSinglePage = v;
                        this._render();
                    }
                }
                get showTip() { return this._showTip; }
                set showTip(v) {
                    if (this._showTip !== v) {
                        this._showTip = v;
                        this._render();
                    }
                }
                get showInfo() { return this._showInfo; }
                set showInfo(v) {
                    if (this._showInfo !== v) {
                        this._showInfo = v;
                        this._render();
                    }
                }
                get showFirstAndLast() { return this._showFirstAndLast; }
                set showFirstAndLast(v) {
                    if (this._showFirstAndLast !== v) {
                        this._showFirstAndLast = v;
                        this._render();
                    }
                }
                get showPreviousAndNext() { return this._showPreviousAndNext; }
                set showPreviousAndNext(v) {
                    if (this._showPreviousAndNext !== v) {
                        this._showPreviousAndNext = v;
                        this._render();
                    }
                }
                get showNumbers() { return this._showNumbers; }
                set showNumbers(v) {
                    if (this._showNumbers !== v) {
                        this._showNumbers = v;
                        this._render();
                    }
                }
            }

            export interface IPagerViewOptions extends IPagerOptions, baseElView.IViewOptions {
            }

            export class PagerElView extends baseElView.BaseElView {
                private _options: IPagerOptions;
                private _dataSource: collection.BaseCollection<collection.CollectionItem>;
                private _pager: Pager;
                constructor(app: Application, el: HTMLElement, options: IPagerViewOptions) {
                    this._dataSource = null;
                    this._pager = null;
                    this._options = options;
                    super(app, el, options);
                }
                destroy() {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._pager && !this._pager._isDestroyCalled) {
                        this._pager.destroy();
                    }
                    this._pager = null;
                    this._dataSource = null;
                    super.destroy();
                }
                toString() {
                    return 'PagerElView';
                }
                get dataSource() { return this._dataSource; }
                set dataSource(v) {
                    var self = this;
                    if (this._dataSource !== v) {
                        this._dataSource = v;
                        if (!!this._pager)
                            this._pager.destroy();
                        this._pager = null;
                        if (!!this._dataSource && this._dataSource.isPagingEnabled) {
                            this._pager = new Pager(this._el, this._dataSource, this._options);
                            this._pager.addOnDestroyed(function () {
                                self._pager = null;
                                self.invokePropChanged('pager');
                            });
                        }
                        self.invokePropChanged('pager');
                    }
                }
                get pager() { return this._pager; }
            }

            global.registerElView('pager', PagerElView);
            global.onModuleLoaded('pager', pager);
        }
    }
}

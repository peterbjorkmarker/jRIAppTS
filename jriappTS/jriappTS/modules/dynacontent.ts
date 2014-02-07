module RIAPP {
    export module MOD {
        export module dynacontent {
            import constsMOD = RIAPP.MOD.consts;
            import utilsMOD = RIAPP.MOD.utils;
            import elviewMOD = RIAPP.MOD.baseElView;
            import templMOD = RIAPP.MOD.template;

            var utils: utilsMOD.Utils, global = RIAPP.global;
            global.addOnInitialize((s, args) => {
                utils = s.utils;
            });


            export interface IDynaContentOptions extends elviewMOD.IViewOptions {
                animate?: string;
            }

            export class DynaContentElView extends elviewMOD.BaseElView implements templMOD.ITemplateEvents {
                private _dataContext: any;
                private _prevTemplateID: string;
                private _templateID: string;
                private _template: templMOD.Template;
                private _animate: RIAPP.IAnimate;

                constructor(app: RIAPP.Application, el: HTMLElement, options: IDynaContentOptions) {
                    super(app, el, options);
                    this._dataContext = null;
                    this._prevTemplateID = null;
                    this._templateID = null;
                    this._template = null;
                    this._animate = (!!options.animate) ? app.getAnimation(options.animate) : null;
                }
                templateLoading(template: templMOD.Template): void {
                    if (this._isDestroyCalled)
                        return;
                    var isFirstShow = !this._prevTemplateID,
                        canShow = !!this._animate && (this._animate.isAnimateFirstPage || (!this._animate.isAnimateFirstPage && !isFirstShow));
                    if (canShow) {
                        this._animate.beforeShow(template, isFirstShow);
                    }
                }
                templateLoaded(template: templMOD.Template): void {
                    if (this._isDestroyCalled)
                        return;
                    if (!utils.isContained(template.el, this.el)) {
                        this.el.appendChild(template.el);
                    }
                   
                    var isFirstShow = !this._prevTemplateID,
                        canShow = !!this._animate && (this._animate.isAnimateFirstPage || (!this._animate.isAnimateFirstPage && !isFirstShow));
                    if (canShow) {
                        this._animate.show(template, isFirstShow);
                    }
                }
                templateUnLoading(template: templMOD.Template): void {
                    //noop
                }
                private _templateChanging(oldName: string, newName: string) {
                    var self = this;
                    try {
                        if (!newName && !!this._template) {
                            if (!!this._animate && !!this._template.loadedElem) {
                                this._animate.stop();
                                this._animate.beforeHide(this._template);
                                this._animate.hide(this._template).always(() => {
                                    if (self._isDestroyCalled)
                                        return;
                                    self._template.destroy();
                                    self._template = null;
                                    self.raisePropertyChanged('template');

                                });
                            }
                            else {
                                self._template.destroy();
                                self._template = null;
                                self.raisePropertyChanged('template');
                            }
                            return;
                        }
                    } catch (ex) {
                        this._onError(ex, this);
                        global._throwDummy(ex);
                    }

                    try {
                        if (!this._template) {
                            this._template = new templMOD.Template(this.app,
                                {
                                    templateID: newName,
                                    dataContext: this._dataContext,
                                    templEvents: this
                                });
                            self.raisePropertyChanged('template');
                            return;
                        }
                        if (!!this._animate && !!this._template.loadedElem) {
                            this._animate.stop();
                            this._animate.beforeHide(this._template);
                            this._animate.hide(this._template).always(() => {
                                if (self._isDestroyCalled)
                                    return;
                                self._template.templateID = newName;
                            });
                        }
                        else
                            self._template.templateID = newName;
                    } catch (ex) {
                        this._onError(ex, this);
                        global._throwDummy(ex);
                    }
                }
                destroy() {
                    if (this._isDestroyed)
                        return
                    this._isDestroyCalled = true;
                    if (!!this._animate) {
                        if (utils.check.isBaseObj(this._animate)) {
                            (<RIAPP.BaseObject><any>this._animate).destroy();
                        }
                        this._animate = null;
                    }
                    if (!!this._template) {
                        this._template.destroy();
                        this._template = null;
                    }
                    this._dataContext = null;
                    super.destroy();
                }
                get template() { return this._template; }

                get templateID() {
                    return this._templateID;
                }
                set templateID(v: string) {
                    var old = this._templateID;
                    if (old !== v) {
                        this._prevTemplateID = this._templateID;
                        this._templateID = v;
                        this._templateChanging(old, v);
                        this.raisePropertyChanged('templateID');
                    }
                }
                get dataContext() { return this._dataContext; }
                set dataContext(v) {
                    if (this._dataContext !== v) {
                        this._dataContext = v;
                        if (!!this._template) {
                            this._template.dataContext = this._dataContext;
                        }
                        this.raisePropertyChanged('dataContext');
                    }
                }
            }

            global.registerElView('dynacontent', DynaContentElView);
            global.onModuleLoaded('dynacontent', dynacontent);
        }
    }
}

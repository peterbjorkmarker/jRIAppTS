module RIAPP {
    export module MOD {
        export module dynacontent {
            import constsMOD = RIAPP.MOD.consts;
            import elviewMOD = RIAPP.MOD.baseElView;
            import templMOD = RIAPP.MOD.template;

            export class DynaContentElView extends elviewMOD.BaseElView {
                private _dataContext: any;
                private _template: templMOD.Template;
                constructor(app: RIAPP.Application, el: HTMLElement, options: elviewMOD.IViewOptions) {
                    super(app, el, options);
                    this._dataContext = null;
                    this._template = null;
                }
                private _templateChanged() {
                    if (!this._template) {
                        this.raisePropertyChanged('templateID');
                        this.raisePropertyChanged('template');
                        return;
                    }
                    this.$el.empty().append(this._template.el);
                    this.raisePropertyChanged('templateID');
                    this.raisePropertyChanged('template');
                }
                updateTemplate(name: string) {
                    var self = this;
                    try {
                        if (!name && !!this._template) {
                            this._template.destroy();
                            this._template = null;
                            self._templateChanged();
                            return;
                        }
                    } catch (ex) {
                        this._onError(ex, this);
                        global._throwDummy(ex);
                    }

                    try {
                        if (!this._template) {
                            this._template = new templMOD.Template(this.app, name);
                            this._template.dataContext = this._dataContext;
                            this._template.addOnPropertyChange('templateID', function (s, a) {
                                self._templateChanged();
                            }, this._objId);
                            self._templateChanged();
                            return;
                        }

                        this._template.templateID = name;
                    } catch (ex) {
                        this._onError(ex, this);
                        global._throwDummy(ex);
                    }
                }
                destroy() {
                    if (this._isDestroyed)
                        return
                    this._isDestroyCalled = true;
                    if (!!this._template) {
                        this._template.destroy();
                        this._template = null;
                    }
                    this._dataContext = null;
                    super.destroy();
                }
                get templateID() {
                    if (!this._template)
                        return null;
                    return this._template.templateID;
                }
                set templateID(v: string) { this.updateTemplate(v); }
                get template() { return this._template; }
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

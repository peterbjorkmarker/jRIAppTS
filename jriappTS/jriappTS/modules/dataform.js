var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RIAPP;
(function (RIAPP) {
    (function (MOD) {
        (function (dataform) {
            //local variables for optimization
                        var utils = RIAPP.global.utils, consts = RIAPP.global.consts;
            dataform.css = {
                dataform: 'ria-dataform'
            };
            var ERRTEXT = RIAPP.localizable.VALIDATE;
            var DataForm = (function (_super) {
                __extends(DataForm, _super);
                function DataForm(app, el) {
                                _super.call(this);
                    var self = this, parent;
                    this._app = app;
                    this._el = el;
                    this._$el = RIAPP.global.$(this._el);
                    this._objId = 'frm' + utils.getNewID();
                    this._dataContext = null;
                    this._$el.addClass(dataform.css.dataform);
                    this._isEditing = false;
                    this._isDisabled = false;
                    this._content = [];
                    this._lfTime = null;
                    this._contentCreated = false;
                    this._supportEdit = false;
                    this._supportErrNotify = false;
                    this._parentDataForm = null;
                    this._errors = null;
                    parent = this._getParentDataForm(this._el);
                    //if this form is nested inside another dataform
                    //subscribe for parent's destroy event
                    if(!!parent) {
                        self._parentDataForm = app.getElementView(parent);
                        self._parentDataForm.addOnDestroyed(function (sender, args) {
                            //destroy itself if parent form is destroyed
                            if(!self._isDestroyCalled) {
                                self.destroy();
                            }
                        }, self._objId);
                    }
                }
                Object.defineProperty(DataForm.prototype, "_DATA_CONTENT_SELECTOR", {
                    get: function () {
                        return '*[' + consts.DATA_ATTR.DATA_CONTENT + ']:not([' + consts.DATA_ATTR.DATA_COLUMN + '])';
                    },
                    enumerable: true,
                    configurable: true
                });
                DataForm.prototype._getBindings = function () {
                    if(!this._lfTime) {
                        return [];
                    }
                    var arr = this._lfTime.getObjs(), res = [];
                    for(var i = 0, len = arr.length; i < len; i += 1) {
                        if(utils.check.isBinding(arr[i])) {
                            res.push(arr[i]);
                        }
                    }
                    return res;
                };
                DataForm.prototype._getElViews = function () {
                    if(!this._lfTime) {
                        return [];
                    }
                    var arr = this._lfTime.getObjs(), res = [];
                    for(var i = 0, len = arr.length; i < len; i += 1) {
                        if(utils.check.isElView(arr[i])) {
                            res.push(arr[i]);
                        }
                    }
                    return res;
                };
                DataForm.prototype._updateIsDisabled = function () {
                    var i, len, bnd, vw, bindings = this._getBindings(), elViews = this._getElViews(), DataFormElView = this.app._getElViewType(consts.ELVIEW_NM.DATAFORM);
                    for(i = 0 , len = bindings.length; i < len; i += 1) {
                        bnd = bindings[i];
                        bnd.isDisabled = this._isDisabled;
                    }
                    for(i = 0 , len = elViews.length; i < len; i += 1) {
                        vw = elViews[i];
                        if((vw instanceof DataFormElView) && !!(vw).form) {
                            (vw).form.isDisabled = this._isDisabled;
                        }
                    }
                };
                DataForm.prototype._updateContent = function () {
                    var dctx = this._dataContext, self = this;
                    if(this._contentCreated) {
                        this._content.forEach(function (content) {
                            content.dataContext = dctx;
                            content.isEditing = self.isEditing;
                        });
                        var bindings = this._getBindings();
                        bindings.forEach(function (binding) {
                            if(!binding.isSourceFixed) {
                                binding.source = dctx;
                            }
                        });
                        return;
                    }
                    if(!dctx) {
                        return;
                    }
                    var supportsGetFieldInfo = utils.check.isFunction(dctx.getFieldInfo);
                    var elements = RIAPP.ArrayHelper.fromList(this._el.querySelectorAll(self._DATA_CONTENT_SELECTOR)), isEditing = this.isEditing;
                    elements.forEach(function (el) {
                        //check if the element inside nested dataform
                        if(self._getParentDataForm(el) !== self._el) {
                            return;
                        }
                        var attr = el.getAttribute(consts.DATA_ATTR.DATA_CONTENT), op = MOD.baseContent.parseContentAttr(attr);
                        if(!!op.fieldName && !op.fieldInfo) {
                            if(!supportsGetFieldInfo) {
                                throw new Error(RIAPP.ERRS.ERR_DCTX_HAS_NO_FIELDINFO);
                            }
                            op.fieldInfo = dctx.getFieldInfo(op.fieldName);
                            if(!op.fieldInfo) {
                                throw new Error(utils.format(RIAPP.ERRS.ERR_DBSET_INVALID_FIELDNAME, '', op.fieldName));
                            }
                        }
                        var contentType = self.app._getContentType(op);
                        var content = self.app._getContent(contentType, op, el, dctx, isEditing);
                        if(!!content) {
                            self._content.push(content);
                        }
                    });
                    this._lfTime = self.app._bindElements(this._el, dctx, true);
                    this._contentCreated = true;
                };
                DataForm.prototype._getParentDataForm = /*
                in case of dataforms nesting, elements parent dataform can be nested dataform
                this function returns element dataform
                */
                function (el) {
                    if(!el) {
                        return null;
                    }
                    var parent = el.parentElement, document = RIAPP.global.document, attr, opts;
                    if(!!parent) {
                        if(parent === this._el) {
                            return this._el;
                        }
                        attr = parent.getAttribute(consts.DATA_ATTR.DATA_VIEW);
                        if(!attr) {
                            return this._getParentDataForm(parent);
                        }
                        opts = RIAPP.global.parser.parseOptions(attr);
                        if(opts.length > 0 && opts[0].name == consts.ELVIEW_NM.DATAFORM) {
                            return parent;
                        } else {
                            return this._getParentDataForm(parent);
                        }
                    }
                    return null;
                };
                DataForm.prototype._onDSErrorsChanged = function () {
                    var dataContext = this._dataContext;
                    this.validationErrors = dataContext.getAllErrors();
                };
                DataForm.prototype._bindDS = function () {
                    var dataContext = this._dataContext, self = this;
                    if(!dataContext) {
                        return;
                    }
                    dataContext.addOnDestroyed(function (s, a) {
                        self.dataContext = null;
                    }, self._objId);
                    if(this._supportEdit) {
                        dataContext.addOnPropertyChange('isEditing', function (sender, args) {
                            self.isEditing = sender.isEditing;
                        }, self._objId);
                    }
                    if(this._supportErrNotify) {
                        (dataContext).addOnErrorsChanged(function (sender, args) {
                            self._onDSErrorsChanged();
                        }, self._objId);
                    }
                };
                DataForm.prototype._unbindDS = function () {
                    var dataContext = this._dataContext;
                    this.validationErrors = null;
                    if(!!dataContext && !dataContext._isDestroyCalled) {
                        dataContext.removeNSHandlers(this._objId);
                    }
                };
                DataForm.prototype._clearContent = function () {
                    this._content.forEach(function (content) {
                        content.destroy();
                    });
                    this._content = [];
                    if(!!this._lfTime) {
                        this._lfTime.destroy();
                        this._lfTime = null;
                    }
                    this._contentCreated = false;
                };
                DataForm.prototype.destroy = function () {
                    if(this._isDestroyed) {
                        return;
                    }
                    this._isDestroyCalled = true;
                    this._clearContent();
                    this._$el.removeClass(dataform.css.dataform);
                    this._el = null;
                    this._$el = null;
                    this._unbindDS();
                    var parentDataForm = this._parentDataForm;
                    this._parentDataForm = null;
                    if(!!parentDataForm && !parentDataForm._isDestroyCalled) {
                        parentDataForm.removeNSHandlers(this._objId);
                    }
                    this._dataContext = null;
                    this._contentCreated = false;
                    this._app = null;
                    _super.prototype.destroy.call(this);
                };
                DataForm.prototype.toString = function () {
                    return 'DataForm';
                };
                Object.defineProperty(DataForm.prototype, "app", {
                    get: function () {
                        return this._app;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataForm.prototype, "el", {
                    get: function () {
                        return this._el;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataForm.prototype, "dataContext", {
                    get: function () {
                        return this._dataContext;
                    },
                    set: function (v) {
                        var dataContext;
                        try  {
                            if(v === this._dataContext) {
                                return;
                            }
                            if(!!v && !utils.check.isBaseObj(v)) {
                                throw new Error(RIAPP.ERRS.ERR_DATAFRM_DCTX_INVALID);
                            }
                            this._unbindDS();
                            this._supportEdit = false;
                            this._supportErrNotify = false;
                            this._dataContext = v;
                            dataContext = this._dataContext;
                            if(!!dataContext) {
                                this._supportEdit = utils.check.isEditable(dataContext);
                                this._supportErrNotify = MOD.binding._checkIsErrorNotification(dataContext);
                            }
                            this._bindDS();
                            this._updateContent();
                            this.raisePropertyChanged('dataContext');
                            if(!!dataContext) {
                                if(this._supportEdit && this._isEditing !== (dataContext).isEditing) {
                                    this.isEditing = (dataContext).isEditing;
                                }
                                if(this._supportErrNotify) {
                                    this._onDSErrorsChanged();
                                }
                            }
                        } catch (ex) {
                            RIAPP.global.reThrow(ex, this._onError(ex, this));
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataForm.prototype, "isEditing", {
                    get: function () {
                        return this._isEditing;
                    },
                    set: function (v) {
                        var dataContext = this._dataContext;
                        if(!dataContext) {
                            return;
                        }
                        var isEditing = this._isEditing, editable;
                        if(!this._supportEdit && v !== isEditing) {
                            this._isEditing = v;
                            this._updateContent();
                            this.raisePropertyChanged('isEditing');
                            return;
                        }
                        if(this._supportEdit) {
                            editable = dataContext;
                        }
                        if(v !== isEditing) {
                            try  {
                                if(v) {
                                    editable.beginEdit();
                                } else {
                                    editable.endEdit();
                                }
                            } catch (ex) {
                                RIAPP.global.reThrow(ex, this._onError(ex, dataContext));
                            }
                        }
                        if(this._supportEdit && editable.isEditing !== isEditing) {
                            this._isEditing = editable.isEditing;
                            this._updateContent();
                            this.raisePropertyChanged('isEditing');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataForm.prototype, "validationErrors", {
                    get: function () {
                        return this._errors;
                    },
                    set: function (v) {
                        if(v !== this._errors) {
                            this._errors = v;
                            this.raisePropertyChanged('validationErrors');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataForm.prototype, "isDisabled", {
                    get: function () {
                        return this._isDisabled;
                    },
                    set: function (v) {
                        if(this._isDisabled !== v) {
                            this._isDisabled = !!v;
                            this._updateIsDisabled();
                            this.raisePropertyChanged('isDisabled');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return DataForm;
            })(RIAPP.BaseObject);
            dataform.DataForm = DataForm;            
            var DataFormElView = (function (_super) {
                __extends(DataFormElView, _super);
                function DataFormElView(app, el, options) {
                    this._dataContext = null;
                    this._form = null;
                    this._options = options;
                                _super.call(this, app, el, options);
                }
                DataFormElView.prototype._getErrorTipInfo = function (errors) {
                    var tip = [
                        '<b>', 
                        ERRTEXT.errorInfo, 
                        '</b>', 
                        '<ul>'
                    ];
                    errors.forEach(function (info) {
                        var fieldName = info.fieldName, res = '';
                        if(!!fieldName) {
                            res = ERRTEXT.errorField + ' ' + fieldName;
                        }
                        info.errors.forEach(function (str) {
                            if(!!res) {
                                res = res + ' -> ' + str;
                            } else {
                                res = str;
                            }
                        });
                        tip.push('<li>' + res + '</li>');
                        res = '';
                    });
                    tip.push('</ul>');
                    return tip.join('');
                };
                DataFormElView.prototype._updateErrorUI = function (el, errors) {
                    if(!el) {
                        return;
                    }
                    var $el = this.$el;
                    if(!!errors && errors.length > 0) {
                        var $img, image_src = RIAPP.global.getImagePath('warning.png');
                        $img = RIAPP.global.$('<img name="error_info" alt="error_info" class="error-info" />');
                        $el.prepend($img);
                        $img.get(0).src = image_src;
                        utils.addToolTip($img, this._getErrorTipInfo(errors), MOD.baseElView.css.errorTip);
                        this._setFieldError(true);
                    } else {
                        $el.children('img[name="error_info"]').remove();
                        this._setFieldError(false);
                    }
                };
                DataFormElView.prototype.destroy = function () {
                    if(this._isDestroyed) {
                        return;
                    }
                    this._isDestroyCalled = true;
                    if(!!this._form && !this._form._isDestroyCalled) {
                        this._form.destroy();
                    }
                    this._form = null;
                    this._dataContext = null;
                    _super.prototype.destroy.call(this);
                };
                DataFormElView.prototype.toString = function () {
                    return 'DataFormElView';
                };
                Object.defineProperty(DataFormElView.prototype, "dataContext", {
                    get: function () {
                        return this._dataContext;
                    },
                    set: function (v) {
                        var self = this;
                        if(this._dataContext !== v) {
                            this._dataContext = v;
                            if(!this._form) {
                                this._form = new DataForm(this.app, this._el);
                            }
                            this._form.dataContext = this._dataContext;
                            this._form.addOnDestroyed(function () {
                                self._form = null;
                            });
                            this._form.addOnPropertyChange('validationErrors', function (form, args) {
                                self.validationErrors = form.validationErrors;
                            }, this._objId);
                            self.invokePropChanged('form');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataFormElView.prototype, "form", {
                    get: function () {
                        return this._form;
                    },
                    enumerable: true,
                    configurable: true
                });
                return DataFormElView;
            })(MOD.baseElView.BaseElView);
            dataform.DataFormElView = DataFormElView;            
            RIAPP.global.registerType('DataFormElView', DataFormElView);
            RIAPP.global.registerElView(consts.ELVIEW_NM.DATAFORM, DataFormElView);
            RIAPP.global.onModuleLoaded('dataform', dataform);
        })(MOD.dataform || (MOD.dataform = {}));
        var dataform = MOD.dataform;
    })(RIAPP.MOD || (RIAPP.MOD = {}));
    var MOD = RIAPP.MOD;
})(RIAPP || (RIAPP = {}));
//@ sourceMappingURL=dataform.js.map

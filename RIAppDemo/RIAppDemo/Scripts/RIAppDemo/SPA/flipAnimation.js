/// <reference path="..\jriapp.d.ts"/>
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
    var templMOD = RIAPP.MOD.template;
    var dynMOD = RIAPP.MOD.dynacontent;

    //local variables for optimization
    var global = RIAPP.global, utils = global.utils;

    var FlipAnimation = (function (_super) {
        __extends(FlipAnimation, _super);
        function FlipAnimation(owner) {
            _super.call(this);
            this._owner = owner;
        }
        FlipAnimation.prototype.beforeShow = function (template, isFirstShow) {
            //noop
        };
        FlipAnimation.prototype.show = function (template, isFirstShow) {
            var deffered = utils.createDeferred(), self = this, el = this._owner.el, templEl = template.el;
            this.stop();
            var color = self._owner.$el.css("background-color");
            this._owner.$el.css("opacity", 1);
            this._owner.$el.flip({
                direction: 'tb',
                color: color,
                onBefore: function () {
                    el.removeChild(templEl);
                },
                onEnd: function () {
                    el.appendChild(templEl);
                    deffered.resolve();
                }
            });
            return deffered.promise();
        };
        FlipAnimation.prototype.beforeHide = function (template) {
        };
        FlipAnimation.prototype.hide = function (template) {
            var deffered = utils.createDeferred();
            this.stop();
            deffered.resolve();
            return deffered.promise();
        };
        FlipAnimation.prototype.stop = function () {
            if (!!this._owner && !!this._owner.el)
                this._owner.$el.finish();
        };
        Object.defineProperty(FlipAnimation.prototype, "isAnimateFirstPage", {
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });
        FlipAnimation.prototype.destroy = function () {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            try  {
                this.stop();
                this._owner = null;
            } finally {
                _super.prototype.destroy.call(this);
            }
        };
        return FlipAnimation;
    })(RIAPP.BaseObject);
    exports.FlipAnimation = FlipAnimation;

    //this function is executed when an application which uses this module is created
    function initModule(app) {
        app.registerAnimation('flip', FlipAnimation);

        //return something, even null is OK
        return {};
    }
    exports.initModule = initModule;
});
//# sourceMappingURL=flipAnimation.js.map

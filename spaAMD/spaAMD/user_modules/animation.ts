/// <reference path="..\jriapp.d.ts"/>

'use strict';
//using static import for CORE jriapp modules
import MOD = RIAPP.MOD;
import templMOD = RIAPP.MOD.template;
import dynMOD = RIAPP.MOD.dynacontent;

//local variables for optimization
var global = RIAPP.global, utils = global.utils;

export class FlipAnimation extends RIAPP.BaseObject implements RIAPP.IAnimate {
    private _$templateOwner: JQuery;
    constructor() {
        super();
        this._$templateOwner = null;
    }
    beforeShow(template: templMOD.Template, isFirstShow: boolean):void {
        //noop
    }
    show(template: templMOD.Template, isFirstShow: boolean): RIAPP.IVoidPromise {
        var deffered = utils.createDeferred(), self = this,
            templEl = template.el;
        this._$templateOwner = global.$(templEl).parent();
        this.stop();
        var color = global.$(template.loadedElem).css("background-color");
        this._$templateOwner.css("opacity", 1);
        var el = this._$templateOwner.get(0);
        (<any>this._$templateOwner).flip({
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
    }
    beforeHide(template: templMOD.Template): void {
    }
    hide(template: templMOD.Template): RIAPP.IVoidPromise {
        var deffered = utils.createDeferred();
        this.stop();
        deffered.resolve();
        return deffered.promise();
    }
    stop(): void {
        if (!!this._$templateOwner)
            this._$templateOwner.finish();
    }
    get isAnimateFirstPage() {
        return false;
    }
    destroy() {
        if (this._isDestroyed)
            return;
        this._isDestroyCalled = true;
        try {
            this.stop();
            this._$templateOwner = null;
        }
        finally {
            super.destroy();
        }
    }
}


//this function is executed when an application which uses this module is created
export function initModule(app: RIAPP.Application) {
    app.registerAnimation('flip', new FlipAnimation());
    //return something, even null is OK
    return {};
}

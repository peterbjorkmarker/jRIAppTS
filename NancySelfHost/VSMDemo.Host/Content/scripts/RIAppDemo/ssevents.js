/// <reference path="../jriapp.d.ts"/>
/// <reference path="common.ts"/>
/// <reference path="../thirdparty/sse.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RIAPP;
(function (RIAPP) {
    //server side events client
    var SSEVENTS;
    (function (SSEVENTS) {
        'use strict';
        var global = RIAPP.global, utils = global.utils;
        var SSEventsVM = (function (_super) {
            __extends(SSEventsVM, _super);
            function SSEventsVM(baseUrl, clientID) {
                _super.call(this);
                var self = this;
                this._es = null;
                this._deffered = null;
                this._baseUrl = baseUrl;
                this._clientID = clientID;
                this._url = this._baseUrl + "?id=" + clientID;
                this._closeClientUrl = this._baseUrl + "/CloseClient?id=" + clientID;
                this._postMsgUrl = this._baseUrl + "/PostMessage";
                this._openESCommand = new RIAPP.MOD.mvvm.Command(function (sender, data) {
                    self.open();
                }, self, null);
                global.addOnUnLoad(function (s, a) {
                    self.close();
                });
            }
            SSEventsVM.prototype._getEventNames = function () {
                var base_events = _super.prototype._getEventNames.call(this);
                return ['open', 'close', 'error', 'message'].concat(base_events);
            };
            SSEventsVM.prototype._onEsOpen = function (event) {
                clearTimeout(this._timeOut);
                this._timeOut = null;
                if (!!this._deffered) {
                    this._deffered.resolve();
                    this._deffered = null;
                }
            };
            SSEventsVM.prototype._onEsError = function (event) {
                this._close();
                var err = new Error("" + event);
                this.handleError(err, this);
            };
            SSEventsVM.prototype._onMsg = function (event) {
                var data = JSON.parse(event.data);
                this.raiseEvent('message', { message: event.data, data: data });
            };
            SSEventsVM.prototype._close = function () {
                var self = this;
                if (!!this._timeOut)
                    clearTimeout(this._timeOut);
                this._timeOut = null;
                if (!!this._deffered) {
                    this._deffered.reject({ message: "EventSource closed" });
                }
                this._deffered = null;
                if (!!this._es) {
                    try {
                        this._es.close();
                        this._es = null;
                    }
                    catch (e) {
                        this._es = null;
                    }
                }
            };
            SSEventsVM.prototype.addOnMessage = function (fn, namespace) {
                this.addHandler('message', fn, namespace);
            };
            SSEventsVM.prototype.open = function () {
                var self = this;
                if (!!this._deffered)
                    return this._deffered.promise();
                this._deffered = global.utils.createDeferred();
                this._timeOut = setTimeout(function () {
                    self._timeOut = null;
                    if (!!self._deffered) {
                        self._deffered.reject({ message: "EventSource connect timeout!" });
                        self._deffered = null;
                        self._close();
                    }
                }, 10000);
                if (!this._es) {
                    this._es = new EventSource(self.url);
                    this._es.addEventListener('message', function (e) {
                        self._onMsg(e);
                    }, false);
                    this._es.addEventListener('open', function (e) {
                        self._onEsOpen(e);
                    }, false);
                    this._es.addEventListener('error', function (e) {
                        self._onEsError(e);
                    }, false);
                }
                return this._deffered.promise();
            };
            //gracefully close the sse client
            SSEventsVM.prototype.close = function () {
                var self = this, postData = null;
                utils.performAjaxCall(self._closeClientUrl, postData, true, function (res) {
                    self._close();
                }, function (er) {
                    self._close();
                    self.handleError(er, self);
                }, null);
            };
            //post message (to itself or another client)
            SSEventsVM.prototype.post = function (message, clientID) {
                var payload = { message: message };
                var self = this, postData = JSON.stringify({ payload: payload, clientID: !clientID ? self._clientID : clientID });
                return utils.performAjaxCall(self._postMsgUrl, postData, true, null, null, null);
            };
            SSEventsVM.prototype.destroy = function () {
                if (this._isDestroyed)
                    return;
                this._isDestroyCalled = true;
                var self = this;
                try {
                    self.close();
                }
                finally {
                    _super.prototype.destroy.call(this);
                }
            };
            Object.defineProperty(SSEventsVM.prototype, "es", {
                get: function () {
                    return this._es;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SSEventsVM.prototype, "openESCommand", {
                get: function () {
                    return this._openESCommand;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SSEventsVM.prototype, "url", {
                get: function () {
                    return this._url;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SSEventsVM.prototype, "baseUrl", {
                get: function () {
                    return this._baseUrl;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SSEventsVM.prototype, "clientID", {
                get: function () {
                    return this._clientID;
                },
                enumerable: true,
                configurable: true
            });
            return SSEventsVM;
        })(RIAPP.BaseObject);
        SSEVENTS.SSEventsVM = SSEventsVM;
        function initModule(app) {
            return SSEVENTS;
        }
        SSEVENTS.initModule = initModule;
        ;
    })(SSEVENTS = RIAPP.SSEVENTS || (RIAPP.SSEVENTS = {}));
})(RIAPP || (RIAPP = {}));
//# sourceMappingURL=ssevents.js.map
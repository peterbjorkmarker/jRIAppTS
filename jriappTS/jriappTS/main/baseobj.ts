module RIAPP {
    'use strict';

    export type TEventHandler = (sender?, args?) => void;
    export type TErrorArgs = { error: any; source: any; isHandled: boolean; };
    export type TErrorHandler = (sender, args: TErrorArgs) => void;
    export type TPropChangedHandler = (sender, args: { property: string; }) => void;
    
    interface IListNode {
        context : any
        fn: TEventHandler;
        ns: string;
        next: IListNode;
    }
    interface IList {
        head: IListNode;
        tail: IListNode;
    }

    class EventsHelper {
        static countNodes(list: IList): number {
            if (!list)
                return 0;
            var cur = list.head, i = 0;
            while (!!cur) {
                cur = cur.next;
                ++i;
            }
            return i;
        }
        static prependNode(list: IList, node: IListNode): void {
            node.next = list.head
            list.head = node;
            if (!list.tail)
                list.tail = list.head;
        }
        static appendNode(list: IList, node: IListNode): void {
            if (!list.head) {
                list.tail = node;
                list.head = node;
                return;
            }
            var old = list.tail;
            list.tail = node;
            old.next = node;
        }
        static removeNodes(list: IList, ns: string): void {
            if (!list)
                return null;
            var head = list.head, prev: IListNode = null, del: IListNode, cur = head,
                next: IListNode = (!cur) ? null : cur.next;
            while (!!cur) {
                if (ns == '*' || cur.ns == ns) {
                    del = cur;
                    //delete node
                    if (!prev) {
                        head = next;
                        cur = head;
                        next = (!cur) ? null : cur.next;
                    }
                    else {
                        prev.next = next;
                        cur = next;
                        next = (!cur) ? null : cur.next;
                    }
                    del.next = null;
                }
                else {
                    prev = cur;
                    cur = cur.next;
                    next = (!cur) ? null : cur.next;
                }
            }
            list.head = head;
            list.tail = (!prev) ? head : prev;
        }
        static toArray(list: IList): IListNode[] {
            var res: IListNode[] = [];
            if (!list)
                return res;
            var cur = list.head;
            while (!!cur) {
                res.push(cur);
                cur = cur.next;
            }
            return res;
        }
    }


    export interface IBaseObject {
        raisePropertyChanged(name: string): void;
        addHandler(name: string, handler: TEventHandler, namespace?: string, context?: BaseObject, prepend?: boolean): void;
        removeHandler(name?: string, namespace?: string): void;
        addOnPropertyChange(prop: string, handler: TPropChangedHandler, namespace?: string, context?: BaseObject): void;
        removeOnPropertyChange(prop?: string, namespace?: string): void;
        removeNSHandlers(namespace?: string): void;
        handleError(error: any, source: any): boolean;
        addOnDestroyed(handler: TEventHandler, namespace?: string, context?: BaseObject): void;
        removeOnDestroyed(namespace?: string): void;
        addOnError(handler: TErrorHandler, namespace?: string, context?: BaseObject): void;
        removeOnError(namespace?: string): void;
        getIsDestroyed(): boolean;
        getIsDestroyCalled(): boolean;
        destroy(): void;
    }

    var OBJ_EVENTS = {
        error: 'error',
        destroyed: 'destroyed'
    };

    export class BaseObject implements IBaseObject {
        protected _isDestroyed: boolean;
        protected _isDestroyCalled: boolean;
        private _events: { [name: string]: IList; };
 
        constructor() {
            this._isDestroyed = false;
            this._isDestroyCalled = false;
            this._events = null;
        }
        private _removeNsHandler(ev: { [name: string]: IList; }, ns: string) {
            var keys = Object.keys(ev), key: string, list: IList;
            for (var i = 0, k = keys.length; i < k; ++i) {
                key = keys[i];
                list = ev[key];
                if (!!list) {
                    EventsHelper.removeNodes(list, ns);
                    if (!list.head)
                        ev[key] = null;
                }
            }
        }
        protected _getEventNames(): string[] {
            return [OBJ_EVENTS.error, OBJ_EVENTS.destroyed];
        }
        protected _addHandler(name: string, handler: TEventHandler, namespace?: string, context?: any, prepend?: boolean):void {
            if (this._isDestroyed)
                return;

            if (!RIAPP.baseUtils.isFunc(handler)) {
                    throw new Error(RIAPP.ERRS.ERR_EVENT_INVALID_FUNC);
            }

            if (!name)
                throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_EVENT_INVALID, name));

            if (this._events === null)
                this._events = {};
            var self = this, ev = self._events, n = name, ns = '*';

            if (!!namespace)
                ns = '' + namespace;

            var list = ev[n], node: IListNode = { fn: handler, ns: ns, next: null, context: !context ? null : context };

            if (!list) {
                ev[n] =  { head: node, tail: node };
                return;
            }

            if (!prepend) {
                EventsHelper.appendNode(list, node);
            }
            else {
                EventsHelper.prependNode(list, node);
            }
        }
        protected _removeHandler(name?: string, namespace?: string): void {
            var self = this, ev = self._events, ns = '*';
            if (!ev)
                return;

            if (!!namespace)
                ns = '' + namespace;
            var list: IList;

            //arguments supplied is name (and optionally namespace)
            if (!!name) {
                list = ev[name];
                if (!list)
                    return;
                if (ns == '*') {
                    EventsHelper.removeNodes(list, ns);
                    ev[name] = null;
                }
                else {
                    EventsHelper.removeNodes(list, ns);
                    if (!list.head)
                        ev[name]= null;
                }
                return;
            }

            this._removeNsHandler(ev, ns);

            if (ns == '*') {
                //no arguments supplied
                self._events = null;
            }
        }
        protected _raiseEvent(name: string, args: any):void {
            var self = this, ev = self._events;
            if (ev === null)
                return;
            if (ev === undefined) {
                throw new Error("The object's instance is invalid. The object constructor has not been called!");
            }

            if (!!name) {
                //if an object's property changed
                if (name != '0*' && name.charAt(0) == '0')  
                {
                    //recursive call
                    //notify clients who subscribed for all property changes
                    this._raiseEvent('0*', args); 
                }
                var events = EventsHelper.toArray(ev[name]), cur: IListNode;
                for (var i = 0; i < events.length; i++) {
                    cur = events[i];
                    cur.fn.apply(cur.context, [self, args]);
                }
            }
        }
        protected _checkEventName(name: string): void {
            var proto = Object.getPrototypeOf(this), map: { [name: string]: boolean; };
            //cache events' names in object's prototype
            if (!proto.hasOwnProperty("__evMap")) {
                var evn = this._getEventNames();
                map = {};
                for (var i = 0; i < evn.length; i++) {
                    map[evn[i]] = true;
                }
                proto.__evMap = map;
            }
            else
                map = proto.__evMap;

            if (!map[name]) {
                if (DebugLevel == DEBUG_LEVEL.HIGH) {
                    RIAPP.startDebugger();
                }
                var err = new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_EVENT_INVALID, name));
                this.handleError(err, this);
                throw err;
            }
        }
        protected _isHasProp(prop: string):boolean {
            return baseUtils.hasProp(this, prop);
        }
        handleError(error: any, source: any): boolean {
            if (!!RIAPP.global && RIAPP.global._checkIsDummy(error)) {
                return true;
            }
            if (!error.message) {
                error = new Error('' + error);
            }
            var args: TErrorArgs = { error: error, source: source, isHandled: false };
            this._raiseEvent(OBJ_EVENTS.error, args);
            return args.isHandled;
        }
        raisePropertyChanged(name: string):void {
            var data = { property: name };
            var parts = name.split('.'), lastPropName = parts[parts.length - 1];
            if (parts.length > 1) {
                var obj = baseUtils.resolveOwner(this, name);
                if (DebugLevel > DEBUG_LEVEL.NONE && baseUtils.isUndefined(obj)) {
                    if (DebugLevel == DEBUG_LEVEL.HIGH) {
                        RIAPP.startDebugger();
                    }
                    throw new Error(baseUtils.format(RIAPP.ERRS.ERR_PROP_NAME_INVALID, name));
                }
                if (obj instanceof BaseObject) {
                    (<BaseObject>obj).raiseEvent('0' + lastPropName, data);
                }
            }
            else {
                if (DebugLevel > DEBUG_LEVEL.NONE && !baseUtils.hasProp(this, lastPropName)) {
                    if (DebugLevel == DEBUG_LEVEL.HIGH) {
                        RIAPP.startDebugger();
                    }
                    throw new Error(baseUtils.format(RIAPP.ERRS.ERR_PROP_NAME_INVALID, lastPropName));
                }
                this.raiseEvent('0' + lastPropName, data);
            }
        }
        addHandler(name: string, handler: TEventHandler, namespace?: string, context?: BaseObject, prepend?: boolean):void {
            this._checkEventName(name);
            this._addHandler(name, handler, namespace, context, prepend);
        }
        removeHandler(name?: string, namespace?: string):void {
            if (!!name) {
                this._checkEventName(name);
            }
            this._removeHandler(name, namespace);
        }
        addOnDestroyed(handler: TEventHandler, namespace?: string, context?: BaseObject):void {
            this._addHandler(OBJ_EVENTS.destroyed, handler, namespace, context, false);
        }
        removeOnDestroyed(namespace?: string):void {
            this._removeHandler(OBJ_EVENTS.destroyed, namespace);
        }
        addOnError(handler: TErrorHandler, namespace?: string, context?: BaseObject): void {
            this._addHandler(OBJ_EVENTS.error, handler, namespace, context, false);
        }
        removeOnError(namespace?: string):void {
            this.removeHandler(OBJ_EVENTS.error, namespace);
        }
        //remove event handlers by their namespace
        removeNSHandlers(namespace?: string) :void {
            this._removeHandler(null, namespace);
        }
        raiseEvent(name: string, args: any): void {
            if (!name)
                throw new Error(RIAPP.ERRS.ERR_EVENT_INVALID);
            if (name.charAt(0) != '0')
                this._checkEventName(name);
            this._raiseEvent(name, args);
        }
        //to subscribe fortthe changes on all properties, pass in the prop parameter: '*'
        addOnPropertyChange(prop: string, handler: TPropChangedHandler, namespace?: string, context?: BaseObject):void {
            if (!prop)
                throw new Error(RIAPP.ERRS.ERR_PROP_NAME_EMPTY);
            if (DebugLevel > DEBUG_LEVEL.NONE && prop != '*' && !this._isHasProp(prop)) {
                if (DebugLevel == DEBUG_LEVEL.HIGH) {
                    RIAPP.startDebugger();
                }
                throw new Error(baseUtils.format(RIAPP.ERRS.ERR_PROP_NAME_INVALID, prop));
            }
            prop = '0' + prop;
            this._addHandler(prop, handler, namespace, context, false);
        }
        removeOnPropertyChange(prop?: string, namespace?: string):void {
            if (!!prop) {
                if (DebugLevel > DEBUG_LEVEL.NONE && prop != '*' && !this._isHasProp(prop)) {
                    if (DebugLevel == DEBUG_LEVEL.HIGH) {
                        RIAPP.startDebugger();
                    }
                    throw new Error(baseUtils.format(RIAPP.ERRS.ERR_PROP_NAME_INVALID, prop));
                }
                prop = '0' + prop;
            }
            this._removeHandler(prop, namespace);
        }
        getIsDestroyed(): boolean {
            return this._isDestroyed;
        }
        getIsDestroyCalled(): boolean {
            return this._isDestroyCalled;
        }
        destroy(): void {
            if (this._isDestroyed)
                return;
            this._isDestroyed = true;
            this._isDestroyCalled = true;
            try {
                this._raiseEvent(OBJ_EVENTS.destroyed, {});
            }
            finally {
                this._removeHandler(null, null);
            }
        }
    }
}

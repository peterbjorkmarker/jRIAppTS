module RIAPP {
    'use strict';
    interface IListNode {
        fn: (sender, args) => void;
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
                if (cur.ns == ns) {
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
                    del.fn = null;
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
        static toArray(list: IList): { (sender, args): void; }[] {
            var res: { (sender, args): void; }[] = [];
            if (!list)
                return res;
            var cur = list.head;
            while (!!cur) {
                res.push(cur.fn);
                cur = cur.next;
            }
            return res;
        }
    }

    export interface IBaseObject {
        raisePropertyChanged(name: string): void;
        addHandler(name: string, fn: (sender, args) => void, namespace?: string, prepend?: boolean): void;
        removeHandler(name?: string, namespace?: string): void;
        addOnPropertyChange(prop: string, fn: (sender, args: { property: string; }) => void, namespace?: string): void;
        removeOnPropertyChange(prop?: string, namespace?: string): void;
        removeNSHandlers(namespace?: string): void;
        handleError(error: any, source: any): boolean;
        getIsDestroyed(): boolean;
        getIsDestroyCalled(): boolean;
        destroy(): void;
    }

    export class BaseObject implements IBaseObject {
        protected _isDestroyed: boolean;
        protected _isDestroyCalled: boolean;
        private _events: { [name: string]: IList; };
 
        constructor() {
            this._isDestroyed = false;
            this._isDestroyCalled = false;
            this._events = null;
        }
        protected _getEventNames(): string[] {
            return ['error', 'destroyed'];
        }
        protected _addHandler(name: string, fn: (sender,args)=>void, namespace?: string, prepend?: boolean):void {
            if (this._isDestroyed)
                return;
            if (!RIAPP.baseUtils.isFunc(fn))
                throw new Error(RIAPP.ERRS.ERR_EVENT_INVALID_FUNC);
            if (!name)
                throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_EVENT_INVALID, name));

            if (this._events === null)
                this._events = {};
            var self = this, ev = self._events, n = name, ns = '*';

            if (!!namespace)
                ns = '' + namespace;

            var list = ev[n], node = { fn: fn, ns: ns, next: null };

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
            var self = this, ev = self._events, n = name, ns = '*';
            if (!ev)
                return;

            if (!!namespace)
                ns = '' + namespace;
            var list: IList;

            //arguments supplied is name (and optionally namespace)
            if (!!n) {
                list = ev[n];
                if (!list)
                    return;
                if (ns == '*') {
                    ev[n] = null;
                }
                else {
                    EventsHelper.removeNodes(list, ns);
                    if (!list.head)
                        ev[n]= null;
                }
                return;
            }

            //arguments supplied is only namespace
            if (ns != '*') {
                var keys = Object.keys(ev);
                keys.forEach(function (n) {
                    var list = ev[n];
                    if (!!list) {
                        EventsHelper.removeNodes(list, ns);
                        if (!list.head)
                            ev[n] = null;
                    }
                });
                return;
            }

            //no arguments supplied
            self._events = null;
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
                if (name != '0*' && RIAPP.baseUtils.startsWith(name, '0'))  
                {
                    //and also notify those clients who subscribed for all property changes
                    this._raiseEvent('0*', args); 
                }
                var events = EventsHelper.toArray(ev[name]);
                for (var i = 0; i < events.length; i++) {
                    events[i].apply(null, [self, args]);
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
                    debugger;
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
            var args = { error: error, source: source, isHandled: false };
            this._raiseEvent('error', args);
            return args.isHandled;
        }
        raisePropertyChanged(name: string):void {
            var data = { property: name };
            var parts = name.split('.'), lastPropName = parts[parts.length - 1];
            if (parts.length > 1) {
                var obj = baseUtils.resolveOwner(this, name);
                if (DebugLevel > DEBUG_LEVEL.NONE && baseUtils.isUndefined(obj)) {
                    if (DebugLevel == DEBUG_LEVEL.HIGH) {
                        debugger;
                    }
                    throw new Error(baseUtils.format(RIAPP.ERRS.ERR_PROP_NAME_INVALID, name));
                }
                if (obj instanceof BaseObject) {
                    obj._raiseEvent('0' + lastPropName, data);
                }
            }
            else {
                if (DebugLevel > DEBUG_LEVEL.NONE && !baseUtils.hasProp(this, lastPropName)) {
                    if (DebugLevel == DEBUG_LEVEL.HIGH) {
                        debugger;
                    }
                    throw new Error(baseUtils.format(RIAPP.ERRS.ERR_PROP_NAME_INVALID, lastPropName));
                }
                this._raiseEvent('0' + lastPropName, data);
            }
        }
        addHandler(name: string, fn: (sender, args) => void, namespace?: string, prepend?: boolean):void {
            this._checkEventName(name);
            this._addHandler(name, fn, namespace, !!prepend);
        }
        removeHandler(name?: string, namespace?: string):void {
            if (!!name) {
                this._checkEventName(name);
            }
            this._removeHandler(name, namespace);
        }
        addOnDestroyed(fn: (sender, args: {})=>void, namespace?: string):void {
            this._addHandler('destroyed', fn, namespace, false);
        }
        removeOnDestroyed(namespace?: string):void {
            this._removeHandler('destroyed', namespace);
        }
        addOnError(fn: (sender, args: { error: any; source: any; isHandled: boolean; }) => void , namespace?: string): void {
            this._addHandler('error', fn, namespace, false);
        }
        removeOnError(namespace?: string):void {
            this.removeHandler('error', namespace);
        }
        //remove event handlers by their namespace
        removeNSHandlers(namespace?: string) :void {
            this._removeHandler(null, namespace);
        }
        raiseEvent(name: string, args: any):void {
            this._checkEventName(name);
            this._raiseEvent(name, args);
        }
        //to subscribe fortthe changes on all properties, pass in the prop parameter: '*'
        addOnPropertyChange(prop: string, fn: (sender, args: { property: string; })=>void, namespace?: string):void {
            if (!prop)
                throw new Error(RIAPP.ERRS.ERR_PROP_NAME_EMPTY);
            if (DebugLevel > DEBUG_LEVEL.NONE && prop != '*' && !this._isHasProp(prop)) {
                if (DebugLevel == DEBUG_LEVEL.HIGH) {
                    debugger;
                }
                throw new Error(baseUtils.format(RIAPP.ERRS.ERR_PROP_NAME_INVALID, prop));
            }
            prop = '0' + prop;
            this._addHandler(prop, fn, namespace, false);
        }
        removeOnPropertyChange(prop?: string, namespace?: string):void {
            if (!!prop) {
                if (DebugLevel > DEBUG_LEVEL.NONE && prop != '*' && !this._isHasProp(prop)) {
                    if (DebugLevel == DEBUG_LEVEL.HIGH) {
                        debugger;
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
                this._raiseEvent('destroyed', {});
            }
            finally {
                this._events = null;
            }
        }
    }
}

module RIAPP {
    interface IListNode {
        fn: (sender, args) => void;
        ns: string;
        next: IListNode;
    }

    class EventsAspect {
        static hasNode(list: IListNode, node: IListNode): boolean {
            if (!list || !node)
                return false;
            var curNode = list;
            while (!!curNode) {
                if (curNode.fn === node.fn && curNode.ns == node.ns)
                    return true;
                curNode = curNode.next;
            }
            return false;
        }
        static countNodes(list: IListNode): number {
            if (!list)
                return 0;
            var curNode = list, i = 0;
            while (!!curNode) {
                curNode = curNode.next;
                ++i;
            }
            return i;
        }
        static prependNode(list: IListNode, node: IListNode): IListNode {
            if (EventsAspect.hasNode(list, node))
                return list;
            node.next = list;
            return node;
        }
        static appendNode(list: IListNode, node: IListNode): IListNode {
            var prevNode = list, lastNode = prevNode.next;
            if (!prevNode)
                return null;
            //if already have it, return without adding it again
            if (prevNode.fn === node.fn && prevNode.ns == node.ns)
                return list;
            while (!!lastNode) {
                //prevent adding it more than once
                if (lastNode.fn === node.fn && lastNode.ns == node.ns)
                    return list;
                prevNode = lastNode;
                lastNode = prevNode.next;
            }
            lastNode = prevNode;
            lastNode.next = node;
            return list;
        }
        static removeNodes(list: IListNode, ns: string): IListNode {
            if (!list)
                return null;
            var firstNode = list, prevNode: IListNode = null, curNode = list, nextNode: IListNode = (!curNode) ? null : curNode.next;

            while (!!curNode) {
                if (curNode.ns == ns) {
                    if (!prevNode) {
                        firstNode = nextNode;
                        curNode.fn = null;
                        curNode.next = null;
                        curNode = nextNode;
                        nextNode = (!curNode) ? null : curNode.next;
                    }
                    else {
                        prevNode.next = nextNode;
                        curNode.fn = null;
                        curNode.next = null;
                        curNode = nextNode;
                        nextNode = (!curNode) ? null : curNode.next;
                    }
                }
                else {
                    prevNode = curNode;
                    curNode = curNode.next;
                    nextNode = (!curNode) ? null : curNode.next;
                }
            }
            return firstNode;
        }
        static toArray(list: IListNode): { (sender, args): void; }[] {
            var res: { (sender, args): void ; } [] = [], curNode = list;
            while (!!curNode) {
                res.push(curNode.fn);
                curNode = curNode.next;
            }
            return res;
        }
        //for testing
        static stringifyEvents(ev: { [name: string]: IListNode; }, text: string): string {
            if (!ev)
                return text + '- empty';
            var keys = Object.keys(ev), res = '';
            keys.forEach(function (n) {
                res += ',' + n + ':' + EventsAspect.countNodes(ev[n]);
            });
            res = text + '- ' + res.substr(1);
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
        private _events: { [name: string]: IListNode; };
 
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

            var list = ev[n];

            if (!list) {
                ev[n] = { fn: fn, ns: ns, next: null };
                return;
            }

            var newNode: IListNode = { fn: fn, ns: ns, next: null };

            if (!prepend) {
                ev[n] = EventsAspect.appendNode(list, newNode);
            }
            else {
                ev[n] = EventsAspect.prependNode(list, newNode);
            }
        }
        protected _removeHandler(name?: string, namespace?: string):void {
            var self = this, ev = self._events, n = name, ns = '*';
            if (!ev)
                return;

            if (!!namespace)
                ns = '' + namespace;
            var list: IListNode;

            //arguments supplied is name (and optionally namespace)
            if (!!n) {
                list = ev[n];
                if (!list)
                    return;
                if (ns == '*') {
                    delete ev[n];
                }
                else {
                    list = EventsAspect.removeNodes(list, ns);
                    if (!list)
                        delete ev[n];
                    else
                        ev[n] = list;
                }
                return;
            }

            //arguments supplied is only namespace
            if (ns != '*') {
                var keys = Object.keys(ev);
                keys.forEach(function (n) {
                    var list = ev[n];
                    list = EventsAspect.removeNodes(list, ns);
                    if (!list)
                        delete ev[n];
                    else
                        ev[n] = list;
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
                var events = EventsAspect.toArray(ev[name]);
                for (var i = 0; i < events.length; i++) {
                    events[i].apply(null, [self, args]);
                }
            }
        }
        protected _checkEventName(name: string):void {
            if (this._getEventNames().indexOf(name) === -1) {
                if (DebugLevel == DEBUG_LEVEL.HIGH) {
                    debugger;
                }
                throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_EVENT_INVALID, name));
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

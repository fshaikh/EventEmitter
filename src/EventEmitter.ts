/**
 * Event Emitter object which allows applicatios to implement pub-sub pattern
 * enabling loose coupling between components
 */
export default class EventEmitter {
    private name: string;
    private _events: object;

    /**
     * Initializes a new instance of EventEmitter
     * @param name - Name of Event Emitter
     */
    constructor(name = '') {
        this.name = name;
        this._events = Object.create(null);
    }

    /**
     * Registers an event name with the associated handler
     * @param key - Event name
     * @param handler - Event handler
     */
    public on(key: string, handler: Function)  {
        if(!key) {
            throw TypeError('key cannot be null or empty');
        }

        if(typeof handler !== 'function'){
            throw TypeError('handler must be a function');
        }

        let event = this._events[key];
        // if no event is registered, this is the first time, so simply add it
        // else push the handler to the events object
        event ? event.push(handler) : ( this._events[key] = [handler]);
        
        // Return to allow chaining of function invocations.
        return this;
    }

    public emit(key: string, ...args) {
        if(!key) {
            throw TypeError('key cannot be null or empty');
        }

        // check if any event is registered
        let event = this._events[key];
        // early return
        if(event == null) {
            return this;
        }
        event.forEach(function handleEventHandler(handler: Function) {
            handler.apply(this, args)
        });

        return this;
    }

    public off(key: string, handler: Function) {
        if(!key) {
            throw TypeError('key cannot be null or empty');
        }

        if(typeof handler !== 'function'){
            throw TypeError('handler must be a function');
        }

        // check if event exists
        let event: Array<Function> = this._events[key];
        if(event == null) {
            return this;
        }
        // find the handler
        const index: number = event.indexOf(handler);
        if(index !== -1) {
            // remove the listener
           event.splice(index , 1);
        }
        return this;
    }

    public listenerCount(key: string): number {
        // any type checking
        if(!key){
            throw TypeError('key cannot be null or empty');
        }
        let event = this._events[key];
        return event ? event.length: -1;
    }
}
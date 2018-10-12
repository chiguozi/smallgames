export default class SShareEventObject
{
    protected eventDispatcher:Laya.EventDispatcher;

    public init(eventDispatcher)
    {
        this.eventDispatcher = eventDispatcher
    }

    protected event(type, data)
    {
        this.eventDispatcher.event(type, data);
    }

    protected on(type:any, caller:any, listener:Function, args:any[] = null)
    {
        this.eventDispatcher.on(type, caller, listener, args);
    }

    protected once(type:any, caller:any, listener:Function, args:any[] = null)
    {
        this.eventDispatcher.once(type, caller, listener, args);
    }

    protected off(type:any, caller:any, listener:Function, onceOnly:boolean = false)
    {
        this.eventDispatcher.off(type, caller, listener, onceOnly);
    }

    protected offAll(type:any)
    {
        this.eventDispatcher.offAll(type);
    }

    protected offAllCaller(caller)
    {
        this.eventDispatcher.offAllCaller(caller);
    }
}
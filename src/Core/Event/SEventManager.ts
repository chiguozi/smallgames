export default class SEventManager
{
    static eventDispatcher :Laya.EventDispatcher = new Laya.EventDispatcher();

    public static event(type, data)
    {
        this.eventDispatcher.event(type, data);
    }

    public static on(type:any, caller:any, listener:Function, args:any[] = null)
    {
        this.eventDispatcher.on(type, caller, listener, args);
    }

    public static once(type:any, caller:any, listener:Function, args:any[] = null)
    {
        this.eventDispatcher.once(type, caller, listener, args);
    }

    public static off(type:any, caller:any, listener:Function, onceOnly:boolean = false)
    {
        this.eventDispatcher.off(type, caller, listener, onceOnly);
    }

    public static offAll(type:any)
    {
        this.eventDispatcher.offAll(type);
    }

    public static offAllCaller(caller)
    {
        this.eventDispatcher.offAllCaller(caller);
    }
}
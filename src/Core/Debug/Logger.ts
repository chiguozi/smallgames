
enum LogLevel
{
    Info = 0x01,
    Warning = 0x02,
    Error = 0x04,
    All = 0xff,
}
export default class Logger
{
    public static enable = true;
    public static logLevel = LogLevel.All;

    public static info(...args)
    {
        if(!this.checkCanLog(LogLevel.Info))
            return;
        let content = args.join("\t");
        content = this.getLogContent("INFO", content);
        console.log(content);
    }

    public static warn(...args)
    {
        if(!this.checkCanLog(LogLevel.Warning))
            return;
        let content = args.join("\t");
        content = this.getLogContent("WARNING", content);
        console.warn(content);
    }

    public static error(...args)
    {
        if(!this.checkCanLog(LogLevel.Error))
            return;
        let content = args.join("\t");
        content = this.getLogContent("ERROR", content);
        console.warn(content);
    }

    private static getLogContent(pre:string, content:string):string
    {
        return "[" + pre + new Date().toLocaleTimeString() + "]:" + content;
    }
    private static checkCanLog(logLevel:LogLevel)
    {
        return this.enable && ((logLevel & this.logLevel) > 0)
    }
}
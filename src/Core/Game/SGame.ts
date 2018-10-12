import IGame from "./IGame";
export default class SGame implements IGame
{
    private hasStarted = false;

    public init()
    {}

    public start()
    {
        this.hasStarted = true;
    }

    public restart()
    {
        this.clear();
    }

    public pause()
    {
    }

    public resume()
    {
    }

    public quit()
    {
    }

    protected clear()
    {

    }

    public update()
    {
        if(!this.hasStarted)
            return;
    }
}
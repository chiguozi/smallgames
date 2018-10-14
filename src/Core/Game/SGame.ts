import IGame from "./IGame";
import SShareEventObject from "./SShareEventObject";
export default class SGame extends SShareEventObject implements IGame
{
    private hasStarted = false;


    public init(eventDispatcher)
    {
        super.init(eventDispatcher);
    }
    
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
    public update()
    {
        if(!this.hasStarted)
            return;
    }

    public showMenu()
    {

    }

    protected clear()
    {

    }
}
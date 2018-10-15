import IGame from "./IGame";
import SGame from "./SGame";

export default class SGameManager
{
    static instance:SGameManager;
    public static get Instance()
    {
        if(this.instance == null)
        {
            this.instance = new SGameManager();
        }
        return this.instance;
    }
    private game:IGame;

    public goToGame(id)
    {
        this.initGame(id);
        this.game.load();
    }

    //创建game
    private initGame(id)
    {
        this.game = new SGame();
    }




}
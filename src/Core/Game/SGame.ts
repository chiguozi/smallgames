import IGame from "./IGame";
import SShareEventObject from "./SShareEventObject";
import SScene from "../Scene/SScene";
import GameCfg from "../../Games/GameCfg";
import AirWarGame from "../../Games/AirWar/AirWarGame";
export default class SGame implements IGame
{
    private hasStarted = false;
    protected scene:SScene;
    protected config:any;


    public init(cfg)
    {
        this.config = cfg;
        this.scene = SScene.create(this.config.sceneType, this.config.scenePath);
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

    public load()
    {
        //临时处理
        this.scene.load(Laya.Handler.create(this, this.start));
    }

    protected clear()
    {

    }

    public static create(id)
    {
        let cfg = GameCfg.getCfg(id);
        if(cfg == null)
            return;
        let game = null;
        switch(cfg.gameType)
        {
            case 1:
                game = new AirWarGame();
            break;
            default:
                game = new SGame();
        }
        game.init(cfg);
        return game;
    }
}
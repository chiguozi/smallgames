import SShareEventObject from "../Game/SShareEventObject";
import AirWarScene from "../../Games/AirWar/AirWarScene";

//Scene相当于UI  提供ui和挂载组件
enum LoadState
{
    None = 1,
    Loading = 2,
    Loaded = 3,
    Destroyed = 4,
}
export default class SScene extends SShareEventObject
{
    protected scenePath:string;
    protected sceneType:number;
    protected sceneConfig:string;
    protected scene:Laya.Scene;
    protected autoDestroy:boolean = false;
    public loadState:LoadState = LoadState.None;
    public sceneId:number;

    private complete:Laya.Handler;

    public init(sceneId)
    {
        // this.scenePath = path;
        // this.autoDestroy = autoDestroy;
        this.loadState = LoadState.None;
    }
    //加载场景
    public load(complete:Laya.Handler)
    {
        this.complete = complete;
        this.loadState = LoadState.Loading;
        Laya.Scene.open(this.scenePath, false, Laya.Handler.create(this, this.onLoaded));
    }
    

    protected onLoaded(scene)
    {
        this.loadState = LoadState.Loaded;
        this.scene = scene;
        this.scene.visible = false;
        //game控制场景显示
        if(this.complete)
        {
            this.complete.run();
            this.complete = null;
        }
    }

    public show()
    {
        this.scene.visible = true;
        this.onOpen();
    }

    protected onOpen()
    {

    }
    public exit()
    {
        if(this.scene)
            this.scene.visible = false;
        this.onExit();
        if(this.autoDestroy)
        {
            this.destroy();
        }
        Laya.Scene.gc();
    }

    protected onExit()
    {}

    public destroy()
    {
        this.loadState = LoadState.Destroyed;
        this.onDestroy();
        if(this.scene)
        {
            this.scene.destroy();
            this.scene = null;
        }
    }

    protected onDestroy()
    {}


    public static create(sceneType, sceneName)
    {
        //读取配置、获取类型、创建对应场景
        let scene = null;
        switch(sceneType)
        {
            case 1:
                scene = new AirWarScene();
            break;
            default:
                scene = new SScene();
        }
        scene.init(sceneName);
        return scene;
    }
}
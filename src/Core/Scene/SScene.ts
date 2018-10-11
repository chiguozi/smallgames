enum LoadState
{
    None = 1,
    Loading = 2,
    Loaded = 3,
    Destroyed = 4,
}
export default class SScene
{
    protected scenePath:string;
    protected sceneType:number;
    protected sceneConfig:string;
    protected scene:Laya.Scene;
    protected autoDestroy:boolean = false;
    public loadState:LoadState = LoadState.None;
    public sceneId:number;


    constructor(path:string, autoDestroy = true)
    {
        this.scenePath = path;
        this.autoDestroy = autoDestroy;
        this.loadState = LoadState.None;
    }
    //加载场景
    public load()
    {
        this.loadState = LoadState.Loading;
        Laya.Scene.open(this.scenePath, false, Laya.Handler.create(this, this.onLoaded));
    }
    

    protected onLoaded(scene)
    {
        this.loadState = LoadState.Loaded;
        this.scene = scene;
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
}
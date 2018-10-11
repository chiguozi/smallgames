import SScene from "./SScene";

export default class SSceneManager
{
    protected currentScene:SScene;
    
    private static _instance:SSceneManager;
    public static get Instance()
    {
        if(this._instance == null)
            this._instance = new SSceneManager();
        return this._instance;
    }

    public goToScene(sceneId)
    {
        if(this.currentScene && this.currentScene.sceneId == sceneId)
        {
            return;
        }
        this.exitScene();
        this.enterScene(sceneId);
    }

    protected enterScene(sceneId)
    {
        this.currentScene = new SScene("AirWar/AirWar.scene");
        this.currentScene.load();
    }

    protected exitScene()
    {
        if(this.currentScene == null)
            return;
        this.currentScene.exit();
        this.currentScene = null;
    }
}
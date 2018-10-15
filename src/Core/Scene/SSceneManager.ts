// import SScene from "./SScene";

// export default class SSceneManager
// {
//     protected currentScene:SScene;
    
//     private static _instance:SSceneManager;
//     public static get Instance()
//     {
//         if(this._instance == null)
//             this._instance = new SSceneManager();
//         return this._instance;
//     }

//     public goToScene(sceneId, complete:Laya.Handler)
//     {
//         if(this.currentScene && this.currentScene.sceneId == sceneId)
//         {
//             return;
//         }
//         this.exitScene();
//         this.enterScene(sceneId, complete);
//     }

//     public showCurScene()
//     {
//         if(this.currentScene != null)
//         {
//             this.currentScene.show();
//         }
//     }

//     protected enterScene(sceneId, complete:Laya.Handler)
//     {
//         this.currentScene = new SScene("AirWar/AirWar.scene");
//         this.currentScene.load(complete);
//     }

//     protected exitScene()
//     {
//         if(this.currentScene == null)
//             return;
//         this.currentScene.exit();
//         this.currentScene = null;
//     }
// }
import SScene from "../Core/Scene/SScene"
import SGameManager from "../Core/Game/SGameManager";
export default class MainScene extends Laya.Script
{
    private startBtn:Laya.Image;
    onEnable()
    {
        this.startBtn = this.owner.getChildAt(0) as Laya.Image;
        if(this.startBtn)
            this.startBtn.on(Laya.Event.CLICK, this, this.onBtnClick);

    }

    private onBtnClick()
    {
        SGameManager.Instance.goToGame(1);
    }

}
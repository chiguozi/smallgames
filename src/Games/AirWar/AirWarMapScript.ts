import SScript from "../../Core/Component/SScript";

export default class AirWarMapScript extends SScript
{
    private map1:Laya.Image;
    private map2:Laya.Image;

    onAwake()
    {
        this.map1 = this.getComponent<Laya.Image>("bg1");
        this.map2 = this.getComponent<Laya.Image>("bg2");
    }

    onUpdate()
    {
        this.map1.y++;
        this.map2.y++;
        if(this.map1.y >= 1280)
        {
            this.map1.y -= (1280 * 2);
        }
        if(this.map2.y >= 1280)
        {
            this.map2.y -= (1280 * 2);
        }
    }
}
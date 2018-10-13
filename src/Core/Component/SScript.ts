export default class SScript extends Laya.Script
{
    protected getComponent<T extends Laya.Node>(name)
    {   
        let obj = this.owner.getChildByName(name);
        if(obj == null)
            return null;
        return obj as T;
    }
}
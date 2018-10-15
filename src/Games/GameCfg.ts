enum GameDefine
{
    AirWar = 1,
}

export default class GameCfg
{
    static gameCfgMap =
    {
        1:
        {
            id:1,
            scenePath:"AirWar/AirWarScene.scene",
            gameType:1,     //对应IGame
            sceneType:1,   //不同游戏相同场景类 对应Scene
        }
    }

    public static getCfg(id)
    {
        return this.gameCfgMap[id]
    }
}
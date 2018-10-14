export default interface IGame
{
    init(eventDispatcher:Laya.EventDispatcher);
    start();
    pause();
    resume();
    quit();
    update();
    restart();
    showMenu();
}
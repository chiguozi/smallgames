export default interface IGame
{
    load();
    init(cfg);
    start();
    pause();
    resume();
    quit();
    update();
    restart();
    showMenu();
}
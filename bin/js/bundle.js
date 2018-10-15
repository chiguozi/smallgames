var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SScript = /** @class */ (function (_super) {
    __extends(SScript, _super);
    function SScript() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SScript.prototype.getComponent = function (name) {
        var obj = this.owner.getChildByName(name);
        if (obj == null)
            return null;
        return obj;
    };
    return SScript;
}(Laya.Script));
exports.default = SScript;
},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SScene_1 = require("../Scene/SScene");
var GameCfg_1 = require("../../Games/GameCfg");
var AirWarGame_1 = require("../../Games/AirWar/AirWarGame");
var SGame = /** @class */ (function () {
    function SGame() {
        this.hasStarted = false;
    }
    SGame.prototype.init = function (cfg) {
        this.config = cfg;
        this.scene = SScene_1.default.create(this.config.sceneType, this.config.scenePath);
    };
    SGame.prototype.start = function () {
        this.hasStarted = true;
    };
    SGame.prototype.restart = function () {
        this.clear();
    };
    SGame.prototype.pause = function () {
    };
    SGame.prototype.resume = function () {
    };
    SGame.prototype.quit = function () {
    };
    SGame.prototype.update = function () {
        if (!this.hasStarted)
            return;
    };
    SGame.prototype.showMenu = function () {
    };
    SGame.prototype.load = function () {
        //临时处理
        this.scene.load(Laya.Handler.create(this, this.start));
    };
    SGame.prototype.clear = function () {
    };
    SGame.create = function (id) {
        var cfg = GameCfg_1.default.getCfg(id);
        if (cfg == null)
            return;
        var game = null;
        switch (cfg.gameType) {
            case 1:
                game = new AirWarGame_1.default();
                break;
            default:
                game = new SGame();
        }
        game.init(cfg);
        return game;
    };
    return SGame;
}());
exports.default = SGame;
},{"../../Games/AirWar/AirWarGame":7,"../../Games/GameCfg":10,"../Scene/SScene":5}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SGame_1 = require("./SGame");
var SGameManager = /** @class */ (function () {
    function SGameManager() {
    }
    Object.defineProperty(SGameManager, "Instance", {
        get: function () {
            if (this.instance == null) {
                this.instance = new SGameManager();
            }
            return this.instance;
        },
        enumerable: true,
        configurable: true
    });
    SGameManager.prototype.goToGame = function (id) {
        this.initGame(id);
        this.game.load();
    };
    //创建game
    SGameManager.prototype.initGame = function (id) {
        this.game = new SGame_1.default();
    };
    return SGameManager;
}());
exports.default = SGameManager;
},{"./SGame":2}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SShareEventObject = /** @class */ (function () {
    function SShareEventObject() {
    }
    SShareEventObject.prototype.init = function (eventDispatcher) {
        this.eventDispatcher = eventDispatcher;
    };
    SShareEventObject.prototype.event = function (type, data) {
        this.eventDispatcher.event(type, data);
    };
    SShareEventObject.prototype.on = function (type, caller, listener, args) {
        if (args === void 0) { args = null; }
        this.eventDispatcher.on(type, caller, listener, args);
    };
    SShareEventObject.prototype.once = function (type, caller, listener, args) {
        if (args === void 0) { args = null; }
        this.eventDispatcher.once(type, caller, listener, args);
    };
    SShareEventObject.prototype.off = function (type, caller, listener, onceOnly) {
        if (onceOnly === void 0) { onceOnly = false; }
        this.eventDispatcher.off(type, caller, listener, onceOnly);
    };
    SShareEventObject.prototype.offAll = function (type) {
        this.eventDispatcher.offAll(type);
    };
    SShareEventObject.prototype.offAllCaller = function (caller) {
        this.eventDispatcher.offAllCaller(caller);
    };
    return SShareEventObject;
}());
exports.default = SShareEventObject;
},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SShareEventObject_1 = require("../Game/SShareEventObject");
var AirWarScene_1 = require("../../Games/AirWar/AirWarScene");
//Scene相当于UI  提供ui和挂载组件
var LoadState;
(function (LoadState) {
    LoadState[LoadState["None"] = 1] = "None";
    LoadState[LoadState["Loading"] = 2] = "Loading";
    LoadState[LoadState["Loaded"] = 3] = "Loaded";
    LoadState[LoadState["Destroyed"] = 4] = "Destroyed";
})(LoadState || (LoadState = {}));
var SScene = /** @class */ (function (_super) {
    __extends(SScene, _super);
    function SScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.autoDestroy = false;
        _this.loadState = LoadState.None;
        return _this;
    }
    SScene.prototype.init = function (sceneId) {
        // this.scenePath = path;
        // this.autoDestroy = autoDestroy;
        this.loadState = LoadState.None;
    };
    //加载场景
    SScene.prototype.load = function (complete) {
        this.complete = complete;
        this.loadState = LoadState.Loading;
        Laya.Scene.open(this.scenePath, false, Laya.Handler.create(this, this.onLoaded));
    };
    SScene.prototype.onLoaded = function (scene) {
        this.loadState = LoadState.Loaded;
        this.scene = scene;
        this.scene.visible = false;
        //game控制场景显示
        if (this.complete) {
            this.complete.run();
            this.complete = null;
        }
    };
    SScene.prototype.show = function () {
        this.scene.visible = true;
        this.onOpen();
    };
    SScene.prototype.onOpen = function () {
    };
    SScene.prototype.exit = function () {
        if (this.scene)
            this.scene.visible = false;
        this.onExit();
        if (this.autoDestroy) {
            this.destroy();
        }
        Laya.Scene.gc();
    };
    SScene.prototype.onExit = function () { };
    SScene.prototype.destroy = function () {
        this.loadState = LoadState.Destroyed;
        this.onDestroy();
        if (this.scene) {
            this.scene.destroy();
            this.scene = null;
        }
    };
    SScene.prototype.onDestroy = function () { };
    SScene.create = function (sceneType, sceneName) {
        //读取配置、获取类型、创建对应场景
        var scene = null;
        switch (sceneType) {
            case 1:
                scene = new AirWarScene_1.default();
                break;
            default:
                scene = new SScene();
        }
        scene.init(sceneName);
        return scene;
    };
    return SScene;
}(SShareEventObject_1.default));
exports.default = SScene;
},{"../../Games/AirWar/AirWarScene":9,"../Game/SShareEventObject":4}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
var AirWarMapScript_1 = require("./Games/AirWar/AirWarMapScript");
var MainScene_1 = require("./Hall/MainScene");
/*
* 游戏初始化配置;
*/
var GameConfig = /** @class */ (function () {
    function GameConfig() {
    }
    GameConfig.init = function () {
        var reg = Laya.ClassUtils.regClass;
        reg("Games/AirWar/AirWarMapScript.ts", AirWarMapScript_1.default);
        reg("Hall/MainScene.ts", MainScene_1.default);
    };
    GameConfig.width = 720;
    GameConfig.height = 1280;
    GameConfig.scaleMode = "showall";
    GameConfig.screenMode = "vertical";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "MainScene.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = true;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    return GameConfig;
}());
exports.default = GameConfig;
GameConfig.init();
},{"./Games/AirWar/AirWarMapScript":8,"./Hall/MainScene":11}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SGame_1 = require("../../Core/Game/SGame");
var AirWarGame = /** @class */ (function (_super) {
    __extends(AirWarGame, _super);
    function AirWarGame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AirWarGame;
}(SGame_1.default));
exports.default = AirWarGame;
},{"../../Core/Game/SGame":2}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SScript_1 = require("../../Core/Component/SScript");
var AirWarMapScript = /** @class */ (function (_super) {
    __extends(AirWarMapScript, _super);
    function AirWarMapScript() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AirWarMapScript.prototype.onAwake = function () {
        this.map1 = this.getComponent("bg1");
        this.map2 = this.getComponent("bg2");
    };
    AirWarMapScript.prototype.onUpdate = function () {
        this.map1.y++;
        this.map2.y++;
        if (this.map1.y >= 1280) {
            this.map1.y -= (1280 * 2);
        }
        if (this.map2.y >= 1280) {
            this.map2.y -= (1280 * 2);
        }
    };
    return AirWarMapScript;
}(SScript_1.default));
exports.default = AirWarMapScript;
},{"../../Core/Component/SScript":1}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SScene_1 = require("../../Core/Scene/SScene");
var AirWarScene = /** @class */ (function (_super) {
    __extends(AirWarScene, _super);
    function AirWarScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AirWarScene.prototype.init = function (sceneId) {
        this.scenePath = "AirWar/AirWarScene.scene";
    };
    return AirWarScene;
}(SScene_1.default));
exports.default = AirWarScene;
},{"../../Core/Scene/SScene":5}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameDefine;
(function (GameDefine) {
    GameDefine[GameDefine["AirWar"] = 1] = "AirWar";
})(GameDefine || (GameDefine = {}));
var GameCfg = /** @class */ (function () {
    function GameCfg() {
    }
    GameCfg.getCfg = function (id) {
        return this.gameCfgMap[id];
    };
    GameCfg.gameCfgMap = {
        1: {
            id: 1,
            scenePath: "AirWar/AirWarScene.scene",
            gameType: 1,
            sceneType: 1,
        }
    };
    return GameCfg;
}());
exports.default = GameCfg;
},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SGameManager_1 = require("../Core/Game/SGameManager");
var MainScene = /** @class */ (function (_super) {
    __extends(MainScene, _super);
    function MainScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MainScene.prototype.onEnable = function () {
        this.startBtn = this.owner.getChildAt(0);
        if (this.startBtn)
            this.startBtn.on(Laya.Event.CLICK, this, this.onBtnClick);
    };
    MainScene.prototype.onBtnClick = function () {
        SGameManager_1.default.Instance.goToGame(1);
    };
    return MainScene;
}(Laya.Script));
exports.default = MainScene;
},{"../Core/Game/SGameManager":3}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameConfig_1 = require("./GameConfig");
var Main = /** @class */ (function () {
    function Main() {
        //根据IDE设置初始化引擎		
        if (window["Laya3D"])
            Laya3D.init(GameConfig_1.default.width, GameConfig_1.default.height);
        else
            Laya.init(GameConfig_1.default.width, GameConfig_1.default.height, Laya["WebGL"]);
        Laya["Physics"] && Laya["Physics"].enable();
        Laya["DebugPanel"] && Laya["DebugPanel"].enable();
        Laya.stage.scaleMode = GameConfig_1.default.scaleMode;
        Laya.stage.screenMode = GameConfig_1.default.screenMode;
        //兼容微信不支持加载scene后缀场景
        Laya.URL.exportSceneToJson = GameConfig_1.default.exportSceneToJson;
        //打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
        if (GameConfig_1.default.debug || Laya.Utils.getQueryString("debug") == "true")
            Laya.enableDebugPanel();
        if (GameConfig_1.default.physicsDebug && Laya["PhysicsDebugDraw"])
            Laya["PhysicsDebugDraw"].enable();
        if (GameConfig_1.default.stat)
            Laya.Stat.show();
        Laya.alertGlobalError = true;
        //激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
        Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
    }
    Main.prototype.onVersionLoaded = function () {
        //激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
        Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
    };
    Main.prototype.onConfigLoaded = function () {
        //加载IDE指定的场景
        GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene);
    };
    return Main;
}());
//激活启动类
new Main();
},{"./GameConfig":6}]},{},[12])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkY6L1Byb2dyYW0gRmlsZXMvTGF5YTIuMC9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQ29yZS9Db21wb25lbnQvU1NjcmlwdC50cyIsInNyYy9Db3JlL0dhbWUvU0dhbWUudHMiLCJzcmMvQ29yZS9HYW1lL1NHYW1lTWFuYWdlci50cyIsInNyYy9Db3JlL0dhbWUvU1NoYXJlRXZlbnRPYmplY3QudHMiLCJzcmMvQ29yZS9TY2VuZS9TU2NlbmUudHMiLCJzcmMvR2FtZUNvbmZpZy50cyIsInNyYy9HYW1lcy9BaXJXYXIvQWlyV2FyR2FtZS50cyIsInNyYy9HYW1lcy9BaXJXYXIvQWlyV2FyTWFwU2NyaXB0LnRzIiwic3JjL0dhbWVzL0Fpcldhci9BaXJXYXJTY2VuZS50cyIsInNyYy9HYW1lcy9HYW1lQ2ZnLnRzIiwic3JjL0hhbGwvTWFpblNjZW5lLnRzIiwic3JjL01haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDVkE7SUFBcUMsMkJBQVc7SUFBaEQ7O0lBU0EsQ0FBQztJQVBhLDhCQUFZLEdBQXRCLFVBQTRDLElBQUk7UUFFNUMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUMsSUFBRyxHQUFHLElBQUksSUFBSTtZQUNWLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLE9BQU8sR0FBUSxDQUFDO0lBQ3BCLENBQUM7SUFDTCxjQUFDO0FBQUQsQ0FUQSxBQVNDLENBVG9DLElBQUksQ0FBQyxNQUFNLEdBUy9DOzs7OztBQ1BELDBDQUFxQztBQUNyQywrQ0FBMEM7QUFDMUMsNERBQXVEO0FBQ3ZEO0lBQUE7UUFFWSxlQUFVLEdBQUcsS0FBSyxDQUFDO0lBdUUvQixDQUFDO0lBbEVVLG9CQUFJLEdBQVgsVUFBWSxHQUFHO1FB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QUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU07WUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUM5RixJQUFJLG9CQUFVLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztZQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzNGLElBQUksb0JBQVUsQ0FBQyxJQUFJO1lBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1FBRTdCLGdEQUFnRDtRQUNoRCxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDckksQ0FBQztJQUVELDhCQUFlLEdBQWY7UUFDQywrQ0FBK0M7UUFDL0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFDakcsQ0FBQztJQUVELDZCQUFjLEdBQWQ7UUFDQyxZQUFZO1FBQ1osb0JBQVUsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsb0JBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBQ0YsV0FBQztBQUFELENBL0JBLEFBK0JDLElBQUE7QUFDRCxPQUFPO0FBQ1AsSUFBSSxJQUFJLEVBQUUsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTU2NyaXB0IGV4dGVuZHMgTGF5YS5TY3JpcHRcclxue1xyXG4gICAgcHJvdGVjdGVkIGdldENvbXBvbmVudDxUIGV4dGVuZHMgTGF5YS5Ob2RlPihuYW1lKVxyXG4gICAgeyAgIFxyXG4gICAgICAgIGxldCBvYmogPSB0aGlzLm93bmVyLmdldENoaWxkQnlOYW1lKG5hbWUpO1xyXG4gICAgICAgIGlmKG9iaiA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICByZXR1cm4gb2JqIGFzIFQ7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgSUdhbWUgZnJvbSBcIi4vSUdhbWVcIjtcclxuaW1wb3J0IFNTaGFyZUV2ZW50T2JqZWN0IGZyb20gXCIuL1NTaGFyZUV2ZW50T2JqZWN0XCI7XHJcbmltcG9ydCBTU2NlbmUgZnJvbSBcIi4uL1NjZW5lL1NTY2VuZVwiO1xyXG5pbXBvcnQgR2FtZUNmZyBmcm9tIFwiLi4vLi4vR2FtZXMvR2FtZUNmZ1wiO1xyXG5pbXBvcnQgQWlyV2FyR2FtZSBmcm9tIFwiLi4vLi4vR2FtZXMvQWlyV2FyL0FpcldhckdhbWVcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU0dhbWUgaW1wbGVtZW50cyBJR2FtZVxyXG57XHJcbiAgICBwcml2YXRlIGhhc1N0YXJ0ZWQgPSBmYWxzZTtcclxuICAgIHByb3RlY3RlZCBzY2VuZTpTU2NlbmU7XHJcbiAgICBwcm90ZWN0ZWQgY29uZmlnOmFueTtcclxuXHJcblxyXG4gICAgcHVibGljIGluaXQoY2ZnKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY2ZnO1xyXG4gICAgICAgIHRoaXMuc2NlbmUgPSBTU2NlbmUuY3JlYXRlKHRoaXMuY29uZmlnLnNjZW5lVHlwZSwgdGhpcy5jb25maWcuc2NlbmVQYXRoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIHN0YXJ0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmhhc1N0YXJ0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXN0YXJ0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBhdXNlKClcclxuICAgIHtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzdW1lKClcclxuICAgIHtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcXVpdCgpXHJcbiAgICB7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgdXBkYXRlKClcclxuICAgIHtcclxuICAgICAgICBpZighdGhpcy5oYXNTdGFydGVkKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dNZW51KClcclxuICAgIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvYWQoKVxyXG4gICAge1xyXG4gICAgICAgIC8v5Li05pe25aSE55CGXHJcbiAgICAgICAgdGhpcy5zY2VuZS5sb2FkKExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5zdGFydCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBjbGVhcigpXHJcbiAgICB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKGlkKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBjZmcgPSBHYW1lQ2ZnLmdldENmZyhpZCk7XHJcbiAgICAgICAgaWYoY2ZnID09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBsZXQgZ2FtZSA9IG51bGw7XHJcbiAgICAgICAgc3dpdGNoKGNmZy5nYW1lVHlwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIGdhbWUgPSBuZXcgQWlyV2FyR2FtZSgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGdhbWUgPSBuZXcgU0dhbWUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2FtZS5pbml0KGNmZyk7XHJcbiAgICAgICAgcmV0dXJuIGdhbWU7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgSUdhbWUgZnJvbSBcIi4vSUdhbWVcIjtcclxuaW1wb3J0IFNHYW1lIGZyb20gXCIuL1NHYW1lXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTR2FtZU1hbmFnZXJcclxue1xyXG4gICAgc3RhdGljIGluc3RhbmNlOlNHYW1lTWFuYWdlcjtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IEluc3RhbmNlKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLmluc3RhbmNlID09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlID0gbmV3IFNHYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgZ2FtZTpJR2FtZTtcclxuXHJcbiAgICBwdWJsaWMgZ29Ub0dhbWUoaWQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5pbml0R2FtZShpZCk7XHJcbiAgICAgICAgdGhpcy5nYW1lLmxvYWQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIm+W7umdhbWVcclxuICAgIHByaXZhdGUgaW5pdEdhbWUoaWQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5nYW1lID0gbmV3IFNHYW1lKCk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU1NoYXJlRXZlbnRPYmplY3Rcclxue1xyXG4gICAgcHJvdGVjdGVkIGV2ZW50RGlzcGF0Y2hlcjpMYXlhLkV2ZW50RGlzcGF0Y2hlcjtcclxuXHJcbiAgICBwdWJsaWMgaW5pdChldmVudERpc3BhdGNoZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5ldmVudERpc3BhdGNoZXIgPSBldmVudERpc3BhdGNoZXJcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZXZlbnQodHlwZSwgZGF0YSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLmV2ZW50RGlzcGF0Y2hlci5ldmVudCh0eXBlLCBkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb24odHlwZTphbnksIGNhbGxlcjphbnksIGxpc3RlbmVyOkZ1bmN0aW9uLCBhcmdzOmFueVtdID0gbnVsbClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmV2ZW50RGlzcGF0Y2hlci5vbih0eXBlLCBjYWxsZXIsIGxpc3RlbmVyLCBhcmdzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25jZSh0eXBlOmFueSwgY2FsbGVyOmFueSwgbGlzdGVuZXI6RnVuY3Rpb24sIGFyZ3M6YW55W10gPSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuZXZlbnREaXNwYXRjaGVyLm9uY2UodHlwZSwgY2FsbGVyLCBsaXN0ZW5lciwgYXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9mZih0eXBlOmFueSwgY2FsbGVyOmFueSwgbGlzdGVuZXI6RnVuY3Rpb24sIG9uY2VPbmx5OmJvb2xlYW4gPSBmYWxzZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLmV2ZW50RGlzcGF0Y2hlci5vZmYodHlwZSwgY2FsbGVyLCBsaXN0ZW5lciwgb25jZU9ubHkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvZmZBbGwodHlwZTphbnkpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5ldmVudERpc3BhdGNoZXIub2ZmQWxsKHR5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvZmZBbGxDYWxsZXIoY2FsbGVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuZXZlbnREaXNwYXRjaGVyLm9mZkFsbENhbGxlcihjYWxsZXIpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IFNTaGFyZUV2ZW50T2JqZWN0IGZyb20gXCIuLi9HYW1lL1NTaGFyZUV2ZW50T2JqZWN0XCI7XHJcbmltcG9ydCBBaXJXYXJTY2VuZSBmcm9tIFwiLi4vLi4vR2FtZXMvQWlyV2FyL0FpcldhclNjZW5lXCI7XHJcblxyXG4vL1NjZW5l55u45b2T5LqOVUkgIOaPkOS+m3Vp5ZKM5oyC6L2957uE5Lu2XHJcbmVudW0gTG9hZFN0YXRlXHJcbntcclxuICAgIE5vbmUgPSAxLFxyXG4gICAgTG9hZGluZyA9IDIsXHJcbiAgICBMb2FkZWQgPSAzLFxyXG4gICAgRGVzdHJveWVkID0gNCxcclxufVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTU2NlbmUgZXh0ZW5kcyBTU2hhcmVFdmVudE9iamVjdFxyXG57XHJcbiAgICBwcm90ZWN0ZWQgc2NlbmVQYXRoOnN0cmluZztcclxuICAgIHByb3RlY3RlZCBzY2VuZVR5cGU6bnVtYmVyO1xyXG4gICAgcHJvdGVjdGVkIHNjZW5lQ29uZmlnOnN0cmluZztcclxuICAgIHByb3RlY3RlZCBzY2VuZTpMYXlhLlNjZW5lO1xyXG4gICAgcHJvdGVjdGVkIGF1dG9EZXN0cm95OmJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBsb2FkU3RhdGU6TG9hZFN0YXRlID0gTG9hZFN0YXRlLk5vbmU7XHJcbiAgICBwdWJsaWMgc2NlbmVJZDpudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBjb21wbGV0ZTpMYXlhLkhhbmRsZXI7XHJcblxyXG4gICAgcHVibGljIGluaXQoc2NlbmVJZClcclxuICAgIHtcclxuICAgICAgICAvLyB0aGlzLnNjZW5lUGF0aCA9IHBhdGg7XHJcbiAgICAgICAgLy8gdGhpcy5hdXRvRGVzdHJveSA9IGF1dG9EZXN0cm95O1xyXG4gICAgICAgIHRoaXMubG9hZFN0YXRlID0gTG9hZFN0YXRlLk5vbmU7XHJcbiAgICB9XHJcbiAgICAvL+WKoOi9veWcuuaZr1xyXG4gICAgcHVibGljIGxvYWQoY29tcGxldGU6TGF5YS5IYW5kbGVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY29tcGxldGUgPSBjb21wbGV0ZTtcclxuICAgICAgICB0aGlzLmxvYWRTdGF0ZSA9IExvYWRTdGF0ZS5Mb2FkaW5nO1xyXG4gICAgICAgIExheWEuU2NlbmUub3Blbih0aGlzLnNjZW5lUGF0aCwgZmFsc2UsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vbkxvYWRlZCkpO1xyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZGVkKHNjZW5lKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubG9hZFN0YXRlID0gTG9hZFN0YXRlLkxvYWRlZDtcclxuICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XHJcbiAgICAgICAgdGhpcy5zY2VuZS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgLy9nYW1l5o6n5Yi25Zy65pmv5pi+56S6XHJcbiAgICAgICAgaWYodGhpcy5jb21wbGV0ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tcGxldGUucnVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29tcGxldGUgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvdygpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zY2VuZS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm9uT3BlbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbk9wZW4oKVxyXG4gICAge1xyXG5cclxuICAgIH1cclxuICAgIHB1YmxpYyBleGl0KClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLnNjZW5lKVxyXG4gICAgICAgICAgICB0aGlzLnNjZW5lLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm9uRXhpdCgpO1xyXG4gICAgICAgIGlmKHRoaXMuYXV0b0Rlc3Ryb3kpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgTGF5YS5TY2VuZS5nYygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkV4aXQoKVxyXG4gICAge31cclxuXHJcbiAgICBwdWJsaWMgZGVzdHJveSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5sb2FkU3RhdGUgPSBMb2FkU3RhdGUuRGVzdHJveWVkO1xyXG4gICAgICAgIHRoaXMub25EZXN0cm95KCk7XHJcbiAgICAgICAgaWYodGhpcy5zY2VuZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB0aGlzLnNjZW5lID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpXHJcbiAgICB7fVxyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShzY2VuZVR5cGUsIHNjZW5lTmFtZSlcclxuICAgIHtcclxuICAgICAgICAvL+ivu+WPlumFjee9ruOAgeiOt+WPluexu+Wei+OAgeWIm+W7uuWvueW6lOWcuuaZr1xyXG4gICAgICAgIGxldCBzY2VuZSA9IG51bGw7XHJcbiAgICAgICAgc3dpdGNoKHNjZW5lVHlwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIHNjZW5lID0gbmV3IEFpcldhclNjZW5lKCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgc2NlbmUgPSBuZXcgU1NjZW5lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNjZW5lLmluaXQoc2NlbmVOYW1lKTtcclxuICAgICAgICByZXR1cm4gc2NlbmU7XHJcbiAgICB9XHJcbn0iLCIvKipUaGlzIGNsYXNzIGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGJ5IExheWFBaXJJREUsIHBsZWFzZSBkbyBub3QgbWFrZSBhbnkgbW9kaWZpY2F0aW9ucy4gKi9cclxuaW1wb3J0IEFpcldhck1hcFNjcmlwdCBmcm9tIFwiLi9HYW1lcy9BaXJXYXIvQWlyV2FyTWFwU2NyaXB0XCJcbmltcG9ydCBNYWluU2NlbmUgZnJvbSBcIi4vSGFsbC9NYWluU2NlbmVcIlxyXG4vKlxyXG4qIOa4uOaIj+WIneWni+WMlumFjee9rjtcclxuKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUNvbmZpZ3tcclxuICAgIHN0YXRpYyB3aWR0aDpudW1iZXI9NzIwO1xyXG4gICAgc3RhdGljIGhlaWdodDpudW1iZXI9MTI4MDtcclxuICAgIHN0YXRpYyBzY2FsZU1vZGU6c3RyaW5nPVwic2hvd2FsbFwiO1xyXG4gICAgc3RhdGljIHNjcmVlbk1vZGU6c3RyaW5nPVwidmVydGljYWxcIjtcclxuICAgIHN0YXRpYyBhbGlnblY6c3RyaW5nPVwidG9wXCI7XHJcbiAgICBzdGF0aWMgYWxpZ25IOnN0cmluZz1cImxlZnRcIjtcclxuICAgIHN0YXRpYyBzdGFydFNjZW5lOmFueT1cIk1haW5TY2VuZS5zY2VuZVwiO1xyXG4gICAgc3RhdGljIHNjZW5lUm9vdDpzdHJpbmc9XCJcIjtcclxuICAgIHN0YXRpYyBkZWJ1Zzpib29sZWFuPXRydWU7XHJcbiAgICBzdGF0aWMgc3RhdDpib29sZWFuPWZhbHNlO1xyXG4gICAgc3RhdGljIHBoeXNpY3NEZWJ1Zzpib29sZWFuPWZhbHNlO1xyXG4gICAgc3RhdGljIGV4cG9ydFNjZW5lVG9Kc29uOmJvb2xlYW49dHJ1ZTtcclxuICAgIGNvbnN0cnVjdG9yKCl7fVxyXG4gICAgc3RhdGljIGluaXQoKXtcclxuICAgICAgICB2YXIgcmVnOiBGdW5jdGlvbiA9IExheWEuQ2xhc3NVdGlscy5yZWdDbGFzcztcclxuICAgICAgICByZWcoXCJHYW1lcy9BaXJXYXIvQWlyV2FyTWFwU2NyaXB0LnRzXCIsQWlyV2FyTWFwU2NyaXB0KTtcbiAgICAgICAgcmVnKFwiSGFsbC9NYWluU2NlbmUudHNcIixNYWluU2NlbmUpO1xyXG4gICAgfVxyXG59XHJcbkdhbWVDb25maWcuaW5pdCgpOyIsImltcG9ydCBTR2FtZSBmcm9tIFwiLi4vLi4vQ29yZS9HYW1lL1NHYW1lXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBaXJXYXJHYW1lIGV4dGVuZHMgU0dhbWVcclxue1xyXG4gICAgXHJcbn0iLCJpbXBvcnQgU1NjcmlwdCBmcm9tIFwiLi4vLi4vQ29yZS9Db21wb25lbnQvU1NjcmlwdFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWlyV2FyTWFwU2NyaXB0IGV4dGVuZHMgU1NjcmlwdFxyXG57XHJcbiAgICBwcml2YXRlIG1hcDE6TGF5YS5JbWFnZTtcclxuICAgIHByaXZhdGUgbWFwMjpMYXlhLkltYWdlO1xyXG5cclxuICAgIG9uQXdha2UoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubWFwMSA9IHRoaXMuZ2V0Q29tcG9uZW50PExheWEuSW1hZ2U+KFwiYmcxXCIpO1xyXG4gICAgICAgIHRoaXMubWFwMiA9IHRoaXMuZ2V0Q29tcG9uZW50PExheWEuSW1hZ2U+KFwiYmcyXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVXBkYXRlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1hcDEueSsrO1xyXG4gICAgICAgIHRoaXMubWFwMi55Kys7XHJcbiAgICAgICAgaWYodGhpcy5tYXAxLnkgPj0gMTI4MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubWFwMS55IC09ICgxMjgwICogMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMubWFwMi55ID49IDEyODApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1hcDIueSAtPSAoMTI4MCAqIDIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCBTU2NlbmUgZnJvbSBcIi4uLy4uL0NvcmUvU2NlbmUvU1NjZW5lXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBaXJXYXJTY2VuZSBleHRlbmRzIFNTY2VuZVxyXG57XHJcbiAgICBwdWJsaWMgaW5pdChzY2VuZUlkKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc2NlbmVQYXRoID0gXCJBaXJXYXIvQWlyV2FyU2NlbmUuc2NlbmVcIlxyXG4gICAgfVxyXG59IiwiZW51bSBHYW1lRGVmaW5lXHJcbntcclxuICAgIEFpcldhciA9IDEsXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVDZmdcclxue1xyXG4gICAgc3RhdGljIGdhbWVDZmdNYXAgPVxyXG4gICAge1xyXG4gICAgICAgIDE6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZDoxLFxyXG4gICAgICAgICAgICBzY2VuZVBhdGg6XCJBaXJXYXIvQWlyV2FyU2NlbmUuc2NlbmVcIixcclxuICAgICAgICAgICAgZ2FtZVR5cGU6MSwgICAgIC8v5a+55bqUSUdhbWVcclxuICAgICAgICAgICAgc2NlbmVUeXBlOjEsICAgLy/kuI3lkIzmuLjmiI/nm7jlkIzlnLrmma/nsbsg5a+55bqUU2NlbmVcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRDZmcoaWQpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZUNmZ01hcFtpZF1cclxuICAgIH1cclxufSIsImltcG9ydCBTU2NlbmUgZnJvbSBcIi4uL0NvcmUvU2NlbmUvU1NjZW5lXCJcclxuaW1wb3J0IFNHYW1lTWFuYWdlciBmcm9tIFwiLi4vQ29yZS9HYW1lL1NHYW1lTWFuYWdlclwiO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluU2NlbmUgZXh0ZW5kcyBMYXlhLlNjcmlwdFxyXG57XHJcbiAgICBwcml2YXRlIHN0YXJ0QnRuOkxheWEuSW1hZ2U7XHJcbiAgICBvbkVuYWJsZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zdGFydEJ0biA9IHRoaXMub3duZXIuZ2V0Q2hpbGRBdCgwKSBhcyBMYXlhLkltYWdlO1xyXG4gICAgICAgIGlmKHRoaXMuc3RhcnRCdG4pXHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRCdG4ub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5vbkJ0bkNsaWNrKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkJ0bkNsaWNrKClcclxuICAgIHtcclxuICAgICAgICBTR2FtZU1hbmFnZXIuSW5zdGFuY2UuZ29Ub0dhbWUoMSk7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IEdhbWVDb25maWcgZnJvbSBcIi4vR2FtZUNvbmZpZ1wiO1xyXG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuL0NvcmUvRGVidWcvTG9nZ2VyXCI7XHJcbmNsYXNzIE1haW4ge1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0Ly/moLnmja5JREXorr7nva7liJ3lp4vljJblvJXmk45cdFx0XHJcblx0XHRpZiAod2luZG93W1wiTGF5YTNEXCJdKSBMYXlhM0QuaW5pdChHYW1lQ29uZmlnLndpZHRoLCBHYW1lQ29uZmlnLmhlaWdodCk7XHJcblx0XHRlbHNlIExheWEuaW5pdChHYW1lQ29uZmlnLndpZHRoLCBHYW1lQ29uZmlnLmhlaWdodCwgTGF5YVtcIldlYkdMXCJdKTtcclxuXHRcdExheWFbXCJQaHlzaWNzXCJdICYmIExheWFbXCJQaHlzaWNzXCJdLmVuYWJsZSgpO1xyXG5cdFx0TGF5YVtcIkRlYnVnUGFuZWxcIl0gJiYgTGF5YVtcIkRlYnVnUGFuZWxcIl0uZW5hYmxlKCk7XHJcblx0XHRMYXlhLnN0YWdlLnNjYWxlTW9kZSA9IEdhbWVDb25maWcuc2NhbGVNb2RlO1xyXG5cdFx0TGF5YS5zdGFnZS5zY3JlZW5Nb2RlID0gR2FtZUNvbmZpZy5zY3JlZW5Nb2RlO1xyXG5cdFx0Ly/lhbzlrrnlvq7kv6HkuI3mlK/mjIHliqDovb1zY2VuZeWQjue8gOWcuuaZr1xyXG5cdFx0TGF5YS5VUkwuZXhwb3J0U2NlbmVUb0pzb24gPSBHYW1lQ29uZmlnLmV4cG9ydFNjZW5lVG9Kc29uO1xyXG5cclxuXHRcdC8v5omT5byA6LCD6K+V6Z2i5p2/77yI6YCa6L+HSURF6K6+572u6LCD6K+V5qih5byP77yM5oiW6ICFdXJs5Zyw5Z2A5aKe5YqgZGVidWc9dHJ1ZeWPguaVsO+8jOWdh+WPr+aJk+W8gOiwg+ivlemdouadv++8iVxyXG5cdFx0aWYgKEdhbWVDb25maWcuZGVidWcgfHwgTGF5YS5VdGlscy5nZXRRdWVyeVN0cmluZyhcImRlYnVnXCIpID09IFwidHJ1ZVwiKSBMYXlhLmVuYWJsZURlYnVnUGFuZWwoKTtcclxuXHRcdGlmIChHYW1lQ29uZmlnLnBoeXNpY3NEZWJ1ZyAmJiBMYXlhW1wiUGh5c2ljc0RlYnVnRHJhd1wiXSkgTGF5YVtcIlBoeXNpY3NEZWJ1Z0RyYXdcIl0uZW5hYmxlKCk7XHJcblx0XHRpZiAoR2FtZUNvbmZpZy5zdGF0KSBMYXlhLlN0YXQuc2hvdygpO1xyXG5cdFx0TGF5YS5hbGVydEdsb2JhbEVycm9yID0gdHJ1ZTtcclxuXHJcblx0XHQvL+a/gOa0u+i1hOa6kOeJiOacrOaOp+WItu+8jHZlcnNpb24uanNvbueUsUlEReWPkeW4g+WKn+iDveiHquWKqOeUn+aIkO+8jOWmguaenOayoeacieS5n+S4jeW9seWTjeWQjue7rea1geeoi1xyXG5cdFx0TGF5YS5SZXNvdXJjZVZlcnNpb24uZW5hYmxlKFwidmVyc2lvbi5qc29uXCIsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vblZlcnNpb25Mb2FkZWQpLCBMYXlhLlJlc291cmNlVmVyc2lvbi5GSUxFTkFNRV9WRVJTSU9OKTtcclxuXHR9XHJcblxyXG5cdG9uVmVyc2lvbkxvYWRlZCgpOiB2b2lkIHtcclxuXHRcdC8v5r+A5rS75aSn5bCP5Zu+5pig5bCE77yM5Yqg6L295bCP5Zu+55qE5pe25YCZ77yM5aaC5p6c5Y+R546w5bCP5Zu+5Zyo5aSn5Zu+5ZCI6ZuG6YeM6Z2i77yM5YiZ5LyY5YWI5Yqg6L295aSn5Zu+5ZCI6ZuG77yM6ICM5LiN5piv5bCP5Zu+XHJcblx0XHRMYXlhLkF0bGFzSW5mb01hbmFnZXIuZW5hYmxlKFwiZmlsZWNvbmZpZy5qc29uXCIsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vbkNvbmZpZ0xvYWRlZCkpO1xyXG5cdH1cclxuXHJcblx0b25Db25maWdMb2FkZWQoKTogdm9pZCB7XHJcblx0XHQvL+WKoOi9vUlEReaMh+WumueahOWcuuaZr1xyXG5cdFx0R2FtZUNvbmZpZy5zdGFydFNjZW5lICYmIExheWEuU2NlbmUub3BlbihHYW1lQ29uZmlnLnN0YXJ0U2NlbmUpO1xyXG5cdH1cclxufVxyXG4vL+a/gOa0u+WQr+WKqOexu1xyXG5uZXcgTWFpbigpO1xyXG4iXX0=

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
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["Info"] = 1] = "Info";
    LogLevel[LogLevel["Warning"] = 2] = "Warning";
    LogLevel[LogLevel["Error"] = 4] = "Error";
    LogLevel[LogLevel["All"] = 255] = "All";
})(LogLevel || (LogLevel = {}));
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this.checkCanLog(LogLevel.Info))
            return;
        var content = args.join("\t");
        content = this.getLogContent("INFO", content);
        console.log(content);
    };
    Logger.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this.checkCanLog(LogLevel.Warning))
            return;
        var content = args.join("\t");
        content = this.getLogContent("WARNING", content);
        console.warn(content);
    };
    Logger.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this.checkCanLog(LogLevel.Error))
            return;
        var content = args.join("\t");
        content = this.getLogContent("ERROR", content);
        console.warn(content);
    };
    Logger.getLogContent = function (pre, content) {
        return "[" + pre + ":(" + new Date().toLocaleTimeString() + ")]:" + content;
    };
    Logger.checkCanLog = function (logLevel) {
        return this.enable && ((logLevel & this.logLevel) > 0);
    };
    Logger.enable = true;
    Logger.logLevel = LogLevel.All;
    return Logger;
}());
exports.default = Logger;
},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoadState;
(function (LoadState) {
    LoadState[LoadState["None"] = 1] = "None";
    LoadState[LoadState["Loading"] = 2] = "Loading";
    LoadState[LoadState["Loaded"] = 3] = "Loaded";
    LoadState[LoadState["Destroyed"] = 4] = "Destroyed";
})(LoadState || (LoadState = {}));
var SScene = /** @class */ (function () {
    function SScene(path, autoDestroy) {
        if (autoDestroy === void 0) { autoDestroy = true; }
        this.autoDestroy = false;
        this.loadState = LoadState.None;
        this.scenePath = path;
        this.autoDestroy = autoDestroy;
        this.loadState = LoadState.None;
    }
    //加载场景
    SScene.prototype.load = function () {
        this.loadState = LoadState.Loading;
        Laya.Scene.open(this.scenePath, false, Laya.Handler.create(this, this.onLoaded));
    };
    SScene.prototype.onLoaded = function (scene) {
        this.loadState = LoadState.Loaded;
        this.scene = scene;
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
    return SScene;
}());
exports.default = SScene;
},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SScene_1 = require("./SScene");
var SSceneManager = /** @class */ (function () {
    function SSceneManager() {
    }
    Object.defineProperty(SSceneManager, "Instance", {
        get: function () {
            if (this._instance == null)
                this._instance = new SSceneManager();
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    SSceneManager.prototype.goToScene = function (sceneId) {
        if (this.currentScene && this.currentScene.sceneId == sceneId) {
            return;
        }
        this.exitScene();
        this.enterScene(sceneId);
    };
    SSceneManager.prototype.enterScene = function (sceneId) {
        this.currentScene = new SScene_1.default("AirWar/AirWar.scene");
        this.currentScene.load();
    };
    SSceneManager.prototype.exitScene = function () {
        if (this.currentScene == null)
            return;
        this.currentScene.exit();
        this.currentScene = null;
    };
    return SSceneManager;
}());
exports.default = SSceneManager;
},{"./SScene":3}],5:[function(require,module,exports){
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
},{"./Games/AirWar/AirWarMapScript":6,"./Hall/MainScene":7}],6:[function(require,module,exports){
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
},{"../../Core/Component/SScript":1}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SSceneManager_1 = require("../Core/Scene/SSceneManager");
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
        SSceneManager_1.default.Instance.goToScene(1);
        //Laya.Scene.open("AirWar/AirWar.scene");
    };
    return MainScene;
}(Laya.Script));
exports.default = MainScene;
},{"../Core/Scene/SSceneManager":4}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameConfig_1 = require("./GameConfig");
var Logger_1 = require("./Core/Debug/Logger");
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
        Logger_1.default.info(GameConfig_1.default);
    };
    return Main;
}());
//激活启动类
new Main();
},{"./Core/Debug/Logger":2,"./GameConfig":5}]},{},[8])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkY6L1Byb2dyYW0gRmlsZXMvTGF5YTIuMC9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQ29yZS9Db21wb25lbnQvU1NjcmlwdC50cyIsInNyYy9Db3JlL0RlYnVnL0xvZ2dlci50cyIsInNyYy9Db3JlL1NjZW5lL1NTY2VuZS50cyIsInNyYy9Db3JlL1NjZW5lL1NTY2VuZU1hbmFnZXIudHMiLCJzcmMvR2FtZUNvbmZpZy50cyIsInNyYy9HYW1lcy9BaXJXYXIvQWlyV2FyTWFwU2NyaXB0LnRzIiwic3JjL0hhbGwvTWFpblNjZW5lLnRzIiwic3JjL01haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDVkE7SUFBcUMsMkJBQVc7SUFBaEQ7O0lBU0EsQ0FBQztJQVBhLDhCQUFZLEdBQXRCLFVBQTRDLElBQUk7UUFFNUMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUMsSUFBRyxHQUFHLElBQUksSUFBSTtZQUNWLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLE9BQU8sR0FBUSxDQUFDO0lBQ3BCLENBQUM7SUFDTCxjQUFDO0FBQUQsQ0FUQSxBQVNDLENBVG9DLElBQUksQ0FBQyxNQUFNLEdBUy9DOzs7OztBQ1JELElBQUssUUFNSjtBQU5ELFdBQUssUUFBUTtJQUVULHVDQUFXLENBQUE7SUFDWCw2Q0FBYyxDQUFBO0lBQ2QseUNBQVksQ0FBQTtJQUNaLHVDQUFVLENBQUE7QUFDZCxDQUFDLEVBTkksUUFBUSxLQUFSLFFBQVEsUUFNWjtBQUNEO0lBQUE7SUF3Q0EsQ0FBQztJQW5DaUIsV0FBSSxHQUFsQjtRQUFtQixjQUFPO2FBQVAsVUFBTyxFQUFQLHFCQUFPLEVBQVAsSUFBTztZQUFQLHlCQUFPOztRQUV0QixJQUFHLENBQUMs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QUM7SUFDekIsQ0FBQztJQUNGLFdBQUM7QUFBRCxDQWhDQSxBQWdDQyxJQUFBO0FBQ0QsT0FBTztBQUNQLElBQUksSUFBSSxFQUFFLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG4oZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU1NjcmlwdCBleHRlbmRzIExheWEuU2NyaXB0XHJcbntcclxuICAgIHByb3RlY3RlZCBnZXRDb21wb25lbnQ8VCBleHRlbmRzIExheWEuTm9kZT4obmFtZSlcclxuICAgIHsgICBcclxuICAgICAgICBsZXQgb2JqID0gdGhpcy5vd25lci5nZXRDaGlsZEJ5TmFtZShuYW1lKTtcclxuICAgICAgICBpZihvYmogPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgcmV0dXJuIG9iaiBhcyBUO1xyXG4gICAgfVxyXG59IiwiXHJcbmVudW0gTG9nTGV2ZWxcclxue1xyXG4gICAgSW5mbyA9IDB4MDEsXHJcbiAgICBXYXJuaW5nID0gMHgwMixcclxuICAgIEVycm9yID0gMHgwNCxcclxuICAgIEFsbCA9IDB4ZmYsXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nZ2VyXHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgZW5hYmxlID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBzdGF0aWMgbG9nTGV2ZWwgPSBMb2dMZXZlbC5BbGw7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBpbmZvKC4uLmFyZ3MpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuY2hlY2tDYW5Mb2coTG9nTGV2ZWwuSW5mbykpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBsZXQgY29udGVudCA9IGFyZ3Muam9pbihcIlxcdFwiKTtcclxuICAgICAgICBjb250ZW50ID0gdGhpcy5nZXRMb2dDb250ZW50KFwiSU5GT1wiLCBjb250ZW50KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhjb250ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHdhcm4oLi4uYXJncylcclxuICAgIHtcclxuICAgICAgICBpZighdGhpcy5jaGVja0NhbkxvZyhMb2dMZXZlbC5XYXJuaW5nKSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGxldCBjb250ZW50ID0gYXJncy5qb2luKFwiXFx0XCIpO1xyXG4gICAgICAgIGNvbnRlbnQgPSB0aGlzLmdldExvZ0NvbnRlbnQoXCJXQVJOSU5HXCIsIGNvbnRlbnQpO1xyXG4gICAgICAgIGNvbnNvbGUud2Fybihjb250ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGVycm9yKC4uLmFyZ3MpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuY2hlY2tDYW5Mb2coTG9nTGV2ZWwuRXJyb3IpKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgbGV0IGNvbnRlbnQgPSBhcmdzLmpvaW4oXCJcXHRcIik7XHJcbiAgICAgICAgY29udGVudCA9IHRoaXMuZ2V0TG9nQ29udGVudChcIkVSUk9SXCIsIGNvbnRlbnQpO1xyXG4gICAgICAgIGNvbnNvbGUud2Fybihjb250ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRMb2dDb250ZW50KHByZTpzdHJpbmcsIGNvbnRlbnQ6c3RyaW5nKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gXCJbXCIgKyBwcmUgKyBcIjooXCIgKyBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpICsgXCIpXTpcIiArIGNvbnRlbnQ7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHN0YXRpYyBjaGVja0NhbkxvZyhsb2dMZXZlbDpMb2dMZXZlbClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbmFibGUgJiYgKChsb2dMZXZlbCAmIHRoaXMubG9nTGV2ZWwpID4gMClcclxuICAgIH1cclxufSIsImVudW0gTG9hZFN0YXRlXHJcbntcclxuICAgIE5vbmUgPSAxLFxyXG4gICAgTG9hZGluZyA9IDIsXHJcbiAgICBMb2FkZWQgPSAzLFxyXG4gICAgRGVzdHJveWVkID0gNCxcclxufVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTU2NlbmVcclxue1xyXG4gICAgcHJvdGVjdGVkIHNjZW5lUGF0aDpzdHJpbmc7XHJcbiAgICBwcm90ZWN0ZWQgc2NlbmVUeXBlOm51bWJlcjtcclxuICAgIHByb3RlY3RlZCBzY2VuZUNvbmZpZzpzdHJpbmc7XHJcbiAgICBwcm90ZWN0ZWQgc2NlbmU6TGF5YS5TY2VuZTtcclxuICAgIHByb3RlY3RlZCBhdXRvRGVzdHJveTpib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgbG9hZFN0YXRlOkxvYWRTdGF0ZSA9IExvYWRTdGF0ZS5Ob25lO1xyXG4gICAgcHVibGljIHNjZW5lSWQ6bnVtYmVyO1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwYXRoOnN0cmluZywgYXV0b0Rlc3Ryb3kgPSB0cnVlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc2NlbmVQYXRoID0gcGF0aDtcclxuICAgICAgICB0aGlzLmF1dG9EZXN0cm95ID0gYXV0b0Rlc3Ryb3k7XHJcbiAgICAgICAgdGhpcy5sb2FkU3RhdGUgPSBMb2FkU3RhdGUuTm9uZTtcclxuICAgIH1cclxuICAgIC8v5Yqg6L295Zy65pmvXHJcbiAgICBwdWJsaWMgbG9hZCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5sb2FkU3RhdGUgPSBMb2FkU3RhdGUuTG9hZGluZztcclxuICAgICAgICBMYXlhLlNjZW5lLm9wZW4odGhpcy5zY2VuZVBhdGgsIGZhbHNlLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMub25Mb2FkZWQpKTtcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWRlZChzY2VuZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLmxvYWRTdGF0ZSA9IExvYWRTdGF0ZS5Mb2FkZWQ7XHJcbiAgICAgICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xyXG4gICAgICAgIHRoaXMub25PcGVuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uT3BlbigpXHJcbiAgICB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBleGl0KClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLnNjZW5lKVxyXG4gICAgICAgICAgICB0aGlzLnNjZW5lLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm9uRXhpdCgpO1xyXG4gICAgICAgIGlmKHRoaXMuYXV0b0Rlc3Ryb3kpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgTGF5YS5TY2VuZS5nYygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkV4aXQoKVxyXG4gICAge31cclxuXHJcbiAgICBwdWJsaWMgZGVzdHJveSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5sb2FkU3RhdGUgPSBMb2FkU3RhdGUuRGVzdHJveWVkO1xyXG4gICAgICAgIHRoaXMub25EZXN0cm95KCk7XHJcbiAgICAgICAgaWYodGhpcy5zY2VuZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB0aGlzLnNjZW5lID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpXHJcbiAgICB7fVxyXG59IiwiaW1wb3J0IFNTY2VuZSBmcm9tIFwiLi9TU2NlbmVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNTY2VuZU1hbmFnZXJcclxue1xyXG4gICAgcHJvdGVjdGVkIGN1cnJlbnRTY2VuZTpTU2NlbmU7XHJcbiAgICBcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTpTU2NlbmVNYW5hZ2VyO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgSW5zdGFuY2UoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlID0gbmV3IFNTY2VuZU1hbmFnZXIoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdvVG9TY2VuZShzY2VuZUlkKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuY3VycmVudFNjZW5lICYmIHRoaXMuY3VycmVudFNjZW5lLnNjZW5lSWQgPT0gc2NlbmVJZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5leGl0U2NlbmUoKTtcclxuICAgICAgICB0aGlzLmVudGVyU2NlbmUoc2NlbmVJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGVudGVyU2NlbmUoc2NlbmVJZClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZSA9IG5ldyBTU2NlbmUoXCJBaXJXYXIvQWlyV2FyLnNjZW5lXCIpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNjZW5lLmxvYWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZXhpdFNjZW5lKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLmN1cnJlbnRTY2VuZSA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2NlbmUuZXhpdCgpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNjZW5lID0gbnVsbDtcclxuICAgIH1cclxufSIsIi8qKlRoaXMgY2xhc3MgaXMgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgYnkgTGF5YUFpcklERSwgcGxlYXNlIGRvIG5vdCBtYWtlIGFueSBtb2RpZmljYXRpb25zLiAqL1xyXG5pbXBvcnQgQWlyV2FyTWFwU2NyaXB0IGZyb20gXCIuL0dhbWVzL0Fpcldhci9BaXJXYXJNYXBTY3JpcHRcIlxyXG5pbXBvcnQgTWFpblNjZW5lIGZyb20gXCIuL0hhbGwvTWFpblNjZW5lXCJcclxuLypcclxuKiDmuLjmiI/liJ3lp4vljJbphY3nva47XHJcbiovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVDb25maWd7XHJcbiAgICBzdGF0aWMgd2lkdGg6bnVtYmVyPTcyMDtcclxuICAgIHN0YXRpYyBoZWlnaHQ6bnVtYmVyPTEyODA7XHJcbiAgICBzdGF0aWMgc2NhbGVNb2RlOnN0cmluZz1cInNob3dhbGxcIjtcclxuICAgIHN0YXRpYyBzY3JlZW5Nb2RlOnN0cmluZz1cInZlcnRpY2FsXCI7XHJcbiAgICBzdGF0aWMgYWxpZ25WOnN0cmluZz1cInRvcFwiO1xyXG4gICAgc3RhdGljIGFsaWduSDpzdHJpbmc9XCJsZWZ0XCI7XHJcbiAgICBzdGF0aWMgc3RhcnRTY2VuZTphbnk9XCJNYWluU2NlbmUuc2NlbmVcIjtcclxuICAgIHN0YXRpYyBzY2VuZVJvb3Q6c3RyaW5nPVwiXCI7XHJcbiAgICBzdGF0aWMgZGVidWc6Ym9vbGVhbj10cnVlO1xyXG4gICAgc3RhdGljIHN0YXQ6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHN0YXRpYyBwaHlzaWNzRGVidWc6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHN0YXRpYyBleHBvcnRTY2VuZVRvSnNvbjpib29sZWFuPXRydWU7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe31cclxuICAgIHN0YXRpYyBpbml0KCl7XHJcbiAgICAgICAgdmFyIHJlZzogRnVuY3Rpb24gPSBMYXlhLkNsYXNzVXRpbHMucmVnQ2xhc3M7XHJcbiAgICAgICAgcmVnKFwiR2FtZXMvQWlyV2FyL0Fpcldhck1hcFNjcmlwdC50c1wiLEFpcldhck1hcFNjcmlwdCk7XHJcbiAgICAgICAgcmVnKFwiSGFsbC9NYWluU2NlbmUudHNcIixNYWluU2NlbmUpO1xyXG4gICAgfVxyXG59XHJcbkdhbWVDb25maWcuaW5pdCgpOyIsImltcG9ydCBTU2NyaXB0IGZyb20gXCIuLi8uLi9Db3JlL0NvbXBvbmVudC9TU2NyaXB0XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBaXJXYXJNYXBTY3JpcHQgZXh0ZW5kcyBTU2NyaXB0XHJcbntcclxuICAgIHByaXZhdGUgbWFwMTpMYXlhLkltYWdlO1xyXG4gICAgcHJpdmF0ZSBtYXAyOkxheWEuSW1hZ2U7XHJcblxyXG4gICAgb25Bd2FrZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tYXAxID0gdGhpcy5nZXRDb21wb25lbnQ8TGF5YS5JbWFnZT4oXCJiZzFcIik7XHJcbiAgICAgICAgdGhpcy5tYXAyID0gdGhpcy5nZXRDb21wb25lbnQ8TGF5YS5JbWFnZT4oXCJiZzJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgb25VcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubWFwMS55Kys7XHJcbiAgICAgICAgdGhpcy5tYXAyLnkrKztcclxuICAgICAgICBpZih0aGlzLm1hcDEueSA+PSAxMjgwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tYXAxLnkgLT0gKDEyODAgKiAyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5tYXAyLnkgPj0gMTI4MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubWFwMi55IC09ICgxMjgwICogMik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IFNTY2VuZSBmcm9tIFwiLi4vQ29yZS9TY2VuZS9TU2NlbmVcIlxyXG5pbXBvcnQgU1NjZW5lTWFuYWdlciBmcm9tIFwiLi4vQ29yZS9TY2VuZS9TU2NlbmVNYW5hZ2VyXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW5TY2VuZSBleHRlbmRzIExheWEuU2NyaXB0XHJcbntcclxuICAgIHByaXZhdGUgc3RhcnRCdG46TGF5YS5JbWFnZTtcclxuICAgIG9uRW5hYmxlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnN0YXJ0QnRuID0gdGhpcy5vd25lci5nZXRDaGlsZEF0KDApIGFzIExheWEuSW1hZ2U7XHJcbiAgICAgICAgaWYodGhpcy5zdGFydEJ0bilcclxuICAgICAgICAgICAgdGhpcy5zdGFydEJ0bi5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLm9uQnRuQ2xpY2spO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQnRuQ2xpY2soKVxyXG4gICAge1xyXG4gICAgICAgIFNTY2VuZU1hbmFnZXIuSW5zdGFuY2UuZ29Ub1NjZW5lKDEpO1xyXG4gICAgICAgIC8vTGF5YS5TY2VuZS5vcGVuKFwiQWlyV2FyL0Fpcldhci5zY2VuZVwiKTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgR2FtZUNvbmZpZyBmcm9tIFwiLi9HYW1lQ29uZmlnXCI7XHJcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4vQ29yZS9EZWJ1Zy9Mb2dnZXJcIjtcclxuY2xhc3MgTWFpbiB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHQvL+agueaNrklEReiuvue9ruWIneWni+WMluW8leaTjlx0XHRcclxuXHRcdGlmICh3aW5kb3dbXCJMYXlhM0RcIl0pIExheWEzRC5pbml0KEdhbWVDb25maWcud2lkdGgsIEdhbWVDb25maWcuaGVpZ2h0KTtcclxuXHRcdGVsc2UgTGF5YS5pbml0KEdhbWVDb25maWcud2lkdGgsIEdhbWVDb25maWcuaGVpZ2h0LCBMYXlhW1wiV2ViR0xcIl0pO1xyXG5cdFx0TGF5YVtcIlBoeXNpY3NcIl0gJiYgTGF5YVtcIlBoeXNpY3NcIl0uZW5hYmxlKCk7XHJcblx0XHRMYXlhW1wiRGVidWdQYW5lbFwiXSAmJiBMYXlhW1wiRGVidWdQYW5lbFwiXS5lbmFibGUoKTtcclxuXHRcdExheWEuc3RhZ2Uuc2NhbGVNb2RlID0gR2FtZUNvbmZpZy5zY2FsZU1vZGU7XHJcblx0XHRMYXlhLnN0YWdlLnNjcmVlbk1vZGUgPSBHYW1lQ29uZmlnLnNjcmVlbk1vZGU7XHJcblx0XHQvL+WFvOWuueW+ruS/oeS4jeaUr+aMgeWKoOi9vXNjZW5l5ZCO57yA5Zy65pmvXHJcblx0XHRMYXlhLlVSTC5leHBvcnRTY2VuZVRvSnNvbiA9IEdhbWVDb25maWcuZXhwb3J0U2NlbmVUb0pzb247XHJcblxyXG5cdFx0Ly/miZPlvIDosIPor5XpnaLmnb/vvIjpgJrov4dJREXorr7nva7osIPor5XmqKHlvI/vvIzmiJbogIV1cmzlnLDlnYDlop7liqBkZWJ1Zz10cnVl5Y+C5pWw77yM5Z2H5Y+v5omT5byA6LCD6K+V6Z2i5p2/77yJXHJcblx0XHRpZiAoR2FtZUNvbmZpZy5kZWJ1ZyB8fCBMYXlhLlV0aWxzLmdldFF1ZXJ5U3RyaW5nKFwiZGVidWdcIikgPT0gXCJ0cnVlXCIpIExheWEuZW5hYmxlRGVidWdQYW5lbCgpO1xyXG5cdFx0aWYgKEdhbWVDb25maWcucGh5c2ljc0RlYnVnICYmIExheWFbXCJQaHlzaWNzRGVidWdEcmF3XCJdKSBMYXlhW1wiUGh5c2ljc0RlYnVnRHJhd1wiXS5lbmFibGUoKTtcclxuXHRcdGlmIChHYW1lQ29uZmlnLnN0YXQpIExheWEuU3RhdC5zaG93KCk7XHJcblx0XHRMYXlhLmFsZXJ0R2xvYmFsRXJyb3IgPSB0cnVlO1xyXG5cclxuXHRcdC8v5r+A5rS76LWE5rqQ54mI5pys5o6n5Yi277yMdmVyc2lvbi5qc29u55SxSURF5Y+R5biD5Yqf6IO96Ieq5Yqo55Sf5oiQ77yM5aaC5p6c5rKh5pyJ5Lmf5LiN5b2x5ZON5ZCO57ut5rWB56iLXHJcblx0XHRMYXlhLlJlc291cmNlVmVyc2lvbi5lbmFibGUoXCJ2ZXJzaW9uLmpzb25cIiwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLm9uVmVyc2lvbkxvYWRlZCksIExheWEuUmVzb3VyY2VWZXJzaW9uLkZJTEVOQU1FX1ZFUlNJT04pO1xyXG5cdH1cclxuXHJcblx0b25WZXJzaW9uTG9hZGVkKCk6IHZvaWQge1xyXG5cdFx0Ly/mv4DmtLvlpKflsI/lm77mmKDlsITvvIzliqDovb3lsI/lm77nmoTml7blgJnvvIzlpoLmnpzlj5HnjrDlsI/lm77lnKjlpKflm77lkIjpm4bph4zpnaLvvIzliJnkvJjlhYjliqDovb3lpKflm77lkIjpm4bvvIzogIzkuI3mmK/lsI/lm75cclxuXHRcdExheWEuQXRsYXNJbmZvTWFuYWdlci5lbmFibGUoXCJmaWxlY29uZmlnLmpzb25cIiwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLm9uQ29uZmlnTG9hZGVkKSk7XHJcblx0fVxyXG5cclxuXHRvbkNvbmZpZ0xvYWRlZCgpOiB2b2lkIHtcclxuXHRcdC8v5Yqg6L29SURF5oyH5a6a55qE5Zy65pmvXHJcblx0XHRHYW1lQ29uZmlnLnN0YXJ0U2NlbmUgJiYgTGF5YS5TY2VuZS5vcGVuKEdhbWVDb25maWcuc3RhcnRTY2VuZSk7XHJcblx0XHRMb2dnZXIuaW5mbyhHYW1lQ29uZmlnKTtcclxuXHR9XHJcbn1cclxuLy/mv4DmtLvlkK/liqjnsbtcclxubmV3IE1haW4oKTtcclxuIl19

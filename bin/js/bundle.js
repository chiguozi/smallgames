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
        return "[" + pre + new Date().toLocaleTimeString() + "]:" + content;
    };
    Logger.checkCanLog = function (logLevel) {
        return this.enable && ((logLevel & this.logLevel) > 0);
    };
    Logger.enable = true;
    Logger.logLevel = LogLevel.All;
    return Logger;
}());
exports.default = Logger;
},{}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
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
},{"./SScene":2}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
var MainScene_1 = require("./Hall/MainScene");
/*
* 游戏初始化配置;
*/
var GameConfig = /** @class */ (function () {
    function GameConfig() {
    }
    GameConfig.init = function () {
        var reg = Laya.ClassUtils.regClass;
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
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    return GameConfig;
}());
exports.default = GameConfig;
GameConfig.init();
},{"./Hall/MainScene":5}],5:[function(require,module,exports){
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
},{"../Core/Scene/SSceneManager":3}],6:[function(require,module,exports){
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
},{"./Core/Debug/Logger":1,"./GameConfig":4}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkY6L1Byb2dyYW0gRmlsZXMgKHg4NikvTGF5YTIuMC9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQ29yZS9EZWJ1Zy9Mb2dnZXIudHMiLCJzcmMvQ29yZS9TY2VuZS9TU2NlbmUudHMiLCJzcmMvQ29yZS9TY2VuZS9TU2NlbmVNYW5hZ2VyLnRzIiwic3JjL0dhbWVDb25maWcudHMiLCJzcmMvSGFsbC9NYWluU2NlbmUudHMiLCJzcmMvTWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNUQSxJQUFLLFFBTUo7QUFORCxXQUFLLFFBQVE7SUFFVCx1Q0FBVyxDQUFBO0lBQ1gsNkNBQWMsQ0FBQTtJQUNkLHlDQUFZLENBQUE7SUFDWix1Q0FBVSxDQUFBO0FBQ2QsQ0FBQyxFQU5JLFFBQVEsS0FBUixRQUFRLFFBTVo7QUFDRDtJQUFBO0lBd0NBLENBQUM7SUFuQ2lCLFdBQUksR0FBbEI7UUFBbUIsY0FBTzthQUFQLFVBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU87WUFBUCx5QkFBTzs7UUFFdEIsSUFBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztZQUMvQixPQUFPO1FBQ1gsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRWEsV0FBSSxHQUFsQjtRQUFtQixjQUFPO2FBQVAsVUFBTyxFQUFQLHFCQUFPLEVBQVAsSUFBTztZQUFQLHlCQUFPOztRQUV0QixJQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxR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ZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG4oZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXHJcbmVudW0gTG9nTGV2ZWxcclxue1xyXG4gICAgSW5mbyA9IDB4MDEsXHJcbiAgICBXYXJuaW5nID0gMHgwMixcclxuICAgIEVycm9yID0gMHgwNCxcclxuICAgIEFsbCA9IDB4ZmYsXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nZ2VyXHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgZW5hYmxlID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBzdGF0aWMgbG9nTGV2ZWwgPSBMb2dMZXZlbC5BbGw7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBpbmZvKC4uLmFyZ3MpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuY2hlY2tDYW5Mb2coTG9nTGV2ZWwuSW5mbykpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBsZXQgY29udGVudCA9IGFyZ3Muam9pbihcIlxcdFwiKTtcclxuICAgICAgICBjb250ZW50ID0gdGhpcy5nZXRMb2dDb250ZW50KFwiSU5GT1wiLCBjb250ZW50KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhjb250ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHdhcm4oLi4uYXJncylcclxuICAgIHtcclxuICAgICAgICBpZighdGhpcy5jaGVja0NhbkxvZyhMb2dMZXZlbC5XYXJuaW5nKSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGxldCBjb250ZW50ID0gYXJncy5qb2luKFwiXFx0XCIpO1xyXG4gICAgICAgIGNvbnRlbnQgPSB0aGlzLmdldExvZ0NvbnRlbnQoXCJXQVJOSU5HXCIsIGNvbnRlbnQpO1xyXG4gICAgICAgIGNvbnNvbGUud2Fybihjb250ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGVycm9yKC4uLmFyZ3MpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuY2hlY2tDYW5Mb2coTG9nTGV2ZWwuRXJyb3IpKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgbGV0IGNvbnRlbnQgPSBhcmdzLmpvaW4oXCJcXHRcIik7XHJcbiAgICAgICAgY29udGVudCA9IHRoaXMuZ2V0TG9nQ29udGVudChcIkVSUk9SXCIsIGNvbnRlbnQpO1xyXG4gICAgICAgIGNvbnNvbGUud2Fybihjb250ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRMb2dDb250ZW50KHByZTpzdHJpbmcsIGNvbnRlbnQ6c3RyaW5nKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gXCJbXCIgKyBwcmUgKyBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpICsgXCJdOlwiICsgY29udGVudDtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc3RhdGljIGNoZWNrQ2FuTG9nKGxvZ0xldmVsOkxvZ0xldmVsKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVuYWJsZSAmJiAoKGxvZ0xldmVsICYgdGhpcy5sb2dMZXZlbCkgPiAwKVxyXG4gICAgfVxyXG59IiwiZW51bSBMb2FkU3RhdGVcclxue1xyXG4gICAgTm9uZSA9IDEsXHJcbiAgICBMb2FkaW5nID0gMixcclxuICAgIExvYWRlZCA9IDMsXHJcbiAgICBEZXN0cm95ZWQgPSA0LFxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNTY2VuZVxyXG57XHJcbiAgICBwcm90ZWN0ZWQgc2NlbmVQYXRoOnN0cmluZztcclxuICAgIHByb3RlY3RlZCBzY2VuZVR5cGU6bnVtYmVyO1xyXG4gICAgcHJvdGVjdGVkIHNjZW5lQ29uZmlnOnN0cmluZztcclxuICAgIHByb3RlY3RlZCBzY2VuZTpMYXlhLlNjZW5lO1xyXG4gICAgcHJvdGVjdGVkIGF1dG9EZXN0cm95OmJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBsb2FkU3RhdGU6TG9hZFN0YXRlID0gTG9hZFN0YXRlLk5vbmU7XHJcbiAgICBwdWJsaWMgc2NlbmVJZDpudW1iZXI7XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBhdGg6c3RyaW5nLCBhdXRvRGVzdHJveSA9IHRydWUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zY2VuZVBhdGggPSBwYXRoO1xyXG4gICAgICAgIHRoaXMuYXV0b0Rlc3Ryb3kgPSBhdXRvRGVzdHJveTtcclxuICAgICAgICB0aGlzLmxvYWRTdGF0ZSA9IExvYWRTdGF0ZS5Ob25lO1xyXG4gICAgfVxyXG4gICAgLy/liqDovb3lnLrmma9cclxuICAgIHB1YmxpYyBsb2FkKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmxvYWRTdGF0ZSA9IExvYWRTdGF0ZS5Mb2FkaW5nO1xyXG4gICAgICAgIExheWEuU2NlbmUub3Blbih0aGlzLnNjZW5lUGF0aCwgZmFsc2UsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vbkxvYWRlZCkpO1xyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZGVkKHNjZW5lKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubG9hZFN0YXRlID0gTG9hZFN0YXRlLkxvYWRlZDtcclxuICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XHJcbiAgICAgICAgdGhpcy5vbk9wZW4oKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25PcGVuKClcclxuICAgIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGV4aXQoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuc2NlbmUpXHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmUudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMub25FeGl0KCk7XHJcbiAgICAgICAgaWYodGhpcy5hdXRvRGVzdHJveSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBMYXlhLlNjZW5lLmdjKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRXhpdCgpXHJcbiAgICB7fVxyXG5cclxuICAgIHB1YmxpYyBkZXN0cm95KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmxvYWRTdGF0ZSA9IExvYWRTdGF0ZS5EZXN0cm95ZWQ7XHJcbiAgICAgICAgdGhpcy5vbkRlc3Ryb3koKTtcclxuICAgICAgICBpZih0aGlzLnNjZW5lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmUgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EZXN0cm95KClcclxuICAgIHt9XHJcbn0iLCJpbXBvcnQgU1NjZW5lIGZyb20gXCIuL1NTY2VuZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU1NjZW5lTWFuYWdlclxyXG57XHJcbiAgICBwcm90ZWN0ZWQgY3VycmVudFNjZW5lOlNTY2VuZTtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOlNTY2VuZU1hbmFnZXI7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBJbnN0YW5jZSgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2UgPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSBuZXcgU1NjZW5lTWFuYWdlcigpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ29Ub1NjZW5lKHNjZW5lSWQpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5jdXJyZW50U2NlbmUgJiYgdGhpcy5jdXJyZW50U2NlbmUuc2NlbmVJZCA9PSBzY2VuZUlkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmV4aXRTY2VuZSgpO1xyXG4gICAgICAgIHRoaXMuZW50ZXJTY2VuZShzY2VuZUlkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZW50ZXJTY2VuZShzY2VuZUlkKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNjZW5lID0gbmV3IFNTY2VuZShcIkFpcldhci9BaXJXYXIuc2NlbmVcIik7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2NlbmUubG9hZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBleGl0U2NlbmUoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuY3VycmVudFNjZW5lID09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZS5leGl0KCk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2NlbmUgPSBudWxsO1xyXG4gICAgfVxyXG59IiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXHJcbmltcG9ydCBNYWluU2NlbmUgZnJvbSBcIi4vSGFsbC9NYWluU2NlbmVcIlxyXG4vKlxyXG4qIOa4uOaIj+WIneWni+WMlumFjee9rjtcclxuKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUNvbmZpZ3tcclxuICAgIHN0YXRpYyB3aWR0aDpudW1iZXI9NzIwO1xyXG4gICAgc3RhdGljIGhlaWdodDpudW1iZXI9MTI4MDtcclxuICAgIHN0YXRpYyBzY2FsZU1vZGU6c3RyaW5nPVwic2hvd2FsbFwiO1xyXG4gICAgc3RhdGljIHNjcmVlbk1vZGU6c3RyaW5nPVwidmVydGljYWxcIjtcclxuICAgIHN0YXRpYyBhbGlnblY6c3RyaW5nPVwidG9wXCI7XHJcbiAgICBzdGF0aWMgYWxpZ25IOnN0cmluZz1cImxlZnRcIjtcclxuICAgIHN0YXRpYyBzdGFydFNjZW5lOmFueT1cIk1haW5TY2VuZS5zY2VuZVwiO1xyXG4gICAgc3RhdGljIHNjZW5lUm9vdDpzdHJpbmc9XCJcIjtcclxuICAgIHN0YXRpYyBkZWJ1Zzpib29sZWFuPWZhbHNlO1xyXG4gICAgc3RhdGljIHN0YXQ6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHN0YXRpYyBwaHlzaWNzRGVidWc6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHN0YXRpYyBleHBvcnRTY2VuZVRvSnNvbjpib29sZWFuPXRydWU7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe31cclxuICAgIHN0YXRpYyBpbml0KCl7XHJcbiAgICAgICAgdmFyIHJlZzogRnVuY3Rpb24gPSBMYXlhLkNsYXNzVXRpbHMucmVnQ2xhc3M7XHJcbiAgICAgICAgcmVnKFwiSGFsbC9NYWluU2NlbmUudHNcIixNYWluU2NlbmUpO1xyXG4gICAgfVxyXG59XHJcbkdhbWVDb25maWcuaW5pdCgpOyIsImltcG9ydCBTU2NlbmUgZnJvbSBcIi4uL0NvcmUvU2NlbmUvU1NjZW5lXCJcclxuaW1wb3J0IFNTY2VuZU1hbmFnZXIgZnJvbSBcIi4uL0NvcmUvU2NlbmUvU1NjZW5lTWFuYWdlclwiO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluU2NlbmUgZXh0ZW5kcyBMYXlhLlNjcmlwdFxyXG57XHJcbiAgICBwcml2YXRlIHN0YXJ0QnRuOkxheWEuSW1hZ2U7XHJcbiAgICBvbkVuYWJsZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zdGFydEJ0biA9IHRoaXMub3duZXIuZ2V0Q2hpbGRBdCgwKSBhcyBMYXlhLkltYWdlO1xyXG4gICAgICAgIGlmKHRoaXMuc3RhcnRCdG4pXHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRCdG4ub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5vbkJ0bkNsaWNrKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkJ0bkNsaWNrKClcclxuICAgIHtcclxuICAgICAgICBTU2NlbmVNYW5hZ2VyLkluc3RhbmNlLmdvVG9TY2VuZSgxKTtcclxuICAgICAgICAvL0xheWEuU2NlbmUub3BlbihcIkFpcldhci9BaXJXYXIuc2NlbmVcIik7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IEdhbWVDb25maWcgZnJvbSBcIi4vR2FtZUNvbmZpZ1wiO1xyXG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuL0NvcmUvRGVidWcvTG9nZ2VyXCI7XHJcbmNsYXNzIE1haW4ge1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0Ly/moLnmja5JREXorr7nva7liJ3lp4vljJblvJXmk45cdFx0XHJcblx0XHRpZiAod2luZG93W1wiTGF5YTNEXCJdKSBMYXlhM0QuaW5pdChHYW1lQ29uZmlnLndpZHRoLCBHYW1lQ29uZmlnLmhlaWdodCk7XHJcblx0XHRlbHNlIExheWEuaW5pdChHYW1lQ29uZmlnLndpZHRoLCBHYW1lQ29uZmlnLmhlaWdodCwgTGF5YVtcIldlYkdMXCJdKTtcclxuXHRcdExheWFbXCJQaHlzaWNzXCJdICYmIExheWFbXCJQaHlzaWNzXCJdLmVuYWJsZSgpO1xyXG5cdFx0TGF5YVtcIkRlYnVnUGFuZWxcIl0gJiYgTGF5YVtcIkRlYnVnUGFuZWxcIl0uZW5hYmxlKCk7XHJcblx0XHRMYXlhLnN0YWdlLnNjYWxlTW9kZSA9IEdhbWVDb25maWcuc2NhbGVNb2RlO1xyXG5cdFx0TGF5YS5zdGFnZS5zY3JlZW5Nb2RlID0gR2FtZUNvbmZpZy5zY3JlZW5Nb2RlO1xyXG5cdFx0Ly/lhbzlrrnlvq7kv6HkuI3mlK/mjIHliqDovb1zY2VuZeWQjue8gOWcuuaZr1xyXG5cdFx0TGF5YS5VUkwuZXhwb3J0U2NlbmVUb0pzb24gPSBHYW1lQ29uZmlnLmV4cG9ydFNjZW5lVG9Kc29uO1xyXG5cclxuXHRcdC8v5omT5byA6LCD6K+V6Z2i5p2/77yI6YCa6L+HSURF6K6+572u6LCD6K+V5qih5byP77yM5oiW6ICFdXJs5Zyw5Z2A5aKe5YqgZGVidWc9dHJ1ZeWPguaVsO+8jOWdh+WPr+aJk+W8gOiwg+ivlemdouadv++8iVxyXG5cdFx0aWYgKEdhbWVDb25maWcuZGVidWcgfHwgTGF5YS5VdGlscy5nZXRRdWVyeVN0cmluZyhcImRlYnVnXCIpID09IFwidHJ1ZVwiKSBMYXlhLmVuYWJsZURlYnVnUGFuZWwoKTtcclxuXHRcdGlmIChHYW1lQ29uZmlnLnBoeXNpY3NEZWJ1ZyAmJiBMYXlhW1wiUGh5c2ljc0RlYnVnRHJhd1wiXSkgTGF5YVtcIlBoeXNpY3NEZWJ1Z0RyYXdcIl0uZW5hYmxlKCk7XHJcblx0XHRpZiAoR2FtZUNvbmZpZy5zdGF0KSBMYXlhLlN0YXQuc2hvdygpO1xyXG5cdFx0TGF5YS5hbGVydEdsb2JhbEVycm9yID0gdHJ1ZTtcclxuXHJcblx0XHQvL+a/gOa0u+i1hOa6kOeJiOacrOaOp+WItu+8jHZlcnNpb24uanNvbueUsUlEReWPkeW4g+WKn+iDveiHquWKqOeUn+aIkO+8jOWmguaenOayoeacieS5n+S4jeW9seWTjeWQjue7rea1geeoi1xyXG5cdFx0TGF5YS5SZXNvdXJjZVZlcnNpb24uZW5hYmxlKFwidmVyc2lvbi5qc29uXCIsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vblZlcnNpb25Mb2FkZWQpLCBMYXlhLlJlc291cmNlVmVyc2lvbi5GSUxFTkFNRV9WRVJTSU9OKTtcclxuXHR9XHJcblxyXG5cdG9uVmVyc2lvbkxvYWRlZCgpOiB2b2lkIHtcclxuXHRcdC8v5r+A5rS75aSn5bCP5Zu+5pig5bCE77yM5Yqg6L295bCP5Zu+55qE5pe25YCZ77yM5aaC5p6c5Y+R546w5bCP5Zu+5Zyo5aSn5Zu+5ZCI6ZuG6YeM6Z2i77yM5YiZ5LyY5YWI5Yqg6L295aSn5Zu+5ZCI6ZuG77yM6ICM5LiN5piv5bCP5Zu+XHJcblx0XHRMYXlhLkF0bGFzSW5mb01hbmFnZXIuZW5hYmxlKFwiZmlsZWNvbmZpZy5qc29uXCIsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vbkNvbmZpZ0xvYWRlZCkpO1xyXG5cdH1cclxuXHJcblx0b25Db25maWdMb2FkZWQoKTogdm9pZCB7XHJcblx0XHQvL+WKoOi9vUlEReaMh+WumueahOWcuuaZr1xyXG5cdFx0R2FtZUNvbmZpZy5zdGFydFNjZW5lICYmIExheWEuU2NlbmUub3BlbihHYW1lQ29uZmlnLnN0YXJ0U2NlbmUpO1xyXG5cdFx0TG9nZ2VyLmluZm8oR2FtZUNvbmZpZyk7XHJcblx0fVxyXG59XHJcbi8v5r+A5rS75ZCv5Yqo57G7XHJcbm5ldyBNYWluKCk7XHJcbiJdfQ==

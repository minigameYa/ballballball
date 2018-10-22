(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Start.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b07f91FtCRHIpzeelKpWt6S', 'Start', __filename);
// Script/Start.ts

Object.defineProperty(exports, "__esModule", { value: true });
var fetch_1 = require("./modules/fetch");
var data_1 = require("./modules/data");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nickName = null;
        _this.startBtn = null;
        _this.text = 'hello';
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    NewClass.prototype.onLoad = function () {
        var _this = this;
        fetch_1.handleLogin(function () {
            console.log(data_1.user);
            console.log(data_1.user.userInfo);
            _this.nickName.string = data_1.user.userInfo.nickName;
        });
        this.startBtn.on(cc.Node.EventType.TOUCH_START, function (event) {
            cc.director.loadScene('game');
        });
    };
    NewClass.prototype.start = function () {
    };
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "nickName", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "startBtn", void 0);
    __decorate([
        property
    ], NewClass.prototype, "text", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Start.js.map
        
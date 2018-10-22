(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Result.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'db143u95qlCzZ43EN+FrIos', 'Result', __filename);
// Script/Result.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nickName = null;
        _this.score = null;
        _this.resetBtn = null;
        _this.game = null;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    NewClass.prototype.onLoad = function () {
        var _this = this;
        this.resetBtn.on(cc.Node.EventType.TOUCH_START, function (event) {
            _this.game.getComponent('Game').gameStart();
        });
    };
    NewClass.prototype.start = function () {
    };
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "nickName", void 0);
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "score", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "resetBtn", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "game", void 0);
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
        //# sourceMappingURL=Result.js.map
        
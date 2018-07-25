(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Coin.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c9740YlV4lOC4EVmhfN0jXZ', 'Coin', __filename);
// Script/Coin.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timer = 10;
        _this.game = null;
        return _this;
    }
    NewClass.prototype.onLoad = function () {
        this.setJumpAction();
    };
    NewClass.prototype.setJumpAction = function () {
        var groundY = this.game.ground.y;
        var jump = cc.moveBy(1, cc.p(0, -this.node.y + this.node.height / 2 + groundY)).easing(cc.easeBounceOut());
        this.node.runAction(jump);
    };
    NewClass.prototype.onPicked = function () {
        this.game.gainGold();
        this.node.destroy();
    };
    // 获取小车坐标
    NewClass.prototype.getCarPosition = function () {
        var carPos = this.game.car.getPosition();
        var dist = cc.pDistance(this.node.position, carPos);
        return dist;
    };
    NewClass.prototype.update = function (dt) {
        this.timer -= dt;
        if (this.timer <= 3) {
            this.setOpacityDel();
        }
        if (this.timer <= 0) {
            this.node.destroy();
        }
        if (this.getCarPosition() < this.node.width / 2 + this.game.car.width / 2) {
            this.onPicked();
        }
    };
    NewClass.prototype.setOpacityDel = function () {
        this.node.opacity -= 10;
        if (this.node.opacity <= 100) {
            this.setOpacityAdd();
        }
    };
    NewClass.prototype.setOpacityAdd = function () {
        this.node.opacity += 10;
        if (this.node.opacity >= 244) {
            this.setOpacityDel();
        }
    };
    __decorate([
        property
    ], NewClass.prototype, "timer", void 0);
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
        //# sourceMappingURL=Coin.js.map
        
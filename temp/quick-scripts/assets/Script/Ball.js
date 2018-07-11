(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Ball.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8c3196gYz9Lqpm/6f7ffP2c', 'Ball', __filename);
// Script/Ball.ts

Object.defineProperty(exports, "__esModule", { value: true });
var data_1 = require("./modules/data");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scale = data_1.ballScale.NORMAL;
        _this.num = 0;
        _this.jumpDuration = 2;
        _this.maxY = 0;
        _this.speed = 1;
        _this.game = null;
        _this.points = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    NewClass.prototype.onLoad = function () {
        this.node.width = this.node.width * this.scale;
        this.node.height = this.node.height * this.scale;
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);
        this.node.children[0].string = this.num + '';
        this.speed = this.derection == data_1.ballDerection.Right ? this.speed : -this.speed;
    };
    NewClass.prototype.start = function () {
    };
    NewClass.prototype.setJumpAction = function () {
        var groundY = this.game.ground.y;
        if (this.scale == data_1.ballScale.NORMAL) {
            this.jumpDuration = 1;
        }
        if (this.scale == data_1.ballScale.BIG) {
            this.jumpDuration = 2;
        }
        if (this.scale == data_1.ballScale.BIGBIG) {
            this.jumpDuration = 3;
        }
        var jumpUp = cc.moveBy(this.jumpDuration, cc.p(0, this.maxY - groundY - this.node.height / 2)).easing(cc.easeCubicActionOut());
        var jumpDown = cc.moveBy(this.jumpDuration, cc.p(0, -this.maxY + groundY + this.node.height / 2)).easing(cc.easeCubicActionIn());
        return cc.repeatForever(cc.sequence(jumpDown, jumpUp));
    };
    NewClass.prototype.ballCrossAction = function () {
        var borderX = this.game.node.width / 2;
        if (this.node.x + this.node.width / 2 + this.speed >= borderX && this.derection === data_1.ballDerection.Right) {
            this.node.x = borderX - this.node.width / 2;
            this.speed = -this.speed;
            this.derection = data_1.ballDerection.Left;
            return;
        }
        if (this.node.x - this.node.width / 2 + this.speed <= -borderX && this.derection === data_1.ballDerection.Left) {
            this.node.x = -borderX + this.node.width / 2;
            this.speed = -this.speed;
            this.derection = data_1.ballDerection.Right;
            return;
        }
        this.node.x += this.speed;
    };
    // 获取小车坐标
    NewClass.prototype.getCarPosition = function () {
        var carPos = this.game.car.getPosition();
        var dist = cc.pDistance(this.node.position, carPos);
        return dist;
    };
    // 触碰到小车
    NewClass.prototype.onCrash = function () {
        if (this.getCarPosition() < this.node.width / 2 + this.game.car.width / 2) {
            console.log('game over');
            this.node.stopAllActions();
            this.destroy();
        }
    };
    NewClass.prototype.update = function (dt) {
        this.onCrash();
        this.points.string = this.num + '';
        this.ballCrossAction();
    };
    __decorate([
        property
    ], NewClass.prototype, "scale", void 0);
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "points", void 0);
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
        //# sourceMappingURL=Ball.js.map
        
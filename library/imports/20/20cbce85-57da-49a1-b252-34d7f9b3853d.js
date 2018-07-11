"use strict";
cc._RF.push(module, '20cbc6FV9pJobJSNNf5s4U9', 'Game');
// Script/Game.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var data_1 = require("./modules/data");
var data_2 = require("./modules/data");
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ballPrefab = null;
        _this.car = null;
        _this.ground = null;
        _this.balls = [];
        _this.gameTime = 0;
        _this.carY = 0;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    NewClass.prototype.onLoad = function () {
        this.carY = this.car.y + this.car.height / 2;
        this.spawnNewBall();
    };
    NewClass.prototype.start = function () {
    };
    NewClass.prototype.spawnNewBall = function () {
        this.initNewBall();
    };
    NewClass.prototype.initNewBall = function () {
        var ballCount = this.balls.length;
        var ball = cc.instantiate(this.ballPrefab);
        // 获取前二次的hp
        var lastHP = ballCount <= 2 ? 0 : this.balls[ballCount - 3].HP;
        // 计算本次最大hp
        var HPMax = data_1.user.bullet.power * data_1.user.bullet.speed * (1 + 0.5);
        // 根据时间增长得出一个hp
        var HPCur = 10 + this.gameTime / 120 * 1000 * HPMax;
        // 最终hp在前二次于本次之间选择
        var HP = Math.floor(cc.random0To1() * (HPCur - lastHP) + lastHP);
        // 随机方向
        var dRandom = cc.random0To1() > 0.5 ? data_2.ballDerection.Left : data_2.ballDerection.Right;
        // 记录本次球信息
        this.balls.push({
            HP: HP,
            derection: dRandom
        });
        // 随机ball的体积 并计算高度
        var scale;
        var scaleRandom = cc.random0To1();
        var x, y;
        if (scaleRandom < 0.333333) {
            scale = data_2.ballScale.NORMAL;
            y = (this.node.height / 2 - this.carY) / 3 + this.carY - ball.height * scale / 2;
        }
        if (scaleRandom >= 0.333333 && scaleRandom <= 0.666666) {
            scale = data_2.ballScale.BIG;
            y = (this.node.height / 2 - this.carY) / 3 * 2 + this.carY - ball.height * scale / 2;
        }
        if (scaleRandom > 0.666666) {
            scale = data_2.ballScale.BIGBIG;
            y = (this.node.height / 2 - this.carY) + this.carY - ball.height * scale / 2;
        }
        x = dRandom == data_2.ballDerection.Left ? this.node.width / 2 : -this.node.width / 2;
        var Ball = ball.getComponent('Ball');
        Ball.num = HP;
        Ball.scale = scale;
        Ball.maxY = y;
        Ball.game = this;
        Ball.derection = dRandom;
        ball.setPosition(cc.p(x, y));
        this.node.addChild(ball);
    };
    NewClass.prototype.update = function (dt) {
        this.gameTime += dt;
    };
    __decorate([
        property(cc.Prefab)
    ], NewClass.prototype, "ballPrefab", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "car", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "ground", void 0);
    __decorate([
        property
    ], NewClass.prototype, "balls", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();
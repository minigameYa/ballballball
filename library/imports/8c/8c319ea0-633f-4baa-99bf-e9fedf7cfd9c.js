"use strict";
cc._RF.push(module, '8c3196gYz9Lqpm/6f7ffP2c', 'Ball');
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
        _this.jumpDuration = 1;
        _this.maxY = 0;
        _this.speed = 1;
        _this.game = null;
        _this.id = 0;
        _this.HP = 0;
        _this.done = false;
        _this.points = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    NewClass.prototype.onLoad = function () {
        this.node.width = this.node.width * this.scale;
        this.node.height = this.node.height * this.scale;
        this.setJumpAction();
        this.speed = this.derection == data_1.ballDerection.Right ? this.speed : -this.speed;
        data_1.ballPositions[this.id].node = this;
        data_1.ballPositions[this.id].width = this.node.width;
        data_1.ballPositions[this.id].x = this.node.x;
        data_1.ballPositions[this.id].y = this.node.y;
        this.changeColor();
    };
    NewClass.prototype.changeColor = function () {
        for (var key in data_1.ballColor) {
            if (this.num > parseInt(key)) {
                this.node.color = cc.color.apply(cc, data_1.ballColor[key]);
            }
        }
    };
    NewClass.prototype.start = function () {
    };
    NewClass.prototype.setJumpAction = function () {
        var groundY = this.game.ground.y;
        if (this.scale == data_1.ballScale.NORMAL) {
            this.jumpDuration = 1;
        }
        if (this.scale == data_1.ballScale.BIG) {
            this.jumpDuration = 1.5;
        }
        if (this.scale == data_1.ballScale.BIGBIG) {
            this.jumpDuration = 2;
        }
        var jumpUp = cc.moveBy(this.jumpDuration, cc.p(0, this.maxY - groundY - this.node.height / 2)).easing(cc.easeCubicActionOut());
        var jumpDown = cc.moveBy(this.jumpDuration, cc.p(0, -this.maxY + groundY + this.node.height / 2)).easing(cc.easeCubicActionIn());
        var jumpAction = cc.repeatForever(cc.sequence(jumpDown, jumpUp));
        if (this.node.y !== this.maxY) {
            var transUp = cc.moveBy(this.jumpDuration / 2, cc.p(0, this.game.node.height / 10)).easing(cc.easeCubicActionOut());
            var trans = cc.moveBy(this.jumpDuration, cc.p(0, groundY + this.node.height / 2 - this.node.y - this.game.node.height / 10)).easing(cc.easeCubicActionIn());
            var callback = cc.callFunc(function () {
                this.node.runAction(cc.repeatForever(cc.sequence(jumpUp, jumpDown)));
            }, this);
            var transAction = cc.sequence(transUp, trans, callback);
            this.node.runAction(transAction);
        }
        else {
            this.node.runAction(jumpAction);
        }
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
            this.game.gameOver();
        }
    };
    NewClass.prototype.over = function () {
        this.done = true;
        this.node.stopAllActions();
        this.node.destroy();
        delete data_1.ballPositions[this.id];
    };
    // 被子弹打到
    NewClass.prototype.onShooted = function () {
        this.num--;
        this.points.string = this.num + '';
        if (this.num == 0) {
            this.game.splitBall(this);
            this.node.destroy();
            delete data_1.ballPositions[this.id];
            var hasBigger = false;
            for (var k in data_1.ballPositions) {
                if (data_1.ballPositions[k].node.scale !== data_1.ballScale.NORMAL) {
                    hasBigger = true;
                }
            }
            if (!hasBigger) {
                this.game.spawnNewBall();
            }
            if (!Object.keys(data_1.ballPositions).length) {
                alert('你赢了！');
            }
        }
    };
    NewClass.prototype.update = function (dt) {
        if (this.done) {
            return;
        }
        this.points.string = this.num + '';
        this.ballCrossAction();
        data_1.ballPositions[this.id].x = this.node.x;
        data_1.ballPositions[this.id].y = this.node.y;
        this.onCrash();
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
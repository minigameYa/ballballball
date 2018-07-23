"use strict";
cc._RF.push(module, 'cb4e3t7OhVP5JJgdo7jQBia', 'Bullet');
// Script/Bullet.ts

Object.defineProperty(exports, "__esModule", { value: true });
var data_1 = require("./modules/data");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.game = null;
        // accel: number = 200 //加速度
        _this.speed = 0; // 速度
        _this.carY = 0;
        _this.bulletNext = true; //允许产生下一个子弹
        _this.id = 0;
        _this.done = false;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    NewClass.prototype.onLoad = function () {
        this.carY = this.game.car.y + this.game.car.height / 2;
        this.resetTheBullet();
        data_1.bulletPositions[this.id].node = this;
        data_1.bulletPositions[this.id].x = this.node.x;
        data_1.bulletPositions[this.id].y = this.node.y;
    };
    // start() {
    // }
    // 子弹返仓d
    NewClass.prototype.resetTheBullet = function () {
        this.node.y = this.carY;
        this.speed = 400;
        this.node.opacity = 255;
        this.node.x = this.game.car.x;
        data_1.bulletPositions[this.id].fade = false;
    };
    NewClass.prototype.onShooted = function () {
        this.node.opacity = 0;
    };
    NewClass.prototype.over = function () {
        this.done = true;
        this.node.stopAllActions();
        this.node.destroy();
        delete data_1.bulletPositions[this.id];
    };
    NewClass.prototype.update = function (dt) {
        if (this.done) {
            return;
        }
        if (this.bulletNext && this.node.y > this.node.height * 2 + this.carY && !this.game.stopSpawnBullet) {
            this.game.initNewBullet();
            this.bulletNext = false;
        }
        if (this.node.y >= this.game.node.height / 2) {
            this.resetTheBullet();
            this.game.stopSpawnBullet = true;
            return;
        }
        // this.speed += this.accel * dt
        this.node.y += this.speed * dt;
        data_1.bulletPositions[this.id].x = this.node.x;
        data_1.bulletPositions[this.id].y = this.node.y;
    };
    __decorate([
        property
    ], NewClass.prototype, "game", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();
"use strict";
cc._RF.push(module, '20cbc6FV9pJobJSNNf5s4U9', 'Game');
// Script/Game.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var data_1 = require("./modules/data");
var data_2 = require("./modules/data");
var util_1 = require("./modules/util");
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ballPrefab = null;
        _this.bulletPrefab = null;
        _this.coinPrefab = null;
        _this.car = null;
        _this.ground = null;
        _this.score = null;
        _this.gold = null;
        _this.userName = null;
        _this.result = null;
        _this.balls = [];
        _this.gameTime = 0;
        _this.carY = 0;
        _this.stopSpawnBullet = false;
        _this.stopSpawnBall = false;
        _this.idCount = 0;
        _this.p1 = 0; // 大球的生成概率
        _this.p2 = 0.1; // 中球的生成概率
        _this.p3 = 0.9; // 小球的生成概率
        _this.spawnCount = 4; // 自动生成小球倒计时 毫秒
        _this.scoreNum = 0; //得分
        _this.done = false; //游戏结束鸟
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    NewClass.prototype.onLoad = function () {
        this.carY = this.car.y + this.car.height / 2;
        this.car.getComponent('Car').game = this;
        this.spawnNewBall();
        this.initNewBullet();
        this.userName.string = data_1.user.userInfo.nickName;
    };
    NewClass.prototype.start = function () {
    };
    NewClass.prototype.spawnNewBall = function () {
        if (!this.stopSpawnBall) {
            this.initNewBall();
        }
        this.spawnCount = 4;
    };
    // 生产新的球体
    NewClass.prototype.initNewBall = function () {
        var scale = util_1.getRandom([data_2.ballScale.BIGBIG, data_2.ballScale.BIG, data_2.ballScale.NORMAL], [this.p1, this.p2, this.p3]);
        var ballCount = this.balls.length;
        var ball = cc.instantiate(this.ballPrefab);
        // 获取前二次的hp
        var lastHP = ballCount <= 2 ? 0 : this.balls[ballCount - 3].HP;
        // 计算本次最大hp
        var HPMax = data_1.user.bullet.power * data_1.user.bullet.speed * (1 + 0.5);
        // 根据时间增长得出一个hp
        var HPCur = 10 + this.gameTime / 120 * HPMax;
        // 最终hp在前二次于本次之间选择
        var HP = Math.floor(cc.random0To1() * (HPCur - lastHP) + lastHP) || 1;
        // 随机方向
        var dRandom = cc.random0To1() > 0.5 ? data_2.ballDerection.Left : data_2.ballDerection.Right;
        // 记录本次球信息
        this.balls.push({
            HP: HP,
            derection: dRandom
        });
        // 计算高度
        var x, y;
        if (scale == data_2.ballScale.NORMAL) {
            y = (this.node.height / 2 - this.carY) / 3 + this.carY - ball.height * scale / 2;
        }
        if (scale == data_2.ballScale.BIG) {
            y = (this.node.height / 2 - this.carY) / 3 * 2 + this.carY - ball.height * scale / 2;
        }
        if (scale == data_2.ballScale.BIGBIG) {
            y = (this.node.height / 2 - this.carY) + this.carY - ball.height * scale / 2;
        }
        x = dRandom == data_2.ballDerection.Left ? this.node.width / 2 : -this.node.width / 2;
        var Ball = ball.getComponent('Ball');
        Ball.num = Ball.HP = HP;
        Ball.scale = scale;
        Ball.maxY = y;
        Ball.game = this;
        Ball.derection = dRandom;
        Ball.id = this.idCount;
        Ball.points.string = HP + '';
        data_2.ballPositions[this.idCount] = {
            x: 0,
            y: 0,
            width: 0,
            node: null
        };
        this.idCount++;
        ball.setPosition(cc.p(x, y));
        this.node.addChild(ball);
        // 更改下次产生球的概率
        this.p3 = util_1.getPositive(this.p3 - this.gameTime % 20 * 0.15);
        if (this.p3 == 0) {
            this.p1 = util_1.getPositive(this.gameTime % 10 * 0.1);
            this.p2 = util_1.getPositive(this.p2 - this.gameTime / 20 * 0.15);
        }
        else {
            this.p1 = util_1.getPositive(this.p3 + this.gameTime % 20 * 0.05);
            this.p2 = util_1.getPositive(this.p2 + this.gameTime % 20);
        }
    };
    // 分裂球体
    NewClass.prototype.splitBall = function (parentBall) {
        if (parentBall.scale === data_2.ballScale.NORMAL) {
            return;
        }
        var scale = parentBall.scale === data_2.ballScale.BIG ? data_2.ballScale.NORMAL : data_2.ballScale.BIG;
        this.initSplitBall({
            HP: Math.ceil(parentBall.HP * 0.35),
            derection: data_2.ballDerection.Left,
            x: parentBall.node.x,
            y: parentBall.node.y,
            scale: scale
        });
        this.initSplitBall({
            HP: Math.ceil(parentBall.HP * 0.65),
            derection: data_2.ballDerection.Right,
            x: parentBall.node.x,
            y: parentBall.node.y,
            scale: scale
        });
    };
    // 
    NewClass.prototype.initSplitBall = function (_a) {
        var HP = _a.HP, derection = _a.derection, x = _a.x, scale = _a.scale, y = _a.y;
        var maxY;
        var ball = cc.instantiate(this.ballPrefab);
        if (scale == data_2.ballScale.NORMAL) {
            maxY = (this.node.height / 2 - this.carY) / 3 + this.carY - ball.height * scale / 2;
        }
        else {
            maxY = (this.node.height / 2 - this.carY) / 3 * 2 + this.carY - ball.height * scale / 2;
        }
        var Ball = ball.getComponent('Ball');
        Ball.num = Ball.HP = HP;
        Ball.scale = scale;
        Ball.maxY = maxY;
        Ball.game = this;
        Ball.derection = derection;
        Ball.id = this.idCount;
        data_2.ballPositions[this.idCount] = {
            x: 0,
            y: 0,
            width: 0,
            node: null
        };
        this.idCount++;
        ball.setPosition(cc.p(x, y));
        this.node.addChild(ball);
    };
    // 生产新的子弹
    NewClass.prototype.initNewBullet = function () {
        var bullet = cc.instantiate(this.bulletPrefab);
        var Bullet = bullet.getComponent('Bullet');
        Bullet.game = this;
        Bullet.id = this.idCount;
        data_2.bulletPositions[this.idCount] = {
            x: 0,
            y: 0,
            node: null,
            fade: false
        };
        this.idCount++;
        this.node.addChild(bullet);
    };
    // 检测子弹与球体碰撞
    NewClass.prototype.onShoot = function () {
        for (var i in data_2.bulletPositions) {
            var bullet = data_2.bulletPositions[i];
            if (!bullet.node) {
                continue;
            }
            if (!bullet.fade) {
                var bulletP = cc.p(bullet.x, bullet.y);
                for (var j in data_2.ballPositions) {
                    var ball = data_2.ballPositions[j];
                    if (!ball.node) {
                        continue;
                    }
                    var ballP = cc.p(ball.x, ball.y);
                    var dist = cc.pDistance(bulletP, ballP);
                    if (dist < ball.width / 2) {
                        ball.node.onShooted();
                        bullet.node.onShooted();
                        this.scoreNum++;
                        this.score.string = this.scoreNum + '';
                        bullet.fade = true;
                    }
                }
            }
        }
    };
    // 生产金币
    NewClass.prototype.spawnCoins = function (x, y) {
        var coin = cc.instantiate(this.coinPrefab);
        var Coin = coin.getComponent('Coin');
        Coin.game = this;
        coin.x = x;
        coin.y = y;
        this.node.addChild(coin);
    };
    // 获取到金币
    NewClass.prototype.gainGold = function () {
        this.gold.string = parseInt(this.gold.string) + 1 + '';
    };
    NewClass.prototype.update = function (dt) {
        if (this.done) {
            return;
        }
        this.gameTime += dt;
        this.onShoot();
        this.spawnCount -= dt;
        if (this.spawnCount <= 0) {
            this.spawnNewBall();
        }
    };
    // 一局结束
    NewClass.prototype.singleGameDone = function () {
        for (var i in data_2.bulletPositions) {
            var bullet = data_2.bulletPositions[i];
            bullet.node.over();
        }
        for (var i in data_2.ballPositions) {
            var bullet = data_2.ballPositions[i];
            bullet.node.over();
        }
        this.stopSpawnBullet = true;
        this.stopSpawnBall = true;
    };
    // 游戏结束
    NewClass.prototype.gameOver = function () {
        this.singleGameDone();
        this.done = true;
        this.result.active = true;
    };
    // 开始游戏
    NewClass.prototype.gameStart = function () {
        this.done = false;
        this.result.active = false;
        this.stopSpawnBullet = false;
        this.stopSpawnBall = false;
        this.initNewBullet();
        this.spawnNewBall();
    };
    __decorate([
        property(cc.Prefab)
    ], NewClass.prototype, "ballPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], NewClass.prototype, "bulletPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], NewClass.prototype, "coinPrefab", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "car", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "ground", void 0);
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "score", void 0);
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "gold", void 0);
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "userName", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "result", void 0);
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
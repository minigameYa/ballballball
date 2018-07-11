const { ccclass, property } = cc._decorator;
import { user } from './modules/data'
import { ballScale, ballDerection } from "./modules/data"

interface ballInfo{
    HP: number,
    derection: number
}

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    ballPrefab: cc.Prefab = null;

    @property(cc.Node)
    car: cc.Node = null

    @property(cc.Node)
    ground: cc.Node = null

    @property
    balls: ballInfo[] = []
    gameTime: number = 0
    carY: number = 0
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.carY = this.car.y + this.car.height / 2
        this.spawnNewBall()
    }

    start() {

    }

    spawnNewBall() {
        this.initNewBall()
    }

    initNewBall() {
        let ballCount = this.balls.length
        const ball = cc.instantiate(this.ballPrefab)
        // 获取前二次的hp
        let lastHP = ballCount <= 2 ? 0 : this.balls[ballCount - 3].HP
        // 计算本次最大hp
        let HPMax = user.bullet.power * user.bullet.speed * (1 + 0.5)
        // 根据时间增长得出一个hp
        let HPCur = 10 + this.gameTime / 120 * 1000 * HPMax
        // 最终hp在前二次于本次之间选择
        let HP = Math.floor(cc.random0To1() * (HPCur - lastHP) + lastHP)
        // 随机方向
        let dRandom = cc.random0To1() > 0.5 ? ballDerection.Left : ballDerection.Right
        // 记录本次球信息
        this.balls.push({
            HP: HP,
            derection: dRandom
        })
        // 随机ball的体积 并计算高度
        let scale
        let scaleRandom = cc.random0To1()
        let x:number,y:number
        if (scaleRandom < 0.333333) {
            scale = ballScale.NORMAL
            y = (this.node.height / 2 - this.carY) / 3 + this.carY - ball.height * scale / 2
        }
        if (scaleRandom >= 0.333333 && scaleRandom <= 0.666666) {
            scale = ballScale.BIG
            y = (this.node.height / 2 - this.carY) / 3 * 2 + this.carY - ball.height * scale / 2
        }
        if (scaleRandom > 0.666666) {
            scale = ballScale.BIGBIG
            y = (this.node.height / 2 - this.carY) + this.carY - ball.height * scale / 2
        }
        x = dRandom == ballDerection.Left ? this.node.width / 2 : -this.node.width / 2
        let Ball = ball.getComponent('Ball')
        Ball.num = HP
        Ball.scale = scale
        Ball.maxY = y
        Ball.game = this
        Ball.derection = dRandom
        ball.setPosition(cc.p(x, y))
        this.node.addChild(ball)
    }
    update(dt) {
        this.gameTime += dt
    }
}

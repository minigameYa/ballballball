import { ballScale, ballDerection, ballPositions } from "./modules/data"
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property
    scale: number = ballScale.NORMAL
    num: number = 0
    jumpDuration: number = 1
    maxY: number = 0
    jumpAction: cc.Action
    derection: number
    speed: number = 1
    game: any = null
    id: number = 0
    HP: number = 0

    @property(cc.Label)
    points: cc.Label = null
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.width = this.node.width * this.scale
        this.node.height = this.node.height * this.scale
        this.setJumpAction();
        (<any>this.node.children[0]).string = this.num + ''
        this.speed = this.derection == ballDerection.Right ? this.speed : -this.speed
        ballPositions[this.id].node = this
        ballPositions[this.id].width = this.node.width
    }

    start() {

    }

    setJumpAction() {
        let groundY = this.game.ground.y
        // if (this.scale == ballScale.NORMAL) {
        //     this.jumpDuration = 1
        // }
        // if (this.scale == ballScale.BIG) {
        //     this.jumpDuration = 2
        // }
        // if (this.scale == ballScale.BIGBIG) {
        //     this.jumpDuration = 3
        // }

        const jumpUp = cc.moveBy(this.jumpDuration, cc.p(0, this.maxY - groundY - this.node.height / 2)).easing(cc.easeCubicActionOut())
        const jumpDown = cc.moveBy(this.jumpDuration, cc.p(0, - this.maxY + groundY + this.node.height / 2)).easing(cc.easeCubicActionIn())
        const jumpAction = cc.repeatForever(cc.sequence(jumpDown, jumpUp))
        if (this.node.y !== this.maxY) {
            const trans = cc.moveBy(this.jumpDuration, cc.p(0, groundY + this.node.height / 2 - this.node.y))
            const callback = cc.callFunc(function () {
                this.node.runAction(cc.repeatForever(cc.sequence(jumpUp, jumpDown)))
            }, this)
            const transAction = cc.sequence(trans, callback)
            this.node.runAction(transAction)
        } else {
            this.node.runAction(jumpAction);
        }

    }

    ballCrossAction() {
        let borderX = this.game.node.width / 2
        if (this.node.x + this.node.width / 2 + this.speed >= borderX && this.derection === ballDerection.Right) {
            this.node.x = borderX - this.node.width / 2
            this.speed = -this.speed
            this.derection = ballDerection.Left
            return;
        }
        if (this.node.x - this.node.width / 2 + this.speed <= -borderX && this.derection === ballDerection.Left) {
            this.node.x = -borderX + this.node.width / 2
            this.speed = -this.speed
            this.derection = ballDerection.Right
            return;
        }
        this.node.x += this.speed
    }
    co
    // 获取小车坐标
    getCarPosition() {
        const carPos = this.game.car.getPosition()
        const dist = cc.pDistance(this.node.position, carPos)
        return dist
    }

    // 触碰到小车
    onCrash() {
        if (this.getCarPosition() < this.node.width / 2 + this.game.car.width / 2) {
            this.node.stopAllActions()
            this.node.destroy()
            delete ballPositions[this.id]
            alert('你输了')
        }
    }

    // 被子弹打到
    onShooted() {
        this.num--
        (<any>this.node.children[0]).string = this.num + ''
        if (this.num == 0) {
            this.game.splitBall(this)
            this.node.destroy()
            delete ballPositions[this.id]
            if (!Object.keys(ballPositions).length) {
                alert('你赢了！')
            }
        }
    }

    update(dt) {
        this.onCrash()
        this.points.string = this.num + ''
        this.ballCrossAction()
        ballPositions[this.id].x = this.node.x
        ballPositions[this.id].y = this.node.y
    }
}

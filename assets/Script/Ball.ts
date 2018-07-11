import { ballScale, ballDerection } from "./modules/data"
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property
    scale: number = ballScale.NORMAL
    num: number = 0
    jumpDuration: number = 2
    maxY: number = 0
    jumpAction: cc.Action
    derection: number
    speed: number = 1
    game: any = null

    @property(cc.Label)
    points: cc.Label = null
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.width = this.node.width * this.scale
        this.node.height = this.node.height * this.scale
        this.jumpAction = this.setJumpAction()
        this.node.runAction(this.jumpAction);
        (<any>this.node.children[0]).string = this.num + ''
        this.speed = this.derection == ballDerection.Right ? this.speed : -this.speed
    }

    start() {

    }

    setJumpAction() {
        let groundY = this.game.ground.y
        if (this.scale == ballScale.NORMAL) {
            this.jumpDuration = 1
        }
        if (this.scale == ballScale.BIG) {
            this.jumpDuration = 2
        }
        if (this.scale == ballScale.BIGBIG) {
            this.jumpDuration = 3
        }
        const jumpUp = cc.moveBy(this.jumpDuration, cc.p(0, this.maxY - groundY - this.node.height / 2)).easing(cc.easeCubicActionOut())
        const jumpDown = cc.moveBy(this.jumpDuration, cc.p(0, - this.maxY + groundY + this.node.height / 2)).easing(cc.easeCubicActionIn())
        return cc.repeatForever(cc.sequence(jumpDown, jumpUp));
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

    // 获取小车坐标
    getCarPosition() {
        const carPos = this.game.car.getPosition()
        const dist = cc.pDistance(this.node.position, carPos)
        return dist
    }

    // 触碰到小车
    onCrash() {
        if (this.getCarPosition() < this.node.width / 2 + this.game.car.width / 2) {
            console.log('game over')
            this.node.stopAllActions()
            this.destroy()
        }
    }

    update(dt) {
        this.onCrash()
        this.points.string = this.num + ''
        this.ballCrossAction()
    }
}

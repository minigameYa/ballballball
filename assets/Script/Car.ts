// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;
const derectionType = {
    LEFT: 'left',
    RIGHT: 'right',
    IDLE: 'idle'
}

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';
    game: any = null

    @property
    derection: string = derectionType.IDLE

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.setInputControl()
    }

    start() {

    }

    update(dt) {

    }

    setInputControl() {
        let startDot: number = 0,
            startX: number = 0,
            dragStart: boolean = false,
            lastMove: number = 0
        this.node.on(cc.Node.EventType.TOUCH_START, (event: cc.Event.EventTouch) => {
            dragStart = true
            startDot = event.getLocationX()
            startX = this.node.x
        })
        this.node.on(cc.Node.EventType.TOUCH_MOVE, (event: cc.Event.EventTouch) => {
            if (!dragStart) {
                return;
            }
            let move = event.getLocationX() - startDot
            this.wheelScroll(move - lastMove)
            lastMove = move
            if (Math.abs(startX + move) > this.game.node.width / 2 - this.node.width / 2) {
                return;
            }
            this.node.x = startX + move
        })
        this.node.on(cc.Node.EventType.TOUCH_END, function (event: cc.Event.EventTouch) {
            this.derection = derectionType.IDLE
        })
    }

    wheelScroll(x) {
        const r = 58 / 2
        const rotate = x % (Math.PI * 2 * r) / (Math.PI * 2 * r) * 360
        this.node.children[0].rotation += rotate
        this.node.children[1].rotation += rotate
    }
}

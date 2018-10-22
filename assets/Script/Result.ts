const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    nickName: cc.Label = null;

    @property(cc.Label)
    score: cc.Label = null;

    @property(cc.Node)
    resetBtn: cc.Node = null

    @property(cc.Node)
    game: cc.Node = null

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.resetBtn.on(cc.Node.EventType.TOUCH_START, (event: cc.Event.EventTouch) => {
            this.game.getComponent('Game').gameStart()
        })
    }

    start() {

    }

    // update (dt) {}
}

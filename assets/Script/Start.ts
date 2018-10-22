import { handleLogin } from "./modules/fetch";
import { user } from "./modules/data";
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    nickName: cc.Label = null;

    @property(cc.Node)
    startBtn: cc.Node = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        handleLogin(() => {
            console.log(user)
            console.log(user.userInfo)
            this.nickName.string = user.userInfo.nickName
        })
        this.startBtn.on(cc.Node.EventType.TOUCH_START, (event: cc.Event.EventTouch) => {
            cc.director.loadScene('game')
        })
    }

    start() {

    }

    // update (dt) {}
}

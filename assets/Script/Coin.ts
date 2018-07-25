const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

  @property
  timer: number = 10
  game: any = null

  onLoad() {
    this.setJumpAction()
  }

  setJumpAction() {
    const groundY = this.game.ground.y
    const jump = cc.moveBy(1, cc.p(0, - this.node.y + this.node.height / 2 + groundY)).easing(cc.easeBounceOut())
    this.node.runAction(jump)
  }

  onPicked() {
    this.game.gainGold()
    this.node.destroy()
  }

  // 获取小车坐标
  getCarPosition() {
    const carPos = this.game.car.getPosition()
    const dist = cc.pDistance(this.node.position, carPos)
    return dist
  }

  update(dt) {
    this.timer -= dt
    if (this.timer <= 3) {
      this.setOpacityDel()
    }
    if (this.timer <= 0) {
      this.node.destroy()
    }
    if (this.getCarPosition() < this.node.width / 2 + this.game.car.width / 2) {
      this.onPicked()
    }
  }

  setOpacityDel() {
    this.node.opacity -= 10
    if (this.node.opacity <= 100) {
      this.setOpacityAdd()
    }
  }

  setOpacityAdd() {
    this.node.opacity += 10
    if (this.node.opacity >=244) {
      this.setOpacityDel()
    }
  }

}

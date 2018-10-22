import { bulletPositions } from "./modules/data";
const { ccclass, property } = cc._decorator;
@ccclass
export default class NewClass extends cc.Component {

	@property
	game: any = null
	// accel: number = 200 //加速度
	speed: number = 0// 速度
	carY: number = 0
	bulletNext: boolean = true //允许产生下一个子弹
	id: number = 0
	done: boolean = false

	// LIFE-CYCLE CALLBACKS:

	onLoad() {
		this.carY = this.game.car.y + this.game.car.height / 2
		this.resetTheBullet()
		bulletPositions[this.id].node = this
		bulletPositions[this.id].x = this.node.x
		bulletPositions[this.id].y = this.node.y
	}

	// start() {

	// }
	// 子弹返仓d
	resetTheBullet() {
		this.node.y = this.carY
		this.speed = 400
		this.node.opacity = 255
		this.node.x = this.game.car.x
		bulletPositions[this.id].fade = false
	}

	onShooted() {
		this.node.opacity = 0
	}

	over() {
		this.done = true
		this.node.stopAllActions()
		this.node.destroy()
		delete bulletPositions[this.id]
	}

	update(dt) {
		if (this.done) {
			return;
		}
		if (this.bulletNext && this.node.y > this.node.height * 2 + this.carY && !this.game.stopSpawnBullet) {
			this.game.initNewBullet()
			this.bulletNext = false
		}
		if (this.node.y >= this.game.node.height / 2) {
			this.resetTheBullet()
			this.game.stopSpawnBullet = true
			return;
		}
		// this.speed += this.accel * dt
		this.node.y += this.speed * dt
		bulletPositions[this.id].x = this.node.x
		bulletPositions[this.id].y = this.node.y
	}
}

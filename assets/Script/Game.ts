const { ccclass, property } = cc._decorator;
import { user } from './modules/data'
import { ballScale, ballDerection, ballPositions, bulletPositions } from "./modules/data"
import { getPositive } from './modules/util';

interface ballInfo {
  HP: number,
  derection: number
}

@ccclass
export default class NewClass extends cc.Component {

  @property(cc.Prefab)
  ballPrefab: cc.Prefab = null;

  @property(cc.Prefab)
  bulletPrefab: cc.Prefab = null;

  @property(cc.Node)
  car: cc.Node = null

  @property(cc.Node)
  ground: cc.Node = null

  @property
  balls: ballInfo[] = []
  gameTime: number = 0
  carY: number = 0
  stopSpawnBullet: boolean = false
  idCount: number = 0
  p1: number = 0 // 大球的生成概率
  p2: number = 0.1 // 中球的生成概率
  p3: number = 0.9 // 小球的生成概率
  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.carY = this.car.y + this.car.height / 2;
    this.car.getComponent('Car').game = this
    this.spawnNewBall()
    this.initNewBullet()
  }

  start() {

  }

  spawnNewBall() {
    this.p1 = getPositive(this.p3 + this.gameTime / 1000 % 20 * 0.05)
    this.p2 = getPositive(this.p2 + this.gameTime / 1000 % 20)
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
    let HPCur = 10 + this.gameTime / 120 / 1000 * HPMax
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
    let x: number, y: number
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
    Ball.num = Ball.HP = 50
    Ball.scale = scale
    Ball.maxY = y
    Ball.game = this
    Ball.derection = dRandom
    Ball.id = this.idCount
    ballPositions[this.idCount] = {
      x: 0,
      y: 0,
      width: 0,
      node: null
    }
    this.idCount++
    ball.setPosition(cc.p(x, y))
    this.node.addChild(ball)
  }

  splitBall(parentBall) {
    if (parentBall.scale === ballScale.NORMAL) {
      return;
    }
    let scale = parentBall.scale === ballScale.BIG ? ballScale.NORMAL : ballScale.BIG
    this.initSplitBall({
      HP: Math.ceil(parentBall.HP * 0.35),
      derection: ballDerection.Left,
      x: parentBall.node.x,
      y: parentBall.node.y,
      scale: scale
    })
    this.initSplitBall({
      HP: Math.ceil(parentBall.HP * 0.65),
      derection: ballDerection.Right,
      x: parentBall.node.x,
      y: parentBall.node.y,
      scale: scale
    })
  }

  initSplitBall({ HP, derection, x, scale, y }) {
    let maxY
    const ball = cc.instantiate(this.ballPrefab)
    if (scale == ballScale.NORMAL) {
      maxY = (this.node.height / 2 - this.carY) / 3 + this.carY - ball.height * scale / 2
    } else {
      maxY = (this.node.height / 2 - this.carY) / 3 * 2 + this.carY - ball.height * scale / 2
    }
    const Ball = ball.getComponent('Ball')
    Ball.num = Ball.HP = HP
    Ball.scale = scale
    Ball.maxY = maxY
    Ball.game = this
    Ball.derection = derection
    Ball.id = this.idCount
    ballPositions[this.idCount] = {
      x: 0,
      y: 0,
      width: 0,
      node: null
    }
    this.idCount++
    ball.setPosition(cc.p(x, y))
    this.node.addChild(ball)
  }

  initNewBullet() {
    const bullet = cc.instantiate(this.bulletPrefab)
    const Bullet = bullet.getComponent('Bullet')
    Bullet.game = this
    Bullet.id = this.idCount
    bulletPositions[this.idCount] = {
      x: 0,
      y: 0,
      node: null,
      fade: false
    }
    this.idCount++
    this.node.addChild(bullet)
  }

  // 检测子弹与球体碰撞
  onShoot() {
    for (const i in bulletPositions) {
      const bullet = bulletPositions[i]
      if (!bullet.fade) {
        const bulletP = cc.p(bullet.x, bullet.y)
        for (const j in ballPositions) {
          const ball = ballPositions[j]
          const ballP = cc.p(ball.x, ball.y)
          const dist = cc.pDistance(bulletP, ballP)
          if (dist < ball.width / 2) {
            ball.node.onShooted()
            bullet.node.onShooted()
            bullet.fade = true
          }
        }
      }
    }
  }

  update(dt) {
    this.gameTime += dt
    this.onShoot()
  }
}

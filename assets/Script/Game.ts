const { ccclass, property } = cc._decorator;
import { user } from './modules/data'
import { ballScale, ballDerection, ballPositions, bulletPositions } from "./modules/data"
import { getPositive, getRandom } from './modules/util';

@ccclass
export default class NewClass extends cc.Component {

  @property(cc.Prefab)
  ballPrefab: cc.Prefab = null;

  @property(cc.Prefab)
  bulletPrefab: cc.Prefab = null;

  @property(cc.Prefab)
  coinPrefab: cc.Prefab = null;

  @property(cc.Node)
  car: cc.Node = null

  @property(cc.Node)
  ground: cc.Node = null

  @property(cc.Label)
  score: cc.Label = null

  @property(cc.Label)
  gold: cc.Label = null

  @property(cc.Label)
  userName: cc.Label = null

  @property(cc.Node)
  result: cc.Node = null

  @property
  balls: any[] = []
  gameTime: number = 0
  carY: number = 0
  stopSpawnBullet: boolean = false
  stopSpawnBall: boolean = false
  idCount: number = 0
  p1: number = 0 // 大球的生成概率
  p2: number = 0.1 // 中球的生成概率
  p3: number = 0.9 // 小球的生成概率
  spawnCount: number = 4 // 自动生成小球倒计时 毫秒
  scoreNum: number = 0 //得分
  done: boolean = false //游戏结束鸟
  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.carY = this.car.y + this.car.height / 2;
    this.car.getComponent('Car').game = this
    this.spawnNewBall()
    this.initNewBullet()
    this.userName.string = user.userInfo.nickName
  }

  start() {

  }

  spawnNewBall() {
    if (!this.stopSpawnBall) {
      this.initNewBall()
    }
    this.spawnCount = 4
  }

  // 生产新的球体
  initNewBall() {
    let scale = getRandom([ballScale.BIGBIG, ballScale.BIG, ballScale.NORMAL], [this.p1, this.p2, this.p3])
    let ballCount = this.balls.length
    const ball = cc.instantiate(this.ballPrefab)
    // 获取前二次的hp
    let lastHP = ballCount <= 2 ? 0 : this.balls[ballCount - 3].HP
    // 计算本次最大hp
    let HPMax = user.bullet.power * user.bullet.speed * (1 + 0.5)
    // 根据时间增长得出一个hp
    let HPCur = 10 + this.gameTime / 120 * HPMax
    // 最终hp在前二次于本次之间选择
    let HP = Math.floor(cc.random0To1() * (HPCur - lastHP) + lastHP) || 1
    // 随机方向
    let dRandom = cc.random0To1() > 0.5 ? ballDerection.Left : ballDerection.Right
    // 记录本次球信息
    this.balls.push({
      HP: HP,
      derection: dRandom
    })
    // 计算高度
    let x: number, y: number
    if (scale == ballScale.NORMAL) {
      y = (this.node.height / 2 - this.carY) / 3 + this.carY - ball.height * scale / 2
    }
    if (scale == ballScale.BIG) {
      y = (this.node.height / 2 - this.carY) / 3 * 2 + this.carY - ball.height * scale / 2
    }
    if (scale == ballScale.BIGBIG) {
      y = (this.node.height / 2 - this.carY) + this.carY - ball.height * scale / 2
    }
    x = dRandom == ballDerection.Left ? this.node.width / 2 : -this.node.width / 2
    let Ball = ball.getComponent('Ball')
    Ball.num = Ball.HP = HP
    Ball.scale = scale
    Ball.maxY = y
    Ball.game = this
    Ball.derection = dRandom
    Ball.id = this.idCount;
    Ball.points.string = HP + ''
    ballPositions[this.idCount] = {
      x: 0,
      y: 0,
      width: 0,
      node: null
    }
    this.idCount++
    ball.setPosition(cc.p(x, y))
    this.node.addChild(ball)
    // 更改下次产生球的概率
    this.p3 = getPositive(this.p3 - this.gameTime % 20 * 0.15)
    if (this.p3 == 0) {
      this.p1 = getPositive(this.gameTime % 10 * 0.1)
      this.p2 = getPositive(this.p2 - this.gameTime / 20 * 0.15)
    } else {
      this.p1 = getPositive(this.p3 + this.gameTime % 20 * 0.05)
      this.p2 = getPositive(this.p2 + this.gameTime % 20)
    }
  }

  // 分裂球体
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

  // 
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

  // 生产新的子弹
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
      if (!bullet.node) {
        continue;
      }
      if (!bullet.fade) {
        const bulletP = cc.p(bullet.x, bullet.y)
        for (const j in ballPositions) {
          const ball = ballPositions[j]
          if (!ball.node) {
            continue;
          }
          const ballP = cc.p(ball.x, ball.y)
          const dist = cc.pDistance(bulletP, ballP)
          if (dist < ball.width / 2) {
            ball.node.onShooted()
            bullet.node.onShooted()
            this.scoreNum++
            this.score.string = this.scoreNum + ''
            bullet.fade = true
          }
        }
      }
    }
  }

  // 生产金币
  spawnCoins(x, y) {
    const coin = cc.instantiate(this.coinPrefab);
    const Coin = coin.getComponent('Coin')
    Coin.game = this
    coin.x = x
    coin.y = y
    this.node.addChild(coin)
  }

  // 获取到金币
  gainGold() {
    this.gold.string = parseInt(this.gold.string) + 1 + ''
  }

  update(dt) {
    if (this.done) {
      return;
    }
    this.gameTime += dt
    this.onShoot()
    this.spawnCount -= dt
    if (this.spawnCount <= 0) {
      this.spawnNewBall()
    }
  }

  // 一局结束
  singleGameDone() {
    for (const i in bulletPositions) {
      const bullet = bulletPositions[i]
      bullet.node.over()
    }
    for (const i in ballPositions) {
      const bullet = ballPositions[i]
      bullet.node.over()
    }
    this.stopSpawnBullet = true
    this.stopSpawnBall = true
  }

  // 游戏结束
  gameOver() {
    this.singleGameDone()
    this.done = true
    this.result.active = true
  }

  // 开始游戏
  gameStart() {
    this.done = false
    this.result.active = false
    this.stopSpawnBullet = false
    this.stopSpawnBall = false
    this.initNewBullet()
    this.spawnNewBall()
  }
}

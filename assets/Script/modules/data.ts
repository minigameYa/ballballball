
interface User{
  bullet: Bullet,
  level: number
}

interface Bullet{
  speed: number, // 子弹速度
  power: number // 子弹强度
}

export const bulletArray: Bullet[] = [
  {
    speed: 10,
    power: 10
  },
  {
    speed: 20,
    power: 20
  }
]

// 用户信息 子弹信息 关卡
export const user:User = {
  bullet:{
    speed: 5,
    power: 5
  },
  level: 0
}

export function updateUserData(obj){
  
}

// 球的体积膨胀
export const ballScale = {
  BIGBIG: 2,
  BIG: 1.5,
  NORMAL: 1
}

// 球的运动方向
export enum ballDerection {
  Left,
  Right
}
// 球的引用
export const ballIndexs = {}
// 球的位置
export const ballPositions = {}
// 子弹的引用
export const bulletIndexs = {}
// 子弹的位置
export const bulletPositions = {}
// 球的颜色
export const ballColor = {
  1: [255,255,255],
  10: [167, 255, 9],
  20: [35, 255, 8]
}
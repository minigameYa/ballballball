
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
    speed: 20,
    power: 20
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


export enum ballDerection {
  Left,
  Right
}
export function getPositive(num: number): number {
  return num >= 0 ? num : 0
}

export function getRandom(things: any[], ps: number[]) {
  let sum = 0,
    factor = 0,
    random = Math.random();

  for (let i = ps.length - 1; i >= 0; i--) {
    sum += ps[i]; // 统计概率总和
  };
  random *= sum; // 生成概率随机数
  for (let i = ps.length - 1; i >= 0; i--) {
    factor += ps[i];
    if (ps[i] == 0) {
      continue;
    }
    if (random <= factor) return things[i];
  };
  return null;
}
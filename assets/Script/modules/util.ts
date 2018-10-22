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

export function formatTime(date: Date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 显示繁忙提示

export function showBusy(text: string) {
  return wx.showToast({
    title: text,
  icon: 'loading',
  duration: 10000
  })
}

// 显示成功提示

export function showSuccess(text: string) {
  return wx.showToast({
    title: text,
    icon: 'success'
  })
}

// 显示失败提示
export function showModel(title: string, content: string) {
  wx.hideToast();

  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  })
}

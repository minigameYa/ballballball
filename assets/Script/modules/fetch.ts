const host = 'https://kglf0nbi.qcloud.la'
export function login(){
  wx.request({
    url: host + '/login',
    success: function (res) {
      console.log(res)
    }
  })
}

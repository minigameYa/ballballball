import config from '../config';
import { user, rankList } from './data';
import qcloud from '../libs/wafer2-client-sdk'
import { showBusy, showSuccess, showModel } from './util';

qcloud.setLoginUrl(config.service.loginUrl)

export function handleLogin(callback?: Function) {
  console.log(qcloud)
  if (user.isLogin) return
  showBusy('正在登录')
  qcloud.login({
    success(result) {
      console.log(result)
      if (result) {
        showSuccess('登录成功')
        user.isLogin = true
        user.userInfo = result.data.data
        callback && callback()
      } else {
        // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
        qcloud.request({
          url: config.service.requestUrl,
          login: true,
          success(result) {
            showSuccess('登录成功')
            user.isLogin = true
            user.userInfo = result.data.data
            callback && callback()
          },

          fail(error) {
            showModel('请求失败', error)
            console.log('request fail', error)
          }
        })
      }
    },

    fail(error) {
      showModel('登录失败', error)
      console.log('登录失败', error)
    }
  })
}

//榜单删除离线用户， 只简单以nickName为key
function removeRealTimeRank(nickName) {
  var removeIndex = -1
  if (rankList && rankList.length > 0) {
    for (var i = 0; i < rankList.length; i++) {
      if (rankList[i].username === nickName) {
        removeIndex = i
      }
    }
  }

  if (removeIndex >= 0){
    rankList.splice(removeIndex, removeIndex)
  }
}


//更新下榜单
function updateRealTimeRank(nickName, score){
  if (rankList && rankList.length > 0){
    for (var i = 0; i < rankList.length; i++){
      if (rankList[i].username === nickName){
        rankList[i].score = score
        return
      }
    }
  }
  rankList.push({ username: nickName, score: score})
}
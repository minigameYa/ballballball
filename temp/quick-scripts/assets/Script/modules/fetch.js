(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/modules/fetch.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fe229b7LLxEbL9nokO7D2wA', 'fetch', __filename);
// Script/modules/fetch.ts

Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config");
var data_1 = require("./data");
var wafer2_client_sdk_1 = require("../libs/wafer2-client-sdk");
var util_1 = require("./util");
wafer2_client_sdk_1.default.setLoginUrl(config_1.default.service.loginUrl);
function handleLogin(callback) {
    console.log(wafer2_client_sdk_1.default);
    if (data_1.user.isLogin)
        return;
    util_1.showBusy('正在登录');
    wafer2_client_sdk_1.default.login({
        success: function (result) {
            console.log(result);
            if (result) {
                util_1.showSuccess('登录成功');
                data_1.user.isLogin = true;
                data_1.user.userInfo = result.data.data;
                callback && callback();
            }
            else {
                // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
                wafer2_client_sdk_1.default.request({
                    url: config_1.default.service.requestUrl,
                    login: true,
                    success: function (result) {
                        util_1.showSuccess('登录成功');
                        data_1.user.isLogin = true;
                        data_1.user.userInfo = result.data.data;
                        callback && callback();
                    },
                    fail: function (error) {
                        util_1.showModel('请求失败', error);
                        console.log('request fail', error);
                    }
                });
            }
        },
        fail: function (error) {
            util_1.showModel('登录失败', error);
            console.log('登录失败', error);
        }
    });
}
exports.handleLogin = handleLogin;
//榜单删除离线用户， 只简单以nickName为key
function removeRealTimeRank(nickName) {
    var removeIndex = -1;
    if (data_1.rankList && data_1.rankList.length > 0) {
        for (var i = 0; i < data_1.rankList.length; i++) {
            if (data_1.rankList[i].username === nickName) {
                removeIndex = i;
            }
        }
    }
    if (removeIndex >= 0) {
        data_1.rankList.splice(removeIndex, removeIndex);
    }
}
//更新下榜单
function updateRealTimeRank(nickName, score) {
    if (data_1.rankList && data_1.rankList.length > 0) {
        for (var i = 0; i < data_1.rankList.length; i++) {
            if (data_1.rankList[i].username === nickName) {
                data_1.rankList[i].score = score;
                return;
            }
        }
    }
    data_1.rankList.push({ username: nickName, score: score });
}

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=fetch.js.map
        
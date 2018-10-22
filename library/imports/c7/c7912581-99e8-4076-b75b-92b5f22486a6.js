"use strict";
cc._RF.push(module, 'c7912WBmehAdrdbkrXyJIam', 'config');
// Script/config.ts

/**
 * 小游戏配置文件
 */
Object.defineProperty(exports, "__esModule", { value: true });
// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://kglf0nbi.qcloud.la';
// var host = 'http://localhost:5757';
var config = {
    // 下面的地址配合云端 Demo 工作
    service: {
        host: host,
        // 登录地址，用于建立会话
        loginUrl: host + "/weapp/login",
        // 测试的请求地址，用于测试会话
        requestUrl: host + "/weapp/user",
        // 测试的信道服务地址
        tunnelUrl: host + "/weapp/tunnel",
        // 上传图片接口
        uploadUrl: host + "/weapp/upload"
    }
};
exports.default = config;

cc._RF.pop();
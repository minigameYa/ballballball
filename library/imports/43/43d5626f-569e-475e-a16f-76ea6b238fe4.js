"use strict";
cc._RF.push(module, '43d56JvVp5HXqFvduprI4/k', 'index');
// Script/libs/wafer2-client-sdk/index.ts

Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./lib/constants");
var login_1 = require("./lib/login");
var session_1 = require("./lib/session");
var request_1 = require("./lib/request");
var qcloud = {
    login: login_1.default.login,
    setLoginUrl: login_1.default.setLoginUrl,
    LoginError: login_1.default.LoginError,
    clearSession: session_1.default.clear,
    request: request_1.default.request,
    RequestError: request_1.default.RequestError,
};
exports.default = qcloud;
// 导出错误类型码
Object.keys(constants_1.default).forEach(function (key) {
    if (key.indexOf('ERR_') === 0) {
        qcloud[key] = constants_1.default[key];
    }
});

cc._RF.pop();
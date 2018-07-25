"use strict";
cc._RF.push(module, 'fe229b7LLxEbL9nokO7D2wA', 'fetch');
// Script/modules/fetch.ts

Object.defineProperty(exports, "__esModule", { value: true });
var host = 'https://kglf0nbi.qcloud.la';
function login() {
    wx.request({
        url: host + '/login',
        success: function (res) {
            console.log(res);
        }
    });
}
exports.login = login;

cc._RF.pop();
"use strict";
cc._RF.push(module, '0834esOZg1KnaLNH2odS6qX', 'util');
// Script/modules/util.ts

Object.defineProperty(exports, "__esModule", { value: true });
function getPositive(num) {
    return num >= 0 ? num : 0;
}
exports.getPositive = getPositive;
function getRandom(things, ps) {
    var sum = 0, factor = 0, random = Math.random();
    for (var i = ps.length - 1; i >= 0; i--) {
        sum += ps[i]; // 统计概率总和
    }
    ;
    random *= sum; // 生成概率随机数
    for (var i = ps.length - 1; i >= 0; i--) {
        factor += ps[i];
        if (ps[i] == 0) {
            continue;
        }
        if (random <= factor)
            return things[i];
    }
    ;
    return null;
}
exports.getRandom = getRandom;
function formatTime(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}
exports.formatTime = formatTime;
var formatNumber = function (n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
};
// 显示繁忙提示
function showBusy(text) {
    return wx.showToast({
        title: text,
        icon: 'loading',
        duration: 10000
    });
}
exports.showBusy = showBusy;
// 显示成功提示
function showSuccess(text) {
    return wx.showToast({
        title: text,
        icon: 'success'
    });
}
exports.showSuccess = showSuccess;
// 显示失败提示
function showModel(title, content) {
    wx.hideToast();
    wx.showModal({
        title: title,
        content: JSON.stringify(content),
        showCancel: false
    });
}
exports.showModel = showModel;

cc._RF.pop();
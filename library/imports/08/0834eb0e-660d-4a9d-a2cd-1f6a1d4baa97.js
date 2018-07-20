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

cc._RF.pop();
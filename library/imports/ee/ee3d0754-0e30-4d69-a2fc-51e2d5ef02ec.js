"use strict";
cc._RF.push(module, 'ee3d0dUDjBNaaL8UeLV7wLs', 'data');
// Script/modules/data.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.bulletArray = [
    {
        speed: 10,
        power: 10
    },
    {
        speed: 20,
        power: 20
    }
];
// 用户信息 子弹信息 关卡
exports.user = {
    bullet: {
        speed: 20,
        power: 20
    },
    level: 0
};
function updateUserData(obj) {
}
exports.updateUserData = updateUserData;
// 球的体积膨胀
exports.ballScale = {
    BIGBIG: 2,
    BIG: 1.5,
    NORMAL: 1
};
// 球的运动方向
var ballDerection;
(function (ballDerection) {
    ballDerection[ballDerection["Left"] = 0] = "Left";
    ballDerection[ballDerection["Right"] = 1] = "Right";
})(ballDerection = exports.ballDerection || (exports.ballDerection = {}));
// 球的引用
exports.ballIndexs = {};
// 球的位置
exports.ballPositions = {};
// 子弹的引用
exports.bulletIndexs = {};
// 子弹的位置
exports.bulletPositions = {};

cc._RF.pop();
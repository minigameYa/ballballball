(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/modules/util.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0834esOZg1KnaLNH2odS6qX', 'util', __filename);
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
        //# sourceMappingURL=util.js.map
        
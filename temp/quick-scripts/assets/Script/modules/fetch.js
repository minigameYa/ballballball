(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/modules/fetch.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fe229b7LLxEbL9nokO7D2wA', 'fetch', __filename);
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
        
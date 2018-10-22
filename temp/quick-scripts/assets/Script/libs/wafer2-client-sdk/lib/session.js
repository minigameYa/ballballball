(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/libs/wafer2-client-sdk/lib/session.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ec07eIZ6+9DJLeliMj1kj7l', 'session', __filename);
// Script/libs/wafer2-client-sdk/lib/session.ts

Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var SESSION_KEY = 'weapp_session_' + constants_1.default.WX_SESSION_MAGIC_ID;
var Session = {
    get: function () {
        return wx.getStorageSync(SESSION_KEY) || null;
    },
    set: function (session) {
        wx.setStorageSync(SESSION_KEY, session);
    },
    clear: function () {
        wx.removeStorageSync(SESSION_KEY);
    },
};
exports.default = Session;

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
        //# sourceMappingURL=session.js.map
        
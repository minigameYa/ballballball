(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/libs/wafer2-client-sdk/lib/utils.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2520ewRYxpA/ZMgqNDX7Lod', 'utils', __filename);
// Script/libs/wafer2-client-sdk/lib/utils.ts

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 拓展对象
 */
exports.default = {
    extend: function extend(target) {
        var rests = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rests[_i - 1] = arguments[_i];
        }
        var sources = rests;
        for (var i = 0; i < sources.length; i += 1) {
            var source = sources[i];
            for (var key in source) {
                if (source.hasOwnProperty(key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    }
};

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
        //# sourceMappingURL=utils.js.map
        
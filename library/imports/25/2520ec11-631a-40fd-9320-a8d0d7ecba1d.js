"use strict";
cc._RF.push(module, '2520ewRYxpA/ZMgqNDX7Lod', 'utils');
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
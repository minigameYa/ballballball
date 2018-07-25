(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Car.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6c929FljdZJOqFvizEm24tm', 'Car', __filename);
// Script/Car.ts

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var derectionType = {
    LEFT: 'left',
    RIGHT: 'right',
    IDLE: 'idle'
};
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.text = 'hello';
        _this.game = null;
        _this.derection = derectionType.IDLE;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    NewClass.prototype.onLoad = function () {
        this.setInputControl();
    };
    NewClass.prototype.start = function () {
    };
    NewClass.prototype.update = function (dt) {
    };
    NewClass.prototype.setInputControl = function () {
        var _this = this;
        var startDot = 0, startX = 0, dragStart = false, lastMove = 0;
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            dragStart = true;
            startDot = event.getLocationX();
            startX = _this.node.x;
        });
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            if (!dragStart) {
                return;
            }
            var move = event.getLocationX() - startDot;
            _this.wheelScroll(move - lastMove);
            lastMove = move;
            if (Math.abs(startX + move) > _this.game.node.width / 2 - _this.node.width / 2) {
                return;
            }
            _this.node.x = startX + move;
        });
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            this.derection = derectionType.IDLE;
        });
    };
    NewClass.prototype.wheelScroll = function (x) {
        var r = 58 / 2;
        var rotate = x % (Math.PI * 2 * r) / (Math.PI * 2 * r) * 360;
        this.node.children[1].rotation += rotate;
        this.node.children[2].rotation += rotate;
    };
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "label", void 0);
    __decorate([
        property
    ], NewClass.prototype, "text", void 0);
    __decorate([
        property
    ], NewClass.prototype, "derection", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

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
        //# sourceMappingURL=Car.js.map
        
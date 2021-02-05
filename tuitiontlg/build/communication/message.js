"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = exports.strDate = void 0;
var curDate = new Date();
exports.strDate = curDate.toString();
console.log(exports.strDate);
var Message = /** @class */ (function () {
    function Message() {
        this.sender = '';
        this.recipient = '';
        this.body = '';
        this.msgDate = exports.strDate;
    }
    return Message;
}());
exports.Message = Message;

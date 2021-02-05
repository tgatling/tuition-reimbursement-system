"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var log4js_1 = __importDefault(require("log4js"));
log4js_1.default.configure('logconfig.json');
var log = log4js_1.default.getLogger();
exports.default = log;

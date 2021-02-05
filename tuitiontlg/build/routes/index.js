"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var log_1 = __importDefault(require("../log"));
var indexRouter = express_1.default.Router();
/* GET home page. */
indexRouter.get("/", function (req, res, next) {
    log_1.default.trace('index GET /');
    res.render('Hello');
});
exports.default = indexRouter;

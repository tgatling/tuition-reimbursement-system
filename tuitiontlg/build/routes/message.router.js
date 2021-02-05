"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var log_1 = __importDefault(require("../log"));
var message_service_1 = __importDefault(require("../communication/message.service"));
var messageRouter = express_1.default.Router();
messageRouter.get('/', function (req, res, next) {
    log_1.default.trace('msg GET /');
    message_service_1.default.getAllMessages().then(function (messages) {
        log_1.default.debug(messages);
        res.send(JSON.stringify(messages));
    });
});
messageRouter.get('/:username', function (req, res, next) {
    log_1.default.trace('msg GET /:username');
    log_1.default.trace(req.params.username);
    message_service_1.default.getMessagesByRecipient(req.params.username).then(function (messages) {
        res.send(JSON.stringify(messages));
    });
});
messageRouter.delete('/:id', function (req, res, next) {
    log_1.default.trace('msg DELETE /:id');
    log_1.default.debug(req.body);
    message_service_1.default.removeMessage(req.body).then(function (data) {
        log_1.default.debug(data);
        res.sendStatus(200);
    }).catch(function (err) {
        log_1.default.error(err);
        res.sendStatus(500);
    });
});
messageRouter.post('/', function (req, res, next) {
    log_1.default.trace('msg POST /');
    log_1.default.debug(req.body);
    message_service_1.default.addMessage(req.body).then(function (data) {
        log_1.default.debug(data);
        res.sendStatus(201);
    }).catch(function (err) {
        log_1.default.error(err);
        res.sendStatus(500);
    });
});
exports.default = messageRouter;

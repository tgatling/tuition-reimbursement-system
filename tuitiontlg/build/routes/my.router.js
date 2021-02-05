"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var log_1 = __importDefault(require("../log"));
var reimbursementForm_service_1 = __importDefault(require("../application/reimbursementForm.service"));
var myRouter = express_1.default.Router();
myRouter.delete('/:id', function (req, res, next) {
    log_1.default.trace('My DELETE /:id');
    log_1.default.debug(req.body);
    reimbursementForm_service_1.default.deleteForm(req.params.id).then(function (data) {
        log_1.default.debug(data);
        res.sendStatus(200); // Created
    }).catch(function (err) {
        log_1.default.error(err);
        res.sendStatus(500); // Server error, sorry
    });
});
exports.default = myRouter;

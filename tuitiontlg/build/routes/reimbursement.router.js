"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var log_1 = __importDefault(require("../log"));
var reimbursementForm_service_1 = __importDefault(require("../application/reimbursementForm.service"));
var reimbursementRouter = express_1.default.Router();
reimbursementRouter.get('/', function (req, res, next) {
    reimbursementForm_service_1.default.getForms().then(function (form) {
        res.send(JSON.stringify(form));
    });
});
reimbursementRouter.get('/:id', function (req, res, next) {
    log_1.default.trace('rf GET /:id', req.params.id);
    reimbursementForm_service_1.default.getFormById(Number(req.params.id)).then(function (form) {
        res.send(JSON.stringify(form));
    });
});
reimbursementRouter.post('/', function (req, res, next) {
    log_1.default.trace('rf POST /');
    log_1.default.debug(req.body);
    reimbursementForm_service_1.default.addForm(req.body).then(function (data) {
        log_1.default.debug(data);
        res.sendStatus(201); // Created
    }).catch(function (err) {
        log_1.default.error(err);
        res.sendStatus(500); // Server error, sorry
    });
});
reimbursementRouter.put('/', function (req, res, next) {
    log_1.default.trace('rf PUT /');
    log_1.default.debug(req.body);
    reimbursementForm_service_1.default.updateForm(req.body).then(function (data) {
        res.send(data);
    });
});
exports.default = reimbursementRouter;

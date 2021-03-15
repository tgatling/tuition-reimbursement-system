"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var log_1 = __importDefault(require("../log"));
var application_service_1 = __importDefault(require("../application/application.service"));
var applicationRouter = express_1.default.Router();
applicationRouter.get('/', function (req, res, next) {
    log_1.default.trace('app GET /');
    application_service_1.default.getAllApplications().then(function (applications) {
        log_1.default.debug(applications);
        res.send(JSON.stringify(applications));
    });
});
applicationRouter.get('/:id', function (req, res, next) {
    log_1.default.trace('app GET /:id');
    application_service_1.default.getApplicationById(req.params.id).then(function (application) {
        res.send(JSON.stringify(application));
    });
});
applicationRouter.delete('/:id', function (req, res, next) {
    log_1.default.trace('app DELETE /:id');
    log_1.default.debug(req.body);
    application_service_1.default.removeApplication(Number(req.params.id)).then(function (data) {
        log_1.default.debug(data);
        res.sendStatus(200);
    }).catch(function (err) {
        log_1.default.error(err);
        res.sendStatus(500);
    });
});
applicationRouter.post('/', function (req, res, next) {
    log_1.default.trace('app POST /');
    log_1.default.debug(req.body);
    application_service_1.default.addApplication(req.body).then(function (data) {
        log_1.default.debug(data);
        res.sendStatus(201);
    }).catch(function (err) {
        log_1.default.error(err);
        res.sendStatus(500);
    });
});
applicationRouter.put('/', function (req, res, next) {
    log_1.default.trace('app PUT /');
    log_1.default.debug(req.body);
    application_service_1.default.updateApplication(req.body).then(function (data) {
        res.send(data);
    });
});
exports.default = applicationRouter;

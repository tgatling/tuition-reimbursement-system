"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var log_1 = __importDefault(require("../log"));
var application_service_1 = __importDefault(require("../application/application.service"));
var individualRouter = express_1.default.Router();
// Individual employee applications - displayed on MY APPLICATION page
individualRouter.get('/:username', function (req, res, next) {
    log_1.default.trace('ind GET /');
    application_service_1.default.getApplicationByEmployee(req.params.username).then(function (applications) {
        res.send(JSON.stringify(applications));
    });
});
exports.default = individualRouter;

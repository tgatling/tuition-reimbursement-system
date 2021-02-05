"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewEmployeeApplications = exports.Approval = exports.Application = void 0;
var application_service_1 = __importDefault(require("./application.service"));
var log_1 = __importDefault(require("../log"));
var Application = /** @class */ (function () {
    function Application() {
        this.appId = 0;
        this.employee = '';
        this.submitMonth = 0;
        this.submitDate = 0;
        this.submitYear = 0;
        this.status = 'pending';
        this.processId = 1;
        this.approval = new Approval;
        this.amountGranted = 0;
    }
    return Application;
}());
exports.Application = Application;
var Approval = /** @class */ (function () {
    function Approval() {
        this.directSupervisor = 'pending';
        this.departmentHead = 'pending';
        this.benefitCoordinator = 'pending';
    }
    return Approval;
}());
exports.Approval = Approval;
// View applications submitted by a particular employee
function viewEmployeeApplications(employee) {
    log_1.default.trace('Display Employee\'s Application');
    var displayed = application_service_1.default.getApplicationByEmployee(employee);
    log_1.default.debug(displayed);
}
exports.viewEmployeeApplications = viewEmployeeApplications;

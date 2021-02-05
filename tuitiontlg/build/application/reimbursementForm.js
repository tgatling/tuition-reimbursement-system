"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReimbursementForm = void 0;
var ReimbursementForm = /** @class */ (function () {
    function ReimbursementForm() {
        this.username = '';
        this.firstName = '';
        this.lastName = '';
        this.startMonth = 0;
        this.startDate = 0;
        this.startYear = 0;
        this.timeHour = '00';
        this.timeMins = '00';
        this.timeOfDay = '';
        this.location = '';
        this.description = '';
        this.cost = 0;
        this.gradingFormat = '';
        this.passingGrade = 'Default';
        this.typeOfEvent = '';
        this.workJustification = '';
        this.processId = 1;
        this.missedWork = '';
        this.appId = Math.floor(Math.random() * 1000);
        this.calculation = 0;
        this.finalAttachment = '';
        this.gradeDecision = '';
        this.reimbursed = false;
    }
    return ReimbursementForm;
}());
exports.ReimbursementForm = ReimbursementForm;

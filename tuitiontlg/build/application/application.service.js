"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dynamo_1 = __importDefault(require("../dynamo/dynamo"));
var log_1 = __importDefault(require("../log"));
var ApplicationService = /** @class */ (function () {
    function ApplicationService() {
        this.doc = dynamo_1.default;
    }
    // Get application for every candidate - can only be done by administrators.
    ApplicationService.prototype.getAllApplications = function () {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        log_1.default.trace('Get All Application Function');
                        params = {
                            TableName: 'APP_TABLE'
                        };
                        return [4 /*yield*/, this.doc.scan(params).promise().then(function (data) {
                                return data.Items;
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Get a set of applications by the employee that submitted it.
    ApplicationService.prototype.getApplicationByEmployee = function (submittedBy) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        log_1.default.trace('Get the application based off of the employee that submitted it.');
                        params = {
                            TableName: 'APP_TABLE',
                            IndexName: 'EmployeeIndex',
                            KeyConditionExpression: '#employee = :employee',
                            ExpressionAttributeNames: {
                                '#employee': 'employee',
                            },
                            ExpressionAttributeValues: {
                                ':employee': submittedBy,
                            }
                        };
                        return [4 /*yield*/, this.doc.query(params).promise().then(function (data) {
                                return data.Items;
                            }).catch(function (err) {
                                log_1.default.error(err);
                                return [];
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Get a particular application by the id.
    ApplicationService.prototype.getApplicationById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        log_1.default.trace('Get Application by Id');
                        log_1.default.debug("id: " + id);
                        params = {
                            TableName: 'APP_TABLE',
                            Key: {
                                'appId': id,
                            }
                        };
                        return [4 /*yield*/, this.doc.get(params).promise().then(function (data) {
                                if (data && data.Item) {
                                    log_1.default.debug('data.Item: ', JSON.stringify(data.Item));
                                    return data.Item;
                                }
                                else {
                                    log_1.default.debug('returning null for get application by id');
                                    return null;
                                }
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Add an application to the system.
    ApplicationService.prototype.addApplication = function (application) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            TableName: 'APP_TABLE',
                            Item: application,
                            ConditionExpression: '#appId <> :appId',
                            ExpressionAttributeNames: {
                                '#appId': 'appId',
                            },
                            ExpressionAttributeValues: {
                                ':appId': application.appId,
                            }
                        };
                        return [4 /*yield*/, this.doc.put(params).promise().then(function (result) {
                                log_1.default.info('Successfully added application');
                                return true;
                            }).catch(function (err) {
                                log_1.default.debug('Failed to add application');
                                log_1.default.error(err);
                                return false;
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Delete an application from the system.
    ApplicationService.prototype.removeApplication = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        log_1.default.trace('Remove Application Function');
                        params = {
                            TableName: 'APP_TABLE',
                            Key: {
                                'appId': id,
                            }
                        };
                        return [4 /*yield*/, this.doc.delete(params).promise().then(function (result) {
                                log_1.default.debug(result);
                                log_1.default.info('Successfully deleted the application');
                                return true;
                            }).catch(function (err) {
                                log_1.default.error(err);
                                return false;
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Update car information
    ApplicationService.prototype.updateApplication = function (application) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            TableName: 'APP_TABLE',
                            Key: {
                                'appId': application.appId
                            },
                            UpdateExpression: "set employee=:emp, submitMonth=:sm, submitDate=:sd, \n        submitYear=:sy, status=:stat, processId=:pid, approval=:a, amountGranted=:ag",
                            ExpressionAttributeValues: {
                                ':emp': application.employee,
                                ':sm': application.submitMonth,
                                ':sd': application.submitDate,
                                ':sy': application.submitYear,
                                ':stat': application.status,
                                ':pid': application.processId,
                                ':a': application.approval,
                                ':ag': application.amountGranted
                            },
                            ExpressionAttributeNames: {
                                '#employee': 'employee',
                                '#submitMonth': 'submitMonth',
                                '#submitDate': 'submitDate',
                                '#submitYear': 'submitYear',
                                '#status': 'status',
                                '#processId': 'processId',
                                '#approval': 'approval',
                                '#amountGranted': 'amountGranted'
                            },
                            ReturnValues: 'UPDATE_NEW'
                        };
                        return [4 /*yield*/, this.doc.update(params).promise().then(function (data) {
                                log_1.default.debug(data);
                                return true;
                            }).catch(function (err) {
                                log_1.default.trace('Error for update');
                                log_1.default.error(err);
                                return false;
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return ApplicationService;
}());
var applicationService = new ApplicationService();
exports.default = applicationService;

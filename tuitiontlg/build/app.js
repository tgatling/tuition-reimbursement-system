"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_errors_1 = __importDefault(require("http-errors"));
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var express_session_1 = __importDefault(require("express-session"));
var memorystore_1 = __importDefault(require("memorystore"));
var cors_1 = __importDefault(require("cors"));
var dotenv = __importStar(require("dotenv"));
var constant_1 = __importDefault(require("./constant"));
// Routers
var index_1 = __importDefault(require("./routes/index"));
var user_router_1 = __importDefault(require("./routes/user.router"));
var application_router_1 = __importDefault(require("./routes/application.router"));
var reimbursement_router_1 = __importDefault(require("./routes/reimbursement.router"));
var individual_router_1 = __importDefault(require("./routes/individual.router"));
var message_router_1 = __importDefault(require("./routes/message.router"));
var my_router_1 = __importDefault(require("./routes/my.router"));
dotenv.config();
var app = express_1.default();
app.use(cors_1.default({ origin: process.env.CLIENT, credentials: true }));
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(constant_1.default));
app.use(express_session_1.default({
    secret: 'whatever',
    store: new (memorystore_1.default(express_session_1.default))({ checkPeriod: 86400000 }),
    cookie: {}
}));
app.use('/', index_1.default);
app.use('/users', user_router_1.default);
app.use('/applications', application_router_1.default);
app.use('/reimbursements', reimbursement_router_1.default);
app.use('/employee', individual_router_1.default);
app.use('/messages', message_router_1.default);
app.use('/form', my_router_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(http_errors_1.default(404));
});
// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.sendFile('/error.html', { root: constant_1.default });
});
module.exports = app;

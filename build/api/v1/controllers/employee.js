"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeConnectMeetingHandler = exports.abortMeetingHandler = exports.commitMeetingHandler = exports.assignTaskToEmployeeHandler = exports.createTaskCustomerHandler = exports.completeMeetingHandler = exports.declineMeetingHandler = exports.updateEmployeeMeetingHandler = exports.addMeetingHandler = exports.requestMeetingHandler = exports.addCommentHandler = exports.removeHolidayRequestHandler = exports.addHolidayRequestHandler = exports.addAttendanceHandler = exports.logoutEmployeeAppHandler = exports.logoutEmployeeHandler = exports.getStatusHandler = exports.loginEmployeeAppHandler = exports.loginEmployeeHandler = exports.verifyForgotOtpHandler = exports.forgotPasswordHandler = exports.verifyEmployeeHandler = exports.updateTaskStatusHandler = exports.declinedTaskHandler = exports.completeTaskHandler = exports.updateStatusHandler = exports.declinedProjectHandler = exports.completeProjectHandler = exports.updateProjectHandler = exports.createEmployeeHandler = void 0;
var checkErrors_1 = __importDefault(require("../helpers/checkErrors"));
var customError_1 = __importDefault(require("../helpers/customError"));
var employee_1 = require("../services/employee");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var employee_2 = __importDefault(require("../models/employee"));
var attendance_1 = require("../services/attendance");
var holiday_1 = require("../services/holiday");
var holidayStatus_1 = __importDefault(require("../enums/holidayStatus"));
var mongoose_1 = __importDefault(require("mongoose"));
var task_1 = require("../services/task");
var comment_1 = require("../services/comment");
var sendBy_1 = __importDefault(require("../enums/sendBy"));
var meetingMode_1 = __importDefault(require("../enums/meetingMode"));
var moment_1 = __importDefault(require("moment"));
var assignmentValidity_1 = __importDefault(require("../helpers/assignmentValidity"));
var meeting_1 = require("../services/meeting");
var meetingStatus_1 = __importDefault(require("../enums/meetingStatus"));
var sendOtp_1 = require("../helpers/sendOtp");
var attendanceType_1 = __importDefault(require("../enums/attendanceType"));
var project_Service_1 = require("../services/project.Service");
var taskStatus_1 = __importDefault(require("../enums/taskStatus"));
var meeting_2 = require("../models/meeting");
var setting_service_1 = require("../services/setting.service");
var agora_access_token_1 = require("agora-access-token");
var conversation_service_1 = require("../services/conversation.service");
var conversationType_1 = __importDefault(require("../enums/conversationType"));
var role_1 = __importDefault(require("../enums/role"));
var admin_1 = require("../socketHandlers/admin");
var paymentStatus_1 = __importDefault(require("../enums/paymentStatus"));
var customer_1 = require("../services/customer");
var taskType_1 = __importDefault(require("../enums/taskType"));
var selfTask_service_1 = require("../services/selfTask.service");
function createEmployeeHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var session, code, phone, employee, count, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mongoose_1.default.startSession()];
                case 1:
                    session = _a.sent();
                    session.startTransaction();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 10, , 11]);
                    code = Math.round(Math.random() * 8999 + 1000);
                    phone = req.body.number;
                    return [4 /*yield*/, employee_1.findEmployee({ number: phone }, { _id: 1, codeValid: 1, code: 1 }, { session: session })];
                case 3:
                    employee = _a.sent();
                    console.log(employee);
                    if (employee && !employee.codeValid) {
                        throw new customError_1.default("Bad Request", 404, "Number already exists");
                    }
                    return [4 /*yield*/, sendOtp_1.SendOtp(code, phone)];
                case 4:
                    _a.sent();
                    if (!(employee === null || employee === void 0 ? void 0 : employee.codeValid)) return [3 /*break*/, 6];
                    employee.code = code;
                    return [4 /*yield*/, employee.save()];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 6: return [4 /*yield*/, employee_2.default.countDocuments({}, { session: session })];
                case 7:
                    count = _a.sent();
                    return [4 /*yield*/, employee_1.createEmployee(__assign(__assign({}, req.body), { _id: moment_1.default().year() + "-" + moment_1.default().month() + "-" + (count + 1), code: code, codeValid: true }))];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9:
                    res.status(201).send({
                        message: "we send you a otp please enter here to verify your number",
                    });
                    return [3 /*break*/, 11];
                case 10:
                    err_1 = _a.sent();
                    checkErrors_1.default(err_1, res);
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    });
}
exports.createEmployeeHandler = createEmployeeHandler;
function updateProjectHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, projectId, name_1, billingType, priority, startDate, expectedEndDate, description, project, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, projectId = _a.projectId, name_1 = _a.name, billingType = _a.billingType, priority = _a.priority, startDate = _a.startDate, expectedEndDate = _a.expectedEndDate, description = _a.description;
                    return [4 /*yield*/, project_Service_1.findAndUpdateProject({ _id: projectId }, { $set: req.body }, { new: true })];
                case 1:
                    project = _b.sent();
                    res.send({
                        message: "your project updated",
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    checkErrors_1.default(error_1, res);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updateProjectHandler = updateProjectHandler;
function completeProjectHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, project, customer, notificationMessage, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    user = req.user;
                    return [4 /*yield*/, project_Service_1.findProject({
                            _id: req.body.projectId,
                            clientApproved: true,
                            status: { $nin: [taskStatus_1.default.Declined] },
                            paymentStatus: { $ne: paymentStatus_1.default.Paid },
                        })];
                case 1:
                    project = _a.sent();
                    if (!project) {
                        throw new customError_1.default("Bad Request", 404, "No such project found or project already declined");
                    }
                    if (project.primaryEmployee != user._id) {
                        throw new customError_1.default("Bad Request", 404, "You are not a primary employee for this project");
                    }
                    return [4 /*yield*/, customer_1.findCustomer({ _id: project.customerId })];
                case 2:
                    customer = _a.sent();
                    project.status = taskStatus_1.default.Completed;
                    notificationMessage = "hey " + (customer === null || customer === void 0 ? void 0 : customer.firstname) + ",your task " + project.description + " is completed.";
                    return [4 /*yield*/, project.save()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, admin_1.updateProjectStatusHandler(project, req.body)];
                case 4:
                    _a.sent();
                    res.send({ message: "project " + project.description + " is completed" });
                    return [3 /*break*/, 6];
                case 5:
                    error_2 = _a.sent();
                    checkErrors_1.default(error_2, res);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.completeProjectHandler = completeProjectHandler;
function declinedProjectHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, task, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    user = req.user;
                    return [4 /*yield*/, project_Service_1.findAndUpdateProject({
                            _id: req.body.projectId,
                            clientApproved: true,
                            primaryEmployee: user._id,
                            status: { $nin: [taskStatus_1.default.Completed, taskStatus_1.default.Declined] },
                        }, { $set: { status: taskStatus_1.default.Declined } }, { new: true })];
                case 1:
                    task = _a.sent();
                    if (!task) {
                        throw new customError_1.default("Bad Request", 404, "No such project found or project completed or project already declined");
                    }
                    return [4 /*yield*/, admin_1.updateProjectStatusHandler(task, req.body)];
                case 2:
                    _a.sent();
                    res.send({ message: "task with " + task.description + " declined by you" });
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    checkErrors_1.default(error_3, res);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.declinedProjectHandler = declinedProjectHandler;
function updateStatusHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, project, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    user = req.user;
                    return [4 /*yield*/, project_Service_1.findProject({
                            _id: req.body.projectId,
                            clientApproved: true,
                            status: { $nin: [taskStatus_1.default.Completed, taskStatus_1.default.Declined] },
                        })];
                case 1:
                    project = _a.sent();
                    console.log("project", project);
                    if (!project) {
                        throw new customError_1.default("Bad Request", 404, "No such project found or project completed or project already declined");
                    }
                    if (project.primaryEmployee != user._id) {
                        throw new customError_1.default("Bad Request", 404, "You are not a primary employee for this project");
                    }
                    project.status = req.body.status;
                    return [4 /*yield*/, project.save()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, admin_1.updateProjectStatusHandler(project, req.body)];
                case 3:
                    _a.sent();
                    res.send({ message: "project with " + project.description + " status updated" });
                    return [3 /*break*/, 5];
                case 4:
                    error_4 = _a.sent();
                    checkErrors_1.default(error_4, res);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.updateStatusHandler = updateStatusHandler;
function completeTaskHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var task, timeLog, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, task_1.findTask({
                            _id: req.body.taskId,
                            status: { $nin: [taskStatus_1.default.Declined] },
                        })];
                case 1:
                    task = _a.sent();
                    if (!task) {
                        throw new customError_1.default("Bad Request", 404, "No such project found or project already declined");
                    }
                    timeLog = task.timeLog[0];
                    if (timeLog && !timeLog.endTime) {
                        task.timeLog[0].endTime = moment_1.default().toDate();
                    }
                    task.status = taskStatus_1.default.Completed;
                    return [4 /*yield*/, task.save()];
                case 2:
                    _a.sent();
                    res.send({ message: "project " + task.name + " is completed" });
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _a.sent();
                    checkErrors_1.default(error_5, res);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.completeTaskHandler = completeTaskHandler;
function declinedTaskHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var task, timeLog, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, task_1.findAndUpdateTask({
                            _id: req.body.taskId,
                            status: { $nin: [taskStatus_1.default.Completed, taskStatus_1.default.Declined] },
                        }, { $set: { status: taskStatus_1.default.Declined } }, { new: true })];
                case 1:
                    task = _a.sent();
                    if (!task) {
                        throw new customError_1.default("Bad Request", 404, "No such task found or task completed or task already declined");
                    }
                    timeLog = task.timeLog[0];
                    if (timeLog && !timeLog.endTime) {
                        task.timeLog[0].endTime = moment_1.default().toDate();
                    }
                    res.send({ message: "task with " + task.name + " declined by you" });
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    checkErrors_1.default(error_6, res);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.declinedTaskHandler = declinedTaskHandler;
function updateTaskStatusHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var task, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, task_1.findAndUpdateTask({
                            _id: req.body.taskId,
                            status: { $nin: [taskStatus_1.default.Completed, taskStatus_1.default.Declined] },
                        }, { $set: { status: req.body.status } }, { new: true })];
                case 1:
                    task = _a.sent();
                    if (!task) {
                        throw new customError_1.default("Bad Request", 404, "No such project found or project completed or project already declined");
                    }
                    res.send({ message: "task with " + task.name + " status updated" });
                    return [3 /*break*/, 3];
                case 2:
                    error_7 = _a.sent();
                    checkErrors_1.default(error_7, res);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updateTaskStatusHandler = updateTaskStatusHandler;
function verifyEmployeeHandler(req, res) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return __awaiter(this, void 0, void 0, function () {
        var session, employee, token, setting, date, types, iterator, value, err_2;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0: return [4 /*yield*/, mongoose_1.default.startSession()];
                case 1:
                    session = _j.sent();
                    session.startTransaction();
                    _j.label = 2;
                case 2:
                    _j.trys.push([2, 8, , 10]);
                    console.log(req.body);
                    return [4 /*yield*/, employee_1.findAndUpdateEmployee({
                            number: req.body.number,
                            codeValid: true,
                            code: parseInt(req.body.code),
                        }, { $set: { codeValid: false } }, { session: session })];
                case 3:
                    employee = _j.sent();
                    console.log(employee);
                    if (!employee) {
                        throw new customError_1.default("Bad credentials", 400, "please provide valid otp");
                    }
                    return [4 /*yield*/, employee.generateAuthToken(req.body.webToken)];
                case 4:
                    token = _j.sent();
                    return [4 /*yield*/, setting_service_1.findSetting({})];
                case 5:
                    setting = _j.sent();
                    date = moment_1.default().startOf("month");
                    types = {};
                    console.log("setting", (_d = (_c = (_b = (_a = 
                    //@ts-ignore
                    setting === null || 
                    //@ts-ignore
                    setting === void 0 ? void 0 : 
                    //@ts-ignore
                    setting.types) === null || _a === void 0 ? void 0 : _a.entries()) === null || _b === void 0 ? void 0 : _b.next()) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : {});
                    iterator = (_f = (_e = setting === null || setting === void 0 ? void 0 : setting.types) === null || _e === void 0 ? void 0 : _e.entries()) !== null && _f !== void 0 ? _f : new Map().entries();
                    value = iterator.next().value;
                    while (value) {
                        types[value[0]] = __assign({}, ((_h = (_g = value[1]) === null || _g === void 0 ? void 0 : _g.toJSON()) !== null && _h !== void 0 ? _h : value[1]));
                        value = iterator.next().value;
                    }
                    employee.sickLeave = setting ? [{ date: date.toDate(), types: types }] : [];
                    return [4 /*yield*/, employee.save()];
                case 6:
                    _j.sent();
                    return [4 /*yield*/, session.commitTransaction()];
                case 7:
                    _j.sent();
                    res.status(200).send({
                        employee: __assign(__assign({}, employee.toJSON()), { sickLeave: employee.sickLeave.map(function (value) {
                                //@ts-ignore
                                return __assign(__assign({}, value.toJSON()), { types: Object.fromEntries(value.types) });
                            }) }),
                        token: token,
                    });
                    return [3 /*break*/, 10];
                case 8:
                    err_2 = _j.sent();
                    return [4 /*yield*/, session.abortTransaction()];
                case 9:
                    _j.sent();
                    checkErrors_1.default(err_2, res);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.verifyEmployeeHandler = verifyEmployeeHandler;
function forgotPasswordHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var code, phone, admin, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    code = Math.round(Math.random() * 8999 + 1000);
                    phone = req.body.number;
                    return [4 /*yield*/, employee_1.findAndUpdateEmployee({ number: phone }, { $set: { forgotOtp: code } }, {})];
                case 1:
                    admin = _a.sent();
                    if (!admin) {
                        throw new customError_1.default("Bad Request", 404, "No such admin found");
                    }
                    return [4 /*yield*/, sendOtp_1.SendOtp(code, phone)];
                case 2:
                    _a.sent();
                    res.status(201).send({
                        message: "we send you a otp please enter here to verify your number",
                    });
                    return [3 /*break*/, 4];
                case 3:
                    err_3 = _a.sent();
                    checkErrors_1.default(err_3, res);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.forgotPasswordHandler = forgotPasswordHandler;
function verifyForgotOtpHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var admin, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    console.log(req.body);
                    return [4 /*yield*/, employee_1.findEmployee({
                            number: req.body.number,
                            forgotOtp: req.body.code,
                        })];
                case 1:
                    admin = _a.sent();
                    console.log(admin);
                    if (!admin) {
                        throw new customError_1.default("Bad credentials", 400, "please provide valid otp");
                    }
                    admin.forgotOtp = undefined;
                    admin.password = req.body.password;
                    return [4 /*yield*/, admin.save()];
                case 2:
                    _a.sent();
                    res.status(200).send({ message: "Your password has been changed" });
                    return [3 /*break*/, 4];
                case 3:
                    err_4 = _a.sent();
                    checkErrors_1.default(err_4, res);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.verifyForgotOtpHandler = verifyForgotOtpHandler;
function loginEmployeeHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var employee, token, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, employee_1.validatePassword(req.body)];
                case 1:
                    employee = _a.sent();
                    if (!employee) {
                        throw new customError_1.default("Bad request", 404, "Please Provide Right Credientials");
                    }
                    return [4 /*yield*/, employee.generateAuthToken(req.body.webToken)];
                case 2:
                    token = _a.sent();
                    res.send({ employee: employee, token: token });
                    return [3 /*break*/, 4];
                case 3:
                    err_5 = _a.sent();
                    checkErrors_1.default(err_5, res);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.loginEmployeeHandler = loginEmployeeHandler;
function loginEmployeeAppHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var employee, token, err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, employee_1.validatePassword(req.body)];
                case 1:
                    employee = _a.sent();
                    if (!employee) {
                        throw new customError_1.default("Bad request", 404, "Please Provide Right Credientials");
                    }
                    return [4 /*yield*/, employee.generateAuthToken(req.body.deviceToken)];
                case 2:
                    token = _a.sent();
                    // res.cookie("jwt", "manish", { httpOnly: true });
                    res.send({ employee: employee, token: token });
                    return [3 /*break*/, 4];
                case 3:
                    err_6 = _a.sent();
                    checkErrors_1.default(err_6, res);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.loginEmployeeAppHandler = loginEmployeeAppHandler;
function getStatusHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            try {
                user = req.user;
                res.send(__assign(__assign({}, user === null || user === void 0 ? void 0 : user.toJSON()), { sickLeave: user.sickLeave.map(function (value) {
                        //@ts-ignore
                        return __assign(__assign({}, value.toJSON()), { types: Object.fromEntries(value.types) });
                    }) }));
            }
            catch (err) {
                checkErrors_1.default(err, res);
            }
            return [2 /*return*/];
        });
    });
}
exports.getStatusHandler = getStatusHandler;
function logoutEmployeeHandler(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var token, decoded, employee;
        return __generator(this, function (_b) {
            try {
                token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
                console.log("token", token);
                if (!token) {
                    throw new customError_1.default("Bad request", 401, "Please Authenticate first");
                }
                decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                employee = employee_1.findAndUpdateEmployee({
                    _id: decoded._id,
                    "tokens.token": token,
                }, {
                    $pull: {
                        webToken: { token: token },
                        tokens: { token: token },
                    },
                }, {});
                if (!employee) {
                    throw new customError_1.default("Bad request", 401, "Please Authenticate first");
                }
                res.send({ message: "You are successfully logout" });
            }
            catch (err) {
                checkErrors_1.default(err, res);
            }
            return [2 /*return*/];
        });
    });
}
exports.logoutEmployeeHandler = logoutEmployeeHandler;
function logoutEmployeeAppHandler(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var token, decoded, employee;
        return __generator(this, function (_b) {
            try {
                token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
                console.log("token", token);
                if (!token) {
                    throw new customError_1.default("Bad request", 401, "Please Authenticate first");
                }
                decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                employee = employee_1.findAndUpdateEmployee({
                    _id: decoded._id,
                    "tokens.token": token,
                }, {
                    $pull: {
                        deviceToken: { token: token },
                        tokens: { token: token },
                    },
                }, {});
                if (!employee) {
                    throw new customError_1.default("Bad request", 401, "Please Authenticate first");
                }
                res.send({ message: "You are successfully logout" });
            }
            catch (err) {
                checkErrors_1.default(err, res);
            }
            return [2 /*return*/];
        });
    });
}
exports.logoutEmployeeAppHandler = logoutEmployeeAppHandler;
function addAttendanceHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, currentDate, dateCheck, attendance, employee, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    user = req.user;
                    currentDate = new Date();
                    dateCheck = new Date(currentDate.getUTCFullYear + "-" + currentDate.getUTCMonth + "-" + currentDate.getUTCDate);
                    return [4 /*yield*/, attendance_1.findAttendance({ date: dateCheck })];
                case 1:
                    attendance = _a.sent();
                    if (!attendance) return [3 /*break*/, 7];
                    if (!(attendance.attendanceType == attendanceType_1.default.Normal)) return [3 /*break*/, 5];
                    return [4 /*yield*/, attendance_1.findAttendance({
                            date: dateCheck,
                            "attendance.employeeId": user._id,
                        })];
                case 2:
                    employee = _a.sent();
                    if (!!employee) return [3 /*break*/, 4];
                    attendance.attendance.push({
                        employeeId: user._id,
                        time: new Date(),
                        approved: holidayStatus_1.default.Pending,
                    });
                    return [4 /*yield*/, attendance.save()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5: throw new customError_1.default("Bad Request", 404, "Hey enjoy, today is " + (attendance.attendanceType == attendanceType_1.default.Weekend
                    ? "Weekend"
                    : "holiday"));
                case 6: return [3 /*break*/, 8];
                case 7: throw new customError_1.default("Bad Request", 404, "Attendance Not started yet");
                case 8:
                    res.send({ message: "attendance successfully taken" });
                    return [3 /*break*/, 10];
                case 9:
                    error_8 = _a.sent();
                    checkErrors_1.default(error_8, res);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.addAttendanceHandler = addAttendanceHandler;
function addHolidayRequestHandler(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var user, _c, date_1, reason, type_1, sickId_1, holiday, requestIndex, value, leaves, totalLeaveTaken, error_9;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 3, , 4]);
                    user = req.user;
                    _c = req.body, date_1 = _c.date, reason = _c.reason, type_1 = _c.type, sickId_1 = _c.sickId;
                    if (moment_1.default(date_1).isBefore(moment_1.default())) {
                        throw new customError_1.default("Bad Request", 404, "Date already passed");
                    }
                    console.log("date", date_1);
                    return [4 /*yield*/, holiday_1.findHoliday({
                            start: { $lte: date_1 },
                            end: { $gt: date_1 },
                        })];
                case 1:
                    holiday = _d.sent();
                    if (holiday) {
                        throw new customError_1.default("Bad Request", 400, "This day was holiday declared by owner");
                    }
                    requestIndex = user.holidayRequest.findIndex(function (value) {
                        return moment_1.default(value.date).isSame(moment_1.default(date_1));
                    });
                    value = user.sickLeave.find(function (value, index) {
                        if (moment_1.default(value.date)
                            .startOf("month")
                            .isSameOrBefore(moment_1.default(date_1).startOf("month"))) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    });
                    if (!value) {
                        throw new customError_1.default("Bad Request", 404, "No such type of leave found");
                    }
                    leaves = Object.fromEntries(value.types);
                    console.log("leaves", leaves);
                    totalLeaveTaken = user.holidayRequest.filter(function (value) {
                        return value.sickId.equals(sickId_1) &&
                            value.type == type_1 &&
                            value.status == holidayStatus_1.default.Approved;
                    });
                    if (((_a = leaves[type_1]) === null || _a === void 0 ? void 0 : _a.value) - totalLeaveTaken.length <= 0) {
                        throw new customError_1.default("Bad Request", 404, "No Remaining leave found");
                    }
                    if (requestIndex == -1) {
                        user.holidayRequest.push({
                            //@ts-ignore
                            sickId: value._id,
                            date: new Date(date_1),
                            reason: reason,
                            status: holidayStatus_1.default.Pending,
                            holidayAdded: false,
                            holidayType: (_b = leaves[type_1]) === null || _b === void 0 ? void 0 : _b.type,
                            type: type_1,
                        });
                    }
                    else {
                        throw new customError_1.default("Bad Request", 404, "Leave already added");
                    }
                    return [4 /*yield*/, user.save()];
                case 2:
                    _d.sent();
                    res.send({ message: "your holiday request has been sent to owner" });
                    return [3 /*break*/, 4];
                case 3:
                    error_9 = _d.sent();
                    checkErrors_1.default(error_9, res);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.addHolidayRequestHandler = addHolidayRequestHandler;
function removeHolidayRequestHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, _a, requestedId_1, reason, requestIndex, error_10;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    user = req.user;
                    _a = req.body, requestedId_1 = _a.requestedId, reason = _a.reason;
                    requestIndex = user.holidayRequest.findIndex(function (value) {
                        //@ts-ignore
                        return value._id.toString() == requestedId_1;
                    });
                    if (!(requestIndex == -1)) return [3 /*break*/, 1];
                    throw new customError_1.default("Bad Request", 404, "No such request found");
                case 1:
                    user.holidayRequest[requestIndex].removalReason = reason;
                    user.holidayRequest[requestIndex].removalRequest = true;
                    return [4 /*yield*/, user.save()];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3:
                    res.send({
                        message: "your holiday removal request has been sent to owner",
                    });
                    return [3 /*break*/, 5];
                case 4:
                    error_10 = _b.sent();
                    checkErrors_1.default(error_10, res);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.removeHolidayRequestHandler = removeHolidayRequestHandler;
function addCommentHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, taskId, commentId, comment, user, oldComment, func, task, project, newComment, error_11;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 12, , 13]);
                    _a = req.body, taskId = _a.taskId, commentId = _a.commentId, comment = _a.comment;
                    user = req.user;
                    oldComment = null;
                    if (!commentId) return [3 /*break*/, 2];
                    return [4 /*yield*/, comment_1.findComment({
                            _id: commentId,
                        }, { threads: 1 })];
                case 1:
                    oldComment = _b.sent();
                    if (!oldComment) {
                        throw new customError_1.default("Bad Request", 404, "No such comment for reply found");
                    }
                    else {
                    }
                    _b.label = 2;
                case 2:
                    func = task_1.findTask;
                    console.log("boidy", req.body);
                    if (req.body.type == taskType_1.default.Personal) {
                        //@ts-ignore
                        func = selfTask_service_1.findSelfTask;
                    }
                    return [4 /*yield*/, func({
                            _id: taskId,
                        }, { comments: 1, assignedEmployee: 1 })];
                case 3:
                    task = _b.sent();
                    if (!task) {
                        throw new customError_1.default("Bad Request", 404, "No such task found");
                    }
                    if (!(task.assignedEmployee != user._id)) return [3 /*break*/, 6];
                    if (!(req.body.type == taskType_1.default.Personal)) return [3 /*break*/, 4];
                    throw new customError_1.default("Bad Request", 400, "No such task found");
                case 4: return [4 /*yield*/, project_Service_1.findProject({
                        _id: task.projectId,
                        primaryEmployee: user._id,
                    })];
                case 5:
                    project = _b.sent();
                    if (!project) {
                        throw new customError_1.default("Bad Request", 400, "You are not part of this project");
                    }
                    _b.label = 6;
                case 6: return [4 /*yield*/, comment_1.createComment({
                        senderId: user._id,
                        sendBy: sendBy_1.default.Employee,
                        parent: commentId ? false : true,
                        taskId: task._id,
                        threads: [],
                        comment: comment,
                        senderProfile: user.profileUri,
                        senderName: user.username,
                    })];
                case 7:
                    newComment = _b.sent();
                    if (!oldComment) return [3 /*break*/, 9];
                    oldComment.threads.push(newComment._id);
                    return [4 /*yield*/, oldComment.save()];
                case 8:
                    _b.sent();
                    return [3 /*break*/, 11];
                case 9:
                    task.comments.push(newComment._id);
                    return [4 /*yield*/, task.save()];
                case 10:
                    _b.sent();
                    _b.label = 11;
                case 11:
                    res.send(newComment);
                    return [3 /*break*/, 13];
                case 12:
                    error_11 = _b.sent();
                    checkErrors_1.default(error_11, res);
                    return [3 /*break*/, 13];
                case 13: return [2 /*return*/];
            }
        });
    });
}
exports.addCommentHandler = addCommentHandler;
function requestMeetingHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var session, _a, projectId, startDate, mode, slotTime, endDate, comment, requestedLocation, employeeId, user, project, finishedDate, employee, invalid, locationValue, meeting, error_12;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, mongoose_1.default.startSession()];
                case 1:
                    session = _b.sent();
                    session.startTransaction();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 8, , 10]);
                    _a = req.body, projectId = _a.projectId, startDate = _a.startDate, mode = _a.mode, slotTime = _a.slotTime, endDate = _a.endDate, comment = _a.comment, requestedLocation = _a.requestedLocation, employeeId = _a.employeeId;
                    user = req.user;
                    return [4 /*yield*/, project_Service_1.findProject({
                            _id: projectId,
                        })];
                case 3:
                    project = _b.sent();
                    if (!project) {
                        throw new customError_1.default("Bad Request", 404, "No such project found ");
                    }
                    if (project.primaryEmployee != user._id) {
                        throw new customError_1.default("Bad Request", 404, "You are not authorized to create the project");
                    }
                    finishedDate = moment_1.default(startDate).add(slotTime !== null && slotTime !== void 0 ? slotTime : 30, "minutes");
                    employee = null;
                    if (!employeeId) return [3 /*break*/, 5];
                    return [4 /*yield*/, employee_1.findEmployee({ _id: employeeId }, { schdule: 1 })];
                case 4:
                    employee = _b.sent();
                    if (!employee) {
                        throw new customError_1.default("Bad Request", 400, "No any employee assigned to it");
                    }
                    invalid = false;
                    if (mode == meetingMode_1.default.Online) {
                        invalid = assignmentValidity_1.default(startDate, finishedDate.toDate(), employee);
                    }
                    else {
                        invalid = assignmentValidity_1.default(startDate, endDate, employee);
                    }
                    if (invalid) {
                        throw new customError_1.default("Bad Request", 404, "This slot is already booked please choose another date");
                    }
                    _b.label = 5;
                case 5:
                    locationValue = {};
                    if (mode == meetingMode_1.default.Physical) {
                        locationValue["requestedLocation"] = requestedLocation;
                    }
                    return [4 /*yield*/, meeting_1.createMeeting(__assign({ employeeId: employee === null || employee === void 0 ? void 0 : employee._id, projectId: project._id, requestedBy: sendBy_1.default.Employee, creatorId: { number: user.number, name: user.username, id: user._id }, customerConfirmed: false, employeeConfirmed: (employee === null || employee === void 0 ? void 0 : employee._id) == user._id ? true : false, employeeHistory: employee
                                ? [{ status: meeting_2.MeetingEmployeeAction.Pending, employeeId: employeeId }]
                                : [], customerId: project.customerId, comment: comment,
                            mode: mode, meetingStartTime: startDate, meetingEndTime: mode == meetingMode_1.default.Online ? finishedDate.toDate() : endDate, slotTime: 30 }, locationValue))];
                case 6:
                    meeting = _b.sent();
                    return [4 /*yield*/, session.commitTransaction()];
                case 7:
                    _b.sent();
                    res.send(meeting);
                    return [3 /*break*/, 10];
                case 8:
                    error_12 = _b.sent();
                    return [4 /*yield*/, session.abortTransaction()];
                case 9:
                    _b.sent();
                    checkErrors_1.default(error_12, res);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.requestMeetingHandler = requestMeetingHandler;
function addMeetingHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var session, _a, meetingType, participants, conversationId, startDate, customerId, projectId, slotTime, comment, user, finishedDate, meeting, error_13;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, mongoose_1.default.startSession()];
                case 1:
                    session = _b.sent();
                    session.startTransaction();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 5, , 7]);
                    _a = req.body, meetingType = _a.meetingType, participants = _a.participants, conversationId = _a.conversationId, startDate = _a.startDate, customerId = _a.customerId, projectId = _a.projectId, slotTime = _a.slotTime, comment = _a.comment;
                    user = req.user;
                    console.log("data", req.body);
                    finishedDate = moment_1.default(startDate).add(slotTime !== null && slotTime !== void 0 ? slotTime : 30, "minutes");
                    return [4 /*yield*/, meeting_1.createMeeting({
                            requestedBy: sendBy_1.default.Employee,
                            customerConfirmed: false,
                            customerId: customerId,
                            meetingType: meetingType,
                            conversationId: conversationId,
                            participants: participants,
                            creatorId: { number: user.number, name: user.username, id: user._id },
                            projectId: projectId,
                            comment: comment,
                            mode: meetingMode_1.default.Online,
                            meetingStartTime: startDate,
                            meetingEndTime: finishedDate.toDate(),
                            slotTime: 30,
                        })];
                case 3:
                    meeting = _b.sent();
                    return [4 /*yield*/, session.commitTransaction()];
                case 4:
                    _b.sent();
                    res.send(meeting);
                    return [3 /*break*/, 7];
                case 5:
                    error_13 = _b.sent();
                    return [4 /*yield*/, session.abortTransaction()];
                case 6:
                    _b.sent();
                    checkErrors_1.default(error_13, res);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.addMeetingHandler = addMeetingHandler;
function updateEmployeeMeetingHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var session, _a, meetingId, employeeId, meeting, user, project, employee, invalid, employee_3, err_7;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, mongoose_1.default.startSession()];
                case 1:
                    session = _b.sent();
                    session.startTransaction();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 10, , 12]);
                    _a = req.body, meetingId = _a.meetingId, employeeId = _a.employeeId;
                    return [4 /*yield*/, meeting_1.findMeeting({
                            _id: meetingId,
                            status: meetingStatus_1.default.Pending,
                        }, {}, { session: session })];
                case 3:
                    meeting = _b.sent();
                    if (!meeting) {
                        throw new customError_1.default("Bad Request", 404, "No such meeting found or meeting completed previously");
                    }
                    user = req.user;
                    return [4 /*yield*/, project_Service_1.findProject({
                            _id: meeting.projectId,
                        })];
                case 4:
                    project = _b.sent();
                    if (!project) {
                        throw new customError_1.default("Bad Request", 404, "No such project found ");
                    }
                    if (project.primaryEmployee != user._id) {
                        throw new customError_1.default("Bad Request", 404, "You are not authorized to create the project");
                    }
                    return [4 /*yield*/, employee_1.findEmployee({ _id: employeeId }, { schdule: 1 }, { session: session })];
                case 5:
                    employee = _b.sent();
                    if (!employee) {
                        throw new customError_1.default("Bad Request", 400, "No any employee assigned to it");
                    }
                    invalid = assignmentValidity_1.default(meeting.meetingStartTime, meeting.meetingEndTime, employee);
                    if (invalid) {
                        throw new customError_1.default("Bad Request", 404, "This slot is already booked please choose another date");
                    }
                    if (!meeting.employeeConfirmed) return [3 /*break*/, 7];
                    return [4 /*yield*/, employee_1.findAndUpdateEmployee({ _id: meeting.employeeId }, { $pull: { schdule: { meetingId: meeting._id } } }, { session: session })];
                case 6:
                    employee_3 = _b.sent();
                    _b.label = 7;
                case 7:
                    meeting.employeeId = employeeId;
                    meeting.employeeConfirmed = false;
                    meeting.employeeHistory.unshift({
                        status: meeting_2.MeetingEmployeeAction.Pending,
                        employeeId: employeeId,
                    });
                    return [4 /*yield*/, meeting.save()];
                case 8:
                    _b.sent();
                    return [4 /*yield*/, session.commitTransaction()];
                case 9:
                    _b.sent();
                    return [3 /*break*/, 12];
                case 10:
                    err_7 = _b.sent();
                    return [4 /*yield*/, session.abortTransaction()];
                case 11:
                    _b.sent();
                    checkErrors_1.default(err_7, res);
                    return [3 /*break*/, 12];
                case 12: return [2 /*return*/];
            }
        });
    });
}
exports.updateEmployeeMeetingHandler = updateEmployeeMeetingHandler;
function declineMeetingHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var session, meetingId, meeting, user, project, employee, error_14;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mongoose_1.default.startSession()];
                case 1:
                    session = _a.sent();
                    session.startTransaction();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 9, , 11]);
                    meetingId = req.body.meetingId;
                    return [4 /*yield*/, meeting_1.findMeeting({
                            _id: meetingId,
                            status: meetingStatus_1.default.Pending,
                        })];
                case 3:
                    meeting = _a.sent();
                    if (!meeting) {
                        throw new customError_1.default("Bad Request", 404, "No such meeting found or meeting completed previously");
                    }
                    user = req.user;
                    return [4 /*yield*/, project_Service_1.findProject({
                            _id: meeting.projectId,
                        })];
                case 4:
                    project = _a.sent();
                    if (!project) {
                        throw new customError_1.default("Bad Request", 404, "No such project found ");
                    }
                    if (project.primaryEmployee != user._id) {
                        throw new customError_1.default("Bad Request", 404, "You are not authorized to create the project");
                    }
                    if (!(meeting.employeeConfirmed && meeting.customerConfirmed)) return [3 /*break*/, 6];
                    return [4 /*yield*/, employee_1.findAndUpdateEmployee({ _id: meeting.employeeId }, { $pull: { schdule: { meetingId: meeting._id } } }, { session: session })];
                case 5:
                    employee = _a.sent();
                    if (!employee) {
                        throw new customError_1.default("Bad Request", 400, "No any employee assigned to it");
                    }
                    _a.label = 6;
                case 6:
                    meeting.meetingStatus = meetingStatus_1.default.Declined;
                    return [4 /*yield*/, meeting.save()];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, session.commitTransaction()];
                case 8:
                    _a.sent();
                    res.send({ message: "your meeting has been declined" });
                    return [3 /*break*/, 11];
                case 9:
                    error_14 = _a.sent();
                    //@ts-ignore
                    return [4 /*yield*/, session.abortTransaction()];
                case 10:
                    //@ts-ignore
                    _a.sent();
                    checkErrors_1.default(error_14, res);
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    });
}
exports.declineMeetingHandler = declineMeetingHandler;
function completeMeetingHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var session, meetingId, meeting, user, project, error_15;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mongoose_1.default.startSession()];
                case 1:
                    session = _a.sent();
                    session.startTransaction();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 9, , 11]);
                    meetingId = req.body.meetingId;
                    return [4 /*yield*/, meeting_1.findMeeting({
                            _id: meetingId,
                            status: meetingStatus_1.default.Pending,
                        })];
                case 3:
                    meeting = _a.sent();
                    if (!meeting) {
                        throw new customError_1.default("Bad Request", 404, "No such meeting found or meeting completed previously");
                    }
                    user = req.user;
                    return [4 /*yield*/, project_Service_1.findProject({
                            _id: meeting.projectId,
                        })];
                case 4:
                    project = _a.sent();
                    if (!project) {
                        throw new customError_1.default("Bad Request", 404, "No such project found ");
                    }
                    if (project.primaryEmployee != user._id) {
                        throw new customError_1.default("Bad Request", 404, "You are not authorized to create the project");
                    }
                    if (!(meeting.employeeConfirmed && meeting.customerConfirmed)) return [3 /*break*/, 6];
                    return [4 /*yield*/, employee_1.findAndUpdateEmployee({ _id: meeting.employeeId }, { $pull: { schdule: { meetingId: meeting._id } } }, { session: session })];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    meeting.meetingStatus = meetingStatus_1.default.Completed;
                    return [4 /*yield*/, meeting.save()];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, session.commitTransaction()];
                case 8:
                    _a.sent();
                    res.send({ message: "your meeting has been completed" });
                    return [3 /*break*/, 11];
                case 9:
                    error_15 = _a.sent();
                    //@ts-ignore
                    return [4 /*yield*/, session.abortTransaction()];
                case 10:
                    //@ts-ignore
                    _a.sent();
                    checkErrors_1.default(error_15, res);
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    });
}
exports.completeMeetingHandler = completeMeetingHandler;
function createTaskCustomerHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var session, _a, employeeId_1, description, name_2, expectedEndDate, projectId, priority, user, project, employee, index, conversation, primaryEmployee, input, task, error_16;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, mongoose_1.default.startSession()];
                case 1:
                    session = _b.sent();
                    session.startTransaction();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 14, , 16]);
                    _a = req.body, employeeId_1 = _a.employeeId, description = _a.description, name_2 = _a.name, expectedEndDate = _a.expectedEndDate, projectId = _a.projectId, priority = _a.priority;
                    user = req.user;
                    return [4 /*yield*/, project_Service_1.findProject({ _id: projectId })];
                case 3:
                    project = _b.sent();
                    console.log("body", req.body, project);
                    if (!project || project.primaryEmployee != user._id) {
                        throw new customError_1.default("Bad Request", 404, "No such project found or you are not authorized to create task");
                    }
                    if (!project.clientApproved) {
                        throw new customError_1.default("Bad Request", 404, "client doesnot approve quotation yet");
                    }
                    if (!project.adminApproved) {
                        throw new customError_1.default("Bad Request", 404, "Admin did not send the quotation yet");
                    }
                    employee = null;
                    if (!employeeId_1) return [3 /*break*/, 11];
                    return [4 /*yield*/, employee_1.findEmployee({ _id: employeeId_1 })];
                case 4:
                    employee = _b.sent();
                    if (!employee) {
                        throw new customError_1.default("Bad Request", 404, "No such employee found");
                    }
                    index = project.assignedEmployees.findIndex(function (value) { return value.employeeId == employeeId_1; });
                    return [4 /*yield*/, conversation_service_1.findAndUpdateConversation({ projectId: project._id, conversationType: conversationType_1.default.Group }, {
                            $addToSet: {
                                participants: {
                                    id: employee._id,
                                    participantType: sendBy_1.default.Employee,
                                    participantName: employee.username,
                                    participantProfile: employee.profileUri,
                                },
                            },
                        }, { session: session })];
                case 5:
                    conversation = _b.sent();
                    if (!(index == -1)) return [3 /*break*/, 8];
                    project.assignedEmployees.push({
                        employeeId: employeeId_1,
                        role: role_1.default.Secondary,
                        taskCount: 1,
                    });
                    primaryEmployee = void 0;
                    if (!project.primaryEmployee) return [3 /*break*/, 7];
                    return [4 /*yield*/, employee_1.findEmployee({
                            _id: project.primaryEmployee,
                        })];
                case 6:
                    primaryEmployee = _b.sent();
                    _b.label = 7;
                case 7:
                    admin_1.addSocketProjectHandler(employeeId_1, project, primaryEmployee);
                    if (conversation) {
                        admin_1.addConversationHandler([conversation], [employeeId_1]);
                    }
                    return [3 /*break*/, 9];
                case 8:
                    project.assignedEmployees[index].taskCount += 1;
                    _b.label = 9;
                case 9: return [4 /*yield*/, project.save()];
                case 10:
                    _b.sent();
                    _b.label = 11;
                case 11:
                    input = {
                        projectId: projectId,
                        customerId: project.customerId,
                        name: name_2,
                        assignedEmployee: employeeId_1,
                        priority: priority,
                        timeLog: [],
                        previousEmployee: employeeId_1
                            ? [
                                {
                                    assignedBy: user.username,
                                    id: employeeId_1,
                                    profileUri: employee === null || employee === void 0 ? void 0 : employee.profileUri,
                                    assignedDate: new Date(),
                                    username: employee.username,
                                },
                            ]
                            : [],
                        expectedEndDate: moment_1.default(expectedEndDate).toDate(),
                        description: description,
                        status: taskStatus_1.default.Initiated,
                    };
                    return [4 /*yield*/, task_1.createTask(input)];
                case 12:
                    task = _b.sent();
                    return [4 /*yield*/, session.commitTransaction()];
                case 13:
                    _b.sent();
                    res.send(__assign(__assign({}, task.toJSON()), { assignedEmployee: employee }));
                    return [3 /*break*/, 16];
                case 14:
                    error_16 = _b.sent();
                    return [4 /*yield*/, session.abortTransaction()];
                case 15:
                    _b.sent();
                    checkErrors_1.default(error_16, res);
                    return [3 /*break*/, 16];
                case 16: return [2 /*return*/];
            }
        });
    });
}
exports.createTaskCustomerHandler = createTaskCustomerHandler;
function assignTaskToEmployeeHandler(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var _c, taskId, employeeId_2, user, task_2, project, employee, conversation, index_1, date, timeLog, index, error_17;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 7, , 8]);
                    _c = req.body, taskId = _c.taskId, employeeId_2 = _c.employeeId;
                    user = req.user;
                    return [4 /*yield*/, task_1.findTask({
                            _id: taskId,
                            status: { $nin: [taskStatus_1.default.Completed, taskStatus_1.default.Declined] },
                        })];
                case 1:
                    task_2 = _d.sent();
                    if (!task_2) {
                        throw new customError_1.default("Bad Request", 404, "No such task found or task completed or task declined");
                    }
                    return [4 /*yield*/, project_Service_1.findProject({ _id: task_2.projectId })];
                case 2:
                    project = _d.sent();
                    if (!project || project.primaryEmployee != user._id) {
                        throw new customError_1.default("Bad Request", 404, "No such project found or you are not authorized to create task");
                    }
                    return [4 /*yield*/, employee_1.findEmployee({ _id: employeeId_2 })];
                case 3:
                    employee = _d.sent();
                    if (!employee) {
                        throw new customError_1.default("Bad Request", 404, "No such employee found");
                    }
                    if (task_2.assignedEmployee == employeeId_2) {
                        throw new customError_1.default("Bad Request", 404, "This employee is already assigned to this task");
                    }
                    if (!project) {
                        throw new customError_1.default("Bad Request", 404, "No such project found");
                    }
                    return [4 /*yield*/, conversation_service_1.findAndUpdateConversation({
                            projectId: task_2.projectId,
                            conversationType: conversationType_1.default.Group,
                        }, {
                            $addToSet: {
                                participants: {
                                    id: employee._id,
                                    participantType: sendBy_1.default.Employee,
                                    participantName: employee.username,
                                    participantProfile: employee.profileUri,
                                },
                            },
                        }, {})];
                case 4:
                    conversation = _d.sent();
                    if (!conversation) {
                        throw new customError_1.default("Bad Request", 404, "No such conversation found");
                    }
                    if (task_2.assignedEmployee) {
                        index_1 = project.assignedEmployees.findIndex(function (value) { return value.employeeId == task_2.assignedEmployee; });
                        if (index_1 > -1) {
                            if (project.assignedEmployees[index_1].taskCount <= 1) {
                                if (project.assignedEmployees[index_1].role == role_1.default.Primary) {
                                    project.assignedEmployees[index_1].taskCount -= 1;
                                }
                                else {
                                    project.assignedEmployees.splice(index_1, 1);
                                    admin_1.deleteSocketProjectHandler(task_2.assignedEmployee, project._id);
                                    if (conversation) {
                                        admin_1.deleteConversationHandler([conversation._id], task_2.assignedEmployee);
                                    }
                                }
                            }
                            else {
                                project.assignedEmployees[index_1].taskCount -= 1;
                            }
                        }
                    }
                    date = new Date();
                    if (task_2.previousEmployee.length > 0) {
                        task_2.previousEmployee[0].removedBy = user._id;
                        task_2.previousEmployee[0].removedDate = date;
                    }
                    task_2.assignedEmployee = employeeId_2;
                    task_2.status = taskStatus_1.default.Ongoing;
                    timeLog = (_a = task_2 === null || task_2 === void 0 ? void 0 : task_2.timeLog) === null || _a === void 0 ? void 0 : _a[0];
                    if (timeLog && !timeLog.endTime) {
                        task_2.timeLog[0].endTime = moment_1.default().toDate();
                    }
                    console.log("some new ", {
                        assignedBy: user._id,
                        assignedDate: date,
                        id: employeeId_2,
                        username: employee.username,
                        profileUri: employee.profileUri,
                    });
                    task_2.previousEmployee = __spreadArrays([
                        {
                            assignedBy: user._id,
                            assignedDate: date,
                            id: employeeId_2,
                            username: employee.username,
                            profileUri: employee.profileUri,
                        }
                    ], task_2.previousEmployee);
                    console.log("task", task_2);
                    index = project.assignedEmployees.findIndex(function (value) { return value.employeeId == employeeId_2; });
                    if (index == -1) {
                        project.assignedEmployees.push({
                            employeeId: employeeId_2,
                            role: role_1.default.Secondary,
                            taskCount: 1,
                        });
                        admin_1.addConversationHandler([conversation], [employeeId_2]);
                        admin_1.addSocketProjectHandler(employeeId_2, project);
                    }
                    else {
                        project.assignedEmployees[index].taskCount += 1;
                    }
                    return [4 /*yield*/, project.save()];
                case 5:
                    _d.sent();
                    return [4 /*yield*/, task_2.save()];
                case 6:
                    _d.sent();
                    res.send({
                        message: "task with name " + ((_b = task_2.description) !== null && _b !== void 0 ? _b : "nothing") + " assigned to employee with name " + employee.username,
                    });
                    return [3 /*break*/, 8];
                case 7:
                    error_17 = _d.sent();
                    checkErrors_1.default(error_17, res);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.assignTaskToEmployeeHandler = assignTaskToEmployeeHandler;
function commitMeetingHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var session, user, meeting, index, error_18;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mongoose_1.default.startSession()];
                case 1:
                    session = _a.sent();
                    session.startTransaction();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 7, , 9]);
                    user = req.user;
                    return [4 /*yield*/, meeting_1.findMeeting({
                            _id: req.params.meetingId,
                            employeeId: user._id,
                            employeeConfirmed: false,
                            meetingStatus: meetingStatus_1.default.Pending,
                        })];
                case 3:
                    meeting = _a.sent();
                    if (!meeting) {
                        throw new customError_1.default("Bad Request", 404, "No such meeting found or meeting already completed");
                    }
                    if (!meeting.meetingEndTime) {
                        throw new customError_1.default("Bad Request", 404, "End time is not defined by admin");
                    }
                    index = meeting.employeeHistory.findIndex(function (value) { return value.status == meeting_2.MeetingEmployeeAction.Pending; });
                    meeting.employeeHistory[index].status = meeting_2.MeetingEmployeeAction.Approved;
                    meeting.employeeConfirmed = true;
                    user.schdule.push({
                        startTime: meeting.meetingStartTime,
                        endTime: meeting.meetingEndTime,
                        meetingId: meeting._id,
                    });
                    return [4 /*yield*/, meeting.save()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, user.save()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, session.commitTransaction()];
                case 6:
                    _a.sent();
                    res.send({ message: "meeting is confirmed by you" });
                    return [3 /*break*/, 9];
                case 7:
                    error_18 = _a.sent();
                    return [4 /*yield*/, session.abortTransaction()];
                case 8:
                    _a.sent();
                    checkErrors_1.default(error_18, res);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.commitMeetingHandler = commitMeetingHandler;
function abortMeetingHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var session, _a, meetingId, comment, user, meeting_3, index, error_19;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, mongoose_1.default.startSession()];
                case 1:
                    session = _b.sent();
                    session.startTransaction();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 7, , 9]);
                    _a = req.body, meetingId = _a.meetingId, comment = _a.comment;
                    user = req.user;
                    return [4 /*yield*/, meeting_1.findMeeting({
                            _id: meetingId,
                            employeeId: user._id,
                            employeeConfirmed: true,
                            meetingStatus: meetingStatus_1.default.Pending,
                        })];
                case 3:
                    meeting_3 = _b.sent();
                    if (!meeting_3) {
                        throw new customError_1.default("Bad Request", 404, "No such meeting found or meeting already completed");
                    }
                    index = meeting_3.employeeHistory.findIndex(function (value) { return value.status == meeting_2.MeetingEmployeeAction.Pending; });
                    meeting_3.employeeHistory[index].status = meeting_2.MeetingEmployeeAction.Declined;
                    meeting_3.employeeHistory[index].reason = comment;
                    meeting_3.employeeConfirmed = false;
                    user.schdule = user.schdule.filter(function (value) { return !value.meetingId.equals(meeting_3._id); });
                    return [4 /*yield*/, meeting_3.save()];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, user.save()];
                case 5:
                    _b.sent();
                    return [4 /*yield*/, session.commitTransaction()];
                case 6:
                    _b.sent();
                    res.send({ message: "meeting is confirmed by you" });
                    return [3 /*break*/, 9];
                case 7:
                    error_19 = _b.sent();
                    return [4 /*yield*/, session.abortTransaction()];
                case 8:
                    _b.sent();
                    checkErrors_1.default(error_19, res);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.abortMeetingHandler = abortMeetingHandler;
function employeeConnectMeetingHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, meetingId, meeting, token, err_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    user = req.user;
                    meetingId = req.body.meetingId;
                    return [4 /*yield*/, meeting_1.findMeeting({
                            _id: meetingId,
                            // employeeId: user._id,
                            mode: meetingMode_1.default.Online,
                        })];
                case 1:
                    meeting = _a.sent();
                    if (!meeting) {
                        throw new customError_1.default("Bad Request", 404, "No such meeting found");
                    }
                    token = agora_access_token_1.RtcTokenBuilder.buildTokenWithUid(process.env.AGORA_ID, process.env.AGORA_CERTIFICATE, meeting._id.toString(), req.body.userId, agora_access_token_1.RtcRole.PUBLISHER, Math.floor(Date.now() / 1000) + 3600);
                    // return the token
                    return [2 /*return*/, res.json({ token: token })];
                case 2:
                    err_8 = _a.sent();
                    checkErrors_1.default(err_8, res);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.employeeConnectMeetingHandler = employeeConnectMeetingHandler;

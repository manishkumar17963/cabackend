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
exports.adminConnectMeetingHandler = exports.updateEmployeeSickHandler = exports.addEmployeeSickHandler = exports.assignPrimaryEmployeeHandler = exports.deleteTemplateHandler = exports.createBranchHandler = exports.createTemplateHandler = exports.stopAttendanceHandler = exports.startAttendanceHandler = exports.removeHolidayHandler = exports.addHolidayHandler = exports.completeMeetingHandler = exports.declineMeetingHandler = exports.updateEmployeeMeetingHandler = exports.requestMeetingHandler = exports.toggleApprovalAttendanceHandler = exports.updateTaskHandler = exports.denyHolidayHandler = exports.approveHolidayHandler = exports.addCommentHandler = exports.changePaymentStatusManuallyHandler = exports.addInvoiceHandler = exports.addQuotationHandler = exports.updateStatusHandler = exports.declinedProjectHandler = exports.completeProjectHandler = exports.declinedTaskHandler = exports.removeEmployeeFromProjectHandler = exports.removeEmployeeFromTaskHandler = exports.assignTaskToEmployeeHandler = exports.createTaskCustomerHandler = exports.changePrimaryEmployeeHandler = exports.updateProjectHandler = exports.createProjectForCustomerHandler = exports.assignEmployeeToCustomerHandler = exports.getStatusHandler = exports.logoutAdminHandler = exports.loginAdminHandler = exports.verifyForgotOtpHandler = exports.forgotPasswordHandler = exports.verifyAdminHandler = exports.createAdminHandler = void 0;
var checkErrors_1 = __importDefault(require("../helpers/checkErrors"));
var customError_1 = __importDefault(require("../helpers/customError"));
var agora_access_token_1 = require("agora-access-token");
var admin_1 = require("../services/admin");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var mongoose_1 = __importDefault(require("mongoose"));
var customer_1 = require("../services/customer");
var employee_1 = require("../services/employee");
var task_1 = require("../services/task");
var taskStatus_1 = __importDefault(require("../enums/taskStatus"));
var moment_1 = __importDefault(require("moment"));
var paymentStatus_1 = __importDefault(require("../enums/paymentStatus"));
var paymentMethod_1 = __importDefault(require("../enums/paymentMethod"));
var comment_1 = require("../services/comment");
var sendBy_1 = __importDefault(require("../enums/sendBy"));
var holiday_1 = require("../services/holiday");
var holidayStatus_1 = __importDefault(require("../enums/holidayStatus"));
var attendance_1 = require("../services/attendance");
var meetingMode_1 = __importDefault(require("../enums/meetingMode"));
var assignmentValidity_1 = __importDefault(require("../helpers/assignmentValidity"));
var meeting_1 = require("../services/meeting");
var meetingStatus_1 = __importDefault(require("../enums/meetingStatus"));
var attendance_2 = __importDefault(require("../models/attendance"));
var attendanceType_1 = __importDefault(require("../enums/attendanceType"));
var project_Service_1 = require("../services/project.Service");
var sendOtp_1 = require("../helpers/sendOtp");
var quotation_Service_1 = require("../services/quotation.Service");
var quotationRel_1 = __importDefault(require("../enums/quotationRel"));
var quotationType_enum_1 = __importDefault(require("../enums/quotationType.enum"));
var branch_service_1 = require("../services/branch.service");
var invoice_service_1 = require("../services/invoice.service");
var template_service_1 = require("../services/template.service");
var conversation_model_1 = __importDefault(require("../models/conversation.model"));
var conversationType_1 = __importDefault(require("../enums/conversationType"));
var conversation_service_1 = require("../services/conversation.service");
var meeting_2 = require("../models/meeting");
var admin_2 = require("../socketHandlers/admin");
var role_1 = __importDefault(require("../enums/role"));
function createAdminHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var code, phone, admin, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    code = Math.round(Math.random() * 8999 + 1000);
                    phone = req.body.number;
                    return [4 /*yield*/, admin_1.findAdmin({ _id: phone })];
                case 1:
                    admin = _a.sent();
                    if (admin && !admin.codeValid) {
                        throw new customError_1.default("Bad Request", 404, "Admin already exist");
                    }
                    return [4 /*yield*/, sendOtp_1.SendOtp(code)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, admin_1.createAdmin(__assign(__assign({}, req.body), { code: code, codeValid: true }))];
                case 3:
                    _a.sent();
                    res.status(201).send({
                        message: "we send you a otp please enter here to verify your number",
                    });
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    checkErrors_1.default(err_1, res);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.createAdminHandler = createAdminHandler;
function verifyAdminHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var admin, token, conversation, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    console.log(req.body);
                    return [4 /*yield*/, admin_1.findAndUpdateAdmin({ _id: req.body.number, codeValid: true, code: req.body.code }, { $set: { codeValid: false } }, {})];
                case 1:
                    admin = _a.sent();
                    console.log(admin);
                    if (!admin) {
                        throw new customError_1.default("Bad credentials", 400, "please provide valid otp");
                    }
                    return [4 /*yield*/, admin.generateAuthToken(req.body.webToken)];
                case 2:
                    token = _a.sent();
                    return [4 /*yield*/, conversation_service_1.updateAllConversation({
                            conversationType: {
                                $in: [conversationType_1.default.Group, conversationType_1.default.Project],
                            },
                        }, {
                            $addToSet: {
                                participants: {
                                    id: admin._id,
                                    participantType: sendBy_1.default.Employee,
                                    participantName: admin.username,
                                    participantProfile: admin.profileUri,
                                },
                            },
                        }, {})];
                case 3:
                    conversation = _a.sent();
                    res.status(200).send({ admin: admin, token: token });
                    return [3 /*break*/, 5];
                case 4:
                    err_2 = _a.sent();
                    checkErrors_1.default(err_2, res);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.verifyAdminHandler = verifyAdminHandler;
function forgotPasswordHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var code, phone, admin, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    code = Math.round(Math.random() * 8999 + 1000);
                    phone = req.body.number;
                    return [4 /*yield*/, admin_1.findAndUpdateAdmin({ _id: phone }, { $set: { forgotOtp: code } }, {})];
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
                    return [4 /*yield*/, admin_1.findAdmin({
                            _id: req.body.number,
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
function loginAdminHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var admin, token, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, admin_1.validatePassword(req.body)];
                case 1:
                    admin = _a.sent();
                    if (!admin) {
                        throw new customError_1.default("Bad request", 404, "Please Provide Right Credientials");
                    }
                    return [4 /*yield*/, admin.generateAuthToken(req.body.webToken)];
                case 2:
                    token = _a.sent();
                    // res.cookie("jwt", "manish", { httpOnly: true });
                    res.send({ admin: admin, token: token });
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
exports.loginAdminHandler = loginAdminHandler;
function logoutAdminHandler(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var token, decoded, admin;
        return __generator(this, function (_b) {
            try {
                token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
                console.log("token", token);
                if (!token) {
                    throw new customError_1.default("Bad request", 401, "Please Authenticate first");
                }
                decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                admin = admin_1.findAndUpdateAdmin({
                    _id: decoded._id,
                    "tokens.token": token,
                }, {
                    $pull: {
                        webToken: { token: token },
                        tokens: { token: token },
                    },
                }, {});
                if (!admin) {
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
exports.logoutAdminHandler = logoutAdminHandler;
function getStatusHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                res.send(req.user);
            }
            catch (err) {
                checkErrors_1.default(err, res);
            }
            return [2 /*return*/];
        });
    });
}
exports.getStatusHandler = getStatusHandler;
function assignEmployeeToCustomerHandler(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var _b, customerId, employeeId, customer, employee, conversation, participants, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 9, , 10]);
                    _b = req.body, customerId = _b.customerId, employeeId = _b.employeeId;
                    return [4 /*yield*/, customer_1.findCustomer({ _id: customerId }, { username: 1, number: 1, companyName: 1, profileUri: 1 })];
                case 1:
                    customer = _c.sent();
                    if (!customer) {
                        throw new customError_1.default("Bad Request", 404, "No such customer found");
                    }
                    return [4 /*yield*/, employee_1.findEmployee({ _id: employeeId })];
                case 2:
                    employee = _c.sent();
                    if (!employee) {
                        throw new customError_1.default("Bad Request", 404, "No such employee found");
                    }
                    return [4 /*yield*/, conversation_service_1.findConversation({
                            conversationType: conversationType_1.default.Primary,
                            "participants.id": customer._id.toString(),
                        })];
                case 3:
                    conversation = _c.sent();
                    if (customer.assignedEmployee && conversation) {
                        admin_2.deleteConversationHandler([conversation._id], customer.assignedEmployee);
                    }
                    customer.assignedEmployee = employeeId;
                    participants = [
                        {
                            participantName: customer.companyName,
                            participantType: sendBy_1.default.Customer,
                            participantProfile: customer.profileUri,
                            id: (_a = customer._id) === null || _a === void 0 ? void 0 : _a.toString(),
                        },
                        {
                            participantName: employee.username,
                            participantType: sendBy_1.default.Employee,
                            participantProfile: employee === null || employee === void 0 ? void 0 : employee.profileUri,
                            id: employeeId,
                        },
                    ];
                    if (!conversation) return [3 /*break*/, 5];
                    conversation.participants = participants;
                    return [4 /*yield*/, conversation.save()];
                case 4:
                    _c.sent();
                    return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, conversation_service_1.createConversation({
                        conversationType: conversationType_1.default.Primary,
                        participants: participants,
                    })];
                case 6:
                    conversation = _c.sent();
                    _c.label = 7;
                case 7:
                    admin_2.updateConversationHandler([conversation]);
                    return [4 /*yield*/, customer.save()];
                case 8:
                    _c.sent();
                    res.send({
                        message: "Employee with name " + employee.username + " is assigned to customer with name " + customer.firstname + " and number " + customer.number,
                    });
                    return [3 /*break*/, 10];
                case 9:
                    error_1 = _c.sent();
                    checkErrors_1.default(error_1, res);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.assignEmployeeToCustomerHandler = assignEmployeeToCustomerHandler;
function createProjectForCustomerHandler(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var session, _b, customerId, services, employeeId, projectName, billingType, priority, startDate, expectedEndDate, description, customer, primaryEmployee, input, project, admins, participants, conversations, conversation, error_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, mongoose_1.default.startSession()];
                case 1:
                    session = _c.sent();
                    session.startTransaction();
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 10, , 12]);
                    _b = req.body, customerId = _b.customerId, services = _b.services, employeeId = _b.employeeId, projectName = _b.projectName, billingType = _b.billingType, priority = _b.priority, startDate = _b.startDate, expectedEndDate = _b.expectedEndDate, description = _b.description;
                    return [4 /*yield*/, customer_1.findCustomer({ _id: customerId }, { username: 1, number: 1, companyName: 1 }, { session: session })];
                case 3:
                    customer = _c.sent();
                    if (!customer) {
                        throw new customError_1.default("Bad Request", 404, "No such customer found");
                    }
                    primaryEmployee = null;
                    if (!employeeId) return [3 /*break*/, 5];
                    return [4 /*yield*/, employee_1.findEmployee({ _id: employeeId }, {}, { session: session })];
                case 4:
                    primaryEmployee = _c.sent();
                    if (!primaryEmployee) {
                        throw new customError_1.default("Bad Request", 404, "No such employee found");
                    }
                    _c.label = 5;
                case 5:
                    input = {
                        customerId: customerId,
                        name: projectName,
                        primaryEmployee: employeeId,
                        assignedEmployees: employeeId
                            ? [{ role: role_1.default.Primary, employeeId: employeeId, taskCount: 0 }]
                            : [],
                        priority: priority,
                        billingType: billingType,
                        startDate: moment_1.default(startDate).toDate(),
                        expectedEndDate: moment_1.default(expectedEndDate).toDate(),
                        description: description,
                        status: taskStatus_1.default.Initiated,
                        adminApproved: true,
                        clientApproved: false,
                        services: [],
                    };
                    return [4 /*yield*/, project_Service_1.createProject(input)];
                case 6:
                    project = _c.sent();
                    return [4 /*yield*/, admin_1.findAllAdmin({}, {}, { session: session })];
                case 7:
                    admins = _c.sent();
                    participants = admins.map(function (value) { return ({
                        id: value._id,
                        participantType: sendBy_1.default.Admin,
                        participantName: value.username,
                        participantProfile: value.profileUri,
                    }); });
                    if (primaryEmployee) {
                        participants.push({
                            id: primaryEmployee._id,
                            participantType: sendBy_1.default.Employee,
                            participantName: primaryEmployee.username,
                            participantProfile: primaryEmployee.profileUri,
                        });
                    }
                    conversations = [
                        {
                            participants: __spreadArrays(participants, [
                                {
                                    id: (_a = customer._id) === null || _a === void 0 ? void 0 : _a.toString(),
                                    participantType: sendBy_1.default.Customer,
                                    participantName: customer.companyName,
                                    participantProfile: customer.profileUri,
                                },
                            ]),
                            _id: new mongoose_1.default.Types.ObjectId(),
                            projectId: project._id,
                            projectName: project.name,
                            conversationType: conversationType_1.default.Project,
                        },
                        {
                            participants: participants,
                            projectId: project._id,
                            projectName: project.name,
                            _id: new mongoose_1.default.Types.ObjectId(),
                            conversationType: conversationType_1.default.Group,
                        },
                    ];
                    return [4 /*yield*/, conversation_model_1.default.insertMany(conversations, {
                            session: session,
                        })];
                case 8:
                    conversation = _c.sent();
                    return [4 /*yield*/, session.commitTransaction()];
                case 9:
                    _c.sent();
                    admin_2.addProjectHandler(project, primaryEmployee == null ? undefined : primaryEmployee);
                    admin_2.sendConversationHandler(conversations);
                    res.send({
                        message: "one project created",
                    });
                    return [3 /*break*/, 12];
                case 10:
                    error_2 = _c.sent();
                    return [4 /*yield*/, session.abortTransaction()];
                case 11:
                    _c.sent();
                    checkErrors_1.default(error_2, res);
                    return [3 /*break*/, 12];
                case 12: return [2 /*return*/];
            }
        });
    });
}
exports.createProjectForCustomerHandler = createProjectForCustomerHandler;
function updateProjectHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, projectId, name_1, billingType, priority, startDate, expectedEndDate, description, project, error_3;
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
                    error_3 = _b.sent();
                    checkErrors_1.default(error_3, res);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updateProjectHandler = updateProjectHandler;
function changePrimaryEmployeeHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var session, _a, employeeId_1, projectId, project_1, employee, primaryConversation, index_1, conversationIds, groupConversation, index, conversations, groupConversation, err_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, mongoose_1.default.startSession()];
                case 1:
                    session = _b.sent();
                    session.startTransaction();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 16, , 18]);
                    _a = req.body, employeeId_1 = _a.employeeId, projectId = _a.projectId;
                    return [4 /*yield*/, project_Service_1.findProject({ _id: projectId })];
                case 3:
                    project_1 = _b.sent();
                    if (!project_1) {
                        throw new customError_1.default("Bad request", 404, "No such project found");
                    }
                    return [4 /*yield*/, employee_1.findEmployee({ _id: employeeId_1 })];
                case 4:
                    employee = _b.sent();
                    if (!employee) {
                        throw new customError_1.default("Bad request", 404, "No such employee found");
                    }
                    return [4 /*yield*/, conversation_service_1.findAndUpdateConversation({
                            projectId: projectId,
                            conversationType: conversationType_1.default.Project,
                        }, {
                            $pull: { participants: { id: project_1.primaryEmployee } },
                        }, { session: session })];
                case 5:
                    primaryConversation = _b.sent();
                    console.log("primary", primaryConversation);
                    if (!primaryConversation) {
                        throw new customError_1.default("Bad Request", 404, "No such conversation found");
                    }
                    primaryConversation.participants.push({
                        id: employee._id,
                        participantType: sendBy_1.default.Employee,
                        participantName: employee.username,
                        participantProfile: employee.profileUri,
                    });
                    return [4 /*yield*/, primaryConversation.save()];
                case 6:
                    _b.sent();
                    if (!project_1.primaryEmployee) return [3 /*break*/, 10];
                    index_1 = project_1.assignedEmployees.findIndex(function (value) { return value.employeeId == project_1.primaryEmployee; });
                    if (!(index_1 > -1)) return [3 /*break*/, 10];
                    conversationIds = [primaryConversation._id];
                    if (!(project_1.assignedEmployees[index_1].taskCount >= 1)) return [3 /*break*/, 7];
                    project_1.assignedEmployees[index_1].role = role_1.default.Secondary;
                    return [3 /*break*/, 9];
                case 7:
                    project_1.assignedEmployees.splice(index_1, 1);
                    admin_2.deleteSocketProjectHandler(project_1.primaryEmployee, project_1._id);
                    return [4 /*yield*/, conversation_service_1.findAndUpdateConversation({
                            projectId: projectId,
                            conversationType: conversationType_1.default.Group,
                        }, {
                            $pull: { participants: { id: project_1.primaryEmployee } },
                        }, { session: session })];
                case 8:
                    groupConversation = _b.sent();
                    if (groupConversation) {
                        conversationIds.push(groupConversation._id);
                    }
                    _b.label = 9;
                case 9:
                    admin_2.deleteConversationHandler(conversationIds, project_1.primaryEmployee);
                    _b.label = 10;
                case 10:
                    index = project_1.assignedEmployees.findIndex(function (value) { return value.employeeId == employeeId_1; });
                    conversations = [primaryConversation];
                    if (!(index <= -1)) return [3 /*break*/, 12];
                    project_1.assignedEmployees.push({
                        employeeId: employeeId_1,
                        role: role_1.default.Primary,
                        taskCount: 1,
                    });
                    admin_2.addSocketProjectHandler(employeeId_1, project_1, employee, true);
                    return [4 /*yield*/, conversation_service_1.findAndUpdateConversation({
                            projectId: projectId,
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
                        }, { session: session })];
                case 11:
                    groupConversation = _b.sent();
                    if (groupConversation) {
                        conversations.push(groupConversation);
                    }
                    return [3 /*break*/, 13];
                case 12:
                    project_1.assignedEmployees[index].taskCount += 1;
                    project_1.assignedEmployees[index].role = role_1.default.Primary;
                    _b.label = 13;
                case 13:
                    admin_2.addConversationHandler(conversations, [employeeId_1]);
                    project_1.primaryEmployee = employeeId_1;
                    return [4 /*yield*/, project_1.save()];
                case 14:
                    _b.sent();
                    admin_2.updateSocketProjectPrimaryEmployee(project_1, employee);
                    return [4 /*yield*/, session.commitTransaction()];
                case 15:
                    _b.sent();
                    res.send({ message: "employee successfully saved" });
                    return [3 /*break*/, 18];
                case 16:
                    err_6 = _b.sent();
                    return [4 /*yield*/, session.abortTransaction()];
                case 17:
                    _b.sent();
                    checkErrors_1.default(err_6, res);
                    return [3 /*break*/, 18];
                case 18: return [2 /*return*/];
            }
        });
    });
}
exports.changePrimaryEmployeeHandler = changePrimaryEmployeeHandler;
function createTaskCustomerHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var session, user, _a, employeeId_2, description, name_2, expectedEndDate, projectId, priority, project, employee, index, conversation, primaryEmployee, input, task, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, mongoose_1.default.startSession()];
                case 1:
                    session = _b.sent();
                    session.startTransaction();
                    user = req.user;
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 14, , 16]);
                    _a = req.body, employeeId_2 = _a.employeeId, description = _a.description, name_2 = _a.name, expectedEndDate = _a.expectedEndDate, projectId = _a.projectId, priority = _a.priority;
                    return [4 /*yield*/, project_Service_1.findAndUpdateProject({
                            _id: projectId,
                            status: { $in: [taskStatus_1.default.Initiated, taskStatus_1.default.Ongoing] },
                        }, { $set: { status: taskStatus_1.default.Ongoing } }, { session: session })];
                case 3:
                    project = _b.sent();
                    if (!project) {
                        throw new customError_1.default("Bad Request", 404, "No such project found");
                    }
                    if (!project.clientApproved) {
                        throw new customError_1.default("Bad Request", 404, "client doesnot approve quotation yet");
                    }
                    if (!project.adminApproved) {
                        throw new customError_1.default("Bad Request", 404, "please first send the quotation to customer");
                    }
                    employee = null;
                    if (!employeeId_2) return [3 /*break*/, 11];
                    return [4 /*yield*/, employee_1.findEmployee({ _id: employeeId_2 })];
                case 4:
                    employee = _b.sent();
                    if (!employee) {
                        throw new customError_1.default("Bad Request", 404, "No such employee found");
                    }
                    index = project.assignedEmployees.findIndex(function (value) { return value.employeeId == employeeId_2; });
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
                        employeeId: employeeId_2,
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
                    admin_2.addSocketProjectHandler(employeeId_2, project, primaryEmployee);
                    if (conversation) {
                        admin_2.addConversationHandler([conversation], [employeeId_2]);
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
                        assignedEmployee: employeeId_2,
                        priority: priority,
                        previousEmployee: employeeId_2
                            ? [
                                {
                                    assignedBy: user.username,
                                    id: employeeId_2,
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
                    error_4 = _b.sent();
                    return [4 /*yield*/, session.abortTransaction()];
                case 15:
                    _b.sent();
                    checkErrors_1.default(error_4, res);
                    return [3 /*break*/, 16];
                case 16: return [2 /*return*/];
            }
        });
    });
}
exports.createTaskCustomerHandler = createTaskCustomerHandler;
function assignTaskToEmployeeHandler(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var _b, taskId, employeeId_3, user, employee, task_2, project, conversation, index_2, date, index, error_5;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 7, , 8]);
                    _b = req.body, taskId = _b.taskId, employeeId_3 = _b.employeeId;
                    user = req.user;
                    return [4 /*yield*/, employee_1.findEmployee({ _id: employeeId_3 })];
                case 1:
                    employee = _c.sent();
                    if (!employee) {
                        throw new customError_1.default("Bad Request", 404, "No such employee found");
                    }
                    return [4 /*yield*/, task_1.findTask({
                            _id: taskId,
                            status: { $nin: [taskStatus_1.default.Completed, taskStatus_1.default.Declined] },
                        })];
                case 2:
                    task_2 = _c.sent();
                    if (!task_2) {
                        throw new customError_1.default("Bad Request", 404, "No such task found or task completed or task declined");
                    }
                    if (task_2.assignedEmployee == employeeId_3) {
                        throw new customError_1.default("Bad Request", 404, "This employee is already assigned to this task");
                    }
                    return [4 /*yield*/, project_Service_1.findProject({ _id: task_2.projectId })];
                case 3:
                    project = _c.sent();
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
                    conversation = _c.sent();
                    if (!conversation) {
                        throw new customError_1.default("Bad Request", 404, "No such conversation found");
                    }
                    if (task_2.assignedEmployee) {
                        index_2 = project.assignedEmployees.findIndex(function (value) { return value.employeeId == task_2.assignedEmployee; });
                        if (index_2 > -1) {
                            if (project.assignedEmployees[index_2].taskCount <= 1) {
                                if (project.assignedEmployees[index_2].role == role_1.default.Primary) {
                                    project.assignedEmployees[index_2].taskCount -= 1;
                                }
                                else {
                                    project.assignedEmployees.splice(index_2, 1);
                                    admin_2.deleteSocketProjectHandler(task_2.assignedEmployee, project._id);
                                    if (conversation) {
                                        admin_2.deleteConversationHandler([conversation._id], task_2.assignedEmployee);
                                    }
                                }
                            }
                            else {
                                project.assignedEmployees[index_2].taskCount -= 1;
                            }
                        }
                    }
                    date = new Date();
                    if (task_2.previousEmployee.length > 0) {
                        task_2.previousEmployee[0].removedBy = user._id;
                        task_2.previousEmployee[0].removedDate = date;
                    }
                    task_2.assignedEmployee = employeeId_3;
                    task_2.status = taskStatus_1.default.Ongoing;
                    console.log("some new ", {
                        assignedBy: user._id,
                        assignedDate: date,
                        id: employeeId_3,
                        username: employee.username,
                        profileUri: employee.profileUri,
                    });
                    task_2.previousEmployee = __spreadArrays([
                        {
                            assignedBy: user._id,
                            assignedDate: date,
                            id: employeeId_3,
                            username: employee.username,
                            profileUri: employee.profileUri,
                        }
                    ], task_2.previousEmployee);
                    console.log("task", task_2);
                    index = project.assignedEmployees.findIndex(function (value) { return value.employeeId == employeeId_3; });
                    if (index == -1) {
                        project.assignedEmployees.push({
                            employeeId: employeeId_3,
                            role: role_1.default.Secondary,
                            taskCount: 1,
                        });
                        admin_2.addConversationHandler([conversation], [employeeId_3]);
                        admin_2.addSocketProjectHandler(employeeId_3, project);
                    }
                    else {
                        project.assignedEmployees[index].taskCount += 1;
                    }
                    return [4 /*yield*/, project.save()];
                case 5:
                    _c.sent();
                    return [4 /*yield*/, task_2.save()];
                case 6:
                    _c.sent();
                    res.send({
                        message: "task with name " + ((_a = task_2.description) !== null && _a !== void 0 ? _a : "nothing") + " assigned to employee with name " + employee.username,
                    });
                    return [3 /*break*/, 8];
                case 7:
                    error_5 = _c.sent();
                    checkErrors_1.default(error_5, res);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.assignTaskToEmployeeHandler = assignTaskToEmployeeHandler;
function removeEmployeeFromTaskHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var session, user, task_3, project, conversation, index, err_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mongoose_1.default.startSession()];
                case 1:
                    session = _a.sent();
                    session.startTransaction();
                    user = req.user;
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 13, , 15]);
                    return [4 /*yield*/, task_1.findAndUpdateTask({
                            _id: req.params.taskId,
                            status: { $nin: [taskStatus_1.default.Completed, taskStatus_1.default.Declined] },
                        }, { $unset: { assignedEmployee: "" } }, { session: session })];
                case 3:
                    task_3 = _a.sent();
                    if (!task_3) {
                        throw new customError_1.default("Bad Request", 404, "No such task found with this id or task completed or declined");
                    }
                    return [4 /*yield*/, project_Service_1.findProject({ _id: task_3.projectId })];
                case 4:
                    project = _a.sent();
                    if (!project) {
                        throw new customError_1.default("Bad Request", 404, "No such project found");
                    }
                    if (!task_3.assignedEmployee) return [3 /*break*/, 10];
                    return [4 /*yield*/, conversation_service_1.findAndUpdateConversation({
                            projectId: task_3 === null || task_3 === void 0 ? void 0 : task_3.projectId,
                            conversationType: conversationType_1.default.Group,
                        }, {
                            $pull: {
                                participants: {
                                    id: task_3.assignedEmployee,
                                },
                            },
                        }, { session: session })];
                case 5:
                    conversation = _a.sent();
                    index = project.assignedEmployees.findIndex(function (value) { return value.employeeId == task_3.assignedEmployee; });
                    if (!(index > -1)) return [3 /*break*/, 7];
                    if (project.assignedEmployees[index].taskCount <= 1) {
                        if (project.assignedEmployees[index].role == role_1.default.Primary) {
                            project.assignedEmployees[index].taskCount -= 1;
                        }
                        else {
                            project.assignedEmployees.splice(index, 1);
                            admin_2.deleteSocketProjectHandler(task_3.assignedEmployee, project._id);
                            if (conversation) {
                                admin_2.deleteConversationHandler([conversation._id], task_3.assignedEmployee);
                            }
                        }
                    }
                    else {
                        project.assignedEmployees[index].taskCount -= 1;
                    }
                    return [4 /*yield*/, project.save()];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    if (!(task_3.previousEmployee.length > 0)) return [3 /*break*/, 9];
                    task_3.previousEmployee[0].removedBy = user._id;
                    task_3.previousEmployee[0].removedDate = new Date();
                    return [4 /*yield*/, task_3.save()];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10: throw new customError_1.default("Bad Request", 404, "No employee assigned yet");
                case 11: return [4 /*yield*/, session.commitTransaction()];
                case 12:
                    _a.sent();
                    res.send({ message: "Employee remove successfully" });
                    return [3 /*break*/, 15];
                case 13:
                    err_7 = _a.sent();
                    return [4 /*yield*/, session.abortTransaction()];
                case 14:
                    _a.sent();
                    checkErrors_1.default(err_7, res);
                    return [3 /*break*/, 15];
                case 15: return [2 /*return*/];
            }
        });
    });
}
exports.removeEmployeeFromTaskHandler = removeEmployeeFromTaskHandler;
function removeEmployeeFromProjectHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var session, user, project_2, index, err_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mongoose_1.default.startSession()];
                case 1:
                    session = _a.sent();
                    session.startTransaction();
                    user = req.user;
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 8, , 10]);
                    return [4 /*yield*/, project_Service_1.findAndUpdateProject({
                            _id: req.params.projectId,
                            primaryEmployee: { $exists: true },
                            status: { $nin: [taskStatus_1.default.Completed, taskStatus_1.default.Declined] },
                        }, { $unset: { primaryEmployee: "" } }, { session: session })];
                case 3:
                    project_2 = _a.sent();
                    if (!project_2) {
                        throw new customError_1.default("Bad Request", 404, "No such project found with this id or project completed or declined or there is no alloted employee");
                    }
                    if (!project_2.primaryEmployee) return [3 /*break*/, 5];
                    return [4 /*yield*/, conversation_service_1.updateAllConversation({
                            projectId: project_2._id,
                        }, { $pull: { participants: { id: project_2.primaryEmployee } } }, { session: session })];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    index = project_2.assignedEmployees.findIndex(function (value) { return value.employeeId == project_2.primaryEmployee; });
                    if (!(index > -1)) return [3 /*break*/, 7];
                    if (project_2.assignedEmployees[index].taskCount > 0) {
                        project_2.assignedEmployees[index].role = role_1.default.Secondary;
                    }
                    else {
                        project_2.assignedEmployees.splice(index, 1);
                    }
                    return [4 /*yield*/, project_2.save()];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    res.send({ message: "Primary Employee remove successfully" });
                    return [3 /*break*/, 10];
                case 8:
                    err_8 = _a.sent();
                    return [4 /*yield*/, session.abortTransaction()];
                case 9:
                    _a.sent();
                    checkErrors_1.default(err_8, res);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.removeEmployeeFromProjectHandler = removeEmployeeFromProjectHandler;
function declinedTaskHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var task, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, task_1.findAndUpdateTask({
                            _id: req.params.taskId,
                            status: { $nin: [taskStatus_1.default.Completed, taskStatus_1.default.Declined] },
                        }, { $set: { status: taskStatus_1.default.Declined } }, { new: true })];
                case 1:
                    task = _a.sent();
                    if (!task) {
                        throw new customError_1.default("Bad Request", 404, "No such task found or task completed or task already declined");
                    }
                    res.send({ message: "task with " + task.description + " declined by you" });
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
function completeProjectHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var project, customer, notificationMessage, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, project_Service_1.findProject({
                            _id: req.body.projectId,
                            status: { $nin: [taskStatus_1.default.Declined] },
                            paymentStatus: { $ne: paymentStatus_1.default.Paid },
                        })];
                case 1:
                    project = _a.sent();
                    if (!project) {
                        throw new customError_1.default("Bad Request", 404, "No such project found or project already declined");
                    }
                    return [4 /*yield*/, customer_1.findCustomer({ _id: project.customerId })];
                case 2:
                    customer = _a.sent();
                    project.status = taskStatus_1.default.Completed;
                    notificationMessage = "hey " + (customer === null || customer === void 0 ? void 0 : customer.firstname) + ",your task " + project.description + " is completed.";
                    return [4 /*yield*/, project.save()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, admin_2.updateProjectStatusHandler(project, req.body)];
                case 4:
                    _a.sent();
                    res.send({ message: "project " + project.description + " is completed" });
                    return [3 /*break*/, 6];
                case 5:
                    error_7 = _a.sent();
                    checkErrors_1.default(error_7, res);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.completeProjectHandler = completeProjectHandler;
function declinedProjectHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var task, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, project_Service_1.findAndUpdateProject({
                            _id: req.body.projectId,
                            status: { $nin: [taskStatus_1.default.Completed, taskStatus_1.default.Declined] },
                        }, { $set: { status: taskStatus_1.default.Declined } }, { new: true })];
                case 1:
                    task = _a.sent();
                    if (!task) {
                        throw new customError_1.default("Bad Request", 404, "No such task found or task completed or task already declined");
                    }
                    return [4 /*yield*/, admin_2.updateProjectStatusHandler(task, req.body)];
                case 2:
                    _a.sent();
                    res.send({ message: "task with " + task.description + " declined by you" });
                    return [3 /*break*/, 4];
                case 3:
                    error_8 = _a.sent();
                    checkErrors_1.default(error_8, res);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.declinedProjectHandler = declinedProjectHandler;
function updateStatusHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var project, error_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, project_Service_1.findAndUpdateProject({
                            _id: req.body.projectId,
                            status: { $nin: [taskStatus_1.default.Completed, taskStatus_1.default.Declined] },
                        }, { $set: { status: req.body.status } }, { new: true })];
                case 1:
                    project = _a.sent();
                    console.log("project", project);
                    if (!project) {
                        throw new customError_1.default("Bad Request", 404, "No such project found or project completed or project already declined");
                    }
                    return [4 /*yield*/, admin_2.updateProjectStatusHandler(project, req.body)];
                case 2:
                    _a.sent();
                    res.send({ message: "project with " + project.description + " status updated" });
                    return [3 /*break*/, 4];
                case 3:
                    error_9 = _a.sent();
                    checkErrors_1.default(error_9, res);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateStatusHandler = updateStatusHandler;
function addQuotationHandler(req, res) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var session, project, quotation, quotationNo, branch, quotationInput, newQuotation, customer, notificationMessage, err_9;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, mongoose_1.default.startSession()];
                case 1:
                    session = _d.sent();
                    session.startTransaction();
                    _d.label = 2;
                case 2:
                    _d.trys.push([2, 16, , 18]);
                    return [4 /*yield*/, project_Service_1.findProject({
                            _id: req.body.projectId,
                            status: { $nin: [taskStatus_1.default.Declined, taskStatus_1.default.Completed] },
                        }, {}, { session: session })];
                case 3:
                    project = _d.sent();
                    if (!project) {
                        throw new customError_1.default("Bad Request", 404, "No Such project found or project already completed");
                    }
                    return [4 /*yield*/, quotation_Service_1.findQuotation({
                            projectId: project._id,
                            quotationRel: quotationRel_1.default.Parent,
                        }, {}, { session: session })];
                case 4:
                    quotation = _d.sent();
                    quotationNo = quotation === null || quotation === void 0 ? void 0 : quotation.quotationNo;
                    return [4 /*yield*/, branch_service_1.findBranch({ _id: req.body.branchId })];
                case 5:
                    branch = _d.sent();
                    if (!branch) {
                        throw new customError_1.default("Bad Request", 404, "No such branch found");
                    }
                    quotationInput = {
                        projectName: project.name,
                        customerId: project.customerId,
                        projectId: project._id,
                        quotationType: quotationType_enum_1.default.Current,
                        version: ((_a = quotation === null || quotation === void 0 ? void 0 : quotation.runningVersion) !== null && _a !== void 0 ? _a : 0) + 1,
                        quotationRel: quotationRel_1.default.Child,
                        templateId: req.body.templateId,
                        branchId: req.body.branchId,
                        quotationNo: quotationNo && req.body.branchId == (quotation === null || quotation === void 0 ? void 0 : quotation.branchId)
                            ? quotationNo
                            : (branch === null || branch === void 0 ? void 0 : branch.appendId) + (((_b = branch === null || branch === void 0 ? void 0 : branch.quotationNo) !== null && _b !== void 0 ? _b : 0) + 1),
                        details: req.body.details,
                        additionalNotes: req.body.additionalNotes,
                        terms: req.body.terms,
                        approved: false,
                        createdBy: req.id.toString(),
                        services: req.body.services,
                    };
                    if (!!quotation) return [3 /*break*/, 6];
                    quotationInput.quotationRel = quotationRel_1.default.Parent;
                    quotationInput.runningVersion = 1;
                    return [3 /*break*/, 9];
                case 6: return [4 /*yield*/, quotation_Service_1.updateAllQuotation({ projectId: project._id, quotationType: quotationType_enum_1.default.Current }, { $set: { quotationType: quotationType_enum_1.default.OutDated } }, { session: session })];
                case 7:
                    _d.sent();
                    quotation.runningVersion = ((_c = quotation.runningVersion) !== null && _c !== void 0 ? _c : 0) + 1;
                    return [4 /*yield*/, quotation.save()];
                case 8:
                    _d.sent();
                    _d.label = 9;
                case 9: return [4 /*yield*/, quotation_Service_1.createQuotation(quotationInput)];
                case 10:
                    newQuotation = _d.sent();
                    project.quotationId.push(newQuotation._id);
                    project.adminApproved = true;
                    return [4 /*yield*/, project.save()];
                case 11:
                    _d.sent();
                    if (!(!quotationNo || req.body.branchId != (quotation === null || quotation === void 0 ? void 0 : quotation.branchId))) return [3 /*break*/, 13];
                    branch.quotationNo += 1;
                    return [4 /*yield*/, branch.save()];
                case 12:
                    _d.sent();
                    _d.label = 13;
                case 13: return [4 /*yield*/, customer_1.findCustomer({ _id: project.customerId })];
                case 14:
                    customer = _d.sent();
                    notificationMessage = "hey " + (customer === null || customer === void 0 ? void 0 : customer.firstname) + ", New Quotation for project " + project.name + " has been added.";
                    return [4 /*yield*/, session.commitTransaction()];
                case 15:
                    _d.sent();
                    admin_2.addQuotationData(newQuotation, branch);
                    res.send({ message: "New Quotation Added" });
                    return [3 /*break*/, 18];
                case 16:
                    err_9 = _d.sent();
                    return [4 /*yield*/, session.abortTransaction()];
                case 17:
                    _d.sent();
                    checkErrors_1.default(err_9, res);
                    return [3 /*break*/, 18];
                case 18: return [2 /*return*/];
            }
        });
    });
}
exports.addQuotationHandler = addQuotationHandler;
function addInvoiceHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var project, invoice, branch, amount, customer, notificationMessage, err_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 13, , 14]);
                    console.log("body", req.body);
                    return [4 /*yield*/, project_Service_1.findProject({
                            _id: req.body.projectId,
                            paymentStatus: { $ne: paymentStatus_1.default.Paid },
                            status: { $in: [taskStatus_1.default.Completed] },
                        })];
                case 1:
                    project = _a.sent();
                    if (!project) {
                        throw new customError_1.default("Bad Request", 404, "No Such project found or payment already paid");
                    }
                    return [4 /*yield*/, invoice_service_1.findInvoice({
                            projectId: project._id,
                            paymentStatus: paymentStatus_1.default.Unpaid,
                        })];
                case 2:
                    invoice = _a.sent();
                    return [4 /*yield*/, branch_service_1.findBranch({ _id: req.body.branchId })];
                case 3:
                    branch = _a.sent();
                    if (!branch) {
                        throw new customError_1.default("Bad Request", 404, "No such branch found");
                    }
                    amount = req.body.services.reduce(function (total, value) { return total + value.price; }, 0);
                    if (!invoice) return [3 /*break*/, 7];
                    invoice.notes = req.body.notes;
                    if (!(!invoice.branchId == branch._id)) return [3 /*break*/, 5];
                    invoice.branchId = branch._id;
                    invoice.invoiceNo = branch.appendId + (branch.invoiceNo + 1);
                    branch.invoiceNo += 1;
                    return [4 /*yield*/, branch.save()];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    invoice.expectedPaymentDate = moment_1.default(req.body.expectedPaymentDate).toDate();
                    invoice.amount = amount;
                    invoice.createdBy = req.id.toString();
                    invoice.services = req.body.services;
                    return [4 /*yield*/, invoice.save()];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 10];
                case 7: return [4 /*yield*/, invoice_service_1.createInvoice({
                        customerId: project.customerId,
                        projectId: project._id,
                        notes: req.body.notes,
                        branchId: branch._id,
                        projectName: project.name,
                        invoiceNo: branch.appendId + (branch.invoiceNo + 1),
                        amount: amount,
                        expectedPaymentDate: moment_1.default(req.body.expectedPaymentDate).toDate(),
                        paymentStatus: paymentStatus_1.default.Unpaid,
                        createdBy: req.user._id.toString(),
                        services: req.body.services,
                    })];
                case 8:
                    invoice = _a.sent();
                    branch.invoiceNo += 1;
                    return [4 /*yield*/, branch.save()];
                case 9:
                    _a.sent();
                    project.invoiceId = invoice._id;
                    project.paymentInitiated = true;
                    _a.label = 10;
                case 10:
                    project.paymentStatus = paymentStatus_1.default.Unpaid;
                    project.expectedPaymentDate = moment_1.default(req.body.expectedPaymentDate).toDate();
                    project.paymentAmount = amount;
                    return [4 /*yield*/, project.save()];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, customer_1.findCustomer({ _id: project.customerId })];
                case 12:
                    customer = _a.sent();
                    notificationMessage = "hey " + (customer === null || customer === void 0 ? void 0 : customer.firstname) + ",your project " + project.description + " is completed and admin initiate the payment of " + amount + ",please pay before " + moment_1.default(req.body.expectedPaymentDate).format("DD-MM-YYYY");
                    admin_2.addInvoiceData(invoice, branch);
                    res.send({ message: "New invoice Added" });
                    return [3 /*break*/, 14];
                case 13:
                    err_10 = _a.sent();
                    checkErrors_1.default(err_10, res);
                    return [3 /*break*/, 14];
                case 14: return [2 /*return*/];
            }
        });
    });
}
exports.addInvoiceHandler = addInvoiceHandler;
function changePaymentStatusManuallyHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, projectId, paymentMethod, transactionId, actualPaymentDate, project, invoice, customer, notificationMessage, error_10;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    _a = req.body, projectId = _a.projectId, paymentMethod = _a.paymentMethod, transactionId = _a.transactionId, actualPaymentDate = _a.actualPaymentDate;
                    return [4 /*yield*/, project_Service_1.findProject({
                            _id: projectId,
                            status: taskStatus_1.default.Completed,
                            paymentStatus: { $ne: paymentStatus_1.default.Paid },
                            paymentInitiated: true,
                        })];
                case 1:
                    project = _b.sent();
                    return [4 /*yield*/, invoice_service_1.findAndUpdateInvoice({ _id: projectId }, { $set: { actualPaymentDate: actualPaymentDate, paymentStatus: paymentStatus_1.default.Paid } }, {})];
                case 2:
                    invoice = _b.sent();
                    if (!project || !invoice) {
                        throw new customError_1.default("Bad Request", 404, "No such project found or payment not initiated");
                    }
                    return [4 /*yield*/, customer_1.findCustomer({ _id: project.customerId })];
                case 3:
                    customer = _b.sent();
                    project.paymentStatus = paymentStatus_1.default.Paid;
                    project.paymentMethod = paymentMethod;
                    project.actualPaymentDate = actualPaymentDate;
                    if (transactionId && paymentMethod_1.default.Online == paymentMethod) {
                        project.transactionId = transactionId;
                    }
                    notificationMessage = "hey " + (customer === null || customer === void 0 ? void 0 : customer.firstname) + ",your project " + project.description + " amount is cleared by admin manually";
                    return [4 /*yield*/, project.save()];
                case 4:
                    _b.sent();
                    res.send({ message: "project  " + project.description + " payment paid" });
                    return [3 /*break*/, 6];
                case 5:
                    error_10 = _b.sent();
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.changePaymentStatusManuallyHandler = changePaymentStatusManuallyHandler;
function addCommentHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, taskId, commentId, comment, admin, project, newComment, oldComment, error_11;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 8, , 9]);
                    _a = req.body, taskId = _a.taskId, commentId = _a.commentId, comment = _a.comment;
                    admin = req.user;
                    return [4 /*yield*/, task_1.findTask({
                            _id: taskId,
                        }, { comments: 1 })];
                case 1:
                    project = _b.sent();
                    if (!project) {
                        throw new customError_1.default("Bad Request", 404, "No such task found");
                    }
                    return [4 /*yield*/, comment_1.createComment({
                            senderId: admin._id,
                            sendBy: sendBy_1.default.Admin,
                            parent: commentId ? false : true,
                            taskId: taskId,
                            threads: [],
                            comment: comment,
                            senderProfile: admin.profileUri,
                            senderName: admin.username,
                        })];
                case 2:
                    newComment = _b.sent();
                    if (!commentId) return [3 /*break*/, 5];
                    return [4 /*yield*/, comment_1.findComment({
                            _id: commentId,
                        }, { threads: 1 })];
                case 3:
                    oldComment = _b.sent();
                    if (!oldComment) {
                        throw new customError_1.default("Bad Request", 404, "No such comment for reply found");
                    }
                    oldComment.threads.push(newComment._id);
                    return [4 /*yield*/, oldComment.save()];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 7];
                case 5:
                    project.comments.push(newComment._id);
                    return [4 /*yield*/, project.save()];
                case 6:
                    _b.sent();
                    _b.label = 7;
                case 7:
                    res.send(newComment);
                    return [3 /*break*/, 9];
                case 8:
                    error_11 = _b.sent();
                    checkErrors_1.default(error_11, res);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.addCommentHandler = addCommentHandler;
function approveHolidayHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, employeeId, holidayRequestId, admin, employee_2, value, error_12;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, employeeId = _a.employeeId, holidayRequestId = _a.holidayRequestId;
                    admin = req.user;
                    return [4 /*yield*/, employee_1.findAndUpdateEmployee({ _id: employeeId, "holidayRequest._id": holidayRequestId }, {
                            $set: {
                                "holidayRequest.$.status": holidayStatus_1.default.Approved,
                                "holidayRequest.$.approvedBy": admin._id,
                            },
                        }, { new: true, projection: { "holidayRequest.$": 1, sickId: 1 } })];
                case 1:
                    employee_2 = _b.sent();
                    if (!employee_2) {
                        throw new customError_1.default("Bad Request", 404, "No such holiday found for this employee");
                    }
                    value = employee_2.sickLeave.find(function (value, index) {
                        if (moment_1.default(value.date).month() <=
                            moment_1.default(employee_2.holidayRequest[0].date).month()) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    });
                    if (!value) {
                        throw new customError_1.default("Bad Request", 404, "No such type of leave found");
                    }
                    if (value.types[employee_2.holidayRequest[0].type].value -
                        value.types[employee_2.holidayRequest[0].type].completed <=
                        0) {
                        throw new customError_1.default("Bad Request", 404, "No Remaining live found");
                    }
                    res.send({
                        message: "holiday of employee " + employee_2.username + " is approved",
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_12 = _b.sent();
                    checkErrors_1.default(error_12, res);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.approveHolidayHandler = approveHolidayHandler;
function denyHolidayHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, employeeId, holidayRequestId, admin, employee, error_13;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, employeeId = _a.employeeId, holidayRequestId = _a.holidayRequestId;
                    admin = req.user;
                    return [4 /*yield*/, employee_1.findAndUpdateEmployee({ _id: employeeId, "holidayRequest._id": holidayRequestId }, {
                            $set: {
                                "holidayRequest.$.status": holidayStatus_1.default.Denied,
                            },
                        }, { new: true })];
                case 1:
                    employee = _b.sent();
                    if (!employee) {
                        throw new customError_1.default("Bad Request", 404, "No such holiday found for this employee");
                    }
                    res.send({
                        message: "holiday of employee " + employee.username + " is denied",
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_13 = _b.sent();
                    checkErrors_1.default(error_13, res);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.denyHolidayHandler = denyHolidayHandler;
function updateTaskHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var task, error_14;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, task_1.findAndUpdateTask({
                            _id: req.params.taskId,
                            status: { $in: [taskStatus_1.default.Initiated, taskStatus_1.default.Ongoing] },
                        }, { $set: req.body }, {})];
                case 1:
                    task = _a.sent();
                    if (task) {
                        throw new customError_1.default("Bad Request", 404, "No such task found for this id");
                    }
                    res.send({ message: "task successfully updated" });
                    return [3 /*break*/, 3];
                case 2:
                    error_14 = _a.sent();
                    checkErrors_1.default(error_14, res);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updateTaskHandler = updateTaskHandler;
function toggleApprovalAttendanceHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, attendanceId, employeeId, attendance, error_15;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    _a = req.body, attendanceId = _a.attendanceId, employeeId = _a.employeeId;
                    return [4 /*yield*/, attendance_1.findAttendance({
                            _id: attendanceId,
                            "attendance.employeeId": employeeId,
                            attendanceType: attendanceType_1.default.Normal,
                        }, { "attendance.$": 1 })];
                case 1:
                    attendance = _b.sent();
                    if (!attendance || attendance.attendance.length == 0) {
                        throw new customError_1.default("Bad Request", 404, "No such attendance found for this customer id");
                    }
                    attendance.attendance[0].approved = !attendance.attendance[0].approved;
                    return [4 /*yield*/, attendance.save()];
                case 2:
                    _b.sent();
                    res.send({
                        message: "attendance " + (attendance.attendance[0].approved ? "approved" : "denied"),
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_15 = _b.sent();
                    checkErrors_1.default(error_15, res);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.toggleApprovalAttendanceHandler = toggleApprovalAttendanceHandler;
function requestMeetingHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var session, _a, projectId, startDate, mode, slotTime, endDate, comment, requestedLocation, employeeId, project, finishedDate, employee, invalid, locationValue, meeting, error_16;
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
                    console.log("request", req.body);
                    return [4 /*yield*/, project_Service_1.findProject({
                            _id: projectId,
                        })];
                case 3:
                    project = _b.sent();
                    if (!project) {
                        throw new customError_1.default("Bad Request", 404, "No such task found ");
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
                    return [4 /*yield*/, meeting_1.createMeeting(__assign({ employeeId: employee === null || employee === void 0 ? void 0 : employee._id, projectId: project._id, requestedBy: sendBy_1.default.Admin, customerConfirmed: false, employeeHistory: employee
                                ? [{ status: meeting_2.MeetingEmployeeAction.Pending, employeeId: employee._id }]
                                : [], customerId: project.customerId, comment: comment, mode: mode, meetingStartTime: startDate, meetingEndTime: mode == meetingMode_1.default.Online ? finishedDate.toDate() : endDate, slotTime: 30 }, locationValue))];
                case 6:
                    meeting = _b.sent();
                    return [4 /*yield*/, session.commitTransaction()];
                case 7:
                    _b.sent();
                    res.send(meeting);
                    return [3 /*break*/, 10];
                case 8:
                    error_16 = _b.sent();
                    return [4 /*yield*/, session.abortTransaction()];
                case 9:
                    _b.sent();
                    checkErrors_1.default(error_16, res);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.requestMeetingHandler = requestMeetingHandler;
function updateEmployeeMeetingHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var session, _a, meetingId, employeeId, meeting, employee, invalid, employee_3, err_11;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, mongoose_1.default.startSession()];
                case 1:
                    session = _b.sent();
                    session.startTransaction();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 9, , 11]);
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
                    return [4 /*yield*/, employee_1.findEmployee({ _id: employeeId }, { schdule: 1 }, { session: session })];
                case 4:
                    employee = _b.sent();
                    if (!employee) {
                        throw new customError_1.default("Bad Request", 400, "No any employee assigned to it");
                    }
                    invalid = assignmentValidity_1.default(meeting.meetingStartTime, meeting.meetingEndTime, employee);
                    if (invalid) {
                        throw new customError_1.default("Bad Request", 404, "This slot is already booked please choose another date");
                    }
                    if (!meeting.employeeConfirmed) return [3 /*break*/, 6];
                    return [4 /*yield*/, employee_1.findAndUpdateEmployee({ _id: meeting.employeeId }, { $pull: { schdule: { meetingId: meeting._id } } }, { session: session })];
                case 5:
                    employee_3 = _b.sent();
                    _b.label = 6;
                case 6:
                    meeting.employeeId = employeeId;
                    meeting.employeeConfirmed = false;
                    meeting.employeeHistory.unshift({
                        status: meeting_2.MeetingEmployeeAction.Pending,
                        employeeId: employeeId,
                    });
                    return [4 /*yield*/, meeting.save()];
                case 7:
                    _b.sent();
                    return [4 /*yield*/, session.commitTransaction()];
                case 8:
                    _b.sent();
                    res.send({ message: "Employee successfully updated to this meeting" });
                    return [3 /*break*/, 11];
                case 9:
                    err_11 = _b.sent();
                    return [4 /*yield*/, session.abortTransaction()];
                case 10:
                    _b.sent();
                    checkErrors_1.default(err_11, res);
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    });
}
exports.updateEmployeeMeetingHandler = updateEmployeeMeetingHandler;
function declineMeetingHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var session, meeting, employee, error_17;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mongoose_1.default.startSession()];
                case 1:
                    session = _a.sent();
                    session.startTransaction();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 8, , 10]);
                    return [4 /*yield*/, meeting_1.findMeeting({
                            _id: req.params.meetingId,
                            status: meetingStatus_1.default.Pending,
                        })];
                case 3:
                    meeting = _a.sent();
                    if (!meeting) {
                        throw new customError_1.default("Bad Request", 404, "No such meeting found or meeting completed previously");
                    }
                    if (!meeting.employeeConfirmed) return [3 /*break*/, 5];
                    return [4 /*yield*/, employee_1.findAndUpdateEmployee({ _id: meeting.employeeId }, { $pull: { schdule: { meetingId: meeting._id } } }, { session: session })];
                case 4:
                    employee = _a.sent();
                    if (!employee) {
                        throw new customError_1.default("Bad Request", 400, "No any employee assigned to it");
                    }
                    _a.label = 5;
                case 5:
                    meeting.meetingStatus = meetingStatus_1.default.Declined;
                    return [4 /*yield*/, meeting.save()];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, session.commitTransaction()];
                case 7:
                    _a.sent();
                    res.send({ message: "your meeting has been declined" });
                    return [3 /*break*/, 10];
                case 8:
                    error_17 = _a.sent();
                    //@ts-ignore
                    return [4 /*yield*/, session.abortTransaction()];
                case 9:
                    //@ts-ignore
                    _a.sent();
                    checkErrors_1.default(error_17, res);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.declineMeetingHandler = declineMeetingHandler;
function completeMeetingHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var session, meeting, error_18;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mongoose_1.default.startSession()];
                case 1:
                    session = _a.sent();
                    session.startTransaction();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 8, , 10]);
                    return [4 /*yield*/, meeting_1.findMeeting({
                            _id: req.params.meetingId,
                            status: meetingStatus_1.default.Pending,
                        })];
                case 3:
                    meeting = _a.sent();
                    if (!meeting) {
                        throw new customError_1.default("Bad Request", 404, "No such meeting found or meeting completed previously");
                    }
                    if (!meeting.employeeConfirmed) return [3 /*break*/, 5];
                    return [4 /*yield*/, employee_1.findAndUpdateEmployee({ _id: meeting.employeeId }, { $pull: { schdule: { meetingId: meeting._id } } }, { session: session })];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    meeting.meetingStatus = meetingStatus_1.default.Completed;
                    return [4 /*yield*/, meeting.save()];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, session.commitTransaction()];
                case 7:
                    _a.sent();
                    res.send({ message: "your meeting has been completed" });
                    return [3 /*break*/, 10];
                case 8:
                    error_18 = _a.sent();
                    //@ts-ignore
                    return [4 /*yield*/, session.abortTransaction()];
                case 9:
                    //@ts-ignore
                    _a.sent();
                    checkErrors_1.default(error_18, res);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.completeMeetingHandler = completeMeetingHandler;
//new creation
function addHolidayHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var session, _a, fromDateString, toDateString, description, toDate, fromDate_1, admin, holiday, array, newHoliday, err_12;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, mongoose_1.default.startSession()];
                case 1:
                    session = _b.sent();
                    session.startTransaction();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 8, , 10]);
                    _a = req.body, fromDateString = _a.fromDateString, toDateString = _a.toDateString, description = _a.description;
                    toDate = moment_1.default(toDateString);
                    fromDate_1 = moment_1.default(fromDateString);
                    admin = req.user;
                    if (fromDate_1.isBefore(moment_1.default())) {
                        throw new customError_1.default("Bad Request", 404, "Day Already Passed");
                    }
                    return [4 /*yield*/, holiday_1.findHoliday({
                            $or: [
                                {
                                    $and: [
                                        { fromDate: { $lt: toDate } },
                                        { fromDate: { $gt: fromDate_1 } },
                                    ],
                                },
                                {
                                    $and: [
                                        { fromDate: { $lt: fromDate_1 } },
                                        { toDate: { $lt: toDate } },
                                    ],
                                },
                                {
                                    $and: [
                                        { toDate: { $lt: toDate } },
                                        { fromDate: { $gt: fromDate_1 } },
                                    ],
                                },
                            ],
                        }, {}, { session: session })];
                case 3:
                    holiday = _b.sent();
                    if (holiday) {
                        throw new customError_1.default("Bad Request", 400, "Some Holiday date already added");
                    }
                    array = new Array(toDate.diff(fromDate_1, "days"));
                    return [4 /*yield*/, attendance_2.default.insertMany(array.map(function (value, index) { return ({
                            date: fromDate_1.add(index, "day"),
                            open: false,
                            attendanceType: attendanceType_1.default.Holiday,
                            attendance: [],
                        }); }))];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, holiday_1.createHoliday({
                            fromDate: fromDate_1,
                            toDate: toDate,
                            description: description,
                            adminId: admin._id,
                        })];
                case 5:
                    newHoliday = _b.sent();
                    return [4 /*yield*/, employee_1.updateAllEmployee({ "holidayRequest.date": { $gte: fromDate_1, $lte: toDate } }, { $set: { "holidayRequest.$[].holidayAdded": true } }, { session: session })];
                case 6:
                    _b.sent();
                    return [4 /*yield*/, session.commitTransaction()];
                case 7:
                    _b.sent();
                    res.send({ message: "holiday for " + (newHoliday === null || newHoliday === void 0 ? void 0 : newHoliday.description) + " is created" });
                    return [3 /*break*/, 10];
                case 8:
                    err_12 = _b.sent();
                    //@ts-ignore
                    return [4 /*yield*/, session.abortTransaction()];
                case 9:
                    //@ts-ignore
                    _b.sent();
                    checkErrors_1.default(err_12, res);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.addHolidayHandler = addHolidayHandler;
function removeHolidayHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var session, admin, holiday, error_19;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mongoose_1.default.startSession()];
                case 1:
                    session = _a.sent();
                    session.startTransaction();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 6, , 7]);
                    admin = req.user;
                    return [4 /*yield*/, holiday_1.findAndDeleteHoliday({ _id: req.params.holidayId }, { session: session })];
                case 3:
                    holiday = _a.sent();
                    if (!holiday) {
                        throw new customError_1.default("Bad Request", 404, "No such holiday found");
                    }
                    if (moment_1.default(holiday.fromDate).isBefore(moment_1.default())) {
                        throw new customError_1.default("Bad Request", 404, "Day Already Passed,Now you cant delete holiday");
                    }
                    return [4 /*yield*/, employee_1.updateAllEmployee({
                            "holidayRequest.date": { $gte: holiday.fromDate, $lte: holiday.toDate },
                        }, { $set: { "holidayRequest.$[].holidayAdded": false } }, { session: session })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, attendance_2.default.deleteMany({
                            attendanceType: attendanceType_1.default.Holiday,
                            date: { $gte: holiday.fromDate, $lte: holiday.toDate },
                        })];
                case 5:
                    _a.sent();
                    res.send({ message: "holiday for " + (holiday === null || holiday === void 0 ? void 0 : holiday.description) + " is removed" });
                    return [3 /*break*/, 7];
                case 6:
                    error_19 = _a.sent();
                    checkErrors_1.default(error_19, res);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.removeHolidayHandler = removeHolidayHandler;
function startAttendanceHandler(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var type, currentDate, dateCheck, attendance, err_13;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    type = (_a = req.body.type) !== null && _a !== void 0 ? _a : attendanceType_1.default.Normal;
                    currentDate = moment_1.default();
                    dateCheck = moment_1.default(currentDate.year + "-" + currentDate.month + "-" + currentDate.date);
                    return [4 /*yield*/, attendance_1.findAttendance({ date: dateCheck })];
                case 1:
                    attendance = _b.sent();
                    if (attendance) {
                        if (attendance.attendanceType != attendanceType_1.default.Normal) {
                            throw new customError_1.default("Bad Request", 400, "Today is holiday ");
                        }
                        else {
                            throw new customError_1.default("Bad Request", 400, "Attendance Already Started");
                        }
                    }
                    return [4 /*yield*/, attendance_1.createAttendance({
                            date: dateCheck,
                            open: true,
                            attendanceType: type,
                            attendance: [],
                        })];
                case 2:
                    _b.sent();
                    res.send({ message: "Attendance Started Successfully" });
                    return [3 /*break*/, 4];
                case 3:
                    err_13 = _b.sent();
                    checkErrors_1.default(err_13, res);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.startAttendanceHandler = startAttendanceHandler;
function stopAttendanceHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var currentDate, attendance, err_14;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    currentDate = moment_1.default();
                    return [4 /*yield*/, attendance_1.findAttendance({
                            _id: req.params.attendanceId,
                        })];
                case 1:
                    attendance = _a.sent();
                    if (!attendance) {
                        throw new customError_1.default("Bad Request", 404, "No such attendance found");
                    }
                    attendance.open = false;
                    return [4 /*yield*/, attendance.save()];
                case 2:
                    _a.sent();
                    res.send({ message: "Attendance Stoped Successfully" });
                    return [3 /*break*/, 4];
                case 3:
                    err_14 = _a.sent();
                    checkErrors_1.default(err_14, res);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.stopAttendanceHandler = stopAttendanceHandler;
function createTemplateHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var template, err_15;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, template_service_1.createTemplate(req.body)];
                case 1:
                    template = _a.sent();
                    admin_2.addTemplateHandler(template);
                    res.send(template);
                    return [3 /*break*/, 3];
                case 2:
                    err_15 = _a.sent();
                    checkErrors_1.default(err_15, res);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.createTemplateHandler = createTemplateHandler;
function createBranchHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var branch, err_16;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, branch_service_1.createBranch(req.body)];
                case 1:
                    branch = _a.sent();
                    admin_2.addBranchHandler(branch);
                    res.send(branch);
                    return [3 /*break*/, 3];
                case 2:
                    err_16 = _a.sent();
                    checkErrors_1.default(err_16, res);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.createBranchHandler = createBranchHandler;
function deleteTemplateHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
            }
            catch (err) {
                checkErrors_1.default(err, res);
            }
            return [2 /*return*/];
        });
    });
}
exports.deleteTemplateHandler = deleteTemplateHandler;
function assignPrimaryEmployeeHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var session, _a, customerId, employeeId, customer, employee, conversation, participants, err_17;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, mongoose_1.default.startSession()];
                case 1:
                    session = _b.sent();
                    session.startTransaction();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 12, , 14]);
                    _a = req.body, customerId = _a.customerId, employeeId = _a.employeeId;
                    return [4 /*yield*/, customer_1.findCustomer({ _id: customerId }, {}, { session: session })];
                case 3:
                    customer = _b.sent();
                    if (!customer) {
                        throw new customError_1.default("Bad request", 404, "No such customer found");
                    }
                    return [4 /*yield*/, employee_1.findEmployee({ _id: employeeId }, { _id: 1 }, { session: session })];
                case 4:
                    employee = _b.sent();
                    if (!employee) {
                        throw new customError_1.default("Bad request", 404, "No such employee found");
                    }
                    return [4 /*yield*/, conversation_service_1.findConversation({
                            conversationType: conversationType_1.default.Primary,
                            "participants.id": customer._id.toString(),
                        }, {}, { session: session })];
                case 5:
                    conversation = _b.sent();
                    participants = [
                        {
                            id: customer._id.toString(),
                            participantType: sendBy_1.default.Customer,
                            participantName: customer.companyName,
                            participantProfile: customer.profileUri,
                        },
                        {
                            id: employee._id,
                            participantType: sendBy_1.default.Employee,
                            participantName: employee.username,
                            participantProfile: employee.profileUri,
                        },
                    ];
                    if (!!conversation) return [3 /*break*/, 7];
                    return [4 /*yield*/, conversation_service_1.createConversation({
                            conversationType: conversationType_1.default.Primary,
                            participants: participants,
                        })];
                case 6:
                    conversation = _b.sent();
                    return [3 /*break*/, 9];
                case 7:
                    conversation.participants = participants;
                    return [4 /*yield*/, conversation.save()];
                case 8:
                    _b.sent();
                    _b.label = 9;
                case 9:
                    if (customer.assignedEmployee) {
                        admin_2.deleteConversationHandler([conversation._id], customer.assignedEmployee);
                    }
                    customer.assignedEmployee = employee._id;
                    admin_2.updateConversationHandler([conversation]);
                    return [4 /*yield*/, customer.save()];
                case 10:
                    _b.sent();
                    return [4 /*yield*/, session.commitTransaction()];
                case 11:
                    _b.sent();
                    res.send({
                        message: "employee with name " + employee.username + " is successfully assigned to company " + customer.companyName,
                    });
                    return [3 /*break*/, 14];
                case 12:
                    err_17 = _b.sent();
                    return [4 /*yield*/, session.abortTransaction()];
                case 13:
                    _b.sent();
                    checkErrors_1.default(err_17, res);
                    return [3 /*break*/, 14];
                case 14: return [2 /*return*/];
            }
        });
    });
}
exports.assignPrimaryEmployeeHandler = assignPrimaryEmployeeHandler;
function addEmployeeSickHandler(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var _c, employeeId, types, employee, leaveDate, err_18;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 3, , 4]);
                    _c = req.body, employeeId = _c.employeeId, types = _c.types;
                    return [4 /*yield*/, employee_1.findEmployee({ _id: employeeId })];
                case 1:
                    employee = _d.sent();
                    if (!employee) {
                        throw new customError_1.default("Bad Request", 404, "No such employee found");
                    }
                    leaveDate = (_b = (_a = employee.sickLeave) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.date;
                    employee.sickLeave.unshift({
                        date: leaveDate
                            ? moment_1.default(leaveDate).add(1, "month").toDate()
                            : moment_1.default().startOf("month").toDate(),
                        types: types,
                    });
                    return [4 /*yield*/, employee.save()];
                case 2:
                    _d.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_18 = _d.sent();
                    checkErrors_1.default(err_18, res);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.addEmployeeSickHandler = addEmployeeSickHandler;
function updateEmployeeSickHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, employeeId, types, sickId_1, employee, index, err_19;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    _a = req.body, employeeId = _a.employeeId, types = _a.types, sickId_1 = _a.sickId;
                    return [4 /*yield*/, employee_1.findEmployee({ _id: employeeId })];
                case 1:
                    employee = _b.sent();
                    if (!employee) {
                        throw new customError_1.default("Bad Request", 404, "No such employee found");
                    }
                    index = employee.sickLeave.findIndex(
                    //@ts-ignore
                    function (value) { return value._id.equals(sickId_1); });
                    if (index == -1) {
                        throw new customError_1.default("Bad Request", 404, "No such sickid found");
                    }
                    employee.sickLeave[index] = __assign(__assign({}, employee.sickLeave[index]), { types: types });
                    return [4 /*yield*/, employee.save()];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_19 = _b.sent();
                    checkErrors_1.default(err_19, res);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateEmployeeSickHandler = updateEmployeeSickHandler;
function adminConnectMeetingHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, meetingId, meeting, token, err_20;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    user = req.user;
                    meetingId = req.body.meetingId;
                    return [4 /*yield*/, meeting_1.findMeeting({
                            _id: meetingId,
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
                    err_20 = _a.sent();
                    checkErrors_1.default(err_20, res);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.adminConnectMeetingHandler = adminConnectMeetingHandler;

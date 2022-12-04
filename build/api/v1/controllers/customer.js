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
exports.createRequestHandler = exports.customerConnectMeetingHandler = exports.createProjectForCustomerHandler = exports.approveQuotationHandler = exports.declineMeetingHandler = exports.confirmMeetingHandler = exports.requestMeetingHandler = exports.createTaskHandler = exports.getStatusHandler = exports.logoutCustomerAppHandler = exports.logoutCustomerHandler = exports.loginCustomerAppHandler = exports.loginCustomerHandler = exports.verifyCustomerHandler = exports.createCustomerHandler = void 0;
var checkErrors_1 = __importDefault(require("../helpers/checkErrors"));
var customError_1 = __importDefault(require("../helpers/customError"));
var mongoose_1 = __importDefault(require("mongoose"));
var customer_1 = require("../services/customer");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var task_1 = require("../services/task");
var taskStatus_1 = __importDefault(require("../enums/taskStatus"));
var meetingMode_1 = __importDefault(require("../enums/meetingMode"));
var moment_1 = __importDefault(require("moment"));
var employee_1 = require("../services/employee");
var meeting_1 = require("../services/meeting");
var sendBy_1 = __importDefault(require("../enums/sendBy"));
var meetingStatus_1 = __importDefault(require("../enums/meetingStatus"));
var project_Service_1 = require("../services/project.Service");
var quotation_Service_1 = require("../services/quotation.Service");
var quotationType_enum_1 = __importDefault(require("../enums/quotationType.enum"));
var sendOtp_1 = require("../helpers/sendOtp");
var priority_1 = __importDefault(require("../enums/priority"));
var billingType_1 = __importDefault(require("../enums/billingType"));
var admin_1 = require("../services/admin");
var conversation_model_1 = __importDefault(require("../models/conversation.model"));
var conversationType_1 = __importDefault(require("../enums/conversationType"));
var admin_2 = require("../socketHandlers/admin");
var agora_access_token_1 = require("agora-access-token");
var gstWithState_1 = __importDefault(require("../helpers/gstWithState"));
function createCustomerHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var code, phone, customer, state, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    code = Math.round(Math.random() * 8999 + 1000);
                    phone = req.body.number;
                    return [4 /*yield*/, customer_1.findCustomer({ number: phone }, { _id: 1 })];
                case 1:
                    customer = _a.sent();
                    if (customer) {
                        throw new customError_1.default("Bad Request", 404, "Number already exists");
                    }
                    return [4 /*yield*/, sendOtp_1.SendOtp(code, phone)];
                case 2:
                    _a.sent();
                    state = req.body.state;
                    if (req.body.gstNumber) {
                        state = gstWithState_1.default(req.body.gstNumber);
                    }
                    return [4 /*yield*/, customer_1.createCustomer(__assign(__assign({}, req.body), { state: state,
                            code: code, codeValid: true }))];
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
exports.createCustomerHandler = createCustomerHandler;
function verifyCustomerHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var customer, token, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    console.log(req.body);
                    return [4 /*yield*/, customer_1.findAndUpdateCustomer({ number: req.body.number, codeValid: true, code: req.body.code }, { $set: { codeValid: false } }, {})];
                case 1:
                    customer = _a.sent();
                    console.log(customer);
                    if (!customer) {
                        throw new customError_1.default("Bad credentials", 400, "please provide valid otp");
                    }
                    return [4 /*yield*/, customer.generateAuthToken(req.body.webToken)];
                case 2:
                    token = _a.sent();
                    res.status(200).send({ customer: customer, token: token });
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    checkErrors_1.default(err_2, res);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.verifyCustomerHandler = verifyCustomerHandler;
function loginCustomerHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var customer, token, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, customer_1.validatePassword(req.body)];
                case 1:
                    customer = _a.sent();
                    if (!customer) {
                        throw new customError_1.default("Bad request", 404, "Please Provide Right Credientials");
                    }
                    return [4 /*yield*/, customer.generateAuthToken(req.body.webToken)];
                case 2:
                    token = _a.sent();
                    res.send({ customer: customer, token: token });
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
exports.loginCustomerHandler = loginCustomerHandler;
function loginCustomerAppHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var customer, token, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, customer_1.validatePassword(req.body)];
                case 1:
                    customer = _a.sent();
                    if (!customer) {
                        throw new customError_1.default("Bad request", 404, "Please Provide Right Credientials");
                    }
                    return [4 /*yield*/, customer.generateAuthToken(req.body.deviceToken)];
                case 2:
                    token = _a.sent();
                    // res.cookie("jwt", "manish", { httpOnly: true });
                    res.send({ customer: customer, token: token });
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
exports.loginCustomerAppHandler = loginCustomerAppHandler;
function logoutCustomerHandler(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var token, decoded, customer;
        return __generator(this, function (_b) {
            try {
                token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
                console.log("token", token);
                if (!token) {
                    throw new customError_1.default("Bad request", 401, "Please Authenticate first");
                }
                decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                customer = customer_1.findAndUpdateCustomer({
                    _id: decoded._id,
                    "tokens.token": token,
                }, {
                    $pull: {
                        webToken: { token: token },
                        tokens: { token: token },
                    },
                }, {});
                if (!customer) {
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
exports.logoutCustomerHandler = logoutCustomerHandler;
function logoutCustomerAppHandler(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var token, decoded, customer;
        return __generator(this, function (_b) {
            try {
                token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
                console.log("token", token);
                if (!token) {
                    throw new customError_1.default("Bad request", 401, "Please Authenticate first");
                }
                decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                customer = customer_1.findAndUpdateCustomer({
                    _id: decoded._id,
                    "tokens.token": token,
                }, {
                    $pull: {
                        deviceToken: { token: token },
                        tokens: { token: token },
                    },
                }, {});
                if (!customer) {
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
exports.logoutCustomerAppHandler = logoutCustomerAppHandler;
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
function createTaskHandler(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var user, task, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    user = req.user;
                    return [4 /*yield*/, task_1.createTask({
                            customerId: user._id,
                            description: (_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : "",
                            status: taskStatus_1.default.Initiated,
                            previousEmployee: [],
                        })];
                case 1:
                    task = _c.sent();
                    res.send({
                        message: "your task is successfully created",
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _c.sent();
                    checkErrors_1.default(error_1, res);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.createTaskHandler = createTaskHandler;
function requestMeetingHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var session, _a, projectId, startDate, mode, slotTime, comment, requestedLocation, user, project, finishedDate, locationValue, meeting, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, mongoose_1.default.startSession()];
                case 1:
                    session = _b.sent();
                    session.startTransaction();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 6, , 8]);
                    _a = req.body, projectId = _a.projectId, startDate = _a.startDate, mode = _a.mode, slotTime = _a.slotTime, comment = _a.comment, requestedLocation = _a.requestedLocation;
                    user = req.user;
                    return [4 /*yield*/, project_Service_1.findProject({
                            _id: projectId,
                            customerId: user._id,
                        })];
                case 3:
                    project = _b.sent();
                    if (!project) {
                        throw new customError_1.default("Bad Request", 404, "No such task found ");
                    }
                    finishedDate = moment_1.default(startDate).add(slotTime !== null && slotTime !== void 0 ? slotTime : 30, "minutes");
                    locationValue = {};
                    if (mode == meetingMode_1.default.Physical) {
                        locationValue["requestedLocation"] = requestedLocation;
                    }
                    return [4 /*yield*/, meeting_1.createMeeting(__assign({ projectId: project._id, requestedBy: sendBy_1.default.Customer, customerConfirmed: true, customerId: project.customerId, comment: comment,
                            mode: mode, meetingStartTime: startDate, meetingEndTime: mode == meetingMode_1.default.Online ? finishedDate.toDate() : undefined, slotTime: 30 }, locationValue))];
                case 4:
                    meeting = _b.sent();
                    return [4 /*yield*/, session.commitTransaction()];
                case 5:
                    _b.sent();
                    res.send(meeting);
                    return [3 /*break*/, 8];
                case 6:
                    error_2 = _b.sent();
                    return [4 /*yield*/, session.abortTransaction()];
                case 7:
                    _b.sent();
                    checkErrors_1.default(error_2, res);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.requestMeetingHandler = requestMeetingHandler;
function confirmMeetingHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var session, meetingId, customer, meeting, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mongoose_1.default.startSession()];
                case 1:
                    session = _a.sent();
                    session.startTransaction();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 6, , 8]);
                    meetingId = req.body.meetingId;
                    customer = req.user;
                    return [4 /*yield*/, meeting_1.findMeeting({
                            _id: meetingId,
                            customerId: customer._id,
                            status: meetingStatus_1.default.Pending,
                        })];
                case 3:
                    meeting = _a.sent();
                    if (!meeting) {
                        throw new customError_1.default("Bad Request", 404, "No such meeting found or meeting completed previously");
                    }
                    meeting.employeeConfirmed = true;
                    return [4 /*yield*/, session.commitTransaction()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, meeting.save()];
                case 5:
                    _a.sent();
                    res.send({ message: "you confirmed the meeting" });
                    return [3 /*break*/, 8];
                case 6:
                    error_3 = _a.sent();
                    //@ts-ignore
                    return [4 /*yield*/, session.abortTransaction()];
                case 7:
                    //@ts-ignore
                    _a.sent();
                    checkErrors_1.default(error_3, res);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.confirmMeetingHandler = confirmMeetingHandler;
function declineMeetingHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var session, meetingId, customer, meeting, employee, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mongoose_1.default.startSession()];
                case 1:
                    session = _a.sent();
                    session.startTransaction();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 8, , 10]);
                    meetingId = req.body.meetingId;
                    customer = req.user;
                    return [4 /*yield*/, meeting_1.findMeeting({
                            _id: meetingId,
                            customerId: customer._id,
                            status: meetingStatus_1.default.Pending,
                        })];
                case 3:
                    meeting = _a.sent();
                    if (!meeting) {
                        throw new customError_1.default("Bad Request", 404, "No such meeting found or meeting completed previously");
                    }
                    if (moment_1.default(meeting.meetingStartTime).isBefore(moment_1.default())) {
                        throw new customError_1.default("Bad Request", 400, "Hey,you cannot cancel meeting after start time");
                    }
                    if (!meeting.employeeConfirmed) return [3 /*break*/, 5];
                    return [4 /*yield*/, employee_1.findAndUpdateEmployee({ _id: meeting.employeeId }, { $pull: { schdule: { meetingId: meeting._id } } }, { session: session })];
                case 4:
                    employee = _a.sent();
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
                    error_4 = _a.sent();
                    //@ts-ignore
                    return [4 /*yield*/, session.abortTransaction()];
                case 9:
                    //@ts-ignore
                    _a.sent();
                    checkErrors_1.default(error_4, res);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.declineMeetingHandler = declineMeetingHandler;
function approveQuotationHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, projectId, quotationId, session, project, quotation, err_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, projectId = _a.projectId, quotationId = _a.quotationId;
                    return [4 /*yield*/, mongoose_1.default.startSession()];
                case 1:
                    session = _b.sent();
                    session.startTransaction();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 7, , 9]);
                    return [4 /*yield*/, project_Service_1.findProject({
                            _id: projectId,
                            status: { $in: [taskStatus_1.default.Initiated, taskStatus_1.default.Ongoing] },
                        })];
                case 3:
                    project = _b.sent();
                    if (!project) {
                        throw new customError_1.default("Bad Request", 404, "No such project found");
                    }
                    return [4 /*yield*/, quotation_Service_1.findAndUpdateQuotation({
                            projectId: projectId,
                            _id: quotationId,
                            quotationType: quotationType_enum_1.default.Current,
                            approved: false,
                        }, { $set: { approved: true } }, { session: session })];
                case 4:
                    quotation = _b.sent();
                    if (!quotation) {
                        throw new customError_1.default("Bad Request", 400, "No such quotation found");
                    }
                    project.clientApproved = true;
                    return [4 /*yield*/, project.save()];
                case 5:
                    _b.sent();
                    return [4 /*yield*/, session.commitTransaction()];
                case 6:
                    _b.sent();
                    res.send({ message: "quotation successfully approved" });
                    return [3 /*break*/, 9];
                case 7:
                    err_5 = _b.sent();
                    return [4 /*yield*/, session.commitTransaction()];
                case 8:
                    _b.sent();
                    checkErrors_1.default(err_5, res);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.approveQuotationHandler = approveQuotationHandler;
function createProjectForCustomerHandler(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var session, _b, projectName, startDate, expectedEndDate, description, user, input, project, admins, participants, conversations, conversation, error_5;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, mongoose_1.default.startSession()];
                case 1:
                    session = _c.sent();
                    session.startTransaction();
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 7, , 9]);
                    _b = req.body, projectName = _b.projectName, startDate = _b.startDate, expectedEndDate = _b.expectedEndDate, description = _b.description;
                    user = req.user;
                    input = {
                        customerId: user._id,
                        name: projectName,
                        assignedEmployees: [],
                        priority: priority_1.default.Default,
                        billingType: billingType_1.default.Billable,
                        startDate: moment_1.default(startDate).toDate(),
                        expectedEndDate: moment_1.default(expectedEndDate).toDate(),
                        description: description,
                        status: taskStatus_1.default.Initiated,
                        adminApproved: true,
                        clientApproved: false,
                        services: [],
                    };
                    return [4 /*yield*/, project_Service_1.createProject(input)];
                case 3:
                    project = _c.sent();
                    return [4 /*yield*/, admin_1.findAllAdmin({}, {}, { session: session })];
                case 4:
                    admins = _c.sent();
                    participants = admins.map(function (value) { return ({
                        id: value._id,
                        participantType: sendBy_1.default.Admin,
                        participantName: value.username,
                        participantProfile: value.profileUri,
                    }); });
                    conversations = [
                        {
                            participants: __spreadArrays(participants, [
                                {
                                    id: (_a = user._id) === null || _a === void 0 ? void 0 : _a.toString(),
                                    participantType: sendBy_1.default.Customer,
                                    participantName: user.companyName,
                                    participantProfile: user.profileUri,
                                },
                            ]),
                            projectId: project._id,
                            _id: new mongoose_1.default.Types.ObjectId(),
                            projectName: project.name,
                            conversationType: conversationType_1.default.Project,
                        },
                        {
                            participants: participants,
                            _id: new mongoose_1.default.Types.ObjectId(),
                            projectId: project._id,
                            projectName: project.name,
                            conversationType: conversationType_1.default.Group,
                        },
                    ];
                    return [4 /*yield*/, conversation_model_1.default.insertMany(conversations, {
                            session: session,
                        })];
                case 5:
                    conversation = _c.sent();
                    return [4 /*yield*/, session.commitTransaction()];
                case 6:
                    _c.sent();
                    admin_2.addProjectHandler(project);
                    admin_2.sendConversationHandler(conversations);
                    res.send({
                        message: "one project created",
                    });
                    return [3 /*break*/, 9];
                case 7:
                    error_5 = _c.sent();
                    return [4 /*yield*/, session.abortTransaction()];
                case 8:
                    _c.sent();
                    checkErrors_1.default(error_5, res);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.createProjectForCustomerHandler = createProjectForCustomerHandler;
function customerConnectMeetingHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, meetingId, meeting, token, err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    user = req.user;
                    meetingId = req.body.meetingId;
                    return [4 /*yield*/, meeting_1.findMeeting({
                            _id: meetingId,
                            customerId: user._id,
                            mode: meetingMode_1.default.Online,
                        })];
                case 1:
                    meeting = _a.sent();
                    if (!meeting) {
                        throw new customError_1.default("Bad Request", 404, "No such meeting found");
                    }
                    console.log("data", process.env.AGORA_ID, process.env.AGORA_CERTIFICATE);
                    token = agora_access_token_1.RtcTokenBuilder.buildTokenWithUid(process.env.AGORA_ID, process.env.AGORA_CERTIFICATE, meeting._id.toString(), req.body.userId, agora_access_token_1.RtcRole.PUBLISHER, Math.floor(Date.now() / 1000) + 3600);
                    // return the token
                    return [2 /*return*/, res.json({ token: token })];
                case 2:
                    err_6 = _a.sent();
                    checkErrors_1.default(err_6, res);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.customerConnectMeetingHandler = customerConnectMeetingHandler;
function createRequestHandler(req, res) {
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
exports.createRequestHandler = createRequestHandler;

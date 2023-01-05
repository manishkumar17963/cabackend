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
exports.initialEmployeeDataHandler = exports.imageDetailHandler = exports.storageProjectImageHandler = exports.storageImportantImageHandler = exports.removeImportantHandler = exports.addImportantHandler = exports.storageProjectHandler = exports.employeeStorageHandler = exports.employeeSrisudhaHandler = exports.sickLeaveHandler = exports.completedLeaveHandler = exports.assignEmployeeMeeting = exports.completeMeetingHandler = exports.cancelMeetingHandler = exports.updateLinkHandler = exports.employeeDeleteLink = exports.employeeToggleLink = exports.employeeAddLink = exports.deleteTaskHandler = exports.updateTaskHandler = exports.updateTaskStatusHandler = exports.addTaskHandler = exports.employeeSocketHandler = void 0;
var moment_1 = __importDefault(require("moment"));
var mongoose_1 = __importDefault(require("mongoose"));
var serverStore_1 = require("../../../socket/serverStore");
var attendanceType_1 = __importDefault(require("../enums/attendanceType"));
var conversationType_1 = __importDefault(require("../enums/conversationType"));
var holidayStatus_1 = __importDefault(require("../enums/holidayStatus"));
var meetingStatus_1 = __importDefault(require("../enums/meetingStatus"));
var taskStatus_1 = __importDefault(require("../enums/taskStatus"));
var meetingType_1 = __importDefault(require("../enums/meetingType"));
var priority_1 = __importDefault(require("../enums/priority"));
var sendBy_1 = __importDefault(require("../enums/sendBy"));
var taskStatus_2 = __importDefault(require("../enums/taskStatus"));
var checkErrors_1 = require("../helpers/checkErrors");
var customError_1 = __importDefault(require("../helpers/customError"));
var attendance_1 = __importDefault(require("../models/attendance"));
var comment_1 = __importDefault(require("../models/comment"));
var employee_1 = __importDefault(require("../models/employee"));
var link_model_1 = __importStar(require("../models/link.model"));
var meeting_1 = __importDefault(require("../models/meeting"));
var message_model_1 = __importDefault(require("../models/message.model"));
var task_model_1 = __importDefault(require("../models/task.model"));
var admin_1 = require("../services/admin");
var attendance_2 = require("../services/attendance");
var branch_service_1 = require("../services/branch.service");
var customer_1 = require("../services/customer");
var employee_2 = require("../services/employee");
var holiday_1 = require("../services/holiday");
var link_service_1 = require("../services/link.service");
var meeting_2 = require("../services/meeting");
var message_Service_1 = require("../services/message.Service");
var project_Service_1 = require("../services/project.Service");
var selfTask_service_1 = require("../services/selfTask.service");
var task_1 = require("../services/task");
var template_service_1 = require("../services/template.service");
var selfTask_1 = __importDefault(require("../models/selfTask"));
var taskType_1 = __importDefault(require("../enums/taskType"));
function employeeSocketHandler(socket) {
    var _this = this;
    //@ts-ignore
    if (socket.type == sendBy_1.default.Employee) {
        socket.on("sick-leave", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sickLeaveHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("employee-project", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, employeeProjectHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("create-task", function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, addTaskHandler(socket, data, callback)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("update-task-status", function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, updateTaskStatusHandler(socket, data, callback)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("all-tasks", function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, employeeAllTaskHandler(socket, data, callback)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("time-log", function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, employeeTaskLogHandler(socket, data, callback)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("start-task-employee", function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, taskActionHandler(socket, data, callback)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("employee-dashboard", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, dashboardHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("confirm-meeting", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, confirmMeetingHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("employee-mark-attendance", function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, markAttendanceHandler(socket, data, callback)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("employee-task-detail", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, employeeTaskDetailHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("employee-task", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, employeeTaskHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("employee-srisudha", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, employeeSrisudhaHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("add-attendance", function (data) {
            addAttendanceHandler(socket, data);
        });
        socket.on("employee-search-customer", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, searchCustomerHandler(socket)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("assign-employee-meeting", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, assignEmployeeMeeting(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("employee-search-employee", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("hello ji ");
                        return [4 /*yield*/, searchEmployeeHandler(socket)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("employee-task", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, employeeTaskHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("employee-project-meeting", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, employeeMeetingHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("employee-storage", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("storage emit ");
                        return [4 /*yield*/, employeeStorageHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("employee-storage-project", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, storageProjectHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("employee-storage-project-image", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, storageProjectImageHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("employee-storage-important-image", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, storageImportantImageHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("employee-add-important-image", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, addImportantHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("employee-remove-important-image", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, removeImportantHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("employee-image-detail", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, imageDetailHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("employee-holiday", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, employeeHolidayHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("employee-date-meeting", function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, employeeMeetingDateHandler(socket, data, callback)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("employee-complete-meeting", function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, completeMeetingHandler(socket, data, callback)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("employee-cancel-meeting", function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, cancelMeetingHandler(socket, data, callback)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("employee-add-link", function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, employeeAddLink(socket, data, callback)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("employee-toggle-link", function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, employeeToggleLink(socket, data, callback)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("employee-delete-link", function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, employeeDeleteLink(socket, data, callback)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("employee-update-link", function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, updateLinkHandler(socket, data, callback)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    }
}
exports.employeeSocketHandler = employeeSocketHandler;
function addTaskHandler(socket, data, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var user, task, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log("data", data);
                    user = socket.user;
                    return [4 /*yield*/, selfTask_service_1.createSelfTask({
                            name: data.name,
                            expectedEndDate: data.expectedEndDate != null && data.expectedEndDate
                                ? data.expectedEndDate
                                : undefined,
                            startDate: data.startDate,
                            priority: priority_1.default.Default,
                            assignedEmployee: user._id,
                            timeLog: [],
                            userType: sendBy_1.default.Employee,
                            status: taskStatus_2.default.Initiated,
                        })];
                case 1:
                    task = _a.sent();
                    callback({ status: 200, data: task });
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.log("error", err_1);
                    callback({ status: 400, message: err_1 === null || err_1 === void 0 ? void 0 : err_1.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.addTaskHandler = addTaskHandler;
function employeeAllTaskHandler(socket, data, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var user, tasks1, tasks2, data_1, handlerFunction, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    user = socket.user;
                    return [4 /*yield*/, task_1.aggregateTask([
                            {
                                $match: {
                                    assignedEmployee: user._id,
                                    status: { $ne: taskStatus_1.default.Declined },
                                },
                            },
                            {
                                $project: {
                                    name: 1,
                                    description: 1,
                                    expectedEndDate: 1,
                                    status: 1,
                                    priority: 1,
                                    projectId: 1,
                                    createdAt: 1,
                                },
                            },
                            { $group: { _id: "$status", items: { $push: "$$ROOT" } } },
                        ])];
                case 1:
                    tasks1 = _a.sent();
                    return [4 /*yield*/, selfTask_service_1.aggregateSelfTask([
                            {
                                $match: {
                                    assignedEmployee: user._id,
                                    status: { $ne: taskStatus_1.default.Declined },
                                },
                            },
                            {
                                $project: {
                                    name: 1,
                                    description: 1,
                                    expectedEndDate: 1,
                                    status: 1,
                                    priority: 1,
                                    startDate: 1,
                                },
                            },
                            { $group: { _id: "$status", items: { $push: "$$ROOT" } } },
                        ])];
                case 2:
                    tasks2 = _a.sent();
                    data_1 = {};
                    handlerFunction = function (value) {
                        var _a;
                        if (data_1[value._id]) {
                            (_a = data_1[value._id].items).push.apply(_a, value.items);
                        }
                        else {
                            data_1[value._id] = {
                                title: value._id,
                                expanded: true,
                                items: value.items,
                            };
                        }
                    };
                    tasks1.forEach(handlerFunction);
                    tasks2.forEach(handlerFunction);
                    callback({
                        status: 200,
                        data: {
                            completed: data_1.completed,
                            ongoing: data_1.ongoing,
                            initiated: data_1.initiated,
                        },
                    });
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function updateTaskStatusHandler(socket, data, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var user, task, timeLog, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    console.log("data", data);
                    user = socket.user;
                    task = void 0;
                    if (!(data.type == "project")) return [3 /*break*/, 2];
                    return [4 /*yield*/, task_1.findTask({ _id: data.taskId, assignedEmployee: user._id })];
                case 1:
                    task = _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, selfTask_service_1.findSelfTask({
                        _id: data.taskId,
                        assignedEmployee: user._id,
                    })];
                case 3:
                    task = _a.sent();
                    _a.label = 4;
                case 4:
                    if (!task) {
                        throw new customError_1.default("Bad Request", 404, "No such task found");
                    }
                    task.status = data.status;
                    if (data.status == taskStatus_1.default.Completed) {
                        timeLog = task.timeLog[0];
                        if (timeLog && !timeLog.endTime) {
                            task.timeLog[0].endTime = moment_1.default().toDate();
                        }
                    }
                    return [4 /*yield*/, task.save()];
                case 5:
                    _a.sent();
                    callback({ status: 200, data: task });
                    return [3 /*break*/, 7];
                case 6:
                    err_3 = _a.sent();
                    console.log("error", err_3);
                    callback({ status: 400, message: err_3 === null || err_3 === void 0 ? void 0 : err_3.message });
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.updateTaskStatusHandler = updateTaskStatusHandler;
function updateTaskHandler(socket, data, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var user, task, err_4;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    user = socket.user;
                    return [4 /*yield*/, selfTask_service_1.findAndUpdateSelfTask({ _id: data.taskId }, { $set: (_a = {}, _a[data.key] = data.value, _a) }, {})];
                case 1:
                    task = _b.sent();
                    if (!task) {
                        throw new customError_1.default("Bad Request", 404, "No such task found");
                    }
                    callback({ status: 200, data: task });
                    return [3 /*break*/, 3];
                case 2:
                    err_4 = _b.sent();
                    callback({ status: 400, message: err_4 === null || err_4 === void 0 ? void 0 : err_4.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updateTaskHandler = updateTaskHandler;
function deleteTaskHandler(socket, data, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var user, task, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    user = socket.user;
                    return [4 /*yield*/, selfTask_service_1.deleteSelfTask({
                            _id: data.taskId,
                            assignedEmployee: user._id,
                        })];
                case 1:
                    task = _a.sent();
                    if (!task || !task.acknowledged) {
                        throw new customError_1.default("Bad Request", 404, "Task can't be deleted");
                    }
                    callback({ status: 200, data: task });
                    return [3 /*break*/, 3];
                case 2:
                    err_5 = _a.sent();
                    callback({ status: 400, message: err_5 === null || err_5 === void 0 ? void 0 : err_5.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteTaskHandler = deleteTaskHandler;
function employeeAddLink(socket, data, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var user, link, err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    user = socket.user;
                    return [4 /*yield*/, link_service_1.createLink(__assign(__assign({}, data), { type: link_model_1.LinkOwned.Personal, ownerId: user._id, ownerType: sendBy_1.default.Employee, hide: false }))];
                case 1:
                    link = _a.sent();
                    // console.log("timeLogs", timeLogs);
                    callback({ status: 200, data: link });
                    return [3 /*break*/, 3];
                case 2:
                    err_6 = _a.sent();
                    callback({ status: 500, message: err_6.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.employeeAddLink = employeeAddLink;
function employeeToggleLink(socket, data, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var user, link, err_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    user = socket.user;
                    return [4 /*yield*/, link_service_1.findLink({ ownerId: user._id, _id: data.linkId })];
                case 1:
                    link = _a.sent();
                    if (!link) {
                        throw new customError_1.default("Bad request", 404, "No such Link found");
                    }
                    // console.log("timeLogs", timeLogs);
                    link.hide = !link.hide;
                    return [4 /*yield*/, link.save()];
                case 2:
                    _a.sent();
                    callback({
                        status: 200,
                        data: "link successfully " + (link.hide ? "hidden" : "showed"),
                    });
                    return [3 /*break*/, 4];
                case 3:
                    err_7 = _a.sent();
                    callback({ status: 400, message: err_7 === null || err_7 === void 0 ? void 0 : err_7.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.employeeToggleLink = employeeToggleLink;
function employeeDeleteLink(socket, data, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var user_1, link, err_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    user_1 = socket.user;
                    return [4 /*yield*/, link_service_1.findLink({
                            _id: data.linkId,
                        })];
                case 1:
                    link = _a.sent();
                    if (!link) {
                        throw new customError_1.default("Bad request", 404, "No such Link found");
                    }
                    if (!(link.ownerId == user_1._id)) return [3 /*break*/, 3];
                    return [4 /*yield*/, link.delete()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    link.sharedTo = link.sharedTo.filter(function (value) { return value != user_1._id; });
                    return [4 /*yield*/, link.save()];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    callback({
                        status: 200,
                        data: "link successfully deleted",
                    });
                    return [3 /*break*/, 7];
                case 6:
                    err_8 = _a.sent();
                    callback({ status: 400, message: err_8 === null || err_8 === void 0 ? void 0 : err_8.message });
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.employeeDeleteLink = employeeDeleteLink;
function updateLinkHandler(socket, data, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var user, link, err_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    user = socket.user;
                    return [4 /*yield*/, link_service_1.findAndUpdateLink({
                            ownerId: user._id,
                            _id: data.linkId,
                            type: link_model_1.LinkOwned.Personal,
                        }, { $set: { name: data.name, url: data.url, sharedTo: data.sharedTo } }, { new: true })];
                case 1:
                    link = _a.sent();
                    if (!link) {
                        throw new customError_1.default("Bad request", 404, "No such Link found");
                    }
                    callback({
                        status: 200,
                        data: link,
                    });
                    return [3 /*break*/, 3];
                case 2:
                    err_9 = _a.sent();
                    callback({ status: 400, message: err_9 === null || err_9 === void 0 ? void 0 : err_9.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updateLinkHandler = updateLinkHandler;
function cancelMeetingHandler(socket, data, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var meeting, err_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, meeting_2.findMeeting({ _id: data.meetingId })];
                case 1:
                    meeting = _a.sent();
                    if (!!meeting) return [3 /*break*/, 2];
                    throw new customError_1.default("Bad Request", 404, "No such meeting found");
                case 2:
                    if (!(meeting.meetingStatus == meetingStatus_1.default.Completed)) return [3 /*break*/, 3];
                    throw new customError_1.default("Bad Request", 404, "Meeting Already completed");
                case 3:
                    meeting.meetingStatus = meetingStatus_1.default.Declined;
                    return [4 /*yield*/, meeting.save()];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    callback({ status: 200, message: "Meeting successfully cancelled" });
                    return [3 /*break*/, 7];
                case 6:
                    err_10 = _a.sent();
                    callback({ status: 400, message: err_10 === null || err_10 === void 0 ? void 0 : err_10.message });
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.cancelMeetingHandler = cancelMeetingHandler;
function completeMeetingHandler(socket, data, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var meeting, err_11;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, meeting_2.findMeeting({ _id: data.meetingId })];
                case 1:
                    meeting = _a.sent();
                    if (!!meeting) return [3 /*break*/, 2];
                    throw new customError_1.default("Bad Request", 404, "No such meeting found");
                case 2:
                    if (!(meeting.meetingStatus == meetingStatus_1.default.Declined)) return [3 /*break*/, 3];
                    throw new customError_1.default("Bad Request", 404, "Meeting Already Declined");
                case 3:
                    meeting.meetingStatus = meetingStatus_1.default.Completed;
                    return [4 /*yield*/, meeting.save()];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    callback({ status: 200, message: "Meeting successfully Completed" });
                    return [3 /*break*/, 7];
                case 6:
                    err_11 = _a.sent();
                    callback({ status: 400, message: err_11 === null || err_11 === void 0 ? void 0 : err_11.message });
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.completeMeetingHandler = completeMeetingHandler;
function employeeTaskLogHandler(socket, data, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var func, tasks, err_12;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    func = data.type == taskType_1.default.Personal ? selfTask_service_1.aggregateSelfTask : task_1.aggregateTask;
                    return [4 /*yield*/, func([
                            {
                                $match: {
                                    _id: new mongoose_1.default.Types.ObjectId(data.taskId),
                                },
                            },
                            { $unwind: "$timeLog" },
                            {
                                $lookup: {
                                    from: "employees",
                                    let: { employeeId: "$timeLog.employeeId" },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $eq: ["$_id", "$$employeeId"],
                                                },
                                            },
                                        },
                                        {
                                            $project: {
                                                _id: 1,
                                                username: 1,
                                                profileUri: 1,
                                                number: 1,
                                            },
                                        },
                                    ],
                                    as: "employee",
                                },
                            },
                            { $unwind: "$employee" },
                            {
                                $replaceRoot: {
                                    newRoot: {
                                        $mergeObjects: [{ employee: "$employee" }, "$timeLog"],
                                    },
                                },
                            },
                        ])];
                case 1:
                    tasks = _a.sent();
                    callback({ status: 200, data: tasks });
                    return [3 /*break*/, 3];
                case 2:
                    err_12 = _a.sent();
                    //@ts-ignore
                    callback({ status: 400, message: error.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function taskActionHandler(socket, data, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var user, func, tasks, timeLog, err_13;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    user = socket.user;
                    func = data.type == taskType_1.default.Personal ? selfTask_service_1.findSelfTask : task_1.findTask;
                    return [4 /*yield*/, func({
                            assignedEmployee: user._id,
                            _id: data.taskId,
                        })];
                case 1:
                    tasks = _a.sent();
                    console.log("tasks", data);
                    if (!tasks) {
                        throw new customError_1.default("Bad Request", 404, "No such task found");
                    }
                    timeLog = tasks === null || tasks === void 0 ? void 0 : tasks.timeLog[0];
                    if (!timeLog) {
                        tasks.timeLog = [
                            {
                                startTime: moment_1.default().toDate(),
                                employeeId: user._id,
                                workFrom: data.workFrom,
                                location: data.location,
                            },
                        ];
                    }
                    else {
                        if (timeLog.endTime) {
                            tasks.timeLog = __spreadArrays([
                                {
                                    startTime: moment_1.default().toDate(),
                                    employeeId: user._id,
                                    workFrom: data.workFrom,
                                    location: data.location,
                                }
                            ], tasks.timeLog);
                        }
                        else {
                            tasks.timeLog[0].endTime = moment_1.default().toDate();
                        }
                    }
                    return [4 /*yield*/, tasks.save()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_13 = _a.sent();
                    console.log(err_13);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function markAttendanceHandler(socket, data, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var user_2, attendance, value, err_14;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    user_2 = socket.user;
                    return [4 /*yield*/, attendance_2.findAttendance({ date: moment_1.default().startOf("day") })];
                case 1:
                    attendance = _a.sent();
                    if (attendance) {
                        if (attendance.attendanceType != attendanceType_1.default.Normal) {
                            callback({ status: 400, message: "Oops today is holiday" });
                            return [2 /*return*/];
                        }
                        else if (!attendance.open) {
                            callback({ status: 400, message: "Oops attendance closed" });
                            return [2 /*return*/];
                        }
                    }
                    else {
                        callback({ status: 400, message: "Oops attendance not started yet " });
                        return [2 /*return*/];
                    }
                    value = attendance.attendance.find(function (value) { return value.employeeId == user_2._id; });
                    if (!!value) return [3 /*break*/, 3];
                    attendance.attendance.push({
                        employeeId: user_2._id,
                        approved: holidayStatus_1.default.Pending,
                        time: moment_1.default().toDate(),
                    });
                    callback({
                        status: 200,
                        message: "your attendance is marked successfully",
                    });
                    return [4 /*yield*/, attendance.save()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    callback({
                        status: 400,
                        message: "your attendance is already " + value.approved,
                    });
                    return [2 /*return*/];
                case 4: return [3 /*break*/, 6];
                case 5:
                    err_14 = _a.sent();
                    console.log(err_14);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function dashboardHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user_3, allProjects, projects_1, meetings, attendance, holiday, value, attendanceType, customers, holidays, monthly_1, monthlyAttendance, links, err_15;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    user_3 = socket.user;
                    return [4 /*yield*/, project_Service_1.aggregateProject([
                            { $match: { primaryEmployee: user_3._id } },
                            { $group: { _id: "$status", count: { $count: {} } } },
                        ])];
                case 1:
                    allProjects = _a.sent();
                    projects_1 = {};
                    allProjects.forEach(function (value) {
                        projects_1[value._id] = value.count;
                    });
                    return [4 /*yield*/, meeting_1.default.find({
                            meetingStartTime: {
                                $gte: moment_1.default().startOf("day").toDate(),
                                $lt: moment_1.default().startOf("day").add(1, "day").toDate(),
                            },
                        }).sort({ meetingStartTime: 1 })];
                case 2:
                    meetings = _a.sent();
                    return [4 /*yield*/, attendance_2.findAttendance({
                            date: moment_1.default().startOf("day").toDate(),
                        })];
                case 3:
                    attendance = _a.sent();
                    return [4 /*yield*/, employee_2.findEmployee({
                            _id: user_3._id,
                            holidayRequest: {
                                $elemMatch: {
                                    date: moment_1.default().startOf("day"),
                                    status: holidayStatus_1.default.Approved,
                                },
                            },
                        }, { "holidayRequest.$": 1 })];
                case 4:
                    holiday = _a.sent();
                    value = void 0;
                    attendanceType = void 0;
                    if (!holiday && attendance) {
                        if (attendance.attendanceType == attendanceType_1.default.Normal) {
                            value = attendance.attendance.find(function (value) { return value.employeeId == user_3._id; });
                        }
                        attendanceType = attendance.attendanceType;
                    }
                    return [4 /*yield*/, customer_1.findAllCustomer({ assignedEmployee: user_3._id }, { profileUri: 1, companyName: 1, number: 1, firstname: 1, lastname: 1 })];
                case 5:
                    customers = _a.sent();
                    return [4 /*yield*/, employee_2.aggregateEmployee([
                            { $match: { _id: user_3._id } },
                            { $unwind: "$holidayRequest" },
                            {
                                $match: {
                                    "holidayRequest.date": {
                                        $gte: moment_1.default().startOf("month").toDate(),
                                        $lte: moment_1.default().startOf("month").add(1, "month").toDate(),
                                    },
                                },
                            },
                            { $group: { _id: "$holidayRequest.status", count: { $count: {} } } },
                        ])];
                case 6:
                    holidays = _a.sent();
                    console.log("holidays", holidays);
                    monthly_1 = {};
                    holidays.forEach(function (value) {
                        monthly_1[value._id] = value.count;
                    });
                    return [4 /*yield*/, attendance_1.default.countDocuments({
                            date: {
                                $gte: moment_1.default().startOf("month"),
                                $lte: moment_1.default().startOf("month").add(1, "month"),
                            },
                            attendance: {
                                $elemMatch: {
                                    approved: holidayStatus_1.default.Approved,
                                    employeeId: user_3._id,
                                },
                            },
                        })];
                case 7:
                    monthlyAttendance = _a.sent();
                    monthly_1.attendance = monthlyAttendance;
                    return [4 /*yield*/, link_model_1.default.find({
                            $or: [
                                { ownerId: user_3._id },
                                { type: link_model_1.LinkOwned.All, hide: false },
                                { sharedTo: user_3._id, hide: false },
                            ],
                        }).sort({ createdAt: -1 })];
                case 8:
                    links = _a.sent();
                    socket.emit("employee-dashboard-result", {
                        meetings: meetings,
                        holiday: holiday,
                        links: links,
                        monthly: monthly_1,
                        customers: customers,
                        attendance: value,
                        //@ts-ignore
                        attendanceType: attendanceType,
                        projects: projects_1,
                    });
                    return [3 /*break*/, 10];
                case 9:
                    err_15 = _a.sent();
                    console.log("err", err_15);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
function confirmMeetingHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, err_16;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    user = socket.user;
                    return [4 /*yield*/, meeting_2.findAndUpdateMeeting({
                            _id: data.meetingId,
                            employeeId: user._id,
                            meetingStatus: { $ne: meetingStatus_1.default.Completed },
                        }, { $set: { employeeConfirmed: true } }, {})];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_16 = _a.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function employeeMeetingDateHandler(socket, data, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var user, projects, directMeeting, meetings_1, err_17;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    console.log("meeting", data.date);
                    user = socket.user;
                    return [4 /*yield*/, project_Service_1.aggregateProject([
                            { $match: { "assignedEmployees.employeeId": user._id } },
                            {
                                $addFields: {
                                    primary: {
                                        $cond: {
                                            if: {
                                                $eq: [user._id, "$primaryEmployee"],
                                            },
                                            then: true,
                                            else: false,
                                        },
                                    },
                                },
                            },
                            {
                                $lookup: {
                                    from: "meetings",
                                    let: { projectId: "$_id", primary: "$primary" },
                                    pipeline: [
                                        {
                                            $match: {
                                                meetingStartTime: {
                                                    $gte: moment_1.default(data.date).toDate(),
                                                    $lt: moment_1.default(data.date).add(1, "day").toDate(),
                                                },
                                                $expr: {
                                                    $or: [
                                                        {
                                                            $and: [
                                                                { $eq: ["$employeeId", user._id] },
                                                                { $eq: ["$$projectId", "$projectId"] },
                                                            ],
                                                        },
                                                        {
                                                            $and: [
                                                                { $eq: ["$$projectId", "$projectId"] },
                                                                { $eq: ["$$primary", true] },
                                                            ],
                                                        },
                                                        {
                                                            $and: [
                                                                { $eq: ["$$projectId", "$projectId"] },
                                                                { $eq: ["$meetingType", meetingType_1.default.Conversation] },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                        { $addFields: { primary: "$$primary" } },
                                        {
                                            $lookup: {
                                                from: "employees",
                                                let: { employeeId: "$employeeId" },
                                                pipeline: [
                                                    {
                                                        $match: {
                                                            $expr: {
                                                                $eq: ["$_id", "$$employeeId"],
                                                            },
                                                        },
                                                    },
                                                    {
                                                        $project: {
                                                            _id: 1,
                                                            username: 1,
                                                            profileUri: 1,
                                                            number: 1,
                                                        },
                                                    },
                                                ],
                                                as: "employee",
                                            },
                                        },
                                        {
                                            $lookup: {
                                                from: "customers",
                                                let: { customerId: "$customerId" },
                                                pipeline: [
                                                    {
                                                        $match: {
                                                            $expr: {
                                                                $eq: ["$_id", "$$customerId"],
                                                            },
                                                        },
                                                    },
                                                    {
                                                        $project: {
                                                            _id: 1,
                                                            username: 1,
                                                            companyName: 1,
                                                            number: 1,
                                                            profileUri: 1,
                                                        },
                                                    },
                                                ],
                                                as: "customer",
                                            },
                                        },
                                        {
                                            $lookup: {
                                                from: "conversations",
                                                let: { conversationId: "$conversationId" },
                                                pipeline: [
                                                    {
                                                        $match: {
                                                            $expr: {
                                                                $eq: ["$_id", "$$conversationId"],
                                                            },
                                                        },
                                                    },
                                                    {
                                                        $project: {
                                                            participants: 1,
                                                        },
                                                    },
                                                ],
                                                as: "conversation",
                                            },
                                        },
                                        {
                                            $unwind: {
                                                path: "$conversation",
                                                preserveNullAndEmptyArrays: true,
                                            },
                                        },
                                        {
                                            $addFields: {
                                                participants: {
                                                    $cond: {
                                                        if: {
                                                            $or: [
                                                                { $eq: [meetingType_1.default.Conversation, "$meetingType"] },
                                                                { $eq: [meetingType_1.default.Primary, "$meetingType"] },
                                                            ],
                                                        },
                                                        then: "$conversation.participants",
                                                        else: "$participants",
                                                    },
                                                },
                                            },
                                        },
                                        { $project: { conversation: 0 } },
                                        { $sort: { createdAt: -1 } },
                                    ],
                                    as: "meetings",
                                },
                            },
                        ])];
                case 1:
                    projects = _a.sent();
                    return [4 /*yield*/, meeting_2.aggregateMeeting([
                            {
                                $match: {
                                    meetingType: { $in: [meetingType_1.default.Direct, meetingType_1.default.Primary] },
                                    meetingStartTime: {
                                        $gte: moment_1.default(data.date).toDate(),
                                        $lt: moment_1.default(data.date).add(1, "day").toDate(),
                                    },
                                },
                            },
                            {
                                $lookup: {
                                    from: "conversations",
                                    let: { conversationId: "$conversationId" },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $eq: ["$_id", "$$conversationId"],
                                                },
                                            },
                                        },
                                        {
                                            $project: {
                                                participants: 1,
                                            },
                                        },
                                    ],
                                    as: "conversation",
                                },
                            },
                            {
                                $unwind: {
                                    path: "$conversation",
                                    preserveNullAndEmptyArrays: true,
                                },
                            },
                            {
                                $addFields: {
                                    participants: {
                                        $cond: {
                                            if: {
                                                $or: [
                                                    { $eq: [meetingType_1.default.Conversation, "$meetingType"] },
                                                    { $eq: [meetingType_1.default.Primary, "$meetingType"] },
                                                ],
                                            },
                                            then: "$conversation.participants",
                                            else: "$participants",
                                        },
                                    },
                                },
                            },
                            {
                                $match: {
                                    "participants.id": user._id,
                                },
                            },
                            { $sort: { createdAt: -1 } },
                        ])];
                case 2:
                    directMeeting = _a.sent();
                    // const meetings = await aggregateMeeting([
                    //   {
                    //     $match: {
                    //       $or: [
                    //         { "participants.id": user._id },
                    //         {
                    //           meetingType: {
                    //             $in: [MeetingType.Conversation, MeetingType.Primary],
                    //           },
                    //         },
                    //       ],
                    //       meetingStartTime: {
                    //         $gte: moment(data.date).toDate(),
                    //         $lt: moment(data.date).add(1, "day").toDate(),
                    //       },
                    //     },
                    //   },
                    //   {
                    //     $lookup: {
                    //       from: "employees",
                    //       let: { employeeId: "$employeeId" },
                    //       pipeline: [
                    //         {
                    //           $match: {
                    //             $expr: {
                    //               $eq: ["$_id", "$$employeeId"],
                    //             },
                    //           },
                    //         },
                    //         {
                    //           $project: {
                    //             _id: 1,
                    //             username: 1,
                    //             profileUri: 1,
                    //             number: 1,
                    //           },
                    //         },
                    //       ],
                    //       as: "employee",
                    //     },
                    //   },
                    //   {
                    //     $lookup: {
                    //       from: "customers",
                    //       let: { customerId: "$customerId" },
                    //       pipeline: [
                    //         {
                    //           $match: {
                    //             $expr: {
                    //               $eq: ["$_id", "$$customerId"],
                    //             },
                    //           },
                    //         },
                    //         {
                    //           $project: {
                    //             _id: 1,
                    //             username: 1,
                    //             companyName: 1,
                    //             number: 1,
                    //             profileUri: 1,
                    //           },
                    //         },
                    //       ],
                    //       as: "customer",
                    //     },
                    //   },
                    //   { $sort: { createdAt: -1 } },
                    // ]);
                    console.log("directMee", directMeeting);
                    meetings_1 = [];
                    projects.forEach(function (value) {
                        meetings_1.push.apply(meetings_1, value.meetings);
                    });
                    callback({ status: 200, data: __spreadArrays(meetings_1, directMeeting) });
                    return [3 /*break*/, 4];
                case 3:
                    err_17 = _a.sent();
                    console.log("error", err_17);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function employeeHolidayHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var meetings;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, holiday_1.aggregateHoliday([{ $sort: { createdAt: -1 } }])];
                case 1:
                    meetings = _a.sent();
                    console.log("meetings", meetings, data);
                    socket.emit("employee-holiday-result", meetings);
                    return [2 /*return*/];
            }
        });
    });
}
function assignEmployeeMeeting(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, meeting, project, err_18;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    user = socket.user;
                    return [4 /*yield*/, meeting_2.findMeeting({ _id: data.meetingId })];
                case 1:
                    meeting = _a.sent();
                    if (!meeting) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, project_Service_1.findProject({ _id: meeting.projectId })];
                case 2:
                    project = _a.sent();
                    if (!project) {
                        return [2 /*return*/];
                    }
                    if (!project) {
                        return [2 /*return*/];
                    }
                    if (!(project.primaryEmployee != user._id)) return [3 /*break*/, 3];
                    return [2 /*return*/];
                case 3:
                    meeting.employeeId = data.employeeId;
                    return [4 /*yield*/, meeting.save()];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    err_18 = _a.sent();
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.assignEmployeeMeeting = assignEmployeeMeeting;
function completedLeaveHandler(socket, data, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var employee;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, employee_2.findEmployee({})];
                case 1:
                    employee = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.completedLeaveHandler = completedLeaveHandler;
function sickLeaveHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, employee, err_19;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    user = socket.user;
                    return [4 /*yield*/, employee_2.findEmployee({ _id: user._id })];
                case 1:
                    employee = _a.sent();
                    if (employee) {
                        socket.emit("sick-leave-result", {
                            sickLeave: employee.sickLeave.map(function (value) {
                                //@ts-ignore
                                return __assign(__assign({}, value.toJSON()), { types: Object.fromEntries(value.types) });
                            }),
                            events: employee.holidayRequest.map(function (value) { return (__assign(__assign({}, value.toJSON()), { title: value.reason, start: value.date, end: moment_1.default(value.date).add(1, "day") })); }),
                        });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    err_19 = _a.sent();
                    console.log("err", err_19);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.sickLeaveHandler = sickLeaveHandler;
function employeeSrisudhaHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, employees, admins, data_2, err_20;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    user = socket === null || socket === void 0 ? void 0 : socket.user;
                    return [4 /*yield*/, employee_2.aggregateEmployee([
                            { $match: { _id: { $ne: user._id } } },
                            { $project: { _id: 1, profileUri: 1, username: 1, number: 1 } },
                        ])];
                case 1:
                    employees = _a.sent();
                    return [4 /*yield*/, admin_1.aggregateAdmin([
                            { $project: { _id: 1, profileUri: 1, username: 1, number: 1 } },
                        ])];
                case 2:
                    admins = _a.sent();
                    data_2 = {};
                    admins.forEach(function (value) {
                        data_2[value._id] = {
                            conversationType: conversationType_1.default.Direct,
                            receiverType: sendBy_1.default.Admin,
                            receiverId: value._id,
                            profileUri: value.profileUri,
                            username: value.username,
                        };
                    });
                    employees.forEach(function (value) {
                        data_2[value._id] = {
                            conversationType: conversationType_1.default.Direct,
                            receiverType: sendBy_1.default.Employee,
                            receiverId: value._id,
                            profileUri: value.profileUri,
                            username: value.username,
                        };
                    });
                    socket.emit("employee-srisudha-result", data_2);
                    return [3 /*break*/, 4];
                case 3:
                    err_20 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.employeeSrisudhaHandler = employeeSrisudhaHandler;
function employeeStorageHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, uploads, shared, err_21;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = socket === null || socket === void 0 ? void 0 : socket.user;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, message_model_1.default.find({
                            ownerId: user._id,
                            fileUri: { $exists: true },
                            projectId: { $exists: true },
                        }, {
                            fileName: 1,
                            fileUri: 1,
                            fileSize: 1,
                            fileType: 1,
                            projectId: 1,
                            projectName: 1,
                        }).limit(10)];
                case 2:
                    uploads = _a.sent();
                    return [4 /*yield*/, message_Service_1.aggregateMessage([
                            {
                                $match: {
                                    fileUri: { $exists: true },
                                    projectId: { $exists: true },
                                    ownerId: { $ne: user._id.toString() },
                                    participants: user._id.toString(),
                                },
                            },
                            {
                                $project: {
                                    fileName: 1,
                                    fileUri: 1,
                                    fileSize: 1,
                                    fileType: 1,
                                    projectId: 1,
                                    projectName: 1,
                                    createdAt: 1,
                                },
                            },
                            { $limit: 10 },
                        ])];
                case 3:
                    shared = _a.sent();
                    console.log("upload", uploads);
                    socket.emit("employee-storage-result", { uploads: uploads, shared: shared });
                    return [3 /*break*/, 5];
                case 4:
                    err_21 = _a.sent();
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.employeeStorageHandler = employeeStorageHandler;
function storageProjectHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, projects, err_22;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = socket === null || socket === void 0 ? void 0 : socket.user;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, project_Service_1.aggregateProject([
                            { $match: { "assignedEmployees.employeeId": user._id } },
                            { $sort: { lastUploaded: -1 } },
                            { $project: { name: 1, status: 1, files: 1, lastUploaded: 1 } },
                        ])];
                case 2:
                    projects = _a.sent();
                    socket.emit("employee-storage-project-result", projects);
                    return [3 /*break*/, 4];
                case 3:
                    err_22 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.storageProjectHandler = storageProjectHandler;
function addImportantHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, update, err_23;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = socket === null || socket === void 0 ? void 0 : socket.user;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, employee_2.findAndUpdateEmployee({ _id: user._id }, { $addToSet: { importantFiles: data.messageId } }, { new: true })];
                case 2:
                    update = _a.sent();
                    //@ts-ignore
                    socket.user = update;
                    return [3 /*break*/, 4];
                case 3:
                    err_23 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.addImportantHandler = addImportantHandler;
function removeImportantHandler(socket, data) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var user, important, err_24;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    user = socket === null || socket === void 0 ? void 0 : socket.user;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    important = (_a = user === null || user === void 0 ? void 0 : user.importantFiles) === null || _a === void 0 ? void 0 : _a.filter(function (value) { return value.toString() != data.messageId; });
                    user.importantFiles = important;
                    //@ts-ignore
                    socket.user = user;
                    return [4 /*yield*/, user.save()];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_24 = _b.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.removeImportantHandler = removeImportantHandler;
function storageImportantImageHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, data_3, err_25;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = socket === null || socket === void 0 ? void 0 : socket.user;
                    console.log("user", user);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, employee_1.default.findOne({ _id: user._id }).populate("importantFiles", {
                            fileName: 1,
                            fileUri: 1,
                            fileSize: 1,
                            createdAt: 1,
                            ownerId: 1,
                            ownerName: 1,
                            fileType: 1,
                            projectId: 1,
                            projectName: 1,
                        })];
                case 2:
                    data_3 = _a.sent();
                    console.log("projectId", user);
                    socket.emit("employee-storage-important-image-result", data_3 === null || data_3 === void 0 ? void 0 : data_3.importantFiles);
                    return [3 /*break*/, 4];
                case 3:
                    err_25 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.storageImportantImageHandler = storageImportantImageHandler;
function storageProjectImageHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, projects, err_26;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = socket === null || socket === void 0 ? void 0 : socket.user;
                    console.log("projectId", data);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, message_Service_1.aggregateMessage([
                            { $match: { projectId: data.projectId } },
                            {
                                $project: {
                                    fileName: 1,
                                    fileUri: 1,
                                    fileSize: 1,
                                    createdAt: 1,
                                    ownerId: 1,
                                    ownerName: 1,
                                    fileType: 1,
                                    projectId: 1,
                                    projectName: 1,
                                },
                            },
                        ])];
                case 2:
                    projects = _a.sent();
                    console.log("images", projects);
                    socket.emit("employee-storage-project-image-result", projects);
                    return [3 /*break*/, 4];
                case 3:
                    err_26 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.storageProjectImageHandler = storageProjectImageHandler;
function imageDetailHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, favorite, images, err_27;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = socket === null || socket === void 0 ? void 0 : socket.user;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    favorite = user.importantFiles.find(function (value) { return value.toString() == data.messageId; });
                    return [4 /*yield*/, message_Service_1.aggregateMessage([
                            {
                                $match: {
                                    _id: new mongoose_1.default.Types.ObjectId(data.messageId),
                                    participants: user._id.toString(),
                                },
                            },
                        ])];
                case 2:
                    images = _a.sent();
                    console.log("images from detail", images[0], favorite, user.importantFiles);
                    socket.emit("employee-image-detail-result", __assign(__assign({}, images[0]), { favorite: favorite ? true : false }));
                    return [3 /*break*/, 4];
                case 3:
                    err_27 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.imageDetailHandler = imageDetailHandler;
function employeeTaskDetailHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var tasks, model, taskDetail, comments, err_28;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tasks = [];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    if (!mongoose_1.default.isValidObjectId(data.taskId)) return [3 /*break*/, 4];
                    model = task_model_1.default;
                    if (data.type == "personal") {
                        model = selfTask_1.default;
                    }
                    return [4 /*yield*/, model
                            .findOne({ _id: data.taskId })
                            .populate("assignedEmployee", {
                            username: 1,
                            number: 1,
                            email: 1,
                            _id: 1,
                            profileUri: 1,
                        })];
                case 2:
                    taskDetail = _a.sent();
                    return [4 /*yield*/, comment_1.default.find({
                            taskId: data.taskId,
                            parent: true,
                        }).populate({
                            path: "threads",
                            populate: { path: "threads" },
                        })];
                case 3:
                    comments = _a.sent();
                    console.log("comments", comments, taskDetail);
                    socket.emit("employee-task-detail-result", {
                        comments: comments,
                        taskDetail: taskDetail,
                    });
                    return [3 /*break*/, 5];
                case 4: return [2 /*return*/];
                case 5: return [3 /*break*/, 7];
                case 6:
                    err_28 = _a.sent();
                    console.log("err", err_28);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function searchEmployeeHandler(socket) {
    return __awaiter(this, void 0, void 0, function () {
        var employees;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, employee_2.aggregateEmployee([
                        { $match: {} },
                        { $project: { _id: 1, profileUri: 1, number: 1, username: 1 } },
                        {
                            $lookup: {
                                from: "tasks",
                                let: { assignedEmployee: "$_id" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $eq: ["$assignedEmployee", "$$assignedEmployee"],
                                            },
                                        },
                                    },
                                    {
                                        $project: { status: 1 },
                                    },
                                ],
                                as: "tasks",
                            },
                        },
                        {
                            $addFields: {
                                status: {
                                    $reduce: {
                                        input: "$tasks",
                                        initialValue: {
                                            pending: 0,
                                            initiated: 0,
                                        },
                                        in: {
                                            $switch: {
                                                branches: [
                                                    {
                                                        case: { $eq: ["$$this.status", taskStatus_2.default.Ongoing] },
                                                        then: {
                                                            pending: {
                                                                $add: ["$$value.pending", 1],
                                                            },
                                                            initiated: "$$value.initiated",
                                                        },
                                                    },
                                                    {
                                                        case: { $eq: ["$$this.status", taskStatus_2.default.Initiated] },
                                                        then: {
                                                            initiated: {
                                                                $add: ["$$value.initiated", 1],
                                                            },
                                                            pending: "$$value.pending",
                                                        },
                                                    },
                                                ],
                                                default: "$$value",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        { $project: { tasks: 0 } },
                    ])];
                case 1:
                    employees = _a.sent();
                    socket.emit("employee-search-employee-result", employees);
                    return [2 /*return*/];
            }
        });
    });
}
function searchCustomerHandler(socket) {
    return __awaiter(this, void 0, void 0, function () {
        var customers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, customer_1.aggregateCustomer([
                        {
                            $lookup: {
                                from: "projects",
                                let: { customerId: "$_id" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $and: [
                                                    { $eq: ["$customerId", "$$customerId"] },
                                                    {
                                                        $or: [
                                                            { $eq: ["$status", taskStatus_2.default.Initiated] },
                                                            { $eq: ["$status", taskStatus_2.default.Ongoing] },
                                                        ],
                                                    },
                                                ],
                                            },
                                        },
                                    },
                                    {
                                        $project: { status: 1 },
                                    },
                                ],
                                as: "projects",
                            },
                        },
                        {
                            $addFields: { project: { $size: "$projects" } },
                        },
                        {
                            $project: {
                                project: 1,
                                companyName: 1,
                                profileUri: 1,
                                _id: 1,
                                number: 1,
                            },
                        },
                    ])];
                case 1:
                    customers = _a.sent();
                    socket.emit("employee-search-customer-result", customers);
                    return [2 /*return*/];
            }
        });
    });
}
function employeeProjectHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, project;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = socket === null || socket === void 0 ? void 0 : socket.user;
                    return [4 /*yield*/, project_Service_1.aggregateProject([
                            { $match: { "assignedEmployees.employeeId": user._id } },
                            {
                                $addFields: {
                                    primary: {
                                        $cond: {
                                            if: {
                                                $eq: [user._id, "$primaryEmployee"],
                                            },
                                            then: true,
                                            else: false,
                                        },
                                    },
                                },
                            },
                            {
                                $lookup: {
                                    from: "employees",
                                    let: { employeeId: "$primaryEmployee" },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $eq: ["$_id", "$$employeeId"],
                                                },
                                            },
                                        },
                                        {
                                            $project: {
                                                _id: 1,
                                                username: 1,
                                                profileUri: 1,
                                                number: 1,
                                            },
                                        },
                                    ],
                                    as: "primaryEmployee",
                                },
                            },
                            { $unwind: { path: "$primaryEmployee", preserveNullAndEmptyArrays: true } },
                            { $sort: { createdAt: -1 } },
                        ])];
                case 1:
                    project = _a.sent();
                    console.log(project);
                    socket.emit("employee-project-result", project);
                    return [2 /*return*/];
            }
        });
    });
}
function initialEmployeeDataHandler(socket) {
    return __awaiter(this, void 0, void 0, function () {
        var user, branches, templates, employees, admins, err_29;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    user = socket.user;
                    return [4 /*yield*/, branch_service_1.aggregateBranch([{ $match: {} }])];
                case 1:
                    branches = _a.sent();
                    return [4 /*yield*/, template_service_1.aggregateTemplate([{ $match: {} }])];
                case 2:
                    templates = _a.sent();
                    return [4 /*yield*/, employee_2.aggregateEmployee([
                            { $match: { _id: { $ne: user._id } } },
                        ])];
                case 3:
                    employees = _a.sent();
                    return [4 /*yield*/, admin_1.aggregateAdmin([{ $match: {} }])];
                case 4:
                    admins = _a.sent();
                    socket.emit("initial-data-result", {
                        employees: employees,
                        branches: branches,
                        templates: templates,
                        admins: admins,
                    });
                    return [3 /*break*/, 6];
                case 5:
                    err_29 = _a.sent();
                    console.log("error", err_29);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.initialEmployeeDataHandler = initialEmployeeDataHandler;
function employeeTaskHandler(socket, data) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var tasks, user, projectDetail, match;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tasks = [];
                    user = socket.user;
                    if (!mongoose_1.default.isValidObjectId(data.projectId)) return [3 /*break*/, 3];
                    return [4 /*yield*/, project_Service_1.aggregateProject([
                            { $match: { _id: new mongoose_1.default.Types.ObjectId(data.projectId) } },
                            {
                                $addFields: {
                                    primary: {
                                        $cond: {
                                            if: {
                                                $eq: [user._id, "$primaryEmployee"],
                                            },
                                            then: true,
                                            else: false,
                                        },
                                    },
                                },
                            },
                            {
                                $lookup: {
                                    from: "employees",
                                    let: { employeeId: "$primaryEmployee" },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $eq: ["$_id", "$$employeeId"],
                                                },
                                            },
                                        },
                                        {
                                            $project: {
                                                _id: 1,
                                                username: 1,
                                                profileUri: 1,
                                                number: 1,
                                            },
                                        },
                                    ],
                                    as: "primaryEmployee",
                                },
                            },
                            {
                                $unwind: { path: "$primaryEmployee", preserveNullAndEmptyArrays: true },
                            },
                            {
                                $lookup: {
                                    from: "tasks",
                                    let: { projectId: "$_id" },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $eq: ["$projectId", "$$projectId"],
                                                },
                                            },
                                        },
                                        {
                                            $project: { status: 1, assignedEmployee: 1 },
                                        },
                                        { $group: { _id: "$assignedEmployee" } },
                                        {
                                            $lookup: {
                                                from: "employees",
                                                let: { employeeId: "$_id" },
                                                pipeline: [
                                                    {
                                                        $match: {
                                                            $expr: {
                                                                $eq: ["$_id", "$$employeeId"],
                                                            },
                                                        },
                                                    },
                                                    {
                                                        $project: { username: 1, profileUri: 1, _id: 1, number: 1 },
                                                    },
                                                ],
                                                as: "details",
                                            },
                                        },
                                        { $unwind: "$details" },
                                    ],
                                    as: "employees",
                                },
                            },
                        ])];
                case 1:
                    projectDetail = _b.sent();
                    match = {};
                    if (!((_a = projectDetail === null || projectDetail === void 0 ? void 0 : projectDetail[0]) === null || _a === void 0 ? void 0 : _a.primary)) {
                        match["assignedEmployee"] = user._id;
                    }
                    return [4 /*yield*/, task_1.aggregateTask([
                            {
                                $match: __assign({ projectId: new mongoose_1.default.Types.ObjectId(data.projectId) }, match),
                            },
                            { $sort: { createdAt: -1 } },
                            {
                                $lookup: {
                                    from: "employees",
                                    let: { employeeId: "$assignedEmployee" },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $eq: ["$_id", "$$employeeId"],
                                                },
                                            },
                                        },
                                        {
                                            $project: {
                                                _id: 1,
                                                username: 1,
                                                profileUri: 1,
                                                number: 1,
                                            },
                                        },
                                    ],
                                    as: "assignedEmployee",
                                },
                            },
                            {
                                $unwind: {
                                    path: "$assignedEmployee",
                                    preserveNullAndEmptyArrays: true,
                                },
                            },
                        ])];
                case 2:
                    tasks = _b.sent();
                    console.log("projectDetail", projectDetail[0]);
                    socket.emit("employee-task-result", {
                        tasks: tasks,
                        projectDetail: projectDetail[0],
                    });
                    return [3 /*break*/, 4];
                case 3: return [2 /*return*/];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function employeeMeetingHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, project, primary, filter, meetings;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = socket.user;
                    return [4 /*yield*/, project_Service_1.findProject({ _id: data.projectId })];
                case 1:
                    project = _a.sent();
                    if (!project) {
                        return [2 /*return*/];
                    }
                    primary = project.primaryEmployee == user._id;
                    filter = {};
                    if (!primary) {
                        filter["employeeId"] = user._id;
                    }
                    return [4 /*yield*/, meeting_2.aggregateMeeting([
                            {
                                $match: __assign({ projectId: new mongoose_1.default.Types.ObjectId(data.projectId) }, filter),
                            },
                            {
                                $lookup: {
                                    from: "employees",
                                    let: { employeeId: "$employeeId" },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $eq: ["$_id", "$$employeeId"],
                                                },
                                            },
                                        },
                                        {
                                            $project: {
                                                _id: 1,
                                                username: 1,
                                                profileUri: 1,
                                                number: 1,
                                            },
                                        },
                                    ],
                                    as: "employee",
                                },
                            },
                            {
                                $lookup: {
                                    from: "customers",
                                    let: { customerId: "$customerId" },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $eq: ["$_id", "$$customerId"],
                                                },
                                            },
                                        },
                                        {
                                            $project: {
                                                _id: 1,
                                                username: 1,
                                                companyName: 1,
                                                number: 1,
                                                profileUri: 1,
                                            },
                                        },
                                    ],
                                    as: "customer",
                                },
                            },
                            {
                                $lookup: {
                                    from: "conversations",
                                    let: { conversationId: "$conversationId" },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $eq: ["$_id", "$$conversationId"],
                                                },
                                            },
                                        },
                                        {
                                            $project: {
                                                participants: 1,
                                            },
                                        },
                                    ],
                                    as: "conversation",
                                },
                            },
                            {
                                $unwind: {
                                    path: "$conversation",
                                    preserveNullAndEmptyArrays: true,
                                },
                            },
                            {
                                $addFields: {
                                    participants: "$conversation.participants",
                                },
                            },
                            { $sort: { createdAt: -1 } },
                        ])];
                case 2:
                    meetings = _a.sent();
                    console.log(meetings);
                    socket.emit("employee-project-meeting-result", meetings);
                    return [2 /*return*/];
            }
        });
    });
}
function addAttendanceHandler(socket, data) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var user, currentDate, dateCheck, attendance, employee, err_30;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 9, , 10]);
                    user = socket.user;
                    currentDate = new Date();
                    dateCheck = new Date(currentDate.getUTCFullYear + "-" + currentDate.getUTCMonth + "-" + currentDate.getUTCDate);
                    return [4 /*yield*/, attendance_2.findAttendance({ date: dateCheck })];
                case 1:
                    attendance = _b.sent();
                    if (!attendance) return [3 /*break*/, 7];
                    if (!(attendance.attendanceType == attendanceType_1.default.Normal)) return [3 /*break*/, 5];
                    return [4 /*yield*/, attendance_2.findAttendance({
                            date: dateCheck,
                            "attendance.employeeId": user._id,
                        })];
                case 2:
                    employee = _b.sent();
                    if (!!employee) return [3 /*break*/, 4];
                    attendance.attendance.push({
                        employeeId: user._id,
                        time: new Date(),
                        approved: holidayStatus_1.default.Pending,
                    });
                    return [4 /*yield*/, attendance.save()];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5: throw new customError_1.default("Bad Request", 404, "Hey enjoy, today is " + (attendance.attendanceType == attendanceType_1.default.Weekend
                    ? "Weekend"
                    : "holiday"));
                case 6: return [3 /*break*/, 8];
                case 7: throw new customError_1.default("Bad Request", 404, "Attendance Not started yet");
                case 8:
                    (_a = serverStore_1.getSocketServerInstance()) === null || _a === void 0 ? void 0 : _a.to(serverStore_1.getActiveAdmins()).emit("New Attendance Added", {
                        employeeId: user._id,
                        time: new Date(),
                        approved: false,
                    });
                    return [3 /*break*/, 10];
                case 9:
                    err_30 = _b.sent();
                    checkErrors_1.socketError(err_30, socket, "add-attendance-response");
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialEmployeeDataHandler = exports.imageDetailHandler = exports.storageProjectImageHandler = exports.storageImportantImageHandler = exports.removeImportantHandler = exports.addImportantHandler = exports.storageProjectHandler = exports.employeeStorageHandler = exports.employeeSrisudhaHandler = exports.sickLeaveHandler = exports.assignEmployeeMeeting = exports.employeeSocketHandler = void 0;
var moment_1 = __importDefault(require("moment"));
var mongoose_1 = __importDefault(require("mongoose"));
var serverStore_1 = require("../../../socket/serverStore");
var attendanceType_1 = __importDefault(require("../enums/attendanceType"));
var conversationType_1 = __importDefault(require("../enums/conversationType"));
var holidayStatus_1 = __importDefault(require("../enums/holidayStatus"));
var meetingStatus_1 = __importDefault(require("../enums/meetingStatus"));
var sendBy_1 = __importDefault(require("../enums/sendBy"));
var taskStatus_1 = __importDefault(require("../enums/taskStatus"));
var checkErrors_1 = require("../helpers/checkErrors");
var customError_1 = __importDefault(require("../helpers/customError"));
var attendance_1 = __importDefault(require("../models/attendance"));
var comment_1 = __importDefault(require("../models/comment"));
var employee_1 = __importDefault(require("../models/employee"));
var meeting_1 = __importDefault(require("../models/meeting"));
var message_model_1 = __importDefault(require("../models/message.model"));
var task_model_1 = __importDefault(require("../models/task.model"));
var admin_1 = require("../services/admin");
var attendance_2 = require("../services/attendance");
var branch_service_1 = require("../services/branch.service");
var customer_1 = require("../services/customer");
var employee_2 = require("../services/employee");
var holiday_1 = require("../services/holiday");
var meeting_2 = require("../services/meeting");
var message_Service_1 = require("../services/message.Service");
var project_Service_1 = require("../services/project.Service");
var task_1 = require("../services/task");
var template_service_1 = require("../services/template.service");
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
        socket.on("employee-date-meeting", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, employeeMeetingDateHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    }
}
exports.employeeSocketHandler = employeeSocketHandler;
function markAttendanceHandler(socket, data, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var user_1, attendance, value, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    user_1 = socket.user;
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
                    value = attendance.attendance.find(function (value) { return value.employeeId == user_1._id; });
                    if (!!value) return [3 /*break*/, 3];
                    attendance.attendance.push({
                        employeeId: user_1._id,
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
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function dashboardHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user_2, allProjects, projects_1, meetings, attendance, holiday, value, attendanceType, customers, holidays, monthly_1, monthlyAttendance, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    user_2 = socket.user;
                    return [4 /*yield*/, project_Service_1.aggregateProject([
                            { $match: { primaryEmployee: user_2._id } },
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
                            _id: user_2._id,
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
                            value = attendance.attendance.find(function (value) { return value.employeeId == user_2._id; });
                        }
                        attendanceType = attendance.attendanceType;
                    }
                    return [4 /*yield*/, customer_1.findAllCustomer({ assignedEmployee: user_2._id }, { profileUri: 1, companyName: 1, number: 1, firstname: 1, lastname: 1 })];
                case 5:
                    customers = _a.sent();
                    return [4 /*yield*/, employee_2.aggregateEmployee([
                            { $match: { _id: user_2._id } },
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
                                    employeeId: user_2._id,
                                },
                            },
                        })];
                case 7:
                    monthlyAttendance = _a.sent();
                    monthly_1.attendance = monthlyAttendance;
                    socket.emit("employee-dashboard-result", {
                        meetings: meetings,
                        holiday: holiday,
                        monthly: monthly_1,
                        customers: customers,
                        attendance: value,
                        //@ts-ignore
                        attendanceType: attendanceType,
                        projects: projects_1,
                    });
                    return [3 /*break*/, 9];
                case 8:
                    err_2 = _a.sent();
                    console.log("err", err_2);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
function confirmMeetingHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, err_3;
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
                    err_3 = _a.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function employeeMeetingDateHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, projects, meetings_1, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
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
                                        { $sort: { createdAt: -1 } },
                                    ],
                                    as: "meetings",
                                },
                            },
                        ])];
                case 1:
                    projects = _a.sent();
                    console.log(projects);
                    meetings_1 = [];
                    projects.forEach(function (value) {
                        meetings_1.push.apply(meetings_1, value.meetings);
                    });
                    console.log("meetings", meetings_1);
                    socket.emit("employee-date-meeting-result", meetings_1);
                    return [3 /*break*/, 3];
                case 2:
                    err_4 = _a.sent();
                    console.log("error", err_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
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
        var user, meeting, project, err_5;
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
                    err_5 = _a.sent();
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.assignEmployeeMeeting = assignEmployeeMeeting;
function sickLeaveHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, employee, err_6;
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
                    err_6 = _a.sent();
                    console.log("err", err_6);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.sickLeaveHandler = sickLeaveHandler;
function employeeSrisudhaHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, employees, admins, data_1, err_7;
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
                    data_1 = {};
                    admins.forEach(function (value) {
                        data_1[value._id] = {
                            conversationType: conversationType_1.default.Direct,
                            receiverType: sendBy_1.default.Admin,
                            receiverId: value._id,
                            profileUri: value.profileUri,
                            username: value.username,
                        };
                    });
                    employees.forEach(function (value) {
                        data_1[value._id] = {
                            conversationType: conversationType_1.default.Direct,
                            receiverType: sendBy_1.default.Employee,
                            receiverId: value._id,
                            profileUri: value.profileUri,
                            username: value.username,
                        };
                    });
                    socket.emit("employee-srisudha-result", data_1);
                    return [3 /*break*/, 4];
                case 3:
                    err_7 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.employeeSrisudhaHandler = employeeSrisudhaHandler;
function employeeStorageHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, uploads, shared, err_8;
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
                    err_8 = _a.sent();
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.employeeStorageHandler = employeeStorageHandler;
function storageProjectHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, projects, err_9;
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
                    err_9 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.storageProjectHandler = storageProjectHandler;
function addImportantHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, update, err_10;
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
                    err_10 = _a.sent();
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
        var user, important, err_11;
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
                    err_11 = _b.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.removeImportantHandler = removeImportantHandler;
function storageImportantImageHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, data_2, err_12;
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
                    data_2 = _a.sent();
                    console.log("projectId", user);
                    socket.emit("employee-storage-important-image-result", data_2 === null || data_2 === void 0 ? void 0 : data_2.importantFiles);
                    return [3 /*break*/, 4];
                case 3:
                    err_12 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.storageImportantImageHandler = storageImportantImageHandler;
function storageProjectImageHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, projects, err_13;
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
                    err_13 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.storageProjectImageHandler = storageProjectImageHandler;
function imageDetailHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, favorite, images, err_14;
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
                    err_14 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.imageDetailHandler = imageDetailHandler;
function employeeTaskDetailHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var tasks, taskDetail, comments, err_15;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tasks = [];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    if (!mongoose_1.default.isValidObjectId(data.taskId)) return [3 /*break*/, 4];
                    return [4 /*yield*/, task_model_1.default.findOne({ _id: data.taskId }).populate("assignedEmployee", {
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
                    err_15 = _a.sent();
                    console.log("err", err_15);
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
                                                        case: { $eq: ["$$this.status", taskStatus_1.default.Ongoing] },
                                                        then: {
                                                            pending: {
                                                                $add: ["$$value.pending", 1],
                                                            },
                                                            initiated: "$$value.initiated",
                                                        },
                                                    },
                                                    {
                                                        case: { $eq: ["$$this.status", taskStatus_1.default.Initiated] },
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
                                                            { $eq: ["$status", taskStatus_1.default.Initiated] },
                                                            { $eq: ["$status", taskStatus_1.default.Ongoing] },
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
        var branches, templates, employees, admins, err_16;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, branch_service_1.aggregateBranch([{ $match: {} }])];
                case 1:
                    branches = _a.sent();
                    return [4 /*yield*/, template_service_1.aggregateTemplate([{ $match: {} }])];
                case 2:
                    templates = _a.sent();
                    return [4 /*yield*/, employee_2.aggregateEmployee([{ $match: {} }])];
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
                    err_16 = _a.sent();
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
                            { $unwind: "$primaryEmployee" },
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
        var user, currentDate, dateCheck, attendance, employee, err_17;
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
                    err_17 = _b.sent();
                    checkErrors_1.socketError(err_17, socket, "add-attendance-response");
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}

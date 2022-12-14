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
exports.addInvoiceData = exports.addQuotationData = exports.addInvoiceHandler = exports.addTemplateHandler = exports.addBranchHandler = exports.sendConversationHandler = exports.addProjectHandler = exports.updateSocketProjectPrimaryEmployee = exports.addSocketProjectHandler = exports.deleteSocketProjectHandler = exports.addConversationHandler = exports.updateConversationHandler = exports.deleteConversationHandler = exports.initialDataHandler = exports.updateProjectStatusHandler = exports.imageDetailHandler = exports.storageProjectImageHandler = exports.storageImportantImageHandler = exports.removeImportantHandler = exports.addImportantHandler = exports.storageProjectHandler = exports.employeeStorageHandler = exports.employeeSrisudhaHandler = exports.assignEmployeeMeeting = exports.startAttendanceHandler = exports.sickLeaveHandler = exports.denyAttendanceHandler = exports.adminBranchHandler = exports.approveAttendanceHandler = exports.employeeTasksHandler = exports.addSickHandler = exports.denyLeaveHandler = exports.approveLeaveHandler = exports.employeeMonthlyReportHandler = exports.verifyKycHandler = exports.adminProjectReport = exports.completeMeetingHandler = exports.cancelMeetingHandler = exports.employeeDailyReport = exports.updateLinkHandler = exports.adminDeleteLink = exports.adminToggleLink = exports.adminAddLink = exports.adminSocketHandler = void 0;
var moment_1 = __importDefault(require("moment"));
var mongoose_1 = __importDefault(require("mongoose"));
var serverStore_1 = require("../../../socket/serverStore");
var attendanceType_1 = __importDefault(require("../enums/attendanceType"));
var conversationType_1 = __importDefault(require("../enums/conversationType"));
var holidayStatus_1 = __importDefault(require("../enums/holidayStatus"));
var invoiceType_1 = __importDefault(require("../enums/invoiceType"));
var paymentStatus_1 = __importDefault(require("../enums/paymentStatus"));
var quotationType_enum_1 = __importDefault(require("../enums/quotationType.enum"));
var sendBy_1 = __importDefault(require("../enums/sendBy"));
var taskStatus_1 = __importDefault(require("../enums/taskStatus"));
var customError_1 = __importDefault(require("../helpers/customError"));
var admin_1 = __importDefault(require("../models/admin"));
var comment_1 = __importDefault(require("../models/comment"));
var meeting_1 = __importDefault(require("../models/meeting"));
var message_model_1 = __importDefault(require("../models/message.model"));
var task_model_1 = __importDefault(require("../models/task.model"));
var admin_2 = require("../services/admin");
var attendance_1 = require("../services/attendance");
var branch_service_1 = require("../services/branch.service");
var customer_1 = require("../services/customer");
var employee_1 = require("../services/employee");
var holiday_1 = require("../services/holiday");
var invoice_service_1 = require("../services/invoice.service");
var meeting_2 = require("../services/meeting");
var message_Service_1 = require("../services/message.Service");
var project_Service_1 = require("../services/project.Service");
var quotation_Service_1 = require("../services/quotation.Service");
var setting_service_1 = require("../services/setting.service");
var task_1 = require("../services/task");
var template_service_1 = require("../services/template.service");
var meetingType_1 = __importDefault(require("../enums/meetingType"));
var projectReport_1 = __importDefault(require("../enums/projectReport"));
var meetingStatus_1 = __importDefault(require("../enums/meetingStatus"));
var link_model_1 = require("../models/link.model");
var link_service_1 = require("../services/link.service");
function adminSocketHandler(socket) {
    var _this = this;
    //@ts-ignore
    if (socket.type == sendBy_1.default.Admin) {
        socket.on("admin-project", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, adminProjectHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("admin-dashboard", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, dashboardHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("admin-project-meeting", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, adminMeetingHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("admin-task", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, adminTaskHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("admin-start-attendance", function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, startAttendanceHandler(socket, data, callback)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("add-employee-leave", function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, addSickHandler(socket, data, callback)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("approve-attendance", function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, approveAttendanceHandler(socket, data, callback)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("deny-attendance", function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, denyAttendanceHandler(socket, data, callback)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("approve-leave", function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, approveLeaveHandler(socket, data, callback)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("employee-leave", function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, employeeLeaveHandler(socket, data, callback)];
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
        socket.on("employee-monthly-report", function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, employeeMonthlyReportHandler(socket, data, callback)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("deny-leave", function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, denyLeaveHandler(socket, data, callback)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("admin-branch", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, adminBranchHandler(socket)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("employee-task", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, employeeTasksHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("admin-task-detail", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, adminTaskDetailHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("admin-employee", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, adminEmployeeHandler(socket)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("admin-employee-detail", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, employeeDetailHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("admin-customer", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, adminCustomerHandler(socket)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("admin-search-customer", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, searchCustomerHandler(socket)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("admin-search-employee", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, searchEmployeeHandler(socket)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("admin-invoice", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, adminInvoiceHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("admin-verify-kyc", function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, verifyKycHandler(socket, data, callback)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("admin-daily-report", function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, employeeDailyReport(socket, data, callback)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("admin-project-report", function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, adminProjectReport(socket, data, callback)];
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
        socket.on("admin-save-setting", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, adminSaveSettingHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("admin-storage", function (data) { return __awaiter(_this, void 0, void 0, function () {
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
        socket.on("admin-storage-project", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, storageProjectHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("admin-storage-project-image", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, storageProjectImageHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("admin-storage-important-image", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, storageImportantImageHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("admin-add-important-image", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, addImportantHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("admin-remove-important-image", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, removeImportantHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("admin-date-meeting", function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, adminMeetingDateHandler(socket, data, callback)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("admin-date-leave", function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, adminLeaveDateHandler(socket, data, callback)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("admin-add-link", function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, adminAddLink(socket, data, callback)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("admin-toggle-link", function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, adminToggleLink(socket, data, callback)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("admin-delete-link", function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, adminDeleteLink(socket, data, callback)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("admin-update-link", function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, updateLinkHandler(socket, data, callback)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("admin-date-attendance", function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, adminAttendanceDateHandler(socket, data, callback)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("admin-setting", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, adminGetSettingHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
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
        socket.on("employee-attendance", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, adminEmployeeAttendanceHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("admin-image-detail", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, imageDetailHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("admin-holiday", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, adminHolidayHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("admin-complete-meeting", function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, completeMeetingHandler(socket, data, callback)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("admin-cancel-meeting", function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, cancelMeetingHandler(socket, data, callback)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    }
}
exports.adminSocketHandler = adminSocketHandler;
function adminAddLink(socket, data, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var user, link, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    user = socket.user;
                    return [4 /*yield*/, link_service_1.createLink(__assign(__assign({}, data), { ownerId: user._id, ownerType: sendBy_1.default.Admin, hide: false }))];
                case 1:
                    link = _a.sent();
                    // console.log("timeLogs", timeLogs);
                    callback({ status: 200, data: link });
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    callback({ status: 500, message: err_1.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.adminAddLink = adminAddLink;
function adminToggleLink(socket, data, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var user, link, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    user = socket.user;
                    return [4 /*yield*/, link_service_1.findLink({
                            $or: [{ type: link_model_1.LinkOwned.All }, { ownerId: user._id }],
                            _id: data.linkId,
                        })];
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
                    err_2 = _a.sent();
                    callback({ status: 400, message: err_2 === null || err_2 === void 0 ? void 0 : err_2.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.adminToggleLink = adminToggleLink;
function adminDeleteLink(socket, data, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var user, link, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    user = socket.user;
                    return [4 /*yield*/, link_service_1.findAndDeleteLink({
                            $or: [{ type: link_model_1.LinkOwned.All }, { ownerId: user._id }],
                            _id: data.linkId,
                        })];
                case 1:
                    link = _a.sent();
                    if (!link) {
                        throw new customError_1.default("Bad request", 404, "No such Link found");
                    }
                    callback({
                        status: 200,
                        data: "link successfully deleted",
                    });
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _a.sent();
                    callback({ status: 400, message: err_3 === null || err_3 === void 0 ? void 0 : err_3.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.adminDeleteLink = adminDeleteLink;
function updateLinkHandler(socket, data, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var user, link, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    user = socket.user;
                    return [4 /*yield*/, link_service_1.findAndUpdateLink({
                            $or: [{ type: link_model_1.LinkOwned.All }, { ownerId: user._id }],
                            _id: data.linkId,
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
                    err_4 = _a.sent();
                    callback({ status: 400, message: err_4 === null || err_4 === void 0 ? void 0 : err_4.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updateLinkHandler = updateLinkHandler;
function employeeDailyReport(socket, data, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var date, timeLogs, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    date = moment_1.default(data.date).startOf("day");
                    console.log("data", data.date);
                    return [4 /*yield*/, task_1.aggregateTask([
                            {
                                $match: {
                                    // createdAt: { $lte: date.toDate() },
                                    "timeLog.employeeId": data.employeeId,
                                },
                            },
                            { $unwind: "$timeLog" },
                            {
                                $replaceRoot: {
                                    newRoot: {
                                        $mergeObjects: [{ taskId: "$_id", taskName: "$name" }, "$timeLog"],
                                    },
                                },
                            },
                            {
                                $match: {
                                    employeeId: data.employeeId,
                                    $or: [
                                        {
                                            endTime: {
                                                $gte: date.toDate(),
                                                $lt: moment_1.default(date).add(1, "day").toDate(),
                                            },
                                        },
                                        { endTime: { $exists: false } },
                                    ],
                                },
                            },
                        ])];
                case 1:
                    timeLogs = _a.sent();
                    // console.log("timeLogs", timeLogs);
                    callback({ status: 200, data: timeLogs });
                    return [3 /*break*/, 3];
                case 2:
                    err_5 = _a.sent();
                    console.log(err_5);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.employeeDailyReport = employeeDailyReport;
function cancelMeetingHandler(socket, data, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var meeting, err_6;
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
                    err_6 = _a.sent();
                    callback({ status: 400, message: err_6 === null || err_6 === void 0 ? void 0 : err_6.message });
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.cancelMeetingHandler = cancelMeetingHandler;
function completeMeetingHandler(socket, data, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var meeting, err_7;
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
                    err_7 = _a.sent();
                    callback({ status: 400, message: err_7 === null || err_7 === void 0 ? void 0 : err_7.message });
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.completeMeetingHandler = completeMeetingHandler;
function adminProjectReport(socket, data, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var value, tasks, err_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    console.log("data", data);
                    if (!(data.view == projectReport_1.default.Employee)) return [3 /*break*/, 2];
                    return [4 /*yield*/, task_1.aggregateTask([
                            { $match: { projectId: new mongoose_1.default.Types.ObjectId(data.projectId) } },
                            { $unwind: "$timeLog" },
                            {
                                $replaceRoot: {
                                    newRoot: {
                                        $mergeObjects: [{ taskId: "$_id" }, "$timeLog"],
                                    },
                                },
                            },
                            { $group: { _id: "$employeeId", timeLogs: { $push: "$$ROOT" } } },
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
                        ])];
                case 1:
                    value = _a.sent();
                    console.log("response", value);
                    callback({ status: 200, data: value });
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, task_1.aggregateTask([
                        {
                            $match: {
                                projectId: new mongoose_1.default.Types.ObjectId(data.projectId),
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
                        { $addFields: { "timeLog.employee": "$employee" } },
                        {
                            $group: {
                                _id: { id: "$_id", name: "$name", status: "$status" },
                                timeLogs: { $push: "$timeLog" },
                            },
                        },
                    ])];
                case 3:
                    tasks = _a.sent();
                    console.log("tasks", JSON.stringify(tasks[0].timeLogs));
                    callback({ status: 200, data: tasks });
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    err_8 = _a.sent();
                    console.log("mes", err_8);
                    //@ts-ignore
                    callback({ status: 400, message: err_8.message });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.adminProjectReport = adminProjectReport;
function verifyKycHandler(socket, data, callback) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var customer, connection, err_9;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, customer_1.findCustomer({ _id: data.customerId })];
                case 1:
                    customer = _b.sent();
                    if (!customer || !(customer === null || customer === void 0 ? void 0 : customer.kycDetails)) {
                        throw new customError_1.default("Bad Request", 404, "customer didnot submit any kyc details");
                    }
                    customer.kycVerified = true;
                    return [4 /*yield*/, customer.save()];
                case 2:
                    _b.sent();
                    connection = serverStore_1.getActiveConnections(data.customerId);
                    (_a = serverStore_1.getSocketServerInstance()) === null || _a === void 0 ? void 0 : _a.to(connection).emit("kyc-verify");
                    callback({ status: 200, message: "Kyc successfully verified" });
                    return [3 /*break*/, 4];
                case 3:
                    err_9 = _b.sent();
                    //@ts-ignore
                    callback({ status: 400, message: err_9.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.verifyKycHandler = verifyKycHandler;
function employeeMonthlyReportHandler(socket, data, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var date_1, employee, query, attendances, markAttendance, holidays, sickLeave, hours, seconds, err_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    console.log("data", data.date, moment_1.default(data.date).startOf("month"));
                    date_1 = moment_1.default(data.date).startOf("month");
                    return [4 /*yield*/, employee_1.findEmployee({ _id: data.employeeId })];
                case 1:
                    employee = _a.sent();
                    if (!employee) {
                        throw new customError_1.default("Bad Request", 404, "No such employee found");
                    }
                    query = {
                        date: { $gte: date_1.toDate(), $lt: moment_1.default(date_1).add(1, "month").toDate() },
                    };
                    return [4 /*yield*/, attendance_1.findAllAttendance(__assign({}, query))];
                case 2:
                    attendances = _a.sent();
                    return [4 /*yield*/, attendance_1.findAllAttendance(__assign(__assign({}, query), { attendanceType: attendanceType_1.default.Normal, "attendances.employeeId": data.employeeId }), { date: 1, attendanceType: 1, "attendances.$": 1 })];
                case 3:
                    markAttendance = _a.sent();
                    holidays = employee.holidayRequest.filter(function (value) {
                        if (moment_1.default(value.date).isSameOrAfter(date_1) &&
                            moment_1.default(value.date).isBefore(moment_1.default(date_1).add(1, "month")) &&
                            value.status == holidayStatus_1.default.Approved) {
                            return value;
                        }
                    });
                    sickLeave = employee.sickLeave.find(function (value, index) {
                        if (moment_1.default(value.date)
                            .startOf("month")
                            .isSameOrBefore(moment_1.default(data.date).startOf("month"))) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    });
                    return [4 /*yield*/, task_1.aggregateTask([
                            { $unwind: "$timeLog" },
                            { $replaceRoot: { newRoot: "$timeLog" } },
                            {
                                $match: {
                                    $or: [
                                        {
                                            endTime: {
                                                $gte: date_1.toDate(),
                                                $lt: moment_1.default(date_1).add(1, "month").toDate(),
                                            },
                                        },
                                        { endTime: { $exists: false } },
                                    ],
                                    employeeId: data.employeeId,
                                },
                            },
                        ])];
                case 4:
                    hours = _a.sent();
                    seconds = hours.reduce(function (total, value) {
                        var _a, _b;
                        if (date_1.isAfter(moment_1.default(value.startTime))) {
                            return (total +
                                moment_1.default((_a = value.endTime) !== null && _a !== void 0 ? _a : moment_1.default()).diff(moment_1.default(date_1), "seconds"));
                        }
                        else {
                            console.log("are you there");
                            return (total +
                                moment_1.default((_b = value.endTime) !== null && _b !== void 0 ? _b : moment_1.default()).diff(moment_1.default(value.startTime), "seconds"));
                        }
                    }, 0);
                    callback({
                        status: 200,
                        data: { sickLeave: sickLeave, holidays: holidays, attendances: attendances, markAttendance: markAttendance, seconds: seconds },
                    });
                    return [3 /*break*/, 6];
                case 5:
                    err_10 = _a.sent();
                    //@ts-ignore
                    callback({ status: 400, message: err_10.message });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.employeeMonthlyReportHandler = employeeMonthlyReportHandler;
function approveLeaveHandler(socket, data, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var session, admin, employee_2, index, types, employeeHoliday, totalLeaveTaken, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mongoose_1.default.startSession()];
                case 1:
                    session = _a.sent();
                    session.startTransaction();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 6, , 8]);
                    admin = socket.user;
                    return [4 /*yield*/, employee_1.findAndUpdateEmployee({ _id: data.employeeId, "holidayRequest._id": data.holidayId }, {
                            $set: {
                                "holidayRequest.$.status": holidayStatus_1.default.Approved,
                                "holidayRequest.$.approvedBy": admin._id,
                            },
                        }, {
                            projection: { "holidayRequest.$": 1, sickLeave: 1, username: 1 },
                            session: session,
                        })];
                case 3:
                    employee_2 = _a.sent();
                    if (!employee_2) {
                        throw new customError_1.default("Bad Request", 400, "No such holiday found for this employee");
                    }
                    if (employee_2.holidayRequest[0].status == holidayStatus_1.default.Approved) {
                        throw new customError_1.default("Bad Request", 400, "Leave already approved");
                    }
                    if (moment_1.default(employee_2.holidayRequest[0].date).isBefore(moment_1.default())) {
                        throw new customError_1.default("Bad Request", 400, "date already passed");
                    }
                    index = employee_2.sickLeave.findIndex(function (value, index) {
                        if (moment_1.default(value.date)
                            .startOf("month")
                            .isSameOrBefore(moment_1.default(employee_2.holidayRequest[0].date).startOf("month"))) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    });
                    if (index == -1) {
                        throw new customError_1.default("Bad Request", 400, "No such type of leave found");
                    }
                    types = Object.fromEntries(employee_2.sickLeave[index].types);
                    return [4 /*yield*/, employee_1.findEmployee({ _id: data.employeeId }, { holidayRequest: 1 })];
                case 4:
                    employeeHoliday = _a.sent();
                    totalLeaveTaken = employeeHoliday.holidayRequest.filter(function (value) {
                        return value.sickId.equals(employee_2.holidayRequest[0].sickId) &&
                            value.type == employee_2.holidayRequest[0].type &&
                            value.status == holidayStatus_1.default.Approved;
                    });
                    if (types[employee_2.holidayRequest[0].type].value - totalLeaveTaken.length <=
                        0) {
                        throw new customError_1.default("Bad Request", 400, "No remaining leave found");
                    }
                    // employee.sickLeave = [
                    //   ...employee.sickLeave.slice(0, index),
                    //   {
                    //     date: employee.sickLeave[index].date,
                    //     types: {
                    //       ...types,
                    //       [employee.holidayRequest[0].type]: {
                    //         value: types[employee.holidayRequest[0].type].value,
                    //         name: types[employee.holidayRequest[0].type].name,
                    //         type: types[employee.holidayRequest[0].type].type,
                    //         completed: types[employee.holidayRequest[0].type].completed + 1,
                    //       },
                    //     },
                    //   },
                    //   ...employee.sickLeave.slice(index + 1),
                    // ];
                    // await employee.save();
                    return [4 /*yield*/, session.commitTransaction()];
                case 5:
                    // employee.sickLeave = [
                    //   ...employee.sickLeave.slice(0, index),
                    //   {
                    //     date: employee.sickLeave[index].date,
                    //     types: {
                    //       ...types,
                    //       [employee.holidayRequest[0].type]: {
                    //         value: types[employee.holidayRequest[0].type].value,
                    //         name: types[employee.holidayRequest[0].type].name,
                    //         type: types[employee.holidayRequest[0].type].type,
                    //         completed: types[employee.holidayRequest[0].type].completed + 1,
                    //       },
                    //     },
                    //   },
                    //   ...employee.sickLeave.slice(index + 1),
                    // ];
                    // await employee.save();
                    _a.sent();
                    callback({
                        status: 200,
                        message: "holiday of employee " + employee_2.username + " is approved",
                    });
                    return [3 /*break*/, 8];
                case 6:
                    error_1 = _a.sent();
                    console.log("errr", error_1);
                    return [4 /*yield*/, session.abortTransaction()];
                case 7:
                    _a.sent();
                    //@ts-ignore
                    callback({ status: 400, message: error_1.message });
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.approveLeaveHandler = approveLeaveHandler;
function denyLeaveHandler(socket, data, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var session, admin, employee, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mongoose_1.default.startSession()];
                case 1:
                    session = _a.sent();
                    session.startTransaction();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 7]);
                    admin = socket.user;
                    return [4 /*yield*/, employee_1.findAndUpdateEmployee({ _id: data.employeeId, "holidayRequest._id": data.holidayId }, {
                            $set: {
                                "holidayRequest.$.status": holidayStatus_1.default.Denied,
                                "holidayRequest.$.denyReason": data.denyReason,
                            },
                        }, {
                            projection: { "holidayRequest.$": 1, sickLeave: 1, username: 1 },
                            session: session,
                        })];
                case 3:
                    employee = _a.sent();
                    if (!employee) {
                        throw new customError_1.default("Bad Request", 400, "No such holiday found for this employee");
                    }
                    if (employee.holidayRequest[0].status == holidayStatus_1.default.Denied) {
                        throw new customError_1.default("Bad Request", 400, "Leave already denied");
                    }
                    if (moment_1.default(employee.holidayRequest[0].date).isBefore(moment_1.default())) {
                        throw new customError_1.default("Bad Request", 400, "date already passed");
                    }
                    return [4 /*yield*/, session.commitTransaction()];
                case 4:
                    _a.sent();
                    callback({
                        status: 200,
                        message: "holiday of employee " + employee.username + " is denied",
                    });
                    return [3 /*break*/, 7];
                case 5:
                    error_2 = _a.sent();
                    console.log("errr", error_2);
                    return [4 /*yield*/, session.abortTransaction()];
                case 6:
                    _a.sent();
                    //@ts-ignore
                    callback({ status: 400, message: error_2.message });
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.denyLeaveHandler = denyLeaveHandler;
function addSickHandler(socket, data, callback) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var employee, lastLeave, err_11;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, employee_1.findEmployee({ _id: data.employeeId }, { sickLeave: 1 })];
                case 1:
                    employee = _b.sent();
                    if (!employee) {
                        throw new customError_1.default("Bad Request", 400, "No such employee found");
                    }
                    lastLeave = (_a = employee === null || employee === void 0 ? void 0 : employee.sickLeave) === null || _a === void 0 ? void 0 : _a[0];
                    console.log("data", JSON.stringify(data), lastLeave === null || lastLeave === void 0 ? void 0 : lastLeave.date, moment_1.default(data.sickLeave.date).startOf("month").toDate());
                    if (lastLeave) {
                        if (moment_1.default(data.sickLeave.date)
                            .startOf("month")
                            .isBefore(moment_1.default(lastLeave.date).add(1, "months")) ||
                            moment_1.default(data.sickLeave.date)
                                .startOf("month")
                                .isBefore(moment_1.default().startOf("month"))) {
                            throw new customError_1.default("Bad Request", 400, "This month is already added or passed");
                        }
                        else {
                            employee.sickLeave = __spreadArrays([data.sickLeave], employee.sickLeave);
                        }
                    }
                    else {
                        if (moment_1.default(data.sickLeave.date)
                            .startOf("month")
                            .isBefore(moment_1.default().startOf("month"))) {
                            throw new customError_1.default("Bad Request", 400, "This month is already added or passed");
                        }
                        else {
                            employee.sickLeave = [data.sickLeave];
                        }
                    }
                    return [4 /*yield*/, employee.save()];
                case 2:
                    _b.sent();
                    callback({ status: 200, message: "Sickleave successfully added" });
                    return [3 /*break*/, 4];
                case 3:
                    err_11 = _b.sent();
                    console.log("error", err_11);
                    //@ts-ignore
                    callback({ status: 400, message: err_11.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.addSickHandler = addSickHandler;
function employeeTasksHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var tasks, err_12;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, task_1.findAllTask({ assignedEmployee: data.employeeId })];
                case 1:
                    tasks = _a.sent();
                    socket.emit("employee-task-result", tasks);
                    return [3 /*break*/, 3];
                case 2:
                    err_12 = _a.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.employeeTasksHandler = employeeTasksHandler;
function approveAttendanceHandler(socket, data, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var session, attendance, err_13;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mongoose_1.default.startSession()];
                case 1:
                    session = _a.sent();
                    session.startTransaction();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 7]);
                    return [4 /*yield*/, attendance_1.findAndUpdateAttendance({ _id: data.attendanceId, "attendance.employeeId": data.employeeId }, { $set: { "attendance.$.approved": holidayStatus_1.default.Approved } }, { session: session })];
                case 3:
                    attendance = _a.sent();
                    if (!attendance) {
                        throw new customError_1.default("Bad Request", 400, "NO such attendance found");
                    }
                    if (attendance.attendanceType != attendanceType_1.default.Normal) {
                        throw new customError_1.default("Bad Request", 400, "Oops its a holiday");
                    }
                    return [4 /*yield*/, session.commitTransaction()];
                case 4:
                    _a.sent();
                    callback({ status: 200, message: "Attendance successfully approved" });
                    return [2 /*return*/];
                case 5:
                    err_13 = _a.sent();
                    return [4 /*yield*/, session.abortTransaction()];
                case 6:
                    _a.sent();
                    //@ts-ignore
                    callback({ status: 400, message: err_13.message });
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.approveAttendanceHandler = approveAttendanceHandler;
function adminBranchHandler(socket) {
    return __awaiter(this, void 0, void 0, function () {
        var branches, err_14;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, branch_service_1.findAllBranch({})];
                case 1:
                    branches = _a.sent();
                    socket.emit("admin-branch-result", branches);
                    return [3 /*break*/, 3];
                case 2:
                    err_14 = _a.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.adminBranchHandler = adminBranchHandler;
function denyAttendanceHandler(socket, data, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var session, attendance, err_15;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mongoose_1.default.startSession()];
                case 1:
                    session = _a.sent();
                    session.startTransaction();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 7]);
                    return [4 /*yield*/, attendance_1.findAndUpdateAttendance({ _id: data.attendanceId, "attendance.employeeId": data.employeeId }, { $set: { "attendance.$.approved": holidayStatus_1.default.Denied } }, { session: session })];
                case 3:
                    attendance = _a.sent();
                    if (!attendance) {
                        throw new customError_1.default("Bad Request", 400, "NO such attendance found");
                    }
                    if (attendance.attendanceType != attendanceType_1.default.Normal) {
                        throw new customError_1.default("Bad Request", 400, "Oops its a holiday");
                    }
                    return [4 /*yield*/, session.commitTransaction()];
                case 4:
                    _a.sent();
                    callback({ status: 200, message: "Attendance successfully denied" });
                    return [2 /*return*/];
                case 5:
                    err_15 = _a.sent();
                    return [4 /*yield*/, session.abortTransaction()];
                case 6:
                    _a.sent();
                    //@ts-ignore
                    callback({ status: 400, message: err_15.message });
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.denyAttendanceHandler = denyAttendanceHandler;
function sickLeaveHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var employee, err_16;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, employee_1.findEmployee({ _id: data.employeeId })];
                case 1:
                    employee = _a.sent();
                    if (employee) {
                        socket.emit("sick-leave-result", {
                            sickLeave: employee.sickLeave.map(function (value) {
                                //@ts-ignore
                                return __assign(__assign({}, value.toJSON()), { types: Object.fromEntries(value.types) });
                            }),
                            events: employee.holidayRequest.map(function (value) { return (__assign(__assign({}, value.toJSON()), { title: value.reason, start: moment_1.default(value.date), end: moment_1.default(value.date).add(1, "day") })); }),
                        });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    err_16 = _a.sent();
                    console.log("err", err_16);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.sickLeaveHandler = sickLeaveHandler;
function adminEmployeeAttendanceHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var attendances, err_17;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, attendance_1.findAllAttendance({}, {
                            attendance: { $elemMatch: { employeeId: data.employeeId } },
                            date: 1,
                            open: 1,
                            attendanceType: 1,
                        })];
                case 1:
                    attendances = _a.sent();
                    // const employee = await findEmployee(
                    //   { _id: data.employeeId },
                    //   { holidayRequest: 1 }
                    // );
                    // let holiday: HolidayRequest[] = [];
                    // if (!employee) {
                    //   return;
                    // } else {
                    //   holiday = employee.holidayRequest;
                    // }
                    // console.log("attendance", attendances);
                    socket.emit("employee-attendance-result", attendances);
                    return [3 /*break*/, 3];
                case 2:
                    err_17 = _a.sent();
                    console.log("error", err_17);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function adminSaveSettingHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, setting, err_18;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    user = socket.user;
                    console.log("data", data);
                    return [4 /*yield*/, setting_service_1.findSetting({})];
                case 1:
                    setting = _a.sent();
                    if (!!setting) return [3 /*break*/, 3];
                    return [4 /*yield*/, setting_service_1.createSetting(data)];
                case 2:
                    setting = _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    setting.types = data.types;
                    return [4 /*yield*/, setting.save()];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    console.log("setting", setting);
                    return [3 /*break*/, 7];
                case 6:
                    err_18 = _a.sent();
                    console.log("error", err_18);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function adminGetSettingHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, setting, err_19;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    user = socket.user;
                    console.log("data", data);
                    return [4 /*yield*/, setting_service_1.findSetting({})];
                case 1:
                    setting = _a.sent();
                    socket.emit("admin-setting-result", setting !== null && setting !== void 0 ? setting : {});
                    return [3 /*break*/, 3];
                case 2:
                    err_19 = _a.sent();
                    console.log("error", err_19);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function adminMeetingDateHandler(socket, data, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var user, match, meetings, err_20;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log("meeting", data.date, moment_1.default(data.date));
                    user = socket.user;
                    match = {};
                    if (data.employeeId) {
                        match["employeeId"] = data.employeeId;
                    }
                    return [4 /*yield*/, meeting_2.aggregateMeeting([
                            {
                                $match: {
                                    $or: [
                                        { "participants.id": user._id },
                                        {
                                            meetingType: {
                                                $in: [
                                                    meetingType_1.default.Conversation,
                                                    meetingType_1.default.Primary,
                                                    meetingType_1.default.Project,
                                                ],
                                            },
                                        },
                                    ],
                                    meetingStartTime: {
                                        $gte: moment_1.default(data.date).toDate(),
                                        $lt: moment_1.default(data.date).add(1, "day").toDate(),
                                    },
                                },
                            },
                            { $sort: { createdAt: -1 } },
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
                        ])];
                case 1:
                    meetings = _a.sent();
                    console.log("meetings", meetings);
                    callback({ status: 200, data: meetings });
                    return [3 /*break*/, 3];
                case 2:
                    err_20 = _a.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function adminLeaveDateHandler(socket, data, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var user, employees, err_21;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    user = socket.user;
                    console.log("date", data, moment_1.default(data.date).startOf("day").toDate());
                    return [4 /*yield*/, employee_1.findAllEmployee({
                            "holidayRequest.date": moment_1.default(data.date).startOf("day").toDate(),
                        }, { "holidayRequest.$": 1, profileUri: 1, username: 1, number: 1, email: 1 })];
                case 1:
                    employees = _a.sent();
                    console.log("leaves", employees);
                    callback({ status: 200, data: employees });
                    return [3 /*break*/, 3];
                case 2:
                    err_21 = _a.sent();
                    console.log("error", err_21);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function adminAttendanceDateHandler(socket, data, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var user, match, meetings, err_22;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    user = socket.user;
                    console.log("date", data, moment_1.default(data.date).startOf("day").toDate());
                    match = {};
                    return [4 /*yield*/, attendance_1.aggregateAttendance([
                            {
                                $match: {
                                    date: moment_1.default(data.date).startOf("day").toDate(),
                                },
                            },
                            { $unwind: "$attendance" },
                            {
                                $lookup: {
                                    from: "employees",
                                    let: { employeeId: "$attendance.employeeId" },
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
                        ])];
                case 1:
                    meetings = _a.sent();
                    callback({ status: 200, data: meetings });
                    return [3 /*break*/, 3];
                case 2:
                    err_22 = _a.sent();
                    console.log("error", err_22);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function employeeDetailHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var employee, err_23;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, employee_1.findEmployee({ _id: data.employeeId })];
                case 1:
                    employee = _a.sent();
                    console.log("employee", employee);
                    socket.emit("admin-employee-detail-result", employee);
                    return [3 /*break*/, 3];
                case 2:
                    err_23 = _a.sent();
                    console.log("error", err_23);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function dashboardHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, links, allProjects, projects_1, invoice, invoiceObject_1, quotation, quotationObject_1, meetings, attendance, employees, err_24;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    user = socket.user;
                    return [4 /*yield*/, link_service_1.findAllLink({
                            $or: [{ ownerId: user._id }, { type: link_model_1.LinkOwned.All }],
                        })];
                case 1:
                    links = _a.sent();
                    return [4 /*yield*/, project_Service_1.aggregateProject([
                            { $group: { _id: "$status", count: { $count: {} } } },
                        ])];
                case 2:
                    allProjects = _a.sent();
                    projects_1 = {};
                    allProjects.forEach(function (value) {
                        projects_1[value._id] = value.count;
                    });
                    return [4 /*yield*/, invoice_service_1.aggregateInvoice([
                            { $group: { _id: "$paymentStatus", count: { $count: {} } } },
                        ])];
                case 3:
                    invoice = _a.sent();
                    invoiceObject_1 = {};
                    invoice.forEach(function (value) {
                        invoiceObject_1[value._id] = value.count;
                    });
                    return [4 /*yield*/, quotation_Service_1.aggregateQuotation([
                            {
                                $match: { quotationType: quotationType_enum_1.default.Current },
                            },
                            { $group: { _id: "$approved", count: { $count: {} } } },
                        ])];
                case 4:
                    quotation = _a.sent();
                    quotationObject_1 = {};
                    quotation.forEach(function (value) {
                        quotationObject_1[value._id ? "approved" : "unapproved"] = value.count;
                    });
                    return [4 /*yield*/, meeting_1.default.find({
                            meetingStartTime: {
                                $gte: moment_1.default().startOf("day").toDate(),
                                $lt: moment_1.default().startOf("day").add(1, "day").toDate(),
                            },
                        }).sort({ meetingStartTime: 1 })];
                case 5:
                    meetings = _a.sent();
                    return [4 /*yield*/, attendance_1.findAttendance({
                            date: moment_1.default().startOf("day").toDate(),
                        })];
                case 6:
                    attendance = _a.sent();
                    return [4 /*yield*/, employee_1.findAllEmployee({
                            holidayRequest: {
                                $elemMatch: {
                                    date: moment_1.default().startOf("day").toDate(),
                                },
                            },
                        }, { username: 1, profileUri: 1, number: 1, "holidayRequest.$": 1 })];
                case 7:
                    employees = _a.sent();
                    socket.emit("admin-dashboard-result", {
                        meetings: meetings,
                        employees: employees,
                        links: links,
                        attendance: attendance,
                        quotation: quotationObject_1,
                        invoice: invoiceObject_1,
                        projects: projects_1,
                    });
                    return [3 /*break*/, 9];
                case 8:
                    err_24 = _a.sent();
                    console.log("err", err_24);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
function startAttendanceHandler(socket, data, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var attendance, err_25;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, attendance_1.findAttendance({
                            date: moment_1.default().startOf("day"),
                        })];
                case 1:
                    attendance = _a.sent();
                    if (attendance) {
                        if (attendance.attendanceType != attendanceType_1.default.Normal) {
                            return [2 /*return*/, callback === null || callback === void 0 ? void 0 : callback({
                                    status: 400,
                                    message: "This day is declared as holiday",
                                })];
                        }
                        else {
                            return [2 /*return*/, callback === null || callback === void 0 ? void 0 : callback({
                                    status: 400,
                                    message: "Attendance already started",
                                })];
                        }
                    }
                    console.log("hello date", moment_1.default().startOf("day").toDate(), moment_1.default().toDate(), moment_1.default().utcOffset());
                    return [4 /*yield*/, attendance_1.createAttendance({
                            date: moment_1.default().startOf("day").toDate(),
                            open: true,
                            attendanceType: data.type,
                            attendance: [],
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, callback === null || callback === void 0 ? void 0 : callback({
                            status: 200,
                            message: "Attendance successfully started",
                        })];
                case 3:
                    err_25 = _a.sent();
                    console.log(err_25);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.startAttendanceHandler = startAttendanceHandler;
function assignEmployeeMeeting(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, meeting, project, err_26;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
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
                    console.log("data", data);
                    meeting.employeeId = data.employeeId;
                    return [4 /*yield*/, meeting.save()];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_26 = _a.sent();
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.assignEmployeeMeeting = assignEmployeeMeeting;
function employeeSrisudhaHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, employees, admins, data_1, err_27;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    user = socket === null || socket === void 0 ? void 0 : socket.user;
                    return [4 /*yield*/, employee_1.aggregateEmployee([
                            { $match: { _id: { $ne: user._id } } },
                            { $project: { _id: 1, profileUri: 1, username: 1, number: 1 } },
                        ])];
                case 1:
                    employees = _a.sent();
                    return [4 /*yield*/, admin_2.aggregateAdmin([
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
                    err_27 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.employeeSrisudhaHandler = employeeSrisudhaHandler;
function employeeStorageHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, uploads, shared, err_28;
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
                    socket.emit("admin-storage-result", { uploads: uploads, shared: shared });
                    return [3 /*break*/, 5];
                case 4:
                    err_28 = _a.sent();
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.employeeStorageHandler = employeeStorageHandler;
function storageProjectHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, projects, err_29;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = socket === null || socket === void 0 ? void 0 : socket.user;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, project_Service_1.aggregateProject([
                            { $sort: { lastUploaded: -1 } },
                            { $project: { name: 1, status: 1, files: 1, lastUploaded: 1 } },
                        ])];
                case 2:
                    projects = _a.sent();
                    socket.emit("admin-storage-project-result", projects);
                    return [3 /*break*/, 4];
                case 3:
                    err_29 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.storageProjectHandler = storageProjectHandler;
function addImportantHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, update, err_30;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = socket === null || socket === void 0 ? void 0 : socket.user;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, admin_2.findAndUpdateAdmin({ _id: user._id }, { $addToSet: { importantFiles: data.messageId } }, { new: true })];
                case 2:
                    update = _a.sent();
                    //@ts-ignore
                    socket.user = update;
                    return [3 /*break*/, 4];
                case 3:
                    err_30 = _a.sent();
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
        var user, important, err_31;
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
                    err_31 = _b.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.removeImportantHandler = removeImportantHandler;
function storageImportantImageHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, data_2, err_32;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = socket === null || socket === void 0 ? void 0 : socket.user;
                    console.log("user", user);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, admin_1.default.findOne({ _id: user._id }).populate("importantFiles", {
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
                    socket.emit("admin-storage-important-image-result", data_2 === null || data_2 === void 0 ? void 0 : data_2.importantFiles);
                    return [3 /*break*/, 4];
                case 3:
                    err_32 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.storageImportantImageHandler = storageImportantImageHandler;
function storageProjectImageHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, projects, err_33;
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
                    socket.emit("admin-storage-project-image-result", projects);
                    return [3 /*break*/, 4];
                case 3:
                    err_33 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.storageProjectImageHandler = storageProjectImageHandler;
function imageDetailHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, favorite, images, err_34;
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
                    socket.emit("admin-image-detail-result", __assign(__assign({}, images[0]), { favorite: favorite ? true : false }));
                    return [3 /*break*/, 4];
                case 3:
                    err_34 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.imageDetailHandler = imageDetailHandler;
function updateProjectStatusHandler(project, data) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var adminConnection, employeeConnection, customerConnection;
        return __generator(this, function (_b) {
            adminConnection = serverStore_1.getActiveAdmins();
            employeeConnection = [];
            project.assignedEmployees.forEach(function (value) {
                employeeConnection.push.apply(employeeConnection, serverStore_1.getActiveConnections(value.employeeId));
            });
            customerConnection = serverStore_1.getActiveConnections(project.customerId.toString());
            (_a = serverStore_1.getSocketServerInstance()) === null || _a === void 0 ? void 0 : _a.to(__spreadArrays(adminConnection, employeeConnection, customerConnection)).emit("update-project-status-result", data);
            return [2 /*return*/];
        });
    });
}
exports.updateProjectStatusHandler = updateProjectStatusHandler;
function initialDataHandler(socket) {
    return __awaiter(this, void 0, void 0, function () {
        var branches, templates, quotations, invoices, err_35;
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
                    return [4 /*yield*/, quotation_Service_1.aggregateQuotation([
                            {
                                $lookup: {
                                    from: "branches",
                                    let: { branchId: "$branchId" },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $eq: ["$_id", "$$branchId"],
                                                },
                                            },
                                        },
                                        { $project: { _id: 1, email: 1, number: 1, address: 1 } },
                                    ],
                                    as: "branch",
                                },
                            },
                            { $unwind: "$branch" },
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
                                                email: 1,
                                                number: 1,
                                                kycDetails: 1,
                                                state: 1,
                                            },
                                        },
                                    ],
                                    as: "user",
                                },
                            },
                            { $unwind: "$user" },
                            { $group: { _id: "$projectId", quotations: { $push: "$$ROOT" } } },
                        ])];
                case 3:
                    quotations = _a.sent();
                    return [4 /*yield*/, invoice_service_1.aggregateInvoice([
                            {
                                $lookup: {
                                    from: "branches",
                                    let: { branchId: "$branchId" },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $eq: ["$_id", "$$branchId"],
                                                },
                                            },
                                        },
                                        { $project: { _id: 1, email: 1, number: 1, address: 1 } },
                                    ],
                                    as: "branch",
                                },
                            },
                            { $unwind: "$branch" },
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
                                                email: 1,
                                                number: 1,
                                                kycDetails: 1,
                                                state: 1,
                                            },
                                        },
                                    ],
                                    as: "user",
                                },
                            },
                            { $unwind: "$user" },
                            { $group: { _id: "$projectId", invoice: { $push: "$$ROOT" } } },
                            { $unwind: "$invoice" },
                        ])];
                case 4:
                    invoices = _a.sent();
                    socket.emit("initial-data-result", {
                        branches: branches,
                        invoices: invoices,
                        templates: templates,
                        quotations: quotations,
                    });
                    return [3 /*break*/, 6];
                case 5:
                    err_35 = _a.sent();
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.initialDataHandler = initialDataHandler;
function adminProjectHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var project;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, project_Service_1.aggregateProject([
                        { $match: {} },
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
                    socket.emit("admin-project-result", project);
                    return [2 /*return*/];
            }
        });
    });
}
function adminEmployeeHandler(socket) {
    return __awaiter(this, void 0, void 0, function () {
        var currentDate, dateCheck, employees;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentDate = moment_1.default();
                    dateCheck = moment_1.default(currentDate).startOf("day");
                    return [4 /*yield*/, employee_1.aggregateEmployee([
                            { $match: {} },
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
                                $lookup: {
                                    from: "meetings",
                                    let: { assignedEmployee: "$_id" },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $and: [
                                                        { $eq: ["$employeeId", "$$assignedEmployee"] },
                                                        { $eq: ["$employeeConfirmed", true] },
                                                        { $gte: ["$meetingStartTime", dateCheck.toDate()] },
                                                        {
                                                            $gte: [
                                                                "$meetingStartTime",
                                                                dateCheck.add(1, "day").toDate(),
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
                                    as: "meetings",
                                },
                            },
                            {
                                $addFields: {
                                    meetingCount: { $size: "$meetings" },
                                    status: {
                                        $reduce: {
                                            input: "$tasks",
                                            initialValue: {
                                                pending: 0,
                                                completed: 0,
                                                initiated: 0,
                                            },
                                            in: {
                                                $switch: {
                                                    branches: [
                                                        {
                                                            case: { $eq: ["$$this.status", taskStatus_1.default.Completed] },
                                                            then: {
                                                                completed: {
                                                                    $add: ["$$value.completed", 1],
                                                                },
                                                                pending: "$$value.pending",
                                                                initiated: "$$value.initiated",
                                                            },
                                                        },
                                                        {
                                                            case: { $eq: ["$$this.status", taskStatus_1.default.Ongoing] },
                                                            then: {
                                                                pending: {
                                                                    $add: ["$$value.pending", 1],
                                                                },
                                                                completed: "$$value.completed",
                                                                initiated: "$$value.initiated",
                                                            },
                                                        },
                                                        {
                                                            case: { $eq: ["$$this.status", taskStatus_1.default.Initiated] },
                                                            then: {
                                                                initiated: {
                                                                    $add: ["$$value.initiated", 1],
                                                                },
                                                                completed: "$$value.completed",
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
                            { $project: { tasks: 0, meetings: 0 } },
                        ])];
                case 1:
                    employees = _a.sent();
                    socket.emit("admin-employee-result", employees);
                    return [2 /*return*/];
            }
        });
    });
}
function searchEmployeeHandler(socket) {
    return __awaiter(this, void 0, void 0, function () {
        var employees;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, employee_1.aggregateEmployee([
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
                    socket.emit("admin-search-employee-result", employees);
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
                    socket.emit("admin-search-customer-result", customers);
                    return [2 /*return*/];
            }
        });
    });
}
function adminCustomerHandler(socket) {
    return __awaiter(this, void 0, void 0, function () {
        var customers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, customer_1.aggregateCustomer([
                        { $match: {} },
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
                            $unwind: { path: "$assignedEmployee", preserveNullAndEmptyArrays: true },
                        },
                        {
                            $lookup: {
                                from: "quotations",
                                let: { customerId: "$_id" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $and: [
                                                    { $eq: ["$customerId", "$$customerId"] },
                                                    { $eq: ["$quotationType", quotationType_enum_1.default.Current] },
                                                    { $eq: ["$approved", false] },
                                                ],
                                            },
                                        },
                                    },
                                    {
                                        $project: { status: 1 },
                                    },
                                ],
                                as: "quotations",
                            },
                        },
                        {
                            $lookup: {
                                from: "invoices",
                                let: { customerId: "$_id" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $and: [
                                                    { $eq: ["$customerId", "$$customerId"] },
                                                    { $eq: ["$paymentStatus", paymentStatus_1.default.Unpaid] },
                                                ],
                                            },
                                        },
                                    },
                                    {
                                        $project: { status: 1 },
                                    },
                                ],
                                as: "invoices",
                            },
                        },
                        {
                            $lookup: {
                                from: "projects",
                                let: { customerId: "$_id" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $eq: ["$customerId", "$$customerId"],
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
                            $addFields: {
                                unpaidInvoice: { $size: "$invoices" },
                                pendingQuotation: { $size: "$quotations" },
                                status: {
                                    $reduce: {
                                        input: "$projects",
                                        initialValue: {
                                            pending: 0,
                                            completed: 0,
                                            initiated: 0,
                                        },
                                        in: {
                                            $switch: {
                                                branches: [
                                                    {
                                                        case: { $eq: ["$$this.status", taskStatus_1.default.Completed] },
                                                        then: {
                                                            completed: {
                                                                $add: ["$$value.completed", 1],
                                                            },
                                                            pending: "$$value.pending",
                                                            initiated: "$$value.initiated",
                                                        },
                                                    },
                                                    {
                                                        case: { $eq: ["$$this.status", taskStatus_1.default.Ongoing] },
                                                        then: {
                                                            pending: {
                                                                $add: ["$$value.pending", 1],
                                                            },
                                                            completed: "$$value.completed",
                                                            initiated: "$$value.initiated",
                                                        },
                                                    },
                                                    {
                                                        case: { $eq: ["$$this.status", taskStatus_1.default.Initiated] },
                                                        then: {
                                                            initiated: {
                                                                $add: ["$$value.initiated", 1],
                                                            },
                                                            completed: "$$value.completed",
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
                        { $project: { invoices: 0, quotations: 0, projects: 0 } },
                    ])];
                case 1:
                    customers = _a.sent();
                    socket.emit("admin-customer-result", customers);
                    return [2 /*return*/];
            }
        });
    });
}
function adminTaskHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var tasks, projectDetail;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tasks = [];
                    if (!mongoose_1.default.isValidObjectId(data.projectId)) return [3 /*break*/, 3];
                    return [4 /*yield*/, task_1.aggregateTask([
                            { $match: { projectId: new mongoose_1.default.Types.ObjectId(data.projectId) } },
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
                case 1:
                    tasks = _a.sent();
                    return [4 /*yield*/, project_Service_1.aggregateProject([
                            { $match: { _id: new mongoose_1.default.Types.ObjectId(data.projectId) } },
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
                                                companyName: 1,
                                                firstname: 1,
                                                gstNumber: 1,
                                                state: 1,
                                                lastname: 1,
                                                email: 1,
                                                number: 1,
                                            },
                                        },
                                    ],
                                    as: "customer",
                                },
                            },
                            { $unwind: "$customer" },
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
                case 2:
                    projectDetail = _a.sent();
                    socket.emit("admin-task-result", {
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
function employeeLeaveHandler(socket, data, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var employee, err_36;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, employee_1.findEmployee({ _id: data.employeeId }, { sickLeave: 1 })];
                case 1:
                    employee = _a.sent();
                    if (!employee) {
                        throw new customError_1.default("Bad Request", 404, "No such employee found");
                    }
                    callback({ status: 200, data: employee.sickLeave });
                    return [3 /*break*/, 3];
                case 2:
                    err_36 = _a.sent();
                    //@ts-ignore
                    callback({ status: 400, message: error.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function employeeTaskLogHandler(socket, data, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var tasks, err_37;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, task_1.aggregateTask([
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
                    err_37 = _a.sent();
                    //@ts-ignore
                    callback({ status: 400, message: error.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function adminTaskDetailHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var tasks, taskDetail, comments, err_38;
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
                    socket.emit("admin-task-detail-result", {
                        comments: comments,
                        taskDetail: taskDetail,
                    });
                    return [3 /*break*/, 5];
                case 4: return [2 /*return*/];
                case 5: return [3 /*break*/, 7];
                case 6:
                    err_38 = _a.sent();
                    console.log("err", err_38);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function deleteConversationHandler(conversationsId, employeeId) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var connection;
        return __generator(this, function (_b) {
            connection = serverStore_1.getActiveConnections(employeeId);
            (_a = serverStore_1.getSocketServerInstance()) === null || _a === void 0 ? void 0 : _a.to(connection).emit("delete-conversation-result", conversationsId);
            return [2 /*return*/];
        });
    });
}
exports.deleteConversationHandler = deleteConversationHandler;
function updateConversationHandler(conversations) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            conversations.forEach(function (conversation) {
                conversation.participants.forEach(function (value) {
                    var _a;
                    var connection = serverStore_1.getActiveConnections(value.id);
                    (_a = serverStore_1.getSocketServerInstance()) === null || _a === void 0 ? void 0 : _a.to(connection).emit("update-conversation-result", [conversation]);
                });
            });
            return [2 /*return*/];
        });
    });
}
exports.updateConversationHandler = updateConversationHandler;
function addConversationHandler(conversations, employeeIds) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var activeConnections;
        return __generator(this, function (_b) {
            activeConnections = [];
            employeeIds.forEach(function (value) {
                activeConnections.push.apply(activeConnections, serverStore_1.getActiveConnections(value));
            });
            (_a = serverStore_1.getSocketServerInstance()) === null || _a === void 0 ? void 0 : _a.to(activeConnections).emit("update-conversation-result", conversations);
            return [2 /*return*/];
        });
    });
}
exports.addConversationHandler = addConversationHandler;
function deleteSocketProjectHandler(employeeId, projectId) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var connections;
        return __generator(this, function (_b) {
            connections = serverStore_1.getActiveConnections(employeeId);
            (_a = serverStore_1.getSocketServerInstance()) === null || _a === void 0 ? void 0 : _a.to(connections).emit("delete-project-result", { projectId: projectId });
            return [2 /*return*/];
        });
    });
}
exports.deleteSocketProjectHandler = deleteSocketProjectHandler;
function addSocketProjectHandler(employeeId, project, primaryEmployee, primary) {
    var _a;
    if (primary === void 0) { primary = false; }
    return __awaiter(this, void 0, void 0, function () {
        var connections;
        return __generator(this, function (_b) {
            connections = serverStore_1.getActiveConnections(employeeId);
            console.log("connections", connections);
            (_a = serverStore_1.getSocketServerInstance()) === null || _a === void 0 ? void 0 : _a.to(connections).emit("add-project-result", __assign(__assign({}, project.toJSON()), { primaryEmployee: primaryEmployee,
                primary: primary }));
            return [2 /*return*/];
        });
    });
}
exports.addSocketProjectHandler = addSocketProjectHandler;
function updateSocketProjectPrimaryEmployee(project, primaryEmployee) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var adminConnections;
        return __generator(this, function (_b) {
            adminConnections = serverStore_1.getActiveAdmins();
            if (adminConnections.length > 0) {
                (_a = serverStore_1.getSocketServerInstance()) === null || _a === void 0 ? void 0 : _a.to(adminConnections).emit("update-primary-employee-result", {
                    primaryEmployee: primaryEmployee,
                    projectId: project._id,
                });
            }
            project.assignedEmployees.forEach(function (value) {
                var _a;
                var connections = serverStore_1.getActiveConnections(value.employeeId);
                if (connections.length > 0) {
                    (_a = serverStore_1.getSocketServerInstance()) === null || _a === void 0 ? void 0 : _a.to(connections).emit("update-primary-employee-result", {
                        primaryEmployee: primaryEmployee,
                        projectId: project._id,
                    });
                }
            });
            return [2 /*return*/];
        });
    });
}
exports.updateSocketProjectPrimaryEmployee = updateSocketProjectPrimaryEmployee;
function adminHolidayHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var meetings;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, holiday_1.aggregateHoliday([{ $sort: { createdAt: -1 } }])];
                case 1:
                    meetings = _a.sent();
                    console.log("meetings", meetings, data);
                    socket.emit("admin-holiday-result", meetings);
                    return [2 /*return*/];
            }
        });
    });
}
function adminMeetingHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var meetings;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, meeting_2.aggregateMeeting([
                        { $match: { projectId: new mongoose_1.default.Types.ObjectId(data.projectId) } },
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
                case 1:
                    meetings = _a.sent();
                    console.log("meetings", meetings, data);
                    socket.emit("admin-project-meeting-result", meetings);
                    return [2 /*return*/];
            }
        });
    });
}
function adminInvoiceHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var value, match;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    value = [];
                    if (!(data.type == invoiceType_1.default.Quotation)) return [3 /*break*/, 2];
                    return [4 /*yield*/, quotation_Service_1.aggregateQuotation([{ $sort: { createdAt: -1 } }])];
                case 1:
                    value = _a.sent();
                    return [3 /*break*/, 4];
                case 2:
                    match = {};
                    if (data.type == invoiceType_1.default.Paid) {
                        match["paymentStatus"] = paymentStatus_1.default.Paid;
                    }
                    else {
                        match["paymentStatus"] = paymentStatus_1.default.Unpaid;
                    }
                    return [4 /*yield*/, invoice_service_1.aggregateInvoice([
                            { $match: match },
                            { $sort: { createdAt: -1 } },
                        ])];
                case 3:
                    value = _a.sent();
                    _a.label = 4;
                case 4:
                    socket.emit("admin-invoice-result", { type: data.type, data: value });
                    return [2 /*return*/];
            }
        });
    });
}
function addProjectHandler(data, primaryEmployee) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var adminConnection, employeeConnection, customerConnection;
        return __generator(this, function (_d) {
            adminConnection = serverStore_1.getActiveAdmins();
            employeeConnection = [];
            if (data.primaryEmployee) {
                employeeConnection = serverStore_1.getActiveConnections(data.primaryEmployee);
            }
            customerConnection = serverStore_1.getActiveConnections(data.customerId.toString());
            console.log("employeeConnection", employeeConnection, adminConnection, customerConnection);
            if (adminConnection.length > 0) {
                (_a = serverStore_1.getSocketServerInstance()) === null || _a === void 0 ? void 0 : _a.to(adminConnection).emit("add-project-result", __assign(__assign({}, data.toJSON()), { primaryEmployee: primaryEmployee }));
            }
            if (employeeConnection.length > 0) {
                (_b = serverStore_1.getSocketServerInstance()) === null || _b === void 0 ? void 0 : _b.to(employeeConnection).emit("add-project-result", __assign(__assign({}, data.toJSON()), { primaryEmployee: primaryEmployee, primary: true }));
            }
            if (customerConnection.length > 0) {
                (_c = serverStore_1.getSocketServerInstance()) === null || _c === void 0 ? void 0 : _c.to(customerConnection).emit("add-project-result", __assign(__assign({}, data.toJSON()), { primaryEmployee: primaryEmployee }));
            }
            return [2 /*return*/];
        });
    });
}
exports.addProjectHandler = addProjectHandler;
function sendConversationHandler(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log("some new data", data);
            data.forEach(function (value) {
                value.participants.forEach(function (value2) {
                    var _a;
                    var connection = serverStore_1.getActiveConnections(value2.id);
                    if ((connection === null || connection === void 0 ? void 0 : connection.length) > 0) {
                        (_a = serverStore_1.getSocketServerInstance()) === null || _a === void 0 ? void 0 : _a.to(connection).emit("add-conversation-result", value);
                    }
                });
            });
            return [2 /*return*/];
        });
    });
}
exports.sendConversationHandler = sendConversationHandler;
function addBranchHandler(data) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var adminConnection;
        return __generator(this, function (_b) {
            adminConnection = serverStore_1.getActiveAdmins();
            (_a = serverStore_1.getSocketServerInstance()) === null || _a === void 0 ? void 0 : _a.to(__spreadArrays(adminConnection)).emit("add-branch-result", data);
            return [2 /*return*/];
        });
    });
}
exports.addBranchHandler = addBranchHandler;
function addTemplateHandler(data) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var adminConnection;
        return __generator(this, function (_b) {
            adminConnection = serverStore_1.getActiveAdmins();
            (_a = serverStore_1.getSocketServerInstance()) === null || _a === void 0 ? void 0 : _a.to(__spreadArrays(adminConnection)).emit("add-template-result", data);
            return [2 /*return*/];
        });
    });
}
exports.addTemplateHandler = addTemplateHandler;
function addInvoiceHandler(data) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var adminConnection, customerConnection;
        return __generator(this, function (_b) {
            adminConnection = serverStore_1.getActiveAdmins();
            customerConnection = serverStore_1.getActiveConnections(data.customerId.toString());
            (_a = serverStore_1.getSocketServerInstance()) === null || _a === void 0 ? void 0 : _a.to(__spreadArrays(adminConnection, customerConnection)).emit("add-invoice-result", data);
            return [2 /*return*/];
        });
    });
}
exports.addInvoiceHandler = addInvoiceHandler;
function addQuotationData(data, branch) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var adminConnection, customerConnection;
        return __generator(this, function (_b) {
            adminConnection = serverStore_1.getActiveAdmins();
            customerConnection = serverStore_1.getActiveConnections(data.customerId.toString());
            (_a = serverStore_1.getSocketServerInstance()) === null || _a === void 0 ? void 0 : _a.to(__spreadArrays(adminConnection, customerConnection)).emit("add-quotation-result", __assign(__assign({}, data.toJSON()), { branch: branch }));
            return [2 /*return*/];
        });
    });
}
exports.addQuotationData = addQuotationData;
function addInvoiceData(data, branch) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var adminConnection, customerConnection;
        return __generator(this, function (_c) {
            adminConnection = serverStore_1.getActiveAdmins();
            customerConnection = serverStore_1.getActiveConnections(data.customerId.toString());
            console.log("invoice", data, branch, adminConnection);
            // [...adminConnection, ...customerConnection].forEach((value) => {
            //   console.log("value", value);
            //   getSocketServerInstance()
            //     ?.to(value)
            //     .emit("add-invoice-result", { ...data.toJSON(), branch });
            // });
            (_b = (_a = serverStore_1.getSocketServerInstance()) === null || _a === void 0 ? void 0 : _a.sockets) === null || _b === void 0 ? void 0 : _b.to(__spreadArrays(adminConnection, customerConnection)).emit("add-invoice-result", __assign(__assign({}, data.toJSON()), { branch: branch }));
            return [2 /*return*/];
        });
    });
}
exports.addInvoiceData = addInvoiceData;

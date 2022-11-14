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
exports.addInvoiceData = exports.addQuotationData = exports.addInvoiceHandler = exports.addTemplateHandler = exports.addBranchHandler = exports.sendConversationHandler = exports.addProjectHandler = exports.updateSocketProjectPrimaryEmployee = exports.addSocketProjectHandler = exports.deleteSocketProjectHandler = exports.addConversationHandler = exports.updateConversationHandler = exports.deleteConversationHandler = exports.initialDataHandler = exports.updateProjectStatusHandler = exports.imageDetailHandler = exports.storageProjectImageHandler = exports.storageImportantImageHandler = exports.removeImportantHandler = exports.addImportantHandler = exports.storageProjectHandler = exports.employeeStorageHandler = exports.employeeSrisudhaHandler = exports.assignEmployeeMeeting = exports.adminSocketHandler = void 0;
var moment_1 = __importDefault(require("moment"));
var mongoose_1 = __importDefault(require("mongoose"));
var serverStore_1 = require("../../../socket/serverStore");
var conversationType_1 = __importDefault(require("../enums/conversationType"));
var invoiceType_1 = __importDefault(require("../enums/invoiceType"));
var paymentStatus_1 = __importDefault(require("../enums/paymentStatus"));
var quotationType_enum_1 = __importDefault(require("../enums/quotationType.enum"));
var sendBy_1 = __importDefault(require("../enums/sendBy"));
var taskStatus_1 = __importDefault(require("../enums/taskStatus"));
var admin_1 = __importDefault(require("../models/admin"));
var comment_1 = __importDefault(require("../models/comment"));
var message_model_1 = __importDefault(require("../models/message.model"));
var task_model_1 = __importDefault(require("../models/task.model"));
var admin_2 = require("../services/admin");
var branch_service_1 = require("../services/branch.service");
var customer_1 = require("../services/customer");
var employee_1 = require("../services/employee");
var invoice_service_1 = require("../services/invoice.service");
var meeting_1 = require("../services/meeting");
var message_Service_1 = require("../services/message.Service");
var project_Service_1 = require("../services/project.Service");
var quotation_Service_1 = require("../services/quotation.Service");
var task_1 = require("../services/task");
var template_service_1 = require("../services/template.service");
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
    }
}
exports.adminSocketHandler = adminSocketHandler;
function assignEmployeeMeeting(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, meeting, project, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    user = socket.user;
                    return [4 /*yield*/, meeting_1.findMeeting({ _id: data.meetingId })];
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
                    err_1 = _a.sent();
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.assignEmployeeMeeting = assignEmployeeMeeting;
function employeeSrisudhaHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, employees, admins, data_1, err_2;
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
                    err_2 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.employeeSrisudhaHandler = employeeSrisudhaHandler;
function employeeStorageHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, uploads, shared, err_3;
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
                    err_3 = _a.sent();
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.employeeStorageHandler = employeeStorageHandler;
function storageProjectHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, projects, err_4;
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
                    err_4 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.storageProjectHandler = storageProjectHandler;
function addImportantHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, update, err_5;
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
                    err_5 = _a.sent();
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
        var user, important, err_6;
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
                    err_6 = _b.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.removeImportantHandler = removeImportantHandler;
function storageImportantImageHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, data_2, err_7;
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
                    err_7 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.storageImportantImageHandler = storageImportantImageHandler;
function storageProjectImageHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, projects, err_8;
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
                    err_8 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.storageProjectImageHandler = storageProjectImageHandler;
function imageDetailHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, favorite, images, err_9;
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
                    err_9 = _a.sent();
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
        var branches, templates, quotations, invoices, err_10;
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
                    err_10 = _a.sent();
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
                    dateCheck = moment_1.default(currentDate.year + "-" + currentDate.month + "-" + currentDate.date);
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
function adminTaskDetailHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var tasks, taskDetail, comments, err_11;
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
                    err_11 = _a.sent();
                    console.log("err", err_11);
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
function adminMeetingHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var meetings;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, meeting_1.aggregateMeeting([
                        { $match: { projectId: new mongoose_1.default.Types.ObjectId(data.projectId) } },
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
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var adminConnection, customerConnection;
        return __generator(this, function (_b) {
            adminConnection = serverStore_1.getActiveAdmins();
            customerConnection = serverStore_1.getActiveConnections(data.customerId.toString());
            (_a = serverStore_1.getSocketServerInstance()) === null || _a === void 0 ? void 0 : _a.to(__spreadArrays(adminConnection, customerConnection)).emit("add-invoice-result", __assign(__assign({}, data.toJSON()), { branch: branch }));
            return [2 /*return*/];
        });
    });
}
exports.addInvoiceData = addInvoiceData;
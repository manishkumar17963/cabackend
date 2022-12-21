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
exports.imageDetailHandler = exports.storageProjectImageHandler = exports.storageImportantImageHandler = exports.removeImportantHandler = exports.addImportantHandler = exports.storageProjectHandler = exports.customerStorageHandler = exports.initialCustomerDataHandler = exports.customerSocketHandler = void 0;
var moment_1 = __importDefault(require("moment"));
var mongoose_1 = __importDefault(require("mongoose"));
var serverStore_1 = require("../../../socket/serverStore");
var invoiceType_1 = __importDefault(require("../enums/invoiceType"));
var meetingStatus_1 = __importDefault(require("../enums/meetingStatus"));
var paymentStatus_1 = __importDefault(require("../enums/paymentStatus"));
var quotationType_enum_1 = __importDefault(require("../enums/quotationType.enum"));
var sendBy_1 = __importDefault(require("../enums/sendBy"));
var taskStatus_1 = __importDefault(require("../enums/taskStatus"));
var customer_1 = __importDefault(require("../models/customer"));
var meeting_1 = __importDefault(require("../models/meeting"));
var message_model_1 = __importDefault(require("../models/message.model"));
var customer_2 = require("../services/customer");
var invoice_service_1 = require("../services/invoice.service");
var meeting_2 = require("../services/meeting");
var message_Service_1 = require("../services/message.Service");
var project_Service_1 = require("../services/project.Service");
var quotation_Service_1 = require("../services/quotation.Service");
var task_1 = require("../services/task");
function customerSocketHandler(socket) {
    var _this = this;
    //@ts-ignore
    if (socket.type == sendBy_1.default.Customer) {
        socket.on("customer-project", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("customer projecr");
                        return [4 /*yield*/, customerProjectHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("customer-date-meeting", function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, customerMeetingDateHandler(socket, data, callback)];
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
        socket.on("customer-project-detail", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, customerTaskHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("customer-dashboard", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, dashboardHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("customer-storage", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("storage emit ");
                        return [4 /*yield*/, customerStorageHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("customer-storage-project", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, storageProjectHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("customer-storage-project-image", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, storageProjectImageHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("customer-storage-important-image", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, storageImportantImageHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("customer-add-important-image", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, addImportantHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("customer-remove-important-image", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, removeImportantHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("customer-image-detail", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, imageDetailHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("approve-quotation", function (data) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, approveQuotationHandler(socket, data)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); });
        socket.on("customer-project-meeting", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, customerMeetingHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("customer-invoice", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, customerInvoiceHandler(socket, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    }
}
exports.customerSocketHandler = customerSocketHandler;
function customerMeetingDateHandler(socket, data, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var user, meetings, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    user = socket.user;
                    console.log("date", data, moment_1.default(data.date).add(5, "hours").add(30, "minutes").toDate(), moment_1.default(data.date)
                        .add(5, "hours")
                        .add(30, "minutes")
                        .add(1, "day")
                        .toISOString());
                    return [4 /*yield*/, meeting_2.aggregateMeeting([
                            {
                                $match: {
                                    customerId: user._id,
                                    meetingStartTime: {
                                        $gte: moment_1.default(data.date).add(5, "hours").add(30, "minutes").toDate(),
                                        $lt: moment_1.default(data.date)
                                            .add(5, "hours")
                                            .add(30, "minutes")
                                            .add(1, "day")
                                            .toDate(),
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
                                    participants: "$conversation.participants",
                                },
                            },
                            { $sort: { meetingStartTime: 1 } },
                        ])];
                case 1:
                    meetings = _a.sent();
                    callback({ status: 200, data: meetings });
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function confirmMeetingHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, meeting_2.findAndUpdateMeeting({ _id: data.meetingId, meetingStatus: { $ne: meetingStatus_1.default.Completed } }, { $set: { customerConfirmed: true } }, {})];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function dashboardHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, allProjects, projects_1, invoice, invoiceObject_1, quotation, quotationObject_1, meetings, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    user = socket.user;
                    return [4 /*yield*/, project_Service_1.aggregateProject([
                            { $match: { customerId: user._id } },
                            { $group: { _id: "$status", count: { $count: {} } } },
                        ])];
                case 1:
                    allProjects = _a.sent();
                    projects_1 = {};
                    allProjects.forEach(function (value) {
                        projects_1[value._id] = value.count;
                    });
                    return [4 /*yield*/, invoice_service_1.aggregateInvoice([
                            { $match: { customerId: user._id } },
                            { $group: { _id: "$paymentStatus", count: { $count: {} } } },
                        ])];
                case 2:
                    invoice = _a.sent();
                    invoiceObject_1 = {};
                    invoice.forEach(function (value) {
                        invoiceObject_1[value._id] = value.count;
                    });
                    return [4 /*yield*/, quotation_Service_1.aggregateQuotation([
                            {
                                $match: { customerId: user._id, quotationType: quotationType_enum_1.default.Current },
                            },
                            { $group: { _id: "$approved", count: { $count: {} } } },
                        ])];
                case 3:
                    quotation = _a.sent();
                    quotationObject_1 = {};
                    quotation.forEach(function (value) {
                        quotationObject_1[value._id ? "approved" : "unapproved"] = value.count;
                    });
                    return [4 /*yield*/, meeting_1.default.find({
                            customerId: user._id,
                            meetingStartTime: {
                                $gte: moment_1.default().startOf("day").toDate(),
                                $lt: moment_1.default().startOf("day").add(1, "day").toDate(),
                            },
                        }).sort({ meetingStartTime: 1 })];
                case 4:
                    meetings = _a.sent();
                    socket.emit("customer-dashboard-result", {
                        meetings: meetings,
                        quotation: quotationObject_1,
                        invoice: invoiceObject_1,
                        projects: projects_1,
                    });
                    return [3 /*break*/, 6];
                case 5:
                    err_3 = _a.sent();
                    console.log("err", err_3);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function initialCustomerDataHandler(socket) {
    return __awaiter(this, void 0, void 0, function () {
        var user, quotations, invoices, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    user = socket === null || socket === void 0 ? void 0 : socket.user;
                    return [4 /*yield*/, quotation_Service_1.aggregateQuotation([
                            {
                                $match: { customerId: user._id, quotationType: quotationType_enum_1.default.Current },
                            },
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
                            { $group: { _id: "$projectId", quotation: { $push: "$$ROOT" } } },
                            { $unwind: "$quotation" },
                        ])];
                case 1:
                    quotations = _a.sent();
                    return [4 /*yield*/, invoice_service_1.aggregateInvoice([
                            {
                                $match: { customerId: user._id },
                            },
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
                case 2:
                    invoices = _a.sent();
                    socket.emit("initial-data-result", {
                        quotations: quotations,
                        invoices: invoices,
                    });
                    return [3 /*break*/, 4];
                case 3:
                    err_4 = _a.sent();
                    console.log("err", err_4);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.initialCustomerDataHandler = initialCustomerDataHandler;
function customerStorageHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, uploads, shared, err_5;
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
                    socket.emit("customer-storage-result", { uploads: uploads, shared: shared });
                    return [3 /*break*/, 5];
                case 4:
                    err_5 = _a.sent();
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.customerStorageHandler = customerStorageHandler;
function storageProjectHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, projects, err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = socket === null || socket === void 0 ? void 0 : socket.user;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, project_Service_1.aggregateProject([
                            { $match: { customerId: user._id } },
                            { $sort: { lastUploaded: -1 } },
                            { $project: { name: 1, status: 1, files: 1, lastUploaded: 1 } },
                        ])];
                case 2:
                    projects = _a.sent();
                    socket.emit("customer-storage-project-result", projects);
                    return [3 /*break*/, 4];
                case 3:
                    err_6 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.storageProjectHandler = storageProjectHandler;
function addImportantHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, update, err_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = socket === null || socket === void 0 ? void 0 : socket.user;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, customer_2.findAndUpdateCustomer({ _id: user._id }, { $addToSet: { importantFiles: data.messageId } }, { new: true })];
                case 2:
                    update = _a.sent();
                    //@ts-ignore
                    socket.user = update;
                    return [3 /*break*/, 4];
                case 3:
                    err_7 = _a.sent();
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
        var user, important, err_8;
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
                    err_8 = _b.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.removeImportantHandler = removeImportantHandler;
function storageImportantImageHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, data_1, err_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = socket === null || socket === void 0 ? void 0 : socket.user;
                    console.log("user", user);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, customer_1.default.findOne({ _id: user._id }).populate("importantFiles", {
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
                    data_1 = _a.sent();
                    console.log("projectId", user);
                    socket.emit("customer-storage-important-image-result", data_1 === null || data_1 === void 0 ? void 0 : data_1.importantFiles);
                    return [3 /*break*/, 4];
                case 3:
                    err_9 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.storageImportantImageHandler = storageImportantImageHandler;
function storageProjectImageHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, projects, err_10;
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
                    socket.emit("customer-storage-project-image-result", projects);
                    return [3 /*break*/, 4];
                case 3:
                    err_10 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.storageProjectImageHandler = storageProjectImageHandler;
function imageDetailHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, favorite, images, err_11;
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
                    socket.emit("customer-image-detail-result", __assign(__assign({}, images[0]), { favorite: favorite ? true : false }));
                    return [3 /*break*/, 4];
                case 3:
                    err_11 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.imageDetailHandler = imageDetailHandler;
function approveQuotationHandler(socket, data) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var project, quotation, adminConnection, activeConnections, err_12;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, project_Service_1.findProject({ _id: data.projectId })];
                case 1:
                    project = _b.sent();
                    if (!project) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, quotation_Service_1.findQuotation({ _id: data.quotationId })];
                case 2:
                    quotation = _b.sent();
                    if (!quotation) {
                        return [2 /*return*/];
                    }
                    console.log("project some", project);
                    project.clientApproved = true;
                    quotation.approved = true;
                    return [4 /*yield*/, quotation.save()];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, project.save()];
                case 4:
                    _b.sent();
                    adminConnection = serverStore_1.getActiveAdmins();
                    activeConnections = serverStore_1.getActiveConnections(quotation.customerId.toString());
                    (_a = serverStore_1.getSocketServerInstance()) === null || _a === void 0 ? void 0 : _a.to(__spreadArrays(adminConnection, activeConnections)).emit("approve-quotation-result", __assign({}, data));
                    return [3 /*break*/, 6];
                case 5:
                    err_12 = _b.sent();
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function customerMeetingHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, meetings;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = socket.user;
                    return [4 /*yield*/, meeting_2.aggregateMeeting([
                            {
                                $match: {
                                    projectId: new mongoose_1.default.Types.ObjectId(data.projectId),
                                    customerId: user._id,
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
                            { $sort: { meetingStartTime: 1 } },
                        ])];
                case 1:
                    meetings = _a.sent();
                    console.log(meetings);
                    socket.emit("customer-project-meeting-result", meetings);
                    return [2 /*return*/];
            }
        });
    });
}
function customerProjectHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, project;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = socket.user;
                    return [4 /*yield*/, project_Service_1.aggregateProject([
                            { $match: { customerId: user._id } },
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
                    socket.emit("customer-project-result", project);
                    return [2 /*return*/];
            }
        });
    });
}
function customerTaskHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var tasks, user, tasks_1, taskStatus_2, projectDetail;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tasks = [];
                    user = socket.user;
                    if (!mongoose_1.default.isValidObjectId(data.projectId)) return [3 /*break*/, 3];
                    return [4 /*yield*/, task_1.aggregateTask([
                            { $match: { projectId: new mongoose_1.default.Types.ObjectId(data.projectId) } },
                            { $group: { _id: "$status", count: { $count: {} } } },
                        ])];
                case 1:
                    tasks_1 = _a.sent();
                    taskStatus_2 = { pending: 0, completed: 0 };
                    tasks_1.forEach(function (value) {
                        if (value._id != taskStatus_1.default.Declined) {
                            if (value._id == taskStatus_1.default.Completed) {
                                taskStatus_2["completed"] += value.count;
                            }
                            else {
                                taskStatus_2["pending"] += value.count;
                            }
                        }
                    });
                    console.log("tasks", tasks_1, taskStatus_2);
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
                            { $project: { assignedEmployees: 0 } },
                        ])];
                case 2:
                    projectDetail = _a.sent();
                    socket.emit("customer-project-detail-result", __assign(__assign({}, projectDetail[0]), { taskStatus: taskStatus_2 }));
                    _a.label = 3;
                case 3:
                    socket.emit("customer-task-result", { projectId: data.projectId, tasks: tasks });
                    return [2 /*return*/];
            }
        });
    });
}
function customerInvoiceHandler(socket, data) {
    return __awaiter(this, void 0, void 0, function () {
        var value, user, match;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    value = [];
                    user = socket.user;
                    if (!(data.type == invoiceType_1.default.Quotation)) return [3 /*break*/, 2];
                    return [4 /*yield*/, quotation_Service_1.aggregateQuotation([
                            {
                                $match: { customerId: user._id, quotationType: quotationType_enum_1.default.Current },
                            },
                            { $sort: { createdAt: -1 } },
                        ])];
                case 1:
                    value = _a.sent();
                    return [3 /*break*/, 4];
                case 2:
                    match = { customerId: user._id };
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
                    console.log("value", value);
                    socket.emit("customer-invoice-result", { type: data.type, data: value });
                    return [2 /*return*/];
            }
        });
    });
}

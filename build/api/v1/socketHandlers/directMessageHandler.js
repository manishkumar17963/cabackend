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
var message_model_1 = __importDefault(require("../models/message.model"));
var conversation_model_1 = __importDefault(require("../models/conversation.model"));
var serverStore_1 = require("../../../socket/serverStore");
var conversationType_1 = __importDefault(require("../enums/conversationType"));
var conversation_service_1 = require("../services/conversation.service");
var sendBy_1 = __importDefault(require("../enums/sendBy"));
var customer_1 = require("../services/customer");
var admin_1 = require("../services/admin");
var employee_1 = require("../services/employee");
var project_Service_1 = require("../services/project.Service");
var directMessageHandler = function (socket, data) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _id_1, profileUri, name_1, user, conversationId, conversationType_2, message, fileUri, fileName, fileSize, fileType, receiverId, receiverType_1, conversation_1, newConversation_1, receiverInput, customer, func, cust, additional, messageInput, newMessage_1, project, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 17, , 18]);
                _a = socket.user, _id_1 = _a._id, profileUri = _a.profileUri;
                //@ts-ignore
                if (socket.type != sendBy_1.default.Customer) {
                    user = socket.user;
                    name_1 = user.username;
                }
                else {
                    //@ts-ignore
                    name_1 = socket.user.companyName;
                }
                conversationId = data.conversationId, conversationType_2 = data.conversationType, message = data.message, fileUri = data.fileUri, fileName = data.fileName, fileSize = data.fileSize, fileType = data.fileType, receiverId = data.receiverId, receiverType_1 = data.receiverType;
                conversation_1 = null;
                newConversation_1 = false;
                if (!(conversationType_2 == conversationType_1.default.Direct)) return [3 /*break*/, 3];
                if (!conversationId) return [3 /*break*/, 2];
                return [4 /*yield*/, conversation_service_1.findConversation({
                        _id: conversationId,
                        "participants.id": _id_1.toString(),
                    })];
            case 1:
                conversation_1 = _b.sent();
                _b.label = 2;
            case 2: return [3 /*break*/, 6];
            case 3:
                if (!!conversationId) return [3 /*break*/, 4];
                return [2 /*return*/];
            case 4: return [4 /*yield*/, conversation_service_1.findConversation({ _id: conversationId })];
            case 5:
                conversation_1 = _b.sent();
                if (!conversation_1) {
                    return [2 /*return*/];
                }
                _b.label = 6;
            case 6:
                if (!!conversation_1) return [3 /*break*/, 12];
                receiverInput = void 0;
                if (!(receiverType_1 == sendBy_1.default.Customer)) return [3 /*break*/, 8];
                return [4 /*yield*/, customer_1.findCustomer({ _id: receiverId })];
            case 7:
                customer = _b.sent();
                if (!customer) {
                    return [2 /*return*/];
                }
                receiverInput = {
                    id: customer._id.toString(),
                    //@ts-ignore
                    participantType: receiverType_1,
                    participantProfile: customer.profileUri,
                    participantName: customer.companyName,
                };
                return [3 /*break*/, 10];
            case 8:
                func = void 0;
                if (receiverType_1 == sendBy_1.default.Admin) {
                    func = admin_1.findAdmin;
                }
                else {
                    func = employee_1.findEmployee;
                }
                return [4 /*yield*/, func({ _id: receiverId })];
            case 9:
                cust = _b.sent();
                if (!cust) {
                    return [2 /*return*/];
                }
                receiverInput = {
                    id: cust._id.toString(),
                    //@ts-ignore
                    participantType: receiverType_1,
                    participantProfile: cust.profileUri,
                    participantName: cust.username,
                };
                _b.label = 10;
            case 10: return [4 /*yield*/, conversation_model_1.default.create({
                    participants: [
                        {
                            id: _id_1.toString(),
                            //@ts-ignore
                            participantType: socket.type,
                            participantProfile: profileUri,
                            participantName: name_1,
                        },
                        receiverInput,
                    ],
                    conversationType: conversationType_1.default.Direct,
                })];
            case 11:
                conversation_1 = _b.sent();
                newConversation_1 = true;
                _b.label = 12;
            case 12:
                additional = {};
                if (fileUri && conversation_1.conversationType == conversationType_1.default.Project) {
                    additional = {
                        participants: conversation_1.participants.map(function (value) { return value.id; }),
                        projectId: conversation_1.projectId,
                        projectName: conversation_1.projectName,
                    };
                }
                messageInput = __assign(__assign({ ownerProfile: profileUri, ownerName: name_1, 
                    //@ts-ignore
                    ownerType: socket.type, ownerId: _id_1 === null || _id_1 === void 0 ? void 0 : _id_1.toString(), fileType: fileType }, additional), { participants: fileUri && conversation_1.conversationType == conversationType_1.default.Project
                        ? conversation_1.participants.map(function (value) { return value.id; })
                        : [], seen: false, message: message, fileUri: fileUri, fileName: fileName, fileSize: fileSize, conversationId: conversation_1._id });
                return [4 /*yield*/, message_model_1.default.create(messageInput)];
            case 13:
                newMessage_1 = _b.sent();
                if (!(conversation_1.conversationType == conversationType_1.default.Project && fileUri)) return [3 /*break*/, 16];
                return [4 /*yield*/, project_Service_1.findProject({ _id: conversation_1.projectId }, { files: 1 })];
            case 14:
                project = _b.sent();
                if (!project) return [3 /*break*/, 16];
                project.files.push(newMessage_1._id);
                //@ts-ignore
                project.lastUploaded = newMessage_1.createdAt;
                return [4 /*yield*/, project.save()];
            case 15:
                _b.sent();
                _b.label = 16;
            case 16:
                conversation_1.participants.forEach(function (participant, index, arr) {
                    return __awaiter(this, void 0, void 0, function () {
                        var activeConnections, conver;
                        return __generator(this, function (_a) {
                            activeConnections = serverStore_1.getActiveConnections(participant.id);
                            conver = {};
                            activeConnections.forEach(function (value) {
                                var _a, _b;
                                console.log("hello sir", value, (_a = serverStore_1.getSocketServerInstance()) === null || _a === void 0 ? void 0 : _a.in);
                                (_b = serverStore_1.getSocketServerInstance()) === null || _b === void 0 ? void 0 : _b.in(value).emit("direct-message", __assign(__assign(__assign({ message: newMessage_1, owned: participant.id == _id_1.toString() ? true : false, unseen: participant.id == _id_1.toString() ? 0 : 1 }, (conversationType_2 == conversationType_1.default.Direct ||
                                    conversationType_2 == conversationType_1.default.Primary
                                    ? { receiverId: index == 0 ? arr[1].id : arr[0].id }
                                    : {})), { receiverType: receiverType_1, _id: conversation_1 === null || conversation_1 === void 0 ? void 0 : conversation_1._id, conversationType: conversationType_2, new: newConversation_1 }), (newConversation_1
                                    ? {
                                        participants: conversation_1 === null || conversation_1 === void 0 ? void 0 : conversation_1.participants,
                                    }
                                    : {})));
                            });
                            return [2 /*return*/];
                        });
                    });
                });
                return [3 /*break*/, 18];
            case 17:
                err_1 = _b.sent();
                console.log(err_1);
                return [3 /*break*/, 18];
            case 18: return [2 /*return*/];
        }
    });
}); };
exports.default = directMessageHandler;

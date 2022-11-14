"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActiveAdmins = exports.getActiveConnections = exports.removeConnectedUser = exports.addNewConnectedUser = exports.getSocketServerInstance = exports.setSocketServerInstance = void 0;
var sendBy_1 = __importDefault(require("../api/v1/enums/sendBy"));
var connectedUsers = new Map();
var io = null;
var setSocketServerInstance = function (ioInstance) {
    io = ioInstance;
};
exports.setSocketServerInstance = setSocketServerInstance;
var getSocketServerInstance = function () {
    return io;
};
exports.getSocketServerInstance = getSocketServerInstance;
var addNewConnectedUser = function (_a) {
    var socketId = _a.socketId, userId = _a.userId, userType = _a.userType;
    connectedUsers.set(socketId, { userId: userId, userType: userType });
    console.log("new connected users");
    console.log(connectedUsers);
};
exports.addNewConnectedUser = addNewConnectedUser;
var removeConnectedUser = function (socketId) {
    if (connectedUsers.has(socketId)) {
        connectedUsers.delete(socketId);
        console.log("new connected users");
        console.log(connectedUsers);
    }
};
exports.removeConnectedUser = removeConnectedUser;
var getActiveConnections = function (userId) {
    var activeConnections = [];
    connectedUsers.forEach(function (value, key) {
        if (value.userId === userId) {
            activeConnections.push(key);
        }
    });
    return activeConnections;
};
exports.getActiveConnections = getActiveConnections;
var getActiveAdmins = function () {
    var activeConnections = [];
    connectedUsers.forEach(function (value, key) {
        if (value.userType === sendBy_1.default.Admin) {
            activeConnections.push(key);
        }
    });
    return activeConnections;
};
exports.getActiveAdmins = getActiveAdmins;

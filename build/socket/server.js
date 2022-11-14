"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = require("socket.io");
var directMessageHandler_1 = __importDefault(require("../api/v1/socketHandlers/directMessageHandler"));
var directChatHistoryHandler_1 = __importDefault(require("../api/v1/socketHandlers/directChatHistoryHandler"));
var authSocket_1 = __importDefault(require("../api/v1/middleware/authSocket"));
var serverStore = __importStar(require("./serverStore"));
var disconnectHandler_1 = __importDefault(require("../api/v1/socketHandlers/disconnectHandler"));
var newConnectionHandler_1 = __importDefault(require("../api/v1/socketHandlers/newConnectionHandler"));
var conversationsHandler_1 = __importDefault(require("../api/v1/socketHandlers/conversationsHandler"));
var updateUnseen_1 = __importDefault(require("../api/v1/socketHandlers/updateUnseen"));
var admin_1 = require("../api/v1/socketHandlers/admin");
var employee_1 = require("../api/v1/socketHandlers/employee");
var sendBy_1 = __importDefault(require("../api/v1/enums/sendBy"));
var customer_1 = require("../api/v1/socketHandlers/customer");
var registerSocketServer = function (server) {
    var io = new socket_io_1.Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });
    serverStore.setSocketServerInstance(io);
    io.use(function (socket, next) {
        authSocket_1.default(socket, next);
    });
    io.on("connection", function (socket) {
        console.log("user connected");
        console.log(socket.id);
        newConnectionHandler_1.default(socket);
        //@ts-ignore
        if (socket.type == sendBy_1.default.Admin) {
            admin_1.initialDataHandler(socket);
            //@ts-ignore
        }
        else if (socket.type == sendBy_1.default.Employee) {
            employee_1.initialEmployeeDataHandler(socket);
        }
        else {
            customer_1.initialCustomerDataHandler(socket);
        }
        socket.on("direct-message", function (data) {
            console.log("direct", data);
            directMessageHandler_1.default(socket, data);
        });
        admin_1.adminSocketHandler(socket);
        customer_1.customerSocketHandler(socket);
        employee_1.employeeSocketHandler(socket);
        socket.on("direct-chat-history", function (data) {
            directChatHistoryHandler_1.default(socket, data);
        });
        socket.on("update-unseen", function (data) {
            updateUnseen_1.default(socket, data);
        });
        socket.on("all-conversation", function (data) {
            conversationsHandler_1.default(socket);
        });
        socket.on("disconnect", function () {
            disconnectHandler_1.default(socket);
        });
    });
};
exports.default = registerSocketServer;

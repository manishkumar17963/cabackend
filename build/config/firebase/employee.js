"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var firebase_admin_1 = __importDefault(require("firebase-admin"));
var serviceAccount = require("../../../accounts/firebaseEmployeeAccount.json");
var employeeApp = firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount),
}, "employee");
exports.default = employeeApp;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
function connect() {
    return mongoose_1.default
        .connect(process.env.DB_URI, {})
        .then(function () {
        console.log("Database connected");
    })
        .catch(function (error) {
        console.error("db error", error);
        process.exit(1);
    });
}
exports.default = connect;

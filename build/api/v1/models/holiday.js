"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var HolidaySchema = new mongoose_1.default.Schema({
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    description: { type: String, default: "" },
    title: { type: String, default: "" },
    adminId: { type: String, required: true },
}, {
    timestamps: true,
});
var Holiday = mongoose_1.default.model("Holiday", HolidaySchema);
exports.default = Holiday;

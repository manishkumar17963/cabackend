"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var holidayType_1 = __importDefault(require("../enums/holidayType"));
var enumArray_1 = __importDefault(require("../helpers/enumArray"));
var SickLeaveCategorySchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    type: {
        type: String,
        required: true,
        enum: enumArray_1.default(holidayType_1.default),
    },
    value: { type: Number, required: true },
}, { _id: false });
var SettingSchema = new mongoose_1.default.Schema({
    types: { type: Map, of: SickLeaveCategorySchema },
    startTime: { type: Number, required: true },
    endTime: { type: Number, required: true },
}, {
    timestamps: true,
});
var Setting = mongoose_1.default.model("Setting", SettingSchema);
exports.default = Setting;

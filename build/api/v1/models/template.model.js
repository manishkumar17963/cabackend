"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var TemplateSchema = new mongoose_1.default.Schema({
    _id: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        alias: "name",
        unique: true,
    },
    details: { type: String, required: true },
    additionalNotes: { type: String, required: true },
    terms: [String],
});
var Template = mongoose_1.default.model("Template", TemplateSchema);
exports.default = Template;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var stateList_enum_1 = __importDefault(require("../enums/stateList.enum"));
var enumArray_1 = __importDefault(require("../helpers/enumArray"));
var BranchSchema = new mongoose_1.default.Schema({
    _id: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        alias: "name",
    },
    gstNumber: { type: String, required: true },
    state: { type: String, required: true, enum: enumArray_1.default(stateList_enum_1.default) },
    address: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: String, required: true },
    appendId: { type: String, required: true },
    invoiceNo: { type: Number, default: 0 },
    quotationNo: { type: Number, default: 0 },
});
var Branch = mongoose_1.default.model("Branch", BranchSchema);
exports.default = Branch;

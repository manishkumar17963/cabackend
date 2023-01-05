"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var quotationRel_1 = __importDefault(require("../enums/quotationRel"));
var quotationType_enum_1 = __importDefault(require("../enums/quotationType.enum"));
var enumArray_1 = __importDefault(require("../helpers/enumArray"));
var common_1 = require("./common");
var QuotationSchema = new mongoose_1.default.Schema({
    customerId: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        ref: "Customer",
    },
    gstNumber: { type: String, required: true },
    createdBy: { type: String, required: true, ref: "Admin" },
    projectId: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        ref: "Project",
    },
    templateId: {
        type: String,
        required: true,
        ref: "QuotTemplate",
    },
    projectName: { type: String, required: true },
    branchId: {
        type: String,
        required: true,
        ref: "Branch",
    },
    quotationType: {
        type: String,
        enum: enumArray_1.default(quotationType_enum_1.default),
        default: quotationType_enum_1.default.Current,
    },
    runningVersion: {
        type: Number,
        required: function () {
            //@ts-ignore
            return _this.quotationRel == quotationRel_1.default.Parent;
        },
    },
    quotationRel: {
        type: String,
        enum: enumArray_1.default(quotationRel_1.default),
        default: quotationRel_1.default.Child,
    },
    quotationNo: { type: String, required: true },
    details: { type: String, required: true },
    additionalNotes: { type: String, required: true },
    terms: [String],
    approved: { type: Boolean, default: false },
    version: { type: Number, default: 0 },
    services: [common_1.ServiceSchema],
}, { timestamps: true });
var Quotation = mongoose_1.default.model("Quotation", QuotationSchema);
exports.default = Quotation;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var paymentMethod_1 = __importDefault(require("../enums/paymentMethod"));
var paymentStatus_1 = __importDefault(require("../enums/paymentStatus"));
var enumArray_1 = __importDefault(require("../helpers/enumArray"));
var common_1 = require("./common");
var InvoiceSchema = new mongoose_1.default.Schema({
    createdBy: { type: String, required: true, ref: "Admin" },
    projectId: { type: mongoose_1.default.Types.ObjectId, required: true, ref: "Project" },
    gstNumber: { type: String, required: true },
    projectName: { type: String, required: true },
    paymentMethod: { enum: enumArray_1.default(paymentMethod_1.default), type: String },
    transactionId: String,
    expectedPaymentDate: Date,
    customerId: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        ref: "Customer",
    },
    sameCity: { type: Boolean, required: true },
    taxPercentage: { type: Number, required: true },
    tds: { type: Number },
    cgst: { type: Number, required: true },
    sgst: { type: Number, required: true },
    actualPaymentDate: Date,
    paymentAmount: Number,
    paymentStatus: {
        enum: enumArray_1.default(paymentStatus_1.default),
        type: String,
        default: paymentStatus_1.default.Unpaid,
    },
    branchId: {
        type: String,
        required: true,
        ref: "Branch",
    },
    invoiceNo: { type: String, required: true },
    notes: [String],
    services: [common_1.ServiceSchema],
});
var Invoice = mongoose_1.default.model("Invoice", InvoiceSchema);
exports.default = Invoice;

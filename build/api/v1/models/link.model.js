"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkOwned = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var sendBy_1 = __importDefault(require("../enums/sendBy"));
var enumArray_1 = __importDefault(require("../helpers/enumArray"));
var LinkOwned;
(function (LinkOwned) {
    LinkOwned["All"] = "all";
    LinkOwned["Personal"] = "personal";
})(LinkOwned = exports.LinkOwned || (exports.LinkOwned = {}));
var LinkSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    type: {
        type: String,
        default: LinkOwned.All,
        enum: enumArray_1.default(LinkOwned),
    },
    ownerId: {
        type: String,
        required: true,
    },
    ownerType: {
        type: String,
        enum: enumArray_1.default(sendBy_1.default),
        default: sendBy_1.default.Admin,
    },
    hide: { type: Boolean, default: true },
    sharedTo: [String],
}, { timestamps: true });
var Link = mongoose_1.default.model("Link", LinkSchema);
exports.default = Link;

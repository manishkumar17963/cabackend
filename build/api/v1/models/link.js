"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var sendBy_1 = __importDefault(require("../enums/sendBy"));
var enumArray_1 = __importDefault(require("../helpers/enumArray"));
var LinkOwned;
(function (LinkOwned) {
    LinkOwned["Admin"] = "admin";
    LinkOwned["Personal"] = "personal";
})(LinkOwned || (LinkOwned = {}));
var LinkSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    owned: {
        type: String,
        default: LinkOwned.Admin,
        enum: enumArray_1.default(LinkOwned),
    },
    ownerId: {
        type: String,
        required: function () {
            //@ts-ignore
            return _this.owned != LinkOwned.Admin;
        },
    },
    ownerType: {
        type: String,
        enum: enumArray_1.default(sendBy_1.default),
        default: sendBy_1.default.Admin,
    },
    hide: { type: Boolean, default: true },
    sharedTo: [String],
});
var Link = mongoose_1.default.model("Link", LinkSchema);
exports.default = Link;

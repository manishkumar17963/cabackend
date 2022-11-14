"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointLocationSchema = exports.ServiceSchema = exports.LocationSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
exports.LocationSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
}, { _id: false });
exports.ServiceSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
});
var PointSchema = new mongoose_1.default.Schema({
    type: {
        type: String,
        enum: ["Point"],
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
    },
}, { _id: false });
exports.PointLocationSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
    },
    location: {
        type: PointSchema,
        required: true,
    },
}, { _id: false, timestamps: true });

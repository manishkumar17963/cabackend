"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    signatureVersion: "v4",
    region: "ap-south-1",
    endpoint: "s3-ap-south-1.amazonaws.com",
});
exports.default = s3;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signatureRequest3 = exports.signatureRequest2 = exports.signatureResponse1 = exports.signatureRequest1 = void 0;
var crypto_1 = __importDefault(require("crypto"));
function valueCleaner(keyword, data) {
    return data[keyword] ? data[keyword] : "";
}
//TODO: switch below methods to use value cleaner
var signatureRequest1 = function (data, secretKey) {
    //for checkout
    var keys = Object.keys(data);
    keys.sort();
    signatureData = "";
    keys.forEach(function (key) {
        signatureData += key + data[key];
    });
    return crypto_1.default
        .createHmac("sha256", secretKey)
        .update(signatureData)
        .digest("base64");
};
exports.signatureRequest1 = signatureRequest1;
var signatureResponse1 = function (data, secretKey) {
    signatureData =
        data["orderId"] +
            data["orderAmount"] +
            data["referenceId"] +
            data["txStatus"] +
            data["paymentMode"] +
            data["txMsg"] +
            data["txTime"];
    return crypto_1.default
        .createHmac("sha256", secretKey)
        .update(signatureData)
        .digest("base64");
};
exports.signatureResponse1 = signatureResponse1;
var signatureRequest2 = function (data, secretKey) {
    //for merchant hosted
    console.log("data recieved:", data);
    signatureData =
        "appId=" +
            data["appId"] +
            "&orderId=" +
            data["orderId"] +
            "&orderAmount=" +
            data["orderAmount"] +
            "&returnUrl=" +
            data["returnUrl"] +
            "&paymentModes=" +
            valueCleaner("paymentModes", data);
    console.log("signatureData:", signatureData);
    return crypto_1.default
        .createHmac("sha256", secretKey)
        .update(signatureData)
        .digest("base64");
};
exports.signatureRequest2 = signatureRequest2;
var signatureRequest3 = function (data, secretKey) {
    //for seamless basic
    console.log("data received:", data);
    signatureData =
        "appId=" +
            data["appId"] +
            "&orderId=" +
            data["orderId"] +
            "&orderAmount=" +
            data["orderAmount"] +
            "&customerEmail=" +
            data["customerEmail"] +
            "&customerPhone=" +
            data["customerPhone"] +
            "&orderCurrency=" +
            "INR";
    return crypto_1.default
        .createHmac("sha256", secretKey)
        .update(signatureData)
        .digest("base64");
};
exports.signatureRequest3 = signatureRequest3;

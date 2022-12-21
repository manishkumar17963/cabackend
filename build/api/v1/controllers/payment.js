"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoicePaymentSuccessHandler = exports.invoicePaymentCallbackHandler = exports.invoicePaymentHandler = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var checksum_1 = require("../helpers/checksum");
var appPayments_1 = __importDefault(require("../helpers/appPayments"));
var https_1 = __importDefault(require("https"));
var checkErrors_1 = __importDefault(require("../helpers/checkErrors"));
var invoice_service_1 = require("../services/invoice.service");
var paymentStatus_1 = __importDefault(require("../enums/paymentStatus"));
var customError_1 = __importDefault(require("../helpers/customError"));
var project_Service_1 = require("../services/project.Service");
var taskStatus_1 = __importDefault(require("../enums/taskStatus"));
var paymentMethod_1 = __importDefault(require("../enums/paymentMethod"));
function paymentHandler(req, res, amount, platform) {
    if (platform === void 0) { platform = "web"; }
    return __awaiter(this, void 0, void 0, function () {
        var orderId, params, callbackUrl;
        return __generator(this, function (_a) {
            orderId = new mongoose_1.default.Types.ObjectId();
            params = {};
            callbackUrl = process.env.CALLBACK_URL + "/invoice/payment/" + req.params.invoiceId + "/" + req.user._id;
            params["MID"] = process.env.MERCHANT_ID;
            params["WEBSITE"] = process.env.MERCHANT_WEBSITE;
            params["CHANNEL_ID"] = "WEB";
            params["INDUSTRY_TYPE_ID"] = "Retail";
            params["ORDER_ID"] = orderId.toString();
            params["CUST_ID"] = "" + req.user._id;
            params["TXN_AMOUNT"] = "" + amount;
            params["CALLBACK_URL"] = callbackUrl;
            params["EMAIL"] = "devankan161pathak@gmail.com";
            params["MOBILE_NO"] = req.user.number;
            checksum_1.genchecksum(params, process.env.MERCHANT_KEY, function (err, checksum) {
                if (platform == "web") {
                    if (err) {
                        console.log("Error: " + err);
                    }
                    var paytmParams = __assign(__assign({}, params), { CHECKSUMHASH: checksum });
                    console.log("webdata", paytmParams);
                    res.json(paytmParams);
                }
                else {
                    appPayments_1.default(req, res, err, params, checksum);
                }
            });
            return [2 /*return*/];
        });
    });
}
function callbackHandler(req, res, handlerFunction) {
    return __awaiter(this, void 0, void 0, function () {
        var session, responseData, checksumhash, result, paytmParams, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 4]);
                    responseData = req.body;
                    console.log(responseData);
                    return [4 /*yield*/, mongoose_1.default.startSession()];
                case 1:
                    session = _a.sent();
                    session.startTransaction();
                    console.log("paymentRecieop", responseData);
                    checksumhash = responseData.CHECKSUMHASH;
                    result = checksum_1.verifychecksum(responseData, process.env.MERCHANT_KEY, checksumhash);
                    if (result) {
                        paytmParams = {};
                        paytmParams["MID"] = req.body.MID;
                        paytmParams["ORDERID"] = req.body.ORDERID;
                        /*
                         * Generate checksum by parameters we have
                         * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
                         */
                        checksum_1.genchecksum(paytmParams, process.env.MERCHANT_KEY, function (err, checksum) {
                            paytmParams["CHECKSUMHASH"] = checksum;
                            var post_data = JSON.stringify(paytmParams);
                            var options = {
                                /* for Production */
                                // hostname: "securegw.paytm.in",
                                /* for development */
                                hostname: "securegw-stage.paytm.in",
                                port: 443,
                                path: "/order/status",
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Content-Length": post_data.length,
                                },
                            };
                            var response = "";
                            var post_req = https_1.default.request(options, function (post_res) {
                                post_res.on("data", function (chunk) {
                                    response += chunk;
                                });
                                post_res.on("end", function () {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var result, order;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    result = JSON.parse(response);
                                                    console.log("result", result);
                                                    if (!(result.STATUS === "TXN_SUCCESS")) return [3 /*break*/, 3];
                                                    return [4 /*yield*/, handlerFunction(req, session, result.TXNAMOUNT, result.TXNID)];
                                                case 1:
                                                    order = _a.sent();
                                                    return [4 /*yield*/, session.commitTransaction()];
                                                case 2:
                                                    _a.sent();
                                                    res.redirect(process.env.WEB_URL + "/communication");
                                                    return [3 /*break*/, 4];
                                                case 3:
                                                    res.redirect(process.env.WEB_URL + "/communication");
                                                    _a.label = 4;
                                                case 4: return [2 /*return*/];
                                            }
                                        });
                                    });
                                });
                            });
                            post_req.write(post_data);
                            post_req.end();
                        });
                    }
                    else {
                        session.commitTransaction();
                        res.redirect(process.env.WEB_URL + "/failure");
                        console.log("Checksum Mismatched");
                    }
                    return [3 /*break*/, 4];
                case 2:
                    err_1 = _a.sent();
                    //@ts-ignore
                    return [4 /*yield*/, session.abortTransaction()];
                case 3:
                    //@ts-ignore
                    _a.sent();
                    checkErrors_1.default(err_1, res);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function invoicePaymentHandler(req, res) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function () {
        var user, invoice, amount, err_2;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 3, , 4]);
                    user = req.user;
                    return [4 /*yield*/, invoice_service_1.findInvoice({
                            _id: req.params.invoiceId,
                            paymentStatus: paymentStatus_1.default.Unpaid,
                            customerId: user._id,
                        }, { amount: 1, services: 1, cgst: 1, sgst: 1 })];
                case 1:
                    invoice = _e.sent();
                    if (!invoice) {
                        throw new customError_1.default("Bad request", 404, "Invoice already paid or no such invoice found");
                    }
                    amount = invoice.amount;
                    if (((_a = req.body.tds) !== null && _a !== void 0 ? _a : 0) > amount) {
                        throw new customError_1.default("Bad request", 404, "tds amount can not be greater than amount");
                    }
                    return [4 /*yield*/, paymentHandler(req, res, Math.ceil(amount - ((_b = req.body.tds) !== null && _b !== void 0 ? _b : 0) + ((_c = invoice.cgst) !== null && _c !== void 0 ? _c : 0) + ((_d = invoice.sgst) !== null && _d !== void 0 ? _d : 0)))];
                case 2:
                    _e.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _e.sent();
                    checkErrors_1.default(err_2, res);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.invoicePaymentHandler = invoicePaymentHandler;
function invoicePaymentCallbackHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, callbackHandler(req, res, invoicePaymentSuccessHandler)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.invoicePaymentCallbackHandler = invoicePaymentCallbackHandler;
function invoicePaymentSuccessHandler(req, session, amount, transactionId) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var invoice, project;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, invoice_service_1.findInvoice({
                        _id: req.params.invoiceId,
                        paymentStatus: paymentStatus_1.default.Unpaid,
                        customerId: req.params.customerId,
                    }, {}, { session: session })];
                case 1:
                    invoice = _c.sent();
                    if (!invoice) {
                        throw new customError_1.default("Bad request", 404, "Invoice already paid or no such invoice found");
                    }
                    invoice.actualPaymentDate = new Date();
                    invoice.paymentStatus = paymentStatus_1.default.Paid;
                    invoice.tds =
                        invoice.amount + ((_a = invoice.cgst) !== null && _a !== void 0 ? _a : 0) + ((_b = invoice.sgst) !== null && _b !== void 0 ? _b : 0) - amount;
                    console.log("tds", invoice.tds);
                    return [4 /*yield*/, invoice.save()];
                case 2:
                    _c.sent();
                    return [4 /*yield*/, project_Service_1.findProject({
                            _id: invoice.projectId,
                            status: taskStatus_1.default.Completed,
                            paymentStatus: { $ne: paymentStatus_1.default.Paid },
                            paymentInitiated: true,
                        })];
                case 3:
                    project = _c.sent();
                    if (!project) {
                        throw new customError_1.default("Bad Request", 404, "No such project found or payment not initiated");
                    }
                    project.paymentStatus = paymentStatus_1.default.Paid;
                    project.paymentMethod = paymentMethod_1.default.Online;
                    project.transactionId = transactionId;
                    project.actualPaymentDate = new Date();
                    return [4 /*yield*/, project.save()];
                case 4:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.invoicePaymentSuccessHandler = invoicePaymentSuccessHandler;

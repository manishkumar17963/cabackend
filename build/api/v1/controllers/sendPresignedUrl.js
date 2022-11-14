"use strict";
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
exports.sendPresignedUrlHandler = void 0;
var aws_1 = __importDefault(require("../../../config/aws"));
var uuid_1 = require("uuid");
var checkErrors_1 = __importDefault(require("../helpers/checkErrors"));
var getSignedUrlPromise = function (operation, params) {
    return new Promise(function (resolve, reject) {
        aws_1.default.getSignedUrl(operation, params, function (err, url) {
            err ? reject(err) : resolve(url);
        });
    });
};
var sendPresignedUrlHandler = function (folder, profile, message) {
    if (profile === void 0) { profile = false; }
    if (message === void 0) { message = false; }
    return function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var presignedUrlList, key, num, url, url, i, url, err_1;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        return __generator(this, function (_l) {
            switch (_l.label) {
                case 0:
                    console.log("presignedurl");
                    presignedUrlList = [];
                    _l.label = 1;
                case 1:
                    _l.trys.push([1, 11, , 12]);
                    key = void 0;
                    num = (_a = req.body.num) !== null && _a !== void 0 ? _a : 1;
                    if (!profile) return [3 /*break*/, 3];
                    key = folder + "/profile/" + ((_c = (_b = req.body) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : uuid_1.v4()) + ".jpeg";
                    return [4 /*yield*/, getSignedUrlPromise("putObject", {
                            Bucket: "femperiol",
                            ContentType: "image/jpeg",
                            Key: key,
                            ACL: "public-read",
                        })];
                case 2:
                    url = _l.sent();
                    res.send({ url: url, key: key });
                    return [3 /*break*/, 10];
                case 3:
                    if (!message) return [3 /*break*/, 5];
                    key = folder + "/message/" + ((_e = (_d = req.body) === null || _d === void 0 ? void 0 : _d.fileName) !== null && _e !== void 0 ? _e : uuid_1.v4()) + "." + ((_g = (_f = req.body.fileType.split("/")) === null || _f === void 0 ? void 0 : _f.slice(-1)) !== null && _g !== void 0 ? _g : "jpeg");
                    return [4 /*yield*/, getSignedUrlPromise("putObject", {
                            Bucket: "femperiol",
                            ContentType: req.body.fileType,
                            Key: key,
                            ACL: "public-read",
                        })];
                case 4:
                    url = _l.sent();
                    res.send({ url: url, key: key });
                    return [3 /*break*/, 10];
                case 5:
                    i = 0;
                    _l.label = 6;
                case 6:
                    if (!(i < num)) return [3 /*break*/, 9];
                    key = folder + "/" + req.user._id + "/" + ((_k = (_j = (_h = req.body) === null || _h === void 0 ? void 0 : _h.name) === null || _j === void 0 ? void 0 : _j[i]) !== null && _k !== void 0 ? _k : uuid_1.v4()) + ".jpeg";
                    return [4 /*yield*/, getSignedUrlPromise("putObject", {
                            Bucket: "femperiol",
                            ContentType: "image/jpeg",
                            Key: key,
                            ACL: "public-read",
                        })];
                case 7:
                    url = _l.sent();
                    presignedUrlList.push({ url: url, key: key });
                    _l.label = 8;
                case 8:
                    i++;
                    return [3 /*break*/, 6];
                case 9:
                    console.log("presignedurl", presignedUrlList);
                    res.send(presignedUrlList).status(201);
                    _l.label = 10;
                case 10: return [3 /*break*/, 12];
                case 11:
                    err_1 = _l.sent();
                    checkErrors_1.default(err_1, res);
                    return [3 /*break*/, 12];
                case 12: return [2 /*return*/];
            }
        });
    }); };
};
exports.sendPresignedUrlHandler = sendPresignedUrlHandler;

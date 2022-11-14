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
var mongoose_1 = __importDefault(require("mongoose"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var sendBy_1 = __importDefault(require("../enums/sendBy"));
var AdminSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
    },
    importantFiles: [{ type: mongoose_1.default.Types.ObjectId, ref: "Message" }],
    forgotOtp: Number,
    _id: {
        type: String,
        min: 10,
        trim: true,
        alias: "number",
        required: true,
    },
    password: {
        type: String,
        min: 8,
        trim: true,
        validate: function (value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error("password cannot contain password");
            }
        },
        required: true,
    },
    tokens: [
        {
            token: {
                type: String,
            },
        },
    ],
    profileUri: { type: String },
    code: { type: Number, required: true },
    codeValid: { type: Boolean, required: true },
    webToken: [
        {
            token: String,
            notificationToken: {
                endpoint: String,
                keys: {
                    p256dh: String,
                    auth: String,
                },
            },
        },
    ],
}, {
    timestamps: true,
    _id: false,
});
AdminSchema.index({ createdAt: 1 }, { expireAfterSeconds: 600, partialFilterExpression: { codeValid: true } });
AdminSchema.methods.comparePassword = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function () {
        var admin;
        return __generator(this, function (_a) {
            admin = this;
            return [2 /*return*/, bcryptjs_1.default.compare(candidatePassword, admin.password)];
        });
    });
};
AdminSchema.methods.generateAuthToken = function (notificationToken) {
    return __awaiter(this, void 0, void 0, function () {
        var admin, token, webToken;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    admin = this;
                    token = jsonwebtoken_1.default.sign({ _id: admin._id, type: sendBy_1.default.Admin }, process.env.JWT_SECRET);
                    webToken = { token: token, notificationToken: notificationToken };
                    console.log("webToken", webToken);
                    admin.tokens.push({ token: token });
                    admin.webToken.push(webToken);
                    admin.codeValid = false;
                    return [4 /*yield*/, admin.save()];
                case 1:
                    _a.sent();
                    return [2 /*return*/, token];
            }
        });
    });
};
AdminSchema.methods.toJSON = function () {
    var admin = this;
    var adminObject = admin.toObject();
    delete adminObject.password;
    delete adminObject.tokens;
    return adminObject;
};
AdminSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function () {
        var admin, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    admin = this;
                    if (!admin.isModified("password")) return [3 /*break*/, 2];
                    _a = admin;
                    return [4 /*yield*/, bcryptjs_1.default.hash(admin.password, 8)];
                case 1:
                    _a.password = _b.sent();
                    _b.label = 2;
                case 2:
                    next();
                    return [2 /*return*/];
            }
        });
    });
});
var Admin = mongoose_1.default.model("Admin", AdminSchema);
exports.default = Admin;

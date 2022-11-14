"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.appLoginSchema = exports.webLoginSchema = exports.createCustomerSchema = exports.createEmployeeSchema = exports.createAdminSchema = exports.verifyPersonSchema = exports.verifyAdminOrEmployeeSchema = void 0;
var joi_1 = require("joi");
var companyType_1 = __importDefault(require("../enums/companyType"));
var enumArray_1 = __importDefault(require("../helpers/enumArray"));
var webTokenSchema = joi_1.object({
    endpoint: joi_1.string().required(),
    keys: joi_1.object({
        p256dh: joi_1.string().required(),
        auth: joi_1.string().required(),
    }),
});
exports.verifyAdminOrEmployeeSchema = joi_1.object({
    body: joi_1.object({
        code: joi_1.number().required(),
        webToken: webTokenSchema,
        number: joi_1.string()
            .required()
            .regex(/^[6-9]\d{9}$/),
    }),
});
exports.verifyPersonSchema = joi_1.object({
    body: joi_1.object({
        number: joi_1.string().required(),
        code: joi_1.number().required(),
        webToken: webTokenSchema,
    }),
});
exports.createAdminSchema = joi_1.object({
    body: joi_1.object({
        username: joi_1.string().required(),
        number: joi_1.string().required(),
        profileUri: joi_1.string(),
        password: joi_1.string()
            .required()
            .min(6)
            .regex(/^[a-zA-Z0-9_.-]*$/),
    }),
});
exports.createEmployeeSchema = joi_1.object({
    body: joi_1.object({
        username: joi_1.string().required(),
        number: joi_1.string().required(),
        email: joi_1.string().required(),
        profileUri: joi_1.string(),
        password: joi_1.string()
            .required()
            .min(6)
            .regex(/^[a-zA-Z0-9_.-]*$/),
    }),
});
exports.createCustomerSchema = joi_1.object({
    body: joi_1.object({
        firstname: joi_1.string().required(),
        lastname: joi_1.string(),
        number: joi_1.string().required(),
        companyType: (_a = joi_1.string())
            .valid.apply(_a, enumArray_1.default(companyType_1.default)).required(),
        email: joi_1.string().required(),
        accept: (_b = joi_1.boolean())
            .valid.apply(_b, [true]).required(),
        companyLocation: joi_1.object({
            name: joi_1.string().required(),
            latitude: joi_1.number().required(),
            longitude: joi_1.number().required(),
        }),
        companyName: joi_1.string().required(),
        noOfEmployee: joi_1.number(),
        password: joi_1.string()
            .required()
            .min(6)
            .regex(/^[a-zA-Z0-9_.-]*$/),
    }),
});
exports.webLoginSchema = joi_1.object({
    body: joi_1.object({
        password: joi_1.string().required(),
        number: joi_1.string().required(),
        webToken: joi_1.object({
            endpoint: joi_1.string().required(),
            keys: joi_1.object({
                p256dh: joi_1.string().required(),
                auth: joi_1.string().required(),
            }),
        }),
    }),
});
exports.appLoginSchema = joi_1.object({
    body: joi_1.object({
        password: joi_1.string().required(),
        number: joi_1.string().required(),
        deviceToken: joi_1.string(),
    }),
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", { value: true });
exports.addHolidaySchema = exports.addBranchSchema = exports.addTemplateSchema = exports.updateMeetingEmployeeSchema = exports.requestMeetingSchema = exports.assignEmployeeToCustomerSchema = exports.assignPrimaryEmployeeSchema = exports.assignTaskToEmployeeSchema = exports.updateTaskSchema = exports.createTaskSchema = exports.toggleAttendanceSchema = exports.approveHolidaySchema = exports.addCommentSchema = exports.updateProjectSchema = exports.createProjectSchema = exports.changePaymentStatusManuallySchema = exports.createInvoiceSchema = exports.createQuotationSchema = void 0;
var joi_1 = require("joi");
var priority_1 = __importDefault(require("../enums/priority"));
var enumArray_1 = __importDefault(require("../helpers/enumArray"));
var billingType_1 = __importDefault(require("../enums/billingType"));
var taskStatus_1 = __importDefault(require("../enums/taskStatus"));
var paymentMethod_1 = __importDefault(require("../enums/paymentMethod"));
var meetingMode_1 = __importDefault(require("../enums/meetingMode"));
//new
exports.createQuotationSchema = joi_1.object({
    body: joi_1.object({
        projectId: joi_1.string().required(),
        templateId: joi_1.string().required(),
        details: joi_1.string().required(),
        additionNotes: joi_1.string().default(""),
        terms: joi_1.array().items(joi_1.string().required()).required().required(),
        branchId: joi_1.string().required(),
        services: joi_1.array()
            .items(joi_1.object({
            name: joi_1.string().required(),
            description: joi_1.string(),
            price: joi_1.number().required(),
        }))
            .required(),
    }),
});
exports.createInvoiceSchema = joi_1.object({
    body: joi_1.object({
        projectId: joi_1.string().required(),
        notes: joi_1.array().items(joi_1.string().required()).required(),
        branchId: joi_1.string().required(),
        expectedPaymentDate: joi_1.date(),
        services: joi_1.array()
            .items(joi_1.object({
            name: joi_1.string().required(),
            description: joi_1.string(),
            price: joi_1.number().required(),
        }))
            .required(),
    }),
});
exports.changePaymentStatusManuallySchema = joi_1.object({
    body: joi_1.object({
        projectId: joi_1.string().required(),
        actualPaymentDate: joi_1.string().required(),
        transactionId: joi_1.string(),
        paymentMethod: (_a = joi_1.string())
            .valid.apply(_a, enumArray_1.default(paymentMethod_1.default)).required(),
    })
        .required()
        .strict(),
});
exports.createProjectSchema = joi_1.object({
    body: joi_1.object({
        employeeId: joi_1.string(),
        customerId: joi_1.string().required(),
        projectName: joi_1.string().required(),
        billingType: (_b = joi_1.string())
            .valid.apply(_b, enumArray_1.default(billingType_1.default)).required(),
        startDate: joi_1.string().required(),
        expectedEndDate: joi_1.string().required(),
        description: joi_1.string().required(),
        priority: (_c = joi_1.string())
            .valid.apply(_c, enumArray_1.default(priority_1.default)).required(),
    })
        .required()
        .strict(),
});
exports.updateProjectSchema = joi_1.object({
    body: joi_1.object({
        projectId: joi_1.string().required(),
        name: joi_1.string().required(),
        billingType: (_d = joi_1.string())
            .valid.apply(_d, enumArray_1.default(billingType_1.default)).required(),
        startDate: joi_1.string().required(),
        expectedEndDate: joi_1.string().required(),
        description: joi_1.string().required(),
        priority: (_e = joi_1.string())
            .valid.apply(_e, enumArray_1.default(priority_1.default)).required(),
    })
        .required()
        .strict(),
});
exports.addCommentSchema = joi_1.object({
    body: joi_1.object({
        projectId: joi_1.string().required(),
        commentId: joi_1.string(),
        comment: joi_1.string().required(),
    }),
});
exports.approveHolidaySchema = joi_1.object({
    body: joi_1.object({
        employeeId: joi_1.string().required(),
        holidayRequestId: joi_1.string().required(),
    }),
});
exports.toggleAttendanceSchema = joi_1.object({
    body: joi_1.object({
        attendanceId: joi_1.string().required(),
        employeeId: joi_1.string().required(),
    }),
});
exports.createTaskSchema = joi_1.object({
    body: joi_1.object({
        employeeId: joi_1.string(),
        name: joi_1.string().required(),
        projectId: joi_1.string().required(),
        expectedEndDate: joi_1.string().required(),
        description: joi_1.string().required(),
        status: (_f = joi_1.string())
            .valid.apply(_f, enumArray_1.default(taskStatus_1.default)).required(),
        priority: (_g = joi_1.string())
            .valid.apply(_g, enumArray_1.default(priority_1.default)).required(),
    })
        .required()
        .strict(),
});
exports.updateTaskSchema = joi_1.object({
    body: joi_1.object({
        name: joi_1.string().required(),
        taskId: joi_1.string().required(),
        expectedEndDate: joi_1.string().required(),
        description: joi_1.string().required(),
        status: (_h = joi_1.string())
            .valid.apply(_h, enumArray_1.default(taskStatus_1.default)).required(),
        priority: (_j = joi_1.string())
            .valid.apply(_j, enumArray_1.default(priority_1.default)).required(),
    })
        .required()
        .strict(),
});
exports.assignTaskToEmployeeSchema = joi_1.object({
    body: joi_1.object({
        taskId: joi_1.string().required(),
        employeeId: joi_1.string().required(),
    })
        .required()
        .strict(),
});
exports.assignPrimaryEmployeeSchema = joi_1.object({
    body: joi_1.object({
        project: joi_1.string().required(),
        employeeId: joi_1.string().required(),
    })
        .required()
        .strict(),
});
exports.assignEmployeeToCustomerSchema = joi_1.object({
    body: joi_1.object({
        customerId: joi_1.string().required(),
        employeeId: joi_1.string().required(),
    })
        .required()
        .strict(),
});
var pointLocationSchema = joi_1.object({
    name: joi_1.string().required(),
    location: joi_1.object({
        type: (_k = joi_1.string())
            .valid.apply(_k, ["Point"]).required(),
        coordinates: joi_1.array().items(joi_1.number().required()).length(2).required(),
    }),
});
exports.requestMeetingSchema = joi_1.object({
    body: joi_1.object({
        projectId: joi_1.string().required(),
        startDate: joi_1.date().required(),
        mode: (_l = joi_1.string())
            .valid.apply(_l, enumArray_1.default(meetingMode_1.default)).required(),
        slotTime: joi_1.number(),
        endDate: joi_1.string(),
        comment: joi_1.string().default(""),
        requestedLocation: pointLocationSchema,
        employeeId: joi_1.string(),
    })
        .required()
        .strict(),
});
exports.updateMeetingEmployeeSchema = joi_1.object({
    body: joi_1.object({
        meetingId: joi_1.string().required(),
        employeeId: joi_1.string().required(),
    }),
});
exports.addTemplateSchema = joi_1.object({
    body: joi_1.object({
        terms: joi_1.array().items(joi_1.string().required()).required(),
        name: joi_1.string().required(),
        details: joi_1.string(),
        additionalNotes: joi_1.string(),
    }),
});
exports.addBranchSchema = joi_1.object({
    body: joi_1.object({
        gstNumber: joi_1.string().required(),
        name: joi_1.string().required(),
        appendId: joi_1.string().required(),
        invoiceNo: joi_1.number().required(),
        quotationNo: joi_1.number().required(),
        address: joi_1.string().required(),
        number: joi_1.string().required(),
        email: joi_1.string().required(),
    }),
});
exports.addHolidaySchema = joi_1.object({
    body: joi_1.object({
        fromDateString: joi_1.string().required(),
        toDateString: joi_1.string().required(),
        description: joi_1.string().required(),
        title: joi_1.string().required(),
    }),
});

import { object, string, number, boolean, date, array } from "joi";
import HolidayType from "../enums/holidayType";
import Priority from "../enums/priority";
import convertEnumToArray from "../helpers/enumArray";
import ProjectStatus from "../enums/taskStatus";
import BillingType from "../enums/billingType";
import TaskStatus from "../enums/taskStatus";
import PaymentMethod from "../enums/paymentMethod";
import MeetingMode from "../enums/meetingMode";

//new

export const createQuotationSchema = object({
  body: object({
    projectId: string().required(),
    templateId: string().required(),
    details: string().required(),
    additionNotes: string().default(""),
    terms: array().items(string().required()).required().required(),
    branchId: string().required(),

    services: array()
      .items(
        object({
          name: string().required(),
          description: string(),
          price: number().required(),
        })
      )
      .required(),
  }),
});

export const createInvoiceSchema = object({
  body: object({
    projectId: string().required(),
    notes: array().items(string().required()).required(),
    branchId: string().required(),
    expectedPaymentDate: date(),

    services: array()
      .items(
        object({
          name: string().required(),
          description: string(),
          price: number().required(),
        })
      )
      .required(),
  }),
});

export const changePaymentStatusManuallySchema = object({
  body: object({
    projectId: string().required(),
    actualPaymentDate: string().required(),
    transactionId: string(),
    paymentMethod: string()
      .valid(...convertEnumToArray(PaymentMethod))
      .required(),
  })
    .required()
    .strict(),
});

export const createProjectSchema = object({
  body: object({
    employeeId: string(),
    customerId: string().required(),
    projectName: string().required(),
    billingType: string()
      .valid(...convertEnumToArray(BillingType))
      .required(),
    startDate: string().required(),
    expectedEndDate: string().required(),
    description: string().required(),
    priority: string()
      .valid(...convertEnumToArray(Priority))
      .required(),
  })
    .required()
    .strict(),
});

export const updateProjectSchema = object({
  body: object({
    projectId: string().required(),
    name: string().required(),
    billingType: string()
      .valid(...convertEnumToArray(BillingType))
      .required(),
    startDate: string().required(),
    expectedEndDate: string().required(),
    description: string().required(),
    priority: string()
      .valid(...convertEnumToArray(Priority))
      .required(),
  })
    .required()
    .strict(),
});

export const addCommentSchema = object({
  body: object({
    projectId: string().required(),
    commentId: string(),
    comment: string().required(),
  }),
});

export const approveHolidaySchema = object({
  body: object({
    employeeId: string().required(),
    holidayRequestId: string().required(),
  }),
});

export const toggleAttendanceSchema = object({
  body: object({
    attendanceId: string().required(),
    employeeId: string().required(),
  }),
});

export const createTaskSchema = object({
  body: object({
    employeeId: string(),

    name: string().required(),
    projectId: string().required(),
    expectedEndDate: string().required(),
    description: string().required(),
    status: string()
      .valid(...convertEnumToArray(TaskStatus))
      .required(),
    priority: string()
      .valid(...convertEnumToArray(Priority))
      .required(),
  })
    .required()
    .strict(),
});

export const updateTaskSchema = object({
  body: object({
    name: string().required(),
    taskId: string().required(),
    expectedEndDate: string().required(),
    description: string().required(),
    status: string()
      .valid(...convertEnumToArray(TaskStatus))
      .required(),
    priority: string()
      .valid(...convertEnumToArray(Priority))
      .required(),
  })
    .required()
    .strict(),
});

export const assignTaskToEmployeeSchema = object({
  body: object({
    taskId: string().required(),
    employeeId: string().required(),
  })
    .required()
    .strict(),
});

export const assignPrimaryEmployeeSchema = object({
  body: object({
    project: string().required(),
    employeeId: string().required(),
  })
    .required()
    .strict(),
});

export const assignEmployeeToCustomerSchema = object({
  body: object({
    customerId: string().required(),
    employeeId: string().required(),
  })
    .required()
    .strict(),
});

const pointLocationSchema = object({
  name: string().required(),
  location: object({
    type: string()
      .valid(...["Point"])
      .required(),
    coordinates: array().items(number().required()).length(2).required(),
  }),
});

export const requestMeetingSchema = object({
  body: object({
    projectId: string().required(),
    startDate: date().required(),
    mode: string()
      .valid(...convertEnumToArray(MeetingMode))
      .required(),
    slotTime: number(),
    endDate: string(),
    comment: string().default(""),
    requestedLocation: pointLocationSchema,
    employeeId: string(),
  })
    .required()
    .strict(),
});

export const updateMeetingEmployeeSchema = object({
  body: object({
    meetingId: string().required(),
    employeeId: string().required(),
  }),
});
export const addTemplateSchema = object({
  body: object({
    terms: array().items(string().required()).required(),
    name: string().required(),
    details: string(),
    additionalNotes: string(),
  }),
});
export const addBranchSchema = object({
  body: object({
    name: string().required(),
    appendId: string().required(),
    invoiceNo: number().required(),
    quotationNo: number().required(),
    address: string().required(),
    number: string().required(),
    email: string().required(),
  }),
});
export const addHolidaySchema = object({
  body: object({
    fromDateString: string().required(),
    toDateString: string().required(),
    description: string().required(),
    title: string().required(),
  }),
});

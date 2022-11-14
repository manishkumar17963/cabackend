import { object, string, number, boolean } from "joi";
import CompanyType from "../enums/companyType";
import convertEnumToArray from "../helpers/enumArray";

const webTokenSchema = object({
  endpoint: string().required(),
  keys: object({
    p256dh: string().required(),
    auth: string().required(),
  }),
});

export const verifyAdminOrEmployeeSchema = object({
  body: object({
    code: number().required(),
    webToken: webTokenSchema,
    number: string()
      .required()
      .regex(/^[6-9]\d{9}$/),
  }),
});

export const verifyPersonSchema = object({
  body: object({
    number: string().required(),
    code: number().required(),
    webToken: webTokenSchema,
  }),
});

export const createAdminSchema = object({
  body: object({
    username: string().required(),
    number: string().required(),
    profileUri: string(),

    password: string()
      .required()
      .min(6)
      .regex(/^[a-zA-Z0-9_.-]*$/),
  }),
});

export const createEmployeeSchema = object({
  body: object({
    username: string().required(),
    number: string().required(),
    email: string().required(),
    profileUri: string(),

    password: string()
      .required()
      .min(6)
      .regex(/^[a-zA-Z0-9_.-]*$/),
  }),
});

export const createCustomerSchema = object({
  body: object({
    firstname: string().required(),
    lastname: string(),
    number: string().required(),
    companyType: string()
      .valid(...convertEnumToArray(CompanyType))
      .required(),
    email: string().required(),
    accept: boolean()
      .valid(...[true])
      .required(),
    companyLocation: object({
      name: string().required(),
      latitude: number().required(),
      longitude: number().required(),
    }),
    companyName: string().required(),
    noOfEmployee: number(),
    password: string()
      .required()
      .min(6)
      .regex(/^[a-zA-Z0-9_.-]*$/),
  }),
});

export const webLoginSchema = object({
  body: object({
    password: string().required(),
    number: string().required(),
    webToken: object({
      endpoint: string().required(),
      keys: object({
        p256dh: string().required(),
        auth: string().required(),
      }),
    }),
  }),
});

export const appLoginSchema = object({
  body: object({
    password: string().required(),
    number: string().required(),
    deviceToken: string(),
  }),
});

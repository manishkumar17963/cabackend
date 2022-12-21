import express from "express";

import {
  addKycHandler,
  addMeetingHandler,
  createCustomerHandler,
  createProjectForCustomerHandler,
  customerConnectMeetingHandler,
  getStatusHandler,
  loginCustomerHandler,
  logoutCustomerHandler,
  requestMeetingHandler,
  verifyCustomerHandler,
} from "../controllers/customer";
import {
  invoicePaymentCallbackHandler,
  invoicePaymentHandler,
} from "../controllers/payment";
import authRequired from "../middleware/auth";

import validate from "../middleware/validateRequest";
import Customer from "../models/customer";
import { requestMeetingSchema } from "../schema/admin";

import {
  createCustomerSchema,
  createEmployeeSchema,
  verifyPersonSchema,
  webLoginSchema,
} from "../schema/common";

const CustomerRouter = express.Router();

CustomerRouter.post(
  "/signup",
  validate(createCustomerSchema),
  createCustomerHandler
);

CustomerRouter.post(
  "/signup/verify",
  validate(verifyPersonSchema),
  verifyCustomerHandler
);

CustomerRouter.post("/add/kyc", authRequired(Customer), addKycHandler);

CustomerRouter.post(
  "/invoice/payment/:invoiceId",
  authRequired(Customer),
  invoicePaymentHandler
);

CustomerRouter.post(
  "/callback/invoice/payment/:invoiceId/:customerId",

  invoicePaymentCallbackHandler
);

CustomerRouter.post(
  "/login/web",
  validate(webLoginSchema),
  loginCustomerHandler
);

CustomerRouter.post("/logout", logoutCustomerHandler);

CustomerRouter.post(
  "/create/project",
  [authRequired(Customer)],
  createProjectForCustomerHandler
);

CustomerRouter.post(
  "/add/meeting",
  [validate(requestMeetingSchema), authRequired(Customer)],
  requestMeetingHandler
);

CustomerRouter.post(
  "/add/other/meeting",
  [authRequired(Customer)],
  addMeetingHandler
);
CustomerRouter.get("/status", authRequired(Customer), getStatusHandler);

CustomerRouter.post(
  "/join/meeting",
  [authRequired(Customer)],
  customerConnectMeetingHandler
);

export default CustomerRouter;

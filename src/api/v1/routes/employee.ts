import express from "express";
import {
  addCommentHandler,
  assignTaskToEmployeeHandler,
  createEmployeeHandler,
  createTaskCustomerHandler,
  employeeConnectMeetingHandler,
  forgotPasswordHandler,
  getStatusHandler,
  loginEmployeeHandler,
  logoutEmployeeHandler,
  requestMeetingHandler,
  verifyEmployeeHandler,
  verifyForgotOtpHandler,
} from "../controllers/employee";
import authRequired from "../middleware/auth";

import validate from "../middleware/validateRequest";
import Employee from "../models/employee";
import {
  addCommentSchema,
  assignTaskToEmployeeSchema,
  createTaskSchema,
  requestMeetingSchema,
} from "../schema/admin";
import {
  createEmployeeSchema,
  verifyPersonSchema,
  webLoginSchema,
} from "../schema/common";

const EmployeeRouter = express.Router();

EmployeeRouter.post(
  "/signup",
  validate(createEmployeeSchema),
  createEmployeeHandler
);

EmployeeRouter.get("/status", authRequired(Employee), getStatusHandler);

EmployeeRouter.post(
  "/signup/verify",
  validate(verifyPersonSchema),
  verifyEmployeeHandler
);

EmployeeRouter.post("/forgot/number", forgotPasswordHandler);
EmployeeRouter.post("/forgot/verify/number", verifyForgotOtpHandler);
EmployeeRouter.post(
  "/login/web",
  validate(webLoginSchema),
  loginEmployeeHandler
);

EmployeeRouter.post(
  "/add/meeting",
  [validate(requestMeetingSchema), authRequired(Employee)],
  requestMeetingHandler
);

EmployeeRouter.post(
  "/create/task",
  [validate(createTaskSchema), authRequired(Employee)],
  createTaskCustomerHandler
);

EmployeeRouter.put(
  "/assign/task",
  [validate(assignTaskToEmployeeSchema), authRequired(Employee)],
  assignTaskToEmployeeHandler
);

EmployeeRouter.post(
  "/add/comment",
  [validate(addCommentSchema), authRequired(Employee)],
  addCommentHandler
);

EmployeeRouter.post("/logout", logoutEmployeeHandler);

EmployeeRouter.post(
  "/join/meeting",
  [authRequired(Employee)],
  employeeConnectMeetingHandler
);

export default EmployeeRouter;

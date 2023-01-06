"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var admin_1 = require("../controllers/admin");
var employee_1 = require("../controllers/employee");
var auth_1 = __importDefault(require("../middleware/auth"));
var validateRequest_1 = __importDefault(require("../middleware/validateRequest"));
var employee_2 = __importDefault(require("../models/employee"));
var admin_2 = require("../schema/admin");
var common_1 = require("../schema/common");
var EmployeeRouter = express_1.default.Router();
EmployeeRouter.post("/signup", validateRequest_1.default(common_1.createEmployeeSchema), employee_1.createEmployeeHandler);
EmployeeRouter.get("/status", auth_1.default(employee_2.default), employee_1.getStatusHandler);
EmployeeRouter.post("/signup/verify", validateRequest_1.default(common_1.verifyPersonSchema), employee_1.verifyEmployeeHandler);
EmployeeRouter.put("/update/project", [validateRequest_1.default(admin_2.updateProjectSchema), auth_1.default(employee_2.default)], employee_1.updateProjectHandler);
EmployeeRouter.post("/add/leave", auth_1.default(employee_2.default), employee_1.addHolidayRequestHandler);
EmployeeRouter.post("/forgot/number", employee_1.forgotPasswordHandler);
EmployeeRouter.post("/forgot/verify/number", employee_1.verifyForgotOtpHandler);
EmployeeRouter.post("/login/web", validateRequest_1.default(common_1.webLoginSchema), employee_1.loginEmployeeHandler);
EmployeeRouter.post("/add/meeting", [validateRequest_1.default(admin_2.requestMeetingSchema), auth_1.default(employee_2.default)], employee_1.requestMeetingHandler);
EmployeeRouter.post("/create/project", [validateRequest_1.default(admin_2.createProjectSchema), auth_1.default(employee_2.default)], employee_1.createProjectForCustomerHandler);
EmployeeRouter.post("/add/other/meeting", [auth_1.default(employee_2.default)], employee_1.addMeetingHandler);
EmployeeRouter.post("/create/task", [validateRequest_1.default(admin_2.createTaskSchema), auth_1.default(employee_2.default)], employee_1.createTaskCustomerHandler);
EmployeeRouter.put("/complete/project", [auth_1.default(employee_2.default)], employee_1.completeProjectHandler);
EmployeeRouter.put("/decline/project", [auth_1.default(employee_2.default)], employee_1.declinedProjectHandler);
EmployeeRouter.put("/update/project/status", [auth_1.default(employee_2.default)], admin_1.updateStatusHandler);
EmployeeRouter.put("/complete/task", [auth_1.default(employee_2.default)], employee_1.completeTaskHandler);
EmployeeRouter.put("/decline/task", [auth_1.default(employee_2.default)], employee_1.declinedTaskHandler);
EmployeeRouter.put("/update/task/status", [auth_1.default(employee_2.default)], employee_1.updateTaskStatusHandler);
EmployeeRouter.put("/assign/task", [validateRequest_1.default(admin_2.assignTaskToEmployeeSchema), auth_1.default(employee_2.default)], employee_1.assignTaskToEmployeeHandler);
EmployeeRouter.post("/add/comment", [validateRequest_1.default(admin_2.addCommentSchema), auth_1.default(employee_2.default)], employee_1.addCommentHandler);
EmployeeRouter.post("/logout", employee_1.logoutEmployeeHandler);
EmployeeRouter.post("/join/meeting", [auth_1.default(employee_2.default)], employee_1.employeeConnectMeetingHandler);
exports.default = EmployeeRouter;

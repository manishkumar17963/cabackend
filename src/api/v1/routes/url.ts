import express from "express";
import { sendPresignedUrlHandler } from "../controllers/sendPresignedUrl";
import FolderType from "../enums/folderType";
import authRequired from "../middleware/auth";
import Admin from "../models/admin";
import Customer from "../models/customer";
import Employee from "../models/employee";

const UrlRouter = express.Router();

UrlRouter.put(
  "/customer/presigned/url",
  authRequired(Customer),
  sendPresignedUrlHandler(FolderType.Customer)
);

UrlRouter.put(
  "/admin/presigned/url",
  authRequired(Admin),
  sendPresignedUrlHandler(FolderType.Admin)
);

UrlRouter.put(
  "/customer/message/presigned/url",
  authRequired(Customer),
  sendPresignedUrlHandler(FolderType.Customer, false, true)
);

UrlRouter.put(
  "/employee/message/presigned/url",
  authRequired(Employee),
  sendPresignedUrlHandler(FolderType.Employee, false, true)
);

UrlRouter.put(
  "/admin/message/presigned/url",
  authRequired(Admin),
  sendPresignedUrlHandler(FolderType.Admin, false, true)
);

UrlRouter.put(
  "/admin/profile/presigned/url",

  sendPresignedUrlHandler(FolderType.Admin, true)
);

UrlRouter.put(
  "/customer/profile/presigned/url",

  sendPresignedUrlHandler(FolderType.Customer, true)
);
UrlRouter.put(
  "/employee/profile/presigned/url",

  sendPresignedUrlHandler(FolderType.Employee, true)
);
UrlRouter.put(
  "/employee/presigned/url",
  authRequired(Employee),
  sendPresignedUrlHandler(FolderType.Employee)
);

export default UrlRouter;

require("dotenv").config();
import express from "express";
import connect from "./config/databaseConfig";
import morgan from "morgan";
import fs from "fs";
import { Request, Response } from "express";
import registerSocketServer from "./socket/server";

import * as http from "http";
import AdminRouter from "./api/v1/routes/admin";
import CustomerRouter from "./api/v1/routes/customer";
import EmployeeRouter from "./api/v1/routes/employee";

import UrlRouter from "./api/v1/routes/url";

const port = parseInt(process.env.PORT as string);
const host = process.env.HOST_NAME as string;
const start = async () => {
  try {
    await connect();
    let app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Credentials", "true");
      res.header("Access-Control-Allow-Origin", req.headers.origin);
      res.header(
        "Access-Control-Allow-Methods",
        "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
      );
      res.header(
        "Access-Control-Allow-Headers",
        "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept,Authorization"
      );
      next();
    });
    // app.use(cors());

    app.use(morgan("dev"));
    app.use(UrlRouter);
    app.use("/admin", AdminRouter);
    app.use("/customer", CustomerRouter);
    app.use("/employee", EmployeeRouter);
    app.get(
      "/.well-known/pki-validation/3CB225326F3A551502766193BFAA35BA.txt",
      (req: Request, res: Response) => {
        res.sendFile(
          "/home/ec2-user/development/cabackend/3CB225326F3A551502766193BFAA35BA.txt"
        );
      }
    );

    const server = http.createServer(app);
    registerSocketServer(server);
    server.listen(port, "0.0.0.0");
  } catch (err) {
    console.log(err);
  }
};
start();

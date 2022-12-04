import mongoose, { ClientSession } from "mongoose";
import { Response, Request } from "express";
import { CustomerDocument } from "../models/customer";
import { genchecksum, verifychecksum } from "../helpers/checksum";
import appCheckSum from "../helpers/appPayments";
import https from "https";
import checkError from "../helpers/checkErrors";
import { findAndUpdateInvoice, findInvoice } from "../services/invoice.service";
import PaymentStatus from "../enums/paymentStatus";
import CustomError from "../helpers/customError";
import { findProject } from "../services/project.Service";
import TaskStatus from "../enums/taskStatus";
import PaymentMethod from "../enums/paymentMethod";

async function paymentHandler(
  req: Request,
  res: Response,

  amount: number,

  platform: string = "web"
) {
  const orderId = new mongoose.Types.ObjectId();
  var params: { [key: string]: string } = {};

  let callbackUrl: string;
  callbackUrl = `${process.env.CALLBACK_URL!}/invoice/payment/${
    req.params.invoiceId
  }/${req.user!._id}`;

  params["MID"] = process.env.MERCHANT_ID!;
  params["WEBSITE"] = process.env.MERCHANT_WEBSITE!;
  params["CHANNEL_ID"] = "WEB";
  params["INDUSTRY_TYPE_ID"] = "Retail";
  params["ORDER_ID"] = orderId.toString();
  params["CUST_ID"] = `${req.user!._id}`;
  params["TXN_AMOUNT"] = `${amount}`;
  params["CALLBACK_URL"] = callbackUrl;
  params["EMAIL"] = "devankan161pathak@gmail.com";
  params["MOBILE_NO"] = (req.user! as CustomerDocument).number;

  genchecksum(params, process.env.MERCHANT_KEY, (err: any, checksum: any) => {
    if (platform == "web") {
      if (err) {
        console.log("Error: " + err);
      }

      let paytmParams = {
        ...params,
        CHECKSUMHASH: checksum,
      };
      console.log("webdata", paytmParams);
      res.json(paytmParams);
    } else {
      appCheckSum(req, res, err, params, checksum);
    }
  });
}

async function callbackHandler(
  req: Request,
  res: Response,
  handlerFunction: (
    req: Request,
    session: ClientSession,
    amount: number,
    transactionId?: string
  ) => void
) {
  let session: ClientSession;
  try {
    let responseData = req.body;
    console.log(responseData);
    session = await mongoose.startSession();
    session.startTransaction();

    console.log("paymentRecieop", responseData);
    var checksumhash = responseData.CHECKSUMHASH;
    var result = verifychecksum(
      responseData,
      process.env.MERCHANT_KEY,
      checksumhash
    );
    if (result) {
      var paytmParams: { [key: string]: string } = {};
      paytmParams["MID"] = req.body.MID;
      paytmParams["ORDERID"] = req.body.ORDERID;

      /*
       * Generate checksum by parameters we have
       * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
       */
      genchecksum(
        paytmParams,
        process.env.MERCHANT_KEY,
        (err: any, checksum: any) => {
          paytmParams["CHECKSUMHASH"] = checksum;

          var post_data = JSON.stringify(paytmParams);

          var options = {
            /* for Production */
            // hostname: "securegw.paytm.in",

            /* for development */
            hostname: "securegw-stage.paytm.in",

            port: 443,
            path: "/order/status",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Content-Length": post_data.length,
            },
          };

          var response = "";
          var post_req = https.request(options, function (post_res) {
            post_res.on("data", function (chunk) {
              response += chunk;
            });

            post_res.on("end", async function () {
              let result = JSON.parse(response);
              console.log("result", result);
              if (result.STATUS === "TXN_SUCCESS") {
                //store in db
                const order = await handlerFunction(
                  req,
                  session,

                  result.TXNAMOUNT,
                  result.TXNID
                );
                await session.commitTransaction();

                res.redirect(`${process.env.WEB_URL}/communication`);
              } else {
                res.redirect(`${process.env.WEB_URL}/communication`);
              }
            });
          });

          post_req.write(post_data);
          post_req.end();
        }
      );
    } else {
      session.commitTransaction();
      res.redirect(`${process.env.WEB_URL}/failure`);
      console.log("Checksum Mismatched");
    }
  } catch (err) {
    //@ts-ignore
    await session.abortTransaction();
    checkError(err, res);
  }
}

export async function invoicePaymentHandler(req: Request, res: Response) {
  try {
    const user = req.user! as CustomerDocument;
    const invoice = await findInvoice(
      {
        _id: req.params.invoiceId,
        paymentStatus: PaymentStatus.Unpaid,
        customerId: user._id,
      },
      { amount: 1, services: 1, cgst: 1, sgst: 1 }
    );
    if (!invoice) {
      throw new CustomError(
        "Bad request",
        404,
        "Invoice already paid or no such invoice found"
      );
    }
    const amount = invoice.services.reduce(
      (total, value) => total + value.price,
      0
    );
    if (req.body.tds > amount) {
      throw new CustomError(
        "Bad request",
        404,
        "tds amount can not be greater than amount"
      );
    }
    await paymentHandler(
      req,
      res,

      Math.ceil(
        amount - (req.body.tds ?? 0) + (invoice.cgst ?? 0) + (invoice.sgst ?? 0)
      )
    );
  } catch (err) {
    checkError(err, res);
  }
}

export async function invoicePaymentCallbackHandler(
  req: Request,
  res: Response
) {
  await callbackHandler(req, res, invoicePaymentSuccessHandler);
}

export async function invoicePaymentSuccessHandler(
  req: Request,
  session: ClientSession,
  amount: number,
  transactionId?: string
) {
  const invoice = await findInvoice(
    {
      _id: req.params.invoiceId,
      paymentStatus: PaymentStatus.Unpaid,
      customerId: req.params.customerId,
    },
    {},
    { session }
  );

  if (!invoice) {
    throw new CustomError(
      "Bad request",
      404,
      "Invoice already paid or no such invoice found"
    );
  }
  invoice.actualPaymentDate = new Date();
  invoice.paymentStatus = PaymentStatus.Paid;
  invoice.tds =
    invoice.amount + (invoice.cgst ?? 0) + (invoice.sgst ?? 0) - amount;
  await invoice.save();
  const project = await findProject({
    _id: invoice.projectId,
    status: TaskStatus.Completed,
    paymentStatus: { $ne: PaymentStatus.Paid },
    paymentInitiated: true,
  });
  if (!project) {
    throw new CustomError(
      "Bad Request",
      404,
      "No such project found or payment not initiated"
    );
  }

  project.paymentStatus = PaymentStatus.Paid;
  project.paymentMethod = PaymentMethod.Online;
  project.transactionId = transactionId;
  project.actualPaymentDate = new Date();
  await project.save();
}

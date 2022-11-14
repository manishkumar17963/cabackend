import { AnySchema } from "joi";
import { Request, Response, NextFunction } from "express";
import checkError from "../helpers/checkErrors";

const validate =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
        headers: req.headers,
      });

      return next();
    } catch (err: any) {
      console.log(err);
      checkError(err, res);
    }
  };

export default validate;

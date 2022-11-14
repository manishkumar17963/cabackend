import { Request, Response } from "express";
import s3 from "../../../config/aws";
import { v4 as uuidv4 } from "uuid";

import checkError from "../helpers/checkErrors";
import FolderType from "../enums/folderType";
import { String } from "aws-sdk/clients/apigateway";

type PresignedUrl = { url: string; key: string };

const getSignedUrlPromise = (
  operation: string,
  params: { [key: string]: string }
): Promise<string> =>
  new Promise((resolve, reject) => {
    s3.getSignedUrl(operation, params, (err, url) => {
      err ? reject(err) : resolve(url);
    });
  });

export const sendPresignedUrlHandler =
  (folder: FolderType, profile = false, message = false) =>
  async (req: Request, res: Response) => {
    console.log("presignedurl");
    const presignedUrlList: PresignedUrl[] = [];
    try {
      let key: String;
      const num = req.body.num ?? 1;
      if (profile) {
        key = `${folder}/profile/${req.body?.name ?? uuidv4()}.jpeg`;

        const url = await getSignedUrlPromise("putObject", {
          Bucket: "femperiol",
          ContentType: "image/jpeg",
          Key: key,
          ACL: "public-read",
        });
        res.send({ url, key });
      } else if (message) {
        key = `${folder}/message/${
          (req.body?.fileName as string) ?? uuidv4()
        }.${req.body.fileType.split("/")?.slice(-1) ?? "jpeg"}`;

        const url = await getSignedUrlPromise("putObject", {
          Bucket: "femperiol",
          ContentType: req.body.fileType,
          Key: key,
          ACL: "public-read",
        });

        res.send({ url, key });
      } else {
        for (let i = 0; i < num; i++) {
          key = `${folder}/${req.user!._id}/${
            req.body?.name?.[i] ?? uuidv4()
          }.jpeg`;

          const url = await getSignedUrlPromise("putObject", {
            Bucket: "femperiol",
            ContentType: "image/jpeg",
            Key: key,
            ACL: "public-read",
          });
          presignedUrlList.push({ url, key });
        }
        console.log("presignedurl", presignedUrlList);
        res.send(presignedUrlList).status(201);
      }
    } catch (err) {
      checkError(err, res);
    }
  };

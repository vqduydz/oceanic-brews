import { Request, Response } from "express";

const sendImg = (res: Response, filePath: string) =>
  new Promise<void>((resolve, reject) => {
    res.sendFile(filePath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

const generateImgPath = (req: Request) => {
  return req.protocol + "://" + req.get("host") + "/api/images/";
};

export default { sendImg, generateImgPath };

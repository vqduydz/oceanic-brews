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
  return req.protocol + "://" + req.get("host") + "/api/image/";
};

const generateAvatar = (req: Request) => {
  return req.protocol + "://" + req.get("host") + "/api/avatar/";
};

export default { sendImg, generateImgPath, generateAvatar };

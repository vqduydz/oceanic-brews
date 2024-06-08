import { Request } from "express";

const generateImgPath = (req: Request) => {
  return req.protocol + "://" + req.get("host") + "/api/image/";
};

export default generateImgPath;

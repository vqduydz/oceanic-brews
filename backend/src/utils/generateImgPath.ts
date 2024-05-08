import { Request } from "express";

const generateImgPath = (req: Request) => {
  return req.protocol + "://" + req.get("host") + "/api/images/";
};

export default generateImgPath;

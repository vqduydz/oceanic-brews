import dotenv from "dotenv";
import { Request, Response } from "express";
import * as fs from "fs";
import path from "path";
import { promisify } from "util";
import { imgHelper, responseData } from "../utils";

dotenv.config();

const getImage = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name } = req.params;
    const imagePath = path.join(__dirname, "../../uploads");
    const filePath = path.join(imagePath, name);
    if (!(await promisify(fs.exists)(filePath))) {
      return res.status(404).send(null);
    }
    await imgHelper.sendImg(res, filePath);
    return res;
  } catch (error: any) {
    return res
      .status(500)
      .send(responseData(500, false, "Bad Request", error, null));
  }
};

export default {
  getImage,
};

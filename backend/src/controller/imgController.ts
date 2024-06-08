import dotenv from "dotenv";
import { Request, Response } from "express";
import * as fs from "fs";
import path from "path";
import sharp from "sharp";
import { promisify } from "util";
import { imgHelper, responseData } from "../utils";

dotenv.config();

const getImage = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { imgUrl } = req.params;
    const imagePath = path.join(__dirname, "../../uploads/images");
    const filePath = path.join(imagePath, imgUrl);
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

const getAvatar = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { avatarUrl } = req.params;
    const imagePath = path.join(__dirname, "../../uploads/avatar");
    const filePath = path.join(imagePath, avatarUrl);
    if (!(await promisify(fs.exists)(filePath))) {
      const filePath = path.join(imagePath, "avatar-default.png");
      await imgHelper.sendImg(res, filePath);
      return res;
    }
    await imgHelper.sendImg(res, filePath);
    return res;
  } catch (error: any) {
    return res
      .status(500)
      .send(responseData(500, false, "Bad Request", error, null));
  }
};

const uploadImage = (req: any, res: any) => {
  const data = res.locals.payload || null;
  const action = res.locals.action || "unknown";
  const fieldName = action.includes("category")
    ? "category"
    : action.includes("menu")
    ? "menu"
    : "data";

  const inputFile = req.file.buffer;
  const outputFile = "uploads/images/" + data.imgUrl;
  sharp(inputFile)
    .resize(800, 600)
    .webp()
    .toFile(outputFile, (err, info) => {
      if (err)
        return res
          .status(200)
          .send(
            responseData(
              200,
              true,
              `${action} successfully but image processing error`,
              err,
              { [fieldName]: data, imgPath: imgHelper.generateImgPath(req) }
            )
          );
      return res
        .status(200)
        .send(
          responseData(
            200,
            true,
            `${action} & uploaded imaged successfully`,
            null,
            { [fieldName]: data, imgPath: imgHelper.generateImgPath(req) }
          )
        );
    });
};

const renameImg = async (oldName: string, newName: string) => {
  const oldPath = path.join(__dirname, "../../uploads/images", oldName);
  const newPath = path.join(__dirname, "../../uploads/images", newName);
  return new Promise((resolve, reject) => {
    fs.rename(oldPath, newPath, (err) => {
      if (err) reject(false);
      else resolve(true);
    });
  });
};

const deleteImg = async (imgUrl: string) => {
  const imgPath = path.join(__dirname, "../../uploads/images", imgUrl);
  return new Promise((resolve, reject) => {
    fs.unlink(imgPath, (err) => {
      if (err) reject(false);
      else resolve(true);
    });
  });
};

export default {
  getImage,
  getAvatar,
  uploadImage,
  renameImg,
  deleteImg,
};

import { Request, Response } from "express";
import { Category } from "../db/models";
import { imgHelper, responseData } from "../utils";

const getCategories = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const categories = await Category.findAll();
    return res.status(200).send(
      responseData(200, true, "OK", null, {
        categories,
        imgPath: imgHelper.generateImgPath(req),
      })
    );
  } catch (error) {
    if (error != null && error instanceof Error) {
      return res
        .status(500)
        .send(responseData(500, false, error.message, error, null));
    }
    return res
      .status(500)
      .send(responseData(500, false, "Internal server error", error, null));
  }
};

export default {
  getCategories,
};

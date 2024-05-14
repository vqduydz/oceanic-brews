import { Request, Response } from "express";

import { User } from "../db/models";
import { generateImgPath, responseData } from "../utils";

const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await User.findAll({ raw: true });
    return res.status(200).send(
      responseData(200, true, "OK", null, {
        users,
        imgPath: generateImgPath(req),
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

const getUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const currentPage = (req.body?.currentPage as unknown as number) || 1;
    const perPage = (req.body?.perPage as unknown as number) || 1;

    const users = await User.findAll({
      offset: (currentPage - 1) * perPage,
      limit: perPage,
    });

    const totalCount = await User.count();
    const totalPages = Math.ceil(totalCount / perPage);

    return res.status(200).send(
      responseData(200, true, "OK", null, {
        users,
        pagination: { currentPage, perPage, totalCount, totalPages },
        imgPath: generateImgPath(req),
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

const getUserById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = req.params?.id as unknown as number;

    const user = await User.findByPk(id);
    if (!user) {
      return res
        .status(200)
        .send(responseData(404, false, "Data not found", null, null));
    }
    return res.status(200).send(
      responseData(200, true, "OK", null, {
        user,
        imgPath: generateImgPath(req),
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

export default { getAllUsers, getUsers, getUserById };

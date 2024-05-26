import { Request, Response } from "express";
import { User, UserAttributes } from "../db/models";
import { imgHelper, passwordHandling, responseData } from "../utils";
import { literal, Op } from "sequelize";
import * as xlsx from "xlsx";
import * as fs from "fs";

const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await User.findAll({
      raw: true,
      attributes: { exclude: ["password"] },
      order: [
        [
          literal(`CASE
          WHEN role = 'root' THEN 1
          WHEN role = 'admin' THEN 2
          WHEN role = 'manager' THEN 3
          WHEN role = 'deliver' THEN 4
          ELSE 5
        END`),
          "ASC",
        ],
        ["id", "ASC"],
      ],
    });
    return res.status(200).send(
      responseData(200, true, "OK", null, {
        users,
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

const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { password, confirmPassword, ...data } = req.body;

    const hasUser = await User.findOne({ where: { email: data.email } });
    if (hasUser) {
      return res
        .status(409)
        .send(
          responseData(
            409,
            false,
            "The email has already been used",
            null,
            null
          )
        );
    }
    const passwordHashed = await passwordHandling.hashing(password);
    const user = await User.create({
      ...data,
      password: passwordHashed,
      favorites: JSON.stringify([]),
    });

    return res.status(200).send(
      responseData(200, true, "Successfully created", null, {
        user,
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

const UpdateUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const updateDate = req.body;
    const user = await User.findOne({
      where: { email: updateDate.email },
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      return res
        .status(404)
        .send(responseData(404, false, "Data not found", null, null));
    }
    await user.set(updateDate);
    await user.save();
    return res.status(200).send(
      responseData(200, true, "Update successful", null, {
        user,
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

const deleteUserById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res
        .status(404)
        .send(responseData(404, false, "Data not found", null, null));
    }
    await user.destroy();
    return res
      .status(200)
      .send(responseData(200, true, "Delete successful", null, null));
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

const importUsers = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "Invalid file" });
    }
    const workbook = xlsx.read(file.buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);
    const existingEmails = await User.findAll({ attributes: ["email"] });
    const existingEmailSet = new Set(existingEmails.map((user) => user.email));
    const newData = data.filter(
      (row: any) => !existingEmailSet.has(row.email)
    ) as UserAttributes[];
    User.bulkCreate(newData)
      .then(() =>
        res
          .status(200)
          .send(responseData(200, true, "Import successful", null, null))
      )
      .catch((error) =>
        res
          .status(500)
          .send(responseData(200, true, "Import failed", null, null))
      );
  } catch (error) {
    console.error("Error importing data:", error);
    res.status(500).json({ error: "Failed to import data." });
  }
};

export default {
  getAllUsers,
  getUsers,
  getUserById,
  createUser,
  UpdateUser,
  deleteUserById,
  importUsers,
};

import { NextFunction, Request, Response } from "express";
import { Op } from "sequelize";
import { imgHelper, responseData } from "../utils";
import imgController from "./imgController";
import * as xlsx from "xlsx";
import { Menu } from "../db/models";
import { MenuAttributes } from "../interface";

const getMenus = async (req: Request, res: Response): Promise<Response> => {
  try {
    const menus = await Menu.findAll();
    return res.status(200).send(
      responseData(200, true, "OK", null, {
        menus,
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

const getMenuBySlug = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { slug } = req.params;
    const menu = await Menu.findOne({ where: { slug }, raw: true });
    if (!menu) {
      return res
        .status(404)
        .send(responseData(404, false, "Data not found", null, null));
    }
    return res.status(200).send(
      responseData(200, true, "OK", null, {
        menu,
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

const createMenu = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const hasMenu = await Menu.findOne({ where: { slug: data.slug } });
    if (hasMenu) {
      return res
        .status(409)
        .send(responseData(409, false, "Menu is exits", null, null));
    }
    const menu = await Menu.create(data);
    if (req.file) {
      res.locals.action = "Menu category";
      res.locals.payload = menu;
      next();
    } else
      return res.status(200).send(
        responseData(
          200,
          true,
          "Create menu successfully, but no imgae",
          null,
          {
            menu,
            imgPath: imgHelper.generateImgPath(req),
          }
        )
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

const updateMenuById = async (req: any, res: any, next: NextFunction) => {
  try {
    const dataUpdate = req.body;
    const { id, ...data } = dataUpdate;
    const menu = await Menu.findByPk(id);
    if (!menu) {
      return res
        .status(404)
        .send(responseData(404, false, "Data not found", null, null));
    }
    const oldImgUrl = menu.imgUrl;
    menu.update(data);
    menu.imgUrl = `${menu.slug}-${Number(new Date(menu.updatedAt))}.png`;
    await menu.save();
    try {
      await imgController.renameImg(oldImgUrl, menu.imgUrl);
    } catch (error) {
      res.locals.renameImgErr = error;
    }
    if (req.file) {
      res.locals.action = "Update menu";
      res.locals.payload = menu;
      next();
    } else {
      return res.locals.renameImgErr
        ? res.status(200).send(
            responseData(
              200,
              true,
              "Update menu successfully but failed to rename image ",
              res.locals.renameImgErr,
              {
                menu,
                imgPath: imgHelper.generateImgPath(req),
              }
            )
          )
        : res.status(200).send(
            responseData(200, true, "Update menu successfully", null, {
              menu,
              imgPath: imgHelper.generateImgPath(req),
            })
          );
    }
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

const getMenusByIds = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const ids = req.query.ids as any;
    const menus =
      ids && ids.length > 1
        ? await Menu.findAll({
            raw: true,
            where: {
              id: {
                [Op.in]: ids,
              },
            },
          })
        : ids && ids.length <= 1
        ? await Menu.findAll({
            raw: true,
            where: {
              id: ids,
            },
          })
        : [];
    return res.status(200).send(
      responseData(200, true, "OK", null, {
        menus,
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

const deleteMenuById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const menu = await Menu.findByPk(id);
    if (!menu) {
      return res
        .status(404)
        .send(responseData(404, false, "Data not found", null, null));
    }
    const imgUrl = menu.imgUrl;
    await menu.destroy();
    if (!imgUrl)
      return res
        .status(200)
        .send(
          responseData(
            200,
            true,
            "Menu deleted but no image to delete",
            null,
            null
          )
        );
    try {
      await imgController.deleteImg(imgUrl);
      return res
        .status(200)
        .send(
          responseData(
            200,
            true,
            "Menu and associated image deleted successfully",
            null,
            null
          )
        );
    } catch (error: any) {
      return res
        .status(200)
        .send(
          responseData(
            200,
            true,
            "Menu deleted, but no associated image found to delete",
            { error },
            null
          )
        );
    }
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

const importMenus = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "Invalid file" });
    }
    const workbook = xlsx.read(file.buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);
    const existingSlugs = await Menu.findAll({ attributes: ["slug"] });
    const existingSlugSet = new Set(existingSlugs.map((menu) => menu.slug));
    const newData = data.filter(
      (row: any) => !existingSlugSet.has(row.slug)
    ) as MenuAttributes[];
    Menu.bulkCreate(newData)
      .then(() =>
        res
          .status(200)
          .send(responseData(200, true, "Import successful", null, null))
      )
      .catch((error) =>
        res
          .status(500)
          .send(responseData(200, true, "Import failed", error, null))
      );
  } catch (error) {
    console.error("Error importing data:", error);
    res.status(500).json({ error: "Failed to import data." });
  }
};

export default {
  getMenus,
  getMenuBySlug,
  createMenu,
  updateMenuById,
  deleteMenuById,
  getMenusByIds,
  importMenus,
};

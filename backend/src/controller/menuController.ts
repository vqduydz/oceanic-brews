import { Request, Response } from "express";

import { Menu } from "../db/models";
import { imgHelper, responseData } from "../utils";
import { Op } from "sequelize";

const getMenu = async (req: Request, res: Response): Promise<Response> => {
  try {
    const menus = await Menu.findAll({ raw: true });
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

const createMenu = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data = req.body;
    const hasMenu = await Menu.findOne({ where: { slug: data.slug } });
    if (hasMenu) {
      return res
        .status(409)
        .send(responseData(409, false, "Menu is exits", null, null));
    }
    const menu = await Menu.create(data);
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

const updateMenuById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const dataUpdate = req.body;
    const { id, ...data } = dataUpdate;
    const menu = await Menu.findByPk(id);
    if (!menu) {
      return res
        .status(404)
        .send(responseData(404, false, "Data not found", null, null));
    }
    menu.update(data);
    await menu.save();
    return res.status(200).send(
      responseData(200, true, "Updated", null, {
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
    await menu.destroy();
    return res.status(200).send(responseData(200, true, "Deleted", null, null));
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

export default {
  getMenu,
  getMenuBySlug,
  createMenu,
  updateMenuById,
  deleteMenuById,
  getMenusByIds,
};

import { Request, Response } from "express";

import {
  Category,
  CategoryAttributes,
  Menu,
  MenuAttributes,
} from "../db/models";
import { imgHelper, responseData } from "../utils";

const getCategory = async (req: Request, res: Response): Promise<Response> => {
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

const getCategoryById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = req.params?.id as unknown as number;

    const category = await Category.findByPk(id);
    if (!category) {
      return res
        .status(200)
        .send(responseData(404, false, "Data not found", null, null));
    }
    return res.status(200).send(
      responseData(200, true, "OK", null, {
        category,
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

const getCategoryWithMenu = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const currentPage = (req.body?.currentPage as unknown as number) || 1;
    const perPage = (req.body?.perPage as unknown as number) || 1;

    const categories = await Category.findAll({
      offset: (currentPage - 1) * perPage,
      limit: perPage,
      include: { model: Menu, as: "menus" },
    });

    const totalCount = await Category.count();
    const totalPages = Math.ceil(totalCount / perPage);

    return res.status(200).send(
      responseData(200, true, "OK", null, {
        categories,
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

const getAllCategoryWithMenu = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    interface CategoryWithMenus extends CategoryAttributes {
      menus?: MenuAttributes[];
    }

    const categories: CategoryWithMenus[] = await Category.findAll({
      include: { model: Menu, as: "menus" },
    });

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

const getAllCategoryWithMenuById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;

    const category = await Category.findOne({
      where: { id },
      include: { model: Menu, as: "menus" },
    });
    if (!category) {
      return res
        .status(404)
        .send(responseData(404, false, "Data not found", null, null));
    }
    return res.status(200).send(
      responseData(200, true, "OK", null, {
        category,
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

const createCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const data = req.body;
    const hasCategory = await Category.findOne({ where: { slug: data.slug } });
    if (hasCategory) {
      return res
        .status(200)
        .send(responseData(409, false, "Category is exits", null, null));
    }
    const category = await Category.create(data);
    return res.status(200).send(
      responseData(200, true, "OK", null, {
        category,
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

const updateCategoryById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const dataUpdate = req.body;
    const { id, ...data } = dataUpdate;
    const category = await Category.findByPk(id);
    if (!category) {
      return res
        .status(200)
        .send(responseData(404, false, "Data not found", null, null));
    }
    category.update(data);
    await category.save();
    return res.status(200).send(
      responseData(200, true, "Updated", null, {
        category,
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

const deleteCategoryById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      return res
        .status(200)
        .send(responseData(404, false, "Data not found", null, null));
    }
    await category.destroy();
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

export default {
  getCategory,
  getCategoryWithMenu,
  getAllCategoryWithMenu,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategoryById,
  getAllCategoryWithMenuById,
};

import { NextFunction, Request, Response } from "express";
import * as xlsx from "xlsx";
import { Category, Menu } from "../db/models";
import { imgHelper, responseData } from "../utils";
import imgController from "./imgController";
import { CategoryAttributes, MenuAttributes } from "../interface";

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

// const getCategoriesWithMenus = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     const currentPage = (req.body?.currentPage as unknown as number) || 1;
//     const perPage = (req.body?.perPage as unknown as number) || 1;

//     const categories = await Category.findAll({
//       offset: (currentPage - 1) * perPage,
//       limit: perPage,
//       include: { model: Menu, as: "menus" },
//     });

//     const totalCount = await Category.count();
//     const totalPages = Math.ceil(totalCount / perPage);

//     return res.status(200).send(
//       responseData(200, true, "OK", null, {
//         categories,
//         pagination: { currentPage, perPage, totalCount, totalPages },
//         imgPath: imgHelper.generateImgPath(req),
//       })
//     );
//   } catch (error) {
//     if (error != null && error instanceof Error) {
//       return res
//         .status(500)
//         .send(responseData(500, false, error.message, error, null));
//     }
//     return res
//       .status(500)
//       .send(responseData(500, false, "Internal server error", error, null));
//   }
// };

const getCategoriesWithMenus = async (
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

const getCategoryWithMenusById = async (
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
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const hasCategory = await Category.findOne({ where: { slug: data.slug } });
    if (hasCategory) {
      return res
        .status(409)
        .send(responseData(409, false, "Category is exits", null, null));
    }
    const category = await Category.create(data);
    // category.imgUrl = `${category.slug}-${Number(
    //   new Date(category.updatedAt)
    // )}.png`;
    // await category.save();
    if (req.file) {
      res.locals.action = "Create category";
      res.locals.payload = category;
      next();
    } else
      return res.status(200).send(
        responseData(
          200,
          true,
          "Create category successfully, but no imgae",
          null,
          {
            category,
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

const updateCategoryById = async (req: any, res: any, next: NextFunction) => {
  try {
    const dataUpdate = req.body;
    const { id, ...data } = dataUpdate;
    const category = await Category.findByPk(id);
    if (!category) {
      return res
        .status(404)
        .send(responseData(404, false, "Data not found", null, null));
    }
    const oldImgUrl = category.imgUrl;
    category.update(data);
    category.imgUrl = `${category.slug}-${Number(
      new Date(category.updatedAt)
    )}.png`;
    await category.save();
    try {
      await imgController.renameImg(oldImgUrl, category.imgUrl);
    } catch (error) {
      res.locals.renameImgErr = error;
    }
    if (req.file) {
      res.locals.action = "Update category";
      res.locals.payload = category;
      next();
    } else {
      return res.locals.renameImgErr
        ? res.status(200).send(
            responseData(
              200,
              true,
              "Update category successfully but failed to rename image ",
              res.locals.renameImgErr,
              {
                category,
                imgPath: imgHelper.generateImgPath(req),
              }
            )
          )
        : res.status(200).send(
            responseData(200, true, "Update category successfully", null, {
              category,
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

const deleteCategoryById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      return res
        .status(404)
        .send(responseData(404, false, "Data not found", null, null));
    }
    const imgUrl = category.imgUrl;
    await category.destroy();
    if (!imgUrl)
      return res
        .status(200)
        .send(
          responseData(
            200,
            true,
            "Category deleted but no image to delete",
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
            "Category and associated image deleted successfully",
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
            "Category deleted, but no associated image found to delete",
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

const importCategories = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "Invalid file" });
    }
    const workbook = xlsx.read(file.buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);
    const existingSlugs = await Category.findAll({ attributes: ["slug"] });
    const existingSlugSet = new Set(
      existingSlugs.map((category) => category.slug)
    );
    const newData = data.filter(
      (row: any) => !existingSlugSet.has(row.slug)
    ) as CategoryAttributes[];
    Category.bulkCreate(newData)
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
  getCategories,
  getCategoriesWithMenus,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategoryById,
  getCategoryWithMenusById,
  importCategories,
};

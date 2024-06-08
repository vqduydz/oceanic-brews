import { Request, Response } from "express";
import { CartItem, Menu } from "../db/models";
import { responseData } from "../utils";
import generateImgPath from "../utils/generateImgPath";

const getCartItemWithMenusById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userId } = req.params;
    const cartItems = await CartItem.findAll({
      where: { userId },
      include: {
        model: Menu,
        as: "menu",
        attributes: ["id", "name", "slug", "categoryId", "price", "imgUrl"],
        order: [["id", "ASC"]],
      },
    });

    return res.status(200).send(
      responseData(200, true, "OK", null, {
        cartItems,
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

const createCartItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userId, menuId, quantity } = req.body;
    const hasCartItem = await CartItem.findOne({
      where: { userId, menuId },
    });
    if (hasCartItem) {
      return res
        .status(409)
        .send(responseData(409, false, "Cart item is exits", null, null));
    }
    const cartItem = await CartItem.create({ userId, menuId, quantity });
    return res.status(200).send(responseData(200, true, "OK", null, cartItem));
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

const updateCartItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const cartItem = await CartItem.findByPk(id, {
      include: {
        model: Menu,
        as: "menu",
        attributes: ["id", "name", "slug", "categoryId", "price", "imgUrl"],
        order: [["id", "ASC"]],
      },
    });
    if (!cartItem) {
      return res
        .status(409)
        .send(responseData(409, false, "Data not found", null, null));
    }
    cartItem.update(req.body);
    await cartItem.save();
    return res.status(200).send(responseData(200, true, "OK", null, cartItem));
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

const deleteCartItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const cartItem = await CartItem.findByPk(id);
    if (!cartItem) {
      return res
        .status(409)
        .send(responseData(409, false, "Data not found", null, null));
    }
    await cartItem.destroy();
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

export default {
  createCartItem,
  getCartItemWithMenusById,
  updateCartItem,
  deleteCartItem,
};

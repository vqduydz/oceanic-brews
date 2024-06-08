import express from "express";
import multer from "multer";
import {
  authController,
  categoryController,
  imgController,
  menuController,
  userController,
  cartItemController,
} from "../controller";
import {
  authenticated,
  checkRole,
  registerValidation,
  resetPasswordValidation,
} from "../middleware";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

//auth
router.post("/register", registerValidation, authController.register);
router.post("/login", authController.userLogin);
router.get("/refresh-token", authController.refreshToken);
router.get("/logout", authenticated, authController.userLogout);
router.post("/fogot-password", authController.forgotPassword);
router.get("/current-user", authenticated, authController.getCurrentUser);
router.patch("/self-update-user", authenticated, authController.selfUpdateUser);
router.patch(
  "/reset-password",
  authenticated,
  resetPasswordValidation,
  authController.resetPassword
);

//user
router.get(
  "/users",
  authenticated,
  checkRole(["root", "admin"]),
  userController.getUsers
);
router.post(
  "/user",
  authenticated,
  checkRole(["root", "admin"]),
  userController.createUser
);
router.patch(
  "/update-user",
  authenticated,
  checkRole(["root", "admin"]),
  userController.UpdateUser
);
router.delete(
  "/user/:id",
  authenticated,
  checkRole(["root", "admin"]),
  userController.deleteUserById
);
router.post(
  "/users/import",
  authenticated,
  checkRole(["root", "admin"]),
  upload.single("file"),
  userController.importUsers
);

//category
router.get("/categories", categoryController.getCategories);
router.get("/category/:id", categoryController.getCategoryById);
router.get("/category/menu/:id", categoryController.getCategoryWithMenusById);
router.get("/categoriesWithMenus", categoryController.getCategoriesWithMenus);
router.post(
  "/category",
  authenticated,
  checkRole(["root", "admin"]),
  upload.single("image"),
  categoryController.createCategory,
  imgController.uploadImage
);
router.patch(
  "/category/:id",
  authenticated,
  checkRole(["root", "admin"]),
  upload.single("image"),
  categoryController.updateCategoryById,
  imgController.uploadImage
);
router.delete(
  "/category/:id",
  authenticated,
  checkRole(["root", "admin"]),
  categoryController.deleteCategoryById
);
router.post(
  "/categories/import",
  authenticated,
  checkRole(["root", "admin"]),
  upload.single("file"),
  categoryController.importCategories
);

//menu
router.get("/menus", menuController.getMenus);
router.get("/menuIds", menuController.getMenusByIds);
router.get("/menu/:slug", menuController.getMenuBySlug);
router.post(
  "/menu",
  authenticated,
  checkRole(["root", "admin"]),
  upload.single("image"),
  menuController.createMenu,
  imgController.uploadImage
);
router.patch(
  "/menu/:id",
  authenticated,
  checkRole(["root", "admin"]),
  upload.single("image"),
  menuController.updateMenuById,
  imgController.uploadImage
);
router.delete(
  "/menu/:id",
  authenticated,
  checkRole(["root", "admin"]),
  upload.single("image"),
  menuController.deleteMenuById
);
router.post(
  "/menus/import",
  authenticated,
  checkRole(["root", "admin"]),
  upload.single("file"),
  menuController.importMenus
);

// CartItem
router.get(
  "/cart-item/:userId",
  authenticated,
  checkRole(["root", "admin"]),
  cartItemController.getCartItemWithMenusById
);
router.post(
  "/cart-item",
  authenticated,
  checkRole(["root", "admin"]),
  cartItemController.createCartItem
);
router.patch(
  "/cart-item/:id",
  authenticated,
  checkRole(["root", "admin"]),
  cartItemController.updateCartItem
);

router.delete(
  "/cart-item/:id",
  authenticated,
  checkRole(["root", "admin"]),
  cartItemController.deleteCartItem
);

//image
router.get("/image/:imgUrl", imgController.getImage);
router.get("/avatar/:avatarUrl", imgController.getAvatar);

router.post(
  "/uploads/image",
  authenticated,
  checkRole(["root", "admin"]),
  upload.single("image"),
  imgController.uploadImage
);

export default router;

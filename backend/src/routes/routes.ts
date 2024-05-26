import express from "express";
import {
  authController,
  categoryController,
  imgController,
  menuController,
  userController,
} from "../controller";
import {
  authenticated,
  checkRole,
  registerValidation,
  resetPasswordValidation,
} from "../middleware";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

//category
router.get("/categories", categoryController.getCategory);
router.get("/category/:id", categoryController.getCategoryById);
router.get("/categories/menu", categoryController.getCategoryWithMenu);
router.get("/category/menu/:id", categoryController.getAllCategoryWithMenuById);
router.get("/categories/menu/all", categoryController.getAllCategoryWithMenu);
router.post("/category", categoryController.createCategory);
router.patch("/category/:id", categoryController.updateCategoryById);
router.delete("/category/:id", categoryController.deleteCategoryById);

//menu
router.get("/menus", menuController.getMenu);
router.get("/menu/:slug", menuController.getMenuBySlug);
router.post("/menu", menuController.createMenu);
router.patch("/menu/:id", menuController.updateMenuById);
router.delete("/menu/:id", menuController.deleteMenuById);
router.get("/menuIds", menuController.getMenusByIds);

//auth
router.post("/register", registerValidation, authController.register);
router.post("/login", authController.userLogin);
router.get("/refresh-token", authController.refreshToken);
router.get("/logout", authenticated, authController.userLogout);
router.post("/fogot-password", authController.forgotPassword);
router.get("/current-user", authenticated, authController.getCurrentUser);
router.patch(
  "/reset-password",
  authenticated,
  resetPasswordValidation,
  authController.resetPassword
);
router.patch("/self-update-user", authenticated, authController.selfUpdateUser);

//user
router.get("/users", userController.getAllUsers);
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
// import user
router.post(
  "/users/import",
  authenticated,
  checkRole(["root", "admin"]),
  upload.single("file"),
  userController.importUsers
);

//image
router.get("/images/:name", imgController.getImage);
export default router;

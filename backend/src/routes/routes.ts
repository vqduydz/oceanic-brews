import express from "express";
import path from "path";
import { registerValidation } from "../middleware";
import {
  authController,
  categoryController,
  menuController,
} from "../controller";
const router = express.Router();

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

//auth
router.post("/register", registerValidation, authController.register);
// router.post("/login", UserController.UserLogin);
// router.get("/refresh-token", UserController.RefreshToken);
// router.get("/logout", Authorization.Authenticated, UserController.UserLogout);

//user
// router.get("/current-user", Authorization.Authenticated, UserController.UserDetail);

//image
router.get("/images/:filename", (req, res) => {
  // Khai báo đường dẫn tới thư mục chứa hình ảnh
  const imagePath = path.join(__dirname, "../../uploads");
  const { filename } = req.params;
  const filePath = path.join(imagePath, filename);
  res.sendFile(filePath);
});
export default router;

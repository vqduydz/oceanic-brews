import express from "express";
import categoryController from "../controller/categoryController";
import menuController from "../controller/menuController";
import path from "path";
const routes = express.Router();

//category
routes.get("/categories", categoryController.getCategory);
routes.get("/category/:id", categoryController.getCategoryById);
routes.get("/categories/menu", categoryController.getCategoryWithMenu);
routes.get("/category/menu/:id", categoryController.getAllCategoryWithMenuById);
routes.get("/categories/menu/all", categoryController.getAllCategoryWithMenu);
routes.post("/category", categoryController.createCategory);
routes.patch("/category/:id", categoryController.updateCategoryById);
routes.delete("/category/:id", categoryController.deleteCategoryById);

//menu
routes.get("/menus", menuController.getMenu);
routes.get("/menu/:slug", menuController.getMenuBySlug);
routes.post("/menu", menuController.createMenu);
routes.patch("/menu/:id", menuController.updateMenuById);
routes.delete("/menu/:id", menuController.deleteMenuById);

//image
routes.get("/images/:filename", (req, res) => {
  // Khai báo đường dẫn tới thư mục chứa hình ảnh
  const imagePath = path.join(__dirname, "../../uploads");
  const { filename } = req.params;
  const filePath = path.join(imagePath, filename);
  res.sendFile(filePath);
});
export default routes;

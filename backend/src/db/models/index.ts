import Category from "./category";
import Menu from "./menu";
import CartItem from "./cart-item";
import User from "./user";

CartItem.belongsTo(Menu, { foreignKey: "menuId", as: "menu" });
Category.hasMany(Menu, { foreignKey: "categoryId", as: "menus" });
Menu.belongsTo(Category, { foreignKey: "categoryId", as: "category" });

export { Category, Menu, CartItem, User };

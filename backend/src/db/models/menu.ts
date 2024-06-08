import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";
import { MenuAttributes } from "../../interface";
import Category from "./category";

export interface MenuInput extends Optional<MenuAttributes, "id"> {}
export interface MenuOutput extends Required<MenuAttributes> {}

class Menu extends Model<MenuAttributes, MenuInput> implements MenuAttributes {
  public id!: number;
  public name!: string;
  public imgUrl!: string;
  public slug!: string;
  public categoryId!: number;
  public price!: number;
  public desc!: string;
  public active!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Menu.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    name: { unique: true, allowNull: false, type: DataTypes.STRING },
    slug: { unique: true, allowNull: false, type: DataTypes.STRING },
    imgUrl: { type: DataTypes.STRING },
    categoryId: { allowNull: false, type: DataTypes.STRING },
    price: { allowNull: false, type: DataTypes.STRING },
    desc: { type: DataTypes.STRING },
    active: { allowNull: false, type: DataTypes.BOOLEAN },
  },
  { timestamps: true, sequelize: connection, underscored: false }
);

export default Menu;

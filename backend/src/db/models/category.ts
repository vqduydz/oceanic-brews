import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";
import Menu from "./menu";

export interface CategoryAttributes {
  id?: number;
  name?: string;
  imgUrl?: string;
  slug?: string;
  active?: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface CategoryInput extends Optional<CategoryAttributes, "id"> {}
export interface CategoryOutput extends Required<CategoryAttributes> {}

class Category
  extends Model<CategoryAttributes, CategoryInput>
  implements CategoryAttributes
{
  public id!: number;
  public name!: string;
  public imgUrl!: string;
  public slug!: string;
  public active!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Category.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    name: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING,
    },
    slug: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING,
    },
    imgUrl: {
      type: DataTypes.STRING,
    },
    active: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
  },
  { timestamps: true, sequelize: connection, underscored: false }
);

Category.hasMany(Menu, { foreignKey: "categoryId", as: "menus" });
// Menu.belongsTo(Category, { foreignKey: "categoryId", as: "category" });
export default Category;

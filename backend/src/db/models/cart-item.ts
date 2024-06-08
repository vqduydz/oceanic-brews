import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";
import { CartItemAttributes } from "../../interface";

export interface CartItemInput extends Optional<CartItemAttributes, "id"> {}
export interface CartItemOutput extends Required<CartItemAttributes> {}

class CartItem
  extends Model<CartItemAttributes, CartItemInput>
  implements CartItemAttributes
{
  public id!: number;
  public userId!: number;
  public menuId!: number;
  public quantity!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CartItem.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    userId: { type: DataTypes.INTEGER },
    menuId: { type: DataTypes.INTEGER },
    quantity: { type: DataTypes.INTEGER },
  },
  { timestamps: true, sequelize: connection, underscored: false }
);

export default CartItem;

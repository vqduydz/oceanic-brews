import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";
import { OrderAttributes } from "../../interface";

export interface OrderInput extends Optional<OrderAttributes, "id"> {}
export interface OrderOutput extends Required<OrderAttributes> {}

class Order
  extends Model<OrderAttributes, OrderInput>
  implements OrderAttributes
{
  public id!: number;
  public orderType!: number;
  public deliverId!: number;
  public handlerId!: number;
  public customerId!: number;
  public paymentMethods!: string;
  public orderCode!: string;
  public status!: string;
  public payment!: number;
  public depositAmount!: number;
  public shipFee!: number;
  public totalAmount!: number;
  public totoalPayment!: number;
  public items!: string;
  public history!: string;
  public place!: string;
  public note!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    orderCode: { allowNull: false, unique: true, type: DataTypes.STRING },
    deliverId: { type: DataTypes.INTEGER },
    handlerId: { type: DataTypes.INTEGER },
    customerId: { allowNull: false, type: DataTypes.INTEGER },
    status: { type: DataTypes.STRING },
    type: { type: DataTypes.INTEGER },
    paymentMethods: { type: DataTypes.STRING },
    payment: { type: DataTypes.INTEGER },
    depositAmount: { type: DataTypes.INTEGER },
    shipFee: { type: DataTypes.INTEGER },
    totalAmount: { type: DataTypes.INTEGER },
    totalPayment: { type: DataTypes.INTEGER },
    items: { type: DataTypes.TEXT },
    history: { type: DataTypes.TEXT },
    place: { type: DataTypes.TEXT },
    note: { type: DataTypes.TEXT },
  },
  { timestamps: true, sequelize: connection, underscored: false }
);

export default Order;

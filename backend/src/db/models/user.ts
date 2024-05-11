import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";
import Category from "./category";
import { UserAttributes } from ".";

export interface UserInput extends Optional<UserAttributes, "id"> {}
export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: number;
  public email!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;
  public phoneNumber!: number;
  public gender!: string;
  public avatar!: string;
  public places!: string;
  public active!: boolean;
  public verified!: boolean;
  public birthday!: Date;
  public accessToken!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    email: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },

    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    phoneNumber: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    gender: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    avatar: {
      type: DataTypes.STRING,
    },
    places: {
      type: DataTypes.TEXT,
    },
    active: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    verified: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    birthday: {
      type: DataTypes.DATE,
    },
    accessToken: {
      type: DataTypes.TEXT,
    },
  },
  { timestamps: true, sequelize: connection, underscored: false }
);

export default User;

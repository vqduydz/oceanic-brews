import { Sequelize } from "sequelize";

import dotenv from "dotenv";

dotenv.config();

const { DB_NAME, DB_HOST, DB_USERNAME, DB_PASSWORD } = process.env;
const dbDialect = "mssql";

const sequelizeConnection = new Sequelize(
  DB_NAME as string,
  DB_USERNAME as string,
  DB_PASSWORD,
  { logging: false, host: DB_HOST, dialect: dbDialect }
);

export default sequelizeConnection;

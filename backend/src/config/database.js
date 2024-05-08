const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mssql",
    timezone: "+07:00",
    dialectOptions: {
      options: {
        encrypt: true,
      },
    },
  },
  // test: {
  //   username: process.env.DB_USERNAME,
  //   password: process.env.DB_PASSWORD,
  //   database: process.env.DB_NAME,
  //   host: process.env.DB_HOST,
  //   dialect: "mssql",
  // },
  // production: {
  //   username: process.env.DB_USERNAME,
  //   password: process.env.DB_PASSWORD,
  //   database: process.env.DB_NAME,
  //   host: process.env.DB_HOST,
  //   dialect: "mssql",
  // },
};

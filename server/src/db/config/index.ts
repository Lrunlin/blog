import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "blog",
  process.env.DB_MYSQL_USER + "",
  process.env.DB_MYSQL_PASSWORD || "",
  {
    host: process.env.DB_MYSQL_HOST + "",
    dialect: "mysql",
    port: process.env.DB_MYSQL_PORT ? +(process.env.DB_MYSQL_PORT as string) : 3306,
    timezone: "+08:00",
    // logging: process.env.ENV == "development",
    logging: false, //不打印日志
    pool: {
      max: 5,
      min: 0,
      idle: 1000,
    },
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
    },
    define: {},
  }
);
export default sequelize;

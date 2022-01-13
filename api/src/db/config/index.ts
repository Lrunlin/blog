import { Sequelize } from "sequelize";
import os from "os";
const PASSWORD = os.type() == "Linux" ? "123" : "";

const sequelize = new Sequelize("blog", "root", PASSWORD, {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
  timezone: "+08:00",
  logging: false, //不打印日志
  // logging: process.env.ENV == "dev" ? undefined : false,
  pool: {
    max: 5,
    min: 0,
    idle: 1000,
  },
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
  },
});
export default sequelize;

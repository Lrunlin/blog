import { DataTypes } from "sequelize";
import sequelize from "../config";
import type { AdminInstance } from "../types";
import md5 from "md5";

/**
 * @管理员表
 * @set操作时直接传递password即可，使用where时进行MD5(admin+password)
 */
export default sequelize.define<AdminInstance>(
  "admin",
  {
    admin: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true,
      comment: "管理员账号",
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "管理员密码",
      set(value: string) {
        const admin = this.getDataValue("admin");
        this.setDataValue("password", md5(admin + value));
      },
    },
  },
  {
    tableName: "admin",
    timestamps: false,
  }
);

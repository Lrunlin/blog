import { DataTypes } from "sequelize";
import sequelize from "../config";
import md5 from "md5";
import { UserInstance } from "../types";

export default sequelize.define<UserInstance>(
  "user",
  {
    email: {
      type: DataTypes.STRING(60),
      allowNull: false,
      comment: "用户邮箱",
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING(40),
      allowNull: false,
      comment: "用户密码",
      set(value: string) {
        this.setDataValue("password", md5(value));
      },
    },
    GitHub: {
      type: DataTypes.STRING(60),
      allowNull: true,
      comment: "GitHub地址",
    },
  },
  {
    tableName: "user",
    timestamps: false,
  }
);

// sequelize-auto -o "./models" -d blog_alpha -h localhost -u root -p 3306 -x 123 -e mysql -l ts

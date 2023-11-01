import sha256 from "@/common/utils/sha256";
import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface UserAttributes {
  id: number;
  name: string;
  auth: number;
  email: string;
  github?: string;
  qq?: string;
  password: string;
  state: number;
  description?: string;
  site?: string;
  unit?: string;
  location?: string;
  avatar_file_name: string;
  create_time: Date;
}

export type UserPk = "id";
export type UserId = User[UserPk];
export type UserOptionalAttributes =
  | "github"
  | "qq"
  | "state"
  | "description"
  | "site"
  | "unit"
  | "location"
  | "create_time";
export type UserCreationAttributes = Optional<UserAttributes, UserOptionalAttributes>;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  id!: number;
  name!: string;
  auth!: number;
  email!: string;
  github?: string;
  qq?: string;
  password!: string;
  state!: number;
  description?: string;
  site?: string;
  unit?: string;
  location?: string;
  avatar_file_name!: string;
  create_time!: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof User {
    return sequelize.define(
      "User",
      {
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
          comment: "用户ID",
        },
        name: {
          type: DataTypes.STRING(40),
          allowNull: false,
          comment: "昵称",
        },
        auth: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "身份",
        },
        email: {
          type: DataTypes.STRING(60),
          allowNull: false,
          comment: "用户邮箱",
          unique: "email",
        },
        github: {
          type: DataTypes.STRING(40),
          allowNull: true,
          comment: "GitHub ID",
          unique: "github",
        },
        qq: {
          type: DataTypes.STRING(40),
          allowNull: true,
          comment: "QQ号",
          unique: "qq",
        },
        password: {
          type: DataTypes.STRING(64),
          allowNull: false,
          comment: "密码",
          set(this, val: string) {
            this.setDataValue("password", sha256(val));
          },
        },
        state: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 1,
          comment: "状态，（权限）",
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
          comment: "自我介绍",
          set(this, val) {
            if (typeof val == "string" && /^[\s\S]*.*[^\s][\s\S]*$/.test(val as string)) {
              this.setDataValue("description", val);
            } else {
              this.setDataValue("description", null as any);
            }
          },
        },
        site: {
          type: DataTypes.STRING(200),
          allowNull: true,
          comment: "个人网站",
          set(this, val) {
            if (typeof val == "string" && /^[\s\S]*.*[^\s][\s\S]*$/.test(val as string)) {
              this.setDataValue("site", val);
            } else {
              this.setDataValue("site", null as any);
            }
          },
        },
        unit: {
          type: DataTypes.STRING(100),
          allowNull: true,
          comment: "所属单位",
          set(this, val) {
            if (typeof val == "string" && /^[\s\S]*.*[^\s][\s\S]*$/.test(val as string)) {
              this.setDataValue("unit", val);
            } else {
              this.setDataValue("unit", null as any);
            }
          },
        },
        location: {
          type: DataTypes.STRING(100),
          allowNull: true,
          comment: "所在地区",
          set(this, val) {
            if (typeof val == "string" && /^[\s\S]*.*[^\s][\s\S]*$/.test(val as string)) {
              this.setDataValue("location", val);
            } else {
              this.setDataValue("location", null as any);
            }
          },
        },
        avatar_file_name: {
          type: DataTypes.STRING(60),
          allowNull: false,
          comment: "头像图片名称",
        },
        avatar_url: {
          type: DataTypes.VIRTUAL,
          get(this) {
            let avatar_url = this.getDataValue("avatar_file_name");
            return `${process.env.CDN}/avatar/${avatar_url}`;
          },
        },
        create_time: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
          comment: "创建时间",
        },
      },
      {
        tableName: "user",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "email",
            unique: true,
            using: "BTREE",
            fields: [{ name: "email" }],
          },
          {
            name: "github",
            unique: true,
            using: "BTREE",
            fields: [{ name: "github" }],
          },
          {
            name: "qq",
            unique: true,
            using: "BTREE",
            fields: [{ name: "qq" }],
          },
        ],
      }
    ) as typeof User;
  }
}

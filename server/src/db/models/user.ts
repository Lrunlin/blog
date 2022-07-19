import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface UserAttributes {
  id: number;
  name: string;
  auth: number;
  email?: string;
  github?: string;
  qq?: string;
  password: string;
  state?: number;
  description?: string;
  site?: string;
  unit?: string;
  location?: string;
  avatar_url?: string;
  time: Date;
}

export type UserPk = "id";
export type UserId = User[UserPk];
export type UserOptionalAttributes =
  | "email"
  | "github"
  | "qq"
  | "state"
  | "description"
  | "site"
  | "unit"
  | "location"
  | "avatar_url";
export type UserCreationAttributes = Optional<UserAttributes, UserOptionalAttributes>;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  id!: number;
  name!: string;
  auth!: number;
  email?: string;
  github?: string;
  qq?: string;
  password!: string;
  state?: number;
  description?: string;
  site?: string;
  unit?: string;
  location?: string;
  avatar_url?: string;
  time!: Date;

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
          allowNull: true,
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
          type: DataTypes.STRING(30),
          allowNull: false,
          comment: "密码",
        },
        state: {
          type: DataTypes.INTEGER,
          allowNull: true,
          comment: "状态，（权限）",
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
          comment: "自我介绍",
        },
        site: {
          type: DataTypes.STRING(200),
          allowNull: true,
          comment: "个人网站",
        },
        unit: {
          type: DataTypes.STRING(100),
          allowNull: true,
          comment: "所属单位",
        },
        location: {
          type: DataTypes.STRING(30),
          allowNull: true,
          comment: "所在地区",
        },
        avatar_url: {
          type: DataTypes.STRING(60),
          allowNull: true,
          comment: "头像图片名称",
        },
        time: {
          type: DataTypes.DATE,
          allowNull: false,
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

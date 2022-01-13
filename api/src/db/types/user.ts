import { DataTypes, Model, Optional } from "sequelize";

interface UserAttributes {
  email: string;
  password: string;
  GitHub?: string;
}
interface UserCreationAttributes extends Optional<UserAttributes, "email"> {}
interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {}
export type { UserInstance };
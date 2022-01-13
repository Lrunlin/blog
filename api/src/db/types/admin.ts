import { Model, Optional } from "sequelize";

interface adminAttributes {
  admin: string;
  password: string;
}

interface AdminCreationAttributes extends Optional<adminAttributes, "admin"> {}
interface AdminInstance extends Model<adminAttributes, AdminCreationAttributes>, adminAttributes {}
export type { AdminInstance };

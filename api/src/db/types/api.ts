import { Model, Optional } from "sequelize";

interface apiAttributes {
  id: string;
  name: string;
  content: string;
  time: Date;
}

interface apiCreationAttributes extends Optional<apiAttributes, "id"> {}
interface ApiInstance extends Model<apiAttributes, apiCreationAttributes>, apiAttributes {}
export type { ApiInstance };

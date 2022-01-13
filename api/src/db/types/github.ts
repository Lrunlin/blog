import { Model, Optional } from "sequelize";

interface githubAttributes {
  id: string;
  name: string;
  description: string;
  image: string;
  languages: string;
  url: string;
  time: Date;
}

interface githubCreationAttributes extends Optional<githubAttributes, "id"> {}
interface GitHubInstance
  extends Model<githubAttributes, githubCreationAttributes>,
    githubAttributes {}
export type { GitHubInstance };

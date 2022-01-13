import { Model, Optional } from "sequelize";

interface commentAttributes {
  id: string;
  commentator: string;
  articleId?: string;
  superior?: string;
  content: string;
  time?: Date;
}

interface CommentCreationAttributes extends Optional<commentAttributes, "id"> {}

interface CommentInstance
  extends Model<commentAttributes, CommentCreationAttributes>,
    commentAttributes {}
export type { CommentInstance };

import type { CommentAttributes, UserAttributes } from "@type/model-attribute";
export type user_data = Pick<
  UserAttributes,
  "id" | "name" | "auth" | "avatar_file_name" | "avatar_url"
>;
export type reply = {
  content: string;
  user_data: user_data;
};
/** 文章评论中的单个评论类型*/
export interface articleCommentType extends Omit<CommentAttributes, "reply"> {
  reply: null | reply;
  user_data: user_data;
  children: articleCommentType[];
}

import type { ArticleAttributes, TagAttributes, UserAttributes } from "@type/model-attribute";

/** 文章列表，单个文章主要的字段类型*/
type articleListItemType = Pick<
  ArticleAttributes,
  | "id"
  | "title"
  | "description"
  | "view_count"
  | "cover_url"
  | "update_time"
  | "create_time"
  | "comment_count"
  | "like_count"
  | "state"
> & {
  tag: Pick<TagAttributes, "name">[];
  author_data: Pick<UserAttributes, "name">;
};
export type { articleListItemType };

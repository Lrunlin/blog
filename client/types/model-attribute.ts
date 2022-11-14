export interface TagAttributes {
  id: number;
  name: string;
  belong: number;
  icon_file_name?: string;
  create_time: Date;
  indexes: number;
}
export interface TypeAttributes {
  id: number;
  name: string;
  indexes: number;
  icon_file_name?: string;
  create_time: Date;
  description: string;
}
export interface ArticleAttributes {
  id: number;
  title: string;
  description: string;
  tag: TagAttributes[];
  author: number;
  author_data: UserAttributes;
  content: string;
  cover_file_name?: string;
  cover_url?: string;
  reprint?: string;
  state: number;
  language: string[] | null;
  view_count?: number;
  update_time?: string;
  create_time: string;
  comment_count: number;
  /** 是否展示目录*/
  display_directory: boolean;
  collection_count: number;
}
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
  avatar_file_name?: string;
  avatar_url?: string;
  article_count: number;
  collection_count: number;
  /** 被多少人关注*/
  follower_count: number;
  /** 关注了多少人*/
  followee_count: number;
  create_time: string;
}
export interface FollowAttributes {
  id: number;
  blogger_id: number;
  user_id: number;
  create_time: Date;
}

type commentUserData = Pick<
  UserAttributes,
  "id" | "name" | "auth" | "avatar_file_name" | "avatar_url"
>;
export interface CommentAttributes {
  id: number;
  article_id: number;
  user_id: number;
  user_data: commentUserData;
  content: string;
  reply: null | {
    content: string;
    user_data: Pick<UserAttributes, "id" | "name" | "auth" | "avatar_file_name" | "avatar_url">;
  };
  comment_pics: string;
  create_time: Date;
  children?: CommentAttributes[];
}

export interface LinksAttributes {
  id: number;
  name: string;
  url: string;
  user_id: number|null;
  is_allow: number;
  logo_file_name: string;
  logo_url: string;
  create_time: Date;
}

export interface NoticeAttributes {
  id: number;
  user_id: number;
  relation_id: number;
  type: string;
  is_read: number;
  create_time: Date;
}

import {
  UserAttributes,
  CommentAttributes,
  AnswerAttributes,
  ProblemAttributes,
  TagAttributes,
} from "@type/model-attribute";

/** 问答功能中单个评论的类型*/
export interface problemCommentType extends Omit<CommentAttributes, "reply"> {
  user_data: Pick<UserAttributes, "id" | "name">;
  reply: Pick<UserAttributes, "id" | "name">;
}

/** 问答功能中单个答案的类型*/
export interface problemAnswerType extends AnswerAttributes {
  author_data: Pick<UserAttributes, "id" | "name" | "avatar_file_name" | "avatar_url" | "auth">;
  comment_list: problemCommentType[];
  like_data: {
    like_count: number;
    like_state: number;
  };
}
/** 问答功能中的数据请求结果*/
export interface problemType extends Omit<ProblemAttributes, "tag"> {
  author_data: Pick<UserAttributes, "id" | "name" | "avatar_file_name" | "avatar_url" | "auth">;
  answer_list: problemAnswerType[];
  language: string[] | null;
  comment_list: problemCommentType[];
  tag: Pick<TagAttributes, "name">[];
  like_data: {
    like_count: number;
    like_state: number;
  };
  collection_count: number;
  collection_state: number[] | null;
  follow_data: {
    follow_count: number;
    follow_state: number;
  };
}

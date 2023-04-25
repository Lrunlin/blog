import type { Sequelize } from "sequelize";
import { Advertisement as _Advertisement } from "./advertisement";
import type { AdvertisementAttributes, AdvertisementCreationAttributes } from "./advertisement";
import { Answer as _Answer } from "./answer";
import type { AnswerAttributes, AnswerCreationAttributes } from "./answer";
import { Article as _Article } from "./article";
import type { ArticleAttributes, ArticleCreationAttributes } from "./article";
import { Collection as _Collection } from "./collection";
import type { CollectionAttributes, CollectionCreationAttributes } from "./collection";
import { Comment as _Comment } from "./comment";
import type { CommentAttributes, CommentCreationAttributes } from "./comment";
import { Follow as _Follow } from "./follow";
import type { FollowAttributes, FollowCreationAttributes } from "./follow";
import { Likes as _Likes } from "./likes";
import type { LikesAttributes, LikesCreationAttributes } from "./likes";
import { Link as _Link } from "./link";
import type { LinkAttributes, LinkCreationAttributes } from "./link";
import { Notice as _Notice } from "./notice";
import type { NoticeAttributes, NoticeCreationAttributes } from "./notice";
import { Problem as _Problem } from "./problem";
import type { ProblemAttributes, ProblemCreationAttributes } from "./problem";
import { Recommend as _Recommend } from "./recommend";
import type { RecommendAttributes, RecommendCreationAttributes } from "./recommend";
import { Tag as _Tag } from "./tag";
import type { TagAttributes, TagCreationAttributes } from "./tag";
import { Type as _Type } from "./type";
import type { TypeAttributes, TypeCreationAttributes } from "./type";
import { User as _User } from "./user";
import type { UserAttributes, UserCreationAttributes } from "./user";

export {
  _Advertisement as Advertisement,
  _Answer as Answer,
  _Article as Article,
  _Collection as Collection,
  _Comment as Comment,
  _Follow as Follow,
  _Likes as Likes,
  _Link as Link,
  _Notice as Notice,
  _Problem as Problem,
  _Recommend as Recommend,
  _Tag as Tag,
  _Type as Type,
  _User as User,
};

export type {
  AdvertisementAttributes,
  AdvertisementCreationAttributes,
  AnswerAttributes,
  AnswerCreationAttributes,
  ArticleAttributes,
  ArticleCreationAttributes,
  CollectionAttributes,
  CollectionCreationAttributes,
  CommentAttributes,
  CommentCreationAttributes,
  FollowAttributes,
  FollowCreationAttributes,
  LikesAttributes,
  LikesCreationAttributes,
  LinkAttributes,
  LinkCreationAttributes,
  NoticeAttributes,
  NoticeCreationAttributes,
  ProblemAttributes,
  ProblemCreationAttributes,
  RecommendAttributes,
  RecommendCreationAttributes,
  TagAttributes,
  TagCreationAttributes,
  TypeAttributes,
  TypeCreationAttributes,
  UserAttributes,
  UserCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Advertisement = _Advertisement.initModel(sequelize);
  const Answer = _Answer.initModel(sequelize);
  const Article = _Article.initModel(sequelize);
  const Collection = _Collection.initModel(sequelize);
  const Comment = _Comment.initModel(sequelize);
  const Follow = _Follow.initModel(sequelize);
  const Likes = _Likes.initModel(sequelize);
  const Link = _Link.initModel(sequelize);
  const Notice = _Notice.initModel(sequelize);
  const Problem = _Problem.initModel(sequelize);
  const Recommend = _Recommend.initModel(sequelize);
  const Tag = _Tag.initModel(sequelize);
  const Type = _Type.initModel(sequelize);
  const User = _User.initModel(sequelize);

  return {
    Advertisement: Advertisement,
    Answer: Answer,
    Article: Article,
    Collection: Collection,
    Comment: Comment,
    Follow: Follow,
    Likes: Likes,
    Link: Link,
    Notice: Notice,
    Problem: Problem,
    Recommend: Recommend,
    Tag: Tag,
    Type: Type,
    User: User,
  };
}

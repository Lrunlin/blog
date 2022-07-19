import type { Sequelize } from "sequelize";
import { Article as _Article } from "./article";
import type { ArticleAttributes, ArticleCreationAttributes } from "./article";
import { Collection as _Collection } from "./collection";
import type { CollectionAttributes, CollectionCreationAttributes } from "./collection";
import { Comment as _Comment } from "./comment";
import type { CommentAttributes, CommentCreationAttributes } from "./comment";
import { Drafts as _Drafts } from "./drafts";
import type { DraftsAttributes, DraftsCreationAttributes } from "./drafts";
import { Follow as _Follow } from "./follow";
import type { FollowAttributes, FollowCreationAttributes } from "./follow";
import { Notice as _Notice } from "./notice";
import type { NoticeAttributes, NoticeCreationAttributes } from "./notice";
import { Tag as _Tag } from "./tag";
import type { TagAttributes, TagCreationAttributes } from "./tag";
import { TipsSet as _TipsSet } from "./tips_set";
import type { TipsSetAttributes, TipsSetCreationAttributes } from "./tips_set";
import { Type as _Type } from "./type";
import type { TypeAttributes, TypeCreationAttributes } from "./type";
import { User as _User } from "./user";
import type { UserAttributes, UserCreationAttributes } from "./user";

export {
  _Article as Article,
  _Collection as Collection,
  _Comment as Comment,
  _Drafts as Drafts,
  _Follow as Follow,
  _Notice as Notice,
  _Tag as Tag,
  _TipsSet as TipsSet,
  _Type as Type,
  _User as User,
};

export type {
  ArticleAttributes,
  ArticleCreationAttributes,
  CollectionAttributes,
  CollectionCreationAttributes,
  CommentAttributes,
  CommentCreationAttributes,
  DraftsAttributes,
  DraftsCreationAttributes,
  FollowAttributes,
  FollowCreationAttributes,
  NoticeAttributes,
  NoticeCreationAttributes,
  TagAttributes,
  TagCreationAttributes,
  TipsSetAttributes,
  TipsSetCreationAttributes,
  TypeAttributes,
  TypeCreationAttributes,
  UserAttributes,
  UserCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Article = _Article.initModel(sequelize);
  const Collection = _Collection.initModel(sequelize);
  const Comment = _Comment.initModel(sequelize);
  const Drafts = _Drafts.initModel(sequelize);
  const Follow = _Follow.initModel(sequelize);
  const Notice = _Notice.initModel(sequelize);
  const Tag = _Tag.initModel(sequelize);
  const TipsSet = _TipsSet.initModel(sequelize);
  const Type = _Type.initModel(sequelize);
  const User = _User.initModel(sequelize);

  return {
    Article: Article,
    Collection: Collection,
    Comment: Comment,
    Drafts: Drafts,
    Follow: Follow,
    Notice: Notice,
    Tag: Tag,
    TipsSet: TipsSet,
    Type: Type,
    User: User,
  };
}

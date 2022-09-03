import type { Sequelize } from "sequelize";
import { Advertisement as _Advertisement } from "./advertisement";
import type { AdvertisementAttributes, AdvertisementCreationAttributes } from "./advertisement";
import { Article as _Article } from "./article";
import type { ArticleAttributes, ArticleCreationAttributes } from "./article";
import { Collection as _Collection } from "./collection";
import type { CollectionAttributes, CollectionCreationAttributes } from "./collection";
import { Comment as _Comment } from "./comment";
import type { CommentAttributes, CommentCreationAttributes } from "./comment";
import { Follow as _Follow } from "./follow";
import type { FollowAttributes, FollowCreationAttributes } from "./follow";
import { Links as _Links } from "./links";
import type { LinksAttributes, LinksCreationAttributes } from "./links";
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
  _Advertisement as Advertisement,
  _Article as Article,
  _Collection as Collection,
  _Comment as Comment,
  _Follow as Follow,
  _Links as Links,
  _Notice as Notice,
  _Tag as Tag,
  _TipsSet as TipsSet,
  _Type as Type,
  _User as User,
};

export type {
  AdvertisementAttributes,
  AdvertisementCreationAttributes,
  ArticleAttributes,
  ArticleCreationAttributes,
  CollectionAttributes,
  CollectionCreationAttributes,
  CommentAttributes,
  CommentCreationAttributes,
  FollowAttributes,
  FollowCreationAttributes,
  LinksAttributes,
  LinksCreationAttributes,
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
  const Advertisement = _Advertisement.initModel(sequelize);
  const Article = _Article.initModel(sequelize);
  const Collection = _Collection.initModel(sequelize);
  const Comment = _Comment.initModel(sequelize);
  const Follow = _Follow.initModel(sequelize);
  const Links = _Links.initModel(sequelize);
  const Notice = _Notice.initModel(sequelize);
  const Tag = _Tag.initModel(sequelize);
  const TipsSet = _TipsSet.initModel(sequelize);
  const Type = _Type.initModel(sequelize);
  const User = _User.initModel(sequelize);


  return {
    Advertisement: Advertisement,
    Article: Article,
    Collection: Collection,
    Comment: Comment,
    Follow: Follow,
    Links: Links,
    Notice: Notice,
    Tag: Tag,
    TipsSet: TipsSet,
    Type: Type,
    User: User,
  };
}

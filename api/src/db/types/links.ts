import { Model, Optional } from "sequelize";

interface linksAttributes {
  id: string;
  /** 网站名称*/
  name: string;
  /** 网站介绍*/
  description: string;
  /** 网站地址*/
  url: string;
  /** 创建时间*/
  time?: Date;
  /** 是否引流*/
  drainage: Boolean;
  /** logo地址*/
  logo: string;
}

interface linksCreationAttributes extends Optional<linksAttributes, "id"> {}
interface LinksInstance
  extends Model<linksAttributes, linksCreationAttributes>,
    linksAttributes {}
export type { LinksInstance };

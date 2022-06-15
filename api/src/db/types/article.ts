import { Model, Optional } from "sequelize";
interface articleAttributes {
  /** 文章标题 */
  title: string;
  /** 文章类型 */
  type: string;
  /** 正文HTML */
  article: string;
  /** 文章阅读量 */
  view_count: number;
  /** 文章创建时间 */
  time: Date;
  /** 文章ID */
  id: number;
  /** 文章发布人 */
  author: string;
  /** 文章介绍 */
  introduce: string;
  /** 文章展示图 */
  image: string | false;
  /**文章中使用代码高亮的语言**/
  languages: string[] | null;
}

interface ArticleCreationAttributes extends Optional<articleAttributes, "id"> {}
interface ArticleInstance
  extends Model<articleAttributes, ArticleCreationAttributes>,
    articleAttributes {}
export type { ArticleInstance };

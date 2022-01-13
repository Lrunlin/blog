interface readArticle {
  /** 文章路由 */
  router: string;
  /** 文章标题 */
  title: string;
  /** 文章类型 */
  type: string[];
  /** 正文HTML */
  article: string;
  /** 文章阅读量 */
  view_count: number;
  /** 文章创建时间 */
  time: Date;
  /** 文章ID */
  id: string | number;
  /** 文章发布人 */
  author: string;
  /** 文章介绍 */
  introduce: string;
  /** 文章展示图 */
  image: string | false;
}

interface articleType {
  type: string;
  isShow: boolean;
  time: string;
}

interface controller {
  path: string;
}

export type { readArticle, articleType };

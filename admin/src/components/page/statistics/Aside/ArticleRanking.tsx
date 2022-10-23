import type { FC } from "react";
import { propsType } from "./index";
import { Link } from "react-router-dom";

const ArticleRanking: FC<{ data: propsType["article_ranking"] }> = ({ data }) => {
  return (
    <div className="aside-article-item">
      {data.map((item, index) => {
        return (
          <Link
            key={`echarts-article-ranking-${item.id}`}
            to={`/article/${item.id}`}
            className="article-ranking-item"
            target="_blank"
          >
            <div>
              <div className="article-ranking-item_index">{index + 1}</div>
              <div className="article-ranking-item_title truncate w-4/5">{item.title}</div>
            </div>
            <span className="article-ranking-item_count">{item.view_count}</span>
          </Link>
        );
      })}
    </div>
  );
};
export default ArticleRanking;

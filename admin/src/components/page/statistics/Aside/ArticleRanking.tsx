import type { FC } from "react";
import Container from "../common/Container";
import { propsType } from "./index";

const ArticleRanking: FC<{ data: propsType["article_ranking"] }> = ({ data }) => {
  return (
    <Container className="aside-article-item">
      <div>
        {data.map((item, index) => {
          return (
            <a
              key={`echarts-article-ranking-${item.id}`}
              href={`/article/${item.id}`}
              className="flex justify-around text-white article-ranking-item w-full"
              target="_blank"
            >
              <div className="flex w-full">
                <div className="article-ranking-item_index">{index + 1}</div>
                <div className="article-ranking-item_title truncate w-4/5">{item.title}</div>
              </div>
              <div className="article-ranking-item_count">{item.view_count}</div>
            </a>
          );
        })}
      </div>
    </Container>
  );
};
export default ArticleRanking;

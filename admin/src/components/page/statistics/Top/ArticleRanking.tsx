import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { statisticsDataContext } from "@/page/statistics";

const ArticleRanking = () => {
  let _data = useRecoilValue(statisticsDataContext);
  let data = _data.article_ranking;

  return (
    <div className="aside-article-item w-full">
      {data.map((item, index) => {
        return (
          <Link
            key={`echarts-article-ranking-${item.id}`}
            to={`/article/${item.id}`}
            className="article-ranking-item max-w-full"
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

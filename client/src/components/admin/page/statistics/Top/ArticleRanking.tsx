import Link from "next/link";
import { useRecoilValue } from "recoil";
import { statisticsDataContext } from "@/pages/admin/statistics";

const ArticleRanking = () => {
  let _data = useRecoilValue(statisticsDataContext);
  let data = _data.article_ranking;

  return (
    <div className="w-full h-21.25vw">
      {data.map((item, index) => {
        return (
          <Link
            key={`echarts-article-ranking-${item.id}`}
            href={`/admin/article/${item.id}`}
            className="max-w-full w-full h-2vw !text-white text-sm border-0 border-b border-solid border-b-statistics-cyan-border-color flex justify-around"
            target="_blank"
          >
            <div className="flex w-4/5">
              <div >{index + 1}</div>
              <div className="truncate w-4/5 ml-0.5vw">{item.title}</div>
            </div>
            <span className="font-bold mr-1.75vw">{item.view_count}</span>
          </Link>
        );
      })}
    </div>
  );
};
export default ArticleRanking;

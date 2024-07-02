import Link from "next/link";
import userAdminStatisticsData from "@/store/admin/admin-statistics-data";

const ArticleRanking = () => {
  let _data = userAdminStatisticsData((s) => s.data);
  let data = _data.article_ranking;

  return (
    <div className="h-[21.25vw] w-full">
      {data.map((item, index) => {
        return (
          <Link
            key={`echarts-article-ranking-${item.id}`}
            href={`/admin/article/${item.id}`}
            className="flex h-[2vw] w-full max-w-full items-center justify-around border-0 border-b border-solid border-b-statistics-cyan-border-color text-[0.8vw] text-sm text-white hover:!text-gray-300"
            target="_blank"
          >
            <div className="flex w-4/5">
              <div>{index + 1}</div>
              <div className="ml-[0.5vw] w-4/5 truncate">{item.title}</div>
            </div>
            <span className="mr-[1.75vw] font-bold">{item.view_count}</span>
          </Link>
        );
      })}
    </div>
  );
};
export default ArticleRanking;

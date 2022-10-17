import type { FC } from "react";
import ArticleRanking from "./ArticleRanking";
import MemoryDisk from "./MemoryDisk";
import "./index.scss";

export interface propsType {
  article_ranking: { id: number; title: string; view_count: number }[];
  memory: {
    occupied: number;
    total: number;
  };
  disk: {
    occupied: number;
    total: number;
  };
}

const Aside: FC<propsType> = ({ article_ranking, memory, disk }) => {
  return (
    <>
      <ArticleRanking data={article_ranking} />
      <MemoryDisk memory={memory} disk={disk} />
    </>
  );
};
export default Aside;

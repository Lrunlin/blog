import type { FC } from "react";
import Container from "../common/Container";
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
    <div className="h-full">
      <Container className="w-full">
        <ArticleRanking data={article_ranking} />
      </Container>
      <Container className="w-full server-mt-20">
        <MemoryDisk memory={memory} disk={disk} />
      </Container>
    </div>
  );
};
export default Aside;

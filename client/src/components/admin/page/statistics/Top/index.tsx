import Container from "../Container";
import Article from "./Article";
import ArticleRanking from "./ArticleRanking";
import Header from "./Header";
import Visits from "./Visits";

/** 大屏统计页面顶部展示部分*/
const Top = () => {
  return (
    <div className="flex justify-between">
      <div className="w-[70.25vw]">
        <Header />
        <div className="mt-[1vw] flex justify-between">
          <Container>
            <Visits />
          </Container>
          <Container>
            <Article />
          </Container>
        </div>
      </div>
      <div className="w-[23.5vw]">
        <Container className="w-full">
          <ArticleRanking />
        </Container>
      </div>
    </div>
  );
};
export default Top;

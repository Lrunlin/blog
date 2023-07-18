import Header from "./Header";
import Container from "../Container";
import Visits from "./Visits";
import Article from "./Article";
import ArticleRanking from "./ArticleRanking";

/** 大屏统计页面顶部展示部分*/
const Top = () => {
  return (
    <div className="flex justify-between">
      <div className="w-70.25vw">
        <Header />
        <div className="mt-1vw flex justify-between">
          <Container>
            <Visits />
          </Container>
          <Container>
            <Article />
          </Container>
        </div>
      </div>
      <div className="w-23.5vw">
        <Container className="w-full">
          <ArticleRanking />
        </Container>
      </div>
    </div>
  );
};
export default Top;

import Header from "./Header";
import Container from "../Container";
import "./index.scss";
import Visits from "./Visits";
import Article from "./Article";
import ArticleRanking from "./ArticleRanking";

/** 大屏统计页面顶部展示部分*/
const Top = () => {
  return (
    <div className="flex justify-between">
      <div className="main-left">
        <Header />
        <div className="main-item">
          <Container>
            <Visits />
          </Container>
          <Container>
            <Article />
          </Container>
        </div>
      </div>
      <div className="main-right">
        <Container className="w-full">
          <ArticleRanking />
        </Container>
      </div>
    </div>
  );
};
export default Top;

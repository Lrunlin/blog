import type { FC } from "react";
import Container from "../common/Container";
import "./index.scss";
import Visits from "./Visits";
import Article from "./Article";
import Loadavg from "./Loadavg";
import Referer from "./Referer";

export interface propsType {
  visits: { time:string;count:number}[];
  article: {
    admin_reprint_count: number;
    admin_not_reprint_count: number;
    user_reprint_count: number;
    user_not_reprint_count: number;
  };
  loadavg: [number, number, number];
  referer: { referer_label: string; referer_color: string; count: number }[];
}

/** 大屏页面左下方显示块*/
const Main: FC<propsType> = ({ visits, article, loadavg, referer }) => {
  return (
    <div>
      <div className="main-item">
        <Container>
          <Visits visits={visits} />
        </Container>
        <Container>
          <Article data={article} />
        </Container>
      </div>
      <div className="main-item">
        <Container>
          <Referer data={referer} />
        </Container>
        <Container>
          <Loadavg data={loadavg} />
        </Container>
      </div>
    </div>
  );
};
export default Main;

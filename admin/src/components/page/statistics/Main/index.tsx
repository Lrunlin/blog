import { useEffect } from "react";
import vw from "@/utils/vw";
import type { FC } from "react";
import * as echarts from "echarts";
import Container from "../common/Container";
import "./index.scss";
import Visits from "./Visits";
import Article from "./Article";
import Loadavg from "./Loadavg";

export interface propsType {
  visits: number[];
  article: {
    admin_reprint_count: number;
    admin_not_reprint_count: number;
    user_reprint_count: number;
    user_not_reprint_count: number;
  };
  loadavg: [number, number, number];
}

/** 大屏页面左下方显示块*/
const Main: FC<propsType> = ({ visits, article, loadavg }) => {
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
          <div className="main-l"></div>
        </Container>
        <Container>
          <Loadavg data={loadavg} />
        </Container>
      </div>
    </div>
  );
};
export default Main;

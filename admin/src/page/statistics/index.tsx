import bg from "@/assets/statistics/bg.jpg";
import useSwr from "swr";
import axios from "axios";
import Header from "@/components/page/statistics/Header";
import Main from "@/components/page/statistics/Main";
import Aside from "@/components/page/statistics/Aside";
import "./index.scss";

const Statistics = () => {
  let { data, isValidating, error } = useSwr("/statistics/visualization", () =>
    axios.get("/statistics/visualization").then(res => res.data.data)
  );

  return (
    <>
      <div
        className="min-h-screen min-w-full bg-cover"
        style={{
          backgroundImage: `url('${bg}')`,
        }}
      >
        <div className="container-title">数据分析</div>
        {error && <div>请求失败</div>}
        {isValidating && <div>请求中</div>}
        {data && (
          <main className="main flex justify-around">
            <div className="main-left">
              <Header type={data.type} user={data.user} links={data.links} />
              <Main referer={data.referer} visits={data.visits} article={data.article} loadavg={data.loadavg} />
            </div>
            <div className="main-right">
              <Aside article_ranking={data.article_ranking} memory={data.memory} disk={data.disk} />
            </div>
          </main>
        )}
      </div>
    </>
  );
};
export default Statistics;

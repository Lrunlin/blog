import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Empty, Button } from "antd";
import router from "next/router";
import style from "./index.module.scss";
interface newsType {
  path: string;
  title: string;
  html: string;
  image: string;
  passtime: string;
}

function News(props) {
  let path = props.path;
  const [data, setData] = useState<boolean | newsType>(false);
  useEffect(() => {
    axios.get(`/news/${path}`).then(res => {
      if (res.data.success) setData(res.data.data);
    });
  }, []);

  return (
    <div className={style.container}>
      {typeof data == "object" ? (
        <div>
          <h2>{data.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: data.html }}></div>
        </div>
      ) : (
        <Empty
          style={{ marginTop: "30px" }}
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{
            height: 60,
          }}
          description={<span>没有找到对应的文章，请重新搜索</span>}
        >
          <Button onClick={() => router.push("/")} type="primary">
            回到首页
          </Button>
        </Empty>
      )}
    </div>
  );
}
News.getInitialProps = async ({ asPath }: { asPath: string }) => {
  let path = asPath.replace("/news/", "");
  return { path };
};

export default News;

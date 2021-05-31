import axios from "axios";
import { useEffect } from "react";
import setHead from "../../components/Head";
import { Timeline, Comment, Avatar } from "antd";
import style from "./index.module.scss";

import {
  CloseCircleOutlined,
  WarningOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { skipPartiallyEmittedExpressions } from "typescript";

function updataLog({ data }) {
  const setIcon = (type: string) => {
    let icon;
    if (type.indexOf("alpha") != -1) {
      icon = <CloseCircleOutlined className={style.alpha} />;
    } else if (type.indexOf("beta") != -1) {
      icon = <WarningOutlined className={style.beta} />;
    } else {
      icon = <CheckCircleOutlined className={style.success} />;
    }
    return icon;
  };

  return (
    <>
      {setHead({
        title: "刘润霖||更新记录",
        keywords: "web前端,博客,刘润霖,更新记录,GitHub",
        description:
          "刘润霖WEB个人博客,本站展示本站源代码的日常更新，并用时间线方式展示,内容为日常技术文章,成果物毕业设计分享,本章源代码更新。",
      })}
      <main className={style.main}>
        <Timeline mode="left">
          {data.map((item: any, index: number) => {
            const arr = item.commit.message.split("\n");
            const title = arr[0];
            // 标题和更新主体展示内容
            const content = arr
              .splice(2)
              .map(item => <p key={Math.random()}>{item}</p>);
            return (
              <Timeline.Item
                dot={setIcon(title)}
                label={item.commit.author.date.substring(0, 10)}
                key={item.sha}
              >
                <Comment
                  author={
                    <>
                      <h2 className={style.edition}>{title}</h2>
                      <span className={style.name}>
                        {item.commit.committer.name}
                      </span>
                    </>
                  }
                  avatar={<Avatar src={item.committer.avatar_url} />}
                  content={<>{content}</>}
                />
              </Timeline.Item>
            );
          })}
        </Timeline>
      </main>
    </>
  );
}
export default updataLog;
updataLog.getInitialProps = async () => {
  let data;
  await axios
    .get("https://api.github.com/repos/LRunlin/blog/commits")
    .then(res => {
      data = res.data;
    });
  return { data };
};

import css from "styled-jsx/css";
import NoSSR from "@/utils/NoSSR";
import type { FunctionComponent } from "react";
import { MessageFilled, EyeOutlined, ClockCircleOutlined } from "@ant-design/icons";

interface props {
  view_count: number;
  comment_count: number;
  time: string;
}
const Style = css`
  .article-footer {
    color: #939393;
    .ml-5 {
      margin-left: 5px;
    }
  }
  .ml-10 {
    margin-left: 10px;
  }
  .ml-20 {
    margin-left: 20px;
  }
`;

/** Article组件的introduce部分*/
const ArticleIntroduce: FunctionComponent<props> = props => {
  return (
    <>
      <style jsx>{Style}</style>
      <div className="article-footer">
        <span>
          <NoSSR children={<EyeOutlined />} />
          <span className="ml-5">{props.view_count}人阅读</span>
        </span>
        <span className="ml-10">
          <NoSSR children={<MessageFilled />} />
          <span className="ml-5">{props.comment_count}条留言</span>
        </span>
        <span className="ml-20">
          <NoSSR children={<ClockCircleOutlined />} />
          <time className="ml-5">{props.time}</time>
        </span>
      </div>
    </>
  );
};
export default ArticleIntroduce;

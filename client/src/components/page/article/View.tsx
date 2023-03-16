import type { FC } from "react";
import axios from "axios";
import Script from "next/script";
import style from "@/styles/article.module.scss";

interface prposType {
  content: string;
}
/** 文章页面主题内容显示*/
const View: FC<prposType> = props => {
  return (
    <div
      id="view"
      className={style.article}
      dangerouslySetInnerHTML={{ __html: props.content }}
    ></div>
  );
};
export default View;

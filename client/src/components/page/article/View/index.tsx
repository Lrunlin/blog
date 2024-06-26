// https://nextjs.org/docs/messages/react-hydration-error#solution-3-using-suppresshydrationwarning
// 有script标签，防止水合报错
import type { FC } from "react";
import style from "@/styles/content.module.scss";

interface prposType {
  content: string;
}
/** 文章页面主题内容显示*/
const View: FC<prposType> = (props) => {
  return (
    <div
      className={`content-body ${style.content_body}`}
      suppressHydrationWarning={true}
      dangerouslySetInnerHTML={{ __html: props.content }}
    ></div>
  );
};
export default View;

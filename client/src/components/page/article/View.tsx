import type { FC } from "react";

interface prposType {
  content: string;
}
/** 文章页面主题内容显示*/
const View: FC<prposType> = props => {
  return (
    <div
      className={`content-body`}
      dangerouslySetInnerHTML={{ __html: props.content }}
    ></div>
  );
};
export default View;

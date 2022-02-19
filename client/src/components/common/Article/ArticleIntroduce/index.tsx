import css from "styled-jsx/css";
import type { FunctionComponent } from "react";
import cl from "classnames";
interface props {
  introduce: string;
  hasImage: boolean;
}
export type { props };
const Style = css`
  .introduce {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
    line-height: 24px;
    color: #333;
  }
  .introduce:hover {
    opacity: 0.7;
    transition: 0.3s;
  }
  .introduce-hasimage {
    margin-left: 20px;
    -webkit-line-clamp: 4;
    margin-top: -5px;
  }
`;

/** Article组件的introduce部分*/
const ArticleIntroduce: FunctionComponent<props> = props => {
  return (
    <>
      <style jsx>{Style}</style>
      <div className={cl(["introduce", props.hasImage && "introduce-hasimage"])}>
        {props.introduce}
      </div>
    </>
  );
};
export default ArticleIntroduce;

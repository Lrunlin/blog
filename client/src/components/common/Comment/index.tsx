import { useState, useContext, memo } from "react";
import type { FunctionComponent } from "react";
import { Comment } from "antd";
import type { comment as commentType } from "@/types";
import UserFace from "@/components/common/UserFace";
import { Context } from "@/store";
import css from "styled-jsx/css";
import Logn from "@/components/common/Header/Logn";
import Editor from "./Editor";
import Comments from "./Comments";
import If from "@/utils/If";

interface propsType {
  articleId: string | null;
}
/** 格式化评论用于渲染多级*/
interface formatCommentsType extends commentType {
  childrenComment?: commentType[];
}

const Style = css`
  .article-container_item {
    background-color: white;
    padding: 10px 20px;
    margin-top: 10px;
  }
`;

/** 评论和展示评论组件*/
const CommentFC: FunctionComponent<propsType> = props => {
  const [value, setValue] = useState("");
  let store = useContext(Context);
  let email = store.userData.email == "admin" ? "管理员" : store.userData.email;
  const [isLayerShow, setIsLayerShow] = useState(false);
  return (
    <>
      <style jsx>{Style}</style>
      <div className="article-container_item">
        <If
          if={store.userData.sign}
          else={
            <div style={{ padding: "20px 0px", textAlign: "center" }}>
              请<a onClick={() => setIsLayerShow(true)}>登录</a>后评论
            </div>
          }
        >
          <Comment
            avatar={<UserFace width={32} height={32} userId={email} />}
            content={
              <Editor
                articleId={props.articleId}
                value={value}
                onChange={value => setValue(value)}
              />
            }
          />
        </If>
      </div>
      <Comments articleId={props.articleId} />
      <Logn isLayerShow={isLayerShow} closeLayer={() => setIsLayerShow(false)} />
    </>
  );
};
export default memo(CommentFC);
export type { formatCommentsType };

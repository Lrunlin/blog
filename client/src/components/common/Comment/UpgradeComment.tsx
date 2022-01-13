import { FunctionComponent, useContext } from "react";
import { useRouter } from "next/router";
import moment from "moment";
import axios from "axios";
import { DeleteOutlined } from "@ant-design/icons";
import { Comment, Tooltip, message } from "antd";
import css from "styled-jsx/css";
import { Context } from "@/store";
import UserFace from "@/components/common/UserFace";
import type { formatCommentsType } from "./index";
import { response } from "@/types";
import Reply from "./Reply";
interface propsTypes {
  item: formatCommentsType;
  data: formatCommentsType[];
}

interface avatarNameTypes {
  item: formatCommentsType;
  data: formatCommentsType[];
}

const Style = css`
  strong {
    color: black !important;
    cursor: pointer;
  }
`;

/** 显示文章名字*/
const AvatarName: FunctionComponent<avatarNameTypes> = ({ item, data }): JSX.Element => {
  let rotuer = useRouter();
  /** 将admin转为管理员*/
  const switchAdmin = (value: string) => (value == "admin" ? "管理员" : value);
  if (!item.superior) {
    return (
      <>
        <style jsx>{Style}</style>
        <strong onClick={() => rotuer.push(`/user/${item.commentator}`)}>
          {switchAdmin(item.commentator)}
        </strong>
      </>
    );
  }

  /** 二级评论获取上级*/
  let superior = data.flat().find(arr => arr.id == item.superior)?.commentator;
  return (
    <>
      <style jsx>{Style}</style>
      <strong onClick={() => rotuer.push(`/user/${item.commentator}`)}>
        {switchAdmin(item.commentator)}
      </strong>
      <span style={{ margin: "0px 5px" }}>回复</span>
      <strong onClick={() => rotuer.push(`/user/${superior}`)}>
        {switchAdmin(superior as string)}
      </strong>
    </>
  );
};

/** 封装单个评论组件*/
const UpgradeComment: FunctionComponent<propsTypes> = props => {
  let store = useContext(Context);
  let router = useRouter();

  function deleteComment(id: string) {
    axios.delete<response>(`/comment/${id}`).then(res => {
      res.data.success
        ? (message.success("删除成功"), router.reload())
        : message.error(res.data.message);
    });
  }

  return (
    <>
      <style jsx global>{`
        /** 评论的padding*/
        .ant-comment-inner {
          padding-top: 0px;
          padding-bottom: 10px;
        }
        .ant-comment-actions {
          margin-top: 5px;
        }
      `}</style>
      <Comment
        key={props.item.id}
        author={<AvatarName item={props.item} data={props.data} />}
        avatar={<UserFace width={32} height={32} userId={props.item.commentator} />}
        content={props.item.content}
        actions={
          store.userData.sign
            ? [
                props.item.commentator == store.userData.email ? (
                  <span key={props.item.id + "删除"} onClick={() => deleteComment(props.item.id)}>
                    <DeleteOutlined />
                    删除
                  </span>
                ) : (
                  <Reply
                    articleId={props.item.articleId}
                    superior={props.item.id}
                    key={props.item.id + "回复"}
                  />
                ),
              ]
            : undefined
        }
        datetime={
          <Tooltip title={moment(props.item.time).format("YYYY-MM-DD HH:mm:ss")}>
            <span>{moment(props.item.time).fromNow()}</span>
          </Tooltip>
        }
      >
        {props.children}
      </Comment>
    </>
  );
};

export default UpgradeComment;

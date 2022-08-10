import { useState } from "react";
import type { FC, ReactNode } from "react";
import { useRecoilValue } from "recoil";
import { userDataContext } from "@/store/user-data";
import { Comment, Avatar, Image as AntdImage } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import moment from "moment";
import type { CommentAttributes } from "@type/model-attribute";
import Image from "next/image";
import Editor from "../Editor";

interface propsType {
  children?: ReactNode;
  data: CommentAttributes;
}

const CommentItem: FC<propsType> = props => {
  let { data, children } = props;
  let userData = useRecoilValue(userDataContext);
  const [showEditor, setShowEditor] = useState(false);
  function removeComment() {}
  return (
    <Comment
      actions={[
        <div className="flex items-center">
          <span
            className="flex items-center"
            onClick={e => {
              setShowEditor(_state => !_state);
            }}
          >
            <Image src="/icon/comment.png" width={14} height={14} />
            <span className="ml-0.5">{showEditor ? "取消回复" : "回复"}</span>
          </span>
          {data.user_data.id == userData?.id && (
            <span className="flex items-center ml-3" onClick={removeComment}>
              <Image src="/icon/delete2.png" width={14} height={14} />
              <span className="ml-0.5">删除</span>
            </span>
          )}
        </div>,
      ]}
      author={
        <a target="_blank" href={`/user/${data.user_data.id}`}>
          {data.user_data.name}
        </a>
      }
      datetime={<span>{moment(data.create_time).fromNow()}</span>}
      avatar={
        <a target="_blank" href={`/user/${data.user_data.id}`}>
          <Avatar
            src={data.user_data.avatar_url}
            className="block"
            size={40}
            alt={data.user_data.name}
          />
        </a>
      }
      content={
        <>
          <div>{data.content}</div>
          {data.comment_pics && (
            <div>
              <AntdImage
                width={60}
                height={60}
                src={data.comment_pics}
                alt="评论图片"
                preview={{
                  mask: <EyeOutlined />,
                }}
              />
            </div>
          )}
        </>
      }
    >
      {showEditor && (
        <Editor
          id={`comment:${data.id}`}
          autoFocus={true}
          hideAvatar={true}
          reply={data.id}
          // onBlur={() => setShowEditor(false)}
        />
      )}
      {children}
    </Comment>
  );
};
export default CommentItem;

import { useState } from "react";
import type { FC } from "react";
import { useRecoilValue } from "recoil";
import { userDataContext } from "@/store/user-data";
import { useRouter } from "next/router";
import Image from "@/components/next/Image";
import { Avatar, Image as AntdImage, message } from "antd";
import { Comment } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";
import { useSWRConfig } from "swr";
import type { CommentAttributes } from "@type/model-attribute";
import Editor from "../Editor";

interface propsType {
  data: CommentAttributes;
}

const CommentItem: FC<propsType> = props => {
  let router = useRouter();
  let articleID = router.query.id;
  let { mutate } = useSWRConfig();
  let { data } = props;
  let userData = useRecoilValue(userDataContext);
  const [showEditor, setShowEditor] = useState(false);
  function removeComment() {
    axios.delete(`/comment/${data.id}`).then(res => {
      if (res.data.success) {
        message.success(res.data.message);
        mutate(`/comment/list/${articleID}`);
      } else {
        message.error(res.data.message);
      }
    });
  }
  return (
    <>
      <Comment
        className="w-full"
        actions={[
          <div className="flex items-center" key={"comment-1"}>
            <span
              className="flex items-center cursor-pointer"
              onClick={e => {
                setShowEditor(_state => !_state);
              }}
            >
              <Image src="/icon/comment.png" width={14} height={14} alt="comment" />
              <span className="ml-0.5">{showEditor ? "取消回复" : "回复"}</span>
            </span>
            {data.user_data.id == userData?.id && (
              <span className="flex items-center ml-3 cursor-pointer" onClick={removeComment}>
                <Image src="/icon/delete-fill.png" width={14} height={14} alt="delete" />
                <span className="ml-0.5">删除</span>
              </span>
            )}
          </div>,
        ]}
        author={
          !data.reply || typeof data.reply == "number" ? (
            <a target="_blank" href={`/user/${data.user_data.id}`} className="text-base text-black">
              {data.user_data.name}
            </a>
          ) : (
            <>
              <a
                target="_blank"
                href={`/user/${data.user_data.id}`}
                className="text-base text-black"
              >
                {data.user_data.name}
              </a>
              <span className="mx-1">回复</span>
              <a
                target="_blank"
                href={`/user/${data.reply.user_data.id}`}
                className="text-base text-black"
              >
                {data.reply.user_data.name}
              </a>
            </>
          )
        }
        datetime={<span>{dayjs(data.create_time).fromNow()}</span>}
        avatar={
          <a target="_blank" href={`/user/${data.user_data.id}`} className="block w-10 h-10">
            <Avatar
              src={data.user_data.avatar_url}
              size={32}
              alt={`用户${data.user_data.name}头像`}
            />
          </a>
        }
        content={
          <>
            <div>
              {!data.reply || typeof data.reply == "number" ? (
                data.content
              ) : (
                <>
                  <div>{data.content}</div>
                  <div className="mt-1 px-1 py-0.5 text-gray-500 bg-gray-100 border border-solid border-gray-200 rounded-sm">
                    “{data.reply.content}”
                  </div>
                </>
              )}
            </div>
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
        <>
          {showEditor && (
            <Editor id={`comment:${data.id}`} autoFocus={true} hideAvatar={true} reply={data.id} />
          )}
          <div>
            {data.children &&
              data.children.map(item => {
                return <CommentItem data={item} key={item.id} />;
              })}
          </div>
        </>
      </Comment>
    </>
  );
};
export default CommentItem;

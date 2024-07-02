import { useMemo } from "react";
import type { FC } from "react";
import { useParams } from "next/navigation";
import { Image as AntdImage, message } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import axios from "@axios";
import dayjs from "@dayjs";
import type { articleCommentType } from "@type/model/article-comment";
import classNames from "classnames";
import { refetchKey } from "@/common/hooks/useFetch";
import Image from "@/components/next/Image";
import NoFollowLink from "@/components/next/NoFollowLink";
import useUserArticleComment from "@/store/user/user-article-comment";
import userUserCurrentArticleData from "@/store/user/user-current-article-data";
import useUserData from "@/store/user/user-data";
import Editor from "../Editor";

interface propsType {
  data: articleCommentType;
  list: articleCommentType[];
}

/** 文章页面单个评论组件*/
const CommentItem: FC<propsType> = ({ data, list }) => {
  let editorOption = useUserArticleComment((s) => s.data);
  let setEditorOption = useUserArticleComment((s) => s.setData);
  let currentArticleData = userUserCurrentArticleData((s) => s);

  const showEditor = useMemo(
    () => `comment:${data.id}` == editorOption.activeInputID,
    [data, editorOption.activeInputID],
  );
  let userData = useUserData((s) => s.data);
  let params = useParams();
  let id = params.id as string;
  function removeComment() {
    axios
      .delete(`/comment/${data.id}`)
      .then((res) => {
        message.success(res.data.message);
        currentArticleData.updateData({
          comment_count: currentArticleData.data.comment_count - 1,
        });
        refetchKey(`/comment/article/${id}`);
      })
      .catch((err) => {
        message.error(err.message);
      });
  }

  return (
    <>
      <div
        key={data.id}
        className={classNames([
          "mt-4",
          !list?.some((item) => data.id == item.id) && "ml-10",
        ])}
      >
        {/* 头部用户信息 */}
        <div className="flex items-start">
          <NoFollowLink href={`/user/${data.user_id}`}>
            <img
              className="h-10 w-10 rounded-full"
              src={data.user_data.avatar_url}
              alt="avatar"
            />
          </NoFollowLink>
          {/* 用户信息、回复情况展示 */}
          <div className="ml-2 text-sm">
            {!data.reply ? (
              <NoFollowLink
                href={`/user/${data.user_data.id}`}
                className="text-base text-black"
              >
                {data.user_data.name}
              </NoFollowLink>
            ) : (
              <>
                <NoFollowLink
                  href={`/user/${data.user_data.id}`}
                  className="ml-4 text-gray-600"
                >
                  {data.user_data.name}
                </NoFollowLink>
                <span className="mx-1">回复</span>
                <NoFollowLink
                  href={`/user/${data.reply.user_data.id}`}
                  className="text-gray-600"
                >
                  {data.reply.user_data.name}
                </NoFollowLink>
              </>
            )}
            <span className="ml-2 text-gray-600">
              {dayjs(data.create_time).fromNow()}
            </span>
          </div>
        </div>
        {/* 内容展示 */}
        <div className="ml-1 mt-3 break-all">
          <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
          {data.reply && (
            <div className="mt-1 line-clamp-1 rounded-sm border border-solid border-gray-200 bg-gray-100 px-1 py-0.5 text-gray-500">
              “{data.reply.content}”
            </div>
          )}
        </div>
        {/* 评论图片展示 */}
        {data.comment_pics && (
          <div className="mt-1">
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
        {/* 回复、删除 */}
        <div className="flex items-center text-xs text-gray-600">
          <span
            className="mt-3 flex cursor-pointer select-none items-center"
            onClick={() => {
              setEditorOption({
                activeInputID: showEditor ? null : `comment:${data.id}`,
              });
            }}
          >
            <Image
              src="/icon/client/comment.png"
              width={14}
              height={14}
              alt="comment"
            />
            <span className="ml-0.5">{showEditor ? "收起" : "回复"}</span>
          </span>
          {data.user_data.id == userData?.id && (
            <span
              className="ml-3 mt-3 flex cursor-pointer items-center"
              onClick={removeComment}
            >
              <Image
                src="/icon/client/delete-fill.png"
                width={14}
                height={14}
                alt="delete"
              />
              <span className="ml-0.5">删除</span>
            </span>
          )}
        </div>
        {/* 编辑器 */}
        {showEditor && (
          <Editor
            className="mt-2"
            id={`comment:${data.id}`}
            hideAvatar={true}
            reply={data.id}
          />
        )}
      </div>
      {/* 渲染子评论 */}
      {data.children &&
        data.children.map((item, index) => (
          <div key={item.id}>
            <CommentItem data={item} list={list} />
          </div>
        ))}
    </>
  );
};
export default CommentItem;

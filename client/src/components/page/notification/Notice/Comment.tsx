import { FC } from "react";
import { Avatar } from "antd";
import NoFollowLink from "@/components/next/NoFollowLink";
import dayjs from "dayjs";
import type { noticeCommentListType } from "@/pages/notification/[type]";
interface propsType {
  data: noticeCommentListType;
}
function _switch(type: keyof typeof map, reply: boolean) {
  /** 第一个显示的正常评论下的文字，第二个数组显示的是reply下的显示文字*/
  let map = {
    answer: [["评论了你的问题"], ["回复了你在问题", "下的评论"]],
    problem: [
      ["评论了你在问题", "下的答案"],
      ["回复了在问题", "下的评论"],
    ],
    article: [["评论了你的文章"], ["回复了你在文章", "下的评论"]],
  };

  let key = Object.keys(map).find(item => type.includes(item)) as string;
  return map[key as keyof typeof map][reply ? 1 : 0];
}
//评论了你的问题XXX  回复了你在XXX下的评论
//评论了你在问题XXX下的答案  回复了在问题XXX下的评论
//评论了你的文章XXX  回复了你在问题XXX下的评论

const ArticleCommentNotice: FC<propsType> = ({ data }) => {
  let _data = _switch(data.type as any, !!data.label.comment_data.reply);
  return (
    <>
      <div className="w-10 h-10">
        <NoFollowLink href={`/user/${data.label.user_data.id}`}>
          <Avatar size={40} src={data.label.user_data.avatar_url} alt="用户头像" />
        </NoFollowLink>
      </div>
      <div className="max-w-full ml-6 flex-1">
        <div className="w-3/4 truncate flex mt-0.5">
          用户
          <NoFollowLink href={`/user/${data.label.user_data.id}`} className="font-bold mx-1">
            {data.label.user_data.name}
          </NoFollowLink>
          {_data[0]}
          <NoFollowLink
            className="font-bold truncate"
            href={`/${data.label.type}/${data.label.content_data.id}`}
          >
            {data.label.content_data.title}
          </NoFollowLink>
          {_data[1]}
        </div>

        <div className="w-3/4 truncate">“{data.label.comment_data.content}”</div>

        {data.label.comment_data?.reply && (
          <div className="w-3/4 mt-1 p-1.5 border border-solid rounded-sm border-gray-200">
            <NoFollowLink
              href={`/${data.label.type}/${data.label.content_data.id}`}
              className="text-gray-700 line-clamp-6"
            >
              {data.label.comment_data?.reply?.content}
            </NoFollowLink>
          </div>
        )}

        <div className="mt-2 text-gray-400">
          {dayjs(data.create_time).fromNow().replace(" ", "")}
        </div>
      </div>
    </>
  );
};
export default ArticleCommentNotice;

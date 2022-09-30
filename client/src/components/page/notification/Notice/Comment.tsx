import { FC } from "react";
import type {
  ArticleAttributes,
  NoticeAttributes,
  UserAttributes,
  CommentAttributes,
} from "@type/model-attribute";
import { Avatar } from "antd";
import NoFollowLink from "@/components/next/NoFollowLink";
import moment from "moment";

interface dataType extends Omit<NoticeAttributes, "is_read"> {
  label: {
    user_data: Pick<UserAttributes, "id" | "name" | "avatar_url" | "avatar_file_name">;
    article_data: Pick<ArticleAttributes, "id" | "title" | "author">;
    comment_data: Pick<CommentAttributes, "id" | "content"|"reply"|"article_id">;
    raply_comment: Pick<CommentAttributes, "content">;
  };
}

const ArticleCommentNotice: FC<{ data: dataType }> = ({ data }) => {
  return (
    <div className="flex w-[600px]">
      <Avatar size={40} src={data.label.user_data.avatar_url} alt="用户头像" />
      <div className="ml-6">
        <div className="flex mt-0.5">
          用户
          <NoFollowLink href={`/user/${data.label.user_data.id}`} className="font-bold mx-1">
            {data.label.user_data.name}
          </NoFollowLink>
          回复了你的在文章
          <NoFollowLink href={`/article/${data.label.article_data.id}`}>
            <div className="max-w-40 truncate">{data.label.article_data.title}</div>
          </NoFollowLink>
          下的评论
        </div>
        <div>“{data.label.comment_data.content}”</div>
        <div className="w-[500px] mt-1 p-2 border border-solid rounded-sm  border-gray-200">
          <NoFollowLink
            href={`/article/${data.label.article_data.id}`}
            className="text-gray-700 line-clamp-13"
          >
            {data.label.raply_comment.content}
          </NoFollowLink>
        </div>
        <div className="mt-2 text-gray-400">
          {moment(data.create_time).fromNow().replace(" ", "")}
        </div>
      </div>
    </div>
  );
};
export default ArticleCommentNotice;

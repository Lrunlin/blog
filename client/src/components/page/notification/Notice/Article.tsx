import type{ FC } from "react";
import type { ArticleAttributes, NoticeAttributes, UserAttributes } from "@type/model-attribute";
import { Avatar } from "antd";
import NoFollowLink from "@/components/next/NoFollowLink";
import moment from "moment";

interface dataType extends Omit<NoticeAttributes, "is_read"> {
  label: {
    user_data: Pick<UserAttributes, "id" | "name" | "avatar_url" | "avatar_file_name">;
    article_data: Pick<ArticleAttributes, "id" | "title" | "author">;
  };
}

const ArticleNotice: FC<{ data: dataType }> = ({ data }) => {
  return (
    <div className="flex">
      <Avatar size={40} src={data.label.user_data.avatar_url} alt="用户头像" />
      <div className="ml-6">
        <div className="flex mt-0.5">
          你关注的
          <NoFollowLink href={`/user/${data.label.user_data.id}`} className="font-bold mx-1">
            {data.label.user_data.name}
          </NoFollowLink>
          发布了新的文章
          <NoFollowLink href={`/article/${data.label.article_data.id}`} className="font-bold mx-1">
            <div className="max-w-40 truncate">{data.label.article_data.title}</div>
          </NoFollowLink>
          快去看看吧。
        </div>
        <div className="mt-2 text-gray-400">
          {moment(data.create_time).fromNow().replace(" ", "")}
        </div>
      </div>
    </div>
  );
};
export default ArticleNotice;

import type { FC } from "react";
import { useRouter } from "next/navigation";
import { Avatar } from "antd";
import dayjs from "dayjs";
import FollwoButton from "@/components/page/article/UserData/FollowButton";
import type { ArticleAttributes } from "@type/model-attribute";

interface propsType {
  data: Pick<ArticleAttributes, "author_data" | "create_time" | "view_count" | "id">;
  type: "article" | "problem";
}

/** 文章页面作者信息展示*/
const ArticleUserData: FC<propsType> = ({ data, type }) => {
  let router = useRouter();
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <span onClick={() => router.push(`/user/${data.author_data.id}`)}>
            <Avatar
              src={data.author_data.avatar_url}
              alt={`作者${data.author_data.name}头像`}
              className="cursor-pointer"
            />
          </span>
          <div className="ml-2">
            <div>{data.author_data.name}</div>
            <div>
              <time>{dayjs(data.create_time).format("YYYY年MM月DD日 HH:mm")}</time>
              <span> · 阅读数 {data.view_count}</span>
            </div>
          </div>
        </div>
        <FollwoButton type={type} articleID={data.id} bloggerID={data.author_data.id} />
      </div>
    </>
  );
};
export default ArticleUserData;

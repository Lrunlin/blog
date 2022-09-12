import { Avatar } from "antd";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import moment from "moment";
import { currentArticleDataContext } from "@/pages/article/[id]";
import FollwoButton from "@/components/page/article/FollowButton";

const ArticleUserData = () => {
  let router = useRouter();
  let data = useRecoilValue(currentArticleDataContext);
  return (
    <>
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
            <time>{moment(data.create_time).format("YYYY年MM月DD日 hh:mm")}</time>
            <span> · 阅读数 {data.view_count}</span>
          </div>
        </div>
      </div>
      <FollwoButton bloggerID={data.author_data.id} />
    </>
  );
};
export default ArticleUserData;

import type { FC } from "react";
import useSWR from "swr";
import axios from "axios";
import { Skeleton } from "antd";
import { useRouter } from "next/router";
import Image from "@/components/next/Image";
import type { UserAttributes } from "@type/model-attribute";

const Aside: FC<{ data: UserAttributes }> = props => {
  let router = useRouter();

  let { data, error, isValidating } = useSWR(`achievement-user-${router.query.id}`, () =>
    axios.get(`/achievement/${router.query.id}`).then(res => res.data.data)
  );

  return (
    <aside className="w-60 fixed">
      <div className="bg-white w-60 p-4 shadow-sm">
        <div className="text-xl font-medium pb-2 text-gray-900 border-b-solid border-gray-200">
          个人成就
        </div>
        {isValidating ? (
          <Skeleton />
        ) : error ? (
          <div className="py-6 text-center">请求错误</div>
        ) : (
          <div className="mt-3">
            <div
              className="h-8 flex items-center cursor-pointer"
              onClick={() => router.push({ query: { ...router.query, key: "article" } })}
            >
              <div className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-50">
                <Image src="/icon/client/view-blue.png" height={14} width={14} alt="view icon" />
              </div>
              <span className="ml-2">文章被阅读 {data.article_view_count.toLocaleString()}</span>
            </div>
            <div className="h-8 flex items-center">
              <div className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-50">
                <Image
                  src="/icon/client/collection-blue.png"
                  height={14}
                  width={14}
                  alt="collection icon"
                />
              </div>
              <span className="ml-2">
                文章被收藏 {data.article_collection_count.toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="w-60 p-4 mt-3 flex justify-around bg-white shadow-sm">
        <div
          className="text-center cursor-pointer"
          onClick={() => router.push({ query: { ...router.query, key: "following" } })}
        >
          <div className="text-base">关注了</div>
          <b>{props.data.followee_count}</b>
        </div>
        <div
          className="text-center cursor-pointer"
          onClick={() => router.push({ query: { ...router.query, key: "follower" } })}
        >
          <div className="text-base">关注者</div>
          <b>{props.data.follower_count}</b>
        </div>
      </div>
      <div className="mt-4">
        <div
          className="h-8 cursor-pointer flex items-center border-t-solid border-gray-200"
          onClick={() => router.push({ query: { ...router.query, key: "collection" } })}
        >
          收藏文章 {props.data.collection_count} 篇
        </div>
        {data && (
          <div
            className="h-8 cursor-pointer flex items-center border-t-solid border-gray-200"
            onClick={() => router.push({ query: { ...router.query, key: "article" } })}
          >
            发布文章 {data.article_count} 篇
          </div>
        )}
        <div className="h-8 flex items-center border-t-solid border-gray-200">
          加入时间: {props.data.create_time.substring(0, 10)}
        </div>
      </div>
    </aside>
  );
};
export default Aside;

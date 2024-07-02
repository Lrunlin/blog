import { type FC, useCallback } from "react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { Skeleton } from "antd";
import axios from "@axios";
import type { UserAttributes } from "@type/model-attribute";
import useFetch from "@/common/hooks/useFetch";
import Image from "@/components/next/Image";

const Aside: FC<{ data: UserAttributes }> = (props) => {
  let router = useRouter();
  let params = useParams();
  let id = params.id;
  let searchParams = useSearchParams();
  let key = searchParams.get("key");
  const pathname = usePathname();

  let { data, error, isLoading } = useFetch(() =>
    axios.get(`/achievement/${id}`).then((res) => res.data.data),
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <aside className="fixed w-60">
      <div className="w-60 bg-white p-4 shadow-sm">
        <div className="border-b-solid border-gray-200 pb-2 text-xl font-medium text-gray-900">
          个人成就
        </div>
        {isLoading ? (
          <Skeleton />
        ) : error ? (
          <div className="py-6 text-center">请求错误</div>
        ) : (
          <div className="mt-3">
            <div
              className="flex h-8 cursor-pointer items-center"
              onClick={() => {
                router.push(
                  pathname + "?" + createQueryString("key", "article"),
                );
              }}
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50">
                <Image
                  src="/icon/client/view-blue.png"
                  height={14}
                  width={14}
                  alt="view icon"
                />
              </div>
              <span className="ml-2">
                文章被阅读 {data.article_view_count.toLocaleString()}
              </span>
            </div>
            <div className="flex h-8 items-center">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50">
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
      <div className="mt-3 flex w-60 justify-around bg-white p-4 shadow-sm">
        <div
          className="cursor-pointer text-center"
          onClick={() => {
            router.push(pathname + "?" + createQueryString("key", "following"));
          }}
        >
          <div className="text-base">关注了</div>
          <b>{props.data.followee_count}</b>
        </div>
        <div
          className="cursor-pointer text-center"
          onClick={() => {
            router.push(pathname + "?" + createQueryString("key", "follower"));
          }}
        >
          <div className="text-base">关注者</div>
          <b>{props.data.follower_count}</b>
        </div>
      </div>
      <div className="mt-4">
        <div
          className="border-t-solid flex h-8 cursor-pointer items-center border-gray-200"
          onClick={() => {
            router.push(
              pathname + "?" + createQueryString("key", "collection"),
            );
          }}
        >
          收藏文章 {props.data.collection_count} 篇
        </div>
        {data && (
          <div
            className="border-t-solid flex h-8 cursor-pointer items-center border-gray-200"
            onClick={() => {
              router.push(pathname + "?" + createQueryString("key", "article"));
            }}
          >
            发布文章 {data.article_count} 篇
          </div>
        )}
        <div className="border-t-solid flex h-8 items-center border-gray-200">
          加入时间: {props.data.create_time.substring(0, 10)}
        </div>
      </div>
    </aside>
  );
};
export default Aside;

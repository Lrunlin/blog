import { useState, useEffect } from "react";
import type { FC, Dispatch, SetStateAction } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Skeleton, Divider, Empty, Avatar } from "antd";
import type { UserAttributes } from "@type/model-attribute";
import FollowButton from "./FollowButton";
import Link from "next/link";

type followItem = Pick<
  UserAttributes,
  "id" | "name" | "description" | "avatar_file_name" | "avatar_url"
> & {
  /** 访问页面的用户是否关注了该用户*/
  isFollow: boolean;
};

interface propsType {
  loadMoreData: (
    page: number,
    setTotal: Dispatch<SetStateAction<number>>,
    setData: Dispatch<SetStateAction<followItem[]>>
  ) => void;
}
const FollowList: FC<propsType> = props => {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [data, setData] = useState<followItem[]>([]);

  useEffect(() => {
    props.loadMoreData(page, setTotal, setData);
  }, [page]);
  return (
    <>
      {data.length ? (
        <InfiniteScroll
          dataLength={data.length}
          next={() => setPage(_page => ++_page)}
          hasMore={data.length < total}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>到底啦 ~ ~ 🤐</Divider>}
          className="bg-white"
        >
          <ul className="p-0 w-full">
            {data.map(item => (
              <li key={`follow-list-${item.id}`} className="h-16 flex justify-between list-none">
                <div>
                  <div className="flex items-start ">
                    <Link href={`/user/${item.id}`}>
                      <Avatar src={item.avatar_url} alt="用户头像" size={45} />
                    </Link>
                    <div className="ml-3">
                      <Link href={`/user/${item.id}`} className="text-black text-xl">
                        {item.name}
                      </Link>
                      <div className="w-24 truncate text-gray-400">{item.description}</div>
                    </div>
                  </div>
                </div>
                <FollowButton isFollow={item.isFollow} bloggerID={item.id} />
              </li>
            ))}
          </ul>
        </InfiniteScroll>
      ) : (
        <Empty className="py-32" image={Empty.PRESENTED_IMAGE_SIMPLE} description="列表为空哦" />
      )}
    </>
  );
};
export default FollowList;

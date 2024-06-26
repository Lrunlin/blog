import type { FC } from "react";
import { Avatar, Empty } from "antd";
import NoFollowLink from "@/components/next/NoFollowLink";

interface propsType {
  isValidating: boolean;
  error: boolean;
  data: any[];
}
const RankingList: FC<propsType> = ({ data, error, isValidating }) => {
  return (
    <>
      <div className="mt-3 bg-white shadow-sm">
        {isValidating ? (
          <div className="h-80 bg-gray-200"></div>
        ) : error ? (
          <div className="flex h-10 items-center justify-center">加载错误</div>
        ) : (
          <div className="px-2 pb-2">
            {data.length ? (
              data.map((item) => (
                <NoFollowLink
                  href={`/user/${item.id}`}
                  key={item.id}
                  className="mb-2 flex py-2"
                >
                  <Avatar size={40} src={item.avatar_url} alt="头像">
                    {(item.name as string).substring(0, 1).toLocaleUpperCase()}
                  </Avatar>
                  <div className="ml-2 w-32 truncate">
                    <p className="m-0 text-slate-800">{item.name}</p>
                    <p className="m-0 text-xs text-slate-600">
                      {item.description || item.unit || item.location}
                    </p>
                  </div>
                </NoFollowLink>
              ))
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </div>
        )}
      </div>
    </>
  );
};
export default RankingList;

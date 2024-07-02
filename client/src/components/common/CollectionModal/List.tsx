import { useEffect, useRef, useState } from "react";
import type { FC } from "react";
import { Button, Checkbox, Empty } from "antd";
import { LockOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "@axios";
import { response } from "@type/response";
import classNames from "classnames";
import useFetch from "@/common/hooks/useFetch";
import useUserData from "@/store/user/user-data";
import { favoritesListProps } from "./index";
import type { propsType } from "./index";

const List: FC<
  {
    onSwitchType: () => void;
    isLoading: boolean;
    onSubmit: (checkList: number[]) => any;
  } & Pick<propsType, "defaultChecked">
> = ({
  onSwitchType,
  isLoading: buttonIsLoading,
  onSubmit,
  defaultChecked,
}) => {
  let userData = useUserData((s) => s.data);
  const [checkList, setCheckList] = useState<number[]>([]);
  let { data, error, isLoading, refetch } = useFetch(() =>
    axios
      .get<response<favoritesListProps[]>>(`/favorites/${userData?.id}`)
      .then((res) => res.data.data),
  );

  let firstRender = useRef(true);
  useEffect(() => {
    setCheckList(defaultChecked || []);
    if ((firstRender.current = false)) {
      firstRender.current = true;
    } else {
      refetch();
    }
  }, [defaultChecked]);

  return (
    <div>
      <div className="h-[350px] overflow-y-scroll scrollbar-none">
        {data ? (
          <div>
            {data.length ? (
              <>
                {data.map((item, index) => {
                  return (
                    <div
                      key={item.id}
                      className={classNames(
                        "flex items-center justify-between px-2 py-2",
                        index &&
                          "border-0 border-t border-solid border-gray-200",
                      )}
                    >
                      <div>
                        <div className="flex cursor-pointer items-center text-lg">
                          <span>{item.name}</span>
                          {!!item.is_private && (
                            <LockOutlined className="ml-2 text-gray-400" />
                          )}
                        </div>
                        <div className="cursor-pointer text-sm text-gray-400">
                          {item.favorites_collection_count}
                          <span className="ml-1">篇文章</span>
                        </div>
                      </div>
                      {/* 通过key刷新复选框 */}
                      <Checkbox
                        key={`checkbox-key-${defaultChecked?.length}`}
                        defaultChecked={defaultChecked?.includes(item.id)}
                        onChange={(e) => {
                          let value = e.target.checked;
                          if (value) {
                            setCheckList((list) => [...list, item.id]);
                          } else {
                            setCheckList((list) =>
                              list.filter((_item) => _item != item.id),
                            );
                          }
                        }}
                      />
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="flex justify-center">
                <Empty description="暂时没有收藏夹，快去创建吧" />
              </div>
            )}
          </div>
        ) : error ? (
          <div className="h-full w-full">
            <div className="text-center text-xl text-blue-700">
              数据加载错误
            </div>
            <div className="mt-4 text-center">
              <Button loading={isLoading} type="primary" onClick={refetch}>
                重新加载
              </Button>
            </div>
          </div>
        ) : (
          <div className="h-full w-full animate-pulse bg-gray-200"></div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="cursor-pointer text-blue-500" onClick={onSwitchType}>
          <PlusOutlined />
          新建收藏集
        </div>
        <Button
          type="primary"
          loading={buttonIsLoading}
          onClick={() => onSubmit(checkList)}
        >
          确定
        </Button>
      </div>
    </div>
  );
};

export default List;

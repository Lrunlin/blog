import { useState, useEffect, useRef } from "react";
import type { FC } from "react";
import { Button, Empty, Checkbox } from "antd";
import axios from "axios";
import useFetch from "@/common/hooks/useFetch";
import { response } from "@type/response";
import { PlusOutlined, LockOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { favoritesListProps } from "./index";
import type { propsType } from "./index";
import useUserData from "@/store/user-data";

const List: FC<
  {
    onSwitchType: () => void;
    isLoading: boolean;
    onSubmit: (checkList: number[]) => any;
  } & Pick<propsType, "defaultChecked">
> = ({ onSwitchType, isLoading: buttonIsLoading, onSubmit, defaultChecked }) => {
  let [userData] = useUserData();
  const [checkList, setCheckList] = useState<number[]>([]);
  let { data, error, isLoading, refetch } = useFetch(() =>
    axios
      .get<response<favoritesListProps[]>>(`/favorites/${userData?.id}`)
      .then(res => res.data.data)
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
                        "px-2 py-2 flex items-center justify-between",
                        index && "border-0 border-t border-solid border-gray-200"
                      )}
                    >
                      <div>
                        <div className="text-lg cursor-pointer flex items-center">
                          <span>{item.name}</span>
                          {!!item.is_private && <LockOutlined className="text-gray-400 ml-2" />}
                        </div>
                        <div className="text-sm text-gray-400 cursor-pointer">
                          {item.favorites_collection_count}
                          <span className="ml-1">篇文章</span>
                        </div>
                      </div>
                      {/* 通过key刷新复选框 */}
                      <Checkbox
                        key={`checkbox-key-${defaultChecked?.length}`}
                        defaultChecked={defaultChecked?.includes(item.id)}
                        onChange={e => {
                          let value = e.target.checked;
                          if (value) {
                            setCheckList(list => [...list, item.id]);
                          } else {
                            setCheckList(list => list.filter(_item => _item != item.id));
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
            <div className="text-blue-700 text-xl text-center">数据加载错误</div>
            <div className="text-center mt-4">
              <Button loading={isLoading} type="primary" onClick={refetch}>
                重新加载
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-gray-200 animate-pulse h-full w-full"></div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="text-blue-500 cursor-pointer" onClick={onSwitchType}>
          <PlusOutlined />
          新建收藏集
        </div>
        <Button type="primary" loading={buttonIsLoading} onClick={() => onSubmit(checkList)}>
          确定
        </Button>
      </div>
    </div>
  );
};

export default List;

import { useEffect, useRef, useState } from "react";
import type { FC } from "react";
import { Button, Divider, message } from "antd";
import { Badge, Dropdown } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import classNames from "classnames";
import useFetch from "@/common/hooks/useFetch";
import getArticleTag from "@/request/type/getTag";

interface propsType {
  onChange?: (tagId: number[]) => any;
  initValue?: number[];
}

const Tag: FC<propsType> = (props) => {
  const { data: dataList, isLoading } = useFetch(() => getArticleTag("tree"));
  let [data, setData] = useState<number[]>([]); //选中的tag列表ID
  let [activeType, setActiveType] = useState(0); //选中了那个Type

  // 初始化选中type
  useEffect(() => {
    if (dataList) {
      setActiveType(dataList[0].id);
    }
  }, [dataList]);

  // 设置初始化值
  let allowChangeValue = useRef(true);
  useEffect(() => {
    if (allowChangeValue.current && props.initValue?.length) {
      allowChangeValue.current = false;
      props.initValue && setData(props.initValue.map((item) => +item));
    }
  }, [props.initValue]);

  //向上传递结果l
  useEffect(() => {
    props.onChange && props.onChange(data);
  }, [data]);

  function getTag(id: number) {
    for (let index = 0; index < dataList!.length; index++) {
      let item = dataList![index];
      let result = item.children!.find((_item) => _item.id == id);
      if (result) {
        return result.name;
      }
    }
  }

  return (
    <div className="mt-4 flex items-start">
      {dataList &&
        data.map((item) => {
          return (
            <Button key={item} className="mr-1">
              {getTag(item)}
              <CloseOutlined
                className="ml-1"
                style={{ fontSize: 12 }}
                onClick={() =>
                  setData((_data) => _data.filter((_item) => _item != item))
                }
              />
            </Button>
          );
        })}
      <Dropdown
        trigger={["click"]}
        getPopupContainer={() =>
          document.getElementById("createProblemTag") as HTMLElement
        }
        dropdownRender={() => (
          <div className="flex w-96 justify-start rounded-md bg-white p-3 shadow-xl">
            {isLoading ? (
              <div className="h-full w-full bg-gray-300"></div>
            ) : dataList ? (
              <div className="w-full">
                {/* type */}
                <div className="flex w-full flex-wrap">
                  {dataList.map((item) => (
                    <Badge
                      count={item.children?.reduce(
                        (total, _item) =>
                          data.includes(_item.id) ? (total += 1) : total,
                        0,
                      )}
                      key={item.id}
                    >
                      <div>
                        <div>
                          <div
                            className="ml-2 cursor-pointer rounded p-2 text-center text-gray-500 hover:bg-gray-200"
                            onClick={() => setActiveType(item.id)}
                          >
                            {item.name}
                          </div>
                        </div>
                      </div>
                    </Badge>
                  ))}
                </div>
                <Divider className="!my-2 w-full" />
                {/* tag */}
                <div className="flex w-full flex-wrap">
                  {dataList
                    ?.find((i) => i.id == activeType)
                    ?.children?.map((item, index) => {
                      return (
                        <div
                          key={item.id}
                          className={classNames([
                            "ml-3 w-1/5 cursor-pointer rounded p-2 text-center text-gray-500 hover:bg-gray-200",
                            data.includes(item.id) && "bg-gray-200",
                            index > 3 && "mt-2",
                          ])}
                          onClick={() => {
                            data.includes(item.id)
                              ? setData((_data) =>
                                  _data.filter((_item) => _item != item.id),
                                )
                              : (() => {
                                  if (data.length == 6) {
                                    message.warning("标签最多6个");
                                    return;
                                  }
                                  setData((_data) => [..._data, item.id]);
                                })();
                          }}
                        >
                          {item.name}
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                数据获取失败
              </div>
            )}
          </div>
        )}
      >
        <Button type="primary" id="createProblemTag">
          添加标签
        </Button>
      </Dropdown>
    </div>
  );
};
export default Tag;

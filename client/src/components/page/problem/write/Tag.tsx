import { useState, useEffect, useRef } from "react";
import type { FC } from "react";
import useSWR from "swr";
import classNames from "classnames";
import { Button, Divider, message } from "antd";
import { Dropdown, Badge } from "antd";
import getTypeTree, { responseType } from "@/request/type/type-tree";
import { CloseOutlined } from "@ant-design/icons";
interface propsType {
  onChange?: (tagId: number[]) => any;
  initValue?: number[];
}

const Tag: FC<propsType> = props => {
  const { data: dataList, isValidating } = useSWR("/type-tree", () => getTypeTree());
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
      props.initValue && setData(props.initValue.map(item => +item));
    }
  }, [props.initValue]);

  //向上传递结果l
  useEffect(() => {
    props.onChange && props.onChange(data);
  }, [data]);

  function getTag(id: number) {
    for (let index = 0; index < (dataList as responseType[]).length; index++) {
      let item = (dataList as responseType[])[index];
      let result = item.children.find(_item => _item.id == id);
      if (result) {
        return result.name;
      }
    }
  }

  return (
    <div className="mt-4 flex items-start">
      {dataList &&
        data.map(item => {
          return (
            <Button key={item} className="mr-1">
              {getTag(item)}
              <CloseOutlined
                className="ml-1"
                style={{ fontSize: 12 }}
                onClick={() => setData(_data => _data.filter(_item => _item != item))}
              />
            </Button>
          );
        })}
      <Dropdown
        trigger={["click"]}
        getPopupContainer={() => document.getElementById("createProblemTag") as HTMLElement}
        dropdownRender={() => (
          <div className="w-96 p-3 bg-white shadow-xl rounded-md flex justify-start">
            {isValidating ? (
              <div className="w-full h-full bg-gray-300"></div>
            ) : dataList ? (
              <div className="w-full">
                {/* type */}
                <div className="w-full flex flex-wrap">
                  {dataList.map(item => (
                    <Badge
                      count={item.children?.reduce(
                        (total, _item) => (data.includes(_item.id) ? (total += 1) : total),
                        0
                      )}
                      key={item.id}
                    >
                      <div>
                        <div>
                          <div
                            className="p-2 ml-2 rounded text-gray-500 text-center hover:bg-gray-200 cursor-pointer"
                            onClick={() => setActiveType(item.id)}
                          >
                            {item.name}
                          </div>
                        </div>
                      </div>
                    </Badge>
                  ))}
                </div>
                <Divider className="w-full !my-2" />
                {/* tag */}
                <div className="w-full flex flex-wrap">
                  {dataList
                    .find(i => i.id == activeType)
                    ?.children.map((item, index) => {
                      return (
                        <div
                          key={item.id}
                          className={classNames([
                            "w-1/5 ml-3 p-2 rounded text-gray-500 text-center hover:bg-gray-200 cursor-pointer ",
                            data.includes(item.id) && "bg-gray-200",
                            index > 3 && "mt-2",
                          ])}
                          onClick={() => {
                            data.includes(item.id)
                              ? setData(_data => _data.filter(_item => _item != item.id))
                              : (() => {
                                  if (data.length == 6) {
                                    message.warning("标签最多6个");
                                    return;
                                  }
                                  setData(_data => [..._data, item.id]);
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
              <div className="flex justify-center items-center">数据获取失败</div>
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

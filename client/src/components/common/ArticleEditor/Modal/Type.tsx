import { useState } from "react";
import useSWR from "swr";
import getTypeTree from "@/request/type/type-tree";
import classNames from "classnames";
import { message, Badge } from "antd";
import { useRecoilState } from "recoil";
import { writeArticleContext } from "../index";

const Type = () => {
  let [type, setType] = useState<number>(-1);
  let [articleData, setArticleData] = useRecoilState(writeArticleContext);

  let { data } = useSWR("/type-tree", () => {
    let _data = getTypeTree();
    _data.then(res => {
      setType(res[0].id);
    });
    return _data;
  });
  return (
    <>
      {/* 类型 */}
      <div className="pb-2 flex flex-wrap w-full">
        {data &&
          data.map((item, index) => (
            <Badge
              count={item.children?.reduce(
                (total, _item) => (articleData.tag.includes(_item.id) ? (total += 1) : total),
                0
              )}
              offset={[-5, 5]}
              size="small"
              key={`article-write-type-${item.id}`}
              className="!w-1/5 !ml-1 block"
            >
              <div
                className={classNames([
                  "w-full py-2 rounded text-gray-500 text-center hover:bg-gray-200 cursor-pointer",
                  index > 3 && "mt-2",
                  type == item.id ? "bg-gray-200" : "bg-gray-100",
                ])}
                onClick={() => setType(item.id)}
              >
                {item.name}
              </div>
            </Badge>
          ))}
      </div>
      {/* 标签 */}
      <div className="pt-2 border-t-solid border-slate-200 flex flex-wrap">
        {data &&
          data
            ?.find(item => item.id == type)
            ?.children.map((item, index) => (
              <div
                className={classNames([
                  "!w-1/5 h-full py-1 !ml-1 rounded text-gray-500 text-center hover:bg-gray-200 cursor-pointer",
                  index > 3 && "mt-2",
                  articleData.tag.includes(item.id) ? "bg-gray-200" : "bg-gray-100",
                ])}
                key={`article-write-tag-${item.id}`}
                onClick={() => {
                  // 先判断是否点击过了
                  // 点击过了就取消没点过就先判断是否6个了在判断添加和删除
                  if (articleData.tag.includes(item.id)) {
                    setArticleData(_data => ({
                      ..._data,
                      tag: _data.tag.filter(_item => item.id != _item),
                    }));
                  } else {
                    if (articleData.tag.length < 6) {
                      setArticleData(_data => ({ ..._data, tag: [..._data.tag, item.id] }));
                    } else {
                      message.warning("最多选择6个标签");
                    }
                  }
                }}
              >
                {item.name}
              </div>
            ))}
      </div>
    </>
  );
};
export default Type;

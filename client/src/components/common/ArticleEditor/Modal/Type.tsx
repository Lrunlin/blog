import { useState } from "react";
import { Badge, message } from "antd";
import classNames from "classnames";
import useFetch from "@/common/hooks/useFetch";
import useUserWriteArticle from "@/store/user/user-write-article";
import getTag from "@/request/type/getTag";

const Type = () => {
  let [type, setType] = useState<number>(-1);
  let articleData = useUserWriteArticle((s) => s.data);
  let updateData = useUserWriteArticle((s) => s.updateData);

  let { data } = useFetch(() =>
    getTag("tree").then((res) => {
      setType(res[0].id);
      return res;
    }),
  );

  return (
    <>
      {/* 类型 */}
      <div className="flex w-full flex-wrap pb-2">
        {data &&
          data.map((item, index) => (
            <Badge
              count={item.children?.reduce(
                (total, _item) =>
                  articleData.tag.includes(_item.id) ? (total += 1) : total,
                0,
              )}
              offset={[-5, 5]}
              size="small"
              key={`article-write-type-${item.id}`}
              className="!ml-1 block !w-1/5"
            >
              <div
                className={classNames([
                  "w-full cursor-pointer rounded py-2 text-center text-gray-500 hover:bg-gray-200",
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
      <div className="border-t-solid flex flex-wrap border-slate-200 pt-2">
        {data &&
          data
            .find((item) => item.id == type)
            ?.children?.map((item, index) => (
              <div
                className={classNames([
                  "!ml-1 h-full !w-1/5 cursor-pointer rounded py-1 text-center text-gray-500 hover:bg-gray-200",
                  index > 3 && "mt-2",
                  articleData.tag.includes(item.id)
                    ? "bg-gray-200"
                    : "bg-gray-100",
                ])}
                key={`article-write-tag-${item.id}`}
                onClick={() => {
                  // 先判断是否点击过了
                  // 点击过了就取消没点过就先判断是否6个了在判断添加和删除
                  if (articleData.tag.includes(item.id)) {
                    updateData({
                      ...articleData,
                      tag: articleData.tag.filter((_item) => item.id != _item),
                    });
                  } else {
                    if (articleData.tag.length < 6) {
                      updateData({ tag: [...articleData.tag, item.id] });
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

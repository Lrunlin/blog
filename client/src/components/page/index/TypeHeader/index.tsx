import { useState, useMemo, useRef, useEffect } from "react";
import type { FC } from "react";
import { responseType as typeTreeRsponseType } from "@/request/type-tree-index";
import style from "../index.module.scss";
import classNames from "classnames";
import { useRecoilValue } from "recoil";
import { userDataContext } from "@/store/user-data";

interface propsType {
  data: typeTreeRsponseType[];
  className?: string;
  loadMoreData: (url: string) => void;
}
/** 首页顶部展示类型选择的头部组件，穿盾type-tree数组即可*/
const TypeHeader: FC<propsType> = props => {
  let { data } = props;
  let userData = useRecoilValue(userDataContext);
  const [activeTypeKey, setActiveTypeKey] = useState(data[0].id);
  const [activeTagKey, setActiveTagKey] = useState(data[0].id);

  const tagList = useMemo(
    () => data.find(item => item.id == activeTypeKey)?.children,
    [activeTypeKey]
  );

  function switchType(id: string) {
    setActiveTypeKey(id);
    setActiveTagKey(id);
    props.loadMoreData(id);
  }
  function switchTag(id: string) {
    // 如果ID变了就触发文章数据更新(先判断在更新)
    if (activeTagKey != id) {
      props.loadMoreData(id);
    }
    setActiveTagKey(id);
  }
  return (
    <>
      <div
        className={classNames([
          style["type-header"],
          "container-xs bg-white",
          "border-slate-100 border-b-solid",
          props.className || "",
        ])}
      >
        <div className="flex">
          {data.map(item => {
            return (
              (!item.isLogin || userData) && (
                <div
                  key={`type${item.id}`}
                  className={classNames([
                    "h-11 px-2 flex items-center cursor-pointer",
                    item.id == activeTypeKey ? style["type-active"] : "",
                    style.shadow,
                  ])}
                  onClick={() => switchType(item.id)}
                >
                  {item.name}
                </div>
              )
            );
          })}
        </div>
      </div>

      {tagList?.length && (
        <div className={classNames(["container-xs bg-[#f4f5f5] py-3"])}>
          <div className="flex">
            {tagList?.map((item, index) => (
              <div
                key={item.id}
                className={classNames([
                  "py-0.5 px-1.5 flex items-center cursor-pointer",
                  item.id == activeTagKey ? style["tag-active"] : "",
                  "bg-white",
                  "rounded-2xl",
                  "text-[#909090]",
                  index ? "ml-2" : "",
                ])}
                onClick={() => switchTag(item.id)}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
export default TypeHeader;

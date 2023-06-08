import { useState, useEffect, useRef } from "react";
import type { FC } from "react";
import { responseType as typeTreeRsponseType } from "@/request/type/type-tree-index";
import style from "../index.module.scss";
import classNames from "classnames";
import { useRecoilValue } from "recoil";
import { userDataContext } from "@/store/user-data";

type changeOptionType = { type?: string; tag?: string; follow?: true };
export type changeType = ({ type, tag }: { type?: string; tag?: string; follow?: true }) => void;
interface propsType {
  data: typeTreeRsponseType[];
  className?: string;
  change: ({ type, tag, follow }: changeOptionType) => void;
}
/** 首页顶部展示类型选择的头部组件，穿盾type-tree数组即可*/
const TypeHeader: FC<propsType> = props => {
  let { data } = props;
  let userData = useRecoilValue(userDataContext);
  const [activeTypeKey, setActiveTypeKey] = useState(data[0].id);
  const [activeTagKey, setActiveTagKey] = useState(data[0].id);
  /** 获取type和tag在数组中的位置，判断是修改了type还是tag*/
  const typeIndex = data.findIndex(item => item.id == activeTypeKey);
  const tagIndex = data[typeIndex]?.children?.findIndex(item => item.id == activeTagKey);

  const tagList = data.find(item => item.id == activeTypeKey)?.children;

  let fristLoad = useRef(true);
  useEffect(() => {
    if (fristLoad.current) {
      fristLoad.current = false;
      return;
    }
    /** 判断是否选择了全部*/
    let option: changeOptionType =
      typeIndex == 0
        ? {}
        : {
            /** 如果下属的tag的id index等于0说明找的是type，反之是tag*/
            type: !tagIndex ? activeTypeKey : undefined,
            /** 如果自己的id和上面的type的id相同那么设置undefined，否则就是查询tag*/
            tag: activeTypeKey == activeTagKey ? undefined : activeTagKey,
          };
    /** 判断是否选择了关注*/
    if (typeIndex == 1) {
      option = { follow: true };
    }
    props.change(option);
  }, [activeTypeKey, activeTagKey]);

  function switchType(id: string) {
    setActiveTypeKey(id);
    setActiveTagKey(id);
  }
  function switchTag(id: string) {
    setActiveTagKey(id);
  }

  return (
    <>
      <div
        className={classNames([
          "sm:hidden",
          style["type-header"],
          "container-xs bg-white",
          "border-slate-100 border-b-solid",
          props.className,
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
        <div className={classNames(["container-xs bg-[#f4f5f5] pb-3 pt-1"])}>
          <div className="flex flex-wrap">
            {tagList?.map((item, index) => (
              <div
                key={item.id}
                className={classNames([
                  "h-6 px-2.5 flex items-center cursor-pointer",
                  item.id == activeTagKey ? style["tag-active"] : "",
                  "bg-white",
                  "rounded-2xl",
                  "text-[#909090]",
                  "mr-2",
                  "mt-2"
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

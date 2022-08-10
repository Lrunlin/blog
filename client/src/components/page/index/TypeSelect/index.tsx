import { useState } from "react";
import type { FC } from "react";
import classNames from "classnames";

const list = [
  {
    label: "推荐",
    value: "recommend",
  },
  {
    label: "最新",
    value: "newest",
  },
  {
    label: "最热",
    value: "hottest",
  },
];

interface propsType {
  loadMoreData: (type:string) => void;
}
const TypeSelect: FC<propsType> = props => {
  const [active, setActive] = useState(list[0].value);
  function switchType(value: string) {
    setActive(value);
  }
  return (
    <>
      <div
        className={classNames([
          "bg-white",
          "h-11",
          "flex",
          "items-center",
          "border-b-solid",
          "border-slate-200",
          "text-[#909090]",
        ])}
      >
        {list.map((item, index) => (
          <div
            key={item.label + item.value}
            className={classNames([
              "px-3",
              "#909090",
              "cursor-pointer",
              active == item.value ? "text-[#007fff]" : "",
            ])}
            onClick={() => {
              // 如果ID变了就触发文章数据更新(先判断在更新)
              if (item.value != active) {
                props.loadMoreData(item.value);
              }
              switchType(item.value);
            }}
          >
            <span
              className={index == 1 ? "border-slate-200 px-4 border-l-solid border-r-solid" : ""}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};
export default TypeSelect;

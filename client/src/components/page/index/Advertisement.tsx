import { FC, useState } from "react";
import classNames from "classnames";
import { responseType as advertisementType } from "@/request/advertisement";

interface propsType {
  data: advertisementType;
}

/** 首页右侧推广*/
const Advertisement: FC<propsType> = props => {
  const [data, setData] = useState(props.data);

  return (
    <>
      {data.map((item, index) => (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer nofollow"
          key={item.id}
          className={classNames([
            "w-60",
            "relative group cursor-pointer",
            index && "mt-2",
            "block",
            "w-full",
          ])}
        >
          <img src={item.cover} alt="推广" className="w-full" />
          <span
            className="text-xl hidden group-hover:block text-slate-400 absolute right-3 top-1 z-10"
            onClick={e => {
              e.preventDefault();
              setData(_data => _data.filter(_item => item.id != _item.id));
            }}
          >
            &times;
          </span>
          <div
            className={classNames([
              "py-px",
              "px-1",
              "text-xs",
              "text-white",
              "bg-gray-800",
              "opacity-50",
              "border border-solid border-white rounded",
              "absolute right-3 bottom-1 z-10",
            ])}
          >
            <span className="group-hover:hidden">广告</span>
            <span className="hidden group-hover:block">投放广告</span>
          </div>
        </a>
      ))}
    </>
  );
};
export default Advertisement;

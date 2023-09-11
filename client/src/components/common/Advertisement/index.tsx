import { FC } from "react";
import classNames from "classnames";
import getAdvertisementList from "@/request/advertisement";
import useSWR from "swr";

interface propsType {
  type: "article" | "index";
  className?: string;
}

/** 首页右侧推广*/
const Advertisement: FC<propsType> = props => {
  let { data } = useSWR(`advertisement-${props.type}`, () => getAdvertisementList(props.type));

  return (
    <div className={props.className}>
      {data &&
        data.map((item, index) => (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            key={item.id}
            className={classNames([
              "w-60",
              "relative group cursor-pointer",
              "mb-4",
              "block",
              "w-full",
            ])}
          >
            <img src={item.poster_url} alt="推广" className="w-full" />
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
    </div>
  );
};
export default Advertisement;

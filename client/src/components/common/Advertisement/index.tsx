import { FC } from "react";
import classNames from "classnames";
import getAdvertisementList from "@/request/advertisement";

interface propsType {
  type: "article" | "index";
  className?: string;
}

/** 首页右侧推广*/
const Advertisement: FC<propsType> = async (props) => {
  let data = await getAdvertisementList(props.type);

  return (
    <div className={props.className}>
      {data.map((item) => (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer nofollow"
          key={item.id}
          className={classNames([
            "w-60",
            "relative cursor-pointer",
            "mb-4",
            "block",
            "w-full",
          ])}
          style={{
            height: `${240 / (item.image_size.width / item.image_size.height)}px`,
          }}
        >
          {/* 骨架屏 */}
          <div className="absolute left-0 top-0 h-full w-full bg-gray-50"></div>
          {/* 内容区 */}
          <img
            src={item.poster_url}
            alt="推广"
            className="absolute z-10 w-full"
          />
          <span
            className={classNames([
              "py-px",
              "px-1",
              "text-xs",
              "text-white",
              "bg-gray-800",
              "opacity-50",
              "rounded border border-solid border-white",
              "absolute bottom-1 right-3 z-20",
            ])}
          >
            广告
          </span>
        </a>
      ))}
    </div>
  );
};
export default Advertisement;

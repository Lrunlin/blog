import type { FC, ReactNode } from "react";
import Link from "next/link";
import classNames from "classnames";
import type { dataItemPropsType } from "./index";

export type childrenPropsType = {
  className?: string;
  topRight?: (id: number) => ReactNode;
};
const Item: FC<dataItemPropsType & childrenPropsType> = (props) => {
  return (
    <>
      <li
        className={classNames([
          "border-b-solid flex max-w-full list-none items-center border-slate-200 p-4 pb-3",
          props.className,
        ])}
      >
        <div
          className={classNames([
            "flex h-12 w-12 flex-col items-center rounded",
            props.answer_count
              ? props.answer_id
                ? "bg-blue-600 text-white"
                : "border border-solid border-blue-600 text-blue-600"
              : "text-gray-400",
          ])}
        >
          <div className="truncate">{props.answer_count}</div>
          <div>{props.answer_id ? "解决" : "回答"}</div>
        </div>
        <div className="ml-2 flex h-12 w-12 flex-col items-center rounded text-orange-800">
          <div className="truncate">{props.view_count}</div>
          <div>阅读</div>
        </div>
        <div className="ml-2 w-full">
          <div className="flex items-center justify-between">
            <a
              className="block max-w-2xl truncate text-gray-800"
              href={`/problem/${props.id}`}
              target="_blank"
            >
              {props.title}
            </a>
            {props.topRight && props.topRight(props.id)}
          </div>
          <div className="mt-1 flex items-center">
            {props.tag.map((tag, _index) => (
              <Link
                href={`/search?tag=${tag.name}`}
                key={`problem${props.id}${tag.name}`}
                className={classNames([
                  _index && "ml-2",
                  "px-1",
                  "text-sm",
                  "rounded",
                  "bg-blue-200",
                  "text-blue-800",
                  "cursor-pointer",
                  "hover:bg-blue-300",
                ])}
              >
                {tag.name}
              </Link>
            ))}
          </div>
        </div>
      </li>
    </>
  );
};
export default Item;

import type { FC, ReactNode } from "react";
import classNames from "classnames";
import type { dataItemPropsType } from "./index";
import Link from "next/link";

export type childrenPropsType = { className?: string; topRight?: (id: number) => ReactNode };
const Item: FC<dataItemPropsType & childrenPropsType> = props => {
  return (
    <>
      <li
        className={classNames([
          "flex items-center list-none border-slate-200 border-b-solid p-4 pb-3 max-w-full",
          props.className,
        ])}
      >
        <div
          className={classNames([
            "w-12 h-12 flex flex-col items-center rounded",
            props.answer_count
              ? "border border-solid border-blue-600 text-blue-600"
              : "text-gray-400",
          ])}
        >
          <div>{props.answer_count}</div>
          <div>回答</div>
        </div>
        <div className="w-12 h-12 ml-2 flex flex-col items-center rounded text-orange-800">
          <div>{props.view_count}</div>
          <div>阅读</div>
        </div>
        <div className="ml-2 w-full">
          <div className="flex items-center justify-between">
            <a
              className="max-w-2xl truncate block text-gray-800"
              href={`/problem/${props.id}`}
              target="_blank"
            >
              {props.title}
            </a>
            {props.topRight && props.topRight(props.id)}
          </div>
          <div className="flex items-center mt-1">
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

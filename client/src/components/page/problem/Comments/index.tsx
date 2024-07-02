"use client";

import { FC } from "react";
import type { problemCommentType } from "@type/model/problem";
import classNames from "classnames";
import Item from "./Item";

interface propsType {
  belong_id: number;
  className?: string;
  data: problemCommentType[];
  type: "problem" | "answer";
}
/** 单个答案的回复组件*/
const Comments: FC<propsType> = (props) => {
  return (
    <div
      className={classNames([
        props.data.length && "rounded bg-gray-50 p-2",
        props.className,
      ])}
    >
      {props.data.map((item) => {
        return (
          <Item
            key={item.id}
            data={item}
            list={props.data}
            belong_id={props.belong_id}
            type={props.type}
          />
        );
      })}
    </div>
  );
};
export default Comments;

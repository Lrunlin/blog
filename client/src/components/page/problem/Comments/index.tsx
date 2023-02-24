import classNames from "classnames";
import { FC } from "react";
import Item from "./Item";
import type { problemCommentType } from "@type/model/problem";

interface propsType {
  belong_id: number;
  className?: string;
  data: problemCommentType[];
  type: "problem" | "answer";
}
/** 单个答案的回复组件*/
const Comments: FC<propsType> = props => {
  return (
    <div className={classNames([props.data.length && "bg-gray-50 p-2 rounded", props.className])}>
      {props.data.map(item => {
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

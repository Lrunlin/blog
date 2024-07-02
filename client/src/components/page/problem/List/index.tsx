import type { FC } from "react";
import type { ProblemAttributes } from "@type/model-attribute";
import classNames from "classnames";
import Item from "./Item";
import type { childrenPropsType } from "./Item";

export type dataItemPropsType = Pick<
  ProblemAttributes,
  "id" | "answer_count" | "view_count" | "title" | "tag" | "answer_id"
>;
const List: FC<
  {
    data: dataItemPropsType[];
  } & childrenPropsType
> = ({ data, className, topRight }) => {
  return (
    <>
      <ul className="w-full p-0 text-base">
        {data.map((item, index) => (
          <Item
            key={item.id}
            {...item}
            className={classNames(index && "mt-3", className)}
            topRight={topRight}
          />
        ))}
      </ul>
    </>
  );
};
export default List;

import type { FC } from "react";
import type { ProblemAttributes } from "@type/model-attribute";
import Item from "./Item";
import type { childrenPropsType } from "./Item";
import classNames from "classnames";

export type dataItemPropsType = Pick<
  ProblemAttributes,
  "id" | "answer_count" | "view_count" | "title" | "tag"
>;
const List: FC<
  {
    data: dataItemPropsType[];
  } & childrenPropsType
> = ({ data, className, topRight }) => {
  return (
    <>
      <ul className="p-0 w-full text-base">
        {data.map((item, index) => (
          <Item
            key={item.id}
            {...item}
            className={classNames(index && "mt-3",className)}
            topRight={topRight}
          />
        ))}
      </ul>
    </>
  );
};
export default List;

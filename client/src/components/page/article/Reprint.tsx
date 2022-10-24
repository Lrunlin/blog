import type { FC } from "react";

interface propsType {
  /** 转载地址*/
  reprint?: string | null;
}
/** 文章底部的转载链接组件*/
const Reprint: FC<propsType> = ({ reprint }) => {
  return (
    <>
      {reprint && (
        <blockquote className="mt-20 pl-4 border-l-solid border-l-4 rounded-sm border-l-blue-600">
          转载自:{reprint}
        </blockquote>
      )}
    </>
  );
};
export default Reprint;

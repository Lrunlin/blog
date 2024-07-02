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
        <blockquote className="border-l-solid mt-20 rounded-sm border-l-4 border-l-blue-600 pl-4">
          转载自:{reprint}
        </blockquote>
      )}
    </>
  );
};
export default Reprint;

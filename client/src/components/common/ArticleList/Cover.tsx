import { FC } from "react";
import { Image } from "antd";

interface propsType {
  cover_url: string;
}

export const CoverSkeleton = () => (
  <div className="h-20 w-[120px] animate-pulse bg-gray-100"></div>
);

/** 单个的ArticleListItem的封面展示*/
const Cover: FC<propsType> = ({ cover_url }) => {
  return (
    <>
      <div className="h-20 w-[120px] overflow-hidden">
        <Image
          preview={false}
          className="h-20 w-[120px]"
          src={cover_url}
          fallback="/image/client/load-error.png"
          alt="cover"
          placeholder={<CoverSkeleton />}
        />
      </div>
    </>
  );
};
export default Cover;

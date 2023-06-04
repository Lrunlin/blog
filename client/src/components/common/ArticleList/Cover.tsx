import { FC } from "react";
import { Image } from "antd";

interface propsType {
  cover_url: string;
}

export const CoverSkeleton = () => <div className="w-[120px] h-20 bg-gray-100 animate-pulse"></div>;

/** 单个的ArticleListItem的封面展示*/
const Cover: FC<propsType> = ({ cover_url }) => {
  return (
    <>
      <div className="w-[120px] h-20 overflow-hidden">
        <Image
          preview={false}
          className="w-[120px] h-20"
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

import { FC, useEffect, useState } from "react";
import { Image } from "antd";

interface propsType {
  cover_url: string;
}

//?如果SSR的话fallback无法加载，整个图片都在CSR渲染
/** 单个的ArticleListItem的封面展示*/
const Cover: FC<propsType> = ({ cover_url }) => {
  const [isRender, setIsRender] = useState(false);
  useEffect(() => {
    setIsRender(true);
  }, []);

  return (
    <>
      {isRender && (
        <div className="w-[120px] h-20 overflow-hidden">
          <Image
            preview={false}
            className="w-[120px] h-20"
            src={cover_url}
            fallback="/image/load-error.png"
          />
        </div>
      )}
    </>
  );
};
export default Cover;

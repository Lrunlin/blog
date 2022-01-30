import { LoadingOutlined } from "@ant-design/icons";
import NoSSR from "@/utils/NoSSR";

/** 图片加载时占位*/
const ImagePlaceholder = () => {
  return (
    <>
      <style jsx>{`
        .image-placeholder {
          width: 169px;
          height: 98px;
          text-align: center;
          line-height: 98px;
          border: 1px solid #f2f2f2;
        }
      `}</style>
      <div className="image-placeholder">
        <NoSSR children={<LoadingOutlined />} />
      </div>
    </>
  );
};
export default ImagePlaceholder;

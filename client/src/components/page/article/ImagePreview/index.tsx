import { useState, useEffect } from "react";
import type { FC } from "react";
import { Image } from "antd";
import style from "./index.module.scss";

interface propsType {
  /** 根的ID属性*/
  rootID: string;
}

/** 文章页面图片预览*/
const ImagePreview: FC<propsType> = ({ rootID }) => {
  const [preview, setPreview] = useState("");
  useEffect(() => {
    let imgs = document
      .getElementById(rootID)
      ?.getElementsByTagName("img") as unknown as HTMLCollectionOf<HTMLImageElement>;
    function setPreviewSrc(e: any) {
      if (e?.target?.src) setPreview(e?.target?.src);
    }
    for (let index = 0; index < imgs.length; index++) {
      const element = imgs[index];
      element.addEventListener("click", setPreviewSrc);
    }

    return () => {
      for (let index = 0; index < imgs.length; index++) {
        const element = imgs[index];
        element.removeEventListener("click", setPreviewSrc);
      }
    };
  }, []);
  return (
    <>
      <div className={style["preview"]} id="preview">
        <Image
          width={0}
          style={{ display: "none" }}
          src={preview}
          alt="预览图"
          preview={{
            mask: false,
            getContainer: "#preview",
            onVisibleChange: visible => {
              if (visible == false) setPreview("");
            },
            visible: !!preview,
          }}
        />
      </div>
    </>
  );
};
export default ImagePreview;

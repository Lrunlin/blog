"use client";

import { memo, useEffect, useState } from "react";
import { Image } from "antd";
import style from "./index.module.scss";

/** 文章页面图片预览*/
const ImagePreview = memo(() => {
  const [preview, setPreview] = useState(null as string | null);
  useEffect(() => {
    let imgs = document.querySelectorAll(
      `.content-body img`,
    ) as unknown as HTMLCollectionOf<HTMLImageElement>;

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
          src={preview as string}
          alt="预览图"
          preview={{
            mask: false,
            getContainer: "#preview",
            onVisibleChange: (visible) => {
              if (visible == false) setPreview(null);
            },
            visible: !!preview,
          }}
        />
      </div>
    </>
  );
});
export default ImagePreview;

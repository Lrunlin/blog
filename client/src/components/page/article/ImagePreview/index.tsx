import { useState, useEffect } from "react";
import { Image } from "antd";
import style from "./index.module.scss";


/** 文章页面图片预览*/
const ImagePreview = () => {
  const [preview, setPreview] = useState("");
  useEffect(() => {
    let imgs = document.querySelectorAll(
      `.content-body img`
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
  useEffect(() => {
    let imgs = document.querySelectorAll(
      `.content-body img`
    ) as unknown as HTMLCollectionOf<HTMLImageElement>;

    function imageLazyLoad() {
      function getTop(e: HTMLElement) {
        var T = e.offsetTop;
        while (((e as any) = e.offsetParent)) {
          T += e.offsetTop;
        }
        return T;
      }
      var H = document.documentElement.clientHeight;
      var S = document.documentElement.scrollTop || document.body.scrollTop;
      for (var i = 0; i < imgs.length; i++) {
        if (H + S > getTop(imgs[i]) && !imgs[i].src) {
          imgs[i].src = imgs[i].getAttribute("data-src") + "";
        }
      }
    }
    imageLazyLoad();
    window.addEventListener("scroll", imageLazyLoad);
    return () => {
      window.removeEventListener("scroll", imageLazyLoad);
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

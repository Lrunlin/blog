import { useState, useEffect } from "react";
import type { FC } from "react";
import { Image } from "antd";
import axios from "axios";
import Script from "next/script";
import style from "@/styles/article.module.scss";

interface prposType {
  content: string;
  language: string[] | null;
}
/** 文章页面主题内容显示*/
const View: FC<prposType> = props => {
  const [preview, setPreview] = useState("");
  useEffect(() => {
    let imgs = document
      .getElementById("view")
      ?.getElementsByTagName("img") as unknown as HTMLCollectionOf<HTMLImageElement>;
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
    function setPreviewSrc(e: any) {
      if (e?.target?.src) setPreview(e?.target?.src);
    }
    for (let index = 0; index < imgs.length; index++) {
      const element = imgs[index];
      element.addEventListener("click", setPreviewSrc);
    }

    return () => {
      window.removeEventListener("scroll", imageLazyLoad);
      for (let index = 0; index < imgs.length; index++) {
        const element = imgs[index];
        element.removeEventListener("click", setPreviewSrc);
      }
    };
  }, []);
  return (
    <>
      {props.language && (
        <>
          <link
            rel="stylesheet"
            href={`${axios.defaults.baseURL}/high-light/css?languages=${props.language?.join(",")}`}
          />
          <Script
            strategy="afterInteractive"
            src={`${axios.defaults.baseURL}/high-light/js?languages=${props.language?.join(",")}`}
          />
        </>
      )}
      <div
        id="view"
        className={style.article}
        dangerouslySetInnerHTML={{ __html: props.content }}
      ></div>
      {preview && (
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
      )}
    </>
  );
};
export default View;

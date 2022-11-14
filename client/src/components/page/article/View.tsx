import { useEffect } from "react";
import type { FC } from "react";
import axios from "axios";
import Script from "next/script";
import style from "@/styles/article.module.scss";
import dynamic from "next/dynamic";
const ImagePreview = dynamic(() => import("@/components/page/article/ImagePreview"), {
  ssr: false,
});

interface prposType {
  content: string;
  language: string[] | null;
}
/** 文章页面主题内容显示*/
const View: FC<prposType> = props => {
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
    return () => {
      window.removeEventListener("scroll", imageLazyLoad);
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
      <style jsx global>
        {`
          .toolbar-item {
            margin-right: 6px;
          }
          .toolbar-item > a,
          .toolbar-item > button,
          .toolbar-item > span {
            border: 1px solid #bbb !important;
            border-radius: 3px !important;
            cursor: pointer;
          }
        `}
      </style>
      <div
        id="view"
        className={style.article}
        dangerouslySetInnerHTML={{ __html: props.content }}
      ></div>
      <ImagePreview rootID="view" />
    </>
  );
};
export default View;

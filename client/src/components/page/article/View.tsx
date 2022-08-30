import { useState, useEffect } from "react";
import type { FC } from "react";
import axios from "axios";
import Script from "next/script";

interface prposType {
  content: string;
  language: string[] | null;
}
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
      <link
        rel="stylesheet"
        href={`${axios.defaults.baseURL}/high-light/css?languages=${props.language?.join(",")}`}
      />
      <Script
        strategy="afterInteractive"
        src={`${axios.defaults.baseURL}/high-light/js?languages=${props.language?.join(",")}`}
      />
      <div id="view" dangerouslySetInnerHTML={{ __html: props.content }}></div>
    </>
  );
};
export default View;

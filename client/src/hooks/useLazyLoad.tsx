import { useEffect } from "react";

/**
 * todo 图片懒加载
 * @params name {string} querySelectorAll中填写的属性
 */
const useLazyLoad = (name: string) => {
  useEffect(() => {
    let imgs = document.querySelectorAll(name) as unknown as HTMLCollectionOf<HTMLImageElement>;
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
};
export default useLazyLoad;

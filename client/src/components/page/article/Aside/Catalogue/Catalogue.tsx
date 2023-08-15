import { useState, useEffect } from "react";
import tocbot from "tocbot";
import { Divider } from "antd";
import style from "./index.module.scss";
import classNames from "classnames";

const Catalogue = () => {
  useEffect(() => {
    tocbot.init({
      tocSelector: `.${style["article-page-catalogue"]}`,
      headingSelector: "h1,h2,h3,h4,h5,h6",
      contentSelector: ".content-body",
      activeLinkClass: style["is-active-link"],
      collapsibleClass: style["is-collapsible"],
    });
    tocbot.refresh();
    return () => {
      tocbot.destroy();
    };
  }, []);

  let [isShrink, setIsShrink] = useState(false);
  useEffect(() => {
    const scrollSwitch = () => {
      let scrollY = document.documentElement.scrollTop || document.body.scrollTop;
      // 大于600缩回，小于540伸出
      if (scrollY > 600 && !isShrink) {
        setIsShrink(true);
      }
      if (scrollY < 540 && isShrink) {
        setIsShrink(false);
      }
    };
    window.addEventListener("scroll", scrollSwitch);
    return () => {
      window.removeEventListener("scroll", scrollSwitch);
    };
  }, [isShrink]);

  return (
    <div
      className={classNames([
        "bg-white shadow-sm sticky mt-2 duration-200",
        isShrink ? "top-2" : "top-14",
      ])}
    >
      <div className="text-lg p-4 pb-0">
        <div>目录</div>
        <Divider className="my-2" />
      </div>
      <div className={classNames([style["article-page-catalogue"], "pb-2"])}></div>
    </div>
  );
};
export default Catalogue;

import { useEffect, useState } from "react";
import { Divider } from "antd";
import classNames from "classnames";
import tocbot from "tocbot";
import style from "./index.module.scss";

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
      let scrollY =
        document.documentElement.scrollTop || document.body.scrollTop;
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
        "sticky mt-2 bg-white shadow-sm duration-200",
        isShrink ? "top-2" : "top-14",
      ])}
    >
      <div className="p-4 pb-0 text-lg">
        <div>目录</div>
        <Divider className="my-2" />
      </div>
      <div
        className={classNames([style["article-page-catalogue"], "pb-2"])}
      ></div>
    </div>
  );
};
export default Catalogue;

import { Image } from "antd";
import { useEffect, useState } from "react";
/**
 * 文章页面的图片预览组件
 */
function Preview() {
  const [src, setSrc] = useState<string>("");
  useEffect(() => {
    let imgs = document.querySelectorAll("article img");
    imgs.forEach(item => {
      item.addEventListener("click", e =>
        setSrc((e.target as HTMLElement).getAttribute("src") + "")
      );
    });
    return () => {
      imgs.forEach(item => {
        item.removeEventListener("click", setSrc as unknown as EventListener);
      });
    };
  }, []);

  return (
    <Image
      style={{ display: "none" }}
      src={src}
      preview={{
        visible: !!src,
        src: src,
        onVisibleChange: visible => {
          if (!visible) {
            setSrc("");
          }
        },
      }}
    />
  );
}
export default Preview;

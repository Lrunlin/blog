import { useState, useEffect, Fragment } from "react";
/*
 todo 在SSR中SVG会被转成<svg/>代码传输量太大，让他客户端渲染
 !会对文字提示有影响Tooltip中使用一个span包裹本组件
*/
interface props {
  icon?: JSX.Element;
  children?: JSX.Element;
}
function Icon(props: props) {
  const [lock, setLock] = useState<boolean>(false);
  useEffect(() => {
    setLock(true);
  }, []);
  const Dom = (): JSX.Element => {
    return <span>{props.icon || props.children}</span>;
  };
  return lock && <Dom />;
}
export default Icon;

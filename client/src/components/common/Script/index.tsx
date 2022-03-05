import { useState, useEffect, memo } from "react";
import type { FunctionComponent } from "react";
import Script from "next/script";
import axios from "axios";

let url = axios.defaults.baseURL;
interface propsType {
  /** 文章ID用于区别缓存*/
  id: string | number;
  /** 文章类型用于统计类型浏览量*/
  type?: string;
}
/**
 * 在页面加载完毕时创建一个js统计访问量，打印log
 */
let MemoScript: FunctionComponent<propsType> = memo(props => {
  const [isLoad, setIsLoad] = useState(false);
  useEffect(() => {
    setIsLoad(true);
  }, []);
  let paramsType = props.type ? `&type=${props.type}` : "";
  return (
    <>
      {isLoad && (
        <Script
          src={`${url}/statistics?id=${props.id}${paramsType}&referrer=${document.referrer}`}
          strategy="lazyOnload"
        />
      )}
    </>
  );
});
export default MemoScript;

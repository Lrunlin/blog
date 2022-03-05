import { useEffect, memo } from "react";
import type { FunctionComponent } from "react";
import axios from "axios";

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
  useEffect(() => {
    let params = {
      id: props.id,
      referrer: document.referrer,
      type: props.type,
    };
    axios.get<string>("/statistics", { params: params }).then(res => {
      //不要直接打印，生产环境会被babel去掉
      if (!document.getElementById("consoleScript")) {
        let script = document.createElement("script");
        script.id = "consoleScript";
        script.innerHTML = res.data;
        document.head.append(script);
      }
    });
  }, []);
  return <></>;
});
export default MemoScript;

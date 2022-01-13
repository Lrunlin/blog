import { useEffect } from "react";
import type { FunctionComponent } from "react";

/**
 * todo 创建一个script标签引入外部JS文件
 * @params src {string} 文件绝对路径
 * @params watch {any} 依赖项-根据某个依赖创建
 * @return id {string} ID-script的ID属性
 */
const useScript = (src: string, watch?: any) => {
  let id = "use" + Math.random().toString(32).substring(3, 7) + "script";
  useEffect(
    () => {
      let script = document.createElement("script");
      script.id = id;
      script.src = src;
      document.head.append(script);
    },
    watch ? [watch] : []
  );
};
export default useScript;

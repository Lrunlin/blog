import { useEffect } from "react";

/**
 * todo 创建一个script标签引入外部JS文件
 * @params src {string} 文件绝对路径
 */
const useScript = (src: string) => {
  let id = "use" + Math.random().toString(32).substring(3, 7) + "script";
  useEffect(() => {
    let script = document.createElement("script");
    script.id = id;
    script.src = src;
    setTimeout(() => {
      document.head.append(script);
    }, 0);
    return () => {
      (document.getElementById(id) as HTMLElement).remove();
    };
  }, []);
};
export default useScript;

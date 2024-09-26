import * as OS from "os";
import * as path from "path";
import { pathToFileURL } from "url";

let pathMap: { [key: string]: string[] } = {};

function getFilePath(
  key: string,
  pathSegments: string[],
  getPath: () => string[],
) {
  // 根据当前操作系统生成正确的文件路径
  const resolvePath = (item: string) => {
    // 动态拼接路径
    const fullPath = path.join(...pathSegments, item);

    return process.env.ENV === "development"
      ? pathToFileURL(fullPath).href
      : fullPath;
  };

  // 检查当前环境是否为开发环境
  if (process.env.ENV === "development") {
    // 每次都生成最新的路径数组
    const paths = getPath().map(resolvePath);
    return paths;
  } else {
    // 在生产环境中，缓存路径数组
    if (!pathMap[key]) {
      const paths = getPath().map(resolvePath);
      pathMap[key] = paths;
    }
    // 返回缓存的路径数组
    return pathMap[key];
  }
}

export default getFilePath;

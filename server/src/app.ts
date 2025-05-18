import moduleAlias from "module-alias";
import { kill } from "cross-port-killer";
import dotenv from "dotenv";
import moment from "moment";
import path from "path";

export const port = 3000;

kill(port).catch((err) => {
  console.log("端口关闭错误:", err);
});
dotenv.config({
  path: path.join(
    __dirname,
    process.env.ENV == "development" ? "../env/.env.development" : `../.env`,
  ), // 配置文件路径
});

const originalConsoleLog = console.log;

console.log = function () {
  const stackTrace = new Error().stack as string;
  let position = stackTrace
    .split("\n")[2]
    .trim()
    .replace("at Server.<anonymous>", ""); // 提取第三行的代码位置

  const innerContentRegex = /\((.*?)\)/;
  const innerContentMatch = position.match(innerContentRegex);
  if (innerContentMatch) {
    // 获取括号中的 地址:行号
    const addressAndNumbersRegex = /([^:]+):(\d+):(\d+)/;
    const addressAndNumbersMatch = innerContentMatch[1].match(
      addressAndNumbersRegex,
    );

    if (addressAndNumbersMatch) {
      // 分离出行号和地址
      const num1 = addressAndNumbersMatch[2];
      const num2 = addressAndNumbersMatch[3];

      // 简化地址
      let relativePath = path.relative(
        process.cwd(),
        innerContentMatch[1].replace(`:${num1}:${num2}`, ""),
      );

      const lastDirName = path.basename(process.cwd());

      // 计算出简化最后的地址后重新添加行号
      position = path.join(lastDirName, relativePath) + `:${num1}:${num2}`;
    }
  }
  originalConsoleLog(`${moment().format("HH:mm:ss")} ${position}`);
  originalConsoleLog.apply(console, arguments as any);
};

moduleAlias.addAlias("@", __dirname);

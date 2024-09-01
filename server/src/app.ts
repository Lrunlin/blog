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
  const position = stackTrace.split("\n")[2].trim(); // 提取第三行的代码位置
  originalConsoleLog(
    `${moment().format("YYYY-MM-DD HH:mm:ss")}  ${position.replace("at Server.<anonymous>", "")}`,
  );
  originalConsoleLog.apply(console, arguments as any);
};

moduleAlias.addAlias("@", __dirname);

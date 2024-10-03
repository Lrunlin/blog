import { execSync } from "child_process";
import * as os from "os";

const processName = "blog-server"; // 替换为你的进程名称

try {
  // 根据操作系统选择命令
  const command =
    os.platform() === "win32"
      ? `pm2 list | findstr "${processName}"`
      : `pm2 list | grep "${processName}"`;

  // 执行命令并获取输出
  const stdout = execSync(command).toString();

  // 检查输出是否包含进程名称
  if (stdout) {
    // 执行 pm2 关闭
    execSync("pm2 stop blog-server");
    execSync("pm2 delete blog-server");
  } else {
  }
} catch (error) {
  console.error(`Error: ${(error as Error).message}`);
}

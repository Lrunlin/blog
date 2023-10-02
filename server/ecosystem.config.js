const fs = require("fs");
const path = require("path");

const logDirectory = path.join(__dirname, "log");

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

module.exports = {
  apps: [
    {
      name: "blog-server",
      args: process.env.npm_lifecycle_event == "start:debug" ? "--inspect=0.0.0.0:9229" : undefined,
      script: "./src/index.js",
      exec_mode: "cluster",
      instances: 2,
      max_memory_restart: "600M",
      listen_timeout: 3000,
      min_uptime: "60s",
      max_restarts: 0,
      error_file: path.join(logDirectory, "error.log"), // 错误日志文件
      out_file: path.join(logDirectory, "out.log"), // 标准输出日志文件
      // log_date_format: "YYYY-MM-DD HH:mm:ss", // 设置日志时间戳格式
      env: {
        ENV: "production",
      },
    },
  ],
};

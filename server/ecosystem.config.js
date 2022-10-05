const isDev = process.env.ENV == "development";

module.exports = {
  apps: {
    name: "blog_server", // 项目名
    script: "./scripts/dev/index.ts", // 执行文件
    interpreter: "./node_modules/.bin/ts-node", //使用ts-node启动
    cwd: "./", // 根目录
    watch: ["src"], // 是否监听文件变动然后重启
    watch_delay: 2000,
    exec_mode: "cluster_mode", // 应用启动模式，支持fork和cluster模式
    instances: isDev ? 1 : 1, // 应用启动实例个数，仅在cluster模式有效 默认为fork；或者 max
    max_memory_restart: "800M", // 最大内存限制数，超出自动重启
    min_uptime: isDev ? undefined : "60s", // 应用运行少于时间被认为是异常启动
    max_restarts: 10, // 最大异常重启次数，即小于min_uptime运行时间重启次数；
    autorestart: true, // 默认为true, 发生异常的情况下自动重启
    restart_delay: 10, // 异常重启情况下，延时重启时间
  },
};

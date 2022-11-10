import redis from "ioredis";

const env = require(`${process.cwd()}/env/index.js`);

/**
 * 创建Redis链接
 * @params db {1|2} 连接的数据库
 */
const Redis = (db: 1 | 2) => {
  return new redis({
    host: env.REDIS_HOST || "127.0.0.1",
    port: env.REDIS_PORT ? +env.REDIS_PORT : 6379,
    password: env.REDIS_PASSWORD,
    db: db,
    username: env.REDIS_USER,
    retryStrategy: function (times) {
      return Math.min(times * 50, 5000);
    },
  });
};
export default Redis;

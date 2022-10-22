const redis = require("ioredis");
const env = require("../env");
/**
 * 创建Redis链接
 * @params db {0|1} 连接的数据库
 */
const Redis = db => {
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
module.exports = Redis;

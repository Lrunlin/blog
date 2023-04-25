import redis from "ioredis";


/**
 * 创建Redis链接
 */
const Redis = () => {
  return new redis({
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: process.env.REDIS_PORT ? +process.env.REDIS_PORT : 6379,
    password: process.env.REDIS_PASSWORD,
    db: 0,
    username: process.env.REDIS_USER,
    retryStrategy: function (times) {
      return Math.min(times * 50, 5000);
    },
  });
};
export default Redis;

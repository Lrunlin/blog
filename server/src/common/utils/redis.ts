import ioredis from "ioredis";

const redis = new ioredis({
  host: process.env.DB_REDIS_HOST || "127.0.0.1",
  port: process.env.DB_REDIS_PORT ? +process.env.DB_REDIS_PORT : 6379,
  password: process.env.DB_REDIS_PASSWORD,
  db: 0,
  // username: process.env.DB_REDIS_USER,
  retryStrategy: function (times) {
    return Math.min(times * 50, 5000);
  },
});
export default redis;

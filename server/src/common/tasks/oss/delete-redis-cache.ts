import redis from "@/common/utils/redis";

/** 删除OSS模块中缓存的状态*/
async function deleteRedisCache() {
  await redis.del(["oss-key-code", "oss-key-delete_code", "oss-key-last_time", "oss-key-list"]);
}

export default () => {
  deleteRedisCache();
};

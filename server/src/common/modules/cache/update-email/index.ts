import LRU from "lru-cache";
import sha1 from "sha1";

/** 将需要修改邮箱的数据存储至内存15分钟*/
export const cache = new LRU({
  max: 99999,
  ttl: 900_000,
});

/** 根据邮箱来生成key*/
export function createKey(id: number) {
  return sha1(id + process.env.KEY + process.env.EMAIL_KEY + process.env.EMAIL_USER);
}

/** 将Key和新邮箱保存在内存中*/
export function setUserEmail(id: number, email: string) {
  cache.set(createKey(id), { id, email });
}
/** 将key从内存中删除（基本用于修改成功）*/
export function removeUserData(id: number) {
  cache.delete(createKey(id));
}
/** 判断是否有用户信息*/
export function getUserEmail(key: string) {
  return cache.get(key);
}
/** 根据邮箱查询剩余的毫秒数*/
export function getRemainingTTL(id: number) {
  return cache.getRemainingTTL(createKey(id));
}

import LRU from "lru-cache";
import sha1 from "sha1";

/** 将需要注册的用户信息存储至内存15分钟*/
export const cache = new LRU({
  max: 99999,
  ttl: 900_000,
});
interface setUserDataType {
  email: string;
  name: string;
  password: string;
}
/** 根据邮箱来生成key*/
export function createKey(email: string) {
  return sha1(email + process.env.KEY + process.env.EMAIL_KEY + process.env.EMAIL_USER);
}

/** 检测内存中是否有key*/
export function hasKey(email: string) {
  return cache.has(createKey(email));
}

/** 将注册的用户信息存储到内存15分钟*/
export function setUserData(userData: setUserDataType) {
  cache.set(createKey(userData.email), userData);
}
/** 将key从内存中删除（基本用于注册成功）*/
export function removeUserData(email: string) {
  cache.delete(createKey(email));
}
/** 判断是否有用户信息*/
export function getUserData(email: string) {
  return cache.get(createKey(email));
}
/** 根据邮箱查询剩余的毫秒数*/
export function getRemainingTTL(email: string) {
  return cache.getRemainingTTL(createKey(email));
}

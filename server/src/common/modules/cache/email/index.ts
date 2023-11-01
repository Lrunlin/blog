import sha1 from "sha1";
import redis from "@/common/utils/redis";

/** 在模块set和get时对redis的key添加前缀*/
function setPrefix(key: string) {
  return `email-${key}`;
}

/** 根据邮箱来生成key*/
export function createKey(email: string) {
  return sha1(email + process.env.KEY + process.env.EMAIL_KEY + process.env.EMAIL_USER);
}

/** 将key从内存中删除*/
export function removeKey(key: string) {
  redis.del(setPrefix(key));
}

/** 判断是否有对应的key*/
export function hasKey(key: string) {
  return redis.exists(setPrefix(key));
}

/** 根据email查询剩余的秒数*/
export function getRemainingTTL(email: string) {
  return redis.ttl(setPrefix(createKey(email)));
}

interface setUserDataType {
  email: string;
  name: string;
  password: string;
}
/** 将注册的用户信息存储到内存15分钟*/
export function setUserData(userData: setUserDataType) {
  redis.set(setPrefix(createKey(userData.email)), JSON.stringify(userData), "EX", 900);
}

interface userDataType {
  email: string;
  password: string;
  name: string;
}
/** 通过key或取用户信息*/
export async function getUserData(key: string) {
  let data = await redis.get(setPrefix(key));
  return (data ? JSON.parse(data) : null) as userDataType | null;
}

/** 将生成key，保存新邮箱*/
export function setUserEmail(email: string, newEmail: string) {
  redis.set(setPrefix(createKey(email)), JSON.stringify({ newEmail, email }), "EX", 900);
}

/** 根据key用户用户要修改的新邮箱*/
export async function getUserEmail(key: string) {
  let data = (await redis.get(setPrefix(key))) as string | null;
  return data ? (JSON.parse(data) as { email: string; newEmail: string }) : null;
}

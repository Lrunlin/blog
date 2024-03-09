import redis from "@/common/utils/redis";
import _id from "@/common/utils/id";
import sha1 from "sha1";

interface decodeType {
  id: number;
  auth: number;
  [key: string]: any;
}

// 生成session_id的前半部分
export function setSessionId(id: decodeType["id"]) {
  return `${id}_${sha1((process.env.KEY as string) + id)}`;
}

async function signSession(decode: decodeType) {
  let session_id = setSessionId(decode.id) + `_${_id()}`;
  await redis.set(session_id, JSON.stringify(decode), "EX", 365 * 24 * 60 * 60);

  return session_id;
}
export default signSession;

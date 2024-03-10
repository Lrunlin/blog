import redis from "@/common/utils/redis";
import { v4 } from "uuid";
interface decodeType {
  id: number;
  auth: number;
  [key: string]: any;
}

async function signSession(decode: decodeType) {
  let session_id = decode.id + `_${v4().replace(/-/g, "")}`;
  await redis.set(session_id, JSON.stringify(decode), "EX", 365 * 24 * 60 * 60);

  return session_id;
}
export default signSession;

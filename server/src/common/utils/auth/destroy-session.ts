import redis from "@/common/utils/redis";
import { setSessionId } from "./sign-session";

async function removeSession(id: number) {
  let retult = true;
  try {
    let session_id = setSessionId(id);

    let keys = await redis.keys(`${session_id}*`);

    await redis.del(keys);
  } catch (error) {
    retult = false;
  }
  return retult;
}
export default removeSession;

import redis from "@/common/utils/redis";

async function removeSession(id: number) {
  let retult = true;
  if (process.env.AUTH == "session") {
    try {

      let keys = await redis.keys(`${id}_*`);

      await redis.del(keys);
    } catch (error) {
      retult = false;
    }
  }
  return retult;
}
export default removeSession;

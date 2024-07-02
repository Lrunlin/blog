import redis from "@/common/utils/redis";

interface decodeType {
  [key: string]: any;
}

async function verifySession(session_id: string) {
  let decode = await redis
    .get(session_id)
    .then((res) => (res ? JSON.parse(res) : null))
    .catch(() => null);

  return new Promise<decodeType>((resolve, reject) => {
    if (decode) {
      resolve(decode);
    } else {
      reject();
    }
  });
}
export default verifySession;

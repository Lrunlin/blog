import DB from "@/db";
import axios from "axios";
import redis from "@/common/utils/redis";

async function friendlyLinkResponsTime() {
  let data: { [key: string]: any } = {};

  let rows = await DB.FriendlyLink.findAll({
    where: { state: 1 },
    raw: true,
    attributes: ["id", "url"],
  });

  let catchData = JSON.parse(
    (await redis.get("friendly-link-response-time")) || "{}",
  );
  for (let item of rows) {
    let startTime = +new Date();
    await axios
      .get(item.url, { timeout: 9000 })
      .then(() => {
        data[item.id] = { response_time: +new Date() - startTime };
      })
      .catch(() => {
        let num =
          (catchData[item.id]?.response_error as number | undefined) || 0;
        data[item.id] = { response_error: ++num };
      });
  }

  await redis.set(
    "friendly-link-response-time",
    JSON.stringify(data),
    "EX",
    7_200_000,
  );
}
export default async () => {
  if (!(await redis.get("friendly-link-response-time"))) {
    friendlyLinkResponsTime();
  }
  setInterval(async () => {
    friendlyLinkResponsTime();
  }, 3_600_000);
};

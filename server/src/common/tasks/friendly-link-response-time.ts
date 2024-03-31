import redis from "@/common/utils/redis";
import DB from "@/db";
import axios from "axios";

async function friendlyLinkResponsTime() {
  let data: { [key: string]: any } = {};

  let rows = await DB.FriendlyLink.findAll({
    where: { state: 1 },
    raw: true,
    attributes: ["id", "url"],
  });

  for (let item of rows) {
    let startTime = +new Date();
    await axios
      .get(item.url, { timeout: 9000 })
      .then(() => {
        data[item.id] = { response_time: +new Date() - startTime };
      })
      .catch(() => {
        data[item.id] = { response_error: true };
      });
  }

  await redis.set("friendly-link-response-time", JSON.stringify(data), "EX", 7_200_000);
}
export default async () => {
  if (!(await redis.get("friendly-link-response-time"))) {
    friendlyLinkResponsTime();
  }
  setInterval(async () => {
    friendlyLinkResponsTime();
  }, 3_600_000);
};

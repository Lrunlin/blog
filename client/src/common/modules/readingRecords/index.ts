import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import dayjs from "@dayjs";
import redis from "./redis";
import setReferer from "./setReferer";
import setSpider from "./setSpider";

/**
 * 获取用户端请求IP
 * @params req {Request} express的req
 * @return ip {string} IP地址
 */
function getClientIp(header: ReadonlyHeaders) {
  let ip = header.get("x-forwarded-for") || "127.0.0.1";
  if (!ip) {
    return false;
  }
  return ip.split(",").length
    ? ip
        .split(",")[0]
        .replaceAll(".", "")
        .replaceAll(":", "")
        .replaceAll(" ", "")
    : false;
}

/**
 * 保存阅读记录
 */
async function readingRecords(
  header: ReadonlyHeaders,
  id: string | number,
  type: "article" | "problem",
) {
  if (typeof window != "undefined") {
    return;
  }
  let ip = getClientIp(header);

  let referer = header.get("referer");

  if (
    ip &&
    !(await redis.exists([
      `history-${type}-${ip}-${id}`,
      `history-${type}-${ip}-${id}-unentered`,
    ]))
  ) {
    let ua = header.get("user-agent");
    let spiderResult = setSpider(ua!);

    if (spiderResult) {
      redis.rpush(
        `history-${type}-${ip}-${id}-unentered`,
        dayjs().format("YYYY-MM-DD"),
        spiderResult,
      );
      redis.expire(`history-${type}-${ip}-${id}-unentered`, 604_800);
      return;
    }

    let refererResult = setReferer(referer!);
    redis.rpush(
      `history-${type}-${ip}-${id}-unentered`,
      dayjs().format("YYYY-MM-DD"),
      refererResult,
    );
    redis.expire(`history-${type}-${ip}-${id}-unentered`, 604_800);
  }
}
export default readingRecords;

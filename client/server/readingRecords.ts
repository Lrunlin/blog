import type { Request } from "express";
import redis from "./redis";
import dayjs from "dayjs";
import setReferer from "./setReferer";
let Redis = redis();
/**
 * 获取用户端请求IP
 * @params req {Request} express的req
 * @return ip {string} IP地址
 */
function getClientIp(req: Request) {
  let ip = (req?.headers["x-forwarded-for"] || req?.socket.remoteAddress) as string;
  if (!ip) {
    return false;
  }
  return ip.split(",").length
    ? ip.split(",")[0].replaceAll(".", "").replaceAll(":", "").replaceAll(" ", "")
    : false;
}

/**
 * 保存阅读记录
 */
async function readingRecords(req: Request) {
  const id = req.params.id;

  let ip = getClientIp(req);

  let referer = req.headers.referer;

  let type = req.path.split("/")[1]; //article、problem
  if (
    ip &&
    !(await Redis.exists([`history-${type}-${ip}-${id}-unentered`, `history-${type}-${ip}-${id}`]))
  ) {
    let { label: referer_label, color: referer_color } = setReferer(referer);

    Redis.set(
      `history-${type}-${ip}-${id}-unentered`,
      JSON.stringify({
        time: dayjs().format("YYYY-MM-DD"),
        referer_label,
        referer_color,
      }),
      "EX",
      604_800
    );
  }
}
module.exports = readingRecords;

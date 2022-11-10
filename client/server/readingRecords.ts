import type { Request } from "express";
import Redis from "./redis";
import dayjs from "dayjs";
import setReferer from "./setReferer";
let RedisViewHisTory = Redis(2);
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
  // 如果id可以转为NaN说明id不是数字
  if (isNaN(+id)) {
    return;
  }
  let ip = getClientIp(req);

  let referer = req.headers.referer;
  if (
    ip &&
    !(await RedisViewHisTory.exists(`${ip}#${id}`)) &&
    !(await RedisViewHisTory.exists(`!${ip}#${id}`))
  ) {
    let { label: referer_label, color: referer_color } = setReferer(referer);

    RedisViewHisTory.set(
      `!${ip}#${id}`,
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

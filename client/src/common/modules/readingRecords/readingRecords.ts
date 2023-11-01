import redis from "./redis";
import dayjs from "dayjs";
import setReferer from "./setReferer";
import setSpider from "./setSpider";
import type { GetServerSidePropsContext } from "next";

/**
 * 获取用户端请求IP
 * @params req {Request} express的req
 * @return ip {string} IP地址
 */
function getClientIp(ctx: GetServerSidePropsContext) {
  let ip = (ctx.req?.headers["x-forwarded-for"] || ctx.req?.socket.remoteAddress) as string;
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
async function readingRecords(ctx: GetServerSidePropsContext) {
  const id = ctx!.params!.id;
  let ip = getClientIp(ctx);

  let referer = ctx.req.headers.referer;

  let type = ctx?.req?.url?.split("/")[1]; //article、problem

  if (
    ip &&
    !(await redis.exists([`history-${type}-${ip}-${id}`, `history-${type}-${ip}-${id}-unentered`]))
  ) {
    let ua = ctx.req.headers["user-agent"];
    let spiderResult = setSpider(ua);

    if (spiderResult) {
      redis.rpush(
        `history-${type}-${ip}-${id}-unentered`,
        dayjs().format("YYYY-MM-DD"),
        spiderResult
      );
      redis.expire(`history-${type}-${ip}-${id}-unentered`, 604_800);
      return;
    }

    let refererResult = setReferer(referer);
    redis.rpush(
      `history-${type}-${ip}-${id}-unentered`,
      dayjs().format("YYYY-MM-DD"),
      refererResult
    );
    redis.expire(`history-${type}-${ip}-${id}-unentered`, 604_800);
  }
}
export default readingRecords;

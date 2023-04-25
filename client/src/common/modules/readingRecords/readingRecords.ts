import redis from "./redis";
import dayjs from "dayjs";
import setReferer from "./setReferer";
import type { GetServerSidePropsContext } from "next";

let Redis = redis();
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
  const id = ctx?.params?.id;
  let ip = getClientIp(ctx);

  let referer = ctx.req.headers.referer;

  let type = ctx?.req?.url?.split("/")[1]; //article、problem
  
  if (
    ip &&
    !(await Redis.exists([`history-${type}-${ip}-${id}`]))
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
export default readingRecords;

const Redis = require("./redis");
const setReferer = require("./setReferer");
let RedisViewHisTory = Redis(2);
/**
 * 获取用户端请求IP
 * @params req {Request} express的req
 * @return ip {string} IP地址
 */
function getClientIp(req) {
  return (
    req?.headers["x-forwarded-for"] ||
    req?.connection.remoteAddress ||
    req?.socket.remoteAddress ||
    req?.connection.socket.remoteAddress
  );
}
/**
 * 保存阅读记录
 * @params req {Request} express的req
 */
async function readingRecords(req) {
  if (!req.url.startsWith("/article/")) {
    return;
  }
  const key = req.url.replace("/article/", "");

  // 如果key可以转为NaN说民key不是数字
  if (isNaN(+key)) {
    return;
  }
  let ip = getClientIp(req).split(",")[0];
  let referer = req.headers.referer;
  if (
    ip &&
    !(await RedisViewHisTory.exists(`${ip}--${key}--*`)) &&
    !(await RedisViewHisTory.exists(`u--${ip}--${key}--*`))
  ) {
    RedisViewHisTory.set(
      `u--${ip}--${key}`,
      referer ? setReferer(referer) : '',
      "EX",
      604_800
    );
  }
}
module.exports = readingRecords;

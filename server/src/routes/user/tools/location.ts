import { Context } from "koa";
import Router from "@koa/router";
import auth from "@/common/middleware/auth";
import axios from "axios";
function getClientIP(req: Context["IncomingMessage"]) {
  let ip =
    req.headers["x-forwarded-for"] || // 判断是否有反向代理 IP
    req.ip ||
    req.connection.remoteAddress || // 判断 connection 的远程 IP
    req.socket.remoteAddress || // 判断后端的 socket 的 IP
    req.connection.socket.remoteAddress ||
    "";
  if (ip) {
    ip = ip.replace("::ffff:", "");
  }
  return ip;
}
let router = new Router();
router.get("/location", auth(0), async ctx => {
  await axios
    .get("https://api.map.baidu.com/location/ip", {
      params: { coor: "bd09ll", ak: process.env.BAIDU_MAP_AK, ip: getClientIP(ctx.req) },
    })
    .then(res => {
      let {
        content: { address_detail },
      } = res.data;
      let address = address_detail.city || address_detail.province;
      ctx.body = { success: true, message: "查询成功", data: address };
    })
    .catch(err => {
      ctx.body = { success: false, message: "查询失败", data: "未知城市" };
    });
});
export default router;

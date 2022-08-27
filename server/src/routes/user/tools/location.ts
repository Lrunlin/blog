import Router from "@koa/router";
import type { Context, Next } from "koa";
import auth from "@/common/middleware/auth";
import axios from "axios";

let router = new Router();
router.get("/location",auth([0, 1]), async ctx => {
  await axios
    .get("https://api.map.baidu.com/location/ip", {
      params: { coor: "bd09ll", ak: process.env.BAIDU_MAP_AK },
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

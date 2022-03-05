import express, { NextFunction, Response, Request } from "express";
const router = express.Router();
import os from "os";
import axios from "axios";
import { Article, User, Type } from "@/db";
import { adminAuth } from "@/common/guards/auth";
import { accessRecord } from "@/store/accessRecord";

let address = "";
axios
  .get(`https://api.map.baidu.com/location/ip?ak=LC742jDXOpX0YK7zCujnaYYBUiifRHBT&coor=bd09ll`)
  .then(res => {
    address = res.data.content.address_detail.province as string;
  })
  .catch(err => {
    address = "北京市";
  });
/** 测试数据*/
// let data = {
//   os: "Windows_NT",
//   memory_total: 14942457856,
//   memory_free: 7331786752,
//   uptime: 435438,
//   article_count: 35,
//   type_count: 10,
//   user_count: 2,
//   statistics: {
//     "2022-03-03": {
//       visits: 4,
//       type: { React: 1, Vue: 1, 讲解: 1, 前端: 2, 填坑: 2, JavaScript: 1, MySQL: 1, 后端: 1 },
//       referrer: { "360": 0, Google: 0, Baidu: 0, Bing: 0, Other: 4, 直接进入: 0 },
//     },
//     "2022-03-04": {
//       visits: 8,
//       type: { React: 6, Vue: 8, 讲解: 4, 前端: 1, 填坑: 2, JavaScript: 1, MySQL: 1, 后端: 1 },
//       referrer: { "360": 0, Google: 3, Baidu: 1, Bing: 0, Other: 4, 直接进入: 0 },
//     },
//     "2022-03-05": {
//       visits: 18,
//       type: { React: 16, Vue: 8, 讲解: 4, 前端: 1, 填坑: 2, JavaScript: 11, MySQL: 1, 后端: 1 },
//       referrer: { "360": 3, Google: 5, Baidu: 6, Bing: 0, Other: 4, 直接进入: 0 },
//     },
//   },
//   address: "辽宁省",
//   loadavg: 0,
// };

/** 大屏展示信息*/
router.get("/analysis", adminAuth, async (req: Request, res: Response, next: NextFunction) => {
  let _data = {
    os: os.type(),
    memory_total: os.totalmem(),
    memory_free: os.freemem(),
    uptime: os.uptime(),
    article_count: await Article.count(),
    type_count: await Type.count(),
    user_count: await User.count(),
    statistics: accessRecord,
    address: address,
    loadavg: os.loadavg()[0],
  };

  res.json({
    success: true,
    messgae: "大屏展示信息",
    data: _data,
  });
});
export default router;

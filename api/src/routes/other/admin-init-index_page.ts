import express, { NextFunction, Response, Request } from "express";
import os from "os";
import { Article, User, Type, Api } from "@/db";
import { adminAuth } from "@/common/guards/auth";
const router = express.Router();
/** 管理员页面首页显示的信息*/
router.get("/admin/init", adminAuth, async (req: Request, res: Response, next: NextFunction) => {
  let _data = {
    node_version: process.version,
    os: os.type(),
    os_version: os.release(),
    memory_total: os.totalmem(),
    memory_free: os.freemem(),
    loadavg: os.loadavg(),
    uptime: os.uptime(),
    article_count: await Article.count(),
    article_count_admin: await Article.count({ where: { author: "admin" } }),
    type_count: await Type.count(),
    user_count: await User.count(),
    api_count: await Api.count(),
  };
  res.json({
    success: true,
    messgae: "查询相关系统信息",
    data: _data,
  });
});
export default router;

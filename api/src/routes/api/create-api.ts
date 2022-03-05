import express, { NextFunction, Response, Request } from "express";
import { Api } from "@/db";
import { ApiInstance } from "@/db/types";
import md5 from "md5";

import { adminAuth } from "@/common/guards/auth";
const app = express();
const router = express.Router();

router.post("/api", adminAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    let rows = await Api.create({
      id: md5(req.body.name + req.body.content),
      name: req.body.name,
      content: req.body.content,
      time: new Date(),
    });
    res.json({
      success: true,
      message: "创建成功",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "创建失败",
    });
  }
});
export default router;

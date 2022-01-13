import express, { NextFunction, Response, Request } from "express";
const app = express();
const router = express.Router();
import auth from "@/utils/auth/auth";
import { Type } from "@/db";

router.post("/type", auth, async (req: Request, res: Response, next: NextFunction) => {
  let articleType = {
    type: req.body.type + "",
    isShow: !!req.body.isShow,
    tag: req.body.tag + "",
  };
  try {
    await Type.create(articleType);
    res.json({
      success: true,
      message: "添加成功",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "添加失败",
    });
  }
});

export default router;

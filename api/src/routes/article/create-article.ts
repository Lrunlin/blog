import express, { NextFunction, Response, Request } from "express";
const router = express.Router();
import { Article } from "@/db";
import { sign } from "@/utils/auth";
import md5 from "md5";

router.post("/article", sign, async (req: Request, res: Response, next: NextFunction) => {
  let createArticleData = req.body;
  createArticleData.author = req.userId + "";
  //判断如果是admin没有router就生成如果是用户直接生成
  if (req.authentication == "admin") {
    if (!createArticleData.router) {
      createArticleData.router = md5('admin' + createArticleData.title);
    }
  } else {
    createArticleData.router = md5(createArticleData.author + createArticleData.title);
  }

  //检测router只能是字母或数字
  if (!/^[A-Za-z0-9]+$/.test(createArticleData.router)) {
    res.json({
      success: false,
      message: "router只能由数字或字母组成",
    });
    return false;
  }

  try {
    await Article.create(req.body);
    res.json({
      success: true,
      message: "发布成功",
    });
    setTimeout(() => {
      Article.increment(
        { view_count: Math.floor(Math.random() * 20) + 10 },
        {
          where: {
            router: req.body.router,
          },
        }
      );
    }, 1_800_000);
  } catch (error) {
    res.json({
      success: false,
      message: "发布文章失败",
    });
  }
});
export default router;

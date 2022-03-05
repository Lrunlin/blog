import express, { NextFunction, Response, Request } from "express";
const router = express.Router();
import { Article } from "@/db";
import { sign } from "@/common/guards/auth";
import md5 from "md5";
import sendEmailCreateArticle from "@/common/modules/sendEmailCreateArticle";
router.post("/article", sign, async (req: Request, res: Response, next: NextFunction) => {
  let createArticleData = req.body;
  createArticleData.author = req.userId + "";
  //判断如果是admin没有router就生成如果是用户直接生成
  if (req.authentication == "admin") {
    if (!createArticleData.router) {
      createArticleData.router = md5("admin" + createArticleData.title);
    }
  } else {
    createArticleData.router = md5(createArticleData.author + createArticleData.title);
  }

  if (!/^[a-zA-Z0-9-]{3,36}$/.test(createArticleData.router)) {
    res.json({
      success: false,
      message: "router只能由数字、字母或中划线组成",
    });
    return false;
  }

  try {
    let row = await Article.create(createArticleData);

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
      sendEmailCreateArticle(row.id);
    }, 1_800_000);
  } catch (error) {
    res.json({
      success: false,
      message: "发布文章失败",
    });
  }
});
export default router;

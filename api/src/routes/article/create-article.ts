import express, { NextFunction, Response, Request } from "express";
const router = express.Router();
import { Article } from "@/db";
import { sign } from "@/common/guards/auth";
import id from "@/utils/id";

import sendEmailCreateArticle from "@/common/modules/sendEmailCreateArticle";
router.post("/article", sign, async (req: Request, res: Response, next: NextFunction) => {
  let createArticleData = req.body;
  createArticleData.author = req.userId + "";
  createArticleData.id = id();

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
            id: createArticleData.id,
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

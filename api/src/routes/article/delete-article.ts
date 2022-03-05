import express, { NextFunction, Response, Request } from "express";
import { Article, Comment } from "@/db";
import { sign } from "@/common/guards/auth";

const router = express.Router();
interface whereTypes {
  id: string;
  author?: string;
}

router.delete("/article/:id", sign, async (req: Request, res: Response, next: NextFunction) => {
  let id: string = req.params.id;
  let where: whereTypes = {
    id: id,
  };
  if (req.authentication != "admin") {
    where.author = req.userId;
  }
  let articleData = await Article.findByPk(id, {
    attributes: ["article"],
  });
  let rows: number = await Article.destroy({
    where: where,
  });
  let isSuccess = !!rows;
  res.json({
    success: isSuccess,
    message: isSuccess ? `成功删除文章:${id}` : "删除失败",
  });

  //删除对应评论和所用到的图片
  if (isSuccess) {
    Comment.destroy({
      where: {
        articleId: id,
      },
    });
  }
});
export default router;

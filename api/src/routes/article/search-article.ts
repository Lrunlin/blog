import express, { NextFunction, Response, Request } from "express";
import Sequelize, { Op } from "sequelize";

import { Article, Comment } from "@/db";
const router = express.Router();

router.get("/article/search/:text", async (req: Request, res: Response, next: NextFunction) => {
  let text = req.params.text;

  Article.hasMany(Comment);
  Comment.belongsTo(Article, { foreignKey: "articleId", targetKey: "id" });
  const rows = await Article.findAll({
    attributes: [
      "id",
      "title",
      "router",
      "author",
      "type",
      "article",
      "time",
      "title",
      "view_count",
      "image",
      "introduce",
      [
        Sequelize.literal(`(
            SELECT COUNT(articleId)
            FROM comment AS comment
            WHERE
                comment.articleId = article.id
                )`),
        "comment_count",
      ],
    ],
    where: {
      [Op.or]: {
        title: {
          [Op.like]: `%${text}%`,
        },
        type: {
          [Op.like]: `%${text}%`,
        },
      },
    },
    order: [["time", "desc"]],
  });

  res.json({
    success: !!rows.length,
    message: "根据关键词搜索文章",
    data: rows,
  });
});
export default router;

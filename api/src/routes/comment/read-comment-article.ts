import express, { NextFunction, Response, Request } from "express";
const app = express();
const router = express.Router();
import { Comment } from "@/db";

router.get("/comment/:article", async (req: Request, res: Response, next: NextFunction) => {
  let article = req.params.article; //文章ID;
  let rows = await Comment.findAll({
    where: { articleId: article == "null" ? null : article },
    order: [["time", "asc"]],
  });

  res.json({
    success: true,
    message: "查询指定文章的评论",
    data: rows,
  });
});
export default router;

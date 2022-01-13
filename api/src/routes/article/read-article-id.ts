import express, { NextFunction, Response, Request } from "express";
import { Article } from "@/db";
const router = express.Router();

router.get("/article/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id: string | undefined = req.params.id;

  const rows = await Article.findOne({
    where: {
      id: id,
    },
  });

  res.json({
    success: !!rows,
    message: rows ? `查询成功` : "未查询到该文章",
    data: rows,
  });

  if (rows) {
    Article.increment("view_count", {
      where: {
        id: id,
      },
    });
  }
});
export default router;

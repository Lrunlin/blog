import express, { NextFunction, Response, Request } from "express";
import fs from "fs";
import { Article } from "@/db";
import referrer from "@/common/middleware/referrer";
const router = express.Router();
import cache from "@/common/middleware/cache";

interface mapping {
  id: number;
  router: string;
}
router.get(
  "/article/:id",
  referrer,
  cache,
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const rows = await Article.findByPk(id);

    res.json({
      success: !!rows,
      message: rows ? `查询成功` : "未查询到该文章",
      data: rows,
    });

    //根据ID查询不算访问
    if (rows && !req.isAdmin) {
      Article.increment("view_count", {
        where: {
          id: id,
        },
      });
    }
  }
);
export default router;

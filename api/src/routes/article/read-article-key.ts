import express, { NextFunction, Response, Request } from "express";
import { Article} from "@/db";
import cache from '@/common/middleware/cache';
const router = express.Router();

interface whereType {
  [key: string]: string;
}

router.get("/article", cache,async (req: Request, res: Response, next: NextFunction) => {
  const rows = await Article.findAll({
    where: req.query,
  });
  if (!Object.keys(req.query).length) {
    res.json({
      success: false,
      message: "请输入查询条件",
    });
    return false;
  }

  res.json({
    success: !!rows.length,
    message: rows ? `查询成功` : "未查询到该文章",
    data: rows,
  });


});
export default router;

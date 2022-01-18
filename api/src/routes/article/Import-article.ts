import express, { NextFunction, Response, Request } from "express";
import { adminAuth } from "@/utils/auth";
import { Article } from "@/db";

const app = express();
const router = express.Router();

router.post(
  "/import/article",
  adminAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    let _data = req.body.data.map((item: any) => {
      item.author = req.userId;
      item.article = item.content;
      delete item.content;
      return item;
    });

    Article.bulkCreate(_data)
      .then(rows => {
        res.json({
          success: !!rows.length,
          message: `成功导入${rows.length}条数据`,
        });
      })
      .catch(err => {

        res.json({
          success: true,
          message: "导入执行错误",
        });
      });
  }
);
export default router;

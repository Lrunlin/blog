import express, { NextFunction, Response, Request } from "express";
const app = express();
const router = express.Router();
import { adminAuth } from "@/common/guards/auth";
import md5 from "md5";
import { Article } from "@/db";
router.put("/article/:id", adminAuth, async (req: Request, res: Response, next: NextFunction) => {
  let id: string = req.params.id;
  let { type, time, article, title, view_count } = req.body;


  Article.update(
    { type,  time, article, title, view_count },
    {
      where: {
        id: id,
      },
    }
  )
    .then(rows => {
      res.json({
        success: !!rows[0],
        message: rows[0] ? "修改成功" : "修改失败",
      });
    })
    .catch(err => {
      res.json({
        success: false,
        message: "修改失败",
      });
    });
});
export default router;

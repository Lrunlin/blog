import express, { NextFunction, Response, Request } from "express";
const app = express();
const router = express.Router();
import { adminAuth } from "@/common/guards/auth";
import md5 from "md5";
import { Article } from "@/db";
router.put("/article/:id", adminAuth, async (req: Request, res: Response, next: NextFunction) => {
  let id: string = req.params.id;
  let { type, router, time, article, title } = req.body;
  if (!req.body.router) {
    req.body.router = md5(req.userId + req.body.title);
  }
  if (!/^[a-zA-Z0-9-]{3,36}$/.test(req.body.router)) {
    res.json({
      success: false,
      message: "router只能由数字、字母或下划线组成",
    });
    return false;
  }

  Article.update(
    { type, router, time, article, title },
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

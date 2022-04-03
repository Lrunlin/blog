import express, { NextFunction, Response, Request } from "express";
import { adminAuth } from "@/common/guards/auth";
import { Links } from "@/db";
const router = express.Router();

router.put("/links/:id", adminAuth, async (req: Request, res: Response, next: NextFunction) => {
  let id = req.params.id;
  let { name, description, url, logo, drainage, time } = req.body;
  let links = {
    time: new Date(+new Date(time) + 1000),
    name,
    description,
    url,
    logo,
    drainage,
  };

  Links.update(links, { where: { id: id } })
    .then(row => {
      let isSuccess = !!row[0];
      res.json({
        success: isSuccess,
        message: isSuccess ? "更新成功" : "更新失败",
      });
    })

    .catch(err => {
      res.json({
        success: false,
        message: "操作执行错误",
      });
    });
});
export default router;

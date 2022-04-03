import express, { NextFunction, Response, Request } from "express";
import { adminAuth } from "@/common/guards/auth";
import { Links } from "@/db";

const router = express.Router();

router.delete("/links/:id", adminAuth, async (req: Request, res: Response, next: NextFunction) => {
  let id = req.params.id;
  Links.destroy({ where: { id: id } })
    .then(row => {
      let isSuccess = !!row;
      res.json({
        success: isSuccess,
        message: isSuccess ? "删除成功" : "删除失败",
      });
    })
    .catch(err => {
      res.json({
        success: false,
        message: "执行失败",
      });
    });
});
export default router;

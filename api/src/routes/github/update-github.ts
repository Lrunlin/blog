import express, { NextFunction, Response, Request } from "express";
import {adminAuth} from '@/utils/auth'
import { GitHub } from "@/db";
const app = express();
const router = express.Router();

router.put("/github/:id",adminAuth, async (req: Request, res: Response, next: NextFunction) => {
  let id = req.params.id;
  GitHub.update(req.body, { where: { id: id } })
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

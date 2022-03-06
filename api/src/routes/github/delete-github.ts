import express, { NextFunction, Response, Request } from "express";
import { adminAuth } from "@/common/guards/auth";
import { GitHub } from "@/db";
import deleteImage from "@/common/modules/image/deleteImage";

const router = express.Router();

router.delete("/github/:id", adminAuth, async (req: Request, res: Response, next: NextFunction) => {
  let id = req.params.id;
  GitHub.destroy({ where: { id: id } })
    .then(row => {
      let isSuccess = !!row;
      res.json({
        success: isSuccess,
        message: isSuccess ? "删除成功" : "删除失败",
      });
      if (isSuccess) {
        deleteImage("github", req.params.id + "");
      }
    })
    .catch(err => {
      res.json({
        success: false,
        message: "执行失败",
      });
    });
});
export default router;

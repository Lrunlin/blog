import express, { NextFunction, Response, Request } from "express";
import { adminAuth } from "@/common/guards/auth";
import { GitHub } from "@/db";
import uploadImage from "@/common/modules/image/uploadImage";
import upload from "@/common/middleware/upload";
const router = express.Router();

router.put(
  "/github/:id",
  adminAuth,
  upload,
  async (req: Request, res: Response, next: NextFunction) => {
    let id = req.params.id;
    let { name, description, url, time } = req.body;
    let _data = {
      name,
      description,
      url,
      time
    };

    GitHub.update(_data, { where: { id: id } })
      .then(row => {
        let isSuccess = !!row[0];
        res.json({
          success: isSuccess,
          message: isSuccess ? "更新成功" : "更新失败",
        });
        uploadImage(req, { dir: "github", name: id });
      })

      .catch(err => {
        res.json({
          success: false,
          message: "操作执行错误",
        });
        uploadImage(req, false);
      });
  }
);
export default router;

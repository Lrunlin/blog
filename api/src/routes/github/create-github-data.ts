import express, { NextFunction, Response, Request } from "express";
const app = express();
const router = express.Router();
import { GitHub } from "@/db";
import { GitHubInstance } from "@/db/types";
import { adminAuth } from "@/common/guards/auth";
import upload from "@/common/middleware/upload";
import useUploadImage from "@/common/modules/image/uploadImage";
import { v4 } from "uuid";
router.post(
  "/github",
  adminAuth,
  upload,
  async (req: Request, res: Response, next: NextFunction) => {
    let _data = req.body;
    _data.id = v4().replace(/-/g, "");

    GitHub.create(_data as GitHubInstance)
      .then(rows => {
        res.json({
          success: true,
          message: "保存成功",
        });
        useUploadImage(req, { dir: "github", name: _data.id });
      })
      .catch(err => {
        res.json({
          success: false,
          message: "保存失败",
        });
        useUploadImage(req, false);
      });
  }
);
export default router;

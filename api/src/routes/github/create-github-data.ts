import express, { NextFunction, Response, Request } from "express";
const app = express();
const router = express.Router();
import md5 from "md5";
import { GitHub } from "@/db";
import { GitHubInstance } from "@/db/types";
import { adminAuth } from "@/common/guards/auth";

router.post("/github", adminAuth, async (req: Request, res: Response, next: NextFunction) => {
  let _data = req.body;
  _data.id = md5(req.body.name + req.body.url);

  GitHub.create(_data as GitHubInstance)
    .then(rows => {
      res.json({
        success: true,
        message: "保存成功",
      });
    })
    .catch(err => {
      res.json({
        success: false,
        message: "保存失败",
      });
    });
});
export default router;

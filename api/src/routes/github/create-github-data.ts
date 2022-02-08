import express, { NextFunction, Response, Request } from "express";
const app = express();
const router = express.Router();
import md5 from "md5";
import { GitHub } from "@/db";
import { GitHubInstance } from "@/db/types";
import { adminAuth } from "@/utils/auth";
import uploadGitHubImage from "@/request/uploadGitHubImage";

router.post("/github", adminAuth, async (req: Request, res: Response, next: NextFunction) => {
  let _data = req.body;
  _data.id = md5(req.body.name + req.body.url);

  GitHub.create(_data as GitHubInstance)
    .then(async rows => {
      //数据库插入成功后进行图片保存，如果图片保存失败对数据库内容进行删除
      let _result = await uploadGitHubImage(
        _data.id,
        req.body.image,
        req.headers.authorization + ""
      );
      res.json({
        success: _result,
        message: _result ? "保存成功" : "保存失败",
      });
      if (!_result) {
        GitHub.destroy({ where: { id: _data.id } });
      }
    })
    .catch(err => {
      res.json({
        success: false,
        message: "保存失败",
      });
    });
});
export default router;

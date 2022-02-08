import express, { NextFunction, Response, Request } from "express";
import { adminAuth } from "@/utils/auth";
import { GitHub } from "@/db";
import uploadGitHubImage from "@/request/uploadGitHubImage";

const app = express();
const router = express.Router();

router.put("/github/:id", adminAuth, async (req: Request, res: Response, next: NextFunction) => {
  let id = req.params.id;

  GitHub.update(req.body, { where: { id: id } })
    .then(async row => {
        let _result = await uploadGitHubImage(id, req.body.image, req.headers.authorization + "");
        res.json({
          success: _result,
          message: _result ? "更新成功" : "更新失败",
        });
        if (!_result) {
          GitHub.destroy({ where: { id: id } });
        }
    })
    .catch(err => {
      res.json({
        success: false,
        message: "操作执行错误",
      });
    });
});
export default router;

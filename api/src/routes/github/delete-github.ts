import express, { NextFunction, Response, Request } from "express";
import { adminAuth } from "@/utils/auth";
import { GitHub } from "@/db";
import deleteGitHubImage from "@/request/deleteGitHubImage";

const app = express();
const router = express.Router();

router.delete("/github/:id",adminAuth, async (req: Request, res: Response, next: NextFunction) => {
  let id = req.params.id;
  GitHub.destroy({ where: { id: id } })
    .then(row => {
      res.json({
        success: !!row,
        message: !!row ? "删除成功" : "删除失败",
      });
      if (!!row) {
        deleteGitHubImage(id,req.headers.authorization+'');
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

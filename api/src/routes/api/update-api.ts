import express, { NextFunction, Response, Request } from "express";
import { Api } from "@/db";
import { adminAuth } from "@/common/guards/auth";
const app = express();
const router = express.Router();

router.put("/api/:id", adminAuth, async (req: Request, res: Response, next: NextFunction) => {
  let { name, content, time } = req.body;
  let rows = await Api.update({ name, content, time }, { where: { id: req.params.id } });
  let isSuccess = !!rows[0];
  res.json({
    success: isSuccess,
    message: isSuccess ? "修改成功" : "修改失败",
  });
});
export default router;

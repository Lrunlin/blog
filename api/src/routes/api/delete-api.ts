import express, { NextFunction, Response, Request } from "express";
import { Api } from "@/db";
import { adminAuth } from "@/common/guards/auth";
const app = express();
const router = express.Router();

router.delete("/api/:id", adminAuth, async (req: Request, res: Response, next: NextFunction) => {
  let rows = await Api.destroy({ where: { id: req.params.id } });
  let isSuccess = !!rows;
  res.json({
    success: isSuccess,
    message: isSuccess ? "删除成功" : "删除失败",
  });
});
export default router;

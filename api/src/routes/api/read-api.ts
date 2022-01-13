import express, { NextFunction, Response, Request } from "express";
import { Api } from "@/db";
const app = express();
const router = express.Router();

router.get("/api/:id", async (req: Request, res: Response, next: NextFunction) => {
  let row = await Api.findByPk(req.params.id);
  res.json({
    success: !!row,
    message: "查询接口信息",
    data: row,
  });
});
export default router;

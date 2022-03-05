import express, { NextFunction, Response, Request } from "express";
const app = express();
const router = express.Router();
import { Type } from "@/db";
router.get("/type", async (req: Request, res: Response, next: NextFunction) => {
  let where = {};
  if (req.query.isShow) {
    where = { isShow: true };
  }
  let rows = await Type.findAll({ order: [["time", "desc"]], where: where });

  res.json({
    success: true,
    message: "查询全部类型",
    data: rows,
  });
});

export default router;

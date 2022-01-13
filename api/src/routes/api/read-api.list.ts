import express, { NextFunction, Response, Request } from "express";
import { Api } from "@/db";
import { adminAuth } from "@/utils/auth";
const app = express();
const router = express.Router();

router.get("/api", async (req: Request, res: Response, next: NextFunction) => {
  let rows = await Api.findAll({
    attributes: ["name", "id","time"],
  });
  let row = await Api.findByPk(rows[0].id);
  res.json({
    success: true,
    message: "查询开放Api接口信息（List）",
    data: {
      list: rows,
      content: row,
    },
  });
});
export default router;

import express, { NextFunction, Response, Request } from "express";
const app = express();
const router = express.Router();
import { Article } from "@/db";
setTimeout(() => {}, 3_600_000);
router.get("/sitemap", async (req: Request, res: Response, next: NextFunction) => {
  let rows =await Article.findAll({
    attributes: ["router", "time"],
  });
  res.json({
    success: true,
    message: "查询sitemap列表",
    data: rows,
  });
});
export default router;

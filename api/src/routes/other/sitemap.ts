import express, { NextFunction, Response, Request } from "express";
const app = express();
const router = express.Router();
import { Article } from "@/db";
let rows: any = null;
Article.findAll({
  attributes: ["router", "time"],
}).then(res => {
  rows = res;
});
setTimeout(() => {
  Article.findAll({
    attributes: ["router", "time"],
  }).then(res => {
    rows = res;
  });
}, 604_800_000);
router.get("/sitemap", async (req: Request, res: Response, next: NextFunction) => {
  res.json({
    success: true,
    message: "查询sitemap列表",
    data: rows,
  });
});
export default router;

import express, { NextFunction, Response, Request } from "express";
const router = express.Router();
import { statistics } from "@/store/accessRecord";
import text from "@/store/text";

let consoleText =
  process.env.ENV == "dev"
    ? ""
    : `
  console.log(\`${text}\`)
  `;

/** 统计网站访问量*/
router.get("/statistics/:id", async (req: Request, res: Response, next: NextFunction) => {
  // 设置成缓存一天
  if (process.env.ENV != "dev") {
    res.setHeader("Cache-Control", "max-age=86400");
  }
  res.send(consoleText);
  let type = req.query.type ? req.query.type + "" : undefined;
  statistics(type, req.query.referrer + "");
});
export default router;

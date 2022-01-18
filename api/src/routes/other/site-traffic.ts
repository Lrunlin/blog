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
router.get("/statistics", async (req: Request, res: Response, next: NextFunction) => {
  res.send(consoleText);
  statistics();
});
export default router;

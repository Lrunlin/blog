import express, { NextFunction, Response, Request } from "express";
const app = express();
const router = express.Router();
import { statistics } from "@/store/accessRecord";
/** 统计网站访问量*/
router.get("/statistics", async (req: Request, res: Response, next: NextFunction) => {
  res.send(``);
  statistics();
});
export default router;

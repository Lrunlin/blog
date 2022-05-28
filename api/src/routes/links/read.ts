import express, { NextFunction, Response, Request } from "express";
const app = express();
const router = express.Router();
import { Links } from "@/db";
import cache from "@/common/middleware/cache";

router.get("/links",cache, async (req: Request, res: Response, next: NextFunction) => {
  let rows = await Links.findAll({ order: [["time", "desc"]] });
  res.json({
    success: true,
    message: "查询全部友链",
    data: rows,
  });
});

export default router;

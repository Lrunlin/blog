import express, { NextFunction, Response, Request } from "express";
const app = express();
const router = express.Router();
import { Comment } from "@/db";

router.get("/comment", async (req: Request, res: Response, next: NextFunction) => {
  let rows = await Comment.findAll({ order: [["time", "asc"]] });

  res.json({
    success: true,
    message: "查询全部文章评论",
    data: rows,
  });
});
export default router;

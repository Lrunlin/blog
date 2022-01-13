import express, { NextFunction, Response, Request } from "express";
import { GitHub } from "@/db";

const app = express();
const router = express.Router();
router.get("/github", async (req: Request, res: Response, next: NextFunction) => {
  let rows = await GitHub.findAll();
  res.json({
    success: false,
    message: "查询GitHub开源仓库的信息",
    data: rows,
  });
});
export default router;

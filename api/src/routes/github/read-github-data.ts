import express, { NextFunction, Response, Request } from "express";
import { GitHub } from "@/db";
import { assets } from "@/store/assetsPath";
import type { GitHubInstance } from "@/db/types";
const app = express();
const router = express.Router();
router.get("/github", async (req: Request, res: Response, next: NextFunction) => {
  let rows = await GitHub.findAll();
  interface request extends GitHubInstance {
    image: string;
  }
  let _data = (JSON.parse(JSON.stringify(rows)) as request[]).map(item => {
    item.image = `${assets}github/${item.id}.webp`;
    return item;
  });

  res.json({
    success: false,
    message: "查询GitHub开源仓库的信息",
    data: _data,
  });
});
export default router;

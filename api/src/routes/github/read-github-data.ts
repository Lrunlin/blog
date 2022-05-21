import express, { NextFunction, Response, Request } from "express";
import { GitHub } from "@/db";
import { joinUrl } from "@/store/assetsPath";
const app = express();
const router = express.Router();
router.get("/github", async (req: Request, res: Response, next: NextFunction) => {
  let rows = await GitHub.findAll();
  res.json({
    success: false,
    message: "查询GitHub开源仓库的信息",
    data: rows.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      url: item.url,
      preview_href: joinUrl("github", `${item.id}.webp`, !req.admin),
      time: item.time,
    })),
  });
});
export default router;

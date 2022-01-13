import express, { NextFunction, Response, Request } from "express";
const app = express();
const router = express.Router();
import { Type } from "@/db";
let decorate = ["推荐", "资讯", "前端", "后端"]; //侧边栏的固定栏目
router.get("/type", async (req: Request, res: Response, next: NextFunction) => {
  let rows = await Type.findAll();

  /**如果需要固定的那些栏目就合并一下*/
  const data = (): any[] => {
    let _data = JSON.parse(JSON.stringify(rows));
    return [
      ..._data,
      ...decorate.map(item => {
        return {
          type: item,
        };
      }),
    ];
  };
  res.json({
    success: true,
    message: "查询全部类型",
    data: req.query.decorate ? data() : rows,
  });
});

export default router;

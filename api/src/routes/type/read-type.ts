import express, { NextFunction, Response, Request } from "express";
const router = express.Router();
import { joinUrl } from "@/store/assetsPath";
import { Type } from "@/db";
import referrer from '@/common/middleware/referrer';

router.get("/type",referrer, async (req: Request, res: Response, next: NextFunction) => {
  let where = {};
  if (req.query.isShow) {
    where = { isShow: true };
  }
  let rows = await Type.findAll({ order: [["time", "desc"]], where: where });

  res.json({
    success: true,
    message: "查询全部类型",
    data: rows.map(item => ({
      id: item.id,
      type: item.type,
      isShow: item.isShow,
      icon_href: joinUrl('type',`${item.id}.webp`,!req.isAdmin),
      time: item.time,
    })),
  });
});

export default router;

import express, { NextFunction, Response, Request } from "express";
const router = express.Router();
import { Type } from "@/db";
import deleteImage from "@/common/modules/image/deleteImage";

import auth from "@/common/guards/auth/auth";

router.delete("/type/:type", auth, async (req: Request, res: Response, next: NextFunction) => {
  let rows: number = await Type.destroy({
    where: {
      type: req.params.type + "",
    },
  });

  let isSuccess: boolean = !!rows;
  res.json({
    success: isSuccess,
    message: isSuccess ? "删除成功" : "删除失败",
  });
  if (isSuccess) {
    deleteImage("type", req.params.type + "");
  }
});
export default router;

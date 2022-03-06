import express, { NextFunction, Response, Request } from "express";
const router = express.Router();
import { Type } from "@/db";
import deleteImage from "@/common/modules/image/deleteImage";

import auth from "@/common/guards/auth/auth";

router.delete("/type/:id", auth, async (req: Request, res: Response, next: NextFunction) => {
  let rows: number = await Type.destroy({
    where: {
      id: req.params.id + "",
    },
  });

  let isSuccess: boolean = !!rows;
  res.json({
    success: isSuccess,
    message: isSuccess ? "删除成功" : "删除失败",
  });
  if (isSuccess) {
    deleteImage("type", req.params.id + "");
  }
});
export default router;

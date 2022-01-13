import express, { NextFunction, Response, Request } from "express";
const app = express();
const router = express.Router();
import { Type } from "@/db";

import auth from "@/utils/auth/auth";

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
});
export default router;

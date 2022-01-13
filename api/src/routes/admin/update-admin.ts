import express, { NextFunction, Response, Request } from "express";
import { adminAuth } from "@/utils/auth";
import { Admin } from "@/db";
const router = express.Router();

router.put("/admin", adminAuth, async (req: Request, res: Response, next: NextFunction) => {
  let row = await Admin.update(
    { admin: req.admin, password: req.body.password },
    {
      where: {
        admin: req.admin,
      },
    }
  );
  res.json({
    success: !!row[0],
    message: !!row[0] ? "修改成功" : "修改失败",
  });
});
export default router;

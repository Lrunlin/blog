import express, { NextFunction, Response, Request } from "express";
import { adminAuth } from "@/common/guards/auth";
import jwt from "jsonwebtoken";
import { PUBLICKEY } from "@/store/key";

const router = express.Router();

router.get("/admin/state", adminAuth, async (req: Request, res: Response, next: NextFunction) => {
  jwt.verify(req.headers.authorization as string, PUBLICKEY, function (err, decode) {
    res.json({
      success: !!decode,
      message: `管理员${decode?.admin}登录成功`,
    });
  });
});
export default router;

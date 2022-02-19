import express, { NextFunction, Response, Request } from "express";
const app = express();
const router = express.Router();
import { Admin } from "@/db";

import { PRIVATEKEY } from "@/store/key";
import jwt from "jsonwebtoken";
import md5 from "md5";



router.get("/admin/token", async (req: Request, res: Response) => {
  const { admin, password } = req.query;
  let data = await Admin.findOne({
    where: { admin: admin, password: md5(password as string) },
  });
  
  let isSuccess = !!data;
  const token = isSuccess
    ? jwt.sign({ authentication: "admin", admin: admin, userId: "admin" }, PRIVATEKEY, {
        algorithm: "RS256",
        expiresIn: "30d",
      })
    : "";

  res.json({
    success: isSuccess,
    message: isSuccess ? "登录成功" : "账号或密码错误",
    data: token,
  });
});
export default router;

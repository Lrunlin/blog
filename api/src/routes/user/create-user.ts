import express, { NextFunction, Response, Request } from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import { hasUserEmail } from "@/store/userEmail";
import { User } from "@/db";
import { PRIVATEKEY } from "@/store/key";
const app = express();
const router = express.Router();

router.post("/user", async (req: Request, res: Response, next: NextFunction) => {
  if (!hasUserEmail(req.body.email, req.body.code)) {
    res.json({
      success: false,
      message: "验证码不正确",
    });
    return false;
  }

  let params = {
    email: req.body.email,
    password: req.body.password,
  };
  try {
    let rows = await User.create(params);
    let token = jwt.sign({ authentication: "user", userId: req.body.email }, PRIVATEKEY, {
      algorithm: "RS256",
      expiresIn: "365d",
    });

    res.json({
      success: true,
      message: "注成功册",
      data: token,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "注册失败",
    });
  }
});
export default router;

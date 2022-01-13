import express, { NextFunction, Response, Request } from "express";
import { User } from "@/db";
import { PRIVATEKEY } from "@/store/key";
import jwt from "jsonwebtoken";
import md5 from "md5";

const app = express();
const router = express.Router();

interface userTypes {
  name: string;
  email: string;
  password: string;
  GitHub: string | null;
}

router.get("/user/token", async (req: Request, res: Response, next: NextFunction) => {
  let rows = await User.findOne({
    where: {
      email: req.query.email,
      password: md5(req.query.password + ""),
    },
  });
  let isSuccess = !!rows;
  let token = jwt.sign({ authentication: "user", userId: req.query.email }, PRIVATEKEY, {
    algorithm: "RS256",
    expiresIn: "365d",
  });

  let _response = {
    success: isSuccess,
    message: isSuccess ? "登录成功" : "账号或密码错误",
    data: isSuccess
      ? {
          name: (rows as unknown as userTypes).name,
          email: (rows as unknown as userTypes).email,
        }
      : null,
    token: token,
  };

  res.json(_response);
});
export default router;

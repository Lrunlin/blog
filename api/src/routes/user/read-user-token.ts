import express, { NextFunction, Response, Request } from "express";
import { User } from "@/db";
import { sign } from "@/common/guards/auth";
import jwt from "jsonwebtoken";
import { PUBLICKEY } from "@/store/key";
const app = express();
const router = express.Router();
interface decodeTypes {
  authentication: string;
  userId: string;
}

// 根据token获取登陆者的信息
router.get("/user/data",sign, async (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization;
  jwt.verify(token + "", PUBLICKEY, async function (err, decode) {
    if (err) {
      res.json({
        success: false,
        message: "用户信息获取失败",
      });
      return false;
    }
    
    let userData = decode as decodeTypes;
    let userRows = await User.findByPk(userData.userId, {
      attributes: ["email","GitHub"],
    });

    res.json({
      success: true,
      message: "查询用户信息成功",
      data: userRows,
    });
  });

  return false;
});
export default router;

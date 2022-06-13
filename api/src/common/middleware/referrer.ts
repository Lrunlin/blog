import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { PUBLICKEY } from "@/store/key";

/** 判断来源,用户端还是管理员*/
function referrer(req: Request, res: Response, next: NextFunction) {
  req.isAdmin = !!req.headers.isAdmin;
  next();
}
export default referrer;

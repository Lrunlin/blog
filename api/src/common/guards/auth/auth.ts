/*
todo 判断是否管理员
*/
import jwt from "jsonwebtoken";
import { NextFunction, Response, Request } from "express";
import { hasBlackList } from "@/store/blackList";
import { PUBLICKEY } from "@/store/key";
/** 只有管理登录才可以使用*/
function auth(req: Request, res: Response, next: NextFunction) {
  let token: string = req.headers.authorization + "";

  jwt.verify(token, PUBLICKEY, function (err: any, decoded: any) {
    if (hasBlackList(token)) {
      res.status(401);
      res.end();
      return false;
    }
    if (decoded && decoded?.authentication == "admin") {
      req.admin = decoded.admin;
      req.userId = "admin";
      next();
    } else {
      res.status(401);
      res.end();
    }
  });
}
export default auth;

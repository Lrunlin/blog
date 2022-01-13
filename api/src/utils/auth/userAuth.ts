/*
todo 判断是否普通用户
*/
import jwt from "jsonwebtoken";
import { NextFunction, Response, Request } from "express";
import { hasBlackList } from "@/store/blackList";
import { PUBLICKEY } from "@/store/key";

/** 只有用户登录才可以使用*/
function auth(req: Request, res: Response, next: NextFunction) {
  let token: string = req.headers.authorization + "";

  jwt.verify(token, PUBLICKEY, function (err: any, decoded: any) {
    if (hasBlackList(token)) {
      res.status(401);
      res.end();
      return false;
    }
    if (decoded && decoded?.authentication == "user") {
      req.authentication = "user";
      req.userId = decoded.userId;
      next();
    } else {
      res.status(401);
      res.end();
    }
  });
}
export default auth;

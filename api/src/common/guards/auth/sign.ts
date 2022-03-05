/*
todo 判断签名是否可用（对不身份进行限制）
*/
import jwt from "jsonwebtoken";
import { NextFunction, Response, Request } from "express";
import { PUBLICKEY } from "@/store/key";
import { hasBlackList } from "@/store/blackList";

/** 登录了就可以使用*/
function auth(req: Request, res: Response, next: NextFunction) {
  let token: string = req.headers.authorization + "";
  
  jwt.verify(token, PUBLICKEY, function (err: any, decoded: any) {
    if (hasBlackList(token)) {
      res.status(401);
      res.end();
      return false;
    }
    if (decoded) {
      req.authentication = decoded.authentication;
      req.userId = decoded.userId;
      next();
    } else {
      res.status(401);
      res.end();
    }
  });
}
export default auth;

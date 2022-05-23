import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { PUBLICKEY } from "@/store/key";

/** 判断来源,用户端还是管理员*/
function referrer(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.authorization) {
    next();
    return false;
  }
  jwt.verify(req.headers.authorization, PUBLICKEY, function (err: any, decoded: any) {

    if (decoded && decoded?.authentication == "admin") {
      req.isAdmin = true;
      next();
    } else {
      next();
    }
  });

}
export default referrer;

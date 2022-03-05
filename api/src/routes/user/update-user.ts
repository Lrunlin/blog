import express, { NextFunction, Response, Request } from "express";
import { sign } from "@/common/guards/auth";
import axios from "axios";
import assetsPath from "@/store/assetsPath";
import { setBlackList } from "@/store/blackList";
import { User } from "@/db";

interface data {
  [key: string]: string;
}

const router = express.Router();
router.put("/user", sign, async (req: Request, res: Response, next: NextFunction) => {
  let _data: data = {};
  if (req.body.GitHub) {
    if (!req.body.GitHub.includes("https://github.com/")) {
      res.json({
        success: false,
        message: "GitHub主页不符合格式（例:https://github.com/xxx）",
      });
      return false;
    }
    _data.GitHub = req.body.GitHub;
  }

  if (req.body.password) {
    _data.password = req.body.password;
  }
  let rows = await User.update(_data, {
    where: {
      email: req.userId,
    },
  });

  res.json({
    success: !!rows[0],
    message: !!rows[0] ? "数据修改成功" : "修改失败",
  });

  if (!!rows[0]) {
    if (req.body.userFace) {
      axios.put(
        `${assetsPath}assets`,
        {
          images: [`${req.userId}.jpg`],
        },
        { headers: { authorization: req.headers.authorization + "" } }
      );
    }
    if (req.body.password) {
      setBlackList(req.headers.authorization + "");
    }
  }
});
export default router;

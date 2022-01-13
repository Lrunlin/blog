import express, { NextFunction, Response, Request } from "express";
const app = express();
const router = express.Router();
import { Article } from "@/db";
import moment from "moment";
import { readArticle } from "@/types";

router.get("/download/article", async (req: Request, res: Response, next: NextFunction) => {
  let rows = await Article.findAll({
    where: {
      author: "admin",
    },
  });
  let data = JSON.stringify({
    url: "https://blogweb.cn",
    time: moment().format("yyyy-MM-DD hh:mm:ss"),
    data: (rows as unknown[] as readArticle[]).map(item => {
      let _item = {
        title: item.title,
        time: item.time,
        type: item.type,
        article: item.article,
      };
      return _item;
    }),
  });

  res.json({
    success: true,
    data: data,
  });
});
export default router;

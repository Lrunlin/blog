import { Comment, Article } from "@/db";
import { sign } from "@/utils/auth";
import md5 from "md5";
import express, { NextFunction, Response, Request } from "express";
import { setBlackList } from "@/store/blackList";

const app = express();
const router = express.Router();

interface paramsType {
  [key: string]: any;
}

//参数错误时执行
const _error = (req: Request, res: Response): void => {
  res.json({
    success: false,
    message:
      "没找到指定文章（因为您不是通过指定页面访问此接口，所以我们将您的token加入了黑名单，请重新登录）",
  });
  setBlackList(req.headers.authorization + "");
};

router.post("/comment", sign, async (req: Request, res: Response, next: NextFunction) => {
  //todo判断是否有指定文章
  if (req.body.articleId) {
    let _article = await Article.findOne({
      where: {
        id: req.body.articleId + "",
      },
    });
    if (!_article) {
      _error(req, res);
      return false;
    }
  }

  //todo如果是回复别人的评论判断是否正确
  if (req.body.parent) {
    let commentRows = await Comment.findOne({
      where: {
        articleId: req.body.article,
        id: req.body.parent,
      },
    });
    if (!commentRows) {
      _error(req, res);
      return false;
    }
  }

  // todo 判断长度
  if ((req.body.content + "").length < 1 || (req.body.content + "").length > 200) {
    res.json({
      success: false,
      message: "评论长度应在1-200之间",
    });
    return false;
  }

  let params = {
    id: md5(req.userId + req.body.content + req.body.article),
    commentator: req.userId + "",
    time: new Date(),
    content: req.body.content,
    articleId: req.body.articleId,
    superior: req.body.superior || null,
  };

  try {
    let rows = await Comment.create(params);
    res.json({
      success: true,
      message: "评论成功",
    });
  } catch (error: any) {
    res.json({
      success: false,
      message: "评论失败(您可能已经发布过该评论)",
    });
  }
});
export default router;

import { Comment } from "@/db";
import { sign } from "@/utils/auth";
import express, { NextFunction, Response, Request } from "express";

const app = express();
const router = express.Router();

interface whereType {
  id: string;
  commentator?: string;
}

router.delete("/comment/:id", sign, async (req: Request, res: Response, next: NextFunction) => {
  let id = req.params.id;
  let deleteWhere: whereType = { id: id };
  if (req.authentication != "admin") deleteWhere.commentator = req.userId + "";

  let rows = await Comment.destroy({
    where: deleteWhere as unknown as whereType,
  });

  res.json({
    success: !!rows,
    message: `删除${rows ? "成功" : "失败"}`,
  });

  if (!!rows) {
    Comment.destroy({
      where: {
        superior: id,
      },
    });
  }
});
export default router;

import { Comment } from "@/db";
import { sign } from "@/common/guards/auth";
import express, { NextFunction, Response, Request } from "express";
const router = express.Router();

interface whereType {
  id:string[];
  commentator?: string;
}

/**
 * 传递需要删除的评论的ID，递归查询并返回所有子评论
 * @params id {string} 需要删除的初始ID
 * @return comments {string[]} 所有子评论的ID
 */
async function getAllComment(id: string) {
  let comments: string[] = [id];
  /** 查询单个评论的子评论并推进数组*/
  async function getCommentId(id: string) {
    let comment_id = await Comment.findAll({
      where: {
        superior: id,
      },
      attributes: ["id"],
    });
    comments.push(...comment_id.map(item => item.id));
    if (comment_id.length) {
      for (let index = 0; index < comment_id.length; index++) {
        await getCommentId(comment_id[index].id);
      }
    }
  }
  await getCommentId(id);
  return comments;
}

router.delete("/comment/:id", sign, async (req: Request, res: Response, next: NextFunction) => {
  let id = req.params.id;
  let deleteWhere: whereType = { id: await getAllComment(id) };
  if (req.authentication != "admin") deleteWhere.commentator = req.userId + "";
  let rows = await Comment.destroy({
    where: deleteWhere as unknown as whereType,
  });

  res.json({
    success: !!rows,
    message: `删除${rows ? "成功" : "失败"}`,
  });

});
export default router;

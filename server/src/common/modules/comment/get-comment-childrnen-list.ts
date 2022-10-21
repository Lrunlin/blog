import DB from "@/db";

/** 根据传递的评论ID查找出全部子评论的ID*/
async function getCommentChildrenList(id: number) {
  let idHub: number[] = [id];
  async function _collectCommentID(_id: number) {
    await DB.Comment.findAll({ where: { reply: _id }, attributes: ["id"] }).then(async rows => {
      for (let index = 0; index < rows.length; index++) {
        const id = rows[index].id;
        idHub.push(id);
        await _collectCommentID(id);
      }
    });
  }
  await _collectCommentID(id);
  return idHub;
}
export default getCommentChildrenList;

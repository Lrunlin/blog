import DB from "@/db";

/**
 * 查询某用户关注的博主
 * @params id {number} 用户ID
 * @return bloggerList {number[]} 博主的id列表
 */
async function getBloggerList(id: number) {
  return await DB.Follow.findAll({
    where: { user_id: id, type: "user" },
    attributes: ["belong_id"],
  })
    .then(rows => rows.map(item => item.toJSON().belong_id) as unknown as number[])
    .catch(() => [] as number[]);
}
export default getBloggerList;

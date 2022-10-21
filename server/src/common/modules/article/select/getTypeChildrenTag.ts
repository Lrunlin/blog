import DB from "@/db";

/**
 * 根据type返回所属的tag
 * @params id {number} type的id
 * @return tagID {number[]} 归属于该type的tag_id
 */
async function getTypeChildrenTag(id: number) {
  return await DB.Tag.findAll({ where: { belong: id }, attributes: ["id"] })
    .then(rows => rows.map(item => item.toJSON().id) as unknown as number[])
    .catch(() => [] as number[]);
}

export default getTypeChildrenTag;

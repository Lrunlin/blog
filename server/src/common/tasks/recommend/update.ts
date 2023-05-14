import DB from "@/db";
import {
  createData,
  setArticleListWriteRedis,
  sort,
} from "@/common/modules/tasks/set-recommend-data";
import Redis from "../../utils/redis";

let redis = Redis();
/** 向Redis中写入新数据*/
async function setNewData() {
  //开始获取数据并且写入Redis
  await setArticleListWriteRedis();

  let oldArticleList = await DB.Recommend.findAll({
    attributes: ["id"],
    raw: true,
  }).then(rows => rows.map(item => item.id));

  await redis.sadd("old-article-list", oldArticleList);
  /** 新文章的id*/
  function keys() {
    return Promise.all(
      Object.keys(sort).map(item =>
        redis.keys(`${item}*`).then(rows => rows.map(key => key.replace(`${item}-`, "")))
      )
    ).then(res => [...new Set(res.flat())]);
  }
  await redis.sadd("new-article-list", await keys());
}

/** 定期对推荐表进行更新*/
async function setSortArticleList() {
  await setNewData();
  //sinter交集
  //sdiff a有b没有
  let deleteArticleIdList = await redis.sdiff("old-article-list", "new-article-list"); //需要删除的文章ID(旧文章有新文章没有)
  /** 处理文章添加*/
  let list = await redis.smembers("new-article-list");

  DB.Recommend.bulkCreate(await createData(list), {
    updateOnDuplicate: [
      "title",
      "description",
      "cover",
      "tag",
      "create_time",
      "update_time",
      "view",
      "recommend",
      "newest",
      "hottest",
    ],
  }).catch(err => {
    console.log("更新推荐表,批量文章插入发生错误", err);
  });

  await DB.Recommend.destroy({ where: { id: deleteArticleIdList } }).catch(err => {
    console.log("更新推荐表,批量文章删除发生错误", err);
  });

  await redis.del(["old-article-list", "new-article-list"]);

  /** 需要删除的推荐文章数据键值对*/

  let deleteKeys = await Promise.all(Object.keys(sort).map(item => redis.keys(`${item}*`))).then(
    rows => rows.flat()
  );
  await redis.del(deleteKeys);
}
export default () => {
  setInterval(() => {
    setSortArticleList();
  }, 1_800_000);
};

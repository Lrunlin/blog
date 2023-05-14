//先批量获取数据，然后全部写入redis
//循环挨个查询redis中的数据进行合并
//将结果直接写入Mysql数据库
import DB from "@/db";
import Redis from "../../utils/redis";
import {
  createData,
  setArticleListWriteRedis,
  sort,
} from "@/common/modules/tasks/set-recommend-data";
let redis = Redis();

/** 根据页数获取推荐文章并且进行批量创建*/
async function sortArticleList() {
  //开始获取数据并且写入Redis
  await setArticleListWriteRedis();

  // 开始对数据进行合并并且写入数据库事务
  /** 获取全部文章的ID(去重后)*/
  function keys() {
    return Promise.all(
      Object.keys(sort).map(item =>
        redis.keys(`${item}*`).then(rows => rows.map(key => key.replace(`${item}-`, "")))
      )
    ).then(res => [...new Set(res.flat())]);
  }

  await DB.Recommend.bulkCreate(await createData(await keys())).catch(err => {
    console.log("初始化推荐表时批量文章插入发生错误", err);
  });

  // 批量添加后删除key
  let deleteKeys = await Promise.all(Object.keys(sort).map(item => redis.keys(`${item}*`))).then(
    rows => rows.flat()
  );
  await redis.del(deleteKeys);
}
export default async () => {
  // 只有在文章表有内容，但是推荐表没内容时才进行初始化
  Promise.all([DB.Article.count({ where: { state: 1 } }), DB.Recommend.count()]).then(async res => {
    if (res[0] && !res[1]) {
      await sortArticleList();
    }
  });
};

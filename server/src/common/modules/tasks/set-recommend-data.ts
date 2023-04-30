import Redis from "@/common/utils/redis";
let redis = Redis();
import getSortArticleList from "./sortArticleList";

export const sort = {
  recommend: [
    ["update_time", "desc"],
    ["comment_count", "desc"],
    ["create_time", "desc"],
    ["reprint", "asc"],
    ["like_count", "desc"],
    ["view_count", "desc"],
  ],
  newest: [
    ["create_time", "desc"],
    ["update_time", "desc"],
    ["reprint", "asc"],
    ["like_count", "desc"],
    ["comment_count", "desc"],
  ],
  hottest: [
    ["like_count", "desc"],
    ["view_count", "desc"],
    ["reprint", "asc"],
    ["create_time", "desc"],
    ["comment_count", "desc"],
    ["update_time", "desc"],
  ],
};

/** 首次启动。根据页数获取推荐文章，并且全部写入redis（{sort}-{id}）*/
export const setArticleListWriteRedis = async (page: number) => {
  const pipeline = redis.pipeline();
  return await Promise.all(Object.keys(sort).map((_sort: any) => getSortArticleList(_sort, page)))
    .then(async rows => {
      rows.flat().forEach((item: any) => {
        pipeline.mset(`${item.sort}-${item.data.id}`, JSON.stringify(item.data));
      });
      return new Promise((resolve, rejcet) => {
        pipeline.exec((err, results) => {
          if (err) {
            console.error(err);
            rejcet(err);
          } else {
            resolve(null);
          }
        });
      });
    })
    .catch(err => {
      console.log("初始化推荐表错误:");
      return [];
    });
};

/** 批量创建使用的数据,用于更新或者创建*/
export async function createData(keys: string[]): Promise<any> {
  let dataList = keys.map(current => {
    //查询该文章被录入的各个类型的数据
    // 将查询的同一文章的多个类型的数据进行合并
    return redis.mget(Object.keys(sort).map(item => `${item}-${current}`)).then(rows =>
      (rows.filter(item => !!item) as string[]).reduce((total, item) => {
        return Object.assign(total, JSON.parse(item));
      }, {})
    );
  });
  return Promise.all(dataList).then(rows => rows.flat());
}

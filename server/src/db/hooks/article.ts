import type { Article, ArticleAttributes } from "../models/init-models";
import init from "./utils/init";
import redis from "@/common/utils/redis";

let Redis = redis(1);

export default init<Article, ArticleAttributes>(async (model, type) => {
  //清除Redis缓存
  if (type == "update" || type == "delete") {
    let cacheID = `/article/${model.id}`;
    if (await Redis.exists(cacheID)) {
      Redis.del(cacheID);
    }
  }
});

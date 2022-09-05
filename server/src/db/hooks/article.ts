import type { Article, ArticleAttributes } from "../models/init-models";
import init from "./utils/init";
import redis from "@/common/utils/redis";

let Redis = redis(1);

export default init<Article, ArticleAttributes>(async (model, type) => {
  if (type == "update" || type == "delete") {
    if (await Redis.exists(model.id + "")) {
      Redis.del(model.id + "");
    }
  }
});

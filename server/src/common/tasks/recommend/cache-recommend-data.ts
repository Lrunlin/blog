import DB from "@/db";
import { where } from "@/routes/article/get-data/article-list";
import getArticleListData, {
  sort,
} from "@/common/modules/article/select/option";
import redis from "@/common/utils/redis";
import sleep from "@/common/utils/sleep";

async function setCacheRecommendData() {
  let list = await redis.keys("recommend-cache-*");

  if (list.length) {
    for (let index = 0; index < list.length; index++) {
      const item = list[index];
      await redis.del(item);
    }
  }
  const pipeline = await redis.pipeline();
  let tags = await DB.Tag.findAll({
    attributes: ["id", "belong_id"],
    raw: true,
  });

  let type = Object.keys(sort);
  for (let index = 0; index < type.length; index++) {
    const t = type[index] as unknown as keyof typeof sort;
    let { total, list } = await getArticleListData(1, t, {}, 200);

    for (let index = 0; index < list.length; index += 10) {
      await pipeline.set(
        `recommend-cache-${t}-${index / 10 + 1}`,
        JSON.stringify({ total, list: list.slice(index, index + 10) }),
      );
    }
    for (let index = 0; index < tags.length; index += 10) {
      const tag = tags[index];

      let { total, list } = await getArticleListData(
        1,
        t,
        await where({
          tag: tag.belong_id ? tag.id : undefined,
          type: tag ? tag.id : undefined,
        }),
        200,
      );
      for (let index = 0; index < list.length; index += 10) {
        await pipeline.set(
          `recommend-cache-${t}-${tag.id}-${index / 10 + 1}`,
          JSON.stringify({ total, list: list.slice(index, index + 10) }),
        );
      }
    }
  }
  await pipeline.exec();
}

export default setCacheRecommendData;

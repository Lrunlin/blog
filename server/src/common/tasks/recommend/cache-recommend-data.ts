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

  await sleep(200);

  let tags = await DB.Tag.findAll({
    attributes: ["id", "belong_id"],
    raw: true,
  });

  let type = Object.keys(sort);
  for (let page = 1; page < 51; page++) {
    for (let index = 0; index < type.length; index++) {
      const t = type[index] as unknown as keyof typeof sort;
      let data = await getArticleListData(page, t, {});

      await redis.set(`recommend-cache-${t}-${page}`, JSON.stringify(data));

      for (let index = 0; index < tags.length; index++) {
        const tag = tags[index];
        let data = await getArticleListData(
          page,
          t,
          await where({
            tag: tag.belong_id ? tag.id : undefined,
            type: tag ? tag.id : undefined,
          }),
        );
        await redis.set(
          `recommend-cache-${t}-${tag.id}-${page}`,
          JSON.stringify(data),
        );
      }
    }
  }
}

export default setCacheRecommendData;
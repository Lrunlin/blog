import redis from "@/common/utils/redis";
import sequelize from "@/db/config";
import DB from "@/db";

let Redis = redis(2);
function setArticleViewCount() {
  setInterval(() => {
    Redis.keys("u--*", async (err, keys) => {
      if (err) {
        console.log(`获取文章历史记录keys错误：${err}`);
        return;
      }
      for (const item of keys as string[]) {
        const t = await sequelize.transaction();
        let articleID = +item.split("--").slice(-1);
        await DB.Article.increment("view_count", { where: { id: articleID }, transaction: t })
          .then(async () => {
            await Redis.rename(item, item.replace("u--", ""))
              .then(async () => {
                await t.commit();
              })
              .catch(async () => {
                await t.rollback();
              });
          })
          .catch(err => {});
      }
    });
  }, 43_200_000);
}
export default setArticleViewCount;

import redis from "@/common/utils/redis";
import DB from "@/db";

let Redis = redis(2);
function setArticleViewCount() {
  setInterval(() => {
    Redis.keys("!*", async (err, keys) => {
      if (err) {
        console.log(`获取文章历史记录keys错误：${err}`);
        return;
      }
      for (const key of keys as string[]) {
        let articleID: string = key.split("#").slice(-1) as unknown as string;

        await DB.Article.increment("view_count", { where: { id: articleID } })
          .then(async () => {
            await Redis.rename(key, key.replace("!", "")).catch(async () => {});
          })
          .catch(err => {});
      }
    });
  }, 21_600_000);
}
export default setArticleViewCount;

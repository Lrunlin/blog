import redis from "@/common/utils/redis";
import DB from "@/db";

let Redis = redis();
function setArticleViewCount() {
  setInterval(() => {
    Redis.keys("*-unentered", (err, keys) => {
      if (err) {
        console.log(`获取文章历史记录keys错误：${err}`);
        return [];
      }
    }).then(async keys => {
      for (const key of keys) {
        let type = key.split("-")[1] as "article" | "problem"; //article、problem
        let id: string = key.split("-")[3];
        await (DB[type == "article" ? "Article" : "Problem"] as any)
          .increment("view_count", { where: { id } })
          .then(async () => {
            await Redis.rename(key, key.replace("-unentered", "")).catch(() => {});
          })
          .catch((err: any) => {
            console.log(err);
          });
      }
    });
  }, 21_600_000);
}
export default setArticleViewCount;

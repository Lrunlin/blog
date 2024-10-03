import Router from "@koa/router";
import DB from "@/db";
import pm2 from "@socket.io/pm2";
import os from "os";
import pidusage from "pidusage";
import auth from "@/common/middleware/auth";
import typeCache from "@/common/modules/cache/type";
import redis from "@/common/utils/redis";

let router = new Router();

// 获取pid 注意pm2多实例问题
let pid = process.env._pm2_version ? [] : [process.pid];
if (process.env._pm2_version) {
  pm2.connect((err) => {
    if (err) {
      console.log("链接pm2 pid获取错误", err);
      return;
    }
    pm2.list((error, list) => {
      if (error) {
        console.log("列表pm2 pid获取错误", err);
        return;
      }
      const pids = list.reduce((total, item) => {
        if (item.name === "blog-server") {
          return item.pid ? total.concat(item.pid) : total;
        } else {
          return total;
        }
      }, [] as number[]);
      pid = pid.concat(pids);
    });
  });
}

let getInstanceData = () =>
  new Promise<{ cpu: number; memory: number; memory_total: number }>(
    (resolve) => {
      pidusage(pid, function (err, stats) {
        if (err) {
          resolve({ cpu: 0, memory: 0, memory_total: os.totalmem() });
          return;
        }
        let data = Object.values(stats).reduce(
          (total, item) => {
            return {
              cpu: item.cpu + total.cpu,
              memory: item.memory + total.memory,
            };
          },
          { cpu: 0, memory: 0 },
        );

        data.cpu = +data.cpu.toFixed(2);
        let memory_total = os.totalmem();
        data.memory = +(data.memory / 1024 / 1024).toFixed(2);

        resolve({ ...data, memory_total: memory_total });
      });
    },
  );

router.get("/statistics/visualization", auth(), async (ctx) => {
  let instanceData = await getInstanceData();

  let history = JSON.parse(
    (await redis.get("visualization-history")) as string,
  );
  let systemOccupation = JSON.parse(
    (await redis.get("visualization-load")) as string,
  );

  /** 类型总数*/
  let typeCount = (typeCache.get("type") as any[]).length;
  /** 标签总数*/
  let tagCount = (typeCache.get("tag") as any[]).length;

  /** 文章总数 普通用户数量 友情链接数量*/
  let [articleCount, userCount, linkCount] = await Promise.all([
    DB.Article.count({
      attributes: ["state"],
      where: { state: 1 },
    })
      .then((count) => count)
      .catch(() => 0),
    DB.User.findAndCountAll({
      attributes: ["id"],
      raw: true,
      where: { auth: 0 },
    })
      .then(({ count }) => count)
      .catch(() => null),
    DB.FriendlyLink.findAndCountAll({
      attributes: ["id"],
      raw: true,
      where: { state: 1 },
    })
      .then(({ count }) => count)
      .catch(() => null),
  ]);

  ctx.body = {
    success: true,
    message: "大屏页面统计信息",
    data: {
      instance_data: instanceData,
      article: {
        article_count: articleCount,
      },
      type: {
        type_count: typeCount,
        tag_count: tagCount,
      },
      user: {
        user_count: userCount,
      },
      link: {
        link_count: linkCount,
      },
      visits: history.visits,
      article_ranking: history.articleRanking,
      system_occupation: systemOccupation,
      referer: history.referer,
    },
  };
});
export default router;

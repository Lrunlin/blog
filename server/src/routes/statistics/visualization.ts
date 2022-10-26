import os from "os";
import Router from "@koa/router";
import { getDiskInfoSync } from "node-disk-info";
import DB from "@/db";
import auth from "@/common/middleware/auth";
import { Op } from "sequelize";
import typeCache from "@/common/modules/cache/type";
import Redis from "@/common/utils/redis";

let redis = Redis(2);

let visits: number[] = new Array(7).fill(0);
let referer: { [key: string]: number } = {
  Google: 0,
  360: 0,
  Baidu: 0,
  Bing: 0,
  GitHub: 0,
  直接进入: 0,
  Other: 0,
};
let articleRanking: { id: number; title: string; view_count: number }[] | null = [];
/** 通过Redis阅读记录获取七日内访问量、作者排行榜、访问来源统计*/
async function setVisitsData() {
  visits = new Array(7).fill(0);
  let _articleRanking: { [key: string]: number } = {};
  referer = {
    Google: 0,
    360: 0,
    Baidu: 0,
    Bing: 0,
    GitHub: 0,
    直接进入: 0,
    Other: 0,
  };
  (await redis.keys("*")).forEach(async item => {
    // 统计每天访问量 根据剩余天数计算应该处于数组第几位
    redis.ttl(item).then(time => {
      let index = 7 - 1 - Math.floor((604_800 - time) / 86_400);
      visits[index]++;
    });
    /** 统计七日内文章访问量*/
    let articleID = item.split("--").slice(-1)[0];
    _articleRanking[articleID] ? _articleRanking[articleID]++ : (_articleRanking[articleID] = 1);
    /** 统计访问来源*/
    redis
      .get(item)
      .then(res => {
        if (res == null) {
          return;
        }
        referer[res] != undefined ? referer[res]++ : referer["直接进入"]++;
      })
      .catch(() => {});
  });

  /** 统计作者排行榜*/
  let articleIDs = Object.entries(_articleRanking)
    .sort((a, b) => b[1] - a[1])
    .splice(0, 10)
    .map(el => ({ articleID: el[0], viewCount: el[1] }));
  articleRanking = await DB.Article.findAll({
    attributes: ["id", "title"],
    where: { id: articleIDs.map(item => item.articleID) },
    raw: true,
  })
    .then(rows => rows.map((item, index) => ({ ...item, view_count: articleIDs[index].viewCount })))
    .catch(() => null);
}

setVisitsData();
setTimeout(() => {
  setVisitsData();
}, 21_600_000);

let router = new Router();

const getDistData = () => {
  let isLinux = os.type().toLowerCase().includes("linux");

  let total = 0;
  let occupied = 0;
  getDiskInfoSync().forEach(item => {
    total += item.blocks;
    occupied += item.used;
  });
  return {
    occupied: isLinux ? occupied * 1000 : occupied,
    total: isLinux ? total * 1000 : total,
  };
};

router.get("/statistics/visualization", auth(), async ctx => {
  let adminID = (await DB.User.findAll({ where: { auth: 1 }, attributes: ["id"], raw: true })
    .then(rows => rows.map(item => item.id))
    .catch(() => [])) as number[];

  /** 管理员发布的原创文章数量*/
  let adminNotReprintCount = await DB.Article.findAndCountAll({
    attributes: ["id"],
    raw: true,
    where: { reprint: { [Op.is]: null } as any, author: adminID },
  })
    .then(({ count }) => count)
    .catch(() => 0);

  /** 管理员发布的转载文章数量*/
  let adminReprintCount = await DB.Article.findAndCountAll({
    attributes: ["id"],
    raw: true,
    where: { reprint: { [Op.not]: null } as any, author: adminID },
  })
    .then(({ count }) => count)
    .catch(() => 0);

  /** 用户原创文章*/
  let userNotReprintCount = await DB.Article.findAndCountAll({
    attributes: ["id"],
    raw: true,
    where: { reprint: { [Op.is]: null } as any, author: { [Op.not]: adminID } },
  })
    .then(({ count }) => count)
    .catch(() => 0);

  /** 用户转载文章*/
  let userReprintCount = await DB.Article.findAndCountAll({
    attributes: ["id"],
    raw: true,
    where: { reprint: { [Op.not]: null } as any, author: { [Op.not]: adminID } },
  })
    .then(({ count }) => count)
    .catch(() => 0);

  /** 类型总数*/
  let typeCount = (typeCache.get("type") as any[]).length;
  /** 标签总数*/
  let tagCount = (typeCache.get<any[]>("tag") as any[]).length;

  /** 普通用户数量*/
  let userCount = await DB.User.findAndCountAll({
    attributes: ["id"],
    raw: true,
    where: { id: { [Op.not]: adminID } },
  })
    .then(({ count }) => count)
    .catch(() => null);

  let links = await DB.Links.findAndCountAll({
    attributes: ["id"],
    raw: true,
    where: { state: 1 },
  })
    .then(({ count }) => count)
    .catch(() => null);

  ctx.body = {
    success: true,
    message: "大屏页面统计信息",
    data: {
      article: {
        admin_reprint_count: adminReprintCount,
        admin_not_reprint_count: adminNotReprintCount,
        user_reprint_count: userReprintCount,
        user_not_reprint_count: userNotReprintCount,
      },
      type: {
        type_count: typeCount,
        tag_count: tagCount,
      },
      user: {
        user_count: userCount,
      },
      links: {
        links_count: links,
      },
      visits: visits,
      article_ranking: articleRanking,
      // 1、5、15 负载
      loadavg: os.loadavg().map(load => (load * 100).toFixed(0)),
      memory: {
        occupied: os.totalmem() - os.freemem(),
        total: os.totalmem(),
      },
      disk: getDistData(),
      referer: referer,
    },
  };
});
export default router;

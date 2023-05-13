import os from "os";
import Router from "@koa/router";
import { getDiskInfoSync } from "node-disk-info";
import DB from "@/db";
import auth from "@/common/middleware/auth";
import moment from "moment";
import { Op } from "sequelize";
import typeCache from "@/common/modules/cache/type";
import Redis from "@/common/utils/redis";

let redis = Redis();
interface refererType {
  refererResult: string;
  count: number;
}
/** 访问数量*/
let visits: { time: string; view_count: number; ip_count: number }[] = new Array(7).fill(0);
/** 访问来源*/
let referer: { [key: refererType["refererResult"]]: refererType } = {};
/** 文章排行*/
let articleRanking: { id: number; title: string; view_count: number }[] | null = [];
/** 通过Redis阅读记录获取七日内访问量、作者排行榜、访问来源统计*/
async function setVisitsData() {
  visits.length = 0;
  let _articleRanking: { [key: string]: number } = {};
  //清空
  referer = {};
  /** 用来保存IP记录*/
  let ipHistory: { time: string; ip: string[] }[] = [];
  for (const key of await redis.keys("history-article*")) {
    /** 统计七日内文章排行榜*/
    let articleID: string = key.split("-")[3];
    _articleRanking[articleID] ? _articleRanking[articleID]++ : (_articleRanking[articleID] = 1);
    /** 统计访问来源和七日内全站文章访问量*/
    await redis
      .lrange(key, 0, -1)
      .then(([time, refererResult]) => {
        if (!time) {
          return;
        }
        // 统计访问来源
        let refererItem = referer[refererResult];
        if (refererItem) {
          refererItem.count++;
        } else {
          referer[refererResult] = {
            refererResult,
            count: 1,
          };
        }
        // 统计访问量
        let visitsItem = visits.find(item => item.time == time); //通过日期在数组中找到指定的元素
        visitsItem
          ? visitsItem.view_count++
          : visits.push({ time: time, view_count: 1, ip_count: 0 });
        //统计IP
        let ip: string = key.split("-")[2];
        let ipItem = ipHistory.find(item => item.time == time);
        ipItem ? ipItem.ip.push(ip) : ipHistory.push({ time: time, ip: [ip] });
      })
      .catch(() => {});
  }

  //只保留7日内站点访问量(处理可能会出现的8个日期的问题)
  visits = visits
    .sort((a, b) => +new Date(a.time) - +new Date(b.time))
    .slice(-7)
    .map(item => ({ ...item, time: item.time.substring(5) }));
  /** 处理统计好的IP数据*/
  ipHistory.forEach(item => {
    let visitsItem = visits.find(_item => item.time.substring(5) == _item.time);
    if (visitsItem) {
      visitsItem.ip_count = [...new Set(item.ip)].length;
    }
  });
  /** 统计文章阅读排行榜*/
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
setInterval(() => {
  setVisitsData();
}, 600_000);

let router = new Router();
/** 获取内存使用情况*/
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

const systemOccupation: {
  loadavg: number;
  memory: { occupied: number; total: number };
  disk: { occupied: number; total: number };
  time: string;
}[] = [];
function getSystemOccupation() {
  systemOccupation.push({
    loadavg: os.loadavg()[0] * 100,
    memory: {
      occupied: os.totalmem() - os.freemem(),
      total: os.totalmem(),
    },
    disk: getDistData(),
    time: moment().format("HH:mm:ss"),
  });
  if (systemOccupation.length > 8) {
    systemOccupation.splice(0, 1);
  }
}
getSystemOccupation();
setInterval(() => {
  getSystemOccupation();
}, 10_000);

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
  let tagCount = (typeCache.get("tag") as any[]).length;

  /** 普通用户数量*/
  let userCount = await DB.User.findAndCountAll({
    attributes: ["id"],
    raw: true,
    where: { id: { [Op.not]: adminID } },
  })
    .then(({ count }) => count)
    .catch(() => null);

  let link = await DB.Link.findAndCountAll({
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
      link: {
        link_count: link,
      },
      visits: visits,
      article_ranking: articleRanking,
      system_occupation: systemOccupation,
      referer: Object.values(referer),
    },
  };
});
export default router;

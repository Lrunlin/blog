import DB from "@/db";
import redis from "@/common/utils/redis";
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

  redis.set(
    "visualization-history",
    JSON.stringify({ visits, referer: Object.values(referer), articleRanking })
  );
}

export default () => {
  setVisitsData();
  setInterval(() => {
    setVisitsData();
  }, 600_000);
};

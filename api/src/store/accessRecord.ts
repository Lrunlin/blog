import moment from "moment";
interface accessRecordTypes {
  [key: string]: any;
}
/**
 * 统计七天之内的访问量（结果）
 */
let accessRecord: accessRecordTypes = {};
/**
 * 添加一条记录
 * @params type {string} 对应的文章类型（前端传参数）
 * @params referrer {string} 访问来源document.referrer
 */
function statistics(type: string | undefined, referrer: string) {
  let time = moment().format("YYYY-MM-DD");

  // 设置时间轴并且只保留最近七天
  if (!accessRecord[time]) {
    accessRecord[time] = {
      visits: 0,
      type: {},
      referrer: { Google: 0, 360: 0, Baidu: 0, Bing: 0, Other: 0, 直接进入: 0 ,GitHub:0},
    };
    if (Object.keys(accessRecord).length > 7) {
      delete accessRecord[Object.keys(accessRecord)[0] as string];
    }
  }

  //访问量的自增
  accessRecord[time].visits++;
  //如果有类型就设置类型自增
  if (type) {
    type.split(",").forEach(item => {
      accessRecord[time].type[item]
        ? accessRecord[time].type[item]++
        : (accessRecord[time].type[item] = 1);
    });
  }
  //设置访问来源（没有访问来源就设置直接进入）
  if (!referrer) {
    accessRecord[time].referrer["直接进入"]++;
    return false;
  }
  let referrerList = [
    { keyword: "google.com", referrer: "Google" },
    { keyword: "so.com", referrer: "360" },
    { keyword: "baidu.com", referrer: "Baidu" },
    { keyword: "bing.com", referrer: "Bing" },
    { keyword: "github.com", referrer: "GitHub" },
  ];
  let referrerResult = referrerList.find(item => referrer.includes(item.keyword))?.referrer;
  accessRecord[time].referrer[referrerResult || "Other"]++;
}
export { accessRecord, statistics };

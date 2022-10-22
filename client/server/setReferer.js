let list = [
  { keyword: "google.com", referrer: "Google" },
  { keyword: "so.com", referrer: "360" },
  { keyword: "baidu.com", referrer: "Baidu" },
  { keyword: "bing.com", referrer: "Bing" },
  { keyword: "github.com", referrer: "GitHub" },
];
/**
 * 根据referer判断访问来源
 * @params referer {string} req.headers.referer
 * @return Referrer {string} 处理好的访问来源
 */
function setReferer(referer) {
  let result = list.find(item => referer.includes(item.keyword));
  return result ? result.referrer : "Other";
}
module.exports = setReferer;

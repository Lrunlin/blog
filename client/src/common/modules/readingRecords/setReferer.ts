export const list = [
  { key: -1, label: "Other", color: "yellow" },
  { key: 0, label: "直接进入", color: "purple" },
  { key: 1, keyword: "google.com", label: "Google", color: "#ea4335" },
  { key: 2, keyword: "so.com", label: "360", color: "#19b955" },
  { key: 3, keyword: "baidu.com", label: "Baidu", color: "#4e6ef2" },
  { key: 4, keyword: "bing.com", label: "Bing", color: "#007daa" },
  { key: 5, keyword: "github.com", label: "GitHub", color: "#24292f" },
  { key: 6, keyword: "spider", label: "搜索引擎爬虫", color: "red" },
];

/**
 * 根据referer判断访问来源
 * @params referer {string} req.headers.referer
 * @return Referrer number 处理好的访问来源的key
 */
function setReferer(referer: string | undefined) {
  // 没有referer，直接进入的
  if (referer == undefined || !/^[\s\S]*.*[^\s][\s\S]*$/.test(referer)) {
    return 0;
  }
  let result = list.find(item => referer.includes(item.keyword as string));
  return result?.key || -1;
}
export default setReferer;

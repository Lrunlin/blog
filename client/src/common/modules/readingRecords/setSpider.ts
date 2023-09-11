function setSpider(ua: string | undefined) {
  if (!ua) return false as false;

  // 通过 UA 判断是否是搜索引擎
  return ua
    .toLocaleLowerCase()
    .match(
      /googlebot|bingbot|baiduspider|linkedinbot|slackbot|Applebot|360spider|Sosospider|YoudaoBot|Sogou web spider/i
    )
    ? 6
    : false;
}
export default setSpider;

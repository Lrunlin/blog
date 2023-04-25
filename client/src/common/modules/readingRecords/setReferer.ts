const list = [
  { keyword: "google.com", label: "Google", color: "#ea4335" },
  { keyword: "so.com", label: "360", color: "#19b955" },
  { keyword: "baidu.com", label: "Baidu", color: "#4e6ef2" },
  { keyword: "bing.com", label: "Bing", color: "#007daa" },
  { keyword: "github.com", label: "GitHub", color: "#24292f" },
];

//其他途径和直接进入
const Other = { label: "Other", color: "yellow" };
const directAccess = { label: "直接进入", color: "purple" };

/**
 * 根据referer判断访问来源
 * @params referer {string} req.headers.referer
 * @return Referrer {label:string;color:string} 处理好的访问来源
 */
function setReferer(referer: string | undefined) {
  if (!/^[\s\S]*.*[^\s][\s\S]*$/.test(referer || "") || referer == undefined) {
    return directAccess;
  }
  let result = list.find(item => referer.includes(item.keyword));
  return result ? { label: result.label, color: result.color } : Other;
}
export default setReferer;

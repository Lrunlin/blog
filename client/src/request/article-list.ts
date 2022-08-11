import axios from "axios";
import type { articleListItemType } from "@type/article-list-item";
import type { response } from "@type/response";

interface paramsType {
  url: string;
  page: number;
  type: "recommend" | "newest" | "hottest";
}



export interface responseType {
  total: number;
  list: articleListItemType[];
}

/**
 * todo 输入路径进行请求,用于首页的标签切换栏
 * @params url {string} 请求链接（tag的ID属性）
 * @params page {number} 页数
 * @params type {recommend | newest | hottest} 请求类型 (综合、最新、热榜)
 * @return data {object[]} 文章数据
 */
function articleList(url: paramsType["url"], page: paramsType["page"], type: paramsType["type"]) {
  return axios
    .get<response<responseType>>(url, {
      params: { page: page, type: type },
    })
    .then(res => res.data.data);
}
export default articleList;

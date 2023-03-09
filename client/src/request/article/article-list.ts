import axios from "axios";
import type { articleListItemType } from "@type/model/article-list-item";
import type { response } from "@type/common/response";

export type sortType = "recommend" | "newest" | "hottest";
interface paramsType {
  page: number;
  sort: sortType;
  type?: number | string;
  tag?: number | string;
  follow?: true;
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
function articleList(params: paramsType) {
  return axios
    .get<response<responseType>>(`/article/list`, {
      params: params,
    })
    .then(res => res.data.data);
}
export default articleList;

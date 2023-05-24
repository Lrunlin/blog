import axios from "axios";
import type { articleListItemType } from "@type/model/article-list-item";
import type { response } from "@type/common/response";

export type sortType = "recommend" | "newest" | "hottest";
interface paramsType {
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
function articleList(page: number, params: paramsType, cancelCallback?: (cancel: any) => any) {
  const controller = new AbortController();
  cancelCallback && cancelCallback(() => controller.abort());
  return axios
    .get<response<responseType>>(`/article/list/${page}`, {
      params: params,
      signal: controller.signal,
    })
    .then(res => {
      return res.data.data;
    })
    .catch(err => {
      return { total: 0, list: [] };
    });
}
export default articleList;

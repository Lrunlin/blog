import axios from "axios";
import type { article, response } from "@/types";

/**
 * 根据id查询文章信息 并返回对应评论
 * @params value {string} 需要查询的值
 */
const getArticleData = async (value: string) => {
  let rows = await axios.get<response<article>>(`/article/${value}`);

  return rows.data.data as unknown as article | null;
};
export default getArticleData;

import axios from "axios";
import type { article, response } from "@/types";

/**
 * 根据id或者router查询文章信息 并返回对应评论
 * @params value {string} 需要查询的值
 * @params router{null|string} 标明router后根据router查询默认id
 */
const getArticleData = async (value: string, router?: true): Promise<article | null> => {
  let url = router ? `/article?router=${value}` : `/article/${value}`;
  let rows = await axios.get<response<article | article[]>>(url);

  if (!rows.data.success) {
    return null;
  }

  if (router && rows.data.data) {
    return (rows.data.data as article[]).length ? ((rows as any).data.data[0] as article) : null;
  } else {
    return rows as unknown as article | null;
  }
};
export default getArticleData;

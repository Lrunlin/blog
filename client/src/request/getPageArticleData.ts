import axios from "axios";
import type {  response, articlePageTypes } from "@/types";

interface responseTypes extends response<articlePageTypes[]> {
  total: number;
}

interface result {
  total: number;
  data: articlePageTypes[];
}

/** 分页查询文章信息*/
const getPageArticleData = async (page: number = 1, type?: string): Promise<result> => {
  let article = await axios.get<responseTypes>(
    `/article/page/${page}`,
    type ? { params: { type: type } } : {}
  );
  return {
    total: article.data.total,
    data: article.data.data,
  };
};

export default getPageArticleData;

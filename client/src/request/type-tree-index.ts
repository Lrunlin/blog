import axios from "axios";
import type { response } from "@type/response";

export interface responseType {
  id: string;
  name: string;
  children: responseType[];
}

/**
 * 首页用于获取类型树
 */
function getTypeTreeIndex() {
  return axios.get<response<responseType[]>>("/type-tree-client").then(res => res.data.data);
}
export default getTypeTreeIndex;
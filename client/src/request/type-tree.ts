import axios from "axios";
import type { response } from "@type/response";
import type { TypeAttributes, TagAttributes } from "@type/model-attribute";

type responseType = TypeAttributes & {
  children: [TagAttributes];
};

/**
 * 首页用于获取类型树
 */
function getTypeTree() {
  return axios.get<response<responseType[]>>("/type-tree").then(res => res.data.data);
}
export default getTypeTree;

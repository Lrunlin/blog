import axios from "axios";
import type { response } from "@type/common/response";
/** 取消点赞*/
function unLike(id: number|string) {
  return axios.delete<response>(`/collection/${id}`);
}
export default unLike;

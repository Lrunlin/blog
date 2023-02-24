import axios from "axios";
import type { response } from "@type/common/response";
/** 取消关注*/
function unFollow(id: number | string) {
  return axios.delete<response>(`/follow/${id}`);
}
export default unFollow;

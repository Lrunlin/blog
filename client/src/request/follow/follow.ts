import axios from "axios";
import type { response } from "@type/common/response";
/** 关注*/
function follow(id: number | string, type: "problem" | "user") {
  return axios.post<response>(`/follow/${id}`, { type });
}
export default follow;

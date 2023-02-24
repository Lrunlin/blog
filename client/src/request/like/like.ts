import axios from "axios";
import type { response } from "@type/common/response";
/** 点赞*/
function like(id: number | string, type: "problem" | "answer" | "article") {
  return axios.post<response>(`/like/${id}`, { type });
}
export default like;

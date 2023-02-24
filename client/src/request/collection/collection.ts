import axios from "axios";
import type { response } from "@type/common/response";
/** 收藏*/
function collection(id: number|string, type: "problem" | "article") {
  return axios.post<response>(`/collection/${id}`, { type });
}
export default collection;

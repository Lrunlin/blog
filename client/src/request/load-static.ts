import { message } from "antd";
import axios from "@axios";
import { response } from "@type/common/response";

type target = "type" | "article" | "cover" | "avatar" | "comment";

export interface responseType {
  file_name: string;
  file_href: string;
}

function loadStatic(target: target, file: File) {
  let formData = new FormData();
  formData.append("image", file);
  return axios
    .post<response<responseType>>(`/static/${target}`, formData)
    .then((res) => res.data);
}
export default loadStatic;

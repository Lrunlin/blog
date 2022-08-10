import axios from "axios";
import { response } from "@type/response";
interface advertisementType {
  id: number;
  url: string;
  cover: string;
}

export type responseType=advertisementType[]

/** 获取推广信息*/
function getAdvertisementList() {
    return axios.get<response<responseType>>("/advertisement").then(res => res.data.data);
}
export default getAdvertisementList;
import axios from "@axios";
import { response } from "@type/common/response";

export interface advertisementType {
  id: number;
  url: string;
  poster_file_name: string;
  poster_url: string;
  image_size: { width: number; height: number };
}

export type responseType = advertisementType[];

/** 获取推广信息*/
function getAdvertisementList(position: string) {
  return axios
    .get<response<responseType>>("/advertisement", { params: { position } })
    .then((res) => res.data.data)
    .catch((err) => []);
}
export default getAdvertisementList;

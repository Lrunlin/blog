import axios from "axios";
import type { linksType, response } from "@/types";

/** 查询友链信息*/
const getLinksData = async (): Promise<linksType[]> => {
  let type = await axios.get<response<linksType[]>>(`/links`, { params: { isShow: true } });
  return type.data.data;
};
export default getLinksData;

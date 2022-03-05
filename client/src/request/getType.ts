import axios from "axios";
import type { articleType, response } from "@/types";

/** 分页查询文章信息*/
const getType = async (): Promise<articleType[]> => {
  let type = await axios.get<response<articleType[]>>(`/type`,{params:{isShow:true}});
  return type.data.data;
};
export default getType;

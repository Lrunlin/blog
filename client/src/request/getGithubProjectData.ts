import axios from "axios";
import type { githubProjectTypes, response } from "@/types";
/** 获取GitHub公共仓库的项目信息*/
async function getData(): Promise<githubProjectTypes[]> {
  const res = await axios.get<response<githubProjectTypes[]>>("/github");
  return res.data.data;
}
export default getData;

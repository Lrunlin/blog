import axios from "axios";
import { assets } from "@/store/assetsPath";
/**
 * 删除GitHub预览图
 * @params id {string} 仓库ID
 * @params token {string} token
 * @return success {boolean}  是否成功
 */
async function remove(id: string, token: string): Promise<boolean> {
  return await axios
    .delete(`${assets}assets/github/${id}`, {
      headers: {
        authorization: token,
      },
    })
    .then(res => {
      console.log(`${assets}assets/github/${id}`);
      return res.data.success as boolean;
    })
    .catch(err => {
      console.log(`${assets}assets/github/${id}`);
      return false;
    });
}
export default remove;

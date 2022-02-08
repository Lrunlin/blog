import axios from "axios";
import { assets } from "@/store/assetsPath";
/**
 * 上传GIthub仓库预览图
 * @params id {string} 仓库ID
 * @params image {string} 需要上传的图片base64
 * @params token {string} token
 * @? 上传的图片key为image
 * @return success {boolean}  是否成功
 */
async function upload(id: string, image: string, token: string): Promise<boolean> {
  return await axios
    .post(
      `${assets}assets/github/${id}`,
      {
        image: image,
      },
      {
        headers: {
          authorization: token,
        },
      }
    )
    .then(res => {
      return res.data.success as boolean;
    })
    .catch(err => {
      return false;
    });
}
export default upload;

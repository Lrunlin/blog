import { message } from "antd";
import axios from "axios";
import type { uploadPropsType } from "./index";
type paramsType = Pick<uploadPropsType, "target"> & {
  base64: string;
  //!主要要使用函数:在组件初始化时并没有挂载event
};
/**base64转换，并且axios上传*/
async function upload(props: paramsType) {
  const mimeString = props.base64.split(",")[0].split(":")[1].split(";")[0]; // mime类型
  const byteString = atob(props.base64.split(",")[1]); //base64 解码
  const arrayBuffer = new ArrayBuffer(byteString.length); //创建缓冲数组
  const intArray = new Uint8Array(arrayBuffer); //创建视图
  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }
  const file = new Blob([intArray], { type: mimeString });
  const formData = new FormData();
  formData.append("image", file);
  if (file.size >= 1024 * 1024 * process.env.UPLOAD_MAX_SIZE) {
    message.warning(`上传图片最大${process.env.UPLOAD_MAX_SIZE}MB`);
    return;
  }

  return axios.post(`/static/${props.target}`, formData);
}
export default upload;

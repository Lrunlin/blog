import axios from "axios";
import { response } from "@type/response";
import { message } from "antd";
import { editorPropsType } from "./index";

async function upload(
  files: File[],
  target: editorPropsType["target"],
  changePploadProgress: (val: string) => void
) {
  let formData = new FormData();
  formData.append("image", files[0]);
  if (files[0].size >= 1024 * 1024 * process.env.UPLOAD_MAX_SIZE) {
    message.warning(`上传图片最大${process.env.UPLOAD_MAX_SIZE}MB`);
    return false;
  }
  return await axios.post<
    response<{
      file_name: string;
      file_href: string;
    }>
  >(`/static/${target}`, formData, {
    onUploadProgress: progressEvent => {
      if (progressEvent.progress) {
        let complete = Math.floor(progressEvent.progress * 100);
        if (complete < 100) {
          changePploadProgress(`上传中:${complete}%`);
        } else {
          changePploadProgress("等待响应...");
        }
      }
    },
  });
}
export default upload;

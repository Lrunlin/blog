import { useState, useEffect } from "react";
import type { FC } from "react";
import axios from "axios";
import cookie from "js-cookie";
import { message, Upload } from "antd";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import { RcFile } from "antd/lib/upload";

interface propsType {
  onChange?: (val: string) => void;
}
const UpLoad: FC<propsType> = props => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    if (newFileList.length && newFileList[0]?.status == "done") {
      setFileList([
        {
          uid: newFileList[0].uid,
          name: newFileList[0]?.response?.data?.file_name,
          status: "done",
          url: newFileList[0]?.response?.data?.file_href,
        },
      ]);
    } else {
      setFileList(newFileList);
    }
  };
  useEffect(() => {
    props.onChange && props.onChange(fileList[0]?.status == "done" ? fileList[0].name : "");
  }, [fileList]);
  return (
    <>
      <Upload
        action={`${axios.defaults.baseURL}/static/link`}
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onRemove={() => setFileList([])}
        name="image"
        accept="image/*"
        beforeUpload={(file: RcFile) => {
          if (file.size / 1024 / 1024 > process.env.UPLOAD_MAX_SIZE) {
            message.error(`最大支持上传${process.env.UPLOAD_MAX_SIZE}MB图片`);
            return false;
          }
        }}
        headers={{
          authorization: cookie.get("token") + "",
        }}
        maxCount={1}
      >
        {fileList.length < 1 && "+ Upload"}
      </Upload>
    </>
  );
};
export default UpLoad;

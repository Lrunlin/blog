import { useState, useEffect, useRef } from "react";
import type { FC } from "react";
import { Upload } from "antd";
import axios from "axios";
import ImgCrop from "antd-img-crop";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";

interface propsType {
  avatar_file_name: string;
  avatar_url: string;
  onChange: (value: string) => void;
}

const UploadAvatar: FC<propsType> = props => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  let allowSetValue = useRef(true);
  useEffect(() => {
    if (allowSetValue.current) {
      setFileList([
        {
          uid: props.avatar_file_name,
          name: props.avatar_file_name,
          status: "done",
          url: props.avatar_url,
        },
      ]);
      allowSetValue.current = false;
    }
  }, [props.avatar_file_name, props.avatar_url]);

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
    props.onChange(newFileList[0]?.response?.data?.file_name);
  };
  return (
    <>
      <ImgCrop aspect={1 / 1} rotate quality={1}>
        <Upload
          action={`${axios.defaults.baseURL}/static/avatar`}
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          name="image"
          accept="image/*"
          headers={{
            authorization: localStorage.token,
          }}
          maxCount={1}
        >
          {fileList.length == 0 && "+ Upload"}
        </Upload>
      </ImgCrop>
    </>
  );
};
export default UploadAvatar;

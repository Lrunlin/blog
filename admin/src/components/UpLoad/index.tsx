import React, { useState, memo, useEffect } from "react";
import { Upload, Modal } from "antd";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import axios from "axios";
import { target } from "@type/folder";
import ImgCrop from "antd-img-crop";

interface PropsType {
  target: target;
  onChange?: (file_name: string | null) => void;
  /** 宽高比例*/
  aspect?: number;
  /** 初始化预览图*/
  InitValue?: {
    icon_url: string;
    file_name: string;
  };
  notCrop?: boolean;
}
/**
 * 文件上传组件
 * @params target {string} 上传至哪个文件夹
 * @params aspect {number|undefined} 宽高比例
 * @params InitValue {icon_url string 图片预览地址  file_name string 文件名称} 初始值
 * @params onChange {(file_name: string | null) => void  | undefined}
 */
const App: React.FC<PropsType> = memo(props => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  useEffect(() => {
    //设置初始化值
    props.InitValue &&
      setFileList([
        {
          uid: props.InitValue.file_name,
          name: props.InitValue.file_name,
          status: "done",
          url: props.InitValue.icon_url,
        },
      ]);
  }, [props.InitValue]);
  // 在值修改时向父组件传参
  useEffect(() => {
    props.onChange && props.onChange(fileList[0]?.status == "done" ? fileList[0].name : null);
  }, [fileList]);

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

  const [previewImageSrc, setPreviewImageSrc] = useState("");

  return (
    <>
      <Modal
        open={!!previewImageSrc}
        title="图片预览"
        footer={null}
        onCancel={() => setPreviewImageSrc("")}
      >
        <img alt="预览" className="w-full" src={previewImageSrc} />
      </Modal>
      {props.notCrop ? (
        <Upload
          action={`${axios.defaults.baseURL}/static/${props.target}`}
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={(file: UploadFile) => setPreviewImageSrc(file.url as string)}
          onRemove={() => setFileList([])}
          name="image"
          accept="image/*"
          headers={{
            authorization: localStorage.token,
          }}
          maxCount={1}
        >
          {fileList.length < 1 && "+ Upload"}
        </Upload>
      ) : (
        <ImgCrop aspect={props.aspect || 1} rotate quality={1} modalTitle="图片剪裁">
          <Upload
            action={`${axios.defaults.baseURL}/static/${props.target}`}
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={(file: UploadFile) => setPreviewImageSrc(file.url as string)}
            onRemove={() => setFileList([])}
            name="image"
            accept="image/*"
            headers={{
              authorization: localStorage.token,
            }}
            maxCount={1}
          >
            {fileList.length < 1 && "+ Upload"}
          </Upload>
        </ImgCrop>
      )}
    </>
  );
});

export default App;

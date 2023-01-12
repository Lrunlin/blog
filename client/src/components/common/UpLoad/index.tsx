// https://codesandbox.io/s/q8q1mnr01w?file=/src/index.js:2821-2837
import { useState, useEffect, useRef } from "react";
import type { MutableRefObject, FC } from "react";
import type { ModalProps } from "antd";
import dynamic from "next/dynamic";
import upload from "./uoload";
const Modal = dynamic(() => import("./Modal"), { ssr: false });
import Picture from "./Image";

type url = "article" | "avatar" | "cover" | "type" | "comment" | "advertisement" | "link";

export interface uploadPropsType {
  /** 上传地址*/
  url: url;
  /** 默认的图片地址*/
  imgURL?: string;
  /** 宽度*/
  width: number;
  /** 图片宽高比*/
  aspect?: number;
  /** 弹窗配置*/
  ModalProps?: ModalProps;
  // /** 弹窗组件ref*/
  event?: MutableRefObject<{
    open: () => void;
    close: () => void;
  }>;
  onSuccess?: (data: { file_name: string; file_href: string }) => void;
  onError?: (mes: string) => void;
  onDelete?: () => void;
}

const Upload: FC<uploadPropsType> = props => {
  const [imgURL, setImgURL] = useState<string | undefined>();
  const [cropResult, setCropResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  let first = useRef(true);
  useEffect(() => {
    if (first.current && props.imgURL) {
      setImgURL(props.imgURL);
      first.current = false;
    }
  }, [props.imgURL]);

  let event = useRef(null) as unknown as uploadPropsType["event"];
  return (
    <>
      <Picture
        isLoading={isLoading}
        imgURL={imgURL}
        onChange={url => {
          setImgURL(url);
          event?.current.open();
        }}
        deleteBase64={() => {
          setCropResult("");
        }}
        cropResult={cropResult}
        {...props}
      />
      <Modal
        event={event}
        {...props}
        imgURL={imgURL}
        onChange={base64 => {
          setIsLoading(true);
          upload({ ...props, base64, event: () => event })
            .then(() => {
              setCropResult(base64); //上传base64给图片展示区
            })
            .finally(() => {
              setIsLoading(false);
            });
        }}
      />
    </>
  );
};
export default Upload;

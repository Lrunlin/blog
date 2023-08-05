// https://codesandbox.io/s/q8q1mnr01w?file=/src/index.js:2821-2837
import { useState, useEffect, useRef } from "react";
import type { MutableRefObject, FC } from "react";
import type { ModalProps } from "antd";
import dynamic from "next/dynamic";
import upload from "./upload";
const Modal = dynamic(() => import("./Modal"), { ssr: false });
import Picture from "./Image";

type target =
  | "article"
  | "avatar"
  | "cover"
  | "type"
  | "comment"
  | "advertisement"
  | "friendly-link";

export interface uploadPropsType {
  /** 上传地址*/
  target: target;
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
  /** 是否剪切*/
  noCorp?: boolean;
  onSuccess?: (data: { file_name: string; file_href: string }) => void;
  onError?: (mes: string) => void;
  onDelete?: () => void;
}

const Upload: FC<uploadPropsType> = (props = { noCorp: false, target: "article", width: 100 }) => {
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
          if (props.noCorp) {
            setIsLoading(true);
            upload({ target: props.target, base64: url })
              .then((res: any) => {
                setCropResult(url);
                props.onSuccess && props.onSuccess(res.data.data);
              })
              .catch(err => {
                props.onError && props.onError(err.data.message);
              })
              .finally(() => {
                setIsLoading(false);
              });
          } else {
            event?.current.open();
          }
        }}
        deleteBase64={() => {
          setCropResult("");
        }}
        cropResult={cropResult}
        {...props}
      />
      {!props.noCorp && (
        <Modal
          event={event}
          {...props}
          imgURL={imgURL}
          onChange={base64 => {
            event?.current.close();
            setIsLoading(true);
            upload({ target: props.target, base64 })
              .then((res: any) => {
                setCropResult(base64);
                props.onSuccess && props.onSuccess(res.data.data);
              })
              .catch(err => {
                props.onError && props.onError(err.data.message);
              })
              .finally(() => {
                setIsLoading(false);
              });
          }}
        />
      )}
    </>
  );
};
export default Upload;

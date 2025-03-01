// https://codesandbox.io/s/q8q1mnr01w?file=/src/index.js:2821-2837
import { useEffect, useRef, useState } from "react";
import type { FC } from "react";
import { type ModalProps, message } from "antd";
import Picture from "./Image";
import Modal from "./Modal";
import upload from "./upload";

type target =
  | "article"
  | "avatar"
  | "cover"
  | "tag"
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
  /** 弹窗组件ref*/
  event?: {
    open: () => void;
    close: () => void;
  };
  /** 是否剪切*/
  noCorp?: boolean;
  onSuccess?: (data: { file_name: string; file_href: string }) => void;
  onError?: (mes: string) => void;
  onDelete?: () => void;
}

const Upload: FC<uploadPropsType> = (
  props = { noCorp: false, target: "article", width: 100 },
) => {
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

  let event = useRef<uploadPropsType["event"]>(null);

  return (
    <>
      <Picture
        isLoading={isLoading}
        imgURL={imgURL}
        onChange={(url) => {
          setImgURL(url);
          if (props.noCorp) {
            setIsLoading(true);
            upload({ target: props.target, base64: url })
              .then((res: any) => {
                setCropResult(url);
                props.onSuccess && props.onSuccess(res.data.data);
              })
              .catch((err) => {
                props.onError
                  ? props.onError(err.message)
                  : message.error(err.message);
              })
              .finally(() => {
                setIsLoading(false);
              });
          } else {
            event?.current?.open();
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
          ref={event}
          {...props}
          imgURL={imgURL}
          onChange={(base64) => {
            event?.current?.close();
            setIsLoading(true);
            upload({ target: props.target, base64 })
              .then((res: any) => {
                setCropResult(base64);
                props.onSuccess && props.onSuccess(res.data.data);
              })
              .catch((err) => {
                props.onError && props.onError(err.message);
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

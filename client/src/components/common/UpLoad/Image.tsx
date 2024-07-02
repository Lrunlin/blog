import { useEffect, useRef, useState } from "react";
import type { FC } from "react";
import { Image as AntdImage } from "antd";
import {
  DeleteOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Icon from "@/components/next/Image";
import type { uploadPropsType } from "./index";

type propsType = uploadPropsType & {
  onChange: (url: string) => void;
  cropResult: string;
  isLoading: boolean;
  deleteBase64: () => void;
};
/**
 * 上传框以及图片预览
 */
const Image: FC<propsType> = (props) => {
  const [src, setSrc] = useState("");
  const [visible, setVisible] = useState(false);

  let fileID = `file-upload-${props.target}`;

  let first = useRef(true);
  useEffect(() => {
    function isBase64Img(str: string) {
      return /^\s*data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z-]+=[a-z0-9-]+)?)?(?:;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*?)\s*$/i.test(
        str,
      );
    }

    // TODO 设计缺陷，需要判断是否base64，可以将src和base64分成两个变量和函数解决
    if (props.imgURL && !isBase64Img(props.imgURL) && first.current) {
      setSrc(props.imgURL);
      first.current = false;
    }
    if (props.cropResult) {
      setSrc(props.cropResult);
      first.current = false;
    }
  }, [props.imgURL, props.cropResult]);

  return (
    <label
      htmlFor={fileID}
      className="relative flex items-center justify-center overflow-hidden rounded border border-dashed border-gray-400 hover:border-blue-400"
      style={
        !src || props?.aspect
          ? {
              width: `${props.width}px`,
              height: `${props.width / (props?.aspect || 1)}px`,
            }
          : {
              width: `${props.width}px`,
            }
      }
    >
      <>
        {src ? (
          <div className="group relative h-full w-full">
            <img className="h-full w-full" src={src} alt="upload" />
            <div className="absolute left-0 top-0 z-10 hidden h-full w-full items-center justify-center bg-black bg-opacity-30 group-hover:flex">
              <DeleteOutlined
                style={{ color: "white", fontSize: 22 }}
                onClick={(e) => {
                  //!在清除时一定要吧base64和图片路径、input值都删除
                  setSrc("");
                  props.deleteBase64();
                  props.onDelete && props.onDelete();
                  (document.getElementById(fileID) as HTMLInputElement).value =
                    "";
                  e.preventDefault();
                }}
              />
              <Icon
                src="/icon/client/view-white.png"
                width={22}
                height={22}
                alt="preview"
                className="ml-3 cursor-pointer"
                onClick={(e) => {
                  setVisible(true);
                  e.preventDefault();
                }}
              />
            </div>
            <AntdImage
              src={src}
              alt="展示图片"
              className="hidden"
              preview={{
                visible: visible,
                src: src,
                onVisibleChange: (visible) => setVisible(visible),
                getContainer: document.querySelector("body")!,
              }}
            />
          </div>
        ) : (
          <div>{!props.isLoading && <PlusOutlined />}</div>
        )}
        {/* 上传中的加载效果 */}
        {props.isLoading && (
          <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-white bg-opacity-50">
            <LoadingOutlined style={{ fontSize: 26 }} />
          </div>
        )}
      </>
      {/* 上传控件 */}
      <input
        type="file"
        style={{ display: "none" }}
        id={fileID}
        accept="image/*"
        onInput={() => {
          let files = (document.getElementById(fileID) as HTMLInputElement)
            .files;
          if (files?.length) {
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onloadend = function (e) {
              // 原图的Base64
              props.onChange((e.target as any).result);
            };
          }
        }}
      />
    </label>
  );
};
export default Image;

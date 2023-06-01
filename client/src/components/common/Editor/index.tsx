import { memo, useState, startTransition, useEffect, useRef } from "react";
import type { FC } from "react";
import { Spin } from "antd";
import { atom } from "recoil";
import dynamic from "next/dynamic";
import { useRecoilValue } from "recoil";

const Skeleton = () => <div className="w-full h-[700px] bg-gray-200 animate-pulse"></div>;
const MarkDownEditor = dynamic(() => import("./MarkDownEditor"), {
  ssr: false,
  loading: () => <Skeleton />,
});
// import MarkDownEditor from "./MarkDownEditor";
const RichTextEditor = dynamic(() => import("./RichTextEditor"), {
  ssr: false,
  loading: () => <Skeleton />,
});

export interface propsType {
  className?: string;
  /** 上传至哪个文件夹*/
  target: "article" | "problem" | "answer";
  /** 初始化数据*/
  initValue?: string;
  onChange?: (html: string) => any;
}
export type editorPropsType = propsType & {
  changePploadProgress: (val: string | null) => void;
};

export const editorModeContext = atom({
  key: "editorModeContext",
  default:
    typeof window != "undefined"
      ? window.localStorage.getItem("editor-mode") || "markdown"
      : "markdown", //markdown|rich-text
});

const MarkDonwEdit: FC<propsType> = memo(props => {
  const [value, setValue] = useState("");
  const [uploadProgress, setPloadProgress] = useState<null | string>(null);
  let editorMode = useRecoilValue(editorModeContext);

  useEffect(() => {
    window.localStorage.setItem("editor-mode", editorMode);
  }, [editorMode]);

  // 需要对initValue进行中转
  let allowChangeValue = useRef(true);
  useEffect(() => {
    if (!props.initValue) return;
    if (allowChangeValue.current) {
      setValue(props.initValue);
      allowChangeValue.current = false;
    }
  }, [props.initValue]);

  return (
    <>
      <Spin spinning={!!uploadProgress} tip={uploadProgress}>
        <div>
          {editorMode == "markdown" ? (
            <MarkDownEditor
              {...props}
              onChange={html => {
                props.onChange && props.onChange(html);
                startTransition(() => {
                  setValue(html);
                });
              }}
              changePploadProgress={val => setPloadProgress(val)}
              initValue={value}
            />
          ) : (
            <RichTextEditor
              {...props}
              onChange={html => {
                props.onChange && props.onChange(html);
                startTransition(() => {
                  setValue(html);
                });
              }}
              initValue={value}
              changePploadProgress={val => setPloadProgress(val)}
            />
          )}
        </div>
      </Spin>
    </>
  );
});
export default MarkDonwEdit;

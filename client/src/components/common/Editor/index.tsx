import { memo, useState, useEffect, useRef } from "react";
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

const RichTextEditor = dynamic(() => import("./RichTextEditor"), {
  ssr: false,
  loading: () => <Skeleton />,
});

const StyleLink = dynamic(() => import("./StyleLink"), {
  ssr: false,
});

export interface propsType {
  className?: string;
  /** 上传至哪个文件夹*/
  target: "article" | "problem" | "answer";
  /** 初始化数据*/
  initValue?: string;
  onChange?: (html: string) => any;
  height?: number;
  /** 是否使用主题*/
  theme?: boolean;
  /** 设置主题*/
  onSetTheme?: (id: number) => void;
  defaultTheme?: number;
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
  const [initValue, setInitValue] = useState<string | undefined>(undefined);
  const [content, setContent] = useState("");
  const [uploadProgress, setPloadProgress] = useState<null | string>(null);
  let editorMode = useRecoilValue(editorModeContext);

  let firstRender = useRef(true);
  // 保证切换编辑器时value不会消失
  useEffect(() => {
    // 首次不执行，防止重复设置inteValue
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      allowChangeValue.current = true;
      setInitValue(content);
      window.localStorage.setItem("editor-mode", editorMode);
    }
  }, [editorMode]);

  // 需要对initValue进行中转
  let allowChangeValue = useRef(true);
  useEffect(() => {
    if (!props.initValue) return;
    if (allowChangeValue.current) {
      setInitValue(props.initValue);
      allowChangeValue.current = false;
    }
  }, [props.initValue]);

  const [themeID, setThemeID] = useState(0);

  useEffect(() => {
    if (props.defaultTheme != undefined) {
      setThemeID(props.defaultTheme);
    }
  }, [props.defaultTheme]);

  return (
    <>
      <style jsx global>{`
        .content-body img {
          max-width: 60%;
        }
      `}</style>
      <StyleLink id={themeID} />
      <Spin spinning={!!uploadProgress} tip={uploadProgress}>
        <div>
          {editorMode == "markdown" ? (
            <MarkDownEditor
              {...props}
              onChange={html => {
                setContent(html);
                props.onChange && props.onChange(html);
              }}
              changePploadProgress={val => setPloadProgress(val)}
              initValue={initValue}
              onSetTheme={id => {
                if (props.onSetTheme) {
                  setThemeID(id);
                  props.onSetTheme(id);
                }
              }}
              defaultTheme={themeID}
            />
          ) : (
            <RichTextEditor
              {...props}
              onChange={html => {
                setContent(html);
                props.onChange && props.onChange(html);
              }}
              onSetTheme={id => {
                if (props.onSetTheme) {
                  setThemeID(id);
                  props.onSetTheme(id);
                }
              }}
              initValue={initValue}
              changePploadProgress={val => setPloadProgress(val)}
              defaultTheme={themeID}
            />
          )}
        </div>
      </Spin>
    </>
  );
});
export default MarkDonwEdit;

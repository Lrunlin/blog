"use client";

import { memo, useEffect, useRef, useState } from "react";
import type { FC } from "react";
import dynamic from "next/dynamic";
import { Spin } from "antd";
import useEditorMode from "@/store/common/editor-mode";
import StyleLink from "./StyleLink";
import { Skeleton, propsType } from "./index";

const MarkDownEditor = dynamic(() => import("./MarkDownEditor"), {
  ssr: false,
  loading: () => <Skeleton />,
});

const RichTextEditor = dynamic(() => import("./RichTextEditor"), {
  ssr: false,
  loading: () => <Skeleton />,
});

export type editorPropsType = propsType & {
  changePploadProgress: (val: string | null) => void;
};

const MarkDonwEdit: FC<propsType> = memo((props) => {
  const [initValue, setInitValue] = useState<string | undefined>(undefined);
  const [content, setContent] = useState("");
  const [uploadProgress, setPloadProgress] = useState<null | string>(null);
  let editorMode = useEditorMode((s) => s.data);
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
          max-width: 60% !important;
        }
      `}</style>
      <StyleLink id={themeID} />
      <Spin spinning={!!uploadProgress} tip={uploadProgress}>
        <div>
          {editorMode == "markdown" ? (
            <MarkDownEditor
              {...props}
              onChange={(html) => {
                setContent(html);
                props.onChange && props.onChange(html);
              }}
              changePploadProgress={(val) => setPloadProgress(val)}
              initValue={initValue}
              onSetTheme={(id) => {
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
              onChange={(html) => {
                setContent(html);
                props.onChange && props.onChange(html);
              }}
              onSetTheme={(id) => {
                if (props.onSetTheme) {
                  setThemeID(id);
                  props.onSetTheme(id);
                }
              }}
              initValue={initValue}
              changePploadProgress={(val) => setPloadProgress(val)}
              defaultTheme={themeID}
            />
          )}
        </div>
      </Spin>
    </>
  );
});
export default MarkDonwEdit;
